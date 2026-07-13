# Spec 041 — D-3 Contract: Topbar Language Switch Must Preserve the URL Fragment

**Status**: DECIDED (the one-line `langUrl()` narrow supersession). No alternative option set exists; do not open one.
**Baseline**: HEAD `21502af` (Spec 040 committed; PR #13 merged; `main` merge `13d38af`; both on `origin/main`;
tree clean except the 041 artifacts + `.specify/feature.json`).
**Provenance**: promoted from **O-1**, logged with exact evidence in `deep-link-register.md §8`. That register
*recommended* an owner (044/057) and explicitly said "not fixed in 041". **The maintainer has since promoted O-1 to a
BLOCKING Spec-041 defect (D-3).** This contract is the declared, single, scoped exception to that recommendation, and it
supersedes `deep-link-register.md §8`'s "Not fixed in 041" line and the `impact-boundary.md` unconditional
`enhance.js` 0-diff wall — **scoped to exactly one function** (§5). Every other statement in those two artifacts stands.

---

## 1. The defect (source-grounded, live-reproduced)

### 1.1 The offending code — `src/js/enhance.js:237-241` (verbatim, HEAD `21502af`)

```js
function langUrl(lang) {
  const file = (location.pathname.split('/').pop() || 'dashboard.html');
  const base = file.replace('.en.html', '').replace('.html', '') || 'dashboard';
  return lang === 'en' ? `${base}.en.html` : `${base}.html`;
}
```

It reads **`location.pathname` only**. It never reads `location.hash`. The returned string is a bare filename.

### 1.2 The call site — `src/js/enhance.js:552-553` (verbatim)

```js
  const lg = e.target.closest('[data-set-lang]');
  if (lg) { const l = lg.getAttribute('data-set-lang'); closeMenu(); if (l !== getLang()) location.href = langUrl(l); return; }
```

`location.href = langUrl(l)` — a full navigation to a fragment-less URL. **The fragment is destroyed on every topbar
language switch.** (The guard `l !== getLang()` means re-selecting the current language is a no-op — no navigation, no
hash loss; correct today and after the fix.)

### 1.3 Why the loss is *visible* (the tabs engine reads the fragment on load)

| Mechanism | Source | Behaviour |
|---|---|---|
| Deep-link arrival | `enhance.js:262` `initTabs()` → `enhance.js:265` `location.hash.match(/view=([a-z0-9-]+)/i)` | The URL hash is the **highest-precedence** view selector: hash → `localStorage['academy.schedView.<group>']` → baked first tab. Called with `{persist:false}` — a deep-link arrival never writes the stored view. |
| Click-a-tab | `enhance.js:245` `selectTab()` → `enhance.js:258` `history.replaceState(null, '', '#view=' + id)` | A real user click **writes the fragment into the address bar** and the stored view. So even a user who arrived without a hash *has* one after one click. |
| Wizard | `enhance.js:296` `selectStep()` → `enhance.js:308` `history.replaceState(null, '', '#step=' + id)`; `enhance.js:316` `initWizard()` → `enhance.js:319` `location.hash.match(/step=([a-z0-9-]+)/i)` | Same shape, second fragment family: `#step=`. `add-family.html` is the only `[data-wizard]` host (`src/js/pages/add-family.js:85`); its step ids are `identity · contact · children · billing · review`. |
| Child view | `family-child.html` / `.en` bake `id="child=st1|st6|st11|st12|st13"` (**identical ids in both languages**, verified) and switch panels with pure-CSS `:target` | A third fragment family: `#child=stX`. No JS involved — the loss is purely the discarded fragment. |

**There is no `hashchange` listener anywhere in `enhance.js`.** Fragment state is therefore consumed **at load time
only**; destroying the fragment during the language navigation destroys the state permanently for that page load.

### 1.4 The live reproduction (headless Chromium, correct MIME types, HEAD `21502af`)

