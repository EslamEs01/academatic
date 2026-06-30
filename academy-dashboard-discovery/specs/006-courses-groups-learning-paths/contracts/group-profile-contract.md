# Contract: Group Profile Page

**Status**: Binding · `public/group.html` (+ `.en`). The group (cohort/class) profile hub — a profile **banner** + **seven baked tabs** (Overview / Students / Timetable / Sessions & Outcomes / Teacher / Course / Notes). A registered SSG profile template; **NOT** a nav item. Active nav: `groups`. Realizes FR-012/FR-013/FR-014/FR-015, R45/R46/R48/R49/R50/R51, US4/US7/US8/US11/US12.

## 1. Purpose & reuse

- Give the admin a calm, tabbed operational hub for one group (cohort/class): the identity banner (name, course chip-link, teacher, level, labeled status, roster count, demo actions) + seven baked tabs covering the roster, schedule, recent outcomes, teacher detail, parent course, and notes — connecting the key academic relationships in one place. It MUST read as the same product as Specs 001–005 (warm canvas, violet `--g-violet`, `--r-card`, Tajawal) and MUST NOT read as a group-management portal or a class spreadsheet.
- It MUST compose **existing** components — the Spec 003 `tabs` widget, `scheduleAgenda` + the shared `appointmentTemplate` drawer (R29), the Spec 005 `outcomeRow` + `outcomeTemplate` (the **canonical** outcome drawer, R35), `profileBanner` (Spec 004), `chip`/`group-status.js`/`family-status.js`, `statMini`, `states`, `ui` (avatar/medallion/button), `attentionFlag`. NO new outcome-drawer builder, NO new timetable grid builder, NO new tab engine. Behavior is `enhance.js` over baked markup via `data-*` hooks only.
- **SC-009 holds:** the Spec 005 canonical `outcomeTemplate` drawer and the Spec 003 `scheduleAgenda` + `appointmentTemplate` are reused **unchanged** — zero new bespoke builders are introduced.

## 2. Page registration & active state (NOT a nav item)

- `group.html` is a **registered SSG page** (`PAGES` entry `{ base:'group', activeId:'groups', titleKey:'grp.profile.title', crumbKey:'grp.profile.crumb', render: renderGroupProfile }`) — it is **NOT** added to `NAV_CATEGORIES`.
- Its `activeId:'groups'` keeps the **`groups`** nav item active (violet pill + `aria-current="page"`) and opens the `families` category panel (which contains the promoted `groups` item).
- Reached via "view profile" `<a href>` from a `.group-row` in `groups.html`, from the course-profile Groups tab, from a student-profile enrollment group chip, or from a family-profile course/group hint — all language-aware (`group.en.html`).
- One representative `Group` fixture entity is baked as the static template; Django maps it later to `group/<id>` (per-entity URL). The breadcrumb carries «المجموعات» / "Groups" as a real `<a href="groups.html">` back-link.
- MUST NOT render any group-management portal, student portal, family portal, or any role dashboard.

## 3. Profile banner (`profileBanner`)

Reuses the Spec 004 `profileBanner` component (same component as `family.html` / `student.html`). The banner MUST present, in a calm header band (NOT a stat wall):

