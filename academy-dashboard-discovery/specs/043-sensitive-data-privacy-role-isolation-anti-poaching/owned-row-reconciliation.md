# Owned-Row Reconciliation — Spec 043 (exactly 17 primary rows)

**Source of ownership**: `../042-exhaustive-legacy-capability-reconciliation/future-spec-allocation-register.md`
§4 (17 rows, 9 backend-prerequisite). Each row below carries: the Spec-042 disposition · the frontend-now vs
future-backend split · where the requirement lands in 043's artifacts · the destination for any implementation.
Cited by capId + path; never restated. `FB` = FUTURE_BACKEND (honest gate now, real enforcement later).

## The 17 owned rows

| # | capId | Capability (short) | 042 disposition | Frontend-NOW (043 ratifies + the surface obeys) | FUTURE_BACKEND | 043 artifact home |
|---|---|---|---|---|---|---|
| 1 | **C01-27** | Role isolation as an explicit invariant (legacy 3 redirect proofs; today routing convention) | FUTURE_BACKEND | The direct-fetch guarantee: no page bakes sensitive data the requester should not receive; no cross-role links | real login + per-role route enforcement | `direct-fetch-and-role-boundary-contract.md` |
| 2 | **C02-04** | Per-teacher capabilities (`can_chat`/`can_see_library`/`can_edit_schedule`/`can_edit_class`) | MISSING | Ratify the capability model (academic vs communication vs privacy-sensitive vs enforcement); none grants parent contact | the 4 toggles as a real authz gate | `rbac-and-capability-model-decision-register.md` |
| 3 | **C02-05** | Per-teacher notification matrix (4×2, incl. the `salary_*` row) | MISSING | Communication capability; the `salary_*` row stays EXCLUDED from teacher view (pay-free) | channel delivery (053) + real prefs | `rbac-and-capability-model-decision-register.md` · `anti-poaching-contract.md` |
| 4 | **C02-06** | Left/Acquired Students attribution tables (anti-poaching signal) | MISSING | **DENY on every teacher surface, forever**; admin-only only with a proven operational purpose (default: exclude) | — | `anti-poaching-contract.md` (A-01) |
| 5 | **C03-13** | Teacher→admin role isolation (legacy redirect proof) | FUTURE_BACKEND | No teacher-facing route to admin surfaces; teacher bodies bake no admin data | real route authorization | `direct-fetch-and-role-boundary-contract.md` |
| 6 | **C04-22** | WhatsApp families insights board (null-group check) | MISSING | Refuse the PII table; if a connection-health view is ever built = counts + masked identifiers only, admin-only, no live invite URL | the integration itself (053) | `privacy-safe-connection-health.md` (RJ-11/N-4) |
| 7 | **C09-19** | RBAC enforcement (FO-16) — *no page-level evidence; nearest = C12 matrix* | FUTURE_BACKEND | The display-only RBAC preview is a promise; wording never claims enforcement | real RBAC engine | `rbac-and-capability-model-decision-register.md` (G-02) |
| 8 | **C12-01** | Per-member permission matrix editing UI (170 checkboxes, 17 groups) | PARTIAL | Ratify the model (named roles + per-member exceptions); the parent-contact rows exist as deny-by-default preview | interactive editing + persistence (044 host + backend) | `rbac-and-capability-model-decision-register.md` · `parent-contact-default-deny-contract.md` |
| 9 | **C12-02** | RBAC enforcement (grants actually gating; per-member vs named-role decision) | FUTURE_BACKEND | The model decision is made (named roles + per-member exceptions, backend-enforced) | enforcement engine | `rbac-and-capability-model-decision-register.md` (OQ-1) |
| 10 | **C12-09** | Portal change-password (old/new/confirm; real `type=password` in legacy) | FUTURE_BACKEND | 0 `type=password` authored; portal password changes are honest gates; **child-view gate removed** (G-03) | real password change (teacher/guardian pattern) | `child-view-account-boundary.md` · `credentials-secrets-and-auth-refusal-register.md` |
| 11 | **C12-13** | PII-visibility grants (`Show Parent Phone`/`Show Parent Email`) — no successor concept | MISSING | The 5 parent-contact permissions, DENY-by-default, teacher-unreachable; close G-01 | real field-level authorization | `parent-contact-default-deny-contract.md` |
| 12 | **C12-19** | Login-as / impersonation (zero C12 evidence) | UNKNOWN_EVIDENCE | Retained UNKNOWN; any affordance is dropped or an honest gate — never fake; impersonation is ungovernable (no permission) | impersonation-with-audit | `unknown-evidence-and-stop-register.md` (UK-20) · `credentials-secrets-and-auth-refusal-register.md` |
| 13 | **C14-09** | DST "Affected Accounts" per-zone live aggregate | FUTURE_BACKEND | A cross-account count is admin-only; the column stays absent today (guardian/teacher get their own change, 055) | the live per-zone count | `presence-audit-and-room-link-visibility.md` (P-23) |
| 14 | **C15-01** | Legacy login/register/reset/public UI (never captured) | UNKNOWN_EVIDENCE | Retained UNKNOWN; no login UI invented; only the security requirements + honest boundary | re-crawl or design fresh + real auth | `unknown-evidence-and-stop-register.md` (UK-01) |
| 15 | **C15-02** | Real authentication + session lifecycle (3 role logins, guards, remember-me, cookies) | FUTURE_BACKEND | No auth claimed to exist; the demo state is stated honestly; `academatic_session` must ship `Secure` when built | the real auth backend | `credentials-secrets-and-auth-refusal-register.md` (RJ-33) |
| 16 | **C15-03** | Login bot protection (reCAPTCHA) | FUTURE_BACKEND | Recorded as a backend prerequisite; not simulated | reCAPTCHA / bot protection | `credentials-secrets-and-auth-refusal-register.md` |
| 17 | **C15-18** | Role isolation & route authorization (presentational only) | FUTURE_BACKEND | "Hiding a link is not authorization"; the frontend guarantee is data-absence | real route authorization | `direct-fetch-and-role-boundary-contract.md` |

