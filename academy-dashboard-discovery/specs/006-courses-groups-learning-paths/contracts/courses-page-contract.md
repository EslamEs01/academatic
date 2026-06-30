# Contract: Courses Directory Page

**Status**: Binding · `public/courses.html` (+ `.en`). The courses directory as an **enriched subject-offering catalogue** — NOT a generic course list, NOT a 1:1 enrollment table, NOT a course builder. Active nav: `courses`.

References: FR-001 / FR-002 / FR-003 / FR-016 / FR-019 / FR-025 / FR-026 / FR-027 / FR-028; data-model §1 (Course), §2 (CourseStatus), §15 (CourseAction).

---

## 1. Purpose & reuse

- Give the admin one calm, relationship-visible directory of the academy's **subject offerings** (Math, Arabic, Programming…), each carrying its labeled status, academic counts (active students, groups, assigned teachers), an upcoming-sessions hint, and a deep link to its baked course profile. It MUST read as the same product as Specs 001–005 (warm canvas, violet `--g-violet`, `--r-card`, Tajawal) and MUST improve on the legacy "Courses" flat enrollment list (a per-student row wall with opaque numeric statuses) by showing the catalogue framing the app already established.
- It MUST compose existing components only — `pageHeader` + `summaryCards`, `filterBar`, `cardGrid`, the `.dir-card` markup pattern, `chip`, `medallion`, `button`, `states`, `ui` atoms. It MUST extend the existing `COURSE_STATUS` map (adding `paused`) and introduce the enriched card fields (`studentsCount`, `groupsCount`, `teachersCount`, `upcomingCount`, `attention?`). **No new runtime filter engine, no table library, no chart library, no form library.** Behaviour is `enhance.js` over baked markup via `data-*` hooks only (FR-025 / FR-027).

## 2. ENRICHMENT — not a page replacement

- `courses.html` already exists and is `status:'implemented'`. This contract **enriches it in place**: the card grid, filterBar, summaryCards row, and page shell remain; the card interior gains the new counts and the "View course" link; the `COURSE_STATUS` map gains `paused`; no other page, nav item, or route is changed.
- The `courses` nav item MUST stay `status:'implemented'` with route `'courses.html'`; the `activeId:'courses'` on the SSG page entry is unchanged. All other planned items (`familyCategories`, `groups` *(now also promoted separately)*, `scheduleSearch`, `studentResult`, `studentEvaluation`) are unaffected by this contract.
- The page title, breadcrumb leaf, and header heading MUST use the single label `الدورات` (Arabic) / `Courses` (English) — one wording only, matching the existing `cur.title` i18n key.

## 3. Layout (RTL, top → bottom)

1. **Page header** — title `الدورات`/`Courses` + breadcrumb (`الرئيسية · الدورات`) + subtitle + a **"+ add course"** primary CTA (§9).
2. **Summary tiles** (§4) — `summaryCards` row (total courses / active / levels count) — display-only fixture counts.
3. **Filter bar** (§5) — search + subject facet + level facet + status facet + apply/reset + result count.
4. **Course card grid** (§6) — a responsive `cardGrid` (`id="courses-grid"`) of enriched course cards over the `COURSES.rows` fixture (≥6), all baked at build time.
5. **States region** (§8) — no-results / empty / loading / error.
6. **No drawer templates on this page** — the "View course" CTA is a real `<a href>` to `course.html`, not a peek drawer. (The Spec 002 level-preview drawer is superseded by the full course profile.)

Single calm column; the shell (rail + topbar) is unchanged. Reflows per §7.

## 4. Summary tiles

- A `summaryCards` row of **three** calm tiles: **total courses** (`cur.sum.total`, icon `curricula`, tone `primary`), **active courses** (`cur.sum.active`, icon `check-circle`, tone `success`), and **levels offered** (`cur.sum.levels`, icon `graduation-cap`, tone `sky`) — fixture counts derived at build time, display-only.
- Tiles are **display-only counts only** — they MUST NOT act as filters and MUST NOT navigate elsewhere. (Groups summary tiles use the Spec 005 `data-filter-set` tile→filter pattern; courses keeps a simpler display-only summary to match the existing pattern.)
- Each tile: `medallion` (soft tone) + a tabular count (`<div class="text-[22px] font-bold tabular text-ink">`) + a label below (`<div class="text-[12px]">`). No finance, no fabricated metric.

## 5. Filter bar (client-side over pre-rendered cards)

