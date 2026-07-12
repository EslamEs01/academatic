# Research — Spec 040 (Phase 0 decisions)

**Settings Deep-Links + Settings Sub-Page Completion.** Every decision below is evidence-backed (Spec 040
specify artifacts · re-grounded source at HEAD `58a53e2` · legacy raw-HTML captures) and is subordinate to the
Spec 040 **Decision Ledger**, which is the single source of truth for every number quoted here. Format per
decision: **Decision · Rationale · Alternatives considered · Evidence**. Where the evidence is silent the answer
is recorded as **UNKNOWN** — never guessed.

**Standing laws binding this spec:** teacher pay-free GLOBAL · no-secret (0 `type=password`, 0 `type=file`, 0
authored key/secret/token/webhook value) · no-fake (every final write is an honest `backendRequired` gate or a
labelled local preview that claims no persistence) · family zero-pay · student child-view · finance
no-fake-money · closed hook set (NO new `data-*` hook, NO new localStorage key, NO new dependency, NO backend) ·
count freeze (115 public HTML · 50 admin menu items).

---

## D1 — Baseline is `58a53e2`, not `4cbcb31`

**Decision.** Every diff, md5 and impact baseline for Spec 040 is taken against **HEAD `58a53e2`**.

**Rationale.** The watcher already committed Spec 039 **and** the Spec 040 specify artifacts. The working tree is
clean and `app/tests/` is byte-identical to HEAD. A plan that diffs against `4cbcb31` would sweep the whole of
Spec 039 into its "impact" set and compute a wrong body-change list (Ledger **R9**).

**Alternatives considered.** Trusting `CLAUDE.md` (which still names `4cbcb31`) — rejected: it is documentation
drift, not a code conflict, and the git history is authoritative.

**Evidence.** `git log --oneline -3` → `58a53e2` (docs: 039 + 040 spec artifacts) → `4cbcb31` (Spec 038) →
`56bc418`. Ledger, header + R9.

---

## D2 — Resolve in place: six deep-links, ZERO new pages

**Decision.** The six planned settings nav items flip `planned → implemented` with routes into the **existing**
six-tab settings hub. **0 new pages · 0 new page bases · `scripts/build-html.mjs` PAGES 0-diff · count stays
115 · admin menu stays 50 · settings category stays 7 items.**

| # | nav id | `nav.config.js` line | route (AR) | resolved (EN) | existing tab id |
|---|---|---|---|---|---|
| 1 | `settingsGeneral` | 110 | `settings.html#view=general` | `settings.en.html#view=general` | `general` |
| 2 | `settingsIntegrations` | 111 | `settings.html#view=integrations` | `settings.en.html#view=integrations` | `integrations` |
| 3 | `settingsCustomization` | 112 | `settings.html#view=customization` | `settings.en.html#view=customization` | `customization` |
| 4 | `settingsNotifications` | 113 | `settings.html#view=notifications` | `settings.en.html#view=notifications` | `notifications` |
| 5 | `settingsSecurity` | 114 | `settings.html#view=security` | `settings.en.html#view=security` | `security` |
| 6 | `settingsUsers` | 115 | `settings.html#view=users` | `settings.en.html#view=users` | `users` |

