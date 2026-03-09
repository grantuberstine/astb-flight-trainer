import type { SRCard } from '../types/adaptive';
import type { SectionId } from '../types/question';

export const DAY_MS = 86400000;
export const MAX_ACTIVE_CARDS = 30;

export function createCard(questionId: string, section: SectionId): SRCard {
  const now = Date.now();
  return {
    questionId,
    section,
    easeFactor: 2.5,
    interval: 1,
    repetitions: 0,
    nextReview: now + DAY_MS,
    lastReview: now,
  };
}

/**
 * SM-2 algorithm review.
 * quality: 0-5 scale. < 3 is a fail, >= 3 is a pass.
 */
export function reviewCard(card: SRCard, quality: number): SRCard {
  const now = Date.now();

  if (quality < 3) {
    // Failed review: reset repetitions and interval, reduce ease factor
    const newEF = Math.max(card.easeFactor - 0.2, 1.3);
    return {
      ...card,
      repetitions: 0,
      interval: 1,
      easeFactor: newEF,
      nextReview: now + DAY_MS,
      lastReview: now,
    };
  }

  // Passed review
  const newReps = card.repetitions + 1;
  let newInterval: number;

  if (newReps === 1) {
    newInterval = 1;
  } else if (newReps === 2) {
    newInterval = 6;
  } else {
    newInterval = Math.round(card.interval * card.easeFactor);
  }

  // SM-2 ease factor adjustment
  const newEF = Math.max(
    card.easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02)),
    1.3,
  );

  return {
    ...card,
    repetitions: newReps,
    interval: newInterval,
    easeFactor: newEF,
    nextReview: now + newInterval * DAY_MS,
    lastReview: now,
  };
}

export function getDueCards(cards: SRCard[]): SRCard[] {
  const now = Date.now();
  return cards.filter((card) => card.nextReview <= now);
}
