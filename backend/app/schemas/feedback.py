"""
EduNexus AI — Feedback & Sentiment Schemas
Pydantic validation models for faculty evaluations, student satisfaction,
and qualitative mentoring observations.
"""

from datetime import date, datetime
from typing import Optional
from uuid import UUID
from pydantic import BaseModel, Field, ConfigDict


class FeedbackBase(BaseModel):
    student_id: UUID = Field(..., description="Foreign key to student UUID")
    faculty_sentiment: float = Field(..., ge=0.0, le=100.0, description="Faculty holistic performance rating (0-100)")
    student_satisfaction: float = Field(..., ge=0.0, le=100.0, description="Student course/campus satisfaction score (0-100)")
    mentor_notes: Optional[str] = Field(None, description="Qualitative observations from faculty mentor")
    academic_term: str = Field(..., min_length=2, max_length=50, description="e.g. AY 2025-26 Term 1")
    recorded_at: date = Field(default_factory=date.today)


class FeedbackCreate(FeedbackBase):
    pass


class FeedbackUpdate(BaseModel):
    faculty_sentiment: Optional[float] = Field(None, ge=0.0, le=100.0)
    student_satisfaction: Optional[float] = Field(None, ge=0.0, le=100.0)
    mentor_notes: Optional[str] = None
    academic_term: Optional[str] = None


class FeedbackInDB(FeedbackBase):
    id: UUID
    created_at: datetime
    updated_at: datetime
    model_config = ConfigDict(from_attributes=True)
