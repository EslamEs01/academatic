# Count & Route Contract — Spec 039

## Counts
| Metric | Before | After | Δ |
|---|---|---|---|
| Public HTML files | **115** | **115** | 0 |
| New page bases | — | **0** | 0 |
| New public HTML files | — | **0** | 0 |
| Admin menu items (sitewide `.nav-panel .nav-item`) | **50** | **50** | 0 |
| Admin category items | 5 | 5 | 0 |
| Admin category planned «قريبًا» | 2 | **0** | −2 |

## Exact routes (final)
- `materials` → `library.html#view=materials` (+ `library.en.html#view=materials`)
- `certificateRequests` → `certificates.html#view=requests` (+ `certificates.en.html#view=requests`)
- (optional) `books` → `library.html#view=books` (+ `.en`)

`sidebar.js langRoute()` is already hash-aware (Spec 035) → EN deep-links resolve to `library.en.html#view=…` /
`certificates.en.html#view=…`. enhance.js `initTabs()` opens the hashed tab on fresh load.

## Nav status changes (exactly)
2 flips (`materials`, `certificateRequests`: `planned → implemented`) + drop `FUTURE_ROUTES.materials`
(+ optional 1 `books` route refinement). No other nav item touched. FUTURE_ROLE untouched. Finance 1 lock
(`classSalaryReport`) untouched. Settings ×6 planned untouched (owner 040).

## Page-registry / build impact
`scripts/build-html.mjs` **0-diff** (no new PAGES entry). `library.js`/`certificates.js`/fixtures **0-diff**
(surfaces already built). `i18n.js` **0-diff** (labels already exist). Expected changed source files:
`src/js/nav.config.js` (2 flips + FUTURE_ROUTES trim [+ optional books]) and `tests/*` (see below). Optionally
`app.css` **0-diff** (no new component).

## Protected tests requiring amendment (declared supersessions — the ONLY permitted test changes)
Per Agent-C audit of `tests/smoke/run.cjs`. Everything not listed here stays **byte-verbatim**.

### Amendment 1 (behavioral repoint — sanctioned, mirrors Specs 034/035/036)
- **Location:** `tests/smoke/run.cjs` ~lines 223–230 (dashboard planned-item probe).
- **Current assertion:** reveals the **admin** category, clicks `.cat-panel:not([hidden]) .nav-item.is-planned`,
  and asserts the coming-soon toast fires (`ok(!rPlanned, …)`).
- **Why it must change:** after the flip the admin category has **0** planned items → the selector returns null →
  the assertion fails for a reason unrelated to the behavior under test.
- **Required amendment:** repoint the probe from `admin` to **`settings`** (which still has 6 planned items —
  owner Spec 040), so the coming-soon-toast coverage is preserved. Update the adjacent comment.
- **Preserved:** the toast-behavior assertion logic itself (byte-identical except the category id + comment).

### Amendment 2 (message correction + additive companion assert — sanctioned)
- **Location:** `tests/smoke/run.cjs` ~line 1636 (`nav010.admItems.length === 5 && !includes('banks')`).
- **Current:** count assertion passes unchanged (still 5 items), but the message text says "5 **planned** items"
  which is now inaccurate.
- **Required amendment:** correct the message text; **add** a companion `admPlanned === 0` assertion mirroring the
  existing families/teachers/reports "zero planned" asserts (lines ~1387/1407/1425). Additive; the original count
  + no-banks assertion stays byte-verbatim.

### Additive new coverage (no existing assertion weakened)
- New per-item route asserts (AR + EN), mirroring the Spec 037/038 nav-route pattern:
  - `materials` is an implemented anchor whose href resolves to `library.html#view=materials` (not «قريبًا»,
    no `aria-disabled`, no lock); fresh-load opens the Materials tab (`data-tabpanel="materials"` visible).
  - `certificateRequests` → `certificates.html#view=requests`; fresh-load opens the Requests tab.
  - (if `books` refined) `books` → `library.html#view=books`.
- Optional a11y rows (library `#view=materials` / certificates `#view=requests`, AR/EN light/dark, mobile 390,
  open review/create drawer) and screenshot frames — additive.

### Explicitly NOT changed (byte-verbatim)
`navCount32 === 50`; `nav010.admItems.length === 5 && !includes('banks')` (the count+banks clause);
`truth010.badPlanned === 0`; the `a31` library/certificates block (tabIds, rows, gates, no file/canvas/password,
tab-switch); link-integrity crawl; finance nav010 (`lockedFin`/`finLinks`); families/teachers/reports nav
asserts; payHit/tchPay/famPay/payFigure/child-view/no-mutation/FAKE/Spec-031-honesty asserts.

## Unrelated pages that MUST stay byte-identical
Every `#page-body` except the shared admin sidebar (which changes on all 52 admin pages because 2 «قريبًا»
buttons become anchors). `library.html`/`certificates.html` **bodies** stay byte-identical (only their nav
changes) — the tabs already existed. All 16 portal pages, index, and every non-content admin body byte-identical.
Proof method (implementation phase): captured `#page-body` md5 snapshot vs post-build (non-destructive; no stash).

## No preselected count without evidence
Option A (+4 → 119) and Option C (0, dishonest) are quantified in `page-vs-fold-decision-register.md`. Evidence
(surfaces already built + Spec 033 roadmap + Spec 037/038 precedent) selects **Option B: count held 115**.
