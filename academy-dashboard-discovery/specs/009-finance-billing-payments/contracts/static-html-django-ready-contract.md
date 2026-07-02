# Contract: Static HTML-First / Django-Ready (Spec 009)

**Status**: Binding · Architecture invariants for the finance shell. References FR-018, FR-019, FR-020; SC-008, SC-009; carries forward the SD-rules of Specs 002–008 verbatim.

## SD0. Scope

Applies to `finance.html` / `finance.en.html` and every Spec 009 source file. All prior SD rules remain in force app-wide.

## SD1. Static HTML-first

No whole-page `<div id="app">` mount. Both finance pages are **complete pre-rendered** static documents (full shell + all tiles/rows/chips/planned cards/drawer templates baked). View Source shows everything without JS.

## SD2. Baked content; JS enhances only

`pages/finance.js` runs at **build time** inside `build-html.mjs`. Runtime `enhance.js` only: applies filters to pre-rendered rows, opens the baked drawer/confirm modal, shows demo/disabled-reason toasts, swaps nav category panels. Runtime JS constructs **no** page DOM and computes **no** value (especially no money value).

## SD3. Closed `data-*` hook allowlist — NO new hook

Spec 009 uses only: `data-filter-form/-filter/-reset/-apply/-count/-set`, `data-row` + facet attrs, `data-drawer`/`data-preview`/`data-sheet-close`, `data-demo-action`/`data-toast`, `data-confirm(+-title/-msg/-cta/-toast)`, `data-disabled-reason`/`data-reason-key`, `data-nav-category`. It introduces **no new `data-*` hook** and does not alter `enhance.js` semantics (notably: the single page-level `[data-filter-form]` lookup is why only the invoice list is filterable — research D6).

## SD4. Per-language pre-render

`finance.html` (ar, `dir="rtl"`, default) + `finance.en.html` (en, `dir="ltr"`) from the same `PAGES` entry. No runtime language fetch/switch of content; internal links are language-aware (`.en.html` on EN pages).

## SD5. i18n overlay

`ar.fin.js`/`en.fin.js`, key-mirrored, registered via `deepMerge` after the `*.rep.js` block; carries `nav.finance`, `topbar.title/crumb.finance`, `finPage.*`, `fin.*`, `data.fin.*`. Missing keys render `⟦key⟧` and are smoke-caught. The only base-locale edit is the one-line `nav.reason.finance` truthfulness update.

## SD6. Relative/local assets only

`./assets/…` paths; zero external/CDN requests; `.nojekyll` preserved; works from filesystem, VS Code Live Server, and GitHub Pages.

## SD7. RTL/LTR + theming

Arabic-first layout via logical properties; amounts/serials/dates wrapped `<span dir="ltr">`; `num()` yields Arabic-Indic digits on AR pages. Light/Dark/System via the existing `data-theme` snippet; chip tones only from the styled set; AA contrast via the existing `-ink` tokens; no new color/tone.

## SD8. Django-template readiness (mapping table)

| Static shape | Django |
|---|---|
| invoice rows (`#invoice-list`) | `{% for invoice in invoices %}` → `_invoice_row.html` |
| invoice status chip | `{{ invoice.status\|invoice_status_chip }}` |
| payment rows | `{% for payment in recent_payments %}` → `_payment_row.html` |
| payment status/method chips | `{{ payment.status\|payment_status_chip }}` / `{{ payment.method\|method_label }}` |
| summary tiles | `{% for tile in finance_summary.tiles %}` (counts = `.count()` querysets, never `Sum()`) |
| planned cards | `{% for surface in planned_finance %}` → existing `_report_card.html` disabled variant |
| invoice drawer | ONE partial `_invoice_drawer.html` inside the invoice loop |
| sidebar finance item | one `{% url 'finance' %}` entry in the shared sidebar partial |
| source links | `{% url 'family' %}` / `{% url 'student' %}` / `{% url 'course' %}` / `{% url 'group' %}` / `{% url 'attendance' %}` / `{% url 'teacher-performance' %}` |

## SD9. Fixture-only data with a build-time coherence guard

`fixtures/finance.js` is authored literal data + row-count roll-ups + the throwing coherence guard (data-model). No API/DB/localStorage of finance data; reload always reproduces the identical page.

## SD10. Enforcement

Smoke asserts on both finance pages: no `id="app"`, no external request, no raw key, no absolute asset path, baked rows/tiles/drawers present without JS, every disabled control carries a reason, shell invariants; plus the Spec 009 block (tiles=row counts, honest actions, no receipt token, dashboard/reports body-scoped checks). The scope-guard G8a audit is cross-referenced as clean.

**Acceptance (binding):**
1. **Given** `public/finance.html` with JS disabled, **When** viewed, **Then** all sections/rows/chips/drawer templates are present and readable.
2. **Given** the built pages, **When** grepped, **Then** zero `id="app"`, zero `http(s)://` asset URLs, zero `⟦`.
3. **Given** the Django table (SD8), **When** each static shape is inspected, **Then** it is loop-shaped with one row shape per collection (template-portable).
4. **Given** `enhance.js`, **When** diffed, **Then** zero changes (no new hook, no changed semantics).
