# Contract: Navigation Information Architecture (admin category rail + topbar)

> **Single source of truth** for the admin navigation IA. This contract documents
> the IA **as already implemented** in `app/src/js/nav.config.js`,
> `app/src/js/components/sidebar.js`, `app/src/js/components/topbar.js`,
> `app/src/js/enhance.js`, `app/src/styles/app.css`, and the AR/EN locales
> (`app/src/locales/{ar,en}.js`). It is authoritative and binding; code and contract
> must stay in lockstep.

> **MODEL CHANGE (this revision).** The sidebar is now a **two-level CATEGORY rail**
> that matches `sidebar-reference.png`. The slim rail shows **one icon per CATEGORY**
> (a `role="tablist"` of category tabs); selecting a category swaps the expanded panel
> to show **ONLY that category's links** — **never all categories at once**. This
> replaces the previous "all groups visible in one panel" model (seven groups / a flat
> rail of implemented pages). Where this contract and any older description disagree,
> **this category-rail model wins**.

---

## NI0. Status & scope

**Status**: Binding.

This contract governs the **complete admin Information Architecture**: the **six
category tabs** of the slim rail and the **panel of links each owns**, the per-item
**status taxonomy** (`implemented` / `planned` / `disabled` / `future-role` /
`hidden`), the **rendering** of each status, the **two-level category-switching
behavior**, the **runtime behavior** of each status, the **topbar** cluster, and the
**evolution rules** that govern how a planned/disabled affordance becomes a real page.

Hard architecture constraints carried from Spec 001 / 002 (unchanged here):

- **Static HTML-first** — every page is a complete pre-rendered `public/*.html`; the
  shell + nav markup is baked at build time. **All six category panels are baked into
  the static HTML**; the route's category is visible on load and the rest are `hidden`.
  **No** whole-page `<div id="app">` mount. Runtime JS (`enhance.js`) only attaches
  behavior over existing markup via `data-*` hooks — it **only toggles visibility** of
  the baked panels; it creates no nav content.
- **Arabic RTL is the default** (`<page>.html`); English LTR ships as `<page>.en.html`.
- **Light / Dark / System** themes; logical (RTL-safe) CSS properties throughout.
- **Relative + local assets only** — GitHub-Pages compatible; no CDN.
- **Django-template-ready** — each category panel maps cleanly to a partial /
  `{% if cat == ... %}`; `planned`/`disabled` map to `{% if perms %}` / disabled
  partials; every `data-*` hook is reproducible server-side.
- **NO dead links** — the central guarantee of this IA. Every nav item either
  navigates to a real page or **explains itself** (toast). A build-time guard makes a
  dead link impossible to ship (see NI6).

Out of scope (unchanged): no backend/API/auth/permissions/CRUD, no business modules,
no dashboards/portals. `planned` and `disabled` are **pure nav affordances** with no
module behind them; role portals stay `future-role`.

---

## NI1. Reference source

The reference product **academatic.online** is a **product / UX reference ONLY** — its
IA informs *what jobs an academy admin needs* and the **shape of its two-level rail**,
never copied markup, classes, palette, logo, or wording.

The reference uses a **two-level navigation rail**: a slim vertical strip of
**category** icons on the start edge, and an expanded panel that shows the links of the
**one selected category** at a time. Our admin shell adopts that interaction model
(NI4–NI5) and distils the reference's areas into **six categories** (NI3). Several
reference sub-areas were folded, merged, or deferred rather than shown verbatim
(see NI10); role portals are broken out as separate `future-role` apps (see NI11).

---

## NI2. Status taxonomy

Every nav item carries exactly one `status`. Status decides **how it renders** and
**how it behaves** — this is what guarantees zero dead links. (The rail itself shows
**categories**, not items; status governs the per-item rows inside a category panel.)

| status | meaning | rendered in a category panel? | runtime |
| --- | --- | --- | --- |
| `implemented` | a real static page exists | yes — `<a href>` (may be active) | normal anchor navigation |
| `planned` | upcoming admin spec; no page yet | yes — `<button>` + «قريبًا/Soon» pill | coming-soon toast |
| `disabled` | visible but gated; needs another module | yes — `<button aria-disabled>` + lock | reason toast |
| `future-role` | a separate guarded portal app | **never** | n/a (absent from DOM) |
| `hidden` | discovered but intentionally not shown | **never** | n/a (absent from DOM) |

