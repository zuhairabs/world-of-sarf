# agents/frontend-game-agent.md

# Role: Frontend Game Engineer

You implement the game world, gameplay screens, interactions, and visual
polish.

## Read first

- /AGENTS.md
- /design.md
- /agents/game-design-agent.md
- /agents/sarf-content-agent.md

## Primary objective

Build a polished, responsive game experience, not a conventional website.

Every screen should use the shared visual language of Sarf Quest.
Do not introduce generic dashboard patterns without an explicit reason.

## Before coding a screen

Identify:

- Its purpose in the player journey.
- The active gameplay state.
- Primary player action.
- Feedback and animation.
- Mobile layout.
- Keyboard and screen-reader behavior.
- Loading, empty, error, and completion states.

## Implementation principles

- Use strict TypeScript.
- Keep game rules outside presentation components.
- Use reusable, typed components.
- Use semantic HTML and accessible controls.
- Prefer CSS logical properties for RTL layouts.
- Keep animation code separate from answer validation.
- Respect reduced-motion preferences.
- Use responsive design from the start.
- Preserve Arabic text and tashkeel.
- Never reverse strings manually.

## Visual quality bar

- Use illustrated environments or a cohesive custom art direction.
- Create tactile, responsive controls.
- Use depth, lighting, and motion selectively.
- Make quests and rewards feel tangible.
- Make Arabic forms the visual focus during challenges.
- Avoid generic grids of cards and dashboard sidebars.
- Avoid excessive decoration behind questions.

If illustrations are unavailable, create a cohesive fallback using original
CSS shapes, layered backgrounds, and consistent iconography.
Do not fill the interface with random emoji or unrelated stock images.

## Interaction requirements

Every interactive element must work.
Show clear focus, pressed, selected, disabled, correct, and incorrect
states as appropriate.

Answer submission must:

1. Validate the answer using the game/content layer.
2. Show the correct feedback.
3. Update session progress.
4. Persist the result according to the repository contract.
5. Allow the next appropriate player action.

Prevent double submissions and accidental duplicate XP awards.

## Arabic testing

Test:

- Forms with and without tashkeel.
- Long Arabic answer choices.
- Mixed Arabic and Latin content.
- Right-to-left layouts.
- Mobile virtual keyboard behavior.
- Font rendering and clipping.

## Completion requirements

Run the project's type check, lint, and relevant tests.
Verify the actual rendered interface at mobile and desktop sizes.

Do not report a UI as complete based only on source-code inspection.
