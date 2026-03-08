# Stack Research

**Domain:** Gamified test prep web application (single-user, no backend, browser-based)
**Researched:** 2026-03-08
**Confidence:** HIGH

## Recommended Stack

### Core Technologies

| Technology | Version | Purpose | Why Recommended |
|------------|---------|---------|-----------------|
| React | 19.x (latest 19.2.1) | UI framework | Dominant ecosystem for component-based SPAs. Declarative model fits quiz/dashboard UI perfectly. Massive library ecosystem means every gamification pattern has existing solutions. |
| TypeScript | 5.9.x | Type safety | Catches bugs at build time in a complex app with question banks, scoring logic, and state machines. TS 5.9 is stable; skip 6.0 beta for now. |
| Vite | 7.x (latest 7.3.1) | Build tool / dev server | Replaced Webpack as the standard React build tool. Sub-second HMR, fast builds, zero-config React setup. Use `npm create vite@latest -- --template react-ts`. |
| Tailwind CSS | 4.x | Styling | CSS-first configuration in v4, 5x faster builds. Utility classes make it fast to build aviation-themed UI without writing custom CSS files. Pairs with component libraries well. |

### State Management & Data

| Technology | Version | Purpose | Why Recommended |
|------------|---------|---------|-----------------|
| Zustand | 5.x (latest 5.0.11) | App state management | ~1KB bundle, zero boilerplate, built-in `persist` middleware writes to localStorage automatically. Perfect for single-user app that needs to persist XP, progress, streaks, and scores across sessions. No providers needed -- just hooks. |

### Animation & Gamification

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| Motion (formerly Framer Motion) | 12.x (latest 12.35.1) | UI animations | Page transitions, card flips for questions, progress bar animations, rank-up celebrations, hover effects. Declarative React API -- `<motion.div animate={{...}}>`. Install as `motion`, import from `motion/react`. |
| canvas-confetti | 1.x | Reward celebrations | Fire confetti on rank-ups, badge unlocks, streak milestones. Lightweight (~4KB), runs on web worker so no jank. Zero React dependency -- just call `confetti()`. |
| use-sound | 4.x | Sound effects | Correct/wrong answer sounds, rank-up fanfares, timer warnings. React hook wrapper around Howler.js. Supports audio sprites (one file, many sounds). |

### Visualization & Charts

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| Recharts | 3.x (latest 3.8.0) | Progress dashboard charts | Score trends over time, section-by-section radar charts, study time tracking. Built on React + D3, declarative component API. Best React charting lib for this complexity level. |

### UI Components & Icons

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| Lucide React | 0.577.x | Icons | Aviation icons, navigation, UI chrome. 1500+ icons, tree-shakeable, consistent style. Replaces Heroicons/FontAwesome with lighter bundle. |

### Routing

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| React Router | 7.x (latest 7.13.1) | Client-side routing | Navigate between dashboard, study modes, question screens, settings. v7 merged react-router-dom -- import everything from `react-router`. |

### Spatial Apperception (ASTB-specific)

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| HTML5 Canvas (native) | N/A | Aircraft orientation rendering | The Spatial Apperception Test requires showing aircraft from cockpit perspective. Use native Canvas API via React refs -- no library needed. SVG is an alternative for simpler static diagrams. |

### Development Tools

| Tool | Purpose | Notes |
|------|---------|-------|
| ESLint | Code quality | Use `@eslint/js` + `typescript-eslint`. Vite template includes config. |
| Prettier | Code formatting | Pair with Tailwind plugin (`prettier-plugin-tailwindcss`) for class sorting. |
| Vitest | Unit testing | Native Vite integration, same config. Test scoring logic, adaptive algorithms, question selection. |

## Installation

```bash
# Scaffold project
npm create vite@latest astb-flight-trainer -- --template react-ts
cd astb-flight-trainer

# Core dependencies
npm install react-router zustand motion recharts lucide-react

# Gamification / feedback
npm install canvas-confetti use-sound
npm install -D @types/canvas-confetti

# Tailwind CSS v4 (Vite plugin)
npm install tailwindcss @tailwindcss/vite

# Dev tools
npm install -D prettier prettier-plugin-tailwindcss vitest @testing-library/react
```

## Alternatives Considered

| Recommended | Alternative | When to Use Alternative |
|-------------|-------------|-------------------------|
| React + Vite | Next.js | Only if you later need SSR or a backend API. Next.js is overkill for a single-user client-side app -- adds server complexity you explicitly ruled out. |
| Zustand | Redux Toolkit | Only for massive multi-team apps with complex interdependent state. This is a single-user app; Zustand's simplicity wins. |
| Zustand persist | Raw localStorage API | Never for this project. Zustand persist handles serialization, rehydration, and migration automatically. Raw localStorage means manual JSON.parse/stringify everywhere. |
| Motion | GSAP | Only if you need timeline-based cinematic sequences. Motion's declarative React API is simpler for UI transitions. GSAP requires imperative refs and is less "React-y." |
| Motion | CSS animations | Only for trivial hover effects. Anything involving enter/exit, layout, or spring physics needs a library. |
| Recharts | Chart.js / react-chartjs-2 | Only if you need Canvas rendering for huge datasets. Recharts' SVG approach is cleaner for the small datasets in a progress dashboard. |
| Tailwind CSS | CSS Modules | Only if you hate utility classes. Tailwind is faster to build with and produces consistent design without a design system. |
| Lucide | Heroicons | Heroicons is fine but has fewer icons. Lucide has better aviation-adjacent icons (plane, compass, target, shield, etc.). |
| Vitest | Jest | Jest works but requires separate config. Vitest shares Vite's config and is faster. |