**No-dead-link guarantee**: only `implemented` items are anchors with an `href`.
`planned`/`disabled` are `<button>`s (no `href` → impossible to dead-link) that always
either toast their state or explain their reason. `future-role`/`hidden` never reach
the DOM. This is enforced three ways — a build-time guard (NI6), the rendering split
(NI7), and a smoke assertion that no nav `<a>` lacks a real route (NI14).

---

## NI3. Final admin sidebar — the canonical table

**Six rail categories**, each owning a panel of its own links. The rail tab icon is
the category's `icon`; each item carries its own sprite `icon` (independent of the item
id). Routes are relative `.html` files (English pages link to the `.en.html` variant
via `langRoute()`). Source of truth: `NAV_CATEGORIES` in `nav.config.js`.

### 1 — `control` · «لوحة التحكم» / Control panel · rail icon `layers`

| Item `id` | `labelKey` (AR / EN) | status | icon | route | affordance |
| --- | --- | --- | --- | --- | --- |
| `home` | الرئيسية / Home | implemented | `home` | `dashboard.html` | — |
| `sessions` | الجلسات / Sessions | implemented | `sessions` | `sessions.html` | **badge 24** |
| `schedule` | الجدول الدراسي / Schedule | implemented | `schedule` | `schedule.html` | — |
| `sessionsAnalysis` | تحليل الجلسات / Sessions analysis | planned | `trending-up` | — | Soon |
| `messages` | المحادثات / Messages | planned | `messages` | — | Soon |
| `leads` | الطلبات الجديدة / New Requests | planned | `inbox` | — | Soon |
| `tasks` | المهام / Tasks | planned | `tasks` | — | Soon |
| `announcements` | الإعلانات والإشعارات / Announcements | planned | `megaphone` | — | Soon |
| `timeConverter` | محوّل الوقت / Time converter | planned | `clock` | — | Soon |
| `publicHoliday` | العطلات الرسمية / Public holidays | planned | `calendar` | — | Soon |
| `scheduledActions` | الإجراءات المجدولة / Scheduled actions | planned | `tasks` | — | Soon |

### 2 — `families` · «العائلات» / Families · rail icon `families`

| Item `id` | `labelKey` (AR / EN) | status | icon | route | affordance |
| --- | --- | --- | --- | --- | --- |
| `families` | العائلات / Families | planned | `families` | — | Soon |
| `addFamily` | إضافة عائلة / Add family | planned | `user-plus` | — | Soon |
| `students` | الطلاب / Students | implemented | `students` | `students.html` | — |
| `courses` | الدورات / Courses | implemented | `curricula` | `courses.html` | — |
| `familyCategories` | فئات العائلات / Family categories | planned | `filter` | — | Soon |
| `groups` | المجموعات / Groups | planned | `students` | — | Soon |
| `scheduleSearch` | بحث الجدول / Schedule search | planned | `search` | — | Soon |
| `studentResult` | نتائج الطلاب / Student results | planned | `check-circle` | — | Soon |
| `studentEvaluation` | تقييم الطلاب / Student evaluation | planned | `sparkles` | — | Soon |

### 3 — `teachers` · «المعلمون» / Teachers · rail icon `trainers`

| Item `id` | `labelKey` (AR / EN) | status | icon | route | affordance |
| --- | --- | --- | --- | --- | --- |
| `teachers` | المعلمون / Teachers | implemented | `trainers` | `teachers.html` | — |
| `addTeacher` | إضافة معلم / Add teacher | planned | `user-plus` | — | Soon |
| `teacherCategories` | فئات المعلمين / Teacher categories | planned | `filter` | — | Soon |

**Sub-section** `cat.teachersPerf` — «مؤشرات الأداء» / Performance (a `.nav-subsection`
inside the same `teachers` panel):

| Item `id` | `labelKey` (AR / EN) | status | icon | route | affordance |
| --- | --- | --- | --- | --- | --- |
| `teacherKpi` | مؤشرات أداء المعلمين / Teacher performance | planned | `trending-up` | — | Soon |
| `sessionsKpi` | مؤشر أداء الحصص / Sessions performance | planned | `trending-up` | — | Soon |
| `monthlyPerf` | الأداء الشهري / Monthly performance | planned | `reports` | — | Soon |

### 4 — `reports` · «التقارير» / Reports · rail icon `reports`

