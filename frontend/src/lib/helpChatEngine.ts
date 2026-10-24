// EduNexus AI — Enhanced Conversational NLP Retrieval Engine (Client-Side)
// Pure TypeScript hybrid retrieval: BM25 term weighting, synonym/intent expansion,
// bounded Levenshtein typo correction, and multi-turn conversational follow-up resolution.
// Strictly in-memory & privacy-preserving: zero external LLM API calls, zero telemetry transmitted.

import {
  HELP_ENTRIES,
  FALLBACK_ANSWER,
  type HelpCategory,
  type HelpEntry,
  type HelpRole,
} from './helpContent';

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
  category?: HelpCategory;
  internalLink?: string;
  linkLabel?: string;
  suggestedQuestions?: string[];
  matchedEntryId?: string;
  confidence?: number;
}

export interface MatchResult {
  entry: HelpEntry | null;
  confidence: number;
  suggestions: string[];
  matchType?: 'exact' | 'hybrid' | 'synonym' | 'followup' | 'fuzzy' | 'fallback';
}

// ---------------------------------------------------------------------------
// 1. Text Normalization & Linguistic Preprocessing
// ---------------------------------------------------------------------------

const CONTRACTIONS: Record<string, string> = {
  "what's": 'what is',
  "how's": 'how is',
  "where's": 'where is',
  "there's": 'there is',
  "who's": 'who is',
  "it's": 'it is',
  "that's": 'that is',
  "can't": 'cannot',
  "won't": 'will not',
  "don't": 'do not',
  "doesn't": 'does not',
  "didn't": 'did not',
  "i'm": 'i am',
  "you're": 'you are',
  "we're": 'we are',
  "they're": 'they are',
  "i've": 'i have',
  "you've": 'you have',
  "we've": 'we have',
  "haven't": 'have not',
  "hasn't": 'has not',
  "aren't": 'are not',
  "isn't": 'is not',
  "wasn't": 'was not',
  "weren't": 'were not',
};

// Common English stopwords to ignore during multi-token BM25 indexing
const STOPWORDS = new Set([
  'a', 'an', 'and', 'are', 'as', 'at', 'be', 'by', 'can', 'could', 'did', 'do', 'does', 'for', 'from',
  'how', 'i', 'in', 'is', 'it', 'me', 'my', 'of', 'on', 'or',
  'should', 'that', 'the', 'this', 'to', 'was', 'what', 'when', 'where', 'which', 'who', 'will', 'with', 'would'
]);

/**
 * Expand English contractions to standard formal forms.
 */
export function expandContractions(text: string): string {
  if (!text) return '';
  return text.replace(/([a-zA-Z]+'[a-zA-Z]+)/g, (match) => {
    const lower = match.toLowerCase();
    return CONTRACTIONS[lower] || match;
  });
}

/**
 * Normalize input string: lowercase, contraction expansion, safe punctuation stripping.
 */
