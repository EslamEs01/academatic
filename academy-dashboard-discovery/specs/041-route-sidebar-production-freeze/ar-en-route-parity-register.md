# AR/EN Route Parity Register — Spec 041

Scope: the admin sidebar (`.nav-panel`, `NAV_CATEGORIES` in `src/js/nav.config.js`), rendered on the 64
admin-sidebar-bearing files (32 bases × AR/EN). Verified live against the committed tree at HEAD `21502af`
(clean; no staged/unstaged changes at verification time). Portal role-nav (`ROLE_NAV`, `portal-shell.js`) uses a
**separate, un-hashed** mechanism and is out of scope — see §6.

## 1. The law

Every AR nav item's rendered `href` and its EN twin's rendered `href` must resolve to the **same route target**
(same file stem, same `#view=…` fragment if any), differing **only** in the `.html` → `.en.html` file suffix.
This is the AR/EN mirror law for navigation: one route per nav item, two language-scoped renderings, never a
divergent destination.

## 2. Mechanism

`nav.config.js` authors every `route` **once**, in the Arabic/canonical form, with no language marker:

```
item({ id: 'materials', ..., route: 'library.html#view=materials' })
```

`components/sidebar.js` renders every `implemented` item through a single transform, `langRoute()` (introduced
Spec 035, hash-aware since Spec 035; verbatim at `src/js/components/sidebar.js:18-27`):

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

Called at the one anchor-emitting site, `navItem()` (`sidebar.js:46`):
`<a href="${esc(langRoute(it.route))}" ...>`. There is **no second authoring path** — `nav.config.js` has no
`routeEn` field, no per-language item list, no build-time duplication. The EN sidebar is not a separately
authored artifact; it is the same 50-item `NAV_CATEGORIES` array rendered through `langRoute()` with
`getLang() === 'en'`. This is why parity is structural rather than incidental: there is only one place a route
string can be wrong, and it is wrong (or right) in both languages simultaneously.

Guarantees implied directly by the function body:
- **Hash preserved verbatim.** The hash is sliced off before the `.html`→`.en.html` replace and reappended
  unchanged (`enFile + hash`) — a `#view=…` fragment is never touched, truncated, or re-encoded.
- **Idempotent / already-EN routes untouched.** The `!file.endsWith('.en.html')` guard means a route that
  already ends `.en.html` (none exist in `nav.config.js` today — see §4) would pass through unchanged rather
  than becoming `.en.en.html`.
- **Non-`.html` files untouched.** A route with no `.html` file part (none exist today) passes through
  unchanged rather than acquiring a spurious suffix.
- **AR is the identity path.** `getLang() !== 'en'` returns the authored route with zero transformation — the
  AR route string in `nav.config.js` IS the AR rendered href, byte-for-byte.

## 3. Verification method

Non-destructive, read-only, run directly against the working tree at HEAD `21502af` (no worktree/stash needed —
the tree was already clean and matches the committed state):

1. Loaded `NAV_CATEGORIES` from the live `src/js/nav.config.js` via dynamic `import()` and flattened
   `items` + `sections[].items` → confirmed **50 items total, 49 carry a `route`, 1 is the routeless
   `classSalaryReport` lock**.
2. Enumerated `public/*.html`, paired each AR base with its `.en.html` twin, and kept only pairs whose AR file
   contains `nav-panel` (i.e. is one of the 32 admin sidebar bases — portal/index files excluded).
3. For each of the 32 AR pages, regex-extracted every `<a href="…" ... data-nav="<id>">` pair from the
   **rendered HTML** (not from source — this catches anything `langRoute()` or the template layer could get
   wrong at build time, not just at authoring time), and looked up the same `data-nav="<id>"` anchor in the
   `.en.html` twin.
4. For every `(AR href, EN href)` pair: derived the **expected** EN href by hand-applying the same
   file/hash split `langRoute()` uses, and asserted `EN href === expected`. Independently asserted the AR href
   never contains `.en.html` (catches an AR-points-at-EN inversion) and the derived expected EN href does
   contain `.en.html` when the AR file part matched `\.html$` (catches an EN-twin-not-transformed failure).

## 4. Verified results

| Check | Result |
|---|---|
| Admin sidebar base pages checked | 32 (× 2 languages = 64 files) |
| Nav items per page (implemented, `href`-bearing) | 49 (the 50th, `classSalaryReport`, is a `<button>` lock — no `href`, correctly excluded) |
| Total AR→EN href pairs verified | **1,568** (32 pages × 49 items) |
| — of which hash-bearing (`#view=…`) pairs | **704** (32 × 22 deep-link items) |
| — of which plain-file pairs | **864** (32 × 27 plain routes) |
| Parity failures | **0** |
| AR href pointing at a `.en.html` file | **0** |
| EN href missing for an AR `data-nav` id | **0** |
| EN href not matching the expected `.html→.en.html` transform | **0** |
| Hash dropped or altered between AR and EN href | **0** (all 704 hash-bearing pairs carry an identical `#…` fragment on both sides) |

Cross-check against the recomputed baseline facts: 22 deep-link routes × 32 pages = 704 ✅; 27 plain routes ×
32 pages = 864 ✅; 704 + 864 = 1,568 ✅. The two counts match the authoritative route-split figure
(22 deep-link + 27 plain + 1 routeless = 50) independently derived from the rendered DOM, not just from source.

### Edge cases explicitly re-verified

- **Shared-destination pair `salaries` / `staffSalaries`** (both → `finance.html#view=salaries`, Spec 038):
  both ids' AR hrefs are `finance.html#view=salaries`; both ids' EN hrefs are `finance.en.html#view=salaries`.
  Parity holds independently per `data-nav` id — a shared *target* does not create a shared *id*, so this is
  two ordinary parity checks, not a special case, and both passed.
