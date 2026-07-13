# Contract — Impact Boundary (Spec 041)

Baseline **HEAD `21502af`** ("feat: implement settings deep linking architecture and add technical specification
contracts" — Spec 040 committed). Working tree **CLEAN (0 entries)** at baseline capture; during the specify pass the
only additions are the untracked `specs/041-route-sidebar-production-freeze/` artifacts and the speckit-managed
`.specify/feature.json`. All diff/md5 proofs in this contract are taken against `21502af`, never against the
CLAUDE.md-stale `4cbcb31`.

**This document governs two disjoint scenarios.** Spec 041's **specify** round is **SPECIFY ONLY** (per the brief —
see §5): it authors no source/test/HTML change, and **no fix has been applied or chosen**. §1 states the zero-impact
floor (what a specify round is permitted to touch at all). §2 defines, for D-1, the blast-radius **ceiling** that
WOULD apply once `/speckit.plan` adopts one of the canonical options — so that round inherits a pre-agreed ceiling
instead of re-deriving one.

**Option lettering is canonical and shared.** D-1 options are **A–G** and D-2 options are **A–D**, exactly as defined
in `spec.md` §7. This contract prices those same letters; it defines no option set of its own.

---

## 0. Scope recap (from the audit — do not re-derive, cite)

| Finding | Class | Status |
|---|---|---|
| **D-1** — `teachers` / `addTeacher` / `teacherCategories` all → bare `teachers.html`, no hash, no drawer-open-on-load mechanism | genuine route defect (misleading destination) — classification **5** | **OPEN.** Recommendation **Option A** (distinct `#view=` fragments on `teachers.html`); the choice is `/speckit.plan`'s. SC-18 requires it **closed**, not merely recorded. §2 prices every option. |
| **D-2** — `gallery.html`/`.en` orphaned (reachable by URL only, no owner/entry path documented) | documentation gap, not a route defect | **OPEN.** Recommendation **Option A** (document owner + entry path in `page-reachability-register.md` §§4–7 + an additive orphan-set assert). **0 app-source and 0 HTML impact under every non-rejected option** — no file in this contract's allowlist moves for D-2. |
| **S-1** — `salaries` + `staffSalaries` both → `finance.html#view=salaries` | intentional, already documented (Spec 038) | **CLOSED as intentional** — re-affirmed in `spec.md` §7; **0 impact**; must never be "de-duplicated". |

---

## 1. The specify-round floor (what Spec 041's SPECIFY pass may touch — and did)

The **entire** blast radius of the specify round is documentation:

| Set | Files | Count | Change |
|---|---|---|---|
| Spec artifacts | `specs/041-route-sidebar-production-freeze/*.md` | this directory only | new documentation |
| `CLAUDE.md` | root | 1 | *(FR-019, a later round)* HEAD pointer `4cbcb31`→`21502af`; Spec-039/040 status corrected from "awaiting the watcher commit" to committed |
| `app/README.md` | 1 | *(optional)* roadmap-sync note, mirroring prior specs' practice |
| `app/screenshots/REVIEW.md` | 1 | *(optional)* only if a later 041 round captures verification screenshots |
| **Application source** (`app/src/**`) | — | **0** |
| **Public HTML** (`app/public/*.html`) | — | **0** |
| **Tests** (`app/tests/**`) | — | **0 in the specify round.** The additive coverage 041 specifies (the derived+seeded 22-deep-link matrix, fragment resolution, orphan-set assert, the `run.cjs:2580` stale comment) is **test-only, additive, and weakens no protected assert** — it lands in a later round, still 0 app-source / 0 HTML. |
| **`package.json` / `build-html.mjs` / `nav.config.js`** | — | **0 in the specify round** (`nav.config.js` moves only under an adopted D-1 option — §2). |

**This floor is not a verdict on D-1.** "Do nothing" is canonical **Option F**, and this spec **rejects** it: D-1 has
shipped since Spec 036, but longevity is not honesty — *a declaration does not make a destination honest*, and SC-18
requires the destination to resolve to the surface its label names.

---

## 2. D-1 blast-radius ceiling, per canonical option (A–G)

**Only one option may be adopted, and only by `/speckit.plan`.** Every option is scored against the invariants that
MUST hold after the fix exactly as before it: page count **115** · `PAGES` **57** · admin menu **50** · planned **0** ·
exactly **1** honest lock · `FUTURE_ROUTES` = `{}` · **0** new `data-*` hook · **0** new storage key · **0** new
dependency. An option that cannot satisfy all of them is out of scope for **any** spec, not just 041.

