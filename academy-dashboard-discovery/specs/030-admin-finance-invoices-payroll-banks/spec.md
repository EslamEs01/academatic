# Feature Specification: Admin Finance / Invoices / Payroll / Banks Deep Management

**Feature Branch**: `feature/012-role-portal-foundation` (spec dir `specs/030-admin-finance-invoices-payroll-banks`)
**Created**: 2026-07-08
**Status**: Draft (specify-only — no plan, no tasks, no implementation)
**Spec number**: 030
**Baseline**: Spec 029 implemented in the working tree (awaiting watcher commit; HEAD `4be3e87`); 97 public HTML; count re-verified 97.
**Input**: User description: "Admin Finance / Invoices / Payroll / Banks Deep Management. Make the finance/admin money pages honest, complete, and non-dead WITHOUT pretending money operations happen. NOT a real payment gateway / payroll execution / payout movement / invoice generation / bank reconciliation / backend."

---

## Overview

Specs 026–029 routed every finance, invoice, payment, salary, payroll, bank, payout, and money-analytics
surface to Spec 030. Spec 030 now owns the finance domain. Its job is to make the admin money pages honest
and complete — display-only authored rows, read-only detail drawers, real static filters/tabs, and honest
`backendRequired`/`disabled-with-reason` gates for every write — **without faking a single money operation.**

This is a **static, HTML-first, fixtures-only** frontend spec. There is NO backend, NO API, NO payment gateway,
NO bank connection, NO payroll engine, NO invoice/PDF generator, NO export/download engine, NO reconciliation,
and NO money arithmetic. Every displayed figure is an authored literal or a row count. This spec is
**specify-only**: it produces the spec and its evidence artifacts; planning decides the exact page-count delta.

### Two binding money-figure classes (grounded, from the standing law)

- **Invoice / payment amount literals — ALLOWED** (Spec-009-sanctioned): a single authored per-invoice /
  per-payment amount, admin-only, with **zero aggregate/sum/balance/math**.
- **Salary / payroll / compensation / payout FIGURES — NEVER allowed anywhere** (Spec 016 / 024-B-09 law):
  so the salaries, staff-salaries, class-salary-report, and payouts surfaces are **STATUS-FIRST and
  FIGURE-FREE** — names + status + honest gates, NO salary/payout amount.
- **Computed aggregates (Total Income / Net Income / Total Expenses / P&L / summed salaries / invoice balance)
  — FORBIDDEN** (computed profit/loss): the legacy accounting-hub KPI band and analysis-expenses / analysis-
  invoices boards are NOT reproduced as figure boards; they become status-first summaries or planned gates,
  and their legacy charts (ApexCharts / Chart.js) are never reproduced.

### The Spec-009 invariant supersession (grounded)

Spec 030 is the **first spec permitted to modify `finance.html`** and the finance file set. It **SUPERSEDES**
the Spec-009 "zero git diff / finance `#page-body` byte-identical" invariant via a **declared amendment**,
while **KEEPING** every permanent Spec-009 guarantee: no money arithmetic, no chart/canvas, status never
mutates on interaction, no receipt/upload/`type="file"`, `FINANCE_SUMMARY` stays row-count-only, every number
is an authored literal or a row count, every action is honest. Planning fixes exactly which finance smoke
counts/assertions are superseded (rows/payments/drawers counts, the 9 planned cards, the six locked wallet
nav items) and which stay byte-verbatim (no-arithmetic, no-chart `forbidden` regex, no-mutation-on-confirm,
no-receipt, finance-token-clean on dashboard/reports bodies).

### Grounding summary (Targeted Visual Grounding Gate — completed)

A read-only 3-agent audit inspected exact legacy + current evidence (paths cited in `visual-grounding.md`,
`legacy-finance-coverage.md`, `finance-menu-coverage-inventory.md`, `current-finance-action-inventory.md`):

