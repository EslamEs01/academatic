# Spec 041 — Mutation / Discrimination Register

**Feature**: 041 — Full Frontend Route & Sidebar Production Freeze (baseline freeze; **not** the final product
freeze — see the Spec-040 `future-owner-register.md` §1/§3 redefinition, which supersedes the Spec-033 roadmap).
**Baseline**: HEAD `21502af` · working tree clean · 115 HTML · 57 PAGES bases · admin menu 50 · planned 0 ·
`[data-coming-soon]` 0 · `FUTURE_ROUTES {}` · exactly ONE honest lock (`classSalaryReport`).
**Status**: SPECIFY-ONLY. This register defines the mutations Spec 041 must **run and revert**; it changes no
application source, no test, no HTML.

---

## 1. The law

> **A test that cannot fail is not a test.**
> Every freeze invariant claimed by Spec 041 — page count, menu count, route correctness, hash correctness,
> status honesty, AR/EN parity, role isolation — MUST be paired with a **mutation** that makes the guarding
> assertion **fail**, with a named file, a named assertion site, and an **expected failure message**. An
> invariant with no falsifying mutation is a *declaration*, not a *freeze*.

Corollary (the **vacuity rule**): an assertion that is structurally unfalsifiable at the current baseline is not
a defect and is **never deleted** (zero-deletion law), but it MUST be **declared vacuous** in §5 and MUST NOT be
counted as coverage for any invariant. Precedent: the suite already declares `plannedNavAnchors === 0` vacuous in
its own comment (`tests/smoke/run.cjs:237-240`).

Corollary (the **no-lie rule**, inherited from Spec 040): a mutation may never be *left in* to keep a test alive.
The product must never lie so a probe has a victim. Every mutation in this register is transient by construction.

---

## 2. Method (binding — from the Spec-040 `impact-protection-contract.md`)

| Step | Command / rule |
|---|---|
| Isolate | `git worktree add --detach <scratch> 21502af` — mutate **inside the detached worktree only**. |
| **FORBIDDEN** | `git stash` · `git reset --hard` · `git checkout -- <path>` · `git clean` · any branch switch in the working tree. |
| Pre-proof | `npm run build && npm run test:smoke` → must print the pass line and `process.exit(0)` (`run.cjs:2592`) **before** the mutation. |
| Mutate | apply exactly ONE mutation from §4 (single-line where possible). |
| Rebuild | `npm run build` — required for every mutation that must surface in the **rendered DOM** (the sidebar is baked at build time and `public/assets/js/nav.config.js` is a build output). The **source audit** (`run.cjs:2512-2555`) imports `../../src/js/nav.config.js` directly and needs no build. |
| Observe | `npm run test:smoke` → MUST print `SMOKE FAILED:` (`run.cjs:2590`) and exit 1, and the failure list MUST contain the expected message(s) in §4. |
| Revert | delete the detached worktree (`git worktree remove --force`). The real working tree is never touched. |
| Post-proof | `npm run build && npm run test:smoke` on the untouched tree → green again. |

`ok = (c, m) => { if (!c) fails.push(m); }` (`run.cjs:37`) — assertions **accumulate**; a single mutation
therefore reports once per `page/lang` iteration. Counts below are exact.

**Gate scope.** The smoke suite is the only route/sidebar **gate**. `tests/a11y/run.cjs` is a gate for
`critical=0 / serious=0` but is route-insensitive. `tests/screenshots/capture.cjs` **never exits non-zero**
(`capture.cjs:545 process.exit(0)`) — console-error counts are advisory and MUST NOT be cited as mutation
coverage.

---

## 3. Register at a glance

