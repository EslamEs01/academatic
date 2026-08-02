# Preservation & Rejected-Behaviour Register — Spec 043

Two lists 043 inherits and re-asserts: **preservation** (I-/B- rows — MUST-PRESERVE; regression = review
failure, `contracts/current-product-improvement-preservation-contract.md`) and **rejected** (RJ-/S-/P- rows —
negative requirements; MUST-NOT-EXIST, `contracts/rejected-legacy-behaviour-contract.md`). Cited by ID; never
restated in full. Rows marked **NEVER** may not be re-proposed by any spec.

## A. Preservation rows (MUST-PRESERVE — re-assert post-change)

| ID | Improvement | Current proof | 043 guard |
|---|---|---|---|
| **I-01** | 0 real PII sitewide (12 crawl tokens) | grep `src/`+`public/` = 0 | sitewide real-PII census (broaden the settings-only one) |
| **I-02** | 0 external hosts (only `www.w3.org` ×114) | link-safety census | preserved |
| **I-03** | 0 `type=password`, 0 `type=file` across 115 pages | g32 (`smoke:1404`) | preserved (MUT-5) |
| **I-04** | Teacher surfaces carry no guardian contact; family portal zero-pay | `teacher-students.js`; family placeholders | AP-1…AP-4; PAY28; famPay |
| **I-05** | Provider sensitive block is structure-only; PayPal defaults Sandbox | `settings-management.js:452-511` | SR-1/SR-6/SR-11 |
| **I-06** | Lead/staff/family contact uses synthetic placeholders | `leads.js:51-52`; `en.fam.js:183-190` | preserved (I-01 census) |
| **B-4.\*** | The anti-poaching family (teacher pay-free, no guardian contact, no computed rating) | preservation register §3 watchlist #4 | `anti-poaching-contract.md` |
| **B-2.\*** | No secrets (structure-only rows, Sandbox defaults, no enable-on-empty) | watchlist #2 | `credentials-secrets-and-auth-refusal-register.md` |
| **B-1.\*** | No fake success (gates stay backendRequired; the working time-converter is never gated) | watchlist #3 | no-fake law |
| **P-3** (visual) | No PII in the chrome (fixture persona, initials avatar, 0 external requests) | visual audit §2 P-3 | I-01/I-02 |

**Also preserved (standing laws, `protected-test-carryover.md` §4)**: teacher pay-free GLOBAL (PAY28,
word-boundaried — never "improve" the regex); family zero-pay; student child-view (no student login); finance
no-fake-money; no-secret; no-fake; no computed score/chart; zero `href="#"`; the sole `classSalaryReport` lock;
counts/routes/orphan set. All are re-asserted post any 043-directed change; a regression fails review.

## B. Rejected rows (negative requirements — enumerated by ID)

**Directive-mandated minimum, all present:** RJ-11, RJ-13, RJ-19, RJ-21, RJ-22, RJ-26, RJ-30, RJ-33, RJ-36,
RJ-38 — plus all other privacy/security RJ rows reached through owned evidence:

