# Feature Specification: Finance, Billing & Payments Shell

**Feature Branch**: `009-finance-billing-payments`
**Created**: 2026-07-02
**Status**: Draft
**Input**: User description: "Spec 009 — Finance Billing and Payments Shell: a calm, premium, fixture-only admin finance experience — family invoices, payment status, honest demo/disabled finance actions, planned/backendRequired payroll & accounting surfaces — grounded in the analyzed legacy academy system, reusing Specs 001–008, with no real billing/accounting/payment engine of any kind."

## Context & Grounding *(why this spec is shaped the way it is)*

1. **Legacy finance was the biggest and most scattered module — Spec 009 consolidates it into ONE calm shell.** The analyzed legacy system (`output/`, `frontend-planning/`, `frontend-planning-deep/`) shows finance as the single largest domain (56 pages / 20 templates): an accounting dashboard (10 money KPIs + editable 16-currency FX table), All Invoices, Monthly Invoices (a 3-column stub), Create Parent Invoice (line items + discount/fees/adjustments/instalments), a transactions ledger (invoices/salary/session tabs), Expenses + Expense Heads (income entered via an `is_income` flag — no separate revenue page), Teacher Salaries, Staff Salaries, a 23-column Salary Class Report, Payouts (8 statuses) + Payout Providers, invoice & expense P&L analyses with charts, and a near-empty Banks page. The legacy planning docs' own #1 IA complaint is that finance was "scattered across ~10 flat sidebar entries with overlapping concepts," with dense unresponsive tables and 3–6 inline action pills per row; their improved-IA doc proposes one consolidated Finance group. Spec 009 follows that product recommendation: **one Finance shell page** that organizes family invoices + payments as fixture displays and presents everything else as honest planned/backendRequired cards — never a second accounting sprawl.

2. **The legacy family-billing model grounds the data shape and vocabulary — nothing is invented.** Legacy invoices were **per-family (per-Parent)** rows (`#, Ordered Number, Due Date, Parent, Payment Date, Payment Id, Total Price, Total (AED), Status, Actions`), monthly-grouped on the family-facing billing table (`Serial No, Month-Year, Due Date, Course, Amount, Status`), with course context per line item. Payments were **keyed-in transactions recorded against invoices** ("New Transaction": transaction id, payment date, basic/additional/fees/total, currency, gateway) — there was **no standalone payments list, no receipt/proof-of-payment upload anywhere, and no "partial payment" status** (invoice statuses were Paid / Unpaid, plus Due / Overdue in analytics and SoftDelete for removed invoices). Spec 009's invoice rows, payment rows, and status vocabularies mirror exactly this reality — and deliberately **exclude** partial-payment, draft, and receipt-upload concepts the reference never had.

3. **The current app already reserves the finance seam — Spec 009 formalizes it instead of inventing new surface.** The nav carries **seven `disabled` wallet items** with the shared finance reason ("Requires the billing module (out of current scope)") and a lock icon: `invoices`, `monthlyInvoices`, `salaries`, `staffSalaries`, `payments`, `classSalaryReport` (reports category) and `banks` (admin category) — none has a reserved future route. Every existing billing-adjacent touchpoint is already display-only or disabled-with-reason: the Spec 001 dashboard `revenue` KPI (fixture value 48,200 SAR, present in the approved design PNG), the Spec 004 family `plan`/`hourRate` display stub with its disabled "Manage billing" button (on `family.html` and the add-family wizard), family `fam5`'s "Payment overdue" attention flag, the Spec 005 outcome drawer's disabled "add to credit" action, and the disabled `billingAlerts` settings toggle. Spec 008 removed the legacy revenue report card and — like every scope-guard since Spec 001 — deferred all finance to "a future finance spec." **Spec 009 is that spec**: it pays the recorded debt with a fixture-only shell while every real engine stays out.

