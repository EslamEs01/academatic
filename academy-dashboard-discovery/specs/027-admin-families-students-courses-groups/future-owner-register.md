# Future Owner Register — Spec 027

Every management action whose real destination is outside families/students/courses/groups deep management is NOT built in 027. It is converted to an honest `planned`/`backendRequired` gate and recorded here against its owner. Keeps 027 bounded and preserves the 016 sequence.

## Owner specs

| Owner | Area | Example actions routed here |
|---|---|---|
| **028** | Admin teachers / performance | Assign-teacher **deep management** (edit teacher, teacher CRUD); teacher performance edits — 027 keeps teacher as a **reference gate** only |
| **029** | Admin reports / analytics / feedback / forms | Student/course analysis dashboards, exports/reports, feedback forms, any computed analytics |
| **030** | Admin finance / invoices / banks | Family billing, invoice/payment actions, any pay/amount figure — **never shown on a family surface in 027** |
| **031** | Admin management / content / certificates / settings | Materials/content attach, certificate issuance, category management beyond a link, settings persistence |
| **032** | Final QA | The closing no-missing QA pass |
| **future-backend** | Any real persistence/engine | Every final Create/Save/Delete/Enroll/Assign/Move/Remove/Upload/Export/Message write |
| **intentionally-excluded** | Out by law | Family payment page/figure; student primary-role page; teacher chat/pay/live-room page |

## Routing rules
- An action pointing at a future domain → classify `missing-owner-future-spec`, gate it honestly now (`planned` if the whole surface is future; `backendRequired` if only persistence is future), add a smoke check so it never reads dead, and record it in `current-management-action-inventory.md` with the owner.
- A families/students/courses/groups management op grounded in legacy → owned by 027 (built in the implementation phase as a modal/drawer/gate/wizard-step; a standalone page only if planning justifies it).
- An action forbidden by law → `intentionally-excluded`; never a build target, never a pay figure.

## Standing exclusions (never owned by 027)
- Family payment page / any family pay-amount figure — `intentionally-excluded` (family zero-pay) / owner-030 for admin-side billing.
- Student primary-role dashboard / «لوحة الطالب» — `intentionally-excluded` (child-view, Spec 021).
- Teacher chat/pay/finance/live-room page; teacher deep CRUD — 028 / `intentionally-excluded`.
- Any real backend/API/auth/database, real CRUD persistence, real upload/download/export, real notification/chat/live-room engine — `future-backend`.
- New finance/reports/settings module — out of 027 (029/030/031).

*(Concrete row-level assignments are appended from the agent audit synthesis; this register is the authoritative owner map they reference.)*
