"""
EduNexus AI — Student Schemas
Pydantic validation models for student records.
"""

from datetime import date, datetime
from typing import Optional, Literal
from uuid import UUID
from pydantic import BaseModel, Field, EmailStr, ConfigDict


StudentStatus = Literal[
    'active', 'inactive', 'graduated', 'withdrawn', 'suspended', 'on_leave'
]


class StudentBase(BaseModel):
    student_id: str = Field(..., min_length=2, max_length=30, description="Unique institution ID (e.g. STU-001)")
    first_name: str = Field(..., min_length=1, max_length=100)
    last_name: str = Field(..., min_length=1, max_length=100)
    email: Optional[EmailStr] = None
    date_of_birth: Optional[date] = None
    gender: Optional[str] = None
    enrollment_date: date = Field(default_factory=date.today)
    current_grade: str = Field(..., min_length=1, max_length=50, description="e.g. Grade 10, Grade 11")
    academic_term: str = Field(..., min_length=1, max_length=50, description="e.g. AY 2025-26 Term 1")
    section: Optional[str] = Field(None, max_length=10)
    advisor_id: Optional[UUID] = None
    status: StudentStatus = Field(default="active")
    notes: Optional[str] = None


class StudentCreate(StudentBase):
    """Payload for creating a new student."""
    pass


class StudentUpdate(BaseModel):
    """Payload for partial student updates."""
    first_name: Optional[str] = Field(None, min_length=1, max_length=100)
    last_name: Optional[str] = Field(None, min_length=1, max_length=100)
    email: Optional[EmailStr] = None
    current_grade: Optional[str] = None
    academic_term: Optional[str] = None
    section: Optional[str] = None
    advisor_id: Optional[UUID] = None
    status: Optional[StudentStatus] = None
    notes: Optional[str] = None


class StudentInDB(StudentBase):
    """Complete database model with system fields."""
    id: UUID
    created_at: datetime
    updated_at: datetime
    model_config = ConfigDict(from_attributes=True)


class StudentResponse(StudentInDB):
    """Student representation returned via API with computed metrics."""
    attendance_rate: Optional[float] = Field(None, description="Computed attendance percentage (0-100)")
    average_score: Optional[float] = Field(None, description="Computed average assessment percentage (0-100)")
    active_interventions_count: Optional[int] = Field(None, description="Number of active intervention plans")
