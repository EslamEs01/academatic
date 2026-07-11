# Contract — teacherCategories Fold

**Decision:** fold-anchor to `teachers.html`. Count 0. No body edit.

## Must
- `nav.config.js`: `teacherCategories` → `implemented`, `route:'teachers.html'`; **remove** `FUTURE_ROUTES.teacherCategories`.
- The existing **`trn-categories`** drawer (teachers.js:70-84; "Manage categories" secondary button teachers.js:105/110) stays reachable and unchanged: display-only category list + inline Create form (name/status/description) + Save/assign gates.
- Final **Save** stays `common.backendRequiredNote`; **assign** stays `trn.cat.assignReason`.

## Must NOT
- No new standalone categories page.
- No fake category create / rename / delete / assign; fields INERT; list authored, no mutation.
- No edit to the `teachers.html`/`teacher.html` `#page-body`.

## Acceptance
- Smoke: `teacherCategories` anchor → teachers.html; `trn-categories` drawer + Create form + Save/assign gates present; no fake mutation.
- `FUTURE_ROUTES.teacherCategories` removed.
- Diff proof: `teachers.html` body byte-identical.
