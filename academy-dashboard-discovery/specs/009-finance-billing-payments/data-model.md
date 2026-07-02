# Data Model — Spec 009: Finance, Billing & Payments Shell

Fixture-only display shapes. **No DB schema, no API schema, no persistence, no state machine.** Every shape is authored literal data in `src/js/fixtures/finance.js` (or a labeled map in `src/js/components/finance-status.js`), baked to static HTML at build time, and maps 1:1 to a future Django context dict + template loop. **No field is ever computed from money** — the only derived values are row *counts*.

---

## 1. Invoice *(fixture rows — `INVOICES.rows`, ~9 authored rows)*

| Field | Type / shape | Notes |
|---|---|---|
| `id` | `'inv1'…` | stable key; drawer id = `inv-<id>` |
| `serial` | string literal (e.g. `'INV-2026-014'`) | display serial, LTR span; authored, not sequential-generated |
| `familyId` | existing `famN` id | **required**; must exist in `FAMILY_BY_ID` |
| `studentIds` | array of existing `stN` ids, optional | drawer context links → `student.html` |
| `courseId` / `groupId` | existing `cN` / `grpN` ids, optional | context chip links → `course.html` / `group.html` |
| `monthKey` | `data.fin.month.*` key | billing month label (legacy `Month-Year` column concept) |
| `issuedKey` / `dueKey` | `data.fin.*` date-label keys | authored display hints; **overdue is authored via `statusId`, never computed from a date** |
| `amount` | authored integer literal | display-only; rendered `num(amount)` + `t('unit.sar')` in an LTR span |
| `statusId` | one of `INVOICE_STATUS` ids | `paid / unpaid / overdue / cancelled` |
| `noteKey` | `data.fin.*` key, optional | drawer note line |

