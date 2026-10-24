-- =====================================================================
-- EduNexus AI — Migration: 20261014000001_student_auth_and_viewer_role.sql
-- Description: Extends RBAC roles (viewer, data_operator), adds student
--              self-service RLS policies, links student authentication,
--              and configures safe user provisioning triggers.
-- =====================================================================

BEGIN;

-- app_role additions are committed by 20261013000002_extend_app_role_enum.sql
-- before this migration uses the new enum labels.

-- 2. Add user_id reference to students table for direct auth.users mapping
ALTER TABLE public.students
  ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL;

CREATE INDEX IF NOT EXISTS idx_students_user_id ON public.students(user_id);
CREATE INDEX IF NOT EXISTS idx_students_email ON public.students(email);

-- 3. Helper function: Determine if authenticated user owns the student record
-- Strictly requires genuine authentication, student role claim from app_metadata,
-- and authoritative ownership via students.user_id = auth.uid().
CREATE OR REPLACE FUNCTION public.is_student_owner(p_student_id UUID)
RETURNS BOOLEAN
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public, pg_temp AS $$
  SELECT (
    auth.role() = 'authenticated'
    AND COALESCE(auth.jwt()->'app_metadata'->>'role', 'student') = 'student'
    AND EXISTS (
      SELECT 1 FROM public.students s
      WHERE s.id = p_student_id
        AND s.user_id = auth.uid()
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
-- Security: NEVER trust raw_user_meta_data for role claims or student linking.
-- Privileged roles and student IDs must originate strictly from server-managed raw_app_meta_data.
CREATE OR REPLACE FUNCTION public.handle_new_auth_user()
RETURNS TRIGGER
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public, pg_temp AS $$
DECLARE
  v_role text;
  v_full_name text;
  v_student_id text;
BEGIN
  -- Strictly read role from raw_app_meta_data; default to 'student'
  v_role := COALESCE(NEW.raw_app_meta_data->>'role', 'student');
  v_full_name := COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1));
  -- Only accept server-verified student_id from raw_app_meta_data
  v_student_id := NEW.raw_app_meta_data->>'student_id';

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
    -- Only associate student record if validated student_id was set by server in raw_app_meta_data
    -- AND the student record matches the registered email AND is unlinked
    IF v_student_id IS NOT NULL THEN
      UPDATE public.students
      SET user_id = NEW.id
      WHERE student_id = v_student_id
        AND lower(email) = lower(NEW.email)
        AND (user_id IS NULL OR user_id = NEW.id);
    END IF;
  END IF;

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_handle_new_auth_user ON auth.users;
CREATE TRIGGER trg_handle_new_auth_user
  AFTER INSERT OR UPDATE ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_auth_user();

-- SECURITY DEFINER helper functions should not be callable anonymously.
REVOKE ALL ON FUNCTION public.is_student_owner(uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.is_student_owner(uuid) TO authenticated, service_role;

REVOKE ALL ON FUNCTION public.is_authenticated_staff() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.is_authenticated_staff() TO authenticated, service_role;

REVOKE ALL ON FUNCTION public.can_read_student_data() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.can_read_student_data() TO authenticated, service_role;

REVOKE ALL ON FUNCTION public.is_administrator() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.is_administrator() TO authenticated, service_role;

COMMIT;
