# Spec 041 — Deep-Link Discrimination Contract (FR-012 · FR-013 · SC-08)

**Baseline**: HEAD `21502af` (Spec 040 committed · PR #13 merged · main merge `13d38af`) · 115 HTML · admin menu 50
(implemented 49 · disabled 1 · planned 0) · `FUTURE_ROUTES = {}` · **22 deep-link routes** today, **24 after D-1**.
**Scope of this file**: what a deep-link test must PROVE, why 13 of the 22 current ones prove nothing about
precedence, and the exact, derived, seeded, group-aware recipe that closes the gap for all 24.
**Decided upstream, not re-opened here**: D-1 = Option A (the MOVE architecture — `teachers.html` gains
`tabs({group:'teachers'})` with `directory` (baked default) · `add` · `categories`; the `trn-add` and `trn-categories`
drawers are REMOVED from `teachers.html`) · D-2 = Option A (gallery orphan frozen) · D-3 = the one-line `langUrl` fix.
**Companions**: `deep-link-register.md` (the 22-route register + §7 gap) · `mutation-test-register.md` (M-2, M-5) ·
`protected-test-register.md` (S1–S5) · `route-inventory-contract.md` (FR-009 committed route table) ·
`impact-boundary.md` (the 0-diff wall).
**Roadmap provenance**: Specs 042–057 referenced anywhere below are a **maintainer-directed, append-only amendment**,
not chartered specs. Only 041 is chartered.

---

## 1. What a deep-link must prove (the four-part claim)

A nav deep-link `<page>[.en].html#view=<tab>` is an honest route only if **all four** hold. Today's tests prove #1 and
#2 for all 22; they prove **#3 for only 9**, and **#4 for none by construction** (hand-written literals).

| # | Claim | Layer | Proven today? |
|---|---|---|---|
| **C1 — Resolution** | The hash resolves to a **real** `[data-tab="<view>"]` **and** a real `[data-tabpanel="<view>"]`, inside a real `[data-tabs="<group>"]`, in the **built** AR page **and** the built EN page. | static (DOM of `public/*.html`) | Only incidentally — the link crawl **throws the fragment away** (`run.cjs:1814` `const file = h.split('#')[0];`), so `deadHash`/`badTarget` say nothing about the tab id. A renamed/typo'd view (`#view=customisation`) is **invisible**. |
| **C2 — Fresh-context arrival** | Loading the URL cold (new browser context, one `goto`, no same-document hash change) leaves **exactly one visible `[data-tabpanel]` inside that group**, and it is `<view>`. | runtime | Yes — 22/22 (5 hand-written blocks). |
| **C3 — Precedence (the discriminator)** | With `localStorage['academy.schedView.<group>']` **pre-seeded to a DIFFERENT existing view of that group**, the **URL hash still wins**. This is the production state a real user creates: clicking any tab persists it (`enhance.js:257`). | runtime | **9/22 only.** 13 run against an EMPTY store → they prove only "hash beats the baked default". |
| **C4 — Completeness** | The matrix is **derived from `NAV_CATEGORIES`**, so a 25th deep-link cannot enter the product with zero coverage, and the count is frozen. | derivation | **No.** `SP037_DEEPLINKS`, `SP039_DEEPLINKS`, `SP040_VIEWS` and the finance view array are hard-coded literals. |

### 1.1 The engine the claims rest on (`enhance.js:242-273`, verbatim behaviour)

```
initTabs():  hashView = (location.hash.match(/view=([a-z0-9-]+)/i) || [])[1]
             per [data-tabs] wrap:  want = hashView (if that wrap HAS the tab)
                                    else localStorage['academy.schedView.' + group] (if the wrap HAS it)
                                    else the baked first [data-tab]
             selectTab(group, want, { persist: false })      ← a deep-link arrival never writes the store
selectTab(): persist:true (a real click) writes localStorage['academy.schedView.'+group] AND
             history.replaceState(null,'','#view='+id)
```
Precedence is therefore **hash → stored → baked default**. There is **no `hashchange` listener**: a same-document hash
change does **not** switch a tab. Every test MUST be a cold `goto`, never a hash-only re-`goto`.

### 1.2 Why C3 is the only claim that can catch the regression that matters

The single most plausible regression in this engine is one character of re-ordering:

```js
// today (correct)                      // the regression
let want = hashView && has(hashView)    let want = null;
  ? hashView : null;                    try { const s = localStorage.getItem(KEY+group); if (has(s)) want = s; } catch {}
if (!want) { …stored… }                 if (!want && has(hashView)) want = hashView;
```
i.e. **`stored || hash`** instead of **`hash || stored`**. Against an **empty** localStorage the two are
**indistinguishable** — the stored read returns `null`, the hash is used, the panel opens, the test is green.
**All 13 unseeded rows pass this mutation.** Only the 9 seeded rows (library ×2, certificates ×1, settings ×6) fail it.
That is the whole argument for FR-012: 13 of the 22 production deep-links are, against the regression they exist to
prevent, **vacuous**.

### 1.3 The second vacuity: deep-links onto the baked default tab

Two of the 22 target their group's **first baked** `[data-tab]`:

| Deep-link | Group | Baked first tab | Unseeded, it passes… |
|---|---|---|---|
| `materials` → `library.html#view=materials` | `library` | **`materials`** | …**with JavaScript disabled.** The panel is already the visible one in the shipped HTML. |
| `settingsGeneral` → `settings.html#view=general` | `settings` | **`general`** | …**with JavaScript disabled.** |

Both are (correctly) already seeded — `library` seeds `books`, `settings` seeds `integrations` — which is precisely how
they became non-vacuous. After D-1 the teachers group's baked default is `directory`, and the **plain** `teachers.html`
route carries no hash, so **no new baked-default deep-link is introduced** (`#view=add`, `#view=categories` are both
non-default). Post-041 the baked-default deep-link set stays exactly `{materials, settingsGeneral}`.

---

## 2. Honest state of the art — 9 seeded / 13 unseeded (audited at `21502af`)

### 2.1 SEEDED — discriminating — **9 of 22** ✅

| Block | `tests/smoke/run.cjs` | Group | Seed map (`view → seeded other`) | Deep-links |
|---|---|---|---|---|
| `SP039_DEEPLINKS` | `2404-2439` | `library` | `materials → books` · `books → materials` | `materials`, `books` |
| `SP039_DEEPLINKS` | `2404-2439` | `certificates` | `requests → templates` | `certificateRequests` |
| `SP040_VIEWS` | `2441-2472` | `settings` | `general → integrations` · `notifications → general` · `customization → security` · `security → users` · `users → notifications` · `integrations → customization` | `settingsGeneral`, `settingsNotifications`, `settingsCustomization`, `settingsSecurity`, `settingsUsers`, `settingsIntegrations` |

Seeding mechanism already in the repo (`run.cjs:2422`, `run.cjs:2453`) — **`ctx.addInitScript`**, before any load:
```js
await ctx.addInitScript(([g, o]) => {
  try { localStorage.setItem('academy.schedView.' + g, o); } catch (e) { /* ignore */ }
}, [group, other]);
```
Failure message already in the repo (`run.cjs:2433`), which is the model for the new block:
> `nav deep-link #view=${view} did not open the ${view} tab (active=${r.active}; the URL hash must beat the stored view '${other}')`

### 2.2 UNSEEDED — **non-discriminating** — **13 of 22** ❌ (the FR-012 gap)

| Block | `run.cjs` | Group | Views loaded (empty localStorage) | Deep-links left non-discriminating |
|---|---|---|---|---|
| Spec-036 | `2273-2300` | `perf` | `sessions-kpi`, `monthly` | `sessionsKpi`, `monthlyPerf` |
| `SP037_DEEPLINKS` | `2302-2335` | `reports` | `monthly`, `analysis` | `monthlyReports`, `dataAnalysis` |
| `SP037_DEEPLINKS` | `2302-2335` | `families` | `categories` | `familyCategories` |
| `SP037_DEEPLINKS` | `2302-2335` | `students` | `results`, `evaluation` | `studentResult`, `studentEvaluation` |
| Spec-038 | `2337-2362` | `finance` | `overview`, `invoices`, `payments`, `monthly-invoices`, `salaries`, `banks` | `invoices`, `monthlyInvoices`, `salaries`, `staffSalaries` (shared target), `payments`, `banks` |

**13 unseeded rows** = perf 2 + reports 2 + families 1 + students 2 + finance 6 (the finance loop's 6 executions
include `overview`, which is **not** a nav route — the 6 finance nav items map to **5** distinct views because
`salaries` + `staffSalaries` share `#view=salaries`).

**Adjacent, deliberately NOT counted as deep-link coverage**: `run.cjs:2244-2271` cold-loads
`student.html#view=results|evaluation` (group `student`). That is the **per-student body drill-down**, not one of the
22 nav routes. It is also unseeded. §6.3 records the recommendation.

---

## 3. The frozen post-D-1 matrix — 24 deep-links, 23 distinct destinations, 9 groups

Derived from `src/js/nav.config.js` (flatten `NAV_CATEGORIES` **including `sections`**; keep every item whose `route`
contains `#view=`). Tab ids and DOM order read from the **built** pages at `21502af`; the `teachers` group is the D-1
addition.

**Seed rule (deterministic, derived — do NOT hand-maintain a literal seed map):**
> `seed = groupTabs[(indexOf(view) + 1) % groupTabs.length]`, where `groupTabs` = the `[data-tab]` ids of that
> `[data-tabs="<group>"]` wrap **in DOM order**. Every group has ≥ 2 tabs ⇒ `seed !== view` always. Assert
> `seed !== view` at runtime (a one-tab group would silently make the test vacuous again).

| # | nav id | route (AR) | page | group | tab ids in DOM order (baked default **bold**) | view | **derived seed** | today |
|---|---|---|---|---|---|---|---|---|
| 1 | `familyCategories` | `families.html#view=categories` | families | `families` | **directory**, categories | `categories` | `directory` | unseeded |
| 2 | `studentResult` | `students.html#view=results` | students | `students` | **directory**, results, evaluation | `results` | `evaluation` | unseeded |
| 3 | `studentEvaluation` | `students.html#view=evaluation` | students | `students` | **directory**, results, evaluation | `evaluation` | `directory` | unseeded |
| 4 | **`addTeacher`** *(D-1 NEW)* | `teachers.html#view=add` | teachers | `teachers` | **directory**, add, categories | `add` | `categories` | — (new) |
| 5 | **`teacherCategories`** *(D-1 NEW)* | `teachers.html#view=categories` | teachers | `teachers` | **directory**, add, categories | `categories` | `directory` | — (new) |
| 6 | `sessionsKpi` | `teacher-performance.html#view=sessions-kpi` | teacher-performance | `perf` | **overview**, sessions-kpi, monthly | `sessions-kpi` | `monthly` | unseeded |
| 7 | `monthlyPerf` | `teacher-performance.html#view=monthly` | teacher-performance | `perf` | **overview**, sessions-kpi, monthly | `monthly` | `overview` | unseeded |
| 8 | `monthlyReports` | `reports.html#view=monthly` | reports | `reports` | **overview**, monthly, analysis | `monthly` | `analysis` | unseeded |
| 9 | `dataAnalysis` | `reports.html#view=analysis` | reports | `reports` | **overview**, monthly, analysis | `analysis` | `overview` | unseeded |
| 10 | `invoices` | `finance.html#view=invoices` | finance | `finance` | **overview**, invoices, payments, monthly-invoices, salaries, banks | `invoices` | `payments` | unseeded |
| 11 | `monthlyInvoices` | `finance.html#view=monthly-invoices` | finance | `finance` | (as above) | `monthly-invoices` | `salaries` | unseeded |
| 12 | `salaries` | `finance.html#view=salaries` | finance | `finance` | (as above) | `salaries` | `banks` | unseeded |
| 13 | `staffSalaries` | `finance.html#view=salaries` | finance | `finance` | (as above) | `salaries` *(shared — S-1)* | `banks` | unseeded |
| 14 | `payments` | `finance.html#view=payments` | finance | `finance` | (as above) | `payments` | `monthly-invoices` | unseeded |
| 15 | `banks` | `finance.html#view=banks` | finance | `finance` | (as above) | `banks` | `overview` | unseeded |
| 16 | `materials` | `library.html#view=materials` | library | `library` | **materials**, books | `materials` | `books` | **seeded** |
| 17 | `books` | `library.html#view=books` | library | `library` | **materials**, books | `books` | `materials` | **seeded** |
| 18 | `certificateRequests` | `certificates.html#view=requests` | certificates | `certificates` | **templates**, requests | `requests` | `templates` | **seeded** |
| 19 | `settingsGeneral` | `settings.html#view=general` | settings | `settings` | **general**, notifications, customization, security, users, integrations | `general` | `notifications` | **seeded** |
| 20 | `settingsNotifications` | `settings.html#view=notifications` | settings | `settings` | (as above) | `notifications` | `customization` | **seeded** |
| 21 | `settingsCustomization` | `settings.html#view=customization` | settings | `settings` | (as above) | `customization` | `security` | **seeded** |
| 22 | `settingsSecurity` | `settings.html#view=security` | settings | `settings` | (as above) | `security` | `users` | **seeded** |
| 23 | `settingsUsers` | `settings.html#view=users` | settings | `settings` | (as above) | `users` | `integrations` | **seeded** |
| 24 | `settingsIntegrations` | `settings.html#view=integrations` | settings | `settings` | (as above) | `integrations` | `general` *(wrap)* | **seeded** |

**Frozen figures.** deep-links **24** · distinct `{file, view}` destinations **23** · shared destinations **exactly 1**
(`finance.html#view=salaries`, rows 12+13 — **S-1 / FR-024**: registered, sanctioned, must NOT be "fixed" as a
duplicate) · groups **9** (`families`, `students`, **`teachers`**, `perf`, `reports`, `finance`, `library`,
`certificates`, `settings`) · baked-default deep-links **2** (`materials`, `settingsGeneral`) · plain routes **25** ·
route-less lock **1** (`classSalaryReport`) · menu **50** (24 + 25 + 1).

> The derived seed for rows 19–24 differs from the hand-written `SP040_VIEWS` literal map (e.g. `general → notifications`
> here vs `general → integrations` there). Both satisfy C3 — "a *different* existing view of that group". The derived
> rule is preferred because it survives a tab being added/renamed without a literal edit. Recorded so the divergence is
> not later read as a contradiction.

---

## 4. The contract — five binding requirements

### DL-1 (C4 · FR-013) — Derive, count, and freeze
Flatten `NAV_CATEGORIES` (including `sections`) at test time; collect every item with `#view=` in its `route` as
`{ id, file, view }`. **Assert the derived count is exactly 24.** Assert exactly **23** distinct `{file, view}` pairs
and that the single repeat is `{finance, salaries}` (S-1). Cross-check the derived set, **row for row**, against the
**committed** expected-route table in `route-inventory-contract.md` (FR-009 / Q-9) — a `nav.config.js` edit must not be
able to silently redefine its own expectation.

### DL-2 (C1 · FR-014) — Static hash resolution, AR **and** EN
For each derived row × `{ar, en}` file: the **built** page must contain, **inside one `[data-tabs]` wrap**, both
`[data-tab="<view>"]` and `[data-tabpanel="<view>"]`. **0 dead `#view=` hashes, by construction, forever.** This closes
the fragment-blind crawl (`run.cjs:1814`) and is the guard that kills **M-2** (`#view=customisation`, the legacy UK
spelling — today a *silent* dead deep-link: `initTabs` finds no tab, falls through to the stored/baked view, and the
page **looks fine**). The `VALID_FILES` fragment strip **stays** (it is why `deadHash`/`badTarget` are legitimately 0);
DL-2 is additive, never a replacement.

### DL-3 (C2 + C3 · FR-012 · SC-08) — Fresh context · **pre-seeded** · AR **and** EN · group-aware
Per execution:
1. **New browser context** (`browser.newContext()`) — isolated `localStorage`; never reuse a page.
2. **`ctx.addInitScript`** writes `localStorage['academy.schedView.<group>'] = <derived seed>` **before** any document
   loads. Assert `seed !== view`.
3. **One cold `goto`** `${BASE}/${file}#view=${view}` (`waitUntil: 'networkidle'`, then the standard `220 ms` settle).
   **Never** a same-document hash re-`goto` — there is no `hashchange` listener; it would prove nothing.
4. Assert, **scoped to the owning group**:
   `[...document.querySelectorAll('[data-tabs="<group>"] [data-tabpanel]')].filter(x => !x.hidden)` has **length 1**
   and its `data-tabpanel` is `<view>` ⇒ **the URL hash beat the stored view**.
5. Assert **0 external requests** (the existing `dext` collector — the deep-link must not reach the network).
6. Failure message must name the seed, e.g. `…(active=${active}; the URL hash must beat the stored view '${seed}')`.

**Executions**: 23 distinct destinations × 2 languages = **46**. (Both rows 12/13 resolve to the same destination; DL-1
already asserts *both routes* point at it, so executing it once is complete. Executing the full 24 × 2 = 48 is
permitted and equivalent — the plan may choose; the register must state which.)

**Group-awareness is mandatory (E-04 / Q-6).** Every selector is scoped `[data-tabs="<group>"] …`. Do **NOT** impose a
permanent "one `[data-tabs]` per page" rule: `selectTab` is already group-aware and `initTabs` iterates **all** wraps.
The residual multi-group hazard is real but different — `selectTab(persist:true)` writes a **single global** `#view=`
fragment, so two groups on one page would fight over it. That is a **future page-design** constraint, recorded in
`carry-forward-register.md`, **not** a test-shape constraint. No page has two groups today; the group-aware matrix keeps
041's tests correct if one ever does.

### DL-4 — Do not weaken; do not touch protected asserts
DL-1…DL-3 ship as **ONE new additive smoke block**. The five existing deep-link loops
(`2244-2271` student · `2273-2300` perf · `2302-2335` SP037 · `2337-2362` finance · `2404-2439` SP039 ·
`2441-2472` SP040) stay **BYTE-VERBATIM**; they become a redundant subset of the new block, which is the guarantee.
**Zero supersessions arise from this contract.** (The only protected-test supersessions in Spec 041 are the five D-1
sites S1–S5 in `protected-test-register.md`; S5 — `addTeacher`/`teacherCategories` anchors must now match
`/teachers\.(en\.)?html#view=add$/` and `/#view=categories$/` — is what makes rows 4/5 above legal.)

> **Rejected alternative** (recorded, not adopted): retrofitting `addInitScript` seeds into the four unseeded legacy
> loops. It is a strict strengthening and cannot mask a defect, but it edits protected test lines for no coverage the
> new derived block does not already provide. Additive-only is chosen.

### DL-5 — The two teachers rows must be real tabs, not affordance theatre
Rows 4/5 exist **only** because D-1 moves the forms into tab panels. The new block must additionally assert, on
`teachers.html` / `teachers.en.html`:
* `#view=add` opens a panel containing the **real** add-teacher form — the `teacherFields('trnAdd', true)` controls
  (`id="f-trnAdd-…"`), the CV upload **GATE**, and **exactly one** primary `backendRequired` Save. No `type=file`, no
  `type=password`, **no pay/salary/rate/currency field** (teacher pay-free, global).
* `#view=categories` opens a panel containing the **real** categories surface — the category list, the inline create
  form (name/status/description), the assign **gate**, and **one** primary Save gate. This is the **relocation** of the
  S4 guarantee (`run.cjs:747-752`), which today asserts `[data-drawer="trn-categories"]` + `template[data-preview=
  "trn-categories"]`: the honesty guarantee is preserved verbatim in substance; **only the host changes** from a drawer
  to a tab panel.
* `[data-drawer="trn-add"]`, `[data-drawer="trn-categories"]`, `template[data-preview="trn-add"]` and
  `template[data-preview="trn-categories"]` are **absent** from `teachers.html` (the MOVE, not a duplicate — the
  `field()` `id="f-<name>"` collision on template clone is why duplication is forbidden). `trn-edit` **stays** a drawer
  on `teachers.html` and on `teacher.html` — unchanged.
* The two former header buttons are **gone**; the **tablist** is the affordance. (A header "Add" anchor
  `href="teachers.html#view=add"` clicked *from* `teachers.html` would change the hash and switch **nothing** — no
  `hashchange` listener; and a header button cannot be a tab-selector because `selectTab` requires the `[data-tab]`
  inside the `[data-tabs]` wrap.)

---

## 5. The exact seeding recipe (copy-ready shape; implementation lives in tasks, not here)

```js
// ---- Spec 041 — derived, seeded, group-aware deep-link discrimination (FR-012/FR-013/SC-08) ----
// Every nav route carrying #view= is derived from NAV_CATEGORIES (incl. sections). For each row, a FRESH
// context is pre-seeded with a DIFFERENT existing view of the SAME group, so the assertion proves the URL
// hash BEATS localStorage['academy.schedView.<group>'] — not merely "hash beats the baked default".
// Unseeded, #view=materials and #view=general would pass with JavaScript disabled.
const DEEPLINKS = deriveDeepLinks(NAV_CATEGORIES);          // [{ id, file, view }]  → assert length === 24
ok(DEEPLINKS.length === 24, `derived deep-link count must be 24, got ${DEEPLINKS.length}`);
// distinct destinations 23; the ONE sanctioned repeat is finance#view=salaries (S-1 / FR-024)

for (const lang of ['ar', 'en']) {
  for (const { file, view } of distinctDestinations(DEEPLINKS)) {   // 23 × 2 langs = 46 executions
    const html = lang === 'en' ? `${file}.en.html` : `${file}.html`;
    const { group, tabs } = tabGroupOwning(html, view);   // DL-2: from the BUILT page; throws if the
                                                          // [data-tab]/[data-tabpanel] pair is missing
    const seed = tabs[(tabs.indexOf(view) + 1) % tabs.length];      // deterministic, derived
    ok(seed !== view, `${html}#view=${view}: the seed must differ from the target view (group ${group})`);

    const ctx = await browser.newContext();                          // isolated localStorage
    await ctx.addInitScript(([g, o]) => {                            // BEFORE any document loads
      try { localStorage.setItem('academy.schedView.' + g, o); } catch (e) { /* ignore */ }
    }, [group, seed]);
    const p = await ctx.newPage();
    const dext = [];
    p.on('request', (r) => { const u = r.url(); if (!u.startsWith(BASE) && !u.startsWith('data:')) dext.push(u); });

    await p.goto(`${BASE}/${html}#view=${view}`, { waitUntil: 'networkidle' });   // ONE cold goto
    await p.waitForTimeout(220);

    const r = await p.evaluate((g) => {
      const vis = [...document.querySelectorAll(`[data-tabs="${g}"] [data-tabpanel]`)].filter((x) => !x.hidden);
      return { active: vis.length === 1 ? vis[0].getAttribute('data-tabpanel') : `n=${vis.length}`,
               stored: (() => { try { return localStorage.getItem('academy.schedView.' + g); } catch (e) { return null; } })() };
    }, group);

    ok(r.active === view,
       `${html}: nav deep-link #view=${view} did not open the ${view} tab (active=${r.active}; the URL hash must beat the stored view '${seed}')`);
    ok(r.stored === seed,
       `${html}#view=${view}: a deep-link arrival must NOT rewrite the stored view (persist:false), stored=${r.stored}, seeded=${seed}`);
    ok(dext.length === 0,
       `${html}: deep-link #view=${view} triggered external request(s) ${JSON.stringify(dext.slice(0, 2))}`);
    await ctx.close();
  }
}
```

**Recipe invariants** (each one is a way the test can silently stop discriminating — assert, don't assume):

| Invariant | Why |
|---|---|
| `addInitScript` **before** `newPage()`/`goto` | A `localStorage.setItem` after load is too late — `initTabs` runs on load. |
| Seed key is exactly `'academy.schedView.' + group` | The one pre-existing storage key (`enhance.js:244` `SCHED_VIEW_KEY`). **No new storage key** (closed-hook law). |
| Seed value ∈ that group's tab ids, `seed !== view` | `initTabs` ignores a stored id the wrap does not have (`has(stored)`), so a bogus seed silently degrades the test to the unseeded case. |
| **New context per execution** | Contexts share nothing; a reused context would carry the previous run's persisted `#view=` write. |
| **Cold `goto`**, not a hash re-`goto` | No `hashchange` listener exists. |
| Group-scoped visible-panel query | A page-wide `[data-tabpanel]:not([hidden])` query would be wrong the day a second group ships. |
| `stored === seed` after arrival | Proves `persist:false` (`enhance.js:272`) — a deep-link visit must not clobber the user's last clicked tab. This is a **new**, cheap, additive guarantee C1–C4 did not state. |

