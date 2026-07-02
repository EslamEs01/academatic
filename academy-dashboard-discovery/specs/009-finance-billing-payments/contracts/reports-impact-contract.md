# Contract: Reports Impact (Spec 009)

**Status**: Binding · The Spec 008 reports shell stays finance-free; stated body-scoped. References FR-017; SC-006; research D3, D9.

## 1. The decision: zero reports change

Spec 009 makes **no change** to `src/js/pages/reports.js`, `src/js/fixtures/reports.js`, or any `report-*` component's source. No finance category card, no finance area, no finance roll-up key in `REPORT_SUMMARY`, no finance chip/section/link is added to the reports body. The Spec 008 scope-guard (which greps exactly those files for finance tokens) MUST remain green — adding a `finance` key to `fixtures/reports.js` would break it and is forbidden.

## 2. Reports and Finance are separate shells by design

Reports = academic operations roll-ups (Spec 008). Finance = the new billing shell (this spec). The legacy mixed them (finance pages lived under the reports menu; the reports fixture once carried a `revenue` card that 008 removed) — the rebuild keeps them separate: the ONLY relationship is that both nav items live in the same `reports` sidebar category. The reports page does not link to finance.html and finance.html does not link to reports.html (neither is a source page of the other).

## 3. REUSE without modification (binding nuance)

`pages/finance.js` and `fixtures/finance.js` **import** from Spec 008 files (`reportCard`, `REPORT_AVAILABILITY`, `availabilityChip`) — imports are one-directional (finance → report components) and add zero lines to the imported files. No report file imports anything finance-shaped.

## 4. The corrected invariant — body-scoped, NOT whole-file

The built `reports.html`/`reports.en.html` change ONLY by the shared sidebar (the new `finance` item + the updated locked-item reason copy). The `#page-body` of reports remains exactly the Spec 008 shell: the existing Spec 008 smoke block — which already runs the forbidden finance-token regex against the reports `#page-body` — continues to pass unchanged, and IS the enforcement mechanism (no new assertion needed beyond re-running it; Spec 009's smoke additionally asserts the sidebar single-finance-link on the reports page).

**Acceptance (binding):**
1. **Given** `git diff`, **When** reviewed, **Then** `pages/reports.js` + `fixtures/reports.js` + `components/report-*.js` show zero changes.
2. **Given** the built reports pages, **When** the Spec 008 smoke block runs post-Spec-009, **Then** it passes verbatim (7 category cards, no finance token in `#page-body`, all existing assertions).
3. **Given** the Spec 008 scope-guard G8a audit, **When** re-run after Spec 009 lands, **Then** every grep still prints nothing.
4. **Given** the reports body, **When** inspected, **Then** no finance card/link/section exists; the sidebar's finance item is the only finance element on the page.
