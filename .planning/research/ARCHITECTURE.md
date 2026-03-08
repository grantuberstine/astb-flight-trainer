# Architecture Research

**Domain:** Gamified single-user test prep SPA (ASTB Flight Trainer)
**Researched:** 2026-03-08
**Confidence:** HIGH

## System Overview

```
+---------------------------------------------------------------+
|                      Presentation Layer                        |
|  +----------+ +----------+ +---------+ +----------+ +-------+ |
|  | Dashboard| | Question | | Spatial | | Lessons  | | Study | |
|  | (Cockpit)| | Engine   | | Viewer  | | Content  | | Plan  | |
|  +----+-----+ +----+-----+ +----+----+ +----+-----+ +---+---+ |
|       |            |            |            |           |      |
+-------+------------+------------+------------+-----------+------+
|                      Application Layer                         |
|  +-------------+ +-------------+ +-------------+              |
|  | Gamification| | Adaptive    | | Session     |              |
|  | Engine      | | Algorithm   | | Manager     |              |
|  | (XP/Ranks/  | | (Question   | | (Timer/     |              |
|  |  Badges/    | |  Selection/ | |  Mode/      |              |
|  |  Streaks)   | |  Difficulty)| |  Flow)      |              |
|  +------+------+ +------+------+ +------+------+              |
|         |               |               |                      |
+---------+---------------+---------------+----------------------+
|                       Data Layer                               |
|  +------------------+ +------------------+ +-----------------+ |
|  | Question Bank    | | User Progress    | | Gamification    | |
|  | (Static JSON)    | | Store (Zustand   | | Store (Zustand  | |
|  |                  | |  + localStorage) | |  + localStorage)| |
|  +------------------+ +------------------+ +-----------------+ |
+---------------------------------------------------------------+
```

### Component Responsibilities

| Component | Responsibility | Typical Implementation |
|-----------|----------------|------------------------|
| Dashboard (Cockpit) | Top-level hub showing rank, XP, streaks, section scores, study plan progress | React component with aviation-themed UI, reads from all stores |
| Question Engine | Renders questions, handles answer selection, shows explanations, manages timer | Stateful React component with question type renderers |
| Spatial Viewer | Renders SAT-specific cockpit views and aircraft orientation diagrams | Canvas/SVG-based renderer with parameterized pitch/bank/heading |
| Lessons Content | Displays instructional material for each ASTB section | Markdown or structured JSON rendered as pages |
| Study Plan | Maps out weekly schedule based on test date and diagnostic results | Calendar-like component reading from progress store |
| Gamification Engine | Calculates XP awards, checks badge conditions, tracks streaks, manages rank progression | Pure logic module that reacts to events from question engine |
| Adaptive Algorithm | Selects next question based on performance history, prioritizes weak areas | Modified Leitner system or SM-2 variant operating on per-question stats |
| Session Manager | Controls quiz flow: timed vs. practice, section selection, question count | State machine managing current session configuration |
| Question Bank | Static content: questions, answers, explanations, metadata per section | JSON files imported at build time, organized by ASTB section |
| User Progress Store | Persists scores, question history, section performance, study plan state | Zustand store with localStorage persistence middleware |
| Gamification Store | Persists XP total, current rank, earned badges, streak data, timestamps | Zustand store with localStorage persistence middleware |

## Recommended Project Structure