- **Legacy 030 surfaces**: accounting hub (`/accounting`), transaction ledgers (invoices/salary/session),
  `invoices` (+`create-parent-invoice` form + New-Transaction record-payment modal), `monthly-invoices`,
  `downlaod` (a mirror of invoices — **no real download control found**), `expense` (+create/edit),
  `analysis-expenses` (Chart.js P&L), `analysis-invoices` (Chart.js), `salaries` (**"Generate Salary" /
  "Request payouts"** + live EUR figures), `staff-salaries` (**"Generate Salary"**), `salary-class-report`
  (computed group-by-sum), `banks` (+`banks/create` — **name only, no credentials**), `payouts` (approve→pay).
- **NEVER built even by 030 → future-backend / intentionally-excluded**: `payout-providers` (Paymob/Payoneer
  **webhook URLs + API key/password fields**), payment-gateway credential settings, teacher-portal salary
  twin (**excluded FOREVER** — pay-free law), family payment page/figure (family zero-pay).
- **Chart engines in legacy finance** (accounting ApexCharts; analysis-expenses/invoices Chart.js) — 030
  reproduces NONE.
- **Current app**: `finance.html` (Spec 009) has invoice tiles/list/payments/planned sections + baked invoice
  drawers; `FINANCE_SUMMARY` is row-count-only (no money arithmetic — grep-confirmed); `finance-actions.js`
  Print is `data-demo-action` (a 030 reclassify candidate, like Spec 029 R-G); nav finance sub-section has 6
  disabled wallet items + banks, `finance` the only real link. No chart engine anywhere in the app.

---

## User Scenarios & Testing *(mandatory)*

### User Story 1 — Admin views the finance overview honestly (Priority: P1)

An admin opens the finance surface and sees authored, display-only invoice/payment status tiles (row counts),
an invoice list with authored single-value amounts, recent payments, and an honest figure-free preview of the
payroll/bank capabilities. Nothing shows a computed total, a profit/loss, a chart, or a fake money operation.

**Why this priority**: The finance overview is the anchor of the whole domain and the highest-traffic money
surface; it is the MVP — an admin can navigate the finance hub and trust every figure is authored, every
action honest.

**Independent Test**: Load the finance surface(s) in AR + EN; confirm status tiles equal their row counts, the
invoice amount literals render with no aggregate/total, no chart/`<canvas>` appears, and every action opens a
page/modal/drawer/gate.

**Acceptance Scenarios**:

1. **Given** the finance overview, **When** it renders, **Then** each status tile count equals the number of
   invoice/payment rows in that status (row-count roll-up, no money arithmetic).
2. **Given** any displayed amount, **When** the admin reads it, **Then** it is an authored per-invoice/per-
   payment literal — never a summed total, balance, net income, or profit figure.
3. **Given** the finance overview, **When** it renders, **Then** NO chart/`<canvas>`/graph and NO computed
   aggregate appears.

---

### User Story 2 — Admin inspects invoices & invoice details without fake payment (Priority: P1)

An admin browses invoices (and monthly invoices) with real static status/date filters, opens an invoice
detail in a read-only drawer, and every write — Create invoice, Mark paid, Record payment, Send invoice,
Download/Export — is an honest `backendRequired`/`disabled-with-reason` gate. No invoice status flips, no PDF
is produced, no payment is recorded.

**Why this priority**: Invoices are the largest, most legacy-grounded finance surface and the one most likely
to imply a real money operation; making every invoice write honest is core to the spec.

**Independent Test**: Open the invoice surface in AR + EN; confirm filters facet client-side, the detail
drawer is read-only, and Create/Mark-paid/Record-payment/Send/Export each resolve to a gate with no status
mutation, no file, no persistence.

**Acceptance Scenarios**:

1. **Given** the invoice list, **When** the admin filters by status/date, **Then** rows facet client-side (real
   static filter) with an honest empty state.
