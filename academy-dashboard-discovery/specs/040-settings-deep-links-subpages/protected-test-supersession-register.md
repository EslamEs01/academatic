# Protected-Test Supersession Register (Spec 040)

Follows the Spec 038/039 precedent exactly: **Current (verbatim + file:line) → Why → Permitted edit → Preserved → Forbidden.** No assertion is broadly weakened. "Update tests as needed" is not permitted anywhere in this spec.

Spec 040 requires **exactly two** declared supersessions, plus **additive** coverage.

---

## Supersession 1 — `settingsPlanned === 6` becomes `=== 0`

### Current (verbatim)

`app/tests/smoke/run.cjs:1446`
```js
        ok(nav039.settingsPlanned === 6, `${page}/${lang}: settings category should keep 6 planned «قريبًا» items (owner Spec 040), got ${nav039.settingsPlanned}`);
```

`app/tests/smoke/run.cjs:2340`
```js
    ok(nav.settingsPlanned === 6, `content/${lang}: settings must keep 6 planned items (owner Spec 040), got ${nav.settingsPlanned}`);
```

Both were **added by Spec 039** and both name Spec 040 as the owner — they are, by construction, the assertions Spec 040 is expected to flip.

### Why it must change

Spec 040 promotes all six settings items to real deep-links. The settings planned count becomes **0** by design. Leaving the assertion at `6` would require keeping a nav item that lies.

### Permitted edit (the whole edit)

The literal `6` becomes `0` and the message is corrected on **those two lines only** — e.g. `settings category must have 0 planned «قريبًا» items after Spec 040`. **The assertion is strengthened, not deleted**: it goes from "exactly 6 planned" to "exactly 0 planned", which is a stricter statement.

### Additive replacement coverage (new, not a swap)