## What NOT to Use

| Avoid | Why | Use Instead |
|-------|-----|-------------|
| Create React App (CRA) | Deprecated, unmaintained since 2023. Webpack-based, slow builds. | Vite with react-ts template |
| Redux (classic) | Massive boilerplate for a single-user app. Action creators, reducers, dispatch -- all unnecessary complexity. | Zustand |
| Styled Components / Emotion | CSS-in-JS has fallen out of favor in 2025. Runtime overhead, bundle bloat, React 19 compatibility issues. | Tailwind CSS |
| Three.js / React Three Fiber | Way too heavy for 2D aircraft orientation diagrams. The SAT subtest needs 2D top-down/side views, not 3D rendering. | HTML5 Canvas or SVG |
| Firebase / Supabase | You explicitly need no backend. Adding a cloud DB for a single-user app adds latency, auth complexity, and a dependency on external services. | Zustand + localStorage |
| Ant Design / Material UI | Heavy component libraries with opinionated styling that fights a custom aviation theme. Bundle size is massive. | Tailwind CSS + custom components |
| jQuery | Not 2025. React handles the DOM. | React |

## Stack Patterns by Variant

**If spatial apperception questions are simple (static aircraft views):**
- Use inline SVGs with Tailwind classes for aircraft diagrams
- Simpler to build, easier to maintain as data

**If spatial apperception questions need dynamic orientation (rotating, pitch, bank):**
- Use HTML5 Canvas with React refs
- Draw aircraft programmatically based on orientation parameters (pitch, bank, heading)
- Allows generating many variations without hand-drawing each one

**If you later want to add a backend (multi-user, cloud sync):**
- Zustand persist can swap localStorage for a custom storage adapter
- Add Supabase or a simple API without rewriting state management
- React Router supports loaders/actions if you add data fetching

## Version Compatibility

| Package | Compatible With | Notes |
|---------|-----------------|-------|
| React 19.x | Motion 12.x | Motion fully supports React 19 concurrent features |
| React 19.x | Zustand 5.x | Zustand 5 built for React 18/19, uses useSyncExternalStore |
| React 19.x | React Router 7.x | v7 designed for React 18/19 |
| Vite 7.x | Tailwind CSS 4.x | Use `@tailwindcss/vite` plugin, not PostCSS |
| Vite 7.x | Vitest 3.x | Shares Vite config, no duplicate setup |
| TypeScript 5.9.x | All above | Full support across the stack |

## Key Architecture Decisions Driven by Stack

1. **All state in Zustand stores** -- question bank, user progress, XP, streaks, settings. Zustand persist middleware auto-syncs to localStorage.

2. **Question bank as static TypeScript data** -- JSON/TS files imported at build time. No API calls, no loading states for questions. Vite tree-shakes unused sections.

3. **Route-per-screen with React Router** -- Dashboard, Study Mode, Quiz, Review, Settings as separate routes. Motion handles page transitions via `AnimatePresence`.

4. **Tailwind for all styling** -- No separate CSS files. Aviation theme via Tailwind CSS custom theme tokens in `@theme` directive (navy blues, golds, cockpit grays).

## Sources

- [React Versions](https://react.dev/versions) -- React 19.2.x confirmed as latest stable (HIGH confidence)
- [Vite Releases](https://vite.dev/releases) -- Vite 7.3.1 confirmed as latest stable (HIGH confidence)
- [Tailwind CSS v4.0 announcement](https://tailwindcss.com/blog/tailwindcss-v4) -- v4 CSS-first config confirmed (HIGH confidence)
- [Zustand npm](https://www.npmjs.com/package/zustand) -- v5.0.11 confirmed, persist middleware documented (HIGH confidence)
- [Motion npm / framer-motion](https://www.npmjs.com/package/framer-motion) -- v12.35.1 confirmed, rebrand to "motion" verified (HIGH confidence)
- [Recharts npm](https://www.npmjs.com/package/recharts) -- v3.8.0 confirmed (HIGH confidence)
- [React Router npm](https://www.npmjs.com/package/react-router) -- v7.13.1 confirmed (HIGH confidence)
- [Lucide React](https://lucide.dev/guide/packages/lucide-react) -- v0.577.0 confirmed (HIGH confidence)
- [TypeScript Blog](https://devblogs.microsoft.com/typescript/) -- TS 5.9 stable, 6.0 beta confirmed (HIGH confidence)
- [canvas-confetti GitHub](https://github.com/catdad/canvas-confetti) -- Lightweight, web worker support confirmed (HIGH confidence)
- [use-sound GitHub](https://github.com/joshwcomeau/use-sound) -- Howler.js wrapper, audio sprites confirmed (MEDIUM confidence -- last update may be older)

---
*Stack research for: ASTB Flight Trainer -- gamified test prep web app*
*Researched: 2026-03-08*
