# Specification Quality Checklist: Sensitive Data Privacy, Role Isolation & Anti-Poaching

**Purpose**: validate specification completeness and quality before `/speckit.plan`
**Created**: 2026-07-17
**Feature**: [spec.md](../spec.md)

## Content Quality

- [x] No implementation details (languages, frameworks, APIs) — the spec ratifies rules + gates; it names no
      framework and builds no engine
- [x] Focused on user value and business needs (anti-poaching, minor safety, privacy)
- [x] Written for non-technical stakeholders (the product rule + role stories lead)
- [x] All mandatory sections completed

## Requirement Completeness

- [x] No [NEEDS CLARIFICATION] markers remain (0 — all open questions resolved to safe defaults, OQ-1…OQ-7)
- [x] Requirements are testable and unambiguous (each FR maps to a matrix cell / contract + a guard)
- [x] Success criteria are measurable (SC-001…SC-008: 0 ambiguous cells, 17/17 rows, ≥10 mutations, counts held)
- [x] Success criteria are technology-agnostic (data-absence, role visibility, count invariants)
- [x] All acceptance scenarios are defined (6 prioritized stories, role-by-role)
- [x] Edge cases are identified (masking-insufficient, connection-health, UNKNOWN surfaces, direct-fetch admin)
- [x] Scope is clearly bounded (17 owned rows; explicit exclusions; foreign-row non-absorption)
- [x] Dependencies and assumptions identified (consumes 042; consumed by 045–056; FUTURE_BACKEND)

## Feature Readiness

- [x] All functional requirements have clear acceptance criteria (FR-001…FR-018 → contracts + guards)
- [x] User scenarios cover primary flows (teacher anti-poaching, child-view, secrets, direct-fetch, RBAC, certs)
- [x] Feature meets measurable outcomes in Success Criteria
- [x] No implementation details leak into specification

## Notes

- Items marked incomplete require spec updates before `/speckit.plan`. All items pass.

---

# Adversarial Specification Review Checklist (30 points — directive-mandated)

Run by a **non-author Opus reviewer**. FAIL findings must be corrected and re-reviewed; do not report PASS from
an interrupted or failed reviewer. Result recorded at the bottom.

1. [ ] Exactly 17 owned rows reconciled (`owned-row-reconciliation.md`)
2. [ ] No foreign row silently absorbed (foreign-row non-absorption list present)
3. [ ] Every owned row has a disposition and destination
4. [ ] Targeted screenshots genuinely opened (pixel descriptions in `targeted-visual-grounding.md`)
5. [ ] Raw JSON/HTML read for fields and workflows (capability taxonomy, permission vocabulary, room URLs)
6. [ ] Honest grounding counts reported
7. [ ] Role matrix has no ambiguous cells (every cell one of six; every CONDITIONAL_BACKEND names a permission + default)
8. [ ] Teacher anti-poaching law is absolute (AP-1…AP-11; no exception to AP-1…AP-4/AP-8)
9. [ ] Parent-contact grants are deny-by-default (PC-1…PC-5)
10. [ ] Teacher can never receive parent-contact grants (structurally unreachable, not just default-off)
11. [ ] Family and child isolation are explicit (DF-4, CB-5, cross-family census)
12. [ ] Direct-fetch limitation is honest ("hiding a link is not authorization"; data-absence guarantee)
13. [ ] No fake frontend authorization (no-fake-authorization clause; MUT-10)
14. [ ] Child password gate removal specified (CB-2 + declared supersession, student-profile only)
15. [ ] Secrets are structure-only (SR-1…SR-13; 24 rows, no value slot)
16. [ ] Certificate group delivery rejected (CD-1/CD-2; MUT-7)
17. [ ] No PII in URLs (CD-5; G13 query-string census)
18. [ ] Presence/audit/link audiences decided or kept UNKNOWN (PR-1…PR-7; UE-5)
19. [ ] Login UI not invented (UE-1; FR-018)
20. [ ] All applicable RJ rows are negative requirements (RJ-11/13/19/21/22/26/30/33/36/38 + others)
21. [ ] Preservation rows are protected (I-01…I-06, B-4.*; re-assert post-change)
22. [ ] Frontend-now / backend-later matrix is complete (A-1…A-8 / B-1…B-14)
23. [ ] No new page/count/menu change (115/57/50/24-25-1; 0 new bases; no Privacy Center)
24. [ ] Protected tests remain untouched (0 weakened; only the G5 declared supersession, 2 lines)
25. [ ] Every new guarantee has a falsifying mutation (MUT-1…MUT-10; ≥10)
26. [ ] Downstream Gates 045–056 are explicit (`cross-spec-handoff-register.md`)
27. [ ] No Ponytail simplification weakened scope (Ponytail lite; no evidenced requirement removed/narrowed)
28. [ ] No application source/test/public/package file changed (specify writes only artifacts + feature.json)
29. [ ] No commit/push/merge occurred
30. [ ] No plan/tasks/implementation generated

## Adversarial review result

