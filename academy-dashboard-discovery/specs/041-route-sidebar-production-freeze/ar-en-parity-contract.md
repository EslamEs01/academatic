# Spec 041 — AR/EN Parity Contract (Consolidated)

**Status**: DECIDED (plan round). This file does not re-derive evidence; it consolidates and cross-references
`ar-en-route-parity-register.md` (P1 source) and `d3-language-hash-contract.md` (P2 source) into the single
side-by-side contract the plan and the implementer read. Where a number or code excerpt appears here, it is
copied verbatim from one of those two registers — this file introduces no new count, no new option, no new
fix design.
**Baseline**: HEAD `21502af` (Spec 040 committed; PR #13 merged; `main` merge `13d38af`; tree clean except the
041 artifacts + `.specify/feature.json`).

---

## 0. Why two contracts, not one

"AR/EN parity" names **two structurally unrelated code paths** that happen to share a symptom class (a route
that names the wrong file, or loses its fragment, when the language changes). Conflating them either hides
that P1 is already correct (and must not be touched) or hides that P2 is currently broken (and must be fixed).
041 keeps them **permanently separate**:

| | P1 — Sidebar route parity | P2 — Topbar language-switch parity |
|---|---|---|
| Surface | The admin sidebar nav (`.nav-panel`, `NAV_CATEGORIES`) — an AR page and its EN twin, each rendering its **own** set of nav anchors | The same page, before and after clicking the topbar language toggle — one page rewriting its **own** address bar |
| Mechanism | `src/js/components/sidebar.js:18-27` `langRoute(route)` | `src/js/enhance.js:237-241` `langUrl(lang)` |
| Trigger | Build/render time — every page bakes its sidebar anchors from `NAV_CATEGORIES` through `langRoute()` | Runtime — a topbar click, `enhance.js:552-553`, `location.href = langUrl(l)` |
| State at baseline (`21502af`) | **CORRECT** — 0 failures across 1,568 pairs (§1) | **DEFECTIVE** — hash silently destroyed on every switch (§2) |
| Fixed by Spec 041? | No — it is already correct; touching it is scope creep | **Yes — D-3**, a one-line narrow supersession of the `enhance.js` 0-diff wall |
| Owning register | `ar-en-route-parity-register.md` | `d3-language-hash-contract.md` |

Never merge these into one "AR/EN parity" line item in a task, a test block, or a diff-review — they have
different mechanisms, different verification methods, different baseline states, and only one of them changes
in 041.

---

## 1. Contract P1 — Sidebar route parity

### 1.1 The law

Every AR nav item's rendered `href` and its EN twin's rendered `href` must resolve to the same route target
(same file stem, same `#view=…` fragment if any), differing **only** in the `.html` → `.en.html` file suffix.
One route per nav item, two language-scoped renderings, never a divergent destination.

### 1.2 Mechanism (verbatim, `src/js/components/sidebar.js:18-27`, hash-aware since Spec 035)

```js
function langRoute(route) {
  if (getLang() !== 'en') return route;
  const hashIx = route.indexOf('#');
  const file = hashIx === -1 ? route : route.slice(0, hashIx);
  const hash = hashIx === -1 ? '' : route.slice(hashIx);
  const enFile = (file.endsWith('.html') && !file.endsWith('.en.html'))
    ? file.replace(/\.html$/, '.en.html')
    : file;
  return enFile + hash;
}
```

`nav.config.js` authors every `route` **once**, in AR/canonical form, with no `routeEn` field and no
per-language item list. Called at the single anchor-emitting site, `navItem()` (`sidebar.js:46`):
`<a href="${esc(langRoute(it.route))}" ...>`. There is no second authoring path — the EN sidebar is the same
50-item `NAV_CATEGORIES` array rendered through `langRoute()` with `getLang() === 'en'`.

### 1.3 Verification method

Non-destructive, read-only, run directly against the working tree at HEAD `21502af` (no worktree/stash):

