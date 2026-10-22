// EduNexus AI — Help Chatbot Engine (Client-Side)
// Pure keyword matching and ranking; no external LLM or backend calls.

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
}

export interface MatchResult {
  entry: HelpEntry | null;
  confidence: number;
  suggestions: string[];
}

// Common English stopwords to ignore in multi-token queries
const STOPWORDS = new Set([
  'a', 'an', 'and', 'are', 'as', 'at', 'be', 'by', 'can', 'could', 'did', 'do', 'does', 'for', 'from',
  'how', 'i', 'in', 'is', 'it', 'me', 'my', 'of', 'on', 'or',
  'should', 'that', 'the', 'this', 'to', 'was', 'what', 'when', 'where', 'which', 'who', 'will', 'with', 'would'
]);

/**
 * Tokenize and normalize input text into lowercase words.
 */
export function tokenize(text: string): string[] {
  if (!text) return [];
  const normalized = text
    .toLowerCase()
    .replace(/[^\w\s-]/g, ' ')
    .trim();
  const words = normalized.split(/\s+/).filter(Boolean);
  const filtered = words.filter((w) => !STOPWORDS.has(w));
  return filtered.length > 0 ? filtered : words;
}

/**
 * Check if a role string matches the user's role.
 */
export function isRoleAllowed(entryRoles: HelpRole[], userRole: 'staff' | 'student'): boolean {
  if (entryRoles.includes('all')) return true;
  return entryRoles.includes(userRole);
}

/**
 * Compute similarity score between a normalized query and a help entry.
 * Higher score indicates a stronger match.
 */
export function scoreEntry(
  queryTokens: string[],
  rawQueryNormalized: string,
  entry: HelpEntry
): number {
  let score = 0;

  const entryQuestionLower = entry.question.toLowerCase();

  // Exact question match gets maximum confidence
  if (rawQueryNormalized.length > 3 && entryQuestionLower.includes(rawQueryNormalized)) {
    score += 50;
  }
  if (entryQuestionLower === rawQueryNormalized) {
    score += 100;
  }

  // Token matching against keywords
  for (const token of queryTokens) {
    for (const kw of entry.keywords) {
      const kwLower = kw.toLowerCase();
      if (kwLower === token) {
        score += 15;
      } else if (kwLower.includes(token) || token.includes(kwLower)) {
        score += 8;
      }
    }

    // Token matching against question text
    if (entryQuestionLower.includes(token)) {
      score += 10;
    }

    // Token matching against category
    if (entry.category.toLowerCase() === token) {
      score += 12;
    }
  }

  return score;
}

/**
 * Find the best matching HelpEntry for a user query.
 */
export function findBestAnswer(
  query: string,
  userRole: 'staff' | 'student',
  entries: HelpEntry[] = HELP_ENTRIES
): MatchResult {
  const trimmed = query.trim();
  if (!trimmed) {
    return {
      entry: null,
      confidence: 0,
      suggestions: getContextualSuggestions(userRole, entries),
    };
  }

  const rawNormalized = trimmed.toLowerCase().replace(/[^\w\s-]/g, ' ').trim();
  const tokens = tokenize(trimmed);

  // Filter entries visible to this user role
  const accessibleEntries = entries.filter((e) => isRoleAllowed(e.roles, userRole));

  // Score accessible entries
  const scored = accessibleEntries
    .map((entry) => ({
      entry,
      score: scoreEntry(tokens, rawNormalized, entry),
    }))
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score);

  const best = scored[0];
  const threshold = 12; // Minimum score threshold to consider a match

  if (best && best.score >= threshold) {
    // Generate related suggestions from the same category or overall
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
      confidence: Math.min(100, Math.round(best.score * 1.5)),
      suggestions: related,
    };
  }

  // No adequate match found: return fallback with top suggested questions
  return {
    entry: null,
    confidence: 0,
    suggestions: getContextualSuggestions(userRole, accessibleEntries),
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
 * Handle a user query and return an assistant response message.
 */
export function createAssistantMessage(
  query: string,
  userRole: 'staff' | 'student',
  entries: HelpEntry[] = HELP_ENTRIES
): ChatMessage {
  const result = findBestAnswer(query, userRole, entries);

  if (result.entry) {
    return {
      id: generateMessageId(),
      role: 'assistant',
      content: result.entry.answer,
      timestamp: Date.now(),
      category: result.entry.category,
      internalLink: result.entry.internalLink,
      linkLabel: result.entry.linkLabel,
      suggestedQuestions: result.suggestions,
    };
  }

  return {
    id: generateMessageId(),
    role: 'assistant',
    content: FALLBACK_ANSWER,
    timestamp: Date.now(),
    suggestedQuestions: result.suggestions,
  };
}

/**
 * Get initial welcome messages when opening the help page.
 */
export function getInitialMessages(userRole: 'staff' | 'student'): ChatMessage[] {
  const isStaff = userRole === 'staff';
  const welcomeText = isStaff
    ? 'Hello! I am your EduNexus AI Staff Help Assistant. Ask me anything about navigating the platform, student directory filters, risk score calculations, intervention workflows, analytics, or CSV data ingestion.'
    : 'Hello! I am your EduNexus AI Help Assistant. Ask me anything about your student dashboard, success scores, attendance tracking, support plans, or how to test your connection speed.';

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
