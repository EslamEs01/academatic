# Contract: Scope Guard (Spec 006 — Courses, Groups & Learning Paths)

**Status**: Binding · What Spec 006 must NOT contain. **Extends** the Spec 002 + Spec 003 + Spec 004 + Spec 005 scope guards and reproduces the relevant lines here so it is self-contained for the courses/groups/learning-path work. Anything listed here appearing in the implementation is a defect, regardless of passing tests. References **FR-027** (no new dependency / no engine / no copied legacy) and **R59** (constitution/scope confirmation).

## G1. Forbidden — product scope (no engines, no portals, no finance)

Do NOT build or wire as real, for the courses/groups/learning-path domain:

- a **backend API** · a **database**.
- real **authentication** · real **permission enforcement**.
- real **create / edit / delete persistence** (no save/mutation of any kind — no add/edit course, no add/edit group, no assign, no enroll, no remove).
- a real **course / group / enrollment / assignment engine** — no real enroll-a-student, no real assign-a-teacher, no real add/remove-from-cohort, no roster mutation, no capacity recompute. A `full` group is a **fixture display** (`enrolledCount === capacity`), never a real capacity engine.
- a real **curriculum builder** — no unit/module/lesson/milestone editor, no progression engine, no computed level advancement. The **Learning Path** is a **display-only** labeled level ladder (`foundation → l1 → l2 → l3 → advanced`) with fixture per-level counts; the "manage curriculum" affordance is **disabled-with-reason or absent**.
- a real **certificate engine** — no issue/approve/revoke workflow, no PDF/credential generation; certificates are a **display hint only** (count + a calm "no certificates yet" state).
- a real **timetable / scheduling engine** — the course/group Timetable tab **reuses the Spec 003 `scheduleAgenda`** (display-only) + a `schedule.html#view=timetable` deep-link; no new grid builder, no slot allocation, no drag-and-drop, no FK retrofit onto schedule blocks (R49 — group↔schedule is a fixture id-list).
- a real **attendance / outcome engine** + **attendance mutation** — the course/group Sessions & Outcomes tab **reuses the Spec 005 `outcomeRow` + the canonical `outcomeTemplate` drawer** (display-only) + an `attendance.html` deep-link; no mark-attend/absent/cancel/reschedule SAVE, no roster check-in, no rollup; the legacy **numeric/11-state lifecycle** MUST NOT be imported as an engine.
- a real **teacher-performance engine** — no computed teacher KPIs/rankings on the course/group surfaces; the teacher chip/tab is a display link only.
- a real **finance / payment / invoice / billing / salary** workflow — no rates, no balance, no math, no ledger; any such action is **disabled-with-reason** ("requires the finance module — out of scope").
- a real **notifications backend** · real WhatsApp/Zoom/live integration (referenced as calm display hints / disabled-with-reason at most).

Do NOT build any **dashboards** or **portals**: student / teacher / family dashboard or portal. The `courses.html` / `groups.html` directories, the `course.html` / `group.html` profiles, and the Student/Family/Dashboard hints are **admin-facing** views of fixture data — NOT a family/student/teacher course or group portal, and MUST NOT impersonate one (no "my courses" / "my group" / login / role-switcher framing). Portals stay `future-role` (never rendered).

The legacy course/group action family is reused as a **concept only** — each action maps to honest demo feedback, never a real workflow:

| Action | Spec 006 treatment (allowed) | Forbidden as |
|---|---|---|
| Add / Edit course · Add / Edit group | `data-demo-action` → toast | a real save / create |
| Assign teacher | **disabled-with-reason** (`crs.reason.assign` / `grp.reason.assign`) | a real assignment engine |
| Add students (to a group) | `data-demo-action` → toast; **disabled-with-reason when `statusId==='full'`** (`grp.reason.full`) | a real enrollment engine / capacity mutation |
| Remove student | `data-confirm` (danger) → toast | a real roster mutation |
| Archive course / group | `data-confirm` → toast | a real lifecycle save |
| Open timetable | **real `<a>`** → `schedule.html#view=timetable` | a new scheduler |
| View attendance | **real `<a>`** → `attendance.html` | a new attendance engine |
| Print / export summary | **disabled-with-reason** (`crs.reason.export`) | a real export/backend |
| Manage curriculum | **disabled-with-reason or absent** | a real curriculum builder |

