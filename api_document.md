# EduNexus AI — REST API Documentation & Integration Specification

## 1. Executive Summary & Architecture Principles

The **EduNexus AI REST API** powers the student success intelligence platform, providing secure, deterministic, and explainable data endpoints for higher education institutions. The API serves both browser-based clients (React/Vite single-page applications) and external campus administrative systems (Student Information Systems, Learning Management Systems, and Career Placement Portals).

```
========================================================================================
                      EDUNEXUS AI API SUBSYSTEM AT A GLANCE
========================================================================================
  • Framework:                    FastAPI 0.115+ (Python 3.14 / 3.12 CI)
  • Base Routing Prefix:          /api/v1
  • Persistence Layer:            Supabase PostgreSQL 15+ with Row-Level Security (RLS)
  • Authentication:               Bearer JWT Tokens (Supabase Auth / Evaluation Personas)
  • Authorization Model:          Strict Role-Based Access Control (RBAC) + FERPA Isolation
  • Interactive Documentation:    Swagger UI at /docs • ReDoc at /redoc
  • Machine-Readable Spec:        OpenAPI 3.1.0 at /openapi.json
  • Verification Status:          161/161 Backend Tests Passed • 100% Pydantic v2 Compliant
========================================================================================
```

### Server Environments & Base URLs

| Environment | Base URL | Usage |
|---|---|---|
| **Local Development** | `http://localhost:8000` | Local developer workstation running Uvicorn server |
| **Alternative Local** | `http://127.0.0.1:8000` | Direct loopback IP interface |
| **Production (Render)**| `https://edunexus-ai-backend.onrender.com` | Live cloud deployment on Render |

### Global Routing Structure

All active production API endpoints are mounted under the `/api/v1` namespace, with the exception of root service health probes (`/health`, `/health/db`, and `/`):

```
/
├── /health                          (Root service liveness probe)
├── /health/db                       (Root database connectivity probe)
├── /docs                            (Interactive Swagger UI)
├── /redoc                           (Alternative ReDoc specification)
├── /openapi.json                    (Raw OpenAPI 3.1 JSON definition)
└── /api/v1
    ├── /health                      (V1 service readiness)
    ├── /health/db                   (V1 database probe)
    ├── /auth                        (Authentication & registration)
    ├── /dashboard                   (Executive KPIs & 7-domain analytics)
    ├── /students                    (Directory, journey dossiers, risk, success scores)
    ├── /interventions               (Support plans, lifecycle state machine, outcomes)
    └── /csv                         (Template generation, validation, ingestion, reset)
```

### Content Negotiation & Error Handling

* **Data Format**: All requests containing a body must supply `Content-Type: application/json`. All responses return `application/json` encoded in UTF-8.
* **Uniform Error Envelope**: When an error occurs (HTTP 4xx or 5xx), the server returns a structured JSON payload:
```json
{
  "detail": "Descriptive human-readable explanation of the validation or authorization failure",
  "code": "ERROR_CLASSIFICATION_CODE",
  "status_code": 400,
  "timestamp": "2026-10-24T18:00:00Z"
}
```

---

## 2. Authentication & Role-Based Access Control (RBAC)

Requests to protected endpoints must supply an HTTP `Authorization` header containing a valid Bearer token:

```http
Authorization: Bearer <access_token>
```

### 2.1 Role Hierarchy & Permissions

| Role | Target Persona | Permissions & Scope |
|---|---|---|
| `administrator` | Dean, Institutional Lead | Full platform access: directory, risk overrides, interventions, and raw CSV ingestion. |
| `advisor` | Academic Advisor | View all students, manage student support plans, execute risk overrides, track outcomes. |
| `faculty` | Course Instructor | View assigned student cohorts, record unit marks, log attendance, review outcomes. |
| `counselor` | Wellness & Attendance Officer| Manage attendance/wellness counseling interventions and review student timelines. |
| `auditor` | Compliance & Ethics Officer | Read-only access across student dossiers, intervention outcomes, and compliance audit events. |
| `student` | Enrolled Student | **Strictly Self-Scoped**: Allowed only to inspect their own dashboard (`/api/v1/students/me/dashboard`). Forbidden from accessing other student records. |

### 2.2 Institutional Demo Personas & Tokens

