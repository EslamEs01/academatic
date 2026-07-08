# Spec 029 — Implementation Plan: Admin Reports / Analytics / Feedback / Forms Deep Management + Admin Menu Coverage Gate

**Feature dir**: `academy-dashboard-discovery/specs/029-admin-reports-analytics-feedback-forms/`
**Baseline**: Spec 028 committed — HEAD `4be3e87`, branch `feature/012-role-portal-foundation`, working tree
clean, public HTML **97**, baseline `npm run build` = 97 / smoke **PASS** (96 loads) / a11y green (verified).
**Status**: PLANNED (plan-only — no tasks, no implementation, no commit).

---

## 1. Decision headline

**Count STAYS 97 — ZERO new pages.** Every 029 delta is a section/drawer/modal/confirm/gate folded onto an
EXISTING page. The two grounded gaps — **feedback review** and **forms/surveys** — **fold into `reports.html`**
as compact display-only sections with read-only detail drawers. The `reports.html` hub becomes the 029 home
for feedback/forms/analytics. All writes end at an honest `backendRequired` final. No chart engine, no
computed percentage/score/rank, no finance figure, no new hook/storage key/engine/page.

**Mechanism** = the CLOSED Spec-026 `data-*` set + the Spec-027/028 fold/drawer/kebab precedents:
- feedback/forms rows = authored fixture rows rendered with existing `card`/`data-table`/`rep-stat` primitives;
- feedback/form detail = baked `<template data-preview>` read-only drawer (`previewTemplate`/`sheetRow`);
- feedback/form filters = existing `filterBar` → `data-filter`;
- Create feedback / Create category / Create form = `data-modal-trigger` + `data-modal-note-key="common.backendRequiredNote"`;
- Approve / Delete feedback = `data-confirm[-danger]`; Assign-members = `data-disabled-reason` gate;
- honesty reclassification of three `data-demo-action`-on-write controls (Print, Add-feedback, eval.approve) → honest gates.

---

## 2. Evidence gate (D1) — PASS

Grounded via the specify-phase 3-agent read-only audit + this plan's source re-reads (`reports.js`,
`report-actions.js`, `enhance.js` dispatch, `evaluation-rubric.js`, `outcome-details.js`,
`sessions-analysis.js`, `teacher-performance.js`, `nav.config.js`, `ar/en.rep.js`, `app.css`). Legacy 029
surfaces are real (`teacher-feedback`/`class-feedback`/`families-feedback`/`family-feedback-categories`/
`forms`/`forms-students`/`analysis-course`/`analysis-student`) but used **forbidden engines** (Chart.js/
ApexCharts/amCharts + computed %). 029 reproduces the same underlying data **display-only, numberless,
chartless**. Finance-tinted legacy surfaces route to 030. No evidence gap blocks planning.

## 3. Count target (D2/D3/D4)

- Current: **97** (verified). Target after 029: **97**. Page delta: **0**.
- Standalone-page candidates (feedback, forms, analytics, monthlyReports, monthlyPerf, sessionsKpi,
  studentResult, studentEvaluation) all FAIL the page-candidate test at question 3–4: each can be honestly
  folded into `reports.html` or served as a compact section + drawer. No candidate justifies a new page.
- No removals, no unrelated additions.

## 4. Fold-vs-page decisions (D5–D9)

| Surface | Decision | Where | Rationale |
|---|---|---|---|
| D5 Feedback review | **FOLD** | new `reports.html` "Feedback" section + read-only drawers | grounded but foldable; count 97; drawers keep it compact |
| D6 Forms/surveys | **FOLD** | new `reports.html` "Forms & surveys" section + create modal | display-only list; no engine; fold clean |
| D7 Analytics/dataAnalysis | **FOLD (light) / planned gate** | reports overview counts stay; `dataAnalysis` nav stays planned gate | numberless/chartless; a chart page is forbidden |
| D8 monthlyReports/monthlyPerf/sessionsKpi | **planned gate** (fold-capable later) | nav items stay `planned` honest buttons | thin; no standalone justification |
| D9 studentResult/studentEvaluation | **planned gate** | nav items stay `planned`; single-student views already exist (student.html tabs) | fold/gate; NO computed % |

## 5. Admin Menu Coverage Gate plan (D10/D11/D41)

- The coverage artifact `admin-menu-coverage-inventory.md` already classifies **all 43 nav items, 0
  unclassified**. Implementation does NOT change `nav.config.js` (all items stay in their honest state).
