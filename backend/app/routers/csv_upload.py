"""
EduNexus AI — CSV upload and import router.
Validates CSVs and imports data into Supabase.
"""

import io
import csv
from fastapi import APIRouter, HTTPException, UploadFile, File
from app.config import settings
from app.services.csv_processor import validate_csv, import_csv_data

router = APIRouter()


def _get_supabase():
    from supabase import create_client
    return create_client(settings.SUPABASE_URL, settings.SUPABASE_SERVICE_ROLE_KEY)


@router.post("/upload")
async def upload_csv(file: UploadFile = File(...)):
    """Upload a CSV for validation and preview. Does NOT import yet."""
    if not file.filename or not file.filename.endswith(".csv"):
        raise HTTPException(status_code=400, detail="Only .csv files are accepted")

    # Read file content
    content = await file.read()
    try:
        text = content.decode("utf-8")
    except UnicodeDecodeError:
        raise HTTPException(status_code=400, detail="File must be UTF-8 encoded")

    # Validate
    result = validate_csv(text, file.filename)
    return result


@router.post("/import")
async def import_csv(file: UploadFile = File(...), data_type: str = "students"):
    """Import a validated CSV into the database."""
    if not file.filename or not file.filename.endswith(".csv"):
        raise HTTPException(status_code=400, detail="Only .csv files are accepted")

    content = await file.read()
    try:
        text = content.decode("utf-8")
    except UnicodeDecodeError:
        raise HTTPException(status_code=400, detail="File must be UTF-8 encoded")

    # Validate first
    validation = validate_csv(text, file.filename)
    if validation["errors"] and validation["valid_rows"] == 0:
        raise HTTPException(
            status_code=400,
            detail={
                "message": "CSV has no valid rows",
                "errors": validation["errors"],
            },
        )

    supabase = _get_supabase()
    result = import_csv_data(supabase, text, validation["data_type"])
    return result
