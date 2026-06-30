# Quickstart: Attendance and Session Outcomes (Spec 005)

Build, preview, test, and screenshot-review the attendance/outcomes experience. App root: `academy-dashboard-discovery/app/`. Spec 005 **extends the Spec 001/002/003/004 app in place** — same pipeline, same static/HTML-first/Django-ready architecture; **no new dependencies**. It adds one Attendance / Outcomes page + a canonical outcome drawer, and lightly enriches Sessions + the Student/Family profiles + the Dashboard. **Implementation has not started** — this documents the intended workflow.

## Prerequisites

- Node ≥ 18 (tooling only) + npm; Playwright Chromium (already present).
- No network at runtime; all assets local (no CDN); **no chart/table/form/calendar library**.

## Build & preview

```bash
cd academy-dashboard-discovery/app
npm install
npm run build      # vendor → copy assets → compile CSS → generate ALL public/*.html (incl. attendance + regenerated sessions/student/family/dashboard)
```

After build, `public/` gains: `attendance.html` (+ `.en.html`); `sessions.html`, `student.html`, `family.html`, `dashboard.html` are regenerated.

Preview:
- **VS Code Live Server**: open `public/attendance.html` (or any page). No Node server required.
- **Node**: `npm run preview` → http://localhost:4178 (routes: `/attendance`, `/sessions`, `/student`, `/family`, `/dashboard`, …).

## Routes / pages

- **Attendance** → `attendance.html` (nav «الحضور / Attendance», promoted to a real link in the **control** category) — the outcome summary tiles + filters + outcome list/card hybrid.
- **Sessions** → `sessions.html` (existing, enriched with a secondary outcome chip + the canonical outcome drawer + a "View attendance" deep-link).
- **Student / Family profiles** → `student.html` / `family.html` (existing, enriched with a light fixture outcome hint + a deep-link).
- **Dashboard** → `dashboard.html` (existing, one fixture follow-up signal folded into the people-signal card).
- `sessionsAnalysis` and the rest of the control category **stay planned** («قريبًا / Soon» — no dead links).

## How to review the Attendance page

1. Open `public/attendance.html`. Confirm a header («الحضور ونتائج الجلسات») + **outcome summary tiles** (مكتملة / غياب طلاب / غياب معلمين / ملغاة ومؤجلة / تحتاج متابعة) + a **filter bar** (day · teacher · student/family · subject · outcome · attention) + an airy **list/card hybrid** of session-outcome rows (time/date · session+course · teacher · student/family link · **labeled outcome chip** · attention flag · row menu).
2. Confirm it is **not** a generic attendance spreadsheet and **not** a numeric status dump — outcome chips are icon + text, never color-only.

## How to review outcome filters (tiles-as-filters)

- Click a summary tile (e.g. «غياب طلاب») → confirm it sets the **outcome** filter and narrows the rows (the `data-filter-set` shortcut), with active-filter feedback + a result count + a no-results/reset state. Use the filter bar's day/teacher/family/subject/outcome/attention selects — rows show/hide client-side; never a dead control.

## How to review the outcome details drawer

- Open any outcome row (the row menu) → the **canonical** drawer (`outcomeTemplate`) shows the scheduling **Status** + the review **Outcome** chip + the people (teacher + student/family with the family-context row) + the attendance summary (present/capacity) + the **who-absent / who-cancelled attribution** + the make-up/credit **display hint** + the follow-up hint + notes/feedback + the **action cluster**. Confirm it is the **same** drawer used on the Sessions page (one canonical surface).

## How to review demo actions

- In the drawer (or row menu), trigger the status-gated actions — **Mark attend / Notify / Add feedback / Reverse** → a **demo toast**; **Cancel / Reschedule / Mark absent** → a **confirmation modal → demo toast**; **real save / real notify / add-to-credit** → **disabled-with-reason**. Confirm nothing persists and no status changes.

## How to review Sessions integration

- Open `public/sessions.html`. Confirm each row keeps its scheduling **status** chip (primary) and gains a small **secondary outcome chip** only where a recorded outcome exists; the row opens the **canonical outcome drawer**; a **"View attendance"** deep-link goes to `attendance.html`.

## How to review Student / Family profile integration

- Open `public/student.html` → a calm fixture **recent-outcomes / attendance hint** (e.g. "attended 6 of last 8 · 1 to follow up") + a "View attendance" deep-link (no new tab, no metric claim).
- Open `public/family.html` → a calm fixture **children follow-up hint** + a deep-link.

## How to review Dashboard impact

- Open `public/dashboard.html` → confirm **one** fixture **"needs follow-up today"** count chip folded into the existing people-signal card + a deep-link to Attendance; the Today's Sessions rows may carry an outcome chip / open the canonical drawer. Confirm **no new stat wall, no finance/credit widget, no real attendance metric**.

## How to verify static HTML-first (no runtime mount)