| Step | Observation |
|---|---|
| 1 | Load `finance.html#view=banks` → `initTabs` selects the **Banks** tab; exactly one visible `[data-tabpanel]` = `banks`. |
| 2 | Open the topbar language menu (`[data-action="lang-menu"]`) and click the **EN** item. |
| 3 | Lands on **`finance.en.html`** — **hash GONE**. |
| 4 | The visible tab is the **baked default `overview`**, not Banks. |

**Confirmed.** The user is silently thrown off the surface they deep-linked to. The same loss applies to `#step=` and
`#child=` (§1.3), on every page that renders the topbar.

### 1.5 Contrast — the sidebar is already correct (do not "fix" it)

`src/js/components/sidebar.js:18-26` `langRoute(route)` splits the route at `indexOf('#')`, converts **only the file
part** (`/\.html$/` → `.en.html`), and re-appends the hash **unmodified** (`return enFile + hash;`). Introduced by
Spec 035; audited at 0 failures in `ar-en-route-parity-register.md` (F3). **Sidebar route parity is CORRECT today.**

> **Route parity is therefore TWO distinct contracts, and 041 must never conflate them:**
> **(P1) Sidebar route parity** — `sidebar.js langRoute()` — **CORRECT at baseline; `sidebar.js` stays 0-diff.**
> **(P2) Topbar language-switch parity** — `enhance.js langUrl()` — **DEFECTIVE at baseline; fixed by D-3.**

---

## 2. The fix (the whole change)

Replace the `return` of `langUrl()` (`enhance.js:240`) with:

```js
  return (lang === 'en' ? `${base}.en.html` : `${base}.html`) + location.hash;
```

Final function after the fix:

```js
function langUrl(lang) {
  const file = (location.pathname.split('/').pop() || 'dashboard.html');
  const base = file.replace('.en.html', '').replace('.html', '') || 'dashboard';
  return (lang === 'en' ? `${base}.en.html` : `${base}.html`) + location.hash;
}
```

**One line. One function. One expression appended.** `location.hash` already carries its own leading `#` (or is the
empty string), so no `#` is authored and none is doubled. `base` is derived from `location.pathname` and can never
contain `#`.

### 2.1 Law compliance (all standing laws, checked one by one)

| Law | Compliance |
|---|---|
| No new `data-*` hook | ✅ reuses the existing `[data-set-lang]` / `[data-action="lang-menu"]` hooks verbatim |
| No new storage key | ✅ zero storage access added; `academy.lang` / `academy.theme` / `academy.schedView.*` untouched |
| No new dependency / component / page / PAGES entry | ✅ none |
| No backend / API / network | ✅ a same-origin static navigation, as today |
| No fake save / success / mutation | ✅ nothing is written |
| Teacher pay-free · family zero-pay · student child-view · finance no-fake-money · settings no-fake · no secrets · no `type=password` / `type=file` / canvas / PDF / `window.open` | ✅ untouched — this is a URL-string change in one helper |
| Not a redesign | ✅ the language control's markup, ARIA, icons, ordering, popover behaviour and copy are **unchanged** |

---

## 3. What the fix PRESERVES

| Fragment family | Producer | Consumer | Preserved after D-3 |
|---|---|---|---|
| `#view=<tab>` | nav deep-links (24 after D-1 — `deep-link-register.md`, `count-and-freeze-contract.md`) **and** `selectTab` `replaceState` (`enhance.js:258`) | `initTabs` (`enhance.js:265`) | ✅ language switch lands on the **same tab** in the twin page |
| `#step=<step>` | `selectStep` `replaceState` (`enhance.js:308`) | `initWizard` (`enhance.js:319`) | ✅ `add-family.html#step=children` → EN keeps step `children` |
| `#child=stX` | authored anchors in `family-child.html` / `.en` (ids byte-identical across languages) | pure CSS `:target` | ✅ the selected child survives the switch |
| *(none)* — a page with no fragment | — | — | ✅ `location.hash === ''` → the returned URL is **byte-identical to today's** |

