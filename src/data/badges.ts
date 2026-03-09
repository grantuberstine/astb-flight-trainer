import type { BadgeDefinition } from '../types/gamification';

export const BADGE_DEFINITIONS: BadgeDefinition[] = [
  // ── Getting Started ─────────────────────────────────────────────────
  {
    id: 'first-flight',
    name: 'First Sortie',
    description: 'Answer your first question',
    icon: 'Plane',
    category: 'getting-started',
    check: (ctx) => ctx.totalQuestionsAnswered >= 1,
  },
  {
    id: 'all-sections',
    name: 'Cross-Trained',
    description: 'Attempt all 5 ASTB sections',
    icon: 'LayoutGrid',
    category: 'getting-started',
    check: (ctx) => ctx.sectionsAttempted.size >= 5,
  },
  {
    id: 'first-perfect',
    name: 'Bullseye',
    description: 'Get a perfect score on any session',
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

  // ── Streaks ─────────────────────────────────────────────────────────
  {
    id: 'streak-3',
    name: 'Mission Ready',
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
    name: 'Iron Wings',
    description: 'Maintain a 30-day study streak',
    icon: 'Flame',
    category: 'streaks',
    check: (ctx) => ctx.longestStreak >= 30,
  },

  // ── Speed ───────────────────────────────────────────────────────────
  {
    id: 'speed-demon',
    name: 'Afterburner',
    description: '10 correct answers in under 2 minutes',
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

  // ── XP Milestones ──────────────────────────────────────────────────
  {
    id: 'xp-500',
    name: 'Wings Earned',
    description: 'Earn 500 XP',
    icon: 'Trophy',
    category: 'xp-milestones',
    check: (ctx) => ctx.xp >= 500,
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
