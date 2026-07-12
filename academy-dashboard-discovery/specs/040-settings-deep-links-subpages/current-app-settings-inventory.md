# Current-App Settings Inventory (Spec 040)

Baseline: HEAD `4cbcb31` + the green Spec 039 working tree. All line numbers are from that tree.

## 1. The settings nav category — `src/js/nav.config.js:106–117`

| # | Line | id | labelKey | AR label | EN label | Status | Route | In `FUTURE_ROUTES`? |
|---|---|---|---|---|---|---|---|---|
| 1 | 109 | `settings` | `nav.settings` | الإعدادات | Settings | **implemented** | `settings.html` | — |
| 2 | 110 | **`settingsGeneral`** | `nav.settingsGeneral` | عام | General | **planned** | none | **NO** |
| 3 | 111 | **`settingsIntegrations`** | `nav.settingsIntegrations` | التكاملات | Integrations | **planned** | none | **NO** |
| 4 | 112 | **`settingsCustomization`** | `nav.settingsCustomization` | التخصيص | Customization | **planned** | none | **NO** |
| 5 | 113 | **`settingsNotifications`** | `nav.settingsNotifications` | الإشعارات | Notifications | **planned** | none | **NO** |
| 6 | 114 | **`settingsSecurity`** | `nav.settingsSecurity` | الأمان | Security | **planned** | none | **NO** |
| 7 | 115 | **`settingsUsers`** | `nav.settingsUsers` | المستخدمون والموظفون | Users & staff | **planned** | none | **NO** |

`FUTURE_ROUTES` is an **empty object** (`nav.config.js:141–148`) — there is nothing to trim. The build-time guard (L151–157) enforces: implemented ⇒ route required; non-implemented ⇒ route forbidden; disabled ⇒ reasonKey required. Adding a `route:` to any of the six automatically promotes it to `implemented` (`item()` default, L16).

**Counts (computed by importing the module)**: control 12 · families 9 · teachers 6 · reports 11 · admin 5 · settings 7 = **50**. Planned = **6**, all in settings — the only planned-bearing category. Disabled = **1** (`classSalaryReport`).

## 2. The Settings hub — `src/js/pages/settings.js`

`tabs({ group:'settings', ariaKey:'adm.set.tab.aria' })` with 6 tabs, `general` baked as the default (first tab).

| Tab id | Sections | **Form fields** | Actions | backendRequired gates | Other content |
|---|---|---|---|---|---|
| `general` | `set-gen-identity`, `set-gen-loc`, `set-gen-heads` + `<template data-preview="head-add">` | **2** (name input + status select — **only inside the drawer**) | 5 | 3 | 14 display rows (5 identity + 1 pay-pointer + 4 location + 4 expense heads), 4 chips, 1 drawer |
| `notifications` | `set-notif`, `set-notif-matrix` | **0** | 4 | 1 | 9 rows; 2 demo toggles + 1 native-disabled; 6 matrix rows with on/off chips |
| `customization` | `set-appearance`, `set-cust-brand` | **0** | 7 | 2 | 6 rows; **5 REAL controls** (3 × `data-set-theme`, 2 × `data-set-lang`); 4 display-only hex swatches |
| `security` | `set-account`, `set-sec-policies` | **0** | 5 | 3 | 2 rows; 2FA = native `disabled` button (not a hook gate); 1 confirm (reset demo data, toast only); 2 policy text blocks |
| `users` | `set-users-open`, `set-roles` | **0** | 1 (a **real** `<a href="staff.html">`) | 0 | 1 row + 4 permission groups / 12 permission items (display-only, no enforcement) |
| `integrations` | `set-integ` | **0** | 14 | **14** (7 connect + 7 test) | **7** provider cards (`data-integration="ig1..ig7"`) + 7 status chips |
| **TOTAL** | **12** | **2** | **36** | **23** | 1 drawer · 1 confirm · 2 demo toggles · 6 real controls |

Built `public/settings.html` corroborates: 24 `data-disabled-reason` (23 body + 1 sidebar lock), 6 `data-coming-soon`, 1 `data-drawer`, 1 `data-confirm`, 0 `data-modal-trigger`, 0 `data-demo-action`.

