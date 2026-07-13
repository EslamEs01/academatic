# A11y / Screenshot Coverage Contract — Spec 041

**Spec**: 041 — Full Frontend Route & Sidebar Production Freeze. **Artifact type**: implementation-plan contract
(binding). **Planning only** — no `tasks.md`, no source/test/HTML edit, no commit.
**Baseline**: HEAD `21502af` (Spec 040 committed · PR #13 merged · on `origin/main` · 115 HTML · admin menu 50 ·
tree clean except the 041 artifacts + `.specify/feature.json`).
**Decisions this file does not re-open**: D-1 = Option A, the MOVE (`d1-teacher-route-contract.md`) · D-2 = Option A,
orphan frozen (`d2-gallery-orphan-contract.md`) · D-3 = the one-line `langUrl()` fix (`d3-language-hash-contract.md`).
**Suites in scope**: `tests/a11y/run.cjs` (axe-core; **gate**: `critical=0`) · `tests/screenshots/capture.cjs`
(Playwright; console-error counts **advisory**, `capture.cjs:545` = `process.exit(0)`). `tests/smoke/run.cjs` is
cross-referenced, never re-specified here — this file states behavioral requirements at the point they leave the
static-snapshot suites' remit and hands them to smoke by name and line.

---

## 0. Boundary statement (binding — read first)