**Disposition tally (17 rows)**: **9 FUTURE_BACKEND** (C01-27, C03-13, C09-19, C12-02, C12-09, C14-09, C15-02,
C15-03, C15-18 — the exact "9 backend-prereq" of register §4/§19) · **5 MISSING** (C02-04, C02-05, C02-06,
C04-22, C12-13) · **1 PARTIAL** (C12-01) · **2 UNKNOWN_EVIDENCE** (C12-19, C15-01). 9 + 5 + 1 + 2 = 17 ✓.
Full disposition list per row above; the 9 backend-prerequisite rows = C01-27, C03-13, C09-19, C12-02, C12-09,
C14-09, C15-02, C15-03, C15-18.

## Implementation-ownership table (canonical — corrected 2026-07-17)

Every one of the 17 owned rows appears **exactly once**. This removes the circular defect: no MISSING/PARTIAL
row is closed by assigning it to a dependent spec — each has ONE of three explicit dispositions: **(1)** a
Spec-043 frontend implementation; **(2)** an already-safe baseline + a Spec-043-owned executable guard; or
**(3)** a frontend policy registry implemented by 043 + backend enforcement gated. Columns: **row** ·
**Spec-043 frontend implementation** (its own implement phase) · **Spec-043 test** · **Spec-043 mutation** ·
**downstream preservation/additive duty** · **future-backend enforcement** · **Gate-3 condition**.

| Row | Spec-043 frontend implementation | Spec-043 test | Spec-043 mutation | Downstream duty | Future-backend | Gate-3 condition | Disposition |
|---|---|---|---|---|---|---|---|
| **C01-27** | (2) already-safe: no-admin-link census + data-absence on portal pages | G6 no-admin-link | MUT-9 | 045–050 preserve; add page-local for new surfaces | real per-role route enforcement | dependent page preserves G6 + proves its own compliance | FB |
| **C02-04** | (3) structure-only teacher-capability policy preview on existing teacher admin host (FR-008a) | teacher-policy census (0 enforcement claim/pay/contact) | teacher-policy mutation | 045 preserves; 051 consumes `can_chat`; 053 delivery | real capability authz | 045 preserves the policy preview | MISSING |
| **C02-05** | (3) notification-channel rows inside the same policy preview; `salary_*` EXCLUDED | teacher-policy census (0 pay token) | same mutation | 053 delivers channels | real delivery | preserved by 045; delivery 053 | MISSING |
| **C02-06** | (2) already-safe: no Left/Acquired, no country column on teacher surfaces | G1 teacher-contact + no-Left/Acquired | MUT-1 | 045 preserves | admin-only attribution needs proven purpose (excluded) | 045 preserves G1 | MISSING |
| **C03-13** | (2) already-safe: portal→no-admin-link; teacher bodies bake no admin data | G6 | MUT-9 | 045–050 preserve | real route authorization | preserve G6 | FB |
| **C04-22** | (2) already-safe: no WhatsApp-insights PII/URL; connection-health = contract only, no route | G8 sitewide real-PII | MUT-4 | 053 (if built) obeys CH-1…CH-9 | the integration itself (053) | 053 obeys CH contract | MISSING |
| **C09-19** | (2) display-only RBAC preview + honest "not enforced" wording (G-02) | G14 wording | MUT-10 | 048 preserves | real RBAC engine | preserve G-02 wording | FB |
| **C12-01** | (3) parent-contact registry rows added to the existing RBAC preview; model ratified | G3/G11 deny-by-default | MUT-6 | 048 preserves; 044 host quality only | interactive editing + persistence | 048 preserves the registry | PARTIAL |
| **C12-02** | (2) model decision recorded (named roles + per-member); preview enforces nothing (honest) | G14 | MUT-10 | 048 preserves | enforcement engine | preserve honest wording | FB |
| **C12-09** | (1) **remove child-view password gate** (student-profile only) | G5 supersession (`plannedBackend 3→2`) | MUT-3 | 047 PRESERVES (never reintroduce) | real password change (teacher/guardian pattern) | 047 preserves the correction | FB |
| **C12-13** | (1) the 5 parent-contact permissions, deny-by-default, teacher-unreachable | G3/G11 + teacher-unreachable | MUT-2 + MUT-6 | 048 preserves; 056 field audit | field-level authorization | 048 preserves | MISSING |
| **C12-19** | (2) retained UNKNOWN; any login-as affordance dropped/honest-gated | (no fake impersonation assert) | — (covered by no-fake) | none add impersonation | impersonation-with-audit | no fake surface | UNKNOWN |
| **C14-09** | (2) already-safe: DST table has no Affected-Accounts column | DST-column-absent census | (part of freeze) | 050/055 preserve; 055 propagates own change | live per-zone count | preserve column-absent | FB |
| **C15-01** | (2) retained UNKNOWN; no login UI invented; honest boundary only | (no-fake-login assert) | — | none invent a login UI | re-crawl/design + real auth | no invented login | UNKNOWN |
| **C15-02** | (2) no auth claimed; demo state stated honestly | G14 wording | MUT-10 | none claim auth | the real auth backend (Secure cookie) | preserve honest wording | FB |
| **C15-03** | (2) recorded as prerequisite; not simulated | (no-fake wording) | MUT-10 | none simulate reCAPTCHA | reCAPTCHA / bot protection | not simulated | FB |
| **C15-18** | (2) already-safe: data-absence guarantee; no-admin-link census | G6 | MUT-9 | 045–050 preserve | real route authorization | preserve G6 | FB |

