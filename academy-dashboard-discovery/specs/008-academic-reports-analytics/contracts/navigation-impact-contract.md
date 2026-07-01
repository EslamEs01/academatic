# Contract: Navigation Impact (Spec 008)

**Status**: Binding · Records the (near-zero) sidebar/topbar delta for Spec 008. Extends the Spec 002 `../../002-admin-core-operations/contracts/navigation-ia-contract.md`; only the reports-category note is recorded here. References FR-001 / FR-012; data-model §2 / §13.

---

## 1. No nav change

`reports.html` is **already implemented** (`nav.config.js`: `item({ id:'reports', labelKey:'nav.reports', icon:'reports', route:'reports.html' })`), registered in `build-html.mjs` (`activeId:'reports'`). Spec 008 **enriches the page in place** — **no nav item is added, promoted, renamed, or removed**, and **no `build-html.mjs` change** is made.

## 2. Reports category stays as-is

| Item | Status | Spec 008 |
|---|---|---|
| `reports` | implemented (`reports.html`) | unchanged (the enriched shell) |
| `monthlyReports` | planned (FUTURE_ROUTES `monthly-reports.html`) | unchanged (planned) — surfaced **on the shell** as a labeled `planned`/`backendRequired` card (no route) |
| `dataAnalysis` | planned (FUTURE_ROUTES `analytics.html`) | unchanged (planned) — surfaced on the shell as a labeled `planned`/`backendRequired` card |
| `invoices`/`monthlyInvoices`/`salaries`/`staffSalaries`/`payments`/`classSalaryReport` | disabled (finance) | unchanged — **NOT** surfaced as reports (finance out of scope) |
| `sessionsAnalysis` (control category) | planned | unchanged (planned) — MAY be surfaced as a planned/backendRequired card |

## 3. Planned advanced reports are honest cards, not dead links

The shell surfaces `monthlyReports`/`dataAnalysis` (and optionally `sessionsAnalysis`) as labeled `planned`/`backendRequired` `reportCard`s — the **disabled-with-reason** variant (a non-`<a>` `aria-disabled` block), **never** a dead `<a href="#">`. The nav items themselves stay planned «قريبًا/Soon» buttons.

## 4. Active state + breadcrumb

`reports.html` keeps `activeId:'reports'` (the `reports` nav item active, violet pill + `aria-current="page"`) and its existing topbar title/crumb (`topbar.title.reports` / `topbar.crumb.reports`) — unchanged.

## 5. No finance nav promotion / no portal

The disabled finance nav items stay disabled (finance is a future spec). No portal entry. No new top-level category.

## 6. Build-time guard stays green

No nav change → the build-time dead-link guard (`nav.config.js`) is unaffected; `npm run build` passes unchanged.

## 7. Enforcement

- **Smoke**: `reports` is a real `<a href="reports.html">` (already asserted by the generic nav checks); the reports category still renders `monthlyReports`/`dataAnalysis` as «Soon» buttons; the enriched page surfaces planned reports as disabled-with-reason cards (not dead `<a href="#">`); no portal markup; exactly one `is-active[aria-current]` (the `reports` item).
- **Build**: page count unchanged; nav guard passes.

## 8. Cross-references

Binds to `reports-page-contract.md`, `static-html-django-ready-contract.md`, `dashboard-impact-contract.md`, and the Spec 002 `../../002-admin-core-operations/contracts/navigation-ia-contract.md`. **MUST NOT** add a nav item, promote a planned item, surface a finance report, or add a portal.

**Acceptance (binding):**
1. **Given** the sidebar, **When** rendered, **Then** `reports` is the active implemented item and no nav item was added/promoted/removed.
2. **Given** the enriched page, **When** rendered, **Then** advanced reports appear as labeled planned/backendRequired cards (no dead links), and `monthlyReports`/`dataAnalysis` stay «Soon» in the nav.
