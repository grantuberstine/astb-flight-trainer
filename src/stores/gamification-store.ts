import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { indexedDBStorage } from '../lib/storage';
import { Rank } from '../types/gamification';
import type { Badge } from '../types/gamification';
import { RANK_THRESHOLDS } from '../lib/constants';

interface GamificationStoreState {
  xp: number;
  rank: Rank;
  currentStreak: number;
  longestStreak: number;
  lastActiveDate: string | null;
  streakFreezeAvailable: boolean;
  badges: Badge[];

  addXP: (amount: number) => void;
  updateStreak: () => void;
  resetGamification: () => void;
}

function getRankForXP(xp: number): Rank {
  const ranks: Rank[] = [
    Rank.PILOT,
    Rank.COMMANDER,
    Rank.LIEUTENANT,
    Rank.ENSIGN,
    Rank.CADET,
  ];
  for (const rank of ranks) {
    if (xp >= RANK_THRESHOLDS[rank]) {
      return rank;
    }
  }
  return Rank.CADET;
}

function getTodayISO(): string {
  return new Date().toISOString().split('T')[0];
}

function getYesterdayISO(): string {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return d.toISOString().split('T')[0];
}

export const useGamificationStore = create<GamificationStoreState>()(
  persist(
    (set) => ({
      xp: 0,
      rank: Rank.CADET,
      currentStreak: 0,
      longestStreak: 0,
      lastActiveDate: null,
      streakFreezeAvailable: false,
      badges: [],

      addXP: (amount) => {
        set((state) => {
          const newXP = state.xp + amount;
          return {
            xp: newXP,
            rank: getRankForXP(newXP),
          };
        });
      },

      updateStreak: () => {
        set((state) => {
          const today = getTodayISO();
          const yesterday = getYesterdayISO();

          // Already updated today
          if (state.lastActiveDate === today) {
            return {};
          }

          // Consecutive day
          if (state.lastActiveDate === yesterday) {
            const newStreak = state.currentStreak + 1;
            return {
              currentStreak: newStreak,
              longestStreak: Math.max(newStreak, state.longestStreak),
              lastActiveDate: today,
            };
          }

          // Missed a day -- check streak freeze
          if (state.streakFreezeAvailable && state.lastActiveDate !== null) {
            const newStreak = state.currentStreak + 1;
            return {
              currentStreak: newStreak,
              longestStreak: Math.max(newStreak, state.longestStreak),
              lastActiveDate: today,
              streakFreezeAvailable: false,
            };
          }

          // Streak broken -- reset
          return {
            currentStreak: 1,
            lastActiveDate: today,
          };
        });
      },

      resetGamification: () => {
        set({
          xp: 0,
          rank: Rank.CADET,
          currentStreak: 0,
          longestStreak: 0,
          lastActiveDate: null,
          streakFreezeAvailable: false,
          badges: [],
        });
      },
    }),
    {
      name: 'astb-gamification',
      storage: indexedDBStorage,
      version: 1,
      partialize: (state) => ({
        xp: state.xp,
        rank: state.rank,
        currentStreak: state.currentStreak,
        longestStreak: state.longestStreak,
        lastActiveDate: state.lastActiveDate,
        streakFreezeAvailable: state.streakFreezeAvailable,
        badges: state.badges,
      }),
    },
  ),
);