---

## 6. Cross-references, gaps deliberately left open, and non-goals

### 6.1 D-3 interlock (topbar language switch)
`enhance.js:237-241` `langUrl()` reads `location.pathname` only and **never** `location.hash`; `enhance.js:552-553`
does `location.href = langUrl(l)` ⇒ **the fragment is destroyed on every topbar language switch** (reproduced live:
`finance.html#view=banks` → EN → `finance.en.html`, hash gone, tab reverts to the baked `overview`). D-3's one-line fix
appends `location.hash`. This contract adds **one** interlock row: for **at least one** deep-link (recommended
`finance.html#view=banks`, seeded `overview`), after the D-3 fix, a **topbar** language switch must land on
`finance.en.html#view=banks` with `banks` still the single visible panel.
**Test-design trap (found live):** `settings.html` renders **TWO** `[data-set-lang]` elements — the topbar language
**menu** and the Customization tab's **real** language control. Any topbar-switch assertion MUST open
`[data-action="lang-menu"]` first and click the **menu's** `[data-set-lang]`; an unscoped selector hits the wrong
control and silently proves nothing. Full ownership and wording of the D-3 assertions live in the D-3 sections of
`spec.md` / `research.md`, not here. **Query strings are NOT preserved** — the current helper never read
`location.search`, the app is static and uses none, and preserving it would be a behaviour change beyond the minimal
fix. Recorded, not adopted.

