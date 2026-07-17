# Contract 14 — Downstream Preservation Handoff (044–056) — executable

The 043 foundation is implemented + tested by 043's own implement phase in Wave 0. Downstream specs **consume the
already-implemented foundation, preserve its guards, and add page-local coverage for their own new/changed
surfaces only**. No downstream spec is the primary implementation owner of a 043 closure; none may weaken or
replace a 043 test.

| Spec | Consumes (already implemented in Wave 0) | Duty (its own, at its Gate 3) |
|---|---|---|
| **044** | — | Owns modal/drawer/long-form **host quality** only; may improve the `st-perm`/`trn-policy` drawer interaction/design — **never** the privacy CONTENT (the parent-contact rows, the teacher policy rows) |
| **045** | teacher policy preview + anti-poaching guards | preserve G1/G2/teacher-policy census; add page-local coverage when it redesigns teacher pages; teacher pay-free (PAY28) byte-verbatim |
| **046** | family isolation guard | preserve G4/famPay; add page-local for redesigned family surfaces |
| **047** | the **already-removed** child password gate (MUT-3 green) | **PRESERVE** — may not reintroduce the gate; add page-local for session-lifecycle surfaces. NOT the owner of the child-view correction |
| **048** | the **already-implemented** parent-contact registry (MUT-6 green) + no-secret guards | **PRESERVE** — add page-local for settings/staff surfaces. NOT the owner of the registry |
| **049** | cert group-delivery + no-PII-in-URL guards | preserve G12/G13; add page-local for certificate surfaces |
| **050** | DST-column-absent + honest-wording guards | preserve G14 + the DST census |
| **051** | the `can_chat` capability model + safe audiences | audience-scoping asserts; transport gated (053) |
| **052** | audience-scoping | no client-side ranking |
| **053** | structure-only secrets + private cert delivery + connection-health privacy | structure-only census; CH-1…CH-9 |
| **054** | role/session/time-scoped room links + presence-of-minors | join claims no availability without a real room |
| **055** | audit-actor scoping + must obey N-1…N-7 | observed propagation; never authors a real actor identity |
| **056** | the omit/structure-only field families + the 5 parent-contact permissions | sensitive/pay/secret fields stay omitted or structure-only |

## The binding statement

A dependent protected-data page reaches Gate 3 when BOTH hold: (a) the applicable 043 foundation is **already
implemented and green** (043's Wave-0 duty), and (b) the page proves **its own** new/changed surface complies
with page-local tests. A ratified rule is Gate 1; the implemented foundation is what makes Gate 3 reachable; the
page's own compliance is the page's Gate-3 duty. 043's real authorization stays FUTURE_BACKEND.
