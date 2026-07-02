# Quickstart — Spec 009: Finance, Billing & Payments Shell

## Build & preview

```bash
cd academy-dashboard-discovery/app
npm run build        # vendor assets → copy assets → Tailwind CSS → build-html.mjs (all pages, AR + EN)
npm run preview      # local static server (or open public/finance.html with VS Code Live Server)
npm test             # smoke + a11y (needs the build first)
npm run screenshots  # acceptance frames (reviewed in screenshots/REVIEW.md)
```

The build must print the new page pair in its count (20 bases / 40 pages + index) and must **throw** if the finance fixture coherence guard fails (fam5 without an overdue invoice, a payment referencing a cancelled/missing invoice, a trial-family invoice, a dangling id) — a broken fixture cannot ship.

## Route / page (after Spec 009)

- `public/finance.html` (Arabic RTL, default) + `public/finance.en.html` (English LTR) — activeId `finance`, reports category panel active, topbar «المالية» + crumb.
- Sidebar: **one** new implemented item «المالية / Finance» in the reports category, placed with the locked finance block; `invoices`, `monthlyInvoices`, `salaries`, `staffSalaries`, `payments`, `classSalaryReport` + `banks` (admin) remain **disabled** with lock icon + updated truthful reason toast.

## How to review — Finance page

Open `finance.html`. Confirm top-to-bottom: page header («المالية والفوترة» headline tone) + honest **action cluster** (Create invoice · Export CSV · Export PDF = disabled-with-reason; Print = demo toast) + **four count-only invoice tiles** (paid/unpaid/overdue/cancelled — counts, no money totals) + **Family invoices** section + **Recent payments** section + **Payroll & accounting** planned cards + baked invoice drawers. It must read as a calm academy billing surface — **no chart, no giant money KPI, no revenue/cashflow figure, no gateway/payroll impression, no 10-column legacy table**.

## How to review — invoices section

Each invoice row shows: serial (LTR) · family name → `family.html` · billing month · due hint · **authored amount** + «ريال» (digits LTR inside RTL) · course/group context link · a labeled **invoice-status chip** (icon + text — paid/unpaid/overdue/cancelled, never color-only) · row actions (View → drawer · Record payment → confirm → demo toast — **disabled-with-reason on the cancelled invoice**). Check coherence: `fam5` shows an **overdue** invoice (matching its «دفعة متأخرة» flag from Spec 004); `fam3`/`fam8` have none; the single cancelled invoice belongs to `fam7`.

## How to review — payments section

A short "recent payments" list (~6 rows): date · family → `family.html` · invoice serial → opens that invoice's drawer · authored amount · generic **method chip** (تحويل بنكي / بطاقة / نقدًا — no gateway branding) · labeled **payment-status chip** (recorded/pending/returned). Every payment references an existing non-cancelled invoice.

## How to review — invoice drawer

Click «عرض الفاتورة» on any row: a baked drawer (`<template data-preview>`) opens with serial, family/student/course links, month + date hints, amount lines labeled **display-only** (NO computed total line), the status chip, note — and honest actions: Mark as paid (confirm → demo toast; **the chip does not change**), Send reminder (confirm → demo toast), Send invoice (disabled-with-reason), Print (demo toast). Close restores focus.

## How to review — planned/backendRequired cards

Nine figure-free cards with availability chips: monthly invoices (**planned**) · invoices engine · payments collection · teacher salaries · staff salaries · class salary report · payouts & compensations · accounting & expenses (heads, analyses, multi-currency/FX) · banks (all **backendRequired**). Activating any card → disabled-reason toast; none is an `<a>`; none shows a number. The only real link near the payroll cards is the academic `teacher-performance.html` context link — with zero pay figures.

## How to review — finance actions

Walk every control on the page and in the drawer. Each yields exactly one of: drawer open · demo toast · confirm-modal → demo toast · disabled-reason toast · real navigation. After ANY action: no chip changed, no file downloaded, nothing sent, nothing persisted (reload → identical page). There is **no upload-receipt affordance anywhere** (the reference system had none).

## How to verify source links