### Option A — distinct `#view=` fragments on `teachers.html` (the `books` pattern) — **RECOMMENDED**

Give `teachers.html` a real tab group via the existing `tabs()` + `#view=` machinery (the current directory becomes
the default tab) and route `addTeacher` → `teachers.html#view=add`, `teacherCategories` → `teachers.html#view=categories`.
The exact mechanism every promoted item has used since Spec 035. The `trn-add` / `trn-categories` drawer bodies are
**not** redesigned — the entry path is relocated, so 044 and 056 are not trespassed on.

| Set | Files | Count | Change |
|---|---|---|---|
| `src/js/nav.config.js` | 1 | 2 route strings gain a fragment |
| `src/js/pages/teachers.js` | 1 | body → tab group (directory becomes the default tab) |
| `src/locales/ar.trn.js` · `en.trn.js` | 2 | 2 mirrored tab labels |
| Public HTML — **body-changed** | `teachers.html` · `teachers.en.html` | **2** | the ONLY non-empty `#page-body` diff permitted under this option |
| Public HTML — sidebar-only | the other **62** admin files | 62 | `#page-body` **byte-identical**; 2 `.nav-item` hrefs gain a hash |
| Public HTML — byte-identical | the **51** non-admin files (**50 portal + `index.html`**) | 51 | **0 bytes** |
| Tests | `tests/smoke/run.cjs` | 1 | **additive**: the 2 new routes join the derived deep-link matrix (22 → 24 `#view=` routes, each seeded/discriminating). The route-uniqueness assert (T-06) flips RED→GREEN. `enhance.js` **0-diff**. |

**Counts after: 115 / 57 / 64 / 50 / 49 implemented / 0 planned / 1 lock — ALL HELD.** Deep-links 22 → **24**, plain
routes 27 → **25** (the two items stop colliding with `teachers`); 24 + 25 + 1 = 50 ✅. *(This is the one arithmetic
consequence the plan must carry into the frozen route-split figure — a **route re-classification**, not a count
change, and expressly permitted by `count-and-freeze-contract.md` §5's D-1 freeze rule, which leaves precisely these
two route strings open for correction without invoking the §8 supersession law.)*

### Option B — a drawer-hash router (`#drawer=trn-add`) in `enhance.js` — REJECTED here

| Set | Files | Impact |
|---|---|---|
| `src/js/enhance.js` | 1 | **BREACHES THE 0-DIFF WALL** — held at 0-diff by every spec 031–040 |
| `src/js/nav.config.js` | 1 | 2 routes gain a fragment |
| Public HTML | 64 sidebar-only · 51 untouched | `#page-body` byte-identical |

❌ **Out of bounds for 041.** A new URL-state mechanism is a **modal/drawer interaction-system** change → **Spec 044**
(FO-23). It also opens a general-purpose deep-link surface no other item uses. *(Note: 042 is the legacy-coverage
re-audit and does **not** own `enhance.js` interaction mechanisms — 044 does.)*

### Option C — demote both to honest locks | ❌ dishonest by omission

`nav.config.js` only; 64 sidebar files re-render; menu HELD 50; locks **1 → 3**. The target surfaces already exist and
already work — locking a working surface is a lie in the other direction (Spec 040 rejected exactly this for
`settingsUsers`). It also breaks the "exactly ONE honest lock" standing law.

### Option D — delete the two items | ❌ violates zero-deletion

Menu **50 → 48**; would require a declared supersession of the 50-item freeze (asserted at 5 independent sites:
`navCount32===50`, `nav040.menu===50`, the finance and content page checks, and the `nav.config` SOURCE audit
`allItems.length===50`) — and would silently retire two capabilities the legacy crawl proves existed.

### Option E — a standalone `add-teacher.html` | ❌ breaks the count freeze

Count 115 → **117**, `PAGES` 57 → 58. Already rejected by Spec 036 on honesty grounds, and form completeness is 056.

### Option F — record as a documented exception (no code change) | ❌ rejected

0 source / 0 HTML / 0 test — the smallest possible footprint, and the reason it is still **rejected**: it is
Spec 036's "fold-anchor" declaration repeated. **A declaration does not make a destination honest.** Recording ≠
closing (SC-18). *(Contrast S-1, which is legitimate precisely because its shared tab visibly contains both subjects.)*