**Hash-validity across the twin.** A preserved fragment is only useful if the twin resolves it. Tab ids are
**language-independent by construction** (`nav.config.js` authors one route string, rendered into both languages;
tab ids come from the same page module) — the AR/EN columns of `deep-link-register.md §§4.1-4.6` are identical for all
22 (→24) views, and 041's additive static hash-resolution assert (`deep-link-register.md §7.4 item 3`) freezes
"`[data-tab="<view>"]` **and** `[data-tabpanel="<view>"]` exist in **both** languages" for every derived row. `#step=`
and `#child=` ids are likewise language-independent (verified: `family-child.en.html` bakes `id="child=st6"`).
**Risk R-2** (a hash valid in AR, dead in EN) is therefore closed *by that assert*, not by this fix — cross-referenced,
not duplicated.

---

## 4. What the fix DOES NOT change (explicit non-goals — record, don't silently do)

| # | Non-goal | Statement |
|---|---|---|
| N1 | **`components/sidebar.js` `langRoute()`** | **Untouched. 0-diff.** It is already hash-aware (§1.5). Touching it would be scope creep and would risk the audited-green P1 parity. |
| N2 | **The language control's design** | No markup, ARIA, ordering, icon, copy, popover, focus or keyboard change. `langMenu()` (`enhance.js:29-34`), `topbar.js:44` (`[data-action="lang-menu"]`), `components/dropdown.js`, `components/settings-section.js:16` all **0-diff**. |
| N3 | **`location.search` (query strings)** | **NOT preserved — deliberately, and stated rather than hidden.** The CURRENT helper already drops `location.search`: it only ever read `location.pathname`, so a query string is *already* lost today. The app is fully static and authors **zero** query strings anywhere (no `?` route, no query-driven state). Adding `+ location.search` would be a **behaviour change beyond the minimal fix**, would introduce a code path with no producer and no test corpus, and is **NOT adopted by 041**. If a future spec introduces query-string state, it owns the corresponding `langUrl` amendment. |
| N4 | **`hashchange` handling** | No listener is added. Fragment state stays load-time-only. Same-page hash changes remain non-reactive (this is the constraint that forces D-1's tablist affordance — see `d1-*` / `spec.md`). |
| N5 | **The tabs / wizard / `:target` engines** | `selectTab`, `initTabs`, `selectStep`, `initWizard` and the `:target` CSS are **byte-unchanged**. D-3 changes only the URL handed to `location.href`. |
| N6 | **Stored-view semantics** | `localStorage['academy.schedView.<group>']` keeps its exact precedence (below the hash) and its exact write points. D-3 adds no read and no write. |
| N7 | **Every other `enhance.js` behaviour** | See the proof obligation, §6. |

### 4.1 One declared *consequence* (beneficial, in-scope, must be recorded not discovered)

`settings.html` renders a **second, real** `[data-set-lang]` control inside the **Customization** tab
(`components/settings-section.js:16`, `data-set-lang` + `data-lang-opt`) — a genuinely working language switch, routed
through the **same** delegated handler at `enhance.js:552-553`, hence the **same** `langUrl()`. After D-3 that control
also preserves the fragment, so switching language *from the Customization tab* now **keeps the user on
`#view=customization`** instead of dumping them on `general`. This is an honest improvement produced by the same one
line; it is **declared here**, not stumbled upon in review. It is also the source of the test trap (§7.1).

---

## 5. The declared NARROW SUPERSESSION of the `enhance.js` 0-diff wall

`impact-boundary.md` places `src/js/enhance.js` on the 0-diff wall. `deep-link-register.md §8` says O-1 is "Not fixed
in 041" because it is "an `enhance.js` behaviour change, outside a route/sidebar freeze's impact boundary."

**Superseded, once, by maintainer direction, with these exact bounds:**

| Bound | Value |
|---|---|
| Files released from the wall | **`src/js/enhance.js` only** |
| Functions released | **`langUrl(lang)` only** (`enhance.js:237-241`) |
| Lines released | **the single `return` expression** (`enhance.js:240`) |
| Permitted delta | append `+ location.hash` to the returned string. **Nothing else.** |
| Everything else in `enhance.js` | **STILL ON THE WALL** — byte-identical: `acknowledge`/toasts, `openModal`, `openSheet`, `selectTab`, `initTabs`, `selectStep`, `initWizard`, `selectCategory`, `applyFilter`, `setTheme`, `getLang` plumbing, the delegated click listener (incl. `enhance.js:552-553`, which is **not** edited — only the value `langUrl()` returns differs), `initTimeConverter`, the row-menu / drawer / confirm dispatch. |
| Wall files still 0-diff | `package.json` · `scripts/build-html.mjs` · `src/js/i18n.js` · `components/sidebar.js` · `components/tabs.js` · `components/form-field.js` · `components/settings-section.js` · `components/preview-drawer.js` · `components/ui.js` (real path `src/js/components/ui.js` — there is no `src/js/ui.js`) · `components/topbar.js` · `components/dropdown.js` · settings fixtures · `pages/staff.js` + `fixtures/staff-management.js` · all portal pages/fixtures · all unrelated page modules and locales |
| Diff ceiling (enforceable) | `git diff --unified=0 -- src/js/enhance.js` shows **exactly 1 changed line** (1 `-`, 1 `+`), inside `langUrl`. A second changed line in `enhance.js` = **plan violation**. |

### 5.1 Impact classification (the five-layer distinction the plan must keep)

| Layer | D-3 effect |
|---|---|
| (1) **Source-module change** | `src/js/enhance.js` — 1 line. |
| (2) **Generated shared-asset change** | **`public/assets/js/enhance.js`** — the **verbatim `cpSync` copy** of `src/js/enhance.js` (`scripts/build-assets.mjs`). **There is NO bundler and NO `public/assets/app.js`** — that identifier, used in an earlier draft of this contract, does not exist in the tree; corrected per `impact-protection-contract.md` §1.1. It is **one shared file**, fetched by **114** of the 115 pages (`index.html` does not load it) — this is **not** 115 page changes. |
| (3) **Sidebar markup change** | **None from D-3.** (The sidebar `href` fragment edits belong to D-1.) |
| (4) **Page-body change** | **None from D-3.** All 115 `#page-body` blocks are byte-identical w.r.t. D-3; the only two bodies that change in Spec 041 are `teachers.html` / `teachers.en.html` (D-1). |
| (5) **Whole-file change** | **None from D-3** — no built HTML file's bytes change because of D-3 (the `<script src>` reference is unchanged; only the asset's content differs). |