| # | Mutation | File | First failing assertion | Failing sites |
|---|---|---|---|---|
| **M-1a** | wrong page route → **nonexistent** file (`staff` → `staff-members.html`) | `src/js/nav.config.js` | `links010.badTarget` (`run.cjs:1823`) | 64 (every admin file) |
| **M-1b** | wrong page route → **real but wrong** file (`staff` → `library.html`) | `src/js/nav.config.js` | **NONE — suite stays GREEN** ⚠ | 0 → gap **G-1** |
| **M-2** | wrong hash — UK spelling `#view=customisation` | `src/js/nav.config.js` | `anchorOk040` (`run.cjs:1568`) + source audit (`:2545`) | 64 + 1 |
| **M-3** | `disabled` item rendered as an **anchor** | `src/js/components/sidebar.js` | `truth010.badDisabled` (`run.cjs:1836`) | 64 + 6 |
| **M-4** | `implemented` item marked **planned** (`settingsUsers`) | `src/js/nav.config.js` | zero-planned census (`run.cjs:253`) | 2 + 64 + 64 + 64 + 1 |
| **M-5** | AR/EN **hash-loss** (`langRoute()` drops the fragment) | `src/js/components/sidebar.js` | every `#view=` href regex, **EN pages only** | 32 EN admin files × 15 |
| **M-6** | **role-inappropriate** nav item (admin `finance.html` injected into `ROLE_NAV.teacher`) | `src/js/fixtures/portal.js` | teacher shell-anchor registry (`run.cjs:2169/2175/2178/2180`) | 16 teacher files × 4 |
| **M-7** | **page-count drift** (58th PAGES base) | `scripts/build-html.mjs` | route freeze (`run.cjs:2583`) | 1 |
| **M-8** | **menu-count drift** (51st nav item) | `src/js/nav.config.js` | `navCount32` (`run.cjs:1391`) | 64 + 64 + 2 + 2 + 1 |

M-1b is the register's headline: **it is the one required mutation the shipped suite does not catch.** It is the
evidential basis for the additive coverage Spec 041 must specify (§6, D-3).

---

## 4. The eight mutations

### M-1 — a wrong page route

#### M-1a (nonexistent target — MUST fail)

**Mutation** — `src/js/nav.config.js`, admin category:
```diff
-item({ id: 'staff', ..., route: 'staff.html' })
+item({ id: 'staff', ..., route: 'staff-members.html' })
```
Rebuild required (`npm run build`).

| Assertion that MUST fail | Site | Predicate |
|---|---|---|
| link integrity — nonexistent target | `run.cjs:1823` | `ok(links010.badTarget === 0, …)`; `badTarget` is computed at `:1814-1816` after `const file = h.split('#')[0];` against `VALID_FILES` (`:41-43`, built from `PAGES` + `index.html`). |

**Expected failure message** (one per admin `page/lang`, **64 lines**; the sidebar is shared, so every
sidebar-bearing file reports):
```
dashboard/ar: 1 link(s) to a nonexistent page file
```
**Must stay green** (the discrimination boundary): `deadNav` (`:180` — it is still an anchor **with** an href),
`navCount32 === 50`, the route/page freeze, the nav.config source audit (`staff`'s route string is **not** pinned
there), and every deep-link block. **Proves**: `badTarget` discriminates a route pointing at a file that does not
exist — and *only* that.

#### M-1b (real-but-wrong target — MUST fail, but **DOES NOT**) ⚠

**Mutation** — `src/js/nav.config.js`:
```diff
-item({ id: 'staff', ..., route: 'staff.html' })
+item({ id: 'staff', ..., route: 'library.html' })
```
**Expected result on the shipped suite: PASS (exit 0).** `library.html ∈ VALID_FILES` ⇒ `badTarget === 0`; `staff`
is an anchor with an href ⇒ `deadNav === 0`; the item count is unchanged ⇒ `navCount32 === 50`; the nav.config
source audit (`:2512-2555`) pins route **strings** for only **9 of 50** items (`materials`, `books`,
`certificateRequests`, `settings×6`) and pins **none** of the 27 plain-file routes; `nav010` pins **ids** and
ordering (`finMembers`, `finLinks`, `admItems`), never the `staff` href.

**Finding G-1 (undetected class).** *Any of the 27 plain-file routes, and any of the 13 pre-Spec-040 deep-link
routes not covered by the source audit, may be silently repointed at another existing page and the entire gate
suite stays green.* The rendered-DOM `anchorOkNNN` regexes do cover all 22 deep-link hrefs (`:1474-1477`,
`:1496-1497`, `:1514-1515`, `:1534-1536`, `:1564-1573`, `:2392-2397`), so a *deep-link* repoint is caught — but
those are **hand-written per-spec literals**, and **no plain-file route is pinned anywhere**. This is the concrete
justification for the derived route matrix in §6 (D-3).

