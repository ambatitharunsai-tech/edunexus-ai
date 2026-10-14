"""
EduNexus AI — Pytest Configuration & Test Fixtures
"""

import pytest
from fastapi.testclient import TestClient
from app.main import app
from app.core.config import settings

# Tests use explicit demo fixtures regardless of the hosting environment.
# Individual production-security tests set this to production as needed.
settings.ENVIRONMENT = "development"
settings.SUPABASE_URL = ""


@pytest.fixture(scope="session")
def client() -> TestClient:
    """Session-scoped test client for the FastAPI app."""
    c = TestClient(app)
    c.headers["Authorization"] = "Bearer edunexus-demo-advisor-token"
    return c
