# Spec 040 — Data Model (authored frontend configuration structures)

**Baseline:** HEAD `58a53e2`. Count freeze **115 public HTML / 57 `PAGES` / 50 admin-menu items** — this model adds **0 pages, 0 nav items, 0 hooks, 0 storage keys, 0 dependencies**.

Everything below is an **authored, display-only fixture shape**. There is **no backend, no API, no persistence, no state machine, no engine**. "Entity" here means *a JS object literal exported from a fixture module and rendered once at build time into static HTML*. No entity is ever fetched, saved, diffed, validated at runtime, or reconciled with a server.

---

## 0. Global bans (apply to EVERY entity in this document)

| # | Ban | Enforced by |
|---|---|---|
| B1 | **No credential VALUE field.** No entity in this model may carry a `value`, `valueKey`, `placeholder`, `default`, `example`, or `sample` for any API key, secret, client secret, HMAC secret, integration id, merchant code, username, password, token or webhook secret. Sensitive configuration is modelled **only** as `SensitiveConfigurationRequirement` = `{labelKey, required, purposeKey}` — a **structure row**, never an `<input>`. | Ledger K/R1; `smoke:1174` `a31.credInputs === 0` |
| B2 | **No persisted API key / token / secret.** 0 new `localStorage` keys (only the two existing real ones: `academy.theme`, `academy.lang`, plus the pre-existing `academy.schedView.settings` tab memory written by `tabs()`). Nothing a user types is ever stored, anywhere. | Ledger A/H; STOP-7 |
| B3 | **No teacher salary / pay amount field.** The 10 legacy General›Teachers pay controls + `rate_student_absent` (**11 total**) are EXCLUDED BY LAW and appear in **no** fixture, no locale key, no comment as a renderable. The Notifications `salaries` row is a **routing-only channel select with 0 amount/rate/currency token**. The Security Teachers/Families import `hour_rate` + `currency` columns are **REJECTED** column decisions. | Teacher pay-free GLOBAL; Ledger F.1-B / F.2 / F.4; STOP-6 |
| B4 | **No provider token.** No `IntegrationProvider` carries a token, key, secret, session, QR payload, pairing code, or websocket/Echo channel. The legacy 7-code WhatsApp connection enum is a **fixture comment only** — never a rendered state, never simulated. | Ledger F.5; STOP-4/5 |
| B5 | **No backend persistence.** Every final write / connect / test / pair / import / upload / backup / save is either an honest `data-disabled-reason` **gate** (`common.backendRequiredNote`) or a **labelled local preview** that claims no persistence. | No-fake law; STOP-5 |
| B6 | **No fake connected status.** `IntegrationProvider.statusId` may only resolve to one of the **CLOSED three** honest chips: `not-connected` («غير مُعدّ» / "not configured") · `requires-server` («يتطلّب ربط الخادم» / "requires the server") · `unavailable` («غير متاح»). **Chip-token law:** the tokens «متصل» / `connected` may **not** appear in a chip **at all** — not even as "not connected" — because the census is chip-scoped and token-absolute (`0` chips matching `/متصل\|connected/i`); the honest backendRequired sentence *"available once the server is connected"* legitimately contains the word **elsewhere in the body**, which is why a body-wide affirmative-only regex is unwritable. | Ledger F.5; STOP-5; `integrations-catalog-contract.md` §2 |
| B7 | **0 `type=password`, 0 `type=file`, 0 `<canvas>`, 0 `draggable`, 0 `download=` attribute, 0 `window.open`.** `field()` structurally supports only `text\|number\|select\|textarea`. Uploads/QR/logo-pick/backup-run/template-download are **`<button>` gates**. | `field()` signature (`components/form-field.js:14`); Ledger K/R3; STOP-4 |
| B8 | **Closed hook set.** Booleans render through the **existing** `settingsSection({rows:[{control:{kind:'toggle'}}]})` path (`components/settings-section.js:26-31` → `<button class="toggle" data-toggle data-toast=…>`). **No new `field()` type, no checkbox, no new `data-*` hook.** `form-field.js`, `settings-section.js`, `preview-drawer.js` stay **0-diff**. | Ledger H; STOP-1/7 |

**Field-naming law (R1, hard).** Every rendered `name`/`id` in this model MUST NOT contain any of
`pass` · `secret` · `api` · `key` · `token` · `webhook` · `card` · `cvv`
(`smoke:1174` greps `name`+`id` sitewide). **Defensive extension (this spec):** also avoid `salary` · `hour-rate` · `hour_rate` · `fine` · `payout` · `iban`, so that any field later moved into a `formDrawer` cannot trip the `FORM_DRAWERS_032` MUST-OMIT audit (R4).
Consequences already baked in below: legacy `card_style` → **`cust-surface`**; legacy `salaries` channel → **`ntf-salEventsCh`**; legacy `…-payout-…` mode controls → **`integ-pmb-out-mode`** / **`integ-pyn-out-mode`** (the drawer *id* `integ-paymob-payout` is fine — the audit reads control names, not template ids); `key1..key4` / `settings[api_key]` / `smtp_username` / `smtp_password` / webhook URL → **structure rows, no input at all**.

**Naming register of record.** Every rendered `name`/`id` in this model is the one fixed by its domain contract — `automation-rules-contract.md` §2-3 (General automation), `notification-matrix-contract.md` §4 (the 13 notification `field()`s), `customisation-contract.md` §1 (the 16 Customization `field()`s), `security-import-backup-policy-contract.md` §B.2 (the 1 Security `field()`), `sensitive-provider-fields-contract.md` §4 (the 21 Integrations `field()`s + the 8 toggle ids). Where this document once carried a different working name, the **contract wins**; the tables below have been reconciled to them.

**Validation semantics.** Fields are **INERT** (`form-field.js` header: "no behavior hook, no persistence, no validation"). Therefore the "Validation" column of every table below means **authoring-time invariants**, checked by the build (`build-html.mjs` chip-tone guard) and by `app/tests/smoke/run.cjs` — **not** runtime input validation. There is no client-side validator, no regex on user input, no required-field enforcement.

