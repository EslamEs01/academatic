# Quickstart: Families and Student Academic Profiles (Spec 004)

Build, preview, test, and screenshot-review the families/students experience. App root: `academy-dashboard-discovery/app/`. Spec 004 **extends the Spec 001/002/003 app in place** — same pipeline, same static/HTML-first/Django-ready architecture; **no new dependencies**. It adds Families + a Family profile + an Add-Family wizard + a Student academic profile, and enriches Students + the Dashboard. **Implementation has not started** — this documents the intended workflow.

## Prerequisites

- Node ≥ 18 (tooling only) + npm; Playwright Chromium (already present).
- No network at runtime; all assets local (no CDN); **no chart/table/form/calendar library**.

## Build & preview

```bash
cd academy-dashboard-discovery/app
npm install
npm run build      # vendor → copy assets → compile CSS → generate ALL public/*.html (incl. families/family/add-family/student + regenerated students/dashboard)
```

After build, `public/` gains: `families.html`, `add-family.html`, `family.html`, `student.html` (+ each `.en.html`); `students.html` + `dashboard.html` are regenerated.

Preview:
- **VS Code Live Server**: open `public/families.html` (or any page). No Node server required.
- **Node**: `npm run preview` → http://localhost:4178 (routes: `/families`, `/add-family`, `/family`, `/student`, `/students`, `/dashboard`).

## Routes / pages

- **Families** → `families.html` (nav «العائلات / Families», promoted to a real link) — family **cards** grouping each family's children.
- **Add Family** → `add-family.html` (nav «إضافة عائلة / Add family», promoted) — the baked multi-step **wizard**.
- **Family profile** → `family.html` (NOT a nav item; `activeId: families`) — reached via a family card's "view profile".
- **Students** → `students.html` (existing, enriched with the family link + facet).
- **Student profile** → `student.html` (NOT a nav item; `activeId: students`) — reached via a student row's "view profile".
- `familyCategories` / `groups` / `scheduleSearch` / `studentResult` / `studentEvaluation` **stay planned** («قريبًا / Soon» buttons — no dead links).

## How to review the Families page

1. Open `public/families.html`. Confirm a header + summary tiles + a filter bar (search + status + category) + a grid of **family cards**, each leading with the guardian and the family's **children grouped** (avatars/chips + "+N" overflow), with student & active-course counts, a labeled lifecycle status chip, and a fixture attention hint.
2. Filter by status/category and search — cards show/hide with feedback + a "no results" + reset state. Click "view profile" → `family.html`; "add family" → `add-family.html`.

## How to review the Family profile

- Open `public/family.html`. Confirm a banner (guardian + status + KPIs) and **tabs**: Overview / Students / Schedule / Plan & Billing / Notes. The **Students tab** lists the family's children, each linking to `student.html`. The **Schedule tab** shows upcoming sessions (agenda) + a "View in schedule" link. **Plan & Billing** is a calm disabled-with-reason/fixture stub (no real finance). Edit/suspend/stop = demo/confirm/disabled.

## How to review the Add-Family wizard

- Open `public/add-family.html`. Confirm a step indicator + **baked steps** (Identity → Contact & Location → Children → Plan & Billing → Review). Use **Next/Back** — only the active step shows (JS toggles visibility; no page rebuild). Every field is labeled. **Save** (Review step) → a clearly-labeled **demo toast**; nothing persists.

## How to review the Students page

- Open `public/students.html`. Confirm each student now shows its **family** (chip/column) + a **family filter facet** + a "view profile" link to `student.html`; the quick-peek drawer still works.

## How to review the Student profile + Results/Evaluation tabs

- Open `public/student.html`. Confirm a banner (student + **family link** + status + level + progress) and **tabs**: Overview / Courses / Timetable / **Results** / **Evaluation** / Family / Notes.
  - **Results** tab: per-course progress (hand-rolled bars/ring) + certificates + a level/term summary — fixture-only (no gradebook).
  - **Evaluation** tab: the monthly progress-report **rubric** (criteria rows + calm rating pills + achievements narrative + objectives + Approve **demo**).

## How to verify the timetable linkage

- On a family/student profile **Schedule/Timetable** tab, click a session → the **shared appointment drawer** (shows family context). Click **"View in schedule"** → `schedule.html#view=timetable` (and `schedule.en.html#view=timetable` for English). No dead links; no duplicated timetable engine.

## How to verify static HTML-first (no runtime mount)