---

### M-2 — a wrong hash (`#view=customisation`, the legacy UK spelling)

Already proven under Spec 040 (the suite carries the explicit warning at `run.cjs:1569-1570`). Re-run at 041 as a
regression proof.

**Mutation** — `src/js/nav.config.js`, settings category:
```diff
-item({ id: 'settingsCustomization', ..., route: 'settings.html#view=customization' })
+item({ id: 'settingsCustomization', ..., route: 'settings.html#view=customisation' })
```

| # | Assertion that MUST fail | Site | Expected failure message |
|---|---|---|---|
| 1 | `anchorOk040(nav040.cust, /(^\|\/)settings\.(en\.)?html#view=customization$/)` | `run.cjs:1568` (loop over `SIX`, `:1559-1569`) | `dashboard/ar: settingscustomization must be a real deep-link → settings.html#view=customization, got {"a":true,"href":"settings.html#view=customisation","soon":false,"disabled":false,"lock":false}` — **64 lines** (one per admin `page/lang`; `${tab}` is the lowercase view id, hence the run-together `settingscustomization`). |
| 2 | nav.config **SOURCE** audit — `SIX_ROUTES` loop | `run.cjs:2545` | `nav.config: settingsCustomization route must be settings.html#view=customization, got settings.html#view=customisation` — **1 line** (runs once, after `browser.close()`). |

**Must stay green — and this is the point of the mutation:**
- `links010.badTarget` — **cannot** catch it. `run.cjs:1814` does `const file = h.split('#')[0];`, so
  `settings.html#view=customisation` validates as `settings.html`. **A dead `#view=` fragment is invisible to
  link integrity.**
- `SP040_VIEWS` seeded deep-link block (`:2441-2472`) — **cannot** catch it. It navigates to its **own literal**
  `#view=customization`, not to the route read from `nav.config`. It tests the *engine*, not the *route*.

**Proves**: hash correctness is guarded **only** by the per-item href regex and (for 9 of 22 items) the source
audit. Nothing mechanically resolves a `#view=` fragment to a real `[data-tabpanel]` — see G-2 (§6, D-3).

---

### M-3 — a `disabled` item rendered as an anchor

The one honest lock must never become navigable. `classSalaryReport` is route-less by construction, so the
mutation must be made in the **renderer**, not the config.

**Mutation** — `src/js/components/sidebar.js`, the item render branch: emit `disabled` items as
`<a href="finance.html" class="nav-item is-disabled" data-nav-status="disabled" …>` instead of
`<button type="button" … aria-disabled="true" data-disabled-reason data-reason-key="nav.reason.finance">`.

| # | Assertion that MUST fail | Site | Expected failure message |
|---|---|---|---|
| 1 | `ok(truth010.badDisabled === 0, …)` — filter at `:1832-1833` requires `tagName === 'BUTTON'` **and** `aria-disabled="true"` **and** `[data-reason-key]` | `run.cjs:1836` | `dashboard/ar: 1 disabled nav item(s) missing button/aria-disabled/reason` — **64 lines**. |
| 2 | `ok(info.deadNav === 0, …)` — an `A` branch now requires a non-`#` href; if the mutation emits `href="#"` instead, `deadNav` **and** `links010.deadHash` fire too | `run.cjs:180` / `:1821` | `dashboard/ar: 1 dead nav item(s) — anchor without route or planned/disabled button without a hook` · `dashboard/ar: 1 dead href="#" link(s) (expected 0)` |
| 3 | `fin.walletOk` — requires `data-nav-status="disabled"` **and** `aria-disabled="true"` **and** `use[href="#i-lock"]` (`:1728-1732`) | `run.cjs:1742` | `dashboard/ar: classSalaryReport lost its disabled/lock state (it must stay the one honest finance lock)` — fires on the dashboard + reports finance block. |
| 4 | `nav010.lockedOk` — `lockedFin = ['classSalaryReport']`, `.every()` over disabled + `data-reason-key === 'nav.reason.finance'` + `#i-lock` (`:1770-1776`) | `run.cjs:1793` | `dashboard/ar: the one honest finance lock (classSalaryReport) must stay disabled+reason+lock` — **64 lines**. |
| 5 | the finance route block's `csr` assert | `run.cjs:2398` | `finance/ar: classSalaryReport must stay a disabled+nav.reason.finance+lock non-anchor with NO route, got {"a":true,"href":"finance.html",…}` — **2 lines** (ar + en). |
| 6 | disabled-nav reason-toast probe — `const dis = await p.$('.nav-item.is-disabled')` then `el.click()` → expects a `.toast` (`:255-263`) | `run.cjs:262` | `dashboard/ar: disabled nav item produced no reason feedback` (an anchor navigates instead of firing the reason toast). |

