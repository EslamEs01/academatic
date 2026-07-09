# Feature Specification: Admin Reports / Analytics / Feedback / Forms Deep Management + Admin Menu Coverage Gate

**Feature Branch**: `feature/012-role-portal-foundation` (spec dir `specs/029-admin-reports-analytics-feedback-forms`)
**Created**: 2026-07-08
**Status**: Draft (specify-only — no plan, no tasks, no implementation)
**Spec number**: 029
**Baseline**: Spec 028 committed (HEAD `4be3e87`); 97 public HTML; working tree clean.
**Input**: User description: "Admin Reports Analytics Feedback Forms Deep Management + Admin Menu Coverage Gate. Own the admin reporting/analytics/feedback/forms layer that Specs 027/028 routed here. NOT finance/payroll. NOT settings/materials/certificates. NOT backend/export generation. NOT fake charts/reports. Introduce an Admin Menu Coverage Gate so no admin page is forgotten."

---

## Overview

Specs 027 (families/students/courses/groups) and 028 (teachers/performance) deepened the admin
management surfaces but **explicitly routed every reporting, analytics, feedback, forms, export, and
print concern to Spec 029**. Spec 029 now owns that layer. It has two jobs:

- **Layer A — Reports / Analytics / Feedback / Forms**: make the admin reporting and feedback surfaces
  honest and complete — display-only report/analytics summaries, feedback review lists/details, static
  filters, read-only detail drawers, and honest `backendRequired` export/print/form-submit gates.
- **Layer B — Admin Menu Coverage Gate**: audit the ENTIRE admin sidebar (all six nav categories, every
  item) and guarantee each admin page/action is classified as implemented / deepened-in-029 / folded /
  routed to an owner (030/031/032/future-backend) / intentionally-excluded. After 029, **no admin menu
  item may be an unclassified or dead placeholder.**

This is a **static, HTML-first, fixtures-only** frontend spec. There is NO backend, NO API, NO auth, NO
database, NO real export/download/file-generation, NO chart engine, NO analytics engine, and NO
persisted feedback. Every write ends at an honest gate. This spec is **specify-only**: it produces the
spec and its evidence artifacts; planning decides the exact page-count delta.

### Grounding summary (Targeted Visual Grounding Gate — completed)

A read-only multi-agent audit inspected exact legacy + current evidence (paths cited in
`visual-grounding.md`, `legacy-reports-feedback-coverage.md`, `admin-menu-coverage-inventory.md`,
`current-reports-action-inventory.md`). Key findings that shape this spec:

- **Legacy 029 surfaces (non-finance)**: `analysis-course`, `analysis-student`, `teacher-feedback`,
  `class-feedback`, `families-feedback` (+ `/family/{id}`, `/students`), `family-feedback-categories`,
  `forms` (+ `/create`), `forms-students` (monthly progress-evaluation form).
- **Legacy used FORBIDDEN engines**: `analysis-course` (Chart.js), `analysis-student` (ApexCharts +
  amCharts5 geo-map), `teacher-feedback`/`class-feedback` (ApexCharts + a computed **Percentage** column),
  `families-feedback/students` (computed completion-rate **%** KPI tiles). The app's standing law forbids
  chart engines AND computed score/rank/percentile. **029 reproduces the same underlying data
  display-only (tables/cards/status-chips), never as charts and never as derived percentages.**
- **Legacy feedback INPUTS are categorical** (Excellent/Very Good/Good/…, Always/Often/…), not numeric —
  so the honest representation is authored categorical labels, not a computed number.
- **Finance-tinted legacy surfaces → 030**: `analysis-expenses` (P&L/salaries/EUR), `analysis-invoices`
  (paid/due/overdue/AED), `salary-class-report`, `downlaod` (invoice accounting), `invoicesexportdata`.
- **Current app**: `reports.html` already exists (implemented) with export/print gates; `sessions-analysis.html`
  exists (Spec 026); teacher-performance is display-only; **no admin feedback surface exists** — the real
  gap. No chart engine exists anywhere in `app/src/js`. The closed `data-*` hook set, `previewTemplate`/
  `sheetRow`, `filterBar`, and `data-row-menu` cover everything 029 needs with **zero new hooks**.

