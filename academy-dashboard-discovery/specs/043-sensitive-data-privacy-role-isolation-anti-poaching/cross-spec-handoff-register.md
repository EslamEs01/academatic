# Cross-Spec Handoff Register — Spec 043

The Gate-3 obligations 043 imposes on every consuming spec (045–056) + the FUTURE_BACKEND handoffs, per
`contracts/future-spec-dependency-contract.md` §6 (three-gate model). 043 is a **Wave-0 foundation**: its rules
are ratified at Gate 1, but a dependent protected-data page **merges only after the applicable 043 frontend
protection is implemented and verified on that rendered surface** — ratification alone never authorizes a merge
(§4a Gate 3). 043's own enforcement stays `FUTURE_BACKEND`.

## What each consumer inherits from 043

| Spec | Consumes from 043 | Gate-3 obligation |
|---|---|---|
| **045** Teacher portal + teacher admin | anti-poaching contract (AP-1…AP-11); matrix TE column (DENY for contact/locality/lead/pay); teacher-unreachable parent-contact grants | a teacher surface merges only when the teacher-contact census (G1) + no-country-column + no-Left/Acquired asserts are green; teacher pay-free (PAY28) byte-verbatim |
| **046** Family portal + family admin | family zero-pay; cross-family isolation (DF-4); matrix GF column | a family surface merges only when the family-isolation census (G4) + famPay are green; only fam1 on guardian-facing pages |
| **047** Child-view + session lifecycle | child-view account boundary (CB-1…CB-7); the G-03 gate removal + declared supersession | the child-view merges only when MUT-3 is green (`student-profile: plannedBackend===2`); family/teacher profile 3-gate asserts UNTOUCHED |
| **048** Admin back-office + settings | no-secret / structure-only (SR-1…SR-13); shared-OTP refusal; the RBAC preview (deny-by-default parent-contact rows, G-01) | a settings/staff surface merges only when the structure-only + no-secret + deny-by-default (G11/MUT-6) asserts are green |
| **049** Reports / courses / content | certificate-delivery privacy (CD-1…CD-7); no PII in URLs (G13) | a certificate surface merges only when the cert-delivery census (G12) + query-string census (G13) are green |
| **050** Control center / utilities / hub | DST affected-accounts admin-only (PR-7); lead-contact admin-only (AP-4/C03-13); honest wording (G14) | a DST/leads surface merges only when the DST-column-absent + wording (G14/MUT-10) asserts hold |
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

## The binding gate statement

> A ratified 043 rule is a Gate-1 deliverable. A page handling protected data does not MERGE until the
> applicable 043 frontend protection is **implemented and verified** on that rendered surface — a ratified
> privacy rule ≠ an obeying page. 043's own real authorization stays FUTURE_BACKEND (frontend fixtures/surfaces
> obey the visibility law NOW; the backend enforces it later). (`contracts/future-spec-dependency-contract.md`
> §6.2.)