```
src/
├── components/              # Reusable UI components
│   ├── ui/                  # Generic: buttons, cards, progress bars, modals
│   ├── cockpit/             # Aviation-themed dashboard widgets
│   │   ├── RankBadge.tsx
│   │   ├── XPBar.tsx
│   │   ├── StreakCounter.tsx
│   │   └── SectionRadar.tsx
│   └── layout/              # Page layout, navigation, sidebar
├── features/                # Feature modules (co-located logic + UI)
│   ├── quiz/                # Question engine
│   │   ├── QuizSession.tsx      # Session orchestrator
│   │   ├── QuestionCard.tsx     # Renders a single question
│   │   ├── AnswerFeedback.tsx   # Right/wrong + explanation
│   │   ├── Timer.tsx            # Countdown timer
│   │   └── renderers/           # Section-specific question renderers
│   │       ├── MultipleChoice.tsx
│   │       ├── SpatialQuestion.tsx
│   │       └── PassageQuestion.tsx
│   ├── spatial/             # SAT spatial apperception rendering
│   │   ├── CockpitView.tsx      # Horizon + coastline from cockpit
│   │   ├── AircraftDiagram.tsx  # External view of aircraft orientation
│   │   ├── spatial-utils.ts     # Pitch/bank/heading math
│   │   └── assets/              # SVG aircraft silhouettes
│   ├── gamification/        # XP, ranks, badges, streaks
│   │   ├── xp-calculator.ts
│   │   ├── rank-system.ts
│   │   ├── badge-definitions.ts
│   │   ├── streak-tracker.ts
│   │   └── AchievementToast.tsx
│   ├── adaptive/            # Adaptive question selection
│   │   ├── question-selector.ts
│   │   ├── difficulty-tracker.ts
│   │   └── diagnostic.ts
│   ├── lessons/             # Instructional content viewer
│   │   ├── LessonViewer.tsx
│   │   └── LessonNav.tsx
│   ├── study-plan/          # Study scheduling
│   │   ├── PlanGenerator.ts
│   │   ├── WeeklyView.tsx
│   │   └── PacingEngine.ts
│   └── diagnostic/          # Initial assessment
│       ├── DiagnosticFlow.tsx
│       └── ScoreAnalyzer.ts
├── stores/                  # Zustand stores
│   ├── progress-store.ts        # Question history, section scores
│   ├── gamification-store.ts    # XP, rank, badges, streaks
│   ├── session-store.ts         # Current quiz session state
│   └── settings-store.ts        # Test date, preferences
├── data/                    # Static content
│   ├── questions/               # Question banks by section
│   │   ├── math.json
│   │   ├── reading.json
│   │   ├── mechanical.json
│   │   ├── aviation-nautical.json
│   │   ├── spatial.json         # Parameterized SAT scenarios
│   │   └── pbm.json
│   ├── lessons/                 # Lesson content by section
│   ├── badges.json              # Badge definitions
│   └── ranks.json               # Rank progression thresholds
├── lib/                     # Shared utilities
│   ├── storage.ts               # localStorage helpers, migration
│   ├── timer.ts                 # Timer utilities
│   └── constants.ts             # App-wide constants
├── pages/                   # Route-level page components
│   ├── DashboardPage.tsx
│   ├── QuizPage.tsx
│   ├── LessonsPage.tsx
│   ├── StudyPlanPage.tsx
│   ├── DiagnosticPage.tsx
│   └── AchievementsPage.tsx
├── App.tsx                  # Root component with router
└── main.tsx                 # Entry point
```

### Structure Rationale

- **features/:** Co-locates related logic, components, and utilities. Each feature is self-contained with clear boundaries. This prevents scattered files and makes it obvious where new code belongs.
- **stores/:** Centralized Zustand stores separate from features because multiple features read from the same stores (e.g., gamification store is read by dashboard AND quiz engine).
- **data/:** Static JSON content is separate from application logic. Question banks are large and should be clearly isolated. This also enables future migration to a CMS or API without touching app code.
- **components/ui/:** Generic reusable components that have no domain knowledge. Aviation-themed but not feature-specific.
- **pages/:** Thin route-level components that compose features. Keeps routing concerns separate from feature logic.

## Architectural Patterns

### Pattern 1: Event-Driven Gamification

**What:** Question engine emits events (question answered, session completed, streak day logged). Gamification engine listens and calculates rewards. This decouples quiz logic from game mechanics.

**When to use:** Always. The gamification layer should never be embedded in quiz logic.

**Trade-offs:** Slight indirection, but prevents the quiz engine from becoming a monolith that knows about XP, badges, and ranks.

