"""
EduNexus AI — Deterministic Baseline Risk Engine
Calculates transparent, explainable decision-support indicators for student support teams.

ETHICAL RULES:
1. 100% Deterministic: No unverified ML model is claimed or executed.
2. Transparent: Every factor exposes measured value, benchmark, weight, and contribution.
3. Non-Punitive: Missing assessments or telemetry gaps are explicitly disclosed and never defaulted to 0.
4. Human-in-the-Loop: Output is an advisory decision-support signal with support for advisor review & overrides.
5. Privacy-Preserving: No personal demographic characteristics (gender, ethnicity, socio-economic proxies)
   are ever inferred or incorporated into risk scoring.
"""

from datetime import datetime, timezone, date
from typing import Dict, Any, List, Optional
from pydantic import BaseModel, Field

from app.core.risk_config import (
    RiskEngineConfig,
    RiskTier,
    default_risk_config,
    DECISION_SUPPORT_DISCLAIMER,
)


class RiskFactorDetail(BaseModel):
    """Detailed decomposition of a single contributing factor."""
    factor_name: str
    measured_value: Optional[float]
    benchmark_value: float
    sub_metric_score: float = Field(
        description="Sub-metric normalized from 0.0 (optimal) to 100.0 (high focus need)"
    )
    weight: float
    contribution_points: float
    status: str
    explanation: str


class DataFreshnessNotice(BaseModel):
    """Data telemetry freshness and missingness disclosures."""
    category: str
    latest_recorded_date: Optional[str] = None
    total_records: int
    freshness_status: str
    notes: str


class HumanOverrideRecord(BaseModel):
    """Auditable advisor review or priority override."""
    is_overridden: bool = False
    original_tier: RiskTier
    override_tier: Optional[RiskTier] = None
    override_reason: Optional[str] = None
    reviewed_by: Optional[str] = None
    reviewed_at: Optional[str] = None


class RiskExplanationResponse(BaseModel):
    """Holistic explainable risk dossier returned to advisors and dashboard."""
    student_id: str
    composite_risk_score: Optional[float]
    support_priority_tier: RiskTier
    effective_priority_tier: RiskTier
    requires_human_review: bool
    contributing_factors: List[RiskFactorDetail]
    data_freshness: List[DataFreshnessNotice]
    missing_data_warnings: List[str]
    recent_decline_flags: Dict[str, bool]
    human_override: HumanOverrideRecord
    computed_at: str
    decision_support_disclaimer: str


