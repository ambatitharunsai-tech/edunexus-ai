-- Fix institutional student self-registration linking.
-- Student IDs are taken from submitted user metadata only as a lookup key; the account
-- is linked only when BOTH that identifier and the verified account email match a
-- pre-existing institutional students row. Role claims continue to come exclusively
-- from server-managed raw_app_meta_data.
CREATE OR REPLACE FUNCTION public.handle_new_auth_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public', 'pg_temp'
AS $function$
DECLARE
  v_role text;
  v_full_name text;
  v_student_id text;
BEGIN
  v_role := COALESCE(NEW.raw_app_meta_data->>'role', 'student');
  v_full_name := COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1));
  v_student_id := COALESCE(
    NULLIF(BTRIM(NEW.raw_app_meta_data->>'student_id'), ''),
    NULLIF(BTRIM(NEW.raw_user_meta_data->>'student_id'), '')
  );

  IF v_role IN ('administrator', 'admin', 'advisor', 'counselor', 'faculty', 'staff', 'auditor', 'viewer', 'data_operator') THEN
    INSERT INTO public.user_profiles (id, email, full_name, role, is_active)
    VALUES (
      NEW.id,
      NEW.email,
      v_full_name,
      CASE
        WHEN v_role = 'admin' THEN 'administrator'::public.app_role
        WHEN v_role = 'staff' THEN 'faculty'::public.app_role
        ELSE v_role::public.app_role
      END,
      true
    )
    ON CONFLICT (id) DO UPDATE SET
      email = EXCLUDED.email,
      full_name = EXCLUDED.full_name,
      updated_at = now();
  ELSIF v_role = 'student' THEN
    IF v_student_id IS NULL AND TG_OP = 'INSERT' THEN
      RAISE EXCEPTION 'Student registration requires the institution-issued Student ID.';
    ELSIF v_student_id IS NOT NULL THEN
      UPDATE public.students
      SET user_id = NEW.id
      WHERE student_id = v_student_id
        AND lower(email) = lower(NEW.email)
        AND (user_id IS NULL OR user_id = NEW.id);

      IF TG_OP = 'INSERT' AND NOT FOUND THEN
        RAISE EXCEPTION 'Student ID and email must match an unlinked institutional student record.';
      END IF;
    END IF;
  END IF;

  RETURN NEW;
END;
$function$;
