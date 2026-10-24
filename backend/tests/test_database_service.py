"""
EduNexus AI — Database Service & Repository Unit Tests
Mocks external Supabase network calls to test data mapping, calculation formulas,
and failure modes when unconfigured.
"""

import pytest
from unittest.mock import MagicMock
from datetime import date, datetime, timezone
from uuid import uuid4

from app.db.client import (
    is_database_configured,
    verify_database_connection,
)
from app.db.repositories.student_repo import StudentRepository
from app.db.repositories.attendance_repo import AttendanceRepository
from app.db.repositories.assessment_repo import AssessmentRepository
from app.db.repositories.intervention_repo import InterventionRepository
from app.services.database_service import DatabaseService
from app.schemas.student import StudentCreate
from app.schemas.attendance import AttendanceInDB
from app.schemas.assessment import AssessmentInDB


# ── Configuration & Verification Tests ────────────────────────────────

def test_is_database_configured_returns_false_for_placeholders(monkeypatch):
    """Verify placeholder configuration is identified as unconfigured."""
    from app.core import settings
    monkeypatch.setattr(settings, "SUPABASE_URL", "https://your-project.supabase.co")
    monkeypatch.setattr(settings, "SUPABASE_SERVICE_ROLE_KEY", "your-supabase-service-role-key-placeholder")

    assert is_database_configured() is False


def test_is_database_configured_accepts_current_supabase_secret_key(monkeypatch):
    """The current Supabase secret key should configure the server database client."""
    from app.core import settings
    monkeypatch.setattr(settings, "SUPABASE_URL", "https://blgqapkuizpyaqgyqftt.supabase.co")
    monkeypatch.setattr(settings, "SUPABASE_SECRET_KEY", "sb_secret_test-only-placeholder-for-unit-test")
    monkeypatch.setattr(settings, "SUPABASE_SERVICE_ROLE_KEY", "")

    assert is_database_configured() is True


def test_verify_database_connection_reports_unconnected_when_unconfigured(monkeypatch):
    """Strict test: connection probe reports connected: False without live credentials."""
    from app.core import settings
    monkeypatch.setattr(settings, "SUPABASE_URL", "")
    monkeypatch.setattr(settings, "SUPABASE_SERVICE_ROLE_KEY", "")

    status = verify_database_connection()
    assert status["connected"] is False
    assert status["verified"] is False
    assert "not configured" in status["message"]


# ── Mocked Student Repository Tests ───────────────────────────────────

def test_student_repository_get_all_mocked():
    """Verify StudentRepository formats table responses into typed models."""
    mock_client = MagicMock()
    mock_query = MagicMock()
    mock_client.table.return_value = mock_query
    mock_query.select.return_value = mock_query
    mock_query.order.return_value = mock_query
    mock_query.range.return_value = mock_query

    now_iso = datetime.now(timezone.utc).isoformat()
    mock_student_id = str(uuid4())

    mock_query.execute.return_value = MagicMock(
        data=[
            {
                "id": mock_student_id,
                "student_id": "STU-001",
                "first_name": "Aarav",
                "last_name": "Sharma",
                "email": "aarav.sharma@edunexus-demo.example",
                "current_grade": "Grade 11",
                "academic_term": "AY 2025-26 Term 1",
                "section": "A",
                "status": "active",
                "enrollment_date": "2025-06-01",
                "created_at": now_iso,
                "updated_at": now_iso,
            }
        ],
        count=1,
    )

    repo = StudentRepository(client=mock_client)
    result = repo.get_all()

    assert result["total"] == 1
    assert len(result["students"]) == 1
    student = result["students"][0]
    assert student.first_name == "Aarav"
    assert student.student_id == "STU-001"


# ── Attendance Summary Calculation Tests ──────────────────────────────

def test_attendance_summary_calculation_logic():
    """Verify attendance rate calculation: (present + late) / total * 100."""
    student_id = uuid4()
    mock_client = MagicMock()
    repo = AttendanceRepository(client=mock_client)

    now = datetime.now(timezone.utc)
    mock_records = [
        AttendanceInDB(
            id=uuid4(),
            student_id=student_id,
            session_date=date(2025, 9, 1),
            period="full_day",
            status="present",
            created_at=now,
            updated_at=now,
        ),
        AttendanceInDB(
            id=uuid4(),
            student_id=student_id,
            session_date=date(2025, 9, 2),
            period="full_day",
            status="late",
            created_at=now,
            updated_at=now,
        ),
        AttendanceInDB(
            id=uuid4(),
            student_id=student_id,
            session_date=date(2025, 9, 3),
            period="full_day",
            status="absent",
            created_at=now,
            updated_at=now,
        ),
        AttendanceInDB(
            id=uuid4(),
            student_id=student_id,
            session_date=date(2025, 9, 4),
            period="full_day",
            status="excused",
            created_at=now,
            updated_at=now,
        ),
    ]

    # Monkeypatch get_by_student on repo
    repo.get_by_student = MagicMock(return_value=mock_records)

    summary = repo.get_summary(student_id)
    assert summary.total_sessions == 4
    assert summary.present_count == 1
    assert summary.late_count == 1
    assert summary.absent_count == 1
    assert summary.excused_count == 1
    # Attended = 1 present + 1 late = 2 / 4 = 50.0%
    assert summary.attendance_rate == 50.0


