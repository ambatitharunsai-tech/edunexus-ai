"""
EduNexus AI — Health Check Endpoint
"""

from fastapi import APIRouter
from app.core.config import settings
from app.schemas.health import HealthResponse, DatabaseHealthResponse
from app.db.client import verify_database_connection

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
    response_model=DatabaseHealthResponse,
    summary="Database Connection Health Probe",
    description="Actively verifies connectivity to the Supabase PostgreSQL database without exposing sensitive secrets.",
    tags=["System"],
)
async def get_database_health() -> DatabaseHealthResponse:
    """Live database connection probe."""
    info = verify_database_connection()
    is_connected = bool(info.get("connected", False))
    return DatabaseHealthResponse(
        status="healthy" if is_connected else ("degraded" if info.get("configured") else "unconfigured"),
        database="Supabase PostgreSQL",
        configured=bool(info.get("configured", False)),
        connected=is_connected,
        verified=bool(info.get("verified", False)),
        latency_ms=info.get("latency_ms"),
        total_students_detected=info.get("total_students_detected"),
        message=str(info.get("message", "Database check completed")),
        environment=settings.ENVIRONMENT,
    )

