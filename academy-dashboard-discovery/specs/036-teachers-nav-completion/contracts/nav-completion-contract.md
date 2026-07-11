# Contract — Nav Completion

Exactly **four** `nav.config.js` items change; nothing else.

| Item | Before | After |
|---|---|---|
| `addTeacher` | `status:'planned'` (no route) | `status:'implemented'`, `route:'teachers.html'` |
| `teacherCategories` | `status:'planned'`; `FUTURE_ROUTES.teacherCategories='teachers.html'` | `status:'implemented'`, `route:'teachers.html'`; FUTURE_ROUTES entry removed |
| `sessionsKpi` | `status:'planned'` (no route) | `status:'implemented'`, `route:'teacher-performance.html#view=sessions-kpi'` |
| `monthlyPerf` | `status:'planned'` (no route) | `status:'implemented'`, `route:'teacher-performance.html#view=monthly'` |

## Rules
- Build guard (nav.config.js:150-156): implemented ⇒ route; non-implemented ⇒ no route; disabled ⇒ reasonKey. All four gain routes → OK.
- Hash routes (`teacher-performance.html#view=…`) are valid hrefs; EN → `teacher-performance.en.html#view=…` via the Spec-035 hash-aware `langRoute`.
- After the change the **teachers category (items + `cat.teachersPerf` section) has 0 planned items**.
- No other category/item touched.

## Acceptance
- Smoke: each of the four is an anchor (not `data-coming-soon`); `plannedNavAnchors`/deadNav checks hold; exactly 4 items changed status; admin-menu 50; teachers panel 0 planned.
- `FUTURE_ROUTES` no longer contains `teacherCategories`.
