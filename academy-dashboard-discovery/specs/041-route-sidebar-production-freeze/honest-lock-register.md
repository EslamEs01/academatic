# Honest-Lock Register — Spec 041

Scope: the complete, evidence-verified record of `classSalaryReport` — the ONLY disabled nav item in the
product — and of `finance-analysis`, which is correctly ABSENT and must stay absent. This register is the
041 audit's binding freeze on the finance domain's one lock; it is descriptive of the committed state at HEAD
`21502af`, not a design proposal. No source/test/HTML file is touched by this document.

## 1. Source declaration

`src/js/nav.config.js:90` (identical in the shipped `public/assets/js/nav.config.js`), inside the `finance`
category's `sections` array, immediately after `payments` and immediately before `banks`:

```js
item({ id: 'classSalaryReport', labelKey: 'nav.classSalaryReport', icon: 'wallet', status: 'disabled', reasonKey: 'nav.reason.finance' }),
// Spec 038 — HONEST LOCK kept (a real class-salary report ⇒ computed per-class pay; needs the payroll backend)
```

No `route` key is present — this is structurally enforced, not merely omitted by convention. The build-time
guard at `nav.config.js:159` throws if a `disabled` item lacks a `reasonKey`, and the guard at `nav.config.js:158`
throws if any non-`implemented` item carries a `route`. `classSalaryReport` satisfies both: it has a `reasonKey`
and it has no `route`. A build cannot ship this item any other way.

## 2. Rendered markup — verified on the live built HTML

Sidebar render function, `src/js/components/sidebar.js:37-40` (the ONLY code path that emits a `status:
'disabled'` nav item):

```js
if (it.status === 'disabled') {
  const reason = t(it.reasonKey);
  return `<button type="button" class="nav-item is-disabled" data-nav="${esc(it.id)}" data-nav-status="disabled" aria-disabled="true" data-disabled-reason data-reason-key="${esc(it.reasonKey)}" title="${esc(reason)}" aria-label="${esc(label + ' — ' + reason)}">
```

Exact built output, `public/finance.html:366-368` (Arabic; the `.en` twin is byte-parallel with English copy):

```html
</a><button type="button" class="nav-item is-disabled" data-nav="classSalaryReport" data-nav-status="disabled" aria-disabled="true" data-disabled-reason data-reason-key="nav.reason.finance" title="يتطلب نظام الفوترة الفعلي — صفحة «المالية» تعرض معاينة تجريبية بالبيانات الثابتة." aria-label="تقرير رواتب الفصول — يتطلب نظام الفوترة الفعلي — صفحة «المالية» تعرض معاينة تجريبية بالبيانات الثابتة.">
  <svg class="ico" aria-hidden="true" focusable="false"><use href="#i-wallet"></use></svg><span class="label">تقرير رواتب الفصول</span><svg class="ico ico-sm nav-lock" aria-hidden="true" focusable="false"><use href="#i-lock"></use></svg>
