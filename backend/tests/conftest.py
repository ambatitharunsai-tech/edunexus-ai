"""
EduNexus AI — Pytest Configuration & Test Fixtures
"""

import pytest
from fastapi.testclient import TestClient
from app.main import app


@pytest.fixture(scope="session")
def client() -> TestClient:
    """Session-scoped test client for the FastAPI app."""
    c = TestClient(app)
    c.headers["Authorization"] = "Bearer edunexus-demo-advisor-token"
    return c
