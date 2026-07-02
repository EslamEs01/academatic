# Contract: Dashboard Impact (Spec 011)

**Status**: Binding · One sanctioned body touch-point, nothing else. References FR-002/FR-011; SC-004; US4.

## 1. The invariant

`src/js/pages/dashboard.js` and its fixtures (`kpis.js`, `welcome.js`, `status-summary.js`) change ONLY at the Overview `sectionHeader` `linkHref` (research D1). The built dashboard `#page-body` differs from `HEAD` **only** at the Overview `<a href>` value. No card, chip, stat, widget, or wording is added or removed; the Spec 001 revenue KPI and all Spec 003–010 dashboard integrations are untouched. The localized sessions badge lives in the shared sidebar (outside `#page-body`) — not a dashboard-body change.

## 2. Enforcement

`git diff` on `dashboard.js` shows only the `linkHref` addition; a `#page-body` diff vs `HEAD` shows only the Overview href; the existing Spec 009 body-scoped smoke (finance tokens absent, wallet-in-body = 1 [revenue KPI], body finance links = 0) stays green; screenshot frame (dashboard AR/EN) shows no visual regression.

**Acceptance (binding):**
1. **Given** `git diff`, **When** reviewed, **Then** dashboard changes are the single Overview `linkHref` only.
2. **Given** the built dashboard body-scoped smoke, **When** run, **Then** all Spec 009 expectations hold unchanged.
