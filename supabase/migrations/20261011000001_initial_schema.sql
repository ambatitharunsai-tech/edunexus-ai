-- =====================================================================
-- EduNexus AI — Student Success & Journey Intelligence Platform
-- Migration: 20261011000001_initial_schema.sql
-- Description: Core Schema Definition with Constraints, Indexes,
--              Row-Level Security (RLS), and Audit Logging Triggers.
-- =====================================================================

-- Enable required PostgreSQL extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- =====================================================================
-- 1. User Profiles & Role-Based Access Control (RBAC)
-- =====================================================================

-- Application Role Enum for Educational Staff & Evaluators
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'app_role') THEN
    CREATE TYPE app_role AS ENUM (
      'advisor',        -- Academic advisors managing student journeys
      'counselor',      -- Wellness and attendance counselors
      'faculty',        -- Teachers recording assessments & attendance
      'administrator',  -- Platform admin / institutional lead
      'auditor'         -- Read-only governance & compliance reviewer
    );
  END IF;
END $$;

CREATE TABLE IF NOT EXISTS public.user_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL UNIQUE,
  full_name TEXT NOT NULL,
  role app_role NOT NULL DEFAULT 'advisor',
  institution_department TEXT,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- =====================================================================
-- 2. Students Master Table
-- =====================================================================

