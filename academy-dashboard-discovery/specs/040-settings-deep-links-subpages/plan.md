# Implementation Plan: Settings Deep Links & Subpages Completion (Spec 040)

**Branch**: `feature/012-role-portal-foundation` | **Date**: 2026-07-12 | **Spec**: [spec.md](./spec.md)
**Input**: `academy-dashboard-discovery/specs/040-settings-deep-links-subpages/spec.md` + 17 specify artifacts
**Baseline**: HEAD **`58a53e2`** (watcher committed Spec 039 **and** the Spec 040 spec artifacts), working tree
clean, `app/tests/` byte-identical to HEAD, public HTML **115**, admin menu **50**, settings category **7 items =
1 implemented + 6 planned**.

> **Baseline correction (binding).** CLAUDE.md and `spec.md` §Baseline Gate both name `4cbcb31` as HEAD and
> declare an "uncommitted Spec 039" exception. That is **stale documentation drift, not a code conflict**: the
> watcher has since committed. **Every diff, md5 and `git show` baseline for Spec 040 is taken against `58a53e2`.**
> A plan that diffs against `4cbcb31` would swallow the whole of Spec 039 and compute a wrong body-change set
> (Risk **R9**).

---

## Summary

Spec 040 owns the **six remaining planned Settings nav items** — the last «قريبًا» claims in the entire product.
It is **not nav-only**. The six items each already have a 1:1 tab on `settings.html`, so the *routing* half is a
six-line `nav.config.js` edit; but the tabs they point at are **stubs**: across all six tabs combined the hub
renders **2 form fields today** (both inside the `head-add` drawer), against an evidenced legacy configuration
surface of ~150 controls. Spec 040 therefore does two things in one pass:

1. **Deep-link** the six items into the **existing** settings tabs (`settings.html#view={general,notifications,
   customization,security,users,integrations}`) — Δpages **0**, Δmenu **0**, `FUTURE_ROUTES` stays `{}`.
2. **Complete the six domains in place** — **2 → 73** rendered `field()` controls, **49** honest local-preview
   toggles, **60** sensitive **structure-only** rows, **~51** `backendRequired` gates — under an unchanged
   honesty law: **0 `type=password`, 0 `type=file`, 0 `<canvas>`, 0 authored secret/API-key/token/webhook value,
   0 fake "Connected" chip, 0 fake success toast, 0 pay figure, 0 computed metric.**

The product milestone: **sitewide planned = 0, `[data-coming-soon]` = 0, categories bearing a planned item = 0.**
Exactly **one** honest lock survives — `classSalaryReport` (`status:'disabled'` + `nav.reason.finance`), which is
categorically *not* a planned item and is owned by a future backend billing spec.

**Grounding (re-verified this session against source at `58a53e2`):**
- `pages/settings.js` (171 lines) renders `tabs({group:'settings'})` with the six existing tab ids
  `general · notifications · customization · security · users · integrations` — byte-pinned at `smoke:1194`.
- `fixtures/settings-management.js`: `IDENTITY_ROWS` 5 (display) · `LOCATIONS` 4 · `EXPENSE_HEADS` 4 ·
  `NOTIF_MATRIX` 6 · `POLICIES` 2 · `BRAND_ROWS` 4 swatches · `INTEGRATIONS` 7 cards.
  `fixtures/settings.js`: `SETTINGS` shell + `ROLES_PREVIEW` 4 groups.
- `usersPanel()` (`settings.js:116-123`) = a **real `<a href="staff.html">`** + `rolesSection()` — 0 forms,
  0 drawers, 0 mutation controls; it does **not** import `fixtures/staff-management.js`.
- Theme + language are the **only real writes** on the hub (existing `data-set-theme` / `data-set-lang`,
  `academy.theme` / `academy.lang`).
- `nav.config.js:110-115` = the six `status:'planned'` items, no routes. `FUTURE_ROUTES` = `{}` (already empty —
  nothing to trim). `classSalaryReport` = `status:'disabled'` + `reasonKey:'nav.reason.finance'`.
- Locales `ar.adm.js` / `en.adm.js` are **already registered** in `i18n.js` → **`i18n.js` stays 0-diff**.

---

## Technical Context

**Language/Version**: Static HTML-first; native ES modules pre-rendered by `scripts/build-html.mjs`. No framework.
**Primary Dependencies**: **None new.** `package.json` 0-diff. Existing closed `data-*` hook set only.
**Storage**: Fixtures only. **No new localStorage key** (`academy.theme` / `academy.lang` / `academy.schedView.*`
are the existing keys; nothing is added).
**Testing**: Node smoke (`app/tests/smoke/run.cjs`), a11y (`app/tests/a11y/run.cjs`, axe), screenshots
(`app/tests/screenshots/capture.cjs`).
**Target Platform**: Static site (GitHub-Pages compatible), AR-RTL first + EN-LTR, light/dark/system.
**Project Type**: Static admin dashboard (web).
**Performance Goals**: N/A change. The settings body grows; mobile-390 must show **0 horizontal overflow**.
**Constraints**: no backend/API/network/websocket; no new `data-*` hook; no new storage key; no new dependency;
`field()` supports **only** `text|number|select|textarea`; WCAG AA, a11y **critical=0 serious=0**; page count
**115**; admin menu **50**.
**Scale/Scope**: 1 nav-source edit · 1 page builder · 1 fixture extended + 1 fixture created · 2 locale files ·
additive CSS · 3 test files. **0 new pages, 0 new components.**

---

## Constitution / Law Check

`.specify/memory/constitution.md` is an unpopulated template → the binding governance is the **Spec 016 law set**
(carried in CLAUDE.md) plus the Spec 031/033–039 contracts. Gates evaluated **before** design and **after**
design (post-design column reflects the Decision-Ledger design as planned below).

| Gate | Pre-design | Post-design |
|---|---|---|
| Static HTML-first; no SPA/engine; closed `data-*` hook set; **no new hook/storage key** | PASS | **PASS** — booleans ride the **existing** `data-toggle` hook via `settingsSection({rows:[{control:{kind:'toggle'}}]})` (`components/settings-section.js:26-31`); no checkbox `field()` type is added |
| No backend/API/auth/DB/network/websocket; no new dependency; `package.json` 0-diff | PASS | **PASS** — the legacy Laravel-Echo WhatsApp status stream is **documented in a fixture comment, never simulated** |
| **No-secret law**: 0 `type=password`, 0 `type=file`, 0 authored API key/secret/token/webhook value | PASS | **PASS** — all **24** sensitive integration fields render as **structure-only rows** (label + required + purpose); `field()` cannot emit password/file by construction |
| **No-fake law**: every final write/connect/test/import/backup/save is an honest gate or a labelled local preview | PASS | **PASS** — ≈51 `data-disabled-reason` gates (**all direct — 0 new `data-confirm`**); 49 toggles are labelled **local previews** with a backendRequired `data-toast` + the visible preview-only note («لا يُخزَّن أي تغيير…» / "nothing is stored…" — never "not saved", §5.0) |
| No `<canvas>`/drag/QR/PDF/`window.open`/`download=` | PASS | **PASS** — legacy "Pick from logo" (`canvas` + `getImageData`) and the WhatsApp QR pairing are **gates**, not rebuilds |
| **Teacher pay-free GLOBAL** — no salary/rate/fine/payout/compensation FIGURE | PASS | **PASS** — the legacy General › Teachers tab (**10 pay controls**) + `rate_student_absent` are **EXCLUDED BY LAW** (11 fields, enumerated by legacy name in §5.1); the notifications `salaries` row is a **routing-only channel select with 0 amount/rate/currency token** |
| Family zero-pay · student child-view · finance no-fake-money | PASS | **PASS** — untouched (no portal file changes; finance source 0-diff) |
| No computed score/rank/percentage/chart/aggregate | PASS | **PASS** — settings has no metric surface |
| Page-count freeze **115** + admin-menu freeze **50** + `PAGES` 57 | PASS | **PASS** — status flips, not count changes |
| AR/EN parity + hash-aware EN routing | PASS | **PASS** — `langRoute()` is hash-aware since Spec 035 → `sidebar.js` **0-diff**; `adm.*` AR/EN key-sets must stay **0-divergence** |
| Protected-test byte-verbatim except **declared** supersessions | PASS | **PASS** — **2 declared supersessions + 2 sanctioned strengthenings**, everything else byte-verbatim (§9) |
| Impact protection: unrelated `#page-body` byte-identical | PASS | **PASS** — body allowlist = `settings.html` + `settings.en.html` only (§8) |

**No violations → Complexity Tracking empty.** The one design item that *could* have breached a law — rendering
~49 booleans — is resolved without a new hook, a new component or a new field type (see §5.0).

---

## Baseline

| Check | Value at `58a53e2` |
|---|---|
| Branch | `feature/012-role-portal-foundation` (no branch cut) |
| HEAD | **`58a53e2`** (Spec 039 + Spec 040 spec artifacts committed) |
| Working tree | **clean**; `app/tests/` byte-identical to HEAD |
| Public HTML | **115** |
| `PAGES` in `scripts/build-html.mjs` | **57 entries** |
| Admin menu (`.nav-panel .nav-item`) | **50** — control 12 · families 9 · teachers 6 · reports 11 · admin 5 · **settings 7** |
| Settings category | 7 items = **1 implemented** (`settings`) + **6 planned** |
| Sitewide planned | **6** (settings is the ONLY planned-bearing category) |
| Sitewide `[data-coming-soon]` per page | **6** |
| Disabled locks | **1** — `classSalaryReport` (`nav.config.js:90`, `reasonKey:'nav.reason.finance'`, no route) |
| `FUTURE_ROUTES` | **`{}`** (empty — nothing to trim) |
| Rendered `field()` controls on the settings hub | **2** (`head-add`: name + status) |

