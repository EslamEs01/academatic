# Count & Route Contract (Spec 040)

## 1. The contract

| Metric | Before (verified) | After (contracted) | Δ |
|---|---|---|---|
| Public HTML pages | **115** | **115** | **0** |
| New page bases | — | **0** | 0 |
| Build registry (`PAGES` in `scripts/build-html.mjs`) | 58 bases | **58 bases — 0-diff** | 0 |
| Admin menu items | **50** | **50** | 0 |
| Settings category items | **7** | **7** | 0 |
| Settings planned («قريبًا») | **6** | **0** | **−6** |
| Sitewide planned | **6** | **0** | **−6** |
| Categories containing a planned item | 1 (settings) | **0** | −1 |
| Disabled locks | **1** (`classSalaryReport`) | **1 — unchanged** | 0 |
| `FUTURE_ROUTES` entries | **0** (already `{}`) | **0** | 0 |
| New `data-*` hooks | — | **0** | 0 |
| New storage keys | — | **0** | 0 |
| New dependencies / `package.json` | — | **0-diff** | 0 |

## 2. The six routes (exact)

| Nav id | AR route | EN route (resolved by the hash-aware `langRoute()`) |
|---|---|---|
| `settingsGeneral` | `settings.html#view=general` | `settings.en.html#view=general` |
| `settingsIntegrations` | `settings.html#view=integrations` | `settings.en.html#view=integrations` |
| `settingsCustomization` | `settings.html#view=customization` | `settings.en.html#view=customization` |
| `settingsNotifications` | `settings.html#view=notifications` | `settings.en.html#view=notifications` |
| `settingsSecurity` | `settings.html#view=security` | `settings.en.html#view=security` |
| `settingsUsers` | `settings.html#view=users` | `settings.en.html#view=users` |

The tab ids are **not** changed — they already are `general · notifications · customization · security · users · integrations` (asserted byte-verbatim at `smoke:1194`). The routes are built from the ids that already exist. This is what makes the deep-links free.

## 3. Exact nav changes (`src/js/nav.config.js` — the ONLY navigation-source edit)

For each of the six items at lines 110–115: **add `route: 'settings.html#view=<tab>'`** and **remove `status: 'planned'`**. Because `item()` defaults `status` to `implemented` when a route is present, and the build-time guard (L151–157) forbids a route on a non-implemented item, adding the route *is* the flip — and a mistake cannot ship (the build throws).

`FUTURE_ROUTES` stays `{}` — **no settings entry may be added to it**; the six are real routes, not future ones.

`classSalaryReport` (L90) is **untouched**: `status:'disabled'`, `reasonKey:'nav.reason.finance'`, no route. A disabled lock is categorically not a planned item and this spec must not blur the two.

## 4. Impact-protection boundary

**Files permitted to change** (implementation phase):

| File | Change |
|---|---|
| `src/js/nav.config.js` | the 6 route flips (only) |
| `src/js/pages/settings.js` | the six tabs' form completion |
| `src/js/fixtures/settings.js`, `fixtures/settings-management.js` | authored settings/provider data — **no credential, no pay figure, no PII** |
| `src/locales/ar.adm.js`, `en.adm.js` (and/or `ar/en.extra.js`) | new mirrored keys — **0 divergence** |
| `src/styles/app.css` | additive classes only |
| `tests/smoke/run.cjs`, `tests/a11y/run.cjs`, `tests/screenshots/capture.cjs` | the two declared supersessions + additive coverage |
| `screenshots/REVIEW.md`, `app/README.md`, `CLAUDE.md` | documentation |
| *(conditional, Option A of Supersession 2)* `src/js/pages/gallery.js` | one planned-nav-item component specimen |

**Files that must be 0-diff**: `package.json` · `scripts/build-html.mjs` · `src/js/enhance.js` · `src/js/i18n.js` · `src/js/components/tabs.js` · `src/js/components/sidebar.js` · every other `pages/*.js` and `fixtures/*.js`.

**Generated-HTML impact**:

| Set | Expected delta |
|---|---|
| `settings.html` / `settings.en.html` | **body changes** (the completed forms) |
| The other 62 admin pages (×2 langs) | **shared sidebar only** — the six «قريبًا» buttons become six anchors. **`#page-body` must be byte-identical.** |
| The 51 non-admin pages (16 portal pages + index + portal internals) | **byte-identical** |
| *(conditional)* `gallery.html` / `gallery.en.html` | body changes, if Supersession 2 Option A is taken |

**Verification method** (the Spec 039 non-destructive form — **no stash, no reset, no checkout-discard, no branch switch, no file overwrite**): read the committed baseline via `git show`, capture the normalized `#page-body` md5 for all 115 pages, rebuild, and diff. Any unexpected body delta is a **stop condition**.

## 5. Acceptance

1. `npm run build` produces exactly **115** public HTML files.
2. Smoke asserts: 115 pages · 50 admin menu items · 7 settings items · **0** settings planned · **0** sitewide planned · the six exact anchors (AR + EN) · the six discriminating deep-links · `classSalaryReport` still an honest lock · `FUTURE_ROUTES` free of all six ids · no nav item with `status === 'planned'`.
3. No duplicate page, no duplicate route, no orphan route, no missing mirror.
4. a11y: **critical = 0, serious = 0**. Screenshots: **0 console errors**. **0 external requests.**
5. Every protected assertion listed in `protected-test-supersession-register.md` remains **byte-verbatim**.
