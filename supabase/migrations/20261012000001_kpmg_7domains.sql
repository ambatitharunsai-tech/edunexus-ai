-- =====================================================================
-- EduNexus AI — KPMG Challenge: Smart Campus Analytics 7-Domain Schema
-- Migration: 20261012000001_kpmg_7domains.sql
-- Description: Extends schema to cover Placement, Skills, Feedback, and
--              LMS telemetry with RLS, audit triggers, and integrity constraints.
-- =====================================================================

-- 1. Placement Readiness Telemetry Table
CREATE TABLE IF NOT EXISTS public.placement_records (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID NOT NULL REFERENCES public.students(id) ON DELETE CASCADE,
  aptitude_score NUMERIC(5, 2) NOT NULL CHECK (aptitude_score >= 0 AND aptitude_score <= 100),
  coding_score NUMERIC(5, 2) NOT NULL CHECK (coding_score >= 0 AND coding_score <= 100),
  mock_interview_score NUMERIC(5, 2) NOT NULL CHECK (mock_interview_score >= 0 AND mock_interview_score <= 100),
  resume_score NUMERIC(5, 2) DEFAULT 75.0 CHECK (resume_score >= 0 AND resume_score <= 100),
  readiness_tier TEXT NOT NULL DEFAULT 'developing'
    CHECK (readiness_tier IN ('not_ready', 'developing', 'placement_ready', 'advanced_hire')),
  mock_interviews_attended INT NOT NULL DEFAULT 1 CHECK (mock_interviews_attended >= 0),
  evaluated_at DATE NOT NULL DEFAULT CURRENT_DATE,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_placement_student_id ON public.placement_records(student_id);
CREATE INDEX IF NOT EXISTS idx_placement_evaluated_at ON public.placement_records(evaluated_at);

-- 2. Student Skills & Competencies Table
CREATE TABLE IF NOT EXISTS public.skills_records (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID NOT NULL REFERENCES public.students(id) ON DELETE CASCADE,
  technical_score NUMERIC(5, 2) NOT NULL CHECK (technical_score >= 0 AND technical_score <= 100),
  soft_skills_score NUMERIC(5, 2) NOT NULL CHECK (soft_skills_score >= 0 AND soft_skills_score <= 100),
  certifications_count INT NOT NULL DEFAULT 0 CHECK (certifications_count >= 0),
  verified_skills JSONB NOT NULL DEFAULT '[]'::jsonb,
  last_assessed_date DATE NOT NULL DEFAULT CURRENT_DATE,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_skills_student_id ON public.skills_records(student_id);

-- 3. Feedback & Sentiment Evaluations Table
CREATE TABLE IF NOT EXISTS public.feedback_records (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID NOT NULL REFERENCES public.students(id) ON DELETE CASCADE,
  faculty_sentiment NUMERIC(5, 2) NOT NULL CHECK (faculty_sentiment >= 0 AND faculty_sentiment <= 100),
  student_satisfaction NUMERIC(5, 2) NOT NULL CHECK (student_satisfaction >= 0 AND student_satisfaction <= 100),
  mentor_notes TEXT,
  academic_term TEXT NOT NULL,
  recorded_at DATE NOT NULL DEFAULT CURRENT_DATE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_feedback_student_id ON public.feedback_records(student_id);

-- 4. LMS Activity & Digital Learning Telemetry Table
CREATE TABLE IF NOT EXISTS public.lms_activity_records (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID NOT NULL REFERENCES public.students(id) ON DELETE CASCADE,
  weekly_login_count INT NOT NULL DEFAULT 0 CHECK (weekly_login_count >= 0),
  module_completion_pct NUMERIC(5, 2) NOT NULL CHECK (module_completion_pct >= 0 AND module_completion_pct <= 100),
  assignments_submitted_pct NUMERIC(5, 2) NOT NULL CHECK (assignments_submitted_pct >= 0 AND assignments_submitted_pct <= 100),
  forum_posts_count INT NOT NULL DEFAULT 0 CHECK (forum_posts_count >= 0),
  last_login_date DATE,
  recorded_at DATE NOT NULL DEFAULT CURRENT_DATE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_lms_student_id ON public.lms_activity_records(student_id);

-- =====================================================================
-- 5. Row-Level Security (RLS) Policies
-- =====================================================================

ALTER TABLE public.placement_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skills_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.feedback_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lms_activity_records ENABLE ROW LEVEL SECURITY;

-- Read policies for authenticated staff
CREATE POLICY "Authenticated staff can view placement records"
  ON public.placement_records FOR SELECT TO authenticated USING (true);

CREATE POLICY "Authenticated staff can manage placement records"
  ON public.placement_records FOR ALL TO authenticated USING (true);

CREATE POLICY "Authenticated staff can view skills records"
  ON public.skills_records FOR SELECT TO authenticated USING (true);

CREATE POLICY "Authenticated staff can manage skills records"
  ON public.skills_records FOR ALL TO authenticated USING (true);

CREATE POLICY "Authenticated staff can view feedback records"
  ON public.feedback_records FOR SELECT TO authenticated USING (true);

CREATE POLICY "Authenticated staff can manage feedback records"
  ON public.feedback_records FOR ALL TO authenticated USING (true);

CREATE POLICY "Authenticated staff can view lms records"
  ON public.lms_activity_records FOR SELECT TO authenticated USING (true);

CREATE POLICY "Authenticated staff can manage lms records"
  ON public.lms_activity_records FOR ALL TO authenticated USING (true);
