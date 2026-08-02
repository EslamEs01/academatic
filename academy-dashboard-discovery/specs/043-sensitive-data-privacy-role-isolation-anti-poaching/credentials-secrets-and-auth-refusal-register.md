# Credentials, Secrets & Auth-Refusal Register — Spec 043

Owns C12-09, C12-19, C15-02, C15-03 + the security refusals S-01…S-08 and RJ-23…RJ-37 that touch owned evidence.
Every row is a **negative requirement** (`contracts/rejected-legacy-behaviour-contract.md`) or a
**FUTURE_BACKEND** prerequisite. The current app is already clean on every renderable item
(`current-rendered-data-exposure-inventory.md`); 043 freezes the posture and names the guards.

## Standing security refusals (SR-1 … SR-13)

| ID | Refusal | Legacy evidence | Current state | Guard |
|---|---|---|---|---|
| **SR-1** | 0 rendered stored secrets | S-04 (15 plaintext provider inputs, saved keys as columns) | 24 structure-only rows, no value slot (`settings.js:78-86`) | no-secret census (g32, `smoke:1404`); structure-only census |
| **SR-2** | 0 credential values | S-01 (Zoom creds), S-04 | 0 authored secret/credential | grep = 0 |
| **SR-3** | 0 raw PAN | S-01 (`paymob_bank_card_number`) | 0 | no-secret census; a PAN-digit census (net-new option, G10) |
| **SR-4** | 0 `type=password` | S-01/S-02/S-03/S-04 | 0 across 115 pages | `g32.pw===0` unconditional (`smoke:1404-1413`); MUT-5 |
| **SR-5** | No saved-key table columns | S-04 (Client Secret / Key 1 / Key 2 printed as columns) | none | structure-only census |
| **SR-6** | Integration configuration stays structure-only | S-04, RJ-26 | `structRow`, 24 rows | frozen |
| **SR-7** | No shared OTP destination | S-07/RJ-30 (one `otp` for ALL admins) | `settings.js:265-270` renders 2FA as a structure row + gate; **`otp` deliberately not rendered** (G-02 confirmed) | Spec-032 MUST-OMIT (2FA-otp) |
| **SR-8** | No plaintext password / reset UI | S-02 (admin `type=text` password), S-03, S-06 | 0 password inputs; admin has no account form (topbar Account = noop, `enhance.js:39`) | SR-4 guard; MUT-5 |
| **SR-9** | No unaudited impersonation | S-06/RJ-31 + C12-19 (ungovernable — no matching permission) | honest disabled gates (`trn.reason.loginAs`); family side not built; 0 impersonation surface | no-fake; the login-as affordance is dropped or gated, never fake |
| **SR-10** | No free-form external shortcut URL | S-08/RJ-36 (`shortcut_link` open-redirect) | shortcuts not built; honest toast | if ever built → **in-app route allowlist only**, never a free URL (056 + 043 link-safety) |
| **SR-11** | Provider environment never defaults to Live | RJ-27 (PayPal → Live) | PayPal/Payoneer default Sandbox | Spec-040 asserts (preservation) |
| **SR-12** | No enabled/connected state without a real verified connection | RJ-28 (11 cards `is_enabled` ON) | «غير مُعدّ», no enable control | fake-connected census (0 "Connected") |
| **SR-13** | No copied legacy PII / live invite URL in any credential/insights surface | S-04, RJ-11 | I-01 = 0 hits | sitewide real-PII census |

## FUTURE_BACKEND security prerequisites (never simulated)

| ID | Prerequisite | Owned row | Refusal that holds until it exists |
|---|---|---|---|
| **FB-SEC-1** | Real authentication + session lifecycle | C15-02 | RJ-50 (no fake login form / fake session state) |
| **FB-SEC-2** | Session cookie must ship `Secure` (+ SameSite) | C15-02, RJ-33/C15-05 | the legacy `academatic_session secure:false` (Agent B, structure-only) must NOT be replicated |
| **FB-SEC-3** | Password change / reset (old/new/confirm, `type=password`) | C12-09 | 0 `type=password` authored; portal password changes are honest gates; the SAFE teacher pattern (old/new/confirm) is the target, never the admin `type=text` defect (RJ-23) |
| **FB-SEC-4** | Impersonation WITH audit | C12-19 | SR-9; impersonation is ungovernable today (no permission) — dropped or gated, never fake reset/login success (RJ-31) |
| **FB-SEC-5** | Bot protection (reCAPTCHA) | C15-03 | recorded; not simulated |
| **FB-SEC-6** | Secret storage (server-side) | C09-19-adjacent | SR-1/SR-6; persistence is server-side (053) |
| **FB-SEC-7** | Live auth tokens must be rotated/expunged before repo sharing | RJ-34/C15-19 | no token value is quoted anywhere; treated as secrets |

## The no-fake-authorization clause (binding)

No frontend behaviour may claim any FB-SEC item exists. No "signed in", no "authorized", no "verified", no fake
reset-password success, no fake login-as. The honest vocabulary is «يُتاح بعد ربط الخادم» / "available once the
server is connected" (74 occurrences; 0 `authorized`/`logged in` hits). MUT-10 (turn honest wording into a fake
authorization claim) → the wording census fails.

## Enumerated applicable RJ / S rows

RJ-11, RJ-23, RJ-24 (Zoom/PAN — teacher secrets), RJ-25, RJ-26, RJ-27, RJ-28, RJ-29 (backup no-confirm),
RJ-30, RJ-31, RJ-32 (MQTT transport → 043 authz + 054), RJ-33, RJ-34, RJ-36, RJ-37; S-01…S-08. Full text +
guards in `preservation-and-rejected-behaviour-register.md`.