- **Shared-destination triple `teachers` / `addTeacher` / `teacherCategories`** (all → bare `teachers.html`,
  Spec 036 fold-anchors, no hash): all three ids' AR hrefs are `teachers.html`; all three EN hrefs are
  `teachers.en.html`. Parity holds for all three independently. (The fold-anchors' honesty gap — landing on
  `teachers.html` without auto-opening a drawer — is a *destination-content* defect tracked elsewhere in the
  041 corpus (D-1); it is orthogonal to route *parity*, which only asks "does AR's route and EN's route name
  the same target," and the answer here is yes for both languages equally.)

## 5. Failure modes that MUST stay impossible

These are the concrete regressions the mechanism in §2 is structurally built to prevent, and that any future
change to `nav.config.js`, `sidebar.js`, or the build must keep impossible:

| # | Failure mode | Why it is currently impossible | What would have to break it |
|---|---|---|---|
| F1 | **AR route points at an EN file** (e.g. an authored `route: 'materials.en.html#view=x'` in `nav.config.js`, or a bug that runs `langRoute()` on the AR render path) | `langRoute()` is a no-op when `getLang() !== 'en'` — the AR anchor renders the authored route string unmodified; no code path can *append* `.en` on the AR side | Authoring an `.en.html` literal directly into a `route:` field (a source-review defect, not a mechanism defect — see §7 recommendation), or calling `langRoute()` unconditionally regardless of `getLang()` |
| F2 | **EN route points at an AR (non-`.en`) file** | `langRoute()` unconditionally rewrites `.html`→`.en.html` on the file part whenever `getLang() === 'en'` and the file doesn't already end `.en.html` — there is no branch that returns the bare AR file under `en` | Removing or short-circuiting the `getLang() === 'en'` replace branch |
| F3 | **Hash lost or altered during the language switch** (e.g. `#view=materials` becomes empty, or becomes `#view=materials.en` via a naive string replace on the whole route instead of the file part) | The function explicitly splits `file`/`hash` at `indexOf('#')` **before** doing the `.html`→`.en.html` replace, then reappends `hash` unmodified (`enFile + hash`) — the replace regex `/\.html$/` is anchored to end-of-string and only ever runs against `file`, which by construction contains no `#` | Replacing `.html` against the *whole* route string (not the pre-split `file`) would corrupt any hash containing `.html`-like text, or a regex without the `$` anchor could mis-match |
| F4 | **EN twin missing entirely for an id that exists in AR** (a `data-nav` id renders an anchor on the AR page but no anchor, or a different id, on the `.en.html` twin) | Both language pages are generated from the exact same `NAV_CATEGORIES` array by the exact same `navItem()`/`catPanel()`/`sidebar()` call chain — the only per-language variable is `getLang()`, read inside `langRoute()` and `t()`. There is no per-language item list to fall out of sync, no conditional item inclusion keyed on language anywhere in `sidebar.js` | Introducing a language-conditional filter on `NAV_CATEGORIES` items, or building the two language pages from diverging data sources instead of one shared config + one build pass |

F1–F4 all reduce to the same structural argument: **there is one authored route per item, one transform
function, one call site** — the AR/EN divergence surface is a single 10-line function, not two independently
maintained sidebars. This is the same reason the verification in §4 found 0 failures across all 1,568 pairs
rather than "0 failures in a sample": the failure modes above are not probabilistically rare, they are
categorically excluded by the code shape, and the sweep exists to confirm the code shape matches its intent on
the full built surface, not to hunt for a rare miss.

## 6. Out of scope: portal role-nav uses a different (un-hashed) mechanism

`ROLE_NAV` (`fixtures/portal.js`) + `portal-shell.js` render family/teacher/student sidebar items via a
simpler, unrelated code path (`portal-shell.js:26`): `` `${entry.page}${en ? '.en' : ''}.html` `` — string
concatenation, not `langRoute()`, and **no hash-bearing portal routes exist** (every `ROLE_NAV` entry is a
plain page file). This register does not certify portal-nav AR/EN parity — it is a structurally simpler,
already-separately-covered surface (the `plannedNavAnchors === 0` and shell-anchor-multiset asserts in
`tests/smoke/run.cjs` cover it) and carries no `#view=` fragment to lose. It is out of scope here because
Spec 041's `langRoute()` mechanism and the D-1/deep-link findings are specific to the **admin** sidebar.

## 7. Gap carried forward (record, not fixed — 041 is specify-only)

No test in `tests/smoke/run.cjs` runs a **generic, derived** AR-vs-EN href-parity loop over all 50 nav items ×
64 admin pages the way §3 of this register does. The existing suite proves route *correctness* per spec
(`nav035`/`nav036`/`nav037`/`nav039`/`nav040` blocks assert specific hrefs match a specific regex on both `ar`
and `en` runs of the per-page loop) but never proves AR-href and EN-href **agree with each other** as a paired
check — two independently-correct-looking regexes on two separate language passes could theoretically still
diverge from each other if a future edit changed one language's expected-route literal without the other's,
and the existing suite would not catch that specific class of drift (it would need two hand-edited literals to
individually go wrong in a matching-looking but actually-different way — a low-probability but real gap).
Recommendation for whichever spec next touches `tests/smoke/run.cjs` (per the 041 finding on test-coverage
gaps): add one derived, id-keyed AR→EN pairing loop (mirroring §3's method) rather than relying solely on the
per-language hand-written regex literals. Not implemented here — 041 is audit/specify only; no test file was
edited to produce this register.
