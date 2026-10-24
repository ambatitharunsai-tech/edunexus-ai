"""
EduNexus AI — Authentication & Authorization Core Module
Bearer token verification, verified demo tokens for evaluation mode,
and role-based access control (RBAC) preventing unauthorized mutations.
"""

from typing import Optional, Set, Dict, Any
from pydantic import BaseModel, Field
from fastapi import Header, HTTPException, status, Depends
import jwt

from app.core.config import settings
from app.db.client import is_database_configured, get_db_client


# Supabase signing-key verification. Asymmetric signing is preferred by newer projects;
# legacy HS256 remains supported when the server-side JWT secret is configured.
_jwks_client: Optional[jwt.PyJWKClient] = None


def _get_jwks_client(jwks_url: str) -> jwt.PyJWKClient:
    global _jwks_client
    if _jwks_client is None or getattr(_jwks_client, "uri", "") != jwks_url:
        _jwks_client = jwt.PyJWKClient(jwks_url, cache_jwk_set=True, lifespan=3600)
    return _jwks_client


def verify_supabase_token_payload(raw_token: str) -> Dict[str, Any]:
    """Cryptographically verify a Supabase JWT using JWKS or the configured legacy secret."""
    header = jwt.get_unverified_header(raw_token)
    unverified_payload = jwt.decode(raw_token, options={"verify_signature": False})
    algorithm = str(header.get("alg", ""))

    options: Dict[str, Any] = {
        "verify_signature": True,
        "verify_exp": True,
        "require": ["sub", "exp"],
    }
    kwargs: Dict[str, Any] = {"options": options}
    if "aud" in unverified_payload:
        kwargs["audience"] = "authenticated"

    issuer = settings.SUPABASE_JWT_ISSUER.strip() if settings.SUPABASE_JWT_ISSUER else ""
    if not issuer and settings.SUPABASE_URL:
        issuer = f"{settings.SUPABASE_URL.rstrip('/')}/auth/v1"
    if issuer:
        kwargs["issuer"] = issuer

    asymmetric_algorithms = {"ES256", "ES384", "ES512", "RS256", "RS384", "RS512"}
    if algorithm in asymmetric_algorithms:
        project_url = settings.SUPABASE_URL.strip().rstrip("/")
        if not project_url or "your-project" in project_url:
            raise ValueError("SUPABASE_URL must be configured for asymmetric JWT verification.")
        jwks_url = f"{project_url}/auth/v1/.well-known/jwks.json"
        signing_key = _get_jwks_client(jwks_url).get_signing_key_from_jwt(raw_token)
        kwargs["algorithms"] = [algorithm]
        return jwt.decode(raw_token, signing_key.key, **kwargs)

    if algorithm == "HS256" and settings.SUPABASE_JWT_SECRET:
        kwargs["algorithms"] = ["HS256"]
        return jwt.decode(raw_token, settings.SUPABASE_JWT_SECRET, **kwargs)

    raise ValueError("Unsupported or unconfigured Supabase JWT signing algorithm.")


# Recognized demo tokens for KPMG evaluation & local prototype mode
DEMO_TOKENS: Dict[str, Dict[str, Any]] = {
    "edunexus-demo-advisor-token": {
        "user_id": "demo-advisor-001",
        "email": "advisor@edunexus.ai",
        "role": "advisor",
    },
    "edunexus-demo-admin-token": {
        "user_id": "demo-admin-001",
        "email": "admin@edunexus.ai",
        "role": "admin",
    },
    "edunexus-demo-faculty-token": {
        "user_id": "demo-faculty-001",
        "email": "faculty@edunexus.ai",
        "role": "faculty",
    },
    "edunexus-demo-evaluator-token": {
        "user_id": "demo-evaluator-001",
        "email": "evaluator@kpmg.challenge",
        "role": "evaluator",
    },
    "edunexus-demo-student-token": {
        "user_id": "demo-student-001",
        "email": "student@edunexus.ai",
        "role": "student",
        "student_id": "STU-001",
    },
}

# Permitted staff roles for academic & intervention management mutations
STAFF_ROLES: Set[str] = {"admin", "administrator", "advisor", "counselor", "faculty", "staff", "evaluator", "evaluator_role"}


class AuthenticatedUser(BaseModel):
    """Authenticated user profile with verified role and source information."""
    user_id: str = Field(..., description="Unique subject or user identifier")
    email: str = Field(..., description="Verified institutional email")
    role: str = Field(..., description="Role claim (e.g. advisor, admin, student)")
    student_id: Optional[str] = Field(default=None, description="Server-verified student record link from demo configuration or app_metadata")
    is_demo_session: bool = Field(default=False, description="True if verified via evaluation demo token")
    full_name: Optional[str] = Field(default=None, description="Verified display name")
    is_active: bool = Field(default=True, description="Account active status")


