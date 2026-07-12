# Tasks: Settings Deep Links & Subpages Completion (Spec 040)

**Input**: `plan.md` · `research.md` · `data-model.md` · `quickstart.md` · 25 contracts · 23 specify artifacts
**Baseline**: HEAD **`58a53e2`** · branch `feature/012-role-portal-foundation` · working tree clean of app changes
**Stories**: US1–US11 (from `spec.md`) · **FR-001…FR-033**
**Total tasks**: **115** (T001–T115, contiguous) · **Parallelizable `[P]`**: 8 · **Sequential**: 107

> **This is the LAST planned-item spec.** On completion, sitewide planned = **0**, `[data-coming-soon]` = **0**,
> and exactly **one** honest lock survives (`classSalaryReport`). A lock is **not** a planned item.

---

## Binding numeric contract (every task below serves these)

| Metric | Before | After |
|---|---|---|
| Public HTML · `PAGES` · new page bases | 115 · 57 · — | **115 · 57 · 0** |
| Admin menu · Settings items | 50 · 7 | **50 · 7** |
| Settings implemented / planned | 1 / 6 | **7 / 0** |
| Sitewide planned · `[data-coming-soon]` · categories bearing planned | 6 · 6 · 1 | **0 · 0 · 0** |
| Disabled locks · `FUTURE_ROUTES` | 1 · `{}` | **1 · `{}`** |
| New hooks / storage keys / dependencies / `data-confirm` | — | **0 / 0 / 0 / 0** |
| Hub `field()` controls | **2** | **73** |
| Hub `data-toggle` local previews | **2** ¹ | **49** |
| Structure-only rows | 0 | **60** |
| Gates (`data-disabled-reason`) in body | **23** | **≈51** (floor asserted `>= 20`) |

¹ **Drift correction (recorded).** `plan.md` §Counts states `data-toggle` **0 → 49**. The built body at `58a53e2`
already renders **2** (`SETTINGS.notif` → `sessionAlerts`, `weeklyReport`, via `settings-section.js:28`). Those two
are **superseded** by the 47-control matrix (T045) — `notificationsPanel()` stops calling `settingsSection(SEC.notif)`.
**The AFTER census of 49 is unchanged and authoritative**; only the "before" figure was wrong. `fixtures/settings.js`
stays **0-diff** (the `SETTINGS` export is retained; `SEC.notif` simply becomes unreferenced — zero-deletion law).

**Per-tab targets** (`complete-settings-forms-contract.md`):

| Tab | `field()` | toggles | structure rows | gates |
|---|---|---|---|---|
| General | 22 | 7 | 0 | 5 |
| Notifications | 13 | 34 | 0 | 7 |
| Customization | 16 | 0 | 0 | 3 |
| Security | 1 | 0 | 34 | 12 |
| Users | 0 | 0 | 0 | 0 |
| Integrations | 21 | 8 | 26 | ~24 |
| **Total** | **73** | **49** | **60** | **≈51** |

---

## Strict single-writer files (NEVER mark two tasks touching these `[P]`)

| File | Written by (exhaustive) |
|---|---|
| `app/src/js/pages/settings.js` | T023 · T025–T029 · T034–T041 · T043–T047 · T049–T056 · T058–T065 |
| `app/src/js/fixtures/settings-management.js` | T011–T018 |
| `app/src/js/fixtures/settings-notifications.js` | T019 *(new file)* |
| `app/src/locales/ar.adm.js` | T020 |
| `app/src/locales/en.adm.js` | T021 |
| `app/src/styles/app.css` | T024 |
| `app/src/js/nav.config.js` | T070 |
| `app/tests/smoke/run.cjs` | T074–T085 |
| `app/tests/a11y/run.cjs` | T089–T091 |
| `app/tests/screenshots/capture.cjs` | T093, T094 |

**Consequence: Phases 3–7 are strictly sequential** — every domain panel writes `settings.js`.

## Implementation file allowlist (widening it is a STOP)

**App source (7)**: `src/js/nav.config.js` · `src/js/pages/settings.js` · `src/js/fixtures/settings-management.js` ·
`src/js/fixtures/settings-notifications.js` *(new)* · `src/locales/ar.adm.js` · `src/locales/en.adm.js` ·
`src/styles/app.css`
**Tests/docs**: `tests/smoke/run.cjs` · `tests/a11y/run.cjs` · `tests/screenshots/capture.cjs` ·
`screenshots/REVIEW.md` · `README.md` · repo `CLAUDE.md` · this spec dir · regenerated `public/*.html` · scratchpad

## MUST BE 0-DIFF (any diff ⇒ STOP)

`package.json` · `scripts/build-html.mjs` · `src/js/enhance.js` · `src/js/i18n.js` · `src/js/components/tabs.js` ·
`src/js/components/sidebar.js` · `src/js/components/form-field.js` · `src/js/components/settings-section.js` ·
`src/js/components/preview-drawer.js` · `src/js/components/ui.js` · `src/js/fixtures/settings.js` ·
`src/js/pages/staff.js` · `src/js/fixtures/staff-management.js` · every other `pages/*.js` / `fixtures/*.js` ·
every teacher/family/student portal source · every unrelated admin builder/fixture/locale · every unrelated spec.
**No new component · no new `field()` type · no new hook · no new storage key · no new dependency · no new page ·
no new `PAGES` entry.**

## Model routing (binding for `/speckit.implement`)

*(Corrected 2026-07-12: an earlier draft cited T116–T131, which do not exist. The executable range is exactly
**T001–T115**.)*

**Opus** — T009–T010 (grounding reconciliation) · T011–T019 (fixture/schema decisions) · T023 (settings.js
architecture) · T025–T033 (General + pay-free exclusions) · T034–T042 (notification matrix) · T049–T057
(security / import / privacy) · T058–T066 (integrations + payment-provider modelling) · T070–T073 (nav flip) ·
T074–T088 (protected smoke supersessions) · T096–T099 (impact protection) · T100–T111 (no-secret / no-pay /
no-fake / clean-code guard / test guard / final regression).
**Sonnet** — T020–T022 (mirrored AR/EN locales, after Opus fixes the key names) · T024 (additive CSS) ·
T043–T048 (customisation, once the schema is set) · T089–T095 (a11y rows + screenshot frames) ·
T112–T114 (docs + implementation-status) · the mechanical count/diff checks inside T105–T108.
**Agents must never edit the same file concurrently.**

---

## Phase 1 — Preflight, baseline & targeted grounding

**Purpose**: prove the ground truth before a single byte changes. Nothing here modifies the app.

- [X] **T001** Verify baseline: `git rev-parse --abbrev-ref HEAD` = `feature/012-role-portal-foundation`;
      `git log -1 --format=%h` = `58a53e2` (or a confirmed successor containing Spec 039);
      `git status --porcelain` shows **no** `app/` entry. **Done**: all three hold; else STOP.
      *(contract: `impact-protection-contract.md` §1)*
- [X] **T002** `git diff --stat 58a53e2 -- app/tests/` is **empty** — the three test files are byte-identical to HEAD,
      so every quoted line number in `protected-test-supersession-contract.md` is valid. **Done**: empty diff; else STOP.
- [X] **T003** `npm --prefix academy-dashboard-discovery/app run build` → count `public/*.html` = **115**;
      `PAGES` entries in `scripts/build-html.mjs` = **57**. **Done**: 115 / 57.
- [X] **T004** Nav baseline from `src/js/nav.config.js`: settings items **7**, settings planned **6**, sitewide
      planned **6**, sitewide disabled **1** (`classSalaryReport` + `nav.reason.finance`, no route), `FUTURE_ROUTES`
      **`{}`**. **Done**: all six values match; else STOP. *(contract: `page-count-route-contract.md`)*
- [X] **T005** DOM baseline on `public/settings.html`: `.nav-item` = **50**, `[data-coming-soon]` = **6**.
      **Done**: 50 / 6.
- [X] **T006** Body census baseline on `public/settings.html` `#page-body`: `field()` controls = **2**,
      `data-disabled-reason` = **23**, `data-toggle` = **2**, structure rows = **0**. Record in the scratchpad as the
      pre-040 census. **Done**: recorded; the `data-toggle`=2 drift (footnote ¹) is confirmed, not 0.
- [X] **T007** **Non-destructive baseline snapshot**: for each of the 115 pages, extract the normalized `#page-body`
      and record its md5, sourced from **`git show 58a53e2:academy-dashboard-discovery/app/public/<file>`** — never
      from the worktree. Store under the scratchpad, **not** in the repo. **No stash / reset / checkout / clean /
      branch-switch, ever.** **Done**: 115 md5s recorded. *(contract: `impact-protection-contract.md` §2)*
