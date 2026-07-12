# Contract — Smoke Coverage (Spec 040)

**Baseline: HEAD `58a53e2`** (`app/tests/` byte-identical to HEAD). Companion to
`protected-test-supersession-contract.md`: that file governs what may **change**; this file governs what is
**added**. Everything here is **ADDITIVE** — new blocks appended at named insertion points in
`app/tests/smoke/run.cjs`. No existing assertion is touched by anything in this contract (the only exceptions are
S1/S2/T1/T2, declared in the supersession contract).

House rule reaffirmed: **a Spec-040 assertion may only fail because the product is wrong.** Every probe below reads
the built `public/*.html` (or the nav source), never a fixture.

---

## 0. Insertion map

| Block | Where | Scope of execution |
|---|---|---|
| **B1** — zero-census (S2 replacement) | `run.cjs:223-230`, inside `if (page === 'dashboard')` | dashboard × AR/EN |
| **B2** — `nav040` sidebar block: 6 anchor asserts + census | appended after `:1446`, inside the existing `if (!PORTAL_PAGES.has(page))` Spec-039 block | **every admin page × AR/EN** (64 × 2) |
| **B3** — settings-hub content block (fields / toggles / structure rows / gates / no-secret / no-pay / no-fake) | appended after the Spec-031 `if (page === 'settings')` block (`:1193-1197`), inside the same `page === 'settings'` guard | settings × AR/EN |
| **B4** — six fresh-context `#view=` deep-link tests | after the Spec-039 `SP039_DEEPLINKS` loop (`:2276-2313`), **before** `await browser.close()` | 6 views × AR/EN = 12 contexts |
| **B5** — `nav.config` SOURCE audit | appended inside the existing post-`browser.close()` block (`:2347-2363`) — `byId` and `navSrc` are already in scope | once |
| **T2** — `FORM_DRAWERS_032.settings` (register) | `:92` | drags the 11 `integ-*` drawers through the **existing, unchanged** Spec-032 audit (`:1213-1260`) |

---

## 1. B2 — the six settings deep-links in the shared sidebar (AR + EN, every admin page)

