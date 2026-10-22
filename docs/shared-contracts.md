# Sarf Quest — Shared Game Contracts

Completed for Phase 0, task 4 in `tasks.md`.

The product separates authoritative content, game rules, presentation, and
player persistence. A game screen consumes these contracts; it does not own
Sarf rules or scoring formulas.

## Content contract

Source: `src/content/types.ts` and `docs/content-schema.md`.

- `BaabRecord` owns a baab's pattern, meanings, examples, source notes, and review status.
- `Question` owns a stable ID, question type, baab/seegha scope, prompt, options, expected answer ID, explicit variants, explanation, and review status.
- `Quest` owns the session's scope, game mode, reward configuration, questions, and prerequisites.
- `ReviewStatus` is `draft | needs_review | verified` and is interpreted through `src/content/review.ts`.

UI receives content records and disclosure labels; it does not create Arabic
forms or silently normalize them.

## Question-generation contract

```ts
questQuestions(quest, mistakesOnly, mistakeIds): Question[]
```

The generator selects eligible questions for a full run or filters to saved
mistakes for practice. It must preserve source order unless a future mode
explicitly defines a reviewed shuffle policy.

## Answer-validation contract

```ts
validateOption(question, optionId): AnswerCheckResult
checkAnswer(submitted, expected, acceptedVariants, mode): AnswerCheckResult
```

- Multiple-choice answers use `option-id` mode.
- Arabic free-text answers must explicitly choose `exact` or `strip-tashkeel`.
- Tashkeel is never removed implicitly.
- Accepted variants are content-owned and auditable.

## Session contract

`GameSession` and `SessionStats` represent an in-progress or completed run.

- The session records answers, correctness, question IDs, and completion state.
- `sessionAccuracy` returns a percentage from the session results.
- Mistakes are question IDs, not copied Arabic text, so revised content can remain centralized.
- The presentation layer may show feedback but does not decide correctness.

## Scoring contract

`calculateStars` and `calculateSessionXP` in `src/lib/xp.ts` are pure
functions. Stars derive from quest thresholds; XP is based on accuracy, star
bonus, first-completion bonus, and explicit hint penalties.

XP measures participation. Baab mastery is persisted separately and must not
be inferred from XP alone.

## Progression and persistence contract

`PlayerProfile` is the local repository model. `src/lib/storage.ts` owns:

- loading/safely initializing a profile;
- saving a profile;
- awarding XP and handling level-up;
- recording best quest results and attempts;
- updating baab mastery;
- checking prerequisites.

Screens call these mutations after a completed session. They must not write
XP on answer selection and must guard against duplicate completion writes.

The storage API is intentionally replaceable with a cloud repository later.

## Presentation contract

Every game mode should expose the same player-facing states:

1. Intro / ready.
2. Active question.
3. Answer feedback.
4. Completed results.
5. Replay or targeted practice.

Each state must support touch, keyboard focus, readable Arabic RTL, reduced
motion, and a clear next action on mobile.