For institutional evaluation, testing, and offline demonstration, the backend recognizes fixed evaluation personas:

| Role | Evaluation Email | Evaluation Password | Assigned Demo Token |
|---|---|---|---|
| **Administrator** | `admin@edunexus.ai` | `EduNexus@2026!` | `edunexus-demo-admin-token` |
| **Academic Advisor** | `advisor@edunexus.ai` | `EduNexus@2026!` | `edunexus-demo-advisor-token` |
| **Faculty Member** | `faculty@edunexus.ai` | `EduNexus@2026!` | `edunexus-demo-faculty-token` |
| **Student** | `student@edunexus.ai` | `EduNexus@2026!` | `edunexus-demo-student-token` |

---

## 3. System & Health Endpoints

### 3.1 Service Health Check

`GET /health` or `GET /api/v1/health`

Verifies that the FastAPI process is responsive, returning version and environment metadata.
* **Authentication**: None (Public)
* **Response Model**: `HealthResponse`

#### Response: `200 OK`
```json
{
  "status": "healthy",
  "service": "EduNexus AI",
  "version": "0.1.0",
  "environment": "production",
  "timestamp": "2026-10-24T18:15:30.123456Z"
}
```

---

### 3.2 Live Database Probe

`GET /health/db` or `GET /api/v1/health/db`

Actively queries the Supabase PostgreSQL database to measure round-trip latency and detect enrolled student rows without disclosing credentials.
* **Authentication**: None (Public)
* **Response Model**: `DatabaseHealthResponse`

#### Response: `200 OK` (Connected)
```json
{
  "status": "healthy",
  "database": "Supabase PostgreSQL",
  "configured": true,
  "connected": true,
  "verified": true,
  "latency_ms": 34.2,
  "total_students_detected": 36,
  "message": "Supabase PostgreSQL live connection verified successfully",
  "environment": "production",
  "timestamp": "2026-10-24T18:15:30.567890Z"
}
```

#### Response: `200 OK` (Unconfigured / Prototype Demo Mode)
```json
{
  "status": "unconfigured",
  "database": "Supabase PostgreSQL",
  "configured": false,
  "connected": false,
  "verified": false,
  "latency_ms": null,
  "total_students_detected": null,
  "message": "Database credentials not configured in backend/.env",
  "environment": "development",
  "timestamp": "2026-10-24T18:15:30.567890Z"
}
```

---

### 3.3 Root Index

`GET /`

Returns root API information and quick links to documentation.
* **Authentication**: None (Public)

#### Response: `200 OK`
```json
{
  "name": "EduNexus AI",
  "version": "0.1.0",
  "status": "operational",
  "docs": "/docs",
  "health": "/health"
}
```

---

## 4. Authentication & Registration Endpoints

Base Path: `/api/v1/auth`

### 4.1 Register Institutional User

`POST /api/v1/auth/register`

Registers an institutional account directly in Supabase Auth using server-side administrative execution with auto-confirmation. Bypasses external SMTP rate limits, links student dossiers, and synchronizes `user_profiles` records.
* **Authentication**: None (Public registration)

#### Request Body
```json
{
  "email": "priya.sharma@institution.edu",
  "password": "StrongPassword2026!",
  "first_name": "Priya",
  "last_name": "Sharma",
  "role": "student",
  "department": "Computer Science & Engineering",
  "student_id": "STU-2026-088",
  "semester": "Semester 6"
}
```

| Field | Type | Required | Description |
|---|---|---|---|
| `email` | `string` | Yes | Institutional email address. |
| `password` | `string` | Yes | Minimum 6 characters. |
| `first_name` | `string` | Yes | First name. |
| `last_name` | `string` | Yes | Last name. |
| `role` | `string` | No | `'student'`, `'advisor'`, `'faculty'`, or `'admin'`. Default: `'advisor'`. |
| `department` | `string` | No | Academic department. Default: `'Computer Science & Engineering'`. |
| `student_id` | `string` | No | Institutional student roll code (e.g. `'STU-2026-088'`). |
| `semester` | `string` | No | Current academic term (e.g. `'Semester 6'`). |

