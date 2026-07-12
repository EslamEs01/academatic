# Contract — Protected-Test Supersession (Spec 040)

**Baseline: HEAD `58a53e2`.** `app/tests/` is byte-identical to HEAD; every OLD block below was read from the
working tree at that commit and is quoted **verbatim, with its real line numbers**. (CLAUDE.md still names
`4cbcb31` — documentation drift; Risk **R9**. Any supersession computed against `4cbcb31` is void.)

This is the **most load-bearing contract of Spec 040**. The rule of this repo since Spec 026 is: a protected
assertion may be changed **only** by a *declared* supersession that (a) quotes the OLD code verbatim, (b) shows the
NEW code, (c) proves the change is a **strengthening** (the new predicate is strictly harder to satisfy, or the old
predicate has become *unsatisfiable-by-an-honest-build*), and (d) lists the replacement coverage. "Update the tests
as needed" is **not permitted anywhere in this spec**.

Spec 040 declares **exactly TWO supersessions** and **TWO sanctioned strengthenings**. Everything else in
`app/tests/smoke/run.cjs` is **additive** (a new Spec-040 block) or **byte-verbatim**.

| # | Kind | Site(s) | One-line |
|---|---|---|---|
| S1 | Supersession (strengthening) | `smoke:1446`, `smoke:2340` | `settingsPlanned === 6` → `=== 0` |
| S2 | Supersession (retire + replace) | `smoke:223-230` | the `.nav-item.is-planned` **click** probe → a sitewide **zero-census** |
| T1 | Sanctioned strengthening | `smoke:1196` | `a31.gates >= 4` → `>= 20` |
| T2 | Sanctioned strengthening (register omission fix) | `smoke:92` | `FORM_DRAWERS_032.settings` `['head-add']` → 12 ids |

Anything else changed in `app/tests/smoke/run.cjs` ⇒ **STOP condition 8** (see §7).

---

## 1. Supersession S1 — `settingsPlanned === 6` → `=== 0` (two sites)

### 1.1 Site A — the per-page shared-sidebar sweep

**OLD — `app/tests/smoke/run.cjs:1446`** (inside the Spec-039 `if (!PORTAL_PAGES.has(page))` block; runs on
**every admin page × AR/EN** = 64 × 2 executions):

```js
        ok(nav039.settingsPlanned === 6, `${page}/${lang}: settings category should keep 6 planned «قريبًا» items (owner Spec 040), got ${nav039.settingsPlanned}`);
```

**NEW:**

```js
        // Spec 040 (declared supersession of the Spec-039 line): the six settings items are now real deep-links
        // into the EXISTING settings hub tabs, so the settings category — the last planned-bearing category —
        // must carry ZERO «قريبًا» items. Strictly stricter than `=== 6`.
        ok(nav039.settingsPlanned === 0, `${page}/${lang}: settings must have 0 planned «قريبًا» items after Spec 040 (six real deep-links), got ${nav039.settingsPlanned}`);
```

### 1.2 Site B — the post-loop content/nav route audit

**OLD — `app/tests/smoke/run.cjs:2340`** (inside the Spec-039 `for (const lang of ['ar','en'])` route block that
loads `library(.en).html`):

```js
    ok(nav.settingsPlanned === 6, `content/${lang}: settings must keep 6 planned items (owner Spec 040), got ${nav.settingsPlanned}`);
```

**NEW:**

```js
    ok(nav.settingsPlanned === 0, `content/${lang}: settings must have 0 planned items after Spec 040, got ${nav.settingsPlanned}`);
```

### 1.3 The reads feeding both sites stay BYTE-VERBATIM

Only the **expected value** moves. The DOM probes are untouched:

`smoke:1436` (the `info()` helper), `smoke:1439`:
```js
            settingsPlanned: set ? set.querySelectorAll('.nav-item.is-planned, [data-coming-soon]').length : -1,
```
`smoke:2326` (the `info()` helper), `smoke:2331`:
```js
        settingsPlanned: set ? set.querySelectorAll('.nav-item.is-planned, [data-coming-soon]').length : -1,
```
The `-1` sentinel (panel missing ⇒ `-1`) is what makes `=== 0` safe: a **deleted** `#catpanel-settings` yields `-1`,
not `0`, so the new assertion still fails loudly. Deleting the panel to "pass" is impossible.

