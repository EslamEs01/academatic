# Contract: Finance Page (Spec 009)

**Status**: Binding · The one new page `finance.html` / `finance.en.html` — composition, registration, and page-level guarantees. References FR-001, FR-002, FR-004, FR-005; SC-001, SC-002; data-model §3, §11.

## 1. NEW PAGE — registered fresh (the Spec 005 `attendance` promotion pattern)

`finance` is a genuinely new page + nav item born-and-promoted in one step: one import + one `PAGES` entry in `build-html.mjs` — `{ base: 'finance', activeId: 'finance', titleKey: 'topbar.title.finance', crumbKey: 'topbar.crumb.finance', render: renderFinance }` — producing `public/finance.html` (AR, RTL, default) + `public/finance.en.html` (EN, LTR). No other page is added; no existing `PAGES` entry changes.

## 2. Composition (top-to-bottom, all baked at build time)

1. `pageHeader` — title + subtitle (`finPage.*`); no primary CTA that implies creation works (Create invoice lives in the action cluster, disabled-with-reason).
2. `financeActions()` cluster (see `finance-actions-contract.md`).
3. **Invoice status tiles** — exactly four count-only tiles (paid / unpaid / overdue / cancelled), each count = authored row count, each a `data-filter-set="status:<id>"` button targeting `#invoice-list` (the Spec 005 attendance tile mechanism). NO money total tile, NO payments-collected tile, NO revenue/cashflow figure.
4. **Family invoices** section (`invoice-section-contract.md`) with `filterBar` + `#invoice-list` + `noResults()`.
5. **Recent payments** section (`payment-section-contract.md`).
6. **Payroll & accounting** planned section (`planned-finance-contract.md`).
7. Baked invoice drawers — one `<template data-preview>` per invoice (`previewTemplate` pattern), id `inv-<invoiceId>`.

## 3. Page-level MUST NOTs

- MUST NOT render a chart/canvas/graph/sparkline, a wide legacy-style data table, an aggregate money figure, a balance, or an FX/dual-currency display.
- MUST NOT compute anything from `amount` fields — every number is an authored literal or a row count (see `scope-guard.md` G8a).
- MUST NOT introduce a new `data-*` hook, a new chip tone, or a new component framework; row/drawer builders live inline in `pages/finance.js` (single-page use — the `reports.js` precedent).
- MUST NOT contain any receipt-upload affordance or `type="file"` input.

## 4. Shell integration

Exactly one `.nav-item.is-active[aria-current="page"]` (the `finance` item); the reports category panel is the single visible panel; topbar shows «المالية» + crumb `الرئيسية · المالية` (EN mirrored). The skip-link, rail, theme snippet, and relative asset paths are inherited unchanged from `shellMarkup`.

## 5. Empty/zero states

Filtering to zero rows shows the standard `noResults()` block with reset. A family filter for a zero-invoice family (`fam3`, `fam8`) yields that state — the page never fabricates a row to avoid emptiness.

## 6. i18n & RTL

All strings resolve from the `fin.*` / `finPage.*` / `data.fin.*` overlay (`ar.fin.js`/`en.fin.js`, key-mirrored); zero raw `⟦key⟧`. Amounts, serials, and dates render inside `<span dir="ltr">` within the RTL layout; `num()` renders Arabic-Indic digits on AR pages.

**Acceptance (binding):**
1. **Given** a clean build, **When** `public/` is listed, **Then** `finance.html` + `finance.en.html` exist and are complete static documents (full shell + all sections visible with JS disabled).
2. **Given** the four tiles, **When** their counts are compared with the rendered rows per status, **Then** they are equal — and no money-total tile exists.
3. **Given** the whole page, **When** audited, **Then** zero charts, zero aggregate money figures, zero `href="#"`, zero raw keys, zero external requests.
4. **Given** `finance.en.html`, **When** opened, **Then** the same structure renders LTR with English strings and `.en.html` internal links.
