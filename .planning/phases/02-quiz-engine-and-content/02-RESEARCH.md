# Phase 2: Quiz Engine and Content - Research

**Researched:** 2026-03-08
**Domain:** React quiz engine, timer systems, spatial rendering, ASTB content authoring
**Confidence:** HIGH

## Summary

Phase 2 builds the core study loop: a quiz engine that renders questions, enforces timing, shows explanations, and manages session state across 5 ASTB sections. The technical challenges fall into three tiers: (1) standard React state management for quiz flow and timers, (2) content authoring for 360+ questions with detailed explanations across 5 sections, and (3) the highest-risk item -- parameterized Canvas/SVG rendering for SAT spatial apperception questions showing cockpit views with pitch/bank/heading.

The existing codebase provides strong foundations: discriminated union `Question` type, `ASTB_SECTIONS` data, `useProgressStore.recordAnswer()`, and hash-based routing. The quiz engine should use a `useReducer`-based state machine pattern (not scattered `useState`) to manage the complex quiz lifecycle (idle -> answering -> showing-explanation -> next-question -> session-complete). Content should be authored as typed TypeScript arrays in separate files per section, validated at build time through the existing type system.

**Primary recommendation:** Build quiz state as a `useReducer` state machine, store questions as typed TS data files per section, render SAT cockpit views with Canvas 2D API (not Three.js -- overkill for 2D horizon/bank indicators).

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions
- Immediate feedback after each question -- no end-of-set review
- Full breakdown on every answer: highlight correct answer, explain why it's right, explain why each wrong option is wrong
- Progress indicator: row of dots at top -- filled = answered, green = correct, red = wrong, empty = remaining
- Explicit "Next" button to advance -- user controls the pace
- In timed mode, timer pauses while explanation is displayed, resumes on "Next"
- Concept card format -- bite-sized cards scrolled through sequentially, each covering one concept with heading, short explanation, and SVG diagram/visual
- 3-5 concept cards per topic within a section (brief, focused)
- SVG vector illustrations for diagrams (gears, circuits, instruments, etc.) -- match app theme, can animate
- No inline mini-quizzes in lessons -- lessons are pure content, practice is separate
- Section menu as entry point -- Practice page shows 5 section cards (reuses ASTB_SECTIONS data), tap to start
- 10 questions per practice session by default
- Untimed by default -- "Timed Test" is a separate mode for ASTB-pressure simulation
- Can quit mid-session with confirmation dialog -- answers already given are saved to progress
- SAT: Clean, simple cockpit view rendering -- horizon line, sky/ground split, coastline outline. Focus on readability over realism
- SAT: 5 answer options shown as small aircraft silhouettes with different pitch/bank/heading combinations
- SAT: Explanations include annotated diagram overlaying labels on the cockpit view
- SAT: Parameterized Canvas/SVG rendering (not static images)

### Claude's Discretion
- End-of-session summary screen design (score, time, section breakdown)
- Question randomization/shuffling strategy
- Lesson card transition animations
- Timed test time limits per section (research actual ASTB timing)
- Full practice test flow (all sections back-to-back) -- UI for section transitions

### Deferred Ideas (OUT OF SCOPE)
None -- discussion stayed within phase scope
</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| CONT-01 | 100+ MST questions (arithmetic, algebra, geometry, word problems) with explanations | Question type system, TS data file pattern, content authoring approach |
| CONT-02 | 50+ RCT passage-based questions (main idea, inference, vocabulary) with explanations | PassageQuestion type with sub-questions already defined |
| CONT-03 | 80+ MCT questions (forces, machines, fluids, circuits, engines) with explanations | MultipleChoiceQuestion type, SVG diagrams for mechanical concepts |
| CONT-04 | 80+ ANIT questions (aerodynamics, instruments, naval terms, weather) with explanations | MultipleChoiceQuestion type |
| CONT-05 | 50+ SAT questions with cockpit-view-to-aircraft-orientation matching | SpatialQuestion type, Canvas rendering architecture |
| CONT-06 | Lesson/study content per section teaching concepts before practice | Concept card component pattern, SVG illustration approach |
| CONT-07 | Every question shows detailed explanation (why correct + why others wrong) | Explanation display component, per-option explanation data model |
| PRAC-01 | User can practice any section independently | Section selection UI, quiz session state machine |
| PRAC-02 | User can take timed practice tests simulating real ASTB time pressure | Timer hook, ASTB timing data, timed mode logic |
| PRAC-07 | User can take full practice test (all sections back-to-back) | Multi-section session orchestration, section transition UI |
</phase_requirements>

