# Research — Spec 006: Courses, Groups and Learning Paths Deep Experience

Phase 0 decisions. Continues the project R-series (Spec 003 = R11–R19, Spec 004 = R20–R31, Spec 005 = R32–R43). All decisions are frontend-only, fixture-only, and reuse the implemented Spec 001–005 app. Two grounding passes informed these: the legacy academy reference (`output/combined/*-inventory.md`, `frontend-planning-deep/*`) and the current app reuse surface (`academy-dashboard-discovery/app/`).

---

## R44 — Course vs Group: the central model decision

**Decision.** A **Course** = an academic **subject offering** the academy runs (Math, Arabic, Programming…), carrying counts and a level ladder. A **Group** = a **cohort/class instance** that delivers a course: one teacher + many students + a shared schedule + sessions/outcomes. They are never collapsed. The relationship graph:

```
Course 1 ──*  Group  *── 1 Teacher
  │             │
  │ (offers)    *── *  Student   (the group roster)
  │
  *── enrollment ──*  Student     (Spec 004 student.enrollments[], optionally .groupId)
```

**Rationale.** The legacy "Course" was a 1:1 enrollment and "Material" a 2-field lookup; the app already improved on this by making `courses.html` a subject catalogue and putting the per-student enrollment inside the Spec 004 student profile. Keeping that split — and adding Groups as the cohort layer the legacy system dead-ended — is what makes the academy "academically complete" without a backend.

**Alternatives rejected.** (a) Course = enrollment (legacy literal) → duplicates Spec 004 and produces a flat per-student list, not a catalogue. (b) Folding groups into courses → loses the cohort/teacher/schedule that is the whole point.

---

## R45 — Routes & navigation

**Decision.**
- **`courses.html`** (already implemented) → **enriched** in place; stays in the `families` nav category, `status:'implemented'`.
- **`groups.html`** (+ `.en`) → NEW directory; **promote the existing planned `groups` nav item** (`families` category, `icon:'students'`, `FUTURE_ROUTES.groups='groups.html'`) to `status:'implemented', route:'groups.html'` (the NI12 planned→implemented flip from the Spec 002 navigation-IA contract). All other planned items (`familyCategories`, `scheduleSearch`, `studentResult`, `studentEvaluation`, …) stay planned.
- **`course.html`** / **`group.html`** (+ `.en`) → NEW **profile templates**, registered in the SSG but **not** nav items, with `activeId:'courses'` / `activeId:'groups'` respectively (the family.html→`activeId:'families'`, student.html→`activeId:'students'` pattern). One representative fixture entity baked each; Django later → `course/<id>`, `group/<id>`.

**Rationale.** Honors the navigation-IA contract: every `route` has `status:'implemented'`, every implemented item generates a real page, no dead links, no nav item without a page. Profile templates highlight their parent category.

**Alternatives rejected.** A `learningPath`/`curriculum` nav item → no curriculum engine is reference-backed (R47); it is a section, not a page. A separate `course`/`group` nav item → they are detail templates, not destinations.

---

## R46 — Status vocabularies & reconciliation (the three-map problem)

**Decision.** Three *distinct, labeled* (icon+text, never numeric/color-only) vocabularies, kept separate from the session-status (live/upcoming/completed/cancelled), family-lifecycle (active/trial/suspended/stopped/inactive), and outcome (attended/studentAbsent/…) maps:

| Vocabulary | Where | Values | Source |
|---|---|---|---|
| **Course status** | catalogue card + course profile banner | `active / draft / paused / archived` | EXTEND existing `COURSE_STATUS` (adds `paused`) |
| **Enrollment status** | student profile Courses tab (the student↔course link) | `active / paused / completed` (+ `trial` only if fixture-backed) | KEEP the existing local `courseStatusChip` in `student.js`; rename/relocate into a shared `enrollment-status` so it stops shadowing the catalogue map |
| **Group status** | groups directory + group profile | `active / trial / full / paused / completed` + a separate **`needsAttention` flag** | NEW `group-status.js` map |