Mirrors the Spec-039 pattern exactly and **reuses `anchorOk039` (defined at `:1442` — re-verified in the tree at
`58a53e2`; the Ledger's "`:1444`" is an off-by-two typo) unchanged**:

```js
const anchorOk039 = (o, re) => !!o && o.a && !o.soon && !o.disabled && !o.lock && re.test(o.href);
```

```js
        // ===== Spec 040 — settings nav completion: the six settings items are real deep-links into the
        // EXISTING settings hub tabs (no new page, no new tab). Settings was the LAST planned-bearing
        // category, so this block also carries the sitewide zero-census. =====
        const nav040 = await p.evaluate(() => {
          const info = (id) => { const n = document.querySelector(`.nav-item[data-nav="${id}"]`); return n ? { a: n.tagName === 'A', href: n.getAttribute('href') || '', soon: n.hasAttribute('data-coming-soon'), disabled: n.getAttribute('aria-disabled') === 'true', lock: !!n.querySelector('use[href="#i-lock"]') } : null; };
          return {
            gen: info('settingsGeneral'), integ: info('settingsIntegrations'), cust: info('settingsCustomization'),
            notif: info('settingsNotifications'), sec: info('settingsSecurity'), users: info('settingsUsers'),
            plannedTotal: document.querySelectorAll('.nav-panel .nav-item.is-planned').length,
            comingSoon: document.querySelectorAll('[data-coming-soon]').length,
          };
        });
        const rx = (t) => new RegExp(`(^|/)settings\\.(en\\.)?html#view=${t}$`);
        ok(anchorOk039(nav040.gen,   rx('general')),        `${page}/${lang}: settingsGeneral must be a real deep-link → settings.html#view=general, got ${JSON.stringify(nav040.gen)}`);
        ok(anchorOk039(nav040.notif, rx('notifications')),  `${page}/${lang}: settingsNotifications → settings.html#view=notifications`);
        ok(anchorOk039(nav040.cust,  rx('customization')),  `${page}/${lang}: settingsCustomization → settings.html#view=customization`);
        ok(anchorOk039(nav040.sec,   rx('security')),       `${page}/${lang}: settingsSecurity → settings.html#view=security`);
        ok(anchorOk039(nav040.users, rx('users')),          `${page}/${lang}: settingsUsers → settings.html#view=users`);
        ok(anchorOk039(nav040.integ, rx('integrations')),   `${page}/${lang}: settingsIntegrations → settings.html#view=integrations`);
        ok(nav040.plannedTotal === 0 && nav040.comingSoon === 0, `${page}/${lang}: sitewide planned/«قريبًا» must be 0 after Spec 040 (planned=${nav040.plannedTotal}, soon=${nav040.comingSoon})`);
```

**What each clause buys (nothing here is decorative):**

| Clause | Catches |
|---|---|
| `o.a` | the item stayed a `<button>` (promotion not rendered) |
| `!o.soon` | a `data-coming-soon` attribute survived on a promoted anchor |
| `!o.disabled` / `!o.lock` | the item was promoted into a *lock* instead of a link |
| `re.test(o.href)` anchored `$` | a wrong/missing hash (`settings.html` alone ⇒ **FAIL**), a **UK-spelling** `#view=customisation` (Risk: ledger §B spelling trap) ⇒ **FAIL**, a stray query/suffix ⇒ FAIL |
| `(en\.)?` | EN mirroring is produced by the hash-aware `langRoute()` (Spec 035); a broken EN mirror (`settings.html#view=…` on an EN page) still matches `(^\|/)settings\.(en\.)?html#…` — so **B4 (EN deep-link load) is the assertion that actually proves EN**, not this one. Stated so no author believes B2 alone covers EN routing. |
| `plannedTotal === 0` (scoped `.nav-panel`) | any nav item anywhere still claiming «قريبًا» |
| `comingSoon === 0` (**document-wide**, not scoped) | a `data-coming-soon` affordance leaking into a page **body** |

**Ledger counts re-asserted for free by neighbours (byte-verbatim, unchanged):** `navCount32 === 50` (`:1300`),
`admItems.length === 5` (`:1658`), families/teachers/reports/admin planned `=== 0` (`:1387`, `:1407`, `:1425`,
`:1662`), `deadNav === 0` (`:172`), link integrity (`:1691-1693` — `:1684` strips the `#` fragment, so
`settings.html#view=general` resolves to `settings.html` ∈ `VALID_FILES`).

---

## 2. B4 — the six `#view=` deep-links open EXACTLY ONE tabpanel, on a FRESH context, AR + EN

Follows `SP039_DEEPLINKS` (`:2276-2313`) verbatim in shape. The **discriminating** trick is retained and is the
whole point: the stored view is pre-seeded to a **different** tab, so a passing run proves the **hash beats
localStorage**. Without the seed, `#view=general` would pass even with JS disabled (`general` is the baked first
tab).

```js
  // ===== Spec 040 — settings deep-links: settings(.en).html#view=<tab> must OPEN the matching tab on a
  // FRESH context (the nav link is followed, so there is no in-page state to lean on). Each view is loaded with
  // a DIFFERENT tab pre-seeded as the stored view (academy.schedView.settings) → the hash must WIN. =====
  const SP040_VIEWS = {
    general: 'integrations', notifications: 'general', customization: 'general',
    security: 'general', users: 'general', integrations: 'general',
  };
  for (const lang of ['ar', 'en']) {
    const file = lang === 'en' ? 'settings.en.html' : 'settings.html';
    for (const [view, seed] of Object.entries(SP040_VIEWS)) {
      const ctx = await browser.newContext();
      await ctx.addInitScript((o) => { try { localStorage.setItem('academy.schedView.settings', o); } catch (e) { /* ignore */ } }, seed);
      const p = await ctx.newPage();
      const dext = [];
      p.on('request', (r) => { const u = r.url(); if (!u.startsWith(BASE) && !u.startsWith('data:')) dext.push(u); });
      await p.goto(`${BASE}/${file}#view=${view}`, { waitUntil: 'networkidle' });
      await p.waitForTimeout(220);
      const r = await p.evaluate(() => {
        const vis = [...document.querySelectorAll('[data-tabs="settings"] [data-tabpanel]')].filter((x) => !x.hidden);
        const body = document.getElementById('page-body');
        return {
          active: vis.length === 1 ? vis[0].getAttribute('data-tabpanel') : `n=${vis.length}`,
          noFake: !/<canvas|chart\.js|data-chart/i.test(body.innerHTML)
            && body.querySelectorAll('input[type=file],input[type=password]').length === 0,
        };
      });
      ok(r.active === view, `settings/${lang}: nav deep-link #view=${view} did not open the ${view} tab (active=${r.active}; the URL hash must beat the stored view '${seed}')`);
      ok(r.noFake, `settings/${lang}: the ${view} deep-link tab must not add a canvas/chart or type=file/password`);
      ok(dext.length === 0, `settings/${lang}: deep-link #view=${view} navigation triggered external request(s) ${JSON.stringify(dext.slice(0, 2))}`);
      await ctx.close();
    }
  }
