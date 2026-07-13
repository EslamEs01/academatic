# Quickstart — Spec 041 implementation & verification workflow (DESCRIPTION ONLY — do not execute during `/speckit.plan`)

The later `/speckit.implement` step follows this workflow. `/speckit.plan` does NOT run it — this file describes
what that later round does and how it proves it did the right thing, not a transcript of commands already run.
All commands are relative to `academy-dashboard-discovery/app` unless stated; `scratchpad/` means this session's
scratch directory, never `/tmp`.

**Decided, not re-opened here**: **D-1 = Option A** (distinct `#view=` fragments on `teachers.html` — the MOVE
architecture: `directory`/`add`/`categories` tabs, `trn-add`/`trn-categories` drawer content relocated into tab
panels, both header buttons removed). **D-2 = Option A** (`gallery.html`/`.en` stay direct-URL-only; owner =
frontend/design-system maintainer; an additive orphan-set guard freezes the exception). **D-3 = the one-line
`langUrl()` fix** (`+ location.hash`). Baseline **HEAD `21502af`** (Spec 040 committed, PR #13 merged into
`main` at `13d38af`); working tree clean except `specs/041-.../` and `.specify/feature.json`. This file does not
re-litigate D-1/D-2/D-3 — see `spec.md` §7, `count-and-freeze-contract.md` §5, `protected-test-register.md` §5
T-06, `mutation-test-register.md` for the option pricing and the decision record.

**Roadmap-provenance caveat** (binding wherever this file names a spec number beyond 041): the committed corpus
charters only Spec 041. 042–057 are a maintainer-directed, append-only amendment, not chartered specs.

---

## 0. Preflight (baseline gate)

```bash
git branch --show-current                 # feature/012-role-portal-foundation
git rev-parse --short HEAD                 # 21502af (or a committed successor)
git status --short                         # clean except specs/041…/ + .specify/feature.json
git log --oneline -1 --branches=main       # confirm 13d38af (main merge) reachable, no divergence
find academy-dashboard-discovery/app/public -maxdepth 1 -name '*.html' | wc -l   # 115
cd academy-dashboard-discovery/app && npm run build && npm run test:smoke && npm run test:a11y
```
Confirm the green baseline BEFORE any source edit: 115 pages, 57 `PAGES`, admin menu 50 (49 implemented / 0
planned / 1 lock), smoke PASS, a11y critical=0 serious=0. If any of these fail against `21502af`, **STOP** — the
diff/md5 math in §7 and the mutation proofs in §8 are invalid against a dirty or wrong baseline.

---

## 1. Non-destructive impact baseline (capture BEFORE any edit)

Method is **binding**, per `count-and-freeze-contract.md` §8 item 5 and `protected-test-register.md` §6:
`git show <commit>:<path>` or a detached `git worktree add --detach`. **NEVER** `git stash`, `git reset --hard`,
`git checkout -- <path>`, `git clean`, or a branch switch, at any point in this entire workflow (§0–§9).

Per-page normalized `#page-body` md5 for **all 115 pages**, taken two independent ways so the pre-image is
reviewable without trusting a live rebuild:

```bash
# (a) from the COMMITTED HEAD via git show — the authoritative capture
#     NB: enumerate the TRACKED FILE LIST (git ls-files), never `git show <c> --name-only`, which lists only the
#     files that commit CHANGED — it would silently capture a handful of pages instead of all 115.
for f in $(git ls-files 'academy-dashboard-discovery/app/public/*.html'); do
  git show "21502af:$f" \
    | sed -n '/<div[^>]*id="page-body"/,/<\/div><!-- \/page-body -->/p' \
    | md5sum | awk -v f="$(basename "$f")" '{print f"  "$1}'
done | sort > scratchpad/spec041-baseline-md5-gitshow.txt
wc -l < scratchpad/spec041-baseline-md5-gitshow.txt   # MUST be 115

# (b) from the current (pre-edit) build output, as a cross-check the two agree
for f in academy-dashboard-discovery/app/public/*.html; do
  sed -n '/<div[^>]*id="page-body"/,/<\/div><!-- \/page-body -->/p' "$f" \
    | md5sum | awk -v f="$(basename "$f")" '{print f"  "$1}'
done | sort > scratchpad/spec041-baseline-md5-worktree.txt
diff scratchpad/spec041-baseline-md5-gitshow.txt scratchpad/spec041-baseline-md5-worktree.txt
# EXPECT: empty diff — proves the pre-edit worktree already equals 21502af for public/*.html

# whole-file baseline too — REQUIRED, because index.html has NO #page-body: its sed extraction is EMPTY and
# hashes to the empty-string md5 (d41d8cd98f00b204e9800998ecf8427e). An empty extraction proves nothing, so
# index.html (and the 50 portal files) must be proven unchanged by WHOLE-FILE md5, never by the body hash.
for f in academy-dashboard-discovery/app/public/*.html; do md5sum "$f"; done | sort \
  > scratchpad/spec041-file-baseline.txt
```

Additionally capture the two structural slices D-1/D-3 touch, so §7's taxonomy has a pre-image to diff against:

```bash
# the shared sidebar block on one representative admin file (spot-check basis for §7 level 3)
git show 21502af:academy-dashboard-discovery/app/public/dashboard.html \
  | sed -n '/<nav class="nav-panel"/,/<\/nav>/p' > scratchpad/spec041-navpanel-before.txt

# the langUrl() helper D-3 touches (level-1 pre-image)
git show 21502af:academy-dashboard-discovery/app/src/js/enhance.js | sed -n '235,243p' \
  > scratchpad/spec041-langurl-before.txt
```

`#page-body` extraction boundary = the `id="page-body"` div emitted by `shell-markup.js`/`portal-shell.js`, the
same boundary every prior nav-completion spec's impact contract (034–040) has used.

---

## 2. Source edits (apply, then rebuild) — three independent changes, none blocking the others

### 2.1 D-3 — `langUrl()` hash preservation (`src/js/enhance.js:237-241`)

