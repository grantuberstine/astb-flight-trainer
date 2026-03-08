import type { SectionId } from './question';

export type { SectionId };

export interface AnswerRecord {
  questionId: string;
  correct: boolean;
  section: SectionId;
  timestamp: number;
  timeSpentMs: number;
}

export interface SectionScore {
  correct: number;
  total: number;
  averageTimeMs: number;
}