### 1.4 Why this is a STRENGTHENING, not a weakening

| Property | OLD (`=== 6`) | NEW (`=== 0`) |
|---|---|---|
| Predicate shape | exact equality | exact equality (same shape — no `>=`, no `!==`, no removal) |
| Admissible builds | any build with exactly 6 «قريبًا» settings items | **only** builds with **zero** «قريبًا» anywhere in settings |
| Dishonesty tolerated | 6 nav items that claim "قريبًا" while their target already exists | **none** |
| Relationship to the honesty law | codifies a temporary debt, **explicitly owned by Spec 040** (the message says so) | discharges the debt |

Both OLD sites were **authored by Spec 039** and both **name Spec 040 as their owner in the failure message**
("owner Spec 040"). They are, by construction, promissory notes payable by this spec. The `-1` sentinel plus the
sitewide census (§4.1) means the new value cannot be satisfied by *hiding* items — only by *promoting* them.

### 1.5 Mutation / discrimination proof

| Mutation | OLD `=== 6` | NEW `=== 0` |
|---|---|---|
| Flip only 5 of the 6 items (one left `status:'planned'`) | **PASS** (6→1 ≠ 6 ⇒ actually fails; but a *partial revert* to 6 passes) | **FAIL** (`1 !== 0`) — catches partial completion |
| Flip all 6, but leave `data-coming-soon` on one anchor (copy-paste slip in `sidebar.js`) | FAIL (0 ≠ 6 — for the wrong reason) | **FAIL with the right reason** (the selector is `.is-planned, [data-coming-soon]`) |
| Regress one settings item back to planned in a later spec | **PASS** if exactly 6 return | **FAIL** for any count ≥ 1 |
| Delete `#catpanel-settings` entirely to silence the test | FAIL (`-1`) | FAIL (`-1`) — **both** reject this |
| Add a NEW planned item to settings (e.g. a 7th) | FAIL only if the total ≠ 6 | **FAIL always** — also caught by `navCount32 === 50` (`smoke:1300`) |

The OLD assertion catches exactly one thing the NEW one cannot: "someone silently promoted the settings items
without doing the work." That regression is **fully re-covered** — and covered harder — by the replacement suite
(§4): the six anchor asserts (`href` regex per item), the source-level `nav.config` audit, and the six fresh-context
deep-link tests each require the *destination tab to actually open*. A silent promotion with no route now fails at
the **build guard** (`nav.config.js:151-157`, `implemented ⇒ must have route`) before the smoke run even starts.

---

## 2. Supersession S2 — the `.nav-item.is-planned` CLICK probe → RETIRE + zero-census

### 2.1 OLD — `app/tests/smoke/run.cjs:223-230` (verbatim, inside `if (page === 'dashboard')`)

```js
        // Spec 039: the admin category no longer has a planned «قريبًا» item either
        // (materials/certificateRequests flipped to deep-links). Reveal the category that still has
        // one (settings → settingsGeneral/…/settingsUsers, owner Spec 040) and verify the planned-item
        // toast still fires — coverage preserved.
        await p.click('[data-nav-category="settings"]').catch(() => {});
        await p.waitForTimeout(140);
        const rPlanned = await clickFeedback('.cat-panel:not([hidden]) .nav-item.is-planned');
        ok(!rPlanned, `${page}/${lang}: ${rPlanned}`);
```

Note `clickFeedback` (`:206-215`) returns the string `` `selector ${sel} not found` `` when the node is absent —
i.e. **after Spec 040 this assertion fails by construction**: there is no `.nav-item.is-planned` left to click. It
is not merely stale; it is *unsatisfiable by an honest build*. It must be superseded.

### 2.2 The three options, and the decision

