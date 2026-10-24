-- Internal trigger/event helper functions must not be callable through PostgREST RPC.
-- Trigger execution does not require callers to have EXECUTE on the trigger function.
REVOKE EXECUTE ON FUNCTION public.handle_new_auth_user() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.rls_auto_enable() FROM PUBLIC, anon, authenticated;
