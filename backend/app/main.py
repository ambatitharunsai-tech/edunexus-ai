"""
EduNexus AI — Main FastAPI Application
Student Success & Journey Intelligence Platform API
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.config import settings
from app.core.errors import setup_exception_handlers
from app.schemas.health import HealthResponse
from app.api import api_v1_router


def create_application() -> FastAPI:
    """Application factory for FastAPI."""
    app = FastAPI(
        title=settings.PROJECT_NAME,
        version=settings.VERSION,
        description=settings.DESCRIPTION,
        docs_url="/docs",
        redoc_url="/redoc",
        openapi_url="/openapi.json",
    )

    # Configure CORS
    app.add_middleware(
        CORSMiddleware,
        allow_origins=settings.ALLOWED_ORIGINS,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    # Register global uniform error handlers
    setup_exception_handlers(app)

    # Root health check endpoint (as specified: GET /health)
    @app.get(
        "/health",
        response_model=HealthResponse,
        tags=["System"],
        summary="Service Health Check",
        description="Verify service liveness, current version, and environment.",
    )
    async def health_check() -> HealthResponse:
        return HealthResponse(
            status="healthy",
            service=settings.PROJECT_NAME,
            version=settings.VERSION,
            environment=settings.ENVIRONMENT,
        )

    # Database health check endpoint (GET /health/db)
    @app.get(
        "/health/db",
        tags=["System"],
        summary="Database Connection Health Probe",
        description="Verify live connectivity and query latency to the Supabase PostgreSQL database.",
    )
    async def db_health_check():
        from app.db.client import verify_database_connection
        return verify_database_connection()

    # Root index endpoint
    @app.get("/", tags=["System"], summary="API Root")
    async def root_index():
        return {
            "name": settings.PROJECT_NAME,
            "version": settings.VERSION,
            "status": "operational",
            "docs": "/docs",
            "health": "/health",
        }

    # Mount API v1 router
    app.include_router(api_v1_router, prefix=settings.API_V1_STR)

    return app


app = create_application()
