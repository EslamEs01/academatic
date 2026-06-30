# Quickstart — Spec 006: Courses, Groups and Learning Paths Deep Experience

Frontend-only, fixture-only. Extends the implemented Spec 001–005 app in `academy-dashboard-discovery/app/`. No backend, no new dependency.

## Build & preview

```bash
cd academy-dashboard-discovery/app
npm install            # first time only (Playwright/axe/Tailwind already pinned)
npm run build          # SSG → public/*.html  (must end raw-key-clean: "[build:html] N static pages")
npm run serve          # static server on http://localhost:4178  (or open public/*.html directly)
```

GitHub Pages / VS Code Live Server: open `public/courses.html` (or `groups.html`) directly — relative `./assets/` paths, no server required.

## Routes / pages (after Spec 006)

| Page | AR (default) | EN | Nav | activeId |
|---|---|---|---|---|
| Courses (enriched) | `courses.html` | `courses.en.html` | **implemented** (families category) | `courses` |
| Course profile | `course.html` | `course.en.html` | **not a nav item** (profile template) | `courses` |
| Groups (NEW) | `groups.html` | `groups.en.html` | **promoted** planned→implemented | `groups` |
| Group profile | `group.html` | `group.en.html` | **not a nav item** (profile template) | `groups` |

Deep-links reused: `schedule.html#view=timetable` (Spec 003), `attendance.html` (Spec 005), `student.html` / `family.html` (Spec 004).

## How to review — Courses page

Open `courses.html`. Confirm each course card shows a **labeled** status chip (active/draft/paused/archived — icon+text), the **active-students / groups / teachers** counts + an upcoming-sessions hint, an optional attention hint, and a **"View course"** link to `course.html`. Apply subject/level/status filters → rows narrow with a count; clear → all return; an empty match shows the no-results panel. The page must NOT read as a generic catalogue (counts + links are present).

## How to review — Course profile

Open `course.html`. Banner shows subject + level + labeled status + counts + demo actions. Switch tabs (exactly one visible): **Overview · Groups · Students · Teachers · Timetable · Outcomes · Learning Path · Notes**. Confirm Groups cards link to `group.html`, Students link to `student.html`, Timetable renders the shared agenda + a `schedule.html#view=timetable` link, Outcomes renders the Spec 005 outcome rows and opens the **canonical** outcome drawer + an `attendance.html` link.

## How to review — Groups page

Open `groups.html`. Confirm the **Groups** sidebar item is now a real `<a>` (active, families category) and no nav link is dead. Each group row shows the group name, a **course** link, the **teacher**, the **level**, a **schedule summary** (days · time), a **students count** ("8 / 10"), a **labeled group-status** chip (active/trial/full/paused/completed), and an attention hint. Apply course/teacher/level/day/status/attention filters (and any summary tile) → rows narrow with a count + no-results/reset. Click a group → `group.html`.

## How to review — Group profile

Open `group.html`. Banner shows the group name + a **course chip-link** + teacher + level + labeled status + students count + demo actions. Switch tabs: **Overview · Students · Timetable · Sessions & Outcomes · Teacher · Course · Notes**. Confirm the roster links to `student.html` (family chip → `family.html`), the Course tab links to `course.html`, Timetable reuses the agenda + schedule deep-link, Sessions & Outcomes reuses the outcome rows + canonical drawer + attendance deep-link.

## How to review — Learning Path

On `course.html` → Learning Path tab: a calm, **labeled, ordered level ladder** (foundation → l1 → l2 → l3 → advanced) with fixture per-level counts and a certificates hint. Confirm it is **display-only** — no "edit units"/"manage curriculum" control performs a save (any such affordance is disabled-with-reason or absent).

## How to review — timetable linkage

On either profile's Timetable tab: the Spec 003 `scheduleAgenda` renders the cohort's sessions and the "View in schedule" link opens `schedule.html#view=timetable`. No new timetable grid is introduced.

## How to review — attendance/outcome linkage

On the Group profile Sessions & Outcomes tab (and the Course profile Outcomes tab): Spec 005 outcome rows with labeled outcome chips; opening one opens the **canonical** outcome drawer (Status + Outcome, present/capacity, attribution, gated demo actions); a "View attendance" link opens `attendance.html`. No bespoke drawer.

## How to review — student/family integration

`student.html` → Courses tab: each enrollment card title links to `course.html` and its group chip links to `group.html` (no new tab). `family.html` → Overview: one calm "children's courses & groups" hint card + deep-links (no finance/enrollment claim, no portal).

## How to review — dashboard impact

`dashboard.html`: ONE fixture "groups needing attention" chip folded into the existing people-signal card, linking to `groups.html`. Confirm no new stat wall / no fabricated analytics.

## How to verify static HTML-first

```bash
npm run build
# View Source on public/groups.html, course.html, group.html (+ .en):
#   - full shell + cards/rows + EVERY tab panel + EVERY drawer <template> are baked
#   - NO <div id="app">; relative ./assets/ paths; no http(s)/CDN URLs
grep -L 'id="app"' public/{groups,course,group}.html   # all listed (none contain #app)
```

Runtime JS only switches tabs, filters pre-rendered cards/rows, opens drawers/modals, and shows demo/disabled feedback — it builds no page DOM.

## How to verify no real persistence

Trigger every course/group action: add/edit course, add/edit group, assign teacher, add/remove students, open timetable, view attendance, print/export. Each gives a **demo toast**, a **confirm→toast**, a **disabled-with-reason**, or a **real link** — and **nothing changes**: no row/roster/schedule/status mutates, no network request fires, no value persists across reload.

## Verify — gates

```bash
npm run build          # clean, no raw ⟦keys⟧
npm run test:smoke     # baked cards/rows/tabs/drawers, labeled chips, filters, real <a> nav, no #app, no dead controls, no portals
npm run test:a11y      # axe critical=0 (courses/groups/course/group × ar light+dark, en)
npm run screenshots    # capture the 15-frame Spec 006 matrix → then MANUALLY review each vs Spec 001–005
```

The **manual screenshot review** (recorded in `app/screenshots/REVIEW.md`) is the final acceptance gate, not the automated checks.
