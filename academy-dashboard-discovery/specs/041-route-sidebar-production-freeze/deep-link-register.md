# Spec 041 — Deep-Link Register (all 22 `#view=` nav routes)

**Scope**: every admin sidebar item in `src/js/nav.config.js` whose `route` carries a `#view=` fragment.
**Baseline**: HEAD `21502af` (Spec 040 committed), working tree clean, 115 built HTML pages, admin menu 50 items
(49 implemented · 1 honest lock · 0 planned), `FUTURE_ROUTES = {}`.
**Route split (50)**: **22 deep-link (`#view=`) routes** + 27 plain page routes + 1 route-less lock
(`classSalaryReport`) = 50. ✅
**Status of this document**: AUDIT/FREEZE record. It changes no source, no test, no HTML. It fixes the 22 routes as
the frozen deep-link surface and names the one additive test-coverage gap Spec 041 must specify.

---

## 1. The machinery (what every row below depends on)

| Layer | File · line | Behaviour (verbatim intent) |
|---|---|---|
| Route emission | `src/js/nav.config.js` | `item({ id, labelKey, icon, route: '<page>.html#view=<tab>' })` — the hash is authored **in the route string**, never in `FUTURE_ROUTES` (permanently `{}`). |
| Language rewrite | `src/js/components/sidebar.js:18-26` `langRoute()` | Hash-aware (Spec 035): splits at `#`, rewrites `X.html` → `X.en.html`, **re-appends the fragment byte-identically**. `nav-item` anchor emitted at `:46`. |
| Tab selection on load | `src/js/enhance.js:261-273` `initTabs()` | `const hashView = (location.hash.match(/view=([a-z0-9-]+)/i) || [])[1];` → `let want = hashView && has(hashView) ? hashView : null;` → *else* `localStorage.getItem('academy.schedView.' + group)` → *else* the baked first tab. **Precedence: hash → stored view → baked default.** |
| Tab selection on click | `src/js/enhance.js:246-260` `selectTab(group, id, {persist})` | Sets `is-active` / `aria-selected` / roving `tabindex` on `[data-tab]`, flips `hidden` on every `[data-tabpanel]`. With `persist: true` (a real user click) it **writes** `localStorage['academy.schedView.<group>']` **and** `history.replaceState(null, '', '#view=' + id)`. `initTabs` calls it with **`persist: false`** — a deep-link arrival never mutates the stored view. |
| Sidebar active pill | `src/js/components/sidebar.js:30-48,77-96` + `scripts/build-html.mjs` `PAGES[].activeId` | **Baked per page at build time**, not derived from the hash. See §5. |

**Tab-group ids** (needed by any derived matrix — the route string does *not* give the group):
`families` · `students` · `perf` (teacher-performance) · `reports` · `finance` · `library` · `certificates` · `settings`.
**Baked default tab** (= first `[data-tab]` in DOM order): families `directory` · students `directory` · perf `overview` ·
reports `overview` · finance `overview` · **library `materials`** · certificates `templates` · **settings `general`**.
The two bold rows are why an *unseeded* deep-link test is not discriminating (§7).

---

## 2. The register — 22 routes

`data-tabpanel` existence verified by grep against the BUILT pages in `public/` (AR file and `.en` file), not from
source. Every row: **panel exists AR = yes / EN = yes**.

### 2.1 Families category (3)

| # | nav id | href (AR) | href (EN) | target page | tab id | AR destination | EN destination | panel AR/EN |
|---|---|---|---|---|---|---|---|---|
| 1 | `familyCategories` | `families.html#view=categories` | `families.en.html#view=categories` | `families` | `categories` | «فئات العائلات» → tab «الفئات» | "Family categories" → tab "Categories" | yes / yes |
| 2 | `studentResult` | `students.html#view=results` | `students.en.html#view=results` | `students` | `results` | «نتائج الطلاب» → tab «نتائج الطلاب» | "Student results" → tab "Student Results" | yes / yes |
| 3 | `studentEvaluation` | `students.html#view=evaluation` | `students.en.html#view=evaluation` | `students` | `evaluation` | «تقييم الطلاب» → tab «تقييم الطلاب» | "Student evaluation" → tab "Student Evaluation" | yes / yes |

