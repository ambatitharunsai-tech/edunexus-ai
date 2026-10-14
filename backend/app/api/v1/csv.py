"""
EduNexus AI — CSV Ingestion & Demo Data Router
Template downloads, row-level validation previews, batch imports, and demo reset.
"""

from typing import Literal, List, Dict, Optional, Any
from fastapi import APIRouter, Response, HTTPException, status, Depends
from pydantic import BaseModel, Field

from app.services.csv_service import (
    csv_service,
    CsvPreviewResponse,
    CsvImportResult,
)
from app.core.auth import AuthenticatedUser, require_staff_user

router = APIRouter()


@router.get(
    "/templates/{data_type}",
    summary="Download Standard CSV Template",
    description="Provides downloadable sample CSV files for students, attendance, or assessments.",
)
async def download_template(data_type: str):
    """Download pre-formatted CSV template."""
    try:
        content = csv_service.get_template(data_type)
        return Response(
            content=content,
            media_type="text/csv",
            headers={"Content-Disposition": f'attachment; filename="edunexus_{data_type}_template.csv"'},
        )
    except ValueError as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))


class CsvPreviewRequest(BaseModel):
    file_content: str = Field(..., description="Raw text content of the CSV file")
    file_name: str = Field(default="upload.csv")
    data_type: str = Field(..., description="Classification: students, attendance, or assessments")


@router.post(
    "/preview",
    response_model=CsvPreviewResponse,
    summary="Preview & Validate CSV Content",
    description="Validates headers, data types, value ranges, and student references. Returns line-numbered errors.",
)
async def preview_csv(
    req: CsvPreviewRequest,
    current_user: AuthenticatedUser = Depends(require_staff_user),
):
    """Validate and preview CSV before committing import."""
    try:
        bytes_content = req.file_content.encode("utf-8")
        return csv_service.validate_and_preview(
            file_bytes=bytes_content,
            file_name=req.file_name,
            data_type=req.data_type,
        )
    except ValueError as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))
    except HTTPException:
        raise
    except Exception:
        raise HTTPException(500, "CSV processing failed")


class CsvImportPayload(BaseModel):
    data_type: str
    rows: Optional[List[Dict[str, str]]] = None
    file_content: Optional[str] = None
    deduplicate_strategy: Literal["skip", "overwrite"] = "skip"


@router.post(
    "/import",
    response_model=CsvImportResult,
    summary="Confirm Batch CSV Ingestion",
    description="Imports validated rows with duplicate suppression and transactional safety.",
)
async def commit_csv_import(
    payload: CsvImportPayload,
    current_user: AuthenticatedUser = Depends(require_staff_user),
):
    """Commit pre-validated CSV rows."""
    try:
        return csv_service.import_rows(
            data_type=payload.data_type,
            rows=payload.rows,
            file_content=payload.file_content,
            actor=current_user,
            deduplicate_strategy=payload.deduplicate_strategy or "skip",
        )
    except HTTPException:
        raise
    except ValueError as exc:
        raise HTTPException(400, str(exc))


@router.post(
    "/reset-demo",
    summary="One-Click Synthetic Demo Dataset Reset",
    description="Restores the verified baseline 36-student synthetic dataset for judges. Safeguarded to never alter production tables.",
)
async def reset_demo_dataset(
    current_user: AuthenticatedUser = Depends(require_staff_user),
):
    """Reset synthetic demo dataset to pristine seed values."""
    return csv_service.reset_synthetic_demo_dataset()
