# Mutation Execution Contract — Spec 041 Plan

**Feature**: 041 — Full Frontend Route & Sidebar Production Freeze (BASELINE freeze + D-1/D-2/D-3).
**Baseline**: HEAD `21502af` · Spec 040 committed · PR #13 merged (`13d38af` on `origin/main`) · in sync · tree
clean except the 041 artifacts + `.specify/feature.json`. 115 HTML · 57 `PAGES` · 64 admin files · 50 portal files
· 1 index · admin menu 50 (control 12 · families 9 · teachers 6 · reports 11 · admin 5 · settings 7) · implemented
49 · planned 0 · disabled 1 · `FUTURE_ROUTES {}` · one lock (`classSalaryReport`).
**Status**: PLAN artifact. Executable contract, **not** an execution log and **not** `tasks.md`. It changes no
application source, no test, no HTML, and authorizes no commit.

**Decisions are closed** and are not re-opened here: **D-1 = Option A (the MOVE architecture** — the `trn-add` /
`trn-categories` form bodies MOVE into `teachers.html` tab panels; the two header buttons are removed; routes become
`teachers.html` / `#view=add` / `#view=categories`**)** · **D-2 = Option A (gallery stays a documented orphan)** ·
**D-3 = the one-line `langUrl()` fix** (`+ location.hash`). See `spec.md` §7, `count-and-freeze-contract.md`,
`d2-gallery-orphan-contract.md`, `route-inventory-contract.md`, `quickstart.md` §§2–3.

**Relationship to `mutation-test-register.md`** (the specify-round register): that file *discovered* the mutations
(M-1a…M-8) and the discrimination gaps (G-1…G-7) at the baseline suite. This file is the *execution contract* for
the **12 mutations the plan requires**, extends the canonical ids to **M-9…M-13**, and — the load-bearing addition —
splits every mutation into **Pass A** (run against the untouched baseline `21502af`, records what the *shipped*
suite catches) and **Pass B** (run against the implemented 041 tree, records what the suite catches **after** the
additive blocks T-01…T-10 land). No mutation is renumbered; no count, option set or message is re-litigated.

---

## 0. Reading key

| Column | Meaning |
|---|---|
| **#** | the ordinal in the plan brief's 12-mutation list |
| **id** | the canonical mutation id (continuous with `mutation-test-register.md`) |
| **build?** | whether `npm run build` must run before `npm run test:smoke` for the mutation to surface |
| **Pass A** | expected result at HEAD `21502af` with the **shipped** suite (no 041 test work) |
| **Pass B** | expected result on the implemented 041 tree (additive T-blocks + the S1–S5 relocations landed) |

Message provenance is marked on every expected message:
**[shipped]** = the exact string emitted by the assertion as it exists today (grounded in `tests/smoke/run.cjs` at
`21502af`) · **[contract]** = the normative message text an *additive* 041 assertion MUST emit; the tasks round
implements it verbatim, and any deviation is a contract failure, not a style choice.

Assertion mechanics (`run.cjs:37`): `ok = (c, m) => { if (!c) fails.push(m); }` — assertions **accumulate**, so a
single mutation reports once per `page/lang` iteration. Line counts below are exact, not approximate.
Failure protocol (`run.cjs:2590-2592`): a failing run prints `SMOKE FAILED:\n - <msg>…` and `process.exit(1)`; a
green run prints `[smoke] PASS — 114 page loads, no raw keys / external requests / dead buttons / unexplained
disabled controls` (`PAGES.length * 2` = 57 × 2 = 114) and `process.exit(0)`.

**Gate scope (binding, from `mutation-test-register.md` §2).** `tests/smoke/run.cjs` is the ONLY route/sidebar
**gate**. `tests/a11y/run.cjs` hard-gates on **`critical > 0` only** (`a11y/run.cjs:375` → `process.exit(1)`); `serious`
violations are counted and warned (`:368`, `:374`) and the accepted ship state is **serious = 0**, but they are **not**
themselves the exit gate — and a11y is route-insensitive in any case.
`tests/screenshots/capture.cjs` **never exits non-zero** (`capture.cjs:545 process.exit(0)`) — console-error counts
are advisory and MUST NOT be cited as mutation coverage. The single, disclosed exception is **M-12 in Pass A**,
where the screenshot frame pair is the *only* available proof precisely **because** no smoke assert exists yet —
that absence is the defect T-10 closes, and it is disclosed, never dressed up as coverage.

---

## 1. EXECUTION LAW (binding — violating any row voids the run)

| # | Rule |
|---|---|
| L-1 | **Two, and only two, permitted execution modes.** (a) **Detached worktree** — `git worktree add --detach $SCRATCH/spec041-mutate <commit>`; mutate **inside that worktree only**. (b) **In-place patch/revert** — write the mutation as a patch under `$SCRATCH/`, `git apply` it in the primary tree, run, then `git apply -R` the identical patch. |
| L-2 | **FORBIDDEN, without exception, in the primary working tree**: `git stash` · `git reset` (any mode) · `git checkout -- <path>` · `git restore` · `git clean` · **any branch switch**. The primary tree stays on `feature/012-role-portal-foundation` for the whole pass. |
| L-3 | `$SCRATCH` MUST be **outside** the repository working tree (the session scratchpad dir). Never `app/public/**`, never `app/src/**`, never inside `academy-dashboard-discovery/`. |
| L-4 | **Mode (a) is mandatory for Pass A** (a clean, committed `21502af` can be checked out detached). **Mode (b) is mandatory for Pass B** — the 041 tree is *uncommitted*, so a detached worktree cannot carry it; the mutation must be applied to, and reverted from, the live tree by an inverse patch. This is exactly why L-1 admits two modes. |
| L-5 | `git reset --hard <commit>` **inside the disposable detached worktree** is permitted (it is deleted afterwards regardless). It is never permitted in the primary tree. |
| L-6 | **One mutation at a time.** No stacking, except where a compound is explicitly named (M-3+M-4, §4.5). Between mutations the tree returns to the recorded pre-image (§2, md5 proof) before the next is applied. |
| L-7 | **The no-lie rule** (inherited, Spec 040): no mutation is ever *left in* to keep a probe alive. Every mutation in this contract is transient by construction; §4's "Removal" row is a gate, not a courtesy. |
| L-8 | Teardown: `git worktree remove --force $SCRATCH/spec041-mutate` + `git worktree list` (must not list it) + `git status --porcelain` (Pass A: empty; Pass B: exactly the sanctioned 041 edits, nothing more). |

### 1.1 Pre-image capture (run ONCE before each pass, in the tree that will be mutated)

```bash
cd .../academy-dashboard-discovery/app
npm run build && npm run test:smoke        # MUST print "[smoke] PASS — 114 page loads" and exit 0
md5sum src/js/nav.config.js src/js/enhance.js src/js/components/sidebar.js \
       src/js/fixtures/portal.js scripts/build-html.mjs src/js/pages/teachers.js \
       src/js/pages/settings.js src/js/components/teacher-actions.js \
       tests/smoke/run.cjs public/index.html  > $SCRATCH/pre.md5
```
`$SCRATCH/pre.md5` is the **removal oracle**: after every revert, `md5sum -c $SCRATCH/pre.md5` MUST print `OK` for
every listed file. A mutation that cannot be proven removed is a failed mutation.

### 1.2 Per-mutation loop (mode b; mode a is the same minus the patch bookkeeping)

```bash
# 1. author the mutation as a patch (never edit-and-remember)
$EDITOR $SCRATCH/mut-<id>.patch          # or: make the edit, `git diff > $SCRATCH/mut-<id>.patch`, then `git apply -R`
git apply --check $SCRATCH/mut-<id>.patch && git apply $SCRATCH/mut-<id>.patch
# 2. rebuild if the mutation must reach the rendered DOM (see the build? column)
npm run build
# 3. observe
npm run test:smoke ; echo "exit=$?"      # expect: SMOKE FAILED + exit=1 (except M-1b/M-12 in Pass A)
# 4. revert — the ONLY permitted revert
git apply -R $SCRATCH/mut-<id>.patch
md5sum -c $SCRATCH/pre.md5               # every line must say OK
# 5. post-mutation green proof
npm run build && npm run test:smoke ; echo "exit=$?"   # expect: [smoke] PASS — 114 page loads / exit=0
git status --porcelain                   # Pass A: empty · Pass B: only the sanctioned 041 edits
```

