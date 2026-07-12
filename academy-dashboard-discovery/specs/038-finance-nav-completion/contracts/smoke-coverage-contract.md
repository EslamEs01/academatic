# Contract — Smoke Coverage

All additions are **additive**; every protected regex/assert (role-law, teacher-pay, no-computed-
money, nav010, 026–037) stays **byte-verbatim** except the ONE declared nav010 amendment below.

## Must assert (new Finance-unlock block)
1. **Count/route-freeze** stays **115** (`find public -maxdepth 1 -name '*.html' | wc -l` = 115;
   no PAGES entry added; `finance.html`/`.en` are the only bodies that change).
2. **Nav flips** — 6 `disabled`→`implemented`: `invoices`, `payments`, `monthlyInvoices`,
   `salaries`, `staffSalaries` (→ same `#view=salaries` route as `salaries`), `banks`; each a real
   `<a>` anchor with `route: 'finance.html#view=…'` (not `data-coming-soon`). `classSalaryReport`
   stays `disabled` + `nav.reason.finance` + lock icon — 1 item locked, 6 unlocked, admin-menu 50.
3. **`finance.html#view=invoices`** (fresh load, AR+EN) — exactly one visible
   `[data-tabs="finance"] [data-tabpanel]` === `invoices`; 4 status tiles + `#invoice-list` with
   9 `.fin-row`/`[data-row]` rows render inside this tab; tile→filter click narrows visually
   (`shown === overdue` count, matching the existing check); **0** computed total/balance/
   outstanding token.
4. **`finance.html#view=payments`** (fresh load, AR+EN) — payments tabpanel is the only visible
   one; 6 `.fin-pay-row` render; each invoice-serial link opens the correct existing `inv-<id>`
   drawer; **0** computed settlement/net-received token.
5. **`finance.html#view=monthly-invoices`** (fresh load, AR+EN) — monthly tabpanel is the only
   visible one; the 9 invoices appear exactly once total across the 4 authored month groups (sum
   of per-group row counts === 9, a row-count check only); **0** `.report-card` used by this board
   (must not collide with the 9 planned cards); **0** computed monthly-total/subtotal/sum token;
   Generate/Send/PDF/Export finals are `[data-disabled-reason]` gates, **0** `data-demo-action`.
6. **`finance.html#view=salaries`** (fresh load, AR+EN) — salaries tabpanel visible; teacher (4) +
   staff (2) boards render; **0** pay/salary/rate/payout figure in the panel body
   (`salFigureFree`); Generate/Approve/Mark-paid/Export = gates (`salGates >= 4`).
7. **`finance.html#view=banks`** (fresh load, AR+EN) — banks tabpanel visible; 4 bank rows
   (name + status only, **0** balance/credential token); the nav sidebar's `banks` item is now a
   plain `<a>`, no longer `aria-disabled`.
8. **`classSalaryReport` honest lock re-pinned** — nav item still `data-nav-status="disabled"` +
   `data-reason-key="nav.reason.finance"` + `use[href="#i-lock"]`; no route; its `PLANNED_FINANCE`
   card still renders figure-free with an availability chip (part of the unchanged `plannedN===9`
   set).
9. **No computed/fake-success token** — 0 `<canvas>`/chart/score/rank/leaderboard/percentile in
   any new tab body (re-pin the existing `forbidden` regex, `run.cjs:996`); 0 gateway string
   (PayPal/Paymob/Stripe); 0 `type="file"`/`type="password"`/credential/secret; 0 `href="#"`; 0
   raw `⟦…⟧` key.
10. **0 external request** triggered by any tab switch or `#view=` deep-link load.

