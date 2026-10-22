# Phase 8 expansion foundation

Phase 8 adds the infrastructure for future Sarf Quest content without making
unreviewed textbook material playable or authoritative.

## Mode contracts

`src/lib/modes.ts` defines a reusable `GameModeContract` boundary for session
creation, question selection, answer validation, feedback-result scoring, and
mode identity. The shared quest route now hosts playable demonstration loops
for Word Builder, Baab Detective, Sarf Speed Run, Complete the Tasreef, and
Boss Battle. Each uses question data generated from the supplied Lesson 11
records and remains visibly labelled as demonstration content.

Boss Battle remains mastery-gated until the learner has demonstrated learning
evidence. The other four training-ground modes are available for short,
untimed practice so the learner can actually experience the new mechanics.

## Interaction map

- **Word Builder:** drag or tap a form tile into the lantern placement zone.
- **Baab Detective:** drag or tap a baab seal onto the evidence board.
- **Sarf Speed Run:** rapid recall with an optional visible 15-second round
  clock, plus a calm untimed practice path.
- **Complete the Tasreef:** restore a missing table cell by dragging or tapping
  a form tile.
- **Boss Battle:** mixed rounds route to the appropriate construction, case,
  table, or recall interaction.

Every drag interaction has a tap fallback so it remains usable on touchscreens.

## Mastery and revision

Baab mastery now schedules a local next-review date based on session evidence.
The field journal reads those dates into revision journeys and displays the
available baab plus its seegha archive. Mode unlocks use mastery state rather
than completion count alone.

## Local player settings

Camp settings persist sound preference, reduced motion, and text size locally.
Reduced motion and text scale are applied through document-level data
attributes so future game scenes can share the same behavior.

## Curriculum boundary

The expansion quests are deliberately labelled demonstration content because
the supplied OCR lesson is still `needs_review`. They are wired to the typed
Lesson 11 records and can be replaced with reviewed textbook entries without
changing the world, journal, persistence UI, or game-mode presentation.
