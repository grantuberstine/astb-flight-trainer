# Project Research Summary

**Project:** ASTB Flight Trainer
**Domain:** Gamified single-user test prep SPA (military aviation aptitude)
**Researched:** 2026-03-08
**Confidence:** HIGH

## Executive Summary

The ASTB Flight Trainer is a client-side React SPA that gamifies preparation for the Aviation Selection Test Battery. The ASTB-E covers six subtests (math, reading comprehension, mechanical comprehension, aviation/nautical knowledge, spatial apperception, and performance-based measures), and the app must provide comprehensive practice content for all testable sections while wrapping study sessions in an aviation-themed engagement layer (XP, ranks, streaks, missions). The recommended stack -- React 19, TypeScript, Vite 7, Zustand, Tailwind CSS 4, Motion 12 -- is modern, lightweight, and purpose-built for a no-backend SPA. All technologies are at stable, compatible versions with no integration risk.

The critical insight across all research is that **content quality is the product, and gamification is the wrapper**. The question bank (600+ questions with detailed explanations) is the largest effort and the critical path. Every game mechanic must serve learning, not replace it. The adaptive learning engine that routes users to weak areas is more important than the reward system. The architecture should enforce this priority: build the quiz engine and content pipeline first, layer gamification on top, add advanced features (spatial rendering, adaptive algorithms, study planning) once the core loop works.

The top risks are: (1) inaccurate question content teaching wrong patterns before a 3-attempt-lifetime test, (2) localStorage data loss destroying months of progress (mitigated by using IndexedDB and shipping export/import early), (3) the Spatial Apperception Test renderer being harder than expected (mitigated by a dedicated prototype spike), and (4) scope creep through game mechanics consuming time that should go toward content. The 2-3 month timeline before the real test date means every development week matters -- the app must deliver genuine study value fast, then layer engagement features.

## Key Findings

### Recommended Stack

The stack is a standard modern React SPA with zero exotic dependencies. React 19 + Vite 7 + TypeScript 5.9 is the current best practice for client-side SPAs. Zustand with persist middleware handles all state management and localStorage/IndexedDB persistence in under 1KB. Tailwind CSS 4 provides rapid styling with aviation theming via custom tokens. Motion 12 handles all animations declaratively.

**Core technologies:**
- **React 19 + Vite 7 + TypeScript 5.9:** Standard SPA foundation with sub-second HMR and type safety
- **Zustand 5:** Minimal state management with built-in persistence middleware -- replaces Redux entirely
- **Tailwind CSS 4:** Utility-first styling with CSS-first config, enables aviation theme without a design system
- **Motion 12:** Declarative animations for page transitions, card flips, rank-up celebrations
- **Recharts 3:** Progress dashboard charts (score trends, section radar charts)
- **HTML5 Canvas + SVG:** Spatial Apperception rendering without heavy 3D libraries
- **canvas-confetti + use-sound:** Lightweight reward feedback (confetti on rank-ups, audio cues)

**Critical version note:** All packages confirmed compatible with React 19. No beta dependencies. use-sound may have older maintenance status -- monitor.

### Expected Features

**Must have (table stakes):**
- Question bank covering MST, RCT, MCT, ANIT, SAT (600+ questions with detailed explanations)
- Lesson content per section (concept review, not just questions)
- Section-by-section and timed practice modes
- Score tracking with progress dashboard
- Correct/incorrect feedback with full explanations
- Local persistence across sessions
- Mobile-responsive layout (laptop-primary)

**Should have (differentiators -- no competitor has these):**
- Aviation-themed cockpit dashboard UI
- XP system + daily streak tracker with streak freeze
- Rank progression (Cadet to Pilot) tied to mastery
- Mission structure (curated study sequences)
- Diagnostic assessment for initial weakness identification
- Adaptive study recommendations (rule-based, not ML)
- Spaced repetition via modified Leitner system
- Study plan with test date countdown pacing
- SAT visual trainer with parameterized cockpit views
- Achievement badges (15-25)

**Defer (v2+):**
- PBM concept trainer (directional reasoning, multitasking exercises -- educational only, not simulation)
- Full practice test mode (all sections back-to-back)
- Progress export/import JSON (though export should ship earlier per pitfalls research)
- Difficulty tiering within sections

