# Sarf Quest — Product Task List

This is the working implementation backlog for Sarf Quest. The product must
feel like an illustrated adventure game first and an education tool second.
Mobile is the primary experience; desktop and tablet layouts must grow from
the mobile layout rather than being treated as separate afterthoughts.

## Working rules

- [ ] Read and follow `AGENTS.md`, `DESIGN.md`, `docs/content-schema.md`, and the relevant files in `agents/` before changing an area.
- [ ] Keep Arabic content separate from presentation and game logic.
- [ ] Never mark OCR or generated content as `verified` without qualified review.
- [ ] Prefer a complete playable vertical slice over disconnected mock screens.
- [ ] Every task must be checked at 360px, 390px, tablet portrait, and desktop widths.
- [ ] Every task that adds interaction must include keyboard, focus, touch, and reduced-motion behavior.

## Phase 0 — Product and repository foundation

- [x] Confirm the existing stack, route structure, dependency versions, and available test tooling.
- [x] Document the current playable milestone and known limitations.
- [x] Define the initial player journey: world map → quest intro → challenge → feedback → rewards → replay/practice.
- [x] Define shared contracts for question generation, answer validation, scoring, progression, and persistence.
- [x] Add a clear content review-status policy to the content layer and UI.
- [x] Add a lightweight error boundary and safe fallback for corrupt or missing local progress.

## Phase 1 — Content and curriculum safety

- [ ] Inventory all OCR files in `docs/lessons/` and record their source lesson/page references.
- [ ] Convert only the required demonstration entries into the content schema.
- [ ] Keep demonstration content visibly labelled as `needs_review`.
- [ ] Add content validation checks for stable IDs, required fields, accepted variants, and review status.
- [ ] Verify preservation of Arabic letters, tashkeel, punctuation, and RTL ordering.
- [ ] Create a replacement path for reviewed textbook records without changing game components.
- [ ] Add unit tests covering exact answer matching, explicit tashkeel-stripping modes, and rejected variants.

## Phase 2 — Mobile-first game shell

- [x] Establish shared design tokens from `DESIGN.md`: color, typography, spacing, depth, focus, and motion.
- [x] Add reliable Arabic fonts with sufficient line-height so tashkeel never clips.
- [x] Build the mobile shell with a compact HUD, safe-area spacing, and touch targets of at least 44px.
- [x] Ensure no horizontal overflow at 360px and 390px widths.
- [x] Add responsive desktop/tablet compositions without introducing a dashboard/sidebar layout.
- [x] Add reduced-motion styles and ensure animation never carries essential meaning.
- [x] Add shared tactile controls for primary, secondary, selected, disabled, success, and error states.
- [x] Add visual regression or browser checks for mobile and desktop layout breakpoints.

## Phase 3 — Illustrated adventure world

  - [x] Build the game-world landing screen as the default route.
  - [x] Create an original illustrated map using layered terrain, paths, water, landmarks, and restrained atmospheric effects.
  - [x] Add a visible quest marker with clear unlocked, completed, replayable, and locked states.
  - [x] Add player level, XP, daily objective, and current objective to the HUD without making the screen feel like a dashboard.
  - [x] Add functional navigation from the quest marker and primary mobile action.
  - [x] Add accessible labels for map landmarks and locked regions.
  - [x] Validate map composition and marker placement at 360px, 390px, tablet, and 1280px+.

## Phase 4 — Quest introduction

  - [x] Build a short quest-introduction screen that feels like entering a mission.
  - [x] Show quest title, Arabic title, objective, baab/seegha scope, content-status label, and reward preview.
  - [x] Add a single obvious start/replay action with keyboard and touch support.
  - [x] Preserve enough vertical space on mobile for the primary action above the virtual keyboard or bottom safe area.
  - [x] Add a return-to-map action that does not lose persistent progress.

## Phase 5 — Seegha Match vertical slice

  - [x] Implement question selection from eligible demonstration content.
  - [x] Build the challenge scene with Arabic text as the dominant visual focus.
  - [x] Use large answer targets that stack cleanly on mobile and use a comfortable two-column layout where space allows.
  - [x] Support keyboard selection and visible focus states.
  - [x] Prevent double submissions and accidental duplicate scoring.
  - [x] Show immediate correct feedback with explanation and a clear next action.
  - [x] Show immediate incorrect feedback with the correct answer, explanation, and respectful retry guidance.
  - [x] Save incorrect question IDs for later practice.
  - [x] Provide an untimed mode by default.
  - [x] Add unit tests for question generation, answer validation, accuracy, stars, and XP.
  - [ ] Add browser-level tests for start, correct answer, incorrect answer, feedback, and next-question behavior.

## Phase 6 — Completion, rewards, and practice

  - [x] Build a quest-completion scene with XP earned, accuracy, stars, and questions completed.
  - [x] Add a satisfying but brief reward animation that respects reduced motion.
  - [x] Add replay and “practise mistakes” actions that perform real work.
  - [x] Ensure practice mode uses the saved mistakes rather than silently starting a full quest.
  - [x] Persist quest attempts, best stars, best accuracy, XP, daily progress, and baab mastery locally.
  - [x] Ensure completion is recorded exactly once per session.
  - [x] Add reload tests confirming progress survives a page reload.
  - [x] Add tests confirming repeat attempts do not corrupt best results or duplicate completion counts.

## Phase 7 — Responsive and accessibility hardening

  - [x] Test on 360×800 and 390×844 mobile viewports.
  - [x] Test tablet portrait and desktop at 1280px or wider.
  - [x] Check Arabic shaping, tashkeel clipping, mixed Arabic/Latin text, and punctuation direction.
  - [x] Check virtual keyboard behavior for any future Arabic input screens.
  - [x] Check touch target size, focus visibility, screen-reader names, and status announcements.
  - [x] Confirm correctness is never communicated through color or sound alone.
  - [x] Test `prefers-reduced-motion` and non-timed gameplay.
  - [x] Fix all horizontal scrolling, overlapping map controls, clipped plaques, and bottom-action collisions.

## Phase 8 — Expand the game world

  - [x] Gate the next quest on a verified textbook record; no unreviewed quest is added.
  - [x] Implement reusable game-mode contracts for Word Builder, Baab Detective, Speed Run, Complete the Tasreef, and Boss Battle.
  - [x] Add unlock rules based on demonstrated mastery rather than simple completion farming.
  - [x] Add a game-themed mastery collection for learned abwaab and seeghas.
  - [x] Add revision journeys driven by due review content.
  - [x] Add profile/settings controls for sound, reduced motion, and text size.

## Definition of done for every task

- [ ] The task produces a real observable player outcome.
- [ ] It works on mobile first and remains usable on desktop.
- [ ] It follows the adventure-game visual language.
- [ ] Arabic text renders correctly with RTL and preserved tashkeel.
- [ ] Empty, loading, error, selected, disabled, success, and failure states are handled where relevant.
- [ ] Relevant unit and browser checks pass.
- [ ] No unverified Sarf claim is presented as authoritative.
- [ ] The change has been inspected in a rendered browser screen, or the limitation is documented.

## Suggested execution order

1. Phase 0 — Foundation and contracts
2. Phase 1 — Demonstration content safety
3. Phase 2 — Mobile-first shell
4. Phase 3 — Adventure world
5. Phase 4 — Quest introduction
6. Phase 5 — Seegha Match
7. Phase 6 — Rewards and practice
8. Phase 7 — Responsive/accessibility hardening
9. Phase 8 — Additional game modes and curriculum expansion
