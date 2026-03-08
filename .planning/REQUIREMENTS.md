# Requirements: ASTB Flight Trainer

**Defined:** 2026-03-08
**Core Value:** Make ASTB prep engaging enough that she actually wants to study every day — turning a daunting military aptitude test into a game she's motivated to beat.

## v1 Requirements

Requirements for initial release. Each maps to roadmap phases.

### Content & Questions

- [ ] **CONT-01**: App includes 100+ MST questions covering arithmetic, algebra, geometry, word problems with detailed explanations
- [ ] **CONT-02**: App includes 50+ RCT passage-based questions covering main idea, inference, vocabulary with explanations
- [ ] **CONT-03**: App includes 80+ MCT questions covering forces, machines, fluids, circuits, engines with explanations
- [ ] **CONT-04**: App includes 80+ ANIT questions covering aerodynamics, instruments, naval terms, weather with explanations
- [ ] **CONT-05**: App includes 50+ SAT questions with cockpit-view-to-aircraft-orientation visual matching
- [ ] **CONT-06**: Each section has lesson/study content teaching concepts before practice
- [ ] **CONT-07**: Every question shows detailed explanation (why correct + why others wrong)

### Practice & Assessment

- [ ] **PRAC-01**: User can practice any section independently
- [ ] **PRAC-02**: User can take timed practice tests simulating real ASTB time pressure
- [ ] **PRAC-03**: App runs a diagnostic assessment to identify weak areas across all sections
- [ ] **PRAC-04**: App adapts study recommendations based on performance (prioritize weak areas)
- [ ] **PRAC-05**: Missed questions resurface via spaced repetition
- [ ] **PRAC-06**: User can set test date and get a paced study plan
- [ ] **PRAC-07**: User can take full practice test (all sections back-to-back)
- [ ] **PRAC-08**: PBM concept trainer with directional reasoning and multitasking exercises

### Gamification

- [ ] **GAME-01**: Aviation-themed cockpit dashboard UI throughout the app
- [ ] **GAME-02**: XP system — earn points for completing questions, missions, and daily goals
- [ ] **GAME-03**: Daily streak tracker with streak freeze
- [ ] **GAME-04**: Rank progression from Cadet → Ensign → Lieutenant → Commander → Pilot
- [ ] **GAME-05**: 15-25 achievement badges for milestones (section mastery, streaks, speed)
- [ ] **GAME-06**: Mission structure — curated study sequences with objectives
- [ ] **GAME-07**: Timed challenge mode with personal best tracking

### Data & Infrastructure

- [x] **DATA-01**: Progress persists in IndexedDB (survives browser close and doesn't expire)
- [ ] **DATA-02**: User can export/import progress as JSON backup
- [x] **DATA-03**: App works as a static web app — no backend or server required

## v2 Requirements

Deferred to future release. Tracked but not in current roadmap.

### Extended Content

- **EXT-01**: NATFI section explanation (format, strategy — no practice questions since it's personality-based)
- **EXT-02**: Additional question bank expansion (more questions per section for variety)
- **EXT-03**: Difficulty tiering within sections (Easy/Medium/Hard filtering)

### Platform

- **PLAT-01**: PWA/offline mode for studying without internet
- **PLAT-02**: Mobile-optimized responsive layout

## Out of Scope

| Feature | Reason |
|---------|--------|
| User accounts / authentication | Single user, no backend — adds massive complexity for no value |
| Leaderboards / social features | Single user — no community to compete against |
| AI-generated questions | Quality control nightmare — ASTB content must be accurate (3 lifetime attempts) |
| Full PBM joystick simulation | Requires hardware; mouse-based simulation builds wrong skills |
| NATFI practice questions | Personality inventory with no right answers — practice teaches gaming which backfires |
| Video lessons | Massive content effort; text + diagrams faster to create and consume |
| Payment / subscriptions | Personal project, not a product |
| Backend / database server | Client-side only by design |

## Traceability

Which phases cover which requirements. Updated during roadmap creation.

| Requirement | Phase | Status |
|-------------|-------|--------|
| CONT-01 | Phase 2 | Pending |
| CONT-02 | Phase 2 | Pending |
| CONT-03 | Phase 2 | Pending |
| CONT-04 | Phase 2 | Pending |
| CONT-05 | Phase 2 | Pending |
| CONT-06 | Phase 2 | Pending |
| CONT-07 | Phase 2 | Pending |
| PRAC-01 | Phase 2 | Pending |
| PRAC-02 | Phase 2 | Pending |
| PRAC-03 | Phase 4 | Pending |
| PRAC-04 | Phase 4 | Pending |
| PRAC-05 | Phase 4 | Pending |
| PRAC-06 | Phase 4 | Pending |
| PRAC-07 | Phase 2 | Pending |
| PRAC-08 | Phase 4 | Pending |
| GAME-01 | Phase 3 | Pending |
| GAME-02 | Phase 3 | Pending |
| GAME-03 | Phase 3 | Pending |
| GAME-04 | Phase 3 | Pending |
| GAME-05 | Phase 3 | Pending |
| GAME-06 | Phase 3 | Pending |
| GAME-07 | Phase 3 | Pending |
| DATA-01 | Phase 1 | Complete |
| DATA-02 | Phase 1 | Pending |
| DATA-03 | Phase 1 | Complete |

**Coverage:**
- v1 requirements: 25 total
- Mapped to phases: 25
- Unmapped: 0

---
*Requirements defined: 2026-03-08*
*Last updated: 2026-03-08 after roadmap creation*
