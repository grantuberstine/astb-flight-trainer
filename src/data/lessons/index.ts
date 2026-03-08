import type { SectionId } from '../../types/question';
import type { SectionLesson } from '../../types/lesson';

const loaders: Record<SectionId, () => Promise<{ default: SectionLesson }>> = {
  MST: () => import('./mst-lessons'),
  RCT: () => import('./rct-lessons'),
  MCT: () => import('./mct-lessons'),
  ANIT: () => import('./anit-lessons'),
  SAT: () => import('./sat-lessons'),
};

export async function getLessons(section: SectionId): Promise<SectionLesson> {
  const mod = await loaders[section]();
  return mod.default;
}
