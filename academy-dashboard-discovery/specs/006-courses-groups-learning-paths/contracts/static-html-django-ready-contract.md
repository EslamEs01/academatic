# Contract: Static HTML-first / GitHub Pages / Django-ready (Courses, Groups and Learning Paths)

**Status**: Binding · Spec 006 EXTENDS the Spec 002/003/004/005 delivery architecture to the new course/group surfaces — an enriched Courses directory, a new Groups directory (summary tiles + filter bar + every `.group-row`), a Course profile (banner + eight baked tabs), a Group profile (banner + seven baked tabs), the display-only Learning Path section, and the light fixture-only Courses/Groups integrations on Sessions/Student/Family/Dashboard — all complete markup at build time. This is the non-negotiable structural contract for Spec 006; it is self-contained and supersedes nothing it does not name. Where any description disagrees with the static-HTML-first / no-new-hook / Django-ready rules below, **this contract wins**.

---

## SD0. Scope of this contract

This contract governs the **delivery structure** of the Spec 006 surfaces — how the four new/enriched pages (`courses.html` enriched, `groups.html`, `course.html`, `group.html`, each + `.en.html`) are baked, what `enhance.js` may and may not do, and how each maps to a Django template. It does not redefine the IA (`navigation-impact-contract.md`) or the visual acceptance; it is the binding **architecture** gate.

---

## SD1. Static HTML-first (every Spec 006 surface is complete at build time)

1.1. Every Spec 006 page — the enriched `courses.html`, new `groups.html`, new `course.html`, new `group.html` (each + its `.en.html`) — MUST be **pre-rendered to a complete static HTML file** in `app/public/` by the SSG (`scripts/build-html.mjs`): the full shell (category rail + families panel + topbar + page header) **and** all page content are real markup in the file.

1.2. **No whole-page `<div id="app">` mount.** No runtime JavaScript builds the page DOM, assembles a `.group-row`, populates a profile tab panel, computes a fixture count, fills a level-ladder strip, or populates an outcome drawer body. Every count is baked from the fixture at build time.

1.3. Verified by a structure check (SD13): each new page contains the sidebar, topbar, page header, the content specific to that page (rows / tabs / level ladder / drawers), and ZERO `id="app"` whole-page mounts.

1.4. With JavaScript disabled, every group row, every course card, every profile tab panel, and every `<template data-preview>` drawer MUST be visible in View Source as real static markup.

---

## SD2. The enriched Courses directory is BAKED (`courses.html`)

2.1. The Courses directory MUST be **regenerated** with an enriched `renderCourses` function; the existing card-grid / filter / no-results structure is preserved and extended — no structural replacement:

- Each course card MUST add: **active-students count**, **groups count**, **teachers count**, **upcoming-sessions hint**, a labeled **CourseStatus chip** (icon + text, never numeric or color-only; `active / draft / paused / archived`), and a "View course" link to `course.html` — all baked from the `COURSES.rows` fixture enriched with the Spec 006 fields (`studentsCount`, `groupsCount`, `teachersCount`, `upcomingCount`, `attention?`; data-model §1).

2.2. Each card MUST bake its **facet attributes** for the existing filter engine (`data-row` + `data-subject` / `data-level` / `data-status`) and a fixture-backed attention hint only where the fixture supports it (no fabricated metric; FR-002).

2.3. The filter bar MUST support **subject**, **level**, and **status** facets with a visible result count, a no-results panel with a reset, and an empty-data panel — all baked; `enhance.js` only shows/hides pre-rendered rows.

2.4. The "View course" link (`<a href="./course.html">`) MUST be a real anchor to the baked profile template (not `#`); no dead link.

---

## SD3. The Groups directory is BAKED (`groups.html`)

3.1. The Groups directory MUST ship as complete baked markup: a **page header**; optional **summary tiles** (active / trial / needs-attention counts from `GROUP_SUMMARY`, each tile carrying a `data-filter-set` hook — reusing the Spec 005 tile→filter pattern, no new hook); a persistent **filter bar** (course / teacher / level / day / status / attention); and every `.group-row` present in the file at build time (FR-010).

3.2. Each `.group-row` MUST bake:
- group name, a **course chip-link** to `course.html`, **teacher name**, **level**, **schedule summary** (days · time), **students count**, a labeled **GroupStatus chip** (icon + text, `active / trial / full / paused / completed`; never numeric or color-only), and an optional attention/outcome hint from the fixture.
- Its **facet attributes**: `data-row` + `data-course` / `data-teacher` / `data-level` / `data-day` / `data-status` / `data-attention`.
- A "View group" link → `group.html`.

