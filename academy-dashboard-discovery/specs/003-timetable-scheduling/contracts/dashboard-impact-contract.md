# Contract: Dashboard Impact (Spec 003)

**Status**: Binding · The dashboard's schedule impact is MINIMAL and FIXTURE-BACKED — exactly four active changes, each backed by an existing fixture AND linked to an in-scope page. The dashboard stays calm: no new stat wall. Anything beyond this is a defect, regardless of passing tests.

## 1. Scope of impact

- Spec 003 touches **only** `public/dashboard.html` (+ `.en`); it adds **no new dashboard page, route, KPI row, chart, or calendar**.
- The dashboard already carries strong schedule signals (the **Today's Sessions** table module, the welcome-hero counts `todaySessions/liveNow/upcomingToday/attendanceRate`, the "Today's Sessions" KPI + sparkline, the 4 status-summary tiles). Spec 003 **connects** these to the new timetable and **unifies** the detail drawer — it does NOT replace or multiply them.
- Status tones everywhere reuse the single Spec 001 status map (`live→teal, upcoming→sky, completed→success, cancelled→coral`; icon + label, never color-only).
- All four changes are baked static HTML enhanced via the established `data-*` hooks; no runtime-built DOM, no external/CDN requests.

## 2. Active change A — Deep-link "View Schedule" / "view all" to the Timetable view

- The hero **"View Schedule"** action and the Today's Sessions module **"view all"** affordance MUST navigate to **`./schedule.html#view=timetable`** (relative path; the hash opens the Timetable tab per the tabs widget — FR-002/R11).
- **Fixture backing**: the hero counts and the module already render over `SCHEDULE_WEEK` / `SESSIONS_FULL`; the link target is the real, in-scope `schedule.html`.
- **In-scope link target**: `./schedule.html#view=timetable`.
- **Hooks**: `data-action="view-schedule"` (existing) resolving to the relative href + `data-view="timetable"` (the hash contract the tabs widget consumes). No dead control.

## 3. Active change B — Shared appointment-details drawer on Today's Sessions rows

- Each Today's Sessions row's detail trigger MUST open the **SHARED appointment-details drawer** (FR-011/R15) — the same `<template data-preview="<id>">` + drawer engine used by Schedule and Sessions — NOT a bespoke dashboard drawer.
- **Fixture backing**: the row's `SessionAppointment` → `AppointmentDetails` shape already exists in `SESSIONS_FULL`.
- **In-scope link target**: in-page transient drawer (scrim / focus-trap / Esc / return-focus); drawer actions are demo-with-toast or disabled-with-reason — no real persistence/join.
- **Hooks**: `data-drawer="<id>"` on the row trigger + the baked shared `<template data-preview="<id>">`.

## 4. Active change C — One small "Up next / This week" strip

- The dashboard MAY add **exactly one** compact **"Up next / This week"** strip reusing the existing **`.sched-block`** visual over `SCHEDULE_WEEK` / `SESSIONS` (the next ~3–4 blocks), each block linking to Schedule. It is a small, calm, P2/optional increment — never a new stat wall.
- **Fixture backing**: `DashboardScheduleSignal.upNext` is **derived** from `SCHEDULE_WEEK`/`SESSIONS` (no second source of truth).
- **In-scope link target**: the strip header links to `./schedule.html#view=timetable`; each block opens the shared drawer.
- **Hooks**: strip header `data-action`/href → the relative deep link; per-block `data-drawer="<id>"`.

## 5. Active change D — Fixture-only attention-count chip

- A **fixture-only** attention-count chip MAY sit on the existing sessions-card header (e.g., "2 need attention"), the count **derived** from the `attention` fixture flags, linking to the schedule filtered to attention. It MUST read as demo/fixture data (icon + label, never color-only — FR-013) and imply **no** real detection.
- **Fixture backing**: `DashboardScheduleSignal.attentionCount`, derived from the `attention` flags on `SESSIONS_FULL`/`SCHEDULE_WEEK`.
- **In-scope link target**: `./schedule.html#view=timetable` opening with the attention facet active.
- **Hooks**: `data-attention` chip + the relative deep-link href.

## 6. The hard rule — no fake/unbacked widget; stay calm

- Every added dashboard element MUST be **backed by an existing fixture** AND **link to an in-scope page**. A widget with no fixture, or pointing at an unbuilt page, is forbidden.
- The dashboard MUST stay calm: **no new stat tiles, no new KPI row, no chart, no mini-calendar, no notification feed**. The impact is wiring + at most the one small up-next strip + the one attention chip.

## 7. What does NOT change on the dashboard

- The welcome-hero counts, the existing Today's Sessions table module, the "Today's Sessions" KPI + sparkline, the 4 status-summary tiles, and the overall layout/density all stay as Spec 001/002 shipped them.
- The shell (category rail + topbar), theme/language behavior, and all existing fixtures are **unchanged**; no existing dashboard control is removed or repurposed beyond pointing the two affordances at the deep link and the rows at the shared drawer.

## 8. Deferred / Out (until backend modules exist)

- Real **conflict detection**, real **upcoming/notification feeds**, **attendance**, **recordings**, **accounting/payout**, and the **request→respond scheduling** workflow are **deferred/out**.
- No real reschedule/cancel/join from the dashboard drawer (demo-with-toast or disabled-with-reason only). The attention count is display-only — no alerting engine.

## 9. Django mapping

- The two deep-link affordances → plain anchors (`{% url 'schedule' %}` + `#view=timetable`); the hash is client-only state.
- The shared drawer `<template data-preview>` → **one** reused Django partial (same as Schedule/Sessions), fed from view context — not a dashboard-specific template.
- The up-next strip → `{% for block in up_next %}` over the same context the schedule page uses; the attention chip → a single context integer (`attention_count`).
- Fixtures (`SCHEDULE_WEEK`/`SESSIONS_FULL`) → view context; behavior keys stay stable `data-*` attributes (no JS-generated ids/classes).

## 10. Enforcement

- `no-dead-button` smoke: each added control navigates, opens the shared drawer, or links — none is inert.
- `no-external-request` + relative-path checks: the deep link resolves relatively; zero CDN/calendar/chart requests.
- Single-source check: the dashboard drawer is the shared `data-preview` template (not a bespoke one).
- Screenshot frame #7 (Admin Dashboard schedule impact, AR-RTL light desktop) confirms the calm, fixture-backed wiring; clutter or a new stat wall = fail.