4. **Fixture-only honesty is structural, not cosmetic.** Every legacy money behavior requires a backend: invoice totals computed from line items, dual-currency conversion against an FX table, attendance-driven salary generation, session profit ledgers, payout lifecycles through real providers. Therefore on the Spec 009 shell **every displayed number is fixture-authored** — status counts equal the number of authored rows, per-invoice/per-payment amounts are authored literals in a single display currency — and **zero runtime arithmetic ever touches money** (no summation, no FX, no salary math, no computed total anywhere). Payroll, accounting, expenses, analyses, payouts, and banks appear **only** as labeled planned/backendRequired cards with no figures. Actions exist visually but are honest: real links to implemented pages, demo toasts, confirm→demo-toast, or disabled-with-reason — never a real export, send, mutation, or persistence.

5. **Reuse, never duplicate.** The shell is composed from the existing system: `pageHeader`/`summaryCards`, tiles-as-filters (the Spec 005 attendance pattern — which also modernizes the one genuinely good legacy finance pattern, clickable KPI-status tiles above the list), `filterBar`, row/card + baked `previewTemplate` drawer patterns, `reportCard` with the Spec 008 availability chip for planned surfaces, the `confirmAction`/demo/disabled-with-reason action primitives, `chip` status rendering (icon + text, never color-only), and the Spec 008 **availability vocabulary** (`available / demoOnly / planned / backendRequired`) reused as-is for finance surfaces. Two **new** labeled vocabularies are added (invoice-status, payment-status) — distinct as sets from all ten existing maps. No chart/table/form/calendar/payment/accounting library, no new framework, no new runtime engine, no new `data-*` hook.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Admin opens the Finance shell (Priority: P1) 🏗️ MVP headline

An admin opens the new Finance page from the sidebar and immediately understands the academy's billing picture: status summary tiles (counts of paid / unpaid / overdue invoices and recorded payments), a family-invoices section, a recent-payments section, and a clearly-labeled "coming with the billing backend" area for payroll/accounting — with every surface honestly marked as display-only, demo, planned, or backend-required.

**Why this priority**: The shell page is the deliverable; every other story renders inside it. It converts seven locked nav items and five scattered disabled stubs into one coherent, honest destination.

**Independent Test**: Build the app, open `finance.html` (and `finance.en.html`) with JS disabled — the complete shell (tiles, invoice rows, payment rows, planned cards, availability labels) is fully present in the baked HTML.

**Acceptance Scenarios**:

1. **Given** the sidebar, **When** the admin expands the reports category, **Then** a single new implemented "المالية / Finance" item links to `finance.html`, the six disabled wallet items remain locked with their reason toast, and the active pill/topbar title/breadcrumb are correct on the finance page.
2. **Given** `finance.html`, **When** it loads, **Then** the page shows a page header, an honest action cluster, count-only summary tiles, the family-invoices section, the recent-payments section, and the planned payroll/accounting section — with no chart, no giant money KPI, no aggregate revenue/cashflow figure.
3. **Given** any finance number on the page, **When** it is traced, **Then** it equals a fixture-authored value (a count of authored rows or an authored per-row amount) — never a runtime computation.

---

### User Story 2 - Admin reviews family invoices (Priority: P1) 🏗️ MVP

The admin scans fixture-backed invoice rows — serial, family, month, due date, authored amount, course context, and a labeled status chip (paid / unpaid / overdue / cancelled) — and can immediately answer "which families have unpaid or overdue invoices?"

**Why this priority**: Family invoices were the heart of legacy finance and are the primary admin question this shell exists to answer.

**Independent Test**: On the built page, count the invoice rows per status and compare with the summary tiles; verify each row names a real fixture family and links to its profile.

**Acceptance Scenarios**:

1. **Given** the invoice section, **When** the admin scans a row, **Then** it shows serial, family name (linked to `family.html`), billing month, due-date hint, an authored amount with currency (digits rendered LTR inside RTL), linked course/group context, and a labeled icon+text status chip — never color-only.
2. **Given** family `fam5` (already flagged "Payment overdue" since Spec 004), **When** the admin looks at its invoices, **Then** at least one authored invoice is `overdue` — the shell agrees with the existing attention flag.
3. **Given** a trial family with a zero hour-rate, **When** the admin filters by that family, **Then** no invoice rows exist and a calm empty state explains why.
4. **Given** an invoice row, **When** the admin opens "View invoice", **Then** a baked details drawer shows the invoice facts (dates, authored amount lines shown as display-only, status, family/student/course links) with honest actions — and no computed total.

---

### User Story 3 - Admin reviews payment status (Priority: P1) 🏗️ MVP

The admin reviews recent payment rows — date, family, referenced invoice, authored amount, a generic method label (bank transfer / card / cash), and a labeled payment-status chip (recorded / pending / returned) — and can answer "what came in recently and is anything pending?"

**Why this priority**: Paired with invoices, payments complete the two fixture-backed halves of the shell; everything else is planned.

**Independent Test**: Verify every payment row references an existing authored invoice and family, and that payment-status chips use the new labeled map.

**Acceptance Scenarios**:

1. **Given** the payments section, **When** the admin scans a row, **Then** it shows payment date, family (linked), the invoice serial it belongs to, an authored amount, a fixture-backed method label chip, and a labeled status chip.
2. **Given** the fixtures, **When** cross-checked, **Then** no payment row references a `cancelled` invoice or a non-existent family — fixture coherence holds.

---

### User Story 4 - Admin follows finance source links (Priority: P2)

From any invoice or payment, the admin drills into the existing operational pages — family profile, student profile, course/group pages, sessions/attendance context, and (for the payroll planned area) the academic teacher-performance board — in one click.

**Why this priority**: The shell must connect, not duplicate, the Spec 002–007 systems; dead-ends would make it a silo like the legacy module.

**Independent Test**: Click every link on the built page; each resolves to an implemented static page (no `href="#"`, no 404).

**Acceptance Scenarios**:

1. **Given** any invoice/payment row or drawer, **When** the admin clicks its family, student, or course/group context, **Then** the correct implemented profile/directory page opens.
2. **Given** the payroll planned card, **When** the admin looks for teacher context, **Then** the only real link offered is the academic `teacher-performance.html` board (no pay figures) — payroll itself is labeled backend-required, not linked.

---

### User Story 5 - Admin sees planned/backendRequired finance surfaces honestly (Priority: P2)

The payroll and accounting area presents the legacy finance concepts that cannot be honestly shown from fixtures — teacher salaries, staff salaries, class salary report, payouts & compensations, accounting dashboard, expenses & heads, P&L analyses, banks, multi-currency/FX — as calm labeled cards (planned / backendRequired) with a one-line description and **no numbers, no dead links, no fake affordances**.

**Why this priority**: Honesty about what is NOT built is a core product requirement and the direct answer to the legacy system's fake-complete surfaces (empty Banks page, 3-column Monthly Invoices stub).

**Independent Test**: Every card in this section carries an availability chip reading planned or backendRequired; no card shows a money figure or a dead link.

**Acceptance Scenarios**:

1. **Given** the planned section, **When** rendered, **Then** each of the six locked nav concepts (invoices engine, monthly invoices, salaries, staff salaries, payments collection, class salary report) plus accounting/expenses/banks is represented by exactly one labeled card, so the locked sidebar items and the shell tell the same story.
2. **Given** any planned/backendRequired card, **When** the admin activates it, **Then** they get a disabled-with-reason toast (never navigation, never a demo that implies the feature works).
3. **Given** the whole page, **When** grepped visually, **Then** zero teacher/staff pay figures appear anywhere (the Spec 007 no-pay-figure invariant holds).

---

### User Story 6 - Admin uses invoice/payment actions honestly (Priority: P2)

The admin can try the finance actions and every one behaves honestly: **View invoice** opens the baked drawer; **Record payment / Mark as paid** and **Send reminder** ask for confirmation then show a demo toast (nothing mutates — the status chip does not change); **Print** shows a demo toast; **Export CSV / Export PDF / Send invoice / Create invoice** are disabled-with-reason ("requires the real billing backend"). Receipt upload does not appear at all — the reference system never had receipts.

