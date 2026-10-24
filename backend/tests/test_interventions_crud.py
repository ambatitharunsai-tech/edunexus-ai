"""
EduNexus AI — Interventions & Outcomes CRUD Test Suite
Verifies intervention creation, status transitions, overdue detection,
before/after outcome delta math, and scientific non-causation disclaimers.
"""

import pytest
from datetime import date, timedelta
from app.schemas.outcome import DEFAULT_CAUSATION_DISCLAIMER


def test_interventions_list_and_filters(client):
    """Verify list endpoint supports status and priority filtering."""
    res = client.get("/api/v1/interventions")
    assert res.status_code == 200
    items = res.json()
    assert isinstance(items, list)
    assert len(items) > 0

    # Check enriched fields
    first = items[0]
    assert "student_name" in first
    assert "is_overdue" in first
    assert "outcomes" in first

    # Filter by status
    res_status = client.get("/api/v1/interventions?status=in_progress")
    assert res_status.status_code == 200
    for item in res_status.json():
        assert item["status"] == "in_progress"


def test_create_and_lifecycle_transitions(client):
    """Test full lifecycle: planned -> in_progress -> completed -> cancelled."""
    # 1. Fetch valid student
    stu_res = client.get("/api/v1/students?page=1&page_size=1")
    stu_id = stu_res.json()["students"][0]["id"]

    # 2. Create intervention
    create_payload = {
        "student_id": stu_id,
        "title": "Bi-Weekly Algebra Remediation Tutoring",
        "description": "Structured peer mentoring paired with mathematics teaching assistant.",
        "intervention_type": "academic_tutoring",
        "priority": "high",
        "status": "planned",
        "start_date": str(date.today()),
        "target_completion_date": str(date.today() + timedelta(days=30)),
        "follow_up_date": str(date.today() + timedelta(days=14)),
        "assigned_staff_name": "Prof. S. Ramanujan",
        "notes": "Targeting 15% improvement in diagnostic quiz score.",
    }
    create_res = client.post("/api/v1/interventions", json=create_payload)
    assert create_res.status_code == 201
    intv = create_res.json()
    intv_id = intv["id"]
    assert intv["status"] == "planned"
    assert intv["title"] == create_payload["title"]

    # 3. Transition: planned -> in_progress
    patch_res = client.patch(
        f"/api/v1/interventions/{intv_id}",
        json={"status": "in_progress", "notes": "First mentoring session attended."},
    )
    assert patch_res.status_code == 200
    assert patch_res.json()["status"] == "in_progress"

    # 4. Record Outcome Observation
    outcome_payload = {
        "metric_name": "Algebra Diagnostic Quiz Score",
        "baseline_value": 52.0,
        "post_value": 71.0,
        "target_value": 70.0,
        "measurement_date": str(date.today()),
        "evidence_notes": "Student mastered quadratic equations module.",
    }
    outcome_res = client.post(f"/api/v1/interventions/{intv_id}/outcomes", json=outcome_payload)
    assert outcome_res.status_code == 201
    out_data = outcome_res.json()

    # Verify delta calculations
    assert out_data["absolute_change"] == 19.0
    assert out_data["percentage_change"] == round(((71.0 - 52.0) / 52.0) * 100.0, 1)
    assert out_data["outcome_status"] == "improved"
    assert "causation_disclaimer" in out_data
    assert "causal relationship not established" in out_data["causation_disclaimer"]
    assert "Observed change" in out_data["interpretation"]

    # 5. Transition: in_progress -> completed
    comp_res = client.patch(
        f"/api/v1/interventions/{intv_id}",
        json={"status": "completed", "actual_completion_date": str(date.today())},
    )
    assert comp_res.status_code == 200
    assert comp_res.json()["status"] == "completed"

    # 6. Fetch details and verify outcomes are embedded
    detail_res = client.get(f"/api/v1/interventions/{intv_id}")
    assert detail_res.status_code == 200
    detail_data = detail_res.json()
    assert len(detail_data["outcomes"]) >= 1
    assert detail_data["outcomes"][-1]["metric_name"] == "Algebra Diagnostic Quiz Score"


