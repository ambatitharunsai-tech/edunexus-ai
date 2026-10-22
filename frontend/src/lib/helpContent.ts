// EduNexus AI — Curated Help Content Knowledge Base
// All answers are verified against the platform implementation; strictly client-side & in-memory.

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
  /** Lowercase keywords used for lexical and TF-IDF matching. */
  keywords: string[];
  /** Curated domain-specific synonyms and phrasing variants. */
  synonyms?: string[];
  /** Human-readable question displayed in the UI and suggestions. */
  question: string;
  /** Plain-text answer (structured, direct, and verified). */
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
    keywords: ['what', 'edunexus', 'about', 'platform', 'purpose', 'overview', 'mission'],
    synonyms: ['system overview', 'product summary', 'what does this do', 'platform purpose'],
    question: 'What is EduNexus AI?',
    answer:
      'EduNexus AI is a student journey intelligence platform. It brings together attendance, assessments, engagement, placement readiness, skills, LMS activity, and faculty feedback into a single dashboard so that advisors and faculty can identify students who may need support — and students can track their own progress.',
    category: 'general',
    roles: ['all'],
  },
  {
    id: 'general-navigate',
    keywords: ['navigate', 'menu', 'sidebar', 'pages', 'where', 'find', 'go', 'routing'],
    synonyms: ['app navigation', 'how to use sidebar', 'find pages', 'switch screen'],
    question: 'How do I navigate the application?',
    answer:
      'Use the primary sidebar on desktop or the top mobile drawer to move between sections. Staff members access the Executive Dashboard, Students Directory, Student Journey, Interventions, Analytics, Data Hub, and Help. Authenticated students see their personal overview and Help center.',
    category: 'general',
    roles: ['all'],
  },
  {
    id: 'general-theme',
    keywords: ['theme', 'dark', 'light', 'mode', 'appearance', 'color', 'switch', 'toggle'],
    synonyms: ['change theme', 'night mode', 'light theme', 'dark theme', 'display mode'],
    question: 'How do I switch between light and dark themes?',
    answer:
      'Click your profile avatar in the top header and select the Light or Dark theme toggle. Your preference is saved locally in your browser storage.',
    category: 'general',
    roles: ['all'],
  },
  {
    id: 'general-accessibility',
    keywords: ['accessibility', 'keyboard', 'screen reader', 'a11y', 'skip', 'motion', 'reduced motion'],
    synonyms: ['accessible', 'skip to main content', 'aria', 'focus states', 'high contrast'],
    question: 'What accessibility features are available?',
    answer:
      'EduNexus AI provides full keyboard navigation, explicit focus rings, ARIA roles, a skip-to-content shortcut, high-contrast color tokens, and a "Reduce motion" preference toggle in profile settings.',
    category: 'general',
    roles: ['all'],
  },
  {
    id: 'general-data-privacy',
    keywords: ['privacy', 'data', 'security', 'safe', 'personal', 'who can see', 'confidentiality'],
    synonyms: ['ferpa', 'data protection', 'student confidentiality', 'is my data safe'],
    question: 'Is my data private and secure?',
    answer:
      'Yes. Strict role-based access control ensures students can only view their own records. Cross-student inspection is blocked at both frontend and backend layers. All API calls require valid bearer tokens, and chatbot interactions remain local and in-memory.',
    category: 'general',
    roles: ['all'],
  },
  {
    id: 'general-ethical-governance',
    keywords: ['ethical', 'governance', 'human', 'oversight', 'punishment', 'disciplinary', 'advisory'],
    synonyms: ['ai ethics', 'fairness', 'is risk automatic', 'disciplinary decision'],
    question: 'What is the ethical policy for risk indicators?',
    answer:
      'Risk scores and tiers in EduNexus AI are strictly diagnostic and advisory. They highlight students who may benefit from academic coaching or support. They are never used for autonomous punishments, adverse disciplinary decisions, or automated grading.',
    category: 'general',
    roles: ['all'],
  },

  // ── Dashboard ─────────────────────────────────────────────────────────────
  {
    id: 'dashboard-staff-overview',
    keywords: ['dashboard', 'overview', 'kpi', 'summary', 'home', 'staff dashboard', 'executive'],
    synonyms: ['advisor view', 'campus overview', 'cohort summary', 'metrics cards'],
    question: 'What does the staff dashboard show?',
    answer:
      'The staff dashboard provides an executive overview of your student cohort: total enrolled students, average attendance rate, assessment trends, risk distributions, recent activity milestones, follow-up queues, and seven-domain evidence coverage.',
    category: 'dashboard',
    roles: ['staff'],
    internalLink: '/',
    linkLabel: 'Go to Dashboard',
  },
  {
    id: 'dashboard-student-overview',
    keywords: ['dashboard', 'my dashboard', 'student dashboard', 'progress', 'home', 'my progress', 'my performance', 'my score'],
    synonyms: ['student view', 'personal progress', 'my grades', 'how am i doing', 'view my performance'],
    question: 'What does my student dashboard show?',
    answer:
      'Your student dashboard displays your personal Student Success Score, attendance rate, academic assessment average, seven-domain progress indicators, recent assessments, recorded attendance logs, and active support plans.',
    category: 'dashboard',
    roles: ['student'],
    internalLink: '/',
    linkLabel: 'Go to Dashboard',
  },
  {
    id: 'dashboard-risk-tiers',
    keywords: ['risk', 'tier', 'level', 'critical', 'high', 'moderate', 'low', 'score', 'meaning', 'threshold'],
    synonyms: ['risk category', 'risk status', 'what does high risk mean', 'risk levels'],
    question: 'What do the risk tiers mean?',
    answer:
      'Risk tiers (Low, Moderate, High, Critical) are advisory indicators based on attendance, academic performance, and engagement data. They highlight students who may benefit from proactive support. They are NOT disciplinary labels and always require human review before any action is taken.',
    category: 'dashboard',
    roles: ['all'],
  },
  {
    id: 'dashboard-success-score',
    keywords: ['success', 'score', 'kpmg', 'seven', '7', 'domain', 'composite', 'formula', 'calculation', 'total score', 'overall score'],
    synonyms: ['how is score calculated', 'success index', 'scoring formula', 'composite metric', 'what does my total score mean', 'total score meaning'],
    question: 'How is the Student Success Score calculated?',
    answer:
      'The Student Success Score is a composite index (0-100) combining up to seven domains: Attendance, Academics, Placement Readiness, Skills, LMS Activity, Faculty Feedback, and Campus Engagement. Each domain contributes a defined weight.',
    category: 'dashboard',
    roles: ['all'],
  },
  {
    id: 'dashboard-missing-domains',
    keywords: ['missing', 'domain', 'incomplete', 'unrecorded', 'telemetry', 'partial', 'not recorded', 'attendance missing', 'one domain missing'],
    synonyms: [
      'missing domain handling',
      'what if attendance is missing',
      'what if data is missing',
      'unrecorded evidence',
      'why is my attendance percentage missing',
      'what happens when one domain is missing',
      'what happens if a domain is missing',
    ],
    question: 'How does the score handle missing domains or attendance data?',
    answer:
      'When evidence for a domain (such as LMS activity or attendance) has not been recorded, EduNexus AI excludes that domain and proportionally renormalizes the weights of the available domains. Missing domains are never penalized as zero.',
    category: 'dashboard',
    roles: ['all'],
  },
  {
    id: 'dashboard-dual-risk',
    keywords: ['dual', 'risk', 'academic', 'placement', 'decoupled', 'matrix', 'quadrant', 'difference', 'preparation', 'readiness', 'career', 'poor'],
    synonyms: [
      'academic risk vs placement risk',
      'two risk scores',
      'quadrant analysis',
      'dual risk model',
      'my placement preparation is poor',
      'placement preparation',
      'placement readiness',
    ],
    question: 'What is the difference between academic risk and placement risk?',
    answer:
      'EduNexus AI decouples Academic Risk (grades, exams, course completion) from Placement Risk (career readiness, resume, interview practice, certifications). A student can excel academically while still needing placement guidance, or vice versa.',
    category: 'dashboard',
    roles: ['all'],
  },
  {
    id: 'dashboard-seven-domains',
    keywords: [
      'seven',
      'domains',
      '7',
      'kpmg',
      'framework',
      'pillars',
      'components',
      'lms',
      'moodle',
      'canvas',
      'activity',
      'engagement',
      'feedback',
      'mentorship',
    ],
    synonyms: [
      'what are the 7 domains',
      'seven pillars',
      'kpmg domains',
      'success factors',
      'lms activity',
      'moodle records',
      'learning engagement',
      'canvas integration',
    ],
    question: 'What are the KPMG seven domains of student success?',
    answer:
      'The 7 domains are: 1. Academic Performance (assessments, GPA), 2. Attendance & Punctuality, 3. Placement Readiness, 4. Skills & Certifications, 5. LMS Activity & Learning Engagement, 6. Faculty Feedback & Mentorship, and 7. Campus Co-Curricular Engagement.',
    category: 'dashboard',
    roles: ['all'],
  },
  {
    id: 'dashboard-radar-chart',
    keywords: ['radar', 'spider', 'chart', 'fingerprint', 'graph', 'polygon', 'profile'],
    synonyms: ['radar fingerprint', 'student radar', 'visualize domains', 'spider graph'],
    question: 'What does the 7-domain radar chart show?',
    answer:
      'The radar chart in the Student Journey profile visually charts a student\'s performance across all recorded domains simultaneously. It allows advisors to instantly spot balanced high-achievers versus students who excel in coursework but need placement support.',
    category: 'dashboard',
    roles: ['all'],
  },
  {
    id: 'dashboard-demo-data',
    keywords: ['demo', 'synthetic', 'fake', 'sample', 'test data', 'not real', 'evaluation'],
    synonyms: ['is this live data', 'sample data', 'mock students', 'prototype data'],
    question: 'Is this real or demo data?',
    answer:
      'When the "Demo Dataset" or "Synthetic demo data" badge is visible, the workspace is populated with evaluated fictional students for development and testing. Real production deployments connect to institutional SIS databases.',
    category: 'dashboard',
    roles: ['all'],
  },

  // ── Students Directory (Staff) ────────────────────────────────────────────
  {
    id: 'students-search',
    keywords: ['search', 'find', 'student', 'lookup', 'name', 'id', 'query'],
    synonyms: ['search student', 'find by id', 'lookup record', 'student search'],
    question: 'How do I search for a specific student?',
    answer:
      'Use the global search input in the header or the search bar on the Students Directory page. You can search by student first name, last name, or unique student ID (e.g. "S101").',
    category: 'students',
    roles: ['staff'],
    internalLink: '/students',
    linkLabel: 'Go to Students Directory',
  },
  {
    id: 'students-filter-sort',
    keywords: ['filter', 'sort', 'directory', 'department', 'semester', 'tier', 'refine'],
    synonyms: ['filter students', 'sort by risk', 'sort by score', 'department filter'],
    question: 'How do I filter and sort the student directory?',
    answer:
      'On the Students Directory page, use the filter toolbar to refine by department, semester, overall risk tier, academic risk, placement risk, or success score range. Click any table column header to sort in ascending or descending order.',
    category: 'students',
    roles: ['staff'],
    internalLink: '/students',
    linkLabel: 'Go to Students Directory',
  },
  {
    id: 'students-journey',
    keywords: ['journey', 'profile', 'dossier', 'detail', 'individual', 'student page', 'timeline'],
    synonyms: ['student dossier', 'view journey', 'student timeline', 'student history'],
    question: 'How do I view a student\'s full journey profile?',
    answer:
      'From the Students Directory, click any student\'s row to open their chronological Student Journey dossier. It details historical attendance logs, assessment breakdowns, placement markers, risk explanations, and longitudinal timeline milestones.',
    category: 'students',
    roles: ['staff'],
    internalLink: '/journey',
    linkLabel: 'Go to Student Journey',
  },
  {
    id: 'students-export',
    keywords: ['export', 'download', 'csv', 'spreadsheet', 'students list', 'cohort'],
    synonyms: ['download cohort', 'export student table', 'save csv', 'export roster'],
    question: 'Can I export the student list?',
    answer:
      'Yes. Click the "Export displayed page" button on the Students Directory page to download the active filtered list of students as a formatted CSV file.',
    category: 'students',
    roles: ['staff'],
    internalLink: '/students',
    linkLabel: 'Go to Students Directory',
  },
  {
    id: 'students-risk-override',
    keywords: ['override', 'adjust', 'change', 'risk', 'human', 'advisor', 'review', 'manual'],
    synonyms: ['manual override', 'adjust risk tier', 'change student tier', 'advisor judgment'],
    question: 'Can I override a student\'s computed risk tier?',
    answer:
      'Yes. In the Student Journey dossier under Risk Decomposition, click "Adjust Review Tier". Advisors can assign an updated tier with an explanatory rationale. The change is stored with your staff identity in the permanent audit trail.',
    category: 'students',
    roles: ['staff'],
  },
  {
    id: 'students-attendance-records',
    keywords: ['attendance', 'present', 'absent', 'rate', 'percentage', 'sessions', 'missed'],
    synonyms: ['attendance tracking', 'present percentage', 'absenteeism', 'attendance logs'],
    question: 'How is attendance tracked and evaluated?',
    answer:
      'Attendance tracks sessions attended versus total recorded sessions. Rates below 75% trigger advisory flags in both the Student Dashboard and Staff Early-Warning queues. Individual session records appear chronologically in the dossier.',
    category: 'students',
    roles: ['all'],
  },
  {
    id: 'students-assessment-grades',
    keywords: ['marks', 'grades', 'assessment', 'exam', 'tests', 'quizzes', 'gpa', 'cgpa', 'academic performance'],
    synonyms: ['exam results', 'test scores', 'grades tracking', 'marks overview', 'academic evaluation'],
    question: 'How are student grades, marks, and assessments tracked?',
    answer:
      'Assessments record standardized scores, assignment percentages, and exam marks. EduNexus AI tracks assessment trend vectors (improving, stable, declining) to catch early academic struggles before final semester examinations.',
    category: 'students',
    roles: ['all'],
  },

  // ── Interventions (Staff) ─────────────────────────────────────────────────
  {
    id: 'interventions-create',
    keywords: ['create', 'new', 'intervention', 'plan', 'support', 'add', 'assign', 'help student', 'at risk'],
    synonyms: [
      'create support plan',
      'start intervention',
      'add action plan',
      'log support',
      'how can i help a student at risk',
      'help student at risk',
      'support student at risk',
    ],
    question: 'How do I create a new intervention plan?',
    answer:
      'Go to the Interventions page and click "New Intervention Plan". Select a student, assign an intervention category (Tutoring, Counseling, Advising, Career Guidance), define priority and follow-up date, and save.',
    category: 'interventions',
    roles: ['staff'],
    internalLink: '/interventions',
    linkLabel: 'Go to Interventions',
  },
  {
    id: 'interventions-lifecycle',
    keywords: ['status', 'lifecycle', 'start', 'complete', 'cancel', 'progress', 'workflow', 'stages'],
    synonyms: ['intervention stages', 'move to in progress', 'complete plan', 'support plan status'],
    question: 'What are the intervention lifecycle stages?',
    answer:
      'Interventions transition through: Planned → In Progress → Completed (or Cancelled). Cards display status badges and action buttons to advance stages as student coaching progresses.',
    category: 'interventions',
    roles: ['staff'],
    internalLink: '/interventions',
    linkLabel: 'Go to Interventions',
  },
  {
    id: 'interventions-outcome',
    keywords: ['outcome', 'record', 'measure', 'baseline', 'follow-up', 'result', 'delta', 'improvement'],
    synonyms: ['measure outcome', 'record results', 'baseline metric', 'intervention success'],
    question: 'How do I record an intervention outcome?',
    answer:
      'On any active intervention card, click "Record Outcome". Enter baseline value and post-intervention follow-up value (such as attendance % or assessment score). The system computes the quantitative delta and improvement status.',
    category: 'interventions',
    roles: ['staff'],
  },
  {
    id: 'interventions-student-view',
    keywords: ['support', 'plan', 'intervention', 'student', 'my plans', 'action plan'],
    synonyms: ['my support plans', 'student plans', 'what support am i getting', 'coaching plan'],
    question: 'Can I see my support plans?',
    answer:
      'Yes. In your personal Student Dashboard, scroll to the "Support plans and follow-ups" section. You can view assigned support types, scheduled follow-up dates, and active goals. Confidential staff notes are excluded.',
    category: 'interventions',
    roles: ['student'],
    internalLink: '/',
    linkLabel: 'Go to Dashboard',
  },
  {
    id: 'interventions-overdue',
    keywords: ['overdue', 'due', 'follow-up', 'late', 'pending', 'alert'],
    synonyms: ['overdue plans', 'pending follow-ups', 'missed deadline'],
    question: 'How are overdue follow-up dates flagged?',
    answer:
      'When an intervention\'s planned follow-up date passes without an outcome or status update, the system flags it as overdue on the Interventions page and includes it in the header notification counter.',
    category: 'interventions',
    roles: ['staff'],
    internalLink: '/interventions',
    linkLabel: 'Go to Interventions',
  },

  // ── Analytics (Staff) ─────────────────────────────────────────────────────
  {
    id: 'analytics-overview',
    keywords: ['analytics', 'chart', 'graph', 'trend', 'benchmark', 'comparison', 'department', 'campus'],
    synonyms: ['cohort analytics', 'department performance', 'analytics trends', 'campus metrics'],
    question: 'What do the analytics show?',
    answer:
      'The Analytics page provides macro-level cohort analysis: departmental attendance and grade distributions, dual-risk quadrant scatter maps, strategic student segment breakdowns, and domain telemetry completeness.',
    category: 'analytics',
    roles: ['staff'],
    internalLink: '/analytics',
    linkLabel: 'Go to Analytics',
  },
  {
    id: 'analytics-segments',
    keywords: ['segment', 'cohort', 'group', 'persona', 'classification', 'pathway', 'thriving'],
    synonyms: ['student clusters', 'behavioral segments', 'segmentation model', 'student groups'],
    question: 'What are student segments?',
    answer:
      'Segments categorize students into proactive behavioral groups (e.g. "Thriving Achievers", "Academically Strong but Placement-At-Risk", "Needs Urgent Support"). Each category recommends strategic intervention tactics.',
    category: 'analytics',
    roles: ['staff'],
    internalLink: '/analytics',
    linkLabel: 'Go to Analytics',
  },
  {
    id: 'analytics-cohort-comparison',
    keywords: ['cohort', 'department', 'comparison', 'benchmark', 'engineering', 'science', 'business'],
    synonyms: ['compare departments', 'department benchmarks', 'cohort averages'],
    question: 'How do cohort and department comparisons work?',
    answer:
      'The Departmental Benchmarks table aggregates average success scores, attendance rates, and assessment percentages per department, highlighting high-performing programs and cohorts requiring resource allocation.',
    category: 'analytics',
    roles: ['staff'],
    internalLink: '/analytics',
    linkLabel: 'Go to Analytics',
  },

  // ── Data Hub (Staff) ──────────────────────────────────────────────────────
  {
    id: 'data-csv-import',
    keywords: ['csv', 'import', 'upload', 'data', 'ingest', 'bulk', 'file', 'spreadsheet', 'excel'],
    synonyms: ['upload spreadsheet', 'import file', 'upload csv', 'csv ingestion', 'data hub upload'],
    question: 'How do I import CSV data?',
    answer:
      'Navigate to the Data & CSV Hub. Select the dataset type (Students, Attendance, Assessments, LMS, etc.), drag and drop your formatted CSV, inspect validation diagnostics, choose duplicate handling, and click Commit Import.',
    category: 'data',
    roles: ['staff'],
    internalLink: '/csv-hub',
    linkLabel: 'Go to Data Hub',
  },
  {
    id: 'data-templates',
    keywords: ['template', 'format', 'schema', 'headers', 'columns', 'download template', 'sample'],
    synonyms: ['csv format', 'csv headers', 'download csv template', 'sample spreadsheet'],
    question: 'Where can I download CSV templates?',
    answer:
      'On the Data & CSV Hub page, browse the "Standard Schema CSV Templates" panel. You can download pre-formatted template files with verified column headers for all seven data domains.',
    category: 'data',
    roles: ['staff'],
    internalLink: '/csv-hub',
    linkLabel: 'Go to Data Hub',
  },
  {
    id: 'data-duplicate-handling',
    keywords: ['duplicate', 'handling', 'skip', 'overwrite', 'conflict', 'existing', 'strategy'],
    synonyms: ['duplicate records', 'skip or overwrite', 'csv conflict resolution', 'deduplication strategy'],
    question: 'How does EduNexus AI handle duplicate student records during CSV import?',
    answer:
      'EduNexus AI offers two deduplication strategies during CSV ingestion: "Skip existing" (preserves existing database records and only adds new entries) or "Overwrite" (updates existing records matching student ID with imported values).',
    category: 'data',
    roles: ['staff'],
    internalLink: '/csv-hub',
    linkLabel: 'Go to Data Hub',
  },
  {
    id: 'data-schema-validation',
    keywords: ['schema', 'validation', 'error', 'invalid', 'missing column', 'dry run', 'diagnostics'],
    synonyms: ['csv validation error', 'failed import', 'schema mismatch', 'bad csv file'],
    question: 'What happens if my CSV file has errors or missing columns?',
    answer:
      'The ingestion engine runs pre-flight schema validation before touching data. If required columns are missing or dates are malformed, it highlights row-by-row error diagnostics so you can correct your file without corrupting records.',
    category: 'data',
    roles: ['staff'],
    internalLink: '/csv-hub',
    linkLabel: 'Go to Data Hub',
  },
  {
    id: 'data-reset-demo',
    keywords: ['reset', 'demo', 'synthetic', 'restore', 'baseline', 'seed'],
    synonyms: ['reset demo dataset', 'reload synthetic data', 'restore default students'],
    question: 'How do I reset the demo data?',
    answer:
      'On the Data & CSV Hub page, click "Reset Synthetic Demo Data (1-Click)" to restore the standard baseline cohort. This operation is non-destructive to production databases.',
    category: 'data',
    roles: ['staff'],
    internalLink: '/csv-hub',
    linkLabel: 'Go to Data Hub',
  },

  // ── Account ───────────────────────────────────────────────────────────────
  {
    id: 'account-sign-out',
    keywords: ['sign out', 'logout', 'log out', 'exit', 'leave'],
    synonyms: ['how to sign out', 'logout of edunexus', 'disconnect session'],
    question: 'How do I sign out?',
    answer:
      'Click your profile avatar in the upper right header and select "Sign out". This clears your active bearer token from browser storage and returns you to the login screen.',
    category: 'account',
    roles: ['all'],
  },
  {
    id: 'account-roles',
    keywords: ['role', 'permission', 'access', 'advisor', 'admin', 'faculty', 'student', 'staff'],
    synonyms: ['user roles', 'who can access', 'advisor permissions', 'student permissions'],
    question: 'What user roles are available?',
    answer:
      'EduNexus AI enforces three permission tiers: 1. Student (personal learning dashboard and help), 2. Advisor & Faculty (cohort directory, risk dossier, intervention plans, analytics), and 3. Admin (data ingestion and governance).',
    category: 'account',
    roles: ['all'],
  },
  {
    id: 'account-token',
    keywords: ['token', 'bearer', 'authentication', 'login', 'session', 'how to login'],
    synonyms: ['bearer token', 'sign in method', 'how to log in', 'auth token'],
    question: 'How does authentication work?',
    answer:
      'You sign in with a bearer token on the login page. Demo accounts are provided for evaluation. The token is stored locally in your browser and sent as an Authorization header with each API request. Staff-only operations are enforced by backend role checks.',
    category: 'account',
    roles: ['all'],
  },
  {
    id: 'account-troubleshooting',
    keywords: ['unlinked', 'account', 'troubleshoot', 'cannot login', 'expired', 'error', 'student record'],
    synonyms: ['student record not linked', 'login problem', 'session expired', 'cannot see my dashboard'],
    question: 'What should I do if my student record is not linked or login fails?',
    answer:
      'If you see "Your student record is not linked yet", your login token is valid but has not been associated with an institutional student ID. Contact your campus administrator to link your account to your student profile.',
    category: 'account',
    roles: ['all'],
  },

  // ── Bandwidth ─────────────────────────────────────────────────────────────
  {
    id: 'bandwidth-what',
    keywords: ['bandwidth', 'speed', 'test', 'internet', 'connection', 'download', 'mbps', 'network'],
    synonyms: ['internet speed', 'network connection', 'connection speed', 'bandwidth test'],
    question: 'What is the bandwidth speed test?',
    answer:
      'EduNexus AI includes an in-memory client-side bandwidth estimator that evaluates network download speeds to help diagnose slow dashboard rendering in low-connectivity campus environments.',
    category: 'bandwidth',
    roles: ['all'],
  },
  {
    id: 'bandwidth-slow',
    keywords: ['slow', 'loading', 'performance', 'lag', 'buffering', 'takes long', 'connection'],
    synonyms: ['page loading slow', 'dashboard taking long', 'network lag', 'improve speed'],
    question: 'The application feels slow — what can I do?',
    answer:
      'If pages load slowly: 1. Verify your network speed, 2. Enable "Reduce motion" and "Compact navigation" in Profile Settings, 3. Hard-refresh the page to fetch cached assets, or 4. Switch to a stable Wi-Fi connection.',
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
  { label: 'Success score formula', query: 'How is the Student Success Score calculated?', category: 'dashboard', roles: ['all'] },
  { label: 'Missing data policy', query: 'How does the score handle missing domains or attendance data?', category: 'dashboard', roles: ['all'] },
  { label: 'Dual-risk model', query: 'What is the difference between academic risk and placement risk?', category: 'dashboard', roles: ['all'] },
  { label: 'Search students', query: 'How do I search for a specific student?', category: 'students', roles: ['staff'] },
  { label: 'Create intervention', query: 'How do I create a new intervention plan?', category: 'interventions', roles: ['staff'] },
  { label: 'My support plans', query: 'Can I see my support plans?', category: 'interventions', roles: ['student'] },
  { label: 'Import CSV data', query: 'How do I import CSV data?', category: 'data', roles: ['staff'] },
  { label: 'Duplicate handling', query: 'How does EduNexus AI handle duplicate student records during CSV import?', category: 'data', roles: ['staff'] },
  { label: 'Ethical policy', query: 'What is the ethical policy for risk indicators?', category: 'general', roles: ['all'] },
  { label: 'Sign out', query: 'How do I sign out?', category: 'account', roles: ['all'] },
  { label: 'Switch theme', query: 'How do I switch between light and dark themes?', category: 'general', roles: ['all'] },
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