**Rationale.** The reference encoded status as numeric URL codes (`status[0]=0..5`) — opaque. Three labeled maps with clear ownership (catalogue vs enrollment vs cohort) prevents the "duplicate status" confusion the brief warns about. The `needsAttention` flag mirrors the Spec 005 `needsFollowUp`/`makeUpSuggested` flag pattern (a flag, not a lifecycle state).

**Tone mapping (reuse existing chip tones; no new chip CSS):** course `active→completed(green) / draft→amber / paused→amber / archived→neutral`; group `active→completed / trial→upcoming(sky) / full→neutral / paused→amber / completed→neutral`; needsAttention → the amber attention flag.

**Alternatives rejected.** One mega-status map → conflates catalogue/cohort/enrollment semantics. Reusing the family-lifecycle map for groups → wrong domain, misleading labels.

---

## R47 — Learning Path: display-only, inside the course profile

**Decision.** "Learning Path" is a **display-only** section/tab inside `course.html`: the academy level ladder **foundation → l1 → l2 → l3 → advanced** as a labeled, ordered strip, with fixture per-level cohort/student counts and a certificates hint (reusing the Spec 004 certificate fixture shape). NO standalone page, NO unit/module editor, NO milestone automation, NO computed analytics.

**Rationale.** The reference has **no** curriculum/level/unit/module/milestone engine — "level" is a per-session note + age-group filter, "curriculum" is free text in a meeting report, certificates are manually requested. The honest representation is a calm orientation strip, grounded in the `levels[]` already present in the course fixture. Marking it display-only keeps the scope guard intact.

**Alternatives rejected.** A curriculum builder / progress engine → not reference-backed, violates the no-engine scope guard.

---

## R48 — Reuse map (no duplicated builders)

**Decision.** Build the new surfaces almost entirely from existing components:

| New surface | Reuses |
|---|---|
| Courses enrich + Groups directory | `cardGrid` + `directoryCard`/`dir-card` + `pageHeader`/`summaryCards` + `filterBar` + `noResults` + `medallion`/`chip`/`avatar`/`button` |
| Course/Group profiles | `profileBanner` + `tabs` + `sheetRow`/`info-card` + `confirmAction`/`button` |
| Timetable tab | Spec 003 `scheduleAgenda` + `appointmentTemplate` (the shared drawer) + `schedule.html#view=timetable` deep-link |
| Sessions & Outcomes tab | Spec 005 `outcomeRow` + `outcomeTemplate` (the **canonical** outcome drawer) + `outcomeChip` + `attendance.html` deep-link |
| Group summary tiles (optional) | Spec 005 `data-filter-set` tile→filter hook over `applyFilter` (no new hook) |
| Statuses | `status-chip`, `family-status`, `outcome-status` reused; add only `group-status.js`; extend `COURSE_STATUS` |

**No new outcome-drawer, no new timetable grid, no new filter engine** are introduced (SC-009).

**Rationale.** Specs 003/005 already own scheduling and outcomes; duplicating them would violate the "reuse, don't duplicate engines" rule and risk drift.

---

## R49 — Group ↔ schedule / sessions / outcomes mapping (fixture-only)

**Decision.** Mapping is **display-only fixture data**, explicitly NOT a foreign-key/scheduling/outcome engine:
- `Group.scheduleBlockIds[]` → resolve to `SCHEDULE_WEEK` blocks for the Timetable tab agenda.
- `Group.outcomeIds[]` (or resolve `SESSION_OUTCOMES` rows whose session belongs to the group) → the Sessions & Outcomes tab.
- `Course.groupIds[]` → the course profile Groups tab; `Course.teacherIds[]` → Teachers tab; enrolled students resolved via the union of its groups' rosters + Spec 004 enrollments.

**Rationale.** Schedule blocks today carry `subject`+`trainer.id` but no `groupId`; rather than retrofit a live FK, a fixture id-list keeps it static, baked, and Django-mappable, with every id resolving at build time.

**Alternatives rejected.** A live derive-by-subject join → fragile and implies a relationship engine; a new `groupId` on every schedule block → unnecessary mutation of Spec 003 fixtures.

---

## R50 — Fixture shape & files