**Coverage check**: 17 rows, each once. Dispositions: **2× (1) direct 043 frontend implementation** (C12-09
child-view, C12-13 parent-contact registry — C12-01 shares the registry as PARTIAL) · **13× (2) already-safe +
043-owned guard** · **2× (3) 043 policy registry + backend enforcement gated** (C02-04, C02-05; C12-01/C12-13
also carry a (3) registry facet). **No row is closed by assigning it to a dependent spec.** Every downstream
column reads "preserve" / "add page-local" — never "implement the 043 foundation."

## Foreign rows NOT absorbed (scope discipline — `contracts/future-spec-dependency-contract.md`)

Spec 043 touches evidence that also feeds other owners. It **does not absorb** any of the following — each is
named here so no reviewer can claim silent absorption:

- **C02-07/-10 (end-class / edit-class forms)** → 044/056 (043 only rules the `can_edit_class` GATE, not the form).
- **C02-11/-13 (monthly report / own-profile forms)** → 056 (043 only rules the password portion via C12-09).
- **C04-12 (family capability toggles)** → 055 (043 rules the grant model; the toggle surface is 055/056).
- **C04-06/-08…-14 (family billing/adjustments/lifecycle)** → 046/048/056 (043 touches none — zero-pay is 046's).
- **C10-16/-18/-20 (certificate producer/issue/delivery)** → 055/056/053 (043 rules ONLY the delivery-privacy
  contract: no group delivery, no PII in URLs — `certificate-delivery-privacy.md`).
- **C11-05/-08/-11 · C02-15 (chat surfaces/transport)** → 051/054 (043 rules the `can_chat` gate + the
  refusal of the MQTT transport/topic model; it builds no chat).
- **C01-15 · C02-31 · C03-08 (room lifecycle)** → 054 (043 rules ONLY who may see presence/copy a room link).
- **C09-15/-22/-25/-26 · C07-15/-16 (provider connections/secrets)** → 053 (043 rules ONLY structure-only +
  no-secret; it builds no integration).
- **C03-06 (student analytics charts) · C08-09 (computed ranking)** → 047 / 052 (refused-by-law, not 043 rows).
- **C14-10/-19 (cross-role DST propagation) · C04-10/C14-20 (audit timeline propagation)** → 055 (043 rules the
  actor-identity/count visibility; propagation is 055).
- **All 6 five-cluster HONEST_LOCK rows (`classSalaryReport`)** → 057 (untouched).

## Cross-cluster consistency note (C09-19)

`C09-19` and `C12-02`/`C12-01` both describe "RBAC enforcement / matrix". Per the Spec-042 owner-resolution rule
(register §3), each has exactly one primary owner and all three land on 043. C09-19's disposition table cites
only "§5 Owners (FO-16)" (no page record) — its real evidence is the C12 permission matrix
(`management-admins-permission-6/7`). Recorded as a cross-cluster evidence gap in the C09 audit, not a missing
file (all 75 owned-row evidence paths exist on disk). No divergence: all three are `FUTURE_BACKEND`/`PARTIAL`
resolving to "the model is ratified by 043, the enforcement is backend."
