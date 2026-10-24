"""
EduNexus AI — Intervention Repository
PostgreSQL data-access operations for student support plans and outcome tracking.
"""

from typing import List, Optional
from uuid import UUID
from app.db.client import get_db_client
from app.schemas.intervention import (
    InterventionCreate,
    InterventionUpdate,
    InterventionInDB,
    InterventionWithOutcomes,
)
from app.schemas.outcome import OutcomeCreate, OutcomeInDB


class InterventionRepository:
    def __init__(self, client=None):
        self._client = client

    @property
    def client(self):
        if self._client is not None:
            return self._client
        return get_db_client()

    def get_all(
        self,
        student_id: Optional[UUID] = None,
        status: Optional[str] = None,
        priority: Optional[str] = None,
        limit: int = 50,
    ) -> List[InterventionInDB]:
        """Fetch interventions with optional filters."""
        query = self.client.table("interventions").select("*")

        if student_id:
            query = query.eq("student_id", str(student_id))
        if status:
            query = query.eq("status", status)
        if priority:
            query = query.eq("priority", priority)

        response = query.order("created_at", desc=True).limit(limit).execute()
        return [InterventionInDB(**row) for row in (response.data or [])]

    def get_by_id(self, intervention_id: UUID) -> Optional[InterventionWithOutcomes]:
        """Fetch a single intervention along with its measured outcomes."""
        int_resp = (
            self.client.table("interventions")
            .select("*")
            .eq("id", str(intervention_id))
            .limit(1)
            .execute()
        )
        if not int_resp.data:
            return None

        int_row = int_resp.data[0]

        # Fetch associated outcomes
        out_resp = (
            self.client.table("intervention_outcomes")
            .select("*")
            .eq("intervention_id", str(intervention_id))
            .order("measurement_date", desc=True)
            .execute()
        )
        outcomes = [OutcomeInDB(**row) for row in (out_resp.data or [])]

        return InterventionWithOutcomes(**int_row, outcomes=outcomes)

    def create(self, intervention_in: InterventionCreate) -> InterventionInDB:
        """Create a new intervention plan."""
        payload = intervention_in.model_dump(mode="json", exclude_none=True)
        response = self.client.table("interventions").insert(payload).execute()
        if not response.data:
            raise RuntimeError("Database error: failed to create intervention")
        return InterventionInDB(**response.data[0])

    def update(
        self, intervention_id: UUID, update_in: InterventionUpdate
    ) -> Optional[InterventionInDB]:
        """Update an existing intervention status or notes."""
        payload = update_in.model_dump(mode="json", exclude_none=True)
        if not payload:
            raw = self.client.table("interventions").select("*").eq("id", str(intervention_id)).limit(1).execute()
            return InterventionInDB(**raw.data[0]) if raw.data else None

        response = (
            self.client.table("interventions")
            .update(payload)
            .eq("id", str(intervention_id))
            .execute()
        )
        if not response.data:
            return None
        return InterventionInDB(**response.data[0])

    def record_outcome(self, outcome_in: OutcomeCreate) -> OutcomeInDB:
        """Record a before/after outcome observation."""
        payload = outcome_in.model_dump(mode="json", exclude_none=True)
        response = self.client.table("intervention_outcomes").insert(payload).execute()
        if not response.data:
            raise RuntimeError("Database error: failed to record intervention outcome")
        return OutcomeInDB(**response.data[0])

    def get_outcomes_by_intervention(self, intervention_id: UUID) -> List[OutcomeInDB]:
        """Fetch all outcome measurements for an intervention."""
        response = (
            self.client.table("intervention_outcomes")
            .select("*")
            .eq("intervention_id", str(intervention_id))
            .order("measurement_date", desc=True)
            .execute()
        )
        return [OutcomeInDB(**row) for row in (response.data or [])]