```

- `active` is `n=<count>` when the visible-panel count ≠ 1 → **"exactly one visible tabpanel"** is asserted by
  construction, and a two-panels-visible regression names itself in the failure message.
- **`general` is seeded with `integrations`** (not `general`) — otherwise the general case is vacuous.
- 12 fresh contexts (6 views × AR/EN); **0 external requests** on every one (STOP condition: any request whose URL
  is neither `BASE` nor `data:` — the sitewide `ext` guard already forbids CDNs/fonts/avatars; this re-proves it on
  the *hash-navigated* load).
- **Keyboard/roving-tabindex** coverage for the settings tablist is added in `app/tests/a11y/run.cjs` (ArrowRight/
  ArrowLeft over the 6 tabs, AR + EN) — the Spec-039 precedent. Not duplicated here.

---

## 3. B5 — the `nav.config` SOURCE audit (the one thing the DOM cannot prove)

The DOM shows what was *rendered*; only the source shows that a promoted item is really `implemented` with a real
`route` and that no stale `FUTURE_ROUTES` placeholder survives. Appended to the existing post-`browser.close()`
block (`:2347-2363`), where `navSrc` and `byId` already exist.

```js
    // ===== Spec 040 — settings nav SOURCE audit: the six settings items must be implemented with the EXACT
    // deep-link routes, ZERO planned items may remain anywhere, exactly ONE honest lock (classSalaryReport)
    // survives, FUTURE_ROUTES stays empty, and the admin menu stays 50 items. =====
    const R040 = { settingsGeneral: 'settings.html#view=general', settingsNotifications: 'settings.html#view=notifications',
      settingsCustomization: 'settings.html#view=customization', settingsSecurity: 'settings.html#view=security',
      settingsUsers: 'settings.html#view=users', settingsIntegrations: 'settings.html#view=integrations' };
    for (const [id, r] of Object.entries(R040)) {
      const it = byId('settings', id);
      ok(!!it && it.status === 'implemented' && it.route === r, `nav.config: ${id} must be implemented → ${r}, got ${JSON.stringify(it)}`);
    }
    const all040 = navSrc.NAV_CATEGORIES.flatMap((c) => [...c.items, ...(c.sections || []).flatMap((s) => s.items)]);
    ok(all040.filter((i) => i.status === 'planned').length === 0, 'nav.config: ZERO planned nav items may remain after Spec 040');
    ok(all040.filter((i) => i.status === 'disabled').length === 1, 'nav.config: exactly ONE honest lock (classSalaryReport) may remain');
    ok(Object.keys(navSrc.FUTURE_ROUTES).length === 0, 'nav.config: FUTURE_ROUTES must stay an empty map');
    ok(all040.length === 50, `nav.config: admin menu must stay 50 items, got ${all040.length}`);
