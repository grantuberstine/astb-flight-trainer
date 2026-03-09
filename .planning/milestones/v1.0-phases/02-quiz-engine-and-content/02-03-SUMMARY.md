---
phase: 02-quiz-engine-and-content
plan: 03
subsystem: content
tags: [astb, mechanical-comprehension, aviation, nautical, question-bank, lessons]

requires:
  - phase: 02-quiz-engine-and-content
    provides: "Quiz engine, question types, lesson types, lazy loading stubs"
provides:
  - "85 MCT questions across forces, machines, fluids, electricity, engines"
  - "85 ANIT questions across aerodynamics, instruments, nautical terms, weather"
  - "MCT lesson content with 5 topics and 18 concept cards"
  - "ANIT lesson content with 4 topics and 17 concept cards"
affects: [03-gamification, 02-04]

tech-stack:
  added: []
  patterns: [question-bank-authoring, topic-balanced-distribution, misconception-based-distractors]

key-files:
  created: []
  modified:
    - src/data/questions/mct.ts
    - src/data/questions/anit.ts
    - src/data/lessons/mct-lessons.ts
    - src/data/lessons/anit-lessons.ts

key-decisions:
  - "85 questions per section (exceeds 80+ requirement) with ~30/50/20 easy/medium/hard split"
  - "optionExplanations on 40%+ of questions targeting common misconceptions"
  - "Lesson cards written to reference visual concepts for future SVG diagram integration"

patterns-established:
  - "Question authoring pattern: conceptual questions with misconception-based distractors"
  - "Lesson card pattern: heading, 2-3 sentence content, keyTakeaway for each concept"

requirements-completed: [CONT-03, CONT-04, CONT-06]

duration: 12min
completed: 2026-03-08
---

# Phase 02 Plan 03: MCT and ANIT Content Summary

**170 mechanical/aviation/nautical questions with explanation-rich distractors and 35 concept cards teaching core ASTB topics**

## Performance

- **Duration:** 12 min
- **Started:** 2026-03-08T23:00:02Z
- **Completed:** 2026-03-08T23:12:14Z
- **Tasks:** 2
- **Files modified:** 4

## Accomplishments
- Authored 85 MCT questions spanning forces/motion, simple machines, fluids/pressure, circuits/electricity, and engines/thermodynamics
- Authored 85 ANIT questions spanning aerodynamics, flight instruments, nautical terminology, and weather/navigation
- Created 18 MCT concept cards across 5 lesson topics teaching mechanical principles
- Created 17 ANIT concept cards across 4 lesson topics teaching aviation and nautical knowledge
- All questions include full explanations; 40%+ include per-option explanations targeting common misconceptions

## Task Commits

Each task was committed atomically:

1. **Task 1: MCT question bank and lessons** - `da10d14` (feat)
2. **Task 2: ANIT question bank and lessons** - `6500877` (feat)

## Files Created/Modified
- `src/data/questions/mct.ts` - 85 mechanical comprehension questions with explanations
- `src/data/questions/anit.ts` - 85 aviation/nautical information questions with explanations
- `src/data/lessons/mct-lessons.ts` - 5 topics, 18 concept cards covering mechanical principles
- `src/data/lessons/anit-lessons.ts` - 4 topics, 17 concept cards covering aviation and nautical knowledge

## Decisions Made
- Set question count at 85 per section (exceeding the 80+ minimum) to provide good coverage without bloating bundle size
- Used misconception-based distractors (e.g., "heavier objects fall faster") to make wrong answers educational
- Wrote lesson card content to reference visual concepts (gears turning, circuit diagrams) to facilitate future SVG diagram integration

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered
None.

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- 4 of 5 ASTB sections now have full question banks and lesson content (MST/RCT from Plan 02, MCT/ANIT from this plan)
- Only SAT spatial section remains (Plan 04) -- requires Canvas/SVG rendering, highest technical risk
- Code-split bundles confirmed working: MCT ~57KB, ANIT ~58KB gzipped ~16KB each

---
*Phase: 02-quiz-engine-and-content*
*Completed: 2026-03-08*
