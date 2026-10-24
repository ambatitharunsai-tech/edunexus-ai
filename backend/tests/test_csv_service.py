"""
EduNexus AI — CSV Ingestion & Demo Data Test Suite
Verifies downloadable templates, header validation, line-numbered row errors,
foreign-key reference checks, duplicate suppression, and demo dataset reset.
"""

import pytest


def test_download_templates(client):
    """Verify standard CSV templates can be downloaded."""
    for dt in ("students", "attendance", "assessments"):
        res = client.get(f"/api/v1/csv/templates/{dt}")
        assert res.status_code == 200
        assert "text/csv" in res.headers["content-type"]
        text = res.text
        assert len(text.strip().splitlines()) >= 2  # Has header + sample row


def test_valid_csv_preview(client):
    """Verify clean CSV preview passes validation."""
    csv_content = (
        "student_id,first_name,last_name,email,current_grade,academic_term,section,department\n"
        "STU-991,Aarav,Gupta,aarav.g@edunexus-demo.example,Grade 11,AY 2025-26 Term 1,A,Science & Technology\n"
        "STU-992,Pooja,Nair,pooja.n@edunexus-demo.example,Grade 11,AY 2025-26 Term 1,B,Commerce & Economics\n"
    )
    res = client.post(
        "/api/v1/csv/preview",
        json={"file_content": csv_content, "file_name": "students.csv", "data_type": "students"},
    )
    assert res.status_code == 200
    res_data = res.json()
    assert res_data["can_import"] is True
    assert res_data["valid_rows"] == 2
    assert res_data["failed_rows"] == 0
    assert len(res_data["errors"]) == 0
    assert len(res_data["sample_data"]) == 2


def test_malformed_csv_headers_rejected(client):
    """Verify CSV with missing mandatory headers is rejected."""
    bad_csv = "random_col1,random_col2\nval1,val2\n"
    res = client.post(
        "/api/v1/csv/preview",
        json={"file_content": bad_csv, "file_name": "bad.csv", "data_type": "students"},
    )
    assert res.status_code == 400
    assert "Missing mandatory column headers" in res.json()["error"]["message"]


def test_row_level_validation_errors_with_line_numbers(client):
    """Verify line numbers and error details are accurately flagged."""
    bad_assessments_csv = (
        "student_id,subject,assessment_type,score,max_score,date\n"
        "STU-001,Physics,quiz,105.0,100.0,2026-10-05\n"
        "STU-GHOST,Chemistry,midterm,75.0,100.0,2026-10-05\n"
    )
    res = client.post(
        "/api/v1/csv/preview",
        json={"file_content": bad_assessments_csv, "file_name": "assessments.csv", "data_type": "assessments"},
    )
    assert res.status_code == 200
    res_data = res.json()
    assert res_data["can_import"] is False
    assert len(res_data["errors"]) >= 2

    # Check line 2 error
    err_line2 = next(e for e in res_data["errors"] if e["line"] == 2)
    assert "cannot exceed maximum marks" in err_line2["message"]

    # Check line 3 error
    err_line3 = next(e for e in res_data["errors"] if e["line"] == 3)
    assert "does not exist in student registry" in err_line3["message"]


def test_duplicate_row_detection(client):
    """Verify intra-file duplicates are detected."""
    dupe_csv = (
        "student_id,date,status,remarks\n"
        "STU-001,2026-10-01,present,Session 1\n"
        "STU-001,2026-10-01,present,Duplicate session on same date!\n"
    )
    res = client.post(
        "/api/v1/csv/preview",
        json={"file_content": dupe_csv, "file_name": "attendance.csv", "data_type": "attendance"},
    )
    assert res.status_code == 200
    res_data = res.json()
    assert res_data["can_import"] is False
    assert any("Duplicate entry detected" in e["message"] for e in res_data["errors"])


def test_import_and_deduplicate(client):
    """Verify batch import commits records and deduplicates against existing records."""
    from uuid import uuid4

    new_id = f"STU-{uuid4().hex[:6]}"
    import_payload = {
        "data_type": "students",
        "rows": [
            {
                "student_id": new_id,
                "first_name": "Ravi",
                "last_name": "Kumar",
                "current_grade": "Grade 11",
                "academic_term": "Semester 1",
                "department": "Science & Technology",
            },
            {
                "student_id": "STU-001",  # Existing student in synthetic seed!
                "first_name": "Aarav",
                "last_name": "Sharma",
                "current_grade": "Grade 11",
                "academic_term": "Semester 1",
                "department": "Science & Technology",
            },
        ],
        "deduplicate_strategy": "skip",
    }
    res = client.post("/api/v1/csv/import", json=import_payload)
    assert res.status_code == 200
    data = res.json()
    assert data["imported"] == 1
    assert data["skipped"] == 1


def test_demo_dataset_reset(client):
    """Verify demo reset endpoint restores pristine synthetic seed or blocks in persistent mode."""
    res = client.post("/api/v1/csv/reset-demo")
    if res.status_code == 409:
        assert "disabled in persistent mode" in res.json()["error"]["message"]
    else:
        assert res.status_code == 200
        data = res.json()
        assert data["status"] == "reset_complete"
        assert data["total_students"] >= 30
