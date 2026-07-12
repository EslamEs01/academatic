# Finance Locks & Gates Register — Spec 038

Per finance item: is it an **implemented display surface**, an **honest locked tab/nav**, or a set of **backendRequired gated finals**? Every backend write is enumerated with its gate.

## Disposition per item

| Item | Disposition | Display surface | Gated finals (backendRequired) |
|---|---|---|---|
| invoices | implemented display tab | authored invoice rows + status filter + detail drawer | Create · Generate · PDF · Send · Mark-Paid |
| payments | implemented display tab | authored payment rows (date/family/invoice/amount/method/status) | Record · Confirm · Refund · Export |
| monthlyInvoices | implemented display tab | invoices grouped by month (amount literals) | Generate · Send · PDF |
| salaries | implemented display tab (figure-free) | teacher status board (name/status/period) | Generate · Approve · Mark-paid · Export |
| staffSalaries | implemented (salaries tab staff board, figure-free) | staff status board | Generate · Approve · Mark-paid · Export |
| classSalaryReport | **figure-free tab OR honest lock** (open) | per-class status board (no pay) — or none | Generate · Export (if board) |
| banks | implemented display tab | name + status list | Add · Import · Reconcile · Verify |
| finance-analysis | **honest lock / deferred** | none (represented by the `accountingExpenses` planned card) | — (locked with reason) |

## Gate detail

| Action | Surface | Gate copy (reason key intent) | Forbidden fake behavior | Acceptance check |
|---|---|---|---|---|
| Create/Generate invoice | invoices/monthly | "requires the billing backend" | fake invoice creation/number/total | `data-disabled-reason`; 0 new row on click |
| PDF / Export / Download | invoices/payments/monthly/salaries | "export needs the backend module" | fake file/`blob:`/`window.open` | no download; gate only |
| Send / Email | invoices/monthly | "sending needs the backend" | fake receipt/email | no send handler |
| Mark-Paid / Confirm / Refund | invoices/payments | "settlement needs the billing backend" | status mutation | status chip unchanged after confirm |
| Generate/Approve/Mark-paid payroll | salaries/staff/class | "payroll run needs the billing backend" | computed/paid salary | 0 pay figure; 0 mutation |
| Add / Import / Reconcile / Verify bank | banks | "bank ops need the backend" | fake balance/reconcile/sync | name-only Add drawer; 0 balance |

## Honest-lock policy
- Any item kept locked (classSalaryReport if deferred; finance-analysis) stays `status:'disabled'` + `reasonKey='nav.reason.finance'` + `#i-lock` — an **honest** visible lock, not «قريبًا». Its reason must state *why* (needs the payroll/accounting backend to compute). Recorded in `finance-nav-completion-register.md`.
- The Overview's 9 figure-free planned cards remain (they represent the real backend engine; `plannedN===9` preserved) — the display tabs are additive, not replacements.

## Amendment note
Unlocking any of the 7 items changes the nav010 `lockedFin`/`lockedOk` assert (currently all 7 must be disabled+lock). This is the ONE sanctioned protected-assert change for Spec 038 (declared Spec-030-style supersession): the assert is rewritten to expect the unlocked items as `implemented` deep-links and keep only the deferred items in the locked set.
