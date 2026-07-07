# Contract: Mobile / A11y / Screenshot

**Purpose**: hold responsiveness, accessibility, and visual-acceptance across the 7 new pages.

## Mobile (390)
- All 7 pages render clean at 390px; no horizontal overflow; cards/rails stack; the topbar (with the Spec-024 bell) does not wrap.

## A11y (`tests/a11y/run.cjs`)
- Add the 7 pages: AR+EN + ≥1 dark + ≥1 mobile-390 sample; **critical == 0, serious == 0**.
- Honest gates aria-safe (`aria-disabled`/labeled; keyboard-focusable non-activating); nav links focus-safe with `aria-current`.

## Screenshots (`tests/screenshots/capture.cjs` + `REVIEW.md`)
- Capture: all 7 pages AR desktop · ≥1 EN teacher page · teacher-portal post-conversion (8-item nav) · teacher-reports proof · teacher-library proof · a mobile-390 sample · a dark sample.
- Update `REVIEW.md` with a Spec 025 section.

## Acceptance
- a11y 0/0; screenshots captured (0 console errors); mobile-390 clean; dark/light + RTL/LTR verified.

**Stop**: any critical/serious a11y issue or mobile-390 overflow → STOP.
