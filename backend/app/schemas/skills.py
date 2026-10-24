"""
EduNexus AI — Student Skills Schemas
Pydantic validation models for technical competency, soft skills, certifications,
and verified badging.
"""

from datetime import date, datetime
from typing import Optional, List, Dict, Any
from uuid import UUID
from pydantic import BaseModel, Field, ConfigDict


class SkillsBase(BaseModel):
    student_id: UUID = Field(..., description="Foreign key to student UUID")
    technical_score: float = Field(..., ge=0.0, le=100.0, description="Practical technical evaluation (0-100)")
    soft_skills_score: float = Field(..., ge=0.0, le=100.0, description="Communication, teamwork, leadership evaluation (0-100)")
    certifications_count: Optional[int] = Field(default=None, ge=0, description="Verified industry certifications count")
    verified_skills: List[str] = Field(default_factory=list, description="List of validated competencies")
    last_assessed_date: date = Field(default_factory=date.today)
    notes: Optional[str] = None


class SkillsCreate(SkillsBase):
    pass


class SkillsUpdate(BaseModel):
    technical_score: Optional[float] = Field(None, ge=0.0, le=100.0)
    soft_skills_score: Optional[float] = Field(None, ge=0.0, le=100.0)
    certifications_count: Optional[int] = Field(None, ge=0)
    verified_skills: Optional[List[str]] = None
    notes: Optional[str] = None


class SkillsInDB(SkillsBase):
    id: UUID
    created_at: datetime
    updated_at: datetime
    model_config = ConfigDict(from_attributes=True)
