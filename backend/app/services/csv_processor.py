"""
EduNexus AI — CSV processor.
Validates and imports CSV data for students, attendance, and assessments.
"""

import csv
import io
from datetime import date, datetime

# Expected columns for each data type
EXPECTED_COLUMNS = {
    "students": {
        "required": ["student_id", "first_name", "last_name", "grade"],
        "optional": ["email", "section", "enrollment_date", "status"],
    },
    "attendance": {
        "required": ["student_id", "date", "status"],
        "optional": [],
    },
    "assessments": {
        "required": ["student_id", "subject", "assessment_type", "score", "max_score", "date"],
        "optional": [],
    },
}

VALID_ATTENDANCE_STATUSES = {"present", "absent", "late", "excused"}
VALID_STUDENT_STATUSES = {"active", "inactive", "graduated", "transferred"}


def _detect_data_type(headers: list[str]) -> str:
    """Detect the data type from column headers."""
    headers_set = set(h.strip().lower() for h in headers)

    if "subject" in headers_set and "score" in headers_set:
        return "assessments"
    if "status" in headers_set and "date" in headers_set and "subject" not in headers_set:
        return "attendance"
    if "first_name" in headers_set or "last_name" in headers_set:
        return "students"

    # Default guess
    return "students"


def _validate_date(value: str) -> bool:
    """Check if a string is a valid date (YYYY-MM-DD)."""
    try:
        datetime.strptime(value.strip(), "%Y-%m-%d")
        return True
    except ValueError:
        return False


def _validate_number(value: str) -> bool:
    """Check if a string is a valid number."""
    try:
        float(value.strip())
        return True
    except ValueError:
        return False


def validate_csv(text: str, filename: str) -> dict:
    """
    Validate a CSV file and return a preview with errors.
    Does NOT import data.
    """
    errors = []
    valid_rows = 0
    sample_data = []

    reader = csv.DictReader(io.StringIO(text))
    headers = reader.fieldnames or []

    if not headers:
        return {
            "file_name": filename,
            "data_type": "unknown",
            "total_rows": 0,
            "valid_rows": 0,
            "errors": [{"row": 0, "column": "", "message": "CSV file is empty or has no headers"}],
            "sample_data": [],
        }

    # Normalize headers
    normalized_headers = [h.strip().lower() for h in headers]
    data_type = _detect_data_type(normalized_headers)

    # Check required columns
    expected = EXPECTED_COLUMNS.get(data_type, EXPECTED_COLUMNS["students"])
    missing_cols = [col for col in expected["required"] if col not in normalized_headers]
    if missing_cols:
        errors.append({
            "row": 0,
            "column": ", ".join(missing_cols),
            "message": f"Missing required column(s): {', '.join(missing_cols)}. "
                       f"Expected columns for {data_type}: {', '.join(expected['required'])}",
        })
        return {
            "file_name": filename,
            "data_type": data_type,
            "total_rows": 0,
            "valid_rows": 0,
            "errors": errors,
            "sample_data": [],
        }

    # Validate each row
    rows = list(csv.DictReader(io.StringIO(text)))
    total_rows = len(rows)

    for i, row in enumerate(rows, start=2):  # Row 2 = first data row (after header)
        # Normalize row keys
        normalized_row = {k.strip().lower(): v.strip() if v else "" for k, v in row.items()}
        row_valid = True

        # Check required fields are non-empty
        for col in expected["required"]:
            if not normalized_row.get(col):
                errors.append({
                    "row": i,
                    "column": col,
                    "message": f"'{col}' is required but empty",
                })
                row_valid = False

        # Type-specific validation
        if data_type == "students":
            if normalized_row.get("status") and normalized_row["status"] not in VALID_STUDENT_STATUSES:
                errors.append({
                    "row": i,
                    "column": "status",
                    "message": f"Invalid status '{normalized_row['status']}'. "
                               f"Must be one of: {', '.join(VALID_STUDENT_STATUSES)}",
                })
                row_valid = False
            if normalized_row.get("enrollment_date") and not _validate_date(normalized_row["enrollment_date"]):
                errors.append({
                    "row": i,
                    "column": "enrollment_date",
                    "message": f"Invalid date '{normalized_row['enrollment_date']}'. Use YYYY-MM-DD format.",
                })
                row_valid = False

        elif data_type == "attendance":
            if normalized_row.get("date") and not _validate_date(normalized_row["date"]):
                errors.append({
                    "row": i,
                    "column": "date",
                    "message": f"Invalid date '{normalized_row['date']}'. Use YYYY-MM-DD format.",
                })
                row_valid = False
            if normalized_row.get("status") and normalized_row["status"] not in VALID_ATTENDANCE_STATUSES:
                errors.append({
                    "row": i,
                    "column": "status",
                    "message": f"Invalid status '{normalized_row['status']}'. "
                               f"Must be one of: {', '.join(VALID_ATTENDANCE_STATUSES)}",
                })
                row_valid = False

        elif data_type == "assessments":
            if normalized_row.get("date") and not _validate_date(normalized_row["date"]):
                errors.append({
                    "row": i,
                    "column": "date",
                    "message": f"Invalid date '{normalized_row['date']}'. Use YYYY-MM-DD format.",
                })
                row_valid = False
            for num_col in ("score", "max_score"):
                if normalized_row.get(num_col) and not _validate_number(normalized_row[num_col]):
                    errors.append({
                        "row": i,
                        "column": num_col,
                        "message": f"'{num_col}' must be a number, got '{normalized_row[num_col]}'",
                    })
                    row_valid = False

        if row_valid:
            valid_rows += 1
            if len(sample_data) < 5:
                sample_data.append(normalized_row)

    return {
        "file_name": filename,
        "data_type": data_type,
        "total_rows": total_rows,
        "valid_rows": valid_rows,
        "errors": errors[:50],  # Limit errors to first 50
        "sample_data": sample_data,
    }


