# EduNexus AI – Supabase Migration Guide

This directory contains SQL migrations for the EduNexus AI student-success database. Apply the schema migrations to a dedicated Supabase project and review the security policies before connecting real institutional data.

## Migration order

Apply the following schema files in this order:

1. `20261011000001_initial_schema.sql` – core student, attendance, assessment, engagement, intervention, role and audit schema.
2. `20261012000001_kpmg_7domains.sql` – adds placement, skills, LMS and feedback domain tables.
3. `20261013000001_integrity_and_authorization.sql` – applies later integrity constraints, risk-override support and authorization-related changes.

`00000000000000_init.sql` is an earlier placeholder containing comments only. It does not create the application schema and is not a replacement for the three schema migrations above.

## Apply through the Supabase Dashboard

1. Open the [Supabase Dashboard](https://supabase.com/dashboard) and select the project dedicated to this application.
2. Open **SQL Editor** and create a new query.
3. Open the first migration file from this repository, copy its complete SQL contents, and paste them into the editor.
4. Run the query and inspect the result for errors.
5. Repeat the process for the second and third migration files in the order shown above.
6. Verify the expected tables, constraints, indexes and policies in the Supabase dashboard.

Use the file paths in this repository (for example, `supabase/migrations/20261011000001_initial_schema.sql`). Do not use machine-specific `file://` paths copied from another developer's computer.

## Credentials and environment

The backend uses server-side Supabase configuration. Keep the service-role key on the server only.

Example backend values:

```env
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-server-side-secret
```

The frontend may use a publishable/anonymous key if its configured features require direct Supabase client access:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-public-anon-key
```

A `VITE_` variable is bundled into browser assets. Never put `SUPABASE_SERVICE_ROLE_KEY`, database passwords or other privileged secrets in frontend configuration, source files or public issue discussions.

## Security checklist

- Review the Row Level Security policies and grants created by the migrations.
- Confirm that anonymous users cannot access student records.
- Validate active staff roles and permissions before enabling real user accounts.
- Keep audit records protected from unauthorized reads or modification.
- Use a separate development Supabase project for test data.
- Do not run demo reset or synthetic seeding workflows against production records.
- Back up the database and review SQL changes before applying a migration to an existing production project.

## Important

The migration SQL defines database structure and policies; it does not configure every application environment variable or deploy the API. Complete the root README setup steps after the database is ready.
