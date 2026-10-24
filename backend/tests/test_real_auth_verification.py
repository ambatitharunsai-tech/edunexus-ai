"""
EduNexus AI — Comprehensive Real User Authentication & Authorization Verification Suite
Tests cryptographic Supabase JWT verification (ES256 / HS256), nested /auth/me contract,
role enforcement, RLS student data isolation, and account linking security.
"""

import time
from uuid import uuid4
import jwt
import pytest
from cryptography.hazmat.primitives.asymmetric import ec
from fastapi.testclient import TestClient

from app.main import app
from app.core.config import settings
from app.core import auth
from app.core.auth import get_current_user, AuthenticatedUser
from app.api.v1.auth import _SYNTHETIC_USERS

client = TestClient(app)

# Generate an ephemeral ES256 key pair for testing asymmetric Supabase tokens
_test_ec_private_key = ec.generate_private_key(ec.SECP256R1())
_test_ec_public_key = _test_ec_private_key.public_key()
TEST_JWT_SECRET = "test-very-secure-jwt-secret-for-edunexus-auth-testing-only"


def create_test_token(
    sub: str,
    email: str = "student@edunexus.ai",
    role: str = "student",
    student_id: str = None,
    user_meta_role: str = None,
    algorithm: str = "HS256",
    secret: str = TEST_JWT_SECRET,
    aud: str = "authenticated",
    exp_offset: int = 3600,
) -> str:
    now = int(time.time())
    app_meta = {"role": role}
    if student_id:
        app_meta["student_id"] = student_id

    user_meta = {"full_name": f"User {sub[:8]}"}
    if user_meta_role:
        user_meta["role"] = user_meta_role  # Spoof attempt in user_metadata

    claims = {
        "sub": sub,
        "email": email,
        "aud": aud,
        "iss": settings.SUPABASE_JWT_ISSUER or "https://test.supabase.co/auth/v1",
        "iat": now,
        "exp": now + exp_offset,
        "app_metadata": app_meta,
        "user_metadata": user_meta,
    }

    if algorithm == "ES256":
        return jwt.encode(claims, _test_ec_private_key, algorithm="ES256", headers={"kid": "test-key-id"})
    return jwt.encode(claims, secret, algorithm="HS256")


def test_auth_me_nested_response_contract(monkeypatch):
    """Verify backend GET /auth/me strictly conforms to { user: { ... }, permissions: [...] }."""
    monkeypatch.setattr(settings, "SUPABASE_JWT_SECRET", TEST_JWT_SECRET)
    user_id = str(uuid4())
    token = create_test_token(sub=user_id, email="student@edunexus.ai", role="student", student_id="STU-001")

    res = client.get("/api/v1/auth/me", headers={"Authorization": f"Bearer {token}"})
    assert res.status_code == 200
    data = res.json()

    # Must contain top-level 'user' and 'permissions'
    assert "user" in data
    assert "permissions" in data
    # Profile attributes must be in user object
    assert data["user"]["id"] == user_id
    assert data["user"]["email"] == "student@edunexus.ai"
    assert data["user"]["role"] == "student"
    assert data["user"]["student_id"] == "STU-001"
    assert data["user"]["is_active"] is True
    assert "student_dashboard:view" in data["permissions"]


def test_es256_asymmetric_token_verification(monkeypatch):
    """Verify asymmetric ES256 Supabase token is cryptographically verified."""
    # Mock JWKS client to return our test public key
    class MockSigningKey:
        key = _test_ec_public_key

    class MockJWKSClient:
        uri = "https://mock.supabase.co/auth/v1/.well-known/jwks.json"
        def get_signing_key_from_jwt(self, token):
            return MockSigningKey()

    monkeypatch.setattr(auth, "_get_jwks_client", lambda url: MockJWKSClient())
    monkeypatch.setattr(settings, "SUPABASE_URL", "https://mock.supabase.co")

    user_id = str(uuid4())
    token = create_test_token(sub=user_id, email="es256.user@college.edu", role="faculty", algorithm="ES256")

    user = get_current_user(f"Bearer {token}")
    assert user.user_id == user_id
    assert user.email == "es256.user@college.edu"
    assert user.role == "faculty"


def test_user_metadata_role_spoofing_prevented(monkeypatch):
    """An ordinary user putting role: admin in client-writable user_metadata CANNOT gain admin privileges."""
    monkeypatch.setattr(settings, "SUPABASE_JWT_SECRET", TEST_JWT_SECRET)
    user_id = str(uuid4())
    # Attacker sets role='student' in app_metadata but 'admin' in user_metadata
    token = create_test_token(
        sub=user_id,
        email="attacker@edunexus.ai",
        role="student",
        user_meta_role="admin",
    )

    user = get_current_user(f"Bearer {token}")
    # Role must come strictly from server-managed app_metadata
    assert user.role == "student"

    # Attacker trying to access admin endpoints gets 403 Forbidden
    res = client.get("/api/v1/admin/users", headers={"Authorization": f"Bearer {token}"})
    assert res.status_code == 403


