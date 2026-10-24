"""
EduNexus AI — Student Success Score & Dual Risk Schemas
Pydantic validation models for the positive 0-100 Student Success Score,
missing-data disclosures, independent Academic & Placement Risk signals,
and 5-cohort student segmentation.
"""

from typing import List, Dict, Optional, Literal, Any
from pydantic import BaseModel, Field, ConfigDict

SuccessTier = Literal["thriving", "proficient", "developing", "needs_support"]
RiskTier = Literal["low", "moderate", "high", "critical", "insufficient_data"]
SegmentId = Literal[
    "insufficient_data",
    "high_achiever_placement_ready",
    "academic_star_career_at_risk",
    "practical_star_exam_vulnerable",
    "priority_holistic_support",
    "steady_emerging_potential",
]


class DomainScoreBreakdown(BaseModel):
    domain: str = Field(..., description="Domain name (e.g. academic, attendance, placement, lms, engagement, skills, feedback)")
    raw_score: Optional[float] = Field(None, description="Calculated 0-100 score for this domain, or null if missing")
    assigned_weight: float = Field(..., description="Original baseline weight (e.g. 0.25)")
    normalized_weight: float = Field(..., description="Rescaled weight accounting for missing domains")
    weighted_contribution: float = Field(..., description="Points contributed to overall score (raw_score * normalized_weight)")
    telemetry_summary: Dict[str, Any] = Field(default_factory=dict, description="Underlying domain metrics (e.g. CGPA, coding score)")
    is_missing: bool = Field(default=False, description="True if no data was submitted for this domain")


class StudentSuccessScoreResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    student_id: str = Field(..., description="Student school ID code (e.g. STU-001)")
    success_score: Optional[float] = Field(None, description="0-100 holistic success index, or null if insufficient data")
    success_tier: Optional[SuccessTier] = Field(None, description="Qualitative tier: thriving (>=80), proficient (>=65), developing (>=50), needs_support (<50)")
    data_coverage_pct: float = Field(..., description="Percentage of the 7 domains with recorded data (0-100)")
    available_domains_count: int = Field(..., description="Number of domains with valid data (0-7)")
    status: Literal["COMPLETE", "PARTIAL", "INSUFFICIENT_DATA"] = Field(..., description="Coverage status flag")
    missing_domains: List[str] = Field(default_factory=list, description="List of domains lacking telemetry")
    domain_breakdowns: List[DomainScoreBreakdown] = Field(default_factory=list)
    missing_data_notice: Optional[str] = Field(
        None,
        description="Ethical transparency notice explaining weight rescaling without penalties."
    )


class RiskFactor(BaseModel):
    metric: str
    observed_value: Any
    threshold: Any
    severity: Literal["low", "moderate", "high", "critical"]
    description: str


class IndependentRiskSignal(BaseModel):
    risk_type: Literal["academic", "placement"]
    tier: RiskTier
    score: Optional[float] = Field(None, description="Deficit index (0-100, where higher indicates greater vulnerability)")
    is_critical_flag: bool = Field(default=False, description="True if statutory or critical threshold breached")
    contributing_factors: List[RiskFactor] = Field(default_factory=list)
    recommendation: str


class StudentSegmentProfile(BaseModel):
    segment_id: SegmentId
    segment_label: str
    tagline: str
    badge_color: str
    description: str
    recommended_action: str
    action_type: Literal["mentorship", "placement_bootcamp", "academic_tutoring", "urgent_counseling", "skill_expansion"]


class StudentComprehensiveDossier(BaseModel):
    """Complete 7-domain student dossier containing success score, dual risks, and segmentation."""
    student_id: str
    full_name: str
    department: str
    current_term: str
    success_score_profile: StudentSuccessScoreResponse
    academic_risk: IndependentRiskSignal
    placement_risk: IndependentRiskSignal
    segment: StudentSegmentProfile
    ethical_disclaimer: str
