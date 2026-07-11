# Contract — Finance Locks & Gates (Spec 038)

Per finance item: is it an **implemented display tab**, an **honest locked nav item**, or a set of
**gated finals**? Every backend write reachable from the widened `finance.html` (3 tabs →
overview/invoices/payments/monthly-invoices/salaries/banks, 6 tabs) is enumerated with its exact
reason key — none invented, all reused from Spec 009/030/032.

## Disposition per item

| Item (`nav.config.js` id) | Disposition | Route | Display surface | Gated finals |
|---|---|---|---|---|
| `invoices` | implemented tab (fold-anchor) | `finance.html#view=invoices` | Overview `invoiceSection()` UNCHANGED (tiles+filter+`#invoice-list`+9 rows) **+** an additive, focused Invoices-tab grid over the SAME 9 `INVOICES.rows`, same `inv-<id>` drawers | Create/Generate · Export CSV/PDF · Print · Send · Mark-Paid |
| `payments` | implemented tab (fold-anchor) | `finance.html#view=payments` | Overview `paymentsSection()` UNCHANGED (Add/Reconcile gates + 6 rows) **+** an additive, focused Payments-tab list over the SAME 6 `PAYMENTS.rows` | Add/Record · Reconcile · Refund · Export |
| `monthlyInvoices` | implemented tab (promoted from a `planned` card) | `finance.html#view=monthly-invoices` | New month-grouped board over the SAME 9 `INVOICES.rows` (april/may/june/july, build-time filter, per-month `(N)` count only); `PLANNED_FINANCE`'s `monthlyInvoices` card (the real generation ENGINE) is KEPT unchanged — a distinct capability | Generate · Send · PDF/Export |
| `salaries` | implemented tab (fold-anchor, existing) | `finance.html#view=salaries` | Figure-free teacher board (4 rows: name+status+period) | Generate · Approve · Mark-paid · Export |
| `staffSalaries` | implemented, deep-links to the SAME `salaries` tab | `finance.html#view=salaries` | Figure-free staff board (2 rows), the second section of the same panel `salaries` already opens | Same 4 gates, shared with `salaries` (no per-role variant) |
| `classSalaryReport` | **HONEST LOCK** (unchanged) | none | none — locked nav item + the existing `classSalaryReport` `PLANNED_FINANCE` card | n/a — no in-page UI exists to gate |
| `banks` | implemented tab (fold-anchor, existing; nav-unlock only, 0 body diff) | `finance.html#view=banks` | Name+status board (4 rows) + the `bank-add` name-only form drawer | Add (Save = gate) · Import · Reconcile |
| `finance-analysis` | **HONEST LOCK** — no nav item exists or is added | none | none — the `accountingExpenses` `PLANNED_FINANCE` card is the sole representation | n/a — never surfaced, on `finance.html` or `reports.html` |

## Full gate inventory