## G2. Forbidden — technology

Do NOT add:

- External **CDN** · **TypeScript** · any **SPA framework** · a bundler that pulls a framework.
- any **chart library** · any **table library** · any **form library / form builder / validation engine** · any **calendar library** · any **drag-and-drop library**.
- legacy widget libraries (select2 / flatpickr / ApexCharts / Quill / Dropzone / FullCalendar) or any remote font/script/style.

The course cards, the group rows, the labeled course/group status chips, the level ladder, the schedule-summary, the attention hints, and the reused timetable agenda + outcome drawer stay **hand-rolled SVG/CSS** — no chart/widget library. Filtering is the existing **client-side `applyFilter`** over pre-rendered cards/rows (the optional group tiles use the existing `data-filter-set` shim), **NOT a new client-side filter engine**.

## G3. Forbidden — architecture regressions

Do NOT regress the static HTML-first architecture (see Spec 004/005 `static-html-django-ready-contract.md`):

- no **JS-rendered whole-page mount**; no `<div id="app">`.
- no runtime JS building page DOM — **every** course `.course-card`, **every** `.group-row`, **every** profile tab panel (8 on `course.html`, 7 on `group.html`), the **`.level-ladder`** + every `.level-step`, the summary counts/tiles, and **every** `<template data-preview>` drawer are **baked** static HTML.
- no **JS-computed count** (course `studentsCount`/`groupsCount`/`teachersCount`, the dashboard groups-attention count, a tile count) — counts are **baked** at build; JS only **clones** baked templates + **toggles** card/row/tab visibility + re-runs `applyFilter`.
- no absolute root asset paths; no SPA routing; no JS-generated ids/classes Django can't reproduce.
- no **second outcome drawer** and no **new timetable grid** (per-page bespoke) — reuse the one canonical `outcomeTemplate` (Spec 005) and the one `scheduleAgenda` (Spec 003) (SC-009).
- `course.html` / `group.html` are **baked template instances** (one representative each), not runtime-routed; they highlight their parent nav category and are **not** nav items.

## G4. Forbidden — legacy reuse

Do NOT copy from the old academatic system:

- logo / favicon / brand assets; pixel-for-pixel legacy layout.
- legacy colors/tokens — purple `rgb(94,77,126)`, amber `rgb(248,194,10)`, pink `rgb(255,102,146)`, and the rest.
- Bootstrap modal/offcanvas/grid structure or old CSS classes; old icon sets (tabler / Font Awesome); legacy widget libraries.
- **the numeric `status=0..N` codes** (the legacy group `status[0]=0..5` / course numeric codes) — replaced by the NEW labeled **course-status** and **group-status** maps, never numeric/color-only.
- the legacy "Course = a 1:1 enrollment" flat list (Spec 006 keeps the **subject-offering catalogue**; the per-student enrollment stays on the Spec 004 student profile, only *linked* here).
- the **route-per-status / variant-URL** wall (one stateful filtered directory replaces it for both Courses and Groups).
- any private/academy-specific wording, names, "Material"/"Level"/"Curriculum" free-text fields, or data.

The old system is **product/UX reference only** (structure, not visuals). The improvements over it are mandatory, not optional: labeled chips replace numeric statuses; a real Group **directory + profile** replaces the dead-ended legacy Group (zero rows / no detail page / no reverse link); the course gains the **group/teacher/schedule/outcomes relationships** the legacy course lacked; one canonical outcome drawer + one schedule agenda are reused, never re-built.

## G5. Allowed in Spec 006

Explicitly permitted (fixtures only, no engines):

