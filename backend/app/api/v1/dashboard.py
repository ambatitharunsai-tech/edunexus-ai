"""
EduNexus AI — Dashboard API Router
Endpoints providing holistic analytics overview, trends, risk tiers, and follow-ups.
"""

from typing import Optional
from fastapi import APIRouter, Depends
from app.core.auth import get_optional_current_user, AuthenticatedUser
from app.schemas.dashboard import DashboardOverviewResponse
from app.services.dashboard_service import dashboard_service

router = APIRouter()


@router.get(
    "/overview",
    response_model=DashboardOverviewResponse,
    summary="Dashboard Executive Analytics",
    description="Retrieves aggregated KPIs, attendance trajectories, assessment performance, explainable risk segmentation, and active follow-up items. Safe demonstration data is provided for public unauthenticated visitors.",
)
async def get_dashboard_overview(
    current_user: Optional[AuthenticatedUser] = Depends(get_optional_current_user),
) -> DashboardOverviewResponse:
    """Returns the full executive and advisor dashboard state, or safe public demo data if unauthenticated."""
    return dashboard_service.get_dashboard_overview(current_user=current_user)