3.3. The warm **empty / no-results / loading / error** states MUST be baked as static markup; `enhance.js` toggles their visibility — it does not construct them at runtime.

3.4. Every link in a `.group-row` (course chip → `course.html`, "View group" → `group.html`) MUST be a real relative anchor; no dead link.

---

## SD4. The Course profile is BAKED — all eight tab panels (`course.html`)

4.1. The Course profile (`course.html` + `course.en.html`) MUST ship with:
- A **profile banner**: subject, level, labeled CourseStatus chip, the three academic counts (students / groups / teachers), and a demo-action cluster — all baked from the representative fixture.
- **Eight** tab panels baked into static HTML: **Overview**, **Groups**, **Students**, **Teachers**, **Timetable**, **Outcomes**, **Learning Path**, **Notes** (FR-005).
- Exactly **one** panel visible on load (the first tab, Overview); the remaining seven panels are present in markup but hidden (`hidden` attribute or equivalent); `data-tab` / `data-tabpanel` hooks let `enhance.js` switch them without building any DOM.

4.2. **Groups tab** — every cohort row MUST be baked with: group name (linking to `group.html`), teacher, level, schedule summary, students count, and a labeled GroupStatus chip. No runtime group lookup (FR-006).

4.3. **Students tab** — every enrolled student row MUST be baked with: name (linking to `student.html`), family chip (linking to `family.html`), level, and EnrollmentStatus chip. No runtime student lookup.

4.4. **Teachers tab** — every assigned teacher row MUST be baked with: name, subject accent, and availability hint. No runtime lookup.

4.5. **Timetable tab** — MUST reuse the Spec 003 `scheduleAgenda` component unchanged, rendering the course's fixture schedule blocks, plus a "View in schedule" deep-link (`<a href="./schedule.html#view=timetable">`). No duplicated agenda builder; no scheduling engine (FR-007).

4.6. **Outcomes tab** — MUST reuse the Spec 005 `outcomeRow` pattern and the **canonical `outcomeTemplate` drawer** (SD6 of this contract) unchanged, rendering the course's fixture outcome rows, plus a "View attendance" deep-link (`<a href="./attendance.html">`). No bespoke outcome drawer; no attendance engine (FR-007, SC-009).

4.7. **Learning Path tab** — MUST render a **display-only** labeled level ladder (`foundation → l1 → l2 → l3 → advanced`) as static `.level-step` elements (icon + text, ordered; never numeric or color-only), with fixture per-level student counts and a certificates hint (`{ count, labelKey }` from `LearningPath`). MUST NOT include any editing control, curriculum-management affordance, or anything implying real persistence. Any "manage" action MUST be `data-disabled-reason` with a clear reason (e.g. `crs.reason.curriculum`), never a live control (FR-008).

4.8. **Notes tab** — the fixture `notesKey` resolves to a calm static text block. No editing engine.

4.9. All tab trigger elements (`data-tab`) and all panel containers (`data-tabpanel`) MUST be baked; `enhance.js` only toggles panel visibility via the existing tab hook — it builds no tab DOM.

---

## SD5. The Group profile is BAKED — all seven tab panels (`group.html`)

5.1. The Group profile (`group.html` + `group.en.html`) MUST ship with:
- A **profile banner**: group name, a **course chip-link** to `course.html`, teacher name, level, labeled GroupStatus chip, students count, and a demo-action cluster — all baked from the representative fixture.
- **Seven** tab panels baked into static HTML: **Overview**, **Students**, **Timetable**, **Sessions & Outcomes**, **Teacher**, **Course**, **Notes** (FR-013).
- Exactly one panel visible on load; the other six are present but hidden.

5.2. **Students tab** — the cohort roster MUST be baked as individual rows, each linking to `student.html`, with a family chip linking to `family.html`, the student name, and an EnrollmentStatus chip. No runtime roster lookup (FR-014).

5.3. **Timetable tab** — MUST reuse the Spec 003 `scheduleAgenda` unchanged, rendering the group's `scheduleBlockIds[]` resolved blocks, plus a "View in schedule" deep-link to `schedule.html#view=timetable`. No duplicated agenda builder (FR-015).

