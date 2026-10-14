"""
EduNexus AI — Student Schemas
Pydantic validation models for student records, directory filters, and journey dossiers.
"""

from datetime import date, datetime
from typing import Optional, Literal, List, Dict, Any
from uuid import UUID
from pydantic import BaseModel, Field, EmailStr, ConfigDict


StudentStatus = Literal[
    'active', 'inactive', 'graduated', 'withdrawn', 'suspended', 'on_leave'
]

RiskTier = Literal['low', 'moderate', 'medium', 'high', 'critical', 'insufficient_data']
TrendDirection = Literal['improving', 'stable', 'declining']
TimelineEventType = Literal['attendance', 'academic', 'intervention', 'milestone', 'engagement']
SeverityLevel = Literal['info', 'success', 'warning', 'critical']


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
    department: Optional[str] = Field(default=None, description="Academic department or stream")
    cgpa: Optional[float] = Field(None, ge=0, le=10)
    backlogs: Optional[int] = Field(None, ge=0)
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
    department: Optional[str] = None
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
    latest_assessment_percentage: Optional[float] = Field(None, description="Latest cycle assessment score %")
    trend: Optional[TrendDirection] = Field(default="stable", description="Performance direction")
    review_status: Optional[str] = Field(default="On Track", description="Advisory workflow state")
    risk_tier: Optional[RiskTier] = Field(default="low", description="Explainable risk tier")
    risk_score: Optional[float] = Field(default=0.0, description="Composite risk index")
    active_interventions_count: Optional[int] = Field(None, description="Number of active intervention plans")
    # KPMG 7-Domain & Dual-Risk Extensions
    success_score: Optional[float] = Field(None, description="0-100 holistic success index")
    success_tier: Optional[str] = Field(None, description="thriving, proficient, developing, needs_support")
    academic_risk_tier: Optional[str] = Field(None, description="Independent academic risk tier: low, moderate, high, critical")
    placement_risk_tier: Optional[str] = Field(None, description="Independent placement risk tier: low, moderate, high, critical")
    segment_id: Optional[str] = Field(None, description="Actionable cohort ID")
    segment_label: Optional[str] = Field(None, description="Actionable cohort display name")
    segment_badge_color: Optional[str] = Field(None, description="Tailwind color token for cohort badge")


class JourneyTimelineEvent(BaseModel):
    """Single chronological journey touchpoint."""
    id: str
    date: str
    event_type: TimelineEventType
    title: str
    description: str
    metric_badge: Optional[str] = None
    severity: SeverityLevel = "info"
    is_data_gap: bool = False
    gap_reason: Optional[str] = None


class MissingDataNotice(BaseModel):
    """Transparent notice for missing or pending academic telemetry."""
    category: str
    metric: str
    status: str
    message: str
    impact_on_scoring: str = "Not penalized — missing telemetry does not inflate risk index."


class StudentJourneyProfileResponse(BaseModel):
    """Holistic student dossier with journey timeline, trend points, and ethical notices."""
    student: StudentInDB
    department: str
    attendance_rate: Optional[float]
    average_score: Optional[float]
    latest_assessment_percentage: Optional[float] = None
    trend: TrendDirection
    review_status: str
    risk_profile: Dict[str, Any]
    missing_data_notices: List[MissingDataNotice]
    recent_attendance: List[Dict[str, Any]]
    recent_assessments: List[Dict[str, Any]]
    recent_engagements: List[Dict[str, Any]]
    interventions: List[Dict[str, Any]]
    timeline_events: List[JourneyTimelineEvent]
    metrics_trend: List[Dict[str, Any]]
    # KPMG 7-Domain Extensions
    success_profile: Optional[Dict[str, Any]] = None
    academic_risk_profile: Optional[Dict[str, Any]] = None
    placement_risk_profile: Optional[Dict[str, Any]] = None
    segment_profile: Optional[Dict[str, Any]] = None
    placement_details: Optional[Dict[str, Any]] = None
    skills_details: Optional[Dict[str, Any]] = None
    feedback_details: Optional[Dict[str, Any]] = None
    lms_details: Optional[Dict[str, Any]] = None