## 3. Safety census — current app

| Check | Value |
|---|---|
| `type="password"` | **0** (structurally impossible — `field()` emits only `text`/`number`) |
| `type="file"` | **0** |
| `<canvas>` / draggable / chart engine | **0** |
| Credential-like input (password/secret/api/key/token/webhook) | **0** |
| Authored secret value in any fixture/locale | **0** |
| Currency / pay figure in the settings body | **0** |
| `href="#"` | **0** |
| Raw locale keys | **0** |
| Provider status reading "connected" | **0** (chips are «غير مربوط» / «متاح للربط») |

Nearest-to-sensitive literals are obvious placeholders: `demo.academy`, `info@demo.academy`, `05xx-xx-0000`, `admin@example.edu`, and the provider **label** `Email / SMTP`.

## 4. Per-item classification (the required taxonomy)

| Item | Classification | Evidence |
|---|---|---|
| `settingsGeneral` | **existing tab with missing deep-link** + **implemented but shallow/incomplete** | tab `general` exists; renders 0 inputs; entire automation group and 2FA absent |
| `settingsIntegrations` | **existing tab with missing deep-link** + **static preview only** | 7 cards, **0** configuration fields; 4 of 11 providers missing |
| `settingsCustomization` | **existing tab with missing deep-link** + **implemented but shallow/incomplete** | 5 real controls (keep); 9 of 11 status colours and 3 layout controls absent |
| `settingsNotifications` | **existing tab with missing deep-link** + **implemented but shallow/incomplete** | 6 matrix rows vs 47 evidenced controls |
| `settingsSecurity` | **existing tab with missing deep-link** + **implemented but shallow/incomplete** | 3 gates present; 4 import types, column contracts and policy structure absent |
| `settingsUsers` | **existing tab with missing deep-link** — closest to evidence-complete | roles preview + real `staff.html` link |
| Payment methods | **planned navigation item with existing surface — N/A**: not a nav item at all | lives inside Integrations (Payments incoming); 7 provider create forms in legacy |
| Message builder | **owned by another future spec** | only legacy evidence is a 504 |
| WhatsApp insights | **owned by another future spec** | messaging diagnostics, not configuration; leaks PII in legacy |
| Real provider connections | **owned by Spec 053** | out of scope by law |
| Teacher pay rules tab | **omitted by law** | teacher pay-free; owner = payroll backend |

**No item is "implemented and evidence-complete". No item is "duplicated/ambiguous"** — the only near-duplication (`settingsUsers` vs `staff`) was already resolved by Spec 031 making `staff.html` the single staff home, and is preserved here (see `page-vs-fold-decision-register.md`).

## 5. Dead / unused surface worth noting

- `SETTINGS[0]` (`id:'profile'`, `fixtures/settings.js:3–10`) is **never rendered** — `renderSettings()` uses only `SEC.notif` / `SEC.appearance` / `SEC.account`.
- Locale keys with **0 source hits** — evidence of intended-but-unbuilt scope that Spec 040 now fulfils: `adm.set.gen.automationTitle|autoRenew|autoMakeup|autoClose`, `adm.set.sec.tfa|tfaReason`, `adm.set.integ.configure|configureReason`, `adm.set.heads.editTitle|del*`, `adm.set.notif.event|channel|state`, `adm.set.cust.title`, `adm.set.sec.title`, `set.perm.roleStaff`.

## 6. Test & screenshot coverage today

- **smoke**: `settingsPlanned === 6` (L1446, L2340); a31 settings honesty — the exact 6-tab id list, a real theme control, ≥4 gates (L1193–1197); the tab-switch check (L1198–1209); the dashboard planned-item click probe pointed at settings (L223–230).
- **a11y**: 6 settings rows — `settings/ar/light`, `#view=integrations`, `#view=security` (dark), `#view=users` (EN), the `head-add` drawer, and mobile. **`#view=general`, `#view=notifications`, `#view=customization` are NOT covered** — the natural Spec-040 additions.
- **screenshots**: 8 settings frames (including the `cat: 'settings'` sidebar frame that shows the six «قريبًا» buttons — it will need re-baselining once they become links).