**Anti-features (explicitly do not build):**
- User accounts / authentication
- Leaderboards / social features
- AI-generated questions
- Full PBM joystick simulation
- NATFI practice questions (personality inventory -- explain format only)
- Payment / subscription system

### Architecture Approach

Three-layer architecture: Presentation (dashboard, quiz engine, spatial viewer, lessons, study plan), Application (gamification engine, adaptive algorithm, session manager), and Data (static JSON question bank, Zustand stores with persistence). The quiz engine emits events that the gamification engine listens to -- this decoupling is essential. Spatial Apperception uses parameterized Canvas/SVG rendering from compact scenario data (288 possible combinations from pitch x bank x heading x coastline) rather than static images. State is split across 3-4 focused Zustand stores: progress (persisted), gamification (persisted), session (ephemeral), and settings (persisted).

**Major components:**
1. **Question Engine** -- renders questions by type, evaluates answers, shows explanations, manages timer
2. **Gamification Engine** -- calculates XP, checks badge conditions, tracks streaks/ranks via event processing
3. **Adaptive Selector** -- modified Leitner system with section weighting from diagnostic results
4. **Spatial Renderer** -- Canvas cockpit views + SVG aircraft diagrams from parameterized scenario data
5. **Progress/Gamification Stores** -- Zustand with persist middleware, auto-synced to storage
6. **Session Manager** -- state machine controlling quiz flow (practice, timed, diagnostic, mission modes)

### Critical Pitfalls

1. **Inaccurate question content** -- With only 3 lifetime ASTB attempts, wrong practice content actively harms. Enforce a question schema requiring worked explanations, source references, and independent answer verification. Budget 70% of content time on explanations.
2. **localStorage data loss** -- Use IndexedDB (not localStorage) for all study data. Ship export/import in the first milestone. Call `navigator.storage.persist()` on first load. Safari evicts localStorage after 7 days of inactivity.
3. **Gamification distracting from learning** -- Build the adaptive learning engine before the reward system. Cap XP from mastered topics. Tie rank progression to diagnostic improvement, not volume.
4. **Spatial rendering underestimated** -- Requires a dedicated prototype spike. 125+ distinct orientation images needed. Use parameterized SVG/Canvas rendering, not static images.
5. **Scope creep through game mechanics** -- Hard feature freeze for MVP: XP, ranks (5 levels), daily streak, section badges. No more than 20% of dev time on gamification. Ask "does this help her score higher?" for every feature.

## Implications for Roadmap

Based on research, suggested phase structure:

### Phase 1: Foundation and Data Layer
**Rationale:** Everything depends on the data schema, store setup, and project scaffolding. The question JSON schema must enforce explanations from day one. Storage architecture (IndexedDB, not localStorage) must be decided before any progress tracking is built.
**Delivers:** Project scaffold (React + Vite + TS + Tailwind), Zustand stores with persistence, question bank JSON schema with validation, basic routing shell, aviation theme tokens
**Addresses:** Local storage persistence, project structure
**Avoids:** localStorage data loss pitfall, hardcoded question bank anti-pattern

### Phase 2: Core Quiz Engine and Initial Content
**Rationale:** The quiz engine is the core loop -- every other feature depends on being able to answer questions and record results. Content authoring for MST and MCT (most straightforward sections) begins here. This phase delivers genuine study value.
**Delivers:** Question rendering (multiple choice), answer evaluation with explanations, timer component, progress recording, section-by-section practice mode, timed practice mode, 100+ MST questions, 80+ MCT questions with full explanations
**Addresses:** Question bank, explanations, section practice, timed practice, score tracking
**Avoids:** Monolithic quiz component anti-pattern, weak explanations pitfall

### Phase 3: Gamification Layer and Dashboard
**Rationale:** Gamification wraps the quiz engine -- it cannot exist without working question answering. The cockpit dashboard is the primary differentiator and should ship as soon as there is data to display. XP, streaks, and ranks drive the daily study habit.
**Delivers:** XP calculation and award system, rank progression (5 levels), daily streak with freeze, cockpit-style dashboard with section scores and trends, achievement badges (15-25), progress charts (Recharts), celebration animations (Motion + confetti)
**Addresses:** Cockpit dashboard UI, XP system, daily streak, rank progression, achievement badges
**Avoids:** Gamification-over-learning pitfall (adaptive engine from Phase 2 already routes to weak areas)