### 2.2 Teachers category → `cat.teachersPerf` section (2)

| # | nav id | href (AR) | href (EN) | target page | tab id | AR destination | EN destination | panel AR/EN |
|---|---|---|---|---|---|---|---|---|
| 4 | `sessionsKpi` | `teacher-performance.html#view=sessions-kpi` | `teacher-performance.en.html#view=sessions-kpi` | `teacher-performance` | `sessions-kpi` | «مؤشر أداء الحصص» → tab «مؤشر أداء الحصص» | "Sessions performance" → tab "Sessions KPI" | yes / yes |
| 5 | `monthlyPerf` | `teacher-performance.html#view=monthly` | `teacher-performance.en.html#view=monthly` | `teacher-performance` | `monthly` | «الأداء الشهري» → tab «الأداء الشهري» | "Monthly performance" → tab "Monthly performance" | yes / yes |

### 2.3 Reports category (2)

| # | nav id | href (AR) | href (EN) | target page | tab id | AR destination | EN destination | panel AR/EN |
|---|---|---|---|---|---|---|---|---|
| 6 | `monthlyReports` | `reports.html#view=monthly` | `reports.en.html#view=monthly` | `reports` | `monthly` | «التقارير الشهرية» → tab «التقارير الشهرية» | "Monthly reports" → tab "Monthly Reports" | yes / yes |
| 7 | `dataAnalysis` | `reports.html#view=analysis` | `reports.en.html#view=analysis` | `reports` | `analysis` | «تحليل البيانات» → tab «تحليل البيانات» | "Data analysis" → tab "Data Analysis" | yes / yes |

### 2.4 Reports category → `cat.finance` section (6)

| # | nav id | href (AR) | href (EN) | target page | tab id | AR destination | EN destination | panel AR/EN |
|---|---|---|---|---|---|---|---|---|
| 8 | `invoices` | `finance.html#view=invoices` | `finance.en.html#view=invoices` | `finance` | `invoices` | «الفواتير» → tab «الفواتير» | "Invoices" → tab "Invoices" | yes / yes |
| 9 | `monthlyInvoices` | `finance.html#view=monthly-invoices` | `finance.en.html#view=monthly-invoices` | `finance` | `monthly-invoices` | «الفواتير الشهرية» → tab «الفواتير الشهرية» | "Monthly invoices" → tab "Monthly Invoices" | yes / yes |
| 10 | `salaries` | `finance.html#view=salaries` | `finance.en.html#view=salaries` | `finance` | `salaries` | «الرواتب» → tab «الرواتب» (figure-free board) | "Salaries" → tab "Salaries" | yes / yes |
| 11 | `staffSalaries` | `finance.html#view=salaries` | `finance.en.html#view=salaries` | `finance` | `salaries` | «رواتب الموظفين» → the **staff board inside** tab «الرواتب» | "Staff salaries" → the staff board inside tab "Salaries" | yes / yes |
| 12 | `payments` | `finance.html#view=payments` | `finance.en.html#view=payments` | `finance` | `payments` | «المدفوعات» → tab «المدفوعات» | "Payments" → tab "Payments" | yes / yes |
| 13 | `banks` | `finance.html#view=banks` | `finance.en.html#view=banks` | `finance` | `banks` | «البنوك» → tab «البنوك» (name+status, no balance) | "Banks" → tab "Banks" | yes / yes |