- **Proof strategy (D41)**: a smoke block that (a) imports/derives every `nav.config.js` item id and asserts
  it is non-dead (implemented⇒route resolves; planned⇒no route + honest «قريبًا» button; disabled⇒reasonKey);
  (b) re-affirms the build-time guard (`nav.config.js:148-154`) is intact; (c) asserts the 029-folded
  capabilities (feedback/forms) render on `reports.html`. No nav item becomes a dead placeholder.
- **Unclassified-prevention (D11)**: the inventory + a smoke assertion that the set of nav ids equals the set
  of classified ids (drift fails the build). Documented in `contracts/admin-menu-coverage-contract.md`.

## 6. Reports deepening plan (D12/D13)

`reports.js` (Spec 008) keeps its overview + catalog + 5 detail sections **byte-behavior-identical**, plus:
- **New "Feedback review" section** (`report-feedback.js`): authored feedback rows (teacher/class/family/
  student) — subject, category chip, **categorical remark** (reuse `rating-pill` vocab), status chip, date;
  a `filterBar` (type/status) faceting the list; each row opens a **read-only detail drawer**
  (`previewTemplate`/`sheetRow`); header actions = Create-feedback modal + Create-category modal + a
  Manage-categories drawer (list + assign gate) mirroring `teachers.js` `categoriesDrawer()`.
- **New "Forms & surveys" section**: authored form rows (title, authored question count, authored response
  count, status) display-only; Create-form = backendRequired modal; each row → read-only drawer.
- **Report detail drawer (D13)**: reuse `previewTemplate('rep-…')` + `sheetRow` (same as finance invoice
  drawer) for feedback/form detail. No inline edit.
- **Print reclassification (R-G)**: in `report-actions.js`, change Print from `data-demo-action` → the same
  `disabledAction()` disabled-with-reason gate used by Export CSV/PDF (reason `rep.reason.export`).

## 7. Feedback plan (D14/D15/D16) — R-A/R-B

- **Rows/cards (R-A)**: authored `FEEDBACK` fixture — `{id, type:'teacher|class|family|student', subjectKey,
  categoryKey, remarkId (categorical), statusId, dateKey, noteKey}`. Rendered as compact rows; NO numeric
  score, NO percentage.
- **Detail drawer (R-A)**: read-only `sheetRow`s (subject, category, remark pill, date, note, status).
- **Category modal/drawer (R-B)**: Create/Edit category = `data-modal-trigger` backendRequired; Manage-
  categories drawer = authored `FEEDBACK_CATEGORIES` list + assign-members `data-disabled-reason` gate; nav
  item stays folded/planned (mirror `trn-categories`/`fam-cat`).
- **Writes**: Create/Edit feedback = modal; Approve = `data-confirm`; Delete = `data-confirm-danger`. Nothing
  persists; no DOM removal.

## 8. Forms plan (D17/D18) — R-C/R-D

- **List (R-C)**: authored `FORMS` fixture rows (title/questions/responses/status/default) display-only;
  counts are authored literals (NO aggregation). Create-form = backendRequired modal.
- **Progress form (R-D)**: the per-student monthly progress form already lives as the `student.html`
  Evaluation tab (`evaluation-rubric.js`). Its Approve action is reclassified (R-F, below); no new form
  engine. The forms section links to it (real deep-link), no duplicate builder.

## 9. Analytics plan (D26/D27) — R-J/R-N

- **NO chart engine, NO `<canvas>`, NO computed %/score/rank.** Analytics stays the existing display-only
  overview counts on `reports.html` (authored roll-ups = row counts). `dataAnalysis`/`monthlyReports`/
  `sessionsKpi`/`monthlyPerf` stay honest planned gates.
- **Computed-% guardrail (R-N)**: legacy `Percentage` columns are NOT reproduced; feedback shows categorical
  remark pills only. A smoke assert scans 029 bodies for a computed-`%`/percentile/leaderboard pattern
  (authored literals excepted) and for `<canvas>`/chart tokens → must be 0.
- **`sparkline.js` NOT repurposed** as a metric (guarded by source grep + contract).

## 10. Export / print plan (D19–D25) — R-E/R-F/R-G/R-H/R-I/R-M

Clean rule: **`data-demo-action` on a write → reclassify to an honest gate; native disabled-with-reason gates
are already honest → keep.**

