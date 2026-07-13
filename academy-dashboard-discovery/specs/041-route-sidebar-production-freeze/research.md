# Research — Spec 041 (Full Frontend Route & Sidebar Production Freeze)

> **Round**: `/speckit.plan`. **Baseline**: branch `feature/012-role-portal-foundation` · HEAD **`21502af`** (Spec 040
> committed; PR #13 merged; main merge `13d38af`; both on `origin/main`; ahead=0 behind=0; tree clean except the 041
> artifacts + `.specify/feature.json`).
> **Purpose**: record every planning decision with **Decision / Rationale / Alternatives rejected / Evidence**. Nothing
> here is invented: every number, line and identifier below was read live at `21502af` or cited from one of the 16
> committed 041 specify artifacts.
> **Boundary**: 041 is a route/sidebar FREEZE + three defect fixes (**D-1**, **D-2**, **D-3**). It is not a redesign, a
> feature, a form expansion, or an integration. Standing laws bind: teacher pay-free (global) · family zero-pay ·
> student child-view · finance no-fake-money · settings no-fake · no secrets · no credential inputs · no `type=password`
> · no `type=file` · no `<canvas>`/PDF/`window.open` · no computed rank/score/money · no fake save/success/connected/
> mutation · no backend/API · closed `data-*` hook set (no new hook, no new storage key, no new dependency).
> **Roadmap provenance (binding caveat, repeated wherever a spec number appears below)**: the committed corpus charters
> only **041**. **042–057 are maintainer-directed, append-only amendment slots, not chartered specs.** Any assignment
> made here binds whichever spec is chartered into the named slot.

**Decision index**