## ASTB Timing Data (for Timed Mode)

The ASTB-E is computer-adaptive, so exact question counts vary per test-taker. Based on multiple prep sources, the approximate timing is:

| Section | Questions (approx.) | Time Limit | Per-Question Pace |
|---------|---------------------|------------|-------------------|
| MST | 20-30 | ~40 min | ~80-120 sec |
| RCT | 20 | ~30 min | ~90 sec |
| MCT | 20-30 | ~15 min | ~30-45 sec |
| ANIT | 20-30 | ~15 min | ~30-45 sec |
| SAT | 25-35 | ~10 min | ~17-24 sec |

**Confidence:** MEDIUM -- The ASTB-E is a CAT (computer-adaptive test) and official time limits are not publicly documented with precision. These numbers are sourced from multiple prep sites (Mometrix, Practice Test Geeks, Effortless Math, military prep sites). For the app's timed mode, use these as reasonable practice pressure values.

**Recommendation for app timed mode:** Use the following simplified time limits for practice test simulation:

| Section | Practice Test Time | Questions in Test |
|---------|-------------------|-------------------|
| MST | 40 min | 30 |
| RCT | 30 min | 20 |
| MCT | 15 min | 30 |
| ANIT | 15 min | 30 |
| SAT | 10 min | 25 |

Total full practice test: ~110 minutes for ~135 questions.

## Standard Stack

### Core (already installed)
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| React | 19.2 | UI framework | Already in project |
| Zustand | 5.0 | State management + persistence | Already used for progress/gamification stores |
| react-router | 7.13 | Routing (hash-based) | Already configured |
| Tailwind CSS | 4.2 | Styling | Already configured with aviation theme |
| lucide-react | 0.577 | Icons | Already used in section cards |
| TypeScript | 5.9 | Type safety | Build-time validation of question data |

### Supporting (no new dependencies needed)
| Tool | Purpose | Why |
|------|---------|-----|
| Canvas 2D API | SAT cockpit view rendering | Browser-native, no library needed for 2D horizon/bank/coastline |
| SVG (inline JSX) | Lesson diagrams, mechanical illustrations | React-native, theme-compatible, animatable with CSS |
| useReducer | Quiz session state machine | Built into React, perfect for complex state transitions |
| CSS @keyframes / Tailwind animate | Lesson card transitions | No animation library needed for simple transitions |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Canvas 2D for SAT | SVG for SAT | Canvas better for real-time drawing with rotation transforms; SVG better for static diagrams. Use Canvas for cockpit view, SVG for answer silhouettes |
| useReducer | Zustand quiz store | useReducer is better here -- quiz session is ephemeral (not persisted), component-scoped, and has complex state transitions. Zustand is for persisted global state |
| No animation lib | framer-motion | Overkill for simple card transitions. CSS transitions + Tailwind animate classes sufficient |

**Installation:** No new packages required.

## Architecture Patterns

