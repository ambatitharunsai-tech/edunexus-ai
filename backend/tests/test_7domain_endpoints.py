"""
EduNexus AI — 7-Domain Endpoints & Segmentation API Tests
Validates dashboard 7-domain analytics, placement summaries, dual-risk matrix,
student directory segment filtering, and comprehensive dossiers.
"""

from fastapi.testclient import TestClient
from app.main import create_application

app = create_application()
client = TestClient(app)

STAFF_HEADERS = {
    "Authorization": "Bearer edunexus-demo-advisor-token",
    "X-User-Role": "advisor",
}



def test_dashboard_overview_7domain_analytics():
    response = client.get("/api/v1/dashboard/overview", headers=STAFF_HEADERS)
    assert response.status_code == 200
    data = response.json()

    # 1. Verify 7-domain cohort averages
    assert "domain_averages" in data
    averages = data["domain_averages"]
    assert set(averages.keys()) == {
        "academic", "attendance", "placement", "lms", "engagement", "skills", "feedback"
    }
    for val in averages.values():
        assert 0.0 <= val <= 100.0

    # 2. Verify placement readiness summary
    assert "placement_readiness_summary" in data
    placement = data["placement_readiness_summary"]
    assert "average_aptitude" in placement
    assert "average_coding" in placement
    assert "average_mock_interview" in placement
    assert "tier_distribution" in placement

    # 3. Verify segmentation distribution
    assert "segmentation_distribution" in data
    segments = data["segmentation_distribution"]
    assert any(s["segment_id"] == "insufficient_data" for s in segments)
    total_seg_count = sum(s["count"] for s in segments)
    assert total_seg_count == data["summary"]["total_students"]

    # 4. Verify dual-risk matrix
    assert "dual_risk_matrix" in data
    matrix = data["dual_risk_matrix"]
    assert "academic_low_placement_low" in matrix
    assert "academic_high_placement_high" in matrix


def test_students_directory_segment_filter_and_success_sorting():
    # Filter by segment
    response = client.get(
        "/api/v1/students?segment=high_achiever_placement_ready",
        headers=STAFF_HEADERS,
    )
    assert response.status_code == 200
    data = response.json()
    assert "students" in data
    for s in data["students"]:
        assert s["segment_id"] == "high_achiever_placement_ready"

    # Sort by success score descending
    sort_res = client.get(
        "/api/v1/students?sort_by=success_score&sort_dir=desc",
        headers=STAFF_HEADERS,
    )
    assert sort_res.status_code == 200
    sort_data = sort_res.json()
    scores = [s["success_score"] for s in sort_data["students"] if s.get("success_score") is not None]
    assert scores == sorted(scores, reverse=True)


def test_student_journey_profile_7domain_enrichment():
    response = client.get("/api/v1/students/STU-001", headers=STAFF_HEADERS)
    assert response.status_code == 200
    data = response.json()

    assert "success_profile" in data
    assert data["success_profile"]["student_id"] == "STU-001"
    assert "academic_risk_profile" in data
    assert "placement_risk_profile" in data
    assert "segment_profile" in data

    # Check timeline contains placement event
    timeline = data.get("timeline_events", [])
    assert any("Placement evaluation" in e.get("title", "") for e in timeline)


def test_student_comprehensive_dossier_endpoint():
    response = client.get("/api/v1/students/STU-002/comprehensive-dossier", headers=STAFF_HEADERS)
    assert response.status_code == 200
    dossier = response.json()

    assert dossier["student_id"] == "STU-002"
    assert "success_score_profile" in dossier
    assert "academic_risk" in dossier
    assert "placement_risk" in dossier
    assert "segment" in dossier
    assert "ethical_disclaimer" in dossier

    # STU-002 is Practical Star / Exam Vulnerable
    assert dossier["placement_risk"]["tier"] == "low"
    assert dossier["academic_risk"]["tier"] in ("critical", "high")
    assert dossier["segment"]["segment_id"] == "practical_star_exam_vulnerable"


def test_missing_data_resilience_stu_010():
    # STU-010 is missing placement and feedback telemetry
    response = client.get("/api/v1/students/STU-010/comprehensive-dossier", headers=STAFF_HEADERS)
    assert response.status_code == 200
    dossier = response.json()

    success_profile = dossier["success_score_profile"]
    assert success_profile["status"] == "PARTIAL"
    assert "placement" in success_profile["missing_domains"]
    assert "feedback" in success_profile["missing_domains"]
    assert success_profile["success_score"] is not None
    assert "Missing-Data Neutrality" in success_profile["missing_data_notice"]
