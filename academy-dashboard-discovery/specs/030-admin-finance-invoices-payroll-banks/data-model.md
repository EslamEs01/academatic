# Spec 030 — Data Model (display-only fixtures)

All entities are **authored fixtures** extending the EXISTING `app/src/js/fixtures/finance.js`. **No
persistence, no money arithmetic, no aggregate, no salary/payout figure.** Invoice/payment amount = single
authored literal (Spec-009-sanctioned); salary/payout surfaces are STATUS-FIRST and FIGURE-FREE.

## Existing (kept, Spec-009 — unchanged shape)

- `INVOICES` (9 rows): `{id, serial, familyId, studentIds, courseId, groupId, monthKey, issuedISO, dueISO,
  amount (single SAR literal), unitKey, statusId∈{paid,unpaid,overdue,cancelled}, noteKey?}` — amount is a
  per-invoice literal, never summed.
- `PAYMENTS` (6 rows): `{id, invoiceId, familyId, dateISO, amount (single SAR literal), unitKey, methodKey,
  statusId∈{recorded,pending,returned}}`.
- `FINANCE_SUMMARY`: row-count roll-ups only (`.filter().length`/`Set.size`) — **kept row-count-only**.
- `PLANNED_FINANCE` (9 cards): **updated** — cards whose display is now folded into a hub tab (teacherSalaries/
  staffSalaries → Salaries tab; banks → Banks tab) point to their in-hub tab or become the tab's entry; cards
  still needing the real engine (invoicesEngine/paymentsCollection/accountingExpenses/classSalaryReport/
  payoutsCompensations/monthlyInvoices) stay figure-free planned/backendRequired.

## New authored fixtures (extend `fixtures/finance.js`) — FIGURE-FREE

### `SALARIES` — teacher + staff salary rows (STATUS-FIRST, NO amount)

| Field | Type | Notes |
|---|---|---|
| `id` | string | `'sal1'` |
| `role` | `'teacher' \| 'staff'` | board grouping |
| `nameKey` | locale key | teacher/staff name (authored) |
| `statusId` | `'pending' \| 'approved' \| 'paid' \| 'onhold'` | status chip (icon+label) |
| `periodKey` | locale key | authored month/period label |

Constraints: **NO `amount`/`fixed`/`fine`/`gift`/`hourRate`/`total`/`salary` field.** ~6–8 rows across teacher/
staff. Status chip reuses existing tones (no new status vocab if avoidable).

### `BANKS` — bank accounts (name/status only)

| Field | Type | Notes |
|---|---|---|
| `id` | string | `'bank1'` |
| `nameKey` | locale key | authored bank name |
| `statusId` | `'active' \| 'inactive'` | status chip |

Constraints: **NO account number, balance, credential, API key.** ~3–5 rows.

### `PAYOUTS` (optional, if scoped) — STATUS-FIRST, NO amount

| Field | Type | Notes |
|---|---|---|
| `id` | string | `'po1'` |
| `nameKey` | locale key | teacher name |
| `methodKey` | locale key | authored method label |
| `statusId` | `'pending' \| 'approved' \| 'rejected'` | status chip |
| `monthKey` | locale key | authored month |

Constraints: **NO `amount` field.** Prefer a planned gate if grounding is thin.

### (optional) `MONTHLY_INVOICES` / `CLASS_SALARY_ROWS` — status-first, figure-free

- `MONTHLY_INVOICES`: `{id, parentKey, monthKey, statusId}` — Parent/Status only; NO monthly total.
- `CLASS_SALARY_ROWS`: `{id, groupingKey, statusId}` — grouping label + status; **NO computed sum**. Prefer a
  gate over a table if grounding is thin.

## Locale keys (extend `ar.fin.js` + `en.fin.js`, mirrored)

- `fin.tab.{overview,salaries,banks}` (+ payments/analytics if tabbed).
- `fin.sal.{title,sub,role.teacher,role.staff,status.*,generate,generateReason,approve,approveReason,export,
  exportReason,markPaid,markReason,empty}`.
- `fin.bank.{title,sub,add,addTitle,status.*,import,importReason,reconcile,reconcileReason,empty}`.
- `fin.payout.{title,sub,status.*,approve,approveReason,empty}` (if scoped).
- Reuse: `fin.reason.{backend,export,send,cancelled,comingSoon}`, `common.backendRequiredNote`, existing
  `fin.status.*`/`fin.method.*` chips.

## Chart / metric / figure constraints (binding)

- NO `<canvas>`, NO chart library, NO `sparkline()` as a finance metric.
- NO money aggregate (sum/total/net/balance/P&L), NO group-by/sum, NO FX.
- **NO salary/payroll/compensation/payout amount figure on any entity.**
- Invoice/payment (and optional expense) amount = single authored literal only.
- NO credential/API-key/webhook/secret/account-number field on any entity.

## What is NOT modeled (out of scope)

PayoutProvider credentials/webhooks (future-backend), payment-gateway settings (031/future-backend), real
salary/payout amounts (never), computed P&L/aggregates (forbidden), teacher-portal salary twin (excluded),
family payment (excluded).
