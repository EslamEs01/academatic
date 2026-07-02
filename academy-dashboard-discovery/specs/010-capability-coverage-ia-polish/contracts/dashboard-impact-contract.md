# Contract: Dashboard Impact (Spec 010)

**Status**: Binding · Zero body change. References FR-021; SC-010; US9.

## 1. The invariant

`src/js/pages/dashboard.js` and every dashboard fixture are **untouched** (git diff = empty for them). The built dashboard `#page-body` is content-identical before/after Spec 010: no new card, chip, stat, link, or wording; no removal either. The ONLY dashboard-page diff is the shared sidebar (finance sub-section grouping, banks membership, category label, badge derivation) — the sanctioned Spec 009-style ripple.

## 2. The revenue KPI stays

The Spec 001 authored revenue KPI (the approved-design artifact) is untouched — not removed, not relabeled, not linked to finance. The coverage matrix documents it as a sanctioned authored artifact. The existing smoke expectations remain exact: dashboard body wallet-icon count = 1, finance-token regex clean (revenue words excluded by design), body finance links = 0.

## 3. Enforcement

Existing Spec 009 body-scoped smoke block unchanged and green; `git diff` over `pages/dashboard.js` + dashboard fixtures empty; screenshot frame 12 (dashboard AR light) human-verified content-identical.

**Acceptance (binding):**
1. **Given** `git diff`, **When** reviewed, **Then** dashboard page module and its fixtures show zero changes.
2. **Given** the built dashboard pages, **When** the body-scoped smoke checks run, **Then** all pass with the same expected counts as Spec 009 left them.