### Recommended Project Structure
```
src/
  data/
    questions/
      mst.ts            # MST question bank (typed array)
      rct.ts            # RCT question bank
      mct.ts            # MCT question bank
      anit.ts           # ANIT question bank
      sat.ts            # SAT question bank (SpatialScenarioParams)
      index.ts          # Re-export + helper to get questions by section
    lessons/
      mst-lessons.ts    # MST concept card data
      rct-lessons.ts    # RCT concept card data
      mct-lessons.ts    # MCT concept card data
      anit-lessons.ts   # ANIT concept card data
      sat-lessons.ts    # SAT concept card data
      index.ts          # Re-export + helper
  components/
    quiz/
      QuizSession.tsx       # Main quiz orchestrator (useReducer state machine)
      QuestionCard.tsx       # Renders current question (delegates to type-specific)
      MultipleChoiceCard.tsx # Standard 4-option question UI
      PassageCard.tsx        # Passage + sub-questions UI
      SpatialCard.tsx        # SAT cockpit view + 5 silhouette options
      ExplanationPanel.tsx   # Why correct + why each wrong
      ProgressDots.tsx       # Row of colored dots (green/red/empty)
      TimerBar.tsx           # Countdown timer display
      SessionSummary.tsx     # End-of-session results
      QuitDialog.tsx         # Confirmation to leave mid-session
    spatial/
      CockpitView.tsx        # Canvas component for cockpit instrument view
      AircraftSilhouette.tsx # SVG silhouette with pitch/bank/heading
      AnnotatedCockpit.tsx   # Cockpit view with explanation labels
    lessons/
      ConceptCard.tsx        # Single concept card (heading, text, SVG)
      LessonViewer.tsx       # Sequential card viewer with navigation
  hooks/
    useQuizSession.ts     # useReducer-based quiz state machine
    useCountdown.ts       # Timer hook (pause/resume/reset)
  types/
    lesson.ts             # Lesson/concept card types
  pages/
    PracticePage.tsx       # Section selection (already exists, enhance)
    QuizPage.tsx           # Active quiz session
    LessonPage.tsx         # Lesson viewer for a section
    TimedTestPage.tsx      # Timed test mode entry
    FullTestPage.tsx       # Full practice test (all sections)
```

### Pattern 1: Quiz State Machine (useReducer)
**What:** Manage quiz session lifecycle as a finite state machine with explicit states and transitions.
**When to use:** Any quiz/practice session flow.
**Example:**
```typescript
type QuizState = {
  status: 'idle' | 'answering' | 'showing-explanation' | 'complete';
  questions: Question[];
  currentIndex: number;
  answers: Array<{ questionId: string; selected: number; correct: boolean; timeMs: number }>;
  startedAt: number;
  timerPausedAt: number | null;  // for timed mode
};

type QuizAction =
  | { type: 'START'; questions: Question[] }
  | { type: 'ANSWER'; selected: number }
  | { type: 'NEXT' }
  | { type: 'QUIT' }
  | { type: 'TIME_UP' };

function quizReducer(state: QuizState, action: QuizAction): QuizState {
  switch (action.type) {
    case 'START':
      return {
        status: 'answering',
        questions: action.questions,
        currentIndex: 0,
        answers: [],
        startedAt: Date.now(),
        timerPausedAt: null,
      };
    case 'ANSWER': {
      const question = state.questions[state.currentIndex];
      const correct = action.selected === question.correctAnswer;
      return {
        ...state,
        status: 'showing-explanation',
        timerPausedAt: Date.now(), // pause timer
        answers: [...state.answers, {
          questionId: question.id,
          selected: action.selected,
          correct,
          timeMs: Date.now() - state.startedAt,
        }],
      };
    }
    case 'NEXT': {
      const nextIndex = state.currentIndex + 1;
      if (nextIndex >= state.questions.length) {
        return { ...state, status: 'complete' };
      }
      return {
        ...state,
        status: 'answering',
        currentIndex: nextIndex,
        timerPausedAt: null, // resume timer
      };
    }
    // ...
  }
}
```

### Pattern 2: Question Data as Typed Arrays
**What:** Store question banks as const-typed TypeScript arrays for build-time type checking.
**When to use:** All question content authoring.
**Example:**
```typescript
// src/data/questions/mst.ts
import type { MultipleChoiceQuestion } from '../../types/question';

export const mstQuestions: MultipleChoiceQuestion[] = [
  {
    id: 'mst-001',
    section: 'MST',
    type: 'multiple-choice',
    difficulty: 'easy',
    tags: ['arithmetic', 'fractions'],
    text: 'What is 3/4 + 1/8?',
    options: ['7/8', '4/12', '1/2', '3/8'],
    correctAnswer: 0,
    explanation: '3/4 = 6/8. So 6/8 + 1/8 = 7/8.',
  },
  // ...
];
```

