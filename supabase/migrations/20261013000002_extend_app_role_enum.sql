-- Extend app_role in a standalone committed migration, because PostgreSQL forbids
-- using a freshly-added enum value until the transaction adding it is committed.
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_enum e
    JOIN pg_type t ON t.oid = e.enumtypid
    JOIN pg_namespace n ON n.oid = t.typnamespace
    WHERE n.nspname = 'public' AND t.typname = 'app_role' AND e.enumlabel = 'viewer'
  ) THEN
    ALTER TYPE public.app_role ADD VALUE 'viewer';
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_enum e
    JOIN pg_type t ON t.oid = e.enumtypid
    JOIN pg_namespace n ON n.oid = t.typnamespace
    WHERE n.nspname = 'public' AND t.typname = 'app_role' AND e.enumlabel = 'data_operator'
  ) THEN
    ALTER TYPE public.app_role ADD VALUE 'data_operator';
  END IF;
END $$;