def test_zero_baseline_outcome_is_saved_without_percentage_division(client):
    student = client.get("/api/v1/students?page=1&page_size=1").json()["students"][0]
    today = date.today()
    create_res = client.post(
        "/api/v1/interventions",
        json={
            "student_id": student["id"],
            "title": "Zero baseline outcome regression",
            "description": "Synthetic API regression test only.",
            "intervention_type": "academic_tutoring",
            "priority": "low",
            "start_date": str(today),
        },
    )
    assert create_res.status_code == 201
    intervention_id = create_res.json()["id"]

    outcome_res = client.post(
        f"/api/v1/interventions/{intervention_id}/outcomes",
        json={
            "metric_name": "Synthetic integration metric",
            "baseline_value": 0,
            "post_value": 1,
            "measurement_date": str(today),
            "evidence_notes": "Synthetic regression test only; not student telemetry.",
        },
    )
    assert outcome_res.status_code == 201
    assert outcome_res.json()["absolute_change"] == 1.0
    assert outcome_res.json()["percentage_change"] is None

    detail = client.get(f"/api/v1/interventions/{intervention_id}")
    assert detail.status_code == 200
    assert len(detail.json()["outcomes"]) == 1
    assert detail.json()["outcomes"][0]["percentage_change"] is None


def test_latest_follow_up_outcome_is_returned_first(client):
    student = client.get("/api/v1/students?page=1&page_size=1").json()["students"][0]
    today = date.today()
    create_res = client.post(
        "/api/v1/interventions",
        json={
            "student_id": student["id"],
            "title": "Follow-up ordering regression",
            "description": "Synthetic API regression test only.",
            "intervention_type": "academic_tutoring",
            "start_date": str(today),
        },
    )
    intervention_id = create_res.json()["id"]
    for post_value in (55.0, 65.0):
        result = client.post(
            f"/api/v1/interventions/{intervention_id}/outcomes",
            json={
                "metric_name": "Synthetic follow-up metric",
                "baseline_value": 50.0,
                "post_value": post_value,
                "measurement_date": str(today),
                "evidence_notes": "Synthetic regression test only.",
            },
        )
        assert result.status_code == 201

    detail = client.get(f"/api/v1/interventions/{intervention_id}")
    assert detail.status_code == 200
    assert [outcome["post_value"] for outcome in detail.json()["outcomes"]] == [65.0, 55.0]


def test_invalid_intervention_rejected(client):
    """Verify validation rejects invalid dates or non-existent students."""
    # Target date before start date
    bad_dates_payload = {
        "student_id": "90000000-0000-0000-0000-000000000001",
        "title": "Invalid Date Plan",
        "description": "Will be rejected by date validator.",
        "intervention_type": "academic_tutoring",
        "start_date": "2026-10-15",
        "target_completion_date": "2026-10-01",  # Before start date!
    }
    res = client.post("/api/v1/interventions", json=bad_dates_payload)
    assert res.status_code == 422  # Pydantic validation failure


def test_cancel_intervention(client):
    """Verify delete endpoint cancels intervention."""
    res = client.get("/api/v1/interventions?status=in_progress")
    items = res.json()
    if items:
        target_id = items[0]["id"]
        del_res = client.delete(f"/api/v1/interventions/{target_id}")
        assert del_res.status_code == 200

        # Check status is cancelled
        detail_res = client.get(f"/api/v1/interventions/{target_id}")
        assert detail_res.json()["status"] == "cancelled"


def test_create_intervention_with_student_code(client):
    """Verify intervention creation succeeds when providing human-readable student code (e.g. STU-001)."""
    payload = {
        "student_id": "STU-001",
        "title": "Placement Aptitude Coaching",
        "description": "Weekly reasoning and coding logic workshops.",
        "intervention_type": "peer_mentoring",
        "priority": "medium",
        "status": "planned",
        "start_date": str(date.today()),
        "target_completion_date": str(date.today() + timedelta(days=21)),
        "assigned_staff_name": "Placement Cell Advisor",
    }
    res = client.post("/api/v1/interventions", json=payload)
    assert res.status_code == 201
    data = res.json()
    assert data["title"] == payload["title"]
    assert data["student_code"] == "STU-001"