| Option | What it means | Verdict |
|---|---|---|
| **A** — add a planned-nav **specimen** to `gallery.html` and point the probe there | `pages/gallery.js` (87 lines) has **no** nav specimen; its sections are buttons/kpi/tiles/chips/medallions/fields/avatars/badges/report/menu/toast/states. The 6 `data-coming-soon` nodes in `public/gallery.html` today **are the shared sidebar's settings items** — exactly the ones Spec 040 removes. Adding one = a **product change**: 2 more body diffs, new `gallery.sec.nav` locale keys, a nav component rendered outside any nav. It must also live **inside `#page-body`, outside `.nav-panel`**, or it breaks `navCount32 === 50` (`smoke:1300`) and `deadNav` (`smoke:137-139`, asserted `:172`). | **Not taken.** Defensible (the gallery already shows states used nowhere else) but it widens the body allowlist for one toast branch. |
| **B** — keep one settings item dishonestly `planned` so the probe has a victim | A nav item that says «قريبًا» about a tab that already exists and is already reachable. | **REJECTED — violates the no-fake honesty law.** A test may never be the reason a product lies. |
| **B′** — point the probe at `classSalaryReport` | A `disabled` lock is **categorically not** a planned item (different status, different hook: `data-disabled-reason` + `data-reason-key` + `#i-lock`, not `data-coming-soon`). | **FORBIDDEN.** See §3 — the lock has its **own** probe, which stays byte-verbatim. |
| **C** — **RETIRE** the click probe; replace it with an honest sitewide **zero-census** | "Zero coming-soon claims left" is a **product milestone**, not a coverage hole. | **TAKEN.** |

**Decisive precedent:** `components/portal-shell.js:30` already renders an `is-planned` branch that has had **zero
instances since Spec 025** (`ROLE_NAV` has no `status:'planned'` item; every `public/*-portal*.html` shows
`data-coming-soon` = 0). The suite expresses that branch as an honest **vacuous** assert —
`prt.plannedNavAnchors === 0` (`smoke:1981`, `:2002`, `:2023`, `:2044`). The codebase therefore *already* tolerates
an unexercised planned-render branch, tested by a zero-assert. Spec 040 does exactly the same thing for the **admin**
sidebar. The `is-planned` render path in `sidebar.js:33` and the coming-soon branch in `enhance.js` are **retained,
not deleted** (zero-deletion law) — recorded in REVIEW.md as intentionally unexercised.

### 2.3 NEW — the replacement (same location, `smoke:223-230`)

```js
        // Spec 040 (declared supersession of the Spec-039 planned-item CLICK probe): settings was the LAST
        // planned-bearing category. After the six settings deep-links the app carries ZERO «قريبًا» items
        // sitewide, so the CLICK probe is RETIRED — there is no honest specimen left to click, and keeping a
        // dishonest planned nav item (or re-pointing the probe at the classSalaryReport DISABLED lock, which is
        // NOT a planned item) purely to feed a test is forbidden. Precedent: portal-shell.js:30's is-planned
        // branch has been unexercised since Spec 025 and is likewise expressed as an honest zero-assert
        // (plannedNavAnchors === 0). Replacement coverage:
        //   (1) this sitewide zero-census (runs on EVERY page × AR/EN via the nav040 block below);
        //   (2) the nav.config SOURCE audit after browser.close() (planned === 0, the six exact routes);
        //   (3) the is-disabled reason-toast probe immediately below — the nav FEEDBACK path is still proven.
        await p.click('[data-nav-category="settings"]').catch(() => {});
        await p.waitForTimeout(140);
        const soon040 = await p.evaluate(() => ({
          planned: document.querySelectorAll('.nav-panel .nav-item.is-planned').length,
          soon: document.querySelectorAll('[data-coming-soon]').length,
        }));
        ok(soon040.planned === 0 && soon040.soon === 0,
          `${page}/${lang}: zero «قريبًا» items must remain after Spec 040 (planned=${soon040.planned}, comingSoon=${soon040.soon})`);
```

The category **click** (`[data-nav-category="settings"]`) is deliberately **kept**: it still exercises the rail →
panel reveal on the settings category before the census, so the census reads a *rendered, visible* panel.

### 2.4 Intent change, precisely

| | OLD | NEW |
|---|---|---|
| What it proved | *"A planned nav item, when clicked, produces user feedback (a toast) — it is not a dead button."* | *"No nav item anywhere claims «قريبًا» — the coming-soon affordance has no instances left."* |
| Coverage class | behavioural (dispatch path) | structural (census) |
| Nav-feedback path still proven? | — | **Yes** — by the `is-disabled` reason-toast probe at `:231-240`, unchanged. Same `enhance.js` dispatch, same `.toast` assertion, on a control that is still honest. |
| Dead-button law still proven? | — | **Yes** — `deadNav` (`:137-139`, asserted `:172`) runs on **every admin page**: an anchor without a real `href`, **or** a non-anchor without `data-coming-soon`/`data-disabled-reason`, is a failure. The six promoted items must therefore carry real `href`s. |

