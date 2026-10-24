import { describe, it, expect } from 'vitest';
import {
  tokenize,
  isRoleAllowed,
  findBestAnswer,
  createAssistantMessage,
  createUserMessage,
  getInitialMessages,
  getContextualSuggestions,
} from '../lib/helpChatEngine';
import { FALLBACK_ANSWER, HELP_ENTRIES } from '../lib/helpContent';

describe('Help Chatbot Engine', () => {
  describe('tokenize()', () => {
    it('normalizes text and strips punctuation', () => {
      const tokens = tokenize('How do I search for students?!');
      expect(tokens).toContain('search');
      expect(tokens).toContain('students');
      expect(tokens).not.toContain('how');
      expect(tokens).not.toContain('do');
    });

    it('returns original words if all are stopwords', () => {
      const tokens = tokenize('what is it');
      expect(tokens.length).toBeGreaterThan(0);
    });

    it('handles empty or whitespace strings', () => {
      expect(tokenize('')).toEqual([]);
      expect(tokenize('   ')).toEqual([]);
    });
  });

  describe('isRoleAllowed()', () => {
    it('allows any role when "all" is specified', () => {
      expect(isRoleAllowed(['all'], 'staff')).toBe(true);
      expect(isRoleAllowed(['all'], 'student')).toBe(true);
    });

    it('restricts staff-only entries from students', () => {
      expect(isRoleAllowed(['staff'], 'staff')).toBe(true);
      expect(isRoleAllowed(['staff'], 'student')).toBe(false);
    });

    it('restricts student-only entries from staff', () => {
      expect(isRoleAllowed(['student'], 'student')).toBe(true);
      expect(isRoleAllowed(['student'], 'staff')).toBe(false);
    });
  });

  describe('findBestAnswer()', () => {
    it('finds exact question matches with high confidence', () => {
      const result = findBestAnswer('What is EduNexus AI?', 'staff');
      expect(result.entry).not.toBeNull();
      expect(result.entry?.id).toBe('general-what-is');
      expect(result.confidence).toBeGreaterThanOrEqual(70);
    });

    it('matches keyword queries', () => {
      const result = findBestAnswer('how to switch dark theme', 'staff');
      expect(result.entry).not.toBeNull();
      expect(result.entry?.id).toBe('general-theme');
    });

    it('matches staff-only features for staff users', () => {
      const result = findBestAnswer('how do I import csv data', 'staff');
      expect(result.entry).not.toBeNull();
      expect(result.entry?.id).toBe('data-csv-import');
    });

    it('does NOT expose staff-only entries to students', () => {
      const result = findBestAnswer('how do I import csv data', 'student');
      // Should not return the staff CSV import entry
      if (result.entry) {
        expect(result.entry.roles).not.toEqual(['staff']);
      } else {
        expect(result.entry).toBeNull();
      }
    });

    it('returns student dashboard answers for student queries', () => {
      const result = findBestAnswer('what does my dashboard show', 'student');
      expect(result.entry).not.toBeNull();
      expect(result.entry?.id).toBe('dashboard-student-overview');
    });

    it('returns fallback with suggestions for unknown queries', () => {
      const result = findBestAnswer('what is the airspeed of an unladen swallow', 'student');
      expect(result.entry).toBeNull();
      expect(result.confidence).toBe(0);
      expect(result.suggestions.length).toBeGreaterThan(0);
    });

    it('handles empty query gracefully', () => {
      const result = findBestAnswer('   ', 'staff');
      expect(result.entry).toBeNull();
      expect(result.confidence).toBe(0);
      expect(result.suggestions.length).toBeGreaterThan(0);
    });
  });

  describe('createAssistantMessage()', () => {
    it('creates an assistant message with answer and links for matched query', () => {
      const msg = createAssistantMessage('search student', 'staff');
      expect(msg.role).toBe('assistant');
      expect(msg.content).toBeTruthy();
      expect(msg.internalLink).toBe('/students');
      expect(msg.linkLabel).toBeTruthy();
      expect(msg.category).toBe('students');
      expect(msg.suggestedQuestions).toBeDefined();
    });

    it('creates a fallback assistant message for unmatched query', () => {
      const msg = createAssistantMessage('xyz123randomgarbagequestion', 'student');
      expect(msg.role).toBe('assistant');
      expect(msg.content).toBe(FALLBACK_ANSWER);
      expect(msg.suggestedQuestions?.length).toBeGreaterThan(0);
    });
  });

  describe('createUserMessage()', () => {
    it('creates a formatted user message with trimmed content', () => {
      const msg = createUserMessage('   How do I sign out?   ');
      expect(msg.role).toBe('user');
      expect(msg.content).toBe('How do I sign out?');
      expect(msg.id).toBeTruthy();
      expect(msg.timestamp).toBeGreaterThan(0);
    });
  });

  describe('getInitialMessages()', () => {
    it('provides role-appropriate welcome message for staff', () => {
      const msgs = getInitialMessages('staff');
      expect(msgs.length).toBe(1);
      expect(msgs[0].role).toBe('assistant');
      expect(msgs[0].content).toContain('Staff');
    });

    it('provides role-appropriate welcome message for student', () => {
      const msgs = getInitialMessages('student');
      expect(msgs.length).toBe(1);
      expect(msgs[0].role).toBe('assistant');
      expect(msgs[0].content).toContain('student dashboard');
    });
  });

  describe('getContextualSuggestions()', () => {
    it('returns student-focused suggestions for students', () => {
      const suggestions = getContextualSuggestions('student');
      expect(suggestions.length).toBeGreaterThan(0);
      for (const s of suggestions) {
        const entry = HELP_ENTRIES.find((e) => e.question === s);
        if (entry) {
          expect(isRoleAllowed(entry.roles, 'student')).toBe(true);
        }
      }
    });

    it('returns staff-focused suggestions for staff', () => {
      const suggestions = getContextualSuggestions('staff');
      expect(suggestions.length).toBeGreaterThan(0);
      for (const s of suggestions) {
        const entry = HELP_ENTRIES.find((e) => e.question === s);
        if (entry) {
          expect(isRoleAllowed(entry.roles, 'staff')).toBe(true);
        }
      }
    });
  });
});
