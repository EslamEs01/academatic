# Contract: Navigation Impact (Courses, Groups and Learning Paths)

**Status**: Binding · The Spec 006 navigation reconciliation — promotes **exactly one** existing planned item, `groups`, to a real page inside the **`families` category**, registers three new build-html PAGES entries (`groups`, `course`, `group`) and one enriched regeneration (`courses`), keeps every other planned item planned and every other implemented route intact, and forbids dead links and rendered portals. Extends `../../002-admin-core-operations/contracts/navigation-ia-contract.md` (NI2/NI6/NI7/NI9/NI11/NI12/NI14) — that contract is the single source of truth for the IA; this one records only the Spec 006 delta to the `families` category.

---

## 1. Promotion (NI12) — exactly one item: `groups`

Spec 006 promotes **exactly one** existing planned item, and it is `groups` — already sitting in `NAV_CATEGORIES[id:'families'].items` with `status:'planned'`, `icon:'students'`, and `groups: 'groups.html'` already reserved in `FUTURE_ROUTES` (research R45, spec FR-009):

- **`groups`** → `groups.html` (the Groups directory / cohort board). Promotion **drops the explicit `status:'planned'`** (the `item()` factory defaults to `'implemented'`) and **adds `route:'groups.html'`**. The icon stays `'students'` — the students/users glyph is the correct academic cohort metaphor (a group = one teacher + many students sharing a schedule; R45); no icon change is needed and none is introduced.
- `groups: 'groups.html'` is **already present** in `FUTURE_ROUTES` (reserved from the prior nav-config cycle). The live route matches the reserved string; **no change to `FUTURE_ROUTES` is required at promotion** (the register is honest with or without the removed entry; following the established pattern it stays as historical documentation).
- Nav label **«المجموعات» / "Groups"** (`labelKey: 'nav.groups'`); the page title is «المجموعات» / "Groups" (`topbar.title.groups`); the breadcrumb is `topbar.crumb.groups`.

**Exact `nav.config.js` diff intent** (one-line change in the `families` items array):

```js
// Before (planned, no route):
item({ id: 'groups', labelKey: 'nav.groups', icon: 'students', status: 'planned' }),

// After (implemented — status field dropped; factory defaults to 'implemented'):
item({ id: 'groups', labelKey: 'nav.groups', icon: 'students', route: 'groups.html' }),
```

No other nav item changes `status`, gains or loses a `route`, or changes category. After this promotion, the `families` category owns **five** implemented routes: `families.html`, `add-family.html`, `students.html`, `courses.html`, `groups.html`.

**Label / icon verification (binding):** the AR label «المجموعات» and EN "Groups" MUST render without RTL-reversed wording or mojibake in both directions; `nav.groups` is an i18n key (no raw key leak); the icon is the pre-existing vendored `students` glyph (no new vendor step required).

---

## 2. Page registration (NI12 step 1) — `groups` is a NAV item AND a page; `course`/`group` are profile templates only

### 2a. `groups` (nav item + directory page)

`groups.html` is registered in the SSG `PAGES` list as a **nav-item page** — its `activeId` equals its own nav id (`'groups'`), so on `groups.html` (+ `.en`) the **`groups`** row wears the violet `is-active[aria-current="page"]` pill. `categoryOf('groups')` returns `'families'`, so the **families** panel is the only visible `.cat-panel`.

### 2b. `course.html` and `group.html` (profile templates — NOT nav items)

`course.html` / `group.html` follow the **exact `family.html → activeId:'families'` / `student.html → activeId:'students'` pattern** from Spec 004: they are baked SSG PAGES but MUST NOT appear as nav items in `NAV_CATEGORIES`.

| page (+ `.en`) | base | activeId | nav item highlighted | category panel open |
|---|---|---|---|---|
| `groups.html` | `groups` | `'groups'` | `groups` (families cat) | `families` |
| `course.html` | `course` | `'courses'` | `courses` (families cat) | `families` |
| `group.html` | `group` | `'groups'` | `groups` (families cat) | `families` |

On `course.html`, the `courses` nav item (already implemented) wears the active pill — no nav-config change is needed. On `group.html`, the `groups` item (promoted in §1) wears the active pill. In both cases `categoryOf` returns `'families'` → exactly one visible panel, exactly one active item. Neither `course` nor `group` may appear in `NAV_CATEGORIES`.

### 2c. NI12 promotion checklist for `groups` (all six steps in one change)

1. **Build registry** — the `PAGES` entry (§3).
2. **nav.config** — `status:'implemented'` (via factory default) + `route:'groups.html'`; drop `status:'planned'`; no Soon/badge affordance (§1).
3. **Topbar meta** — `topbar.title.groups` / `topbar.crumb.groups` (AR + EN strings in `ar.crs.js` / `en.crs.js`, §3); `nav.groups` label pre-exists.
4. **Smoke** — add `groups`, `course`, `group` to the smoke `PAGES` list (inherits the IA assertions; §9).
5. **Screenshot acceptance** — add the Spec 006 screenshot-matrix rows (R56).
6. **Screenshot review** — capture + review against the Spec 001–005 visual target.

