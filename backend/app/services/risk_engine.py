"""
EduNexus AI — Explainable Risk Scoring Engine.

Computes a weighted composite risk score from three transparent factors:
  - Attendance (35%): Based on attendance rate
  - Academic (40%): Based on average assessment score percentage
  - Engagement (25%): Based on engagement frequency

Risk scores are DESCRIPTIVE, not predictive. They summarize observable
metrics and are always flagged with requires_review=True.
No automated punitive decisions are made.
"""

from datetime import date, timedelta

# Weights for each factor (must sum to 1.0)
ATTENDANCE_WEIGHT = 0.35
ACADEMIC_WEIGHT = 0.40
ENGAGEMENT_WEIGHT = 0.25

# Thresholds for risk level classification
RISK_THRESHOLDS = {
    "low": (0, 25),
    "medium": (25, 50),
    "high": (50, 75),
    "critical": (75, 100),
}


def _classify_risk(score: float) -> str:
    """Convert numeric score to risk level."""
    for level, (low, high) in RISK_THRESHOLDS.items():
        if low <= score < high:
            return level
    return "critical"


def _compute_attendance_factor(supabase, student_id: str) -> tuple[float, dict]:
    """
    Attendance factor: 100 - attendance_rate.
    Lower attendance = higher risk.
    """
    # Look at the last 60 days
    sixty_days_ago = str(date.today() - timedelta(days=60))
    result = (
        supabase.table("attendance")
        .select("status")
        .eq("student_id", student_id)
        .gte("date", sixty_days_ago)
        .execute()
    )
    records = result.data or []

    if not records:
        return 50.0, {
            "factor": "Attendance",
            "detail": "No attendance data available (defaulting to moderate risk)",
            "value": 50.0,
            "weight": ATTENDANCE_WEIGHT,
            "contribution": 50.0 * ATTENDANCE_WEIGHT,
        }

    present_count = sum(1 for r in records if r["status"] in ("present", "late"))
    attendance_rate = (present_count / len(records)) * 100
    factor_score = 100 - attendance_rate

    # Build explanation
    if attendance_rate >= 90:
        detail = f"{attendance_rate:.1f}% attendance — excellent"
    elif attendance_rate >= 80:
        detail = f"{attendance_rate:.1f}% attendance — acceptable"
    elif attendance_rate >= 70:
        detail = f"{attendance_rate:.1f}% attendance — below 80% threshold, needs attention"
    else:
        detail = f"{attendance_rate:.1f}% attendance — critically low, immediate attention needed"

    return factor_score, {
        "factor": "Attendance",
        "detail": detail,
        "value": round(factor_score, 2),
        "weight": ATTENDANCE_WEIGHT,
        "contribution": round(factor_score * ATTENDANCE_WEIGHT, 2),
    }


def _compute_academic_factor(supabase, student_id: str) -> tuple[float, dict]:
    """
    Academic factor: 100 - average_score_percentage.
    Lower scores = higher risk.
    """
    result = (
        supabase.table("assessments")
        .select("score,max_score,subject")
        .eq("student_id", student_id)
        .execute()
    )
    records = result.data or []

    if not records:
        return 50.0, {
            "factor": "Academic Performance",
            "detail": "No assessment data available (defaulting to moderate risk)",
            "value": 50.0,
            "weight": ACADEMIC_WEIGHT,
            "contribution": 50.0 * ACADEMIC_WEIGHT,
        }

    total_pct = sum(
        (r["score"] / r["max_score"]) * 100
        for r in records
        if r["max_score"] > 0
    )
    avg_score = total_pct / len(records)
    factor_score = 100 - avg_score

    # Find weakest subject
    subject_scores: dict[str, list[float]] = {}
    for r in records:
        if r["max_score"] > 0:
            subj = r["subject"]
            if subj not in subject_scores:
                subject_scores[subj] = []
            subject_scores[subj].append((r["score"] / r["max_score"]) * 100)

    weakest_subject = None
    weakest_avg = 100.0
    for subj, scores in subject_scores.items():
        avg = sum(scores) / len(scores)
        if avg < weakest_avg:
            weakest_avg = avg
            weakest_subject = subj

    if avg_score >= 80:
        detail = f"Average score {avg_score:.1f}% — strong performance"
    elif avg_score >= 60:
        detail = f"Average score {avg_score:.1f}% — moderate"
        if weakest_subject:
            detail += f", weakest in {weakest_subject} ({weakest_avg:.1f}%)"
    else:
        detail = f"Average score {avg_score:.1f}% — below expectations"
        if weakest_subject:
            detail += f", struggling most in {weakest_subject} ({weakest_avg:.1f}%)"

    return factor_score, {
        "factor": "Academic Performance",
        "detail": detail,
        "value": round(factor_score, 2),
        "weight": ACADEMIC_WEIGHT,
        "contribution": round(factor_score * ACADEMIC_WEIGHT, 2),
    }


