"""
EduNexus AI — Assessment Repository
PostgreSQL data-access operations for student assessment records.
"""

from typing import List, Optional, Dict, Any
from uuid import UUID
from app.db.client import get_db_client
from app.schemas.assessment import AssessmentCreate, AssessmentInDB


class AssessmentRepository:
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
        subject: Optional[str] = None,
        term: Optional[str] = None,
        limit: int = 100,
    ) -> List[AssessmentInDB]:
        """Fetch all assessment records for a student."""
        query = self.client.table("assessments").select("*").eq("student_id", str(student_id))

        if subject:
            query = query.eq("subject", subject)
        if term:
            query = query.eq("term", term)

        response = query.order("assessment_date", desc=True).limit(limit).execute()
        return [AssessmentInDB(**row) for row in (response.data or [])]

    def create(self, assessment_in: AssessmentCreate) -> AssessmentInDB:
        """Create new assessment score record."""
        payload = assessment_in.model_dump(mode="json", exclude_none=True)
        response = self.client.table("assessments").insert(payload).execute()
        if not response.data:
            raise RuntimeError("Database error: failed to record assessment")
        return AssessmentInDB(**response.data[0])

    def create_batch(self, assessments: List[AssessmentCreate]) -> int:
        """Batch insert assessment records."""
        if not assessments:
            return 0
        payloads = [a.model_dump(mode="json", exclude_none=True) for a in assessments]
        response = self.client.table("assessments").insert(payloads).execute()
        return len(response.data or [])

    def get_subject_averages(self, student_id: UUID) -> Dict[str, float]:
        """Compute average percentage score broken down by subject."""
        records = self.get_by_student(student_id)
        if not records:
            return {}

        grouped: Dict[str, List[float]] = {}
        for r in records:
            pct = (r.score / r.max_score) * 100.0
            grouped.setdefault(r.subject, []).append(pct)

        return {
            subj: round(sum(scores) / len(scores), 1)
            for subj, scores in grouped.items()
        }
