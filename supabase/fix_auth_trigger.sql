-- =====================================================================
-- EduNexus AI — Supabase Auth Trigger Fix
-- Prevents "Database error saving new user" / "Database error creating new user"
-- by ensuring the trigger function on auth.users is exception-safe and
-- handles the app_role enum properly.
-- =====================================================================

-- 1. Drop old or broken trigger if present
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

-- 2. Define an exception-safe trigger function
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
DECLARE
  v_role text;
  v_dept text;
  v_name text;
BEGIN
  -- Extract user metadata safely
  v_role := COALESCE(new.raw_app_meta_data->>'role', new.raw_user_meta_data->>'role', 'student');
  v_name := COALESCE(new.raw_user_meta_data->>'full_name', split_part(new.email, '@', 1));
  v_dept := COALESCE(new.raw_user_meta_data->>'department', 'General Academics');

  -- Only staff roles reside in public.user_profiles with app_role enum
  IF v_role IN ('advisor', 'counselor', 'faculty', 'administrator', 'auditor') THEN
    INSERT INTO public.user_profiles (id, email, full_name, role, institution_department)
    VALUES (
      new.id,
      new.email,
      v_name,
      v_role::app_role,
      v_dept
    )
    ON CONFLICT (id) DO UPDATE SET
      full_name = EXCLUDED.full_name,
      role = EXCLUDED.role,
      institution_department = EXCLUDED.institution_department,
      updated_at = now();
  END IF;

  RETURN NEW;
EXCEPTION
  WHEN OTHERS THEN
    -- Suppress and log any trigger exception so auth.users insertion never aborts
    RAISE WARNING 'handle_new_user suppressed exception: %', SQLERRM;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public, pg_temp;

-- 3. Re-create the trigger on auth.users
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