| Row | Control | Decision | File(s) | Page delta |
|---|---|---|---|---|
| R-G | reports Print (`data-demo-action`) | **reclassify** → disabled-with-reason export gate | `report-actions.js` | reports.html ×2 |
| R-E | outcome "Add feedback" (`data-demo-action`) | **reclassify** → `data-modal-trigger` backendRequired modal (Spec-026 Add/Create precedent) | `outcome-details.js` | attendance.html + sessions.html ×2 |
| R-F | student Evaluation "Approve" (`data-demo-action`) | **reclassify** → `data-confirm` backendRequired (Approve is a write) | `evaluation-rubric.js` | student.html ×2 |
| R-H | sessions-analysis Export (native disabled) | **keep** (already honest) — optional upgrade deferred | — | 0 |
| R-I | course/group/student/teacher print (native disabled) | **keep** (already honest; avoid churning protected pages) | — | 0 |
| R-M | teacher-performance export/print | **no dishonest control today** → keep board export-free (display-only); OPTIONAL honest disabled-reason gate deferred | — | 0 |

Every export/print that exists is an honest gate; no fake file; no silent no-op. R-E/R-F are the intended
honesty deltas to shared components (documented re-pins in the smoke contract).

## 11. Fixtures / locale / CSS plan (D28/D29/D30)

- **Fixtures (D28)**: NEW `src/js/fixtures/report-feedback.js` — `FEEDBACK` (rows), `FEEDBACK_CATEGORIES`,
  `FORMS`. All authored, derived from existing entities (teachers/families/students/courses), NO %, NO pay,
  NO computed value. Registered by importing into `report-feedback.js` component only.
- **Locale (D29)**: extend EXISTING `ar.rep.js` + `en.rep.js` with `rep.fb.*` (feedback), `rep.form.*` (forms),
  `rep.fbcat.*` (feedback categories), honest gate labels — AR/EN mirrored. Reuse `common.backendRequiredNote`.
  No new locale module; no raw keys.
- **CSS (D30)**: reuse `.rep-stat`/`.rep-section`/`.sheet-row`/`.rating-pill`/chips. Additive only if a
  feedback-row layout needs it (≤ a few classes); NO redesign, NO new animation, motion only inside the
  existing `prefers-reduced-motion` block, NO new hook/storage key.

## 12. Closed hook strategy (D31)

Reuse ONLY: `data-filter`/`data-filter-set` (filters), `data-tab` (if a feedback/forms tab switcher is used),
`data-drawer`+`<template data-preview>` (detail), `data-modal-trigger`+`data-modal-title-key`/`data-modal-
note-key` (create/edit), `data-confirm[-danger]` (approve/delete), `data-disabled-reason`+`data-reason-key`
(assign/export gates), `data-row-menu`(+kind) ONLY if a feedback row kebab is needed (a new `'feedback'`
branch mirroring familyMenu — otherwise omit). **NO new hook, NO new storage key.**

## 13. Finance exclusion plan (D32) — R-P/R-Q

Build none of analysis-expenses/analysis-invoices/salary-class-report/invoice-export/downlaod/payouts. Keep
`finance.js` + `fixtures/finance.js` + `components/finance-*.js` + `locales/*.fin.js` **0-diff**;
`finance.html` `#page-body` byte-identical. The finance nav sub-section stays disabled→030. A body-scoped
pay-figure smoke assert runs over every new/changed 029 body (excludes the sidebar nav). See
`contracts/finance-exclusion-contract.md`.

## 14. Future-owner plan (D33) — R-P…R-V

030 finance (R-P/R-Q); 031 certs/settings/materials/staff (R-R/R-U); future-backend messages/leads/tasks/
announcements/scheduleSearch (R-S/R-T); 032 final QA incl. stale `FUTURE_ROUTES.sessionsAnalysis` cleanup
(R-V). 029 builds none of these; each stays an honest gate/record. See `future-owner-register.md`.

## 15. Smoke / a11y / screenshots plan (D34/D35/D36)

- **Smoke (D34)**: additive block — count == 97; reports.html loads AR/EN with the new Feedback + Forms
  sections; every feedback/form action opens page/modal/drawer/gate; no fake export/download/pdf/csv/print;
  no fake feedback submit; no `<canvas>`/chart; no computed %/score/rank on 029 bodies; body-scoped pay grep
  clean; admin-menu coverage (nav ids == classified ids; guard intact); `href="#"`==0; no raw keys; no dead
  buttons; filters/tabs work; the R-E/R-F/R-G reclassifications assert honest gates; 026/027/028 + role-law
  asserts **byte-verbatim** (payHit/tchPay/famPay/payFigure/child-view/admin-finance). Re-pin ONLY the
  attendance/sessions/student assertions changed by R-E/R-F (sanctioned amendment; protected regexes untouched).
