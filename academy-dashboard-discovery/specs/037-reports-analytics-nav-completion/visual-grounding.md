# Targeted Visual Grounding — Spec 037

**Method:** direct source + built-HTML + legacy-evidence inspection (no reliance on memory/summaries). Run before writing spec artifacts.

## Scope
monthlyReports · dataAnalysis · familyCategories audit · studentResult audit · studentEvaluation audit · full Admin sidebar missing-pages audit.

## Evidence inspected (exact paths)
- `academy-dashboard-discovery/app/src/js/nav.config.js` (all 50 admin items, statuses, routes, FUTURE_ROUTES, build-time dead-link guard)
- `academy-dashboard-discovery/app/scripts/build-html.mjs` (PAGES registry — reports/sessions-analysis/teacher-reports; no data-analysis/monthly-reports/analytics page registered)
- `academy-dashboard-discovery/app/src/js/pages/reports.js` (single long display-only page; no tabs())
- `academy-dashboard-discovery/app/src/js/pages/families.js` (category filter + famCatDrawer only; no Categories board)
- `academy-dashboard-discovery/app/src/js/pages/student.js` (tabs(): overview/courses/timetable/results/evaluation/family/notes; results=resultSummary, evaluation=evaluationRubric; ONE student st1)
- `academy-dashboard-discovery/app/src/js/pages/students.js` (single table; no results/evaluation board; no tabs())
- `academy-dashboard-discovery/app/public/reports.html` (`#view=` hits are shared-sidebar links, not reports tabs)
- `academy-dashboard-discovery/output/combined/page-inventory.md` (legacy analysis-course/analysis-student/analysis-expenses/analysis-invoices/monthly-invoices/teachers-N-monthly-classes/teacher-monthly-plans)
- `academy-dashboard-discovery/output/roles/admin/pages/management-analysis-*.md`
- `academy-dashboard-discovery/specs/033-admin-nav-completion-strategy/follow-up-spec-roadmap.md` (owner map: 037 reports/analytics; 038 finance; 039 content; 040 settings; 041 re-freeze)
- `academy-dashboard-discovery/app/tests/smoke/run.cjs` (admin-menu-50 @~1271; reports 7-card/2-planned @~870; finance 9-planned @~1036; families 0-planned @~1355; teachers 0-planned @~1367)

## Legacy capabilities found
- **monthlyReports** (التقارير الشهرية): legacy monthly roll-ups (`teachers/N/monthly-classes`, `teacher/monthly-plans`). Finance monthly (`monthly-invoices`) → excluded (038). Honest surface = month-scoped operations roll-up, finance-free.
- **dataAnalysis** (تحليل البيانات): legacy `management/analysis-course` + `analysis-student` (Reports/Analytics, finance-free). `analysis-expenses`/`analysis-invoices` → excluded (038, money). Honest surface = authored display-only analysis board, no canvas/computed metric.
- **familyCategories**: legacy family-category management. Current = filter dropdown + kebab reclassify drawer only.
- **studentResult / studentEvaluation**: legacy per-student result/evaluation. Current = one representative student's profile tabs (st1).

## Current frontend state
- **monthlyReports / dataAnalysis:** both `status:'planned'` («قريبًا», no route). `FUTURE_ROUTES` intends `analytics.html`/`monthly-reports.html` (no such page exists). `reports.js` has no tabs of its own → fold = wrap content as **overview** tab + add two display tabs (Spec 036 precedent).
- **familyCategories → families.html:** weak — one filter + kebab reclassify drawer; no labeled Categories surface.
- **studentResult → student.html#view=results / studentEvaluation → student.html#view=evaluation:** deep-links functionally open the correct tab on fresh load (enhance.js), but land on ONE student (st1); plural nav labels → single-student surfaces. Weak.
- **full Admin sidebar:** 50 items → 26 real pages, 3 fold-anchors, 4 deep-links, 7 finance-locked (disabled+reason, owner 038), 10 planned-with-owner (037×2, 039×2, 040×6). **0 truly-missing, 0 ownerless.**

## Missing / weak surfaces found
| Item | Current route | Issue | Recommended fix | Count |
|---|---|---|---|---|
| monthlyReports | (planned, no route) | «قريبًا» — no surface | tab `reports.html#view=monthly` | 0 |
| dataAnalysis | (planned, no route) | «قريبًا» — no surface | tab `reports.html#view=analysis` | 0 |
| familyCategories | families.html | filter-only, no labeled Categories surface | labeled Categories board `families.html#view=categories` | 0 |
| studentResult | student.html#view=results | single-student, plural label | cross-student board `students.html#view=results` + per-student deep-link | 0 |
| studentEvaluation | student.html#view=evaluation | single-student, plural label | cross-student board `students.html#view=evaluation` + per-student deep-link | 0 |

## Implementation decision (recommended; /speckit.plan finalizes)
- monthlyReports → `reports.html#view=monthly` (display-only tab, count 0).
- dataAnalysis → `reports.html#view=analysis` (display-only tab, count 0).
- familyCategories → strengthen folded Categories surface on families.html (count 0).
- studentResult → cross-student Results board on students.html (count 0, no computed score).
- studentEvaluation → cross-student Evaluation board on students.html (count 0, no computed rubric total).
- other missing item: none — materials/certificateRequests→039, settings×6→040, finance×7→038.

## Forbidden for this scope
no fake report generation · no fake data-analysis calculation · no fake export/PDF/download · no fake student result calculation · no fake student evaluation calculation · no fake family category creation · no computed finance figures (display-only authored only) · no computed score/rank/GPA/percentage/rubric-total · no chart/`<canvas>` · no backend/API · no row/status mutation.

## Proceeding to specify: YES (documentation only — Specs 035/036 uncommitted; implementation gated on approval).
