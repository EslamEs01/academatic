# Data Model — Spec 038 (finance, display-only)

All entities **reuse the existing `fixtures/finance.js`** — Spec 038 adds **no new money data** and (ideally) leaves the fixture 0-diff. Every amount is an authored per-row **literal** (unit SAR); the only aggregates are row **counts** (`FINANCE_SUMMARY`); salaries/staff/class boards are **figure-free**; banks carry **no balance**.

## 1. Invoice — EXISTING `INVOICES.rows` (×9, reused as-is)
{ id, serial, familyId, studentIds, courseId, groupId?, monthKey, issuedISO, dueISO, **amount (literal)**, unitKey='unit.sar', statusId: paid|unpaid|overdue|cancelled, noteKey? }. Rendered in the **invoices** tab (`#invoice-list`, `.fin-row`) + 4 status tiles + status/family filter + baked `inv-*` drawers. **No computed total/balance.**

## 2. Payment — EXISTING `PAYMENTS.rows` (×6, reused)
{ id, invoiceId, familyId, dateISO, **amount (literal)**, unitKey, methodKey, statusId: recorded|pending|returned }. Rendered in the **payments** tab (`.fin-pay-row`) + invoice-serial link → existing `inv-*` drawer. **No computed settlement.**

## 3. Monthly-invoice view — DERIVED (no new data)
INVOICES grouped by `monthKey` → month sections, each listing its invoice rows (serial/family/amount-literal/status chip). Rendered in the **monthly-invoices** tab with **NEW classes** (`.finm-*`, id `#fin-monthly`) — never `.fin-row`/`#invoice-list`/`.fin-pay-row`/`.report-card`. **No computed monthly total/sum.**

## 4. Salary row — EXISTING `SALARIES` (×6: 4 teacher + 2 staff), reused
{ id, role: teacher|staff, nameKey, statusId: pending|approved|paid|onhold, periodKey }. **FIGURE-FREE** (name + status + period; **no amount**). Rendered in the **salaries** tab (teacher board + staff board). salaries + staffSalaries nav both → `#view=salaries`.

## 5. Bank — EXISTING `BANKS` (×4), reused
{ id, nameKey, statusId: active|inactive }. **Name + status only — no balance/number/credential.** Rendered in the **banks** tab + Add-bank name-only drawer.

## 6. Planned finance card — EXISTING `PLANNED_FINANCE` (×9), reused unchanged
9 figure-free `.report-card`s (incl. monthlyInvoices, classSalaryReport, accountingExpenses) in the **overview** tab — the real backend engine gates. **`plannedN===9` preserved** (the display tabs are additive, not replacements).

## Not modeled (kept honest locks)
- **classSalaryReport**: would require computed per-class pay → no data model; nav stays `disabled`; represented by its planned card.
- **finance-analysis** (analysis-expenses/analysis-invoices): would require computed profit/loss/revenue/VAT → no data model; represented by the `accountingExpenses` planned card.

## Locale (extend existing `ar/en.fin.js`, mirrored)
- `fin.tab.{overview,invoices,payments,monthlyInvoices,salaries,banks}` (tab labels — `overview/salaries/banks` may already exist; add invoices/payments/monthlyInvoices).
- `fin.monthly.{title,sub,generate,generateReason,export,exportReason,send,sendReason,m.*}` (monthly board copy + gates).
- 0 divergence AR/EN; 0 raw keys; `i18n.js` 0-diff.
