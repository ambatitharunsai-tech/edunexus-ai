# EduNexus AI — Team Onboarding & Git Workflow Guide

Welcome to the **EduNexus AI** engineering team! This guide provides step-by-step, beginner-friendly instructions to help every team member set up their workstation, collaborate smoothly via Git, and contribute code without conflicts or data exposure.

---

## Prerequisites Checklist

Ensure you have the following installed on your machine before starting:
- **Git**: Check with `git --version` (any recent version ≥ 2.30).
- **Python**: Version ≥ 3.10 (check with `python3 --version`).
- **Node.js**: Version ≥ 18 (check with `node -v` and `npm -v`).
- **Code Editor**: Visual Studio Code, Cursor, or your preferred IDE.

---

## 8-Step Collaborative Development Workflow

```
[Accept Invite] ──> [Clone Repo] ──> [Setup Env] ──> [Create Feature Branch]
                                                              │
                                                              ▼
[Merge into main] <── [Code Review] <── [Open PR] <── [Test & Commit]
```

---

### Step 1: Accept the GitHub Repository Invitation

1. Check your email associated with your GitHub account for an invitation from `@ambatitharunsai-tech`, OR
2. Visit the repository URL directly in your browser.
3. Click the green **Accept invitation** button at the top of the repository page.

---

### Step 2: Clone the Repository to Your Machine

Open your terminal (macOS/Linux) or PowerShell/Git Bash (Windows) and run:

```bash
# Clone the repository to your local computer
git clone <REPOSITORY_URL>

# Navigate into the project folder
cd edunexus-ai
```

> **Why this command?**: `git clone` downloads the entire codebase and its commit history to your local hard drive.

---

### Step 3: Set Up Local Environment Files

Configure local environment variables from provided templates:

```bash
# Backend environment setup
cp backend/.env.example backend/.env

# Frontend environment setup
cp frontend/.env.example frontend/.env.local
```

> **Why this command?**: `cp` (copy) duplicates the template files. The `.env` and `.env.local` files contain development defaults. These files are listed in `.gitignore` and **must never be committed to Git**.

Next, start backend and frontend dependencies:

```bash
# 1. Set up backend virtual environment
cd backend
python3 -m venv venv
source venv/bin/activate       # Windows: venv\Scripts\activate
pip install -r requirements.txt
cd ..

# 2. Install frontend dependencies
cd frontend
npm install
cd ..
```

---

### Step 4: Create Your Feature Branch

**Never write code directly on the `main` branch.** Always create a branch dedicated to your assigned workstream:

```bash
# Ensure you are on main and have the latest updates
git checkout main
git pull origin main

# Create and switch to your feature branch
git checkout -b feature/<your-workstream-feature>
```

#### Approved Branch Names by Workstream:
| Workstream | Branch Name | Assigned Scope |
|---|---|---|
| **Data Integration** | `feature/data-integration` | 7-domain models, CSV Hub, synthetic seed |
| **Success Score** | `feature/success-score` | Composite score engine, radar charts |
| **Risk Analytics** | `feature/risk-analysis` | Academic & placement risk rules, segmentation |
| **Dashboard UI** | `feature/dashboard` | KPI cards, trends, filters, modals |
| **QA & Presentation** | `feature/testing-demo` | Tests, bug verification, demo scripts |

> **Why this command?**: `git checkout -b` creates a new branch isolated from `main`. Any changes you make will not affect other teammates until reviewed and merged.

---

### Step 5: Make Changes Only Within Your Assigned Area

To prevent merge conflicts and coordination bottlenecks:
- Work strictly within the files and directories belonging to your workstream.
- If you need to modify a shared interface (such as a database schema in `backend/app/schemas/` or a shared API router), **coordinate with the Technical Lead (`@ambatitharunsai-tech`) first**.
- **Golden Rule**: Never modify files outside your workstream without prior agreement.

---

### Step 6: Run Relevant Tests Locally

Before committing any code, verify that all tests pass:

```bash
# 1. Run backend unit and API tests
cd backend
pytest -v
cd ..

# 2. Run frontend linter and build check
cd frontend
npm run lint
npm run build
cd ..
```

> **Rule**: All 86 backend tests must pass. If any test fails, fix the issue locally before pushing.

---

### Step 7: Commit and Push Your Branch

Stage only the files you intentionally modified:

```bash
# Check what files you have touched
git status

# Stage specific files (avoid 'git add .' if unreviewed files exist)
git add <path/to/changed/file>

# Commit with a descriptive conventional commit message
git commit -m "feat(scope): concise description of changes"
```

#### Commit Message Format:
- `feat(risk): add placement readiness score computation`
- `fix(csv): prevent division by zero when assessment max_score is missing`
- `docs(readme): add judge demo steps for CSV hub`

Push your feature branch to GitHub:

```bash
# Push branch to GitHub and set upstream tracking
git push -u origin feature/<your-workstream-feature>
```

> **Why this command?**: `git push -u origin ...` uploads your local commits to GitHub and associates your branch with the remote repository.

---

### Step 8: Open a Pull Request on GitHub

1. Navigate to the repository on GitHub in your web browser.
2. You will see a banner: `feature/... had recent pushes. Compare & pull request`. Click **Compare & pull request**.
3. Verify base branch is `main` and compare branch is your feature branch.
4. Complete the Pull Request template:
   - Check the boxes for tests run.
   - Attach screenshots if you made UI changes.
   - Confirm the security checklist (no `.env` or PII committed).
5. Add `@ambatitharunsai-tech` as a Reviewer.
6. Click **Create pull request**.

---

### Step 9: Review, Address Feedback & Merge

1. **Automated CI**: GitHub Actions will automatically run backend tests and frontend checks.
2. **Peer Review**: The Technical Lead will review your code and may suggest minor adjustments.
3. **Addressing Feedback**: Make requested changes locally, commit them, and run `git push origin feature/<your-branch>`. The PR updates automatically.
4. **Merge**: Once approved, the Technical Lead will merge your branch into `main` using **Squash and Merge**.

---

## Crucial Safety Rules

1. **Never Force-Push**: Never run `git push --force` or `git push -f`. This can delete your teammates' work.
2. **Never Commit Secrets**: Never commit `.env`, `.env.local`, API keys, or Supabase service-role keys.
3. **Never Commit Real Student Records**: Use strictly synthetic data from `data/synthetic_seed.json`.
4. **Keep Branches Synchronized**: If `main` has advanced while you were working, pull the latest changes safely:
   ```bash
   git checkout main
   git pull origin main
   git checkout feature/<your-branch>
   git merge main
   ```
5. **Ask for Help**: If you encounter an unexpected Git conflict, stop and ask the Technical Lead before running destructive commands like `git reset --hard`.