5.4. **Sessions & Outcomes tab** — MUST reuse the Spec 005 `outcomeRow` pattern and the **canonical `outcomeTemplate` drawer** (SD6) unchanged, rendering the group's `outcomeIds[]` resolved rows, plus a "View attendance" deep-link to `attendance.html`. No bespoke drawer (FR-015, SC-009).

5.5. **Teacher tab** — teacher name, accent, and schedule/outcome hint baked from fixture. No assignment engine.

5.6. **Course tab** — a calm baked card with course subject, level, and a "View course" link to `course.html` (a real anchor). No enrollment engine.

5.7. **Notes tab** — `notesKey` resolves to static text. No editing engine.

---

## SD6. The canonical outcome drawer is REUSED unchanged (Spec 005)

6.1. On the Course profile Outcomes tab and the Group profile Sessions & Outcomes tab, each outcome row MUST carry a hidden **`<template data-preview="<id>">`** containing the **same Spec 005 canonical `outcomeTemplate`** — the superset of the appointment drawer (status · date/time/duration · teacher · present/capacity · family · subject · notes) plus the outcome section (outcome chip · who-absent/who-cancelled attribution · make-up/credit display hint · follow-up hint · feedback · gated demo actions) — **baked identically** to the Attendance page.

6.2. **No per-page bespoke outcome drawer is introduced.** The canonical drawer from Spec 005 is reused on `course.html`, `group.html`, and the regenerated `sessions.html`/`attendance.html` without modification. Zero new outcome-drawer builders are added (SC-009).

6.3. The drawer engine clones the `<template data-preview>` on open via the existing `data-drawer="<id>"` → `openSheet(id)` mechanism — no field is assembled at runtime. With JS off, the baked template content exists as real markup.

---

## SD7. `enhance.js` = enhancement only — NO new hook (closed allowlist)

7.1. `enhance.js` MAY ONLY, for Spec 006: **switch baked tab panels** (toggle visibility of existing `data-tabpanel` containers), **filter pre-rendered** `.group-row`s / `.course-card`s by their `data-*` facets and update the active-filter chips + result count (including the optional `data-filter-set` tile→filter shortcut from Spec 005 reused on the Groups summary tiles), **open the canonical outcome drawer/sheet** (clone `<template data-preview>`, scrim, focus-trap, Esc, return-focus) and the **confirm modal**, fire **demo toasts** and surface **disabled-with-reason**, apply theme/language/sidebar/nav-category state. It MAY create transient overlays (drawer / confirm modal / toast) but **MUST NOT render page content, build a tab panel, construct a group row or course card, compute a count, generate a level ladder step, fill a drawer body, or generate ids/classes Django cannot reproduce.**

7.2. **Zero new hooks in Spec 006.** Every `data-*` hook used on the new surfaces is taken from the closed allowlist already established in Spec 002/003/004/005. The allowlist for Spec 006 surfaces:

```text
REUSED from Spec 005 (one hook, tile→filter):
  data-filter-set="<facet>:<value>"   — Groups summary tile → set a filter facet + re-run applyFilter

REUSED from Spec 002/003/004 (filtering):
  data-filter-form · data-filter="<facet>" (course|teacher|level|day|status|attention|subject)
  data-target · data-filter-apply | data-filter-reset | data-filter-count
  data-table · data-row + data-<facet> · data-row-menu="<id>"

REUSED from Spec 002/003/004 (overlays):
  data-drawer="<id>" · data-preview="<id>" · data-sheet-close
  data-modal-trigger="<id>" · data-confirm (+ -title|-msg|-cta|-toast|-danger)

REUSED from Spec 002/003/004 (honest feedback):
  data-demo-action · data-disabled-reason / data-reason-key · data-toast

REUSED from Spec 003/004/005 (tabs):
  data-tabs · data-tab · data-tabpanel · data-view
```

No action ever writes data: each resolves to `data-demo-action` (toast), `data-confirm` → demo toast (for destructive ones: remove student, archive course/group), or `data-disabled-reason` (real assignment / real enrollment / export / curriculum management). There is **no new action hook and no new engine**.

7.3. **Status-gating** follows the Spec 005 `gatedActions` model: "Add students" on a `full` group is `data-disabled-reason` with `grp.reason.full`; any curriculum-management affordance is `data-disabled-reason` with `crs.reason.curriculum`. No gating logic runs at runtime — the correct hook is baked into the markup at build time.

---

