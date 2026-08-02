# Frontend-Now vs Future-Backend — Spec 043

The explicit split the directive mandates. **No frontend behaviour may claim column B exists.** **CORRECTION
(2026-07-17): Column A is the SPEC-043-OWNED FRONTEND FOUNDATION — implemented and tested by Spec 043's OWN
implement phase (Wave 0), before any dependent spec reaches Gate 3.** "Already obeyed at baseline" does not mean
"no implementation" — the implementation of an already-safe requirement IS its executable guard + falsifying
mutation, owned and executed by Spec 043. Column B is honestly gated now and enforced only when a real backend
exists (`contracts/future-spec-dependency-contract.md` §6.2). Per-row implementation ownership:
`owned-row-reconciliation.md` §"Implementation-ownership table".

## A. Frontend-enforceable NOW — implemented + tested by Spec 043 itself (Wave 0)

| A# | Requirement | Spec-043-owned implementation (its own implement phase) | Owned rows / findings |
|---|---|---|---|
| A-1 | Omit protected data from fixtures and DOM (guardian/student contact, locality, lead contact on teacher surfaces; cross-family data on guardian surfaces) | already true at baseline → 043 ships the executable guards (G1/G2/G4) + MUT-1/MUT-8; grep = 0, DENY = data absence | C02-06, C04-22, anti-poaching AP-1…AP-4/AP-9 |
| A-2 | Remove unsafe child-view affordances (the password-change gate) | **043 removes** `passwordChange` from `STUDENT_PAGES.profile.gates` (`portal.js`), student-profile only; declared supersession at `smoke:1971`/`:2082`; **MUT-3** RED→GREEN | C12-09, G-03 |
| A-3 | Deny-by-default parent-contact permission states (the 5 permissions) | **043 adds** the deny-by-default rows to the existing RBAC preview fixture/host; teacher-unreachable; **MUT-2 + MUT-6** | C12-13, G-01 |
| A-3b | Teacher-capability + notification structure-only policy preview (FR-008a) | **043 renders** a structure-only policy preview on the existing teacher admin host (academic/communication split; `salary_*` excluded; no guardian contact; no enforcement/delivery claim) + its census guard + mutation | C02-04, C02-05 |
| A-4 | Structure-only secret rows (24 provider fields, no value slot) | already true → 043 ships/keeps the executable guard (`settings.js:78-86` `structRow`; SR-1…SR-13) + MUT-5 | C09-19-adjacent, S-04/RJ-26 |
| A-5 | Masked admin-only previews where justified (reception contact, presence status) | MASKED cells in the matrix; DENY where no value is due; guards preserve the current absence | matrix cells 6/10/11 |
| A-6 | Role-specific route/link inventories (no cross-role links) | already true → 043 ships the no-admin-link census (G6) alongside the existing M-8 guard + MUT-9 | C01-27, C03-13, C15-18 |
| A-7 | Honest backend-required wording (no claim of enforcement) | already true → 043 ships the wording census (G14) + MUT-10; 0 hits for `authorized`/`logged in` | all FB rows |
| A-8 | Absence assertions + mutation tests for each new guarantee | **043 owns and executes** the ≥10 mutations (`protected-test-and-mutation-register.md`); green before downstream integration | all |

## B. FUTURE_BACKEND (honestly gated now; never claimed to exist)

| B# | Requirement | Why it cannot be frontend-enforced | Owned rows |
|---|---|---|---|
| B-1 | Authentication (3 role logins, shared `/login`, guards, remember-me) | no server; a fake login form is REJECTED (RJ-50) | C15-01, C15-02 |
| B-2 | Session lifecycle (`academatic_session` must ship `Secure` when built — legacy shipped `secure:false`) | no session layer exists | C15-02, RJ-33 |
| B-3 | Direct-route denial (real per-role route enforcement) | static pages are world-readable; "hiding a link is not authorization" | C01-27, C03-13, C15-18 |
| B-4 | Real RBAC (grants actually gating features) | display-only preview enforces nothing (G-02) | C09-19, C12-02 |
| B-5 | Per-member grants (named roles + per-member exceptions) | no grant engine | C12-01, C12-02 |
| B-6 | Field-level authorization (the 5 parent-contact permissions actually enforced) | no field-level authz | C12-13 |
| B-7 | Secret storage (provider keys / SMTP / payout credentials) | secrets persist server-side only | C09-19-adjacent, S-04 |
| B-8 | Password change / reset (old/new/confirm) | no auth backend; 0 `type=password` authored | C12-09 |
| B-9 | Impersonation with audit (`login-as`) | ungovernable (no matching permission); refused until real auth + audit | C12-19, S-06/RJ-31 |
| B-10 | Consent (guardian opt-in for certificate delivery / communication) | no consent store | C10-20-adjacent, PC-4 |
| B-11 | Rate limiting / bot protection (reCAPTCHA) | no server | C15-03 |
| B-12 | Secure room-link authorization (role/session/time-scoped) | room URL is guessable; authz must be server-side | C12(room), U-02/P-22 |
| B-13 | Delivery authorization (private per-guardian certificate/notification delivery) | transport is 053-owned | C04-22-adjacent, P-15 |
| B-14 | Tenant / family row-level isolation | no auth to key rows by tenant/family | C01-27, RJ-21 |

## The bright line

- Everything in A is a **specification deliverable of 043** that the current app already obeys or that a later
  spec must implement + verify before merging a protected-data page (Gate 3).
- Everything in B is a **backend prerequisite**. Its frontend surface is an honest gate whose copy says the
  capability arrives once the server is connected — never that authorization/authentication/enforcement already
  works. A single wording drift into "authorized"/"verified"/"signed in" is a STOP condition (MUT-10).
- 9 of the 17 owned rows are in column B (backend-prerequisite): C01-27, C03-13, C09-19, C12-02, C12-09,
  C14-09, C15-02, C15-03, C15-18. The other 8 have a frontend-now deliverable (a ratified rule + an obeying
  surface + a guard).
