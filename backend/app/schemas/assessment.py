"""
EduNexus AI — Assessment Schemas
Pydantic validation models for student academic evaluations.
Stores marks and maximum marks separately with strict range validation.
"""

from datetime import date, datetime
from typing import Optional, Literal
from uuid import UUID
from pydantic import BaseModel, Field, model_validator, ConfigDict


AssessmentType = Literal['quiz', 'assignment', 'midterm', 'final', 'project', 'lab']


class AssessmentBase(BaseModel):
    student_id: UUID = Field(..., description="Foreign key to student record")
    title: str = Field(..., min_length=1, max_length=150, description="Assessment evaluation title")
    subject: str = Field(..., min_length=1, max_length=100, description="Academic subject area")
    assessment_type: AssessmentType = Field(..., description="Category of assessment")
    term: str = Field(..., min_length=1, max_length=50, description="e.g. Term 1, Term 2")
    assessment_date: date = Field(..., description="Date of assessment")
    score: float = Field(..., ge=0, description="Obtained raw score (must be non-negative)")
    max_score: float = Field(..., gt=0, description="Maximum possible marks (must be strictly positive)")
    weight_percentage: Optional[float] = Field(None, ge=0, le=100, description="Weight in term grade (0-100)")
    feedback: Optional[str] = None
    recorded_by: Optional[UUID] = None

    @model_validator(mode="after")
    def validate_score_within_maximum(self) -> "AssessmentBase":
        """Strict range validation: score must not exceed maximum marks."""
        if self.score > self.max_score:
            raise ValueError(
                f"Assessment score ({self.score}) cannot exceed maximum possible marks ({self.max_score})."
            )
        return self


class AssessmentCreate(AssessmentBase):
    """Payload to create an assessment entry."""
    pass


class AssessmentUpdate(BaseModel):
    title: Optional[str] = None
    score: Optional[float] = Field(None, ge=0)
    max_score: Optional[float] = Field(None, gt=0)
    feedback: Optional[str] = None

    @model_validator(mode="after")
    def validate_updated_scores(self) -> "AssessmentUpdate":
        if self.score is not None and self.max_score is not None:
            if self.score > self.max_score:
                raise ValueError(
                    f"Updated score ({self.score}) cannot exceed maximum marks ({self.max_score})."
                )
        return self


class AssessmentInDB(AssessmentBase):
    id: UUID
    created_at: datetime
    updated_at: datetime
    model_config = ConfigDict(from_attributes=True)

    @property
    def percentage(self) -> float:
        """Normalized percentage score."""
        return round((self.score / self.max_score) * 100, 2)