---

## 3. Build-html PAGES entries

Four entries are added or regenerated in `scripts/build-html.mjs` (the `courses` entry already exists; the other three are new):

```js
// Spec 006 — enriched courses / groups directory / profile templates
{ base: 'courses', activeId: 'courses', titleKey: 'topbar.title.courses', crumbKey: 'topbar.crumb.courses', render: renderCourses },  // REGENERATED (enriched renderer — replaces existing entry)
{ base: 'groups',  activeId: 'groups',  titleKey: 'topbar.title.groups',  crumbKey: 'topbar.crumb.groups',  render: renderGroups  },  // NEW directory page
{ base: 'course',  activeId: 'courses', titleKey: 'topbar.title.course',  crumbKey: 'topbar.crumb.course',  render: renderCourse  },  // NEW profile template
{ base: 'group',   activeId: 'groups',  titleKey: 'topbar.title.group',   crumbKey: 'topbar.crumb.group',   render: renderGroup   },  // NEW profile template
```

The `courses` entry's `render` is replaced with an enriched `renderCourses` that adds academic counts, group/teacher links, and `course.html` card links (FR-001, FR-002). **No new build tool is introduced**; all four entries use the same `shellMarkup` + per-page `render()` path as every existing page. Each generates two files (AR default + `.en`).

**i18n keys required** (topbar meta, binding — added to `ar.crs.js` / `en.crs.js`):

| key | Arabic | English |
|---|---|---|
| `topbar.title.groups` | «المجموعات» | "Groups" |
| `topbar.crumb.groups` | «المجموعات» | "Groups" |
| `topbar.title.course` | «تفاصيل الدورة» | "Course" |
| `topbar.crumb.course` | «تفاصيل الدورة» | "Course" |
| `topbar.title.group` | «تفاصيل المجموعة» | "Group" |
| `topbar.crumb.group` | «تفاصيل المجموعة» | "Group" |

`topbar.title.courses` / `topbar.crumb.courses` are pre-existing (no change).

---

## 4. Topbar apps-grid (NI15 — justified optional addition)

The topbar apps-grid quick-launcher (NI15) shows the implemented pages. Adding `groups` is a **justified minimal addition** (one new cell in an existing grid) since `groups` is now an implemented page. The cell MUST be a real `<a href>` (language-aware via `langRoute()`). `course.html` and `group.html` MUST NOT appear in the apps-grid — they are profile templates, not nav destinations. All other implemented pages (including the enriched `courses`) keep their cells unchanged. The topbar structure (NI15 cluster order, behavior, menu structure) is otherwise **unchanged**.

---

## 5. Build-time guard MUST stay green (no dead links)

The `nav.config.js` build-time guard (NI6) MUST pass after the promotion:

- `groups` becomes `implemented` with `route:'groups.html'` → "implemented item needs a route" branch passes.
- `familyCategories`, `scheduleSearch`, `studentResult`, `studentEvaluation` remain `planned` with no `route` → "non-implemented item must not have a route" branch passes.
- `courses` retains `route:'courses.html'` → unchanged, guard passes.
- `course.html` and `group.html` are SSG PAGES but NOT nav items → they never enter the guard loop.
- No `disabled` item is introduced; existing `disabled` items retain their `reasonKey`.

A half-finished promotion (route present without `status:'implemented'`, or `status:'implemented'` without a route) MUST fail the build before any page can be generated.

---

## 6. FUTURE_ROUTES state after promotion

`FUTURE_ROUTES` reserves intended routes for planned items. The relevant `families`-category state after Spec 006:

| item `id` | status | route | in `FUTURE_ROUTES`? |
|---|---|---|---|
| `families` | implemented | `families.html` | n/a |
| `addFamily` | implemented | `add-family.html` | n/a |
| `students` | implemented | `students.html` | n/a |
| `courses` | implemented | `courses.html` | n/a |
| `familyCategories` | planned | — | no (reserve at promotion) |
| `groups` | **implemented** | **`groups.html`** | already `groups:'groups.html'` — now a live route |
| `scheduleSearch` | planned | — | no |
| `studentResult` | planned | — | yes — `student-results.html` (untouched) |
| `studentEvaluation` | planned | — | yes — `student-evaluation.html` (untouched) |

All `control`, `teachers`, `reports`, `admin`, and `settings` `FUTURE_ROUTES` entries are **unchanged**. No entry is added; no entry is removed.

---

## 7. What stays planned / unchanged across all categories

