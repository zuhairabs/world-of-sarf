# Sarf Quest — Repository Inventory

Completed for Phase 0, task 1 in `tasks.md`.

## Stack

- React 19 with TypeScript 6 in strict mode.
- Vite 8 with TanStack Start/Nitro integration.
- TanStack React Router with file-based routes.
- Tailwind CSS 4 through `@tailwindcss/vite`, with the current UI primarily using project CSS tokens and custom CSS.
- ESLint 9, Prettier 3, and TanStack devtools packages.
- Local browser persistence through `localStorage`; no backend or Supabase integration is present.

## Routes

- `src/routes/__root.tsx` — document shell, metadata, stylesheet, and devtools.
- `src/routes/index.tsx` — world map / home screen.
- `src/routes/quest.$questId.tsx` — quest introduction, Seegha Match gameplay, feedback, and results states.
- `src/routeTree.gen.ts` — generated TanStack route tree.

## Content and game boundaries

- `src/content/types.ts` — typed content contract and player/session types.
- `src/content/data/lesson11.ts` — Lesson 11 demonstration quest and OCR-derived records marked `needs_review`.
- `src/content/answers.ts` — explicit Arabic answer normalization and option validation.
- `src/lib/game.ts` — question selection, option validation, and session accuracy helpers.
- `src/lib/xp.ts` — star, XP, level, and title calculations.
- `src/lib/storage.ts` — local profile persistence and progression mutations.

## Dependency versions installed locally

The package manifest uses ranges/latest tags; the installed workspace currently resolves to:

- React `19.3.1`, React DOM `19.3.1`.
- TanStack React Router `1.170.45`, React Start `1.169.3`, router CLI `1.167.45`.
- Vite `8.3.5`, Tailwind `4.3.3`, `@tailwindcss/vite` `4.3.3`.
- TypeScript `6.0.3`, ESLint `9.39.5`, Prettier `3.9.10`.
- Nitro `3.0.260610-beta`.

## Test tooling

- A runnable Node-based unit test command exists: `npm test`.
- Current unit coverage is in `src/lib/game.test.ts` and covers option validation, exact Arabic matching, star calculation, and session accuracy.
- No Playwright, Cypress, Vitest, or browser test runner is installed in the project.
- Browser-level QA is therefore currently manual/in-app-browser based; adding a dedicated browser test runner is a later task, not part of this inventory task.

## Commands

- `npm run dev` — local Vite development server on port 3000 by default.
- `npm run build` — production build.
- `npm test` — current unit checks.
- `npx tsc --noEmit` — strict TypeScript check.
- `npx eslint <paths>` — lint selected files; the repo-wide glob currently also sees generated `.output` files after a build.
- `npm run check` — Prettier check.

## Phase 0 implications

- Keep the existing TanStack/Vite stack; replacing it is unnecessary.
- Build the next work around the existing content, game, and storage seams.
- Add browser test tooling only when the first vertical slice needs automated browser coverage.
- The app is currently a nested project under `my-app`; future task references should use that as the application root.