### 6.2 Sidebar route parity is a **separate, already-correct** contract
`components/sidebar.js` `langRoute()` is hash-aware (Spec 035) and re-appends the fragment byte-identically ⇒ AR/EN nav
route parity = **0 failures** across 115 pages (`ar-en-route-parity-register.md`). Do not conflate it with the topbar
defect: **(1) sidebar route parity = CORRECT today; (2) topbar language-switch parity = DEFECTIVE today, fixed by 041.**

### 6.3 In scope of the *engine*, out of scope of the *24* (recorded, not silently dropped)
| Surface | Status | Disposition |
|---|---|---|
| `student.html#view=results` / `#view=evaluation` (group `student`, `run.cjs:2244-2271`) | body drill-down deep-links, **unseeded** | Not one of the 24 nav routes. **Recommended** (not required) to fold into the derived block's seeding via a second, body-link source list. If not adopted, record it here as a **known unseeded** pair — do not let it be miscounted as coverage. |
| `schedule.html#view=timetable` (body/quick-link anchors, e.g. `run.cjs:696`, `865`) | body link, hash-bearing | Same class as above. Presence is asserted; precedence is not. |
| `finance.html#view=overview` (`run.cjs:2337-2362` loop) | a tab, **not** a nav route | Stays covered by the byte-verbatim finance loop. It is not in the 24 and must not be counted as a deep-link. |
| `#step=` (wizard fragment, `add-family`) | a different fragment grammar | Untouched. The D-3 fix preserves it for free (it appends the whole `location.hash`). |