```

| Assert | Ledger | Would catch (that no DOM probe can) |
|---|---|---|
| `status === 'implemented' && route === …` ×6 | §A, §B | a route written with a **UK `s`**, with `.en` baked in (routes are authored **without** `.en`; `langRoute()` inserts it), or an item left `planned` while a *body* link happens to exist |
| `planned === 0` | §A (sitewide planned 6 → 0) | a planned item that is simply not rendered on any sampled page |
| `disabled === 1` | §A (locks 1 → 1) | a **new** lock smuggled in, or `classSalaryReport` promoted (complements — never replaces — `:2362`, which stays byte-verbatim) |
| `FUTURE_ROUTES` `{}` | §A | a settings id re-added as a "documented future route" instead of a real one (a promoted item carries a **real** `route`, never a future one — Spec 039's lesson) |
| `all040.length === 50` | §A | a 7th settings item |

The **build guard** `nav.config.js:151-157` (`implemented ⇒ must have route`) fires *before* the suite runs: a flip
without a route never reaches smoke. B5 is the belt to that suspenders — it pins the route **string**, which the
build guard does not.

---

## 4. B3 — the settings-hub content block

Runs inside the existing `if (page === 'settings')` guard, **after** the Spec-031 asserts (`:1193-1197`, all
byte-verbatim: tab-id list, `themeCtl >= 1`, the T1-strengthened `gates >= 20`).

### 4.1 Counting rule (binding — read before writing any assert)

`document.querySelectorAll` **does not descend into `<template>` content** (a `DocumentFragment` is not in the
document tree). Therefore every count below is defined over **two** surfaces and the assert must sum them:

```
SETTINGS_TPLS = ['head-add', 'integ-stripe', 'integ-paypal', 'integ-mollie', 'integ-xpay', 'integ-payoneer',
                 'integ-paymob', 'integ-custom', 'integ-paymob-payout', 'integ-payoneer-payout',
                 'integ-whatsapp', 'integ-email']        // === FORM_DRAWERS_032.settings after T2
