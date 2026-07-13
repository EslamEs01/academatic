# Count & Freeze Contract — Spec 041

**Status**: BINDING on Specs 042–057.
**Baseline commit**: `21502af` ("feat: implement settings deep linking architecture and add technical specification
contracts") on `feature/012-role-portal-foundation`; working tree CLEAN; pushed and in sync with
`origin/feature/012-role-portal-foundation` (ahead 0, behind 0); the commit is also present on `origin/main`.
Canonical remote: `git@github.com:EslamEs01/academatic.git`.
**Prior HEAD**: `58a53e2` (Spec 039 + the Spec 040 specification).
**Nature**: FREEZE. This contract creates no page, no route, no nav item, no hook, no storage key, no dependency.
It records the numbers that the product has actually reached and makes them non-negotiable except through the
supersession law in §8.

Every figure below was recomputed from the tree at `21502af`. No number is inherited from CLAUDE.md, from Spec 033's
`page-count-envelope.md`, or from any prior implementation-status note. Where a prior document disagrees, §7 says so
and this contract wins.

---

## 1. The frozen counts

### 1.1 Pages / files

| # | Invariant | Frozen value | Where it lives |
|---|---|---|---|
| C-01 | Total generated HTML in `public/` | **115** | `public/*.html` (maxdepth 1) |
| C-02 | Base pages (language-independent page ids) | **57** | one per PAGES entry |
| C-03 | `PAGES` registry entries in `scripts/build-html.mjs` | **57** | `build-html.mjs` |
| C-04 | Arabic pages (`<base>.html`) | **57** | build output |
| C-05 | English pages (`<base>.en.html`) | **57** | build output |
| C-06 | Language-neutral public pages | **1** | `index.html` |
| C-07 | Admin / sidebar-bearing FILES (render `.nav-panel` + `data-nav-category`) | **64** | 32 admin bases × 2 |
| C-08 | Admin bases | **32** | subset of C-02 |
| C-09 | Portal / role-shell FILES (render the portal shell, no admin sidebar) | **50** | 25 portal bases × 2 — **48** of them render `pt-nav-item`; the 2 hub files carry the portal shell **without** a role sidenav |
| C-10 | Portal bases | **25** | subset of C-02 |
| C-11 | Portal bases — family | **9** (18 files) | `ROLE_NAV.family` surface |
| C-12 | Portal bases — teacher | **8** (16 files) | `ROLE_NAV.teacher` surface |
| C-13 | Portal bases — student (child-view) | **7** (14 files) | `ROLE_NAV.student` surface |
| C-14 | Portal bases — hub | **1** (2 files) | `portals.html` / `.en` |
| C-15 | Files that are neither admin nor portal | **1** | `index.html` |

### 1.2 Admin navigation (`src/js/nav.config.js`, rendered by `components/sidebar.js`)

| # | Invariant | Frozen value |
|---|---|---|
| C-16 | Rail categories | **6** (`control` · `families` · `teachers` · `reports` · `admin` · `settings`) |
| C-17 | Admin menu items, total | **50**, 0 unclassified |
| C-18 | — control | **12** |
| C-19 | — families | **9** |
| C-20 | — teachers | **6** |
| C-21 | — reports | **11** |
| C-22 | — admin | **5** |
| C-23 | — settings | **7** |
| C-24 | `status: 'implemented'` | **49** |
| C-25 | `status: 'planned'` | **0** |
| C-26 | `status: 'disabled'` (honest locks) | **1** — `classSalaryReport` only |
| C-27 | `[data-coming-soon]` rendered anywhere in the 115 built pages | **0** |
| C-28 | Deep-link routes (`route` contains `#view=`) | **22** |
| C-29 | Plain page routes (`route` = a bare `*.html`) | **27** |
| C-30 | Route-less items | **1** (`classSalaryReport`) |
| C-31 | `FUTURE_ROUTES` | **`{}`** (empty by construction) |
| C-32 | `FUTURE_ROLE` (documented, never rendered) | **3** (`teacher-portal`, `family-portal`, `student-portal`) |

### 1.3 Portal navigation (`ROLE_NAV` in `fixtures/portal.js`, rendered by `components/portal-shell.js`)

| # | Role | Unique items | Composition | Rendered instances / page | Planned |
|---|---|---|---|---|---|
| C-33 | teacher | **9** | 8 role pages + 1 hub exit | 18 (desktop sidebar + mobile drawer) | **0** |
| C-34 | family | **9** | 8 role pages + 1 hub exit | 18 | **0** |
| C-35 | student | **8** | 7 role pages + 1 hub exit | 16 | **0** |

`plannedNavAnchors === 0` is asserted four times in the smoke suite and is honestly **vacuous** — the `is-planned`
render branch in `portal-shell.js:30` has been unexercised since Spec 025 and is RETAINED, never deleted (zero-deletion
law).

---

## 2. Every arithmetic check, shown

```
A-1  bases            : 32 admin  + 25 portal                     = 57   ✅  (= C-03 PAGES entries)
A-2  bilingual files  : 57 bases  × 2 languages                   = 114
A-3  total generated  : 114       + 1 index.html                  = 115  ✅  (= C-01)
A-4  language split   : 57 AR + 57 EN + 1 neutral                 = 115  ✅
A-5  admin files      : 32 admin bases × 2                        = 64   ✅  (= C-07)
A-6  portal files     : 25 portal bases × 2                       = 50   ✅  (= C-09)
A-7  file partition   : 64 admin + 50 portal + 1 index            = 115  ✅
A-8  portal bases     : 9 fam + 8 tch + 7 stu + 1 hub             = 25   ✅  (= C-10)
A-9  portal files     : 18 fam + 16 tch + 14 stu + 2 hub          = 50   ✅  (= C-09, cross-check of A-6)
A-10 admin menu       : 12 + 9 + 6 + 11 + 5 + 7                   = 50   ✅  (= C-17)
A-11 status census    : 49 implemented + 0 planned + 1 disabled   = 50   ✅  (= C-17, cross-check of A-10)
A-12 route split      : 22 deep-link + 27 plain + 1 route-less    = 50   ✅  (= C-17, cross-check of A-10)
A-13 implemented↔route: 22 deep-link + 27 plain                   = 49   ✅  (= C-24; every implemented item HAS a route)
A-14 lock ↔ route-less: 1 disabled                                = 1    ✅  (= C-30; the ONE lock is the ONE route-less item)
A-15 distinct deep-link destinations
                      : 22 routes − 1 shared pair (salaries ≡ staffSalaries)
                                                                  = 21   (see S-1, §5)
A-16 distinct plain destinations
                      : 27 routes − 2 collapsed (addTeacher, teacherCategories ≡ teachers)
                                                                  = 25   (see D-1, §5)
A-17 portal nav uniques: 9 tch + 9 fam + 8 stu                    = 26 (across 3 disjoint role shells)
A-18 gallery accounting: gallery.html/.en RENDER the admin sidebar → they are 2 of the 64 admin files
                         and 1 of the 32 admin bases, even though they carry NO nav item (activeId: null).
                         64 admin files ≠ 50 nav items: the menu addresses 27 distinct plain files +
                         8 deep-link host files, not every admin file.
```

All **nine** independent identities (A-3, A-4, A-7, A-9, A-10, A-11, A-12, A-13, A-14) close without residue — with
A-1/A-2/A-5/A-6/A-8 as their inputs and A-15/A-16/A-17/A-18 as derived observations. There is no orphan count, no
double-count, no off-by-one.

---

## 3. RECONCILIATION with previously reported figures

Prior artifacts (Specs 031–040, `CLAUDE.md`, the 040 impact-protection contract) report the shape as
**115 / 57 / 50 / 64 / 51**. That is the SAME product; the last two figures used a different partition. Recorded here
so no future spec re-derives a contradiction:

| Prior figure | Prior meaning | This contract's figure | Reconciliation |
|---|---|---|---|
| **115** total HTML | identical | **115** (C-01) | Exact match. Chain: 103 (Spec 032 freeze) → 113 (034, +10) → 115 (035, +2 `schedule-search`) → HELD by 036/037/038/039/040. |
| **57** bases / PAGES | identical | **57** (C-02/C-03) | Exact match. |
| **50** admin menu items | identical | **50** (C-17) | Exact match (Spec 032 gate, held by 034–040). |
| **64** admin files | identical | **64** (C-07) | Exact match. Both include `gallery.html` / `gallery.en.html` — they render the shared sidebar. |
| **51** "non-admin pages" | 040 impact contract §2: "51 non-admin files (16 portal pages + portal internals + `index.html`)" | **50 portal + 1 index** (C-09 + C-15) | **The prior 51 = 50 portal files + `index.html`.** `index.html` renders neither the admin sidebar nor a role shell; the 040 partition folded it into the non-admin bucket. This contract splits it out as its own class (C-15). `64 + 51 = 115` and `64 + 50 + 1 = 115` are the same statement. |
| **"portal ×16"**, **"the 16 portal pages"** | recurring shorthand in CLAUDE.md and Specs 025–040 | **16 = teacher-portal FILES** (8 bases × 2) | **The "16" never meant all portals.** It is the teacher role app's file count — the set the `payHit` pay-free regex is run against. All portals together are **50** files / **25** bases (C-09/C-10). Any future spec reading "16 portal pages" in a 025–040 artifact must read it as "the 16 teacher-portal files". |
| **"16 files"** in the family zero-pay assert | family-portal home + 7 family internals + `family-child`, ×2 = the surfaces `famPay`/`payFigure` guard | family bases are **9** → **18** files | The zero-pay regex suite runs as: `famPay` over the 7 family INTERNAL pages (14 files) + `payFigure` over `family-portal` (2) and `family-child` (2). The union is the full 18; the "16" in the audit brief counts the two `payFigure` sites as one pass. Both statements describe the same 9 bases; C-11 (**9 bases / 18 files**) is the frozen figure. |

**Net**: no prior figure is wrong. Two of them were expressed in a partition this contract now supersedes for
clarity. The frozen partition is **64 admin + 50 portal + 1 index = 115**, with **teacher-portal = 16 files** named
explicitly wherever the pay-free law is invoked.

---

## 4. What "frozen" means, mechanically

For each invariant C-01 … C-35, a spec in 042–057:

- **MAY** re-verify it (and MUST, if it touches `nav.config.js`, `build-html.mjs`, `portal.js`, or `public/`).
- **MAY** strengthen the assertion that guards it (tighten a bound, add a derived check, widen a matrix).
- **MUST NOT** change the value silently.
- **MUST NOT** weaken or delete the assertion that guards it.
- **MUST NOT** delete an unexercised render branch (`sidebar.js` coming-soon branch, `enhance.js` `data-coming-soon`
  handler, `portal-shell.js:30` `is-planned` branch) to "clean up" a now-vacuous count. Zero-deletion law.
- **MUST NOT** achieve a count by lying. Spec 040's ruling is carried verbatim into this contract: *"A test may never
  be the reason a product lies."* Corollary for 041: **a freeze may never be the reason a product lies** — if an
  honest fix breaks a frozen count, take the supersession path (§8), do not suppress the fix.

### 4.1 The guards already in place (do not weaken)

| Invariant | Guard site (`tests/smoke/run.cjs` unless noted) |
|---|---|
| C-01 = 115 | route-freeze block, `pub.length === 115` (+ per-base language-mirror check) |
| C-03 = 57 | same block, iterates `PAGES` |
| C-17 = 50 | four DOM sites (`navCount32 === 50`; `nav040.menu === 50`; finance `nav.adminMenu === 50`; content `nav.adminMenu === 50`) **+ the source audit** `allItems.length === 50` |
| C-16 = 6 | `nav010.railCats === 6` |
| C-23 = 7 | source audit: settings category `items.length === 7` |
| C-25 = 0 | `nav040.planned === 0`; source audit `stillPlanned.length === 0`; `truth010.badPlanned` (vacuous, retained) |
| C-26 = 1 | `nav040.locks === 1`; `nav010.lockedOk` (disabled + `nav.reason.finance` + `#i-lock`); finance `nav.csr` (non-anchor, no href); source audit `locks.length === 1 && locks[0].id === 'classSalaryReport'` |
| C-27 = 0 | `nav040.comingSoon === 0`; the sitewide zero-census that replaced the retired planned-item click probe |
| C-31 = `{}` | source audit `Object.keys(fr).length === 0` |
| C-28 (22) | 9 routes pinned in the SOURCE audit; all 22 covered by fresh-context DOM tests (13 of them non-discriminating — see §6) |
| C-33/34/35 | `plannedNavAnchors === 0` ×4 (vacuous, retained) |
| pay-free / zero-pay / child-view | `payHit`, `tchPay`, `famPay`, `payFigure` ×2, child-view regex, `PAY28` — **byte-verbatim protected register** |

---

## 5. The two non-unique destinations, frozen consciously

A frozen count must not hide a defect behind arithmetic. Both known route collisions are recorded, with opposite
verdicts:

**S-1 — LEGITIMATE, frozen as-is.** `salaries` and `staffSalaries` both route to `finance.html#view=salaries`.
Spec 038 declared it: the salaries tab carries BOTH the teacher board and the staff board (both figure-free). Two nav
items, one destination tab, by design. A-15 records the resulting 21 distinct deep-link destinations. **This is not a
duplicate and must never be "fixed" by inventing a seventh finance tab.**

**D-1 — DEFECT, frozen as a KNOWN DEFECT, not as correct.** `teachers`, `addTeacher` and `teacherCategories` all
carry the byte-identical route string `teachers.html` with **no hash**. `enhance.js` handles only `#view=` (tabs) and
`#step=` (wizard); there is no drawer-hash mechanism, so landing on `teachers.html` opens **no drawer** — the
`trn-add` / `trn-categories` templates exist but are reachable only via the page's own header buttons. Spec 036
declared these "fold-anchors"; a declaration does not make a destination honest. Legacy had three (arguably four)
genuinely distinct teacher-domain sidebar destinations (`/management/teachers` roster · `/management/teachers/create`
57-field form · `/management/teacher-categories` CRUD · `/management/teachers_details`), so this is a navigational
regression, not a labelling nit.

> **Freeze rule for D-1 (the one carve-out in this contract).** The *route strings* of `addTeacher` and
> `teacherCategories` are **NOT** frozen — they are the single nav surface this contract deliberately leaves open for
> correction. The chosen fix (option set: `spec.md` §7 D-1 **A–G**; recommendation **A**) MAY change those two route
> strings **without invoking the §8 supersession law**, under three conditions:
>
> 1. **Every count in §1 holds except the route-split composition** — C-01…C-27 and C-30…C-35 are unchanged: 115
>    pages · 57 bases · 64/50/1 · 6 categories · **50** items · 12/9/6/11/5/7 · 49 implemented / 0 planned / **1**
>    lock · `FUTURE_ROUTES` `{}` · portal 9/9/8. **No page may be added** (C-01/C-02/C-03 stay 115/57/57).
> 2. **C-28 / C-29 are re-classifiable, and only by this fix.** Option A moves the two items from the plain bucket to
>    the deep-link bucket: **C-28 22 → 24** and **C-29 27 → 25**. The **routed total is invariant**: 24 + 25 = **49**
>    routed + **1** route-less = **50** ✅ (A-12/A-13/A-14 all still close). This is a **re-classification, not a count
>    change** — the plan must state it explicitly, and the derived deep-link matrix (§6.3) must then assert **24**, not
>    22. Any *other* movement of C-28/C-29 is a silent drift and **is** a §8 supersession.
> 3. It is the **smallest honest** option, and A-16 (distinct plain destinations, today 25) is recomputed and shown to
>    close.
>
> **The fix is not chosen here.** This contract prices the carve-out; `/speckit.plan` selects the option.

**D-2 — ORPHAN, frozen with an owner requirement.** `gallery.html` / `gallery.en.html` are registered in `PAGES`
(`activeId: null`), render the admin sidebar (hence 2 of the 64), carry no nav item, and are linked from nowhere —
not `index.html`, not any page. They are the component/design-system reference. An intentionally-reachable
non-sidebar page is not automatically a defect, but it has **no documented owner and no entry path**. The freeze holds
the count (they stay 2 of the 115); it does **not** bless the orphan state, and it does **not** decide the fix.

> **Freeze rule for D-2**: the count is frozen (`gallery` stays 2 of the 115 / 1 of the 32 admin bases). The
> **owner + entry-path record is NOT written here** — the option set is `spec.md` §7 D-2 **A–D**, recommendation
> **A** (document it, don't link it; owner = the **frontend/design-system maintainer**; entry path = direct URL only,
> by design), and **the decision belongs to `/speckit.plan`**. No spec number owns `gallery`: 044 (FO-23) owns the
> modal/drawer/long-form **interaction system**, not the page that renders the component catalogue, and this contract
> asserts no owner the committed corpus does not support.

---

## 6. Coverage debt recorded at freeze time (not fixed here)

Frozen counts are only as safe as the assertions behind them. Three holes exist at `21502af` and are recorded so a
later spec cannot claim they were unknown:

1. **13 of the 22 deep-links are non-discriminating.** Only 9 (`materials`, `books`, `certificateRequests`,
   `settings`×6) are tested with the OPPOSITE tab pre-seeded in `localStorage['academy.schedView.<group>']`. The other
   13 (`familyCategories`, `studentResult`, `studentEvaluation`, `sessionsKpi`, `monthlyPerf`, `monthlyReports`,
   `dataAnalysis`, `invoices`, `monthlyInvoices`, `salaries`, `staffSalaries`, `payments`, `banks`) load with EMPTY
   storage, so they prove only "hash beats the baked default". A regression of `initTabs` to `stored || hash`
   precedence would pass all 13. `selectTab(..., {persist:true})` writes storage on every real tab click, so the
   conflict state is a genuine production state, not a hypothetical.
2. **The link-integrity crawl never validates a `#view=` fragment.** It strips the hash before the `VALID_FILES`
   lookup, so `badTarget` proves only that the FILE exists. `settings.html#view=customisation` (UK spelling) would be
   invisible to it.
3. **No derived deep-link matrix.** `SP037_DEEPLINKS` / `SP039_DEEPLINKS` / `SP040_VIEWS` / the finance view array are
   hand-written literals. Nothing iterates `NAV_CATEGORIES` to assert that **every** item whose route contains `#view=`
   resolves to an existing `[data-tab]` on its target page. A 23rd deep-link added tomorrow gets ZERO automatic
   coverage — which directly threatens C-28.

Also recorded: `truth010.badPlanned` is now vacuous (C-25 = 0 makes its filter unsatisfiable) and is retained
byte-verbatim, exactly as `plannedNavAnchors === 0` has been since Spec 025. `#view=users` is the thinnest matrix row
in both the a11y suite (1 row) and the screenshot suite (1 frame); any per-deep-link matrix floor added later fails
there first.

**Carry-forward (explicitly NOT owned by 041)**: `common.backendRequiredNote` reads "…nothing is **saved** yet" in EN
— honest (it DENIES a save) but it carries the token the fake-success census greps. It renders on ~50 pages;
rewording it exceeds a route/sidebar freeze's impact boundary. Sitewide the token count fell 182 → 179 under Spec 040.
The committed corpus assigns this to "Spec 044/056" (a dual owner, recorded in an implementation-status findings
section, not in any contract). **This contract does not resolve that ownership.** Per `spec.md` FR-023 / Q-4, 041
**recommends 044** (with evidence — see `carry-forward-register.md` CF-1) and the **single owner is named in
`/speckit.plan`**, choosing only among the corpus-named candidates 044 / 056 / 057. What IS binding here: the copy
sweep, whoever owns it, may not change any count in §1.

---

## 7. Superseded documents

| Document | Claim | Verdict |
|---|---|---|
| `specs/033-admin-nav-completion-strategy/page-count-envelope.md` | "recommended target **119**; 117 ≤ final ≤ ~139" | **SUPERSEDED.** The envelope was explicitly advisory, but it is the only committed document naming a final number and it names the wrong one. Finance shipped as 6 tabs on `finance.html`, not the predicted standalone invoices+payments pairs. **The final count is 115** (C-01). |
| `specs/033-admin-nav-completion-strategy/follow-up-spec-roadmap.md` | 041 is the FINAL "Sidebar / Route / Production Re-Freeze" | **SUPERSEDED** by the later maintainer-directed amendment in `specs/040-.../future-owner-register.md` §1/§3: 041 is a **baseline** route/sidebar freeze BEFORE the 042–057 review programme, **not** the final product freeze; no real integrations may be assigned to it. **The final exhaustive parity/security/production freeze is Spec 057.** |
| `specs/040-.../protected-test-supersession-register.md` | "Spec 038 pointed the probe at `admin`; Spec 039 repointed it admin → settings" | **FACTUALLY CORRECTED.** Git disproves the first clause. The true chain of the `.nav-item.is-planned` click probe: **034** control→families · **035** families→teachers · **036** teachers→admin (`56bc418`, `run.cjs:227`) · **038** NO-OP (its sole supersession was `lockedFin`/`finLinks`) · **039** admin→settings · **040** RETIRED (no honest category left; replaced in place by the sitewide zero-census). Spec 040's conclusion is unaffected; the narrative is corrected. |
| `CLAUDE.md` (at `21502af`) | HEAD = `4cbcb31`; Spec 039 "awaiting the watcher commit"; "settings is the ONLY planned-bearing category (6 items → Spec 040)" | **STALE.** HEAD = `21502af`; Specs 039 (`58a53e2`) and 040 (`21502af`) are both COMMITTED; settings carries **0** planned items. Spec 040's own contracts logged this as Risk R9 and warned that *any supersession computed against `4cbcb31` is void*. 041 refreshes CLAUDE.md as part of the freeze. |
| Any 025–040 artifact reading "portal ×16" / "the 16 portal pages" | shorthand | **CLARIFIED, not superseded**: 16 = teacher-portal FILES. See §3. |

---

## 8. THE SUPERSESSION LAW (binding on 042–057)

A frozen count in §1 may be changed by **exactly one mechanism**: an **explicit, declared supersession contract**
committed as part of the superseding spec, before any source, test or HTML change is made.

A valid supersession contract MUST contain, in this order:

1. **The invariant id and its frozen value** (e.g. "C-01 = 115"), quoted from this file.
2. **The new value**, and the exact arithmetic re-run — every identity in §2 that the change touches, recomputed and
   shown to close (e.g. a new base pair changes A-1, A-2, A-3, A-5 or A-6, A-7, and A-9; all of them must be shown).
3. **The grounded justification.** Legacy evidence (`output/…`, `frontend-planning-deep/…`) or a named product
   requirement. A count may never move for convenience, for symmetry, or to make a test pass.
4. **The honesty proof.** The new surface satisfies every standing law: teacher pay-free (global) · family zero-pay ·
   student child-view · finance no-fake-money · no-secret · no-fake · closed `data-*` hook set (no new hook, no new
   storage key, no new dependency). Hiding a nav link is NOT authorization; real enforcement is owned by Spec 043.
5. **The exact impact statement**, proved NON-DESTRUCTIVELY (`git show <commit>:<path>` or a detached
   `git worktree add --detach`; **NEVER** `git stash`, `git reset --hard`, `git checkout -- <path>`, `git clean`, or a
   branch switch). `#page-body` is extracted with
   `sed -n '/<div[^>]*id="page-body"/,/<\/div><!-- \/page-body -->/p'` and md5'd against the committed baseline.
   The statement partitions all files as: body-changed / sidebar-only / byte-identical, summing to the new C-01.
6. **The guard update**, declared as a supersession or a strengthening, naming every assertion line touched. Protected
   asserts (`payHit`, `tchPay`, `famPay`, `payFigure` ×2, child-view, `PAY28`, `truth010`, `deadNav`, `links010`,
   `plannedNavAnchors`, `nav010` rail/finance/banks/sessions/famTitle, `navCount32`, the finance and reports body
   asserts, `a31`/`g32`) stay **BYTE-VERBATIM** unless the supersession names them explicitly and shows that the new
   text is strictly stronger.
7. **The register entry**: the superseding spec appends the change to its own `*-supersession-*.md`, and this file's
   §7 gains a row.

### 8.1 What may NEVER be superseded

These are not counts; they are laws. No supersession contract can move them.

- **C-26 = 1 honest lock.** `classSalaryReport` may be *promoted* only by a spec that delivers a real, non-computed
  class-salary surface — which the no-fake-money + pay-free laws forbid at the frontend. It may **never** be joined by
  a second lock invented to hide an unfinished surface, and it may **never** be re-labelled `planned`: a disabled lock
  is categorically NOT a planned item (different status, different hook — `data-disabled-reason` + `data-reason-key` +
  `#i-lock`, not `data-coming-soon`).
- **C-25 = 0 planned / C-27 = 0 coming-soon.** A regression to a non-zero value is a product lie, not a count change.
  New unfinished work ships as an honest lock with a reason key, or it does not ship.
- **C-31 = `{}`.** A promoted item carries a real route on the item itself, never a placeholder in `FUTURE_ROUTES`.
  The map is permanently empty by construction.
- **The zero-deletion law.** Vacuous-but-retained guards and unexercised render branches stay.
- **The role-law regexes** and the `teacher-performance.html` exemption (the sanctioned Spec-024 B-07 admin board,
  linked from ZERO portal pages).

### 8.2 The freeze in one line

> **115 pages · 57 bases · 64 admin + 50 portal + 1 index · 50 nav items (49 implemented / 0 planned / 1 lock) ·
> 22 deep-links + 27 plain routes · `FUTURE_ROUTES = {}` · portal nav 9 / 9 / 8.**
> Move any of these only through §8.

---

## 9. Re-verification recipe (run at the start of every spec 042–057)

```bash
cd academy-dashboard-discovery/app
find public -maxdepth 1 -name '*.html' | wc -l                 # → 115   (C-01)
grep -c "^  {" scripts/build-html.mjs                          # PAGES entries → 57 (C-03)
grep -l 'data-nav-category' public/*.html | wc -l              # → 64    (C-07)
grep -l 'pt-nav-item'       public/*.html | wc -l              # → 48    (NOT 50 — see the caveat below)
npm run build && npm run test:smoke                            # 115 built; route-freeze + navCount32
                                                               #  + nav040 + the nav.config SOURCE audit
```

> **Detection caveat (C-09), verified live — do not "fix" the number to 50.** `pt-nav-item` greps to **48**, because
> `portals.html` / `.en` (the hub, C-14) render the portal shell but carry **no role sidenav** (`grep -c 'pt-nav-item'
> public/portals.html` → **0**). The portal class is **48 role-nav files + 2 hub files = 50** (C-09), and the partition
> still closes: `64 + 50 + 1 = 115`. The complement check is the reliable one:
> `115 − 64 (admin) − 1 (index.html) = 50`.

The smoke suite's **`nav.config` SOURCE audit** (run after `browser.close()`) is the authoritative guard for C-17,
C-23, C-25, C-26, C-31 — it reads the module, not the DOM, and is the only assertion that can catch a route defect the
rendered pages happen to hide. Any spec that touches `nav.config.js` must extend it, never bypass it.

**Stale-comment note (cosmetic, for the 041 freeze to correct):** the route-freeze block header in
`tests/smoke/run.cjs` still reads `// ===== Spec 032 — route/page count freeze: 51 bases × 2 languages + index = 103
=====` while the assertion below it correctly asserts `115`. The comment lies; the test does not.
