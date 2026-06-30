# Quickstart — Spec 007: Teacher Performance and Academic KPIs

Frontend-only, fixture-only. Extends the implemented Spec 001–006 app in `academy-dashboard-discovery/app/`. No backend, no new dependency, **no finance/scoring/ranking engine**.

## Build & preview

```bash
cd academy-dashboard-discovery/app
npm install            # first time only (Playwright/axe/Tailwind already pinned)
npm run build          # SSG → public/*.html  (must end raw-key-clean: "[build:html] N static pages")
npm run serve          # static server on http://localhost:4178  (or open public/*.html directly)
```

GitHub Pages / VS Code Live Server can open `public/*.html` directly (relative assets, no CDN).

## Routes / pages (after Spec 007)

| Page | AR (default) | EN | Nav | activeId |
|---|---|---|---|---|
| Teachers (enriched) | `teachers.html` | `teachers.en.html` | item `teachers` (implemented) | `teachers` |
| Teacher profile (NEW) | `teacher.html` | `teacher.en.html` | — (profile template) | `teachers` |
| Teacher Performance (NEW) | `teacher-performance.html` | `teacher-performance.en.html` | item `teacherKpi` (promoted) | `teacherKpi` |

Deep-links reused: `schedule.html#view=timetable`, `attendance.html`, `course.html`, `group.html`, `student.html`, `family.html`.

## How to review — Teachers page

Open `teachers.html`. Each card shows name + subject chip(s) + a **labeled teacher-status chip** + counts (courses · groups · active students) + an upcoming-sessions hint + a **workload** hint + a **follow-up flag** (only when flagged) + a **"View profile"** link to `teacher.html`. Apply the subject/status/workload filters: results narrow with a count + a distinct no-results/reset state. Confirm a sparse teacher (e.g. `huda`) shows calm zero hints, and the page reads as teacher operations — **not a generic HR table**.

## How to review — Teacher profile

Open `teacher.html`. Banner shows medallion + name + **labeled status** + meta (subjects · availability · workload) + KPIs (courses/groups/students/upcoming) + demo actions. Switch tabs (exactly one visible): **Overview · Courses · Groups · Timetable · Sessions & Outcomes · Students · Follow-up · Notes**. Confirm Courses → `course.html`, Groups → `group.html`, Students → `student.html` (family chip → `family.html`), Timetable renders the shared agenda + a `schedule.html#view=timetable` link, Sessions & Outcomes renders the Spec 005 outcome rows + the **canonical** drawer + an `attendance.html` link. **No salary/compensation tab; not a portal.**

## How to review — Teacher Performance board

Open `teacher-performance.html`. Confirm **KPI tiles** (fixture counts: active teachers · completed sessions · teacher absences · student absences in teacher sessions · cancelled/rescheduled · groups needing attention · teachers needing follow-up), a **per-teacher comparison list** (each: workload + follow-up chips + raw counts + a "View profile" link to `teacher.html`), and a **follow-up queue**. Confirm there is **NO computed score, NO rank/position/percentile, NO chart, NO salary** — only fixture counts + labeled signals, filtered via the existing facet bar.

## How to review — teacher timetable linkage

On the profile **Timetable** tab: the Spec 003 `scheduleAgenda` renders the teacher's weekly sessions (resolved by `trainer.id`); each row opens the shared appointment drawer; a "View in schedule" link opens `schedule.html#view=timetable`. No new grid.

## How to review — teacher outcomes linkage

On the profile **Sessions & Outcomes** tab: Spec 005 `outcomeRow`s with labeled outcome chips; opening one opens the **canonical** outcome drawer; a "View attendance" link opens `attendance.html`. No bespoke drawer.

## How to review — demo actions

On the profile/board, trigger: Edit / Message / Add follow-up note (demo toast), **Notify family** (confirm modal → demo toast), Assign course/group + Print/export (disabled-with-reason), Open timetable / View attendance (real links). Confirm nothing mutates and there is **no salary/deactivate/login-as action**.

## How to verify teacherAbsent vs studentAbsent

On the profile Sessions & Outcomes tab + the Overview absence summary + the board KPI tiles/comparison rows: confirm **teacher absences** and **student absences in teacher sessions** render as **two distinct labeled facts** (distinct chips/labels), never summed into one "absences" number.

## How to verify student / family / course / group links

From the teacher profile: Courses → `course.html`, Groups → `group.html`, Students → `student.html`, family chip → `family.html`. An item with no group/family shows no dead link.

## How to review — dashboard impact

`dashboard.html`: ONE fixture "teachers needing follow-up" chip folded into the existing people-signal card, linking to `teacher-performance.html`. Confirm no new stat wall / no fabricated analytics / no finance widget.

## How to verify static HTML-first

```bash
npm run build
# View Source on public/teacher.html, teacher-performance.html, teachers.html (+ .en):
#   - full shell + cards/tiles/rows + EVERY tab panel + EVERY drawer <template> are baked
#   - NO <div id="app">; relative ./assets/ paths; no http(s)/CDN URLs
grep -L 'id="app"' public/{teacher,teacher-performance,teachers}.html   # all listed (none contain #app)
```

## How to verify no real persistence / scoring / payroll

```bash
cd academy-dashboard-discovery/app
# no finance / score / chart token in the new src:
grep -RniE 'salary|payroll|payout|compensation|fine_?per|hour_?rate|currency|leaderboard|percentile' \
  src/js/pages/teacher*.js src/js/fixtures/teachers.js src/js/components/teacher-*.js && echo FAIL || echo ok
# every number on the board traces to a fixture count (manual): open teacher-performance.html,
# confirm no rank column, no score, no chart/canvas, no pay figure.
```

## Verify — gates

```bash
npm run build          # clean, no raw ⟦keys⟧; nav guard passes (teacherKpi promoted)
npm run test:smoke     # baked cards/tiles/rows/tabs/drawers, labeled chips, filters, real <a> nav (teacher-performance),
                       #   teacherAbsent≠studentAbsent, canonical drawer opens from the profile, no #app, no dead controls,
                       #   no finance/score/chart token, no portal
npm run test:a11y      # axe critical=0 (teachers/teacher/teacher-performance × ar light+dark, en)
npm run screenshots    # capture the 12-frame Spec 007 matrix → then MANUALLY review each vs Spec 001–006
```

The manual screenshot review recorded in `app/screenshots/REVIEW.md` is the **final gate** — automated green is necessary but not sufficient.
