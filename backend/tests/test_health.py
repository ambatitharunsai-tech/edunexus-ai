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


def test_get_database_health_root(client: TestClient):
    """Verify root GET /health/db returns 200 and does not leak secrets."""
    response = client.get("/health/db")
    assert response.status_code == 200

    data = response.json()
    assert "status" in data
    assert data["database"] == "Supabase PostgreSQL"
    assert "configured" in data
    assert "connected" in data
    assert "verified" in data
    assert "message" in data

    # Security check: Ensure no secret credentials leaked
    body_str = response.text.lower()
    assert "service_role" not in body_str
    assert "secret" not in body_str
    assert "jwt_secret" not in body_str


def test_get_database_health_v1_prefix(client: TestClient):
    """Verify API v1 GET /api/v1/health/db works and conforms to schema."""
    response = client.get("/api/v1/health/db")
    assert response.status_code == 200

    data = response.json()
    assert data["database"] == "Supabase PostgreSQL"
    assert isinstance(data["configured"], bool)
    assert isinstance(data["connected"], bool)


def test_database_health_graceful_degradation(client: TestClient, monkeypatch):
    """Verify GET /health/db handles database connection failure gracefully."""
    from app.api.v1 import health as v1_health

    monkeypatch.setattr(
        v1_health,
        "verify_database_connection",
        lambda: {
            "configured": True,
            "connected": False,
            "verified": False,
            "error": "Simulated connection timeout",
            "message": "Connection attempt to Supabase failed",
        },
    )

    response = client.get("/api/v1/health/db")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "degraded"
    assert data["connected"] is False
    assert data["configured"] is True