**Rationale.** `settings.js` already renders `tabs({group:'settings'})` with exactly these six tab ids (byte-pinned
at `smoke:1194`), and `enhance.js initTabs()` resolves `#view=` on load (hash → `localStorage` →
baked first tab). The build-time guard at `nav.config.js:151-157` forces `implemented ⇒ route`, so each flip
**must** carry a route. This is the Spec 037/038/039 pattern verbatim ("unlock into the surface that already
exists"), and it keeps `FUTURE_ROUTES` an empty map `{}`.

**Alternatives considered.** (a) Six standalone pages (`settings-general.html` …, +12 files → 127) — rejected:
duplicates the hub, splits the IA, and contradicts the Spec 033 roadmap entry for 040. (b) Leave the six as
«قريبًا» — rejected: the destinations exist and are reachable; a lock over a reachable surface is dishonest.

**Evidence.** `src/js/pages/settings.js` (171 lines, `tabs({group:'settings'})`); `nav.config.js:110-115` (six
`status:'planned'`, no route) + `:151-157` (route guard); `smoke:1194` tab-id contract; Spec 035 hash-aware
`langRoute()` (so `sidebar.js` stays 0-diff and EN mirroring is automatic — routes are authored **without** the
`.en`). Ledger §A, §B.

---

## D3 — Spelling trap: `settingsCustomization` → tab id `customization` (US spelling)

**Decision.** The route is `settings.html#view=customization` — **no `s`**. The legacy route
`/management/settings/customi**s**ation/...` (UK spelling) is **not** carried into the route or the tab id.

**Rationale.** The existing tab id in `settings.js`/`smoke:1194` is `customization`; the nav id is
`settingsCustomization`. Importing the legacy `s` would produce a route that resolves to no tab and silently fall
back to the baked first tab (`general`) — a deep-link that lies.

**Alternatives considered.** Renaming the tab id to match legacy — rejected: it would break the byte-pinned
`smoke:1194` tab-id contract for zero benefit.

**Evidence.** `smoke:1194` `['general','notifications','customization','security','users','integrations']`;
legacy capture route strings in `legacy-settings-coverage.md`. Ledger §B (spelling trap, confirmed).

---

## D4 — OQ-1 RESOLVED — `settingsUsers` → **Option A** (`settings.html#view=users`)

**Decision.** `settingsUsers` routes to the **existing Users tab**, whose content is **unchanged**
(`settings.js usersPanel()` lines 116-123 stays 0-diff). `staff.html` remains the canonical staff home and is
reachable from that tab by the real `<a href="staff.html">` link that already exists.

**Rationale (three independent legs).**
1. **No legacy `/management/settings/users` route exists** — 27 `management-settings-*` captures, zero `users`.
   The legacy RBAC grid lives at `/management/admins/permission/{6,7}` — the Admins/Staff family, which is
   precisely what `staff.html` was built from.
2. **IA placement matches legacy anyway**: the legacy sidebar nested "Users & Staff" **last inside the Settings
   group** (`legacy-management-content-coverage.md` D9); the current nav mirrors this exactly.
3. **Spec 031 already decided and shipped the split** (research D16, `contracts/staff-users-contract.md`, C-07,
   T028): "`staff.html` is the ONE staff home; the settings Users tab shows the compact RBAC preview + a real
   deep-link to `staff.html`; `settingsUsers` nav stays planned (folded)". Spec 040 merely **un-folds the nav
   pointer** — it does not re-open the decision.

**Why this is not duplication.** `usersPanel()` renders **only** the real `<a href="staff.html">` + `rolesSection()`
(a 4-group read-only preview from `fixtures/settings.js:ROLES_PREVIEW`). It has **0 forms, 0 drawers, 0 mutation
controls** and does **not import** `fixtures/staff-management.js`. `staff.js` (125 lines) remains sole owner of the
5-row directory, the `staffMenu` kebab, the 10-group `permDrawer()` RBAC matrix and the 3 staff form drawers.
**Zero code and zero data overlap.** No permission engine is created; `staff.html`'s matrix keeps its explicit
"never a working permission engine" comment.

**Alternatives considered.**
- **B — route straight to `staff.html`**: orphans the purpose-built Users tab and breaks the uniform
  "resolve in place" pattern of Specs 037/039. Rejected.
- **C — keep it an honest lock**: dishonest-by-omission — the target content **already exists and is already
  reachable**. Unlike `classSalaryReport`, no backend capability is missing. Rejected.
- **D — a new `users.html` page**: zero legacy evidence, and it would recreate the duplicate-staff-home (B-16)
  that Spec 031 closed. Rejected.

**Count impact.** 0 pages · 0 nav items · 0 new fixtures. The only edit is `nav.config.js:115` (+`route`,
−`status:'planned'`). `settings.js usersPanel()`, `fixtures/settings.js`, `staff.js` and
`fixtures/staff-management.js` are all **0-diff**.

**Evidence.** Ledger §C; `page-vs-fold-decision-register.md`; `role-permission-and-sensitive-data-carryover.md`.

---

## D5 — OQ-2 RESOLVED — the planned-item CLICK probe is **RETIRED** (Option C)

**Decision.** After Spec 040 the app carries **zero** «قريبًا» items sitewide. The dashboard
`.nav-item.is-planned` **click probe** (`smoke:223-230`) is therefore **retired** and replaced by an honest
**zero-census** plus three additive coverage layers. The `is-planned` render branches in `sidebar.js:33` and
`enhance.js` are **retained, not deleted** (zero-deletion law), exactly as `portal-shell.js:30`'s `is-planned`
branch has been retained-but-unexercised since Spec 025.

**Rationale.**
- Settings was the **last** planned-bearing category. Once it is 0, there is **no honest specimen left to click**.
- Keeping one dishonest planned nav item purely to feed a test **violates the honesty law**.
- Pointing the probe at `classSalaryReport` is **categorically wrong**: a `status:'disabled'` lock is *not* a
  planned item; it already has its own reason-toast probe (`smoke:231-240`), which stays.
- **Precedent is decisive**: `components/portal-shell.js:30` already renders an `is-planned` branch with **zero
  instances since Spec 025** (`ROLE_NAV` has no planned items; every `public/*-portal.html` shows
  `data-coming-soon` = 0), and the test expresses that honestly as the **vacuous** assert
  `plannedNavAnchors === 0`. Spec 040 does the same for the admin sidebar.
- "Zero coming-soon claims left" is a **product milestone**, not a coverage hole. Its honest test expression is
  `comingSoon === 0`.

**Alternatives considered.**
- **A — add a planned-nav specimen to `gallery.html`.** Checked and **not taken**. `src/js/pages/gallery.js`
  (87 lines) contains **no** nav-item specimen (its sections are buttons/kpi/tiles/chips/medallions/fields/
  avatars/badges/report/menu/toast/states); the 6 `data-coming-soon` occurrences in `public/gallery.html` are
  **the shared admin sidebar's settings items** — i.e. exactly the ones Spec 040 removes. Adding a specimen is a
  **product change** (gallery body diff ×2, new `gallery.sec.nav` locale keys, a nav component rendered outside
  any nav) and widens the body allowlist for one toast branch. It is *defensible* (the gallery already displays
  states used nowhere else, e.g. `errorState`/`loadingSkeleton`) — hence recorded, not forbidden — but the cost
  is not warranted. If a maintainer later overrides to A, the specimen **must** live inside `#page-body`
  (outside `.nav-panel`) or it breaks `navCount32 === 50` (`smoke:1300`) and `deadNav` (`smoke:172`), and this
  ledger must be amended.
- **B — keep one dishonest planned item.** **REJECTED** (honesty law).

**Replacement coverage (all additive).**
1. **Per-page zero-census** — on the dashboard: `.nav-panel .nav-item.is-planned === 0` **and**
   `[data-coming-soon] === 0`; plus the six anchor asserts + a planned/coming-soon census in the existing
   non-portal `nav039` block (reusing `anchorOk039`, defined at **`smoke:1442`** — re-verified in the tree at
   `58a53e2`; the Ledger's "`:1444`" is an off-by-two typo — unchanged), on every page × AR/EN.
2. **Source-level `nav.config` audit** (Node-side, after `browser.close()`, reusing the existing `byId` helper):
   the six exact `implemented` + route pairs · sitewide `planned === 0` · exactly **one** `disabled` lock
   (`classSalaryReport`) · `FUTURE_ROUTES` still `{}` · 50 items. This is the one requirement the DOM-only tests
   cannot reach (the Spec 039 precedent).
3. **The `is-disabled` reason-toast probe** (`smoke:231-240`) still proves the nav feedback path end-to-end.

**Evidence.** Ledger §D.2 (with the verbatim amendment text); `src/js/pages/gallery.js`; `public/gallery.html`
(6 × `data-coming-soon`, all sidebar); `components/portal-shell.js:30`; `smoke:223-230`, `:231-240`, `:1300`,
`:172`; `protected-test-supersession-register.md`.

---

## D6 — Supersession 1: `settingsPlanned === 6 → === 0`

**Decision.** Two smoke sites — `run.cjs:1446` and `run.cjs:2340` — change **only their expected value**
(6 → 0) and their message. Both were authored by Spec 039 and both **name Spec 040 as owner**. The supporting
reads at `:1436`, `:1439`, `:2326`, `:2331` stay **byte-verbatim**.

**Rationale.** This is a *strengthening*, not a weakening: the assertion becomes stricter (0 is the tightest
possible bound) and it is the direct, declared consequence of the six flips.

**Alternatives considered.** Deleting the asserts — rejected (loses the census). Loosening to `<= 6` — rejected
(would let a regression pass).

**Evidence.** Ledger §D.1 (old/new lines quoted verbatim); `smoke:1446`, `:2340`.

---

## D7 — OQ-3 RESOLVED — Message Builder owner = **Spec 053** (Integrations Command Center)

**Decision.** No message-builder UI is designed, described or rendered in Spec 040. The Customization tab keeps
the **existing honest gate** shipped by Spec 031 (`adm.set.cust.msgBuilder` + `adm.set.cust.msgBuilderReason`),
**unchanged**. Capability owner = **053**; placement custodian = **048**.

**Rationale.**
- **The only legacy evidence is an error page.** Route `/management/settings/customisation/message-builder` →
  **HTTP 504 Gateway Timeout**, `isErrorPage: true`, `domSummary` all-zero (0 links / 0 buttons / 0 forms /
  0 inputs / 0 images), corroborated twice (the page JSON itself, and the Personalisation page's network log).
  **Zero UI evidence exists ⇒ no UI may be invented.**
- A message *builder* composes **outbound channel messages**; its only real dependency is a **connected channel**
  (WhatsApp / Email / SMTP) — precisely what 053 owns. Without a live integration it is inert; there is nothing to
  build in a frontend-only spec.
- **045** (Admin General Operations & Communications *Review*) reviews the already-built comms surfaces
  (messages/announcements, Spec 034); a review spec does not originate a composer.
- **048** (Content/Certificates/Access & Settings Review) owns *placement*: it verifies the Customization gate is
  still honest.
- **057** is a freeze spec — it may not originate a capability.

**Alternatives considered.** B = 045 (rejected: wrong spec class + wrong dependency). C = permanently reject
(rejected: the capability is real in legacy, merely uncaptured; permanent rejection would be a deletion).

**Evidence.** Ledger §E; `future-owner-register.md` FO-06; `customisation-settings-scope.md`.

---

## D8 — Spec 033 predicted "nav-only"; that prediction is **half wrong**

**Decision.** Spec 040 is **NOT** nav-only. The nav flip is a two-line-per-item change, but the six tabs it
unlocks are **shallow**: the settings hub renders **exactly 2 form fields today** (both inside the `head-add`
`formDrawer`: name + status) against a legacy surface of ~150 controls. Spec 040 therefore **completes the six
settings sub-surfaces**: rendered `field()` controls **2 → 73**.

**Rationale.** Unlocking a nav item into an empty room is the same dishonesty as the «قريبًا» lock it replaces.
The 0-count-impact half of the Spec 033 prediction **does** hold (0 new pages, 0 new nav items); the "nav-only"
half does not survive the field audit.

**Alternatives considered.** Ship the flips alone and defer the fields to a review spec (045/048/056) — rejected:
FO-24 explicitly forbids using Spec 056 "as an excuse to leave Settings shallow".

**Evidence.** `settings.js` (171 lines) — every non-`head-add` control is a display value row, chip, swatch or
gate; `settings-complete-field-matrix.md`; Ledger §A (rendered form fields 2 → 73) + R10.

---

## D9 — Control-type law: **no new `field()` type** — every boolean is an existing `settingsSection` toggle

**Decision.** `field()` keeps supporting **only** `text | number | select | textarea` (so `password`/`file` remain
**structurally unreachable**). **No checkbox/toggle `field()` type is added.** Every boolean in Spec 040 — all
**49** of them (7 General automation · 34 Notifications · 8 Integrations) — is rendered through the
**already-existing** `settingsSection({rows:[{control:{kind:'toggle'}}]})` path
(`components/settings-section.js:26-31`), which emits
`<button class="toggle" data-toggle data-toast=…>` — the **existing `data-toggle` hook** and the **existing
`.toggle/.knob/.is-on` CSS**.

**Consequences (all in our favour).**
- **NO new `data-*` hook · NO new localStorage key · NO new component.** `form-field.js` and
  `settings-section.js` stay **0-diff**.
- The toggle is a **labelled LOCAL PREVIEW**: it flips visually, **persists nothing**, and its `data-toast`
  carries the **backendRequired** wording — «يُتاح بعد ربط الخادم» / "available once the server is connected" —
  **never** "saved" / «تم الحفظ». Each toggle-bearing section carries a visible **preview-only note** **plus
  exactly ONE gated Save** (`data-disabled-reason`).
- **Preview-note copy law (D34):** the note reads «معاينة فقط — لا يُخزَّن أي تغيير قبل ربط الخادم.» /
  "Preview only — nothing is stored until the server is connected." It **must not** contain `saved` / «الحفظ» —
  the fake-success censuses grep `\bsaved\b` and «تم الحفظ» over body **and template** text, and the naive
  "not saved" / «لا يتم الحفظ» phrasings would match («يتم الحفظ» literally contains «تم الحفظ») and fail an
  honest build.
- Toggles are `<button>`s, not `<input>`s → they can never trip the `passwordInputs` / `fileInputs` /
  `credInputs` guards.

**Alternatives considered.**
- Add a `checkbox` type to `field()`. Rejected. It is **not** a new `data-*` hook (so it would not break the
  closed-hook law) but it **is a component change** — `form-field.js` loses its 0-diff — and Spec 040 **does not
  need it**. Adding one would be a scope expansion requiring a declared amendment. Recorded here precisely so a
  future author knows the exact cost.
- Render booleans as two-option `<select>`s. Rejected: 49 selects is a worse UI than 49 toggles, and it discards
  a component the design system already ships.

**Evidence.** `components/settings-section.js:26-31`; `components/form-field.js` (4 types); Ledger §F preamble +
**R5** (toggle honesty is a STOP condition).

---

## D10 — Sensitive fields are **STRUCTURE-ONLY ROWS**, never inputs, never values

**Decision.** All **24** sensitive integration fields are rendered as **structure rows**
(`{labelKey, required, purposeKey}` — label + "required" badge + purpose sentence). **0 inputs · 0 values ·
0 `type=password` · 0 `type=file` · 0 authored key/secret/token/webhook value.**

**The count is 24, not 17** (Ledger R10). Enumeration:

| Bucket | Fields | n |
|---|---|---|
| Incoming providers | PayPal 2 · Stripe 2 · Mollie 1 · XPay 3 · Payoneer 2 · Paymob 5 · Custom 0 | **15** |
| Payout providers | Paymob Payout 4 (incl. the `type=password` `key4`) · Payoneer Payout 3 | **7** |
| Email/SMTP | `smtp_username` · `smtp_password` | **2** |
| **Total** | | **24** |

The "17" that appears in the specify artifacts = 15 incoming + 2 passwords, silently dropping Paymob-Payout
key1-3, Payoneer-Payout key1-3 and `smtp_username`. **PICK 24** — it is itemisable field-by-field from raw HTML.

**Rationale.** The **legacy anti-pattern is itself the argument**: every one of these credentials is a plain
**unmasked `type=text`**, and the legacy configure tables print `Key 1` / `Key 2` **raw** as table cells (the one
populated row emits literally `<td>01015264856</td>`). **Zero masking exists anywhere in legacy.** We reproduce
**none** of it. A structure row communicates the full integration contract ("what the backend will need, why, and
whether it is required") while carrying **no secret surface at all** — and it is also what the test guard
`a31.credInputs` (`smoke:1174`) already demands.

**Alternatives considered.** (a) Render masked inputs with empty values — rejected: a credential input is a
credential surface regardless of value, and it trips `credInputs`. (b) Omit the sensitive fields entirely —
rejected: it hides the integration contract and makes the drawer lie by omission about what a connection needs.

**Evidence.** `integration-provider-field-matrix.md`; raw legacy configure-table HTML; `smoke:1174`
(`credInputs` regex `/pass|secret|api|key|token|webhook|card|cvv/i` over **name or id**, asserted 0 on every page);
Ledger §F.5, §F.6, R1, R10.

---

## D11 — Teacher-pay exclusion: **all 10 General ▸ Teachers controls + `rate_student_absent`**

**Decision.** The entire legacy **General ▸ Teachers** tab is **EXCLUDED BY LAW** — 0 rendered, 0 gated, 0
described. Its section headers ("Hour Rates" / "Salary" / "Salary Tiers") and all its help copy are **not
reproduced**. `rate_student_absent` (Group C, "% of class price added to the teacher's salary") is **also
excluded**. **11 pay fields excluded in total.**

The 10, by exact legacy name:

| # | Legacy name | What it was |
|---|---|---|
| 1 | `settings_data[1]` | default hour rate |
| 2 | `hours-input` | hour-rate tier "If greater than" template |
| 3 | `rate-input` → dynamic `settings_data[<hours>]` | hour-rate tier value |
| 4 | `salary_period_type` | salary period type |
| 5 | `salary_period_day` | salary period day |
| 6 | `applayFins` | apply fines |
| 7 | `hours-input` | persisted fine tier (minutes, value 10) |
| 8 | `fin[10]` | persisted late-start discount % (value 5) |
| 9 | `hours-input` | empty fine-tier template |
| 10 | `rate-input` → dynamic `fin[<minutes>]` | empty fine-tier template value |
| **+** | **`rate_student_absent`** | **% of class price added to the teacher's salary** |

**Rationale.** Teacher pay-free is a **GLOBAL** standing law: no salary / rate / fine / payout / compensation
**FIGURE** may exist anywhere in the frontend. Every one of these 11 controls is a pay figure or a rule that
produces one. Rendering them "figure-free" is impossible — a rate input *is* the figure.

**Alternatives considered.** Render them as figure-free structure rows (as we do for credentials) — rejected: a
structure row for "default hour rate" still names and legitimises a pay control on the settings body, and the
`payFigure` / `a31.currency` guards treat the surrounding copy (currency tokens) as a failure anyway.

**Owner.** The **payroll/billing backend** — the same owner as the `classSalaryReport` honest lock
(`future-owner-register.md` FO-14, FO-15).

**Evidence.** `general-settings-scope.md`; Ledger §F.1 (group B) + STOP condition 6.

---

## D12 — 2FA relocated to Security as a structure row + gate; `otp` **NOT rendered**

**Decision.** The legacy General ▸ Accessibility group (2 controls) contributes:
- `tfa` → **relocated to the Security tab** as a **structure row** (label + purpose: "OTP on login for admins &
  support") **+ a `backendRequired` gate**. It is not a working control.
- `otp` → **NOT RENDERED AT ALL.**

The legacy Accessibility **intro copy** — which promises password-complexity and session-timeout controls that
**do not exist** on the page — is **not reproduced**.

**Rationale.** `otp` in legacy is a **single shared OTP-destination phone number for *all* users** — a recorded
security anti-pattern. Reproducing it, even as a gate, would legitimise it. Spec 033's security acceptance is
explicit: *"no secret/OTP control"*. And a 2FA **toggle** that toggles nothing while claiming to protect logins is
the most dangerous possible fake in this codebase — hence structure-row + gate, never a control.

**Alternatives considered.** (a) Leave `tfa` on General — rejected: security controls belong on Security; the
relocation also keeps General's field budget honest. (b) Render `otp` as a disabled input — rejected: an input
named `otp` trips `credInputs` **and** publishes the anti-pattern.

**Owner.** **Spec 043** + the auth backend (`future-owner-register.md` FO-16).

**Evidence.** `general-settings-scope.md` (group D); `security-settings-scope.md`; Ledger §F.1 (group D), §F.4.

---

## D13 — Rejected import columns: `password`, `currency`, `hour_rate` (6 column slots)

**Decision.** The 4 Security imports evidence **39 columns**; **33** are rendered as structure rows; **6 slots
(3 distinct names) are REJECTED**.

| Import | `type` | file id | Evidenced | Rejected | Rendered |
|---|---|---|---|---|---|
| Teachers | 1 | `teachers_file` | 10 | `currency`, `hour_rate` | **8** — id, first_name, last_name, email, phone, gender, status, timezone |
| Families | 2 | `families_file` | 15 | `password`, `currency`, `hour_rate` | **12** — id, name, user_name, email, phone, status, country_id, timezone, total_hours, invoice_type, course_type, payment_method |
| Children | 3 | `children_file` | 7 | — | **7** — id, name, parent_id, age, gender, language, status |
| Invoices | 4 | `invoices_file` | 7 | `currency` | **6** — id, parent_id, price, status, due_date, note |
| | | | **39** | **6 slots** | **33** |

**Rationale.** `password` in a **bulk CSV import contract** is the single worst artefact in the legacy corpus —
publishing the column name in our documentation-grade UI would breach the no-secret law (FO-12). `hour_rate` and
`currency` are teacher-pay figures (D11) and would additionally trip `a31.currency === 0` on the settings body
(Ledger **R2**: the body must contain **no** `ريال|SAR|جنيه|EGP|AED|EUR|$|€|£`; note "Saudi Arabia" is safe —
`\bSAR\b` does not match).

`payment_method` **is** rendered — but strictly as a **column-name structure row**, never as a live gateway
selector.

**Alternatives considered.** Render all 39 for "contract fidelity" — rejected: fidelity to an insecure contract is
not a virtue, and it fails two hard guards.

**Owner.** `password` → **043**; `hour_rate`/`currency` → **payroll backend** (FO-12, FO-13).

**Evidence.** `security-settings-scope.md`; Ledger §F.4, R2.

---

## D14 — The 4th import card is **Invoices**, mislabelled "Upload families" in legacy

**Decision.** Use the **functional** name (**Invoices**), not the legacy label. It gets **no Download-Template
button** (legacy has no template link for it); the other three do.

**Rationale.** The legacy card is labelled "Upload families" but its raw HTML posts `type=4` with
`invoices_file` — the label is a copy-paste bug. Reproducing the bug would ship a control that lies about what it
imports.

**Hard constraint on "Download template".** Every template control is a **`<button>` gate** — **never**
`<a download=…>` and never `window.open`. The `noPdf` / `g32.pdfish` guard
(`/window\.open|blob:|createObjectURL|\.pdf"|[^-\w]download=/i`) matches the **attribute**, not the word: the label
"Download template" is safe, the `download=` attribute is a **build-breaking** failure (Ledger **R3**).

**Alternatives considered.** Ship the legacy label with a footnote — rejected: users read labels, not footnotes.

**Evidence.** Legacy raw HTML (`type=4`, `invoices_file`, no template `<a>`); Ledger §F.4, R3.

---

## D15 — Import / backup / policy honesty

**Decision.**
- **Every Upload = a `backendRequired` gate.** `type=file` count stays **0**.
- **Backup:** the `backup_email` destination is **1 real `field(text)`** (rendered with **no value**) + a gated
  "Save destination" + a gated "Send backup now". Legacy fired a **real DB backup from a bare `<a>` with no
  confirmation** — that is **not reproduced**. **No `data-confirm` is added either** (D35): a confirm in front of
  an inert gate is theatre. The four facts a real egress needs — **scope · destination · permission · audit** —
  are carried in the **gate's visible reason/purpose copy**, and the real confirm ships with the real action
  (backend / FO-11).
- **Policies:** `family_privacy` + `teacher_privacy` = **2 authored display-only bodies** + a gated "Edit" each.
  **No Quill, no rich-text editor, no new dependency.** The 2 unlabelled legacy selects (**U-6**) are **not
  reproduced** — their purpose is **UNKNOWN**.

**Rationale.** Import/backup are the highest-consequence writes in the whole product (data destruction,
credential exfiltration). The legacy surface has **no validation, no dry-run, no undo and no confirm on any
import**; a frontend-only reproduction would be a fake with real-world consequences if it were ever wired.

**Alternatives considered.** A client-side CSV preview parser — rejected: requires `type=file` (forbidden) and
would be a persuasive fake of a capability we do not have.

**Owner.** Real import (upload, validation, mapping, dry-run, partial-import, undo) → **backend + 043** (FO-10);
real backup execution/delivery → **backend** (FO-11).

**Evidence.** `security-settings-scope.md`; `no-fake-settings-integrations-register.md`; Ledger §F.4.

---

## D16 — Notifications: all **47** controls preserved, 0 omitted, 0 invented

**Decision.** The notification matrix (47 controls / 28 distinct names / 9 event groups) is rendered **complete**
as **13 `field()` + 34 toggles**, inline (never a modal), in **7 `settingsSection`s** (System · Course · Class ·
Reminders · Invoices · Salary events · Family status), each with its **own direct gated Save** and the visible
preview-only note («معاينة فقط — لا يُخزَّن أي تغيير قبل ربط الخادم.» / "Preview only — nothing is stored until the
server is connected" — **never** "not saved"; see D34).

| Control class | n | Rendering |
|---|---|---|
| Section/master toggles | **5** — `system_notifications` (on) · `appnotifiy` (**legacy-disabled → `mode:'disabled'` + honest reason**) · `course_updates` (on) · `class_updates` (on) · `class_reminder` (on) | toggle rows |
| Channel selects | **10** — `teacher_course_updates`, `student_course_updates`, `teacher_class_updates_type`, `student_class_updates_type`, `teacher_reminder_type`, `student_reminder_type`, `invoice`, `invoice_reminder`, `salaries`, `family_status` | `field(select)` inline |
| Event checkboxes | **23** — course: teacher 2 (create/edit) + family 3 (create/edit/status) · class: teacher 9 + family 9 | toggle rows |
| Reminder toggles | **6** — `teacher_daily_class_reminder`, `teacher_delay_reminder`, `teacher_reminder`, `student_send_reschedule_reminders`, `teacher_send_manual_reminder`, `student_reminder` | toggle rows |
| Numerics | **3** — `hours_to_reminder_teacher` (2), `hours_to_reminder_student` (2), `invoice_reminder_days` (3) | `field(number)` inline |
| **Total** | **47** | **13 field() + 34 toggles** |

**Sub-decisions.**
- **Channel enum = 5 values, authored verbatim:** `0` Off · `1` As Profile · `3` WhatsApp · `4` E-mail ·
  `5` Private. **Value `2` does not exist in legacy — it is never invented.** (The legacy typo "whats App" is
  corrected in *our copy*; the *value* is preserved.)
- **The class-status asymmetry is preserved exactly, not normalised.** Teacher's 9 = Waiting / Running / Cancel /
  Absent / **Teacher Absent (6)** / Auto-Makeup / Reject / Cancel-request / Approve. Family's 9 = the same 8 but
  with **End class (5)** instead of Teacher Absent. Normalising them would invent two events that do not exist.
- **The `salaries` row is a routing-only channel select — 0 amount / rate / currency token.** Grep-confirmed
  against legacy. Admin-side "salary event" *wording* is already sanctioned by the Spec-030 figure-free finance
  Salaries tab. **Pay-free law upheld: no figure.**
- **`teacher_send_manual_reminder` sits inside the *family* block in legacy** (a naming bug). We place it under
  **Teacher** and record the anomaly in a fixture comment.
- **`teacher_delay_reminder`** ("Late 3 Minutes"): the label is rendered **verbatim**; its trigger semantics are
  **UNKNOWN** — **no help text is invented**.

**Rationale.** A routing matrix is only useful if it is complete; a partial matrix silently claims that the
missing events cannot be routed. The 47 controls are cheap (toggles + selects), the risk is nil (no figures, no
secrets), and completeness is exactly what Spec 040 exists to deliver.

**Alternatives considered.** A condensed event × channel grid (like the existing 6-row `NOTIF_MATRIX`) — rejected:
it is what the hub has today and it *is* the shallowness this spec closes. A modal per group — rejected: the
matrix **is** the page.

**Owner of real delivery.** **053** (channels) + **055** (propagation) — FO-07. The matrix routes; it never sends.

**Evidence.** `notification-settings-scope.md`; `notification-routing-matrix.md`; Ledger §F.2.

---

## D17 — General: 41 legacy controls fully accounted (27 rendered · 2 gated · 12 omitted)

**Decision.**

| Group | Evidenced | Rendered | Gated | Omitted |
|---|---|---|---|---|
| A Identity | 11 | **10** `field()` — 7 text (`company_name`, `company_name_ar`, `domain`, `email_info`, `phone`, `whatsapp`, `address`) + 3 select (`country_id`, `city`, `timezone`) | **1** — `logo` (`type=file` → **upload GATE**, no input) | 0 |
| B Teachers / pay | 10 | **0** | 0 | **10 — EXCLUDED BY LAW** (D11) |
| C Automation | 18 controls / 17 distinct names | **17** — 5 select + 5 number + 7 toggle | 0 | **1** — `rate_student_absent` (D11) |
| D Accessibility | 2 | 0 | **1** — `tfa` (relocated to Security, D12) | **1** — `otp` (D12) |
| **Total** | **41** | **27** | **2** | **12** |

**27 + 2 + 12 = 41.** ✔

**Accounting conflict, resolved.** `general-settings-scope.md` says "28 rendered"; it buckets the **gated `logo`**
as rendered. **PICK 27 rendered + 1 gated** — identical 41-total accounting, different bucket. Stated explicitly
so no author double-counts.

**The 17 automation controls.**
- **5 select:** `new_course_status` (4 opts) · `renew` (3) · `auto_makeup` (4) · `classes_not_closed` (3 — legacy
  value `1` is **genuinely absent**; do **not** invent it) · `teacher_can_edit_class` (3).
- **5 number:** `stop_after` (2) · `classes_not_closed_hours` (12) · `teacher_cancel_before_class` (120) ·
  `student_cancel_before_class` (120) · `show_enter_btn` (5).
- **7 toggle:** `send_plan_report` #1 "Completed Course" · `send_plan_report` #2 "monthly plan"
  (**legacy-disabled behind "No WhatsApp Connected" → rendered `mode:'disabled'` + an honest reason; the WhatsApp
  framing is NOT reproduced**) · `teacher_cancel_enable` · `student_cancel_enable` ·
  `auto_add_makeup_to_credit` (on) · `auto_add_no_makeup_to_credit` (on) · `teacher_absent_student`.
- The legacy **`send_plan_report` name collision** (two controls, one name) is a **bug**: our two controls get
  disambiguated names — `gen-courseCompleted`, `gen-monthlyPlan`. **Recorded, not reproduced.**
- Legacy field name `student_cancel_enable` carries the visible label **"Family"** → we use the **label** (Family)
  and keep the name mapping in a fixture comment.

**Unchanged on the General tab.** `LOCATIONS` (4 display rows) and `EXPENSE_HEADS` (4 rows) + the `head-add`
drawer (2 fields). → General `field()` total = **20 + 2 = 22**.

**Alternatives considered.** Rendering `logo` as a real file input — impossible by law (`type=file` = 0) and
structurally unreachable through `field()`. Inventing the missing `classes_not_closed` value `1` for enum
symmetry — rejected: inventing an enum value invents a behaviour.

**Evidence.** `general-settings-scope.md`; `settings-complete-field-matrix.md`; Ledger §F.1, R10.

---

## D18 — Customization: theme + language are the **ONLY** real writes; everything else is a gated Save

**Decision.** 17 distinct legacy names:

| Legacy name | Our rendering |
|---|---|
| `theme` (light/dark/system) | **REAL** — the existing `data-set-theme` hook + the existing `academy.theme` key. **Unchanged.** |
| `color_scheme` (`#5E4D7E`) | swatch + **hex text field** |
| `secondary_color_scheme` (`#7B6BA8`) | swatch + **hex text field** |
| `container_layout` (full / boxed) | `field(select)` — name `cust-layout` |
| `sidebar_type` (full / mini-sidebar) | `field(select)` — name `cust-sidebar` |
| `card_style` (border / shadow) | `field(select)` — **name MUST be `cust-surface`, NOT `*card*`** (D22) |
| `class_statuses_colors[11]` | **11 rows**: label + swatch + **hex text field** |
| **Total** | **16 `field()` + 1 real theme control = 17** ✔ |

The 11 statuses: `pending #FFC107` · `waiting #17A2B8` · `teacher-absent #DC3545` · `student-absent #DC3545` ·
`teacher-cancel #6C757D` · `student-cancel #6C757D` · `admin-cancel #6C757D` · `attend #28A745` ·
`reschedule #007BFF` · `running #007BFF` · `makeup #17A2B8` → **6 distinct hexes** (FFC107, 17A2B8, DC3545,
6C757D, 28A745, 007BFF). **Conflict resolved:** `customisation-settings-scope.md` says 7; the raw-HTML enumeration
yields **6**. **PICK 6** (Ledger R10).

**The REAL vs GATED split.** `theme` = REAL (existing key) · `lang` = REAL (existing `data-set-lang` /
`academy.lang` — **ours, not legacy**) · **everything else = display + ONE gated academy-wide Save**
(`backendRequired`). The line is drawn exactly where an **existing** storage key exists: theme and language are
*viewer-local preferences* the app already owns; brand colours, layout, sidebar type, surface style and the
class-status palette are *academy-wide configuration* that only a backend can hold.

**NOT rebuilt (each with its reason).**
- **"Pick from logo" ×2** — legacy uses `<canvas>` + `getImageData`. **`<canvas>` is forbidden** (STOP condition
  4). Additionally the source logo **404s**, so the feature is **provably non-functional in legacy**. → FO-21 (055).
- **"Apply for me" + "Reset"** — legacy writes **4 localStorage keys** (`theme`, `boxedLayout`, `sidebarType`,
  `cardBorder`) → would require **4 NEW storage keys**, forbidden by the closed-hook law. → FO-19 (055 + backend).
- **"Reset to Default"** for the 11 colours — legacy is a client-only DOM rewrite → would need a new hook →
  replaced by a **gated** Reset.
- **Message Builder** — gate unchanged (D7).

**Alternatives considered.** Persisting the palette under the existing `academy.theme` key (piggy-backing) —
rejected: it overloads a key with a different schema, which is a new storage contract in all but name, and it
would fake academy-wide persistence from a single viewer's browser.

**Owner.** Live brand/layout/palette persistence → **055** + backend (FO-19); contrast validation for the tunable
palette → **055** (FO-20).

**Evidence.** `customisation-settings-scope.md`; legacy raw HTML (canvas/getImageData, the 4 keys); Ledger §F.3,
R10.

---

## D19 — Payment Methods **fold into Integrations**; there is no chooser page and no edit surface

**Decision.**
- The **7 create variants** (`payment_method` 1-7 = PayPal, Stripe, Custom, XPay, Mollie, Payoneer, Paymob) become
  the **7 incoming providers' Configure drawers**. **No separate surface, no new page, no chooser page.**
- **The 8th capture (edit, `id=1`) is structurally identical to create variant 3** — same field set; only
  `_method=PUT` + prefilled values differ → **NOT a separate surface.**
- The instances list renders an **honest empty state** ("no payment method configured — available once the server
  is connected"). There are **0 authored instances**, therefore there is **nothing to edit** and **no
  `Number Of Family` count to fabricate**.

**Rationale.** The "sixth settings domain" in the user brief was "Payment Methods", but **Payment Methods is not a
nav item anywhere** — the sixth nav item is `settingsUsers` (Ledger R10). The provider **catalogue is the
chooser**: a dedicated chooser page (legacy **U-2**) was **never captured**, so there is nothing to design from,
and a catalogue → Configure-drawer flow delivers the same job with 0 new pages.

**Alternatives considered.** (a) A `payment-methods.html` page — rejected: 0 legacy capture, +2 files, breaks the
count freeze. (b) Authoring one demo instance so the edit surface has something to edit — rejected: it would
fabricate a *configured payment method*, i.e. a fake connection, plus a fake `Number Of Family` figure.

**Evidence.** `payment-methods-scope.md`; `page-vs-fold-decision-register.md`; Ledger §F.6, R10.

---

## D20 — `key1..key4` semantics: what is PROVEN, and every **UNKNOWN**, named

**Decision.** A semantic label is used **only** where a label, placeholder or help string proves it in raw HTML.
Everything else stays **UNKNOWN** and is rendered as the **legacy field name with a neutral purpose** — never a
guessed meaning.

**PROVEN (from label / placeholder / help text):**

| Provider | Field | Proven semantic |
|---|---|---|
| Stripe | `key1` / `key2` | **Publishable Key** / **Secret Key** (placeholders) |
| PayPal | `key1` / `key2` | **Client ID** / **Client Secret** (labels) |
| Paymob | `Integration ID` | *"comma-separated when offering more than one"* (proven help text) |
| Paymob | `settings[api_key]` | *"optional, status reconciliation only; a separate credential from the Secret Key"* (proven help text) |
| Paymob | region select | **Egypt / Oman / Saudi Arabia / UAE** — the help text proves it is a **region**, **not** a mode |
| Mollie | `key1` | API Key (label) |
| Payoneer | `key1` / `key2` | Merchant Code / API Key (labels) |
| Paymob Payout | `key4` | **`type=password`** in legacy — one of only two real password inputs in the whole crawl |

**UNKNOWN — stated as such, never invented:**
- **XPay `Community ID`** — business meaning UNKNOWN.
- **XPay `Variable Amount ID`** — business meaning UNKNOWN.
- The **distinction between Paymob's three secret-ish fields** (Secret Key / Public Key / HMAC Secret) beyond the
  proven help text — UNKNOWN.
- **Email "Add Account"** management flow (**U-4**) — never captured.
- The **RTL behaviour of the legacy forms** (**U-7**) — never captured; **our RTL is authored, not ported**.
- **`teacher_delay_reminder`** trigger semantics (D16) — UNKNOWN.
- The **2 unlabelled Policy selects** (**U-6**) — UNKNOWN, not reproduced (D15).
- The **WhatsApp pairing wizard / QR flow** (**U-3**) — never captured (D21).
- The **payment-method chooser page** (**U-2**) — never captured (D19).

**Rationale.** A structure row's whole value is its **purpose sentence**. An invented purpose is worse than no
purpose: it will be implemented against by the backend author. UNKNOWN is a first-class, shippable answer.

**Alternatives considered.** Inferring semantics from the provider's public API docs — rejected: that is external
knowledge, not corpus evidence, and this spec's evidence rule is corpus-only.

**Evidence.** `integration-provider-field-matrix.md`; legacy raw HTML placeholders/help; Ledger §F.5, §F.6.

---

## D21 — Integrations: 11 providers · **never "Connected"** · WhatsApp insights **excluded**

**Decision.**

| # | Provider | id | Safe controls | Sensitive structure rows |
|---|---|---|---|---|
| 1 | Stripe | 2 | `name` | 2 |
| 2 | PayPal | 3 | `name`, environment (Live/Sandbox) | 2 |
| 3 | Mollie | 4 | `name` | 1 |
| 4 | XPay | 5 | `name`, url (staging/community), 4 method toggles | 3 |
| 5 | Payoneer | 6 | `name`, environment | 2 |
| 6 | Paymob | 7 | `name`, **region** (Egypt/Oman/Saudi Arabia/UAE) | 5 |
| 7 | Custom | 10 | `name`, Payment Details `textarea` | 0 |
| 8 | Paymob Payout | 8 | mode (sandbox/live), `is_active` toggle, **webhook URL = structure row, no value** | 4 |
| 9 | Payoneer Payout | 9 | mode, `is_active` toggle, webhook structure row | 3 |
| 10 | WhatsApp (Free) | 1 | phone (text), `send_group` (select Private/Group), `group_name` (text) | 0 |
| 11 | Email / SMTP | 11 | `email_address`, `smtp_host`, `smtp_port` (number), `smtp_encryption` (select None/SSL/TLS), `is_active` + `is_default` toggles | 2 |
| | | | **21 `field()` + 8 toggles + 26 structure rows** | **24** |

**Sub-decisions.**
- **Status chips NEVER read "Connected".** All 11 carry an honest chip from the CLOSED three-state vocabulary —
  «غير مُعدّ» / "not configured" · «يتطلّب ربط الخادم» / "requires the server" · «غير متاح» / "unavailable" —
  using only the six sanctioned tones (`live|upcoming|completed|cancelled|amber|neutral` — a 7th tone **throws at
  build**, `build-html.mjs:168-175`, Ledger **R6**). **Chip-token law (D36):** no chip may carry «متصل» /
  `connected` in **any** form, not even the negative — the census is chip-scoped and token-absolute
  (`0` chips matching `/متصل|connected/i`), because the honest backendRequired sentence *"available once the
  server is connected"* legitimately contains the word elsewhere in the body, so a body-wide affirmative-only
  regex is unwritable.
- The legacy **7-code WhatsApp status enum** (UNKNOWN / PAIRING / DISCONNECTED / CONNECTING / CONNECTED / IDLE /
  STOPPED) is **documented in a fixture comment and never simulated** — **no Laravel Echo, no websocket, no
  `/broadcasting/auth`, no polling**.
- **WhatsApp pairing + QR = GATE.** No `<canvas>`, no QR renderer, **no wizard invented** (**U-3**). "Wake
  connection", "Test send", "Logout" = gates.
- **The WhatsApp insights pages are EXCLUDED ENTIRELY.** They leak a **live joinable `chat.whatsapp.com` invite
  URL**, **unmasked phone numbers and e-mails**, and they **egress real names to `ui-avatars.com`**. Owner:
  **Spec 043** (privacy / anti-poaching) for the privacy question; **045** for any messaging-diagnostics
  capability (FO-18). The legacy WhatsApp card copy mentioning **"salary reports"** is **not reproduced**
  (pay-free law).
- **Every final** (Connect / Save / Test SMTP / Toggle-enable) = a `backendRequired` gate. **No fake enable toggle
  on the cards**: legacy's `is_enabled` **POSTs a real toggle**; ours lives **inside** the drawer as a preview
  toggle + a gated Save (D9).

**Rationale.** An integrations page is the single easiest place in a frontend to tell a catastrophic lie ("you are
connected"). Every element above is chosen to make that lie structurally impossible: no credential inputs (D10),
no live status source, no websocket, no fake success.

**Alternatives considered.** Simulating the WhatsApp status machine for demo realism — rejected: it is the exact
fake the no-fake law exists to prevent. Rendering the insights pages with masked PII — rejected: masking is a
backend/privacy decision owned by 043, and the invite-URL leak is not maskable.

**Owner.** Real connections / OAuth / test-connection / webhooks / live status → **053** (FO-01); payments →
**053** + payments backend (FO-02); **payouts disburse teacher salaries** → **053** + payroll backend (FO-03);
WhatsApp pairing → **053** (FO-04); SMTP account management + `smtp_password` → **053** (FO-05); meeting
integrations (Zoom/Meet — **no legacy Settings evidence**) → **054** (FO-08).

**Evidence.** `integrations-scope.md`; `integration-provider-field-matrix.md`;
`no-fake-settings-integrations-register.md`; `build-html.mjs:168-175`; Ledger §F.5.

---

## D22 — Naming law: no `pass|secret|api|key|token|webhook|card|cvv` substring in any `name`/`id`

**Decision.** **All 73 new fields** obey a hard naming law: **no `pass`, `secret`, `api`, `key`, `token`,
`webhook`, `card`, `cvv` substring** in any input `name` or `id`. Concretely:
- legacy `card_style` → our select is named **`cust-surface`** (a name containing `card` **fails the build's own
  test**);
- `key1..key4`, `settings[api_key]`, `smtp_username`, `smtp_password`, the webhook URL → **structure rows, no
  inputs** (which is the law anyway — D10 — the test merely enforces it).

**Rationale.** `smoke:1174` (`a31.credInputs`) asserts **0** inputs whose **name or id** matches
`/pass|secret|api|key|token|webhook|card|cvv/i`, **on every page**. This is the **highest-probability
self-inflicted failure** in Spec 040 (Ledger **R1**): a perfectly innocent `card_style` select would red the whole
suite.

**Alternatives considered.** Weakening the regex — rejected outright: it is a protected guard, and weakening it to
ship a *layout* control would trade a real security invariant for a cosmetic name.

**Evidence.** `smoke:1174`; Ledger R1 + STOP condition 8.

---

## D23 — Component extension: **NONE needed**. CSS extension: **3 additive classes**

**Decision.**
- **No component change.** `form-field.js`, `settings-section.js`, `preview-drawer.js`, `tabs.js`, `sidebar.js`,
  `ui.js` are **0-diff**. `formDrawer(id,{titleKey,headIcon,fields,ctaKey,reasonKey})` and
  `settingsSection({rows})` cover 100% of Spec 040's needs (D9).
- **CSS: yes, three additive rules** — stated plainly rather than pretended away. No token changes, no chip tones,
  no framework:
  - **`.set-struct`** — the sensitive **structure row** (label + "required" badge + purpose), styled entirely from
    existing tokens.
  - **`.set-acc` / `.set-acc > summary`** — the native `<details>` disclosure inside a `.set-section`. No
    `.accordion` class exists today, and `pt-nav-drawer` is portal-scoped and not reusable here.
  - **`.set-swatch`** — the colour swatch chip (today inline-styled inside `settings.js`; promoted to a class).

**Rationale.** **Additive CSS is not a hook** and does not touch the closed-hook law. Precedent is well
established: `.cc-*` (Spec 034), `.finm-*` (Spec 038), `.cert-stage` (Spec 031).

**Recorded for a future author (precisely).** Adding a new **`field()` type** would **not** violate the
closed-hook law (a type is not a `data-*` hook) — but it **IS a component change** (`form-field.js` loses its
0-diff) and would be a **scope expansion requiring a declared amendment**. Spec 040 explicitly does **not** need
one.

**Alternatives considered.** Inline styles for all three (to claim "0 CSS diff") — rejected: dishonest bookkeeping,
and 60 structure rows of inline style is unmaintainable.

**Evidence.** Ledger §H (source-file plan, "app.css — additive classes ARE needed (honest statement)").

---

## D24 — Presentation: **inline is the default; the drawer is for provider Configure only**

**Decision.**

| Surface | Pattern | Why |
|---|---|---|
| General ▸ Identity | inline section (`.wiz-grid` of `field()`s) + gated Save | 10 fields — a modal would bury them |
| General ▸ Automation (17) | inline sections grouped by a **native `<details>` accordion** (Renewal · Cancellation window · Attendance · Class closing · Reporting) | Big group; `<details>` is browser-native — **zero JS, zero new hook** (precedent: `add-family.js:51`) |
| General ▸ Locations / Expense heads | inline (unchanged) + the `head-add` **drawer** | Unchanged |
| Notifications (47) | **inline sectioned matrix** — 7 `settingsSection`s, each with toggle rows + inline selects/numbers + its own gated Save; optionally wrapped per-group in `<details>` | **Explicitly NOT a modal.** The matrix **is** the page |
| Customization | inline sections (Global appearance · Class-status colours) + one gated academy-wide Save | The colour grid needs width |
| Security ▸ Imports ×4 | inline cards, each with a native `<details>` "Required columns" disclosure (mirrors the legacy info-toggle) + gated Upload/Download | Column contracts are long |
| Security ▸ Backup | inline row + gated actions | 1 field |
| Security ▸ Policies ×2 | **inline display bodies** + gated Edit | **Never a small modal** |
| Security ▸ 2FA | inline structure row + gate | — |
| Users | inline, **unchanged** (real `staff.html` link + RBAC preview) | 0-diff (D4) |
| Integrations ▸ 11 cards | inline card grid (`.card`, the existing `integCard()` pattern extended) | — |
| Integrations ▸ per-provider Configure | **DRAWER** — `formDrawer('integ-<id>', …)`, the wide sheet: safe fields as `field()`s, sensitive fields as structure rows, **exactly ONE** gated primary final | The drawer is the sanctioned long-form host (Spec 032 mechanism); **never a small modal** |
| Connect / Test / Pair / Upload / Send-backup / Save / palette Reset | **`data-disabled-reason` gate** | Every final write |
| **Confirms** | **NONE ADDED** (the pre-existing "reset data" confirm is unchanged) — **binding, D35** | A confirm before an inert gate stages a destructive-action dialog for an action that structurally cannot occur. The scope/destination/permission/audit facts live in the **gate's reason copy**; the real confirm ships with the real action (backend / Spec 053). |

**Rationale.** Settings is a **reading and comparing** surface; burying 47 toggles or 33 column names behind
modals destroys it. The drawer is reserved for the one genuinely **per-record** long form (a provider's
configuration), which is exactly the shape `formDrawer()` was built for in Spec 032.

**Alternatives considered.** A drawer per settings section (uniformity) — rejected: it hides the page's content
behind 20 clicks. A modal for policies — rejected: policy text is long-form reading.

**Evidence.** Ledger §G; `forms-modals-interactions-register.md`; `add-family.js:51` (native `<details>`
precedent); Spec 032 `formDrawer` contract.

---

## D25 — Fixtures: extend `settings-management.js`, add `settings-notifications.js`; `settings.js` fixture 0-diff

**Decision.**
- **`fixtures/settings-management.js` — EXTENDED:** `IDENTITY_FIELDS` (10) · `AUTOMATION_GROUPS` (17 controls) ·
  `BRAND_ROWS` **4 → 13** (2 theme colours + 11 class-status colours, 6 distinct hexes) · `APPEARANCE_OPTS`
  (3 selects) · `SECURITY_IMPORTS` (4 × column contracts, 33 rendered names) · `BACKUP` · `POLICIES` (kept) ·
  `INTEGRATIONS` **7 → 11** + `PROVIDER_FIELDS` (safe controls + the **24 sensitive structure rows** as
  `{labelKey, required, purposeKey}` — **never a `value`**). The old `NOTIF_MATRIX` (6 rows) is **superseded** by
  the new module.
- **`fixtures/settings-notifications.js` — NEW:** `NOTIF_GROUPS` (9 event groups / 47 controls) + `CHANNEL_OPTS`
  (5 values 0/1/3/4/5 — **no value 2**).
- **`fixtures/settings.js` — 0-diff** (`SETTINGS` shell + `ROLES_PREVIEW`, both still consumed unchanged).
- **`fixtures/staff-management.js`, `fixtures/form-options.js` — 0-diff** (reuse `FORM_STATUS_OPTS` where
  applicable).

**Rationale.** The notification matrix is a **different data shape** (event × recipient × channel) from the rest of
settings management; a separate module keeps both readable and makes the 47-control census auditable in one file.
`fixtures/settings.js` powers the Users tab (D4) and the shell — touching it would violate the 0-diff contract.

**Alternatives considered.** One giant `settings-management.js` — rejected: it would exceed the readable-fixture
bar and hide the matrix. Splitting into six per-tab fixtures — rejected: unnecessary churn; five of the six are
the same shape.

**Evidence.** Ledger §H, §J.

---

## D26 — Locales: `ar.adm.js` / `en.adm.js` only; `i18n.js` **0-diff**; 0 divergence

**Decision.** All new copy lands in the **existing mirrored pair** `src/locales/ar.adm.js` + `en.adm.js`
(**already registered** in `i18n.js`, which therefore stays **0-diff**). Namespaces extended: `adm.set.gen.*`
(identity + the 17 automation labels/help) · `adm.set.notif.*` (9 groups, 28 distinct events, 5 channel labels) ·
`adm.set.cust.*` (2 brand + 11 status colours + 3 appearance selects) · `adm.set.sec.*` (4 imports × columns,
backup, 2 policies, 2FA) · `adm.set.integ.*` (11 providers + safe field labels + 24 sensitive-row labels/purposes).
`adm.set.users.*`, `adm.set.tab.*`, `adm.set.heads.*`, `adm.set.loc.*` — **unchanged**. `adm.set.*` grows from
**121 → ≈ 450** per language (the exact number is the author's; **AR and EN must be EQUAL — divergence ≠ 0 is a
STOP condition**).

**Rationale.** `adm` is the settled admin namespace; a new locale module would force an `i18n.js` diff for zero
benefit. Mirrored-with-zero-divergence is a standing parity law (`adm` is 397/397 today).

**Alternatives considered.** A new `ar/en.set.js` pair — rejected: costs `i18n.js` 0-diff (STOP condition 1) for a
namespace that already exists.

**Evidence.** Ledger §H, §J; STOP condition 10.

---

## D27 — Test strategy: two declared supersessions + two sanctioned strengthenings + additive coverage

**Decision.**

| Change | Site | Class |
|---|---|---|
| `settingsPlanned === 6 → === 0` | `run.cjs:1446`, `:2340` | **Declared supersession 1** (D6) |
| Planned-item CLICK probe → zero-census | `run.cjs:223-230` | **Declared supersession 2** (D5) |
| `ok(a31.gates >= 4)` → `ok(a31.gates >= 20)` | `run.cjs:1196` | **Sanctioned strengthening** (Ledger-fixed value). **Measured reality check:** the pre-040 settings body already renders **23** gates, so a floor of 20 is *below* today's value and is **not load-bearing**. It is kept at 20 because the Ledger fixes it there and STOP-8 forbids un-declared assert edits; the real gate coverage comes from B3's exact censuses (`fields===73`, `toggles===49`, `struct===60`) and the per-drawer `FORM_DRAWERS_032` audit. Raising the floor to `>= 40` would be a *further* strengthening and is permitted **only** under a declared amendment. |
| `FORM_DRAWERS_032.settings` `['head-add']` → `+ 11 × 'integ-*'` | `run.cjs:92` | **Sanctioned strengthening — and a register omission the plan MUST close** |
| Six anchor asserts + planned/coming-soon census (reusing `anchorOk039`) | non-portal `nav039` block ≈ `:1443-1446` | **Additive** |
| `nav.config` SOURCE audit (6 routes · planned 0 · exactly 1 disabled · `FUTURE_ROUTES` `{}` · 50 items) | post-`browser.close()` block ≈ `:2347-2363` | **Additive** |
| Six fresh-context deep-link tests (seed `academy.schedView.settings` to a *different* tab, load `settings(.en).html#view=<tab>`, assert exactly ONE visible `[role=tabpanel]` = target, 0 external requests) — AR + EN × 6 = **12 executions** | new | **Additive** (Spec 039 pattern) |

**`FORM_DRAWERS_032` is load-bearing.** All **12** settings drawers (`head-add` + the 11 `integ-*`) must be
registered, and each must satisfy: ≥1 `input/select/textarea` · ≥1 `[data-disabled-reason]` · **≤1**
`.btn-primary[data-disabled-reason]` · **0** OMIT-named inputs
(`/pass|secret|api[-_]?key|token|webhook|otp|salary|hour[-_]?rate|fine|payout|iban|cvv/i`) · **0** `<canvas>`.
**Unregistered drawers silently escape the audit — that is a spec failure, not a pass** (Ledger **R4**).

**Preserved BYTE-VERBATIM** (non-exhaustive, all named in the Ledger): `clickFeedback` (`:206-215`), the four
dashboard feedback selectors + loop (`:216-222`), the **is-disabled reason-toast probe** (`:231-240` —
`classSalaryReport` is an honest lock and stays), the category-switch probe (`:241-251`), `truth010`
(`:1696-1706` — `badPlanned` becomes **vacuously true**, so it is **preserved, not superseded**), `deadNav`
(`:137-139`/`:172`), link-integrity (`:1691-1693` — safe: `:1684` strips the fragment before the `VALID_FILES`
lookup), `navCount32 === 50` (`:1300`), `adminMenu === 50` (`:2270`, `:2341`), route-freeze 115 (`:2388-2396`),
the settings tab-id contract (`:1194`), the Spec-031 settings honesty asserts (`:1172-1176`), the sitewide `g32`
MUST-GATE freeze (`:1288-1297`), every finance-lock assert, and
`payHit`/`tchPay`/`famPay`/`payFigure`/child-view/FAKE/raw-key/external-request.

**Rationale.** Two supersessions is the minimum honest set (both are direct consequences of "planned → 0"); the two
strengthenings *tighten* guards rather than loosen them. **Any protected assert changed outside this set is STOP
condition 8.**

**Evidence.** Ledger §D, §K (R4); `protected-test-supersession-register.md`.

---

## D28 — a11y + screenshots: additive rows, one required re-baseline

**Decision.**
- **a11y (`app/tests/a11y/run.cjs`)** gains rows for `#view=general`, `#view=notifications` and
  `#view=customization` (**zero coverage today**) × AR/EN × light/dark, plus mobile-390, plus **≥3 open-drawer**
  rows and the **roving-tabindex keyboard** row. Target unchanged: **critical = 0, serious = 0** (Ledger **R7** —
  a 47-row matrix + 11 drawers is a real a11y load).
- **Screenshots (`app/tests/screenshots/capture.cjs`)** gains `sp040-*` frames and **re-baselines
  `capture.cjs:62`** — `dashboard__ar__light__desktop__cat-settings.png` currently shows **six «قريبًا»
  buttons** and **will show six links**. That is a **required re-baseline, not a regression** (Ledger **R8**).

**Rationale.** The deep-linked fresh-load states and the new dense forms are exactly the states nothing exercises
today.

**Alternatives considered.** Relying on the existing single `settings` screenshot/a11y row — rejected: it only
ever exercised the baked first tab (`general`) in its *pre-040* shallow form.

**Evidence.** Ledger §H, R7, R8.

---

## D29 — Body-change allowlist + the impact proof method

**Decision.**

| Set | Files | Change |
|---|---|---|
| **Body-change allowlist** | `public/settings.html`, `public/settings.en.html` | **2 files** — full `#page-body` rewrite (six completed tabs) |
| **Sidebar-only** | the other **62 admin files** (64 admin − 2 settings) | The shared sidebar's six settings entries change from `<button class="nav-item is-planned" data-coming-soon data-soon-key="nav.comingSoon">` → `<a class="nav-item" href="settings(.en).html#view=…">`. **`#page-body` BYTE-IDENTICAL** |
| **Byte-identical** | the **51 non-admin files** (16 portal + portal internals + `index.html`) | They do not render the admin sidebar. **0 bytes changed** |
| **Total** | 2 + 62 + 51 = **115** ✔ | |

**Proof method (non-destructive, mandatory):** extract each page's `#page-body` and md5 it against
`git show 58a53e2:academy-dashboard-discovery/app/public/<file>` — **no `git stash`, no `reset`, no `checkout`**
(the Spec 038/039 method). Any admin `#page-body` other than `settings(.en).html` differing in md5, or any of the
51 non-admin files differing at all, is **STOP condition 9**.

**`gallery.html` / `gallery.en.html` are NOT in the body allowlist** — under D5 (Option C) no specimen is added, so
gallery changes **sidebar-only** like the other 61 admin pages.

**Rationale.** The allowlist is the contract that makes "we only changed settings" a *provable* statement rather
than a claim.

**Evidence.** Ledger §I, STOP condition 9.

---

## D30 — Source-file plan and the 0-diff wall

**Decision.**

**EDITED — 7 app files:**
1. `app/src/js/nav.config.js` — **the ONLY navigation-source edit**: 6 × add `route`, remove `status:'planned'`
   (lines 110-115). `FUTURE_ROUTES` stays `{}`.
2. `app/src/js/pages/settings.js` — the hub body (**the only page builder touched**).
3. `app/src/js/fixtures/settings-management.js` — extended (D25).
4. `app/src/js/fixtures/settings-notifications.js` — **NEW** (D25).
5. `app/src/locales/ar.adm.js` — extended (D26).
6. `app/src/locales/en.adm.js` — extended, mirrored, 0 divergence (D26).
7. `app/src/styles/app.css` — **additive only** (D23).

**EDITED — 3 test files:** `app/tests/smoke/run.cjs` · `app/tests/a11y/run.cjs` ·
`app/tests/screenshots/capture.cjs` (D27, D28).

**MUST BE 0-DIFF (verify with `git diff --stat`; any diff = STOP condition 1):**
`package.json` · `scripts/build-html.mjs` · `src/js/enhance.js` · `src/js/i18n.js` · `src/js/components/tabs.js` ·
`src/js/components/sidebar.js` · **`src/js/components/settings-section.js`** · **`src/js/components/form-field.js`** ·
**`src/js/components/preview-drawer.js`** · `src/js/components/ui.js` · `src/js/fixtures/settings.js` ·
`src/js/pages/staff.js` · `src/js/fixtures/staff-management.js` · every other `pages/*.js` and `fixtures/*.js`.

**Rationale.** The 0-diff wall is what makes the impact allowlist (D29) mechanically true rather than aspirational.
`sidebar.js` staying 0-diff is possible **only** because `langRoute()` was made hash-aware in Spec 035.

**Evidence.** Ledger §H; Spec 035 `langRoute()`.

---

## D31 — Evidence conflicts, resolved (no author may re-litigate these)

| Conflict | Sources | **PICK** | Reason |
|---|---|---|---|
| Sensitive integration fields **17 vs 24** | Spec-040 artifacts (17) vs raw-HTML enumeration (24) | **24** | The 17 omits Paymob-Payout key1-3, Payoneer-Payout key1-3 and `smtp_username`; the 24 is itemisable field-by-field |
| Customization distinct hexes **7 vs 6** | `customisation-settings-scope.md` (7) vs raw HTML (6) | **6** | Enumerated: FFC107, 17A2B8, DC3545, 6C757D, 28A745, 007BFF |
| General rendered **28 vs 27** | `general-settings-scope.md` (28) vs Ledger (27 + 1 gated `logo`) | **27 rendered + 1 gated** | Same 41 total; the doc buckets the `logo` **gate** as "rendered" |
| Sixth settings domain = **"Payment Methods" vs `settingsUsers`** | user brief vs source | **`settingsUsers`** | Payment Methods is **not a nav item anywhere**; it folds into Integrations (D19) |
| Spec 033 predicted **"nav-only"** | roadmap vs field audit | **NOT nav-only** | 2 rendered fields today vs a ~150-control legacy surface; the **0-count-impact** half of the prediction does hold (D8) |
| Baseline **`4cbcb31` vs `58a53e2`** | CLAUDE.md vs git | **`58a53e2`** | CLAUDE.md is documentation drift (D1) |

**Evidence.** Ledger R10 + header.

---

## D32 — Every EXCLUSION, with its future owner

| # | Excluded from Spec 040 | Why | Owner |
|---|---|---|---|
| FO-01 | Real provider connections — OAuth, credential storage, connect/disconnect, test-connection, webhooks, live status | The frontend may never claim a connection | **053** |
| FO-02 | Real payment processing — checkout, gateway calls, capture | Money; backend-only | **053** + payments backend |
| FO-03 | Real payout execution (Paymob Payout, Payoneer Payout — these disburse **teacher salaries**) | Backend; and no pay figure may exist in the frontend | **053** + payroll backend |
| FO-04 | WhatsApp pairing (4-step wizard, QR, `send_group`, test-send, logout, the live websocket) | Never captured (**U-3, UNKNOWN**); every action needs a live provider | **053** |
| FO-05 | Email/SMTP account management (`smtp_password` — one of only **two** real `type=password` inputs in the entire legacy crawl) | Secret storage is backend-only | **053** |
| FO-06 | **Message Builder** | Only evidence is a **504 Gateway Timeout** — zero capability evidence (D7) | **053** (placement custodian **048**) |
| FO-07 | Real notification delivery (the 47-control matrix **routes**; it never sends) | Needs the notification service **and** the channels | **053** (channels) · **055** (propagation) |
| FO-08 | Meeting integrations (Zoom / Google Meet) | **No legacy Settings evidence**; a distinct product surface | **054** |
| FO-09 | Real settings persistence — every Save in Settings | No backend; all saves are gates | backend |
| FO-10 | Real data import — upload, validation, mapping, dry-run, partial-import, undo | `type=file` = 0 by law; legacy has **no** validation/dry-run/undo and **no confirm on any import** | backend + **043** |
| FO-11 | Real backup — job execution, download, delivery | Legacy fired a real DB backup with **no confirm**; ours is an **honest gate** (no execution, therefore no confirm to stage — D35). The real confirm ships with the real action | backend |
| FO-12 | The `password` column in the families import contract | Publishing it breaches the no-secret law (D13) | **043** |
| FO-13 | The `hour_rate` / `currency` columns in the teachers + families import contracts | Teacher pay-free law (D13) | payroll backend |
| FO-14 | **Teacher pay rules** — the whole legacy General ▸ Teachers tab (hour-rate tiers, salary period, late-start fine) + `rate_student_absent` (D11) | Teacher pay-free GLOBAL | payroll/billing backend |
| FO-15 | `classSalaryReport` | Remains the **one** honest `disabled` lock (a real class-salary report implies computed per-class pay) | payroll/billing backend |
| FO-16 | 2FA / OTP — a working control, OTP delivery, session policy, password complexity (D12) | Spec 033 security acceptance: *"no secret/OTP control"*; legacy's shared-OTP-phone-for-all-admins is an anti-pattern | **043** + auth backend |
| FO-17 | RBAC **enforcement** — real route/API denial per permission | Hiding links is not enforcement | **043** |
| FO-18 | **WhatsApp insights** (both pages) — and their live group-invite URL + unmasked phones/e-mails + `ui-avatars.com` egress (D21) | A PII/capability leak; and they are messaging **diagnostics**, not configuration | privacy → **043**; capability → **045** |
| FO-19 | Live theme/brand/layout/palette **persistence** (beyond theme + language) — incl. legacy "Apply for me"/"Reset" and its 4 storage keys (D18) | Would need new hooks + new storage keys — forbidden | **055** + backend |
| FO-20 | Contrast validation for the admin-tunable palette | Becomes a hard gate once the palette is real | **055** |
| FO-21 | **"Pick from logo"** palette derivation | Needs a real uploaded logo (itself a gate) + `<canvas>`/`getImageData` (forbidden); the legacy logo **404s** so it is provably non-functional (D18) | **055** |
| FO-22 | Cross-surface **propagation** of every setting (timezone, automation rules, palette, routing) | 040 documents it; it does not implement it | **055** |
| FO-23 | The global modal/drawer/long-form interaction system | 040 specifies Settings' presentation only (D24) | **044** |
| FO-24 | Product-wide form-completeness re-audit | 040 enforces completeness **for Settings now**; **056 may not be used as an excuse to leave Settings shallow** | **056** |
| FO-25 | Settings re-review (within Content/Certificates/Access/Settings) | A later review pass | **048** |
| FO-26 | Final parity, security and production freeze | — | **057** |
| — | Legacy payment-method **chooser page** (**U-2**) and the **edit** surface (D19) | Never captured / structurally identical to create; 0 authored instances | folded into Integrations (**053** for real config) |
| — | Legacy **Accessibility intro copy** (promises password-complexity + session-timeout controls that do not exist) (D12) | Copy that describes non-existent controls | not reproduced |
| — | The 2 unlabelled **Policy selects** (**U-6**) (D15) | Purpose **UNKNOWN** | **048** if ever re-captured |

**Note on Spec 041.** Per the maintainer-directed roadmap amendment, **041 is redefined** as the *route/sidebar
baseline freeze* before the review programme — **not** the final product freeze — and **no real integration may be
assigned to it**. Its job is to freeze exactly what Spec 040 completes: every category at **0 planned**, the admin
menu at **50**, the page count at **115**, and exactly **one** honest lock (`classSalaryReport`).

**Evidence.** `future-owner-register.md` (FO-01…FO-26 + §1 roadmap amendment + §3); Ledger §E, §F.

---

## D33 — The STOP conditions are part of the design, not a postscript

**Decision.** Implementation halts (no commit, no push) if **any one** fires:

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
8. Any protected assert changed outside the **two declared supersessions** (`settingsPlanned` 6→0 at `:1446`/
   `:2340`; the planned-item click probe at `:223-230`) plus the **two sanctioned strengthenings**
   (`a31.gates >= 4 → >= 20`; the `FORM_DRAWERS_032.settings` extension).
9. Any admin `#page-body` other than `settings(.en).html` differing in md5 from `git show 58a53e2:…`; any of the
   51 non-admin files differing at all.
10. AR/EN `adm.*` key-set divergence ≠ 0.

**Global honesty census that must hold on the finished build:** `type=password` **0** · `type=file` **0** ·
`<canvas>` **0** · authored secret/API-key/token/webhook value **0** · fake "Connected" **0** · fake success toast
**0** · currency / pay figure **0** · computed metric **0**.

**Evidence.** Ledger §K.

---

## Summary of the delta Spec 040 ships

| Metric | Before | After | Δ |
|---|---|---|---|
| Public HTML pages | 115 | **115** | 0 |
| `PAGES` in `build-html.mjs` | 57 | **57** | **0-diff** |
| Admin menu items | 50 | **50** | 0 |
| Settings category items | 7 | **7** | 0 |
| Settings **implemented** | 1 | **7** | **+6** |
| Settings **planned** | 6 | **0** | **−6** |
| **Sitewide planned** | 6 | **0** | **−6** |
| Categories bearing a planned item | 1 | **0** | **−1** |
| Sitewide `[data-coming-soon]` (per page) | 6 | **0** | **−6** |
| Disabled locks | 1 (`classSalaryReport`) | **1** | 0 |
| `FUTURE_ROUTES` entries | 0 (`{}`) | **0 (`{}`)** | 0 |
| New `data-*` hooks / storage keys / dependencies | — | **0 / 0 / 0** | — |
| Rendered `field()` controls on the settings hub | **2** | **73** | **+71** |
| `data-toggle` local previews | 0 | **49** | +49 |
| Structure-only sensitive/contract rows | 0 | **60** | +60 |
| Gates (`data-disabled-reason`) in the hub **body** | **23** (measured at `58a53e2`; 24 counting the sidebar's `classSalaryReport` lock) | **≈ 51** | ≈ +28 |

Category breakdown holds: control 12 · families 9 · teachers 6 · reports 11 · admin 5 · settings 7 = **50**.
