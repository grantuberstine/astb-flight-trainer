import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { indexedDBStorage } from '../lib/storage';
import { reviewCard, MAX_ACTIVE_CARDS } from '../lib/spaced-repetition';
import type { SRCard, DiagnosticResult, StudyWeek } from '../types/adaptive';

interface AdaptiveState {
  srCards: SRCard[];
  diagnosticResults: DiagnosticResult[];
  lastDiagnosticAt: number | null;
  studyPlan: StudyWeek[] | null;
  planGeneratedAt: number | null;
  adaptiveMode: boolean;

  addSRCard: (card: SRCard) => void;
  updateSRCard: (questionId: string, quality: number) => void;
  removeSRCard: (questionId: string) => void;
  saveDiagnosticResult: (result: DiagnosticResult) => void;
  setStudyPlan: (plan: StudyWeek[]) => void;
  setAdaptiveMode: (enabled: boolean) => void;
  resetAdaptive: () => void;
}

export const useAdaptiveStore = create<AdaptiveState>()(
  persist(
    (set) => ({
      srCards: [],
      diagnosticResults: [],
      lastDiagnosticAt: null,
      studyPlan: null,
      planGeneratedAt: null,
      adaptiveMode: false,

      addSRCard: (card) => {
        set((state) => {
          const cards = [...state.srCards, card];
          // Enforce MAX_ACTIVE_CARDS cap by dropping cards with longest intervals
          if (cards.length > MAX_ACTIVE_CARDS) {
            cards.sort((a, b) => a.interval - b.interval);
            return { srCards: cards.slice(0, MAX_ACTIVE_CARDS) };
          }
          return { srCards: cards };
        });
      },

      updateSRCard: (questionId, quality) => {
        set((state) => {
          const srCards = state.srCards.map((card) =>
            card.questionId === questionId ? reviewCard(card, quality) : card,
          );
          return { srCards };
        });
      },

      removeSRCard: (questionId) => {
        set((state) => ({
          srCards: state.srCards.filter((c) => c.questionId !== questionId),
        }));
      },

      saveDiagnosticResult: (result) => {
        set((state) => ({
          diagnosticResults: [...state.diagnosticResults, result],
          lastDiagnosticAt: result.timestamp,
        }));
      },

      setStudyPlan: (plan) => {
        set({ studyPlan: plan, planGeneratedAt: Date.now() });
      },

      setAdaptiveMode: (enabled) => {
        set({ adaptiveMode: enabled });
      },

      resetAdaptive: () => {
        set({
          srCards: [],
          diagnosticResults: [],
          lastDiagnosticAt: null,
          studyPlan: null,
          planGeneratedAt: null,
          adaptiveMode: false,
        });
      },
    }),
    {
      name: 'astb-adaptive',
      storage: indexedDBStorage,
      version: 1,
      partialize: (state) => ({
        srCards: state.srCards,
        diagnosticResults: state.diagnosticResults,
        lastDiagnosticAt: state.lastDiagnosticAt,
        studyPlan: state.studyPlan,
        planGeneratedAt: state.planGeneratedAt,
        adaptiveMode: state.adaptiveMode,
      }),
    },
  ),
);
