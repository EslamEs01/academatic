# Quickstart: Timetable and Scheduling Experience (Spec 003)

Build, preview, test, and screenshot-review the timetable/scheduling experience. App root: `academy-dashboard-discovery/app/`. Spec 003 **extends the Spec 001/002 app in place** — same pipeline, same static/HTML-first/Django-ready architecture; **no new dependencies, no new pages/routes**. It revises three existing surfaces (**Schedule, Sessions, Dashboard**). **Implementation has not started** — this documents the intended workflow.

## Prerequisites

- Node ≥ 18 (tooling only) + npm; Playwright Chromium (already present).
- No network at runtime; all assets local (no CDN); **no calendar/chart library**.

## Build & preview

```bash
cd academy-dashboard-discovery/app
npm install
npm run build      # vendor → copy assets → compile CSS → regenerate ALL public/*.html (incl. schedule/sessions/dashboard)
```

After build, `public/` regenerates (no new files): `schedule.html`, `sessions.html`, `dashboard.html` (+ each `.en.html`) now carry the tab panels, the baked weekly timetable grid, the agenda, and the per-item detail `<template>`s.

Preview:
- **VS Code Live Server**: open `public/schedule.html` (or any page). No Node server required.
- **Node**: `npm run preview` → http://localhost:4178 (routes: `/schedule`, `/sessions`, `/dashboard`).

## Schedule / Timetable routes & views

- **Schedule** → `schedule.html` (Arabic label **`الجدول الدراسي`** / English **Timetable**; id/route stay `schedule`). Two tabs: **List/Agenda** (default) and **Timetable**. Deep-link a view with the hash: `schedule.html#view=timetable` or `#view=list`.
- **Teacher lens**: on the Timetable tab, the **teacher** filter scopes the grid to one teacher; default **"All teachers"** shows the combined week (each block labeled by teacher). Admin display only — not a teacher portal, not a new page.
- **Sessions** → `sessions.html`: **List (table)** tab (default) + **Timetable/agenda (today)** tab over the same fixture.
- **Dashboard** → `dashboard.html`: "View Schedule" / "view all" deep-link to `schedule.html#view=timetable`; the Today's Sessions row detail opens the shared appointment drawer; a small "up next" strip + a fixture attention-count chip link to Schedule.

## How to review List tab vs Timetable tab

1. Open `public/schedule.html`. The **List/Agenda** tab is active by default — confirm the calm day-grouped blocks (time range, title+level, teacher, status chip).
2. Click the **Timetable** tab (or load `#view=timetable`). Confirm a **hand-rolled weekly grid**: a time-axis column + Sat-first day columns, **cropped to working hours** (no empty 24-hour axis), generous status-colored blocks, a quiet **today** accent. Use **Arrow/Home/End** keys on the tablist — the tab switches by keyboard; the selection **persists** (reload → same tab; the URL hash updates).
3. Apply a **filter** (teacher/subject/status/day) — both tabs narrow to matching blocks with active-filter chips + a count; an empty match shows the "no results" state with reset. Switch tabs — the filter is preserved.

## How to test the modal/drawer

- Click any **time block** (Timetable) or **table row / agenda block** (List/Sessions) → the **appointment-details drawer** opens (scrim, focus trap, Esc/scrim/close return focus). Confirm progressive disclosure: **Summary** (status, date, start–end, duration, teacher) → **People** (students/family) → **Logistics** (subject, room/online link, timezone hint) → **More** (notes/materials/attention) → **Actions**.
- Actions: **Edit/Reschedule** and **Notify** show a demo toast; **Cancel** opens a confirmation modal → demo toast; **Join/Open link** is **disabled-with-reason** (no real Zoom). Nothing persists.

## How to verify static HTML-first (no runtime mount, no runtime-drawn grid)

```bash
npm run build
# View Source on public/schedule.html — confirm:
#  • full shell + BOTH tab panels + the weekly grid + agenda + <template data-preview> are real baked HTML
#  • NO <div id="app"> whole-page mount
#  • block placement is a baked grid-row span (class / inline custom property), NOT computed at runtime
#  • relative ./assets/... paths only
```

