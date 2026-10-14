-- Canonical API schema, restricted staff permissions, and atomic audited writes.
-- Apply after the initial and seven-domain migrations. Never run demo reset against SQL.
BEGIN;
ALTER TABLE public.students ADD COLUMN IF NOT EXISTS department text;
ALTER TABLE public.students ADD COLUMN IF NOT EXISTS cgpa numeric(4,2) CHECK (cgpa BETWEEN 0 AND 10);
ALTER TABLE public.students ADD COLUMN IF NOT EXISTS backlogs integer CHECK (backlogs >= 0);
CREATE INDEX IF NOT EXISTS idx_students_department ON public.students(department);
ALTER TABLE public.placement_records ALTER COLUMN resume_score DROP DEFAULT;
ALTER TABLE public.placement_records ALTER COLUMN readiness_tier DROP DEFAULT;
ALTER TABLE public.placement_records ALTER COLUMN readiness_tier DROP NOT NULL;
ALTER TABLE public.placement_records ALTER COLUMN mock_interviews_attended DROP DEFAULT;
ALTER TABLE public.placement_records ALTER COLUMN mock_interviews_attended DROP NOT NULL;
ALTER TABLE public.skills_records ALTER COLUMN certifications_count DROP DEFAULT;
ALTER TABLE public.skills_records ALTER COLUMN certifications_count DROP NOT NULL;
ALTER TABLE public.lms_activity_records ALTER COLUMN weekly_login_count DROP DEFAULT;
ALTER TABLE public.lms_activity_records ALTER COLUMN weekly_login_count DROP NOT NULL;
ALTER TABLE public.lms_activity_records ALTER COLUMN forum_posts_count DROP DEFAULT;
ALTER TABLE public.lms_activity_records ALTER COLUMN forum_posts_count DROP NOT NULL;
ALTER TABLE public.interventions ADD CONSTRAINT chk_followup_date_order
  CHECK (follow_up_date IS NULL OR follow_up_date >= start_date) NOT VALID;

CREATE TABLE public.risk_overrides (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id uuid NOT NULL UNIQUE REFERENCES public.students(id) ON DELETE CASCADE,
  is_overridden boolean NOT NULL DEFAULT false,
  original_tier text NOT NULL CHECK (original_tier IN ('low','moderate','high','critical','insufficient_data')),
  override_tier text CHECK (override_tier IN ('low','moderate','high','critical')),
  override_reason text,
  reviewed_by text,
  reviewed_at timestamptz,
  CHECK (NOT is_overridden OR (override_tier IS NOT NULL AND length(trim(override_reason)) >= 5))
);
ALTER TABLE public.risk_overrides ENABLE ROW LEVEL SECURITY;

-- Both JWT roles and profile activity must agree. app_metadata is server managed.
CREATE OR REPLACE FUNCTION public.is_authenticated_staff() RETURNS boolean
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public, pg_temp AS $$
  SELECT auth.role() = 'authenticated'
    AND auth.jwt()->'app_metadata'->>'role' IN ('administrator','admin','advisor','counselor','faculty','staff')
    AND EXISTS (SELECT 1 FROM public.user_profiles WHERE id = auth.uid() AND is_active
      AND role IN ('administrator','advisor','counselor','faculty'));
$$;
CREATE OR REPLACE FUNCTION public.can_read_student_data() RETURNS boolean
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public, pg_temp AS $$
  SELECT public.is_authenticated_staff() OR (
    auth.role() = 'authenticated' AND auth.jwt()->'app_metadata'->>'role' = 'auditor'
    AND EXISTS (SELECT 1 FROM public.user_profiles WHERE id = auth.uid() AND is_active AND role = 'auditor'));
$$;
CREATE OR REPLACE FUNCTION public.is_administrator() RETURNS boolean
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public, pg_temp AS $$
  SELECT auth.role() = 'authenticated' AND auth.jwt()->'app_metadata'->>'role' IN ('admin','administrator')
    AND EXISTS (SELECT 1 FROM public.user_profiles WHERE id = auth.uid() AND is_active AND role = 'administrator');
$$;
ALTER FUNCTION public.handle_updated_at() SET search_path = public, pg_temp;

DO $$
DECLARE t text; p record;
BEGIN
  FOREACH t IN ARRAY ARRAY['students','attendance','assessments','engagement_events',
    'placement_records','skills_records','feedback_records','lms_activity_records',
    'interventions','intervention_outcomes','risk_overrides'] LOOP
    FOR p IN SELECT policyname FROM pg_policies WHERE schemaname='public' AND tablename=t LOOP
      EXECUTE format('DROP POLICY %I ON public.%I', p.policyname, t);
    END LOOP;
    EXECUTE format('CREATE POLICY staff_read ON public.%I FOR SELECT TO authenticated USING (public.can_read_student_data())',t);
    -- Mutations go through the backend transaction so their audit cannot be omitted.
    -- No direct authenticated write policy is granted.
  END LOOP;
END $$;
DROP POLICY IF EXISTS "Staff insert audit events" ON public.audit_events;

-- Service-role-only RPC. Dynamic identifiers are allowlisted and quoted.
-- jsonb_populate_record preserves canonical SQL type checks, FKs, and constraints.
CREATE OR REPLACE FUNCTION public.edunexus_commit(
  p_table text, p_records jsonb, p_audits jsonb, p_delete_ids uuid[] DEFAULT ARRAY[]::uuid[]
) RETURNS void LANGUAGE plpgsql SECURITY INVOKER SET search_path = public, pg_temp AS $$
DECLARE cols text; updates text;
BEGIN
  IF p_table NOT IN ('students','attendance','assessments','engagement_events',
    'placement_records','skills_records','feedback_records','lms_activity_records',
    'interventions','intervention_outcomes','risk_overrides') THEN
    RAISE EXCEPTION 'Unsupported table';
  END IF;
  IF jsonb_typeof(p_records) <> 'array' OR jsonb_typeof(p_audits) <> 'array' THEN
    RAISE EXCEPTION 'Expected record arrays';
  END IF;
  IF jsonb_array_length(p_audits) <> jsonb_array_length(p_records) + cardinality(p_delete_ids) THEN
    RAISE EXCEPTION 'An audit event is required for every mutation';
  END IF;
  -- Serialize concurrent writes from this application, including CSV batches.
  PERFORM pg_advisory_xact_lock(hashtext('edunexus_commit'));
  SELECT string_agg(format('%I',column_name), ',' ORDER BY ordinal_position),
    string_agg(format('%I=EXCLUDED.%I',column_name,column_name), ',' ORDER BY ordinal_position)
      FILTER (WHERE column_name <> 'id')
    INTO cols, updates FROM information_schema.columns WHERE table_schema='public' AND table_name=p_table;
  EXECUTE format('INSERT INTO public.%I (%s) SELECT %s FROM jsonb_populate_recordset(NULL::public.%I,$1) ON CONFLICT (id) DO UPDATE SET %s',
    p_table,cols,cols,p_table,updates) USING p_records;
  EXECUTE format('DELETE FROM public.%I WHERE id=ANY($1)',p_table) USING p_delete_ids;
  INSERT INTO public.audit_events SELECT * FROM jsonb_populate_recordset(NULL::public.audit_events,p_audits);
END;
$$;
REVOKE ALL ON FUNCTION public.edunexus_commit(text,jsonb,jsonb,uuid[]) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.edunexus_commit(text,jsonb,jsonb,uuid[]) TO service_role;
COMMIT;
