# Research & Decisions — Spec 037

Grounded decisions D1–D38. Evidence: current source (`nav.config.js`, `pages/{reports,families,students,student}.js`, `components/tabs.js`, `components/{result-summary,evaluation-rubric}.js`, `fixtures/{reports,families,students}.js`, `locales/ar.fam.js`+`ar.rep.js`, `i18n.js`, `tests/smoke/run.cjs`), legacy `output/`, prior specs 033/035/036/037-specify.

| # | Decision | Resolution | Evidence / rationale |
|---|---|---|---|
| D1 | Current count | **115** | `find public -maxdepth 1 -name '*.html' | wc -l` = 115 |
| D2 | Target count | **115** (delta 0) | all five surfaces are folds/tabs on existing pages |
| D3 | New page bases | **0** | reports/families/students already exist + registered in build-html |
| D4 | reports.html tab architecture | `tabs({group:'reports'})`: overview·monthly·analysis | `tabs.js` API confirmed; Spec 036 teacher-performance precedent |
| D5 | reports overview preserves existing body | Yes — `renderReports()` body becomes the **overview** (first/default) panel verbatim | `#reports-grid`/`.report-card` 7-card/2-planned smoke asserts (scoped to `#reports-grid`, lines 824/886) stay green in-DOM |
| D6 | monthlyReports tab sections | header + month filter + authored summary cards + authored monthly rows (area/status chips) + empty state + optional read-only detail | reuse pageHeader/summaryCards/cardGrid/filterBar/chip/noResults |
| D7 | monthlyReports fixture | authored `MONTHLY_REPORTS` in `fixtures/reports.js`: {monthKey, areaKey, count, statusId, noteKey} | mirror REPORT_SUMMARY authored-literal pattern |
| D8 | monthlyReports gated actions | Export/PDF/Send/Generate = `backendRequired` (data-disabled-reason) or existing `data-demo-action`→acknowledge | reuse reports Print/CSV/Share gate pattern |
| D9 | monthlyReports no finance/computed/canvas | no money token; counts are authored literals; no `<canvas>`; no computed metric | finance-free reports law (Spec-009) |
| D10 | dataAnalysis tab sections | header + filters + authored insight cards + categorical trend/status chips + read-only list + empty state | legacy `analysis-course`/`analysis-student` grounding |
| D11 | dataAnalysis fixture | authored `DATA_INSIGHTS` in `fixtures/reports.js`: {areaKey, count, trendId(categorical), statusId, noteKey} | display-only |
| D12 | dataAnalysis finance-exclusion | exclude `analysis-expenses`/`analysis-invoices`/`monthly-invoices` (money) → Spec 038 | keep reports body finance-free forever |
| D13 | dataAnalysis no computed/engine/canvas | trend chips are LABELS not computed; no `<canvas>`/ApexCharts; no metric/percentage/prediction; fallback = documented gate if evidence thin | 033 roadmap key law |
| D14 | familyCategories architecture | wrap families body as **directory** tab + add **categories** tab (`tabs({group:'families'})`) | families.js single-content today |
| D15 | familyCategories fixture | reuse `FAMILY_CATEGORIES` (already has authored `count` + nameKey/descKey/statusId) — **NO computed statistic** | fixtures/families.js:11-15 confirmed |
| D16 | familyCategories gates | Create-category = `backendRequired`; Reclassify = existing `famCatDrawer` gate (reachable) | no fake persistence |
| D17 | familyCategories no fake mutation | nothing persists/mutates on confirm; counts are authored | existing drawer is display-only |
| D18 | students.html tabs | wrap students body as **directory** tab + **results** + **evaluation** tabs (`tabs({group:'students'})`) | students.js single table today |
| D19 | studentResult board sections | per-student row: name + family + level + certificate-count literal + result status chip + deep-link; empty state | reuse people-row/dataTable + chip |
| D20 | studentResult drill-down | per-student deep-link → `student.html#view=results` (the existing single-student Results tab) | matches existing students.js "view profile" pattern (one baked student.html) |
| D21 | studentResult no computed | authored categorical chip + count literal only; **NO score/rank/GPA/percentage/average/total; NO cross-student aggregation/ranking/sort-by-score** | maintainer no-computed law |
| D22 | studentEvaluation board sections | per-student row: name + level + evaluation status chip (approved/pending) + month + deep-link; empty state | reuse existing `evaluation.approved` categorical |
| D23 | studentEvaluation drill-down | per-student deep-link → `student.html#view=evaluation` | existing tab |
| D24 | studentEvaluation no computed | categorical chip only; **NO rubric total/score/rank/rating math** | evaluation-rubric stays single-student, unchanged |
| D25 | nav.config exact changes | monthlyReports/dataAnalysis planned→implemented (+routes); familyCategories/studentResult/studentEvaluation route refine | see nav-completion-contract |
| D26 | FUTURE_ROUTES trims | drop `monthlyReports` + `dataAnalysis` only; keep `materials:'library.html'` | 039 owns materials |
| D27 | build-html.mjs | **0-diff** — no new page; reports/families/students already registered | build-html PAGES confirmed |
| D28 | i18n strategy | **0-diff** — extend already-registered `ar/en.rep.js` (rep.*) + `ar/en.fam.js` (fam/stu/res/eval) | i18n.js registers arR/enR + arF/enF |
| D29 | fixture strategy | reports: add MONTHLY_REPORTS + DATA_INSIGHTS; families: reuse FAMILY_CATEGORIES; students: reuse per-row results/evaluation (+ optional authored categorical) | no PII/pay/computed |
| D30 | CSS strategy | additive-only (`.mr-*`/`.da-*`/board classes); NO change to `.report-card` etc. | avoid breaking scoped asserts |
| D31 | smoke strategy | additive; 5 deep-links open right tab AR/EN; boards render; gates; no computed/chart/canvas/finance; reports 0-planned; all prior asserts byte-verbatim | fresh-context-per-view (Spec 035/036 pattern) |
| D32 | a11y strategy | +5 views × AR/EN × light/dark + mobile-390 + open-drawer rows; critical=0 serious=0 | additive |
| D33 | screenshot strategy | overview preservation + 5 boards × AR/EN/dark/mobile; 0 console errors | additive |
| D34 | full admin audit preservation | admin-menu 50 + `admin-missing-pages-audit.md` unchanged; materials/certificateRequests/settings/finance untouched (owners 038/039/040) | scope guard |
| D35 | role-law/no-fake carryover | teacher pay-free, family zero-pay, student child-view, finance Spec-009, no-computed, no-fake-wording — byte-verbatim | role-law-carryover-contract |
| D36 | impact protection | only reports/families/students bodies + shared sidebar change; student.html/family.html/result-summary/evaluation-rubric byte-identical; portals + index byte-identical | stash-rebuild proof at implement time |
| D37 | allowed/forbidden files | allowed: pages/fixtures/locales for reports/families/students + nav.config + app.css + tests + docs + spec; forbidden: package.json, build-html.mjs, i18n.js, enhance.js, student.js/family.js/result-summary/evaluation-rubric (unless absolutely necessary), finance/teacher/settings/materials/certificates/portal pages | scope-guard |
| D38 | risks / stop conditions | primary: Specs 035/036 uncommitted (implementation gated on approval); no-computed boundary for student boards; dataAnalysis honest-display boundary; preserve scoped reports asserts | see plan.md Stop conditions |

## Key risk register

1. **Uncommitted 035/036** (primary) — implementation must not begin without explicit maintainer approval on the green tree; recommend committing 035→036→037 separately.
2. **No-computed student boards** — the boards must read only existing authored/categorical per-student fields and add NO aggregation/ranking/score. Guarded by smoke greps.
3. **dataAnalysis honesty** — authored categorical insight board is honest; if authored insights prove too thin, fall back to a documented `backendRequired` analysis gate inside the tab (never a fake chart/metric).
4. **Scoped smoke asserts** — new reports panels must avoid `#reports-grid`/`.report-card`; new students/families panels must not disturb `#students-table`/`#families-grid`/existing drawers.