#### Response: `200 OK`
```json
{
  "status": "success",
  "message": "Account created and verified successfully.",
  "user_id": "a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11",
  "email": "priya.sharma@institution.edu",
  "role": "student",
  "access_token": "edunexus-demo-student-token",
  "is_demo": false
}
```

---

### 4.2 Authenticate User (Login)

`POST /api/v1/auth/login`

Authenticates credentials against Supabase Auth, verified database records, or institutional evaluation presets.
* **Authentication**: None (Public)

#### Request Body
```json
{
  "email": "advisor@edunexus.ai",
  "password": "EduNexus@2026!",
  "role": "advisor"
}
```

#### Response: `200 OK`
```json
{
  "status": "success",
  "message": "Authenticated as Advisor.",
  "access_token": "edunexus-demo-advisor-token",
  "role": "advisor",
  "email": "advisor@edunexus.ai",
  "user_id": "demo-advisor",
  "is_demo": true
}
```

#### Error: `401 Unauthorized`
```json
{
  "detail": "Invalid email or password."
}
```

---

## 5. Executive Dashboard & Analytics Endpoints

Base Path: `/api/v1/dashboard`

### 5.1 Dashboard Overview Analytics

`GET /api/v1/dashboard/overview`

Returns aggregated cohort metrics, longitudinal trends, 7-domain radar averages, decoupled dual-risk matrices, and high-priority follow-up students.
* **Authentication**: Optional Bearer token (Returns safe synthetic evaluation data if unauthenticated)
* **Response Model**: `DashboardOverviewResponse`

#### Response: `200 OK`
```json
{
  "summary": {
    "total_students": 36,
    "active_students": 36,
    "average_success_score": 73.8,
    "requiring_review_count": 8,
    "review_percentage": 22.2,
    "average_attendance": 84.6,
    "attendance_status": "Above benchmark",
    "active_interventions_count": 14,
    "follow_ups_due_count": 5,
    "cohort_avg_score": 76.4
  },
  "domain_averages": {
    "academic": 76.4,
    "attendance": 84.6,
    "placement": 71.2,
    "lms": 78.5,
    "engagement": 69.3,
    "skills": 74.0,
    "feedback": 81.5
  },
  "risk_distribution": [
    {
      "tier": "low",
      "label": "Low Risk",
      "count": 18,
      "percentage": 50.0,
      "color": "#67E8F9",
      "description": "Stable academic and attendance trajectory."
    },
    {
      "tier": "moderate",
      "label": "Moderate Risk",
      "count": 10,
      "percentage": 27.8,
      "color": "#FCD34D",
      "description": "Emerging signals in 1-2 domains warranting advisor observation."
    },
    {
      "tier": "high",
      "label": "High Risk",
      "count": 6,
      "percentage": 16.7,
      "color": "#FDA4AF",
      "description": "Multiple overlapping vulnerabilities requiring targeted support."
    },
    {
      "tier": "critical",
      "label": "Critical Risk",
      "count": 2,
      "percentage": 5.5,
      "color": "#FDA4AF",
      "description": "Immediate intervention required."
    }
  ],
  "dual_risk_matrix": {
    "academic_low_placement_low": 16,
    "academic_low_placement_high": 4,
    "academic_high_placement_low": 3,
    "academic_high_placement_high": 3,
    "moderate_quadrants": 8,
    "insufficient_data": 2
  },
  "attendance_trend": [
    {
      "period": "Week 1",
      "attendance_rate": 88.5,
      "threshold": 80.0,
      "total_sessions": 180,
      "present_sessions": 159
    }
  ],
  "assessment_trend": [
    {
      "period": "Term 1",
      "average_score": 75.2,
      "subjects": {
        "Data Structures": 74.5,
        "Algorithms": 72.8,
        "Database Systems": 78.3
      }
    }
  ],
  "follow_up_students": [
    {
      "id": "0411a66b-943d-46d5-895d-28026b071aab",
      "student_id": "STU-001",
      "name": "Aarav Sharma",
      "grade": "3rd Year",
      "section": "A",
      "risk_level": "critical",
      "risk_score": 82.5,
      "primary_risk_factor": "Assessment scores declining across multiple subjects",
      "attendance_rate": 68.4,
      "avg_score": 58.2,
      "last_interaction": "2026-10-20",
      "assigned_advisor": "Dr. Rajesh Kumar",
      "status": "Needs Review"
    }
  ],
  "intervention_summary": {
    "total": 14,
    "planned": 3,
    "in_progress": 7,
    "under_review": 2,
    "completed": 2,
    "by_type": {
      "academic_tutoring": 5,
      "attendance_counseling": 4,
      "wellness_check": 3,
      "peer_mentoring": 2
    },
    "by_priority": {
      "urgent": 2,
      "high": 5,
      "medium": 5,
      "low": 2
    },
    "completion_rate": 14.3,
    "upcoming_follow_ups": 5
  },
  "metadata": {
    "is_demo": false,
    "data_source": "Supabase PostgreSQL Database",
    "dataset_size": 36,
    "generated_at": "2026-10-24T18:15:30Z",
    "disclaimer": "Metrics are computed deterministically. Support interventions reflect correlated observations."
  }
}
```