---

## 1. Fixture home map (reuse vs new)

| Fixture module | Status | Exports after Spec 040 |
|---|---|---|
| `app/src/js/fixtures/settings-management.js` | **EXTENDED** | `IDENTITY_FIELDS` (new, 10) · `IDENTITY_OPTS` (new — the authored country/city/timezone option lists) · `AUTOMATION_GROUPS` (new, 17 controls) · `LOCATIONS` (kept, 4) · `EXPENSE_HEAD_STATUS` + `EXPENSE_HEADS` (kept, 4) · `POLICIES` (kept, 2) · `BRAND_ROWS` (**4 → 13**) · `APPEARANCE_OPTS` (new, 3) · `STATUS_COLORS` (new, 11) · `SECURITY_IMPORTS` (new, 4) · `BACKUP` (new, 1) · `TWOFA_ROW` (new, 1) · `INTEG_KIND` (kept, +2 ids) · `INTEG_STATUS` (kept, 2) · `INTEGRATIONS` (**7 → 11**) · `PROVIDER_FIELDS` (new, 11 matrices) · `PAYMENT_INSTANCES` (new, **empty array**) · `NOTIF_MATRIX` (**superseded — deleted**, replaced by the new module) |
| `app/src/js/fixtures/settings-notifications.js` | **NEW** | `CHANNEL_OPTS` (5) · `NOTIF_GROUPS` (9 groups / 47 controls) · `NOTIF_ROUTES` (10) |
| `app/src/js/fixtures/settings.js` | **0-DIFF** | `SETTINGS` (shell: profile/appearance/notif/account) · `ROLES_PREVIEW` (4 groups) — the Users tab reads `ROLES_PREVIEW` unchanged |
| `app/src/js/fixtures/staff-management.js` | **0-DIFF** | Owned by `staff.html`. **Never imported by `settings.js`.** |
| `app/src/js/fixtures/form-options.js` | **0-DIFF** | `FORM_STATUS_OPTS` reused as-is where a status select is needed |

**STOP condition:** any diff in `fixtures/settings.js`, `fixtures/staff-management.js`, `fixtures/form-options.js`, `components/form-field.js`, `components/settings-section.js`, `components/preview-drawer.js` ⇒ halt (Ledger STOP-1).

---

## 2. Core configuration entities

### 2.1 `SettingsDomain`

One per settings hub tab. **Six domains, tab ids byte-pinned at `smoke:1194` — unchanged by Spec 040.** This entity is *implicit* (it is the existing `tabs({group:'settings'})` call in `pages/settings.js`); it is modelled here because Spec 040 is what makes each domain **addressable**.

| Field | Type | Notes |
|---|---|---|
| `id` | `'general'\|'notifications'\|'customization'\|'security'\|'users'\|'integrations'` | Existing tab ids. **US spelling `customization`** — the legacy route is `/management/settings/customi**s**ation/…`; the UK `s` is **not** carried into the id or the route. |
| `navId` | `settingsGeneral \| settingsNotifications \| settingsCustomization \| settingsSecurity \| settingsUsers \| settingsIntegrations` | `nav.config.js:110-115` |
| `route` | `settings.html#view=<id>` | The **only** nav-source edit of Spec 040: 6× add `route` + drop `status:'planned'`. EN (`settings.en.html#view=<id>`) is derived automatically by the hash-aware `langRoute()` (Spec 035) — `components/sidebar.js` stays 0-diff. |
| `sections` | `SettingsSection[]` | See 2.2 |

**Relationships:** `SettingsDomain 1—N SettingsSection`. Deep-link resolution: hash → `localStorage['academy.schedView.settings']` → baked first tab; exactly ONE `[role=tabpanel]` visible on fresh load.
**Validation:** `implemented ⇒ route` (build-time guard `nav.config.js:151-157`). Sitewide planned **must** be 0, `[data-coming-soon]` **must** be 0, `FUTURE_ROUTES` **must** stay `{}` (STOP-3).
**Ban:** no domain may introduce a 7th tab, a page, or a nav item.

### 2.2 `SettingsSection`

The render unit inside a domain — one `settingsSection()` card (existing component, 0-diff) or one inline `<section class="set-section">` block.

| Field | Type | Notes |
|---|---|---|
| `id` | string | e.g. `gen-identity`, `gen-auto-renewal`, `ntf-class`, `cust-status`, `sec-import-teachers` |
| `titleKey` / `descKey` | i18n key (`adm.set.*`) | AR/EN mirrored, 0 divergence |
| `icon` | icon id | existing icon set only |
| `accent` | `primary\|amber\|sky\|teal` | existing tones only (R6 chip-tone guard: `live\|upcoming\|completed\|cancelled\|amber\|neutral` for chips) |
| `rows` | `SettingsFieldDefinition[] \| SensitiveConfigurationRequirement[]` | mixed |
| `collapsible` | boolean | `true` ⇒ wrapped in a native `<details class="set-acc">` (zero JS, zero new hook; precedent `add-family.js:51`) |
| `previewNote` | boolean | `true` ⇒ renders the visible **preview-only note** («معاينة فقط — لا يُخزَّن أي تغيير قبل ربط الخادم.» / "Preview only — nothing is stored until the server is connected"). **Mandatory on every section containing a `data-toggle`** (R5). **The note must not contain `saved` / «الحفظ»** — the fake-success census greps those tokens over body **and** template text |
| `save` | `{ kind:'gate', reasonKey:'common.backendRequiredNote' }` \| `null` | Exactly ONE gated Save per section, a **direct** `data-disabled-reason` gate. **Never** `data-demo-action`, **never** `set.savedToast`, **never** chained behind a `data-confirm` (Spec 040 adds zero confirms) |

**Ban:** a section may not carry a success toast, a "تم الحفظ"/"saved"/"done" string, or a `data-demo-action` on a persistence-implying control (STOP-5).

### 2.3 `SettingsFieldDefinition`

The only renderable input shape. Emitted through `field()` (`components/form-field.js`, **0-diff**).

