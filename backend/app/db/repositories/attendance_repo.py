"""
EduNexus AI — Attendance Repository
PostgreSQL data-access operations for student attendance records.
"""

from datetime import date
from typing import List, Optional
from uuid import UUID
from app.db.client import get_db_client
from app.schemas.attendance import AttendanceCreate, AttendanceInDB, AttendanceSummary


class AttendanceRepository:
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
        limit: int = 100,
        start_date: Optional[date] = None,
    ) -> List[AttendanceInDB]:
        """Fetch attendance history for a student ordered by session_date descending."""
        query = self.client.table("attendance").select("*").eq("student_id", str(student_id))

        if start_date:
            query = query.gte("session_date", str(start_date))

        response = query.order("session_date", desc=True).limit(limit).execute()
        return [AttendanceInDB(**row) for row in (response.data or [])]

    def create(self, attendance_in: AttendanceCreate) -> AttendanceInDB:
        """Record a single attendance session."""
        payload = attendance_in.model_dump(mode="json", exclude_none=True)
        response = self.client.table("attendance").insert(payload).execute()
        if not response.data:
            raise RuntimeError("Database error: failed to record attendance")
        return AttendanceInDB(**response.data[0])

    def create_batch(self, records: List[AttendanceCreate]) -> int:
        """Batch insert attendance rows."""
        if not records:
            return 0
        payloads = [r.model_dump(mode="json", exclude_none=True) for r in records]
        response = self.client.table("attendance").upsert(
            payloads, on_conflict="student_id,session_date,period"
        ).execute()
        return len(response.data or [])

    def get_summary(self, student_id: UUID) -> AttendanceSummary:
        """Compute attendance summary metrics for a student."""
        records = self.get_by_student(student_id, limit=365)
        total = len(records)
        if total == 0:
            return AttendanceSummary(
                student_id=student_id,
                total_sessions=0,
                present_count=0,
                late_count=0,
                absent_count=0,
                excused_count=0,
                attendance_rate=100.0,
            )

        present = sum(1 for r in records if r.status == "present")
        late = sum(1 for r in records if r.status == "late")
        absent = sum(1 for r in records if r.status == "absent")
        excused = sum(1 for r in records if r.status == "excused")

        # Punctual attendance includes present and late
        attended = present + late
        rate = round((attended / total) * 100, 1)

        return AttendanceSummary(
            student_id=student_id,
            total_sessions=total,
            present_count=present,
            late_count=late,
            absent_count=absent,
            excused_count=excused,
            attendance_rate=rate,
        )
