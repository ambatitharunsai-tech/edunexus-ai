"""
EduNexus AI — Placement Readiness Schemas
Pydantic validation models for placement training telemetry, aptitude, coding,
and mock interview evaluations.
"""

from datetime import date, datetime
from typing import Optional, Literal
from uuid import UUID
from pydantic import BaseModel, Field, ConfigDict

ReadinessTier = Literal['not_ready', 'developing', 'placement_ready', 'advanced_hire']


class PlacementBase(BaseModel):
    student_id: UUID = Field(..., description="Foreign key to student UUID")
    aptitude_score: float = Field(..., ge=0.0, le=100.0, description="General/Quantitative aptitude score (0-100)")
    coding_score: float = Field(..., ge=0.0, le=100.0, description="Technical / Coding assessment score (0-100)")
    mock_interview_score: float = Field(..., ge=0.0, le=100.0, description="Technical & HR mock interview score (0-100)")
    resume_score: Optional[float] = Field(default=None, ge=0.0, le=100.0, description="ATS resume readiness score (0-100)")
    readiness_tier: Optional[ReadinessTier] = Field(default=None, description="Overall campus placement readiness tier")
    mock_interviews_attended: Optional[int] = Field(default=None, ge=0, description="Number of completed mock interview rounds")
    evaluated_at: date = Field(default_factory=date.today)
    notes: Optional[str] = None


class PlacementCreate(PlacementBase):
    pass


class PlacementUpdate(BaseModel):
    aptitude_score: Optional[float] = Field(None, ge=0.0, le=100.0)
    coding_score: Optional[float] = Field(None, ge=0.0, le=100.0)
    mock_interview_score: Optional[float] = Field(None, ge=0.0, le=100.0)
    resume_score: Optional[float] = Field(None, ge=0.0, le=100.0)
    readiness_tier: Optional[ReadinessTier] = None
    mock_interviews_attended: Optional[int] = Field(None, ge=0)
    notes: Optional[str] = None


class PlacementInDB(PlacementBase):
    id: UUID
    created_at: datetime
    updated_at: datetime
    model_config = ConfigDict(from_attributes=True)