export function normalizeText(text: string): string {
  if (!text) return '';
  const expanded = expandContractions(text.trim());
  return expanded
    .toLowerCase()
    .replace(/[^\w\s-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Lightweight English stemmer for morphological plural and inflection normalization.
 */
export function stemWord(word: string): string {
  if (word.length <= 3) return word;

  // Plural/singular normalization
  if (word.endsWith('ies') && word.length > 4) {
    return word.slice(0, -3) + 'y';
  }
  if (word.endsWith('es') && word.length > 4 && (word.endsWith('sses') || word.endsWith('ches') || word.endsWith('shes'))) {
    return word.slice(0, -2);
  }
  if (word.endsWith('s') && !word.endsWith('ss') && word.length > 3) {
    return word.slice(0, -1);
  }

  // Verbal participle reductions
  if (word.endsWith('ing') && word.length > 5) {
    const base = word.slice(0, -3);
    return base.endsWith('ll') ? base.slice(0, -1) : base;
  }
  if (word.endsWith('ed') && word.length > 5) {
    return word.slice(0, -2);
  }

  return word;
}

/**
 * Tokenize and normalize input text into lowercase words with stopword filtering.
 */
export function tokenize(text: string): string[] {
  if (!text) return [];
  const normalized = normalizeText(text);
  const words = normalized.split(/\s+/).filter(Boolean);
  const filtered = words.filter((w) => !STOPWORDS.has(w));
  return filtered.length > 0 ? filtered : words;
}

/**
 * Tokenize, filter stopwords, and apply morphological stemming.
 */
export function tokenizeAndStem(text: string): string[] {
  return tokenize(text).map(stemWord);
}

const OUT_OF_SCOPE_REGEX = [
  /\b(write|compose|generate|create)\s+(a\s+)?(poem|song|story|essay|joke|riddle|haiku|lyrics)\b/i,
  /\b(tell\s+(me\s+)?a\s+(joke|story|riddle))\b/i,
  /\b(flight\s+velocity|unladen\s+swallow)\b/i,
  /\b(recipe\s+for|weather\s+in|capital\s+of)\b/i,
];

/**
 * Detect queries that are explicitly outside the platform help scope.
 */
export function isOutOfScopeQuery(query: string): boolean {
  if (!query) return false;
  const trimmed = query.trim();
  return OUT_OF_SCOPE_REGEX.some((re) => re.test(trimmed));
}

/**
 * Check if a role string matches the user's role.
 */
export function isRoleAllowed(entryRoles: HelpRole[], userRole: 'staff' | 'student'): boolean {
  if (entryRoles.includes('all')) return true;
  return entryRoles.includes(userRole);
}

// ---------------------------------------------------------------------------
// 2. Domain Synonyms & Educational Intent Mapping
// ---------------------------------------------------------------------------

export const DOMAIN_SYNONYMS: Record<string, string[]> = {
  // Assessment & Academic Performance
  mark: ['assessment', 'grade', 'exam', 'score', 'academic'],
  marks: ['assessment', 'grade', 'exam', 'score', 'academic'],
  grade: ['assessment', 'mark', 'exam', 'score', 'academic'],
  grades: ['assessment', 'mark', 'exam', 'score', 'academic'],
  gpa: ['academic', 'performance', 'assessment', 'score', 'grade'],
  cgpa: ['academic', 'performance', 'assessment', 'score', 'grade'],
  exam: ['assessment', 'test', 'grade', 'academic', 'score'],
  exams: ['assessment', 'test', 'grade', 'academic', 'score'],
  test: ['assessment', 'exam', 'quiz', 'academic'],
  tests: ['assessment', 'exam', 'quiz', 'academic'],
  quiz: ['assessment', 'exam', 'test'],
  quizzes: ['assessment', 'exam', 'test'],

  // Attendance
  present: ['attendance', 'session', 'rate'],
  absent: ['attendance', 'missed', 'session'],
  absenteeism: ['attendance', 'absent', 'rate'],
  absence: ['attendance', 'missed', 'session'],
  absences: ['attendance', 'missed', 'session'],
  session: ['attendance', 'recorded'],

  // Placement & Career Readiness
  job: ['placement', 'career', 'readiness', 'interview'],
  career: ['placement', 'readiness', 'job', 'employability'],
  interview: ['placement', 'preparation', 'career'],
  interviews: ['placement', 'preparation', 'career'],
  employability: ['placement', 'readiness', 'career'],
  placement: ['career', 'readiness', 'job'],
  preparation: ['readiness', 'placement', 'career', 'training'],
  poor: ['low', 'risk', 'weak', 'lagging', 'struggling'],
  total: ['composite', 'overall', 'success', 'score'],
  help: ['support', 'intervention', 'action', 'guide', 'assist'],

  // Indian College & Student Terminology
  backlog: ['assessment', 'grade', 'academic', 'exam'],
  backlogs: ['assessment', 'grade', 'academic', 'exam'],
  arrear: ['assessment', 'grade', 'academic', 'exam'],
  arrears: ['assessment', 'grade', 'academic', 'exam'],
  bunk: ['attendance', 'absent', 'rate', 'session'],
  bunked: ['attendance', 'absent', 'rate', 'session'],
  shortage: ['attendance', 'absent', 'rate', 'session'],
  sem: ['academic', 'assessment', 'grade', 'term'],
  semester: ['academic', 'assessment', 'grade', 'term'],
  internal: ['assessment', 'exam', 'test', 'academic'],
  internals: ['assessment', 'exam', 'test', 'academic'],
  midterm: ['assessment', 'exam', 'test', 'academic'],
  midterms: ['assessment', 'exam', 'test', 'academic'],
  internship: ['placement', 'career', 'readiness', 'job'],
  internships: ['placement', 'career', 'readiness', 'job'],
  proctor: ['advisor', 'mentor', 'feedback', 'faculty'],
  hod: ['faculty', 'advisor', 'mentor', 'feedback'],

  // Data Hub & CSV Ingestion
  spreadsheet: ['csv', 'data', 'import', 'upload', 'file'],
  excel: ['csv', 'data', 'import', 'upload', 'file'],
  ingest: ['import', 'csv', 'data', 'upload'],
  ingestion: ['import', 'csv', 'data', 'upload'],
  upload: ['import', 'csv', 'data', 'file'],
  import: ['csv', 'data', 'upload', 'ingest'],

  // LMS & Learning
  lms: ['learning', 'activity', 'moodle', 'canvas', 'engagement'],
  moodle: ['lms', 'learning', 'activity'],
  canvas: ['lms', 'learning', 'activity'],

  // Radar & Visualizations
  radar: ['chart', 'spider', 'polygon', 'fingerprint', 'dossier'],
  spider: ['radar', 'chart', 'fingerprint', 'dossier'],
  fingerprint: ['radar', 'chart', 'domain', 'dossier'],

  // Human Review & Override
  override: ['adjust', 'manual', 'risk', 'tier', 'advisor'],
  adjust: ['override', 'manual', 'tier', 'risk'],

  // Ethic & Governance
  ethical: ['governance', 'advisory', 'disciplinary', 'policy'],
  punishment: ['disciplinary', 'ethical', 'advisory', 'governance'],
  penalty: ['disciplinary', 'ethical', 'missing', 'zero'],
};

/**
 * Expand tokens with domain-specific synonyms and stemmed equivalents.
 */
export function expandSynonyms(tokens: string[]): string[] {
  const expanded = new Set<string>();
  for (const token of tokens) {
    expanded.add(token);
    const unstemmed = token;
    const directSyns = DOMAIN_SYNONYMS[unstemmed] || DOMAIN_SYNONYMS[stemWord(unstemmed)];
    if (directSyns) {
      for (const s of directSyns) {
        expanded.add(stemWord(s));
      }
    }
  }
  return Array.from(expanded);
}

// ---------------------------------------------------------------------------
// 3. Bounded Levenshtein Distance for Typo Tolerance
// ---------------------------------------------------------------------------

/**
 * Standard Levenshtein distance calculation between two short strings.
 */
export function levenshteinDistance(s1: string, s2: string): number {
  const m = s1.length;
  const n = s2.length;
  const dp: number[][] = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));

  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (s1[i - 1] === s2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1];
      } else {
        dp[i][j] = 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
      }
    }
  }
  return dp[m][n];
}