- [X] **T008** Record the 0-diff wall: `git hash-object` for each of the 13 named forbidden files. **Done**: 13 hashes
      stored for the **T099** comparison. *(contract: `scope-guard.md` §2)*
- [X] **T009** [P] **Targeted visual grounding re-run**: open **all 64** `management-settings-*` screenshots as images
      (5 general · 2 notification · 3 customisation incl. the 504 · 8 security · 26 integrations incl. 11 configure +
      4 WhatsApp-insight · 16 payments · 2 policy) and re-read the matching `output/roles/admin/pages/*.md|json`,
      sanitized HTML, extracted text, and `network/endpoints.json`. **Done**: 64 opened; every count in
      `general-settings-completeness` (41/11/10/18/2), `notification-matrix` (47/28/9),
      `customisation` (17/11/6 hexes), `safe-import-columns` (39→33; 8/12/7/6),
      `integrations-catalog` (11 providers), `sensitive-provider-fields` (24), `payment-methods-fold` (7+1)
      re-confirmed or a drift is filed. *(contract: `targeted-visual-grounding-contract.md`)*
- [X] **T010** Confirm the protected-assertion anchors exist verbatim at: `smoke:92` (`FORM_DRAWERS_032.settings`),
      `smoke:223-230` (planned click probe), `smoke:231-240` (is-disabled reason probe), `smoke:1174` (`credInputs`),
      `smoke:1194` (tab ids), `smoke:1196` (`gates >= 4`), `smoke:1442` (`anchorOk039`), `smoke:1446` +
      `smoke:2340` (`settingsPlanned === 6`), `smoke:1300` + `smoke:2270` (menu 50), `smoke:2347-2363` (nav source
      audit), `smoke:2388-2396` (route freeze 115), `capture.cjs:62` (`cat-settings` frame).
      **Done**: all 13 anchors located; **treat the live source, not this list, as authoritative** if they moved.

**✅ CHECKPOINT 1** — baseline proven, evidence re-grounded, no app byte changed.

---

## Phase 2 — Foundational: locales · fixtures · helpers · CSS

**Purpose**: land every shared structure the six domain phases consume. No domain panel is written yet.
**Order is binding**: fixture *schema* → new notifications fixture → mirrored locales → `settings.js` helpers → CSS.

### 2a — Fixture schema & data (`settings-management.js` — single writer)

- [X] **T011** [US7] Extend `fixtures/settings-management.js` with `IDENTITY_FIELDS` — the **10** safe identity
      controls (7 text: `company_name`, `company_name_ar`, `domain`, `email_info`, `phone`, `whatsapp`, `address`;
      3 select: `country_id`, `city`, `timezone`) as `{name, labelKey, type, required, helpKey, optsKey?}`.
      **Naming law (R1)**: no `name`/`id` may contain `pass|secret|api|key|token|webhook|card|cvv`.
      **Done**: 10 definitions; **0** authored PII (placeholders only: `demo.academy`, `info@demo.academy`,
      `05xx-xx-0000`). *(contract: `general-settings-completeness-contract.md`)*
- [X] **T012** [US7] Add `AUTOMATION_GROUPS` — the **17** safe automation controls in 5 `<details>` groups
      (Renewal · Cancellation window · Attendance · Class closing · Reporting): 5 select
      (`new_course_status` 4 opts, `renew` 3, `auto_makeup` 4, `classes_not_closed` **3 — legacy value `1` is
      genuinely absent; do not invent it**, `teacher_can_edit_class` 3) · 5 number (`stop_after`,
      `classes_not_closed_hours`, `teacher_cancel_before_class`, `student_cancel_before_class`, `show_enter_btn`) ·
      7 toggle. Disambiguate the legacy `send_plan_report` **name collision** → `gen-courseCompleted` /
      `gen-monthlyPlan`; record the collision in a fixture comment, do not reproduce it.
      **`rate_student_absent` MUST NOT appear.** **Done**: 17 controls; `gen-monthlyPlan` carries
      `mode:'disabled'` + honest reason (legacy disabled it behind "No WhatsApp Connected" — the WhatsApp framing is
      **not** reproduced). *(contract: `automation-rules-contract.md`)*
- [X] **T013** [US5] Replace `BRAND_ROWS` (4) with **13** swatch rows = 2 theme colours (`color_scheme` `#5E4D7E`,
      `secondary_color_scheme` `#7B6BA8`) + **11** class-status colours (`pending #FFC107` · `waiting #17A2B8` ·
      `teacher-absent #DC3545` · `student-absent #DC3545` · `teacher-cancel #6C757D` · `student-cancel #6C757D` ·
      `admin-cancel #6C757D` · `attend #28A745` · `reschedule #007BFF` · `running #007BFF` · `makeup #17A2B8`) =
      **6 distinct hexes**. Add `APPEARANCE_OPTS` — 3 selects: `cust-layout` (full/boxed), `cust-sidebar`
      (full/mini), **`cust-surface`** (border/shadow — the legacy name is `card_style`; **a `name`/`id` containing
      `card` fails `smoke:1174` `credInputs`**, R1). **Done**: 13 rows, 6 distinct hexes, `cust-surface` used;
      **0** occurrences of `card` in any new field name. *(contract: `customisation-contract.md`)*
- [X] **T014** [US4] Add `SECURITY_IMPORTS` — 4 import definitions with their **safe column contracts only**:
      Teachers **8** (id, first_name, last_name, email, phone, gender, status, timezone) · Families **12** (id, name,
      user_name, email, phone, status, country_id, timezone, total_hours, invoice_type, course_type, payment_method) ·
      Children **7** (id, name, parent_id, age, gender, language, status) · **Invoices** **6** (id, parent_id, price,
      status, due_date, note) = **33** of 39. **REJECTED and absent: `password`, `hour_rate`, `currency`.**
      Card 4 is mislabelled "Upload families" in legacy; raw HTML (`type=4`, `invoices_file`) proves **Invoices** —
      use the functional name. Card 4 has **no** template-download control. **Done**: 33 column names; grep for
      `password|hour_rate|currency` in the fixture = **0**. *(contract: `safe-import-columns-contract.md`)*
      ⚠ **G-1 (grounding re-run, 2026-07-12).** The legacy "Required Columns" table does not merely *name* the rejected
      columns — it publishes **concrete example values**: `hour_rate: 25.50` and
      `currency: USD, GBP, EUR, EGP, AUD, CAD, AED` (`management-settings-security-data.md:261`). An author porting
      that table verbatim would import a **literal pay figure and seven currency tokens**, breaching the pay-free law
      *and* tripping `a31.currency === 0` (R2). **Copy the safe column NAMES only — never the legacy example-value
      column.** **Done**: `25.50` = 0 and `USD|GBP|EUR|EGP|AUD|CAD|AED` = 0 in the fixture, the locales and the body.
- [X] **T015** [US4] Add `BACKUP` (destination field definition `sec-backupTo`, **no authored value**) and keep
      `POLICIES` (2). Add the **2FA structure row** definition (label + purpose "OTP on login for admins & support").
      **`otp` is NOT rendered** (the legacy shared-OTP-phone-for-all-admins is a recorded anti-pattern).
      **Done**: backup destination has no value; 0 OTP control. *(contract: `security-import-backup-policy-contract.md`)*
- [X] **T016** [US2][US8] Grow `INTEGRATIONS` **7 → 11** providers with exact categories: incoming payment (Stripe,
      PayPal, Mollie, XPay, Payoneer, Paymob, Custom) · payout (Paymob Payout, Payoneer Payout) · messaging
      (WhatsApp) · email (Email/SMTP). Add the **closed three-state** status vocabulary — «غير مُعدّ» / "not
      configured" · «يتطلّب ربط الخادم» / "requires the server" · «غير متاح» / "unavailable" — using **only** the six
      existing chip tones (`live|upcoming|completed|cancelled|amber|neutral`; a 7th **throws at build**, R6).
      **Chip-token law**: no chip may contain «متصل» / `connected` **in any form**, not even "not connected".
      **Done**: 11 providers; **0** chip matching `/متصل|connected/i`. *(contract: `integrations-catalog-contract.md`)*
- [X] **T017** [US8] Add `PROVIDER_FIELDS` — per provider: safe `field()` controls (**21** total) + toggles (**8**) +
      the **24 sensitive structure rows** as `{labelKey, required, purposeKey}` — **never a `value` key**. Per-provider
      sensitive counts: Stripe 2 · PayPal 2 · Mollie 1 · XPay 3 · Payoneer 2 · Paymob 5 · Custom 0 · Paymob-Payout 4 ·
      Payoneer-Payout 3 · WhatsApp 0 · Email 2 = **24**. **Payoneer Payout "Program ID" is sensitive field #22 —
      structure row only, never a `field()`, never an input, never a value.** Semantic labels **only where the raw
      HTML proves meaning** (Stripe key1=Publishable/key2=Secret; PayPal Client ID/Secret; Paymob Integration ID
      "comma-separated when offering more than one"; Paymob `settings[api_key]` "optional, reconciliation only");
      **UNKNOWN where unproven** (XPay Community ID / Variable Amount ID). **Never** ship `key1..key4` as labels.
      **Done**: 24 structure rows, 0 with a `value`; grep for an authored secret/API-key/token/webhook **value** = 0.
      *(contract: `sensitive-provider-fields-contract.md`, `payment-methods-fold-contract.md`)*