### Option G — relabel only (truth-in-labeling patch) | ⚠️ rejected — weaker than A at the same blast radius

| Set | Files | Count | Change |
|---|---|---|---|
| `src/locales/ar.adm.js` · `en.adm.js` | 2 | 2 mirrored label pairs reworded |
| `src/js/nav.config.js` | 1 | **0-diff** — routes, ids, status untouched |
| Public HTML — sidebar-only | the **64** admin files | 64 | `#page-body` **byte-identical**; only the 2 `.nav-item` label text nodes differ |
| Public HTML — byte-identical | the **51** non-admin files (50 portal + `index.html`) | 51 | **0 bytes** |
| Tests | any assert pinning the old label text | — | declared supersession, per the §4 scope-guard precedent |
| Locale | AR/EN `adm.*` key-set divergence must stay **0** | — | mirrored edit or nothing |

It stops the label lying, but the three items remain **indistinguishable by outcome** (one destination; the form still
needs a second, undocumented click) and two legacy capabilities are quietly retired. Same 64-file sidebar footprint as
Option A, less honesty. Rejected.

---

## 3. Non-destructive verification method (binding on whichever round executes a fix; also usable to re-prove Scenario 0)

**Never used, at any point:** `git stash`, `git reset --hard`, `git checkout -- <path>`, `git clean`, a branch
switch. A detached temporary `git worktree add --detach` is an acceptable alternative to `git show` for bulk
diffing; if used, remove only that worktree afterward (`git worktree remove`) — never touch the primary tree.

### Step 1 — Preflight gate (before any source edit)
```bash
git rev-parse --short HEAD                                     # must read 21502af (or a committed successor)
git status --short                                             # only specs/041…/ (+ the speckit .specify/feature.json)
find app/public -maxdepth 1 -name '*.html' | wc -l              # 115
npm run build && npm run test:smoke && npm run test:a11y        # green
```
If any of these fail against `21502af`, **STOP** — the diff/md5 math below is invalid against a dirty or wrong
baseline.

### Step 2 — Capture the pre-edit baseline for ALL 115 pages, two independent ways
```bash
# (a) from the COMMITTED HEAD via git show — the authoritative capture
for f in $(git show 21502af --stat --name-only | grep '^academy-dashboard-discovery/app/public/.*\.html$'); do
  git show "21502af:$f" \
    | sed -n '/<div[^>]*id="page-body"/,/<\/div><!-- \/page-body -->/p' \
    | md5sum | awk -v f="$f" '{print f"  "$1}'
done > scratchpad/spec041-baseline-md5-gitshow.txt

# (b) from the current (pre-edit) build output — cross-check that the worktree already equals 21502af
for f in app/public/*.html; do
  sed -n '/<div[^>]*id="page-body"/,/<\/div><!-- \/page-body -->/p' "$f" | md5sum | awk -v f="$f" '{print f"  "$1}'
done > scratchpad/spec041-baseline-md5-worktree.txt
diff scratchpad/spec041-baseline-md5-gitshow.txt scratchpad/spec041-baseline-md5-worktree.txt
# EXPECT: empty diff (mod path prefix)
```
`#page-body` extraction boundary = the `id="page-body"` div emitted by `shell-markup.js`/`portal-shell.js`, exactly
as used by every prior nav-completion spec's impact contract (034–040).

### Step 3 — Apply the adopted option's source edits (per §2's table for that option only); rebuild.

### Step 4 — Capture the post-edit build the same way, diff against the baseline
```bash
for f in app/public/*.html; do
  sed -n '/<div[^>]*id="page-body"/,/<\/div><!-- \/page-body -->/p' "$f" | md5sum | awk -v f="$f" '{print f"  "$1}'
done > scratchpad/spec041-postbuild-md5.txt
diff scratchpad/spec041-baseline-md5-gitshow.txt scratchpad/spec041-postbuild-md5.txt
```
**Expected result, per canonical option:**

