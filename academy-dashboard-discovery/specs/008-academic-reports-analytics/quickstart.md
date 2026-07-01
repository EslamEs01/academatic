# Quickstart — Spec 008: Academic Reports and Operations Analytics Shell

Frontend-only, fixture-only. **Enriches the existing implemented `reports.html`** in the Spec 001–007 app (`academy-dashboard-discovery/app/`) into a calm academic-operations reports shell. No backend, no new dependency, **no analytics/BI/export engine, no charts, no finance, no score/rank.**

## Build & preview

```bash
cd academy-dashboard-discovery/app
npm install            # first time only (Playwright/axe/Tailwind already pinned)
npm run build          # SSG → public/*.html  (must end raw-key-clean; page count UNCHANGED — reports is enriched in place)
npm run serve          # static server on http://localhost:4178  (or open public/*.html directly)
```

GitHub Pages / VS Code Live Server can open `public/reports.html` directly (relative assets, no CDN).

## Route / page (after Spec 008)

| Page | AR (default) | EN | Nav | activeId |
|---|---|---|---|---|
| Reports (enriched shell) | `reports.html` | `reports.en.html` | item `reports` (already implemented — unchanged) | `reports` |

**No new page, no nav change, no dashboard change.** Source links reused: `attendance.html`, `sessions.html`, `schedule.html#view=timetable`, `courses.html`, `course.html`, `groups.html`, `group.html`, `teacher-performance.html`, `teacher.html`, `students.html`, `student.html`, `families.html`, `family.html`.

## How to review — Reports page

Open `reports.html`. Confirm: a page header («التقارير») + an honest **action cluster** (Print / Export CSV / Export PDF / Share / Schedule) + an **Academic Operations overview** (fixture count tiles + labeled report-signal chips) + **report-category cards** (Attendance & Outcomes · Sessions & Timetable · Courses & Groups · Teachers · Students & Families, each with an availability chip + a fixture summary + a real drill-down) + the **per-area summary sections** + a row of **planned/backendRequired** advanced-report cards. It must read as a calm academy operations shell — **not a BI dashboard, no charts, no finance, no score/rank**.

## How to review — academic operations overview

The overview band shows fixture **counts** (completed sessions · teacher absences · student absences · cancelled/rescheduled · groups needing attention · teachers needing follow-up · students/families needing follow-up) + labeled report-signal chips. Confirm **teacher absences and student absences are two distinct tiles**, and every number **matches the dashboard chip counts** (same fixtures).

## How to review — attendance/outcomes report section

Reuses `OUTCOME_SUMMARY` + the Spec 005 `outcome-status` chips; **teacher absent (amber) vs student absent (red) distinct**; "View attendance" → `attendance.html`. No outcome engine, no mutation.

## How to review — sessions/timetable section

Reuses `STATUS_SUMMARY` + the session status chips + `SESSIONS.total`; "View sessions" → `sessions.html`, "View timetable" → `schedule.html#view=timetable`. No scheduling engine, no calendar.

## How to review — course/group section

Reuses `GROUP_SUMMARY` + active-courses count + the `group-status` chips; "View courses" → `courses.html`, "View groups" → `groups.html`. No course/group engine.

## How to review — teacher section

Reuses `TEACHERS_NEEDING_FOLLOWUP` + teacher/student absence counts; "Teacher performance" → `teacher-performance.html`, "Teacher profile" → `teacher.html`. **No score/rank/leaderboard.**

## How to review — student/family section

Reuses the dashboard students-follow-up computation + families-attention count; "View students" → `students.html`, "View families" → `families.html`. No portal, no enrollment engine.

## How to review — report actions

Trigger Print (demo toast), Export CSV / Export PDF / Share (disabled-with-reason "requires the backend export module — out of current scope"), Schedule (confirm modal → demo toast, "no backend job created"). Confirm **nothing generates a real file, sends, schedules, or persists**.

## How to verify source links

Every `available` category card + every per-area section links to a real implemented page; planned reports are labeled `planned`/`backendRequired` cards (disabled-with-reason), **not dead `#` links**.

## How to verify no finance reports

```bash
cd academy-dashboard-discovery/app
grep -RniE 'salary|payroll|payout|invoice|revenue|accounting|compensation|currency' \
  src/js/pages/reports.js src/js/fixtures/reports.js src/js/components/report-*.js src/locales/*.rep.js && echo FAIL || echo ok
# the legacy finance 'revenue' card is removed; the disabled finance NAV items stay (not surfaced as reports)
```

## How to verify no fake analytics / charts / scores

```bash
grep -RniE 'chart|canvas|graph|leaderboard|percentile' src/js/pages/reports.js src/js/components/report-*.js && echo FAIL || echo ok
# every number on reports.html must equal an existing fixture export (matches the dashboard chips); no chart/canvas; no score/rank
```

## How to verify static HTML-first

```bash
npm run build
# View Source on public/reports.html (+ .en):
#   - full shell + category cards + overview + per-area sections + planned cards are baked
#   - NO <div id="app">; relative ./assets/ paths; no http(s)/CDN URLs
grep -L 'id="app"' public/reports.html public/reports.en.html   # both listed (no #app)
```

## How to verify no real export / persistence

Open the Network tab while clicking the actions: **no request fires** (no file download, no POST, no fetch). Export/Share are disabled; Print/Schedule are demo only.

## Verify — gates

```bash
npm run build          # clean, no raw ⟦keys⟧; page count unchanged (reports enriched in place); nav guard passes
npm run test:smoke     # baked category cards + real source links + planned-not-dead + teacherAbsent≠studentAbsent + honest actions + no finance/score/chart token + no #app
npm run test:a11y      # axe critical=0 (reports × ar light+dark, en, filter/action states)
npm run screenshots    # capture the Spec 008 reports matrix → then MANUALLY review each vs Spec 001–007 + the legacy report screens (reference only)
```

The manual screenshot review recorded in `app/screenshots/REVIEW.md` is the **final gate** — automated green is necessary but not sufficient.
