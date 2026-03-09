import { describe, it, expect } from 'vitest';
import { scoreDiagnostic, DIAGNOSTIC_QUESTIONS_PER_SECTION } from '../diagnostic';
import type { AnswerRecord } from '../../types/progress';

describe('diagnostic', () => {
  describe('DIAGNOSTIC_QUESTIONS_PER_SECTION', () => {
    it('is 5', () => {
      expect(DIAGNOSTIC_QUESTIONS_PER_SECTION).toBe(5);
    });
  });

  describe('scoreDiagnostic', () => {
    it('computes per-section accuracy, avgTimeMs, and identifies weakest sections', () => {
      const answers: AnswerRecord[] = [
        { questionId: 'mst-1', correct: true, section: 'MST', timestamp: 1000, timeSpentMs: 5000 },
        { questionId: 'mst-2', correct: true, section: 'MST', timestamp: 2000, timeSpentMs: 6000 },
        { questionId: 'mst-3', correct: true, section: 'MST', timestamp: 3000, timeSpentMs: 4000 },
        { questionId: 'mst-4', correct: true, section: 'MST', timestamp: 4000, timeSpentMs: 5000 },
        { questionId: 'mst-5', correct: true, section: 'MST', timestamp: 5000, timeSpentMs: 5000 },
        { questionId: 'rct-1', correct: false, section: 'RCT', timestamp: 6000, timeSpentMs: 8000 },
        { questionId: 'rct-2', correct: false, section: 'RCT', timestamp: 7000, timeSpentMs: 9000 },
        { questionId: 'rct-3', correct: true, section: 'RCT', timestamp: 8000, timeSpentMs: 7000 },
        { questionId: 'rct-4', correct: false, section: 'RCT', timestamp: 9000, timeSpentMs: 10000 },
        { questionId: 'rct-5', correct: false, section: 'RCT', timestamp: 10000, timeSpentMs: 8000 },
      ];

      const tagLookup: Record<string, string[]> = {
        'mst-1': ['arithmetic'],
        'mst-2': ['algebra'],
        'mst-3': ['arithmetic'],
        'mst-4': ['geometry'],
        'mst-5': ['algebra'],
        'rct-1': ['inference'],
        'rct-2': ['main-idea'],
        'rct-3': ['vocabulary'],
        'rct-4': ['inference'],
        'rct-5': ['main-idea'],
      };

      const result = scoreDiagnostic(answers, tagLookup);

      // MST: 5/5 = 100%, avg 5000ms
      expect(result.sectionResults.MST.accuracy).toBe(1.0);
      expect(result.sectionResults.MST.avgTimeMs).toBe(5000);
      expect(result.sectionResults.MST.correct).toBe(5);
      expect(result.sectionResults.MST.total).toBe(5);

      // RCT: 1/5 = 20%, avg 8400ms
      expect(result.sectionResults.RCT.accuracy).toBe(0.2);
      expect(result.sectionResults.RCT.avgTimeMs).toBe(8400);

      // RCT weakTags should include tags from wrong answers
      expect(result.sectionResults.RCT.weakTags).toContain('inference');
      expect(result.sectionResults.RCT.weakTags).toContain('main-idea');

      // RCT should be in weakest sections
      expect(result.weakestSections).toContain('RCT');
      expect(result.recommendedFocus).toContain('RCT');

      // Overall accuracy
      expect(result.overallAccuracy).toBe(0.6); // 6/10
    });
  });
});