### 2.5 Why this is a STRENGTHENING, not a weakening

1. The OLD assertion **cannot pass** on an honest Spec-040 build (`clickFeedback` returns "selector … not found").
   Its predicate has been *discharged*, not relaxed.
2. The NEW assertion is an **exact-zero** over **two** independent selectors (`.nav-item.is-planned` *and* the
   global `[data-coming-soon]` — the latter is **not** scoped to `.nav-panel`, so a coming-soon affordance leaking
   into a page **body** also fails). That is a **wider** surface than the old single-node click.
3. The behavioural dispatch coverage the old probe carried is **not lost**: `:231-240` proves the identical
   `enhance.js` toast path on the `is-disabled` lock.
4. It runs on **every page × AR/EN** through the `nav040` block (§4.1), not only on `dashboard`.

### 2.6 Mutation / discrimination proof

| Mutation | OLD click probe | NEW census |
|---|---|---|
| One settings item silently left `planned` | PASS (it finds a victim and gets a toast — the *dishonesty* is invisible to it) | **FAIL** (`planned=1`) |
| A future spec re-introduces a «قريبًا» item anywhere (any category, any page) | PASS | **FAIL** |
| A `data-coming-soon` attribute leaks into a page **body** (not the sidebar) | not detected (scoped to `.cat-panel`) | **FAIL** (the `soon` count is document-wide) |
| `enhance.js`'s coming-soon toast branch is deleted | FAIL | not detected — **re-covered** by the `is-disabled` reason-toast probe (`:231-240`) for the toast dispatch, and by `deadNav` (`:172`) for the hook requirement; the branch itself is retained-but-unexercised, exactly like `portal-shell.js:30` since Spec 025 |
| Someone points the probe at `classSalaryReport` to "keep coverage" | would PASS (a lock does toast) — and would **silently redefine** a lock as a planned item | impossible: the census counts `.is-planned`/`[data-coming-soon]`; a lock carries **neither** |

---

## 3. `classSalaryReport` — the disabled lock stays SEPARATE and BYTE-VERBATIM

A `disabled` lock and a `planned` item are **different species**. Spec 040 removes the last of the latter and
**touches none of the former**. The lock is proven at **four** independent sites; every one stays byte-identical.

| Site | Code (verbatim) | Status |
|---|---|---|
| `smoke:231-240` | the `is-disabled` reason-toast click probe (`const dis = await p.$('.nav-item.is-disabled'); … ok(fb, …disabled nav item produced no reason feedback…)`) | **BYTE-VERBATIM.** After Spec 040 this is the **only** remaining nav-feedback behavioural probe — it becomes *more* load-bearing, never less. |
| `smoke:1611-1612` | ```ok(fin.walletOk, `${page}/${lang}: classSalaryReport lost its disabled/lock state (it must stay the one honest finance lock)`);``` (with `const walletIds = ['classSalaryReport'];` at `:1598`) | **BYTE-VERBATIM** |
| `smoke:1640` + `:1663` | ```const lockedFin = ['classSalaryReport'];``` … ```ok(nav010.lockedOk, `${page}/${lang}: the one honest finance lock (classSalaryReport) must stay disabled+reason+lock`);``` | **BYTE-VERBATIM** |
| `smoke:2268` | ```ok(!!nav.csr && !nav.csr.a && nav.csr.disabled && nav.csr.status === 'disabled' && nav.csr.reason === 'nav.reason.finance' && nav.csr.lock && !nav.csr.href, `finance/${lang}: classSalaryReport must stay a disabled+nav.reason.finance+lock non-anchor with NO route, got ${JSON.stringify(nav.csr)}`);``` | **BYTE-VERBATIM** |
| `smoke:2361-2362` (source audit) | ```const csr = navSrc.NAV_CATEGORIES.flatMap(…).find((i) => i.id === 'classSalaryReport');```<br>```ok(csr.status === 'disabled' && csr.reasonKey === 'nav.reason.finance' && !csr.route, 'nav.config: classSalaryReport must stay an honest disabled lock with no route');``` | **BYTE-VERBATIM** |