**Behavioural reach is global by design**: every page that renders the topbar (all 64 admin + 50 portal files;
`index.html` has **no** `[data-action="lang-menu"]` — verified) gets the corrected switch from the one shared asset.
That is the point of fixing it in the shared module rather than per page.

---

## 6. Proof obligation — all other `enhance.js` behaviour is functionally unchanged

The implementer must discharge **all five**:

| # | Obligation | Method |
|---|---|---|
| PO-1 | **Diff ceiling** | `git diff --unified=0 -- src/js/enhance.js` → exactly one `-`/`+` pair, inside `langUrl`. |
| PO-2 | **AST/function-boundary check** | The `-`/`+` line lies strictly between the `function langUrl(lang) {` line and its closing `}`. No other function's byte range moves. |
| PO-3 | **No-hash regression** | For a page loaded with **no** fragment, `langUrl('en')` returns the **byte-identical string** to the pre-fix helper (`location.hash === ''` ⇒ concatenating `''`). Assert in-browser on a hash-less page: the resulting URL has **no** `#`. |
| PO-4 | **Whole-suite green, byte-verbatim protected asserts** | The full smoke + a11y + screenshot suites pass. **Every protected assert stays byte-verbatim except the 5 D-1 sites S1-S5 enumerated in `protected-test-register.md`** — D-3 supersedes **zero** protected asserts; it only **adds** the §7 block. |
| PO-5 | **No new hook / key / dependency** | `grep` the diff for `data-`, `localStorage`, `addEventListener`, `import` → **0 additions**. |

