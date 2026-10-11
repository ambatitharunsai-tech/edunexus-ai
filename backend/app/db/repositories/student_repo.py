"""
EduNexus AI — Student Repository
Encapsulates all PostgreSQL data-access queries for students.
"""

from typing import List, Optional, Dict, Any
from uuid import UUID
from app.db.client import get_db_client
from app.schemas.student import StudentCreate, StudentUpdate, StudentInDB


class StudentRepository:
    def __init__(self, client=None):
        self._client = client

    @property
    def client(self):
        if self._client is not None:
            return self._client
        return get_db_client()

    def get_all(
        self,
        search: Optional[str] = None,
        grade: Optional[str] = None,
        section: Optional[str] = None,
        status: Optional[str] = None,
        limit: int = 50,
        offset: int = 0,
    ) -> Dict[str, Any]:
        """Fetch students with filtering, search, and pagination."""
        query = self.client.table("students").select("*", count="exact")

        if search:
            query = query.or_(
                f"first_name.ilike.%{search}%,"
                f"last_name.ilike.%{search}%,"
                f"student_id.ilike.%{search}%"
            )
        if grade:
            query = query.eq("current_grade", grade)
        if section:
            query = query.eq("section", section)
        if status:
            query = query.eq("status", status)

        query = query.order("created_at", desc=True).range(offset, offset + limit - 1)
        response = query.execute()

        students = [StudentInDB(**row) for row in (response.data or [])]
        total = response.count if hasattr(response, "count") and response.count is not None else len(students)

        return {"students": students, "total": total}

    def get_by_id(self, student_id: UUID) -> Optional[StudentInDB]:
        """Retrieve single student by primary key UUID."""
        response = self.client.table("students").select("*").eq("id", str(student_id)).limit(1).execute()
        if not response.data:
            return None
        return StudentInDB(**response.data[0])

    def get_by_student_number(self, student_number: str) -> Optional[StudentInDB]:
        """Retrieve single student by institution code (e.g. STU-001)."""
        response = self.client.table("students").select("*").eq("student_id", student_number.strip()).limit(1).execute()
        if not response.data:
            return None
        return StudentInDB(**response.data[0])

    def create(self, student_in: StudentCreate) -> StudentInDB:
        """Create new student record."""
        payload = student_in.model_dump(mode="json", exclude_none=True)
        response = self.client.table("students").insert(payload).execute()
        if not response.data:
            raise RuntimeError("Database error: failed to insert student")
        return StudentInDB(**response.data[0])

    def update(self, student_id: UUID, student_update: StudentUpdate) -> Optional[StudentInDB]:
        """Update existing student record."""
        payload = student_update.model_dump(mode="json", exclude_none=True)
        if not payload:
            return self.get_by_id(student_id)

        response = self.client.table("students").update(payload).eq("id", str(student_id)).execute()
        if not response.data:
            return None
        return StudentInDB(**response.data[0])
