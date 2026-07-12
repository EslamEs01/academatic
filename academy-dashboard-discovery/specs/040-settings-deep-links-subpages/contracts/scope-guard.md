# Contract — Scope Guard (Spec 040)

Baseline: **HEAD `58a53e2`** (R9: CLAUDE.md's `4cbcb31` is stale — a plan diffed against `4cbcb31` would swallow the
whole of Spec 039 and produce a wrong body-change set). All `git diff` / `git show` / md5 comparisons use `58a53e2`.

---

## 1. ALLOWED files (narrow allowlist — nothing else may be touched)

### 1.1 Application source (7 files)
| # | File | Change |
|---|---|---|
| 1 | `app/src/js/nav.config.js` | the six flips, lines 110-115 (**the ONLY navigation-source edit**). `FUTURE_ROUTES` stays `{}`. |
| 2 | `app/src/js/pages/settings.js` | the hub body — **the only page builder touched** |
| 3 | `app/src/js/fixtures/settings-management.js` | **extended** (identity · automation · 13 brand/status colours · appearance selects · 4 security imports · backup · providers 7→11 + `PROVIDER_FIELDS`) |
| 4 | `app/src/js/fixtures/settings-notifications.js` | **NEW** (`NOTIF_GROUPS` 9 groups / 47 controls + `CHANNEL_OPTS` 5 values `0/1/3/4/5` — **no value 2**) |
| 5 | `app/src/locales/ar.adm.js` | extended `adm.set.*` |
| 6 | `app/src/locales/en.adm.js` | extended, **mirrored, 0 divergence** |
| 7 | `app/src/styles/app.css` | **ADDITIVE ONLY** — `.set-struct`, `.set-acc` / `.set-acc > summary`, `.set-swatch`. No token change, no chip tone, no framework. Precedent: `.cc-*` (034), `.finm-*` (038), `.cert-stage` (031). Additive CSS is **not** a hook. |

### 1.2 Tests / docs (allowed to change)
`app/tests/smoke/run.cjs` (2 declared supersessions + 2 sanctioned strengthenings + an additive Spec-040 block) ·
`app/tests/a11y/run.cjs` (+rows) · `app/tests/screenshots/capture.cjs` (+`sp040-*` frames, re-baseline
`dashboard__ar__light__desktop__cat-settings.png` at `capture.cjs:62`) · `app/screenshots/REVIEW.md` ·
`app/README.md` · `CLAUDE.md` · the Spec 040 directory · regenerated `app/public/*.html` (per §2).

### 1.3 Regenerated HTML — the body-change allowlist
| Set | Files | Allowed change |
|---|---|---|
| Body allowlist | `public/settings.html`, `public/settings.en.html` | **2** — full `#page-body` rewrite |
| Sidebar-only | the other **62** admin files (incl. `gallery(.en).html`) | six planned buttons → six anchors; **`#page-body` BYTE-IDENTICAL** vs `git show 58a53e2:…` |
| Byte-identical | the **51** non-admin files (16 portal + portal internals + `index.html`) | **0 bytes** |

`gallery(.en).html` is **NOT** in the body allowlist. Under Decision 2 (Option C — retire the planned-item click
probe) **no nav specimen is added to the gallery body**; gallery changes sidebar-only like the other 61.

---

## 2. FORBIDDEN to change — 0-diff (verify with `git diff --stat`; any diff ⇒ **STOP**)

```
package.json
scripts/build-html.mjs
src/js/enhance.js
src/js/i18n.js
src/js/components/tabs.js
src/js/components/sidebar.js
src/js/components/settings-section.js
src/js/components/form-field.js
src/js/components/preview-drawer.js
src/js/components/ui.js
src/js/fixtures/settings.js
src/js/fixtures/staff-management.js
src/js/fixtures/form-options.js
src/js/pages/staff.js
every other src/js/pages/*.js
every other src/js/fixtures/*.js
every other src/locales/*.js
every portal / teacher / family / student page and fixture
```

**Why `form-field.js` and `settings-section.js` are on this list.** Booleans are **not** rendered by a new `field()`
type. Every toggle goes through the **already-existing** `settingsSection({rows:[{control:{kind:'toggle'}}]})` path
(`settings-section.js:26-31`) which emits `<button class="toggle" data-toggle data-toast=…>` — the **existing**
`data-toggle` hook and the **existing** `.toggle/.knob/.is-on` CSS. Therefore **no new `data-*` hook, no new
localStorage key, no new component**. (A new `field()` *type* would not violate the closed-hook law, but it **is** a
component change — `form-field.js` would lose its 0-diff — and Spec 040 does not need one. Adding one requires a
declared amendment.)

