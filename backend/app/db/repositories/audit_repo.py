"""
EduNexus AI — Audit Repository
PostgreSQL data-access operations for compliance logging.
"""

from typing import List, Optional
from uuid import UUID
from app.db.client import get_db_client
from app.schemas.audit import AuditEventCreate, AuditEventInDB


class AuditRepository:
    def __init__(self, client=None):
        self._client = client

    @property
    def client(self):
        if self._client is not None:
            return self._client
        return get_db_client()

    def log_event(self, event_in: AuditEventCreate) -> AuditEventInDB:
        """Insert an immutable audit event."""
        payload = event_in.model_dump(mode="json", exclude_none=True)
        response = self.client.table("audit_events").insert(payload).execute()
        if not response.data:
            raise RuntimeError("Database error: failed to record audit event")
        return AuditEventInDB(**response.data[0])

    def get_recent(
        self,
        entity_type: Optional[str] = None,
        entity_id: Optional[UUID] = None,
        limit: int = 50,
    ) -> List[AuditEventInDB]:
        """Fetch audit log entries."""
        query = self.client.table("audit_events").select("*")

        if entity_type:
            query = query.eq("entity_type", entity_type)
        if entity_id:
            query = query.eq("entity_id", str(entity_id))

        response = query.order("created_at", desc=True).limit(limit).execute()
        return [AuditEventInDB(**row) for row in (response.data or [])]
