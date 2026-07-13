# Spec 041 — Full Frontend Route & Sidebar Production Freeze

**Status**: SPECIFIED (specify-only; no plan, no tasks, no implementation)
**Type**: AUDIT / FREEZE — **not** a redesign, feature, form-completion, integration, privacy-backend or community spec
**Baseline**: HEAD `21502af` (Spec 040 committed), branch `feature/012-role-portal-foundation`, working tree CLEAN
**Supersedes (definition of 041)**: `033-admin-nav-completion-strategy/follow-up-spec-roadmap.md`
**Governed by**: `040-settings-deep-links-subpages/future-owner-register.md` §1/§3 (the maintainer-directed amendment)

> **Roadmap provenance (binding on every "owner" cell in this spec).** The committed spec corpus contains, as
> chartered specs with their own `spec.md`, only **041**. **Specs 042–057 do not exist as spec directories.** They are
> named in exactly one committed document — `040-settings-deep-links-subpages/future-owner-register.md` §1 — which
> says so itself, verbatim: *"the committed spec corpus contains **only Spec 041** … **Specs 042–057 appear nowhere in
> any committed artifact.** The roadmap below is a **maintainer-directed, append-only amendment** … and it
> **redefines 041**."* Every owner named below (042, 043, 044, 045–050, 051–057) is therefore a **recorded maintainer
> intention**, not a chartered spec. This spec invents no spec number and no roadmap entry; it cites that register and
> repeats this caveat wherever it assigns an owner.

---

## 1. Purpose

Spec 040 finished the Spec-033 nav-completion roadmap: every admin nav category reached **zero planned items**,
`FUTURE_ROUTES` reached `{}`, and exactly **one** honest lock (`classSalaryReport`) remained. Spec 041 does not add
to that surface. Its single job is to **audit the whole route + sidebar surface, prove it honest, and freeze it** —
so that every later spec (042–057) starts from a route baseline that is *known-true*, not *assumed-true*.

### 1.1 What 041 IS

1. A **census**: recount every page, every nav item, every route, every deep-link, every link target — from the
   tree at `21502af`, never from a prior spec's prose.
2. An **honesty proof**: 0 planned · 0 `[data-coming-soon]` · 0 `href="#"` · 0 dead link targets · 0 dead `#view=`
   hashes · 0 AR/EN nav-parity failures · 0 cross-role leaks · exactly 1 honest lock.
3. A **defect report**: two findings (D-1, D-2) with their *smallest honest fix* options and exact impact.
4. A **freeze**: the counts (115 / 57 / 64 / 50 / 22 / 1 / 0) become machine-asserted constants that a later spec may
   only change through a declared, documented supersession.
5. A **documentation reconciliation**: CLAUDE.md, the stale smoke comment, and the two conflicting roadmap
   definitions of "what Spec 041 is" are brought into agreement with the tree.

### 1.2 What 041 IS NOT — the boundary against the review specs

041 **must not consume the design work of the bounded review specs.** It may not redesign, restyle, re-copy or
re-architect anything. Concretely:

| Temptation inside 041's blast radius | Forbidden here | Owner |
|---|---|---|
| Redesigning the sidebar rail / IA / grouping | ❌ | the bounded review specs (**045–050**) |
| Rewording gate copy sitewide (`common.backendRequiredNote` "…nothing is saved yet") | ❌ | see §9 CF-1 |
| Modal / drawer / long-form interaction system (incl. any drawer-opening mechanism) | ❌ | **Spec 044** (FO-23) |
| Form completeness / field parity | ❌ | **Spec 056** (FO-24) |
| Real permission enforcement behind hidden links | ❌ | **Spec 043** |
| Any real integration (WhatsApp / Zoom / payment / SMTP) | ❌ **expressly barred from 041** | 053 / 054 |
| Legacy page-by-page capability reconciliation (the 5 dropped finance destinations) | ❌ | **Spec 042** |
| Final product freeze | ❌ 041 is a *baseline* freeze | **Spec 057** |

**Binding definition conflict, resolved here.** Two committed documents disagree:

* `033-.../follow-up-spec-roadmap.md` calls 041 the *final* "Sidebar / Route / Production Re-Freeze".
* `040-settings-deep-links-subpages/future-owner-register.md` §1/§3 **redefines** it as a *route/sidebar **baseline** freeze* preceding an
  exhaustive review programme (042–057), states that **no real integrations may be assigned to 041**, and moves the
  final freeze to **Spec 057**.

**FR-000 (governing): the later, maintainer-directed amendment governs.** Spec 041 is a BASELINE freeze. It is not
the final product freeze. `033-.../follow-up-spec-roadmap.md`'s definition of 041, and
`033-.../page-count-envelope.md`'s advisory "recommended target 119", are **superseded** by this spec: the frozen
count is **115**.

### 1.3 Standing laws, unchanged

Teacher pay-free (global) · family zero-pay · student child-view · finance no-fake-money · settings no-fake-settings ·
no-secret · no-fake · closed `data-*` hook set (no new hook, no new storage key, no new dependency) · zero-deletion
(the unexercised `is-planned` / `data-coming-soon` render branches in `sidebar.js`, `enhance.js`, `portal-shell.js`
stay) · **hiding a nav link is NOT authorization** (real enforcement is owned by Spec 043).

---

## 2. Baseline & commit verification

| Item | Verified value |
|---|---|
| Branch | `feature/012-role-portal-foundation` |
| HEAD | `21502af` — "feat: implement settings deep linking architecture and add technical specification contracts" |
| Prior HEAD | `58a53e2` (Spec 039 + the Spec 040 specification) |
| Working tree | **CLEAN (0 entries)** at baseline capture. During this specify pass the only additions are the untracked `specs/041-route-sidebar-production-freeze/` artifacts and the speckit-managed `.specify/feature.json`; **0 application-source, test or HTML files are touched** (see §6, Impact protection). |
| Remote sync | **PUSHED** — in sync with `origin/feature/012-role-portal-foundation` (ahead 0, behind 0); the commit is also present on `origin/main`. Canonical remote `git@github.com:EslamEs01/academatic.git` |
| Commit scope audit | 115 files = `nav.config.js` (1) + `pages/settings.js` (1) + `fixtures/settings*` (2) + locales `ar/en.adm` (2) + `styles/app.css` (1) + tests (3) + public HTML (64) + public assets (7) + `specs/040` (31) + `CLAUDE.md` + `app/README.md` + `screenshots/REVIEW.md`. **Nothing unrelated was bundled.** |

**Documentation drift found (must be closed by 041).** `CLAUDE.md` still names HEAD `4cbcb31` and describes Spec 039
as "awaiting the watcher commit". In fact **both 039 (`58a53e2`) and 040 (`21502af`) are committed**. Spec 040's own
contracts logged this as Risk R9 and warned that *"any supersession computed against `4cbcb31` is void."* Every
number in this spec is recomputed from `21502af`.