1. Load `NAV_CATEGORIES` live via dynamic `import()`; flatten `items` + `sections[].items` → 50 items total,
   49 carry a `route`, 1 is the routeless `classSalaryReport` lock.
2. Enumerate `public/*.html`; pair each AR base with its `.en.html` twin; keep only pairs whose AR file
   contains `nav-panel` (32 admin sidebar bases).
3. For each of the 32 AR pages, regex-extract every `<a href="…" data-nav="<id>">` from the **rendered HTML**
   (catches template-layer bugs, not just authoring bugs) and look up the same `data-nav="<id>"` anchor in the
   `.en.html` twin.
4. For every `(AR href, EN href)` pair: hand-derive the expected EN href by applying the same file/hash split
   `langRoute()` uses, and assert `EN href === expected`. Independently assert the AR href never contains
   `.en.html` (AR→EN inversion) and the derived expected EN href does contain `.en.html` when the AR file part
   matched `\.html$` (EN-twin-not-transformed).

### 1.4 Verified results (HEAD `21502af`)

| Check | Result |
|---|---|
| Admin sidebar base pages checked | 32 (× 2 languages = 64 files) |
| Nav items per page (implemented, `href`-bearing) | 49 (the 50th, `classSalaryReport`, is a routeless `<button>` lock, correctly excluded) |
| Total AR→EN href pairs verified | **1,568** (32 × 49) |
| — hash-bearing (`#view=…`) pairs | **704** (32 × 22 deep-link items — becomes 32 × 24 after D-1; see §4) |
| — plain-file pairs | **864** (32 × 27 — becomes 32 × 25 after D-1) |
| Parity failures | **0** |
| AR href pointing at a `.en.html` file | **0** |
| EN href missing for an AR `data-nav` id | **0** |
| EN href not matching the `.html→.en.html` transform | **0** |
| Hash dropped or altered between AR and EN href | **0** (all 704 hash-bearing pairs carry an identical `#…` fragment on both sides) |

Edge cases re-verified: the shared-destination pair `salaries`/`staffSalaries` (both → `finance.html#view=salaries`)
and the shared-destination triple `teachers`/`addTeacher`/`teacherCategories` (all → bare `teachers.html` at
baseline, pre-D-1) — parity holds independently per `data-nav` id in both cases; a shared *target* is not a
special case for a per-id parity check.

### 1.5 Scope boundary — portal role-nav excluded

`ROLE_NAV` (`fixtures/portal.js`) + `portal-shell.js:26` render family/teacher/student sidebar items via
string concatenation (`` `${entry.page}${en ? '.en' : ''}.html` ``), not `langRoute()`, and no `ROLE_NAV` entry
carries a hash. Out of scope for P1 — already covered by the `plannedNavAnchors === 0` / shell-anchor-multiset
asserts, and there is no fragment to lose.

### 1.6 Disposition in Spec 041

`sidebar.js` stays on the 0-diff wall. P1 is **asserted as a standing rule**, not re-fixed: `route_en ===
langRoute(route_ar)`, fragment byte-identical, for all (50 → still 50, only the split changes — see §4)
items. D-1's route-string edits (`teachers`/`addTeacher`/`teacherCategories` → `teachers.html#view=…`, per
`d1-teacher-route-contract.md`) are authored **once** in `nav.config.js` exactly like every other route, so
they are covered by the same `langRoute()` mechanism and the same P1 rule — no separate parity mechanism is
introduced for them.

---

## 2. Contract P2 — Topbar language-switch parity

### 2.1 The law

Switching language via the topbar control must preserve: (a) the current page's identity (AR ⇄ EN twin,
same directory), and (b) the current URL fragment (`#view=`, `#step=`, `#child=`) byte-for-byte, so the user
lands on the **same visible surface** in the other language — not merely the same file.

### 2.2 The defect at baseline (`src/js/enhance.js:237-241`, verbatim)

