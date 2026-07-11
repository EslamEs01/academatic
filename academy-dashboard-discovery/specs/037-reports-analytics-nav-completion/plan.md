# Implementation Plan — Spec 037: Reports / Analytics Nav Completion + Missing Pages Correctives

**Branch**: `feature/012-role-portal-foundation` | **Date**: 2026-07-11 | **Spec**: [spec.md](./spec.md)
**Baseline HEAD**: `1eb4d9a` (Spec 034 commit). **Count before**: 115. **feature.json** → 037.

> ⚠️ **Primary risk — Specs 035 AND 036 are UNCOMMITTED** (implemented + green in the working tree, HEAD is still Spec 034). Planning proceeds; **implementation must STOP until the maintainer explicitly approves continuing on the green working tree** (recommended: watcher commits 035, then 036, then 037). No commit/push in this step.

## Targeted Visual Grounding — Spec 037 Plan Complete

**Scope:** monthlyReports · dataAnalysis · familyCategories corrective · studentResult corrective · studentEvaluation corrective · full Admin sidebar audit carryover.

**Evidence inspected (this planning pass):**
- Current source: `src/js/nav.config.js` (50 items; monthlyReports/dataAnalysis `planned`; FUTURE_ROUTES stale `analytics.html`/`monthly-reports.html`), `src/js/pages/{reports,families,students,student}.js`, `src/js/components/tabs.js` (`tabs({group,items,panels,ariaKey})`; enhance.js syncs `#view=` + persists `academy.schedView.<group>`), `components/{result-summary,evaluation-rubric}.js` (single-student, authored, no score), `src/js/fixtures/{reports,families,students}.js`, `src/locales/` (ar/en.rep.js; ar/en.fam.js with stu/res/eval/sp namespaces), `src/js/i18n.js` (registers arF/enF + arR/enR), `tests/smoke/run.cjs` (reports 7-card/2-planned scoped to `#reports-grid`; admin-menu-50; finance 9-planned; families/teachers 0-planned).
- Legacy: `output/combined/page-inventory.md` (`analysis-course`/`analysis-student` finance-free; `analysis-expenses`/`analysis-invoices`/`monthly-invoices` finance→038; `teachers/N/monthly-classes`, `teacher/monthly-plans`), `output/roles/admin/pages/management-analysis-*`.
- Prior specs: 033 roadmap (037 owns reports/analytics; 038 finance; 039 content; 040 settings; 041 re-freeze), 035/036 fold precedents, 037 specify artifacts (audit + flagged-items + count contract).

**Current app patterns:**
- **reports.html:** single long display-only page (`renderReports()` = reportActions + operationsOverview + categorySection[`#reports-grid`, 7 `.report-card`] + detailSections + feedback/forms). No tabs of its own.
- **families.html:** `renderFamilies()` = summaryCards + filterBar(status+category) + card grid + `famEditDrawer` + `famCatDrawer`. Category is a filter only; no labeled Categories surface. `FAMILY_CATEGORIES` has authored `count` fields.
- **students.html:** `renderStudents()` = summaryCards + filterBar(family/status/subject) + dataTable(name/family/status/level/progress/courses) + drawers. No results/evaluation board, no tabs. Every row already carries `results`/`evaluation` objects (fixture-authored).
- **student.html:** tabbed profile (overview/courses/timetable/results/evaluation/family/notes); results=`resultSummary`, evaluation=`evaluationRubric`; ONE student (st1). The single-student drill-down target — unchanged by 037.

**Planning decisions:**
- monthlyReports → display-only **Monthly** tab `reports.html#view=monthly` (count 0).
- dataAnalysis → display-only **Analysis** tab `reports.html#view=analysis` (count 0; finance-free; no canvas/computed).
- familyCategories → wrap families body as **Directory** tab + add labeled **Categories** tab `families.html#view=categories` (count 0; authored counts; reclassify + Create gate).
- studentResult → wrap students body as **Directory** tab + add cross-student **Results** board `students.html#view=results` + per-student deep-link (count 0; no computed score).
- studentEvaluation → add cross-student **Evaluation** board `students.html#view=evaluation` + per-student deep-link (count 0; no computed rubric total).
- count: 115 → 115, 0 new page bases, admin menu 50.
- tests: additive smoke/a11y/screenshots; all prior asserts byte-verbatim.

**Proceeding to plan: YES** (implementation gated on approval; documentation/plan only here).

## Architecture

The single mechanism for all five surfaces is the existing `tabs({group,…})` widget + `#view=` deep-link (proven by Spec 036 `teacher-performance`). No new hook, no new storage key, no new dependency, no engine. Three existing pages each gain a tab wrapper:

| Page | Group | Tabs (first = default) | New content |
|---|---|---|---|
| reports.html | `reports` | **overview** (existing body) · monthly · analysis | Monthly board, Analysis board |
| families.html | `families` | **directory** (existing body) · categories | Categories board (authored `FAMILY_CATEGORIES` + reclassify + Create gate) |
| students.html | `students` | **directory** (existing body) · results · evaluation | cross-student Results board, Evaluation board |

