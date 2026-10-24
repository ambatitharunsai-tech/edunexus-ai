"""
EduNexus AI — Risk Engine Unit & API Tests
Verifies deterministic calculation, boundary conditions, ethical missing data handling,
configuration invariants, and human advisor overrides.
"""

import pytest
from pydantic import ValidationError
from app.core.risk_config import RiskEngineConfig, default_risk_config
from app.services.risk_engine import RiskEngine, RiskExplanationResponse


def test_config_weights_must_sum_to_one():
    """Verify weights summing invariant."""
    with pytest.raises(ValidationError):
        RiskEngineConfig(attendance_weight=0.5, academic_weight=0.5, engagement_weight=0.2)


def test_config_threshold_invariants():
    """Verify critical threshold cannot exceed benchmark."""
    with pytest.raises(ValidationError):
        RiskEngineConfig(attendance_benchmark=75.0, attendance_critical_threshold=80.0)


@pytest.mark.parametrize(
    ("score", "tier"),
    [(24.9, "low"), (25.0, "moderate"), (44.9, "moderate"),
     (45.0, "high"), (69.9, "high"), (70.0, "critical")],
)
def test_risk_tier_boundaries(score, tier):
    assert default_risk_config.classify_risk_tier(score) == tier


def test_boundary_perfect_metrics():
    """Student with 100% attendance, 100% scores, and high engagement should be Low priority."""
    engine = RiskEngine()
    att = [{"date": f"2026-09-0{i}", "status": "present"} for i in range(1, 9)]
    ass = [{"date": f"2026-09-1{i}", "score": 100, "max_score": 100} for i in range(1, 5)]
    eng = [{"date": f"2026-09-2{i}", "activity_type": "lms"} for i in range(1, 9)]

    res = engine.compute_student_risk(
        student_id="test-stu-perfect",
        attendance_records=att,
        assessment_records=ass,
        engagement_records=eng,
    )

    assert res.composite_risk_score == 0.0
    assert res.support_priority_tier == "low"
    assert res.requires_human_review is False
    assert len(res.contributing_factors) == 3
    assert res.contributing_factors[0].status == "Benchmark Met"


def test_engagement_freshness_uses_canonical_event_timestamp():
    engine = RiskEngine()
    res = engine.compute_student_risk(
        student_id="test-stu-engagement-timestamp",
        engagement_records=[
            {"event_timestamp": "2026-09-10T10:00:00+00:00", "event_type": "workshop"},
            {"event_timestamp": "2026-10-01T10:00:00+00:00", "event_type": "mentoring"},
        ],
    )

    notice = next(n for n in res.data_freshness if n.category == "Digital Engagement Logs")
    assert notice.latest_recorded_date == "2026-10-01T10:00:00+00:00"
    assert notice.freshness_status == "Current"
    assert res.contributing_factors[2].factor_name == "Campus & Co-curricular Engagement"


def test_boundary_critical_failure():
    """Student with 0% attendance and 0% scores should produce Critical priority."""
    engine = RiskEngine()
    att = [{"date": f"2026-09-0{i}", "status": "absent"} for i in range(1, 9)]
    ass = [{"date": f"2026-09-1{i}", "score": 0, "max_score": 100} for i in range(1, 5)]
    eng = []

    res = engine.compute_student_risk(
        student_id="test-stu-critical",
        attendance_records=att,
        assessment_records=ass,
        engagement_records=eng,
    )

    assert res.composite_risk_score >= 70.0
    assert res.support_priority_tier == "critical"
    assert res.requires_human_review is True


def test_ethical_missing_data_not_penalized():
    """
    ETHICAL MANDATE:
    If a student has unrecorded attendance or pending evaluations,
    they must not be penalized with maximal failure scores (0%).
    """
    engine = RiskEngine()
    res = engine.compute_student_risk(
        student_id="test-stu-empty",
        attendance_records=[],
        assessment_records=[],
        engagement_records=[],
        explicit_missing_evaluations=["Term 2 Physics Practical (Pending Grading)"],
    )

    # Sub-scores must use neutral baselines rather than 100.0 (maximum risk)
    assert res.support_priority_tier == "insufficient_data"
    assert res.composite_risk_score is None
    assert any("Pending Grading" in w for w in res.missing_data_warnings)
    assert res.contributing_factors[0].measured_value is None
    assert all(f.weight == 0 for f in res.contributing_factors)


def test_invalid_denominators_sanitized():
    """Ensure max_score <= 0 or corrupt data does not cause ZeroDivisionError."""
    engine = RiskEngine()
    corrupt_ass = [
        {"score": 50, "max_score": 0},
        {"score": 80, "max_score": -10},
    ]

    res = engine.compute_student_risk(
        student_id="test-stu-corrupt",
        assessment_records=corrupt_ass,
    )

    assert res.composite_risk_score >= 0.0
    assert res.support_priority_tier in ("low", "moderate", "high", "critical")


def test_human_override_workflow(client):
    """Test advisor override recording, effective tier adjustment, and clearing."""
    engine = RiskEngine()
    student_id = "STU-001"

    # 1. Compute baseline
    initial = engine.compute_student_risk(student_id=student_id)
    original_tier = initial.support_priority_tier

    # 2. Record override
    override = engine.record_human_override(
        student_id=student_id,
        override_tier="high",
        reason="Medical absence documented by health center.",
        reviewed_by="Dr. S. Verma",
    )
    assert override.is_overridden is True
    assert override.override_tier == "high"

    # 3. Check updated dossier reflects effective tier
    updated = engine.compute_student_risk(student_id=student_id)
    assert updated.effective_priority_tier == "high"
    assert updated.human_override.is_overridden is True
    assert updated.human_override.override_reason == "Medical absence documented by health center."

    # 4. Clear override
    engine.clear_human_override(student_id=student_id)
    restored = engine.compute_student_risk(student_id=student_id)
    assert restored.effective_priority_tier == original_tier
    assert restored.human_override.is_overridden is False


def test_risk_explanation_api_endpoints(client):
    """Verify REST API endpoints for risk explanation and override."""
    # 1. Fetch explanation
    res = client.get("/api/v1/students/STU-001/risk-explanation")
    assert res.status_code == 200
    data = res.json()
    assert "composite_risk_score" in data
    assert "support_priority_tier" in data
    assert "contributing_factors" in data
    assert len(data["contributing_factors"]) == 3
    assert "decision_support_disclaimer" in data

    # 2. Post override
    post_res = client.post(
        "/api/v1/students/STU-001/risk-override",
        json={
            "override_tier": "critical",
            "reason": "Counselor recommended immediate priority check-in.",
            "reviewed_by": "Lead Counselor Rao",
        },
    )
    assert post_res.status_code == 200
    ov_data = post_res.json()
    assert ov_data["is_overridden"] is True
    assert ov_data["override_tier"] == "critical"

    # 3. Verify override reflects on next explanation fetch
    res2 = client.get("/api/v1/students/STU-001/risk-explanation")
    assert res2.status_code == 200
    assert res2.json()["effective_priority_tier"] == "critical"

    # 4. Delete override
    del_res = client.delete("/api/v1/students/STU-001/risk-override")
    assert del_res.status_code == 200
