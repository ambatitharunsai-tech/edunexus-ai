"""
EduNexus AI — Intervention Outcome Schemas
Pydantic validation models for before/after outcome tracking.
Includes mandatory ethical causation disclaimer.
"""

from datetime import date, datetime
from typing import Optional, Literal
from uuid import UUID
from pydantic import BaseModel, Field, ConfigDict


OutcomeStatus = Literal['improved', 'unchanged', 'declined', 'evaluating']

DEFAULT_CAUSATION_DISCLAIMER = (
    "Observed change reflects correlation during intervention interval; "
    "causal relationship not established without control study."
)


class OutcomeBase(BaseModel):
    intervention_id: UUID = Field(..., description="Foreign key to intervention")
    metric_name: str = Field(..., min_length=2, max_length=100, description="e.g. attendance_percentage, math_score")
    baseline_value: float = Field(..., description="Metric value prior to intervention initiation")
    post_value: Optional[float] = Field(None, description="Observed metric value post-intervention")
    target_value: Optional[float] = Field(None, description="Target goal value")
    measurement_date: date = Field(default_factory=date.today)
    outcome_status: OutcomeStatus = Field(default="evaluating")
    evidence_notes: Optional[str] = None
    causation_disclaimer: str = Field(
        default=DEFAULT_CAUSATION_DISCLAIMER,
        description="Mandatory scientific governance disclaimer preventing unwarranted causal claims",
    )


class OutcomeCreate(OutcomeBase):
    """Payload to record an outcome observation."""
    pass


class OutcomeUpdate(BaseModel):
    post_value: Optional[float] = None
    target_value: Optional[float] = None
    outcome_status: Optional[OutcomeStatus] = None
    evidence_notes: Optional[str] = None


class OutcomeInDB(OutcomeBase):
    id: UUID
    absolute_change: Optional[float] = None
    percentage_change: Optional[float] = None
    interpretation: Optional[str] = None
    created_at: datetime
    updated_at: datetime
    model_config = ConfigDict(from_attributes=True)