**Proves**: this single renderer mutation makes **six** independent assertions fire — status attribute, ARIA, hook,
icon, route-lessness, and feedback. *(Distinct from the count in `honest-lock-register.md` §4 / `protected-test-register.md`
§1.4: the lock's own dedicated assertion **sites** number **five** — P-24 · P-25 · P-26 · P-27 · P-34; the sixth
failure here comes from the generic `deadNav`/disabled-nav-feedback probes, which are not lock-specific.)*
**Must stay green**: `navCount32 === 50` (the item still exists — the lock is *retained*, never deleted).

---

### M-4 — an `implemented` item marked `planned`

Already proven under Spec 040 (the zero-planned census was authored as the replacement for the retired click
probe, `run.cjs:231-254`). Re-run at 041.

**Mutation** — `src/js/nav.config.js`:
```diff
-item({ id: 'settingsUsers', ..., status: 'implemented', route: 'settings.html#view=users' })
+item({ id: 'settingsUsers', ..., status: 'planned' })
```

| # | Assertion that MUST fail | Site | Expected failure message |
|---|---|---|---|
| 1 | sitewide zero-planned census (dashboard probe) | `run.cjs:253-254` | `dashboard/ar: Spec 040 — the product must carry ZERO planned «قريبًا» nav items (got planned=1, coming-soon=1)` — **2 lines** (dashboard ar/en). |
| 2 | `nav040.planned === 0 && nav040.comingSoon === 0` | `run.cjs:1574` | `dashboard/ar: Spec 040 — sitewide planned must be 0 (got planned=1, coming-soon=1)` — **64 lines**. |
| 3 | `anchorOk040(nav040.usr, /(^\|\/)settings\.(en\.)?html#view=users$/)` — `soon` is now `true`, and there is no href | `run.cjs:1568` | `dashboard/ar: settingsusers must be a real deep-link → settings.html#view=users, got {"a":false,"href":"","soon":true,…}` — **64 lines**. |
| 4 | `nav039.settingsPlanned === 0` (Spec-040 SUPERSESSION S1, was `=== 6`) | `run.cjs:1539` + `:2505` | `dashboard/ar: settings category still has 1 planned «قريبًا» item(s)` |
| 5 | nav.config **SOURCE** audit — `stillPlanned.length === 0` | `run.cjs:2549` | `nav.config: Spec 040 — ZERO nav items may remain planned, got 1 (settingsUsers)` — **1 line**. |
| 6 | nav.config source audit — the `SIX_ROUTES` status/route pins | `run.cjs:2544-2545` | `nav.config: settingsUsers must be implemented after Spec 040, got planned` |

**Must stay green — and this is a required observation:** `truth010.badPlanned` (`run.cjs:1835`) **stays 0**. The
renderer honestly emits a planned item as a non-navigating `<button data-coming-soon>`, which is exactly what the
filter permits. `badPlanned` is a **render-honesty** guard, not a *zero-planned* guard; it is falsifiable only by
the compound mutation **M-4 + M-3** (planned status **and** an anchor render). Record it as vacuous-at-baseline
(§5), and never cite it as coverage for the zero-planned milestone — the load-bearing asserts are `:253`, `:1574`
and `:2549`.

---

### M-5 — an AR/EN hash-loss defect

