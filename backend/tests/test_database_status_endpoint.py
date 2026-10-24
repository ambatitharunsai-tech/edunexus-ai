from fastapi.testclient import TestClient

from app.api.v1 import database as database_module
from app.main import create_application


def test_database_status_is_redacted_and_reports_unconfigured(monkeypatch):
    monkeypatch.setattr(
        database_module,
        "verify_database_connection",
        lambda: {
            "configured": False,
            "connected": False,
            "verified": False,
            "write_path_verified": False,
            "tables_expected": 13,
            "tables_verified": 0,
            "failed_tables": [],
            "message": "Database credentials are not configured on the backend.",
            "url_configured": True,
            "table_counts": {"students": 0},
            "secret_key": "must-never-be-returned",
        },
    )

    response = TestClient(create_application()).get("/api/v1/database/status")

    assert response.status_code == 200
    body = response.json()
    assert body["configured"] is False
    assert body["connected"] is False
    assert body["verified"] is False
    assert body["tables_expected"] == 13
    assert body["tables_verified"] == 0
    assert "table_counts" not in body
    assert "secret_key" not in body
    assert body["url_configured"] is True
    assert "SUPABASE_SECRET_KEY" in body["missing_variables"]


def test_database_status_reports_table_or_write_failures(monkeypatch):
    monkeypatch.setattr(
        database_module,
        "verify_database_connection",
        lambda: {
            "configured": True,
            "connected": True,
            "verified": False,
            "write_path_verified": False,
            "tables_expected": 13,
            "tables_verified": 13,
            "failed_tables": [],
            "message": "Supabase table reads succeeded, but the audited write RPC could not be verified.",
            "table_counts": {"students": 0},
        },
    )

    response = TestClient(create_application()).get("/api/v1/database/status")

    assert response.status_code == 200
    body = response.json()
    assert body["connected"] is True
    assert body["verified"] is False
    assert body["write_path_verified"] is False
