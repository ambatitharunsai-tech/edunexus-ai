"""
EduNexus AI — Interventions router.
CRUD for interventions and outcome tracking.
"""

from datetime import date
from fastapi import APIRouter, HTTPException
from typing import Optional

from app.config import settings
from app.models.schemas import (
    InterventionCreate,
    InterventionUpdate,
    OutcomeCreate,
)

router = APIRouter()


def _get_supabase():
    from supabase import create_client
    return create_client(settings.SUPABASE_URL, settings.SUPABASE_SERVICE_ROLE_KEY)


@router.get("")
async def list_interventions(student_id: Optional[str] = None, status: Optional[str] = None):
    """List interventions, optionally filtered by student and status."""
    supabase = _get_supabase()

    query = supabase.table("interventions").select("*")
    if student_id:
        query = query.eq("student_id", student_id)
    if status:
        query = query.eq("status", status)

    result = query.order("created_at", desc=True).execute()
    return result.data or []


@router.get("/{intervention_id}")
async def get_intervention(intervention_id: str):
    """Get a single intervention with its outcomes."""
    supabase = _get_supabase()

    result = supabase.table("interventions").select("*").eq("id", intervention_id).execute()
    if not result.data:
        raise HTTPException(status_code=404, detail="Intervention not found")

    intervention = result.data[0]

    # Get outcomes
    outcomes = (
        supabase.table("outcomes")
        .select("*")
        .eq("intervention_id", intervention_id)
        .order("measurement_date", desc=True)
        .execute()
    ).data or []

    return {**intervention, "outcomes": outcomes}


@router.post("", status_code=201)
async def create_intervention(intervention: InterventionCreate):
    """Create a new intervention for a student."""
    supabase = _get_supabase()

    # Verify student exists
    student = supabase.table("students").select("id").eq("id", intervention.student_id).execute()
    if not student.data:
        raise HTTPException(status_code=404, detail="Student not found")

    data = intervention.model_dump()
    # Convert dates to strings for JSON
    for key in ("start_date", "follow_up_date"):
        if data.get(key):
            data[key] = str(data[key])

    result = supabase.table("interventions").insert(data).execute()
    if not result.data:
        raise HTTPException(status_code=400, detail="Failed to create intervention")

    return result.data[0]


@router.patch("/{intervention_id}")
async def update_intervention(intervention_id: str, update: InterventionUpdate):
    """Update an intervention (status, notes, dates, etc.)."""
    supabase = _get_supabase()

    data = {k: v for k, v in update.model_dump().items() if v is not None}
    if not data:
        raise HTTPException(status_code=400, detail="No fields to update")

    # Convert dates to strings
    for key in ("follow_up_date", "completed_date"):
        if key in data and data[key]:
            data[key] = str(data[key])

    data["updated_at"] = "now()"

    result = (
        supabase.table("interventions")
        .update(data)
        .eq("id", intervention_id)
        .execute()
    )
    if not result.data:
        raise HTTPException(status_code=404, detail="Intervention not found")

    return result.data[0]


@router.post("/{intervention_id}/outcomes", status_code=201)
async def create_outcome(intervention_id: str, outcome: OutcomeCreate):
    """Record outcome metrics for an intervention."""
    supabase = _get_supabase()

    # Verify intervention exists
    intervention = (
        supabase.table("interventions")
        .select("id")
        .eq("id", intervention_id)
        .execute()
    )
    if not intervention.data:
        raise HTTPException(status_code=404, detail="Intervention not found")

    data = outcome.model_dump()
    data["intervention_id"] = intervention_id
    data["measurement_date"] = str(data["measurement_date"])

    result = supabase.table("outcomes").insert(data).execute()
    if not result.data:
        raise HTTPException(status_code=400, detail="Failed to record outcome")

    return result.data[0]


@router.get("/{intervention_id}/outcomes")
async def list_outcomes(intervention_id: str):
    """List all outcomes for an intervention."""
    supabase = _get_supabase()

    result = (
        supabase.table("outcomes")
        .select("*")
        .eq("intervention_id", intervention_id)
        .order("measurement_date", desc=True)
        .execute()
    )
    return result.data or []
