"""
EduNexus AI — Authorization & Security Test Suite
Verifies genuine Bearer token validation, rejection of spoofed X-User-Role headers,
role-based access control (RBAC), and protection of sensitive mutation endpoints.
"""

import pytest
from datetime import date
from fastapi.testclient import TestClient
from app.main import app

# Unauthenticated client with clean headers (no auto-injected auth)
clean_client = TestClient(app)


def test_unauthenticated_mutation_returns_401():
    """Verify mutation without Authorization header returns 401 Unauthorized."""
    payload = {
        "student_id": "90000000-0000-0000-0000-000000000001",
        "title": "Unauthorized Tutoring Plan",
        "description": "Attempting creation without token.",
        "intervention_type": "academic_tutoring",
        "priority": "medium",
        "start_date": str(date.today()),
        "target_completion_date": str(date.today()),
    }
    # No Authorization header
    res = clean_client.post("/api/v1/interventions", json=payload)
    assert res.status_code == 401
    err = res.json()
    assert err["error"]["code"] == "UNAUTHORIZED"
    assert "Authentication credentials required" in err["error"]["message"]


def test_public_dashboard_overview_accessible_without_token_in_production(monkeypatch):
    """Verify that unauthenticated visitors in production receive safe, read-only demo dashboard analytics."""
    from app.core.config import settings

    monkeypatch.setattr(settings, "ENVIRONMENT", "production")
    response = clean_client.get("/api/v1/dashboard/overview")

    assert response.status_code == 200
    data = response.json()
    assert "summary" in data
    assert data["metadata"]["is_demo"] is True


def test_public_dashboard_overview_with_demo_token_in_production_does_not_fail(monkeypatch):
    """Verify that visitors whose browsers send demo tokens do not receive 401 on the public dashboard in production."""
    from app.core.config import settings

    monkeypatch.setattr(settings, "ENVIRONMENT", "production")
    headers = {"Authorization": "Bearer edunexus-demo-advisor-token"}
    response = clean_client.get("/api/v1/dashboard/overview", headers=headers)

    assert response.status_code == 200
    data = response.json()
    assert "summary" in data
    assert data["metadata"]["is_demo"] is True


def test_students_directory_accessible_without_token_in_production(monkeypatch):
    """Verify that unauthenticated visitors in production receive safe demo student records rather than an error."""
    from app.core.config import settings

    monkeypatch.setattr(settings, "ENVIRONMENT", "production")
    response = clean_client.get("/api/v1/students")

    assert response.status_code == 200
    data = response.json()
    assert "students" in data
    assert len(data["students"]) > 0


def test_student_role_cannot_access_staff_directory(client: TestClient):
    """Verify that explicit student tokens are rejected with 403 Forbidden on the directory."""
    headers = {"Authorization": "Bearer edunexus-demo-student-token"}
    response = client.get("/api/v1/students", headers=headers)
    assert response.status_code == 403
    assert response.json()["error"]["code"] == "FORBIDDEN"



def test_spoofed_x_user_role_without_token_returns_401():
    """Verify spoofed X-User-Role: admin without a valid Bearer token is rejected."""
    payload = {
        "student_id": "90000000-0000-0000-0000-000000000001",
        "title": "Spoofed Admin Plan",
        "description": "Attempting creation with spoofed header.",
        "intervention_type": "academic_tutoring",
        "priority": "high",
        "start_date": str(date.today()),
        "target_completion_date": str(date.today()),
    }
    # Spoofed role without Authorization token
    res = clean_client.post(
        "/api/v1/interventions",
        json=payload,
        headers={"X-User-Role": "admin"},
    )
    assert res.status_code == 401
    assert res.json()["error"]["code"] == "UNAUTHORIZED"


def test_invalid_bearer_token_returns_401():
    """Verify malformed or invalid Bearer token returns 401."""
    res = clean_client.post(
        "/api/v1/interventions",
        json={},
        headers={"Authorization": "Bearer invalid-garbage-token-12345"},
    )
    assert res.status_code == 401
    assert res.json()["error"]["code"] == "UNAUTHORIZED"


