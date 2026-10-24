"""
EduNexus AI — Authentication & Institutional User Management Endpoints
Implements /auth/me, /auth/register, and /admin/users role-governance endpoints.
"""

from typing import List, Dict, Any, Optional
from datetime import datetime, timezone
from fastapi import APIRouter, Depends, HTTPException, status, Header
from pydantic import EmailStr

from app.core.auth import (
    AuthenticatedUser,
    get_current_user,
    require_admin_user,
    get_role_permissions,
    ADMIN_ROLES,
    STAFF_ROLES,
    AUDITOR_VIEWER_ROLES,
)
from app.db.client import is_database_configured, get_db_client
from app.schemas.auth import (
    UserProfileResponse,
    AuthMeResponse,
    RegisterUserRequest,
    RegisterUserResponse,
    UserListItem,
    UserRoleUpdateRequest,
    UserStatusUpdateRequest,
)

auth_router = APIRouter()
admin_router = APIRouter()

# In-memory user directory for synthetic evaluation / prototype mode
_SYNTHETIC_USERS: Dict[str, Dict[str, Any]] = {
    "demo-admin-001": {
        "id": "demo-admin-001",
        "email": "admin@edunexus.ai",
        "full_name": "Campus Administrator",
        "role": "admin",
        "is_active": True,
        "student_id": None,
        "created_at": "2026-01-15T08:00:00Z",
    },
    "demo-advisor-001": {
        "id": "demo-advisor-001",
        "email": "advisor@edunexus.ai",
        "full_name": "Senior Academic Advisor",
        "role": "advisor",
        "is_active": True,
        "student_id": None,
        "created_at": "2026-01-16T09:30:00Z",
    },
    "demo-faculty-001": {
        "id": "demo-faculty-001",
        "email": "faculty@edunexus.ai",
        "full_name": "Department Faculty Lead",
        "role": "faculty",
        "is_active": True,
        "student_id": None,
        "created_at": "2026-01-17T10:15:00Z",
    },
    "demo-dataoperator-001": {
        "id": "demo-dataoperator-001",
        "email": "dataoperator@edunexus.ai",
        "full_name": "Institutional Data Operator",
        "role": "data_operator",
        "is_active": True,
        "student_id": None,
        "created_at": "2026-01-18T11:00:00Z",
    },
    "demo-viewer-001": {
        "id": "demo-viewer-001",
        "email": "viewer@edunexus.ai",
        "full_name": "Governance & Compliance Auditor",
        "role": "viewer",
        "is_active": True,
        "student_id": None,
        "created_at": "2026-01-19T14:20:00Z",
    },
    "demo-student-001": {
        "id": "demo-student-001",
        "email": "student@edunexus.ai",
        "full_name": "Aarav Sharma",
        "role": "student",
        "is_active": True,
        "student_id": "STU-001",
        "created_at": "2026-02-01T12:00:00Z",
    },
}


# =====================================================================
# /api/v1/auth/me
# =====================================================================
@auth_router.get(
    "/me",
    response_model=AuthMeResponse,
    summary="Get Authoritative Profile & Effective Permissions",
    description="Resolves current authenticated user, verified role, linked student record, and permissions.",
)
async def get_my_profile(
    current_user: AuthenticatedUser = Depends(get_current_user),
) -> AuthMeResponse:
    """Returns authoritative user profile, active state, and capability permissions."""
    full_name = current_user.full_name or "EduNexus User"
    is_active = current_user.is_active
    student_id = current_user.student_id
    role = current_user.role

    # If connected to live database, query canonical user_profiles or students table
    if is_database_configured() and not current_user.is_demo_session:
        try:
            client = get_db_client()
            # 1. Check if user has an institutional staff record in user_profiles
            profile_res = client.table("user_profiles").select("full_name,role,is_active").eq("id", current_user.user_id).limit(1).execute()
            if profile_res.data and len(profile_res.data) > 0:
                p_row = profile_res.data[0]
                full_name = p_row.get("full_name") or full_name
                is_active = bool(p_row.get("is_active", True))
                if p_row.get("role"):
                    role = str(p_row["role"])
            else:
                # 2. Check students table for student record
                student_row = None
                # Check user_id column first if present
                try:
                    s_res = client.table("students").select("student_id,first_name,last_name,status").eq("user_id", current_user.user_id).limit(1).execute()
                    if s_res.data and len(s_res.data) > 0:
                        student_row = s_res.data[0]
                except Exception:
                    student_row = None

                # If not matched by user_id, check server-verified student_id link
                if not student_row and current_user.student_id:
                    s_res2 = client.table("students").select("student_id,first_name,last_name,status").eq("student_id", current_user.student_id).limit(1).execute()
                    if s_res2.data and len(s_res2.data) > 0:
                        student_row = s_res2.data[0]

                if student_row:
                    student_id = student_row.get("student_id") or student_id
                    full_name = f"{student_row.get('first_name', '')} {student_row.get('last_name', '')}".strip() or full_name
                    is_active = (student_row.get("status") == "active")
                    role = "student"
        except Exception:
            # Fall back to verified token claims if DB query fails
            pass
    if not is_database_configured() or current_user.is_demo_session or current_user.user_id in _SYNTHETIC_USERS:
        synthetic = _SYNTHETIC_USERS.get(current_user.user_id)
        if synthetic:
            full_name = synthetic.get("full_name") or full_name
            is_active = synthetic.get("is_active", is_active)
            student_id = synthetic.get("student_id") or student_id
            role = synthetic.get("role") or role

    if not is_active:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Your EduNexus account has been deactivated. Please contact an institutional administrator.",
        )

    permissions = get_role_permissions(role)

    return AuthMeResponse(
        user=UserProfileResponse(
            id=current_user.user_id,
            email=current_user.email,
            full_name=full_name,
            role=role,
            is_active=is_active,
            student_id=student_id,
        ),
        permissions=permissions,
    )


