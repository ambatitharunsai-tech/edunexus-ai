-- Run only in a disposable database with Supabase auth functions (or local stubs).
BEGIN;
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO authenticated, service_role;
INSERT INTO auth.users(id) VALUES ('10000000-0000-0000-0000-000000000001'), ('10000000-0000-0000-0000-000000000002');
INSERT INTO public.user_profiles(id,email,full_name,role) VALUES
 ('10000000-0000-0000-0000-000000000001','test-advisor@example.test','Test Advisor','advisor'),
 ('10000000-0000-0000-0000-000000000002','test-auditor@example.test','Test Auditor','auditor');
SET LOCAL ROLE service_role;
SELECT public.edunexus_commit('students', '[{"id":"20000000-0000-0000-0000-000000000001","student_id":"SQL-TEST","first_name":"Test","last_name":"Student","current_grade":"Year 1","academic_term":"Term 1","status":"active","enrollment_date":"2026-10-13","created_at":"2026-10-13T00:00:00Z","updated_at":"2026-10-13T00:00:00Z"}]',
 '[{"id":"30000000-0000-0000-0000-000000000001","entity_type":"students","entity_id":"20000000-0000-0000-0000-000000000001","action":"CREATE","details":{},"created_at":"2026-10-13T00:00:00Z"}]');
DO $$ BEGIN
 IF (SELECT count(*) FROM public.students WHERE student_id='SQL-TEST') <> 1 THEN RAISE EXCEPTION 'RPC insert failed'; END IF;
 BEGIN
  PERFORM public.edunexus_commit('students', '[{"id":"20000000-0000-0000-0000-000000000001","student_id":"SQL-TEST","first_name":"Must Rollback","last_name":"Student","current_grade":"Year 1","academic_term":"Term 1","status":"active","enrollment_date":"2026-10-13","created_at":"2026-10-13T00:00:00Z","updated_at":"2026-10-13T00:00:00Z"}]',
   '[{"id":"30000000-0000-0000-0000-000000000002","entity_type":"students","entity_id":"20000000-0000-0000-0000-000000000001","action":"INVALID","details":{},"created_at":"2026-10-13T00:00:00Z"}]');
  RAISE EXCEPTION 'Invalid audit accepted';
 EXCEPTION WHEN check_violation THEN NULL;
 END;
 IF (SELECT first_name FROM public.students WHERE student_id='SQL-TEST') <> 'Test' THEN RAISE EXCEPTION 'Atomic rollback failed'; END IF;
END $$;
RESET ROLE;
SET LOCAL ROLE authenticated;
SELECT set_config('request.jwt.claim.role','authenticated',true);
SELECT set_config('request.jwt.claim.sub','10000000-0000-0000-0000-000000000001',true);
SELECT set_config('request.jwt.claims','{"app_metadata":{"role":"student"}}',true);
DO $$ BEGIN
 IF EXISTS(SELECT 1 FROM public.students) THEN RAISE EXCEPTION 'Nonstaff read allowed'; END IF;
 IF has_function_privilege(current_user,'public.edunexus_commit(text,jsonb,jsonb,uuid[])','EXECUTE') THEN RAISE EXCEPTION 'Authenticated RPC execution allowed'; END IF;
END $$;
SELECT set_config('request.jwt.claims','{"app_metadata":{"role":"advisor"}}',true);
DO $$ BEGIN
 IF (SELECT count(*) FROM public.students) <> 1 THEN RAISE EXCEPTION 'Staff read denied'; END IF;
 BEGIN
  INSERT INTO public.students(student_id,first_name,last_name,current_grade,academic_term) VALUES('BYPASS','Bad','Write','Year 1','Term 1');
  RAISE EXCEPTION 'Unaudited direct insert allowed';
 EXCEPTION WHEN insufficient_privilege THEN NULL;
 END;
END $$;
SELECT set_config('request.jwt.claim.sub','10000000-0000-0000-0000-000000000002',true);
SELECT set_config('request.jwt.claims','{"app_metadata":{"role":"auditor"}}',true);
DO $$ BEGIN
 IF (SELECT count(*) FROM public.students) <> 1 THEN RAISE EXCEPTION 'Auditor read denied'; END IF;
 IF public.is_authenticated_staff() THEN RAISE EXCEPTION 'Auditor classified as writer'; END IF;
END $$;
RESET ROLE;
ROLLBACK;
\echo 'PASS: atomic RPC, audit rollback, nonstaff denial, advisor read, direct-write denial, auditor read, RPC grants'
