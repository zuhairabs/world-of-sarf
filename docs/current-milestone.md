# Sarf Quest — Current Playable Milestone

Completed for Phase 0, task 2 in `tasks.md`.

## Current milestone

The app currently contains one complete local-only gameplay loop:

1. The player lands on an illustrated adventure world map.
2. The player selects the visible Lantern Library quest.
3. A quest introduction explains the objective, baab scope, reward, and demo-content status.
4. The player enters a five-question Seegha Match session.
5. Answer choices are validated through the content/game layer.
6. Correct and incorrect feedback shows immediately, including an explanation and the correct answer for mistakes.
7. The player advances through the session and reaches a quest-completion reward screen.
8. XP, stars, accuracy, attempts, baab mastery, and daily progress are persisted in `localStorage`.
9. The player can replay the quest or practise the mistakes saved from the completed run.

## Implemented surfaces

- World map: layered CSS terrain, map paths, landmarks, locked regions, quest marker, player HUD, XP bar, and daily objective.
- Quest intro: mission-style presentation with Arabic seegha scope and reward preview.
- Challenge: Arabic-first parchment question plaque, responsive answer targets, selected/correct/incorrect states, and feedback panel.
- Results: XP, accuracy, stars, completion messaging, replay, mistake practice, and return-to-map actions.
- Responsive CSS: mobile stacking at narrow widths, larger desktop map composition, reduced-motion support, and visible keyboard focus states.
- Content boundary: Lesson 11 demonstration data remains `needs_review` and is visibly labelled as demonstration/OCR content.

## Verification completed

- `npx tsc --noEmit` passes.
- `npm test` passes.
- Targeted ESLint passes for the game module, unit tests, world map route, and quest route.
- A production build completed successfully before this documentation update.

## Known limitations

- The supplied lesson OCR is not qualified textbook verification. The quest is demonstration content and must not be presented as authoritative curriculum until reviewed.
- Only Seegha Match is implemented. Word Builder, Baab Detective, Speed Run, Complete the Tasreef, and Boss Battle remain future work.
- There is no backend, account, cloud sync, or cross-device progress.
- There is no dedicated Playwright, Cypress, or Vitest browser test runner yet.
- Browser-level visual QA was attempted with the in-app browser, but this environment could not reach the local Vite loopback server. The responsive behavior is covered by CSS breakpoints and source checks, but rendered mobile/desktop inspection still needs to be completed in a reachable browser environment.
- The current local test command uses Node's experimental TypeScript stripping; it is suitable for the current pure-function checks but should be replaced or supplemented with a conventional test runner as the suite grows.
- The app is currently located under the nested `my-app` application root.

## Exit criteria for this milestone

This milestone is considered usable as a prototype because the player can
complete a real quest and return to a changed world state. It is not yet ready
to be treated as verified instructional curriculum or a production release.