The **only** touch to the 041 0-diff wall's `enhance.js` line, and it is exactly one line:
```diff
 function langUrl(lang) {
   const file = (location.pathname.split('/').pop() || 'dashboard.html');
   const base = file.replace('.en.html', '').replace('.html', '') || 'dashboard';
-  return lang === 'en' ? `${base}.en.html` : `${base}.html`;
+  return (lang === 'en' ? `${base}.en.html` : `${base}.html`) + location.hash;
 }
```
`location.search` stays untouched — the app uses no query strings, and preserving `search` would be a behaviour
change beyond the minimal fix (recorded explicitly in the spec, not silently adopted). `sidebar.js` is untouched
(its `langRoute()` was already made hash-aware in Spec 035); this fix closes the *other* half of the route-parity
contract — the topbar language switch — that `langRoute()` never covered.

### 2.2 D-1 — teachers tab-fold (Option A, the MOVE architecture)

Five files, each independently reviewable:

1. **`src/js/nav.config.js`** — 2 route-string edits only (ids/status/labels untouched):
   `addTeacher: 'teachers.html'` → `'teachers.html#view=add'`;
   `teacherCategories: 'teachers.html'` → `'teachers.html#view=categories'`. `teachers` itself keeps the plain
   route `teachers.html` (it becomes the baked default tab, `directory`).