---

## 6. Student Directory & Journey Dossier Endpoints

Base Path: `/api/v1/students`

### 6.1 Authenticated Student Self Dashboard

`GET /api/v1/students/me/dashboard`

Returns the calling student's own academic progress, 7-domain breakdown, attendance, and support plans.
* **Authentication**: Required (`role = "student"`)
* **Privacy Boundary**: Students cannot query other students. Access is strictly scoped to `auth.uid()`.

#### Response: `200 OK`
```json
{
  "student": {
    "id": "0411a66b-943d-46d5-895d-28026b071aab",
    "student_id": "STU-001",
    "first_name": "Aarav",
    "last_name": "Sharma",
    "current_grade": "3rd Year",
    "academic_term": "Semester 6",
    "department": "Computer Science & Engineering",
    "cgpa": 7.42,
    "attendance_rate": 86.4
  },
  "success_score": {
    "score": 78.5,
    "tier": "proficient",
    "coverage_pct": 100.0,
    "domains": {
      "academic": 74.0,
      "attendance": 86.4,
      "placement": 70.0,
      "skills": 82.0,
      "lms": 80.0,
      "engagement": 75.0,
      "feedback": 82.0
    }
  },
  "recent_attendance": [
    { "session_date": "2026-10-24", "status": "present", "period": "full_day" }
  ],
  "recent_assessments": [
    { "title": "Data Structures Midterm", "score": 42.0, "max_score": 50.0, "subject": "CS301" }
  ]
}
```

---

### 6.2 Paginated Student Directory

`GET /api/v1/students`

Retrieves a paginated list of students with multi-parameter filtering, search, sorting, and computed summary indicators.
* **Authentication**: Staff Authorization Required (`advisor`, `faculty`, `administrator`, `auditor`)

#### Query Parameters

| Parameter | Type | Required | Default | Description |
|---|---|---|---|---|
| `search` | `string` | No | `null` | Searches student ID, first name, last name, email. |
| `department` | `string` | No | `null` | Filters by academic department name. |
| `semester` | `string` | No | `null` | Filters by term or semester string (e.g. `'Semester 6'`). |
| `risk_tier` | `string` | No | `null` | `'low'`, `'moderate'`, `'high'`, or `'critical'`. |
| `segment` | `string` | No | `null` | Strategic cohort identifier (e.g. `'academic_star_career_at_risk'`). |
| `academic_risk`| `string`| No | `null` | Filter by academic risk level (`'low'`, `'high'`). |
| `placement_risk`|`string`| No | `null` | Filter by placement risk level (`'low'`, `'high'`). |
| `success_min` | `float` | No | `0.0` | Minimum success score filter (0-100). |
| `success_max` | `float` | No | `100.0` | Maximum success score filter (0-100). |
| `sort_by` | `string` | No | `'student_id'`| Field to sort: `'student_id'`, `'name'`, `'risk'`, `'success_score'`. |
| `sort_dir` | `string` | No | `'asc'` | Sort direction: `'asc'` or `'desc'`. |
| `page` | `int` | No | `1` | Page number (1-based index). |
| `page_size` | `int` | No | `20` | Records per page (Max: `100`). |