**Binding rules:**
- The Spec-040 census counts `.nav-item.is-planned` and `[data-coming-soon]`. `classSalaryReport` carries
  `aria-disabled="true"` + `data-disabled-reason` + `data-reason-key="nav.reason.finance"` + `<use href="#i-lock">`
  and carries **neither** census hook ⇒ the census is **orthogonal** to the lock. Ledger: disabled locks stay at
  **1** (STOP condition 3).
- The Spec-040 source audit asserts `status === 'disabled'` count `=== 1` — an **additive** upper *and* lower bound
  on the lock, complementing (never replacing) `:2362`.
- **Forbidden:** re-pointing the retired click probe at `.nav-item.is-disabled` inside the *planned* comment, or
  merging the two probes. Two species, two probes.

---

## 4. Additive replacement coverage (new code only — supersedes nothing)

Full detail in `smoke-coverage-contract.md`; the supersession-critical parts:

### 4.1 The `nav040` per-page block (appended after `smoke:1446`, inside the same non-portal branch)

Six anchor asserts (real `<a>`, no `data-coming-soon`, no `aria-disabled`, no `#i-lock`, exact `href` regex) +
the planned/coming-soon zero-census, on **every admin page × AR/EN**. Reuses `anchorOk039` — defined at
**`smoke:1442`** (verified verbatim in the tree at `58a53e2`; the Ledger's "`:1444`" is an off-by-two typo — `:1443`
`:1444` `:1445` are the three Spec-039 anchor asserts) — **unchanged**.

### 4.2 The `nav.config` SOURCE audit (appended inside the existing post-`browser.close()` block, `smoke:2347-2363`)

Six exact `status==='implemented' && route===…` asserts, `planned === 0` sitewide, `disabled === 1`,
`FUTURE_ROUTES` still `{}`, `admin menu === 50`. **This is the one requirement the DOM-only tests cannot reach**
(same argument Spec 039 used at `:2347-2363`). `byId` is already defined there and is reused.

### 4.3 Six fresh-context deep-link tests (Spec-039 pattern, `smoke:2276-2313`)

Seed `localStorage['academy.schedView.settings']` with a **different** tab, load `settings(.en).html#view=<tab>`,
assert exactly ONE visible `[data-tabpanel]` and that it is the target, and 0 external requests. AR + EN × 6 = **12
executions**. This is what makes the promotion *honest*: the nav item does not merely stop lying, its destination
**demonstrably opens**.

---

## 5. Sanctioned strengthenings (not supersessions — the predicate only gets harder)

### T1 — the settings gate floor, `smoke:1196`

```js
// OLD
          ok(a31.gates >= 4, `settings/${lang}: settings save/connect/test gates missing (${a31.gates})`);
// NEW
          ok(a31.gates >= 20, `settings/${lang}: settings save/connect/test gates missing (${a31.gates})`);
```
`a31.gates` = `body.querySelectorAll('[data-disabled-reason]').length` (`smoke:1158`). Ledger F.7 predicts **≈51**
built gates (General 5 · Notifications 7 · Customization 3 · Security 12 · Integrations ≈24). Floor set
conservatively at **20**. `>= 4 → >= 20` is monotonically stricter — every build that passes the new bound passes
the old one. **Not a supersession** (no expectation is *relaxed* or *replaced*), but declared here so it is not
mistaken for an undeclared edit.

### T2 — `FORM_DRAWERS_032`, `smoke:92` (a register omission the plan MUST close — Risk R4)

```js
// OLD (smoke:92)
  settings: ['head-add'], attendance: [],
// NEW
  settings: ['head-add', 'integ-stripe', 'integ-paypal', 'integ-mollie', 'integ-xpay', 'integ-payoneer',
    'integ-paymob', 'integ-custom', 'integ-paymob-payout', 'integ-payoneer-payout', 'integ-whatsapp',
    'integ-email'], attendance: [],
```
Consequence — each of the 11 new `integ-*` drawers is then dragged through the **existing** Spec-032 audit
(`smoke:1213-1260`), byte-unchanged, and must satisfy **all of it**:

| Audit (existing code) | Requirement for every `integ-*` drawer |
|---|---|
| `out.missing` | `template[data-preview="integ-<id>"]` must exist |
| `out.fieldless` | ≥ 1 `input`/`select`/`textarea` |
| `out.noGate` | ≥ 1 `[data-disabled-reason]` / `[data-confirm]` |
| `out.multiPrimary` | **≤ 1** `.btn-primary[data-disabled-reason]` |
| `out.omitLeak` | 0 `input[type=password]`, 0 `input[type=file]`, **0 controls whose `name`/`id` matches** `/pass\|secret\|api[-_]?key\|token\|webhook\|otp\|salary\|hour[-_]?rate\|fine\|payout\|iban\|cvv/i`, 0 `<canvas>` |

**Leaving the register at `['head-add']` would let 11 new drawers silently escape the fieldless/noGate/multiPrimary/
MUST-OMIT audit. That is a spec failure, not a pass.** Extending a **register of things to audit** is by definition
a strengthening: it adds subjects, it does not weaken a predicate.

---

## 6. Preserved BYTE-VERBATIM (quoted; any diff ⇒ STOP)

### 6.1 The neighbours of the retired probe (`smoke:206-251`)

```js
        const clickFeedback = async (sel) => {                                   // :206-215 — KEPT (still used by the loop below)
          const elFound = await p.$(sel);
          if (!elFound) return `selector ${sel} not found`;
          await elFound.click();
          await p.waitForTimeout(120);
          const fb = await p.evaluate(() => !!document.querySelector('.toast,.popover,.modal-scrim'));
          await p.keyboard.press('Escape');
          await p.waitForTimeout(120);
          return fb ? null : `${sel} produced no feedback (dead button)`;
        };
        for (const sel of ['.pager:not(.is-current)', '[data-action="theme-menu"]',                 // :218-222
          '[data-action="apps-grid"]', '[data-action="quick-actions"]']) {
          const r = await clickFeedback(sel);
          ok(!r, `${page}/${lang}: ${r}`);
        }
        const dis = await p.$('.nav-item.is-disabled');                                             // :233-240
        …
          ok(fb, `${page}/${lang}: disabled nav item produced no reason feedback`);
        const railFam = await p.$('.rail-cat[data-nav-category="families"]');                       // :242-251
        …
          ok(okSwitch, `${page}/${lang}: clicking the families rail category did not switch to ONLY the families panel`);
```

### 6.2 Category planned-zero asserts of Specs 035/036/037/039 — **all four stay `=== 0`, byte-verbatim**

```js
        ok(nav035.famPlanned === 0, `${page}/${lang}: families category still has ${nav035.famPlanned} planned «قريبًا» item(s) after Spec 035`);   // :1387
        ok(nav036.teachersPlanned === 0, …);                                                                                                        // :1407
        ok(nav037.reportsPlanned === 0, `${page}/${lang}: reports category still has ${nav037.reportsPlanned} planned «قريبًا» item(s) after Spec 037`); // :1425
        ok(nav010.admPlanned === 0, `${page}/${lang}: admin category still has ${nav010.admPlanned} planned «قريبًا» item(s) after Spec 039`);       // :1662
```
Spec 040 **must not touch** control (12) · families (9) · teachers (6) · reports (11) · admin (5) — 50 items total,
0 planned in each already-completed category.

### 6.3 Truthfulness sweep — `truth010`, `smoke:1696-1706` (**preserved, NOT superseded**)

```js
        const badPlanned = items.filter((n) => n.getAttribute('data-nav-status') === 'planned'
          && (n.tagName !== 'BUTTON' || !n.hasAttribute('data-coming-soon'))).length;
      ok(truth010.badPlanned === 0, `${page}/${lang}: ${truth010.badPlanned} planned nav item(s) not a non-navigating «قريبًا» button`);
      ok(truth010.badDisabled === 0, `${page}/${lang}: ${truth010.badDisabled} disabled nav item(s) missing button/aria-disabled/reason`);
```
`badPlanned` becomes **vacuously true** (empty filter over zero planned items) — the correct honest outcome, and the
guard that catches any *future* re-introduction of a planned item that is not a proper non-navigating «قريبًا»
button. `badDisabled` still covers `classSalaryReport`. **Do not delete, do not "simplify".**