- **A11y (D35)**: add matrix rows — reports (AR light+dark+EN) already present; add a reports `#feedback`/
  `#forms` hash or interaction, a feedback detail drawer, a create modal, an export gate; dark/light; mobile
  390; critical=0 serious=0.
- **Screenshots (D36)**: reports overview, feedback review, feedback detail drawer, forms section / create-form
  modal, export/print gate, mobile 390, dark mode; update `screenshots/REVIEW.md`.

## 16. Role-law protection plan (D37)

Teacher pay-free GLOBAL (16 files byte-identical; `teacher-performance.html` stays display-only, no score/
rank/chart/pay; payHit/tchPay byte-verbatim); family zero-pay (famPay/payFigure byte-verbatim); student
child-view (no «لوحة الطالب»); admin finance Spec-009 invariant (finance bodies byte-identical). New feedback/
forms bodies carry no pay figure and no computed metric.

## 17. Impact protection plan (D38)

Changed outputs (intended deltas only): `reports.html`/`.en` (feedback+forms+print gate),
`attendance.html`/`.en` + `sessions.html`/`.en` (R-E add-feedback modal), `student.html`/`.en` (R-F approve
confirm). Everything else byte-identical: 16 teacher-portal files, teacher-performance, teacher/teachers/
course/group/family + all 027/028 pages not listed, all family/student portal pages, admin-ops (sessions-
analysis/public-holiday/scheduled-actions), finance, index. `package.json` 0-diff; no new dependency/engine/
hook/storage key. If the R-E/R-F churn is judged not worth it at implementation review, they may stay as-is
(already Spec-026-honest) — recorded, not a regression.

## 18. Allowed / forbidden files (D39)

**Allowed to change**: `pages/reports.js`; `components/report-actions.js`, `components/report-feedback.js`
(NEW); `components/outcome-details.js` (R-E), `components/evaluation-rubric.js` (R-F); `fixtures/report-
feedback.js` (NEW); `locales/ar.rep.js` + `locales/en.rep.js`; `styles/app.css` (additive); `tests/smoke/
run.cjs`, `tests/a11y/run.cjs`, `tests/screenshots/capture.cjs`; `screenshots/REVIEW.md`; `README.md`;
`CLAUDE.md`; the 029 spec dir. **Generated**: `reports.html`/`.en`, `attendance.html`/`.en`, `sessions.html`/
`.en`, `student.html`/`.en` (+ shared-asset hashes).
**Forbidden**: `package.json`; any dependency; backend/API/auth; `finance.js`/`fixtures/finance.js`/`finance-*`
components/`*.fin.js`; `nav.config.js` (0-diff — all items already classified); teacher-portal files; new
chart/export/persistence/notification engine; new hook/storage key; any new standalone page; 030/031 pages.

## 19. Risks & stop conditions (D40)

**Stop if**: count ≠ 97 after build · any nav item unclassified · any R-row unresolved · a new page chosen
without passing the candidate test · a chart engine/`<canvas>` appears · a computed %/score/rank appears · a
fake report/feedback/export appears · a pay figure leaks into a 029 body · a finance file changes · a
teacher-portal file changes · a family pay figure or student primary wording appears · `href="#"` appears · a
dead button/raw key appears · `package.json` changes · a new hook/key/engine is needed.
**Risks**: (1) `reports.html` length after folding feedback+forms — mitigate with compact rows + drawers;
(2) R-E/R-F protected-page churn — mitigate by documented re-pins, or defer (already honest); (3) computed-%
temptation from legacy fidelity — hard-guarded by `contracts/no-computed-percentage-contract.md`.

## 20. Constitution / standing-law check

Static HTML-first · closed `data-*` set · fixtures-only · no engine · no computed score/rank/chart · no pay
math · AR RTL + EN LTR mirrored · light/dark/system · icon+text chips · GitHub-Pages relative paths ·
screenshot acceptance — ALL preserved. No violation; no complexity deviation to record.

## 21. Next step

`/speckit.tasks` for Spec 029 (generate `tasks.md`). No implementation, no commit until tasks approved.
