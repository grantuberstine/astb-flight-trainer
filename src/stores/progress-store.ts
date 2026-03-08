import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { indexedDBStorage } from '../lib/storage';
import type { AnswerRecord, SectionId, SectionScore } from '../types/progress';

interface ProgressState {
  questionHistory: AnswerRecord[];
  sectionScores: Record<SectionId, SectionScore>;

  recordAnswer: (
    questionId: string,
    correct: boolean,
    section: SectionId,
    timeSpentMs: number,
  ) => void;
  resetProgress: () => void;
}

const initialSectionScores: Record<SectionId, SectionScore> = {
  MST: { correct: 0, total: 0, averageTimeMs: 0 },
  RCT: { correct: 0, total: 0, averageTimeMs: 0 },
  MCT: { correct: 0, total: 0, averageTimeMs: 0 },
  ANIT: { correct: 0, total: 0, averageTimeMs: 0 },
  SAT: { correct: 0, total: 0, averageTimeMs: 0 },
};

export const useProgressStore = create<ProgressState>()(
  persist(
    (set) => ({
      questionHistory: [],
      sectionScores: { ...initialSectionScores },

      recordAnswer: (questionId, correct, section, timeSpentMs) => {
        set((state) => {
          const record: AnswerRecord = {
            questionId,
            correct,
            section,
            timestamp: Date.now(),
            timeSpentMs,
          };

          const prev = state.sectionScores[section];
          const newTotal = prev.total + 1;
          const newCorrect = prev.correct + (correct ? 1 : 0);
          const newAvgTime =
            (prev.averageTimeMs * prev.total + timeSpentMs) / newTotal;

          return {
            questionHistory: [...state.questionHistory, record],
            sectionScores: {
              ...state.sectionScores,
              [section]: {
                correct: newCorrect,
                total: newTotal,
                averageTimeMs: Math.round(newAvgTime),
              },
            },
          };
        });
      },

      resetProgress: () => {
        set({
          questionHistory: [],
          sectionScores: { ...initialSectionScores },
        });
      },
    }),
    {
      name: 'astb-progress',
      storage: indexedDBStorage,
      version: 1,
      partialize: (state) => ({
        questionHistory: state.questionHistory,
        sectionScores: state.sectionScores,
      }),
    },
  ),
);
