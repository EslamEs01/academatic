# Contract — Nav Completion

Exactly **five** `nav.config.js` items change (2 status flips + 3 route refinements); nothing else.

## Status flips (planned → implemented)

| Item | Before | After |
|---|---|---|
| `monthlyReports` | `status:'planned'` (no route) | `status:'implemented'`, `route:'reports.html#view=monthly'` |
| `dataAnalysis` | `status:'planned'` (no route) | `status:'implemented'`, `route:'reports.html#view=analysis'` |

## Route refinements (already `implemented`; route target strengthened only)

| Item | Before | After |
|---|---|---|
| `familyCategories` | `route:'families.html'` | `route:'families.html#view=categories'` |
| `studentResult` | `route:'student.html#view=results'` | `route:'students.html#view=results'` |
| `studentEvaluation` | `route:'student.html#view=evaluation'` | `route:'students.html#view=evaluation'` |

## FUTURE_ROUTES trim

| Key | Before | After |
|---|---|---|
| `dataAnalysis` | `'analytics.html'` | **removed** |
| `monthlyReports` | `'monthly-reports.html'` | **removed** |
| `materials` | `'library.html'` | **unchanged** (owner 039 — not touched by 037) |

## Rules
- Build-time dead-link guard (nav.config.js, end of file): `implemented` ⇒ must have a `route`; non-`implemented` ⇒ must NOT have a `route`; `disabled` ⇒ must have a `reasonKey`. All five changed items satisfy `implemented` + `route` → guard passes.
- Hash routes (`reports.html#view=monthly`, `reports.html#view=analysis`, `families.html#view=categories`, `students.html#view=results`, `students.html#view=evaluation`) are valid hrefs; EN variants resolve via the existing Spec-035 hash-aware `langRoute` in `sidebar.js` (0-diff — already hash-aware).
- After the change, the **reports category has 0 `planned` items** (the 7 finance-locked items are `status:'disabled'` with a `reasonKey`, never `planned`).
- After the change, `families`/`students` categories are unaffected in item count (route refinement only, no status change).
- No other category/item is touched: `materials`/`certificateRequests` stay `planned` (owner 039); settings×6 stay `planned` (owner 040); finance×7 stay `disabled` (owner 038).
- No nav item is added or removed; admin menu stays **50**.

## Acceptance
- `git diff nav.config.js` shows **only**: the 2 status-flip lines (+route), the 3 route-string edits, and the 2-line `FUTURE_ROUTES` removal (comment lines documenting the change are allowed).
- Smoke: `monthlyReports`/`dataAnalysis` are anchors (not `data-coming-soon`); `plannedNavAnchors`/dead-nav checks hold; admin-menu-50 freeze byte-verbatim; reports-category-0-planned assert added (mirrors the existing families/teachers 0-planned pattern); `FUTURE_ROUTES` no longer contains `dataAnalysis`/`monthlyReports` (still contains `materials`).
- Every changed `route` resolves to a real, built page/tab/deep-link (no dead link introduced).
