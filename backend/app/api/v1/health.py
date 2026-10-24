"""
EduNexus AI — Health Check Endpoint
"""

from fastapi import APIRouter
from app.core.config import settings
from app.schemas.health import HealthResponse

router = APIRouter()


@router.get(
    "/health",
    response_model=HealthResponse,
    summary="Service Health Check",
    description="Returns the operational status, version, and runtime environment of the EduNexus AI service.",
    tags=["System"],
)
async def get_health() -> HealthResponse:
    """Service readiness and liveness probe."""
    return HealthResponse(
        status="healthy",
        service=settings.PROJECT_NAME,
        version=settings.VERSION,
        environment=settings.ENVIRONMENT,
    )