**Why this priority**: Action honesty is the trust contract of the whole demo app; finance is where fake actions would be most damaging.

**Independent Test**: Activate every action control on the page and in the drawer; each yields exactly one of: drawer open, demo toast, confirm-modal→demo toast, disabled-reason toast, or real navigation — and the DOM/fixture state is unchanged afterwards.

**Acceptance Scenarios**:

1. **Given** an unpaid invoice row, **When** the admin confirms "Record payment", **Then** a demo toast appears and the invoice's status chip remains unchanged (no fake mutation).
2. **Given** the export actions, **When** activated, **Then** a reason toast explains the billing backend is required — no file is generated, nothing downloads.
3. **Given** every disabled control, **When** inspected, **Then** it is keyboard-reachable with an accessible reason, matching the app-wide pattern.

---

### User Story 7 - Admin filters invoices and payments (Priority: P2)

The admin narrows the pre-rendered rows with the summary tiles (click a status tile to filter, matching the attendance-page pattern and modernizing the legacy KPI-tiles-as-filters) and a filter bar (status select, family search) — filtering only shows/hides baked rows.

**Why this priority**: Scanning by status is the main workflow; but it is an enhancement over already-visible content, not a data feature.

**Independent Test**: With JS on, click each tile/filter and verify only matching pre-rendered rows remain visible with a live count; with JS off, all rows are simply visible.

**Acceptance Scenarios**:

1. **Given** the summary tiles, **When** the admin clicks "overdue", **Then** only overdue invoice rows remain visible and the tile shows a selected state.
2. **Given** a filter combination with no matches, **When** applied, **Then** the standard no-results state appears with a reset action.

---

### User Story 8 - Dashboard and navigation impact stays minimal and honest (Priority: P3)

The Admin Dashboard is completely unchanged — no money card, no payment totals, no new chip (the dashboard is at its established chip budget and finance is fixture-only). The sidebar gains exactly one implemented Finance item; the six locked finance items and `banks` stay disabled with an accurate reason; `reports.html` stays finance-free per its own Spec 008 guard.

**Why this priority**: Protects Specs 001–008 invariants; violating them would regress accepted work.

**Independent Test**: Verify the dashboard and reports page modules are unchanged and their built page **bodies** contain no finance chrome; the only permitted built-HTML difference on those pages is the shared sidebar gaining the single `finance` nav item (the nav is rendered into every page at build time, so whole-file byte identity is impossible by construction — the invariant is body-scoped, not file-scoped). Run the nav build guard and prior scope-guard greps — all green.

**Acceptance Scenarios**:

1. **Given** the built dashboard, **When** its body/content region is compared with the pre-Spec-009 build, **Then** it is unchanged — no new card, chip, widget, or money figure (the Spec 001 fixture `revenue` KPI stays exactly as the approved design authored it — Spec 009 neither extends nor removes it); the only difference anywhere in the file is the shared sidebar's new finance item.
2. **Given** the sidebar on any page, **When** counted, **Then** exactly one finance item is a real link; the other finance items still show the lock icon and a reason toast whose copy is still truthful now that a fixture shell exists (it must say the real billing backend is required — not that finance is entirely absent).

---

### User Story 9 - Experience stays static, Django-ready, bilingual, and themed (Priority: P3)

Every invoice card, payment row, status chip, action, drawer, empty state, and planned card is baked into complete `finance.html` (Arabic RTL, default) and `finance.en.html` (English LTR) at build time; runtime JS only filters/opens/toasts; light/dark/system themes work; the markup maps cleanly to future Django loops and template tags.

**Why this priority**: Architecture invariant of the whole project (Specs 001–008); breaking it would fail deployment and portability.

**Independent Test**: View source with JS disabled — full content present, no whole-page mount, relative asset paths only, no external requests, no raw missing-key markers; repeat in dark mode and in English.

