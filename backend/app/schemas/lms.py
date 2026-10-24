"""
EduNexus AI — LMS Activity Schemas
Pydantic validation models for digital learning telemetry, module completion,
login frequency, and assignment submission compliance.
"""

from datetime import date, datetime
from typing import Optional
from uuid import UUID
from pydantic import BaseModel, Field, ConfigDict


class LMSActivityBase(BaseModel):
    student_id: UUID = Field(..., description="Foreign key to student UUID")
    weekly_login_count: Optional[int] = Field(default=None, ge=0, description="Average portal logins per week")
    module_completion_pct: float = Field(..., ge=0.0, le=100.0, description="Percentage of assigned modules completed (0-100)")
    assignments_submitted_pct: float = Field(..., ge=0.0, le=100.0, description="Percentage of assignments submitted on time (0-100)")
    forum_posts_count: Optional[int] = Field(default=None, ge=0, description="Discussion forum contributions")
    last_login_date: Optional[date] = None
    recorded_at: date = Field(default_factory=date.today)


class LMSActivityCreate(LMSActivityBase):
    pass


class LMSActivityUpdate(BaseModel):
    weekly_login_count: Optional[int] = Field(None, ge=0)
    module_completion_pct: Optional[float] = Field(None, ge=0.0, le=100.0)
    assignments_submitted_pct: Optional[float] = Field(None, ge=0.0, le=100.0)
    forum_posts_count: Optional[int] = Field(None, ge=0)
    last_login_date: Optional[date] = None


class LMSActivityInDB(LMSActivityBase):
    id: UUID
    created_at: datetime
    updated_at: datetime
    model_config = ConfigDict(from_attributes=True)
