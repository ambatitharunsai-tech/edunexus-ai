// EduNexus AI — Curated Help Content Knowledge Base
// All answers are locally defined; no external LLM or API is required.

export type HelpCategory =
  | 'general'
  | 'dashboard'
  | 'students'
  | 'interventions'
  | 'analytics'
  | 'data'
  | 'account'
  | 'bandwidth';

export type HelpRole = 'staff' | 'student' | 'all';

export interface HelpEntry {
  /** Unique stable identifier for this entry. */
  id: string;
  /** Lowercase keywords used for fuzzy matching. */
  keywords: string[];
  /** Human-readable question displayed in the UI. */
  question: string;
  /** Plain-text answer (may contain simple markdown-style emphasis). */
  answer: string;
  /** Grouping category. */
  category: HelpCategory;
  /** Which roles may see this entry. 'all' matches every authenticated user. */
  roles: HelpRole[];
  /** Optional react-router path for a "Go there" link. */
  internalLink?: string;
  /** Label for the internal link button. */
  linkLabel?: string;
}

// ---------------------------------------------------------------------------
// Knowledge base
// ---------------------------------------------------------------------------

export const HELP_ENTRIES: HelpEntry[] = [
  // ── General ───────────────────────────────────────────────────────────────
  {
    id: 'general-what-is',
    keywords: ['what', 'edunexus', 'about', 'platform', 'purpose', 'overview'],
    question: 'What is EduNexus AI?',
    answer:
      'EduNexus AI is a student journey intelligence platform. It brings together attendance, assessments, engagement, placement readiness, skills, LMS activity, and faculty feedback into a single dashboard so that advisors and faculty can identify students who may need support — and students can track their own progress.',
    category: 'general',
    roles: ['all'],
  },
  {
    id: 'general-navigate',
    keywords: ['navigate', 'menu', 'sidebar', 'pages', 'where', 'find', 'go'],
    question: 'How do I navigate the application?',
    answer:
      'Use the sidebar on the left (or the hamburger menu on mobile) to move between pages. Staff members see Dashboard, Students Directory, Student Journey, Interventions, Analytics, Data Hub, and Help. Students see their personal Dashboard and the Help page.',
    category: 'general',
    roles: ['all'],
  },
  {
    id: 'general-theme',
    keywords: ['theme', 'dark', 'light', 'mode', 'appearance', 'color', 'switch'],
    question: 'How do I switch between light and dark themes?',
    answer:
      'Click your profile avatar in the top-right corner, then use the Appearance toggle to switch between Light and Dark themes. Your preference is saved in the browser.',
    category: 'general',
    roles: ['all'],
  },
  {
    id: 'general-accessibility',
    keywords: ['accessibility', 'keyboard', 'screen reader', 'a11y', 'skip', 'motion'],
    question: 'What accessibility features are available?',
    answer:
      'EduNexus AI includes a "Skip to main content" link, keyboard-navigable menus, ARIA labels on interactive elements, and a "Reduce motion" toggle in your profile settings. The entire interface works with keyboard navigation alone.',
    category: 'general',
    roles: ['all'],
  },
  {
    id: 'general-data-privacy',
    keywords: ['privacy', 'data', 'security', 'safe', 'personal', 'who can see'],
    question: 'Is my data private and secure?',
    answer:
      'Yes. Students can only see their own dashboard and cannot access other students\' records. Staff access is governed by role-based permissions. All API requests use bearer-token authentication. Chat messages on this help page are not stored — they exist only while you are on this page.',
    category: 'general',
    roles: ['all'],
  },

  // ── Dashboard ─────────────────────────────────────────────────────────────
  {
    id: 'dashboard-staff-overview',
    keywords: ['dashboard', 'overview', 'kpi', 'summary', 'home', 'staff dashboard'],
    question: 'What does the staff dashboard show?',
    answer:
      'The staff dashboard gives you a high-level overview: total enrolled students, attendance trends, assessment averages, risk distribution, recent activity, and students requiring follow-up. You can also see intervention status and KPMG 7-domain coverage at a glance.',
    category: 'dashboard',
    roles: ['staff'],
    internalLink: '/',
    linkLabel: 'Go to Dashboard',
  },
  {
    id: 'dashboard-student-overview',
    keywords: ['dashboard', 'my dashboard', 'student dashboard', 'progress', 'home'],
    question: 'What does my student dashboard show?',
    answer:
      'Your dashboard shows your personal success score, attendance rate, assessment average, seven-domain progress bars, recent assessments, recent attendance entries, and any active support plans. All data is about you only — you cannot see other students.',
    category: 'dashboard',
    roles: ['student'],
    internalLink: '/',
    linkLabel: 'Go to Dashboard',
  },
  {
    id: 'dashboard-risk-tiers',
    keywords: ['risk', 'tier', 'level', 'critical', 'high', 'moderate', 'low', 'score', 'meaning'],
    question: 'What do the risk tiers mean?',
    answer:
      'Risk tiers (Low, Moderate, High, Critical) are advisory indicators based on attendance, academic performance, and engagement data. They highlight students who may benefit from proactive support. They are NOT disciplinary labels and always require human review before any action is taken.',
    category: 'dashboard',
    roles: ['all'],
  },
  {
    id: 'dashboard-success-score',
    keywords: ['success', 'score', 'kpmg', 'seven', '7', 'domain', 'composite'],
    question: 'How is the Student Success Score calculated?',
    answer:
      'The Student Success Score is a weighted composite across up to seven domains: Attendance, Academics, Placement Readiness, Skills & Certifications, LMS Learning, Faculty Feedback, and Campus Engagement. Missing domains are excluded (not treated as zero). The score ranges from 0-100.',
    category: 'dashboard',
    roles: ['all'],
  },
  {
    id: 'dashboard-demo-data',
    keywords: ['demo', 'synthetic', 'fake', 'sample', 'test data', 'not real'],
    question: 'Is this real or demo data?',
    answer:
      'If you see a "Demo Dataset" or "Synthetic demo data" badge, the application is running with sample data for evaluation purposes. This data is fictional and does not represent real students. Ask your administrator about connecting to live institutional data.',
    category: 'dashboard',
    roles: ['all'],
  },

  // ── Students Directory (Staff) ────────────────────────────────────────────
  {
    id: 'students-search',
    keywords: ['search', 'find', 'student', 'lookup', 'name', 'id', 'filter'],
    question: 'How do I search for a specific student?',
    answer:
      'Use the search bar at the top of the header or go to the Students Directory page. You can search by student name or ID. The directory also offers filters by department, semester, risk tier, academic risk, placement risk, and success score range.',
    category: 'students',
    roles: ['staff'],
    internalLink: '/students',
    linkLabel: 'Go to Students Directory',
  },
  {
    id: 'students-journey',
    keywords: ['journey', 'profile', 'dossier', 'detail', 'individual', 'student page'],
    question: 'How do I view a student\'s full journey profile?',
    answer:
      'From the Students Directory, click on any student row to open their full journey profile. This shows their attendance history, assessment records, engagement logs, risk decomposition, intervention history, timeline events, and seven-domain radar chart.',
    category: 'students',
    roles: ['staff'],
    internalLink: '/journey',
    linkLabel: 'Go to Student Journey',
  },
  {
    id: 'students-export',
    keywords: ['export', 'download', 'csv', 'spreadsheet', 'students list'],
    question: 'Can I export the student list?',
    answer:
      'Yes. On the Students Directory page, click the "Export displayed page" button to download the currently filtered and displayed students as a CSV file.',
    category: 'students',
    roles: ['staff'],
    internalLink: '/students',
    linkLabel: 'Go to Students Directory',
  },
  {
    id: 'students-risk-override',
    keywords: ['override', 'adjust', 'change', 'risk', 'human', 'advisor', 'review'],
    question: 'Can I override a student\'s computed risk tier?',
    answer:
      'Yes. On a student\'s journey profile, click "Adjust Review Tier" in the risk decomposition section. You can set a manual override tier with a reason and your name. This is recorded in the audit trail and clearly marked as a human advisor override.',
    category: 'students',
    roles: ['staff'],
  },

  // ── Interventions (Staff) ─────────────────────────────────────────────────
  {
    id: 'interventions-create',
    keywords: ['create', 'new', 'intervention', 'plan', 'support', 'add'],
    question: 'How do I create a new intervention plan?',
    answer:
      'Go to the Interventions page and click "New Intervention Plan". Select a student, choose the intervention type, set priority, describe the plan, and assign a staff member. You can also create one directly from a student\'s journey profile.',
    category: 'interventions',
    roles: ['staff'],
    internalLink: '/interventions',
    linkLabel: 'Go to Interventions',
  },
  {
    id: 'interventions-lifecycle',
    keywords: ['status', 'lifecycle', 'start', 'complete', 'cancel', 'progress', 'workflow'],
    question: 'What are the intervention lifecycle stages?',
    answer:
      'Interventions follow four stages: Planned → In Progress → Completed (or Cancelled). Use the action buttons on each intervention card to transition between stages. Overdue follow-ups are flagged automatically.',
    category: 'interventions',
    roles: ['staff'],
    internalLink: '/interventions',
    linkLabel: 'Go to Interventions',
  },
  {
    id: 'interventions-outcome',
    keywords: ['outcome', 'record', 'measure', 'baseline', 'follow-up', 'result', 'delta'],
    question: 'How do I record an intervention outcome?',
    answer:
      'On any intervention card, click "Record Outcome". Enter the metric name, baseline value, and observed follow-up value. The system calculates the absolute and percentage change. Note: outcomes show correlation, not causal proof.',
    category: 'interventions',
    roles: ['staff'],
  },
  {
    id: 'interventions-student-view',
    keywords: ['support', 'plan', 'intervention', 'student', 'my plans'],
    question: 'Can I see my support plans?',
    answer:
      'Yes. Your student dashboard includes a "Support plans and follow-ups" section at the bottom. It shows the title, status, priority, and next follow-up date for each active plan. You cannot see the staff notes or internal details.',
    category: 'interventions',
    roles: ['student'],
    internalLink: '/',
    linkLabel: 'Go to Dashboard',
  },

  // ── Analytics (Staff) ─────────────────────────────────────────────────────
  {
    id: 'analytics-overview',
    keywords: ['analytics', 'chart', 'graph', 'trend', 'benchmark', 'comparison', 'department'],
    question: 'What do the analytics show?',
    answer:
      'The Analytics page shows departmental performance comparisons (success score, attendance, assessment averages), the dual-risk matrix quadrant distribution, strategic student segmentation pathways, and seven-domain telemetry coverage across the entire cohort.',
    category: 'analytics',
    roles: ['staff'],
    internalLink: '/analytics',
    linkLabel: 'Go to Analytics',
  },
  {
    id: 'analytics-segments',
    keywords: ['segment', 'cohort', 'group', 'persona', 'classification', 'pathway'],
    question: 'What are student segments?',
    answer:
      'Segments are behavioral groupings that classify students into actionable pathways (e.g., "Thriving Achievers", "Needs Targeted Support"). Each segment includes a recommended intervention approach. Click "View Matching Students" to filter the directory by segment.',
    category: 'analytics',
    roles: ['staff'],
    internalLink: '/analytics',
    linkLabel: 'Go to Analytics',
  },

  // ── Data Hub (Staff) ──────────────────────────────────────────────────────
  {
    id: 'data-csv-import',
    keywords: ['csv', 'import', 'upload', 'data', 'ingest', 'bulk', 'file'],
    question: 'How do I import CSV data?',
    answer:
      'Go to the Data & CSV Hub page. Select the dataset type (students, attendance, assessments, etc.), upload your CSV file, and the system validates it against the expected schema. If validation passes, you can commit the import with a deduplication strategy (skip or overwrite).',
    category: 'data',
    roles: ['staff'],
    internalLink: '/csv-hub',
    linkLabel: 'Go to Data Hub',
  },
  {
    id: 'data-templates',
    keywords: ['template', 'format', 'schema', 'headers', 'columns', 'download template'],
    question: 'Where can I download CSV templates?',
    answer:
      'The Data Hub page has a "Standard Schema CSV Templates" section with downloadable templates for each data type: Students, Attendance, Assessments, Engagement, Placement, Skills, Feedback, and LMS. Each template includes the required column headers.',
    category: 'data',
    roles: ['staff'],
    internalLink: '/csv-hub',
    linkLabel: 'Go to Data Hub',
  },
  {
    id: 'data-reset-demo',
    keywords: ['reset', 'demo', 'synthetic', 'restore', 'baseline', 'seed'],
    question: 'How do I reset the demo data?',
    answer:
      'On the Data Hub page, click "Reset Synthetic Demo Data (1-Click)" to restore the default 36-student evaluation dataset. This only affects in-memory demo data and never alters production Supabase tables.',
    category: 'data',
    roles: ['staff'],
    internalLink: '/csv-hub',
    linkLabel: 'Go to Data Hub',
  },

  // ── Account ───────────────────────────────────────────────────────────────
  {
    id: 'account-sign-out',
    keywords: ['sign out', 'logout', 'log out', 'exit', 'leave'],
    question: 'How do I sign out?',
    answer:
      'Click your profile avatar in the top-right corner and select "Sign out". This clears your session token from the browser. You will be redirected to the login page.',
    category: 'account',
    roles: ['all'],
  },
  {
    id: 'account-roles',
    keywords: ['role', 'permission', 'access', 'advisor', 'admin', 'faculty', 'student', 'staff'],
    question: 'What user roles are available?',
    answer:
      'EduNexus AI supports several roles: Student (personal dashboard only), Advisor/Faculty/Staff (full cohort access including interventions and analytics), and Admin (administrative governance). Each role determines which pages and features are visible.',
    category: 'account',
    roles: ['all'],
  },
  {
    id: 'account-token',
    keywords: ['token', 'bearer', 'authentication', 'login', 'session', 'how to login'],
    question: 'How does authentication work?',
    answer:
      'You sign in with a bearer token on the login page. Demo accounts are provided for evaluation. The token is stored locally in your browser and sent as an Authorization header with each API request. Staff-only operations are enforced by backend role checks.',
    category: 'account',
    roles: ['all'],
  },

  // ── Bandwidth ─────────────────────────────────────────────────────────────
  {
    id: 'bandwidth-what',
    keywords: ['bandwidth', 'speed', 'test', 'internet', 'connection', 'download', 'mbps'],
    question: 'What is the bandwidth speed test?',
    answer:
      'The bandwidth speed test measures your download speed by fetching a small file from this application\'s server. It gives you an estimate in Mbps and a recommendation for whether your connection is suitable for using the platform comfortably. No results are stored or sent anywhere.',
    category: 'bandwidth',
    roles: ['all'],
  },
  {
    id: 'bandwidth-slow',
    keywords: ['slow', 'loading', 'performance', 'lag', 'buffering', 'takes long'],
    question: 'The application feels slow — what can I do?',
    answer:
      'First, try the bandwidth speed test on this page to check your connection. If your speed is below 1 Mbps, the platform may load slowly. You can also try: refreshing the page, closing other tabs, switching to a wired connection, or enabling "Compact navigation" and "Reduce motion" in your profile settings.',
    category: 'bandwidth',
    roles: ['all'],
  },
];