Spec 035 made `langRoute()` hash-aware precisely so EN deep-links resolve to `<base>.en.html#view=<id>`. This
mutation reverts that.

**Mutation** — `src/js/components/sidebar.js`, `langRoute()`: strip the fragment when producing the English twin
(i.e. `route.replace(/\.html$/, '.en.html')` applied to the **whole** route string, so
`settings.html#view=general` becomes `settings.en.html` — the pre-035 behaviour: a route bearing a hash no longer
matches `.html$` and falls through unmirrored, or is mirrored with the fragment dropped).

| Assertion that MUST fail | Site | Expected failure message |
|---|---|---|
| all six settings deep-links | `run.cjs:1568` | `dashboard/en: settingsgeneral must be a real deep-link → settings.html#view=general, got {"a":true,"href":"settings.en.html","soon":false,"disabled":false,"lock":false}` (× 6 views) |
| `familyCategories` / `studentResult` / `studentEvaluation` | `run.cjs:1474`, `:1476`, `:1477` | the Spec-035 route messages, EN only |
| `sessionsKpi` / `monthlyPerf` | `run.cjs:1496-1497` | the Spec-036 route messages, EN only |
| `monthlyReports` / `dataAnalysis` | `run.cjs:1514-1515` | the Spec-037 route messages, EN only |
| `materials` / `books` / `certificateRequests` | `run.cjs:1534-1536` | the Spec-039 route messages, EN only |
| the six finance deep-links | `run.cjs:2392-2397` | `finance/en: invoices must be a real anchor → finance.html#view=invoices, got {"a":true,"href":"finance.en.html",…}` |

**Volume**: **32 EN admin files × 15 sidebar-wide route asserts** + the 6 finance-page asserts (en). **All AR
pages stay green** — that asymmetry *is* the signature of a hash-loss defect and is what makes this mutation
diagnostic.

**Recorded gap G-4**: there is **no dedicated AR/EN route-parity assert**. Parity is enforced *emergently*, by the
optional `(en\.)?` group inside each per-item regex, running once per language. It works for the 22 deep-links;
it does **not** exist for the 27 plain routes (they are pinned nowhere — see M-1b/G-1). The audit's
"AR/EN nav route parity: 0 failures" was computed **by the auditor**, not by a shipped assertion.

---

### M-6 — a role-inappropriate nav item (an admin destination injected into a portal nav)

**Mutation** — `src/js/fixtures/portal.js`, `ROLE_NAV.teacher`: append a 9th item
`{ id: 'finance', route: 'finance.html', labelKey: '…', status: 'implemented' }` (rendered by
`components/portal-shell.js` into both the desktop `aside.pt-sidenav` and the mobile drawer).

| # | Assertion that MUST fail | Site | Expected failure message |
|---|---|---|---|
| 1 | `prt.navAside === 8 && prt.navDrawer === 8` | `run.cjs:2169-2170` | `teacher-portal/ar: teacher registry count mismatch (aside 9 / drawer 9, want 8)` |
| 2 | `prt.navListAnchors === 8` | `run.cjs:2175` | `teacher-portal/ar: expected all 8 teacher nav items implemented as links, got 9` |
| 3 | the **sanctioned-anchor registry** — `uniq` vs `wantTch` (the 8 teacher bases + hub, `:2166-2167`) | `run.cjs:2177-2178` | `teacher-portal/ar: teacher shell anchors outside {8 teacher pages, hub}: ["finance.html","portals.html","teacher-library.html","teacher-outcomes.html","teacher-portal.html","teacher-profile.html","teacher-reports.html","teacher-schedule.html","teacher-students.html","teacher-tasks.html"]` |
| 4 | `prt.shellAnchors.length === 19` | `run.cjs:2180` | `teacher-portal/ar: sanctioned teacher shell-anchor multiset must be 19 (8×2 + hub×3), got 21` |

**Volume**: 4 messages × **16 teacher files** = 64 lines. The same registry exists for family
(`navListAnchors === 8`, multiset 19, `:2112-2117` / `:2133-2138`) and student (`=== 7`, multiset 17,
`:2154-2159`) — the mutation MUST be re-run once per role to prove all three registries discriminate.

