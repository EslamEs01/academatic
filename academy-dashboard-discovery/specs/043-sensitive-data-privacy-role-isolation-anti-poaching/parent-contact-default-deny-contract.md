# Parent-Contact Default-Deny Contract — Spec 043

Closes G-01 (`privacy-and-sensitive-data-findings.md` §8): our staff RBAC (`PERM_GROUPS`,
`fixtures/staff-management.js:34-45`, 10 groups / 22 rows) has **no parent-contact row at all** — the single most important
privacy control in the legacy 170-list is unrepresented. This contract defines the five explicit, separate
parent-contact permissions, their defaults, and who can never receive them. **Enforcement is FUTURE_BACKEND**;
the frontend renders these as deny-by-default preview rows and claims no enforcement (G-02).

## Grounding — the exact legacy vocabulary

The legacy 170-permission matrix (`management-admins-permission-6.html`, Agent B extraction) contains exactly
**two** named PII-gating permissions, both in the `families` group:

- `value="parent-phone"` → **Show Parent Phone**
- `value="parent-email"` → **Show Parent Email**

There is **no** per-teacher/per-student contact toggle. Both were grantable to any member, and both captured
members had them granted (170/170, RJ-37). 043 replaces "grantable to everyone, default on" with "deny by
default, teacher-unreachable, backend-enforced."

## The five parent-contact permissions

| ID | Permission | Default | Legacy anchor | Frontend representation (NOW) | Enforcement (FUTURE) |
|---|---|---|---|---|---|
| **PC-1** | view guardian phone | **DENY** | `parent-phone` / Show Parent Phone | a deny-by-default preview row in the RBAC surface; no phone value is baked for a role without it | backend field-level authz |
| **PC-2** | view guardian e-mail | **DENY** | `parent-email` / Show Parent Email | deny-by-default preview row | backend field-level authz |
| **PC-3** | export guardian contacts | **DENY** | legacy `Phone Export Invoices` adjacency | no contact-export affordance exists on any non-admin surface | backend export authz + audit |
| **PC-4** | use guardian contact for approved communication | **DENY** | the approved-communication use-case (reception/advisor, OQ-3) | a purpose-scoped MASKED view for RA only; TE never | backend consent + purpose scoping |
| **PC-5** | reveal full value from a masked admin view | **DENY** | the "reveal" action on a masked field | the masked→full reveal is a gate; the full value is not in the DOM until the backend authorizes | backend reveal authz + audit |

## The default rules (binding)

1. **DENY by default.** Every one of PC-1…PC-5 defaults DENY. A new fixture row for these permissions ships
   `granted: false` (MUT-6 flips one to true → the deny-by-default assert fails).
2. **Never "all granted".** No preset, no role template, no "manager gets everything" default may set any of
   PC-1…PC-5 to true. The legacy's 170/170-all-granted posture (RJ-37) is refused.
3. **Teachers can never receive PC-1…PC-5.** Not merely defaulted off — **structurally unavailable** to any
   teacher role and to any teacher-visible surface. A teacher role's grant set does not include these rows at
   all (MUT-2: adding a parent-phone grant to a teacher fixture → the teacher-unreachable assert fails).
4. **Family / student roles can never receive cross-family grants.** A guardian sees only their own family's
   contact (which they already possess); no grant exposes another family's contact to a guardian or child.
5. **The frontend describes the policy; it does not claim enforcement.** The RBAC preview copy states that
   enforcement is a backend responsibility (G-02). No wording claims a grant is currently enforced (MUT-10
   target: turning honest wording into a fake authorization claim → the wording assert fails).

## RBAC model decision (resolves OQ-1 / UK-43)

The legacy has **no named roles** — only per-member flat grant lists (`permisions[]` keyed by `userID`,
Agent B confirmed no `role`/`role_id`/`template` field). 043 does **not** copy that. **Decision: named roles +
explicit per-member exceptions, backend-required enforcement** (safe default, unambiguous). The frontend RBAC
preview may show a named-role enum (the current `STAFF_ROLES`, an app-side convention) plus, for the
parent-contact rows specifically, a deny-by-default posture. A real RBAC (backend) resolves named-role grants +
per-member overrides. This decision is recorded in `rbac-and-capability-model-decision-register.md` OQ-1 and is
NOT left ambiguous.

## Where this lands in the fixtures (Spec-043-OWNED implementation — corrected 2026-07-17)

**Spec 043 OWNS this — its own implement phase, not Spec 044 and not a later admin-surface spec.** The five
parent-contact permission rows (headlined by PC-1 view guardian phone, PC-2 view guardian e-mail — the legacy
`parent-phone`/`parent-email` vocabulary) are added to the **existing** staff RBAC preview fixture
(`fixtures/staff-management.js` `PERM_GROUPS`) as deny-by-default rows, closing G-01, and rendered through the
**existing** display-only preview host (`staff.js` `permDrawer`) — **reuse the existing RBAC preview; do not wait
for Spec 044 to invent a new modal or host.** Spec 044 owns shared interaction-host *quality*, never the privacy
permission *content*. **MUT-2 (grant to a teacher) + MUT-6 (default true) are owned and executed by Spec 043**,
RED→GREEN, residue 0. The current `/speckit.specify` phase writes 0 application bytes; the fixture + preview
render + the two mutations are delivered by **Spec 043's own plan/tasks/implement** in Wave 0, before any
dependent spec reaches Gate 3 (`spec.md` §Mandatory Spec-043-owned implementation outcomes #2). This is a
structure-only registry on an existing host — **no new fake permission engine**, no new component, no new page.

## No-fake clause

The RBAC preview is a promise the backend must keep (G-02). It is display-only; "staff member X cannot see a
guardian's phone" is representable but not enforced on any surface today. That is correct for a fixtures-only
frontend — and it MUST be stated plainly, never dressed as a working permission engine
(`preservation-and-rejected-behaviour-register.md`).