| Item `id` | `labelKey` (AR / EN) | status | icon | route | affordance |
| --- | --- | --- | --- | --- | --- |
| `reports` | التقارير / Reports | implemented | `reports` | `reports.html` | — |
| `monthlyReports` | التقارير الشهرية / Monthly reports | planned | `reports` | — | Soon |
| `dataAnalysis` | تحليل البيانات / Data analysis | planned | `trending-up` | — | Soon |
| `invoices` | الفواتير / Invoices | **disabled** | `wallet` | — | reason `nav.reason.finance` + lock |
| `monthlyInvoices` | الفواتير الشهرية / Monthly invoices | **disabled** | `wallet` | — | reason `nav.reason.finance` + lock |
| `salaries` | الرواتب / Salaries | **disabled** | `wallet` | — | reason `nav.reason.finance` + lock |
| `staffSalaries` | رواتب الموظفين / Staff salaries | **disabled** | `wallet` | — | reason `nav.reason.finance` + lock |
| `payments` | المدفوعات / Payments | **disabled** | `wallet` | — | reason `nav.reason.finance` + lock |
| `classSalaryReport` | تقرير رواتب الفصول / Class salary report | **disabled** | `wallet` | — | reason `nav.reason.finance` + lock |

### 5 — `admin` · «الإدارة» / Administration · rail icon `grid`

| Item `id` | `labelKey` (AR / EN) | status | icon | route | affordance |
| --- | --- | --- | --- | --- | --- |
| `staff` | الفريق والصلاحيات / Staff & Roles | planned | `staff` | — | Soon |
| `materials` | المواد التعليمية / Materials | planned | `materials` | — | Soon |
| `books` | المكتبة / Library | planned | `curricula` | — | Soon |
| `certificates` | الشهادات / Certificates | planned | `certificates` | — | Soon |
| `certificateRequests` | طلبات الشهادات / Certificate requests | planned | `certificates` | — | Soon |
| `banks` | البنوك / Banks | **disabled** | `wallet` | — | reason `nav.reason.finance` + lock |

### 6 — `settings` · «الإعدادات» / Settings · rail icon `settings`

| Item `id` | `labelKey` (AR / EN) | status | icon | route | affordance |
| --- | --- | --- | --- | --- | --- |
| `settings` | الإعدادات / Settings | implemented | `settings` | `settings.html` | — |
| `settingsGeneral` | عام / General | planned | `settings` | — | Soon |
| `settingsIntegrations` | التكاملات / Integrations | planned | `grid` | — | Soon |
| `settingsCustomization` | التخصيص / Customization | planned | `sparkles` | — | Soon |
| `settingsNotifications` | الإشعارات / Notifications | planned | `bell` | — | Soon |
| `settingsSecurity` | الأمان / Security | planned | `lock` | — | Soon |
| `settingsUsers` | المستخدمون والموظفون / Users & staff | planned | `staff` | — | Soon |

**Totals**: 6 categories · 48 items = **8 implemented · 33 planned · 7 disabled**.
The 8 implemented routes are the eight static pages: `dashboard`, `sessions`,
`schedule`, `students`, `courses`, `teachers`, `reports`, `settings`. The 7 disabled
items are the finance rows in `reports` (6) + `banks` in `admin` (1).

`nav.reason.finance` text: **"Requires the billing module (out of current scope)."**
(AR: «تتطلب وحدة الفوترة (خارج النطاق الحالي).»).

---

## NI4. The rail = a category tablist (NOT a page mirror)

The slim icon **rail** (start edge — right in RTL) is a `role="tablist"` of **six
category tabs**, one per `NAV_CATEGORIES` entry. It is **not** a mirror of navigable
pages — it never lists individual implemented pages; it lists **categories**, and the
page links live in the expanded panel.

Rail anatomy (`.nav-rail` in `sidebar.js`), top → bottom:

- **Hamburger toggle** — a `.rail-toggle` button (`data-action="toggle-rail"`,
  `aria-controls="nav-panel"`, `aria-expanded`) that collapses / expands the panel
  (NI5). Icon `menu`.
- **Category tabs** — `.rail-cats` is the `role="tablist"`
  (`aria-orientation="vertical"`, `data-nav-rail`). Each tab is
  `<button class="rail-cat" role="tab" id="railcat-<id>"
  aria-controls="catpanel-<id>" aria-selected data-nav-category="<id>"
  aria-label/title tabindex>` rendering only the category icon. The **active**
  category tab carries `is-active` (violet pill), `aria-selected="true"`, and
  `tabindex="0"`; every other tab is `tabindex="-1"` (**roving tabindex**).
