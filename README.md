# EduNexus AI — Student Success & Journey Intelligence Platform

[![Python](https://img.shields.io/badge/Python-3.14-blue.svg)](https://python.org)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.115+-009688.svg)](https://fastapi.tiangolo.com)
[![React](https://img.shields.io/badge/React-19-61DAFB.svg)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6.svg)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-v4-38B2AC.svg)](https://tailwindcss.com)
[![Tests](https://img.shields.io/badge/pytest-93%20passed-success.svg)](backend/tests)
[![Build](https://img.shields.io/badge/Vite%20Build-Passing-brightgreen.svg)](frontend)

> **KPMG India Student Analytics Challenge Submission**  
> EduNexus AI is an enterprise-grade Smart Campus Analytics platform integrating **7 student domains** (Academic, Attendance, LMS, Engagement, Placement, Skills, and Feedback). It delivers a positive 0–100 Student Success Score with dynamic missing-data weight rescaling, decoupled Academic vs. Placement Risk identification, strategic 5-cohort student segmentation, Recharts 7-domain radar fingerprints, human-in-the-loop intervention management, and self-service CSV ingestion.

---

## Table of Contents
1. [Core Principles & Architectural Commitments](#core-principles--architectural-commitments)
2. [Platform Architecture & 7-Domain Synthesis](#platform-architecture--7-domain-synthesis)
3. [Student Success Score Engine & Mathematical Formulations](#student-success-score-engine--mathematical-formulations)
4. [Decoupled Dual Risk Engine (Academic & Placement)](#decoupled-dual-risk-engine-academic--placement)
5. [Strategic Student Segmentation (5 Cohorts & Action Pathways)](#strategic-student-segmentation-5-cohorts--action-pathways)
6. [Intervention Management & Responsible Outcome Tracking](#intervention-management--responsible-outcome-tracking)
7. [7-Domain CSV Ingestion Engine & 1-Click Demo Reset](#7-domain-csv-ingestion-engine--1-click-demo-reset)
8. [Supabase Database Architecture & Security](#supabase-database-architecture--security)
9. [Local Installation & Quickstart](#local-installation--quickstart)
10. [Automated Test Suite (93 Passed)](#automated-test-suite-93-passed)
11. [5-Minute Evaluator Demo Tour for KPMG Judges](#5-minute-evaluator-demo-tour-for-kpmg-judges)
12. [Known Limitations & Security Architecture](#known-limitations--security-architecture)

---

## Core Principles & Architectural Commitments

1. **Zero Fake Machine Learning**:
   EduNexus AI strictly rejects black-box models and fabricated accuracy metrics. In institutional student analytics where verified multi-cohort outcome labels do not yet exist, all risk scores and success indexes are 100% deterministic, mathematically explainable, and governed by transparent configuration files (`backend/app/core/risk_config.py`).
2. **Missing-Data Neutrality (Dynamic Weight Rescaling)**:
   Missing domain records (e.g. absent LMS logins or pending mock interviews) are never penalized as zero. The engine surfaces explicit ethical data warnings and dynamically rescales active domain weights so that $\sum w_i = 1.0$, guaranteeing fair evaluation.
3. **Decoupled Risk Signals**:
   Academic risk and placement risk are modeled as independent, orthogonal dimensions. A high-GPA student lacking aptitude/coding readiness is flagged for placement support without lowering their academic standing, and vice-versa.
4. **Human-in-the-Loop Decision Support**:
   The platform is explicitly designed as a *decision-support tool*, never an autonomous decision-maker. It never infers sensitive personal characteristics, never makes punitive automated decisions, and empowers faculty/advisors to review, override, and document decisions with full audit accountability.
5. **Scientific Non-Causation Standard**:
   Observed changes following an intervention are recorded as empirical comparisons ($V_{\text{post}} - V_{\text{baseline}}$). Every outcome screen and database record carries a mandatory scientific disclaimer: *observed correlations in time do not constitute proof of sole causation without controlled longitudinal evidence*.

---

## Platform Architecture & 7-Domain Synthesis

| Domain | Institutional Telemetry | Metrics Synthesized |
|---|---|---|
| **1. Academic** | Subject marks, midterm & final exams, credit backlogs | Term GPA, passing percentage, backlog count |
| **2. Attendance** | Daily lecture & laboratory sessions, excused absences | Attendance rate, critical statutory alert (<75%) |
| **3. LMS Learning** | Online course engagement, learning management modules | Weekly logins, module completion %, assignments submitted % |
| **4. Engagement** | Co-curricular events, student clubs, hackathons, workshops | Activity events count, leadership roles, workshop attendance |
| **5. Placement** | Campus placement cell evaluations, aptitude & mock drives | Aptitude score, coding score, mock interviews attended, resume score |
| **6. Skills** | Technical proficiency assessments, soft skills, certifications | Technical rating, soft skills index, verified certifications |
| **7. Feedback** | Faculty mentor reviews, student satisfaction surveys | Faculty sentiment index, student satisfaction rating |

---

## Platform Stages & Feature Map

| Module / Stage | Functionality | Primary Tech |
|---|---|---|
| **Stage 1: Architecture Audit** | Foundation review, 7-domain data integration design, REST contract | React 19, FastAPI, Tailwind CSS v4 |
| **Stage 2: 7-Domain Schemas & DB** | Pydantic v2 domain schemas, PostgreSQL migration (`20261012000001_kpmg_7domains.sql`), seed archetypes | Supabase, PostgreSQL, Pydantic |
| **Stage 3: Success Score Engine** | 0–100 positive index, dynamic missing-data weight rescaling, boundary clamping | Python 3.14, Math Engine |
| **Stage 4: Decoupled Dual Risk** | Independent Academic Risk and Placement Risk analyzers, statutory <75% rule | Python 3.14, Deterministic Rules |
| **Stage 5: Segmentation & Dossier** | Rule-based 5-cohort segmentation, comprehensive multi-domain student dossier | REST API, Pydantic Schemas |
| **Stage 6: Executive Dashboard** | 7-Domain Radar Overview, Placement Readiness Card, Dual-Risk Matrix, Cohort Breakdown | Recharts Radar, Lucide Icons |
| **Stage 7: Directory & Journey** | Segment filters, Success Score sort, individual Radar fingerprint, dual risk cards | React Router, Lucide, Recharts |
| **Stage 8: 7-Domain CSV Hub** | Templates & pre-flight validation for all 7 domains, duplicate suppression, demo reset | Python CSV Engine, pure JSON API |
| **Stage 9: Submission Verification** | 93 passing backend tests, clean Vite production bundle, 0 lint errors, complete documentation | Pytest, Vite, Oxlint |

---

## Student Success Score Engine & Mathematical Formulations

The Student Success Score is a positive, holistic index $S_{\text{success}} \in [0, 100]$ synthesized across all 7 operational domains:

$$S_{\text{success}} = \sum_{i \in \mathcal{P}} w_i' \cdot S_i$$

### 1. Domain Component Formulations ($S_i \in [0, 100]$)

- **Academic Performance ($S_{\text{acad}}$)**: Normalized from cumulative GPA:
  $$S_{\text{acad}} = \min\left(100.0, \max\left(0.0, \frac{\text{GPA}}{10.0} \times 100.0\right)\right)$$
- **Attendance Consistency ($S_{\text{att}}$)**: Directly measured from verified session telemetry:
  $$S_{\text{att}} = \min(100.0, \max(0.0, \text{Attendance Rate \%}))$$
- **LMS Digital Learning ($S_{\text{lms}}$)**:
  $$S_{\text{lms}} = 0.50 \cdot \text{Module Completion \%} + 0.50 \cdot \text{Assignments Submitted \%}$$
- **Placement Readiness ($S_{\text{place}}$)**:
  $$S_{\text{place}} = 0.35 \cdot \text{Coding Score} + 0.35 \cdot \text{Aptitude Score} + 0.30 \cdot \text{Mock Interview Score}$$
- **Skills & Certifications ($S_{\text{skills}}$)**:
  $$S_{\text{skills}} = 0.60 \cdot \text{Technical Score} + 0.40 \cdot \text{Soft Skills Score}$$
- **Campus Engagement ($S_{\text{eng}}$)**: Measured against standard 10-event benchmark:
  $$S_{\text{eng}} = \min\left(100.0, \frac{\text{Events Attended}}{10.0} \times 100.0\right)$$
- **Feedback & Mentorship ($S_{\text{feed}}$)**:
  $$S_{\text{feed}} = 0.60 \cdot \text{Faculty Sentiment} + 0.40 \cdot \text{Student Satisfaction}$$

### 2. Configured Weights ($\sum w_i = 1.00$)
$$w_{\text{acad}} = 0.25, \; w_{\text{att}} = 0.20, \; w_{\text{place}} = 0.15, \; w_{\text{lms}} = 0.15, \; w_{\text{skills}} = 0.10, \; w_{\text{eng}} = 0.10, \; w_{\text{feed}} = 0.05$$

### 3. Missing-Data Neutrality & Dynamic Weight Rescaling
When domain records are not available (e.g., first-year students prior to campus placement drives, or transfer students with unmigrated LMS telemetry):
$$\mathcal{P} = \{i \mid \text{domain } i \text{ has valid recorded telemetry}\}$$
$$w_i' = \frac{w_i}{\sum_{j \in \mathcal{P}} w_j}$$
Missing domains are **never imputed as zero**. Remaining observed domains are mathematically re-weighted to sum to $1.00$, ensuring total ethical fairness.

---

## Decoupled Dual Risk Engine (Academic & Placement)

A central innovation of EduNexus AI is the **strict decoupling of Academic Risk and Placement Risk**. In real university environments, students often excel in classroom exams while struggling with industry interview readiness (or vice versa). Mashing these into an averaged composite score hides critical intervention opportunities.

```
                    ACADEMIC RISK vs PLACEMENT RISK MATRIX
         ┌─────────────────────────────────┬─────────────────────────────────┐
         │ Quadrant II: Practical Prodigy  │ Quadrant I: Priority Support    │
         │ Low Academic, High Placement    │ High Academic, High Placement   │
         │ e.g. STU-002 (Coding 94%,       │ e.g. STU-003 (Low GPA,          │
HIGH     │ Att 73% Critical Statutory Alert│ Att 62%, Low Aptitude 50%)      │
         ├─────────────────────────────────┼─────────────────────────────────┤
PLACEMENT│ Quadrant IV: Dual On-Track      │ Quadrant III: Academic Star     │
RISK     │ Low Academic, Low Placement     │ High Academic, Low Placement    │
         │ e.g. STU-004 (Dean's List 9.2,  │ e.g. STU-001 (GPA 8.4,          │
LOW      │ Coding 92%, Ready for Day 1)    │ Coding 42%, 0 Mock Interviews)  │
         └─────────────────────────────────┴─────────────────────────────────┘
                        LOW <───────────────────────────> HIGH
                                  ACADEMIC RISK
```

### 1. Academic Risk Formulation ($R_{\text{acad}} \in [0, 100]$)
$$R_{\text{acad}} = 0.45 \cdot D_{\text{att}} + 0.40 \cdot D_{\text{gpa}} + 0.15 \cdot D_{\text{backlog}}$$
- **Statutory Attendance Cutoff**: If Attendance $< 75.0\%$, the student is immediately flagged with `requires_human_review = True` and **Critical Review** alert to ensure institutional regulatory compliance.

### 2. Placement Risk Formulation ($R_{\text{place}} \in [0, 100]$)
$$R_{\text{place}} = 0.40 \cdot D_{\text{coding}} + 0.35 \cdot D_{\text{aptitude}} + 0.25 \cdot D_{\text{interview}}$$
- **Zero Mock Interview Rule**: If `mock_interviews_attended == 0`, the student is flagged for urgent placement cell outreach (`requires_human_review = True`), regardless of test scores.

---

## Strategic Student Segmentation (5 Cohorts & Action Pathways)

To move beyond generic alerts into actionable institutional workflows, the engine segments every student into one of 5 strategic cohorts:

| Cohort | Defining Telemetry Criteria | Institutional Action Recommendation | Action Pathway |
|---|---|---|---|
| **High Achievers & Campus Champions** | Success Score $\ge 82.0$, Academic Risk = Low, Placement Risk = Low | Nominate for honors tracks, peer mentorship, and competitive fellowships | `enrichment` |
| **Academic Stars with Career Vulnerability** | Academic Risk = Low, Placement Risk $\ge$ High (or Coding $< 55\%$) | Enroll in coding bootcamps, resume critique, and mandatory mock interviews | `placement_bootcamp` |
| **Practical Prodigies with Exam Vulnerability** | Placement Risk = Low, Academic Risk $\ge$ High (or Attendance $< 75\%$) | Assign academic tutor, establish attendance contract, remedial coursework | `academic_support` |
| **Priority Holistic Support** | Academic Risk $\ge$ High **AND** Placement Risk $\ge$ High | Immediate multi-disciplinary intervention with dedicated faculty mentor | `holistic_intervention` |
| **Steady Emerging Potential** | Baseline progress across all indicators without critical variances | Encourage technical electives, domain certifications, skill workshops | `monitoring` |

---

## Intervention Management & Outcome Tracking

EduNexus AI provides a complete, human-reviewed intervention lifecycle:

```
[ Planned ] ──(Start Plan)──> [ In Progress ] ──(Complete Plan)──> [ Completed ]
     │                               │
     └──(Cancel)─────────────────────┴────────(Cancel)─────────> [ Cancelled ]
```

### Overdue Follow-up Detection
The system automatically compares each intervention's `follow_up_date` against current system date. When `follow_up_date < today` and the plan is not completed, it is highlighted with a high-visibility **Overdue Follow-up** badge in the directory, dashboard, and intervention hub.

### Outcome Trajectory Mathematics

When an intervention is completed or reviewed, advisors record baseline and follow-up metrics:

- **Absolute Change**:
  $$\Delta_{\text{abs}} = V_{\text{post}} - V_{\text{baseline}}$$
- **Percentage Change**:
  $$\Delta_{\text{pct}} = \text{round}\left(\frac{V_{\text{post}} - V_{\text{baseline}}}{V_{\text{baseline}}} \times 100, 1\right)$$

### Mandatory Non-Causation Disclaimer
Every outcome card and database response embeds:
> *"Observed changes correlate in time with the intervention but do not constitute mathematical proof of sole causation without controlled longitudinal evidence."*

---

## CSV Ingestion Engine & Demo Reset

The platform includes a dedicated **Data & CSV Hub** (`/csv-hub`) that enables administrators and evaluators to import bulk data safely without shell scripts.

### 1. Downloadable Schema Templates
- `students.csv`: Columns `student_id,first_name,last_name,email,current_grade,academic_term,section,department`
- `attendance.csv`: Columns `student_id,date,status,remarks`
- `assessments.csv`: Columns `student_id,subject,assessment_type,score,max_score,date`

### 2. Pre-Flight Validation Engine (`POST /api/v1/csv/preview`)
- **Row-level validation** with exact 1-indexed line numbers.
- **Relational integrity checks**: flags any attendance/assessment referencing a non-existent student code.
- **Score constraints**: validates that $0 \le \text{score} \le \text{max\_score}$ and rejects negative or exceeding marks.
- **Intra-file duplicate detection**: detects duplicate compound keys within the uploaded file.

### 3. Deduplication Strategies (`POST /api/v1/csv/import`)
- `skip` (default): skips existing compound records, importing only new data.
- `overwrite`: updates existing matching records.

### 4. One-Click Synthetic Demo Reset (`POST /api/v1/csv/reset-demo`)
Provides evaluators with an instant button to wipe experimental session records and restore the pristine **36-student verified baseline dataset**. This operation is strictly isolated to demo memory and never alters external production databases.

---

## Supabase Database Architecture & Security

The persistent database layer is designed for **Supabase PostgreSQL** (`supabase/migrations/`):

- **Primary Keys**: UUID v4 across all tables (`gen_random_uuid()`).
- **Foreign Keys**: Cascading constraints linking `attendance`, `assessments`, `engagement_events`, and `interventions` to `students(id)`.
- **Score Integrity**: Separate `score NUMERIC(5,2)` and `max_score NUMERIC(5,2)` with `CHECK (score >= 0 AND score <= max_score)`.
- **Row Level Security (RLS)**: Enabled across all tables with role-based policies (`admin`, `advisor`, `instructor`). Anonymous access is explicitly blocked.
- **Service-Role Isolation**: Privileged service-role keys are kept exclusively on the backend and never exposed to the client browser.

---

## Local Installation & Quickstart

### Prerequisites
- **Node.js** ≥ 18 (Tested on v24.15)
- **Python** ≥ 3.10 (Tested on 3.14)
- **Git**

### 1. Clone & Set Up Environment Files

```bash
git clone https://github.com/your-username/edunexus-ai.git
cd edunexus-ai

# Frontend environment
cp frontend/.env.example frontend/.env.local

# Backend environment
cp backend/.env.example backend/.env
```

### 2. Start the Backend (FastAPI)

```bash
cd backend

# Create virtual environment
python3 -m venv venv
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Run FastAPI with hot-reloading
uvicorn app.main:app --reload --port 8000
```

- **API Health Check**: [http://localhost:8000/health](http://localhost:8000/health)
- **Swagger Documentation**: [http://localhost:8000/docs](http://localhost:8000/docs)

### 3. Start the Frontend (Vite + React)

In a separate terminal window:

```bash
cd frontend

# Install dependencies
npm install

# Start Vite dev server
npm run dev
```

- **Frontend Application**: [http://localhost:5173](http://localhost:5173)

---

## Automated Test Suite

### Backend Unit & Integration Tests (93 Passed, 2 Skipped Live DB)

```bash
cd backend
python3 -m pytest -v
```

```
========================= 93 passed, 2 skipped, 1 warning in 0.28s =========================
```

Test coverage includes:
- `test_success_score_engine.py`: 0–100 positive Success Score index, weight sum invariants ($\sum w_i = 1.0$), missing-data neutrality with dynamic weight rescaling, boundary clamping ($0$ and $100$), and minimum domain telemetry gating.
- `test_dual_risk_engine.py`: Decoupled orthogonal risk evaluation, statutory $<75\%$ attendance cutoff rule, backlog threshold triggers, zero mock interview placement risk trigger, and decoupled quadrant validation.
- `test_segmentation_engine.py`: Rule-based classification for all 5 strategic cohorts (High Achievers, Academic Stars, Practical Prodigies, Priority Holistic Support, Steady Potential) with tailored institutional action pathways.
- `test_csv_service_7domains.py`: Template downloads, schema checking, range constraints ($[0, 100]$), integer validations, and 7-domain demo reset metrics.
- `test_csv_service.py`: Student registry, attendance, and assessment CSV ingestion with deduplication and row error reporting.
- `test_authorization.py`: Bearer token RBAC verification, anti-spoofing rejection of client role headers, student permission enforcement, and production environment guard.
- `test_risk_engine.py`: Baseline risk configuration invariants, boundary conditions, and human override lifecycle.
- `test_interventions_crud.py`: Lifecycle state transitions (Planned → In Progress → Completed / Cancelled), overdue calculation, delta calculations, and non-causation disclaimer enforcement.
- `test_schemas_validation.py`: Pydantic field validators, score boundary checks, date ordering, and audit events.
- `test_students_journey_api.py`: Search, filtering, sorting, pagination, and authorization enforcement.
- `test_db_integration.py`: Live Supabase connection tests (conditioned on `@pytest.mark.skipif` when running in isolated offline synthetic demo mode).

### Frontend Build & Lint Verification

```bash
cd frontend
npm run build   # Compiles TypeScript and creates optimized production bundle (Exit code 0)
npx oxlint      # Performs static analysis across all 47 frontend source files (0 errors)
```

---

## 5-Minute Evaluator Demo Tour for KPMG Judges

Follow these 5 steps in the browser to evaluate the complete end-to-end platform:

### Step 1: Executive Analytics Dashboard (`/`)
1. Open [http://localhost:5173](http://localhost:5173).
2. **7-Domain Campus Radar Fingerprint**: Review the Recharts Radar chart displaying average institutional capability across all 7 domains (Academic, Attendance, LMS, Engagement, Placement, Skills, Feedback).
3. **Placement Readiness KPI Card**: Inspect cohort aptitude ($78.5\%$), coding proficiency ($76.2\%$), mock interview completion ($1.9$ avg), and readiness tier distribution.
4. **Decoupled Dual-Risk Matrix**: Examine the 4-quadrant scatter distribution showing why academic performance and placement readiness must never be aggregated into an ambiguous single score.
5. **Strategic Student Segmentation Breakdown**: Review the 5 strategic student cohorts and click on any cohort (e.g. *Academic Stars with Career Vulnerability*) to filter the directory.

### Step 2: Student Directory & Multi-Criteria Search (`/students`)
1. Click **Students** in the navigation bar (`/students`).
2. Filter by **Cohort Segment**: Select *Academic Stars with Career Vulnerability* to view high-GPA students at risk of placement failure.
3. Sort by **Success Score**: Toggle descending to see campus champions ($90+/100$) or ascending for priority cases.
4. Observe the color-coded **Success Score** pill (`X/100`), **Cohort Segment** badge, and decoupled **Academic vs. Placement Risk** indicators on every row.
5. Click on **Aarav Sharma (`STU-001`)** or **Pooja Nair (`STU-002`)** to open their dossier.

### Step 3: Student Journey & Comprehensive 7-Domain Dossier (`/journey?student_id=STU-001`)
1. **0–100 Student Success Score Card**: Inspect Aarav's composite score ($66.4/100$), complete domain breakdown table, and the dynamic weight rescaling indicator confirming missing data was not penalized as zero.
2. **Decoupled Dual Risk Assessment**: Compare his **Low Academic Risk** ($22.4/100$) against his **Critical Placement Risk** ($83.2/100$ due to $42\%$ coding score and $0$ mock interviews).
3. **Strategic Cohort Classification Card**: View his assigned cohort (*Academic Stars with Career Vulnerability*) and recommended institutional action pathway (*Enroll in mandatory coding bootcamps & mock technical interviews*).
4. **7-Domain Radar Fingerprint**: Review his individual radar shape against the campus average.
5. **Chronological Journey Timeline**: Scroll to review dated academic marks, attendance sessions, and past interventions.

### Step 4: Interventions Hub & Outcome Delta Tracking (`/interventions`)
1. Click **Interventions** in the sidebar (`/interventions`).
2. Click **Overdue Follow-ups Only** to view support plans whose target review date has passed.
3. On an active plan, test the state machine: click **Start Plan** or **Complete**.
4. Click **Record Outcome**:
   - Enter Baseline ($55.0$) and Follow-up ($72.5$).
   - Observe the real-time delta preview ($+17.5$ pts absolute, $+31.8\%$ relative).
   - Review the mandatory **Ethical Non-Causation Disclaimer**.
   - Click **Save & Publish Outcome** to render the verified outcome comparison card.

### Step 5: 7-Domain Data Hub & CSV Ingestion (`/csv-hub`)
1. Click **Data Hub & CSV** in the sidebar (`/csv-hub`).
2. **Standard Templates**: Download templates for any of the 7 domains (*placement.csv*, *skills.csv*, *feedback.csv*, *lms.csv*, etc.).
3. **Interactive Validator**: Test upload with valid or invalid rows to view the line-numbered error table.
4. **1-Click Synthetic Demo Reset**: Click **Reset Synthetic Demo Data (1-Click)**. Observe the confirmation toast reporting restored counts across all 7 domains ($36$ students, $756$ attendance, $648$ assessments, $10$ placement, $10$ skills, $10$ feedback, $10$ LMS records).

---

## Known Limitations & Security Architecture

- **Dual-Mode Persistence Architecture**: In local clone/evaluator mode without live cloud credentials, the platform operates in a verified, high-performance in-memory synthetic mode backed by `data/synthetic_seed.json`. When live Supabase credentials (`SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY`) are populated, the service dynamically executes against PostgreSQL tables.
- **Backend-Enforced Authorization**: Privileged database credentials (`SUPABASE_SERVICE_ROLE_KEY`) are strictly confined to the backend and never exposed to the frontend browser or repository commits. Because service-role keys bypass PostgreSQL RLS at the engine level, all access control is enforced at the FastAPI application layer via `require_staff_user`.
- **Production Guard on Demo Authentication**: Evaluation demo tokens (`edunexus-demo-*-token`) are strictly isolated to evaluation/development mode and are automatically rejected with HTTP 401 when `ENVIRONMENT=production`.

---

## License

Developed for the **KPMG India Student Analytics Challenge**. All synthetic student records and scenarios are fictional and generated for educational demonstration purposes.