## Protected byte-verbatim (must not change in value)
Re-pin, unchanged, against the restructured page: 9 baked invoice rows (`run.cjs:1013`), 6 baked
payment rows (`:1014`), 4 status tiles each `count === rowCountByStatus` (`:1007-1010`), the
invoice/payment status chip label texts (`:1016-1021`), ≥4 disabled-with-reason + 0 demo-action in
the **first** `.report-actions` cluster (`financeActions()`, now in the overview tab) (`:1024-
1025`), ≥1 row confirm + the cancelled-invoice disabled-record-payment gate (`:1026-1029`), 9
invoice drawer templates (`template[data-preview^="inv"]`, `:1031`), `hrefHash === 0` and 0
receipt/upload/`type="file"` token in the page body (`:1033-1034`), `plannedN === 9 &&
plannedDisabled === 9` + figure-free + availability-chip on every planned card (`:1036-1038`), the
`forbidden` chart/score/rank regex (`:1040`), confirming Record-payment mutates 0 invoice status
chip (`:1042-1057`). `admin-menu-50` (`navCount32`, `:1271`); reports-body/teacher-pay/family-pay/
child-view/Spec 026–037 per-page asserts.

## Sanctioned amendment (the ONE declared change)
- **`nav010` block, `run.cjs:1571-1613`.** `lockedFin` shrinks from all 7 finance items to
  `['classSalaryReport']` only; `lockedOk` now checks only that one item stays disabled+reason+
  lock. Because `finLinks` is computed in the **same** `nav010` evaluate over the **same** status
  flips, it also changes: today it must equal exactly `['finance']`; after the unlock it must
  equal `['finance', 'invoices', 'monthlyInvoices', 'salaries', 'staffSalaries', 'payments',
  'banks']` (7 implemented links, DOM order preserved from `finMembers`, `classSalaryReport`
  excluded). Both edits are treated as ONE declared nav010 supersession (Spec-030/035/036/037
  style), not two — they are two lines inside the identical block, both downstream of the same 6
  `status` flips in `nav.config.js`. `finMembers` (the full 8-item id list), `railCats === 6`,
  `finLabel`, `admItems.length === 5 && !admItems.includes('banks')`, `banksInReports &&
  !banksInAdmin`, `sessBadge`, `famTitle` — all **unchanged**.

## Structural re-scope (not a law weakening — required by the tab restructuring itself)
- The existing Spec-030 `f30` block (`run.cjs:1073-1109`) checks `tabIds === ['overview',
  'salaries', 'banks']` and panel visibility for a 3-tab hub; it must be updated to
  `['overview', 'invoices', 'payments', 'monthly-invoices', 'salaries', 'banks']` (6 tabs) — a
  mechanical adaptation to the new tab layout, the same class of change as Spec 037's
  `#reports-grid` re-scope. Every check WITHIN the block (`salRows`, `salGates`, `salFigureFree`,
  `bankRows`, `addBank`, `bankGates`, `noSecret`, `noFile`) keeps its exact threshold value.
- Because tiles/`#invoice-list`/payment rows move out of the default-active `overview` tab into
  the new `invoices`/`payments` tabs, the existing block's **interactive** steps (the tile-click
  narrow check at `:1061-1071`, the Record-payment confirm click at `:1044-1051`, the cancelled-
  row lookup) must run **after** navigating to `#view=invoices` (or clicking the Invoices tab)
  first — Playwright cannot click a `hidden` element. Pure DOM-query counts (`rowsN`, `payRowsN`,
  `tileCounts`, `drawers`, `plannedN`, the `forbidden` regex) are visibility-independent and
  unaffected by which tab is active.

## Fresh-context requirement
- Every deep-link assert (items 3–8) MUST use a **fresh browser context per lang × view**
  (`browser.newContext()`, `page.goto(url#hash)`, no prior in-page navigation) — the Spec
  035/036/037 pattern — asserting exactly one visible `[data-tabs="finance"] [data-tabpanel]`
  before any other check runs.

## Forbidden
- Rewriting/relaxing any protected regex beyond the ONE declared nav010 amendment; removing any
  existing assert; making fake generate/mark-paid/reconcile/mutation pass; weakening the
  no-computed-money, figure-free-salaries, or no-balance-banks guards; unlocking or building a
  board for `classSalaryReport`.