---

## 7. The EXACT tests (additive smoke block; supersedes no protected assert)

Every row: **fresh browser context**, correct MIME types, static server, **zero external requests**. Procedure for
every row is the same and is **scoped** per §7.1:

```
1. goto <FROM URL>
2. assert: exactly ONE visible [data-tabpanel] within the owning [data-tabs="<group>"] group,
   and it is the FROM view   (pre-condition; group-aware per E-04)
3. click [data-action="lang-menu"]                 // opens the TOPBAR popover
4. click .popover [data-set-lang="<target>"]       // the MENU's control — see the trap, §7.1
5. wait for navigation
6. assert the D-3 assertion set (§7.2) against <EXPECTED URL>
```

### 7.1 THE TEST-DESIGN TRAP (found live — a test that ignores this silently proves nothing)

**`settings.html` renders TWO kinds of `[data-set-lang]` element:**

| Element | Origin | Baked? | Distinguishing attributes |
|---|---|---|---|
| The **topbar language menu** items (the D-3 subject) | `enhance.js:29-34` `langMenu()`, injected by `openPopover()` into `document.body` **on click** | **NO — not in the built HTML at all.** `grep -o 'data-set-lang="[a-z]*"' public/settings.html \| wc -l` → **2**, and **BOTH of those two are the *other* control** (they carry `data-lang-opt`). *(Use `grep -o … \| wc -l`; `grep -c` counts matching **lines**, not matches, and returns 1 here.)* | inside `div.popover[role="menu"]`; `class="menu-item"`, `role="menuitem"`; **no** `data-lang-opt` |
| The **Customization tab's REAL language control** | `components/settings-section.js:16` (`settingsSection` appearance) | **Yes** — baked in `#page-body`, therefore **earlier in DOM order** | `class="tab"`, carries **`data-lang-opt`** |

⇒ `document.querySelector('[data-set-lang="en"]')` on `settings.html` **hits the Customization control**, not the
topbar menu. Both route through the same handler, so the test would still *pass* — while testing the **wrong control**
and never opening the menu it claims to test. **Mandatory selector discipline:**

* **Step 3 is not optional**: click `[data-action="lang-menu"]` first, and **assert the popover opened**
  (`document.querySelector('.popover [data-set-lang]') !== null`).
* **Step 4 must be popover-scoped**: `.popover [data-set-lang="<lang>"]` (or equivalently
  `[data-set-lang="<lang>"]:not([data-lang-opt])`). A bare `[data-set-lang]` selector is a **test defect** and must be
  rejected in review.
* This discipline applies on **every** row, not just settings — uniformity is what keeps the trap from re-opening.

### 7.2 The assertion set (applied to every row)

