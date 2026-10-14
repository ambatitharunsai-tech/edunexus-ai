"""
EduNexus AI — Skills Repository
PostgreSQL data-access operations for student technical and soft skills evaluations.
"""

from typing import List, Optional
from uuid import UUID
from app.db.client import get_db_client
from app.schemas.skills import SkillsCreate, SkillsInDB


class SkillsRepository:
    def __init__(self, client=None):
        self._client = client

    @property
    def client(self):
        if self._client is not None:
            return self._client
        return get_db_client()

    def get_by_student(self, student_id: UUID) -> Optional[SkillsInDB]:
        """Fetch latest skills evaluation for a student."""
        response = (
            self.client.table("skills_records")
            .select("*")
            .eq("student_id", str(student_id))
            .order("last_assessed_date", desc=True)
            .limit(1)
            .execute()
        )
        if response.data:
            return SkillsInDB(**response.data[0])
        return None

    def get_all(self, limit: int = 100) -> List[SkillsInDB]:
        """Fetch all skills records."""
        response = self.client.table("skills_records").select("*").limit(limit).execute()
        return [SkillsInDB(**row) for row in (response.data or [])]

    def create(self, skills_in: SkillsCreate) -> SkillsInDB:
        """Create a new skills record."""
        payload = skills_in.model_dump(mode="json", exclude_none=True)
        response = self.client.table("skills_records").insert(payload).execute()
        if not response.data:
            raise RuntimeError("Database error: failed to create skills record")
        return SkillsInDB(**response.data[0])

    def create_batch(self, records: List[SkillsCreate]) -> int:
        """Batch insert skills records."""
        if not records:
            return 0
        payloads = [r.model_dump(mode="json", exclude_none=True) for r in records]
        response = self.client.table("skills_records").insert(payloads).execute()
        return len(response.data or [])