### 6.4 Suite floors (E-10) — do **not** multiply the matrix
Minimum **two** a11y rows and **two** screenshot frames per deep-linked view. Audit result: every deep-linked view
already meets the floor **except `settingsUsers`** (`#view=users`: one a11y row, `tests/a11y/run.cjs:209`
en/light/desktop; one frame, `tests/screenshots/capture.cjs:429` ar/light/desktop) ⇒ **one additive a11y row + one
additive frame**, plus the two new `teachers` views (`#view=add`, `#view=categories`) at the floor. Nothing else.

### 6.5 Non-goals
No new `data-*` hook · no new storage key · no new dependency · no `hashchange` listener · no change to
`components/tabs.js`, `components/sidebar.js`, `enhance.js` beyond the **one declared D-3 line** · no teacher-form
redesign or expansion · no pay/salary/rate/currency field anywhere in the teachers tabs · no fake save/success/mutation
· no `type=file` / `type=password` / `<canvas>` / PDF / `window.open` — every write in rows 4/5 stays a
`data-disabled-reason` `backendRequired` gate.

---

## 7. Acceptance (what "done" means for this contract)

| ID | Criterion | Frozen value |
|---|---|---|
| **DL-A1** | Derived deep-link count from `NAV_CATEGORIES` | **24** (≠ 24 ⇒ FAIL) |
| **DL-A2** | Distinct `{file, view}` destinations · sanctioned repeats | **23** · exactly **1** (`finance#view=salaries`, S-1) |
| **DL-A3** | Derived set ≡ the committed route table (`route-inventory-contract.md`) | row-for-row identical |
| **DL-A4** | Static resolution `[data-tab]` **and** `[data-tabpanel]`, AR **and** EN | 24/24 × 2 ⇒ **0 dead hashes** |
| **DL-A5** | Seeded fresh-context discrimination executions | **46** (23 × 2 langs), **all green**; today's equivalent = **9 of 22** routes |
| **DL-A6** | Seed validity | `seed ∈ groupTabs && seed !== view` for every execution |
| **DL-A7** | Non-clobber | `localStorage['academy.schedView.<group>'] === seed` **after** every deep-link arrival (`persist:false`) |
| **DL-A8** | External requests during deep-link arrival | **0** |
| **DL-A9** | Mutation kill (`stored \|\| hash`) | **≥ 46 failing assertions** (today: 18 — the 9 seeded × 2 langs) |
| **DL-A10** | Mutation kill (M-2: rename any tab id / typo any route hash) | caught **statically** by DL-A4, in both languages |
| **DL-A11** | Protected asserts touched by this contract | **0** (additive block only; D-1's S1–S5 are separate and declared) |
| **DL-A12** | Teachers tabs (DL-5) | `#view=add` + `#view=categories` panels carry the real forms + gates; `trn-add`/`trn-categories` drawers **absent** from `teachers.html`; `trn-edit` drawer **present** |
