"""
EduNexus AI — Dashboard API Router
Endpoints providing holistic analytics overview, trends, risk tiers, and follow-ups.
"""

from fastapi import APIRouter, Depends
from app.core.auth import verify_read_authorization
from app.schemas.dashboard import DashboardOverviewResponse
from app.services.dashboard_service import dashboard_service

router = APIRouter(dependencies=[Depends(verify_read_authorization)])


@router.get(
    "/overview",
    response_model=DashboardOverviewResponse,
    summary="Dashboard Executive Analytics",
    description="Retrieves aggregated KPIs, attendance trajectories, assessment performance, explainable risk segmentation, and active follow-up items.",
)
async def get_dashboard_overview() -> DashboardOverviewResponse:
    """Returns the full executive and advisor dashboard state."""
    return dashboard_service.get_dashboard_overview()
