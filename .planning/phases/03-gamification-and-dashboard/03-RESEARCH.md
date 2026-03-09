# Phase 3: Gamification and Dashboard - Research

**Researched:** 2026-03-08
**Domain:** Client-side gamification UI, Zustand state management, dashboard composition
**Confidence:** HIGH

## Summary

Phase 3 builds the gamification layer and cockpit dashboard on top of a well-established foundation. The gamification store (`gamification-store.ts`), types (`gamification.ts`), and constants (`RANK_THRESHOLDS`, `XP_VALUES`) already exist from Phase 1. The progress store tracks per-question answer history with timestamps and section scores. Both placeholder pages (`DashboardPage.tsx`, `ProgressPage.tsx`) are routed and ready to be populated.

The primary work is: (1) building the dashboard UI that pulls from both `useProgressStore` and `useGamificationStore`, (2) wiring XP awards into the existing `QuizSession.handleAnswer` flow, (3) defining badge definitions and a badge evaluation engine, (4) adding streak freeze earning mechanics, and (5) creating a mission/challenge system with curated question sequences and timed personal-best tracking.

**Primary recommendation:** No new libraries needed. Use existing Zustand stores, Tailwind theme tokens, and Lucide icons. All gamification logic is pure client-side state derivation. Focus on getting the XP-award integration into QuizSession right (single source of truth), defining 20 badges as static data with runtime evaluation, and keeping the mission structure as typed data objects loaded via dynamic import.

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| GAME-01 | Aviation-themed cockpit dashboard UI throughout the app | Existing theme tokens (navy, gold, cockpit-gray), DashboardPage placeholder, Lucide icons. Build dashboard widgets as composable card components. |
| GAME-02 | XP system -- earn points for completing questions, missions, and daily goals | `XP_VALUES` constants exist, `addXP()` on gamification store exists. Wire into QuizSession.handleAnswer and session completion. |
| GAME-03 | Daily streak tracker with streak freeze | `updateStreak()` exists with freeze logic. Need UI component, freeze-earning mechanic (e.g., earn freeze at 7-day streak), and visual streak calendar. |
| GAME-04 | Rank progression from Cadet to Pilot | `Rank` const object, `RANK_THRESHOLDS`, and `getRankForXP()` all exist. Need rank display component with progress bar to next rank. |
| GAME-05 | 15-25 achievement badges for milestones | `Badge` type exists. Need badge definitions data file, badge evaluation engine, badge display grid, and toast/notification on earn. |
| GAME-06 | Mission structure -- curated study sequences with objectives | New concept. Need Mission type, mission definitions data, mission progress tracking in store, and mission UI. |
| GAME-07 | Timed challenge mode with personal best tracking | Extends existing timed test infrastructure. Need personal best records in store, challenge selection UI, and PB comparison on completion. |
</phase_requirements>

## Standard Stack

### Core (Already Installed)
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| React | 19.2 | UI framework | Already in use |
| Zustand | 5.0 | State management | Already powers progress + gamification stores |
| Tailwind CSS | 4.2 | Styling | Already configured with aviation theme tokens |
| Lucide React | 0.577 | Icons | Already in use throughout app |
| idb-keyval | 6.2 | IndexedDB persistence | Already powers custom Zustand persist adapter |

### Supporting (No New Dependencies)
No new libraries needed. All gamification features are achievable with existing stack:
- XP calculations: pure functions
- Badge evaluation: derived state from stores
- Animations: CSS transitions/keyframes via Tailwind
- Dashboard layout: Tailwind grid/flexbox
- Charts/progress bars: custom SVG or styled divs (simple enough to not need a charting library)

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Custom progress bars | react-circular-progressbar | Adds dependency for something achievable with 20 lines of SVG |
| CSS animations | framer-motion | Heavyweight (30KB+) for simple fade/scale transitions |
| Custom charts | recharts/chart.js | Overkill for 5-section radar/bar display; custom SVG is simpler |

