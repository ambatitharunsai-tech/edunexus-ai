"""
EduNexus AI — Authentication & User Management Schemas
"""

from typing import Optional, List
from pydantic import BaseModel, Field, EmailStr


class UserProfileResponse(BaseModel):
    id: str = Field(..., description="Unique user UUID or subject identifier")
    email: str = Field(..., description="Institutional email address")
    full_name: str = Field(..., description="Display name of the user")
    role: str = Field(..., description="Canonical platform role")
    is_active: bool = Field(default=True, description="Account active status")
    student_id: Optional[str] = Field(default=None, description="Linked student ID if student role")


class AuthMeResponse(BaseModel):
    user: UserProfileResponse
    permissions: List[str] = Field(default_factory=list, description="List of granular capability claims")


class RegisterUserRequest(BaseModel):
    email: EmailStr = Field(..., description="Valid institutional email")
    password: str = Field(..., min_length=6, description="User password (min 6 chars)")
    full_name: str = Field(..., min_length=2, description="Full display name")
    role: Optional[str] = Field(default="student", description="Requested role (defaults to student)")
    student_id: Optional[str] = Field(default=None, description="Student ID for linking existing student records")


class RegisterUserResponse(BaseModel):
    user: UserProfileResponse
    message: str = Field(default="Account registered successfully")


class UserListItem(BaseModel):
    id: str
    email: str
    full_name: str
    role: str
    is_active: bool
    created_at: Optional[str] = None


class UserRoleUpdateRequest(BaseModel):
    role: str = Field(..., description="Updated role claim")


class UserStatusUpdateRequest(BaseModel):
    is_active: bool = Field(..., description="New active status")
