# Contract: Family / Student Navigation IA

**Status**: Binding · The Spec 004 navigation reconciliation — promotes `families`/`addFamily` to real pages, registers `family.html`/`student.html` as profile templates (NOT nav items), keeps the rest of the `families` category planned, and forbids dead links and rendered portals. Extends `../../002-admin-core-operations/contracts/navigation-ia-contract.md` (NI2/NI6/NI7/NI9/NI11/NI12/NI14) — that contract is the single source of truth for the IA; this one records only the Spec 004 deltas to the `families` category.

## 1. Promotions (NI12) — exactly two

Spec 004 promotes **exactly two** planned items in the `families` category from `planned` → `implemented`, each following the full NI12 checklist:

- **`families`** → `families.html` (the families directory of family cards) · the route is already reserved in `FUTURE_ROUTES` (NI9), so promotion only sets `status: 'implemented'` + `route: 'families.html'`, drops the «قريبًا/Soon» pill, and adds the `PAGES` entry / topbar meta / smoke row / screenshot rows.
- **`addFamily`** → `add-family.html` (the baked Add/Edit-family wizard) · `addFamily` has **no** reserved route today, so promotion MUST **add `add-family.html` to `FUTURE_ROUTES`** (NI9) at the same time it sets `status: 'implemented'` + `route: 'add-family.html'`.

Both items stay inside the **`families` category** so `categoryOf` keeps the families panel open on every Spec 004 page. No other nav item changes status. After promotion the `families` category owns **four** implemented routes — `families.html`, `add-family.html`, `students.html`, `courses.html` — and the families-category implemented count rises accordingly in NI3's totals.

## 2. Build-time guard MUST stay green

The `nav.config.js` build-time guard (NI6) MUST pass after the promotions: every `implemented` item (`families`, `addFamily`, `students`, `courses`) has a real `route`; no non-implemented item has a `route`; no `disabled` item lacks a `reasonKey`. A half-finished promotion (route without `implemented` status, or `implemented` without a route) MUST fail the build — **a dead link cannot ship**. The two new routes (`families.html`, `add-family.html`) MUST be real generated files in `public/` before or with the promotion, never a `route` pointing at an unbuilt page.

## 3. Profile templates are REGISTERED pages, NOT nav items

`family.html` and `student.html` are the codebase's first **per-entity profile templates** (research R22, spec D2). They are registered in the SSG `PAGES` list but are **NOT** `NAV_CATEGORIES` items and MUST NOT appear as rows in any category panel:

- **Registration** — each gets a `PAGES` entry `{ base, activeId, titleKey, crumbKey, render }`. `family.html` uses **`activeId: 'families'`**; `student.html` uses **`activeId: 'students'`** — so the existing `families` / `students` nav item wears the violet `is-active[aria-current="page"]` pill while a profile is open (exactly one active item per page, NI7).
- **Not a nav row** — neither id is added to `nav.config.js`; the nav rail/panel never grows a "family profile" or "student profile" link. They are reached **only** via in-content **"view profile"** links — from a family card / wizard review (→ `family.html`) and from a students-list row / a family profile's Students tab (→ `student.html`).
- **One representative baked template each** — the static site bakes ONE `family.html` and ONE `student.html` over a representative fixture entity; per-id pages are a Django concern (§7). Runtime JS MUST NOT synthesize per-id profile routes.

## 4. The families category — what STAYS planned (no dead links)

Only `families`/`addFamily` are promoted. Every other `families`-category item **MUST stay `planned`** — rendered as a `<button>` + «قريبًا/Soon» pill with **no `route`**, firing only the coming-soon toast (NI2/NI7):

- `familyCategories` — surfaced instead as a **filter facet + chips** on `families.html` (research R28, spec D6); the nav row stays planned (a dedicated categories-admin page is a later spec).
- `groups` — a learning construct; display chips only on the student profile (data-model `StudentGroup`); the full module and its nav row stay planned.
- `scheduleSearch` — stays planned (no page).
- `studentResult` — surfaced instead as the **Results tab** inside `student.html` (research R26, spec D5); the nav row stays planned (its `student-results.html` route reservation in `FUTURE_ROUTES` is untouched — reserved, not built).
- `studentEvaluation` — surfaced instead as the **Evaluation tab** inside `student.html` (research R27); the nav row stays planned (its reserved `student-evaluation.html` is untouched).

