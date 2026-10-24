# EduNexus AI — Team Work Plan & Workstream Responsibilities

**Project**: EduNexus AI — Student Success & Journey Intelligence Platform  
**Challenge**: KPMG India — *"Smart Campus Analytics: Predict, Optimize & Improve Student Success"*  
**Repository Lead / GitHub Admin**: `ambatitharunsai-tech`  
**Date**: October 2026  

---

## 1. Executive Summary & Challenge Alignment

EduNexus AI is organized into four complementary engineering workstreams to ensure parallel development without merge conflicts or overlapping domain boundaries. Each workstream maps directly to the KPMG evaluation criteria:

| Evaluation Domain | Weight | Primary Driving Workstream(s) |
|---|---|---|
| **Data Integration & Analysis** | **30%** | Workstream 2 (Data Integration) |
| **Success Score & Risk Identification** | **25%** | Workstream 3 (Analytics Engine) |
| **Dashboard & Visualization** | **25%** | Workstream 1 (Tech Lead / Full-Stack) & Workstream 3 |
| **Problem Understanding** | **10%** | All Workstreams (Guided by Tech Lead) |
| **Presentation & Evaluator Demo** | **10%** | Workstream 4 (QA & Presentation) |

---

## 2. Team Roster & Workstream Ownership

> **Note**: Team member placeholders (`[Member Name / @handle]`) should be updated with actual GitHub usernames upon accepting repository invitations.

| Workstream | Lead Owner | Secondary / Pair | Key Branches |
|---|---|---|---|
| **1. Technical Lead** | `ambatitharunsai-tech` (Lead) | `[Member Name / @handle]` | `main` |
| **2. Data Integration** | `[Member Name / @handle]` | `[Member Name / @handle]` | `feature/data-integration` |
| **3. Analytics Engine** | `[Member Name / @handle]` | `[Member Name / @handle]` | `feature/success-score`, `feature/risk-analysis` |
| **4. QA & Presentation** | `[Member Name / @handle]` | `[Member Name / @handle]` | `feature/testing-demo` |

---

## 3. Workstream Detailed Breakdowns

### Workstream 1: Technical Lead & Architecture
- **Owner**: `ambatitharunsai-tech`
- **Primary Goal**: Maintain architectural integrity, system stability, API contracts, database governance, and high-quality code reviews.
- **Key Responsibilities**:
  1. **Architecture & API Governance**: Enforce clean layer separation (FastAPI routers $\rightarrow$ business services $\rightarrow$ data repositories). Maintain OpenAPI contracts (`/docs`).
  2. **Code Review & Release Gatekeeping**: Serve as mandatory reviewer on all pull requests targeting `main`. Ensure zero regressions in backend test suite (86+ passing tests).
  3. **Security & Credentials**: Protect database service-role credentials and API tokens. Audit PostgreSQL Row Level Security (RLS) policies.
  4. **Merge & Conflict Resolution**: Coordinate cross-stream dependencies and resolve any structural integration bottlenecks.

---

### Workstream 2: Data Integration & Ingestion
- **Owner**: `[Member Name / @handle]`
- **Primary Goal**: Ingest, validate, and persist data across all 7 student-telemetry domains defined by the KPMG challenge.
- **Evaluation Impact**: Directly satisfies the **30% Data Integration & Analysis** scoring weight.
- **The Seven Student Data Domains**:
  1. **Academic Performance**: Course codes, assessment scores ($0 \le score \le max\_score$), semester GPA/CGPA.
  2. **Attendance Records**: Date-stamped sessions, status (`present`, `absent`, `excused`, `late`), cohort percentage tracking.
  3. **LMS Engagement**: Portal login frequency, module progress percentages, assignment submission timestamps.
  4. **Campus Engagement**: Extracurricular activities, committee participation, mentoring sessions, student club roles.
  5. **Placement & Career Readiness**: Mock interview scores, aptitude assessment percentiles, resume verification status, internship history.
  6. **Technical & Soft Skills**: Evaluated skill domains (e.g. Python, SQL, Communication, Problem Solving), proficiency levels ($1-5$).
  7. **Student Sentiment & Feedback**: Student survey feedback, advisor sentiment tags, wellbeing and satisfaction ratings.
