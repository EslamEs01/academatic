# Spec 029 — Research & Decisions (D1–D41)

All decisions resolved. Evidence paths under `academy-dashboard-discovery/`. Baseline: HEAD `4be3e87`, 97
public HTML, build/smoke/a11y green (re-verified this phase).

| # | Decision | Resolution | Rationale / evidence |
|---|---|---|---|
| D1 | Evidence gate sufficient? | **PASS** | Specify 3-agent audit + plan source re-reads; legacy 029 surfaces grounded; forbidden engines noted; `visual-grounding.md` |
| D2 | Current count = 97? | **Yes** | `find app/public -name '*.html' \| wc -l` = 97 |
| D3 | Final count after 029 | **97** | all folds/gates; no page justified |
| D4 | Any standalone page needed? | **No** | every candidate folds into reports.html or a drawer; `modal-and-page-scope.md` |
| D5 | Feedback review: fold vs page | **Fold into reports.html** + read-only drawers | grounded but compact-foldable |
| D6 | Forms/surveys: fold vs page | **Fold into reports.html** | display-only list; no engine |
| D7 | Analytics/dataAnalysis | **Light fold + planned gate** | chart page forbidden; overview counts stay |
| D8 | monthlyReports/monthlyPerf/sessionsKpi | **Planned gates** | thin; no page justification |
| D9 | studentResult/studentEvaluation | **Planned gates**; single-student views exist | student.html tabs already cover; NO computed % |
| D10 | Admin-menu coverage final strategy | Inventory (43 items, 0 unclassified) + smoke proof; `nav.config.js` 0-diff | `admin-menu-coverage-inventory.md` |
| D11 | Unclassified-prevention | Smoke asserts nav-id set == classified-id set; build guard intact | `contracts/admin-menu-coverage-contract.md` |
| D12 | reports.html deepening | Add Feedback + Forms sections; keep overview/catalog/detail behavior | `reports.js` |
| D13 | Report detail drawer | Reuse `previewTemplate`/`sheetRow` (finance-drawer pattern) | `preview-drawer.js` |
| D14 | Feedback review surface | Authored rows + filter + read-only drawer | `report-feedback.js` (new) |
| D15 | Feedback detail drawer | `<template data-preview="rep-fb-…">` read-only | `enhance.js` openSheet |
| D16 | Feedback category modal/drawer | Create/Edit modal + manage-categories drawer + assign gate | mirror `teachers.js categoriesDrawer` |
| D17 | Forms list / create-form | Display-only rows + backendRequired create modal | authored `FORMS` fixture |
| D18 | Progress form Save/Submit | Links to existing student Evaluation tab; Approve reclassified (R-F) | `evaluation-rubric.js` |
| D19 | Export/print/PDF/CSV/Excel | All honest gates (disabled-with-reason / backendRequired modal) | `report-actions.js`, existing gates |
| D20 | reports Print reclassification | `data-demo-action` → disabled-with-reason gate (R-G) | `report-actions.js:29-35` |
| D21 | sessions-analysis export consistency | **Keep** native disabled-with-reason (already honest) | `sessions-analysis.js:19-22` |
| D22 | result-summary export/print gate | **Keep** (native disabled honest); res.print demo→optional reclassify deferred | `result-summary.js:65-66` |
| D23 | evaluation approve gate | **Reclassify** eval.approve demo → `data-confirm` backendRequired (R-F) | `evaluation-rubric.js:60` |
| D24 | outcome Add-feedback gate | **Reclassify** att.act.feedback demo → `data-modal-trigger` backendRequired modal (R-E) | `outcome-details.js:59` |
| D25 | teacher-performance export/print | **Keep board export-free** (no dishonest control today); optional gate deferred (R-M) | `teacher-performance.js` (no export) |
| D26 | Metric/chart/no-canvas | NO chart engine/canvas; authored counts + status chips only | `metric-and-chart-scope.md` |
| D27 | Computed-% guardrail | Categorical remark pills only; smoke greps 029 bodies for %/percentile/canvas = 0 | `contracts/no-computed-percentage-contract.md` |
| D28 | Fixture data strategy | New `fixtures/report-feedback.js` (FEEDBACK/FEEDBACK_CATEGORIES/FORMS); authored, no %, no pay | `data-model.md` |
| D29 | Locale AR/EN mirrored | Extend `ar/en.rep.js` with `rep.fb.*`/`rep.form.*`/`rep.fbcat.*`; reuse `common.backendRequiredNote` | `i18n.js` merge chain |
| D30 | CSS additive only | Reuse `.rep-*`/`.sheet-row`/`.rating-pill`; ≤ a few additive classes | `app.css` |
| D31 | Closed data-* hook strategy | Reuse filter/tab/drawer/modal/confirm/disabled-reason/(optional row-menu 'feedback' branch); NO new hook | `enhance.js` |
| D32 | Finance exclusion | Build no finance; finance files 0-diff; body-scoped pay grep | `finance-exclusion-register.md` |
| D33 | Future-owner strategy | 030/031/032/future-backend records; build none | `future-owner-register.md` |
| D34 | Smoke plan | Additive block (count/menu/feedback/forms/gates/no-fake/no-chart/no-%/pay/role-laws); protected asserts byte-verbatim | `contracts/smoke-rescope-contract.md` |
| D35 | A11y plan | +rows: feedback section, detail drawer, create modal, export gate; dark/light; mobile 390; 0/0 | `contracts/mobile-a11y-screenshot-contract.md` |
| D36 | Screenshot plan | reports/feedback/drawer/forms/gate/mobile/dark; update REVIEW.md | same |
| D37 | Role-law protection | teacher pay-free · family zero-pay · student child-view · admin finance invariant — all byte-verbatim | `contracts/*-contract.md` |
| D38 | Impact protection | Only reports/attendance/sessions/student HTML change; package.json 0-diff | `contracts/impact-protection-contract.md` |
| D39 | Allowed/forbidden files | See plan §18 | `contracts/scope-guard.md` |
| D40 | Risks & stop conditions | See plan §19 | `contracts/scope-guard.md` |
| D41 | Final menu-coverage proof | Smoke: nav ids == classified ids; guard intact; feedback/forms render on reports | `contracts/admin-menu-coverage-contract.md` |