/**
 * Safe bounded typo correction against known vocabulary.
 * Distance <= 1 for tokens >= 4 chars; Distance <= 2 for tokens >= 7 chars.
 */
export function correctTypos(tokens: string[], vocabulary: Set<string>): string[] {
  return tokens.map((token) => {
    if (vocabulary.has(token)) return token;
    if (token.length < 4) return token;

    const maxAllowedDistance = token.length >= 7 ? 2 : 1;
    let closestWord = token;
    let minDistance = maxAllowedDistance + 1;

    for (const vocabWord of vocabulary) {
      if (Math.abs(vocabWord.length - token.length) > maxAllowedDistance) continue;
      const dist = levenshteinDistance(token, vocabWord);
      if (dist < minDistance) {
        minDistance = dist;
        closestWord = vocabWord;
      }
    }

    return minDistance <= maxAllowedDistance ? closestWord : token;
  });
}

// ---------------------------------------------------------------------------
// 4. Conversational Context & Multi-Turn Resolution
// ---------------------------------------------------------------------------

export interface ConversationTurn {
  userQuery: string;
  assistantEntryId?: string;
  assistantCategory?: HelpCategory;
}

/**
 * Detect whether the user's query is an anaphoric follow-up to the preceding turn.
 */
export function isFollowUpQuery(query: string): boolean {
  const q = query.toLowerCase().trim();
  const followUpStarters = [
    'what if', 'what happens', 'what happens if', 'what happens when',
    'how about', 'what about', 'and if', 'why is that',
    'where do i', 'how do i', 'can i', 'what does that mean',
    'how is it', 'how are they', 'tell me more',
  ];
  if (followUpStarters.some((prefix) => q.startsWith(prefix))) return true;

  // Pronoun references without explicit domain noun
  const pronouns = ['it', 'that', 'this', 'them', 'these', 'those'];
  const words = q.split(/\s+/);
  if (words.some((w) => pronouns.includes(w)) && words.length <= 7) {
    return true;
  }

  return false;
}