- **`control`** — `home`/`sessions`/`schedule`/`attendance` remain implemented (four routes). `sessionsAnalysis` and all other planned items stay `planned` (no route). Unchanged.
- **`teachers`** — `teachers` implemented; `addTeacher`/`teacherCategories`/KPI items planned. Unchanged.
- **`reports`** — `reports` implemented; finance items disabled with `nav.reason.finance`. Unchanged.
- **`admin`** — all items planned or disabled. Unchanged.
- **`settings`** — `settings` implemented; sub-items planned. Unchanged.
- **Portals** — `teacher-portal`, `family-portal`, `student-portal` remain `future-role` (never rendered, absent from DOM). No portal or role-dashboard is introduced in any Spec 006 page.

---

## 8. No-dead-link rule (binding)

Every nav affordance and every in-content link MUST either navigate to a real page or explain itself:

- Only `implemented` items are `<a href>` with a real route; `planned` items are `<button data-coming-soon>` (no `href`).
- In-content links from course cards → `course.html` (real, built); from group rows → `group.html` (real, built); from group profile Course tab → `course.html`; from student/family integrations → `student.html` / `family.html` (pre-existing implemented pages).
- Timetable deep-links: `schedule.html#view=timetable` (existing Spec 003 page).
- Attendance deep-links: `attendance.html` (existing Spec 005 page).

**No anchor without a route; no silent button; no link to an unbuilt page.** Enforced by the build guard (§5) and the smoke no-dead-nav assertion (§9).

---

## 9. Enforcement (smoke)

`tests/smoke/run.cjs` MUST assert, with `groups`, `course`, and `group` added to its `PAGES` list, on every built page (AR + EN):

- **Promotion is a real anchor** — the `groups` nav row is an `<a href>` resolving to `groups.html` / `groups.en.html`; it carries **no** `data-coming-soon`.
- **Profile templates highlight the correct parent** — on `course.html`, exactly one `is-active[aria-current="page"]` item is the `courses` row; on `group.html`, exactly one active item is the `groups` row; the `families` panel is the only visible `.cat-panel` on both.
- **Planned items in families stay Soon** — `familyCategories`, `scheduleSearch`, `studentResult`, `studentEvaluation` are `<button data-coming-soon>` with **no** `href`.
- **No dead nav links** — every `.nav-panel .nav-item` is an `<a>` with a real route OR carries `data-coming-soon` / `data-disabled-reason`.
- **Exactly one active item** — exactly one `.nav-item.is-active[aria-current="page"]` per page.
- **Six category tabs, one visible panel** — unchanged rail invariant; no shell regression.
- **In-content deep-links present** — `courses.html` cards link to `course.html`; `groups.html` rows link to `group.html`; `group.html` Course tab links to `course.html`; cross-links to `student.html` / `family.html` / `schedule.html` / `attendance.html` resolve.
- **No portals in DOM** — `teacher-portal` / `family-portal` / `student-portal` ids absent from every page's markup.
- **Guard is green at build** — `groups` is implemented-with-route; planned items are non-implemented-without-route; disabled items keep their `reasonKey`.

---

## 10. Django mapping

- `groups` nav item → `{% url 'groups' %}` anchor in `_sidebar.html`; `activeId:'groups'` passed to the sidebar partial keeps the `groups` row active on `groups.html` and `group.html`.
- `courses` nav item → `{% url 'courses' %}` (existing); `activeId:'courses'` keeps it active on `courses.html` and `course.html`.
- `public/groups.html` → `templates/admin/groups.html`; `public/course.html` → `templates/admin/course_detail.html`; `public/group.html` → `templates/admin/group_detail.html`. The shell → shared `_sidebar.html` / `_topbar.html` / `_page_header.html` partials (unchanged structure). Django routes: `courses/` → list view, `courses/<id>/` → detail view; `groups/` → list view, `groups/<id>/` → detail view.
- `planned` rows stay `{% if perms %}`/Soon partials; no Django URL required for unbuilt planned pages.
- `future-role` portals are not emitted. All `data-*` behavior keys are stable; no JS-generated ids/classes.

---

## 11. Cross-references

- `../../002-admin-core-operations/contracts/navigation-ia-contract.md` — single source of truth for the IA (NI2 status taxonomy, NI6 guard, NI7 rendering, NI9 `FUTURE_ROUTES`, NI11 portals, NI12 promotion checklist, NI14 enforcement). This contract records only the Spec 006 `families`-category delta.
- `../005-attendance-session-outcomes/contracts/navigation-impact-contract.md` — the Spec 005 precedent for the NI12 promotion checklist (new item born + promoted simultaneously); Spec 006 promotes an **existing** planned item — the checklist is otherwise identical.
- `static-html-django-ready-contract.md` (Spec 006) — how `groups.html`, `course.html`, `group.html` are baked + map to Django templates; the `data-*` hooks; the no-new-hook rule.
- Spec 006 `research.md` R45 — the routing/nav decision; R54 — the i18n keys and topbar meta.
- Spec 006 `spec.md` FR-009 — the functional requirement this contract implements.
