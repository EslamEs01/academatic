# Contract — Nav Completion

Exactly **four** `nav.config.js` items change; nothing else.

| Item | Before | After |
|---|---|---|
| `familyCategories` | `status:'planned'` (no route) | `status:'implemented'`, `route:'families.html'` |
| `scheduleSearch` | `status:'planned'` (no route) | `status:'implemented'`, `route:'schedule-search.html'` |
| `studentResult` | `status:'planned'`; `FUTURE_ROUTES.studentResult='student-results.html'` | `status:'implemented'`, `route:'student.html#view=results'`; FUTURE_ROUTES entry removed |
| `studentEvaluation` | `status:'planned'`; `FUTURE_ROUTES.studentEvaluation='student-evaluation.html'` | `status:'implemented'`, `route:'student.html#view=evaluation'`; FUTURE_ROUTES entry removed |

## Rules
- Build guard (nav.config.js:150-156) MUST pass: implemented ⇒ has route; non-implemented ⇒ no route; disabled ⇒ reasonKey. All four gain routes → OK.
- Hash routes (`student.html#view=…`) are valid hrefs; the nav renderer emits `<a href>` (real link, not «قريبًا» button).
- After the change the **families category has 0 planned items** (its only four were these).
- No other category/item touched (teachers/reports/admin/settings/control unchanged).

## Acceptance
- Smoke: each of the four is an anchor (not `data-coming-soon`/«قريبًا»); `plannedNavAnchors===0` holds; exactly 4 items changed status; admin-menu 50.
- `FUTURE_ROUTES` no longer contains studentResult/studentEvaluation.