**Decision.** Add one new fixture module **`src/js/fixtures/groups.js`** exporting `GROUPS` (≥6 cohorts spanning every group status + a `needsAttention` example) + helpers (`GROUP_BY_ID`, `groupsOfCourse(courseId)`, `groupsOfTeacher(teacherId)`, `groupsOfStudent(studentId)`, `GROUP_SUMMARY` counts). EXTEND **`src/js/fixtures/courses.js`**: add `groupIds[]`, `teacherIds[]`, an enriched `levels[]` (with per-level counts), `studentsCount`, `groupsCount`, `teachersCount`, an `attention?` flag, and helpers (`COURSE_BY_ID`, `courseOf(id)`). Reuse/extend the Spec 004 `STUDENT_GROUPS` seed (grp1/grp2/grp3) by superseding it from `groups.js` (or aliasing) so the student profile group chips resolve to real group profiles. Every `courseId`/`teacherId`/`studentId`/`scheduleBlockId`/`outcomeId` resolves to existing Spec 002/004/003/005 fixtures.

**Rationale.** A dedicated groups fixture keeps the cohort model clean; extending courses.js (rather than rewriting) preserves the enriched-not-replaced rule (FR-001/decision 12).

---

## R51 — Action honesty (no new engine)

**Decision.** All course/group actions reuse the existing honesty hooks: `data-demo-action`+`data-toast` (add course/group, edit, open-timetable=link, view-attendance=link, print/export summary), `data-confirm`(+`-danger`) → demo toast (remove student, archive course/group), `data-disabled-reason`+`data-reason-key` (assign teacher = real assignment engine; add students = real enrollment engine; export file = backend). No new action hook is needed. Status-gated where natural (e.g. "Add students" disabled on a `full` group with reason).

**Rationale.** Identical to the Spec 005 `gatedActions` honesty model; zero persistence/mutation.

---

## R52 — Student & family integration (light, no new tabs/portals)

**Decision.**
- **`student.js`**: in the existing Courses tab (`coursesPanel`), make each enrollment card's title link to `course.html` and its group chip link to `group.html`. No new tab.
- **`family.js`**: in the existing Overview, add ONE calm fixture "children's courses & groups" hint card (counts + a deep-link to `courses.html`/`groups.html` filtered), beside the Spec 005 attendance hint. No finance/enrollment claim, no portal.

**Rationale.** Completes the two-way navigation (student/family ↔ course/group) with the lightest possible footprint, matching the Spec 005 integration restraint.

---

## R53 — Dashboard impact (minimal)

**Decision.** ONE fixture-backed **"groups needing attention"** chip (count from `GROUP_SUMMARY.needsAttention`) folded into the EXISTING people-signal card (next to the Spec 004 students-attention + Spec 005 follow-up chips), deep-linking to `groups.html`; optionally repoint an existing dashboard quick-link to courses/groups. No new card/tile/stat wall, no fabricated analytics/finance.

**Rationale.** Mirrors the Spec 003/004/005 minimal-dashboard pattern; the people-signal card is already the connective hub.

---

## R54 — i18n, CSS, icons

**Decision.**
- **i18n**: new overlay `src/locales/ar.crs.js` + `en.crs.js` merged in `i18n.js` via `deepMerge` (the `.fam.js`/`.att.js` pattern): `nav.groups`, `topbar.title/crumb.{groups,course,group}`, `crs.*` (courses enrich + course profile + learning path), `grp.*` (groups directory + group profile), `course.status.paused`, `group.status.*`, `enroll.status.*`, action labels/toasts/reasons, dashboard `dash.groupsAttention`. Arabic «الدورات»/«المجموعات»/«تفاصيل الدورة»/«تفاصيل المجموعة»/«المسار التعليمي», English Courses/Groups/Course/Group/Learning Path. Mirror every key in both files; no raw keys.
- **CSS**: extend `app.css` with a Spec 006 `@layer` block: `.course-card`/`.group-row` reflow, `.level-ladder`/`.level-step` (the learning-path strip), `.group-meta`, profile reuse of existing `.tabs-wrap`/`.info-card`/`.people-row`; mobile reflow `@media(max-width:640px)`. Reuse existing chip/medallion/card tones — no new tone CSS.
- **Icons**: reuse vendored icons (`curricula`/`book-open`, `students`/`users`, `schedule`, `clipboard-check`, `user`, `families`); vendor any missing (`graduation-cap` for learning path, `layers` for groups, `route`/`milestone` if used) via `vendor-assets.cjs`.