inline(sel)   = #page-body.querySelectorAll(sel)                       // rendered, in-tree
templated(sel)= Σ over SETTINGS_TPLS of template.content.querySelectorAll(sel)
total(sel)    = inline(sel) + templated(sel)
```

This is exactly how the Spec-032 audit already reads drawer bodies (`:1230-1233`).

### 4.2 The acceptance numbers (ledger §F.7 — the single source of truth)

`field()` emits exactly one `input|select|textarea`; a boolean is a `<button data-toggle>` (**not** a control); a
sensitive field is a `.set-struct` row (**no** control at all).

| Tab | `field()` inline | `field()` in templates | toggles | `.set-struct` | rendered gates (≈) |
|---|---|---|---|---|---|
| general | **20** (10 identity + 10 automation) | **2** (`head-add`) | 7 | 0 | 5 |
| notifications | **13** (10 channel selects + 3 numbers) | 0 | 34 | 0 | 7 |
| customization | **16** | 0 | 0 | 0 | 3 |
| security | **1** (backup destination) | 0 | 0 | **34** (33 import columns + 2FA) | 12 |
| users | **0** (0-diff) | 0 | 0 | 0 | 0 |
| integrations | **0** (cards only) | **21** (11 `integ-*` drawers) | 8 | **26** | ≈24 |
| **total** | **50** | **23** | **49** | **60** | **≈51** |

`50 + 23 = ` **73** `field()` controls (was **2**) · **49** `[data-toggle]` · **60** `.set-struct` — the ledger
figures, reproduced without addition or invention.

### 4.3 The asserts

```js
        // ===== Spec 040 — the settings hub is COMPLETE and HONEST: exact control census, zero secrets,
        // zero pay figures, zero fake success. (a31's password/file/canvas/credInputs/noPdf/currency asserts
        // above already ran on this page and stay byte-verbatim.) =====
        const s040 = await p.evaluate((tplIds) => {
          const body = document.getElementById('page-body');
          const tpls = tplIds.map((id) => document.querySelector(`template[data-preview="${id}"]`));
          const frags = tpls.filter(Boolean).map((t) => t.content);
          const countAll = (sel) => body.querySelectorAll(sel).length
            + frags.reduce((n, f) => n + f.querySelectorAll(sel).length, 0);
          const panel = (id) => body.querySelector(`[data-tabpanel="${id}"]`);
          const inPanel = (id, sel) => { const el = panel(id); return el ? el.querySelectorAll(sel).length : -1; };
          const CTRL = 'input,select,textarea';
          const names = [...body.querySelectorAll(CTRL),
            ...frags.flatMap((f) => [...f.querySelectorAll(CTRL)])]
            .map((c) => (c.getAttribute('name') || '') + ' ' + (c.getAttribute('id') || ''));
          const text = body.innerText + frags.map((f) => f.textContent).join(' ');
          const html = body.innerHTML + frags.map((f) => { const d = document.createElement('div'); d.appendChild(f.cloneNode(true)); return d.innerHTML; }).join(' ');
          return {
            missingTpl: tplIds.filter((id, i) => !tpls[i]),
            fields: countAll(CTRL),
            toggles: countAll('[data-toggle]'),
            struct: countAll('.set-struct'),
            structCtrls: [...body.querySelectorAll('.set-struct'),
              ...frags.flatMap((f) => [...f.querySelectorAll('.set-struct')])]
              .reduce((n, r) => n + r.querySelectorAll(CTRL).length, 0),
            fGeneral: inPanel('general', CTRL), fNotif: inPanel('notifications', CTRL),
            fCust: inPanel('customization', CTRL), fSec: inPanel('security', CTRL),
            fUsers: inPanel('users', CTRL), fInteg: inPanel('integrations', CTRL),
            usersGates: inPanel('users', '[data-disabled-reason]'),
            usersLink: !!panel('users') && !!panel('users').querySelector('a[href^="staff"]'),
            badName: names.filter((n) => /pass|secret|api|key|token|webhook|card|cvv/i.test(n)).length,
            fakeSaved: /تم الحفظ|\bsaved\b|\bdone\b|بنجاح|\bsuccessfully\b|تم الربط/i.test(text),
            // CHIP-SCOPED and token-absolute. A body-wide /connected/i census is UNWRITABLE: the honest
            // backendRequired sentence "available once the server is connected" contains the word. The honest
            // chips read «غير مُعدّ»/"not configured" — never "not connected" — so a chip carrying متصل/connected
            // in ANY form is a violation.
            connectedChips: [...body.querySelectorAll('.chip'),
              ...frags.flatMap((f) => [...f.querySelectorAll('.chip')])]
              .filter((c) => /متصل|connected/i.test(c.textContent || '')).length,
            pw: countAll('input[type="password"]'), file: countAll('input[type="file"]'),
            canvas: countAll('canvas'),
            currency: (text.match(/ريال|\bSAR\b|جنيه|\bEGP\b|\bAED\b|\bEUR\b|[$€£]/g) || []).length,
            pdfish: /window\.open|blob:|createObjectURL|\.pdf"|[^-\w]download=/i.test(html),
            themeCtl: body.querySelectorAll('[data-set-theme]').length,
          };
        }, FORM_DRAWERS_032.settings);

        ok(s040.missingTpl.length === 0, `settings/${lang}: missing settings drawer template(s): ${JSON.stringify(s040.missingTpl)}`);
        // control census (ledger §F.7): 73 field() controls = 50 inline + 23 in the 12 drawer templates
        ok(s040.fields === 73, `settings/${lang}: expected 73 form controls across the hub + its 12 drawers, got ${s040.fields}`);
        ok(s040.fGeneral === 20 && s040.fNotif === 13 && s040.fCust === 16 && s040.fSec === 1 && s040.fUsers === 0 && s040.fInteg === 0,
          `settings/${lang}: per-tab inline field counts wrong (general=${s040.fGeneral} notif=${s040.fNotif} cust=${s040.fCust} sec=${s040.fSec} users=${s040.fUsers} integ=${s040.fInteg}; expected 20/13/16/1/0/0)`);
        ok(s040.toggles === 49, `settings/${lang}: expected 49 data-toggle previews, got ${s040.toggles}`);
        ok(s040.struct === 60, `settings/${lang}: expected 60 sensitive structure rows (.set-struct), got ${s040.struct}`);
        // a structure row is a ROW, never an input: no control may live inside one
        ok(s040.structCtrls === 0, `settings/${lang}: ${s040.structCtrls} control(s) rendered inside a .set-struct sensitive row — structure rows are label+required+purpose ONLY`);
        // no-secret / no-fake / no-pay
        ok(s040.pw === 0 && s040.file === 0 && s040.canvas === 0, `settings/${lang}: forbidden affordance (pw=${s040.pw} file=${s040.file} canvas=${s040.canvas}) — includes the drawer templates`);
        ok(s040.badName === 0, `settings/${lang}: ${s040.badName} control(s) named pass/secret/api/key/token/webhook/card/cvv — sensitive fields are structure rows, and the legacy card_style control must be named cust-surface`);
        ok(!s040.fakeSaved, `settings/${lang}: a "saved/تم الحفظ/بنجاح" success claim appears — every write is a backendRequired gate or a labelled local preview (NB the preview note must read «لا يُخزَّن أي تغيير» / "nothing is stored", NEVER "not saved"/«لا يتم الحفظ» — both contain the banned token)`);
        ok(s040.connectedChips === 0, `settings/${lang}: ${s040.connectedChips} status chip(s) carry «متصل»/"connected" — provider chips must read «غير مُعدّ»/"not configured" or «يتطلّب ربط الخادم»/"requires the server"`);
        ok(s040.currency === 0, `settings/${lang}: a currency/pay figure appears on the settings hub (${s040.currency}) — pay-free/figure-free`);
        ok(!s040.pdfish, `settings/${lang}: a pdf/blob/window.open/download= affordance leaked into the hub or a drawer — "Download template" must be a <button> gate`);
        // Users tab stays a display-only pointer (Decision 1 / Option A): real staff.html link, RBAC preview, 0 forms
        ok(s040.usersLink && s040.fUsers === 0 && s040.usersGates === 0, `settings/${lang}: the users tab must stay display-only — a real staff.html link, 0 form controls, 0 gates (link=${s040.usersLink} fields=${s040.fUsers} gates=${s040.usersGates})`);
        ok(s040.themeCtl >= 1, `settings/${lang}: the REAL theme control must survive the rebuild`);