2. **Given** an invoice row, **When** the admin opens it, **Then** a read-only drawer shows authored fields
   (serial, family, month, dates, single-value amount, status) with no editable persisting control.
3. **Given** "Mark paid" / "Record payment" / "Send invoice" / "Create invoice" / "Download PDF" / "Export",
   **When** the admin activates it, **Then** an honest gate/confirm resolves to "available once the server is
   connected" with NO status chip flip, NO file, NO persistence.

---

### User Story 3 — Admin inspects monthly invoices & payment collections honestly (Priority: P2)

An admin opens the monthly-invoices and payments/collections surfaces and sees authored display-only rows
(parent/status; payment method/status/date/amount literal). Add-payment / Verify / Refund / Reconcile are
honest gates. No money moves, no receipt uploads, no refund happens.

**Why this priority**: Payment collection is the second money surface; it must be honest but rides on the
invoice surface existing first.

**Independent Test**: Open the payments/monthly surfaces; confirm rows are authored, statuses are labeled
chips, and every payment write is a gate with no mutation.

**Acceptance Scenarios**:

1. **Given** the payments list, **When** it renders, **Then** rows show authored method/status/date + a single
   authored amount literal; no balance/total is computed.
2. **Given** "Add payment" / "Verify" / "Refund" / "Reconcile", **When** activated, **Then** an honest gate
   resolves with no money movement and no receipt-upload affordance.

---

### User Story 4 — Admin inspects teacher/staff salaries without fake payroll (Priority: P1)

An admin opens the teacher-salaries and staff-salaries surfaces and sees **status-first, figure-free** rows
(name + status only — NO salary amount). Generate salary / Approve / Mark paid / Export payroll are honest
`backendRequired` gates. No salary is generated, no amount is shown, no payout moves.

**Why this priority**: Payroll is the highest-risk surface for the standing "zero pay figures anywhere" law;
getting it status-first and figure-free is a pass/fail gate for the whole spec.

**Independent Test**: Open the salaries/staff-salaries surfaces in AR + EN; confirm NO salary/payout amount
figure appears, rows show name + status only, and Generate/Approve/Pay/Export are gates with no mutation.

**Acceptance Scenarios**:

1. **Given** the teacher/staff salary surface, **When** it renders, **Then** NO salary/payout/compensation
   amount figure appears — only names + status chips + counts.
2. **Given** "Generate salary" / "Approve" / "Mark paid" / "Export payroll", **When** activated, **Then** an
   honest gate resolves with NO generation, NO amount, NO mutation.
3. **Given** the smoke pay-free grep over the salary surface bodies, **When** it runs, **Then** 0 salary/
   payout/compensation figures are found.

---

### User Story 5 — Admin inspects class salary report without a computed salary engine (Priority: P2)

An admin opens the class-salary-report surface. It is display-only (authored figure-free rows) or an honest
planned gate — never a working group-by/sum aggregation. Generate / export / download are gates.

**Why this priority**: The legacy class-salary-report is explicitly a computed group-by-sum engine; 030 must
represent it without reproducing that engine.

**Independent Test**: Open the class-salary-report surface; confirm no computed total/aggregate, no group-by
engine, and Generate/Export are gates.

**Acceptance Scenarios**:

1. **Given** the class-salary-report surface, **When** it renders, **Then** it shows authored figure-free rows
   or an honest gate — NO computed group-by/sum, NO salary total.

---

### User Story 6 — Admin inspects banks/bank accounts without fake bank integration (Priority: P2)

An admin opens the banks surface and sees authored display-only bank-account rows (name/status). Add/Edit bank
account is a `backendRequired` modal; Import statement / Match / Reconcile are honest gates. No bank connects,
no statement imports, no reconciliation runs, no credentials are shown.

**Why this priority**: Banks is grounded and simple (name-only), but the import/reconcile actions are the
integration trap; keeping them honest is required.

**Independent Test**: Open the banks surface; confirm rows are authored (name only), Add/Edit is a modal gate,
and Import/Reconcile are honest gates with no fake integration and no credentials.