- [X] **T018** [US2] Document (fixture comment only) the legacy WhatsApp 7-code enum (UNKNOWN/PAIRING/DISCONNECTED/
      CONNECTING/CONNECTED/IDLE/STOPPED) and the Laravel-Echo status stream as **never simulated**. **Done**:
      comment present; **0** websocket / `/broadcasting/auth` / polling code.
      ⚠ *Scope-guard note*: the comment contains the token `CONNECTED`. It lives in **source**, not the body — the
      fake-connected census is **chip-scoped** (**T083** / **T103**), so this is safe. Do **not** widen it to source.

### 2b — New notifications fixture

- [X] **T019** [US3] Create `app/src/js/fixtures/settings-notifications.js`: `NOTIF_GROUPS` — **9 event groups /
      47 controls / 28 distinct names**, and `CHANNEL_OPTS` — the 5-value channel enum **`0` Off · `1` As Profile ·
      `3` WhatsApp · `4` E-mail · `5` Private**. **Value `2` does not exist in legacy — never invent it.** Preserve the
      class-status asymmetry exactly: teacher's 9 (Waiting/Running/Cancel/Absent/**Teacher-Absent(6)**/Auto-Makeup/
      Reject/Cancel-request/Approve) vs family's 9 (same 8 but **End-class(5)** instead of Teacher-Absent). Place
      `teacher_send_manual_reminder` under **Teacher** (legacy has it in the family block — a naming bug; record it in
      a comment). Render `teacher_delay_reminder` ("Late 3 Minutes") **verbatim**; its trigger semantics stay
      **UNKNOWN** — invent no help text. The **`salaries` row is a routing-only channel select — 0 amount / rate /
      currency token.** **Done**: 47 controls, 28 distinct names, 9 groups, 5 channel values (no `2`), 0 pay figure.
      *(contract: `notification-matrix-contract.md`)*

### 2c — Mirrored locales (AR and EN are separate files → `[P]`, then parity-verified)

- [X] **T020** [P] [US7] Extend `app/src/locales/ar.adm.js`: `adm.set.gen.*` (identity + 17 automation labels/help) ·
      `adm.set.notif.*` (9 groups, 28 events, 5 channel labels) · `adm.set.cust.*` (2 brand + 11 status colours + 3
      appearance selects) · `adm.set.sec.*` (4 imports × columns, backup, 2 policies, 2FA) · `adm.set.integ.*`
      (11 providers + safe labels + 24 sensitive row labels/purposes). **Canonical preview note (binding):**
      «معاينة فقط — لا يُخزَّن أي تغيير قبل ربط الخادم.» **Never** «لا يتم الحفظ» — it contains «تم الحفظ» and would
      trip the fake-success census (R5). Keep `adm.set.users.*`, `adm.set.tab.*`, `adm.set.heads.*`, `adm.set.loc.*`
      and the Message-Builder gate keys unchanged. **Done**: no key removed; 0 raw key.
- [X] **T021** [P] [US7] Extend `app/src/locales/en.adm.js` — the **exact mirror** of T020. Canonical note:
      **"Preview only — nothing is stored until the server is connected."** **Never** "not saved" (contains `saved`).
      **Done**: mirrored.
- [X] **T022** [US7] Parity gate: the `adm.*` key-sets of `ar.adm.js` and `en.adm.js` are **identical** —
      divergence **0**. `src/js/i18n.js` **0-diff** (the `adm` pair is already registered at `i18n.js:24-25`).
      **Done**: divergence 0; `git diff --stat -- src/js/i18n.js` empty. Depends on T020, T021.
      *(contract: `fixtures-locales-contract.md`)*

### 2d — Shared page helpers + CSS

- [X] **T023** [US7] In `pages/settings.js` add the shared helpers used by all six panels — **using existing
      components only**: `structRow({labelKey, required, purposeKey})` (renders `.set-struct`, **no input, no value**),
      `accGroup({titleKey, bodyHTML})` (native `<details>`/`<summary>` — **zero JS, zero new hook**; precedent
      `add-family.js:51`), `previewNote()` (the canonical copy-law note), and `swatchRow()`. Booleans go through the
      **existing** `settingsSection({rows:[{control:{kind:'toggle'}}]})` path — **no new `field()` type, no new hook,
      `form-field.js` / `settings-section.js` / `preview-drawer.js` stay 0-diff**. **Done**: helpers exist; the three
      component files are byte-identical to `58a53e2`. *(contract: `no-fake-settings-contract.md` §1, plan §5.0)*
- [X] **T024** [P] Add **additive-only** CSS to `app/src/styles/app.css`: `.set-struct` (structure row),
      `.set-acc` / `.set-acc > summary` (the `<details>` disclosure inside `.set-section`), `.set-swatch` (promoted
      from the inline style in `settings.js`). **No token change, no new chip tone, no framework.** Precedent: `.cc-*`
      (034), `.finm-*` (038), `.cert-stage` (031). **Done**: `git diff` on `app.css` is purely additive.

**✅ CHECKPOINT 2** — every shared structure exists; build still green at **115**; **no panel rewritten yet**;
nav still shows 6 planned items (correct — the flips come at Phase 9).

---

## Phase 3 — General Settings completion (US1, US7) — *Priority P1*

*Writes `settings.js` — sequential.*

- [X] **T025** [US1] Rewrite `generalPanel()` › **Identity**: render the 10 `IDENTITY_FIELDS` as `field()`s in a
      `.wiz-grid` inline section (**not** a modal — 10 fields would be buried). **Done**: 10 `field()`s with visible
      `<label for>`; 0 field name matching `/pass|secret|api|key|token|webhook|card|cvv/i`.
- [X] **T026** [US1] Identity › **logo**: an honest **GATE** (`data-disabled-reason`) — **no `type=file`**, no local
      preview claiming persistence. **Done**: `input[type=file]` = 0 on the page.
- [X] **T027** [US1] Identity › gated **Save** (`data-disabled-reason`, backendRequired reason key). **Done**: 1 gate.
- [X] **T028** [US1] Render **Automation** — the 17 controls in 5 native `<details>` groups via `accGroup()`:
      5 select + 5 number + 7 toggle. Each toggle carries the **backendRequired** `data-toast` (**never**
      `set.savedToast`) and each group the visible **preview-only note**. ONE gated Save for the automation block.
      **Done**: 17 controls (5+5+7); 7 `data-toggle`; 1 gate; every `<details>` keyboard-reachable.
- [X] **T029** [US1] Keep **Locations** (4 display rows), **Expense heads** (4 rows) and the `head-add` drawer
      (2 `field()`s) unchanged. **Done**: `head-add` still emits ≥1 input + exactly 1 primary gate.
- [X] **T030** [US7] **General census gate**: `field()` = **22** (10 identity + 10 automation ² + 2 head-add),
      toggles = **7**, gates = **5**, structure rows = **0**. **Done**: all four exact.
      ² *10 = the 5 selects + 5 numbers; the 7 toggles are counted in the toggle column, not `field()`.*

### Pay-free exclusion (verification tasks — **no UI is built**)

- [X] **T031** [US1] **Do not build a teacher-pay Settings form.** Assert the **11** excluded legacy names appear
      **nowhere** — `settings_data[1]`, `hours-input`, `rate-input`, `settings_data[<hours>]`, `salary_period_type`,
      `salary_period_day`, `applayFins`, `fin[10]`, `fin[<minutes>]`, and **`rate_student_absent`** — in:
      `public/settings.html` + `.en.html`, `pages/settings.js`, `fixtures/settings-management.js`,
      `fixtures/settings-notifications.js`, `locales/ar.adm.js`, `locales/en.adm.js`, **including comments**
      (the scope-guard demands source-absolute zero). **Done**: **0** occurrences across all 6 files.
      *(contract: `pay-free-settings-exclusion-contract.md`)*
- [X] **T032** [US1] Render the honest **non-numeric** payroll pointer: payroll configuration requires the real
      accounting/payroll backend. **No figure, no rate, no currency, no salary amount.** **Done**: `a31.currency === 0`
      on `settings.html`; pay-token-adjacent-to-digit regex `(salary|payout|rate|fine)[^<]{0,24}[0-9]` = **0**.
      *(Honest words that must still PASS: the Notifications "Salary events" group title; the provider names
      "Paymob Payout" / "Payoneer Payout". Do not write a naive word-zero grep — R7 of `scope-guard.md` §3.3.)*
