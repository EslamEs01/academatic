# Contract — A11y & Screenshots

## A11y (`tests/a11y/run.cjs`) — additive rows
- `schedule-search` AR — light + dark.
- `schedule-search` EN — light + dark.
- `schedule-search` mobile-390.
- `schedule-search` open detail drawer (if built) / open filter state.
- student deep-link tabs (`student.html#view=results`, `#view=evaluation`) covered by existing student.html rows (add only if the deep-linked state needs its own row).
- **Result required: critical=0, serious=0.** (Watch scrollable-region-focusable on any results table wrapper → add `tabindex="0" role="region" aria-label` as in tasks.js:99.)

## Screenshots (`tests/screenshots/capture.cjs`) — additive frames
- schedule-search: search form, a results state, empty state.
- families fold proof: families.html with category filter (+ `fam-cat` drawer open).
- `student.html#view=results` (Results tab active).
- `student.html#view=evaluation` (Evaluation tab active).
- Variants: AR + EN, light + dark, mobile-390.
- **Result required: 0 console errors.** Update `screenshots/REVIEW.md` with the new frames.

## Rules
- Additive only; no existing a11y row or screenshot frame removed.
- Any capture handler that fills the schedule-search filter must not trigger a network call.