```

### 4.4 Why each assert exists (mutation view)

| Assert | Catches |
|---|---|
| `fields === 73` + the per-tab row | a tab shipped half-built (e.g. Notifications' 10 channel selects reduced to 5); a field secretly added to the Users tab; a legacy pay field re-introduced (it would push the count off 73 — and be caught again by `currency`/OMIT) |
| `toggles === 49` | booleans rendered as `<input type=checkbox>` (a **new field() type** ⇒ `form-field.js` loses 0-diff ⇒ STOP condition 1) or dropped entirely |
| `struct === 60` + `structCtrls === 0` | **the central no-secret law**: the 24 sensitive integration fields + 33 import columns + 2FA are rows, not inputs. Any one turned into an input trips `structCtrls`, and if it is *named* like a credential it also trips `badName` **and** `a31.credInputs` (`:1174`) |
| `badName === 0` | **Risk R1**: `credInputs` (computed `:1151`, asserted `:1174`) already bans `pass\|secret\|api\|key\|token\|webhook\|card\|cvv` in `name`/`id` on `input,textarea` **in the body**. B3 widens it to **`select`** and to the **drawer templates**. This is the assert that forces `card_style` → **`cust-surface`** |
| `!fakeSaved` | **Risk R5**: any of the 49 toggles or 51 gates wired to a "saved" toast. (The sitewide `FAKE` regex at `:189` bans «(تجريبي)»/«بنجاح»/`successfully` on `data-toast`/`data-confirm-*` **attributes**; B3 re-greps the whole hub's **text**, body **and template content**, which the attribute-scoped guard does not reach.) **Copy trap, binding:** the mandated preview note must read «معاينة فقط — لا يُخزَّن أي تغيير قبل ربط الخادم.» / "Preview only — nothing is stored until the server is connected" — the naive "preview only — **not saved**" / «لا يتم الحفظ» would trip this very assert (`\bsaved\b`; «يتم الحفظ» contains «تم الحفظ») and red an honest build |
| `connectedChips === 0` | a provider card faking a live connection. **Chip-scoped on purpose**: a body-wide `/connected/i` census is unwritable because the honest backendRequired sentence *"available once the server is connected"* contains the word. Token-absolute inside a chip ⇒ the honest chips must read «غير مُعدّ» / "not configured" (never "not connected") |
| `currency === 0` | **Risk R2** — duplicates `a31.currency` (`:1176`) *inside the drawer templates* too, where the provider copy lives. ("Saudi Arabia" is safe: `\bSAR\b` does not match it.) |
| `!pdfish` | **Risk R3** — the "Download template" control must be a `<button>` gate, **never** `<a download=…>`. (`a31.noPdf` at `:1175` is stricter still: it also bans `.csv"`/`.xlsx"` hrefs.) |
| `usersLink && fUsers === 0 && usersGates === 0` | **Decision 1 (Option A) is enforced, not merely documented**: the Users tab is not allowed to grow a staff form. Guards the `settings.js usersPanel()` / `staff.js` 0-overlap claim, and the `fixtures/settings.js` + `staff.js` + `staff-management.js` 0-diff STOP condition |
| `themeCtl >= 1` | the real `data-set-theme` write survives the Customization rewrite |

### 4.5 What B3 deliberately does NOT assert

- **No word-level pay grep.** The Notifications matrix legitimately carries a `salaries` **routing channel select**
  (ledger §F.2: "routing-only channel select — 0 amount/rate/currency token"), and the Spec-030 finance Salaries tab
  already established that the *word* is admin-sanctioned while the *figure* is not. The law is enforced as
  `currency === 0` (a **figure** grep), exactly as the finance/reports invariants do. The teacher-pay word-greps
  (`PAY28` `:714`, teacher-performance `:1528`, portal `payHit` `:1940`) are **untouched** and do not run on
  `settings`.
- **No new hook probe.** `data-toggle` is the **existing** hook (`components/settings-section.js:26-31`); counting
  it is not the same as sanctioning a new one. The closed-hook law is proven by the 0-diff STOP list
  (`enhance.js`, `form-field.js`, `settings-section.js`, `preview-drawer.js`, `tabs.js`, `sidebar.js`, `i18n.js`),
  not by a smoke assert.

---

## 5. T2 — what the 11 `integ-*` drawers must satisfy (existing audit, unchanged code)

Registering them at `:92` runs them through `:1213-1260` as-is:

| Existing check | Requirement per `integ-*` drawer |
|---|---|
| `out.missing` | the `template[data-preview="integ-<id>"]` exists |
| `out.fieldless` | ≥ 1 `input`/`select`/`textarea` — **a field-less "Configure" drawer is the exact 032 sin** |
| `out.noGate` | ≥ 1 `[data-disabled-reason]`/`[data-confirm]` |
| `out.multiPrimary` | **≤ 1** `.btn-primary[data-disabled-reason]` — one gated final per drawer (Connect **or** Save, never both as primaries) |
| `out.omitLeak` | 0 `type=password`, 0 `type=file`, 0 control named `/pass\|secret\|api[-_]?key\|token\|webhook\|otp\|salary\|hour[-_]?rate\|fine\|payout\|iban\|cvv/i`, 0 `<canvas>` |
| behavioural open (`:1265-1281`) | the first **visible** page-level `[data-drawer]` trigger opens `.drawer.sheet` with ≥1 control **and** the gate final |

Consequence for the **Custom** provider (ledger §F.5 row 7: `name` + a Payment-Details `textarea`, 0 sensitive
rows): it still has 2 controls ⇒ `fieldless` clean. Consequence for **Paymob Payout**: its four credentials —
including the legacy `type=password` `key4` — are `.set-struct` rows, so `omitLeak` is clean **only** because no
input exists. The audit and the law say the same thing from two directions.

> The behavioural open (`:1265-1281`) picks the **first visible** trigger. On `settings` that is inside a
> tabpanel; the Spec-031 tab round-trip (`:1198-1209`) restores `general` first, so the visible trigger will be a
> General-tab one (`head-add`). The `integ-*` drawers are covered **structurally** (template-scoped), exactly as
> kebab-hosted drawers are on other pages. No new interaction code is required.

---

## 6. Coverage ledger — Spec 040 smoke additions

| Coverage | Executions | Block |
|---|---|---|
| 6 settings nav anchors, exact `href` | 64 admin pages × 2 langs × 6 = **768** | B2 |
| sitewide planned/coming-soon `=== 0` | 64 × 2 (+ dashboard census) = **130** | B1 + B2 |
| `#view=` deep-link opens exactly one tabpanel, hash beats stored view | 6 × 2 = **12** fresh contexts | B4 |
| 0 external requests on the hash-navigated load | **12** | B4 |
| control / toggle / structure-row census (body + 12 templates) | 2 (AR/EN) | B3 |
| no-secret · no-fake-connected · no-fake-saved · no-currency · no-pdf | 2 | B3 |
| Users tab display-only (Decision 1) | 2 | B3 |
| 12 settings drawers through the 032 form audit | 2 × 12 | T2 |
| `nav.config` source: 6 routes · planned 0 · locks 1 · `FUTURE_ROUTES` {} · 50 items | 1 | B5 |