1. A **sitewide** assertion, on every page and both languages: the total number of planned items **across all six categories** is **0** — scoped to the sidebar (`.cat-panel` / `[data-nav-panel]`), so it cannot be satisfied or broken by anything in a page body.
2. A **source-level** assertion in the existing Node-side `nav.config` audit block (see Supersession 2's preserved neighbours): **no** nav item anywhere has `status === 'planned'`, and none of the six settings ids appears in `FUTURE_ROUTES`.

### Preserved byte-verbatim

The per-category planned-zero assertions for families (`:1387`), teachers (`:1407`), reports (`:1425`) and admin (`:1662`); `truth010.badPlanned` (`:1699–1705`); `navCount32 === 50` (`:1300`); `nav.adminMenu === 50` (`:2341`); the admin `admItems.length === 5` assertion (`:1658`); the route freeze `pub.length === 115` (`:2391`).

### Forbidden

Deleting either line. Relaxing them to `>= 0`. Removing the per-category planned checks. Touching any role-law, no-fake, dead-link or count assertion.

---

## Supersession 2 — the app-level planned-item click probe

### Current (verbatim)

`app/tests/smoke/run.cjs:223–230`
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

It depends on `clickFeedback` (`:206–215`), which returns `` `selector ${sel} not found` `` when nothing matches — so once no category has a planned item, **this probe fails**.

### Why it must change

This is the structural end of a chain: Spec 038 pointed the probe at `admin`; Spec 039 repointed it `admin → settings` because settings was "the only category still carrying planned items". Spec 040 zeroes those six. **There is no category left to repoint to.** The probe is not wrong — its subject ceases to exist in production navigation.

### Options considered

| Option | Verdict |
|---|---|
| **B** — keep one planned item so the probe survives | **REJECTED.** It would mean shipping a nav item that lies, purely to satisfy a test. That inverts the honesty law. |
| **C** — retire the probe and rely on a source-level assert | **Fallback.** Honest, smallest possible diff, **but** it leaves the `data-coming-soon` behaviour (`enhance.js`) and the `is-planned` rendering branch (`sidebar.js`) with **zero** behavioural coverage. The brief forbids simply deleting coverage. |
| **A** — move the behavioural probe to an isolated component specimen | **RECOMMENDED.** |

### Recommended edit (Option A)

- Render a **planned-nav-item specimen** in the existing component gallery page (`gallery.html` / `pages/gallery.js`) — a page whose entire purpose is to exhibit components. It is a specimen, not a navigation claim, so it asserts nothing false about the product.
- **Repoint** the behavioural probe at that specimen instead of at the sidebar, keeping `clickFeedback` and the "produced no feedback (dead button)" contract **byte-identical**.
- The sitewide "planned = 0" assertion from Supersession 1 is **scoped to the sidebar**, so the gallery specimen cannot satisfy it or break it. The same scoping protects `navCount32 === 50`.

If the maintainer judges a `gallery.html` body change to be outside the impact boundary, **fall back to Option C** and record the lost branch coverage explicitly in `REVIEW.md`. **Option B is not available.**

### Preserved byte-verbatim

- `clickFeedback` itself (`:206–215`).
- The four dashboard feedback selectors and their loop (`:216–222`).
- **The `.nav-item.is-disabled` reason-toast probe (`:231–240`)** — it survives untouched because `classSalaryReport` is still an honest **disabled** lock. A disabled lock is categorically **not** a planned item, and this spec must not blur them.
- The category-switching probe (`:241+`).
- The Spec 039 `nav.config` **source audit block** (`:2347–2363`) — Spec 040 **adds** to it (no planned status anywhere; the six ids absent from `FUTURE_ROUTES`; the six routes exact) and changes none of its existing lines.

### Forbidden

Deleting the probe with no replacement. Weakening `clickFeedback`. Merging the planned probe into the disabled probe. Keeping a dishonest planned nav item.

---

## Assertions that stay byte-verbatim (the protected neighbours)

| Assertion | Line(s) |
|---|---|
| `payHit` (teacher pay-free) | 1940–1942 |
| `tchPay` | 1860–1861 |
| `famPay` (family zero-pay) | 1829–1830 |
| `payFigure` | 1895–1896, 1919–1920 |
| child-view (student) | 1817–1819 |
| FAKE / raw-key / external-request / dead-nav guards | 157–202 |
| link integrity `href="#"` = 0 | 1691–1693 |
| `truth010` | 1699–1706 |
| finance lock / `finMembers` / `finLinks` | 1598–1612, 1640–1663, 2268–2269 |
| Spec 039 materials / certificateRequests / books anchors | 1443–1445 |
| all existing `#view=` deep-link loops | 2114–2232, 2274–2309 |
| route freeze (115) | 2388–2396 |
| admin menu (50) | 1300, 2270, 2341 |

## The a31 settings-honesty assertions — **strengthened, not superseded**

`app/tests/smoke/run.cjs:1193–1197` currently asserts the exact 6-tab id list, a real theme control, and `gates >= 4`. Spec 040:

- **keeps the tab-id list assertion byte-verbatim** (the tab ids do not change — that is precisely why the deep-links work);
- **keeps the real-theme assertion byte-verbatim** (theme/language stay real);
- **raises** `gates >= 4` to a higher floor reflecting the completed forms — a strengthening, and the only change to this block;
- **keeps** the shared honesty asserts (`passwordInputs === 0 && fileInputs === 0`, `credInputs === 0`, `canvas === 0`, `noPdf`, `currency === 0`) **byte-verbatim** — Settings must continue to pass every one of them **after** the forms are completed. This is the single most important protection in the spec.

## Additive coverage Spec 040 must add

| Area | Addition |
|---|---|
| smoke | the six exact nav anchors (AR + EN); the six `#view=` deep-links opening **exactly one** visible tabpanel on a **fresh context** with the **opposite tab pre-seeded** in `localStorage['academy.schedView.settings']` (the Spec 039 discriminating-deep-link rule — `#view=general` is the baked default and would otherwise pass with JavaScript disabled); per-tab field-presence and field-count floors; provider-catalog completeness (11); notification-control completeness (47); sensitive-field absence; no authored secret; every gate present; no fake-success wording; theme/language still real; sitewide planned = 0; the `nav.config` source asserts |
| a11y | new rows for `#view=general`, `#view=notifications`, `#view=customization` (currently uncovered), each × AR/EN × light/dark, plus mobile-390 and every open drawer/confirm |
| screenshots | new `sp040-*` frames per tab and per drawer; **re-baseline the existing `cat: 'settings'` sidebar frame** (it currently shows six «قريبًا» buttons and will show six links) |
| REVIEW.md | a Spec 040 section recording the counts before/after and both supersessions |

## Counts before → after

| Metric | Before | After |
|---|---|---|
| settings planned | **6** | **0** |
| sitewide planned | **6** | **0** |
| settings items | 7 | 7 |
| admin menu | 50 | 50 |
| public HTML | 115 | 115 |
| disabled locks | 1 (`classSalaryReport`) | **1 (unchanged)** |
| `FUTURE_ROUTES` entries | 0 | 0 |