### Counts (binding — from the Decision Ledger)

| Metric | Before | After | Δ |
|---|---|---|---|
| Public HTML pages | 115 | **115** | 0 |
| New page bases | 57 | **57** | 0 |
| `PAGES` in `build-html.mjs` | 57 | **57** | **0-diff** |
| Admin menu items | 50 | **50** | 0 |
| Settings category items | 7 | **7** | 0 |
| Settings implemented | 1 | **7** | **+6** |
| Settings planned | 6 | **0** | **−6** |
| Sitewide planned | 6 | **0** | **−6** |
| Categories bearing a planned item | 1 | **0** | **−1** |
| `[data-coming-soon]` per page | 6 | **0** | **−6** |
| Disabled locks | 1 | **1** | 0 |
| `FUTURE_ROUTES` entries | 0 | **0** | 0 |
| New `data-*` hooks / storage keys / dependencies | — | **0 / 0 / 0** | — |
| Rendered form fields on the settings hub | **2** | **73** | **+71** |

---

## The Six-Route Architecture

The build-time guard at `nav.config.js:151-157` enforces **`implemented ⇒ must have route`**. Each flip therefore
**must** carry a route. Routes are written **without** `.en` — the hash-aware `langRoute()` (Spec 035) inserts it,
so **`components/sidebar.js` stays 0-diff**.

| # | nav id | line | status after | route (AR) | resolved (EN) | existing tab id |
|---|---|---|---|---|---|---|
| 1 | `settingsGeneral` | 110 | implemented | `settings.html#view=general` | `settings.en.html#view=general` | `general` |
| 2 | `settingsIntegrations` | 111 | implemented | `settings.html#view=integrations` | `settings.en.html#view=integrations` | `integrations` |
| 3 | `settingsCustomization` | 112 | implemented | `settings.html#view=customization` | `settings.en.html#view=customization` | **`customization`** |
| 4 | `settingsNotifications` | 113 | implemented | `settings.html#view=notifications` | `settings.en.html#view=notifications` | `notifications` |
| 5 | `settingsSecurity` | 114 | implemented | `settings.html#view=security` | `settings.en.html#view=security` | `security` |
| 6 | `settingsUsers` | 115 | implemented | `settings.html#view=users` | `settings.en.html#view=users` | `users` |

- The six tab ids are the **EXISTING** ones, byte-pinned at `smoke:1194` as
  `['general','notifications','customization','security','users','integrations']` — **unchanged by Spec 040**.
- **Spelling trap (confirmed):** nav id `settingsCustomiz**ation**` → tab id `customization` (US spelling, no
  `s`). The legacy route is `/management/settings/customi**s**ation/…` (UK). **Do not carry the legacy `s` into
  the route or the tab id** — it would produce a dead deep-link that the tab machinery silently ignores.
- Deep-link resolution order is the existing one: **hash → localStorage → baked first tab**, with roving
  tabindex on the tablist. Nothing in `enhance.js` / `components/tabs.js` changes.

Contracts: `contracts/settings-nav-completion-contract.md`, `contracts/page-count-route-contract.md`.

---

## Page vs Fold decision

**Option B (deep-link into the existing settings tab) for all six items.** Every item was quantified against
A (new standalone page, Δ+2 HTML each), B (deep-link, Δ0), C (reuse another page), D (honest lock) — see
`page-vs-fold-decision-register.md`. A duplicates a tab that already exists and fractures the Settings IA across
two models for zero navigational gain; C has no owner page for five of the six; D is dishonest-by-omission because
the surfaces exist and are reachable **today**.

### The one contested item — `settingsUsers` → **Option A of the register (deep-link `#view=users`)**

| Question | Answer |
|---|---|
| Does legacy have a `/management/settings/users` route? | **No.** 27 `management-settings-*` captures; zero `users`. The legacy RBAC grid lives at `/management/admins/permission/{6,7}` — the Admins/Staff family, which is what `staff.html` was built from. |
| Then why is it a Settings nav item? | The legacy **sidebar** nests "Users & Staff" **last inside the Settings group** (`legacy-management-content-coverage.md` D9). The current nav mirrors this exactly. **IA placement matches legacy.** |
| Is it duplication of `staff.html`? | **No.** `usersPanel()` (`settings.js:116-123`) renders **only** a real `<a href="staff.html">` + `rolesSection()` (4-group read-only preview from `fixtures/settings.js:ROLES_PREVIEW`): **0 forms, 0 drawers, 0 mutation controls**, and it does **not import** `fixtures/staff-management.js`. `staff.js` (125 lines) remains sole owner of the 5-row directory, the `staffMenu` kebab, the 10-group `permDrawer()` RBAC matrix and the 3 staff form drawers. **Zero code/data overlap.** |
| Was this already decided? | **Yes — Spec 031** (research D16, `contracts/staff-users-contract.md`, C-07, T028): "`staff.html` is the ONE staff home; the settings Users tab shows the compact RBAC preview + a real deep-link to `staff.html`; `settingsUsers` nav stays planned (folded)." **Spec 040 simply un-folds the nav pointer.** |
| Permission ownership | **Unchanged.** No permission engine is created. `staff.html` keeps the explicitly-commented "never a working permission engine" matrix. |

**Spec-040 code impact for `settingsUsers`: `nav.config.js:115` only.** `usersPanel()`, `fixtures/settings.js`,
`staff.js` and `fixtures/staff-management.js` are **0-diff**.
Rejected: **B** (`staff.html` direct — orphans the purpose-built Users tab, breaks the uniform "resolve in place"
pattern of Specs 037/039) · **C** (honest lock — dishonest: unlike `classSalaryReport`, no backend capability is
missing) · **D** (new page — zero legacy evidence; would recreate the B-16 duplicate-staff-home that Spec 031
closed).

Contracts: `contracts/settings-users-destination-contract.md`, `page-vs-fold-decision-register.md`.

---

## The complete per-domain plan

### 5.0 The universal control-type law (how ~49 booleans render with no new hook)

`field()` supports **only** `text | number | select | textarea` — `password`/`file` are **structurally
unreachable**, and **no checkbox/toggle `field()` type is added**. Every boolean is rendered through the
**already-existing** `settingsSection({rows:[{control:{kind:'toggle'}}]})` path
(`components/settings-section.js:26-31`), which emits
`<button class="toggle" data-toggle data-toast=…>` — the **existing `data-toggle` hook**, the **existing
`.toggle` / `.knob` / `.is-on` CSS**. Consequences, stated plainly:

- **NO new `data-*` hook. NO new localStorage key. NO new component.** `form-field.js` and `settings-section.js`
  stay **0-diff**.
- The toggle is a **labelled LOCAL PREVIEW**: it flips visually, **persists nothing**, and its `data-toast`
  carries the **backendRequired** wording («يُتاح بعد ربط الخادم» / "available once the server is connected") —
  **never** "saved" / «تم الحفظ». Every toggle-bearing section carries a visible **preview-only note** plus
  **ONE gated Save** (`data-disabled-reason`).
- **Preview-note copy law (binding — a token trap).** The note's canonical copy is
  «معاينة فقط — لا يُخزَّن أي تغيير قبل ربط الخادم.» / **"Preview only — nothing is stored until the server is
  connected."** It **must not** contain the tokens `saved` / «الحفظ»: the sitewide + Spec-040 fake-success censuses
  grep `\bsaved\b` and «تم الحفظ» over the whole body **including template content**, and the naive phrasings
  "not saved" / «لا يتم الحفظ» would match («يتم الحفظ» literally contains «تم الحفظ») and **red the suite on an
  honest build**. Use "stored", never "saved".
- Toggles are `<button>`s, not `<input>`s → they cannot trip `passwordInputs` / `fileInputs` / `credInputs`.
- **If a future author adds a new `field()` TYPE**: a new *type* is **not** a new `data-*` hook and would not
  breach the closed-hook law — but it **IS a component change** (`form-field.js` loses its 0-diff) and would be a
  scope expansion requiring a declared amendment. **Spec 040 explicitly does not need it.**

Contracts: `contracts/no-fake-settings-contract.md` §1 (the four honest classes + the LABELLED-LOCAL-PREVIEW
definition), `contracts/sensitive-provider-fields-contract.md` (the structure-row shape).

### 5.1 GENERAL — legacy **41** controls, fully accounted

| Group | Evidenced | Rendered | Gated | Omitted |
|---|---|---|---|---|
| A Identity | 11 | **10** `field()` — 7 text (`company_name`, `company_name_ar`, `domain`, `email_info`, `phone`, `whatsapp`, `address`) + 3 select (`country_id`, `city`, `timezone`) | **1** (`logo` `type=file` → upload **GATE**, no input) | 0 |
| B Teachers / pay | 10 | **0** | 0 | **10 — EXCLUDED BY LAW** |
| C Automation | 18 controls / 17 distinct names | **17** (5 select + 5 number + 7 toggle) | 0 | **1** (`rate_student_absent`) |
| D Accessibility | 2 | 0 | **1** (`tfa` → relocated to **Security** as a structure row + GATE) | **1** (`otp`) |
| **Total** | **41** | **27** | **2** | **12** |

