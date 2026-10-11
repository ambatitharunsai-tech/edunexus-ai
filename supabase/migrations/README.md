# EduNexus AI — Database Migrations & Supabase Setup Guide

This document describes how to apply database migrations, configure Row Level Security (RLS), and initialize the database schema in Supabase for **EduNexus AI**.

---

## 1. Where to Apply the SQL Migrations

Follow these exact steps in your **Supabase Dashboard**:

1. Log into your [Supabase Dashboard](https://supabase.com/dashboard).
2. Select your project (e.g. `edunexus-ai`).
3. In the left navigation sidebar, click on **SQL Editor** (icon: `>_`).
4. Click **+ New query** in the top bar.
5. Open the migration file:
   [`supabase/migrations/20261011000001_initial_schema.sql`](file:///Users/ambatitharunsai/edunexus-ai/supabase/migrations/20261011000001_initial_schema.sql)
6. Copy the entire contents of `20261011000001_initial_schema.sql` and paste them into the SQL Editor.
7. Click the green **Run** button (or press `Cmd + Enter` / `Ctrl + Enter`).
8. Verify that the output pane reports: `Success. No rows returned`.

---

## 2. Supabase Settings to Configure

### A. Authentication & Providers
In the Supabase Dashboard, go to **Authentication** -> **Providers**:
- **Email**: Ensure **Email provider** is toggled **ON**.
- **Confirm email**: For local prototyping, you can toggle **Confirm email** to **OFF** under *Auth -> Providers -> Email -> Email Auth* to avoid waiting for email confirmations during testing.

### B. API Settings
Go to **Project Settings** (gear icon) -> **API**:
- Note your **Project URL** (e.g., `https://abcdefghijklm.supabase.co`).
- Note your **Project API keys**:
  - `anon` / `public`: Publishable key (safe for browser frontend).
  - `service_role`: Secret key (privileged backend access only; bypasses RLS for batch tasks and seed scripts).

> [!CAUTION]
> **SECURITY MANDATE**:
> - Never commit `.env` or `.env.local` to git.
> - Never paste your `service_role` secret key into chat, issues, or frontend code.
> - The `service_role` key must reside ONLY in `backend/.env`.

---

## 3. Environment Variables Required

### Backend (`backend/.env`)
Copy `backend/.env.example` to `backend/.env` and update:
```env
PROJECT_NAME="EduNexus AI"
API_V1_STR="/api/v1"
ENVIRONMENT="development"
DEBUG=true

# CORS Allowed Origins
ALLOWED_ORIGINS="http://localhost:5173,http://localhost:3000,http://127.0.0.1:5173"

# Supabase Server-Side Credentials (Obtain from Project Settings -> API)
SUPABASE_URL="https://your-project-id.supabase.co"
SUPABASE_SERVICE_ROLE_KEY="your-supabase-service-role-key-here"
```

### Frontend (`frontend/.env.local`)
Copy `frontend/.env.example` to `frontend/.env.local` and update:
```env
# Backend API Base URL
VITE_API_BASE_URL="http://localhost:8000"

# Supabase Client Configuration (Public anon key ONLY)
VITE_SUPABASE_URL="https://your-project-id.supabase.co"
VITE_SUPABASE_ANON_KEY="your-supabase-anon-key-here"
```

---

## 4. Database Schema Overview

| Table | Purpose | Primary Key | Key Constraints |
|-------|---------|-------------|-----------------|
| `user_profiles` | RBAC for advisors, counselors, faculty, admins | UUID | Role enum, active flag |
| `students` | Core student directory & demographics | UUID | `student_id UNIQUE`, status check |
| `attendance` | Daily attendance session status | UUID | `UNIQUE(student_id, session_date, period)` |
| `assessments` | Graded unit marks | UUID | `score <= max_score`, `score >= 0` |
| `engagement_events` | Extracurricular, LMS logins, counseling logs | UUID | `duration_minutes >= 0`, JSONB metadata |
| `interventions` | Student support plans | UUID | Priority check, date chronology check |
| `intervention_outcomes` | Before/after metric comparison | UUID | Mandatory causation disclaimer |
| `audit_events` | Access and mutation compliance trail | UUID | Performed by, entity reference |

---

## 5. Security & Row-Level Security (RLS) Model

1. **Anonymous Deny**: Anonymous (`anon`) role has **zero** access policies. Unauthenticated users cannot read or write student data.
2. **Staff Access Only**: Authenticated requests must belong to an active profile in `user_profiles` (`is_authenticated_staff()`).
3. **Audit Isolation**: Only users with `administrator` or `auditor` roles can read `audit_events`.
4. **Backend Ingestion**: The backend uses the `service_role` key exclusively for privileged server-side operations (batch risk scoring, CSV imports, synthetic seeding), completely isolating credentials from browser clients.
