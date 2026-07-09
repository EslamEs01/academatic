# Pay-Finance Exclusion Register — Spec 028

The legacy app is dense with teacher pay/finance surfaces. **028 introduces ZERO pay/salary/payroll/compensation/payout figures or calculations.** This register inventories every such surface + disposition + the smoke grep strategy that keeps 028 clean.

## Legacy teacher pay/finance surfaces found
| Surface | Evidence | Disposition | Owner |
|---|---|---|---|
| Accounting hub (Profits&Losses / Net Income / Teachers-Salaries / Staff-Salaries totals + monthly charts) | `output/roles/admin/text/management-accounting.txt` | route-030 (status-first, no math) | 030 |
| Accounting → Invoices ledger | `management-accounting-transaction-invoices.txt` | route-030 (respect Spec-009 invariant) | 030 |
| Accounting → Salary transactions (Teachers/Staff Total Salary) | `management-accounting-transaction-salary.txt` | route-030 (no totals) | 030 |
| Accounting → Session transactions (per-session Teacher/Student profit) | `management-accounting-transaction-session*.txt` | route-030 | 030 |
| Salaries — teacher payroll generation board (Hour Rate/Fixed/Fine/Gift/Total/Generate) | `management-salaries.txt` | route-030 (no computed totals) | 030 |
| Staff Salaries board | `management-staff-salaries.txt` | route-030 | 030 |
| Salary Class Report (group-by Student/Date/Parent/Teacher → sum) | `management-salary-class-report.txt` | route-030 (forbidden group-by/sum engine) | 030 |
| Payouts queue (approve→pay, EUR amounts) | `management-payouts*.txt` | route-030 (real money movement banned) | 030 |
| Payout Providers (Paymob/Payoneer creds + webhooks) | `management-payout-providers*.txt` | intentionally-excluded | future-backend |
| **Teacher-detail Compensations tab** (Fine/Bonus amounts) | `management-teachers-1-compensations-*.txt` | route-030 — **highest scope-creep risk (on teacher.html)** | 030 |
| Teacher-detail Salary tab (Fixed/Classes/Hours/Fine/Gift/Total) | `management-teachers-1.md` Table 7 | route-030 | 030 |
| Create/Edit-teacher **Salary-information** fieldset (currency/fixed_salary/salary_type/hour_rate/fine_per_hour) | `management-teachers-create.md`, `-1-edit.md` | route-030 — omit fieldset from the 028 create/edit modal | 030 |
| Create/Edit-teacher **Payout-details** fieldset (payout_method/paymob/payoneer/payout_email) | `management-teachers-1-edit.md` | intentionally-excluded | future-backend |
| Teacher-portal own **Salary** + **Salary Class Report** | `output/roles/teacher/text/teacher-salary*.txt` | **intentionally-excluded FOREVER** | teacher pay-free global law |
| Course-create `teacher_hour_rate` / group-create `t_hour_rate` | `management-courses-1-create.md`, `management-groups-create.md` | omit the rate figure from the 028 assign-teacher picker by default | 030/sanctioned-literal |

## Feedback surfaces (percentages — not payroll, still out of 028)
| Surface | Evidence | Disposition | Owner |
|---|---|---|---|
| Teacher Feedback (per-teacher % + note) | `management-teacher-feedback*.txt` | route-029 (no derived %) | 029 |
| Class Feedback (per-session % rows) | `management-class-feedback*.txt` | route-029 | 029 |

## Current teacher-surface pay-like words found
- **None in rendered content.** Grep of `teachers.js` / `teacher.js` / `teacher-performance.js` / `teacher-actions.js` for salary/payroll/payout/compensation/fee/price/currency/ريال/$/أتعاب/فلوس/دولار/money → the only matches are self-documenting code **comments** asserting "no pay/finance figure" (a scope-guard convention, not leakage).
- The teacher-detail single-value **"Hour Rate: 120 EGP"** admin literal is analogous to the Spec-004/009-sanctioned admin family plan hour-rate literal (single-value, admin-only, no aggregate/math). **028 default: OMIT it** unless the plan explicitly re-confirms it sits outside the `teacher-*` pay-free GLOBAL grep (it is on admin `teacher.html`, not a `teacher-*` portal page).

## How 028 avoids pay/finance leakage
1. Build none of the surfaces above (030/029/future-backend/excluded).
2. The 028 create/edit-teacher modal is honest title+note only (no fields) OR a display-only scaffold that **excludes** the Salary-information + Payout-details fieldsets.
3. The assign-teacher picker shows teacher name + subjects/workload only — **never** a rate/salary figure.
4. Add no compensations/salary tab/drawer/modal to teacher.html.
5. Keep the unused `rating` fixture field unsurfaced.

## Smoke grep strategy (byte-verbatim protected asserts + new 028 asserts)
- **Teacher-portal (16 files) pay-free**: keep `payHit`/`tchPay` (`tests/smoke/run.cjs`) byte-verbatim: EN `/\b(salary|salaries|payouts?|earnings?|compensation)\b/i` + AR `/راتب|رواتب|أجر|مستحقات|غرامة|مكافأة/` on rendered `#page-body`; 0 hits.
- **New 028 assert (admin teacher surfaces)**: `teachers.html`/`teacher.html` `#page-body` carry no `راتب|رواتب|salary|payroll|payout|compensation|أتعاب|جنيه|ريال|\bEGP\b|\bAED\b|\bEUR\b` (currency `$`/`€`/`£` false-positives from `${` are source-only, not built HTML). teacher-performance.html is the **sanctioned exempt admin board** — do NOT assert 0 there; do NOT link to it from any `teacher-*` portal page.
- **Admin finance Spec-009 invariant**: `finance.html`/`reports.html` byte-identical; no new finance module.
