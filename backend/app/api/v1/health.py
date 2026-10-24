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


@router.get(
    "/health/db",
    summary="Database Connection Health Probe",
    description="Verify live connectivity and query latency to the Supabase PostgreSQL database.",
    tags=["System"],
)
async def get_db_health():
    """Actively probes the Supabase PostgreSQL database connection."""
    from app.db.client import verify_database_connection
    return verify_database_connection()
