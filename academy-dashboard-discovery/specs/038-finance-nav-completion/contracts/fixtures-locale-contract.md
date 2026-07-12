# Contract — Fixtures & Locale

## Fixtures
- **Reused unchanged, `src/js/fixtures/finance.js` (ideally 0-diff):**
  - `INVOICES.rows` (×9) — the Invoices tab and the Monthly-Invoices board both render this SAME
    array; the monthly board is a **derived view** (`INVOICES.rows.filter((r) => r.monthKey ===
    monthKey)` grouped over the 4 existing `monthKey` values: april/may/june/july). **No new
    fixture rows, no new fields** (no per-month sum field, no running balance).
  - `PAYMENTS.rows` (×6) — the Payments tab renders this array as-is.
  - `SALARIES` (×6: 4 teacher + 2 staff) — the Salaries tab (`salaries` + `staffSalaries` nav
    items both deep-link here) renders this array as-is; figure-free shape (`nameKey`/`statusId`/
    `periodKey`, no amount field).
  - `BANKS` (×4) — the Banks tab renders this array as-is (name + status, no balance/credential).
  - `PLANNED_FINANCE` (×9) — the Overview tab's planned-card section, **untouched**; the
    `monthlyInvoices` and `classSalaryReport` entries are explicitly KEPT even though
    `monthlyInvoices` also gets a real display tab (the card represents the bulk-generation
    ENGINE, a different capability from the read-only grouped view of the 9 existing invoices).
  - `FINANCE_SUMMARY` — stays row-COUNT-only, never a SAR sum.
- **No new fixture file, no new money field, no new entity.** If any additive field is ever
  needed for the monthly board (none is expected), it must be a categorical/derived-view helper,
  never an `amount`/`total`/`rate` field.

## Locale
- **Extend the EXISTING mirrored pair** `src/locales/ar.fin.js` + `en.fin.js` — no new locale
  pair, no new registration in `i18n.js` (**`i18n.js` 0-diff**).
- New keys under the existing `fin.tab` block (today holds `overview`/`salaries`/`banks`/`aria`):
  `fin.tab.invoices`, `fin.tab.payments`, `fin.tab.monthlyInvoices`.
- New `fin.monthly.*` block (monthly-invoices board copy + gates): `title`, `sub`, `generate`,
  `generateReason`, `export`/`exportReason`, `send`/`sendReason` — reuse the existing
  `fin.reason.backend`/`fin.reason.export`/`fin.reason.send` wording pattern rather than inventing
  new phrasing; `fin.monthly.m.*` is NOT needed — the 4 month labels already exist at
  `data.fin.month.{april,may,june,july}` and are reused verbatim (no duplicate month strings).
- Invoices/Payments/Banks tabs reuse EXISTING copy (`fin.sec.invoices*`, `fin.sec.payments*`,
  `fin.bank.*`) — no new key required for those three unless a distinct tab-header string is
  explicitly wanted, in which case it must be a same-shaped sibling under `fin.sec.*`, mirrored.
- The monthly-invoices board is **display-only, no `filterBar()`** (the page already owns the
  Invoices tab's implicit single-filter-surface decision and the enhance.js global
  `[data-no-results]` constraint) — so **no `fin.filter.month`/`fin.filter.allMonths` key is
  added**. This is the safe default recorded in `monthly-invoices-scope.md`; do not add filter
  copy unless that scope decision is explicitly revisited.

## CSS
- Additive only: new `.finm-*` class family + `#fin-monthly` container id for the monthly board.
  No existing class renamed/removed; no new `data-*` hook; no new storage key; no new dependency.

## Rules
- AR ↔ EN **0 divergence** — identical key trees under `fin.tab`/`fin.monthly`; values translated,
  keys mirrored 1:1.
- **0 raw keys** in any rebuilt page (`t()` returns `⟦key⟧` on a miss — smoke catches this).
- No pay/salary/rate/hour_rate/fine/payout/currency-with-salary/credential/secret token introduced
  by any new key or fixture read.
- `package.json`, `build-html.mjs`, `enhance.js`, `i18n.js` — **0-diff**. `fixtures/finance.js` —
  **0-diff if at all possible** (the monthly board must be achievable as a pure derive-at-render
  step over `INVOICES.rows` in `pages/finance.js`, not a fixture-layer change).

## Acceptance
- Build the `ar.fin.js`/`en.fin.js` pair at **0-divergence** (identical key sets for the new
  `fin.tab.{invoices,payments,monthlyInvoices}` and `fin.monthly.*` subtrees).
- Grep for `⟦` in `public/finance.html` + `public/finance.en.html` = 0 (no raw-key leak).
- Grep for `salary|payroll|payout|rate|hour_rate|fine|type="password"|type="file"|secret|api[- ]?key`
  in the new `fin.monthly.*` keys and the monthly-board render path = 0.
- `git diff --stat` shows `i18n.js` = 0 lines, `package.json` = 0 lines; `fixtures/finance.js` = 0
  lines (target) or additive-comment-only if unavoidable.
