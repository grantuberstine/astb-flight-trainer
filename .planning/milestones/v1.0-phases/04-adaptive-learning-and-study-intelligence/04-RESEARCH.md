# Phase 4: Adaptive Learning and Study Intelligence - Research

**Researched:** 2026-03-08
**Domain:** Spaced repetition, adaptive question selection, study planning, client-side learning algorithms
**Confidence:** HIGH

## Summary

Phase 4 adds intelligence to the study experience: diagnostic assessments, adaptive question prioritization, spaced repetition for missed questions, test-date-based study planning, and a PBM concept trainer. All logic runs client-side with no new dependencies -- the existing Zustand + IndexedDB stack handles everything.

The codebase already has the foundational pieces: `questionHistory` (with per-answer timestamps, correctness, section, and timing), `sectionScores` (aggregated accuracy per section), a `testDate` field in settings-store, and the `getQuestions()` loader with shuffle. Phase 4 extends these with new stores/modules for spaced repetition scheduling, diagnostic state, study plans, and a new adaptive question selector that replaces the current random shuffle when in adaptive mode.

**Primary recommendation:** Build all adaptive logic as pure utility functions in `src/lib/` (testable, no React dependency), with thin Zustand stores for persistence and React hooks for UI binding. No external spaced repetition libraries -- the SM-2 algorithm is ~30 lines of code and avoids a dependency for minimal logic.

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| PRAC-03 | App runs a diagnostic assessment to identify weak areas across all sections | Diagnostic mode uses existing quiz infrastructure with forced coverage across all 5 sections; results stored in new diagnostic store; visual breakdown via radar/bar chart using pure CSS/SVG (no charting library needed) |
| PRAC-04 | App adapts study recommendations based on performance (prioritize weak areas) | Weighted random selection algorithm using inverse accuracy scores; adaptive selector function replaces `shuffle` in `getQuestions()` when adaptive mode is active |
| PRAC-05 | Missed questions resurface via spaced repetition | SM-2 algorithm implemented as pure function; new `spacedRepetition` store tracks per-question intervals and next-review dates; review queue hook surfaces due questions |
| PRAC-06 | User can set test date and get a paced study plan | Settings store already has `testDate`; new study plan generator divides remaining days into weekly blocks with section focus areas based on diagnostic results |
| PRAC-08 | PBM concept trainer with directional reasoning and multitasking exercises | New page with two exercise types: directional reasoning (compass/heading problems) and divided attention (simultaneous tracking tasks); educational framing explains real PBM concepts |
</phase_requirements>

## Standard Stack

### Core (already installed -- no new dependencies)
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| React 19 | 19.x | UI framework | Already in project |
| Zustand 5 | 5.x | State management + IndexedDB persist | Already in project, pattern established |
| idb-keyval | latest | IndexedDB storage | Already in project via storage adapter |

### Supporting (no new installs)
| Library | Purpose | When to Use |
|---------|---------|-------------|
| Lucide React | Icons for diagnostic UI, study plan | Already available |
| React Router 7 | New pages (diagnostic, study plan, PBM trainer) | Already available |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Custom SM-2 | `ts-fsrs` library | SM-2 is ~30 lines; adding a dependency for this is overkill in a client-side app |
| Custom charts | Chart.js / Recharts | Diagnostic breakdown is simple enough for pure CSS bars or inline SVG; no charting library justified |
| Custom PBM simulation | Canvas game engine | PBM concept trainer teaches concepts, not joystick sim -- simple React components suffice |

**Installation:** None needed. Zero new dependencies.

## Architecture Patterns

