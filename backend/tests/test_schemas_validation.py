"""
EduNexus AI — Schema Validation Unit Tests
Verifies domain model integrity, boundary checks, and range constraints.
"""

import pytest
from datetime import date, timedelta
from uuid import uuid4
from pydantic import ValidationError

from app.schemas.student import StudentCreate
from app.schemas.attendance import AttendanceCreate
from app.schemas.assessment import AssessmentCreate, AssessmentUpdate
from app.schemas.intervention import InterventionCreate
from app.schemas.outcome import OutcomeCreate, DEFAULT_CAUSATION_DISCLAIMER
from app.schemas.audit import AuditEventCreate


def test_student_validation_valid():
    """Verify valid student model passes validation."""
    student = StudentCreate(
        student_id="STU-101",
        first_name="Rohan",
        last_name="Mehta",
        email="rohan.mehta@edunexus-demo.example",
        current_grade="Grade 11",
        academic_term="AY 2025-26 Term 1",
        section="A",
        status="active",
    )
    assert student.student_id == "STU-101"
    assert student.first_name == "Rohan"
    assert student.status == "active"


def test_student_validation_invalid_status():
    """Verify invalid status string raises ValidationError."""
    with pytest.raises(ValidationError):
        StudentCreate(
            student_id="STU-102",
            first_name="Diya",
            last_name="Patel",
            current_grade="Grade 10",
            academic_term="AY 2025-26 Term 1",
            status="expelled",  # Not in allowed StudentStatus literal
        )


def test_student_validation_invalid_email():
    """Verify malformed email raises ValidationError."""
    with pytest.raises(ValidationError):
        StudentCreate(
            student_id="STU-103",
            first_name="Aarav",
            last_name="Sharma",
            email="not-an-email-address",
            current_grade="Grade 11",
            academic_term="AY 2025-26 Term 1",
        )


# ── Assessment Marks Validation ───────────────────────────────────────

def test_assessment_valid_marks():
    """Verify valid assessment creation with separate score and max_score."""
    asst = AssessmentCreate(
        student_id=uuid4(),
        title="Midterm Mathematics",
        subject="Mathematics",
        assessment_type="midterm",
        term="Term 1",
        assessment_date=date.today(),
        score=82.5,
        max_score=100.0,
        weight_percentage=25.0,
    )
    assert asst.score == 82.5
    assert asst.max_score == 100.0


def test_assessment_score_cannot_exceed_max_score():
    """Verify strict constraint: score > max_score raises validation error."""
    with pytest.raises(ValueError, match="cannot exceed maximum possible marks"):
        AssessmentCreate(
            student_id=uuid4(),
            title="Calculus Quiz",
            subject="Mathematics",
            assessment_type="quiz",
            term="Term 1",
            assessment_date=date.today(),
            score=105.0,     # Exceeds max_score
            max_score=100.0,
        )


def test_assessment_negative_score_rejected():
    """Verify score cannot be negative."""
    with pytest.raises(ValidationError):
        AssessmentCreate(
            student_id=uuid4(),
            title="Physics Practical",
            subject="Physics",
            assessment_type="lab",
            term="Term 1",
            assessment_date=date.today(),
            score=-5.0,      # Negative score
            max_score=25.0,
        )


def test_assessment_zero_or_negative_max_score_rejected():
    """Verify max_score must be strictly positive."""
    with pytest.raises(ValidationError):
        AssessmentCreate(
            student_id=uuid4(),
            title="English Essay",
            subject="English",
            assessment_type="assignment",
            term="Term 1",
            assessment_date=date.today(),
            score=0.0,
            max_score=0.0,   # Must be > 0
        )


def test_assessment_update_validation():
    """Verify score <= max_score constraint also enforces on updates."""
    with pytest.raises(ValueError, match="cannot exceed maximum marks"):
        AssessmentUpdate(score=50.0, max_score=40.0)


# ── Attendance Validation ─────────────────────────────────────────────

def test_attendance_valid_creation():
    """Verify valid attendance session."""
    att = AttendanceCreate(
        student_id=uuid4(),
        session_date=date.today(),
        period="full_day",
        status="present",
        remarks="Attended on time",
    )
    assert att.status == "present"


def test_attendance_invalid_status_rejected():
    """Verify unallowed attendance status string fails."""
    with pytest.raises(ValidationError):
        AttendanceCreate(
            student_id=uuid4(),
            session_date=date.today(),
            period="full_day",
            status="skipped",  # Not in present/absent/late/excused
        )


# ── Intervention & Outcome Validation ─────────────────────────────────

def test_intervention_date_order_validation():
    """Verify target completion date cannot precede start date."""
    today = date.today()
    yesterday = today - timedelta(days=1)

    with pytest.raises(ValueError, match="cannot precede start date"):
        InterventionCreate(
            student_id=uuid4(),
            title="Math Coaching",
            intervention_type="academic_tutoring",
            priority="high",
            status="planned",
            description="Remedial algebra session",
            start_date=today,
            target_completion_date=yesterday,  # Invalid chronology
        )


def test_outcome_causation_disclaimer_enforced():
    """Verify mandatory causation disclaimer is automatically provided."""
    outcome = OutcomeCreate(
        intervention_id=uuid4(),
        metric_name="attendance_percentage",
        baseline_value=64.0,
        post_value=78.5,
        target_value=80.0,
        outcome_status="improved",
    )
    assert outcome.causation_disclaimer == DEFAULT_CAUSATION_DISCLAIMER
    assert "causal relationship not established without control study" in outcome.causation_disclaimer


# ── Audit Event Validation ────────────────────────────────────────────

def test_audit_event_creation():
    """Verify audit event creation schema."""
    entity_id = uuid4()
    audit = AuditEventCreate(
        entity_type="student",
        entity_id=entity_id,
        action="UPDATE",
        performed_by_name="Advisor Test",
        details={"field": "status", "old": "active", "new": "on_leave"},
    )
    assert audit.action == "UPDATE"
    assert audit.entity_id == entity_id