> The 7th finance-section item, **`classSalaryReport`**, is the product's **ONE honest lock**: `status:'disabled'`,
> `reasonKey:'nav.reason.finance'`, **no `route` at all** → it is *not* a deep-link and never appears in this register.
> It renders as a non-anchor `<button aria-disabled="true" data-disabled-reason data-reason-key="nav.reason.finance">`
> with `#i-lock`. Freezing it unchanged is part of Spec 041's contract.

### 2.5 Admin category (3)

| # | nav id | href (AR) | href (EN) | target page | tab id | AR destination | EN destination | panel AR/EN |
|---|---|---|---|---|---|---|---|---|
| 14 | `materials` | `library.html#view=materials` | `library.en.html#view=materials` | `library` | `materials` | «المواد التعليمية» → tab «المواد» | "Materials" → tab "Materials" | yes / yes |
| 15 | `books` | `library.html#view=books` | `library.en.html#view=books` | `library` | `books` | «المكتبة» → tab «الكتب والمكتبة» | "Library" → tab "Books & Library" | yes / yes |
| 16 | `certificateRequests` | `certificates.html#view=requests` | `certificates.en.html#view=requests` | `certificates` | `requests` | «طلبات الشهادات» → tab «الطلبات» | "Certificate requests" → tab "Requests" | yes / yes |

> `books` was **refined** by Spec 039 from bare `library.html` (which silently landed on the *Materials* default tab)
> to an explicit `#view=books`. That refinement is exactly the pattern the two teachers fold-anchors still lack (§6).

### 2.6 Settings category (6) — Spec 040, the last planned items in the product

| # | nav id | href (AR) | href (EN) | target page | tab id | AR destination | EN destination | panel AR/EN |
|---|---|---|---|---|---|---|---|---|
| 17 | `settingsGeneral` | `settings.html#view=general` | `settings.en.html#view=general` | `settings` | `general` | «عام» → tab «عام» | "General" → tab "General" | yes / yes |
| 18 | `settingsIntegrations` | `settings.html#view=integrations` | `settings.en.html#view=integrations` | `settings` | `integrations` | «التكاملات» → tab «التكاملات» | "Integrations" → tab "Integrations" | yes / yes |
| 19 | `settingsCustomization` | `settings.html#view=customization` | `settings.en.html#view=customization` | `settings` | `customization` | «التخصيص» → tab «التخصيص» | "Customization" → tab "Customization" | yes / yes |
| 20 | `settingsNotifications` | `settings.html#view=notifications` | `settings.en.html#view=notifications` | `settings` | `notifications` | «الإشعارات» → tab «الإشعارات» | "Notifications" → tab "Notifications" | yes / yes |
| 21 | `settingsSecurity` | `settings.html#view=security` | `settings.en.html#view=security` | `settings` | `security` | «الأمان» → tab «الأمان» | "Security" → tab "Security" | yes / yes |
| 22 | `settingsUsers` | `settings.html#view=users` | `settings.en.html#view=users` | `settings` | `users` | «المستخدمون والموظفون» → tab «المستخدمون» | "Users & staff" → tab "Users" | yes / yes |

> **Spelling trap, frozen deliberately** (`nav.config.js` comment, Spec 040): the tab id is US `customization`; the
> LEGACY route was UK `/settings/customisation/`. A `#view=customisation` hash would be a **silent** dead deep-link —
> `initTabs` finds no `[data-tab]`, falls through to the stored view / baked default, and the page *looks fine*.
> The link-integrity crawl cannot see it either (§7, hole (a)). This is the single highest-value reason Spec 041 must
> specify a **derived** hash→`[data-tab]` resolution assert.

---

## 3. Uniform behaviour contract (identical for all 22 rows)

