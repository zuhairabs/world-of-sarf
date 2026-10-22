# Sarf Quest — Design System and Product Experience

## 1. Product identity

Working name: Sarf Quest

Product category: Game-first Arabic morphology learning web app.

Core promise:
Master Sarf by playing, exploring, building words, and completing quests.

Personality:

- Curious
- Scholarly
- Adventurous
- Encouraging
- Satisfying
- Never childish by default

The product must respect the seriousness of Arabic language study while
making repeated practice enjoyable.

## 2. Design philosophy

The app is a game world, not a website with gamification.

The game world provides context, motivation, and progression.
The actual challenges train recall and accurate production of Sarf.

Use two distinct visual modes:

A. EXPLORATION MODE

- Illustrated environments.
- Visible quest paths.
- Landmarks and unlockable locations.
- Player level, currency, and next objective.
- Optional character/avatar and achievement displays.

B. CHALLENGE MODE

- Clean, focused play area.
- Arabic forms presented prominently.
- Large answer targets.
- Clear progress through the current challenge.
- Immediate feedback.
- Minimal decorative motion while the learner is thinking.

The transition between exploration and challenge should feel like entering
a mission, not opening a form.

## 3. Art direction

Theme: The World of Sarf.

Create an original illustrated world inspired by:

- Manuscripts and libraries.
- Geometric architectural patterns.
- Desert paths, gardens, mountains, and courtyards.
- Lanterns, ink, paper, carved wood, and stone.
- Subtle magical or discovery motifs.

Avoid presenting the world as a stereotypical or historically inaccurate
depiction of Arab or Islamic culture. Use respectful, considered art
direction. Avoid sacred text as decoration or game currency.

Use a cohesive art style:

- Illustrated backgrounds with controlled detail.
- Tactile, slightly dimensional buttons and quest objects.
- Consistent lighting and material treatments.
- Clear silhouettes at small sizes.
- Original icons and illustrations.
- No random mixture of stock-photo, emoji, and unrelated cartoon styles.

Build a small reusable art asset library. Prefer a few excellent
environments and reusable props over many inconsistent images.

## 4. Color system

Use the following initial palette as design tokens.

--ink: #243047
--parchment: #F4E9D2
--paper: #FFF8EB
--forest: #245B48
--jade: #3D8768
--gold: #E6B65C
--terracotta: #C76F4A
--sky: #8FC4D7
--muted: #7A786F

Usage:

- Ink: primary text and dark interface surfaces.
- Parchment and paper: manuscripts, question surfaces, and learning panels.
- Forest and jade: exploration, progress, and positive feedback.
- Gold: rewards, XP, quest highlights, and premium accents.
- Terracotta: warnings, damage, and selected challenge accents.
- Sky: water, navigation accents, and secondary highlights.
- Muted: supporting information.

These are starting tokens, not permission to ignore contrast.
Validate text contrast and all interactive states.

Do not make the entire app parchment-colored.
The world map should have rich environmental colors and depth, while
question surfaces should prioritize legibility.

Use semantic tokens for success, error, warning, and neutral states.
Do not communicate meaning through color alone.

## 5. Typography

Use a high-quality Arabic font with reliable shaping and tashkeel support.
Evaluate Noto Naskh Arabic and Noto Sans Arabic for the relevant contexts.

Suggested pairing:

- Arabic learning content: a legible Naskh-style font.
- UI labels and navigation: a clear Arabic sans-serif where appropriate.
- Latin technical labels: a restrained, readable sans-serif.

Arabic must be tested with real examples from the textbook.

Requirements:

- Never clip tashkeel.
- Provide sufficient line height.
- Avoid excessive letter spacing.
- Do not use decorative Arabic lettering for answer options.
- Use a larger type scale for target Arabic forms than for surrounding UI.
- Test Arabic with diacritics, punctuation, and mixed Latin text.

## 6. Layout and navigation

Desktop:

- Large illustrated central play area.
- Compact player status and quest information.
- No persistent enterprise-style sidebar.
- Optional small contextual controls around the game world.

Mobile:

- Full-width game scene.
- Compact top HUD for level, XP, and hearts where applicable.
- Large touch targets.
- Bottom navigation for World, Practice, Collection, and Profile if needed.
- Avoid tiny floating controls over important Arabic content.

Navigation should remain contextual and game-like.
Use the world map as the main home screen.

## 7. Core screens

### A. Game World / Home

Must include:

- Illustrated map or connected level path.
- Current player level and XP.
- A clear next recommended quest.
- Locked and unlocked locations.
- A visible daily objective.
- A way to resume the previous session.
- A secondary path to free practice.

Do not use a grid of generic course cards as the main layout.

### B. Quest Introduction

Must include:

- Quest title.
- Short objective.
- Relevant baab or seegha scope.
- Reward preview.
- Start button styled as a physical game object.
- Optional concise reminder of the pattern.

Keep this screen brief.

### C. Active Challenge

Must include:

- Current question and challenge progress.
- A prominent Arabic form or word-building area.
- Answer choices, tiles, or Arabic input depending on game mode.
- Clear selection and focus states.
- Submit or check action when appropriate.
- Optional exit and pause controls.
- No distracting background animation behind Arabic text.

Do not make every question a multiple-choice card.

### D. Answer Feedback

Correct:

- Brief satisfying animation.
- Positive sound where enabled.
- Explanation or relevant pattern clue.
- Continue action.

Incorrect:

- Clear, respectful feedback.
- Show the correct answer and why it is correct.
- Allow retry when appropriate.
- Save the mistake for later practice.

Never punish a learner for not knowing a new form.

### E. Quest Results

Must include:

- XP earned.
- Accuracy and questions completed.
- Stars or a mastery grade based on meaningful criteria.
- New unlocks where applicable.
- Mistakes worth revisiting.
- Replay, revise mistakes, and continue actions.

Avoid overwhelming learners with charts.

### F. Collection / Mastery Book

A game-themed archive of learned abwaab and seeghas.
It should feel like collecting knowledge, not browsing a spreadsheet.

Include:

- Learned and locked entries.
- Mastery states.
- Verified Arabic examples.
- Quick practice from an entry.
- Clear distinction between textbook content and optional notes.

### G. Revision Journey

An optional path that presents questions due for review.
Use a quest metaphor, but keep the review algorithm evidence-based.

### H. Profile and Settings

Keep functional settings simple.
Provide controls for sound, reduced motion, text size where practical,
and account settings when accounts exist.

## 8. Game interaction principles

Every important interaction should have:

- A visible response.
- A clear state change.
- Appropriate feedback.
- A reasonable animation duration.
- Keyboard and touch support.

Buttons may have subtle pressed depth, bounce, or spring motion.
Use motion to explain an action or reward, not merely to decorate.

Suggested timing:

- Button response: approximately 100–180 ms.
- Answer feedback: approximately 180–350 ms.
- Major reward reveal: approximately 350–650 ms.

Treat these as initial targets; validate them in the browser.

Respect prefers-reduced-motion.

Do not delay the next question with long reward animations.
Never make animation necessary to understand whether an answer was correct.

## 9. Game economy

Use a small, understandable reward system:

- XP for completed practice.
- Stars for challenge performance.
- Unlocks for mastery.
- Achievement badges for milestones.
- Optional cosmetic rewards.

Avoid pay-to-win mechanics and punitive streak loss.

Do not award most XP for guessing or repeatedly farming easy questions.
Reward accurate answers, productive retries, and returning to difficult
material.

Separate activity rewards from mastery:
XP measures participation; mastery reflects demonstrated learning.

## 10. Game mode visual identities

Seegha Match:
A fast matching arena with tactile answer targets.

Word Builder:
A workbench or word-construction surface with root and pattern tiles.
Arabic letters must remain in the correct visual and logical order.

Baab Detective:
A clue-driven investigation scene where learners compare patterns.

Sarf Speed Run:
A focused challenge with a visible but non-distracting timer.
Always provide untimed practice.

Complete the Tasreef:
A manuscript or table reconstruction puzzle. Maintain the actual
textbook sequence and allow the full table to remain readable.

Boss Battle:
A special challenge environment that mixes eligible previously learned
material. Difficulty should come from recall and discrimination, not
ambiguous wording or trick questions.

Each mode should use the same underlying question and scoring contracts.

## 11. Arabic correctness and readability

- Render Arabic with correct shaping.
- Use logical RTL layout for Arabic reading and input.
- Preserve the original order of characters.
- Do not reverse strings to simulate RTL.
- Preserve source tashkeel.
- Ensure punctuation and numerals behave sensibly in mixed-direction text.
- Test on real mobile browsers.
- Do not crop letters or diacritics in animations.
- Avoid drag-and-drop as the only answer mechanism.

## 12. Accessibility

- Keyboard-accessible controls.
- Visible focus indicators.
- Adequate contrast.
- Screen-reader labels.
- Non-color indicators for feedback.
- Reduced-motion support.
- Untimed alternatives.
- No essential information conveyed by audio alone.
- Generous touch targets.

## 13. Responsive behavior

At minimum, verify:

- 360 px wide mobile viewport.
- 390 px wide mobile viewport.
- Tablet portrait.
- Desktop at 1280 px and above.

Prevent:

- Horizontal overflow.
- Arabic clipping.
- Tiny answer targets.
- Map controls overlapping each other.
- Game UI covering the question.
- Virtual keyboard obscuring Arabic input.

## 14. Quality bar

The first playable build should have:

- One polished world-map screen.
- One polished quest introduction.
- One fully playable challenge.
- Correct/incorrect feedback.
- A results/reward screen.
- Persistent local progress.
- Responsive layouts.

Prefer one excellent end-to-end game loop over a large collection of
unfinished screens.

Every new screen must be evaluated against this question:

Would a player recognize this as an adventure game before reading any text?
