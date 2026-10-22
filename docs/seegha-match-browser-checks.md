# Seegha Match browser checks

The repository currently has no browser-test runner dependency. The following
checks are the acceptance cases for the next batch browser pass:

1. From the world map, activate the Lantern Library marker or footer action and
   confirm the quest introduction appears.
2. Activate Begin the quest with a pointer and with Enter/Space, then confirm
   the first challenge appears with the Arabic prompt and four answer targets.
3. Choose the correct target and confirm the target state, explanation, and
   `Next form` action appear immediately.
4. Replay the first question and choose an incorrect target. Confirm the
   correct Arabic answer, explanation, and respectful retry guidance appear.
5. Use A–D or 1–4 to select an answer. Confirm repeated clicks/key presses do
   not add duplicate answers.
6. Continue to the next question and confirm the progress indicator advances.
7. Complete a run with mistakes and confirm those question IDs are available
   to the practice-mistakes action on the results scene.
8. Repeat at 360px and 1280px widths; confirm answer targets stack on mobile,
   use two columns on wide screens, and never require horizontal scrolling.

Unit coverage for eligibility, option validation, accuracy, and mistake-only
selection lives in `src/lib/game.test.ts`.