### Phase 4: Remaining Content and Adaptive Learning
**Rationale:** With the engine and gamification working, expand content to all testable sections and add intelligence to question selection. RCT and ANIT content authored here. Diagnostic assessment enables adaptive routing. Export/import ships here as the safety net.
**Delivers:** RCT question bank (50+ questions), ANIT question bank (80+ questions), lesson content per section, diagnostic assessment, adaptive question selection (Leitner system), study plan with test date pacing, data export/import (JSON backup)
**Addresses:** Full section coverage, diagnostic assessment, adaptive recommendations, study plan, data backup
**Avoids:** Scope creep pitfall (content-focused phase, not feature-focused)

### Phase 5: Spatial Apperception and Advanced Features
**Rationale:** SAT is the highest technical risk and should be prototyped as a spike early in this phase before full content creation. Mission structure and spaced repetition add depth to an already-functional app.
**Delivers:** SAT parameterized renderer (Canvas cockpit views + SVG aircraft diagrams), 50+ SAT questions, mission structure (curated study sequences), spaced repetition for missed questions
**Addresses:** SAT visual trainer, mission structure, spaced repetition
**Avoids:** Static images anti-pattern, spatial rendering underestimation (prototype spike first)

### Phase 6: Polish and Extended Features
**Rationale:** Only after all core content and features are solid. PBM is explicitly educational-only. Full practice test mode adds final exam simulation.
**Delivers:** PBM educational content (format explanation, general tips, optional multitasking exercises), full practice test mode (all sections back-to-back), additional question bank expansion, difficulty tiering, UI polish and animation refinement
**Addresses:** PBM coverage, full test simulation, content expansion
**Avoids:** PBM simulation trap (educational only, clearly labeled)

### Phase Ordering Rationale

- **Foundation before features:** Zustand stores, IndexedDB persistence, and question schema must exist before any feature can persist state or render content
- **Quiz engine before gamification:** Gamification reacts to quiz events -- it cannot be built without the core loop working
- **Content is the critical path:** Question authoring (600+ questions with explanations) runs in parallel with development across Phases 2-5. It is the bottleneck, not the code
- **SAT deferred but not forgotten:** Spatial rendering is high-risk and high-value, but the app provides genuine study value with 4 text-based sections before SAT ships
- **PBM last:** Cannot be meaningfully simulated in a browser. Educational content only. Lowest ROI per development hour
- **Export/import in Phase 4, not Phase 6:** Per pitfalls research, data loss is devastating mid-study. Ship the safety net before the user has months of progress at risk

### Research Flags

Phases likely needing deeper research during planning:
- **Phase 2 (Quiz Engine):** Question rendering for passage-based RCT questions may need a specialized component; timer enforcement and adaptive difficulty within sections need design decisions
- **Phase 4 (Adaptive Learning):** The Leitner system implementation needs parameter tuning (box promotion/demotion thresholds, section weighting formula); diagnostic assessment question selection strategy needs definition
- **Phase 5 (Spatial Apperception):** Highest technical risk in the project. The Canvas/SVG rendering approach needs a prototype spike before committing to full content creation. Aircraft silhouette assets need to be sourced or drawn

Phases with standard patterns (skip research-phase):
- **Phase 1 (Foundation):** Standard React + Vite scaffolding, Zustand store setup -- well-documented, no unknowns
- **Phase 3 (Gamification):** XP/rank/streak/badge systems are well-documented patterns from Duolingo case studies and gamification literature
- **Phase 6 (Polish):** Standard UI refinement and content expansion -- no architectural decisions needed

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Stack | HIGH | All packages verified at current stable versions with confirmed React 19 compatibility. No beta dependencies. |
| Features | HIGH | ASTB-E structure well-documented by official Navy sources and Barron's. Gamification patterns proven by Duolingo research. Competitor analysis confirms gamification is an uncontested differentiator. |
| Architecture | HIGH | Three-layer SPA with Zustand stores is a standard, well-documented pattern. Parameterized spatial rendering is the only novel component. |
| Pitfalls | HIGH | Risks identified from educational technology research, browser storage documentation, military test prep forums, and gamification meta-analyses. Recovery strategies documented. |

