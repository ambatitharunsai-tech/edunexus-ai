"""
EduNexus AI — Live Supabase Integration Tests
Distinguished from mocked tests: strictly executed only when live credentials
are configured in backend/.env. Skipped automatically in offline/development environments.
"""

import pytest
from app.db.client import is_database_configured, verify_database_connection, get_db_client


@pytest.mark.integration
@pytest.mark.skipif(
    not is_database_configured(),
    reason="Live Supabase credentials not configured in backend/.env — live integration tests skipped.",
)
def test_live_supabase_connection():
    """Executes live query probe against configured Supabase PostgreSQL instance."""
    result = verify_database_connection()
    assert result["configured"] is True
    assert result["connected"] is True
    assert result["verified"] is True
    assert "latency_ms" in result
    print(f"\n[LIVE INTEGRATION] Supabase connected with {result['latency_ms']}ms latency.")


@pytest.mark.integration
@pytest.mark.skipif(
    not is_database_configured(),
    reason="Live Supabase credentials not configured in backend/.env — live integration tests skipped.",
)
def test_live_supabase_table_schemas():
    """Validates that core tables are accessible via service role."""
    client = get_db_client()

    for table in ["students", "attendance", "assessments", "interventions", "intervention_outcomes"]:
        resp = client.table(table).select("id").limit(1).execute()
        assert resp.data is not None
