import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { indexedDBStorage } from '../lib/storage';
import { Rank } from '../types/gamification';
import type { Badge, ChallengeRecord, MissionProgress } from '../types/gamification';
import type { SectionId } from '../types/question';
import { RANK_THRESHOLDS, XP_VALUES } from '../lib/constants';
import { BADGE_DEFINITIONS } from '../data/badges';

interface GamificationStoreState {
  xp: number;
  rank: Rank;
  currentStreak: number;
  longestStreak: number;
  lastActiveDate: string | null;
  streakFreezeAvailable: boolean;
  badges: Badge[];
  challengeRecords: ChallengeRecord[];
  missionProgress: MissionProgress[];
  streakFreezesUsed: number;

  addXP: (amount: number) => void;
  updateStreak: () => void;
  resetGamification: () => void;
  earnBadges: (badgeIds: string[]) => void;
  recordChallenge: (record: ChallengeRecord) => void;
  getBestChallenge: (sectionId: SectionId) => ChallengeRecord | null;
  startMission: (missionId: string) => void;
  updateMissionObjective: (missionId: string, objectiveIndex: number, completed: boolean) => void;
  completeMission: (missionId: string) => void;
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
  return new Date().toLocaleDateString('en-CA');
}

function getYesterdayISO(): string {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return d.toLocaleDateString('en-CA');
}

export const useGamificationStore = create<GamificationStoreState>()(
  persist(
    (set, get) => ({
      xp: 0,
      rank: Rank.CADET,
      currentStreak: 0,
      longestStreak: 0,
      lastActiveDate: null,
      streakFreezeAvailable: false,
      badges: [],
      challengeRecords: [],
      missionProgress: [],
      streakFreezesUsed: 0,

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
            const result: Partial<GamificationStoreState> = {
              currentStreak: newStreak,
              longestStreak: Math.max(newStreak, state.longestStreak),
              lastActiveDate: today,
            };
            // Award streak freeze at every 7-day milestone
            if (newStreak % 7 === 0) {
              result.streakFreezeAvailable = true;
            }
            return result;
          }

          // Missed a day -- check streak freeze
          if (state.streakFreezeAvailable && state.lastActiveDate !== null) {
            const newStreak = state.currentStreak + 1;
            const result: Partial<GamificationStoreState> = {
              currentStreak: newStreak,
              longestStreak: Math.max(newStreak, state.longestStreak),
              lastActiveDate: today,
              streakFreezeAvailable: false,
              streakFreezesUsed: state.streakFreezesUsed + 1,
            };
            // Award streak freeze at every 7-day milestone
            if (newStreak % 7 === 0) {
              result.streakFreezeAvailable = true;
            }
            return result;
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
          challengeRecords: [],
          missionProgress: [],
          streakFreezesUsed: 0,
        });
      },

      earnBadges: (badgeIds) => {
        set((state) => {
          const newBadges: Badge[] = badgeIds.map((id) => {
            const def = BADGE_DEFINITIONS.find((d) => d.id === id);
            return {
              id,
              name: def?.name ?? id,
              description: def?.description ?? '',
              icon: def?.icon ?? 'Award',
              earnedAt: Date.now(),
            };
          });
          return { badges: [...state.badges, ...newBadges] };
        });
      },

      recordChallenge: (record) => {
        set((state) => ({
          challengeRecords: [...state.challengeRecords, record],
        }));
      },

      getBestChallenge: (sectionId) => {
        const records = get().challengeRecords.filter((r) => r.sectionId === sectionId);
        if (records.length === 0) return null;
        return records.reduce((best, r) => (r.score > best.score ? r : best));
      },

      startMission: (missionId) => {
        set((state) => ({
          missionProgress: [
            ...state.missionProgress,
            {
              missionId,
              startedAt: Date.now(),
              objectiveProgress: [],
              completedAt: null,
            },
          ],
        }));
      },

      updateMissionObjective: (missionId, objectiveIndex, completed) => {
        set((state) => ({
          missionProgress: state.missionProgress.map((mp) => {
            if (mp.missionId !== missionId) return mp;
            const newProgress = [...mp.objectiveProgress];
            newProgress[objectiveIndex] = completed;
            const allComplete = newProgress.length > 0 && newProgress.every(Boolean);
            return {
              ...mp,
              objectiveProgress: newProgress,
              completedAt: allComplete ? Date.now() : mp.completedAt,
            };
          }),
        }));
      },

      completeMission: (missionId) => {
        set((state) => ({
          missionProgress: state.missionProgress.map((mp) =>
            mp.missionId === missionId
              ? { ...mp, completedAt: Date.now() }
              : mp,
          ),
        }));
        // Award mission XP
        get().addXP(XP_VALUES.missionComplete);
      },
    }),
    {
      name: 'astb-gamification',
      storage: indexedDBStorage,
      version: 2,
      partialize: (state) => ({
        xp: state.xp,
        rank: state.rank,
        currentStreak: state.currentStreak,
        longestStreak: state.longestStreak,
        lastActiveDate: state.lastActiveDate,
        streakFreezeAvailable: state.streakFreezeAvailable,
        badges: state.badges,
        challengeRecords: state.challengeRecords,
        missionProgress: state.missionProgress,
        streakFreezesUsed: state.streakFreezesUsed,
      }),
    },
  ),
);