Reviewed by an independent, non-author Opus reviewer (2026-07-17), cross-checked against the Spec-042 corpus and
spot-verified against the live repo (git state, 115 HTML, 57 PAGES, `FUTURE_ROUTES {}`, `structRow`,
`portal.js:323`, teacher `gPass` gate).

- **Verdict: PASS** — all 30 adversarial points hold against primary sources. 0 blocking failures.
- FAIL findings: **none**.
- Non-blocking findings corrected before `/speckit.plan`:
  - **B-1** (grounding tally): `PERM_GROUPS` was stated as "10 groups / 24 rows / 20 granted" — corrected to the
    verified **10 groups / 22 rows / 18 granted / 4 not-granted** (`node` eval of `staff-management.js`) in
    `current-rendered-data-exposure-inventory.md`, `parent-contact-default-deny-contract.md`,
    `targeted-visual-grounding.md`. (The substantive G-01 claim — no parent-contact row — was already correct;
    the provider structure-only "24 rows" is a different, correct figure.)
  - **B-2** (matrix precision): matrix notes 12/14/17 now name an explicit permission + default
    (`view audit actor identity`, `join own scheduled room`, `Show Salaries Page`/`Show Teacher Rate`/`Show
    Student Rate`), and the SC-001 note list is corrected to the actual CONDITIONAL_BACKEND notes (5, 6, 12, 13,
    14, 17).
  - **B-3** (cosmetic tally): the `owned-row-reconciliation.md` disposition tally rewritten cleanly
    (9 FB + 5 MISSING + 1 PARTIAL + 2 UNKNOWN = 17).
- Reviewer confirmed: no login field set / staff-category model / impersonation surface / recording player
  invented; no UNKNOWN resolved by inference; no RJ/NEVER re-proposed; no internal contradiction; git state =
  only `.specify/feature.json` (M) + the untracked 043 dir; HEAD `ce33a7c`; no commit; no plan/tasks/impl.

---

# Dependency/Ownership Correction Pass (2026-07-17)

A Gate-3 circular-ownership defect was found after the specify report: several artifacts assigned Spec-043
frontend closures (child-view removal, parent-contact registry, global guards) to dependent Specs 044/045/047/048.
Since 045–050 may not merge until the applicable 043 protection is implemented, deferring that implementation TO
those specs is circular. Corrected so Spec 043's OWN implement phase (Wave 0) owns and tests the frontend
foundation before any dependent spec's Gate 3.

## Correction-review checklist (non-author Opus)

1. [ ] Spec 043 is an implementable Wave-0 foundation
2. [ ] No 043 frontend closure depends on 045–050 implementation
3. [ ] Child password removal owned by 043, not 047 (047 preserves)
4. [ ] Parent-contact registry/rows owned by 043
5. [ ] MUT-2, MUT-3, MUT-6 owned by 043
6. [ ] Global privacy guards implemented by 043
7. [ ] Downstream specs only preserve/extend page-local compliance
8. [ ] 044 host ownership does not swallow 043 privacy content
9. [ ] C02-04/C02-05 have actual frontend-now outcomes (FR-008a policy preview)
10. [ ] All 17 rows have one implementation disposition (ownership table)
11. [ ] FUTURE_BACKEND remains honest
12. [ ] No route/page/count change (115/57/50/24-25-1)
13. [ ] No application code changed during this correction
14. [ ] No plan/tasks generated
15. [ ] No commit/push/merge
16. [ ] Grep of all 043 files finds no residual live circular-ownership statement

## Correction result

- **Verdict: PASS** — non-author Opus adversarial correction review, all 16 checks pass, 0 blocking failures
  (2026-07-17). Confirmed: circular defect fully removed; Spec 043's own implement phase (Wave 0) owns +
  executes MUT-2/MUT-3/MUT-6, the G1–G14 global guards, and the FR-008a teacher-capability policy preview, green
  before any dependent spec's Gate 3; downstream = preserve/extend page-local only; no residual live circular
  wording; no new route/page/count/dependency/component; counts 115/57/50/24-25-1 held; HEAD `9694527`
  unchanged; no commit; no plan/tasks/impl.
- Files corrected (11): `spec.md`, `frontend-now-vs-future-backend.md`, `owned-row-reconciliation.md` (+ownership
  table), `child-view-account-boundary.md`, `parent-contact-default-deny-contract.md`,
  `rbac-and-capability-model-decision-register.md` (+C02-04/05 deliverable), `protected-test-and-mutation-register.md`,
  `cross-spec-handoff-register.md`, `count-route-and-impact-contract.md`, `current-rendered-data-exposure-inventory.md`.
- Circular statements removed/superseded: the "rides 047 at its Gate-3", "owned by the RBAC-surface implementer",
  "implemented by the owning later specs (045/047)", "closes G-01/G-03 at the specification level", and the
  "later specs at their Gate-3 merge — 043 writes zero application bytes" framings — all reframed to
  Spec-043-owned Wave-0 implementation with downstream preserve/extend duties.

## Post-review tally correction (2026-07-17) — transparent audit note