# =====================================================================
# /api/v1/auth/register
# =====================================================================
@auth_router.post(
    "/register",
    response_model=RegisterUserResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Register / Onboard User Account",
    description="Registers new student accounts. Staff roles require admin authorization.",
)
async def register_account(
    req: RegisterUserRequest,
    authorization: Optional[str] = Header(None),
) -> RegisterUserResponse:
    """Registers an account. Public registration is restricted strictly to students."""
    role_requested = (req.role or "student").lower().strip()

    # Staff roles require verified administrator credentials
    if role_requested != "student":
        if not authorization:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Public registration is restricted to students. Privileged staff accounts must be provisioned by an administrator.",
            )
        admin_user = get_current_user(authorization)
        if admin_user.role.lower() not in ADMIN_ROLES:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Administrator privileges required to provision staff accounts.",
            )

    user_id = f"user-{int(datetime.now(timezone.utc).timestamp())}"
    verified_student_id: Optional[str] = None

    # If Supabase is live, use service role admin API to register auth user
    if is_database_configured():
        try:
            client = get_db_client()

            # Trusted student validation before account creation
            if role_requested == "student" and req.student_id:
                clean_student_id = req.student_id.strip()
                try:
                    st_res = client.table("students").select("id,student_id,email,user_id").eq("student_id", clean_student_id).limit(1).execute()
                except Exception:
                    st_res = client.table("students").select("id,student_id,email").eq("student_id", clean_student_id).limit(1).execute()

                if not st_res.data or len(st_res.data) == 0:
                    raise HTTPException(
                        status_code=status.HTTP_404_NOT_FOUND,
                        detail=f"Student ID '{clean_student_id}' does not exist in institutional records.",
                    )
                st_row = st_res.data[0]
                if "user_id" in st_row and st_row.get("user_id"):
                    raise HTTPException(
                        status_code=status.HTTP_409_CONFLICT,
                        detail="This student record has already been linked to an existing user account.",
                    )
                rec_email = st_row.get("email")
                if rec_email and rec_email.strip().lower() != req.email.strip().lower():
                    raise HTTPException(
                        status_code=status.HTTP_400_BAD_REQUEST,
                        detail="The provided email does not match the institutional record for this Student ID.",
                    )
                verified_student_id = clean_student_id

            app_meta = {"role": role_requested}
            if verified_student_id:
                app_meta["student_id"] = verified_student_id

            # Call Supabase Auth admin API if available
            auth_res = client.auth.admin.create_user({
                "email": req.email,
                "password": req.password,
                "email_confirm": True,
                "user_metadata": {"full_name": req.full_name},
                "app_metadata": app_meta,
            })
            if auth_res and hasattr(auth_res, "user") and auth_res.user:
                user_id = str(auth_res.user.id)

            # Link student record in DB if verified_student_id was validated
            if verified_student_id and user_id:
                try:
                    client.table("students").update({"user_id": user_id}).eq("student_id", verified_student_id).execute()
                except Exception:
                    pass
        except HTTPException:
            raise
        except Exception as exc:
            err_msg = str(exc)
            if "already registered" in err_msg.lower() or "unique constraint" in err_msg.lower():
                raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="An account with this email address already exists.")
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=f"Registration failed: {err_msg}")
    else:
        # Synthetic registration
        for existing in _SYNTHETIC_USERS.values():
            if existing["email"].lower() == req.email.lower():
                raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="An account with this email address already exists.")

        # In synthetic mode, validate if student_id is claimed
        if role_requested == "student" and req.student_id:
            clean_student_id = req.student_id.strip()
            for existing in _SYNTHETIC_USERS.values():
                if existing.get("student_id") == clean_student_id and existing["email"].lower() != req.email.lower():
                    raise HTTPException(
                        status_code=status.HTTP_409_CONFLICT,
                        detail="This student record has already been linked to an existing user account.",
                    )
            verified_student_id = clean_student_id

        _SYNTHETIC_USERS[user_id] = {
            "id": user_id,
            "email": req.email,
            "full_name": req.full_name,
            "role": role_requested,
            "is_active": True,
            "student_id": verified_student_id,
            "created_at": datetime.now(timezone.utc).isoformat(),
        }

    return RegisterUserResponse(
        user=UserProfileResponse(
            id=user_id,
            email=req.email,
            full_name=req.full_name,
            role=role_requested,
            is_active=True,
            student_id=verified_student_id,
        ),
        message=f"Account successfully registered as {role_requested}.",
    )


