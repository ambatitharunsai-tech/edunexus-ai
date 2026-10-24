"""
EduNexus AI — Attendance Schemas
Pydantic validation models for student attendance records.
"""

from datetime import date, datetime
from typing import Optional, Literal
from uuid import UUID
from pydantic import BaseModel, Field, ConfigDict


AttendanceStatus = Literal['present', 'absent', 'late', 'excused']


class AttendanceBase(BaseModel):
    student_id: UUID = Field(..., description="Foreign key to student record")
    session_date: date = Field(..., description="Date of attendance record")
    period: str = Field(default="full_day", description="e.g. full_day, morning, afternoon")
    status: AttendanceStatus = Field(..., description="Attendance status classification")
    remarks: Optional[str] = None
    recorded_by: Optional[UUID] = None


class AttendanceCreate(AttendanceBase):
    """Payload to record attendance."""
    pass


class AttendanceUpdate(BaseModel):
    status: Optional[AttendanceStatus] = None
    remarks: Optional[str] = None


class AttendanceInDB(AttendanceBase):
    id: UUID
    created_at: datetime
    updated_at: datetime
    model_config = ConfigDict(from_attributes=True)


class AttendanceSummary(BaseModel):
    student_id: UUID
    total_sessions: int
    present_count: int
    late_count: int
    absent_count: int
    excused_count: int
    attendance_rate: float = Field(..., description="Percentage of attended (present + late) sessions")
