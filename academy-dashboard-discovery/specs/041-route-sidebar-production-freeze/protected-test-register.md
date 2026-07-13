# Protected Test Register — Spec 041 (Route & Sidebar Baseline Freeze)

**Baseline**: HEAD `21502af` ("settings deep linking architecture…") — Spec 040 committed, working tree clean,
pushed to `origin/feature/012-role-portal-foundation` and present on `origin/main`. Prior HEAD `58a53e2` (Spec 039).
**Scope of this document**: the test surface only — `tests/smoke/run.cjs`, `tests/a11y/run.cjs`,
`tests/screenshots/capture.cjs`. It states (a) what may never change, (b) what has already legally changed and why,
(c) what Spec 041 must ADD. It changes nothing itself: Spec 041 is SPECIFY-ONLY.

> **CLAUDE.md is stale.** It names HEAD `4cbcb31` and calls Spec 039 "awaiting the watcher commit". Both 039
> (`58a53e2`) and 040 (`21502af`) are committed. Spec 040's own risk register logged this as **R9** and warned that
> *"any supersession computed against `4cbcb31` is void."* Every line/number in this register is recomputed against
> `21502af`.

---

## 0. The Supersession Law (binding on Spec 041 and on every later spec)

A protected assertion is not immutable — it is **immovable without proof**. The law, as practised by Specs 035–040
and hereby restated as the standing rule:

| # | Rule |
|---|---|
| **L-1** | **No protected assertion may be WEAKENED.** A change may only tighten (narrow a regex, raise a floor, add a conjunct) or re-target a probe whose subject has honestly ceased to exist. Lowering a floor, widening an allowlist, deleting a conjunct, or `skip`-ping a case is forbidden. |
| **L-2** | **A test may never be the reason the product lies.** If the only way to keep a probe green is to leave a dishonest artefact in the product (e.g. keep one nav item falsely `planned` so a click probe has a victim), the probe is retired — the product is not corrupted. (Spec 040, Option B, REJECTED verbatim.) |
| **L-3** | Every supersession must ship **six** artefacts: **old code** (byte-verbatim), **new code** (byte-verbatim), **evidence** (why the old assertion is now unsatisfiable / wrong), **reason** (what product change caused it), **neighbours** (the adjacent asserts proven byte-verbatim / unaffected), and a **mutation proof** (§6). |
| **L-4** | A supersession is **declared in the spec text and in an inline code comment**, never performed silently. |
| **L-5** | **Zero-deletion.** A render branch or handler that becomes unexercised is RETAINED, not deleted. Its guard becomes a vacuous-but-retained assert (§4) — it is not removed. |
| **L-6** | The **amendment budget** is small and named. Specs 035–040 each took **one or two** scoped amendments, each documented inline. Spec 041 takes **zero supersessions** (§5) — it is a freeze; its whole test delta is **additive**. |

---

## 1. The Protected Set — BYTE-VERBATIM, DO NOT EDIT

Line numbers are `tests/smoke/run.cjs` at `21502af` unless stated. These assertions have survived Specs 026–040
unchanged and must survive 041 unchanged.

### 1.1 Role laws (the five hard lines)

| ID | Site | Assertion | Law |
|---|---|---|---|
| **P-01** | `smoke:2069-2072` | `payHit` — `/\b(salary\|salaries\|payouts?\|earnings?\|compensation)\b/i` + `/راتب\|رواتب\|أجر\|مستحقات\|غرامة\|مكافأة/` on the teacher-portal body | teacher **PAY-FREE GLOBAL** |
| **P-02** | `smoke:1990-1991` | `tchPay` — same two regexes on the 7 teacher **internal** pages | teacher pay-free (extended set) |
| **P-03** | `smoke:1959-1960` | `famPay` — `/ريال\|ر\.س\|\bSAR\b\|\bUSD\b\|جنيه\|\bEGP\b\|[$€£]\|ادفع\|سداد\|pay now\|payment\|\bamount\b\|\bprice\b\|مبلغ\|سعر\|رسوم/i` on the 7 family internal pages | family **ZERO-PAY** |
| **P-04** | `smoke:2025-2026` **and** `smoke:2049-2050` | `payFigure` — the same regex, twice byte-identically (family-portal home, family-child) | family zero-pay hard line |
| **P-05** | `smoke:1945-1950` | child-view — `!/لوحة الطالب\|بوابة الطالب\|student dashboard/i` on `student-portal` + `STUDENT_INTERNAL` | student **CHILD-VIEW** (Spec 024 B-01) |
| **P-06** | `smoke:738` (`PAY28`), used at `:750`, `:784`, `:798`; plus `:1658`/`:1663` and `:2291`/`:2296` (`noPay`) | admin teacher surfaces carry no pay figure; `teacher-performance.html` is the sanctioned Spec-024 **B-07** admin exempt board and is linked from **zero** portal pages | teacher pay-free, admin side |
| **P-07** | `smoke:1031-1124` | finance: 4 tiles · 9 invoices · 6 payments · 9 planned cards · 9 `inv-*` drawers · the `forbidden` regex · no-mutation · no-receipt | finance **NO-FAKE-MONEY** |
| **P-08** | `smoke:894-909` | reports: 7 `.report-card` · 8 tiles · source-link · `deadHash === 0` in the reports body | reports body **finance-free forever** |

