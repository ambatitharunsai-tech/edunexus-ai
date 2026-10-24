# File-by-File Guide

This guide records the purpose, responsibilities, and observed usage of the primary files in the repository.

## Frontend

### [frontend/src/App.tsx](../frontend/src/App.tsx)
- Purpose: Application entry point and route registration.
- Responsibilities: Declares the browser router, wraps routes in the auth provider, adds the login route, and enforces the protected app shell and staff-only route guards.
- Active usage: Verified through the app build and route definitions.

### [frontend/src/pages/LoginPage.tsx](../frontend/src/pages/LoginPage.tsx)
- Purpose: Authentication entry screen.
- Responsibilities: Presents demo-role sign-in options and a custom bearer-token input, then stores the authenticated session before redirecting to the shell.
- Active usage: Used as the entry gate for unauthenticated sessions.

### [frontend/src/layouts/AppShell.tsx](../frontend/src/layouts/AppShell.tsx)
- Purpose: Shared application shell and navigation.
- Responsibilities: Sidebar navigation, header, API health badge, page title derivation, mobile menu, and outlet layout.
- Active usage: Verified via the router and UI rendering.

### [frontend/src/lib/api.ts](../frontend/src/lib/api.ts)
- Purpose: Centralized HTTP client.
- Responsibilities: Adds bearer tokens from local session state, handles JSON fetch calls, and surfaces backend error details.
- Active usage: Used by dashboard, students, interventions, and CSV pages.

### [frontend/src/lib/auth.ts](../frontend/src/lib/auth.ts)
- Purpose: Client-side session utilities and auth normalization.
- Responsibilities: Session storage, role detection, token parsing, and helper functions for demo auth.
- Active usage: Verified as the current session layer for frontend state.

### [frontend/src/context/AuthContext.tsx](../frontend/src/context/AuthContext.tsx)
- Purpose: React auth context provider.
- Responsibilities: Stores authenticated session, exposes sign-in/sign-out helpers, and provides role-based visibility.
- Active usage: Used by the app shell and future UI gating.

### [frontend/src/pages/DashboardPage.tsx](../frontend/src/pages/DashboardPage.tsx)
- Purpose: Executive dashboard screen.
- Responsibilities: KPI cards, student success score overview, risk distributions, recent activity, intervention summary, and cohort analytics.
- Active usage: Uses [frontend/src/hooks/useDashboardData.ts](../frontend/src/hooks/useDashboardData.ts).

### [frontend/src/pages/StudentsPage.tsx](../frontend/src/pages/StudentsPage.tsx)
- Purpose: Student directory.
- Responsibilities: Search, filters, sorting, pagination, and directory entry navigation.
- Active usage: Calls the students list API.

### [frontend/src/pages/StudentJourneyPage.tsx](../frontend/src/pages/StudentJourneyPage.tsx)
- Purpose: Student detail/journey profile.
- Responsibilities: Student metrics, timeline events, intervention history, and risk explanations.
- Active usage: Calls the student detail and journey endpoints.

### [frontend/src/pages/InterventionsPage.tsx](../frontend/src/pages/InterventionsPage.tsx)
- Purpose: Intervention management page.
- Responsibilities: Lists interventions, creates new plans, and updates records.
- Active usage: Calls the interventions API.

### [frontend/src/pages/AnalyticsPage.tsx](../frontend/src/pages/AnalyticsPage.tsx)
- Purpose: Analytics view and segmented cohort reporting.
- Responsibilities: Dashboard analytics presentation and trend views.
- Active usage: Uses dashboard data and analytics cards.

### [frontend/src/pages/CsvHubPage.tsx](../frontend/src/pages/CsvHubPage.tsx)
- Purpose: CSV import and demo reset workflow.
- Responsibilities: Template download, preview, import, and reset-demo actions.
- Active usage: Calls the CSV API routes.

## Backend

### [backend/app/main.py](../backend/app/main.py)
- Purpose: FastAPI app factory and root endpoints.
- Responsibilities: CORS setup, health endpoint, root endpoint, and router inclusion.
- Active usage: Verified by startup and tests.

### [backend/app/api/v1/__init__.py](../backend/app/api/v1/__init__.py)
- Purpose: Versioned router aggregator.
- Responsibilities: Registers dashboard, students, interventions, and CSV APIs.
- Active usage: Verified via API registration.

### [backend/app/api/v1/dashboard.py](../backend/app/api/v1/dashboard.py)
- Purpose: Dashboard endpoint.
- Responsibilities: Returns the executive overview payload.
- Active usage: Called by frontend dashboard hooks.