**Acceptance Scenarios**:

1. **Given** the banks list, **When** it renders, **Then** rows show authored bank name + status only; no
   credentials/API keys/secrets appear.
2. **Given** "Add bank" / "Import statement" / "Reconcile", **When** activated, **Then** an honest modal/gate
   resolves with no persistence and no fake import/reconciliation.

---

### User Story 7 — Admin opens export/print/download gates honestly (Priority: P2)

An admin activates any Export / Print / PDF / CSV / Excel / Download control across the finance surfaces and
gets an honest gate (disabled-with-reason or a backendRequired modal). No file is generated, nothing downloads,
nothing silently no-ops. The existing finance Print demo-toast is reclassified to a gate for consistency.

**Why this priority**: Export/print is the classic "looks real but isn't" trap and the legacy `downlaod`
surface implied it; making every finance export honest closes that debt.

**Independent Test**: Enumerate every finance Export/Print/PDF/CSV/Download control; confirm each is a gate,
none downloads a file, none silently no-ops.

**Acceptance Scenarios**:

1. **Given** an Export/Print/Download control, **When** activated, **Then** an honest reason is surfaced and no
   file is produced.

---

### User Story 8 — Product owner verifies every finance menu item has an owner/status (Priority: P1)

A product owner opens `finance-menu-coverage-inventory.md` and finds every finance nav item (finance, invoices,
monthlyInvoices, salaries, staffSalaries, payments, classSalaryReport, banks + candidates payouts/analytics)
classified with a status and a disposition (implemented / folded / owner-routed / future-backend / excluded).
After 030, no finance menu item is a dead disabled placeholder that 030 could have handled honestly.

**Why this priority**: This extends the Spec 029 Admin Menu Coverage Gate to the finance sub-section — the
guarantee that no finance page is forgotten after 030.

**Independent Test**: Cross-check every finance nav item against the coverage inventory; confirm a status +
disposition for each, and the build-time nav guard holds.

**Acceptance Scenarios**:

1. **Given** the finance coverage inventory, **When** compared to `nav.config.js`, **Then** every finance nav
   id appears with a status + disposition; no 030-owned item is left unclassified.

---

### User Story 9 — Developer sees which integrations are future-backend (Priority: P2)

A developer reads `future-owner-register.md` and `no-fake-money-register.md` and can tell, for every real
money integration (payment gateway, bank connection, payout providers/credentials, payroll engine, export
generation), that it is future-backend / intentionally-excluded — so 030 builds none of it.

**Why this priority**: Clean handoff prevents 030 from drifting into mocking a payment gateway or bank
integration; documentation value that supports the honesty guarantee.

**Independent Test**: Confirm every real-money integration appears in the future-owner / no-fake-money register
with an owner and rationale.

**Acceptance Scenarios**:

1. **Given** payout-providers (Paymob/Payoneer) or a payment gateway, **When** a dev looks it up, **Then** it
   is registered future-backend/excluded, with no secret/credential ever rendered.

---

### User Story 10 — QA finds zero fake money actions (Priority: P1)

QA runs the full verification suite and finds: public HTML count matches the planned target, every finance
surface loads AR + EN, a11y critical = 0 / serious = 0, screenshots capture the finance states with 0 console
errors, and there is zero fake payment / mark-paid / salary generation / payout / bank import / reconciliation
/ export, zero computed money figure, and zero chart.

**Why this priority**: Verification is how the honesty guarantee is proven; it is the acceptance backbone.

**Independent Test**: `npm run build` → count matches; `npm run test:smoke` PASS; `npm run test:a11y` 0/0;
`node tests/screenshots/capture.cjs` 0 errors; no-fake-money smoke asserts green.

**Acceptance Scenarios**:

1. **Given** the implemented spec, **When** QA runs build+smoke+a11y+screenshots, **Then** all pass and every
   no-fake-money / no-computed / no-chart assertion is green.

