# Contract — Impact & Protection (Spec 041, PLAN round)

**Baseline:** HEAD **`21502af`** (Spec 040 committed; PR #13 merged; `21502af` and the main-merge `13d38af` are both on
`origin/main`; ahead=0 behind=0). Working tree clean except the untracked `specs/041-route-sidebar-production-freeze/`
artifacts and the speckit-managed `.specify/feature.json`. **Every md5 / diff / count in this contract was taken live
against `21502af` and is reproducible with the commands printed inline.**

**Instrument.** This is the *plan-round* impact contract. It is the operational successor of the specify-round
`impact-boundary.md` (§§1–2 priced options that are now **decided**) and it carries **two declared, evidence-backed
supersessions of `impact-boundary.md` §4's 0-diff wall** (§6.2 below): `src/js/enhance.js` (ONE line — D-3) and
`src/js/components/teacher-actions.js` (the field-body extraction forced by D-1's MOVE). Nothing else moves off the
wall. **No silent allowlist expansion**: a file not named in §6.1 that shows a diff is a **STOP** (§8), not a discovery.

**Decisions are closed — this contract prices them, it does not re-open them.**
D-1 = **Option A / the MOVE** (`d1-teacher-route-contract.md`) · D-2 = **Option A / orphan frozen**
(`d2-gallery-orphan-contract.md`) · D-3 = **the one-line `langUrl()` fix** (`d3-language-hash-contract.md`).

---

## 1. Grounded build facts — how a source change actually reaches a page (read this before §2)

The five-level taxonomy is only meaningful if the pipeline is stated exactly. It was re-derived live, not recalled:

| # | Fact | Evidence (live, at `21502af`) |
|---|---|---|
| B1 | **There is no bundler and no `app.js`.** `npm run build` = `vendor-assets.cjs` → `build-assets.mjs` → `tailwindcss` → `build-html.mjs`. No esbuild/rollup/webpack step exists. | `package.json` `"build"` script; `ls public/assets/js` → `enhance.js · i18n.js · nav.config.js · theme.js · icons.js · dom.js · components/ · pages/ · fixtures/` — **no `app.js`** |
| B2 | **`build-assets.mjs` is a verbatim recursive copy**: `cpSync('src/js' → 'public/assets/js')`, `cpSync('src/locales' → 'public/assets/locales')` (+ fonts, icons). No transform, no minify, no hashing. | `scripts/build-assets.mjs` `const copies = [['src/js','js'], ['src/locales','locales'], …]` |
| B3 | Copy fidelity is byte-exact today: `md5(src/js/enhance.js) == md5(public/assets/js/enhance.js) == d068bc3d8d1d0ee667bdb029e8d95899`. | `md5sum src/js/enhance.js public/assets/js/enhance.js` |
| B4 | **The page → asset reference is UNVERSIONED**: every page emits the literal `<script type="module" src="./assets/js/enhance.js"></script>` — no query string, no content hash, no inlining. | `scripts/build-html.mjs:191`; `grep -o 'src="[^"]*enhance.js[^"]*"' public/dashboard.html` → `src="./assets/js/enhance.js"` |
| B5 | **114 of 115** pages load the shared asset. `index.html` does **not** reference `enhance.js` at all. | `grep -l 'assets/js/enhance.js' public/*.html \| wc -l` → **114**; the one miss is `public/index.html` |
| B6 | **Runtime import graph** (what the browser actually fetches from `assets/js/`): `enhance.js` → `theme.js`, `i18n.js`, `components/dropdown.js`, `components/toast.js`, `icons.js`, `dom.js`; and `i18n.js` → the locale modules (`ar.js`/`en.js`/`ar.trn.js`/`en.trn.js`/… under `assets/locales/`). | `grep '^import' src/js/enhance.js`, `src/js/i18n.js:4-23` |
| B7 | **`assets/js/nav.config.js` and `assets/js/pages/*.js` are shipped but never fetched**: no page references them and no module in the B6 graph imports them. They exist only because B2 copies the whole `src/js` tree. They are, however, **git-tracked** — so they still appear in `git diff`. | `grep -l 'assets/js/nav.config.js' public/*.html` → 0; `grep -rn 'nav.config' src/js/enhance.js src/js/i18n.js …` → 0 hits; `git ls-files public/assets \| wc -l` → **194 tracked** |

### 1.1 The one factual correction this contract carries

Earlier drafts of `plan.md` §11 and `d3-language-hash-contract.md` §5.1 described the shared asset as
**“`public/assets/app.js` — the bundled/compiled `enhance.js`.”** **Grounded at `21502af`, that artifact does not
exist** (B1). The correct identifier is **`public/assets/js/enhance.js`, a byte-verbatim `cpSync` copy** of
`src/js/enhance.js`, referenced by an **unversioned** `<script>` src (B4). **Both artifacts have since been corrected
to this identifier** (as have `research.md` R-24 and `protected-test-contract.md` §8); this section remains as the
grounding record and the standing guard against the identifier drifting back.

This is a **naming/mechanism correction, not a rival decision**: every downstream conclusion of those two artifacts
survives intact, and one of them gets *stronger*:

> Because the reference is unversioned and the asset is a **separate file**, the D-3 edit changes **zero bytes of
> HTML** — not merely zero `#page-body` blocks, but **zero whole HTML files**. The 51 non-admin pages are byte-identical
> **as whole files** (§2, L5). Had the build inlined or content-hashed the asset, all 114 loading pages would have been
> whole-file changes; it does not, so they are not. This contract states which is true for this build, as required.

---

## 2. THE 5-LEVEL IMPACT TAXONOMY (the heart of this contract)

A naive `git diff --name-only | wc -l` after 041 reports a number that is true and useless. Impact **MUST** be reported
at five distinct levels, each with its own expected set, its own proof command, and its own STOP condition.

| Level | Definition | Expected after 041 | Proof |
|---|---|---:|---|
| **L1** | **Source-module change** — a file under `app/src/**` whose text changes | **6** | §2.1 |
| **L2** | **Generated shared-asset change** — a git-tracked file under `app/public/assets/**` whose content changes *because* an L1 file changed (mechanical copy, B2) | **6** | §2.2 |
| **L3** | **Sidebar markup change** — an admin page whose `.nav-panel` markup differs | **64** | §2.3 |
| **L4** | **Page-body change** — a page whose `#page-body` extraction md5 differs | **EXACTLY 2** | §2.4 |
| **L5** | **Whole-file change** — a `public/*.html` file whose **bytes** differ | **EXACTLY 64** | §2.5 |

**The single most important sentence in this document:** L2 ≠ L5. The shared asset changes content for the 114 pages
that load it, **and not one of those pages' bytes changes as a result** (B4). Conflating the two produces the false
claim “115 pages changed”; separating them produces the true claim **“64 HTML files changed, 2 bodies changed.”**

### 2.1 L1 — source-module change (exactly 6 files; this is the complete allowlist)

| # | File | Change | Defect | Instrument |
|---|---|---|---|---|
| L1-1 | `src/js/nav.config.js` | 3 route edits: `addTeacher` → `teachers.html#view=add` (was bare `teachers.html`, line 55) · `teacherCategories` → `teachers.html#view=categories` (line 56) · `teachers` re-affirmed plain (line 54, text may change only in its trailing comment). No new item · no status change · `FUTURE_ROUTES` stays `{}` | D-1 | `d1` §Routes |
| L1-2 | `src/js/pages/teachers.js` | body → `tabs({ group:'teachers' })`, 3 panels (`directory` default · `add` · `categories`); the two header buttons removed; `categoriesDrawer()` body → the `categories` panel; the add-form body → the `add` panel; `filterBar` + `#teachers-grid` + `noResults()` + per-teacher previews + `teacherEditDrawer()` **unchanged inside `directory`** | D-1 | `d1` §3 |
| L1-3 | `src/js/components/teacher-actions.js` | **field-body extraction** — ONE definition of the **13** `field()` controls (the CV gate is emitted *inside* `teacherFields()`) + the single primary `backendRequired` Save, consumed by the `add` panel. Symbol disposition owned by `d1-teacher-route-contract.md` §6 — see §7 | D-1 | **declared wall supersession W-2**, §6.2 |
| L1-4 | `src/locales/ar.trn.js` | 3 mirrored tab labels (new nested block; no collision with `trn.tab.*` / `trn.board.tab.*`) | D-1 | `d1` |
| L1-5 | `src/locales/en.trn.js` | the mirror of L1-4 — AR/EN `trn.*` key-set divergence must stay **0** | D-1 | `d1` |
| L1-6 | `src/js/enhance.js` | **ONE line**, `langUrl()` (`enhance.js:237-241`) returns `… + location.hash` | D-3 | **declared wall supersession**, §6.2 |

```bash
git diff --stat -- app/src        # must list EXACTLY these 6 paths — no seventh
```

**Not in L1 and never permitted:** `components/sidebar.js` (its `langRoute()` is already hash-aware — Spec 035 — and is
the *correct* half of the parity story; touching it is scope creep), `components/tabs.js`, `components/preview-drawer.js`,
`components/form-field.js`, `components/ui.js`, `components/topbar.js`, `components/dropdown.js`, `i18n.js`,
`build-html.mjs`, `package.json`, any fixture, any portal module (full wall: §6.1).

### 2.2 L2 — generated shared-asset change (exactly 6 tracked files; **0 HTML bytes**)

`build-assets.mjs` mirrors each changed L1 file into `public/assets/**` (B2). All six mirrors are **git-tracked**
(`git ls-files` confirms each), so they appear in `git status` / `git diff` and **must be declared**, or a reviewer will
read them as allowlist drift.

| Generated path | Mirrors | Fetched by the browser? | Consequence for pages |
|---|---|---|---|
| `public/assets/js/enhance.js` | L1-6 | **YES** — the `<script type="module">` entry of **114** pages (all but `index.html`, B5) | content differs; **the pages' bytes do not** (B4) |
| `public/assets/locales/ar.trn.js` | L1-4 | **YES** — via `enhance.js → i18n.js` (B6) | runtime label source only; the baked labels come from the build |
| `public/assets/locales/en.trn.js` | L1-5 | **YES** — same | same |
| `public/assets/js/nav.config.js` | L1-1 | **NO** — shipped-but-unfetched (B7) | none at runtime; the routes reach pages by being **baked** at build (L3) |
| `public/assets/js/pages/teachers.js` | L1-2 | **NO** — build-time module (B7) | none at runtime; its output is **baked** (L4) |
| `public/assets/js/components/teacher-actions.js` | L1-3 | **NO** — build-time module (B7) | none at runtime; its output is **baked** (L4) |

**Also under `public/assets/`, and expected 0-diff:**

| Asset | Expectation | Why it is a real check, not a formality |
|---|---|---|
| `public/assets/app.css` (baseline md5 `5ab135a4afba91c8e62c6b2dbd49f09d`) | **byte-identical** | Tailwind scans source for class names. D-1 must reuse the **existing** tabs/`wiz-grid`/field classes (already emitted for finance/settings/library). **A changed `app.css` md5 means a NEW utility class entered `teachers.js` — i.e. a CSS/design change smuggled into a route freeze. STOP.** |
| `public/assets/icons/**`, `public/assets/fonts/**`, every other file under `public/assets/js|locales` | byte-identical | 188 of the 194 tracked asset files must not move |

```bash
git diff --name-only -- app/public/assets    # EXACTLY the 6 rows above — app.css MUST NOT appear
md5sum app/src/js/enhance.js app/public/assets/js/enhance.js   # the two md5s must MATCH (copy fidelity, B3)
```

### 2.3 L3 — sidebar markup change (exactly 64 admin files)

The sidebar is **baked** into every admin page at build time from `nav.config.js`. Live at `21502af`: each of the 64
admin pages carries **three** `teachers` hrefs (`teachers` · `addTeacher` · `teacherCategories`), all pointing at the
same bare destination — which **is** D-1:

```bash
grep -o 'href="teachers[^"]*"' public/dashboard.html    | sort | uniq -c   # → 3 href="teachers.html"
grep -o 'href="teachers[^"]*"' public/dashboard.en.html | sort | uniq -c   # → 3 href="teachers.en.html"
grep -l 'href="teachers.html"'    public/*.html | wc -l                    # → 32 (AR admin)
grep -l 'href="teachers.en.html"' public/*.html | wc -l                    # → 32 (EN admin)
grep -o 'class="nav-item[^"]*"' public/dashboard.html | wc -l              # → 50 (admin menu, frozen)
```

**After 041**, in each admin page, that triple becomes `1 × plain + 2 × fragment`:

| Page family | Before (×64) | After (×64) |
|---|---|---|
| AR (32 files) | `teachers.html` ×3 | `teachers.html` · `teachers.html#view=add` · `teachers.html#view=categories` |
| EN (32 files) | `teachers.en.html` ×3 | `teachers.en.html` · `teachers.en.html#view=add` · `teachers.en.html#view=categories` |

**Nothing else inside `.nav-panel` may differ** — not a label, not an icon, not an order, not the category headings, not
the one honest lock (`classSalaryReport`), not the item count (**50**). The EN fragment form is produced by
`sidebar.js langRoute()` **unchanged** (it is already hash-aware — Spec 035 — which is exactly why `sidebar.js` stays on
the wall; §6.1).

**62** of these 64 files are **sidebar-only**: their `#page-body` md5 is **unchanged**. The 2 exceptions are
`teachers.html` / `teachers.en.html`, which are L3 **and** L4.

### 2.4 L4 — page-body change (EXACTLY TWO)

| File | `#page-body` md5 @ `21502af` | After 041 |
|---|---|---|
| `public/teachers.html` | `b9c6b024ba0d878b8de0faf3364103ea` | **CHANGES** (tabs + moved add/categories surfaces) |
| `public/teachers.en.html` | `bc3a2f71bb3d9f2a7c2102224159cdfb` | **CHANGES** |
| the other **62** admin files (e.g. `dashboard.html` = `80ffd3c57c40ddc61d10859512d85058`) | — | **byte-identical** |
| the **50** portal files | — | **byte-identical** |
| `index.html` | `d41d8cd98f00b204e9800998ecf8427e` = **md5 of the empty string** — see §3.3 | **byte-identical** (proven whole-file, not by this hash) |

**A third differing body is a defect in the fix, not in the baseline: HALT** (STOP-4, §8). D-3 contributes **zero** L4
changes: it edits a runtime asset, and the baked HTML is untouched.

### 2.5 L5 — whole-file change (EXACTLY 64 HTML files)

| Set | Files | Whole-file bytes after 041 | Reason |
|---|---:|---|---|
| Admin, body-changed | `teachers.html`, `teachers.en.html` | **DIFFER** | L3 + L4 |
| Admin, sidebar-only | the other 62 | **DIFFER** | L3 only (2 href fragments) |
| Portal | 50 | **BYTE-IDENTICAL** | no baked change; the asset they load is a separate, unversioned file (B4) |
| `index.html` | 1 | **BYTE-IDENTICAL** | no sidebar, and it does not even load `enhance.js` (B5) |
| **Total HTML** | **115** | **64 differ · 51 byte-identical** | — |

> **The precise answer to “may the 51 non-admin whole files differ because the shared asset changed?”** — **No. For this
> build they are byte-identical as whole files.** The `<script>` src is a fixed literal `./assets/js/enhance.js` with no
> query, no hash, no inlining (B4), so a change to the asset's *content* cannot perturb a single byte of any page.
> `public/index.html` does not even carry the reference (B5).

```bash
git diff --name-only -- app/public/*.html | wc -l    # → 64, and every entry must be one of the 64 admin files
```

---

## 3. The `#page-body` comparison — exact, honest semantics

### 3.1 The command (identical to Specs 034–040, kept for byte-comparability)

```bash
sed -n '/<div[^>]*id="page-body"/,/<\/div><!-- \/page-body -->/p' "$f" | md5sum
```

### 3.2 What it actually extracts (grounded — do not misstate it)

The build emits the **opening** marker only: `shell-markup.js:12` → `<div class="page-pad" id="page-body">` and
`portal-shell.js:74,101` → `<div class="pt-body" id="page-body">`. **There is no `<!-- /page-body -->` closing comment in
any built file** (`grep -o '</div><!-- /page-body -->' public/teachers.html` → no match). The sed range's end address
therefore never matches and the extraction runs **from the `#page-body` line to EOF** (`teachers.html`: line 458 → 880 =
**423 lines**). Prior specs' “`#page-body`-onward” phrasing is the accurate one.

Consequences, stated rather than discovered later:
* The extraction **includes** the constant page tail (`</main></div></div>` + the `<script src="./assets/js/enhance.js">`
  line). That line is a **fixed literal** (B4) and does not change in 041, so the comparison remains a faithful body
  comparison and the D-3 asset edit stays invisible to it — **as it must**.
* It is a *superset* of the body, never a subset: it cannot hide a body change. Discriminating power at baseline is
  provable — **all 115 hashes are distinct** (`… | sort | uniq -d | wc -l` → **0**).

### 3.3 Anti-vacuity guard (mandatory)

`index.html` has **no** `#page-body` (it is the landing page), so its extraction is **empty** and hashes to the
empty-string md5 `d41d8cd98f00b204e9800998ecf8427e`. Exactly **1 of 115** extractions is empty (verified by scan).
**An empty extraction proves nothing.** Therefore:

> `index.html` MUST be proven unchanged by **whole-file** md5, never by its `#page-body` hash. Any future page whose
> extraction is empty inherits the same rule, and an extraction that becomes empty for a page that previously had one is
> a **STOP** (it means the marker moved).

---

## 4. The non-destructive proof procedure (binding; FR-025)

**Forbidden at every point, no exceptions:** `git stash` · `git reset --hard` · `git checkout -- <path>` · `git clean` ·
a branch switch. Baseline content is read with **`git show 21502af:<path>`**. A **detached** `git worktree add --detach`
is the only permitted alternative for bulk diffing, and only that worktree may be removed afterwards
(`git worktree remove`) — the primary tree is never touched.

**Step 0 — preflight (before any source edit).**
```bash
git rev-parse --short HEAD                              # 21502af (or a committed successor)
git status --short                                      # only specs/041…/ + .specify/feature.json
ls app/public/*.html | wc -l                            # 115
grep -c 'class="nav-item' app/public/dashboard.html     # (sidebar sanity) 50 nav items
npm run build && npm run test:smoke && npm run test:a11y   # green at baseline
```
Any failure ⇒ **STOP**: the md5 math below is invalid against a dirty or wrong baseline.

**Step 1 — capture the baseline TWICE, independently, for all 115 pages.**
```bash
S=/tmp/claude-1000/-media-mekky-work-backend-dashboard-intelligence-crawler/…/scratchpad   # scratchpad dir
# (a) authoritative — from the COMMITTED baseline, via git show (never checkout)
for f in $(git ls-files 'academy-dashboard-discovery/app/public/*.html'); do
  git show "21502af:$f" | sed -n '/<div[^>]*id="page-body"/,/<\/div><!-- \/page-body -->/p' \
    | md5sum | awk -v f="$(basename "$f")" '{print f"  "$1}'
done | sort > "$S/spec041-body-baseline-gitshow.txt"
# (b) cross-check — the current pre-edit worktree build
for f in app/public/*.html; do
  sed -n '/<div[^>]*id="page-body"/,/<\/div><!-- \/page-body -->/p' "$f" \
    | md5sum | awk -v f="$(basename "$f")" '{print f"  "$1}'
done | sort > "$S/spec041-body-baseline-worktree.txt"
diff "$S/spec041-body-baseline-gitshow.txt" "$S/spec041-body-baseline-worktree.txt"   # MUST be empty
# whole-file baseline (for the 51 non-admin files + the index anti-vacuity guard)
for f in app/public/*.html; do md5sum "$f"; done | sort > "$S/spec041-file-baseline.txt"
```
Double-capture agreement (empty diff) is a **precondition**; without it the worktree ≠ `21502af` and nothing downstream
is provable. Known anchors: `teachers.html b9c6b024…`, `teachers.en.html bc3a2f71…`, `dashboard.html 80ffd3c5…`,
`index.html d41d8cd9…` (empty — §3.3).

**Step 2 — apply ONLY the §2.1 (L1) edits. Rebuild** (`npm run build`).

**Step 3 — the five-level report (this exact set of five commands is the deliverable).**
```bash
# L1 — source
git diff --stat -- app/src                          # EXACTLY the 6 files of §2.1
# L2 — generated shared assets
git diff --name-only -- app/public/assets           # EXACTLY the 6 mirrors of §2.2; app.css ABSENT
md5sum app/src/js/enhance.js app/public/assets/js/enhance.js    # equal (copy fidelity)
# L3 — sidebar
git show 21502af:academy-dashboard-discovery/app/public/dashboard.html \
  | sed -n '/<nav class="nav-panel"/,/<\/nav>/p' > "$S/nav-before.txt"
sed -n '/<nav class="nav-panel"/,/<\/nav>/p' app/public/dashboard.html > "$S/nav-after.txt"
diff "$S/nav-before.txt" "$S/nav-after.txt"         # ONLY the 2 teachers rows; +hash fragments; 50 items held
# L4 — bodies
for f in app/public/*.html; do
  sed -n '/<div[^>]*id="page-body"/,/<\/div><!-- \/page-body -->/p' "$f" \
    | md5sum | awk -v f="$(basename "$f")" '{print f"  "$1}'
done | sort > "$S/spec041-body-after.txt"
diff "$S/spec041-body-baseline-gitshow.txt" "$S/spec041-body-after.txt"   # EXACTLY 2 changed: teachers.html/.en
# L5 — whole files
git diff --name-only -- app/public/*.html | wc -l    # EXACTLY 64 (all admin)
for f in app/public/*.html; do md5sum "$f"; done | sort > "$S/spec041-file-after.txt"
diff "$S/spec041-file-baseline.txt" "$S/spec041-file-after.txt" | grep '^[<>]' | awk '{print $3}' | sort -u
# → the 64 admin files ONLY; the 50 portal files + index.html MUST NOT appear (covers the index vacuity case)
```

**Step 4 — invariant re-assertion** (counts unchanged; see `count-freeze-contract.md`): HTML **115** · `PAGES` **57** ·
admin **64** / portal **50** / index **1** · categories **6** · menu **50** · implemented **49** / planned **0** /
disabled **1** · `FUTURE_ROUTES` `{}` · `[data-coming-soon]` **0** · deep-links **24** / plain **25** / route-less **1**
(24+25+1 = 50 — the ONE declared re-classification, no count change) · orphan set exactly
`{gallery.html, gallery.en.html}` · `finance-analysis` absent.

**Step 5 — no commit, no push.** The watcher commits. (Process guard carried from every prior spec.)

---

## 5. D-2 and D-3 impact, stated at the same five levels (so nothing hides)

| Defect | L1 | L2 | L3 | L4 | L5 |
|---|---|---|---|---|---|
| **D-1** (MOVE) | `nav.config.js` · `pages/teachers.js` · `components/teacher-actions.js` · `ar.trn.js` · `en.trn.js` (**5**) | **5 mirrors**: `js/nav.config.js` · `js/pages/teachers.js` · `js/components/teacher-actions.js` · `locales/ar.trn.js` · `locales/en.trn.js` | **64** | **2** | **64** |
| **D-2** (orphan frozen) | **0** | **0** | **0** | **0** | **0** — documentation (`page-reachability-register.md` §§4–7) + an **additive** smoke guard freezing the orphan set as exactly `{gallery.html, gallery.en.html}`. `gallery` is absent from every sidebar today (`grep -c gallery public/dashboard.html` → **0**) and stays absent. |
| **D-3** (`langUrl`) | `enhance.js` (**1**, one line) | `js/enhance.js` (**1**, fetched by 114 pages) | **0** | **0** | **0** |

D-3's whole contribution to the HTML corpus is **zero bytes**. This is the cleanest possible demonstration of why the
taxonomy exists: a one-line change to a module that every page loads produces **no page change at all** in this build.

---

## 6. The 0-diff wall

### 6.1 Wall files — byte-identical to `21502af`, unconditionally

```
package.json
scripts/build-html.mjs                     (no page added; PAGES stays 57)
scripts/build-assets.mjs · scripts/vendor-assets.cjs
src/js/i18n.js                             (no new locale module registered)
src/js/components/sidebar.js               ← langRoute() is ALREADY hash-aware (Spec 035); the CORRECT half
                                             of route parity. Touching it is scope creep. 0-diff.
src/js/components/tabs.js                  (D-1 reuses the widget as-is)
src/js/components/form-field.js
src/js/components/settings-section.js
src/js/components/preview-drawer.js        (formDrawer untouched; its default reasonKey copy sweep = Spec 044)
src/js/components/ui.js                    ← THE REAL PATH. There is NO src/js/ui.js. Any artifact or test
                                             citing "src/js/ui.js" is citing a file that does not exist.
src/js/components/topbar.js · components/dropdown.js   (the language control's markup/ARIA/copy: 0-diff — D-3
                                                        changes the destination URL, never the control)
src/js/pages/staff.js · src/js/fixtures/staff-management.js
src/js/fixtures/settings.js · fixtures/form-options.js · fixtures/teacher-management.js · fixtures/teachers.js
every other src/js/pages/*.js · every other src/js/fixtures/*.js · every other src/locales/*.js
every portal source + fixture (family · teacher · student · hub)
public/assets/app.css                      (see §2.2 — a diff here means a new CSS class: STOP)
```
**NO** new dependency · component · page · `PAGES` entry · `data-*` hook · storage key · locale module · CSS class.
D-1 reuses `data-tabs` / `data-tab` / `data-tabpanel` + the existing `academy.schedView.<group>` key; D-3 introduces no
mechanism whatsoever.

### 6.2 The TWO declared supersessions of `impact-boundary.md` §4 (named, bounded, and the only ones)

| # | File | `impact-boundary.md` §4 said | This contract declares | Bound |
|---|---|---|---|---|
| **W-1** | `src/js/enhance.js` | 0-diff under Option A (moves only under the rejected Option B) | **ONE line** — `langUrl()` (`enhance.js:237-241`) returns `(lang === 'en' ? \`${base}.en.html\` : \`${base}.html\`) + location.hash`. Call site `enhance.js:553` unchanged. This is **D-3**, a defect promoted *after* `impact-boundary.md` was written and unknown to it. It is **not** Option B: no router, no `#drawer=` mechanism, no new URL state, no new hook. | `git diff -U0 -- app/src/js/enhance.js` must show **exactly one changed line**, inside `langUrl()`. Any second hunk ⇒ STOP. |
| **W-2** | `src/js/components/teacher-actions.js` | on the wall (“the drawers already exist; NO option adds or edits a drawer template”) | **In the allowlist.** Forced by grounding: `teacherFields(p, withGeo)` is **module-private** (`teacher-actions.js:47-63`) and `teacherAddDrawer()` is called **only** by `pages/teachers.js:112` (`grep -rn teacherAddDrawer src/js` → 2 hits: the definition and that one call). The `add` tab panel needs the same field body, and duplicating it would create **two definitions of 13 `field()` controls** — precisely the duplication D-1 exists to forbid. So the field body is **extracted once** and consumed by the panel. | The change is confined to the add-form field body + its consumers. `teacherEditDrawer()` / `teacherNoteDrawer()` / `teacherActions()` **0-diff** ⇒ `teacher.html` / `teacher.en.html` bodies **byte-identical** (they are among the 62 sidebar-only admin files; `FORM_DRAWERS_032.teacher = ['trn-edit','trn-note']` stays byte-verbatim). |

**No third supersession may be declared during implementation.** A file outside §2.1 that needs to change means the
architecture was mis-derived ⇒ **STOP and re-plan** (§8, STOP-1).

### 6.3 Why the D-3 wall exception cannot metastasize

| Guard | Assertion |
|---|---|
| Line-bounded | `git diff --numstat -- app/src/js/enhance.js` → `1 1 …` (one insertion, one deletion) |
| Mechanism-bounded | 0 new `data-*` hook · 0 new storage key (`grep -c "localStorage" src/js/enhance.js` unchanged) · 0 new listener (**no** `hashchange` handler is added — the tabs engine's precedence stays *hash → stored → baked first*) |
| Behaviour-bounded | `location.search` is **still dropped** — the pre-fix helper only ever read `location.pathname`, the app is static and uses no query strings, and preserving `search` would be a behaviour change **beyond** the minimal fix. **Not adopted; recorded here explicitly rather than silently.** |
| Control-bounded | `topbar.js` / `dropdown.js` / `settings-section.js` 0-diff — the language *control* is untouched; only the URL it navigates to gains the fragment |

---

## 7. Symbol disposition inside `teacher-actions.js` (impact-equivalent; owner named)

**The disposition is DECIDED and no longer differs between artifacts** (an earlier draft of `plan.md` §10.1 said
“retained as exports, uncalled”; that reading is **withdrawn**). The symbol-level disposition is owned by
`d1-teacher-route-contract.md` §6 and is now stated identically in `plan.md` §3.3, `research.md` R-13, `quickstart.md`
§2.2 and `scope-guard.md` §1.1:

| Symbol | Disposition |
|---|---|
| `teacherFields(p, withGeo)` | **EXPORTED** — the single definition of the 13 controls (+ inner CV gate) |
| `teacherAddDrawer()` | **REPURPOSED → `teacherAddPanel()`** (a dead-but-callable `formDrawer('trn-add',…)` would re-arm the `f-trnAdd-*` duplicate-id collision — rejected) |
| `addTeacherAction()` | **REMOVED** with its sole call site |
| `teacherEditDrawer()` · `teacherNoteDrawer()` · `teacherActions()` | **0-diff** ⇒ `teacher.html` **BODY** byte-identical (the whole FILE differs in exactly the 2 changed sidebar hrefs — it is one of the 62 sidebar-only admin pages; whole-file identity was never achievable and is not claimed) |

Note this choice **cannot move any impact level** — an uncalled builder emits nothing, so L2–L5 are identical either
way; it is decided on *correctness* (one live definition, no re-armable collision), not on impact. What this contract
binds, at L4, is the **output**:

> **B-1.** After 041, `public/teachers.html` and `.en` MUST contain **no** `template[data-preview="trn-add"]` and **no**
> `template[data-preview="trn-categories"]`, and **no** `[data-drawer="trn-add"]` / `[data-drawer="trn-categories"]`
> trigger. Their content lives in the `add` / `categories` tab panels. A surviving template alongside the panel is the
> **duplicate-`id` (`f-trnAdd-*`) collision** the MOVE exists to prevent (templates are inert while baked but become live
> DOM when `enhance.js` clones them) ⇒ **STOP**.
> **B-2.** `template[data-preview="trn-edit"]` **stays** on `teachers.html` (card-kebab host) **and** on `teacher.html`.

---

## 8. STOP conditions (any one fires ⇒ halt; do not commit)

| # | Condition |
|---|---|
| **STOP-1** | **Silent allowlist expansion** — any file under `app/src/**` outside the 6 of §2.1 shows a diff; or any `public/assets/**` file outside the 6 of §2.2 shows a diff (**including `app.css`**). |
| **STOP-2** | `src/js/enhance.js` diff ≠ **one line inside `langUrl()`** (W-1), or `enhance.js` gains a listener / hook / storage key. |
| **STOP-3** | `sidebar.js` · `tabs.js` · `preview-drawer.js` · `form-field.js` · `components/ui.js` · `i18n.js` · `build-html.mjs` · `package.json` non-zero diff (§6.1). |
| **STOP-4** | **L4 ≠ 2.** A third changed `#page-body`, or either `teachers` body failing to change. Equally: `teacher.html` / `teacher.en.html` body changing (W-2 bound). |
| **STOP-5** | **L5 ≠ 64.** Any of the 50 portal files or `index.html` differing **as a whole file**; or a non-admin file appearing in `git diff --name-only -- app/public/*.html`. |
| **STOP-6** | A destructive git operation used (`stash` / `reset --hard` / `checkout -- <path>` / `clean` / branch switch) — §4. |
| **STOP-7** | Baseline double-capture (§4 Step 1) not empty; or `index.html` “proven” unchanged via its (vacuous, empty) `#page-body` hash instead of a whole-file md5 (§3.3). |
| **STOP-8** | Any count invariant of §4 Step 4 broken (115 / 57 / 64 / 50 / 1 / 6 / 50 / 49-0-1 / `{}` / 24-25-1 / orphan set / `finance-analysis` absent). |
| **STOP-9** | A protected assert weakened beyond the **five declared D-1 supersessions** (S1 `smoke:88` · S2 `smoke:111` · S3 `smoke:115` · S4 `smoke:747-752` · S5 `smoke:1494-1495`, per `protected-test-register.md`). D-3 supersedes **zero** protected asserts. 041 may only **tighten**. |
| **STOP-10** | Any teacher pay/salary/rate/currency field, `type=password`, `type=file`, `<canvas>`, PDF/`window.open`, computed score/money, or fake save/success introduced on the teachers surfaces (`payHit` / `tchPay` / `famPay` / `payFigure` / `child-view` regexes stay byte-verbatim; the moved add form keeps its **CV-upload GATE** and its **single `backendRequired` Save**). |
| **STOP-11** | AR/EN `trn.*` key-set divergence ≠ 0. |
| **STOP-12** | Any commit or push by the implementing agent — the watcher commits. |

---

## 9. Acceptance

| # | Check | Expectation |
|---|---|---|
| **I1** | Preflight (§4 Step 0) | green; HEAD `21502af`; 115 HTML; 50 nav items |
| **I2** | Baseline double-capture (§4 Step 1) | empty diff; 115 md5 rows; **all distinct**; exactly 1 empty extraction (`index.html`) |
| **I3** | **L1** | `git diff --stat -- app/src` = exactly the **6** files of §2.1 |
| **I4** | **L2** | `git diff --name-only -- app/public/assets` = exactly the **6** mirrors of §2.2; `app.css` **absent**; `md5(src/js/enhance.js) == md5(public/assets/js/enhance.js)` |
| **I5** | **L3** | `.nav-panel` diff on any admin page = **only** the 2 `teachers` rows gaining `#view=add` / `#view=categories`; item count **50**; AR→`teachers.html#…`, EN→`teachers.en.html#…` |
| **I6** | **L4** | `#page-body` md5 diff vs `21502af` = **exactly 2 lines** (`teachers.html`, `teachers.en.html`); the other 62 admin + 50 portal bodies unchanged |
| **I7** | **L5** | whole-file HTML diff = **exactly 64** (all admin); the **51** non-admin files (50 portal + `index.html`) **byte-identical as whole files** |
| **I8** | D-3 HTML impact | **0** bodies and **0** whole HTML files (the asset is separate and the `<script>` src is unversioned — B4) |
| **I9** | Wall supersessions | exactly **two** (W-1 `enhance.js` one line · W-2 `teacher-actions.js` field-body extraction); no third declared |
| **I10** | Output bound B-1 / B-2 (§7) | no `trn-add` / `trn-categories` template or trigger left on `teachers.html`/`.en`; `trn-edit` still present there **and** on `teacher.html` (body byte-identical) |
| **I11** | Non-destructive method | transcript shows `git show` (and/or a detached worktree) only — **no** stash/reset/checkout/clean/branch-switch |
| **I12** | Counts (§4 Step 4) | all held; the only movement is the declared route **re-classification** 22→24 deep / 27→25 plain (24+25+1 = 50) |

---

## 10. Reconciliation ledger (every claim, traced)

| Claim | Source of truth | Status here |
|---|---|---|
| D-1 = Option A (MOVE); routes `#view=add` / `#view=categories`; 5 protected-test supersessions | `d1-teacher-route-contract.md`, `plan.md` §§3, 8, `protected-test-register.md` | **cited, priced** — not re-decided |
| D-2 = Option A (orphan frozen; owner = frontend/design-system maintainer; additive guard) | `d2-gallery-orphan-contract.md`, `page-reachability-register.md` | **cited** — 0 impact at all five levels |
| D-3 = one-line `langUrl()` fix; narrow `enhance.js` wall supersession; `search` deliberately not preserved; the settings two-`[data-set-lang]` test trap | `d3-language-hash-contract.md`, `plan.md` §4 | **cited**; W-1 formalised here |
| Frozen counts (115 / 57 / 64 / 50 / 1 / 6 / 50 / 49-0-1 / `{}` / 24-25-1) | `count-freeze-contract.md`, `route-inventory-contract.md` | **re-asserted**, not redefined |
| `teacher-actions.js` belongs in the allowlist | grounded live: `teacherFields` private (`teacher-actions.js:47-63`); `teacherAddDrawer` sole caller `pages/teachers.js:112` | **W-2**, declared supersession of `impact-boundary.md` §4 |
| The shared asset is `public/assets/js/enhance.js` (a `cpSync` copy), **not** a bundled `public/assets/app.js` | grounded live: `scripts/build-assets.mjs`, `build-html.mjs:191`, `md5sum` (B1–B4) | **corrected everywhere** — `plan.md` §11, `d3-language-hash-contract.md` §5.1/§9, `research.md` R-24 and `protected-test-contract.md` §8 now all carry the grounded identifier. Every conclusion stands and one strengthens: **0 whole-file HTML change from D-3.** |
| The `#page-body` sed has no closing marker and extracts body-onward-to-EOF; `index.html`'s extraction is empty | grounded live (`grep`, line arithmetic 458→880, empty-string md5) | **documented**, with the §3.3 anti-vacuity guard |
| `common.backendRequiredNote` copy sweep | `plan.md` §10.4 (CF-1) — owner **Spec 044** | **not swept in 041**; sweeping it would change ~50 bodies and breach L4 = 2 |

**Roadmap-provenance caveat (binding):** the committed corpus charters **only Spec 041**. **Specs 042–057** (incl. the
044 copy-sweep owner cited above) are a **maintainer-directed, append-only amendment — not chartered specs**. The
assignment binds whichever spec is chartered into that slot.