/**
 * Resolve follow-up query against previous conversation turn context.
 */
export function resolveConversationContext(
  query: string,
  history?: ChatMessage[]
): { enhancedQuery: string; contextEntryId?: string; contextCategory?: HelpCategory } {
  if (!history || history.length === 0) {
    return { enhancedQuery: query };
  }

  // Find the most recent assistant message with a matched entry
  const lastAssistantMsg = [...history].reverse().find((m) => m.role === 'assistant' && (m.category || m.internalLink));
  if (!lastAssistantMsg || !isFollowUpQuery(query)) {
    return { enhancedQuery: query };
  }

  const category = lastAssistantMsg.category;
  const contextTokens: string[] = [];

  if (category) {
    contextTokens.push(category);
  }

  // Specific contextual follow-up bindings:
  const normalizedQuery = normalizeText(query);
  if (
    normalizedQuery.includes('missing') ||
    normalizedQuery.includes('not recorded') ||
    normalizedQuery.includes('incomplete') ||
    normalizedQuery.includes('one domain')
  ) {
    contextTokens.push('missing', 'domain', 'unrecorded', 'renormalizes', 'excluded', 'zero');
  } else if (normalizedQuery.includes('import') || normalizedQuery.includes('upload') || normalizedQuery.includes('spreadsheet')) {
    contextTokens.push('csv', 'hub', 'data');
  } else if (
    (lastAssistantMsg.matchedEntryId?.includes('tier') || lastAssistantMsg.matchedEntryId?.includes('risk')) &&
    (normalizedQuery.includes('change') || normalizedQuery.includes('adjust') || normalizedQuery.includes('override') || normalizedQuery.includes('manual'))
  ) {
    contextTokens.push('risk', 'tier', 'override', 'adjust', 'manual');
  }

  const enhancedQuery = `${query} ${contextTokens.join(' ')}`.trim();
  return {
    enhancedQuery,
    contextCategory: category,
  };
}

// ---------------------------------------------------------------------------
// 5. BM25 Hybrid Retrieval Scoring Engine
// ---------------------------------------------------------------------------

/**
 * Extract preprocessed search text document for a HelpEntry.
 */
export function buildEntryDocument(entry: HelpEntry): string[] {
  const parts: string[] = [
    entry.question,
    entry.category,
    ...(entry.keywords || []),
    ...(entry.synonyms || []),
  ];
  const rawTokens = tokenize(parts.join(' '));
  const stemmed = rawTokens.map(stemWord);
  return Array.from(new Set([...rawTokens, ...stemmed]));
}

/**
 * Build a vocabulary set from all accessible entries.
 */
export function buildVocabulary(entries: HelpEntry[]): Set<string> {
  const vocab = new Set<string>();
  for (const entry of entries) {
    const docTokens = buildEntryDocument(entry);
    for (const t of docTokens) vocab.add(t);
  }
  // Add common domain synonyms into the typo correction vocabulary
  for (const key of Object.keys(DOMAIN_SYNONYMS)) {
    vocab.add(stemWord(key));
    for (const syn of DOMAIN_SYNONYMS[key]) vocab.add(stemWord(syn));
  }
  return vocab;
}

/**
 * Calculate BM25 score for a document against a set of query tokens.
 */
export function calculateBM25Score(
  queryTokens: string[],
  docTokens: string[],
  avgDocLength: number,
  docFrequency: Map<string, number>,
  totalDocs: number,
  k1 = 1.2,
  b = 0.75
): number {
  const docLen = docTokens.length;
  if (docLen === 0) return 0;

  // Term frequency in current document
  const termFreq = new Map<string, number>();
  for (const t of docTokens) {
    termFreq.set(t, (termFreq.get(t) || 0) + 1);
  }

  let score = 0;
  for (const token of queryTokens) {
    const tf = termFreq.get(token) || 0;
    if (tf === 0) continue;

    const df = docFrequency.get(token) || 1;
    // Standard Robertson-Spärck Jones IDF
    const idf = Math.log(1 + (totalDocs - df + 0.5) / (df + 0.5));
    const numerator = tf * (k1 + 1);
    const denominator = tf + k1 * (1 - b + b * (docLen / avgDocLength));
    score += idf * (numerator / denominator);
  }

  return Math.max(0, score);
}