| Property | Frozen behaviour | Evidence |
|---|---|---|
| **Fresh-load behaviour** | A cold navigation to `<page>.html#view=<tab>` runs `initTabs()` once on load; it reads the hash, confirms `[data-tab="<tab>"]` exists in the group, and calls `selectTab(group, tab, {persist:false})` → **exactly one visible `[data-tabpanel]`, the target**. All other panels stay `hidden`. Zero network requests. | `enhance.js:261-273`; the built pages bake **all** panels, so the page is complete before JS. |
| **Hash vs. localStorage precedence** | **Hash WINS.** Order is `hash → localStorage['academy.schedView.<group>'] → baked first tab`. A user who last clicked *Banks* and then clicks the sidebar's *Invoices* deep-link gets **Invoices**, not Banks. | `enhance.js:266-271` — `want` is set from `hashView` first; the `localStorage` read is inside `if (!want)`. |
| **Stored-view side effect on arrival** | **None.** Deep-link arrival uses `persist:false` → no `localStorage` write, no `replaceState`. The user's last *clicked* tab survives the visit. | `enhance.js:272`. |
| **Refresh preservation** | **Preserved, always.** (a) Arrived by deep-link → the hash is already in the address bar → F5 re-runs `initTabs` on the same hash. (b) Arrived by clicking a tab → `selectTab(persist:true)` did `history.replaceState('#view='+id)` **and** wrote the stored view → F5 is preserved twice over. | `enhance.js:256-259`. |
| **AR/EN hash preservation (sidebar)** | **Preserved byte-identically.** `langRoute()` splits the route at `#`, rewrites only the file part to `.en.html`, and re-appends the fragment. Facts: **AR/EN nav route parity = 0 failures** across all 115 pages. | `sidebar.js:18-26`. |
| **Link-integrity safety** | The smoke crawl strips the fragment before the `VALID_FILES` lookup (`run.cjs:1814` `const file = h.split('#')[0];`), so all 22 hrefs validate as their plain file → `deadHash = 0`, `badTarget = 0` hold byte-verbatim. | `tests/smoke/run.cjs:1805-1823`. |
| **Active-state owner** | **Two owners, deliberately split.** (1) *In-page tab* active state (`is-active`, `aria-selected`, roving `tabindex`, panel `hidden`) is owned by `enhance.js selectTab()`. (2) *Sidebar pill* (`is-active` + `aria-current="page"`) is owned by the **page's baked `activeId`** from `build-html.mjs PAGES[]`, never by the hash. See §5. | `sidebar.js:30-48`; `build-html.mjs:94-131`. |
| **No new hook / key** | All 22 ride the CLOSED `data-tabs` / `data-tab` / `data-tabpanel` hook set and the single pre-existing storage key `academy.schedView.<group>`. Spec 041 adds none. | — |

---

## 4. The ONE intentional shared destination — `salaries` + `staffSalaries`

| | |
|---|---|
| Items | `salaries` («الرواتب» / "Salaries") and `staffSalaries` («رواتب الموظفين» / "Staff salaries") |
| Shared route | `finance.html#view=salaries` (AR) · `finance.en.html#view=salaries` (EN) — **byte-identical strings** |
| Origin | Spec 038 (Finance Nav Completion), declared in its nav-completion contract |
| Verdict | **LEGITIMATE — frozen as-is.** |

**Why it is legitimate (and not a `teachers.html` repeat):** the `salaries` tab is a single surface that *renders both
boards* — the teacher salary board and the staff salary board, one under the other, both **figure-free** (name + status +
period; **zero pay amount**, per the teacher pay-free and finance no-fake-money laws). Two nav items therefore resolve to
**one honest, complete destination that literally contains both of their subjects**. Nothing is hidden behind a second
click; nothing is promised that the tab does not show. Splitting them would require either (a) inventing a second tab
that duplicates half of an existing one, or (b) computing a per-staff payroll figure — which the standing laws forbid.

**Contrast with D-1** (`teachers` + `addTeacher` + `teacherCategories` → bare `teachers.html`, no hash): there the second
and third items promise a *form* and a *category CRUD board* and deliver the **directory**; the promised surfaces exist
only behind an on-page header button (`trn-add` / `trn-categories` drawers, opened only via `data-drawer` — `enhance.js`
handles `#view=` and `#step=` **only**, there is no drawer-hash mechanism). Shared destination ≠ misleading destination.
`salaries`/`staffSalaries` is the former; the teachers trio is the latter, and is the audit's one genuine route defect.