- **Identity** — a `medallion` in the group `accent` + the group **name** (`nameKey`, h1, the primary label) + a **course chip-link** (a real `<a href="course.html">` chip bearing the course subject/title, icon + label, always rendered and always a real `<a href>`) + the **group-status chip** via `group-status.js` (icon + label, **never numeric/color-only**) + a breadcrumb «المجموعات» back to `groups.html`.
- **Meta** — the **teacher** name + accent (subdued, inline as `metaHTML`) + the **level** chip (the cohort's `levelKey`, labeled: foundation / l1 / l2 / l3 / advanced, icon + text).
- **KPIs** — at most a few `statMini` facts from the fixture: **students** (`enrolledCount / capacity`, e.g. "8 / 10") · **upcoming sessions** count hint — display-only, tabular numerals, never finance, never fabricated.
- **Actions row** (§12) — edit / add students / view attendance / more kebab — each honest under IP8.

Long group names truncate/wrap gracefully in AR-RTL and EN-LTR.

## 4. Tabbed sections (Spec 003 tabs widget — baked, JS toggles visibility only)

- Reuses the generic Spec 003 `tabs` widget: a container `data-tabs="group-profile"`, a `role="tablist"` of `role="tab"` controls (each `data-tab="<id>"`, `aria-controls`, `aria-selected`, `data-view` token), and a baked `role="tabpanel"` (`data-tabpanel="<id>"`, `aria-labelledby`, `tabindex="0"`) **per** tab — inactive panels carry `hidden`.
- **Seven tabs**, in order: **Overview · Students · Timetable · Sessions & Outcomes · Teacher · Course · Notes**.
- **All seven panels MUST be pre-rendered complete static HTML.** `enhance.js` MUST only toggle visibility (set/remove `hidden`, flip `aria-selected`, move roving-tabindex) — it MUST NOT render, build, or fetch panel content.
- Selection persists in `localStorage['academy.schedView.group']` + the URL hash `#view=<id>` (hash wins on load, else storage, else **Overview** default). Roving-tabindex keyboard per the widget. With JS off, all panels remain reachable as anchored sections.
- Tab `data-tab` IDs (in order): `overview`, `students`, `timetable`, `outcomes`, `teacher`, `course`, `notes`. Optional tab icons: `layout-grid`, `users`, `calendar`, `clipboard-check`, `user`, `book-open`, `file-text`.

## 5. Overview tab

- **Group facts card**: course chip-link (→ `course.html`), teacher name ref, level label, schedule summary (days · time), capacity display ("8 / 10"), group-status chip — displayed as calm info rows, no editing controls.
- **Attention hint** — when `needsAttention` is set, a warm `attentionFlag` card (amber `alert-triangle` + label) at the top of the panel, distinct from the status chip.
- **Group notes preview** — the fixture `notesKey` content (first paragraph; display-only; the full notes are in the Notes tab).
- Empty fields produce no empty row. No course-management or group-management engine.

## 6. Students tab (the roster — the relationship hero)

- Lists the cohort's roster from `Group.studentIds[]` resolved via `STUDENTS` + `FAMILIES`, each as a calm row/card:
  - **Student avatar** (`accent`) + **name** (`nameKey`) → a real `<a href="student.html">` (language-aware `student.en.html`). This is the primary navigation.
  - **Family chip** — a real `<a href="family.html">` link-chip (guardian name + families icon; language-aware `family.en.html`).
  - **Lifecycle-status chip** via `family-status.js` (icon + label, never color-only).
  - **Level mini** (the student's current `levelKey`, subdued).
- **"Add student"** affordance:
  - When `statusId !== 'full'`: `data-demo-action` → demo toast.
  - When `statusId === 'full'`: `data-disabled-reason` + `data-reason-key="grp.reason.full"` — never a real enrollment mutation.
- **"Remove student"** (per-row kebab): `data-confirm` (danger) + `data-confirm-title|msg|cta|toast|danger` → demo toast on confirm. No real removal.
- A group with no students: calm "no students yet in this group" empty state, never a blank region.
- Django: `{% for s in group.students %}` → student `<a>` + family chip; lifecycle chip → `{{ s.status|family_status_chip }}`.

## 7. Timetable tab (Spec 003 reuse — no new builder)

- Reuses the Spec 003 `scheduleAgenda` component (`data-agenda`) — renders `Group.scheduleBlockIds[]` resolved to `SCHEDULE_WEEK` blocks as baked agenda markup (session time, subject, trainer avatar, room — the same fields as the family and schedule-page agendas).
- Each block opens the **ONE shared `appointmentTemplate` drawer** (`appointment-details-contract.md`) via `data-drawer="<id>"` over a baked `<template data-preview="<id>">` — the **same** drawer reused by Spec 003, the family profile, and the sessions page. No per-page drawer fork.
- A language-aware **"View in schedule"** deep-link MUST navigate to `schedule.html#view=timetable` (`schedule.en.html#view=timetable` on EN) — a real `<a href>`, no dead link, no duplicated timetable engine.
- Empty: a calm "no upcoming sessions for this group" state (never a blank tab).
- NO new timetable grid builder, NO new schedule engine.
- Django: `{% for block in group.schedule %}` + the shared `{% include "admin/_appointment_details.html" %}`.

## 8. Sessions & Outcomes tab (Spec 005 reuse — no new builder)

- Reuses the Spec 005 `outcomeRow` component — renders `Group.outcomeIds[]` resolved to `SESSION_OUTCOMES` rows (each enriched with `studentId` → `STUDENTS` + `familyId` → `FAMILIES` at build time, using the same `enrich()` pattern as `attendance.js`). The rendered items are the same `.outcome-row` list-card hybrid as the Attendance page.
- An optional calm **outcome summary hint** (counts of attended / absent / cancelled from `GroupOutcomeSignal.counts`, icon + label, display-only) MAY appear above the rows — NOT a stat wall, NOT filter controls (filtering belongs to the Attendance page).
- Each row has a kebab `data-row-menu="<id>"` → "view" `data-drawer="<id>"` → the **SAME canonical `outcomeTemplate` drawer** (Spec 005, `outcome-details-contract.md`) baked as `<template data-preview="<id>">` on this page. The drawer MUST be the identical `outcomeTemplate` function from `outcome-details.js` — no per-page fork, no bespoke drawer.
- The outcome chip on each row resolves through the **same** `OUTCOME_STATUS` map (`outcome-status.js`, Spec 005) — never numeric or color-only.
- A language-aware **"View attendance"** deep-link navigates to `attendance.html` (`attendance.en.html` on EN) — a real `<a href>`, no dead link.
- Empty: a calm "no sessions recorded yet for this group" state (never a blank tab).
- NO new outcome-drawer builder, NO attendance mutation, NO attendance engine.
- Django: `{% for o in group.outcomes %}` + the shared `{% include "admin/_outcome_details.html" %}`.

## 9. Teacher tab

- **Teacher card**: teacher `medallion`/avatar (`accent`) + full name (`nameKey`) + subject chip(s) + availability/status chip (reusing the Spec 002 teacher availability vocabulary; icon + label, never color-only) + contact placeholder (display-only, no real `tel:`/`mailto:` integration).
- **"View in teachers"** — a real `<a href="teachers.html">` (language-aware `teachers.en.html`) to the teachers directory. A direct teacher-profile link is optional/future; if absent, link to `teachers.html` or omit with no dead control.
- **"Change teacher"** — `data-disabled-reason` + `data-reason-key="grp.reason.assign"` (requires the assignment engine; disabled with a visible reason). Never a dead button.
- Django: `group.teacher` resolves via `teacherId` → `TEACHERS`.

## 10. Course tab

- **Course info card**: course subject/title (`titleKey`) + level chip + course-status chip (via the extended `COURSE_STATUS` map: `active / draft / paused / archived`; icon + label, never color-only) + display counts (enrolled students count, groups count, upcoming sessions count) — calm info rows, display-only.
- **"View course profile"** — a real `<a href="course.html">` (language-aware `course.en.html`). This is the primary navigation off this tab.
- Django: `group.course` resolves via `courseId` → `COURSES`.

## 11. Notes tab

- Display-only group notes from fixture `notesKey` (a calm multi-line text block; no truncation here unlike the Overview preview).
- **"Edit notes"** — `data-demo-action` → demo toast. No persistence.
- Empty: "no notes yet for this group" calm state, never a blank tab.

## 12. Profile actions (demo / confirm / disabled — IP8/IP9)

Per data-model §16 `GroupAction` and R51:

| Action | Kind | Hook |
|---|---|---|
| **Edit** | `demo` | `data-demo-action` + `data-toast` (key `grp.toast.edit`) |
| **Add students** (active/trial/paused group) | `demo` | `data-demo-action` + `data-toast` (key `grp.toast.addStudents`) |
| **Add students** (full group) | `disabledReason` | `data-disabled-reason` + `data-reason-key="grp.reason.full"` |
| **Remove student** (per-row) | `confirmDemo` danger | `data-confirm` + `data-confirm-title\|msg\|cta\|toast\|danger` → demo toast |
| **Assign teacher** | `disabledReason` | `data-disabled-reason` + `data-reason-key="grp.reason.assign"` |
| **View attendance** | `link` | Real `<a href="attendance.html">` (language-aware deep-link) |
| **Open timetable** | `link` | Real `<a href="schedule.html#view=timetable">` (language-aware deep-link) |
| **Print / export summary** | `disabledReason` | `data-disabled-reason` + `data-reason-key="grp.reason.export"` |

**No action writes state; no persistence, no mutation, no notification, no enrollment, no scheduling change, no attendance mutation.** Every control is honest under IP8: navigate in-scope / open overlay / demo-with-toast / confirm→demo / disabled-with-reason. No dead controls anywhere on the page.

## 13. States & responsive

- Each tab panel MUST show its **own** calm empty state (no students / no sessions / no schedule / no notes) — never a blank panel.
- Page-level **loading** skeleton (banner + tab skeleton) + **error + retry** reuse the Spec 001 `states` patterns.
- **Responsive**: the banner stacks vertically (avatar above name on narrow viewports); the tablist wraps or scrolls below the breakpoint (no overflow); the student roster rows stack to single-column cards; the agenda blocks stack to single-column; outcome rows reflow to cards (the Spec 005 pattern); the shared appointment and outcome drawers are full-height on mobile. No horizontal overflow at any viewport width.

## 14. `data-*` hooks (exact, reuse only — no invention)

- Tabs: `data-tabs="group-profile"`, `data-tab="overview|students|timetable|outcomes|teacher|course|notes"`, `data-tabpanel="<same>"`, `data-view` (hash/persistence token).
- Students roster: per-row `data-row`.
- Timetable agenda: `data-agenda`; per block `data-row`; drawer: `data-drawer="<id>"`, `data-preview="<id>"`, `data-sheet-close`.
- Sessions & Outcomes rows: per-row `data-row` (+ `data-outcome|data-day|data-teacher|data-family|data-subject` carried for potential future narrowing on the Attendance page); drawer: `data-drawer="<id>"`, `data-preview="<id>"`, `data-sheet-close`.
- Actions: `data-demo-action`, `data-confirm` (+ `data-confirm-title|msg|cta|toast|danger`), `data-disabled-reason`/`data-reason-key`, `data-toast`.
- All navigation affordances (`student.html`, `family.html`, `course.html`, `groups.html`, `teachers.html`, `schedule.html#view=timetable`, `attendance.html`) are real `<a href>` (NOT hooks). **No JS-generated ids/classes; no invented hooks.**

## 15. Static-HTML-first & Django mapping

- `group.html` MUST be a **complete pre-rendered** static file in `public/` — full shell + banner + **all seven** baked tab panels (Overview/Students/Timetable/Sessions&Outcomes/Teacher/Course/Notes) + every `scheduleAgenda` block + every `.outcome-row` + every `<template data-preview>` outcome drawer (canonical `outcomeTemplate`) + every `<template data-preview>` appointment drawer (shared `appointmentTemplate`) as real baked markup; **no `<div id="app">`**, no JS-built page DOM. Relative `./assets/` paths; per-language pages (`group.html` ar/rtl default + `group.en.html` en/ltr); `.nojekyll`; **zero external/CDN requests**; no chart/table/form/calendar library.
- Django mapping:
  - Profile template → `templates/admin/group.html` mapped to `group/<id>`;
  - Banner → context variables (`group.name`, `group.course`, `group.teacher`, `group.status`, `group.enrolled_count`, `group.capacity`);
  - Tabs → static panels rendered unconditionally (all visible to the server), with `{% if view == 'students' %}` used to set `aria-selected` and `hidden` correctly in the initial server-rendered state;
  - Students → `{% for s in group.students %}` + student `<a>` + family chip;
  - Timetable → `{% for block in group.schedule %}` + the shared `{% include "admin/_appointment_details.html" %}`;
  - Outcomes → `{% for o in group.outcomes %}` + the shared `{% include "admin/_outcome_details.html" %}`;
  - Status chips → `{{ group.status|group_status_chip }}`, `{{ s.status|family_status_chip }}`, `{{ o.outcome|outcome_chip }}` template tags;
  - Actions → `data-*` attributes rendered server-side with the same honesty flags (same hooks, same disabled-reason keys, no new server action).

## 16. Fixture binding

- One representative `Group` from `GROUPS` (chosen to cover: `needsAttention` example with at least one outcome row needing follow-up; at least 3 enrolled students resolving to distinct `STUDENTS` + `FAMILIES`; at least 2 `SCHEDULE_WEEK` blocks; all `id` references resolve at build time to existing fixtures).
- Students resolved via `STUDENTS` + `FAMILIES`; teacher via `TEACHERS`; course via `COURSES`; schedule blocks via `SCHEDULE_WEEK`; outcome rows via `SESSION_OUTCOMES` (with the same `enrich()` student/family resolution as `attendance.js`).
- Every `id` in the baked page resolves at build time; no unresolved `null` or placeholder id renders.

## 17. Edge cases (binding)

- **`full` group** — banner status chip shows "ممتلئة/Full" (icon+text, never color-only); "add students" is `data-disabled-reason` with the `grp.reason.full` key; all other controls remain available.
- **0 enrolled students** — Students tab shows "no students yet" calm empty state; banner KPI shows "0 / N" gracefully.
- **Group with no recorded outcomes** — Sessions & Outcomes tab shows "no sessions recorded yet" calm empty state; the optional summary hint shows zero counts gracefully.
- **Group with no schedule blocks** — Timetable tab shows "no upcoming sessions for this group" calm empty state; the "View in schedule" deep-link still renders as a real `<a href>`.
- **`trial` group** — labeled "تجريبية/Trial" (sparkles icon + text) in the banner + everywhere; never distinguished by color alone.
- **`needsAttention`** — amber `attentionFlag` appears in the banner meta and the Overview tab; never the primary status; never color-only.
- **Long names** — group name, course title, and teacher name truncate/wrap gracefully in AR-RTL and EN-LTR; no content clipped without an indicator.
- **Theme switch** — all chips, drawers, agenda blocks, and outcome rows re-theme (Light↔Dark↔System) without layout shift.
- **English page** (`group.en.html`) — all text in LTR; all in-page links point to `.en.html` equivalents (`student.en.html`, `family.en.html`, `course.en.html`, `groups.en.html`, `schedule.en.html#view=timetable`, `attendance.en.html`); no RTL layout artifacts.

## 18. Enforcement & cross-references

- **Smoke** (`tests/smoke/run.cjs`): `group` is in `PAGES` with `activeId:'groups'`; the banner carries a **course chip-link** (real `<a href="course.html">`), a **labeled group-status chip** (icon + text, never bare color), and a **students count** statMini; the tablist has **exactly 7 tabs** with **exactly one** visible panel on load; switching a tab shows exactly one panel at a time; the Students tab has student rows with `<a href="student.html">` and family chips with `<a href="family.html">`; the Timetable tab has `[data-agenda]` markup + a real `<a href="schedule.html#view=timetable">`; the Sessions & Outcomes tab has `.outcome-row` items + `<template data-preview>` outcome drawers + a real `<a href="attendance.html">`; opening an outcome row's kebab-view triggers the canonical `outcomeTemplate` drawer (not a bespoke modal); the Course tab has a real `<a href="course.html">`; no `id="app"`; relative assets; no dead controls; no portals in DOM; axe critical = 0.
- **axe**: critical violations = **0**; all tabs keyboard-operable (roving tabindex, Home/End); all drawers closeable via keyboard (`data-sheet-close`); no aria violations.
- **Screenshots** (`tests/screenshots/capture.cjs`): Group profile **AR-RTL light desktop** (Overview tab default) + a **Sessions & Outcomes tab frame** (outcome rows visible + drawer-linkage evident) + a **Timetable tab frame** (agenda blocks + schedule deep-link) — verdicts appended to `app/screenshots/REVIEW.md`.
- Binds to `groups-page-contract.md` (the "view profile" origin), `course-group-actions-contract.md` (full demo action set), the Spec 005 `outcome-details-contract.md` (the canonical drawer, **reused unchanged**), the Spec 003 `appointment-details-contract.md` (the shared appointment drawer), the Spec 003 `schedule-tabs-contract.md` (tabs widget pattern), the Spec 004 `student-profile-contract.md` + `family-profile-contract.md` (the student/family link targets), `static-html-django-ready-contract.md`, `screenshot-acceptance.md`, and `scope-guard.md`. The Spec 002 `interaction-patterns-contract.md` (IP5/IP6/IP8/IP9) + `navigation-ia-contract.md` (NI11/NI12) remain in force.