- **Bottom profile avatar** — a `.rail-foot` button (`data-action="profile-menu"`,
  `aria-haspopup="menu"`) anchors the rail; it opens the same profile menu as the
  topbar chip.

**Roving tabindex & arrow keys** — exactly one rail tab is in the tab order at a time;
**Arrow Down/Right** = next, **Arrow Up/Left** = previous (wrapping), **Home** = first,
**End** = last. Moving focus also selects the category (NI5), so keyboard navigation of
the rail swaps the visible panel live.

The rail never grows to mirror planned/disabled items: it is a fixed six-tab strip, so
it stays short and scannable regardless of how many links a category gains.

---

## NI5. Two-level category-switching behavior

Only **one** category panel is visible at a time; the rail selects which.

**Baked-on-load (route wins).** `sidebar(activeId)` computes
`activeCat = categoryOf(activeId)` and bakes **all six** `.cat-panel`s into the static
HTML, marking every panel `hidden` **except** the one that owns the current route. So
on first paint — with zero JS — the panel for the **active page's category** is the one
showing, and its active link wears the violet `is-active` pill. `categoryOf` returns
the category whose flattened items include `activeId`, defaulting to `control`.

**`selectCategory(catId, root)`** (in `enhance.js`) performs the swap, purely via
`data-*` so it works in both the shell and the cloned mobile drawer:

1. For every `[data-nav-panel]` in scope: `panel.hidden = (panel id !== catId)` — hide
   all but the chosen category's panel.
2. For every `[data-nav-category]` tab: toggle `.is-active`, set
   `aria-selected`, and set `tabindex` to `0` for the chosen tab and `-1` for the rest
   (maintains the roving tabindex).

**Clicking a category tab** (`[data-nav-category]`) calls `selectCategory` — it does
**NOT navigate**. It additionally:

- **Expands if collapsed** — if `#shell[data-rail="true"]` (rail-only / collapsed),
  it sets `localStorage['academy.rail'] = '0'` and `applyRail()` to expand the panel,
  so picking a category from the collapsed rail reveals its links.
- **Persists** the chosen category in `localStorage['academy.navCategory']`
  (`CAT_KEY`).
- Closes any open menu; fires no toast and no navigation.

**Collapse / expand** (`applyRail`, `data-action="toggle-rail"`): the hamburger toggles
`#shell[data-rail]` and persists `localStorage['academy.rail']` (`'1'` = collapsed).
CSS `.app-shell[data-rail='true']` shrinks the sidebar to the rail width and hides the
`.nav-panel` — so **collapsed = rail-only** (just the six category tabs), **expanded =
rail + the selected category's panel**.

**Mobile off-canvas drawer** keeps **BOTH** the rail and the panel so category
switching works on phones: `openDrawer()` clones the entire static `.sidebar` into the
right-side drawer. To avoid duplicate ids and dangling ARIA references, the clone
**strips all `id`s and all `aria-controls`/`aria-labelledby`** before insertion;
`selectCategory` still works inside the clone because it keys off `data-nav-panel` /
`data-nav-category`, not ids.

---

## NI6. Data model (`nav.config.js`)

```
NAV_CATEGORIES = [
  {
    id,           // category id; the rail tab + panel key (e.g. 'control')
    labelKey,     // i18n key for the category label = the rail aria-label AND the panel title
    icon,         // sprite symbol id for the rail tab
    items: [ item, … ],          // the category's primary links
    sections?: [                 // optional labelled sub-sections (e.g. teachers → Performance)
      { titleKey, items: [ item, … ] }
    ],
  },
  …  // six categories
]
```

An **item** (built by the `item()` factory: `item = (o) => ({ status: o.status || 'implemented', ...o })`):

```
{
  id,            // stable string id (e.g. 'sessions'); the data-nav hook + activeId key
  labelKey,      // i18n key for the visible label
  icon,          // sprite symbol id (independent of id)
  status,        // 'implemented' | 'planned' | 'disabled' | 'future-role' | 'hidden'
  route?,        // REQUIRED iff status === 'implemented'; FORBIDDEN otherwise
  badge?,        // optional numeric badge (panel); e.g. sessions → 24
  reasonKey?,    // REQUIRED iff status === 'disabled'; i18n key for the reason text
}
```

