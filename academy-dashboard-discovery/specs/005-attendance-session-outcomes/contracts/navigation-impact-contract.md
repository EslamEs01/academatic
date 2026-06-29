# Contract: Navigation Impact (Attendance & Session Outcomes)

**Status**: Binding · The Spec 005 navigation reconciliation — promotes **exactly one** new item, `attendance`, to a real page inside the **`control` category**, adds its route to `FUTURE_ROUTES` at promotion, keeps `sessionsAnalysis` and every other planned `control` item planned, registers no new profile templates, and forbids dead links and rendered portals. Extends `../../002-admin-core-operations/contracts/navigation-ia-contract.md` (NI2/NI6/NI7/NI9/NI11/NI12/NI14) — that contract is the single source of truth for the IA; this one records only the Spec 005 delta to the `control` category.

## 1. Promotion (NI12) — exactly one

Spec 005 promotes **exactly one** item, and it is a **NEW** item created in the `control` category (research R32, spec D1, FR-012). The reference's daily session-outcomes board ("Home / Classes Of {date}") lives in daily operations beside Sessions and Schedule; `attendance` is therefore born in the **`control` category** and promoted in the same step:

- **`attendance`** → `attendance.html` (the Attendance / Outcomes board) · `attendance` has **no** reserved route today (it is not in `FUTURE_ROUTES`), so promotion MUST **add `attendance: 'attendance.html'` to `FUTURE_ROUTES`** (NI9) at the same moment it adds the item to `NAV_CATEGORIES[control].items` with `status: 'implemented'` + `route: 'attendance.html'` — exactly the pattern `addFamily` followed in Spec 004 (a new item whose route is reserved at promotion, not before).
- Nav label **«الحضور» / "Attendance"** (`labelKey: 'nav.attendance'`); a calm check/clipboard glyph vendored from `lucide-static` (icon independent of the id, per NI7). The page **title** is «الحضور ونتائج الجلسات» / "Attendance & Session Outcomes" (`topbar.title.attendance`); the breadcrumb is `topbar.crumb.attendance`.

