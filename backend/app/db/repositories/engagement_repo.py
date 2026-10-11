"""
EduNexus AI — Engagement Event Repository
PostgreSQL data-access operations for student engagement events and LMS activities.
"""

from typing import List, Optional
from uuid import UUID
from app.db.client import get_db_client
from app.schemas.engagement import EngagementEventCreate, EngagementEventInDB


class EngagementRepository:
    def __init__(self, client=None):
        self._client = client

    @property
    def client(self):
        if self._client is not None:
            return self._client
        return get_db_client()

    def get_by_student(
        self,
        student_id: UUID,
        event_type: Optional[str] = None,
        limit: int = 50,
    ) -> List[EngagementEventInDB]:
        """Fetch engagement events for a student ordered chronologically."""
        query = self.client.table("engagement_events").select("*").eq("student_id", str(student_id))

        if event_type:
            query = query.eq("event_type", event_type)

        response = query.order("event_timestamp", desc=True).limit(limit).execute()
        return [EngagementEventInDB(**row) for row in (response.data or [])]

    def create(self, event_in: EngagementEventCreate) -> EngagementEventInDB:
        """Log a new engagement event."""
        payload = event_in.model_dump(mode="json", exclude_none=True)
        response = self.client.table("engagement_events").insert(payload).execute()
        if not response.data:
            raise RuntimeError("Database error: failed to log engagement event")
        return EngagementEventInDB(**response.data[0])

    def create_batch(self, events: List[EngagementEventCreate]) -> int:
        """Batch insert engagement events."""
        if not events:
            return 0
        payloads = [e.model_dump(mode="json", exclude_none=True) for e in events]
        response = self.client.table("engagement_events").insert(payloads).execute()
        return len(response.data or [])
