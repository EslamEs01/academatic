# Implementation Plan — Spec 041: Full Frontend Route & Sidebar Production Freeze

**Status**: PLANNED (planning round only — no `tasks.md`, no source/test/HTML change, no commit)
**Type**: AUDIT / FREEZE + three defect fixes (D-1 · D-2 · D-3). **Not** a redesign, feature, form-expansion or
integration spec.
**Baseline**: HEAD `21502af` · branch `feature/012-role-portal-foundation` · Spec 040 committed · PR **#13** merged
(merge commit `13d38af`) · both `21502af` and `13d38af` present on `origin/main` · in sync (ahead 0 / behind 0) ·
tree clean except the Spec-041 artifacts + `.specify/feature.json`.
**Governing spec**: `spec.md` (this directory). **Governing amendment**:
`040-settings-deep-links-subpages/future-owner-register.md` §1/§3 — 041 is a **baseline** freeze, not the final
product freeze (that is 057), and **no real integration may be assigned to it**.

> **Roadmap provenance (binding wherever this plan names an owner).** The committed spec corpus charters, as a spec
> directory with its own `spec.md`, **only Spec 041**. **Specs 042–057 are a maintainer-directed, append-only
> amendment** recorded in `040-.../future-owner-register.md` §1 — they are *recorded maintainer intentions*, not
> chartered specs. Every "owner: 04x/05x" cell below inherits that caveat. This plan invents no spec number.

---

## 1. Summary

Spec 041 recomputed the whole route + sidebar surface from `21502af` and found it clean apart from **three**
defects. This plan **decides** all three, prices them, declares the exact test supersessions they force, and fixes
the counts that every later spec inherits.

| # | Defect | Decided architecture | Blast radius |
|---|---|---|---|
| **D-1** | `teachers` · `addTeacher` · `teacherCategories` all route to bare `teachers.html`; no `#view=` hash and **no drawer-hash mechanism exists** — "Add Teacher" promises a form and delivers the directory | **Option A — the MOVE architecture.** `teachers.html` gains a 3-tab group (`directory` default · `add` · `categories`); the Add-Teacher form **moves out of** the `trn-add` drawer and the Categories surface **moves out of** the `trn-categories` drawer into the tab panels; both header buttons are removed; routes become `teachers.html#view=add` / `#view=categories` | 2 page bodies (`teachers.html`/`.en`) · 62 admin sidebars (2 hrefs gain a fragment) · 4 source modules + 2 locales |
| **D-2** | `gallery.html` / `gallery.en.html` are orphans with no owner and no documented entry path | **Option A — freeze the orphan.** Direct-URL-only by design; owner = the **frontend / design-system maintainer** (not a spec number); registered in `page-reachability-register.md`; an additive smoke assert freezes the orphan set as **exactly** `{gallery.html, gallery.en.html}` — a NEW orphan fails | **0 source · 0 HTML.** Docs + one additive assert |
| **D-3** | *(promoted from O-1)* the **topbar** language switch destroys the URL fragment: `enhance.js:237-241` `langUrl()` reads `location.pathname` only and never `location.hash`; `enhance.js:552-553` does `location.href = langUrl(l)` | **The one-line narrow fix**: `return (lang === 'en' ? `${base}.en.html` : `${base}.html`) + location.hash;` — preserves `#view=` **and** the existing `#step=` wizard fragment. No new hook, no storage key, no dependency, no redesign of the language control. `components/sidebar.js` untouched | 1 line in `enhance.js` (the **one declared 0-diff-wall exception**) · 0 page bodies |

Everything else in 041 is **census, freeze and additive test coverage**: the counts become machine-asserted
constants, the deep-link matrix becomes **derived from `NAV_CATEGORIES`** (group-aware, stored-view-seeded), the
fragment-blind link crawl is closed, AR/EN route parity and the orphan set become rules, and the documentation is
reconciled with the tree.

**Post-041 frozen target** (unchanged in every count that matters; the only movement is a declared
*re-classification* inside the route split):

```
HTML 115 · PAGES 57 · admin files 64 · portal files 50 · index 1 · categories 6 · admin menu 50
implemented 49 · planned 0 · disabled 1 · deep-links 24 · plain routes 25 · route-less 1
FUTURE_ROUTES {} · coming-soon 0 · honest locks = classSalaryReport only
orphan set = exactly {gallery.html, gallery.en.html} · finance-analysis absent
```

---

## 2. Baseline (re-verified live at `21502af`)

| Item | Verified value |
|---|---|
| Branch / HEAD | `feature/012-role-portal-foundation` / **`21502af`** (Spec 040) |
| PR | **#13 merged**; merge commit **`13d38af`** — both commits on `origin/main` |
| Remote sync | ahead **0** / behind **0** |
| Working tree | clean except `specs/041-route-sidebar-production-freeze/**` + `.specify/feature.json` |
| Pages | **115** HTML · **57** PAGES bases · **64** admin files · **50** portal files · **1** `index.html` |
| Admin nav | **6** categories · **50** items (control 12 · families 9 · teachers 6 · reports 11 · admin 5 · settings 7) |
| Status census | implemented **49** · planned **0** · disabled **1** |
| `FUTURE_ROUTES` | **`{}`** |
| Honest locks | **1** — `classSalaryReport` (route-less, `data-reason-key="nav.reason.finance"`, `#i-lock`) |
| Route split (pre-041) | **22** deep-link + **27** plain + **1** route-less = 50 |

**Documentation drift to close (FR-019/FR-022):** `CLAUDE.md` still names HEAD `4cbcb31` and calls Spec 039
"awaiting the watcher commit". Both 039 (`58a53e2`) and 040 (`21502af`) are committed. Every number in this plan is
recomputed from `21502af`; **any supersession computed against `4cbcb31` is void** (Spec 040 Risk R9).

---

## 3. D-1 — decided architecture (Option A, the **MOVE**)

### 3.1 What exists today (grounded, not recalled)

`src/js/pages/teachers.js:105-112` renders:

```
pageHeader({ …, secondary: button({ …, attrs: 'data-drawer="trn-categories"' }), primary: addTeacherAction() })
filterBar → cardGrid(#teachers-grid) → noResults() → per-teacher previewTemplate drawers
categoriesDrawer()   // template data-preview="trn-categories"
teacherEditDrawer()  // template data-preview="trn-edit"
teacherAddDrawer()   // template data-preview="trn-add"
```

* `components/teacher-actions.js` owns `addTeacherAction()` (the header primary → `data-drawer="trn-add"`),
  `teacherAddDrawer()` = `formDrawer('trn-add', { fields: teacherFields('trnAdd', true) })` — **13 `field()`
  controls + the CV-upload GATE + exactly ONE primary `backendRequired` Save** — and `teacherEditDrawer()`
  (`trn-edit`).
  > **Grounded count correction (binding, from `d1-teacher-route-contract.md` §1.1):** the add form has **13**
  > `field()` controls, not 12 — `firstName · lastName · firstNameAr · lastNameAr · email · phone · status ·
  > subjects · level · courses · city · country · notes` (the 13th is the `notes` textarea; the planning brief's
  > "12" counted the non-textarea controls). Verified two ways: `teacher-actions.js:47-63` and an id extraction
  > from the built `public/teachers.html` `trn-add` template (13 × `id="f-trnAdd-*"`). **`cvGate()` is emitted
  > *inside* `teacherFields()`** — it is not a separate argument. No capability is added or removed by this
  > correction; **13** is used throughout this plan.
* `pages/teachers.js` owns `categoriesDrawer()` = `previewTemplate('trn-categories', …)` — the category list
  (`TEACHER_CATEGORIES`) + a **real inline create form** (name / status / description) + an assign gate + exactly
  ONE primary Save gate.
* **Caller census (grounded):** `teachers.js` is the **only** caller of `addTeacherAction()` and
  `teacherAddDrawer()`. `teacherEditDrawer()` is also called by `pages/teacher.js:199`; `teacherNoteDrawer()` only
  by `teacher.js`.

### 3.2 The forced-architecture proof — why **MOVE** is the only compliant shape

Three independent, load-bearing mechanism facts:

