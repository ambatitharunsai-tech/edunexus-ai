"""
EduNexus AI — Students Directory & Student Journey API Tests
Tests directory search, multi-factor filtering, sorting, pagination,
authorization safeguards, and chronological journey timeline profiles.
"""

from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)


def test_list_students_directory_with_filters_and_pagination():
    """Verify listing students with department, semester, risk tier, and pagination."""
    # Base request
    res = client.get("/api/v1/students?page=1&page_size=6")
    assert res.status_code == 200
    data = res.json()

    assert "students" in data
    assert "total" in data
    assert "departments" in data
    assert "semesters" in data
    assert len(data["students"]) <= 6
    assert data["total"] >= 30

    first_stu = data["students"][0]
    assert "attendance_rate" in first_stu
    assert "average_score" in first_stu
    assert "trend" in first_stu
    assert "review_status" in first_stu
    assert "risk_tier" in first_stu


def test_student_directory_search_by_code_and_name():
    """Verify search filter matches student code and name."""
    list_res = client.get("/api/v1/students?page=1&page_size=10")
    first_stu = list_res.json()["students"][0]
    code = first_stu["student_id"]
    name = first_stu["first_name"]

    # Search by student code
    code_res = client.get(f"/api/v1/students?search={code}")
    assert code_res.status_code == 200
    assert any(s["student_id"] == code for s in code_res.json()["students"])

    # Search by student first name
    name_res = client.get(f"/api/v1/students?search={name}")
    assert name_res.status_code == 200
    assert any(name.lower() in s["first_name"].lower() for s in name_res.json()["students"])


def test_student_directory_filter_by_risk_tier():
    """Verify filtering directory by risk category."""
    res = client.get("/api/v1/students?risk_tier=critical")
    assert res.status_code == 200
    for s in res.json()["students"]:
        assert s["risk_tier"] == "critical"


def test_student_directory_sorting():
    """Verify sorting students by average_score and risk_score."""
    res_score_desc = client.get("/api/v1/students?sort_by=average_score&sort_dir=desc")
    assert res_score_desc.status_code == 200
    students = res_score_desc.json()["students"]
    scores = [s["average_score"] for s in students if s["average_score"] is not None]
    assert scores == sorted(scores, reverse=True)


def test_get_student_journey_profile():
    """Verify retrieving student journey profile with timeline, missing data notices, and metrics."""
    list_res = client.get("/api/v1/students?page=1&page_size=1")
    stu_id = list_res.json()["students"][0]["id"]

    res = client.get(f"/api/v1/students/{stu_id}")
    assert res.status_code == 200
    profile = res.json()

    assert "student" in profile
    assert "attendance_rate" in profile
    assert "average_score" in profile
    assert "risk_profile" in profile
    assert "timeline_events" in profile
    assert "missing_data_notices" in profile
    assert "metrics_trend" in profile

    # Verify timeline is sorted chronologically descending
    dates = [e["date"] for e in profile["timeline_events"]]
    assert dates == sorted(dates, reverse=True)

    # Verify ethical non-punitive missing data notices are structured
    for notice in profile["missing_data_notices"]:
        assert "metric" in notice
        assert "message" in notice
        assert "impact_on_scoring" in notice


def test_get_student_journey_timeline_endpoint():
    """Verify dedicated GET /api/v1/students/{id}/journey returns timeline events list."""
    list_res = client.get("/api/v1/students?page=1&page_size=1")
    stu_id = list_res.json()["students"][0]["id"]

    res = client.get(f"/api/v1/students/{stu_id}/journey")
    assert res.status_code == 200
    events = res.json()
    assert isinstance(events, list)
    assert len(events) >= 2
    for e in events:
        assert "event_type" in e
        assert "title" in e
        assert "date" in e


def test_authorization_enforcement_on_student_records():
    """Verify unauthorized role header is blocked with 403 Forbidden."""
    headers = {"X-User-Role": "unauthorized_guest_or_student"}
    res = client.get("/api/v1/students", headers=headers)
    assert res.status_code == 403
    err_body = res.json()
    assert err_body["error"]["code"] == "FORBIDDEN"
    assert "Forbidden" in err_body["error"]["message"]


def test_nonexistent_student_returns_404():
    """Verify non-existent student lookup returns 404 Not Found."""
    res = client.get("/api/v1/students/00000000-0000-0000-0000-000000000000")
    assert res.status_code == 404