```bash
npm run build
# View Source on public/family.html / public/student.html / public/add-family.html — confirm:
#  • full shell + ALL profile tab panels + ALL wizard steps + <template data-preview> drawers are real baked HTML
#  • NO <div id="app"> whole-page mount; block/card/step placement is baked, not built at runtime
#  • relative ./assets/... paths only
```

With JavaScript disabled, the pages still render the shell + all baked panels/steps; JS only toggles tab/step visibility, filters, opens overlays, and shows demo/disabled feedback.

## How to verify no real persistence (fixtures only)

```bash
grep -RinE "fetch\(|XMLHttpRequest|localStorage\.setItem\('academy\.(family|student)" src/ || echo "no data fetch / no entity persistence ✔"
npm run test:smoke   # also asserts ZERO external/CDN requests, no dead buttons, disabled-with-reason
```

Every "save / create / edit / enroll / approve" is a **demo toast** or **disabled-with-reason** — there is no backend, no database, no CRUD, and no grade/evaluation/attendance/finance engine.

## How to verify no library

```bash
grep -RinE "fullcalendar|flatpickr|apexcharts|chart\.js|datatables|formik|select2|tui-" src/ package.json || echo "no chart/table/form/calendar libs ✔"
```

The family cards, profile tabs, wizard stepper, evaluation rubric, and progress visuals are all hand-rolled HTML/CSS + the existing native enhancement JS.

## Test & screenshots

```bash
npm test               # smoke + a11y (extended to families/family/add-family/student)
npm run test:smoke     # no raw keys · no external requests · no dead buttons · family cards group children · profile tabs (one visible) · wizard Next/Back/Save · promoted nav real-links + rest Soon · portals absent
npm run test:a11y      # axe — fails on any critical violation (new pages + tab/wizard states)
npm run screenshots    # capture the Spec 004 matrix → screenshots/  (review vs Spec 001/002/003)
```

Screenshot matrix (min 13): Families (AR light/dark + EN), family profile, add-family **wizard step**, Students (AR light/dark), student profile, **Results** tab, **Evaluation** tab, dashboard impact, mobile families, mobile student profile — named `{page}__{lang}__{theme}__{viewport}[__{variant}].png`, reviewed side-by-side with the approved Spec 001 dashboard, the sidebar reference, and the old academy family/student screenshots (**product/UX reference only, not visual copy**). Verdicts in `app/screenshots/REVIEW.md`. See `contracts/screenshot-acceptance.md`.

## Deploy to GitHub Pages

```bash
npm run build
npm run deploy:pages -- --out=../../docs
```

`public/` stays self-contained (relative paths + `.nojekyll`); the new families/students surfaces deploy alongside the rest.

## Definition of done (Spec 004)

- Families page (cards grouping children) + Family profile (tabbed hub) + Add-Family wizard (baked steps, demo save) + enriched Students + Student academic profile (tabbed; Results + Evaluation tabs, fixture-only).
- Family↔student relationship is the hero; timetable linkage reuses Spec 003; dashboard impact minimal + fixture-backed.
- Each new page is a complete static `public/*.html` (no `#app`, no runtime-built DOM), AR + EN, all 6 {ar/en}×{light/dark/system} combos, responsive.
- axe critical=0; no dead buttons/links; no raw i18n keys; no external (CDN) requests; relative paths; **no chart/table/form/calendar library**.
- Scope guard honored (no backend/API/auth/CRUD/persistence; no enrollment/grade/evaluation/attendance/finance engine; no portals/role dashboards; no full groups/categories module; no legacy copy).
- Django-template-ready (`{% for family/student/child %}`, tabs/steps → static sections / `{% if %}`, fixtures → context, `data-*` hooks); nav promotes `families`/`addFamily` with the build-guard satisfied and **no dead links**.
- Screenshot review PASS against the approved direction + the reference (not a generic CRM, not a spreadsheet; family↔student relationship + profiles + wizard present; good dark mode; correct RTL/LTR).

## Out of scope (reminder)

No backend/API/DB/auth/permissions/CRUD; no real enrollment/grade/evaluation/attendance/finance engine; no billing/credits/feedback-meeting workflow; no full Groups/Family-Categories module; no student/teacher/family dashboards or portals; no chart/table/form libraries; no TS/SPA/CDN; no copied legacy assets/wording. (Future role experiences must feel cheerful/comfortable/simple/human — not this admin UI.)

## Next steps (not part of /speckit.plan)

- `/speckit.tasks` → generate `tasks.md` (not run here).
- Then implementation (MVP order: Families fixture + page → Family profile → Students extensions + page → Student profile → Add-Family wizard → Results → Evaluation → timetable linkage → dashboard impact → nav + screenshot polish), then the screenshot review above.