```js
function langUrl(lang) {
  const file = (location.pathname.split('/').pop() || 'dashboard.html');
  const base = file.replace('.en.html', '').replace('.html', '') || 'dashboard';
  return lang === 'en' ? `${base}.en.html` : `${base}.html`;
}
```

Reads `location.pathname` only; never reads `location.hash`. Called at `enhance.js:552-553`:
`location.href = langUrl(l)` — a full navigation to a fragment-less URL. **The fragment is destroyed on every
topbar language switch.** There is no `hashchange` listener anywhere in `enhance.js`, so fragment state is
consumed at load time only — destroying it during the language navigation destroys it permanently for that
load.

Live-reproduced (headless Chromium, correct MIME types, HEAD `21502af`): `finance.html#view=banks` → click
topbar EN → lands on `finance.en.html`, hash gone, visible tab reverts to the baked default `overview`.
Confirmed.

Three fragment families are all affected: `#view=` (tabs, `initTabs`), `#step=` (the add-family wizard,
`initWizard`), `#child=` (family-child `:target`, no JS).

### 2.3 The fix (D-3 — the whole change, one line)

```js
  return (lang === 'en' ? `${base}.en.html` : `${base}.html`) + location.hash;
```

`location.hash` already carries its own leading `#` (or is `''`) — no `#` is authored, none is doubled.
Declared narrow supersession of the `enhance.js` 0-diff wall, scoped to exactly this `return` line (full
bounds and proof obligations in `d3-language-hash-contract.md §§5–6`). Explicitly NOT preserved:
`location.search` — the pre-fix helper already dropped it (pathname-only), the app authors zero query
strings, and adding `+ location.search` would exceed the minimal fix (recorded, not silently done).

### 2.4 Verification method

Additive smoke rows (`tests/smoke/run.cjs`), fresh browser context per row, correct MIME types, zero external
requests. Procedure, uniform across rows:

1. `goto <FROM URL>`.
2. Assert exactly one visible `[data-tabpanel]` within the owning `[data-tabs="<group>"]` group, and it is
   the FROM view (group-aware — never a page-global `[data-tabpanel]` query).
3. Click `[data-action="lang-menu"]` (opens the **topbar** popover) — assert the popover opened
   (`.popover [data-set-lang]` exists).
4. Click `.popover [data-set-lang="<target>"]` — **popover-scoped**, never a bare `[data-set-lang]` selector
   (see the test-design trap, §2.5).
5. Wait for navigation.
6. Assert the set A1–A9 below against the EXPECTED URL.

**Assertion set (every row):**

| # | Assertion |
|---|---|
| A1 | Pathname mirrored: basename `X.html` ⇄ `X.en.html`, same directory. |
| A2 | Hash byte-preserved: `location.hash` === the FROM hash, character for character. |
| A3 | Exactly one matching tabpanel visible within the owning `[data-tabs]` group, and it is the FROM view. |
| A4 | Stored view cannot override the preserved hash: pre-seed `localStorage['academy.schedView.<group>']` to a different existing view of the same group before step 1 — after the switch the visible panel is still the hash's view. |
| A5 | No double hash: `(location.href.match(/#/g)\|\|[]).length <= 1`; hash never starts with `##`. |
| A6 | No hash added where there was none: from a fragment-less URL, the switch lands with `location.hash === ''` and no trailing `#`. |
| A7 | Language actually switched: `documentElement.lang`/`dir` match the target; target-language copy present. |
| A8 | Topbar language control stays keyboard accessible (focusable, `Enter`/`Space` activates, popover focus-traps, `Escape` returns focus) — regression guard, design unchanged. |
| A9 | Zero external requests during the row. |

**Row matrix** (T1–T8, from `d3-language-hash-contract.md §7.3`):

