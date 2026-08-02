# Data Model — Spec 043 Plan Phase

The doc-domain entities Spec 043's implementation creates or edits. This is a **frontend fixtures-only** model —
no database, no persistence, no real authorization. Every "entity" is an authored, structure-only fixture row or
a test guard. Real storage/enforcement is `FUTURE_BACKEND`.

## E1 — Parent-contact permission row (new; `fixtures/staff-management.js` → `PERM_GROUPS`)

A row inside a new `PERM_GROUPS` group `{ labelKey: 'adm.staff.perm.g.parents', items: [...] }`. Shape matches
the existing `PERM_GROUPS` item: `{ k: string, granted: boolean }`.

| k | Permission (spec PC-id) | granted (default) | Legacy anchor |
|---|---|---|---|
| `viewPhone` | PC-1 view guardian phone | **false** | `parent-phone` (Show Parent Phone) |
| `viewEmail` | PC-2 view guardian e-mail | **false** | `parent-email` (Show Parent Email) |
| `exportContacts` | PC-3 export guardian contacts | **false** | (export adjacency) |
| `approvedUse` | PC-4 use contact for approved communication | **false** | (reception/advisor use-case) |
| `revealMasked` | PC-5 reveal full value from masked admin view | **false** | (reveal action) |

**Invariants**: every row `granted:false`; never "all granted"; the group is rendered ONLY inside the staff RBAC
preview (`permDrawer`, `staff.html`), never on a teacher surface (structurally teacher-unreachable — `teacher.js`
does not import `PERM_GROUPS`). No value slot, no toggle, no data-attribute payload. Validation: the source
census (G3/G11) asserts all five default `false` and that no teacher-facing file references them.

## E2 — Teacher capability/notification policy registry (new; `fixtures/teacher-management.js` → `TEACHER_CAPABILITY_POLICY`)

A new structure-only export. Two blocks, all display-only (no toggle, no enforcement):

**Academic capabilities** (from the legacy `capabilities/update` form):
| capability | legacy field | display status (authored, categorical) |
|---|---|---|
| chat | `can_chat` | authored on/off label — display only |
| library | `can_see_library` | authored label |
| editSchedule | `can_edit_schedule` | authored label |
| editClass | `can_edit_class` | authored label |

**Communication & notifications** (from the legacy `teacher-notifications` matrix, **`salary_*` EXCLUDED**):
| event | channels | note |
|---|---|---|
| coursesUpdate | WhatsApp / Email | structure-only |
| classReminders | WhatsApp / Email | structure-only |
| classUpdates | WhatsApp / Email | structure-only |
| ~~salary~~ | — | **EXCLUDED (pay-free)** — never rendered |

**Invariants**: 0 value slot; 0 real toggle; 0 pay token (no salary/rate/currency/figure — PAY28 stays green on
`teacher.html`); 0 guardian/student contact; 0 locality. Academic rows are visibly separated from communication
rows. Honest note: enforcement + delivery are backend. Validation: the teacher-policy census (MUT-TP).

## E3 — Child-view profile gate set (edited; `fixtures/portal.js` → `STUDENT_PAGES.profile.gates`)

| gate id | keep? | rationale |
|---|---|---|
| `photoUpload` | KEEP (honest backendRequired gate) | a guardian may set the child's photo (backend) |
| `profileSave` | KEEP | a guardian may edit the child's display profile (backend) |
| `passwordChange` | **REMOVE** | a child has no login/password (G-03) |

Result: 3 → 2 gates on the child-view. **Untouched** (separate arrays): `FAMILY_PAGES.profile.gates`
(`portal.js:377-381`, keeps `passwordChange`) and the inline teacher gates (`teacher-profile.js:83-85`).

## E4 — Global privacy guards (new/strengthened test assertions; `tests/smoke/run.cjs`)

Fourteen guards G1–G14, each an executable assertion (see `contracts/global-privacy-guards-plan.md`). Each is
additive except **G5** (the ONE declared supersession). Each new guarantee ships a falsifying mutation
(`contracts/mutation-protocol-plan.md`).

## E5 — Mutations (test-time falsifiers; isolated copies only)

| id | falsifies | expected RED |
|---|---|---|
| MUT-1 | G1 teacher-contact | teacher-contact census RED |
| MUT-2 | G3 teacher-unreachable grant | teacher-unreachable assert RED |
| MUT-3 | G5 child-view gate | `student-profile plannedBackend===2` RED |
| MUT-4 | G8 WhatsApp URL | sitewide real-PII census RED |
| MUT-5 | G10 credential slot | g32 (`pw===0`) RED |
| MUT-6 | G11 deny-by-default | deny-by-default assert RED |
| MUT-7 | G12 cert group delivery | cert-delivery census RED |
| MUT-8 | G4 family isolation | family-isolation census RED |
| MUT-9 | G6 admin link on portal | no-admin-link census RED |
| MUT-10 | G14 fake authorization wording | wording census RED |
| MUT-11 | G13 minor in query string | query-string census RED |
| MUT-TP | teacher-policy pay/value | teacher-policy census RED |

## Relationships & state

- E1 (parent-contact rows) render inside the staff RBAC preview (E-existing `permDrawer`) → `staff.html` body.
- E2 (teacher policy) renders inside `capabilityPolicyDrawer` on `teacher.html` body.
- E3 (child-view gates) render on `student-profile.html` body.
- E4/E5 are test-only (no page body).
- **No state transitions** — every fixture is static/display-only; theme+language remain the only real writes.

## Non-entities (explicitly NOT created)

No new page base, route, nav item, storage key, hook, dependency, component, form, input, value slot,
`type=password`/`type=file`/`<canvas>`, real PII, or persisted grant. No RBAC engine. No "Privacy Center".
