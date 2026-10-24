"""
EduNexus AI — Student Success Score Engine Tests
Validates mathematical correctness, dynamic weight rescaling, missing-data neutrality,
and insufficient telemetry safety gates.
"""

import pytest
from app.services.success_score_engine import SuccessScoreEngine, DEFAULT_DOMAIN_WEIGHTS


def test_default_weights_sum_to_one():
    total = sum(DEFAULT_DOMAIN_WEIGHTS.values())
    assert abs(total - 1.0) < 1e-5


def test_invalid_weights_raise_value_error():
    with pytest.raises(ValueError, match="All seven weights must be finite and positive"):
        SuccessScoreEngine({"academic": 0.5, "attendance": 0.2})


def test_complete_high_achiever_scoring():
    engine = SuccessScoreEngine()
    resp = engine.compute_student_success_score(
        student_id="STU-003",
        academic_data={"cgpa": 9.2, "backlogs": 0, "average_score": 90.0},
        attendance_data={"attendance_rate": 94.0, "total_sessions": 120},
        placement_data={"aptitude_score": 90.0, "coding_score": 88.0, "mock_interview_score": 92.0},
        lms_data={"module_completion_pct": 98.0, "assignments_submitted_pct": 98.0, "weekly_login_count": 15},
        engagement_data={"events_count": 6, "has_leadership_role": True},
        skills_data={"technical_score": 92.0, "soft_skills_score": 94.0, "certifications_count": 4},
        feedback_data={"faculty_sentiment": 95.0, "student_satisfaction": 92.0},
    )

    assert resp.status == "COMPLETE"
    assert resp.available_domains_count == 7
    assert resp.data_coverage_pct == 100.0
    assert len(resp.missing_domains) == 0
    assert resp.success_score is not None
    assert resp.success_score >= 85.0
    assert resp.success_tier == "thriving"
    assert resp.missing_data_notice is None


def test_insufficient_data_gate():
    """When fewer than 3 domains are recorded, score calculation is halted for ethical safety."""
    engine = SuccessScoreEngine()
    resp = engine.compute_student_success_score(
        student_id="STU-NEW",
        academic_data={"cgpa": 8.0, "backlogs": 0},
        attendance_data={"attendance_rate": 85.0},
        # All other 5 domains omitted
    )

    assert resp.status == "INSUFFICIENT_DATA"
    assert resp.available_domains_count == 2
    assert resp.success_score is None
    assert resp.success_tier is None
    assert "Insufficient Telemetry Warning" in resp.missing_data_notice


@pytest.mark.parametrize(
    ("raw_score", "expected_tier"),
    [
        (49.9, "needs_support"),
        (50.0, "developing"),
        (64.9, "developing"),
        (65.0, "proficient"),
        (79.9, "proficient"),
        (80.0, "thriving"),
    ],
)
def test_success_tier_boundaries_and_three_domain_weight_rescaling(raw_score, expected_tier):
    resp = SuccessScoreEngine().compute_student_success_score(
        student_id="STU-BOUNDARY",
        academic_data={"average_score": raw_score},
        attendance_data={"attendance_rate": raw_score},
        placement_data={"coding_score": raw_score},
    )

    assert resp.available_domains_count == 3
    assert resp.success_score == raw_score
    assert resp.success_tier == expected_tier
    assert sum(domain.normalized_weight for domain in resp.domain_breakdowns) == pytest.approx(1.0)


def test_missing_data_neutrality_and_weight_rescaling():
    """
    When some domains are missing (>= 3 present), weights of available domains
    are proportionally rescaled so the student is never penalized by zero imputation.
    """
    engine = SuccessScoreEngine()
    resp = engine.compute_student_success_score(
        student_id="STU-010",
        academic_data={"cgpa": 7.5, "backlogs": 0, "average_score": 75.0},
        attendance_data={"attendance_rate": 80.0},
        skills_data={"technical_score": 70.0, "soft_skills_score": 70.0},
        lms_data={"module_completion_pct": 75.0, "assignments_submitted_pct": 75.0},
        engagement_data={"events_count": 4},
        # Placement and Feedback are omitted
    )

    assert resp.status == "PARTIAL"
    assert resp.available_domains_count == 5
    assert set(resp.missing_domains) == {"placement", "feedback"}
    assert resp.success_score is not None
    assert resp.success_score > 0

    # Verify that the sum of normalized weights across available domains equals 1.0
    sum_norm_weights = sum(b.normalized_weight for b in resp.domain_breakdowns if not b.is_missing)
    assert abs(sum_norm_weights - 1.0) < 0.01

    # Verify missing domain breakdowns have raw_score None and is_missing True
    for b in resp.domain_breakdowns:
        if b.domain in ("placement", "feedback"):
            assert b.is_missing is True
            assert b.raw_score is None
            assert b.weighted_contribution == 0.0

    assert "Missing-Data Neutrality" in resp.missing_data_notice


def test_boundary_zero_and_hundred_clamping():
    engine = SuccessScoreEngine()
    
    # Worst possible telemetry
    resp_zero = engine.compute_student_success_score(
        student_id="STU-MIN",
        academic_data={"cgpa": 0.0, "backlogs": 10, "average_score": 0.0},
        attendance_data={"attendance_rate": 0.0},
        placement_data={"aptitude_score": 0.0, "coding_score": 0.0, "mock_interview_score": 0.0},
    )
    assert resp_zero.success_score == 0.0
    assert resp_zero.success_tier == "needs_support"

    # Perfect telemetry
    resp_max = engine.compute_student_success_score(
        student_id="STU-MAX",
        academic_data={"cgpa": 10.0, "backlogs": 0, "average_score": 100.0},
        attendance_data={"attendance_rate": 100.0},
        placement_data={"aptitude_score": 100.0, "coding_score": 100.0, "mock_interview_score": 100.0},
    )
    assert resp_max.success_score == 100.0
    assert resp_max.success_tier == "thriving"