### Pattern 3: Cockpit View Canvas Renderer
**What:** Parameterized Canvas 2D rendering for SAT spatial apperception questions.
**When to use:** SAT section only.
**Example:**
```typescript
// CockpitView.tsx - simplified concept
interface CockpitViewProps {
  pitch: number;    // degrees, positive = nose up
  bank: number;     // degrees, positive = right bank
  heading: number;  // degrees, 0 = north
  coastline: string; // 'left' | 'right' | 'ahead' | 'behind' | 'none'
  width?: number;
  height?: number;
  annotations?: Array<{ text: string; x: number; y: number }>;
}

function CockpitView({ pitch, bank, heading, coastline, width = 300, height = 300, annotations }: CockpitViewProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const ctx = canvasRef.current?.getContext('2d');
    if (!ctx) return;
    ctx.save();
    ctx.clearRect(0, 0, width, height);

    // Translate to center, rotate by bank angle
    ctx.translate(width / 2, height / 2);
    ctx.rotate((bank * Math.PI) / 180);

    // Draw sky (above horizon) and ground (below)
    const horizonOffset = (pitch / 90) * (height / 2);
    // Sky
    ctx.fillStyle = '#4A90D9'; // sky blue
    ctx.fillRect(-width, -height + horizonOffset, width * 2, height);
    // Ground
    ctx.fillStyle = '#8B6914'; // earth brown
    ctx.fillRect(-width, horizonOffset, width * 2, height);
    // Horizon line
    ctx.strokeStyle = '#FFFFFF';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(-width, horizonOffset);
    ctx.lineTo(width, horizonOffset);
    ctx.stroke();

    // Draw coastline if applicable
    if (coastline !== 'none') {
      drawCoastline(ctx, coastline, width, height, horizonOffset);
    }

    ctx.restore();

    // Draw fixed aircraft reference (center crosshair)
    drawAircraftSymbol(ctx, width / 2, height / 2);

    // Draw annotations if in explanation mode
    if (annotations) {
      annotations.forEach(({ text, x, y }) => {
        drawAnnotation(ctx, text, x, y);
      });
    }
  }, [pitch, bank, heading, coastline, width, height, annotations]);

  return <canvas ref={canvasRef} width={width} height={height} className="rounded-lg" />;
}
```

### Pattern 4: Countdown Timer Hook
**What:** Pausable countdown timer for timed practice tests.
**When to use:** Timed test mode.
**Example:**
```typescript
function useCountdown(totalSeconds: number) {
  const [remaining, setRemaining] = useState(totalSeconds);
  const [isPaused, setIsPaused] = useState(false);
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    if (isPaused || isExpired) return;
    const id = setInterval(() => {
      setRemaining(prev => {
        if (prev <= 1) {
          setIsExpired(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [isPaused, isExpired]);

  return {
    remaining,
    isPaused,
    isExpired,
    pause: () => setIsPaused(true),
    resume: () => setIsPaused(false),
    reset: (newTotal?: number) => {
      setRemaining(newTotal ?? totalSeconds);
      setIsExpired(false);
      setIsPaused(false);
    },
  };
}
```

### Pattern 5: Per-Option Explanations
**What:** CONT-07 requires explaining why each wrong answer is wrong. The current `explanation` field is a single string. Need to extend the data model.
**When to use:** All question types.
**Recommendation:** Add `optionExplanations` to question types rather than changing `explanation`.
```typescript
// Extend BaseQuestion or add to each type
interface MultipleChoiceQuestion extends BaseQuestion {
  type: 'multiple-choice';
  text: string;
  options: [string, string, string, string];
  correctAnswer: 0 | 1 | 2 | 3;
  explanation: string;  // keep for general explanation
  optionExplanations?: [string, string, string, string]; // why each option is right/wrong
}
```
This is optional per question -- `explanation` alone is sufficient for simpler questions where wrong answers are obviously wrong. Use `optionExplanations` for questions where wrong answers are plausibly confusing.

### Anti-Patterns to Avoid
- **Scattered useState for quiz flow:** Multiple independent `useState` calls for currentQuestion, answers, showExplanation, etc. creates impossible-to-reason-about state. Use one `useReducer`.
- **Storing questions in Zustand/IndexedDB:** Questions are static content -- they should be imported at build time, not stored in a database. Only answers/progress go in the store.
- **Giant monolithic question files:** A single file with 100+ questions is unmaintainable. Group by section, keep files under ~200 questions each.
- **Using Three.js for SAT rendering:** The cockpit view is a 2D representation (sky/ground split with horizon line). Canvas 2D with rotation transforms is sufficient. Three.js adds 500KB+ for no benefit.
- **Hardcoding timer values:** Timer durations should be constants, not magic numbers in components. Define in a config object alongside ASTB_SECTIONS.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Question shuffling | Custom Fisher-Yates | Simple `sort(() => Math.random() - 0.5)` or a utility `shuffle()` | Edge cases in randomization are subtle but for a quiz app, a basic shuffle is fine. Just seed from `Math.random()` |
| Timer precision | Custom high-precision timer | `setInterval` with 1-second ticks | Sub-second precision is unnecessary for a study timer. `setInterval` drift is irrelevant over 10-40 minute ranges |
| Route-based quiz state | URL params for quiz progress | Component state (useReducer) | Quiz session is ephemeral -- no need to persist in URL. Navigate away = session ends (with confirmation) |
| Markdown rendering for lessons | Custom parser | Inline JSX with Tailwind | Lesson content is authored by us, not user-generated. JSX gives full control over styling and SVG embedding |

