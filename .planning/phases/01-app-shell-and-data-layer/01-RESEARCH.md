# Phase 1: App Shell and Data Layer - Research

**Researched:** 2026-03-08
**Domain:** React SPA scaffolding, Zustand state management, IndexedDB persistence, client-side routing
**Confidence:** HIGH

## Summary

Phase 1 sets up the project foundation: Vite + React + TypeScript scaffolding, client-side routing between main sections, Zustand stores with IndexedDB persistence, and a JSON export/import system for data backup. This is a well-trodden path with no architectural unknowns. The only non-trivial decision is wiring Zustand's persist middleware to IndexedDB instead of the default localStorage -- this requires a custom storage adapter using `idb-keyval` (295 bytes). Every other piece is standard React SPA setup.

The critical insight for this phase is: **get the data layer right now, because every future phase builds on it.** The Zustand store schema, the IndexedDB persistence adapter, and the export/import mechanism must be solid before Phase 2 adds question answering and progress tracking. Schema migrations via Zustand persist's `version` + `migrate` options mean the schema can evolve safely, but the initial shape should anticipate the full app's needs (progress records, gamification state, settings).

**Primary recommendation:** Use `idb-keyval` as the IndexedDB backend for Zustand persist's custom storage adapter. Use `createHashRouter` (not `createBrowserRouter`) for GitHub Pages compatibility. Request persistent storage via `navigator.storage.persist()` on first load.

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| DATA-01 | Progress persists in IndexedDB (survives browser close and doesn't expire) | Zustand persist middleware with custom `idb-keyval` storage adapter writes to IndexedDB. `navigator.storage.persist()` prevents eviction. Verified API patterns from official Zustand docs. |
| DATA-02 | User can export/import progress as JSON backup | Browser-native Blob + `URL.createObjectURL()` for download, `FileReader` API for import. No library needed -- pure browser APIs. |
| DATA-03 | App works as a static web app -- no backend or server required | Vite builds to static files. `createHashRouter` enables deployment to GitHub Pages/Vercel/Netlify with zero server config. All data client-side in IndexedDB. |
</phase_requirements>

## Standard Stack

### Core (Phase 1 only)

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| React | 19.x | UI framework | Dominant SPA framework, component model fits quiz/dashboard UI |
| TypeScript | 5.9.x | Type safety | Catches schema bugs at build time -- critical for store/question types |
| Vite | 7.x | Build tool + dev server | Standard React build tool, sub-second HMR, `react-ts` template |
| React Router | 7.x | Client-side routing | v7 merged react-router-dom, import from `react-router` |
| Zustand | 5.x | State management | ~1KB, built-in persist middleware, zero boilerplate |
| idb-keyval | latest | IndexedDB key-value wrapper | 295 bytes, promise-based, perfect for Zustand custom storage |
| Tailwind CSS | 4.x | Styling | CSS-first config in v4, utility classes for rapid UI |
| Lucide React | latest | Icons | Tree-shakeable, aviation-adjacent icons (plane, compass, etc.) |

### Supporting

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| @tailwindcss/vite | latest | Tailwind Vite plugin | Required for Tailwind CSS v4 with Vite (replaces PostCSS setup) |

### Alternatives Considered

| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| idb-keyval | Raw IndexedDB API | idb-keyval is 295 bytes and saves writing ~50 lines of boilerplate IndexedDB open/transaction/put/get code |
| idb-keyval | localForage | localForage is ~7KB and includes polyfills for older browsers not needed here |
| createHashRouter | createBrowserRouter | BrowserRouter requires server-side redirect config; HashRouter works on any static host out of the box |
| Zustand persist | Manual localStorage | Zustand persist handles serialization, rehydration, version migration, and partialize automatically |

**Installation (Phase 1):**
```bash
# Scaffold project
npm create vite@latest astb-flight-trainer -- --template react-ts
cd astb-flight-trainer

# Core dependencies
npm install react-router zustand idb-keyval lucide-react

# Tailwind CSS v4
npm install tailwindcss @tailwindcss/vite

# Dev tools
npm install -D prettier prettier-plugin-tailwindcss vitest
```

## Architecture Patterns

### Recommended Project Structure (Phase 1 scope)

```
src/
├── components/
│   ├── ui/                     # Generic reusable components
│   │   ├── Button.tsx
│   │   └── Card.tsx
│   └── layout/                 # App shell layout
│       ├── AppLayout.tsx       # Root layout with nav + Outlet
│       ├── Navbar.tsx          # Top navigation bar
│       └── Sidebar.tsx         # Section navigation (if needed)
├── stores/                     # Zustand stores
│   ├── progress-store.ts       # Question history, section scores (persisted)
│   ├── gamification-store.ts   # XP, rank, badges, streaks (persisted)
│   ├── settings-store.ts       # Test date, preferences (persisted)
│   └── session-store.ts        # Current quiz session (ephemeral, NOT persisted)
├── lib/
│   ├── storage.ts              # IndexedDB storage adapter for Zustand
│   ├── export-import.ts        # JSON export/import utilities
│   └── constants.ts            # App-wide constants (rank thresholds, etc.)
├── pages/                      # Route-level page components
│   ├── DashboardPage.tsx       # Landing page / cockpit dashboard
│   ├── PracticePage.tsx        # Practice section selector
│   ├── ProgressPage.tsx        # Progress tracking overview
│   └── SettingsPage.tsx        # Settings + export/import
├── types/                      # Shared TypeScript types
│   ├── question.ts             # Question bank schema types
│   ├── progress.ts             # Progress/history types
│   └── gamification.ts         # XP, rank, badge types
├── App.tsx                     # Root component with HashRouter
├── main.tsx                    # Entry point
└── index.css                   # Tailwind directives
```

### Pattern 1: Custom IndexedDB Storage Adapter

**What:** A thin adapter that bridges Zustand persist middleware to IndexedDB via idb-keyval.
**When to use:** For all persisted Zustand stores in this project.
**Example:**

```typescript
// src/lib/storage.ts
import { get, set, del } from 'idb-keyval';
import { createJSONStorage, type StateStorage } from 'zustand/middleware';

const idbStorage: StateStorage = {
  getItem: async (name: string): Promise<string | null> => {
    return (await get(name)) ?? null;
  },
  setItem: async (name: string, value: string): Promise<void> => {
    await set(name, value);
  },
  removeItem: async (name: string): Promise<void> => {
    await del(name);
  },
};

export const indexedDBStorage = createJSONStorage(() => idbStorage);
```

Source: [Zustand persist middleware docs](https://zustand.docs.pmnd.rs/reference/integrations/persisting-store-data), [idb-keyval GitHub](https://github.com/jakearchibald/idb-keyval)

### Pattern 2: Zustand Store with IndexedDB Persistence

**What:** A Zustand store using the custom IndexedDB adapter with version migration support.
**When to use:** For every store that needs to survive browser close.
**Example:**

```typescript
// src/stores/progress-store.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { indexedDBStorage } from '../lib/storage';

interface ProgressState {
  questionHistory: Array<{
    questionId: string;
    correct: boolean;
    section: string;
    timestamp: number;
  }>;
  sectionScores: Record<string, { correct: number; total: number }>;
  recordAnswer: (questionId: string, correct: boolean, section: string) => void;
}

export const useProgressStore = create<ProgressState>()(
  persist(
    (set, get) => ({
      questionHistory: [],
      sectionScores: {},
      recordAnswer: (questionId, correct, section) => {
        set((state) => ({
          questionHistory: [
            ...state.questionHistory,
            { questionId, correct, section, timestamp: Date.now() },
          ],
          sectionScores: {
            ...state.sectionScores,
            [section]: {
              correct: (state.sectionScores[section]?.correct ?? 0) + (correct ? 1 : 0),
              total: (state.sectionScores[section]?.total ?? 0) + 1,
            },
          },
        }));
      },
    }),
    {
      name: 'astb-progress',
      storage: indexedDBStorage,
      version: 1,
      partialize: (state) => ({
        questionHistory: state.questionHistory,
        sectionScores: state.sectionScores,
      }),
    }
  )
);
```

Source: [Zustand persist middleware](https://deepwiki.com/pmndrs/zustand/3.1-persist-middleware)

### Pattern 3: Hash Router Setup for Static Hosting

**What:** Use `createHashRouter` so the app works on GitHub Pages without server-side redirect configuration.
**When to use:** Always for this project (static deployment requirement).
**Example:**

```typescript
// src/App.tsx
import { createHashRouter, RouterProvider, Outlet } from 'react-router';
import { AppLayout } from './components/layout/AppLayout';
import { DashboardPage } from './pages/DashboardPage';
import { PracticePage } from './pages/PracticePage';
import { ProgressPage } from './pages/ProgressPage';
import { SettingsPage } from './pages/SettingsPage';

const router = createHashRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { index: true, element: <DashboardPage /> },
      { path: 'practice', element: <PracticePage /> },
      { path: 'progress', element: <ProgressPage /> },
      { path: 'settings', element: <SettingsPage /> },
    ],
  },
]);

export function App() {
  return <RouterProvider router={router} />;
}
```

Source: [React Router v7 docs](https://reactrouter.com/api/data-routers/createBrowserRouter), [GitHub Pages SPA guidance](https://github.com/orgs/community/discussions/36010)

### Pattern 4: JSON Export/Import for Data Backup

**What:** Pure browser APIs to download all persisted state as a JSON file and restore it from a file upload.
**When to use:** Settings page -- "Download Backup" and "Restore Backup" buttons.
**Example:**

```typescript
// src/lib/export-import.ts
import { get, set } from 'idb-keyval';

const STORE_KEYS = ['astb-progress', 'astb-gamification', 'astb-settings'];

export async function exportAllData(): Promise<void> {
  const data: Record<string, unknown> = {};
  for (const key of STORE_KEYS) {
    data[key] = await get(key);
  }

  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = `astb-backup-${new Date().toISOString().split('T')[0]}.json`;
  a.click();

  URL.revokeObjectURL(url);
}

export async function importAllData(file: File): Promise<void> {
  const text = await file.text();
  const data = JSON.parse(text);

  for (const key of STORE_KEYS) {
    if (data[key]) {
      await set(key, data[key]);
    }
  }

  // Reload to rehydrate Zustand stores from new IndexedDB data
  window.location.reload();
}
```

### Pattern 5: Request Persistent Storage on First Load

**What:** Call `navigator.storage.persist()` to ask the browser not to evict IndexedDB data.
**When to use:** Once on first app load (main.tsx or App.tsx).
**Example:**

```typescript
// In main.tsx or App.tsx, call once on mount
async function requestPersistentStorage() {
  if (navigator.storage && navigator.storage.persist) {
    const granted = await navigator.storage.persist();
    if (granted) {
      console.log('Persistent storage granted');
    }
  }
}

// Call in useEffect or at app initialization
requestPersistentStorage();
```

Source: [MDN StorageManager.persist()](https://developer.mozilla.org/en-US/docs/Web/API/StorageManager/persist)

### Anti-Patterns to Avoid

- **Using localStorage directly:** Safari evicts localStorage after 7 days of inactivity. IndexedDB with `navigator.storage.persist()` is the correct choice for study data that must survive weeks/months.
- **Single monolithic Zustand store:** Split into focused stores (progress, gamification, settings, session). Persist only what needs persistence. Session state is ephemeral.
- **Using createBrowserRouter on static hosting:** Will cause 404s on page refresh. Use `createHashRouter` for GitHub Pages / Netlify / Vercel static deployments.
- **Deferring export/import:** Build it now in Phase 1 while the data layer is the focus. If deferred, users risk losing months of study progress to browser data clearing.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| IndexedDB key-value access | Raw IndexedDB open/transaction/objectStore/put/get ceremony | `idb-keyval` (295 bytes) | IndexedDB API requires 15+ lines per operation; idb-keyval wraps it in one-liners |
| State persistence + rehydration | Manual JSON.parse/stringify on page load/unload | Zustand persist middleware | Handles serialization, async rehydration, version migration, and partialize automatically |
| State management | React Context + useReducer | Zustand | Context causes unnecessary re-renders; Zustand uses `useSyncExternalStore` for surgical updates |
| File download trigger | Server endpoint to generate files | `Blob` + `URL.createObjectURL()` | Pure client-side, no server needed, works everywhere |

**Key insight:** Phase 1 has zero custom-solution needs. Every problem here has a battle-tested, tiny library solution.

## Common Pitfalls

### Pitfall 1: Zustand Async Rehydration Race Condition
**What goes wrong:** Zustand persist with async storage (IndexedDB) does not block rendering. Components render with initial/default state before rehydration completes, causing a flash of empty state.
**Why it happens:** IndexedDB reads are asynchronous. The store creates with defaults, then overwrites when IndexedDB data arrives.
**How to avoid:** Use the `onRehydrateStorage` callback to set a `hasHydrated` flag. Show a loading spinner until hydration completes. Alternatively, use `useStore.persist.hasHydrated()` which Zustand provides.
**Warning signs:** Dashboard shows zero progress briefly on page load before snapping to real values.

```typescript
// Check hydration status
const hasHydrated = useProgressStore.persist.hasHydrated();
if (!hasHydrated) return <LoadingSpinner />;
```

### Pitfall 2: Store Schema Changes Breaking Existing Data
**What goes wrong:** Adding/removing/renaming fields in a Zustand store after users have existing persisted data causes crashes or data loss.
**Why it happens:** The persisted JSON shape no longer matches the TypeScript interface.
**How to avoid:** Always use the `version` number in persist config. Increment it on schema changes and write a `migrate` function that transforms old data to new shape. Start at version 1, not 0.
**Warning signs:** `TypeError: Cannot read properties of undefined` after a code update.

### Pitfall 3: HashRouter URL Aesthetics
**What goes wrong:** URLs look like `example.com/#/practice` instead of `example.com/practice`.
**Why it happens:** Hash routing uses the URL fragment, which static servers ignore.
**How to avoid:** Accept this tradeoff for Phase 1. If aesthetics matter later, switch to BrowserRouter with a custom 404.html redirect (GitHub Pages trick) or deploy to Vercel/Netlify which support SPA fallback config.
**Warning signs:** User confusion about URLs, but functionally irrelevant.

### Pitfall 4: Export/Import Not Covering All Stores
**What goes wrong:** Export captures progress but misses gamification or settings data. User restores backup and loses XP/rank/streak.
**How to avoid:** Maintain a single `STORE_KEYS` constant that lists all persisted store names. Export and import must iterate over ALL of them. Add a version field to the export format for future-proofing.
**Warning signs:** Partial data after restore.

### Pitfall 5: Tailwind v4 Configuration Confusion
**What goes wrong:** Developer tries to create `tailwind.config.js` (v3 pattern) instead of using CSS `@theme` directive (v4 pattern).
**Why it happens:** Most tutorials and Stack Overflow answers still reference Tailwind v3 config.
**How to avoid:** In Tailwind CSS v4, configuration is CSS-first. Custom theme tokens go in `@theme` blocks inside your CSS file. Use the `@tailwindcss/vite` plugin, not PostCSS.
**Warning signs:** Config file has no effect, custom colors/fonts not applied.

```css
/* src/index.css - Tailwind v4 way */
@import 'tailwindcss';

@theme {
  --color-navy-900: #0a1628;
  --color-navy-800: #1a2744;
  --color-navy-700: #2a3a5c;
  --color-gold-500: #d4a017;
  --color-gold-400: #e8b92e;
  --color-cockpit-gray: #2d3748;
  --font-display: 'Inter', sans-serif;
}
```

## Code Examples

### Complete Storage Adapter (verified pattern)

```typescript
// src/lib/storage.ts
import { get, set, del } from 'idb-keyval';
import { createJSONStorage, type StateStorage } from 'zustand/middleware';

const idbStorage: StateStorage = {
  getItem: async (name: string): Promise<string | null> => {
    return (await get(name)) ?? null;
  },
  setItem: async (name: string, value: string): Promise<void> => {
    await set(name, value);
  },
  removeItem: async (name: string): Promise<void> => {
    await del(name);
  },
};

export const indexedDBStorage = createJSONStorage(() => idbStorage);

// Store keys -- single source of truth for export/import
export const PERSISTED_STORE_KEYS = [
  'astb-progress',
  'astb-gamification',
  'astb-settings',
] as const;
```

### Hydration-Aware Component Pattern

```typescript
// src/components/layout/HydrationGate.tsx
import { useProgressStore } from '../../stores/progress-store';
import { useGamificationStore } from '../../stores/gamification-store';

export function HydrationGate({ children }: { children: React.ReactNode }) {
  const progressHydrated = useProgressStore.persist.hasHydrated();
  const gamificationHydrated = useGamificationStore.persist.hasHydrated();

  if (!progressHydrated || !gamificationHydrated) {
    return (
      <div className="flex h-screen items-center justify-center bg-navy-900">
        <p className="text-gold-400 text-lg">Loading your flight data...</p>
      </div>
    );
  }

  return <>{children}</>;
}
```

### Settings Store with Export/Import Actions

```typescript
// src/stores/settings-store.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { indexedDBStorage } from '../lib/storage';

interface SettingsState {
  testDate: string | null;  // ISO date string
  soundEnabled: boolean;
  setTestDate: (date: string) => void;
  toggleSound: () => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      testDate: null,
      soundEnabled: true,
      setTestDate: (date) => set({ testDate: date }),
      toggleSound: () => set((s) => ({ soundEnabled: !s.soundEnabled })),
    }),
    {
      name: 'astb-settings',
      storage: indexedDBStorage,
      version: 1,
      partialize: (state) => ({
        testDate: state.testDate,
        soundEnabled: state.soundEnabled,
      }),
    }
  )
);
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| `tailwind.config.js` (JS config) | CSS `@theme` directive | Tailwind v4 (Jan 2025) | Config is now CSS-first; no JS config file needed |
| `react-router-dom` package | `react-router` (unified) | React Router v7 (2024) | Single package, import everything from `react-router` |
| Zustand v4 `create<T>()(...)` | Same API in v5 | Zustand v5 (2024) | Minimal breaking changes; persist API unchanged |
| localStorage for persistence | IndexedDB via idb-keyval | Best practice 2024+ | Safari eviction policy, larger storage quotas, structured data support |

**Deprecated/outdated:**
- `react-router-dom`: Merged into `react-router` in v7. Do not install separately.
- `tailwind.config.js`: Still works in v4 but is legacy. Use CSS `@theme` blocks instead.
- `Create React App`: Officially deprecated. Use Vite.

## Open Questions

1. **Gamification store initial schema**
   - What we know: XP, rank, badges, streaks, and lastActiveDate are needed.
   - What's unclear: Exact badge definitions and rank thresholds are Phase 3 decisions.
   - Recommendation: Define the store shape now with placeholder thresholds. Phase 3 will populate the actual values. The `version` + `migrate` pattern handles schema evolution.

2. **Question bank TypeScript types**
   - What we know: Questions have id, section, type, text, options, correctAnswer, explanation.
   - What's unclear: Exact shape for passage-based (RCT) and spatial (SAT) questions differs from standard multiple choice.
   - Recommendation: Define a base `Question` interface now with a discriminated union for question types. Expand during Phase 2 when the quiz engine needs specific renderers.

## Sources

### Primary (HIGH confidence)
- [Zustand persist middleware docs](https://zustand.docs.pmnd.rs/reference/integrations/persisting-store-data) - Custom storage adapter API, version/migrate, partialize
- [Zustand persist DeepWiki](https://deepwiki.com/pmndrs/zustand/3.1-persist-middleware) - StateStorage interface, async rehydration, onRehydrateStorage
- [idb-keyval GitHub](https://github.com/jakearchibald/idb-keyval) - API (get/set/del), 295 bytes, custom stores
- [React Router v7 docs](https://reactrouter.com/api/data-routers/createBrowserRouter) - createHashRouter, nested routes, Outlet
- [MDN StorageManager.persist()](https://developer.mozilla.org/en-US/docs/Web/API/StorageManager/persist) - Persistent storage API, browser behavior
- [MDN Storage quotas](https://developer.mozilla.org/en-US/docs/Web/API/Storage_API/Storage_quotas_and_eviction_criteria) - IndexedDB vs localStorage eviction
- [Vite Getting Started](https://vite.dev/guide/) - react-ts template, project structure
- [Tailwind CSS v4 announcement](https://tailwindcss.com/blog/tailwindcss-v4) - CSS-first config, @theme directive

### Secondary (MEDIUM confidence)
- [Zustand IndexedDB discussion #1721](https://github.com/pmndrs/zustand/discussions/1721) - Community patterns for IndexedDB adapter
- [GitHub Pages SPA routing](https://github.com/orgs/community/discussions/36010) - HashRouter requirement for static hosting
- [Robin Wieruch React Router tutorial](https://www.robinwieruch.de/react-router/) - v7 setup patterns

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - All packages verified at current stable versions, APIs confirmed from official docs
- Architecture: HIGH - Zustand persist + idb-keyval pattern documented in official discussions and multiple independent sources
- Pitfalls: HIGH - Async rehydration race condition documented in official Zustand docs; Safari localStorage eviction documented by MDN and web.dev

**Research date:** 2026-03-08
**Valid until:** 2026-04-07 (30 days - stable technologies, no fast-moving concerns)
