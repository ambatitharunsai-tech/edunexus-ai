# EduNexus AI – Frontend

This directory contains the React and TypeScript user interface for EduNexus AI. It is built with Vite and includes the dashboard, student views, analytics, intervention workflows, reusable UI components and frontend tests.

## Requirements

- Node.js and npm compatible with the Vite version in `package.json`
- The matching EduNexus API service running locally or deployed
- Environment values for the API and any enabled public client integrations

## Install and run

From the repository root:

```bash
cd frontend
npm install
npm run dev
```

Vite prints the local development URL in the terminal.

## Environment

Create `.env.local` in this directory when local configuration is required. Common settings are:

```env
VITE_API_BASE_URL=http://localhost:8000
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-public-anon-key
```

Use the API URL for the backend associated with the current repository. The `VITE_` prefix exposes a value to browser code, so never put a Supabase service-role key, private API token or database password in a frontend environment variable.

## Available scripts

| Command | Purpose |
|---|---|
| `npm run dev` | Start the Vite development server |
| `npm run build` | Type-check and create the production frontend build |
| `npm run lint` | Run Oxlint |
| `npm test` | Run the Vitest test suite once |
| `npm run test:watch` | Run Vitest in watch mode |
| `npm run preview` | Preview the production build locally |

Before opening a pull request, run:

```bash
npm run lint
npm test
npm run build
```

## Source layout

- `src/pages/` – route-level screens
- `src/components/` – shared UI components
- `src/features/` – domain-specific feature modules
- `src/context/` – shared application context
- `src/lib/` – API, authentication and utility helpers
- `src/__tests__/` – UI and utility tests

For API contracts, backend configuration and database setup, refer to the root `README.md` and the documentation in `docs/`.
