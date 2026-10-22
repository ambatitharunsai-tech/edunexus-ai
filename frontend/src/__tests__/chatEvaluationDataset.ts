// EduNexus AI — Synthetic Chatbot Evaluation Benchmark Dataset
// Ground-truth labelled dataset to evaluate conversational NLP retrieval accuracy,
// synonym matching, typo tolerance, multi-turn follow-up resolution, and role privacy.

export interface ChatEvaluationCase {
  id: string;
  query: string;
  userRole: 'staff' | 'student';
  expectedEntryId: string | null; // null represents expected fallback
  category:
    | 'exact_faq'
    | 'paraphrase'
    | 'synonyms_abbreviations'
    | 'typos_misspellings'
    | 'conversational_followup'
    | 'ambiguous_multitopic'
    | 'role_privacy_restriction'
    | 'unsupported_fallback';
  priorTurn?: {
    userQuery: string;
    assistantEntryId: string;
    assistantCategory: string;
  };
  notes?: string;
}

export const CHAT_EVALUATION_DATASET: ChatEvaluationCase[] = [
  // ── 1. Exact FAQ Matches ───────────────────────────────────────────────────
  {
    id: 'exact-01',
    query: 'What is EduNexus AI?',
    userRole: 'staff',
    expectedEntryId: 'general-what-is',
    category: 'exact_faq',
  },
  {
    id: 'exact-02',
    query: 'How is the Student Success Score calculated?',
    userRole: 'staff',
    expectedEntryId: 'dashboard-success-score',
    category: 'exact_faq',
  },
  {
    id: 'exact-03',
    query: 'How do I search for a specific student?',
    userRole: 'staff',
    expectedEntryId: 'students-search',
    category: 'exact_faq',
  },
  {
    id: 'exact-04',
    query: 'How do I import CSV data?',
    userRole: 'staff',
    expectedEntryId: 'data-csv-import',
    category: 'exact_faq',
  },
  {
    id: 'exact-05',
    query: 'What does my student dashboard show?',
    userRole: 'student',
    expectedEntryId: 'dashboard-student-overview',
    category: 'exact_faq',
  },

  // ── 2. Paraphrases & Rephrased Questions ───────────────────────────────────
  {
    id: 'para-01',
    query: 'Tell me about what EduNexus does',
    userRole: 'staff',
    expectedEntryId: 'general-what-is',
    category: 'paraphrase',
  },
  {
    id: 'para-02',
    query: 'Can you explain the formula behind the student success rating?',
    userRole: 'staff',
    expectedEntryId: 'dashboard-success-score',
    category: 'paraphrase',
  },
  {
    id: 'para-03',
    query: 'Where can I find an individual student by their ID?',
    userRole: 'staff',
    expectedEntryId: 'students-search',
    category: 'paraphrase',
  },
  {
    id: 'para-04',
    query: 'Steps to upload new data files into the system',
    userRole: 'staff',
    expectedEntryId: 'data-csv-import',
    category: 'paraphrase',
  },
  {
    id: 'para-05',
    query: 'How can I toggle dark appearance?',
    userRole: 'student',
    expectedEntryId: 'general-theme',
    category: 'paraphrase',
  },
  {
    id: 'para-06',
    query: 'Where do I see my support plans and goals?',
    userRole: 'student',
    expectedEntryId: 'interventions-student-view',
    category: 'paraphrase',
  },
  {
    id: 'para-07',
    query: 'What does the executive campus dashboard display?',
    userRole: 'staff',
    expectedEntryId: 'dashboard-staff-overview',
    category: 'paraphrase',
  },
  {
    id: 'para-08',
    query: 'Can advisors manually modify a student risk level?',
    userRole: 'staff',
    expectedEntryId: 'students-risk-override',
    category: 'paraphrase',
  },

  // ── 3. Synonyms & Domain Abbreviations ─────────────────────────────────────
  {
    id: 'syn-01',
    query: 'Where can I check my marks and exam grades?',
    userRole: 'student',
    expectedEntryId: 'students-assessment-grades',
    category: 'synonyms_abbreviations',
    notes: 'Marks and grades should map to assessments',
  },
  {
    id: 'syn-02',
    query: 'How is student GPA and exam performance tracked?',
    userRole: 'staff',
    expectedEntryId: 'students-assessment-grades',
    category: 'synonyms_abbreviations',
  },
  {
    id: 'syn-03',
    query: 'What is my present percentage and attendance rate?',
    userRole: 'student',
    expectedEntryId: 'students-attendance-records',
    category: 'synonyms_abbreviations',
    notes: 'Present percentage maps to attendance',
  },
  {
    id: 'syn-04',
    query: 'How do I upload an excel spreadsheet of student records?',
    userRole: 'staff',
    expectedEntryId: 'data-csv-import',
    category: 'synonyms_abbreviations',
    notes: 'Excel spreadsheet maps to CSV data import',
  },
  {
    id: 'syn-05',
    query: 'Are students career ready and placement prepared?',
    userRole: 'staff',
    expectedEntryId: 'dashboard-dual-risk',
    category: 'synonyms_abbreviations',
    notes: 'Career ready maps to placement readiness / dual risk',
  },
  {
    id: 'syn-06',
    query: 'What are the KPMG seven pillars of student success?',
    userRole: 'staff',
    expectedEntryId: 'dashboard-seven-domains',
    category: 'synonyms_abbreviations',
  },
  {
    id: 'syn-07',
    query: 'How do I download the roster of students as a file?',
    userRole: 'staff',
    expectedEntryId: 'students-export',
    category: 'synonyms_abbreviations',
  },
  {
    id: 'syn-08',
    query: 'How does the system handle LMS activity and Moodle records?',
    userRole: 'staff',
    expectedEntryId: 'dashboard-seven-domains',
    category: 'synonyms_abbreviations',
  },

  // ── 4. Typos & Misspellings (Bounded Levenshtein) ───────────────────────────
  {
    id: 'typo-01',
    query: 'How do I creat a new intervetion plan?',
    userRole: 'staff',
    expectedEntryId: 'interventions-create',
    category: 'typos_misspellings',
    notes: 'Typo: creat -> create, intervetion -> intervention',
  },
  {
    id: 'typo-02',
    query: 'What do the analitics show for departments?',
    userRole: 'staff',
    expectedEntryId: 'analytics-overview',
    category: 'typos_misspellings',
    notes: 'Typo: analitics -> analytics',
  },
  {
    id: 'typo-03',
    query: 'How is the scroe calculated?',
    userRole: 'student',
    expectedEntryId: 'dashboard-success-score',
    category: 'typos_misspellings',
    notes: 'Typo: scroe -> score',
  },
  {
    id: 'typo-04',
    query: 'Where can I see the radr spider chart?',
    userRole: 'staff',
    expectedEntryId: 'dashboard-radar-chart',
    category: 'typos_misspellings',
    notes: 'Typo: radr -> radar',
  },
  {
    id: 'typo-05',
    query: 'How is student attendence logged?',
    userRole: 'staff',
    expectedEntryId: 'students-attendance-records',
    category: 'typos_misspellings',
    notes: 'Typo: attendence -> attendance',
  },

  // ── 5. Conversational Follow-Up Queries ────────────────────────────────────
  {
    id: 'followup-01',
    query: 'What if attendance data is missing?',
    userRole: 'staff',
    expectedEntryId: 'dashboard-missing-domains',
    category: 'conversational_followup',
    priorTurn: {
      userQuery: 'How is the Student Success Score calculated?',
      assistantEntryId: 'dashboard-success-score',
      assistantCategory: 'dashboard',
    },
    notes: 'Resolves elliptical missing telemetry question in context of score calculation',
  },
  {
    id: 'followup-02',
    query: 'How do I import the data?',
    userRole: 'staff',
    expectedEntryId: 'data-csv-import',
    category: 'conversational_followup',
    priorTurn: {
      userQuery: 'Where can I download CSV templates?',
      assistantEntryId: 'data-templates',
      assistantCategory: 'data',
    },
    notes: 'Resolves import data after downloading templates',
  },
  {
    id: 'followup-03',
    query: 'What if a domain is not recorded?',
    userRole: 'student',
    expectedEntryId: 'dashboard-missing-domains',
    category: 'conversational_followup',
    priorTurn: {
      userQuery: 'What does my student dashboard show?',
      assistantEntryId: 'dashboard-student-overview',
      assistantCategory: 'dashboard',
    },
  },
  {
    id: 'followup-04',
    query: 'Can I change it manually?',
    userRole: 'staff',
    expectedEntryId: 'students-risk-override',
    category: 'conversational_followup',
    priorTurn: {
      userQuery: 'What do the risk tiers mean?',
      assistantEntryId: 'dashboard-risk-tiers',
      assistantCategory: 'dashboard',
    },
    notes: 'Resolves pronoun "it" to risk tier manual override',
  },

  // ── 6. Missing Telemetry & Score Policy ─────────────────────────────────────
  {
    id: 'missing-01',
    query: 'Does missing attendance count as zero in the score?',
    userRole: 'staff',
    expectedEntryId: 'dashboard-missing-domains',
    category: 'paraphrase',
  },
  {
    id: 'missing-02',
    query: 'How are missing domains handled in the 7-domain composite?',
    userRole: 'student',
    expectedEntryId: 'dashboard-missing-domains',
    category: 'paraphrase',
  },

  // ── 7. Role-Based Privacy & Restriction Enforcement ────────────────────────
  {
    id: 'role-01',
    query: 'How do I import CSV data?',
    userRole: 'student',
    expectedEntryId: null, // Students MUST NOT match staff-only data import
    category: 'role_privacy_restriction',
    notes: 'Staff-only workflow must not be exposed to students',
  },
  {
    id: 'role-02',
    query: 'How do I create a new intervention plan?',
    userRole: 'student',
    expectedEntryId: null, // Students cannot create interventions
    category: 'role_privacy_restriction',
  },
  {
    id: 'role-03',
    query: 'How do I adjust or override a student review tier?',
    userRole: 'student',
    expectedEntryId: null, // Students cannot override risk tiers
    category: 'role_privacy_restriction',
  },
  {
    id: 'role-04',
    query: 'How do I reset synthetic demo data?',
    userRole: 'student',
    expectedEntryId: null, // Students cannot reset data
    category: 'role_privacy_restriction',
  },

  // ── 8. Ambiguous / Clarification Queries ───────────────────────────────────
  {
    id: 'ambig-01',
    query: 'my progress',
    userRole: 'student',
    expectedEntryId: 'dashboard-student-overview',
    category: 'ambiguous_multitopic',
  },
  {
    id: 'ambig-02',
    query: 'duplicate records',
    userRole: 'staff',
    expectedEntryId: 'data-duplicate-handling',
    category: 'ambiguous_multitopic',
  },
  {
    id: 'ambig-03',
    query: 'ethical policy for risk',
    userRole: 'staff',
    expectedEntryId: 'general-ethical-governance',
    category: 'ambiguous_multitopic',
  },

  // ── 9. Unsupported / Out-of-Scope Queries (Fallback) ──────────────────────
  {
    id: 'fallback-01',
    query: 'What is the flight velocity of an unladen swallow?',
    userRole: 'staff',
    expectedEntryId: null,
    category: 'unsupported_fallback',
  },
  {
    id: 'fallback-02',
    query: 'Can you write a poem about artificial intelligence?',
    userRole: 'student',
    expectedEntryId: null,
    category: 'unsupported_fallback',
  },
  {
    id: 'fallback-03',
    query: 'asldkfjhsdfkjh random gibberish',
    userRole: 'student',
    expectedEntryId: null,
    category: 'unsupported_fallback',
  },
];
