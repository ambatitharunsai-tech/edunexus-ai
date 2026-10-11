"""
EduNexus AI — Interventions API Router
Support plan management, assignment, status tracking, and follow-up logging.
"""

from typing import List, Optional
from uuid import UUID
from fastapi import APIRouter, HTTPException, Query, status

from app.schemas.intervention import (
    InterventionCreate,
    InterventionUpdate,
    InterventionInDB,
)
from app.services.dashboard_service import dashboard_service
from app.services.database_service import database_service

router = APIRouter()


@router.get(
    "",
    response_model=List[InterventionInDB],
    summary="List Interventions",
    description="Retrieve support intervention plans with optional status, priority, or student filters.",
)
async def list_interventions(
    student_id: Optional[UUID] = None,
    status_filter: Optional[str] = Query(None, alias="status"),
    priority: Optional[str] = None,
) -> List[InterventionInDB]:
    """List all active and completed student support plans."""
    if database_service.is_configured():
        try:
            return database_service.interventions.get_all(
                student_id=student_id,
                status=status_filter,
                priority=priority,
            )
        except Exception:
            pass

    # Fallback to demo interventions
    raw_data = dashboard_service._load_synthetic_data()
    all_intvs = list(raw_data.get("interventions", [])) + dashboard_service._demo_interventions
    results = []
    for item in all_intvs:
        if student_id and str(item.get("student_id")) != str(student_id):
            continue
        if status_filter and item.get("status") != status_filter:
            continue
        if priority and item.get("priority") != priority:
            continue
        results.append(InterventionInDB(**item))
    return results


@router.post(
    "",
    response_model=InterventionInDB,
    status_code=status.HTTP_201_CREATED,
    summary="Create Student Support Intervention",
    description="Logs a new intervention plan with target review date and assigned officer.",
)
async def create_intervention(intervention: InterventionCreate) -> InterventionInDB:
    """Create a new intervention plan."""
    try:
        return dashboard_service.create_intervention(intervention)
    except Exception as exc:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Failed to record intervention: {str(exc)}",
        )