def import_csv_data(supabase, text: str, data_type: str) -> dict:
    """Import validated CSV data into Supabase."""
    rows = list(csv.DictReader(io.StringIO(text)))
    imported = 0
    skipped = 0
    errors = []

    for i, row in enumerate(rows, start=2):
        normalized = {k.strip().lower(): v.strip() if v else "" for k, v in row.items()}

        try:
            if data_type == "students":
                data = {
                    "student_id": normalized["student_id"],
                    "first_name": normalized["first_name"],
                    "last_name": normalized["last_name"],
                    "grade": normalized["grade"],
                    "email": normalized.get("email") or None,
                    "section": normalized.get("section") or None,
                    "enrollment_date": normalized.get("enrollment_date") or str(date.today()),
                    "status": normalized.get("status") or "active",
                }
                supabase.table("students").upsert(
                    data, on_conflict="student_id"
                ).execute()

            elif data_type == "attendance":
                # Look up student UUID from student_id text
                student = (
                    supabase.table("students")
                    .select("id")
                    .eq("student_id", normalized["student_id"])
                    .execute()
                )
                if not student.data:
                    errors.append({
                        "row": i,
                        "column": "student_id",
                        "message": f"Student '{normalized['student_id']}' not found in database",
                    })
                    skipped += 1
                    continue

                data = {
                    "student_id": student.data[0]["id"],
                    "date": normalized["date"],
                    "status": normalized["status"],
                }
                supabase.table("attendance").upsert(
                    data, on_conflict="student_id,date"
                ).execute()

            elif data_type == "assessments":
                student = (
                    supabase.table("students")
                    .select("id")
                    .eq("student_id", normalized["student_id"])
                    .execute()
                )
                if not student.data:
                    errors.append({
                        "row": i,
                        "column": "student_id",
                        "message": f"Student '{normalized['student_id']}' not found in database",
                    })
                    skipped += 1
                    continue

                data = {
                    "student_id": student.data[0]["id"],
                    "subject": normalized["subject"],
                    "assessment_type": normalized["assessment_type"],
                    "score": float(normalized["score"]),
                    "max_score": float(normalized["max_score"]),
                    "date": normalized["date"],
                }
                supabase.table("assessments").insert(data).execute()

            imported += 1

        except Exception as e:
            errors.append({
                "row": i,
                "column": "",
                "message": str(e),
            })
            skipped += 1

    return {
        "imported": imported,
        "skipped": skipped,
        "errors": errors[:50],
    }