`status` defaults to `'implemented'`; explicit fields in `o` always win. (There is no
per-item `rail` flag — the rail mirrors **categories**, not items; see NI4.)

**Helpers**

- `catItems(c)` — flattens a category's `items` plus every `sections[].items` into one
  list (used by `categoryOf` and the build guard).
- `categoryOf(activeId)` — returns the id of the category whose `catItems` include
  `activeId`, so the panel opens to the active route's category on load; defaults to
  `NAV_CATEGORIES[0].id` (`control`).

**Build-time validation guard** (runs at module load, iterating every category's
`catItems`) throws if:

- an `implemented` item **lacks** a `route` — *"implemented item '<id>' needs a route"*;
- a **non-implemented** item **has** a `route` — *"non-implemented item '<id>' must not have a route"*;
- a `disabled` item **lacks** a `reasonKey` — *"disabled item '<id>' needs a reasonKey"*.

Because the guard runs before any render, **a dead link cannot ship**.

**Registers also exported** (documented-but-not-rendered): `FUTURE_ROLE` (NI11) and
`FUTURE_ROUTES` (NI9). These never reach the DOM. (`BRAND = { nameKey: 'brand.name',
icon: 'graduation-cap' }` is also exported for the panel header.)

---

## NI7. Rendering contract (`sidebar.js`)

The shell is `<aside class="sidebar">` containing the `.nav-rail` (NI4) and the
`.nav-panel#nav-panel`. The panel header is the `BRAND` medallion + name, followed by
**all six** `.cat-panel`s.

**Category panel** (`catPanel`) — one per category; only the active one is visible:

```html
<div class="cat-panel" id="catpanel-<id>" role="tabpanel" tabindex="-1"
     aria-labelledby="railcat-<id>" data-nav-panel="<id>"[ hidden]>
  <div class="cat-title"><category label></div>
  <nav class="panel-nav" aria-label="<category label>">
    <div class="space-y-1"><item rows…></div>
    <!-- optional labelled sub-sections: -->
    <div class="nav-subsection">
      <div class="nav-subsection-label"><section titleKey></div>
      <div class="space-y-1"><item rows…></div>
    </div>
  </nav>
</div>
```

Exactly one `.cat-panel` lacks the `hidden` attribute on load — the one whose id equals
`categoryOf(activeId)`. Every other panel is `hidden` (out of the a11y tree).

**Item rows** (`navItem`) — status-aware; routes pass through `langRoute()`:

- **`implemented` → `<a href>`** (the only navigable, only activatable status):

  ```html
  <a href="<route>" class="nav-item[ is-active]" data-nav="<id>"
     data-nav-status="implemented"[ aria-current="page"]>
    <icon><span class="label">…</span>[<span class="badge nav-badge tabular">24</span>]
  </a>
  ```

  Only an `implemented` item may carry `is-active` (the violet pill, `--g-violet`)
  **and** `aria-current="page"`, and only when `item.id === activeId`. Exactly one
  item is active per page.

- **`planned` → `<button>` + «قريبًا/Soon» pill** (no `href` → no dead link):

  ```html
  <button type="button" class="nav-item is-planned" data-nav="<id>"
          data-nav-status="planned" data-coming-soon data-soon-key="nav.comingSoon">
    <icon><span class="label">…</span><span class="nav-soon"><Soon></span>
  </button>
  ```

  The `.nav-soon` pill is muted amber (`--c-amber-weak` / `--c-amber-ink`); its text is
  `t('nav.soon')` (AR «قريبًا» / EN "Soon").

- **`disabled` → `<button aria-disabled>` + lock glyph** (`reasonKey` required):

  ```html
  <button type="button" class="nav-item is-disabled" data-nav="<id>"
          data-nav-status="disabled" aria-disabled="true"
          data-disabled-reason data-reason-key="<reasonKey>"
          title="<reason>" aria-label="<label> — <reason>">
    <icon><span class="label">…</span><icon name="lock" class="ico ico-sm nav-lock">
  </button>
  ```

- **`future-role` / `hidden` → not rendered at all** — they are absent from
  `NAV_CATEGORIES` and never emitted into markup.

**Rail tab** (`railCat`) — one per category, markup per NI4. There is no per-page rail
item: the rail strictly mirrors categories.

---

## NI8. Behavior contract (`enhance.js`)

All click behavior lives in **one delegated listener**. The category-swap and IA
branches are placed **before** the generic catch-all so they win:

| hook | branch | result |
| --- | --- | --- |
| `[data-set-theme]` / `[data-set-lang]` | set theme / navigate language variant | theme or language change |
| `[data-nav-category]` | `selectCategory(catId, root)` (+ expand if collapsed, persist `CAT_KEY`) | **swap visible panel — NO navigation** |
| `implemented` (`<a href>`) | (no special branch) | **normal anchor navigation** |
| `[data-coming-soon]` | `closeMenu(); toast(t(data-soon-key \|\| 'nav.comingSoon'))` | «قريبًا/Soon» toast |
| `[data-disabled-reason]` | `closeMenu(); toast(t(data-reason-key))` | the item's reason toast |

**Listener ordering** (relevant excerpt): theme/lang select → **`data-nav-category`**
(category swap) → drawer/sheet/confirm → **`data-coming-soon`** →
**`data-disabled-reason`** → toggles/demo-actions → filters → popover `noop` →
**generic catch-all**. The catch-all only fires a fallback acknowledge-toast for
buttons *not* matched above and *not* inside a popover/modal/drawer — so a category tab,
or a `planned`/`disabled` nav button, is always caught by its own branch first.

Two `keydown` listeners support the IA: **Ctrl/⌘+K** focuses the global search and
opens the command popover (NI15); the **rail tablist arrow-key handler** implements the
roving tabindex (Arrow/Home/End → `selectCategory` + focus, NI4).

**Result**: every category tab swaps the panel, and every nav item either navigates or
explains itself (toast). Zero dead links, zero silent buttons.

The same `data-disabled-reason` mechanism powers the topbar's disabled-with-reason rows
(announcement, "View all"); the same `data-coming-soon`/Soon styling powers their
«قريبًا» pills (`badge-soon` / `is-soon`).

---

## NI9. Future routes register

When a `planned` item is promoted to `implemented` (per NI12), it takes the route
reserved in `FUTURE_ROUTES`. The register reserves routes for the major planned items:

| item `id` | reserved route | from status |
| --- | --- | --- |
| `sessionsAnalysis` | `sessions-analysis.html` | planned |
| `messages` | `messages.html` | planned |
| `leads` | `leads.html` | planned |
| `tasks` | `tasks.html` | planned |
| `announcements` | `announcements.html` | planned |
| `families` | `families.html` | planned |
| `groups` | `groups.html` | planned |
| `studentResult` | `student-results.html` | planned |
| `studentEvaluation` | `student-evaluation.html` | planned |
| `teacherCategories` | `teacher-categories.html` | planned |
| `teacherKpi` | `teacher-performance.html` | planned |
| `materials` | `materials.html` | planned |
| `books` | `library.html` | planned |
| `certificates` | `certificates.html` | planned |
| `staff` | `staff.html` | planned |
| `dataAnalysis` | `analytics.html` | planned |
| `monthlyReports` | `monthly-reports.html` | planned |

These routes are **reserved only** — none of these files exist yet, and the items must
keep `route` absent until promotion (the guard enforces this, NI6). Planned utilities
not yet given a reserved route (e.g. `timeConverter`, `publicHoliday`,
`scheduledActions`, `addFamily`, the `settings*` sub-items, the teacher-performance
sub-rows beyond `teacherKpi`) reserve their route at promotion time. The **disabled**
finance items (`invoices`, `salaries`, `banks`, …) are intentionally **not** in
`FUTURE_ROUTES`: they remain disabled until the billing module ships.

---

## NI10. Hidden / deferred register

The `hidden` status remains part of the taxonomy (NI2) for items discovered in the
reference but intentionally not shown. In the current implementation **no item carries
`hidden`**, and `nav.config.js` exports **no `HIDDEN_NAV` register** — several utilities
that were previously hidden are now surfaced as **`planned`** rows so they are
discoverable while still honest about not existing yet:

- communication / announcements → `announcements` (planned, `control`);
- library / content → `books` (planned, `admin`, reserves `library.html`) and
  `materials` (planned, `admin`);
- scheduling utilities → `timeConverter`, `publicHoliday`, `scheduledActions`
  (planned, `control`);
- categorisation utilities → `familyCategories`, `teacherCategories` (planned).

The finance sub-areas (invoices, salaries, payments, banks, class salary report) are
**not** hidden — they are shown as **`disabled`** rows with the `nav.reason.finance`
reason, so the area is visible but honestly gated on the billing module.

---

