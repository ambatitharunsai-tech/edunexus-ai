"""
EduNexus AI — Dual Risk Engine Tests
Validates independent evaluation of Academic Risk and Placement Risk,
proving decoupled analysis and critical threshold triggers.
"""

from app.services.dual_risk_engine import DualRiskEngine


def test_academic_risk_statutory_attendance_breach():
    res = DualRiskEngine.evaluate_academic_risk(
        attendance_rate=72.0,
        cgpa=8.0,
        backlogs=0,
    )
    assert res.risk_type == "academic"
    assert res.tier in ("critical", "high")
    assert res.is_critical_flag is True
    assert any("Attendance" in f.metric for f in res.contributing_factors)


def test_academic_risk_backlogs_trigger():
    res = DualRiskEngine.evaluate_academic_risk(
        attendance_rate=85.0,
        cgpa=6.0,
        backlogs=2,
    )
    assert res.risk_type == "academic"
    assert res.tier in ("critical", "high")
    assert res.is_critical_flag is True
    assert any("Active Course Backlogs" in f.metric for f in res.contributing_factors)


def test_academic_risk_low_tier():
    res = DualRiskEngine.evaluate_academic_risk(
        attendance_rate=92.0,
        cgpa=8.5,
        backlogs=0,
    )
    assert res.risk_type == "academic"
    assert res.tier == "low"
    assert res.is_critical_flag is False
    assert res.score < 25.0


def test_academic_risk_deficit_uses_attendance_cgpa_and_backlogs_only():
    res = DualRiskEngine.evaluate_academic_risk(
        attendance_rate=80.0,
        cgpa=8.0,
        backlogs=0,
    )

    assert res.score == 16.0


def test_placement_risk_zero_mock_interviews():
    res = DualRiskEngine.evaluate_placement_risk(
        aptitude_score=75.0,
        coding_score=70.0,
        mock_interview_score=0.0,
        mock_interviews_attended=0,
    )
    assert res.risk_type == "placement"
    assert res.tier in ("critical", "high")
    assert res.is_critical_flag is True
    assert any("Mock Interview Participation" in f.metric for f in res.contributing_factors)


def test_placement_risk_ready():
    res = DualRiskEngine.evaluate_placement_risk(
        aptitude_score=88.0,
        coding_score=92.0,
        mock_interview_score=90.0,
        mock_interviews_attended=3,
        readiness_tier="advanced_hire",
    )
    assert res.risk_type == "placement"
    assert res.tier == "low"
    assert res.is_critical_flag is False
    assert res.score < 20.0


def test_decoupled_risk_scenarios():
    """
    Core challenge requirement:
    Student 1: Academic Star / Career At-Risk
    Student 2: Practical Star / Exam Vulnerable
    Demonstrating that academic standing and placement readiness do not conflate.
    """
    # Student 1: Academic Star with poor coding & no mock interviews
    acad_star_acad = DualRiskEngine.evaluate_academic_risk(
        attendance_rate=91.0,
        cgpa=8.8,
        backlogs=0,
    )
    acad_star_place = DualRiskEngine.evaluate_placement_risk(
        aptitude_score=68.0,
        coding_score=42.0,
        mock_interview_score=45.0,
        mock_interviews_attended=0,
        readiness_tier="not_ready",
    )
    assert acad_star_acad.tier == "low"
    assert acad_star_place.tier in ("critical", "high")
    assert acad_star_place.is_critical_flag is True

    # Student 2: Hackathon champ with low attendance & exam struggles
    practical_star_acad = DualRiskEngine.evaluate_academic_risk(
        attendance_rate=73.5,  # below 75%
        cgpa=6.1,
        backlogs=1,
    )
    practical_star_place = DualRiskEngine.evaluate_placement_risk(
        aptitude_score=85.0,
        coding_score=94.0,
        mock_interview_score=90.0,
        mock_interviews_attended=3,
        readiness_tier="advanced_hire",
    )
    assert practical_star_acad.tier in ("critical", "high")
    assert practical_star_acad.is_critical_flag is True
    assert practical_star_place.tier == "low"
    assert practical_star_place.is_critical_flag is False