---

## 3. The recomputed count table

Every figure below was recomputed from the post-040 tree. No figure is inherited from a prior spec's prose.

### 3.1 Pages

| Bucket | Count | Definition |
|---|---:|---|
| Generated HTML in `public/` | **115** | the frozen total |
| index / public entry | 1 | `index.html` |
| Arabic pages | 57 | |
| English pages | 57 | |
| Base pages | **57** | `PAGES` registry in `scripts/build-html.mjs` = 57 entries — **matches exactly** |

**Identity**: 1 + 57 + 57 = 115 ✅ · PAGES 57 × 2 + index = 115 ✅

### 3.2 The 115-file shell partition (041 must re-prove this exactly)

| Shell class | Files | Bases | Detection |
|---|---:|---:|---|
| Admin / sidebar-bearing | **64** | 32 | renders `.nav-panel` + `data-nav-category` |
| Portal / role-shell | **50** | 25 | renders the portal shell, **no** admin sidebar |
| — family | 18 | 9 | renders `pt-nav-item` |
| — teacher | 16 | 8 | renders `pt-nav-item` |
| — student | 14 | 7 | renders `pt-nav-item` |
| — hub (`portals.html`) | 2 | 1 | portal shell **without** a role sidenav — **0 `pt-nav-item`** |
| Neither | **1** | — | `index.html` |
| **Total** | **115** | **57** | 64 + 50 + 1 = 115 ✅ · 32 + 25 = 57 ✅ |

> **Detection caveat (binding on any re-verification recipe).** `grep -l 'pt-nav-item' public/*.html | wc -l` returns
> **48**, not 50 — the two hub files carry the portal shell but no role nav list. The portal class is **50 files / 25
> bases** = 48 role-nav files + the 2 hub files. A recipe that greps `pt-nav-item` and expects 50 is wrong.

### 3.3 Admin nav (`src/js/nav.config.js`)

| Dimension | Value |
|---|---|
| Categories | **6** (control · families · teachers · reports · admin · settings) |
| Items | **50** = control 12 · families 9 · teachers 6 · reports 11 · admin 5 · settings 7 |
| Status census | implemented **49** · disabled **1** · planned **0** |
| `FUTURE_ROUTES` | **`{}`** (empty) |
| `FUTURE_ROLE` | 3 documented-but-never-rendered entries (`teacher-portal`, `family-portal`, `student-portal`) |
| Route split | **22** deep-link (`#view=`) + **27** plain page + **1** route-less lock = 50 ✅ |

### 3.4 Portal nav (`ROLE_NAV` in `fixtures/portal.js`, rendered by `components/portal-shell.js`)

| Role | Unique items | Renders/page | Planned |
|---|---:|---:|---:|
| teacher | 9 (8 pages + hub exit) | 18× (desktop sidebar + mobile drawer) | 0 |
| family | 9 (8 + hub) | 18× | 0 |
| student | 8 (7 + hub) | 16× | 0 |

### 3.5 The 22 deep-links — every one verified to resolve to a REAL `data-tabpanel` in BOTH languages

| # | Nav id | Route | Tab group | Target is the baked default? |
|---:|---|---|---|---|
| 1 | `familyCategories` | `families.html#view=categories` | `families` | no (`directory`) |
| 2 | `studentResult` | `students.html#view=results` | `students` | no (`directory`) |
| 3 | `studentEvaluation` | `students.html#view=evaluation` | `students` | no |
| 4 | `sessionsKpi` | `teacher-performance.html#view=sessions-kpi` | `perf` | no (`overview`) |
| 5 | `monthlyPerf` | `teacher-performance.html#view=monthly` | `perf` | no |
| 6 | `monthlyReports` | `reports.html#view=monthly` | `reports` | no (`overview`) |
| 7 | `dataAnalysis` | `reports.html#view=analysis` | `reports` | no |
| 8 | `invoices` | `finance.html#view=invoices` | `finance` | no (`overview`) |
| 9 | `monthlyInvoices` | `finance.html#view=monthly-invoices` | `finance` | no |
| 10 | `salaries` | `finance.html#view=salaries` | `finance` | no |
| 11 | `staffSalaries` | `finance.html#view=salaries` | `finance` | no — **shared target with #10, see S-1** |
| 12 | `payments` | `finance.html#view=payments` | `finance` | no |
| 13 | `banks` | `finance.html#view=banks` | `finance` | no |
| 14 | `materials` | `library.html#view=materials` | `library` | **YES** — library's baked default |
| 15 | `books` | `library.html#view=books` | `library` | no |
| 16 | `certificateRequests` | `certificates.html#view=requests` | `certificates` | no (`templates`) |
| 17 | `settingsGeneral` | `settings.html#view=general` | `settings` | **YES** — settings' baked default |
| 18 | `settingsIntegrations` | `settings.html#view=integrations` | `settings` | no |
| 19 | `settingsCustomization` | `settings.html#view=customization` | `settings` | no |
| 20 | `settingsNotifications` | `settings.html#view=notifications` | `settings` | no |
| 21 | `settingsSecurity` | `settings.html#view=security` | `settings` | no |
| 22 | `settingsUsers` | `settings.html#view=users` | `settings` | no |

The two **YES** rows are exactly why Specs 039/040 introduced the localStorage-seeded deep-link test: unseeded,
`#view=materials` and `#view=general` would pass **vacuously — even with JavaScript disabled.** See FR-012.

---

## 4. The honest-state freeze result

| Invariant | Verified from SOURCE and from all 115 BUILT pages |
|---|---|
| planned nav items | **0** |
| `[data-coming-soon]` nodes | **0** |
| `FUTURE_ROUTES` | **`{}`** |
| honest locks | **1** |
| `finance-analysis` | **ABSENT** from `nav.config` and from all 115 built pages — correctly never invented ✅ |

**The one honest lock, rendered verbatim:**

```html
<button type="button" class="nav-item is-disabled" data-nav="classSalaryReport"
        data-nav-status="disabled" aria-disabled="true"
        data-disabled-reason data-reason-key="nav.reason.finance" title="…">
```

non-anchor ✅ · no `href` ✅ · `aria-disabled` ✅ · reason-bearing ✅ · lock-marked (`#i-lock`) ✅ · route-less ✅ ·
**NOT planned** ✅. Its honesty is structural: a real class-salary report implies **computed per-class pay**, which the
no-fake-money + pay-free laws forbid. Spec 040 already forbade repointing the retired planned-item probe at it —
*a disabled lock is categorically not a planned item.*

### 4.1 Link / reachability census (all 115 pages)

| Check | Result |
|---|---|
| `href="#"` | **0** |
| empty `href` | **0** |
| `javascript:` pseudo-links | **0** |
| raw locale keys rendered | **0** |
| missing `.html` link targets | **0** |
| dead `#view=` hashes (hash with no matching `data-tabpanel`) | **0** |
| AR/EN nav route parity failures | **0** — every AR nav `href` has the exact `.en` twin with the hash preserved |
| **Orphan pages** (never a link target anywhere) | **2** — `gallery.html`, `gallery.en.html` → **D-2** |