#### Response: `200 OK`
```json
{
  "students": [
    {
      "id": "0411a66b-943d-46d5-895d-28026b071aab",
      "student_id": "STU-001",
      "first_name": "Aarav",
      "last_name": "Sharma",
      "email": "aarav.sharma@edunexus-demo.example",
      "department": "Computer Science & Engineering",
      "cgpa": 7.42,
      "backlogs": 0,
      "current_grade": "3rd Year",
      "academic_term": "Semester 6",
      "section": "A",
      "status": "active",
      "attendance_rate": 86.4,
      "created_at": "2026-10-11T05:59:46Z",
      "updated_at": "2026-10-24T12:00:00Z"
    }
  ],
  "total": 36,
  "page": 1,
  "page_size": 20,
  "departments": [
    "Computer Science & Engineering",
    "Electronics & Communication",
    "Commerce & Economics"
  ],
  "semesters": ["Semester 4", "Semester 6", "Semester 8"]
}
```

---

### 6.3 Student Journey Dossier

`GET /api/v1/students/{student_id}`

Retrieves the complete, authoritative student journey profile across all 7 operational domains, chronological timeline milestones, interventions, and risk scores.
* **Authentication**: Staff Authorization Required
* **Parameter**: `student_id` (UUID or institutional code `STU-001`)

#### Response: `200 OK`
```json
{
  "student": {
    "id": "0411a66b-943d-46d5-895d-28026b071aab",
    "student_id": "STU-001",
    "first_name": "Aarav",
    "last_name": "Sharma",
    "department": "Computer Science & Engineering",
    "cgpa": 7.42
  },
  "metrics": {
    "attendance_rate": 86.4,
    "academic_average": 74.0,
    "placement_readiness": 70.0,
    "technical_skills": 82.0,
    "soft_skills": 78.0,
    "lms_module_completion": 80.0
  },
  "success_score": {
    "success_score": 78.5,
    "success_tier": "proficient",
    "data_coverage_pct": 100.0,
    "available_domains_count": 7,
    "status": "COMPLETE"
  },
  "dual_risk": {
    "academic_risk": { "tier": "low", "score": 26.0 },
    "placement_risk": { "tier": "moderate", "score": 42.0 },
    "quadrant": "academic_low_placement_moderate"
  },
  "timeline": [
    {
      "id": "evt-01",
      "timestamp": "2026-10-22T10:00:00Z",
      "event_type": "academic",
      "title": "Algorithms Unit Test Graded",
      "description": "Scored 44/50 (88%). Consistently strong performance.",
      "severity": "success"
    }
  ],
  "active_interventions": []
}
```

---

### 6.4 Explainable Risk Breakdown

`GET /api/v1/students/{student_id}/risk`

Returns the algorithmic risk calculation, transparent feature contributions, and any active advisor override.
* **Authentication**: Staff Authorization Required

#### Response: `200 OK`
```json
{
  "student_id": "STU-001",
  "calculated_tier": "moderate",
  "effective_tier": "moderate",
  "is_overridden": false,
  "risk_score": 42.5,
  "factors": [
    {
      "metric": "mock_interview_score",
      "observed_value": 55.0,
      "threshold": 70.0,
      "severity": "moderate",
      "description": "Mock interview score below readiness threshold."
    }
  ],
  "override": null
}
```

---

### 6.5 7-Domain Success Score

`GET /api/v1/students/{student_id}/success-score`

Returns the detailed 0–100 Student Success Score, breakdown of domain weights, and missing domain handling.
* **Authentication**: Staff Authorization Required

#### Response: `200 OK`
```json
{
  "student_id": "STU-001",
  "success_score": 78.5,
  "success_tier": "proficient",
  "data_coverage_pct": 100.0,
  "available_domains_count": 7,
  "status": "COMPLETE",
  "missing_domains": [],
  "domain_breakdowns": [
    {
      "domain": "academic",
      "raw_score": 74.0,
      "assigned_weight": 0.25,
      "normalized_weight": 0.25,
      "weighted_contribution": 18.5,
      "is_missing": false
    },
    {
      "domain": "attendance",
      "raw_score": 86.4,
      "assigned_weight": 0.20,
      "normalized_weight": 0.20,
      "weighted_contribution": 17.28,
      "is_missing": false
    }
  ],
  "missing_data_notice": null
}
```

---

### 6.6 Chronological Journey Timeline

`GET /api/v1/students/{student_id}/timeline`