**NB on P-01/P-02.** A naive `/SAR/i` grep FALSE-POSITIVES on the persona name **"Sara"**. The shipped regex is
word-boundary scoped. Spec 041 must not "improve" it into a substring match.

### 1.2 Count / menu / route freezes

| ID | Site | Assertion |
|---|---|---|
| **P-09** | `smoke:2583` | `pub.length === 115` — `public/` holds exactly **115** HTML pages (57 bases × 2 + `index.html`), plus a per-base language-mirror assert |
| **P-10** | `smoke:1391` | `navCount32 === 50` — the admin menu, on **every admin page × 2 langs** |
| **P-11** | `smoke:1576` · `smoke:2400` · `smoke:2506` · SOURCE `smoke:2554` | the same **50** re-asserted at four further independent sites (Spec-040 block · finance block · content block · `nav.config` source audit) |
| **P-12** | `smoke:1782` | `nav010.railCats === 6` — the six-category rail (Spec 010) |
| **P-13** | `smoke:1784` | `finMembers` === `['finance','invoices','monthlyInvoices','salaries','staffSalaries','payments','classSalaryReport','banks']` (exact order) |
| **P-14** | `smoke:1787-1788` | `banksInReports && !banksInAdmin`; `admItems.length === 5 && !admItems.includes('banks')` |
| **P-15** | `smoke:1796-1801` | sessions-badge localized-fixture asserts + `famTitle` |

### 1.3 Link integrity / honest-state

| ID | Site | Assertion |
|---|---|---|
| **P-16** | `smoke:145-147` + `:180` | `deadNav === 0` — an anchor without a route, or a planned/disabled **button** without `data-coming-soon` / `data-disabled-reason`, is a dead nav item |
| **P-17** | `smoke:1805-1823` | `links010.deadHash === 0` · `external === 0` · `badTarget === 0` (`href="#"` = 0 sitewide, Spec 011) |
| **P-18** | `smoke:1829-1836` | `truth010.badPlanned === 0` · `truth010.badDisabled === 0` (see §4 — `badPlanned` is now **vacuous-but-retained**) |
| **P-19** | `smoke:2111` · `:2132` · `:2153` · `:2174` | `prt.plannedNavAnchors === 0`, four times byte-identically (a planned portal nav entry may never be an anchor) — **vacuous-but-retained** since Spec 025 |
| **P-20** | `smoke:891`/`:909` (reports) · `smoke:1014`/`:1057` (finance) | body-scoped `href="#"` = 0 |
| **P-21** | `smoke:247-254` | the Spec-040 **zero-census**: `zeroPlanned.planned === 0 && zeroPlanned.comingSoon === 0` (the replacement for the retired click probe — §3/§4) |
| **P-22** | `smoke:1574` | `nav040.planned === 0 && nav040.comingSoon === 0`, per admin page × 2 langs |
| **P-23** | `smoke:1196-1200` · `smoke:1387-1388` | the `a31` / `g32` honesty gates (gate floor raised to `>= 20` by Spec 040 — **T1**; it may be raised again, never lowered) |

### 1.4 The `classSalaryReport` lock probe — the ONE honest lock, asserted at FIVE sites (P-24 · P-25 · P-26 · P-27 · P-34)

Rendered shape (verified on all 115 built pages):

```html
<button type="button" class="nav-item is-disabled" data-nav="classSalaryReport"
        data-nav-status="disabled" aria-disabled="true"
        data-disabled-reason data-reason-key="nav.reason.finance" title="…">
```

non-anchor ✅ · no `href` ✅ · `aria-disabled` ✅ · reason-bearing ✅ · `#i-lock` ✅ · **route-less** ✅ · **not planned** ✅