`students` and `courses` remain `implemented` as before; `students.html` is enriched (a real `familyId` + family facet + "view profile" link) without changing its nav id/route/status.

## 5. No-dead-link rule (binding)

Every nav affordance MUST either navigate to a real page or explain itself. Concretely: only `implemented` items are `<a href>` with a real route; `planned` items are `<button data-coming-soon>` (no `href` → impossible to dead-link); `family.html`/`student.html` are reached via real in-content `<a href>` links to generated files; the wizard's "add child" / "view profile" affordances resolve to a real page or a demo/disabled action. **No anchor without a route; no silent button; no link to an unbuilt page.** Enforced by the build guard (§2) and the smoke no-dead-nav assertion (§8).

## 6. Future-role / portal rule (never rendered)

Student / family / teacher **portals and role dashboards** stay `future-role` (NI11) and MUST NOT be rendered anywhere in Spec 004 — not in the admin nav, not as a profile-page mode, not behind any link. The `family.html`/`student.html` profiles are **admin-facing** views of fixture data; they are NOT the family/student portal and MUST NOT impersonate one (no "my children", no parent/student login view, no role switcher). When those portals are later specified they get their own approved spec and a cheerful, non-admin visual language distinct from this calm admin shell. `FUTURE_ROLE` ids (`teacher-portal`, `family-portal`, `student-portal`) stay absent from the DOM.

## 7. Timetable deep-link (language-aware)

The family/student profile Schedule/Timetable sections (research R29, spec D7) MUST provide a **"View in schedule"** deep-link that targets the existing Spec 003 timetable view via the tabs widget's hash token:

- Arabic pages link to **`schedule.html#view=timetable`**; English pages (`family.en.html` / `student.en.html`) link to **`schedule.en.html#view=timetable`** — language-aware via the established `langRoute()`, never a hard-coded cross-language link.
- The link is a real relative anchor to an in-scope, already-built page (no dead link); the `#view=timetable` hash opens the Timetable tab per `../../003-timetable-scheduling/contracts/schedule-tabs-contract.md` §6 (hash wins on load). The full timetable engine is **not** duplicated into the profile — the section reuses `scheduleAgenda` + the shared appointment drawer.

## 8. Enforcement (smoke)

`tests/smoke/run.cjs` MUST assert, on every built page (AR + EN):

- **Promotions are real anchors** — `families` and `addFamily` nav rows are `<a href>` resolving to `families.html` / `add-family.html` (real routes, not `#`); they carry no `data-coming-soon`.
- **The rest stay Soon** — `familyCategories`, `groups`, `scheduleSearch`, `studentResult`, `studentEvaluation` are `<button data-coming-soon>` with **no** `href`.
- **No dead nav links** — every `.nav-panel .nav-item` is an `<a>` with a real route OR carries `data-coming-soon`/`data-disabled-reason` (inherits NI14).
- **Profiles register, don't navigate the rail** — `family.html`/`student.html` are in the SSG `PAGES` list with `activeId` `families`/`students`; on each, exactly **one** `.nav-item.is-active[aria-current="page"]` (the `families` / `students` row), and **no** `family`/`student` nav row exists in any panel.
- **Profiles are reachable** — `families.html` family cards and the students-list rows expose a real "view profile" `<a href>` to `family.html` / `student.html`.
- **Deep-link present + language-aware** — each profile's Schedule/Timetable section contains a relative `schedule.html#view=timetable` (AR) / `schedule.en.html#view=timetable` (EN) anchor.
- **No portals in DOM** — `teacher-portal` / `family-portal` / `student-portal` ids are absent from the rendered markup of every page.

## 9. Django mapping

- The promoted items → `{% url 'families' %}` / `{% url 'add_family' %}` anchors; status/route resolve from the same `NAV_CATEGORIES` context server-side (no JS-generated nav).
- `family.html` / `student.html` → `templates/admin/family.html` / `student.html` reached at **`family/<id>`** / **`student/<id>`** (the one baked template becomes the per-id view); `activeId` (`families`/`students`) is passed to the shared sidebar partial so the nav stays correctly active.
- "View profile" links → `{% url 'family' family.id %}` / `{% url 'student' student.id %}`; the timetable deep-link → `{% url 'schedule' %}#view=timetable` (language via `LocaleMiddleware`).
- `planned` rows → `{% if perms %}` / Soon partials; `future-role` portals are not emitted. All behavior keys stay stable `data-*` attributes; no JS-generated ids/classes.
