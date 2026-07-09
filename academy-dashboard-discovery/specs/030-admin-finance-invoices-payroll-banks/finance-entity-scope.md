# Spec 030 — Finance Entity Scope

Each display-only finance entity, its allowed display fields, and which writes are `backendRequired`. All are
**authored fixtures**; nothing persists; no money arithmetic; no aggregate. **Two figure classes**: invoice/
payment amount literals ALLOWED (single-value, no math); salary/payout/compensation figures NEVER allowed.

## Invoice
- **Allowed fields**: id, serial, family, student(s), course/group, month, issued date, due date, **single
  authored amount literal + unit**, status (paid/unpaid/overdue/cancelled), note.
- **Forbidden**: computed balance/total/tax/discount math; aggregate across invoices.
- **Writes**: Create/Edit = `backendRequired` modal; Mark-paid / Send invoice / Download PDF / Export = gates.
  Record payment = `backendRequired` confirm/gate. Nothing persists; status never flips.

## MonthlyInvoice
- **Allowed fields**: parent/family, month, status. **Forbidden**: monthly total aggregate.
- **Writes**: none (display-only); export = gate.

## Payment / PaymentCollection
- **Allowed fields**: invoice ref, family, date, method, **single authored amount literal**, status
  (recorded/pending/returned).
- **Forbidden**: balance/collected-total aggregate; receipt upload.
- **Writes**: Add payment / Verify / Refund / Reconcile = `backendRequired` gates. No `type="file"`.

## TeacherSalary / StaffSalary  (STATUS-FIRST, FIGURE-FREE)
- **Allowed fields**: name, status, period/month label, count (e.g. sessions) as a row count.
- **Forbidden**: **any salary/pay/fixed/fine/gift/hour-rate/total amount figure** (never allowed anywhere).
- **Writes**: Generate salary / Approve / Mark paid / Export payroll = `backendRequired` gates. No generation,
  no amount, no mutation.

## ClassSalaryReportRow  (FIGURE-FREE or gate)
- **Allowed fields**: grouping label (student/date/parent), status. **Forbidden**: computed group-by/sum,
  salary total.
- **Writes**: Generate / Export = gates. Prefer an honest planned gate over a figure-free table if grounding is
  thin.

## BankAccount
- **Allowed fields**: bank name, status. **Forbidden**: credentials, API keys, account numbers, balances.
- **Writes**: Add/Edit bank = `backendRequired` modal (name only); Import statement / Match / Reconcile = gates.

## BankTransaction  (display-only if grounded)
- **Allowed fields**: date, reference, status. **Forbidden**: imported/reconciled amount, running balance.
- **Writes**: Import/Reconcile = gates. Prefer omission if grounding is thin.

## Payout  (STATUS-FIRST, FIGURE-FREE)
- **Allowed fields**: teacher/name, method, status, requested-at, month. **Forbidden**: **payout amount figure**.
- **Writes**: Approve / Pay = `backendRequired` gates. No money movement.

## PayoutProvider  (NOT modeled — future-backend)
- **Never rendered**: credentials, webhook URLs, API keys/passwords, integration status. Route future-backend/
  excluded; no placeholder that shows secrets or fake status.

## FinanceSummary
- **Allowed**: row-count roll-ups only (counts by status). **Forbidden**: any money aggregate (total/net/sum).

## FinanceExport
- **Behavior**: `backendRequired`/planned gate (Export/Print/PDF/CSV/Excel/Download). Never a real file; never a
  silent no-op.

## Writes summary (all backendRequired — nothing persists, nothing mutates)

| Entity | Write | Mechanism | Persists / mutates? |
|---|---|---|---|
| Invoice | Create/Edit | `data-modal-trigger` + backendRequired note | No |
| Invoice | Mark-paid / Send / Record-payment | `data-confirm` / `data-disabled-reason` | No (no status flip) |
| Invoice/Monthly/Payment | Export/PDF/CSV/Download/Print | `data-disabled-reason` gate | No file |
| Payment | Add/Verify/Refund/Reconcile | `data-disabled-reason` gate | No money movement |
| Salary/StaffSalary | Generate/Approve/Mark-paid/Export | `data-disabled-reason` gate | No generation, no amount |
| Payout | Approve/Pay | `data-disabled-reason` gate | No money movement |
| Bank | Add/Edit | `data-modal-trigger` | No |
| Bank | Import/Reconcile | `data-disabled-reason` gate | No import/reconcile |
| ClassSalaryReport | Generate/Export | `data-disabled-reason` gate | No group-by/sum |

**Allowed display fields are the ONLY fields surfaced.** Invoice/payment amount = single authored literal, no
aggregate. Salary/payout/compensation amount = NEVER surfaced. No credential/secret ever surfaced.
