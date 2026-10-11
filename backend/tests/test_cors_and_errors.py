"""
EduNexus AI — CORS & Error Handling Tests
Verifies error formats and cross-origin headers.
"""

from fastapi.testclient import TestClient


def test_not_found_returns_structured_error(client: TestClient):
    """Verify 404 responses follow the standardized error payload envelope."""
    response = client.get("/api/v1/nonexistent-route-404")
    assert response.status_code == 404

    data = response.json()
    assert "error" in data
    assert data["error"]["code"] == "NOT_FOUND"
    assert "message" in data["error"]


def test_method_not_allowed_error_format(client: TestClient):
    """Verify 405 Method Not Allowed returns structured error."""
    response = client.post("/health")
    assert response.status_code == 405

    data = response.json()
    assert "error" in data
    assert data["error"]["code"] == "METHOD_NOT_ALLOWED"


def test_cors_preflight_request(client: TestClient):
    """Verify CORS preflight handling for allowed origin."""
    origin = "http://localhost:5173"
    headers = {
        "Origin": origin,
        "Access-Control-Request-Method": "GET",
        "Access-Control-Request-Headers": "content-type",
    }
    response = client.options("/health", headers=headers)
    assert response.status_code == 200
    assert response.headers.get("access-control-allow-origin") == origin
