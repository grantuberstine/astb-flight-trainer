import { describe, it, expect, vi } from 'vitest';
import { createCard, reviewCard, getDueCards, DAY_MS, MAX_ACTIVE_CARDS } from '../spaced-repetition';
import type { SRCard } from '../../types/adaptive';

describe('spaced-repetition', () => {
  describe('createCard', () => {
    it('returns SRCard with default values', () => {
      const now = Date.now();
      vi.setSystemTime(now);

      const card = createCard('q1', 'MST');

      expect(card.questionId).toBe('q1');
      expect(card.section).toBe('MST');
      expect(card.easeFactor).toBe(2.5);
      expect(card.interval).toBe(1);
      expect(card.repetitions).toBe(0);
      expect(card.nextReview).toBe(now + DAY_MS);
      expect(card.lastReview).toBe(now);

      vi.useRealTimers();
    });
  });

  describe('reviewCard', () => {
    const baseCard: SRCard = {
      questionId: 'q1',
      section: 'MST',
      easeFactor: 2.5,
      interval: 1,
      repetitions: 0,
      nextReview: 0,
      lastReview: 0,
    };

    it('fail (quality 1) resets repetitions and interval, reduces easeFactor', () => {
      const result = reviewCard(baseCard, 1);

      expect(result.repetitions).toBe(0);
      expect(result.interval).toBe(1);
      expect(result.easeFactor).toBe(2.3); // 2.5 - 0.2
    });

    it('fail does not reduce easeFactor below 1.3', () => {
      const lowEFCard = { ...baseCard, easeFactor: 1.3 };
      const result = reviewCard(lowEFCard, 0);

      expect(result.easeFactor).toBe(1.3);
    });

    it('pass (quality 4) increments repetitions and computes interval', () => {
      const now = Date.now();
      vi.setSystemTime(now);

      const result = reviewCard(baseCard, 4);

      expect(result.repetitions).toBe(1);
      expect(result.interval).toBe(1); // first rep: interval = 1
      expect(result.nextReview).toBe(now + 1 * DAY_MS);

      vi.useRealTimers();
    });

    it('second pass gives interval 6', () => {
      const card1 = { ...baseCard, repetitions: 1, interval: 1 };
      const result = reviewCard(card1, 4);

      expect(result.repetitions).toBe(2);
      expect(result.interval).toBe(6); // second rep: interval = 6
    });

    it('third+ pass multiplies interval by easeFactor', () => {
      const card2 = { ...baseCard, repetitions: 2, interval: 6, easeFactor: 2.5 };
      const result = reviewCard(card2, 4);

      expect(result.repetitions).toBe(3);
      expect(result.interval).toBe(15); // 6 * 2.5 = 15
    });
  });

  describe('getDueCards', () => {
    it('filters to cards where nextReview <= now', () => {
      const now = Date.now();
      vi.setSystemTime(now);

      const cards: SRCard[] = [
        { questionId: 'q1', section: 'MST', easeFactor: 2.5, interval: 1, repetitions: 0, nextReview: now - 1000, lastReview: 0 },
        { questionId: 'q2', section: 'RCT', easeFactor: 2.5, interval: 1, repetitions: 0, nextReview: now + 100000, lastReview: 0 },
        { questionId: 'q3', section: 'MCT', easeFactor: 2.5, interval: 1, repetitions: 0, nextReview: now, lastReview: 0 },
      ];

      const due = getDueCards(cards);
      expect(due).toHaveLength(2);
      expect(due.map(c => c.questionId)).toEqual(['q1', 'q3']);

      vi.useRealTimers();
    });
  });

  describe('constants', () => {
    it('exports DAY_MS as 86400000', () => {
      expect(DAY_MS).toBe(86400000);
    });

    it('exports MAX_ACTIVE_CARDS as 30', () => {
      expect(MAX_ACTIVE_CARDS).toBe(30);
    });
  });
});