---

### User Story 11 — Existing role laws from 021–029 stay green (Priority: P1)

After 030, the teacher portal remains pay-free (16 files byte-identical; no teacher-portal salary/pay page),
family surfaces carry zero pay figures (no family payment page), the student surface stays child-view, and
Spec 026/027/028/029 surfaces remain working (feedback/forms folded into reports.html; teacher-performance
display-only; all-teachers-timetable folded into schedule.html; admin-menu coverage complete).

**Why this priority**: Binding standing laws; any regression fails the spec regardless of finance quality.

**Independent Test**: Run the payHit/tchPay/famPay/payFigure/child-view smoke regexes byte-verbatim; confirm
the teacher-portal + student + family protected sets unchanged and all prior-spec asserts green.

**Acceptance Scenarios**:

1. **Given** the 030 changes, **When** the role-law + prior-spec smoke asserts run, **Then** all pass byte-
   verbatim and no forbidden pattern is introduced.

---

### Edge Cases

- **Salary/payout amount figures**: legacy salaries/staff-salaries/payouts/analysis-expenses show live EUR
  salary amounts. → 030 MUST NOT show any salary/payout/compensation amount figure anywhere; these surfaces are
  status-first and figure-free. Only invoice/payment amount literals are allowed.
- **Computed aggregates**: legacy accounting-hub (Total/Net Income), analysis-expenses (P&L), analysis-invoices
  (Paid/Due/Overdue totals) are computed. → 030 does NOT reproduce them as figure boards; status-first
  summaries (counts) or planned gates only.
- **Legacy charts**: ApexCharts (accounting) + Chart.js (analysis pages). → 030 renders zero charts; no
  `<canvas>`, no chart library, no `sparkline.js` as a metric.
- **`downlaod` route**: legacy has a `downlaod`-named route but no real download control (it mirrors invoices).
  → 030 represents export/download as an honest gate only; no fake file.
- **Money-movement actions**: "Generate Salary", "Request payouts", "Approve selected", "Mark paid", "Record
  payment", "Import statement", "Reconcile" are legacy money-movement actions. → all become honest
  `backendRequired`/`disabled-with-reason` gates; none functional; none mutates a status chip.
- **Payout providers / payment gateway**: legacy exposes Paymob/Payoneer webhook URLs + API key/password
  fields. → future-backend/excluded; 030 NEVER renders a secret, credential, API-key input, or fake
  integration status.
- **finance.html modification**: 030 is the first spec to edit finance.html → the Spec-009 byte-frozen
  invariant is superseded via a declared amendment (permanent guarantees kept).
- **Empty filter result**: an empty filter shows the honest empty state, not a blank panel.
- **Confirm-on-write**: confirming any finance action must not flip a status chip or change a row (no fake
  mutation), consistent with the existing Spec-009 no-mutation guarantee.

---

## Requirements *(mandatory)*

### Functional Requirements

**Grounding & audit**

- **FR-001**: The spec MUST be grounded in exact legacy + current finance evidence (Targeted Visual Grounding
  Gate), each claimed surface citing a concrete evidence path (`visual-grounding.md`).
- **FR-002**: The spec MUST map legacy finance coverage (accounting/invoices/payments/salaries/banks/payouts/
  analytics) → current page/module → disposition → owner (`legacy-finance-coverage.md`).
- **FR-003**: The spec MUST produce a complete **Finance Menu Coverage Inventory** classifying every 030-owned
  finance nav item + candidates with status + disposition; no 030-owned item unclassified
  (`finance-menu-coverage-inventory.md`).
- **FR-004**: The spec MUST inventory every current finance action with its element type, hook, current
  behavior, expected behavior, classification, and owner (`current-finance-action-inventory.md`).
- **FR-005**: The spec MUST register every missing/dead/misleading/out-of-scope finance action with a
  resolution and owner; no row unresolved (`missing-action-register.md`).

