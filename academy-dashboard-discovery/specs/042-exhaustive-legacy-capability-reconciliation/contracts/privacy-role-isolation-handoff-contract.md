# Contract 6 — Privacy / Role Isolation Handoff to Spec 043 (BINDING transitively on all specs)

**Canonical sources (cite by path + stable ID; never restate):**
`../privacy-and-sensitive-data-findings.md` (S-01…S-08 · P-01…P-09 · A-01/A-02 · I-01…I-06 · G-01…G-03 ·
U-01…U-03 · §6 direct-fetch check · §7 RBAC posture · §10 handoff) · `../rejected-legacy-behaviour-register.md`
§B/§C · `../cross-role-propagation-map.md` §5 N-1…N-7, P-20/P-21 · `../plan.md` **D9** (this contract's charter).

**Grounding (reopened AS IMAGES for this contract — the two WhatsApp-insights legacy captures named by P-01/P-02,
paths from `../cluster-evidence-paths/C09-paths.md`):**
- `output/roles/admin/screenshots/management-settings-integrations-whatsapp-families-insights-full.png` — SEEN:
  a plain admin table "Names of Null groups — Check out which families are not connected to whatsapp" printing a
  real guardian name + real e-mail (`abdo ahmed / abod11@gmail.com`) with unmasked phone `01154859653`, and a
  second row with a named child persona and unmasked phone `441200480244`, both chipped "Active".
- `output/roles/admin/screenshots/management-settings-integrations-whatsapp-teachers-insights-full.png` — SEEN:
  a real teacher name (`المعلم محمد صادق صادق`), username `msadeqx9`, unmasked phone `201278910727`, and a **live
  clickable `https://chat.whatsapp.com/HNeGQ2J7HDzJAHmLKyIcIK?…` group-invite URL** rendered as a table cell.
These pixels are why P-01/P-02/RJ-11 are marked **NEVER**: Spec 040 excluded both pages; any future
connection-health view is counts + masked identifiers only.

## 1. The role-visibility rules 043 must ratify (binding on every spec that touches a role surface)
1. **A teacher never sees guardian/student contact data, private e-mails, or sensitive guardian data**
   (anti-poaching). Rows: A-01 (Left/Acquired Students attribution), A-02 (Country column on the teacher roster),
   RJ-19, RJ-22 (lead contact visibility), privacy §7 (`Show Parent Phone`/`Show Parent Email` grantable-to-all).
2. **The student/child-view never receives adult/admin data** — and never an account affordance the child does
   not have (G-03 child-view password gate → remove; Spec 021 role model: legacy has NO student login).
3. **Unrelated families are isolated** — no cross-family data baked into a single-family surface (privacy §6,
   RJ-21); role isolation is a routing convention today and 043 makes it an invariant (C01 redirect evidence).
4. **Hiding a link is NOT authorization.** Direct-fetch denial requires a backend → FUTURE_BACKEND; until then
   every ungoverned entitlement is honestly gated, never faked (privacy §6; P-20 `can_chat`/`can_see_library`/
   `can_edit_schedule`/`can_edit_class` have zero representation today — an authz model, not a form).
5. **Integration secrets never render.** The Spec-040 structure-only rows STAND (S-04, RJ-26, I-05); no value
   slot, no `type=password`, ever — persistence is server-side (053).
6. **Meeting links are role-, session- and time-scoped** — the legacy room URL is a guessable
   `base64(id)/role` path; authorization must be server-side (U-02, P-22 security constraint) → consumed by 054.
7. **Community/leaderboard visibility is audience-scoped** — guardian-facing, never a ranking; the guardian's
   `teacher_rating` routes through privacy-safe recognition (P-09/P-11 → 051/052 consume; plan.md D6).

## 2. Row → 043 requirement-class map (by ID; the findings document is the source of truth)
| Rows | 043 requirement class |
|---|---|
| S-01…S-08 | Credential/auth/transport refusals ratified as security requirements (no rendered secret · no cleartext password · no shared OTP · no unaudited impersonation/reset · no ported MQTT transport · session cookies Secure+SameSite per RJ-33 · link-safety allowlist per S-08) |
| P-01…P-09 | PII refusals ratified as data-visibility requirements (masked-only connection health · no roster dumps · no minor's record in a shared group or a query string · authored personas only) |
| G-01…G-03 | OUR product's policy gaps = 043 deliverables: parent phone/e-mail as DENY-by-default RBAC rows (G-01, §7); the RBAC-is-a-promise statement (G-02 — rules ratified by 043, **enforcement backend**); the child-view password gate removal (G-03) |
| U-01…U-03 | Unresolved visibility decisions 043 must scope BEFORE any owner builds (staff-category semantics · who may copy a room link · presence/audit exposure) — no-invention per contract 11 (UK-25/UK-08→U-02/UK-26) |
| I-01…I-06 | Already-closed leaks = preservation rows (contract 9); 043 restates them as standing refusals, never re-opens them |
| A-01/A-02 | Anti-poaching class: attribution/locality signals may exist ADMIN-ONLY at most, never teacher-visible (RJ-19 re-proposal rule) |

## 3. Scope discipline
- **RBAC = rules ratified by 043; enforcement = backend** (G-02, P-21). 043 ships policy + honest UI truth, not a
  fake permission engine; named-roles vs per-member-grants stays an open 043 decision (UK-43).
- The §10 handoff items (a)–(g) are 043's minimum charter — inherited verbatim from the findings document.
- The N-1…N-7 NEVER-PROPAGATE rows (contract 8 §4) and RJ §B/§C rows (contract 10) bind 043's own design space:
  043 may narrow, never widen, a refusal.
- Every 043 rule that later gets a UI must arrive with its falsifying check (contract 13).
