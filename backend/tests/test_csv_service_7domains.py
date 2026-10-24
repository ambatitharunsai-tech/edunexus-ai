"""
EduNexus AI — 7-Domain CSV Ingestion Test Suite
Verifies downloadable templates, schema validation, boundary enforcement,
deduplication, and demo reset across all 7 KPMG analytical domains:
1. Students
2. Attendance
3. Assessments
4. Placement
5. Skills
6. Feedback
7. LMS
"""

import pytest


def test_download_all_7_templates(client):
    """Verify all 7 standard CSV domain templates can be downloaded."""
    domains = [
        "students",
        "attendance",
        "assessments",
        "placement",
        "skills",
        "feedback",
        "lms",
    ]
    for domain in domains:
        res = client.get(f"/api/v1/csv/templates/{domain}")
        assert res.status_code == 200, f"Failed for {domain}: {res.text}"
        assert "text/csv" in res.headers["content-type"]
        lines = res.text.strip().splitlines()
        assert len(lines) >= 2, f"Template for {domain} must have at least header + 1 sample row"


def test_placement_csv_preview_valid_and_invalid(client):
    """Verify placement CSV preview validates range [0, 100] and foreign keys."""
    valid_csv = (
        "student_id,aptitude_score,coding_score,mock_interview_score,resume_score,readiness_tier,mock_interviews_attended\n"
        "STU-001,75.0,82.0,80.0,85.0,placement_ready,3\n"
    )
    res = client.post(
        "/api/v1/csv/preview",
        json={"file_content": valid_csv, "file_name": "placement.csv", "data_type": "placement"},
    )
    assert res.status_code == 200
    data = res.json()
    assert data["can_import"] is True
    assert data["valid_rows"] == 1
    assert data["failed_rows"] == 0

    # Invalid: aptitude > 100 and nonexistent student
    invalid_csv = (
        "student_id,aptitude_score,coding_score,mock_interview_score,resume_score,readiness_tier,mock_interviews_attended\n"
        "STU-001,150.0,82.0,80.0,85.0,placement_ready,3\n"
        "STU-UNKNOWN,75.0,82.0,80.0,85.0,placement_ready,3\n"
    )
    res_inv = client.post(
        "/api/v1/csv/preview",
        json={"file_content": invalid_csv, "file_name": "placement.csv", "data_type": "placement"},
    )
    assert res_inv.status_code == 200
    inv_data = res_inv.json()
    assert inv_data["can_import"] is False
    assert inv_data["failed_rows"] >= 2
    err_msgs = [e["message"] for e in inv_data["errors"]]
    assert any("between 0 and 100" in m for m in err_msgs)
    assert any("does not exist in student registry" in m for m in err_msgs)


def test_skills_csv_preview_valid_and_invalid(client):
    """Verify skills CSV preview validates scores and format."""
    valid_csv = (
        "student_id,technical_score,soft_skills_score,certifications_count,verified_skills\n"
        "STU-002,88.0,90.0,3,Python;AWS;FastAPI\n"
    )
    res = client.post(
        "/api/v1/csv/preview",
        json={"file_content": valid_csv, "file_name": "skills.csv", "data_type": "skills"},
    )
    assert res.status_code == 200
    data = res.json()
    assert data["can_import"] is True
    assert data["valid_rows"] == 1

    # Invalid: negative certifications count
    invalid_csv = (
        "student_id,technical_score,soft_skills_score,certifications_count,verified_skills\n"
        "STU-002,88.0,90.0,-2,Python;AWS\n"
    )
    res_inv = client.post(
        "/api/v1/csv/preview",
        json={"file_content": invalid_csv, "file_name": "skills.csv", "data_type": "skills"},
    )
    assert res_inv.status_code == 200
    inv_data = res_inv.json()
    assert inv_data["can_import"] is False
    assert any("cannot be negative" in e["message"] for e in inv_data["errors"])


def test_feedback_csv_preview_valid_and_invalid(client):
    """Verify feedback CSV preview validates sentiment bounds [0, 100]."""
    valid_csv = (
        "student_id,faculty_sentiment,student_satisfaction,academic_term,mentor_notes\n"
        "STU-001,80.0,85.0,AY 2025-26 Term 1,Good lab work\n"
    )
    res = client.post(
        "/api/v1/csv/preview",
        json={"file_content": valid_csv, "file_name": "feedback.csv", "data_type": "feedback"},
    )
    assert res.status_code == 200
    data = res.json()
    assert data["can_import"] is True

    # Invalid: sentiment out of bounds
    invalid_csv = (
        "student_id,faculty_sentiment,student_satisfaction,academic_term,mentor_notes\n"
        "STU-001,-5.0,85.0,AY 2025-26 Term 1,Note\n"
    )
    res_inv = client.post(
        "/api/v1/csv/preview",
        json={"file_content": invalid_csv, "file_name": "feedback.csv", "data_type": "feedback"},
    )
    assert res_inv.status_code == 200
    inv_data = res_inv.json()
    assert inv_data["can_import"] is False
    assert any("between 0 and 100" in e["message"] for e in inv_data["errors"])


def test_lms_csv_preview_valid_and_invalid(client):
    """Verify LMS CSV preview validates module completion and submission percentages."""
    valid_csv = (
        "student_id,weekly_login_count,module_completion_pct,assignments_submitted_pct,forum_posts_count\n"
        "STU-001,10,85.0,90.0,4\n"
    )
    res = client.post(
        "/api/v1/csv/preview",
        json={"file_content": valid_csv, "file_name": "lms.csv", "data_type": "lms"},
    )
    assert res.status_code == 200
    data = res.json()
    assert data["can_import"] is True

    # Invalid: module completion > 100
    invalid_csv = (
        "student_id,weekly_login_count,module_completion_pct,assignments_submitted_pct,forum_posts_count\n"
        "STU-001,10,120.0,90.0,4\n"
    )
    res_inv = client.post(
        "/api/v1/csv/preview",
        json={"file_content": invalid_csv, "file_name": "lms.csv", "data_type": "lms"},
    )
    assert res_inv.status_code == 200
    inv_data = res_inv.json()
    assert inv_data["can_import"] is False
    assert any("between 0 and 100" in e["message"] for e in inv_data["errors"])


def test_csv_import_placement_and_skills(client):
    """Verify batch import commits records across new domains."""
    import_payload = {
        "data_type": "placement",
        "rows": [
            {
                "student_id": "STU-003",
                "aptitude_score": "70.0",
                "coding_score": "65.0",
                "mock_interview_score": "68.0",
                "resume_score": "75.0",
                "readiness_tier": "developing",
                "mock_interviews_attended": "1",
            }
        ],
        "deduplicate_strategy": "overwrite",
    }
    res = client.post("/api/v1/csv/import", json=import_payload)
    assert res.status_code == 200
    data = res.json()
    assert data["status"] == "success"
    assert data["imported"] == 1


def test_demo_reset_includes_all_7domain_counts(client):
    """Verify demo reset returns verified counts for all 7 analytical domains or blocks in persistent mode."""
    res = client.post("/api/v1/csv/reset-demo")
    if res.status_code == 409:
        assert "disabled in persistent mode" in res.json()["error"]["message"]
    else:
        assert res.status_code == 200
        data = res.json()
        assert data["status"] == "reset_complete"
        assert data["total_students"] >= 30
        assert "attendance_records" in data
        assert "assessment_records" in data
        assert "placement_records" in data
        assert "skills_records" in data
        assert "feedback_records" in data
        assert "lms_records" in data
        assert data["placement_records"] >= 5
        assert data["skills_records"] >= 5