| Field | Type | Notes |
|---|---|---|
| `name` | string | **Subject to the field-naming law (§0).** Also the DOM `id` (`f-${name}`) |
| `labelKey` | i18n key | every field has a visible `<label for>` |
| `type` | `'text'\|'number'\|'select'\|'textarea'` | **the complete set.** `password`/`file`/`checkbox`/`color` are structurally unreachable (B7/B8) |
| `options` | `SettingsFieldOption[]` | select only |
| `valueKey` / `value` | i18n key / string | **BAN:** may be present ONLY for non-sensitive academy identity/automation/appearance defaults. **NEVER** for a credential, key, secret, token, webhook, password, or pay amount (B1/B3) |
| `helpKey` | i18n key | rendered only where legacy help text is **proven**; otherwise omitted (never invented) |
| `dependsOn` | `SettingsDependency \| null` | see 2.5 — **documented, not enforced** |
| `full` | boolean | `.field-full` in the `.wiz-grid` |

**Count contract (Ledger F.7):** **73** `field()` controls after Spec 040 (was **2**).
General **22** · Notifications **13** · Customization **16** · Security **1** · Users **0** · Integrations **21**.

### 2.4 `SettingsFieldOption`

| Field | Type | Notes |
|---|---|---|
| `value` | string | **authored verbatim from legacy where the enum is proven.** Never invent a missing value: `classes_not_closed` has **no value `1`** in legacy; `NotificationChannel` has **no value `2`** — both absences are preserved. |
| `labelKey` | i18n key | legacy typos are corrected in *copy* only (e.g. "whats App" → «واتساب»/"WhatsApp"); the **value** is untouched |
| `selected` | boolean | at most one per option set; the authored default |

### 2.5 `SettingsDependency`

Legacy conditional-enable relationships (e.g. the cancellation-window numbers only matter when the matching cancel toggle is on; the reminder-hours numbers only matter when the reminder toggle is on).

| Field | Type | Notes |
|---|---|---|
| `sourceName` | string | the controlling field/toggle `name` |
| `condition` | string (documentation only) | e.g. `"teacher_cancel_enable = on"` |
| `effect` | `'meaningful-only-when'` | the **only** allowed effect |
| `renderAs` | `'helpKey'` | rendered as static help copy under the dependent field |

**Ban (explicit):** **NO reactive JS.** There is no listener, no show/hide, no enable/disable at runtime — that would require a new `data-*` hook (B8). A dependency is a *sentence*, not a behaviour. If a dependency cannot be stated from proven legacy evidence, it is **UNKNOWN** and is not rendered.

---

## 3. General domain

### 3.1 Identity (`IDENTITY_FIELDS` — `fixtures/settings-management.js`, extended)

10 `field()`s. Legacy Group A = 11 controls → **10 rendered + 1 gated** (`logo` `type=file` → **upload GATE**, B7).

| # | Legacy name | `name` | `type` | Notes |
|---|---|---|---|---|
| 1 | `company_name` | `gen-name` | text | |
| 2 | `company_name_ar` | `gen-nameAr` | text | |
| 3 | `domain` | `gen-domain` | text | |
| 4 | `email_info` | `gen-email` | text | |
| 5 | `phone` | `gen-phone` | text | |
| 6 | `whatsapp` | `gen-whatsapp` | text | |
| 7 | `address` | `gen-address` | text | |
| 8 | `country_id` | `gen-country` | select | |
| 9 | `city` | `gen-city` | select | |
| 10 | `timezone` | `gen-timezone` | select | |
| — | `logo` (`type=file`) | — | — | **GATE.** 0 `type=file`. |

**Legacy Group B (10 teacher-pay controls) + `rate_student_absent` = 11 fields, EXCLUDED BY LAW (B3).** They exist in this document **only** as the exclusion register (Ledger F.1-B); their section headers ("Hour Rates" / "Salary" / "Salary Tiers") and all help copy are **not rendered, not translated, not commented as future work**.

**Kept unchanged on this tab:** `LOCATIONS` (4 display rows) · `EXPENSE_HEADS` (4 rows, **name + status only, NO amount**) + the existing `head-add` drawer (2 fields: name + status). → General `field()` total = 10 + 10 (automation) + 2 (`head-add`) = **22**.

### 3.2 `AutomationRule` (`AUTOMATION_GROUPS` — `fixtures/settings-management.js`, new)

Legacy Group C: **18 controls / 17 distinct names → 17 rendered, 1 excluded** (`rate_student_absent`, B3).

| Field | Type | Notes |
|---|---|---|
| `groupId` | `'renewal'\|'cancellation'\|'attendance'\|'closing'\|'reporting'` | 5 native `<details class="set-acc">` accordions |
| `name` | string | our `name` (naming law) |
| `legacyName` | string (comment only) | traceability; never rendered |
| `control` | `'select'\|'number'\|'toggle'` | 5 · 5 · 7 |
| `options` | `SettingsFieldOption[]` | select only |
| `value` | string\|number | authored default, verbatim from legacy where proven |
| `mode` | `'preview'\|'disabled'` | `disabled` ⇒ `reasonKey` (honest lock) |
| `reasonKey` | i18n key | required when `mode:'disabled'` |

**5 selects:** `gen-newCourseStatus` (`new_course_status`, 4 opts) · `gen-renew` (`renew`, 3) · `gen-autoMakeup` (`auto_makeup`, 4) · `gen-classesNotClosed` (`classes_not_closed`, **3** — legacy value `1` is genuinely absent; **do not invent it**) · `gen-teacherEditClass` (`teacher_can_edit_class`, 3).
**5 numbers:** `gen-stopAfter` (2) · `gen-closeHours` (12) · `gen-teacherCancelWindow` (120) · `gen-familyCancelWindow` (120) · `gen-entryWindow` (5).
**7 toggles** (`settingsSection` `kind:'toggle'`, existing `data-toggle`): `gen-courseCompleted` · `gen-monthlyPlan` (**`mode:'disabled'`** — legacy ships it disabled behind "No WhatsApp Connected"; we render an honest reason and **do not reproduce the WhatsApp framing**) · `gen-teacherCancel` · `gen-familyCancel` · `gen-makeupCredit` (on) · `gen-noMakeupCredit` (on) · `gen-teacherAbsentStudent`.
*(Names are the `automation-rules-contract.md` §2-3 register verbatim; legacy `student_cancel_*` is rendered under its visible **"Family"** label, so our names say `family`.)*

