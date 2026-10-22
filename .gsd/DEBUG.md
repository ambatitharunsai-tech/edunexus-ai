# Debug Session: EduNexus AI — Refresh 404 and Repeated Page Loading

## Symptom 1: Refreshing a route displays "Not Found"
- **When:** User navigates to any deep route (e.g., `/students`, `/journey`, `/interventions`, `/analytics`, `/csv-hub`, `/help`) on the production deployment `https://edunexus-ai-web.onrender.com/` and refreshes the browser or accesses the URL directly.
- **Expected:** The browser receives HTTP 200 with `index.html`, React Router boots, evaluates the path, and renders the requested route (or redirects to `/login` if unauthenticated).
- **Actual:** The server returns `HTTP 404 Not Found` (content-type: `text/plain; charset=utf-8`) with response body `"Not Found"`, displaying a blank black/white page with only the text "Not Found".

## Symptom 2: Repeated Page Buffering and Loading Spinners during Navigation
- **When:** Navigating between internal links/tabs (e.g., Dashboard -> Analytics -> Students -> Dashboard).
- **Expected:** Transitions should be fluid and instant; cached data should render immediately without full-screen loading spinners if fresh or revalidating in the background.
- **Actual:** Every page navigation triggers an unmount/remount cycle that wipes hook states (`data: null`, `loading: true`), immediately displaying full-page loading spinners and sending duplicate concurrent network requests (e.g. `/api/v1/dashboard/overview` called concurrently by `AppShell` and `DashboardPage`).

---

## Evidence Gathered
1. **Edge Probe for Symptom 1:**
   - Command: `curl -i -s https://edunexus-ai-web.onrender.com/students`
   - Response:
     ```http
     HTTP/2 404 
     content-type: text/plain; charset=utf-8
     rndr-id: 445da1ef-8bde-486f
     server: cloudflare
     Not Found
     ```
   - All client routes (`/login`, `/students`, `/journey`, `/interventions`, `/analytics`, `/csv-hub`, `/help`) return 404 text/plain directly from the Render static web server (`rndr-id`).
   - Only `/` returns HTTP 200 with `index.html`.
   - `frontend/public/_redirects` contains `/* /index.html 200`, which is Netlify/Cloudflare Pages syntax. Render Static Sites DO NOT parse `_redirects` files automatically.
   - No `render.yaml` exists in the repository, and no rewrite rule (`/* -> /index.html`) is currently configured in the Render static site dashboard.

2. **Network & Timing Probe for Symptom 2:**
   - Backend URL: `https://edunexus-ai-api-z0v1.onrender.com/api/v1/health`
   - Cold start latency observed: ~47s when spun down due to Render free-tier idle policy (spins down after 15 minutes of inactivity).
   - Warm latency observed: ~0.28s - 0.41s.
   - Inspection of `frontend/src/lib/api.ts`: Direct uncached `fetch()` with no request deduplication and no in-memory cache.
   - Inspection of `frontend/src/hooks/useDashboardData.ts`:
     - Every hook instance starts with `data: null` and `loading: true`.
     - Whenever a component mounts, `fetchData()` sets `loading = true`.
   - Inspection of `frontend/src/layouts/AppShell.tsx`:
     - `AppShell` runs an effect on mount to fetch `/api/v1/dashboard/overview` for the notification bell.
     - `DashboardPage` also mounts and calls `useDashboardData()`, triggering a duplicate `/api/v1/dashboard/overview` request concurrently.
     - When user navigates to `/analytics`, `AnalyticsPage` calls `useDashboardData()` again, firing another `/api/v1/dashboard/overview` request while unmounting the old page, wiping local state and showing `<Spinner size="lg" />`.

---

## Hypotheses

| # | Hypothesis | Likelihood | Status |
|---|------------|------------|--------|
| 1 | Render Static Site lacks SPA fallback rewrite rule (`/* -> /index.html`), causing Render edge server to return 404 for deep paths. | 100% | CONFIRMED |
| 2 | Component unmount/remount on navigation combined with lack of in-memory caching and request deduplication in `api.ts` causes repeated full-page loading states. | 100% | CONFIRMED |
| 3 | Concurrent duplicate fetching of `/api/v1/dashboard/overview` between `AppShell` and page views compounds network delays. | 95% | CONFIRMED |
| 4 | Render free-tier backend spin-down causes periodic ~45s delays when service is idle; client-side caching reduces repeated requests after a successful response but cannot eliminate delays for first requests, cache misses, or forced refreshes. | 90% | CONFIRMED |

---

## Attempts & Validation

### Attempt 1: Reproduce & Validate Symptom 1 (Refresh 404)
- **Action:** Sent curl requests to `https://edunexus-ai-web.onrender.com/{route}` across all application routes.
- **Result:** Direct GET to `/students` returns `HTTP 404` with `rndr-id` header and body `"Not Found"`.
- **Conclusion:** CONFIRMED root cause: Render static hosting layer fails to find static file `/students` and has no rewrite rule to route requests to `/index.html`.

### Attempt 2: Reproduce & Validate Symptom 2 (Navigation Loading & Duplicate Requests)
- **Action:** Code audit of `api.ts`, `useDashboardData.ts`, `AppShell.tsx`, and page components; measured backend response times.
- **Result:**
  - `AppShell` and `DashboardPage` fire concurrent identical requests to `/api/v1/dashboard/overview`.
  - Switching between tabs unmounts page components, resetting local state to `data: null` and `loading: true`, causing full-page spinner gates (`if (loading && !data) return <Spinner ...>`) to render on every tab change.
- **Conclusion:** CONFIRMED root cause: Lack of in-memory caching, absence of request deduplication, and eager resetting of loading state on mount.

---

## Resolution Strategy
1. **Issue 1 (Refresh 404):**
   - Add `render.yaml` to repository specifying the static site service with `routes: [{ type: rewrite, source: /*, destination: /index.html }]`.
   - Provide exact Render Dashboard UI steps (Settings -> Redirects/Rewrites -> Add Rule) for immediate live resolution.
2. **Issue 2 (Repeated Loading & Buffering):**
   - Add a lightweight in-memory cache and promise deduplication map to `frontend/src/lib/api.ts` with configurable TTL (default 60s), cache invalidation on mutations (`POST`/`PUT`/`DELETE`), request cancellation via `AbortController`, and a `{ force: true }` option for manual refreshes.
   - Update `useDashboardData.ts` to implement a Stale-While-Revalidate (SWR) pattern: initialize with cached data if available (`loading = false`), and revalidate in background without blocking the UI.
   - Ensure manual refresh triggers a forced refresh with visible refresh indicator while retaining existing data.
   - Ensure network errors or authorization failures transition to the existing error/retry cards rather than infinite spinners.