**Spec 041 is a route/sidebar freeze plus three named defect fixes (D-1, D-2, D-3). It is not a redesign.** Every
row in this contract audits **existing, byte-identical markup relocated to a new host** (D-1's tab panels) or
**existing markup unchanged in place** (every other page). No row in this contract exists to catch a visual
regression from new styling, new layout, new component, or new copy beyond the 3 tab labels
(`trn.list.tab.{directory,add,categories}`, `d1-teacher-route-contract.md` §5) and the D-1 route strings. **The full
academic visual redesign is out of scope for 041 and stays reserved for the later, separately-chartered, bounded
visual-review specs** (the maintainer-directed 045–050 slot named in `d2-gallery-orphan-contract.md` §1/§3 — a
roadmap reference, not a chartered spec; 041 makes no commitment on their number or scope). Any finding in this
contract's rows that reads as "the design could be better" rather than "critical/serious a11y violation" or "the
honesty/duplication guarantee broke" is **out of scope** and must be filed against that future round, not fixed here.

**Standing law re-affirmed**: this product's visual acceptance instrument is **screenshots reviewed by a human**,
never a pixel-diff or visual-regression library (no such dependency exists or may be added). Axe-core is the
**automated a11y gate**; screenshots are the **visual acceptance record**, not a second automated gate — the
`critical=0 / serious=0` requirement below is axe's, not the screenshot suite's.

---

## 1. Coverage principle — the E-10 floor, restated once, not re-litigated

**Decided** (`spec.md` E-10/Q-7, `research.md` R-19, `plan.md` T-08/§P6, `d1-teacher-route-contract.md` V12):
**every deep-linked view carries ≥ 2 a11y rows and ≥ 2 screenshot frames.** An audit of the `21502af` matrices shows
exactly **one** view below that floor — `settingsUsers` (`#view=users`): **one** a11y row (`a11y/run.cjs:209`,
en/light/desktop) and **one** screenshot frame (`capture.cjs:429`, ar/light/desktop). 041 adds **exactly one**
additive a11y row and **exactly one** additive frame for it (§7) — **the whole matrix is not multiplied.** The two
new D-1 views (`teachers#view=add`, `teachers#view=categories`) enter **at the floor** (≥2 each), same as every
deep-link shipped by Specs 035–040. This contract does not add coverage to any of the other 22 already-floored
deep-links.

---

## 2. What changes, mapped to what already exists (do not re-derive from scratch)

| Layer | Unaffected | Affected by D-1 | Affected by D-2 | Affected by D-3 |
|---|---|---|---|---|
| a11y matrix (`a11y/run.cjs`) | every row not naming `teachers`/`trn-add`/`trn-categories` | 2 existing rows must be **relocated** (§4); new floor rows added (§3) | 0 rows — D-2 is doc+one smoke assert, no a11y surface | 0 new rows required (URL-only fix; existing rows already scan the topbar `[data-action="lang-menu"]` control's DOM, unaffected by where its `href` points post-click) |
| screenshot matrix (`capture.cjs`) | every frame not naming `teachers` `openDrawer:'trn-add'\|'trn-categories'` | 6 existing frames must be **relocated** (§5); new floor frames added (§5) | 0 frames — `gallery.html`/`.en` frames (if any exist) are unaffected; D-2 adds no frame | 0 new frames required by the fix itself; §8 adds visual **evidence** frames (before/after pairs), which are additive, not required by D-3's own contract |
| behavioral (`smoke/run.cjs`) | S1–S5 already specified in `d1-teacher-route-contract.md` §11 / `protected-test-register.md` T-06 | cross-referenced only | orphan-set assert (T-05), cross-referenced only | T1–T8 fully specified in `d3-language-hash-contract.md` §7, cross-referenced only |

---

## 3. Teachers — new a11y rows (the D-1 floor)

Fresh browser context per row (empty `localStorage`) — mandatory per D1-L1/L2/L3's fresh-context rule
(`d1-teacher-route-contract.md` §3). Group id = `teachers` (distinct from `teacher` and `perf`, §5 of the same file).

| # | page | lang | theme | hash | viewport | Proves |
|---|---|---|---|---|---|---|
| A1 | `teachers` | ar | light | `#view=add` | desktop | fresh-load renders the real Add form (D1-L1), AR |
| A2 | `teachers` | ar | dark | `#view=add` | desktop | dark-theme contrast on the 13 `field()` controls + CV gate + Save gate |
| A3 | `teachers` | en | light | `#view=add` | desktop | fresh-load renders the real Add form, EN (LTR) |
| A4 | `teachers` | ar | light | `#view=categories` | desktop | fresh-load renders the real Categories surface (D1-L2), AR |
| A5 | `teachers` | ar | dark | `#view=categories` | desktop | dark-theme contrast on the category list + inline create form + assign/Save gates |
| A6 | `teachers` | en | light | `#view=categories` | desktop | fresh-load renders the real Categories surface, EN (LTR) |
| A7 | `teachers` | ar | light | `#view=add` | **mobile** (390×844) | the `.wiz-grid` reflows to one column, labels stay associated, no horizontal scroll |
| A8 | `teachers` | ar | light | `#view=categories` | **mobile** (390×844) | the category list + create form reflow to one column, no horizontal scroll |
| A9 | `teachers` | ar | light | `#view=directory` *(no hash — plain `teachers.html`)* | desktop | **control row**: the plain route still lands on the directory tab (D1-L3); already implicitly covered by the pre-existing rows `a11y/run.cjs:26,68,69` — **listed here only to show the floor is met, not as a new row** |

Rows A1–A6 satisfy the ≥2-per-view floor for both new views (3 each). A7/A8 are the required mobile-390 rows named
in this file's assignment brief — additive beyond the bare floor because mobile reflow of a **relocated form** (not
merely a relocated static board, per D-1's forced-MOVE architecture, §2 of the D-1 contract) is exactly the class of
regression a route/sidebar freeze must not silently introduce.

**Exact new-row literals** (`tests/a11y/run.cjs` MATRIX shape, for the implement round — this file specifies them,
does not add them):
```js
{ page: 'teachers', lang: 'ar', theme: 'light', hash: '#view=add' },
{ page: 'teachers', lang: 'ar', theme: 'dark',  hash: '#view=add' },
{ page: 'teachers', lang: 'en', theme: 'light', hash: '#view=add' },
{ page: 'teachers', lang: 'ar', theme: 'light', hash: '#view=categories' },
{ page: 'teachers', lang: 'ar', theme: 'dark',  hash: '#view=categories' },
{ page: 'teachers', lang: 'en', theme: 'light', hash: '#view=categories' },
{ page: 'teachers', lang: 'ar', theme: 'light', hash: '#view=add',        viewport: 'mobile' },
{ page: 'teachers', lang: 'ar', theme: 'light', hash: '#view=categories', viewport: 'mobile' },
```

### 3.1 Keyboard tab-switching (roving tabindex) — the `teachers` group

Precedent mechanism (`a11y/run.cjs:238-240`, driver `:351-357`): a row may supply `keys: { focus, seq }` — the
suite focuses the given tab button, then presses each key in `seq`, **before** the axe scan, so the tab reached by
keyboard is audited in its focused, switched state. Tab button ids follow `#tab-<group>-<id>`
(`components/tabs.js:22`) — for the `teachers` group: `#tab-teachers-directory`, `#tab-teachers-add`,
`#tab-teachers-categories`.

| # | page | lang | theme | focus | seq | Proves |
|---|---|---|---|---|---|---|
| K1 | `teachers` | ar | light | `#tab-teachers-directory` | `['ArrowRight']` | roving tabindex moves focus **and** selection forward: directory → add (RTL: `ArrowRight` moves toward the next DOM tab, mirroring the existing `library`/AR precedent at `a11y/run.cjs:239`) |
| K2 | `teachers` | en | light | `#tab-teachers-add` | `['ArrowRight']` | LTR direction: add → categories (mirrors the `certificates`/EN precedent at `a11y/run.cjs:240`, which uses `ArrowLeft` for its RTL-vs-LTR case — K2 uses `ArrowRight` because `add` is not the last tab; the exact key is confirmed against the live `enhance.js` roving-tabindex direction table during implementation, not asserted from this planning document) |
| K3 | `teachers` | ar | light | `#tab-teachers-categories` | `['Home']` | Home/End jump (G11's "roving tabindex; ←/→ cycle, Home/End jump", `d1-teacher-route-contract.md` §9 N6) returns focus to `directory` — a keyboard user is never trapped past the last tab |

**Exact new-row literals**:
```js
{ page: 'teachers', lang: 'ar', theme: 'light', keys: { focus: '#tab-teachers-directory', seq: ['ArrowRight'] } },
{ page: 'teachers', lang: 'en', theme: 'light', keys: { focus: '#tab-teachers-add',       seq: ['ArrowRight'] } },
{ page: 'teachers', lang: 'ar', theme: 'light', keys: { focus: '#tab-teachers-categories', seq: ['Home'] } },
```

K1–K3 count toward, but do not replace, the ≥2 floor in §3 (they audit the **runtime click-equivalent** state, not
a fresh `#view=` load — a distinct assertion class, same distinction the `library`/`certificates` precedent draws).

---

## 4. Teachers — relocated a11y rows (D-1's unavoidable consequence)

**These two rows target a drawer that D-1 removes** (`d1-teacher-route-contract.md` §6, D1-M2). Left unedited they
would silently audit **nothing** post-implementation: `page.click(s.open).catch(() => {})` swallows the missing-
selector error, the axe scan then runs against the **directory** tab (whatever the click failed to open), and the
row keeps reporting `critical=0 serious=0` — a false green that proves the wrong surface. This is the identical
failure shape `d3-language-hash-contract.md` §7.1 calls "a test that ignores this silently proves nothing," applied
to a11y instead of language-switch.

| # | Site | Today | After D-1 | Why it is a relocation, not a deletion |
|---|---|---|---|---|
| **AR1** | `a11y/run.cjs:215` | `{ page: 'teachers', lang: 'ar', theme: 'light', open: '[data-drawer="trn-add"]' }` | `{ page: 'teachers', lang: 'ar', theme: 'light', hash: '#view=add' }` | Superseded by **A1** (§3) — same page, same intent ("scan the Add form in its opened/arrived state"), same guarantee (13 fields + CV gate + 1 Save gate, all labelled); only the **arrival mechanism** changes from a runtime click to a fresh `#view=` load, because the surface itself changed from a drawer to a tab panel (D-1 §2, the forced MOVE) |
| **AR2** | `a11y/run.cjs:293` | `{ page: 'teachers', lang: 'ar', theme: 'light', viewport: 'mobile', open: '[data-drawer="trn-add"]' }` | `{ page: 'teachers', lang: 'ar', theme: 'light', viewport: 'mobile', hash: '#view=add' }` | Superseded by **A7** (§3) — identical reasoning, mobile-390 |

**No other a11y row names `trn-add` or `trn-categories`** (`grep -n "trn-add\|trn-categories" tests/a11y/run.cjs` at
`21502af` → exactly `:215` and `:293`, both listed above). `teacher.html`'s rows (`trn-assign-course` at `:245`, and
any `trn-edit`/`trn-note` open-rows if present) are **unaffected** — `teacher.html` is 0-diff under D-1
(`d1-teacher-route-contract.md` §12 V13/impact allowlist).

**Mutation proof (per `mutation-test-register.md`'s standing rule, applied here)**: apply D-1's source change in a
detached scratch worktree **without** relocating AR1/AR2 → `page.click('[data-drawer="trn-add"]')` finds nothing →
the scan silently audits the directory tab → the row reports `critical=0 serious=0` (**a false pass**, not a
failure) — this is exactly why AR1/AR2 must be **actively relocated**, not left to "just still pass." A row that
cannot be made to fail by the very mutation it exists to catch is not evidence (`protected-test-register.md` §0
L-1..L-6 spirit, applied to a non-smoke suite for the first time by this contract).

---

## 5. Teachers — screenshot frames (new + relocated)

### 5.1 New frames (the D-1 floor)

| # | page | lang | theme | vp | view | variant | Proves |
|---|---|---|---|---|---|---|---|
| S-A1 | `teachers` | ar | light | desktop | `add` | `sp041-teachers-add` | fresh-load Add form, AR |
| S-A2 | `teachers` | en | light | desktop | `add` | `sp041-teachers-add-en` | fresh-load Add form, EN |
| S-A3 | `teachers` | ar | dark | desktop | `add` | `sp041-teachers-add-dark` | dark theme |
| S-A4 | `teachers` | ar | light | mobile | `add` | `sp041-teachers-add-mobile` | mobile reflow, one column |
| S-C1 | `teachers` | ar | light | desktop | `categories` | `sp041-teachers-categories` | fresh-load Categories surface, AR |
| S-C2 | `teachers` | en | light | desktop | `categories` | `sp041-teachers-categories-en` | fresh-load Categories surface, EN |
| S-C3 | `teachers` | ar | dark | desktop | `categories` | `sp041-teachers-categories-dark` | dark theme |
| S-C4 | `teachers` | ar | light | mobile | `categories` | `sp041-teachers-categories-mobile` | mobile reflow, one column |
| S-D1 | `teachers` | ar | light | desktop | *(none — plain `teachers.html`)* | `sp041-teachers-directory` | **control**: plain route still lands on directory (D1-L3) — largely redundant with the pre-existing `teachers` desktop frame (`capture.cjs:107`) but named explicitly so the three-way tab split (directory/add/categories) has one frame apiece under a single Spec-041 naming convention for reviewer navigability |

Exact literals (`capture.cjs` MATRIX shape — `view:` produces `#view=<value>`, per `capture.cjs:461`):
```js
{ page: 'teachers', lang: 'ar', theme: 'light', vp: 'desktop', view: 'add', variant: 'sp041-teachers-add' },
{ page: 'teachers', lang: 'en', theme: 'light', vp: 'desktop', view: 'add', variant: 'sp041-teachers-add-en' },
{ page: 'teachers', lang: 'ar', theme: 'dark',  vp: 'desktop', view: 'add', variant: 'sp041-teachers-add-dark' },
{ page: 'teachers', lang: 'ar', theme: 'light', vp: 'mobile',  view: 'add', variant: 'sp041-teachers-add-mobile' },
{ page: 'teachers', lang: 'ar', theme: 'light', vp: 'desktop', view: 'categories', variant: 'sp041-teachers-categories' },
{ page: 'teachers', lang: 'en', theme: 'light', vp: 'desktop', view: 'categories', variant: 'sp041-teachers-categories-en' },
{ page: 'teachers', lang: 'ar', theme: 'dark',  vp: 'desktop', view: 'categories', variant: 'sp041-teachers-categories-dark' },
{ page: 'teachers', lang: 'ar', theme: 'light', vp: 'mobile',  view: 'categories', variant: 'sp041-teachers-categories-mobile' },
```

### 5.2 Relocated frames (D-1's unavoidable consequence — 6 sites)

Every existing frame that opens `trn-add` or `trn-categories` **as a drawer** targets a template D-1 removes
(`document.querySelector('[data-drawer="trn-add"]')` → `null` post-D-1). Unlike the a11y rows (§4), the screenshot
suite's `.catch(() => {})` (`capture.cjs:499`) means the click silently no-ops and the frame captures **whatever the
directory tab looks like** under that frame's `variant` name — a mislabeled, misleading artifact (a `sp036-add-
teacher.png` that shows the teacher directory, not the Add form). Screenshots are this product's acceptance
instrument (§0); a mislabeled frame is a defect in that instrument, not a cosmetic footnote.

| # | Site | Today | After D-1 | Superseded by |
|---|---|---|---|---|
| **F1** | `capture.cjs:226` | `{ page:'teachers', lang:'ar', theme:'light', vp:'desktop', openDrawer:'trn-categories', variant:'sp028-categories' }` | `{ page:'teachers', lang:'ar', theme:'light', vp:'desktop', view:'categories', variant:'sp028-categories' }` *(variant name kept — historical provenance; only the arrival mechanism changes)* | S-C1 provides the current-generation duplicate; F1's rename keeps the Spec-028 filename lineage intact rather than deleting it (zero-deletion spirit) |
| **F2** | `capture.cjs:290` | `{ page:'teachers', …, openDrawer:'trn-add', variant:'sp032-trn-add' }` | `{ page:'teachers', …, view:'add', variant:'sp032-trn-add' }` | S-A1 |
| **F3** | `capture.cjs:291` | `{ page:'teachers', …, vp:'mobile', openDrawer:'trn-add', variant:'sp032-trn-add-mobile' }` | `{ page:'teachers', …, vp:'mobile', view:'add', variant:'sp032-trn-add-mobile' }` | S-A4 |
| **F4** | `capture.cjs:294` | `{ page:'teachers', …, openDrawer:'trn-categories', variant:'sp032-trn-categories-form' }` | `{ page:'teachers', …, view:'categories', variant:'sp032-trn-categories-form' }` | S-C1 |
| **F5** | `capture.cjs:367` | `{ page:'teachers', …, openDrawer:'trn-add', variant:'sp036-add-teacher' }` | `{ page:'teachers', …, view:'add', variant:'sp036-add-teacher' }` | S-A1 |
| **F6** | `capture.cjs:368` | `{ page:'teachers', …, openDrawer:'trn-categories', variant:'sp036-teacher-categories' }` | `{ page:'teachers', …, view:'categories', variant:'sp036-teacher-categories' }` | S-C1 |

**Disposition choice (recorded, not silently made):** F1–F6 are **renamed in place** (keep the historical `variant`
string, swap `openDrawer` → `view`), rather than deleted with S-A1..S-C4 left to stand alone. Rationale: the
`variant` names are provenance markers ("this frame proves what Spec 028/032/036 shipped") — deleting them would
erase which spec first exercised that surface, a loss the zero-deletion law's spirit (`protected-test-register.md`
L-5, applied here to test-artifact provenance rather than product markup) counsels against. The result is **6
renamed frames + 8 new-generation frames (§5.1) = 14 teacher-tab frames total**, all pointing at the correct
post-D-1 host. No frame is silently left pointing at a nonexistent drawer.

`teacher.html`'s frames (`mgmtModal`, `openDrawer:'trn-assign-course'`, `openDrawer:'trn-availability'`,
`openDrawer:'trn-edit'`/`'trn-note'` if present) are **unaffected** — 0-diff page (§4).

**Mutation proof**: same shape as §4's — apply D-1 without relocating F1–F6 → each frame silently captures the
directory tab under a name claiming to show the Add form or Categories board → a reviewer diffing
`sp036-add-teacher.png` against its Spec-036 original would see the **wrong surface** with **no error raised
anywhere in the pipeline** (screenshots never fail the build, §0). This is the exact failure mode the relocation
closes.

---

## 6. D-3 — language-toggle-preserves-hash: what belongs in this file vs. smoke

The full behavioral contract (8 rows T1–T8, 9 assertions A1–A9, the test-design trap, the mutation) is fully
specified in `d3-language-hash-contract.md` §7–§8 and is **owned by `tests/smoke/run.cjs`** (an additive block,
`d3-language-hash-contract.md` §7.4) — it is not re-specified here to avoid a second, divergent copy. This section
states only the **visual/a11y-suite-adjacent** slice:

| # | Requirement | Where it lives | Why not here |
|---|---|---|---|
| D3-V1 | The topbar language control (`[data-action="lang-menu"]`) is keyboard-reachable, opens a `role="menu"` popover, and Escape returns focus to the trigger — **on every page that renders it** | Already covered by every existing a11y row (axe's `aria-*` / focus-order rules scan the topbar on every load, since the topbar is outside `#page-body` but still in the scanned document); no per-D-3 addition needed | axe already exercises the topbar's static, unopened state on all 100+ existing a11y rows; D-3 changes only where a **click** navigates to, not the control's markup (`d3-language-hash-contract.md` §4 N2) |
| D3-V2 | A **visual before/after pair** proving `finance.html#view=banks` → EN → lands on `finance.en.html#view=banks` with the Banks tab still visible (the exact live-reproduced defect, `d3-language-hash-contract.md` §1.4) | **Additive, evidence-only** screenshot pair, §8 below | Not required by D-3's own contract (which is a behavioral fix verified by smoke); offered here as the visual record a screenshot-based-acceptance product expects for a BLOCKING defect fix |
| D3-V3 | The two new D-1 deep-links survive the switch (`teachers.html#view=add` → EN → `teachers.en.html#view=add` still on the Add tab) | Smoke rows T4/T5 (`d3-language-hash-contract.md` §7.3) | behavioral, not visual/a11y |

**This file adds zero a11y rows for D-3** — D-3 is a URL-string change in one helper function; it produces no new
DOM, no new focus target, no new ARIA state beyond what every existing topbar-adjacent a11y row already scans.

---

## 7. `settingsUsers` — the one E-10 floor-raise (named once, applied once)

| Suite | Today (`21502af`) | Additive row | Result |
|---|---|---|---|
| a11y | `a11y/run.cjs:209` — `{ page:'settings', lang:'en', theme:'light', hash:'#view=users' }` (1 row) | `{ page:'settings', lang:'ar', theme:'light', hash:'#view=users' }` — the missing language complement, per `research.md` R-19's "the missing language/theme complement" | 2 rows |
| screenshot | `capture.cjs:429` — `{ page:'settings', lang:'ar', theme:'light', vp:'desktop', view:'users', variant:'sp040-users' }` (1 frame) | `{ page:'settings', lang:'en', theme:'light', vp:'desktop', view:'users', variant:'sp041-users-en' }` — the missing language complement | 2 frames |

**No mobile, no dark, no keyboard row is added for `settingsUsers`** — the floor is exactly 2, matching the ≥2
already-met by every other deep-link (§1); raising it further would be exactly the "multiply the whole matrix"
research.md R-19 forbids.

---

## 8. Back / Forward — behavioral, not a static-snapshot capability; boundary + procedure

**Neither `tests/a11y/run.cjs` nor `tests/screenshots/capture.cjs` drives browser history** (`grep -n "goBack\|
goForward" tests/a11y/run.cjs tests/screenshots/capture.cjs` at `21502af` → 0 hits, both files). Both suites are
single-`goto`-per-row static-snapshot tools; adding history-navigation driving to either would be new test
*infrastructure*, not a new *row* — out of this contract's "additive row" remit, and it is the wrong instrument:
Back/Forward is a **behavioral** claim (does the previous document reload with its own state correctly re-derived),
not a visual or a11y claim.

**Requirement, stated here because D-1 makes it newly relevant to `teachers`, owned by smoke**:

| Field | Value |
|---|---|
| Claim (N7, `d1-teacher-route-contract.md` §9) | Tab clicks use `history.replaceState` (`enhance.js:258`), **not** `pushState` — clicking a tab creates **no** history entry. Back from `teachers.html#view=add` therefore leaves the page entirely, to whatever document preceded it in history; that document then reloads from **its own URL**, and `initTabs` re-derives its own `#view=` independently. No broken/empty intermediate state is reachable. |
| Procedure (for the smoke round to add, not this file) | `page.goto('finance.html#view=banks'); page.goto('teachers.html#view=add'); page.goBack();` → assert `location.href` ends `finance.html#view=banks` **and** the Banks tab (not Overview) is the single visible panel — proving the prior document's own hash re-resolves, not a stale in-memory tab state. |
| Owner | `tests/smoke/run.cjs`, additive block, sibling to D-3's T1–T8 (`d3-language-hash-contract.md` §7.4) — **not** a11y/screenshot. This contract records the requirement and the exact procedure so it is not lost between the D-1 and D-3 contracts, neither of which states it explicitly. |
| Mutation | Change `selectTab`'s `replaceState` to `pushState` (hypothetical, not a permitted edit) → Back would land on the **same document** with the **previous tab**, not the previous **page** → the assert above would need to change from "previous page's own hash" to "this page's previous tab," a materially different (and, per N7's honesty claim, currently false) behavior. Recorded so a future edit to `selectTab` is caught. |

---

## 9. Active sidebar child item — the honest, non-invented assertion

**Fact (A-1, `sidebar-item-register.md` §"the active pill", cross-referenced by `d1-teacher-route-contract.md` §9
N10):** the sidebar's active-pill mechanism is **baked per file at build time** (`sidebar.js:41`,
`it.id === activeId`; `activeId` comes from the PAGES entry of the **base** page, `build-html.mjs`). It is **not**
hash-aware. Arriving at `teachers.html#view=add` therefore lights the **`teachers`** pill — **never** an `addTeacher`
pill — identically to every one of the other 23 deep-links (`familyCategories` on `families.html` lights `families`;
`#view=invoices` on `finance.html` lights `finance`). **This is frozen, accepted, product-wide behavior, not a D-1
regression** — a hash-aware pill would require a new runtime `hashchange`-adjacent hook, forbidden by the closed
`data-*` hook set (D-1 STOP-3, `d1-teacher-route-contract.md` §13).

**Consequence for this contract**: no row here may assert that `addTeacher` or `teacherCategories` ever carries
`.is-active` — such an assertion would be **testing a capability the product deliberately does not have**, the
exact anti-pattern `protected-test-register.md` L-2 forbids in reverse (a probe must never expect a fiction).
Instead:

| # | page | lang | vp | Proves |
|---|---|---|---|---|
| P1 | `teachers` (loaded at `#view=add`) | ar | desktop | `.nav-item[data-nav="teachers"]` carries `is-active`; `.nav-item[data-nav="addTeacher"]` does **not** — the honest, frozen behavior, captured visually so a reviewer can see the sidebar and the Add form on screen together |

**Exact literal** (screenshot; a11y coverage of this exact state is already discharged by A1/A3 in §3, which load
the same URL — no separate a11y row is needed, per the E-10 discipline of not duplicating a state already scanned):
```js
{ page: 'teachers', lang: 'ar', theme: 'light', vp: 'desktop', view: 'add', variant: 'sp041-teachers-add-sidebar-pill' }
```
This is a **9th** teachers-tab screenshot frame (distinct purpose from S-A1: S-A1 crops nothing and is the general
Add-form record; P1's distinguishing purpose is the **sidebar pill state**, so if a later implementation crops
S-A1 to the form body only, P1 must remain full-page). If the implement round determines S-A1 (full-page, §5.1)
already shows the sidebar with the correct pill, P1 may be **declared satisfied by S-A1** rather than captured
twice — recorded here as a permitted collapse, not a requirement to duplicate.

---

## 10. `classSalaryReport` — the honest lock, coverage already sufficient (no new row required)

`classSalaryReport` (`nav.config.js:90`) sits inside the **`reports`** rail category (nested under its `cat.finance`
sub-section, `nav.config.js:70-91`). `categoryOf('finance')` resolves to `reports` (same category object), so
**every existing `finance` a11y row already scans this lock's DOM** — `activeCat = categoryOf('finance') =
'reports'`, so the `reports` category's `<div class="cat-panel" data-nav-panel="reports">` is **unhidden**
(`sidebar.js:53`, `hidden` only applies when `cat.id !== activeCat`) on every load of `finance.html`. The 21
existing `finance` a11y rows (`a11y/run.cjs:104-128`, AR/EN × light/dark × 4 tabs + mobile + 2 drawer-open states)
therefore already exercise `button[data-nav="classSalaryReport"][aria-disabled="true"][data-disabled-reason]
[data-reason-key="nav.reason.finance"]`'s accessible name, disabled semantics and focus order, in both languages
and both themes. **No additive a11y row is required or added for the lock.**

**Screenshot evidence already exists and is frozen, unaffected by 041**: `capture.cjs:408-409` —
`sp038-classsalary-lock` (AR) / `sp038-classsalary-lock-en` (EN), both desktop, both proving the lock button's
`title`/`aria-label`/lock icon render honestly (`targeted-visual-grounding.md` §"3." cross-reference). 041 makes
**zero** change to `classSalaryReport`'s status, route, or reason key (`d1-teacher-route-contract.md` never touches
the `reports` category; `nav.config.js`'s 3 edits are all inside the `teachers` category, `d1-teacher-route-contract.md`
§10). This section exists so the plan does not silently omit the lock from its coverage inventory — the answer is
**"already covered, frozen, verify-not-re-add."**

---

## 11. Representative admin / teacher / family / student sidebars — desktop + mobile

**Requirement**: at least one desktop and one mobile frame per shell type, proving the sidebar/nav renders honestly
in its collapsed and expanded states. **Audit of the existing matrix first — do not duplicate coverage that already
exists.**

### 11.1 Admin shell (6-category rail sidebar, `components/sidebar.js`)

| State | Existing coverage | New row needed? |
|---|---|---|
| Desktop, default category | `dashboard` ar/light/desktop (`capture.cjs:18`) et al. | No |
| Desktop, rail collapsed (icon-only) | `{ page:'dashboard', …, rail:'1' }` (`capture.cjs:52`) | No |
| Desktop, category switched | `cat:'families'` / `'teachers'` / `'reports'` rows (`capture.cjs:59-61` region) — **now also proves the `reports` category correctly shows the finance sub-section incl. the `classSalaryReport` lock, §10** | No |
| Desktop, `settings`/`admin` categories | `sp040-sidebar-zero-soon` / `cat-admin` frames (`targeted-visual-grounding.md` §"2.") | No |
| Mobile, off-canvas drawer **open** | `{ page:'dashboard', …, vp:'mobile', drawer:true }` (`capture.cjs:54`) | No |
| Mobile, off-canvas drawer **closed** (default) | every plain `vp:'mobile'` admin row (e.g. `teachers` ar/light/mobile, `capture.cjs:117`) | No |

**Admin shell: fully covered by existing frames. Zero additive rows required.** This contract's own new `teachers`
mobile frames (S-A4, S-C4, §5.1) additionally exercise the **closed-drawer** mobile admin shell at the two new D-1
surfaces, for free.

### 11.2 Portal shells (`components/portal-shell.js` — `pt-sidenav` desktop, `pt-nav-drawer` mobile)

| Role | Desktop (`aside.pt-sidenav`, always inline — no click needed) | Mobile, drawer **closed** | Mobile, drawer **open** (native `<details><summary>`) |
|---|---|---|---|
| teacher | `teacher-portal` ar/light/desktop, en/light/desktop (`capture.cjs:153-154`) | `teacher-portal` ar/light/mobile (`capture.cjs:155`) | `{ page:'teacher-portal', …, vp:'mobile', roleDrawer:true, variant:'drawer-open' }` (`capture.cjs:212`) — **exists** |
| family | `family-portal` ar/light/desktop, ar/dark/desktop, en/light/desktop (`capture.cjs:149-151`) | `family-portal` ar/light/mobile (`capture.cjs:152`) | **absent — gap** |
| student | `student-portal` ar/light/desktop, ar/dark/desktop, en/light/desktop (`capture.cjs:145-147`) | `student-portal` ar/light/mobile (`capture.cjs:148`) | **absent — gap** |

**Gap, additive fix (2 frames, using the existing `roleDrawer` mechanism, `capture.cjs:494`, verbatim — no new
click-handling code, only 2 new MATRIX rows):**

```js
{ page: 'family-portal',  lang: 'ar', theme: 'light', vp: 'mobile', roleDrawer: true, variant: 'drawer-open' },
{ page: 'student-portal', lang: 'ar', theme: 'light', vp: 'mobile', roleDrawer: true, variant: 'drawer-open' },
```

**Why this belongs in 041 and is not scope creep**: the mobile open-drawer state is where a broken/mislabeled
`ROLE_NAV` item (a planned item wrongly rendered as an anchor, a missing `aria-current`, an untranslated label)
would be visually caught first — the closed state hides the list entirely. `teacher-portal` already has this frame
(Spec 017); `family-portal`/`student-portal` never got the equivalent. This is a coverage gap the "representative …
sidebars (desktop + mobile)" requirement in this file's own assignment brief names explicitly; closing it is test-
only (`app/tests/**`), 0 app-source, 0 HTML diff — the same classification `impact-boundary.md` gives every other
041 additive test row. **No a11y row is added for this state** — `pt-nav-drawer` is a native `<details>` element;
its open/closed accessible-name and focus semantics are structurally identical across all three roles and are
already scanned in the closed state by the existing portal a11y rows; opening it changes only which `<a>`s are
visible, not any new interactive pattern axe would flag differently per role.

---

## 12. Required outcomes (the acceptance table)

| # | Requirement | Instrument | Threshold / method |
|---|---|---|---|
| R1 | axe critical violations | a11y suite | **0**, gate (`critical > 0` → `process.exit(1)`, `a11y/run.cjs` tail) |
| R2 | axe serious violations | a11y suite | **0** (currently a warning-only `console.warn`, not a hard exit per the existing harness — Spec 041 does not change the harness's exit code, only re-affirms `serious=0` is the accepted state to ship at, consistent with every prior spec's verified claim) |
| R3 | Console errors | screenshot suite | **0**, **advisory only** (`capture.cjs:545` = `process.exit(0)` — never a gate; §0) |
| R4 | No duplicate ids | manual/implementation-time DOM check, cross-referenced to smoke's D1-M4 | `d1-teacher-route-contract.md` §4 D1-M4 — id-multiset check on `#page-body` baked **and** with `trn-edit` + one teacher preview open; this contract's a11y rows (axe's `duplicate-id` / `duplicate-id-active` / `duplicate-id-aria` rules fire as **critical/serious**, so R1/R2 already gate this) |
| R5 | No clipped form/category surface | screenshot suite, visual review (§0 — screenshots are this product's acceptance instrument, not a pixel-diff gate) | Reviewer inspects S-A4/S-C4 (mobile-390, §5.1): the `.wiz-grid` / category list reflow to one column with no horizontal scroll, no truncated label, no overflow past the 390px viewport |
| R6 | No hidden duplicate drawers | source-level, cross-referenced to smoke's D1-M2/D1-M3/D1-M6 | `document.querySelector('template[data-preview="trn-add"]') === null` and same for `trn-categories`, on `teachers.html`; this contract's a11y rows would surface a **stray focus target inside a hidden template** as an axe `aria-hidden-focus` violation if one leaked, so R1 is a live backstop, not just a source-grep |
| R7 | No double focus target | a11y suite | axe's `tabindex`/`focus-order-semantics` rules; specifically checked by K1–K3 (§3.1) driving the tablist by keyboard and confirming exactly one `[data-tab]` per group carries `tabindex="0"` at any time (`components/tabs.js:22`, `tabindex="${active ? '0' : '-1'}"`) |
| R8 | Correct RTL/LTR | a11y + screenshot | AR rows assert (and screenshots visually show) `dir="rtl"`; EN rows `dir="ltr"` — A3/A6 (a11y) and S-A2/S-C2 (screenshot) are the EN/LTR proof for the two new D-1 surfaces specifically; every other page's RTL/LTR posture is unaffected by 041 |
| R9 | Visible keyboard focus | a11y suite | K1–K3 (§3.1) keep the scan's focused element on-screen; axe's `focus-visible`-adjacent checks are part of the standard `wcag2aa`/`wcag21aa` tag set the suite already runs (`a11y/run.cjs:358`, `.withTags([...])`) — no new tag is added |
| R10 | Responsive tab controls | screenshot + a11y mobile rows | S-A4/S-C4 (visual) + A7/A8 (a11y, `viewport: 'mobile'`) — the tablist itself (`.tabs-wrap`) must remain reachable and operable at 390px width, not just the panel content |

---

## 13. Summary — row/frame delta

| Suite | Rows/frames before 041 (teachers + settingsUsers scope) | Relocated | New | After 041 |
|---|---|---|---|---|
| a11y (`a11y/run.cjs`) | 2 (`trn-add` drawer-open, desktop+mobile) + 1 (`settingsUsers`) | 2 → relocated to hash-based (§4) | +6 fresh-hash (§3) +3 keyboard (§3.1) +1 `settingsUsers` complement (§7) = **+10** | teachers: 8 hash rows + 3 keyboard rows = 11 (was 2); `settingsUsers`: 2 (was 1) |
| screenshot (`capture.cjs`) | 6 (`openDrawer:'trn-add'\|'trn-categories'`) + 1 (`settingsUsers`) | 6 → renamed in place, `openDrawer`→`view` (§5.2) | +8 new-generation (§5.1) +1 sidebar-pill (§9, may collapse into S-A1) +1 `settingsUsers` complement (§7) +2 portal mobile-drawer gap-fill (§11.2) = **+11 to +12** | teachers: 14 frames (was 6, all renamed + 8 new); `settingsUsers`: 2 (was 1); portals: family/student gain the open-drawer mobile frame teacher already had |
| smoke (cross-referenced, not owned by this file) | — | S1–S5 (`d1-teacher-route-contract.md` §11) | T1–T8 (`d3-language-hash-contract.md` §7) + orphan-set (T-05) + route-uniqueness (T-06) + Back/Forward (§8 of this file, procedure only) | see the respective contracts |

**Net new test-only surface**: `app/tests/a11y/run.cjs` and `app/tests/screenshots/capture.cjs` gain rows/frames
only (plus in-place renames, §5.2). **Zero application source, zero generated HTML** changes as a result of
anything in this file — consistent with `impact-boundary.md`'s classification of every 041 test addition as
"0 app-source / 0 HTML."

---

## 14. Provenance & cross-references

* Decisions this file implements without re-opening: `spec.md` §7 (D-1 Option A, D-2 Option A) · D-3 (`d3-language-
  hash-contract.md`, promoted from O-1 by maintainer direction).
* Does not duplicate: the smoke-suite S1–S5 relocations (owned by `d1-teacher-route-contract.md` §11 /
  `protected-test-register.md` T-06) · the smoke-suite T1–T8 D-3 rows (owned by `d3-language-hash-contract.md` §7) ·
  the orphan-set assert (owned by `d2-gallery-orphan-contract.md` §4 / `protected-test-register.md` T-05).
* `research.md` R-19 (E-10 decision) · `spec.md` E-10/E-11/Q-7 · `plan.md` T-08/§P6/Q-7 · `mutation-test-register.md`
  §1/§2/G-7 (the falsifiability law, applied here to a11y/screenshot rows for the first time in the corpus).
* Roadmap-provenance caveat (binding): the committed corpus charters **only Spec 041**. The "later, separately-
  chartered, bounded visual-review specs" named in §0 (the 045–050 slot) are a maintainer-directed, append-only
  roadmap reference, not a chartered spec — this file assigns no work to them beyond naming the boundary.

---

## AMENDMENT (tasks-reconciliation gate) — R-2 and R-3: both targets become MACHINE GATES

Until now this contract's targets — **critical = 0 · serious = 0 · console errors = 0** — were only partially
enforced by the runners. Verified live at `21502af`:

| Runner | Today | Consequence |
|---|---|---|
| `tests/a11y/run.cjs:374-376` | `if (critical > 0) … process.exit(1);` then `process.exit(0)` | **`serious` never fails the suite.** It is counted, printed and warned (`:368`) — nothing more. "serious=0" has been an **unenforced claim** in every spec since 031. |
| `tests/screenshots/capture.cjs` (tail) | `console.log(… ${withErrors} with console errors); process.exit(0);` | **Console errors never fail the suite.** "0 console errors" has been a **log line**, not a gate. |

**A production freeze may not certify a result its own suite does not gate.** Therefore:

- **R-2** — `tests/a11y/run.cjs` MUST exit non-zero when **`critical > 0` OR `serious > 0`**. Detailed reporting is
  preserved. **No threshold, no allowlist, no suppression, no "known-noise" exception.** The baseline must first be
  demonstrated at **0/0** on the *unmodified* runner, proving the gate tightens an already-true invariant rather
  than hiding an existing failure. **Proof:** one synthetic `serious` violation ⇒ exit non-zero; remove it ⇒ green.
- **R-3** — `tests/screenshots/capture.cjs` MUST exit non-zero when the captured **console-error count > 0**.
  Capture output and the summary line are preserved when the count is 0. **No filtering, no ignored-console
  allowlist.** **Proof:** one injected console error ⇒ exit non-zero; remove it ⇒ green.

**Classification:** both are **test-runner strengthenings**, *not* protected-assert supersessions. They create no
S6/S7. The Spec-041 amendment budget remains **exactly S1–S5** (+ the 2 declared wall supersessions W-1/W-2).