**Unchanged and still running on every page:** raw-key, external-request, page-error, `disabledNoReason`, `deadNav`,
`FAKE` success, `href="#"`, `badTarget`, `g32` (pw/file/canvas/pdfish), `navCount32 === 50`, `truth010`, route-freeze
115, the finance no-fake-money block, the teacher pay-free triple, family zero-pay, student child-view, and every
Spec 026-039 assertion.

---

## 7. STOP conditions (smoke)

1. Public HTML ≠ **115** · `PAGES` ≠ 57 · `.nav-panel .nav-item` ≠ **50** · settings category ≠ 7 items.
2. `nav040.plannedTotal` ≠ 0 or `comingSoon` ≠ 0 on any page/lang.
3. Any of the six deep-links failing to open its tab on a fresh context, in **either** language.
4. Any external request during a deep-link load.
5. `s040.fields` ≠ 73, `toggles` ≠ 49, `struct` ≠ 60, `structCtrls` ≠ 0 — **the ledger is amended first, never the
   assert silently**.
6. `pw`/`file`/`canvas` > 0, `badName` > 0, `fakeSaved`, `connectedChips` > 0, `currency` > 0, `pdfish` — anywhere
   in the hub **or its templates**.
7. The Users tab growing a form control or a gate.
8. `FORM_DRAWERS_032.settings` not carrying all 12 ids while `integ-*` drawers ship.
9. Any protected assert changed outside the two declared supersessions + the two sanctioned strengthenings (see
   `protected-test-supersession-contract.md` §7).