## Key research notes

- **Why fold, not new pages**: legacy had separate feedback/forms pages, but the app's count-97 preference +
  the closed-primitive toolkit + read-only drawers make a compact fold honest and non-cramped. The
  page-candidate test fails at Q3–Q4 for every candidate (foldable + drawer-serviceable). A future spec may
  split them out if `reports.html` grows unwieldy; 029 does not.
- **Why keep native-disabled export gates (R-H/R-I/R-M/R-22)**: `button({disabled, reasonKey})` renders
  `disabled aria-disabled="true" title="<reason>"` — honest and not a dead button. Reclassifying to the
  clickable idiom would churn 8+ protected pages for a cosmetic gain. The real honesty gap is
  `data-demo-action` on **writes**, which R-E/R-F/R-G fix.
- **Why R-E is a modal, R-F/R-G are gates**: Spec 026 converted Add/Create primaries to backendRequired
  modals (New-session, Add student/teacher/…), Approve/lifecycle to confirms, and export to disabled-reason
  gates. R-E "Add feedback" = a Create primary → modal; R-F "Approve" = a lifecycle write → confirm; R-G
  "Print"/export → disabled-reason gate. This matches the established idiom exactly.
- **No computed %**: legacy `teacher-feedback`/`class-feedback` Percentage columns and `families-feedback`
  completion-rate KPIs are server aggregations of categorical inputs; the app forbids computed metrics, so
  029 shows the categorical remark/status only. Enforced by grep + smoke.
- **No new locale module / no new hook / no new engine**: `rep.*` already exists; the closed `data-*` set
  already covers every interaction; all display primitives exist. 029 is purely additive content + three
  honesty reclassifications.
