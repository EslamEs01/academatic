# Count & Route Contract — Spec 038

## Count

| Field | Value |
|---|---|
| Before count | **115** |
| After count (recommended) | **115** (delta 0) |
| New page bases (recommended) | **0** |
| New public HTML files (recommended) | **0** |
| Admin menu | **50** (unchanged) |

**Recommended: fold all finance items into `finance.html` tabs → count 115.** `finance.html` is already the Spec-030 hub; every item is an existing or promoted tab.

### Explicit count IF standalone pages chosen instead
| Choice | New bases | New files | Count after |
|---|---|---|---|
| invoices standalone | 1 | +2 | 117 |
| payments standalone | 1 | +2 | 119 |
| each further finance page | 1 | +2 | +2 each |
| **Recommended (0 standalone)** | **0** | **0** | **115** |

## Route changes

Finance items flip `disabled` → `implemented` with `finance.html#view=…` routes (writes stay gated). Items that stay honest locks keep `disabled`+reason.

| Nav key | Before | After (recommended) |
|---|---|---|
| invoices | `disabled` (lock) | `implemented` → `finance.html#view=invoices` |
| payments | `disabled` (lock) | `implemented` → `finance.html#view=payments` |
| monthlyInvoices | `disabled` (lock) | `implemented` → `finance.html#view=monthly-invoices` |
| salaries | `disabled` (lock) | `implemented` → `finance.html#view=salaries` |
| staffSalaries | `disabled` (lock) | `implemented` → `finance.html#view=salaries` (or `#view=staff-salaries`) |
| classSalaryReport | `disabled` (lock) | `implemented` → `finance.html#view=class-salary-report` **OR unchanged (honest lock)** |
| banks | `disabled` (lock) | `implemented` → `finance.html#view=banks` |
| finance-analysis | (planned card / lock) | **unchanged (honest lock / deferred)** |

## Invariants (must hold)

- **admin menu = 50** — unlocking changes item *status*, not count; no item added/removed.
- **nav changes = the scoped finance items only.** No other nav item, no `FUTURE_ROUTES` finance entries (none exist), no removals.
- **`nav.config.js` build-time guard:** an `implemented` item needs a `route`; a non-implemented item must not have one — each flip adds the `finance.html#view=…` route; each retained lock keeps `disabled`+reasonKey.
- **`build-html.mjs` 0-diff** (no new page under the fold), **`enhance.js` 0-diff** (tabs/`#view=` already support the `finance` group), **`i18n.js` 0-diff** (extend the existing `ar/en.fin.js`), **`package.json` 0-diff**.
- **Sanctioned smoke amendment (declared):** the nav010 `lockedFin`/`lockedOk` assert (currently all 7 finance items disabled+lock) is updated — unlocked items removed from the locked set; deferred items (classSalaryReport/finance-analysis if kept locked) remain. Spec-030-style supersession.
- **Preserved verbatim:** finance 9-invoices / 6-payments / 9-planned-cards / `forbidden` regex / no-mutation / no-receipt / FINANCE_SUMMARY row-count-only; teacher pay-free; admin-menu-50; reports finance-free.

## Acceptance
- `find public -maxdepth 1 -name '*.html' | wc -l` = 115 (recommended path).
- `git diff nav.config.js` shows only the finance flips (+ retained locks) — no other nav change.
- Every unlocked route deep-links to `finance.html#view=…` and opens the right tab on fresh load AR/EN.
