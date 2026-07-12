# Contract — Page Count & Route Freeze (Spec 040)

Baseline: **HEAD `58a53e2`**. All counts below are `before` = the built tree at `58a53e2`.

---

## 1. The freeze table (binding)

| Metric | Before | After | Δ |
|---|---|---|---|
| Public HTML files (`find public -maxdepth 1 -name '*.html' \| wc -l`) | 115 | **115** | 0 |
| New page **bases** | 57 | **57** | **0** |
| New public HTML files | — | **0** | 0 |
| `PAGES` entries in `scripts/build-html.mjs` | 57 | **57** | **0-diff** |
| Admin menu items (`.nav-panel .nav-item`) | 50 | **50** | 0 |
| Settings **category** items | 7 | **7** | 0 |
| Settings **implemented** | 1 | **7** | **+6** |
| Settings **planned** | 6 | **0** | **−6** |
| **Sitewide planned** nav items | 6 | **0** | **−6** |
| Categories bearing a planned item | 1 (settings) | **0** | −1 |
| `[data-coming-soon]` per admin page | 6 | **0** | −6 |
| `[data-coming-soon]` sitewide | 6 × 64 admin pages | **0** | — |
| Disabled locks | 1 (`classSalaryReport`) | **1** | 0 |
| `FUTURE_ROUTES` entries | 0 (`{}`) | **0 (`{}`)** | 0 |
| New `data-*` hooks | — | **0** | — |
| New localStorage keys | — | **0** | — |
| New dependencies | — | **0** | — |

Admin-menu category breakdown is **unchanged**:
`control 12 · families 9 · teachers 6 · reports 11 · admin 5 · settings 7 = **50**`.

---

## 2. Rules

1. **Zero new pages, zero new bases.** `scripts/build-html.mjs` is **0-diff**: no `settings-general.html`,
   `settings-notifications.html`, `settings-customization.html`, `settings-security.html`, `settings-users.html`,
   `settings-integrations.html`, `payment-methods.html`, `message-builder.html` — none of these exist and none may be
   created. The six settings domains **resolve in place** as tabs on the EXISTING `settings.html` hub (the
   Spec-030/031/037/038/039 fold precedent).
2. **Zero new tabs.** The six tab ids `general · notifications · customization · security · users · integrations`
   already exist in `pages/settings.js` (`tabs({group:'settings'})`) and are byte-pinned at `smoke:1194`. Spec 040
   completes their **content**, it does not change the tab set.
3. **Zero new routes beyond the six `#view=` hashes.** Each hash targets an existing tab on an existing page. There is
   no new file, no new URL path, no duplicate route.
4. **`FUTURE_ROUTES` stays `{}`.** It is already empty at `58a53e2` (Specs 034/035/037/039 emptied it). Spec 040 adds
   nothing to it: a promoted item carries a real `route` on the item itself, never a placeholder in `FUTURE_ROUTES`.
   After Spec 040 there is **no planned item left to have a future route** — the map is permanently empty by
   construction.
5. **Exactly one disabled lock survives.** `classSalaryReport` (`status:'disabled'`, `reasonKey:'nav.reason.finance'`,
   no route) is an **honest lock**, not a planned item: a real class-salary report requires computed per-class pay,
   which the no-fake-money + pay-free laws forbid without a backend. Spec 040 leaves it byte-untouched. It is
   **never** used as a substitute specimen for the retired planned-item probe.
6. **Status flip ≠ count change.** Flipping `planned → implemented` changes the item's rendered *element*
   (`<button class="nav-item is-planned">` → `<a class="nav-item">`), not the DOM item *count*. Therefore
   `navCount32 === 50` (`smoke:1300`) and `adminMenu === 50` (`smoke:2270`, `:2341`) stay **byte-verbatim**, as does
   the route-freeze-115 block (`smoke:2388-2396`).
