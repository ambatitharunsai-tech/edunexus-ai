"""
EduNexus AI — LMS Activity Repository
PostgreSQL data-access operations for student digital learning activity.
"""

from typing import List, Optional
from uuid import UUID
from app.db.client import get_db_client
from app.schemas.lms import LMSActivityCreate, LMSActivityInDB


class LMSRepository:
    def __init__(self, client=None):
        self._client = client

    @property
    def client(self):
        if self._client is not None:
            return self._client
        return get_db_client()

    def get_by_student(self, student_id: UUID) -> Optional[LMSActivityInDB]:
        """Fetch latest LMS telemetry for a student."""
        response = (
            self.client.table("lms_activity_records")
            .select("*")
            .eq("student_id", str(student_id))
            .order("recorded_at", desc=True)
            .limit(1)
            .execute()
        )
        if response.data:
            return LMSActivityInDB(**response.data[0])
        return None

    def get_all(self, limit: int = 100) -> List[LMSActivityInDB]:
        """Fetch all LMS activity records."""
        response = self.client.table("lms_activity_records").select("*").limit(limit).execute()
        return [LMSActivityInDB(**row) for row in (response.data or [])]

    def create(self, lms_in: LMSActivityCreate) -> LMSActivityInDB:
        """Create a new LMS activity record."""
        payload = lms_in.model_dump(mode="json", exclude_none=True)
        response = self.client.table("lms_activity_records").insert(payload).execute()
        if not response.data:
            raise RuntimeError("Database error: failed to create LMS record")
        return LMSActivityInDB(**response.data[0])

    def create_batch(self, records: List[LMSActivityCreate]) -> int:
        """Batch insert LMS activity records."""
        if not records:
            return 0
        payloads = [r.model_dump(mode="json", exclude_none=True) for r in records]
        response = self.client.table("lms_activity_records").insert(payloads).execute()
        return len(response.data or [])
