# Contract — `lockedFin` Smoke Supersession (Spec 038)

The **ONE** declared protected-assert change for Spec 038 (Spec-030-style supersession precedent —
same class of amendment the finance-tab-hub change made in Spec 030). Every other finance/role-law
assert in `app/tests/smoke/run.cjs` stays byte-verbatim; this contract scopes ONLY the `nav010` block
(lines ~1571-1613).

## Current state (`run.cjs:1571-1613`, the `nav010` block)
- `lockedFin` (line 1586): `['invoices', 'monthlyInvoices', 'salaries', 'staffSalaries', 'payments',
  'classSalaryReport', 'banks']` — all 7 ids asserted `disabled` + `data-reason-key="nav.reason.finance"`
  + a `use[href="#i-lock"]` icon.
- `lockedOk` (lines 1587-1592): `lockedFin.every((id) => …)` checking the three conditions above.
- `finMembers` (line 1578): the FULL 8-id list of `.nav-item`s in the finance sub-section regardless
  of status — `['finance', 'invoices', 'monthlyInvoices', 'salaries', 'staffSalaries', 'payments',
  'classSalaryReport', 'banks']` (source order = `nav.config.js:84-91`).
- `finLinks` (line 1579 computes it; line 1601 asserts it): only `a.nav-item[data-nav-status="implemented"]`
  — today exactly `['finance']` (the ONE implemented link before Spec 038).
- The failure message on line 1604: `'the seven locked finance items (six billing + banks) must stay
  disabled+reason+lock'`.

## Amended state (Spec 038)
- **`lockedFin` → `['classSalaryReport']`** — the ONE item that stays locked (see
  `finance-locks-and-gates-contract.md` §Honest-lock policy). `finance-analysis` is **not** added to
  `lockedFin`: it has no `nav.config.js` entry at all (confirmed — no `financeAnalysis`/
  `analysisExpenses`/`analysisInvoices` id exists), so there is nothing to assert there.
- **`lockedOk` logic is UNCHANGED** — still `lockedFin.every((id) => …)` over the same three
  conditions (`disabled` + `nav.reason.finance` + `#i-lock`); only the ARRAY shrinks from 7 ids to 1.
- **`finLinks` expectation → the 7 implemented ids, in `nav.config.js:84-91` DOM order**:
  `['finance', 'invoices', 'monthlyInvoices', 'salaries', 'staffSalaries', 'payments', 'banks']`.
  This is the literal source order of the `item({...})` calls at lines 84-91 (finance, invoices,
  monthlyInvoices, salaries, staffSalaries, payments, classSalaryReport, banks) with
  `classSalaryReport` excluded because it stays `disabled` — the `a.nav-item[data-nav-status=
  "implemented"]` selector returns anchors in DOM order, not alphabetical, so this exact sequence is
  the only value that can pass a `JSON.stringify(...)===JSON.stringify(...)` equality check.
- **`finMembers`** (line 1578) is **UNCHANGED** — it selects every `.nav-item` regardless of status,
  so the full 8-id list and its order stay exactly as today; only the two DERIVED lists
  (`lockedFin`, `finLinks`) change.
- The failure message on line 1604 is reworded to reflect the new scope (e.g. "the one remaining
  locked finance item (classSalaryReport) must stay disabled+reason+lock") — wording only, no
  assertion-logic change beyond the array contents and this message string.

## What does NOT change
- `banksInReports`/`banksInAdmin`, `railCats===6`, `finLabel` (`cat.finance`), `admItems.length===5
  && !admItems.includes('banks')`, `sessBadge`, `famTitle` — every other `nav010` probe is
  byte-verbatim (lines 1571-1613 minus the two amended lines above).
- The finance display block elsewhere in the same file (`page === 'finance'`, `run.cjs` ~958-1045):
  4 status tiles, 9 invoice rows, 6 payment rows, per-status chip label checks, ≥4 disabled-with-reason
  + 0 demo-actions in the Overview action cluster, ≥1 row confirm, the cancelled-invoice
  disabled-record-payment check, 9 `inv*` drawer templates, 0 `href="#"`, 0 receipt/upload/
  `type="file"` token, `plannedN===9`/`plannedDisabled===9`/figure-free/availability-chip, the
  `forbidden` chart/score/rank/leaderboard/percentile regex, the (g) no-mutation-on-confirm check,
  the (j) tile-filter-narrows check — **ALL byte-identical, zero touch**.
- `payHit`/`tchPay`/`famPay`/`payFigure`, the `child-view` forbidden-wording check, admin-menu-50
  (`navCount32===50`), route/page-count-115, and every Spec 026-037 protected assert — byte-verbatim.

## Acceptance
- `lockedFin.length === 1` and its sole member is `'classSalaryReport'`; `lockedOk` still passes (the
  one remaining lock is genuinely `disabled`+reason+lock-icon, unchanged since pre-038).
- `finLinks` deep-equals `['finance', 'invoices', 'monthlyInvoices', 'salaries', 'staffSalaries',
  'payments', 'banks']` on every admin page load (AR + EN), not only `finance.html`.
- The 6 unlocked items are real `<a href="finance.html#view=...">` anchors — NOT `data-disabled-reason`
  buttons, NOT carrying `#i-lock` — and each resolves + opens the correct tab on fresh load, AR + EN.
- A diff of `run.cjs` for this contract's scope is confined to: the `lockedFin` array (line ~1586),
  the `finLinks` expected array (line ~1601), and the failure message string (line ~1604). Lines
  ~958-1045 (the finance display block) and every other line in the file are byte-identical.
- This is the **ONLY** sanctioned protected-assert change for Spec 038 — no other spec/role-law
  assert may be touched under this contract; cross-reference `finance-locks-and-gates-contract.md`
  and `no-fake-money-contract.md` for everything that must stay green unchanged.