- [X] **T033** [US1] Relocate **2FA** to the Security tab as a **structure row + GATE** (T068); `otp` **not rendered**
      anywhere. **Done**: 0 OTP control (`name=`/`id=` scoped — the *word* "OTP" in purpose copy is lawful).

**✅ CHECKPOINT 3** — General is complete and independently testable: `settings.html#view=general` renders 22 fields,
7 toggles, 5 gates, 0 pay tokens. Build 115. **Nav still planned.**

---

## Phase 4 — Notification Settings matrix completion (US3, US7) — *Priority P2*

*Writes `settings.js` — sequential. Depends on T019.*

- [X] **T034** [US3] Rewrite `notificationsPanel()` to consume `NOTIF_GROUPS`. **Stop calling
      `settingsSection(SEC.notif)`** — the 2 legacy demo toggles are superseded (footnote ¹). `fixtures/settings.js`
      stays **0-diff**. **Done**: the old `NOTIF_MATRIX` 6-row chip list is gone; `SETTINGS` export untouched.
- [X] **T035** [US3] Render the matrix as **7 inline `settingsSection`s** (System · Course · Class · Reminders ·
      Invoices · Salary events · Family status) — **explicitly NOT a modal; the matrix IS the page**. Grouped, with a
      sticky event column on desktop and an accordion/card fallback at mobile-390.
      **Done**: 7 sections; **0 horizontal overflow** at 390px.
- [X] **T036** [US3] Render the **5 master/section toggles** (`system_notifications` on · `appnotifiy`
      **legacy-disabled → `mode:'disabled'` + honest reason** · `course_updates` on · `class_updates` on ·
      `class_reminder` on). **Done**: 5 toggles; `appnotifiy` disabled with a visible reason.
- [X] **T037** [US3] Render the **10 channel selects** (`teacher_course_updates`, `student_course_updates`,
      `teacher_class_updates_type`, `student_class_updates_type`, `teacher_reminder_type`, `student_reminder_type`,
      `invoice`, `invoice_reminder`, `salaries`, `family_status`) as inline `field(type:'select')` bound to
      `CHANNEL_OPTS`. **Done**: 10 selects × 5 options; **no option with value `2`**.
- [X] **T038** [US3] Render the **23 event checkboxes** as toggle rows — course: teacher 2 + family 3; class: teacher
      9 + family 9 — preserving the class-status asymmetry exactly. **Done**: 23 toggles; teacher set contains
      **Teacher-Absent(6)**, family set contains **End-class(5)**.
- [X] **T039** [US3] Render the **6 reminder toggles** + **3 numerics** (`hours_to_reminder_teacher`,
      `hours_to_reminder_student`, `invoice_reminder_days`). **Done**: 6 toggles + 3 `field(type:'number')`.
- [X] **T040** [US3] Add the **integration-dependency copy**: choosing WhatsApp or E-mail for an event is inert until
      that provider is connected — state it, and **never imply the channel is live**. **Done**: dependency copy present
      on every channel select group; **0 fake delivery claim**.
- [X] **T041** [US3][US9] Add **ONE gated Save per section** (7) + the **preview-only note** in every toggle-bearing
      section. Every toggle's `data-toast` is the **backendRequired** wording. **Forbidden in any toast/note/label**:
      `saved` · «تم الحفظ» · «بنجاح» · `successfully` · `done`. **Done**: 7 gates; 0 forbidden token; 0 `set.savedToast`.
- [X] **T042** [US3][US7] **Notifications census gate**: `field()` = **13** (10 select + 3 number), toggles = **34**
      (5 + 23 + 6), gates = **7**, controls **47** = 13 + 34, distinct names **28**, groups **9**. `salaries` is a
      routing-only select with **0** amount/rate/currency token. **Done**: all exact; 0 omitted, 0 invented.
      *(contract: `notification-matrix-contract.md`)*

**✅ CHECKPOINT 4** — the full 47-control matrix is live and honest at `#view=notifications`; no toggle persists;
no channel claims delivery. Build 115. **Nav still planned.**

---

## Phase 5 — Customisation Settings completion (US5) — *Priority P2*

*Writes `settings.js` — sequential. Depends on T013.*

- [X] **T043** [US5] Rewrite `customizationPanel()` › **Global appearance**: keep `settingsSection(SEC.appearance)` so
      **theme (light/dark/system) and language stay REAL** (existing `data-set-theme` / `data-set-lang`,
      `academy.theme` / `academy.lang`). Label them explicitly as a **personal preference**, not an academy-wide
      saved setting. **Done**: `a31.themeCtl >= 1` still passes; theme/lang still apply immediately.
- [X] **T044** [US5] Render the **3 appearance selects** — `cust-layout`, `cust-sidebar`, **`cust-surface`**.
      **Input-naming law: no `name`/`id` may contain `card`** (the legacy `card_style` would fail `smoke:1174`
      `credInputs`, R1). **Done**: 3 selects; grep for a field name containing `card` = **0**.
- [X] **T045** [US5] Render **2 brand colours + 11 class-status colours** as swatch + **hex text `field()`** rows
      (13 swatches, **6 distinct hexes**). **Done**: 13 rows; 16 `field()` total for the tab.
- [X] **T046** [US5][US9] Add the **gated academy-wide Save** and a **direct gated Reset**
      (`data-disabled-reason` — **no `data-confirm`**; Spec 040 adds **zero** confirm chains). Add the contrast /
      accessibility warning state for unsafe colour combinations. **Done**: 2 gates + the Message-Builder gate = **3**;
      `data-confirm` added by Spec 040 = **0**.
- [X] **T047** [US5] **Not rebuilt, each with its recorded reason**: "Pick from logo" ×2 (legacy uses `<canvas>` +
      `getImageData` — **canvas forbidden**; and its source logo 404s, so it is provably non-functional in legacy) ·
      "Apply for me" / "Reset" (legacy writes **4 new localStorage keys** `theme`/`boxedLayout`/`sidebarType`/
      `cardBorder` — **forbidden**) · the **Message Builder UI** (only evidence is HTTP 504 — **never invented**; the
      existing Spec-031 gate `adm.set.cust.msgBuilder` stays **unchanged**). **Done**: `<canvas>` = 0; new storage
      keys = 0; no Message-Builder UI. *(owner: **Spec 053**; placement review: **Spec 048**)*
- [X] **T048** [US5] **Customization census gate**: `field()` = **16**, toggles = **0**, gates = **3**, distinct hexes
      = **6**, status colours = **11**, total distinct legacy fields honoured = **17** (16 `field()` + 1 real theme).
      **Done**: all exact. *(contract: `customisation-contract.md`)*

**✅ CHECKPOINT 5** — Customisation is honest: theme/lang genuinely apply; everything else previews and gates.
Build 115. **Nav still planned.**

---

## Phase 6 — Security Settings completion (US4, US9) — *Priority P2*

*Writes `settings.js` — sequential. Depends on T014, T015.*

- [X] **T049** [US4] Rewrite `securityPanel()` › **4 import cards**, each correctly named: **Teachers · Families ·
      Children · Invoices** (card 4 is mislabelled "Upload families" in legacy — raw HTML `type=4` + `invoices_file`
      proves Invoices; **use the functional name**). **Done**: 4 cards, correct names.
- [X] **T050** [US4] Each card renders its **required-columns contract** inside a native `<details>` disclosure as
      **structure rows**: 8 / 12 / 7 / 6 = **33**. **Done**: 33 structure rows.
- [X] **T051** [US4][US8] **Rejected columns absent**: `password`, `hour_rate`, `currency` appear **nowhere** in the
      body, the fixture, or the locales. **Done**: 0 occurrences. *(contract: `safe-import-columns-contract.md`)*
- [X] **T052** [US4][US9] **Upload = GATE** on all 4 cards (`data-disabled-reason`). **No `type=file`.**
      **Done**: 4 gates; `input[type=file]` = 0.
- [X] **T053** [US4] **Template download = gated `<button>` on cards 1–3 only**; **card 4 has no download control**
      (legacy has none). The control is a **`<button>` gate — never `<a download=…>`**; the *word* "download" in a
      label is safe, the **attribute** is not (R3). **Done**: 3 download gates; `download=` attribute = 0;
      `window.open` / `blob:` / `.pdf` = 0.