### [backend/app/api/v1/students.py](../backend/app/api/v1/students.py)
- Purpose: Student directory and profile API.
- Responsibilities: Search, filter, list, journey retrieval, and student-level risk explanation.
- Active usage: Used by Students and Student Journey pages.

### [backend/app/api/v1/interventions.py](../backend/app/api/v1/interventions.py)
- Purpose: Support-intervention API.
- Responsibilities: CRUD and lifecycle handling, overdue flags, and outcome enrichment.
- Active usage: Verified by tests and UI pages.

### [backend/app/api/v1/csv.py](../backend/app/api/v1/csv.py)
- Purpose: CSV route layer.
- Responsibilities: Template delivery, preview validation, import, and reset-demo endpoint.
- Active usage: Used by the CSV Hub UI.

### [backend/app/core/auth.py](../backend/app/core/auth.py)
- Purpose: Bearer-token authentication and RBAC.
- Responsibilities: Validates demo tokens and institution-issued JWTs; restricts staff-only mutation routes.
- Active usage: Used by protected endpoints.

### [backend/app/services/dashboard_service.py](../backend/app/services/dashboard_service.py)
- Purpose: Dashboard aggregation service.
- Responsibilities: Merges student metrics, computes aggregated data, and builds the dashboard response object.
- Active usage: Used by dashboard API.

### [backend/app/services/success_score_engine.py](../backend/app/services/success_score_engine.py)
- Purpose: Student Success Score engine.
- Responsibilities: Computes a positive 0–100 score with missing-data weight rescaling.
- Active usage: Called by student directory and dashboard logic.

### [backend/app/services/segmentation_engine.py](../backend/app/services/segmentation_engine.py)
- Purpose: Cohort segmentation engine.
- Responsibilities: Assigns one of the documented cohort labels based on student metrics.
- Active usage: Used by student-analytics and dashboard flows.

### [backend/app/services/csv_service.py](../backend/app/services/csv_service.py)
- Purpose: CSV validation and import logic.
- Responsibilities: Template generation, validation, deduplication, import, and synthetic reset.
- Active usage: Used by CSV API routes.

### [backend/app/services/database_service.py](../backend/app/services/database_service.py)
- Purpose: domain service integration layer.
- Responsibilities: Low-level data access and reusable domain operations.
- Active usage: Confirmed by code and tests.

### [backend/app/db/client.py](../backend/app/db/client.py)
- Purpose: Supabase connection configuration and live DB detection.
- Responsibilities: Determines whether persistent DB mode is configured.
- Active usage: Used by services to decide between live DB and demo mode.

## Tests

### [backend/tests/test_dashboard_api.py](../backend/tests/test_dashboard_api.py)
- Purpose: Dashboard and directory API verification.
- Active usage: Verified pass status via pytest.

### [backend/tests/test_authorization.py](../backend/tests/test_authorization.py)
- Purpose: Authorization boundary checks.
- Active usage: Verified pass status via pytest.

### [backend/tests/test_interventions_crud.py](../backend/tests/test_interventions_crud.py)
- Purpose: Intervention lifecycle behavior.
- Active usage: Verified pass status via pytest.

### [backend/tests/test_csv_service.py](../backend/tests/test_csv_service.py)
- Purpose: Basic CSV validation and reset flows.
- Active usage: Verified via pytest.

### [backend/tests/test_success_score_engine.py](../backend/tests/test_success_score_engine.py)
- Purpose: Success score rules and boundary conditions.
- Active usage: Verified via pytest.

## Documentation

### [README.md](../README.md)
- Purpose: Project overview and install guide.
- Status: Present and broadly aligned with the working repo.

### [docs/TEAM_WORK_PLAN.md](./TEAM_WORK_PLAN.md)
- Purpose: project work plan and goals.
- Status: Supplemental planning doc.

### [docs/GITHUB_ISSUES_PLAN.md](./GITHUB_ISSUES_PLAN.md)
- Purpose: feature planning and issue traceability.
- Status: Supplemental planning doc.

## Notable unused/secondary files
These files appear to be support modules and are not required as immediate runtime blockers, but they are part of the active repo structure and should be treated as valid project code until explicitly retired or refactored.

- [backend/app/services/dataset_service.py](../backend/app/services/dataset_service.py)
- [backend/app/services/history_service.py](../backend/app/services/history_service.py)
- [backend/app/services/student_analytics_service.py](../backend/app/services/student_analytics_service.py)
- [backend/app/db/repositories](../backend/app/db/repositories)
- [supabase/migrations](../supabase/migrations)
