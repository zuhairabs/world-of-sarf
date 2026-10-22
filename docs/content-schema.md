# Sarf Quest — Content and Gameplay Data Contract

## 1. General rules

The textbook content and the game presentation are separate layers.

A content record describes verified learning material.
A question record describes a task using that material.
A game session describes a player's attempt.
A progress record describes learning evidence over time.

All records use stable IDs. Never use a displayed Arabic string as the
only database identifier.

## 2. Curriculum record

Suggested fields:

- id: stable identifier
- bookId: textbook identifier
- chapterId: optional chapter identifier
- lessonId: lesson identifier
- baabId: optional baab identifier
- seeghaId: optional seegha identifier
- sourcePage: optional page reference
- arabicText: source-preserved Arabic text
- meaning: optional verified meaning
- explanation: optional verified explanation
- reviewStatus: draft | needs_review | verified
- sourceNotes: provenance and review information

Do not require a baab or seegha ID for every kind of entry. The source
book determines the appropriate classification.

## 3. Question record

Suggested fields:

- id: stable question identifier
- type: match | multiple_choice | construct | fill_table | identify
- curriculumRefs: references to source content
- prompt: question instructions
- expectedAnswer: verified answer representation
- acceptedVariants: explicitly approved alternatives
- distractors: optional answer options
- explanation: verified explanation
- difficulty: configured level
- reviewStatus: draft | needs_review | verified

A question may be generated from approved content, but its expected
answer and any new linguistic explanation must be reviewed.

## 4. Game session

Suggested fields:

- sessionId
- playerId or localPlayerId
- gameMode
- questionIds
- startedAt
- completedAt
- answers
- accuracy
- xpAwarded
- completionStatus

Each submitted answer should be processed exactly once.

## 5. Answer result

Suggested fields:

- questionId
- submittedAnswer
- isCorrect
- acceptedVariantId, when applicable
- timeTaken, when available
- hintUsed
- feedbackShown
- answeredAt

Do not require response time for untimed modes.

## 6. Player progress

Suggested fields:

- curriculumEntryId
- attempts
- correctAttempts
- recentPerformance
- lastReviewedAt
- nextReviewAt
- masteryState
- revisionRequired

Keep mastery and XP separate. XP is a game reward; mastery represents
evidence of learning.

## 7. Review states

draft:
Content is being authored and cannot be treated as approved.

needs_review:
Content is available for review but must not be presented as authoritative
curriculum.

verified:
The content has passed the required review process.

## 8. Validation requirements

- Validate content before publishing it.
- Reject references to missing curriculum entries.
- Verify that each question has an answer or an explicit evaluation rule.
- Reject unapproved accepted variants.
- Prevent duplicate reward transactions.
- Test RTL rendering with real Arabic data.
- Preserve original source text.