### 4.2 Role / privacy isolation (exact destination matching)

| Law | Result |
|---|---|
| admin destinations reachable from any portal page | **0** ✅ |
| portal destinations reachable from any admin page | **0** ✅ |
| teacher pay-free (shipped `payHit` regex, 16 teacher-portal files) | **0 violations** ✅ |
| family zero-pay (16 files) | **0 currency figures** ✅ |
| student child-view (14 files) | **0** «لوحة الطالب» / «بوابة الطالب» ✅ |
| `teacher-performance.html` | an ADMIN board (the sanctioned Spec-024 B-07 exemption), linked from **ZERO** portal pages ✅ |

> **Method note (binding on any future audit).** A naive `/SAR/i` grep FALSE-POSITIVES on the persona name **"Sara"**.
> The shipped `payHit` regex is word-boundary scoped and is the only authority. Any tooling added by 041 must reuse the
> shipped regex verbatim, never re-invent it.

### 4.3 Verdict

**Apart from D-1 and D-2, the route surface is CLEAN**: 0 planned, 0 dead links, 0 dead hashes, 0 AR/EN parity
failures, 0 cross-role leaks, exactly 1 honest lock, `FUTURE_ROUTES` empty. This is the state 041 freezes.

---

## 5. User scenarios

### P1 — Route truth (the promise a sidebar item makes)

**As** an academy admin, **when** I click any of the 50 sidebar items, **then** I land on the surface the label
promises — or I am told honestly why I cannot.

* **P1-a (49 implemented items)**: the item is an `<a>` with a real `href` to an existing file; the page that opens is
  the one the label names. **Currently 47/49 satisfy this; `addTeacher` and `teacherCategories` do not → D-1.**
* **P1-b (the 1 lock)**: `classSalaryReport` is a `<button>`, `aria-disabled="true"`, no `href`, carries
  `data-reason-key="nav.reason.finance"`, renders the `#i-lock` icon, and clicking it surfaces the reason — never a
  fake destination, never a «قريبًا» label, never a planned status.
* **P1-c (zero «قريبًا»)**: no sidebar item anywhere in the product says «قريبًا» / *coming soon*. The render branch
  for it still exists in `sidebar.js` (zero-deletion law) but is **permanently unexercised in production nav**.

### P2 — Deep-link truth (the 22 `#view=` routes)

**As** an admin arriving from a deep-link sidebar item — **on a fresh browser, or on a browser where I previously
clicked a different tab on that page** — **then** the tab the URL names is the tab that opens.

This is a **real production state, not a hypothesis**: `selectTab(..., {persist:true})` writes
`localStorage['academy.schedView.<group>']` *and* `history.replaceState('#view='+id)` on every user tab click, so a
returning admin always carries a stored view. The engine's precedence (`enhance.js:261-273`) is
**URL hash → stored view → baked default**, and P2 asserts exactly that order.

* **P2-a**: all 22 open their exact target tab on a fresh context, AR and EN.
* **P2-b (the discriminating case)**: with the **opposite** tab pre-seeded in `academy.schedView.<group>`, the hash
  still wins. **Today only 9 of 22 are tested this way → FR-012.**

### P3 — Reachability, parity, isolation

* **P3-a (AR/EN parity)**: every Arabic nav route has an exact English twin with the hash preserved
  (`families.html#view=categories` ↔ `families.en.html#view=categories`).
* **P3-b (reachability)**: every one of the 115 pages is either (i) a nav destination, (ii) a body-link destination
  from a nav destination, or (iii) a **registered, owned, documented** non-sidebar page. **`gallery` is in class
  (iii) with neither an owner nor an entry path → D-2.**
* **P3-c (role isolation)**: a family/teacher/student page never links to an admin destination, and vice versa.
  041 **audits and freezes** this; it does not enforce it — **hiding a link is not authorization** (Spec 043).

---

## 6. Functional requirements

### Census & freeze

* **FR-000** *(governing)* — 041 is a **BASELINE** route/sidebar freeze, per `040-.../future-owner-register.md` §1/§3;
  it is **not** the final product freeze (Spec 057) and **no real integration may be assigned to it**. This spec
  supersedes `033-.../follow-up-spec-roadmap.md`'s "final re-freeze" framing and
  `033-.../page-count-envelope.md`'s advisory count of 119.
* **FR-001** — Freeze the page count at **115** (57 bases × 2 + `index.html`), with `build-html.mjs` `PAGES` at
  **57**. Any future change requires a declared supersession naming the new number and the spec that owns it.
* **FR-002** — Freeze the shell partition at **64 admin / 50 portal / 1 index**, and the base split at **32 / 25**.
* **FR-003** — Freeze the admin menu at **6 categories / 50 items**, breakdown control 12 · families 9 · teachers 6 ·
  reports 11 · admin 5 · settings 7.
* **FR-004** — Freeze the status census at **implemented 49 · disabled 1 · planned 0**, and `FUTURE_ROUTES` at `{}`.
* **FR-005** — Freeze the route split at **22 deep-link + 27 plain + 1 route-less lock = 50**, and pin all 22
  deep-link route strings **in the `nav.config.js` SOURCE audit**, not only in rendered-DOM form. *(Today the source
  audit pins only 9 of 22 — materials/books/certificateRequests + settings×6.)*
  **The one sanctioned carve-out**: the chosen D-1 fix may **re-classify** two items between the buckets — Option A
  takes deep-links **22 → 24** and plain **27 → 25**, leaving the routed total invariant (24 + 25 = 49 routed + 1
  route-less = **50**). That is a declared re-classification, not a count change (`count-and-freeze-contract.md` §5);
  the derived matrix then asserts 24. **Any other movement of these two figures is a silent drift and requires a full
  supersession.**
* **FR-006** — Freeze the portal nav at teacher 9 / family 9 / student 8 unique items, 0 planned.

### Honesty

* **FR-007** — Assert sitewide **planned = 0** and **`[data-coming-soon]` = 0**, from SOURCE *and* from all 115 built
  pages.
* **FR-008** — Assert **exactly one** honest lock (`classSalaryReport`), with its full structural signature
  (non-anchor · no `href` · `aria-disabled="true"` · `data-reason-key="nav.reason.finance"` · `#i-lock` · route-less ·
  status `disabled`, never `planned`).
* **FR-009** — Assert `finance-analysis` remains **absent** from `nav.config` and from all 115 pages.
* **FR-010** — Re-assert the standing honesty censuses at 0: `type=password` · `type=file` · `<canvas>` ·
  `.pdf` / `window.open` · credential-named inputs · authored secret values · fake-"Connected" chips · computed
  score/rank/leaderboard/percentile/chart · computed total/outstanding/balance/profit/VAT/salary/payout ·
  `href="#"` sitewide. **041 may TIGHTEN these; it may never weaken one.**
