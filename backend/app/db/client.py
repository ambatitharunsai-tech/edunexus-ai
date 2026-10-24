"""
EduNexus AI — Official Supabase Database Client Provider
Manages server-side authenticated connection with verification probes.
"""

import time
from typing import Optional, Dict, Any
from app.core.config import settings

# Global client cache to avoid recreating client on every invocation
_supabase_client = None


def is_database_configured() -> bool:
    """Check whether valid, non-placeholder Supabase credentials are configured."""
    url = settings.SUPABASE_URL.strip() if settings.SUPABASE_URL else ""
    key = settings.SUPABASE_SERVICE_ROLE_KEY.strip() if settings.SUPABASE_SERVICE_ROLE_KEY else ""

    if not url or not key:
        return False

    # Check for unconfigured default placeholders
    placeholders = [
        "https://your-project.supabase.co",
        "https://your-project-id.supabase.co",
        "your-supabase-service-role-key-placeholder",
        "your-service-role-key-here",
    ]
    if any(p in url or p in key for p in placeholders):
        return False

    return True


def get_db_client():
    """
    Returns an initialized Supabase client using server-side service credentials.
    Raises RuntimeError if credentials are not configured.
    """
    global _supabase_client
    if _supabase_client is not None:
        return _supabase_client

    if not is_database_configured():
        raise RuntimeError(
            "Supabase database connection is not configured. "
            "Please configure SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in backend/.env "
            "using your Supabase Project Settings -> API credentials."
        )

    from supabase import create_client, ClientOptions

    _supabase_client = create_client(
        settings.SUPABASE_URL,
        settings.SUPABASE_SERVICE_ROLE_KEY,
        options=ClientOptions(
            postgrest_client_timeout=10,
            storage_client_timeout=10,
        ),
    )
    return _supabase_client


EXPECTED_DATABASE_TABLES = (
    "user_profiles",
    "students",
    "attendance",
    "assessments",
    "engagement_events",
    "interventions",
    "intervention_outcomes",
    "audit_events",
    "placement_records",
    "skills_records",
    "feedback_records",
    "lms_activity_records",
    "risk_overrides",
)


def verify_database_connection() -> Dict[str, Any]:
    """
    Verify the real Supabase connection across every required table and the
    server-only audited write RPC. Never treats configured credentials alone
    as proof of connectivity.
    """
    if not is_database_configured():
        return {
            "configured": False,
            "connected": False,
            "verified": False,
            "write_path_verified": False,
            "tables_expected": len(EXPECTED_DATABASE_TABLES),
            "tables_verified": 0,
            "failed_tables": [],
            "message": "Database credentials are not configured on the backend.",
            "url_configured": bool(settings.SUPABASE_URL),
        }

    start_time = time.perf_counter()
    table_counts: Dict[str, int] = {}
    failed_tables = []
    write_path_verified = False

    try:
        client = get_db_client()
        for table_name in EXPECTED_DATABASE_TABLES:
            try:
                response = (
                    client.table(table_name)
                    .select("id", count="exact")
                    .limit(1)
                    .execute()
                )
                count = getattr(response, "count", None)
                table_counts[table_name] = (
                    int(count) if count is not None else len(response.data or [])
                )
            except Exception:
                # Do not expose raw provider exceptions or credentials.
                failed_tables.append(table_name)

        # Empty arrays do not mutate data. This validates that the transactional,
        # audited write path exists and is callable by the server key.
        if not failed_tables:
            try:
                client.rpc(
                    "edunexus_commit",
                    {
                        "p_table": "students",
                        "p_records": [],
                        "p_audits": [],
                        "p_delete_ids": [],
                    },
                ).execute()
                write_path_verified = True
            except Exception:
                write_path_verified = False

        latency_ms = round((time.perf_counter() - start_time) * 1000, 2)
        connected = len(table_counts) == len(EXPECTED_DATABASE_TABLES) and not failed_tables
        verified = connected and write_path_verified
        message = (
            "Supabase tables and audited write RPC verified successfully."
            if verified
            else (
                "Supabase table reads succeeded, but the audited write RPC could not be verified."
                if connected
                else "Supabase connection failed for one or more required tables."
            )
        )
        return {
            "configured": True,
            "connected": connected,
            "verified": verified,
            "write_path_verified": write_path_verified,
            "latency_ms": latency_ms,
            "tables_expected": len(EXPECTED_DATABASE_TABLES),
            "tables_verified": len(table_counts),
            "failed_tables": failed_tables,
            "table_counts": table_counts,
            "total_students_detected": table_counts.get("students", 0),
            "message": message,
        }
    except Exception:
        return {
            "configured": True,
            "connected": False,
            "verified": False,
            "write_path_verified": False,
            "latency_ms": round((time.perf_counter() - start_time) * 1000, 2),
            "tables_expected": len(EXPECTED_DATABASE_TABLES),
            "tables_verified": len(table_counts),
            "failed_tables": failed_tables,
            "message": "Supabase connection failed; verify backend credentials, schema, and migrations.",
        }


def reset_client_cache() -> None:
    """Helper for test suites to reset client cache."""
    global _supabase_client
    _supabase_client = None
