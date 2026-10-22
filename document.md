# EduNexus AI — Help Chatbot & Bandwidth Guide Feature Documentation

## 1. Executive Summary & Feature Objective

The **Help Chatbot and Bandwidth Guide** feature provides students, faculty, and administrative staff with instant institutional guidance and self-service connection troubleshooting.

### Core Principles
1. **Privacy-Preserving & Local**: All chat interactions and download throughput estimates are conducted entirely within the user's browser session. No conversation logs, prompt questions, or speed test results are recorded, persisted, or transmitted to any server.
2. **Deterministic & Curated (No External LLM)**: Answers are sourced from a strictly audited, locally managed knowledge base (`helpContent.ts`). The platform does not require external AI API keys, incurs no operational token fees, and eliminates hallucination risks.
3. **Role-Aware Access**: Responses and internal navigation links are filtered according to user roles. Students receive support focused on their personal learning journeys and success metrics, while staff members receive access to intervention workflows, student directory search tools, and CSV data ingestion guides.
4. **Bandwidth Self-Diagnosis**: A client-side throughput estimator downloads a static 5 MiB (5,242,880 bytes) probe asset directly from the same origin to evaluate network quality and advise users on optimal application settings (such as compact navigation and reduced animation).

---

## 2. Architecture & Component Structure

```
frontend/
├── public/
│   └── probe.bin                     # 5 MiB (5,242,880 bytes) static binary probe asset
├── src/
│   ├── lib/
│   │   ├── helpContent.ts            # Curated Q&A knowledge base & categories
│   │   ├── helpChatEngine.ts         # Natural language matcher & scoring engine
│   │   └── bandwidthEstimator.ts     # Client-side throughput measurement
│   ├── pages/
│   │   ├── HelpPage.tsx              # Main Help & Bandwidth UI component
│   │   └── index.ts                  # Export barrel
│   ├── layouts/
│   │   └── AppShell.tsx              # Nav items & mobile role-based drawer
│   ├── App.tsx                       # /help route registration (ProtectedRoute)
│   ├── test/
│   │   └── setup.ts                  # Vitest DOM matcher setup
│   └── __tests__/
│       ├── helpContent.test.ts       # Knowledge base schema & role tests
│       ├── helpChatEngine.test.ts    # Pattern matching & suggestion tests
│       ├── bandwidthEstimator.test.ts# Speed calculation, errors & abort tests
│       └── HelpPage.test.tsx         # React UI component interaction tests
├── vitest.config.ts                  # Test runner configuration (jsdom)
└── package.json                      # Added test scripts and devDependencies
```

---

## 3. Detailed Component Implementation

### 3.1 Curated Help Content (`src/lib/helpContent.ts`)
The knowledge base contains ~30 verified entries across 8 functional categories:
- `general`: Platform overview, theme toggles, accessibility, data privacy.
- `dashboard`: KPI explanations, student self-view, risk tier classifications, KPMG 7-domain composite score.
- `students`: Directory searching, filtering, full journey dossiers, advisor risk overrides (staff only).
- `interventions`: Support plan creation, 4-stage lifecycles, outcome measurements, student plan views.
- `analytics`: Segment pathways, dual-risk matrix, departmental comparisons (staff only).
- `data`: Standard CSV templates, upload validation, 1-click synthetic demo resets (staff only).
- `account`: Token authentication, role definitions, secure sign-out.
- `bandwidth`: Speed estimation details, low-bandwidth optimization guidance.

#### Type Contract
```typescript
export interface HelpEntry {
  id: string;
  keywords: string[];
  question: string;
  answer: string;
  category: HelpCategory;
  roles: HelpRole[];           // 'staff' | 'student' | 'all'
  internalLink?: string;       // e.g. '/students', '/interventions'
  linkLabel?: string;          // e.g. 'Go to Students Directory'
}
```

### 3.2 Client-Side Chat Engine (`src/lib/helpChatEngine.ts`)
- **Query Normalization**: Converts input queries to lowercase and removes punctuation.
- **Stopword Filtering**: Strips conversational filler words (`how`, `do`, `i`, `what`, `where`, `the`, `is`, etc.) while preserving substantive search tokens.
- **Scoring Algorithm**:
  - Exact question match: $+100$ points.
  - Substring question match: $+50$ points.
  - Keyword token match: $+15$ points per exact token, $+8$ points for partial stems.
  - Category match: $+12$ points.
