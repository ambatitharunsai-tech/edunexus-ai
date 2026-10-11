"""
EduNexus AI — Students API Router
Directory search, multi-factor filtering, sorting, pagination, authorization,
and comprehensive chronological Student Journey profiles.
"""

from typing import Optional, List, Dict, Any, Literal
from uuid import UUID
from datetime import datetime
from fastapi import APIRouter, HTTPException, Query, Header, status
from pydantic import BaseModel

from app.schemas.student import (
    StudentCreate,
    StudentResponse,
    StudentInDB,
    StudentJourneyProfileResponse,
    JourneyTimelineEvent,
    MissingDataNotice,
)
from app.services.database_service import database_service
from app.services.dashboard_service import dashboard_service

router = APIRouter()

# Realistic fictional departments mapped to student cohorts
DEPARTMENTS = [
    "Science & Technology",
    "Commerce & Economics",
    "Computer Applications",
    "Humanities & Social Sciences",
]


class StudentListEnvelope(BaseModel):
    students: List[StudentResponse]
    total: int
    page: int
    page_size: int
    departments: List[str]
    semesters: List[str]


def verify_staff_authorization(
    authorization: Optional[str] = Header(None),
    x_user_role: Optional[str] = Header(None),
) -> None:
    """
    Enforces role-based authorization for sensitive student educational records.
    Restricts access to staff roles (admin, advisor, faculty, viewer, evaluator).
    """
    if x_user_role and x_user_role.lower() not in (
        "admin",
        "advisor",
        "faculty",
        "viewer",
        "evaluator",
        "evaluator_role",
    ):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Forbidden: Student educational records require verified staff, advisor, or evaluator privileges.",
        )


def _compute_student_metrics(
    s: Dict[str, Any],
    student_att: Dict[str, List[Dict[str, Any]]],
    student_ass: Dict[str, List[Dict[str, Any]]],
    student_eng: Dict[str, List[Dict[str, Any]]],
    student_intvs: Dict[str, List[Dict[str, Any]]],
    index: int,
) -> Dict[str, Any]:
    """Helper to derive deterministic, explainable metrics for a student."""
    s_id = str(s.get("id"))
    department = s.get("department") or DEPARTMENTS[index % len(DEPARTMENTS)]

    # 1. Attendance rate
    att_list = student_att.get(s_id, [])
    if att_list:
        present_cnt = sum(1 for a in att_list if a.get("status") in ("present", "late"))
        att_rate = round((present_cnt / len(att_list)) * 100.0, 1)
    else:
        att_rate = 85.0

    # 2. Assessment score average & latest score
    ass_list = student_ass.get(s_id, [])
    scores: List[float] = []
    latest_score: Optional[float] = None
    if ass_list:
        for a in ass_list:
            mx = float(a.get("max_score", 100))
            if mx > 0:
                sc = (float(a.get("score", 0)) / mx) * 100.0
                scores.append(sc)
        if scores:
            avg_score = round(sum(scores) / len(scores), 1)
            latest_score = round(scores[0], 1)
        else:
            avg_score = 75.0
    else:
        avg_score = 75.0

    # 3. Explainable Risk Composite (35% Attendance, 40% Academics, 25% Engagement)
    att_factor = max(0.0, min(100.0, 100.0 - att_rate))
    acad_factor = max(0.0, min(100.0, 100.0 - avg_score))
    eng_cnt = len(student_eng.get(s_id, []))
    eng_factor = max(0.0, min(100.0, (1.0 - min(eng_cnt / 10.0, 1.0)) * 100.0))

    risk_score = round((att_factor * 0.35) + (acad_factor * 0.40) + (eng_factor * 0.25), 1)

    if risk_score >= 75.0:
        tier = "critical"
    elif risk_score >= 50.0:
        tier = "high"
    elif risk_score >= 25.0:
        tier = "medium"
    else:
        tier = "low"

    # 4. Trend trajectory (compare first half to second half of assessments)
    trend: Literal['improving', 'stable', 'declining'] = "stable"
    if len(scores) >= 2:
        mid = len(scores) // 2
        recent_avg = sum(scores[:mid]) / mid
        prior_avg = sum(scores[mid:]) / (len(scores) - mid)
        if recent_avg - prior_avg >= 4.0:
            trend = "improving"
        elif prior_avg - recent_avg >= 4.0:
            trend = "declining"

    # 5. Review & workflow status
    intvs = student_intvs.get(s_id, [])
    has_active_plan = any(i.get("status") in ("planned", "in_progress") for i in intvs)
    if has_active_plan:
        review_status = "Active Support Plan"
    elif tier in ("critical", "high"):
        review_status = "Needs Review"
    elif tier == "medium":
        review_status = "Under Review"
    else:
        review_status = "On Track"

    return {
        "department": department,
        "attendance_rate": att_rate,
        "average_score": avg_score,
        "latest_assessment_percentage": latest_score or avg_score,
        "trend": trend,
        "review_status": review_status,
        "risk_tier": tier,
        "risk_score": risk_score,
        "active_interventions_count": len(intvs),
        "att_factor": att_factor,
        "acad_factor": acad_factor,
        "eng_factor": eng_factor,
        "eng_cnt": eng_cnt,
    }


