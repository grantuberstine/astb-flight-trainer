---
phase: 04-adaptive-learning-and-study-intelligence
plan: 01
subsystem: adaptive-learning
tags: [sm2, spaced-repetition, zustand, indexeddb, adaptive, study-plan]

requires:
  - phase: 01-foundation
    provides: Zustand stores with IndexedDB persist, question types, progress types
  - phase: 02-content-and-quiz
    provides: Question banks, question loader, SectionId type
provides:
  - SM-2 spaced repetition pure functions (createCard, reviewCard, getDueCards)
  - Section weight computation (inverse accuracy weighting)
  - Diagnostic scoring engine (per-section accuracy, weak tags)
  - Study plan generator (weekly blocks, front-loaded weak sections)
  - Adaptive Zustand store with IndexedDB persistence
  - Adaptive question loader (getAdaptiveQuestions)
affects: [04-02, adaptive-ui, study-plan-page, diagnostic-page]

tech-stack:
  added: []
  patterns: [sm2-algorithm, inverse-accuracy-weighting, pure-function-algorithms, tdd-with-vitest]

key-files:
  created:
    - src/types/adaptive.ts
    - src/lib/spaced-repetition.ts
    - src/lib/adaptive.ts
    - src/lib/diagnostic.ts
    - src/lib/study-plan.ts
    - src/stores/adaptive-store.ts
    - src/lib/__tests__/spaced-repetition.test.ts
    - src/lib/__tests__/adaptive.test.ts
    - src/lib/__tests__/diagnostic.test.ts
    - src/lib/__tests__/study-plan.test.ts
  modified:
    - src/data/questions/index.ts

key-decisions:
  - "SM-2 ease factor min 1.3 with 0.2 decrement on failure per standard algorithm"
  - "MAX_ACTIVE_CARDS=30 cap with longest-interval eviction to prevent SR queue explosion"
  - "scoreDiagnostic takes tagLookup parameter to keep function pure (no async)"
  - "Study plan caps at 12 weeks with 15 questions/day final-week review mode"

patterns-established:
  - "Pure algorithm functions in src/lib/ with no React/store dependencies"
  - "TDD with vitest for algorithm correctness"
  - "tagLookup injection for pure diagnostic scoring"

requirements-completed: [PRAC-03, PRAC-04, PRAC-05, PRAC-06]

duration: 3min
completed: 2026-03-09
---

# Phase 04 Plan 01: Adaptive Learning Data Layer Summary

**SM-2 spaced repetition, section weighting, diagnostic scoring, and study plan generation with Zustand/IndexedDB persistence**

## Performance

- **Duration:** 3 min
- **Started:** 2026-03-09T03:04:06Z
- **Completed:** 2026-03-09T03:07:34Z
- **Tasks:** 2
- **Files modified:** 11

## Accomplishments
- SM-2 algorithm with correct interval math (createCard, reviewCard, getDueCards)
- Inverse accuracy section weighting and weighted random selection
- Diagnostic scoring with per-section accuracy, avgTimeMs, and weak tag extraction
- Weekly study plan generation with front-loaded weak sections and 12-week cap
- Adaptive Zustand store with full SR card management and IndexedDB persist
- getAdaptiveQuestions function prioritizing due review cards

## Task Commits

Each task was committed atomically:

1. **Task 1 (RED): Failing tests** - `13ca5e9` (test)
2. **Task 1 (GREEN): Types and algorithm functions** - `feff97a` (feat)
3. **Task 2: Adaptive store and question loader** - `b8e09be` (feat)

_Note: Task 1 was TDD with RED/GREEN commits._

## Files Created/Modified
- `src/types/adaptive.ts` - SRCard, WeightedSection, DiagnosticResult, StudyWeek types
- `src/lib/spaced-repetition.ts` - SM-2 pure functions (createCard, reviewCard, getDueCards)
- `src/lib/adaptive.ts` - Section weight computation and weighted selection
- `src/lib/diagnostic.ts` - Diagnostic scoring from answer records
- `src/lib/study-plan.ts` - Weekly study plan generation
- `src/stores/adaptive-store.ts` - Zustand store for SR cards, diagnostics, study plan
- `src/data/questions/index.ts` - Added getAdaptiveQuestions function
- `src/lib/__tests__/*.test.ts` - 22 tests covering all algorithm functions

## Decisions Made
- SM-2 ease factor minimum 1.3 with 0.2 decrement on failure per standard algorithm
- MAX_ACTIVE_CARDS=30 cap with longest-interval eviction to prevent SR queue explosion
- scoreDiagnostic takes tagLookup parameter to keep function pure (no async question loading)
- Study plan caps at 12 weeks with 15 questions/day final-week review mode
- Adaptive store uses same Zustand + IndexedDB persist pattern as existing stores

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

None.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness
- All adaptive learning computation and persistence ready for UI consumption
- Plan 02 can build diagnostic page, study plan page, and adaptive quiz mode on top of these functions
- 22 passing tests provide confidence in algorithm correctness

---
*Phase: 04-adaptive-learning-and-study-intelligence*
*Completed: 2026-03-09*