**Recorded legacy defects (fixture comments, not reproduced):** `send_plan_report` is used as the `name` of **two** distinct controls (a legacy bug) → our two are `gen-courseCompleted` / `gen-monthlyPlan`. `student_cancel_enable` carries the visible label "Family" → we render the **label**, and record the name mapping.

**Accounting check (Ledger F.1):** 27 rendered (10 identity + 17 automation) + 2 gated (`logo`, `tfa`) + 12 omitted (10 pay + `rate_student_absent` + `otp`) = **41** legacy controls. ✔

### 3.3 Group D — accessibility

`tfa` → **relocated to Security** as a `SensitiveConfigurationRequirement` structure row + GATE (§6.4).
`otp` → **NOT RENDERED**: a single shared OTP-destination phone for *all* users is a recorded security anti-pattern. The legacy Accessibility intro copy (which promises password-complexity + session-timeout controls that **do not exist** in legacy) is **not reproduced**.

---

## 4. Notifications domain (`fixtures/settings-notifications.js` — NEW)

**47 controls / 28 distinct names / 9 event groups. 0 omitted, 0 invented.**
Rendering split: **13 `field()`** (10 channel selects + 3 numbers) + **34 toggles**.

### 4.1 `NotificationChannel` (`CHANNEL_OPTS`)

The routing enum, authored **verbatim**.

| `value` | `labelKey` | Note |
|---|---|---|
| `0` | Off / «إيقاف» | |
| `1` | As Profile / «حسب الملف» | |
| `3` | WhatsApp / «واتساب» | legacy label typo "whats App" corrected in copy only |
| `4` | E-mail / «بريد إلكتروني» | |
| `5` | Private / «خاص» | |

**Value `2` does not exist in legacy — never invent it.** (Ledger F.2.)
**Ban:** a channel is a *routing label*. It carries **no** credential, no address, no provider handle. Selecting WhatsApp/E-mail here connects nothing (the connection lives in Integrations, and is a gate).

### 4.2 `NotificationRecipient`

| `id` | Meaning |
|---|---|
| `teacher` | teacher-facing notice |
| `family` | family/guardian-facing notice (legacy "student" block = the guardian; our child-view law holds) |
| `admin` | system/back-office notice |

### 4.3 `NotificationEvent` (`NOTIF_GROUPS`)

| Field | Type | Notes |
|---|---|---|
| `groupId` | `system\|course\|class\|reminders\|invoices\|staffEvents\|familyStatus\|appNotify\|classReminder` | 9 groups |
| `id` | string | e.g. `class.teacherAbsent` |
| `labelKey` | i18n key | rendered **verbatim** from legacy where proven |
| `recipient` | `NotificationRecipient` | |
| `control` | `'toggle'` | event checkboxes are toggles (B8) |
| `on` | boolean | authored default |
| `mode` | `'preview'\|'disabled'` | `appnotifiy` is **legacy-disabled** → `mode:'disabled'` + honest reason |
| `legacyName` | string (comment) | e.g. the `teacher_send_manual_reminder` anomaly |

**Control census (must reconcile to 47):**

| Class | Count | Render |
|---|---|---|
| Section / master toggles | **5** — `system_notifications` (on) · `appnotifiy` (**disabled + reason**) · `course_updates` (on) · `class_updates` (on) · `class_reminder` (on) | toggle rows |
| Channel selects (`NotificationRouteRule`) | **10** | `field(select)` |
| Event checkboxes | **23** — course: teacher 2 (create/edit) + family 3 (create/edit/status); class: teacher 9 + family 9 | toggle rows |
| Reminder toggles | **6** — `teacher_daily_class_reminder` · `teacher_delay_reminder` · `teacher_reminder` · `student_send_reschedule_reminders` · `teacher_send_manual_reminder` · `student_reminder` | toggle rows |
| Numerics | **3** — `ntf-remTeacherHours` (2) · `ntf-remFamilyHours` (2) · `ntf-invoiceReminderDays` (3) | `field(number)` |
| **Total** | **47** = 13 `field()` + 34 toggles | |

**Class-status asymmetry — preserved exactly (do not "fix" it):**
teacher's 9 = Waiting · Running · Cancel · Absent · **Teacher Absent (6)** · Auto-Makeup · Reject · Cancel-request · Approve.
family's 9 = the same 8 + **End class (5)** *instead of* Teacher Absent.

**Recorded anomalies:** `teacher_send_manual_reminder` sits inside the *family* block in legacy (naming bug) — we place it under **Teacher** and record it in a fixture comment. `teacher_delay_reminder` ("Late 3 Minutes"): label rendered **verbatim**; its trigger semantics are **UNKNOWN** — **no help text is invented**.

### 4.4 `NotificationRouteRule` (`NOTIF_ROUTES`) — the 10 channel selects

Names are the `notification-matrix-contract.md` §4 register (C01–C10) verbatim.

| # | Legacy name | `name` | Recipient |
|---|---|---|---|
| 1 | `teacher_course_updates` | `ntf-crsTeacherCh` | teacher |
| 2 | `student_course_updates` | `ntf-crsFamilyCh` | family |
| 3 | `teacher_class_updates_type` | `ntf-clsTeacherCh` | teacher |
| 4 | `student_class_updates_type` | `ntf-clsFamilyCh` | family |
| 5 | `teacher_reminder_type` | `ntf-remTeacherCh` | teacher |
| 6 | `student_reminder_type` | `ntf-remFamilyCh` | family |
| 7 | `invoice` | `ntf-invoiceCh` | family |
| 8 | `invoice_reminder` | `ntf-invoiceReminderCh` | family |
| 9 | `salaries` | **`ntf-salEventsCh`** | admin |
| 10 | `family_status` | `ntf-familyStatusCh` | family |

