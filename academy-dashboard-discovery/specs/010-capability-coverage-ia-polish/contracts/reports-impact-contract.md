# Contract: Reports Impact (Spec 010)

**Status**: Binding · The academic shell stays academic. References FR-021; SC-010; US9; Spec 008 contracts (all remain binding).

## 1. The invariant

`src/js/pages/reports.js`, `fixtures/reports.js`, `components/report-card.js`, `report-status.js`, `report-actions.js`: **untouched** (git diff = empty). The reports `#page-body` remains finance-free forever (Spec 008 + 009 standing rule): no finance token, card, link, or figure; no fake BI, no chart, no score/rank, no real export. Report category cards, roll-up numbers, availability chips: unchanged.

## 2. What changes around it

Only the shared sidebar: the reports category panel gains the finance sub-section *grouping* (nav contract §1) — the panel's item set changes only by `banks` arriving as a locked member. The reports nav item, its route, active state, title, and crumb are unchanged.

## 3. Enforcement

Spec 008 scope-guard re-run green verbatim; existing body-scoped smoke (finance tokens absent, wallet-in-body = 0, currency tokens = 0, body finance links = 0) unchanged and green; screenshot frame 2 (reports category panel) verifies the grouping without body change.

**Acceptance (binding):**
1. **Given** `git diff`, **When** reviewed, **Then** all five Spec 008 module files show zero changes.
2. **Given** the built reports pages, **When** body-scoped smoke runs, **Then** all Spec 008/009 expectations hold exactly.