| # | Mechanism fact (source) | Consequence |
|---|---|---|
| **F-1** | `components/form-field.js` `field()` emits `id="f-<name>"`. The `trn-add` drawer body is a `<template data-preview="trn-add">`; `enhance.js` **clones it into the live sheet on open**. Template content is inert while baked — but it becomes **live DOM** the moment the drawer opens. | Rendering the add form in **both** a tab panel and the `trn-add` template ⇒ **duplicate element ids** (`f-trnAdd-firstName` ×2) in the live document. **FORBIDDEN.** Duplication is not an option. |
| **F-2** | Spec 032's law: *every Add/Create/Edit opens a REAL form with visible grounded fields FIRST; only the final Save is a gate.* | A tab panel containing only an "Open the form" button is a **second click before any field is visible** — the exact "too-early gate" Spec 032 abolished. **FORBIDDEN by the direct-surface law.** |
| **F-3** | `enhance.js:242-259` `selectTab(group,id)` resolves `wrap.querySelector('[data-tab="id"]')` **inside** `[data-tabs="group"]`; and `enhance.js` has **no `hashchange` listener** — `initTabs()` runs once, at load. | A tab-selector button placed **outside** the tabs wrap (e.g. in `pageHeader`) does **not** switch tabs. And a **same-page** anchor `href="teachers.html#view=add"` clicked *from* `teachers.html` changes the hash with **no reload and no listener** ⇒ **no tab switch**. So the header buttons can be neither re-wired as tab selectors nor demoted to same-page anchors. |

F-1 kills *duplicate*; F-2 kills *tab-holds-a-button*; F-3 kills *keep-the-header-buttons-as-tab-affordances*.
**The only shape left is MOVE**: the form bodies move into the tab panels, the two drawers are removed from
`teachers.html`, and the **tablist is the affordance** (plus the sidebar deep-links, which land directly on the
surface). This is extract-and-reuse — **never duplicate**.

### 3.3 The adopted shape

`teachers.html` gains **one** tab group via the existing `components/tabs.js` (`tabs({ group:'teachers', items, panels })`):

| Tab id | Contents | Provenance |
|---|---|---|
| `directory` *(baked first = default)* | the CURRENT body **verbatim**: `summaryCards` + `filterBar` + `cardGrid(#teachers-grid)` + `noResults()` + the per-teacher preview drawers + `teacherEditDrawer()` | unchanged markup, re-parented into the panel |
| `add` | the REAL add-teacher form **moved from `trn-add`**: the same `teacherFields('trnAdd', true)` field body (**13** controls, CV **GATE** emitted inside it) + exactly **ONE** primary `backendRequired` Save | `components/teacher-actions.js` |
| `categories` | the REAL categories surface **moved from `trn-categories`**: the `TEACHER_CATEGORIES` list + the inline create form + the assign gate + exactly **ONE** primary Save gate | `pages/teachers.js` `categoriesDrawer()` |

**Tab group id** = `teachers` (free; `teacher.html` already owns group `teacher`, `teacher-performance.html` owns
group `perf`). **Locale keys** must NOT collide with the existing `trn.tab.*` block (that is `teacher.html`'s
profile tablist, and `trn.tab.notes` is additionally used as a *field label* in `teacherFields()`), nor with
`trn.board.tab.*` (teacher-performance). New mirrored keys land in a fresh nested block in the EXISTING pair
`src/locales/ar.trn.js` / `en.trn.js` — e.g. `trn.list.tab.{directory,add,categories}` — 3 keys × 2 languages,
**0 key-set divergence**. No new locale module (`i18n.js` stays 0-diff).

**Field-body ownership (this is why `components/teacher-actions.js` is in the impact allowlist).** `teachers.js`
must not re-declare the 13 fields — one definition or nothing. The plan **extracts the field body** in
`teacher-actions.js` so that exactly one definition of `teacherFields('trnAdd', true)` (+ its inner CV gate) feeds
the `add` tab panel.

**Symbol disposition — DECIDED, and owned by `d1-teacher-route-contract.md` §6 (the more specific instrument;
this plan states its decision, it does not offer an alternative):**

| Symbol | Disposition | Reason |
|---|---|---|
| `teacherFields(p, withGeo)` | **EXPORTED** (was module-private) — the single shared field-body builder. Signature/output unchanged, so `trn-edit` keeps calling it and **`teacher.html`'s BODY stays byte-identical** (the whole file still carries the 2 changed sidebar hrefs — it is a sidebar-only page, not a whole-file-identical one). | one definition of the fields, or they drift |
| `teacherAddDrawer()` | **REPURPOSED → `teacherAddPanel()`** — emits the *panel body* (`.wiz-grid` + the same 13 fields + CV gate + the one primary `common.add` `backendRequired` Save) instead of `formDrawer('trn-add', …)`. | **Retaining it as an unused export is REJECTED**: a dead `formDrawer('trn-add', …)` that anyone could later call re-creates the exact `f-trnAdd-*` duplicate-id collision (F-1) the MOVE exists to prevent. |
| `addTeacherAction()` | **REMOVED**, together with its sole call site (`teachers.js:105`). | the header button is removed (§3.4); grounding proves `teachers.js` was its only caller |
| `categoriesDrawer()` (in `pages/teachers.js`) | **REPURPOSED → `categoriesPanel()`** — same body, no `<template>` wrapper (the Spec-037 `families.js` precedent). | same |
| `teacherEditDrawer()` · `teacherNoteDrawer()` · `teacherActions()` | **0-diff**, callers untouched | `trn-edit` / `trn-note` are row-scoped drawers, not nav destinations |

**Zero-deletion (L-5) is satisfied because the law protects CAPABILITIES, not symbols.** The add-teacher form, its
13 fields, its CV gate and its single gated Save all **survive verbatim** — relocated from a drawer host to a tab
host, and reachable in *fewer* clicks than before. `formDrawer()` itself (`components/preview-drawer.js`, a 0-diff
wall file) is untouched and still used by `trn-edit`, `trn-note` and ~20 other drawers.

> **This is a declared refinement of `impact-boundary.md` §4**, which listed `components/teacher-actions.js` as
> 0-diff under every option on the assumption that Option A merely *added* tabs beside the drawers. The
> duplicate-id proof (F-1) shows that assumption is unreachable: Option A is a **MOVE**, and the move requires the
> field body to be extracted where it is defined. The refinement **narrows** nothing and **weakens** nothing; it
> names one more file in the allowlist before implementation rather than discovering it during.

### 3.4 Exact disposition table (every affordance and every navigation path)

| Subject | After D-1 | Rationale |
|---|---|---|
| **`trn-add` drawer** (template + `data-drawer` trigger) | **REMOVED from `teachers.html`.** Its field body becomes the `add` tab panel. Not baked anywhere else (no other caller). | F-1 duplicate-id; MOVE, not duplicate |
| **`trn-categories` drawer** (template + `data-drawer` trigger) | **REMOVED from `teachers.html`.** Its body (list + create form + assign gate + Save gate) becomes the `categories` tab panel, **content-identical**. | F-1; the honesty guarantee (real list + real form + gated finals) is preserved — only the HOST changes |
| **`trn-edit` drawer** | **STAYS a drawer**, on `teachers.html` (opened from the card kebab, inside the `directory` panel) **and** on `teacher.html`. Unchanged. | it is a per-row action, not a nav destination; `FORM_DRAWERS_032.teacher` is untouched |
| **Header "Add teacher" button** (`addTeacherAction()`) | **REMOVED.** | F-3: cannot be a tab selector (outside the wrap) and cannot be a same-page anchor (no `hashchange` listener). The **tablist** is the affordance; the sidebar deep-link lands on it directly. Spec 032's law is satisfied **more** directly — the form's fields are visible with **zero** clicks from `#view=add` |
| **Header "Manage categories" button** (`data-drawer="trn-categories"`) | **REMOVED.** | same |
| **Fresh load `teachers.html`** | `initTabs()` finds no hash → stored view → baked default ⇒ **`directory`**. Byte-identical directory content. | `enhance.js:261-273` precedence |
| **Fresh load `teachers.html#view=add`** (the sidebar deep-link, AR and EN) | hash **wins over any stored view** ⇒ the `add` panel is the ONLY visible `[data-tabpanel]` in group `teachers`; all **13** fields visible immediately, zero clicks | the precedence the seeded matrix asserts |
| **Hash nav from another page** | a real page load ⇒ `initTabs()` runs ⇒ correct tab. This is how all 24 deep-links work. | |
| **Same-page hash nav** (already on `teachers.html`) | **not an affordance and not offered** — no in-body anchor to `teachers.html#view=…` is emitted. Tab switching is done by the tablist (which `selectTab` persists + `history.replaceState`s). | F-3: no `hashchange` listener; an in-page anchor would silently do nothing |
| **Back / Forward** | unchanged from every other tabbed page: `selectTab(…,{persist:true})` uses `history.replaceState` (not `pushState`), so tab clicks do **not** create history entries; Back returns to the previous **page**, whose own `initTabs()` re-runs on load. Landing again on `teachers.html#view=add` from history restores the `add` tab. **No new history behaviour is introduced.** | `enhance.js:255-258` |
| **Active sidebar state** | `build-html.mjs` PAGES gives `teachers.html` exactly **one** `activeId: 'teachers'`; so the `teachers` item keeps the active pill even when the user arrived via `#view=add`. **Unchanged, and consistent with the existing precedent** (`library.html` bakes `activeId:'books'` while `materials` deep-links into the same file). `build-html.mjs` stays **0-diff**. | static-build fact; recorded, not "fixed" |
| **AR/EN switching — sidebar** | `components/sidebar.js` `langRoute()` is **hash-aware** (Spec 035): `teachers.html#view=add` → `teachers.en.html#view=add`. **Already correct; 0-diff.** | see §5 |
| **AR/EN switching — topbar** | today **destroys** the fragment ⇒ **D-3**, fixed in this spec (§4). After the fix, toggling EN on `teachers.html#view=add` lands on `teachers.en.html#view=add` with the `add` tab open. | |
| **`teachers.js` page-level filter/no-results** | the single global `[data-no-results]` contract is honored: the `filterBar` + `noResults()` pair stays inside the `directory` panel and **no second filterBar is introduced** in `add`/`categories`. | the constraint Specs 036/037 recorded |
| **Pay-free law** | the moved add-form carries the SAME fields it carries today: **no salary / rate / hour-rate / fine / payout / currency field**, no `type=password`, no `type=file` (CV stays a GATE). Nothing is added, nothing is redesigned. | teacher pay-free (global) |

