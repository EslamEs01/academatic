# D-1 — Teacher Route Contract (Option A, the MOVE architecture)

**Spec**: 041 — Full Frontend Route & Sidebar Production Freeze
**Artifact type**: implementation-plan contract (binding). **Planning only** — no `tasks.md`, no source/test/HTML edit, no commit.
**Baseline**: `21502af` (Spec 040 committed · PR #13 merged · on `origin/main` · 115 HTML · admin menu 50).
**Decision status**: **D-1 = Option A. DECIDED.** This file does not re-open the option set (`spec.md` §7 A–G, recommendation A, Q-1); it
specifies the *one compliant shape* Option A has, and the conditions under which implementation must **halt** instead of ship.

**Companion artifacts** (do not duplicate their registers): `spec.md` (FR/SC/D-1 options) · `deep-link-register.md` (the 22→24 deep-links) ·
`current-route-inventory.md` · `sidebar-item-register.md` · `protected-test-register.md` (T-06) · `impact-boundary.md` (§2 Option-A ceiling) ·
`count-and-freeze-contract.md` (§5 D-1 freeze rule) · `mutation-test-register.md` · `ar-en-route-parity-register.md`.

---

## 0. The defect, restated in one line

Three sidebar items — `teachers`, `addTeacher`, `teacherCategories` — carry the **byte-identical** route `teachers.html`
(`src/js/nav.config.js:54-56`). Two of the three labels therefore name a surface the route does not resolve to: the Add-Teacher form
and the Categories board exist **only** behind a drawer that a page load never opens. Classification: genuine route defect (misleading
destination). SC-18 requires it **closed**, not recorded.

---

## 1. Grounding — what exists today (live at `21502af`, source-verified)

| # | Element | Exact identifier | Source |
|---|---|---|---|
| G1 | Header **primary** button | `button[data-drawer="trn-add"]`, label `trn.act.add` | `components/teacher-actions.js:28-30` (`addTeacherAction()`), called at `pages/teachers.js:105` |
| G2 | Header **secondary** button | `button[data-drawer="trn-categories"]`, label `trn.cat.manage` | `pages/teachers.js:105` (inline `button({…})`) |
| G3 | Add-teacher form | `<template data-preview="trn-add">` via `formDrawer('trn-add', { titleKey:'trn.form.addTitle', headIcon:'user-plus', ctaKey:'common.add', fields: teacherFields('trnAdd', true) })` | `teacher-actions.js:71-73`, baked at `teachers.js:112` |
| G4 | Categories surface | `<template data-preview="trn-categories">` via `previewTemplate('trn-categories', …)` — list + inline create form + assign gate + Save gate | `teachers.js:66-84` (`categoriesDrawer()`), baked at `teachers.js:110` |
| G5 | Edit-teacher form | `<template data-preview="trn-edit">` via `teacherEditDrawer()` — opened from the **card kebab** (`enhance.js:140`, `data-drawer="trn-edit"`) | `teacher-actions.js:66-68`; baked on **`teachers.html` and `teacher.html`** (`teachers.js:111`, `teacher.js:199`) |
| G6 | Directory body | `summaryCards` (in `pageHeader`) · `filterBar({targetId:'teachers-grid'})` · `cardGrid(#teachers-grid)` · `noResults()` · one `previewTemplate(tr.id)` per teacher | `teachers.js:88-114` |
| G7 | Field id scheme | `field()` emits `id="f-<name>"` **and** `<label for="f-<name>">` | `components/form-field.js:15-17` |
| G8 | Drawer open path | `openSheet(id)` → `document.querySelector('template[data-preview="id"]')` → `openPanel(tpl.content.cloneNode(true))` — the template **becomes live DOM** | `enhance.js:431-436` |
| G9 | Sole callers | `addTeacherAction()` and `teacherAddDrawer()` are called **only** from `pages/teachers.js` (grep across `src/js`); `teacherEditDrawer()` is also called from `pages/teacher.js`; `teacherNoteDrawer()` only from `pages/teacher.js` | grep, live |
| G10 | Tabs engine | `tabs({group,items,panels,ariaKey})` → `div.tabs-wrap[data-tabs=group]` + `button[data-tab=id]` + `section[data-tabpanel=id]` (first = baked-active, rest `hidden`) | `components/tabs.js` |
| G11 | Runtime tabs | `selectTab(group,id)` requires the `[data-tab]` **inside** `[data-tabs=group]`; persists `localStorage['academy.schedView.<group>']` and `history.replaceState('#view='+id)`. `initTabs()` precedence = **URL `#view=` → stored → baked first**. **No `hashchange` listener anywhere** | `enhance.js:242-273`, `enhance.js:258`, `grep hashchange → 0` |
| G12 | Build activeId | `{ base:'teachers', activeId:'teachers', … }` — the sidebar active pill is baked **per file**, hash-agnostic | `scripts/build-html.mjs:99` |

### 1.1 Grounding correction (against the planning brief)

The brief states *"`teacherFields('trnAdd', true)` = **12** field() controls + a CV upload GATE"*. **Live count = 13 `field()` controls**
(the 12 identity/contact/assignment controls **plus** the `notes` textarea) + the CV gate. Verified two ways:
`grep` of `teacher-actions.js:47-63`, and an id extraction from the built `public/teachers.html` `trn-add` template →
`f-trnAdd-firstName · lastName · firstNameAr · lastNameAr · email · phone · status · subjects · level · courses · city · country · notes`
(13 ids), `data-disabled-reason` × 2 (CV gate + Save), `btn-primary` × 1. **The contract below uses 13** — the brief's "12" counts the
non-textarea controls only. No capability is added or removed by this correction.

---

## 2. Why Option A has exactly **one** compliant shape (the forced MOVE)

`field()` emits a document-unique `id="f-<name>"` bound by `<label for>` (G7). While a `<template>` is merely baked its content sits in an
inert document fragment — but `openSheet()` **clones it into the live document** (G8). Therefore:

| Candidate shape | Result | Verdict |
|---|---|---|
| Form rendered in the **tab panel** *and* kept in `<template data-preview="trn-add">` | Opening the drawer clones `f-trnAdd-firstName …` into a document that already contains them → **duplicate ids + ambiguous `label[for]`** | **FORBIDDEN** (a11y + DOM correctness) |
| Form rendered in the tab panel, drawer kept but *renamed* fields (`trnAdd2-*`) | Two live definitions of the same form; two Save gates; two field sets to keep honest | **FORBIDDEN** (duplication ban, §4) |
| Tab panel contains only an **"Open the form"** button | The route resolves to a *button*, not to the surface its label names — the defect survives one click deeper | **FORBIDDEN** (direct-surface law, §3) |
| Header keeps an "Add" **tab-selector** button | `selectTab()` refuses any `[data-tab]` outside the `[data-tabs]` wrap (G11) | **IMPOSSIBLE** |
| Header keeps an "Add" **same-page anchor** `href="teachers.html#view=add"` | Same-document hash change, **no `hashchange` listener** (G11) → hash moves, tab does not | **IMPOSSIBLE** |
| **MOVE**: the form content *relocates* into the tab panel; the drawer template is **removed** from `teachers.html` | One definition, one id set, one Save gate, zero further clicks | ✅ **THE ONLY COMPLIANT SHAPE** |

**Consequence (binding):** D-1 is an **extract-and-reuse MOVE**, never a duplication. Nothing about the Add form or the Categories board is
copied; both are *relocated* from a drawer host to a tab-panel host, byte-for-byte in content and honesty semantics.

---

## 3. THE DIRECT-SURFACE LAW (D1-L1 … D1-L4)

| ID | Law |
|---|---|
| **D1-L1** | A **fresh load** of `teachers.html#view=add` (empty `localStorage`, no prior visit, AR **or** EN) renders the **real Add-Teacher form** — 13 `field()` controls + the CV gate + the single primary backendRequired Save — **visible, zero further clicks, zero drawer, zero modal**. |
| **D1-L2** | A **fresh load** of `teachers.html#view=categories` renders the **real Categories surface** — the authored category list + the real inline create form + the assign gate + the single primary Save gate — **visible, zero further clicks**. |
| **D1-L3** | A **fresh load** of `teachers.html` (no fragment, fresh context) renders the **directory** — the surface the `teachers` label names — as the **baked first/default tab**. |
| **D1-L4** | No route in the teacher triple may resolve to an affordance that merely *opens* the named surface. A tab whose panel contains only an "Open the form" button is a **failure**, not a fix (it is the D-1 defect with an extra step). |

**Test-design note (mandatory).** D1-L1/L2/L3 are contracts on a **fresh browser context**. `initTabs()` precedence is
`#view=` → `localStorage['academy.schedView.teachers']` → baked first (G11); a stale stored value from a prior `#view=add` visit would
otherwise flip the plain-route default. Every D-1 assert must run in a fresh context (the smoke harness already does this per page).

---

## 4. The MOVE rule — the duplication ban

| ID | Rule | Machine check (group-aware) |
|---|---|---|
| **D1-M1** | **One definition of the Add fields.** After the move, `teacherFields('trnAdd', true)` is emitted **exactly once** per page. | `document.querySelectorAll('#f-trnAdd-firstName').length === 1` **and** `[...document.querySelectorAll('template')].filter(t=>t.content.querySelector('#f-trnAdd-firstName')).length === 0` |
| **D1-M2** | **No `trn-add` drawer on `teachers.html`.** | `document.querySelector('template[data-preview="trn-add"]') === null` **and** `document.querySelector('[data-drawer="trn-add"]') === null` |
| **D1-M3** | **No `trn-categories` drawer on `teachers.html`.** | `document.querySelector('template[data-preview="trn-categories"]') === null` **and** `document.querySelector('[data-drawer="trn-categories"]') === null` |
| **D1-M4** | **No duplicate ids anywhere** on the built page, in the baked DOM **and** after opening every remaining drawer (`trn-edit` + the per-teacher previews). | id-multiset check on `#page-body` (baked) and on the live document with each drawer open |
| **D1-M5** | **No duplicate `name=`** for any `trnAdd-*` / `trnCategories-*` control. | `querySelectorAll('[name^="trnAdd-"]').length === 13`, `[name^="trnCategories-"].length === 3` |
| **D1-M6** | **No hidden duplicate form.** No second copy of the Add or Categories surface may exist in a hidden panel, a `<template>`, an `aria-hidden` container, or CSS-hidden markup. | the `#f-trnAdd-*` / `#f-trnCategories-*` id-count checks above are the enforcement |
| **D1-M7** | **No tab-with-another-click.** Each of the `add` / `categories` panels contains its **real** controls; a panel whose only interactive descendant is a trigger (`[data-drawer]`, `[data-modal-trigger]`) is a failure. | `[data-tabs="teachers"] [data-tabpanel="add"] [data-drawer], … [data-modal-trigger]` → **0** (same for `categories`) |
| **D1-M8** | **No new hook, no new storage key, no new dependency, no new page, no new PAGES entry, no new component, no new `data-*` attribute.** `academy.schedView.teachers` is a **value** of the pre-existing `SCHED_VIEW_KEY` prefix (`enhance.js:243`) — the same mechanism Specs 035/037/038/039/040 used for `families`/`reports`/`finance`/`library`/`settings`; it is **not** a new storage key. | source diff |

---

## 5. The tab contract

```
tabs({
  group: 'teachers',
  ariaKey: 'trn.title',                 // EXISTING key — no new aria key
  items: [
    { id: 'directory',  labelKey: 'trn.list.tab.directory',  icon: 'trainers'  },  // baked first = default
    { id: 'add',        labelKey: 'trn.list.tab.add',        icon: 'user-plus' },
    { id: 'categories', labelKey: 'trn.list.tab.categories', icon: 'filter'    },
  ],
  panels: { directory, add, categories },
})
```

| Field | Value | Rationale |
|---|---|---|
| `data-tabs` **group** | `teachers` | Distinct from the existing groups `teacher` (profile, `teacher.html`) and `perf` (`teacher-performance.html`). No page carries two groups; the register stays **group-aware** (E-04) — every D-1 assert scopes to `[data-tabs="teachers"]`. |
| Tab **ids** | `directory` · `add` · `categories` | `directory`/`categories` mirror the Spec-037 `families` group exactly; `add` is the new id. Ids match `/^[a-z0-9-]+$/` (the `initTabs` hash regex, `enhance.js:266`). |
| Tab **order** | directory → add → categories | `directory` **must** be index 0: `tabs()` bakes `is-active` / `aria-selected="true"` / unhidden panel on the first item only (G10), and `teachers.html` (plain route) must land on the directory (D1-L3). |
| Icons | `trainers` / `user-plus` / `filter` | The three icons already used by this page's header + kebab. No new icon. |
| **New locale keys** | `trn.list.tab.{directory,add,categories}` — **3 per locale**, mirrored in `ar.trn.js` + `en.trn.js` | `trn.list` is unused today (grep: no `trn.list.*` in any locale). **Namespace-collision discipline** (the Spec-036 `trn.kpi` incident): it must **not** reuse `trn.tab.*` (the `teacher.html` profile tabs, `ar.trn.js:32`) or `trn.board.tab.*` (`teacher-performance.html`, `ar.trn.js:110`). Locale parity for the `trn` pair must stay **N+3 / N+3, 0 divergence**. |
| Placement | The `tabs()` wrap sits **inside `#page-body`, after `pageHeader(...)`**; the `<template>` blocks are baked **after** the wrap, at body root — the exact shape of `pages/families.js:53-67`. | Templates resolve via `document.querySelector` (G8) regardless of a hidden panel, but the families precedent keeps them out of the panels and out of the filter/no-results scope. |

### 5.1 Panel contents (exact)

| Panel | Contents | Note |
|---|---|---|
| `directory` | `filterBar({ targetId:'teachers-grid', … })` + `cardGrid(rows.map(card), { id:'teachers-grid' })` + `noResults()` | Verbatim relocation of today's body. **The page keeps exactly ONE `filterBar` and ONE `[data-no-results]`** — the `add` and `categories` panels are display/form surfaces with **no filterBar** (the single-global-`[data-no-results]` contract of `enhance.js`, honored by 036/037/039). `summaryCards` stays in `pageHeader`, outside the wrap. |
| `add` | `<div class="wiz-grid">` + `teacherFields('trnAdd', true)` — **13 `field()` controls, and the `cvGate()` is emitted *inside* `teacherFields()`** (`teacher-actions.js:47-63`), not passed beside it — + **one** `btn-primary` `data-disabled-reason data-reason-key="common.backendRequiredNote"` Save (`ctaKey: 'common.add'`) | Identical content to today's `formDrawer('trn-add', …)` body; only the **host** changes (template → tab panel). Do **not** call `cvGate()` a second time — that would render two gates. |
| `categories` | The authored `TEACHER_CATEGORIES` rows (`trn.cat.hint` + 3 `sheetRow`s) + the `trn.cat.createTitle` inline create form (`trnCategories-catName` / `-catStatus` / `-catDesc`) + the `trn.cat.assign` secondary gate + **one** `btn-primary` backendRequired Save gate | Identical content to today's `categoriesDrawer()` body; only the **host** changes. |

---

## 6. Disposition of every affected element

| Element | Today | After D-1 | Class |
|---|---|---|---|
| `trn-add` **drawer** (`template[data-preview="trn-add"]`) on `teachers.html` | baked (G3) | **REMOVED** — its body **moves** into the `add` tab panel | MOVE |
| `trn-categories` **drawer** (`template[data-preview="trn-categories"]`) | baked (G4) | **REMOVED** — its body **moves** into the `categories` tab panel | MOVE |
| `trn-edit` **drawer** | baked on `teachers.html` **and** `teacher.html` (G5) | **UNCHANGED** on **both** pages — it is opened from the **card kebab** (`enhance.js:140`), not from the header, and has no route/label claiming it | KEEP |
| Per-teacher `previewTemplate(tr.id)` blocks | baked at body root | **UNCHANGED** (body root, after the tabs wrap) | KEEP |
| Header **primary** `addTeacherAction()` button | `[data-drawer="trn-add"]` (G1) | **REMOVED.** It cannot become a tab-selector (outside the wrap → `selectTab` refuses) nor a same-page anchor (no `hashchange`). **The tablist is the affordance**, and the sidebar deep-link lands directly on the surface. | REMOVE (affordance relocated to the tablist) |
| Header **secondary** "Manage categories" button | `[data-drawer="trn-categories"]` (G2) | **REMOVED** — same reasoning | REMOVE (affordance relocated to the tablist) |
| `components/teacher-actions.js :: teacherFields(p, withGeo)` | private | **EXPORTED** as the single shared field-body builder (identical signature/output; `trn-edit` keeps calling it → `teacher.html` **body** byte-identical; the whole file still differs in the 2 sidebar hrefs) | EXPORT |
| `components/teacher-actions.js :: teacherAddDrawer()` | emits `formDrawer('trn-add', …)`; **sole caller = `teachers.js`** (G9) | **REPURPOSED** → `teacherAddPanel()`, emitting the *panel body* (`.wiz-grid` + the same 13 fields + CV gate + the one primary `common.add` backendRequired Save). Retaining `teacherAddDrawer()` as an unused export is **rejected**: dead code that, if ever called, re-creates the D1-M1/M4 id collision. **Zero-deletion is a law about capabilities, not symbols** — the capability (a real Add-Teacher form with a gated Save) is preserved and made *more* reachable. | REPURPOSE |
| `components/teacher-actions.js :: addTeacherAction()` | emits the header button; **sole caller = `teachers.js`** (G9) | **REMOVED** with its sole call site | REMOVE |
| `pages/teachers.js :: categoriesDrawer()` | emits `previewTemplate('trn-categories', …)` | **REPURPOSED** → `categoriesPanel()`, emitting the same body without the `<template>` wrapper (exact Spec-037 `families.js` precedent) | REPURPOSE |
| `teacherEditDrawer()` / `teacherNoteDrawer()` / `teacherActions()` | — | **0-diff** | KEEP |
| Header (`pageHeader`) | title `trn.title` · sub `trn.sub` · `summaryHTML` · primary · secondary | title · sub · `summaryHTML`; **no primary, no secondary** | TRIM |

> **Spec-032 compliance survives.** Its law — *"every Add/Create/New/Edit opens a REAL form UI with visible grounded fields FIRST; only the
> final Save/Submit is a `backendRequired` gate"* — is satisfied **more directly** after the MOVE: the fields are visible on arrival, with
> **zero** clicks, and the single final remains a clickable `data-disabled-reason` gate. `FORM_DRAWERS_032.teacher` (`teacher.html`) is untouched.

---

## 7. Preserved honesty guarantees (nothing may be lost in the move)

### 7.1 Add-Teacher (`#view=add`)

| # | Guarantee | Check |
|---|---|---|
| A1 | The **same 13 `field()` controls**, same labels, same `name`/`id` scheme: `trnAdd-{firstName,lastName,firstNameAr,lastNameAr,email,phone,status,subjects,level,courses,city,country,notes}` | id-set equality with the `21502af` `trn-add` template |
| A2 | The **CV/attachments upload stays a GATE** — `button[data-disabled-reason][data-reason-key="trn.form.cvReason"]`. **Never** an `<input type="file">` | `[data-tabpanel="add"] input[type=file]` → 0 |
| A3 | **Exactly ONE primary final**, and it is a clickable `data-disabled-reason` `common.backendRequiredNote` gate (`ctaKey: common.add`) | `[data-tabs="teachers"] [data-tabpanel="add"] .btn-primary` → **1**, and it carries `data-disabled-reason` + `aria-disabled="true"` |
| A4 | **Fields are INERT** — no persistence, no mutation, no fake success, no `type=password`, no credential/secret field, no `<canvas>`, no PDF, no `window.open` | forbidden-token grep on the panel |
| A5 | The **excluded legacy fieldset** (Salary / Payout / Zoom / password) is **still absent** | §8 |

### 7.2 Categories (`#view=categories`)

| # | Guarantee | Check |
|---|---|---|
| C1 | The authored `TEACHER_CATEGORIES` list renders (3 rows: `senior` / `associate` / `trial`, with authored `count` literals via `trn.cat.members`) | `[data-tabpanel="categories"] .sheet-row` → 3 |
| C2 | The **real inline create form** renders (`f-trnCategories-catName` · `-catStatus` · `-catDesc`) | 3 controls |
| C3 | The **assign-members gate** stays a secondary `data-disabled-reason` button (`trn.cat.assignReason`) | present, `aria-disabled="true"` |
| C4 | **Exactly ONE primary Save**, a `common.backendRequiredNote` gate | `[data-tabpanel="categories"] .btn-primary` → **1** |
| C5 | No computed statistic, no fake persistence/assignment/mutation | forbidden-token grep |

> **This is precisely the guarantee that smoke S4 (`run.cjs:747-752`) protects today.** It is preserved verbatim in substance; only the
> **host** it asserts against moves from a drawer to a tab (see §11).

---

## 8. The pay-free guarantee (standing law, GLOBAL, unweakened)

| ID | Law |
|---|---|
| **D1-P1** | **No** salary / rate / hour-rate / fine / payout / pay-period / compensation / currency field, figure, label, option or comment may be introduced on **any** teacher surface by D-1. The MOVE relocates markup; it **adds no field**. |
| **D1-P2** | The excluded legacy Add-Teacher sections (Salary · Payout · Zoom credentials · password) stay excluded **FOREVER**. `input[type=password]` = 0, `input[type=file]` = 0. |
| **D1-P3** | The existing three-layer enforcement stands **byte-verbatim**: the smoke `payHit` / `PAY28` regex (`run.cjs:740-749`, asserted over `#page-body.innerText` of `teachers`), the source grep (including comments), and the built-HTML grep. **No pay assert may be amended by Spec 041.** |
| **D1-P4** | `teacher-performance.html` remains the single sanctioned admin exempt board (Spec-024 B-07); the 16 teacher-**portal** files stay byte-identical. |

**D-1 introduces no new field, option, fixture value or locale string other than the 3 tab labels of §5.** Any implementation that adds a
field to the Add form is out of contract and must be rejected in review.

---

## 9. Navigation behaviour matrix

| # | Scenario | Behaviour after D-1 | Mechanism / evidence |
|---|---|---|---|
| N1 | **Fresh load** `teachers.html` (fresh context) | `directory` tab active; the plain `teachers` route lands on the surface its label names | `tabs()` bakes tab 0 active (G10); `initTabs` falls through to the baked default (G11) |
| N2 | **Fresh load** `teachers.html#view=add` (AR) / `teachers.en.html#view=add` (EN) | the **add** tab is the single visible `[data-tabpanel]` of `[data-tabs="teachers"]`; the real form is on screen | `initTabs`: hash wins (G11) |
| N3 | **Fresh load** `teachers.html#view=categories` (AR/EN) | the **categories** tab is the single visible panel | idem |
| N4 | **Cross-page sidebar click** (from any other admin page) on `addTeacher` / `teacherCategories` | full document load of `teachers.html#view=add|categories` → N2/N3 | real `<a href>` (`sidebar.js:46`); different path ⇒ document navigation |
| N5 | **Tablist click** (on the page) | `selectTab` toggles `is-active` / `aria-selected` / panel `hidden`, persists `academy.schedView.teachers`, and `history.replaceState('#view='+id)` | `enhance.js:244-259` |
| N6 | **Keyboard** on the tablist | roving tabindex; ←/→ cycle, Home/End jump | `enhance.js:272+` (unchanged engine) |
| N7 | **Back / Forward** | Tab clicks use `replaceState` (**no** history entry, `enhance.js:258`) → Back leaves the page to the previous **document**, and that document reloads from its own URL (its own `#view=` re-applied by `initTabs`). Forward likewise. **No broken/empty state is reachable**, because every tab state is fully re-derivable from `#view=` at load. | `enhance.js:258` |
| N8 | **Same-page hash navigation** — clicking the sidebar's `addTeacher` link **while already on `teachers.html`** | Same-document navigation: the URL fragment changes, **but the tab does not switch** (no `hashchange` listener, G11). | **K-1 below** |
| N9 | **Stored-view precedence** | `#view=` always wins over `localStorage`; a plain `teachers.html` visit after a `#view=add` visit re-opens `add` from storage | `initTabs` precedence (G11) — the **pre-existing, product-wide** behaviour of all 8 tabbed pages. Not a D-1 regression; the fresh-context rule of §3 governs the tests. |
| N10 | **Sidebar active state** | On `teachers.html` (any fragment) the active pill is the `teachers` item (`activeId:'teachers'`, G12). `addTeacher` / `teacherCategories` are **never** the active pill. | Identical to every existing deep-link (`familyCategories` on `families.html` → active pill `families`). Active state is **per-file, not per-fragment**; syncing it to the hash would require a new runtime listener → **forbidden in 041**. Frozen as-is. |
| N11 | **AR ⇄ EN switching** via the **topbar** language menu | `teachers.html#view=add` → EN → `teachers.en.html#view=add`, the **add** tab still open. **This requires D-3.** Without the one-line `langUrl()` fix the fragment is destroyed and the page reverts to `directory`. | `enhance.js:237-241` + `552-553`; see `d3-*` / `ar-en-route-parity-register.md` |
| N12 | **AR ⇄ EN** via the **sidebar** | already correct — `sidebar.js langRoute()` is hash-aware (Spec 035) | `sidebar.js:18` |

### K-1 — the same-page hash limitation (pre-existing; **not** introduced or fixed by D-1)

Because `enhance.js` has **no `hashchange` listener** (G11), a link whose target differs from the current URL **only in the fragment**
performs a same-document navigation and leaves the tab untouched. This is true **today for all 22 deep-linked sidebar items**
(`familyCategories` from `families.html`, `sessionsKpi` from `teacher-performance.html`, `#view=invoices` from `finance.html`, …) and will be
true for the 24 after D-1. **Spec 041 does not fix it**: `enhance.js` receives **exactly one** declared narrow supersession (D-3, the
`langUrl` line); adding a listener is a behaviour change beyond the freeze.

Why this does **not** weaken D-1: on `teachers.html` itself, the **tablist** is the one-click affordance and it works (N5); from every other
page — the dominant sidebar case — the deep-link performs a real document load and lands on the surface (N4). The direct-surface law
(§3) is defined on **load**, exactly as every other deep-link contract in the corpus is. K-1 is recorded here as a **known, product-wide,
accepted limitation** and is a candidate for a later, separately-chartered spec (a `hashchange` → `selectTab` sync); it is **out of scope for 041**.

---

## 10. Routes after D-1

| Nav id | Label (AR / EN) | Route today | Route after D-1 | Class |
|---|---|---|---|---|
| `teachers` | «المعلّمون» / "Teachers" | `teachers.html` | `teachers.html` | plain (baked default tab = `directory`) |
| `addTeacher` | «إضافة معلّم» / "Add teacher" | `teachers.html` | **`teachers.html#view=add`** | deep-link |
| `teacherCategories` | «فئات المعلّمين» / "Teacher categories" | `teachers.html` | **`teachers.html#view=categories`** | deep-link |

`src/js/nav.config.js:54-56` — **2 route-string edits** (`addTeacher`, `teacherCategories`; `teachers`'s route text is **unchanged**) **+ 2
stale-comment corrections**: the Spec-036 comments ("fold-anchor to teachers.html (trn-add drawer)" / "(trn-categories drawer)") must be
corrected in the same edit — they would otherwise document a drawer that no longer exists. (The comment fixes are **documentation
corrections**, not supersessions.)

**Route split (frozen target):** deep-links **22 → 24** · plain **27 → 25** · route-less lock **1** (`classSalaryReport`) · **24 + 25 + 1 = 50**.
Routed items **49**, menu **50**, planned **0**, `FUTURE_ROUTES` **{}** — all unchanged. The teachers triple ceases to be a duplicate destination.
EN parity: `teachers.en.html#view=add` / `#view=categories` (hash preserved by `langRoute()`, N12).

---

## 11. Protected-test supersessions (5 sites — each a RELOCATION, never a weakening)

| # | Site | Today | After D-1 | Why it is a relocation |
|---|---|---|---|---|
| **S1** | `tests/smoke/run.cjs:88` | `FORM_DRAWERS_032.teachers: ['trn-edit','trn-add','trn-categories']` | `['trn-edit']` | `trn-add` / `trn-categories` are no longer **drawers** on this page. Their forms did not disappear — they are tab panels, and §12's asserts audit them with the *same* predicates (fieldless / noGate / multiPrimary / MUST-OMIT / canvas). `FORM_DRAWERS_032.teacher` (`teacher.html`) = `['trn-edit','trn-note']` stays **byte-verbatim**. |
| **S2** | `run.cjs:111` | `PICKERS_032.teachers: ['trn-categories']` | remove the `teachers` entry | the categories surface is no longer a drawer-hosted picker; its list + gate are asserted in the panel (C1/C3). |
| **S3** | `run.cjs:115` | `HYBRID_032 = { teachers:['trn-categories'], reports:[…], library:[…] }` | drop the `teachers` key; `reports` / `library` **byte-verbatim** | the "hybrid category drawer" (list + real create form) is now a hybrid category **panel**; C1–C4 assert the identical guarantee. |
| **S4** | `run.cjs:747-752` | asserts `[data-drawer="trn-categories"]` **and** `template[data-preview="trn-categories"]` both exist | asserts the **categories tab panel** exists inside `[data-tabs="teachers"]` and contains the list + the create form + the assign gate + the single Save gate (C1–C5) | the honesty guarantee is **identical**; only the **host** changes. The surrounding kebab / `#teachers-grid .dir-card` / `pay` asserts in the same block stay **byte-verbatim**. |
| **S5** | `run.cjs:1494-1495` | `addTeacher` / `teacherCategories` must be real anchors matching `/(^|\/)teachers\.(en\.)?html$/` | `/(^|\/)teachers\.(en\.)?html#view=add$/` and `/…#view=categories$/` | a **re-target**, exactly like the Spec-037 A1 precedent (`protected-test-register.md:169`); the predicate `anchorOk036` (anchor ∧ ¬coming-soon ∧ regex) is unchanged. `sessionsKpi` / `monthlyPerf` / `teachersPlanned === 0` stay **byte-verbatim**. |

**Every other protected assert stays BYTE-VERBATIM** — in particular `payHit` / `PAY28` (D1-P3), `famPay`, `payFigure`, `child-view`,
the finance `forbidden` regex, `navCount 50`, `truth010.badPlanned`, route-freeze 115, admin-menu 50, and the Spec-026…040 blocks.
Spec 041 additionally ships the **committed exact route-inventory contract** (FR-009 / Q-9) so a `nav.config.js` edit cannot silently
redefine its own expectation; the two new route strings must appear there.

---

## 12. Acceptance checks (group-aware; the D-1 gate)

| # | Check | Expectation |
|---|---|---|
| V1 | fresh `teachers.html` (AR, EN) | `[data-tabs="teachers"] [data-tabpanel]:not([hidden])` → **exactly 1**, and it is `directory`; `#teachers-grid .dir-card` count unchanged; kebabs = cards |
| V2 | fresh `teachers.html#view=add` (AR, EN) | the single visible panel is `add`; **13** `[data-tabpanel="add"] .field` controls; CV gate present; `.btn-primary` = 1 and gated |
| V3 | fresh `teachers.html#view=categories` (AR, EN) | the single visible panel is `categories`; 3 `.sheet-row`; 3 create controls; assign gate; `.btn-primary` = 1 and gated |
| V4 | duplication ban | D1-M1 … D1-M7 all green, incl. after opening `trn-edit` and one teacher preview |
| V5 | drawer inventory | `template[data-preview]` on `teachers.html` = the per-teacher previews **+ `trn-edit`** only; `trn-add` / `trn-categories` absent (D1-M2/M3) |
| V6 | header | `#page-body .page-head [data-drawer]` → **0** (both header buttons gone) |
| V7 | honesty | 0 `type=file` · 0 `type=password` · 0 `<canvas>` · 0 `.pdf` · 0 `window.open` · 0 fake save/success/mutation on `teachers.html`; every write final is a `data-disabled-reason` gate |
| V8 | pay-free | `payHit` / `PAY28` green over `#page-body.innerText`, AR **and** EN; source grep incl. comments |
| V9 | sidebar | `addTeacher` → `teachers(.en).html#view=add`, `teacherCategories` → `…#view=categories`; teachers category planned = 0; admin menu = 50 |
| V10 | AR/EN | topbar language switch from `#view=add` preserves the fragment (**depends on D-3**) |
| V11 | a11y | `critical=0 serious=0` for `teachers.html` × `{#view=add, #view=categories}` × `{AR,EN}` × `{light,dark}` + mobile-390 + keyboard tab switching (roving tabindex) |
| V12 | screenshots | ≥ 2 frames per new deep-linked view (E-10), 0 console errors |
| V13 | impact | **exactly two** `#page-body` bodies differ from `21502af` (`teachers.html`, `teachers.en.html`), proven **non-destructively** (`git show` / detached worktree — never `stash`/`reset`/`checkout`); the other 62 admin files differ **only** in the sidebar's two `href` fragments; the 51 non-admin bodies byte-identical |
| V14 | locale | `trn` pair parity N+3 / N+3, **0 divergence** |

**Impact allowlist for D-1** (anything outside is a contract breach): `src/js/nav.config.js` · `src/js/pages/teachers.js` ·
`src/js/components/teacher-actions.js` · `src/locales/ar.trn.js` · `src/locales/en.trn.js`.
**0-diff wall (unchanged by D-1):** `package.json` · `scripts/build-html.mjs` · `src/js/i18n.js` · `components/sidebar.js` ·
`components/tabs.js` · `components/form-field.js` · `components/preview-drawer.js` · `components/ui.js` · `pages/teacher.js` ·
`fixtures/teachers.js` · `fixtures/teacher-management.js` · every other page/locale/fixture/portal file.
`enhance.js` is touched **only** by D-3's one line — **never** by D-1.

---

## 13. STOP condition (binding)

**Halt and report the architectural conflict — do not ship a tab-with-another-click.**

Implementation must **stop**, leave the tree clean, and escalate the conflict (rather than degrade the surface) if **any** of the following
turns out to be true in practice:

| # | Trip-wire |
|---|---|
| **STOP-1** | The real Add or Categories surface cannot be rendered **directly** in its tab panel on a fresh `#view=` load without a further click (D1-L1/L2/L4 unreachable). |
| **STOP-2** | Delivering it requires **duplicated DOM** — a second copy of the form/board, a duplicate `id`/`name`, or a hidden mirror (D1-M1…M7 unsatisfiable). |
| **STOP-3** | Delivering it requires a **new `data-*` hook**, a **new storage key**, a **new component**, a **new page/PAGES entry**, a **new dependency**, or a second `enhance.js` supersession (e.g. a `hashchange` listener). |
| **STOP-4** | Delivering it would require adding **any** field, figure or label that touches salary / rate / currency / credentials / upload (D1-P1/P2). |
| **STOP-5** | The impact cannot be held to the §12 V13 boundary (two changed bodies + sidebar-fragment-only elsewhere). |

**A tab whose panel only holds an "Open the form" button is an explicit failure state, not a fallback.** If Option A cannot be delivered
under these laws, the correct output is a written architectural-conflict report re-opening `spec.md` §7 (A–G) with evidence — **not** a
weakened surface, and **not** a silently relaxed assert.

---

## 14. Provenance & reconciliation

* **Decisions** are `spec.md` §7 / Q-1 (D-1 = **Option A**), `impact-boundary.md` §2 (Option-A ceiling) and
  `count-and-freeze-contract.md` §5 (the D-1 freeze rule). This file adds **no rival option, no rival count**.
* **Corrections recorded here** (§1.1): the Add form has **13** `field()` controls (12 + the notes textarea) + the CV gate — the brief's
  "12 fields" counts the non-textarea controls. Verified against source **and** the built `public/teachers.html`.
* **Documentation-only corrections** (not protected-assert supersessions, per FR-020/FR-021): the two stale Spec-036 `nav.config.js`
  comments naming the `trn-add` / `trn-categories` **drawers** (§10).
* **Roadmap provenance:** the committed corpus charters **only Spec 041**. Any reference to Specs 042–057 (e.g. the `common.backendRequiredNote`
  copy sweep assigned to 044, or a future `hashchange` sync for K-1) is a **maintainer-directed, append-only amendment — not a chartered spec**.