/**
 * Compute similarity score between a query and a help entry using BM25 and exact/phrase boosts.
 */
export function scoreEntry(
  queryTokens: string[],
  rawQueryNormalized: string,
  entry: HelpEntry
): number {
  let score = 0;
  const entryQuestionNorm = normalizeText(entry.question);

  // 1. Exact full-sentence match gets maximal boost
  if (entryQuestionNorm === rawQueryNormalized) {
    score += 100;
  } else if (rawQueryNormalized.length > 5 && entryQuestionNorm.includes(rawQueryNormalized)) {
    score += 60;
  }

  // 2. Token overlap and phrase matching
  const docTokens = buildEntryDocument(entry);
  const docSet = new Set(docTokens);
  const querySet = new Set(queryTokens);

  let matchCount = 0;
  for (const q of querySet) {
    if (docSet.has(q)) matchCount++;
  }

  score += matchCount * 12;

  // 3. Keyword and question specific boosting
  for (const kw of entry.keywords) {
    const kwNorm = normalizeText(kw);
    if (rawQueryNormalized.includes(kwNorm)) {
      score += 15;
    }
  }

  // 4. Category matching bonus
  if (rawQueryNormalized.includes(entry.category.toLowerCase())) {
    score += 10;
  }

  return score;
}

// ---------------------------------------------------------------------------
// 6. Find Best Answer (Hybrid Search Pipeline)
// ---------------------------------------------------------------------------

/**
 * Find the best matching HelpEntry for a user query with hybrid retrieval & confidence.
 */