**Row 9 — explicit pay-free statement (B3).** The `salaries` row is a **routing-only channel select**: it decides *where a salary-event notice is sent*, and carries **0 amount, 0 rate, 0 currency token** (grep-confirmed in legacy). The `name` deliberately avoids the substring `salary` (the `FORM_DRAWERS_032` OMIT regex bans `salary`; `sal` is not a banned token). The section label "Salary events" is admin-side **body copy** and is already sanctioned by the Spec-030 **figure-free** finance Salaries tab — the pay law bans the **figure**, never the honest word. **Any figure here is STOP-6.**

**Save:** ONE gated Save per section (7 sections) + the mandatory **preview-only note** (R5).
**Preview-note copy law (binding):** «معاينة فقط — لا يُخزَّن أي تغيير قبل ربط الخادم.» / "Preview only — nothing is stored until the server is connected." The note **must not** contain `saved` / «الحفظ» — the fake-success censuses grep `\bsaved\b` + «تم الحفظ» over body **and template** text, and «لا يتم الحفظ» literally contains «تم الحفظ». Use "stored", never "saved".
**Ban:** the 34 toggles are `<button data-toggle>` **local previews** whose `data-toast` carries the **backendRequired** wording («يُتاح بعد ربط الخادم» / "available once the server is connected"). **`set.savedToast` / "تم الحفظ" / "saved" is forbidden** (R5, STOP-5).

---

## 5. Customization domain

### 5.1 `ThemePreference` — the ONLY real write on this tab

| Field | Type | Notes |
|---|---|---|
| `mode` | `'light'\|'dark'\|'system'` | |
| `hook` | `data-set-theme` | **existing** (`settings-section.js:11`) |
| `storageKey` | `academy.theme` | **existing** |

Language (`data-set-lang` → `academy.lang`) is the second real control and is **ours, not legacy**. Both are unchanged by Spec 040.
**Ban:** the legacy "Apply for me" / "Reset" buttons write **four** localStorage keys (`theme`, `boxedLayout`, `sidebarType`, `cardBorder`) — that would require **4 NEW storage keys** ⇒ **forbidden (B2)**. They are **not rebuilt**; a **gated** Reset takes their place.
**Ban:** "Pick from logo" ×2 is **not rebuilt** — legacy uses `<canvas>` + `getImageData` (**canvas forbidden**, B7) *and* its source logo 404s, so it is provably non-functional in legacy.

### 5.2 `StatusColorDefinition` (`STATUS_COLORS` + `BRAND_ROWS` 4 → 13)

| Field | Type | Notes |
|---|---|---|
| `statusId` | string | 11 ids (below) |
| `labelKey` | i18n key | |
| `swatch` | hex string | rendered as a `.set-swatch` chip (promoted from the current inline style); decorative, `aria-hidden="true"` — the label text carries the accessible name (`customisation-contract.md` §3) |
| `name` | **`cust-status-<slug>`** | the paired **hex text field** (`type:'text'`, `dir="ltr"` in both builds) |

The 11 class statuses + authored hexes:
`pending #FFC107` · `waiting #17A2B8` · `teacher-absent #DC3545` · `student-absent #DC3545` · `teacher-cancel #6C757D` · `student-cancel #6C757D` · `admin-cancel #6C757D` · `attend #28A745` · `reschedule #007BFF` · `running #007BFF` · `makeup #17A2B8`
→ **6 distinct hexes** (`FFC107`, `17A2B8`, `DC3545`, `6C757D`, `28A745`, `007BFF`). **Conflict resolved (Ledger R10): `customisation-settings-scope.md` says 7 — the raw-HTML enumeration yields 6. PICK 6.**

Plus 2 brand colours (**`cust-colorPrimary`**, **`cust-colorSecondary`** — hex text fields beside the existing swatches).
**Distinct-hex census, stated precisely:** **6** distinct hexes across the **11 status** swatches. Across all **13** swatches there are **8** distinct values (the 6 status hexes + the 2 brand hexes `#5E4D7E`, `#7B6BA8`) — the "6" is a statement about the 11 status rows only, never about the 13.

### 5.3 Appearance selects (`APPEARANCE_OPTS`)

| Legacy name | `name` | Options |
|---|---|---|
| `container_layout` | `cust-layout` | full / boxed |
| `sidebar_type` | `cust-sidebar` | full / mini-sidebar |
| `card_style` | **`cust-surface`** | border / shadow |

**R1 trap, stated explicitly:** the legacy name `card_style` contains **`card`** — an input named `*card*` **fails `smoke:1174` (`a31.credInputs`) and breaks the build's test**. The rendered name **MUST** be `cust-surface`. The legacy name survives only as a fixture comment.

**Customization `field()` total = 2 brand + 3 appearance + 11 status = 16** (+ the 1 REAL theme control = the 17 legacy distinct names ✔).
**Save:** everything except theme/lang is display + **ONE gated academy-wide Save**. **Nothing is applied to the live UI** — no colour is written to a CSS variable, no layout is switched.
**Message Builder:** the existing honest gate (`adm.set.cust.msgBuilder` + `adm.set.cust.msgBuilderReason`, shipped by Spec 031) is **unchanged**. **No fields, no drawer, no invented UI** — the legacy route returns **HTTP 504** with an all-zero DOM summary (0 links/buttons/forms/inputs). **Zero UI evidence exists ⇒ no UI may be invented.** Capability owner = **Spec 053** (Integrations Command Center); placement custodian = Spec 048.

---

## 6. Security domain

### 6.1 `SecurityImportType` (`SECURITY_IMPORTS` — new)

