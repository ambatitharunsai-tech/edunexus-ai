from fastapi.testclient import TestClient

from app.core.config import settings
from app.main import app


def test_auth_me_returns_server_verified_demo_identity(client):
    response = client.get("/api/v1/auth/me")

    assert response.status_code == 200
    body = response.json()
    assert body["user"]["id"] == "demo-advisor-001"
    assert body["user"]["email"] == "advisor@edunexus.ai"
    assert body["user"]["role"] == "advisor"


def test_auth_me_requires_bearer_token():
    response = TestClient(app).get("/api/v1/auth/me")
    assert response.status_code == 401


def test_auth_me_rejects_demo_tokens_in_production(monkeypatch):
    monkeypatch.setattr(settings, "ENVIRONMENT", "production")
    response = TestClient(app).get(
        "/api/v1/auth/me",
        headers={"Authorization": "Bearer edunexus-demo-advisor-token"},
    )
    assert response.status_code == 401
    assert "disabled in production" in response.json()["error"]["message"]