2. **`src/js/pages/teachers.js`** — wrap the existing body in `tabs({group:'teachers'})` with three tab ids:
   `directory` (current body verbatim — `summaryCards`/`filterBar`/`cardGrid#teachers-grid`/`noResults`/the
   per-teacher preview drawers/`trn-edit`, unchanged, becomes the baked-first tab), `add` (the real add-teacher
   form, sourced from the shared field-body builder in `teacher-actions.js` — same `teacherFields('trnAdd', true)`
   controls, CV-upload gate, ONE primary `backendRequired` Save), `categories` (the categories list + inline
   create form + assign gate + ONE primary Save gate, moved verbatim out of `categoriesDrawer()`'s template).
   Remove both `pageHeader` buttons (`data-drawer="trn-categories"` secondary, `data-drawer="trn-add"` primary from
   `addTeacherAction()`) — they cannot become tab-selectors (`selectTab` requires the trigger button to live
   inside the owning `[data-tabs]` wrap — `enhance.js:242-273`) and cannot become same-page hash anchors (no
   `hashchange` listener exists). The tablist is the sole affordance now; the sidebar deep-links land directly on
   the target tab.
3. **`src/js/components/teacher-actions.js`** — the **field-body extraction** (wall supersession **W-2**), so there is
   **exactly one** definition of the **13** `teacherFields('trnAdd', true)` controls (never two — cloning the
   `trn-add` `<template>` AND rendering the same fields in a tab panel would collide `field()`-generated
   `id="f-<name>"` attributes the moment `enhance.js` clones the template into the live sheet). **Symbol disposition
   — DECIDED, owned by `d1-teacher-route-contract.md` §6:**
   * `teacherFields(p, withGeo)` → **EXPORTED** (was module-private). Signature/output unchanged ⇒ `trn-edit` keeps
     calling it and **`teacher.html`'s BODY stays byte-identical** (the whole file still differs in the 2 sidebar hrefs). (The CV gate is emitted *inside* `teacherFields()`.)
   * `teacherAddDrawer()` → **REPURPOSED to `teacherAddPanel()`** (emits the panel body, not `formDrawer('trn-add',…)`).
     Retaining it as a dead-but-callable export is **REJECTED**: it would re-arm the very `f-trnAdd-*` duplicate-id
     collision the MOVE exists to prevent.
   * `addTeacherAction()` → **REMOVED** with its sole call site (`teachers.js:105`).
   * `teacherEditDrawer()` / `teacherNoteDrawer()` / `teacherActions()` → **0-diff**, callers untouched.
   * Zero-deletion holds because the law protects **capabilities**, not symbols: the form, its 13 fields, its CV gate
     and its single gated Save all survive — relocated, and reachable in *fewer* clicks.
4. **`src/locales/ar.trn.js`** / **`en.trn.js`** — 3 mirrored tab-label key pairs in a **fresh nested block:
   `trn.list.tab.{directory,add,categories}`**; 0 divergence.
   > **Namespace guard (a collision this quickstart previously walked into).** Do **NOT** use `trn.board.tab.*` — that
   > block is **already taken** by `teacher-performance.html` (`en.trn.js:100`). Do **NOT** use `trn.tab.*` either —
   > that is `teacher.html`'s profile tablist (`en.trn.js:25`), and **`trn.tab.notes` is additionally used as a *field
   > label*** inside `teacherFields()`. `trn.list.*` is unused today. This is the Spec-036 `trn.kpi` → `trn.sessKpi`
   > lesson, applied *before* implementation instead of during it.

**Routes after 2.1–2.2**: `teachers` → `teachers.html` (plain) · `addTeacher` → `teachers.html#view=add` (deep) ·
`teacherCategories` → `teachers.html#view=categories` (deep). Route split: deep-links **22 → 24**, plain
**27 → 25**, route-less **1**, total **50** unchanged (a declared re-classification per FR-005's carve-out and
`count-and-freeze-contract.md` §5's D-1 freeze rule — not a supersession).

### 2.3 D-2 — orphan freeze (0 source, 0 HTML)

No app-source or generated-HTML edit. `gallery.html`/`.en` stay exactly as built (`PAGES` entry `activeId: null`,
unchanged). The fix is entirely in the test layer (§3 T-05) and documentation (`page-reachability-register.md`
§§4–7, already committed): owner = frontend/design-system maintainer, entry path = direct URL only, by design.

### 2.4 Discipline check after each file

```bash
git diff --stat -- academy-dashboard-discovery/app/src
```
Expected surface, at the end of §2: exactly `src/js/nav.config.js`, `src/js/pages/teachers.js`,
`src/js/components/teacher-actions.js`, `src/locales/ar.trn.js`, `src/locales/en.trn.js`, `src/js/enhance.js`
(the one D-3 line). Anything else — `package.json`, `scripts/build-html.mjs`, `src/js/i18n.js`,
`src/js/components/sidebar.js`, `src/js/components/tabs.js`, `src/js/components/form-field.js`,
`src/js/components/settings-section.js`, `src/js/components/preview-drawer.js`, `src/js/components/ui.js`,
`src/js/fixtures/settings.js`, `src/js/pages/staff.js`, `src/js/fixtures/staff-management.js` (the FR-026 0-diff
wall, minus the one declared `enhance.js` exception) — is a **STOP condition**.

---

## 3. Tests — additive coverage (T-01…T-10), five relocations (S1–S5), documentation corrections (FR-020/021/022)

All items below are **additive or declared relocations**; zero protected assert is weakened (per
`protected-test-register.md` §0 the Supersession Law and §1 the byte-verbatim set).

### 3.1 Additive blocks (`tests/smoke/run.cjs`), each with its own mutation proof re-run at build time (§8)

- **T-01** — **[R-1 CORRECTION — ADDITIVE, NOT A REPLACEMENT]** Add, **beside** the four existing hand-written
  literal deep-link arrays (`SP037_DEEPLINKS` / `SP039_DEEPLINKS` / `SP040_VIEWS` / the Spec-038 finance view
  array — **all four are RETAINED, none is deleted, none has its assertion logic changed**), **one matrix derived
  from `NAV_CATEGORIES`**: for every item whose
  `route` contains `#view=`, load `<file>#view=<v>` and `<file>.en.html#view=<v>` in a **fresh context** with
  `localStorage['academy.schedView.<group>']` pre-seeded via `ctx.addInitScript` to a **different** existing tab,
  and assert the target panel is the ONLY active `[role=tabpanel]`. The `file → group` map (asserted complete
  against the matrix, no orphan entries):

  | file | `data-tabs` group | baked default | note |
  |---|---|---|---|
  | `families` | `families` | `directory` | |
  | `students` | `students` | `directory` | |
  | `teacher-performance` | `perf` | `overview` | group id ≠ file id |
  | `reports` | `reports` | `overview` | |
  | `finance` | `finance` | `overview` | 6 panels |
  | `library` | `library` | `materials` | ⚠ a deep-link (`materials`) sits ON the default — the seed is what makes this discriminating |
  | `certificates` | `certificates` | `templates` | |
  | `settings` | `settings` | `general` | ⚠ a deep-link (`settingsGeneral`) sits ON the default |
  | **`teachers`** (new, D-1) | **`teachers`** | **`directory`** | new group; `#view=add`/`#view=categories` are NOT on the default |

  All **24** deep-links (post-D-1) become discriminating; today only 9/22 are. Coverage floor: SC-08.
- **T-02** — a Node-side assert, for every `NAV_CATEGORIES` item with a `#view=` route, that the fragment id
  exists as a `[data-tab]`/`[data-tabpanel]` on **both** the AR and EN target file — closes the fragment-blind
  hole in `links010` (`smoke:1814`, `const file = h.split('#')[0]`, which stays for `VALID_FILES` lookups but
  never resolved the fragment itself).
- **T-03** — one register asserting all **50** items' exact route (or `null` for the lock), source **and**
  rendered-DOM, split 24 deep-link + 25 plain + 1 route-less. Records both intentional non-unique destinations:
  **S-1** (`salaries`/`staffSalaries` → `finance.html#view=salaries`, sanctioned, Spec 038) and confirms **D-1 is
  now closed** — no two items share an identical route string except S-1.
- **T-04** — AR/EN nav-route-parity assert: for every one of the 50 items, `route_en === langRoute(route_ar)`
  with the fragment byte-identical (closes the gap D-3's `langUrl()` fix does NOT cover — `langRoute()` in
  `sidebar.js` was already hash-aware since Spec 035; this is the mechanical assert that proves it stays so).
- **T-05** — orphan-set assert: the set of `PAGES` bases with `activeId: null` and zero inbound links (from
  `index.html` or any nav/body link on any of the 115 pages) equals **exactly** `{gallery.html, gallery.en.html}`.
  A new orphan (a page built and forgotten) fails the build.
- **T-06** — **repeated-destination census** (the corpus also calls it "route uniqueness"): among the 50 items,
  **exactly one** repeated `{file, fragment}` pair is permitted — **S-1** (`salaries`/`staffSalaries` →
  `finance.html#view=salaries`, sanctioned, Spec 038) — and the assert **names it** and fails on any other repeat.
  It is deliberately **not** a naive uniqueness rule (that would flag S-1, a correct pattern, and pressure someone to
  "fix" it by inventing a duplicate tab or computing a per-staff pay figure — both forbidden by standing law). Fails
  RED today on `teachers`/`addTeacher`/`teacherCategories`; GREEN after §2.2.
- **T-07** — **group-aware fragment-ownership guard.** ⚠️ **NOT** `document.querySelectorAll('[data-tabs]').length <= 1`
  — that "one tabs widget per page" rule is **REJECTED** (Q-6/E-04/R-18): it would legislate away a legitimate future
  multi-group page for no honesty gain. The adopted guard is (a) every deep-link assertion is **scoped** to
  `[data-tabs="<group>"] [data-tabpanel]` (never a page-global query), folded into T-01, plus (b) detector **X-9**:
  *no two `[data-tabs]` groups on the same page may declare the same tab id* — which is what actually makes the single
  global `#view=` fragment unambiguous. Vacuously true today (≤1 group per page); it keeps the door open safely.
- **T-08** — `settingsUsers` (`#view=users`) gains +1 a11y row and +1 screenshot frame to match the ≥2-per-view
  floor every other deep-link view already has (E-10/Q-7; the thinnest row today). **Do not multiply the matrix.**
- **T-09** — correct the stale header comment at `smoke:2580` (`// ===== Spec 032 — route/page count freeze: 51
  bases × 2 languages + index = 103 =====`) to read 115 (57×2+index). Comment-only — classified as a
  **documentation correction** (FR-020), not a supersession, because the assertion two lines below (`pub.length
  === 115`) is untouched. Also declare `truth010.badPlanned === 0` **vacuous-but-retained** in the suite's own
  comments (FR-021) — the same treatment `plannedNavAnchors === 0` already receives (`smoke:237-240`) — and **never**
  delete the branch it guards (zero-deletion law).
- **T-10 — the D-3 topbar language-hash block (this is a REAL smoke block, not a disclosed gap).** Rows **T1–T8** with
  assertion set **A1–A9**, fully specified in `d3-language-hash-contract.md` §7:
  T1 `finance.html#view=banks`→EN (the live-reproduced defect) · T2 `settings.html#view=security`→EN (**the trap page**) ·
  T3 `library.en.html#view=books`→AR (EN→AR) · T4 `teachers.html#view=add`→EN (the new D-1 deep-link) ·
  T5 `teachers.en.html#view=categories`→AR · T6 `add-family.html#step=children`→EN (**the `#step=` wizard fragment**) ·
  T7 `family-child.html#child=st6`→EN (the CSS `:target` family; also proves the shared asset reaches **portal** pages) ·
  T8 `dashboard.html` **(no fragment — the control row)**. T1–T5 additionally pre-seed
  `localStorage['academy.schedView.<group>']` to a *different* view, so the row proves **hash ≻ stored**, not merely
  hash ≻ baked default.
  > **THE TEST-DESIGN TRAP — binding on every T-10 row (found live).** `settings.html` bakes **TWO**
  > `[data-set-lang]` elements, and **both of them are the Customization tab's REAL language control** (they carry
  > `data-lang-opt`); the **topbar menu's** `[data-set-lang]` buttons are **JS-injected into a popover on click** and are
  > not in the built HTML at all. A bare `page.click('[data-set-lang="en"]')` therefore hits the **Customization
  > control** — which routes through the *same* handler, so the row **passes while proving nothing**. Every row MUST:
  > (1) click `[data-action="lang-menu"]`, (2) assert the popover opened, (3) click `.popover [data-set-lang="<lang>"]`
  > (equivalently `[data-set-lang]:not([data-lang-opt])`). An unscoped selector is a **test defect**, rejected in review.

### 3.2 The five declared relocations (S1–S5) — D-1's unavoidable consequence, not a weakening

Each is a **relocation of an existing protected assert to the new honest host**, not a loosening of what it
proves:

| # | Site | Before | After |
|---|---|---|---|
| S1 | `smoke:88` | `FORM_DRAWERS_032.teachers: ['trn-edit','trn-add','trn-categories']` | `['trn-edit']` — `trn-add`/`trn-categories` are no longer drawers on `teachers.html`; their forms live in tab panels, asserted by T-01/T-03 instead. |
| S2 | `smoke:111` | the picker/drawer register's `teachers: ['trn-categories']` entry | entry removed (no longer a drawer). |
| S3 | `smoke:115` | `HYBRID_032 = { teachers: ['trn-categories'], reports:[...], library:[...] }` | `teachers` dropped; `reports`/`library` unchanged. |
| S4 | `smoke:747-752` | asserts `[data-drawer="trn-categories"]` + `template[data-preview="trn-categories"]` both exist | asserts the **categories tab panel** exists and contains the list + create form + gates — same honesty guarantee (a real create form behind a `backendRequired` gate), different host. |
| S5 | `smoke:1494-1495` | Spec-036 assert: `addTeacher`/`teacherCategories` are real anchors to `/teachers\.(en\.)?html$/` | `/teachers\.(en\.)?html#view=add$/` and `#view=categories$/` |

`FORM_DRAWERS_032.teacher` (`teacher.html`, `['trn-edit','trn-note']`) is **unchanged** — a different page.
`HYBRID_032.reports`/`.library` are **unchanged**. Every other protected assert in the FR-011 register stays
byte-verbatim.

### 3.3 `tests/a11y/run.cjs` and `tests/screenshots/capture.cjs`

- a11y: additive rows for `teachers.html#view=add` / `#view=categories` × AR/EN × light/dark + mobile-390 + the
  open-form/open-drawer rows already implicit in a real tab body (no NEW drawer to open — the form is now inline
  in the tab panel); + the T-08 `settingsUsers` +1 row. Target: critical=0 serious=0.
- screenshots: additive `sp041-*` frames for the two new teacher tabs × AR/EN + dark + mobile-390; + the T-08
  `settingsUsers` +1 frame; the topbar-language-switch-preserves-hash proof (`finance.html#view=banks` → EN toggle
  → `finance.en.html#view=banks`, both before/after frames). 0 console errors required (advisory gate per
  `capture.cjs:545 process.exit(0)` — never cited as a smoke-equivalent pass/fail).

---

## 4. Locale parity check

The locale modules are **ES modules** (`export default { … }`) with **nested** key objects, so `require()` throws and
a top-level `Object.keys()` would compare only the outermost namespace. Use a dynamic `import()` + a flatten:

```bash
node --input-type=module -e "
const flat = (o, p = '') => Object.entries(o).flatMap(([k, v]) =>
  (v && typeof v === 'object' && !Array.isArray(v)) ? flat(v, p + k + '.') : [p + k]);
const ar = flat((await import('./src/locales/ar.trn.js')).default).sort();
const en = flat((await import('./src/locales/en.trn.js')).default).sort();
const onlyAr = ar.filter((k) => !en.includes(k));
const onlyEn = en.filter((k) => !ar.includes(k));
console.log('ar.trn keys:', ar.length, '| en.trn keys:', en.length);
console.log('divergence ar-only:', onlyAr.length, onlyAr);
console.log('divergence en-only:', onlyEn.length, onlyEn);
console.log('new keys present:', ['directory','add','categories']
  .every((k) => ar.includes('list.tab.' + k) && en.includes('list.tab.' + k)));
"
# EXPECT: ar.trn keys === en.trn keys (N+3 / N+3), 0 divergence either direction, and the 3 mirrored
#         trn.list.tab.{directory,add,categories} keys present in BOTH.
# EXPECT ALSO: no key was added under trn.tab.* or trn.board.tab.* (the two occupied namespaces).
```
As with every prior spec, a genuine key miss also surfaces as a smoke failure via the raw-key guard
(`document.body.innerText.match(/⟦[^⟧]+⟧/g)` empty on every page/lang, `run.cjs:125,157`) — run both checks.

---

## 5. No-secret / no-pay / no-fake grep gates (scoped to what §2 touched, plus a sitewide re-verification)

```bash
cd academy-dashboard-discovery/app

# teacher pay-free GLOBAL — must stay 0 on the two changed bodies AND sitewide (16 teacher-portal files untouched
# by this spec, but re-verify per FR-018 since the suite re-runs the shipped regex verbatim)
grep -RiE 'salary|payroll|hour[-_ ]?rate|\bfine\b|payout|compensation|أتعاب|راتب|فلوس' \
  public/teachers.html public/teachers.en.html public/teacher*.html
# EXPECT: 0 matches — the moved trn-add/trn-categories bodies are pay-free/password-free exactly as the drawers
# they replace; the tab move relocates the entry path, it does not touch the field list.

# no type=password / type=file (except the pre-existing CV-upload gate, which stays a GATE not a live input) /
# canvas / pdf / window.open on the two changed bodies
grep -RoE 'type="password"|<canvas' public/teachers.html public/teachers.en.html
# EXPECT: 0 matches.
grep -RoE 'type="file"' public/teachers.html public/teachers.en.html
# EXPECT: exactly the 1 CV-upload GATE per language (data-disabled-reason, never a live upload path) — same count
# as before the move (the trn-add drawer already carried this gate).

# fake success / fake connected (0 anywhere in the two changed bodies)
grep -RoiE 'تم الحفظ|\bsaved\b|بنجاح|\bsuccessfully\b|تم الربط' public/teachers.html public/teachers.en.html
# EXPECT: 0 matches (the honest backendRequired gate copy is retained verbatim from the moved drawer).

# href="#" sitewide (standing law since Spec 011) — must stay 0 across all 115, including the two changed pages
# now that both pageHeader buttons were removed rather than converted into dead anchors
grep -RoE 'href="#"' public/*.html
# EXPECT: 0 matches.

# sitewide re-verification: finance-analysis remains absent (FR-009)
grep -RiE 'finance-analysis' src/js/nav.config.js public/*.html
# EXPECT: 0 matches.

# D-3 regression check: no page's topbar language control drops location.search intentionally-vs-accidentally —
# confirm the fix is hash-only (the app uses no query strings; this is a documentation check, not a code path)
grep -n 'location.search' src/js/enhance.js
# EXPECT: 0 matches — search was never read by langUrl() before or after; recorded as a deliberate non-adoption,
# not silently dropped.
```

---

## 6. Build + verify

```bash
cd academy-dashboard-discovery/app
npm run build            # → 115 pages, PAGES still 57 entries, 0 raw keys, locale parity (§4)
npm run test:smoke       # PASS — T-01…T-10 additive + S1–S5 relocations, all else byte-verbatim
npm run test:a11y        # critical=0 (the HARD gate: a11y/run.cjs:375 exits 1 only on critical>0) and serious=0 (the accepted ship state; reported, not the exit gate)
node tests/screenshots/capture.cjs   # 0 console errors; sp041-* frames + settingsUsers +1 frame
```

---

## 7. Impact proof — the five-level taxonomy (non-destructive, against `21502af`)

A single word — "changed" — is not precise enough once one fix touches a shared JS asset (D-3) and another
touches two page bodies plus 62 sidebars (D-1). Every impact claim in this spec is stated at exactly one of these
five levels, and the proof method for each is different:

| Level | What it means | Files at this level | How it is proven |
|---|---|---|---|
| **1 — source-module change** | a file under `src/js/**` or `src/locales/**` differs from `21502af` | `nav.config.js` · `pages/teachers.js` · `components/teacher-actions.js` · `locales/ar.trn.js` · `locales/en.trn.js` · `enhance.js` (1 line) — **6 files** | `git diff --stat -- src` (§2.4) |
| **2 — generated shared-asset change** | the byte-for-byte copy of a level-1 file under `public/assets/js/**` or `public/assets/locales/**` (`build-assets.mjs` `cpSync`, no bundling) — loaded via ES-module imports by **every one of the 115 pages'** `<script type="module" src="./assets/js/enhance.js">` tag, but the `<script>` tag itself never changes | the 6 copied files under `public/assets/` | `diff <(git show 21502af:academy-dashboard-discovery/app/public/assets/js/enhance.js) academy-dashboard-discovery/app/public/assets/js/enhance.js` (repeat per file) — non-empty for these 6, but **0 HTML `<script>` tag bytes differ anywhere**, so this level never shows up in level 4/5 |
| **3 — sidebar markup change** | the `<nav class="nav-panel">` block (OUTSIDE `#page-body`) differs | the other **62** admin files (64 admin − the 2 whose body also changed) — only the 2 D-1 `.nav-item` hrefs gain a `#view=` fragment | `sed -n '/<nav class="nav-panel"/,/<\/nav>/p'` before/after diff (§1, §7 spot-check below); `#page-body` md5 for these 62 stays in the level-4 "unchanged" set |
| **4 — page-body change** | the `id="page-body"` div differs | **exactly 2** — `teachers.html`, `teachers.en.html` | `#page-body` md5 diff (below) |
| **5 — whole-file change** | any byte in the file differs, for any reason (levels 2 and 3 both produce a nonzero whole-file diff even though they never touch `#page-body`) | `teachers.html`/`.en` (levels 3+4) + the other 62 admin files (level 3 only) = **64 admin files total have a nonzero whole-file diff**; the **51 non-admin files** (50 portal + `index.html`) have **0** whole-file diff **despite** loading the level-2-changed `enhance.js` — the `<script src>` path is unchanged, so the referencing HTML byte is unchanged even though the browser will fetch different JS content at runtime | `diff <(git show 21502af:<path>) <path>` per file |

**The load-bearing distinction**: D-3's fix is level-1 + level-2 **only** — it changes what every one of the 115
pages' browser session *executes*, but it changes **zero** bytes in any of the 115 HTML files themselves (the
`<script type="module" src="./assets/js/enhance.js">` tag is identical before and after). D-1's fix is level-1
(4 files) + level-2 (the copies) + level-3 (62 sidebars) + level-4/5 (2 bodies). Conflating "the browser now
behaves differently" (true for both) with "the HTML file changed" (true for D-1's 64, false for D-3's 115) is
exactly the ambiguity this taxonomy exists to kill.

