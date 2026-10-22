import { describe, it, expect } from 'vitest';
import {
  HELP_ENTRIES,
  QUICK_TOPICS,
  FALLBACK_ANSWER,
  CATEGORY_LABELS,
  type HelpCategory,
  type HelpRole,
} from '../lib/helpContent';

const VALID_CATEGORIES: HelpCategory[] = [
  'general',
  'dashboard',
  'students',
  'interventions',
  'analytics',
  'data',
  'account',
  'bandwidth',
];

const VALID_ROLES: HelpRole[] = ['staff', 'student', 'all'];

describe('Help Content Knowledge Base', () => {
  it('contains entries in the knowledge base', () => {
    expect(HELP_ENTRIES.length).toBeGreaterThan(15);
  });

  it('has unique IDs for all entries', () => {
    const ids = HELP_ENTRIES.map((e) => e.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(ids.length);
  });

  it('has valid structure for every entry', () => {
    for (const entry of HELP_ENTRIES) {
      expect(entry.id).toBeTruthy();
      expect(entry.question.trim().length).toBeGreaterThan(5);
      expect(entry.answer.trim().length).toBeGreaterThan(10);
      expect(entry.keywords.length).toBeGreaterThan(0);
      expect(VALID_CATEGORIES).toContain(entry.category);
      expect(entry.roles.length).toBeGreaterThan(0);

      for (const role of entry.roles) {
        expect(VALID_ROLES).toContain(role);
      }

      if (entry.internalLink) {
        expect(entry.internalLink.startsWith('/')).toBe(true);
        expect(entry.linkLabel).toBeTruthy();
      }
    }
  });

  it('contains entries accessible to students', () => {
    const studentEntries = HELP_ENTRIES.filter(
      (e) => e.roles.includes('student') || e.roles.includes('all')
    );
    expect(studentEntries.length).toBeGreaterThan(5);
  });

  it('contains entries restricted to staff', () => {
    const staffOnlyEntries = HELP_ENTRIES.filter(
      (e) => e.roles.includes('staff') && !e.roles.includes('all')
    );
    expect(staffOnlyEntries.length).toBeGreaterThan(5);
  });

  it('has valid quick topics', () => {
    expect(QUICK_TOPICS.length).toBeGreaterThan(5);
    for (const topic of QUICK_TOPICS) {
      expect(topic.label).toBeTruthy();
      expect(topic.query).toBeTruthy();
      expect(VALID_CATEGORIES).toContain(topic.category);
      for (const role of topic.roles) {
        expect(VALID_ROLES).toContain(role);
      }
    }
  });

  it('has labels for all categories in CATEGORY_LABELS', () => {
    for (const cat of VALID_CATEGORIES) {
      expect(CATEGORY_LABELS[cat]).toBeTruthy();
    }
  });

  it('has a helpful fallback answer', () => {
    expect(FALLBACK_ANSWER).toBeTruthy();
    expect(FALLBACK_ANSWER.length).toBeGreaterThan(20);
  });
});
