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


def verify_database_connection() -> Dict[str, Any]:
    """
    Actively checks the Supabase connection by executing a live query.
    Strictly reports 'connected': false unless a live query successfully executes.
    """
    if not is_database_configured():
        return {
            "configured": False,
            "connected": False,
            "verified": False,
            "message": "Database credentials not configured in backend/.env",
            "url_configured": bool(settings.SUPABASE_URL),
        }

    try:
        client = get_db_client()
        start_time = time.perf_counter()

        # Query the students table count as a lightweight connection probe
        response = client.table("students").select("id", count="exact").limit(1).execute()
        latency_ms = round((time.perf_counter() - start_time) * 1000, 2)

        return {
            "configured": True,
            "connected": True,
            "verified": True,
            "latency_ms": latency_ms,
            "total_students_detected": response.count if hasattr(response, "count") else len(response.data or []),
            "message": "Supabase PostgreSQL live connection verified successfully",
        }
    except Exception as e:
        return {
            "configured": True,
            "connected": False,
            "verified": False,
            "error": str(e),
            "message": "Connection attempt to Supabase failed",
        }


def reset_client_cache() -> None:
    """Helper for test suites to reset client cache."""
    global _supabase_client
    _supabase_client = None