Returns an ordered chronological feed of student telemetry events, milestones, and intervention checkpoints.
* **Authentication**: Staff Authorization Required

#### Response: `200 OK`
```json
[
  {
    "id": "evt-101",
    "timestamp": "2026-10-24T09:30:00Z",
    "event_type": "attendance",
    "title": "Daily Attendance Logged",
    "description": "Marked Present for all scheduled periods.",
    "severity": "info"
  }
]
```

---

### 6.7 Human-in-the-Loop Advisor Risk Override

`POST /api/v1/students/{student_id}/override-risk`

Allows authorized staff to override an algorithmic risk classification. Requires a minimum 5-character justification.
* **Authentication**: Staff Authorization Required (`advisor`, `administrator`)

#### Request Body
```json
{
  "override_tier": "low",
  "override_reason": "Student recovered from verified medical leave; recent attendance 95%.",
  "reviewer_name": "Dr. Rajesh Kumar"
}
```

| Field | Type | Required | Description |
|---|---|---|---|
| `override_tier` | `string` | Yes | Target tier: `'low'`, `'moderate'`, `'high'`, `'critical'`. |
| `override_reason` | `string` | Yes | Minimum 5 characters justification. |
| `reviewer_name` | `string` | No | Staff member signing off on the change. |

#### Response: `200 OK`
```json
{
  "status": "success",
  "message": "Risk override saved successfully.",
  "student_id": "STU-001",
  "original_tier": "high",
  "override_tier": "low",
  "override_reason": "Student recovered from verified medical leave; recent attendance 95%.",
  "reviewed_by": "Dr. Rajesh Kumar",
  "reviewed_at": "2026-10-24T18:25:00Z"
}
```

---

### 6.8 Reset Risk Override

`DELETE /api/v1/students/{student_id}/override-risk`

Removes a human advisor override, returning the student's classification to the deterministic algorithm.
* **Authentication**: Staff Authorization Required (`advisor`, `administrator`)

#### Response: `200 OK`
```json
{
  "status": "success",
  "message": "Risk override cleared; returned to algorithmic tier.",
  "student_id": "STU-001"
}
```

---

## 7. Support Interventions & Outcomes Endpoints

Base Path: `/api/v1/interventions`

### 7.1 List Interventions

`GET /api/v1/interventions`

Returns a filtered list of intervention plans across students.
* **Authentication**: Staff Authorization Required

#### Query Parameters

| Parameter | Type | Required | Default | Description |
|---|---|---|---|---|
| `student_id` | `string` | No | `null` | Filters by student UUID or ID code. |
| `status` | `string` | No | `null` | `'planned'`, `'in_progress'`, `'completed'`, `'cancelled'`. |
| `priority` | `string` | No | `null` | `'low'`, `'medium'`, `'high'`, `'urgent'`. |
| `overdue_only` | `bool` | No | `false`| If true, returns only interventions past `follow_up_date`. |

#### Response: `200 OK`
```json
[
  {
    "id": "e2f1b4a0-71cd-4389-9830-1b2c3d4e5f6a",
    "student_id": "0411a66b-943d-46d5-895d-28026b071aab",
    "title": "Mathematics Tutoring Program",
    "intervention_type": "academic_tutoring",
    "priority": "high",
    "status": "in_progress",
    "description": "Bi-weekly peer tutoring in Advanced Calculus.",
    "goals": "Achieve >= 70% in upcoming Midterm 2.",
    "assigned_staff_name": "Prof. Meera Sen",
    "start_date": "2026-10-15",
    "target_completion_date": "2026-11-30",
    "follow_up_date": "2026-10-30",
    "outcomes": []
  }
]
```

---

### 7.2 Create Support Plan

`POST /api/v1/interventions`

Creates a new targeted support plan with chronological date validation.
* **Authentication**: Staff Authorization Required (`advisor`, `counselor`, `administrator`)

#### Request Body
```json
{
  "student_id": "0411a66b-943d-46d5-895d-28026b071aab",
  "title": "Attendance Accountability Contract",
  "intervention_type": "attendance_counseling",
  "priority": "high",
  "status": "planned",
  "description": "Weekly morning check-in meetings with advisor.",
  "goals": "Reach 85% attendance across the month of November.",
  "assigned_staff_name": "Dr. Rajesh Kumar",
  "start_date": "2026-10-25",
  "target_completion_date": "2026-11-25",
  "follow_up_date": "2026-11-01"
}
```