**Acceptance Scenarios**:

1. **Given** the two built pages, **When** inspected, **Then** each fixture row/card/chip/drawer exists as pre-rendered HTML in loop-shaped, template-ready structures (one row shape per collection), using only the existing `data-*` hook set.
2. **Given** Arabic RTL, **When** amounts, serials and dates render, **Then** digits/dates are wrapped LTR inside the RTL layout, matching the app convention.

---

### User Story 10 - Visual and reference alignment (Priority: P3)

The finance shell reads as the same warm, premium, calm academy product as Specs 001–008 — clean cards, the existing amber "wallet" accent, unmistakably an academy billing surface (families, months, courses) rather than generic accounting software — and screenshot review confirms it against the approved design direction and the legacy screens (product reference only, never visual copy).

**Why this priority**: Screenshot-based visual acceptance is the project's binding acceptance mechanism.

**Independent Test**: Capture the required screenshot matrix and review against the failure-condition list; any FAIL blocks acceptance.

**Acceptance Scenarios**:

1. **Given** the screenshot set (Arabic light + dark, English light, invoice section, payments section, planned cards, confirm modal, invoice drawer, mobile), **When** reviewed, **Then** all pass: no generic-accounting look, no fake revenue dashboard, no giant money KPIs, no gateway/payroll impression, no copied legacy visuals or raw status-code leaks, no raw i18n keys, correct RTL/LTR and dark mode.

---

### Edge Cases

- A trial/zero-rate family has no invoices — the family filter shows the calm empty state, and no fixture pretends they owe anything.
- `fam5` coherence: its pre-existing "Payment overdue" flag and its authored overdue invoice must agree; if fixtures drift, the fixture-coherence check fails the review.
- A `cancelled` invoice shows no payment rows, and record-payment on it is presented disabled-with-reason (status-gated honesty, mirroring the existing group-full gating pattern).
- Filtering to zero results (e.g. a family with no returned payments) shows the standard no-results state with reset.
- Long Arabic family/course names truncate gracefully in rows and the drawer without breaking the RTL layout.
- Dark mode: amber/coral finance chips must keep AA contrast using the existing ink-tint tokens — no new colors introduced.
- Keyboard-only use: locked nav items, disabled export actions, and planned cards all announce their reasons; the drawer and confirm modal manage focus like the existing overlays.
- The English page must not leak Arabic month/serial strings and vice versa — the finance locale overlay must mirror key-for-key in both languages.

## Requirements *(mandatory)*

### Functional Requirements

**Route & Navigation**

- **FR-001**: The system MUST add exactly one new pre-rendered page pair — `finance.html` (Arabic RTL, default) and `finance.en.html` (English LTR) — registered in the static build alongside the existing 19 pages, with its own title/breadcrumb keys. No other new page is added.
- **FR-002**: The sidebar MUST gain exactly one new implemented item `finance` ("المالية" / "Finance") in the reports category, placed with the existing finance block (optionally under a labeled finance section header using the existing section mechanism); it is the page's `activeId`. No other nav item is added, promoted, renamed, moved, or removed.
- **FR-003**: The six disabled finance items (`invoices`, `monthlyInvoices`, `salaries`, `staffSalaries`, `payments`, `classSalaryReport`) and `banks` MUST remain `disabled` with lock icon and reason toast; the shared reason copy MUST be reviewed so it stays truthful now that a fixture shell exists (i.e. it states the real billing backend is required). Each of these concepts MUST be represented on the shell as a labeled planned/backendRequired card so sidebar and shell tell one story. No dead link may exist anywhere.

**Shell Layout & Numbers**

- **FR-004**: `finance.html` MUST be composed of: page header + honest action cluster; count-only status summary tiles; the family-invoices section; the recent-payments section; the payroll & accounting planned section; and source-link affordances — in a calm card flow consistent with Specs 002–008. It MUST NOT contain a chart/graph/canvas, a giant money KPI, an aggregate revenue/income/cashflow figure, or a data-dense legacy-style wide table.
- **FR-005**: Every number on the page MUST be fixture-authored: summary tiles are counts that equal the number of authored rows per status; invoice/payment amounts are authored literals in the single existing display currency. Runtime code MUST NOT perform any arithmetic on money (no summation, no conversion, no derived totals). Multi-currency/FX is explicitly a backendRequired card, never a behavior.

