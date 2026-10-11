"""
EduNexus AI — Students router.
CRUD operations for student records.
"""

from fastapi import APIRouter, HTTPException, Query
from typing import Optional

from app.config import settings
from app.models.schemas import (
    StudentCreate,
    StudentResponse,
    StudentListResponse,
)

router = APIRouter()


def _get_supabase():
    """Get Supabase client with service role key (backend only)."""
    from supabase import create_client

    return create_client(settings.SUPABASE_URL, settings.SUPABASE_SERVICE_ROLE_KEY)


@router.get("", response_model=StudentListResponse)
async def list_students(
    search: Optional[str] = None,
    grade: Optional[str] = None,
    section: Optional[str] = None,
    status: Optional[str] = None,
    risk_level: Optional[str] = None,
    page: int = Query(1, ge=1),
    page_size: int = Query(20, ge=1, le=100),
):
    """List students with search, filters, and pagination."""
    supabase = _get_supabase()

    query = supabase.table("students").select("*", count="exact")

    if search:
        query = query.or_(
            f"first_name.ilike.%{search}%,"
            f"last_name.ilike.%{search}%,"
            f"student_id.ilike.%{search}%"
        )
    if grade:
        query = query.eq("grade", grade)
    if section:
        query = query.eq("section", section)
    if status:
        query = query.eq("status", status)

    # Pagination
    offset = (page - 1) * page_size
    query = query.range(offset, offset + page_size - 1)
    query = query.order("created_at", desc=True)

    result = query.execute()
    students_data = result.data or []
    total = result.count or 0

    # Enrich with computed fields (attendance_rate, avg_score, risk_level)
    enriched = []
    for s in students_data:
        student = StudentResponse(
            id=s["id"],
            student_id=s["student_id"],
            first_name=s["first_name"],
            last_name=s["last_name"],
            email=s.get("email"),
            grade=s["grade"],
            section=s.get("section"),
            enrollment_date=s["enrollment_date"],
            status=s["status"],
            created_at=s.get("created_at"),
            updated_at=s.get("updated_at"),
        )

        # Get attendance rate
        att_result = supabase.table("attendance").select("status").eq(
            "student_id", s["id"]
        ).execute()
        if att_result.data:
            present = sum(
                1 for a in att_result.data if a["status"] in ("present", "late")
            )
            student.attendance_rate = round(
                (present / len(att_result.data)) * 100, 1
            )

        # Get average score
        score_result = supabase.table("assessments").select(
            "score,max_score"
        ).eq("student_id", s["id"]).execute()
        if score_result.data:
            total_pct = sum(
                (a["score"] / a["max_score"]) * 100
                for a in score_result.data
                if a["max_score"] > 0
            )
            student.avg_score = round(total_pct / len(score_result.data), 1)

        # Get latest risk level
        risk_result = (
            supabase.table("risk_scores")
            .select("overall_risk")
            .eq("student_id", s["id"])
            .order("computed_at", desc=True)
            .limit(1)
            .execute()
        )
        if risk_result.data:
            student.risk_level = risk_result.data[0]["overall_risk"]

        # Filter by risk level if requested
        if risk_level and student.risk_level != risk_level:
            total -= 1
            continue

        enriched.append(student)

    return StudentListResponse(
        students=enriched,
        total=total,
        page=page,
        page_size=page_size,
    )


@router.get("/{student_id}")
async def get_student(student_id: str):
    """Get a single student with all related data."""
    supabase = _get_supabase()

    # Get student
    result = supabase.table("students").select("*").eq("id", student_id).execute()
    if not result.data:
        raise HTTPException(status_code=404, detail="Student not found")

    student = result.data[0]

    # Get attendance records
    attendance = (
        supabase.table("attendance")
        .select("*")
        .eq("student_id", student_id)
        .order("date", desc=True)
        .execute()
    ).data or []

    # Get assessment records
    assessments = (
        supabase.table("assessments")
        .select("*")
        .eq("student_id", student_id)
        .order("date", desc=True)
        .execute()
    ).data or []

    # Get engagement records
    engagements = (
        supabase.table("engagements")
        .select("*")
        .eq("student_id", student_id)
        .order("date", desc=True)
        .execute()
    ).data or []

    # Get latest risk score
    risk = (
        supabase.table("risk_scores")
        .select("*")
        .eq("student_id", student_id)
        .order("computed_at", desc=True)
        .limit(1)
        .execute()
    ).data

    # Get interventions
    interventions = (
        supabase.table("interventions")
        .select("*")
        .eq("student_id", student_id)
        .order("created_at", desc=True)
        .execute()
    ).data or []

    # Compute attendance rate
    attendance_rate = None
    if attendance:
        present = sum(1 for a in attendance if a["status"] in ("present", "late"))
        attendance_rate = round((present / len(attendance)) * 100, 1)

    # Compute average score
    avg_score = None
    if assessments:
        total_pct = sum(
            (a["score"] / a["max_score"]) * 100
            for a in assessments
            if a["max_score"] > 0
        )
        avg_score = round(total_pct / len(assessments), 1)

    return {
        **student,
        "attendance": attendance,
        "assessments": assessments,
        "engagements": engagements,
        "risk": risk[0] if risk else None,
        "interventions": interventions,
        "attendance_rate": attendance_rate,
        "avg_score": avg_score,
    }


@router.post("", response_model=StudentResponse, status_code=201)
async def create_student(student: StudentCreate):
    """Create a new student."""
    supabase = _get_supabase()

    data = student.model_dump()
    data["enrollment_date"] = str(data["enrollment_date"])

    result = supabase.table("students").insert(data).execute()
    if not result.data:
        raise HTTPException(status_code=400, detail="Failed to create student")

    created = result.data[0]
    return StudentResponse(
        id=created["id"],
        **{k: v for k, v in created.items() if k != "id"},
    )