**Freeze note**: this shared destination MUST be recorded so no future spec "fixes" it as an accidental duplicate. The
smoke suite already pins it: `nav010.finLinks` is asserted equal to
`['finance','invoices','monthlyInvoices','salaries','staffSalaries','payments','banks']` (`run.cjs:1786`), i.e. **both**
ids are expected to be implemented links.

---

## 5. Active-state owner — the recorded, accepted consequence

The sidebar pill follows the **landing page**, not the deep-link item:

| Deep-link item(s) | Lands on | Page `activeId` (build-html) | Sidebar pill lights up | Category panel opens to |
|---|---|---|---|---|
| `familyCategories` | `families.html` | `families` | **`families`** | families ✅ |
| `studentResult`, `studentEvaluation` | `students.html` | `students` | **`students`** | families ✅ |
| `sessionsKpi`, `monthlyPerf` | `teacher-performance.html` | `teacherKpi` | **`teacherKpi`** | teachers ✅ |
| `monthlyReports`, `dataAnalysis` | `reports.html` | `reports` | **`reports`** | reports ✅ |
| `invoices`…`banks` (6) | `finance.html` | `finance` | **`finance`** | reports ✅ |
| `materials`, `books` | `library.html` | `books` | **`books`** | admin ✅ |
| `certificateRequests` | `certificates.html` | `certificates` | **`certificates`** | admin ✅ |
| settings ×6 | `settings.html` | `settings` | **`settings`** | settings ✅ |

**Consequence**: clicking «المواد التعليمية» (materials) opens the Materials tab correctly but highlights «المكتبة»
(books) in the rail. **Assessment: not a defect, and not fixable within the freeze.** The active pill is a *page*
indicator baked at build time; the hash is a *client-side* view selector. Making the pill hash-aware would require a new
runtime nav-state hook (forbidden: closed `data-*` hook set) or per-hash page variants (forbidden: page count 115).
Every deep-link item at least lands the user in its **own category panel** (right-hand column above: all ✅), so the rail
never opens to the wrong section. Spec 041 **records this explicitly** so it is never re-discovered as a bug.

---

## 6. Adjacent facts this register must carry forward (not fixed here)

- **D-1 (the one real route defect)**: `teachers` · `addTeacher` · `teacherCategories` all carry the byte-identical
  route string `'teachers.html'` with **no hash** — the only nav items in the product whose route does not resolve to
  their own distinct surface. They are **not** deep-links and are **not** in this register; they are the register's
  negative space. Legacy had 3 (arguably 4) genuinely distinct teacher-domain sidebar destinations
  (`/management/teachers`, `/management/teachers/create` — a 57-field form page, `/management/teacher-categories` — its
  own CRUD page with 3 child routes). The honest remedies live in Spec 041's defect register, not here.
- **`finance-analysis`**: absent from `nav.config.js` and from all 115 built pages — correctly never invented. Not a
  deep-link; nothing to freeze.
- **One tabs-widget per page**: `initTabs` applies the single parsed `hashView` to **every** `[data-tabs]` wrapper on the
  page (`enhance.js:265-271`). No current page has two tab groups, so there is no live bug — and no test asserts there
  never will be. A future two-group page could cross-activate. Recommended one-line guard, in Spec 041's additive block:
  assert `document.querySelectorAll('[data-tabs]').length <= 1` on every admin page.

