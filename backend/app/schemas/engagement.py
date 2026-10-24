"""
EduNexus AI — Engagement Schemas
Pydantic validation models for extracurricular and LMS activity events.
"""

from datetime import datetime
from typing import Optional, Literal, Dict, Any
from uuid import UUID
from pydantic import BaseModel, Field, ConfigDict


EngagementEventType = Literal[
    'lms_login',
    'library_visit',
    'counseling_session',
    'extracurricular',
    'mentoring',
    'peer_study',
    'workshop',
]


class EngagementEventBase(BaseModel):
    student_id: UUID = Field(..., description="Foreign key to student record")
    event_type: EngagementEventType = Field(..., description="Type of engagement activity")
    title: str = Field(..., min_length=1, max_length=150)
    description: Optional[str] = None
    duration_minutes: Optional[int] = Field(None, ge=0, description="Duration in minutes (>= 0)")
    event_timestamp: datetime = Field(default_factory=datetime.now)
    metadata: Dict[str, Any] = Field(default_factory=dict, description="Arbitrary activity metadata JSONB")


class EngagementEventCreate(EngagementEventBase):
    """Payload to log an engagement event."""
    pass


class EngagementEventInDB(EngagementEventBase):
    id: UUID
    created_at: datetime
    model_config = ConfigDict(from_attributes=True)