## SD8. Per-language pre-rendered pages

8.1. Each Spec 006 page is generated in Arabic (`<page>.html`, `lang="ar" dir="rtl"`, default) and English (`<page>.en.html`, `lang="en" dir="ltr"`). The language toggle navigates between equivalents; theme persists via `localStorage`.

8.2. Group rows, course cards, profile tabs, the level ladder, and the outcome drawer mirror via **logical CSS properties** (`margin-inline-start`, `inset-inline-end`, `border-inline-start`, …); numbers / dates / times / `present/capacity` counts and timetable / attendance deep-link tokens are **never** mirrored.

8.3. The timetable deep-link is **language-aware** (`schedule.html#view=timetable` from AR pages, `schedule.en.html#view=timetable` from EN pages, via `langRoute()`); the attendance deep-link likewise (`attendance.html` / `attendance.en.html`). Every user-facing string is an i18n key resolved at build time — **no raw i18n keys** (the smoke no-raw-key assertion catches any leak).

---

## SD9. i18n overlay: `ar.crs.js` / `en.crs.js`

9.1. All Spec 006 strings live in **two new overlay modules** `src/locales/ar.crs.js` and `src/locales/en.crs.js`, merged into the Spec 001 dictionaries via `deepMerge` in `i18n.js` — the **same pattern** as `ar.fam.js` / `en.fam.js` (Spec 004) and `ar.att.js` / `en.att.js` (Spec 005). Import and merge lines in `i18n.js`:

```js
import arC from '../locales/ar.crs.js';
import enC from '../locales/en.crs.js';
deepMerge(ar, arC);
deepMerge(en, enC);
```

9.2. The `ar.crs.js` / `en.crs.js` overlay namespaces cover (minimum):

- `nav.groups`, `topbar.title/crumb.{groups,course,group}` (nav meta, §3 of navigation-impact-contract).
- `crs.*` — course-enrich counts labels, course profile tab titles, learning-path labels, course action labels/toasts/reasons, CourseStatus extended label (`course.status.paused`), enrollment-status labels (`enroll.status.*`).
- `grp.*` — groups directory labels, group profile tab titles, group action labels/toasts/reasons, GroupStatus labels (`group.status.{active,trial,full,paused,completed}`), `grp.reason.full`, `grp.reason.curriculum`.
- `dash.groupsAttention` — dashboard chip label.
- Level-ladder labels (reuse or add `level.{foundation,l1,l2,l3,advanced}` if not already present in the base locale).

9.3. Every key added to `ar.crs.js` MUST have a mirror entry in `en.crs.js`; no asymmetric key. The build resolves all keys at generation time; the no-raw-key smoke verifies zero `⟦key⟧` tokens leak into any built page.

---

## SD10. Relative paths / local assets / no CDN / no library

10.1. All asset references MUST be **relative** (`./assets/app.css`, `./assets/js/enhance.js`, `./fonts/…`, the inlined icon sprite). Pages MUST work from a GitHub Pages project URL (`user.github.io/repo/`) opened directly from the filesystem, from VS Code Live Server, or from any static host. `public/` ships `.nojekyll` and is self-contained.

10.2. **Zero external (CDN) requests.** No chart, table, form, calendar, curriculum, or grade library; no remote font / script / style. The group rows, level ladder, status chips, drawer, filter bar, and summary tiles use only local compiled CSS/JS. The no-external-request smoke also proves no such library loads.

10.3. The labeled GroupStatus chips, CourseStatus chips, EnrollmentStatus chips, level-ladder steps, and the attention-flag badge are **hand-rolled SVG/CSS** — no widget library renders them. They degrade to readable static markup with JS off.

10.4. **No new dependency is introduced.** No TypeScript, no SPA framework, no CDN, no backend/API/auth/CRUD/persistence; no course/group/enrollment/assignment/curriculum/certificate/scheduling/attendance engine.

---

## SD11. Build pipeline (no new tool)

11.1. `npm run build` = vendor assets → copy assets → compile CSS → `build-html.mjs` generates all pages. Spec 006 adds **three** new `PAGES` entries (`groups`, `course`, `group`) and **regenerates** `courses`; it adds fixture modules (`src/js/fixtures/groups.js`, extensions to `src/js/fixtures/courses.js`) and status maps (`src/js/group-status.js`); it extends `app.css` with a Spec 006 `@layer` block. **No new build tool or build step is introduced**; all pages use the same `shellMarkup` + per-page `render()` + per-language loop.