The 16/16 adversarial correction review above (preserved verbatim as historical audit evidence — **not**
rewritten) **missed a prose/table tally mismatch** in `owned-row-reconciliation.md`. Full transparency:

- The **canonical implementation-ownership table was correct** all along: 17 rows, 0 missing / 0 unexpected /
  0 duplicate, Class (1) = 2 · Class (2) = 12 · Class (3) = 3.
- Only its **"Coverage check" PROSE was wrong** — it read "2× (1) · 13× (2) · 2× (3)", grouping `C12-01` under
  Class (1)'s parenthetical instead of its canonical Class (3).
- **Corrected tally: 2 / 12 / 3.** Class membership pinned by exact capId in the corrected prose so it cannot
  drift again:
  - Class (1) — direct 043 frontend implementation (2): `C12-09`, `C12-13`.
  - Class (2) — already-safe baseline + 043-owned guard (12): `C01-27`, `C02-06`, `C03-13`, `C04-22`, `C09-19`,
    `C12-02`, `C12-19`, `C14-09`, `C15-01`, `C15-02`, `C15-03`, `C15-18`.
  - Class (3) — 043 policy registry/preview + backend-gated (3): `C02-04`, `C02-05`, `C12-01`.
  - `C12-01` shares the parent-contact registry surface with `C12-13` but stays Class (3) — shared
    implementation never reclassifies/omits/double-counts.
- **No substantive ownership decision changed.** Only the prose tally was corrected; all 17 table rows are
  byte-verbatim.
- **A new focused verification PASSED**: a mechanical parser over the 17 table rows re-derived
  17 rows · 0 missing · 0 unexpected · 0 duplicate · Class (1)=2 · Class (2)=12 · Class (3)=3 · total 17; and a
  residual grep for `13× (2)` / `2× (3)` / `2/13/2` prose found no LIVE claim (only the labelled
  superseded→corrected note). The dependency correction (child-view owned by 043 · parent-contact registry owned
  by 043 · G1–G14 + MUT-2/MUT-3/MUT-6 owned+executed by 043 · C02-04/05 policy-preview outcome · downstream
  preserve/extend only · FUTURE_BACKEND honest) remains intact.
- Files changed in this pass (2 only, as scoped): `owned-row-reconciliation.md`, `checklists/requirements.md`.

---

# Plan-phase adversarial review (2026-07-17)

Independent non-author Opus reviewer, 20-point check, live-repo verified.

- **Verdict: PASS** — all 20 checks pass, 0 blocking failures. Confirmed: ownership parses 17-unique/2-12-3;
  043 owns all 5 Wave-0 outcomes in its own implement phase; child removal student-profile-only (family
  `smoke:2007`/`:2083` + teacher `:2020`/`:2084` neighbours hold value 3, byte-verbatim); parent-contact registry
  5-rows-DENY on the existing staff RBAC host (`staff.js` 0-diff, `permDrawer:42-52` maps `PERM_GROUPS`); teacher
  policy structure-only, `salary_*` excluded, `i18n.js` 0-diff (`trn.*` already registered); every line-number
  claim spot-checked live (portal.js:323/380, staff.js:42-52, teacher.js:131-137, smoke 748/1287/1971/2608/2007/
  2020/2082/2083/2084, a11y:393, capture:555); counts 115/57/50/24-25-1 held; 6-body impact measurable; only
  `M CLAUDE.md` (marker) + untracked plan artifacts; HEAD `cd56aa0`; no commit; no tasks/impl.
- **4 non-blocking defects — 3 corrected in the plan, 1 accepted:**
  - **B-1 (corrected)**: G13's query-string mutation was described inline but not registered in the canonical
    mutation table (the "task never run" risk). → Registered as **MUT-11** in `contracts/mutation-protocol-plan.md`
    (now 12 mutations MUT-1…MUT-11 + MUT-TP), `global-privacy-guards-plan.md` G13 row, `data-model.md`, and
    `plan.md` outcome-D.
  - **B-2 (corrected)**: G14's `signed in`/`logged in` token would false-positive against the live activity-log
    value `en.adm.js login:'signed in'` (rendered in `staff.html`). → G14 rescoped to **gate/authz context only**
    with the activity-log value explicitly excluded (`global-privacy-guards-plan.md` G14, `backend-honesty-contract.md`).
  - **B-3 (accepted, documented)**: `student-profile.js:2`'s "three gates" comment becomes stale after the
    removal but the file stays 0-diff — noted as a harmless comment carry with an optional comment-only exception
    (`contracts/child-view-account-boundary-plan.md`).
  - **B-4 (no action)**: the specify register cited `capture.cjs:556` for R-3; the plan cites the correct `:555`
    (`if (withErrors > 0)`) — the plan is more correct; the stale specify number needs no plan change.
- Reviewer explicitly cleared: no forbidden 0-diff file edited; the policy previews are structure-only display
  rows (not incomplete forms); no real PII / `type=password` / value slot / pay token introduced; no mutation
  "complete from inspection"; no internal plan/contract contradiction.