### 7.1 `#page-body` diff (level 4)

```bash
for f in academy-dashboard-discovery/app/public/*.html; do
  sed -n '/<div[^>]*id="page-body"/,/<\/div><!-- \/page-body -->/p' "$f" | md5sum | awk -v f="$f" '{print f"  "$1}'
done > scratchpad/spec041-postbuild-md5.txt
diff scratchpad/spec041-baseline-md5-gitshow.txt scratchpad/spec041-postbuild-md5.txt
# EXPECT: exactly 2 differing lines — public/teachers.html, public/teachers.en.html.
# Any third differing body is a defect in the fix, not in the baseline: HALT (per impact-boundary.md §5.2 item 5).
```

### 7.2 Sidebar-only spot-check (level 3), generalized across the 62

```bash
sed -n '/<nav class="nav-panel"/,/<\/nav>/p' academy-dashboard-discovery/app/public/dashboard.html \
  > scratchpad/spec041-navpanel-after.txt
diff scratchpad/spec041-navpanel-before.txt scratchpad/spec041-navpanel-after.txt
# EXPECT: only the 2 D-1 nav rows change (href gains a #view= fragment); everything else in .nav-panel identical.
# Repeat spot-check on 2-3 more admin files (e.g. finance.html, settings.html) to generalize the claim across all 62.
```

