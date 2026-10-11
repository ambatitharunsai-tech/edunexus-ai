"""
EduNexus AI — Audit Event Schemas
Pydantic validation models for compliance and audit trail records.
"""

from datetime import datetime
from typing import Optional, Literal, Dict, Any
from uuid import UUID
from pydantic import BaseModel, Field, ConfigDict


AuditAction = Literal[
    'CREATE',
    'UPDATE',
    'DELETE',
    'VIEW',
    'INTERVENTION_STATUS_CHANGE',
    'FLAG_REVIEW',
]


class AuditEventBase(BaseModel):
    entity_type: str = Field(..., min_length=2, max_length=50, description="e.g. student, intervention, assessment")
    entity_id: UUID = Field(..., description="UUID of the modified or inspected entity")
    action: AuditAction = Field(..., description="Action classification")
    performed_by: Optional[UUID] = None
    performed_by_name: Optional[str] = None
    details: Dict[str, Any] = Field(default_factory=dict, description="Metadata or field diff dictionary")
    ip_address: Optional[str] = None


class AuditEventCreate(AuditEventBase):
    """Payload to log an audit trail event."""
    pass


class AuditEventInDB(AuditEventBase):
    id: UUID
    created_at: datetime
    model_config = ConfigDict(from_attributes=True)
