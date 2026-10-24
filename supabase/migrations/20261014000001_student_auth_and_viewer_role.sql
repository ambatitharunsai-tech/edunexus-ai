-- =====================================================================
-- EduNexus AI — Migration: 20261014000001_student_auth_and_viewer_role.sql
-- Description: Extends RBAC roles (viewer, data_operator), adds student
--              self-service RLS policies, links student authentication,
--              and configures safe user provisioning triggers.
-- =====================================================================

BEGIN;

-- 1. Extend app_role enum safely if not already present
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_enum
    JOIN pg_type ON pg_enum.enumtypid = pg_type.oid
    WHERE pg_type.typname = 'app_role' AND pg_enum.enumlabel = 'viewer'
  ) THEN
    ALTER TYPE app_role ADD VALUE 'viewer';
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_enum
    JOIN pg_type ON pg_enum.enumtypid = pg_type.oid
    WHERE pg_type.typname = 'app_role' AND pg_enum.enumlabel = 'data_operator'
  ) THEN
    ALTER TYPE app_role ADD VALUE 'data_operator';
  END IF;
END $$;

-- 2. Add user_id reference to students table for direct auth.users mapping
ALTER TABLE public.students
  ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL;

CREATE INDEX IF NOT EXISTS idx_students_user_id ON public.students(user_id);
CREATE INDEX IF NOT EXISTS idx_students_email ON public.students(email);

-- 3. Helper function: Determine if authenticated user owns the student record
CREATE OR REPLACE FUNCTION public.is_student_owner(p_student_id UUID)
RETURNS BOOLEAN
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public, pg_temp AS $$
  SELECT (
    auth.role() = 'authenticated'
    AND (
      -- Explicit student claim in app_metadata
      COALESCE(auth.jwt()->'app_metadata'->>'role', '') = 'student'
      OR COALESCE(auth.jwt()->'user_metadata'->>'role', '') = 'student'
      OR NOT EXISTS (SELECT 1 FROM public.user_profiles WHERE id = auth.uid())
    )
    AND EXISTS (
      SELECT 1 FROM public.students s
      WHERE s.id = p_student_id
        AND (
          s.user_id = auth.uid()
          OR (auth.jwt()->'app_metadata'->>'student_id' IS NOT NULL AND s.student_id = auth.jwt()->'app_metadata'->>'student_id')
          OR (auth.jwt()->>'email' IS NOT NULL AND lower(s.email) = lower(auth.jwt()->>'email'))
        )
    )
  );
$$;

-- 4. Update is_authenticated_staff to support data_operator and alias roles
CREATE OR REPLACE FUNCTION public.is_authenticated_staff()
RETURNS BOOLEAN
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public, pg_temp AS $$
  SELECT auth.role() = 'authenticated'
    AND auth.jwt()->'app_metadata'->>'role' IN (
      'administrator', 'admin', 'advisor', 'counselor', 'faculty', 'staff', 'data_operator'
    )
    AND EXISTS (
      SELECT 1 FROM public.user_profiles
      WHERE id = auth.uid() AND is_active
        AND role IN ('administrator', 'advisor', 'counselor', 'faculty', 'data_operator')
    );
$$;

-- 5. Update can_read_student_data to support auditor and viewer
CREATE OR REPLACE FUNCTION public.can_read_student_data()
RETURNS BOOLEAN
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public, pg_temp AS $$
  SELECT public.is_authenticated_staff() OR (
    auth.role() = 'authenticated'
    AND auth.jwt()->'app_metadata'->>'role' IN ('auditor', 'viewer')
    AND EXISTS (
      SELECT 1 FROM public.user_profiles
      WHERE id = auth.uid() AND is_active AND role IN ('auditor', 'viewer')
    )
  );
$$;

-- 6. Grant student self-access SELECT policies on their own domain records
DROP POLICY IF EXISTS student_read_own ON public.students;
CREATE POLICY student_read_own ON public.students
  FOR SELECT TO authenticated
  USING (public.is_student_owner(id) OR public.can_read_student_data());

