import { describe, it, expect } from 'vitest';
import { computeSectionWeights, pickWeightedSection } from '../adaptive';
import type { SectionScore } from '../../types/progress';
import type { SectionId } from '../../types/question';

describe('adaptive', () => {
  describe('computeSectionWeights', () => {
    it('returns weight 1.0 for all sections when all have 0 total', () => {
      const scores: Record<SectionId, SectionScore> = {
        MST: { correct: 0, total: 0, averageTimeMs: 0 },
        RCT: { correct: 0, total: 0, averageTimeMs: 0 },
        MCT: { correct: 0, total: 0, averageTimeMs: 0 },
        ANIT: { correct: 0, total: 0, averageTimeMs: 0 },
        SAT: { correct: 0, total: 0, averageTimeMs: 0 },
      };

      const weights = computeSectionWeights(scores);
      for (const w of weights) {
        expect(w.weight).toBe(1.0);
      }
      expect(weights).toHaveLength(5);
    });

    it('returns minWeight for 100% accuracy section', () => {
      const scores: Record<SectionId, SectionScore> = {
        MST: { correct: 10, total: 10, averageTimeMs: 5000 },
        RCT: { correct: 0, total: 0, averageTimeMs: 0 },
        MCT: { correct: 0, total: 0, averageTimeMs: 0 },
        ANIT: { correct: 0, total: 0, averageTimeMs: 0 },
        SAT: { correct: 0, total: 0, averageTimeMs: 0 },
      };

      const weights = computeSectionWeights(scores);
      const mstWeight = weights.find(w => w.sectionId === 'MST')!;
      expect(mstWeight.weight).toBe(0.1);
    });

    it('returns weight 0.5 for 50% accuracy section', () => {
      const scores: Record<SectionId, SectionScore> = {
        MST: { correct: 5, total: 10, averageTimeMs: 5000 },
        RCT: { correct: 0, total: 0, averageTimeMs: 0 },
        MCT: { correct: 0, total: 0, averageTimeMs: 0 },
        ANIT: { correct: 0, total: 0, averageTimeMs: 0 },
        SAT: { correct: 0, total: 0, averageTimeMs: 0 },
      };

      const weights = computeSectionWeights(scores);
      const mstWeight = weights.find(w => w.sectionId === 'MST')!;
      expect(mstWeight.weight).toBe(0.5);
    });

    it('accepts custom minWeight', () => {
      const scores: Record<SectionId, SectionScore> = {
        MST: { correct: 10, total: 10, averageTimeMs: 5000 },
        RCT: { correct: 0, total: 0, averageTimeMs: 0 },
        MCT: { correct: 0, total: 0, averageTimeMs: 0 },
        ANIT: { correct: 0, total: 0, averageTimeMs: 0 },
        SAT: { correct: 0, total: 0, averageTimeMs: 0 },
      };

      const weights = computeSectionWeights(scores, 0.2);
      const mstWeight = weights.find(w => w.sectionId === 'MST')!;
      expect(mstWeight.weight).toBe(0.2);
    });
  });

  describe('pickWeightedSection', () => {
    it('returns a valid SectionId', () => {
      const weights = [
        { sectionId: 'MST' as SectionId, weight: 0.5 },
        { sectionId: 'RCT' as SectionId, weight: 0.3 },
        { sectionId: 'MCT' as SectionId, weight: 0.2 },
      ];

      const result = pickWeightedSection(weights);
      expect(['MST', 'RCT', 'MCT']).toContain(result);
    });

    it('returns the only section when given a single weight', () => {
      const weights = [{ sectionId: 'SAT' as SectionId, weight: 1.0 }];
      const result = pickWeightedSection(weights);
      expect(result).toBe('SAT');
    });
  });
});