## Common Pitfalls

### Pitfall 1: Timer Drift During Tab Backgrounding
**What goes wrong:** Browsers throttle `setInterval` in background tabs to once per second or slower. A 10-minute SAT timer could "drift" and show wrong time when user returns.
**Why it happens:** Battery/performance optimization by browsers.
**How to avoid:** Store the `endTime` (absolute timestamp) when timer starts. Calculate `remaining = endTime - Date.now()` on each tick rather than decrementing a counter. When tab becomes visible again, the time is correct.
**Warning signs:** Timer appears to pause when user switches tabs.

### Pitfall 2: Canvas Not Responsive
**What goes wrong:** Canvas has fixed pixel dimensions. On mobile or different screen sizes, it looks wrong.
**Why it happens:** Canvas `width`/`height` attributes set pixel buffer size, not display size.
**How to avoid:** Set canvas buffer size from container dimensions using `ResizeObserver` or a ref-based approach. Apply `devicePixelRatio` scaling for sharp rendering on high-DPI displays.
**Warning signs:** Blurry canvas on retina displays, canvas doesn't resize with viewport.

### Pitfall 3: Explanation Data Model Too Simple
**What goes wrong:** Single `explanation` string can't explain why each wrong answer is wrong (CONT-07 requirement).
**Why it happens:** Phase 1 defined `explanation: string` as a general field.
**How to avoid:** Add optional `optionExplanations` array. Render the general explanation first, then per-option breakdowns. Design the ExplanationPanel component to handle both formats gracefully.
**Warning signs:** Explanations feel generic and don't address specific wrong answers.

### Pitfall 4: PassageQuestion Sub-Question Navigation
**What goes wrong:** RCT passages have multiple sub-questions. If each sub-question is treated as a separate "question" in the progress dots, the dot count is confusing. If treated as one question, the UX for answering multiple sub-questions is unclear.
**Why it happens:** The `PassageQuestion` type wraps multiple `PassageSubQuestion` items.
**How to avoid:** Treat each passage as one "question unit" in the dot progress indicator, but show sub-questions one at a time within the passage view. The passage text stays visible while cycling through sub-questions. All sub-questions must be answered before moving to the next question unit.
**Warning signs:** Users confused about how many questions remain.

### Pitfall 5: Question ID Collisions
**What goes wrong:** If question IDs aren't unique across sections, `recordAnswer` in the progress store creates ambiguous history.
**Why it happens:** Manual ID assignment without a naming convention.
**How to avoid:** Use a strict naming convention: `{section}-{number}` (e.g., `mst-001`, `rct-042`, `sat-015`). Validate uniqueness at build time or with a simple test.
**Warning signs:** Progress stats don't match expectations.

### Pitfall 6: Large Bundle from Question Content
**What goes wrong:** 360+ questions with explanations could be 200KB+ of JSON/TS. Loading all at once slows initial page load.
**Why it happens:** All question files imported eagerly.
**How to avoid:** Use dynamic `import()` per section. Only load the section's questions when the user selects that section. Vite handles code splitting automatically with dynamic imports.
**Warning signs:** Large initial bundle size, slow first load.

## Code Examples