## Architecture Patterns

### Recommended Component Structure
```
src/
  components/
    dashboard/          # Dashboard widgets
      DashboardStats.tsx    # XP, rank, streak summary cards
      SectionScoreCard.tsx  # Per-section score ring/bar
      RecentActivity.tsx    # Last N quiz sessions
      RankProgress.tsx      # Current rank + progress to next
      StreakTracker.tsx      # Streak display + calendar dots
      BadgeGrid.tsx         # Earned/locked badge display
      MissionCard.tsx       # Active mission progress
    gamification/       # Shared gamification UI
      XPNotification.tsx    # Toast showing "+10 XP" on earn
      BadgeUnlockModal.tsx  # Modal when badge earned
      RankUpModal.tsx       # Modal on rank promotion
  data/
    badges.ts           # Badge definitions (id, name, description, icon, condition)
    missions.ts         # Mission definitions (id, name, objectives, rewards)
  lib/
    xp.ts               # XP calculation helpers
    badges.ts           # Badge evaluation engine
  types/
    gamification.ts     # Extended with Mission, Challenge types
```

### Pattern 1: XP Award Integration
**What:** Wire XP into existing quiz flow without duplicating logic
**When to use:** Every question answer and session completion
**Example:**
```typescript
// In QuizSession.tsx handleAnswer callback, after recordAnswer:
const xpAmount = correct ? XP_VALUES.correctAnswer : 0;
if (xpAmount > 0) {
  addXP(xpAmount);
}

// On session complete (in useEffect watching state.status === 'complete'):
const allCorrect = answers.every(a => a.correct);
if (allCorrect) addXP(XP_VALUES.perfectSection);
updateStreak(); // Call once per session completion
evaluateBadges(); // Check if any new badges earned
```

### Pattern 2: Badge Evaluation Engine
**What:** Pure function that checks all badge conditions against current state
**When to use:** After XP changes, session completion, streak updates
**Example:**
```typescript
// src/lib/badges.ts
import type { Badge } from '../types/gamification';
import type { SectionScore } from '../types/progress';

interface BadgeCondition {
  id: string;
  name: string;
  description: string;
  icon: string;
  check: (context: BadgeContext) => boolean;
}

interface BadgeContext {
  xp: number;
  currentStreak: number;
  longestStreak: number;
  sectionScores: Record<string, SectionScore>;
  questionHistory: Array<{ correct: boolean; timeSpentMs: number; section: string }>;
  badges: Badge[];
}

export const BADGE_DEFINITIONS: BadgeCondition[] = [
  {
    id: 'first-flight',
    name: 'First Flight',
    description: 'Complete your first practice session',
    icon: 'Plane',
    check: (ctx) => ctx.questionHistory.length > 0,
  },
  // ... 19 more badges
];

export function evaluateNewBadges(context: BadgeContext): string[] {
  const earned = new Set(context.badges.filter(b => b.earnedAt).map(b => b.id));
  const newlyEarned: string[] = [];
  for (const def of BADGE_DEFINITIONS) {
    if (!earned.has(def.id) && def.check(context)) {
      newlyEarned.push(def.id);
    }
  }
  return newlyEarned;
}
```

### Pattern 3: Mission as Typed Data
**What:** Missions are static data objects defining curated question sequences
**When to use:** GAME-06 mission structure
**Example:**
```typescript
// src/types/gamification.ts (additions)
export interface Mission {
  id: string;
  name: string;
  description: string;
  objectives: MissionObjective[];
  xpReward: number;
  badgeId?: string; // Optional badge earned on completion
}

export interface MissionObjective {
  type: 'complete-section' | 'score-threshold' | 'speed-challenge' | 'streak';
  sectionId?: SectionId;
  target: number; // e.g., 80 for 80% score, 5 for 5-day streak
  label: string;
}

export interface MissionProgress {
  missionId: string;
  startedAt: number;
  objectiveProgress: boolean[]; // Parallel to mission.objectives
  completedAt: number | null;
}
```