// ---------------------------------------------------------------------------
// Quick-topic suggestions shown as cards in the Help page UI
// ---------------------------------------------------------------------------

export interface QuickTopic {
  label: string;
  query: string;
  category: HelpCategory;
  roles: HelpRole[];
}

export const QUICK_TOPICS: QuickTopic[] = [
  { label: 'Getting started', query: 'What is EduNexus AI?', category: 'general', roles: ['all'] },
  { label: 'My dashboard', query: 'What does my student dashboard show?', category: 'dashboard', roles: ['student'] },
  { label: 'Staff dashboard', query: 'What does the staff dashboard show?', category: 'dashboard', roles: ['staff'] },
  { label: 'Risk tiers explained', query: 'What do the risk tiers mean?', category: 'dashboard', roles: ['all'] },
  { label: 'Search students', query: 'How do I search for a specific student?', category: 'students', roles: ['staff'] },
  { label: 'Create intervention', query: 'How do I create a new intervention plan?', category: 'interventions', roles: ['staff'] },
  { label: 'My support plans', query: 'Can I see my support plans?', category: 'interventions', roles: ['student'] },
  { label: 'Import CSV data', query: 'How do I import CSV data?', category: 'data', roles: ['staff'] },
  { label: 'Test my speed', query: 'What is the bandwidth speed test?', category: 'bandwidth', roles: ['all'] },
  { label: 'Sign out', query: 'How do I sign out?', category: 'account', roles: ['all'] },
  { label: 'Switch theme', query: 'How do I switch between light and dark themes?', category: 'general', roles: ['all'] },
  { label: 'Success score', query: 'How is the Student Success Score calculated?', category: 'dashboard', roles: ['all'] },
];

// ---------------------------------------------------------------------------
// Fallback answer when no match is found
// ---------------------------------------------------------------------------

export const FALLBACK_ANSWER =
  "I'm sorry, I don't have a specific answer for that question. Try rephrasing your question or choose one of the suggested topics below. If you need further assistance, contact your institution's support team.";

// ---------------------------------------------------------------------------
// Category display metadata
// ---------------------------------------------------------------------------

export const CATEGORY_LABELS: Record<HelpCategory, string> = {
  general: 'General',
  dashboard: 'Dashboard',
  students: 'Students',
  interventions: 'Interventions',
  analytics: 'Analytics',
  data: 'Data Hub',
  account: 'Account',
  bandwidth: 'Bandwidth',
};
