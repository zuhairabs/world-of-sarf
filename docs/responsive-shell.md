# Sarf Quest — Responsive Shell QA Matrix

Phase 2 implementation reference. These checks are intentionally recorded for
the next batch verification pass; they are not being run on every task.

## Viewports

| Viewport | Primary check |
| --- | --- |
| 360 × 800 | Smallest supported phone layout, no horizontal overflow |
| 390 × 844 | Primary phone composition and touch spacing |
| 768 × 1024 | Tablet portrait map and challenge balance |
| 1280 × 800 | Desktop world composition and focused challenge width |
| 1440 × 900 | Large desktop spacing and max-width containment |

## Shell checks

- [ ] No document-level horizontal scroll.
- [ ] Safe-area padding keeps HUD and bottom actions away from device cutouts.
- [ ] Primary actions and answer targets are at least 44px tall on mobile.
- [ ] Arabic text retains shaping and tashkeel without clipping.
- [ ] Answer targets stack at narrow widths and use a balanced grid at wider widths.
- [ ] Map remains a world scene rather than collapsing into a dashboard/card grid.
- [ ] Focus rings are visible for keyboard navigation.
- [ ] Reduced motion preserves state changes and removes decorative looping motion.
- [ ] Locked, selected, disabled, correct, and incorrect states remain understandable without color alone.

## Phase 2 implementation notes

- Shared tokens now include spacing, control radius, focus ring, control depth,
  and motion timing values.
- The shell uses `svh`/`dvh`, safe-area insets, `overflow-x: clip`, and a
  full-width root to prevent mobile viewport spill.
- Arabic containers use explicit RTL direction, `unicode-bidi: plaintext`,
  increased line-height, and font-synthesis suppression.
- Tablet and desktop overrides preserve the same world/challenge composition
  while widening the stage instead of adding persistent navigation chrome.