---

## R55 — Tests & screenshots

**Decision.** Extend the three harnesses:
- **smoke** (`tests/smoke/run.cjs`): add `groups`, `course`, `group` to PAGES; assert — groups directory has labeled group-status chips (icon+text, all), course/group filters narrow with no-results, profile tabs baked + exactly one visible + switch, Groups tab links to `group.html`, Students link to `student.html`, family chips to `family.html`, course/group cross-links, learning-path level ladder labeled, the `groups` nav item is a real `<a>` with route (others stay «قريبًا/Soon»), no `#app`, relative paths, no dead controls, no portals.
- **a11y** (`tests/a11y/run.cjs`): add courses (add dark+EN), groups (ar light/dark + en), course + group (ar light + a tab state). Fix any critical.
- **screenshots** (`tests/screenshots/capture.cjs`): add the 15-frame Spec 006 matrix (R56 / screenshot-acceptance contract) with `variant` support for profile tabs + mobile.

---

## R56 — Screenshot matrix (15 frames)

**Decision.** Courses AR light/dark + EN; Course profile AR light (+ a Learning-Path tab frame); Groups AR light/dark; Group profile AR light (+ a Sessions&Outcomes tab frame for the attendance linkage + a Timetable frame for schedule linkage); Student Courses tab with course/group links AR light; Family course/group hint AR light; Dashboard groups-attention AR light; mobile Groups; mobile Group profile. Reviewed against the Spec 001–005 approved direction + the legacy course/group screens (product reference only). Failure conditions per the screenshot-acceptance contract.

---

## R57 — One spec vs split (the size question)

**Decision.** **KEEP as one Spec 006**, sequenced MVP-first, because the MVP path is clear and increments land without mixing engines. Sequence: (1) fixtures + status maps → (2) enriched Courses → (3) Course profile → (4) Groups directory → (5) Group profile → (6) Learning-path display → (7) timetable linkage → (8) attendance/outcome linkage → (9) student/family integration → (10) dashboard → (11) nav reconciliation → (12) static/Django + screenshots. The demoable MVP is **Courses-enrich + Groups directory + Group profile** (US1+US2+US4); Course profile + Learning Path + integrations are independent increments; nothing introduces a real engine, so no increment is entangled with another.

**Rationale.** Each surface reuses proven components and is independently testable; splitting would fragment the course↔group graph that is the whole value. The brief's default ("keep one spec only if MVP sequencing is clear and tasks land incrementally without mixing engines") is satisfied.

**Guardrail.** If, during `/speckit.tasks`, the Course-profile + Group-profile pair proves to exceed a reviewable increment, the Course profile (US3/US5) may be deferred to a Spec 006b — but the directories + Group profile MVP stay in 006.

---

## R58 — Groups summary tiles (optional, reuse the Spec 005 tile→filter hook)

**Decision.** The Groups directory MAY carry a small row of summary tiles (active / trial / needs-attention counts) that double as filters via the existing `data-filter-set` hook over `applyFilter` — no new hook, identical to the Spec 005 attendance tiles. Courses keep their existing `summaryCards` (total/active/levels). Tiles are optional polish, not required for the MVP.

---

## R59 — Constitution / scope confirmation

**Decision.** Spec 006 adds NO dependency and NO engine. It is static HTML-first (baked cards/rows/profile tabs/drawer templates, no `#app`), JS-enhancement-only via existing `data-*` hooks, per-language pre-rendered (AR default + `.en`), relative/local paths (GitHub Pages), Django-template-ready, RTL/LTR, Light/Dark/System, fixtures only. It honors every Spec 001–005 hard constraint and the scope guard (no backend/API/auth/CRUD/persistence; no course/group/enrollment/assignment/curriculum/certificate/scheduling/attendance engine; no portals/role dashboards; no chart/table/form/calendar lib; no legacy numeric statuses or copied legacy assets/classes/palette/wording).
