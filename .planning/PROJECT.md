# ASTB Flight Trainer

## What This Is

A gamified web application that transforms ASTB (Aviation Selection Test Battery) preparation into an aviation-themed training experience. Users progress through missions with a cockpit-style dashboard, earning ranks from Cadet to Pilot. Covers all 5 ASTB subtests plus PBM concept training with 380+ questions, adaptive learning, and spaced repetition. Built for Grant's girlfriend preparing for the ASTB to pursue Navy pilot selection.

## Core Value

Make ASTB prep engaging enough that she actually wants to study every day — turning a daunting military aptitude test into a game she's motivated to beat.

## Requirements

### Validated

- ✓ Covers all ASTB subtests: MST, RCT, MCT, ANIT, SAT — v1.0
- ✓ Built-in question bank (380+ questions) modeled after Barron's style content — v1.0
- ✓ Aviation-themed UI — cockpit dashboard, missions, rank progression (Cadet → Pilot) — v1.0
- ✓ Full gamification — XP, 20 badges, daily streaks, 7 missions, timed challenges — v1.0
- ✓ Diagnostic assessment identifying weak areas across all subtests — v1.0
- ✓ Adaptive study — prioritizes weak areas with SM-2 spaced repetition — v1.0
- ✓ Progress tracking dashboard — scores by section, activity, overall progress — v1.0
- ✓ Study plan with test-date pacing — weekly plans based on section weights — v1.0
- ✓ Timed practice modes simulating real ASTB time pressure — v1.0
- ✓ Explanations for every question — teaches concepts with per-option breakdowns — v1.0
- ✓ Interactive lessons for each section (not just a question bank) — v1.0

### Active

(None yet — define for next milestone)

### Out of Scope

- Mobile app — web only, laptop-focused
- Multi-user / accounts system — single user, no auth needed
- AFOQT content — ASTB only
- Paid product features — no payments, subscriptions, or monetization
- Backend server — client-side app with IndexedDB for progress
- AI-generated questions — quality control concern (3 lifetime ASTB attempts)
- Full PBM joystick simulation — requires hardware; concept trainer serves the purpose
- NATFI practice questions — personality inventory with no right answers

## Context

Shipped v1.0 with 13,029 LOC TypeScript across 140 files.
Tech stack: React 19, TypeScript 5.9, Vite 7, Tailwind CSS v4, Zustand 5, IndexedDB.
Built in 1 day (2026-03-08).

Content: 105 MST, 54 RCT (17 passages), 85 MCT, 85 ANIT, 52 SAT questions = 381 total.
Canvas 2D spatial renderer for SAT cockpit-view orientation matching.
SM-2 spaced repetition algorithm for adaptive question scheduling.

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Web app, no backend | Single user, simplicity, fast to build | ✓ Good — runs anywhere |
| Aviation-themed gamification | Full game feel — ranks, missions, XP, badges | ✓ Good — cohesive theme |
| Question bank from research | No existing digital content; modeled after Barron's | ✓ Good — 381 questions |
| All ASTB sections included | Comprehensive prep for best score | ✓ Good — full coverage |
| IndexedDB for persistence | Reliable, no expiry, large capacity | ✓ Good — survives restarts |
| SM-2 spaced repetition | Proven algorithm, simple implementation | ✓ Good — adaptive scheduling |

---
*Last updated: 2026-03-09 after v1.0 milestone*