**Family Invoices**

- **FR-006**: A new fixture-only finance model MUST provide authored invoices, each carrying: id, serial, family reference, optional student references, course/group context, billing month, issue/due date hints, authored amount + currency label, status id, and optional note. Authored data MUST cohere with existing fixtures: `fam5` has ≥1 `overdue` invoice (matching its existing payment-overdue flag); zero-rate/trial families have none; amounts are plausible against the existing family `hourRate` display stubs but are never computed from them.
- **FR-007**: A new labeled **invoice-status** vocabulary MUST be introduced with exactly four values — `paid / unpaid / overdue / cancelled` — each icon + text + tone (existing tones only), never numeric or color-only, distinct as a set from all ten existing maps. This mirrors the legacy vocabulary (Paid / Unpaid / Overdue / soft-deleted); `partial` and `draft` MUST NOT be introduced (the reference system had neither).
- **FR-008**: Each invoice MUST render as a baked row/card with the family linked to its profile, context links, the status chip, and row actions; and MUST have a baked details drawer (existing preview-drawer pattern) showing invoice facts and authored amount lines labeled display-only — with no computed total line.

**Payments**

- **FR-009**: The fixture model MUST provide authored payments, each carrying: id, invoice reference, family reference, payment date, authored amount, a fixture-backed generic method label (e.g. bank transfer / card / cash — no real gateway branding or gateway state), and a status id. Every payment MUST reference an existing non-cancelled invoice and its family.
- **FR-010**: A new labeled **payment-status** vocabulary MUST be introduced with exactly three values — `recorded / pending / returned` — grounded in the legacy transaction/payout vocabulary; gateway lifecycle states (failed/refunded/authorized etc.) MUST NOT be modeled — they are backendRequired concepts.

**Planned Payroll & Accounting Surfaces**

- **FR-011**: Teacher payroll concepts (salaries, staff salaries, class salary report, payouts, compensations) MUST appear only as labeled planned/backendRequired cards with a one-line description — zero pay figures, zero salary math, zero new fields on teacher/staff fixtures (the Spec 007 invariant is preserved verbatim).
- **FR-012**: Accounting concepts (accounting dashboard, expenses & expense heads, P&L/invoice analyses, banks, multi-currency/FX) MUST appear only as labeled backendRequired cards — no ledger, no totals, no charts, no editable anything.
- **FR-013**: Finance surfaces MUST reuse the Spec 008 availability vocabulary (`available / demoOnly / planned / backendRequired`) for their availability labeling — reused, not duplicated as a new map — and every section/card MUST carry an availability label so the admin always knows what is real.

**Actions & Filters**

- **FR-014**: A finance action cluster and per-row/drawer actions MUST use only the four existing honesty classes: real link (implemented pages only); demo toast (**Print invoice**); confirm-modal→demo toast (**Record payment / Mark as paid**, **Send reminder**); disabled-with-reason (**Export CSV**, **Export PDF**, **Send invoice**, **Create invoice**). No action may mutate fixture/DOM state (status chips never change), generate a file, send anything, or persist anything. **Upload receipt MUST NOT appear** (the reference had no receipt concept). Record-payment MUST be presented disabled-with-reason on `cancelled` invoices (status-gated, mirroring the existing gating pattern).
- **FR-015**: The invoice/payment lists MUST be filterable via summary-tiles-as-filters plus the existing filter bar (status select, family search) — filtering only shows/hides pre-rendered rows with a live count and the standard no-results state. No new `data-*` hook may be introduced.

**Source Links & Integration Honesty**

