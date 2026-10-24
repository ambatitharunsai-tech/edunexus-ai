"""
EduNexus AI — Dual Risk Engine
Independent rule-based evaluators for Academic Risk and Placement Risk.

CRITICAL DESIGN PRINCIPLE:
Decouple Academic Risk from Placement Risk. A student with high academic marks
who lacks placement preparation must receive targeted placement alerts without
diluting academic standing, and practical stars struggling with theoretical exams
must receive academic tutoring without being penalized on career readiness.
"""

from typing import Dict, Any, List, Optional
from app.schemas.success_score import IndependentRiskSignal, RiskFactor, RiskTier


class DualRiskEngine:
    """Evaluates independent academic vulnerability and placement vulnerability."""

    @staticmethod
    def evaluate_academic_risk(
        attendance_rate: Optional[float],
        cgpa: Optional[float],
        backlogs: Optional[int],
    ) -> IndependentRiskSignal:
        """
        Evaluates academic vulnerability from attendance, CGPA, and active backlogs.
        """
        if attendance_rate is None or cgpa is None or backlogs is None:
            return IndependentRiskSignal(risk_type="academic", tier="insufficient_data", score=None,
                recommendation="Record attendance, CGPA and backlog count before assigning academic risk.")
        factors: List[RiskFactor] = []
        is_critical = False

        # 1. Attendance Analysis
        att_rate = max(0.0, min(100.0, float(attendance_rate)))
        if att_rate < 75.0:
            is_critical = True
            factors.append(
                RiskFactor(
                    metric="Attendance (prototype threshold)",
                    observed_value=f"{att_rate}%",
                    threshold="75.0% Prototype Threshold",
                    severity="critical",
                    description=f"Attendance of {att_rate}% is below prototype 75% threshold; advisor review suggested.",
                )
            )
        elif att_rate < 80.0:
            factors.append(
                RiskFactor(
                    metric="Attendance Consistency",
                    observed_value=f"{att_rate}%",
                    threshold="80.0% Institutional Target",
                    severity="moderate",
                    description=f"Attendance of {att_rate}% falls below the 80% advisory benchmark.",
                )
            )
        else:
            factors.append(
                RiskFactor(
                    metric="Attendance Consistency",
                    observed_value=f"{att_rate}%",
                    threshold="80.0%",
                    severity="low",
                    description=f"Attendance of {att_rate}% meets institutional policy.",
                )
            )

        # 2. CGPA Analysis
        clamped_cgpa = max(0.0, min(10.0, float(cgpa)))
        if clamped_cgpa < 5.5:
            is_critical = True
            factors.append(
                RiskFactor(
                    metric="Cumulative Grade Point Average (CGPA)",
                    observed_value=f"{clamped_cgpa} / 10.0",
                    threshold="5.5 Minimum Academic Standing",
                    severity="high",
                    description=f"CGPA {clamped_cgpa} is in below the prototype academic threshold.",
                )
            )
        elif clamped_cgpa < 6.5:
            factors.append(
                RiskFactor(
                    metric="Cumulative Grade Point Average (CGPA)",
                    observed_value=f"{clamped_cgpa} / 10.0",
                    threshold="6.5 Target Good Standing",
                    severity="moderate",
                    description=f"CGPA {clamped_cgpa} indicates borderline academic performance.",
                )
            )
        else:
            factors.append(
                RiskFactor(
                    metric="Cumulative Grade Point Average (CGPA)",
                    observed_value=f"{clamped_cgpa} / 10.0",
                    threshold="6.5",
                    severity="low",
                    description=f"CGPA {clamped_cgpa} reflects good academic standing.",
                )
            )

        # 3. Active Backlogs
        b_count = max(0, int(backlogs))
        if b_count >= 2:
            is_critical = True
            factors.append(
                RiskFactor(
                    metric="Active Course Backlogs",
                    observed_value=f"{b_count} backlog(s)",
                    threshold="0 Active Backlogs",
                    severity="high",
                    description=f"Student has {b_count} active course backlogs requiring remedial examination clearance.",
                )
            )
        elif b_count == 1:
            factors.append(
                RiskFactor(
                    metric="Active Course Backlogs",
                    observed_value="1 backlog",
                    threshold="0 Active Backlogs",
                    severity="moderate",
                    description="1 active backlog present. Remedial support recommended before next term exams.",
                )
            )
        else:
            factors.append(
                RiskFactor(
                    metric="Active Course Backlogs",
                    observed_value="0 backlogs",
                    threshold="0",
                    severity="low",
                    description="No active backlogs.",
                )
            )

        # Deficit calculation (0 = perfect, 100 = critical failure)
        att_deficit = max(0.0, 100.0 - att_rate)
        cgpa_deficit = max(0.0, (10.0 - clamped_cgpa) * 10.0)
        backlog_deficit = min(100.0, b_count * 30.0)
        composite_deficit = round((0.45 * att_deficit) + (0.35 * cgpa_deficit) + (0.20 * backlog_deficit), 1)

        # Tier Classification
        if is_critical or composite_deficit >= 50.0:
            tier: RiskTier = "critical" if att_rate < 75.0 else "high"
            rec = "Suggest an advisor meeting; assign peer tutoring and monitor weekly lecture attendance."
        elif composite_deficit >= 30.0 or b_count > 0 or att_rate < 80.0:
            tier = "moderate"
            rec = "Recommend academic review and module-specific revision exercises."
        else:
            tier = "low"
            rec = "Continue standard academic tracking; performance is stable."

        return IndependentRiskSignal(
            risk_type="academic",
            tier=tier,
            score=composite_deficit,
            is_critical_flag=is_critical,
            contributing_factors=factors,
            recommendation=rec,
        )

    @staticmethod
    def evaluate_placement_risk(
        aptitude_score: Optional[float] = None,
        coding_score: Optional[float] = None,
        mock_interview_score: Optional[float] = None,
        mock_interviews_attended: Optional[int] = None,
        readiness_tier: Optional[str] = None,
    ) -> IndependentRiskSignal:
        """
        Evaluates student campus placement vulnerability.
        Triggered by technical coding tests, aptitude scores, and interview performance.
        """
        if any(v is None for v in (aptitude_score, coding_score, mock_interview_score)):
            return IndependentRiskSignal(risk_type="placement", tier="insufficient_data", score=None,
                recommendation="Complete placement diagnostics before assigning placement risk.")
        factors: List[RiskFactor] = []
        is_critical = False

        apt = float(aptitude_score if aptitude_score is not None else 60.0)
        cod = float(coding_score if coding_score is not None else 60.0)
        mock = float(mock_interview_score if mock_interview_score is not None else 60.0)
        interviews_count = int(mock_interviews_attended) if mock_interviews_attended is not None else None

        # 1. Mock Interview Attendance
        if interviews_count == 0:
            is_critical = True
            factors.append(
                RiskFactor(
                    metric="Mock Interview Participation",
                    observed_value="0 rounds attended",
                    threshold="Minimum 1 Completed Diagnostic",
                    severity="critical",
                    description="Student has not attended any campus mock interview rounds.",
                )
            )
        elif interviews_count is not None:
            factors.append(
                RiskFactor(
                    metric="Mock Interview Participation",
                    observed_value=f"{interviews_count} rounds completed",
                    threshold="1 round",
                    severity="low",
                    description=f"Completed {interviews_count} mock interview diagnostics.",
                )
            )

        # 2. Coding Competency
        if cod < 45.0:
            factors.append(
                RiskFactor(
                    metric="Coding Assessment Score",
                    observed_value=f"{cod}%",
                    threshold="50.0% Minimum Placement Screening",
                    severity="high",
                    description=f"Coding score of {cod}% falls below prototype screening benchmark.",
                )
            )
        elif cod < 65.0:
            factors.append(
                RiskFactor(
                    metric="Coding Assessment Score",
                    observed_value=f"{cod}%",
                    threshold="65.0% Competitive Target",
                    severity="moderate",
                    description=f"Coding score of {cod}% requires improvement for competitive technical rounds.",
                )
            )
        else:
            factors.append(
                RiskFactor(
                    metric="Coding Assessment Score",
                    observed_value=f"{cod}%",
                    threshold="65.0%",
                    severity="low",
                    description=f"Coding score of {cod}% demonstrates solid technical readiness.",
                )
            )

        # 3. Quantitative / Aptitude Score
        if apt < 45.0:
            factors.append(
                RiskFactor(
                    metric="Aptitude & Reasoning Score",
                    observed_value=f"{apt}%",
                    threshold="50.0% General Cutoff",
                    severity="high",
                    description=f"Quantitative aptitude of {apt}% is below the prototype preparation benchmark.",
                )
            )
        elif apt < 65.0:
            factors.append(
                RiskFactor(
                    metric="Aptitude & Reasoning Score",
                    observed_value=f"{apt}%",
                    threshold="65.0% Standard Screening Cutoff",
                    severity="moderate",
                    description=f"Aptitude score of {apt}% is on the border of company test cutoffs.",
                )
            )
        else:
            factors.append(
                RiskFactor(
                    metric="Aptitude & Reasoning Score",
                    observed_value=f"{apt}%",
                    threshold="65.0%",
                    severity="low",
                    description=f"Aptitude score of {apt}% is in the prototype target range.",
                )
            )

        # Composite placement deficit (0 = fully ready, 100 = extreme deficit)
        cod_deficit = max(0.0, 100.0 - cod)
        apt_deficit = max(0.0, 100.0 - apt)
        mock_deficit = max(0.0, 100.0 - mock) if interviews_count != 0 else 100.0

        placement_deficit = round((0.40 * cod_deficit) + (0.30 * apt_deficit) + (0.30 * mock_deficit), 1)

        # Tier classification
        if is_critical or placement_deficit >= 50.0 or readiness_tier == "not_ready":
            tier: RiskTier = "critical" if (interviews_count == 0 or placement_deficit >= 65.0) else "high"
            rec = "Enroll immediately in placement bootcamps: coding sprints, aptitude workshops, and suggested mock interview practice."
        elif placement_deficit >= 35.0 or readiness_tier == "developing":
            tier = "moderate"
            rec = "Encourage participation in weekly algorithmic problem sets and peer interview practice."
        else:
            tier = "low"
            rec = "Placement readiness is on track. Recommend dream company application rounds."

        return IndependentRiskSignal(
            risk_type="placement",
            tier=tier,
            score=placement_deficit,
            is_critical_flag=is_critical,
            contributing_factors=factors,
            recommendation=rec,
        )


dual_risk_engine = DualRiskEngine()