**Example:**
```typescript
// In quiz session, after answer submitted:
const result = evaluateAnswer(question, selectedAnswer);
gamificationStore.getState().processEvent({
  type: 'QUESTION_ANSWERED',
  correct: result.correct,
  section: question.section,
  difficulty: question.difficulty,
  timeSpent: elapsedMs,
});

// In gamification store:
processEvent: (event) => {
  if (event.type === 'QUESTION_ANSWERED' && event.correct) {
    const xpGain = calculateXP(event.difficulty, get().streakMultiplier);
    set((state) => ({
      xp: state.xp + xpGain,
      rank: calculateRank(state.xp + xpGain),
    }));
    checkBadgeConditions(event, get());
  }
}
```

### Pattern 2: Parameterized Spatial Rendering

**What:** Instead of storing static images for every SAT question, store parameters (pitch, bank, heading, coastline type) and render dynamically using Canvas or SVG. This enables generating unlimited question variations from a small parameter space.

**When to use:** For the Spatial Apperception Test section specifically.

**Trade-offs:** More complex upfront implementation than static images, but massively reduces content creation burden and enables procedural question generation.

**Example:**
```typescript
// Spatial question data (compact, generative)
interface SpatialScenario {
  id: string;
  cockpitView: {
    horizonTilt: number;     // degrees, + = right bank
    horizonOffset: number;   // % from center, + = climbing
    coastlineAngle: number;  // heading relative to coast
    coastlineType: 'left' | 'right' | 'ahead' | 'behind' | 'none';
    seaPosition: 'left' | 'right' | 'below' | 'above';
  };
  correctAnswer: {
    pitch: 'climbing' | 'level' | 'diving';
    bank: 'left' | 'none' | 'right';
    heading: 'toward-coast' | 'away' | 'parallel-left' | 'parallel-right';
  };
  distractors: Array<{ pitch; bank; heading }>;
}
```

### Pattern 3: Modified Leitner System for Adaptive Selection

**What:** Each question exists in one of 5 "boxes." Correct answers promote the question to a higher box (reviewed less frequently). Incorrect answers demote it to box 1 (reviewed soon). Section-level weighting overlays this so weak sections appear more often.

**When to use:** For the adaptive study mode and study plan recommendations.

**Trade-offs:** Simpler than SM-2/FSRS algorithms but effective for test prep with a fixed deadline. The 2-3 month timeline does not need sophisticated long-term retention modeling -- it needs targeted weakness remediation.

**Example:**
```typescript
interface QuestionState {
  questionId: string;
  box: 1 | 2 | 3 | 4 | 5;   // Leitner box
  lastSeen: number;            // timestamp
  timesCorrect: number;
  timesIncorrect: number;
}

function selectNextQuestion(
  questionStates: QuestionState[],
  sectionWeights: Record<Section, number>,  // from diagnostic
): string {
  // Weight by: low box number + section weakness + time since last seen
  const scored = questionStates.map(q => ({
    id: q.questionId,
    score: (6 - q.box) * 10
      + sectionWeights[getSection(q.questionId)] * 5
      + daysSince(q.lastSeen) * 2,
  }));
  // Pick from top candidates with some randomness
  return weightedRandomPick(scored.sort((a, b) => b.score - a.score).slice(0, 10));
}
```

### Pattern 4: Store Slicing with Zustand

**What:** Split state into focused stores rather than one monolithic store. Each store owns a specific domain. Use Zustand's `persist` middleware for localStorage with `partialize` to control what gets saved.

**When to use:** Always for this project. Three to four stores are the sweet spot.

**Trade-offs:** Multiple stores require cross-store reads in some components, but this is trivial with Zustand's hook-based API. Much better than a single store that becomes unwieldy.

**Example:**
```typescript
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useProgressStore = create(
  persist(
    (set, get) => ({
      questionHistory: [],
      sectionScores: {},
      recordAnswer: (questionId, correct, section) => {
        // update history + recalculate section score
      },
    }),
    {
      name: 'astb-progress',
      version: 1,  // enables migration on schema changes
      partialize: (state) => ({
        questionHistory: state.questionHistory,
        sectionScores: state.sectionScores,
      }),
    }
  )
);
```

## Data Flow

### Answer Submission Flow