- **Role Guard**: Evaluates `isRoleAllowed(entry.roles, userRole)`. Staff entries are never returned to students.
- **Contextual Suggestions**: Generates related questions within the same category for matched answers, or top frequently asked questions when a query is unrecognized.

### 3.3 Bandwidth Estimator (`src/lib/bandwidthEstimator.ts`)
- **Same-Origin Asset Fetch**: Queries `/probe.bin?_t=<timestamp>` to prevent intermediate browser/CDN caching.
- **Strict Byte-Count Verification**: Requires receiving exactly **`5,242,880` bytes** (5 MiB). Any incomplete, premature termination, or truncated stream is rejected immediately with an error and `speedMbps: 0`.
- **Content-Length Header Validation**: Rejects inconsistent or mismatched `Content-Length` headers. Handles missing headers safely during streaming without treating expected size as proof of arrival.
- **Concurrency Guard**: Employs an active test lock to reject concurrent speed tests (`errorMessage: 'Concurrent speed tests are not permitted.'`).
- **Cancellation & Failure Integrity**: Guarantees that cancellations, timeouts, network failures, or truncated downloads never produce a successful result or a positive speed estimate (`speedMbps: 0`).
- **Realistic Duration Clamping**: Enforces `MIN_REALISTIC_DURATION_MS = 20ms` to prevent division by near-zero and misleading speed spikes on sub-millisecond transfers.
- **High-Precision Timing**: Utilizes `performance.now()` before and after transfer.
- **Stream Reading**: Uses `response.body.getReader()` to compute real-time download progress and loaded byte counts, falling back to `response.arrayBuffer()` in non-streaming environments.
- **Throughput Math**:
  $$\text{Speed (Mbps)} = \frac{\text{Bytes Loaded} \times 8}{(\text{Duration in ms} / 1000) \times 1{,}000{,}000}$$
- **Speed Tiers & Guidance**:
  - **< 1.0 Mbps (Low)**: Recommends wired connection, compact navigation, and reduced motion.
  - **1.0 – 5.0 Mbps (Moderate)**: Suitable for basic profiles; advises patience during heavy chart renders.
  - **5.0 – 25.0 Mbps (Good)**: Smooth, responsive experience for interactive analytics.
  - **≥ 25.0 Mbps (Optimal)**: Peak performance for high-frequency telemetry and bulk CSV operations.
- **Cancellation & Timeout Support**: Accepts `AbortSignal` for immediate cancellation and includes a default 15-second timeout safeguard.

### 3.4 Help Page UI (`src/pages/HelpPage.tsx`)
- **Chat Panel**:
  - Auto-scrolling conversation stream.
  - Distinct styling for user queries (indigo bubbles) and assistant responses (white card with border).
  - Quick action links directing users to relevant app pages (`/students`, `/interventions`, `/analytics`).
  - Interactive suggested questions rendered as clickable pills.
  - "Reset" button to clear conversation history.
- **Bandwidth Panel**:
  - Visual gauge meter with dynamic progress bar during active downloads.
  - Single-click "Run Speed Test" action.
  - Comprehensive results card displaying speed, latency, rating badge, and tailored advice.
  - Built-in network troubleshooting recommendations.
- **Frequently Asked Topics**:
  - Category-filtered grid of prompt cards.
  - Clicking any card populates the chatbot, executes the query, and scrolls to the chat view.
- **Theme & Accessibility**:
  - Full support for both Light and Dark application themes using standard Tailwind classes mapped to `.dark-app` overrides.
  - Compliant with ARIA guidelines: `role="log"`, `aria-live="polite"`, labeled form controls.

---

## 4. Routing & Security Integration

