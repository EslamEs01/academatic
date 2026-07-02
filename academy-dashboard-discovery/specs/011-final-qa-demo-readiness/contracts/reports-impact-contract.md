# Contract: Reports Impact (Spec 011)

**Status**: Binding · Reports stays untouched. References FR-009; SC-005; US4; Spec 008 contracts (remain binding).

## 1. The invariant

`src/js/pages/reports.js`, `fixtures/reports.js`, `components/report-{card,status,actions}.js`: **zero git diff**. The reports `#page-body` is byte-identical to `HEAD` — finance-free, no fake BI, no chart/score/rank, no new card/link. The only ripple on reports pages is the shared sidebar's localized sessions badge. Note: the dashboard Overview link now points *to* `reports.html`, but that is an inbound dashboard link and changes nothing on the reports page itself (reports was already a dashboard link target via the Reports section header).

## 2. Enforcement

`git diff` empty on all reports module files; reports `#page-body` diff vs `HEAD` empty; Spec 008 reports-body guard re-run green.

**Acceptance (binding):**
1. **Given** `git diff`, **When** reviewed, **Then** all reports module files are unchanged.
2. **Given** the reports `#page-body`, **When** diffed vs `HEAD`, **Then** identical.