#### Response: `201 Created`
```json
{
  "id": "fa123b45-67c8-90de-f123-456789abcdef",
  "student_id": "0411a66b-943d-46d5-895d-28026b071aab",
  "title": "Attendance Accountability Contract",
  "intervention_type": "attendance_counseling",
  "priority": "high",
  "status": "planned",
  "description": "Weekly morning check-in meetings with advisor.",
  "goals": "Reach 85% attendance across the month of November.",
  "assigned_staff_name": "Dr. Rajesh Kumar",
  "start_date": "2026-10-25",
  "target_completion_date": "2026-11-25",
  "follow_up_date": "2026-11-01",
  "created_at": "2026-10-24T18:30:00Z",
  "updated_at": "2026-10-24T18:30:00Z"
}
```

---

### 7.3 Get Intervention Details

`GET /api/v1/interventions/{intervention_id}`

Retrieves a single intervention plan including associated before/after outcome records.
* **Authentication**: Staff Authorization Required

#### Response: `200 OK`
```json
{
  "id": "fa123b45-67c8-90de-f123-456789abcdef",
  "student_id": "0411a66b-943d-46d5-895d-28026b071aab",
  "title": "Attendance Accountability Contract",
  "status": "in_progress",
  "priority": "high",
  "outcomes": []
}
```

---

### 7.4 Update Intervention Plan

`PATCH /api/v1/interventions/{intervention_id}`

Updates status, notes, dates, or priority for an existing plan.
* **Authentication**: Staff Authorization Required

#### Request Body
```json
{
  "status": "completed",
  "actual_completion_date": "2026-11-20",
  "notes": "Student attended all 4 check-in sessions. Attendance improved to 88%."
}
```

#### Response: `200 OK`
```json
{
  "id": "fa123b45-67c8-90de-f123-456789abcdef",
  "status": "completed",
  "actual_completion_date": "2026-11-20"
}
```

---

### 7.5 Record Intervention Outcome

`POST /api/v1/interventions/{intervention_id}/outcomes`

Records a before-and-after quantitative metric delta. Enforces the mandatory ethical causation disclaimer.
* **Authentication**: Staff Authorization Required

#### Request Body
```json
{
  "metric_name": "attendance_percentage",
  "baseline_value": 68.0,
  "post_value": 88.0,
  "target_value": 85.0,
  "outcome_status": "improved",
  "evidence_notes": "Significant turnaround during the 4-week check-in cycle."
}
```

#### Response: `201 Created`
```json
{
  "id": "c1234567-89ab-cdef-0123-456789abcdef",
  "intervention_id": "fa123b45-67c8-90de-f123-456789abcdef",
  "metric_name": "attendance_percentage",
  "baseline_value": 68.0,
  "post_value": 88.0,
  "target_value": 85.0,
  "absolute_change": 20.0,
  "outcome_status": "improved",
  "evidence_notes": "Significant turnaround during the 4-week check-in cycle.",
  "causation_disclaimer": "Observed change reflects correlation during intervention interval; causal relationship not established without control study.",
  "measurement_date": "2026-10-24"
}
```

---

### 7.6 Delete Intervention

`DELETE /api/v1/interventions/{intervention_id}`

Deletes an intervention and cascades to all associated outcome records.
* **Authentication**: Staff Authorization Required (`advisor`, `administrator`)

#### Response: `200 OK`
```json
{
  "status": "success",
  "message": "Intervention and associated outcomes deleted successfully.",
  "id": "fa123b45-67c8-90de-f123-456789abcdef"
}
```

---

## 8. CSV Data Ingestion & Demo Hub Endpoints

Base Path: `/api/v1/csv`

### 8.1 Download CSV Format Templates

`GET /api/v1/csv/templates`

Downloads standard CSV templates across the 7 operational domains with column headers and sample rows.
* **Authentication**: None (Public)