| Option | `#page-body` md5 diff vs `21502af` |
|---|---|
| **A** (recommended) | **exactly 2 lines** — `teachers.html` and `teachers.en.html`. **Any third differing body is a defect in the fix, not in the baseline: HALT.** The other 62 admin files are sidebar-only (body md5 unchanged); the 51 non-admin files are byte-identical. |
| **B** (drawer-hash) | **EMPTY** — routes only; but it breaches the `enhance.js` 0-diff wall (§4), which is why it is rejected. |
| **F** / no fix | **EMPTY** — 0 of 115 bodies differ. |
| **G** (relabel) | **EMPTY** — a locale-label change never crosses the `#page-body` extraction boundary. |
| **C / D / E** | rejected; not priced. |

Option A is the only non-rejected option with a non-empty body diff, and it is **bounded to 2 files, declared up
front** — the same discipline Spec 040 used when it had to prove a non-empty `settings.html` body diff. Everything
else stays a route/label correction, never a content rewrite.

### Step 5 — Sidebar-only spot-check (Options A / B / G, generalizable across the 64)
```bash
git show 21502af:academy-dashboard-discovery/app/public/dashboard.html \
  | sed -n '/<nav class="nav-panel"/,/<\/nav>/p' > scratchpad/spec041-navpanel-before.txt
sed -n '/<nav class="nav-panel"/,/<\/nav>/p' app/public/dashboard.html > scratchpad/spec041-navpanel-after.txt
diff scratchpad/spec041-navpanel-before.txt scratchpad/spec041-navpanel-after.txt
# EXPECT: only the 2 D-1 nav rows change (href gains a #view= fragment under A/B; label text under G);
#         everything else in the shared .nav-panel is identical
```

---

## 4. Files that MUST remain 0-diff regardless of scenario or adopted option

The following are **forbidden to change** under the specify round and under **every** canonical option — with exactly
two declared, option-scoped exceptions, named here so no round can claim ambiguity:

* **`src/js/enhance.js`** — 0-diff under the specify round and under Options **A · C · D · E · F · G**. It moves
  **only** under Option **B** (the drawer-hash router) — which is precisely why Option B is rejected and handed to
  **Spec 044** (FO-23).
* **`src/js/pages/teachers.js`** — 0-diff under every option **except A**, where it hosts the new tab group. The
  `trn-add` / `trn-categories` **drawer bodies stay unchanged in all options** (pay-free, password-free, CV-upload
  GATE, backendRequired Save); Option A relocates the entry path, it does not redesign the form.

```
package.json
scripts/build-html.mjs
src/js/i18n.js
src/js/components/tabs.js
src/js/components/sidebar.js
src/js/components/form-field.js
src/js/components/settings-section.js
src/js/components/preview-drawer.js
src/js/components/ui.js                (the wall file; there is no src/js/ui.js)
src/js/pages/staff.js
src/js/components/teacher-actions.js   (the drawers already exist; NO option adds or edits a drawer template)
src/js/fixtures/settings.js
src/js/fixtures/staff-management.js
src/js/fixtures/form-options.js
src/js/fixtures/teacher-management.js
every other src/js/pages/*.js           (except pages/teachers.js — Option A only)
every other src/js/fixtures/*.js
every other src/locales/*.js            (ar/en.trn.js move ONLY under Option A; ar/en.adm.js ONLY under Option G)
every portal / teacher / family / student page source and fixture
src/js/enhance.js                       (Option B ONLY — see above)
```

**Verification:**
```bash
git diff --stat -- app/src            # must show ONLY the files named in the adopted option's table (§2),
                                      # or be completely empty in the specify round
git diff -- app/package.json                    # empty, always
git diff -- app/scripts/build-html.mjs          # empty, always — no option adds a page
```

---

## 5. STOP conditions

### 5.1 Verbatim from the brief (binding on this spec's own authoring, unconditionally)

> "SPEC 041 IS AN AUDIT / FREEZE SPECIFICATION. It is NOT a redesign, feature, form-completion, integration,
> privacy-backend or community spec."

> "If the audit finds a genuine defect, specify the SMALLEST honest fix and its exact impact — but this is
> SPECIFY ONLY: no plan, no tasks, no implementation, no source/test/HTML change."

> "Standing laws that remain binding: teacher pay-free (global) · family zero-pay · student child-view · finance
> no-fake-money · no-secret · no-fake · closed data-* hook set (no new hook, no new storage key, no new
> dependency) · page count 115 · admin menu 50 · exactly ONE honest lock (classSalaryReport) · hiding a nav link
> is NOT authorization (real enforcement is owned by a later backend spec)."

