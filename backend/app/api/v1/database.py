"""Redacted live Supabase connectivity diagnostics."""
from fastapi import APIRouter

from app.db.client import verify_database_connection

router = APIRouter()


@router.get(
    "/status",
    summary="Verify live database connectivity",
    description=(
        "Checks all required EduNexus tables and the audited write RPC. "
        "Returns no credentials or student records."
    ),
    tags=["System"],
)
async def get_database_status():
    result = verify_database_connection()
    # Keep row counts out of the public diagnostics response. Table names are
    # returned only for failures so an operator can identify schema drift.
    return {
        "configured": result.get("configured", False),
        "connected": result.get("connected", False),
        "verified": result.get("verified", False),
        "write_path_verified": result.get("write_path_verified", False),
        "latency_ms": result.get("latency_ms"),
        "tables_expected": result.get("tables_expected", 0),
        "tables_verified": result.get("tables_verified", 0),
        "failed_tables": result.get("failed_tables", []),
        "url_configured": result.get("url_configured"),
        "server_key_configured": result.get("server_key_configured"),
        "missing_variables": result.get("missing_variables", []),
        "message": result.get("message", "Database status unavailable."),
    }