**Why `build` is almost always required.** `src/js/**` is copied to `public/assets/js/**` by
`scripts/build-assets.mjs` (`npm run build` = vendor-assets → build-assets → tailwind → build-html) and the sidebar
is **baked into every HTML file** by `scripts/build-html.mjs`. Pages load `./assets/js/enhance.js`
(`build-html.mjs:191`). The one build-free surface is the **Node-side nav.config SOURCE audit**
(`run.cjs:2512-2555`), which imports `../../src/js/nav.config.js` directly.

---

## 2. The 12 mutations at a glance

| # | id | Mutation | Target (file:line @ `21502af`) | build? | Pass A | Pass B |
|---|---|---|---|---|---|---|
| 1 | **M-1a** | route → **nonexistent** file (`staff` → `staff-members.html`) | `src/js/nav.config.js:99` | ✅ | **RED** `links010.badTarget` (`run.cjs:1823`) × 64 | **RED** + T-03 (source+DOM) |
| 2 | **M-1b** | plain route → **real but WRONG** file (`staff` → `library.html`) | `src/js/nav.config.js:99` | ✅ | 🟢 **GREEN — the headline gap G-1** | **RED** T-03 + T-05 (orphan) |
| 3 | **M-2** | wrong `#view=` fragment (`customization` → `customisation`) | `src/js/nav.config.js:119` | ✅ | **RED** `anchorOk040` (`:1568`) × 64 + source audit (`:2545`) × 1 | **RED** + T-02 + T-03 |
| 4 | **M-3** | `disabled` lock rendered as an **anchor** | `src/js/components/sidebar.js` (item render branch) | ✅ | **RED** at **6** independent sites | **RED** (identical, byte-verbatim) |
| 5 | **M-4** | `implemented` item marked **planned** (`settingsUsers`) | `src/js/nav.config.js:122` | ✅ | **RED** at 6 sites (`:253`, `:1574`, `:1568`, `:1539`, `:2549`, `:2544`) | **RED** + T-03 |
| 6 | **M-5** | **sidebar** AR/EN hash loss (`langRoute()` drops the fragment) | `src/js/components/sidebar.js:18-26` | ✅ | **RED** — EN admin files only (32 × 15) | **RED** + T-04 (mechanical parity) |
| 7 | **M-12** | **TOPBAR** language-switch hash loss (**the D-3 regression**) | `src/js/enhance.js:237-241` | ✅ | 🟠 **GREEN — disclosed gap** (no smoke assert exists pre-041) | **RED** T-10 (topbar-scoped) |
| 8 | **M-6** | role-inappropriate portal destination (admin `finance` in `ROLE_NAV.teacher`) | `src/js/fixtures/portal.js:159-168` | ✅ | **RED** teacher shell-anchor registry × 4 × 16 files | **RED** (identical) |
| 9 | **M-7** | **page-count drift** (58th `PAGES` base) | `scripts/build-html.mjs` (`PAGES`) | ✅ | **RED** route freeze (`:2583`) × 1 | **RED** + T-05 (the new base is also an orphan) |
| 10 | **M-8** | **menu-count drift** (51st nav item) | `src/js/nav.config.js` (any category) | ✅ | **RED** at 5 sites + 2 category-size pins | **RED** + T-03 (register cardinality) |
| 11 | **M-13** | a **new orphan page** (built, never linked) | `scripts/build-html.mjs` (`PAGES`) / `public/index.html` | ✅ | 🟢 **GREEN on orphanhood** (no orphan assert exists; only M-7's count assert fires) | **RED** T-05 (orphan set ≠ `{gallery.html, gallery.en.html}`) |
| 12 | **M-11** | **the D-1 regression** — `addTeacher` back at bare `teachers.html` | `src/js/nav.config.js:55` (post-D-1) | ✅ | n/a (this **is** the baseline state — D-1 is the defect) | **RED** T-06 + T-03 + S5 + T-01 |

Adjacent, already-registered mutations retained from the specify round and **not** part of this contract's 12 (they
prove the *engine*, not the *route*; `quickstart.md` §8 owns them): **M-9** (`initTabs` precedence
`hash || stored` → `stored || hash` → all 24 T-01 seeded rows RED; only 9/22 would have been RED pre-041 — the SC-08
delta proof) and **M-10** (rename a `data-tab` id on `settings.html`, `customization` → `customisation` → T-02 RED).
They are re-run in the same pass; they are listed here so the 12 are not confused with the full mutation suite.

**Post-041 totals**: 12 of 12 contract mutations RED in Pass B (vs **9 of 12** at Pass A). The three that flip —
**M-1b (G-1)**, **M-12 (D-3)**, **M-13 (D-2/E-12)** — are the exact evidence that 041's additive coverage closed
real holes rather than describing them.

---

## 3. Message-provenance table for the additive assertions (T-blocks)

These strings do **not** exist at `21502af`. They are the **normative contract** for the tests the implementing
round writes (`quickstart.md` §3.1 T-01…T-10). Every Pass-B expectation below quotes them verbatim.

| T | Assertion | Normative message **[contract]** |
|---|---|---|
| **T-01** | derived, group-aware, **seeded** deep-link matrix (24 rows × AR/EN) | `${file}/${lang} #view=${v}: seeded-context deep-link must open exactly the "${v}" panel of group "${group}", got "${actual}"` |
| **T-02** | fragment resolution — every `#view=` route's id exists as a `[data-tab]`/`[data-tabpanel]` on the AR **and** EN target | `nav.config: ${id} → ${route} — no [data-tab="${v}"] on ${file}.html` |
| **T-03** | the committed 50-item route register (source **and** rendered DOM), split 24 deep-link + 25 plain + 1 route-less | `nav.config: route register — ${id} must be ${expected}, got ${actual}` · DOM: `${page}/${lang}: ${id} href must be ${expected}, got ${actual}` · split: `nav.config: route split must be 24 deep-link + 25 plain + 1 route-less = 50, got ${d}/${p}/${r}` |
| **T-04** | AR/EN nav route parity — `route_en === langRoute(route_ar)`, fragment byte-identical | `nav.config: AR/EN parity — ${id} EN route must be ${expected}, got ${actual}` |
| **T-05** | orphan-set freeze — exactly `{gallery.html, gallery.en.html}` | `orphan freeze: the orphan set must be exactly {gallery.html, gallery.en.html}, got {${sorted}}` |
| **T-06** | route uniqueness — no two of the 50 share a route, exactly ONE registered exception (**S-1**: `salaries` / `staffSalaries` → `finance.html#view=salaries`) | `nav.config: duplicate route "${route}" shared by ${ids.join(', ')} (only S-1 salaries/staffSalaries → finance.html#view=salaries is sanctioned)` |
| **T-07** | group-awareness — a deep-link activates **only** its own `[data-tabs]` group's panel (folded into T-01; never a "one tabs widget per page" ban) | `${file}/${lang} #view=${v}: activated a panel outside group "${group}"` |
| **T-10** | **topbar** language switch preserves `location.hash` (the D-3 guard) | `${page}/${lang}: topbar language switch dropped the fragment — expected ${expectedHref}, got ${actualHref}` |

**T-10 test-design law (from the live-grounded trap — non-negotiable).** `settings.html` renders **TWO**
`[data-set-lang]` elements: the **topbar menu item** (`enhance.js:32` — `button.menu-item[role="menuitem"]
[data-set-lang]`, rendered into the popover) and the Customization tab's **real** language control
(`components/settings-section.js:16` — `button.tab[data-set-lang][data-lang-opt]`). A T-10 selector that is not
scoped hits the wrong control and **silently proves nothing**. The mandated sequence is:

```
goto(<file>.html#view=<v>) → click('[data-action="lang-menu"]')        // topbar.js:44 — opens the popover
                           → click('[role="menuitem"][data-set-lang="en"]')  // the MENU item, never [data-lang-opt]
                           → assert location.pathname endsWith '<file>.en.html'
                           → assert location.hash === '#view=<v>'
                           → assert the visible [data-tabpanel] is <v> (not the baked default)
```
Canonical row: `finance.html#view=banks` → EN → `finance.en.html#view=banks`, visible panel `banks` (the exact
live-reproduced defect). Minimum coverage: one AR→EN row and one EN→AR row on a page whose deep-link view is **not**
the baked default (`finance` default = `overview`), plus one row on `settings.html` **to exercise the two-control
trap itself**.

---

## 4. The twelve mutations in full

### 4.1 — #1 · **M-1a** — a route to a **nonexistent** file

**Exact changed line** — `src/js/nav.config.js:99` (category `admin`):
```diff
-      item({ id: 'staff', labelKey: 'nav.staff', icon: 'staff', route: 'staff.html' }),
+      item({ id: 'staff', labelKey: 'nav.staff', icon: 'staff', route: 'staff-members.html' }),
```
**build?** ✅ (the sidebar is baked into all 64 admin files; `public/assets/js/nav.config.js` is a build output).

| Pass | Failing assertion | Site | Expected message |
|---|---|---|---|
| A + B | link integrity — `links010.badTarget === 0` (computed `:1814-1816` after `const file = h.split('#')[0]` against `VALID_FILES`, `:41-43`) | `run.cjs:1823` | **[shipped]** `dashboard/ar: 1 link(s) to a nonexistent page file` — **64 lines** (one per admin `page/lang`; the sidebar is shared) |
| B only | the 50-item route register, source + DOM | T-03 | **[contract]** `nav.config: route register — staff must be staff.html, got staff-members.html` (+1 DOM line per admin `page/lang`) |

