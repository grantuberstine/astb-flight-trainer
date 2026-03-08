import { Rank } from '../types/gamification';
import type { SectionId } from '../types/question';

export const RANK_THRESHOLDS: Record<Rank, number> = {
  [Rank.CADET]: 0,
  [Rank.ENSIGN]: 500,
  [Rank.LIEUTENANT]: 2000,
  [Rank.COMMANDER]: 5000,
  [Rank.PILOT]: 10000,
};

export const XP_VALUES = {
  correctAnswer: 10,
  perfectSection: 50,
  dailyGoal: 25,
  missionComplete: 100,
} as const;

export interface ASTBSection {
  id: SectionId;
  name: string;
  description: string;
  icon: string;
  color: string;
}

export const TIMED_TEST_CONFIG: Record<SectionId, { timeLimitSec: number; questionCount: number }> = {
  MST: { timeLimitSec: 2400, questionCount: 30 },
  RCT: { timeLimitSec: 1800, questionCount: 20 },
  MCT: { timeLimitSec: 900, questionCount: 30 },
  ANIT: { timeLimitSec: 900, questionCount: 30 },
  SAT: { timeLimitSec: 600, questionCount: 25 },
};

export const ASTB_SECTIONS: ASTBSection[] = [
  {
    id: 'MST',
    name: 'Math Skills Test',
    description: 'Arithmetic, algebra, and geometry fundamentals',
    icon: 'Calculator',
    color: 'gold-500',
  },
  {
    id: 'RCT',
    name: 'Reading Comprehension Test',
    description: 'Passage analysis and inference questions',
    icon: 'BookOpen',
    color: 'navy-600',
  },
  {
    id: 'MCT',
    name: 'Mechanical Comprehension Test',
    description: 'Physics, gears, pulleys, and mechanical principles',
    icon: 'Wrench',
    color: 'cockpit-gray',
  },
  {
    id: 'ANIT',
    name: 'Aviation & Nautical Information Test',
    description: 'Aviation knowledge, instruments, and nautical concepts',
    icon: 'Plane',
    color: 'navy-700',
  },
  {
    id: 'SAT',
    name: 'Spatial Apperception Test',
    description: 'Determine aircraft orientation from cockpit views',
    icon: 'Compass',
    color: 'gold-400',
  },
];