- Static fixtures: a new **`src/js/fixtures/groups.js`** = `GROUPS` (≥6 cohorts spanning every group status + a `needsAttention` example) + helpers (`GROUP_BY_ID`, `groupsOfCourse`, `groupsOfTeacher`, `groupsOfStudent`, `GROUP_SUMMARY`); **extensions** to `src/js/fixtures/courses.js` (`groupIds[]`, `teacherIds[]`, enriched `levels[]` with counts, `studentsCount`/`groupsCount`/`teachersCount`/`upcomingCount`, `attention?`, `COURSE_BY_ID`/`courseOf`). Every `courseId`/`teacherId`/`studentId`/`scheduleBlockId`/`outcomeId` resolves to existing Spec 002/003/004/005 fixtures.
- The NEW labeled **group-status map** (`group-status.js` → `{tone, icon, labelKey}` for active/trial/full/paused/completed + the separate `needsAttention` flag, AA-contrast, **never numeric/color-only**) — distinct from the session-status, family-lifecycle, and outcome maps; and the **EXTENDED `COURSE_STATUS`** (adds `paused`).
- The reconciled **`enrollment-status`** map (active/paused/completed) relocated from the local `student.js` `courseStatusChip` so it no longer shadows the catalogue course-status — used only on the student Courses tab.
- The display-only **Learning Path** level ladder (reusing the `foundation/l1/l2/l3/advanced` vocabulary + the Spec 004 certificate fixture shape) inside `course.html` — a calm strip, no editor.
- **Reuse, not rebuild**: the Spec 003 `scheduleAgenda` + `appointmentTemplate` for the Timetable tabs (+ `schedule.html#view=timetable` deep-link); the Spec 005 `outcomeRow` + the **canonical** `outcomeTemplate` outcome drawer + `outcomeChip` for the Sessions & Outcomes tabs (+ `attendance.html` deep-link); `cardGrid`/`directoryCard`/`filterBar`/`noResults`/`profileBanner`/`tabs`/`status-chip`.
- The existing `data-*` hooks only: `data-demo-action` + `data-toast`, `data-confirm` (+ `-danger`), `data-disabled-reason` + `data-reason-key`, `data-tab` / `#view=`, `data-drawer` / `data-row-menu`, `data-filter` / `data-filter-set`. **No new action hook** (no `data-enroll`, `data-assign`, `data-save-group`, `data-create-course`).
- **Demo actions with toast feedback**; **confirm-modal → demo toast** for destructive actions (remove student / archive); **disabled-with-reason** controls (assign teacher / add students on a `full` group / print-export); **real `<a>` links** for implemented destinations (course/group/student/family/schedule/attendance). Status-gated like Spec 005 `gatedActions`.
- `localStorage` for theme / language / sidebar-rail / nav-category — the directory **filter selection + open drawer/tab are transient** (not persisted).
- **Fixture-only** integrations: Student Courses tab (course/group links) · Family Overview (one course/group hint + deep-link) · Dashboard (one groups-attention chip folded into the people-signal card).
- Playwright / axe tests extending the existing harness.

## G6. Future role surfaces stay out

Student / Teacher / Family **profiles-as-portals, dashboards, and portals** stay out of scope (`future-role`, never rendered). When later specified they must feel cheerful, comfortable, simple, warm, human, and calming — **not** this admin courses/groups UI. The admin directories/profiles + the profile hints do not count as portals and MUST NOT drift into one. In particular: no "my courses"/"my group"/"my child's group" view, no parent/student/teacher login, no role switcher, and no `teacher-portal`/`family-portal`/`student-portal` id anywhere in the rendered DOM.

## G6b. Spec 006 IS the approved spec for these surfaces

Promoting the **existing planned `groups`** nav item → `groups.html` in its current category (flipping `status:'planned'`/`FUTURE_ROUTES.groups` to `status:'implemented', route:'groups.html'` — the NI12 planned→implemented flip from the Spec 002 navigation-IA contract) is authorized **by this approved spec** (R45, FR-009) — Spec 006 IS that spec. **`courses.html`** is already implemented and is **enriched in place** (not re-promoted). **`course.html` / `group.html`** are **profile templates** registered in the SSG with `activeId:'courses'` / `activeId:'groups'`, **not** nav items. **Every other** planned item (`familyCategories`, `scheduleSearch`, `studentResult`, `studentEvaluation`, `sessionsAnalysis`, and the rest) stays **planned («قريبًا/Soon»)** with zero functionality beyond a toast; promoting any of them requires **its own** future approved spec — not this one. The Student/Family/Dashboard integrations are satisfied **in-place** (a link / a hint / a chip / a deep-link), **not** as new nav pages, and add **no** new profile template beyond `course.html` / `group.html`.

## G7. Admin-frontend-only

Spec 006 is an **admin frontend** feature: fixtures-only course/group directories + profiles + a display-only learning path + light integrations reusing the Spec 001/002/003/004/005 shell, tokens, components, and `data-*` vocabulary. No backend, no API, no auth/permissions, no persistence, no engines, no finance/credit — and **no** student/teacher/family portal or role dashboard. The standing invariants hold on every Spec 006 surface:

- every interactive control is functional / navigational / overlay / tab / filter / demo / confirm→demo / disabled-with-reason (**no dead buttons**);
- **no raw i18n keys**; **zero external/CDN requests**;
- course/group status + attention + level steps are **never color-only** (always icon + label);
- correct in **Arabic RTL + English LTR** and **Light / Dark / System**; responsive with no horizontal overflow; axe critical = 0.

## G8. Grep-able anti-patterns (any hit = investigate / likely defect)

- `id="app"` / `getElementById('app')` / `#app` whole-page mount → G3.
- `status=0` … `status=5` / `/status/` numeric codes / `course === 1` / `group === 2` → G4 (numeric statuses).
- `rgb(94,77,126)` / `rgb(248,194,10)` / `rgb(255,102,146)` / `#5e4d7e` / `#f8c20a` / `#ff6692` → G4 (legacy palette).
- `bootstrap` / `select2` / `flatpickr` / `apexcharts` / `quill` / `dropzone` / `fullcalendar` / `cdn.` / `https://` in an asset ref → G2 (library / CDN).
- `fetch(` / `XMLHttpRequest` / `axios` / `.save(` / `localStorage.setItem('group` / `localStorage.setItem('course` / `localStorage.setItem('enroll` / `POST` for an action → G1 (real persistence / mutation).
- `new Chart(` / `<canvas` for a metric / a `<table>` table-library widget / a calendar widget → G2.
- `teacher-portal` / `family-portal` / `student-portal` / "my course" / "my group" / role switcher in the DOM → G1/G6.
- a **second** outcome drawer template OR a **new** timetable grid (a per-page bespoke builder) instead of the canonical `outcomeTemplate` / the shared `scheduleAgenda` → G3 (SC-009).
- a **curriculum builder**: `unit` / `module` / `milestone` / `lesson` editor, a `data-add-unit`, a progress-recompute → G1 (no curriculum engine).
- a **certificate engine**: `issueCertificate` / `approveCertificate` / cert PDF generation → G1.
- finance/capacity math (`balance`, `credit -=`, `salary`, `rate *`, `capacity++`, invoice totals) → G1 (finance / capacity engine).
- a runtime-built count (`card.textContent = count`, `tile.textContent = count`) instead of a baked count → G3.
- a **new `data-*` action hook** beyond the existing set (e.g. `data-enroll`, `data-assign-teacher`, `data-save-group`, `data-create-course`, `data-add-student`) → G1/G3 (no new engine/hook).
- `course.html` / `group.html` flipped to a **nav item**, or any other `control`/`families` planned item flipped to `implemented` besides `groups` → G6b.
- a new student/family **course or group tab** on a profile (instead of links + a hint) → G6b/scope creep.
- a per-cohort **enrollment roster engine / checkbox grid** (instead of a display-only roster + `enrolledCount/capacity`) → G1 (no enrollment engine).

### G8a. The concrete grep AUDIT (commands + expected results)

Run from `academy-dashboard-discovery/app/`. Each command MUST print **nothing** (zero hits) unless an exception is noted.

