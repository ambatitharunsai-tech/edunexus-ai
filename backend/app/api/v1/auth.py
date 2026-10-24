"""Minimal endpoint returning the identity derived from a verified bearer token."""

from fastapi import APIRouter, Depends

from app.core.auth import AuthenticatedUser, get_current_user

router = APIRouter()


@router.get("/me", summary="Get the authenticated user")
def get_current_user_profile(
    current_user: AuthenticatedUser = Depends(get_current_user),
):
    """Return server-verified identity and server-managed role claims."""
    return {
        "user": {
            "id": current_user.user_id,
            "email": current_user.email,
            "role": current_user.role,
            "full_name": current_user.full_name or current_user.email,
            "is_active": current_user.is_active,
            "student_id": current_user.student_id,
        },
        "permissions": [],
    }
