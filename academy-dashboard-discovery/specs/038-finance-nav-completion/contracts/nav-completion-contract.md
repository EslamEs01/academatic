# Contract — Nav Completion

Exactly **six** `nav.config.js` items change (status flip `disabled` → `implemented` + route added); **two** items
are explicitly kept as-is (locked); nothing else in `nav.config.js` changes.

## Unlocks (disabled → implemented)

| Item (`id`) | Before | After |
|---|---|---|
| `invoices` | `status:'disabled'`, `reasonKey:'nav.reason.finance'`, no route | `status:'implemented'`, `route:'finance.html#view=invoices'` |
| `payments` | `status:'disabled'`, `reasonKey:'nav.reason.finance'`, no route | `status:'implemented'`, `route:'finance.html#view=payments'` |
| `monthlyInvoices` | `status:'disabled'`, `reasonKey:'nav.reason.finance'`, no route | `status:'implemented'`, `route:'finance.html#view=monthly-invoices'` |
| `salaries` | `status:'disabled'`, `reasonKey:'nav.reason.finance'`, no route | `status:'implemented'`, `route:'finance.html#view=salaries'` |
| `staffSalaries` | `status:'disabled'`, `reasonKey:'nav.reason.finance'`, no route | `status:'implemented'`, `route:'finance.html#view=salaries'` |
| `banks` | `status:'disabled'`, `reasonKey:'nav.reason.finance'`, no route | `status:'implemented'`, `route:'finance.html#view=banks'` |

## Kept locked (no change — recorded, not silently dropped)

| Item | Disposition | Why |
|---|---|---|
| `classSalaryReport` | stays `status:'disabled'`, `reasonKey:'nav.reason.finance'`, no route | a real per-class salary report is inherently a computed pay figure — cannot be shown honestly; the honest visible lock is the correct end state, not a "coming soon" |
| `finance-analysis` | **no `nav.config.js` entry exists today and none is added** | inherently a computed expense/revenue/profit-loss aggregate; already represented honestly by the `accountingExpenses` card in `PLANNED_FINANCE` (Overview tab, `availability:'backendRequired'`); adding a nav item for it would misrepresent it as a page |

## FUTURE_ROUTES

No `FUTURE_ROUTES` finance entries exist today (confirmed: `materials` is the only live entry, owner Spec 039) — **no trim performed**; `FUTURE_ROUTES` stays untouched by this spec.

## Rules
- Build-time dead-link guard (`nav.config.js`, end of file): `implemented` ⇒ must have a `route`; non-`implemented`
  ⇒ must NOT have a `route`; `disabled` ⇒ must have a `reasonKey`. All 6 unlocked items satisfy
  `implemented` + `route` → guard passes. `classSalaryReport` still satisfies `disabled` + `reasonKey` → guard passes.
- Hash routes (`finance.html#view=invoices`, `#view=payments`, `#view=monthly-invoices`, `#view=salaries` ×2,
  `#view=banks`) are valid hrefs; EN variants resolve via the existing Spec-035 hash-aware `langRoute` in
  `sidebar.js` (0-diff — already hash-aware).
- `staffSalaries` and `salaries` intentionally share the same route (`#view=salaries`) — both open the one Salaries
  tab (teacher + staff boards live together there); this is a sanctioned many-to-one nav→route mapping, not a
  duplicate/orphan route.
- After the change, the finance sub-section has exactly **7** implemented links (`finance` + the 6 unlocked) and
  exactly **1** disabled/locked link (`classSalaryReport`) — down from 1 implemented / 7 locked before.
- No other category/item is touched: `materials`/`certificateRequests` stay `planned` (owner 039); settings×6 stay
  `planned` (owner 040); every non-finance nav item is untouched.
- No nav item is added or removed; admin menu stays **50**.

## Acceptance
- `git diff nav.config.js` shows **only**: the 6 status-flip lines (`disabled`→`implemented` + route added on the
  `invoices`/`payments`/`monthlyInvoices`/`salaries`/`staffSalaries`/`banks` item lines). `classSalaryReport`'s line
  is byte-unchanged. No `FUTURE_ROUTES` diff. No other item line changes.
- Smoke: the 6 unlocked items are anchors (not `data-coming-soon`, not disabled); `classSalaryReport` stays
  disabled+`nav.reason.finance`+lock icon; admin-menu-50 freeze byte-verbatim.
- **Sanctioned amendment (declared, Spec-030-style supersession):** `tests/smoke/run.cjs` `nav010` — `lockedFin`
  array (currently 7 ids @~1586) is rewritten to `['classSalaryReport']` only; `finLinks` assert (currently expects
  exactly `['finance']` @~1601) is rewritten to expect the 7 implemented ids
  (`['finance','invoices','payments','monthlyInvoices','salaries','staffSalaries','banks']`); `lockedOk` message
  updated from "the seven locked finance items" to reflect the one remaining lock. This is the ONE sanctioned
  protected-assert change for Spec 038.
- Every changed `route` resolves to a real, built tab/deep-link on `finance.html` (no dead link introduced); each
  `#view=` opens the correct tab on fresh load, AR and EN.