*(The fifth site is **P-34**, `smoke:2551` — `locks.length === 1 && locks[0].id === 'classSalaryReport'` — listed in
§1.5 with the rest of the SOURCE audit. Lock sites = P-24 · P-25 · P-26 · P-27 · P-34. **P-28 below is not a lock
assert** — it is the finance-links list, kept here because it is the lock's immediate neighbour.)*

| ID | Site | Assertion |
|---|---|---|
| **P-24** | `smoke:1728-1732` → `:1742` | `walletIds = ['classSalaryReport']`; `walletOk` = `data-nav-status="disabled"` ∧ `aria-disabled="true"` ∧ `use[href="#i-lock"]` |
| **P-25** | `smoke:1770-1776` → `:1793` | `nav010.lockedFin = ['classSalaryReport']` + `data-reason-key === 'nav.reason.finance'`; `lockedOk` `.every()` logic |
| **P-26** | `smoke:2398` | finance route block: non-anchor ∧ disabled ∧ status `disabled` ∧ reason `nav.reason.finance` ∧ lock icon ∧ **no `href`** |
| **P-27** | SOURCE `smoke:2526-2527` | `csr.status === 'disabled' && csr.reasonKey === 'nav.reason.finance' && !csr.route` |
| **P-28** | `smoke:1786` | `finLinks === ['finance','invoices','monthlyInvoices','salaries','staffSalaries','payments','banks']` — the 7 implemented finance links (Spec 038 supersession, now itself protected) |

**Forbidden move (restated from Spec 040):** the retired planned-item probe may **NOT** be repointed at
`classSalaryReport`. *A disabled lock is categorically not a planned item* — different status
(`disabled` vs `planned`), different hook (`data-disabled-reason` + `data-reason-key` + `#i-lock` vs
`data-coming-soon`), different copy. Its own reason-toast probe (`smoke:~256-262`) stays byte-verbatim.

### 1.5 The `nav.config` SOURCE audit (`smoke:2512-2555`, runs after `browser.close()`)

The only Node-side test that can see what the DOM cannot. Protected in full:

| ID | Assertion |
|---|---|
| **P-29** | `!('materials' in FUTURE_ROUTES)` · `!('certificateRequests' in FUTURE_ROUTES)` (Spec 039) |
| **P-30** | `byId('admin','materials').route === 'library.html#view=materials'` · `certificateRequests → 'certificates.html#view=requests'` · `books → 'library.html#view=books'` |
| **P-31** | the `csr` honest-lock assert (= **P-27**) |
| **P-32** | the six `SIX_ROUTES` settings entries: `status === 'implemented'` ∧ exact `route` string (Spec 040) |
| **P-33** | `stillPlanned.length === 0` |
| **P-34** | `locks.length === 1 && locks[0].id === 'classSalaryReport'` |
| **P-35** | `Object.keys(FUTURE_ROUTES).length === 0` — `FUTURE_ROUTES` is `{}` **by construction**: a promoted item carries a real route on the item itself, never a placeholder in the map |
| **P-36** | settings category `.items.length === 7` |
| **P-37** | `allItems.length === 50` |

**Known gap (Spec 041 closes it additively, §5 T-01/T-02):** the source audit pins **route strings for only 9 of the
22** deep-links (materials · books · certificateRequests + settings ×6). The other **13** are asserted in
rendered-DOM form only, and every deep-link matrix in the suite is a **hand-written per-spec literal**, not derived
from `NAV_CATEGORIES` — so a 23rd deep-link added tomorrow inherits **zero** automatic coverage.

### 1.6 Protected-by-convention: the mechanism

`enhance.js:261-273` `initTabs` precedence — **URL `#view=` hash → stored `academy.schedView.<group>` → baked default
tab**. `selectTab(…,{persist:true})` writes both `localStorage` and `history.replaceState('#view='+id)`, so a real
user's last-clicked tab **is** persisted: the hash-vs-stored conflict is a **live production state**, not a
hypothetical. Any test that does not seed a conflicting stored view is not testing the precedence.

---

## 2. Supersession History 035 → 040 (every one, with its exact reason)

### 2.1 The dying probe — the corrected chain

The single most-superseded assertion in the corpus is the dashboard **`.nav-item.is-planned` CLICK probe**
(`smoke:223-230`, pre-040): open the sidebar category, click a planned item, assert the «قريبًا» feedback toast.
It was repointed **category by category** as each category reached zero planned items, then retired.

| Spec | Probe target | Why |
|---|---|---|
| 034 | `control` → **`families`** | Control's 5 items (messages/leads/tasks/announcements/timeConverter) all promoted → Control hit 0 planned; the probe's subject vanished. |
| 035 | `families` → **`teachers`** | familyCategories/scheduleSearch/studentResult/studentEvaluation promoted → families hit 0 planned. |
| 036 | `teachers` → **`admin`** | addTeacher/teacherCategories/sessionsKpi/monthlyPerf promoted → teachers hit 0 planned. Choice among reports/admin/settings recorded in `036/contracts/smoke-coverage-contract.md:17`. **Verified in git: `56bc418` → `run.cjs:227` reads `data-nav-category="admin"`.** |
| 037 | *(untouched)* | 037's amendment was the `nav035` **route** asserts, not the probe. |
| **038** | **NO-OP** | Verified in git: `4cbcb31` still reads `data-nav-category="admin"`. 038's sole supersession was `lockedFin`/`finLinks`. |
| 039 | `admin` → **`settings`** | materials/certificateRequests promoted → admin hit 0 planned; settings was "the only category still carrying planned items — 6, owner Spec 040". |
| **040** | **RETIRED** | Settings hit 0 planned → **no honest category left to point at**. |

> **Correction of a committed artefact.** `040-…/protected-test-supersession-register.md` states *"Spec 038 pointed
> the probe at `admin`; Spec 039 repointed it admin → settings."* The first clause is **wrong** — **Spec 036** pointed
> it at `admin` (`56bc418`, `run.cjs:227`) and **Spec 038 left it untouched** (`4cbcb31`). Spec 040's *conclusion* is
> unaffected; Spec 041 carries the corrected chain above.

### 2.2 The full supersession ledger

| Spec | # | Target | Old | New | Reason |
|---|---|---|---|---|---|
| **034** | A1 | route-freeze constant | `103` | `113` | +10 files (5 pairs: messages/leads/tasks/announcements/time-converter) + 5 PAGES entries |
| **034** | A2 | planned probe | `control` | `families` | Control reached 0 planned |
| **035** | A1 | route-freeze constant | `113` | **`115`** | +2 files (`schedule-search` pair) + 1 PAGES entry. **The last count amendment in the product.** |
| **035** | A2 | planned probe | `families` | `teachers` | families reached 0 planned |
| **036** | A1 | planned probe | `teachers` | `admin` | teachers reached 0 planned; route-freeze stayed 115 |
| **037** | A1 | `nav035` **route** asserts | `familyCategories → families.html`; `studentResult/studentEvaluation → student.html#view=…` | `families.html#view=categories`; `students.html#view=results\|evaluation` | 037 built cross-student Results/Evaluation boards + a labeled Categories board, so the nav targets moved from the single-entity pages to the **list** pages. A **re-target**, not a weakening: the predicate `anchorOk` (anchor ∧ ¬coming-soon ∧ regex) is unchanged. |
| **038** | A1 | `nav010.lockedFin` (`smoke:1770`) | `['invoices','monthlyInvoices','salaries','staffSalaries','payments','classSalaryReport','banks']` | **`['classSalaryReport']`** | The 6 finance locks became real `#view=` deep-links. **`lockedOk` LOGIC unchanged** (still `.every()` over disabled ∧ reason ∧ `#i-lock`); `finMembers` (8 ids) unchanged. Contract: `038/contracts/lockedFin-smoke-supersession-contract.md`. |
| **038** | A2 | `nav010.finLinks` (`:1786`) | (pre-038 list) | the 7 implemented ids in DOM order | mirror of A1 |
| **038** | A3 | finance tab count (`:1067`) | `3` | `6` | mechanical: overview/invoices/payments/monthly-invoices/salaries/banks |
| **038** | A4 | interactive invoice checks (`:1094`) | on `finance.html` | behind `finance.html#view=invoices` | the invoice list MOVED to a tab; assertions moved with it, none dropped |
| **039** | A1 | planned probe | `admin` | `settings` | admin reached 0 planned |
| **039** | A2 | `nav010` admin assert (`:1788`) | msg text said "5 planned items" | msg text corrected + **additive** `ok(nav010.admPlanned === 0)` at `:1792` | **LOGIC (`admItems.length === 5 && !includes('banks')`) byte-verbatim**; only the inaccurate failure message was fixed, and a conjunct was ADDED. A strengthening. |
| **040** | **S1** | `settingsPlanned` at **two** sites (`:1539`, `:2505`) | `=== 6` | **`=== 0`** | A **strengthening**, and a promissory note called in: both old lines were authored by Spec 039 and both named *"owner Spec 040"* in their own failure message. |
| **040** | **S2** | the `.nav-item.is-planned` **CLICK probe** (`:223-230`) | click a planned nav item, assert the «قريبًا» toast | **RETIRED**, replaced *in place* by the sitewide zero-census `planned === 0 && comingSoon === 0` (`:247-254`) with a 16-line inline justification at `:231-246` | §3 |
| **040** | **T1** | `a31.gates` (`:1223`) | `>= 4` | `>= 20` | strengthening (settings gate floor) |
| **040** | **T2** | `FORM_DRAWERS_032.settings` (`:92-99`) | `['head-add']` | the exact 12-id list | closing a **register omission** — an unregistered drawer escapes the MUST-OMIT audit entirely |

---

## 3. Why S2 was a RETIREMENT and not a repoint — the reasoning Spec 041 inherits

**The evidence.** `clickFeedback` returns `"selector … not found"` when the node is absent. After Spec 040 promoted
the last six settings items, **zero** `.nav-item.is-planned` nodes exist anywhere in the product. The probe therefore
*"fails by construction — it is not merely stale; it is **unsatisfiable by an honest build**."*

**The four options Spec 040 evaluated, on the record:**

| Option | Verdict | Reason |
|---|---|---|
| **A** — plant a planned-nav specimen in `gallery.html` so the probe has a target | **NOT TAKEN** | widens the body allowlist for one toast branch; pollutes a reference page with a fiction |
| **B** — keep one settings item dishonestly `planned` so the probe has a victim | **REJECTED** | **"A test may never be the reason a product lies."** (= Law **L-2**) |
| **B′** — repoint the probe at `classSalaryReport` | **FORBIDDEN** | a **disabled lock is categorically not a planned item**: different status, different hook (`data-disabled-reason`/`data-reason-key`/`#i-lock`, not `data-coming-soon`), different copy |
| **C** — retire the probe; replace with a sitewide zero-census | **TAKEN** | the honest assertion about a product with no planned items is *"there are none"* |

**Zero-deletion held (Law L-5).** The coming-soon **render branches** in `components/sidebar.js` and the
`data-coming-soon` **handler** in `enhance.js` were **RETAINED**, and are now permanently unexercised in production
nav. **Spec 041 must not delete them.**

**The precedent that made this legal.** `components/portal-shell.js:30` has carried an unexercised `is-planned`
render branch since **Spec 025** (when the 7 teacher nav items were promoted), and its guard has been expressed ever
since as the honest **vacuous** assertion `prt.plannedNavAnchors === 0` — asserted four times, byte-identically
(`smoke:2111`, `:2132`, `:2153`, `:2174`), and *documented as vacuous in the suite itself* at `smoke:237-240`.
S2 is the admin-sidebar twin of that precedent, one layer up.

---

## 4. Vacuous-but-retained register (assert kept, subject gone)

Spec 041 must **record** these, never remove them. A vacuous guard is the tripwire that fires the day the subject
returns.

| Guard | Site | Vacuous since | Why retained |
|---|---|---|---|
| `prt.plannedNavAnchors === 0` | `smoke:2111`/`2132`/`2153`/`2174` | Spec 025 | `portal-shell.js:30` still renders `is-planned`; the guard proves it is never an anchor |
| `truth010.badPlanned === 0` | `smoke:1829-1830`, `:1835` | Spec 040 | filters `data-nav-status="planned"` — a set that is now empty sitewide; `sidebar.js`'s planned branch is retained |
| `zeroPlanned.planned === 0 && .comingSoon === 0` | `smoke:247-254` | (born vacuous by design, Spec 040) | this is the **positive** statement of the freeze; it is the census, not a probe |
| `nav040.comingSoon === 0` | `smoke:1574` | Spec 040 | per-page twin of the above |
| `FUTURE_ROUTES` = `{}` | `smoke:2551` (`Object.keys(fr).length === 0`) | Spec 040 | the map is empty **by construction**; the assert forbids its resurrection |

---

## 5. NEW additive coverage Spec 041 REQUIRES

All **additive**. Spec 041 declares **zero supersessions** and touches **zero** protected lines. Each item below is a
new block appended to the suite (or a new matrix row), with the protected neighbours proven byte-verbatim.

### T-01 — a **DERIVED, SEEDED** deep-link matrix for **all 22** `#view=` routes *(the headline gap)*

**The gap, precisely.** All 22 deep-links *do* have a fresh-context load test — but only **9** are
**discriminating**. The suite splits into two classes:

| Class | Count | Blocks | What it actually proves |
|---|---|---|---|
| **SEEDED** (the context pre-writes `localStorage['academy.schedView.<group>']` to a **different** view via `ctx.addInitScript`) | **9** | `SP039_DEEPLINKS` `smoke:2404-2439` (library materials/books, certificates requests) · `SP040_VIEWS` `smoke:2441-2472` (settings ×6) | **the URL hash BEATS a conflicting stored view** — the real precedence |
| **UNSEEDED** (fresh context, **empty** localStorage) | **13** | `smoke:2273-2300` (teacher-performance ×2) · `smoke:2302-2335` (`SP037_DEEPLINKS`: reports ×2, families ×1, students ×2) · `smoke:2337-2362` (finance ×6) | only *"hash beats the baked default"* |

**The 13 undiscriminated:** `familyCategories` · `studentResult` · `studentEvaluation` · `sessionsKpi` ·
`monthlyPerf` · `monthlyReports` · `dataAnalysis` · `invoices` · `monthlyInvoices` · `salaries` · `staffSalaries` ·
`payments` · `banks`.

**The regression they cannot catch:** if `initTabs` (`enhance.js:266-272`) regressed from `hash || stored` to
`stored || hash`, **all 13 would still pass** — and since `selectTab(...,{persist:true})` writes the stored view on
every real tab click, that regression would silently break the sidebar for every returning user. Only the 9 seeded
tests would fail.

**Two views are worse than undiscriminated — they are VACUOUS-PRONE:** `library` bakes **`materials`** as its
default tab and `settings` bakes **`general`**. Unseeded, `#view=materials` and `#view=general` would pass **even
with JavaScript disabled**. That is exactly why 039/040 introduced the seed; the same hazard is untested for the 13.

**Required.** **[R-1 CORRECTION — ADDITIVE, not a replacement.** The four hand-written literal arrays
(`SP037_DEEPLINKS` · `SP039_DEEPLINKS` · `SP040_VIEWS` · the Spec-038 finance array) are **RETAINED VERBATIM** and
keep their assertion logic; deleting or folding any of them would be a **sixth protected-test supersession**, which
the S1–S5 budget forbids. The derived matrix is added **beside** them as the generic freeze layer.**]
Add **ONE matrix DERIVED from `NAV_CATEGORIES`**: for
every nav item whose `route` contains `#view=`, load `<file>#view=<v>` (and `<file>.en.html#view=<v>`) in a **FRESH
context** with `academy.schedView.<group>` pre-seeded to a **different existing tab id**, and assert the target
panel — and **only** the target panel — is active. The tab-group id is **not** mechanically derivable from the route
string, so the matrix carries an explicit, asserted `file → group` map:

| file | `data-tabs` group | baked default | note |
|---|---|---|---|
| `families` | `families` | `directory` | |
| `students` | `students` | `directory` | |
| `teacher-performance` | **`perf`** | `overview` | group id ≠ file id |
| `reports` | `reports` | `overview` | |
| `finance` | `finance` | `overview` | 6 panels |
| `library` | `library` | **`materials`** | ⚠ a deep-link sits ON the default |
| `certificates` | `certificates` | `templates` | |
| `settings` | `settings` | **`general`** | ⚠ a deep-link sits ON the default |

Derivation is the point: **a 23rd deep-link added tomorrow must inherit coverage automatically.** The map above must
itself be asserted complete (every deep-link file has an entry; no orphan entries).

### T-02 — deep-link **fragment resolution** in the source audit and in link-integrity

Two structural holes:

1. **The link-integrity crawl throws the fragment away.** `smoke:1814`: `const file = h.split('#')[0];` — `badTarget`
   proves the *file* exists and nothing more. A typo such as `settings.html#view=customisation` (UK spelling — the
   suite itself warns about this at `:1569-1570`) is **invisible** to `badTarget` and is caught today only by a
   hand-written per-spec literal.
2. **The source audit pins only 9/22 route strings** (§1.5). The other 13 are DOM-asserted only.

**Required (additive):** a Node-side assert that for **every** item in `NAV_CATEGORIES` with a `#view=` route, the
fragment id exists as a `[data-tab]` / `data-tabpanel` on **both** the AR and EN target file. Today: **0 dead
`#view=` hashes** — that fact must become a *test*, not an audit footnote.

### T-03 — the full **sidebar-href register** assert

Today the 50 items are asserted piecemeal, per-spec (`nav035`, `nav036`, `nav037`, `nav039`, `nav040` blocks), each
covering the items *its own* spec promoted. There is **no single assertion of the whole 50-item route table**.

**Required:** one register — 50 rows, id → status → exact route (or `null`) — asserted against `NAV_CATEGORIES` in
source **and** against the rendered sidebar on every admin page. Split freeze: **22 deep-link routes + 27 plain page
routes + 1 route-less lock = 50**. The register records the two **intentional non-unique destinations** so neither is
ever mistaken for a bug:

- **S-1 (sanctioned, Spec 038):** `salaries` **and** `staffSalaries` → both `finance.html#view=salaries` — the
  salaries tab carries **both** the teacher and the staff board. Legitimate; frozen; must be recorded.
- **D-1 (DEFECT, see below):** `teachers` **and** `addTeacher` **and** `teacherCategories` → all three bare
  `teachers.html`, **no hash**.

### T-04 — **AR/EN nav route parity** assert

Today: **0 parity failures** — every AR nav `href` has the exact `.en` twin **with the hash preserved** (guaranteed
by `sidebar.js`'s hash-aware `langRoute()`, made hash-aware in Spec 035). This is asserted nowhere as a *rule*.

**Required:** for every one of the 50 items, assert `route_en === langRoute(route_ar)` — same file base, `.en`
inserted, **fragment byte-identical**. A dropped `#view=` on the EN side is currently invisible.

### T-05 — **orphan-page** assert

Today: exactly **2 orphans** — `gallery.html` / `gallery.en.html`: not in `nav.config`, not linked from `index.html`
or any page, registered in `build-html.mjs` PAGES with `activeId: null`. It is the component/design-system reference
page (finding **D-2**).

**Required:** an assert that the orphan set is **exactly** `{gallery.html, gallery.en.html}` — no more, no fewer.
Per the audit law an intentionally-reachable non-sidebar page is not automatically a defect, but it **must have a
documented owner and entry path**; today it has neither. The assert freezes the exception so a *new* orphan (a page
built and then forgotten) fails the build.

### T-06 — the **D-1** teacher fold-anchor defect (the only genuine route defect found)

Three sidebar items carry the **byte-identical** `route: 'teachers.html'` (`src/js/nav.config.js:54-56`; identical in
`public/assets/js/nav.config.js`): **`teachers`** · **`addTeacher`** · **`teacherCategories`** — with **no `#view=`
hash**, unlike every other Spec-035…040 fold-anchor in the same file.

The `trn-add` and `trn-categories` drawer **templates** exist on `teachers.html`, but `enhance.js` handles **only**
`#view=` (tabs) and `#step=` (wizard) — **there is no drawer-hash mechanism**. The drawers are wired solely to two
page-header buttons (`pages/teachers.js:83,105`; `components/teacher-actions.js:27-29,70-72`). A live browser probe
confirms: **landing on `teachers.html` opens no drawer.** So "Add Teacher" promises a form and delivers the
directory, and the three items are **indistinguishable by outcome**.

Legacy had **3 (arguably 4)** genuinely distinct teacher-domain sidebar destinations — `/management/teachers`
(roster), `/management/teachers/create` (a dedicated **57-field** creation form), `/management/teacher-categories`
(its own CRUD page: forms=2, flds=4, tbl=1, with 3 child routes), plus a 4th entry re-using the label "Teachers" for
`/management/teachers_details`. Spec 036 declared these two as "fold-anchors" and explicitly recorded the caveat
(*"Spec 036 only points the nav item at this page; no body edit"*) — **but a declaration does not make a destination
honest.**

**Classification: 5 — invalid/defective route requiring correction.** It is **not** a planned item and **not** a
lock. Spec 041 specifies the **smallest honest fix** and its exact impact; the accompanying test is:

> assert that **no two nav items share an identical route string**, with **exactly one** registered exception —
> `salaries` / `staffSalaries` → `finance.html#view=salaries` (S-1).

Today that assert **fails** on `teachers`/`addTeacher`/`teacherCategories`. It is written to fail, and the fix makes
it pass. **No fix is applied or chosen here**: the canonical option set is `spec.md` §7 D-1 **A–G** (recommendation
**A** — distinct `#view=` fragments on `teachers.html`), and `/speckit.plan` selects it.

### T-07 — one-tabs-widget guard *(cheap, closes a latent cross-activation hazard)*

`initTabs` (`enhance.js:266`) parses **one** `hashView` and applies it to **every** `[data-tabs]` wrapper on the
page. No current page has two tab groups, and no page has two groups sharing a view id — so there is **no live bug**.
But nothing asserts it. **Required:** a one-line guard —
`document.querySelectorAll('[data-tabs]').length <= 1` on admin pages — **or** make the T-01 matrix group-aware and

> **RESOLVED BY THE PLAN ROUND (Q-6 / E-04 / R-18) — this either/or is CLOSED, do not re-open it.** The plan adopts the **group-aware** option and **REJECTS** the `[data-tabs] <= 1 per admin page` rule (it would legislate away a legitimate future multi-group page for no honesty gain). The shipped guard is: every deep-link assertion is scoped `[data-tabs="<group>"] [data-tabpanel="<view>"]`, plus detector **X-9** — *no two `[data-tabs]` groups on one page may declare the same tab id*. See `derived-route-matrix-contract.md` §0/§5 (X-9) and `plan.md` §9 T-07. This is a **refinement, not a supersession**: the one-widget guard was a specify-phase proposal, never shipped code.

assert the target group's panel is the *only* one activated.

### T-08 — matrix floors for the thinnest deep-links

`settingsUsers` (`#view=users`) is the thinnest row in both non-smoke suites: **exactly one** a11y row
(`a11y/run.cjs:209`, en/light/desktop) and **exactly one** screenshot frame (`capture.cjs:429`, ar/light/desktop).
Every other deep-link view has ≥2 in each. If Spec 041 sets any per-deep-link matrix floor, `users` is the row that
fails first — so either raise it or record the exception explicitly. **NB** `capture.cjs:545` is
`process.exit(0)` — screenshot console-error counts are **advisory, not a gate**; a floor there is a discipline, not
an enforcement.

### T-09 — the stale route-freeze comment

`smoke:2580` still reads `// ===== Spec 032 — route/page count freeze: 51 bases × 2 languages + index = 103 =====`
while the assertion two lines down is `pub.length === 115`. Cosmetic, but **041 is the re-freeze** — the comment must
say **115** (57 × 2 + index). Comment-only: not a supersession.

### T-10 — carry-forward, **NOT fixed here** (record the owner)

`common.backendRequiredNote` reads *"…nothing is **saved** yet"* in EN. It is **honest** (it *denies* a save) but it
carries the token the fake-success census greps; it renders on **~50 pages**, so rewording it exceeds a
route/sidebar freeze's impact boundary. Sitewide the token count fell **182 → 179** under Spec 040.

**Ownership is genuinely ambiguous; Spec 041 closes it by VERIFICATION, and the single owner is NAMED in
`/speckit.plan`** (`spec.md` FR-023 / Q-4). The only statement in the committed corpus is
`040-settings-deep-links-subpages/implementation-status.md` — *"A product-wide copy sweep belongs to **Spec 044/056**"*
— a **dual** owner, recorded in a "findings handed forward" section, **not in any contract**. Adjacent, contracted
ownership in `040-settings-deep-links-subpages/future-owner-register.md` §2: **FO-23** = global modal/drawer/long-form
system → **044**; **FO-24** = product-wide **form-completeness** re-audit → **056** (with an explicit non-excuse
clause); **FO-26** = final parity/security freeze → **057**. 041 **cannot** own it (it is a freeze, and *"no real
integrations may be assigned to Spec 041"*). **041's recommendation is 044** — the string is `formDrawer()`'s default
`reasonKey` in `preview-drawer.js`, the exact component FO-23 assigns to 044 (evidence: `carry-forward-register.md`
CF-1) — and the plan may choose only among the corpus-named candidates **044 / 056 / 057**. It may invent no new spec
number; per the roadmap-provenance caveat, all of these are maintainer-amendment slots, not chartered specs.

---

## 6. Mutation proof — the required evidence for any change to the suite

Every additive block **and** any future supersession ships a mutation proof: *break the product in the exact way the
assertion exists to catch, show the assertion goes RED, restore, show it goes GREEN.* A test that cannot be made to
fail is not evidence.

| New assert | Mutation that must turn it RED |
|---|---|
| **T-01** (seeded deep-links) | flip `initTabs` to `stored \|\| hash` → all 22 seeded rows fail; **today only the 9 seeded ones would** |
| **T-02** (fragment resolution) | rename one `data-tab` id (e.g. `customization` → `customisation`) → RED; today `badTarget` stays 0 |
| **T-03** (href register) | change any one of the 50 routes → RED |
| **T-04** (AR/EN parity) | drop the `#view=` from one EN twin → RED |
| **T-05** (orphan set) | add a PAGES entry with no inbound link → RED |
| **T-06** (route uniqueness) | **RED today** on `teachers`/`addTeacher`/`teacherCategories`; GREEN after the D-1 fix |
| **T-07** (one tabs widget) | add a second `[data-tabs]` wrapper to any admin page → RED |

**Impact-proof method (binding, from `040-…/contracts/impact-protection-contract.md`).** Non-destructive **only**:
`git show <commit>:<path>` or a detached `git worktree add --detach`. **NEVER** `git stash`, `git reset --hard`,
`git checkout -- <path>`, `git clean`, or a branch switch. `#page-body` is extracted with
`sed -n '/<div[^>]*id="page-body"/,/<\/div><!-- \/page-body -->/p'` and md5'd against the committed baseline.

**The 115-file partition Spec 041 must re-prove against `21502af`** (the frozen partition, `count-and-freeze-contract.md`
§1): **64** admin / sidebar-bearing files (incl. `gallery.html`/`.en`) + **50** portal files + **1** `index.html` =
**115**. *(Spec 040's contract expressed the same product as "64 admin + **51** non-admin"; that 51 = **50 portal +
`index.html`**. Same statement, one partition finer. The recurring "portal ×16" shorthand in Specs 025–040 means the
**16 teacher-portal files** — never all portals.)* For a pure re-freeze the expected split is **0 body-changed /
0 sidebar-changed / 115 untouched** — *except* for the exact, declared D-1 correction (§5 T-06), whose impact must be
stated file-by-file.

**The 0-diff wall Spec 041 inherits from 040** (13 files, byte-identical): `package.json` · `scripts/build-html.mjs` ·
`src/js/i18n.js` · `src/js/enhance.js` · `src/js/components/sidebar.js` · `src/js/components/tabs.js` ·
`src/js/components/form-field.js` · `src/js/components/settings-section.js` · `src/js/components/preview-drawer.js` ·
**`src/js/components/ui.js`** *(not `src/js/ui.js` — that path does not exist; verified at `21502af`)* ·
`src/js/fixtures/settings.js` · `src/js/pages/staff.js` · `src/js/fixtures/staff-management.js`.

---

## 7. Standing censuses Spec 041 re-verifies (never weakens)

`type=password` = 0 · `type=file` = 0 · `<canvas>` = 0 · `.pdf` / `window.open` = 0 · credential-named inputs = 0 ·
authored secret value = 0 · fake-"Connected" chip = 0 · computed score/rank/leaderboard/percentile/chart = 0 ·
computed Total/outstanding/balance/profit/VAT/salary/payout = 0 · `href="#"` = 0 sitewide · 6 rail categories ·
raw locale keys = 0 · admin destinations reachable from any portal page = **0** · portal destinations reachable from
any admin page = **0**.

**Hiding a nav link is NOT authorization.** The zero cross-role reachability above is a *navigation* fact, not an
access-control fact; real enforcement is owned by **Spec 043** (privacy / role isolation) — 041 freezes the surface,
it does not claim to secure it.