### 7.3 Whole-file diff census (level 5) and the enhance.js content-vs-tag distinction (level 2)

```bash
git diff --stat -- academy-dashboard-discovery/app/public | wc -l    # 64 admin files (teachers ×2 + 62 sidebar-only)
git diff --stat -- academy-dashboard-discovery/app/public/assets     # the 6 copied JS/locale files (level 2)
grep -c 'src="./assets/js/enhance.js"' academy-dashboard-discovery/app/public/*.html | grep -v ':1$'
# EXPECT: empty output — every one of the 115 pages still has EXACTLY one such <script> tag, byte-identical
# whether or not that page's #page-body changed.
```

### 7.4 Source and wall verification

```bash
git diff --stat -- academy-dashboard-discovery/app/src      # exactly the 6 files in §2.4
git diff -- academy-dashboard-discovery/app/package.json               # empty
git diff -- academy-dashboard-discovery/app/scripts/build-html.mjs     # empty
git diff -- academy-dashboard-discovery/app/src/js/components/sidebar.js   # empty
git diff -- academy-dashboard-discovery/app/src/js/components/tabs.js      # empty
git diff -- academy-dashboard-discovery/app/src/js/i18n.js                 # empty
git diff -- academy-dashboard-discovery/app/src/js/components/ui.js        # empty (the wall file; there is no src/js/ui.js)
```