def get_current_user(
    authorization: Optional[str] = Header(None),
) -> AuthenticatedUser:
    """
    Decodes and authenticates Bearer tokens from the Authorization header.
    Rejects missing, malformed, or untrusted tokens with 401 Unauthorized.
    Never trusts client-supplied X-User-Role alone.
    """
    if not authorization:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Authentication credentials required. Please provide a valid Bearer token.",
        )

    parts = authorization.strip().split(" ", 1)
    if len(parts) != 2 or parts[0].lower() != "bearer":
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Malformed Authorization header. Format must be: Bearer <token>",
        )

    raw_token = parts[1].strip()

    # 1. Match against official demo evaluation tokens (strictly evaluation/development mode only)
    if raw_token in DEMO_TOKENS:
        if settings.ENVIRONMENT.lower() in ("production", "prod"):
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Demo evaluation tokens are disabled in production. Please provide a verified institutional Bearer token.",
            )
        token_info = DEMO_TOKENS[raw_token]
        return AuthenticatedUser(
            user_id=token_info["user_id"],
            email=token_info["email"],
            role=token_info["role"],
            student_id=token_info.get("student_id"),
            is_demo_session=True,
        )

    # 2. Verify the Supabase JWT before trusting any identity or role claims.
    try:
        payload = verify_supabase_token_payload(raw_token)
        app_metadata = payload.get("app_metadata", {})
        if not isinstance(app_metadata, dict):
            app_metadata = {}
        user_metadata = payload.get("user_metadata", {})
        if not isinstance(user_metadata, dict):
            user_metadata = {}

        # app_metadata is managed by the server; never grant roles from user_metadata.
        role = str(app_metadata.get("role", "student"))
        linked_student_id = app_metadata.get("student_id")
        full_name = user_metadata.get("full_name") or payload.get("full_name")
        return AuthenticatedUser(
            user_id=str(payload["sub"]),
            email=str(payload.get("email") or payload["sub"]),
            role=role,
            student_id=str(linked_student_id).strip() if linked_student_id else None,
            full_name=str(full_name) if full_name else None,
            is_active=True,
            is_demo_session=False,
        )
    except Exception:
        # Some legacy configurations do not expose a JWT secret/JWKS-compatible key.
        # If a server-only Supabase key is configured, ask Supabase Auth to validate it.
        if is_database_configured():
            try:
                user_response = get_db_client().auth.get_user(raw_token)
                user = getattr(user_response, "user", None)
                if user:
                    app_metadata = getattr(user, "app_metadata", {}) or {}
                    user_metadata = getattr(user, "user_metadata", {}) or {}
                    return AuthenticatedUser(
                        user_id=str(user.id),
                        email=str(getattr(user, "email", None) or user.id),
                        role=str(app_metadata.get("role", "student")),
                        student_id=str(app_metadata.get("student_id")).strip() if app_metadata.get("student_id") else None,
                        full_name=str(user_metadata.get("full_name") or "") or None,
                        is_active=True,
                        is_demo_session=False,
                    )
            except Exception:
                pass

        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid, expired, or unverifiable Bearer token.",
        )


def require_staff_user(
    current_user: AuthenticatedUser = Depends(get_current_user),
) -> AuthenticatedUser:
    """
    Enforces staff role authorization for mutations (interventions, outcomes, overrides, CSV ingestion).
    Rejects non-staff users (such as students) with 403 Forbidden.
    """
    if current_user.role.lower() not in STAFF_ROLES:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail=f"Forbidden: Role '{current_user.role}' lacks staff mutation privileges. Required: advisor, admin, or faculty.",
        )
    return current_user


def verify_read_authorization(
    authorization: Optional[str] = Header(None),
    x_user_role: Optional[str] = Header(None),
) -> Optional[AuthenticatedUser]:
    """
    Guards sensitive student directory dossiers on read.
    If an explicit student/unauthorized role is supplied, rejects with 403 Forbidden.
    If a Bearer token is supplied, validates it and ensures role is staff.
    """
    if x_user_role and x_user_role.lower() not in STAFF_ROLES and x_user_role.lower() not in ("viewer", "auditor"):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Forbidden: Student educational records require verified staff, advisor, or evaluator privileges.",
        )

    if authorization:
        user = get_current_user(authorization)
        if user.role.lower() not in STAFF_ROLES and user.role.lower() not in ("viewer", "auditor"):
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Forbidden: Student educational records require verified staff, advisor, or evaluator privileges.",
            )
        return user

    if settings.is_production or is_database_configured():
        return get_current_user(authorization)
    return None  # Anonymous reads are limited to the synthetic local demonstration.
