"""Security and behavior tests for the student self-dashboard."""

import json

from app.core import auth


STUDENT_HEADERS = {"Authorization": "Bearer edunexus-demo-student-token"}
ADVISOR_HEADERS = {"Authorization": "Bearer edunexus-demo-advisor-token"}


def test_student_dashboard_returns_only_the_linked_student(client):
    response = client.get("/api/v1/students/me/dashboard", headers=STUDENT_HEADERS)

    assert response.status_code == 200
    payload = response.json()
    assert payload["student"]["student_id"] == "STU-001"
    assert payload["student"]["first_name"]
    assert "metrics" in payload
    assert "domains" in payload
    assert "recent_assessments" in payload
    assert "recent_attendance" in payload
    assert "support_plans" in payload

    # The self-dashboard is a narrow projection and must never return cohort data
    # or records belonging to another student.
    serialized = json.dumps(payload)
    assert "summary" not in payload
    assert "follow_up_students" not in payload
    assert "STU-002" not in serialized
    assert "recent_activity" not in payload
    assert "notes" not in payload["student"]
    assert all("description" not in plan for plan in payload["support_plans"])


def test_student_dashboard_rejects_staff_accounts(client):
    response = client.get("/api/v1/students/me/dashboard", headers=ADVISOR_HEADERS)
    assert response.status_code == 403


def test_student_dashboard_requires_authentication(client):
    response = client.get("/api/v1/students/me/dashboard", headers={"Authorization": ""})
    assert response.status_code == 401


def test_student_cannot_read_staff_directory(client):
    response = client.get("/api/v1/students?page=1&page_size=10", headers=STUDENT_HEADERS)
    assert response.status_code == 403


def test_student_dashboard_does_not_guess_when_account_is_unlinked(client, monkeypatch):
    # A verified token with an unknown server-side student link must not fall
    # back to a sample profile or expose another student's data.
    original = auth.DEMO_TOKENS["edunexus-demo-student-token"]
    monkeypatch.setitem(
        auth.DEMO_TOKENS,
        "edunexus-demo-student-token",
        {**original, "student_id": "STU-999"},
    )
    response = client.get("/api/v1/students/me/dashboard", headers=STUDENT_HEADERS)
    assert response.status_code == 404
    # The endpoint fails closed instead of guessing or returning another profile.
    assert "STU-001" not in response.text
