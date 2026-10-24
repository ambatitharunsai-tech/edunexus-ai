"""
EduNexus AI — Health Check Schema
"""

from datetime import datetime, timezone
from pydantic import BaseModel, Field


class HealthResponse(BaseModel):
    """Health check payload for monitoring and readiness probes."""

    status: str = Field(default="healthy", description="Service health state")
    service: str = Field(default="EduNexus AI API", description="Service name")
    version: str = Field(default="0.1.0", description="Semantic version string")
    environment: str = Field(default="development", description="Runtime environment")
    timestamp: datetime = Field(
        default_factory=lambda: datetime.now(timezone.utc),
        description="UTC timestamp of the health check",
    )