def test_student_role_token_blocked_on_mutations_with_403():
    """Verify student bearer token is forbidden from creating interventions or overrides."""
    student_headers = {"Authorization": "Bearer edunexus-demo-student-token"}

    # 1. Attempt intervention creation
    payload = {
        "student_id": "90000000-0000-0000-0000-000000000001",
        "title": "Student Self Intervention",
        "description": "Students cannot assign official interventions.",
        "intervention_type": "academic_tutoring",
        "priority": "low",
        "start_date": str(date.today()),
        "target_completion_date": str(date.today()),
    }
    res = clean_client.post("/api/v1/interventions", json=payload, headers=student_headers)
    assert res.status_code == 403
    assert res.json()["error"]["code"] == "FORBIDDEN"

    # 2. Attempt risk override
    res_ov = clean_client.post(
        "/api/v1/students/STU-001/risk-override",
        json={"override_tier": "low", "reason": "Self adjustment"},
        headers=student_headers,
    )
    assert res_ov.status_code == 403
    assert res_ov.json()["error"]["code"] == "FORBIDDEN"

    # 3. Attempt CSV preview
    res_csv = clean_client.post(
        "/api/v1/csv/preview",
        json={"file_content": "id,name", "data_type": "students"},
        headers=student_headers,
    )
    assert res_csv.status_code == 403
    assert res_csv.json()["error"]["code"] == "FORBIDDEN"


def test_staff_bearer_token_permits_intervention_and_outcome_mutations():
    """Verify staff advisor bearer token successfully executes mutations."""
    staff_headers = {"Authorization": "Bearer edunexus-demo-advisor-token"}

    # 1. Fetch valid student
    stu_res = clean_client.get("/api/v1/students?page=1&page_size=1", headers=staff_headers)
    assert stu_res.status_code == 200
    stu_id = stu_res.json()["students"][0]["id"]

    # 2. Create intervention
    payload = {
        "student_id": stu_id,
        "title": "Verified Auth Support Tutoring",
        "description": "Testing authenticated staff mutation.",
        "intervention_type": "academic_tutoring",
        "priority": "high",
        "start_date": str(date.today()),
        "target_completion_date": str(date.today()),
    }
    create_res = clean_client.post("/api/v1/interventions", json=payload, headers=staff_headers)
    assert create_res.status_code == 201
    intv_id = create_res.json()["id"]

    # 3. Record outcome
    outcome_payload = {
        "metric_name": "Calculus Quiz Score",
        "baseline_value": 45.0,
        "post_value": 68.0,
        "measurement_date": str(date.today()),
        "evidence_notes": "Significant concept mastery observed.",
    }
    outcome_res = clean_client.post(
        f"/api/v1/interventions/{intv_id}/outcomes",
        json=outcome_payload,
        headers=staff_headers,
    )
    assert outcome_res.status_code == 201
    out_data = outcome_res.json()
    assert out_data["baseline_value"] == 45.0
    assert out_data["post_value"] == 68.0
    assert out_data["absolute_change"] == 23.0

    # 4. Cancel intervention
    del_res = clean_client.delete(f"/api/v1/interventions/{intv_id}", headers=staff_headers)
    assert del_res.status_code == 200


def test_staff_bearer_token_risk_override_lifecycle():
    """Verify staff advisor can set and clear human risk overrides."""
    staff_headers = {"Authorization": "Bearer edunexus-demo-advisor-token"}

    # Post override
    ov_res = clean_client.post(
        "/api/v1/students/STU-001/risk-override",
        json={
            "override_tier": "critical",
            "reason": "Counselor requested urgent evaluation.",
            "reviewed_by": "Academic Advisor Sharma",
        },
        headers=staff_headers,
    )
    assert ov_res.status_code == 200
    assert ov_res.json()["is_overridden"] is True
    assert ov_res.json()["override_tier"] == "critical"

    # Clear override
    del_res = clean_client.delete("/api/v1/students/STU-001/risk-override", headers=staff_headers)
    assert del_res.status_code == 200
    assert "cleared successfully" in del_res.json()["message"]


def test_evaluator_bearer_token_access():
    """Verify KPMG evaluator demo token is recognized with evaluator privileges."""
    eval_headers = {"Authorization": "Bearer edunexus-demo-evaluator-token"}
    res = clean_client.get("/api/v1/students?page=1&page_size=5", headers=eval_headers)
    assert res.status_code == 200
    assert res.json()["total"] >= 30