### Pattern 4: Dashboard as Composition of Store Selectors
**What:** Dashboard reads from multiple stores via selectors, no prop drilling
**When to use:** DashboardPage composition
**Example:**
```typescript
export function DashboardPage() {
  const xp = useGamificationStore(s => s.xp);
  const rank = useGamificationStore(s => s.rank);
  const streak = useGamificationStore(s => s.currentStreak);
  const scores = useProgressStore(s => s.sectionScores);
  const history = useProgressStore(s => s.questionHistory);

  return (
    <div className="space-y-6">
      <DashboardStats xp={xp} rank={rank} streak={streak} />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {ASTB_SECTIONS.map(section => (
          <SectionScoreCard key={section.id} section={section} score={scores[section.id]} />
        ))}
      </div>
      <RecentActivity history={history} />
    </div>
  );
}
```

### Anti-Patterns to Avoid
- **Computing derived state in components:** Calculate XP-to-next-rank, badge eligibility, etc. in utility functions, not inline in JSX
- **Storing derived data:** Don't store "percentage to next rank" -- derive it from `xp` and `RANK_THRESHOLDS`
- **Multiple XP award paths:** All XP must flow through `addXP()` on the gamification store -- never set xp directly
- **Mutating badge array:** Always produce new arrays when adding earned badges (Zustand immer not used here)

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Date comparison for streaks | Custom date math | Existing `getTodayISO()`/`getYesterdayISO()` in gamification store | Already handles ISO date strings correctly |
| IndexedDB persistence | Raw IndexedDB API | Existing `indexedDBStorage` adapter | Already proven across progress + gamification stores |
| Icon rendering | Custom SVG icons | Lucide React icons | Consistent with rest of app, large icon set |
| Animation timing | JavaScript timers | CSS `@keyframes` + Tailwind `animate-*` utilities | GPU-accelerated, no JS overhead |

**Key insight:** The Phase 1 foundation did the hard infrastructure work. Phase 3 is almost entirely UI components + pure business logic functions. Don't over-engineer the gamification engine -- it's just derived state.

## Common Pitfalls

### Pitfall 1: XP Double-Counting
**What goes wrong:** XP awarded both in handleAnswer AND in session summary, or awarded on review/retry of same questions
**Why it happens:** Multiple effect hooks or callbacks that each call addXP
**How to avoid:** Single XP award point per question (in handleAnswer), single bonus award point (in session complete effect). Track awarded question IDs to prevent double-counting on re-render.
**Warning signs:** XP jumps by 2x expected amount, XP increases when reviewing explanations

### Pitfall 2: Streak Timezone Issues
**What goes wrong:** User studies at 11:55 PM, streak logic uses UTC, counts as "same day" as morning session
**Why it happens:** `toISOString().split('T')[0]` returns UTC date, not local date
**How to avoid:** The existing implementation uses `new Date().toISOString().split('T')[0]` which IS UTC-based. This is actually a bug in the existing code. Fix by using local date: `new Date().toLocaleDateString('en-CA')` (returns YYYY-MM-DD in local time).
**Warning signs:** Streaks breaking unexpectedly for users in negative UTC offsets (US timezones)

### Pitfall 3: Badge Evaluation Performance
**What goes wrong:** Evaluating all 20+ badge conditions on every single answer
**Why it happens:** Calling evaluateNewBadges after every question
**How to avoid:** Only evaluate badges on session completion (not per-question). Badge conditions that depend on per-question data (speed records) should pre-compute during session, then check at end.
**Warning signs:** Noticeable lag when answering questions

### Pitfall 4: Store Hydration Race Condition
**What goes wrong:** Dashboard renders before IndexedDB data loads, shows 0 XP briefly
**Why it happens:** Zustand persist with async storage has initial empty state
**How to avoid:** Existing `HydrationGate` component handles this -- it blocks rendering until stores are hydrated. Ensure any new store slices also participate in hydration.
**Warning signs:** Flash of "0 XP" / "Cadet" on page load before real data appears

