import { describe, it, expect } from 'vitest';
import { findBestAnswer, createAssistantMessage, type ChatMessage } from '../lib/helpChatEngine';
import { HELP_ENTRIES } from '../lib/helpContent';

describe('Prompt Section 2.B and Section 4 Examples Evaluation', () => {
  it('evaluates Section 2.B prompt query examples', () => {
    // 1. "My marks are low" -> academic performance guidance
    const res1 = findBestAnswer('My marks are low', 'student');
    console.log('Query 1 [My marks are low]:', res1.entry?.id, res1.confidence, res1.entry?.question);
    expect(res1.entry?.id).toBe('students-assessment-grades');

    // 2. "Why is my attendance percentage missing?" -> attendance / missing telemetry guidance
    const res2 = findBestAnswer('Why is my attendance percentage missing?', 'student');
    console.log('Query 2 [Why is my attendance percentage missing?]:', res2.entry?.id, res2.confidence, res2.entry?.question);
    expect(['dashboard-missing-domains', 'students-attendance-records']).toContain(res2.entry?.id);

    // 3. "How do I upload Excel data?" -> CSV Hub guidance
    const res3 = findBestAnswer('How do I upload Excel data?', 'staff');
    console.log('Query 3 [How do I upload Excel data?]:', res3.entry?.id, res3.confidence, res3.entry?.question);
    expect(res3.entry?.id).toBe('data-csv-import');

    // 4. "My placement preparation is poor" -> placement-readiness guidance
    const res4 = findBestAnswer('My placement preparation is poor', 'student');
    console.log('Query 4 [My placement preparation is poor]:', res4.entry?.id, res4.confidence, res4.entry?.question);
    expect(['dashboard-dual-risk', 'dashboard-seven-domains']).toContain(res4.entry?.id);

    // 5. "What does my total score mean?" -> Student Success Score explanation
    const res5 = findBestAnswer('What does my total score mean?', 'student');
    console.log('Query 5 [What does my total score mean?]:', res5.entry?.id, res5.confidence, res5.entry?.question);
    expect(['dashboard-success-score', 'dashboard-student-overview']).toContain(res5.entry?.id);

    // 6. "How can I help a student at risk?" -> staff intervention guidance (staff only)
    const res6Staff = findBestAnswer('How can I help a student at risk?', 'staff');
    console.log('Query 6 (staff) [How can I help a student at risk?]:', res6Staff.entry?.id, res6Staff.confidence, res6Staff.entry?.question);
    expect(['interventions-create', 'dashboard-risk-tiers', 'students-search']).toContain(res6Staff.entry?.id);

    // 6b. "How can I help a student at risk?" as student should NOT get staff intervention creation
    const res6Student = findBestAnswer('How can I help a student at risk?', 'student');
    console.log('Query 6 (student) [How can I help a student at risk?]:', res6Student.entry?.id, res6Student.confidence);
    if (res6Student.entry) {
      expect(res6Student.entry.roles).not.toEqual(['staff']);
    }
  });

  it('evaluates Section 4 multi-turn conversation sequence', () => {
    const history: ChatMessage[] = [];

    // Turn 1: "How is the Student Success Score calculated?"
    const msg1 = createAssistantMessage('How is the Student Success Score calculated?', 'staff', HELP_ENTRIES, history);
    expect(msg1.matchedEntryId).toBe('dashboard-success-score');
    history.push({ id: 'u1', role: 'user', content: 'How is the Student Success Score calculated?', timestamp: Date.now() });
    history.push(msg1);

    // Turn 2: "What happens when one domain is missing?"
    const msg2 = createAssistantMessage('What happens when one domain is missing?', 'staff', HELP_ENTRIES, history);
    console.log('Follow-up 2 [What happens when one domain is missing?]:', msg2.matchedEntryId, msg2.content.slice(0, 80));
    expect(msg2.matchedEntryId).toBe('dashboard-missing-domains');
    expect(msg2.content).toContain('never penalized as zero');
    history.push({ id: 'u2', role: 'user', content: 'What happens when one domain is missing?', timestamp: Date.now() });
    history.push(msg2);

    // Turn 3: "Where can staff review a student's details?"
    const msg3 = createAssistantMessage("Where can staff review a student's details?", 'staff', HELP_ENTRIES, history);
    console.log('Turn 3 [Where can staff review a student details?]:', msg3.matchedEntryId, msg3.internalLink);
    expect(['students-search', 'students-dossier', 'students-journey']).toContain(msg3.matchedEntryId);
    expect(msg3.internalLink).toBeDefined();
  });
});
