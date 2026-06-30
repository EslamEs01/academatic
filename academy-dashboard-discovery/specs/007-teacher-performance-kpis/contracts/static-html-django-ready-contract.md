# Contract: Static HTML-First & Django-Ready (Spec 007)

**Status**: Binding · The architecture contract for the teacher surfaces. Every teacher list/card/profile-tab/KPI-tile/comparison-row/outcome-row/schedule-block/drawer is **baked static HTML** at build; runtime JS enhances only. References FR-019 / FR-020 / FR-021; SC-005; data-model §1–§16.

---

## SD0. Scope

Governs `public/teachers.html` (+`.en`, enriched), `public/teacher.html` (+`.en`, NEW), `public/teacher-performance.html` (+`.en`, NEW), and the `dashboard.html` chip delta. All inherit the Spec 001–006 SSG rules verbatim.

## SD1. Static HTML-first

No whole-page `<div id="app">` mount. Each page is a **complete pre-rendered** static document: full shell (sidebar + topbar) + page body with all content baked. View Source shows every teacher card, every KPI tile, every comparison row, every profile tab panel, and every `<template data-preview>` drawer as real markup — present **without JS**.

## SD2. Teachers directory (`teachers.html`) — baked

`pageHeader` + `summaryCards` + `filterBar` + `cardGrid` of `directoryCard`s, each baked with: avatar, name, subject chip(s), the **teacher-status** chip, the academic counts (courses/groups/students), an upcoming-sessions hint, the **workload** hint, a **follow-up flag** when flagged, and a **"View profile"** real `<a href="./teacher.html">`. The preview `<template>` per teacher is baked. JS only filters the pre-rendered cards + opens the preview.

## SD3. Teacher profile (`teacher.html`) — baked (8 tabs)

`profileBanner` + the shared `tabs` widget with **8 baked panels** (`overview · courses · groups · timetable · sessions-outcomes · students · follow-up · notes`). **All eight panels are pre-rendered complete static HTML**; `enhance.js` only toggles visibility (set/remove `hidden`, flip `aria-selected`, move roving tabindex) and persists selection in `localStorage['academy.schedView.teacher']` + the `#view=<tab>` hash (hash wins, else storage, else **Overview**). Exactly one panel visible at load. With JS off, all panels remain reachable as anchored sections.

## SD4. Teacher Performance board (`teacher-performance.html`) — baked

`pageHeader` + baked **KPI tiles** (`summaryCards`/`kpiCard`/`status-tile`) + a baked **per-teacher comparison list** (`directoryCard`/`statMini` rows, each with a `teacher.html` link) + a baked **follow-up queue** + a `filterBar`. JS only filters the pre-rendered rows. **No runtime computation** of any tile/row number — every number is a baked fixture count.

## SD5. Cards/rows/tiles are baked, JS filters only

Every teacher card (directory), comparison row (board), follow-up item, course/group/student row (profile tabs), schedule block (timetable tab), and outcome row (outcomes tab) is built at **build time**. `enhance.js` applies/clears filters over `[data-row]` facets, switches tabs, opens drawers/modals, shows toasts/disabled-reasons — it **constructs no list/row/tile/panel DOM**.

## SD6. The canonical outcome drawer + schedule agenda reused unchanged

The Timetable tab renders the Spec 003 **`scheduleAgenda`** (`data-agenda` blocks) + baked `appointmentTemplate` drawers; the Sessions & Outcomes tab renders the Spec 005 **`outcomeRow`** + baked **`outcomeTemplate`** drawers — both via the Spec 006 `cohort-panels` (`cohortTimetablePanel`/`cohortOutcomesPanel`/`cohortTemplates`). **No new drawer/agenda/grid is introduced** (SC-009). The drawer `<template data-preview="<id>">` markup is baked into the page.

## SD7. `enhance.js` = enhancement only, NO new hook (closed allowlist)

Spec 007 introduces **no new `data-*` hook**. The teacher surfaces reuse only:

```text
data-tabs / data-tab / data-tabpanel / data-view      (profile tabs)
data-filter-form / data-filter / data-filter-reset / data-filter-apply / data-filter-count / data-no-results  (filters)
data-row + facet attrs (data-status / data-subject / data-availability / data-workload / data-signal / data-teacher / data-outcome / data-attention)
data-drawer / data-preview / data-sheet-close          (preview + canonical outcome/appointment drawers)
data-demo-action / data-toast                          (demo actions)
data-confirm (+ -title/-msg/-cta/-toast/-danger)       (confirm → demo toast)
data-disabled-reason / data-reason-key                 (disabled-with-reason)
data-agenda                                            (reused schedule agenda)
```

