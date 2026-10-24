"""
EduNexus AI — Feedback Repository
PostgreSQL data-access operations for student satisfaction and faculty feedback.
"""

from typing import List, Optional
from uuid import UUID
from app.db.client import get_db_client
from app.schemas.feedback import FeedbackCreate, FeedbackInDB


class FeedbackRepository:
    def __init__(self, client=None):
        self._client = client

    @property
    def client(self):
        if self._client is not None:
            return self._client
        return get_db_client()

    def get_by_student(self, student_id: UUID) -> Optional[FeedbackInDB]:
        """Fetch latest feedback evaluation for a student."""
        response = (
            self.client.table("feedback_records")
            .select("*")
            .eq("student_id", str(student_id))
            .order("recorded_at", desc=True)
            .limit(1)
            .execute()
        )
        if response.data:
            return FeedbackInDB(**response.data[0])
        return None

    def get_all(self, limit: int = 100) -> List[FeedbackInDB]:
        """Fetch all feedback records."""
        response = self.client.table("feedback_records").select("*").limit(limit).execute()
        return [FeedbackInDB(**row) for row in (response.data or [])]

    def create(self, feedback_in: FeedbackCreate) -> FeedbackInDB:
        """Create a new feedback record."""
        payload = feedback_in.model_dump(mode="json", exclude_none=True)
        response = self.client.table("feedback_records").insert(payload).execute()
        if not response.data:
            raise RuntimeError("Database error: failed to create feedback record")
        return FeedbackInDB(**response.data[0])

    def create_batch(self, records: List[FeedbackCreate]) -> int:
        """Batch insert feedback records."""
        if not records:
            return 0
        payloads = [r.model_dump(mode="json", exclude_none=True) for r in records]
        response = self.client.table("feedback_records").insert(payloads).execute()
        return len(response.data or [])
