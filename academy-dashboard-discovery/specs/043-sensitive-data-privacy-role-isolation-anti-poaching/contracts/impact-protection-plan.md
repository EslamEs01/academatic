# Contract 13 — Impact Protection (non-destructive before/after) — executable

## Method (never `stash`/`reset`/`checkout`)

A per-page `#page-body` md5 snapshot of all 115 built pages was captured at HEAD `cd56aa0` this plan phase (in
the scratchpad). After the implement-phase edits + `npm run build`, re-snapshot and diff against the baseline.
The diff must be EXACTLY the predicted set below.

## Predicted changed page bodies (exactly 6)

| Base | AR | EN | Why |
|---|---|---|---|
| `staff` | ✓ | ✓ | permDrawer renders the 5 parent-contact rows |
| `teacher` | ✓ | ✓ | the `trn-policy` drawer + its trigger |
| `student-profile` | ✓ | ✓ | 3→2 gate cards |

**Every other page body byte-identical.** Specifically byte-identical: all other admin bodies · all 16 portal
pages except `student-profile` · `index.html` · the gallery pair · `family-profile`/`teacher-profile` (their
password gates unchanged) · every non-changed teacher/family/student surface.

## Shared shell / sidebar

Expected shell/sidebar change = **ZERO** (the drawers are page-body content, not shell; `sidebar.js`/`nav.config.js`
0-diff). If any shell/sidebar delta appears, STOP — it was not predicted.

## Forbidden-file 0-diff (must be byte-identical after build)

`nav.config.js` · `enhance.js` · `components/sidebar.js` · `i18n.js` · `scripts/build-html.mjs` · `package.json`
· `pages/staff.js` · `pages/family-profile.js` · `pages/teacher-profile.js` ·
all `components/*` · `app.css`. **`pages/student-profile.js` is NOT on this list** — its executable code
(imports/render onward) is byte-identical, but its header comment is corrected three→two gates (a comment-scoped
source diff; see the expected source diff below).

## Generated output

`public/*.html` regenerates only during the **implement** phase (via `npm run build`), never during planning.
This planning phase leaves `public/` byte-identical (verified: the plan-phase build produced 0 changed files).

## Proof at implement time

`git diff --stat -- app/public` shows exactly the 6 HTML + their built-asset dependencies; `git diff -- app/src`
shows exactly `portal.js` (−1), `student-profile.js` (**header comment only** — three→two gates; executable code
byte-identical), `staff-management.js` (+1 group), `teacher-management.js` (+registry), `teacher.js`
(+drawer+trigger), the 4 locale files; `git diff -- app/tests` shows the additive asserts + the 2-line
supersession. The `#page-body` md5 diff = **exactly the 6 rows above** — the `student-profile.js` header comment
is not rendered into any body, so it creates **no additional page body and no asset change** (the child-view body
still changes only by the fixture-driven 3→2 cards, already counted).
