---
phase: 02-quiz-engine-and-content
plan: 01
subsystem: ui
tags: [react, zustand, quiz-engine, state-machine, timer, lazy-loading]

requires:
  - phase: 01-app-shell-and-data-layer
    provides: "App shell, routing, progress store, question/gamification types"
provides:
  - "useQuizSession reducer-based quiz state machine"
  - "useCountdown pausable timer hook with absolute endTime"
  - "Quiz UI components (ProgressDots, QuestionCard, ExplanationPanel, etc.)"
  - "QuizSession orchestrator component"
  - "LessonViewer sequential card viewer"
  - "Question/lesson data layer with lazy loading stubs for all 5 sections"
  - "7 new routes: practice/:sectionId, lessons, timed-test, full-test"
affects: [02-02, 02-03, 02-04, 03-gamification]

tech-stack:
  added: []
  patterns: [useReducer state machine, lazy dynamic imports, Fisher-Yates shuffle, absolute-endTime countdown]

key-files:
  created:
    - src/hooks/useQuizSession.ts
    - src/hooks/useCountdown.ts
    - src/components/quiz/QuizSession.tsx
    - src/components/quiz/ExplanationPanel.tsx
    - src/components/quiz/MultipleChoiceCard.tsx
    - src/components/quiz/PassageCard.tsx
    - src/components/quiz/ProgressDots.tsx
    - src/components/quiz/TimerBar.tsx
    - src/components/quiz/SessionSummary.tsx
    - src/components/quiz/QuitDialog.tsx
    - src/components/quiz/QuestionCard.tsx
    - src/components/lessons/ConceptCard.tsx
    - src/components/lessons/LessonViewer.tsx
    - src/types/lesson.ts
    - src/data/questions/index.ts
    - src/data/lessons/index.ts
    - src/pages/QuizPage.tsx
    - src/pages/LessonPage.tsx
    - src/pages/TimedTestPage.tsx
    - src/pages/FullTestPage.tsx
  modified:
    - src/types/question.ts
    - src/lib/constants.ts
    - src/pages/PracticePage.tsx
    - src/App.tsx

key-decisions:
  - "useReducer state machine for quiz lifecycle (idle/loading/answering/showing-explanation/complete)"
  - "Absolute endTime approach for countdown to avoid tab-backgrounding drift"
  - "Passage questions tracked at sub-question level in reducer state"
  - "Spatial questions get placeholder renderer until Plan 04"

patterns-established:
  - "Quiz state machine pattern: useReducer with typed action union"
  - "Data lazy loading pattern: dynamic import() with section-keyed loader map"
  - "Full test flow: briefing -> section testing -> interstitial -> comprehensive summary"

requirements-completed: [CONT-07, PRAC-01, PRAC-02, PRAC-07, CONT-06]

duration: 6min
completed: 2026-03-08
---

# Phase 02 Plan 01: Quiz Engine and Content Summary

**useReducer-based quiz state machine with pausable countdown timer, 11 quiz/lesson UI components, and 7 new routes for practice/timed/full-test flows**

## Performance

- **Duration:** 6 min
- **Started:** 2026-03-08T22:50:32Z
- **Completed:** 2026-03-08T22:56:49Z
- **Tasks:** 3
- **Files modified:** 28

## Accomplishments
- Built complete quiz engine with useReducer state machine handling full lifecycle (idle -> loading -> answering -> showing-explanation -> complete)
- Created 11 quiz/lesson UI components including QuizSession orchestrator, ExplanationPanel with per-option breakdown, and pausable TimerBar
- Scaffolded question and lesson data layers with lazy loading stubs for all 5 ASTB sections
- Wired 7 new routes enabling practice, timed test, lesson viewing, and full practice test flows
- Full practice test page with mission briefing, section interstitials, and comprehensive summary

## Task Commits

Each task was committed atomically:

1. **Task 1: Type extensions, hooks, and data layer scaffolding** - `50dd098` (feat)
2. **Task 2: Quiz UI components and lesson components** - `09f61d4` (feat)
3. **Task 3: Pages, routes, and practice flow wiring** - `8334edd` (feat)