> **RESOLVED BY THE PLAN ROUND (Q-6 / E-04 / R-18) — this either/or is CLOSED, do not re-open it.** The plan adopts the **group-aware** option and **REJECTS** the `[data-tabs] <= 1 per admin page` rule (it would legislate away a legitimate future multi-group page for no honesty gain). The shipped guard is: every deep-link assertion is scoped `[data-tabs="<group>"] [data-tabpanel="<view>"]`, plus detector **X-9** — *no two `[data-tabs]` groups on one page may declare the same tab id*. See `derived-route-matrix-contract.md` §0/§5 (X-9) and `plan.md` §9 T-07. This is a **refinement, not a supersession**: the one-widget guard was a specify-phase proposal, never shipped code.


---

## 7. Fresh-context smoke coverage — what exists, and the gap Spec 041 must close

All 22 deep-links **do** have a fresh-context load test (`tests/smoke/run.cjs`, five blocks after the per-page loop, each
opening a brand-new `browser.newContext()` per view — a hash-only re-`goto` on the same document would not re-run
`initTabs`). So "which are untested" = **none**. But the tests split into two classes and **only one is discriminating**:

### 7.1 SEEDED (discriminating) — **9 of 22** ✅

The context pre-writes `localStorage['academy.schedView.<group>']` to a **different** view via `ctx.addInitScript`, so
the assertion proves the URL hash **BEATS a conflicting stored view** — exactly the production state a real user creates
(clicking a tab persists it, `enhance.js:257`).

| Block | run.cjs | Seed map | Deep-links covered |
|---|---|---|---|
| `SP039_DEEPLINKS` | `2404-2439` | library `{materials↔books}`, certificates `{requests→templates}` | **#14 `materials`, #15 `books`, #16 `certificateRequests`** |
| `SP040_VIEWS` | `2441-2472` | settings: general↔integrations, notifications→general, customization→security, security→users, users→notifications, integrations→customization (6 views × 2 langs = 12 runs) | **#17–#22 `settings*` ×6** |

Failure message (verbatim, `run.cjs:2433`): *"nav deep-link #view=${view} did not open the ${view} tab (active=${r.active}; the URL hash must beat the stored view '${other}')"*.

### 7.2 UNSEEDED (non-discriminating) — **13 of 22** ❌ ← **the gap**

Fresh context, **empty localStorage**. These prove only *"hash beats the baked default"*. A regression that reordered
`initTabs` to **`stored || hash`** precedence would pass **all 13** and be caught only by the 9 seeded ones.

| Block | run.cjs | Deep-links covered (unseeded) |
|---|---|---|
| Spec-036 block | `2273-2300` | **#4 `sessionsKpi`, #5 `monthlyPerf`** (`teacher-performance`, group `perf`) |
| `SP037_DEEPLINKS` | `2302-2335` | **#6 `monthlyReports`, #7 `dataAnalysis`** (reports) · **#1 `familyCategories`** (families) · **#2 `studentResult`, #3 `studentEvaluation`** (students) |
| Spec-038 finance block | `2337-2362` | **#8 `invoices`, #9 `monthlyInvoices`, #10 `salaries`, #11 `staffSalaries` (shared target), #12 `payments`, #13 `banks`** (+ `overview`, not a nav route) |

> (`run.cjs:2244-2271` also fresh-loads `student.html#view=results|evaluation` — that is the per-student **body**
> drill-down, **not** one of the 22 nav routes. It is listed here only so it is not miscounted as coverage.)

### 7.3 Two structural holes behind the gap

**(a) The link-integrity crawl never validates a `#view=` fragment.** `run.cjs:1814` — `const file = h.split('#')[0];`
The fragment is **thrown away** before the `VALID_FILES` lookup. `badTarget` proves the *file* exists and says nothing
about the *tab id*. A typo (`#view=customisation`, `#view=monthly-invoice`, a renamed tab) is **invisible** to
`deadHash`/`badTarget` and is caught only if some hand-written per-spec block happens to name that view.

