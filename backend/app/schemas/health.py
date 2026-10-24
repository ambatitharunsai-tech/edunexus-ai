"""
EduNexus AI — Health Check Schema
"""

from datetime import datetime, timezone
from typing import Optional
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


class DatabaseHealthResponse(BaseModel):
    """Database probe and readiness check payload without sensitive credential disclosure."""

    status: str = Field(default="healthy", description="Database health status: healthy, degraded, or unconfigured")
    database: str = Field(default="Supabase PostgreSQL", description="Database engine")
    configured: bool = Field(..., description="Whether database credentials are configured")
    connected: bool = Field(..., description="Whether connection is verified live")
    verified: bool = Field(..., description="Whether probe query completed")
    latency_ms: Optional[float] = Field(default=None, description="Probe query latency in milliseconds")
    total_students_detected: Optional[int] = Field(default=None, description="Total student rows detected in live database")
    message: str = Field(..., description="Diagnostic summary message")
    environment: str = Field(default="development", description="Runtime environment")
    timestamp: datetime = Field(
        default_factory=lambda: datetime.now(timezone.utc),
        description="UTC timestamp of probe",
    )