7. **Sitewide zero-«قريبًا» is the Spec 040 milestone.** Settings was the LAST planned-bearing category (Spec 039
   cleared admin; 034 Control; 035 families; 036 teachers; 037 reports; 038 finance). After Spec 040 the app makes
   **zero "coming soon" claims** anywhere. The honest test expression of that milestone is
   `planned === 0 && [data-coming-soon] === 0` — not a synthetic planned item kept alive to feed a toast probe.

---

## 3. Route inventory after Spec 040 (settings category, all 7)

| nav id | status | route (AR) | resolves (EN) | target |
|---|---|---|---|---|
| `settings` | implemented | `settings.html` | `settings.en.html` | hub, baked first tab (`general`) |
| `settingsGeneral` | implemented | `settings.html#view=general` | `settings.en.html#view=general` | existing `general` tab |
| `settingsIntegrations` | implemented | `settings.html#view=integrations` | `settings.en.html#view=integrations` | existing `integrations` tab |
| `settingsCustomization` | implemented | `settings.html#view=customization` | `settings.en.html#view=customization` | existing `customization` tab |
| `settingsNotifications` | implemented | `settings.html#view=notifications` | `settings.en.html#view=notifications` | existing `notifications` tab |
| `settingsSecurity` | implemented | `settings.html#view=security` | `settings.en.html#view=security` | existing `security` tab |
| `settingsUsers` | implemented | `settings.html#view=users` | `settings.en.html#view=users` | existing `users` tab |

**7 routes, 1 page, 0 new files.** All six hashes are resolved by the existing tabs precedence
`hash → localStorage(academy.schedView.settings) → baked first tab`; the roving-tabindex keyboard behaviour is
unchanged.

---

## 4. Link integrity (why the hashes are safe)

`smoke:1684` strips the fragment **before** the `VALID_FILES` lookup, so `settings.html#view=general` is validated as
`settings.html` — a real, built file. The link-integrity block (`smoke:1691-1693`, `deadHash`/`badTarget` = 0) and
`deadNav` (`smoke:137-139`, `:172`) therefore stay **byte-verbatim** and green. No `href="#"` is introduced (the
sitewide zero-`href="#"` law from Spec 011 holds).

---

## 5. Body-change budget (see also `../contracts/scope-guard.md`)

| Set | Files | Change |
|---|---|---|
| Body allowlist | `public/settings.html`, `public/settings.en.html` | **2** — full `#page-body` rewrite (six completed tabs) |
| Sidebar-only | the other **62** admin files (64 admin − 2 settings), incl. `gallery(.en).html` | six `<button …is-planned>` → six `<a>`; **`#page-body` BYTE-IDENTICAL** |
| Byte-identical | the **51** non-admin files (16 portal + portal internals + `index.html`) | **0 bytes** — they do not render the admin sidebar |
| **Total** | 2 + 62 + 51 = **115** ✔ | |

Proof method (non-destructive; **no** stash/reset/checkout): extract `#page-body` from each built file and md5 it
against `git show 58a53e2:academy-dashboard-discovery/app/public/<file>`. Any admin `#page-body` other than
`settings(.en).html` differing ⇒ **STOP**. Any of the 51 non-admin files differing at all ⇒ **STOP**.

---

## 6. Acceptance

1. `npm run build` emits exactly **115** public HTML files; `build-html.mjs` `git diff --stat` = empty.
2. `.nav-panel .nav-item` = **50** on every admin page, AR and EN.
3. Settings category = 7 items / 7 implemented / **0 planned**.
4. Sitewide planned = **0**; sitewide `[data-coming-soon]` = **0**; disabled locks = **1**.
5. `Object.keys(FUTURE_ROUTES).length === 0`.
6. `git diff --stat` shows **0 diff** in `package.json`, `scripts/build-html.mjs`, `src/js/i18n.js`,
   `src/js/enhance.js`, `src/js/components/tabs.js`, `src/js/components/sidebar.js`.