def _compute_engagement_factor(supabase, student_id: str) -> tuple[float, dict]:
    """
    Engagement factor: inverse of engagement frequency.
    Fewer activities = higher risk.
    """
    sixty_days_ago = str(date.today() - timedelta(days=60))
    result = (
        supabase.table("engagements")
        .select("activity_type,duration_minutes")
        .eq("student_id", student_id)
        .gte("date", sixty_days_ago)
        .execute()
    )
    records = result.data or []

    if not records:
        return 60.0, {
            "factor": "Engagement",
            "detail": "No engagement data in the last 60 days (defaulting to elevated risk)",
            "value": 60.0,
            "weight": ENGAGEMENT_WEIGHT,
            "contribution": 60.0 * ENGAGEMENT_WEIGHT,
        }

    # Score based on activity count — expect at least 10 activities in 60 days
    activity_count = len(records)
    total_minutes = sum(r.get("duration_minutes", 0) or 0 for r in records)

    # Normalize: 10+ activities = low risk, 0 = high risk
    normalized = min(activity_count / 10.0, 1.0)
    factor_score = (1.0 - normalized) * 100

    activity_types = set(r["activity_type"] for r in records)

    if activity_count >= 10:
        detail = f"{activity_count} activities ({', '.join(activity_types)}), {total_minutes} total minutes — well engaged"
    elif activity_count >= 5:
        detail = f"{activity_count} activities in 60 days — moderate engagement"
    else:
        detail = f"Only {activity_count} activity(ies) in 60 days — low engagement"

    return factor_score, {
        "factor": "Engagement",
        "detail": detail,
        "value": round(factor_score, 2),
        "weight": ENGAGEMENT_WEIGHT,
        "contribution": round(factor_score * ENGAGEMENT_WEIGHT, 2),
    }


def compute_risk_score(supabase, student_id: str) -> dict:
    """
    Compute a full risk score for a student.
    Returns a dict ready to insert into the risk_scores table.
    """
    att_score, att_explanation = _compute_attendance_factor(supabase, student_id)
    acad_score, acad_explanation = _compute_academic_factor(supabase, student_id)
    eng_score, eng_explanation = _compute_engagement_factor(supabase, student_id)

    # Weighted composite
    overall_score = (
        att_score * ATTENDANCE_WEIGHT
        + acad_score * ACADEMIC_WEIGHT
        + eng_score * ENGAGEMENT_WEIGHT
    )

    overall_risk = _classify_risk(overall_score)

    return {
        "student_id": student_id,
        "overall_risk": overall_risk,
        "risk_score": round(overall_score, 2),
        "attendance_factor": round(att_score, 2),
        "academic_factor": round(acad_score, 2),
        "engagement_factor": round(eng_score, 2),
        "explanation": [att_explanation, acad_explanation, eng_explanation],
        "requires_review": True,
    }
