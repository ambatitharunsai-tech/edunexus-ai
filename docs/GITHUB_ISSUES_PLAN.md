# EduNexus AI — GitHub Issues Plan & Backlog

**Challenge**: KPMG India — *"Smart Campus Analytics: Predict, Optimize & Improve Student Success"*  
**Repository Admin**: `ambatitharunsai-tech`  
**Status**: Ready-to-Create Backlog (Specifications drafted below; **not yet created on remote GitHub**)  

---

## Challenge Scoring Weight Summary

| Evaluation Domain | Weight | Mapped Issues |
|---|---|---|
| **Data Integration & Analysis** | **30%** | Issue #1, Issue #2 |
| **Success Score & Risk Identification** | **25%** | Issue #3, Issue #4, Issue #5 |
| **Dashboard & Visualization** | **25%** | Issue #6 |
| **Problem Understanding** | **10%** | Issue #7, Issue #8 |
| **Presentation & Evaluator Demo** | **10%** | Issue #9 |

---

## Ready-to-Create Issue Specifications

---

### Issue #1: Integrate the Seven Student-Data Domains
- **Challenge Weight**: 30% (Data Integration & Analysis)
- **Assigned Workstream**: Data Integration
- **Target Branch**: `feature/data-integration`
- **Suggested Labels**: `priority: critical`, `area: data`, `area: backend`

#### Description
The KPMG Smart Campus Analytics challenge requires comprehensive analytics across multiple dimensions of student life. We must model, validate, and integrate telemetry across all seven distinct student-data domains:
1. Academic Performance (course grades, GPA/CGPA, credits)
2. Attendance Records (date, session status, excused/unexcused)
3. LMS Engagement (portal logins, module completion, time on task)
4. Campus Engagement (extracurriculars, committee roles, mentoring)
5. Placement & Career Readiness (mock interviews, aptitude scores, resume checks)
6. Technical & Soft Skills (domain proficiencies rated 1–5)
7. Student Sentiment & Feedback (feedback surveys, satisfaction scores)

#### Acceptance Criteria
- [ ] Pydantic v2 schemas defined for all seven data domains with field validation constraints.
- [ ] Database repository methods implemented in `backend/app/db/repositories/` to query each domain.
- [ ] Synthetic seed generator (`data/synthetic_seed.json`) populated with cohesive synthetic data across all 7 domains for 36 demo students.
- [ ] REST API endpoints `/api/v1/students/{id}/domains` or domain-specific endpoints respond with verified data.
- [ ] Unit tests pass in `backend/tests/test_7domain_endpoints.py` verifying response structure and schema compliance.

---

### Issue #2: Validate CSV Imports and Provide Example Templates
- **Challenge Weight**: 30% (Data Integration & Analysis)
- **Assigned Workstream**: Data Integration
- **Target Branch**: `feature/data-integration`
- **Suggested Labels**: `priority: high`, `area: data`, `area: backend`, `area: frontend`

#### Description
Campus administrators and hackathon evaluators need a reliable mechanism to import student data in bulk. We need a self-service CSV Hub that offers downloadable schema-compliant templates, performs strict line-numbered pre-flight validation, and supports safe deduplication without server crashes.

#### Acceptance Criteria
- [ ] Downloadable CSV templates provided for key domains (`students.csv`, `attendance.csv`, `assessments.csv`).
- [ ] Pre-flight validation endpoint `POST /api/v1/csv/preview` parses rows and reports exact 1-indexed line numbers for errors.
- [ ] Validation enforces constraints: scores between 0 and `max_score`, valid dates, foreign key existence against registered students.
- [ ] Deduplication strategies implemented: `skip` (default) and `overwrite`.
- [ ] 1-click synthetic demo reset endpoint `POST /api/v1/csv/reset-demo` restores pristine 36-student baseline.
- [ ] Frontend CSV Hub (`/csv-hub`) displays clear error tables and upload progress.
- [ ] Backend tests in `backend/tests/test_csv_service.py` pass with 100% success.

---

### Issue #3: Implement and Test the Student Success Score Engine
- **Challenge Weight**: 25% (Success Score & Risk Identification)
- **Assigned Workstream**: Analytics Engine
- **Target Branch**: `feature/success-score`
- **Suggested Labels**: `priority: critical`, `area: analytics`, `area: backend`