### Question Selection and Shuffling
```typescript
// src/data/questions/index.ts
import type { Question, SectionId } from '../../types/question';

// Lazy loaders for code splitting
const loaders: Record<SectionId, () => Promise<{ default: Question[] }>> = {
  MST: () => import('./mst').then(m => ({ default: m.mstQuestions })),
  RCT: () => import('./rct').then(m => ({ default: m.rctQuestions })),
  MCT: () => import('./mct').then(m => ({ default: m.mctQuestions })),
  ANIT: () => import('./anit').then(m => ({ default: m.anitQuestions })),
  SAT: () => import('./sat').then(m => ({ default: m.satQuestions })),
};

export async function getQuestions(section: SectionId, count = 10): Promise<Question[]> {
  const { default: questions } = await loaders[section]();
  return shuffle(questions).slice(0, count);
}

function shuffle<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}
```

### Lesson Data Type
```typescript
// src/types/lesson.ts
import type { SectionId } from './question';

export interface ConceptCard {
  id: string;
  heading: string;
  content: string;        // short explanation text
  svgComponent?: string;  // name of SVG component to render
  keyTakeaway?: string;   // one-line summary
}

export interface SectionLesson {
  sectionId: SectionId;
  title: string;
  topics: Array<{
    name: string;
    cards: ConceptCard[];
  }>;
}
```

### Route Structure for Quiz Flow
```typescript
// Updated router with quiz routes
const router = createHashRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { index: true, element: <DashboardPage /> },
      { path: 'practice', element: <PracticePage /> },
      { path: 'practice/:sectionId', element: <QuizPage /> },
      { path: 'practice/:sectionId/lesson', element: <LessonPage /> },
      { path: 'timed-test', element: <TimedTestPage /> },
      { path: 'timed-test/:sectionId', element: <QuizPage /> },
      { path: 'full-test', element: <FullTestPage /> },
      { path: 'progress', element: <ProgressPage /> },
      { path: 'settings', element: <SettingsPage /> },
    ],
  },
]);
```

