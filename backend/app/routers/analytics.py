"""
EduNexus AI — Analytics router.
Dashboard aggregates and trend data.
"""

from datetime import date, timedelta
from fastapi import APIRouter, Query

from app.config import settings

router = APIRouter()


def _get_supabase():
    from supabase import create_client
    return create_client(settings.SUPABASE_URL, settings.SUPABASE_SERVICE_ROLE_KEY)


@router.get("/overview")
async def get_overview():
    """Dashboard overview: KPIs and risk distribution."""
    supabase = _get_supabase()

    # Total and active students
    students = supabase.table("students").select("id,status", count="exact").execute()
    total_students = students.count or 0
    active_students = sum(1 for s in (students.data or []) if s["status"] == "active")

    # Average attendance rate (last 30 days)
    thirty_days_ago = str(date.today() - timedelta(days=30))
    attendance = (
        supabase.table("attendance")
        .select("status")
        .gte("date", thirty_days_ago)
        .execute()
    ).data or []
    if attendance:
        present = sum(1 for a in attendance if a["status"] in ("present", "late"))
        avg_attendance = round((present / len(attendance)) * 100, 1)
    else:
        avg_attendance = 0.0

    # Risk distribution
    risk_scores = (
        supabase.rpc(
            "get_latest_risk_scores", {}
        ).execute()
    ).data if False else []

    # Fallback: get latest risk score per student manually
    all_risks = (
        supabase.table("risk_scores")
        .select("student_id,overall_risk,computed_at")
        .order("computed_at", desc=True)
        .execute()
    ).data or []

    # Deduplicate: keep only latest per student
    seen = set()
    latest_risks = []
    for r in all_risks:
        if r["student_id"] not in seen:
            seen.add(r["student_id"])
            latest_risks.append(r)

    risk_distribution = {"low": 0, "medium": 0, "high": 0, "critical": 0}
    for r in latest_risks:
        level = r["overall_risk"]
        if level in risk_distribution:
            risk_distribution[level] += 1

    at_risk_count = risk_distribution["medium"] + risk_distribution["high"] + risk_distribution["critical"]

    # Pending interventions
    pending = (
        supabase.table("interventions")
        .select("id", count="exact")
        .in_("status", ["planned", "in_progress"])
        .execute()
    )
    pending_interventions = pending.count or 0

    return {
        "total_students": total_students,
        "active_students": active_students,
        "average_attendance": avg_attendance,
        "at_risk_count": at_risk_count,
        "pending_interventions": pending_interventions,
        "risk_distribution": risk_distribution,
    }


@router.get("/trends/attendance")
async def attendance_trends(days: int = Query(30, ge=7, le=365)):
    """Attendance trend over time (daily aggregates)."""
    supabase = _get_supabase()

    start_date = str(date.today() - timedelta(days=days))
    attendance = (
        supabase.table("attendance")
        .select("date,status")
        .gte("date", start_date)
        .order("date")
        .execute()
    ).data or []

    # Group by date
    daily: dict[str, dict[str, int]] = {}
    for a in attendance:
        d = a["date"]
        if d not in daily:
            daily[d] = {"total": 0, "present": 0}
        daily[d]["total"] += 1
        if a["status"] in ("present", "late"):
            daily[d]["present"] += 1

    trends = [
        {
            "date": d,
            "value": round((v["present"] / v["total"]) * 100, 1) if v["total"] > 0 else 0,
            "label": f"{v['present']}/{v['total']}",
        }
        for d, v in sorted(daily.items())
    ]

    return trends


@router.get("/trends/assessments")
async def assessment_trends(days: int = Query(90, ge=7, le=365)):
    """Average assessment scores over time by subject."""
    supabase = _get_supabase()

    start_date = str(date.today() - timedelta(days=days))
    assessments = (
        supabase.table("assessments")
        .select("date,subject,score,max_score")
        .gte("date", start_date)
        .order("date")
        .execute()
    ).data or []

    # Group by date and subject
    daily: dict[str, dict[str, list[float]]] = {}
    for a in assessments:
        d = a["date"]
        subj = a["subject"]
        if d not in daily:
            daily[d] = {}
        if subj not in daily[d]:
            daily[d][subj] = []
        if a["max_score"] > 0:
            daily[d][subj].append((a["score"] / a["max_score"]) * 100)

    trends = []
    for d in sorted(daily.keys()):
        entry: dict = {"date": d}
        for subj, scores in daily[d].items():
            entry[subj] = round(sum(scores) / len(scores), 1) if scores else 0
        trends.append(entry)

    return trends


@router.get("/trends/risk")
async def risk_trends(days: int = Query(60, ge=7, le=365)):
    """Risk level distribution over time."""
    supabase = _get_supabase()

    start_date = str(date.today() - timedelta(days=days))
    risks = (
        supabase.table("risk_scores")
        .select("computed_at,overall_risk")
        .gte("computed_at", start_date)
        .order("computed_at")
        .execute()
    ).data or []

    # Group by date (truncate timestamp to date)
    daily: dict[str, dict[str, int]] = {}
    for r in risks:
        d = r["computed_at"][:10]  # Extract date part
        if d not in daily:
            daily[d] = {"low": 0, "medium": 0, "high": 0, "critical": 0}
        level = r["overall_risk"]
        if level in daily[d]:
            daily[d][level] += 1

    trends = [{"date": d, **v} for d, v in sorted(daily.items())]
    return trends


@router.get("/intervention-stats")
async def intervention_stats():
    """Intervention completion and effectiveness stats."""
    supabase = _get_supabase()

    interventions = (
        supabase.table("interventions")
        .select("status,type,created_at,completed_date")
        .execute()
    ).data or []

    total = len(interventions)
    by_status = {"planned": 0, "in_progress": 0, "completed": 0, "cancelled": 0}
    by_type: dict[str, int] = {}

    for i in interventions:
        s = i["status"]
        if s in by_status:
            by_status[s] += 1
        t = i["type"]
        by_type[t] = by_type.get(t, 0) + 1

    completion_rate = round((by_status["completed"] / total) * 100, 1) if total > 0 else 0

    return {
        "total": total,
        "by_status": by_status,
        "by_type": by_type,
        "completion_rate": completion_rate,
    }
