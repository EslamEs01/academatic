# Contract: Dashboard Impact (Spec 009)

**Status**: Binding · Zero dashboard feature impact, stated body-scoped. References FR-017; SC-006; research D3.

## 1. The decision: net new dashboard chrome = 0

Spec 009 makes **no change to `src/js/pages/dashboard.js`** and no change to any fixture/component the dashboard renders. No new card, chip, stat, quick-link, money KPI, payment total, revenue widget, cashflow, or "billing attention" chip is added. Rationale: the dashboard is at its established chip budget (Spec 008 decision), and finance is fixture-only — a dashboard money signal would either fabricate importance or duplicate the sidebar entry point. A future real-backend finance spec owns any dashboard finance signal.

## 2. The pre-existing `revenue` KPI stays exactly as-is

The Spec 001 `fixtures/kpis.js` `revenue` entry (48,200 · `unit.sar` · amber · wallet · part of the approved design PNG) is **neither extended, restyled, re-labeled, linked to finance.html, nor removed**. It remains the sanctioned Spec 001 approved-design fixture, listed as such in the scope-guard's sanctioned touch-points.

## 3. The corrected invariant — body-scoped, NOT whole-file (binding)

Because `build-html.mjs` regenerates every page and `shellMarkup` bakes the sidebar into each one, adding the `finance` nav item changes every built file **including `dashboard.html`** — whole-file byte identity is impossible by construction and is NOT this contract's claim. The binding claim is:

- `pages/dashboard.js` diff = **empty**.
- The built dashboard **`#page-body` content region** (both languages) is unchanged: zero new finance cards/chips/widgets/figures/links; the finance-token regex (the Spec 008 smoke technique: EN `\b(invoice|payment|billing|salary|payroll|payout|accounting)\b` + Arabic فاتورة/فواتير/مدفوعات/رواتب/محاسبة variants) over `document.getElementById('page-body').innerText` stays clean — noting the sanctioned pre-existing `revenue` KPI text («الإيرادات الشهرية» / "Monthly revenue"), which predates Spec 009 and is excluded from the token list (the regex above deliberately omits revenue-words for the dashboard check; the structural assertion "no new element" covers it).
- The **only** permitted differences anywhere in the built file: the shared sidebar's single new `finance` item, and the updated `nav.reason.finance` toast copy carried in the locked items' `title` attributes.

## 4. Verification (smoke — body-scoped DOM assertions)

On `dashboard` (ar + en): `#page-body` finance-chrome checks clean per §3 · sidebar contains exactly **one** `a[href$="finance.html"]` · the six wallet items remain `[data-nav-status="disabled"][aria-disabled="true"]` with the lock icon · no `finance.html` link exists inside `#page-body`.

**Acceptance (binding):**
1. **Given** `git diff`, **When** reviewed, **Then** `pages/dashboard.js`, `fixtures/kpis.js`, and every dashboard-rendered component are untouched.
2. **Given** the built dashboard, **When** the body-scoped assertions run, **Then** all pass — no new finance chrome in the body; sidebar diff only.
3. **Given** the dashboard `revenue` KPI, **When** compared before/after, **Then** identical (value, label, tone, no new link).
4. **Given** the screenshot set, **When** reviewed, **Then** no dashboard frame is required (no visual change) — the 008 precedent; the smoke assertions are the evidence.