DROP POLICY IF EXISTS student_read_own_attendance ON public.attendance;
CREATE POLICY student_read_own_attendance ON public.attendance
  FOR SELECT TO authenticated
  USING (public.is_student_owner(student_id) OR public.can_read_student_data());

DROP POLICY IF EXISTS student_read_own_assessments ON public.assessments;
CREATE POLICY student_read_own_assessments ON public.assessments
  FOR SELECT TO authenticated
  USING (public.is_student_owner(student_id) OR public.can_read_student_data());

DROP POLICY IF EXISTS student_read_own_engagement ON public.engagement_events;
CREATE POLICY student_read_own_engagement ON public.engagement_events
  FOR SELECT TO authenticated
  USING (public.is_student_owner(student_id) OR public.can_read_student_data());

DROP POLICY IF EXISTS student_read_own_placement ON public.placement_records;
CREATE POLICY student_read_own_placement ON public.placement_records
  FOR SELECT TO authenticated
  USING (public.is_student_owner(student_id) OR public.can_read_student_data());

DROP POLICY IF EXISTS student_read_own_skills ON public.skills_records;
CREATE POLICY student_read_own_skills ON public.skills_records
  FOR SELECT TO authenticated
  USING (public.is_student_owner(student_id) OR public.can_read_student_data());

DROP POLICY IF EXISTS student_read_own_feedback ON public.feedback_records;
CREATE POLICY student_read_own_feedback ON public.feedback_records
  FOR SELECT TO authenticated
  USING (public.is_student_owner(student_id) OR public.can_read_student_data());

DROP POLICY IF EXISTS student_read_own_lms ON public.lms_activity_records;
CREATE POLICY student_read_own_lms ON public.lms_activity_records
  FOR SELECT TO authenticated
  USING (public.is_student_owner(student_id) OR public.can_read_student_data());

DROP POLICY IF EXISTS student_read_own_interventions ON public.interventions;
CREATE POLICY student_read_own_interventions ON public.interventions
  FOR SELECT TO authenticated
  USING (public.is_student_owner(student_id) OR public.can_read_student_data());

-- 7. Automatic auth.users trigger to create/sync staff profiles & link student accounts
CREATE OR REPLACE FUNCTION public.handle_new_auth_user()
RETURNS TRIGGER
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public, pg_temp AS $$
DECLARE
  v_role text;
  v_full_name text;
  v_student_id text;
BEGIN
  v_role := COALESCE(NEW.raw_app_meta_data->>'role', NEW.raw_user_meta_data->>'role', 'student');
  v_full_name := COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1));
  v_student_id := COALESCE(NEW.raw_app_meta_data->>'student_id', NEW.raw_user_meta_data->>'student_id');

  -- If the user is staff/faculty/admin/counselor/advisor/auditor/viewer/data_operator
  IF v_role IN ('administrator', 'admin', 'advisor', 'counselor', 'faculty', 'staff', 'auditor', 'viewer', 'data_operator') THEN
    INSERT INTO public.user_profiles (id, email, full_name, role, is_active)
    VALUES (
      NEW.id,
      NEW.email,
      v_full_name,
      CASE
        WHEN v_role = 'admin' THEN 'administrator'::app_role
        WHEN v_role = 'staff' THEN 'faculty'::app_role
        ELSE v_role::app_role
      END,
      true
    )
    ON CONFLICT (id) DO UPDATE SET
      email = EXCLUDED.email,
      full_name = EXCLUDED.full_name,
      updated_at = now();
  ELSIF v_role = 'student' THEN
    -- If a student ID was provided or matches email, associate the student record
    IF v_student_id IS NOT NULL THEN
      UPDATE public.students
      SET user_id = NEW.id
      WHERE student_id = v_student_id AND (user_id IS NULL OR user_id = NEW.id);
    ELSE
      UPDATE public.students
      SET user_id = NEW.id
      WHERE lower(email) = lower(NEW.email) AND (user_id IS NULL OR user_id = NEW.id);
    END IF;
  END IF;

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_handle_new_auth_user ON auth.users;
CREATE TRIGGER trg_handle_new_auth_user
  AFTER INSERT OR UPDATE ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_auth_user();

COMMIT;