**27 + 2 + 12 = 41.** ✔ (`general-settings-scope.md` says "28 rendered" — it buckets the gated `logo` as
rendered. **PICK 27 rendered + 1 gated logo.** Same accounting, different bucket; stated so no author
double-counts.)

**B — the 10 EXCLUDED teacher-pay controls, by exact legacy name:** `settings_data[1]` (default hour rate) ·
`hours-input` (hour-rate tier template) · `rate-input` → `settings_data[<hours>]` · `salary_period_type` ·
`salary_period_day` · `applayFins` · `hours-input` (persisted fine tier, 10 min) · `fin[10]` (late-start discount
%, value 5) · `hours-input` (empty fine-tier template) · `rate-input` → `fin[<minutes>]`.
**+ `rate_student_absent`** (Group C — "% of class price added to the teacher's salary") = **11 pay fields
excluded**. Their section headers ("Hour Rates" / "Salary" / "Salary Tiers") and all help copy are **not
rendered**. This is the **Teacher pay-free GLOBAL** law, not a scope choice.

**C — the 17 rendered automation controls:**
- **5 select** — `new_course_status` (4 opts) · `renew` (3) · `auto_makeup` (4) · `classes_not_closed` (3 —
  legacy value `1` is genuinely absent; **do not invent it**) · `teacher_can_edit_class` (3)
- **5 number** — `stop_after` (2) · `classes_not_closed_hours` (12) · `teacher_cancel_before_class` (120) ·
  `student_cancel_before_class` (120) · `show_enter_btn` (5)
- **7 toggle** — `send_plan_report`#1 "Completed Course" · `send_plan_report`#2 "monthly plan"
  (**legacy-disabled behind "No WhatsApp Connected" → render `mode:'disabled'` + honest reason; the WhatsApp
  framing is NOT reproduced**) · `teacher_cancel_enable` · `student_cancel_enable` ·
  `auto_add_makeup_to_credit` (on) · `auto_add_no_makeup_to_credit` (on) · `teacher_absent_student`
- The legacy `send_plan_report` **name collision** is a bug → our two controls get disambiguated names
  (`gen-courseCompleted`, `gen-monthlyPlan`). **Recorded, not reproduced.**
- Legacy field `student_cancel_enable` carries the visible label **"Family"** → we use the **label**; the
  name→label mapping lives in a fixture comment.

**D:** `tfa` → **Security** tab as a **structure row** (label + purpose "OTP on login for admins & support") +
GATE. `otp` → **NOT RENDERED** (one shared OTP-destination phone for *all* users is a recorded security
anti-pattern). The legacy Accessibility intro copy promises password-complexity + session-timeout controls that
**do not exist** → not reproduced.

**Unchanged on General:** `LOCATIONS` (4 display rows) · `EXPENSE_HEADS` (4 rows) + the `head-add` drawer (2
fields). → **General `field()` total = 20 + 2 = 22.**

Contracts: `contracts/general-settings-completeness-contract.md`, `contracts/automation-rules-contract.md`,
`contracts/pay-free-settings-exclusion-contract.md`; evidence `general-settings-scope.md`.

### 5.2 NOTIFICATIONS — all **47** controls preserved, 0 omitted, 0 invented

47 controls / 28 distinct names / 9 event groups.

| Control class | Count | Rendering |
|---|---|---|
| Section / master toggles | **5** — `system_notifications` (on) · `appnotifiy` (**legacy-disabled → `mode:'disabled'` + reason**) · `course_updates` (on) · `class_updates` (on) · `class_reminder` (on) | `settingsSection` toggle rows |
| Channel selects | **10** — `teacher_course_updates`, `student_course_updates`, `teacher_class_updates_type`, `student_class_updates_type`, `teacher_reminder_type`, `student_reminder_type`, `invoice`, `invoice_reminder`, `salaries`, `family_status` | `field(type:'select')` inline |
| Event checkboxes | **23** — course: teacher 2 (create/edit) + family 3 (create/edit/status) · class: teacher 9 + family 9 | toggle rows |
| Reminder toggles | **6** — `teacher_daily_class_reminder`, `teacher_delay_reminder`, `teacher_reminder`, `student_send_reschedule_reminders`, `teacher_send_manual_reminder`, `student_reminder` | toggle rows |
| Numerics | **3** — `hours_to_reminder_teacher` (2), `hours_to_reminder_student` (2), `invoice_reminder_days` (3) | `field(type:'number')` inline |
| **Total** | **47** | **13 `field()` + 34 toggles** |

- **Channel enum — 5 options, authored verbatim:** `0` Off · `1` As Profile · `3` WhatsApp · `4` E-mail ·
  `5` Private. **Value `2` does not exist in legacy — never invent it.** (The legacy typo "whats App" is corrected
  in our copy; the *value* is preserved.)
- **Class-status asymmetry preserved exactly:** teacher's 9 = Waiting / Running / Cancel / Absent /
  **Teacher Absent (6)** / Auto-Makeup / Reject / Cancel-request / Approve; family's 9 = the same 8 but with
  **End class (5)** instead of Teacher Absent.
- **`salaries` is a routing-only channel select — 0 amount/rate/currency token** (grep-confirmed in legacy). The
  admin-side "salary event" wording is already sanctioned by the Spec-030 **figure-free** finance Salaries tab.
  **Pay-free law upheld: no figure.**
- `teacher_send_manual_reminder` sits inside the *family* block in legacy (naming bug) → we place it under
  **Teacher** and record the anomaly in a fixture comment.
- `teacher_delay_reminder` ("Late 3 Minutes"): label rendered **verbatim**; its trigger semantics stay
  **UNKNOWN** — no help text invented.
- Save: **ONE gated Save per section** (7 sections) + the visible preview-only note (§5.0 copy law).

Contract: `contracts/notification-matrix-contract.md`; evidence `notification-settings-scope.md`,
`notification-routing-matrix.md`.

### 5.3 CUSTOMIZATION — **17** distinct legacy names

| Legacy name | Rendering |
|---|---|
| `theme` (light/dark/system) | **REAL** — existing `data-set-theme` / `academy.theme`. Unchanged. |
| `color_scheme` (`#5E4D7E`) | swatch + **hex text field** |
| `secondary_color_scheme` (`#7B6BA8`) | swatch + **hex text field** |
| `container_layout` (full/boxed) | `field(select)` — name `cust-layout` |
| `sidebar_type` (full/mini-sidebar) | `field(select)` — name `cust-sidebar` |
| `card_style` (border/shadow) | `field(select)` — **name MUST be `cust-surface`, NOT `*card*`** (Risk **R1**) |
| `class_statuses_colors[11]` | **11** rows: label + swatch + **hex text field** |
| **Total** | **16 `field()` + 1 real theme control = 17** ✔ |

- The 11 statuses: `pending #FFC107` · `waiting #17A2B8` · `teacher-absent #DC3545` · `student-absent #DC3545` ·
  `teacher-cancel #6C757D` · `student-cancel #6C757D` · `admin-cancel #6C757D` · `attend #28A745` ·
  `reschedule #007BFF` · `running #007BFF` · `makeup #17A2B8` → **6 distinct hexes** (FFC107, 17A2B8, DC3545,
  6C757D, 28A745, 007BFF). **Conflict resolved:** `customisation-settings-scope.md` says 7; the raw-HTML
  enumeration yields **6**. **PICK 6.**
- **REAL vs GATED split:** `theme` = **REAL** (existing key) · `lang` = **REAL** (existing `academy.lang`; ours,
  not legacy) · **everything else = display + ONE gated academy-wide Save** (`backendRequired`).
- **NOT rebuilt, with reason:** "Pick from logo" ×2 (legacy uses `<canvas>` + `getImageData` — **canvas is
  forbidden**; and the source logo 404s, so it is provably non-functional in legacy) · "Apply for me" + "Reset"
  (legacy writes 4 localStorage keys `theme` / `boxedLayout` / `sidebarType` / `cardBorder` → **4 NEW storage
  keys, forbidden**) · "Reset to Default" for the 11 colours (client-only DOM rewrite → would need a new hook) →
  replaced by a **direct gated** Reset (`data-disabled-reason`, **no confirm** — §6: Spec 040 adds zero confirms).
- **Message Builder gate: unchanged** (`adm.set.cust.msgBuilder` + `adm.set.cust.msgBuilderReason`, shipped by
  Spec 031). See §5.7.

Contract: `contracts/customisation-contract.md`; evidence `customisation-settings-scope.md`.

### 5.4 SECURITY — 4 imports, **39** evidenced columns → **33** rendered structure rows

**REJECTED columns: `password`, `hour_rate`, `currency` (3 distinct names, 6 column slots).**