* **FR-011** — Preserve every protected byte-verbatim assert: `payHit` · `tchPay` · `famPay` · both `payFigure`
  lines · child-view · `PAY28` · `truth010.badPlanned/badDisabled` · `deadNav` · `links010` · `plannedNavAnchors` ·
  the `nav010` block (railCats 6 / finMembers / finLinks / banks placement / sessBadge / famTitle) ·
  `navCount32 === 50` · the finance and reports body asserts · `a31`/`g32` · the route freeze. Any change to one of
  these is a **declared supersession**, documented inline in the suite, in the plan and in a contract.

### Deep-link truth (the main additive coverage 041 specifies)

* **FR-012** *(the headline gap)* — **All 22 deep-links must have a DISCRIMINATING fresh-context test**: the context
  pre-seeds `localStorage['academy.schedView.<group>']` with a **different** view via `ctx.addInitScript`, so the
  assertion proves *the URL hash beats the stored view*, not merely *the hash beats the baked default*.
  **Current coverage: 9/22 discriminating** (materials, books, certificateRequests, settings×6).
  **13/22 are unseeded** — `familyCategories`, `studentResult`, `studentEvaluation`, `sessionsKpi`, `monthlyPerf`,
  `monthlyReports`, `dataAnalysis`, `invoices`, `monthlyInvoices`, `salaries`, `staffSalaries`, `payments`, `banks`.
  **A regression that reordered `initTabs` to `stored || hash` would pass all 13 and be caught only by the 9.**
* **FR-013** — **Derive the deep-link matrix from `NAV_CATEGORIES`, not from hand-written per-spec literals.**
  Today `SP037_DEEPLINKS` / `SP039_DEEPLINKS` / `SP040_VIEWS` / the finance view array are hand-maintained; a 23rd
  deep-link added tomorrow would get **zero** automatic coverage. The frozen suite must iterate every item whose
  `route` contains `#view=` and assert its fragment resolves to an existing `[data-tab]` on the target page, in both
  languages.