### Recommended Structure Additions
```
src/
  lib/
    adaptive.ts          # Weighted question selection algorithm
    spaced-repetition.ts # SM-2 algorithm (pure functions)
    study-plan.ts        # Study plan generation logic
    diagnostic.ts        # Diagnostic scoring/analysis
  stores/
    adaptive-store.ts    # Spaced repetition cards, diagnostic results, study plan
  hooks/
    useAdaptiveQuiz.ts   # Wraps useQuizSession with adaptive selection
    useStudyPlan.ts      # Derives current week's plan from store
    useReviewQueue.ts    # Surfaces due spaced repetition items
  pages/
    DiagnosticPage.tsx   # Diagnostic assessment flow
    StudyPlanPage.tsx    # Weekly study plan view
    PBMTrainerPage.tsx   # PBM concept exercises
  components/
    adaptive/            # Diagnostic results, study plan cards, review prompts
    pbm/                 # Directional reasoning, divided attention exercises
```

### Pattern 1: Adaptive Question Selector
**What:** Replace random shuffle with weighted selection that prioritizes weak areas and due review items
**When to use:** Any practice session when adaptive mode is enabled
**Example:**
```typescript
// src/lib/adaptive.ts
import type { SectionId } from '../types/question';
import type { SectionScore } from '../types/progress';

interface WeightedSection {
  sectionId: SectionId;
  weight: number;
}

export function computeSectionWeights(
  scores: Record<SectionId, SectionScore>,
  minWeight: number = 0.1,
): WeightedSection[] {
  const sections: SectionId[] = ['MST', 'RCT', 'MCT', 'ANIT', 'SAT'];

  return sections.map((id) => {
    const score = scores[id];
    if (score.total === 0) {
      // Untested sections get high weight
      return { sectionId: id, weight: 1.0 };
    }
    const accuracy = score.correct / score.total;
    // Lower accuracy = higher weight (inverse relationship)
    // Clamp to minWeight so strong sections still appear
    const weight = Math.max(1 - accuracy, minWeight);
    return { sectionId: id, weight };
  });
}

export function pickWeightedSection(weights: WeightedSection[]): SectionId {
  const totalWeight = weights.reduce((sum, w) => sum + w.weight, 0);
  let random = Math.random() * totalWeight;
  for (const w of weights) {
    random -= w.weight;
    if (random <= 0) return w.sectionId;
  }
  return weights[weights.length - 1].sectionId;
}
```

### Pattern 2: SM-2 Spaced Repetition
**What:** Track missed questions with increasing review intervals
**When to use:** After any incorrect answer; review queue checked at session start
**Example:**
```typescript
// src/lib/spaced-repetition.ts
export interface SRCard {
  questionId: string;
  section: SectionId;
  easeFactor: number;   // starts at 2.5
  interval: number;     // days until next review
  repetitions: number;  // successful reviews in a row
  nextReview: number;   // timestamp (ms)
  lastReview: number;   // timestamp (ms)
}

const DAY_MS = 86400000;

export function createCard(questionId: string, section: SectionId): SRCard {
  return {
    questionId,
    section,
    easeFactor: 2.5,
    interval: 1,
    repetitions: 0,
    nextReview: Date.now() + DAY_MS,
    lastReview: Date.now(),
  };
}

// SM-2 algorithm: quality 0-5 (0-2 = fail, 3-5 = pass)
export function reviewCard(card: SRCard, quality: number): SRCard {
  const now = Date.now();

  if (quality < 3) {
    // Failed: reset repetitions, short interval
    return {
      ...card,
      repetitions: 0,
      interval: 1,
      nextReview: now + DAY_MS,
      lastReview: now,
      easeFactor: Math.max(1.3, card.easeFactor - 0.2),
    };
  }

  // Passed
  const reps = card.repetitions + 1;
  let interval: number;
  if (reps === 1) interval = 1;
  else if (reps === 2) interval = 6;
  else interval = Math.round(card.interval * card.easeFactor);

  const ef = card.easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));

  return {
    ...card,
    repetitions: reps,
    interval,
    easeFactor: Math.max(1.3, ef),
    nextReview: now + interval * DAY_MS,
    lastReview: now,
  };
}

export function getDueCards(cards: SRCard[]): SRCard[] {
  const now = Date.now();
  return cards.filter((c) => c.nextReview <= now);
}
```