**(b) No derived matrix — the deep-link tests are hand-maintained literals.** `SP037_DEEPLINKS`, `SP039_DEEPLINKS`,
`SP040_VIEWS` and the finance view array are **hard-coded**; nothing iterates `NAV_CATEGORIES`. The `nav.config` SOURCE
audit (`run.cjs:2512-2555`) pins route **strings** for only **9 of 22** (`materials`, `books`, `certificateRequests` +
`settings*` ×6) — the 13 pre-040 routes are asserted in rendered-DOM form only. **A 23rd deep-link added tomorrow gets
ZERO automatic coverage.**

### 7.4 Spec 041's main additive coverage (specification, not implementation)

Additive smoke block only — **no protected assert edited, no supersession required**:

1. **Derive** the deep-link matrix from `NAV_CATEGORIES` (flattened incl. `sections`): every item whose `route` contains
   `#view=` yields `{ id, file, view }`. **Assert the derived count is exactly 22** (so a 23rd link cannot be added
   without the register being updated). *(If `/speckit.plan` adopts D-1 **Option A**, this frozen figure becomes the
   declared **24** — `addTeacher` and `teacherCategories` gain `#view=` fragments; plain routes fall 27 → 25; the
   routed total stays 49 and the menu stays 50. A **re-classification**, declared once, per `count-and-freeze-contract.md`
   §5. Any other change to the figure is a supersession.)*
2. For each derived row × **both languages**, in a **FRESH context** with `localStorage['academy.schedView.<group>']`
   **pre-seeded to a different existing view of that group**: load `<file>[.en].html#view=<view>` and assert
   **exactly one visible `[data-tabpanel]`** and that it is `<view>` — i.e. **the hash beat the stored view**.
   This upgrades the 13 unseeded rows to discriminating and makes the 9 seeded rows derived rather than literal.
3. **Static hash-resolution assert** (closes hole (a)): for each derived row, the target built page must contain
   `[data-tab="<view>"]` **and** `[data-tabpanel="<view>"]` in **both** languages → **0 dead `#view=` hashes**, by
   construction, forever.
4. **One-tabs-widget guard** (§6): `[data-tabs]` count ≤ 1 per admin page.
5. Record `salaries` + `staffSalaries` → `finance.html#view=salaries` as the **sanctioned shared destination** (the
   derived matrix must tolerate a repeated `{file, view}` pair, and must assert it is the **only** one).

**Thinnest existing non-smoke coverage** (for reference, if 041 sets a per-view matrix floor): `settingsUsers`
(`#view=users`) has exactly **one** a11y row (`tests/a11y/run.cjs:209`, en/light/desktop) and exactly **one** screenshot
frame (`tests/screenshots/capture.cjs:429`, ar/light/desktop). Every other deep-link view has ≥ 2 in each suite.

---

## 8. Observation logged during this audit (not a freeze change)

**O-1 — the topbar language toggle drops the `#view=` fragment.** `src/js/enhance.js:237-241` `langUrl()` rebuilds the
target from `location.pathname` only and returns `` `${base}.en.html` `` — **no `location.hash`**. It is invoked at
`enhance.js:553` on `data-set-lang`. Consequence: a user who arrives via a deep-link (e.g. `finance.html#view=banks`,
which by design does **not** persist the view — `persist:false`) and then switches language lands on
`finance.en.html` at the **baked default tab** (`overview`), not on Banks. The *sidebar* AR/EN parity is intact (§3,
`langRoute` preserves the hash, 0 failures) — this is a different mechanism (the topbar toggle).
**Not fixed in 041**: it is an `enhance.js` behaviour change, outside a route/sidebar freeze's impact boundary
(`enhance.js` is on the 0-diff wall). Recorded here with exact evidence. **Recommended owner: Spec 044** — the
interaction/system slot that owns `enhance.js` behaviour (FO-23); **057** (the final parity freeze) is the fallback
only if 044 declines it. Per `spec.md` FR-023 / Q-4, the **single owner is named in `/speckit.plan`** — this register
recommends, it does not assign — and per the roadmap-provenance caveat, 044/057 are **recorded maintainer-amendment
slots**, not chartered specs.