## NI11. Future-role register

Role portals are **separate guarded future apps** — they are **never** rendered in the
admin nav (`status: 'future-role'`), and each is reserved for its own future spec with
a **cheerful, non-admin visual language** (distinct from this calm admin shell).
Source: `FUTURE_ROLE` in `nav.config.js`.

| `id` | reservation |
| --- | --- |
| `teacher-portal` | Separate guarded Teacher app — its own future spec; never in the admin nav. |
| `family-portal` | Guarded Family/Guardian app with a multi-child switcher — future spec. |
| `student-portal` | Student experience lives under the Family portal — not an admin destination. |

---

## NI12. Rules to flip `planned` → `implemented`

When a future spec ships a page, promote its item with this checklist (the disabled
case has one extra step):

1. **Build registry** — add a `PAGES` entry in `scripts/build-html.mjs`:
   `{ base, activeId, titleKey, crumbKey, render }`.
2. **nav.config** — set the item `status: 'implemented'` and add its `route` (from
   `FUTURE_ROUTES`, NI9); **drop** the `badge`/Soon affordance if no longer wanted. It
   stays inside the **same category**, so `categoryOf` keeps opening that category's
   panel on the new page.
3. **Topbar meta** — add the page's `titleKey` and `crumbKey` (and their locale
   strings, AR + EN); if it should join the apps-grid quick-launcher, add it there too
   (NI15).
4. **Smoke** — add the new page to the smoke `PAGES` list; it inherits the IA
   assertions (six category tabs, exactly one visible panel, exactly one
   `is-active[aria-current]`, no dead nav).
5. **Screenshot acceptance** — add the page's screenshot-acceptance rows (AR/EN ×
   light/dark × the required viewports).
6. **Screenshot review** — capture and review against the Spec 001 visual target.

**`disabled` → `implemented`** does all of the above **and additionally removes the
`reasonKey`** (the guard forbids a `route` while a `reasonKey`/disabled status remains,
and forbids leaving an implemented item without a route).

The build-time guard (NI6) catches any half-finished promotion (route without status,
status without route, disabled without reason) before a build can succeed.

---

## NI13. Accessibility / RTL-LTR / theme

- **Tablist / tabpanel semantics** — the rail is `role="tablist"`
  (`aria-orientation="vertical"`); each tab is `role="tab"` with
  `aria-controls="catpanel-<id>"` and `aria-selected`; each panel is `role="tabpanel"`
  with `aria-labelledby="railcat-<id>"` and `tabindex="-1"`. Roving tabindex keeps
  exactly one tab in the tab order; Arrow/Home/End operate the tablist (NI4).
- **Hidden panels leave the a11y tree** — the five non-active `.cat-panel`s carry the
  `hidden` attribute, so their links are not announced or focusable; only the active
  category's links are in the a11y tree.
- **Focusable affordances** — `planned`/`disabled` rows are real `<button>`s, so they
  are keyboard-focusable and operable (Enter/Space fire the same toast as a click).
- **`aria-disabled` semantics** — `disabled` items use `aria-disabled="true"` (not the
  `disabled` attribute) so they remain focusable and can still **announce their
  reason**; the reason is exposed via both `title` and a composed `aria-label`
  (`<label> — <reason>`). The lock glyph is decorative.
- **Active semantics** — only the active `implemented` item carries
  `aria-current="page"`; there is exactly one per page.
- **RTL/LTR** — all spacing uses logical properties (`margin-inline-start`,
  `inset-inline-end`, `border-inline-end`, …); the rail sits on the start edge (right
  in RTL, left in LTR) with no hard-coded left/right; the shell is RTL by default and
  LTR on `.en.html`.
- **Theme tokens** — the rail, the active pill (`--g-violet`), the Soon pill
  (`--c-amber-weak` / `--c-amber-ink`), and disabled muting (`--c-ink-3` /
  `--c-nav-ink-muted`) all use design tokens so they read correctly in
  Light / Dark / System.
- **axe** — critical violations must be **0** on every page.

---

## NI14. Enforcement (smoke)

`tests/smoke/run.cjs` asserts the IA invariants on every built page (AR + EN):

- **Six category tabs** — `.nav-rail .rail-cat[data-nav-category]` count is **≥ 6**
  (one tab per category).