export function findBestAnswer(
  query: string,
  userRole: 'staff' | 'student',
  entries: HelpEntry[] = HELP_ENTRIES,
  history?: ChatMessage[]
): MatchResult {
  const trimmed = query.trim();
  if (!trimmed) {
    return {
      entry: null,
      confidence: 0,
      suggestions: getContextualSuggestions(userRole, entries),
      matchType: 'fallback',
    };
  }

  // 1. Guardrail against explicitly out-of-scope non-educational requests
  if (isOutOfScopeQuery(trimmed)) {
    return {
      entry: null,
      confidence: 0,
      suggestions: getContextualSuggestions(userRole, entries),
      matchType: 'fallback',
    };
  }

  // Multi-turn conversational context resolution
  const { enhancedQuery, contextCategory } = resolveConversationContext(trimmed, history);

  const rawNormalized = normalizeText(trimmed);
  const enhancedNormalized = normalizeText(enhancedQuery);

  // 2. Strict Role Privacy Guardrail:
  // If a student asks about administrative/staff actions (e.g. CSV import, create intervention,
  // manual risk override, reset demo data), do not return a weakly-related student entry.
  if (userRole === 'student') {
    const STAFF_ACTION_VERBS = ['import', 'upload', 'ingest', 'create', 'override', 'adjust', 'modify', 'reset', 'seed'];
    const hasStaffActionVerb = STAFF_ACTION_VERBS.some((verb) => rawNormalized.includes(verb));

    if (hasStaffActionVerb) {
      const staffOnlyEntries = entries.filter((e) => !isRoleAllowed(e.roles, 'student'));
      for (const staffEntry of staffOnlyEntries) {
        const qNorm = normalizeText(staffEntry.question);
        const isExactStaff = qNorm === rawNormalized || qNorm === enhancedNormalized;
        const isContainedStaff = rawNormalized.length >= 8 && qNorm.includes(rawNormalized);

        const matchedStaffKws = (staffEntry.keywords || []).filter((kw) => {
          const kwNorm = normalizeText(kw);
          return rawNormalized.includes(kwNorm) && kwNorm.length >= 4;
        });

        if (isExactStaff || isContainedStaff || matchedStaffKws.length >= 2) {
          return {
            entry: null,
            confidence: 0,
            suggestions: getContextualSuggestions('student', entries),
            matchType: 'fallback',
          };
        }
      }
    }
  }

  // 3. Filter entries strictly visible to user role (guarantees student role-privacy)
  const accessibleEntries = entries.filter((e) => isRoleAllowed(e.roles, userRole));
  if (accessibleEntries.length === 0) {
    return {
      entry: null,
      confidence: 0,
      suggestions: [],
      matchType: 'fallback',
    };
  }

  // 4. Build vocabulary and normalize tokens
  const vocabulary = buildVocabulary(accessibleEntries);
  const baseTokens = tokenize(enhancedNormalized);
  const correctedTokens = correctTypos(baseTokens, vocabulary);
  const expandedTokens = expandSynonyms(correctedTokens);

  // Full-string typo correction for preserved phrase and containment checks
  const rawWords = rawNormalized.split(/\s+/);
  const typoCorrectedRaw = rawWords
    .map((w) => (STOPWORDS.has(w) ? w : correctTypos([w], vocabulary)[0]))
    .join(' ');

  // 5. Build document index & frequencies for BM25
  const entryDocs = accessibleEntries.map((e) => ({
    entry: e,
    tokens: buildEntryDocument(e),
  }));

  const totalDocs = accessibleEntries.length;
  const docFrequency = new Map<string, number>();
  let totalLength = 0;

  for (const { tokens } of entryDocs) {
    totalLength += tokens.length;
    const unique = new Set(tokens);
    for (const t of unique) {
      docFrequency.set(t, (docFrequency.get(t) || 0) + 1);
    }
  }
  const avgDocLength = totalLength / (totalDocs || 1);

  // 6. Score each accessible entry using hybrid BM25 + phrase matching
  const scored = entryDocs.map(({ entry, tokens }) => {
    // Exact match check
    const questionNorm = normalizeText(entry.question);
    const isExact = questionNorm === rawNormalized || questionNorm === typoCorrectedRaw;
    const isContained =
      (rawNormalized.length >= 6 && questionNorm.includes(rawNormalized)) ||
      (typoCorrectedRaw.length >= 6 && questionNorm.includes(typoCorrectedRaw)) ||
      (questionNorm.length >= 10 && (rawNormalized.includes(questionNorm) || typoCorrectedRaw.includes(questionNorm)));

    const bm25 = calculateBM25Score(expandedTokens, tokens, avgDocLength, docFrequency, totalDocs);

    let hybridScore = bm25 * 10;
    if (isExact) hybridScore += 80;
    else if (isContained) hybridScore += 45;

    // Disambiguation for "my dashboard" vs "staff dashboard"
    if (userRole === 'student' && entry.id === 'dashboard-student-overview' && (rawNormalized.includes('my') || rawNormalized.includes('dashboard') || rawNormalized.includes('progress'))) {
      hybridScore += 25;
    }
    if (userRole === 'staff' && entry.id === 'dashboard-staff-overview' && (rawNormalized === 'dashboard' || rawNormalized === 'overview')) {
      hybridScore += 20;
    }

    // Conversational context alignment
    if (contextCategory && entry.category === contextCategory) {
      hybridScore += 12;
    }

    // Query token coverage check: prevent incidental 1-word matches on long queries
    const distinctQueryTokens = new Set(correctedTokens.map(stemWord));
    let matchedDistinctCount = 0;
    for (const qt of distinctQueryTokens) {
      if (
        tokens.includes(qt) ||
        (DOMAIN_SYNONYMS[qt] && DOMAIN_SYNONYMS[qt].some((s) => tokens.includes(stemWord(s))))
      ) {
        matchedDistinctCount++;
      }
    }
    const coverage = distinctQueryTokens.size > 0 ? matchedDistinctCount / distinctQueryTokens.size : 1;

    // For queries with 3+ content words, avoid spurious matches from a single incidental word
    if (distinctQueryTokens.size >= 3 && matchedDistinctCount < 2 && coverage < 0.35 && !isExact && !isContained) {
      hybridScore = 0;
    }

    return {
      entry,
      score: hybridScore,
      isExact,
    };
  });

  scored.sort((a, b) => b.score - a.score);
  const best = scored[0];
  const runnerUp = scored[1];

  // Calibrated threshold policy
  const threshold = 14;

  if (best && best.score >= threshold) {
    // Calculate normalized confidence score
    let confidence = 85;
    if (best.isExact) {
      confidence = 98;
    } else if (runnerUp && best.score < runnerUp.score * 1.25) {
      // Close tie between two entries
      confidence = 65;
    } else if (best.score >= 35) {
      confidence = 90;
    } else {
      confidence = Math.min(85, Math.max(50, Math.round(best.score * 2.2)));
    }

    // Related questions filtered by role
    const related = accessibleEntries
      .filter((e) => e.id !== best.entry.id)
      .sort((a, b) => {
        const aSameCat = a.category === best.entry.category ? 1 : 0;
        const bSameCat = b.category === best.entry.category ? 1 : 0;
        return bSameCat - aSameCat;
      })
      .slice(0, 3)
      .map((e) => e.question);

    return {
      entry: best.entry,
      confidence,
      suggestions: related,
      matchType: best.isExact ? 'exact' : 'hybrid',
    };
  }

  // Low or zero match: return safe fallback with suggestions
  return {
    entry: null,
    confidence: 0,
    suggestions: getContextualSuggestions(userRole, accessibleEntries),
    matchType: 'fallback',
  };
}

