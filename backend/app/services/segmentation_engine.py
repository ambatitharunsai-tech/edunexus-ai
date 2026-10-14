"""
EduNexus AI — Student Segmentation Engine
Rule-based classification of students into 5 actionable strategic cohorts.

BONUS CHALLENGE CAPABILITY:
Groups students according to dual academic and career trajectories, pairing each
segment with clear, personalized institutional recommendations.
"""

from typing import Dict, Any, Optional
from app.schemas.success_score import (
    StudentSegmentProfile,
    SegmentId,
    IndependentRiskSignal,
)


class SegmentationEngine:
    """Classifies students into 5 actionable strategic cohorts."""

    @staticmethod
    def classify_student(
        success_score: Optional[float],
        academic_risk: IndependentRiskSignal,
        placement_risk: IndependentRiskSignal,
        academic_score: Optional[float] = None,
        placement_score: Optional[float] = None,
    ) -> StudentSegmentProfile:
        """
        Classifies a student based on holistic success score and dual risk profiles.
        """
        if success_score is None or "insufficient_data" in (academic_risk.tier, placement_risk.tier):
            return StudentSegmentProfile(segment_id="insufficient_data", segment_label="Awaiting data review",
                tagline="Classification pending", badge_color="slate",
                description="Success or independent risk data is insufficient; no strategic cohort is inferred.",
                recommended_action="Review missing domain records with an advisor.", action_type="skill_expansion")
        academic_score = academic_score if academic_score is not None else 0
        placement_score = placement_score if placement_score is not None else 0
        acad_tier = academic_risk.tier
        place_tier = placement_risk.tier
        is_acad_high = acad_tier in ("high", "critical")
        is_place_high = place_tier in ("high", "critical")

        # 1. Priority Holistic Support (Both risks high, or success score < 50)
        if (is_acad_high and is_place_high) or (success_score is not None and success_score < 50.0):
            return StudentSegmentProfile(
                segment_id="priority_holistic_support",
                segment_label="Priority Holistic Support",
                tagline="Urgent Multi-Domain Support Needed",
                badge_color="rose",
                description="Both independent risks are high, or the observed Success Score is below 50. Advisor review should determine appropriate support.",
                recommended_action="Initiate immediate multi-stakeholder support: academic tutoring, wellness check-in, and structured weekly counseling.",
                action_type="urgent_counseling",
            )

        # 2. Academic Star / Career At-Risk (Strong academics, high placement risk)
        if (academic_score >= 70.0 or acad_tier == "low") and is_place_high:
            return StudentSegmentProfile(
                segment_id="academic_star_career_at_risk",
                segment_label="Academic Stars / Career At-Risk",
                tagline="Strong Theory, Placement Prep Deficit",
                badge_color="blue",
                description="Excels in theoretical examinations and course marks, but shows low coding assessment scores or lack of mock interview attendance.",
                recommended_action="Enroll in accelerated technical coding sprints, quantitative aptitude workshops, and mandatory mock HR practice.",
                action_type="placement_bootcamp",
            )

        # 3. Practical Star / Exam Vulnerable (Strong placement/coding, high academic risk)
        if (placement_score >= 72.0 or place_tier == "low") and is_acad_high:
            return StudentSegmentProfile(
                segment_id="practical_star_exam_vulnerable",
                segment_label="Practical Stars / Exam Vulnerable",
                tagline="Strong Hands-on Skills, Academic Risk",
                badge_color="amber",
                description="Demonstrates high technical problem solving, hackathon contributions or coding ability, but faces exam backlog or attendance shortfalls.",
                recommended_action="Assign dedicated faculty tutor for theory exam remediation, establish attendance recovery plan, and fast-track backlog exams.",
                action_type="academic_tutoring",
            )

        # 4. High Achievers & Placement Ready (High success score, both risks low)
        if (success_score is not None and success_score >= 78.0 and acad_tier == "low" and place_tier == "low") or (
            academic_score >= 78.0 and placement_score >= 75.0 and acad_tier == "low" and place_tier == "low"
        ):
            return StudentSegmentProfile(
                segment_id="high_achiever_placement_ready",
                segment_label="High Achievers & Placement Ready",
                tagline="Dual Excellence Cohort",
                badge_color="emerald",
                description="Strong performance across recorded campus domains, with consistent academic standing and proven career readiness.",
                recommended_action="Nominate for tier-1 campus recruitment drives, industry innovation fellowships, and peer-mentorship leadership roles.",
                action_type="mentorship",
            )

        # 5. Steady / Emerging Potential (Default consistent baseline)
        return StudentSegmentProfile(
            segment_id="steady_emerging_potential",
            segment_label="Steady / Emerging Potential",
            tagline="Consistent Baseline, Growth Ready",
            badge_color="purple",
            description="Maintains stable academic progression and developing placement metrics with room to broaden competencies.",
            recommended_action="Encourage industry certification completions, open-source project contributions, and advanced elective exploration.",
            action_type="skill_expansion",
        )


segmentation_engine = SegmentationEngine()
