# Finance Nav Completion Register — Spec 038

The 7 finance nav items (Reports category → Finance sub-section), each currently `status:'disabled'`, `reasonKey='nav.reason.finance'`, `#i-lock` icon. Recommended disposition = **unlock to a deep-link into the existing/new finance.html tab** (writes stay gated), except where an item can't be shown honestly without fake money (then it stays an honest lock).

| Item | Current status | Current reason | Current route | Recommended route/fold/lock | Count | Final status | Acceptance check |
|---|---|---|---|---|---|---|---|
| invoices | disabled + lock | nav.reason.finance | — | unlock → `finance.html#view=invoices` (existing 9 authored rows) | 0 | implemented | `#view=invoices` opens AR/EN; rows render; writes gated; no computed total |
| payments | disabled + lock | nav.reason.finance | — | unlock → `finance.html#view=payments` (existing 6 authored rows) | 0 | implemented | `#view=payments` opens AR/EN; no mutation; no computed settlement |
| monthlyInvoices | disabled + lock | nav.reason.finance | — | promote planned card → `finance.html#view=monthly-invoices` (INVOICES grouped by month) | 0 | implemented | `#view=monthly-invoices` opens AR/EN; amount literals only; **no computed monthly total** |
| salaries | disabled + lock | nav.reason.finance | — | unlock → `finance.html#view=salaries` (existing figure-free tab) | 0 | implemented | `#view=salaries` opens AR/EN; **0 pay figure**; writes gated |
| staffSalaries | disabled + lock | nav.reason.finance | — | unlock → `finance.html#view=salaries` (staff board) **or** `#view=staff-salaries` | 0 | implemented | staff board renders figure-free; 0 pay figure |
| classSalaryReport | disabled + lock | nav.reason.finance | — | **open**: figure-free per-class board `finance.html#view=class-salary-report` **OR keep honest lock** | 0 | implemented (figure-free) **or** disabled (documented) | if board: 0 salary amount, Generate/Export gated; if lock: honest reason recorded |
| banks | disabled + lock | nav.reason.finance | — | unlock → `finance.html#view=banks` (existing name+status tab) | 0 | implemented | `#view=banks` opens AR/EN; no fake balance/reconcile |

## Finance-flavoured analysis (from Spec 037 deferral)

| Legacy item | Recommended disposition | Reason |
|---|---|---|
| analysis-expenses | **honest lock / deferred** | inherently computed expense aggregates → can't show without fake money |
| analysis-invoices | **honest lock / deferred** | inherently computed invoice/revenue aggregates |
| (both are already represented honestly by the `accountingExpenses` planned card in Overview) | keep planned card | preserves finance-free honesty (Spec-037 finance-free reports carryover) |

## Nav change summary (038)

- Up to **7** finance items flip `disabled` → `implemented` (routes `finance.html#view=…`), **minus** any deferred (classSalaryReport/finance-analysis) that stay `disabled`.
- **Sanctioned amendment:** the nav010 `lockedFin` smoke assert is updated — unlocked items removed from the locked set; deferred items remain. Declared Spec-030-style supersession.
- Admin menu stays **50** (unlock changes status, not item count); no `FUTURE_ROUTES` finance entries to trim (none exist); no other nav item changes; no removals.
- The `finance` item itself stays `implemented → finance.html` (unchanged). The 9 Overview planned cards stay (backend-engine gates; `plannedN===9` preserved) unless plan decides to prune promoted items (would amend the assert).
