# Cross-Spec Handoff Register — Spec 043

The Gate-3 obligations 043 imposes on every consuming spec (045–056) + the FUTURE_BACKEND handoffs, per
`contracts/future-spec-dependency-contract.md` §6 (three-gate model).

**CORRECTION (2026-07-17) — the foundation is implemented by 043 itself.** 043 is a **Wave-0 foundation** whose
frontend-enforceable protections (child-view correction, parent-contact registry, global privacy guards,
teacher-capability policy, existing-safe freeze) are **implemented and tested by Spec 043's OWN implement phase**,
green **before** any dependent spec begins Gate-3 integration. A dependent protected-data page therefore reaches
Gate 3 on a **two-part** condition: (a) the applicable **043 foundation is already implemented and green** (043's
duty, done in Wave 0 — never the dependent page's) **and** (b) the page has proven, with **its own page-local
tests**, that **its new/changed surface complies** (the dependent page's duty). The "Gate-3 obligation" column
below is condition (b) — the downstream page's own duty; the 043 guards it names are the **inherited, already-
implemented** foundation the page must **preserve**, not implement. No downstream spec is the primary
implementation owner of a 043 closure; none may weaken or replace a 043 test; each supplies an explicit
non-applicability proof where it does not exercise a 043 capability. 043's own real *authorization* stays
`FUTURE_BACKEND`.

## What each consumer inherits from 043

| Spec | Consumes from 043 (already implemented in Wave 0) | Gate-3 obligation (the consumer's OWN page-local duty) |
|---|---|---|
| **045** Teacher portal + teacher admin | anti-poaching contract (AP-1…AP-11); matrix TE column (DENY for contact/locality/lead/pay); teacher-unreachable parent-contact grants; the teacher-capability policy preview (FR-008a) | preserves the teacher-contact census (G1) + no-country-column + no-Left/Acquired guards; adds page-local coverage for any teacher surface it redesigns; teacher pay-free (PAY28) byte-verbatim |
| **046** Family portal + family admin | family zero-pay; cross-family isolation (DF-4); matrix GF column | preserves the family-isolation census (G4) + famPay; adds page-local coverage for redesigned family surfaces; only fam1 on guardian-facing pages |
| **047** Child-view + session lifecycle | the **already-implemented** child-view correction (CB-1…CB-7; the G-03 gate removed by 043 with MUT-3 green) | **PRESERVES** the child-view correction (may not reintroduce the password gate; the MUT-3-equivalent stays green; family/teacher profile 3-gate asserts UNTOUCHED); adds page-local coverage for the session-lifecycle surfaces it redesigns. **047 is NOT the owner of the child-view correction.** |
| **048** Admin back-office + settings | no-secret / structure-only (SR-1…SR-13); shared-OTP refusal; the **already-implemented** RBAC preview with deny-by-default parent-contact rows (G-01, MUT-6 green in 043) | **PRESERVES** the structure-only + no-secret + deny-by-default guards; adds page-local coverage for settings/staff surfaces it redesigns. **048 is NOT the owner of the parent-contact registry.** |
| **049** Reports / courses / content | certificate-delivery privacy (CD-1…CD-7); the **already-implemented** no-group-delivery (G12) + no-PII-in-URL (G13) guards | preserves the G12 cert-delivery + G13 query-string guards; adds page-local coverage for any certificate surface it redesigns |
| **050** Control center / utilities / hub | DST affected-accounts admin-only (PR-7); lead-contact admin-only (AP-4/C03-13); the **already-implemented** honest-wording guard (G14) | preserves the DST-column-absent + wording (G14) guards; adds page-local coverage for the DST/leads surfaces it redesigns |
| **051** Community / moderation | the `can_chat` capability model; safe audiences (N-5/N-7); the MQTT-transport refusal (RJ-32/N-6) | a chat surface merges only with audience-scoping asserts + gate honesty; transport may stay gated (053) |
| **052** Recognition / leaderboards | audience-scoping (guardian-facing, never a ranking); privacy-safe recognition | merges only if no client-side ranking + audience-scope asserts hold |
| **053** Integrations Command Center | structure-only secrets (SR-1/SR-6); private per-guardian certificate delivery (CD-3/CD-4); connection-health privacy (CH-1…CH-9) | Configure surfaces merge only on structure-only (0 value slots, 0 `type=password`) + gate honesty; connection-health obeys CH-1…CH-9 |
| **054** Virtual classroom / rooms | role/session/time-scoped room links (PR-4…PR-6); presence-of-minors + recording visibility (PR-1/PR-3/UE-5); join stays gated until a real room exists | a join/room surface merges only when it claims no availability without a real propagated room, and copy-link is admin/assigned-teacher only |
| **055** Cross-role propagation | audit-actor-identity scoping (PR-2 — never a real staff name in a fixture); DST propagation (PR-7); must obey N-1…N-7 | a propagated leg merges only when it obeys the NEVER-PROPAGATE refusals and never authors a real actor identity |
| **056** Forms & data-capture audit | the omit/structure-only field families (pay/secret/privacy stay omitted or structure-only); the 5 parent-contact permissions | a form is complete only when sensitive/pay/secret fields stay omitted or structure-only per 043's classification |

## FUTURE_BACKEND handoffs (post-057, real backend)

- Authentication + session lifecycle (C15-02; `academatic_session` must ship `Secure`, RJ-33).
- Real RBAC enforcement + per-member grants + field-level authorization (C09-19, C12-01/-02, PC-1…PC-5).
- Password change/reset (C12-09, teacher pattern).
- Impersonation with audit (C12-19).
- Bot protection / reCAPTCHA (C15-03).
- Secret storage (S-04; 053 configures, backend persists).
- Secure room-link authorization (P-22); delivery authorization (P-15); consent (certificate opt-in).
- Tenant / family row-level isolation (RJ-21).
- Direct-route denial / real per-role route enforcement (C01-27, C03-13, C15-18).

Each is honestly gated until the backend exists; no frontend behaviour claims any of them works.

## The binding gate statement (corrected 2026-07-17)

> A ratified 043 rule is a Gate-1 deliverable. The 043 **frontend foundation is implemented and tested by Spec
> 043 itself in Wave 0** — that is what makes any dependent Gate 3 reachable (a ratified privacy rule ≠ an
> implemented foundation ≠ an obeying page). A dependent page handling protected data then merges only when
> **both** hold: (a) the applicable 043 foundation is **already implemented and green** (043's own duty, not the
> page's), and (b) the page has proven **its own** new/changed surface complies with page-local tests. A
> downstream spec is never the primary owner of a 043 closure and may never weaken or replace a 043 test. 043's
> own real *authorization* stays FUTURE_BACKEND (frontend fixtures/surfaces obey the visibility law NOW; the
> backend enforces it later). (`contracts/future-spec-dependency-contract.md` §6.2.)
