# Contributing to EduNexus AI

Welcome to **EduNexus AI** — Student Success & Journey Intelligence Platform for the KPMG India challenge: *"Smart Campus Analytics: Predict, Optimize & Improve Student Success."*

To ensure seamless collaboration across our engineering team without overwriting code or exposing sensitive data, all contributors must adhere to the standards outlined in this guide.

---

## Table of Contents
1. [Core Principles & Architectural Commitments](#core-principles--architectural-commitments)
2. [Local Setup & Running the Project](#local-setup--running-the-project)
3. [Branching Strategy & Workflow](#branching-strategy--workflow)
4. [Commit Message Conventions](#commit-message-conventions)
5. [Pull Request Process](#pull-request-process)
6. [Testing Requirements & Pre-Push Checklist](#testing-requirements--pre-push-checklist)
7. [Security & Secret Management Rules](#security--secret-management-rules)
8. [Code Review Expectations](#code-review-expectations)

---

## 1. Core Principles & Architectural Commitments

Before writing code, understand the core tenets that govern the platform:

1. **Zero Fake Machine Learning**:
   All student risk scores, readiness indices, and success scores are 100% deterministic, mathematically explainable, and governed by transparent configuration files (`backend/app/core/risk_config.py`). Black-box models or fabricated accuracy metrics are strictly prohibited.
2. **Human-in-the-Loop Decision Support**:
   The platform is a decision-support tool, never an autonomous decision-maker. It never infers sensitive demographics, never executes punitive automated actions, and preserves advisor override audit trails.
3. **Scientific Non-Causation Standard**:
   Observed changes following interventions are empirical comparisons ($V_{\text{post}} - V_{\text{baseline}}$). Correlated changes in time do not prove sole causation without controlled longitudinal trials.
4. **Missing-Data Neutrality**:
   Missing telemetry is never silently penalized as zero. Unrecorded assessments or LMS events surface explicit missing-data disclosures.
5. **Synthetic Data Exclusivity**:
   Only synthetic/fictional student data (`data/synthetic_seed.json`) is permitted in development, testing, and evaluator demonstrations. Real student records must never be loaded.

---

## 2. Local Setup & Running the Project

### Prerequisites
- **Python** ≥ 3.10 (Recommended: Python 3.14)
- **Node.js** ≥ 18 (Recommended: Node 20 LTS or v24)
- **Git**

### 1. Clone the Repository
```bash
git clone https://github.com/ambatitharunsai-tech/edunexus-ai.git
cd edunexus-ai
```

### 2. Configure Environment Files
Do **NOT** commit `.env` or `.env.local`. Create them from the provided templates:

```bash
# Frontend environment
cp frontend/.env.example frontend/.env.local

# Backend environment
cp backend/.env.example backend/.env
```

> **Note**: For local development and evaluator demos, placeholder values in `.env` are completely functional. EduNexus AI runs in a high-performance in-memory synthetic mode backed by `data/synthetic_seed.json` without requiring live cloud credentials.

### 3. Start Backend (FastAPI)
```bash
cd backend
python3 -m venv venv
source venv/bin/activate        # On Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```
- Health Check: [http://localhost:8000/health](http://localhost:8000/health)
- Swagger Docs: [http://localhost:8000/docs](http://localhost:8000/docs)

### 4. Start Frontend (React + Vite)
In a second terminal window:
```bash
cd frontend
npm install
npm run dev
```
- Web Application: [http://localhost:5173](http://localhost:5173)

---

## 3. Branching Strategy & Workflow

All team members must work on dedicated feature branches. **Direct commits to `main` are strictly prohibited.**

### Branch Hierarchy
- `main`: Protected, production-ready, peer-reviewed code. Only merge via Pull Request.
- `feature/<name>`: Feature development aligned with designated workstreams.
- `fix/<name>`: Targeted bug fixes.
- `docs/<name>`: Documentation additions and corrections.
- `test/<name>`: Test suite enhancements and synthetic data fixtures.

### Designated Workstream Feature Branches
| Workstream | Branch Name | Primary Scope |
|---|---|---|
| **Data Integration** | `feature/data-integration` | 7-domain data models, CSV parsing, ingestion validation, synthetic seed |
| **Success Score** | `feature/success-score` | Success score formula, radar fingerprinting, multi-factor weighting |
| **Risk Analysis** | `feature/risk-analysis` | Academic and placement risk flags, student segmentation, override workflows |
| **Dashboard & UI** | `feature/dashboard` | Executive KPIs, Recharts visualizations, interactive filters, modal dialogs |
| **Testing & QA** | `feature/testing-demo` | End-to-end user journey tests, bug verification, evaluator demo scripts |

### Creating and Switching to a Feature Branch
Always start from the latest `main`:
```bash
git checkout main
git pull origin main
git checkout -b feature/<your-feature-name>
```

---

## 4. Commit Message Conventions

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
<type>(<scope>): <short description>

[optional body explaining motivation and technical context]
```

### Approved Types
- `feat`: A new user-facing feature or API endpoint
- `fix`: A bug fix
- `docs`: Documentation updates only
- `test`: Adding or refactoring tests
- `refactor`: Code change that neither fixes a bug nor adds a feature
- `perf`: Code change that improves performance
- `chore`: Maintenance tasks, dependency updates, configuration

### Examples
- `feat(risk-engine): implement dual academic and placement risk signals`
- `fix(csv-service): validate non-negative values for assessment max_score`
- `docs(team): add onboarding guide and workstream responsibilities`
- `test(segmentation): verify quadrant assignment for high-potential students`

---

## 5. Pull Request Process

1. **Keep PRs Focused**: One feature or bugfix per PR. Avoid large PRs touching multiple domains.
2. **Sync with `main` Before Opening**:
   ```bash
   git fetch origin
   git rebase origin/main
   ```
3. **Push Feature Branch**:
   ```bash
   git push -u origin feature/<your-feature-name>
   ```
4. **Open Pull Request**:
   - Target branch: `main`.
   - Title: Follow conventional commit format.
   - Fill out all sections of `.github/pull_request_template.md`.
5. **Assign Reviewers**: Tag the Technical Lead and relevant workstream owner.
6. **Passing CI**: Backend tests and frontend checks must pass.
7. **Approval & Squash Merge**: At least 1 review approval is required before merging.

---

## 6. Testing Requirements & Pre-Push Checklist

Before pushing any branch or submitting a PR, verify local checks:

### Backend Checks
```bash
cd backend
python3 -m pytest -v
```
- All tests must pass (currently 86 passed, 2 skipped live DB integration tests).
- When adding new endpoints or calculation logic, add corresponding unit tests in `backend/tests/`.

### Frontend Checks
```bash
cd frontend
npm run lint    # Oxlint static check (0 errors required)
npm run build   # Type-check and production bundle build
```

---

## 7. Security & Secret Management Rules

Security is paramount, especially when handling institutional analytics:

- **NEVER Commit `.env` or `.env.local`**:
  Environment files containing credentials must remain local. The root `.gitignore` blocks `.env`, `.env.*`, and `*.local`.
- **Never Commit Supabase Service-Role Keys**:
  `SUPABASE_SERVICE_ROLE_KEY` bypasses PostgreSQL Row Level Security (RLS). It must remain exclusively in backend server environments and must never be provided to frontend code.
- **Never Commit Real Student Information**:
  FERPA/GDPR/privacy laws strictly apply. All datasets must use synthetic names, synthetic IDs (`STU-XXX`), and randomized academic telemetry.
- **Credential Rotation**:
  If a secret is ever accidentally committed to a branch or remote, notify the Technical Lead immediately to revoke and rotate the secret. Merely deleting the file in a subsequent commit does not eliminate it from Git history.

---

## 8. Code Review Expectations

All reviewers evaluate pull requests against this rubric:

1. **Architectural Consistency**: Does the code respect the FastAPI layer separation (`api/` -> `services/` -> `db/repositories/`)?
2. **Formula Integrity**: Are mathematical weights explicit, documented, and bound within $[0, 100]$?
3. **Error Handling**: Are invalid inputs handled with standard HTTP status codes (e.g. 400 for bad parameters, 404 for missing entities, 422 for schema mismatches)?
4. **Accessible UI**: Are React components responsive, keyboard-navigable, and styled with semantic Tailwind tokens?
5. **Documentation**: Are new schemas and endpoints documented in Pydantic models with clear descriptions?