| # | Assertion |
|---|---|
| A1 | **Pathname mirrored**: `location.pathname` basename === the expected twin (`X.html` ⇄ `X.en.html`), **same directory**. |
| A2 | **Hash byte-preserved**: `location.hash` === the FROM hash, **character for character** (no re-encoding, no case change, no re-ordering). |
| A3 | **Exactly ONE matching tabpanel visible**, and it is the FROM view: within `[data-tabs="<group>"]`, `[data-tabpanel]:not([hidden])` has length **1** and its `data-tabpanel` === the FROM view. (Group-aware, per E-04 — never a page-global `[data-tabpanel]` query.) |
| A4 | **Stored view cannot override the preserved hash**: pre-seed `localStorage['academy.schedView.<group>']` to a **different existing view of that group** before step 1. After the switch the visible panel is still the **hash's** view. (Proves the post-switch load re-runs the same hash-beats-stored precedence as a cold deep-link.) |
| A5 | **No double hash**: `(location.href.match(/#/g) || []).length <= 1`; `location.hash` never starts with `##`. |
| A6 | **No hash added where there was none**: from a fragment-less URL (e.g. `dashboard.html`), the switch lands on `dashboard.en.html` with `location.hash === ''` and **no trailing `#`** in `location.href`. |
| A7 | **Language actually switched**: `document.documentElement.lang` / `dir` === the target (`en`/`ltr` or `ar`/`rtl`), and the target page's baked copy is in the target language — i.e. A2 was not achieved by failing to navigate. |
| A8 | **Topbar language control stays keyboard accessible**: `[data-action="lang-menu"]` is focusable and activates on `Enter`/`Space`; the opened popover focuses its first `[role="menuitem"]` (`dropdown.js`); `Escape` closes it and returns focus to the trigger; the menu can be driven to completion **without a mouse**. (Design unchanged — this is a regression guard on N2, not a new requirement.) |
| A9 | **Zero external requests** during the whole row (the standing static-app assert). |

### 7.3 The row matrix (mandatory)

| # | FROM (fresh context) | Click | EXPECTED URL | Group | Proves |
|---|---|---|---|---|---|
| T1 | `finance.html#view=banks` | EN | `finance.en.html#view=banks` | `finance` | **the exact live-reproduced defect** (§1.4) |
| T2 | `settings.html#view=security` | EN | `settings.en.html#view=security` | `settings` | the trap page (§7.1) — with the popover-scoped selector |
| T3 | `library.en.html#view=books` | AR | `library.html#view=books` | `library` | the **EN→AR** direction (`.en.html` → `.html`) |
| T4 | `teachers.html#view=add` | EN | `teachers.en.html#view=add` | `teachers` | the **new D-1** deep-link (Add-Teacher tab) survives the switch |
| T5 | `teachers.en.html#view=categories` | AR | `teachers.html#view=categories` | `teachers` | the **new D-1** deep-link, EN→AR |
| T6 | `add-family.html#step=children` | EN | `add-family.en.html#step=children` | *(wizard `[data-wizard]`)* | the **`#step=` wizard fragment** is preserved (A3 variant: exactly one visible `[data-step]`, and it is `children`; `initWizard`, `enhance.js:316-320`). **A wizard route exists** — `pages/add-family.js:85`; step ids `identity · contact · children · billing · review`. |
| T7 | `family-child.html#child=st6` | EN | `family-child.en.html#child=st6` | *(CSS `:target`)* | a **non-JS** fragment family survives (ids `id="child=st6"` are byte-identical in both languages — verified); also proves the fix reaches **portal** pages via the shared asset |
| T8 | `dashboard.html` *(no fragment)* | EN | `dashboard.en.html` *(no fragment)* | — | **A6** — the fix adds nothing where there was nothing |

T1-T5 additionally carry **A4** (stored-view pre-seeded to a different existing view of the same group).
T6-T8 carry A1/A2/A5/A6/A7/A8/A9 as applicable (A3/A4 do not apply to T7/T8; T6 uses the `[data-step]` variant of A3).

### 7.4 Where the block lives

An **additive** smoke block (`tests/smoke/run.cjs`), sibling to the existing deep-link blocks. **It edits no protected
assert.** The five protected-assert supersessions in Spec 041 (S1-S5) belong to **D-1** only; **D-3 supersedes zero
tests** — it supersedes a *0-diff wall statement* (§5), which is a different instrument.

---

## 8. The mutation (the test must be able to fail)

> A test that cannot fail is not evidence.