### Pattern 3: Study Plan Generation
**What:** Divide days until test into weekly blocks with section focus
**When to use:** When user sets test date; regenerated when diagnostic results change
**Example:**
```typescript
// src/lib/study-plan.ts
export interface StudyWeek {
  weekNumber: number;
  startDate: string;    // ISO date
  endDate: string;
  focusSections: SectionId[];
  reviewSections: SectionId[];
  dailyGoal: number;    // questions per day
}

export function generateStudyPlan(
  testDate: string,
  sectionWeights: WeightedSection[],
): StudyWeek[] {
  const now = new Date();
  const test = new Date(testDate);
  const daysRemaining = Math.max(1, Math.ceil((test.getTime() - now.getTime()) / DAY_MS));
  const weeksRemaining = Math.max(1, Math.ceil(daysRemaining / 7));

  // Sort sections by weight (weakest first)
  const sorted = [...sectionWeights].sort((a, b) => b.weight - a.weight);

  // Distribute sections across weeks, front-loading weak areas
  // Last week is always comprehensive review
  const weeks: StudyWeek[] = [];
  // ... generation logic distributing focus sections across weeks
  return weeks;
}
```

### Pattern 4: Diagnostic Assessment
**What:** Structured assessment pulling questions from all 5 sections to establish baseline
**When to use:** First-time users or when user wants to re-assess
**Example:**
```typescript
// src/lib/diagnostic.ts
export interface DiagnosticResult {
  timestamp: number;
  sectionResults: Record<SectionId, {
    correct: number;
    total: number;
    accuracy: number;
    avgTimeMs: number;
    weakTags: string[];    // tags from missed questions
  }>;
  overallAccuracy: number;
  weakestSections: SectionId[];
  recommendedFocus: SectionId[];
}

// Diagnostic uses 5 questions per section = 25 total
export const DIAGNOSTIC_QUESTIONS_PER_SECTION = 5;
```

### Anti-Patterns to Avoid
- **Storing full question objects in IndexedDB:** Only store question IDs and metadata. Question content is in the code-split bundles.
- **Running spaced repetition on every render:** Compute review queue once on page load or store mount, not reactively on every state change.
- **Overcomplicating the PBM trainer:** PBM concept trainer teaches directional reasoning concepts, not a real joystick simulation. Keep it educational with simple interactive exercises.
- **Mutating existing stores for new features:** Create a new `adaptive-store.ts` rather than overloading the existing `progress-store.ts`. The progress store stays simple; adaptive logic is layered on top.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Spaced repetition algorithm | Custom interval logic | SM-2 algorithm (well-documented, ~30 lines) | SM-2 is battle-tested; custom interval logic will have edge cases |
| Date arithmetic | Manual day/week calculations | Native `Date` API with helper functions | Date math is tricky (DST, month boundaries); keep it simple with ISO strings |
| Radar/bar charts | Canvas-based charting | CSS width percentages for bars, SVG for radar | Diagnostic breakdown is 5 data points; charting library is massive overkill |
| Question tagging/categorization | Runtime tag inference | Use existing `tags` field on `BaseQuestion` | Tags are already on every question; use them for weakness identification |

**Key insight:** This phase is about algorithms and data flow, not UI complexity. The hard parts are the selection logic, interval scheduling, and plan generation -- all pure functions that can be unit tested without React.

## Common Pitfalls

### Pitfall 1: Spaced Repetition Queue Explosion
**What goes wrong:** Every missed question creates a card, and with 300+ questions the review queue becomes overwhelming
**Why it happens:** No cap on active review cards
**How to avoid:** Limit active SR cards to ~20-30 at a time. When a card graduates (interval > 30 days), archive it. Show "X cards due" count, not the full list.
**Warning signs:** Review queue consistently has 50+ items

