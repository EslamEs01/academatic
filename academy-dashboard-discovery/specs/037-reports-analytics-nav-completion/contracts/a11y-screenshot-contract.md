# Contract — A11y & Screenshots

## A11y (`tests/a11y/run.cjs`) — additive rows
- `reports` `#view=monthly` — AR light + dark, EN light.
- `reports` `#view=analysis` — AR light + dark, EN light.
- `families` `#view=categories` — AR light + dark, EN light.
- `students` `#view=results` — AR light + dark, EN light.
- `students` `#view=evaluation` — AR light + dark, EN light.
- Mobile-390 (one row each): `reports#view=monthly`, `reports#view=analysis`, `families#view=categories`, and one of `students#view=results`/`#view=evaluation` (mirrors the Spec-036 "one of the new tabs" precedent for the paired view).
- Open-drawer state: `families#view=categories` with the existing `fam-cat` reclassify drawer open (new tab context, existing drawer).
- **Result required: critical=0, serious=0.** (Watch scrollable-region-focusable on any new board table/list wrapper → `tabindex="0" role="region" aria-label`, per the Spec-036 `tasks.js:99` precedent.)

## Screenshots (`tests/screenshots/capture.cjs`) — additive frames
- `reports` overview tab (default, no hash) — preservation proof frame.
- `reports#view=monthly` — the new monthly board.
- `reports#view=analysis` — the new analysis board.
- `families#view=categories` — the Categories board (+ one frame with the `fam-cat` drawer open).
- `students#view=results` — the Results board.
- `students#view=evaluation` — the Evaluation board.
- Variants per new board: AR + EN, light + dark, mobile-390 (5 boards × up to 4 variants ≈ 20 new frames, + the 1 overview-preservation frame + the 1 open-drawer frame).
- **Result required: 0 console errors.** Update `screenshots/REVIEW.md` with the new sp037 frames.

## Rules
- Additive only; no existing a11y row or screenshot frame removed.
- The existing `reports` (overview), `families` (directory), `students` (directory) rows/frames stay valid — overview/directory are the default tabs and must render structurally/visually unchanged.
- Every deep-link row/frame is captured via a fresh navigation to `#view=...` (no in-page tab click first), matching the smoke fresh-context rule.
- Dark-mode and RTL(AR)/LTR(EN) must both be exercised on every new board at least once.