| Mutation | Applied to | REQUIRED result |
|---|---|---|
| **M-D3-1 (the canonical mutation)** — revert the fix: delete `+ location.hash` from `enhance.js:240`, restoring the pre-041 `return lang === 'en' ? \`${base}.en.html\` : \`${base}.html\`;` | `src/js/enhance.js` | **T1-T7 MUST FAIL** — at **A2** (hash empty ≠ FROM hash) and at **A3** (the visible panel is the baked default: `finance.en.html` shows `overview`, not `banks`; `add-family.en.html` shows `identity`, not `children`; `family-child.en.html` shows `st1`, not `st6`). **T8 must still PASS** (it asserts the *absence* of a hash — it is the control row and must be insensitive to the mutation). If any of T1-T7 still passes under M-D3-1, that row is vacuous and must be rewritten before the plan is accepted. |
| **M-D3-2 (trap guard)** — replace the popover-scoped selector with a bare `document.querySelector('[data-set-lang="en"]')` in the **T2** row, and remove the `[data-action="lang-menu"]` click | `tests/smoke/run.cjs` (test-only, transient) | The row must be **rejected in review** as a test defect. It will still *pass* on the fixed build — proving it tests the Customization control (§7.1), not the topbar. This mutation documents the trap; it is a review gate, not a CI assertion. |
| **M-D3-3 (double-hash guard)** — author the fix wrongly as `` + '#' + location.hash `` | `src/js/enhance.js` | **A5 MUST FAIL** on T1-T7 (`##view=banks`) and **A6 MUST FAIL** on T8 (a trailing `#` on a hash-less route). |
| **M-D3-4 (stored-view guard)** — make `initTabs` prefer the stored view over the hash | `src/js/enhance.js` *(hypothetical; not a permitted edit)* | **A4 MUST FAIL** on T1-T5. Recorded so the A4 seeding is never dropped as "redundant". |

Per `mutation-test-register.md`'s standing rule: each mutation is applied to a **scratch working tree**, the suite is
run, the required failure is **observed and recorded**, and the tree is restored. No mutation is ever committed.

---

## 9. Summary card

| Field | Value |
|---|---|
| Defect id | **D-3** (promoted from O-1, `deep-link-register.md §8`) |
| Severity | **BLOCKING** — a deep-linked user silently loses their surface on every language switch |
| Root cause | `enhance.js:237-241` `langUrl()` reads `location.pathname` only; `enhance.js:552-553` assigns `location.href` |
| Live repro | `finance.html#view=banks` → EN → `finance.en.html`, hash gone, tab reverts to `overview` |
| Fix | append `+ location.hash` to the `langUrl()` return — **1 line, 1 function** |
| Preserves | `#view=` (24 deep-links + `replaceState`) · `#step=` (add-family wizard) · `#child=` (family-child `:target`) |
| Does not change | `sidebar.js langRoute()` (already correct) · the language control's design · `location.search` (**already dropped today; preserving it exceeds the minimal fix — NOT adopted**) · every other `enhance.js` behaviour |
| Supersession | **NARROW**, of the `enhance.js` 0-diff wall, scoped to `langUrl()`'s return line. **Zero protected-assert supersessions.** |
| Tests | T1-T8 (§7.3), each under the popover-scoped selector discipline (§7.1) and the assertion set A1-A9 (§7.2) |
| Mutation | M-D3-1: remove `location.hash` again → **T1-T7 must fail**; T8 must still pass |
| Generated impact | **`public/assets/js/enhance.js`** content changes (one shared asset, fetched by 114 pages; **no bundler, no `assets/app.js`**). **Zero** page-body changes and **zero** whole-file HTML changes from D-3 — the `<script src>` is an unversioned literal, so no page's bytes move. |

---

## 10. Provenance caveat

The committed corpus charters **only Spec 041**. `deep-link-register.md §8` recommended **Spec 044** (and **057** as
fallback) as O-1's owner; **Specs 042-057 are a maintainer-directed, append-only amendment, NOT chartered specs.** The
maintainer's promotion of O-1 to **D-3 inside Spec 041** overrides that recommendation and is recorded here as the
single authoritative assignment. The `common.backendRequiredNote` copy sweep remains assigned to the (unchartered)
Spec-044 slot and is **not** swept in 041.