### 6.4 Counts, routes, link integrity

| Assert | Line | Value |
|---|---|---|
| `navCount32 === 50` | `:1300` | admin menu freeze — the 6 flips change **status, not count** |
| `nav.adminMenu === 50` | `:2270`, `:2341` | same, from the post-loop blocks |
| `nav010.admItems.length === 5 && !includes('banks')` | `:1658` | admin category |
| `links010.deadHash === 0` / `external === 0` / `badTarget === 0` | `:1691-1693` | **safe with `#view=` hrefs**: `:1684` (`const file = h.split('#')[0];`) strips the fragment before the `VALID_FILES` lookup — `settings.html#view=general` resolves to `settings.html`. Proven by Specs 037/038/039. |
| `info.deadNav === 0` | `:137-139` (probe), `:172` (assert) | the promoted items **must** carry a real `href` |
| route freeze `pub.length === 115` | `:2388-2396` | 0 new pages |
| settings tab-id contract | `:1194` | `['general','notifications','customization','security','users','integrations']` — **Spec 040 does not add/rename/reorder a tab** |
| settings real theme control | `:1195` | `a31.themeCtl >= 1` — theme/lang stay the ONLY real writes |
| settings tab-switch behavioural | `:1198-1209` | `general` ⇄ `notifications` click round-trip |
| Spec-031 honesty (settings inclusive) | `:1172-1176` | `passwordInputs`/`fileInputs` 0 · `canvas`/`noDrag` · **`credInputs === 0`** (Risk R1) · `noPdf` (Risk R3) · **`currency === 0`** (Risk R2) |
| sitewide MUST-GATE freeze `g32` | `:1288-1297` | `pw`/`file`/`canvas` = 0 · `!pdfish` |
| Spec-039 routes | `:1443-1445`, `:2337-2339` | `materials → library.html#view=materials` · `certificateRequests → certificates.html#view=requests` · `books → library.html#view=books` (the three `anchorOk039(...)` asserts that immediately follow the helper at `:1442`) |
| Spec-038 finance | `:1656`, `:2262-2269` | `finLinks` 7-item list · six `#view=` finance routes · the `csr` lock |
| Spec-039 `FUTURE_ROUTES` source audit | `:2350-2358` | `materials` removed · `certificateRequests` never added · the 3 exact routes |
| Role laws | `payHit` / `tchPay` / `famPay` / `payFigure` / child-view / FAKE-success / raw-key / external-request | **all byte-verbatim** |

### 6.5 Everything else in Specs 026-039

Every assertion authored by Specs 026, 027, 028, 029, 030, 031, 032, 033, 034, 035, 036, 037, 038 and 039 —
including `FORM_DRAWERS_032`'s **other 20 page entries**, `PICKERS_032`, `HYBRID_032`, `NESTED_FB_032`, the finance
no-fake-money block, the reports finance-free block, the schedule-search block, the time-converter block — stays
**byte-verbatim**. Spec 040 appends; it does not rewrite.

---

## 7. STOP conditions for this contract

1. Any edit to `app/tests/smoke/run.cjs` outside **S1 (2 lines) · S2 (`:223-230`) · T1 (`:1196`) · T2 (`:92`) · the
   additive Spec-040 blocks**.
2. Any category planned-zero assert (`:1387`, `:1407`, `:1425`, `:1662`) changed.
3. Any `classSalaryReport` assert (`:231-240`, `:1598/1612`, `:1640/1663`, `:2268`, `:2362`) changed, merged, or
   re-pointed.
4. `navCount32`/`adminMenu` ≠ 50, `pub.length` ≠ 115, settings tab-id list changed.
5. A planned nav item retained anywhere purely to keep the retired click probe alive (Option B).
6. `FORM_DRAWERS_032.settings` left at `['head-add']` while `integ-*` drawers ship (Risk R4).
7. Any `>= N` floor **lowered**, any `===` turned into `>=`/`!==`, any assert deleted rather than superseded.
8. A supersession applied without its OLD-verbatim / NEW / strengthening-proof / replacement-coverage record in this
   file.
