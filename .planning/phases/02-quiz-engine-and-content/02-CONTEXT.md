# Phase 2: Quiz Engine and Content - Context

**Gathered:** 2026-03-08
**Status:** Ready for planning

<domain>
## Phase Boundary

Build the core study loop: question rendering engine, timer system, explanation display, question banks for all 5 ASTB sections (MST, RCT, MCT, ANIT, SAT), lesson/study content per section, untimed practice mode, and timed test mode. Does NOT include gamification, adaptive learning, or spaced repetition.

</domain>

<decisions>
## Implementation Decisions

### Quiz Flow & Feedback
- Immediate feedback after each question — no end-of-set review
- Full breakdown on every answer: highlight correct answer, explain why it's right, explain why each wrong option is wrong
- Progress indicator: row of dots at top — filled = answered, green = correct, red = wrong, empty = remaining
- Explicit "Next" button to advance — user controls the pace
- In timed mode, timer pauses while explanation is displayed, resumes on "Next"

### Lesson/Study Content
- Concept card format — bite-sized cards scrolled through sequentially, each covering one concept with heading, short explanation, and SVG diagram/visual
- 3-5 concept cards per topic within a section (brief, focused)
- SVG vector illustrations for diagrams (gears, circuits, instruments, etc.) — match app theme, can animate
- No inline mini-quizzes in lessons — lessons are pure content, practice is separate

### Practice Mode Structure
- Section menu as entry point — Practice page shows 5 section cards (reuses ASTB_SECTIONS data), tap to start
- 10 questions per practice session by default
- Untimed by default — "Timed Test" is a separate mode for ASTB-pressure simulation
- Can quit mid-session with confirmation dialog — answers already given are saved to progress

### SAT Visual Experience
- Clean, simple cockpit view rendering — horizon line, sky/ground split, coastline outline. Focus on readability over realism
- 5 answer options shown as small aircraft silhouettes with different pitch/bank/heading combinations (matches actual ASTB format)
- Explanations include annotated diagram overlaying labels on the cockpit view (e.g., "Horizon tilted = bank left", "Ground above center = diving")
- Parameterized Canvas/SVG rendering (decided at roadmap level — not static images)

### Claude's Discretion
- End-of-session summary screen design (score, time, section breakdown)
- Question randomization/shuffling strategy
- Lesson card transition animations
- Timed test time limits per section (research actual ASTB timing)
- Full practice test flow (all sections back-to-back) — UI for section transitions

</decisions>

<specifics>
## Specific Ideas

- User wants the "best and most feasible medium to teach" — prioritize clarity and engagement over flashiness
- Content quality over quantity (project-level decision) — 300 excellent questions beat 600 mediocre ones
- Lessons should feel interactive (concept cards with SVG diagrams), not like reading a textbook

</specifics>

<code_context>
## Existing Code Insights

### Reusable Assets
- `Question` discriminated union type (MultipleChoiceQuestion, PassageQuestion, SpatialQuestion) — already defines the data schema for all question types
- `SpatialScenarioParams` type with pitch, bank, heading, coastline — ready for parameterized rendering
- `ASTB_SECTIONS` array with id, name, description, icon, color — reuse for section selection UI
- `useProgressStore.recordAnswer()` — already handles answer recording with section, correctness, and timing
- `indexedDBStorage` adapter — established persistence pattern

### Established Patterns
- Zustand stores with IndexedDB persistence via custom adapter
- Hash-based routing (createHashRouter)
- Tailwind CSS v4 with aviation theme tokens (navy, gold, cockpit-gray)
- Const object pattern instead of TS enums (erasableSyntaxOnly)

### Integration Points
- Practice and Progress placeholder pages exist — replace with real implementations
- Router already has /practice and /progress routes
- Progress store's `sectionScores` pre-populated for all 5 sections
- Gamification store exists with XP/rank logic — quiz engine will call `addXP()` in Phase 3

</code_context>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 02-quiz-engine-and-content*
*Context gathered: 2026-03-08*