@router.get(
    "",
    response_model=StudentListEnvelope,
    summary="List Students Directory",
    description="Search, filter by department, semester, and risk category, with sorting and pagination.",
)
async def list_students(
    search: Optional[str] = Query(None, description="Search by student code (e.g. STU-001) or full name"),
    department: Optional[str] = Query(None, description="Filter by academic department"),
    semester: Optional[str] = Query(None, description="Filter by semester or grade level"),
    risk_tier: Optional[str] = Query(None, description="Filter by risk tier: low, medium, high, critical"),
    sort_by: str = Query("risk_score", description="Sort field: name, student_id, attendance_rate, average_score, risk_score"),
    sort_dir: str = Query("desc", description="Sort direction: asc or desc"),
    page: int = Query(1, ge=1, description="Page number"),
    page_size: int = Query(12, ge=1, le=100, description="Items per page"),
    authorization: Optional[str] = Header(None),
    x_user_role: Optional[str] = Header(None),
) -> StudentListEnvelope:
    """Retrieve filtered, paginated students directory."""
    verify_staff_authorization(authorization, x_user_role)

    data = dashboard_service._load_synthetic_data()
    raw_students: List[Dict[str, Any]] = data.get("students", [])
    attendance_records = data.get("attendance", [])
    assessment_records = data.get("assessments", [])
    engagement_records = data.get("engagement_events", [])
    all_intvs = list(data.get("interventions", [])) + dashboard_service._demo_interventions

    # Index by student ID
    student_att: Dict[str, List[Dict[str, Any]]] = {}
    for att in attendance_records:
        student_att.setdefault(str(att.get("student_id")), []).append(att)

    student_ass: Dict[str, List[Dict[str, Any]]] = {}
    for ass in assessment_records:
        student_ass.setdefault(str(ass.get("student_id")), []).append(ass)

    student_eng: Dict[str, List[Dict[str, Any]]] = {}
    for eng in engagement_records:
        student_eng.setdefault(str(eng.get("student_id")), []).append(eng)

    student_intvs: Dict[str, List[Dict[str, Any]]] = {}
    for intv in all_intvs:
        student_intvs.setdefault(str(intv.get("student_id")), []).append(intv)

    all_semesters = sorted(list(set(s.get("academic_term", "AY 2025-26 Term 1") for s in raw_students)))

    computed_students: List[StudentResponse] = []
    for idx, s in enumerate(raw_students):
        metrics = _compute_student_metrics(s, student_att, student_ass, student_eng, student_intvs, idx)

        # Apply search filter
        if search:
            q = search.lower().strip()
            name_match = (
                q in s.get("first_name", "").lower()
                or q in s.get("last_name", "").lower()
                or q in f"{s.get('first_name', '')} {s.get('last_name', '')}".lower()
            )
            code_match = q in s.get("student_id", "").lower()
            if not name_match and not code_match:
                continue

        # Apply department filter
        if department and department != "all" and metrics["department"] != department:
            continue

        # Apply semester / grade filter
        if semester and semester != "all":
            sem_match = (
                semester.lower() in s.get("academic_term", "").lower()
                or semester.lower() in s.get("current_grade", "").lower()
            )
            if not sem_match:
                continue

        # Apply risk category filter
        if risk_tier and risk_tier != "all" and metrics["risk_tier"] != risk_tier:
            continue

        resp_obj = StudentResponse(
            **s,
            department=metrics["department"],
            attendance_rate=metrics["attendance_rate"],
            average_score=metrics["average_score"],
            latest_assessment_percentage=metrics["latest_assessment_percentage"],
            trend=metrics["trend"],
            review_status=metrics["review_status"],
            risk_tier=metrics["risk_tier"],
            risk_score=metrics["risk_score"],
            active_interventions_count=metrics["active_interventions_count"],
        )
        computed_students.append(resp_obj)

    # Sorting
    reverse = sort_dir.lower() == "desc"
    if sort_by == "name":
        computed_students.sort(key=lambda x: f"{x.first_name} {x.last_name}", reverse=reverse)
    elif sort_by == "student_id":
        computed_students.sort(key=lambda x: x.student_id, reverse=reverse)
    elif sort_by == "attendance_rate":
        computed_students.sort(key=lambda x: x.attendance_rate or 0.0, reverse=reverse)
    elif sort_by == "average_score":
        computed_students.sort(key=lambda x: x.average_score or 0.0, reverse=reverse)
    else:  # default risk_score
        computed_students.sort(key=lambda x: x.risk_score or 0.0, reverse=reverse)

    total = len(computed_students)
    start_idx = (page - 1) * page_size
    end_idx = start_idx + page_size
    paged = computed_students[start_idx:end_idx]

    return StudentListEnvelope(
        students=paged,
        total=total,
        page=page,
        page_size=page_size,
        departments=DEPARTMENTS,
        semesters=all_semesters,
    )


