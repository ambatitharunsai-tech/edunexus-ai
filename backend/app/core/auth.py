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
from app.db.client import is_database_configured

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
    },
}

# Permitted staff roles for academic & intervention management mutations
STAFF_ROLES: Set[str] = {"admin", "administrator", "advisor", "counselor", "faculty", "staff", "evaluator", "evaluator_role"}


class AuthenticatedUser(BaseModel):
    """Authenticated user profile with verified role and source information."""
    user_id: str = Field(..., description="Unique subject or user identifier")
    email: str = Field(..., description="Verified institutional email")
    role: str = Field(..., description="Role claim (e.g. advisor, admin, student)")
    is_demo_session: bool = Field(default=False, description="True if verified via evaluation demo token")


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
            is_demo_session=True,
        )

    # 2. Decode Supabase / cryptographic JWT
    try:
        if settings.SUPABASE_JWT_SECRET:
            payload = jwt.decode(
                raw_token,
                settings.SUPABASE_JWT_SECRET,
                algorithms=["HS256"],
                audience="authenticated",
                issuer=settings.SUPABASE_JWT_ISSUER or f"{settings.SUPABASE_URL.rstrip('/')}/auth/v1",
                options={"require": ["sub", "exp", "iat", "iss", "aud"]},
            )
        else:
            raise ValueError("No JWT verifier configured")

        user_id = payload["sub"]
        email = payload.get("email") or user_id
        # app_metadata is server-managed; user_metadata and headers are untrusted.
        role = payload.get("app_metadata", {}).get("role", "student")
        return AuthenticatedUser(
            user_id=str(user_id),
            email=str(email),
            role=str(role),
            is_demo_session=False,
        )
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired Bearer token.",
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