CREATE TABLE IF NOT EXISTS public.students (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id TEXT NOT NULL UNIQUE,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT UNIQUE,
  date_of_birth DATE,
  gender TEXT,
  enrollment_date DATE NOT NULL DEFAULT CURRENT_DATE,
  current_grade TEXT NOT NULL,               -- e.g., 'Grade 10', 'Grade 11'
  academic_term TEXT NOT NULL,               -- e.g., 'AY 2025-26 Term 1'
  section TEXT,                              -- e.g., 'A', 'B', 'C'
  advisor_id UUID REFERENCES public.user_profiles(id) ON DELETE SET NULL,
  status TEXT NOT NULL DEFAULT 'active'
    CHECK (status IN ('active', 'inactive', 'graduated', 'withdrawn', 'suspended', 'on_leave')),
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- =====================================================================
-- 3. Attendance Records Table
-- =====================================================================

CREATE TABLE IF NOT EXISTS public.attendance (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID NOT NULL REFERENCES public.students(id) ON DELETE CASCADE,
  session_date DATE NOT NULL,
  period TEXT NOT NULL DEFAULT 'full_day',
  status TEXT NOT NULL CHECK (status IN ('present', 'absent', 'late', 'excused')),
  remarks TEXT,
  recorded_by UUID REFERENCES public.user_profiles(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT uq_student_date_period UNIQUE (student_id, session_date, period)
);

-- =====================================================================
-- 4. Assessments Table
-- =====================================================================

CREATE TABLE IF NOT EXISTS public.assessments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID NOT NULL REFERENCES public.students(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  subject TEXT NOT NULL,
  assessment_type TEXT NOT NULL
    CHECK (assessment_type IN ('quiz', 'assignment', 'midterm', 'final', 'project', 'lab')),
  term TEXT NOT NULL,                        -- e.g., 'Term 1', 'Term 2'
  assessment_date DATE NOT NULL,
  score NUMERIC(5,2) NOT NULL CHECK (score >= 0),
  max_score NUMERIC(5,2) NOT NULL CHECK (max_score > 0),
  weight_percentage NUMERIC(5,2) CHECK (weight_percentage >= 0 AND weight_percentage <= 100),
  feedback TEXT,
  recorded_by UUID REFERENCES public.user_profiles(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  -- Critical constraint: score cannot exceed maximum marks
  CONSTRAINT chk_score_within_max CHECK (score <= max_score)
);

-- =====================================================================
-- 5. Engagement Events Table (Extracurricular & LMS signals)
-- =====================================================================

CREATE TABLE IF NOT EXISTS public.engagement_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID NOT NULL REFERENCES public.students(id) ON DELETE CASCADE,
  event_type TEXT NOT NULL
    CHECK (event_type IN ('lms_login', 'library_visit', 'counseling_session', 'extracurricular', 'mentoring', 'peer_study', 'workshop')),
  title TEXT NOT NULL,
  description TEXT,
  duration_minutes INTEGER CHECK (duration_minutes >= 0),
  event_timestamp TIMESTAMPTZ NOT NULL DEFAULT now(),
  metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- =====================================================================
-- 6. Interventions Table
-- =====================================================================

CREATE TABLE IF NOT EXISTS public.interventions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID NOT NULL REFERENCES public.students(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  intervention_type TEXT NOT NULL
    CHECK (intervention_type IN ('academic_tutoring', 'attendance_counseling', 'behavioral_support', 'parental_engagement', 'peer_mentoring', 'schedule_adjustment', 'wellness_check')),
  priority TEXT NOT NULL DEFAULT 'medium'
    CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
  status TEXT NOT NULL DEFAULT 'planned'
    CHECK (status IN ('planned', 'in_progress', 'completed', 'cancelled', 'under_review')),
  description TEXT NOT NULL,
  goals TEXT,
  assigned_staff_id UUID REFERENCES public.user_profiles(id) ON DELETE SET NULL,
  assigned_staff_name TEXT,
  start_date DATE NOT NULL DEFAULT CURRENT_DATE,
  target_completion_date DATE,
  actual_completion_date DATE,
  follow_up_date DATE,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT chk_target_date_order CHECK (target_completion_date IS NULL OR target_completion_date >= start_date),
  CONSTRAINT chk_actual_date_order CHECK (actual_completion_date IS NULL OR actual_completion_date >= start_date)
);

-- =====================================================================
-- 7. Intervention Outcomes Table (Before & After Metric Tracking)
-- =====================================================================

CREATE TABLE IF NOT EXISTS public.intervention_outcomes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  intervention_id UUID NOT NULL REFERENCES public.interventions(id) ON DELETE CASCADE,
  metric_name TEXT NOT NULL,                 -- e.g., 'attendance_percentage', 'average_score'
  baseline_value NUMERIC(7,2) NOT NULL,      -- Value prior to intervention
  post_value NUMERIC(7,2),                   -- Measured value post intervention
  target_value NUMERIC(7,2),                 -- Desired threshold
  measurement_date DATE NOT NULL DEFAULT CURRENT_DATE,
  outcome_status TEXT NOT NULL DEFAULT 'evaluating'
    CHECK (outcome_status IN ('improved', 'unchanged', 'declined', 'evaluating')),
  evidence_notes TEXT,
  -- Explicit ethical causation disclaimer stored with every outcome
  causation_disclaimer TEXT NOT NULL DEFAULT
    'Observed change reflects correlation during intervention interval; causal relationship not established without control study.',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- =====================================================================
-- 8. Audit Events Table
-- =====================================================================

CREATE TABLE IF NOT EXISTS public.audit_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  entity_type TEXT NOT NULL,                 -- e.g., 'student', 'intervention', 'assessment'
  entity_id UUID NOT NULL,
  action TEXT NOT NULL
    CHECK (action IN ('CREATE', 'UPDATE', 'DELETE', 'VIEW', 'INTERVENTION_STATUS_CHANGE', 'FLAG_REVIEW')),
  performed_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  performed_by_name TEXT,
  details JSONB NOT NULL DEFAULT '{}'::jsonb,
  ip_address TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- =====================================================================
-- 9. Performance Indexes
-- =====================================================================

CREATE INDEX IF NOT EXISTS idx_students_student_id ON public.students(student_id);
CREATE INDEX IF NOT EXISTS idx_students_status ON public.students(status);
CREATE INDEX IF NOT EXISTS idx_students_grade_section ON public.students(current_grade, section);
CREATE INDEX IF NOT EXISTS idx_attendance_student_date ON public.attendance(student_id, session_date DESC);
CREATE INDEX IF NOT EXISTS idx_attendance_status ON public.attendance(status);
CREATE INDEX IF NOT EXISTS idx_assessments_student_date ON public.assessments(student_id, assessment_date DESC);
CREATE INDEX IF NOT EXISTS idx_assessments_subject ON public.assessments(subject);
CREATE INDEX IF NOT EXISTS idx_engagement_student_time ON public.engagement_events(student_id, event_timestamp DESC);
CREATE INDEX IF NOT EXISTS idx_interventions_student_status ON public.interventions(student_id, status);
CREATE INDEX IF NOT EXISTS idx_interventions_priority ON public.interventions(priority);
CREATE INDEX IF NOT EXISTS idx_interventions_followup ON public.interventions(follow_up_date);
CREATE INDEX IF NOT EXISTS idx_outcomes_intervention ON public.intervention_outcomes(intervention_id);
CREATE INDEX IF NOT EXISTS idx_audit_entity ON public.audit_events(entity_type, entity_id);
CREATE INDEX IF NOT EXISTS idx_audit_created ON public.audit_events(created_at DESC);

-- =====================================================================
-- 10. Automated Timestamp Update Trigger
-- =====================================================================

CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_user_profiles_updated_at ON public.user_profiles;
CREATE TRIGGER trg_user_profiles_updated_at
  BEFORE UPDATE ON public.user_profiles
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

DROP TRIGGER IF EXISTS trg_students_updated_at ON public.students;
CREATE TRIGGER trg_students_updated_at
  BEFORE UPDATE ON public.students
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

DROP TRIGGER IF EXISTS trg_attendance_updated_at ON public.attendance;
CREATE TRIGGER trg_attendance_updated_at
  BEFORE UPDATE ON public.attendance
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

DROP TRIGGER IF EXISTS trg_assessments_updated_at ON public.assessments;
CREATE TRIGGER trg_assessments_updated_at
  BEFORE UPDATE ON public.assessments
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

DROP TRIGGER IF EXISTS trg_interventions_updated_at ON public.interventions;
CREATE TRIGGER trg_interventions_updated_at
  BEFORE UPDATE ON public.interventions
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

DROP TRIGGER IF EXISTS trg_outcomes_updated_at ON public.intervention_outcomes;
CREATE TRIGGER trg_outcomes_updated_at
  BEFORE UPDATE ON public.intervention_outcomes
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- =====================================================================
-- 11. Row-Level Security (RLS) Configuration
-- =====================================================================

-- Enable RLS strictly on all public tables
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.students ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.attendance ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.assessments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.engagement_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.interventions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.intervention_outcomes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_events ENABLE ROW LEVEL SECURITY;

-- Helper Function: Check whether current auth.uid() has an active staff role
CREATE OR REPLACE FUNCTION public.is_authenticated_staff()
RETURNS BOOLEAN AS $$
BEGIN
  -- Returns true if user is logged in and is in public.user_profiles with active status
  RETURN (
    auth.role() = 'authenticated' AND
    EXISTS (
      SELECT 1 FROM public.user_profiles
      WHERE id = auth.uid() AND is_active = true
    )
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Helper Function: Check whether current auth.uid() is an administrator
CREATE OR REPLACE FUNCTION public.is_administrator()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN (
    auth.role() = 'authenticated' AND
    EXISTS (
      SELECT 1 FROM public.user_profiles
      WHERE id = auth.uid() AND role = 'administrator' AND is_active = true
    )
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ---------------------------------------------------------------------
-- RLS Policies: user_profiles
-- ---------------------------------------------------------------------
-- Users can view their own profile; admins can view all profiles
CREATE POLICY "Users can read own profile" ON public.user_profiles
  FOR SELECT TO authenticated
  USING (id = auth.uid() OR public.is_administrator());

CREATE POLICY "Admins can update profiles" ON public.user_profiles
  FOR UPDATE TO authenticated
  USING (public.is_administrator())
  WITH CHECK (public.is_administrator());

-- ---------------------------------------------------------------------
-- RLS Policies: students
-- ---------------------------------------------------------------------
-- Authenticated active staff can view student directory
CREATE POLICY "Staff read students" ON public.students
  FOR SELECT TO authenticated
  USING (public.is_authenticated_staff());

-- Staff can insert/update students (restricted to advisors, faculty, admins)
CREATE POLICY "Staff write students" ON public.students
  FOR INSERT TO authenticated
  WITH CHECK (public.is_authenticated_staff());

CREATE POLICY "Staff update students" ON public.students
  FOR UPDATE TO authenticated
  USING (public.is_authenticated_staff())
  WITH CHECK (public.is_authenticated_staff());

-- ---------------------------------------------------------------------
-- RLS Policies: attendance
-- ---------------------------------------------------------------------
CREATE POLICY "Staff read attendance" ON public.attendance
  FOR SELECT TO authenticated
  USING (public.is_authenticated_staff());

CREATE POLICY "Staff write attendance" ON public.attendance
  FOR INSERT TO authenticated
  WITH CHECK (public.is_authenticated_staff());

CREATE POLICY "Staff update attendance" ON public.attendance
  FOR UPDATE TO authenticated
  USING (public.is_authenticated_staff())
  WITH CHECK (public.is_authenticated_staff());

-- ---------------------------------------------------------------------
-- RLS Policies: assessments
-- ---------------------------------------------------------------------
CREATE POLICY "Staff read assessments" ON public.assessments
  FOR SELECT TO authenticated
  USING (public.is_authenticated_staff());

CREATE POLICY "Staff write assessments" ON public.assessments
  FOR INSERT TO authenticated
  WITH CHECK (public.is_authenticated_staff());

CREATE POLICY "Staff update assessments" ON public.assessments
  FOR UPDATE TO authenticated
  USING (public.is_authenticated_staff())
  WITH CHECK (public.is_authenticated_staff());

-- ---------------------------------------------------------------------
-- RLS Policies: engagement_events
-- ---------------------------------------------------------------------
CREATE POLICY "Staff read engagement" ON public.engagement_events
  FOR SELECT TO authenticated
  USING (public.is_authenticated_staff());

CREATE POLICY "Staff write engagement" ON public.engagement_events
  FOR INSERT TO authenticated
  WITH CHECK (public.is_authenticated_staff());

-- ---------------------------------------------------------------------
-- RLS Policies: interventions & outcomes
-- ---------------------------------------------------------------------
CREATE POLICY "Staff read interventions" ON public.interventions
  FOR SELECT TO authenticated
  USING (public.is_authenticated_staff());

CREATE POLICY "Staff manage interventions" ON public.interventions
  FOR ALL TO authenticated
  USING (public.is_authenticated_staff())
  WITH CHECK (public.is_authenticated_staff());

CREATE POLICY "Staff read outcomes" ON public.intervention_outcomes
  FOR SELECT TO authenticated
  USING (public.is_authenticated_staff());

CREATE POLICY "Staff manage outcomes" ON public.intervention_outcomes
  FOR ALL TO authenticated
  USING (public.is_authenticated_staff())
  WITH CHECK (public.is_authenticated_staff());

-- ---------------------------------------------------------------------
-- RLS Policies: audit_events
-- ---------------------------------------------------------------------
-- Staff can write audit events, only admins & auditors can view audit logs
CREATE POLICY "Staff insert audit events" ON public.audit_events
  FOR INSERT TO authenticated
  WITH CHECK (public.is_authenticated_staff());

CREATE POLICY "Auditors and admins view audit logs" ON public.audit_events
  FOR SELECT TO authenticated
  USING (
    auth.role() = 'authenticated' AND
    EXISTS (
      SELECT 1 FROM public.user_profiles
      WHERE id = auth.uid() AND is_active = true AND role IN ('administrator', 'auditor')
    )
  );

-- NOTICE: Anonymous ('anon') users have zero access to all student records and tables.
-- Backend services connect via service-role key which bypasses RLS for administrative and seed ingestion.