### 4.1 Route Guarding (`src/App.tsx`)
The `/help` route is nested under the root `<ProtectedRoute>` and `<AppShell>`:
```tsx
<Route
  path="/"
  element={
    <ProtectedRoute>
      <AppShell theme={theme} onThemeChange={handleThemeChange} />
    </ProtectedRoute>
  }
>
  {/* Existing routes */}
  <Route path="help" element={<HelpPage />} />
  <Route path="*" element={<NotFoundPage />} />
</Route>
```
Because `/help` is not wrapped in `StaffOnlyRoute` or `NonStudentJourneyRoute`, authenticated students can access their guide while unauthenticated users are redirected to `/login`.

### 4.2 Sidebar & Mobile Navigation (`src/layouts/AppShell.tsx`)
- Added `{ name: 'Help & Support', to: '/help', icon: HelpCircle }` to the navigation registry.
- Updated `visibleNavItems` so that students see both `Dashboard` (`/`) and `Help & Support` (`/help`).
- Corrected the mobile navigation drawer to iterate over `visibleNavItems` instead of the raw `navItems` array, ensuring role restrictions are maintained across mobile viewports.

---

## 5. Automated Verification & Quality Assurance

### 5.1 Test Suite Breakdown (`npm test`)
46 unit and component tests across 4 test suites pass with 100% success rate:

```text
✓ src/__tests__/helpContent.test.ts (8 tests)
  ✓ contains entries in the knowledge base
  ✓ has unique IDs for all entries
  ✓ has valid structure for every entry
  ✓ contains entries accessible to students
  ✓ contains entries restricted to staff
  ✓ has valid quick topics
  ✓ has labels for all categories in CATEGORY_LABELS
  ✓ has a helpful fallback answer

✓ src/__tests__/helpChatEngine.test.ts (20 tests)
  ✓ tokenize() normalizes text and strips punctuation
  ✓ tokenize() returns original words if all are stopwords
  ✓ tokenize() handles empty or whitespace strings
  ✓ isRoleAllowed() allows any role when "all" is specified
  ✓ isRoleAllowed() restricts staff-only entries from students
  ✓ isRoleAllowed() restricts student-only entries from staff
  ✓ findBestAnswer() finds exact question matches with high confidence
  ✓ findBestAnswer() matches keyword queries
  ✓ findBestAnswer() matches staff-only features for staff users
  ✓ findBestAnswer() does NOT expose staff-only entries to students
  ✓ findBestAnswer() returns student dashboard answers for student queries
  ✓ findBestAnswer() returns fallback with suggestions for unknown queries
  ✓ findBestAnswer() handles empty query gracefully
  ✓ createAssistantMessage() creates an assistant message with answer and links
  ✓ createAssistantMessage() creates a fallback assistant message for unmatched query
  ✓ createUserMessage() creates a formatted user message with trimmed content
  ✓ getInitialMessages() provides role-appropriate welcome message for staff
  ✓ getInitialMessages() provides role-appropriate welcome message for student
  ✓ getContextualSuggestions() returns student-focused suggestions for students
  ✓ getContextualSuggestions() returns staff-focused suggestions for staff

✓ src/__tests__/bandwidthEstimator.test.ts (22 tests)
  ✓ defines expected probe size as exactly 5 MiB (5,242,880 bytes)
  ✓ defines minimum realistic duration threshold
  ✓ reports whether a test is currently running
  ✓ getSpeedRecommendation() returns poor recommendation for < 1 Mbps
  ✓ getSpeedRecommendation() returns fair recommendation for 1 - 5 Mbps
  ✓ getSpeedRecommendation() returns good recommendation for 5 - 25 Mbps
  ✓ getSpeedRecommendation() returns excellent recommendation for >= 25 Mbps
  ✓ runSpeedTest() handles immediately cancelled signal
  ✓ runSpeedTest() successfully computes download throughput for full 5,242,880 bytes
  ✓ runSpeedTest() successfully completes when Content-Length header is missing but full 5,242,880 bytes arrive
  ✓ runSpeedTest() rejects incomplete arrayBuffer response with fewer bytes than expected
  ✓ runSpeedTest() rejects truncated ReadableStream download that ends prematurely
  ✓ runSpeedTest() rejects inconsistent Content-Length header smaller than expected
  ✓ runSpeedTest() rejects non-numeric or invalid Content-Length header
  ✓ runSpeedTest() rejects inconsistent Content-Length header larger than expected
  ✓ runSpeedTest() prevents concurrent speed tests and releases lock when completed
  ✓ runSpeedTest() handles HTTP errors (404/500)
  ✓ runSpeedTest() handles network failure (e.g. offline / connection refused)
  ✓ runSpeedTest() handles timeout when probe takes longer than timeoutMs
  ✓ runSpeedTest() handles external cancellation during active fetch
  ✓ runSpeedTest() handles cancellation mid-stream during ReadableStream reading
  ✓ runSpeedTest() clamps duration to minDurationMs to prevent unrealistic speed measurements on near-zero elapsed time

✓ src/__tests__/HelpPage.test.tsx (8 tests)
  ✓ renders page header and privacy notice
  ✓ renders staff badge for staff role
  ✓ renders student badge for student role
  ✓ renders initial welcome message in the chat panel
  ✓ allows user to send a chat message and receive an assistant response
  ✓ clears chat when Reset button is clicked
  ✓ renders bandwidth estimator card with Run Speed Test button
  ✓ renders Quick Topics and clicking a topic triggers a question

Test Files  4 passed (4)
     Tests  58 passed (58)
```