---

## User Scenarios & Testing *(mandatory)*

### User Story 1 — Admin reviews report & analytics summaries honestly (Priority: P1)

An academy admin opens the reporting surfaces (Reports overview, sessions analysis, teacher-performance,
plus any analytics summary 029 surfaces) and sees authored, display-only counts, status signals, and
table/card rows. Real static filters/tabs let them narrow the view. Nothing shows a fake chart, a
computed percentage/score, or a generated file.

**Why this priority**: This is the core honesty promise of the spec and the largest surface area. It is
the MVP: an admin can navigate every reporting page and trust that what they see is either real (a link/
filter/detail) or an honest gate — never a decorative dead control.

**Independent Test**: Load `reports.html` and every 029-scoped report/analytics page in AR + EN; confirm
filters/tabs work, summaries are authored counts (equal to their row counts, no runtime aggregation), no
`<canvas>`/chart/percentile appears, and every non-link action opens a page/modal/drawer/gate.

**Acceptance Scenarios**:

1. **Given** the Reports overview page, **When** the admin selects a category/availability filter, **Then**
   the visible report cards facet client-side (real static filter) with no page reload and no fake data.
2. **Given** any report/analytics summary tile, **When** the admin reads it, **Then** the figure is an
   authored fixture value (never a derived score/rank/percentile) and no chart is rendered.
3. **Given** a report row with a detail affordance, **When** the admin activates it, **Then** a read-only
   drawer/modal opens showing authored fields (no edit persistence).

---

### User Story 2 — Admin reviews feedback items and opens details honestly (Priority: P1)

An admin opens the feedback review surface(s) (teacher feedback, class feedback, family/guardian feedback,
student progress feedback) and sees authored display-only rows: who, what category, a categorical remark/
note, a status. Selecting a row opens a read-only detail drawer. Any create/edit/approve/delete feedback
action ends at an honest `backendRequired`/confirm gate. No percentage is computed; no feedback is saved.

**Why this priority**: Feedback is the biggest *missing* admin surface today (audit: only an outcome-drawer
"Add feedback" demo-action + a student Evaluation tab exist). Delivering an honest feedback review layer is
the spec's most novel value, but it is P1-tied-with-US1 because it must not introduce the forbidden computed
percentage the legacy carried.

**Independent Test**: Open the feedback review surface(s) in AR + EN; confirm rows are authored, the detail
drawer is read-only, categorical remarks render as labels (not numbers), and every write (create/edit/
approve/delete/submit) is a `backendRequired`/confirm gate with no DOM mutation or persistence.

**Acceptance Scenarios**:

1. **Given** a feedback list, **When** the admin opens a feedback item, **Then** a read-only drawer shows
   authored fields (author, category, categorical remark, date, note) with no edit form that persists.
2. **Given** a "Create/Edit feedback" or "Create category" action, **When** the admin activates it, **Then**
   an honest modal opens whose final Save/Create says the server connection is required (nothing saved).
3. **Given** an "Approve/Delete feedback" action, **When** the admin confirms, **Then** a confirm modal
   resolves to "available once the server is connected" with no row removal and no status flip.
4. **Given** any feedback surface, **When** the page renders, **Then** NO computed percentage/score/rank
   appears — remarks are categorical labels only.

---

### User Story 3 — Admin uses report/feedback filters as real static filters (Priority: P2)

An admin uses the filter/tab controls on the reporting and feedback surfaces (category, status, availability,
date-range where authored) and the visible rows/cards facet client-side, exactly like the existing
`filterBar`/`data-filter` machinery on other management pages.

**Why this priority**: Filters are the interactivity users expect from a reporting surface; making them
*real* (client-side facet) rather than fake is a concrete honesty win, but it rides on top of US1/US2 pages.

**Independent Test**: Toggle each filter/tab on each 029 surface; confirm the row/card set changes
client-side, "no results" shows an honest empty state, and clearing restores the full set. Date-range or
any control that would require server querying is an honest gate, not a fake filter.

**Acceptance Scenarios**:

1. **Given** a report/feedback filter select, **When** the admin picks a value, **Then** matching rows show
   and non-matching hide (real `data-filter`), with an honest empty state when none match.
