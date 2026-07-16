# Contract 2 — Capability Disposition & Ownership

**Canonical sources**: `legacy-current-capability-ledger.md` (380 rows) · `future-spec-allocation-register.md`
(§1 invariant, §2 census, §3 resolution rules, §4–§18 per-spec tables, §19 totals) ·
`rejected-legacy-behaviour-register.md` (52 RJ) · `unknown-and-conflicting-evidence-register.md` (47 UK) ·
`current-product-better-than-legacy-register.md` (63 B-x.y) · `plan.md` D3 (binding interpretation) ·
`spec.md` §2 (disposition definitions).

**Bound parties**: every future spec 043–057; every reviewer of their outputs.

## 1. The closed disposition set (12 words, exactly — no additions, no synonyms)

COMPLETE_AND_VERIFIED · COMPLETE_BUT_VISUAL_REVIEW_REQUIRED · PARTIAL · MISSING · INTENTIONALLY_IMPROVED ·
HONEST_LOCK · REJECTED_SECURITY · REJECTED_PRIVACY · REJECTED_NO_FAKE · REJECTED_PAY_FREE · FUTURE_BACKEND ·
UNKNOWN_EVIDENCE.

## 2. Binding interpretation (plan.md D3 — verdicts, not backlog)

- **REJECTED_\*** (63 ledger rows → 52 `RJ-nn` register entries) = **negative requirements**. Never backlog,
  never "phase 2". Every future spec inherits them as MUST-NOT-EXIST assertions (see
  `rejected-legacy-behaviour-contract.md`). Reintroducing a rejected behavior is a review failure.
- **INTENTIONALLY_IMPROVED** (57 ledger rows) + the 63 `B-x.y` preservation findings = **preservation laws**.
  Never copy-back toward the legacy; regressing one fails the review
  (`current-product-improvement-preservation-contract.md`).
- **UNKNOWN_EVIDENCE** (28 allocated rows / 47 `UK-nn` entries) = **no-invention holds**. Only NEW evidence — a
  fresh capture, a backend answer, a user decision — may resolve one; inference never does
  (`unknown-evidence-no-invention-contract.md`). The row keeps its existing owner while unresolved.
- **FUTURE_BACKEND** (40 allocated rows) = **honest-gate holds**. The owning spec builds the honest surface; the
  execution waits for a real backend. Faking it is a REJECTED_NO_FAKE violation, not progress.
- **HONEST_LOCK** (5 rows) = **ONE physical lock**. C03-14 · C06-13 · C07-23 · C08-08 · C09-23 are the same
  `classSalaryReport` lock seen from five clusters. The physical/navigation lock count is exactly **1**; Spec 057
  verifies its persistence (`disabled` + `nav.reason.finance` + route-less). No document may re-read this as
  "five locks".

## 3. The one-primary-owner invariant

Per `future-spec-allocation-register.md` §1: **every non-complete capability row has exactly one primary owning
spec** among 043–057. Secondary dependencies are informational pointers in a separate column — **never
co-owners**. Divergent audit owners were reconciled to one owner with the resolution documented (§3 of the
register). A gap with two owners is a gap that ships; a gap with zero owners is a STOP.

## 4. The 227 allocation is the single source of ownership truth

The register allocates all **227** non-complete rows (96 PARTIAL + 58 MISSING + 40 FUTURE_BACKEND +
28 UNKNOWN_EVIDENCE + 5 HONEST_LOCK). The other **153** rows are not gaps: 17 COMPLETE_AND_VERIFIED ·
16 COMPLETE_BUT_VISUAL_REVIEW_REQUIRED (routed to page-group review dimensions, not allocated) ·
57 INTENTIONALLY_IMPROVED · 63 REJECTED_\* (20 PRIVACY + 19 PAY_FREE + 13 SECURITY + 11 NO_FAKE). 153+227=380 ✓.

Per-spec totals (register §19 — cite, never recount informally):

| 043 | 044 | 045 | 046 | 047 | 048 | 049 | 050 | 051 | 052 | 053 | 054 | 055 | 056 | 057 | Σ |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 17 | 24 | 8 | 4 | 8 | 7 | 7 | 7 | 2 | 0 | 17 | 5 | 33 | 82 | 6 | **227** |

044 additionally owns the 30 pre-existing `f-fbAdd-*` duplicate ids (a baseline carry-forward defect, not a
cluster row — register §5 preamble, `protected-test-carryover.md` §5). 052's zero is explicit and correct
(`plan.md` D6): a greenfield charter, not an omission.

## 5. Re-allocation rule

No row moves to a different owner without a **declared supersession of the allocation register**: the moving
spec must name the row, the old owner, the new owner, the evidence, and re-prove the §19 arithmetic (Σ = 227,
every row exactly one owner). Silent re-assignment — including "helpfully fixing" a neighbor spec's row while
implementing your own — is a scope violation. Dispositions may only change on new evidence, recorded the same
way; a disposition word outside §1's set is invalid anywhere.
