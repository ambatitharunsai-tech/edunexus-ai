// EduNexus AI — Chatbot Accuracy & NLP Benchmark Evaluation Suite
// Measures quantitative performance across the evaluation dataset:
// Top-1 accuracy, in-scope recall, out-of-scope fallback precision, role privacy, and latency.

import { describe, it, expect } from 'vitest';
import { CHAT_EVALUATION_DATASET } from './chatEvaluationDataset';
import { findBestAnswer, isRoleAllowed, type ChatMessage } from '../lib/helpChatEngine';
import { HELP_ENTRIES, type HelpEntry } from '../lib/helpContent';

/**
 * Legacy baseline retrieval simulation (pure token frequency match without BM25, synonyms, or context).
 */
function legacyKeywordMatch(
  query: string,
  userRole: 'staff' | 'student',
  entries: HelpEntry[] = HELP_ENTRIES
): string | null {
  const tokens = query.toLowerCase().replace(/[^\w\s]/g, ' ').split(/\s+/).filter(Boolean);
  const accessible = entries.filter((e) => isRoleAllowed(e.roles, userRole));

  let bestEntry: HelpEntry | null = null;
  let maxScore = 0;

  for (const entry of accessible) {
    let score = 0;
    const qLower = entry.question.toLowerCase();
    if (qLower === query.toLowerCase().trim()) score += 100;
    else if (qLower.includes(query.toLowerCase().trim())) score += 50;

    for (const t of tokens) {
      for (const kw of entry.keywords) {
        if (kw.toLowerCase() === t) score += 15;
      }
      if (qLower.includes(t)) score += 10;
    }

    if (score > maxScore) {
      maxScore = score;
      bestEntry = entry;
    }
  }

  return maxScore >= 12 ? (bestEntry?.id ?? null) : null;
}

describe('Chatbot Quantitative NLP Benchmark Evaluation', () => {
  it('measures retrieval metrics comparing Legacy Baseline vs Upgraded NLP Engine', () => {
    let legacyCorrect = 0;
    let upgradedCorrect = 0;
    let rolePrivacyViolations = 0;
    let followUpTotal = 0;
    let followUpCorrect = 0;

    const totalCases = CHAT_EVALUATION_DATASET.length;
    const startTime = performance.now();

    const improvements: { query: string; expected: string | null; legacy: string | null; upgraded: string | null }[] = [];

    for (const testCase of CHAT_EVALUATION_DATASET) {
      // 1. Run Legacy Baseline
      const legacyResultId = legacyKeywordMatch(testCase.query, testCase.userRole, HELP_ENTRIES);
      const isLegacyMatch = legacyResultId === testCase.expectedEntryId;
      if (isLegacyMatch) legacyCorrect++;

      // 2. Prepare mock history for follow-up questions
      const history: ChatMessage[] = [];
      if (testCase.priorTurn) {
        history.push({
          id: 'prior-user',
          role: 'user',
          content: testCase.priorTurn.userQuery,
          timestamp: Date.now() - 5000,
        });
        history.push({
          id: 'prior-assistant',
          role: 'assistant',
          content: 'Prior answer context',
          category: testCase.priorTurn.assistantCategory as any,
          matchedEntryId: testCase.priorTurn.assistantEntryId,
          timestamp: Date.now() - 4000,
        });
      }

      // 3. Run Upgraded NLP Engine
      const matchResult = findBestAnswer(testCase.query, testCase.userRole, HELP_ENTRIES, history);
      const upgradedResultId = matchResult.entry?.id ?? null;
      const isUpgradedMatch = upgradedResultId === testCase.expectedEntryId;

      if (isUpgradedMatch) {
        upgradedCorrect++;
      } else {
        console.log(`MISMATCH [${testCase.id}]: query="${testCase.query}", expected=${testCase.expectedEntryId}, got=${upgradedResultId}`);
      }

      // Track follow-up performance
      if (testCase.category === 'conversational_followup') {
        followUpTotal++;
        if (isUpgradedMatch) followUpCorrect++;
      }

      // Track role privacy violations
      if (testCase.userRole === 'student' && matchResult.entry) {
        if (!isRoleAllowed(matchResult.entry.roles, 'student')) {
          rolePrivacyViolations++;
        }
      }

      // Track improvements
      if (!isLegacyMatch && isUpgradedMatch) {
        improvements.push({
          query: testCase.query,
          expected: testCase.expectedEntryId,
          legacy: legacyResultId,
          upgraded: upgradedResultId,
        });
      }
    }

    const durationMs = performance.now() - startTime;
    const avgLatencyMs = durationMs / totalCases;

    const legacyAccuracy = (legacyCorrect / totalCases) * 100;
    const upgradedAccuracy = (upgradedCorrect / totalCases) * 100;
    const followUpAccuracy = followUpTotal > 0 ? (followUpCorrect / followUpTotal) * 100 : 100;

    console.log('\n======================================================');
    console.log('       EDUNEXUS AI CHATBOT EVALUATION BENCHMARK       ');
    console.log('======================================================');
    console.log(`Total Test Cases Evaluated:       ${totalCases}`);
    console.log(`Legacy Baseline Accuracy:        ${legacyAccuracy.toFixed(1)}% (${legacyCorrect}/${totalCases})`);
    console.log(`Upgraded NLP Engine Accuracy:    ${upgradedAccuracy.toFixed(1)}% (${upgradedCorrect}/${totalCases})`);
    console.log(`Relative Accuracy Improvement:   +${(upgradedAccuracy - legacyAccuracy).toFixed(1)}%`);
    console.log(`Follow-Up Resolution Accuracy:   ${followUpAccuracy.toFixed(1)}% (${followUpCorrect}/${followUpTotal})`);
    console.log(`Role-Based Privacy Violations:   ${rolePrivacyViolations} (Must be strictly 0)`);
    console.log(`Average Query Latency:           ${avgLatencyMs.toFixed(2)} ms (Pure client-side)`);
    console.log(`Examples Upgraded & Corrected:   ${improvements.length}`);
    console.log('======================================================\n');

    // Strict assertions
    expect(upgradedAccuracy).toBeGreaterThanOrEqual(90);
    expect(upgradedAccuracy).toBeGreaterThan(legacyAccuracy);
    expect(rolePrivacyViolations).toBe(0);
    expect(avgLatencyMs).toBeLessThan(10);
  });
});