**Overall confidence:** HIGH

### Gaps to Address

- **IndexedDB vs localStorage:** Pitfalls research strongly recommends IndexedDB, but the stack research recommends Zustand's persist middleware which defaults to localStorage. Resolution: use a custom storage adapter for Zustand persist that writes to IndexedDB (idb-keyval or similar). Decide during Phase 1 planning.
- **use-sound maintenance status:** The use-sound library may have older maintenance. Verify it works with React 19 during Phase 3, and have Howler.js as a direct fallback.
- **Question content sourcing:** The 600+ question target is ambitious for a personal project. Quality-gate each batch rather than trying to hit the number. 300 excellent questions beat 600 mediocre ones.
- **SAT visual fidelity:** No prototype exists yet. The parameterized rendering approach is theoretically sound but needs validation. Allocate a dedicated spike at the start of Phase 5.
- **Content authoring parallelism:** Questions should be authored alongside development, not after. The roadmap should explicitly allocate content authoring tasks within each phase, not treat it as a separate workstream.

## Sources

### Primary (HIGH confidence)
- [React 19.2.x](https://react.dev/versions) -- Latest stable version confirmed
- [Vite 7.3.1](https://vite.dev/releases) -- Latest stable version confirmed
- [Tailwind CSS v4](https://tailwindcss.com/blog/tailwindcss-v4) -- CSS-first config confirmed
- [Zustand 5.0.11](https://www.npmjs.com/package/zustand) -- Persist middleware documented
- [Motion 12.35.1](https://www.npmjs.com/package/framer-motion) -- React 19 support confirmed
- [MDN Storage API](https://developer.mozilla.org/en-US/docs/Web/API/Storage_API/Storage_quotas_and_eviction_criteria) -- Browser storage limits and eviction
- [web.dev Storage](https://web.dev/articles/storage-for-the-web) -- IndexedDB vs localStorage guidance
- [ASTB FAQ - NAMI](https://www.med.navy.mil/Navy-Medicine-Operational-Training-Command/Naval-Aerospace-Medical-Institute/ASTB-FAQ/) -- Official ASTB structure
- [ASTB Overview - Marines](https://officer.marines.com/docs/oso/aviation/ASTB_Overview.pdf) -- Official test structure
- [ASTB Sample Questions - Navy Medicine](https://www.med.navy.mil/Portals/62/Documents/NMFSC/NMOTC/NAMI/Clinical%20Medicine/Operational%20Psychology/ASTB_SampleQuestions_13May14.pdf) -- Official sample content

### Secondary (MEDIUM confidence)
- [Duolingo Gamification Case Studies](https://www.strivecloud.io/blog/gamification-examples-boost-user-retention-duolingo) -- Engagement statistics (streaks +60%, streak freeze -21% churn)
- [Gamification effectiveness meta-analysis - Frontiers in Psychology 2023](https://pmc.ncbi.nlm.nih.gov/articles/PMC10591086/) -- Academic research on gamification in education
- [High-stakes psychomotor ability assessment - Springer 2025](https://link.springer.com/article/10.1186/s41235-025-00672-z) -- PBM practice effects research
- [Spaced repetition algorithm comparison](https://neuracache.com/spaced) -- Leitner vs SM-2 vs FSRS
- [Air Warriors ASTB forums](https://www.airwarriors.com/community/) -- SAT format details, PBM component descriptions
- [Barron's Military Flight Aptitude Tests, 5th Edition](https://www.amazon.com/Military-Flight-Aptitude-Tests-Fifth/dp/1506288340) -- Content depth benchmark

### Tertiary (LOW confidence)
- [use-sound](https://github.com/joshwcomeau/use-sound) -- May have older maintenance; verify React 19 compatibility
- Competitor feature sets (ASTB Prep App, Mometrix, UGO Prep) -- Based on public descriptions, not hands-on testing

---
*Research completed: 2026-03-08*
*Ready for roadmap: yes*
