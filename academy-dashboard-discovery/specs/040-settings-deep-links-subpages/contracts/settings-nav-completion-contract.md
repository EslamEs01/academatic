# Contract — Settings Nav Completion (Spec 040)

Baseline: **HEAD `58a53e2`** (the watcher already committed Spec 039 **and** the Spec 040 spec artifacts; working
tree clean; `app/tests/` byte-identical to HEAD). Every diff/md5 baseline in this contract is taken against
`58a53e2` — **not** `4cbcb31` (CLAUDE.md is stale on this point: documentation drift, not a code conflict).

`src/js/nav.config.js` is the **ONLY navigation-source edit** of Spec 040. `src/js/components/sidebar.js` stays
**0-diff**.

---

## 1. The six flips (exact, verified against source at `58a53e2`)

Current source (`src/js/nav.config.js:107-116`), settings category, seven items:

```js
item({ id: 'settings',              labelKey: 'nav.settings',              icon: 'settings', route: 'settings.html' }),   // 109 — already implemented
item({ id: 'settingsGeneral',       labelKey: 'nav.settingsGeneral',       icon: 'settings', status: 'planned' }),        // 110
item({ id: 'settingsIntegrations',  labelKey: 'nav.settingsIntegrations',  icon: 'grid',     status: 'planned' }),        // 111
item({ id: 'settingsCustomization', labelKey: 'nav.settingsCustomization', icon: 'sparkles', status: 'planned' }),        // 112
item({ id: 'settingsNotifications', labelKey: 'nav.settingsNotifications', icon: 'bell',     status: 'planned' }),        // 113
item({ id: 'settingsSecurity',      labelKey: 'nav.settingsSecurity',      icon: 'lock',     status: 'planned' }),        // 114
item({ id: 'settingsUsers',         labelKey: 'nav.settingsUsers',         icon: 'staff',    status: 'planned' }),        // 115
```

| # | Line | nav id | Before | After | Tab id (EXISTING) |
|---|---|---|---|---|---|
| 1 | 110 | `settingsGeneral` | `status:'planned'` | `route:'settings.html#view=general'` | `general` |
| 2 | 111 | `settingsIntegrations` | `status:'planned'` | `route:'settings.html#view=integrations'` | `integrations` |
| 3 | 112 | `settingsCustomization` | `status:'planned'` | `route:'settings.html#view=customization'` | **`customization`** |
| 4 | 113 | `settingsNotifications` | `status:'planned'` | `route:'settings.html#view=notifications'` | `notifications` |
| 5 | 114 | `settingsSecurity` | `status:'planned'` | `route:'settings.html#view=security'` | `security` |
| 6 | 115 | `settingsUsers` | `status:'planned'` | `route:'settings.html#view=users'` | `users` |

Mechanics: `const item = (o) => ({ status: o.status || 'implemented', ...o });` (`nav.config.js:16`) — dropping
`status:'planned'` and adding `route` makes the item **implemented** by default. Each flip is therefore a
**two-token** edit: `status: 'planned'` → `route: '…'`. `id`/`labelKey`/`icon` are **unchanged** (icons stay
`settings · grid · sparkles · bell · lock · staff`).

### 1.1 Spelling trap (confirmed, binding)
nav id = `settingsCustomiz**ation**` → tab id `customization` (**US** spelling, no `s`). The legacy route is
`/management/settings/customi**s**ation/...` (UK spelling). **Do not carry the legacy `s` into the route or the tab
id.** A `#view=customisation` hash matches no tab → the tabs widget would fall back to the baked first tab and the
deep-link assert fails.

### 1.2 The six tab ids are NOT invented by Spec 040
`pages/settings.js` already renders `tabs({group:'settings'})` with exactly
`['general','notifications','customization','security','users','integrations']`, byte-pinned at
`tests/smoke/run.cjs:1194`. Spec 040 **does not add, rename, reorder or remove a tab** — it only points nav items at
tabs that already exist. That assert stays **byte-verbatim**.

---

## 2. Route strings — AR authored, EN derived

`route` strings are written **without** `.en`. `sidebar.js`'s hash-aware `langRoute()` (Spec 035,
`sidebar.js:20-27`) splits on the first `#`, appends `.en` to the file part only, and re-attaches the hash:

```
settings.html#view=general  --langRoute(en)-->  settings.en.html#view=general
```

| nav id | AR href | EN href |
|---|---|---|
| `settingsGeneral` | `settings.html#view=general` | `settings.en.html#view=general` |
| `settingsNotifications` | `settings.html#view=notifications` | `settings.en.html#view=notifications` |
| `settingsCustomization` | `settings.html#view=customization` | `settings.en.html#view=customization` |
| `settingsSecurity` | `settings.html#view=security` | `settings.en.html#view=security` |
| `settingsUsers` | `settings.html#view=users` | `settings.en.html#view=users` |
| `settingsIntegrations` | `settings.html#view=integrations` | `settings.en.html#view=integrations` |
| `settings` (hub, unchanged) | `settings.html` | `settings.en.html` |