- **FR-016**: The shell MUST deep-link outward to implemented pages only: `family.html`, `student.html`, `courses.html`/`course.html`, `groups.html`/`group.html`, `sessions.html`/`attendance.html` context, and `teacher-performance.html` (academic context beside the payroll planned card). All links resolve; none is `#`.
- **FR-017**: Spec 009 MUST NOT modify the dashboard page module (net new dashboard **body** chrome = 0; the Spec 001 fixture `revenue` KPI stays exactly as-is), MUST NOT modify the reports page module/fixtures/components (Spec 008's guard keeps its file set finance-token-free; the reports **body** stays finance-free), and MUST NOT modify family/student/teacher/course/group page modules. The only shared files touched are the nav config, the build registry, and the i18n registration — which means every built page's shared sidebar (including `dashboard.html`/`reports.html`) legitimately gains the one new finance nav item; this shared-shell diff is the only permitted change to those built files and MUST be verified with body-scoped assertions, not whole-file identity.

**Architecture, i18n, Theme, Acceptance**

- **FR-018**: All finance markup MUST be baked at build time into complete static pages (no whole-page mount, no runtime page DOM construction), loop-shaped and Django-template-ready (invoice/payment collections map to template loops; chips map to template tags; the drawer maps to one partial), GitHub-Pages compatible with relative local assets only.
- **FR-019**: A new locale overlay pair (Arabic + English, `fin.*` prefix) MUST provide all finance strings, key-mirrored across both languages, merged via the existing overlay mechanism; no raw key may ever render. Arabic RTL is canonical; digits/dates/serials render LTR within RTL.
- **FR-020**: Light/Dark/System theming MUST work using existing tokens and chip tones only (the established amber "wallet" accent is the finance accent); no new color, no saturated finance palette.
- **FR-021**: The feature MUST pass screenshot acceptance (matrix in SC-008/US10), the existing smoke checks (no raw keys, no external requests, no dead controls, reasons on all disabled controls, shell invariants) and accessibility checks (zero critical), extended to the finance page in both languages.
- **FR-022**: Scope-guard reconciliation: finance vocabulary may exist ONLY in Spec 009's own new files (finance page/fixture/components/locales) plus the minimal nav/build/i18n registration lines; the Spec 001–008 scope-guard audits over their file sets MUST remain green after Spec 009 lands. Spec 009's own guard MUST forbid: real payment gateway, ledger, payroll/salary math, invoice/total computation, FX/currency conversion, real PDF/CSV generation, receipt upload, persistence/mutation, charts, portals, copied legacy assets/wording/raw status-code leaks.

### Key Entities *(fixture-only; no persistence)*

- **Invoice**: an authored family billing record — serial, family (required), students (optional), course/group context, billing month, issue/due hints, authored amount + currency label, status (`paid/unpaid/overdue/cancelled`), note. Display-only; never computed.
- **Payment**: an authored transaction against an invoice — invoice ref, family ref, date, authored amount, generic method label, status (`recorded/pending/returned`). Modeled after the legacy "New Transaction" concept; never collected or persisted.
- **Finance Summary**: authored roll-up counts (invoices per status, payments per status, families-with-dues count) that must equal the authored rows — the shell's tiles read these; the dashboard does not.
- **Planned Finance Surface**: a labeled card for a backend-required legacy concept (monthly invoices, salaries, staff salaries, class salary report, payouts/compensations, accounting, expenses/heads, analyses, banks, FX) — availability label + description, no figures, no dead links.
- **Invoice-Status / Payment-Status vocabularies**: the two new labeled maps (icon + text + tone), sets distinct from all ten existing maps; availability reuses the Spec 008 vocabulary.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: From the finance shell, an admin can answer "which families have unpaid or overdue invoices?" from the summary tiles at a glance and reach any flagged family's profile in **1 click**; **100%** of invoice/payment rows link to a real implemented page.
- **SC-002**: **100%** of numbers on the page trace to fixture-authored values — tile counts equal authored-row counts exactly; **zero** runtime money arithmetic, **zero** FX, **zero** aggregate revenue/cashflow figure anywhere on the shell.
- **SC-003**: **Every** finance action yields exactly one honest behavior (drawer / demo toast / confirm→demo toast / disabled-with-reason / real link); **zero** actions mutate state, change a status chip, produce a file, or send anything; **zero** receipt-upload affordances exist.
- **SC-004**: **Zero** teacher/staff pay figures appear anywhere; **100%** of payroll/accounting surfaces carry a planned/backendRequired label; **zero** dead links or `href="#"` on the page and in the finance nav block.
- **SC-005**: Navigation: exactly **one** new implemented nav item; the six locked finance items + `banks` keep lock + truthful reason; the nav build guard passes; sidebar and shell availability labels agree **100%**.
- **SC-006**: The dashboard and reports page modules are **unchanged**; the built `dashboard.html`/`reports.html` **bodies** (both languages) contain **zero** new finance cards/chips/widgets/figures — the only built-HTML difference on those pages is the shared sidebar's single new finance item (verified by body-scoped DOM assertions: dashboard body finance-chrome count = 0, reports body finance-token count = 0, sidebar finance links = exactly 1, locked finance items still locked); all Spec 001–008 scope-guard audits remain green.
- **SC-007**: Fixture coherence holds: `fam5` has an overdue invoice matching its existing flag; trial families have **0** invoices; **100%** of payments reference an existing non-cancelled invoice + family.
- **SC-008**: The screenshot matrix (finance ar-light, ar-dark, en-light; invoice section; payments section; planned cards; confirm modal; invoice drawer; mobile 390×844) passes review with **0** failure conditions (no generic-accounting look, no fake revenue dashboard, no gateway/payroll impression, no legacy visual/status-code copy, no raw keys, correct RTL/LTR + dark mode); smoke + accessibility checks report **0** critical issues on both finance pages.
- **SC-009**: Reuse verification: the shell introduces **no** new framework, library, runtime engine, or `data-*` hook; status chips, tiles, filter bar, drawer, confirm modal, availability chips, and action primitives are **100%** the existing components; the two new vocabularies are the only new labeled maps.

## Assumptions

- **Route/name decision**: none of the six disabled finance nav items has a reserved future route, and each is narrower than this shell (invoices-only, payments-only, salaries-only…), so promoting one would mislabel the page. Adding one umbrella `finance` item → `finance.html` is the minimal honest change; the disabled items remain as the future per-module routes for real-backend specs (the legacy planning's own "split finance into invoices/accounting + payroll/payouts" guidance is noted for those future specs).
- **Single display currency**: the shell uses the app's existing currency label (SAR, as the Spec 001 KPI does). Legacy dual-currency/FX (16-currency table, AED/EUR/EGP totals) is represented only as a backendRequired card.
- **Authored amounts**: invoice/payment amounts are hand-authored fixture literals chosen to look plausible next to the existing family `hourRate` stubs; they are never derived, and fixture comments must not claim they are.
- **Dashboard stance**: the dashboard is at its established chip budget (Spec 008) and finance is fixture-only, so Spec 009 adds **no** dashboard chrome and leaves the approved-design `revenue` KPI untouched; a future real-backend finance spec revisits dashboard finance signals.
- **No inbound edits**: existing pages (family billing stub, outcome credit action, settings toggle) keep their current disabled-with-reason behavior; deep links flow finance→outward only in this spec.
- **Portals stay out**: the legacy family billing portal (`/student/billing`) and teacher earnings pages remain future-role concepts, never rendered; this shell is admin-only.
- **Naming**: page `finance.html`, nav id `finance`, locale prefix `fin.*`, one new finance fixture module and a small set of finance components following the per-spec naming conventions — exact file names are confirmed at plan stage.
- **Legacy anti-patterns are exclusions, not TODOs**: the 23-column salary report, 3–6 inline row pills, raw status-code leaks ("messages.3"), the misspelled export route, and empty stub pages are documented reference weaknesses this shell deliberately does not reproduce.