## Files Created/Modified
- `src/types/question.ts` - Added optionExplanations, spatial answerOptions, coastline type refinement
- `src/types/lesson.ts` - ConceptCard and SectionLesson interfaces
- `src/hooks/useQuizSession.ts` - useReducer quiz state machine with passage sub-question support
- `src/hooks/useCountdown.ts` - Pausable countdown with absolute endTime approach
- `src/data/questions/index.ts` - Lazy question loader with Fisher-Yates shuffle
- `src/data/questions/{mst,rct,mct,anit,sat}.ts` - Empty stub arrays for each section
- `src/data/lessons/index.ts` - Lazy lesson loader
- `src/data/lessons/{mst,rct,mct,anit,sat}-lessons.ts` - Empty stub lessons for each section
- `src/lib/constants.ts` - Added TIMED_TEST_CONFIG with real ASTB time/question counts
- `src/components/quiz/QuizSession.tsx` - Main orchestrator integrating all quiz components
- `src/components/quiz/ExplanationPanel.tsx` - Per-option explanation breakdown
- `src/components/quiz/MultipleChoiceCard.tsx` - 4-option answer card with result highlighting
- `src/components/quiz/PassageCard.tsx` - Passage + sub-question display
- `src/components/quiz/ProgressDots.tsx` - Green/red/empty progress indicators
- `src/components/quiz/TimerBar.tsx` - Color-coded countdown with pause badge
- `src/components/quiz/SessionSummary.tsx` - Score, time, and action buttons
- `src/components/quiz/QuitDialog.tsx` - Modal confirmation dialog
- `src/components/quiz/QuestionCard.tsx` - Type-delegating question renderer
- `src/components/lessons/ConceptCard.tsx` - Single concept card with SVG placeholder
- `src/components/lessons/LessonViewer.tsx` - Sequential card navigation
- `src/pages/PracticePage.tsx` - Updated with Study/Practice buttons and test navigation
- `src/pages/QuizPage.tsx` - Section-validated quiz page with mode detection
- `src/pages/LessonPage.tsx` - Async lesson loading page
- `src/pages/TimedTestPage.tsx` - Timed test section selection
- `src/pages/FullTestPage.tsx` - Multi-section full test with briefing and interstitials
- `src/App.tsx` - 7 new routes added to hash router

## Decisions Made
- Used useReducer state machine for quiz lifecycle instead of multiple useState calls for cleaner state transitions
- Absolute endTime approach for countdown timer to avoid drift when browser tab is backgrounded
- Passage questions tracked at sub-question level within the reducer, with per-sub-question answer recording
- Spatial questions get a placeholder renderer -- actual SpatialCard renderer deferred to Plan 04

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Fixed TypeScript narrowing errors for PassageQuestion.correctAnswer**
- **Found during:** Task 3 (build verification)
- **Issue:** TypeScript could not narrow `question.correctAnswer` for PassageQuestion type since PassageQuestion uses sub-questions, not a top-level correctAnswer
- **Fix:** Added explicit type narrowing with `question.type !== 'passage'` checks in ExplanationPanel and QuizSession
- **Files modified:** src/components/quiz/ExplanationPanel.tsx, src/components/quiz/QuizSession.tsx
- **Verification:** `npm run build` passes clean
- **Committed in:** 8334edd (Task 3 commit)

**2. [Rule 1 - Bug] Fixed unused variable warning in useCountdown**
- **Found during:** Task 3 (build verification)
- **Issue:** `prev` parameter in setRemaining callback was declared but never read (strict tsconfig)
- **Fix:** Replaced functional update with direct computation from endTimeRef
- **Files modified:** src/hooks/useCountdown.ts
- **Committed in:** 8334edd (Task 3 commit)

---

**Total deviations:** 2 auto-fixed (2 bugs)
**Impact on plan:** Both fixes necessary for TypeScript strict mode compliance. No scope creep.

## Issues Encountered
None beyond the TypeScript narrowing fixes documented above.

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- Quiz engine complete and ready for content population (Plans 02-04)
- Question stubs for all 5 sections ready to receive actual questions
- Lesson stubs for all 5 sections ready to receive study content
- Spatial placeholder in QuestionCard ready for Plan 04 renderer

---
*Phase: 02-quiz-engine-and-content*
*Completed: 2026-03-08*