11.2. Final client preview is `public/`. **Live Server opens `public/groups.html`** (and the linked course/group/student/family/schedule/attendance pages) with no Node server required. New pages round-trip: `groups.html` (+ `.en`) filter + tile→filter; `course.html` (+ `.en`) tabs + drawer + level ladder; `group.html` (+ `.en`) tabs + roster + outcome drawer.

---

## SD12. Django-template readiness

12.1. Each Spec 006 page MUST map cleanly to a Django template:

| static artifact | Django |
|---|---|
| `public/courses.html` | `templates/admin/courses.html` |
| `public/groups.html` | `templates/admin/groups.html` |
| `public/course.html` | `templates/admin/course_detail.html` |
| `public/group.html` | `templates/admin/group_detail.html` |
| every `.group-row` | `{% for group in groups %}` over view context |
| every `.course-card` (enriched) | `{% for course in courses %}` |
| summary tiles + counts | `{{ summary.* }}` context + the same `data-filter-set` attrs server-side |
| profile tab panels | `{% if active_tab == "students" %}…{% elif active_tab == "timetable" %}…{% endif %}` |
| the canonical outcome drawer (Spec 005) | ONE `{% include "admin/_outcome_details.html" %}` per outcome row (unchanged Spec 005 partial) |
| level-ladder section | ONE `{% include "admin/_level_ladder.html" %}` partial (a new shared partial, not a page) |
| CourseStatus / GroupStatus maps | template tags/filters (`{{ course.status|course_status_chip }}`, `{{ group.status|group_status_chip }}`) |
| `GROUP_SUMMARY` / `COURSE_SUMMARY` fixtures | view context counts (real DB aggregates in Django) |
| `Group.courseId` / `Group.teacherId` / `Group.studentIds` | Django FK relations (`group.course`, `group.teacher`, `group.students.all()`) |
| course/group action buttons | baked `data-*` attributes server-side; the same honesty hooks reproduce without JS-generated ids |

12.2. Representative Django shape (groups directory list + optional summary tiles):

```django
{# groups directory #}
{% for group in groups %}
  <div class="group-row" data-row
       data-course="{{ group.course.id }}" data-teacher="{{ group.teacher.id }}"
       data-level="{{ group.levelKey }}" data-day="{{ group.scheduleDays }}"
       data-status="{{ group.statusId }}" data-attention="{{ group.needsAttention|yesno:'1,0' }}">
    … name · <a href="{% url 'course_detail' group.course.id %}">{{ group.course.title }}</a>
    · teacher · level · schedule summary · students count
    {{ group.statusId|group_status_chip }}   {# labeled chip template tag #}
    {% if group.needsAttention %}<span class="attention-flag">…</span>{% endif %}
    <a href="{% url 'group_detail' group.id %}">{% trans "View group" %}</a>
  </div>
{% endfor %}
```

12.3. Representative Django shape (course profile — tab panels):

```django
{# course profile tabs #}
{% if active_tab == "groups" or not active_tab %}
  <div data-tabpanel="groups"{% if active_tab and active_tab != "groups" %} hidden{% endif %}>
    {% for g in course.groups.all %}
      <a href="{% url 'group_detail' g.id %}">{{ g.name }}</a> … {{ g.statusId|group_status_chip }}
    {% endfor %}
  </div>
{% endif %}
{# …other tab panels… #}
{% if active_tab == "outcomes" %}
  <div data-tabpanel="outcomes">
    {% for outcome in course.outcomes %}
      <div class="outcome-row" …>…{{ outcome.outcomeId|outcome_chip }}…</div>
      <template data-preview="{{ outcome.id }}">
        {% include "admin/_outcome_details.html" with outcome=outcome %}
      </template>
    {% endfor %}
    <a href="{% url 'attendance' %}">{% trans "View attendance" %}</a>
  </div>
{% endif %}
{% if active_tab == "learning-path" %}
  <div data-tabpanel="learning-path">
    {% include "admin/_level_ladder.html" with levels=course.learning_path %}
  </div>
{% endif %}
```

12.4. **No whole-page `#app`; no JS-generated IDs/classes** Django cannot reproduce; all behavior keys are stable `data-*` attributes; per-language pages → one template per page with `{% trans %}` / `LocaleMiddleware`.

---

## SD13. Enforcement (smoke + structure)