- **Exactly ONE visible panel** — exactly **one** `.nav-panel .cat-panel` is not
  `hidden` (never all categories' links at once).
- **Category switching works** — clicking the `families` rail category leaves exactly
  one visible panel and it is `data-nav-panel="families"` (the swap, not a navigation).
- **No dead nav links** — every `.nav-panel .nav-item` is either an `<a>` with a real
  `href` (not `#`) **or** carries `data-coming-soon` / `data-disabled-reason` (no anchor
  without a route; no silent button).
- **Planned → toast** — clicking a `.nav-item.is-planned` button produces feedback
  (the coming-soon toast).
- **Disabled → reason** — a `disabled` item has both `title` and `aria-label`, and a
  dispatched click fires its reason toast; no `aria-disabled` control lacks a reason.
- **Exactly one active** — exactly one
  `.nav-panel .nav-item.is-active[aria-current="page"]` on product pages (the dev
  gallery has none).
- **No future-role/hidden in DOM** — those ids are absent from the rendered markup.
- **Static shell, no `#app`** — `.app-shell .sidebar .nav-rail` + `.nav-panel` +
  `#page-body` exist and there is **no** whole-page `#app` mount.
- **Relative assets** — no absolute/CDN asset paths (`link[href]` / `script[src]`);
  GitHub-Pages safe.

---

## NI15. Topbar IA + cross-references

The topbar (`topbar.js`, menus in `enhance.js`) is **premium, grouped, with no dead
icons**. Logical (RTL-aware) order:

- **Lead**: mobile **menu-toggle** (`data-action="open-drawer"`, opens the off-canvas
  drawer that keeps rail + panel, NI5) + a breadcrumb (`الرئيسية · <page>`) and page
  **title** (from `crumbKey` / `titleKey`).
- **Center**: a **global search** input (`data-action="command-palette"`,
  `aria-haspopup="menu"`) with a `⌘K` `kbd` hint. It opens the **command popover**
  (`commandMenu`): a "Recent searches" header + demo recent rows + an "Add shortcut"
  row (all `data-action="noop"` → acknowledge toast). A global **Ctrl/⌘+K** listener
  focuses the input and opens the same popover.
- **Trailing cluster** (`.util-cluster`, capped — no unbounded icon sprawl):
  1. **Apps-grid «▦»** (`data-action="apps-grid"`) → `appsMenu`: a quick-launcher grid
     of the **8 implemented pages** (dashboard, sessions, schedule, students, teachers,
     courses, reports, settings), each a real `<a href>` (language-aware).
  2. **Quick-Actions "+"** (`data-action="quick-actions"`) → `quickActionsMenu`:
     *New session*, *Add student*, *Add teacher* = demo rows
     (`data-demo-action`, `topbar.qaToast`); *Create announcement* =
     **disabled-with-reason** (`aria-disabled`, `data-reason-key="topbar.announceReason"`)
     + a «قريبًا/Soon» pill.
  3. **Notifications bell** (`data-action="notifications"`, with a `.dot`) →
     `notificationsMenu`: demo notification rows + a **disabled-with-reason** "View all"
     footer (`data-reason-key="topbar.notifViewAllReason"`).
  4. **Theme switch** (`data-action="theme-menu"`) → Light / Dark / System.
  5. **Language switch** (`data-action="lang-menu"`) → AR / EN (navigates variants).
  6. A thin divider, then the **profile chip** (`data-action="profile-menu"`,
     `aria-haspopup="menu"`) → `profileMenu` that **folds**: *Profile/Account* (demo
     `noop`), **Settings** (a real `<a href>`, language-aware), *Help & support* (demo
     `noop`), separator, **Log out** (`data-confirm` → confirmation modal that toasts on
     confirm). The rail's bottom avatar (NI4) opens this same menu.

Every interactive control carries `aria-haspopup="menu"` and an `aria-label`. All
topbar menus render on `<body>` (outside the shell) via the shared popover.

**Cross-references**

- `admin-pages-contract.md` — shared page anatomy; how each `implemented` page reuses
  the shell and registers its `PAGES` meta.
- `scope-guard.md` — confirms `planned`/`disabled` are pure nav affordances with no
  backend/module, and portals stay `future-role`.
- `static-html-django-ready-contract.md` — static-HTML-first generation; how each
  category panel maps to a partial / `{% if cat == ... %}`, `planned`/`disabled` map to
  `{% if perms %}` / disabled partials, and the `data-*` hooks reproduce server-side.
- `screenshot-acceptance.md` — the screenshot rows a promoted page must add (NI12).
