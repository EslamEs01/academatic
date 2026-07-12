# Spec 040 — Implementation Status

**Status**: IMPLEMENTED · **Baseline**: HEAD `58a53e2` · **Branch**: `feature/012-role-portal-foundation`
**No commit / no push** — the watcher commits.

Spec 040 owned the **six remaining planned Settings nav items** — the last «قريبًا» claims in the product.
It was **not nav-only**: the six tabs existed but the whole hub rendered **2 form controls**. It now renders **73**.

---

## 1. The milestone

| Metric | Before | After |
|---|---|---|
| Public HTML · `PAGES` · new page bases | 115 · 57 · — | **115 · 57 · 0** |
| Admin menu · Settings items | 50 · 7 | **50 · 7** |
| Settings implemented / planned | 1 / 6 | **7 / 0** |
| **Sitewide planned · `[data-coming-soon]`** | 6 · 6 | **0 · 0** |
| Categories bearing a planned item | 1 | **0** |
| Disabled locks · `FUTURE_ROUTES` | 1 · `{}` | **1 · `{}`** |
| New hooks / storage keys / dependencies / components / `data-confirm` | — | **0 / 0 / 0 / 0 / 0** |

`classSalaryReport` remains the **one** honest lock (`disabled` + `nav.reason.finance` + no route).
A lock is **not** a planned item, and its reason-toast probe stays byte-verbatim.

## 2. The six routes

`settingsGeneral` → `settings.html#view=general` · `settingsIntegrations` → `#view=integrations` ·
`settingsCustomization` → `#view=customization` · `settingsNotifications` → `#view=notifications` ·
`settingsSecurity` → `#view=security` · `settingsUsers` → `#view=users`.
EN resolves through the hash-aware `langRoute()` → **`sidebar.js` 0-diff**. The US spelling `customization` is
used; the legacy UK `customisation` would be a dead deep-link.

## 3. Rendered census (asserted exactly in smoke, not as a floor)

| Tab | `field()` | booleans | structure rows | gates |
|---|---|---|---|---|
| General | 22 | 7 | 0 | 4 |
| Notifications | 13 | 34 | 0 | 7 |
| Customization | 16 | 0 | 0 | 3 |
| Security | 1 | 0 | 34 | 12 |
| Users | 0 | 0 | 0 | 0 |
| Integrations | 21 | 8 | 26 | 34 |
| **Total** | **73** (was 2) | **49** | **60** | **60** |

**49 booleans = 47 interactive `data-toggle` previews + 2 honestly DISABLED toggles** (`gen-monthlyPlan`,
`ntf-inApp`). A disabled control carries no toggle hook — that is correct, not a miscount.

## 4. Evidence conflicts resolved (each from raw HTML, not from a summary)

| Conflict | Sources | Resolution |
|---|---|---|
| Families import columns **9 vs 15** | a grounding agent said 9; the contract said 15 | **15** — the raw HTML carries `total_hours`, `invoice_type`, `course_type`, `payment_method`, `currency`, `hour_rate`. The agent truncated. 39 evidenced − 6 rejected slots = **33** safe, exactly as contracted. |
| Integrations safe fields **18 vs 21** | a grounding agent said 18 (WhatsApp = 0 fields) | **21** — the raw form for configure-variant 1 has `phone_number`, `send_group`, `group_name`. The agent read the screenshot (which shows a "Start Setup" gate) rather than the form. |
| XPay method toggles | plan evidenced 4 but never named them | Recovered from raw HTML: **Card · Fawry · Meeza Digital & mobile wallets · Kiosk Aman**. My first draft guessed *card/wallet/kiosk/bank* — **wrong**, and was replaced before it shipped. |
| `data-toggle` **0 → 49** | plan's "before" figure | The built body already had **2** (the legacy `SETTINGS.notif` demo toggles). Those are superseded; the **after** figure of 49 is unchanged. |
| Sensitive fields 17 vs 24 · hexes 7 vs 6 · General 28 vs 27 | specify artifacts vs raw HTML | **24 · 6 · 27+1 gated** — all confirmed against raw HTML. |

## 5. Laws upheld (verified on the built output, not asserted on faith)

- **Teacher pay-free**: the legacy General›Teachers tab (10 pay controls) and `rate_student_absent` are omitted —
  **0** occurrences in body, source **or comments**. The legacy import templates publish `hour_rate 25.50`,
  `hour_rate 30.00`, **`price 150.00`** and the full currency enum; **none is ported** (column *names* only).
- **No-secret**: `type=password` **0** · `type=file` **0** · credential-named inputs **0** · authored secret value
  **0**. All **24** sensitive provider fields are structure-only rows (label + required + purpose, no value slot).
- **No-fake**: **0** fake-"Connected" chip (the closed vocabulary is «غير مُعدّ» / «يتطلّب ربط الخادم» / «غير متاح»);
  every write is a direct `data-disabled-reason` gate; **0** new `data-confirm`.
- **Refused legacy defects**: PayPal defaulting to **Live** → we default to Sandbox. All 11 provider cards shipping
  `is_enabled` **ON** with nothing configured → no card carries an enable control at all. "Send Backup" firing a real
  DB backup with **no confirm** then redirecting to SMTP → a gate with standing scope/destination/permission/audit copy.