The exact `nav.config.js` delta (a NEW item appended to the `control` category's `items`, beside `home`/`sessions`/`schedule`):

```js
// NAV_CATEGORIES[id:'control'].items — add:
item({ id: 'attendance', labelKey: 'nav.attendance', icon: 'clipboard-check', route: 'attendance.html' }),
// FUTURE_ROUTES — add (reserved at promotion, like addFamily in Spec 004):
attendance: 'attendance.html',
```

The item stays inside the **`control` category** so `categoryOf('attendance')` keeps the control panel open on every Attendance page. **No other nav item changes status.** After promotion the `control` category owns **four** implemented routes — `dashboard.html`, `sessions.html`, `schedule.html`, `attendance.html` — and the control-category implemented count rises by one in NI3's totals (and the project total from 8 → 9 implemented pages).

**Label / icon verification (binding):** the AR label «الحضور» and EN "Attendance" MUST be verified to render correctly in both directions (no RTL-reversed wording, no mojibake); the icon is a calm, vendored `lucide-static` glyph (e.g. `clipboard-check`) — **never** a copied legacy icon set (tabler / Font Awesome). The label is an i18n key (`nav.attendance`), not literal text, so no raw key leaks.

## 2. Page registration (NI12 step 1) — `attendance` is a NAV item AND a page

`attendance.html` is registered in the SSG `PAGES` list in `scripts/build-html.mjs` exactly as:

```js
{ base: 'attendance', activeId: 'attendance', titleKey: 'topbar.title.attendance', crumbKey: 'topbar.crumb.attendance', render: renderAttendance }
```

Unlike the Spec 004 `family.html`/`student.html` profile templates (which are pages but NOT nav items, borrowing `activeId: 'families'`/`'students'`), `attendance` **is itself a nav item**: its `activeId` equals its own nav id (`'attendance'`), so on `attendance.html` the **`attendance` row** wears the violet `is-active[aria-current="page"]` pill (exactly one active item per page, NI7). The page is generated per-language — `attendance.html` (AR, `dir="rtl"`) + `attendance.en.html` (EN, `dir="ltr"`) — by the same `shellMarkup` + `render()` path as every other page (no new build tool).

The NI12 promotion checklist for `attendance` (all six steps in one change):

1. **Build registry** — the `PAGES` entry above (`render: renderAttendance`).
2. **nav.config** — `status:'implemented'` + `route:'attendance.html'`; add to `FUTURE_ROUTES` (§1); no Soon/badge affordance.
3. **Topbar meta** — `topbar.title.attendance` / `topbar.crumb.attendance` (+ AR/EN strings) and the `nav.attendance` label; optionally the apps-grid cell.
4. **Smoke** — add `attendance` to the smoke `PAGES` list (inherits the IA assertions; §7).
5. **Screenshot acceptance** — add the Spec 005 `attendance` rows (`screenshot-acceptance.md`).
6. **Screenshot review** — capture + review against the Spec 001 visual target.

## 3. Build-time guard MUST stay green (no dead links)

The `nav.config.js` build-time guard (NI6) MUST pass after the promotion: every `implemented` item (`home`, `sessions`, `schedule`, **`attendance`**) has a real `route`; no non-implemented item has a `route`; no `disabled` item lacks a `reasonKey`. A half-finished promotion — `route: 'attendance.html'` without `status: 'implemented'`, or `status: 'implemented'` without a `route` — MUST **fail the build**, so a dead link cannot ship. The `attendance.html` (+ `.en.html`) files MUST be real generated outputs in `public/` before or with the promotion — never a `route` pointing at an unbuilt page.

## 4. The control category — what STAYS planned (no dead links)

Only `attendance` is promoted. **Every other `control`-category item MUST stay `planned`** — rendered as a `<button>` + «قريبًا/Soon» pill with **no `route`**, firing only the coming-soon toast (NI2/NI7). In particular:

- **`sessionsAnalysis`** — the count+hours **analytics** roll-up (Regular/Trial/Helper) — is a **distinct surface** and stays `planned`; its `FUTURE_ROUTES` reservation `sessions-analysis.html` is **untouched** (reserved, not built). Spec 005's Attendance page is NOT Sessions Analysis (research R32 — wrong semantics to reuse it).
- `messages`, `leads`, `tasks`, `announcements`, `timeConverter`, `publicHoliday`, `scheduledActions` — all stay `planned` (Soon buttons, no route), unchanged.

`home`, `sessions`, `schedule` remain `implemented` as before. `sessions.html`, `student.html`, `family.html`, and `dashboard.html` are **regenerated** with light fixture-only outcome integration (an outcome chip / hint + the shared outcome drawer + a "View attendance" deep-link) **without changing any nav id/route/status**.

## 4b. Shell invariant (one active item · one visible panel)

The Spec 001/002 shell invariants MUST hold on every Attendance page:

- **Exactly one active item** — exactly one `.nav-item.is-active[aria-current="page"]` per page; on `attendance.html` (+ `.en`) it is the **`attendance`** row (its `activeId === 'attendance'`). No other item carries the active pill.
- **`categoryOf('attendance')` opens `control`** — `categoryOf` returns `'control'` (the category whose flattened `catItems` include `attendance`), so the **control** panel is the single visible `.cat-panel` on load, with `attendance` active inside it. The other five category panels stay `hidden`.
- **Six rail tabs, one visible panel** — the slim rail still shows exactly six category tabs; exactly one `.cat-panel` is not `hidden`. **>1 visible category panel = a shell regression = fail.** No rail growth: `attendance` is a panel link, never a new rail tab.

## 4c. `FUTURE_ROUTES` state after promotion

`FUTURE_ROUTES` reserves the intended route for each planned item; `attendance` is **not** in it today and MUST be added at promotion (§1). The relevant `control`-category state after the change:

| item `id` | status | route | in `FUTURE_ROUTES`? |
|---|---|---|---|
| `attendance` | **implemented** | `attendance.html` | **added at promotion** (now a live route) |
| `sessionsAnalysis` | planned | — | yes — `sessions-analysis.html` (reserved, untouched) |
| `messages` / `leads` / `tasks` / `announcements` | planned | — | `messages.html` / `leads.html` / `tasks.html` / `announcements.html` (untouched) |
| `timeConverter` / `publicHoliday` / `scheduledActions` | planned | — | not reserved (reserve at their own promotion) |

Adding `attendance: 'attendance.html'` to `FUTURE_ROUTES` keeps the register honest: a promoted item's live route is the same string the register reserved. No other `FUTURE_ROUTES` entry changes.

## 5. No-dead-link rule (binding)

Every nav affordance MUST either navigate to a real page or explain itself. Concretely:

- only `implemented` items are `<a href>` with a real route; `planned` items are `<button data-coming-soon>` (no `href` → impossible to dead-link);
- the in-content **"View attendance"** deep-links (from Sessions rows, the outcome drawer, and the Student/Family profile hints) resolve to the real, built `attendance.html` (language-aware via `langRoute()`);
- every outcome-row / drawer action navigates, opens the drawer/confirm, filters, demos with a toast, or is disabled-with-reason.

**No anchor without a route; no silent button; no link to an unbuilt page.** Enforced by the build guard (§3) and the smoke no-dead-nav assertion (§7).

## 6. No new profile templates · future-role / portal rule (never rendered)

- **No new profile templates.** Spec 005 adds exactly **one** registered page (`attendance`) and reuses the existing `student.html`/`family.html` profile templates for its integrations — it MUST NOT register a new per-entity profile page, and it MUST NOT add a "teacher attendance profile" or any per-id outcome page (Django handles per-id later, §8).
- **Future-role / portals stay absent.** Student / teacher / family **portals and role dashboards** stay `future-role` (NI11) and MUST NOT be rendered anywhere in Spec 005 — not in the admin nav, not as an Attendance-page mode, not behind any deep-link. The Attendance page is an **admin-facing** view of fixture outcomes; it is NOT a parent/student/teacher attendance portal and MUST NOT impersonate one (no "my child's attendance", no role switcher). The `FUTURE_ROLE` ids (`teacher-portal`, `family-portal`, `student-portal`) stay absent from the DOM of every page.

## 6b. Integration deep-links (in-content, language-aware, no new nav)

The light Spec 005 integrations reach `attendance.html` only through **in-content** links — never a new nav row:

- **Sessions** (`sessions.html`) — each row's outcome view + a "View attendance" affordance is a relative `<a href>` to `attendance.html` (AR) / `attendance.en.html` (EN).
- **Student profile** (`student.html`) — the recent-outcomes/attendance hint carries a "View attendance" deep-link (language-aware).
- **Family profile** (`family.html`) — the children follow-up hint carries a "View attendance" deep-link (language-aware).
- **Dashboard** (`dashboard.html`) — the single folded follow-up count chip deep-links to the (filtered) Attendance surface.

Each is a real anchor to an in-scope, already-built page (no dead link); none adds a nav item, a profile template, or a portal. The schedule deep-link stays `schedule.html#view=timetable` (Spec 003/004), unchanged.

## 7. Enforcement (smoke)

`tests/smoke/run.cjs` MUST assert (with `attendance` added to its `PAGES` list, inheriting the NI14 IA assertions), on every built page (AR + EN):

- **Promotion is a real anchor** — the `attendance` nav row is an `<a href>` resolving to `attendance.html` / `attendance.en.html` (a real route, not `#`); it carries **no** `data-coming-soon`.
- **The rest of control stay Soon** — `sessionsAnalysis`, `messages`, `leads`, `tasks`, `announcements`, `timeConverter`, `publicHoliday`, `scheduledActions` are `<button data-coming-soon>` with **no** `href`.
- **No dead nav links** — every `.nav-panel .nav-item` is an `<a>` with a real route OR carries `data-coming-soon` / `data-disabled-reason` (inherits NI14).
- **Exactly one active item** — on `attendance.html` exactly **one** `.nav-item.is-active[aria-current="page"]` exists and it is the `attendance` row; `categoryOf('attendance')` leaves exactly one visible `.cat-panel` and it is `data-nav-panel="control"`.
- **Six category tabs, one visible panel** — unchanged invariant (≥6 rail tabs, exactly one `.cat-panel` not `hidden`); no shell regression.
- **Deep-links present + language-aware** — `sessions.html` rows, the outcome drawer, and the Student/Family profile hints expose a relative `attendance.html` (AR) / `attendance.en.html` (EN) anchor.
- **No portals in DOM** — `teacher-portal` / `family-portal` / `student-portal` ids are absent from the rendered markup of every page.
- **No new profile template** — no per-id outcome/attendance page is registered; the only Spec 005 `PAGES` addition is `attendance`.
- **Guard is green at build** — the build does not throw (`nav.config.js` guard passes): `attendance` is implemented-with-route; `sessionsAnalysis` and the rest are non-implemented-without-route; disabled items keep their `reasonKey`.

## 8. Django mapping

- The promoted item → `{% url 'attendance' %}` anchor; `status`/`route` resolve from the same `NAV_CATEGORIES` context server-side (no JS-generated nav).
- `attendance` joins the apps-grid quick-launcher's implemented-pages list **optionally** (NI15) — no new clutter required; the topbar structure is otherwise unchanged.
- `public/attendance.html` → `templates/admin/attendance.html`; the shell → the shared `_sidebar.html` / `_topbar.html` / `_page_header.html` partials; `activeId: 'attendance'` passed to the sidebar partial so the `attendance` row stays active.
- "View attendance" deep-links → `{% url 'attendance' %}` (filtered via a querystring/`#` later if wanted); the timetable deep-link stays `{% url 'schedule' %}#view=timetable` (language via `LocaleMiddleware`).
- `planned` rows (incl. `sessionsAnalysis`) → `{% if perms %}` / Soon partials; `future-role` portals are not emitted. All behavior keys stay stable `data-*` attributes; no JS-generated ids/classes.

## 9. Cross-references

- `../../002-admin-core-operations/contracts/navigation-ia-contract.md` — the single source of truth for the IA (NI2 status taxonomy, NI6 guard, NI7 rendering, NI9 `FUTURE_ROUTES`, NI11 portals, NI12 promotion checklist, NI14 enforcement). This contract records only the Spec 005 `control`-category delta.
- `static-html-django-ready-contract.md` (Spec 005) — how `attendance.html` is baked + maps to a Django template; the `data-*` hooks; the one-new-hook rule.
- `scope-guard.md` (Spec 005) — confirms only `attendance` is promoted, `sessionsAnalysis` + the rest stay planned, and no portal/profile-template/engine is added.
- `screenshot-acceptance.md` (Spec 005) — the `attendance` screenshot rows + the shell-invariant cross-check (one active item, one visible panel, no portal chrome).
