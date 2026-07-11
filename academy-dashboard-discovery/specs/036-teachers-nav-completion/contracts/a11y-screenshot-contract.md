# Contract — A11y & Screenshots

## A11y (`tests/a11y/run.cjs`) — additive rows
- `teacher-performance` `#view=sessions-kpi` — AR light + dark, EN light.
- `teacher-performance` `#view=monthly` — AR light + dark, EN light.
- `teacher-performance` mobile-390 (one of the new tabs).
- `teacher-performance` open detail drawer (if a tab drawer is built).
- teachers.html Add-Teacher / Teacher-Categories drawer states covered by existing teachers open-drawer rows (add only if a new state needs its own row).
- **Result required: critical=0, serious=0.** (Watch scrollable-region-focusable on any board table wrapper → `tabindex="0" role="region" aria-label` per tasks.js:99.)

## Screenshots (`tests/screenshots/capture.cjs`) — additive frames
- teachers Add-Teacher fold proof (open `trn-add`) + Teacher-Categories fold proof (open `trn-categories`).
- `teacher-performance` `#view=sessions-kpi` + `#view=monthly` (via the runner's `view:` → `#view=` hash).
- Variants: AR + EN, light + dark, mobile-390.
- **Result required: 0 console errors.** Update `screenshots/REVIEW.md` with the new sp036 frames.

## Rules
- Additive only; no existing a11y row or screenshot frame removed.
- The existing `teacher-performance` (overview) rows/frames stay valid (overview = default tab).
