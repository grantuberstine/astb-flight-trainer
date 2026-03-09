# ASTB Flight Trainer

Gamified ASTB test prep web app. Single user, no backend, all client-side.

## Stack

- **Framework:** React 19 + TypeScript 5.9 + Vite 7
- **Styling:** Tailwind CSS v4 (plugin via `@tailwindcss/vite`)
- **State:** Zustand 5 with custom IndexedDB persist adapter (`src/lib/storage.ts`)
- **Routing:** React Router 7 with hash router (`createHashRouter`) for static hosting
- **Icons:** Lucide React
- **Storage:** IndexedDB via `idb-keyval` — no localStorage

## TypeScript Rules

- `erasableSyntaxOnly: true` — no TS enums. Use `as const` objects instead.
- `verbatimModuleSyntax: true` — use `import type` for type-only imports.
- `strict: true`, `noUnusedLocals`, `noUnusedParameters` — no dead code.

## Project Structure

```
src/
  components/     # UI components (quiz/, lessons/, spatial/, layout/)
  data/           # Question banks and lesson content (questions/, lessons/)
  hooks/          # Custom hooks (useQuizSession, useCountdown)
  lib/            # Utilities (constants, storage adapter, export-import)
  pages/          # Route pages (PracticePage, QuizPage, etc.)
  stores/         # Zustand stores (progress, gamification, settings)
  types/          # TypeScript types (question, progress, gamification)
```

## Key Patterns

- **Quiz state machine:** `useReducer` in `useQuizSession.ts` with states: idle → loading → answering → showing-explanation → complete
- **Timer:** Absolute `endTime` approach in `useCountdown.ts` (avoids drift when tabs are backgrounded)
- **Question types:** Discriminated union (`MultipleChoiceQuestion | PassageQuestion | SpatialQuestion`)
- **Content loading:** Dynamic `import()` per section via `src/data/questions/index.ts` for code splitting
- **Persistence:** All stores use `indexedDBStorage` adapter, never localStorage
- **Theming:** Soft feminine palette — pink, sky-blue, lavender, warm whites (Nunito Sans font)

## Commands

```bash
npm run dev      # Start dev server
npm run build    # Type-check + build
npm run lint     # ESLint
npm run preview  # Preview production build
```

## Conventions

- Functional components only, no class components
- Named exports for components, hooks, and utilities
- Const object pattern for enum-like values (e.g., `Rank`)
- Section IDs: `'MST' | 'RCT' | 'MCT' | 'ANIT' | 'SAT'`
- Question banks are typed arrays exported from `src/data/questions/{section}.ts`
- Lesson content exported from `src/data/lessons/{section}-lessons.ts`
