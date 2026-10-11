# EduNexus AI — Student Success & Journey Intelligence Platform

A prototype platform designed for the **KPMG India Student Analytics Challenge**, empowering educators and advisors with explainable risk indicators, chronological student journey intelligence, and intervention outcome tracking.

---

## Workspace Structure

```
edunexus-ai/
├── frontend/
│   ├── src/
│   │   ├── components/        # Reusable UI primitives (Button, Card, Badge, Input, etc.)
│   │   ├── layouts/           # AppShell with responsive sidebar & top header
│   │   ├── pages/             # Dashboard, Students, Journey, Interventions, Analytics
│   │   ├── features/          # Feature modularization & configuration flags
│   │   ├── hooks/             # Custom hooks (e.g., useHealth for backend probe)
│   │   ├── lib/               # Utility functions, Supabase client, and API wrapper
│   │   └── types/             # TypeScript type definitions
│   ├── public/                # Static assets and icons
│   ├── .env.example           # Frontend environment variable template
│   └── package.json
├── backend/
│   ├── app/
│   │   ├── api/               # API router modules (health checks, v1 endpoints)
│   │   ├── core/              # Settings configuration (Pydantic) & global error handlers
│   │   ├── schemas/           # Pydantic request/response schemas (health, errors)
│   │   ├── services/          # Business logic services (staged for Stage 2+)
│   │   └── db/                # Database client provider
│   ├── tests/                 # Pytest test suite (health, CORS, error formatting)
│   ├── requirements.txt       # Python package dependencies
│   └── .env.example           # Backend environment variable template
├── supabase/
│   └── migrations/            # SQL migration files (schema definition for Stage 2)
├── README.md                  # Setup and execution guide
└── .gitignore                 # Version control exclusions
```

---

## Technology Stack

- **Frontend**: React 19, TypeScript, Vite, Tailwind CSS v4, Recharts, Lucide Icons
- **Backend**: Python 3.14 / FastAPI, Pydantic, python-dotenv, pytest, httpx
- **Database Layer**: Supabase PostgreSQL with Row Level Security (Stage 2)
- **Data Analytics**: Pandas, NumPy (Stage 3)

---

## Local Development Setup

### 1. Prerequisites
- **Node.js** ≥ 18 (Tested on v24.15)
- **npm** ≥ 10 (Tested on 11.12)
- **Python** ≥ 3.10 (Tested on 3.14)

### 2. Configure Environment Files
Both applications provide `.env.example` templates with non-production placeholders:

```bash
# Frontend environment
cp frontend/.env.example frontend/.env.local

# Backend environment
cp backend/.env.example backend/.env
```

### 3. Backend Setup & Run

```bash
cd backend

# Create and activate virtual environment
python3 -m venv venv
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Run pytest unit tests
pytest -v

# Start FastAPI server on port 8000
uvicorn app.main:app --reload --port 8000
```

The backend will be accessible at:
- **Health Check**: [http://localhost:8000/health](http://localhost:8000/health)
- **Interactive OpenAPI Docs**: [http://localhost:8000/docs](http://localhost:8000/docs)
- **ReDoc**: [http://localhost:8000/redoc](http://localhost:8000/redoc)

### 4. Frontend Setup & Run

In a separate terminal window:

```bash
cd frontend

# Install npm dependencies
npm install

# Run TypeScript typecheck and build validation
npm run build

# Start Vite development server
npm run dev
```

The frontend will be accessible at [http://localhost:5173](http://localhost:5173).

---

## Verification Commands

To verify Stage 1 foundation completeness:

```bash
# Verify Backend Tests
cd backend && source venv/bin/activate && pytest -v

# Verify Frontend Production Build & TypeScript Typecheck
cd frontend && npm run build
```

---

## Ethical AI & Governance Commitments
- **No Real Student Data**: All student records in prototypes are synthetic demo personas.
- **Explainable Indicators**: Risk scores are transparent, descriptive summaries of observable metrics.
- **Human-in-the-Loop**: All recommendations require educator/advisor review. Automated punitive actions are strictly prohibited.
- **No Unsubstantiated Causation**: Outcome tracking compares before/after indicators without claiming causal effects without controlled evidence.
