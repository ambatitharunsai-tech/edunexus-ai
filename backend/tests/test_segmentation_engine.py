"""
EduNexus AI — Student Segmentation Engine Tests
Validates classification of students into 5 actionable strategic cohorts
and assignment of tailored institutional recommendations.
"""

import pytest
from app.services.segmentation_engine import SegmentationEngine
from app.services.dual_risk_engine import DualRiskEngine


def test_classify_high_achiever():
    acad_risk = DualRiskEngine.evaluate_academic_risk(attendance_rate=95.0, cgpa=9.2, backlogs=0)
    place_risk = DualRiskEngine.evaluate_placement_risk(aptitude_score=90.0, coding_score=90.0, mock_interview_score=92.0, mock_interviews_attended=3)

    segment = SegmentationEngine.classify_student(
        success_score=89.5,
        academic_risk=acad_risk,
        placement_risk=place_risk,
        academic_score=92.0,
        placement_score=90.5,
    )
    assert segment.segment_id == "high_achiever_placement_ready"
    assert segment.badge_color == "emerald"
    assert segment.action_type == "mentorship"


def test_classify_academic_star_career_at_risk():
    acad_risk = DualRiskEngine.evaluate_academic_risk(attendance_rate=92.0, cgpa=8.8, backlogs=0)
    place_risk = DualRiskEngine.evaluate_placement_risk(aptitude_score=60.0, coding_score=40.0, mock_interview_score=45.0, mock_interviews_attended=0)

    segment = SegmentationEngine.classify_student(
        success_score=68.0,
        academic_risk=acad_risk,
        placement_risk=place_risk,
        academic_score=85.0,
        placement_score=45.0,
    )
    assert segment.segment_id == "academic_star_career_at_risk"
    assert segment.badge_color == "blue"
    assert segment.action_type == "placement_bootcamp"


def test_classify_practical_star_exam_vulnerable():
    acad_risk = DualRiskEngine.evaluate_academic_risk(attendance_rate=72.0, cgpa=6.1, backlogs=1)  # critical attendance
    place_risk = DualRiskEngine.evaluate_placement_risk(aptitude_score=85.0, coding_score=94.0, mock_interview_score=90.0, mock_interviews_attended=3)

    segment = SegmentationEngine.classify_student(
        success_score=68.0,
        academic_risk=acad_risk,
        placement_risk=place_risk,
        academic_score=55.0,
        placement_score=90.0,
    )
    assert segment.segment_id == "practical_star_exam_vulnerable"
    assert segment.badge_color == "amber"
    assert segment.action_type == "academic_tutoring"


def test_classify_priority_holistic_support():
    acad_risk = DualRiskEngine.evaluate_academic_risk(attendance_rate=65.0, cgpa=5.1, backlogs=2)
    place_risk = DualRiskEngine.evaluate_placement_risk(aptitude_score=40.0, coding_score=35.0, mock_interview_score=40.0, mock_interviews_attended=0)

    segment = SegmentationEngine.classify_student(
        success_score=42.0,
        academic_risk=acad_risk,
        placement_risk=place_risk,
        academic_score=45.0,
        placement_score=38.0,
    )
    assert segment.segment_id == "priority_holistic_support"
    assert segment.badge_color == "rose"
    assert segment.action_type == "urgent_counseling"


def test_classify_steady_emerging_potential():
    acad_risk = DualRiskEngine.evaluate_academic_risk(attendance_rate=83.0, cgpa=7.4, backlogs=0)
    place_risk = DualRiskEngine.evaluate_placement_risk(aptitude_score=72.0, coding_score=65.0, mock_interview_score=68.0, mock_interviews_attended=1)

    segment = SegmentationEngine.classify_student(
        success_score=71.0,
        academic_risk=acad_risk,
        placement_risk=place_risk,
        academic_score=74.0,
        placement_score=68.0,
    )
    assert segment.segment_id == "steady_emerging_potential"
    assert segment.badge_color == "purple"
    assert segment.action_type == "skill_expansion"


@pytest.mark.parametrize(
    ("success_score", "expected"),
    [(49.9, "priority_holistic_support"), (50.0, "steady_emerging_potential")],
)
def test_priority_success_score_boundary(success_score, expected):
    academic_risk = DualRiskEngine.evaluate_academic_risk(79.9, 6.0, 0)
    placement_risk = DualRiskEngine.evaluate_placement_risk(55.0, 55.0, 55.0, 1, "developing")

    segment = SegmentationEngine.classify_student(
        success_score=success_score,
        academic_risk=academic_risk,
        placement_risk=placement_risk,
    )

    assert segment.segment_id == expected


@pytest.mark.parametrize(
    ("academic_score", "expected"),
    [(69.9, "steady_emerging_potential"), (70.0, "academic_star_career_at_risk")],
)
def test_academic_star_boundary(academic_score, expected):
    academic_risk = DualRiskEngine.evaluate_academic_risk(80.0, 6.0, 0)
    placement_risk = DualRiskEngine.evaluate_placement_risk(60.0, 40.0, 45.0, 1, "not_ready")

    segment = SegmentationEngine.classify_student(
        success_score=68.0,
        academic_risk=academic_risk,
        placement_risk=placement_risk,
        academic_score=academic_score,
        placement_score=40.0,
    )

    assert segment.segment_id == expected


@pytest.mark.parametrize(
    ("placement_score", "expected"),
    [(71.9, "steady_emerging_potential"), (72.0, "practical_star_exam_vulnerable")],
)
def test_practical_star_boundary(placement_score, expected):
    academic_risk = DualRiskEngine.evaluate_academic_risk(72.0, 6.1, 1)
    placement_risk = DualRiskEngine.evaluate_placement_risk(60.0, 55.0, 60.0, 1, "developing")

    segment = SegmentationEngine.classify_student(
        success_score=68.0,
        academic_risk=academic_risk,
        placement_risk=placement_risk,
        academic_score=55.0,
        placement_score=placement_score,
    )

    assert segment.segment_id == expected


@pytest.mark.parametrize(
    ("success_score", "academic_score", "placement_score", "expected"),
    [
        (77.9, 77.9, 74.9, "steady_emerging_potential"),
        (78.0, 77.9, 74.9, "high_achiever_placement_ready"),
        (77.9, 78.0, 75.0, "high_achiever_placement_ready"),
    ],
)
def test_high_achiever_boundaries(success_score, academic_score, placement_score, expected):
    academic_risk = DualRiskEngine.evaluate_academic_risk(95.0, 9.2, 0)
    placement_risk = DualRiskEngine.evaluate_placement_risk(85.0, 80.0, 82.0, 2, "placement_ready")

    segment = SegmentationEngine.classify_student(
        success_score=success_score,
        academic_risk=academic_risk,
        placement_risk=placement_risk,
        academic_score=academic_score,
        placement_score=placement_score,
    )

    assert segment.segment_id == expected