### Pitfall 5: Mission Progress Not Persisting
**What goes wrong:** User closes browser mid-mission, progress lost
**Why it happens:** Mission progress stored in component state instead of Zustand store
**How to avoid:** All mission progress must be in the gamification store (or a new missions store) with IndexedDB persistence.
**Warning signs:** Mission resets to beginning after page refresh

## Code Examples

### XP Notification Toast (CSS-only animation)
```typescript
// Lightweight notification without a toast library
export function XPNotification({ amount, visible }: { amount: number; visible: boolean }) {
  return (
    <div
      className={`fixed right-4 top-4 z-50 rounded-lg bg-gold-500 px-4 py-2 font-bold text-navy-900 shadow-lg transition-all duration-500 ${
        visible ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0 pointer-events-none'
      }`}
    >
      +{amount} XP
    </div>
  );
}
```

### Circular Progress Ring (Custom SVG)
```typescript
// Reusable for section scores and rank progress
export function ProgressRing({
  percentage,
  size = 80,
  strokeWidth = 6,
  color = 'text-gold-400',
}: {
  percentage: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
}) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <svg width={size} height={size} className="rotate-[-90deg]">
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        className="text-navy-700"
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
        className={color}
      />
    </svg>
  );
}
```

### Rank Progress Calculation
```typescript
// src/lib/xp.ts
import { Rank, RANK_THRESHOLDS } from '../lib/constants';

const RANK_ORDER: Rank[] = [
  Rank.CADET, Rank.ENSIGN, Rank.LIEUTENANT, Rank.COMMANDER, Rank.PILOT,
];

export function getRankProgress(xp: number, currentRank: Rank) {
  const currentIdx = RANK_ORDER.indexOf(currentRank);
  const nextIdx = currentIdx + 1;

  if (nextIdx >= RANK_ORDER.length) {
    return { currentXP: xp, nextThreshold: RANK_THRESHOLDS[Rank.PILOT], progress: 1, nextRank: null };
  }

  const nextRank = RANK_ORDER[nextIdx];
  const currentThreshold = RANK_THRESHOLDS[currentRank];
  const nextThreshold = RANK_THRESHOLDS[nextRank];
  const progress = (xp - currentThreshold) / (nextThreshold - currentThreshold);

  return { currentXP: xp, nextThreshold, progress: Math.min(progress, 1), nextRank };
}
```