### Pitfall 2: Adaptive Mode Ignoring Strong Sections
**What goes wrong:** Weighted selection sends user exclusively to weak sections; strong sections decay from neglect
**Why it happens:** Weight formula makes strong sections nearly zero probability
**How to avoid:** Use a minimum weight floor (0.1 = 10% chance) so strong sections still appear. The formula `Math.max(1 - accuracy, 0.1)` ensures coverage.
**Warning signs:** User never sees questions from sections they've mastered

### Pitfall 3: Study Plan Becomes Stale
**What goes wrong:** Plan generated once at test date entry, but user's performance changes over time
**Why it happens:** Static plan doesn't update as weaknesses shift
**How to avoid:** Regenerate plan whenever diagnostic is retaken or weekly. Store the generation parameters, not just the output. Show "plan updated" indicator.
**Warning signs:** User's weak sections changed but plan still focuses on old weaknesses

### Pitfall 4: Diagnostic Too Long or Too Short
**What goes wrong:** Too many questions (50+) and user abandons it; too few (10) and results are statistically meaningless
**Why it happens:** Not thinking about the UX of a baseline assessment
**How to avoid:** 5 questions per section = 25 total. Takes ~10-15 minutes. Enough for a reasonable accuracy estimate per section. Allow retaking after more practice.
**Warning signs:** Low diagnostic completion rate

### Pitfall 5: PBM Trainer Scope Creep
**What goes wrong:** Attempting to build a real PBM simulation (joystick tracking, dual-task timing) when requirements say "concept trainer"
**Why it happens:** PBM is inherently about motor skills + multitasking
**How to avoid:** Focus on the cognitive/conceptual side: directional reasoning (compass headings, relative directions), basic multitasking awareness exercises (track two things at once). Frame it as "understanding what PBM tests" not "simulating PBM."
**Warning signs:** Building Canvas-based real-time tracking games

### Pitfall 6: AnswerRecord Missing Data for SR
**What goes wrong:** Current `AnswerRecord` doesn't store which answer was selected -- only `correct: boolean`
**Why it happens:** Progress store was designed for aggregate stats, not per-question review
**How to avoid:** The `AnswerRecord` type needs no change for SR -- we only need `questionId` and `correct` to create/update SR cards. The `useQuizSession` hook's `AnswerEntry` already has `selected`, which can be passed to the SR system at quiz completion.
**Warning signs:** Trying to retroactively add fields to persisted data

## Code Examples

### Integrating Adaptive Selection with Existing getQuestions
```typescript
// Modified src/data/questions/index.ts
import type { Question, SectionId } from '../../types/question';
import type { SRCard } from '../../lib/spaced-repetition';

// Existing function stays for non-adaptive mode
export async function getQuestions(section: SectionId, count = 10): Promise<Question[]> {
  // ... existing implementation
}

// New function for adaptive mode
export async function getAdaptiveQuestions(
  section: SectionId,
  count: number,
  dueCardIds: string[],     // SR cards due for review
): Promise<Question[]> {
  const mod = await loaders[section]();
  const allQuestions = mod.default;

  // Prioritize due review questions
  const dueQuestions = allQuestions.filter((q) => dueCardIds.includes(q.id));
  const otherQuestions = shuffle(allQuestions.filter((q) => !dueCardIds.includes(q.id)));

  // Fill with due cards first, then random
  const result = [...dueQuestions.slice(0, count)];
  const remaining = count - result.length;
  if (remaining > 0) {
    result.push(...otherQuestions.slice(0, remaining));
  }
  return shuffle(result); // Shuffle so due cards aren't always first
}
```

### Diagnostic Results Visual (CSS-only bars)
```typescript
// Diagnostic result component pattern
interface SectionBarProps {
  label: string;
  accuracy: number; // 0-100
  color: string;
}

function SectionBar({ label, accuracy, color }: SectionBarProps) {
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-sm">
        <span className="text-navy-300">{label}</span>
        <span className="font-medium text-white">{accuracy}%</span>
      </div>
      <div className="h-3 rounded-full bg-navy-700">
        <div
          className={`h-3 rounded-full ${color}`}
          style={{ width: `${accuracy}%` }}
        />
      </div>
    </div>
  );
}
```