**Discrimination boundary (must stay GREEN — this is what makes M-1a diagnostic):** `deadNav` (`:180`) — the item
is still an anchor *with* an href; `navCount32 === 50` (`:1391`); the route/page freeze (`:2583`) — `PAGES` is
untouched; the nav.config source audit at baseline (`staff`'s route string is **not** pinned there — that is G-1);
every deep-link block.
**Removal**: `git apply -R $SCRATCH/mut-M1a.patch` → `md5sum -c $SCRATCH/pre.md5` → `nav.config.js: OK`.
**Post-mutation green proof**: `npm run build && npm run test:smoke` → `[smoke] PASS — 114 page loads` / exit 0;
`git status --porcelain` clean (Pass A) / only the sanctioned 041 edits (Pass B).

---

### 4.2 — #2 · **M-1b** — a plain route to a **real but WRONG** file (the headline gap)

**Exact changed line** — `src/js/nav.config.js:99`:
```diff
-      item({ id: 'staff', labelKey: 'nav.staff', icon: 'staff', route: 'staff.html' }),
+      item({ id: 'staff', labelKey: 'nav.staff', icon: 'staff', route: 'library.html' }),
```
**build?** ✅

| Pass | Result | Evidence |
|---|---|---|
| **A** | 🟢 **GREEN — exit 0.** The shipped suite does not catch it. | `library.html ∈ VALID_FILES` ⇒ `badTarget === 0`; `staff` is still an anchor ⇒ `deadNav === 0`; item count unchanged ⇒ `navCount32 === 50`; the source audit (`:2512-2555`) pins route **strings** for only **9 of 50** items (`materials`, `books`, `certificateRequests`, `settings×6`) and **none** of the 27 plain routes; `nav010` pins **ids**/ordering (`finMembers`, `finLinks`, `admItems`), never the `staff` href. **This is finding G-1**, recorded verbatim from `mutation-test-register.md` §4/M-1b. |
| **B** | **RED at two independent sites** | T-03 **[contract]** `nav.config: route register — staff must be staff.html, got library.html` (+ one DOM line per admin `page/lang`, 64) · T-05 **[contract]** `orphan freeze: the orphan set must be exactly {gallery.html, gallery.en.html}, got {gallery.en.html, gallery.html, staff.en.html, staff.html}` — repointing the **only** inbound link to `staff.html` orphans it, with the page count and the menu count both still perfectly frozen. |

**Why M-1b is the contract's keystone.** It is the one mutation whose Pass-A→Pass-B flip (**GREEN → RED**) *is* the
proof that the freeze became mechanical. It is also the proof that T-05 is not merely a `gallery` note: the orphan
guard catches a **route defect that holds every count**. If M-1b is still green in Pass B, T-03 or T-05 was not
actually delivered, and the freeze claim is void — regardless of what any other assertion says.
**Removal / green proof**: identical to §4.1.

---

### 4.3 — #3 · **M-2** — a wrong `#view=` fragment

**Exact changed line** — `src/js/nav.config.js:119` (the legacy UK spelling the source's own comment warns about,
`nav.config.js:115-117`):
```diff
-      item({ id: 'settingsCustomization', labelKey: 'nav.settingsCustomization', icon: 'sparkles', route: 'settings.html#view=customization' }),
+      item({ id: 'settingsCustomization', labelKey: 'nav.settingsCustomization', icon: 'sparkles', route: 'settings.html#view=customisation' }),
```
**build?** ✅ for the 64 DOM lines. The source-audit line (`:2545`) fires **without** a build — run the build anyway
so the full expected message set is observed in one run.

| Pass | Failing assertion | Site | Expected message |
|---|---|---|---|
| A + B | `anchorOk040(nav040.cust, /(^\|\/)settings\.(en\.)?html#view=customization$/)` (loop `:1559-1569`) | `run.cjs:1568` | **[shipped]** `dashboard/ar: settingscustomization must be a real deep-link → settings.html#view=customization, got {"a":true,"href":"settings.html#view=customisation","soon":false,"disabled":false,"lock":false}` — **64 lines** (`${tab}` is the lowercase view id, hence the run-together id) |
| A + B | nav.config **SOURCE** audit — `SIX_ROUTES` loop | `run.cjs:2545` | **[shipped]** `nav.config: settingsCustomization route must be settings.html#view=customization, got settings.html#view=customisation` — **1 line** |
| B only | fragment resolution | T-02 | **[contract]** `nav.config: settingsCustomization → settings.html#view=customisation — no [data-tab="customisation"] on settings.html` |
| B only | the 50-item route register | T-03 | **[contract]** `nav.config: route register — settingsCustomization must be settings.html#view=customization, got settings.html#view=customisation` |

**Discrimination boundary (must stay GREEN — the *point* of the mutation):**
`links010.badTarget` **cannot** catch it (`:1814` strips the fragment: `settings.html#view=customisation` validates
as `settings.html` — **a dead fragment is invisible to link integrity**); the seeded `SP040_VIEWS` block
(`:2441-2472`) **cannot** catch it (it navigates to its own **literal** `#view=customization`, testing the *engine*,
not the *route*). That is **G-2**, and T-02 is its closure. The mirror mutation **M-10** (rename the `data-tab` id on
the *page* instead of the route) proves T-02 discriminates from the other side.
**Removal / green proof**: as §4.1.

---

### 4.4 — #4 · **M-3** — the `disabled` lock rendered as an anchor

`classSalaryReport` (`nav.config.js:90`) is **route-less by construction** (`status: 'disabled'`,
`reasonKey: 'nav.reason.finance'`, no `route`), so the mutation must be made in the **renderer**, not the config.

**Exact changed line** — `src/js/components/sidebar.js`, the item-render branch: emit `disabled` items through the
anchor path (`sidebar.js:46`) instead of the disabled-button path — i.e. produce
`<a href="finance.html" class="nav-item is-disabled" data-nav-status="disabled" …>` in place of
`<button type="button" … aria-disabled="true" data-disabled-reason data-reason-key="nav.reason.finance">`.
**build?** ✅

| # | Failing assertion | Site | Expected message **[shipped]** |
|---|---|---|---|
| 1 | `truth010.badDisabled === 0` (filter `:1832-1833` requires `BUTTON` **and** `aria-disabled="true"` **and** `[data-reason-key]`) | `run.cjs:1836` | `dashboard/ar: 1 disabled nav item(s) missing button/aria-disabled/reason` — **64 lines** |
| 2 | `info.deadNav === 0` (and `links010.deadHash` if the mutation emits `href="#"`) | `run.cjs:180` / `:1821` | `dashboard/ar: 1 dead nav item(s) — anchor without route or planned/disabled button without a hook` · `dashboard/ar: 1 dead href="#" link(s) (expected 0)` |
| 3 | `fin.walletOk` (requires `data-nav-status="disabled"` + `aria-disabled="true"` + `use[href="#i-lock"]`, `:1728-1732`) | `run.cjs:1742` | `dashboard/ar: classSalaryReport lost its disabled/lock state (it must stay the one honest finance lock)` |
| 4 | `nav010.lockedOk` (`lockedFin = ['classSalaryReport']`, `:1770-1776`) | `run.cjs:1793` | `dashboard/ar: the one honest finance lock (classSalaryReport) must stay disabled+reason+lock` — **64 lines** |
| 5 | the finance route block's `csr` assert | `run.cjs:2398` | `finance/ar: classSalaryReport must stay a disabled+nav.reason.finance+lock non-anchor with NO route, got {"a":true,"href":"finance.html",…}` — **2 lines** (ar + en) |
| 6 | the disabled-nav reason-feedback probe (`:255-263`) | `run.cjs:262` | `dashboard/ar: disabled nav item produced no reason feedback` (an anchor navigates instead of firing the reason toast) |

**Pass B is byte-identical to Pass A** — no 041 relocation touches any of the six. Six independent guards
(status attribute · ARIA · hook · icon · route-lessness · feedback) fire from one renderer mutation.
**Must stay GREEN**: `navCount32 === 50` — the lock is *retained*, never deleted (zero-deletion law).
**Compound (required, run once)**: **M-3 + M-4** together is the ONLY falsifier of `truth010.badPlanned === 0`
(`:1835`) — a *planned* status **and** an anchor render. It is the declared reason `badPlanned` is
**vacuous-but-retained** (FR-021) and may never be counted as coverage for the zero-planned milestone.
**Removal**: `git apply -R $SCRATCH/mut-M3.patch` → `md5sum -c` → `sidebar.js: OK`.
**Post-mutation green proof**: rebuild + smoke → `[smoke] PASS — 114 page loads` / exit 0. **`sidebar.js` is a
0-diff-wall file (FR-026)** — its md5 MUST return to the pre-image; a residual diff here is a wall breach, not a
test artifact.

---

### 4.5 — #5 · **M-4** — an `implemented` item marked `planned`

**Exact changed line** — `src/js/nav.config.js:122`:
```diff
-      item({ id: 'settingsUsers', labelKey: 'nav.settingsUsers', icon: 'staff', route: 'settings.html#view=users' }),
+      item({ id: 'settingsUsers', labelKey: 'nav.settingsUsers', icon: 'staff', status: 'planned' }),
```
**build?** ✅ (four of the six sites are DOM-side; two are source-side).

| # | Failing assertion | Site | Expected message **[shipped]** |
|---|---|---|---|
| 1 | sitewide zero-planned census (dashboard probe) | `run.cjs:253-254` | `dashboard/ar: Spec 040 — the product must carry ZERO planned «قريبًا» nav items (got planned=1, coming-soon=1)` — **2 lines** |
| 2 | `nav040.planned === 0 && nav040.comingSoon === 0` | `run.cjs:1574` | `dashboard/ar: Spec 040 — sitewide planned must be 0 (got planned=1, coming-soon=1)` — **64 lines** |
| 3 | `anchorOk040(nav040.usr, …#view=users$/)` — now `soon:true`, no href | `run.cjs:1568` | `dashboard/ar: settingsusers must be a real deep-link → settings.html#view=users, got {"a":false,"href":"","soon":true,…}` — **64 lines** |
| 4 | `nav039.settingsPlanned === 0` (Spec-040 supersession S1) | `run.cjs:1539` (+ `:2505`) | `dashboard/ar: settings category still has 1 planned «قريبًا» item(s)` |
| 5 | source audit — `stillPlanned.length === 0` | `run.cjs:2549` | `nav.config: Spec 040 — ZERO nav items may remain planned, got 1 (settingsUsers)` — **1 line** |
| 6 | source audit — the `SIX_ROUTES` status/route pins | `run.cjs:2544-2545` | `nav.config: settingsUsers must be implemented after Spec 040, got planned` |
| 7 (B) | the 50-item route register | T-03 | **[contract]** `nav.config: route register — settingsUsers must be settings.html#view=users, got null` |

**Required observation (never overclaim):** `truth010.badPlanned` (`:1835`) **stays 0** — the renderer honestly
emits a planned item as a non-navigating `<button data-coming-soon>`, exactly what the filter permits. `badPlanned`
is a **render-honesty** guard, not a zero-planned guard. The load-bearing asserts are `:253`, `:1574`, `:2549`.
**Removal / green proof**: as §4.1.

---

### 4.6 — #6 · **M-5** — sidebar AR/EN hash loss

Spec 035 made `langRoute()` hash-aware precisely so EN deep-links resolve to `<base>.en.html#view=<id>`. This
mutation reverts that — and is **the sidebar twin of D-3**, which is why the two contracts must never be conflated:
`langRoute()` (sidebar) is **correct today**; `langUrl()` (topbar) is **defective today**.

**Exact changed lines** — `src/js/components/sidebar.js:18-26`:
```diff
 function langRoute(route) {
   if (getLang() !== 'en') return route;
-  const hashIx = route.indexOf('#');
-  const file = hashIx === -1 ? route : route.slice(0, hashIx);
-  const hash = hashIx === -1 ? '' : route.slice(hashIx);
-  const enFile = (file.endsWith('.html') && !file.endsWith('.en.html'))
-    ? file.replace(/\.html$/, '.en.html')
-    : file;
-  return enFile + hash;
+  return route.replace(/\.html$/, '.en.html');   // pre-035: a route bearing a hash no longer matches /\.html$/
 }
```
(The pre-035 behaviour: a hash-bearing route falls through unmirrored — or, in the fragment-dropping variant,
mirrors to `settings.en.html` with `#view=general` lost. Either variant is acceptable; the expected EN-only failure
signature is the same.)
**build?** ✅

| Failing assertion | Site | Expected message **[shipped]** |
|---|---|---|
| the six settings deep-links | `run.cjs:1568` | `dashboard/en: settingsgeneral must be a real deep-link → settings.html#view=general, got {"a":true,"href":"settings.en.html","soon":false,"disabled":false,"lock":false}` (× 6 views) |
| `familyCategories` / `studentResult` / `studentEvaluation` | `:1474`, `:1476`, `:1477` | the Spec-035 route messages, **EN only** |
| `sessionsKpi` / `monthlyPerf` | `:1496-1497` | the Spec-036 route messages, **EN only** |
| `monthlyReports` / `dataAnalysis` | `:1514-1515` | the Spec-037 route messages, **EN only** |
| `materials` / `books` / `certificateRequests` | `:1534-1536` | the Spec-039 route messages, **EN only** |
| the six finance deep-links | `:2392-2397` | `finance/en: invoices must be a real anchor → finance.html#view=invoices, got {"a":true,"href":"finance.en.html",…}` |
| **Pass B, additional** | T-04 | **[contract]** `nav.config: AR/EN parity — settingsGeneral EN route must be settings.en.html#view=general, got settings.en.html` (× every hash-bearing item) |

**Volume**: **32 EN admin files × 15** sidebar-wide route asserts + the 6 finance-page EN asserts. **All AR pages
stay green** — that asymmetry *is* the signature of a hash-loss defect and is what makes the mutation diagnostic.
**Recorded gap G-4** (baseline): parity was enforced *emergently*, by the optional `(en\.)?` group inside each
per-item regex; the 27 plain routes had **no** regex at all. **T-04 closes it mechanically for all 50.**
**Removal**: `git apply -R` → `md5sum -c` → `sidebar.js: OK` (0-diff-wall file — see §4.4's warning).
**Green proof**: as §4.1.

---

### 4.7 — #7 · **M-12** — the **TOPBAR** language-switch hash loss (**the D-3 regression**)

The mutation is the **exact reversal of D-1/D-3's one-line fix**, i.e. it restores the live-reproduced defect.

**Exact changed lines** — `src/js/enhance.js:237-241` (the D-3 fix, then this mutation reverting it):

*The 041 fix (the only sanctioned `enhance.js` edit — a declared narrow supersession of the 0-diff wall):*
```diff
 function langUrl(lang) {
   const file = (location.pathname.split('/').pop() || 'dashboard.html');
   const base = file.replace('.en.html', '').replace('.html', '') || 'dashboard';
-  return lang === 'en' ? `${base}.en.html` : `${base}.html`;
+  return (lang === 'en' ? `${base}.en.html` : `${base}.html`) + location.hash;
 }
```
*The mutation (Pass B) — drop `+ location.hash` again:*
```diff
-  return (lang === 'en' ? `${base}.en.html` : `${base}.html`) + location.hash;
+  return lang === 'en' ? `${base}.en.html` : `${base}.html`;
```
Consumer: `enhance.js:552-553` — `const lg = e.target.closest('[data-set-lang]'); if (lg) { … location.href =
langUrl(l); }`. The helper reads `location.pathname` **only** and never `location.hash` — hence the fragment is
destroyed on every topbar language switch. **Live-reproduced** (headless Chromium, correct MIME types):
`finance.html#view=banks` → EN toggle → `finance.en.html`, hash **gone**, the visible tab reverts to the baked
default `overview`.
**build?** ✅ (`enhance.js` → `public/assets/js/enhance.js` via `build-assets`; every page loads it,
`build-html.mjs:191`).

| Pass | Result | Detail |
|---|---|---|
| **A** | 🟠 **GREEN — a disclosed gap, not a pass.** | The shipped suite has **no** DOM-level test for `location.hash` survival across a topbar language click. `M-5`'s regexes test the **sidebar** href *string*, not the topbar's `location.href` assignment; T-01's `localStorage` seeding technique does not apply (no stored state is involved). At Pass A the **only** available evidence is the before/after screenshot frame pair (`finance.html#view=banks` → EN) — advisory, `capture.cjs:545 process.exit(0)`, and explicitly **not** counted as gate coverage. |
| **B** | **RED — T-10** | **[contract]** `finance/ar: topbar language switch dropped the fragment — expected finance.en.html#view=banks, got finance.en.html` (+ the EN→AR row, + the `settings.html` two-control-trap row). |

**Test-design trap (binding, live-found).** See §3's T-10 law: `settings.html` renders **two** `[data-set-lang]`
elements — the topbar menu item (`enhance.js:32`, `button.menu-item[role="menuitem"]`) and the Customization tab's
**real** language control (`settings-section.js:16`, `button.tab[data-set-lang][data-lang-opt]`). The T-10 probe
MUST open `[data-action="lang-menu"]` (`topbar.js:44`) first and click the **menu's** control
(`[role="menuitem"][data-set-lang="en"]`). An unscoped `[data-set-lang]` click hits the settings form control and
proves nothing.
**Query strings — declared non-adoption.** The current helper already drops `location.search` (it only ever read
`pathname`). The app is static and uses **no** query strings. The D-3 fix is **hash-only**; preserving `search`
would be a behaviour change beyond the minimal fix and is **NOT adopted**. Recorded here explicitly rather than
silently, per the plan brief. No T-block asserts anything about `location.search`.
**Scope**: `components/sidebar.js` is **untouched** by D-3 — the sidebar's `langRoute()` is already correct
(Spec 035). No new hook, no storage key, no dependency, no redesign of the language control.
**Removal**: `git apply -R $SCRATCH/mut-M12.patch` → `md5sum -c` → `enhance.js: OK` (the md5 must return to the
**post-fix 041 pre-image**, not to `21502af` — Pass B's oracle is captured on the implemented tree).
**Green proof**: rebuild + smoke → exit 0, **and** re-run the T-10 rows specifically (they are the only proof the
fix, not the test, is what makes them pass).

---

### 4.8 — #8 · **M-6** — a role-inappropriate portal destination

**Exact changed lines** — `src/js/fixtures/portal.js:159-168` (`ROLE_NAV.teacher`), append a 9th entry:
```diff
     { id: 'profile', labelKey: 'prt.nav.tch.profile', icon: 'user', page: 'teacher-profile', status: 'implemented' },
+    { id: 'finance', labelKey: 'prt.nav.tch.reports', icon: 'wallet', page: 'finance', status: 'implemented' },
   ],
```
**Precision correction (grounding, not a new decision):** `ROLE_NAV` entries key on **`page`**, not `route` —
`components/portal-shell.js:26` builds `const href = \`${entry.page}${en ? '.en' : ''}.html\``. The specify-round
register's `route: 'finance.html'` shorthand is corrected here; the mutation's meaning, sites and expected messages
are unchanged.
**build?** ✅ (rendered into both the desktop `aside.pt-sidenav` and the mobile drawer of all 16 teacher files).

| # | Failing assertion | Site | Expected message **[shipped]** |
|---|---|---|---|
| 1 | `prt.navAside === 8 && prt.navDrawer === 8` | `run.cjs:2169-2170` | `teacher-portal/ar: teacher registry count mismatch (aside 9 / drawer 9, want 8)` |
| 2 | `prt.navListAnchors === 8` | `:2175` | `teacher-portal/ar: expected all 8 teacher nav items implemented as links, got 9` |
| 3 | the **sanctioned-anchor registry** (`uniq` vs `wantTch`, `:2166-2167`) | `:2177-2178` | `teacher-portal/ar: teacher shell anchors outside {8 teacher pages, hub}: ["finance.html","portals.html","teacher-library.html","teacher-outcomes.html","teacher-portal.html","teacher-profile.html","teacher-reports.html","teacher-schedule.html","teacher-students.html","teacher-tasks.html"]` |
| 4 | `prt.shellAnchors.length === 19` | `:2180` | `teacher-portal/ar: sanctioned teacher shell-anchor multiset must be 19 (8×2 + hub×3), got 21` |

**Volume**: 4 messages × **16 teacher files** = 64 lines. Re-run once per role (family: `navListAnchors === 8`,
multiset 19, `:2112-2117`/`:2133-2138`; student: `=== 7`, multiset 17, `:2154-2159`) to prove all three registries
discriminate. *(Counting basis: the smoke registries count `ROLE_NAV` items **excluding** the hub-exit entry;
FR-006's "teacher 9 / family 9 / student 8" counts the same registries **including** the hub link. Same registry,
two conventions — not a rival count.)*
**Required observations (never overclaim):**
- `payHit` (`:2070-2072`) and `tchPay` (`:1990-1991`) **stay GREEN** — they scan `#page-body` **innerText**, and the
  portal nav lives **outside** `#page-body`. A pay-adjacent *destination* is caught by the **anchor registry**, not
  by the pay-free regex. Both guards are needed; neither substitutes for the other. This mutation is the proof.
- `prt.adminMarkup` (`:1911`) **stays GREEN** — it detects leaked admin *shell markup*, not an admin *link*.
- **Hiding a nav link is not authorization.** M-6 proves the *nav surface* is isolated; real permission enforcement
  is out of 041's scope (recorded owner: the maintainer-directed 042–057 amendment range — **not** chartered specs;
  see `carry-forward-register.md` "Roadmap provenance").
- **G-5 stands**: the three registries are per-role hand-written base lists; a *new* portal page would need a manual
  registry edit. Recorded, not fixed — 041 adds no portal page.
**Removal / green proof**: as §4.1 (`fixtures/portal.js: OK`).

---

### 4.9 — #9 · **M-7** — page-count drift

**Exact changed line** — `scripts/build-html.mjs`, the `PAGES` array (58th entry; pattern grounded at
`build-html.mjs:95`, the `gallery` row):
```diff
   { base: 'gallery', activeId: null, titleKey: 'topbar.title.gallery', crumbKey: 'topbar.crumb.gallery', render: renderGallery },
+  { base: 'sandbox', activeId: null, titleKey: 'topbar.title.gallery', crumbKey: 'topbar.crumb.gallery', render: renderGallery },
```
**build?** ✅ — the mutation only exists after `npm run build` emits `public/sandbox.html` + `public/sandbox.en.html`
(115 → **117**).

| Pass | Failing assertion | Site | Expected message |
|---|---|---|---|
| A + B | route/page count freeze (block `:2580-2588`) | `run.cjs:2583` | **[shipped]** `route freeze: public/ must hold exactly 115 HTML pages (57×2+index; Spec 035 +2 = schedule-search pair), got 117` — **1 line** |
| B only | orphan-set freeze (interlock — the new base is also unlinked) | T-05 | **[contract]** `orphan freeze: the orphan set must be exactly {gallery.html, gallery.en.html}, got {gallery.en.html, gallery.html, sandbox.en.html, sandbox.html}` |

**Inverse mutation (also required, same pass)**: *remove* a `PAGES` entry → the same assert fires with `got 113`;
if only one language is removed, the per-base mirror assert (`:2586`) fires: `route freeze: <base> is missing a
language mirror`. Additionally, every nav item routed at the removed base starts failing `links010.badTarget`
(`:1823`) across all 64 admin files — the two guards interlock, which is the point.
**Must stay GREEN**: `navCount32 === 50` — `PAGES` and the nav registry are **independent** registries, which is
exactly why both need their own freeze.
**Note (not a mutation)**: `tests/smoke/run.cjs:8` carries its **own** literal `PAGES` list; the count assert reads
`public/` from disk, so it fires whether or not the test list is also edited.
**Housekeeping, classified — NOT a supersession**: the header comment at `run.cjs:2580`
(`// ===== Spec 032 — route/page count freeze: 51 bases × 2 languages + index = 103 =====`) is **stale** while the
assertion two lines below is `=== 115`. Correcting the comment is **T-09 / FR-020**, a documentation correction with
zero behaviour change (`quickstart.md` §3.1). It is **never** performed inside a mutation.
**Removal / green proof**: `git apply -R` → `md5sum -c` → `build-html.mjs: OK`; then **rebuild** (this also deletes
nothing — verify `ls public/sandbox*.html` returns nothing; a stale build output is a removal failure) → smoke exit 0
with `public/` back at **115**.

---

### 4.10 — #10 · **M-8** — menu-count drift

**Exact changed line** — `src/js/nav.config.js`, a 51st `item({ … })` in any category (canonical: duplicate `staff`
in `admin`, after `:99`):
```diff
       item({ id: 'staff', labelKey: 'nav.staff', icon: 'staff', route: 'staff.html' }),
+      item({ id: 'staff2', labelKey: 'nav.staff', icon: 'staff', route: 'staff.html' }),
```
**build?** ✅

| # | Failing assertion | Site | Expected message **[shipped]** |
|---|---|---|---|
| 1 | `navCount32 === 50` (every admin page × 2 langs) | `run.cjs:1391` | `dashboard/ar: admin menu freeze expects exactly 50 classified nav items, got 51` — **64 lines** |
| 2 | `nav040.menu === 50` | `:1576` | `dashboard/ar: admin menu must stay 50, got 51` — **64 lines** |
| 3 | the finance nav block | `:2400` | `finance/ar: admin menu must stay 50 classified nav items, got 51` — **2 lines** |
| 4 | the content (library/certificates) nav block | `:2506` | `content/ar: admin menu must stay 50 classified nav items, got 51` — **2 lines** |
| 5 | nav.config **SOURCE** audit | `:2554` | `nav.config: the admin menu must stay 50 items, got 51` — **1 line** |
| 6 | (admin category) `admItems` size/membership pin | `:1788` | `dashboard/ar: admin category should have exactly 5 items and no banks, got ["staff","staff2","materials","books","certificates","certificateRequests"]` |
| 7 | (settings variant) settings category size pin | `:2552` | `nav.config: the settings category must keep exactly 7 items` |
| 8 (B) | the 50-item route register (cardinality + uniqueness) | T-03 / T-06 | **[contract]** `nav.config: route register — expected exactly 50 items, got 51` · `nav.config: duplicate route "staff.html" shared by staff, staff2 (only S-1 salaries/staffSalaries → finance.html#view=salaries is sanctioned)` |

Run the mutation **twice** (once in `admin`, once in `settings`) to exercise both category-size pins.
**Removal / green proof**: as §4.1.

---

### 4.11 — #11 · **M-13** — a **new orphan page** (D-2 / E-12)

The orphan guard must freeze **the exception itself** (`d2-gallery-orphan-contract.md` §4), so it needs three
falsifiers — one that grows the set, one that grows it **without touching any count**, and one that shrinks it.

**M-13a — grow the set (a page built and forgotten).** Identical edit to **M-7** (58th `PAGES` base `sandbox`, no
nav route, no inbound link anywhere). **build?** ✅

| Pass | Result |
|---|---|
| **A** | 🟢 **GREEN on orphanhood.** No orphan assertion exists at `21502af`. The run does go RED — but only via M-7's *count* assert (`:2583`). **Orphanhood itself is invisible.** Record precisely: the pre-041 suite cannot distinguish "a new page that nothing links to" from "a new page" at all. |
| **B** | **RED — T-05**: **[contract]** `orphan freeze: the orphan set must be exactly {gallery.html, gallery.en.html}, got {gallery.en.html, gallery.html, sandbox.en.html, sandbox.html}` (**alongside** the count assert — both fire; they are independent). |

**M-13b — grow the set with EVERY count frozen (the isolating variant; this is the one that matters).** Re-use
**M-1b** verbatim (`staff` route → `library.html`): `staff.html`/`staff.en.html` lose their only inbound link.
HTML stays **115**, `PAGES` stays **57**, the menu stays **50**, `badTarget` stays **0**, `deadNav` stays **0**.
**build?** ✅

| Pass | Result |
|---|---|
| **A** | 🟢 **GREEN — exit 0** (this is G-1 seen from the reachability side). |
| **B** | **RED — T-05 alone** (plus T-03): `orphan freeze: … got {gallery.en.html, gallery.html, staff.en.html, staff.html}`. **No count assert fires** — which is exactly the proof that T-05 discriminates *independently* of M-7's count freeze and is not a restatement of it. |

**M-13c — shrink the set (the exception must not silently disappear).** Add an inbound link to `gallery.html`
(e.g. an `<a href="gallery.html">` in `public/index.html`'s source, `src/js/pages/*` for the hub — the exact host is
the tasks round's choice; the mutation only needs one real inbound link on any of the 115 pages). **build?** ✅
(if authored in source; if hand-edited in `public/`, no build — but then it must be reverted **before** the next
build or the build silently erases it, which is itself a removal-proof hazard: **author it in source**).

| Pass | Result |
|---|---|
| **A** | 🟢 GREEN (no assert) |
| **B** | **RED — T-05**: `orphan freeze: the orphan set must be exactly {gallery.html, gallery.en.html}, got {}` — proving the assert is an **exact-set** freeze (cardinality **2**, both members named), not a floor. This is the mechanical guard that Option B/C (linking gallery from the sidebar or index) cannot be smuggled in later without a declared decision. |

**Must stay GREEN in all three variants**: `navCount32 === 50` (M-13b/c), `payHit`/`tchPay`/`famPay`, every role law
— an orphan is a *reachability* defect, not an honesty defect, and the guards must not blur.
**Removal**: `git apply -R $SCRATCH/mut-M13{a,b,c}.patch` → `md5sum -c $SCRATCH/pre.md5` → all `OK`; **then
`npm run build`** and confirm `ls public/sandbox*.html` is empty and `grep -c 'href="gallery' public/*.html` returns
**0 matches across all 115 files** (the orphan is restored). A stale build artifact is an un-removed mutation.
**Green proof**: rebuild + smoke → exit 0 · `public/` = 115 · T-05 green with the set exactly
`{gallery.html, gallery.en.html}`.

---

### 4.12 — #12 · **M-11** — the **D-1 regression** (`addTeacher` back at bare `teachers.html`)

**Exact changed lines** — `src/js/nav.config.js:54-56`. Baseline (`21502af`) — **the defect D-1 fixes**:
```js
item({ id: 'teachers',          labelKey: 'nav.teachers',          icon: 'trainers', route: 'teachers.html' }),
item({ id: 'addTeacher',        labelKey: 'nav.addTeacher',        icon: 'user-plus', route: 'teachers.html' }), // Spec 036 — fold-anchor
item({ id: 'teacherCategories', labelKey: 'nav.teacherCategories', icon: 'filter',    route: 'teachers.html' }), // Spec 036 — fold-anchor
```
041 target state (`route-inventory-contract.md` §3):
```js
item({ id: 'teachers',          …, route: 'teachers.html' }),                  // PLAIN — baked default tab = directory
item({ id: 'addTeacher',        …, route: 'teachers.html#view=add' }),         // DEEP
item({ id: 'teacherCategories', …, route: 'teachers.html#view=categories' }),  // DEEP
```
**The mutation (Pass B only — it is meaningless at Pass A, where it *is* the baseline)**: revert `addTeacher` (and,
in a second run, `teacherCategories`) to bare `teachers.html`.
```diff
-      item({ id: 'addTeacher', labelKey: 'nav.addTeacher', icon: 'user-plus', route: 'teachers.html#view=add' }),
+      item({ id: 'addTeacher', labelKey: 'nav.addTeacher', icon: 'user-plus', route: 'teachers.html' }),
```
**build?** ✅

| # | Failing assertion | Site | Expected message |
|---|---|---|---|
| 1 | route uniqueness | **T-06** | **[contract]** `nav.config: duplicate route "teachers.html" shared by teachers, addTeacher (only S-1 salaries/staffSalaries → finance.html#view=salaries is sanctioned)` |
| 2 | the 50-item route register (source **and** DOM) | **T-03** | **[contract]** `nav.config: route register — addTeacher must be teachers.html#view=add, got teachers.html` + `dashboard/ar: addTeacher href must be teachers.html#view=add, got teachers.html` (× 64) |
| 3 | the route split | **T-03** | **[contract]** `nav.config: route split must be 24 deep-link + 25 plain + 1 route-less = 50, got 23/26/1` |
| 4 | the relocated Spec-036 anchor assert (**S5**, `smoke:1494-1495`) | `run.cjs:1494` (post-S5) | `dashboard/ar: addTeacher must be a real deep-link → teachers.html#view=add, got {"a":true,"href":"teachers.html","soon":false,…}` — **64 lines** |
| 5 | the derived, seeded deep-link matrix | **T-01** | the `teachers`-group row for `#view=add` disappears from the derived matrix ⇒ the matrix-completeness assert fires: **[contract]** `deep-link matrix: expected 24 derived rows, got 23` — *this is why T-01 must assert its own row count; a derived matrix that silently shrinks when a route is broken is a vacuous matrix.* |

**Must stay GREEN (the discrimination boundary):** `links010.badTarget` — `teachers.html` **exists**, so a route
regression to a *real* page is invisible to link integrity (the same blind spot as M-1b/G-1) · `navCount32 === 50` ·
`deadNav === 0` · the zero-planned census. **M-11 is therefore the D-1-specific instance of G-1**, and T-03/T-06 are
its only guards.
**Architectural note (why the regression must be caught in the CONFIG, not papered over in the page).** The tabs
engine (`enhance.js:242-273`) has **no `hashchange` listener**, and `selectTab(group,id)` requires the
`[data-tab="id"]` button to live **inside** the `[data-tabs="group"]` wrap. Consequences, both binding on the D-1
design and on this mutation's interpretation: a same-page anchor `href="teachers.html#view=add"` clicked *from*
`teachers.html` changes the hash **without** switching the tab (no reload, no listener) — so a header "Add" anchor is
**not** a valid affordance; and a header button **cannot** be a tab selector, because it would sit outside the wrap.
The tablist is the affordance; the sidebar deep-link is the entry path. That is why D-1's only compliant shape is
**MOVE** (`f-<name>` id collision under `field()` makes tab+drawer duplication forbidden the moment `enhance.js`
clones the template into the live sheet) — see `quickstart.md` §2.2 and `research.md`.
**Removal**: `git apply -R $SCRATCH/mut-M11.patch` → `md5sum -c` → `nav.config.js: OK`.
**Green proof**: rebuild + smoke → exit 0, with T-03's split back at **24 deep-link + 25 plain + 1 route-less = 50**
and T-06 reporting exactly **one** sanctioned shared destination (**S-1**).

---

## 5. Pass A → Pass B flip table (the freeze's proof of work)

| id | Pass A (shipped suite @ `21502af`) | Pass B (implemented 041 tree) | The gap it closes |
|---|---|---|---|
| M-1a | RED (`badTarget`) | RED (+T-03) | — (already covered) |
| **M-1b** | 🟢 **GREEN** | **RED** (T-03 + T-05) | **G-1** — 27 plain routes pinned nowhere |
| M-2 | RED (`anchorOk040` + source audit) | RED (+T-02, T-03) | **G-2** — a dead fragment was invisible to link integrity |
| M-3 | RED × 6 sites | RED × 6 sites (byte-identical) | — |
| M-4 | RED × 6 sites | RED (+T-03) | — |
| M-5 | RED (EN only) | RED (+T-04) | **G-4** — no mechanical AR/EN route-parity assert |
| **M-12** | 🟠 **GREEN** (screenshot-only evidence) | **RED** (T-10) | **D-3** — the topbar language switch destroyed the fragment |
| M-6 | RED × 4 × 16 | RED × 4 × 16 | — (**G-5** recorded, not fixed) |
| M-7 | RED (count) | RED (+T-05) | — |
| M-8 | RED × 5 sites | RED (+T-03/T-06) | — |
| **M-13** | 🟢 **GREEN on orphanhood** | **RED** (T-05, incl. the count-frozen variant M-13b) | **D-2 / E-12** — no orphan-set guard existed |
| **M-11** | n/a (**is** the baseline defect) | **RED** (T-06 + T-03 + S5 + T-01) | **D-1** — three items, one destination |
| *M-9* (adjacent) | RED on 9/22 rows | RED on **24/24** rows | **G-3** — 13 deep-links had only an unseeded, non-discriminating test |
| *M-10* (adjacent) | GREEN | RED (T-02) | **G-2**, from the page side |

**9 of 12 RED at Pass A → 12 of 12 RED at Pass B.** The three flips are the freeze; everything else is the
regression net that already existed and must be shown, byte-verbatim, to still fire.

---

## 6. Interlocks, double-counting and vacuity discipline

| Rule | Statement |
|---|---|
| **I-1** | An invariant is **covered** only if a mutation makes a **smoke** assertion fail. a11y rows and screenshot frames are never coverage (`a11y` is route-insensitive; `capture.cjs:545` always exits 0). The single exception is the **disclosed** M-12/Pass A row, which is explicitly recorded as *absence* of coverage. |
| **I-2** | **No double-counting.** M-7 and M-13a share an edit but prove different invariants (count vs reachability); M-1b and M-13b share an edit but prove different invariants (route correctness vs reachability). Each is counted **once** per invariant, and M-13b exists precisely because the shared-edit cases must be shown to fail **independently**. |
| **I-3** | **Vacuous-at-baseline, retained, never counted** (zero-deletion law; FR-021): `truth010.badPlanned === 0` (`:1835`) — falsifiable only by the **M-3 + M-4 compound** · `prt.plannedNavAnchors === 0` (`:2111`, `:2132`, `:2153`, `:2174`) — `ROLE_NAV` has carried 0 planned items since Spec 025; the suite already declares this at `:237-240` · the retired planned-item click probe (Spec-040 S2) — correctly retired, **never** repointed at `classSalaryReport` (a `disabled` lock is categorically not a planned item). None of these may be cited as coverage for the zero-planned milestone. |
| **I-4** | **The five D-1 relocations (S1–S5) are relocations, not weakenings**, and each must be re-proven RED at its new host in Pass B: S1 `smoke:88` `FORM_DRAWERS_032.teachers → ['trn-edit']` · S2 `smoke:111` picker register `teachers` entry removed · S3 `smoke:115` `HYBRID_032` drops `teachers` · S4 `smoke:747-752` the categories **tab panel** (list + create form + gates) replaces the drawer/template pair · S5 `smoke:1494-1495` the two teacher anchors now `#view=add` / `#view=categories`. `FORM_DRAWERS_032.teacher` (`['trn-edit','trn-note']`) and `HYBRID_032.reports`/`.library` are **UNCHANGED**. Every other protected assert stays **byte-verbatim**. |
| **I-5** | **The 0-diff wall after the mutation pass** (FR-026, as amended by the plan): `src/js/enhance.js` carries **exactly one** declared narrow supersession (the D-3 `+ location.hash` line) and nothing else. The remaining wall files must be byte-identical to their 041 pre-image: `package.json` · `scripts/build-html.mjs` · `src/js/i18n.js` · `src/js/components/sidebar.js` · `src/js/components/tabs.js` · `src/js/components/form-field.js` · `src/js/components/settings-section.js` · `src/js/components/preview-drawer.js` · **`src/js/components/ui.js`** *(the real path — there is no `src/js/ui.js`)* · `src/js/fixtures/settings.js` · `src/js/pages/staff.js` · `src/js/fixtures/staff-management.js` · all portal pages/fixtures. **M-3 and M-5 mutate `sidebar.js`; M-7/M-13a mutate `build-html.mjs`** — both are wall files, so their **removal proof is a wall proof**: `md5sum -c $SCRATCH/pre.md5` must print `OK` for them at the end of the pass, or the wall is breached. |
| **I-6** | **Group-awareness, not a group ban.** `selectTab` persists a **global** `#view=` fragment and `initTabs` applies the single parsed `hashView` to every `[data-tabs]` wrap, so two groups on one page would fight over the fragment. No current page has two. T-01/T-07 must therefore be **group-aware** (each derived deep-link records which `[data-tabs]` group owns its tab id; probes scope to `[data-tabs="<group>"] [data-tabpanel]`). 041 must **not** impose a permanent "one tabs widget per page" rule — that would legislate away a future multi-group page instead of making it safe. |
| **I-7** | **Impact taxonomy discipline when reading a mutation's blast radius** (`quickstart.md` §7): distinguish (1) source-module change · (2) generated **shared-asset** change (`enhance.js` → `assets/js/enhance.js`: content changes for all 115 pages) · (3) **sidebar markup** change (64 admin files' two href fragments) · (4) **`#page-body`** change (**exactly 2**: `teachers.html`, `teachers.en.html`) · (5) whole-file change. A mutation that "touches every page" at level 2 has still changed **zero** page bodies. |

---

## 7. Acceptance criteria (extends `mutation-test-register.md` §7 MT-1…MT-8; nothing there is repealed)

| # | Criterion |
|---|---|
| MX-1 | **Pre-image + pre-proof** captured for each pass (§1.1): `npm run build && npm run test:smoke` → `[smoke] PASS — 114 page loads` / exit 0, and `$SCRATCH/pre.md5` written, **before** any mutation. |
| MX-2 | **Pass A** executed at `21502af` in a **detached worktree** (L-4a). Recorded results MUST match §5's Pass-A column exactly — including the three GREENs (**M-1b**, **M-12**, **M-13 orphanhood**). A green there is a **finding**, never a pass. |
| MX-3 | **Pass B** executed on the implemented 041 tree by **in-place patch/revert** (L-4b). **All 12** contract mutations (plus the adjacent M-9/M-10) print `SMOKE FAILED:` and exit 1, and the `fails` list contains the expected message(s) of §4 (the `page/lang` prefix may vary with iteration order; the message **body** must match). |
| MX-4 | The three **flips** (M-1b, M-12, M-13) are recorded with both results side by side. A flip that does not occur means T-03 / T-10 / T-05 was **not delivered** — the freeze claim is void, whatever the rest of the suite prints. |
| MX-5 | **Every** mutation is proven removed: `git apply -R` (or worktree deletion) + `md5sum -c $SCRATCH/pre.md5` → all `OK` + a **rebuild** confirming no stale build output survives (`public/sandbox*.html` absent; no inbound `gallery` link in any of the 115 files). |
| MX-6 | **L-2 never violated**: no `git stash` / `git reset` / `git checkout --` / `git restore` / `git clean` / branch switch in the primary tree, for the entire pass. Evidence: the shell history of the pass contains none of them. |
| MX-7 | **Post-proof green**: `npm run build && npm run test:smoke && npm run test:a11y` on the restored tree → smoke exit 0 (`[smoke] PASS — 114 page loads`), a11y `critical=0 serious=0`; `git status --porcelain` shows **only** the sanctioned 041 edits (Pass B) or is **empty** (Pass A). |
| MX-8 | **The 0-diff wall (I-5) holds** after the pass, with `enhance.js`'s single declared D-3 line as the only exception. `sidebar.js` and `build-html.mjs` — mutated transiently by M-3/M-5/M-7/M-13a — are byte-identical to their pre-image. |
| MX-9 | **No mutation is left in the tree, in any form, for any reason** (L-7, the no-lie rule). The product never lies so that a probe has a victim. |
| MX-10 | Every §I-3 vacuous assert is declared in the freeze narrative and is **not** counted toward any invariant's coverage. |
| MX-11 | The frozen counts are re-asserted green on the restored tree: HTML **115** · `PAGES` **57** · admin files **64** · portal **50** · index **1** · categories **6** · menu **50** · implemented **49** · planned **0** · disabled **1** · deep-links **24** · plain **25** · route-less **1** · `FUTURE_ROUTES {}` · coming-soon **0** · locks = `classSalaryReport` only · orphan set = exactly `{gallery.html, gallery.en.html}` · `finance-analysis` absent. |

---

## 8. What this contract does NOT do

- Does **not** re-open D-1 / D-2 / D-3, and does not introduce a rival option set, count, route table or numbering.
  The 12 mutations reuse the canonical ids (`M-1a`…`M-8` from `mutation-test-register.md`; `M-9`…`M-13` extending it).
- Does **not** write `tasks.md`, edit any source, test, locale or HTML file, or authorize a commit. The T-block
  message texts here are **[contract]** obligations for the implementing round, not code.
- Does **not** sweep `common.backendRequiredNote` (the "nothing is saved yet" copy, ~50 pages) — owned by **Spec 044**
  (the shared modal/drawer/long-form interaction system and `formDrawer()`'s default `reasonKey`), not by 041.
- Does **not** redesign or expand the teacher forms, and introduces **no** teacher pay/salary/rate/currency field —
  the D-1 MOVE relocates `teacherFields('trnAdd', true)` (**13** controls, with the CV upload **gate** emitted inside
  it, + ONE primary `backendRequired` Save) and the categories list/create-form/gates **unchanged**, host-for-host.
- Does **not** multiply the a11y/screenshot matrices: per **E-10**, only `settingsUsers` (`#view=users`) needs the
  one additive a11y row + one additive frame to reach the ≥2-per-deep-linked-view floor (T-08).
- Does **not** treat the stale `run.cjs:2580` comment (**FR-020**) or the vacuity declarations (**FR-021**) as
  protected-assert supersessions — they are **documentation corrections**, classified as such and performed outside
  any mutation.
- Does **not** claim `location.search` preservation. The D-3 fix is hash-only; the non-adoption is declared (§4.7).
- **Roadmap-provenance caveat (binding).** The committed corpus charters only **Spec 041**. Any spec number above 041
  named here (044 for the copy sweep; the 042–057 range for permission enforcement / portal review) is a
  **maintainer-directed, append-only amendment — not a chartered spec.**

## 9. Cross-references

`mutation-test-register.md` (§2 method · §4 M-1a…M-8 · §5 vacuity · §6 G-1…G-7 · §7 MT-1…MT-8) ·
`quickstart.md` (§2.2 the D-1 MOVE · §2.1/§3.3 D-3 · §3.1 T-01…T-10 · §3.2 S1–S5 · §7 impact taxonomy · §8 M-9…M-12) ·
`route-inventory-contract.md` (§3 the teachers target state · §7 arithmetic · §8 how T-03 asserts it) ·
`d2-gallery-orphan-contract.md` (§2 owner/entry path · §4 the T-05 orphan-set guard) ·
`protected-test-register.md` (§0 the Supersession Law · §1 the byte-verbatim set · T-05) ·
`count-and-freeze-contract.md` (the frozen counts re-asserted by MX-11) ·
`impact-boundary.md` (the allowlist the removal proofs defend) ·
`spec.md` (FR-009/FR-012…FR-015/FR-020/FR-021/FR-024/FR-026 · SC-08/SC-10/SC-12/SC-13/SC-18/SC-19 · E-01/E-03/E-04/E-10/E-12 · Q-3/Q-7/Q-9).