**Overview/Directory preservation is mandatory:** the existing page body becomes the first (default, active, not-hidden) panel verbatim — so `#reports-grid`/`.report-card` (reports), the families card grid + drawers, and the students table + drawers stay in the DOM and keep every existing assert green. New panels must **not** reuse `#reports-grid` or the `.report-card` class (use `#mr-grid`/`.mr-*` and `#da-grid`/`.da-*`, `#stu-results`/`#stu-eval`).

## Data model (see `data-model.md`)

- **Monthly report row** (authored, `fixtures/reports.js`): month, area/category label, count literal, status chip, note. No money, no computed metric.
- **Analysis insight** (authored, `fixtures/reports.js`): area/subject label, count literal, categorical trend/status chip (label, not computed), note. Finance-free.
- **Family category** (existing `FAMILY_CATEGORIES`): id, nameKey, descKey, authored `count`, statusId. No computed statistic.
- **Student result summary** (existing per-row `results`): reuse `certificates.length` (count literal), level, categorical result status chip; per-student deep-link. No computed score/GPA/rank/percentage.
- **Student evaluation summary** (existing per-row `evaluation`): categorical approved/pending status chip, month; per-student deep-link. No computed rubric total.

## Nav & count (see `count-and-route-contract.md` + `contracts/nav-completion-contract.md`)

- 2 flips: monthlyReports/dataAnalysis `planned`→`implemented` (routes `reports.html#view=monthly`/`#view=analysis`).
- 3 route refinements: familyCategories→`families.html#view=categories`; studentResult→`students.html#view=results`; studentEvaluation→`students.html#view=evaluation`.
- FUTURE_ROUTES: drop `monthlyReports` + `dataAnalysis` only (leave `materials`).
- Admin menu 50; reports category 0-planned after 037; 0 new pages; `build-html.mjs`/`i18n.js`/`enhance.js`/`package.json` 0-diff.

## Fixtures & locale (see `contracts/fixtures-locale-contract.md`)

- Reports: add authored `MONTHLY_REPORTS` + `DATA_INSIGHTS` to `fixtures/reports.js`; copy in `ar.rep.js`/`en.rep.js` (`rep.tab.*`, `rep.monthly.*`, `rep.analysis.*`), mirrored 0-divergence.
- Families: reuse `FAMILY_CATEGORIES`; add board labels to `ar.fam.js`/`en.fam.js` (`fam.tab.*`, `fam.cat.board.*`).
- Students: reuse per-row `results`/`evaluation` (optionally add authored categorical `resultStatusId`/`evalStatusId`); add board labels to `ar.fam.js`/`en.fam.js` (`stu.tab.*`, `stu.results.*`, `stu.eval.*`).
- `i18n.js` 0-diff (all copy extends already-registered modules).

## Tests (see `contracts/smoke-coverage-contract.md`, `contracts/a11y-screenshot-contract.md`)

- Smoke (additive): count 115; admin-menu 50; reports category 0-planned; the 5 deep-links open the right tab on fresh load AR/EN; boards render; per-student drill-down links present; gates present; no computed/chart/canvas/finance in the new tabs; all prior role-law/no-fake asserts byte-verbatim.
- A11y: monthly/analysis/categories/results/evaluation × AR/EN × light/dark + mobile-390 + open-drawer; critical=0 serious=0.
- Screenshots: overview preservation + 5 new boards × AR/EN/dark/mobile; 0 console errors.

## Impact protection (see `contracts/impact-protection-contract.md`)

- **Bodies that change (sanctioned):** `reports.html`/`.en`, `families.html`/`.en`, `students.html`/`.en` (tab wrap). Plus the shared admin sidebar on all admin pages (2 nav flips + 3 route refines).
- **Byte-identical:** `student.html`/`.en`, `family.html`/`.en`, `result-summary.js`/`evaluation-rubric.js` output, all other admin `#page-body`, all 16 portal pages, index.
- **0-diff:** `package.json`, `build-html.mjs`, `i18n.js`, `enhance.js`.

## Complexity / constitution check

No new dependency, no framework, no engine, no backend, no new hook/storage key, no new page. Additive CSS only. All five surfaces reuse existing primitives (`tabs`, `filterBar`, `summaryCards`, `cardGrid`, `chip`, `noResults`, `previewTemplate`/drawers, `data-disabled-reason` gates). **Constitution: PASS** (static-HTML-first, fixtures-only, closed hook set, honesty/backendRequired, no computed metric, finance-free reports, role-law carryover).

## Phasing (for /speckit.tasks — NOT executed here)

1. Preflight/baseline gate. 2. reports.js tab wrap + Monthly + Analysis (fixtures/reports.js + ar/en.rep.js). 3. families.js tab wrap + Categories board (ar/en.fam.js). 4. students.js tab wrap + Results + Evaluation boards (ar/en.fam.js; students fixture reuse). 5. nav.config.js flips + FUTURE_ROUTES trim. 6. Smoke/a11y/screenshots additive. 7. Clean-code guard + test-guard + docs + final audit.

## Stop conditions

Stop and report if: count can't stay 115 · a standalone page is required · reports need computed metrics/charts · dataAnalysis needs a real engine · finance figures required in reports · student boards need computed score/GPA/rank/percentage/rubric-total · family categories need fake persistence · any final fakes success · backend/API/network introduced · `type=file`/`type=password` appears · `package.json`/`build-html.mjs`/`enhance.js`/`i18n.js` must change · role-law/no-fake asserts need weakening.