`src/js/i18n.js` is 0-diff because the `ar.adm` / `en.adm` pair is **already registered**.

---

## 3. Forbidden-token greps (run on the BUILT `public/settings.html` + `public/settings.en.html`, and sitewide)

### 3.1 Secrets / credentials — census must be **0**
```bash
grep -nE 'type="password"|type=file|type="file"'                 public/settings*.html   # → 0
grep -niE 'name="[^"]*(pass|secret|api|key|token|webhook|card|cvv)' public/settings*.html # → 0
grep -niE 'id="[^"]*(pass|secret|api|key|token|webhook|card|cvv)'   public/settings*.html # → 0
grep -niE 'sk_live|pk_live|Bearer |client_secret=|hmac|smtp_password' public/settings*.html # → 0
```
- **R1 (highest risk):** `smoke:1174` `a31.credInputs` asserts **0** inputs whose **name or id** matches
  `/pass|secret|api|key|token|webhook|card|cvv/i` on **every** page. Naming law for all **73** new fields: **no**
  `pass`, `secret`, `api`, `key`, `token`, `webhook`, `card`, `cvv` substring in any `name`/`id`.
  Legacy `card_style` → our input **MUST** be named **`cust-surface`** (a name containing `card` fails the test).
- All **24** sensitive integration fields (15 incoming + 7 payout + 2 SMTP) are **STRUCTURE-ONLY rows**
  (`{labelKey, required, purposeKey}` — **never a `value`**): 0 inputs, 0 values, 0 `type=password`.

### 3.2 Files / canvas / PDF-ish
```bash
grep -nE 'type=file|<canvas|draggable|window\.open|blob:|createObjectURL|\.pdf"|[^-\w]download=' public/settings*.html  # → 0
```
- **R3:** the "Download template" control is a **`<button>` gate**, never `<a download=…>`. The **word** "download"
  in a label is safe; the **attribute** is not (`g32.pdfish` regex).
- The 4 security imports and the logo upload are **GATES** — 0 `type=file` anywhere.

### 3.3 Pay / currency — teacher pay-free GLOBAL + `a31.currency === 0`

**The law bans the FIGURE, never the honest word.** Two lawful words survive on this hub and MUST NOT be grepped to
zero: the notifications section title **"Salary events"** / «إشعارات الرواتب» (a routing category — the Spec-030
figure-free finance Salaries tab is the precedent) and the provider **names** "Paymob Payout" / "Payoneer Payout".
A grep that returns 0 for the bare words `salary` / `payout` is **wrong** and would fail an honest build.

```bash
# currency tokens — absolute zero
grep -nE 'ريال|SAR|جنيه|EGP|AED|EUR|\$|€|£'                       public/settings*.html   # → 0

# pay FIGURE — a pay token adjacent to a digit
grep -niE '(salary|رواتب|hour[-_ ]?rate|أجر الساعة|\bfine\b|غرامة|payout)[^<]{0,24}[0-9]' public/settings*.html # → 0

# the 11 excluded legacy pay names — absolute zero (built HTML AND source, comments included)
grep -nE 'settings_data\[|salary_period|applayFins|fin\[|rate_student_absent|hours-input|rate-input' \
     public/settings*.html src/js/pages/settings.js src/js/fixtures/settings-*.js src/locales/*.adm.js   # → 0
```
- **EXCLUDED BY LAW (11 legacy pay controls, never rendered):** `settings_data[1]` · `hours-input` (rate tier) ·
  `rate-input` → `settings_data[<hours>]` · `salary_period_type` · `salary_period_day` · `applayFins` ·
  `hours-input` (fine tier) · `fin[10]` · `hours-input` (empty fine tier) · `rate-input` → `fin[<minutes>]` ·
  **`rate_student_absent`**. Their section headers ("Hour Rates" / "Salary" / "Salary Tiers") and help copy are
  **not rendered**.
- The `currency` import column is **REJECTED** in all three imports that carry it; provider copy carries **no**
  currency symbol. ("Saudi Arabia" is safe — `\bSAR\b` does not match it.)