</button>
```

English twin, `public/finance.en.html:366`:

```html
</a><button type="button" class="nav-item is-disabled" data-nav="classSalaryReport" data-nav-status="disabled" aria-disabled="true" data-disabled-reason data-reason-key="nav.reason.finance" title="Requires the real billing backend — the Finance page shows a fixture-only preview." aria-label="Class salary report — Requires the real billing backend — the Finance page shows a fixture-only preview.">
```

This exact `<button>` is byte-present on all **64/64 admin (sidebar-bearing) pages** — verified live:
`grep -l 'data-nav="classSalaryReport"' public/*.html` → 64 matches (32 admin bases × 2 languages; the shared
sidebar partial is identical across every admin page). It is absent from the 50 portal files and `index.html`,
which render no admin sidebar at all.

## 3. Property-by-property verification

| Property | Requirement | Verified value | Evidence |
|---|---|---|---|
| Element | non-anchor | `<button type="button">` — never `<a>` | `sidebar.js:38`; built markup above |
| `href` | none | attribute absent entirely | grep of the built `<button…>` tag shows no `href=` |
| `aria-disabled` | `"true"` | `aria-disabled="true"` | built markup |
| Disabled-gate hook | `data-disabled-reason` (boolean attr, closed hook set — Spec 026/032) | present | built markup |
| Reason key | `data-reason-key="nav.reason.finance"` | present, exact string | built markup |
| Lock icon | a visible lock glyph, distinct from the disabled state itself | `<svg class="ico ico-sm nav-lock"><use href="#i-lock"></use></svg>` inside the label | `public/finance.html:367` |
| Route | none (route-less) | no `route` key in source; build guard `nav.config.js:158` would throw otherwise | `nav.config.js:90,158` |
| `data-nav-status` | `"disabled"` — NOT `"planned"` | `data-nav-status="disabled"` | built markup |
| `data-coming-soon` | absent | not present anywhere on this element | built markup (contrast with the planned-item pattern at `sidebar.js:33`, which DOES carry `data-coming-soon` + `data-soon-key="nav.comingSoon"`) |
| `data-soon-key` | absent | not present | built markup |
| `title` / `aria-label` | reason-bearing, localized | full sentence reason in both languages | built markup |

Every property in the assignment's checklist is independently confirmed: non-anchor `<button>` · no `href` ·
`aria-disabled="true"` · `data-disabled-reason` · `data-reason-key="nav.reason.finance"` · lock icon · route-less
· NOT planned (`data-nav-status="disabled"`, never `"planned"`) · NOT coming-soon (`data-coming-soon` absent).

## 4. The click behavior (reason-toast probe — still exercised)

`src/js/enhance.js:589-590` is the single generic dispatch for every `[data-disabled-reason]` element sitewide
(not classSalaryReport-specific — the same hook gates ~50 other honest finals across the product per the
Spec-032 form-completion contract):

```js
const dr = e.target.closest('[data-disabled-reason]');
if (dr) { closeMenu(); return toast(t(dr.getAttribute('data-reason-key'))); }
```

Clicking the button therefore shows a toast with the localized text of `nav.reason.finance` — it never
navigates (no `href` to navigate to) and never mutates any state. Reason copy, `src/locales/ar.js:14` /
`en.js:14`:

- AR: `يتطلب نظام الفوترة الفعلي — صفحة «المالية» تعرض معاينة تجريبية بالبيانات الثابتة.`
- EN: `Requires the real billing backend — the Finance page shows a fixture-only preview.`

Label copy, `src/locales/ar.js:27` / `en.js:27`: AR `تقرير رواتب الفصول`, EN `Class salary report`.

The lock is smoke-asserted at **five** independent sites (the four DOM/route sites below plus the source-level
cardinality guard at §6), all still live and passing at HEAD `21502af`:

1. `tests/smoke/run.cjs:1728-1742` — dashboard+reports finance block; `walletIds = ['classSalaryReport']`,
   asserts `data-nav-status === 'disabled'`, `aria-disabled === 'true'`, and a lock `<use href="#i-lock">` child;
   failure message: *"classSalaryReport lost its disabled/lock state (it must stay the one honest finance
   lock)"*.
2. `run.cjs:1769-1793` (`nav010`, every admin page × 2 langs) — `lockedFin = ['classSalaryReport']`; asserts
   `disabled` + `aria-disabled="true"` + `data-reason-key === 'nav.reason.finance'`; failure message: *"the one
   honest finance lock (classSalaryReport) must stay disabled+reason+lock"*.
3. `run.cjs:2386-2398` (finance-page route block) — `csr: info('classSalaryReport')`; asserts NOT an anchor,
   `disabled`, `status === 'disabled'`, `reason === 'nav.reason.finance'`, lock icon present, and **no `href`**
   in one combined predicate.
4. `run.cjs:2526-2527` (post-`browser.close()` SOURCE audit, importing `nav.config.js` directly — not the DOM):
   `csr.status === 'disabled' && csr.reasonKey === 'nav.reason.finance' && !csr.route` — this is the one test
   that proves the route-less property at the SOURCE, not merely the rendered, level.
5. `run.cjs:2551` — `locks.length === 1 && locks[0].id === 'classSalaryReport'` — the sitewide cardinality
   guard (see §6).

## 5. Companion honest gate — the finance Overview "report card" (same id, separate surface, same law)

`classSalaryReport` also appears as one of the finance Overview tab's **9 figure-free planned report cards**
(the Spec-030-originated set, reduced from 9 unlocked-to-6-implemented by Spec 038, leaving `classSalaryReport`
as the one still-locked card among the nine). Built markup, `public/finance.html:534-543`:

```html
<div class="report-card is-disabled" aria-disabled="true" data-report="classSalaryReport" title="يتطلب نظام الفوترة الفعلي." >
  <div class="flex items-start justify-between gap-2">
    <span class="medallion m-soft tone-muted "><svg class="ico" aria-hidden="true" focusable="false"><use href="#i-clipboard-check"></use></svg></span>
    <span class="chip tone-amber"><svg class="ico" aria-hidden="true" focusable="false"><use href="#i-lock"></use></svg><span>يتطلب الخادم</span></span>
  </div>
  <div>
    <h3 class="text-[14.5px] font-bold text-ink mb-1">تقرير رواتب الفصول</h3>
    <p class="text-[12.5px] leading-relaxed" style="color:var(--c-ink-3)">تفصيل رواتب الفصول لكل معلم يتفعّل مع نظام الفوترة الفعلي.</p>
  </div>
  <p class="report-reason text-[11.5px] mt-1" style="color:var(--c-ink-3)">يتطلب نظام الفوترة الفعلي.</p>
</div>
```

This card carries `data-report="classSalaryReport"` (a distinct attribute namespace from `data-nav`), a
`tone-amber` "يتطلب الخادم"/"Requires the server" chip, and the SAME `#i-lock` icon — but it is a static
display card (no `data-disabled-reason`, not clickable, no toast). It is figure-free (no salary amount, no
computed total). This is NOT a second nav route and does not weaken the "route-less" property of §3 — it is a
second, independently-honest surface for the same locked capability, both gated for the identical reason (needs
the real billing backend). Per-teacher class-salary math is exactly what the payroll backend must compute; no
frontend fixture may approximate it (see §7, the law).

## 6. Cardinality — classSalaryReport is the ONLY disabled item sitewide

Verified two ways:

- **Source**: `grep -n "status: 'disabled'" src/js/nav.config.js` → exactly one match (`classSalaryReport`,
  line 90), out of 50 total admin nav items (27 plain routes + 22 `#view=` deep-links + this 1 lock).
- **Rendered**: `grep -c "nav-item is-disabled"` on every admin page returns `1` (verified on
  `finance.html`, `finance.en.html`, `dashboard.html`; the shared-sidebar partial makes this uniform across
  all 64 admin files).

Smoke enforces this cardinality explicitly at `run.cjs:2551`:
`ok(locks.length === 1 && locks[0].id === 'classSalaryReport', …)`. Sitewide census (`run.cjs:1574-1576`):
`planned === 0 && comingSoon === 0` and `locks === 1` — the three mutually exclusive statuses (`implemented`
49, `disabled` 1, `planned` 0) sum to the frozen 50-item admin menu.

## 7. Owner

The real, computed per-teacher class-salary breakdown requires the **payroll/billing backend** — the same
system named in the reason copy ("نظام الفوترة الفعلي" / "the real billing backend") and in the source
comment ("needs the payroll backend", `nav.config.js:90`). This is consistent with the wider finance
no-fake-money law (binding since Spec 009, reaffirmed through Spec 038): every other locked finance figure
(salaries/payouts/accounting/analysis) in the product traces to the same undelivered backend, never to a
frontend spec. No committed spec (031–040) claims ownership of implementing this computation on the frontend,
and none should — a class-salary report is by definition a computed aggregate (rate × hours × class roster),
which the standing hard constraints forbid fixture-authoring.

## 8. Finance-analysis — correctly ABSENT, must not be invented

`finance-analysis` (also referenced in project history as "accountingExpenses") does **not** exist as a nav
item, a route, a page, or a rendered element anywhere in the committed corpus:

- `grep -rn "finance-analysis\|financeAnalysis\|finance_analysis" src/js/nav.config.js public/*.html` → **0
  matches** across the full 115-file built tree.
- It is not in `FUTURE_ROUTES` (that map is `{}` — emptied by Specs 034/035/037/039; see `nav.config.js:148-155`).
- It is not one of the 50 admin nav items (control 12 · families 9 · teachers 6 · reports 11 · admin 5 ·
  settings 7 = 50, 0 unclassified).
- Spec 038's own history record states this in full: *"finance-analysis stays deferred (no nav/route;
  `accountingExpenses` planned card remains)"* — the ONLY residue is the figure-free planned report-card
  already covered under §5's "9 planned cards" family (a display-only gate, same pattern as `classSalaryReport`,
  but with **no nav item at all** — it has never been promoted to the sidebar and carries no `data-nav`).

Spec 041 records this as a closed, correct absence: a computed cross-domain financial analysis (profit/loss,
revenue, aggregate expense) is exactly the kind of arithmetic the standing constraints forbid a frontend
fixture from performing. Inventing a nav item, a route, or a page for `finance-analysis` — even as an honest
lock — would be new scope outside a route/sidebar freeze and is explicitly NOT authorized by this document.

## 9. The law (binding on all future specs, restated for 041)

1. **`classSalaryReport` must never be unlocked** by a frontend-only change. Unlocking it means either (a)
   giving it a real `route` — impossible without a genuine per-class computed salary view, which requires the
   payroll backend, or (b) giving it a fake `route` to a fixture page — forbidden by the no-fake-money law.
   Only a future backend billing/payroll spec may retire this lock, and only by shipping the real computation.
2. **It must never be faked.** No fixture, literal, or "preview" figure may ever populate a class-salary
   number anywhere in the product (nav, report card, or any other surface) — per-class computed pay is
   arithmetic the frontend is permanently forbidden from performing (finance no-fake-money law, Spec 009
   through Spec 038, unbroken).
3. **It must never be repurposed as a test specimen.** Spec 040 explicitly forbade this exact pattern for a
   *different* status (repointing the retired planned-item probe at this lock) with the reasoning: *"a
   disabled lock is categorically NOT a planned item"* — different status, different hook
   (`data-disabled-reason` + `data-reason-key` + `#i-lock`, not `data-coming-soon`). The same reasoning binds
   here in the opposite direction: `classSalaryReport` may not be borrowed as a stand-in "still-disabled"
   demo item for any future test that merely wants *some* disabled specimen to click — its identity (payroll
   backend needed) must stay truthful to its own reason copy.
4. **It must never be merged with planned/coming-soon semantics.** `disabled` and `planned` are DISTINCT,
   mutually exclusive statuses with distinct render paths (`sidebar.js:33` vs `:37-40`), distinct hooks
   (`data-coming-soon`/`data-soon-key` vs `data-disabled-reason`/`data-reason-key`), and distinct meanings: a
   `planned` item is roadmapped future frontend work; a `disabled` lock is frontend-complete and blocked only
   on a backend that does not yet exist. Collapsing the two — e.g. by adding `data-coming-soon` to this
   button, or by counting it inside any `planned` census — would misrepresent a backend dependency as a
   frontend to-do and is forbidden.
5. **It is the ONLY disabled item, and that cardinality is itself a frozen invariant** (§6) — a future spec
   adding a second `disabled` lock must update this register and the `locks === 1` assertions with an explicit,
   declared supersession (per the sanctioned-amendment discipline established by Specs 038–040), never
   silently.
6. **`finance-analysis` must stay absent** (§8) — it must never be invented as a nav item, route, page, or
   even a second honest lock, by any spec that is not itself the backend spec delivering real financial
   analysis. Its correct treatment is continued absence, not a placeholder.

## 10. Summary table

| Fact | Value |
|---|---|
| Nav item id | `classSalaryReport` |
| Source location | `src/js/nav.config.js:90` |
| Status | `disabled` (1 of 50 admin items; the only one) |
| Element | `<button type="button">` — non-anchor |
| `href` | absent |
| `aria-disabled` | `"true"` |
| Gate hook | `data-disabled-reason` (boolean) |
| Reason key | `data-reason-key="nav.reason.finance"` |
| Reason copy (AR) | يتطلب نظام الفوترة الفعلي — صفحة «المالية» تعرض معاينة تجريبية بالبيانات الثابتة. |
| Reason copy (EN) | Requires the real billing backend — the Finance page shows a fixture-only preview. |
| Lock icon | `<use href="#i-lock">` inside a `nav-lock` `<svg>` |
| Route | none (structurally impossible to set — build guard `nav.config.js:158`) |
| `data-coming-soon` | absent (NOT planned) |
| Rendered on | 64/64 admin pages (shared sidebar) |
| Companion surface | finance Overview `report-card[data-report="classSalaryReport"]` (§5), same reason, figure-free |
| Owner | the payroll/billing backend (undelivered; no frontend spec owns it) |
| Smoke coverage | `run.cjs:1728-1742`, `1769-1793`, `2386-2398`, `2526-2527`, `2551` (5 independent assertion sites) |
| `finance-analysis` | ABSENT sitewide (0 matches in source or all 115 built pages); must not be invented |