| Field | Type | Notes |
|---|---|---|
| `id` | `teachers\|families\|children\|invoices` | |
| `legacyType` | `1\|2\|3\|4` | |
| `legacyFileId` | `teachers_file\|families_file\|children_file\|invoices_file` | comment only — **no `type=file` is rendered** |
| `titleKey` | i18n key | **the 4th card is mislabelled "Upload families" in legacy; raw HTML (`type=4` + `invoices_file`) proves it is INVOICES. Use the functional name.** |
| `columns` | `ImportColumnDecision[]` | rendered inside a native `<details class="set-acc">` "Required columns" disclosure |
| `hasTemplate` | boolean | `teachers/families/children` = `true`; **`invoices` = `false`** (legacy has no Download-Template link for it → **no download button**) |
| `upload` | `{kind:'gate'}` | always |

### 6.2 `ImportColumnDecision`

| Field | Type | Notes |
|---|---|---|
| `column` | string | the legacy column name, rendered as a **structure row** (label only) |
| `decision` | `'rendered'\|'rejected'` | |
| `rejectReason` | i18n key \| null | required when `rejected` |

**39 evidenced columns → 33 rendered · 6 rejected slots (3 distinct names).**

| Import | Evidenced | Rejected | Rendered |
|---|---|---|---|
| Teachers | 10 | `currency`, `hour_rate` | **8** — id, first_name, last_name, email, phone, gender, status, timezone |
| Families | 15 | `password`, `currency`, `hour_rate` | **12** — id, name, user_name, email, phone, status, country_id, timezone, total_hours, invoice_type, course_type, payment_method |
| Children | 7 | — | **7** — id, name, parent_id, age, gender, language, status |
| Invoices | 7 | `currency` | **6** — id, parent_id, price, status, due_date, note |
| **Total** | **39** | **6 slots** | **33** |

**Bans, explicit:** `password` is rejected (no-secret law) · `hour_rate` + `currency` are rejected (**teacher pay-free, B3**; and `a31.currency === 0` must hold on the settings body, R2) · `payment_method` is rendered as a **column-name structure row only — never a live gateway selector**.
**Ban (R3):** "Download template" is a **`<button>` gate**, never `<a download=…>` — the `download=` **attribute** trips `g32.pdfish`. The word "download" in a *label* is safe.
**Ban:** every Upload is a `data-disabled-reason` gate. **0 `type=file`.**

### 6.3 `BackupRequestDefinition` (`BACKUP` — new)

| Field | Type | Notes |
|---|---|---|
| `destinationField` | `SettingsFieldDefinition` | **`name: 'sec-backupTo'`**, `type:'text'`, **no value** — the ONE `field()` on the Security tab |
| `saveDestination` | `{kind:'gate'}` | |
| `runNow` | `{kind:'gate'}` — **direct gate, NO `data-confirm`** | |

**Ban:** legacy fires a **real DB backup** from a bare `<a>` with **no confirmation**. That is **not reproduced**: no request, no `window.open`, no blob, no download attribute (B7/R3). Both actions are **honest direct gates** — Spec 040 adds **zero** confirm dialogs (Ledger §G). The four facts a real egress needs (**scope · destination · permission · audit**) are carried in the gate's visible reason/purpose copy, not staged in a confirm for an action that cannot occur.

### 6.4 `PolicyDocument` (`POLICIES` — kept, 2)

| Field | Type | Notes |
|---|---|---|
| `id` | `family\|teacher` | |
| `titleKey` / `bodyKey` | i18n key | **authored display-only body**, rendered inline (never a small modal) |
| `edit` | `{kind:'gate'}` | |

**Ban:** **no Quill, no rich-text editor, no new dependency** (STOP-7). The 2 unlabelled legacy selects (register item U-6) are **not reproduced** — their purpose is UNKNOWN.

### 6.5 2FA (`TWOFA_ROW` — new)

| Field | Type | Notes |
|---|---|---|
| `labelKey` | i18n key | relocated from General Group D |
| `purposeKey` | i18n key | "OTP on login for admins & support" (proven legacy copy) |
| `control` | `{kind:'gate'}` | |

Modelled as a `SensitiveConfigurationRequirement` (§7.3) — **structure row + gate, never an input, never a value.** `otp` (the single shared OTP-destination phone) is **NOT RENDERED**.

**Security tab census:** `field()` **1** · toggles **0** · structure rows **34** (33 import columns + 2FA) · gates **≈12** (4 upload + 3 template + 2 backup + 2 policy-edit + 1 2FA).

---

## 7. Integrations domain

### 7.1 `IntegrationProvider` (`INTEGRATIONS` 7 → 11)

| Field | Type | Notes |
|---|---|---|
| `id` | `ig1…ig11` | drawer id = `integ-<slug>` |
| `nameKey` | i18n key | |
| `kindId` | `payment\|payout\|whatsapp\|email` | `INTEG_KIND` (existing, +0 new ids needed) |
| `statusId` | `not-connected\|requires-server\|unavailable` | `INTEG_STATUS` (existing) — tones `neutral\|amber\|cancelled` only (R6); **never "Connected"/«متصل»** (B6) |
| `capabilities` | `IntegrationCapability[]` | §7.2 |
| `safeFields` | `SettingsFieldDefinition[]` | rendered inside the drawer's `.wiz-grid` |
| `toggles` | toggle rows | preview only |
| `requirements` | `SensitiveConfigurationRequirement[]` | **structure rows** |
| `final` | `{kind:'gate'}` | **exactly ONE** `.btn-primary[data-disabled-reason]` per drawer (R4) |

Control names are the `sensitive-provider-fields-contract.md` §4 register verbatim (the 21 sanctioned names + the 8 toggle ids), all verified clean against **both** guard regexes — note especially that a control name may **not** contain `payout` (the drawer *id* may).

