"""
EduNexus AI — Backend Authentication & Role Governance Tests
Validates /api/v1/auth/me, /api/v1/auth/register, /api/v1/admin/users,
RBAC permissions, and unauthorized access rejections.
"""

import pytest
from fastapi.testclient import TestClient
from app.main import app
from app.core.config import settings

client = TestClient(app)


def test_auth_me_advisor():
    res = client.get(
        "/api/v1/auth/me",
        headers={"Authorization": "Bearer edunexus-demo-advisor-token"},
    )
    assert res.status_code == 200
    data = res.json()
    assert data["user"]["role"] == "advisor"
    assert data["user"]["email"] == "advisor@edunexus.ai"
    assert "interventions:write" in data["permissions"]
    assert "students:read_assigned" in data["permissions"]
    assert "admin:users:write" not in data["permissions"]


def test_auth_me_admin():
    res = client.get(
        "/api/v1/auth/me",
        headers={"Authorization": "Bearer edunexus-demo-admin-token"},
    )
    assert res.status_code == 200
    data = res.json()
    assert data["user"]["role"] == "admin"
    assert "admin:users:read" in data["permissions"]
    assert "admin:users:write" in data["permissions"]
    assert "csv:import" in data["permissions"]


def test_auth_me_student():
    res = client.get(
        "/api/v1/auth/me",
        headers={"Authorization": "Bearer edunexus-demo-student-token"},
    )
    assert res.status_code == 200
    data = res.json()
    assert data["user"]["role"] == "student"
    assert data["user"]["student_id"] == "STU-001"
    assert "student_dashboard:view" in data["permissions"]
    assert "students:read_all" not in data["permissions"]
    assert "csv:import" not in data["permissions"]


def test_auth_me_data_operator():
    res = client.get(
        "/api/v1/auth/me",
        headers={"Authorization": "Bearer edunexus-demo-dataoperator-token"},
    )
    assert res.status_code == 200
    data = res.json()
    assert data["user"]["role"] == "data_operator"
    assert "csv:preview" in data["permissions"]
    assert "csv:import" in data["permissions"]
    assert "interventions:write" not in data["permissions"]


def test_auth_me_viewer():
    res = client.get(
        "/api/v1/auth/me",
        headers={"Authorization": "Bearer edunexus-demo-viewer-token"},
    )
    assert res.status_code == 200
    data = res.json()
    assert data["user"]["role"] == "viewer"
    assert "analytics:view" in data["permissions"]
    assert "interventions:write" not in data["permissions"]
    assert "csv:import" not in data["permissions"]


def test_auth_me_unauthenticated_returns_401():
    res = client.get("/api/v1/auth/me")
    assert res.status_code == 401


def test_auth_me_invalid_token_returns_401():
    res = client.get(
        "/api/v1/auth/me",
        headers={"Authorization": "Bearer invalid-fabricated-token-xyz"},
    )
    assert res.status_code == 401


def test_student_self_registration():
    res = client.post(
        "/api/v1/auth/register",
        json={
            "email": "newstudent@college.edu",
            "password": "Password123!",
            "full_name": "New Enrolled Student",
            "role": "student",
            "student_id": "STU-NEW-01",
        },
    )
    assert res.status_code == 201
    data = res.json()
    assert data["user"]["email"] == "newstudent@college.edu"
    assert data["user"]["role"] == "student"
    assert data["user"]["student_id"] == "STU-NEW-01"


def test_public_registration_cannot_claim_staff_role():
    # Anyone trying to register as admin or advisor without admin credentials gets 403 Forbidden
    res = client.post(
        "/api/v1/auth/register",
        json={
            "email": "intruder@evil.com",
            "password": "Password123!",
            "full_name": "Unauthorized Actor",
            "role": "admin",
        },
    )
    assert res.status_code == 403


def test_admin_can_provision_staff_account():
    res = client.post(
        "/api/v1/auth/register",
        headers={"Authorization": "Bearer edunexus-demo-admin-token"},
        json={
            "email": "newadvisor@edunexus.ai",
            "password": "AdvisorPassword123!",
            "full_name": "Prof. David Clark",
            "role": "advisor",
        },
    )
    assert res.status_code == 201
    data = res.json()
    assert data["user"]["email"] == "newadvisor@edunexus.ai"
    assert data["user"]["role"] == "advisor"


def test_admin_list_users():
    # Admin can list users
    res = client.get(
        "/api/v1/admin/users",
        headers={"Authorization": "Bearer edunexus-demo-admin-token"},
    )
    assert res.status_code == 200
    users = res.json()
    assert len(users) >= 4
    roles = {u["role"] for u in users}
    assert "admin" in roles
    assert "advisor" in roles


def test_non_admin_cannot_list_users():
    # Advisor, student, and anonymous cannot access admin users
    res_advisor = client.get(
        "/api/v1/admin/users",
        headers={"Authorization": "Bearer edunexus-demo-advisor-token"},
    )
    assert res_advisor.status_code == 403

    res_student = client.get(
        "/api/v1/admin/users",
        headers={"Authorization": "Bearer edunexus-demo-student-token"},
    )
    assert res_student.status_code == 403

    res_anon = client.get("/api/v1/admin/users")
    assert res_anon.status_code == 401


def test_admin_update_user_role():
    res = client.patch(
        "/api/v1/admin/users/demo-faculty-001/role",
        headers={"Authorization": "Bearer edunexus-demo-admin-token"},
        json={"role": "advisor"},
    )
    assert res.status_code == 200
    assert res.json()["role"] == "advisor"


def test_admin_update_user_invalid_role():
    res = client.patch(
        "/api/v1/admin/users/demo-faculty-001/role",
        headers={"Authorization": "Bearer edunexus-demo-admin-token"},
        json={"role": "supergod_role"},
    )
    assert res.status_code == 400


def test_admin_update_user_status_deactivation():
    res = client.patch(
        "/api/v1/admin/users/demo-advisor-001/status",
        headers={"Authorization": "Bearer edunexus-demo-admin-token"},
        json={"is_active": False},
    )
    assert res.status_code == 200
    assert res.json()["is_active"] is False

    # Deactivated user trying to call /me gets 403 Forbidden
    res_me = client.get(
        "/api/v1/auth/me",
        headers={"Authorization": "Bearer edunexus-demo-advisor-token"},
    )
    assert res_me.status_code == 403

    # Reactivate advisor for other tests
    client.patch(
        "/api/v1/admin/users/demo-advisor-001/status",
        headers={"Authorization": "Bearer edunexus-demo-admin-token"},
        json={"is_active": True},
    )