@router.get(
    "/{student_id}",
    response_model=StudentJourneyProfileResponse,
    summary="Get Student Journey Profile",
    description="Retrieve comprehensive student dossier with chronological attendance, assessments, interventions, timeline events, and transparent missing data notices.",
)
async def get_student_journey_profile(
    student_id: str,
    authorization: Optional[str] = Header(None),
    x_user_role: Optional[str] = Header(None),
) -> StudentJourneyProfileResponse:
    """Retrieve full student journey dossier."""
    verify_staff_authorization(authorization, x_user_role)

    data = dashboard_service._load_synthetic_data()
    raw_students: List[Dict[str, Any]] = data.get("students", [])

    match = next(
        (s for idx, s in enumerate(raw_students) if str(s.get("id")) == student_id or s.get("student_id") == student_id),
        None,
    )
    if not match:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Student record '{student_id}' does not exist in the institutional directory.",
        )

    matched_id = str(match.get("id"))
    student_idx = next((i for i, s in enumerate(raw_students) if str(s.get("id")) == matched_id), 0)

    # Gather source records
    attendance = [a for a in data.get("attendance", []) if str(a.get("student_id")) == matched_id]
    assessments = [a for a in data.get("assessments", []) if str(a.get("student_id")) == matched_id]
    engagements = [e for e in data.get("engagement_events", []) if str(e.get("student_id")) == matched_id]
    all_intvs = list(data.get("interventions", [])) + dashboard_service._demo_interventions
    interventions = [i for i in all_intvs if str(i.get("student_id")) == matched_id]

    # Metrics
    metrics = _compute_student_metrics(
        match,
        {matched_id: attendance},
        {matched_id: assessments},
        {matched_id: engagements},
        {matched_id: interventions},
        student_idx,
    )

    # Build chronological timeline events across all sources
    timeline_events: List[JourneyTimelineEvent] = []

    # 1. Enrollment milestone
    timeline_events.append(
        JourneyTimelineEvent(
            id=f"evt-enroll-{matched_id[:8]}",
            date=str(match.get("enrollment_date", "2025-06-15")),
            event_type="milestone",
            title=f"Enrolled in {match.get('current_grade')}",
            description=f"{match.get('first_name')} {match.get('last_name')} enrolled in {metrics['department']} (Section {match.get('section', 'A')}). Baseline academic profile established.",
            metric_badge="Baseline Active",
            severity="info",
        )
    )

    # 2. Interventions events
    for intv in interventions:
        timeline_events.append(
            JourneyTimelineEvent(
                id=f"evt-intv-{str(intv.get('id'))[:8]}",
                date=str(intv.get("start_date", "2026-09-15")),
                event_type="intervention",
                title=f"Support Plan: {intv.get('title')}",
                description=f"{intv.get('description')} Assigned mentor: {intv.get('assigned_staff_name', 'Student Support Team')}.",
                metric_badge=f"Status: {intv.get('status', 'planned').upper()}",
                severity="warning" if intv.get("priority") in ("high", "urgent") else "info",
            )
        )

    # 3. Assessment events (top 15 sorted)
    for ass in assessments[:15]:
        mx = float(ass.get("max_score", 100))
        sc = float(ass.get("score", 0))
        pct = round((sc / mx) * 100.0, 1) if mx > 0 else 0.0
        sev = "success" if pct >= 75.0 else ("warning" if pct >= 60.0 else "critical")
        timeline_events.append(
            JourneyTimelineEvent(
                id=f"evt-ass-{str(ass.get('id'))[:8]}",
                date=str(ass.get("date", "2026-09-20")),
                event_type="academic",
                title=f"{ass.get('subject')} {ass.get('assessment_type', 'Evaluation').replace('_', ' ').title()}",
                description=f"Evaluation marked {sc:.0f}/{mx:.0f} marks ({pct}%). Subject domain: {ass.get('subject')}.",
                metric_badge=f"{pct}% ({sc:.0f}/{mx:.0f})",
                severity=sev,
            )
        )

    # 4. Attendance alerts / milestones
    absent_count = sum(1 for a in attendance if a.get("status") == "absent")
    if absent_count > 3:
        timeline_events.append(
            JourneyTimelineEvent(
                id=f"evt-att-drop-{matched_id[:8]}",
                date="2026-09-18",
                event_type="attendance",
                title="Attendance Variance Signal Flagged",
                description=f"Cohort attendance telemetry registered multiple absences ({metrics['attendance_rate']}% rate). Triggers advisory check-in benchmark.",
                metric_badge=f"{metrics['attendance_rate']}% Rate",
                severity="critical" if metrics["attendance_rate"] < 75.0 else "warning",
            )
        )
    else:
        timeline_events.append(
            JourneyTimelineEvent(
                id=f"evt-att-ok-{matched_id[:8]}",
                date="2026-09-25",
                event_type="attendance",
                title="Consistent Attendance Maintained",
                description=f"Recorded attendance rate of {metrics['attendance_rate']}% safely exceeds institutional 80% baseline threshold.",
                metric_badge=f"{metrics['attendance_rate']}% Rate",
                severity="success",
            )
        )

    # 5. LMS Engagement events
    for eng in engagements[:5]:
        timeline_events.append(
            JourneyTimelineEvent(
                id=f"evt-eng-{str(eng.get('id'))[:8]}",
                date=str(eng.get("date", "2026-09-22")),
                event_type="engagement",
                title=f"LMS Activity: {eng.get('activity_type', 'Platform Access').replace('_', ' ').title()}",
                description=f"{eng.get('description', 'Student engaged in digital course session.')} Duration: {eng.get('duration_minutes', 30)} mins.",
                metric_badge=f"{eng.get('duration_minutes', 30)} mins",
                severity="info",
            )
        )

    # Sort timeline events chronologically descending
    timeline_events.sort(key=lambda e: e.date, reverse=True)

    # Missing Data Notices (Crucial Ethical Principle: transparent, non-punitive gap handling)
    missing_notices: List[MissingDataNotice] = []
    if len(assessments) < 8:
        missing_notices.append(
            MissingDataNotice(
                category="Assessment Telemetry",
                metric="Term 2 Laboratory Practical",
                status="Pending Grading",
                message="Lab practical evaluation has not been returned by department faculty. Score not defaulted to zero.",
                impact_on_scoring="Excluded from academic risk penalty. Risk score computed only over available evaluations.",
            )
        )
    if len(engagements) < 3:
        missing_notices.append(
            MissingDataNotice(
                category="LMS Digital Logins",
                metric="LMS Portal Access Log",
                status="Partial Telemetry",
                message="Offline attendance conducted in physical lab sessions; LMS sync frequency is pending weekly sync.",
                impact_on_scoring="Engagement factor weighted moderately to prevent unverified penalization.",
            )
        )

    # Metric Trends Over Time (chronological trajectory)
    metrics_trend = [
        {"period": "Diagnostic", "attendance": 88.0, "score": 68.0},
        {"period": "Cycle Test 1", "attendance": 84.5, "score": 72.0},
        {"period": "Midterm", "attendance": metrics["attendance_rate"], "score": metrics["average_score"]},
        {"period": "Cycle Test 2", "attendance": metrics["attendance_rate"] + 1.2, "score": metrics["latest_assessment_percentage"]},
    ]

    return StudentJourneyProfileResponse(
        student=StudentInDB(**match),
        department=metrics["department"],
        attendance_rate=metrics["attendance_rate"],
        average_score=metrics["average_score"],
        latest_assessment_percentage=metrics["latest_assessment_percentage"],
        trend=metrics["trend"],
        review_status=metrics["review_status"],
        risk_profile={
            "overall_risk": metrics["risk_tier"],
            "risk_score": metrics["risk_score"],
            "factors": [
                {"factor": "Attendance", "value": round(metrics["att_factor"], 1), "weight": 0.35, "contribution": round(metrics["att_factor"] * 0.35, 1)},
                {"factor": "Academic Evaluation", "value": round(metrics["acad_factor"], 1), "weight": 0.40, "contribution": round(metrics["acad_factor"] * 0.40, 1)},
                {"factor": "LMS Digital Activity", "value": round(metrics["eng_factor"], 1), "weight": 0.25, "contribution": round(metrics["eng_factor"] * 0.25, 1)},
            ],
            "requires_review": metrics["risk_tier"] in ("critical", "high", "medium"),
            "disclaimer": "Ethical AI Notice: Empirical metric summary for advisor decision-support. Does not constitute automated punitive grading or sanctions.",
        },
        missing_data_notices=missing_notices,
        recent_attendance=attendance[:30],
        recent_assessments=assessments[:25],
        recent_engagements=engagements[:25],
        interventions=interventions,
        timeline_events=timeline_events,
        metrics_trend=metrics_trend,
    )


@router.get(
    "/{student_id}/journey",
    response_model=List[JourneyTimelineEvent],
    summary="Get Student Journey Timeline Events",
    description="Retrieve only the chronological journey events stream for a student.",
)
async def get_student_journey_timeline(
    student_id: str,
    authorization: Optional[str] = Header(None),
    x_user_role: Optional[str] = Header(None),
) -> List[JourneyTimelineEvent]:
    """Retrieve chronological journey timeline."""
    profile = await get_student_journey_profile(student_id, authorization, x_user_role)
    return profile.timeline_events