| # | FROM | Click | EXPECTED | Group | Proves |
|---|---|---|---|---|---|
| T1 | `finance.html#view=banks` | EN | `finance.en.html#view=banks` | `finance` | the exact live-reproduced defect |
| T2 | `settings.html#view=security` | EN | `settings.en.html#view=security` | `settings` | the trap page, popover-scoped selector |
| T3 | `library.en.html#view=books` | AR | `library.html#view=books` | `library` | EN→AR direction |
| T4 | `teachers.html#view=add` | EN | `teachers.en.html#view=add` | `teachers` | new D-1 deep-link survives the switch |
| T5 | `teachers.en.html#view=categories` | AR | `teachers.html#view=categories` | `teachers` | new D-1 deep-link, EN→AR |
| T6 | `add-family.html#step=children` | EN | `add-family.en.html#step=children` | wizard | `#step=` fragment preserved |
| T7 | `family-child.html#child=st6` | EN | `family-child.en.html#child=st6` | CSS `:target` | non-JS fragment family survives; fix reaches portal pages via the shared asset |
| T8 | `dashboard.html` (no fragment) | EN | `dashboard.en.html` (no fragment) | — | A6 — the fix adds nothing where there was nothing |

T1–T5 additionally carry A4. T6–T8 carry A1/A2/A5/A6/A7/A8/A9 as applicable (A3/A4 do not apply to T7/T8).

### 2.5 The test-design trap (must not recur)

`settings.html` renders **two** `[data-set-lang]` elements: the topbar menu's (JS-injected on click, `class="menu-item" role="menuitem"`, no `data-lang-opt`) and the Customization tab's real language control (baked, `class="tab"`, carries `data-lang-opt`). A bare `document.querySelector('[data-set-lang="en"]')` hits the
**Customization control**, not the topbar menu — the test still passes (same handler) but proves nothing about
the topbar. Mandatory: click `[data-action="lang-menu"]` first and scope step 4 to `.popover [data-set-lang]`.
Applies to every row, not only `settings.html`.

### 2.6 Disposition in Spec 041

`enhance.js` receives the ONE declared narrow supersession (D-3, §2.3). `sidebar.js` is untouched by P2. Zero
protected-assert supersessions result from P2 (the D-1 supersessions S1–S5 are unrelated and belong to the
teachers-tab MOVE, not to the language switch).

---

## 3. Failure modes that MUST stay impossible — both contracts, side by side