| # | Provider | drawer id | safe `field()` | toggles | sensitive rows |
|---|---|---|---|---|---|
| 1 | Stripe | `integ-stripe` | `integ-stripe-name` | 0 | **2** (Publishable Key, Secret Key — placeholders proven) |
| 2 | PayPal | `integ-paypal` | `integ-paypal-name`, `integ-paypal-env` (Sandbox/Live — **never defaulted to Live**) | 0 | **2** (Client ID, Client Secret) |
| 3 | Mollie | `integ-mollie` | `integ-mollie-name` | 0 | **1** (API Key) |
| 4 | XPay | `integ-xpay` | `integ-xpay-name`, `integ-xpay-url` (staging/community) | **4** (`integ-xpay-ch-1…4`) | **3** (API Key, Community ID*, Variable Amount ID*) |
| 5 | Payoneer | `integ-payoneer` | `integ-payoneer-name`, `integ-payoneer-env` | 0 | **2** (Merchant Code, API Key) |
| 6 | Paymob | `integ-paymob` | `integ-paymob-name`, `integ-paymob-region` (Egypt/Oman/Saudi Arabia/UAE — **proven help text: region, NOT mode**) | 0 | **5** (Secret Key, Integration ID, Public Key, HMAC Secret, `settings[api_key]`) |
| 7 | Custom | `integ-custom` | `integ-custom-name`, `integ-custom-details` (textarea) | 0 | **0** |
| 8 | Paymob Payout | `integ-paymob-payout` | **`integ-pmb-out-mode`** (sandbox/live) | **1** (`integ-pmb-out-active`) | **4** (Client ID, Client Secret, Username, **Password**) + 1 webhook-URL **endpoint row (no value)** |
| 9 | Payoneer Payout | `integ-payoneer-payout` | **`integ-pyn-out-mode`** | **1** (`integ-pyn-out-active`) | **3** (Username/Login, API Password/Key, **Program ID**) + 1 webhook-URL endpoint row |
| 10 | WhatsApp (Free) | `integ-whatsapp` | `integ-wa-phone`, `integ-wa-audience` (Private/Group), `integ-wa-group` | 0 | **0** |
| 11 | Email / SMTP | `integ-email` | `integ-email-address`, `integ-email-host`, `integ-email-port` (number), `integ-email-enc` (None/SSL/TLS) | **2** (`integ-email-active`, `integ-email-default`) | **2** (SMTP Username, SMTP Password) |
| | **Totals** | | **21 `field()`** | **8** | **24 credential rows + 2 endpoint rows = 26 structure rows** |

**Program ID is a SENSITIVE STRUCTURE ROW, never a `field()`** (row 9) — Payoneer Payout renders exactly **one** safe control (`integ-pyn-out-mode`). Any table that lists it as a rendered field is wrong and breaks the 21/24 census.

**Ban B6 restated at the entity:** `statusId` may **never** resolve to "Connected"/«متصل». The legacy 7-code WhatsApp enum (UNKNOWN · PAIRING · DISCONNECTED · CONNECTING · CONNECTED · IDLE · STOPPED) is **documented in a fixture comment and never simulated** — **no Laravel Echo, no websocket, no `/broadcasting/auth`, no polling** (STOP-7).
**Ban:** WhatsApp pairing + QR = **GATE**. No `<canvas>`, no QR renderer, no invented wizard (U-3). "Wake connection" / "Test send" / "Logout" = gates.
**Ban:** the WhatsApp card's legacy copy mentioning "salary reports" is **not reproduced** (B3).
**Excluded entirely:** the legacy **WhatsApp insights** pages — they leak a live joinable `chat.whatsapp.com` invite URL, unmasked phones/emails, and egress real names to `ui-avatars.com`. **Owner: Spec 043** (privacy / anti-poaching).

### 7.2 `IntegrationCapability`

| Field | Type | Notes |
|---|---|---|
| `id` | `configure\|connect\|test\|pair\|logout\|enable` | |
| `render` | `'gate'` \| `'drawer'` \| `'preview-toggle'` | `configure` → **drawer**; every other final → **gate** |
| `reasonKey` | `common.backendRequiredNote` | |

**Ban:** the legacy card-level `is_enabled` toggle **POSTs a real toggle**. Ours is **inside the drawer as a preview toggle + gated Save** — **never a fake enable on the card** (B5/B6).

### 7.3 `SensitiveConfigurationRequirement` — the load-bearing entity

**This is the shape that replaces every credential input in the product.**

| Field | Type | Notes |
|---|---|---|
| `labelKey` | i18n key | e.g. "Client Secret", "HMAC Secret", "SMTP Password" |
| `required` | boolean | rendered as a "required" badge |
| `purposeKey` | i18n key \| `null` | **rendered ONLY where the legacy label/placeholder/help proves the purpose**; otherwise omitted |
| `kind` | `'credential'\|'endpoint'` | 24 credential + 2 endpoint (webhook URLs) |
| `render` | `'.set-struct'` | a **structure row**: label + required badge + purpose. |

**There is deliberately NO `value`, NO `name`, NO `type`, NO `placeholder`, NO `mask`, NO `input` on this entity.** It cannot become an input by mistake — it has no field to hold one (B1).

**Sensitive-field count = 24, NOT 17 (Ledger R10, conflict resolved).**
Incoming **15** (PayPal 2 · Stripe 2 · Mollie 1 · XPay 3 · Payoneer 2 · Paymob 5 · Custom 0) + payout **7** (Paymob Payout 4 incl. the legacy `type=password` `key4` · Payoneer Payout 3) + Email **2** (`smtp_username`, `smtp_password`) = **24**. The artifacts' "17" silently drops Paymob-Payout key1-3, Payoneer-Payout key1-3 and `smtp_username`. **PICK 24** (itemisable field-by-field).

**Proven semantic labels — used ONLY where the raw HTML proves them:**
Paymob `Integration ID` = "comma-separated when offering more than one" · Paymob `settings[api_key]` = "optional, status reconciliation only; a separate credential from the Secret Key" · Stripe key1 = Publishable Key / key2 = Secret Key · PayPal = Client ID / Client Secret.
**UNKNOWN — stated as such, never invented:** XPay `Community ID` and `Variable Amount ID` business meaning · the distinction between Paymob's three secret-ish fields beyond the proven help · Email "Add Account" management (U-4) · the RTL behaviour of the legacy forms (U-7 — our RTL is authored, not ported).

**Why the law exists (legacy evidence):** every one of these credentials is a plain **unmasked `type=text`** in legacy, and the configure tables print `Key 1`/`Key 2` columns raw (the one populated row emits `<td>01015264856</td>`). **Zero masking exists anywhere in legacy. We render none of it.**

