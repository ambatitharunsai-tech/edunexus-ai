"""
EduNexus AI — Placement Repository
PostgreSQL data-access operations for campus placement readiness records.
"""

from typing import List, Optional
from uuid import UUID
from app.db.client import get_db_client
from app.schemas.placement import PlacementCreate, PlacementInDB


class PlacementRepository:
    def __init__(self, client=None):
        self._client = client

    @property
    def client(self):
        if self._client is not None:
            return self._client
        return get_db_client()

    def get_by_student(self, student_id: UUID) -> Optional[PlacementInDB]:
        """Fetch latest placement evaluation for a student."""
        response = (
            self.client.table("placement_records")
            .select("*")
            .eq("student_id", str(student_id))
            .order("evaluated_at", desc=True)
            .limit(1)
            .execute()
        )
        if response.data:
            return PlacementInDB(**response.data[0])
        return None

    def get_all(self, limit: int = 100) -> List[PlacementInDB]:
        """Fetch all placement records."""
        response = self.client.table("placement_records").select("*").limit(limit).execute()
        return [PlacementInDB(**row) for row in (response.data or [])]

    def create(self, placement_in: PlacementCreate) -> PlacementInDB:
        """Create a new placement record."""
        payload = placement_in.model_dump(mode="json", exclude_none=True)
        response = self.client.table("placement_records").insert(payload).execute()
        if not response.data:
            raise RuntimeError("Database error: failed to create placement record")
        return PlacementInDB(**response.data[0])

    def create_batch(self, records: List[PlacementCreate]) -> int:
        """Batch insert placement records."""
        if not records:
            return 0
        payloads = [r.model_dump(mode="json", exclude_none=True) for r in records]
        response = self.client.table("placement_records").insert(payloads).execute()
        return len(response.data or [])