**Amount & calculation law**

- **FR-006**: Invoice/payment amount literals MAY be displayed as authored single-value fixture fields with
  **zero aggregate/sum/balance/math**; NO runtime calculation of totals, net profit, salary, payroll, payment
  balance, discounts, or payout amounts; NO aggregation engine; any displayed total MUST be an authored literal.
- **FR-007**: Salary / payroll / compensation / payout FIGURES MUST NOT appear anywhere (including admin finance
  pages); salaries/staff-salaries/class-salary-report/payouts surfaces are STATUS-FIRST and FIGURE-FREE.
- **FR-008**: Computed aggregates (Total Income, Net Income, Total Expenses, P&L, summed salaries, invoice
  balance) MUST NOT be reproduced as figures; the accounting-hub KPI band and analysis-expenses/invoices boards
  become status-first summaries or planned gates.
- **FR-009**: NO chart engine / `<canvas>` / library chart MUST be introduced; legacy ApexCharts/Chart.js are
  evidence only; `sparkline.js` MUST NOT be repurposed as a finance metric.

**Invoice / payment / bank behavior**

- **FR-010**: Invoice rows MAY be display-only; invoice detail MAY open a read-only drawer; Create/Edit invoice
  = `backendRequired` modal; Mark-paid / Send invoice / Record payment / Download PDF / Export =
  `backendRequired`/`disabled-with-reason` gates; NO fake payment, NO fake PDF, NO status mutation.
- **FR-011**: Payment rows MAY be display-only; Add payment / Verify / Refund / Reconcile = `backendRequired`
  gates; NO money movement, NO receipt upload (`type="file"` forbidden), NO fake refund.
- **FR-012**: Bank rows MAY be display-only (name/status); Add/Edit bank = `backendRequired` modal; Import
  statement / Match / Reconcile = `backendRequired` gates; NO fake import, NO reconciliation, NO real
  credentials.

**Salary / payroll behavior**

- **FR-013**: Teacher/staff salary rows MAY be display-only STATUS-FIRST (name + status, NO amount); Generate
  salary / Approve / Mark paid / Export payroll = `backendRequired` gates; NO salary calculation engine, NO
  payroll generation, NO payout; teacher-portal pay-free law binding.
- **FR-014**: Class-salary-report MAY be display-only figure-free rows (if grounded) or an honest planned gate;
  any total is an authored literal (figure-free preferred); Generate/export/download = gates; NO computed
  group-by/sum engine.

**Payout / integration exclusion**

- **FR-015**: Payout providers (Paymob/Payoneer/webhooks) and payment-gateway credentials MUST NOT be mocked;
  route to future-backend / intentionally-excluded; NEVER show secrets, credentials, API-key inputs, or fake
  integration status.
- **FR-016**: Payout queue (approve→pay) MUST be display/status-first only; approve/pay = `backendRequired`
  gates; NO real money movement.

**Export / print behavior**

- **FR-017**: Every Export / Print / PDF / CSV / Excel / Download control MUST be a `backendRequired`/planned
  gate; NO fake file, NO fake print, NO silent no-op, NO generated report; the existing finance Print
  demo-toast SHOULD be reclassified to a gate for consistency.

**Finance menu coverage & Spec-009 supersession**

- **FR-018**: After 030, every finance nav item MUST be implemented, folded, or honestly owner-routed; no
  finance item may remain a dead disabled placeholder that 030 could handle honestly; items needing real
  backend/payment/bank integration stay honest future-backend gates.
- **FR-019**: 030 MUST declare a supersession of the Spec-009 finance-body-frozen invariant (via a new finance
  contract) — lifting only the file-freeze / body-byte-identical / 9-planned-card clauses while KEEPING all
  permanent guarantees (no arithmetic, no chart, no mutation-on-confirm, no receipt, row-count roll-ups, no-
  finance-leak on dashboard/reports bodies).
