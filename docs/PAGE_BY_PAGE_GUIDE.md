# Page-by-Page Guide

This guide documents the actual pages implemented in the current project and their verified runtime behavior.

## 0. Sign-in and authentication gate

### Route
- `/login`
- `/`
- `/students`
- `/journey`
- `/interventions`
- `/analytics`
- `/csv-hub`

### Files
- [frontend/src/pages/LoginPage.tsx](../frontend/src/pages/LoginPage.tsx)
- [frontend/src/App.tsx](../frontend/src/App.tsx)
- [frontend/src/context/AuthContext.tsx](../frontend/src/context/AuthContext.tsx)

### Verified behavior
- Unauthenticated users are redirected to the login page.
- Demo bearers and custom tokens can be entered and stored in browser session storage.
- Staff-only routes remain restricted to users with a staff role; student/demo users are limited to non-admin entry points.

### Status
- Verified and resolved in the current repository.

## 1. Application shell and navigation

### Route
- `/`
- `/students`
- `/journey`
- `/interventions`
- `/analytics`
- `/csv-hub`

### File
- [frontend/src/App.tsx](../frontend/src/App.tsx)
- [frontend/src/layouts/AppShell.tsx](../frontend/src/layouts/AppShell.tsx)

### Verified behavior
- Shared shell provides consistent navigation, header, sidebar, and page container.
- Active route is highlighted via NavLink state.
- Mobile menu and focus-visible states are present.
- Health status is displayed in the header through the API health hook.
- Invalid routes render the not-found page.

### Status
- Verified

## 2. Executive Dashboard

### Route
- `/`

### Files
- [frontend/src/pages/DashboardPage.tsx](../frontend/src/pages/DashboardPage.tsx)
- [frontend/src/hooks/useDashboardData.ts](../frontend/src/hooks/useDashboardData.ts)
- [backend/app/api/v1/dashboard.py](../backend/app/api/v1/dashboard.py)
- [backend/app/services/dashboard_service.py](../backend/app/services/dashboard_service.py)

### Purpose
Provides cohort-level overview and support prioritization.

### Verified features
- Exec summary cards are rendered from dashboard overview data.
- Risk distribution cards and summary metrics are present.
- Intervention and follow-up summary appear in the dashboard payload.
- Data source is annotated as synthetic or Supabase-backed in metadata.

### API path
- GET `/api/v1/dashboard/overview`
- Auth: protected by `verify_read_authorization`

### Status
- Verified

## 3. Student Directory

### Route
- `/students`

### Files
- [frontend/src/pages/StudentsPage.tsx](../frontend/src/pages/StudentsPage.tsx)
- [backend/app/api/v1/students.py](../backend/app/api/v1/students.py)

### Purpose
Lists students with search, filtering, pagination, sorting, and risk segmentation.

### Verified features
- Search by student code or name.
- Filters for department, semester, risk tier, segment, and success-score range.
- Stable sort fields are supported.
- Response envelope includes `students`, `total`, `page`, `page_size`, plus available filters.

### API path
- GET `/api/v1/students`
- Requires authorization via the verify-read dependency.

### Status
- Verified

## 4. Student Journey / Student Details

### Route
- `/journey`
- `/students/:id`
- `/journey/:id`

### Files
- [frontend/src/pages/StudentJourneyPage.tsx](../frontend/src/pages/StudentJourneyPage.tsx)
- [backend/app/api/v1/students.py](../backend/app/api/v1/students.py)

### Purpose
Detailed student profile with timeline, risk explanation, and intervention evidence.

### Verified features
- Student profile payload is shown on the journey page.
- Timeline and chronological data are used when present.
- Student-level risk explanation and overrides are part of the backend flow.
- The page handles invalid IDs and failed API responses gracefully.

### API path
- GET `/api/v1/students/{student_id}`
- GET `/api/v1/students/{student_id}/journey`
- GET `/api/v1/students/{student_id}/risk-explanation`

### Status
- Verified

## 5. Analytics and Segmentation

### Route
- `/analytics`

### Files
- [frontend/src/pages/AnalyticsPage.tsx](../frontend/src/pages/AnalyticsPage.tsx)
- [backend/app/services/segmentation_engine.py](../backend/app/services/segmentation_engine.py)

### Purpose
Cohort and segment-level analysis and charting.

### Verified features
- segmentation engine is implemented and referenced from analytics outputs.
- Dashboard payload includes segmentation distribution metadata and risk matrix data.

### Status
- Verified

## 6. Intervention Tracking

### Route
- `/interventions`

### Files
- [frontend/src/pages/InterventionsPage.tsx](../frontend/src/pages/InterventionsPage.tsx)
- [backend/app/api/v1/interventions.py](../backend/app/api/v1/interventions.py)

### Purpose
Create and review human-led support plans and outcome observations.

### Verified features
- Intervention list view is implemented.
- Intervention create/update/detail endpoints exist.
- Outcome calculations and disclaimers are included on the backend.
- Overdue detection is based on follow-up dates and status.

### API path
- GET `/api/v1/interventions`
- POST `/api/v1/interventions`
- GET `/api/v1/interventions/{id}`
- PATCH `/api/v1/interventions/{id}`
- POST `/api/v1/interventions/{id}/outcomes`

### Status
- Verified

## 7. Seven-domain CSV Hub

### Route
- `/csv-hub`

### Files
- [frontend/src/pages/CsvHubPage.tsx](../frontend/src/pages/CsvHubPage.tsx)
- [backend/app/api/v1/csv.py](../backend/app/api/v1/csv.py)
- [backend/app/services/csv_service.py](../backend/app/services/csv_service.py)

### Purpose
Upload, preview, validate, import, and reset demo data.

### Verified features
- Template download flow exists.
- Preview endpoint accepts raw CSV text.
- Import endpoint validates and commits data.
- Reset endpoint is registered as `/api/v1/csv/reset-demo`.
- Reset is protected via staff authorization.

### API path
- GET `/api/v1/csv/templates/{data_type}`
- POST `/api/v1/csv/preview`
- POST `/api/v1/csv/import`
- POST `/api/v1/csv/reset-demo`

### Status
- Verified

## 8. Authentication and role checks

### Files
- [backend/app/core/auth.py](../backend/app/core/auth.py)
- [frontend/src/lib/auth.ts](../frontend/src/lib/auth.ts)

### Verified behavior
- Backend verifies bearer tokens and rejects missing or malformed tokens.
- Staff role checks are enforced for mutating endpoints.
- Demo tokens are explicit and isolated to non-production conditions.

### Status
- Verified at backend level; frontend auth remains a thin session wrapper, not a full login experience.

## 9. Additional pages
No extra page routes beyond the ones above were identified in the active router.

## Final page status summary

| Page | Status |
|---|---|
| App Shell and navigation | Verified |
| Dashboard | Verified |
| Students | Verified |
| Student Journey | Verified |
| Analytics | Verified |
| Interventions | Verified |
| CSV Hub | Verified |
| Auth and role gating | Verified at backend |
