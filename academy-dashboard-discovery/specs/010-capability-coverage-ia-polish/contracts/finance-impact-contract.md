# Contract: Finance Impact (Spec 010)

**Status**: Binding · Spec 009 compliance preserved to the letter. References FR-021; SC-010; US9; Spec 009 contracts (all remain binding).

## 1. The invariant

`src/js/pages/finance.js`, `fixtures/finance.js`, `components/finance-status.js`, `finance-actions.js`, `locales/*.fin.js`: **untouched** (git diff = empty). Everything Spec 009 guaranteed still holds: fixture-authored literals only; tiles = row counts; no runtime money arithmetic; no receipt/upload concept; no teacher/staff pay figures; invoice/payment status vocabularies unchanged; chips never mutate; 9 figure-free planned/backendRequired cards; honest action matrix; drawer without total line; fixture coherence guard green.

## 2. What changes around it

- Sidebar: finance moves INTO the labeled sub-section (same category, still the only finance link, still `activeId:'finance'` working).
- One inbound link arrives from the family profile (source-links contract) — finance page body itself unchanged.
- `.fin-row[hidden]` CSS rule stays; the new shared `[data-row][hidden]` rule makes it redundant but it is NOT removed (zero-risk).

## 3. Enforcement

Spec 009 scope-guard G8a re-run green (with its two attributed Spec 010 amendment tokens); the full Spec 009 smoke block unchanged and green (including the computed-visibility check (j)); Spec 009 fixture coherence guard throws-on-violation unchanged; screenshot frame 13 verifies the body is unchanged.

**Acceptance (binding):**
1. **Given** `git diff`, **When** reviewed, **Then** all six Spec 009 files show zero changes.
2. **Given** the built finance pages, **When** the Spec 009 smoke block runs, **Then** every assertion passes unchanged.
3. **Given** the G8a audit with Spec 010's amendments, **When** run, **Then** every line prints `ok`.