- **FR-020**: The build-time nav guard MUST hold (implemented⇒route, non-implemented⇒no route, disabled⇒
  reasonKey); items flipped from disabled→implemented get a real route + page/fold.

**Role-law preservation**

- **FR-021**: 030 MUST preserve teacher pay-free GLOBAL (16 teacher-portal files byte-identical; no teacher-
  portal salary/pay page; `teacher-performance.html` display-only), family zero-pay (no family payment page/
  figure), and student child-view.
- **FR-022**: 030 MUST NOT regress Spec 026/027/028/029 surfaces (admin-ops, management pages, teacher pages,
  reports feedback/forms fold, folded feedback/forms, folded all-teachers-timetable, admin-menu coverage).

**Scope / count / impact**

- **FR-023**: The default preference is to keep the count as low as possible by folding simple finance
  sub-sections into `finance.html`; any standalone page MUST be legacy-grounded, in the finance menu, un-
  foldable/un-drawerable, and pass the page-candidate test; the EXACT count is fixed in planning.
- **FR-024**: 030 MUST cause no accidental removals or unrelated additions; prior-spec pages stay byte-identical
  except intended finance deltas.

**Honesty / no-fake / no-backend**

- **FR-025**: 030 MUST introduce NO backend/API/auth/database, NO payment gateway, NO bank integration, NO
  payroll engine, NO export/download/PDF/invoice/salary generator, NO reconciliation engine, NO notification/
  chat/live-room engine.
- **FR-026**: 030 MUST reuse the CLOSED `data-*` hook set and existing primitives (`filterBar`, `previewTemplate`/
  `sheetRow`, `data-tab`, `data-confirm`, `data-modal-trigger`, `data-disabled-reason`, `data-filter-set`); NO
  new hook, NO new storage key, NO new engine.
- **FR-027**: 030 MUST keep `href="#"` = 0 sitewide, zero raw locale keys, zero dead buttons, zero fake-success
  wording; every finance `data-action` is handled or an honest gate.
- **FR-028**: Confirming any finance action MUST NOT flip a status chip or mutate a row (no fake mutation).

**Verification**

- **FR-029**: The spec MUST create a `no-fake-money-register.md` listing every action implying money movement /
  salary generation / payout / bank reconciliation / export, its honest replacement, and its smoke assertion.
- **FR-030**: The spec MUST define smoke/a11y/screenshot scope covering count, all finance surfaces loading
  AR+EN, finance menu coverage, action honesty, no-fake-money, no-computed-figure, no-chart, no-salary/payout
  figure, filters/tabs, all prior-spec + role-law protections, and mobile 390.

### Key Entities *(display-only; no persistence, no money math)*

- **Invoice**: authored row — serial, family, student(s), course/group, month, issued/due dates, single-value
  amount literal + unit, status (paid/unpaid/overdue/cancelled), note. No balance/total.
- **MonthlyInvoice**: authored row — parent/family, month, status. No aggregate.
- **Payment / PaymentCollection**: authored row — invoice ref, family, date, method, single-value amount
  literal, status (recorded/pending/returned). No balance.
- **TeacherSalary / StaffSalary**: authored STATUS-FIRST row — name, status, count/period label. **NO amount.**
- **ClassSalaryReportRow**: authored figure-free row (or gate) — grouping label, status. **NO computed sum.**
- **BankAccount**: authored row — bank name, status. No credentials.
- **BankTransaction**: (display-only if grounded) — date, ref, status. No import/reconcile.
- **Payout**: authored STATUS-FIRST row — teacher/name, method, status, requested-at. **NO amount.**
- **PayoutProvider**: NOT modeled in 030 (future-backend) — no credentials/webhooks/keys rendered.
- **FinanceSummary**: row-count roll-up only (counts by status); no money aggregate.
- **FinanceExport**: a `backendRequired`/planned gate — never a real file.

---

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 100% of 030-owned finance nav items are classified in the coverage inventory with a status +
  disposition; 0 unclassified.