**no-external-request smoke** (SD10) — over `courses`/`groups`/`course`/`group` (AR + EN); proves no CDN/chart/table/form/library loads.

**HTML-structure check** (SD1–SD5) asserts, on each new/enriched page:

- **`courses.html`**: every course card has a labeled CourseStatus chip (icon + text) + the three academic counts + a `course.html` link; filter narrows with count + no-results; no `id="app"`; relative paths.
- **`groups.html`**: baked summary tiles each with `data-filter-set`; filter bar with the six facets; **≥ 6** baked `.group-row`s each with a labeled GroupStatus chip (icon + text) + facet attributes + a `course.html` course link + a `group.html` row link; baked no-results + empty states; no `id="app"`.
- **`course.html`**: banner with labeled CourseStatus chip + counts; **eight** baked tab panels; exactly one visible; groups tab links to `group.html`; students tab links to `student.html`; timetable tab has `scheduleAgenda` + `schedule.html` deep-link; outcomes tab has `outcomeRow` + `<template data-preview>` (canonical drawer) + `attendance.html` deep-link; learning-path tab has labeled `.level-step`s (icon + text, ordered) + certificates hint + NO editing control; no `id="app"`.
- **`group.html`**: banner with labeled GroupStatus chip + course chip-link + teacher; **seven** baked tab panels; exactly one visible; students tab rows link to `student.html` + family chip to `family.html`; timetable tab has `scheduleAgenda` + `schedule.html` deep-link; sessions & outcomes tab has `outcomeRow` + `<template data-preview>` (canonical Spec 005 drawer) + `attendance.html` deep-link; course tab links to `course.html`; no `id="app"`.

**tab + filter + tile smoke**: switching tabs on `course.html`/`group.html` toggles exactly one visible panel (none constructed at runtime); filtering on `groups.html`/`courses.html` narrows with count and no-results; clicking a Groups summary tile sets the matching filter (data-filter-set reuse); clicking a tile with JS off leaves the static row/tile intact.

**drawer + action smoke**: a `.group-row` outcome open uses the **same** canonical Spec 005 drawer (no bespoke builder); a demo action toasts; a destructive action (remove student) opens confirm modal then toasts; a backend-bound action (assign teacher / export / curriculum) is disabled-with-reason; no dead control, no real mutation.

**integration smoke** (SD12 integrations, FR-021/022/023):
- `student.html` Courses tab: enrollment cards link to `course.html` and, where present, a group chip links to `group.html`.
- `family.html` Overview: one calm fixture children course/group summary hint + deep-link to `courses.html`/`groups.html`; no finance/enrollment claim; no portal.
- `dashboard.html`: exactly one fixture "groups needing attention" chip (`dash.groupsAttention`) folded into the existing people-signal card + deep-link to `groups.html`; no new stat wall.

**no-dead-link smoke**: every `<a>` on the new pages resolves to a real built file (`course.html`, `group.html`, `student.html`, `family.html`, `schedule.html`, `attendance.html`); no `href="#"`.

**no-raw-i18n-key smoke**: `ar.crs.js` / `en.crs.js` cover every new string in AR and EN; zero `⟦key⟧` tokens on any Spec 006 page.

**portal-absent smoke**: `teacher-portal` / `family-portal` / `student-portal` ids absent from every Spec 006 page's markup.

**With JS disabled**, View Source on every Spec 006 page MUST show: every course card with its enriched counts, every group row with its chip + facets, every tab panel (all of them, not just the first), the level ladder `.level-step`s, and every `<template data-preview>` outcome drawer — proving nothing is runtime-mounted.

---

## SD14. Cross-references

- `navigation-impact-contract.md` (Spec 006) — the IA delta: `groups` promoted, `course`/`group` registered as profile templates, no other nav change.
- `../005-attendance-session-outcomes/contracts/static-html-django-ready-contract.md` — the Spec 005 precedent for SD1–SD10; the canonical outcome drawer (SD3 there, SD6 here) is reused unchanged (SC-009).
- `../../002-admin-core-operations/contracts/navigation-ia-contract.md` §NI12 — the promotion checklist.
- Spec 006 `research.md` R45 (routes), R48 (reuse map), R50 (fixture shape), R51 (action honesty), R54 (i18n/CSS), R59 (scope confirmation).
- Spec 006 `spec.md` FR-024 (fixture data), FR-025 (static baked), FR-026 (GitHub Pages / per-language / Django-ready).