- **No real PII**: the corpus contains a real name + phone on the Custom-provider row and in the edit form, live
  WhatsApp invite URLs and unmasked phones in the insights pages. **0 ported.** The two WhatsApp-insights pages are
  excluded entirely (privacy → Spec 043).
- **Theme + language remain the only real writes** (existing `data-set-theme`/`data-set-lang`, existing keys),
  labelled as a personal preference.

## 6. Protected-test changes — exactly 2 supersessions + 2 strengthenings

| # | Change | Kind |
|---|---|---|
| S1 | `settingsPlanned === 6` → `=== 0` at `smoke:1446` and `smoke:2340` | **strengthening** of the same contract |
| S2 | The `.nav-item.is-planned` **click probe** (`smoke:223-230`) is **retired** — settings was the last planned category, so there is no honest specimen left to click. Replaced in place by a sitewide `planned === 0 && comingSoon === 0` census. | supersession |
| T1 | `a31.gates >= 4` → `>= 20` | sanctioned strengthening |
| T2 | `FORM_DRAWERS_032.settings: ['head-add']` → the exact **12**-id list | sanctioned strengthening (closes a register omission: an unregistered drawer escapes the MUST-OMIT audit) |

**Never done**: no fake planned item kept; no fake route; the probe was **not** repointed at `classSalaryReport`
(a disabled lock is not a planned item); the production coming-soon render branches in `sidebar.js` and
`enhance.js` are **retained but unexercised** (zero-deletion law), mirroring `portal-shell.js:30` since Spec 025.

**Additive coverage**: 6 anchor asserts × AR/EN · sitewide zero-planned census · exact per-tab form censuses ·
12-drawer register audit · chip-scoped fake-connected census · fake-success / pay-name / import-example / real-PII
censuses · **12 fresh-context deep-link executions** (each seeded with a *different* stored tab, so the hash must
beat `localStorage` — a discriminating test) · a source-level `nav.config` audit (planned 0 · locks 1 ·
`FUTURE_ROUTES` empty · menu 50).

## 7. Verification

| Gate | Result |
|---|---|
| Build | **115** pages · `PAGES` 57 |
| Smoke | **PASS** — 114 page loads |
| A11y | **critical = 0 · serious = 0** (+19 new rows incl. mobile-390 matrix/grid and 3 open drawers) |
| Screenshots | **370 captured · 0 console errors** (23 `sp040` frames) |
| Locale parity | `adm.*` **679 / 679**, 0 divergence |
| 0-diff wall | all **13** forbidden files byte-identical |
| Impact | **2 bodies changed** (`settings.html`/`.en`) · **62 sidebar-only** · **51 byte-identical** = 115 |

## 8. Files changed

**App (7)**: `nav.config.js` (6 flips) · `pages/settings.js` · `fixtures/settings-management.js` ·
`fixtures/settings-notifications.js` *(new)* · `locales/ar.adm.js` · `locales/en.adm.js` · `styles/app.css`
(additive `.set-struct` / `.set-acc` / `.set-swatch`).
**Tests (3)**: `smoke/run.cjs` · `a11y/run.cjs` · `screenshots/capture.cjs`.
**0-diff**: `i18n.js` · `build-html.mjs` · `package.json` · `enhance.js` · `sidebar.js` · `tabs.js` ·
`form-field.js` · `settings-section.js` · `preview-drawer.js` · `ui.js` · `fixtures/settings.js` · `staff.js` ·
`staff-management.js` · every portal source · every unrelated page.

## 9. Standing UNKNOWNs (recorded, never invented)

1. **Message Builder** — the only legacy evidence is HTTP 504 (`isErrorPage`, DOM all-zero). No UI was invented;
   the existing Spec-031 gate is unchanged. Owner **Spec 053**; placement review **Spec 048**.
2. **XPay Community ID / Variable Amount ID** — meaning unproven; the purpose copy says so explicitly.
3. **WhatsApp QR pairing wizard** — gated, never rebuilt.
4. **Email "Add Account"** management — not invented.
5. **`teacher_delay_reminder` ("Late 3 Minutes")** — label rendered verbatim; trigger semantics unknown, no help invented.
6. **The two legacy policy bodies are EMPTY** (`ql-blank`) — the legacy prose was never authored. Our bodies are our
   own Spec-031 placeholder copy, not ported content.
7. **`appnotifiy` disabled reason** — legacy gives none; we attach the honest generic backendRequired reason.

## 10. Findings handed forward

- **`common.backendRequiredNote`** (the shared Spec-032 gate reason) reads "…nothing is **saved** yet" in EN. It is
  *honest* (it denies a save) but contains the token, and it is rendered on ~50 pages. Rewording it would change ~50
  page bodies and breach this spec's 2-body impact allowlist. Sitewide the token count **fell 182 → 179** (Spec 040
  removed 3 and added none). A product-wide copy sweep belongs to **Spec 044/056**.
- **WhatsApp insights** PII leak (live `chat.whatsapp.com` invite URL, unmasked phones/emails) → **Spec 043**.
- Real provider connections, payments, payouts, SMTP, message builder → **Spec 053**. Meetings → **054**.
  Propagation → **055**. Teacher pay rules + `classSalaryReport` → the payroll backend.