- [X] **T054** [US4] **Backup**: 1 real `field(text)` destination (`sec-backupTo`, **no authored value**) + gated
      "Save destination" + gated "Send backup now". Legacy fired a **real DB backup from a bare `<a>` with no
      confirmation, then redirected to SMTP** — **not reproduced**: no real backup, no fake success, **no redirect**,
      and **no `data-confirm`** (§Presentation: zero confirms added). The four facts an admin needs — **scope ·
      destination · permission · audit** — are carried as **standing visible copy beside the gate**. **Done**: 1
      `field()`, 2 gates, standing copy present, 0 confirm, 0 redirect, 0 fake history/last-run data.
- [X] **T055** [US4] **Policies**: 2 independently displayed authored bodies (family + teacher) + a **separate gated
      Edit for each**. **No Quill, no `contenteditable`, no textarea policy editor, no new dependency.** The 2
      unlabelled legacy selects (U-6) are **not reproduced**. **Done**: 2 bodies, 2 gates, 0 rich-text engine.
- [X] **T056** [US4] **2FA**: structure row + GATE (relocated from General, T033). `otp` **not rendered**.
      **Done**: 1 structure row + 1 gate; 0 OTP control.
- [X] **T057** [US4][US7] **Security census gate**: `field()` = **1**, toggles = **0**, structure rows = **34**
      (33 columns + 2FA), gates = **12** (4 upload + 3 template + 2 backup + 2 policy + 1 2FA). **Done**: all exact.
      *(contract: `security-import-backup-policy-contract.md`)*

**✅ CHECKPOINT 6** — every destructive/expensive Security action is a direct honest gate; no file input, no fake
import, no fake backup, no confirm theatre. Build 115. **Nav still planned.**

---

## Phase 7 — Integrations & Payment Methods completion (US2, US8) — *Priority P1*

*Writes `settings.js` — sequential. Depends on T016, T017. **The highest-risk phase — Opus.***

- [X] **T058** [US2] Rewrite `integrationsPanel()` › **11 provider cards** in the existing `.card` grid, each with
      name, category, description, and an honest chip from the **closed three-state vocabulary**.
      **No chip may contain «متصل» / `connected` in any form** — not even "not connected" (the census is chip-scoped
      and token-absolute, R5b). **Done**: 11 cards; **0** chip matching `/متصل|connected/i`; **0** fake "Connected".
- [X] **T059** [US2][US8] Build the **11 `formDrawer('integ-<id>')` Configure drawers** — ids exactly:
      `integ-stripe` · `integ-paypal` · `integ-mollie` · `integ-xpay` · `integ-payoneer` · `integ-paymob` ·
      `integ-custom` · `integ-paymob-payout` · `integ-payoneer-payout` · `integ-whatsapp` · `integ-email`.
      Each drawer MUST have: **≥1** safe `input/select/textarea` · **≥1** `data-disabled-reason` · **≤1**
      `.btn-primary[data-disabled-reason]` primary final · **0** input whose name/id matches
      `/pass|secret|api[-_]?key|token|webhook|otp|salary|hour[-_]?rate|fine|payout|iban|cvv/i` · **0** `<canvas>`.
      *(Note: the payout drawer ids contain `payout` in the **drawer id**, which is not an input name — the MUST-OMIT
      regex is scoped to inputs. Their mode/enable **control names** must be `integ-pmb-out-mode` /
      `integ-pyn-out-mode` — a control name may not contain `payout`.)*
      **Done**: 11 drawers, each satisfying all five conditions. **Never a small modal** — the drawer is the sanctioned
      long-form host. *(contract: `modal-long-form-presentation-contract.md`)*
- [X] **T060** [US8] Render the **24 sensitive fields as structure-only rows** (`structRow()`): safe label + required
      indicator + purpose + "configured securely on the server". **Never an input. Never a value.**
      **Done**: 24 structure rows; `type=password` = **0**; `type=file` = **0**; `credInputs` = **0**; authored
      secret/API-key/client-secret/HMAC/SMTP-password/OAuth-token/webhook-secret **value** = **0**.
      *(contract: `sensitive-provider-fields-contract.md`)*
