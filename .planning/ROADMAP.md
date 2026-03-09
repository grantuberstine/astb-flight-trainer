# Roadmap: ASTB Flight Trainer

## Overview

Transform ASTB test prep into a gamified aviation training experience. The critical path is content and the quiz engine -- everything else layers on top. Phase 1 sets up the app shell and persistence. Phase 2 delivers the core study loop with all section content and practice modes. Phase 3 wraps it in aviation-themed gamification. Phase 4 adds the intelligence layer -- diagnostics, adaptive learning, spaced repetition, and study planning.

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

Decimal phases appear between their surrounding integers in numeric order.

- [x] **Phase 1: App Shell and Data Layer** - Project scaffold, Zustand stores with IndexedDB persistence, question schema, routing, aviation theme tokens (completed 2026-03-08)
- [ ] **Phase 2: Quiz Engine and Content** - Question rendering, timer, explanations, all section content (MST/RCT/MCT/ANIT/SAT), lessons, practice and timed test modes
- [ ] **Phase 3: Gamification and Dashboard** - Cockpit UI, XP system, ranks, streaks, badges, missions, timed challenges
- [ ] **Phase 4: Adaptive Learning and Study Intelligence** - Diagnostic assessment, adaptive recommendations, spaced repetition, study plan with test date pacing, PBM concept trainer

## Phase Details

### Phase 1: App Shell and Data Layer
**Goal**: User can open the app, navigate between sections, and trust that all progress will persist reliably
**Depends on**: Nothing (first phase)
**Requirements**: DATA-01, DATA-02, DATA-03
**Success Criteria** (what must be TRUE):
  1. App loads in browser with routing between main sections (dashboard, practice, progress)
  2. Data persists in IndexedDB and survives browser close, tab close, and system restart
  3. User can export all progress as a JSON file and import it back to restore state
  4. App runs entirely client-side with no backend calls
**Plans:** 2/2 plans complete

Plans:
- [x] 01-01-PLAN.md -- Project scaffold, types, IndexedDB storage adapter, Zustand stores, hydration gate
- [x] 01-02-PLAN.md -- App shell UI (routing, layout, pages), export/import, visual verification

### Phase 2: Quiz Engine and Content
**Goal**: User can study any ASTB section with real practice questions, timed tests, and concept lessons that teach the material
**Depends on**: Phase 1
**Requirements**: CONT-01, CONT-02, CONT-03, CONT-04, CONT-05, CONT-06, CONT-07, PRAC-01, PRAC-02, PRAC-07
**Success Criteria** (what must be TRUE):
  1. User can select any of the 5 ASTB sections and practice questions with immediate correct/incorrect feedback
  2. Every question displays a detailed explanation showing why the correct answer is right and why each wrong answer is wrong
  3. User can take timed practice tests that enforce real ASTB time pressure per section
  4. Each section has lesson/study content that teaches concepts before the user starts practicing
  5. User can take a full practice test covering all sections back-to-back with a combined score
**Plans:** 4 plans

Plans:
- [ ] 02-01-PLAN.md -- Quiz engine core: types, state machine, timer, UI components, lesson viewer, pages, routes
- [ ] 02-02-PLAN.md -- MST + RCT question banks (150+ questions) and lesson content
- [ ] 02-03-PLAN.md -- MCT + ANIT question banks (160+ questions) and lesson content
- [ ] 02-04-PLAN.md -- SAT spatial renderer (Canvas cockpit view, aircraft silhouettes) and 50+ SAT questions

### Phase 3: Gamification and Dashboard
**Goal**: User experiences an aviation-themed training game that motivates daily study through XP, ranks, streaks, and missions
**Depends on**: Phase 2
**Requirements**: GAME-01, GAME-02, GAME-03, GAME-04, GAME-05, GAME-06, GAME-07
**Success Criteria** (what must be TRUE):
  1. App has a cockpit-style dashboard showing section scores, recent activity, and overall progress
  2. User earns XP for completing questions and missions, and can see XP accumulating toward the next rank
  3. User progresses through ranks (Cadet to Pilot) based on mastery and XP milestones
  4. Daily streak tracker shows current streak with streak freeze option, motivating consecutive-day study
  5. User can browse and earn 15-25 achievement badges for milestones like section mastery, streaks, and speed records
**Plans:** 2/3 plans executed

Plans:
- [ ] 03-01-PLAN.md -- Gamification engine: types, XP utility, badge engine with 20 definitions, store extensions
- [ ] 03-02-PLAN.md -- Cockpit dashboard UI, badge/streak/rank display, XP integration into quiz flow
- [ ] 03-03-PLAN.md -- Mission system (7 missions) and timed challenge mode with personal best tracking

### Phase 4: Adaptive Learning and Study Intelligence
**Goal**: App intelligently guides the user's study by identifying weaknesses, adapting question selection, and pacing preparation toward test day
**Depends on**: Phase 3
**Requirements**: PRAC-03, PRAC-04, PRAC-05, PRAC-06, PRAC-08
**Success Criteria** (what must be TRUE):
  1. User can take a diagnostic assessment that identifies weak areas across all sections with a visual breakdown
  2. App automatically prioritizes weak areas in practice sessions while maintaining coverage of strengths
  3. Missed questions resurface at increasing intervals via spaced repetition
  4. User can set their test date and receive a weekly study plan that paces content coverage
  5. PBM concept trainer provides directional reasoning and multitasking exercises with educational context
**Plans**: TBD

Plans:
- [ ] 04-01: Diagnostic assessment and adaptive question selection
- [ ] 04-02: Spaced repetition, study plan, and PBM concept trainer

## Progress

**Execution Order:**
Phases execute in numeric order: 1 → 2 → 3 → 4

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. App Shell and Data Layer | 2/2 | Complete    | 2026-03-08 |
| 2. Quiz Engine and Content | 0/4 | Not started | - |
| 3. Gamification and Dashboard | 2/3 | In Progress|  |
| 4. Adaptive Learning and Study Intelligence | 0/2 | Not started | - |
