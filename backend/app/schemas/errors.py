"""
EduNexus AI — Structured Error Schemas
Ensures consistent, clear error payload formatting across the entire API.
"""

from typing import Any, Optional
from pydantic import BaseModel, Field


class ErrorDetail(BaseModel):
    """Detailed error object."""

    code: str = Field(..., description="Machine-readable error identifier")
    message: str = Field(..., description="Clear human-readable message")
    details: Optional[Any] = Field(
        default=None, description="Detailed validation breakdown or contextual info"
    )


class ErrorResponse(BaseModel):
    """Top-level error response envelope."""

    error: ErrorDetail
