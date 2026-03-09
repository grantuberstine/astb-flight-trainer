import { useMemo } from 'react';
import { useAdaptiveStore } from '../stores/adaptive-store';
import { getDueCards } from '../lib/spaced-repetition';

export function useReviewQueue() {
  const srCards = useAdaptiveStore((s) => s.srCards);

  return useMemo(() => {
    const dueCards = getDueCards(srCards);
    return {
      dueCount: dueCards.length,
      dueCardIds: dueCards.map((c) => c.questionId),
      hasDueCards: dueCards.length > 0,
    };
  }, [srCards]);
}