### 7.4 `PaymentProvider` + `PaymentMethodDefinition`

**Payment Methods is NOT a nav item anywhere** (Ledger R10) — it **folds into Integrations**, adding **0 pages, 0 tabs, 0 nav items**.

`PaymentProvider` = the 7 incoming providers (legacy `payment_method` 1-7 = PayPal, Stripe, Custom, XPay, Mollie, Payoneer, Paymob). The legacy **7 create variants** become the 7 providers' **Configure drawers**. **No chooser page** — the chooser was never captured (U-2); the provider catalogue *is* the chooser.
The 8th capture (edit, `id=1`) is **structurally identical** to create variant 3 (same field set; only `_method=PUT` + prefilled values differ) → **NOT a separate surface**.

`PaymentMethodDefinition` (`PAYMENT_INSTANCES`) — the configured-instances list.

| Field | Type | Notes |
|---|---|---|
| — | — | **`PAYMENT_INSTANCES = []` — deliberately EMPTY.** |

**Ban:** with **0 authored instances** there is nothing to edit, and the `Number Of Family` count is **not fabricated**. The list renders an **honest empty state**: «لا توجد وسيلة دفع مُهيّأة — يُتاح بعد ربط الخادم» / "no payment method configured — available once the server is connected".

---

## 8. Users domain (`settingsUsers` — Decision 1, Option A)

### 8.1 `SettingsUserDestination`

| Field | Type | Notes |
|---|---|---|
| `href` | `staff.html` | a **real `<a>`**, already present (`pages/settings.js` `usersPanel()`, lines 116-123). EN resolves via `langRoute()` → `staff.en.html`. |
| `rolesPreview` | `ROLES_PREVIEW` | `fixtures/settings.js`, **0-diff** — 4 groups, read-only |

**This tab is 0-diff in Spec 040.** `usersPanel()` renders **only** the real link + `rolesSection()`: **0 forms, 0 drawers, 0 mutation controls**, and it does **not import** `fixtures/staff-management.js`.
**Ownership (unchanged, Spec 031 D16 / C-07 / T028):** `staff.html` is the ONE staff home and sole owner of the 5-row directory, the `staffMenu` kebab, the 10-group `permDrawer()` RBAC matrix, and the 3 staff form drawers. **Zero code/data overlap. No permission engine is created** — the RBAC matrix is explicitly commented "never a working permission engine".
Spec 040 changes exactly one thing: `nav.config.js:115` gains `route: 'settings.html#view=users'` and drops `status:'planned'`.

---

## 9. `CrossSurfaceConsumer` — what a settings value would affect (and does NOT)

Documentation-only relation. It exists so no author is tempted to wire a settings value into another surface.

| Setting | Would-be consumer | Actual Spec-040 behaviour |
|---|---|---|
| `ThemePreference` (`academy.theme`) | every page | **REAL.** Existing `data-set-theme` hook, existing key. Unchanged. |
| Language (`academy.lang`) | every page | **REAL.** Existing `data-set-lang` hook, existing key. Ours, not legacy. |
| `StatusColorDefinition` ×11 | session/class status chips (schedule, sessions, attendance, course, group) | **NOT APPLIED.** Display + gated Save. Chips keep the six build-guarded tones (`live\|upcoming\|completed\|cancelled\|amber\|neutral`, `build-html.mjs:168-175`) — a 7th tone **throws at build** (R6). |
| Appearance selects (layout / sidebar / surface) | the admin shell | **NOT APPLIED.** Applying them would need 4 new localStorage keys ⇒ forbidden (B2). |
| `NotificationRouteRule` ×10 | messages / announcements (Spec 034) | **NOT WIRED.** No message is ever sent; routing is authored metadata + a gated Save. |
| `AutomationRule` ×17 | sessions / schedule / attendance lifecycle | **NOT WIRED.** No rule executes. No engine (standing law). |
| `IntegrationProvider` ×11 | finance invoices/payments (Specs 030/038) | **NOT WIRED.** No gateway, no charge, no payout. Finance stays no-fake-money. |
| `EXPENSE_HEADS` (4) | finance accounting | **Display-only lookup, figure-free (NO amount).** Unchanged. |
| `LOCATIONS` (4) | schedule/timezone | **Display-only.** Unchanged. |
| `PolicyDocument` ×2 | family / teacher portals | **Display-only bodies on the admin side.** Portals are **byte-identical** (51 non-admin files, 0 bytes changed). |
| `SettingsUserDestination` | `staff.html` | **REAL link.** No permission enforcement anywhere. |
| Message Builder | outbound channels | **Gate only.** Capability owner **Spec 053**; placement custodian **Spec 048**. |

---

## 10. Census the model must satisfy (STOP conditions)

| Metric | Value |
|---|---|
| `field()` controls on the settings hub | **73** (was 2) — General 22 · Notifications 13 · Customization 16 · Security 1 · Users 0 · Integrations 21 |
| `data-toggle` local previews | **49** — General 7 · Notifications 34 · Integrations 8 |
| Structure-only rows | **60** — Security 34 · Integrations 26 |
| `SensitiveConfigurationRequirement` of `kind:'credential'` | **24** |
| Gates (≈) | **~51** |
| `formDrawer` ids on this hub | **12** — `head-add` + the 11 `integ-*` (**all 12 MUST be registered in `FORM_DRAWERS_032`, `smoke:92`; an unregistered drawer silently escapes the fieldless/noGate/multiPrimary/MUST-OMIT audit — that is a spec failure, not a pass**, R4) |
| `type=password` · `type=file` · `<canvas>` · `download=` · `window.open` | **0** each |
| Authored secret / API-key / token / webhook **value** | **0** |
| Fake "Connected" status · fake success toast | **0** each |
| Currency / pay figure (`a31.currency`) | **0** |
| Computed metric | **0** |
| New `data-*` hooks · new localStorage keys · new dependencies | **0** each |
| New pages · new nav items | **0** each |