`sidebar.js` **0-diff** — no `langRoute()` change is needed; hash-awareness shipped in Spec 035 and is proven by the
Spec 037/038/039 deep-links (`reports.html#view=monthly`, `finance.html#view=invoices`,
`library.html#view=materials`, `certificates.html#view=requests`).

---

## 3. Sidebar rendering change (derived, not edited)

`sidebar.js` `navItem(it, activeId)` is status-driven. The six items move from the **planned** branch (line 33) to
the **implemented** branch (line 46):

| | Before (planned branch, `sidebar.js:33-35`) | After (implemented branch, `sidebar.js:46-48`) |
|---|---|---|
| Element | `<button type="button" class="nav-item is-planned">` | `<a href="settings(.en).html#view=…" class="nav-item">` |
| Status attr | `data-nav-status="planned"` | `data-nav-status="implemented"` |
| Coming-soon | `data-coming-soon data-soon-key="nav.comingSoon"` | **absent** |
| Badge | `<span class="nav-soon">قريبًا</span>` | **absent** |
| `aria-disabled` | — | — |
| Lock icon | — | — |
| `aria-current="page"` | never | when `activeId` matches |

**Rendered per admin page: 6 `<button class="nav-item is-planned">` → 6 `<a class="nav-item">`.**
`[data-coming-soon]` per admin page: **6 → 0**. Sitewide (115 pages): **0**.

`.nav-item` **count is unchanged** (a status flip changes the item's *element*, not the item *count*) → the settings
category stays **7** items and the admin menu stays **50** (`smoke:1300` `navCount32===50`, `smoke:2270`/`:2341`
`adminMenu===50` all stay byte-verbatim).

### 3.1 Retained-but-unexercised branches (zero-deletion law)
After Spec 040 the app has **zero** `status:'planned'` nav items. The planned branch in `sidebar.js:33` and the
`data-coming-soon` branch in `enhance.js` are **kept, not deleted** — they become intentionally unexercised, exactly
like `components/portal-shell.js:30`'s `is-planned` branch, which has had zero instances since Spec 025
(`ROLE_NAV` carries no planned item; every `public/*-portal.html` shows `data-coming-soon` = 0) and whose honest test
expression is the vacuous `plannedNavAnchors === 0`. Record this in `screenshots/REVIEW.md`.

---

## 4. Build-time nav guard (must pass unchanged)

`nav.config.js:151-157` runs at import time for every item in every category:

```js
if (it.status === 'implemented' && !it.route)  throw new Error(`nav.config: implemented item '${it.id}' needs a route`);
if (it.status !== 'implemented' && it.route)   throw new Error(`nav.config: non-implemented item '${it.id}' must not have a route`);
if (it.status === 'disabled' && !it.reasonKey) throw new Error(`nav.config: disabled item '${it.id}' needs a reasonKey`);
```

Consequences, binding:
- **implemented ⇒ MUST carry a route.** A "flip without a route" is impossible — the build throws. This is why all
  six flips carry a `#view=` route and why "flip to implemented but keep it pointing nowhere" was never an option.
- `classSalaryReport` (`status:'disabled'` + `reasonKey:'nav.reason.finance'`) keeps **no route** and keeps its
  `reasonKey` → still passes. It is an honest **lock**, categorically **not** a planned item; Spec 040 does not touch
  it and **never** repoints a planned-item probe at it.
- The guard also enforces the negative: none of the six may be left `planned` **with** a route.

---

## 5. MUST NOT change

`nav.config.js` outside lines 110-115: `BRAND` · `item()` · the `control`/`families`/`teachers`/`reports`/`admin`
categories and every item in them · the `settings` hub item (line 109, already `route:'settings.html'`) ·
`classSalaryReport` · `catItems`/`categoryOf` · `FUTURE_ROLE` · `FUTURE_ROUTES` (stays `{}`) · the guard block ·
every role-portal nav (`ROLE_NAV`).

---

## 6. Acceptance

1. `nav.config.js` diff = exactly six two-token edits on lines 110-115. `git diff --stat src/js/nav.config.js` shows
   one file, ≤ 12 changed lines. No other application-source navigation edit.
2. Build succeeds (the guard does not throw) and emits **115** public HTML files.
3. On every admin page, AR **and** EN: each of the six renders as
   `<a class="nav-item" data-nav="<id>" data-nav-status="implemented" href="settings(.en).html#view=<tab>">` — no
   «قريبًا», no `data-coming-soon`, no `aria-disabled`, no `use[href="#i-lock"]`.
4. `href` matches `/(^|\/)settings\.(en\.)?html#view=(general|notifications|customization|security|users|integrations)$/`.
5. Fresh-context load of each of the twelve URLs (6 tabs × AR/EN) opens **exactly one** visible `[role=tabpanel]` —
   the target — with **0 external requests**.
6. `.nav-panel .nav-item` = **50**; settings category = **7**; settings planned = **0**;
   sitewide `[data-coming-soon]` = **0**; disabled locks = **1** (`classSalaryReport`).
7. Node-side `nav.config` **source** audit (post-`browser.close()`, `smoke:2347-2363`): each of the six is
   `status === 'implemented'` with the exact route string; `planned` count = 0; `disabled` count = 1;
   `Object.keys(FUTURE_ROUTES).length === 0`; flat item count = 50.
