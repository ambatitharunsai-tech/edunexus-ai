"""
EduNexus AI — Health Check Unit Tests
Verifies GET /health and related endpoints.
"""

from fastapi.testclient import TestClient


def test_get_health_root(client: TestClient):
    """Verify root GET /health endpoint returns HTTP 200 and valid schema."""
    response = client.get("/health")
    assert response.status_code == 200

    data = response.json()
    assert data["status"] == "healthy"
    assert data["service"] == "EduNexus AI"
    assert "version" in data
    assert "environment" in data
    assert "timestamp" in data


def test_get_health_v1_prefix(client: TestClient):
    """Verify v1 health check endpoint works under /api/v1/health."""
    response = client.get("/api/v1/health")
    assert response.status_code == 200

    data = response.json()
    assert data["status"] == "healthy"
    assert data["service"] == "EduNexus AI"


def test_root_index(client: TestClient):
    """Verify root metadata endpoint."""
    response = client.get("/")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "operational"
    assert "docs" in data
    assert "health" in data