### Adaptive Store Shape
```typescript
// src/stores/adaptive-store.ts
interface AdaptiveState {
  // Spaced repetition
  srCards: SRCard[];

  // Diagnostic
  diagnosticResults: DiagnosticResult[];
  lastDiagnosticAt: number | null;

  // Study plan
  studyPlan: StudyWeek[] | null;
  planGeneratedAt: number | null;

  // Actions
  addSRCard: (card: SRCard) => void;
  updateSRCard: (questionId: string, quality: number) => void;
  saveDiagnosticResult: (result: DiagnosticResult) => void;
  generatePlan: (testDate: string) => void;
}
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| SM-2 (SuperMemo 2) | FSRS (Free Spaced Repetition Scheduler) | 2023+ | FSRS is more accurate but complex; SM-2 is perfectly adequate for a study app with 300 questions |
| Fixed study schedules | Adaptive scheduling based on forgetting curves | Ongoing | This project uses a hybrid: weekly plans adjust based on diagnostic results, not real-time forgetting curves |
| Static question pools | IRT (Item Response Theory) difficulty calibration | Academic | Way overkill for this project; questions already have difficulty tags |

**Why SM-2 over FSRS:** SM-2 is simpler (~30 lines vs ~200), well-understood, and the question pool (300 items) is small enough that optimal scheduling barely matters. FSRS shines with 10,000+ items (like Anki language decks).

## Open Questions

1. **PBM Exercise Design**
   - What we know: PBM tests directional reasoning, multitasking, and divided attention. The real test uses a joystick which is out of scope.
   - What's unclear: Exact exercise format for "divided attention" in a browser context
   - Recommendation: Two exercise types: (1) compass/heading direction problems ("You're flying heading 270, turn right 90 degrees -- what's your new heading?"), (2) dual-task tracking (monitor two changing values simultaneously and respond when thresholds are crossed). Both teach concepts that appear on PBM without simulating the joystick.

2. **Diagnostic Re-assessment Frequency**
   - What we know: Users need a baseline assessment and should be able to re-assess
   - What's unclear: How often to prompt or allow re-assessment
   - Recommendation: Allow manual re-take anytime. Suggest re-assessment after every 100 questions answered or weekly, whichever comes first. Store history of all diagnostic results to show improvement over time.

3. **Study Plan Granularity**
   - What we know: Plan needs to pace content coverage toward test date
   - What's unclear: Daily vs weekly plan granularity
   - Recommendation: Weekly plan (which sections to focus on) with a daily question count goal. Too-granular daily plans feel rigid and demotivating when missed.

## Sources

### Primary (HIGH confidence)
- Project codebase: `src/stores/progress-store.ts`, `src/types/progress.ts`, `src/types/question.ts` -- existing data structures
- Project codebase: `src/stores/settings-store.ts` -- testDate field already exists
- Project codebase: `src/data/questions/index.ts` -- existing question loading pattern
- SM-2 algorithm specification (well-documented public domain algorithm)

### Secondary (MEDIUM confidence)
- Anki/SuperMemo SM-2 implementation patterns -- widely documented, consistent across sources
- Spaced repetition best practices from learning science literature

### Tertiary (LOW confidence)
- PBM test format details -- based on publicly available ASTB preparation materials; actual test format is proprietary

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - zero new dependencies, all existing infrastructure
- Architecture: HIGH - pure functions + Zustand pattern well-established in project
- Spaced repetition (SM-2): HIGH - algorithm is public domain, extensively documented
- Adaptive selection: HIGH - straightforward weighted random selection
- Study plan generation: MEDIUM - plan quality depends on design choices (weekly granularity, section distribution)
- PBM concept trainer: MEDIUM - exercise design is novel (no standard pattern), but scope is limited to conceptual exercises
- Pitfalls: HIGH - common issues with SR and adaptive systems are well-documented

**Research date:** 2026-03-08
**Valid until:** 2026-04-08 (stable -- no external dependencies to change)