* **FR-014** — **Close the fragment-blind link crawl.** `links010` strips the fragment before the `VALID_FILES`
  lookup (`const file = h.split('#')[0]`), so `badTarget` proves the *file* exists but throws the `#view=` id away —
  a typo such as `settings.html#view=customisation` (UK spelling) is **invisible** to it. Add a fragment-resolving
  check (or fold it into FR-013's derived matrix). *Note: the strip must stay for `VALID_FILES` — that is why
  `deadHash`/`badTarget` are legitimately 0 today; FR-014 is additive, not a replacement.*
* **FR-015** — Assert AR/EN nav route parity mechanically: for every nav item with a route, the EN render is the exact
  `.en` twin **with the hash preserved**.

### Reachability & isolation

* **FR-016** — Every one of the 115 pages must be classified as: nav destination · body-link destination · or
  **registered non-sidebar page with a named owner and a documented entry path**. Zero unclassified.
* **FR-017** — Assert 0 admin destinations reachable from any portal page and 0 portal destinations reachable from any
  admin page, by **exact destination matching** (not substring). Record explicitly that `teacher-performance.html` is
  an admin board (Spec-024 B-07) linked from zero portal pages.
* **FR-018** — Re-run the role laws on the built bodies with the **shipped regexes verbatim**: teacher pay-free (16
  files), family zero-pay (16), student child-view (14).

### Documentation reconciliation

* **FR-019** — Refresh **`CLAUDE.md`** to the true baseline: HEAD `21502af`; Specs 039 **and** 040 committed; the
  frozen counts; the 041 redefinition; the corrected supersession chain.
* **FR-020** — Correct the stale smoke header comment at `tests/smoke/run.cjs:2580`
  (`// ===== Spec 032 — route/page count freeze: 51 bases × 2 languages + index = 103 =====` while the assert one line
  below is `pub.length === 115`).
* **FR-021** — Record `truth010.badPlanned` as a **vacuous-but-retained** guard (zero planned items exist, so the
  filter can never be non-empty), exactly as the suite already documents `plannedNavAnchors === 0`. **Retain, do not
  delete** (zero-deletion law).
* **FR-022** — Publish the **corrected planned-probe supersession chain**, which Spec 040's own register got wrong.
  `040-.../protected-test-supersession-register.md` says *"Spec 038 pointed the probe at `admin`; Spec 039 repointed
  it admin → settings."* Git disproves the first clause. The true chain:

  | Spec | Probe action |
  |---|---|
  | 034 | control → families |
  | 035 | families → teachers |
  | **036** | **teachers → admin** (commit `56bc418`, `run.cjs:227`) |
  | 038 | **no-op** — its sole supersession was `nav010` `lockedFin`/`finLinks` (`4cbcb31` still reads `admin`) |
  | 039 | admin → settings |
  | 040 | **RETIRED** — replaced in place by the sitewide `planned === 0 && comingSoon === 0` census |

  Spec 040's *conclusion* is unaffected; only its narrative was wrong.
* **FR-023** — **Resolve the ownership of the product-wide copy/honesty sweep to ONE owner (see §9 CF-1) — by
  verification, never by invention.** The requirement has three parts, in order: **(a)** verify what the committed
  corpus actually says (it says exactly one thing: `040-settings-deep-links-subpages/implementation-status.md`, in a
  *findings* section and **in no contract** — *"A product-wide copy sweep belongs to **Spec 044/056**"*, a **dual**
  owner and therefore no owner); **(b)** record the best-evidenced candidate **with its evidence** —
  `carry-forward-register.md` CF-1 traces the string to `preview-drawer.js`'s `formDrawer()` default `reasonKey`, i.e.
  the exact shared component that **FO-23** already assigns to **044**, while **FO-24** gives 056 *field
  completeness* (a different question) — so the **recommendation is 044**; **(c)** the **single owner is NAMED in
  `/speckit.plan`** (Q-4), which may choose only among owners the committed corpus already names (**044 · 056 · 057**)
  and may invent no new spec number. **041 does not perform the sweep and does not silently assign it.** Per the
  roadmap-provenance caveat in §1, "044" is a maintainer-amendment slot, not a chartered spec — the assignment binds
  whichever spec is chartered into that slot.
* **FR-024** — Record **S-1** (below) so the shared destination is never later "fixed" as a duplicate.

### Impact protection (method, binding)

* **FR-025** — The **only** permitted impact-proof method is non-destructive: `git show <commit>:<path>` or a detached
  `git worktree add --detach`. **NEVER** `git stash`, `git reset --hard`, `git checkout -- <path>`, `git clean`, or a
  branch switch. `#page-body` is extracted with
  `sed -n '/<div[^>]*id="page-body"/,/<\/div><!-- \/page-body -->/p'` and md5'd against the committed baseline.
* **FR-026** — **The 0-diff wall.** These 13 files were byte-identical after 040 and must stay so unless a chosen fix
  demonstrably requires one: `package.json` · `scripts/build-html.mjs` · `src/js/i18n.js` · `src/js/enhance.js` ·
  `src/js/components/sidebar.js` · `src/js/components/tabs.js` · `src/js/components/form-field.js` ·
  `src/js/components/settings-section.js` · `src/js/components/preview-drawer.js` · **`src/js/components/ui.js`** ·
  `src/js/fixtures/settings.js` · `src/js/pages/staff.js` · `src/js/fixtures/staff-management.js`.
  *(Path note: the wall file is `src/js/components/ui.js`. There is no `src/js/ui.js` — a prior shorthand; verified
  against the tree at `21502af`.)*
* **FR-027** — **The pure-audit expectation.** For everything except the D-1 / D-2 fix chosen in `/speckit.plan`, the
  impact against `21502af` is **0 body changes / 0 sidebar changes / 115 untouched**. Anything else is a defect in the
  freeze, not in the baseline.

---

## 7. Findings

The audit produced exactly **two defects** and **one sanctioned exception**.

---

### D-1 — MISLEADING DESTINATION: three sidebar items, one route (`teachers.html`)

**Severity: the only genuine route defect in the product.** Classification **5 — invalid/defective route requiring
correction**. It is *not* a planned item and *not* a lock.

**The facts.**

`src/js/nav.config.js:54-56` (byte-identical in the shipped `public/assets/js/nav.config.js`):

```js
item({ id: 'teachers',          …, route: 'teachers.html' })
item({ id: 'addTeacher',        …, route: 'teachers.html' })  // Spec 036 — fold-anchor (trn-add drawer)
item({ id: 'teacherCategories', …, route: 'teachers.html' })  // Spec 036 — fold-anchor (trn-categories drawer)
```

Three items, one byte-identical route string, **no `#view=` hash** — unlike *every other* Spec-035…040 fold-anchor in
the same file (`familyCategories → families.html#view=categories`, `sessionsKpi → teacher-performance.html#view=sessions-kpi`, …),
all of which carry a distinguishing hash.

The `trn-add` and `trn-categories` drawer **templates do exist** on `teachers.html`, but they are wired only to two
on-page header buttons via `data-drawer` (`pages/teachers.js:83,105`; `components/teacher-actions.js:27-29,70-72`).
**`enhance.js` handles only `#view=` (tabs) and `#step=` (wizard) — there is NO drawer-hash mechanism.** A live browser
probe confirms it: **landing on `teachers.html` opens no drawer.**

So "Add Teacher" promises a form and delivers the directory; the three items are **indistinguishable by outcome**.
Spec 036 itself recorded the caveat verbatim — *"Spec 036 only points the nav item at this page; no body edit"* — but
**a declaration does not make a destination honest.**

**Legacy grounding (this is a regression, not a nit).** The legacy sidebar carried these as **genuinely distinct
screens**:

| Legacy sidebar label | Legacy route | Evidence | What it was |
|---|---|---|---|
| Teachers | `/management/teachers` | `route-graph.md:244` | roster list |
| Add New Teacher | `/management/teachers/create` | `route-graph.md:270`; `08-role-page-inventory-v2.md:214` | a dedicated **57-field creation form page** |
| Teachers Category | `/management/teacher-categories` | `route-graph.md:238-241`; `08-role-page-inventory-v2.md:203-206` | its own CRUD page (forms=2, flds=4, tbl=1) with 3 child routes |
| Teachers *(label reused)* | `/management/teachers_details` | `route-graph.md:245,481` | a Cancel/Absent/Attend table |

3 (arguably 4) sidebar clicks → 3 (4) different screens. Today: 3 clicks → 1 screen.

#### Smallest-honest-fix options

| # | Option | Mechanism | Impact | Honesty verdict |
|---|---|---|---|---|
| **A** | **Give the two items a real `#view=` destination on `teachers.html`** — fold the Add-Teacher form and the Categories board into `teachers.html` as two additional tabs, reusing the existing `tabs()` + `#view=` machinery, with the current directory becoming the default tab. Routes → `teachers.html#view=add` and `teachers.html#view=categories`. | The **exact** mechanism every other promoted item already uses (035/037/038/039/040). No new hook, no new storage key, no new page. | `nav.config.js` (2 route strings) + `pages/teachers.js` (body → tabs) + `ar/en.trn.js` (2 tab labels). **`teachers.html`/`.en` bodies change** (2 files); 62 admin files sidebar-only (2 hrefs gain a hash); 51 non-admin files (50 portal + `index.html`) untouched. Count HELD 115, menu HELD 50. | ✅ **Honest.** The route resolves to the surface the label names. Uniform with the whole product. |
| **B** | **Add a drawer-hash mechanism** (`#drawer=trn-add`) to `enhance.js`, so the fold-anchor opens the drawer on load. | Requires a **new URL-state hook** in `enhance.js`. | `enhance.js` (0-diff wall breach) + `nav.config.js`; bodies unchanged. | ⚠️ **Out of bounds for 041.** It is a **modal/drawer interaction-system change → Spec 044 (FO-23)**, and it touches a wall file. Also opens a general-purpose deep-link surface that no other item uses. |
| **C** | **Demote both to honest locks** (`status: 'disabled'`, a reason key, no route). | Existing lock pattern. | `nav.config.js` only; 64 sidebar files re-render. Menu HELD 50; locks 1 → 3. | ❌ **Dishonest by omission.** The target surfaces **already exist and already work** — exactly the reasoning by which Spec 040 rejected the same option for `settingsUsers`. Locking a working surface is a lie in the other direction. |
| **D** | **Delete the two items** (menu 50 → 48). | — | Breaks the 50-item freeze; loses two legacy capabilities the crawl proves existed. | ❌ **Violates zero-deletion.** |
| **E** | **Build a standalone `add-teacher.html`** (the legacy 57-field form page). | New page pair. | Count 115 → 117, PAGES 57 → 58. | ❌ Rejected already by Spec 036 with a reason that still holds: *"Teacher creation is a single flat form already fully realized in the `trn-add` drawer — a standalone page would duplicate it with no added honesty."* Also breaks the count freeze this spec exists to set. And form completeness is **Spec 056**. |
| **F** | **Do nothing — record the 3-way shared destination as a documented exception** (the treatment S-1 gets). | — | **0 source, 0 HTML, 0 test.** Counts all HELD. | ❌ **Rejected.** S-1 is legitimate *because the shared tab visibly contains both of its subjects*; here the two extra items deliver a surface that does **not** contain what they name. **A declaration does not make a destination honest** — this spec's own ruling on Spec 036's "fold-anchor" declaration applies verbatim to repeating it. Recording ≠ closing (SC-18). |
| **G** | **Relabel only** — reword the two nav labels so they no longer promise a form / a CRUD board, leaving routes untouched. | `ar.adm.js` + `en.adm.js` (2 mirrored label pairs); `nav.config.js` **0-diff**. | 64 admin files, **sidebar-label text only**; `#page-body` byte-identical; 51 non-admin (50 portal + `index.html`) untouched. Counts HELD. | ⚠️ **Weaker than A at comparable cost, and rejected.** It stops the *label* lying but leaves three sidebar items **indistinguishable by outcome** (still one destination, still a second undocumented click to reach the form), and it silently retires two legacy capabilities the crawl proves existed. Honesty by subtraction where honesty by construction is available for the same blast radius. |

**Recommendation: Option A.** It is the *smallest* change that makes the destination true, it uses the mechanism
already proven 22 times, it holds every frozen count (115 / 57 / 64 / 50 / 1 lock / 0 planned), and it stays entirely
inside the route-and-sidebar blast radius that 041 owns. The `trn-add` / `trn-categories` drawers stay exactly as they
are (pay-free, password-free, CV-upload GATE, backendRequired Save) — Option A **relocates the entry path, it does not
redesign the form**, so it does not trespass on 044 or 056.

> **The decision is NOT taken here, and no fix has been applied.** Per the specify/plan split, `/speckit.plan` selects
> one option from **A–G above (this is the canonical, closed option set; every other 041 artifact refers to these same
> letters)**, records the rejected ones with reasons, and writes the impact contract. `impact-boundary.md` §2 carries
> the per-option blast-radius ceiling for the same seven letters.

---

### D-2 — ORPHAN: `gallery.html` / `gallery.en.html`

**The facts.** Both files are registered in `build-html.mjs` `PAGES` with `activeId: null`, they render the admin
sidebar (they are 2 of the 64), and they are reachable **by URL only**: not in `nav.config.js`, not linked from
`index.html`, not linked from any of the other 113 pages. They are the **component / design-system reference page**.

**The rule.** Per the audit law, an intentionally-reachable non-sidebar page is **not automatically a defect** — but it
**must have a documented owner and a documented entry path**. Today `gallery` has **neither**. That is the defect: not
its existence, its **undocumentedness**.

#### Smallest-honest-fix options

| # | Option | Impact | Verdict |
|---|---|---|---|
| **A** | **Document it, don't link it.** Register `gallery` in a committed contract — this audit's `page-reachability-register.md` §§4–7 is the natural home, no new artifact needed: **owner** = the frontend / design-system maintainer (the page exists so a maintainer can audit every shared UI component and state against the live fixtures in one place); **entry path** = *direct URL only, by design, maintainer-facing, deliberately absent from production nav*. Add a smoke assert that the orphan set is **exactly `{gallery.html, gallery.en.html}`** — so a *new* orphan (an accidentally-unlinked page) fails the build. | **0 application-source change. 0 HTML change.** Docs + one additive test assert. Counts all HELD. | ✅ **Recommended.** It closes the real gap (no owner, no entry path, no guard against future orphans) at zero product risk. |
| **B** | **Link it from the sidebar.** | Menu 50 → 51 — **breaks the 50-item freeze**; puts a developer reference page in an academy admin's production nav. | ❌ |
| **C** | **Link it from `index.html`.** | 2 body changes; still exposes a dev page in a user-facing entry point. | ❌ Weaker than A for no benefit. |
| **D** | **Delete `gallery`.** | Count 115 → 113, PAGES 57 → 56; destroys the component reference the later **visual-redesign review specs** will need most. | ❌ **Violates zero-deletion** and actively harms 045–050. |

**Recommendation: Option A** (canonical D-2 option set; every other 041 artifact uses these same letters).
**No decision is taken here and nothing has been registered yet — the decision belongs to `/speckit.plan`.**

> **Owner note.** The recommended owner is the **frontend/design-system maintainer**, recorded in a committed
> contract. `gallery` is *not* assigned to Spec 044: 044 (FO-23) owns the modal/drawer/long-form **interaction
> system**, not the reference page that renders the component catalogue. No artifact may assert a spec-number owner
> for `gallery` that the committed corpus does not support.

---

### S-1 — SANCTIONED SHARED DESTINATION (record; do **not** "fix")

`salaries` **and** `staffSalaries` both route to `finance.html#view=salaries`. This is **intentional**: Spec 038
declared that the single Salaries tab carries **both** the teacher board and the staff board (both figure-free). It is
a legitimate two-entrances-one-room pattern, not a duplicate.

**FR-024 exists so that a future audit does not "correct" it.** Any tooling 041 adds (the derived deep-link matrix,
FR-013) must treat `finance.html#view=salaries` as a **known, registered, shared** destination, and must not assert
route-uniqueness across nav items.

---

## 8. Success criteria

041 is DONE when every line below is **machine-verifiable and green**.

| # | Criterion | Measure |
|---|---|---|
| SC-01 | Page count frozen | `public/*.html` = **115**; `build-html.mjs` PAGES = **57** |
| SC-02 | Shell partition frozen | admin **64** + portal **50** + index **1** = 115; bases 32 + 25 = 57 |
| SC-03 | Admin menu frozen | 6 categories, **50** items, breakdown 12/9/6/11/5/7 |
| SC-04 | Status census frozen | implemented **49** · disabled **1** · planned **0**; `FUTURE_ROUTES` = `{}` |
| SC-05 | Route split frozen | 22 deep-link + 27 plain + 1 route-less = 50; **all 22 route strings pinned in the SOURCE audit** (today 9/22). *If the plan adopts D-1 Option A, the split becomes the declared **24 + 25 + 1 = 50** and all 24 are pinned — a re-classification, with the routed total (49) and the menu (50) unchanged.* |
| SC-06 | Zero «قريبًا» | planned = 0 **and** `[data-coming-soon]` = 0, in source and on all 115 pages |
| SC-07 | One honest lock | exactly 1 disabled item = `classSalaryReport`, full structural signature intact |
| SC-08 | **Deep-link discrimination** | **22/22** deep-links have a **stored-view-seeded** fresh-context test in **both** languages (today **9/22**) |
| SC-09 | Derived matrix | the deep-link matrix is **derived from `NAV_CATEGORIES`**; a hypothetical 23rd deep-link is covered automatically |
| SC-10 | Fragment resolution | every `#view=` fragment in every rendered nav `href` resolves to an existing `[data-tab]` on its target page (closes the `links010` fragment-blind hole) |
| SC-11 | Link census | `href="#"` = 0 · empty href = 0 · `javascript:` = 0 · missing targets = 0 · dead hashes = 0, across all 115 |
| SC-12 | AR/EN parity | 0 nav-route parity failures — every AR route has the exact `.en` twin, hash preserved |
| SC-13 | Reachability | every page classified; orphan set is **exactly** `{gallery.html, gallery.en.html}`, registered with owner + entry path; a new orphan **fails** |
| SC-14 | Role isolation | 0 admin→portal and 0 portal→admin destinations (exact matching); `teacher-performance.html` linked from 0 portal pages |
| SC-15 | Role laws | teacher pay-free 16/16 · family zero-pay 16/16 · student child-view 14/14, using the **shipped regexes verbatim** |
| SC-16 | Honesty censuses | `type=password` · `type=file` · `<canvas>` · `.pdf`/`window.open` · credential inputs · secrets · fake-Connected · computed score/chart · computed money = **all 0** |
| SC-17 | Protected asserts | every assert in the FR-011 register is **byte-verbatim**, or its change is a declared, documented supersession |
| SC-18 | D-1 closed | the `addTeacher` / `teacherCategories` destination resolves to the surface its label names (option chosen in `/speckit.plan`) |
| SC-19 | D-2 closed | `gallery` has a named owner and a documented entry path in a committed contract |
| SC-20 | Impact | proven **non-destructively** (`git show` / detached worktree — never `stash`/`reset`/`checkout`); everything outside the chosen D-1/D-2 fix is **byte-identical** to `21502af` |
| SC-21 | 0-diff wall | the 13 FR-026 files unchanged (unless the chosen fix demonstrably requires one, declared in the plan) |
| SC-22 | Docs true | `CLAUDE.md` names HEAD `21502af` and both 039+040 as committed; the stale `run.cjs:2580` comment corrected; the corrected probe chain published; **one** copy-sweep owner named |
| SC-23 | Suites green | smoke PASS · a11y critical=0 serious=0 · screenshots captured with 0 console errors · locale parity 0 divergence |
| SC-24 | Counts HELD | after 041: **115 pages · 57 bases · 50 menu items · 0 planned · 1 lock** — unchanged from `21502af` |

---

## 9. Carry-forward (record; do NOT fix in 041)

**CF-1 — the product-wide copy/honesty sweep.** `common.backendRequiredNote` — the shared Spec-032 gate reason,
rendered on **~50 pages** — reads *"…nothing is **saved** yet"* in EN. It is **honest in meaning** (it *denies* a save)
but it carries the token the fake-success census greps. Sitewide the token count fell only **182 → 179** under Spec 040.
Rewording it would change ~50 page bodies — **far outside a route/sidebar freeze's impact boundary.**

*Ownership is genuinely unresolved in the corpus.* The only statement is one line —
`040-settings-deep-links-subpages/implementation-status.md`: *"A product-wide copy sweep belongs to **Spec 044/056**."*
That is a **dual owner** (i.e. no owner) recorded in a *findings* section, **not in any contract**. The candidates,
verified: FO-23 gives **044** the modal/drawer/long-form *interaction system*; FO-24 gives **056** the
*form-completeness* re-audit (with its explicit non-excuse clause); FO-26 gives **057** the final parity/security
freeze.

**041's recommendation: Spec 044** — because the string is not a stray literal but the **default `reasonKey` wired
into `preview-drawer.js`'s `formDrawer()`**, the exact shared component FO-23 assigns to 044, and because every other
file referencing it (`wizard.js`, `evaluation-rubric.js`, `report-feedback.js`) is a modal/drawer/long-form component
rather than a form-completeness concern. Evidence in `carry-forward-register.md` CF-1. **Per FR-023 the single owner
is NAMED in `/speckit.plan` (Q-4)**, choosing only among the corpus-named candidates (044 · 056 · 057). 041 records the
evidence and the recommendation; it does not assign, and it does not perform the sweep.

**CF-2 — legacy destinations with no current top-level nav item.** The legacy sidebar (51 content destinations +
logout) carried `/management/accounting` (+3 transaction sub-pages), `/management/expense`,
`/management/analysis-expenses`, `/management/analysis-invoices`, `/management/analysis-student`,
`/management/payouts`, `/management/schedule-trials-response`. These survive today only as deferred/gated planned
**cards** inside `finance.html`, with **no nav route** — a legacy admin loses direct nav access to them.
This is a **capability-coverage** question, **not a route-honesty** question (nothing here is a dead or lying link).
**Owner: Spec 042 (exhaustive legacy coverage re-audit).** 041 records it and moves on.

**CF-3 — two current items with no functioning legacy ancestor.** `dataAnalysis` continues a legacy sidebar *label*
whose legacy link was a dead `javascript:void(0)` stub (`management-teachers-details.md:293`, captured under External
Links); `monthlyReports` continues a caption that legacy's *own* sidebar mis-applied to `/management/forms` (the form
builder) (`:221`/`:292`). Both current items are **honest today** — they resolve to real, authored, display-only tabs
built by Spec 037. Recorded so that Spec 042 does not mistake them for faithful legacy ports. **Owner: Spec 042.**

