"""
EduNexus AI — High-Level Database Service
Orchestrates domain repositories, enforces business validation, logs audit trails,
and isolates database access logic from API route handlers.
"""

from typing import List, Optional, Dict, Any
from uuid import UUID
from app.db.client import (
    is_database_configured,
    verify_database_connection,
)
from app.db.repositories import (
    StudentRepository,
    AttendanceRepository,
    AssessmentRepository,
    EngagementRepository,
    InterventionRepository,
    AuditRepository,
    PlacementRepository,
    SkillsRepository,
    FeedbackRepository,
    LMSRepository,
)
from app.schemas.student import StudentCreate, StudentUpdate, StudentInDB, StudentResponse
from app.schemas.attendance import AttendanceCreate, AttendanceInDB, AttendanceSummary
from app.schemas.assessment import AssessmentCreate, AssessmentInDB
from app.schemas.engagement import EngagementEventCreate, EngagementEventInDB
from app.schemas.placement import PlacementCreate, PlacementInDB
from app.schemas.skills import SkillsCreate, SkillsInDB
from app.schemas.feedback import FeedbackCreate, FeedbackInDB
from app.schemas.lms import LMSActivityCreate, LMSActivityInDB
from app.schemas.intervention import (
    InterventionCreate,
    InterventionUpdate,
    InterventionInDB,
    InterventionWithOutcomes,
)
from app.schemas.outcome import OutcomeCreate, OutcomeInDB
from app.schemas.audit import AuditEventCreate


