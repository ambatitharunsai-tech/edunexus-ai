"""Authoritative per-student analytics shared by directory, journey and dashboard."""
from typing import Any, Dict, List, Optional, Literal
from app.services.success_score_engine import success_score_engine
from app.services.dual_risk_engine import dual_risk_engine
from app.services.segmentation_engine import segmentation_engine

def _compute_student_metrics(
    s: Dict[str, Any],
    student_att: Dict[str, List[Dict[str, Any]]],
    student_ass: Dict[str, List[Dict[str, Any]]],
    student_eng: Dict[str, List[Dict[str, Any]]],
    student_intvs: Dict[str, List[Dict[str, Any]]],
    index: int,
    student_placement: Optional[Dict[str, Dict[str, Any]]] = None,
    student_skills: Optional[Dict[str, Dict[str, Any]]] = None,
    student_feedback: Optional[Dict[str, Dict[str, Any]]] = None,
    student_lms: Optional[Dict[str, Dict[str, Any]]] = None,
) -> Dict[str, Any]:
    """Helper to derive deterministic, explainable metrics for a student across all 7 domains."""
    s_id = str(s.get("id"))
    department = s.get("department") or "Not recorded"

    # 1. Attendance rate
    att_list = student_att.get(s_id, [])
    if att_list:
        present_cnt = sum(1 for a in att_list if a.get("status") in ("present", "late"))
        att_rate = round((present_cnt / len(att_list)) * 100.0, 1)
    else:
        att_rate = None

    # 2. Assessment score average & latest score
    ass_list = sorted(student_ass.get(s_id, []), key=lambda a: str(a.get("assessment_date", a.get("date", ""))), reverse=True)
    scores: List[float] = []
    latest_score: Optional[float] = None
    if ass_list:
        for a in ass_list:
            mx = float(a.get("max_score", 100))
            if mx > 0:
                sc = (float(a.get("score", 0)) / mx) * 100.0
                scores.append(sc)
        if scores:
            avg_score = round(sum(scores) / len(scores), 1)
            latest_score = round(scores[0], 1)
        else:
            avg_score = None
    else:
        avg_score = None

    # 3. Explainable Risk Composite (35% Attendance, 40% Academics, 25% Engagement)
    from app.services.risk_engine import risk_engine
    baseline = risk_engine.compute_student_risk(s_id, att_list, ass_list, student_eng.get(s_id, []))
    att_factor, acad_factor, eng_factor = [f.sub_metric_score for f in baseline.contributing_factors]
    eng_cnt = len(student_eng.get(s_id, []))
    risk_score = baseline.composite_risk_score
    tier = baseline.effective_priority_tier

    # 4. Trend trajectory (compare first half to second half of assessments)
    trend: Literal['improving', 'stable', 'declining'] = "stable"
    if len(scores) >= 2:
        mid = len(scores) // 2
        recent_avg = sum(scores[:mid]) / mid
        prior_avg = sum(scores[mid:]) / (len(scores) - mid)
        if recent_avg - prior_avg >= 4.0:
            trend = "improving"
        elif prior_avg - recent_avg >= 4.0:
            trend = "declining"

    # 5. Review & workflow status
    intvs = student_intvs.get(s_id, [])
    has_active_plan = any(i.get("status") in ("planned", "in_progress") for i in intvs)
    if has_active_plan:
        review_status = "Active Support Plan"
    elif tier in ("critical", "high"):
        review_status = "Needs Review"
    elif tier in ("moderate", "medium"):
        review_status = "Under Review"
    elif tier == "insufficient_data":
        review_status = "Awaiting data review"
    else:
        review_status = "On Track"

    # ── 6. KPMG 7-Domain Dual Risk & Success Score Computation ───────────
    cgpa = s.get("cgpa")
    backlogs = s.get("backlogs")

    p_data = student_placement.get(s_id) if student_placement else None
    sk_data = student_skills.get(s_id) if student_skills else None
    fb_data = student_feedback.get(s_id) if student_feedback else None
    lm_data = student_lms.get(s_id) if student_lms else None

    # Independent Academic & Placement Risks
    acad_risk_signal = dual_risk_engine.evaluate_academic_risk(
        attendance_rate=att_rate,
        cgpa=cgpa,
        backlogs=backlogs,
    )

    place_risk_signal = dual_risk_engine.evaluate_placement_risk(
        aptitude_score=p_data.get("aptitude_score") if p_data else None,
        coding_score=p_data.get("coding_score") if p_data else None,
        mock_interview_score=p_data.get("mock_interview_score") if p_data else None,
        mock_interviews_attended=p_data.get("mock_interviews_attended") if p_data else None,
        readiness_tier=p_data.get("readiness_tier") if p_data else None,
    )

    # Holistic 0–100 Student Success Score
    success_score_response = success_score_engine.compute_student_success_score(
        student_id=s.get("student_id", s_id),
        academic_data={"cgpa": cgpa, "backlogs": backlogs, "average_score": avg_score},
        attendance_data={"attendance_rate": att_rate, "total_sessions": len(att_list)} if att_rate is not None else None,
        placement_data=p_data,
        lms_data=lm_data,
        engagement_data={"events_count": eng_cnt} if eng_cnt else None,
        skills_data=sk_data,
        feedback_data=fb_data,
    )

    # 5 Actionable Student Segments
    segment_profile = segmentation_engine.classify_student(
        success_score=success_score_response.success_score,
        academic_risk=acad_risk_signal,
        placement_risk=place_risk_signal,
        academic_score=avg_score,
        placement_score=p_data.get("coding_score") if p_data else None,
    )

    return {
        "department": department,
        "attendance_rate": att_rate,
        "average_score": avg_score,
        "latest_assessment_percentage": latest_score,
        "trend": trend,
        "review_status": review_status,
        "risk_tier": tier,
        "risk_score": risk_score,
        "baseline_profile": baseline.model_dump(),
        "active_interventions_count": sum(i.get("status") in ("planned", "in_progress") for i in intvs),
        "att_factor": att_factor,
        "acad_factor": acad_factor,
        "eng_factor": eng_factor,
        "eng_cnt": eng_cnt,
        # 7-Domain Analytics
        "success_score": success_score_response.success_score,
        "success_tier": success_score_response.success_tier,
        "academic_risk_tier": acad_risk_signal.tier,
        "placement_risk_tier": place_risk_signal.tier,
        "segment_id": segment_profile.segment_id,
        "segment_label": segment_profile.segment_label,
        "segment_badge_color": segment_profile.badge_color,
        "success_profile": success_score_response.model_dump(),
        "academic_risk_profile": acad_risk_signal.model_dump(),
        "placement_risk_profile": place_risk_signal.model_dump(),
        "segment_profile": segment_profile.model_dump(),
        "placement_details": p_data,
        "skills_details": sk_data,
        "feedback_details": fb_data,
        "lms_details": lm_data,
    }