**Authored-distribution constraints (enforced by the fixture's build-time coherence guard — D4):** every status appears ≥ 1; `fam5` has ≥ 1 `overdue` invoice (matches its Spec 004 `fam.attn.payment` flag); `fam3`/`fam8` (zero-rate/trial/inactive) have **0** invoices; the single `cancelled` invoice belongs to `fam7` (stopped family); every referenced family/student/course/group id exists. Amounts are plausible beside the family `hourRate` stubs but **authored, never derived** (fixture comment must say so without claiming derivation).
**Django**: `{% for invoice in invoices %}` → `_invoice_row.html`; `{{ invoice.status|invoice_status_chip }}`; `{% url 'family' invoice.family_id %}`.

## 2. Payment *(fixture rows — `PAYMENTS.rows`, ~6 authored rows)*

| Field | Type / shape | Notes |
|---|---|---|
| `id` | `'pay1'…` | stable key |
| `invoiceId` | existing `invN` id | **required**; must reference a **non-cancelled** invoice (guard-enforced) |
| `familyId` | existing `famN` id | must equal the referenced invoice's family (guard-enforced) |
| `dateKey` | `data.fin.*` key | payment date label |
| `amount` | authored integer literal | display-only; never allocated/split/summed |
| `methodKey` | `fin.method.bankTransfer` \| `fin.method.card` \| `fin.method.cash` | generic labels only — **no gateway branding, no gateway state** (legacy gateways are backendRequired) |
| `statusId` | one of `PAYMENT_STATUS` ids | `recorded / pending / returned`; every status appears ≥ 1 |

Modeled on the legacy "New Transaction" concept (keyed-in transaction against an invoice — verified: no standalone payments page, no receipt upload existed). **Django**: `{% for payment in recent_payments %}`; `{{ payment.status|payment_status_chip }}`.

## 3. FinanceSummary *(row-count roll-up — `FINANCE_SUMMARY`)*

| Field | Source | Rule |
|---|---|---|
| `invoices.total/paid/unpaid/overdue/cancelled` | `INVOICES.rows.filter(…).length` | **row counts only** (the `OUTCOME_SUMMARY` precedent) |
| `payments.total/recorded/pending/returned` | same technique | row counts only |
| `familiesWithDues` | distinct `familyId` count over `unpaid|overdue` rows | a count of families, not a balance |

**Never contains**: a money total, average, balance, or FX value. Tiles read these counts; the dashboard does **not** (FR-017). **Django**: context dict `finance_summary`; every number equals a queryset `.count()` downstream, never a `Sum()` on this page.

## 4. InvoiceStatus *(NEW labeled map — `finance-status.js`)*

`{ id, tone, icon, labelKey }` (tones from the styled chip set only): `paid`(`completed`, check-style icon, `fin.status.paid`) · `unpaid`(`amber`, clock-style, `fin.status.unpaid`) · `overdue`(`cancelled`, alert-style, `fin.status.overdue`) · `cancelled`(`neutral`, x-style, `fin.status.cancelled`). Exactly these four — **no `partial`, no `draft`** (verified absent from the reference). Exported `INVOICE_STATUS`, `INVOICE_STATUS_ORDER`, `invoiceStatusOf(id)`, `invoiceStatusChip(id)`. Labeled icon+text, never numeric/color-only; a display fact, not a lifecycle. **Django**: `{{ invoice.status|invoice_status_chip }}` template tag.

## 5. PaymentStatus *(NEW labeled map — `finance-status.js`)*

`{ id, tone, icon, labelKey }`: `recorded`(`completed`, `fin.pay.recorded`) · `pending`(`upcoming`, `fin.pay.pending`) · `returned`(`amber`, `fin.pay.returned`). Exactly these three — no gateway lifecycle (`failed/refunded/authorized/captured/processing` are backendRequired concepts). Exported `PAYMENT_STATUS`, `PAYMENT_STATUS_ORDER`, `paymentStatusOf(id)`, `paymentStatusChip(id)`. **Django**: `{{ payment.status|payment_status_chip }}`.

## 6. FinanceAvailability *(REUSED — imported from Spec 008 `report-status.js`)*

`available / demoOnly / planned / backendRequired` — imported (`REPORT_AVAILABILITY`, `availabilityChip`), **not duplicated** as a new map (FR-013). Renders on section headers and planned cards so the admin always knows what is real. **Django**: the existing `report_availability_chip` tag, reused.

## 7. FinanceAction *(action descriptors — `finance-actions.js`)*

`{ key, kind, hook, labelKey, reasonKey?/toastKey?, gate? }` where `kind ∈ real-link | drawer | demo-toast | confirm-demo | disabled-with-reason`. The binding matrix lives in `contracts/finance-actions-contract.md`; the shape notes: `recordPayment.gate = invoice.statusId === 'cancelled' → disabled-with-reason (fin.reason.cancelled)` (the Spec 006 group-full gating pattern). **No receipt-upload action exists.** No action mutates fixture/DOM state. **Django**: static buttons in partials; hooks unchanged.

## 8. PlannedFinanceSurface *(fixture rows — `PLANNED_FINANCE`, 9 cards)*

`{ id, titleKey, descKey, icon, tone, availability }` — route-less (renders `reportCard`'s disabled-with-reason variant): `monthlyInvoices`(**planned**) · `invoicesEngine` · `paymentsCollection` · `teacherSalaries` · `staffSalaries` · `classSalaryReport` · `payoutsCompensations` · `accountingExpenses` (incl. heads, P&L/invoice analyses, multi-currency/FX) · `banks` (all **backendRequired**). Zero figures, zero links; 1:1 story with the six locked nav items + accounting/expenses/banks. **Django**: `{% for surface in planned_finance %}` → the existing `_report_card.html` disabled variant.

## 9. FinanceSourceLink *(link descriptors, baked into rows/drawer/sections)*

`{ labelKey, href }` with `href` restricted to implemented pages: `family.html` · `student.html` · `courses.html`/`course.html` · `groups.html`/`group.html` · `sessions.html`/`attendance.html` · `teacher-performance.html` (academic context beside the payroll cards only). EN pages rewrite to `.en.html` via the existing `localizeHref` technique. **Never `href="#"`.** **Django**: `{% url %}` per target.

## 10. InvoiceDrawer *(baked `<template data-preview>` per invoice — `previewTemplate` pattern)*

Sheet rows: serial · family (link) · students (links) · course/group context (links) · billing month · issued/due hints · authored amount lines labeled **display-only** (no computed total line) · status chip · note. Actions per the FinanceAction matrix (Mark as paid confirm→demo · Send reminder confirm→demo · Send invoice disabled · Print demo). One baked template per invoice row, id `inv-<id>`. **Django**: ONE partial `_invoice_drawer.html` in a `{% for %}` loop.

## 11. FinanceNavImpact *(nav/build/i18n registration shape — the only shared-file edits)*

| Touch-point | Exact change |
|---|---|
| `nav.config.js` | +1 `item({ id:'finance', labelKey:'nav.finance', icon:'wallet', route:'finance.html' })` inserted before the six locked wallet items in the `reports` category; +1 `FUTURE_ROUTES` line `finance: 'finance.html'` |
| `build-html.mjs` | +1 import; +1 `PAGES` entry `{ base:'finance', activeId:'finance', titleKey:'topbar.title.finance', crumbKey:'topbar.crumb.finance', render: renderFinance }` |
| `i18n.js` | +2 imports (`ar.fin.js`/`en.fin.js`) + 2 `deepMerge` calls after the `*.rep.js` block |
| `ar.js`/`en.js` | 1 line each — `nav.reason.finance` copy updated to stay truthful (real billing backend required; Finance page is a fixture-only preview) |

Everything else in nav is **unchanged**: six locked wallet items + `banks` keep `disabled` + lock + reason; no item moved/renamed/removed. **Django**: sidebar partial gains one `{% url 'finance' %}` entry.

---

## Map reconciliation (which labeled vocabulary renders WHERE — no shadowing)

| Vocabulary | Renders on | Never on |
|---|---|---|
| **invoice-status** (`paid/unpaid/overdue/cancelled`) | invoice tiles, invoice rows, invoice drawer | payment rows, planned cards, any non-finance page |
| **payment-status** (`recorded/pending/returned`) | payment rows | invoice rows/tiles, planned cards |
| **payment method** (`fin.method.*` label chips) | payment rows | anywhere else (display label, not a status map) |
| **report-availability** (reused) | finance section headers + planned payroll/accounting cards | invoice/payment rows |
| family-status / outcome-status / group-status / teacher maps (Specs 004–007) | their existing pages only | the finance page introduces no usage that re-labels them |

Both new sets are distinct from all ten existing maps (`STATUS`, `FAMILY_STATUS`, `OUTCOME_STATUS`, `GROUP_STATUS`, `COURSE_STATUS`, `ENROLLMENT_STATUS`, `TEACHER_STATUS`, `TEACHER_WORKLOAD`, `TEACHER_SIGNAL`, `REPORT_SIGNAL`/`REPORT_AVAILABILITY`).

## Fixture coherence rules (enforced by the fixture build-time guard + smoke; restates SC-007)

- `fam5` has ≥ 1 `overdue` invoice (agrees with its existing `fam.attn.payment` flag).
- `fam3` and `fam8` (zero-rate) have **0** invoices; filtering to them shows the calm empty state.
- Every payment references an existing, **non-cancelled** invoice, and its `familyId` equals that invoice's family.
- The single `cancelled` invoice belongs to `fam7`; it has no payment rows; its Record-payment renders disabled-with-reason.
- `FINANCE_SUMMARY` counts equal the authored row counts exactly (tiles = rows).
- Every invoice/payment references only existing fixture ids (families, students, courses, groups).
- Violation of any rule **throws at build time** (the `nav.config.js` guard pattern) — a broken fixture cannot ship.
