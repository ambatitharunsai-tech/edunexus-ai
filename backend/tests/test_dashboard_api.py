"""
EduNexus AI — Dashboard & Analytics API Tests
Verifies dashboard overview, student directory, detailed journey, and intervention creation.
"""

from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)
client.headers["Authorization"] = "Bearer edunexus-demo-advisor-token"


def test_dashboard_overview_endpoint():
    """Verify GET /api/v1/dashboard/overview returns full structured analytics payload."""
    response = client.get("/api/v1/dashboard/overview")
    assert response.status_code == 200
    data = response.json()

    # Check top-level keys
    assert "summary" in data
    assert "attendance_trend" in data
    assert "assessment_trend" in data
    assert "risk_distribution" in data
    assert "recent_activity" in data
    assert "follow_up_students" in data
    assert "intervention_summary" in data
    assert "metadata" in data

    # Check summary metrics
    summary = data["summary"]
    assert summary["total_students"] >= 30
    assert summary["active_students"] > 0
    assert summary["average_attendance"] > 0
    assert summary["requiring_review_count"] >= 0

    # Check risk distribution has tiers
    tiers = [t["tier"] for t in data["risk_distribution"]]
    assert set(tiers).issubset({"low", "moderate", "medium", "high", "critical", "insufficient_data"})

    # Check attendance trends has points with thresholds
    assert len(data["attendance_trend"]) >= 4
    for point in data["attendance_trend"]:
        assert point["threshold"] == 80.0
        assert 0 <= point["attendance_rate"] <= 100

    # Check metadata flags
    meta = data["metadata"]
    assert "is_demo" in meta
    assert "disclaimer" in meta


def test_students_api_list_and_search():
    """Verify GET /api/v1/students returns paginated records with computed indicators."""
    response = client.get("/api/v1/students?page=1&page_size=10")
    assert response.status_code == 200
    data = response.json()

    assert "students" in data
    assert "total" in data
    assert data["total"] >= 30
    assert len(data["students"]) <= 10

    first_student = data["students"][0]
    assert "student_id" in first_student
    assert "first_name" in first_student
    assert "attendance_rate" in first_student

    # Test search
    search_res = client.get(f"/api/v1/students?search={first_student['first_name']}")
    assert search_res.status_code == 200
    search_data = search_res.json()
    assert search_data["total"] >= 1


def test_student_detail_journey_endpoint():
    """Verify GET /api/v1/students/{id} returns comprehensive journey profile."""
    # First get student id
    list_res = client.get("/api/v1/students?page=1&page_size=1")
    first_student = list_res.json()["students"][0]
    stu_id = first_student["id"]

    res = client.get(f"/api/v1/students/{stu_id}")
    assert res.status_code == 200
    profile = res.json()

    assert "student" in profile
    assert "attendance_rate" in profile
    assert "risk_profile" in profile
    assert "recent_attendance" in profile
    assert "recent_assessments" in profile
    assert "interventions" in profile


def test_create_and_list_intervention():
    """Verify POST and GET /api/v1/interventions workflow."""
    # Fetch a valid student id
    list_res = client.get("/api/v1/students?page=1&page_size=1")
    stu_id = list_res.json()["students"][0]["id"]

    payload = {
        "student_id": stu_id,
        "title": "Mathematics Dedicated Remedial Tutoring",
        "description": "Weekly peer mentorship for calculus and algebra concept mastery.",
        "intervention_type": "academic_tutoring",
        "priority": "high",
        "start_date": "2026-10-15",
        "target_completion_date": "2026-11-15",
        "assigned_staff_name": "Prof. S. Ramanujan",
        "notes": "Targeting 15% improvement in upcoming assessment cycle.",
    }

    create_res = client.post("/api/v1/interventions", json=payload)
    assert create_res.status_code == 201
    created = create_res.json()
    assert created["title"] == payload["title"]
    assert created["status"] == "planned"

    # Verify listed in GET /api/v1/interventions
    list_intv = client.get(f"/api/v1/interventions?student_id={stu_id}")
    assert list_intv.status_code == 200
    found = any(i["id"] == created["id"] for i in list_intv.json())
    assert found is True


def test_production_refuses_synthetic_fallback_without_database(monkeypatch):
    """A production deployment must fail closed instead of returning repository seed data."""
    import pytest
    from fastapi import HTTPException
    from app.core.config import settings
    import app.db.client as db_client
    from app.services.dashboard_service import DashboardService

    monkeypatch.setattr(settings, "ENVIRONMENT", "production")
    monkeypatch.setattr(db_client, "is_database_configured", lambda: False)

    with pytest.raises(HTTPException) as exc_info:
        DashboardService()._load_synthetic_data()

    assert exc_info.value.status_code == 503