**CF-4 — the 6-category rail is the rebuild's own invention.** The legacy sidebar was **flat** (~51 items; no section
headers preserved in the crawl — `03-screenshot-review.md:12`, `13-improved-information-architecture-v2.md:6`,
`20-no-missing-items-audit.md:45` all describe it as flat and list the grouping as a *redesign decision*). The current
control/families/teachers/reports/admin/settings rail matches neither legacy nor the planning docs' own proposed
8-group IA. **041 freezes the 6-category rail as-is** (it is the approved design); any regrouping is a **redesign**
owned by the bounded review specs.

**CF-5 — carried, not designed here**: backend permission enforcement (**043**) · community/social + leaderboards
(**051/052**) · WhatsApp/Zoom/Meet/payment integrations (**053/054**) · cross-role propagation (**055**) · full form
completeness (**056**) · modal/drawer redesign (**044**) · the full academic visual redesign (**045–050**) ·
page-by-page legacy capability reconciliation (**042**) · the final product freeze (**057**).
Every number here is a **recorded maintainer-amendment slot**, not a chartered spec — see the roadmap-provenance
caveat in §1 and the full table in `carry-forward-register.md`. 041 invents none of them.

---

## 10. Edge cases

| # | Case | Required behaviour |
|---|---|---|
| E-01 | Deep-link **onto the baked default tab** (`#view=materials`, `#view=general`) | Must be tested with the **opposite** view seeded in `academy.schedView.<group>`. Unseeded, these two pass **even with JavaScript disabled** — a vacuous green. (FR-012) |
| E-02 | Returning admin with a stored tab | `selectTab(…, {persist:true})` persists on every user tab click, so the hash-vs-stored conflict is **production reality**. Precedence is **hash → stored → baked default** and must be asserted in that order. |
| E-03 | Hash typo (`#view=customisation`) | Today **invisible**: `links010` strips the fragment before the `VALID_FILES` lookup. FR-014 / FR-013 must catch it. |
| E-04 | A page with **two** `[data-tabs]` groups | `enhance.js:266` applies the single parsed `hashView` to **every** wrapper. No page has two groups today, so there is **no live bug** and **no test**. 041 must add a guard (assert ≤1 `[data-tabs]` per page, **or** make the derived matrix group-aware). |
| E-05 | `staffSalaries` == `salaries` destination | **Registered shared destination (S-1).** No uniqueness assert may be written across nav routes. |
| E-06 | Grepping for pay tokens | The naive `/SAR/i` grep FALSE-POSITIVES on the persona **"Sara"**. Only the shipped word-boundary `payHit` regex is authoritative. |
| E-07 | `classSalaryReport` and the retired planned probe | A **disabled lock is categorically not a planned item** (different status, different hook: `data-disabled-reason` + `data-reason-key` + `#i-lock`, never `data-coming-soon`). Repointing any planned-item probe at it is **forbidden**. |
| E-08 | A test whose subject no longer exists | Spec 040's precedent is binding: **retire + replace with a zero-census.** *"A test may never be the reason a product lies."* Never keep an item dishonestly planned to give a probe a victim. |
| E-09 | Vacuous-but-retained guards | `truth010.badPlanned` and `plannedNavAnchors === 0` can no longer fail. **Retain byte-verbatim**, document as vacuous (zero-deletion). |
| E-10 | Thinnest matrix rows | `settingsUsers` (`#view=users`) has **exactly one** a11y row (`a11y/run.cjs:209`) and **exactly one** screenshot frame (`capture.cjs:429`). Every other deep-link view has ≥2 in each suite. If 041 sets a per-deep-link matrix floor, **`users` fails it first.** |
| E-11 | Screenshot console errors | The screenshot suite **never exits non-zero** on console errors (`capture.cjs:545 → process.exit(0)`); its error counts are **advisory only**, not a gate. 041 must not treat a green screenshot run as a pass signal. |
| E-12 | A new orphan page | Must **fail** the build. The orphan set is frozen as exactly `{gallery.html, gallery.en.html}` (D-2 Option A). |
| E-13 | An admin page that hides a link the user lacks rights to | **Hiding is not authorization.** 041 audits link *presence*, never *permission*. Real enforcement is **Spec 043**. |

