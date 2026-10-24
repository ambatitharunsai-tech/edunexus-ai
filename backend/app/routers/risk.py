"""
EduNexus AI — Risk scoring router.
Computes and retrieves explainable risk scores.
"""

from fastapi import APIRouter, HTTPException

from app.config import settings
from app.services.risk_engine import compute_risk_score

router = APIRouter()


def _get_supabase():
    from supabase import create_client
    return create_client(settings.SUPABASE_URL, settings.SUPABASE_SERVICE_ROLE_KEY)


@router.get("/{student_id}")
async def get_risk(student_id: str):
    """Get the latest risk score for a student, computing if needed."""
    supabase = _get_supabase()

    # Check student exists
    student = supabase.table("students").select("id").eq("id", student_id).execute()
    if not student.data:
        raise HTTPException(status_code=404, detail="Student not found")

    # Get latest risk score
    result = (
        supabase.table("risk_scores")
        .select("*")
        .eq("student_id", student_id)
        .order("computed_at", desc=True)
        .limit(1)
        .execute()
    )

    if result.data:
        return result.data[0]

    # If no risk score exists, compute one
    return await compute_all_for_student(student_id)


@router.post("/compute/{student_id}")
async def compute_all_for_student(student_id: str):
    """Recompute risk score for a specific student."""
    supabase = _get_supabase()

    # Verify student exists
    student = supabase.table("students").select("id").eq("id", student_id).execute()
    if not student.data:
        raise HTTPException(status_code=404, detail="Student not found")

    risk_data = compute_risk_score(supabase, student_id)

    # Insert the new risk score
    result = supabase.table("risk_scores").insert(risk_data).execute()
    if not result.data:
        raise HTTPException(status_code=500, detail="Failed to store risk score")

    return result.data[0]


@router.post("/compute-all")
async def compute_all():
    """Batch recompute risk scores for all active students."""
    supabase = _get_supabase()

    students = (
        supabase.table("students")
        .select("id")
        .eq("status", "active")
        .execute()
    )

    if not students.data:
        return {"message": "No active students found", "computed": 0}

    computed = 0
    errors = []
    for s in students.data:
        try:
            risk_data = compute_risk_score(supabase, s["id"])
            supabase.table("risk_scores").insert(risk_data).execute()
            computed += 1
        except Exception as e:
            errors.append({"student_id": s["id"], "error": str(e)})

    return {
        "message": f"Computed risk scores for {computed} students",
        "computed": computed,
        "errors": errors,
    }