- **Key Responsibilities**:
  1. Maintain CSV ingestion engine (`backend/app/services/csv_service.py`) and pre-flight validation.
  2. Provide downloadable, schema-validated CSV templates for all 7 domains in `/csv-hub`.
  3. Implement line-numbered validation error reporting (highlighting row, column, and constraint violated).
  4. Maintain synthetic seed generation (`data/synthetic_seed.json`) and 1-click evaluator demo reset.
  5. Ensure zero real student PII is introduced; synthetic records only.

---

### Workstream 3: Analytics, Success Score & Risk Engine
- **Owner**: `[Member Name / @handle]`
- **Primary Goal**: Deliver deterministic, mathematically explainable student risk metrics, multi-dimensional success scores, and intelligent student segmentation.
- **Evaluation Impact**: Directly satisfies the **25% Success Score & Risk Identification** scoring weight.
- **Key Responsibilities**:
  1. **Student Success Score Engine**:
     - Maintain composite formula integrating academic standing, attendance consistency, skill competency, and placement readiness.
     - Generate domain breakdown scores ($0-100$) for spider/radar visualization.
  2. **Dual-Risk Engine (Academic & Placement Risk)**:
     - Compute independent Academic Risk Index and Placement Risk Index.
     - Provide transparent factor decomposition ($w_i \cdot D_i$) with status classifications (`Normal`, `Under Observation`, `Critical Variance`).
  3. **Student Segmentation (Quadrant Model)**:
     - Categorize students into actionable cohorts:
       - *High Potential / Ready*: High academic performance, high placement readiness.
       - *Academic Support Needed*: Low academic performance, reasonable career skills.
       - *Placement Acceleration Needed*: High academic performance, low placement readiness.
       - *Comprehensive Intervention Needed*: At-risk across both dimensions.
  4. **Advisor Override & Human-in-the-Loop Lifecycle**:
     - Maintain immutable separation between computed scores and advisor-assigned review tiers.
     - Record mandatory audit trail (advisor ID, timestamp, documented rationale).

---

### Workstream 4: QA, Testing, Evaluator Demo & Presentation
- **Owner**: `[Member Name / @handle]`
- **Primary Goal**: Ensure bulletproof stability, complete test coverage, reproducible bug reports, and an impressive live demonstration for KPMG evaluators.
- **Evaluation Impact**: Directly satisfies the **10% Problem Understanding** and **10% Presentation & Demo** scoring weights.
- **Key Responsibilities**:
  1. **Automated Testing & Bug Verification**:
     - Verify and expand backend test suite (`pytest -v`).
     - Test frontend edge cases: responsive layout on desktop/tablet, missing telemetry banners, empty states.
  2. **Reproducible Issue Logging**:
     - Log all discovered bugs using GitHub Issue templates with reproduction steps, expected vs. actual behavior, and environment info.
  3. **Evaluator Demo Script**:
     - Rehearse and refine the 5-minute judge walkthrough (`README.md` Section 9).
     - Ensure the 1-click synthetic demo reset (`POST /api/v1/csv/reset-demo`) reliably resets state for fresh evaluations.
  4. **Slide Deck & Pitch Deliverables**:
     - Prepare presentation deck highlighting the business problem, architectural commitments (Zero Fake ML, Missing Data Neutrality), and KPMG criteria alignment.

---

## 4. Cross-Stream Communication & Daily Protocols

To prevent communication silos and ensure rapid iteration:

1. **Async Daily Check-In (Slack / Discord / Teams)**:
   - What did you complete yesterday?
   - What will you deliver today?
   - Are you blocked by any API contract or schema change?
2. **Contract-First Changes**:
   - Any modification to Pydantic schemas (`backend/app/schemas/`) or API endpoints (`backend/app/api/v1/`) must be discussed with the Tech Lead **before** implementation.
3. **PR Turnaround SLA**:
   - Reviews must be conducted within 4 hours during active hackathon sprint hours.
4. **Branch Protection**:
   - Force-pushing to `main` is disabled.
   - Deleting remote branches requires explicit approval.