```bash
cd academy-dashboard-discovery/app
grep -c 'href="#"' public/finance.html public/finance.en.html   # → 0 for both
```
Then click through: family/student/course/group/sessions/attendance/teacher-performance links all land on implemented pages (EN page links carry `.en.html`).

## How to verify no dashboard/reports body finance changes (the body-scoped invariant)

`git diff` must show **zero** edits to `src/js/pages/dashboard.js`, `src/js/pages/reports.js`, `src/js/fixtures/reports.js`, `src/js/components/report-*.js`. The built `dashboard.html`/`reports.html` DO differ — **only** by the shared sidebar's new finance item (the nav is baked into every page; whole-file identity is impossible by construction). Smoke proves the invariant body-scoped: the finance-token regex over `#page-body` on dashboard/reports is clean, the sidebar has exactly **one** `a[href="finance.html"]`, and the six wallet items are still `aria-disabled` with the lock icon. The dashboard `revenue` KPI remains exactly the Spec 001 approved fixture.

## How to verify no real invoice/payment/accounting/payroll engine

```bash
cd academy-dashboard-discovery/app
# no gateway/ledger/payroll/tax/FX machinery in the finance files
grep -RniE 'gateway|paymob|payoneer|stripe|paypal|ledger|vat|tax|exchange.?rate|conversion' \
  src/js/pages/finance.js src/js/fixtures/finance.js src/js/components/finance-*.js src/locales/*.fin.js && echo FAIL || echo ok
# no teacher/staff pay figures
grep -RniE 'salary|payroll|payout|compensation|hour_?rate|fine_?per' \
  src/js/fixtures/finance.js src/js/pages/finance.js | grep -viE 'planned|backendRequired|labelKey|descKey' && echo FAIL || echo ok
```
(The `fin.planned.*` card titles legitimately contain the words "salaries/payouts" as labels — the second grep's exclusion shows they appear only as planned-card label keys, never as data fields or figures.)

## How to verify no money arithmetic

```bash
cd academy-dashboard-discovery/app
grep -RnE '\.reduce\(|\+=|Sum|total\s*=|amount\s*[*+/-]' src/js/pages/finance.js src/js/fixtures/finance.js src/js/components/finance-*.js && echo FAIL || echo ok
```
Must print `ok` — the ONLY derived numbers are `rows.filter(…).length` row counts. Manually trace: each tile count equals the number of visible rows with that status; every amount on screen exists verbatim as an authored literal in `fixtures/finance.js`.

## How to verify no receipt upload

```bash
grep -RniE 'receipt|upload|attachment|إيصال|proof' src/js/pages/finance.js src/js/components/finance-*.js src/js/fixtures/finance.js src/locales/*.fin.js && echo FAIL || echo ok
grep -c 'type="file"' public/finance.html public/finance.en.html   # → 0 for both
```

## How to verify static HTML-first

View source of `public/finance.html` with JS disabled: the complete shell + all tiles/rows/chips/drawer templates/planned cards are present; no `<div id="app">`; only `./assets/…` relative paths; zero external requests; no raw `⟦key⟧`. Repeat on `finance.en.html` (LTR) and in dark mode (`data-theme="dark"`). The markup is loop-shaped (one row shape per collection) → Django `{% for %}` + chip template tags per `data-model.md`.

## How to verify no persistence/mutation

Confirm a Record-payment / Mark-as-paid action, then hard-reload: every chip, tile count, and row is identical (fixtures are the only source of truth; localStorage holds only theme/lang/nav-category keys — nothing finance-shaped).

## Verify — gates

1. `npm run build` — green, 20 bases, coherence guard silent.
2. `npm test` — smoke (incl. the Spec 009 block + dashboard/reports body-scoped checks) + axe critical = 0.
3. `contracts/scope-guard.md` G8a audit — every grep prints nothing/ok, both directions.
4. `npm run screenshots` — the 8-frame Spec 009 matrix captured.
5. The manual screenshot review recorded in `app/screenshots/REVIEW.md` is the **final gate** — automated green is necessary but not sufficient.
