# Admin Ops Page Scope — Spec 026 (Layer A)

Scope of the admin operational surface for Spec 026, grounded in `legacy-admin-ops-coverage.md`. **Page names and the final count are proposed here and fixed during `/speckit-plan`** (the count policy requires build-verification). Nothing is built during specify.

## Already built + owned `done` (no new page; deepen actions only)

`dashboard.html` · `sessions.html` · `schedule.html` · `attendance.html` (+ `.en`). Spec 026 makes their **session-lifecycle actions honest**: create/edit/cancel/reschedule/attend/outcome open modals/drawers whose **final** step is `backendRequired` (reusing the shared appointment/outcome drawers + row kebab — Tiers 1–3 of `dead-ui-register.md`). No new page here.

## Candidate NEW ops pages (grounded, Layer-A core — build the operational subset)

| Candidate page | Grounded in | Content (display-only unless noted) | Writes (all `backendRequired`) | In 026? |
|---|---|---|---|---|
| `sessions-analysis` | `management-sessions-analysis.md` | Outcome KPI board (regular + trial; count + duration; helpers) over a filtered range | none (display-only; **no computed score/rank** — authored counts only) | **yes (core)** |
| `public-holiday` | `management-public-holiday.md` | Holiday windows list + category/teacher scope (authored) | Set-holiday / bulk-absence = gate | **yes (core)** |
| `scheduled-actions` | `management-scheduled-actions.md` (+create) | Queued lifecycle actions list (suspend/activate/cancel-classes) with auto-return dates | Create/automation = gate (engine future-backend) | **yes (core)** |
| **fold** → total-queues | `management-total-queues.md` | Ops queue/notes band folded into sessions/attendance ops (authored fixtures) | Add-queue = gate | **yes (fold, no standalone page unless planning says so)** |
| **fold/merge** → schedule-requests inbox | `management-schedule-*-response.md` | One inbox preview of pending session/trial requests + accepted-teachers | Accept/Reject = gate (form never captured — never invented) | **yes (fold/preview)** |

## Candidate NON-core planned items (keep honest planned gate now; bound in planning, else route to owner)

| Planned nav | Grounded in | Nature | Default disposition |
|---|---|---|---|
| `leads` | `management-new-requests.md` | CRM lead funnel | honest planned gate; build only if planning includes it; else → 029/031 |
| `tasks` | `management-tickets.md` | staff task board (**no "Average"** — excluded) | honest planned gate; bound in planning |
| `messages` | `management-chat.md` | messaging | honest planned gate; send = future-backend; no fake chat |
| `announcements` | `management-public-advertisement.md` | broadcast | honest planned gate; send = future-backend |
| `time-convertor` | `management-time-convertor.md` | TZ utility (static table, no engine) | honest planned gate; optional static build |

## Modals / drawers to create or make honest (reuse existing patterns — see `modal-and-gate-scope.md`)

- **Create modal** (New session/student/teacher/course/group; add-family Save) — fields + `backendRequired` final.
- **Edit modal** (appointment/outcome/entity Edit) — prefilled/read-only + `backendRequired` final.
- **Confirm modal, honest final** (Cancel/Reschedule/Suspend/Stop/Remove/Record-payment/Mark-paid/Send-reminder/Reset/Schedule-report) — reword CTA/message to `backendRequired`; never a success toast; never DOM-fake.
- **Read-only details drawer** (session/student/teacher/course/group references) — display-only; internal writes = gate.
- **Ops gates** — attendance mark, outcome save, queue add, request accept/reject, holiday submit, scheduled-action create, WhatsApp/reminder send, feedback add, export/print — all `backendRequired`/`future-backend`.

## Which actions stay `backendRequired` forever (no backend exists)
Every persist: create/edit/delete/cancel/reschedule/save/submit/send/upload/download/export/print/join/live/attendance-write/outcome-write/record-payment/mark-paid/reminder/broadcast/scheduled-action/bulk-absence/accept-reject. Views/filters/tabs/switchers/drill-downs stay real (no backend needed).

## Expected HTML count policy
- Current = **91** (verified). **No removals.**
- If the Layer-A core set (`sessions-analysis`, `public-holiday`, `scheduled-actions`) is built as pages → **+3 ×2 langs = +6 → 97**. Folds (total-queues, schedule-requests) add **0–2 ×2** depending on whether they are standalone or folded (planning decides).
- Non-core planned items that stay honest gates add **0**.
- **The exact target count is fixed in `/speckit-plan` and MUST be met by `npm run build`; any drift = STOP + report.** Do not assume a count during specify.

## Impact protection (Layer A + B)
- Portal surface (49 files) unchanged; role laws green. Admin pages not in the touched set byte-identical. `package.json` unchanged. No backend/API/auth, no new dependency, no new engine, **no new `data-*` hook or storage key** (reclassification reuses `data-demo-action`→`data-disabled-reason`/`data-confirm`/gate patterns already present). Finance figures stay Spec-009-invariant; zero salary/payroll figures anywhere.