| Import | `type` | file id | Evidenced | Rejected | Rendered |
|---|---|---|---|---|---|
| Teachers | 1 | `teachers_file` | 10 | `currency`, `hour_rate` | **8** — id, first_name, last_name, email, phone, gender, status, timezone |
| Families | 2 | `families_file` | 15 | `password`, `currency`, `hour_rate` | **12** — id, name, user_name, email, phone, status, country_id, timezone, total_hours, invoice_type, course_type, payment_method |
| Children | 3 | `children_file` | 7 | — | **7** — id, name, parent_id, age, gender, language, status |
| **Invoices** | 4 | `invoices_file` | 7 | `currency` | **6** — id, parent_id, price, status, due_date, note |
| | | | **39** | **6 slots** | **33** |

- The 4th card is **mislabelled "Upload families"** in legacy; raw HTML (`type=4` + `invoices_file`) proves it is
  **Invoices**. **Use the functional name.** It has **no Download-Template link** in legacy → **no download
  button** for it (the other 3 get a gated "Download template"; the gate is a **`<button>`**, never
  `<a download=…>` — Risk **R3**).
- `payment_method` renders as a **column-name structure row only** — never as a live gateway selector.
- Every Upload = **GATE** (`data-disabled-reason`). **0 `type=file`.**
- **Backup:** `backup_email` destination = **1 real `field(text)`** (no value) + gated "Save destination" + gated
  "Send backup now". Legacy fired a real DB backup from a bare `<a>` with **no confirmation** — **not
  reproduced**.
- **Policies:** `family_privacy` + `teacher_privacy` = **2 authored display-only bodies** + a gated **Edit** each.
  **No Quill, no rich-text editor, no new dependency.** The 2 unlabelled legacy selects (U-6) are **not
  reproduced**.
- **2FA:** structure row + GATE (relocated from General). `otp` **NOT rendered**.
- Security `field()` count = **1**. Gates ≈ **12** (4 upload + 3 template + 2 backup + 2 policy-edit + 1 2FA) —
  **every one a direct `data-disabled-reason` gate; NO `data-confirm` is added** (§6). A confirm dialog in front of
  an inert gate would stage a destructive-action ritual for an action that structurally cannot occur; the honest
  disposition is the gate, and the four facts an admin needs before a real backup (scope · destination · permission ·
  audit) are carried **in the gate's visible reason/purpose copy**, not in a fake confirm.

Contracts: `contracts/security-import-backup-policy-contract.md`, `contracts/safe-import-columns-contract.md`;
evidence `security-settings-scope.md`.

### 5.5 USERS — 0-diff

Deep-link only (§4). `usersPanel()` unchanged: real `<a href="staff.html">` + `rolesSection()` preview.
**0 `field()`, 0 drawers, 0 gates, 0 fixture change.**

### 5.6 INTEGRATIONS — **11** providers · **24** sensitive fields (NOT 17)

**Sensitive-field enumeration:** incoming **15** (PayPal 2, Stripe 2, Mollie 1, XPay 3, Payoneer 2, Paymob 5,
Custom 0) + payout **7** (Paymob Payout 4 incl. the `type=password` `key4`; Payoneer Payout 3) + Email **2**
(`smtp_username`, `smtp_password`) = **24**. **Conflict resolved:** the Spec-040 specify artifacts say 17 — that
figure = 15 incoming + 2 password and silently drops Paymob-Payout key1-3, Payoneer-Payout key1-3 and
`smtp_username`. **PICK 24** (raw-HTML enumeration, itemisable field-by-field).
**All 24 = STRUCTURE-ONLY rows** (`{labelKey, required, purposeKey}` — **never a `value`**). **0 inputs, 0 values,
0 `type=password`, 0 `type=file`.**

| # | Provider | id | Safe controls | Sensitive (structure rows) |
|---|---|---|---|---|
| 1 | Stripe | 2 | `name` | Key 1, Key 2 → **2** |
| 2 | PayPal | 3 | `name`, environment (Live/Sandbox) | Client ID, Client Secret → **2** |
| 3 | Mollie | 4 | `name` | Key 1 → **1** |
| 4 | XPay | 5 | `name`, url (staging/community), 4 method toggles | API Key, Community ID*, Variable Amount ID* → **3** |
| 5 | Payoneer | 6 | `name`, environment | Merchant Code, API Key → **2** |
| 6 | Paymob | 7 | `name`, **region** (Egypt / Oman / Saudi Arabia / UAE — proven help text: **region**, not mode) | Secret Key, Integration ID, Public Key, HMAC Secret, `settings[api_key]` → **5** |
| 7 | Custom | 10 | `name`, Payment Details `textarea` | **0** |
| 8 | Paymob Payout | 8 | mode (sandbox/live), is_active toggle, **webhook URL = structure row, no value** | Client ID, Client Secret, Username, **Password** → **4** |
| 9 | Payoneer Payout | 9 | mode, is_active toggle, webhook structure row | Username/Login, API password/Key, Program ID → **3** |
| 10 | WhatsApp (Free) | 1 | phone (text), `send_group` (select Private/Group), `group_name` (text) | **0** |
| 11 | Email / SMTP | 11 | `email_address`, `smtp_host`, `smtp_port` (number), `smtp_encryption` (select None/SSL/TLS), is_active + is_default toggles | SMTP Username, SMTP Password → **2** |
| | | | **21 `field()` + 8 toggles + 26 structure rows** | **24** |

- **Status chips: NEVER "Connected".** All 11 carry an honest chip from the CLOSED three-state vocabulary
  («غير مُعدّ» / "not configured" · «يتطلّب ربط الخادم» / "requires the server" · «غير متاح» / "unavailable"),
  using the **existing six tones only** (`live|upcoming|completed|cancelled|amber|neutral` — a 7th tone **throws at
  build**, Risk **R6**). **Chip-token law (binding):** no chip may contain «متصل» / `connected` **in any form** —
  not even the negative "not connected" — because the machine census is `0 chips matching /متصل|connected/i`
  (the affirmative-only variant is unwritable: the backendRequired sentence "available once the server is
  connected" legitimately contains the word elsewhere in the body, so the census must be **chip-scoped and
  token-absolute**). The legacy 7-code WhatsApp enum (UNKNOWN / PAIRING / DISCONNECTED / CONNECTING / CONNECTED /
  IDLE / STOPPED) is **documented in a fixture comment, never simulated** — no Laravel Echo, no websocket, no
  `/broadcasting/auth`, no polling.
- **WhatsApp pairing + QR = GATE.** No `<canvas>`, no QR renderer, no invented wizard (U-3). "Wake connection",
  "Test send", "Logout" = gates.
- **WhatsApp insights pages EXCLUDED entirely** — they leak a live joinable `chat.whatsapp.com` invite URL,
  unmasked phones/emails, and egress real names to `ui-avatars.com`. **Owner: Spec 043** (privacy /
  anti-poaching). The legacy WhatsApp card copy mentioning "salary reports" is **not reproduced** (pay-free law).
- Every final (Connect / Save / Test SMTP / Toggle-enable) = `backendRequired` gate. **No fake enable toggle** on
  the cards (legacy's `is_enabled` POSTs a real toggle — ours lives **inside the drawer** as a preview toggle +
  gated Save).
- **The legacy anti-pattern is the reason for the law:** every one of these credentials is a plain **unmasked
  `type=text`**, and the configure tables print `Key 1` / `Key 2` columns raw (the one populated row emits
  `<td>01015264856</td>`; zero masking exists anywhere). **We render none of it.**

Contracts: `contracts/integrations-catalog-contract.md`, `contracts/sensitive-provider-fields-contract.md`,
`contracts/no-fake-settings-contract.md`; evidence `integrations-scope.md`,
`integration-provider-field-matrix.md`, `role-permission-and-sensitive-data-carryover.md`.

### 5.7 PAYMENT METHODS — folded into Integrations (no seventh nav item)

- The **7 create variants** (`payment_method` 1-7 = PayPal, Stripe, Custom, XPay, Mollie, Payoneer, Paymob)
  become the **7 incoming providers' Configure drawers**. No separate surface, no new page, **no chooser page**
  (U-2: the chooser was never captured — the provider catalogue *is* the chooser).
- The **8th capture (edit, id=1) is structurally identical** to create variant 3 (same field set; only
  `_method=PUT` + prefilled values differ) → **NOT a separate surface**. The instances list renders an **honest
  empty state** ("no payment method configured — available once the server is connected"). There are **0 authored
  instances**, so there is nothing to edit and no `Number Of Family` count to fabricate.
- **Semantic labels used ONLY where proven** (label / placeholder / help in raw HTML): Paymob `Integration ID` =
  "comma-separated when offering more than one" · Paymob `settings[api_key]` = "optional, status reconciliation
  only; separate credential from the Secret Key" · Stripe key1 = Publishable Key / key2 = Secret Key
  (placeholders) · PayPal = Client ID / Client Secret.
- **UNKNOWN, stated as such, never invented:** XPay `Community ID` and `Variable Amount ID` business meaning ·
  the distinction between Paymob's three secret-ish fields beyond the proven help · Email "Add Account"
  management (U-4) · the RTL behaviour of the legacy forms (U-7 — our RTL is authored, not ported).

Contracts: `contracts/payment-methods-fold-contract.md`; evidence `payment-methods-scope.md`.

### 5.8 Message Builder → **owner Spec 053 (Integrations Command Center)** — no Spec-040 UI