### 5.2 Build, Static Analysis, & CI Evidence
- **Frontend Test Suite**: **58 passed** across 4 suites in Vitest (46 baseline tests + 12 probe validation and concurrency edge-case tests).
- **Backend Test Suite**: **148 passed, 2 skipped, 0 failures** across 18 test modules in Pytest.
- **CI Python & Node Versions**:
  - CI Workflow runs **Python 3.12** (`actions/setup-python@v5` with `python-version: '3.12'`) and **Node.js 22.x** (`actions/setup-node@v4` with `node-version: '22.x'`).
  - Local development environments operate under Python 3.14.2 and Node.js 24.15.0; both environments achieve 100% test parity.
- **Unverified Live Database Integration vs. Tested Logic**:
  - The 2 skipped backend tests in `backend/tests/test_db_integration.py` (`test_live_supabase_connection` and `test_live_supabase_table_schemas`) require active live Supabase cloud credentials.
  - Because production database keys are kept uncommitted and unconfigured in CI and local clones, **live database integration remains unverified**.
  - All verified tests validate the deterministic risk engines, student success calculators, dynamic weight rescaling, cohort segmentation, CSV validation services, and synthetic repository layer.
- **TypeScript Strict Validation**: `npx tsc -b` exited with code `0` (zero type errors).
- **Linter**: `npm run lint` (`oxlint`) completed with code `0` (zero errors across 64 files).
- **Vite Production Build**: `npm run build` completed in `390ms`, bundling `dist/probe.bin` (exactly 5 MiB / 5,242,880 bytes).

---

## 6. User & Evaluator Guide

### Accessing Help as Staff (Advisor / Faculty / Admin)
1. Sign in using the Advisor demo token (`edunexus-demo-advisor-token`).
2. Click **Help & Support** in the left sidebar navigation (`/help`).
3. Notice the **Staff Knowledge Base** badge.
4. Try queries such as:
   - *"How do I search for a student?"* $\rightarrow$ Returns directory instructions with a direct link to `/students`.
   - *"How do I import CSV data?"* $\rightarrow$ Returns schema details with a direct link to `/csv-hub`.
   - *"How do I create an intervention plan?"* $\rightarrow$ Returns workflow steps with a link to `/interventions`.
5. Click **Run Speed Test** in the Bandwidth Guide panel to verify your local connection throughput.

### Accessing Help as a Student
1. Sign in using the Student demo token (`edunexus-demo-student-token`).
2. Notice the sidebar displays **Dashboard** and **Help & Support**.
3. Navigate to `/help` and verify the **Student Guide** badge is displayed.
4. Try student-specific queries:
   - *"What does my dashboard show?"* $\rightarrow$ Returns guidance on personal progress, attendance, and assessments.
   - *"Can I see my support plans?"* $\rightarrow$ Explains the student view of active interventions.
5. Attempt a staff query (e.g., *"How do I import CSV data?"*); observe that staff administration features are omitted from student responses.
6. Click any **Quick Topic** card to immediately trigger that question in the chatbot.
