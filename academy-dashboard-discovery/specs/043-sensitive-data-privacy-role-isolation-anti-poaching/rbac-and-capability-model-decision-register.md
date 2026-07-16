# RBAC & Capability-Model Decision Register — Spec 043

Owns C12-01, C12-02, C09-19 (RBAC model + enforcement decision) and C02-04 (teacher capability model). Records
every mandated decision explicitly — no "based on permissions" without a named permission and default. Grounded
in the 170-permission matrix (Agent B: 17 groups, `parent-phone`/`parent-email` the only PII gates, no named
roles — per-member flat grants, UK-43).

## 1. RBAC model decision (C12-01 / C12-02 / UK-43 → OQ-1)

**Decision: named roles + explicit per-member exceptions, backend-required enforcement.** (Safe default,
unambiguous.)

- The legacy has **no named roles** — only per-member flat `permisions[]` lists keyed by `userID` (Agent B: no
  `role`/`role_id`/`template` field). 043 does not copy that flat model.
- The frontend RBAC preview MAY show a named-role enum (the current `STAFF_ROLES` = manager/accountant/
  supervisor/support, an app-side convention) as a display device, PLUS deny-by-default parent-contact rows.
- A real RBAC (backend) resolves **named-role grants + per-member overrides**. Enforcement is `FUTURE_BACKEND`
  (C12-02, C09-19, G-02). The preview is a promise the backend must keep, stated plainly — never a working
  engine.
- **This decision is not left ambiguous** (directive §Mandatory Decisions 3). Named-roles-vs-per-member-vs-hybrid
  is resolved to **hybrid = named roles + per-member exceptions**.

## 2. Teacher capability model decision (C02-04 → FR-008)

The four legacy teacher capabilities (`can_chat`, `can_see_library`, `can_edit_schedule`, `can_edit_class`) +
the notification-channel preferences, separated into four kinds:

| Capability | Kind | 043 ruling | Enforcement |
|---|---|---|---|
| `can_see_library` | **academic** | governs the teacher library shelf visibility | FUTURE_BACKEND (P-20: 0 of 4 controls exist today) |
| `can_edit_schedule` | **academic** | governs teacher schedule editing | FUTURE_BACKEND |
| `can_edit_class` | **academic** | governs teacher class editing (the C02-10 edit form GATE) | FUTURE_BACKEND |
| `can_chat` | **communication** | governs the teacher chat surface (051 consumes) | FUTURE_BACKEND |
| notification channels (course/class/reminder) | **communication** | per-teacher channel prefs (053 delivers) | FUTURE_BACKEND |
| `salary_*` notification row | **privacy-sensitive / pay** | **EXCLUDED from teacher view** — never surfaced on a teacher surface (pay-free) | n/a (refused) |
| parent-contact (PC-1…PC-5) | **privacy-sensitive** | a SEPARATE class; **teacher-unreachable** (AP-8) | FUTURE_BACKEND field-level authz |

**Rules**: (a) no capability toggle may imply real enforcement in a static frontend — all are `FUTURE_BACKEND`,
an authz model not a form (P-20 shows 0 of 4 teacher + 0 of 2 family controls exist). (b) None of the four
academic/communication capabilities grants parent-contact visibility — that is a separate, teacher-unreachable
class. (c) The `salary_*` row is pay-adjacent and never teacher-visible.

## 3. Open questions with safe defaults (recorded honestly; resolve only if evidence + default materially change
scope)

| OQ | Question | Safe default (adopted) | Status |
|---|---|---|---|
| **OQ-1** | Named roles vs per-member grants vs hybrid | **Named roles + explicit per-member exceptions, backend-enforced** | RESOLVED (§1) |
| **OQ-2** | Does admin-only Left/Acquired attribution have a legitimate purpose? | **Exclude until an operational purpose is proven** | RESOLVED — excluded (AP-11) |
| **OQ-3** | Reception/advisor lead-contact access | **Purpose-scoped MASKED view; teacher = DENY** | RESOLVED (matrix RA cells; PC-4) |
| **OQ-4** | Does connection-health need identifiers? | **Counts first; masked suffix only when actionable** | RESOLVED (`privacy-safe-connection-health.md` CH-2) |
| **OQ-5** | Who may copy room links? | **Admin/assigned teacher only after real backend authz; student/family get only their scoped join action** | RESOLVED (PR-4…PR-6) |
| **OQ-6** | Presence & audit identity exposure | **Admin-only; guardian/student receive session status without actor identity** | RESOLVED (PR-1…PR-3) |
| **OQ-7** | Staff-category semantics (U-01) | **UNKNOWN_EVIDENCE; no expansion** | RETAINED (`unknown-evidence-and-stop-register.md`) |

None of OQ-1…OQ-6 changes product scope beyond what the safe default already commits (0 new pages, honest
gates), so no user question is raised (directive §Open Questions "do not ask unless evidence + default would
materially change scope"). OQ-7 is a no-invention hold.

## 4. Enforcement posture (G-02, binding)

The RBAC matrix has **no consumer** — it is display-only and enforces nothing. "Staff member X cannot see
Finance" is representable but not true on any surface (`nav.config.js`/`sidebar.js` never consult a permission,
P-21). This is correct for a fixtures-only frontend and MUST be stated plainly: **we ship a permissions UI that
is a promise the backend must keep.** No wording claims enforcement (MUT-10). Real RBAC enforcement is
`FUTURE_BACKEND` (C09-19, C12-02).

## 5. The G-01 closure directive

`PERM_GROUPS` (`staff-management.js:34-45`) has no parent-contact row. 043 ratifies adding the two named
parent-contact rows (PC-1/PC-2 — the legacy `parent-phone`/`parent-email` vocabulary) as deny-by-default preview
rows. This is a fixture + preview change owned by the RBAC-surface implementer, merging only when MUT-6
(deny-by-default) is green. 043 (specify) writes no bytes.