| Action | Surface | Reason key (all reused — none invented) | Forbidden fake behavior | Acceptance check |
|---|---|---|---|---|
| Create/Generate invoice | Overview `financeActions()`; Invoices/Monthly-Invoices tabs (if repeated) | `fin.reason.backend` | fake invoice creation/serial/row | `data-disabled-reason`; 0 new row on click |
| Export CSV / Export PDF / Print | Overview; Invoices/Payments/Monthly-Invoices/Salaries tabs | `fin.reason.export` | fake file/`blob:`/`window.open` | no download; gate only |
| Send invoice | Invoice drawer (`invoiceDrawerActions`); Monthly-Invoices tab | `fin.reason.send` | fake receipt/email/"sent" toast | no send handler beyond the gate |
| Send reminder | Invoice drawer | existing `confirmAction` → `fin.act.remindToast` (0 mutation) | a status/row change on confirm | smoke: 0 DOM mutation after confirm |
| Mark-as-paid (non-cancelled invoice) | Invoice drawer | existing `confirmAction` → `fin.act.markToast` (0 mutation) | invoice `statusId` flips to `paid` | chip byte-identical before/after |
| Mark-as-paid / Record-payment (cancelled invoice) | Invoice drawer/row | `fin.reason.cancelled` | any record/mark action on a cancelled invoice | `data-disabled-reason`, never a confirm control |
| Record payment (non-cancelled) | Invoice row (`invoiceRowActions`) | existing `confirmAction` → `fin.act.recordToast` (0 mutation) | a new payment row appended | `.fin-pay-row` count unchanged |
| Add payment | Overview/Payments tab | `fin.pay2.addReason` | fake payment persisted | `data-disabled-reason`; 0 new row |
| Reconcile (payments) | Overview/Payments tab | `fin.pay2.reconcileReason` | fake settlement match | `data-disabled-reason`; 0 mutation |
| Generate payroll | Salaries tab (teacher+staff, `salaries`+`staffSalaries` anchors) | `fin.sal.generateReason` | computed/paid salary figure | 0 pay figure; 0 mutation |
| Approve payroll | Salaries tab | `fin.sal.approveReason` | a `pending` row flips to `approved` | chip byte-identical |
| Mark-paid (salary) | Salaries tab | `fin.sal.markReason` | a salary row flips to `paid` | chip byte-identical |
| Export roster | Salaries tab | `fin.sal.exportReason` | fake CSV/roster file | no download |
| Add bank (Save, inside `bank-add` form drawer) | Banks tab | `common.backendRequiredNote` (the `formDrawer()` default) | a bank persisted with a balance/credential | name-only field; 0 new `BANKS` row |
| Import statement | Banks tab | `fin.bank.importReason` | fake transaction sync/matched-count toast | `data-disabled-reason`; 0 balance/status change |
| Reconcile (banks) | Banks tab | `fin.bank.reconcileReason` | fake reconciliation success | `data-disabled-reason`; 0 mutation |

## Honest-lock policy

- **`classSalaryReport`** stays `status:'disabled'`, `reasonKey:'nav.reason.finance'`, `#i-lock`, no
  route (`nav.config.js:90`, byte-unchanged). A per-class salary report is, by definition, a computed
  teacher-pay artifact (sessions-taught × rate, or an equivalent summed payout) — forbidden two ways
  at once under the teacher pay-free GLOBAL law and the no-computed-money law. No figure-free
  workaround is judged safe (a session/class COUNT next to any status chip risks being read as an
  implicit payout basis). The existing `classSalaryReport` `PLANNED_FINANCE` card
  (`fixtures/finance.js:99`) remains the sole honest representation.
- **`finance-analysis`** has no `nav.config.js` entry today and none is added. Both legacy pages it
  represents (`analysis-expenses`, `analysis-invoices`) are computed financial-aggregate dashboards
  (P&L / revenue / discount totals + Chart.js canvases) — no honest version exists without either a
  computed aggregate or a chart, both standing prohibitions. The `accountingExpenses` planned card
  (`fixtures/finance.js:101`) is the entire representation, unchanged. Never folded into
  `reports.html` (would break the Spec-009/037 reports-finance-free invariant).
- Both locks leave `PLANNED_FINANCE`'s 9-card array untouched — `plannedN===9`,
  `plannedDisabled===9`, figure-free, and availability-chip checks stay byte-verbatim. Spec 038
  promotes **zero** planned cards to a full "engine"; only `monthlyInvoices` gains an ADDITIVE
  display tab alongside its (kept) generation-engine card.

## Acceptance
- Every unlocked item's route resolves to a real, built tab that opens on fresh load AR/EN.
- Every gate above is `aria-disabled="true"` + `data-disabled-reason` + a `data-reason-key` resolving
  to real copy in `ar.fin.js`/`en.fin.js` (or `common.backendRequiredNote`), producing 0 DOM mutation.
- `classSalaryReport` and `finance-analysis` have ZERO in-page UI to gate — their entire honesty
  surface is the nav-level lock / the existing planned card.
- `plannedN===9`, `plannedDisabled===9` stay byte-verbatim.
- Cross-reference: `no-fake-money-contract.md` (NF-01…NF-16, the per-action honesty register),
  `forms-and-gates-contract.md` (MUST-OMIT/hook surface), `lockedFin-smoke-supersession-contract.md`
  (the nav-lock assert rewrite).
