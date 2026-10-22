# Adventure world — Phase 3

The default route is the Sarf Quest world map. It is intentionally a playable
scene rather than a lesson catalogue: the learner sees a current quest marker,
follows a visible path toward the Lantern Library, and uses the bottom action
to enter the same quest on a phone.

## Map states

- **Available:** the Lantern Library marker uses the warm quest light and says
  `START QUEST`.
- **Completed:** the marker shifts to the jade completion treatment and says
  `REPLAY QUEST`; the player can practise the same quest again.
- **Locked:** Mirror Gardens and Summit Citadel remain desaturated and labelled
  as locked regions. They are map landmarks, not inactive-looking buttons.
- **Unlocked landmark:** The First Gate is labelled for assistive technology as
  an unlocked landmark.

## Composition

The map is made from layered ridges, a river, dashed travel paths, atmospheric
haze, landmarks, the quest marker, captions, and a compass. The composition is
fluid rather than tied to one illustration asset: the map stage scales between
mobile, tablet, and wide desktop widths while keeping the quest marker central.

The HUD carries only the player level, XP, daily quest count, and the current
objective. This keeps progression visible without turning the landing screen
into a dashboard.

## Responsive validation matrix

| Viewport | Composition target |
| --- | --- |
| 360 × 800 | Quest marker remains central; labels may wrap; primary action is full-width below the map. |
| 390 × 844 | Map legend and captions remain readable without horizontal overflow. |
| 768 × 1024 | Map height scales with viewport; footer remains grouped below the scene. |
| 1280 × 800 | Map is centred with generous negative space; marker and paths remain visually dominant. |
| 1440 × 900 | Wide map is capped at a comfortable reading width; HUD and footer align to the scene. |

Rendered viewport checks are kept for the next batch verification pass, as
requested, rather than being run after every implementation phase.
