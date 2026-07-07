# Contract: Mobile / A11y / Screenshot

**Purpose**: hold the responsiveness, accessibility, and visual-acceptance bars across every 024 change.

## Mobile (390)

- All changed surfaces render clean at 390px; B-13 fixes the teacher/student mobile topbar wrap; no horizontal overflow.
- Family home mobile length is acceptable (jump-nav is optional, not required in 024).

## A11y (`tests/a11y/run.cjs`)

- axe **critical == 0**, **serious == 0** preserved after every change.
- If B-03 Option A adds the topbar gate: `aria-disabled="true"` + descriptive `aria-label`; keyboard-focusable but non-activating (honest gate).
- If B-05 adds the planned nav item: non-anchor, labeled, `is-planned` — focus-safe.
- Dark/light + RTL/LTR both pass.

## Screenshots (`tests/screenshots/capture.cjs` + `REVIEW.md`)

Capture after-shots for: child-view page (B-01 note) · family note + teacher note (unchanged) · role-portal topbar (if B-03 gate) · teacher home (if B-05 item) · hub / family-portal / teacher-portal / student-portal after the density pass · dark-mode hero (if D-06) · mobile-390.

## Acceptance

- a11y suite green; screenshots captured + noted in `REVIEW.md`; mobile-390 clean; dark/light + RTL/LTR verified.

**Stop condition**: any new critical/serious a11y issue → STOP and report.