### 3.5 Routes after D-1

| Nav id | Route before | Route after | Class |
|---|---|---|---|
| `teachers` | `teachers.html` | `teachers.html` | plain (baked default tab = `directory`) |
| `addTeacher` | `teachers.html` | **`teachers.html#view=add`** | deep-link |
| `teacherCategories` | `teachers.html` | **`teachers.html#view=categories`** | deep-link |

The teachers triple **ceases to be a duplicate destination**; the only remaining shared destination is the
sanctioned **S-1** (`salaries` + `staffSalaries` → `finance.html#view=salaries`).

---

## 4. D-3 — the promoted defect (O-1 → D-3): topbar language-switch hash loss

### 4.1 The defect, grounded

`src/js/enhance.js:237-241`:

```js
function langUrl(lang) {
  const file = (location.pathname.split('/').pop() || 'dashboard.html');
  const base = file.replace('.en.html', '').replace('.html', '') || 'dashboard';
  return lang === 'en' ? `${base}.en.html` : `${base}.html`;
}
```

It reads `location.pathname` **only** and **never** `location.hash`. `enhance.js:552-553` (the delegated click
listener) does `location.href = langUrl(l)`. **The fragment is destroyed on every topbar language switch.**

**Live reproduction** (headless Chromium, correct MIME types): `finance.html#view=banks` → EN toggle →
`finance.en.html`, **hash GONE**, the visible tab reverts to the baked default `overview`. Confirmed, not inferred.

### 4.2 Why it belongs in 041 (the promotion argument)

O-1 was first recorded as an *interaction* observation. It is **not**. It is a **route/deep-link parity defect**:

* Its subject is the **route** (a nav item's `#view=` fragment) and its symptom is a **broken deep-link**, i.e. the
  precise object 041 exists to freeze. A route freeze that certifies "24 deep-links resolve to their tab" while a
  single topbar click silently discards the fragment would be **freezing a false statement**.
* It is **not** a modal/drawer/long-form interaction concern (Spec 044 / FO-23), it adds **no** mechanism, no new
  URL-state surface, no hook, no storage key, no dependency, and it does **not** touch the language control's design.
  Contrast D-1 Option **B** (a `#drawer=` router), which *is* a new URL-state mechanism and is therefore correctly
  rejected here and handed to 044.
* It is the **smallest honest change that can exist**: **one expression**, in the function that already computes the
  language URL.
* Leaving it open would make **SC-08 / SC-12 (AR/EN parity)** vacuous in production: a user who deep-links, then
  switches language, loses the destination the sidebar just promised.

**Blocking**: yes. 041 cannot certify route parity while the topbar breaks it.

### 4.3 The narrow fix (decided)

```js
return (lang === 'en' ? `${base}.en.html` : `${base}.html`) + location.hash;
```

* Preserves `#view=` (tabs) **and** the existing `#step=` wizard fragment (`add-family.html`) — both are already
  parsed at load by `initTabs()` / the wizard init, so the destination page restores the same state in the other
  language.
* **`location.search` is NOT preserved — deliberately, and recorded here rather than silently.** The *current*
  helper already drops the query string (it only ever read `pathname`); the app is static and uses **no** query
  strings anywhere. Preserving `search` would be a **behaviour change beyond the minimal fix** and is **NOT
  adopted**. If a future spec introduces query state, it owns that change.
* **`components/sidebar.js` is untouched** (its `langRoute()` is already hash-aware — §5).
* No new hook · no new storage key · no new dependency · no redesign of the language menu.

### 4.4 Test-design trap (found live — binding on the D-3 test)

`settings.html` renders **TWO** `[data-set-lang]` elements: the **topbar language menu** *and* the Customization
tab's **REAL language control** (`settingsSection` appearance). **Any D-3 test MUST scope to the topbar menu** —
open `[data-action="lang-menu"]` first, then click **that menu's** `[data-set-lang]`. An unscoped
`page.click('[data-set-lang]')` hits the wrong control and **silently proves nothing**. The D-3 test must be
written on a page with a fragment (e.g. `finance.html#view=banks` and `teachers.html#view=add`), AR→EN and EN→AR,
asserting the fragment survives **and** the target tab is the visible one.

---

## 5. Route parity is TWO contracts, not one

The audit found — and the plan freezes — a split that prior prose collapsed:

| Contract | Mechanism | State at `21502af` | 041 action |
|---|---|---|---|
| **Sidebar route parity** (AR item ↔ EN item) | `components/sidebar.js` `langRoute()` — **hash-aware since Spec 035**: splits at `#`, rewrites only the file part, re-appends the fragment byte-identically | **CORRECT.** 0 parity failures across all 50 items × 64 admin files | **Assert it as a rule** (`ar-en-route-parity-register.md`; smoke T-04): `route_en === langRoute(route_ar)`, fragment byte-identical. A dropped `#view=` on an EN twin is currently invisible. **`sidebar.js` stays 0-diff.** |
| **Topbar language-switch parity** (same page, other language, **same fragment**) | `enhance.js` `langUrl()` — **pathname-only** | **DEFECTIVE** — the fragment is destroyed (§4) | **FIX (D-3)**: one line, + a topbar-scoped test on both a `#view=` page and the `#step=` wizard |

Freezing only the first while the second is broken is what makes the promotion of O-1 → D-3 mandatory rather than
optional.

---

## 6. D-2 — decided (orphan frozen)

| Item | Decision |
|---|---|
| Pages | `gallery.html` · `gallery.en.html` — PAGES entries with `activeId: null`; render the admin sidebar (2 of the 64); **not** in `nav.config`, **not** linked from `index.html` or any of the other 113 pages |
| Status | **NOT a route defect.** The defect was its *undocumentedness* |
| Purpose | frontend / design-system **reference** — every shared component and state rendered against the live fixtures in one place |
| **Owner** | the **frontend / design-system maintainer** — **not** a spec number. (044 owns the modal/drawer *interaction system*, not the component catalogue page.) |
| **Entry path** | **direct URL only, by design** — maintainer-facing, deliberately absent from production navigation |
| Guard | an **additive** smoke assert freezing the orphan set as **exactly** `{gallery.html, gallery.en.html}` — a NEW orphan (a page built and then forgotten) **fails the build** |
| Impact | **0 application source · 0 HTML.** Documentation (`page-reachability-register.md` §§4–7) + one additive assert |

---

## 7. The route split: 24 + 25 + 1 = 50

| Bucket | Before (`21502af`) | After 041 | Note |
|---|---:|---:|---|
| Deep-link routes (`route` contains `#view=`) | 22 | **24** | `+addTeacher`, `+teacherCategories` |
| Plain page routes (bare `*.html`) | 27 | **25** | the same two leave this bucket |
| Route-less items (honest lock) | 1 | **1** | `classSalaryReport` |
| **Menu total** | **50** | **50** | 24 + 25 + 1 = 50 ✅ · routed total 49 unchanged |

This is a **re-classification, not a count change** — expressly permitted by `count-and-freeze-contract.md` §5's
D-1 freeze rule (which leaves precisely these two route strings open for correction without invoking the §8
supersession law) and pre-priced by `spec.md` FR-005 and `impact-boundary.md` §2 Option A. **Any other movement of
these two figures is silent drift and requires a full supersession.**

**FR-009 / Q-9 — DECIDED: yes.** 041 ships a **committed, checked-in exact route-inventory contract** (a 50-row
`id → status → exact route (or null)` table) **in addition** to the source-derived assertions, so a `nav.config.js`
edit cannot silently redefine its own expectation. The derived assertions prove *internal consistency*; the
committed table proves *the routes are the ones the product agreed to*.

---

## 8. Declared protected-test supersessions — exactly **five**, all forced by the D-1 MOVE

Every one is a **RELOCATION of the subject, never a weakening** (Supersession Law L-1). Each ships the six
artefacts required by L-3 (old code · new code · evidence · reason · byte-verbatim neighbours · mutation proof).

| # | Site (`tests/smoke/run.cjs` @ `21502af`) | Old | New | Why it is a relocation, not a weakening |
|---|---|---|---|---|
| **S1** | `:88` — `FORM_DRAWERS_032.teachers` | `['trn-edit','trn-add','trn-categories']` | **`['trn-edit']`** | `trn-add` / `trn-categories` are **no longer drawers on this page** — their forms are tab panels. The MUST-OMIT / no-gate / multi-primary / fieldless audits that the register drives now apply to the tab panels (S4). `FORM_DRAWERS_032.teacher` (`teacher.html` = `['trn-edit','trn-note']`) is **UNCHANGED**. |
| **S2** | `:111` — `PICKERS_032` | `teachers: ['trn-categories']` | **entry removed** | the picker register lists *drawer* pickers; `teachers.html` no longer bakes one |
| **S3** | `:115` — `HYBRID_032` | `{ teachers:['trn-categories'], reports:[…], library:[…] }` | **`teachers` dropped**; `reports` / `library` **byte-verbatim** | the "hybrid category drawer" class no longer has a member on `teachers.html`; the hybrid *content* (list + real create form) is preserved in the `categories` tab and asserted by S4 |
| **S4** | `:747-752` — asserts `[data-drawer="trn-categories"]` **and** `template[data-preview="trn-categories"]` both exist | drawer + template presence | **the `categories` TAB PANEL exists and contains the category list + the create form (name/status/description) + the assign gate + exactly ONE primary Save gate** | the honesty guarantee is **preserved in full**; only the HOST changes (drawer → tab). The neighbouring asserts in the same block — `kebabs > 0 && kebabs === cards`, `!kb.pay` (`PAY28`) — stay **BYTE-VERBATIM** |
| **S5** | `:1494-1495` — Spec 036 `nav036` | `addTeacher` / `teacherCategories` must be real anchors matching `/(^\|\/)teachers\.(en\.)?html$/` | **`/(^\|\/)teachers\.(en\.)?html#view=add$/`** and **`…#view=categories$/`** | the *predicate* (`anchorOk036` = anchor ∧ ¬coming-soon ∧ regex) is **unchanged** — this is the identical re-target Spec 037 performed on `nav035`. The `sessionsKpi` / `monthlyPerf` regexes and `teachersPlanned === 0` in the same block stay **BYTE-VERBATIM** |

**Plus TWO declared 0-diff-wall supersessions (neither is a test supersession) — the complete, closed set,
formalised as W-1 / W-2 in `impact-protection-contract.md` §6.2:**

| # | Wall file released | Bound |
|---|---|---|
| **W-1** | `src/js/enhance.js` | **EXACTLY ONE line** — the `langUrl()` return gains `+ location.hash` (D-3, §4.3). `git diff -U0 -- src/js/enhance.js` must show exactly one `-`/`+` pair, inside `langUrl()`. **A second changed line in `enhance.js` is a plan violation.** |
| **W-2** | `src/js/components/teacher-actions.js` | the **field-body extraction** forced by the D-1 MOVE (§3.3). `impact-boundary.md` §4 listed this file as 0-diff on the assumption that Option A merely *added* tabs beside the drawers; the duplicate-id proof (F-1) shows that assumption is unreachable. `teacherEditDrawer()` / `teacherNoteDrawer()` / `teacherActions()` stay 0-diff inside the same file ⇒ **`teacher.html` body byte-identical**. |

**Every other wall file stays 0-diff** (§10.2). **No third wall supersession may be declared during implementation.**
The two are named *before* implementation rather than discovered during it; neither widens the other, and **W-1 does
not grow** — `enhance.js` gets one expression and nothing else.

**Terminology, fixed once so no artifact drifts:** Spec 041 declares **five protected-test supersessions (S1–S5)**
**+ two 0-diff-wall supersessions (W-1, W-2)**. Where another artifact says "exactly SIX real supersessions", it is
counting S1–S5 + W-1 (the only *behaviour* change) and classifying W-2 as an allowlist amendment. Both readings
describe the same closed set; **the numbers that matter are: protected-test edits = 5, `enhance.js` lines = 1.**

**Every other protected assert stays BYTE-VERBATIM**, including: `payHit` · `tchPay` · `famPay` · both `payFigure`
lines · child-view · `PAY28`/`noPay` · `P-07` finance · `P-08` reports · `pub.length === 115` · `navCount32 === 50`
and its four twins · `nav010` (railCats 6 / `finMembers` / `finLinks` / banks placement / sessions badge /
`famTitle`) · `deadNav` · `links010` · `truth010.badPlanned/badDisabled` · `plannedNavAnchors === 0` ×4 ·
`zeroPlanned` · `a31`/`g32` · all five `classSalaryReport` lock sites (P-24 · P-25 · P-26 · P-27 · P-34) · the whole
`nav.config` SOURCE audit (P-29…P-37).

**Reconciliation with `protected-test-register.md` §0 L-6** ("Spec 041 takes **zero** supersessions"). That line was
written before the D-1 architecture was decided and before O-1 was promoted; it assumed a fix that only *added*
tabs. The duplicate-id proof (§3.2 F-1) makes that unreachable. **This plan declares five supersessions + one wall
exception, all relocations, none weakening** — which is exactly the L-1/L-3/L-4 procedure L-6 exists to bound. The
amendment budget is **named, small, and closed here**: no further supersession may be taken during implementation
without returning to this plan.

**Not supersessions — DOCUMENTATION CORRECTIONS (FR-020 / FR-021, Q-8 decided):**

| Item | Classification |
|---|---|
| `run.cjs:2580` stale header comment (`…= 103` while the assert one line below is `pub.length === 115`) | **documentation correction** — comment text only; no assertion logic changes |
| `truth010.badPlanned` recorded as **vacuous-but-retained** (0 planned items exist ⇒ the filter can never be non-empty) | **documentation correction** — the assert is **RETAINED byte-verbatim** (zero-deletion L-5); only its status is explained, exactly as `plannedNavAnchors === 0` already is |
| the corrected planned-probe chain (034 → 035 → **036 teachers→admin** · **038 no-op** · 039 admin→settings · 040 RETIRED) | **documentation correction** of `040-.../protected-test-supersession-register.md`'s narrative; 040's conclusion is unaffected |

---

## 9. Additive test coverage (no protected line touched)

| ID | Coverage | Decision |
|---|---|---|
| **T-01** | **Derived + seeded deep-link matrix for all 24 `#view=` routes.** Iterate every `NAV_CATEGORIES` item whose `route` contains `#view=`; load `<file>#view=<v>` and `<file>.en.html#view=<v>` in a **fresh context** with `localStorage['academy.schedView.<group>']` pre-seeded (via `ctx.addInitScript`) to a **different existing tab id**; assert the target panel is active **and is the only active panel in its group**. **[R-1 — ADDITIVE]** The four existing hand-written literal arrays (`SP037_DEEPLINKS`, `SP039_DEEPLINKS`, `SP040_VIEWS`, the Spec-038 finance array) are **RETAINED VERBATIM** — the derived matrix is the generic **freeze layer** and sits *beside* them; they remain the domain-specific regression coverage. **Deleting or folding any of them would be a sixth protected-test supersession, which is FORBIDDEN** (the budget is exactly S1–S5). The only literals that may change are those already inside S1–S5 because D-1 changed their real destination. Today only **9/22** are discriminating — a regression of `initTabs` to `stored \|\| hash` would pass the other 13. | **ADOPTED.** The `file → data-tabs group → baked default` map is carried explicitly (groups are not derivable from the route string: `teacher-performance` → group **`perf`**) and asserted **complete** (every deep-link file has an entry; no orphan entries). New row: `teachers` → group `teachers`, default `directory`. |
| **T-02** | **Fragment resolution.** `links010` strips the fragment (`const file = h.split('#')[0]`) before the `VALID_FILES` lookup — `settings.html#view=customisation` (UK spelling) is invisible to `badTarget`. Add a Node-side assert: for **every** `#view=` route, the fragment id exists as a `[data-tab]` / `[data-tabpanel]` on **both** the AR and EN target file. The strip **stays** for `VALID_FILES` (that is why `deadHash`/`badTarget` are legitimately 0); T-02 is **additive**. | ADOPTED |
| **T-03** | **The whole 50-row sidebar-href register** asserted at once — against `NAV_CATEGORIES` in SOURCE **and** against the rendered sidebar — plus the **committed** route-inventory contract (§7, FR-009/Q-9). | ADOPTED |
| **T-04** | **AR/EN nav route parity as a rule**: `route_en === langRoute(route_ar)`, fragment byte-identical, for all 50 items. | ADOPTED |
| **T-05** | **Orphan set** = exactly `{gallery.html, gallery.en.html}` (D-2). | ADOPTED |
| **T-06** | **Repeated-destination census** (the artifact set also calls this "route uniqueness" — the same assert). It is **NOT** a naive uniqueness assert: it **tolerates exactly one** repeated `{file, fragment}` pair — **S-1** (`salaries` / `staffSalaries` → `finance.html#view=salaries`, sanctioned, Spec 038) — **and asserts it is the only one** (FR-024/R-23; a naive uniqueness rule would "fix" a correct pattern). **RED today** on the teachers triple; **GREEN after D-1**. | ADOPTED |
| **T-07 / E-04 (Q-6 decided)** | **GROUP-AWARE matrix, not a "one tabs widget per page" rule.** `selectTab` persists a **global** `#view=` (one fragment, all groups), so two groups on one page would fight over the fragment — but **no page has two groups today, so there is no live bug**. The derived matrix records **which `[data-tabs]` group owns each tab id** and scopes every assertion to `[data-tabs="<group>"] [data-tabpanel]`. **A permanent ≤1-group-per-page rule is NOT imposed** — it would constrain future pages for no present benefit. | ADOPTED (group-aware) |
| **T-08 / E-10 (Q-7 decided)** | **Floor = ≥2 a11y rows and ≥2 screenshot frames per deep-linked view.** Audit of the existing matrices shows the floor is already met everywhere **except `settingsUsers`** (`a11y/run.cjs:209` = 1 row; `capture.cjs:429` = 1 frame). **Add exactly ONE a11y row + ONE frame for `settingsUsers`** — **do not multiply the whole matrix.** The two NEW views (`teachers#view=add`, `#view=categories`) enter at the floor: ≥2 a11y rows and ≥2 frames each. **NB** `capture.cjs:545` is `process.exit(0)` — screenshot console-error counts are **advisory, not a gate**; and `a11y/run.cjs:375` hard-exits on `critical > 0` only (`serious` is reported and must be **0** to ship, but is not itself the exit gate). |
| **T-09** | **FR-020 documentation correction** — the stale `run.cjs:2580` header comment (`… = 103`) is corrected to the frozen 115. **Comment text only; the assert one line below (`pub.length === 115`) is byte-verbatim.** Not a supersession (§8). |
| **T-10** | **D-3 topbar language-hash test** (§4.4) — the slot the specify round reserved for O-1's *carry-forward owner*, now that O-1 is **promoted to D-3 and fixed here**. Topbar-scoped: click `[data-action="lang-menu"]` FIRST, then that menu's `[data-set-lang]` (`.popover [data-set-lang]`, equivalently `[data-set-lang]:not([data-lang-opt])`); assert the fragment survives **and** the target tab is the visible one, AR→EN and EN→AR, on a `#view=` page **and** on the `#step=` wizard, with a hash-less control row. Full row matrix T1–T8 + assertion set A1–A9 in `d3-language-hash-contract.md` §7. **This is the test the trap exists to defeat — an unscoped `[data-set-lang]` click on `settings.html` hits the Customization control and proves nothing.** |

**T-numbering is canonical** (as reserved by `protected-test-register.md` §5): T-01 seeded matrix · T-02 fragment
resolution · T-03 route register · T-04 AR/EN parity · T-05 orphan set · T-06 repeated-destination census · T-07
group-aware fragment-ownership guard · T-08 matrix floors · T-09 stale-comment correction · **T-10 = the D-3 topbar
guard** (the promoted O-1 slot). `protected-test-contract.md` labels the same additive blocks A-1…A-7; the mapping
is stated there — the two are **naming schemes for one set of blocks, not rival sets.**

**Mutation proofs required** (`mutation-test-register.md` · `mutation-execution-contract.md`): T-01 ← flip `initTabs`
to `stored || hash` (all 24 seeded rows go RED; today only 9 would) · T-02 ← rename one `data-tab` id · T-03 ← change
any one of the 50 routes (incl. **M-1b**: repoint a plain route at a *real but wrong* page — GREEN today, the headline
gap **G-1**) · T-04 ← drop a `#view=` from one EN twin · T-05 ← add a PAGES entry with no inbound link, **and** the
count-frozen variant (orphan a page by repointing its only inbound link) · T-06 ← RED today on the teachers triple,
GREEN after D-1 · **T-10 ← revert the `+ location.hash` term ⇒ T1–T7 RED (T8, the hash-less control row, must stay
GREEN)** — this is the proof D-3's test is not vacuous.

---

## 10. Scope: source · tests · docs

### 10.1 Source (the complete allowlist — nothing else may change)

| File | Change | Defect |
|---|---|---|
| `src/js/nav.config.js` | **2 route-string edits**: `addTeacher` → `teachers.html#view=add`; `teacherCategories` → `teachers.html#view=categories`. (`teachers` keeps its route text **unchanged**.) **+ 2 stale-comment corrections** — the Spec-036 inline comments naming the `trn-add` / `trn-categories` **drawers** must be corrected in the same edit or they document a drawer that no longer exists (a documentation correction, not a supersession). No new item, no status change, `FUTURE_ROUTES` stays `{}` | D-1 |
| `src/js/pages/teachers.js` | body → `tabs({ group:'teachers' })` with 3 panels; `categoriesDrawer()` → `categoriesPanel()` (same body, no `<template>` wrapper) becomes the `categories` panel; the add-form body (from `teacher-actions.js`) becomes the `add` panel; the two header buttons removed; `teacherEditDrawer()` + the per-teacher previews + `#teachers-grid` + `filterBar` + `noResults()` **unchanged inside `directory`** | D-1 |
| `src/js/components/teacher-actions.js` | **field-body extraction** (wall supersession **W-2**) — `teacherFields(p, withGeo)` **exported** as the single definition of the 13 controls + inner CV gate; `teacherAddDrawer()` **repurposed → `teacherAddPanel()`**; `addTeacherAction()` **removed** with its sole call site. `teacherEditDrawer()` / `teacherNoteDrawer()` / `teacherActions()` **0-diff** (§3.3) | D-1 |
| `src/locales/ar.trn.js` · `src/locales/en.trn.js` | **3 mirrored tab labels** in a **fresh nested block — `trn.list.tab.{directory,add,categories}`** (`trn.list.*` is unused today). **Must NOT reuse `trn.tab.*`** (that is `teacher.html`'s profile tablist, and `trn.tab.notes` is additionally a *field label* inside `teacherFields()`) **nor `trn.board.tab.*`** (that is `teacher-performance.html`) — the Spec-036 `trn.kpi` → `trn.sessKpi` collision precedent. AR/EN key-set divergence must stay **0** | D-1 |
| `src/js/enhance.js` | **ONE line** — `langUrl()` appends `location.hash` (wall supersession **W-1**; the only `enhance.js` change permitted) | D-3 |

### 10.2 The 0-diff wall (unchanged — every file below must be byte-identical to `21502af`)

```
package.json · scripts/build-html.mjs · src/js/i18n.js
src/js/components/sidebar.js · components/tabs.js · components/form-field.js
components/settings-section.js · components/preview-drawer.js · components/ui.js   ← the real path;
                                                                                     there is NO src/js/ui.js
src/js/fixtures/settings.js · src/js/pages/staff.js · src/js/fixtures/staff-management.js
src/js/fixtures/form-options.js · src/js/fixtures/teacher-management.js · src/js/fixtures/teachers.js
every other src/js/pages/*.js · every other src/js/fixtures/*.js · every other src/locales/*.js
every portal page source + fixture (family · teacher · student · hub)
```

**NO** new dependency · component · page · PAGES entry · `data-*` hook · storage key · locale module · CSS framework.
D-1 reuses `data-tabs` / `data-tab` / `data-tabpanel` + the existing `academy.schedView.<group>` key; D-3 introduces
no mechanism at all.

### 10.3 Tests

`tests/smoke/run.cjs` — the five supersessions (S1–S5) + the additive blocks **T-01…T-08 and T-10** + the **T-09**
`:2580` comment correction + the FR-021 vacuity note. **Zero deletions in any suite.**

**Induced matrix relocations — MANDATORY, and silently-failure-prone (do not omit these; they are the reason the
two suites do not quietly rot):** both suites **swallow a missing selector** — `a11y/run.cjs:349` is
`await p.click(s.open).catch(() => {})` and `capture.cjs:499` is
`await page.click(\`[data-drawer="${s.openDrawer}"]\`).catch(() => {})`. After the D-1 MOVE, every existing row/frame
that opens the `trn-add` / `trn-categories` **drawer** would therefore still "pass" — as an ordinary, drawer-less scan
of the *directory* tab, under a name claiming to show the Add form. That is a **false green / mislabelled artifact**,
not a failure. They are **relocated in place**, never deleted:

| Suite | Sites (`@21502af`) | Old | New |
|---|---|---|---|
| `tests/a11y/run.cjs` | `:215`, `:293` (**2 rows**; the only two naming `trn-add`/`trn-categories`) | `open: '[data-drawer="trn-add"]'` | `hash: '#view=add'` (the `hash` field is already supported, `a11y:127`) |
| `tests/screenshots/capture.cjs` | `:226`, `:290`, `:291`, `:294`, `:367`, `:368` (**6 frames**) | `openDrawer: 'trn-add' \| 'trn-categories'` | `view: 'add' \| 'categories'` (the `view` flag already exists, `capture:461`). **Historical `variant` names — `sp028-*`, `sp032-*`, `sp036-*` — are KEPT** so the visual-regression lineage stays comparable. |

**Additive rows/frames on top of the relocations:** a11y — +1 `settingsUsers` row (the E-10 floor), +≥2 rows each for
`teachers#view=add` / `#view=categories` (AR/EN × light/dark + mobile-390), + the keyboard/roving-tabindex rows for the
new `teachers` tablist. Screenshots — +1 `settingsUsers` frame, +≥2 `sp041-*` frames each for the two new views.
Exact literals: `a11y-screenshot-contract.md` §§3–5, 7.

### 10.4 Docs

`CLAUDE.md` (HEAD `21502af`; 039 **and** 040 committed; the frozen counts; the 041 redefinition; the corrected
supersession chain) · `app/README.md` (roadmap sync, optional) · the committed **route-inventory contract** (§7) ·
`page-reachability-register.md` §§4–7 (D-2 owner + entry path).

**CF-1 (copy sweep) — Q-4 DECIDED: owner = Spec 044.** `common.backendRequiredNote` ("…nothing is **saved** yet",
EN, ~50 pages) is the **default `reasonKey` of `formDrawer()` in `components/preview-drawer.js`** — the exact shared
component that FO-23 assigns to 044 (the modal/drawer/long-form interaction system). It is **NOT swept in 041**
(rewording it would change ~50 page bodies — far outside a route/sidebar freeze). Per the roadmap-provenance caveat,
"044" is a maintainer-amendment slot; the assignment binds whichever spec is chartered into it.

---

## 11. The 5-level impact taxonomy (this plan's central discipline)

> **Grounded build fact (corrects an earlier shorthand in this plan — see `impact-protection-contract.md` §1.1):**
> **there is no bundler and no `public/assets/app.js`.** `npm run build` = `vendor-assets` → `build-assets` →
> `tailwindcss` → `build-html`; `scripts/build-assets.mjs` does a **verbatim recursive `cpSync`** of `src/js` →
> `public/assets/js` and `src/locales` → `public/assets/locales`. The shared JS asset is therefore
> **`public/assets/js/enhance.js`** — a **byte-identical copy** of `src/js/enhance.js` — referenced by an
> **unversioned** literal `<script type="module" src="./assets/js/enhance.js">` on **114** of the 115 pages
> (`index.html` does not load it at all). `public/assets/app.css` is the Tailwind CSS output, unrelated.
> **Consequence (and it strengthens the claim): because the reference is unversioned and the asset is a separate
> file, the D-3 edit changes ZERO bytes of HTML — not merely zero `#page-body` blocks, but zero whole HTML files.**

A naive "files changed" count would report 115 and hide the truth. Impact MUST be reported at five distinct levels:

| Level | Definition | Expected after 041 |
|---|---|---|
| **L1 — source-module change** | a file under `src/**` whose text changes | **6**: `nav.config.js` · `pages/teachers.js` · `components/teacher-actions.js` · `locales/ar.trn.js` · `locales/en.trn.js` (D-1, five files) **+** `enhance.js` (D-3, one line) |
| **L2 — generated shared-asset change** | a git-tracked file under `public/assets/**` whose content changes because an L1 file changed (mechanical `cpSync`) | **6 mirrors**: `assets/js/enhance.js` (**fetched by 114 pages**) · `assets/locales/ar.trn.js` · `assets/locales/en.trn.js` (fetched via `i18n.js`) · `assets/js/nav.config.js` · `assets/js/pages/teachers.js` · `assets/js/components/teacher-actions.js` (**shipped but never fetched** — build-time modules; their output is *baked*). **`assets/app.css` MUST NOT appear** — a changed CSS md5 means a new utility class entered `teachers.js`, i.e. a design change smuggled into a route freeze ⇒ **STOP.** |
| **L3 — sidebar markup change** | an admin page whose `.nav-panel` markup differs | **64** admin files: the `addTeacher` / `teacherCategories` `href`s gain a fragment. `#page-body` **byte-identical** on 62 of them |
| **L4 — page-body change** | a page whose `#page-body` md5 differs | **EXACTLY 2** — `teachers.html` and `teachers.en.html`. **A third differing body is a defect in the fix, not in the baseline: HALT.** D-3 contributes **ZERO** L4 changes. |
| **L5 — whole-file change** | a `public/*.html` file whose bytes differ | **EXACTLY 64** — the 64 admin files (2 × L3+L4, 62 × L3-only). The **51 non-admin files** (50 portal + `index.html`) are **BYTE-IDENTICAL AS WHOLE FILES**, despite 50 of them loading the L2-changed asset: the `<script src>` is a fixed literal, so a change to the asset's *content* cannot perturb one byte of any page. |

**The single most important sentence here: L2 ≠ L5.** The shared asset changes content for the 114 pages that load
it, and **not one of those pages' bytes changes as a result.** Conflating the two produces the false claim "115 pages
changed"; separating them produces the true claim **"64 HTML files changed, 2 bodies changed."**

**Method (binding, FR-025):** non-destructive **only** — `git show 21502af:<path>` or a detached
`git worktree add --detach`. **NEVER** `git stash` / `git reset --hard` / `git checkout -- <path>` / `git clean` /
a branch switch. `#page-body` extracted with
`sed -n '/<div[^>]*id="page-body"/,/<\/div><!-- \/page-body -->/p'` and md5'd against the committed baseline; the
pre-edit worktree capture must equal the `git show` capture before any edit (double-capture agreement).

---

## 12. Count invariants (asserted before and after; identical except the declared re-classification)

| Invariant | Value | Sites |
|---|---:|---|
| `public/*.html` | **115** | `smoke:2583` (`pub.length === 115`) — byte-verbatim |
| `PAGES` in `build-html.mjs` | **57** | build-html 0-diff |
| admin files / portal files / index | **64 / 50 / 1** | shell partition |
| admin bases / portal bases | **32 / 25** | 32 + 25 = 57 |
| rail categories | **6** | `nav010.railCats === 6` |
| admin menu items | **50** | `navCount32 === 50` + 4 further sites + the SOURCE audit `allItems.length === 50` |
| implemented / planned / disabled | **49 / 0 / 1** | zero-census + SOURCE audit |
| deep-link / plain / route-less | **24 / 25 / 1** | the ONE declared re-classification (§7) |
| `FUTURE_ROUTES` | **`{}`** | SOURCE audit (`Object.keys(fr).length === 0`) |
| `[data-coming-soon]` | **0** | sitewide census |
| honest locks | **1** — `classSalaryReport` | 5 sites (P-24/25/26/27/34) |
| orphan set | exactly `{gallery.html, gallery.en.html}` | T-05 |
| `finance-analysis` | **ABSENT** | source + all 115 pages |
| shared destinations | **1** — S-1 only | T-06 |

---

## 13. Risks

| # | Risk | Mitigation |
|---|---|---|
| **R1** | **Duplicate ids** if any residual add-form markup survives in both a template and a tab panel | The MOVE is total: `teacherAddDrawer()` / `categoriesDrawer()` are no longer *rendered* on any page. Assert `template[data-preview="trn-add"]` and `template[data-preview="trn-categories"]` = **0** on `teachers.html`/`.en`, and `document.querySelectorAll('[id^="f-trnAdd-"]')` has **no duplicate id** with the sheet open. |
| **R2** | A third `#page-body` drifts (a shared component nudged) | L4 allowlist = exactly 2; the md5 diff is computed **before commit**; a third line ⇒ **HALT**. |
| **R3** | A same-page anchor to `teachers.html#view=add` gets introduced "for convenience" | Forbidden by F-3 (no `hashchange` listener) — it would do nothing. Guard: assert `teachers.html` body contains **no** in-body anchor whose `href` targets its own file with a `#view=` fragment. |
| **R4** | Locale key collision (`trn.tab.*` is already taken by `teacher.html`'s profile tabs **and** by a field label in `teacherFields()`) | New keys go in a **fresh nested block** (`trn.list.tab.*`); locale parity asserted at **0 divergence** — the exact hazard Spec 036 hit and fixed by renaming `trn.kpi` → `trn.sessKpi`. |
| **R5** | D-3's test proves nothing because it clicked the **Customization** language control | §4.4 trap: the test **must** open `[data-action="lang-menu"]` and click **that menu's** `[data-set-lang]`. Mutation proof: revert `+ location.hash` ⇒ the test must go RED. |
| **R6** | The `enhance.js` wall exception widens during implementation | The exception is **one expression in `langUrl()`**. Any other `enhance.js` hunk ⇒ **HALT**. `git diff -- src/js/enhance.js` must show exactly one changed line. |
| **R7** | Teacher pay/salary/credential creep into the moved form | The moved form is the **same field body**, unchanged: **13** `field()` controls + the CV **GATE** (emitted inside `teacherFields()`) + one Save gate. `PAY28` / `payHit` / no-`type=file` / no-`type=password` asserts stay **byte-verbatim**. **NB — a coverage hole the MOVE opens, and how it is closed:** `PAY28` greps `#page-body.innerText`, and `innerText` **excludes `[hidden]` subtrees**, so the two new panels' text is invisible to it while they are the inactive tabs. `PAY28` is **not** amended (it is protected); the hole is closed **additively** by a panel-scoped `textContent` grep over **every** `[data-tabs="teachers"] [data-tabpanel]`, hidden included. Net effect: teacher pay-free coverage on `teachers.html` is **strictly larger** after 041 than before. |
| **R8** | The two new tabs acquire a second `filterBar` and break the single global `[data-no-results]` contract | `add` and `categories` are **form/list panels with no filterBar** — the constraint recorded by Specs 036/037. Assert exactly **one** `filterBar` on `teachers.html`. |
| **R9** | Counts silently drift via the route re-classification | 24 / 25 / 1 is declared here, in `count-and-freeze-contract.md` §5 and in the committed route-inventory contract; any other movement requires a full supersession. |
| **R10** | An implementation round re-opens D-1's option set | D-1 = **A (MOVE)**, D-2 = **A (orphan frozen)**, D-3 = **the one-line `langUrl` fix**. **DECIDED.** Rival option sets and rival counts are forbidden. |
| **R11** | Screenshot suite green ≠ pass (`capture.cjs:545` = `process.exit(0)`) | Console-error counts are **advisory**; the gates are smoke + a11y. Never report a green screenshot run as a pass signal. |

---

## 14. STOP conditions (any one fires ⇒ halt, do not commit)

1. `#page-body` md5 diff vs `21502af` ≠ **exactly 2** (`teachers.html`, `teachers.en.html`).
2. Any diff in a §10.2 wall file, **or** an `enhance.js` diff larger than the **one** declared `langUrl` line.
3. `public/*.html` ≠ 115 · `PAGES` ≠ 57 · `.nav-panel .nav-item` ≠ 50 on any admin page.
4. planned ≠ 0 · `[data-coming-soon]` ≠ 0 · locks ≠ 1 (`classSalaryReport`, never unlocked, never joined) ·
   `FUTURE_ROUTES` ≠ `{}` · `finance-analysis` invented anywhere.
5. Any new `data-*` hook · storage key · dependency · page · PAGES entry · component · locale module.
6. A **sixth** protected-test supersession (beyond S1–S5), or any protected assert **weakened**, or an edit to a
   protected line without the L-3 six artefacts + an inline declaration.
7. `type=password` · `type=file` · `<canvas>` · `.pdf` / `window.open` · credential input · authored secret ·
   fake-"Connected" · computed score/rank/money appears anywhere (all must stay **0**).
8. A teacher pay/salary/rate/currency field, a family currency figure, or a student «لوحة الطالب» / «بوابة الطالب»
   token appears on any changed page.
9. Duplicate element id anywhere on `teachers.html`/`.en` (with any drawer open) — the F-1 hazard.
10. AR/EN `trn.*` locale key-set divergence ≠ 0.
11. A destructive git operation used for impact proof (`stash` / `reset --hard` / `checkout --` / `clean` / branch
    switch).
12. Any commit or push by the implementing agent — **the watcher commits.** No `tasks.md` is written by this
    planning round.

---

## 15. Phase breakdown for `/speckit.tasks`

| Phase | Content | Gate to exit |
|---|---|---|
| **P0 — Preflight & baseline capture** | `git rev-parse --short HEAD` = `21502af` (or a committed successor); tree clean; `find public -maxdepth 1 -name '*.html' \| wc -l` = 115; `npm run build && test:smoke && test:a11y` green; **double-capture** the `#page-body` md5 of all 115 pages (`git show` **and** worktree) and prove they agree | baseline agreement = empty diff |
| **P1 — D-3 (isolated, first)** | the one-line `langUrl()` change (**W-1**) + the **T-10** topbar-scoped language-parity block (rows T1–T8: `#view=` pages, the `#step=` wizard, the `#child=` `:target` page, AR→EN **and** EN→AR, plus the hash-less control row) + its mutation proof (revert the term ⇒ T1–T7 RED, T8 GREEN) | `git diff -U0 -- src/js/enhance.js` = exactly **1** changed line pair, inside `langUrl()`; **0** `#page-body` diffs; **0** whole-HTML-file diffs; smoke green |
| **P2 — D-1 source** | `teacher-actions.js` field-body extraction (**W-2**: export `teacherFields`, repurpose `teacherAddDrawer`→`teacherAddPanel`, remove `addTeacherAction`) → `pages/teachers.js` 3-tab MOVE (directory verbatim / add / categories; `categoriesDrawer`→`categoriesPanel`) → `ar.trn.js` + `en.trn.js` 3 mirrored `trn.list.tab.*` labels → `nav.config.js` 2 route strings + 2 stale comments | build green; locale parity 0 divergence; **no duplicate id** (incl. with `trn-edit` open); exactly one `filterBar` + one `[data-no-results]` on the page; 0 `trn-add`/`trn-categories` template or trigger left |
| **P3 — Impact proof** | rebuild; `#page-body` md5 diff vs `21502af` = **exactly 2**; whole-file HTML diff = **exactly 64**; sidebar spot-check on `dashboard.html` (only the 2 D-1 nav rows differ inside `.nav-panel`); `git diff --stat -- src` = exactly the 6 allowlisted modules; `git diff --name-only -- public/assets` = exactly the 6 mirrors **with `app.css` ABSENT**; `package.json` / `build-html.mjs` / `i18n.js` / `sidebar.js` / `tabs.js` / `preview-drawer.js` / `form-field.js` / `components/ui.js` 0-diff | the L1–L5 taxonomy table reproduced with real numbers; `index.html` proven unchanged by **whole-file** md5 (its `#page-body` extraction is empty — a vacuous hash) |
| **P4 — Protected-test supersessions** | S1 · S2 · S3 · S4 · S5, each with old/new code, evidence, reason, byte-verbatim neighbours, mutation proof, and an inline declaration comment. **Plus the compensator for the induced skip:** after S1, the `:1358-1375` behavioural drawer loop silently skips `teachers` (its only remaining trigger, `trn-edit`, lives inside the kebab popover ⇒ `offsetParent === null`) — this MUST be compensated by the additive tab-panel behavioural proof, or coverage is lost under cover of a structural edit | every other protected assert proven byte-verbatim (diff the suite, line by line) |
| **P5 — Additive coverage** | T-01 (derived, **group-aware**, seeded matrix — all **24**) · T-02 (fragment resolution) · T-03 (50-row href register + the **committed** route-inventory contract) · T-04 (AR/EN parity rule) · T-05 (orphan set) · T-06 (repeated-destination census, S-1 the sole sanctioned repeat) · T-07 (group-aware fragment-ownership guard — **not** a one-widget-per-page rule) · T-08 (matrix floor) · **T-09** (the `run.cjs:2580` comment correction + the FR-021 vacuity note) · **T-10** (the D-3 topbar block) | every new assert ships a mutation proof (RED → restore → GREEN); the three **Pass-A→Pass-B flips** (M-1b, M-12, M-13) are recorded side by side — a flip that does not occur means the block was not delivered |
| **P6 — a11y / screenshots / locale** | **relocate** the 2 drawer-opening a11y rows (`:215`, `:293`) and the 6 drawer-opening screenshot frames (`:226`, `:290`, `:291`, `:294`, `:367`, `:368`) from `open`/`openDrawer` → `hash`/`view` (§10.3 — otherwise they silently audit the wrong surface); then +1 a11y row + 1 frame for `settingsUsers` (E-10 floor); ≥2 a11y rows + ≥2 frames each for `teachers#view=add` and `#view=categories` (AR/EN × light/dark, incl. mobile-390) + the roving-tabindex keyboard rows | a11y **critical = 0** (the hard gate, `a11y:375`) **and serious = 0** (the accepted ship state; reported, not itself the exit gate); screenshots captured with 0 console errors (**advisory**, not a gate — `capture:545` always exits 0) |
| **P7 — Docs & freeze** | `CLAUDE.md` (HEAD `21502af`, 039+040 committed, frozen counts, 041 redefinition, corrected probe chain) · `page-reachability-register.md` D-2 owner + entry path · the committed route-inventory contract · `implementation-status.md` | every count in §12 asserted and green; STOP list (§14) all clear |
| **P8 — Handover** | **No commit, no push** — the watcher commits. Report the L1–L5 impact taxonomy, the 5 supersessions, the 1 wall exception, and the frozen counts | — |

---

## 16. Artifact & contract index

**Committed specification artifacts (this directory) — the authority this plan reconciles with:**

| File | Role in this plan |
|---|---|
| `spec.md` | the governing spec (FR-000…FR-027, SC-01…SC-24, D-1/D-2, S-1, E-01…E-13, Q-1…Q-9) |
| `count-and-freeze-contract.md` | C-01…C-35 frozen counts; §5 D-1 route-freeze carve-out; §8 supersession law |
| `current-route-inventory.md` | the as-built 50-item route table at `21502af` |
| `sidebar-item-register.md` | the 50 items, per-item evidence |
| `deep-link-register.md` | the `#view=` routes + the `file → group → baked default` map |
| `honest-lock-register.md` | the single `classSalaryReport` lock, 5 assert sites |
| `page-reachability-register.md` | reachability classes; **§§4–7 = D-2's home** (owner + entry path) |
| `ar-en-route-parity-register.md` | the AR/EN parity rule (T-04) |
| `role-route-permission-matrix.md` | cross-role isolation (audit, **not** authorization — Spec 043) |
| `protected-test-register.md` | P-01…P-37 protected set; the supersession law (L-1…L-6); T-01…T-10 |
| `mutation-test-register.md` | the RED/GREEN proof obligations |
| `impact-boundary.md` | the option-priced blast radius (§2) + the non-destructive method (§3) + STOP (§5) |
| `visual-sidebar-freeze-register.md` · `targeted-visual-grounding.md` | the frozen visual/nav frames and the a11y/screenshot matrices |
| `carry-forward-register.md` | CF-1…CF-5 (CF-1 owner **decided: 044**) |
| `checklists/requirements.md` | the requirements checklist |

**Plan-round contracts — these are the ACTUAL filenames on disk, all at this spec's root (there is **no**
`contracts/` subdirectory; the only subdirectory is `checklists/`). `/speckit.tasks` binds tasks to their content:**

| Contract (real path) | Contents |
|---|---|
| `d1-teacher-route-contract.md` | the MOVE architecture: 3 tabs, group `teachers`, the disposition table, the F-1/F-2/F-3 proof, D1-L1…L4 / D1-M1…M8 / D1-P1…P4, the duplicate-id + single-`filterBar` guards, the STOP list. **Owns the `teacher-actions.js` symbol disposition.** |
| `d3-language-hash-contract.md` | the one-line `langUrl()` supersession, the `location.search` non-adoption, the topbar-scoping trap, rows T1–T8 + assertions A1–A9, mutations M-D3-1…4 |
| `d2-gallery-orphan-contract.md` | the frozen orphan set + owner (frontend/design-system maintainer) + entry path |
| `route-inventory-contract.md` | the **committed** 50-row `id → category → status → route → file → fragment → dest → group` table (FR-009 / Q-9) |
| `derived-route-matrix-contract.md` | the derived, **group-aware**, stored-view-seeded matrix; `TAB_GROUP_REGISTRY`; detectors **X-1…X-9** |
| `deep-link-discrimination-contract.md` | the C1–C4 claim set, the 9-seeded/13-unseeded audit, the derived seed rule, DL-1…DL-5 |
| `protected-test-contract.md` | S1–S5, each with the L-3 six artefacts; the byte-verbatim neighbour list; the additive blocks **A-1…A-7** (⇔ T-01…T-10, mapped there); the induced a11y/screenshot relocations |
| `impact-protection-contract.md` | the 5-level impact taxonomy (with the grounded `assets/js/enhance.js` correction), the 0-diff wall + the two declared supersessions **W-1** / **W-2**, the non-destructive method, STOP-1…STOP-12 |
| `mutation-execution-contract.md` | the 12 mutations (M-1a…M-13), Pass A vs Pass B, the normative `[contract]` failure messages, the execution law |
| `count-freeze-contract.md` | the post-decision count ledger (the arithmetic of the 22→24 / 27→25 re-classification) |
| `ar-en-parity-contract.md` | P1 (sidebar, already correct, 0-diff) vs P2 (topbar, defective, D-3) — the two-contract split |
| `a11y-screenshot-contract.md` | the E-10 floor, the new/relocated a11y rows + screenshot frames, the keyboard/roving-tabindex rows |
| `role-isolation-contract.md` | the 0/0 link-graph isolation freeze + "hiding a nav link is not authorization" |
| `documentation-reconciliation-contract.md` | FR-019…FR-023: the `CLAUDE.md` refresh, the FR-020/021/022 documentation corrections, the copy-sweep owner record |
| `scope-guard.md` | the allowlist / forbidden-list / grep register the implement round may not cross |
| `research.md` · `quickstart.md` | the decision record (R-01…R-26) and the implementation/verification workflow |

*(If an implementation round renames a contract, it records the rename here. Tasks bind to contract **content**, not
to a filename.)*

---

## 17. Decisions ledger (closed — do not re-open)

| Q | Decision |
|---|---|
| **Q-1** D-1 option | **A — the MOVE** (tabs `directory`/`add`/`categories`; drawers `trn-add` + `trn-categories` removed from the page; header buttons removed). B (drawer-hash router) = new URL-state mechanism → **044** + wall breach. C = dishonest by omission (locking a working surface). D = zero-deletion breach. E = count-freeze breach (115→117). F = "declare it and move on" — *a declaration does not make a destination honest*. G = relabel-only — weaker than A at the same blast radius. |
| **Q-2** D-1 impact | 2 bodies · 62 sidebar-only · 51 non-admin bodies byte-identical — proven **non-destructively**, **before** implementation (§11, P3). |
| **Q-3** D-2 option | **A — orphan frozen**; owner = frontend/design-system maintainer; entry path = direct URL only, by design; a NEW orphan fails. |
| **Q-4** copy sweep owner | **Spec 044** (the string is `formDrawer()`'s default `reasonKey` in `preview-drawer.js` → FO-23). Not swept in 041. |
| **Q-5** derive the matrix from `NAV_CATEGORIES` in `run.cjs` | **Yes** — via the existing `import('../../src/js/nav.config.js')` pattern already used by the SOURCE audit. **No new dependency.** |
| **Q-6** E-04 guard | **Group-aware matrix** (each deep-link records its owning `[data-tabs]` group; assertions scope to that group). **No permanent one-tabs-widget-per-page rule.** |
| **Q-7** E-10 floor | **≥2 a11y rows + ≥2 frames per deep-linked view.** Only `settingsUsers` needs **+1 row and +1 frame**; the matrix is **not** multiplied. |
| **Q-8** FR-020 / FR-021 | **Documentation corrections**, not supersessions. |
| **Q-9** route-inventory contract | **Yes** — committed, checked-in, **in addition** to the source-derived assertions. |
| **O-1 → D-3** | **Promoted and fixed here** — it is a route/deep-link parity defect inside the route freeze, not an interaction-system concern (§4.2). |
