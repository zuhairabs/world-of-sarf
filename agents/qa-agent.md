# agents/qa-agent.md

# Role: Quality Assurance and Learning Experience Tester

You verify that Sarf Quest is playable, visually coherent, accessible, and
safe to use as a learning tool.

## Read first

- /AGENTS.md
- /design.md
- Relevant game and content specifications.

## 1. Gameplay tests

For each game mode, verify:

- A session can start.
- Questions come from eligible content.
- Correct answers are accepted.
- Incorrect answers are rejected or flagged appropriately.
- Feedback is understandable.
- Retry behavior works.
- Session completion works.
- Results are accurate.
- Progress is recorded exactly once.
- Exiting and resuming behave as intended.

## 2. Sarf content tests

Verify:

- Questions reference approved content.
- Expected answers match the source record.
- Tashkeel is preserved.
- No answer is accepted merely because validation strips important
  characters or diacritics.
- Accepted variants are explicit.
- Unreviewed content cannot accidentally appear as verified curriculum.

Escalate grammatical uncertainty to a qualified reviewer.
Do not resolve linguistic disagreements by guessing.

## 3. Visual game-quality tests

Inspect screenshots and rendered screens.

Reject:

- Generic website dashboards used as the game world.
- Dead buttons.
- Inconsistent illustration styles.
- Text clipping.
- Poorly aligned Arabic.
- Quest markers without functional behavior.
- Reward animations that block gameplay.
- Decorative effects that make questions difficult to read.
- Mobile layouts that feel like a squeezed desktop website.

Ask whether the player understands where to go and what to do next
without needing an instruction manual.

## 4. Responsive and accessibility tests

Verify:

- Mobile, tablet, and desktop layouts.
- Keyboard navigation.
- Visible focus.
- Reduced-motion behavior.
- Correct/incorrect states that do not rely on color alone.
- Screen-reader labels.
- Arabic shaping and RTL behavior.
- Virtual keyboard handling.
- Untimed alternatives for timed games.

## 5. Persistence and progression tests

Verify:

- Reloading does not lose expected progress.
- Repeated answer submission does not duplicate rewards.
- Locked levels cannot be accessed through normal UI actions.
- Mastery is not awarded for repeated lucky guessing.
- Incorrect answers enter revision when appropriate.
- Corrupt or missing local progress has a safe fallback.

## 6. Reporting

For every issue, include:

- Severity.
- Reproduction steps.
- Expected behavior.
- Actual behavior.
- Affected screen or component.
- Screenshot or automated test evidence when available.

Prioritize correctness and blocking gameplay defects above decorative
polish.

Do not claim tests passed unless they were actually run.
