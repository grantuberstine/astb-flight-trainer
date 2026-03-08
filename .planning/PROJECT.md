# ASTB Flight Trainer

## What This Is

A gamified web application that transforms ASTB (Aviation Selection Test Battery) preparation into an aviation-themed training experience. Instead of boring flashcards and practice tests, the user progresses through "missions" with a cockpit-style dashboard, earning ranks from Cadet to Pilot. Built for Grant's girlfriend who is preparing for the ASTB to pursue Navy pilot selection, with a 2-3 month timeline before her test date.

## Core Value

Make ASTB prep engaging enough that she actually wants to study every day — turning a daunting military aptitude test into a game she's motivated to beat.

## Requirements

### Validated

(None yet — ship to validate)

### Active

- [ ] Covers all ASTB subtests: Math Skills, Reading Comprehension, Mechanical Comprehension, Aviation & Nautical Knowledge, Spatial Apperception, Performance Based Measures
- [ ] Built-in question bank modeled after Barron's Military Flight Aptitude Tests style content
- [ ] Aviation-themed UI — cockpit dashboard, missions, rank progression (Cadet → Ensign → Lieutenant → Commander → Pilot)
- [ ] Full gamification — XP system, badges/achievements, daily streaks, timed challenges, unlockable content
- [ ] Diagnostic assessment that identifies weak areas across all subtests
- [ ] Adaptive study — prioritizes weak areas while maintaining coverage of strengths
- [ ] Progress tracking dashboard — scores by section, improvement trends, time spent
- [ ] Study plan / pacing feature — maps out what to cover each week based on test date
- [ ] Timed practice modes that simulate real ASTB time pressure
- [ ] Explanations for every question — teaches the concept, not just right/wrong
- [ ] Interactive lessons/content for each section (not just a question bank)

### Out of Scope

- Mobile app — web only, laptop-focused
- Multi-user / accounts system — single user, no auth needed
- AFOQT content — ASTB only
- Paid product features — no payments, subscriptions, or monetization
- Backend server — client-side app with local storage for progress

## Context

- The ASTB-E (current version) has these main components:
  - **Math Skills Test (MST)**: Arithmetic, algebra, geometry
  - **Reading Comprehension Test (RCT)**: Passage-based comprehension
  - **Mechanical Comprehension Test (MCT)**: Physics, mechanical principles, gears, levers, fluids
  - **Aviation & Nautical Knowledge Test (ANKT)**: Aviation history, principles of flight, nautical terminology, weather
  - **Spatial Apperception Test (SAT)**: Identifying aircraft orientation from cockpit view
  - **Performance Based Measures Battery (PBM)**: Tracking tasks, multitasking — may be difficult to simulate in web
- Barron's Military Flight Aptitude Tests (5th Edition) is the primary reference for question style and content depth
- Test taker has 2-3 months to prepare
- Should feel like a game, not a textbook — engagement is critical for consistent daily practice

## Constraints

- **Tech stack**: Web app (HTML/CSS/JS or framework) — must run in browser without backend
- **Single user**: No authentication, database, or server infrastructure
- **Content accuracy**: Questions must be representative of actual ASTB difficulty and topics
- **Timeline**: Should be usable (at least core sections) quickly since she has a real test date
- **PBM limitation**: Performance Based Measures involve psychomotor tracking that may need creative adaptation for web

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Web app, no backend | Single user, simplicity, fast to build | — Pending |
| Aviation-themed gamification | Full game feel requested — ranks, missions, XP, badges | — Pending |
| Generate question bank from research | No existing digital content to import; model after Barron's | — Pending |
| All ASTB sections included | Comprehensive prep needed for best score | — Pending |
| Local storage for progress | No server = browser storage for tracking | — Pending |

---
*Last updated: 2026-03-08 after initialization*