2. **Given** a tab switcher on a report surface, **When** the admin switches tabs, **Then** the corresponding
   authored panel shows (real `data-tab`), no data is fetched.
3. **Given** a control that implies server querying (e.g. a cross-period date search), **When** activated,
   **Then** it is an honest `backendRequired`/planned gate — never a control that silently does nothing.

---

### User Story 4 — Admin opens export/print gates honestly, no fake files (Priority: P2)

An admin activates Export / Print / PDF / CSV / Excel on any reporting, feedback, or management surface and
gets an honest response: either a clear disabled-with-reason gate or a modal explaining a server export is
required. No file is generated, nothing downloads, and no control silently no-ops.

**Why this priority**: Export/print is the single most common "looks real but isn't" trap; Specs 027/028
routed all of it here. Making every export/print outcome honest across the app closes that debt.

**Independent Test**: Enumerate every Export/Print/PDF/CSV/Excel control across the reporting + management
surfaces; confirm each is a `backendRequired`/planned gate (disabled-with-reason or a backendRequired modal),
none downloads a file, none silently does nothing.

**Acceptance Scenarios**:

1. **Given** an Export CSV/PDF control, **When** the admin clicks it, **Then** an honest reason ("requires the
   server connection / out of current scope") is surfaced and no file is produced.
2. **Given** a Print control that currently only fires a toast, **When** 029 reclassifies it, **Then** it
   reads as an honest backendRequired gate consistent with the other export controls (no fake "printing…").
3. **Given** the `sessions-analysis` export control (currently a native disabled button), **When** 029 reviews
   it, **Then** it is either kept honest or upgraded to the clickable disabled-with-reason idiom — never a
   silent dead button.

---

### User Story 5 — Admin sees forms/feedback actions as modal/confirm/gate, no fake persistence (Priority: P3)

An admin interacts with the forms/surveys surface (dynamic form list, create form, per-student progress form)
and the feedback-authoring actions. Each opens a modal/confirm/drawer whose final write is an honest
`backendRequired` gate. No form is saved, no submission is persisted, no response count is computed.

**Why this priority**: The legacy forms builder is a genuine capability but building a real form engine is
out of scope; representing it honestly (display-only list + backendRequired create/submit) is a smaller,
lower-risk slice that depends on the US1/US2 surfaces existing first.

**Independent Test**: Open the forms surface; confirm the form list is authored/display-only, "Create form"
opens a backendRequired modal, any per-student progress form's Save/Submit is a gate, and response/question
counts are authored literals (not aggregated).

**Acceptance Scenarios**:

1. **Given** the forms list, **When** it renders, **Then** rows are authored (title, question count, response
   count, status) with counts as static literals — no aggregation engine.
2. **Given** "Create form" or "Submit progress form", **When** activated, **Then** an honest backendRequired
   modal/confirm resolves with nothing saved.

---

### User Story 6 — Product owner verifies every report/feedback action has an outcome (Priority: P1)

A product owner (or QA) audits the reporting/feedback/forms surfaces and confirms **every** visible button/
link/action resolves to exactly one honest class: real page-link, real static tab/filter, real modal, real
drawer, or honest backendRequired/planned/permission gate. Zero dead buttons, zero `href="#"`, zero fake
submit/save/export/download/print/chart/percentage.

**Why this priority**: This is the action-completion law carried from Specs 026/027/028. It is the pass/fail
gate for the whole spec.

**Independent Test**: Run the smoke suite; assert `href="#"` count = 0, no raw `⟦key⟧`, no dead buttons, no
fake-success wording, no pay/chart/percentile leakage on the 029 surfaces, and every 029 action maps to a
handled hook or honest gate.

**Acceptance Scenarios**:

1. **Given** all 029 surfaces, **When** smoke runs, **Then** every action is classified and non-dead; no
   forbidden pattern (fake export/chart/percentage/feedback-submit/report-generation) appears.

---

### User Story 7 — Product owner verifies every admin menu item has an owner/status (Priority: P1)

A product owner opens `admin-menu-coverage-inventory.md` and finds every admin nav item (all six categories,
every item + sub-section) classified with a current status and an owner spec. No admin menu item is
unclassified; no implemented item is a dead placeholder; every planned item routes to 029 / 030 / 031 / 032 /
future-backend / intentionally-excluded / folded.

**Why this priority**: This is the "Admin Menu Coverage Gate" — the spec's second mandate and the guarantee
that no admin page is forgotten after 029.

**Independent Test**: Cross-check every item in `nav.config.js` against the coverage inventory; confirm a
1:1 mapping with a status + owner for each, and that the build-time nav guard (implemented⇒route, non-impl⇒
no-route, disabled⇒reason) still holds.

**Acceptance Scenarios**:

1. **Given** the coverage inventory, **When** compared to `nav.config.js`, **Then** every nav id appears
   exactly once with a status and an owner spec, and no row is left `[UNCLASSIFIED]`.

---

### User Story 8 — Developer sees which pages belong to 030/031/032/future-backend (Priority: P2)

A developer reads `future-owner-register.md` and `finance-exclusion-register.md` and can tell, for every
out-of-scope report/feedback/finance/settings/certificate surface, which future spec owns it and why — so
030 (finance), 031 (management/content/certificates/settings/materials), and 032 (final QA) have an explicit,
non-overlapping backlog.

**Why this priority**: Clean handoff prevents scope creep into 029 and prevents dropped work later; it's
documentation value that supports but doesn't block the user-facing stories.

**Independent Test**: Confirm every out-of-scope item surfaced by the audit appears in the future-owner or
finance-exclusion register with an owner and rationale.

**Acceptance Scenarios**:

1. **Given** a finance-tinted legacy report (expenses/invoices/salary-class-report), **When** a dev looks it
   up, **Then** it is registered to 030 with the finance-invariant rationale, and 029 builds none of it.

---

### User Story 9 — QA runs smoke/a11y/screenshots and finds zero dead/fake report actions (Priority: P1)

QA runs the full verification suite after implementation and finds: public HTML count matches the planned
target, every 029 surface loads AR + EN, a11y critical = 0 / serious = 0, screenshots capture the report/
feedback/gate states with 0 console errors, and all role-law regressions stay green.

**Why this priority**: Verification is how the spec is proven done; it is the acceptance backbone.

**Independent Test**: `npm run build` → count matches; `npm run test:smoke` PASS; `npm run test:a11y`
critical=0 serious=0; `node tests/screenshots/capture.cjs` 0 console errors.

**Acceptance Scenarios**:

1. **Given** the implemented spec, **When** QA runs build+smoke+a11y+screenshots, **Then** all pass, all
   role laws (teacher pay-free, family zero-pay, student child-view, admin finance invariant) stay green,
   and Spec 026/027/028 pages remain byte-identical except intended 029 deltas.

---

### User Story 10 — Existing role laws from 021–028 stay green (Priority: P1)

After 029, the teacher portal remains pay-free (16 files byte-identical), family surfaces carry zero pay
figures, the student surface stays child-view (no «لوحة الطالب»), and the admin finance boundary is
Spec-009-invariant (no salary/payroll/profit/loss/payment math anywhere in 029).

**Why this priority**: These are binding standing laws; any regression fails the spec regardless of feature
quality.

**Independent Test**: Run the payHit/tchPay/famPay/payFigure/child-view smoke regexes byte-verbatim over the
029 surfaces and the protected file sets; confirm all green and the protected files unchanged.

**Acceptance Scenarios**:

1. **Given** the 029 changes, **When** the role-law smoke asserts run, **Then** all pass byte-verbatim and no
   finance/pay figure, computed score, or forbidden wording is introduced.

---

### Edge Cases

- **Legacy computed % column**: `teacher-feedback`/`class-feedback` had a `Percentage` column and
  `families-feedback/students` had completion-rate `%` KPIs. → 029 MUST NOT reproduce these as computed
  values. It shows the underlying categorical remark/status text or omits the number; if a percentage is
  ever displayed it must be an authored fixture literal clearly not derived at runtime.
- **Legacy 500 pages**: `export-course` and `families-feedback/family/1` returned HTTP 500 in the crawl —
  no rendered UI to ground on. → treat as "an action exists" only; represent as an honest gate, do not invent
  fields.
- **Legacy chart canvases**: three chart engines were present in legacy. → 029 renders zero charts; the
  hand-rolled `sparkline.js` primitive MUST NOT be repurposed as an analytics/feedback metric.
- **Print currently fires a toast**: `reports.js` Print is a `data-demo-action` (honest "available once the
  server is connected") — acceptable, but 029 should evaluate reclassifying it to a disabled-with-reason
  export gate for cross-surface consistency (planning decision).
- **`sessions-analysis` export is a native disabled button**: honesty-inconsistent with the clickable
  disabled-with-reason idiom used elsewhere. → 029 keeps it honest or upgrades it; never a silent dead button.
- **Empty filter result**: a filter that matches nothing shows the honest `noResults` empty state, not a
  blank panel.
- **Forms "Responses" count**: legacy showed response counts — 029 shows an authored literal, never a live
  aggregation.
- **Finance leakage in a report**: any legacy report that mixes academic + money data is split — academic
  rows may surface display-only; money rows route to 030. No pay figure enters a 029 body.

---

## Requirements *(mandatory)*

### Functional Requirements

**Grounding & audit**

- **FR-001**: The spec MUST be grounded in exact legacy + current evidence (Targeted Visual Grounding Gate),
  with every claimed legacy/current surface citing a concrete evidence path (see `visual-grounding.md`).
- **FR-002**: The spec MUST inventory legacy reports/analytics/feedback/forms/export coverage and map each to
  a current page/module, a disposition, and an owner (`legacy-reports-feedback-coverage.md`).
- **FR-003**: The spec MUST produce a complete **Admin Menu Coverage Inventory** classifying EVERY admin nav
  item (all six categories + sub-sections) with status + owner + page/fold/modal decision; no item may be
  unclassified (`admin-menu-coverage-inventory.md`).
- **FR-004**: The spec MUST inventory every current report/feedback/analytics/export/print action with its
  element type, hook, current behavior, expected behavior, classification, and owner
  (`current-reports-action-inventory.md`).
- **FR-005**: The spec MUST register every missing/dead/misleading/out-of-scope action with a resolution and
  owner; no row may remain unresolved (`missing-action-register.md`).

**Reports / analytics behavior**

- **FR-006**: Report/analytics filters and tabs MUST be real static client-side controls (`data-filter`/
  `data-tab`) or honest gates — never fake controls that no-op.
- **FR-007**: Report/analytics summary tiles MUST be authored display-only figures equal to their underlying
  authored row counts; NO runtime aggregation, NO derived score/rank/percentile.
- **FR-008**: Report/analytics tables/cards MUST be authored fixture rows; details MAY open a read-only
  drawer/modal (`previewTemplate`/`sheetRow`).
- **FR-009**: The spec MUST NOT introduce a chart engine or `<canvas>`/library chart, and MUST NOT repurpose
  `sparkline.js` as an analytics/feedback metric.

**Feedback / forms behavior**

- **FR-010**: Feedback lists MUST be authored display-only rows; feedback detail MAY open a read-only drawer.
- **FR-011**: Create/Edit feedback or feedback-category actions MUST be honest modals whose final Save/Create
  is a `backendRequired` gate (nothing persisted).
- **FR-012**: Submit/Approve/Delete feedback actions MUST be confirm/`backendRequired` gates with NO DOM row
  removal, NO status flip, NO persistence.
- **FR-013**: Feedback MUST render categorical remarks/labels only; NO computed percentage/rating is allowed.
- **FR-014**: The forms/surveys surface MUST be a display-only list; Create-form and per-student progress-form
  Save/Submit MUST be `backendRequired` gates; question/response counts MUST be authored literals.
- **FR-015**: Any feedback item involving payment/finance MUST route to 030 (never surfaced with a figure in
  029).

**Export / print behavior**

- **FR-016**: Every Export/Print/PDF/CSV/Excel control MUST be a `backendRequired`/planned gate (disabled-
  with-reason or a backendRequired modal); it MUST NOT generate a fake file and MUST NOT silently no-op.
- **FR-017**: Existing export/print controls that currently imply success (a Print toast, a native disabled
  button) MUST be reviewed and, where inconsistent, reclassified to the honest gate idiom.

**Admin menu coverage gate**

- **FR-018**: After 029, every admin menu item MUST be implemented, deepened-in-029, folded, routed to an
  owner spec, or intentionally-excluded — with the decision recorded. No dead placeholder may remain.
- **FR-019**: For each menu item the inventory MUST record whether it needs a standalone page, a modal/drawer,
  or action-deepening, and (if a page) whether it should be folded into an existing page.
- **FR-020**: The build-time nav guard invariants MUST hold (implemented⇒route, non-implemented⇒no route,
  disabled⇒reasonKey).

**Finance / role-law preservation**

- **FR-021**: The spec MUST create a finance-exclusion register listing every finance-tinted legacy report/
  nav item, its owner (030 / excluded), and the smoke-grep strategy that keeps finance out of 029 bodies
  (`finance-exclusion-register.md`).
- **FR-022**: 029 MUST NOT build finance/invoices/payroll/banks/salary pages or introduce any salary/payroll/
  profit/loss/payment calculation; the admin finance Spec-009 invariant MUST stay green (finance/reports
  finance-bodies byte-identical).
- **FR-023**: 029 MUST preserve the teacher pay-free GLOBAL law (16 teacher-portal files byte-identical;
  `teacher-performance.html` stays the sanctioned display-only admin board with no score/rank/chart/payroll),
  the family zero-pay law, and the student child-view law.

**Scope / count / impact**

- **FR-024**: The spec MUST route every out-of-scope action/page to a future owner (030/031/032/future-
  backend/intentionally-excluded) with rationale (`future-owner-register.md`).
- **FR-025**: The default public HTML count preference is **97** (deepen via existing pages/modals/drawers/
  folds); any standalone-page candidate MUST be identified only from admin-menu coverage and MUST pass the
  page-candidate test in `modal-and-page-scope.md`. The EXACT count is fixed in planning, not specify.
- **FR-026**: 029 MUST NOT cause accidental removals or unrelated additions; Spec 026/027/028 pages stay
  byte-identical except intended 029 deltas.

**Honesty / no-fake / no-backend**

- **FR-027**: 029 MUST introduce NO backend/API/auth/database, NO real report/chart/export generation, NO real
  feedback persistence, NO notification/chat/live-room engine.
- **FR-028**: 029 MUST reuse the CLOSED `data-*` hook set and existing display primitives (`filterBar`,
  `previewTemplate`/`sheetRow`, `data-row-menu`, `data-tab`, `data-confirm`, `data-modal-trigger`,
  `data-disabled-reason`); NO new hook, NO new storage key, NO new engine.
- **FR-029**: 029 MUST keep `href="#"` = 0 sitewide, zero raw locale keys, zero dead buttons, and zero
  fake-success wording; every `data-action` is handled or an honest gate.

**Verification**

- **FR-030**: The spec MUST define smoke/a11y/screenshot scope covering count, all 029 pages loading AR+EN,
  menu-coverage completeness, action honesty, no-fake-export/chart/percentage/feedback-submit, no finance/pay
  leakage, filters/tabs working, all prior-spec protections, and mobile 390.

### Key Entities *(display-only; no persistence)*

- **Report**: an authored report surface (overview card or summary board) — id, title, area/category, a set
  of authored count tiles, real deep-links, availability signal. No computed aggregate.
- **Report filter**: a client-side facet control (category/area/availability/status) over report cards/rows.
- **Report row**: an authored fixture row within a report table/list — display fields only.
- **Feedback item**: an authored feedback record — author (teacher/family/class), category, categorical
  remark/label, date, note, status. No numeric score/percentage.
- **Feedback category**: an authored label (name, description, status, member/usage count as a literal).
- **Feedback detail**: read-only drawer view of a feedback item.
- **Form / survey**: an authored form definition — title, authored question count, authored response count,
  status. No live response engine.
- **Form submission (progress form)**: a categorical progress-evaluation record (achievements text +
  categorical radios) — represented display-only; Save/Submit is a gate.
- **Export action**: a backendRequired/planned gate (CSV/PDF/Excel/Print) — never a real file.
- **Print action**: a backendRequired/planned gate — never a fake print.
- **Admin menu item**: a nav entry — category, id, label, status, route(if implemented), owner spec, page/
  fold/modal decision.

---

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 100% of admin menu items (every id in `nav.config.js`, all six categories + sub-sections) are
  classified in the coverage inventory with a status and an owner spec; 0 unclassified.
- **SC-002**: 100% of visible actions on the 029-scoped reporting/feedback/forms surfaces resolve to one
  honest class (page-link / static tab / static filter / modal / drawer / honest gate); 0 dead buttons.
- **SC-003**: `href="#"` count = 0 sitewide; raw `⟦key⟧` count = 0 on 029 surfaces; fake-success wording
  count = 0.
- **SC-004**: 0 chart engines / `<canvas>` charts introduced; 0 computed score/rank/percentile on 029
  surfaces; 0 finance/pay figures in any 029 page body (smoke grep green).
- **SC-005**: Every Export/Print/PDF/CSV/Excel control across the reporting + management surfaces is an
  honest gate; 0 fake files generated; 0 silent no-ops.
- **SC-006**: a11y critical = 0 and serious = 0 across all changed 029 pages (AR+EN, light+dark, mobile 390).
- **SC-007**: Public HTML count equals the planning-fixed target (default 97 unless a standalone page is
  justified + build-verified); Spec 026/027/028 pages byte-identical except intended deltas.
- **SC-008**: All role-law regressions stay green: teacher pay-free (16 files byte-identical; payHit/tchPay
  byte-verbatim), family zero-pay (famPay/payFigure byte-verbatim), student child-view, admin finance
  Spec-009 invariant (finance bodies byte-identical).
- **SC-009**: Every out-of-scope report/feedback/finance/settings/certificate surface surfaced by the audit
  appears in the future-owner or finance-exclusion register with an owner and rationale.

---

## Assumptions

- **Baseline**: Spec 028 is the committed baseline (HEAD `4be3e87`); public HTML count is exactly 97 and the
  working tree is clean. If the count is not 97 at plan/implement time, STOP and report.
- **Static-first**: The app remains static HTML-first, fixtures-only, GitHub-Pages-compatible; no backend is
  introduced by 029.
- **Legacy is capability coverage, not pixel/behavior clone**: legacy charts and computed percentages are
  evidence of a *capability* to represent honestly (display-only), not a UI to reproduce.
- **Count default**: 97, unless the admin-menu coverage produces a standalone-page candidate that passes the
  page-candidate test; the exact count is a planning decision, not part of specify.
- **Feedback representation**: because legacy feedback inputs are categorical, honest feedback is authored
  categorical labels; the legacy computed `Percentage` is treated as forbidden-to-derive.
- **Reports.html already exists**: 029 deepens the existing reporting surface rather than assuming a greenfield
  page; new pages are the exception, justified only from menu coverage.
- **Owner boundaries**: 030 owns finance/invoices/payroll/banks; 031 owns management/content/certificates/
  settings/materials; 032 is final QA; anything needing a real engine is future-backend.
- **No implementation in this phase**: this is `/speckit.specify` — no plan, no tasks, no code, no commit.

---

## Out of Scope (routed or excluded)

- **Finance/payroll/invoices/banks/salary** (incl. legacy `analysis-expenses`, `analysis-invoices`,
  `salary-class-report`, `downlaod`, `invoicesexportdata`) → **030** (or intentionally-excluded / future-
  backend). No pay figure or money math enters 029.
- **Settings / materials / books / certificates / staff** (nav `admin` + `settings` categories; legacy
  `pdf`/certificate designer, WhatsApp insights, data-backup) → **031** / future-backend.
- **Leads / new-requests / messages / announcements / tasks / time-converter / schedule-search** → their own
  future specs / future-backend (not 029).
- **Real backend/API/auth/database, real report/chart/export generation, real feedback persistence, real
  notification/chat/live-room engine** → future-backend.
- **Teacher portal pay/finance/chat/live-room pages, family payment page, student primary-role page** →
  intentionally-excluded (binding role laws).
- **Computed score/rank/percentile/chart** → forbidden everywhere (standing law).
