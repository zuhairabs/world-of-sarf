# Sarf Quest — Initial Player Journey

Completed for Phase 0, task 3 in `tasks.md`.

## Journey goal

Let a first-time learner reach a meaningful Sarf action quickly, finish a
short quest, understand what they learned, and have an obvious next step.
Account creation is not part of the first-play journey.

## State flow

```text
WORLD MAP
  ↓ choose visible unlocked quest
QUEST INTRO
  ↓ begin quest
CHALLENGE
  ↓ choose answer
FEEDBACK
  ├─ correct → explanation → next question
  └─ incorrect → correct answer + explanation → next question
  ↓ complete final question
REWARD / QUEST COMPLETE
  ├─ replay full quest
  ├─ practise saved mistakes
  └─ return to world map
```

## State contracts

### 1. World Map

The player sees an illustrated world, their current progress, and one clear
recommended quest. The primary action is entering the visible unlocked quest.
Locked landmarks communicate future progression but are not required to start
the first quest.

Required outcomes:

- The player can identify where to go without reading a manual.
- The quest marker is a functional link, not decoration.
- Returning to the map reflects completion/replay state from local progress.

### 2. Quest Introduction

The player receives a brief mission framing:

- Quest title and Arabic title.
- Learning objective.
- Baab/seegha scope.
- Demonstration/review status when content is not verified.
- Reward preview.
- One primary start/replay action.

The intro should take less than one screen on a typical phone and should not
delay the player with unnecessary setup.

### 3. Challenge

The player answers one Seegha Match question at a time. Arabic is the dominant
content, with the question and answer targets kept readable and uncluttered.

Required session data:

- Quest ID.
- Current question index.
- Submitted answer IDs.
- Correct/incorrect results.
- Mistake question IDs.
- Whether the session is a full run or mistake practice.

The default mode is untimed. A future timed mode must be an explicit variant,
not a requirement for the initial journey.

### 4. Feedback

Feedback appears immediately after selection and disables duplicate submission
until the player chooses the next action.

Correct feedback includes:

- A non-color success indicator.
- Short positive acknowledgement.
- Explanation grounded in the content record.
- Next-question action.

Incorrect feedback includes:

- A non-color error indicator.
- Respectful correction language.
- The correct answer.
- Explanation grounded in the content record.
- Saving the question for mistake practice.

### 5. Rewards / Quest Complete

After the final question, the player sees:

- XP earned.
- Accuracy.
- Stars based on the quest thresholds.
- Questions completed.
- A short completion message.
- Replay, mistake practice, and return-to-map actions.

Completion writes progress once for the session. Replays can earn additional
participation XP, but best accuracy/stars and daily completion counts must not
be incorrectly downgraded or duplicated.

### 6. Replay / Practice

Replay starts a fresh full quest. Practise Mistakes starts a fresh session from
the saved incorrect question IDs. If there are no saved mistakes, the practice
action is not shown.

Both paths preserve the player’s existing profile and update progress only
after the new session is completed.

## Mobile-first requirements

- The world map and challenge screen must work at 360px wide without horizontal scrolling.
- The primary action must remain reachable near the thumb zone and above the bottom safe area.
- Answer targets must be at least 44px tall and stack vertically on narrow screens.
- Arabic text must retain shaping and tashkeel with enough line-height to avoid clipping.
- Feedback must remain visible without requiring a desktop-width side panel.
- Keyboard focus must remain visible for external keyboards and accessibility navigation.
- `prefers-reduced-motion` must preserve all state changes without relying on animation.

## Journey acceptance criteria

- A new player can start the first quest without an account.
- Every state has one obvious next action.
- Correct and incorrect answers produce distinct, understandable feedback.
- Mistakes are saved and can be practised from the results screen.
- Completing a quest changes persisted local progress.
- Reloading after completion returns the player to a map that reflects progress.
- No state presents `needs_review` OCR content as verified textbook authority.