**Final partition proof, all 115 files**: 2 (level 4/5, `teachers.html`/`.en`) + 62 (level 3/5, sidebar-only
admin) + 51 (level 0, byte-identical: 50 portal + `index.html`) = **115** ✅. `64 + 51 = 115`; `64` also equals
`2 + 62`. No file is counted twice, no file is missed.

---

## 8. Mutation run — the required falsifiability evidence (isolated worktree, non-destructive)

Per `mutation-test-register.md` §2 and §7 (MT-1…MT-8): every freeze invariant this spec claims must be paired
with a mutation that makes its guarding assertion **fail**, run in an **isolated detached worktree**, then
reverted — never in the primary tree, never via `stash`/`reset --hard`/`checkout --`/`clean`/branch-switch.

```bash
# Isolate — mutate ONLY inside the detached worktree
git worktree add --detach scratchpad/spec041-mutate 21502af
cd scratchpad/spec041-mutate/academy-dashboard-discovery/app
npm ci && npm run build && npm run test:smoke     # pre-proof: PASS, exit 0, before any mutation
```

Apply each mutation from the table below **one at a time**, rebuild if the mutation is source-side (all are),
run `npm run test:smoke`, confirm it prints `SMOKE FAILED:` and exits 1 with the named message(s), then discard
the change (`git worktree` is throwaway — no revert-in-place needed) and re-add a fresh detached worktree for the
next mutation, or reset the single worktree back to the same detached commit between mutations (still never using
`reset --hard` on the **primary** tree; a `git reset --hard 21502af` performed **inside the disposable detached
worktree** is acceptable because that worktree is deleted afterward regardless).