```
[User selects answer]
    |
    v
[QuestionCard] --> [QuizSession.handleAnswer()]
    |
    v
[evaluateAnswer(question, answer)] --> { correct, explanation }
    |
    +---> [progressStore.recordAnswer()]
    |         |
    |         v
    |     [Update questionHistory, recalculate sectionScores]
    |         |
    |         v
    |     [localStorage persisted automatically via Zustand persist]
    |
    +---> [gamificationStore.processEvent()]
    |         |
    |         v
    |     [Calculate XP, check rank promotion, check badges, update streak]
    |         |
    |         v
    |     [localStorage persisted automatically]
    |
    +---> [AnswerFeedback renders: correct/wrong, explanation, +XP toast]
    |
    v
[adaptiveSelector.getNextQuestion(progressStore, sectionWeights)]
    |
    v
[Next question rendered]
```

### Session Lifecycle Flow

```
[User starts quiz]
    |
    v
[Select mode: Practice | Timed | Diagnostic | Mission]
    |
    v
[sessionStore: set section, questionCount, timeLimit]
    |
    v
[adaptiveSelector picks first question]
    |
    v
[Quiz loop: answer -> feedback -> next question]
    |
    v
[Session complete]
    |
    +---> [Session summary screen: score, XP earned, badges unlocked]
    +---> [gamificationStore: process SESSION_COMPLETE event]
    +---> [progressStore: update cumulative stats]
    +---> [Return to dashboard]
```

### Diagnostic Assessment Flow

```
[First-time user or manual trigger]
    |
    v
[Sample 5-8 questions per ASTB section (30-48 total)]
    |
    v
[Score each section independently]
    |
    v
[Generate section weights: weak sections get higher weight]
    |
    v
[Store weights in progressStore]
    |
    v
[Study plan generator uses weights + test date to build weekly plan]
    |
    v
[Adaptive selector uses weights for ongoing question selection]
```

### State Management

```
+-------------------+     +---------------------+     +-----------------+
| progressStore     |     | gamificationStore    |     | sessionStore    |
| - questionHistory |     | - xp                |     | - currentMode   |
| - sectionScores   |     | - rank              |     | - currentQ      |
| - sectionWeights  |     | - badges[]          |     | - timeRemaining |
| - diagnosticDone  |     | - streak            |     | - answers[]     |
|                   |     | - lastActiveDate    |     |                 |
| [persisted]       |     | [persisted]         |     | [ephemeral]     |
+-------------------+     +---------------------+     +-----------------+
        |                         |                          |
        +-------------------------+--------------------------+
                                  |
                          [React components
                           subscribe via hooks]
```

Key distinction: `progressStore` and `gamificationStore` are persisted to localStorage. `sessionStore` is ephemeral -- it resets when the user leaves a quiz. This prevents stale session state from corrupting the experience.

### Key Data Flows

1. **Question delivery:** Static JSON (build-time) -> adaptive selector (filters by section weight + Leitner box) -> question renderer (picks correct renderer by section type) -> user
2. **Progress recording:** User answer -> evaluate -> progress store (persisted) + gamification store (persisted) -> dashboard updates on next render
3. **Streak tracking:** On app load, gamification store checks `lastActiveDate` against today. If consecutive, increment streak. If gap > 1 day, reset to 0. Streak multiplier affects XP calculation.
4. **Study plan:** Test date (settings store) + section weights (progress store) -> pacing engine calculates sessions per week per section -> renders as weekly calendar with checkboxes

## Spatial Apperception Rendering Strategy

This is the most architecturally unique component. Two viable approaches:

### Recommended: SVG + Canvas Hybrid

**Cockpit view (what the test-taker sees):**
- Canvas element rendering: horizon line (tilted for bank), gradient sky/ground, coastline contour, optional sea texture
- Parameters: `horizonTilt`, `horizonVerticalOffset`, `coastlineAngle`, `coastlineType`
- Relatively simple -- it is a stylized view, not photorealistic

**Aircraft answer options (external view):**
- SVG aircraft silhouettes with CSS transforms for pitch and bank rotation
- 5 answer choices showing different orientations
- Parameters: `pitchAngle`, `bankAngle`, `headingArrow`

