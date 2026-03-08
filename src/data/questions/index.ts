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
