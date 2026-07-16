# Frontend-Now vs Future-Backend — Spec 043

The explicit split the directive mandates. **No frontend behaviour may claim column B exists.** Column A is what
043 ratifies AND what the rendered surfaces already obey (the artifact dependent pages need for their Gate-3
merge, `quickstart.md` B1). Column B is honestly gated now and enforced only when a real backend exists
(`contracts/future-spec-dependency-contract.md` §6.2).

## A. Frontend-enforceable NOW (ratified + the surface obeys)

| A# | Requirement | How it is enforced today | Owned rows / findings |
|---|---|---|---|
| A-1 | Omit protected data from fixtures and DOM (guardian/student contact, locality, lead contact on teacher surfaces; cross-family data on guardian surfaces) | grep = 0 on `teacher-*`/`family-portal-*` bodies + fixtures; DENY = data absence | C02-06, C04-22, anti-poaching AP-1…AP-4/AP-9 |
| A-2 | Remove unsafe child-view affordances (the password-change gate) | direct the removal of `passwordChange` from `STUDENT_PAGES.profile.gates` (`portal.js:323`); declared supersession at `smoke:1971`/`:2082` | C12-09, G-03 |
| A-3 | Deny-by-default authored permission states (the 5 parent-contact permissions) | new preview rows ship `granted:false`, teacher-unreachable | C12-13, G-01 |
| A-4 | Structure-only secret rows (24 provider fields, no value slot) | `settings.js:78-86` `structRow`; already true, frozen | C09-19-adjacent, S-04/RJ-26 |
| A-5 | Masked admin-only previews where justified (reception contact, presence status) | MASKED cells in the matrix; DENY where no value is due | matrix cells 6/10/11 |
| A-6 | Role-specific route/link inventories (no cross-role links) | existing M-8 shell-markup guard + a new no-admin-link census on portal pages | C01-27, C03-13, C15-18 |
| A-7 | Honest backend-required wording (no claim of enforcement) | the `backendRequired` vocabulary (74 occurrences); 0 hits for `authorized`/`logged in` | all FB rows |
| A-8 | Absence assertions + mutation tests for each new guarantee | `protected-test-and-mutation-register.md` (≥10 mutations) | all |

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