- Reuses `filterBar` exactly: `data-filter-form` `data-target="#courses-grid"` — a **search** input (`data-filter="search"`) + three `<select>` facets + apply + reset + result count (`data-filter-count`).
- **Facets** (in order): `subject` (`cur.fSubject`, options: all + `math|arabic|programming|physics|english|science` each with `data.subj.<v>` label) · `level` (`cur.fLevel`, options: all + `foundation|l1|l2|l3|advanced` each with `data.crs.lvl.<v>`) · `status` (`cur.fStatus`, options: all + `active|draft|paused|archived` each from `COURSE_STATUS[v].labelKey`).
- On apply, `enhance.js` MUST show/hide the **pre-rendered** course cards by their `data-subject` / `data-level` / `data-status` / `data-search` facets, update the count, and surface the **no-results** state (§8) with a reset when nothing matches. Filters MUST give visible feedback always — **never dead** (a weak/dead filter is a screenshot failure condition per FR-028).
- Degrades gracefully: with JS off, all cards render and controls are inert (all visible).

## 6. Enriched course card anatomy (the ENRICHED `.dir-card`)

Each card is one `cardGrid` cell carrying `data-row` + its filter facets, composed top → bottom. MUST be baked static markup; no JS-generated classes or ids.

- **Card container** — `<div class="dir-card is-hoverable">` + `data-row` + `data-subject="<subject>"` + `data-level="<levelKey leaf>"` + `data-status="<statusId>"` + `data-search="<titleKey resolved>"` + (when flagged) `data-attention`.
- **Card top row** — `medallion` in the course `icon`/`accent` (soft variant, start-aligned) + the **CourseStatus chip** (§10, icon + text, **never color-only**, end-aligned).
- **Course identity** — `<h3>` course title (resolved `titleKey`, `font-bold text-ink text-[14.5px]`) + a subtitle line `<subject> · <level>` (resolved `subjectKey` · `levelKey`, `text-[12.5px]` ink-3). Long titles MUST truncate gracefully in AR-RTL and EN-LTR.
- **Academic counts row** — three `<span>` pairs of `<b class="tabular text-ink">N</b> label`, in order: **active students** (`crs.counts.students`), **groups** (`crs.counts.groups`), **teachers** (`crs.counts.teachers`). Counts derive from `studentsCount`, `groupsCount`, `teachersCount` fixture fields; display-only, no engine.
- **Upcoming-sessions hint** (conditional) — when `upcomingCount > 0`, a compact inline hint: icon `schedule` + `<N> crs.counts.upcoming` (e.g. «٣ جلسات قادمة»). When `upcomingCount === 0` for a `draft`/`archived` course, this row is omitted — no blank element.
- **Attention hint** (conditional) — when `attention` is present: icon `alert-triangle` (amber) + the resolved `attention.labelKey` string. This MUST be rendered icon+label, never color-only; it carries `data-attention`. A course without `attention` omits this row entirely.
- **"View course" CTA** — a real `<a href="./course.html">` (language-aware: `./course.en.html` on EN pages) styled as `.btn .btn-secondary .btn-sm .w-full`. MUST NOT be a `data-drawer` button. MUST NOT be dead. The text MUST resolve to `crs.viewCourse` (Arabic «عرض الدورة» / English "View course"). Icon `curricula` (start-aligned inside the link).

MUST NOT: embed a `<table>`, use a JS-rendered card, fabricate any metric not in the fixture, show a numeric-only or color-only status.

## 7. Responsive

Desktop/tablet: multi-column `cardGrid` (`sm:grid-cols-2 xl:grid-cols-3`). Below the card breakpoint (`max-width:640px`), the grid MUST reflow to a **single column** with no horizontal overflow. The counts row, chip, and attention hint stack/wrap; the "View course" link stays full-width and reachable. Long Arabic/English titles truncate rather than overflow.

## 8. States

Using the Spec 001 `states` patterns (`noResults()` component + existing state markup), the page MUST distinguish:

- **Empty** ("no courses yet") — a warm empty state with the "+ add course" CTA; shown only when `COURSES.rows` is empty. Never a blank grid.
- **No-results** ("no match for current filters") — the `noResults()` state with a reset action; shown when the filter combination matches zero cards. Distinct from the empty-data state.
- **Loading** — a skeleton of card placeholders (the existing `states` loading pattern).
- **Error + retry** — a friendly error message (the existing `states` error pattern).

Each state MUST be pre-rendered in the baked HTML; `enhance.js` toggles visibility via `data-no-results` and the grid's `data-grid` attribute.

## 9. Actions & no-dead-button (IP8/IP9)

- **"+ add course"** (page header primary CTA) — `data-demo-action` → demo toast (`crs.action.add.toast`). A `<button type="button">` styled `btn btn-primary`. MUST NOT open a real form or submit any data.
- **"View course"** (per card CTA) — a real `<a href="./course.html">` (§6). The only navigation off the card.
- **No kebab / row menu on the courses card** — the Courses page is catalogue-only; destructive/edit actions live on the Course profile (§ course-profile-contract.md). If a future kebab is desired, it MUST follow IP8: every item is navigate / demo-toast / confirm→demo-toast / disabled-with-reason.
- Every control satisfies IP8: navigate in-scope / demo-with-toast / disabled-with-reason. No raw i18n keys; status and attention MUST NEVER be color-only.

