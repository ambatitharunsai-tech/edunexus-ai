"""
EduNexus AI — Students API Router
Student directory, full journey profile retrieval, search and filtering.
"""

from typing import Optional, List, Dict, Any
from uuid import UUID
from fastapi import APIRouter, HTTPException, Query, status
from pydantic import BaseModel

from app.schemas.student import StudentCreate, StudentResponse, StudentInDB
from app.services.database_service import database_service
from app.services.dashboard_service import dashboard_service

router = APIRouter()


class StudentListEnvelope(BaseModel):
    students: List[Dict[str, Any]]
    total: int
    page: int
    page_size: int


@router.get(
    "",
    response_model=StudentListEnvelope,
    summary="List Students Directory",
    description="Search, filter, and paginate through enrolled students with computed attendance and risk indicators.",
)
async def list_students(
    search: Optional[str] = None,
    grade: Optional[str] = None,
    section: Optional[str] = None,
    status_filter: Optional[str] = Query(None, alias="status"),
    page: int = Query(1, ge=1),
    page_size: int = Query(50, ge=1, le=100),
) -> StudentListEnvelope:
    """Retrieve students with computed metrics."""
    if database_service.is_configured():
        try:
            offset = (page - 1) * page_size
            res = database_service.get_students(
                search=search,
                grade=grade,
                section=section,
                status=status_filter,
                limit=page_size,
                offset=offset,
            )
            return StudentListEnvelope(
                students=[s.model_dump() for s in res["students"]],
                total=res["total"],
                page=page,
                page_size=page_size,
            )
        except Exception:
            pass  # Fallback to demo dataset

    # Demo dataset
    data = dashboard_service._load_synthetic_data()
    raw_students: List[Dict[str, Any]] = data.get("students", [])
    attendance_records = data.get("attendance", [])
    assessment_records = data.get("assessments", [])

    # Pre-index attendance & assessments
    student_att: Dict[str, List[str]] = {}
    for att in attendance_records:
        student_att.setdefault(str(att.get("student_id")), []).append(att.get("status", "present"))

    student_ass: Dict[str, List[float]] = {}
    for ass in assessment_records:
        mx = float(ass.get("max_score", 100))
        if mx > 0:
            student_ass.setdefault(str(ass.get("student_id")), []).append(
                (float(ass.get("score", 0)) / mx) * 100.0
            )

    filtered = []
    for s in raw_students:
        s_id = str(s.get("id"))
        first = s.get("first_name", "").lower()
        last = s.get("last_name", "").lower()
        code = s.get("student_id", "").lower()
        s_grade = s.get("current_grade", "")
        s_sec = s.get("section", "")
        s_stat = s.get("status", "active")

        if search:
            q = search.lower().strip()
            if q not in first and q not in last and q not in code:
                continue
        if grade and s_grade != grade:
            continue
        if section and s_sec != section:
            continue
        if status_filter and s_stat != status_filter:
            continue

        att_list = student_att.get(s_id, [])
        att_rate = (
            round((sum(1 for st in att_list if st in ("present", "late")) / len(att_list)) * 100.0, 1)
            if att_list
            else 85.0
        )
        ass_list = student_ass.get(s_id, [])
        avg_score = round(sum(ass_list) / len(ass_list), 1) if ass_list else 75.0

        filtered.append({
            **s,
            "attendance_rate": att_rate,
            "average_score": avg_score,
        })

    total = len(filtered)
    start_idx = (page - 1) * page_size
    end_idx = start_idx + page_size
    page_data = filtered[start_idx:end_idx]

    return StudentListEnvelope(
        students=page_data,
        total=total,
        page=page,
        page_size=page_size,
    )


@router.get(
    "/{student_id}",
    summary="Get Student Journey Profile",
    description="Retrieve comprehensive student history including attendance sessions, evaluations, engagement events, and active interventions.",
)
async def get_student_detail(student_id: str):
    """Retrieve complete student dossier."""
    try:
        uuid_id = UUID(student_id)
        if database_service.is_configured():
            res = database_service.get_student_detail(uuid_id)
            if res:
                return res
    except (ValueError, TypeError):
        pass

    # Demo dataset lookup
    data = dashboard_service._load_synthetic_data()
    raw_students: List[Dict[str, Any]] = data.get("students", [])
    match = next(
        (s for s in raw_students if str(s.get("id")) == student_id or s.get("student_id") == student_id),
        None,
    )
    if not match:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Student record '{student_id}' not found.",
        )

    matched_id = str(match.get("id"))
    attendance = [a for a in data.get("attendance", []) if str(a.get("student_id")) == matched_id]
    assessments = [a for a in data.get("assessments", []) if str(a.get("student_id")) == matched_id]
    engagements = [e for e in data.get("engagement_events", []) if str(e.get("student_id")) == matched_id]
    all_intvs = list(data.get("interventions", [])) + dashboard_service._demo_interventions
    interventions = [i for i in all_intvs if str(i.get("student_id")) == matched_id]

    present_cnt = sum(1 for a in attendance if a.get("status") in ("present", "late"))
    att_rate = round((present_cnt / len(attendance)) * 100.0, 1) if attendance else 85.0

    scores = [
        (float(a.get("score", 0)) / float(a.get("max_score", 100))) * 100.0
        for a in assessments
        if float(a.get("max_score", 100)) > 0
    ]
    avg_score = round(sum(scores) / len(scores), 1) if scores else 75.0

    # Risk factor calculation
    att_factor = max(0.0, min(100.0, 100.0 - att_rate))
    acad_factor = max(0.0, min(100.0, 100.0 - avg_score))
    eng_cnt = len(engagements)
    eng_factor = max(0.0, min(100.0, (1.0 - min(eng_cnt / 10.0, 1.0)) * 100.0))
    risk_score = round((att_factor * 0.35) + (acad_factor * 0.40) + (eng_factor * 0.25), 1)

    tier = "critical" if risk_score >= 75 else ("high" if risk_score >= 50 else ("medium" if risk_score >= 25 else "low"))

    return {
        "student": match,
        "attendance_rate": att_rate,
        "overall_score_average": avg_score,
        "risk_profile": {
            "overall_risk": tier,
            "risk_score": risk_score,
            "factors": [
                {"factor": "Attendance", "value": round(att_factor, 1), "weight": 0.35, "contribution": round(att_factor * 0.35, 1)},
                {"factor": "Academic Evaluation", "value": round(acad_factor, 1), "weight": 0.40, "contribution": round(acad_factor * 0.40, 1)},
                {"factor": "LMS Engagement", "value": round(eng_factor, 1), "weight": 0.25, "contribution": round(eng_factor * 0.25, 1)},
            ],
            "requires_review": tier in ("critical", "high", "medium"),
            "disclaimer": "Descriptive indicator for advisory evaluation only.",
        },
        "recent_attendance": attendance[:25],
        "recent_assessments": assessments[:20],
        "recent_engagements": engagements[:20],
        "interventions": interventions,
    }


@router.post(
    "",
    response_model=StudentInDB,
    status_code=status.HTTP_201_CREATED,
    summary="Create Student Record",
)
async def create_student(student: StudentCreate) -> StudentInDB:
    """Create a new student entry."""
    return database_service.create_student(student)
