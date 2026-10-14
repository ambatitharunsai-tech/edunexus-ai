"""
EduNexus AI — Student Success Score Engine
Deterministic, explainable calculation of the 0–100 Student Success Score
synthesizing all 7 campus telemetry domains with dynamic missing-data weight rescaling.

ETHICAL MANDATE:
- Deterministic weighted scoring: no unverified ML predictions or fake accuracy claims.
- Missing-data neutrality: unrecorded domains are dynamically rescaled, NEVER scored as zero.
- Transparent explainability: every contributing domain discloses its raw value, weight, and contribution.
"""

from math import isfinite
from typing import Dict, Any, List, Optional
from app.schemas.success_score import (
    StudentSuccessScoreResponse,
    DomainScoreBreakdown,
    SuccessTier,
)

# Standard baseline weights for the 7 domains (sum = 1.0)
DEFAULT_DOMAIN_WEIGHTS: Dict[str, float] = {
    "academic": 0.25,
    "attendance": 0.15,
    "placement": 0.20,
    "lms": 0.10,
    "engagement": 0.10,
    "skills": 0.10,
    "feedback": 0.10,
}


class SuccessScoreEngine:
    """Calculates holistic Student Success Scores with mathematical transparency."""

    def __init__(self, weights: Optional[Dict[str, float]] = None):
        self.weights = dict(DEFAULT_DOMAIN_WEIGHTS) if weights is None else dict(weights)
        if set(self.weights) != set(DEFAULT_DOMAIN_WEIGHTS) or any(not isfinite(w) or w <= 0 for w in self.weights.values()):
            raise ValueError("All seven weights must be finite and positive")
        total_w = sum(self.weights.values())
        if abs(total_w - 1.0) > 0.001:
            raise ValueError(f"Domain weights must sum to 1.0, got {total_w}")

    def compute_student_success_score(
        self,
        student_id: str,
        academic_data: Optional[Dict[str, Any]] = None,
        attendance_data: Optional[Dict[str, Any]] = None,
        placement_data: Optional[Dict[str, Any]] = None,
        lms_data: Optional[Dict[str, Any]] = None,
        engagement_data: Optional[Dict[str, Any]] = None,
        skills_data: Optional[Dict[str, Any]] = None,
        feedback_data: Optional[Dict[str, Any]] = None,
    ) -> StudentSuccessScoreResponse:
        """
        Computes the positive 0-100 Student Success Score.
        Applies dynamic missing-data weight rescaling when domains lack telemetry.
        """
        raw_scores: Dict[str, Optional[float]] = {}
        telemetry_summaries: Dict[str, Dict[str, Any]] = {}

        def blend(data, components):
            values = [(float(data[key]), weight) for key, weight in components
                      if data is not None and data.get(key) is not None]
            if any(not isfinite(v) or not 0 <= v <= 100 for v, _ in values):
                raise ValueError("Domain scores must be finite values between 0 and 100")
            return round(sum(v*w for v,w in values)/sum(w for _,w in values), 1) if values else None

        academic = dict(academic_data or {})
        if academic.get("cgpa") is not None:
            cgpa = float(academic["cgpa"])
            if not isfinite(cgpa) or not 0 <= cgpa <= 10:
                raise ValueError("CGPA must be between 0 and 10")
            # Unknown backlogs do not imply zero: omit this composite when unavailable.
            if academic.get("backlogs") is not None:
                if int(academic["backlogs"]) < 0:
                    raise ValueError("Backlogs cannot be negative")
                academic["cgpa_component"] = max(0, cgpa*10-int(academic["backlogs"])*12)
            else:
                academic["cgpa_component"] = cgpa*10
        inputs = {
            "academic": (academic, [("cgpa_component", .6), ("average_score", .4)]),
            "attendance": (attendance_data, [("attendance_rate", 1)]),
            "placement": (placement_data, [("aptitude_score", .3), ("coding_score", .4), ("mock_interview_score", .3)]),
            "lms": (lms_data, [("module_completion_pct", .6), ("assignments_submitted_pct", .4)]),
            "skills": (skills_data, [("technical_score", .6), ("soft_skills_score", .4)]),
            "feedback": (feedback_data, [("faculty_sentiment", .5), ("student_satisfaction", .5)]),
        }
        for domain, (data, components) in inputs.items():
            raw_scores[domain] = blend(data, components)
            telemetry_summaries[domain] = dict(data or {})
        count = (engagement_data or {}).get("events_count")
        if count is None and engagement_data and "events" in engagement_data:
            count = len(engagement_data["events"])
        if count is not None and (not isfinite(float(count)) or float(count) < 0):
            raise ValueError("Event count cannot be negative or nonfinite")
        raw_scores["engagement"] = min(100, count*15 + (15 if engagement_data.get("has_leadership_role") else 0)) if count is not None else None
        telemetry_summaries["engagement"] = dict(engagement_data or {})

        # Missing-Data Weight Rescaling Logic
        available_domains = [d for d, score in raw_scores.items() if score is not None]
        missing_domains = [d for d, score in raw_scores.items() if score is None]
        available_count = len(available_domains)
        coverage_pct = round((available_count / 7.0) * 100.0, 1)

        # Insufficient data check (< 3 domains)
        if available_count < 3:
            breakdowns = []
            for d, w in self.weights.items():
                breakdowns.append(
                    DomainScoreBreakdown(
                        domain=d,
                        raw_score=raw_scores.get(d),
                        assigned_weight=w,
                        normalized_weight=0.0,
                        weighted_contribution=0.0,
                        telemetry_summary=telemetry_summaries.get(d, {}),
                        is_missing=(d in missing_domains),
                    )
                )
            return StudentSuccessScoreResponse(
                student_id=student_id,
                success_score=None,
                success_tier=None,
                data_coverage_pct=coverage_pct,
                available_domains_count=available_count,
                status="INSUFFICIENT_DATA",
                missing_domains=missing_domains,
                domain_breakdowns=breakdowns,
                missing_data_notice=(
                    f"Insufficient Telemetry Warning: Only {available_count} of 7 domains are available. "
                    "In adherence to ethical guidelines, no score is calculated to prevent speculative conclusions."
                ),
            )

        # Rescale available weights so they sum to exactly 1.0
        sum_available_weights = sum(self.weights[d] for d in available_domains)
        normalized_weights: Dict[str, float] = {}
        for d in self.weights:
            if d in available_domains and sum_available_weights > 0:
                normalized_weights[d] = self.weights[d] / sum_available_weights
            else:
                normalized_weights[d] = 0.0

        # Compute rescaled weighted total
        total_score = 0.0
        breakdowns = []
        for d, orig_w in self.weights.items():
            norm_w = normalized_weights[d]
            raw = raw_scores.get(d)
            is_miss = raw is None
            contrib = round(raw * norm_w, 2) if raw is not None else 0.0
            if raw is not None:
                total_score += raw * norm_w

            breakdowns.append(
                DomainScoreBreakdown(
                    domain=d,
                    raw_score=raw,
                    assigned_weight=orig_w,
                    normalized_weight=norm_w,
                    weighted_contribution=contrib,
                    telemetry_summary=telemetry_summaries.get(d, {}),
                    is_missing=is_miss,
                )
            )

        final_score = round(min(100.0, max(0.0, total_score)), 1)

        # Classify qualitative tier
        if final_score >= 80.0:
            tier: SuccessTier = "thriving"
        elif final_score >= 65.0:
            tier = "proficient"
        elif final_score >= 50.0:
            tier = "developing"
        else:
            tier = "needs_support"

        status_str = "COMPLETE" if available_count == 7 else "PARTIAL"
        notice = None
        if status_str == "PARTIAL":
            missing_str = ", ".join(m.title() for m in missing_domains)
            notice = (
                f"Missing-Data Neutrality: Telemetry is pending for {missing_str}. "
                "Available domains were proportionally rescaled to 100% without imputing zeroes or penalizing the student."
            )

        return StudentSuccessScoreResponse(
            student_id=student_id,
            success_score=final_score,
            success_tier=tier,
            data_coverage_pct=coverage_pct,
            available_domains_count=available_count,
            status=status_str,
            missing_domains=missing_domains,
            domain_breakdowns=breakdowns,
            missing_data_notice=notice,
        )


success_score_engine = SuccessScoreEngine()
