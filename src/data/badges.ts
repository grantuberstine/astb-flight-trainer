import type { BadgeDefinition } from '../types/gamification';

export const BADGE_DEFINITIONS: BadgeDefinition[] = [
  // ── Getting Started (4) ──────────────────────────────────────────────
  {
    id: 'first-flight',
    name: 'First Flight',
    description: 'Answer your first question',
    icon: 'Plane',
    category: 'getting-started',
    check: (ctx) => ctx.totalQuestionsAnswered >= 1,
  },
  {
    id: 'all-sections',
    name: 'Well-Rounded',
    description: 'Attempt all 5 ASTB sections',
    icon: 'LayoutGrid',
    category: 'getting-started',
    check: (ctx) => ctx.sectionsAttempted.size >= 5,
  },
  {
    id: 'first-perfect',
    name: 'Perfect Score',
    description: 'Get a perfect score on any practice session',
    icon: 'Star',
    category: 'getting-started',
    check: (ctx) => ctx.hasPerfectSession,
  },
  {
    id: 'centurion',
    name: 'Centurion',
    description: 'Answer 100 questions',
    icon: 'Award',
    category: 'getting-started',
    check: (ctx) => ctx.totalQuestionsAnswered >= 100,
  },

  // ── Section Mastery (5) ──────────────────────────────────────────────
  {
    id: 'mst-master',
    name: 'Math Ace',
    description: 'Score 90%+ on MST with 50+ questions answered',
    icon: 'Calculator',
    category: 'section-mastery',
    check: (ctx) => {
      const s = ctx.sectionScores['MST'];
      return s !== undefined && s.total >= 50 && s.correct / s.total >= 0.9;
    },
  },
  {
    id: 'rct-master',
    name: 'Speed Reader',
    description: 'Score 90%+ on RCT with 50+ questions answered',
    icon: 'BookOpen',
    category: 'section-mastery',
    check: (ctx) => {
      const s = ctx.sectionScores['RCT'];
      return s !== undefined && s.total >= 50 && s.correct / s.total >= 0.9;
    },
  },
  {
    id: 'mct-master',
    name: 'Master Mechanic',
    description: 'Score 90%+ on MCT with 50+ questions answered',
    icon: 'Wrench',
    category: 'section-mastery',
    check: (ctx) => {
      const s = ctx.sectionScores['MCT'];
      return s !== undefined && s.total >= 50 && s.correct / s.total >= 0.9;
    },
  },
  {
    id: 'anit-master',
    name: 'Navigator',
    description: 'Score 90%+ on ANIT with 50+ questions answered',
    icon: 'Compass',
    category: 'section-mastery',
    check: (ctx) => {
      const s = ctx.sectionScores['ANIT'];
      return s !== undefined && s.total >= 50 && s.correct / s.total >= 0.9;
    },
  },
  {
    id: 'sat-master',
    name: 'Spatial Genius',
    description: 'Score 90%+ on SAT with 50+ questions answered',
    icon: 'Eye',
    category: 'section-mastery',
    check: (ctx) => {
      const s = ctx.sectionScores['SAT'];
      return s !== undefined && s.total >= 50 && s.correct / s.total >= 0.9;
    },
  },

  // ── Streaks (4) ──────────────────────────────────────────────────────
  {
    id: 'streak-3',
    name: 'Hat Trick',
    description: 'Maintain a 3-day study streak',
    icon: 'Flame',
    category: 'streaks',
    check: (ctx) => ctx.longestStreak >= 3,
  },
  {
    id: 'streak-7',
    name: 'Week Warrior',
    description: 'Maintain a 7-day study streak',
    icon: 'Flame',
    category: 'streaks',
    check: (ctx) => ctx.longestStreak >= 7,
  },
  {
    id: 'streak-30',
    name: 'Iron Will',
    description: 'Maintain a 30-day study streak',
    icon: 'Flame',
    category: 'streaks',
    check: (ctx) => ctx.longestStreak >= 30,
  },
  {
    id: 'streak-freeze',
    name: 'Safety Net',
    description: 'Use a streak freeze to save your streak',
    icon: 'Shield',
    category: 'streaks',
    check: (ctx) => ctx.usedStreakFreeze,
  },

  // ── Speed (3) ────────────────────────────────────────────────────────
  {
    id: 'speed-demon',
    name: 'Speed Demon',
    description: 'Answer 10 questions correctly in under 2 minutes',
    icon: 'Zap',
    category: 'speed',
    check: (ctx) => ctx.fastCorrectCount >= 10,
  },
  {
    id: 'timed-ace',
    name: 'Timed Ace',
    description: 'Score 80%+ on a timed test',
    icon: 'Timer',
    category: 'speed',
    check: (ctx) => ctx.timedTestBestScore >= 80,
  },
  {
    id: 'personal-best',
    name: 'Personal Best',
    description: 'Beat your personal best score on any section',
    icon: 'TrendingUp',
    category: 'speed',
    check: (ctx) => ctx.personalBestBeaten,
  },

  // ── XP Milestones (4) ────────────────────────────────────────────────
  {
    id: 'xp-500',
    name: 'Ensign Earned',
    description: 'Earn 500 XP',
    icon: 'Trophy',
    category: 'xp-milestones',
    check: (ctx) => ctx.xp >= 500,
  },
  {
    id: 'xp-2000',
    name: 'Rising Star',
    description: 'Earn 2,000 XP',
    icon: 'Trophy',
    category: 'xp-milestones',
    check: (ctx) => ctx.xp >= 2000,
  },
  {
    id: 'xp-5000',
    name: 'Commander Class',
    description: 'Earn 5,000 XP',
    icon: 'Trophy',
    category: 'xp-milestones',
    check: (ctx) => ctx.xp >= 5000,
  },
  {
    id: 'xp-10000',
    name: 'Top Gun',
    description: 'Earn 10,000 XP',
    icon: 'Trophy',
    category: 'xp-milestones',
    check: (ctx) => ctx.xp >= 10000,
  },
];
