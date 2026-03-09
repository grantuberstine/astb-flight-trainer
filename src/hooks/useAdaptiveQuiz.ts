import type { SectionId } from '../types/question';
import type { AnswerEntry } from './useQuizSession';
import { useAdaptiveStore } from '../stores/adaptive-store';
import { getDueCards, createCard } from '../lib/spaced-repetition';
import { getAdaptiveQuestions } from '../data/questions';

export function useAdaptiveQuiz() {
  const srCards = useAdaptiveStore((s) => s.srCards);
  const addSRCard = useAdaptiveStore((s) => s.addSRCard);
  const updateSRCard = useAdaptiveStore((s) => s.updateSRCard);

  async function loadAdaptiveQuestions(section: SectionId, count: number) {
    const dueCards = getDueCards(srCards).filter((c) => c.section === section);
    const dueCardIds = dueCards.map((c) => c.questionId);
    return getAdaptiveQuestions(section, count, dueCardIds);
  }

  function onQuizComplete(answers: AnswerEntry[], sectionId: SectionId) {
    const existingIds = new Set(srCards.map((c) => c.questionId));
    const dueIds = new Set(
      getDueCards(srCards).map((c) => c.questionId),
    );

    for (const answer of answers) {
      if (!answer.correct) {
        if (existingIds.has(answer.questionId)) {
          // Existing card, incorrect: quality 1
          updateSRCard(answer.questionId, 1);
        } else {
          // New missed question: create card
          addSRCard(createCard(answer.questionId, sectionId));
        }
      } else if (dueIds.has(answer.questionId)) {
        // Correct answer on a due card: quality 4
        updateSRCard(answer.questionId, 4);
      }
    }
  }

  return { loadAdaptiveQuestions, onQuizComplete };
}
