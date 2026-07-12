# Contract — General Settings Completeness (Spec 040)

**Nav id** `settingsGeneral` · **Status** `planned` → `implemented` · **Route** `settings.html#view=general`
(EN `settings.en.html#view=general`, resolved by the hash-aware `langRoute()`) · **Tab id** `general` (EXISTING,
byte-pinned at `smoke:1194`) · **Page-count impact 0** (115 held, admin menu 50 held).

Owner file: `app/src/js/pages/settings.js` → `generalPanel()`. Data: `app/src/js/fixtures/settings-management.js`
(EXTENDED). Copy: `app/src/locales/ar.adm.js` + `en.adm.js` (mirrored, 0 divergence). No other page builder,
component or fixture may be touched (see the ledger's 0-diff list; `form-field.js`, `settings-section.js`,
`preview-drawer.js`, `fixtures/settings.js` stay 0-diff).

---

## 1. Field accounting (binding)

Legacy `/management/settings/general` — 4 tabs, **41 visible controls**, 4 separate `PATCH` endpoints, 4 separate
`Save changes` buttons, no cross-tab dirty state.

| Group | Evidenced | Rendered `field()` | Gated (no input) | Omitted by law | Not rendered |
|---|---|---|---|---|---|
| **A — Academy identity** | 11 | **10** (7 `text` + 3 `select`) | **1** (`logo`) | 0 | 0 |
| **B — Teachers / pay** | 10 | 0 | 0 | **10** | 0 |
| **C — Course & class automation** | 18 controls / 17 distinct names | **10** `field()` + **7** `data-toggle` previews = 17 | 0 | **1** (`rate_student_absent`) | 0 |
| **D — Accessibility / 2FA** | 2 | 0 | **1** (`tfa` → relocated to Security) | 0 | **1** (`otp`) |
| **Total** | **41** | **27** | **2** | **11** | **1** |

`27 + 2 + 11 + 1 = 41`. **Zero silently dropped.**

> **Resolved conflict (ledger R10):** `general-settings-scope.md` says "28 rendered". It buckets the gated `logo`
> as rendered. **This contract PICKS 27 rendered + 1 gated `logo`** — identical accounting, different bucket. No
> author may double-count the logo.

**General tab `field()` total = 22** = 10 identity + 10 automation + 2 in the existing `head-add` drawer.
(Group B is the subject of `pay-free-settings-exclusion-contract.md`; Group C of `automation-rules-contract.md`.)

---

## 2. Group A — Academy identity (10 rendered + 1 gate)

All ten are `field()` controls inside ONE inline `.wiz-grid` section (`panel({id:'gen-identity'})`), followed by the
`logo` gate and ONE gated **Save**. **Fields are INERT** — `form-field.js` attaches no hook, no persistence, no
client validation (Spec 004 law, unchanged). The **Validation** column below is the *declared backend contract*
handed to the settings backend; the frontend enforces **none** of it and must claim none.

| # | Legacy name | Our `name` (→ id `f-<name>`) | Type | Req. | Validation (backend contract — NOT enforced here) | Help / visible note | Visibility | Consumers (Spec 055 propagation) | Persistence |
|---|---|---|---|---|---|---|---|---|
| 1 | `company_name` | `gen-name` | text | ✔ | non-empty, ≤ 120 chars | — | always | shell brand, topbar, `index.html`, invoices (`finance.html`), certificates (`certificates.html`), outbound mail | **gated Save** |
| 2 | `company_name_ar` | `gen-nameAr` | text | ✔ | non-empty; used on the Arabic surface | «يظهر على الواجهة العربية» / "shown on the Arabic surface" | always | the AR build of every surface | **gated Save** |
| 3 | `domain` | `gen-domain` | text | ✔ | hostname shape | public address of the academy | always | public pages, mail links | **gated Save** |
| 4 | `email_info` | `gen-email` | text | ✔ | e-mail shape | reply-to on outbound mail | always | Email/SMTP integration, invoice + reminder mail | **gated Save** |
| 5 | `phone` | `gen-phone` | text | — | phone shape | shown to families | always | family portal, documents | **gated Save** |
| 6 | `whatsapp` | `gen-whatsapp` | text | — | phone shape | used by the WhatsApp integration | always | WhatsApp integration (Integrations tab) | **gated Save** |
| 7 | `address` | `gen-address` | text | — | — | — | always | academy profile, documents | **gated Save** |
| 8 | `country_id` | `gen-country` | **select** | ✔ | one-of the authored option list | — | always | academy profile | **gated Save** |
| 9 | `city` | `gen-city` | **select** | ✔ | one-of; **depends on country** | dependency documented, **not implemented** (a cascading select would need a new hook — forbidden) | always | academy profile | **gated Save** |
| 10 | `timezone` | `gen-timezone` | **select** | — | one-of (IANA zone) | **PROMINENT, mandatory:** «تغيير المنطقة الزمنية يغيّر وقت وتاريخ كل حصة في لوحة الإدارة» / "changing the timezone changes every class's admin time & date" | always | **every** schedule / session / attendance / reminder / timetable surface, all roles (`schedule.html`, `sessions.html`, `attendance.html`, `time-converter.html`, teacher + family portals) | **gated Save** |
| — | `logo` (`type=file`, `accept=image/*`) | **no input** | **GATE** | — | — | existing `adm.set.gen.logoReason` | always | shell + documents | **`data-disabled-reason` gate** |