class RiskEngine:
    """Deterministic evaluation service for student success telemetry."""

    def __init__(self, config: Optional[RiskEngineConfig] = None):
        self.config = config or default_risk_config
        self._overrides_store: Dict[str, HumanOverrideRecord] = {}

    def compute_student_risk(
        self,
        student_id: str,
        attendance_records: Optional[List[Dict[str, Any]]] = None,
        assessment_records: Optional[List[Dict[str, Any]]] = None,
        engagement_records: Optional[List[Dict[str, Any]]] = None,
        explicit_missing_evaluations: Optional[List[str]] = None,
    ) -> RiskExplanationResponse:
        """
        Computes deterministic, explainable risk indicators for a student.
        Handles boundary conditions, missing data, and telemetry gaps safely.
        """
        attendance = attendance_records or []
        assessments = assessment_records or []
        engagements = engagement_records or []
        missing_evals = explicit_missing_evaluations or []

        factors: List[RiskFactorDetail] = []
        freshness_notices: List[DataFreshnessNotice] = []
        missing_warnings: List[str] = []
        decline_flags: Dict[str, bool] = {"attendance_decline": False, "academic_decline": False}

        # ── 1. Attendance Analysis ──────────────────────────────────────────
        att_rate = 100.0
        att_sub_score = 0.0
        att_status = "Optimal"
        att_explanation = "Consistent attendance recorded."
        latest_att_date = None

        if attendance:
            sorted_att = sorted(attendance, key=lambda x: str(x.get("session_date", x.get("assessment_date", x.get("date", "")))))
            latest_att_date = str(sorted_att[-1].get("session_date", sorted_att[-1].get("date", "")))
            present_count = sum(1 for a in sorted_att if str(a.get("status", "")).lower() in ("present", "late"))
            total_sessions = len(sorted_att)
            att_rate = round((present_count / total_sessions) * 100.0, 1)

            # Sub-score: inverse of attendance rate (capped between 0 and 100)
            att_sub_score = max(0.0, min(100.0, 100.0 - att_rate))

            # Detect trajectory decline (compare older half vs recent half)
            if total_sessions >= self.config.min_sessions_for_attendance_trend:
                mid = total_sessions // 2
                prior_half = sorted_att[:mid]
                recent_half = sorted_att[mid:]
                prior_rate = (sum(1 for a in prior_half if str(a.get("status", "")).lower() in ("present", "late")) / len(prior_half)) * 100.0
                recent_rate = (sum(1 for a in recent_half if str(a.get("status", "")).lower() in ("present", "late")) / len(recent_half)) * 100.0
                if prior_rate - recent_rate >= self.config.recent_decline_threshold:
                    decline_flags["attendance_decline"] = True
                    att_sub_score = min(100.0, att_sub_score + 10.0)  # Gentle trajectory variance flag

            if att_rate < self.config.attendance_critical_threshold:
                att_status = "Critical Variance"
                att_explanation = (
                    f"Recorded attendance ({att_rate}%) is below the critical institutional threshold "
                    f"({self.config.attendance_critical_threshold}%). Advisory check-in recommended."
                )
            elif att_rate < self.config.attendance_benchmark:
                att_status = "Under Observation"
                att_explanation = (
                    f"Recorded attendance ({att_rate}%) is below the institutional 80% baseline. "
                    f"Variance of {round(self.config.attendance_benchmark - att_rate, 1)}% observed."
                )
            else:
                att_status = "Benchmark Met"
                att_explanation = f"Attendance rate ({att_rate}%) meets or exceeds the institutional benchmark."
        else:
            # Ethical Missing Data Principle: do not penalize when attendance has not been registered
            att_sub_score = 15.0  # Mild neutral baseline
            att_status = "Telemetry Pending"
            att_explanation = "No attendance sessions registered for current cycle. Sub-score set to neutral baseline."
            missing_warnings.append("Attendance records: Zero sessions logged. Telemetry pending weekly sync.")

        att_contribution = round(att_sub_score * self.config.attendance_weight, 2)
        factors.append(
            RiskFactorDetail(
                factor_name="Attendance Consistency & Trajectory",
                measured_value=att_rate,
                benchmark_value=self.config.attendance_benchmark,
                sub_metric_score=round(att_sub_score, 1),
                weight=self.config.attendance_weight,
                contribution_points=att_contribution,
                status=att_status,
                explanation=att_explanation,
            )
        )
        freshness_notices.append(
            DataFreshnessNotice(
                category="Attendance Telemetry",
                latest_recorded_date=latest_att_date,
                total_records=len(attendance),
                freshness_status="Current" if latest_att_date else "Missing Telemetry",
                notes="Session attendance logs derived from institutional records.",
            )
        )

        # ── 2. Academic Performance Analysis ─────────────────────────────────
        acad_avg = 75.0
        acad_sub_score = 0.0
        acad_status = "Optimal"
        acad_explanation = "Assessment performance aligns with academic expectations."
        latest_ass_date = None

        if assessments:
            sorted_ass = sorted(assessments, key=lambda x: str(x.get("session_date", x.get("assessment_date", x.get("date", "")))))
            latest_ass_date = str(sorted_ass[-1].get("assessment_date", sorted_ass[-1].get("date", "")))
            valid_scores: List[float] = []

            for a in sorted_ass:
                max_sc = float(a.get("max_score", 100.0))
                sc = float(a.get("score", 0.0))
                if max_sc > 0.0:
                    pct = max(0.0, min(100.0, (sc / max_sc) * 100.0))
                    valid_scores.append(pct)

            if valid_scores:
                acad_avg = round(sum(valid_scores) / len(valid_scores), 1)
                acad_sub_score = max(0.0, min(100.0, 100.0 - acad_avg))

                # Check recent academic velocity
                if len(valid_scores) >= self.config.min_evaluations_for_academic_trend:
                    mid = len(valid_scores) // 2
                    prior_avg = sum(valid_scores[:mid]) / mid
                    recent_avg = sum(valid_scores[mid:]) / (len(valid_scores) - mid)
                    if prior_avg - recent_avg >= self.config.recent_decline_threshold:
                        decline_flags["academic_decline"] = True
                        acad_sub_score = min(100.0, acad_sub_score + 8.0)

                if acad_avg < self.config.academic_passing_threshold:
                    acad_status = "Critical Variance"
                    acad_explanation = (
                        f"Cumulative assessment score ({acad_avg}%) is below passing benchmark "
                        f"({self.config.academic_passing_threshold}%). Academic tutoring support advised."
                    )
                elif acad_avg < self.config.academic_benchmark:
                    acad_status = "Under Observation"
                    acad_explanation = (
                        f"Cumulative assessment score ({acad_avg}%) is below institutional target "
                        f"({self.config.academic_benchmark}%)."
                    )
                else:
                    acad_status = "Benchmark Met"
                    acad_explanation = f"Academic evaluation score ({acad_avg}%) satisfies institutional target."
            else:
                acad_sub_score = 25.0
                acad_explanation = "Evaluations present but had invalid maximum score denominators."
        else:
            acad_sub_score = 20.0
            acad_status = "Telemetry Pending"
            acad_explanation = "No evaluation units returned for current evaluation cycle."
            missing_warnings.append("Academic Evaluations: Zero evaluation units submitted yet.")

        # Explicit Missing Evaluations Disclosure (Crucial Ethical Rule: Never default to zero)
        if missing_evals:
            missing_warnings.extend(
                [f"Assessment '{eval_name}': Grade pending from department. Not penalized in score." for eval_name in missing_evals]
            )

        acad_contribution = round(acad_sub_score * self.config.academic_weight, 2)
        factors.append(
            RiskFactorDetail(
                factor_name="Academic Performance & Evaluation Velocity",
                measured_value=acad_avg,
                benchmark_value=self.config.academic_benchmark,
                sub_metric_score=round(acad_sub_score, 1),
                weight=self.config.academic_weight,
                contribution_points=acad_contribution,
                status=acad_status,
                explanation=acad_explanation,
            )
        )
        freshness_notices.append(
            DataFreshnessNotice(
                category="Assessment Submissions",
                latest_recorded_date=latest_ass_date,
                total_records=len(assessments),
                freshness_status="Current" if latest_ass_date else "Missing Telemetry",
                notes="Standard evaluation units graded by faculty.",
            )
        )

        # ── 3. Engagement Telemetry Analysis ─────────────────────────────────
        eng_count = len(engagements)
        eng_sub_score = max(0.0, min(100.0, (1.0 - min(eng_count / 8.0, 1.0)) * 100.0))
        sorted_engagements = sorted(
            engagements,
            key=lambda item: str(item.get("event_timestamp", item.get("date", ""))),
        )
        latest_eng_date = (
            str(sorted_engagements[-1].get("event_timestamp", sorted_engagements[-1].get("date", "")))
            if sorted_engagements
            else None
        )

        if eng_count >= 6:
            eng_status = "Benchmark Met"
            eng_explanation = f"Active campus engagement with {eng_count} recorded events."
        elif eng_count >= 2:
            eng_status = "Under Observation"
            eng_explanation = f"Moderate campus engagement ({eng_count} events). Partial telemetry."
        else:
            eng_status = "Low Digital Telemetry"
            eng_explanation = "Limited campus engagement events recorded; activity not represented in these records may be missing."
            missing_warnings.append("Engagement telemetry: Low event count; activity sync may be incomplete.")

        eng_contribution = round(eng_sub_score * self.config.engagement_weight, 2)
        factors.append(
            RiskFactorDetail(
                factor_name="Campus & Co-curricular Engagement",
                measured_value=float(eng_count),
                benchmark_value=6.0,
                sub_metric_score=round(eng_sub_score, 1),
                weight=self.config.engagement_weight,
                contribution_points=eng_contribution,
                status=eng_status,
                explanation=eng_explanation,
            )
        )
        freshness_notices.append(
            DataFreshnessNotice(
                category="Digital Engagement Logs",
                latest_recorded_date=latest_eng_date,
                total_records=eng_count,
                freshness_status="Current" if latest_eng_date else "Low / Missing",
                notes="Timestamped campus and co-curricular engagement events.",
            )
        )

        # ── 4. Composite Risk Index & Support Priority Tier ──────────────────
        # Exclude absent domains and proportionally rescale observed factors.
        present = [bool(attendance), bool(assessments), bool(engagements)]
        total_weight = sum(f.weight for f, available in zip(factors, present) if available)
        for factor, available in zip(factors, present):
            factor.weight = factor.weight / total_weight if available and total_weight else 0
            factor.contribution_points = round(factor.sub_metric_score * factor.weight, 2)
            if not available:
                factor.measured_value = None
                factor.sub_metric_score = 0
                factor.status = "Missing telemetry"
                factor.explanation = "No records available. Excluded; no performance is inferred."
        composite_score = round(sum(f.contribution_points for f in factors), 1) if total_weight else None
        support_priority = self.config.classify_risk_tier(composite_score) if composite_score is not None else "insufficient_data"

        # ── 5. Human Review & Advisor Override ──────────────────────────────
        override_record = self._overrides_store.get(
            student_id,
            HumanOverrideRecord(is_overridden=False, original_tier=support_priority),
        )
        effective_tier = override_record.override_tier if override_record.is_overridden and override_record.override_tier else support_priority

        return RiskExplanationResponse(
            student_id=student_id,
            composite_risk_score=composite_score,
            support_priority_tier=support_priority,
            effective_priority_tier=effective_tier,
            requires_human_review=effective_tier in ("critical", "high", "moderate"),
            contributing_factors=factors,
            data_freshness=freshness_notices,
            missing_data_warnings=missing_warnings,
            recent_decline_flags=decline_flags,
            human_override=override_record,
            computed_at=datetime.now(timezone.utc).isoformat(),
            decision_support_disclaimer=DECISION_SUPPORT_DISCLAIMER,
        )

    def record_human_override(
        self,
        student_id: str,
        override_tier: RiskTier,
        reason: str,
        reviewed_by: str = "Faculty Academic Advisor",
        original_tier: Optional[RiskTier] = None,
    ) -> HumanOverrideRecord:
        """Records an auditable human advisor override on the student's risk profile."""
        record = HumanOverrideRecord(
            is_overridden=True,
            original_tier=original_tier or "moderate",
            override_tier=override_tier,
            override_reason=reason.strip(),
            reviewed_by=reviewed_by.strip(),
            reviewed_at=datetime.now(timezone.utc).isoformat(),
        )
        self._overrides_store[student_id] = record
        return record

    def clear_human_override(self, student_id: str) -> None:
        """Clears advisor override to restore baseline scoring."""
        self._overrides_store.pop(student_id, None)


# Default singleton instance of the deterministic RiskEngine
risk_engine = RiskEngine()
