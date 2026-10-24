# API Contracts

This document records the API contracts actually implemented in the repository and the frontend callers that use them.

## Health and system endpoints

### GET /health
- File: [backend/app/main.py](../backend/app/main.py)
- Response model: `HealthResponse`
- Auth requirement: None
- Verified usage: health hook in [frontend/src/hooks/useHealth.ts](../frontend/src/hooks/useHealth.ts)

### GET /
- File: [backend/app/main.py](../backend/app/main.py)
- Response: basic service metadata
- Auth requirement: None

## Dashboard endpoints

### GET /api/v1/dashboard/overview
- File: [backend/app/api/v1/dashboard.py](../backend/app/api/v1/dashboard.py)
- Response model: `DashboardOverviewResponse`
- Auth: `verify_read_authorization`
- Frontend caller: [frontend/src/hooks/useDashboardData.ts](../frontend/src/hooks/useDashboardData.ts)
- Status: Verified

## Student endpoints

### GET /api/v1/students
- File: [backend/app/api/v1/students.py](../backend/app/api/v1/students.py)
- Query parameters:
  - `search`
  - `department`
  - `semester`
  - `risk_tier`
  - `segment`
  - `academic_risk`
  - `placement_risk`
  - `success_min`
  - `success_max`
  - `sort_by`
  - `sort_dir`
  - `page`
  - `page_size`
- Response: `StudentListEnvelope`
- Auth: verify-read guard
- Frontend callers: [frontend/src/pages/StudentsPage.tsx](../frontend/src/pages/StudentsPage.tsx)
- Status: Verified

### GET /api/v1/students/{student_id}
- File: [backend/app/api/v1/students.py](../backend/app/api/v1/students.py)
- Response: `StudentJourneyProfileResponse`
- Auth: verify-read guard
- Frontend callers: [frontend/src/pages/StudentJourneyPage.tsx](../frontend/src/pages/StudentJourneyPage.tsx)
- Status: Verified

### GET /api/v1/students/{student_id}/risk-explanation
- File: [backend/app/api/v1/students.py](../backend/app/api/v1/students.py)
- Auth: verify-read guard
- Response: risk explanation + override state
- Status: Verified

## Intervention endpoints

### GET /api/v1/interventions
- File: [backend/app/api/v1/interventions.py](../backend/app/api/v1/interventions.py)
- Query parameters:
  - `student_id`
  - `status`
  - `priority`
  - `overdue_only`
- Response: list of `InterventionWithOutcomes`
- Auth: staff/verified-read guard
- Frontend callers: [frontend/src/pages/InterventionsPage.tsx](../frontend/src/pages/InterventionsPage.tsx)
- Status: Verified

### POST /api/v1/interventions
- File: [backend/app/api/v1/interventions.py](../backend/app/api/v1/interventions.py)
- Request model: `InterventionCreate`
- Response: `InterventionWithOutcomes`
- Auth: `require_staff_user`
- Status: Verified

### GET /api/v1/interventions/{intervention_id}
- File: [backend/app/api/v1/interventions.py](../backend/app/api/v1/interventions.py)
- Response: single intervention with outcomes
- Auth: verify-read guard
- Status: Verified

### PATCH /api/v1/interventions/{intervention_id}
- File: [backend/app/api/v1/interventions.py](../backend/app/api/v1/interventions.py)
- Request model: `InterventionUpdate`
- Auth: staff permission
- Status: Verified

### POST /api/v1/interventions/{intervention_id}/outcomes
- File: [backend/app/api/v1/interventions.py](../backend/app/api/v1/interventions.py)
- Request model: `OutcomeCreate`
- Response: `OutcomeInDB`
- Auth: staff permission
- Status: Verified

## CSV endpoints

### GET /api/v1/csv/templates/{data_type}
- File: [backend/app/api/v1/csv.py](../backend/app/api/v1/csv.py)
- Response: CSV template file
- Auth: staff requirement on preview/import/reset; template is currently public by route design in code
- Frontend caller: [frontend/src/pages/CsvHubPage.tsx](../frontend/src/pages/CsvHubPage.tsx)
- Status: Verified

### POST /api/v1/csv/preview
- File: [backend/app/api/v1/csv.py](../backend/app/api/v1/csv.py)
- Request: `CsvPreviewRequest`
- Response: `CsvPreviewResponse`
- Auth: `require_staff_user`
- Status: Verified

### POST /api/v1/csv/import
- File: [backend/app/api/v1/csv.py](../backend/app/api/v1/csv.py)
- Request: `CsvImportPayload`
- Response: `CsvImportResult`
- Auth: `require_staff_user`
- Status: Verified

### POST /api/v1/csv/reset-demo
- File: [backend/app/api/v1/csv.py](../backend/app/api/v1/csv.py)
- Response: reset confirmation
- Auth: `require_staff_user`
- Status: Verified

## Authentication contract

### Bearer token validation
- File: [backend/app/core/auth.py](../backend/app/core/auth.py)
- Behavior:
  - Accepts a valid Bearer token.
  - Rejects malformed Authorization headers.
  - Rejects invalid or expired tokens with 401.
  - Rejects unauthorized roles with 403.

### Demo approval rules
- Demo tokens are only functional in evaluation/demo conditions.
- The backend blocks demo tokens in production and persistent database modes.

## Known contract caveats
- The frontend `api.ts` attaches a token from the local storage session helper when present.
- The real contract should stay anchored to the backend Pydantic schema, not the browser or stale docs.
- The canonical demo reset route is `/api/v1/csv/reset-demo`; older documentation that mentions another route should be treated as stale unless a live server verifies it.

## Status summary

| Endpoint | Status |
|---|---|
| /health | Verified |
| /api/v1/dashboard/overview | Verified |
| /api/v1/students | Verified |
| /api/v1/students/{id} | Verified |
| /api/v1/interventions | Verified |
| /api/v1/csv/preview | Verified |
| /api/v1/csv/import | Verified |
| /api/v1/csv/reset-demo | Verified |
| auth and RBAC | Verified |