**Required observations (do not overclaim):**
- `payHit` (`:2070-2072`) and `tchPay` (`:1990-1991`) **stay green** — they scan `#page-body` **innerText**, and
  the portal nav lives **outside** `#page-body`. A pay-adjacent *destination* is caught by the anchor registry,
  **not** by the pay-free regex. Both guards are needed; neither substitutes for the other.
- `prt.adminMarkup` (`:1911`) **stays green** — it detects leaked admin *shell markup*
  (`.app-shell/.nav-rail/.nav-panel`), not an admin *link*.
- **The role-isolation invariant "admin destinations reachable from a portal page = 0" is enforced solely by the
  three shell-anchor registries.** They are exact-set assertions, so they are strong — but they are per-role
  literals, and a **new portal page** added tomorrow would need its base added to `wantTch`/`wantFam`/`wantStu` by
  hand. Record as G-5.
- **Hiding a nav link is not authorization.** This mutation proves the *nav surface* is isolated; real permission
  enforcement is owned by **Spec 043** and is explicitly out of 041's scope.

---

### M-7 — page-count drift

**Mutation** — `scripts/build-html.mjs`: add a 58th entry to `PAGES` (e.g. a duplicate of an existing page under a
new base). `npm run build` then emits 117 files in `public/`.

| Assertion that MUST fail | Site | Expected failure message |
|---|---|---|
| route/page count freeze | `run.cjs:2583` | `route freeze: public/ must hold exactly 115 HTML pages (57×2+index; Spec 035 +2 = schedule-search pair), got 117` — **1 line** (the block runs once, `:2580-2588`). |

**Inverse mutation (also required)**: *remove* a `PAGES` entry → the same assert fires with `got 113`, **and** the
per-base language-mirror assert (`:2586`) fires if only one language is removed:
`route freeze: <base> is missing a language mirror`. Additionally, every nav item routed at the removed base
starts failing `links010.badTarget` (`:1823`) on all 64 admin files — the two guards interlock.

**Must stay green**: `navCount32 === 50` (nav and PAGES are independent registries — which is *why* both counts
need their own freeze).

**041 housekeeping (record, do not silently fix inside the mutation)**: the comment header above this assert
(`run.cjs:2580`) still reads `// ===== Spec 032 — route/page count freeze: 51 bases × 2 languages + index = 103
=====` while the assertion is `=== 115`. Stale comment, correct assert. Correcting it is a comment-only,
zero-behaviour edit and is the *only* test-file edit 041 should even consider — declare it explicitly or leave it.

---

### M-8 — menu-count drift

**Mutation** — `src/js/nav.config.js`: add a 51st `item({ … })` to any category (e.g. a duplicate of `staff` in
`admin`). Rebuild required.

| # | Assertion that MUST fail | Site | Expected failure message |
|---|---|---|---|
| 1 | `navCount32 === 50` (every admin page × 2 langs) | `run.cjs:1391` | `dashboard/ar: admin menu freeze expects exactly 50 classified nav items, got 51` — **64 lines**. |
| 2 | `nav040.menu === 50` | `run.cjs:1576` | `dashboard/ar: admin menu must stay 50, got 51` — **64 lines**. |
| 3 | finance nav block | `run.cjs:2400` | `finance/ar: admin menu must stay 50 classified nav items, got 51` — **2 lines**. |
| 4 | content (library/certificates) nav block | `run.cjs:2506` | `content/ar: admin menu must stay 50 classified nav items, got 51` — **2 lines**. |
| 5 | nav.config **SOURCE** audit | `run.cjs:2554` | `nav.config: the admin menu must stay 50 items, got 51` — **1 line**. |

If the 51st item is added to `admin`, two further asserts fire —
`run.cjs:1788` → `dashboard/ar: admin category should have exactly 5 items and no banks, got ["staff","library","books","certificates","certificateRequests","staff"]`; if added to `settings`,
`run.cjs:2552` → `nav.config: the settings category must keep exactly 7 items`. **Proves**: the 50-item freeze is
defended at **five** independent sites plus two per-category size pins.