With JavaScript disabled, the page still renders the shell, both panels (as anchored sections), and all blocks — JS only toggles tab visibility, persists the choice, filters, and opens overlays.

## How to verify no calendar library

```bash
grep -RinE "fullcalendar|flatpickr|tui-calendar|@fullcalendar|toast-ui|apexcharts|chart\.js|fabric|moment-timezone" src/ package.json || echo "no calendar/chart libs ✔"
npm run test:smoke   # also asserts ZERO external/CDN requests → no library is fetched
```

The timetable is pure semantic HTML + CSS grid; the only assets are the self-hosted Tajawal font and the local SVG icon sprite.

## Test & screenshots

```bash
npm test               # smoke + a11y (extended to tabs/grid/drawer on schedule/sessions/dashboard)
npm run test:smoke     # no raw keys · no external requests · no dead buttons · ≥2 tabs · exactly ONE visible tabpanel · timetable grid present · tab-switch works · filters narrow both views · drawer opens
npm run test:a11y      # axe — fails on any critical violation (schedule/sessions/dashboard)
npm run screenshots    # capture the Spec 003 matrix → screenshots/  (review vs Spec 001/002)
```

Screenshot matrix (min 10): Schedule List + Timetable (AR light), Timetable AR dark + EN light, teacher-lens, the detail **drawer**, dashboard schedule impact, **mobile agenda**, **tablet timetable**, and Sessions timetable/agenda — named `{page}__{lang}__{theme}__{viewport}[__{variant}].png`, reviewed side-by-side with the approved Spec 001 dashboard, the sidebar reference, and the old academy schedule screenshots (**product/UX reference only, not visual copy**). Verdicts in `app/screenshots/REVIEW.md`. See `contracts/screenshot-acceptance.md`.

## Deploy to GitHub Pages

```bash
npm run build
npm run deploy:pages -- --out=../../docs
```

`public/` stays self-contained (relative paths + `.nojekyll`); the revised schedule/sessions/dashboard deploy alongside the rest.

## Definition of done (Spec 003)

- Schedule + Sessions each offer **List + Timetable** tabs over the same fixture; the Timetable is a readable **hand-rolled weekly grid** (no calendar library); the teacher lens scopes the grid; the shared **appointment drawer** opens from every entry point.
- Dashboard impact is wired (deep-links + shared drawer + up-next strip + fixture attention count) — calm, fixture-backed, no new clutter.
- Each page is a complete static `public/*.html` (no `#app`, no runtime-drawn grid), AR + EN, all 6 {ar/en}×{light/dark/system} combos correct, responsive (timetable → agenda on mobile).
- axe critical=0; no dead buttons; no raw i18n keys; no external (CDN) requests; relative paths; **no calendar/chart library**.
- Scope guard honored (no backend/API/auth/CRUD/persistence/recurrence/real-conflict-detection; no portals/role dashboards; teacher timetable admin-only; no legacy copy).
- Django-template-ready (grid/list/agenda → `{% for %}`, tabs → static panels / `{% if view %}`, fixtures → context, `data-*` hooks); the `الجدول الدراسي`/`Timetable` label is consistent across nav/title/breadcrumb.
- Screenshot review PASS against the approved direction + the reference (not plain-table-only; calendar tab present; drawer present; readable blocks; strong filters; good dark mode; correct RTL/LTR).

## Out of scope (reminder)

No backend scheduling/API/DB/auth/permissions/CRUD; no real reschedule/cancel/create; no drag-drop; no recurrence engine; **no real conflict detection** (attention is fixture-only); no real Zoom/attendance/notifications; no finance/payroll; no student/teacher/family **dashboards or portals**; no chart/calendar libraries; no TS/SPA/CDN; no copied legacy assets/wording. (Future role timetables/dashboards must feel cheerful/comfortable/simple/human — not this admin timetable.)

## Next steps (not part of /speckit.plan)

- `/speckit.tasks` → generate `tasks.md` (not run here).
- Then implementation, then the screenshot review above.