**Why not Three.js:** Overkill. The SAT does not require 3D models -- it uses flat illustrations. SVG transforms with a simple Canvas horizon scene are sufficient and avoid a heavy dependency. The actual ASTB uses simple line drawings, not rendered 3D models.

**Why not static images:** The parameter space (pitch x bank x heading x coastline) creates hundreds of combinations. Generating images for each is impractical. Parameterized rendering enables procedural question generation.

### Rendering Parameters

```
Pitch:  climbing | level | diving        (3 states)
Bank:   left | none | right               (3 states)
Heading: 8 compass-relative directions     (8 states)
Coast:  left | right | ahead | none        (4 states)
Sea:    varies with coast position

Total unique scenarios: 3 x 3 x 8 x 4 = 288 combinations
(Not all valid, but enough for extensive question generation)
```

## Scaling Considerations

This is a single-user client-side app, so traditional scaling is irrelevant. The relevant "scaling" concerns are:

| Concern | Approach |
|---------|----------|
| Question bank size | JSON files loaded at build time. Even 2000 questions is < 1MB. No lazy loading needed. |
| localStorage limits | ~5-10MB across browsers. Progress data for one user will be < 500KB. Not a concern. |
| Session state growth | Trim `questionHistory` to last 1000 entries if needed. Aggregate older data into section scores. |
| Content updates | Static JSON means new questions require a rebuild/redeploy. Acceptable for a personal project. |
| Data loss risk | localStorage can be cleared by user. Add an export/import JSON feature for backup. Critical but simple. |

### First Thing That Breaks

**Data loss from clearing browser data.** This is the single biggest operational risk for a localStorage-based app. Mitigation: add a "Download Progress" button that exports a JSON backup, and an "Import Progress" button to restore it. Build this early, not as an afterthought.

## Anti-Patterns

### Anti-Pattern 1: Monolithic Quiz Component

**What people do:** Put question rendering, answer evaluation, timer logic, XP calculation, and adaptive selection all in one QuizPage component.
**Why it is wrong:** Becomes unmaintainable quickly. Each ASTB section has different rendering needs. Game mechanics and quiz logic should not be coupled.
**Do this instead:** QuizSession orchestrates. QuestionCard renders. Section-specific renderers handle visual differences. Gamification engine is a separate module that reacts to events.

### Anti-Pattern 2: Storing All State in One Store

**What people do:** Create a single Zustand store with everything -- session state, progress, gamification, settings.
**Why it is wrong:** Persistence becomes messy (you do not want to persist ephemeral session state). Store becomes a god object. Updates to one domain trigger unnecessary re-renders in unrelated components.
**Do this instead:** Split into 3-4 focused stores. Persist only what needs persistence. Use `partialize` in persist middleware.

### Anti-Pattern 3: Static Images for Spatial Questions

**What people do:** Create and bundle individual image files for every spatial apperception scenario.
**Why it is wrong:** Content creation bottleneck. Hundreds of images needed. Hard to adjust, add variety, or fix errors. Bloats bundle size.
**Do this instead:** Parameterized rendering. Store scenario data as compact JSON objects. Render cockpit views and aircraft diagrams dynamically from parameters.

### Anti-Pattern 4: Overengineering the Adaptive Algorithm

**What people do:** Implement FSRS or SM-18 for question scheduling.
**Why it is wrong:** These algorithms optimize for long-term retention over months/years. This user has a 2-3 month test prep window. The problem is targeted weakness remediation, not lifetime memory scheduling.
**Do this instead:** Modified Leitner system with section weighting from diagnostic results. Simple, effective, and appropriate for the timeline.

### Anti-Pattern 5: Skipping Data Export

**What people do:** Trust localStorage to persist all user progress forever.
**Why it is wrong:** Browser data clearing, switching browsers, incognito mode, or device changes all destroy progress. For a 2-3 month study program, losing progress mid-way would be devastating.
**Do this instead:** Build export/import from the start. A simple "Download Backup" / "Restore Backup" with JSON files.

