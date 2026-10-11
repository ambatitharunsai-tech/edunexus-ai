"""
EduNexus AI — Intervention Schemas
Pydantic validation models for student intervention plans.
"""

from datetime import date, datetime
from typing import Optional, Literal, List
from uuid import UUID
from pydantic import BaseModel, Field, model_validator, ConfigDict
from app.schemas.outcome import OutcomeInDB


InterventionType = Literal[
    'academic_tutoring',
    'attendance_counseling',
    'behavioral_support',
    'parental_engagement',
    'peer_mentoring',
    'schedule_adjustment',
    'wellness_check',
]

InterventionPriority = Literal['low', 'medium', 'high', 'urgent']
InterventionStatus = Literal['planned', 'in_progress', 'completed', 'cancelled', 'under_review']


class InterventionBase(BaseModel):
    student_id: UUID = Field(..., description="Foreign key to student record")
    title: str = Field(..., min_length=2, max_length=150)
    intervention_type: InterventionType = Field(..., description="Classification category")
    priority: InterventionPriority = Field(default="medium")
    status: InterventionStatus = Field(default="planned")
    description: str = Field(..., min_length=5, description="Intervention strategy summary")
    goals: Optional[str] = Field(None, description="Quantifiable target outcomes")
    assigned_staff_id: Optional[UUID] = None
    assigned_staff_name: Optional[str] = None
    start_date: date = Field(default_factory=date.today)
    target_completion_date: Optional[date] = None
    actual_completion_date: Optional[date] = None
    follow_up_date: Optional[date] = None
    notes: Optional[str] = None

    @model_validator(mode="after")
    def validate_dates(self) -> "InterventionBase":
        if self.target_completion_date and self.target_completion_date < self.start_date:
            raise ValueError(
                f"Target completion date ({self.target_completion_date}) cannot precede start date ({self.start_date})."
            )
        if self.actual_completion_date and self.actual_completion_date < self.start_date:
            raise ValueError(
                f"Actual completion date ({self.actual_completion_date}) cannot precede start date ({self.start_date})."
            )
        return self


class InterventionCreate(InterventionBase):
    """Payload to initiate an intervention."""
    pass


class InterventionUpdate(BaseModel):
    title: Optional[str] = None
    priority: Optional[InterventionPriority] = None
    status: Optional[InterventionStatus] = None
    description: Optional[str] = None
    goals: Optional[str] = None
    assigned_staff_id: Optional[UUID] = None
    assigned_staff_name: Optional[str] = None
    target_completion_date: Optional[date] = None
    actual_completion_date: Optional[date] = None
    follow_up_date: Optional[date] = None
    notes: Optional[str] = None


class InterventionInDB(InterventionBase):
    id: UUID
    created_at: datetime
    updated_at: datetime
    model_config = ConfigDict(from_attributes=True)


class InterventionWithOutcomes(InterventionInDB):
    outcomes: List[OutcomeInDB] = Field(default_factory=list)
