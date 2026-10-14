"""
EduNexus AI — Dashboard Schemas
Typed Pydantic models for executive and advisor dashboard analytics.
"""

from typing import List, Dict, Optional, Any
from pydantic import BaseModel, Field, ConfigDict


class KPISummary(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    total_students: int = Field(..., description="Total enrolled student count")
    average_success_score: Optional[float] = None
    active_students: int = Field(..., description="Currently active students")
    requiring_review_count: int = Field(..., description="Students flagged for advisory review")
    review_percentage: float = Field(..., description="Percentage of students needing review")
    average_attendance: Optional[float] = Field(..., description="Overall cohort attendance percentage")
    attendance_status: str = Field(..., description="Comparison against institutional benchmark")
    active_interventions_count: int = Field(..., description="Number of underway student support interventions")
    follow_ups_due_count: int = Field(..., description="Interventions due for check-in this week")
    cohort_avg_score: Optional[float] = Field(..., description="Aggregated academic evaluation average")


class AttendanceTrendPoint(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    period: str = Field(..., description="Time interval label (e.g. Week 1, Month)")
    attendance_rate: float = Field(..., description="Percentage attendance recorded")
    threshold: float = Field(default=80.0, description="Institutional minimum policy threshold")
    total_sessions: int = Field(default=0, description="Total class sessions tracked")
    present_sessions: int = Field(default=0, description="Sessions marked present or late")


class AssessmentTrendPoint(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    period: str = Field(..., description="Assessment cycle or term period")
    average_score: float = Field(..., description="Cohort average percentage score")
    subjects: Dict[str, float] = Field(default_factory=dict, description="Subject-level average scores")


class RiskDistributionTier(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    tier: str = Field(..., description="Tier identifier: low, medium, high, critical")
    label: str = Field(..., description="Human-readable category label")
    count: int = Field(..., description="Student headcount in this tier")
    percentage: float = Field(..., description="Share of total cohort")
    color: str = Field(..., description="Visual styling color code")
    description: str = Field(..., description="Actionable advisory guidance for this tier")


class RecentActivityItem(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: str = Field(..., description="Unique event identifier")
    student_id: str = Field(..., description="Student school ID code (e.g. STU-001)")
    student_name: str = Field(..., description="Full student display name")
    activity_type: str = Field(..., description="Event category: attendance, assessment, engagement, intervention")
    title: str = Field(..., description="Event headline")
    description: str = Field(..., description="Event explanation and metrics")
    timestamp: str = Field(..., description="Display timestamp or relative date")
    severity: str = Field(default="info", description="Visual tone: info, success, warning, critical")


class FollowUpStudentItem(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: str = Field(..., description="System UUID identifier")
    student_id: str = Field(..., description="Institutional student ID (e.g. STU-001)")
    name: str = Field(..., description="Full student name")
    grade: str = Field(..., description="Current grade level")
    section: Optional[str] = Field(default=None, description="Class section")
    risk_level: str = Field(..., description="Risk category: low, medium, high, critical")
    risk_score: Optional[float] = Field(..., description="Composite risk index (0-100)")
    primary_risk_factor: str = Field(..., description="Primary observable contributing signal")
    attendance_rate: Optional[float] = Field(None, description="Individual attendance percentage")
    avg_score: Optional[float] = Field(..., description="Individual academic average percentage")
    last_interaction: str = Field(..., description="Last recorded contact or activity")
    assigned_advisor: Optional[str] = Field(default="Academic Support Team", description="Designated case officer")
    status: str = Field(default="Needs Review", description="Intervention workflow state")


class InterventionStatusBreakdown(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    total: int = Field(..., description="Total intervention plans logged")
    planned: int = Field(..., description="Scheduled support plans awaiting start")
    in_progress: int = Field(..., description="Active ongoing intervention plans")
    under_review: int = Field(..., description="Completed plans currently in outcome evaluation")
    completed: int = Field(..., description="Concluded interventions")
    by_type: Dict[str, int] = Field(default_factory=dict, description="Count by intervention type")
    by_priority: Dict[str, int] = Field(default_factory=dict, description="Count by urgency priority")
    completion_rate: float = Field(default=0.0, description="Percentage of finalized plans")
    upcoming_follow_ups: int = Field(default=0, description="Pending follow-ups within next 7 days")


class DashboardMetadata(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    is_demo: bool = Field(..., description="True if operating in synthetic demo mode")
    data_source: str = Field(..., description="Human-readable description of current data source")
    dataset_size: int = Field(..., description="Number of students analyzed")
    generated_at: str = Field(..., description="ISO 8601 generation timestamp")
    disclaimer: str = Field(..., description="Ethical AI governance notice")


class DashboardOverviewResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    domain_coverage: Dict[str, int] = Field(default_factory=dict)
    academic_risk_distribution: List[RiskDistributionTier] = Field(default_factory=list)
    placement_risk_distribution: List[RiskDistributionTier] = Field(default_factory=list)
    cohort_comparisons: List[Dict[str, Any]] = Field(default_factory=list)
    success_distribution: List[Dict[str, Any]] = Field(default_factory=list)
    summary: KPISummary
    attendance_trend: List[AttendanceTrendPoint]
    assessment_trend: List[AssessmentTrendPoint]
    risk_distribution: List[RiskDistributionTier]
    recent_activity: List[RecentActivityItem]
    follow_up_students: List[FollowUpStudentItem]
    intervention_summary: InterventionStatusBreakdown
    metadata: DashboardMetadata
    # KPMG 7-Domain Analytics & Insights
    domain_averages: Optional[Dict[str, Optional[float]]] = Field(
        default=None,
        description="Cohort averages across the 7 domains: academic, attendance, placement, lms, engagement, skills, feedback"
    )
    placement_readiness_summary: Optional[Dict[str, Any]] = Field(
        default=None,
        description="Summary of placement metrics: aptitude avg, coding avg, mock interview avg, and tier counts"
    )
    segmentation_distribution: Optional[List[Dict[str, Any]]] = Field(
        default=None,
        description="Distribution of students across the 5 actionable strategic cohorts"
    )
    dual_risk_matrix: Optional[Dict[str, Any]] = Field(
        default=None,
        description="Contingency counts of Academic Risk (Low, Moderate, High, Critical) vs Placement Risk"
    )