### SAT Aircraft Silhouette (SVG Answer Option)
```typescript
// Simplified aircraft silhouette showing pitch/bank/heading
interface SilhouetteProps {
  pitch: number;
  bank: number;
  heading: number;
  selected?: boolean;
  correct?: boolean;
  onClick?: () => void;
}

function AircraftSilhouette({ pitch, bank, heading, selected, correct, onClick }: SilhouetteProps) {
  // Map heading to a viewing angle (top-down perspective)
  const headingRad = (heading * Math.PI) / 180;
  // Map pitch to vertical offset
  const pitchOffset = (pitch / 45) * 10; // scale

  return (
    <button
      onClick={onClick}
      className={`rounded-lg border-2 p-2 transition-colors ${
        correct === true ? 'border-success bg-success/20' :
        correct === false ? 'border-danger bg-danger/20' :
        selected ? 'border-gold-400 bg-gold-400/20' :
        'border-navy-600 hover:border-navy-400'
      }`}
    >
      <svg viewBox="0 0 60 60" className="h-16 w-16">
        <g transform={`translate(30,30) rotate(${bank})`}>
          {/* Aircraft body */}
          <line x1="0" y1={-15 + pitchOffset} x2="0" y2={15 + pitchOffset}
                stroke="white" strokeWidth="2" />
          {/* Wings */}
          <line x1="-20" y1={pitchOffset} x2="20" y2={pitchOffset}
                stroke="white" strokeWidth="2" />
          {/* Tail */}
          <line x1="-8" y1={12 + pitchOffset} x2="8" y2={12 + pitchOffset}
                stroke="white" strokeWidth="1.5" />
          {/* Heading indicator (arrow at nose) */}
          <g transform={`translate(0, ${-15 + pitchOffset}) rotate(${heading - 360})`}>
            <polygon points="0,-5 -3,0 3,0" fill="white" />
          </g>
        </g>
      </svg>
    </button>
  );
}
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Class components for complex state | useReducer hook | React 16.8+ (2019) | Cleaner state machines without class boilerplate |
| External timer libraries | Custom hooks with setInterval | React hooks era | No dependency needed for basic timers |
| Canvas via imperative refs only | Canvas + useEffect cleanup | React 18+ | Proper cleanup prevents memory leaks |
| Static image-based spatial questions | Parameterized Canvas/SVG | Current decision | Infinite question variety from parameters, smaller bundle |

## Design Decisions (Claude's Discretion)

### Question Randomization Strategy
**Recommendation:** Fisher-Yates shuffle on the full question bank for the section, then take the first N. Track answered question IDs in the progress store to optionally filter out recently-answered questions (prevents seeing the same question twice in a short period). For timed tests, use a fixed seed or just fresh shuffle each time.

### End-of-Session Summary Screen
**Recommendation:** Show score (X/Y correct, percentage), time spent, section name, and a simple bar chart or stat row. Include a "Review Mistakes" option that scrolls through only the questions answered incorrectly with their explanations. Two action buttons: "Practice Again" (same section) and "Back to Sections" (return to practice menu).

### Lesson Card Transitions
**Recommendation:** Simple horizontal slide or fade transition using CSS transitions. No animation library needed. Cards slide left-to-right as user advances. Use `transform: translateX()` with `transition: transform 300ms ease`.

### Timed Test Time Limits
Based on research above, use:
- MST: 40 minutes (30 questions)
- RCT: 30 minutes (20 questions)
- MCT: 15 minutes (30 questions)
- ANIT: 15 minutes (30 questions)
- SAT: 10 minutes (25 questions)

### Full Practice Test Flow
**Recommendation:** Show a "mission briefing" screen listing all 5 sections with their question counts and time limits. User clicks "Begin Test." After completing each section, show a brief "Section Complete" interstitial with score for that section and "Continue to Next Section" button. After all sections, show a comprehensive summary with per-section scores and combined OAR-equivalent score. No ability to go back to previous sections (matches real ASTB behavior).

## Open Questions

1. **Per-option explanation coverage**
   - What we know: CONT-07 requires explaining why each wrong answer is wrong. The `optionExplanations` field handles this.
   - What's unclear: Should every single question have per-option explanations, or is a general explanation sufficient for some?
   - Recommendation: Make `optionExplanations` optional. Prioritize per-option explanations for tricky questions where wrong answers are plausible. General explanations suffice for straightforward questions.

2. **SAT coastline rendering complexity**
   - What we know: The `SpatialScenarioParams.coastline` field is currently a string. Need to define what values it takes and how to render them.
   - What's unclear: How many coastline variations are needed? Is it just left/right/ahead/none?
   - Recommendation: Use an enum-like set: `'none' | 'left' | 'right' | 'ahead-left' | 'ahead-right'`. Render as a simple curved line at the horizon edge. Keep it simple -- readability over realism (per user decision).

3. **Content volume per plan**
   - What we know: Need 360+ questions across 5 sections plus lesson content.
   - What's unclear: How to split content authoring across plans without making any single plan too large.
   - Recommendation: Build the engine first (plan 1-2), then author content per section (plans 3-7), with SAT rendering as a dedicated spike plan.

## Sources

### Primary (HIGH confidence)
- Existing codebase analysis -- question types, progress store, routing, theme tokens
- React documentation -- useReducer, useEffect, Canvas refs (training data, verified against current React 19 patterns)
- Canvas 2D API -- MDN Web Docs (stable, well-documented API)

### Secondary (MEDIUM confidence)
- ASTB timing data -- aggregated from multiple prep sites:
  - [Mometrix ASTB-E](https://www.mometrix.com/academy/astb-e/)
  - [Practice Test Geeks ASTB-E](https://practicetestgeeks.com/astb-e-test/)
  - [Military Flight Prep ASTB](https://militaryflightprep.com/astb-test/)
  - [Navy Enlisted ASTB-E Guide](https://navyenlisted.com/guides/test-prep/astb-e/)
  - [Navy ASTB FAQ](https://www.med.navy.mil/Navy-Medicine-Operational-Training-Command/Naval-Aerospace-Medical-Institute/ASTB-FAQ/)
- SAT format (5 answer options, cockpit-to-external view matching) -- multiple prep sources agree

### Tertiary (LOW confidence)
- Exact question counts per section vary due to CAT (computer-adaptive) format -- numbers used are representative, not authoritative

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH -- no new libraries needed, all patterns use existing React/TS features
- Architecture: HIGH -- quiz state machine pattern is well-established, data model extends existing types
- SAT rendering: MEDIUM -- Canvas 2D approach is sound but the specific cockpit/silhouette rendering needs prototype validation
- ASTB timing: MEDIUM -- sourced from multiple prep sites but not official military documentation
- Content volume estimates: HIGH -- question counts from REQUIREMENTS.md are explicit targets

**Research date:** 2026-03-08
**Valid until:** 2026-04-08 (stable domain, no fast-moving dependencies)