---

## 5. Vacuous-at-baseline register (declared, retained, NOT counted as coverage)

Zero-deletion law: these render branches and assertions stay. They are honest guards against a *renderer*
regression; they are simply unfalsifiable by any *config* mutation at the 115/50/0-planned baseline.

| Assertion | Site | Why vacuous | What WOULD falsify it |
|---|---|---|---|
| `truth010.badPlanned === 0` | `run.cjs:1835` | 0 items carry `data-nav-status="planned"` sitewide | **M-4 + M-3 compound** (planned status **and** an anchor/hookless render) |
| `prt.plannedNavAnchors === 0` | `:2111`, `:2132`, `:2153`, `:2174` | `ROLE_NAV` has carried 0 planned items since Spec 025 (portal planned: family 0 · teacher 0 · student 0); the suite already declares this at `:237-240` | a planned `ROLE_NAV` item rendered as `a.pt-nav-item.is-planned` by `portal-shell.js:30` |
| the retired planned-item **click** probe | removed at Spec 040 (S2, justification comment `:231-246`) | `clickFeedback` returns "selector … not found" when no `.nav-item.is-planned` exists ⇒ **unsatisfiable by an honest build** | nothing — correctly retired, **never** repointed at `classSalaryReport` (a `disabled` lock is categorically not a planned item) |
| `sidebar.js` `is-planned` / `data-coming-soon` render branches · the `enhance.js` coming-soon handler | source | permanently unexercised in production nav after Spec 040 | RETAINED by law; M-4 re-exercises the sidebar branch transiently |

---

## 6. Discrimination gaps the mutations expose (Spec 041's additive-coverage mandate)

| ID | Gap | Proven by | Smallest honest fix (additive; no protected assert weakened) |
|---|---|---|---|
| **G-1** | **27 plain-file routes are pinned nowhere.** A nav item repointed at another *existing* page is undetectable. | **M-1b — the suite stays GREEN** | **D-3a**: extend the nav.config SOURCE audit into a **DERIVED route matrix** — iterate `NAV_CATEGORIES` and assert the exact `route` string of **all 50** items (27 plain + 22 deep-link + 1 route-less `classSalaryReport`) against a frozen literal map. |
| **G-2** | **A `#view=` fragment is never mechanically resolved to a real tab.** `links010` strips the fragment (`:1814`); `badTarget` only proves the *file* exists. | **M-2** (green on `badTarget`) | **D-3b**: for every item whose `route` contains `#view=`, assert the fragment id exists as a `[data-tab]`/`[data-tabpanel]` on the target page — **derived from `NAV_CATEGORIES`, not hand-listed**. |
| **G-3** | **13 of 22 deep-links have only an UNSEEDED fresh-load test** (`familyCategories`, `studentResult`, `studentEvaluation`, `sessionsKpi`, `monthlyPerf`, `monthlyReports`, `dataAnalysis`, `invoices`, `monthlyInvoices`, `salaries`, `staffSalaries`, `payments`, `banks`). They prove only *hash beats baked default*; an `initTabs` regression to `stored \|\| hash` precedence would pass all 13. Only the 9 seeded (`SP039_DEEPLINKS` `:2404-2439`, `SP040_VIEWS` `:2441-2472`) discriminate. `selectTab(…,{persist:true})` (`enhance.js:256-259`) writes `academy.schedView.<group>` on every real tab click, so the stored-vs-hash conflict is a **live production state**, not a hypothetical. | test-file read (`:2273-2362`) | **D-3c**: seed the OPPOSITE view in `localStorage['academy.schedView.<group>']` via `ctx.addInitScript` for **all 22**, using the group map: families→`families` · students→`students` · teacher-performance→**`perf`** · reports→`reports` · finance→`finance` · library→`library` · certificates→`certificates` · settings→`settings`. |
| **G-4** | **No dedicated AR/EN route-parity assert.** Parity is emergent from the optional `(en\.)?` group in each per-item regex; the 27 plain routes have no regex at all. | **M-5** (EN-only failures) | folded into **D-3a** — assert each route's `.en` twin preserves the fragment. |
| **G-5** | The three portal shell-anchor registries are per-role hand-written base lists (`wantTch` `:2166-2167`, family `:2113-2117`, student `:2154-2159`). A new portal page needs a manual registry edit. | **M-6** | record only. Registries are exact-set assertions and are **strong**; derive them from `ROLE_NAV` only if a portal page is ever added (candidate owners **049 / 050**, the portal-review slots — *recorded maintainer-amendment entries, not chartered specs*; see `carry-forward-register.md` §"Roadmap provenance"). |
| **G-6** | `initTabs` (`enhance.js:266`) applies the single parsed `hashView` to **every** `[data-tabs]` wrapper on the page. No live bug (no page has two tab groups), but nothing asserts it. | source read | **D-3d** (one line): assert `document.querySelectorAll('[data-tabs]').length <= 1` on admin pages, **or** make D-3b group-aware. |