- The Notifications `salaries` row is a **routing-only channel select** — 0 amount/rate/currency token.
- The legacy WhatsApp card copy mentioning "salary reports" is **not reproduced**.

### 3.4 Fake status / fake success — TWO different scopes (do not merge them)
```bash
# (a) fake SUCCESS — text-scoped, absolute zero
grep -niE 'تم الحفظ|\bsaved\b|بنجاح|\bsuccessfully\b|تم الربط|\bdone\b'   public/settings*.html   # → 0

# (b) fake CONNECTED — CHIP-scoped, token-absolute. NEVER a body-wide /connected/i grep: the honest
#     backendRequired sentence "available once the server is connected" legitimately contains the word.
node -e "const fs=require('fs');for(const f of ['public/settings.html','public/settings.en.html']){
  const chips=(fs.readFileSync(f,'utf8').match(/<span[^>]*class=\"[^\"]*chip[^\"]*\"[^>]*>[\s\S]*?<\/span>/g)||[]);
  console.log(f, chips.filter((c)=>/متصل|connected/i.test(c)).length);}"                          # → 0  0
```
- **No provider status may read "Connected" — or "not connected".** All 11 carry a chip from the CLOSED three-state
  vocabulary («غير مُعدّ» / "not configured" · «يتطلّب ربط الخادم» / "requires the server" · «غير متاح» /
  "unavailable"), using only the six sanctioned tones `live|upcoming|completed|cancelled|amber|neutral` (**R6** — a
  7th tone throws at build, `build-html.mjs:168-175`). The token «متصل»/`connected` may not appear in a chip in any
  form, because the census must be token-absolute (see (b)).
- **R5 — toggle honesty:** all **49** `data-toggle` previews carry the **backendRequired** `data-toast`
  («يُتاح بعد ربط الخادم» / "available once the server is connected") — **never** `set.savedToast` / «تم الحفظ» /
  "saved". Each toggle-bearing section carries a visible preview-only note plus **ONE** gated Save
  (`data-disabled-reason`).
- ⚠ **Preview-note copy trap (binding):** the note is «معاينة فقط — لا يُخزَّن أي تغيير قبل ربط الخادم.» /
  **"Preview only — nothing is stored until the server is connected."** The naive «معاينة فقط — لا يتم الحفظ» /
  "preview only — **not saved**" would **fail grep (a)** on an honest build («يتم الحفظ» contains «تم الحفظ»;
  "not saved" contains `\bsaved\b`). Use "stored" — never "saved".
- The legacy WhatsApp 7-code enum (UNKNOWN/PAIRING/DISCONNECTED/CONNECTING/CONNECTED/IDLE/STOPPED) is **documented in
  a fixture comment, never simulated** — no Laravel Echo, no websocket, no `/broadcasting/auth`, no polling.

### 3.5 Closed hook set
```bash
git diff 58a53e2 -- app/src/js | grep -nE '^\+.*data-[a-z-]+='   # → only EXISTING hooks
git diff 58a53e2 -- app/src/js | grep -nE "^\+.*localStorage"    # → 0
git diff 58a53e2 -- app/package.json                             # → empty
```
Existing hooks only: `data-tab` · `data-drawer` · `data-modal-trigger` · `data-confirm` · `data-disabled-reason` ·
`data-toggle` · `data-toast` · `data-set-theme` · `data-set-lang` · `data-filter`. **Zero** new `data-*`, **zero**
new localStorage key (`academy.theme` / `academy.lang` / `academy.schedView.*` only), **zero** new dependency, **zero**
backend/API.

### 3.6 Drawer register (R4 — a spec failure if skipped)
`FORM_DRAWERS_032` (`smoke:92`) `settings:` **must** list all 12:
`['head-add','integ-stripe','integ-paypal','integ-mollie','integ-xpay','integ-payoneer','integ-paymob','integ-custom','integ-paymob-payout','integ-payoneer-payout','integ-whatsapp','integ-email']`.
Each must satisfy: ≥1 `input/select/textarea` · ≥1 `[data-disabled-reason]` · **≤1** `.btn-primary[data-disabled-reason]` ·
0 OMIT-named inputs (`/pass|secret|api[-_]?key|token|webhook|otp|salary|hour[-_]?rate|fine|payout|iban|cvv/i`) ·
0 `<canvas>`. **An unregistered drawer silently escapes the audit — that is a failure, not a pass.**