| # | Decision | Kind |
|---|---|---|
| R-01 | Promote **O-1 → D-3** (topbar language switch destroys the fragment); it is BLOCKING and 041 fixes it | scope |
| R-02 | The **one-line `langUrl()` fix**: `+ location.hash` | fix |
| R-03 | Reject a `hashchange` listener | rejected alternative |
| R-04 | Reject a URL router / general deep-link surface | rejected alternative |
| R-05 | Reject preserving `location.search`; record the drop explicitly | rejected alternative |
| R-06 | `sidebar.js` `langRoute()` stays **0-diff** — route parity is **two** contracts, not one | contract split |
| R-07 | The D-3 test MUST be scoped to the **topbar** `[data-set-lang]` (the settings-page trap) | test design |
| R-08 | **D-1 = Option A**, and Option A has exactly **one** compliant shape: **MOVE** | architecture |
| R-09 | **A2 (tab + drawer) is structurally forbidden** — duplicate `id="f-…"` on template clone | forbidden |
| R-10 | **A3 (tab holding an open-form button) is forbidden** — the direct-surface law | forbidden |
| R-11 | **Both header buttons are removed**; the TABLIST is the affordance | architecture |
| R-12 | `trn-edit` **stays a drawer** on `teachers.html` and `teacher.html` | preservation |
| R-13 | **`components/teacher-actions.js` is in the impact allowlist** (wall supersession **W-2**): export `teacherFields`, **repurpose** `teacherAddDrawer`→`teacherAddPanel`, **remove** `addTeacherAction` — zero-deletion at the *capability* level | allowlist |
| R-14 | Routes after D-1; route split **24 deep + 25 plain + 1 route-less = 50** (a re-classification, not a count change) | counts |
| R-15 | The **5 protected-test supersessions (S1–S5)** — each a RELOCATION, none a weakening | supersession |
| R-16 | **D-2 = Option A** — gallery documented, owned, frozen as the exact orphan set | fix |
| R-17 | **Copy sweep owner = 044** (`formDrawer()` default `reasonKey`); not swept in 041 | ownership |
| R-18 | **E-04**: the derived deep-link matrix is **group-aware**; no "one tabs widget per page" rule | test design |
| R-19 | **E-10**: minimal additive matrix rows — `settingsUsers` +1 a11y row, +1 frame; nothing else multiplied | test design |
| R-20 | **FR-020 / FR-021 are documentation corrections**, not protected-assert supersessions (answers Q-8) | classification |
| R-21 | **FR-009 / Q-9**: ship a **committed exact route-inventory contract** alongside the source-derived assertions | contract |
| R-22 | FR-013 derived matrix imports `nav.config.js` via the **existing** `import()` pattern — no new dependency (answers Q-5) | test design |
| R-23 | **S-1 survives D-1**: the T-06 census tolerates **exactly one** repeated `{file, view}` destination and asserts it is the only one — never a *naive* uniqueness assert | preservation |
| R-24 | The impact proof classifies **five distinct change layers**; `#page-body` diff must show **exactly two** | method |
| R-25 | `src/js/enhance.js` takes **exactly ONE** declared narrow supersession — one line, `langUrl()` (D-3). (The wall's *other* declared release is **W-2**, `teacher-actions.js` — R-13. No third.) | wall |
| R-26 | Locale: **3** mirrored **`trn.list.tab.*`** labels (NOT `trn.tab.*` — collision); `i18n.js` **0-diff** | locale |

---

## R-01 — Promote O-1 to **D-3** (a BLOCKING defect fixed by 041), reject deferral to 044

**Decision.** The observation logged in `deep-link-register.md` §8 as **O-1** is **promoted to defect D-3** and is fixed
inside Spec 041. Its recommended-owner note ("Spec 044 … 057 as fallback") is **superseded by this plan**.

**Rationale.**
1. **It is a route defect, and routes are exactly what 041 freezes.** 041's headline product is the **22 (→24)
   deep-links** and the promise that a `#view=` route "resolves to the surface its label names" (spec.md §5 P2, SC-08,
   SC-10). D-3 means that promise **survives only until the user touches the language toggle**. Freezing a deep-link
   contract while shipping a control that silently voids it would make the freeze itself dishonest — the same reasoning
   by which spec.md §7 rejected D-1 Option F: *"A declaration does not make a destination honest."*
2. **It defeats FR-015 (AR/EN route parity) in practice.** FR-015 asserts every AR nav route has the exact `.en` twin
   *with the hash preserved*. `sidebar.js` `langRoute()` honours that. The **topbar** toggle — the control an actual
   bilingual user reaches for — does not. Parity that holds only in the markup and breaks on the click is not parity.
3. **The blast radius is one line inside a function that has exactly one caller** (`enhance.js:553`). It is smaller than
   the D-1 fix 041 is already taking, and it touches no hook, no key, no dependency, no page body.
4. **Deferring it is not free.** 044 (the modal/drawer/long-form interaction slot) is a **maintainer-amendment slot,
   not a chartered spec**; assigning a live, reproduced, user-visible route bug to an unchartered slot means shipping a
   "production freeze" that knowingly contains a broken route. E-08's binding precedent applies by analogy: *"A test may
   never be the reason a product lies"* — nor may a roadmap slot.

**Alternatives rejected.**

| Alt | Why rejected |
|---|---|
| Defer to **044** (the register's original recommendation) | 044 owns the **modal/drawer interaction system**; `langUrl()` is a **route/lang** helper, not a drawer mechanism. The topic fit is wrong, and the defect is a live route lie inside 041's own frozen surface. |
| Defer to **057** (final parity freeze) | 057 *re-verifies* parity; it should not be the first spec to *create* it. Shipping 041 with a known parity break would hand 057 a regression to fix rather than a freeze to confirm. |
| Record it and move on (the O-1 status quo) | Rejected for the same reason spec.md rejected D-1 Option F: **recording ≠ closing**. |

**Evidence.**
* `src/js/enhance.js:237-241` — `langUrl()` reads `location.pathname` only; **`location.hash` never appears**.
* `src/js/enhance.js:553` — `if (lg) { const l = lg.getAttribute('data-set-lang'); closeMenu(); if (l !== getLang()) location.href = langUrl(l); return; }` — the sole call site.
* **Live reproduction** (headless Chromium, correct MIME types): `finance.html#view=banks` → topbar EN → `finance.en.html`, **hash gone**, visible tab reverts to the baked default `overview`. Confirmed.
* `deep-link-register.md:264-276` — the original O-1 record with the same evidence.
* Contrast, live: `components/sidebar.js` `langRoute()` (Spec 035, hash-aware) preserves the fragment → the sidebar's AR/EN parity is **0 failures** today.

---

## R-02 — The fix: **one line** in `langUrl()`

**Decision.** Adopt the narrow supersession:

```js
function langUrl(lang) {
  const file = (location.pathname.split('/').pop() || 'dashboard.html');
  const base = file.replace('.en.html', '').replace('.html', '') || 'dashboard';
  return (lang === 'en' ? `${base}.en.html` : `${base}.html`) + location.hash;   // ← the whole fix
}
```

**Rationale.**
* It preserves **`#view=`** (all 24 deep-links) **and** the pre-existing **`#step=`** wizard fragment (`add-family.html`),
  because it copies the fragment verbatim rather than re-deriving it — no fragment grammar is hard-coded, so a future
  fragment kind is covered for free.
* On the target page, `initTabs()` already implements the required precedence **hash → stored → baked default**
  (`enhance.js:260-272`). Carrying the hash across the language switch therefore needs **no** new runtime behaviour: the
  existing engine does the rest. This is why the fix is one line and not a feature.
* Zero new hook, zero new storage key, zero new dependency, zero new dispatch path. `sidebar.js` untouched. No page body
  changes (`enhance.js` is a shared asset — see **R-24**).
* When there is no fragment, `location.hash` is `''` and the returned string is **byte-identical to today's** → the
  no-hash path is a provable no-op.

**Alternatives rejected**: see **R-03**, **R-04**, **R-05**.

**Evidence.** `enhance.js:242-273` (`selectTab` + `initTabs`, precedence hash → stored → baked); `enhance.js:237-241`
(the current helper); `enhance.js:553` (call site); the `#step=` wizard fragment handled by the same delegated listener
(`enhance.js:559-…`, `data-step-go`).

---

## R-03 — Rejected: add a `hashchange` listener to `enhance.js`

**Decision.** **Do not** add a `hashchange` listener.

**Rationale.**
1. **It does not fix D-3.** The language switch is a **full document navigation** (`location.href = …`). The old
   document is discarded; a `hashchange` handler in it never runs, and the new document's `initTabs()` already reads the
   hash on load. The bug is that the hash is **never written into the new URL** — a listener on the *old* page cannot
   change that.
2. **It is a strictly larger behaviour change** than the defect requires: it would make same-page hash mutation
   (back/forward, in-page anchors, `history.replaceState` from `selectTab`) drive tab switching — a **new interaction
   contract** for every `[data-tabs]` page, and one that would interact with `selectTab`'s own `replaceState` write
   (`enhance.js:257`) in ways nothing today depends on.
3. It is squarely an interaction-system change → the 044 slot — and 041 must not trespass there (spec.md §11).

**Consequence recorded (not a defect, a documented behaviour).** Because there is **no** `hashchange` listener, a
**same-page** anchor (e.g. `href="teachers.html#view=add"` clicked *from* `teachers.html`) changes the hash **without
reloading and without switching the tab**. This is the load-bearing fact behind **R-11**.

**Evidence.** `enhance.js:242-273` — `initTabs()` runs once in an IIFE on load; the file contains **no**
`addEventListener('hashchange', …)`. `enhance.js:553` — the language switch is `location.href = …` (navigation, not a
hash mutation).

---

## R-04 — Rejected: a client-side router / general `#drawer=` deep-link surface

**Decision.** **Do not** introduce any URL-state mechanism beyond the existing `#view=` (tabs) and `#step=` (wizard).

**Rationale.**
* A router is a **new URL-state hook** — barred by the closed `data-*`/URL-state contract and by spec.md §11 ("no new
  hook, new `data-*` attribute, new storage key, new dependency, new engine").
* It is also the *rejected* **D-1 Option B** (`#drawer=trn-add`): `impact-boundary.md` §2 scores it as a **0-diff-wall
  breach** plus an interaction-system change owned by the 044 slot, and notes it "opens a general-purpose deep-link
  surface that no other item uses". Adopting Option A (R-08) removes the only motivation anyone had for it.
* D-3 needs none of it: the fragment already means something on arrival; it merely has to survive the hop.

**Evidence.** `spec.md` §7 D-1 Option B; `impact-boundary.md` §2 "Option B — a drawer-hash router … BREACHES THE 0-DIFF
WALL"; `spec.md` §11 (out of scope).

---

## R-05 — Rejected: also preserving `location.search`; the drop is recorded, not silent

**Decision.** The fix is **hash-only**. `location.search` continues to be dropped. This is **recorded here explicitly**
rather than left as an implicit side effect.

**Rationale.**
* The **current** helper already drops the query string — it is built from `location.pathname` alone. Preserving
  `search` would therefore be a **behaviour change beyond the defect**, not a restoration.
* The product is **static, GitHub-Pages-hosted, fixtures-only, with no server** and uses **no query strings** anywhere:
  there is no code that reads `location.search`, no link that emits one, and no state that could be carried in one.
  Adding `+ location.search` would be dead code that invents a contract 041 would then have to freeze.
* The freeze's own rule is minimality: *fix the defect, change nothing else.* Two behaviours, one line, is one behaviour
  too many.

**Recorded consequence (binding).** If a future spec introduces query-string state, **it must revisit `langUrl()`**;
041 asserts nothing about `search` and grants no permission to rely on it being carried.

**Evidence.** `enhance.js:237-241` (pathname-only, today); repository-wide: no `location.search` reader in `src/js/`.

---

## R-06 — Route parity is **two** contracts, not one

**Decision.** Split the parity requirement into two named, separately-asserted contracts:

| Contract | Mechanism | Status today | 041 |
|---|---|---|---|
| **P-A — sidebar route parity** | `components/sidebar.js` `langRoute()` (hash-aware since Spec 035) | ✅ **CORRECT** — 0 failures | **freeze, 0-diff** |
| **P-B — topbar language-switch parity** | `enhance.js` `langUrl()` (`enhance.js:237-241`, called at `:553`) | ❌ **DEFECTIVE** — fragment destroyed | **fixed by D-3** |

**Rationale.** The two mechanisms are independent code paths reached by different controls. Merging them into a single
"AR/EN parity is green" claim is precisely how D-3 hid for six specs: FR-015's markup-level parity was, and remains,
green while the user-facing toggle broke the route. The artifacts, the plan and the suite must therefore never state
"route parity" without saying **which** contract.

**Evidence.** `sidebar.js` `langRoute()` (Spec 035, hash-aware); `deep-link-register.md` §3 (0 parity failures — that
figure is a **P-A** figure); `enhance.js:237-241`/`:553` (**P-B**); live repro under R-01.

---

## R-07 — The D-3 test must be **scoped to the topbar menu** (the settings-page trap)

**Decision.** Every D-3 assertion must (1) open the topbar language menu via `[data-action="lang-menu"]`, then (2) click
the `[data-set-lang]` **inside that menu**. An unscoped `page.click('[data-set-lang]')` is **forbidden** in the suite.

**Rationale.** Found live: **`settings.html` renders TWO `[data-set-lang]` elements** — the topbar language menu *and*
the Customization tab's **real** language control (the `settingsSection` appearance block, a genuine Spec-031 feature).
An unscoped selector can bind to the Customization control, exercise the wrong code path, and pass while proving
nothing about `langUrl()`. A vacuous green here would be worse than no test, because the whole point of D-3's test is to
prove that the **topbar** path carries the hash.

**Consequence.** The regression test is at minimum: seed a conflicting stored view → load `<page>.html#view=<X>` →
assert tab `X` visible → open the topbar lang menu → click EN → assert URL is `<page>.en.html#view=<X>` **and** the
visible `[data-tabpanel]` is still `X`. Run it on at least one page from each tab family (finance and settings — the two
pages where the trap and the deep-link density both live).

**Evidence.** Live DOM probe at `21502af`: `settings.html` → `document.querySelectorAll('[data-set-lang]').length === 2`.
Topbar control: `components/topbar.js` (`[data-action="lang-menu"]`); real control: `components/settings-section.js`
appearance block (a wall file — **not** modified by 041).

---

## R-08 — **D-1 = Option A**, and Option A has exactly ONE compliant shape: **MOVE**

**Decision.** `teachers.html` gains a tab group `tabs({ group: 'teachers', … })` with **three** tabs:

| Tab id | Content | Provenance |
|---|---|---|
| `directory` | the **current body verbatim** — `summaryCards` + `filterBar` + `cardGrid#teachers-grid` + `noResults()` + the per-teacher preview drawers + `trn-edit` | unchanged; the **baked first / default** tab |
| `add` | the **real** add-teacher form: the same `teacherFields('trnAdd', true)` (**13** `field()` controls; the CV upload **GATE** is emitted inside it) + **one** primary `backendRequired` Save | **MOVED** out of the `trn-add` drawer |
| `categories` | the **real** categories surface: the category list + the inline create form (name/status/description) + the assign **gate** + **one** primary Save **gate** | **MOVED** out of the `trn-categories` drawer |

The `trn-add` and `trn-categories` **drawers are removed from `teachers.html`**. This is **extract-and-reuse, never
duplicate**.

**Rationale.** Option A is already the adopted option (`spec.md` §7 recommendation; `impact-boundary.md` §2). What this
round settles is *which shape of Option A is legal* — and only one is:

* **A1 "MOVE"** (adopted) — the form content lives in the tab panel; the drawer is gone.
* **A2 "tab + drawer"** — structurally **forbidden**, see **R-09**.
* **A3 "tab holds an Open-form button"** — **forbidden** by the direct-surface law, see **R-10**.

Option A is also the *only* option that satisfies every frozen invariant simultaneously: it holds 115 / 57 / 64 / 50 /
0 planned / 1 lock / `FUTURE_ROUTES {}` / 0 new hook / 0 new key / 0 new dependency, and it uses the **exact** mechanism
promoted items have used since Spec 035 (22 existing `#view=` deep-links).

**Spec-032's law is still satisfied — more directly.** "Every Add/Create/New/Edit opens a REAL form UI with visible
grounded fields FIRST; only the final Save is a `backendRequired` gate." Under A1 the fields are visible on **arrival**
at the route, with **zero** clicks. The gate stays the gate.

**Alternatives rejected (canonical closed set A–G, per `spec.md` §7 / `impact-boundary.md` §2 — no rival set is created
here).** B (drawer-hash router → wall breach + 044) · C (demote to locks → dishonest by omission; also breaks the
exactly-one-lock law) · D (delete → zero-deletion violation; menu 50 → 48) · E (standalone `add-teacher.html` → count
115 → 117; form completeness is the 056 slot) · F (record as an exception → *recording ≠ closing*; it is Spec 036's
fold-anchor declaration repeated) · G (relabel only → same 64-file blast radius as A with less honesty; silently retires
two legacy capabilities).

**Evidence.**
* `src/js/nav.config.js:54-56` — three items, one byte-identical route `'teachers.html'`, **no hash**.
* `src/js/pages/teachers.js:105-112` — `pageHeader({ secondary: button(… data-drawer="trn-categories"), primary: addTeacherAction() })` + `filterBar` + `cardGrid('#teachers-grid')` + `noResults()` + `categoriesDrawer()` + `teacherEditDrawer()` + `teacherAddDrawer()`.
* `src/js/components/teacher-actions.js:28-33,45,66-72` — `addTeacherAction()` (a `data-drawer="trn-add"` button), `teacherFields(p, withGeo)`, `teacherAddDrawer()` = `formDrawer('trn-add', { fields: teacherFields('trnAdd', true) })`, `teacherEditDrawer()` = `formDrawer('trn-edit', …)`.
* `src/js/pages/teachers.js:68-70` — `categoriesDrawer()` builds `<template data-preview="trn-categories">` (list + real create form + assign gate + one Save gate).
* `src/js/components/tabs.js:16-35` — `tabs({group, items, panels})` emits `[data-tabs]` / `[data-tab]` / `[data-tabpanel]`, first item active, others `hidden`.
* Legacy grounding (`spec.md` §7): `/management/teachers` · `/management/teachers/create` (a dedicated creation form page) · `/management/teacher-categories` (its own CRUD page) — three sidebar clicks, three screens. Today: three clicks, one screen.

---

## R-09 — **A2 (tab AND drawer both hold the form) is structurally forbidden**

**Decision.** Rendering the add-teacher (or categories) form in **both** a tab panel and the `trn-add` /
`trn-categories` `<template>` is **forbidden**. It is not a style preference; it is a defect.

**Rationale — the id collision is mechanical.**
1. `field()` emits a **deterministic** `id="f-<name>"` (`components/form-field.js:14-27`; the control's `id` is derived
   from the field name, e.g. `f-trnAdd-firstName`).
2. A `<template>`'s content is **inert while baked** — so the duplicate would be invisible to a static grep of the
   built HTML.
3. But `enhance.js` **CLONES** the template into the live sheet on open (`data-drawer` → `openSheet` →
   `template[data-preview]` clone — the closed Spec-032 path). At that moment the cloned `f-trnAdd-firstName` joins a
   document that **already** contains `f-trnAdd-firstName` in the visible tab panel.
4. Result: duplicate ids in the live DOM → `<label for>` resolves to the wrong control → **an a11y defect** (and a
   silent one: `critical=0 serious=0` is asserted against the *rendered* page, and the collision only exists *after* the
   drawer opens).

Duplication is also a **maintenance lie**: two definitions of the same form drift. The freeze's rule is one definition,
one destination.

**Therefore the only compliant shape is MOVE** — the form content relocates into the tab panel, and the drawer ceases
to exist on that page.

**Evidence.** `src/js/components/form-field.js:14-27` (id derivation); `src/js/components/preview-drawer.js:32-38`
(`formDrawer()` → `previewTemplate()` → `<template data-preview="…">`); `enhance.js` `openSheet` clone path (the closed
`data-drawer` dispatch, Spec 032); `pages/teachers.js:105,112` (both hosts would be baked on the same page).

---

## R-10 — **A3 (a tab whose panel holds only an "Open form" button) is forbidden** — the direct-surface law

**Decision.** A tab panel that contains merely a button which opens the drawer is **not** an acceptable D-1 fix.

**Rationale.** It reproduces the exact defect D-1 names. The complaint is not "the route lands on the wrong file"; it is
**"the label promises a form and the destination does not contain one — a second, undocumented click is required."**
A3 moves that second click from the page header into a tab panel and calls it fixed. The destination still does not
contain what the label names. `spec.md` §7 Option F's ruling applies verbatim: **a declaration does not make a
destination honest**, and *recording ≠ closing* (SC-18). SC-18's measure is that the destination **resolves to the
surface its label names** — a button is not a surface.

**Evidence.** `spec.md` §7 D-1 statement ("'Add Teacher' promises a form and delivers the directory"), Option F
rejection, and SC-18.

---

## R-11 — Both header buttons are **removed**; the TABLIST is the affordance

**Decision.** `pages/teachers.js:105` loses **both** `pageHeader` action slots: the `secondary`
(`data-drawer="trn-categories"`) button **and** the `primary` (`addTeacherAction()` → `data-drawer="trn-add"`) button.
They are not converted into anything. The **tablist** (three tabs) is the on-page affordance, and the **sidebar
deep-links land directly on the surface**.

**Rationale — both conversion paths are mechanically impossible, not merely undesirable.**

| Candidate conversion | Why it cannot work | Evidence |
|---|---|---|
| Header button becomes a **tab-selector** (`data-tab="add"` in the `pageHeader`) | `selectTab(group, id)` resolves the wrap first — `const wrap = document.querySelector('[data-tabs="<group>"]')` — and then **requires** `wrap.querySelector('[data-tab="<id>"]')`; if the button is not **inside** the `[data-tabs]` wrap, the delegated click handler's `tabBtn.closest('[data-tabs]')` returns `null` and the click is a **no-op**. `pageHeader` renders **above** the tabs wrap. | `enhance.js:245-247`; `enhance.js:557` (`const wrap = tabBtn.closest('[data-tabs]'); if (wrap) {…}`) |
| Header button becomes a **same-page anchor** (`href="teachers.html#view=add"`) | There is **no `hashchange` listener** (R-03). Clicked **from** `teachers.html`, the anchor mutates the hash **without a reload** → `initTabs()` (an on-load IIFE) never re-runs → **the tab does not switch**. It would be a dead-looking control that silently changes the URL. | `enhance.js:260-272` (`initTabs` IIFE); no `hashchange` handler in the file |

Removing them is therefore the only honest outcome, and it *loses nothing*: every affordance the buttons offered is
now reachable in **fewer** clicks (tab click, or a direct sidebar deep-link) and, unlike the buttons, is **addressable**
(`#view=add`, `#view=categories`) — which is the whole point of D-1.

---

## R-12 — `trn-edit` **stays a drawer** (both pages)

**Decision.** `teacherEditDrawer()` (`template data-preview="trn-edit"`) remains **exactly as it is** on
`teachers.html` (opened from the per-card kebab) **and** on `teacher.html` (opened alongside `trn-note`). No change.

**Rationale.** Edit is **row-scoped**, reached from a card's row-kebab — it has no nav item, no label promising a
surface, and therefore **no route lie to fix**. D-1 is a *route* defect; `trn-edit` is not on a route. Touching it would
be redesign, not repair — and would breach the "041 is not a form-expansion spec" boundary.

**Consequence for the registers.** `FORM_DRAWERS_032.teacher` (i.e. `teacher.html`) = `['trn-edit','trn-note']` is
**UNCHANGED**, and `FORM_DRAWERS_032.teachers` retains `'trn-edit'` (see S1 in **R-15**).

**Evidence.** `pages/teachers.js:111` + `pages/teacher.js:199` (`teacherEditDrawer() + teacherNoteDrawer()`);
`teacher-actions.js:66-67`.

---

## R-13 — `components/teacher-actions.js` **is in the impact allowlist**

**Decision.** The D-1 source allowlist is:

```
src/js/nav.config.js                    3 route strings (see R-14)
src/js/pages/teachers.js                body → tabs({group:'teachers'}); the two moved surfaces; header actions removed
src/js/components/teacher-actions.js    field-body EXTRACTION (one definition of the fields, reused by the tab panel)
src/locales/ar.trn.js · en.trn.js       3 mirrored tab labels (R-26)
src/js/enhance.js                       the ONE-LINE D-3 narrow supersession (R-02, R-25)
```

The plan must **not** pretend `pages/teachers.js` changes alone.

**Rationale.** `teacherFields(p, withGeo)` is **private to `teacher-actions.js`** (not exported). The tab panel needs
that exact field body — the same **13** controls, the same CV gate, the same single `backendRequired` Save — and there must
remain **exactly one definition** of it (R-09's corollary: one definition, or the two drift). Two ways to get it:

* **(a) Adopted — extract the field body into a shared builder** in `teacher-actions.js` (e.g. an exported panel-body
  builder that `pages/teachers.js` renders inside the `add` tab panel). `teacher-actions.js` therefore **changes**, and
  it must appear in the allowlist, the impact contract and the diff expectation.
* (b) Re-declare the fields in `pages/teachers.js` — **rejected**: duplicated field definitions, guaranteed drift,
  and it re-opens the id-collision surface if any drawer is ever re-added.

**Zero-deletion treatment of `teacherAddDrawer()` — DECIDED (not left as a choice).** Grounding shows
**`pages/teachers.js` is its only caller** (repo-wide grep: `teacherAddDrawer` appears at `teacher-actions.js:71` and
`pages/teachers.js:112`, nowhere else; `addTeacherAction` at `teacher-actions.js:28` and `pages/teachers.js:105`,
nowhere else). After D-1 neither is called. Two dispositions were available; **the plan selects REPURPOSED**, and
`d1-teacher-route-contract.md` §6 is the owning instrument:

| Disposition | Meaning | Verdict |
|---|---|---|
| RETAINED-BUT-UNUSED | `teacherAddDrawer()` / `addTeacherAction()` remain exported, byte-unchanged, called by nobody | **REJECTED.** A dead, still-callable `formDrawer('trn-add', …)` is a loaded gun: if anything ever calls it while the `add` panel exists, it re-creates the exact **`f-trnAdd-*` duplicate-id collision** (R-09) the MOVE exists to prevent. Dead exports whose only purpose is to be dead are not what L-5 protects. |
| **REPURPOSED** | `teacherFields(p, withGeo)` is **exported** as the single field-body builder; `teacherAddDrawer()` becomes **`teacherAddPanel()`** (emits the panel body, not a `<template>`); `addTeacherAction()` is **removed with its sole call site**; `categoriesDrawer()` (in `pages/teachers.js`) becomes **`categoriesPanel()`** | ✅ **ADOPTED** |

**Why this satisfies zero-deletion.** The law protects **capabilities**, not symbols or call sites: the add-teacher
form, its **13** fields, its CV gate and its single gated Save all **survive verbatim** — they simply live in a tab,
reachable in *fewer* clicks. `formDrawer()` itself (`components/preview-drawer.js` — a **0-diff wall file**) is
untouched and still used by `trn-edit`, `trn-note` and ~20 other drawers. `teacherEditDrawer()` /
`teacherNoteDrawer()` / `teacherActions()` are **0-diff**, so `teacher.html`'s **BODY** stays byte-identical. (The
whole FILE is *not* byte-identical and was never claimed to be: `teacher.html` is an admin page that renders the
shared sidebar, whose 2 teacher hrefs changed — it is one of the 62 **sidebar-only** files.)

**Evidence.** `teacher-actions.js:28,45,66-72`; `pages/teachers.js:105,111,112`; `pages/teacher.js:199`;
`preview-drawer.js:32-38`; repo-wide grep for the three symbols (results above).

---

## R-14 — Routes after D-1, and the route-split re-classification

**Decision.**

| Nav item | Route BEFORE (`21502af`) | Route AFTER 041 | Class |
|---|---|---|---|
| `teachers` | `teachers.html` | `teachers.html` | **PLAIN** (baked default tab = `directory`) |
| `addTeacher` | `teachers.html` | **`teachers.html#view=add`** | **DEEP** |
| `teacherCategories` | `teachers.html` | **`teachers.html#view=categories`** | **DEEP** |

Route split: **deep-links 22 → 24 · plain 27 → 25 · route-less lock 1 · menu total 50** (24 + 25 + 1 = 50). The routed
total (49) and the menu (50) are **unchanged**.

**Rationale.** This is a **re-classification between buckets**, expressly permitted as the *one sanctioned carve-out* in
`spec.md` FR-005 and `count-and-freeze-contract.md` §5 (the D-1 freeze rule leaves precisely these two route strings
open for correction without invoking the §8 supersession law). **Any other movement of these two figures is silent
drift and requires a full supersession.** The `teachers` triple ceases to be a duplicate destination — three items, three
distinct, addressable surfaces, exactly as legacy had.

**Frozen counts after 041 (target — every one HELD from `21502af` except the declared split):** HTML **115** · PAGES
**57** · admin files **64** · portal files **50** · index **1** · categories **6** · admin menu **50** · implemented
**49** · planned **0** · disabled **1** · deep-links **24** · plain routes **25** · route-less **1** ·
`FUTURE_ROUTES` **`{}`** · coming-soon **0** · honest locks = **`classSalaryReport` only** · orphan set = exactly
**{`gallery.html`, `gallery.en.html`}** · `finance-analysis` **absent**.

**Evidence.** `nav.config.js:54-56`; `spec.md` FR-005 + SC-05; `impact-boundary.md` §2 Option A ("Deep-links 22 → **24**,
plain routes 27 → **25** … 24 + 25 + 1 = 50 ✅"); `count-and-freeze-contract.md` §5.

---

## R-15 — The **five** unavoidable protected-test supersessions (S1–S5): each a RELOCATION, none a weakening

**Decision.** D-1 forces exactly **five** edits to protected assertions in `tests/smoke/run.cjs`. Each is declared,
documented inline in the suite, in `plan.md` and in a contract. **Every other protected assert stays BYTE-VERBATIM** —
`payHit` · `tchPay` · `famPay` · both `payFigure` lines · child-view · `PAY28` · `truth010.badPlanned/badDisabled` ·
`deadNav` · `links010` · `plannedNavAnchors` · the `nav010` block · `navCount32 === 50` · the finance and reports body
asserts · `a31`/`g32` · the route freeze (115).

| # | Site (at `21502af`) | Today | After 041 | Why it is a **relocation**, not a weakening |
|---|---|---|---|---|
| **S1** | `run.cjs:88` — `FORM_DRAWERS_032.teachers` | `['trn-edit', 'trn-add', 'trn-categories']` | **`['trn-edit']`** | `trn-add` / `trn-categories` are **no longer drawers on this page** — their forms are tab panels. The register enumerates *drawers*; keeping two ids that no longer exist would make the register **false**, and the fieldless/noGate/multiPrimary/MUST-OMIT/canvas audits it drives would fail on a missing subject. The audits themselves are **not** relaxed — they now run against the tab panels (S4). `FORM_DRAWERS_032.teacher` = `['trn-edit','trn-note']` is **UNCHANGED**. |
| **S2** | `run.cjs:111` — `PICKERS_032` | `teachers: ['trn-categories']` | **entry removed** | `PICKERS_032` registers *candidate-list picker **drawers***. The categories surface is no longer a drawer. Its content (list + create form + assign gate + Save gate) is asserted in full at its new host (S4). Nothing that was asserted stops being asserted. |
| **S3** | `run.cjs:115` — `HYBRID_032` | `{ teachers: ['trn-categories'], reports: ['rep-fbcat'], library: ['lib-cats'] }` | **drop the `teachers` key**; `reports` / `library` **UNCHANGED** | Same reason as S2: `HYBRID_032` is the register of *hybrid category **drawers*** whose embedded Create is a real form. The teachers hybrid's real Create form still exists — in the `categories` **tab**, where S4 asserts it. |
| **S4** | `run.cjs:747-752` | asserts `document.querySelector('[data-drawer="trn-categories"]')` **and** `template[data-preview="trn-categories"]` both exist (`kb.cat && kb.catTpl`) | asserts the **categories TAB PANEL** exists (`[data-tabs="teachers"] [data-tabpanel="categories"]`) and **contains** the category list + the real create form + the assign gate + the single Save gate | The honesty guarantee — *"the categories surface exists, is real, and its writes are gated"* — is **preserved in full**; only the **host** changes from a drawer to a tab. The surrounding asserts in the same block (`kb.kebabs === kb.cards`, `!kb.pay` — the teachers-page **pay-free** assert) are **BYTE-VERBATIM**. |
| **S5** | `run.cjs:1494-1495` — the Spec-036 nav asserts | `addTeacher` / `teacherCategories` must be real anchors matching `/(^\|\/)teachers\.(en\.)?html$/` | **`/(^\|\/)teachers\.(en\.)?html#view=add$/`** and **`…#view=categories$/`** | The assert becomes **strictly stronger**: it previously accepted the very route ambiguity D-1 names (a bare `teachers.html` for an item labelled "Add Teacher"). It now demands the distinguishing fragment. The two sibling asserts in the same block (`sessionsKpi` → `#view=sessions-kpi`, `monthlyPerf` → `#view=monthly`) and `teachersPlanned === 0` are **BYTE-VERBATIM**. |

**Rationale (the test governing the register, in one sentence).** *A test may never be the reason a product lies*
(E-08, Spec 040's binding precedent). S1–S5 exist because the **subject moved**, and the register must name where the
subject **is**. Every one of them keeps the same guarantee at the new address; **none** removes an assertion, relaxes a
threshold, or drops a honesty census. The suite gains assertions (the derived matrix, R-18/R-21/R-22; the D-3 regression,
R-07); it loses none.

**Evidence.** Read live at `21502af`: `tests/smoke/run.cjs:88`, `:111`, `:115`, `:740-752`, `:1488-1499`.

---

## R-16 — **D-2 = Option A**: gallery documented, owned, and the orphan set frozen

**Decision.** `gallery.html` / `gallery.en.html` remain **direct-URL-only**. They are registered in a committed contract
(`page-reachability-register.md` §§4–7) with:

* **Purpose**: the frontend / **design-system reference** page — every shared UI component and state rendered against
  the live fixtures in one place.
* **Owner**: the **frontend / design-system maintainer** — a **person/role, not a spec number**.
* **Entry path**: **direct URL only, by design, maintainer-facing, deliberately absent from production navigation.**

An **additive** smoke guard freezes the orphan set as **exactly** `{gallery.html, gallery.en.html}`: a **new** orphan
(an accidentally-unlinked page) **fails**. **ZERO application-source change and ZERO generated-body change for D-2.**

**Rationale.** The defect was never gallery's *existence* — it was its **undocumentedness** (no owner, no entry path,
no guard against future orphans). Option A closes all three at zero product risk and holds every count.

**Alternatives rejected** (canonical D-2 set): **B** link it from the sidebar → menu 50 → 51, **breaks the 50-item
freeze**, and puts a developer reference page in an academy admin's production nav. **C** link it from `index.html` → 2
body changes and still exposes a dev page in a user-facing entry point; weaker than A for no benefit. **D** delete it →
**violates zero-deletion** (count 115 → 113, PAGES 57 → 56) and destroys the component reference the later visual-redesign
review slots will need most.

**Owner note (binding).** `gallery` is **not** assigned to the 044 slot: 044 owns the modal/drawer/long-form
**interaction system**, not the page that renders the component catalogue. No artifact may assert a spec-number owner
for `gallery` that the committed corpus does not support.

**Evidence.** `scripts/build-html.mjs:95` — `{ base: 'gallery', activeId: null, titleKey: 'topbar.title.gallery', crumbKey: 'topbar.crumb.gallery', render: renderGallery }` (registered, renders the admin sidebar, `activeId: null`); not in `nav.config.js`; linked from none of the other 113 pages; `spec.md` §7 D-2; `page-reachability-register.md:83`; `spec.md` E-12, SC-13, SC-19.

---

## R-17 — The copy sweep: **owner = the 044 slot**; **not** swept in 041

**Decision.** `common.backendRequiredNote` (EN: *"…nothing is **saved** yet"*, rendered on ~50 pages) is assigned to
**one** owner: **Spec 044** — the slot that owns the shared modal / drawer / long-form interaction system. **041
performs no part of the sweep.** (Answers **Q-4** / **FR-023**.)

**Rationale.**
1. **The string is not a stray literal — it is a component default.** It is the **default `reasonKey` of
   `formDrawer()`**: `components/preview-drawer.js:32` — `formDrawer(id, { …, reasonKey = 'common.backendRequiredNote' })`
   — emitted at `:35` as `data-reason-key`. Rewording it is a change to the **shared drawer component's default**, which
   is precisely FO-23 → **044**.
2. Every other file referencing it (`wizard.js`, `evaluation-rubric.js`, `report-feedback.js`) is likewise a
   modal/drawer/long-form component, not a form-completeness concern.
3. **056** (FO-24) owns **form completeness** — a different question (are the right fields present?), not *what the gate
   says*. **057** is the final parity/security freeze — it should verify the sweep, not perform it.
4. **041 cannot do it**: the reword changes **~50 page bodies**, far outside a route/sidebar freeze's impact boundary
   (which permits exactly **two** changed bodies — R-24).
5. The string is **honest in meaning** (it *denies* a save); it merely carries the token the fake-success census greps.
   There is no honesty emergency forcing an in-freeze fix — unlike D-3, which is a live route lie.

**Alternatives rejected.** *Dual owner "044/056"* (the corpus's only statement — `040-.../implementation-status.md`, in a
**findings** section, **in no contract**): a dual owner is **no owner**, which is why FR-023 exists. *056*: wrong topic
(field completeness ≠ gate copy). *057*: makes the final freeze the first place a sweep happens. *Sweep it in 041*: ~50
body changes; boundary breach.

**Provenance caveat.** Per §1 of the spec, **"044" is a maintainer-amendment slot, not a chartered spec.** This
assignment binds **whichever spec is chartered into that slot**; it invents no spec number and it selects only from the
corpus-named candidates (044 · 056 · 057).

**Evidence.** `src/js/components/preview-drawer.js:32-38`; `carry-forward-register.md` CF-1; `spec.md` FR-023, §9 CF-1,
Q-4.

---

## R-18 — **E-04**: the derived deep-link matrix is **group-aware** (no "one tabs widget per page" rule)

**Decision.** The FR-013 derived matrix records, for **every** deep-link, **which `[data-tabs]` group owns its tab id**,
and every assertion is scoped to `[data-tabs="<group>"] [data-tabpanel="<view>"]`. 041 does **not** adopt the
alternative guard (`assert ≤ 1 [data-tabs] per admin page`). (Answers **Q-6**.)

**Rationale.**
* **The live constraint.** `initTabs()` iterates **all** `[data-tabs]` wraps and applies the single parsed `hashView` to
  **each** of them (`enhance.js:260-272`); `selectTab()` persists a **global** `'#view='` fragment via `replaceState`
  (`:257`). Two groups on one page would therefore **fight over the one fragment**. **No page has two groups today**, so
  there is **no live bug** — but the derived matrix must not be *silently* dependent on that accident.
* A group-aware matrix is **strictly stronger** (it proves the *right* panel in the *right* widget switched) and it
  **does not constrain future pages** — whereas a "≤1 `[data-tabs]` per page" rule would freeze an implementation detail
  into law and forbid a legitimate future multi-group page for no honesty gain.
* D-1 adds a **new group** (`teachers`), joining `schedule` / `finance` / `reports` / `students` / `families` /
  `settings` / `library` / `certificates` / `teacher-performance` / `student` / `teacher` — the matrix must therefore
  already be group-keyed to describe 041's own output correctly.

**Evidence.** `enhance.js:242-273`; `components/tabs.js:16-35` (`data-tabs="<group>"` wrapper; `data-tabpanel="<id>"`
sections); `spec.md` E-04; `deep-link-register.md` §6.

---

## R-19 — **E-10**: minimal additive matrix rows — do **not** multiply the matrices

**Decision.** 041 sets the floor at **≥ 2 a11y rows and ≥ 2 screenshot frames per deep-linked view**. An audit of the
existing matrices shows exactly **one** view below the floor: **`settingsUsers` (`#view=users`)** — **one** a11y row
(`tests/a11y/run.cjs:209`, en/light/desktop) and **one** screenshot frame (`tests/screenshots/capture.cjs:429`,
ar/light/desktop). 041 adds **exactly one** additive a11y row and **exactly one** additive frame for it (the missing
language/theme complement), plus the **new** rows for the two new teachers views. **No other row is added, changed or
duplicated.**

**Rationale.** The floor exists to prevent single-locale, single-theme vacuity — not to inflate runtimes. Every other
deep-linked view already has ≥ 2 rows in each suite; multiplying the whole matrix would add cost and zero information.
This is *test* coverage, not product design, so it sits inside 041's remit (answers **Q-7**).

**Related, binding (E-11).** The screenshot suite **never exits non-zero** on console errors
(`tests/screenshots/capture.cjs:545 → process.exit(0)`) — its error counts are **advisory only**. 041 must **not** treat
a green screenshot run as a pass signal; smoke + a11y are the gates.

**Evidence.** `tests/a11y/run.cjs:209`; `tests/screenshots/capture.cjs:429`, `:545`; `spec.md` E-10, E-11, Q-7;
`deep-link-register.md` §7.

---

## R-20 — **FR-020 / FR-021 are DOCUMENTATION CORRECTIONS**, not protected-assert supersessions

**Decision.** Classify **once**, and apply the rule consistently (answers **Q-8**):

| Item | What it is | Classification | Handling |
|---|---|---|---|
| **FR-020** — `tests/smoke/run.cjs:2580` header comment reads `// ===== Spec 032 — route/page count freeze: 51 bases × 2 languages + index = 103 =====` while the assert one line below is `pub.length === 115` | a **stale comment** above a **correct** assert | **DOCUMENTATION CORRECTION** | correct the comment text; **the assert is not touched** |
| **FR-021** — `truth010.badPlanned` is now **vacuous** (zero planned items exist ⇒ the filter can never be non-empty), exactly as `plannedNavAnchors === 0` already is | an **explanatory note** about an existing, byte-verbatim, retained guard | **DOCUMENTATION CORRECTION** | add the vacuity note; **RETAIN the assert BYTE-VERBATIM** (zero-deletion; E-09) |

**Rationale.** A **supersession** is a change to an assertion's **logic, subject or threshold** — it must be declared,
contracted and justified (FR-011, SC-17). **Neither of these changes any assertion's behaviour**: FR-020 edits a comment
above an assert that already asserts the right number; FR-021 adds prose explaining why a retained assert can no longer
fail. Treating them as supersessions would (a) devalue the word — the five real supersessions in **R-15** are the ones
that must draw scrutiny — and (b) invite the reading that a comment fix licenses an assert change. It does not.

**The declared amendment set of Spec 041, stated once, in the terms every artifact must use:**

| Class | Count | Sites |
|---|---|---|
| **Protected-test supersessions** (D-1 relocations) | **5** | S1–S5 (R-15) — `smoke:88` · `:111` · `:115` · `:747-752` · `:1494-1495` |
| **0-diff-wall supersessions** | **2** | **W-1** `src/js/enhance.js` — **exactly ONE line**, inside `langUrl()` (D-3, R-25) · **W-2** `src/js/components/teacher-actions.js` — the field-body extraction forced by the MOVE (R-13). **Neither is a test supersession.** |
| Documentation corrections | 2 | FR-020, FR-021 — **not** supersessions, by the rule above |

Read as *behaviour* changes, the count is **six** (S1–S5 + W-1); W-2 is an allowlist amendment that changes no
assertion and no rendered byte beyond what D-1 already declares. **The two numbers that are load-bearing and must
never drift: protected-test edits = 5; `enhance.js` changed lines = 1.** Nothing else.

**Evidence.** `tests/smoke/run.cjs:2580` (stale comment) vs `:2581` (`pub.length === 115`); `spec.md` FR-020, FR-021,
E-09, Q-8; `protected-test-register.md` (the supersession ledger and its 040 precedent).

---

## R-21 — **FR-009 / Q-9**: ship a **committed exact route-inventory contract**

**Decision.** In **addition** to the source-derived assertions (FR-005: pin all **24** deep-link route strings in the
`nav.config.js` **SOURCE** audit; FR-013: derive the matrix from `NAV_CATEGORIES`), 041 ships a **checked-in expected
route table** — a committed contract enumerating, for all **50** menu items: `id · category · status · route · class
(deep / plain / route-less) · target file · view id · owning tabs group`.

**Rationale — the vulnerability a purely source-derived suite has.** If **every** expectation is derived from
`nav.config.js`, then an edit to `nav.config.js` **silently redefines its own expectation** and the suite stays green
while the product changes. That is exactly the class of drift 041 exists to stop. A committed table makes a route change
fail **review** (the diff shows the table row changing, and a reviewer must approve it) **as well as** the build (the
derived matrix still proves the route *resolves*). The two mechanisms answer different questions:

| Mechanism | Question it answers | Fails when |
|---|---|---|
| Derived matrix (FR-013) | *Does every route in the config resolve to a real tab panel, in both languages, beating a seeded stored view?* | a route points at a non-existent view / file / language twin |
| **Committed route-inventory contract** (this decision) | *Is the config still the config we froze?* | a route/id/status/class silently changed |

**Answers Q-9: yes.** The 24 frozen deep-link strings (and the 25 plain routes, and the one route-less lock) live in a
contract file **and** in the source audit.

**Evidence.** `spec.md` FR-005, FR-013, Q-9, SC-05, SC-09; `current-route-inventory.md` (the audit-round table this
contract is derived from); `count-and-freeze-contract.md` §5/§8.

---

## R-22 — FR-013's derived matrix uses the **existing** import pattern; no new dependency (answers **Q-5**)

**Decision.** The smoke suite obtains `NAV_CATEGORIES` via the **already-used** dynamic import —
`import('../../src/js/nav.config.js')`, the exact pattern the existing `nav.config` **SOURCE** audit uses at
`tests/smoke/run.cjs:2512` (added by Spec 039). **No new import path, no new dependency, no build step.**

**Rationale.** The pattern is proven in-suite: Spec 039's source audit already reads the module in Node and asserts on
`FUTURE_ROUTES` and route strings — the one requirement DOM-only tests could not reach. FR-013 (iterate every item whose
`route` contains `#view=`) and FR-014 (fragment resolution — closing `links010`'s fragment-blind hole, where
`const file = h.split('#')[0]` throws the `#view=` away before the `VALID_FILES` lookup) are natural extensions of it.
The fragment **strip must stay** for the `VALID_FILES` lookup — that is why `deadHash`/`badTarget` are legitimately 0
today; FR-014 is **additive**, not a replacement.

**Evidence.** `tests/smoke/run.cjs:2512` (existing `import('../../src/js/nav.config.js')`); `links010`'s
`h.split('#')[0]`; `spec.md` FR-013, FR-014, E-03, Q-5.

---

## R-23 — **S-1 survives D-1**: exactly one repeated destination (a census, not a naive uniqueness assert)

**Decision.** `salaries` **and** `staffSalaries` both route to `finance.html#view=salaries` — an **intentional,
registered** shared destination (one Salaries tab visibly carrying **both** the teacher board and the staff board, both
figure-free; Spec 038). The derived matrix **must tolerate a repeated `{file, view}` pair** and **must assert it is the
only one**.

**Wording, fixed so this is not read as a contradiction of T-06.** The assert the corpus calls **"route uniqueness"
(T-06 / detector X-8)** is a **repeated-destination census**: *exactly one* repeated `{file, fragment}` pair is
permitted (**S-1**), and it must be **named**. What is forbidden is a **naive** uniqueness assert (*"no two nav items
may share a route"*) — that would flag S-1, a *correct* pattern, and would pressure someone to "fix" it by inventing a
duplicate tab or computing a per-staff payroll figure (both forbidden by standing law). Same assert, precise name:
**tolerate exactly one sanctioned repeat; fail on any other.**

**Rationale.** Before D-1 the corpus contained **two** kinds of shared destination: the *legitimate* one (S-1, whose
shared tab visibly contains both subjects) and the *illegitimate* one (D-1, whose shared page contains neither of the
two extra subjects). After D-1, **exactly one remains** — which makes "assert exactly one repeated `{file, view}` pair"
a **precise, tightening** assertion, and makes a naive uniqueness assert a **trap** that would "fix" a correct pattern.
FR-024 exists for exactly this.

**Evidence.** `spec.md` §7 S-1, FR-024, E-05; `deep-link-register.md` §6 item 5.

---

## R-24 — The impact proof classifies **five distinct change layers**; the `#page-body` diff must show **exactly two**

**Decision.** Because D-3 edits `enhance.js` — which is **copied verbatim to the shared asset
`public/assets/js/enhance.js`, loaded by 114 of the 115 pages** (`index.html` does not load it) — the impact contract
must never state a bare "N files changed". It classifies **five layers** and states each explicitly.

> **Grounded correction (see `impact-protection-contract.md` §1.1): there is NO bundler and NO `assets/app.js`.**
> `scripts/build-assets.mjs` does a verbatim recursive `cpSync` of `src/js` → `public/assets/js`; every page emits the
> literal, **unversioned** `<script type="module" src="./assets/js/enhance.js">`. This *strengthens* the conclusion
> below: because the asset is a separate file behind an unversioned reference, the D-3 edit changes **zero bytes of
> HTML** — not merely zero `#page-body` blocks, but **zero whole HTML files**.

| Layer | What changes | 041 expectation |
|---|---|---|
| **L1 — source module** | `nav.config.js` · `pages/teachers.js` · `components/teacher-actions.js` · `ar.trn.js` · `en.trn.js` · `enhance.js` | **6 files** (R-13) |
| **L2 — generated SHARED asset** | `public/assets/js/enhance.js` (the `cpSync` copy of `src/js/enhance.js`) — its **content** changes, therefore what **114 pages** *execute* changes | **1 fetched asset** (+ 5 further D-1 mirrors); **0 page bodies · 0 whole HTML files** |
| **L3 — sidebar markup** | the shared `.nav-panel` in **62** admin files: **2 `.nav-item` hrefs gain a `#view=` fragment** (D-1) | **62 files, sidebar-only**; `#page-body` **byte-identical** |
| **L4 — page body** | `teachers.html` · `teachers.en.html` — the tabs group + the two moved surfaces | **exactly 2 bodies** |
| **L5 — whole file** | the 2 body-changed + the 62 sidebar-changed = **64 admin HTML**; the **51 non-admin** (50 portal + `index.html`) are **byte-identical** | **64 / 51** |

**The gate**: the `#page-body` extraction/md5 comparison against `21502af` must show **EXACTLY TWO** changed bodies.
`enhance.js` is a shared **asset**, not a body — an L2 change **cannot** move the L4 number, and any artifact that
conflates them is wrong.

**Method (binding, FR-025).** Non-destructive **only**: `git show 21502af:<path>` **or** a detached
`git worktree add --detach`. **NEVER** `git stash`, `git reset --hard`, `git checkout -- <path>`, `git clean`, or a
branch switch. Body extraction:
`sed -n '/<div[^>]*id="page-body"/,/<\/div><!-- \/page-body -->/p'` → md5, diffed against the committed baseline.

**Evidence.** `spec.md` FR-025, FR-027, SC-20; `impact-boundary.md` §2 (Option A table) and §3 (the non-destructive
method, steps 1–5).

---

## R-25 — The 0-diff wall takes **exactly one** declared narrow supersession

**Decision.** `src/js/enhance.js` receives **exactly one** declared narrow supersession — the **one-line** `langUrl()`
fix (**D-3**, R-02) — permitted by FR-026's own clause *"unless a chosen fix demonstrably requires one, declared in the
plan"*. **Every other wall file stays 0-diff:**

`package.json` · `scripts/build-html.mjs` · `src/js/i18n.js` · `src/js/components/sidebar.js` ·
`src/js/components/tabs.js` · `src/js/components/form-field.js` · `src/js/components/settings-section.js` ·
`src/js/components/preview-drawer.js` · **`src/js/components/ui.js`** *(path note: the wall file is
`src/js/components/ui.js`; **there is no `src/js/ui.js`** — a prior shorthand, verified against the tree at `21502af`)* ·
`src/js/fixtures/settings.js` · `src/js/pages/staff.js` · `src/js/fixtures/staff-management.js` · all portal pages and
fixtures · every unrelated page module and locale.

**No new dependency · no new component · no new page · no new `PAGES` entry · no new `data-*` hook · no new storage key.**

**Rationale.** The wall's purpose is to make a breach **conspicuous and argued**. D-3 is argued (R-01), minimal (one
line, one call site, no-op when there is no fragment — R-02), and the wall's text anticipates exactly this case. The
alternative — refusing the wall breach and shipping a frozen route contract with a control that voids it — trades a
declared one-line diff for an undeclared product lie. That trade is not available under this spec's own honesty rules.

**Note.** D-1 needs **no** wall file: `tabs.js`, `form-field.js` and `preview-drawer.js` are **used, not modified**.

**Evidence.** `spec.md` FR-026 (the 13 wall files + the exception clause), SC-21; `impact-boundary.md` §4.

---

## R-26 — Locale: three mirrored `trn.list.tab.*` labels; `i18n.js` **0-diff**

**Decision.** Add **three** new keys to the **existing, already-registered** mirrored pair `src/locales/ar.trn.js` /
`en.trn.js` — the tab labels for `directory` · `add` · `categories` — in a **FRESH nested block:
`trn.list.tab.{directory,add,categories}`** (`trn.list.*` is unused today; grep: no `trn.list.*` key in any locale).
**No new locale module**, therefore **`i18n.js` stays 0-diff** (it is a wall file). AR/EN `trn.*` key-set divergence
must remain **0**.

> **Corrected here (this decision previously proposed `trn.tab.*` — that is a COLLISION and is withdrawn).** Verified
> live at `21502af`, `en.trn.js:25`: **`trn.tab.*` is already taken** by `teacher.html`'s profile tablist
> (`overview · courses · groups · timetable · sessions · students · followup · notes`) — and worse,
> **`trn.tab.notes` is additionally used as a *field label*** inside `teacherFields()`
> (`field({ labelKey: 'trn.tab.notes', … })`), so writing into that block risks changing a form label on a page D-1
> must leave byte-identical. `trn.board.tab.*` (`en.trn.js:100`) is likewise taken by `teacher-performance.html`.
> **The new keys must use neither.** This is exactly the collision class Spec 036 hit live and fixed by renaming
> `trn.kpi` → `trn.sessKpi`; the naming guard below is what caught it this time — before implementation, not during.

**Rationale.** This is the precedent every fold since Spec 036 has followed (`trn.board.tab.*`, `fin.tab.*`,
`rep.*`, `fam.*`) — extend the existing mirrored pair, never register a new module for a handful of labels. It also
avoids the collision class Spec 036 caught live (`trn.kpi` → renamed `trn.sessKpi`): the new keys must be checked
against the existing `trn.*` namespace before they are chosen.

**Naming guard.** The chosen key prefix must not collide with any existing `trn.*` key (Spec 036's lesson), and the
**tab id `add` must not collide** with any existing view id in the `teachers` group — the group is **new**, so it cannot.

**Evidence.** `src/locales/ar.trn.js` / `en.trn.js` (existing, registered in `i18n.js`); `en.trn.js:25`
(`tab: { overview, courses, groups, timetable, sessions, students, followup, notes }` — the `teacher.html` profile
tablist) and `en.trn.js:100` (`board: { tab: { overview, sessionsKpi, monthly } }` — `teacher-performance.html`);
`teacher-actions.js` `field({ labelKey: 'trn.tab.notes', … })` (the field-label reuse that makes `trn.tab.*` doubly
unsafe); `components/tabs.js:16-22` (`labelKey` → `t(it.labelKey)`); Spec 036's `trn.kpi` → `trn.sessKpi` rename
(CLAUDE.md history).

---

## Appendix A — the closed option sets (no rival sets are created anywhere in Spec 041)

| Defect | Options | **ADOPTED** |
|---|---|---|
| **D-1** — three sidebar items, one route (`teachers.html`) | **A** distinct `#view=` tabs · B drawer-hash router · C demote to locks · D delete · E standalone page · F record-as-exception · G relabel-only | **A** (in its only compliant shape: **MOVE** — R-08/R-09/R-10) |
| **D-2** — `gallery.*` orphan | **A** document + own + freeze the orphan set · B link from the sidebar · C link from `index.html` · D delete | **A** (R-16) |
| **D-3** — topbar language switch drops the fragment | **A** one-line `+ location.hash` · B `hashchange` listener · C router / new URL-state hook · D also preserve `location.search` · E defer to 044/057 | **A** (R-02; B/C/D/E rejected in R-03/R-04/R-05/R-01) |

## Appendix B — what 041 explicitly does NOT do

* No redesign of the teacher forms; **no** teacher pay/salary/rate/currency field is introduced anywhere (the moved
  `add` form is the **same 13** fields, pay-free and password-free, with the CV upload still a **GATE**).
* No copy sweep (R-17 → the 044 slot).
* No legacy capability reconciliation (CF-2 / CF-3 → the 042 slot).
* No permission enforcement — **hiding a link is not authorization** (E-13 → the 043 slot).
* No integration of any kind (barred from 041 by `040-.../future-owner-register.md` §3).
* No weakening of any assert, census or role law. **041 may only tighten.**