def test_demo_token_disabled_in_production(monkeypatch):
    """Verify demo tokens are strictly rejected when ENVIRONMENT is production."""
    from app.core.config import settings
    monkeypatch.setattr(settings, "ENVIRONMENT", "production")

    headers = {"Authorization": "Bearer edunexus-demo-advisor-token"}
    res = clean_client.post(
        "/api/v1/students/STU-001/risk-override",
        json={"override_tier": "critical", "reason": "Testing prod rejection"},
        headers=headers,
    )
    assert res.status_code == 401
    assert "disabled in production" in res.json()["error"]["message"]


def test_auth_register_endpoint():
    """Verify that institutional user registration endpoint accepts valid payloads and issues access token."""
    payload = {
        "email": "test_register_check@edunexus.ai",
        "password": "ValidPassword123!",
        "first_name": "Test",
        "last_name": "User",
        "role": "advisor",
    }
    res = clean_client.post("/api/v1/auth/register", json=payload)
    assert res.status_code == 200
    data = res.json()
    assert data["status"] == "success"
    assert data["email"] == "test_register_check@edunexus.ai"
    assert data["role"] == "advisor"
    assert "access_token" in data
    assert data["access_token"] == "edunexus-demo-advisor-token"


def test_auth_register_student_endpoint():
    """Verify that student registration provides student token and retains student_id."""
    payload = {
        "email": "student_register_test@edunexus.ai",
        "password": "ValidPassword123!",
        "first_name": "Priya",
        "last_name": "Nair",
        "role": "student",
        "department": "Computer Science & Engineering",
        "student_id": "STU-9999",
        "semester": "Semester 6",
    }
    res = clean_client.post("/api/v1/auth/register", json=payload)
    assert res.status_code == 200
    data = res.json()
    assert data["status"] == "success"
    assert data["email"] == "student_register_test@edunexus.ai"
    assert data["role"] == "student"
    assert data["access_token"] == "edunexus-demo-student-token"


def test_auth_register_unconfigured_database_fallback(monkeypatch):
    """Verify that registration cleanly falls back to demo mode when DB is unconfigured."""
    import app.api.v1.auth as auth_mod
    monkeypatch.setattr(auth_mod, "is_database_configured", lambda: False)

    payload = {
        "email": "unconfigured_db_test@edunexus.ai",
        "password": "ValidPassword123!",
        "first_name": "Demo",
        "last_name": "User",
        "role": "student",
    }
    res = clean_client.post("/api/v1/auth/register", json=payload)
    assert res.status_code == 200
    data = res.json()
    assert data["status"] == "success"
    assert data["is_demo"] is True
    assert "access_token" in data


def test_auth_login_demo_preset_success():
    """Verify that institutional demo logins succeed immediately via POST /api/v1/auth/login."""
    payload = {
        "email": "advisor@edunexus.ai",
        "password": "demo-secure-password",
        "role": "advisor",
    }
    res = clean_client.post("/api/v1/auth/login", json=payload)
    assert res.status_code == 200
    data = res.json()
    assert data["status"] == "success"
    assert data["role"] == "advisor"
    assert data["access_token"] == "edunexus-demo-advisor-token"


def test_auth_login_evaluation_password_success():
    """Verify that evaluation passwords authenticate successfully for evaluators."""
    payload = {
        "email": "evaluator.reviewer@campus.edu",
        "password": "EduNexus@2026!",
        "role": "faculty",
    }
    res = clean_client.post("/api/v1/auth/login", json=payload)
    assert res.status_code == 200
    data = res.json()
    assert data["status"] == "success"
    assert data["role"] == "faculty"
    assert data["access_token"] == "edunexus-demo-faculty-token"


def test_auth_login_unknown_credentials_rejected():
    """Verify that completely unknown credentials without demo password return 401."""
    payload = {
        "email": "nonexistent.unknown@nowhere.edu",
        "password": "RandomUnknownPassword999!",
    }
    res = clean_client.post("/api/v1/auth/login", json=payload)
    assert res.status_code == 401
    err_body = res.json()
    err_msg = err_body.get("detail") or err_body.get("error", {}).get("message", "")
    assert "Invalid email or password" in err_msg




