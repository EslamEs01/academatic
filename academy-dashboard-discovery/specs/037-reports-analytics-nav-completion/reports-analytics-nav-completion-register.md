# Reports / Analytics Nav Completion Register — Spec 037

The two Reports/Analytics items owned by Spec 037. Both are currently `status:'planned'` («قريبًا», no route) in `nav.config.js` (reports category). Recommended: promote each to a display-only tab on the existing `reports.html`.

## monthlyReports / التقارير الشهرية

| Field | Value |
|---|---|
| Current nav status | `planned` |
| Current visible marker | «قريبًا» `<button>` (no route) |
| Current owner/surface | none (no page, no tab) |
| Recommended route | `reports.html#view=monthly` (display-only tab) |
| Mechanism | wrap existing reports content as an **overview** tab via `tabs({group:'reports'})`; add a **monthly** tab (Spec 036 teacher-performance precedent) |
| Surface | month filter + authored summary cards (session/attendance/outcome count literals per month) + authored report rows with area/status chips + optional read-only detail |
| Gated finals | Export / PDF / Send = `backendRequired` (reuse existing reports gate pattern) |
| Count impact | **0** |
| Final nav status | `implemented`, route `reports.html#view=monthly` |
| FUTURE_ROUTES | remove stale `monthlyReports: 'monthly-reports.html'` |
| Acceptance check | `reports.html#view=monthly` opens Monthly tab on fresh load (AR/EN); board renders; no canvas/computed/finance figure; exports gated |

## dataAnalysis / تحليل البيانات

| Field | Value |
|---|---|
| Current nav status | `planned` |
| Current visible marker | «قريبًا» `<button>` (no route) |
| Current owner/surface | none (no page, no tab) |
| Recommended route | `reports.html#view=analysis` (display-only tab) |
| Mechanism | same `tabs({group:'reports'})`; add an **analysis** tab |
| Surface | filters (area/subject/period if grounded) + authored insight cards + categorical trend/status chips (labels, not computed) + read-only list/table |
| Grounding | legacy `management/analysis-course` + `analysis-student` (finance-free) |
| Gated finals | Export / Run-analysis = `backendRequired` |
| Count impact | **0** |
| Final nav status | `implemented`, route `reports.html#view=analysis` |
| FUTURE_ROUTES | remove/repoint stale `dataAnalysis: 'analytics.html'` |
| Honesty caveat | per 033 roadmap: NO `<canvas>`/computed analytics; authored categorical insight board is an honest display; if evidence too thin, fall back to a documented `backendRequired` analysis gate inside the tab |
| Acceptance check | `reports.html#view=analysis` opens Analysis tab on fresh load (AR/EN); board renders; no canvas/computed metric/finance figure; exports gated |

## Nav change summary (037 core)

- `monthlyReports`: `planned` → `implemented`, route `reports.html#view=monthly`.
- `dataAnalysis`: `planned` → `implemented`, route `reports.html#view=analysis`.
- `FUTURE_ROUTES`: drop `monthlyReports` and `dataAnalysis` (stale) when promoted.
- After 037: the **reports category has 0 `planned` items** (finance items are `disabled`, not `planned`) → a new additive smoke assert `#catpanel-reports` 0-planned (mirrors families/teachers). Admin menu stays 50.

## Plus (if flagged-035 correctives adopted) — route refinements only

- `familyCategories`: route `families.html` → `families.html#view=categories`.
- `studentResult`: route `student.html#view=results` → `students.html#view=results`.
- `studentEvaluation`: route `student.html#view=evaluation` → `students.html#view=evaluation`.

No other nav item changes. See `corrective-surfaces-register.md` and `count-and-route-contract.md`.