Full evidence: route `/management/settings/customisation/message-builder`; sibling of Personalisation under
Settings › Customization; **HTTP 504 Gateway Timeout**, `isErrorPage:true`, `domSummary` all-zero (0 links /
buttons / forms / inputs / images), corroborated twice (page JSON + the Personalisation page's own network log).
**Zero UI evidence exists. No UI may be invented.**

- **053 = capability owner.** A message *builder* composes outbound channel templates; its only real dependency is
  a **connected channel** (WhatsApp / Email / SMTP) — precisely what 053 owns. Frontend-only, it is inert.
- **048 = placement custodian** (Content/Certificates/Access & **Settings Review**): the Customization tab keeps
  the existing honest gate (`adm.set.cust.msgBuilder` + `adm.set.cust.msgBuilderReason`, shipped by Spec 031,
  **unchanged by Spec 040**); 048 verifies it is still honest.
- **045** (Communications *Review*) reviews already-built comms surfaces (Spec 034) — it does not invent a
  composer. **057** is a freeze spec — it may not originate a capability.
- **Spec 040 action: none beyond keeping the existing gate.** No fields, no drawer, no copy describing a UI
  nobody has seen.

Register: `future-owner-register.md`.

### 5.9 Settings-hub totals after Spec 040

| Tab | `field()` | `data-toggle` previews | Structure-only rows | Gates (≈) |
|---|---|---|---|---|
| General | **22** (10 identity + 10 automation + 2 head-add) | 7 | 0 | 5 |
| Notifications | **13** | 34 | 0 | 7 |
| Customization | **16** | 0 | 0 | 3 |
| Security | **1** | 0 | 34 (33 columns + 2FA) | 12 |
| Users | **0** (unchanged) | 0 | 0 | 0 |
| Integrations | **21** | 8 | 26 | ~24 |
| **Total** | **73** (was 2) | **49** | **60** | **~51** |

**Global honesty census (must hold at build):** `type=password` **0** · `type=file` **0** · `<canvas>` **0** ·
authored secret/API-key/token/webhook value **0** · fake "Connected" **0** · fake success toast **0** ·
currency/pay figure **0** · computed metric **0**.

Contract: `contracts/complete-settings-forms-contract.md`; evidence `settings-complete-field-matrix.md`.

---

## Presentation (per surface)

| Surface | Pattern | Why |
|---|---|---|
| General › Identity | **inline section** (`.wiz-grid` of `field()`s) + gated Save | 10 fields — a modal would bury them |
| General › Automation (17) | **inline sections grouped by native `<details>` accordion** (Renewal · Cancellation window · Attendance · Class closing · Reporting) | Big group; `<details>` is browser-native — **zero JS, zero new hook** (precedent: `add-family.js:51`) |
| General › Locations / Expense heads | inline (unchanged) + `head-add` **drawer** | Unchanged |
| Notifications (47) | **inline sectioned matrix** — 7 `settingsSection`s (System · Course · Class · Reminders · Invoices · Salary events · Family status), toggle rows + inline selects/numbers, each with its own gated Save; optionally per-group `<details>` | **Explicitly NOT a modal. The matrix is the page.** |
| Customization | **inline sections** (Global appearance · Class-status colours) + gated academy-wide Save | The colour grid needs width |
| Security › Imports ×4 | **inline cards**, each with a native `<details>` "Required columns" disclosure (mirrors the legacy info-toggle) + gated Upload / Download | Column contracts are long |
| Security › Backup | inline row + gated actions | 1 field |
| Security › Policies ×2 | **inline display bodies** + gated Edit | **Never a small modal** |
| Security › 2FA | inline structure row + gate | — |
| Users | inline (unchanged): real `staff.html` link + RBAC preview | 0-diff |
| Integrations › 11 cards | **inline card grid** (`.card`, the existing `integCard()` pattern extended) | — |
| Integrations › per-provider Configure | **DRAWER** — `formDrawer('integ-<id>', {titleKey, headIcon, fields, ctaKey, reasonKey})`: safe fields as `field()`s, sensitive fields as structure rows, **exactly ONE** gated primary final | **Never a small modal**; the drawer is the sanctioned long-form host (Spec 032 mechanism) |
| Connect / Test / Pair / Upload / Send-backup / Save / palette Reset | **`data-disabled-reason` gate** | Every final write |
| **Confirms** | **NONE ADDED** (the pre-existing "reset data" confirm is unchanged) | **Binding.** Spec 040 introduces **zero** `data-confirm` chains. A confirm in front of an inert gate stages a destructive-action dialog for an action that structurally cannot occur — that is theatre, not honesty. The facts a real destructive action would need (scope · destination · permission · audit) live in the **gate's visible reason/purpose copy**. When the backend arrives, the owning spec (053 / backend) adds the real confirm together with the real action. |

Evidence: `forms-modals-interactions-register.md`; contract `contracts/modal-long-form-presentation-contract.md`.

---

## Source-File Plan

### EDITED — 7 application files

| # | File | Change |
|---|---|---|
| 1 | `app/src/js/nav.config.js` | **The ONLY navigation-source edit.** Lines 110-115: 6× add `route`, remove `status:'planned'`. `FUTURE_ROUTES` stays `{}`. `classSalaryReport` (`:90`) untouched. |
| 2 | `app/src/js/pages/settings.js` | The hub body — the **only** page builder touched. |
| 3 | `app/src/js/fixtures/settings-management.js` | **EXTENDED** (identity, automation, customization colours, security imports/backup, provider catalogue 7 → 11 + provider field matrices). |
| 4 | `app/src/js/fixtures/settings-notifications.js` | **NEW** — the 47-control matrix + the 5-value channel enum. |
| 5 | `app/src/locales/ar.adm.js` | Extended (`adm.set.*`). |
| 6 | `app/src/locales/en.adm.js` | Extended, **mirrored, 0 divergence**. |
| 7 | `app/src/styles/app.css` | **ADDITIVE ONLY** — see below. |

### EDITED — 3 test files
`app/tests/smoke/run.cjs` (2 declared supersessions + 2 sanctioned strengthenings + an additive block) ·
`app/tests/a11y/run.cjs` (additive rows) · `app/tests/screenshots/capture.cjs` (additive frames + one required
re-baseline). Plus docs: `app/README.md`, `app/screenshots/REVIEW.md`, `CLAUDE.md`, and this spec's
`implementation-status.md`.

### `app.css` — additive classes ARE needed (honest statement)

Three additive rules. **No token changes, no chip tones, no framework.**
- `.set-struct` — the sensitive **structure row** (label + "required" badge + purpose), styled from existing tokens.
- `.set-acc` / `.set-acc > summary` — the native `<details>` disclosure inside a `.set-section` (no `.accordion`
  class exists today; `.pt-nav-drawer` is portal-scoped and not reusable here).
- `.set-swatch` — the colour swatch chip (today inline-styled in `settings.js`; promoted to a class).

Precedent: `.cc-*` (Spec 034), `.finm-*` (Spec 038), `.cert-stage` (Spec 031). **Additive CSS is not a hook and
does not breach the closed-hook law.**

### Component extension — plainly: **NONE**

No component change is required. Booleans go through `settingsSection`'s existing `kind:'toggle'` path. See §5.0.

### MUST BE 0-DIFF (verify with `git diff --stat` against `58a53e2`; any diff ⇒ **STOP**)

`package.json` · `scripts/build-html.mjs` · `src/js/enhance.js` · `src/js/i18n.js` ·
`src/js/components/tabs.js` · `src/js/components/sidebar.js` · **`src/js/components/settings-section.js`** ·
**`src/js/components/form-field.js`** · **`src/js/components/preview-drawer.js`** · `src/js/components/ui.js` ·
`src/js/fixtures/settings.js` · `src/js/pages/staff.js` · `src/js/fixtures/staff-management.js` · every other
`pages/*.js` and `fixtures/*.js`.

Contract: `contracts/scope-guard.md` §2 (the 0-diff wall).

---

## Body-Change Allowlist

| Set | Files | Change |
|---|---|---|
| **Body-change allowlist** | `public/settings.html`, `public/settings.en.html` | **2 files.** Full `#page-body` rewrite (6 completed tabs). |
| **Sidebar-only** | the other **62 admin files** (64 admin − 2 settings) | The shared sidebar's 6 settings entries change from `<button class="nav-item is-planned" data-coming-soon data-soon-key="nav.comingSoon">` → `<a class="nav-item" href="settings(.en).html#view=…">`. **`#page-body` BYTE-IDENTICAL** — proven by md5 of the extracted `#page-body` against `git show 58a53e2:…`. |
| **Byte-identical** | the **51 non-admin files** (16 portals + portal internals + `index.html`) | They do not render the admin sidebar. **0 bytes changed.** |
| **Total** | 2 + 62 + 51 = **115** ✔ | |

**`gallery.html` / `gallery.en.html` are NOT in the body allowlist.** Under the Decision-2 retirement (§9.2) no
nav specimen is added to the gallery — it is an admin page and changes **sidebar-only** like the other 61. (If a
maintainer later overrides to the gallery-specimen option, the allowlist widens to 4 bodies **and this plan must
be amended**; the specimen would have to live inside `#page-body` — outside `.nav-panel` — or it breaks
`navCount32 === 50` (`smoke:1300`) and `deadNav` (`smoke:172`).)

Contracts: `contracts/impact-protection-contract.md`, `contracts/cross-surface-impact-contract.md`; evidence
`settings-cross-surface-impact-register.md`.

> **Never say "nav-only" or "all bodies byte-identical" for Spec 040.** Unlike Specs 034–039, this spec rewrites
> the target page's own body: `settings.html`/`.en` **do** change. The correct headline is **2 bodies changed ·
> 62 sidebar-only · 51 untouched** (`contracts/impact-protection-contract.md` §4).

---

## Protected-Test Supersession summary

Exactly **two declared supersessions** and **two sanctioned strengthenings**. Anything else changed in
`app/tests/` is a **STOP condition** (§13.8).

### 9.1 Supersession 1 (strengthening) — `settingsPlanned === 6 → === 0`

Two sites, both authored by Spec 039, both naming **Spec 040** as owner:

| Site | Old | New |
|---|---|---|
| `smoke:1446` | `ok(nav039.settingsPlanned === 6, …'settings category should keep 6 planned «قريبًا» items (owner Spec 040)'…)` | `ok(nav039.settingsPlanned === 0, …'settings must have 0 planned «قريبًا» items after Spec 040 (six real deep-links)'…)` |
| `smoke:2340` | `ok(nav.settingsPlanned === 6, …'settings must keep 6 planned items (owner Spec 040)'…)` | `ok(nav.settingsPlanned === 0, …'settings must have 0 planned items after Spec 040'…)` |

Supporting reads at `:1436`, `:1439`, `:2326`, `:2331` are **kept byte-verbatim** — only the expected value changes.

### 9.2 Supersession 2 — the `.nav-item.is-planned` CLICK probe (`smoke:223-230`) → **RETIRE**

Settings was the **last** planned-bearing category. After the six deep-links there is **no honest specimen left to
click**. Keeping a dishonest planned nav item purely to feed a test is forbidden, and **the probe must never be
pointed at `classSalaryReport`** — a `disabled` lock is categorically *not* a planned item, and its own probe
already exists and stays.

**Decisive precedent:** `components/portal-shell.js:30` already renders an `is-planned` branch that has had
**zero instances since Spec 025** (ROLE_NAV has no `status:'planned'` item; every `public/*-portal.html` shows
`data-coming-soon` = 0). The codebase already tolerates an unexercised planned render branch and expresses it as
an honest **vacuous** assert (`plannedNavAnchors === 0`). Spec 040 does the same for the admin sidebar.
**"Zero coming-soon claims left" is a product milestone, not a coverage hole.**

The probe body is replaced (in place, inside `if (page === 'dashboard')`) by a **sitewide zero-census**:
`planned === 0 && comingSoon === 0`, with a comment recording the retirement, the precedent and the three
replacement coverages.

**Gallery-specimen option (not taken):** `pages/gallery.js` (87 lines) contains **no** nav-item specimen — its
sections are buttons / kpi / tiles / chips / medallions / fields / avatars / badges / report / menu / toast /
states. The 6 `data-coming-soon` occurrences in `public/gallery.html` **are the shared sidebar's settings items** —
exactly the ones Spec 040 removes. Adding a specimen is a **product change** (gallery body diff ×2, new
`gallery.sec.nav` locale keys, a nav component rendered outside any nav) that buys one toast branch. **Not taken.**

### 9.3 Sanctioned strengthenings (2)

1. **`smoke:1196`** `ok(a31.gates >= 4, …)` → **`ok(a31.gates >= 20, …)`** (Ledger-fixed value; predicted built
   count ≈ 51). **Measured caveat:** the pre-040 settings body already renders **23** gates, so the 20-floor sits
   *below* today's value and is **not load-bearing** — the real coverage is B3's exact censuses (`fields===73`,
   `toggles===49`, `struct===60`) plus the 12-drawer `FORM_DRAWERS_032` audit. Keep **20** (STOP-8 forbids
   un-declared assert edits); tightening to `>= 40` is a further strengthening and needs a declared amendment.
2. **`FORM_DRAWERS_032` (`smoke:92`)** — `settings: ['head-add']` → `settings: ['head-add', 'integ-stripe',
   'integ-paypal', 'integ-mollie', 'integ-xpay', 'integ-payoneer', 'integ-paymob', 'integ-custom',
   'integ-paymob-payout', 'integ-payoneer-payout', 'integ-whatsapp', 'integ-email']`.
   **This is a register-omission the plan MUST close** — otherwise the 11 new drawers **silently escape** the
   fieldless / noGate / multiPrimary / MUST-OMIT audit. An unregistered drawer is a spec failure, not a pass
   (Risk **R4**).

### 9.4 Additive coverage (new, non-superseding)

1. **Six anchor asserts + a planned/coming-soon census** in the existing non-portal `nav039` block near
   `:1443-1446`, reusing `anchorOk039` (defined at **`:1442`** — verified in the tree at `58a53e2`; the Ledger's
   "`:1444`" is an off-by-two typo) unchanged, with per-item regexes
   `(^|/)settings\.(en\.)?html#view=<tab>$` for `general | notifications | customization | security | users |
   integrations`, plus `plannedTotal === 0 && comingSoon === 0`.
2. **Source-level `nav.config` audit** appended inside the existing post-`browser.close()` block (`:2347-2363`,
   `byId` already defined there): the six exact `implemented` + `route` pairs · **`planned` count === 0** ·
   **`disabled` count === 1** (`classSalaryReport`) · `FUTURE_ROUTES` stays `{}` · admin menu **50**. This is the
   one requirement the DOM-only tests cannot reach (Spec-039 precedent).
3. **Six fresh-context deep-link tests** (Spec-039 pattern): seed `localStorage['academy.schedView.settings']` to
   a *different* tab, load `settings(.en).html#view=<tab>`, assert **exactly ONE visible `[role=tabpanel]`** = the
   target and **0 external requests**. AR + EN × 6 = **12 executions**.
4. **REVIEW.md record:** `sidebar.js:33` (`is-planned` + `data-coming-soon`) and `enhance.js`'s coming-soon branch
   become intentionally **unexercised-but-retained** branches (zero-deletion law), mirroring `portal-shell.js:30`
   since Spec 025.

### 9.5 Preserved BYTE-VERBATIM (non-exhaustive, all must hold)

`clickFeedback` (`:206-215`) · the four dashboard feedback selectors + loop (`:216-222`) · the **is-disabled
reason-toast probe** (`:231-240` — still valid; `classSalaryReport` is an honest lock) · the category-switch probe
(`:241-251`) · `truth010` (`:1696-1706` — `badPlanned` becomes **vacuously true**, therefore **preserved, not
superseded**) · `deadNav` (`:137-139`, `:172`) · link-integrity (`:1691-1693` — safe: `:1684` strips the fragment
before the `VALID_FILES` lookup) · `navCount32 === 50` (`:1300`) · `adminMenu === 50` (`:2270`, `:2341`) ·
route-freeze **115** (`:2388-2396`) · the settings tab-id contract (`:1194`) · the Spec-031 settings honesty
asserts (`:1172-1176`) · the sitewide `g32` MUST-GATE freeze (`:1288-1297`) · every finance-lock assert ·
`payHit` / `tchPay` / `famPay` / `payFigure` / child-view / FAKE / raw-key / external-request guards.

Contracts: `contracts/protected-test-supersession-contract.md`, `contracts/smoke-coverage-contract.md`; evidence
`protected-test-supersession-register.md`.

---

## Fixtures / Locales plan

### Fixtures

| File | Status | Contents |
|---|---|---|
| `fixtures/settings-management.js` | **EXTENDED** | `IDENTITY_FIELDS` (10) · `AUTOMATION_GROUPS` (17 controls) · `BRAND_ROWS` **4 → 13** (2 theme colours + 11 class-status colours, **6 distinct hexes**) · `APPEARANCE_OPTS` (3 selects) · `SECURITY_IMPORTS` (4 × column contracts, **33** rendered names) · `BACKUP` · `POLICIES` (kept) · `INTEGRATIONS` **7 → 11** + `PROVIDER_FIELDS` (safe controls + **24 sensitive structure rows** `{labelKey, required, purposeKey}` — **never a `value`**). `NOTIF_MATRIX` (6 rows) is **superseded** by the new module. |
| `fixtures/settings-notifications.js` | **NEW** | `NOTIF_GROUPS` (9 event groups / **47** controls) + `CHANNEL_OPTS` (5 values `0/1/3/4/5` — **no value 2**). |
| `fixtures/settings.js` | **0-diff** | `SETTINGS` shell + `ROLES_PREVIEW`. |
| `fixtures/staff-management.js`, `fixtures/form-options.js` | **0-diff** | Reuse `FORM_STATUS_OPTS` where applicable. |

### Locales — `ar.adm.js` / `en.adm.js` **only**

**Mirrored, 0 divergence.** Today: **397 `adm.*`** / **121 `adm.set.*`** each.
Namespaces extended: `adm.set.gen.*` (identity + the 17 automation labels/help) · `adm.set.notif.*` (9 groups,
28 distinct events, 5 channel labels) · `adm.set.cust.*` (2 brand + 11 status colours + 3 appearance selects) ·
`adm.set.sec.*` (4 imports × columns, backup, 2 policies, 2FA) · `adm.set.integ.*` (11 providers + safe field
labels + 24 sensitive-row labels/purposes). Estimated `adm.set.*` **121 → ≈ 450** (exact count is the author's;
**AR and EN must be equal**).
Unchanged: `adm.set.users.*`, `adm.set.tab.*`, `adm.set.heads.*`, `adm.set.loc.*`, and the Message-Builder gate
keys `adm.set.cust.msgBuilder` / `adm.set.cust.msgBuilderReason`.
**`src/js/i18n.js` stays 0-diff** (the `adm` pair is already registered).

Contract: `contracts/fixtures-locales-contract.md`.

---

## A11y / Screenshot plan

**A11y (`tests/a11y/run.cjs`) — additive rows; target stays `critical=0 serious=0`:**
- `settings.html#view=general`, `#view=notifications`, `#view=customization` — **zero coverage today** — plus
  `#view=security`, `#view=users`, `#view=integrations`, each × **AR/EN** × **light/dark**.
- **mobile-390** rows for the 47-row notifications matrix and the 11-card integrations grid — **0 horizontal
  overflow**.
- **≥3 open-drawer rows** (`integ-paymob`, `integ-email`, `head-add`) — focus trap + `role=dialog` + labelled
  fields.
- The **roving-tabindex keyboard row** (ArrowRight / ArrowLeft across the 6 settings tabs).
- `<details>` disclosures (automation accordion, import "Required columns") must be keyboard-reachable and
  correctly announced.

**Screenshots (`tests/screenshots/capture.cjs`) — additive frames + ONE required re-baseline:**
- **Re-baseline (expected, not a regression):** `capture.cjs:62`
  `dashboard__ar__light__desktop__cat-settings.png` currently shows **six «قريبًا» buttons** and becomes **six
  links** (Risk **R8**).
- New `sp040-*` frames: the six tabs × AR/EN (light) · dark for notifications + integrations · mobile-390 for
  notifications + integrations · 3 open provider drawers (Paymob showing **structure rows, no inputs**; WhatsApp
  showing the **pairing GATE**; Email/SMTP showing the **2 sensitive structure rows**) · the security import card
  with its `<details>` open · the admin sidebar rendering all six settings items as **real links** (the
  zero-«قريبًا» proof).
- **0 console errors** across the whole capture run.

Contract: `contracts/a11y-screenshot-contract.md`; evidence `targeted-visual-grounding.md`.

---

## Impact Protection (non-destructive baseline proof)

**No `git stash`, no `git reset`, no `git checkout` — ever.** The proof is a read-only comparison against the
committed tree:

1. **Preflight** (before any edit): assert HEAD = `58a53e2`, tree clean, `app/tests/` byte-identical to HEAD,
   `npm run build` → **115**, admin menu **50**.
2. **Baseline snapshot** (read-only): for each of the 115 built pages, extract the normalized `#page-body` and
   record its md5 — sourced from **`git show 58a53e2:academy-dashboard-discovery/app/public/<file>`**, never from
   a mutated worktree. Store under the scratchpad, not in the repo.
3. **After implementation**: rebuild, re-extract, compare:
   - `settings.html` / `settings.en.html` → **expected to differ** (the only 2 allowed body changes).
   - the other **62 admin pages** → `#page-body` md5 **IDENTICAL**; the only whole-file delta is the shared
     sidebar's 6 settings entries (button → anchor).
   - the **51 non-admin pages** (16 portals + portal internals + `index.html`) → **byte-identical whole file**.
4. **Source diff gate**: `git diff --stat` must show **exactly** the 7 app files + 3 test files + docs of §7. Any
   diff in a 0-diff file ⇒ **STOP**.
5. **Census gates**: sitewide `planned = 0`, `[data-coming-soon] = 0`, disabled locks `= 1`, `FUTURE_ROUTES = {}`,
   pages `= 115`, `PAGES = 57`, menu `= 50`, AR/EN `adm.*` divergence `= 0`.

Contract: `contracts/impact-protection-contract.md`.

---

## Risks

| # | Risk | Mitigation |
|---|---|---|
| **R1** | **`a31.credInputs` naming trap (HIGHEST).** `smoke:1174` asserts 0 inputs whose **name or id** matches `/pass\|secret\|api\|key\|token\|webhook\|card\|cvv/i`, on **every** page. | **Naming law for all 73 new fields: no `pass`, `secret`, `api`, `key`, `token`, `webhook`, `card`, `cvv` substring in any `name`/`id`.** Legacy `card_style` → **`cust-surface`** (a name containing `card` **fails the build's own test**). `key1..key4`, `settings[api_key]`, `smtp_username`, `smtp_password`, webhook URL → **structure rows, no inputs** (which is the law anyway — the test merely enforces it). |
| **R2** | **`a31.currency === 0` on settings.** Body must contain no `ريال \| SAR \| جنيه \| EGP \| AED \| EUR \| $ \| € \| £`. | The rejected `currency` import column removes the main source; provider copy carries no currency symbol. ("Saudi Arabia" is safe — `\bSAR\b` does not match.) |
| **R3** | **`noPdf` / `g32.pdfish`** regex `/window\.open\|blob:\|createObjectURL\|\.pdf"\|[^-\w]download=/i`. | "Download template" is a **`<button>` gate**, never `<a download=…>`. The **word** "download" in a label is safe; the **attribute** is not. |
| **R4** | **`FORM_DRAWERS_032` (`smoke:92`) register omission.** | Register all **12** settings drawers (`head-add` + 11 `integ-*`). Each must satisfy: ≥1 `input/select/textarea` · ≥1 `[data-disabled-reason]` · **≤1** `.btn-primary[data-disabled-reason]` · 0 OMIT-named inputs (`/pass\|secret\|api[-_]?key\|token\|webhook\|otp\|salary\|hour[-_]?rate\|fine\|payout\|iban\|cvv/i`) · 0 `<canvas>`. **Unregistered drawers silently escape the audit.** |
| **R5** | **Toggle honesty + the preview-note token trap.** | The 49 `data-toggle` previews must carry the **backendRequired** `data-toast` (never `set.savedToast` / «تم الحفظ» / "saved"), and each toggle-bearing section a visible preview-only note. **The note's copy must avoid the tokens `saved` / «الحفظ»** — the fake-success censuses grep `\bsaved\b` + «تم الحفظ» over body **and template** text, and the naive "preview only — not saved" / «معاينة فقط — لا يتم الحفظ» would MATCH («يتم الحفظ» contains «تم الحفظ») and fail an honest build. Canonical copy: «معاينة فقط — لا يُخزَّن أي تغيير قبل ربط الخادم.» / "Preview only — nothing is stored until the server is connected." (§5.0) |
| **R5b** | **The "connected" token trap.** | The backendRequired sentence *"available once the server is connected"* legitimately contains `connected`, so a body-wide `/connected/i` census would fail on an honest build. The fake-connected guard is therefore **chip-scoped and token-absolute**: `0` elements matching `/متصل\|connected/i` **inside a status chip**. Consequently the honest chips read «غير مُعدّ» / "not configured" — never "not connected". |
| **R6** | **Chip-tone build guard** (`build-html.mjs:168-175`) — only `live\|upcoming\|completed\|cancelled\|amber\|neutral`. | Provider/status chips use these six. A 7th tone **throws at build**. |
| **R7** | **A11y load** — a 47-row matrix + 11 drawers. | New a11y rows per §11; target `critical=0 serious=0`; mobile-390 no h-overflow. |
| **R8** | **Screenshot re-baseline** — `capture.cjs:62` `cat-settings` changes from six «قريبًا» buttons to six links. | Expected and required; re-baseline + add `sp040-*` frames. |
| **R9** | **HEAD drift** — CLAUDE.md and `spec.md` say `4cbcb31`. | Real HEAD is **`58a53e2`**. All diffs/md5s against `58a53e2`. Docs are updated at the end. |
| **R10** | **Evidence conflicts** (resolved below). | See the table. |

### R10 — evidence conflicts, resolved

| Conflict | Sources | **PICK** | Reason |
|---|---|---|---|
| Sensitive integration fields **17 vs 24** | specify artifacts (17) vs raw-HTML enumeration (24) | **24** | The 17 omits Paymob-Payout key1-3, Payoneer-Payout key1-3, `smtp_username`; the 24 is itemisable field-by-field. |
| Customization distinct hexes **7 vs 6** | `customisation-settings-scope.md` (7) vs raw HTML (6) | **6** | Enumerated: FFC107, 17A2B8, DC3545, 6C757D, 28A745, 007BFF. |
| General rendered **28 vs 27** | `general-settings-scope.md` (28) vs the ledger (27 + 1 gated) | **27 rendered + 1 gated `logo`** | Same 41 total; the doc buckets the gate as "rendered". |
| Sixth settings domain = **"Payment Methods" vs `settingsUsers`** | user brief vs source | **`settingsUsers`** | Payment Methods is not a nav item anywhere; it folds into Integrations. |
| Spec 033 predicted **"nav-only"** | roadmap vs field audit | **NOT nav-only** | 2 rendered fields today vs a ~150-control legacy surface. The **0-count-impact** half of the prediction holds. |

### STOP CONDITIONS (any one fires ⇒ halt, do not commit)

1. Any diff in `package.json` · `build-html.mjs` · `enhance.js` · `i18n.js` · `tabs.js` · `sidebar.js` ·
   `form-field.js` · `settings-section.js` · `preview-drawer.js` · `fixtures/settings.js` · `staff.js` ·
   `staff-management.js`.
2. Public HTML ≠ **115**, or `PAGES` ≠ **57**, or `.nav-panel .nav-item` ≠ **50**, or settings items ≠ **7**.
3. Sitewide planned ≠ **0**, or `[data-coming-soon]` ≠ **0**, or disabled locks ≠ **1**, or `FUTURE_ROUTES` ≠ `{}`.
4. Any `input[type=password]`, `input[type=file]`, `<canvas>`, `draggable`, `download=`, `window.open`, or any
   authored secret / API-key / token / webhook **value**.
5. Any provider status reading **"Connected"**, or any toast reading **"saved" / «تم الحفظ» / "done"**.
6. Any teacher **pay figure** (salary / rate / fine / payout / currency amount) anywhere on the settings body; any
   currency token (`a31.currency > 0`).
7. Any new `data-*` hook, new localStorage key, or new dependency.
8. Any protected assert changed outside the **two declared supersessions** (`settingsPlanned` 6→0 at `:1446` /
   `:2340`; the planned-item click probe at `:223-230`) **plus** the two sanctioned strengthenings
   (`a31.gates >= 4 → >= 20`; the `FORM_DRAWERS_032.settings` extension).
9. Any admin `#page-body` other than `settings(.en).html` differing in md5 from `git show 58a53e2:…`; any of the
   51 non-admin files differing at all.
10. AR/EN `adm.*` key-set divergence ≠ **0**.

Contract: `contracts/scope-guard.md`; register `no-fake-settings-integrations-register.md`.

---

## Project Structure

### Documentation (this feature)
```text
specs/040-settings-deep-links-subpages/
├── spec.md + 17 specify artifacts (committed at 58a53e2)
├── plan.md          # this file
├── research.md      # Phase 0
├── data-model.md    # Phase 1
├── quickstart.md    # Phase 1 (impl + verify workflow; not executed here)
└── contracts/       # Phase 1
```

### Contracts (Phase 1) — the exact **25** files under `contracts/`
**Nav / count:** `settings-nav-completion-contract.md` · `page-count-route-contract.md` ·
`settings-users-destination-contract.md` (Decision 1).
**Domains:** `general-settings-completeness-contract.md` · `automation-rules-contract.md` ·
`notification-matrix-contract.md` · `customisation-contract.md` ·
`security-import-backup-policy-contract.md` · `safe-import-columns-contract.md` ·
`integrations-catalog-contract.md` · `sensitive-provider-fields-contract.md` ·
`payment-methods-fold-contract.md` · `complete-settings-forms-contract.md` (the cross-form index).
**Laws:** `no-fake-settings-contract.md` (the four honest classes + the toggle/structure-row law) ·
`pay-free-settings-exclusion-contract.md` · `role-permission-privacy-carryover-contract.md` ·
`modal-long-form-presentation-contract.md` · `cross-surface-impact-contract.md` · `scope-guard.md`
(the 0-diff wall + forbidden-token greps) · `impact-protection-contract.md`.
**Verification:** `protected-test-supersession-contract.md` (Decision 2) · `smoke-coverage-contract.md` ·
`a11y-screenshot-contract.md` · `fixtures-locales-contract.md` · `targeted-visual-grounding-contract.md`.

> There is **no** `structure-row-and-toggle-contract.md`, `zero-diff-file-contract.md`,
> `no-secret-no-fake-contract.md` or `settings-<domain>-contract.md` — earlier drafts of this plan cited those
> names; the authoritative filenames are the ones above. `count-and-route-contract.md` exists at the spec **root**
> (a specify-phase artifact); the Phase-1 contract is `contracts/page-count-route-contract.md`.

### Source touched by the LATER implementation
```text
academy-dashboard-discovery/app/
├── src/js/nav.config.js                    # ONLY nav-source edit: 6 flips (110-115); FUTURE_ROUTES stays {}
├── src/js/pages/settings.js                # the hub body (6 completed tabs)
├── src/js/fixtures/settings-management.js  # EXTENDED
├── src/js/fixtures/settings-notifications.js  # NEW
├── src/locales/ar.adm.js / en.adm.js       # EXTENDED, mirrored, 0 divergence
├── src/styles/app.css                      # ADDITIVE: .set-struct · .set-acc · .set-swatch
├── tests/smoke/run.cjs                     # 2 supersessions + 2 strengthenings + additive block
├── tests/a11y/run.cjs                      # additive rows
├── tests/screenshots/capture.cjs           # additive frames + cat-settings re-baseline
├── README.md · screenshots/REVIEW.md       # docs
└── (public/*.html)                         # regenerated: 2 bodies + 62 sidebars; 51 untouched
CLAUDE.md                                   # doc (active-feature pointer; also corrects the 4cbcb31 drift)
```

**Structure Decision**: No new structure. Six nav flips into the **existing** settings hub + in-place completion
of its six **existing** tabs.

---

## Phase breakdown (input to `/speckit.tasks`)

| Phase | Content | Gate |
|---|---|---|
| **P0 — Preflight & baseline** | Verify HEAD `58a53e2`, clean tree, `app/tests/` = HEAD, build → 115, menu 50, settings 7/6-planned. Capture the read-only `#page-body` md5 snapshot of all 115 pages from `git show 58a53e2:…`. | Any mismatch ⇒ STOP. |
| **P1 — Nav flip** | `nav.config.js:110-115`: 6× `route` + drop `status:'planned'`. Verify the `implemented ⇒ route` build guard passes; `FUTURE_ROUTES` still `{}`; `classSalaryReport` untouched. | Build → 115; menu → 50; sitewide planned → 0. |
| **P2 — Locales** | `ar.adm.js` / `en.adm.js`: the five extended namespaces. **Mirrored, 0 divergence.** No key removed. | AR/EN key-set divergence = 0; `i18n.js` 0-diff. |
| **P3 — Fixtures** | Extend `settings-management.js`; create `settings-notifications.js`. Authored data only — **no value on any sensitive row**, no pay figure, no currency, no secret. | Fixture greps clean; `fixtures/settings.js` 0-diff. |
| **P4 — CSS** | Additive `.set-struct` / `.set-acc` / `.set-swatch`. No token change, no chip tone. | `git diff` on `app.css` is additive only. |
| **P5 — General tab** | Identity (10 `field()` + logo GATE) · Automation (17 controls in `<details>` groups) · Locations/Expense-heads unchanged + `head-add`. **11 pay fields excluded.** | 22 `field()`, 7 toggles, 5 gates; 0 pay token. |
| **P6 — Notifications tab** | 7 `settingsSection`s / 9 event groups / 47 controls; 5-value channel enum (no value 2); per-section gated Save + "preview only" note. | 13 `field()` + 34 toggles; `salaries` row figure-free. |
| **P7 — Customization tab** | Brand colours + 3 appearance selects (`cust-surface`!) + 11 class-status colours (6 hexes); theme/lang stay REAL; gated academy-wide Save + gated Reset; Message-Builder gate unchanged. | 16 `field()`; 0 canvas; 0 new storage key. |
| **P8 — Security tab** | 4 import cards (33 structure rows, `<details>` column contracts, gated Upload; 3 gated Download-**buttons**) · backup (1 `field()` + 2 gates) · 2 policy bodies + gated Edit · 2FA structure row + gate. | 1 `field()`, 34 structure rows, ~12 gates; 0 `type=file`; 0 `download=`. |
| **P9 — Integrations tab (+ payment-methods fold)** | 11 provider cards (honest not-connected chips) + 11 `formDrawer('integ-*')` with safe `field()`s + **24 sensitive structure rows** + exactly ONE gated final each; honest empty state for stored methods. | 21 `field()`, 8 toggles, 26 structure rows, ~24 gates; 0 password/secret value; 0 "Connected". |
| **P10 — Users tab** | **No code.** Confirm `usersPanel()` / `fixtures/settings.js` / `staff.js` / `staff-management.js` are 0-diff. | 0-diff verified. |
| **P11 — Tests** | Smoke: the 2 supersessions (§9.1, §9.2) + the 2 strengthenings (§9.3) + the additive block (§9.4: 6 anchors, source `nav.config` audit, 12 deep-link executions). A11y rows (§11). Screenshot frames + `cat-settings` re-baseline (§11). | Smoke PASS; a11y critical=0 serious=0; 0 console errors. |
| **P12 — Impact proof** | Rebuild; compare `#page-body` md5 vs the P0 snapshot. **Non-destructive — NO stash/reset/checkout.** | 2 bodies changed · 62 sidebar-only · 51 byte-identical · 115 total. |
| **P13 — Docs & handoff** | `README.md`, `screenshots/REVIEW.md` (record the retained-but-unexercised `sidebar.js:33` / `enhance.js` coming-soon branches), `CLAUDE.md` (active feature + the `4cbcb31 → 58a53e2` drift correction), `implementation-status.md`. **No commit / no push — the watcher commits.** | All 10 STOP conditions clear. |

## Phase status
- **Phase 0 (research)**: `research.md` — authored alongside this plan.
- **Phase 1 (design/contracts)**: `data-model.md` + the 20 contracts + `quickstart.md` — authored alongside this plan.
- **Phase 2 (tasks)**: **NOT created here** — `/speckit.tasks`.