```bash
# 1) No whole-page mount (expect: 0 lines)
grep -rn 'id="app"\|getElementById(.app.)\|#app\b' src public --include='*.js' --include='*.html'

# 2) No legacy numeric statuses (expect: 0 lines)
grep -rnE 'status=[0-5]\b|status\[0\]=|=== ?[0-9] ?// ?status|course === [0-9]|group === [0-9]' src public

# 3) No legacy palette (expect: 0 lines)
grep -rniE 'rgb\(94, ?77, ?126\)|rgb\(248, ?194, ?10\)|rgb\(255, ?102, ?146\)|#5e4d7e|#f8c20a|#ff6692' src public

# 4) No CDN / external asset / library (expect: 0 lines)
grep -rniE 'bootstrap|select2|flatpickr|apexcharts|quill|dropzone|fullcalendar|cdn\.|https?://[^"'"'"']*\.(js|css|woff2?)' src public --include='*.js' --include='*.html' --include='*.css'

# 5) No real persistence / mutation / network (expect: 0 lines)
grep -rnE 'fetch\(|XMLHttpRequest|axios|\.save\(|localStorage\.setItem\(.(group|course|enroll)|method:\s*.POST' src

# 6) No portals / role framing (expect: 0 lines)
grep -rniE 'teacher-portal|family-portal|student-portal|my (course|group)|role-switch' src public

# 7) No new action hooks beyond the allowed set (expect: 0 lines)
grep -rnoE 'data-(enroll|assign-teacher|save-group|create-course|add-student|add-unit)' src public

# 8) No curriculum / certificate / capacity engine (expect: 0 lines)
grep -rnE 'issueCertificate|approveCertificate|addUnit|addModule|addMilestone|capacity\+\+|credit -=|rate \*' src

# 9) Exactly ONE outcome drawer template + ONE timetable builder reused, none bespoke
#    (expect: the Spec 005 outcomeTemplate + Spec 003 scheduleAgenda referenced, NO new *Drawer/*Grid builder defined under course/group)
grep -rnE 'outcomeTemplate|scheduleAgenda' src/js   # expect: references (reuse), not redefinitions
grep -rniE 'function (course|group)[A-Za-z]*Drawer|function (course|group)[A-Za-z]*Grid' src/js   # expect: 0 lines

# 10) Only `groups` is promoted; course/group are templates not nav items (expect: 0 violations)
grep -rn "route: ?'groups.html'" src/js   # expect: exactly the groups nav item flipped to implemented
grep -rnE "nav.*(course\.html|group\.html)" src/js   # expect: 0 lines (profile templates, never nav items)
```

A non-empty result on any zero-expected command is a defect to investigate before acceptance.

## G8b. The one-line tests

A reviewer can sanity-check Spec 006 scope with six questions; a "no" to any is a defect:

1. Are the Courses cards, the Groups `.group-row`s, **every** profile tab panel, the level ladder, and **every** `<template data-preview>` drawer fully present in **View Source with JS off**?
2. Does the **course↔group↔students↔teacher↔schedule↔outcomes** graph resolve through **real `<a>` links** to baked pages / the canonical drawer — with **zero** dead links or dead controls?
3. Does every course/group action **toast / confirm→toast / disable-with-reason** — and **nothing** persist, create, enroll, assign, remove, schedule, or touch curriculum/certificate/finance?
4. Is every course/group status a **labeled chip (icon + text)** — never a numeric code (`status=0..5`) and never color-only — and is the Learning Path a **display-only** ladder (no unit/module editor)?
5. Is **`groups`** the only promoted nav item, with `course.html`/`group.html` as profile templates (not nav items) and every other planned item still «قريبًا/Soon»?
6. Are the Spec 005 outcome drawer and the Spec 003 schedule agenda **reused unchanged** (zero new bespoke drawer/grid), with **zero** external requests and **zero** chart/table/form/calendar libraries loaded?

## G9. Enforcement

`no-external-request` test (G2, also guarantees no chart/table/form/calendar library loads); HTML-structure + no-`id="app"` checks asserting baked course cards (with baked counts + `course.html` link), baked `.group-row`s (labeled group-status chip + `group.html` link), the profile tablists (exactly one visible panel; 8 course tabs / 7 group tabs), the baked `.level-ladder`, and the **reused** baked `<template data-preview>` drawers (G3); code/asset + status-vocabulary review (G4 — no numeric statuses, no legacy classes/palette/wording, the grep AUDIT of G8/G8a); the smoke no-dead-button / no-raw-i18n-key / filter-narrows / tab-switch-one-visible / drawer-opens-canonical / confirm-then-toast / disabled-with-reason / no-portal-in-DOM tests; the NI12 nav guard (`groups` is a real `<a>` with a route, exactly one active item per page, `course`/`group` not nav items, every other planned item stays Soon, no dead link); and screenshot review against the failure conditions (generic course catalogue, generic class spreadsheet, missing course/group relationship, missing students/teachers/schedule relationship, missing profile/detail experience, missing demo/disabled actions, dead links, copied legacy visuals / numeric statuses, raw keys, poor dark mode, broken RTL/LTR, JS-rendered whole page, claims real enrollment/course persistence, hard to Djangoify, bespoke drawer/grid, new stat wall, >1 nav category panel = fail). This contract does NOT run `/speckit.tasks` or implement anything.