class DatabaseService:
    """Unified service interface for all persistent storage operations."""

    def __init__(
        self,
        student_repo: Optional[StudentRepository] = None,
        attendance_repo: Optional[AttendanceRepository] = None,
        assessment_repo: Optional[AssessmentRepository] = None,
        engagement_repo: Optional[EngagementRepository] = None,
        intervention_repo: Optional[InterventionRepository] = None,
        audit_repo: Optional[AuditRepository] = None,
        placement_repo: Optional[PlacementRepository] = None,
        skills_repo: Optional[SkillsRepository] = None,
        feedback_repo: Optional[FeedbackRepository] = None,
        lms_repo: Optional[LMSRepository] = None,
    ):
        self.students = student_repo or StudentRepository()
        self.attendance = attendance_repo or AttendanceRepository()
        self.assessments = assessment_repo or AssessmentRepository()
        self.engagements = engagement_repo or EngagementRepository()
        self.interventions = intervention_repo or InterventionRepository()
        self.audits = audit_repo or AuditRepository()
        self.placement = placement_repo or PlacementRepository()
        self.skills = skills_repo or SkillsRepository()
        self.feedback = feedback_repo or FeedbackRepository()
        self.lms = lms_repo or LMSRepository()


    @staticmethod
    def get_connection_status() -> Dict[str, Any]:
        """
        Actively verifies the Supabase PostgreSQL connection.
        Reports connected: true strictly when live query verification succeeds.
        """
        return verify_database_connection()

    @staticmethod
    def is_configured() -> bool:
        """Returns True if non-placeholder Supabase credentials exist."""
        return is_database_configured()

    # ── Students ────────────────────────────────────────────────────────

    def get_students(
        self,
        search: Optional[str] = None,
        grade: Optional[str] = None,
        section: Optional[str] = None,
        status: Optional[str] = None,
        limit: int = 50,
        offset: int = 0,
    ) -> Dict[str, Any]:
        """Retrieve paginated student directory with summary indicators."""
        result = self.students.get_all(
            search=search,
            grade=grade,
            section=section,
            status=status,
            limit=limit,
            offset=offset,
        )

        # Enhance each student with light summary metrics
        enhanced: List[StudentResponse] = []
        for s in result["students"]:
            att_summary = self.attendance.get_summary(s.id)
            subject_avgs = self.assessments.get_subject_averages(s.id)
            overall_avg = (
                round(sum(subject_avgs.values()) / len(subject_avgs), 1)
                if subject_avgs
                else None
            )

            student_resp = StudentResponse(
                **s.model_dump(),
                attendance_rate=att_summary.attendance_rate if att_summary.total_sessions > 0 else None,
                average_score=overall_avg,
            )
            enhanced.append(student_resp)

        return {"students": enhanced, "total": result["total"]}

    def get_student_detail(self, student_id: UUID) -> Optional[Dict[str, Any]]:
        """Retrieve a holistic student profile with journey metrics."""
        student = self.students.get_by_id(student_id)
        if not student:
            return None

        att_summary = self.attendance.get_summary(student_id)
        recent_attendance = self.attendance.get_by_student(student_id, limit=30)
        recent_assessments = self.assessments.get_by_student(student_id, limit=20)
        subject_averages = self.assessments.get_subject_averages(student_id)
        recent_engagements = self.engagements.get_by_student(student_id, limit=20)
        interventions = self.interventions.get_all(student_id=student_id)

        overall_avg = (
            round(sum(subject_averages.values()) / len(subject_averages), 1)
            if subject_averages
            else None
        )

        return {
            "student": student,
            "attendance_summary": att_summary,
            "overall_score_average": overall_avg,
            "subject_averages": subject_averages,
            "recent_attendance": recent_attendance,
            "recent_assessments": recent_assessments,
            "recent_engagements": recent_engagements,
            "interventions": interventions,
        }

    def create_student(
        self,
        student_data: StudentCreate,
        author_id: Optional[UUID] = None,
        author_name: Optional[str] = None,
    ) -> StudentInDB:
        """Create new student and record audit event."""
        created = self.students.create(student_data)

        # Audit trail
        try:
            self.audits.log_event(
                AuditEventCreate(
                    entity_type="student",
                    entity_id=created.id,
                    action="CREATE",
                    performed_by=author_id,
                    performed_by_name=author_name,
                    details={"student_id": created.student_id, "name": f"{created.first_name} {created.last_name}"},
                )
            )
        except Exception:
            pass  # Audit failures should not block creation in development

        return created

    # ── Attendance ─────────────────────────────────────────────────────

    def log_attendance(
        self,
        attendance_data: AttendanceCreate,
        author_id: Optional[UUID] = None,
    ) -> AttendanceInDB:
        """Record attendance session."""
        return self.attendance.create(attendance_data)

    def log_attendance_batch(
        self,
        records: List[AttendanceCreate],
    ) -> int:
        """Batch record attendance sessions."""
        return self.attendance.create_batch(records)

    # ── Assessments ────────────────────────────────────────────────────

    def record_assessment(
        self,
        assessment_data: AssessmentCreate,
        author_id: Optional[UUID] = None,
        author_name: Optional[str] = None,
    ) -> AssessmentInDB:
        """Record an academic assessment evaluation."""
        created = self.assessments.create(assessment_data)

        try:
            self.audits.log_event(
                AuditEventCreate(
                    entity_type="assessment",
                    entity_id=created.id,
                    action="CREATE",
                    performed_by=author_id,
                    performed_by_name=author_name,
                    details={
                        "title": created.title,
                        "subject": created.subject,
                        "score": created.score,
                        "max_score": created.max_score,
                    },
                )
            )
        except Exception:
            pass

        return created

    # ── Interventions & Outcomes ───────────────────────────────────────

    def create_intervention(
        self,
        intervention_data: InterventionCreate,
        author_id: Optional[UUID] = None,
        author_name: Optional[str] = None,
    ) -> InterventionInDB:
        """Initiate student support plan."""
        created = self.interventions.create(intervention_data)

        try:
            self.audits.log_event(
                AuditEventCreate(
                    entity_type="intervention",
                    entity_id=created.id,
                    action="CREATE",
                    performed_by=author_id,
                    performed_by_name=author_name,
                    details={
                        "title": created.title,
                        "type": created.intervention_type,
                        "priority": created.priority,
                    },
                )
            )
        except Exception:
            pass

        return created

    def update_intervention(
        self,
        intervention_id: UUID,
        update_data: InterventionUpdate,
        author_id: Optional[UUID] = None,
        author_name: Optional[str] = None,
    ) -> Optional[InterventionInDB]:
        """Update intervention status or details."""
        updated = self.interventions.update(intervention_id, update_data)
        if updated:
            try:
                self.audits.log_event(
                    AuditEventCreate(
                        entity_type="intervention",
                        entity_id=updated.id,
                        action="INTERVENTION_STATUS_CHANGE" if update_data.status else "UPDATE",
                        performed_by=author_id,
                        performed_by_name=author_name,
                        details={"status": updated.status},
                    )
                )
            except Exception:
                pass
        return updated

    def record_outcome(
        self,
        outcome_data: OutcomeCreate,
        author_id: Optional[UUID] = None,
        author_name: Optional[str] = None,
    ) -> OutcomeInDB:
        """Record an intervention outcome observation."""
        created = self.interventions.record_outcome(outcome_data)

        try:
            self.audits.log_event(
                AuditEventCreate(
                    entity_type="outcome",
                    entity_id=created.id,
                    action="CREATE",
                    performed_by=author_id,
                    performed_by_name=author_name,
                    details={
                        "metric": created.metric_name,
                        "baseline": created.baseline_value,
                        "post": created.post_value,
                        "status": created.outcome_status,
                    },
                )
            )
        except Exception:
            pass

        return created


# Singleton database service instance
database_service = DatabaseService()
