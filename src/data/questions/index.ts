import type { Question, SectionId } from '../../types/question';

const loaders: Record<SectionId, () => Promise<{ default: Question[] }>> = {
  MST: () => import('./mst'),
  RCT: () => import('./rct'),
  MCT: () => import('./mct'),
  ANIT: () => import('./anit'),
  SAT: () => import('./sat'),
};

export function shuffle<T>(arr: T[]): T[] {
  const result = [...arr];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

export async function getQuestions(
  section: SectionId,
  count = 10,
): Promise<Question[]> {
  const mod = await loaders[section]();
  const questions = mod.default;
  const shuffled = shuffle(questions);
  return shuffled.slice(0, count);
}

/**
 * Get questions for adaptive mode.
 * Prioritizes due review cards (matching dueCardIds), fills remaining
 * slots with shuffled non-due questions, then shuffles the final set.
 */
export async function getAdaptiveQuestions(
  section: SectionId,
  count: number,
  dueCardIds: string[],
): Promise<Question[]> {
  const mod = await loaders[section]();
  const allQuestions = mod.default;

  const dueIdSet = new Set(dueCardIds);

  // Separate due and non-due questions
  const dueQuestions = allQuestions.filter((q) => dueIdSet.has(q.id));
  const nonDueQuestions = allQuestions.filter((q) => !dueIdSet.has(q.id));

  // Take due questions first, fill remaining with shuffled non-due
  const selected: Question[] = [...dueQuestions.slice(0, count)];
  const remaining = count - selected.length;

  if (remaining > 0) {
    const shuffledNonDue = shuffle(nonDueQuestions);
    selected.push(...shuffledNonDue.slice(0, remaining));
  }

  // Final shuffle so due cards aren't clustered at start
  return shuffle(selected);
}