def test_expired_token_rejected_with_401(monkeypatch):
    """Verify expired token returns 401 Unauthorized."""
    monkeypatch.setattr(settings, "SUPABASE_JWT_SECRET", TEST_JWT_SECRET)
    expired_token = create_test_token(sub=str(uuid4()), exp_offset=-300)

    res = client.get("/api/v1/auth/me", headers={"Authorization": f"Bearer {expired_token}"})
    assert res.status_code == 401
    msg = res.json().get("detail") or res.json().get("error", {}).get("message", "")
    assert "Invalid, expired, or unverifiable" in msg


def test_wrong_signature_token_rejected_with_401(monkeypatch):
    """Verify token signed with wrong secret is rejected with 401."""
    monkeypatch.setattr(settings, "SUPABASE_JWT_SECRET", TEST_JWT_SECRET)
    forged_token = create_test_token(sub=str(uuid4()), secret="completely-wrong-unauthorized-secret")

    res = client.get("/api/v1/auth/me", headers={"Authorization": f"Bearer {forged_token}"})
    assert res.status_code == 401


def test_untrusted_audience_token_rejected_with_401(monkeypatch):
    """Verify token with forged/untrusted audience claim is rejected."""
    monkeypatch.setattr(settings, "SUPABASE_JWT_SECRET", TEST_JWT_SECRET)
    bad_aud_token = create_test_token(sub=str(uuid4()), aud="forged-client-aud")

    res = client.get("/api/v1/auth/me", headers={"Authorization": f"Bearer {bad_aud_token}"})
    assert res.status_code == 401


def test_production_rejects_demo_evaluation_tokens(monkeypatch):
    """Verify demo tokens are strictly forbidden when ENVIRONMENT is production."""
    monkeypatch.setattr(settings, "ENVIRONMENT", "production")

    for demo_token in auth.DEMO_TOKENS.keys():
        res = client.get("/api/v1/auth/me", headers={"Authorization": f"Bearer {demo_token}"})
        assert res.status_code == 401
        msg = res.json().get("detail") or res.json().get("error", {}).get("message", "")
        assert "disabled in production" in msg


def test_student_cannot_claim_another_student_record():
    """Verify student registration rejects claiming an already claimed student ID."""
    # Attempt to register with a student_id that is already registered
    res = client.post(
        "/api/v1/auth/register",
        json={
            "email": "intruder@college.edu",
            "password": "Password123!",
            "full_name": "Intruder User",
            "role": "student",
            "student_id": "STU-001",  # Belongs to demo-student-001 (student@edunexus.ai)
        },
    )
    assert res.status_code == 409
    msg = res.json().get("detail") or res.json().get("error", {}).get("message", "")
    assert "already been linked" in msg


def test_student_data_isolation_on_student_dashboard(monkeypatch):
    """Verify student self-dashboard returns only that student's records and rejects reading others."""
    monkeypatch.setattr(settings, "SUPABASE_JWT_SECRET", TEST_JWT_SECRET)
    token = create_test_token(sub="student-stu-001", email="student@edunexus.ai", role="student", student_id="STU-001")

    res = client.get("/api/v1/students/me/dashboard", headers={"Authorization": f"Bearer {token}"})
    assert res.status_code == 200
    data = res.json()
    assert data["student"]["student_id"] == "STU-001"
    assert "STU-002" not in str(data)

    # Student cannot read staff student directory
    res_dir = client.get("/api/v1/students", headers={"Authorization": f"Bearer {token}"})
    assert res_dir.status_code == 403


def test_deactivated_user_in_profiles_rejected(monkeypatch):
    """Verify deactivated user receives 403 Forbidden even with valid token."""
    monkeypatch.setattr(settings, "SUPABASE_JWT_SECRET", TEST_JWT_SECRET)
    # Target demo-advisor-001 which we deactivate temporarily
    _SYNTHETIC_USERS["demo-advisor-001"]["is_active"] = False

    token = create_test_token(sub="demo-advisor-001", email="advisor@edunexus.ai", role="advisor")
    res = client.get("/api/v1/auth/me", headers={"Authorization": f"Bearer {token}"})
    assert res.status_code == 403
    msg = res.json().get("detail") or res.json().get("error", {}).get("message", "")
    assert "deactivated" in msg

    # Reset
    _SYNTHETIC_USERS["demo-advisor-001"]["is_active"] = True