Real `<a href>` (View profile / View course / View group / View student / family chip / View in schedule / View attendance / breadcrumb) are navigation, not hooks.

## SD8. Per-language pages

`teacher.html` (ar/rtl) + `teacher.en.html` (en/ltr); `teacher-performance.html` + `.en.html`; the regenerated `teachers.html` + `.en.html`. Direction, digits, dates, and labels resolve per language. No runtime language fetch.

## SD9. i18n overlay (`ar.trn.js` / `en.trn.js`)

Teacher strings live in a NEW overlay pair under the `trn.*` namespace, registered in `i18n.js` exactly like the existing `.extra/.fam/.att/.crs` overlays:

```js
import arT from '../locales/ar.trn.js';
import enT from '../locales/en.trn.js';
// …
deepMerge(ar, arT);
deepMerge(en, enT);
```

`deepMerge` extends (never clobbers); a missing key renders `⟦key⟧` (smoke catches it).

## SD10. Relative paths / no CDN

`./assets/` relative paths only; `.nojekyll`; zero external/CDN requests; no chart/table/form/calendar library loads. GitHub-Pages compatible; opens directly from the filesystem.

## SD11. Build pipeline

`renderTeachers` (edited), `renderTeacher` (new), `renderTeacherPerformance` (new) registered in `build-html.mjs`; `npm run build` emits the AR + EN files and prints the page count; the nav guard passes.

## SD12. Django-template readiness

| Static shape | Django |
|---|---|
| `teachers.html` cards | `{% for teacher in teachers %}` → `_teacher_card.html` |
| `teacher.html` | `templates/admin/teacher.html` → `teacher/<id>` |
| profile tabs | static sections `{% if view == 'courses' %}…{% endif %}` (default Overview) |
| Courses/Groups/Students tabs | `{% for course in teacher.courses %}` / `{% for group in teacher.groups %}` / `{% for student in teacher.students %}` |
| Timetable agenda | `{% for block in teacher.schedule %}` + the shared `_appointment_details.html` include |
| Sessions & Outcomes | `{% for outcome in teacher.outcomes %}` + the shared `_outcome_details.html` include |
| KPI tiles / comparison rows | `{% for row in teacher_perf %}` |
| status / workload / follow-up chips | `{{ teacher.statusId|teacher_status_chip }}` / `{{ teacher.workload|workload_chip }}` / `{{ teacher.followUp|teacher_signal_chip }}` template tags |

```django
{# _teacher_card.html — one teacher card #}
<article class="dir-card" data-row data-status="{{ teacher.statusId }}" data-subject="{{ teacher.primary }}" data-workload="{{ teacher.workload }}">
  {{ teacher.statusId|teacher_status_chip }} {{ teacher.workload|workload_chip }}
  <a href="{% url 'teacher' teacher.id %}">{% trans 'View profile' %}</a>
</article>
```

No whole-page `#app` mount.

## SD13. Enforcement (smoke + structure)

- View-Source / smoke: `teachers.html`, `teacher.html`, `teacher-performance.html` (+ `.en`) contain baked cards/tiles/rows + **all 8** profile tab panels (exactly one visible) + every reused drawer `<template>`; **no `id="app"`**; relative assets; no external request; no raw `⟦key⟧`.
- The G8a grep audit (scope-guard) is clean (no finance/score/chart token).

## SD14. Cross-references

Binds to `teachers-page-contract.md`, `teacher-profile-contract.md`, `teacher-performance-contract.md`, `teacher-timetable-contract.md`, `teacher-outcomes-contract.md`, `navigation-impact-contract.md`, and the Spec 003/005/006 static-HTML contracts. **MUST NOT** render any teacher list/tab/tile/row/drawer at runtime, mount `#app`, fetch a dictionary, or load an external resource.

**Acceptance (binding):**
1. **Given** View Source on each new/enriched page, **Then** all cards/tiles/rows/8-tab-panels/drawer-templates are baked with no `#app` and relative paths.
2. **Given** JS disabled, **Then** every page renders its full content (panels reachable as sections).
3. **Given** `npm run build`, **Then** AR + EN emit, the nav guard passes, and no raw `⟦key⟧` remains.
