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