---

## 4. Protected asserts — changeable ONLY via the declared supersessions

| Site | Change | Class |
|---|---|---|
| `smoke:1446` | `nav039.settingsPlanned === 6` → `=== 0` | **declared supersession 1** (strengthening) |
| `smoke:2340` | `nav.settingsPlanned === 6` → `=== 0` | **declared supersession 1** |
| `smoke:223-230` | the `.nav-item.is-planned` CLICK probe → **RETIRED**, replaced by a zero-census | **declared supersession 2** |
| `smoke:1196` | `a31.gates >= 4` → `>= 20` | sanctioned **strengthening** |
| `smoke:92` | `FORM_DRAWERS_032.settings` 1 → 12 | sanctioned **strengthening** (register completion) |

**Everything else BYTE-VERBATIM**, including: `clickFeedback` (`:206-215`) · the four dashboard feedback selectors +
loop (`:216-222`) · the **is-disabled reason-toast probe** (`:231-240` — still valid; `classSalaryReport` is an honest
lock) · the category-switch probe (`:241-251`) · `truth010` (`:1696-1706` — `badPlanned` becomes **vacuously** true,
so it is **preserved, not superseded**) · `deadNav` (`:137-139`, `:172`) · link-integrity (`:1691-1693`) ·
`navCount32===50` (`:1300`) · `adminMenu===50` (`:2270`, `:2341`) · route-freeze 115 (`:2388-2396`) · the settings
tab-id contract (`:1194`) · the Spec-031 settings honesty asserts (`:1172-1176`) · the sitewide `g32` MUST-GATE freeze
(`:1288-1297`) · every finance-lock assert · `payHit` / `tchPay` / `famPay` / `payFigure` / child-view / FAKE /
raw-key / external-request guards.

**Never point the retired probe at `classSalaryReport`** — a `disabled` lock is categorically not a planned item.
**Never keep one dishonest planned nav item alive to feed a test** (violates the honesty law).

---

## 5. STOP CONDITIONS (any one fires ⇒ halt, do not commit)

1. Any diff in a §2 forbidden file.
2. Public HTML ≠ **115** · `PAGES` ≠ **57** · `.nav-panel .nav-item` ≠ **50** · settings items ≠ **7**.
3. Sitewide planned ≠ **0** · `[data-coming-soon]` ≠ **0** · disabled locks ≠ **1** · `FUTURE_ROUTES` ≠ `{}`.
4. Any `input[type=password]`, `input[type=file]`, `<canvas>`, `draggable`, `download=`, `window.open`, or any
   authored secret / API-key / token / webhook **value**.
5. Any chip carrying «متصل»/`connected` (in **any** form); any toast/label reading "saved / تم الحفظ / بنجاح / done".
   **Zero new `data-confirm`** is added by this spec (Ledger §G) — a confirm chain in front of an inert gate is a
   STOP condition, not a nicety.
6. Any teacher **pay figure** (salary / rate / fine / payout / currency amount) on the settings body; `a31.currency > 0`.
7. Any new `data-*` hook, new localStorage key, or new dependency.
8. Any protected assert changed outside the two declared supersessions + the two sanctioned strengthenings (§4).
9. Any admin `#page-body` other than `settings(.en).html` differing in md5 from `git show 58a53e2:…`; any of the 51
   non-admin files differing at all.
10. AR/EN `adm.*` key-set divergence ≠ **0**.
11. A UI must be invented for Message Builder (legacy = HTTP 504, `isErrorPage:true`, all-zero `domSummary` — **zero
    UI evidence**). The existing honest gate (`adm.set.cust.msgBuilder` + `adm.set.cust.msgBuilderReason`, shipped by
    Spec 031) stays **unchanged**; capability owner = **Spec 053**, placement custodian = **Spec 048**.
12. WhatsApp **insights** pages are required (EXCLUDED entirely — live joinable invite URL, unmasked phones/emails,
    egress of real names to `ui-avatars.com`; owner **Spec 043**).

## 6. Process guards
Non-destructive verification only: **no** `git stash` / `reset` / `checkout --` / `clean`. Impact is proven by
`git show 58a53e2:<path>` + md5 of the extracted `#page-body`. **No commit, no push, no branch cut** — the watcher
commits. No `tasks.md` written by a plan-authoring agent.