```bash
npm run build
# View Source on public/attendance.html — confirm:
#  • full shell + summary tiles + filter bar + ALL outcome rows + <template data-preview> outcome drawers are real baked HTML
#  • NO <div id="app"> whole-page mount; rows/tiles are baked, not built at runtime
#  • relative ./assets/... paths only
```

With JavaScript disabled, the page still renders the shell + tiles + filter bar + all baked rows; JS only filters (incl. tile→filter), opens the drawer/confirm, and shows demo/disabled feedback.

## How to verify no real persistence (fixtures only)

```bash
grep -RinE "fetch\(|XMLHttpRequest|localStorage\.setItem\('academy\.(attendance|outcome)" src/ || echo "no data fetch / no outcome persistence ✔"
npm run test:smoke   # also asserts ZERO external/CDN requests, no dead buttons, disabled-with-reason
```

Every "mark / cancel / reschedule / notify / make-up / approve" is a **demo toast**, a **confirm→toast**, or **disabled-with-reason** — there is no backend, no database, no CRUD, and no attendance/outcome/reschedule/make-up/finance/credit engine.

## How to verify no library

```bash
grep -RinE "fullcalendar|flatpickr|apexcharts|chart\.js|datatables|formik|select2|tui-" src/ package.json || echo "no chart/table/form/calendar libs ✔"
```

The summary tiles, outcome rows, outcome chips, and the outcome drawer are all hand-rolled HTML/CSS + the existing native enhancement JS.

## Test & screenshots

```bash
npm test               # smoke + a11y (extended to attendance)
npm run test:smoke     # no raw keys · no external requests · no dead buttons · outcome tiles filter · labeled outcome chips · canonical drawer opens · promoted nav real-link + rest Soon · portals absent
npm run test:a11y      # axe — fails on any critical violation (new page + drawer + dark + EN states)
npm run screenshots    # capture the Spec 005 matrix → screenshots/  (review vs Spec 001/002/003/004)
```

Screenshot matrix (min 11): Attendance (AR light/dark + EN), outcome drawer, confirmation modal, Sessions integration, Student profile section, Family profile section, dashboard impact, mobile attendance, mobile drawer — named `{page}__{lang}__{theme}__{viewport}[__{variant}].png`, reviewed side-by-side with the approved Spec 001 dashboard, the sidebar reference, and the old academy session/attendance screenshots (**product/UX reference only, not visual copy**). Verdicts in `app/screenshots/REVIEW.md`. See `contracts/screenshot-acceptance.md`.

## Deploy to GitHub Pages

```bash
npm run build
npm run deploy:pages -- --out=../../docs
```

`public/` stays self-contained (relative paths + `.nojekyll`); the new attendance surface deploys alongside the rest.

## Definition of done (Spec 005)

- Attendance page (tiles-as-filters + filter bar + outcome list/card hybrid) + the canonical outcome drawer (status + outcome + people + attribution + make-up/follow-up hint + actions) + light Sessions/Student/Family/Dashboard integration.
- The outcome vocabulary is labeled (icon + text, never numeric/color-only); student-absent vs teacher-absent is distinct; one canonical drawer reused across Attendance/Sessions.
- All actions are demo / confirm→demo / disabled-with-reason — no status mutation, persistence, notification, reschedule, make-up, or finance/credit.
- Each new page is a complete static `public/*.html` (no `#app`, no runtime-built DOM), AR + EN, all 6 {ar/en}×{light/dark/system} combos, responsive.
- axe critical=0; no dead buttons/links; no raw i18n keys; no external (CDN) requests; relative paths; **no chart/table/form/calendar library**.
- Scope guard honored (no backend/API/auth/CRUD/persistence; no attendance/outcome/reschedule/make-up/finance/credit engine; no portals/role dashboards; no legacy copy / numeric statuses).
- Django-template-ready (`{% for outcome %}`, the shared drawer → an `{% include %}` partial, the outcome status map → a template tag, tiles/filters → `data-*`); nav promotes `attendance` with the build-guard satisfied and **no dead links**.
- Screenshot review PASS against the approved direction + the reference (not a generic attendance spreadsheet; outcome vocabulary + student-vs-teacher distinction + the canonical drawer present; good dark mode; correct RTL/LTR; no real-persistence claim).

## Out of scope (reminder)

No backend/API/DB/auth/permissions/CRUD; no real attendance/outcome/reschedule/make-up engine; no finance/credit/accounting/salary; no real notification/WhatsApp/Zoom/live; no Sessions-Analysis page; no enter-time/queue/proof-video workflows; no student/teacher/family dashboards or portals; no chart/table/form/calendar libraries; no TS/SPA/CDN; no copied legacy assets/wording/numeric statuses.

## Next steps (not part of /speckit.plan)

- `/speckit.tasks` → generate `tasks.md` (not run here).
- Then implementation (MVP order: outcome fixture + status map → Attendance page → outcome drawer/details → demo actions → Sessions integration → Student/Family light integration → dashboard impact → nav reconciliation → static checks + screenshots), then the screenshot review above.
