# Architecture Diagram (Verified)

```mermaid
flowchart LR
    subgraph Frontend[Frontend]
        App[App.tsx]
        Shell[AppShell.tsx]
        Dash[DashboardPage.tsx]
        Students[StudentsPage.tsx]
        Journey[StudentJourneyPage.tsx]
        Interv[InterventionsPage.tsx]
        Analytics[AnalyticsPage.tsx]
        Csv[CsvHubPage.tsx]
        API[lib/api.ts]
        AuthCtx[AuthContext.tsx]
        AuthUtil[lib/auth.ts]
    end

    subgraph Backend[FastAPI Backend]
        Main[app.main]
        V1[api/v1/__init__.py]
        DashboardAPI[api/v1/dashboard.py]
        StudentsAPI[api/v1/students.py]
        IntervAPI[api/v1/interventions.py]
        CsvAPI[api/v1/csv.py]
        Auth[core/auth.py]
        DashboardSvc[services/dashboard_service.py]
        Success[services/success_score_engine.py]
        Risk[services/dual_risk_engine.py]
        Seg[services/segmentation_engine.py]
        CsvSvc[services/csv_service.py]
        DbSvc[services/database_service.py]
        Repo[db/repositories]
        DB[(Supabase / PostgreSQL)]
    end

    App --> AuthCtx
    AuthCtx --> AuthUtil
    App --> Shell
    Shell --> Dash
    Shell --> Students
    Shell --> Journey
    Shell --> Interv
    Shell --> Analytics
    Shell --> Csv

    Dash --> API
    Students --> API
    Journey --> API
    Interv --> API
    Analytics --> API
    Csv --> API

    API --> Main
    Main --> V1
    V1 --> DashboardAPI
    V1 --> StudentsAPI
    V1 --> IntervAPI
    V1 --> CsvAPI

    DashboardAPI --> Auth
    StudentsAPI --> Auth
    IntervAPI --> Auth
    CsvAPI --> Auth

    DashboardAPI --> DashboardSvc
    StudentsAPI --> Success
    StudentsAPI --> Risk
    StudentsAPI --> Seg
    StudentsAPI --> DbSvc
    IntervAPI --> DbSvc
    CsvAPI --> CsvSvc

    DashboardSvc --> DbSvc
    DbSvc --> Repo
    Repo --> DB

    CsvSvc --> Repo
    CsvSvc --> DashboardSvc
    Success --> DashboardSvc
    Seg --> DashboardSvc
```

## Notes
- This diagram reflects the active codebase and verified routes.
- The synthetic/demo fallback is handled by dataset and service logic, not by a separate runtime app. The backend chooses between configured live DB mode and the in-memory synthetic dataset.
- Missing-data handling and risk scoring remain backend-owned, not duplicated into React.