/**
 * Return default suggested questions appropriate for the given role.
 */
export function getContextualSuggestions(
  userRole: 'staff' | 'student',
  entries: HelpEntry[] = HELP_ENTRIES
): string[] {
  const accessible = entries.filter((e) => isRoleAllowed(e.roles, userRole));
  if (userRole === 'student') {
    const defaultStudent = [
      'What does my student dashboard show?',
      'How is the Student Success Score calculated?',
      'Can I see my support plans?',
      'What do the risk tiers mean?',
    ];
    return accessible
      .filter((e) => defaultStudent.includes(e.question))
      .map((e) => e.question)
      .slice(0, 4);
  }

  const defaultStaff = [
    'How do I search for a specific student?',
    'How do I create a new intervention plan?',
    'What do the analytics show?',
    'How do I import CSV data?',
  ];
  return accessible
    .filter((e) => defaultStaff.includes(e.question))
    .map((e) => e.question)
    .slice(0, 4);
}

/**
 * Generate a unique ID for chat messages.
 */
export function generateMessageId(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  return `msg-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}

/**
 * Create a user message object.
 */
export function createUserMessage(content: string): ChatMessage {
  return {
    id: generateMessageId(),
    role: 'user',
    content: content.trim(),
    timestamp: Date.now(),
  };
}

/**
 * Handle a user query and return an assistant response message with conversational context.
 */
export function createAssistantMessage(
  query: string,
  userRole: 'staff' | 'student',
  entries: HelpEntry[] = HELP_ENTRIES,
  history?: ChatMessage[]
): ChatMessage {
  const result = findBestAnswer(query, userRole, entries, history);

  if (result.entry) {
    let responseContent = result.entry.answer;

    // Clarification prefix for medium-confidence matches
    if (result.confidence < 70 && result.confidence >= 50) {
      responseContent = `Based on your question about **${result.entry.category}**, here is the verified guidance:\n\n${result.entry.answer}`;
    }

    return {
      id: generateMessageId(),
      role: 'assistant',
      content: responseContent,
      timestamp: Date.now(),
      category: result.entry.category,
      internalLink: result.entry.internalLink,
      linkLabel: result.entry.linkLabel,
      suggestedQuestions: result.suggestions,
      matchedEntryId: result.entry.id,
      confidence: result.confidence,
    };
  }

  return {
    id: generateMessageId(),
    role: 'assistant',
    content: FALLBACK_ANSWER,
    timestamp: Date.now(),
    suggestedQuestions: result.suggestions,
    confidence: 0,
  };
}

/**
 * Get initial welcome messages when opening the help page.
 */
export function getInitialMessages(userRole: 'staff' | 'student'): ChatMessage[] {
  const isStaff = userRole === 'staff';
  const welcomeText = isStaff
    ? 'Hello! I am your EduNexus AI Staff Help Assistant. Ask me anything about navigating the platform, student directory filters, risk score calculations, intervention workflows, analytics, or CSV data ingestion.'
    : 'Hello! I am your EduNexus AI Help Assistant. Ask me anything about your student dashboard, success scores, attendance tracking, support plans, or platform navigation.';

  return [
    {
      id: 'welcome-message',
      role: 'assistant',
      content: welcomeText,
      timestamp: Date.now(),
      suggestedQuestions: getContextualSuggestions(userRole),
    },
  ];
}
