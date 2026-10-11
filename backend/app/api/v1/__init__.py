"""
EduNexus AI — API v1 Router Aggregator
"""

from fastapi import APIRouter
from app.api.v1.health import router as health_router

api_v1_router = APIRouter()

# Register health check under v1 as well
api_v1_router.include_router(health_router, prefix="", tags=["System"])