## Internal Boundaries

| Boundary | Communication | Notes |
|----------|---------------|-------|
| Quiz Engine <-> Gamification | Events via store actions | Quiz never imports gamification logic directly. Calls `processEvent()` on the gamification store. |
| Quiz Engine <-> Adaptive Selector | Function calls | Selector is a pure function: takes progress data, returns next question ID. No side effects. |
| Spatial Renderer <-> Question Engine | Props (parameters) | SpatialQuestion component receives scenario parameters as props. Completely reusable. |
| Progress Store <-> Gamification Store | Independent, read by same components | Dashboard reads both. They do not directly communicate with each other. |
| Session Store <-> Progress Store | Session completion triggers progress update | When a session ends, results are written to progress store. Session store then resets. |
| Data (JSON) <-> Application | Import at build time | Questions are static. No runtime fetching. Tree-shaking removes unused sections if needed. |

## Build Order (Dependency Chain)

The architecture reveals a clear dependency chain for implementation:

```
Phase 1: Foundation
  [Data Layer: Question JSON schema + sample questions]
  [Store Setup: Zustand stores with persistence]
  [Basic UI Shell: Router, layout, navigation]
      |
      v
Phase 2: Core Quiz Engine
  [Question rendering (multiple choice first)]
  [Answer evaluation + explanation display]
  [Timer component]
  [Progress recording to store]
      |
      v
Phase 3: Gamification Layer
  [XP calculation + award]
  [Rank system (Cadet -> Pilot)]
  [Streak tracking]
  [Badge/achievement system]
  [Aviation-themed dashboard]
      |
      v
Phase 4: Adaptive + Spatial
  [Diagnostic assessment]
  [Adaptive question selection (Leitner)]
  [Spatial apperception renderer (Canvas + SVG)]
  [Study plan / pacing engine]
      |
      v
Phase 5: Content + Polish
  [Full question banks for all 6 sections]
  [Lesson content for each section]
  [Data export/import]
  [PBM section (creative adaptation)]
```

**Ordering rationale:**
- Stores and data schema must exist before any feature can persist state
- Quiz engine is the core loop -- everything else depends on being able to answer questions
- Gamification wraps the quiz engine -- it cannot be built without question answering working
- Adaptive selection needs progress data to exist, so it comes after basic quiz flow
- Spatial rendering is complex and section-specific -- it can be deferred while other sections use standard multiple choice
- Content creation (writing hundreds of questions) is ongoing and parallel to development

## Sources

- [React State Management 2025: Context API vs Zustand](https://dev.to/cristiansifuentes/react-state-management-in-2025-context-api-vs-zustand-385m) - Zustand recommendation
- [Zustand persist middleware docs](https://zustand.docs.pmnd.rs/reference/middlewares/persist) - localStorage persistence API
- [Duolingo Gamification Case Study](https://trophy.so/blog/duolingo-gamification-case-study) - Gamification architecture patterns
- [When Your App Needs an XP System](https://trophy.so/blog/when-your-app-needs-xp-system) - XP system design patterns
- [Spaced Repetition Algorithms](https://neuracache.com/spaced) - Algorithm comparison for adaptive learning
- [The Aviator: Animating 3D Scene with Three.js](https://tympanus.net/codrops/2016/04/26/the-aviator-animating-basic-3d-scene-threejs/) - Aircraft rendering in browser (evaluated and rejected as overkill)
- [SVG Aircraft Instruments](https://commons.wikimedia.org/wiki/Category:SVG_aircraft_instruments) - SVG aircraft assets
- [Aircraft Principal Axes](https://en.wikipedia.org/wiki/Aircraft_principal_axes) - Pitch/bank/heading reference
- [ASTB Spatial Apperception - Air Warriors](https://www.airwarriors.com/community/threads/spatial-apperception.15950/) - SAT question format details
- [ASTB Overview - Marines](https://officer.marines.com/docs/oso/aviation/ASTB_Overview.pdf) - Official ASTB structure

---
*Architecture research for: ASTB Flight Trainer - Gamified Test Prep SPA*
*Researched: 2026-03-08*