- [X] **T061** [US8] **Payoneer Payout "Program ID" (sensitive #22)** is a **structure row** — never a `field()`,
      never an input, never a value. The Payoneer-Payout drawer therefore has **1** safe field (`integ-pyn-out-mode`),
      not 2. **Done**: verified; Integrations `field()` column sums to **21**.
- [X] **T062** [US2] **Payment-methods fold**: the 7 create variants (PayPal, Stripe, Custom, XPay, Mollie, Payoneer,
      Paymob) **are** the 7 incoming providers' Configure drawers — **no separate surface, no new page, no nav item,
      no chooser page** (U-2: the chooser was never captured; the provider catalogue *is* the chooser). The 8th
      capture (edit, id=1) is **structurally identical** to create variant 3 — **not a separate surface**. The stored-
      methods list renders an **honest empty state** ("no payment method configured — available once the server is
      connected"): **0 authored instances**, so nothing to edit and **no `Number Of Family` count fabricated**.
      **Done**: 0 new page/nav item; honest empty state; 0 authored payment-method instance.
      *(contract: `payment-methods-fold-contract.md`)*
      ⚠ **G-2 (grounding re-run).** The legacy **edit** capture is prefilled with **real PII** — an individual's full
      name «أحمد محمد» paired with the unmasked phone `01015264856`, the same pair printed raw in the Custom
      provider's catalog table. **Never port any prefilled value from the edit variant.** The empty-state design
      already forecloses this; the task is to keep it that way. **Done**: `01015264856` = 0 and «أحمد محمد» = 0
      across fixtures, locales and the built body.
- [X] **T063** [US2][US9] **WhatsApp**: pairing + QR = **GATE**. **No `<canvas>`, no QR renderer, no invented wizard**
      (U-3). "Wake connection" / "Test send" / "Logout" = gates. **The two WhatsApp *insights* pages are EXCLUDED
      entirely** — they leak a live joinable `chat.whatsapp.com` invite URL, unmasked phones/emails, and egress real
      names to `ui-avatars.com` (**owner: Spec 043**). The legacy WhatsApp card copy mentioning "salary reports" is
      **not reproduced** (pay-free law). **Done**: 0 canvas, 0 QR, 0 insights page, 0 invite URL, 0 unmasked phone.
- [X] **T064** [US2][US9] **Email/SMTP**: safe fields (`email_address`, `smtp_host`, `smtp_port` number,
      `smtp_encryption` select None/SSL/TLS, is_active + is_default toggles); **SMTP Username + SMTP Password = 2
      structure rows**. "Test SMTP" = **GATE** — **no fake test-connection result**. "Add Account" management is
      **UNKNOWN** (U-4) — not invented. **Done**: 0 `type=password`; test = gate.
- [X] **T065** [US2][US9] Every integration final — **Connect · Disconnect · Test connection · Save configuration ·
      Pair · Enable · Create/Edit/Activate/Delete a payment method** — is a `data-disabled-reason` **gate**.
      The card-level `is_enabled` toggle (legacy POSTs a real toggle) moves **inside the drawer** as a preview toggle
      + gated Save — **no fake enable on the card**. **Done**: **0** real gateway call, **0** fake activation, **0**
      fake test payment, **0** checkout, **0** webhook success, **0** payment mutation, **0** API/websocket, **0** secret.
      ⚠ **G-3 (grounding re-run).** In legacy, **all 11** provider cards render `is_enabled` **already ON (blue)**
      while every provider shows "No data found" — enabled with **nothing configured**. That is a second
      default-state defect alongside the documented PayPal-defaults-to-Live one. **Both are refused**: our authored
      state is «غير مُعدّ» / "not configured" for every provider, and no card carries an enable control at all.
      **Done**: 0 card-level enable toggle; 0 provider authored as enabled/active.
- [X] **T066** [US2][US7] **Integrations census gate**: `field()` = **21**, toggles = **8**, structure rows = **26**
      (24 sensitive + 2 webhook-URL), gates ≈ **24**, providers = **11**, drawers = **11**. **Done**: all exact.
      *(contract: `integrations-catalog-contract.md`)*

**✅ CHECKPOINT 7** — 11 providers with real configuration *shape* and **not one secret in existence**. Build 115.
**Nav still planned.**

---

## Phase 8 — Settings Users destination verification (US6) — *Priority P3*

**No code is written in this phase.** `settingsUsers` is a **deep-link only**; its target already exists.

- [X] **T067** [US6] Verify `usersPanel()` (`settings.js:116-123`) is **unchanged**: a real
      `<a href="staff.html">` + `rolesSection()` read-only RBAC preview. **Done**: **0 forms · 0 drawers · 0 mutation
      controls · 0 `field()`** in the Users tab.
- [X] **T068** [US6] Verify **no user CRUD is duplicated** and no parallel permission engine is invented:
      `src/js/pages/staff.js`, `src/js/fixtures/staff-management.js` and `src/js/fixtures/settings.js` are all
      **0-diff** vs `58a53e2`. `settings.js` does **not** import `staff-management.js`. **Done**: 3 files byte-identical;
      0 import. *(contract: `settings-users-destination-contract.md`)*
- [X] **T069** [US6] Confirm `staff.html` remains **the one staff-management home** (directory · `staffMenu` kebab ·
      `permDrawer()` RBAC matrix · 3 staff form drawers). **Done**: verified; the Users tab links to it and duplicates
      none of it. **Only `nav.config.js:115` changes for `settingsUsers`** (T070).

**✅ CHECKPOINT 8** — `#view=users` is an honest pointer, not a second staff app.

---

## Phase 9 — The six navigation unlocks & the zero-planned milestone (US10) — *Priority P1*

**Gate: do NOT start this phase until Checkpoints 3–8 are all green.** Flipping a nav item whose target form is
still incomplete is the one failure mode this ordering exists to prevent.

- [X] **T070** [US10] `app/src/js/nav.config.js` lines **110–115** — the **single** navigation-source edit. For each
      of the six: add `route`, remove `status:'planned'`. Exactly:
      `settingsGeneral` → `settings.html#view=general` · `settingsIntegrations` → `settings.html#view=integrations` ·
      `settingsCustomization` → `settings.html#view=customization` · `settingsNotifications` →
      `settings.html#view=notifications` · `settingsSecurity` → `settings.html#view=security` · `settingsUsers` →
      `settings.html#view=users`.
      **Spelling is binding**: nav id `settingsCustomiz**ation**` → tab id **`customization`** (US spelling).
      **Never** the legacy UK `customisation` in the hash — it yields a dead deep-link the tab machinery silently
      ignores. Routes are written **without** `.en`; the hash-aware `langRoute()` (Spec 035) inserts it →
      **`components/sidebar.js` stays 0-diff.**
      **Do not modify any other nav item.** `FUTURE_ROUTES` stays `{}`. `classSalaryReport` (`:90`) untouched.
      **Done**: the `implemented ⇒ route` build guard (`nav.config.js:151-157`) passes.
- [X] **T071** [US10] Rebuild and verify the **six real anchors** on every admin page, AR **and** EN:
      `a.nav-item[href$="settings.html#view=<tab>"]` / `settings.en.html#view=<tab>`. **Done**: 6 anchors × 2 langs;
      **0** `.is-planned`, **0** `[data-coming-soon]`, **0** `aria-disabled`, **0** lock icon among them.
- [X] **T072** [US10] **Zero-planned milestone**: sitewide `.nav-item.is-planned` = **0** · `[data-coming-soon]` = **0** ·
      categories bearing a planned item = **0**. **Done**: all three zero across all 115 pages.
- [X] **T073** [US10] **Invariants held**: Settings items **7**, implemented **7**, planned **0**; admin menu **50**;
      public HTML **115**; `PAGES` **57**; disabled locks **1**; `FUTURE_ROUTES` `{}`; `classSalaryReport` still
      `disabled` + `nav.reason.finance` + lock + **no route**. **Done**: all eight exact; any deviation ⇒ STOP.
      *(contracts: `settings-nav-completion-contract.md`, `page-count-route-contract.md`)*

**✅ CHECKPOINT 9** — **the last «قريبًا» in the product is gone.** Every nav item is now either a real link or the
one honest `classSalaryReport` lock.

---

## Phase 10 — Protected smoke supersessions & additive coverage (US10)

*Writes `tests/smoke/run.cjs` — strictly sequential, Opus. **Exactly 2 supersessions + 2 strengthenings.**
Anything else changed in `app/tests/` is a STOP.*

### Supersession S1 — `settingsPlanned === 6 → === 0` (a strengthening)

- [X] **T074** [US10] `smoke:1446` — `ok(nav039.settingsPlanned === 6, …'should keep 6 planned «قريبًا» items (owner
      Spec 040)'…)` → **`=== 0`** with the message "settings must have 0 planned «قريبًا» items after Spec 040 (six
      real deep-links)". **Done**: value + message updated; the supporting reads at `:1436`, `:1439` are
      **byte-verbatim**.
- [X] **T075** [US10] `smoke:2340` — `ok(nav.settingsPlanned === 6, …'must keep 6 planned items (owner Spec 040)'…)`
      → **`=== 0`**. **Done**: updated; `:2326`, `:2331` **byte-verbatim**.
      *(Treat the live source, not these line numbers, as authoritative if they have moved.)*

### Supersession S2 — retire the `.nav-item.is-planned` click probe

- [X] **T076** [US10] `smoke:223-230` (inside `if (page === 'dashboard')`) — the probe clicks
      `.cat-panel:not([hidden]) .nav-item.is-planned` and asserts its toast. Settings was the **last** planned-bearing
      category, so after T070 **there is no honest specimen left to click**. **Retire the probe in place**, replacing
      its body with a **sitewide zero-census**: `planned === 0 && comingSoon === 0`.
      Record in the code comment: the retirement, the replacement coverages (T077, T080, T081), and the precedent —
      `components/portal-shell.js:30` has rendered an `is-planned` branch with **zero instances since Spec 025**, and
      the suite already expresses that as an honest vacuous assert (`plannedNavAnchors === 0`).
      **Forbidden**: keeping a fake planned item · creating a fake route · pointing the probe at `classSalaryReport` ·
      merging disabled-lock and planned-item semantics · deleting dead-nav coverage · **deleting the coming-soon
      rendering branch from production code** (`sidebar.js:33` and the `enhance.js` handler are **retained but
      unexercised** — zero-deletion law). **Done**: probe retired; comment records all four points.
- [X] **T077** [US10] Keep `smoke:231-240` — the **is-disabled reason-toast probe** — **byte-verbatim**. It is still
      exercised by `classSalaryReport`. A disabled honest lock is **not** a planned item and its coverage stays
      categorically separate. **Done**: byte-identical.

### Sanctioned strengthenings

- [X] **T078** [US10] `smoke:1196` — `ok(a31.gates >= 4, …)` → **`ok(a31.gates >= 20, …)`**.
      **Known caveat (recorded, not hidden)**: the pre-040 body already renders **23** gates, so the 20-floor sits
      *below* today's value and is **not load-bearing**. Real coverage is T081's exact censuses. Keep **20** (the
      ledger-fixed value; STOP-8 forbids un-declared assert edits); tightening to `>= 40` is a further strengthening
      requiring a declared amendment. **Done**: value 20.
- [X] **T079** [US10] `smoke:92` — `FORM_DRAWERS_032.settings: ['head-add']` → the exact **12**-id list:
      `['head-add', 'integ-stripe', 'integ-paypal', 'integ-mollie', 'integ-xpay', 'integ-payoneer', 'integ-paymob',
      'integ-custom', 'integ-paymob-payout', 'integ-payoneer-payout', 'integ-whatsapp', 'integ-email']`.
      **This closes a register omission**: an unregistered drawer **silently escapes** the fieldless / noGate /
      multiPrimary / MUST-OMIT / canvas audit (R4). **Done**: 12 ids; all 12 pass the existing drawer audit.

### Additive coverage (new, non-superseding)

- [X] **T080** [US10] Add **six anchor asserts + a planned/coming-soon census** to the existing `nav039` block near
      `:1443-1446`, **reusing `anchorOk039` (defined at `:1442`) unchanged**, with per-item regexes
      `(^|/)settings\.(en\.)?html#view=<tab>$`. **Done**: 6 asserts × AR/EN; `plannedTotal === 0 && comingSoon === 0`.
- [X] **T081** [US10][US7] Add the **Spec-040 census block**: `fields === 73` · `toggles === 49` · `struct === 60` ·
      per-tab breakdown (22/13/16/1/0/21) · `type=password` **0** · `type=file` **0** · `credInputs` **0** ·
      `<canvas>` **0** · authored secret value **0** · `a31.currency === 0` · pay-token-adjacent-to-digit **0** ·
      the 11 excluded pay names **0** · **0 external requests**. **Done**: block added and green.
- [X] **T082** [US10][US9] Add the **fake-success body census** rejecting: «تم الحفظ» · `\bsaved\b` · «بنجاح» ·
      `successfully` · «تم الربط» · `done` — over body **and template** text.
      ⚠ **Copy-law dependency**: the canonical preview note must read «لا يُخزَّن أي تغيير…» / "nothing is stored…".
      The naive «لا يتم الحفظ» / "not saved" would **match this very census** («يتم الحفظ» contains «تم الحفظ»;
      "not saved" contains `saved`) and **red an honest build** (R5). **Done**: census green against the canonical copy.
- [X] **T083** [US10][US9] Add the **fake-connected census — CHIP-SCOPED**: `0` elements matching `/متصل|connected/i`
      **inside a status chip**. **Do NOT write a body-wide `/connected/i` rejection** — the honest backendRequired
      sentence *"available once the server is connected"* legitimately contains the word and would fail on every page
      (R5b). **Done**: chip-scoped census green; body-wide variant **not** present.
- [X] **T084** [US10] Add the **source-level `nav.config` audit** inside the existing post-`browser.close()` block
      (`:2347-2363`, where `byId` is already defined): the six exact `implemented` + `route` pairs · `planned` count
      **0** · `disabled` count **1** (`classSalaryReport`) · `FUTURE_ROUTES` **`{}`** · admin menu **50**.
      This is the one requirement the DOM-only tests cannot reach (Spec-039 precedent). **Done**: audit green.
- [X] **T085** [US10] Add the **six fresh-context deep-link tests** (Spec-039 pattern): seed
      `localStorage['academy.schedView.settings']` to a **different** tab, then load `settings(.en).html#view=<tab>` and
      assert **exactly ONE visible `[role=tabpanel]`** = the target, and **0 external requests**. AR + EN × 6 = **12
      executions**. **Done**: 12 green — this proves the **hash overrides the seeded opposite stored tab**.
- [X] **T086** [US10] **Mutation / discrimination proof** (required, not optional): temporarily (a) revert one nav flip
      → the corresponding anchor assert **and** the zero-planned census must **FAIL**; (b) point one deep-link at the
      legacy UK `#view=customisation` → its deep-link test must **FAIL**; (c) restore. Record both failures.
      **Done**: both mutations caught; tree restored to the green state.
- [X] **T087** [US10] **Byte-verbatim audit** of everything else in `run.cjs`: `clickFeedback` (`:206-215`) · the four
      dashboard feedback selectors (`:216-222`) · the is-disabled probe (`:231-240`) · the category-switch probe
      (`:241-251`) · `truth010` (`:1696-1706` — `badPlanned` becomes **vacuously true** ⇒ **preserved, not
      superseded**) · `deadNav` (`:137-139`, `:172`) · link-integrity (`:1691-1693`) · `navCount32 === 50` (`:1300`) ·
      `adminMenu === 50` (`:2270`, `:2341`) · route-freeze **115** (`:2388-2396`) · the settings tab-ids (`:1194`) ·
      the Spec-031 honesty asserts (`:1172-1176`) · the `g32` MUST-GATE freeze (`:1288-1297`) · every finance-lock
      assert · `payHit` / `tchPay` / `famPay` / `payFigure` / child-view / FAKE / raw-key / external-request guards ·
      **every unrelated Spec 031–039 assertion**. **Done**: `git diff` on `run.cjs` touches **only** T074–T085.
- [X] **T088** [US10] Run the full smoke suite. **Done**: **PASS**; 114 page loads green.

**✅ CHECKPOINT 10** — the truth contract is strictly stronger than before, and exactly two supersessions +
two strengthenings are on the diff.

---

## Phase 11 — Accessibility & screenshot coverage

- [X] **T089** [P] Add a11y rows to `tests/a11y/run.cjs` for the **six** settings views —
      `#view=general` · `#view=notifications` · `#view=customization` (**zero coverage today**) · `#view=security` ·
      `#view=users` · `#view=integrations` — each × **AR/EN** × **light/dark**. **Done**: rows added.
- [X] **T090** Add **mobile-390** rows for the 47-row notifications matrix and the 11-card integrations grid.
      **Done**: **0 horizontal overflow** at 390px.
- [X] **T091** Add **≥3 open-drawer rows** (`integ-paymob`, `integ-email`, `head-add`): focus trap · `role="dialog"` ·
      every field labelled · Escape closes · no nested dialog. Add the **roving-tabindex keyboard row**
      (ArrowRight/ArrowLeft across the 6 tabs) and confirm the `<details>` disclosures (automation groups, import
      column contracts) are keyboard-reachable and correctly announced. **Done**: rows green.
- [X] **T092** Run a11y. **Done**: **critical = 0, serious = 0** across every new row.
- [X] **T093** **Re-baseline `capture.cjs:62`** — `dashboard__ar__light__desktop__cat-settings.png` currently shows
      **six «قريبًا» buttons** and now shows **six links**. This is an **expected, required** re-baseline, not a
      regression (R8). **Done**: frame re-captured.
- [X] **T094** Add the `sp040-*` frames: the six tabs × AR/EN (light) · dark for notifications + integrations ·
      mobile-390 for notifications + integrations · **3 open provider drawers** (Paymob showing **structure rows, no
      inputs**; WhatsApp showing the **pairing GATE**; Email/SMTP showing its **2 sensitive structure rows**) · a
      security import card with its `<details>` open · Security backup · Security policies · the Users destination ·
      and the admin sidebar rendering all six settings items as **real links** (the zero-«قريبًا» proof).
      Use a **documented representative matrix** — no uncontrolled combinatorial explosion.
      **Done**: frames captured; **0 console errors** across the whole run.
- [X] **T095** [P] Update `app/screenshots/REVIEW.md`: the new frames, the `cat-settings` re-baseline, and the record
      that `sidebar.js:33` (`is-planned` + `data-coming-soon`) and the `enhance.js` coming-soon branch are now
      **intentionally unexercised-but-retained** (zero-deletion law), mirroring `portal-shell.js:30` since Spec 025.
      **Done**: REVIEW.md updated.

**✅ CHECKPOINT 11** — a11y critical=0 serious=0; every domain and high-risk state has a frame; 0 console errors.

---

## Phase 12 — Impact protection, guards, docs & final audit

### Impact proof (non-destructive)

- [X] **T096** Rebuild and re-extract the normalized `#page-body` md5 for all 115 pages; compare against the T007
      snapshot. **No stash / reset / checkout-discard / clean / branch-switch — ever.**
      **Expected exactly**: `settings.html` + `settings.en.html` **differ** (the 2 allowed body changes) · the other
      **62 admin** pages have **identical** `#page-body` md5 · the **51 non-admin** files (16 portals + portal
      internals + `index.html`) are **byte-identical whole-file** · total **115**.
      **Done**: 2 + 62 + 51 = 115. **Never claim "all bodies byte-identical" — Spec 040 rewrites the settings body.**
      *(contract: `impact-protection-contract.md` §4)*
- [X] **T097** **Sidebar block diff**: in the 62 sidebar-only admin pages, prove the **only** delta is the six settings
      rows changing from `<button class="nav-item is-planned" data-coming-soon …>` → `<a class="nav-item"
      href="settings(.en).html#view=…">`. **Done**: only those 6 rows differ; no other sidebar row moved.
- [X] **T098** **Source diff gate**: `git diff --stat` shows **exactly** the 7 app files + 3 test files + docs.
      **Done**: nothing else on the diff.
- [X] **T099** **0-diff wall**: re-hash the 13 forbidden files from T008 — `package.json` · `build-html.mjs` ·
      `enhance.js` · `i18n.js` · `tabs.js` · `sidebar.js` · `form-field.js` · `settings-section.js` ·
      `preview-drawer.js` · `ui.js` · `fixtures/settings.js` · `staff.js` · `staff-management.js` — plus every portal
      source, every unrelated admin builder/fixture/locale, and every unrelated spec. **Done**: all identical to T008;
      any diff ⇒ **STOP**.

### Guards & audits (Opus)

- [X] **T100** **No-secret audit**: `type=password` **0** · `type=file` **0** · `credInputs` **0** · authored
      secret / API-key / client-secret / HMAC / SMTP-password / OAuth-token / webhook-secret **value** **0** ·
      `<canvas>` **0** · `draggable` **0** · `download=` / `window.open` / `blob:` / `createObjectURL` / `.pdf` **0**.
      **Done**: all zero.
- [X] **T101** **Pay-free audit**: `a31.currency === 0` on the settings body · pay-token-adjacent-to-digit
      `(salary|payout|rate|fine|hour[-_]?rate)[^<]{0,24}[0-9]` = **0** · the **11 excluded legacy pay names** = **0**
      in body, source **and comments**. **Must still PASS as lawful**: the "Salary events" notification group title and
      the provider names "Paymob Payout" / "Payoneer Payout" (no figures shown). **Do not ship a naive word-zero grep.**
      **Done**: figure-scoped greens; honest labels intact.
- [X] **T102** **Fake-success audit**: the real shipped guard (`run.cjs:189`,
      `/\(تجريبي\)|\(demo\)|إجراء تجريبي|preview action|بنجاح|\bsuccessfully\b/i` over the **attributes**
      `data-toast` / `data-confirm-toast` / `data-confirm-msg`) is green, **plus** the additive body/template census
      (T082). **Done**: both green; `set.savedToast` unused on the settings body.
- [X] **T103** **Fake-connected audit — chip-scoped** (T083). **Done**: 0 chip matching `/متصل|connected/i`; the
      body-wide variant is confirmed **absent** from the suite.
- [X] **T104** **Drawer-register completeness**: all **12** `FORM_DRAWERS_032.settings` ids resolve to a baked
      `<template data-preview>`; each has ≥1 input, ≥1 gate, ≤1 primary gate, 0 MUST-OMIT-named input, 0 canvas.
      **Done**: 12/12. Any unregistered drawer ⇒ **STOP**.
- [X] **T105** **Locale parity + raw-key scan**: `adm.*` AR/EN divergence **0**; **0** raw locale key rendered in any
      of the 115 pages. **Done**: both zero.
- [X] **T106** **Route / link integrity**: `href="#"` **0** sitewide · `deadHash` **0** · `badTarget` **0** ·
      `plannedNavAnchors` **0** · every one of the six routes resolves to a real file + a real tab id.
      **Done**: all zero. *(the `#view=` fragment is stripped before the `VALID_FILES` lookup at `smoke:1684` — safe)*
- [X] **T107** **Count/menu/planned final census**: pages **115** · `PAGES` **57** · menu **50** · settings items **7** ·
      settings planned **0** · sitewide planned **0** · `[data-coming-soon]` **0** · disabled locks **1** ·
      `FUTURE_ROUTES` `{}`. **Done**: all nine exact.
- [X] **T108** **Allowed-file audit**: every changed file is on the Phase-0 allowlist. **Done**: no silent widening.
- [X] **T109** **Clean-code guard (Opus)**: `settings.js` is readable and idiomatic — helpers factored (T023), no dead
      code, no duplicated panel logic, comments state constraints (not narration), naming matches the house style.
      **Done**: reviewed and green.
- [X] **T110** **Test-guard (Opus)**: re-read the full `run.cjs` diff. **Exactly** 2 supersessions (T074–T077) +
      2 strengthenings (T078–T079) + the additive block (T080–T085). **Zero** other protected assert touched; **zero**
      coverage deleted. **Done**: confirmed against `protected-test-supersession-contract.md`.
- [X] **T111** **Final regression review (Opus)**: full smoke + a11y + screenshots green; every one of the 10 STOP
      conditions clear; every binding number in this file re-verified against the built output. **Done**: green.

### Docs & handoff

- [X] **T112** [P] Update `app/README.md` (the Settings hub is now six complete deep-linked domains; the honesty laws
      it upholds). **Done**: updated.
- [X] **T113** [P] Update repo `CLAUDE.md` — active feature, the final numbers, and the recorded
      **`4cbcb31` → `58a53e2`** baseline-drift correction. **Done**: updated.
- [X] **T114** Write `specs/040-settings-deep-links-subpages/implementation-status.md`: what shipped, the final
      censuses, the two supersessions + two strengthenings, the resolved evidence conflicts (24 sensitive fields not
      17 · 6 hexes not 7 · 27+1 rendered not 28 · `data-toggle` 2→49 not 0→49), the 7 standing UNKNOWNs
      (U-1 message-builder 504 · U-2 payment chooser · U-3 WhatsApp QR · U-4 SMTP add-account · U-5 the 2 policy
      selects · U-6 legacy RTL · U-7 `teacher_delay_reminder` semantics), and the handoffs (**053** integrations /
      message-builder / payments · **043** privacy + WhatsApp-insights PII + RBAC enforcement · **044** interaction
      system · **048** settings re-review · **055** propagation · **056** product-wide form audit · **057** freeze ·
      payroll backend for the 11 pay fields + `classSalaryReport`). **Done**: written.
- [X] **T115** **No commit / no push — the watcher commits.** **Done**: `git log -1` still shows the pre-implementation
      HEAD; the tree carries the Spec-040 changes uncommitted.

**✅ CHECKPOINT 12 — SPEC 040 COMPLETE.**

---

## Dependencies & implementation order

```
Phase 1 (T001–T010)  preflight/baseline/grounding   — no app change
        ↓
Phase 2 (T011–T024)  fixtures → notif fixture → locales → helpers → CSS
        ↓            (T011–T018 settings-management · T019 new file · T020/T021 [P] locales
                      · T022 parity · T023 settings.js helpers · T024 [P] css)
        ↓
Phase 3 (T025–T033)  General        ─┐
Phase 4 (T034–T042)  Notifications   │  ALL SEQUENTIAL —
Phase 5 (T043–T048)  Customisation   │  every domain phase writes settings.js
Phase 6 (T049–T057)  Security        │  (strict single-writer)
Phase 7 (T058–T066)  Integrations   ─┘
Phase 8 (T067–T069)  Users — verification only, 0 code
        ↓
Phase 9 (T070–T073)  NAV FLIPS  ← gated on Checkpoints 3–8 ALL green
        ↓            (never flip a nav item whose target form is incomplete)
Phase 10 (T074–T088) smoke supersessions + additive coverage
        ↓
Phase 11 (T089–T095) a11y + screenshots
        ↓
Phase 12 (T096–T115) impact proof · guards · docs · final audit
```

**Parallelizable — exactly 8 tasks carry an explicit `[P]` label**, and **only an explicit `[P]` authorizes
concurrent execution**: **T009 · T020 · T021 · T024 · T089 · T095 · T112 · T113**.
*(An earlier draft claimed "Parallelizable (23)" in prose. That was a miscount and is **not** authorization —
the `[P]` labels are the sole authority.)*
**Everything touching `settings.js`, `settings-management.js`, `settings-notifications.js`, `app.css`,
`nav.config.js` or `run.cjs` is strictly sequential (single-writer law).**

---

## STOP CONDITIONS (any one fires ⇒ halt; do not commit)

1. Public HTML ≠ **115** · `PAGES` ≠ **57** · admin menu ≠ **50** · Settings items ≠ **7**.
2. Settings planned ≠ **0** · sitewide planned ≠ **0** · `[data-coming-soon]` ≠ **0** · disabled locks ≠ **1** ·
   `FUTURE_ROUTES` not `{}`.
3. Any page body other than `settings.html` / `settings.en.html` changing; any of the 51 non-admin files changing.
4. Any forbidden 0-diff source file changing (the 13 of T099).
5. Any sensitive input or authored secret **value**; any `type=password` / `type=file` / `<canvas>` / `draggable` /
   `download=` / `window.open` / `blob:`.
6. Any teacher **pay figure**, any currency token, or any of the **11 excluded pay field names** (incl. in comments) —
   specifically including the legacy import-template example values `25.50` and `USD|GBP|EUR|EGP|AUD|CAD|AED` (**G-1**).
6b. Any **real PII** ported from the legacy corpus — the edit-variant prefill «أحمد محمد» / `01015264856`, the
   WhatsApp-insights phones/emails, or the live `chat.whatsapp.com` invite URL (**G-2**). Fixtures use obvious
   placeholders only.
7. Any fake-success copy (`saved` · «تم الحفظ» · «بنجاح» · `successfully` · `done` · «تم الربط»).
8. Any **connected-status chip** (`/متصل|connected/i` inside a chip).
9. Any new `data-*` hook · new localStorage key · new dependency · new component · new `field()` type · new page ·
   new `PAGES` entry · **any new `data-confirm`**.
10. Any **undeclared** protected-test change (outside the 2 supersessions + 2 strengthenings).
11. Any **unregistered** integration drawer (not in the 12-id `FORM_DRAWERS_032.settings` list).
12. Any AR/EN `adm.*` divergence ≠ **0**; any raw locale key rendered.
13. Any external network request from a built page.
14. Any **Message Builder UI** invented · any **WhatsApp insights page** built · any **real provider integration**
    attempted.

---

## Story coverage

| Story | Priority | Phases | Tasks |
|---|---|---|---|
| **US1** General complete | P1 | 3 | T025–T033 |
| **US2** Integrations shape, zero secrets | P1 | 7 | T058–T066 |
| **US3** Notification matrix | P2 | 4 | T034–T042 |
| **US4** Security honestly gated | P2 | 6 | T049–T057 |
| **US5** Customisation honest split | P2 | 5 | T043–T048 |
| **US6** Users, not a duplicate | P3 | 8 | T067–T069 |
| **US7** Forms complete, not shallow | P1 | 2–7 | T011–T014, T019, T020–T022, T030, T042, T048, T057, T066, T081 |
| **US8** Credentials never exposed | P1 | 2, 6, 7 | T017, T051, T060, T061, T100 |
| **US9** Every write honestly gated | P1 | 4–7, 10 | T041, T046, T052–T055, T063–T065, T082, T083, T102, T103 |
| **US10** Count/route/menu/planned protected | P1 | 9, 10 | T070–T088 |
| **US11** Ownership documented | P3 | 12 | T114 |

**No MVP subset.** `/speckit.implement` must execute **every** task: leaving any one of the six domains shallow, or
any Settings item planned, is a spec failure.