And, from the maintainer-directed redefinition this brief also carries forward
(`040-settings-deep-links-subpages/future-owner-register.md` §3, binding on 041): **"NO real integrations may be
assigned to Spec 041"** and **"041 is NOT the final product freeze"** (the final freeze is **057**). Option **B**'s
`enhance.js` change is a UI-mechanism change, not an integration — but it is still barred here, because it breaches
the 0-diff wall and belongs to **044** (FO-23).

### 5.2 Derived STOP conditions (any one fires ⇒ halt, do not commit — applies to whichever round executes a fix)

1. Any diff in a §4 forbidden file, outside the two declared option-scoped exceptions (`enhance.js` under **B**;
   `pages/teachers.js` under **A**).
2. Public HTML ≠ **115** · `PAGES` ≠ **57** · `.nav-panel .nav-item` ≠ **50** on any admin page.
3. Sitewide planned ≠ **0** · `[data-coming-soon]` ≠ **0** · disabled locks ≠ **1** (`classSalaryReport`, never
   unlocked, never joined) · `FUTURE_ROUTES` ≠ `{}` · `finance-analysis` invented anywhere.
4. Any new `data-*` hook, new localStorage key, or new dependency. *(Option A adds **no** hook — it reuses
   `data-tabs`/`data-tab`/`data-tabpanel` + the existing `academy.schedView.<group>` key.)*
5. **`#page-body` drift beyond the adopted option's declared allowlist** (Step 4, §3): Options **B / F / G** ⇒ the
   body diff must be **EMPTY** (0 of 115); Option **A** ⇒ **exactly 2** (`teachers.html`, `teachers.en.html`). A
   third differing body under A, or any differing body under B/F/G, means the round drifted — halt.
6. Any teacher pay figure, family currency figure, or student «لوحة الطالب»/«بوابة الطالب» token introduced on
   `teachers.html`/`.en` or any of the 64 admin sidebar files (payHit/tchPay/famPay/payFigure/child-view regexes stay
   byte-verbatim per the protected register; the `trn-add` drawer stays pay-free and password-free, CV-upload gated).
7. Any protected smoke/a11y assert **weakened**, or changed without a declared supersession named in the adopted
   option's row of §2 (no silent edits to `nav010`, `truth010`, `deadNav`, `links010`, `navCount32===50`, the lock
   asserts, or the route-freeze-115 assert at `smoke:2583`). 041 may only **tighten**.
8. AR/EN locale key-set divergence ≠ **0** (`trn.*` under Option A; `adm.*` under Option G).
9. Option **C**, **D** or **E** adopted (they break the 1-lock / 50-item / 115-count laws) without a separately
   declared, explicit supersession — per §2 all three are REJECTED.
10. Any commit or push performed by the authoring agent — per every prior spec's process guard, **the watcher
    commits**; and no `plan.md` / `tasks.md` is written by a spec-authoring round.

---

## 6. Acceptance

| # | Check | Expectation |
|---|---|---|
| I1 | Preflight (§3 Step 1) | green, HEAD = `21502af` |
| I2 | Baseline double-capture agreement, all 115 pages (§3 Step 2) | empty diff |
| I3 | Post-edit `#page-body` diff (§3 Step 4) | **Option A: exactly 2** (`teachers.html`/`.en`) · **Options B/F/G: 0 of 115** |
| I4 | Sidebar-only spot-check (§3 Step 5), Options A/B/G | only the 2 D-1 nav rows differ inside `.nav-panel`; every other admin file's body md5 unchanged |
| I5 | Source diff surface (§4) | matches exactly the adopted option's table in §2 — no extra file; `enhance.js` 0-diff unless Option B; `pages/teachers.js` 0-diff unless Option A |
| I6 | Page count | `find app/public -maxdepth 1 -name '*.html' \| wc -l` = **115**; `PAGES` = **57** |
| I7 | Admin menu | `.nav-panel .nav-item` = **50** on every admin page; 49 implemented / 0 planned / **1** lock |
| I8 | No forbidden git operation used (§3 preamble) | manual review of the implementation transcript |
| I9 | This spec-authoring (specify) round itself | **0 source / 0 test / 0 HTML files touched**; no fix applied; no option chosen (SPECIFY ONLY, §5.1) |
| I10 | D-1 / D-2 | presented as **findings with options + a recommendation** — never as completed work (SC-18 / SC-19 are closed by a later round, not by this one) |
