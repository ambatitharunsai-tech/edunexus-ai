"""
EduNexus AI — Pydantic models for request/response validation.
"""

from datetime import date, datetime
from typing import Optional
from pydantic import BaseModel, Field


# ── Student ──────────────────────────────────────────────────────────

class StudentBase(BaseModel):
    student_id: str = Field(..., min_length=1, max_length=20)
    first_name: str = Field(..., min_length=1, max_length=100)
    last_name: str = Field(..., min_length=1, max_length=100)
    email: Optional[str] = None
    grade: str = Field(..., min_length=1, max_length=10)
    section: Optional[str] = None
    enrollment_date: date = Field(default_factory=date.today)
    status: str = "active"


class StudentCreate(StudentBase):
    pass


class StudentResponse(StudentBase):
    id: str
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None
    # Computed fields (optional, populated when joined)
    attendance_rate: Optional[float] = None
    avg_score: Optional[float] = None
    risk_level: Optional[str] = None


class StudentListResponse(BaseModel):
    students: list[StudentResponse]
    total: int
    page: int
    page_size: int


# ── Attendance ───────────────────────────────────────────────────────

class AttendanceRecord(BaseModel):
    student_id: str
    date: date
    status: str = Field(..., pattern=r"^(present|absent|late|excused)$")


# ── Assessment ───────────────────────────────────────────────────────

class AssessmentRecord(BaseModel):
    student_id: str
    subject: str
    assessment_type: str
    score: float = Field(..., ge=0)
    max_score: float = Field(..., gt=0)
    date: date


# ── Risk ─────────────────────────────────────────────────────────────

class RiskFactor(BaseModel):
    factor: str
    detail: str
    value: float
    weight: float
    contribution: float


class RiskScoreResponse(BaseModel):
    id: str
    student_id: str
    overall_risk: str
    risk_score: float
    attendance_factor: Optional[float] = None
    academic_factor: Optional[float] = None
    engagement_factor: Optional[float] = None
    explanation: list[RiskFactor]
    computed_at: Optional[datetime] = None
    requires_review: bool = True


# ── Intervention ─────────────────────────────────────────────────────

class InterventionCreate(BaseModel):
    student_id: str
    type: str = Field(..., min_length=1)
    description: str = Field(..., min_length=1)
    assigned_to: Optional[str] = None
    priority: str = "medium"
    start_date: Optional[date] = None
    follow_up_date: Optional[date] = None
    notes: Optional[str] = None


class InterventionUpdate(BaseModel):
    status: Optional[str] = None
    assigned_to: Optional[str] = None
    priority: Optional[str] = None
    follow_up_date: Optional[date] = None
    completed_date: Optional[date] = None
    notes: Optional[str] = None


class InterventionResponse(BaseModel):
    id: str
    student_id: str
    type: str
    description: str
    assigned_to: Optional[str] = None
    status: str
    priority: str
    start_date: Optional[date] = None
    follow_up_date: Optional[date] = None
    completed_date: Optional[date] = None
    notes: Optional[str] = None
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None


# ── Outcome ──────────────────────────────────────────────────────────

class OutcomeCreate(BaseModel):
    metric_name: str = Field(..., min_length=1)
    value_before: Optional[float] = None
    value_after: Optional[float] = None
    measurement_date: date = Field(default_factory=date.today)
    notes: Optional[str] = None


class OutcomeResponse(BaseModel):
    id: str
    intervention_id: str
    metric_name: str
    value_before: Optional[float] = None
    value_after: Optional[float] = None
    measurement_date: date
    notes: Optional[str] = None
    created_at: Optional[datetime] = None


# ── Analytics ────────────────────────────────────────────────────────

class OverviewStats(BaseModel):
    total_students: int
    active_students: int
    average_attendance: float
    at_risk_count: int
    pending_interventions: int
    risk_distribution: dict[str, int]


class TrendPoint(BaseModel):
    date: str
    value: float
    label: Optional[str] = None


# ── CSV Import ───────────────────────────────────────────────────────

class CsvValidationError(BaseModel):
    row: int
    column: str
    message: str


class CsvPreviewResponse(BaseModel):
    file_name: str
    data_type: str  # "students", "attendance", "assessments"
    total_rows: int
    valid_rows: int
    errors: list[CsvValidationError]
    sample_data: list[dict]


class CsvImportResponse(BaseModel):
    imported: int
    skipped: int
    errors: list[CsvValidationError]
