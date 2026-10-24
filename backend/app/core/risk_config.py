"""
EduNexus AI — Risk Engine Configuration
Centralized, documented, and transparent configuration of scoring weights,
institutional benchmarks, and decision-support boundaries.

ETHICAL MANDATE:
- All calculations are deterministic and explainable.
- No black-box machine-learning model is claimed or used.
- Sensitive personal attributes (race, gender, religion, socioeconomic proxies)
  are strictly excluded from scoring.
- Outputs are decision-support signals for educators; never automated punitive actions.
"""

from typing import Dict, Any, Literal
from pydantic import BaseModel, Field, model_validator


RiskTier = Literal["low", "moderate", "high", "critical", "insufficient_data"]


DECISION_SUPPORT_DISCLAIMER = (
    "Ethical Decision-Support Notice: This risk indicator is an empirical baseline signal "
    "designed to guide human advisor review and student support planning. It is NOT a diagnosis, "
    "a psychological assessment, or a definitive automated determination of future performance. "
    "Institutions must never use this indicator to automatically penalize, discipline, or exclude students."
)


class RiskEngineConfig(BaseModel):
    """Configurable scoring parameters with validated mathematical properties."""

    # 1. Weights (must sum to 1.0)
    attendance_weight: float = Field(
        default=0.35,
        ge=0.0,
        le=1.0,
        description="Weight allocated to attendance consistency and trajectory (35%)",
    )
    academic_weight: float = Field(
        default=0.40,
        ge=0.0,
        le=1.0,
        description="Weight allocated to assessment marks and recent trend (40%)",
    )
    engagement_weight: float = Field(
        default=0.25,
        ge=0.0,
        le=1.0,
        description="Weight allocated to recorded campus and co-curricular engagement events (25%)",
    )

    # 2. Institutional Benchmarks & Thresholds
    attendance_benchmark: float = Field(
        default=80.0,
        ge=0.0,
        le=100.0,
        description="Institutional minimum attendance expectation (80.0%)",
    )
    attendance_critical_threshold: float = Field(
        default=75.0,
        ge=0.0,
        le=100.0,
        description="Attendance level triggering urgent counselor outreach (75.0%)",
    )
    academic_benchmark: float = Field(
        default=70.0,
        ge=0.0,
        le=100.0,
        description="Institutional benchmark for academic evaluations (70.0%)",
    )
    academic_passing_threshold: float = Field(
        default=60.0,
        ge=0.0,
        le=100.0,
        description="Passing threshold below which remedial support is flagged (60.0%)",
    )
    recent_decline_threshold: float = Field(
        default=4.0,
        ge=0.0,
        le=50.0,
        description="Negative point variance between periods indicating downward trajectory",
    )
    min_sessions_for_attendance_trend: int = Field(
        default=5,
        ge=1,
        description="Minimum recorded sessions required to compute attendance trend safely",
    )
    min_evaluations_for_academic_trend: int = Field(
        default=2,
        ge=1,
        description="Minimum evaluations required to assess academic score velocity",
    )

    # 3. Risk Tier Cutoffs (Composite Score 0.0 - 100.0, where higher indicates higher support need)
    critical_risk_min: float = Field(default=70.0, ge=0.0, le=100.0)
    high_risk_min: float = Field(default=45.0, ge=0.0, le=100.0)
    moderate_risk_min: float = Field(default=25.0, ge=0.0, le=100.0)

    @model_validator(mode="after")
    def validate_weights_and_thresholds(self) -> "RiskEngineConfig":
        total_weight = round(self.attendance_weight + self.academic_weight + self.engagement_weight, 4)
        if total_weight != 1.0:
            raise ValueError(f"Indicator weights must sum exactly to 1.0; got {total_weight}")

        if self.attendance_critical_threshold > self.attendance_benchmark:
            raise ValueError("Critical attendance threshold cannot exceed institutional benchmark")

        if self.academic_passing_threshold > self.academic_benchmark:
            raise ValueError("Passing threshold cannot exceed institutional benchmark")

        if not (self.critical_risk_min > self.high_risk_min > self.moderate_risk_min):
            raise ValueError("Risk tier cutoffs must be strictly decreasing: critical > high > moderate")

        return self

    def classify_risk_tier(self, composite_score: float) -> RiskTier:
        """Classifies a composite score into an actionable support priority tier."""
        score = max(0.0, min(100.0, composite_score))
        if score >= self.critical_risk_min:
            return "critical"
        if score >= self.high_risk_min:
            return "high"
        if score >= self.moderate_risk_min:
            return "moderate"
        return "low"


# Default singleton configuration for the platform
default_risk_config = RiskEngineConfig()
