# Contract: Navigation Impact (Spec 009)

**Status**: Binding · One born-and-promoted item; seven locked items unchanged; truthful reason copy. References FR-001–FR-003; SC-005; data-model §11; research D2.

## 1. Exactly ONE new item — born-and-promoted (the Spec 005 `attendance` precedent)

`finance` has no `FUTURE_ROUTES` reservation (verified), so Spec 009 creates and promotes it in one step: add `item({ id: 'finance', labelKey: 'nav.finance', icon: 'wallet', route: 'finance.html' })` to `NAV_CATEGORIES[reports].items`, inserted **directly before** `invoices` so the finance block reads as one group; add `finance: 'finance.html'` to `FUTURE_ROUTES` at the same moment (documentation-parity, exactly as Spec 005 did for `attendance`). Labels: «المالية» / "Finance" (`nav.finance`, defined in the `ar.fin.js`/`en.fin.js` overlay — deepMerge extends the `nav` block).

## 2. Everything else is frozen

- The six disabled items — `invoices`, `monthlyInvoices`, `salaries`, `staffSalaries`, `payments`, `classSalaryReport` — and `banks` (admin category) keep `status:'disabled'`, the wallet icon, the trailing lock icon, and `reasonKey:'nav.reason.finance'`.
- No item is added (beyond `finance`), promoted, renamed, re-iconed, moved between categories, re-ordered (beyond the one insertion), or removed. No new category; no `sections[]` restructure of the reports category (considered and rejected — research D2; noted as a future-IA option when real finance specs land).
- `monthlyReports`/`dataAnalysis` stay `planned` («قريبًا» buttons); all `future-role` portal entries stay never-rendered.

## 3. Truthful reason copy (the one base-locale edit)

`nav.reason.finance` copy in base `ar.js`/`en.js` is updated one line each so the locked items' toast stays honest now that a fixture shell exists — it MUST state that the **real billing backend** is still required and MAY point to the Finance page as the fixture-only preview (final copy at implementation, e.g. «تتطلب نظام الفوترة الفعلي — صفحة المالية تعرض معاينة تجريبية بالبيانات الثابتة.» / "Requires the real billing backend — the Finance page shows a fixture-only preview."). It MUST NOT claim the module exists, is coming on a schedule, or is entirely absent.

## 4. Build guard & shell invariants (must stay green)

The `nav.config.js` build guard passes unchanged: `finance` is implemented+routed; the seven locked items keep their `reasonKey`; no non-implemented item gains a route. On `finance.html`: exactly one `.nav-item.is-active[aria-current="page"]` (the `finance` item), the reports category panel is the single visible panel, six rail tabs, topbar `topbar.title.finance` + crumb `topbar.crumb.finance` (keys in the fin overlay — the Spec 005/007 new-page pattern).

## 5. No dead links + sidebar↔shell story

Every nav element remains: real `<a>` (implemented) · «قريبًا» button (planned) · locked button with reason (disabled) — never `href="#"`. Each locked finance concept has exactly one planned/backendRequired card on the shell (`planned-finance-contract.md`) so the sidebar and the page tell one story.

## 6. Sidebar ripple across built pages (documented, bounded)

Adding the item changes the baked sidebar on **all** built pages (the nav renders into every page). This is the sanctioned, bounded ripple: the diff on every non-finance page consists of exactly (a) the one new `finance` `<a>` row and (b) the updated reason `title`/toast copy on locked items. Anything else appearing in a non-finance page's diff is a violation. Body-scoped enforcement for dashboard/reports lives in their impact contracts.

**Acceptance (binding):**
1. **Given** `nav.config.js`, **When** diffed, **Then** exactly +1 `item(…)` line and +1 `FUTURE_ROUTES` line changed (plus nothing else).
2. **Given** any built page, **When** the sidebar is inspected, **Then** exactly one `a[href$="finance.html"]` exists; the six wallet items + `banks` are still locked with lock icon + reason toast.
3. **Given** the reason toast, **When** read (AR + EN), **Then** it truthfully names the missing backend and does not deny the fixture shell's existence.
4. **Given** the smoke IA assertions, **When** run on `finance` (both langs), **Then** shell invariants hold (one active pill, one visible panel, ≥6 rail tabs, no portal chrome, no dead nav item).
