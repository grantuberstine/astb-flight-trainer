import type { SectionScore } from './progress';
import type { SectionId } from './question';

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

export interface BadgeDefinition {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: 'getting-started' | 'section-mastery' | 'streaks' | 'speed' | 'xp-milestones';
  check: (context: BadgeContext) => boolean;
}

export interface BadgeContext {
  xp: number;
  currentStreak: number;
  longestStreak: number;
  sectionScores: Record<string, SectionScore>;
  totalQuestionsAnswered: number;
  sectionsAttempted: Set<string>;
  hasPerfectSession: boolean;
  usedStreakFreeze: boolean;
  fastCorrectCount: number;
  timedTestBestScore: number;
  personalBestBeaten: boolean;
  badges: Badge[];
}

export interface Mission {
  id: string;
  name: string;
  description: string;
  objectives: MissionObjective[];
  xpReward: number;
  badgeId?: string;
}

export interface MissionObjective {
  type: 'complete-questions' | 'score-threshold' | 'speed-challenge' | 'streak';
  sectionId?: SectionId;
  target: number;
  label: string;
}

export interface MissionProgress {
  missionId: string;
  startedAt: number;
  objectiveProgress: boolean[];
  completedAt: number | null;
}

export interface ChallengeRecord {
  sectionId: SectionId;
  score: number;
  timeMs: number;
  date: number;
}