**Option lists.** Legacy ships 251 countries × 27 cities. We author a **short, honest option list** (the authored
academy's country + a small neighbouring set; the authored city list for that country) — the full geo catalogue is a
backend lookup, not a fixture. The list is fixture data in `settings-management.js` (`IDENTITY_OPTS`), never inlined
in the page builder.

**Prefilled values.** The three text/select controls that exist **today** as display rows (`IDENTITY_ROWS`:
`name`/`domain`/`email`/`phone`/`whatsapp` + `LOCATIONS`: country/city/timezone/address) carry the **already-shipped
Spec-031 authored literals** through `field({valueKey})`. No new academy data is invented; the Spec-031 display
values are preserved verbatim, now inside labelled inputs. `gen-nameAr` is the only genuinely new authored value.

**No `type=file`.** `field()` supports only `text|number|select|textarea` — `file` is structurally unreachable. The
logo action is a `<button data-disabled-reason data-reason-key="adm.set.gen.logoReason">`, never an `<input>`, never
an `<a download=…>` (ledger R3).

### Recorded redundancy R-A (LOCATIONS)

The ledger keeps **both**: `LOCATIONS` (4 display rows, unchanged Spec-031 card) **and** country/city/timezone/address
as identity `field()`s. The card is the *read-back of the authored current value*; the form is the *editable
contract*. This duplication is **deliberate and binding** — collapsing the Locations card into the identity form (or
vice-versa) changes the rendered-row census and therefore requires a **declared amendment** to the ledger. Do not
"tidy" it.

---

## 3. Group D — Accessibility / 2FA (0 rendered, 1 gate, 1 not rendered)

The legacy Accessibility tab is **inert** (its Save card is hidden) and its intro copy promises password-complexity
and session-timeout controls **that do not exist in legacy**. That copy is **not reproduced** (it would be a claim
about a capability nobody has seen).

| Legacy name | Legacy state | Our disposition | Where | Keys |
|---|---|---|---|---|
| `tfa` (checkbox) | **disabled**, "No WhatsApp Connected" | **STRUCTURE ROW + GATE** — label + purpose ("OTP on login for admins & support"); **no control, no secret, no value** | **Security tab** (`#view=security`), not General | existing `adm.set.sec.tfa` / `adm.set.sec.tfaReason` — **0 new keys** |
| `otp` (text, `d-none`) | hidden | **NOT RENDERED** | — | — |

`otp` is a **single shared OTP-destination phone for all admins** — a recorded security anti-pattern, and Spec 033's
security acceptance is explicit: *"no secret/OTP control"*. Owner: **FO-16 → Spec 043 + the auth backend**.
The legacy "No WhatsApp Connected" framing is **not** reproduced anywhere.

---

## 4. Naming law (ledger R1 — highest risk)

`smoke:1174` (`a31.credInputs`) asserts **0** inputs whose `name` **or** `id` matches
`/pass|secret|api|key|token|webhook|card|cvv/i`, on **every** page. `field()` derives `id = f-<name>`, so the law is
purely a naming law:

> **No `name`/`id` of any of the 73 new settings fields may contain the substrings `pass`, `secret`, `api`, `key`,
> `token`, `webhook`, `card`, `cvv` (case-insensitive).**

Every General name above (`gen-name`, `gen-nameAr`, `gen-domain`, `gen-email`, `gen-phone`, `gen-whatsapp`,
`gen-address`, `gen-country`, `gen-city`, `gen-timezone`) is clean. The trap lives on the Customization tab
(legacy `card_style` → **must** be `cust-surface`) — flagged here because the same law binds all tabs.

---

## 5. Presentation

| Slice | Pattern | Why |
|---|---|---|
| Identity (10 fields) | **inline section** — `panel({id:'gen-identity'})` wrapping a `.wiz-grid` of `field()`s | a modal would bury ten fields; the drawer is reserved for the provider long-forms |
| Timezone help | inline `set-help` under the control, **always visible** | the highest-leverage non-credential setting in the product |
| Logo | inline `data-disabled-reason` gate button | no `type=file` |
| Automation (17) | native `<details>` accordion groups — see `automation-rules-contract.md` | zero JS, zero new hook (precedent `add-family.js:51`) |
| Locations (4 rows) | inline display card — **unchanged** | Spec 031 surface |
| Expense heads (4 rows) + `head-add` | inline card + **existing** `formDrawer('head-add')` (name + status, 2 fields) | **0-diff** — Spec 032 FC-39 |
| Save | **ONE** `data-disabled-reason` gate per section (identity, automation) | no fake persistence |

**Gates on the General tab (the ledger's ≈5):** `logo` upload · Save identity · Save automation · the `head-add`
drawer's single gated final. The gate census is asserted **page-level** (`a31.gates >= 20`), never per-tab.

---

## 6. MUST NOT (any one = STOP)

1. No `input[type=password]`, no `input[type=file]`, no `<canvas>`, no `draggable`, no `download=` attribute, no
   `window.open`.
2. No hour-rate / salary-period / fine / payout / `rate_student_absent` control, label, help string or figure —
   see `pay-free-settings-exclusion-contract.md`.
3. No currency token anywhere in the body (`a31.currency === 0`: `ريال|SAR|جنيه|EGP|AED|EUR|$|€|£`).
4. No fake success: no toggle/button may emit «تم الحفظ» / "saved" / "done". Every `data-toast` on this tab carries
   the **backendRequired** wording («يُتاح بعد ربط الخادم» / "available once the server is connected").
5. No new `data-*` hook, no new `localStorage` key, no new dependency, no cascading-select engine, no validation
   engine.
6. No new `field()` **type** (a new type is not a new hook, but it *is* a `form-field.js` diff → 0-diff broken →
   STOP).
7. No legacy Accessibility intro copy, no "No WhatsApp Connected" string, no `otp` input.

---

## 7. Acceptance

| # | Check | Expectation |
|---|---|---|
| A1 | `settings.html` / `settings.en.html` `#view=general` on a **fresh context** (localStorage seeded to another tab) | exactly ONE visible `[role=tabpanel]` = `general`; 0 external requests |
| A2 | Sidebar `.nav-item[data-nav="settingsGeneral"]` | `<a href="settings.html#view=general">` (AR) / `settings.en.html#view=general` (EN); no `data-coming-soon`, no `aria-disabled`, no `#i-lock` |
| A3 | `nav.config` source audit | `settingsGeneral` → `status:'implemented'`, `route:'settings.html#view=general'` |
| A4 | Identity field census on the general panel | 10 `field()` controls with the exact names in §2; `f-gen-*` ids present |
| A5 | `a31.credInputs` | **0** on `settings(.en).html` |
| A6 | `a31.currency` | **0** on `settings(.en).html` |
| A7 | `passwordInputs` / `fileInputs` / `<canvas>` / `download=` on `settings(.en).html` | **0 / 0 / 0 / 0** |
| A8 | Logo + Save | `[data-disabled-reason]` present; 0 `data-demo-action` on any persistence-implying General control |
| A9 | `tfa` | rendered on the **Security** panel as a structure row + gate; **0** occurrences of `otp` as an input |
| A10 | Locale parity | `adm.*` AR key-set === EN key-set (0 divergence) |
| A11 | a11y | new rows `#view=general` × AR/EN × light/dark + mobile-390 → critical=0, serious=0 |
