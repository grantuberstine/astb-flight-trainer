export const Rank = {
  CADET: 'CADET',
  ENSIGN: 'ENSIGN',
  LIEUTENANT: 'LIEUTENANT',
  COMMANDER: 'COMMANDER',
  PILOT: 'PILOT',
} as const;

export type Rank = (typeof Rank)[keyof typeof Rank];

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  earnedAt: number | null;
}

export interface GamificationState {
  xp: number;
  rank: Rank;
  currentStreak: number;
  longestStreak: number;
  lastActiveDate: string | null;
  streakFreezeAvailable: boolean;
  badges: Badge[];
}