#### Description
Develop a multi-dimensional, deterministic Student Success Score ($S_{\text{success}} \in [0, 100]$) that evaluates holistic student growth. The score must synthesize academic standing, attendance consistency, technical/soft skill competency, and placement readiness with mathematical transparency. Zero black-box machine learning models are permitted.

#### Acceptance Criteria
- [ ] Configurable weights defined in `backend/app/core/risk_config.py` summing to 1.0.
- [ ] Holistic score formula computes normalized $0-100$ value with explicit domain sub-scores.
- [ ] Domain radar fingerprinting payload generated to visualize multi-axial student capabilities on the frontend.
- [ ] Missing telemetry handled with ethical neutrality (missing values are not penalized as zero).
- [ ] Unit tests in `backend/tests/test_success_score_engine.py` verify edge cases (0 score, 100 score, missing telemetry).

---

### Issue #4: Implement Explainable Academic-Risk and Placement-Risk Flags
- **Challenge Weight**: 25% (Success Score & Risk Identification)
- **Assigned Workstream**: Analytics Engine
- **Target Branch**: `feature/risk-analysis`
- **Suggested Labels**: `priority: critical`, `area: analytics`, `area: backend`

#### Description
Institutions need distinct, actionable risk signals for immediate academic intervention versus long-term placement readiness. Implement independent academic risk and placement risk engines with deterministic factor decomposition and advisor override capabilities.

#### Acceptance Criteria
- [ ] Compute independent `academic_risk` index ($0-100$) and `placement_risk` index ($0-100$).
- [ ] Generate factor-level breakdown showing specific deficit contributions ($w_i \cdot D_i$).
- [ ] Trigger `Critical Variance` flags for severe attendance deficit ($< 75\%$) or failing assessment average ($< 60\%$).
- [ ] Support Human-in-the-Loop Advisor Overrides (`POST /api/v1/students/{id}/risk-override`) that record advisor ID, timestamp, and rationale while preserving underlying calculated scores.
- [ ] Unit tests in `backend/tests/test_dual_risk_engine.py` and `backend/tests/test_risk_engine.py` pass completely.

---

### Issue #5: Implement Student Segmentation (Quadrant Analysis)
- **Challenge Weight**: 25% (Success Score & Risk Identification)
- **Assigned Workstream**: Analytics Engine
- **Target Branch**: `feature/risk-analysis`
- **Suggested Labels**: `priority: high`, `area: analytics`, `area: frontend`, `area: backend`

#### Description
To help campus leaders deploy targeted support resources, segment the student body into actionable cohorts based on academic performance and placement readiness:
- Quadrant 1: High Potential / Career Ready (High Academics, High Placement Readiness)
- Quadrant 2: Placement Acceleration Needed (High Academics, Low Placement Readiness)
- Quadrant 3: Academic Support Needed (Low Academics, High Placement Readiness)
- Quadrant 4: Comprehensive Intervention Needed (Low Academics, Low Placement Readiness)

#### Acceptance Criteria
- [ ] Segmentation engine in `backend/app/services/segmentation_engine.py` assigns each student to exactly one quadrant.
- [ ] Provide tailored institutional recommendations for each cohort (e.g. mock interview workshops vs. peer tutoring).
- [ ] Cohort distribution summary endpoint for executive dashboard analytics.
- [ ] Frontend quadrant card and matrix rendering in `DualRiskMatrixCard.tsx` and `StudentSegmentationCard.tsx`.
- [ ] Unit tests in `backend/tests/test_segmentation_engine.py` verify quadrant boundary conditions.

---

### Issue #6: Complete the Interactive Dashboard and Filter System
- **Challenge Weight**: 25% (Dashboard & Visualization)
- **Assigned Workstream**: Technical Lead / Frontend
- **Target Branch**: `feature/dashboard`
- **Suggested Labels**: `priority: high`, `area: frontend`

#### Description
Build an executive-grade, responsive analytics dashboard for campus administrators and counselors. Visualizations must provide immediate situational awareness with instant filtering, KPI summary cards, trajectory charts, and drill-downs to individual student dossiers.