| # | Mutation | File | Must fail with | Volume |
|---|---|---|---|---|
| M-1a | `staff` route → nonexistent file | `nav.config.js` | `links010.badTarget` (`run.cjs:1823`) — `"N link(s) to a nonexistent page file"` | 64 lines |
| M-1b | `staff` route → real-but-wrong file (`library.html`) | `nav.config.js` | **must stay GREEN** — this is the register's headline gap (G-1), confirmed still open at baseline, closed post-041 by T-03's full 50-item register | 0 (expected pass) at baseline; **RED after T-03 ships** |
| M-2 | wrong hash, UK spelling (`#view=customisation`) | `nav.config.js` | `anchorOk040` (`:1568`) + source audit (`:2545`) | 64 + 1 lines |
| M-3 | `disabled` lock rendered as an anchor | `components/sidebar.js` | `truth010.badDisabled` + `deadNav` + `fin.walletOk` + `nav010.lockedOk` + finance `csr` + disabled-reason-toast probe | 6 independent assertion sites |
| M-4 | `implemented` item marked `planned` | `nav.config.js` | sitewide zero-planned census (`:253`) + `nav040.planned===0` (`:1574`) + the source audit `stillPlanned.length===0` (`:2549`) | 4+ sites |
| M-5 | AR/EN hash-loss in `langRoute()` | `components/sidebar.js` | every `#view=` sidebar href regex, EN pages only | 32 EN admin files × 15 |
| M-6 | admin destination injected into `ROLE_NAV.teacher` | `fixtures/portal.js` | the teacher shell-anchor registry (4 sites) | 16 teacher files × 4 |
| M-7 | 58th `PAGES` entry | `scripts/build-html.mjs` | route/page count freeze (`:2583`) | 1 line |
| M-8 | 51st nav item | `nav.config.js` | `navCount32===50` + 4 more sites | 5 sites |
| **M-9 (new, 041)** | flip `initTabs` precedence `hash \|\| stored` → `stored \|\| hash` | `enhance.js` | **all 24** T-01 seeded rows fail (post-041); **only 9/22 would fail pre-041** — this delta IS the SC-08 proof | 24 rows vs 9 |
| **M-10 (new, 041)** | rename one `data-tab` id (`customization`→`customisation`) on `settings.html` | `pages/settings.js` | T-02 fragment-resolution assert | new, was invisible to `badTarget` |
| **M-11 (new, D-1)** | revert §2.2 (restore all three teacher items to bare `teachers.html`) | `nav.config.js` | T-06 route-uniqueness assert | proves T-06 discriminates the exact defect D-1 fixes |
| **M-12 (new, D-3)** | revert the one-line `langUrl()` fix (drop `+ location.hash`) | `enhance.js` | **Pass A (baseline, pre-041): GREEN — a *disclosed gap*, never a pass.** No shipped smoke assert covers `location.hash` survival across a topbar language click. **Pass B (post-041): RED — T-10.** Rows **T1–T7 MUST FAIL** at **A2** (hash empty ≠ FROM hash) and **A3** (the visible panel reverts to the baked default: `finance.en.html` shows `overview`, not `banks`). **T8 MUST STAY GREEN** — it is the hash-less control row and must be insensitive to the mutation; if T8 goes red, the row is mis-authored. If any of T1–T7 still passes, that row is **vacuous** and must be rewritten before the plan is accepted. | T1–T7 RED · T8 GREEN |
| **M-12b (new, D-3)** | author the fix wrongly as `+ '#' + location.hash` | `enhance.js` | **A5 MUST FAIL** on T1–T7 (`##view=banks`) and **A6 MUST FAIL** on T8 (a trailing `#` on a hash-less route) — the double-hash guard | RED |

```bash
# Post-proof, back in the PRIMARY tree (never mutated)
cd /media/mekky/work/backend/dashboard-intelligence-crawler/academy-dashboard-discovery/app
npm run build && npm run test:smoke && npm run test:a11y     # green
git status --porcelain                                        # empty (except the real, kept §2 edits)
git worktree remove --force ../../scratchpad/spec041-mutate 2>/dev/null || true
git worktree list                                              # confirm the scratch worktree is gone
```

**M-1b stays the headline finding it always was** (G-1): a plain-file route repointed at another *existing* page
was undetectable pre-041. T-03 closes it — after 041 ships, re-running M-1b (repoint `staff` → `library.html`)
must flip from GREEN to RED against the *new* 50-item register, and that flip is itself required evidence the
plan's T-03 delivery actually closed G-1 rather than merely describing it.

**M-12's Pass-A green is a FINDING, not a pass — and Spec 041 closes it.** At the baseline the smoke suite has **no**
DOM-level test for `location.hash` survival across a topbar language click, so reverting the fix would go undetected
(the screenshot pair is *advisory only* — `capture.cjs:545` is `process.exit(0)` — and may **never** be cited as gate
coverage). That absence **is** the defect **T-10 delivers**: an additive smoke block driving
`click([data-action="lang-menu"]) → click(the MENU's [data-set-lang]) → assert the pathname mirrored AND
`location.hash` byte-preserved AND the target panel is the single visible one of its group`. The Pass-A→Pass-B flip
(**GREEN → RED**) is required evidence that T-10 was actually delivered rather than merely described; if M-12 is still
green in Pass B, **T-10 was not delivered and the freeze claim is void**.

**The trap, restated because it is the difference between a real test and a vacuous one:** `settings.html` bakes TWO
`[data-set-lang]` elements and **both are the Customization tab's real language control** (they carry `data-lang-opt`);
the topbar menu's are **JS-injected on click**. Any D-3 row must open `[data-action="lang-menu"]` first and scope to
**that menu's** control (`.popover [data-set-lang]` / `[data-set-lang]:not([data-lang-opt])`). An unscoped selector
exercises the wrong code path and passes while proving nothing.

---

## 9. Documentation reconciliation (FR-019 / FR-020 / FR-021 / FR-022 / FR-023 — classified, not code changes)