#### Response: `200 OK`
```json
{
  "domains": [
    "academic", "attendance", "placement", "lms", "skills", "feedback", "engagement"
  ],
  "templates": {
    "students": "student_id,first_name,last_name,email,department,cgpa,backlogs\nSTU-001,Aarav,Sharma,aarav@example.com,Computer Science,7.42,0",
    "attendance": "student_id,session_date,period,status\nSTU-001,2026-10-24,full_day,present",
    "assessments": "student_id,title,subject,score,max_score,term\nSTU-001,Midterm 1,CS301,42.0,50.0,Term 1"
  }
}
```

---

### 8.2 Dry-Run Pre-Flight CSV Validation

`POST /api/v1/csv/validate`

Validates CSV file contents without modifying the database. Returns line-numbered errors and warnings.
* **Authentication**: Staff Authorization Required (`advisor`, `faculty`, `administrator`)

#### Request Body
```json
{
  "domain": "assessments",
  "csv_content": "student_id,title,subject,score,max_score,term\nSTU-001,Exam 1,CS101,55.0,50.0,Term 1"
}
```

#### Response: `200 OK` (Validation Errors Detected)
```json
{
  "valid": false,
  "total_rows": 1,
  "valid_rows_count": 0,
  "error_count": 1,
  "errors": [
    {
      "line": 2,
      "field": "score",
      "value": "55.0",
      "message": "Score (55.0) exceeds maximum allowable score (50.0)."
    }
  ]
}
```

---

### 8.3 Batch Upload CSV Records

`POST /api/v1/csv/upload`

Executes pre-flight validation and commits validated records into Supabase PostgreSQL within an atomic transaction.
* **Authentication**: Staff Authorization Required (`advisor`, `administrator`)

#### Request Body
```json
{
  "domain": "students",
  "csv_content": "student_id,first_name,last_name,email,department,cgpa,backlogs\nSTU-099,Kavya,Nair,kavya.nair@institution.edu,Computer Science,8.15,0"
}
```

#### Response: `200 OK`
```json
{
  "status": "success",
  "domain": "students",
  "records_inserted": 1,
  "records_updated": 0,
  "message": "CSV data ingested successfully into Supabase database."
}
```

---

### 8.4 1-Click Demo Reset

`POST /api/v1/csv/reset-demo`

Restores the demonstration database to its baseline synthetic state of 36 students across diverse risk trajectories.
* **Authentication**: Staff Authorization Required (`administrator`, `advisor`)

#### Response: `200 OK`
```json
{
  "status": "success",
  "message": "Demo data restored to initial baseline state (36 synthetic student profiles).",
  "dataset_size": 36
}
```

---

## 9. HTTP Status Codes & Error Handling Reference

### Standard Status Codes

| Code | Status | Meaning |
|---|---|---|
| `200 OK` | Success | The request succeeded and returned data. |
| `201 Created` | Created | Resource successfully created (e.g. intervention, outcome, user). |
| `400 Bad Request` | Client Error | Malformed request body, invalid dates, or business logic rejection. |
| `401 Unauthorized` | Auth Failure | Missing, malformed, or invalid Bearer authentication token. |
| `403 Forbidden` | Access Denied | Authenticated role lacks permission (e.g. Student calling Staff route). |
| `404 Not Found` | Not Found | Target student, intervention, or outcome ID does not exist. |
| `422 Unprocessable`| Validation | Pydantic schema validation failure (e.g. invalid types or missing fields). |
| `500 Server Error` | Server Error | Internal server exception or failed upstream database connection. |

### CORS Configuration

The API enables Cross-Origin Resource Sharing (CORS) with support for credentials:
* **Allowed Origins**: `http://localhost:5173`, `http://localhost:3000`, `http://127.0.0.1:5173`, and any `https://*.onrender.com` subdomain.
* **Allowed Headers**: `*` (Includes `Authorization`, `Content-Type`, `Accept`).
* **Allowed Methods**: `GET`, `POST`, `PATCH`, `DELETE`, `OPTIONS`.

### Client Integration Example (TypeScript / Axios)

```typescript
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000',
  timeout: 10000,
});

// Interceptor attaching Bearer token from localStorage
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('edunexus_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Fetch Student Journey Dossier
export async function getStudentJourney(studentId: string) {
  const response = await api.get(`/api/v1/students/${studentId}`);
  return response.data;
}
```
