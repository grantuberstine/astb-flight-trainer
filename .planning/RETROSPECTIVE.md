# Project Retrospective

*A living document updated after each milestone. Lessons feed forward into future planning.*

## Milestone: v1.0 — MVP

**Shipped:** 2026-03-09
**Phases:** 4 | **Plans:** 12

### What Was Built
- Complete ASTB quiz engine with 381 questions across 5 sections (MST, RCT, MCT, ANIT, SAT)
- Canvas 2D spatial reasoning renderer for cockpit-view aircraft orientation matching
- Aviation-themed cockpit dashboard with XP, rank progression, streaks, 20 badges, 7 missions
- SM-2 spaced repetition, diagnostic assessments, adaptive study mode, test-date study plans
- PBM concept trainer with compass directional reasoning and divided attention exercises
- Full client-side architecture with IndexedDB persistence and export/import

### What Worked
- Yolo mode + quality profile enabled rapid execution — 12 plans in a single session
- Clear phase dependencies (shell → content → gamification → intelligence) prevented rework
- Const object pattern for enum-like values worked cleanly with erasableSyntaxOnly
- useReducer state machine for quiz lifecycle handled all edge cases (tab backgrounding, passage sub-questions)
- IndexedDB persist adapter was reliable — no localStorage expiry issues

### What Was Inefficient
- ROADMAP.md plan checkboxes weren't auto-updated during execution (some show unchecked despite completion)
- Summary one_liner fields weren't populated by execution workflow — required manual extraction

### Patterns Established
- Absolute endTime for timers (avoids drift when tabs are backgrounded)
- Canvas 2D for dynamic scene rendering + SVG for static transforms (aircraft silhouettes)
- BadgeContext object pattern — pass all evaluation inputs as a single typed object
- Local component state for practice-only features (PBM exercises don't need persistence)
- Lightweight local quiz flow for cross-section features (diagnostic) vs full useQuizSession

### Key Lessons
1. Content generation is the bulk of the work — 381 questions with explanations dominated Phase 2 execution time
2. SM-2 algorithm needs MAX_ACTIVE_CARDS cap to prevent review queue explosion
3. Canvas cockpit renderer with circular clip mask was the right abstraction for SAT spatial questions

### Cost Observations
- Model mix: quality profile (inherit model)
- Sessions: 1 session, all 12 plans executed sequentially
- Notable: Entire MVP built in ~1 day from project init to completion

---

## Cross-Milestone Trends

### Process Evolution

| Milestone | Phases | Plans | Key Change |
|-----------|--------|-------|------------|
| v1.0 | 4 | 12 | Initial build — yolo mode, quality profile |

### Top Lessons (Verified Across Milestones)

1. (Will be populated after v1.1+)