| RJ | Refusal (short) | Marked | 043 guard |
|---|---|---|---|
| **RJ-11** | WhatsApp insights PII + live invite URL | NEVER | sitewide real-PII census; `privacy-safe-connection-health.md` (MUT-4) |
| **RJ-12** | Live invite URL + raw phone + Hour Rate on teacher card | NEVER | I-01; PAY28 |
| **RJ-13** | Crawl-operator PII in the chrome (name/e-mail/ui-avatars) | NEVER | no-external-request; I-01/I-02 |
| **RJ-14** | Real student/parent/teacher PII throughout corpus | NEVER | I-01 |
| **RJ-15** | Whole-tenant roster dump in filter selects | — | authored personas only |
| **RJ-16** | Real staff names in ad audience selects | NEVER | I-01 |
| **RJ-17** | Certificate "Send group" (named minor to shared group) | NEVER | `certificate-delivery-privacy.md` CD-1/CD-2 (MUT-7) |
| **RJ-18** | Certificate preview URL with minor data in query string | NEVER | CD-5 (MUT — query-string census, G13) |
| **RJ-19** | Left/Acquired attribution + Country on teacher roster | (admin-only conditional) | `anti-poaching-contract.md` AP-3/AP-5/AP-11 |
| **RJ-20** | Staff-performance table rendered to the teacher role | NEVER | matrix cell 8 TE=DENY; N-5 |
| **RJ-21** | Family cross-child picker + admin real-name triple | — | DF-4; matrix cross-family |
| **RJ-22** | Raw lead contact with no masking / no role check | — | matrix cell 9; AP-4; C03-13 |
| **RJ-23** | Admin password as `type=text`, no old-password/confirm | NEVER | SR-4/SR-8; FB-SEC-3 |
| **RJ-24** | Teacher Zoom creds + raw PAN | NEVER (secrets) | SR-1/SR-3 |
| **RJ-25** | Family login credentials + send_info | NEVER (fields) | SR-8 |
| **RJ-26** | Plaintext provider secrets / saved-key columns | NEVER (value slot) | SR-1/SR-5/SR-6 |
| **RJ-27** | PayPal defaulting Live | NEVER | SR-11 |
| **RJ-28** | 11 cards `is_enabled` ON with nothing configured | NEVER | SR-12 |
| **RJ-29** | No-confirm real DB backup + fake success + silent redirect | NEVER | no-fake; honest gate |
| **RJ-30** | Shared OTP destination for all admins | NEVER | SR-7 |
| **RJ-31** | Login-as impersonation + one-click reset | NEVER (without auth+audit) | SR-9; FB-SEC-4 |
| **RJ-32** | Chat MQTT transport (ws://, public broker, no ACL) | NEVER | 043 authz model + 054 transport (never port) |
| **RJ-33** | Session cookie `secure:false` | NEVER (replicate) | FB-SEC-2 |
| **RJ-34** | Live auth tokens committed in repo | (rotate/expunge) | FB-SEC-7; no token value quoted |
| **RJ-36** | Free-form `shortcut_link` URL (open-redirect) | — | SR-10 (in-app allowlist only) |
| **RJ-37** | Default-all-granted RBAC; parent phone/e-mail grantable-to-all | NEVER (all-granted default) | `parent-contact-default-deny-contract.md` (MUT-6) |
| **RJ-38** | Fake success toasts / optimistic UI | NEVER | no-fake; MUT-10 wording |
| **RJ-50** | Fake login form / fake session state | NEVER | UE-1; the hub «بدون تسجيل دخول» |

## C. NEVER-PROPAGATE rows (`cross-role-propagation-map.md` §5) 043 binds

N-2 (certificate to shared group), N-3 (preview URL with minor data), N-4 (WhatsApp insights PII/invite URL),
N-5 (staff-performance table to teacher), N-6 (MQTT transport), N-7 (child schedule broadcast to a teacher
category). N-1 (teacher pay across the graph) is the pay-free intersection. 043 may narrow, never widen, a
refusal (`contracts/privacy-role-isolation-handoff-contract.md` §3).

## D. Interpretation guards

- A REJECTED_* row is **never "missing functionality"** — no ledger/dashboard may count RJ rows as gaps or TODO.
- REJECTED_NO_FAKE ≠ permission to fake later behind a nicer UI; FUTURE_BACKEND paths stay honestly gated.
- **0 RJ re-proposals** across all 043 artifacts (the specify-phase adversarial review verified this for the
  042 corpus; 043 keeps the count at 0). A re-proposed RJ behaviour in any 043 artifact = review failure.
- Every preservation row is re-asserted post-change; regression = review failure. "The legacy had it" is never
  an argument to restore a refused/improved-away behaviour.