#### Acceptance Criteria
- [ ] Top KPI summary cards: Total Students, Students Needing Review, Active Interventions, Overdue Follow-ups.
- [ ] Recharts visualizations: Attendance trend, assessment trajectories, and risk tier distribution with benchmark lines.
- [ ] Multi-criteria student filtering toolbar: filter by Department, Risk Tier, Grade, and Search query.
- [ ] Fast client-side navigation into student dossiers (`/journey?student_id=STU-XXX`).
- [ ] Accessible styling, responsive mobile/tablet layout, dark-mode-ready color palette using Tailwind CSS.
- [ ] `npm run lint` and `npm run build` execute cleanly with 0 errors.

---

### Issue #7: Test Intervention and Outcome Workflows
- **Challenge Weight**: 10% (Problem Understanding & Workflow Integrity)
- **Assigned Workstream**: QA & Presentation
- **Target Branch**: `feature/testing-demo`
- **Suggested Labels**: `priority: high`, `area: testing`, `area: backend`, `area: frontend`

#### Description
Student analytics must translate into closed-loop actions. Verify the complete intervention lifecycle (Planned $\rightarrow$ In Progress $\rightarrow$ Completed / Cancelled), overdue follow-up detection, and before-and-after outcome tracking.

#### Acceptance Criteria
- [ ] Intervention creation with student assignment, intervention type, target goal, and follow-up date.
- [ ] Automatic identification of overdue interventions when `follow_up_date < today` and status is active.
- [ ] Outcome recording with baseline ($V_{\text{baseline}}$), post-intervention ($V_{\text{post}}$), and percentage delta ($\Delta_{\text{pct}}$).
- [ ] Mandatory scientific disclaimer rendered on all outcome cards: *"Observed changes correlate in time with the intervention but do not constitute mathematical proof of sole causation."*
- [ ] Backend tests in `backend/tests/test_interventions_crud.py` pass with 100% success.

---

### Issue #8: Verify Supabase Persistence and Authorization
- **Challenge Weight**: 10% (Problem Understanding & Production Architecture)
- **Assigned Workstream**: Technical Lead / Security
- **Target Branch**: `main`
- **Suggested Labels**: `priority: high`, `area: security`, `area: backend`

#### Description
Ensure that EduNexus AI operates securely across both local in-memory demonstration mode and live cloud Supabase PostgreSQL instances. Validate role-based access control, header anti-spoofing, and database isolation.

#### Acceptance Criteria
- [ ] Dual-mode database service operates seamlessly: memory synthetic mode when credentials are unset; PostgreSQL when configured.
- [ ] FastAPI authorization dependency `require_staff_user` verifies bearer tokens and rejects spoofed headers.
- [ ] Evaluation demo tokens (`edunexus-demo-*-token`) strictly blocked in production mode (`ENVIRONMENT=production`).
- [ ] PostgreSQL migration scripts in `supabase/migrations/` apply cleanly with foreign keys and check constraints.
- [ ] Backend tests in `backend/tests/test_authorization.py` and `backend/tests/test_database_service.py` pass.

---

### Issue #9: Prepare Deployment and the Evaluator Demo Walkthrough
- **Challenge Weight**: 10% (Presentation & Demo)
- **Assigned Workstream**: QA & Presentation
- **Target Branch**: `feature/testing-demo`
- **Suggested Labels**: `priority: critical`, `documentation`, `area: testing`

#### Description
Prepare the final submission assets, rehearsed demo script, and deployment configuration for KPMG evaluators. A smooth, 5-minute judge walkthrough is vital to showcase all capabilities under timed hackathon judging.

#### Acceptance Criteria
- [ ] Rehearse 5-step evaluator script (`README.md` Section 9): Dashboard $\rightarrow$ Directory $\rightarrow$ Student Dossier & Override $\rightarrow$ Interventions Hub $\rightarrow$ CSV Hub.
- [ ] Verify 1-click synthetic demo reset reliably returns application to pristine baseline.
- [ ] Create submission slide deck aligning features directly to KPMG criteria.
- [ ] Verify clean clone-and-run instructions on a fresh developer environment.
- [ ] All 86 backend tests and frontend production bundle verified before final submission.

---

## How to Create These Issues on GitHub

Once the GitHub remote is configured, issues can be created via the GitHub web UI or the `gh` CLI:

```bash
# Example creating Issue #1 via GitHub CLI:
gh issue create \
  --title "feat(data): integrate the seven student-data domains" \
  --body-file docs/GITHUB_ISSUES_PLAN.md \
  --label "priority: critical,area: data,area: backend"
```