### Badge Definitions (Sample of 20)
```typescript
// Categories: Getting Started (4), Section Mastery (5), Streaks (4), Speed (3), XP Milestones (4)
const BADGE_DEFINITIONS = [
  // Getting Started
  { id: 'first-flight', name: 'First Flight', description: 'Complete your first practice session', icon: 'Plane' },
  { id: 'all-sections', name: 'Full Clearance', description: 'Practice all 5 sections', icon: 'Shield' },
  { id: 'first-perfect', name: 'Bullseye', description: 'Score 100% on a practice session', icon: 'Target' },
  { id: 'centurion', name: 'Centurion', description: 'Answer 100 total questions', icon: 'Award' },

  // Section Mastery (one per section)
  { id: 'mst-master', name: 'Math Ace', description: 'Score 90%+ on MST with 50+ questions', icon: 'Calculator' },
  // ... etc

  // Streaks
  { id: 'streak-3', name: 'Hat Trick', description: '3-day study streak', icon: 'Flame' },
  { id: 'streak-7', name: 'Weekly Warrior', description: '7-day study streak', icon: 'Flame' },
  { id: 'streak-30', name: 'Iron Discipline', description: '30-day study streak', icon: 'Flame' },
  { id: 'streak-freeze', name: 'Emergency Landing', description: 'Use a streak freeze', icon: 'Shield' },

  // Speed
  { id: 'speed-demon', name: 'Speed Demon', description: 'Answer 10 questions correctly in under 2 minutes', icon: 'Zap' },
  { id: 'timed-ace', name: 'Under Pressure', description: 'Score 80%+ on a timed test', icon: 'Clock' },
  { id: 'personal-best', name: 'New Record', description: 'Beat your personal best on a timed challenge', icon: 'Trophy' },

  // XP Milestones
  { id: 'xp-500', name: 'Ensign Earned', description: 'Earn 500 XP', icon: 'Star' },
  { id: 'xp-2000', name: 'Lieutenant Earned', description: 'Earn 2,000 XP', icon: 'Star' },
  { id: 'xp-5000', name: 'Commander Earned', description: 'Earn 5,000 XP', icon: 'Star' },
  { id: 'xp-10000', name: 'Wings Earned', description: 'Earn 10,000 XP', icon: 'Star' },
];
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| localStorage for persistence | IndexedDB via idb-keyval | Phase 1 decision | Already implemented -- no change needed |
| TS enums for ranks | `as const` objects | Phase 1 decision | Rank already uses const pattern |
| Global toast libraries (react-hot-toast) | CSS transition + portal | Current trend | Avoids dependency for 1-2 notification types |

**No deprecated patterns to worry about** -- this phase uses only existing stack with no new dependencies.

## Open Questions

1. **Streak Freeze Earning Mechanic**
   - What we know: `streakFreezeAvailable` boolean exists in store, freeze logic works
   - What's unclear: How does user earn a streak freeze? Options: (a) earn at 7-day streak automatically, (b) earn via XP purchase, (c) earn one per week of activity
   - Recommendation: Award one streak freeze automatically at every 7-day streak milestone. Simple, motivating, no "currency" system needed.

2. **Mission Count and Scope**
   - What we know: Requirement says "curated study sequences with objectives"
   - What's unclear: How many missions? How complex?
   - Recommendation: Start with 5-8 missions covering common study paths (one per section + cross-section combos). Keep objectives simple: "complete N questions in section X with Y% accuracy."

3. **Timed Challenge Differentiation from Timed Test**
   - What we know: Timed tests exist (PRAC-02). GAME-07 says "timed challenge mode with personal best tracking"
   - What's unclear: How is this different from existing timed tests?
   - Recommendation: Challenges are shorter (10 questions, tight time limit) with personal best leaderboard per section. Timed tests simulate real ASTB timing. Different routes, shared QuizSession component.

4. **Sound Effects (use-sound concern from STATE.md)**
   - What we know: STATE.md flags "use-sound library may not support React 19"
   - What's unclear: Whether sound is even in scope for Phase 3
   - Recommendation: Defer sound effects entirely. They are not in any GAME requirement. If desired later, use the Web Audio API directly (3 lines of code for a simple chime) rather than adding a library.

## Sources

### Primary (HIGH confidence)
- Existing codebase: `src/stores/gamification-store.ts`, `src/types/gamification.ts`, `src/lib/constants.ts` -- foundation already built
- Existing codebase: `src/stores/progress-store.ts`, `src/types/progress.ts` -- data source for dashboard
- Existing codebase: `src/components/quiz/QuizSession.tsx` -- integration point for XP awards
- Existing codebase: `src/index.css` -- theme tokens (navy, gold, cockpit-gray, success, danger)

### Secondary (MEDIUM confidence)
- Zustand v5 persist middleware patterns -- consistent with existing usage in codebase
- Tailwind CSS v4 `@theme` custom properties -- verified in index.css

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - no new dependencies, everything already installed and proven
- Architecture: HIGH - extends existing patterns (stores, components, types) with clear integration points
- Pitfalls: HIGH - identified from direct code review (UTC bug is verified in source)

**Research date:** 2026-03-08
**Valid until:** 2026-04-08 (stable -- no external dependencies to track)
