# Impact Ledger

## Accepted baseline

- Commit: `722be1c37904f0fd44d666553e91239d7e8b4400`.
- HTML: 115; localized product pages/page bodies: 114; Teacher localized bodies: 22.
- Teacher source page modules: 11.
- Expected added/removed pages: 0/0.

## Accounting after session 4 — all eleven Teacher scopes implemented

Measured by `impact.cjs` against the committed feature baseline `32e51e5`.

| Count | Value |
|---|---|
| HTML files | **115** (baseline 115) |
| Pages added / removed | **0 / 0** |
| Page bodies changed | **26** |
| Page bodies unchanged | **88** |

**Teacher-scope bodies changed: 22 — all eleven scopes × AR/EN**, i.e. the complete Spec-045 surface:
`teacher-portal` · `teacher-schedule` · `teacher-students` · `teacher-outcomes` · `teacher-tasks` ·
`teacher-reports` · `teacher-library` · `teacher-profile` · `teachers` · `teacher` · `teacher-performance`.

**Non-Teacher bodies changed: 4** — `student-portal(.en)` and `family-portal(.en)`, still the single
shared-key `prt.band.quickHint` correction, one line each. No further non-Teacher body drifted as the
remaining five pages landed. **Unrelated page-body drift remains 0.**

### Changed authored files after session 4 (14)

`styles/app.css` · `pages/teacher-portal.js` · `pages/teacher-schedule.js` · `pages/teacher-students.js` ·
`pages/teacher-outcomes.js` · `pages/teacher-tasks.js` · `pages/teacher-reports.js` ·
`pages/teacher-library.js` · `pages/teacher-profile.js` · `pages/teachers.js` ·
`components/teacher-actions.js` · `pages/teacher-performance.js` · `locales/ar.prt.js` +
`locales/en.prt.js` + `locales/ar.trn.js` + `locales/en.trn.js` · `tests/smoke/run.cjs`.

---

## Earlier accounting (session 2/3 — superseded by the table above)

Measured by `impact.cjs`, which extracts each page's `#page-body` from the working tree and from the
**committed baseline read through `git show`**, and fails loud on a missing or duplicate body or a
parse failure rather than falling back to a whole-file comparison. Baseline `HEAD` = `32e51e5`,
whose app bytes are identical to `722be1c` (that commit added only Spec-045 documents).

| Count | Value |
|---|---|
| HTML files | **115** (baseline 115) |
| Pages added | **0** |
| Pages removed | **0** |
| Page bodies changed | **14** |
| Page bodies unchanged | **100** |
| Parse failures | 0 real — the one reported entry is `index.html`, the redirect stub, which legitimately has no `#page-body` |

### Teacher-scope bodies changed (10)

`teacher-portal` · `teacher-schedule` · `teacher-library` · `teacher` · `teacher-performance`, each ×AR/EN.

### Non-Teacher bodies changed (4) — declared, attributable, one line each

`student-portal.html`, `student-portal.en.html`, `family-portal.html`, `family-portal.en.html`.

**Reason:** `prt.band.quickHint` is a locale key shared by all three role homes. It read «صفحات لوحتك — تصل تباعًا» / "Your dashboard pages — arriving soon". Student and family quick tiles were **already** all real links, so that sentence was a **pre-existing falsehood on those two pages too**. Correcting it is a truthfulness fix, not a redesign: the diff is **exactly one `<span class="pt-sec-hint">` line per page**, verified with `git diff`. FR-010 (no unrelated redesign) holds. The rejected alternative — forking a teacher-only key — would have knowingly preserved a false sentence on two pages.

**Unrelated page-body drift: 0.** Every one of the 14 changed bodies is attributable to a named Spec-045 requirement.

### Changed authored files (9)

| File | Owner | Why |
|---|---|---|
| `app/src/styles/app.css` | Claude | T014 additive `td-*` layer (appended after the `@layer components` block) |
| `app/src/js/pages/teacher-portal.js` | Kimi (B) | FR-012 quick-tile truth + `td-focus` |
| `app/src/locales/ar.prt.js` | Kimi (B, C1) | FR-013 reports copy, quick-hint truth, library `searchPh` |
| `app/src/locales/en.prt.js` | Kimi (B, C1) | mirror of the above |
| `app/src/js/pages/teacher-schedule.js` | Kimi (C1) | `td-gates` gate grouping + `td-focus` |
| `app/src/js/pages/teacher-library.js` | Kimi (C1) + Claude correction | FR-024/025 search, `td-gates`, `td-focus`; lead added the trailing-whitespace containment |
| `app/src/js/components/teacher-actions.js` | Claude | FR-036 action priority + 390px transformation |
| `app/src/js/pages/teacher-performance.js` | Claude | FR-039 repeated-record density |
| `app/tests/smoke/run.cjs` | Claude | supersessions S45-1, S45-2 and additive guard G45-1 |

### Lead correction recorded: trailing whitespace

`git diff --check` failed on four added lines in `teacher-library(.en).html`. Cause: `filterBar()` and
`noResults()` emit lines ending in spaces. That is **pre-existing shared-component output** — every
page already using them carries it in committed bytes — but on this page the lines were newly added,
so the gate flagged them. Fixing `filter-bar.js` / `states.js` would have rewritten the generated
bytes of every other page using those components, i.e. exactly the unrelated drift this contract
forbids. The fix is therefore contained to `teacher-library.js`, which strips trailing whitespace
from its own composed markup only. No visible output changes. `git diff --check` now **PASSES**.

## Final accounting schema

After the last accepted application/test correction this ledger will record:

- exact changed authored files;
- exact generated assets and localized HTML;
- exact changed/unchanged Teacher bodies;
- exact unaffected/non-Teacher bodies;
- added/removed pages;
- shared-component consumers;
- test/screenshot/a11y growth;
- unrelated page-body drift;
- reason for every count change.

The strict comparison reads historical bytes from Git and fails on missing/duplicate body, unexpected path, parser failure, or whole-file fallback. Application pages will not be edited to manufacture counts.