| FR | Action | Classification |
|---|---|---|
| FR-019 | Refresh `CLAUDE.md`: HEAD `21502af`; Specs 039 + 040 committed (not "awaiting the watcher commit"); frozen counts; the 041 redefinition (baseline freeze, not final — Spec 057 is final) | documentation |
| FR-020 | Correct `smoke:2580`'s stale header comment (103→115) | **documentation correction** — the assertion itself is untouched, so this is NOT a protected-assert supersession (Q-8 resolved: classify by whether assertion *logic* changed, and it did not) |
| FR-021 | Record `truth010.badPlanned===0` as vacuous-but-retained in the suite's own comment, mirroring `plannedNavAnchors===0`'s existing treatment | **documentation correction** — same reasoning as FR-020; retain the branch (zero-deletion law) |
| FR-022 | Publish the corrected planned-probe supersession chain (034 control→families · 035 families→teachers · **036** teachers→admin · 038 no-op · 039 admin→settings · 040 retired) — Spec 040's own register misattributed the 036 step to 038 | documentation, in `protected-test-register.md` §2 and `CLAUDE.md` |
| FR-023 | Name the single copy-sweep owner (`common.backendRequiredNote`) among the corpus-named candidates 044/056/057 — recommendation **044** (evidence: `preview-drawer.js`'s `formDrawer()` default `reasonKey`, the exact component FO-23 assigns to 044). 041 does **not** perform the sweep. | decision recorded in `/speckit.plan`, not a code change |
| Q-9 | Ship `route-inventory-contract.md` (already committed as `current-route-inventory.md` in this spec's artifact set) as a checked-in exact 50-row route table, in addition to the source audit, so a `nav.config` edit fails BOTH the build assertion and a documentation review | contract file, already present |

None of FR-019/020/021/022/023/Q-9 touch `app/src`, `app/tests`, or `app/public` beyond what §2/§3 already name.

---

## 10. Acceptance checklist (maps to `spec.md` §8 SC-01…SC-24)

| # | Check | Pass condition |
|---|---|---|
| A1 | Preflight (§0) | green, HEAD = `21502af` |
| A2 | Baseline double-capture, all 115 pages (§1) | empty diff |
| A3 | Source edit surface (§2.4) | exactly 6 files: `nav.config.js`, `pages/teachers.js`, `components/teacher-actions.js`, `ar.trn.js`, `en.trn.js`, `enhance.js` (1 line) |
| A4 | Locale parity (§4) | `ar.trn` keys === `en.trn` keys, 0 divergence; 0 raw `⟦key⟧` tokens sitewide |
| A5 | Grep gates (§5) | teacher pay-free 0 · 0 `type=password` · CV gate count unchanged (1/lang) · 0 fake-success · `href="#"` = 0 sitewide · `finance-analysis` absent |
| A6 | Build + suites (§6) | 115 pages; smoke PASS; a11y critical=0 serious=0; screenshots 0 console errors |
| A7 | `#page-body` diff (§7.1) | **exactly 2**: `teachers.html`, `teachers.en.html` — SC-18 |
| A8 | Sidebar-only spot-check (§7.2) | only the 2 D-1 `.nav-item` hrefs differ in `.nav-panel`, generalized across ≥3 admin files |
| A9 | Whole-file / shared-asset census (§7.3) | 64 admin files nonzero whole-file diff (2 body+sidebar, 62 sidebar-only); 51 non-admin files **zero** whole-file diff; every `<script src="./assets/js/enhance.js">` tag byte-identical across all 115 despite the level-2 content change |
| A10 | 0-diff wall (§7.4) | every FR-026 wall file byte-identical, with the **two declared supersessions** as the only exceptions: **W-1** `enhance.js` (exactly 1 line, inside `langUrl()`) and **W-2** `components/teacher-actions.js` (the field-body extraction). **No third.** `git diff --name-only -- public/assets` must show exactly the 6 mirrors with **`app.css` ABSENT** (a changed CSS md5 = a new utility class smuggled in ⇒ STOP). |
| A11 | Route split (SC-05) | 24 deep-link + 25 plain + 1 route-less = 50; all 24 pinned in the SOURCE audit |
| A12 | Route uniqueness (T-06, SC-18) | 0 duplicate routes except S-1; RED-before/GREEN-after proof recorded (M-11) |
| A13 | Deep-link discrimination (SC-08) | 24/24 seeded, derived from `NAV_CATEGORIES` (SC-09); M-9 proves the delta (24 vs pre-041's 9) |
| A14 | Fragment resolution (SC-10) | 0 dead `#view=` hashes; M-10 proves T-02 catches a renamed `data-tab` id |
| A15 | AR/EN parity (SC-12) | 0 failures via T-04's mechanical assert |
| A16 | Orphan set (SC-13) | exactly `{gallery.html, gallery.en.html}`, owner + entry path documented |
| A17 | Role isolation (SC-14) | 0 admin→portal / 0 portal→admin by exact match; `teacher-performance.html` linked from 0 portal pages |
| A18 | Role laws (SC-15) | teacher pay-free 16/16 · family zero-pay 16/16 · student child-view 14/14, shipped regexes verbatim |
| A19 | Honesty censuses (SC-16) | all 0, sitewide |
| A20 | Protected asserts (SC-17) | byte-verbatim except the 5 declared relocations S1–S5 (§3.2) |
| A21 | Topbar language hash (D-3) | live check: `finance.html#view=banks` → EN toggle → `finance.en.html#view=banks` (hash survives); before/after screenshot pair captured (M-12 disclosure) |
| A22 | Counts HELD (SC-24) | 115 pages · 57 bases · 50 menu items (49/0/1) · `FUTURE_ROUTES={}` after 041, unchanged from `21502af` except the declared route re-classification (A11) |
| A23 | Mutation pass (§8) | M-1a,2,3,4,5,6,7,8,9,10,11 each RED with the named message; M-1b RED **post-041** (was GREEN pre-041, the closed gap); M-12 disclosed as a11y/screenshot-only coverage; primary tree untouched throughout (`git status --porcelain` empty pre- and post-run) |
| A24 | Documentation (SC-22) | `CLAUDE.md` HEAD `21502af`, both 039+040 committed; `smoke:2580` comment corrected; the corrected probe chain published; single copy-sweep owner named (044, recommended) |
| A25 | No forbidden git operation | manual review of the implementation transcript confirms 0 uses of `stash`/`reset --hard`/`checkout --`/`clean`/branch-switch on the **primary** tree |
| A26 | Process guard | no commit, no push performed by the authoring/implementing agent — the watcher commits |