## 10. CourseStatus map (`COURSE_STATUS` — EXTENDED)

The course catalogue status resolves through `COURSE_STATUS` (in `fixtures/courses.js`), rendered via the generic `chip` as **icon + label, never numeric/color-only** (FR-016). Adds `paused` to the existing three values:

| `statusId` | tone (token) | icon | Arabic label | English label |
|---|---|---|---|---|
| `active` | `completed` (green) | `check-circle` | نشطة | Active |
| `draft` | `amber` | `edit` | مسودة | Draft |
| `paused` | `amber` | `pause-circle` | موقوفة مؤقتاً | Paused |
| `archived` | `neutral` | `archive` | مؤرشفة | Archived |

Each entry is `{ tone, icon, labelKey }`. The label always accompanies the tone+icon; AA contrast via existing chip CSS. `COURSE_STATUS_ORDER = ['active','draft','paused','archived']`. Exported helpers: `courseStatusOf(id)`, `courseStatusChip(id)`. This map is the single source of truth for the catalogue cards and the course profile banner; it is **distinct** from the enrollment-status map (`active|paused|completed` in `enrollment-status.js`) and from the group-status map (`group-status.js`). **Django**: `{{ course.status|course_status_chip }}`.

MUST NOT shadow or merge with the `EnrollmentStatus` map (§8b of data-model) or the `GroupStatus` map (data-model §8).

## 11. `data-*` hooks (exact, reuse only — no new hook invented)

`data-filter-form`, `data-target="#courses-grid"`, `data-filter="subject|level|status|search"`, `data-filter-apply`, `data-filter-reset`, `data-filter-count`, `data-no-results`; per card: `data-row` + `data-subject` + `data-level` + `data-status` + `data-search` + (conditional) `data-attention`; actions: `data-demo-action` + `data-toast`. The "View course" CTA and the "+ add course" button (when it navigates to a form page in future) are real `<a href>` or `<button data-demo-action>` — not custom hooks. **No `data-drawer` on any course card on this page.** **No JS-generated ids or classes.**

## 12. Static-HTML-first & Django mapping

- `courses.html` MUST be a **complete pre-rendered** static file in `public/` — full shell + page header + summary tiles + filter bar + **every** course card (identity, counts, chip, attention hint, "View course" link) as real baked markup. **No whole-page `<div id="app">`,** no JS-built page DOM. Relative `./assets/` paths; per-language pages (`courses.html` ar/rtl default + `courses.en.html` en/ltr); `.nojekyll`; **zero external/CDN requests**; no chart/table/form library (FR-025 / FR-026 / FR-027).
- **Django**: `public/courses.html` → `templates/admin/courses.html`; the grid → `{% for course in courses %}` with the enriched counts as context variables (`course.students_count`, `course.groups_count`, `course.teachers_count`, `course.upcoming_count`, `course.attention`), the status map → `{{ course.status|course_status_chip }}` template tag, facets → the same `data-*` attributes server-rendered, states → `{% if %}`. **No surface forks the card partial.**

## 13. Enforcement & cross-references

- **Smoke** (`tests/smoke/run.cjs`): `courses` is in `PAGES`; every course card has a `chip` with icon+text (never an empty chip or a `data-status` number); the three enriched counts (`studentsCount`/`groupsCount`/`teachersCount`) are present as `<b class="tabular">` elements; every "View course" CTA is a real `<a href>` (not a `data-drawer` button); the filter bar narrows with a count and no-results state; `data-no-results` is present; no `id="app"`; relative `./assets/` paths; no external/CDN requests (no table/chart/form lib). Axe critical = 0.
- **Screenshots** (screenshot-acceptance, R56): Courses AR-RTL light desktop, AR-RTL dark desktop, EN-LTR light desktop, mobile Courses AR-RTL light — verdicts appended to `app/screenshots/REVIEW.md`.
- Binds to `course-profile-contract.md` (the "View course" target), the Spec 002 `../../002-admin-core-operations/contracts/navigation-ia-contract.md` (courses stays `implemented`; no new nav items introduced here), `../../002-admin-core-operations/contracts/interaction-patterns-contract.md` (IP2 filterBar / IP8 no-dead-button / IP9 honesty), `../../002-admin-core-operations/contracts/directory-pages-contract.md` (directory anatomy). The Spec 003 `static-html-django-ready-contract.md` (SD1/SD5–SD8) remains in force.
- MUST NOT: introduce a course-management/enrollment/curriculum engine; use a table, chart, or form library; render a numeric-only or color-only status chip; claim any metric not backed by a fixture field; dead-link to `course.html` if that file is not baked (bake it); introduce any new `data-*` hook not listed in §11.
