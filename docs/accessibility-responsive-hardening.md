# Responsive and accessibility hardening — Phase 7

The current vertical slice uses the following hardening contract:

## Responsive matrix

| Viewport | Required behavior |
| --- | --- |
| 360 × 800 | Map labels stay inside the scene; answer targets stack; quest content and actions remain reachable without horizontal scrolling. |
| 390 × 844 | Arabic plaques retain generous line-height; footer and safe-area padding do not collide with the primary action. |
| 768 × 1024 | Challenge answers retain a comfortable two-column layout and the intro/reward scenes remain centred. |
| 1280 × 800+ | Map composition remains capped and centred; challenge content does not become an overly wide reading line. |

## Accessibility contract

- Active quest content receives focus when moving between intro, challenge, and
  results screens.
- A skip link provides keyboard access to the active quest content.
- Feedback uses a polite live status with text, icons, and explanation; color
  is never the only correctness signal.
- Arabic nodes use explicit `lang="ar"`, `dir="rtl"`, preserved tashkeel, and
  increased line-height. Mixed English/Arabic content remains in separate nodes.
- Answer targets are native buttons with visible focus, pressed state, and
  keyboard shortcuts (`A–D` and `1–4`).
- The challenge is untimed by default.
- Reduced motion disables quest pulses, reward movement, and interaction
  transitions without removing state information.
- Safe-area padding and minimum touch target rules apply to mobile actions.

There is no Arabic free-text input in the current slice, so virtual-keyboard
behavior is reserved for a future input-based game mode. Rendered viewport and
screen-reader checks are kept for the next batch verification pass.