> **RESOLVED BY THE PLAN ROUND (Q-6 / E-04 / R-18) — this either/or is CLOSED, do not re-open it.** The plan adopts the **group-aware** option and **REJECTS** the `[data-tabs] <= 1 per admin page` rule (it would legislate away a legitimate future multi-group page for no honesty gain). The shipped guard is: every deep-link assertion is scoped `[data-tabs="<group>"] [data-tabpanel="<view>"]`, plus detector **X-9** — *no two `[data-tabs]` groups on one page may declare the same tab id*. See `derived-route-matrix-contract.md` §0/§5 (X-9) and `plan.md` §9 T-07. This is a **refinement, not a supersession**: the one-widget guard was a specify-phase proposal, never shipped code.

| **G-7** | Matrix thinness: `settingsUsers` (`#view=users`) has exactly **one** a11y row (`a11y/run.cjs:209`, en/light/desktop) and exactly **one** screenshot frame (`capture.cjs:429`, ar/light/desktop) — every other deep-link view has ≥2 in each suite. | matrix read | record; if 041 declares a per-deep-link matrix floor, `users` is the row that fails it first. |

**Boundary.** G-1…G-4 and G-6 are **test-side additive coverage** — new assertion blocks, zero application-source
change, zero protected assert weakened. They are the only work 041 may specify beyond the freeze itself, and they
are specified here as *findings*, not as tasks (SPECIFY-ONLY).

---

## 7. Acceptance criteria for the mutation pass

| # | Criterion |
|---|---|
| MT-1 | Pre-proof green: `npm run build && npm run test:smoke` exits 0 at `21502af` before any mutation. |
| MT-2 | **M-1a, M-2, M-3, M-4, M-5, M-6, M-7, M-8** each produce `SMOKE FAILED:` + exit 1, and the printed `fails` list contains the exact expected message(s) of §4 (`page/lang` prefix may vary by iteration order; the message body must match). |
| MT-3 | **M-1b produces exit 0** — recorded as the register's headline finding (G-1), not as a pass. |
| MT-4 | Every mutation is applied in a **detached worktree** and reverted by removing it. `git stash` / `git reset --hard` / `git checkout --` / `git clean` are never run. Post-proof: the real tree is byte-identical to `21502af` (`git status --porcelain` empty). |
| MT-5 | Post-proof green: `npm run build && npm run test:smoke && node tests/a11y/run.cjs` after all mutations are reverted. |
| MT-6 | Every §5 vacuous assert is declared in the spec's freeze narrative and is **not** counted toward any invariant's coverage. |
| MT-7 | No mutation is left in the tree, in any form, for any reason (the no-lie rule). |
| MT-8 | The 0-diff wall holds (13 files): `package.json` · `scripts/build-html.mjs` · `src/js/i18n.js` · `src/js/enhance.js` · `src/js/components/sidebar.js` · `src/js/components/tabs.js` · `src/js/components/form-field.js` · `src/js/components/settings-section.js` · `src/js/components/preview-drawer.js` · **`src/js/components/ui.js`** *(not `src/js/ui.js` — no such path)* · `src/js/fixtures/settings.js` · `src/js/pages/staff.js` · `src/js/fixtures/staff-management.js` — byte-identical to `21502af` **after** the mutation pass. |
