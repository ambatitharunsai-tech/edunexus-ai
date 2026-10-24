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
        "student_id": "STU-001",
    },
    "edunexus-demo-dataoperator-token": {
        "user_id": "demo-dataoperator-001",
        "email": "dataoperator@edunexus.ai",
        "role": "data_operator",
    },
    "edunexus-demo-viewer-token": {
        "user_id": "demo-viewer-001",
        "email": "viewer@edunexus.ai",
        "role": "viewer",
    },
}

# Permitted staff roles for academic & intervention management mutations
STAFF_ROLES: Set[str] = {
    "admin",
    "administrator",
    "advisor",
    "counselor",
    "faculty",
    "staff",
    "evaluator",
    "evaluator_role",
    "data_operator",
}

ADMIN_ROLES: Set[str] = {"admin", "administrator"}
DATA_OPERATOR_ROLES: Set[str] = {"admin", "administrator", "data_operator", "faculty"}
AUDITOR_VIEWER_ROLES: Set[str] = {"auditor", "viewer", "evaluator", "evaluator_role"}


def get_role_permissions(role: str) -> list[str]:
    """Returns canonical permission strings for a given role."""
    norm = (role or "").lower()
    perms: set[str] = set()

    if norm in ADMIN_ROLES:
        perms.update([
            "dashboard:view",
            "analytics:view",
            "students:read_all",
            "students:read_assigned",
            "journey:view",
            "interventions:read",
            "interventions:write",
            "risk_override:write",
            "csv:preview",
            "csv:import",
            "csv:reset_demo",
            "admin:users:read",
            "admin:users:write",
            "audit:read",
        ])
    elif norm in ("data_operator",):
        perms.update([
            "dashboard:view",
            "analytics:view",
            "students:read_assigned",
            "csv:preview",
            "csv:import",
        ])
    elif norm in ("faculty", "staff"):
        perms.update([
            "dashboard:view",
            "analytics:view",
            "students:read_assigned",
            "students:read_all",
            "journey:view",
            "interventions:read",
            "interventions:write",
            "attendance:write",
            "assessments:write",
        ])
    elif norm in ("advisor", "counselor"):
        perms.update([
            "dashboard:view",
            "analytics:view",
            "students:read_assigned",
            "students:read_all",
            "journey:view",
            "interventions:read",
            "interventions:write",
            "risk_override:write",
        ])
    elif norm in AUDITOR_VIEWER_ROLES:
        perms.update([
            "dashboard:view",
            "analytics:view",
            "students:read_assigned",
            "journey:view",
            "interventions:read",
            "audit:read",
        ])
    elif norm == "student":
        perms.update([
            "student_dashboard:view",
            "student_record:read_own",
        ])

    return sorted(list(perms))


class AuthenticatedUser(BaseModel):
    """Authenticated user profile with verified role and source information."""
    user_id: str = Field(..., description="Unique subject or user identifier")
    email: str = Field(..., description="Verified institutional email")
    role: str = Field(..., description="Role claim (e.g. advisor, admin, student)")
    student_id: Optional[str] = Field(default=None, description="Server-verified student record link from demo configuration or app_metadata")
    is_demo_session: bool = Field(default=False, description="True if verified via evaluation demo token")
    full_name: Optional[str] = Field(default=None, description="User full display name")
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

    # 2. Decode Supabase / cryptographic JWT
    try:
        if settings.SUPABASE_JWT_SECRET:
            decode_options: Dict[str, Any] = {
                "verify_signature": True,
                "verify_exp": True,
                "require": ["sub", "exp"],
            }
            kwargs: Dict[str, Any] = {
                "algorithms": ["HS256"],
                "options": decode_options,
            }
            unverified = jwt.decode(raw_token, options={"verify_signature": False})
            if "aud" in unverified:
                kwargs["audience"] = unverified["aud"]
            if settings.SUPABASE_JWT_ISSUER:
                kwargs["issuer"] = settings.SUPABASE_JWT_ISSUER

            payload = jwt.decode(
                raw_token,
                settings.SUPABASE_JWT_SECRET,
                **kwargs,
            )
        else:
            raise ValueError("No JWT verifier configured")

        user_id = payload["sub"]
        email = payload.get("email") or user_id
        # app_metadata is server-managed; user_metadata and headers are untrusted.
        app_metadata = payload.get("app_metadata", {})
        if not isinstance(app_metadata, dict):
            app_metadata = {}
        user_metadata = payload.get("user_metadata", {})
        if not isinstance(user_metadata, dict):
            user_metadata = {}

        # Strictly enforce app_metadata for roles. user_metadata is user-editable and cannot grant privileges.
        role = app_metadata.get("role", "student")
        linked_student_id = app_metadata.get("student_id")
        full_name = user_metadata.get("full_name") or payload.get("full_name")
        return AuthenticatedUser(
            user_id=str(user_id),
            email=str(email),
            role=str(role),
            student_id=str(linked_student_id).strip() if linked_student_id else None,
            is_demo_session=False,
            full_name=str(full_name) if full_name else None,
            is_active=True,
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


def require_admin_user(
    current_user: AuthenticatedUser = Depends(get_current_user),
) -> AuthenticatedUser:
    """
    Enforces administrator role authorization.
    Rejects non-administrator users with 403 Forbidden.
    """
    if current_user.role.lower() not in ADMIN_ROLES:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail=f"Forbidden: Role '{current_user.role}' lacks administrator privileges.",
        )
    return current_user


def require_data_operator_user(
    current_user: AuthenticatedUser = Depends(get_current_user),
) -> AuthenticatedUser:
    """
    Enforces data operator or administrator role authorization for CSV dataset ingestion.
    """
    if current_user.role.lower() not in DATA_OPERATOR_ROLES:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail=f"Forbidden: Role '{current_user.role}' lacks dataset upload privileges. Required: data_operator, faculty, or administrator.",
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
    allowed_read_roles = STAFF_ROLES.union(AUDITOR_VIEWER_ROLES)
    if x_user_role and x_user_role.lower() not in allowed_read_roles:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Forbidden: Student educational records require verified staff, advisor, or evaluator privileges.",
        )

    if authorization:
        user = get_current_user(authorization)
        if user.role.lower() not in allowed_read_roles:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Forbidden: Student educational records require verified staff, advisor, or evaluator privileges.",
            )
        return user

    if settings.is_production or is_database_configured():
        return get_current_user(authorization)
    return None  # Anonymous reads are limited to the synthetic local demonstration.