| # | Failure mode | P1 (sidebar) — why impossible | P2 (topbar) — why impossible after D-3 |
|---|---|---|---|
| F1 | **AR route points at an EN file** | `langRoute()` is a no-op when `getLang() !== 'en'` — the AR anchor renders the authored route string unmodified; no code path appends `.en` on the AR side. Would require authoring an `.en.html` literal directly into a `route:` field, or calling `langRoute()` unconditionally regardless of `getLang()`. | Not applicable in the same sense (P2 has no "AR render path" bug of this shape) — `langUrl('ar')` on an EN page (`base` derived from the current pathname) always emits the bare `.html` form; a `.html` file can never itself be an `.en.html` file, so this mode cannot arise structurally. Guarded by A1 + A7. |
| F2 | **EN route points at an AR (non-`.en`) file** | `langRoute()` unconditionally rewrites `.html`→`.en.html` on the file part whenever `getLang() === 'en'` and the file doesn't already end `.en.html` — no branch returns the bare AR file under `en`. Would require removing/short-circuiting that replace branch. | `langUrl('en')` always emits `${base}.en.html` — `base` has `.en.html`/`.html` stripped first, so the `.en.html` suffix is appended unconditionally, never conditionally skipped. Guarded by A1 + A7. |
| F3 | **Hash lost or altered during the language switch** | The function splits `file`/`hash` at `indexOf('#')` **before** the `.html`→`.en.html` replace, then reappends `hash` unmodified (`enFile + hash`); the `/\.html$/` replace only ever runs against `file`, which by construction contains no `#`. Would require replacing `.html` against the whole route string instead of the pre-split `file`. | **This is the exact baseline defect (§2.2), fixed by appending `+ location.hash`** (§2.3). Post-fix, `location.hash` is read fresh at click time and concatenated verbatim — no split/rebuild step exists to corrupt it (unlike P1, P2's fix has no `.html`-inside-hash risk because it never touches the hash string, it only appends it). Guarded by A2, proven to regress under mutation M-D3-1 (§4). |
| F4 | **EN twin missing entirely for an id/page that exists in AR** | Both language pages are generated from the exact same `NAV_CATEGORIES` array by the exact same `navItem()`/`catPanel()`/`sidebar()` call chain — the only per-language variable is `getLang()`. No per-language item list exists to fall out of sync. Would require a language-conditional filter on `NAV_CATEGORIES`, or diverging data sources per language. | Every admin/portal base is built in AR+EN pairs (`build-html.mjs` PAGES entries, unchanged by D-3); `langUrl()` derives the twin filename from the *current* file, not from a lookup table, so there is no per-page registry that could omit a twin. The tab/step/child ids the fragment names are asserted to exist in **both** languages independently (`deep-link-register.md §7.4` item 3: `[data-tab="<view>"]` and `[data-tabpanel="<view>"]` exist in both languages for every derived row) — this is what makes a *preserved* hash resolvable, not just present. |
| F5 | **Double hash** (`##view=x`, or a hash appended to a route that already carried one) | N/A to P1 — `langRoute()` splits on the **first** `#` and reappends the extracted `hash` exactly once; there is only one hash to begin with (the authored route string), so there is nothing to double. | Guarded explicitly: `location.hash` already includes its leading `#` (or is `''`); the fix appends it as one expression, once, to a `base` string that is by construction `#`-free (derived from `location.pathname`, which never contains `#`). Mutation M-D3-3 (author the fix as `+ '#' + location.hash`) is the documented negative case — **A5 MUST FAIL** under it (`##view=banks`), proving the row would catch a doubled hash if the fix were written wrong. |
| F6 | **A hash added to a route/page that had none** | N/A to P1 in the same sense — a nav item's route is authored once; if the authored `route:` has no `#`, `hashIx === -1`, `hash = ''`, and `enFile + hash === enFile` (no hash appended). | Guarded explicitly by **A6**: from a fragment-less URL (`dashboard.html`), the switch must land on `dashboard.en.html` with `location.hash === ''` and no trailing `#` in `location.href` — because `location.hash` on a hash-less page is the empty string, and appending `''` is a byte-identical no-op vs. the pre-fix behaviour. T8 is the dedicated control row for this; per mutation M-D3-1, **T8 must still PASS** even when the fix is reverted (it asserts the *absence* of a hash, which is insensitive to whether `+ location.hash` exists) — the row that would catch F6 going wrong in the *other* direction (spuriously adding a hash) is A6 itself, not T8's pass/fail state under M-D3-1. |

### 3.1 Cross-contract note on F4 / hash-validity

A preserved fragment (P2) is only meaningful if the destination page can resolve it — that resolvability
(tab/step/child ids being language-independent, i.e., identical in both `.html` and `.en.html`) is a **P1-and
build-time** guarantee, not something P2 re-proves: `nav.config.js` authors one route string per item,
rendered into both languages via `langRoute()`, so tab ids are the same on both AR and EN pages by
construction. `deep-link-register.md §7.4` freezes this as an additive static assert. P2's job is narrower and
purely runtime: don't drop the hash in transit. Do not restate P1's id-parity guarantee inside a P2 test as if
it were a P2 concern, and do not skip it either — it is the reason P2's fix is *useful*, cross-referenced here
rather than duplicated.

---

## 4. Effect of D-1 on the P1 numbers (no new mechanism, only new rows)

D-1 (`d1-teacher-route-contract.md`) changes three route strings in `nav.config.js`
(`teachers`/`addTeacher`/`teacherCategories`, formerly all `teachers.html`, now `teachers.html` /
`teachers.html#view=add` / `teachers.html#view=categories`). These are ordinary `route:` edits in the same
single authoring path P1 already covers — no new parity mechanism, no new test shape. Post-041 P1 recount:

| | Pre-041 (§1.4) | Post-041 |
|---|---|---|
| Hash-bearing (`#view=…`) items | 22 | **24** |
| Plain-file items | 27 | **25** |
| Routeless lock | 1 (`classSalaryReport`) | 1 (unchanged) |
| Total AR→EN href pairs | 1,568 (32 × 49) | 1,568 (32 × 49 — unchanged; only the hash/plain split moves) |

The exact target counts are owned by `count-and-freeze-contract.md` / `derived-route-matrix-contract.md`; this
file states only that P1's *mechanism and verification method* are unaffected by the recount — the same
`langRoute()` sweep re-run post-041 must still show 0 failures, now over the 24/25 split instead of 22/27.

---

## 5. The P1 gap — and its closure in 041 (**T-04**)

**The gap (baseline, `21502af`).** No test in `tests/smoke/run.cjs` runs a **generic, derived** AR-vs-EN href-parity
loop for P1. The shipped suite proves per-spec route *correctness* via **hand-written regex literals on separate AR
and EN passes** — which could in principle diverge from each other without either literal individually looking wrong,
and which cover **no plain route at all** (parity is enforced only *emergently*, by the optional `(en\.)?` group inside
each per-item regex). This is recorded as **G-4** in `mutation-test-register.md` §6 and in
`ar-en-route-parity-register.md` §7.

> **CORRECTION — an earlier draft of this section said the loop is "not implemented here / 041 is specify-only".
> That is WITHDRAWN, and it was wrong on both counts:** 041 is the **plan** round for a spec that *does* ship test
> code, and **T-04 closes G-4 inside 041.**

**The closure (adopted, and consistent with every other 041 artifact).** 041 ships **T-04** — one **derived, id-keyed,
mechanical** AR→EN parity assert over **all 50** items: `route_en === langRoute(route_ar)`, fragment **byte-identical**,
covering the 25 plain routes the per-item regexes never touched. It is **additive** (no protected assert is edited) and
it is asserted from the same derived matrix as detector **X-4** (`derived-route-matrix-contract.md` §5).
**Mutation proof: M-5** — revert `langRoute()` to its pre-Spec-035 form (drop the hash) ⇒ **RED on the 32 EN admin
files** while every AR page stays green; that asymmetry *is* the signature of a hash-loss defect
(`mutation-execution-contract.md` §4.6, Pass B: "**RED** + T-04").

**P1 and P2 are therefore both delivered in 041, by different instruments and for different reasons:** P1's mechanism
is already correct and 041 **freezes it as a rule** (`sidebar.js` stays **0-diff**); P2's mechanism is **defective** and
041 **fixes it** (D-3) and covers it with rows T1–T8 (§2.4). What this file must never do is let the *shared symptom
class* collapse the two into one line item.

---

## 6. Summary card

| Field | P1 — Sidebar route parity | P2 — Topbar language-switch parity |
|---|---|---|
| Mechanism | `sidebar.js langRoute()` | `enhance.js langUrl()` |
| Baseline state | Correct — 0/1,568 failures | Defective — hash destroyed on every switch |
| Spec 041 action | Assert as a standing rule; **0-diff** | Fix (D-3): append `+ location.hash`, **1 line** |
| Verification | **T-04** — a derived, id-keyed AR→EN parity assert over all 50 items (closes gap **G-4**; mutation **M-5** ⇒ RED on the 32 EN admin files), plus the static sweep over rendered `data-nav` anchors, 32 pages × 49 items | **T-10** — runtime smoke rows T1–T8, popover-scoped, A1–A9 (mutation **M-12** ⇒ T1–T7 RED, T8 GREEN) |
| Owning register | `ar-en-route-parity-register.md` | `d3-language-hash-contract.md` |
| Failure modes closed | F1, F2, F4, F5 (structurally), F6 (structurally) | F1, F2, F3 (the fix's whole purpose), F4 (via cross-reference to P1), F5 (M-D3-3 guard), F6 (A6 + T8) |
