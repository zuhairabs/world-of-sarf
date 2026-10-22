# Sarf Quest — Project Instructions

## 1. Mission

Build a polished, game-first web app that helps learners master Arabic
Sarf using the learner's existing Sarf textbook, including its abwaab,
seeghas, tasreef tables, examples, and terminology.

The experience must feel like a real game that teaches Sarf, NOT a
conventional website that contains quizzes.

Product name: Sarf Quest (working title).

Primary objective:
Help learners recognize, recall, construct, and accurately reproduce
the seeghas and tasreef patterns taught in their textbook.

## 2. Non-negotiable product principles

1. GAME FIRST.
   The home screen is a game world, quest map, or level-selection scene.
   Do not make a dashboard, admin panel, or list of course cards the
   default landing screen.

2. LEARNING THROUGH ACTION.
   Every session should involve answering, constructing, matching,
   recalling, or correcting Arabic forms.

3. INSTANT FEEDBACK.
   Answers produce meaningful visual and audio feedback where supported.
   Explain errors and let learners try again.

4. PROGRESSION THAT FEELS EARNED.
   Use quests, XP, stars, unlockable regions, achievements, and boss
   battles. Rewards must reflect actual learning.

5. ARABIC CORRECTNESS.
   Never invent or silently modify a Sarf rule, Arabic form, vowel,
   tashkeel, meaning, or conjugation.

6. MOBILE FIRST.
   The app must work beautifully on phones, tablets, and desktops.
   Arabic input and Arabic text must be first-class experiences.

7. SHORT PLAY SESSIONS.
   Design meaningful 2–5 minute quests and optional longer practice.

8. ACCESSIBLE GAMEPLAY.
   Do not communicate correctness only through color or sound.
   Support reduced motion, keyboard use, readable text, and a usable
   non-timed practice mode.

## 3. Default player experience

The normal player flow is:

Game World
  -> Select an unlocked quest
  -> Enter a game scene
  -> Complete a short challenge
  -> Receive feedback
  -> Earn XP and mastery progress
  -> See the reward animation
  -> Continue to the next quest or revisit mistakes

The learner should be able to start playing with minimal friction.

Do not require account creation before the first playable quest.

## 4. Game-first visual direction

Use the design specification in design.md as the visual source of truth.

The visual direction is a premium illustrated adventure game:
- A cohesive world map with unlockable regions and paths.
- Illustrated landmarks, shrines, gates, libraries, and challenge arenas.
- Quest nodes that look like physical objects in the world.
- Large, tactile, game-like controls.
- Strong visual hierarchy and generous spacing.
- Subtle depth, layered environments, and restrained animation.
- Arabic typography that remains crisp and readable.

Avoid:
- Generic SaaS layouts.
- A white page with a navbar and a grid of lesson cards.
- Spreadsheet-like progress tables on the player home screen.
- Excessive glassmorphism, generic gradients, and floating dashboard cards.
- Emoji as the primary illustration system.
- Confetti after every small action.
- Excessive gamification that distracts from learning.

The visual world should be original. Do not copy recognizable characters,
maps, or proprietary art from existing games.

## 5. Curriculum and content rules

The learner's textbook is the source of truth.

The curriculum may include 14 seeghas and multiple abwaab such as
إفعال، تفعيل، افتعال، تفاعل, according to the actual textbook.

Do not assume the textbook's exact ordering, labels, examples, or
classification without inspecting its contents.

Store content separately from UI and game logic.

Every published content item should support:
- Stable ID.
- Book, chapter, lesson, and page references where available.
- Baab and seegha identifiers where applicable.
- Arabic text, including tashkeel when supplied.
- Question type and accepted answer variants.
- Explanation and source notes.
- Review status.

Content should have a status:
- draft
- needs_review
- verified

Only verified content may be presented as authoritative teaching content.

AI-generated Arabic forms must not automatically become verified.
A qualified reviewer must approve them.

Do not silently normalize away tashkeel or Arabic letter distinctions.
Any answer normalization must be explicit, tested, and limited to approved
variants.

## 6. Game mechanics

Implement these game types as reusable game modes:

1. Seegha Match
   Match a form to its name, category, or meaning.

2. Word Builder
   Construct a form from a supplied root and target pattern.

3. Baab Detective
   Identify a pattern using the examples and rules taught in the book.

4. Sarf Speed Run
   Timed recall, with an untimed alternative.

5. Complete the Tasreef
   Fill missing entries in a conjugation table.

6. Boss Battle
   Mixed questions drawn from previously unlocked and eligible content.

Each game mode must separate:
- Question generation.
- Answer validation.
- Feedback and explanation.
- Scoring.
- Progression events.
- Visual presentation.

Avoid duplicating the learning rules across individual game screens.

## 7. Recommended technical foundation

Use a modern TypeScript web stack:
- Next.js with React.
- TypeScript in strict mode.
- Tailwind CSS for styling.
- A reusable component system.
- A lightweight animation library such as Motion.
- A typed content model with validation.
- Local persistence for the first playable prototype.
- A repository abstraction so cloud storage can be added later.
- Supabase for accounts and cloud progress when needed.
- Automated unit and browser tests.

Check the existing repository and package versions before introducing
dependencies. Do not replace working infrastructure without a reason.

Prefer simple, modular architecture over premature complexity.

## 8. Suggested application boundaries

Separate these concerns:

- Game world and navigation.
- Quest and progression system.
- Game session engine.
- Individual game modes.
- Sarf content repository.
- Arabic answer validation.
- Player profile and mastery.
- Persistence.
- Shared game UI and animation primitives.

Components should not contain the authoritative Sarf rules.

Use typed data structures and pure functions for answer validation
where possible.

## 9. Arabic and RTL requirements

- Set appropriate Arabic language metadata for Arabic content.
- Use dir="rtl" for Arabic text containers.
- Use dir="ltr" for Latin-only technical labels when appropriate.
- Prefer logical CSS properties over left/right-specific positioning.
- Keep Arabic words intact; do not reverse characters manually.
- Preserve supplied tashkeel.
- Use a suitable Arabic font and verify shaping in supported browsers.
- Ensure mixed Arabic and Latin text renders correctly.
- Make Arabic answer input comfortable on mobile.
- Never apply CSS transformations that visually reverse Arabic text.

## 10. Development workflow

Before implementation:
1. Inspect the repository and existing code.
2. Read AGENTS.md, design.md, and relevant specialist instructions.
3. Identify the smallest complete playable milestone.
4. Document uncertainties rather than inventing curriculum content.

During implementation:
1. Build end-to-end playable slices.
2. Use real, verified sample content when available.
3. If the book has not been supplied, clearly label demonstration content.
4. Keep the app playable while adding features.
5. Run tests and type checks after meaningful changes.
6. Fix root causes rather than suppressing errors.

Do not build all six games as disconnected mockups before making one
game genuinely playable.

## 11. Definition of done

A feature is done only when:
- It works on a real rendered screen.
- It follows design.md.
- It has real interactions, not placeholder buttons.
- It handles correct and incorrect answers.
- It works with Arabic text and RTL layout where relevant.
- It preserves player progress as specified.
- It has appropriate loading, empty, and error states.
- It is usable on mobile.
- Relevant tests pass.
- It does not introduce unverified Sarf claims.

For every UI implementation, ask:
"Does this look and feel like a game, or like a normal website?"

If the answer is a normal website, revise the design before proceeding.