# =====================================================================
# /api/v1/admin/users (List, Role Update, Status Update)
# =====================================================================
@admin_router.get(
    "/users",
    response_model=List[UserListItem],
    summary="List Institutional User Accounts (Admin Only)",
    description="Retrieves all registered institutional users with active status and roles.",
)
async def list_users(
    admin: AuthenticatedUser = Depends(require_admin_user),
) -> List[UserListItem]:
    """Admin-only listing of all system users."""
    if is_database_configured():
        try:
            client = get_db_client()
            res = client.table("user_profiles").select("id,email,full_name,role,is_active,created_at").order("created_at", desc=True).execute()
            if res.data:
                return [
                    UserListItem(
                        id=str(row["id"]),
                        email=row["email"],
                        full_name=row["full_name"],
                        role=row["role"],
                        is_active=bool(row.get("is_active", True)),
                        created_at=row.get("created_at"),
                    )
                    for row in res.data
                ]
        except Exception:
            pass

    # Fall back to synthetic users
    return [
        UserListItem(
            id=u["id"],
            email=u["email"],
            full_name=u["full_name"],
            role=u["role"],
            is_active=u["is_active"],
            created_at=u.get("created_at"),
        )
        for u in _SYNTHETIC_USERS.values()
    ]


@admin_router.patch(
    "/users/{user_id}/role",
    response_model=UserListItem,
    summary="Update User Role (Admin Only)",
    description="Changes the assigned role of a user. Prevents privilege escalation.",
)
async def update_user_role(
    user_id: str,
    payload: UserRoleUpdateRequest,
    admin: AuthenticatedUser = Depends(require_admin_user),
) -> UserListItem:
    """Updates a user's role with input validation."""
    valid_roles = {"admin", "administrator", "advisor", "counselor", "faculty", "staff", "data_operator", "viewer", "auditor", "student"}
    new_role = payload.role.lower().strip()
    if new_role not in valid_roles:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Invalid role '{payload.role}'. Must be one of: {sorted(list(valid_roles))}",
        )

    if is_database_configured():
        try:
            client = get_db_client()
            # Canonical app_role enum mapping
            db_role = "administrator" if new_role == "admin" else ("faculty" if new_role == "staff" else new_role)
            res = client.table("user_profiles").update({"role": db_role, "updated_at": datetime.now(timezone.utc).isoformat()}).eq("id", user_id).execute()
            if res.data and len(res.data) > 0:
                row = res.data[0]
                return UserListItem(
                    id=str(row["id"]),
                    email=row["email"],
                    full_name=row["full_name"],
                    role=row["role"],
                    is_active=bool(row.get("is_active", True)),
                    created_at=row.get("created_at"),
                )
        except Exception as exc:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=f"Database update failed: {exc}")

    # Synthetic fallback
    if user_id in _SYNTHETIC_USERS:
        _SYNTHETIC_USERS[user_id]["role"] = new_role
        u = _SYNTHETIC_USERS[user_id]
        return UserListItem(
            id=u["id"],
            email=u["email"],
            full_name=u["full_name"],
            role=u["role"],
            is_active=u["is_active"],
            created_at=u.get("created_at"),
        )

    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"User '{user_id}' not found.")


@admin_router.patch(
    "/users/{user_id}/status",
    response_model=UserListItem,
    summary="Activate / Deactivate User (Admin Only)",
    description="Updates user active status. Prevents access for deactivated accounts.",
)
async def update_user_status(
    user_id: str,
    payload: UserStatusUpdateRequest,
    admin: AuthenticatedUser = Depends(require_admin_user),
) -> UserListItem:
    """Toggles account active status."""
    if is_database_configured():
        try:
            client = get_db_client()
            res = client.table("user_profiles").update({"is_active": payload.is_active, "updated_at": datetime.now(timezone.utc).isoformat()}).eq("id", user_id).execute()
            if res.data and len(res.data) > 0:
                row = res.data[0]
                return UserListItem(
                    id=str(row["id"]),
                    email=row["email"],
                    full_name=row["full_name"],
                    role=row["role"],
                    is_active=bool(row.get("is_active", True)),
                    created_at=row.get("created_at"),
                )
        except Exception as exc:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=f"Database update failed: {exc}")

    # Synthetic fallback
    if user_id in _SYNTHETIC_USERS:
        _SYNTHETIC_USERS[user_id]["is_active"] = payload.is_active
        u = _SYNTHETIC_USERS[user_id]
        return UserListItem(
            id=u["id"],
            email=u["email"],
            full_name=u["full_name"],
            role=u["role"],
            is_active=u["is_active"],
            created_at=u.get("created_at"),
        )

    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"User '{user_id}' not found.")
