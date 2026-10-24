from app.db.repositories.student_repo import StudentRepository
from app.db.repositories.attendance_repo import AttendanceRepository
from app.db.repositories.assessment_repo import AssessmentRepository
from app.db.repositories.engagement_repo import EngagementRepository
from app.db.repositories.intervention_repo import InterventionRepository
from app.db.repositories.audit_repo import AuditRepository
from app.db.repositories.placement_repo import PlacementRepository
from app.db.repositories.skills_repo import SkillsRepository
from app.db.repositories.feedback_repo import FeedbackRepository
from app.db.repositories.lms_repo import LMSRepository

__all__ = [
    "StudentRepository",
    "AttendanceRepository",
    "AssessmentRepository",
    "EngagementRepository",
    "InterventionRepository",
    "AuditRepository",
    "PlacementRepository",
    "SkillsRepository",
    "FeedbackRepository",
    "LMSRepository",
]