- **SC-002**: 100% of visible finance actions resolve to one honest class (page-link / static tab / static
  filter / modal / drawer / honest gate); 0 dead buttons; 0 fake money actions.
- **SC-003**: `href="#"` = 0 sitewide; raw `⟦key⟧` = 0 on finance surfaces; fake-success wording = 0.
- **SC-004**: 0 chart engines / `<canvas>` introduced; 0 computed money aggregate (total/net income/P&L/summed
  salary/invoice balance) on any finance body; 0 salary/payout/compensation figure anywhere (smoke grep green);
  invoice/payment amount literals allowed and non-aggregated.
- **SC-005**: Every finance Export/Print/PDF/CSV/Download control is an honest gate; 0 fake files; 0 silent
  no-ops; 0 receipt-upload/`type="file"` affordance.
- **SC-006**: Confirming any finance write mutates 0 status chips / 0 rows (no fake mutation).
- **SC-007**: a11y critical = 0 and serious = 0 across all changed finance surfaces (AR+EN, light+dark, mobile
  390).
- **SC-008**: Public HTML count equals the planning-fixed target; prior-spec pages byte-identical except
  intended finance deltas; the Spec-009 supersession is declared (not silent).
- **SC-009**: All role-law + prior-spec regressions stay green: teacher pay-free (16 files byte-identical),
  family zero-pay, student child-view, Spec 026/027/028/029 protections.
- **SC-010**: Every real-money integration (gateway, bank, payout providers, payroll engine, export gen) is
  registered future-backend/excluded; 0 secrets/credentials/API-key inputs rendered.

---

## Assumptions

- **Baseline**: Spec 029 is the effective baseline (implemented in the working tree, awaiting the watcher
  commit; HEAD `4be3e87`); public HTML = 97; count re-verified 97. If the count is not 97 at plan/implement
  time, STOP and report.
- **Static-first**: The app stays static HTML-first, fixtures-only, GitHub-Pages-compatible; no backend.
- **Two figure classes**: invoice/payment amount literals allowed (Spec-009-sanctioned, no math); salary/
  payroll/compensation/payout figures never allowed anywhere; computed aggregates forbidden.
- **Legacy is capability coverage**: legacy money-movement actions and charts are evidence of a capability to
  represent honestly (display-only + gates), not a UI to reproduce.
- **finance.html is 030's to modify**: 030 supersedes the Spec-009 byte-frozen invariant via a declared
  amendment, keeping the permanent guarantees.
- **Count default**: minimize (fold into finance.html where clean); the exact count is a planning decision.
- **Owner boundaries**: 031 owns management/content/certificates/settings/materials (incl. payment-gateway
  settings if planning routes them there); 032 is final QA; real backend/payment/bank/payout integration is
  future-backend; teacher-portal salary + family payment are intentionally-excluded.
- **No implementation in this phase**: this is `/speckit.specify` — no plan, no tasks, no code, no commit.

---

## Out of Scope (routed or excluded)

- **Real backend/API/auth/database, real payment gateway, real bank connection, real payroll/reconciliation
  engine, real export/download/PDF/invoice/salary generator** → future-backend.
- **Payout providers (Paymob/Payoneer) credentials/webhooks/API keys, payment-gateway credential settings** →
  future-backend / intentionally-excluded (never mocked; no secret rendered). Payment-gateway *settings pages*
  → 031 (settings) or future-backend.
- **Teacher-portal salary / salary-class-report twin** → intentionally-excluded FOREVER (teacher pay-free law).
- **Family payment page / any family pay figure** → intentionally-excluded (family zero-pay).
- **Salary/payroll/compensation/payout amount FIGURES, computed P&L / Net Income / Total aggregates, charts** →
  forbidden everywhere (standing law).
- **Settings / materials / certificates / staff (non-finance) pages** → 031.
- **Final no-missing QA sweep** → 032.