---

## 11. Out of scope

* Any **redesign**: sidebar visuals, rail grouping, IA, typography, colour, layout, density.
* Any **new page**, new nav item, new category, new tab, new fixture domain, new locale module. *(Exception: D-1
  Option A adds two **tabs** to an existing page — a route mechanism, not a new surface.)*
* Any **new hook**, new `data-*` attribute, new storage key, new dependency, new engine.
* Any **real behaviour**: persistence, auth, permissions, CRUD, network, upload, PDF, canvas, chart, computed metric.
* Any **integration** (expressly barred from 041 by `040-.../future-owner-register.md` §3).
* The **product-wide copy sweep** (CF-1) — 041 *names the owner*, it does not perform the sweep.
* **Legacy capability reconciliation** (CF-2, CF-3) — Spec 042.
* The **final product freeze** — Spec 057.
* Weakening **any** existing assert, census or role law. 041 may only **tighten**.

---

## 12. Open questions (for `/speckit.plan`)

| # | Question | Notes |
|---|---|---|
| Q-1 | **D-1: which option?** | Recommendation **A** (`#view=add` / `#view=categories` tabs on `teachers.html`). B trespasses on 044 + the 0-diff wall; C is dishonest by omission; D violates zero-deletion; E breaks the count freeze; F is the "declare it and move on" non-fix this spec's own ruling rejects; G (relabel-only) is weaker than A at the same blast radius. Options **A–G** are the closed, canonical set (§7). The plan must record the rejected options with reasons. |
| Q-2 | **D-1 impact**: does Option A change 2 bodies (`teachers.html`/`.en`) + 62 sidebar-only + 51 untouched? | Must be proven **non-destructively** (FR-025) before implementation, not after. |
| Q-3 | **D-2: which option?** | Recommendation **A** (register + owner + entry path + an exactly-`{gallery}` orphan assert). Zero source change. Recommended owner = the **frontend/design-system maintainer**, not a spec number. |
| Q-4 | **FR-023: who owns the copy sweep — 044, 056, or 057?** | Must be **verified from the committed roadmap**, never asserted or invented. The corpus contains only the dual "044/056" note, outside any contract. **041 recommends 044** (the string is `formDrawer()`'s default `reasonKey` → FO-23 → 044; evidence in `carry-forward-register.md` CF-1); the plan **names** the one owner and may choose only among 044 / 056 / 057. |
| Q-5 | **FR-013**: derive the deep-link matrix from `NAV_CATEGORIES` in `run.cjs` — does that require a new import path, and does it stay inside the smoke suite's existing `import('../../src/js/nav.config.js')` pattern (already used by the source audit at `run.cjs:2512`)? | Expected: **yes, no new dependency.** |
| Q-6 | **E-04**: guard by asserting ≤1 `[data-tabs]` per admin page, or by making the derived matrix group-aware? | The group-aware matrix is strictly stronger and does not constrain future pages. |
| Q-7 | **E-10**: does 041 set a per-deep-link a11y/screenshot matrix floor (≥2 rows each)? If yes, `settingsUsers` needs +1 a11y row and +1 frame. | This is *test* coverage, not product design — inside 041's remit. |
| Q-8 | Does the FR-020 comment correction and the FR-021 vacuity note count as **supersessions** (declared, contracted) or as **documentation**? | Neither changes an assertion's logic; the plan should classify them once and apply the rule consistently. |
| Q-9 | Should the 22 frozen route strings live in a **contract file** (`route-inventory-contract.md`) as well as in the source audit, so a route change fails review *and* the build? | Recommended: yes. |

---

## 13. Summary for the record

> The Spec-041 audit recomputed the entire route and sidebar surface from `21502af` and found it, apart from two
> findings, **clean**: **115** pages · **57** bases · **64/50/1** shell partition · **6** categories · **50** menu items ·
> **49 implemented / 1 disabled / 0 planned** · `FUTURE_ROUTES` **`{}`** · **22** deep-links, all resolving to real
> tabpanels in both languages · **0** `href="#"` · **0** dead targets · **0** dead hashes · **0** AR/EN parity failures ·
> **0** cross-role leaks · **exactly one** honest lock (`classSalaryReport`).
>
> **D-1**: `teachers`, `addTeacher` and `teacherCategories` all route to bare `teachers.html`, and no drawer-hash
> mechanism exists — "Add Teacher" promises a form and delivers the directory. The only genuine route defect.
> **D-2**: `gallery.html`/`.en` are orphans with no documented owner or entry path.
> **S-1**: `salaries` + `staffSalaries` → `finance.html#view=salaries` is an **intentional, registered** shared
> destination.
>
> The largest *test* gap is deep-link discrimination: **9 of 22** deep-links are seeded against a conflicting stored
> view; the other **13** would still pass if `initTabs` regressed to `stored || hash`.
