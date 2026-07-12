# Contract — Targeted Visual Grounding

**Obligation:** implementation MUST trace to first-hand evidence, not memory or summary. Re-run this grounding
immediately before writing code — any citation that has drifted since `visual-grounding.md` was authored must be
re-confirmed and this ledger updated first.

## Definition of done
- A grounding note exists for the finance surface citing exact paths/lines, re-confirmed at implement time.
- Every unlock/lock decision cites current-app source + fixture evidence + legacy evidence + a prior-spec register row.
- No decision invents a computed total/outstanding/balance/net/profit/loss/revenue/VAT/tax figure, a salary/payout
  amount, a chart/`<canvas>`, or backend/API/payment-gateway behavior.

## Evidence ledger (must stay accurate)

| Surface | Current app | Legacy | Prior spec |
|---|---|---|---|
| finance hub | `src/js/pages/finance.js` — Spec-030 tabbed hub, `tabs({group:'finance', ariaKey:'fin.tab.aria'})` @~285 rendering `overview`/`salaries`/`banks` panels; `invoicesSection()`/`paymentsSection()`/`salariesSection()`/`banksSection()` builders | n/a (current-app mechanism only) | 009 (finance shell) · 030 (tabbed hub + salaries/banks tabs) |
| fixtures | `src/js/fixtures/finance.js` — `INVOICES` ×9 rows (`inv1`…`inv9`, amount+status literals), `PAYMENTS` ×6 rows (`pay1`…`pay6`), `SALARIES` ×6 rows (4 teacher + 2 staff, name+status+period, **no amount**), `BANKS` ×4 rows (name+status, **no balance**), `PLANNED_FINANCE` ×9 cards (incl. `monthlyInvoices`, `classSalaryReport`, `accountingExpenses`, `banks`), `FINANCE_SUMMARY` (row-count tiles only, no computed money) | — | 030 |
| tabs mechanism | `src/js/components/tabs.js` — `tabs({group, items, panels, ariaKey})`: first item default/active, others switch via `#view=`; reused as-is, no signature change | n/a | 030 · 036 · 037 (same widget, same reuse pattern) |
| nav locks | `src/js/nav.config.js:85-91` — Reports category → Finance sub-section, **7** items each `status:'disabled'`, `reasonKey:'nav.reason.finance'`, `#i-lock` icon: `invoices`, `monthlyInvoices`, `salaries`, `staffSalaries`, `payments`, `classSalaryReport`, `banks`; build-time guard at file tail (`implemented`⇒route, non-`implemented`⇒no route, `disabled`⇒reasonKey) | n/a | 030 (locks introduced) |
| smoke protection | `tests/smoke/run.cjs:1571-1612` (`nav010`) — `lockedFin` array @1586 (all 7 ids), `lockedOk` assert @1587-1590/1604 (every id disabled+`nav.reason.finance`+lock icon); `finLinks` assert @1601 (finance sub-section has exactly one implemented link: `finance`); the finance display block elsewhere in the same file (9-invoices/6-payments/9-planned-cards/`forbidden` regex/no-mutation/no-receipt/`FINANCE_SUMMARY` row-count-only) | n/a | 030 |
| legacy finance pages | `output/roles/admin/pages/management-invoices.md` (+ status/date-filtered variants), `management-monthly-invoices.md`, `management-accounting-transaction-invoices.md`, `management-analysis-expenses.md`, `management-analysis-invoices.md`, `management-salary-class-report.md`, `management-banks.md` (+ `-create.md`) | source of the money-centric legacy behavior deliberately NOT reproduced | 023 legacy-coverage audit; `visual-grounding.md` §"Legacy capabilities found" |

## Mechanism grounding (shared)
- `components/tabs.js` — reused unmodified; the finance group already exists (`group:'finance'`), so widening it from 3
  panels to 6 is additive `items`/`panels` entries, not a new mechanism.
- `enhance.js` — reuse-only, syncs `#view=` and persists `academy.schedView.<group>`; **0-diff**, no new hook.
- `i18n.js` — reuse-only, extends the existing `ar.fin.js`/`en.fin.js` pair; **0-diff**, no new locale module registered.
- `tests/smoke/run.cjs` — existing protected asserts: admin-menu-50, finance 9-invoices/6-payments/9-planned/`forbidden`
  regex/no-mutation/no-receipt, teacher pay-free, `FINANCE_SUMMARY` row-count-only (exact citations recorded above).

## Acceptance
- A reviewer can open every cited path/line and see the claimed surface/behavior as described.
- If any citation is stale at implement time (file moved/renamed/refactored, line numbers shifted), grounding MUST be
  re-run and this ledger updated before writing code.
- No row in this ledger may be used to justify a computed metric, a chart, a pay/balance/expense/revenue figure, a
  payment-gateway integration, or a backend call.
- The 6-unlock / 2-lock disposition (see `nav-completion-contract.md`) traces to this ledger — no unlock is decided
  from memory of a prior spec's summary alone.