# ── Assessment Repository Subject Averages Tests ──────────────────────

def test_assessment_subject_averages_calculation():
    """Verify average percentage score calculation per subject."""
    student_id = uuid4()
    mock_client = MagicMock()
    repo = AssessmentRepository(client=mock_client)

    now = datetime.now(timezone.utc)
    mock_evaluations = [
        # Math: 18/20 = 90%, 80/100 = 80% -> average 85%
        AssessmentInDB(
            id=uuid4(),
            student_id=student_id,
            title="Math Quiz",
            subject="Mathematics",
            assessment_type="quiz",
            term="Term 1",
            assessment_date=date(2025, 9, 1),
            score=18.0,
            max_score=20.0,
            created_at=now,
            updated_at=now,
        ),
        AssessmentInDB(
            id=uuid4(),
            student_id=student_id,
            title="Math Midterm",
            subject="Mathematics",
            assessment_type="midterm",
            term="Term 1",
            assessment_date=date(2025, 9, 15),
            score=80.0,
            max_score=100.0,
            created_at=now,
            updated_at=now,
        ),
        # Science: 45/50 = 90%
        AssessmentInDB(
            id=uuid4(),
            student_id=student_id,
            title="Science Lab",
            subject="Science",
            assessment_type="lab",
            term="Term 1",
            assessment_date=date(2025, 9, 20),
            score=45.0,
            max_score=50.0,
            created_at=now,
            updated_at=now,
        ),
    ]

    repo.get_by_student = MagicMock(return_value=mock_evaluations)

    averages = repo.get_subject_averages(student_id)
    assert averages["Mathematics"] == 85.0
    assert averages["Science"] == 90.0


# ── Intervention Repository With Outcomes Tests ───────────────────────

def test_intervention_with_outcomes_joined():
    """Verify InterventionRepository retrieves intervention and binds its outcomes."""
    mock_client = MagicMock()
    intervention_id = uuid4()
    student_id = uuid4()
    now_iso = datetime.now(timezone.utc).isoformat()

    int_query = MagicMock()
    out_query = MagicMock()

    mock_client.table.side_effect = lambda t: int_query if t == "interventions" else out_query

    int_query.select.return_value = int_query
    int_query.eq.return_value = int_query
    int_query.limit.return_value = int_query
    int_query.execute.return_value = MagicMock(
        data=[
            {
                "id": str(intervention_id),
                "student_id": str(student_id),
                "title": "Mathematics Tutoring",
                "intervention_type": "academic_tutoring",
                "priority": "high",
                "status": "in_progress",
                "description": "Weekly algebra coaching",
                "start_date": "2025-09-01",
                "created_at": now_iso,
                "updated_at": now_iso,
            }
        ]
    )

    out_query.select.return_value = out_query
    out_query.eq.return_value = out_query
    out_query.order.return_value = out_query
    out_query.execute.return_value = MagicMock(
        data=[
            {
                "id": str(uuid4()),
                "intervention_id": str(intervention_id),
                "metric_name": "math_score",
                "baseline_value": 54.0,
                "post_value": 68.0,
                "target_value": 75.0,
                "measurement_date": "2025-09-20",
                "outcome_status": "improved",
                "causation_disclaimer": "Observed change reflects correlation during intervention interval; causal relationship not established without control study.",
                "created_at": now_iso,
                "updated_at": now_iso,
            }
        ]
    )

    repo = InterventionRepository(client=mock_client)
    res = repo.get_by_id(intervention_id)

    assert res is not None
    assert res.title == "Mathematics Tutoring"
    assert len(res.outcomes) == 1
    assert res.outcomes[0].baseline_value == 54.0
    assert res.outcomes[0].post_value == 68.0
    assert "causal relationship not established" in res.outcomes[0].causation_disclaimer
