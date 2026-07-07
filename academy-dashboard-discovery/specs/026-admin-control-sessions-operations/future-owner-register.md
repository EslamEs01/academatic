# Future Owner Register — Spec 026

Every action whose real destination is a **future admin family** (or a genuine backend capability) is out of scope for Spec 026. It is NOT built now; it is converted to an honest `planned`/`backendRequired` gate and recorded here against its owner. This keeps Spec 026 bounded and preserves the 016 sequence.

## Owner specs (from the 016 sequence + 021 DEC-009)

| Owner | Area | Example actions that route here |
|---|---|---|
| **027** | Admin families / students / courses / groups (deep management) | Full family/student CRUD beyond the existing Spec 004 profile templates; course/group management flows beyond Spec 006 view; bulk roster ops |
| **028** | Admin teachers / performance | Teacher management CRUD; performance board deep edit; assign-teacher persistence beyond an ops modal |
| **029** | Admin reports / analytics / feedback / forms | Report builder, analytics dashboards, feedback/forms management, real export/print generation |
| **030** | Admin finance / invoices / banks | Invoice lifecycle, payment recording, bank/settlement flows (figures admin-only per Spec 009; zero salary/payroll ever) |
| **031** | Admin management / content / certificates / settings | Content management, certificate issuance, settings persistence |
| **032** | Final QA | The closing no-missing QA pass (016 Spec-027-style machine-checkable rules) |
| **future-backend** | Any real persistence/engine | Every final Save/Submit/Delete/Upload/Download/Export/Print/Join/live/attendance/outcome write; notifications count; chat |
| **intentionally-excluded** | Out by law | Teacher salary/pay/finance surfaces; teacher chat page; teacher live-room page; family payment page; student primary-role page |

## Routing rules

- An action pointing at a page **in an owner spec above** → classify `missing-owner-future-spec`, gate it honestly now (`planned` if the whole page is future; `backendRequired` if only the persistence is future), add a smoke check so it never reads as dead, and add a row to `current-action-inventory.md` with the owner.
- An action whose page is **in Spec 026 scope** (sessions/timetable/attendance/outcomes/daily-ops) and grounded in legacy → build the page/modal/drawer in the implementation phase (not now).
- An action forbidden by law → `intentionally-excluded`; never surface it as a build target.

## Standing exclusions (never owned by any admin spec)

- Teacher: chat page, pay/finance/salary page, live-room page — `intentionally-excluded` (chat → Spec 026 recorded owner note only if it surfaces; per B-06 chat ownership deferred, no fake).
- Family: payment page / payment-amount surface — `intentionally-excluded` (zero-pay hard line).
- Student: primary-role dashboard / «لوحة الطالب» — `intentionally-excluded` (child-view only, Spec 021).
- Any real backend/API/auth/database, real CRUD persistence, real file I/O, real chat/live-room/notification engine — `future-backend`.

*(Concrete row-level assignments are appended from the agent audit synthesis; this register is the authoritative owner map they reference.)*
