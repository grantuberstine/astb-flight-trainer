import { describe, it, expect, vi } from 'vitest';
import { generateStudyPlan } from '../study-plan';
import type { WeightedSection } from '../../types/adaptive';
import type { SectionId } from '../../types/question';

describe('study-plan', () => {
  describe('generateStudyPlan', () => {
    const weights: WeightedSection[] = [
      { sectionId: 'MST', weight: 0.9 },
      { sectionId: 'RCT', weight: 0.7 },
      { sectionId: 'MCT', weight: 0.3 },
      { sectionId: 'ANIT', weight: 0.2 },
      { sectionId: 'SAT', weight: 0.1 },
    ];

    it('with 14 days remaining produces 2 StudyWeek entries', () => {
      const now = new Date('2026-03-01');
      vi.setSystemTime(now);

      const testDate = '2026-03-15'; // 14 days
      const plan = generateStudyPlan(testDate, weights);

      expect(plan).toHaveLength(2);
      expect(plan[0].weekNumber).toBe(1);
      expect(plan[1].weekNumber).toBe(2);

      vi.useRealTimers();
    });

    it('front-loads weakest sections in early weeks', () => {
      const now = new Date('2026-03-01');
      vi.setSystemTime(now);

      const testDate = '2026-03-22'; // 21 days = 3 weeks
      const plan = generateStudyPlan(testDate, weights);

      // First week should focus on highest weight (weakest) sections
      expect(plan[0].focusSections).toContain('MST');

      vi.useRealTimers();
    });

    it('makes final week comprehensive review', () => {
      const now = new Date('2026-03-01');
      vi.setSystemTime(now);

      const testDate = '2026-03-22'; // 21 days = 3 weeks
      const plan = generateStudyPlan(testDate, weights);

      const lastWeek = plan[plan.length - 1];
      // Final week should have all sections as review
      expect(lastWeek.reviewSections.length + lastWeek.focusSections.length).toBe(5);
      expect(lastWeek.dailyGoal).toBe(15);

      vi.useRealTimers();
    });

    it('test date in past returns 1 comprehensive week', () => {
      const now = new Date('2026-03-15');
      vi.setSystemTime(now);

      const testDate = '2026-03-10'; // in the past
      const plan = generateStudyPlan(testDate, weights);

      expect(plan).toHaveLength(1);

      vi.useRealTimers();
    });

    it('caps at 12 weeks for far-out test dates', () => {
      const now = new Date('2026-03-01');
      vi.setSystemTime(now);

      const testDate = '2026-12-31'; // very far out
      const plan = generateStudyPlan(testDate, weights);

      expect(plan.length).toBeLessThanOrEqual(12);

      vi.useRealTimers();
    });
  });
});
