# Feature Specification: Spec 040 — Settings Deep Links & Subpages Completion

**Feature Branch**: `feature/012-role-portal-foundation` (no new branch — specification only)
**Feature Directory**: `academy-dashboard-discovery/specs/040-settings-deep-links-subpages/`
**Created**: 2026-07-12
**Status**: Draft — specification only (no plan, no tasks, no implementation)
**Baseline**: HEAD `4cbcb31` (Spec 038) + the green, uncommitted Spec 039 working tree — see §Baseline Gate
**Input**: User description: "Spec 040 — Settings Deep Links & Subpages Completion. Spec 040 owns the six remaining planned Settings navigation items inherited from Spec 033/039. The feature must determine from current evidence whether each item needs an existing-page deep-link, an existing tab/fold, a minimally completed existing frontend surface, a new explicit page, or an honest defer/lock. Do not assume this is nav-only. Do not assume a page is complete merely because a route or card exists. Do not build real provider integrations in Spec 040."

---

## Baseline Gate (verified, with one declared exception)

| Check | Expected (reference) | Verified value | Verdict |
|---|---|---|---|
| Branch | — | `feature/012-role-portal-foundation` | OK (no branch cut) |
| HEAD | Spec 039 committed | **`4cbcb31` = Spec 038** | **EXCEPTION — see below** |
| Working tree | clean | 73 modified + 1 untracked = **exactly Spec 039** | Declared exception |
| `.specify/feature.json` | — | was `039-content-certificates-explicit-pages` → repointed to `040-settings-deep-links-subpages` | OK |
| Public HTML count | 115 | **115** | OK |
| Admin menu items | 50 | **50** (control 12 · families 9 · teachers 6 · reports 11 · admin 5 · settings 7) | OK |
| Admin category | 5 implemented / 0 planned | **5 / 0** | OK |
| Settings category | 7 items = 1 parent + 6 planned | **7 items = 1 implemented + 6 planned** | OK |
| Settings planned | 6 | **6** | OK |
| Sitewide planned | 6 (settings only) | **6 — settings is the ONLY planned-bearing category** | OK |
| `classSalaryReport` | honest finance lock | `status:'disabled'`, `reasonKey:'nav.reason.finance'`, no route (`nav.config.js:90`) | OK |
| `FUTURE_ROUTES` | settings entries to trim | **already an EMPTY object `{}`** (`nav.config.js:141-148`) | OK — nothing to trim |

**Declared exception — the Spec 039 commit gate.** The prompt's stop condition ("STOP if Spec 039 has not been committed by the watcher") is factually triggered: HEAD is `4cbcb31` (Spec 038) and Spec 039 sits in the working tree awaiting the watcher. The uncommitted delta was inspected file-by-file and is **exactly Spec 039 and nothing else**: `src/js/nav.config.js` + its built copy `public/assets/js/nav.config.js`, the 64 admin HTML files (shared-sidebar delta only), the three test files Spec 039 amended (`tests/smoke/run.cjs`, `tests/a11y/run.cjs`, `tests/screenshots/capture.cjs`), the untracked `specs/039-content-certificates-explicit-pages/`, and the `CLAUDE.md` / `app/README.md` / `screenshots/REVIEW.md` docs. **No unrelated change overlaps settings, nav, or tests.** The maintainer explicitly authorised proceeding on this green tree (same precedent as Specs 035/036/037, each of which was implemented on an uncommitted-but-green tree). Spec 040 is **specification-only** and touches zero application source, zero tests and zero generated HTML, so the exception carries no implementation risk. **Recommendation for the watcher: commit Spec 039 before `/speckit.plan` for Spec 040 begins.**

**Evidence correction that changes the brief.** The prompt anticipated six domains ending in *Payment Methods*. The actual sixth nav id — read from source, not assumed — is **`settingsUsers`** (Users & Staff). Payment Methods is **not** a Settings nav item in either the current app or the legacy sidebar: in legacy it is the **"Payments (incoming)" group inside the Integrations catalog** (7 gateway providers, each whose *Configure* action leads to the payment-method create form). Spec 040 therefore owns payment methods **inside Integrations**, not as a seventh nav item. See `payment-methods-scope.md`.

---

## Why this spec is NOT nav-only

The six planned Settings nav items each already have a 1:1 tab on `settings.html` (`general · notifications · customization · security · users · integrations`), and the tab machinery already resolves `settings.html#view=<tab>` today. A pure nav flip is therefore *technically* available — and Spec 033's roadmap predicted exactly that ("6 deep-links to the existing settings tabs; expected count impact: 0").

Field inspection refutes it as *sufficient*. Across **all six tabs combined**, the current hub renders **2 form fields** (both inside a single `head-add` drawer), 36 actions and 23 backendRequired gates. The evidenced legacy configuration surface is roughly **two orders of magnitude larger**:

| Domain | Current app | Legacy evidence (authoritative, from raw HTML records) | Gap |
|---|---|---|---|
| General | 9 display-only rows + 4 expense-head rows; **0 inputs** | **4 tabs, 41 visible fields**: identity **11** · teacher-pay rules **10** (EXCLUDED by law) · course/class automation **18** (17 distinct names) · accessibility **2** (`tfa`, `otp`) | automation group + 2FA absent; identity is read-only text, not a form |
| Notifications | 9 rows, 3 toggles; **0 fields** | **47 configuration fields**, 28 distinct names, 6 sections, 2 recipients, 10 channel selects, 23 event checkboxes, 6 reminder toggles, 3 numerics, 4 master toggles | matrix is a stub |
| Customization | 6 rows, 4 display hex swatches; 5 **real** theme/lang controls | **35 visible fields** (17 distinct names): 2 brand colours + theme + container layout + sidebar type + card style + **11 class-status colours**; Apply-for-me (localStorage, per-admin) · Reset · Reset-to-Default · Save | 9 status colours + 3 layout controls absent |
| Security | 2 rows; 3 gates; 2FA = native-disabled button | **6 visible fields**: backup destination + Send-Backup · **4 import types** (teachers/families/children/**invoices**) with `.xlsx` + column contracts · **2 rich-text policy editors** posted together | import types + policy structure absent |
| Users | 1 row + RBAC preview (12 perm items) + real `staff.html` link | Users & Staff settings sub-page | closest to complete |
| Integrations | **7** display-only provider cards, **0 configuration fields** | **11 providers** in 3 groups; 7 gateways each list stored methods in a table that **prints Key 1 / Key 2 in plain text**; 2 payout providers carry webhook + sandbox/live + credentials (one real `type=password`); Email carries SMTP + `smtp_password` | 4 providers missing; no configure surface at all |

A page that renders a provider *card* is not a provider *configuration surface*. Spec 040 = **deep-link the six items AND complete the six forms in place**, under the unchanged honesty law. Count still holds at 115 with 0 new page bases, satisfying Spec 033's count contract.

---

## User Scenarios & Testing *(mandatory)*

### User Story 1 — Admin reaches General Settings and finds a real, complete academy configuration form (Priority: P1)

An academy manager opens **الإعدادات → عام** from the sidebar. Today that item is a dead «قريبًا» button. After Spec 040 it is a real link that lands on the General tab of the Settings hub, where the manager can see and work through the academy's complete configuration — identity, location, expense heads, and the course/class automation rules that actually govern renewals, cancellation windows, make-up and credit — grouped, explained, and honest about what saves only once the server exists.

**Why this priority**: General is the first Settings item, the default tab, and the domain with the largest evidenced field gap (an entire 17-control automation group is missing). It is also where the pay-free law is most at risk, so it must be specified first and correctly.

**Independent Test**: Load `settings.html#view=general` and `settings.en.html#view=general` in a fresh browser context with the opposite tab pre-seeded in `localStorage`; the General panel is the single visible tabpanel, the identity, location, automation and expense-head groups all render their evidenced fields, no pay figure or rate control appears anywhere, and the Save action is a single `data-disabled-reason` gate.

**Acceptance Scenarios**:

1. **Given** the admin sidebar Settings category, **When** the admin activates "عام" / "General", **Then** it is an `<a href="settings.html#view=general">` (`settings.en.html#view=general` in EN) — never a «قريبًا» button — and the General tabpanel is the only visible panel on arrival.
2. **Given** the General tab, **When** the admin reviews it, **Then** the academy-identity group exposes every evidenced identity field (academy name, Arabic name, domain, contact email, phone, WhatsApp, logo, country, city, timezone, address) as labelled form controls, with the logo upload rendered as a gate (no `type=file`).
3. **Given** the General tab, **When** the admin scrolls to automation, **Then** the evidenced course/class rules render as grouped, labelled, inert controls (renewal status, unpaid-invoice stop count, cancellation windows for teacher and family, auto-makeup, credit handling, unclosed-class handling, pre-class entry) with inline help explaining what each rule governs.
4. **Given** the General tab, **When** any pay-related content is sought, **Then** **zero** hour-rate, rate-tier, salary-period, fine/discount or class-rate control or figure exists; the only trace is the existing non-numeric pointer that teacher pay rules are managed in Finance.
5. **Given** the admin edits any field and presses Save, **Then** a single honest backendRequired gate explains the value is not persisted; no success wording, no toast claiming a save, no network request.

---

### User Story 2 — Admin reaches Integrations and can inspect every provider's real configuration shape without a single secret existing (Priority: P1)

The admin opens **الإعدادات → التكاملات**. They see the full provider catalog — payment gateways, payout providers, and communication channels — grouped by category, each card carrying an honest, labelled connection state. Opening a provider reveals exactly what that provider will require (PayPal's client id and client secret; Paymob's integration id, public key and HMAC; a payout provider's webhook URL and sandbox/live mode), so the academy can prepare — while every credential value is absent, every connect/test/save is a gate, and nothing ever claims to be connected.

**Why this priority**: Integrations is the largest capability gap (7 cards → 11 providers, zero configuration fields today) and simultaneously the highest-risk surface in the entire product for credential exposure. It must be complete in *structure* and empty in *secrets*.

**Independent Test**: Load `settings.html#view=integrations`; assert 11 provider cards in 3 category groups, every card carrying a labelled icon+text status chip from the closed honest set, each provider opening a configuration drawer whose sensitive fields are structure-only; then assert sitewide that `type="password"` = 0, credential-like inputs = 0, and no authored value matches a secret/key/token pattern.

**Acceptance Scenarios**:

1. **Given** the sidebar, **When** the admin activates "التكاملات" / "Integrations", **Then** it deep-links to `settings.html#view=integrations` and that tabpanel opens on a fresh load in both languages.
2. **Given** the Integrations tab, **When** the catalog renders, **Then** all 11 evidenced providers appear, grouped under Payments (incoming) / Payouts (outgoing) / Communications, each with an authored description and an **icon+text** status chip drawn only from {not connected · available to connect · unavailable}; **no card may ever read "connected"**.
3. **Given** a provider card, **When** the admin opens its configuration, **Then** the drawer lists that provider's *specific* evidenced fields with meaningful labels (never generic "Key 1 / Key 2"), marks which are sensitive, and shows webhook and sandbox/live requirements where the provider has them.
4. **Given** any provider configuration, **When** the DOM is inspected, **Then** there is no `type="password"`, no credential input of any kind, no authored API key / client secret / HMAC / SMTP password / token / webhook secret value, and no `type="file"`.
5. **Given** Connect / Test connection / Save on any provider, **When** activated, **Then** each is an honest `data-disabled-reason` gate; no status flips, no fake test result, no fake pairing, no request leaves the page.

---

### User Story 3 — Admin reaches Notification Settings and sees the complete event × recipient × channel routing matrix (Priority: P2)

The admin opens **الإعدادات → الإشعارات** and finds the full routing map: which events notify which recipients through which channel — course events, the nine class-lifecycle events per recipient, reminders with their lead times, invoice and invoice-reminder routing, and family-status events — instead of today's three-toggle stub.

**Why this priority**: The matrix is the second-largest field gap (~47 evidenced controls vs 0) and defines behaviour every role will later feel. It is display-and-configure only; nothing may claim delivery.

**Independent Test**: Load `settings.html#view=notifications`; assert the evidenced sections, recipients, channel selects, numeric lead-time fields and per-event controls are all present and countable; assert zero pay figures and zero delivery claims.

**Acceptance Scenarios**:

1. **Given** the sidebar, **When** the admin activates "الإشعارات" / "Notifications", **Then** it deep-links to `settings.html#view=notifications` and opens that tab on a fresh load in both languages.
2. **Given** the Notifications tab, **When** it renders, **Then** every evidenced section is present (global · in-app · course · class · reminders · invoice · invoice reminder · salary event · family status) with per-recipient (teacher / family) channel routing and the complete evidenced per-event control set.
3. **Given** any event control, **When** shown, **Then** its on/off state is conveyed by **icon + text**, never colour alone.
4. **Given** a channel that depends on an integration (e.g. WhatsApp, email), **When** that channel is selected, **Then** the surface states that delivery requires the integration and the backend; it never asserts a message will be or has been sent.
5. **Given** the salary-event routing row, **When** rendered, **Then** it carries **no pay figure, rate or amount** — routing only.
6. **Given** Save, **When** pressed, **Then** it is one honest backendRequired gate.

---

### User Story 4 — Admin reaches Security Settings and every destructive or expensive action is honestly gated (Priority: P2)

The admin opens **الإعدادات → الأمان** and finds the security surface: two-factor enforcement, the data-import surface with its four evidenced import types and their required-column reference, the backup destination and send action, and the family/teacher policy documents — with every real action (import, upload, backup, policy save, 2FA enable) behind an honest gate and a confirmation where the action is destructive or expensive.

**Why this priority**: Legacy's Send Backup fired a real database backup with **no confirmation** during the crawl, and its import surface accepts real files. This is the clearest place where the rebuild must be safer than the original.

**Independent Test**: Load `settings.html#view=security`; assert the import types, the required-column reference, the backup destination field, and the two policy documents render; assert `type="file"` = 0, no OTP/secret control exists, and every write action is a gate — with destructive actions additionally behind a confirm.

**Acceptance Scenarios**:

1. **Given** the sidebar, **When** the admin activates "الأمان" / "Security", **Then** it deep-links to `settings.html#view=security` and opens that tab on a fresh load in both languages.
2. **Given** the Security tab, **When** it renders, **Then** the evidenced import types each appear with their purpose, accepted format, and a required-column reference the admin can read before preparing data.
3. **Given** any import or backup action, **When** activated, **Then** it is a backendRequired gate — **no `type="file"` input exists**, no upload occurs, no template downloads, no backup is claimed to have started, and no success wording appears.
4. **Given** two-factor authentication, **When** rendered, **Then** it is an honest gate — there is **no working 2FA control and no OTP entry field anywhere** (Spec 033 security acceptance: "no secret/OTP control").
5. **Given** the family and teacher policy documents, **When** rendered, **Then** they are display-only with a gated edit action; no rich-text editor engine and no new dependency is introduced.
6. **Given** any destructive action, **When** activated, **Then** a confirmation precedes the gate, and the confirmation itself performs no mutation.

---

### User Story 5 — Admin reaches Customisation and gets an honest split between what really applies and what needs a server (Priority: P2)

The admin opens **الإعدادات → التخصيص**. Theme (light / dark / system) and language keep working for real, exactly as they do today. The rest of the evidenced appearance surface — brand colours, layout width, sidebar style, card style, and the class/session status palette — is presented completely and honestly: visible, explained, and clearly marked as requiring the server to persist. Nothing pretends to save.

**Why this priority**: The real controls must not regress, and the evidenced field set (13 colour pickers + 3 layout controls) must not be reduced to "two colour pickers" — while the project's no-new-hook / no-new-storage-key law forbids inventing live persistence for the rest.

**Independent Test**: Load `settings.html#view=customization`; assert theme and language controls still function (they change the live theme and persist to the existing keys); assert the full evidenced appearance + status-colour set renders; assert no save claims persistence.

**Acceptance Scenarios**:

1. **Given** the sidebar, **When** the admin activates "التخصيص" / "Customization", **Then** it deep-links to `settings.html#view=customization` and opens that tab on a fresh load in both languages.
2. **Given** the Customization tab, **When** theme or language is changed, **Then** it takes effect immediately and persists via the **existing** theme/language mechanism — this is a genuine local preference and must be labelled as such, not as an academy-wide setting.
3. **Given** brand colours, layout width, sidebar style, card style and the complete evidenced class/status colour set, **When** rendered, **Then** all appear as labelled, grouped, display-only controls with a single gated Save; **no new interaction hook and no new storage key is introduced**.
4. **Given** the status-colour set, **When** rendered, **Then** every status is identified by **icon + text as well as colour** (legacy's 11 statuses collapse to 7 distinct hex values, making colour alone ambiguous — the rebuild must not repeat that).
5. **Given** the legacy message-builder, **When** the admin looks for it, **Then** it is an honest, explicitly-owned future item — **never** a mocked screen (its only legacy evidence is a 504 Gateway Timeout, i.e. no evidence at all).

---

### User Story 6 — Admin reaches Users & Staff without landing on a duplicate of the staff directory (Priority: P3)

The admin opens **الإعدادات → المستخدمون والموظفون** and lands on the Settings hub's Users tab: the roles-and-permissions surface, with a real link onward to the canonical staff directory. Settings answers "who may do what"; the staff page answers "who is on the team". Neither duplicates the other.

**Why this priority**: The surface is closest to complete already; the only real decision is routing (and avoiding the `settingsUsers` ↔ `staff` duplication Spec 031 explicitly resolved).

**Independent Test**: Load `settings.html#view=users`; assert the roles/permissions surface renders and that exactly one real link points to `staff.html`; assert no second staff directory is rendered.

**Acceptance Scenarios**:

1. **Given** the sidebar, **When** the admin activates "المستخدمون والموظفون" / "Users & staff", **Then** it deep-links to `settings.html#view=users` and opens that tab on a fresh load in both languages.
2. **Given** the Users tab, **When** it renders, **Then** it presents the role/permission surface and a single real anchor to `staff.html`; the staff directory itself is **not** duplicated here.
3. **Given** the permission surface, **When** rendered, **Then** it is display-only (no enforcement is claimed) and every management action is a gate.

---

### User Story 7 — Every Settings form is complete against the evidence, not shallow (Priority: P1)

Whoever configures the academy can see, in one place per domain, the *whole* evidenced configuration — not a token two or three fields. Each form states its purpose, groups its fields, marks what is required, explains what each setting will govern, and is explicit about what only takes effect once the server is connected.

**Why this priority**: This is the spec's central quality bar and the user's explicit "settings forms completeness law". Without it, deep-linking the six items merely makes six shallow tabs reachable.

**Independent Test**: For each of the six tabs, count rendered, labelled controls and compare against the per-domain field matrix in `settings-complete-field-matrix.md`; every evidenced field is either rendered, rendered as a structure-only row (sensitive), or listed in the register as omitted-by-law with a named owner. Nothing is silently dropped.

**Acceptance Scenarios**:

1. **Given** the field matrix, **When** any tab renders, **Then** every evidenced field for that domain is accounted for in exactly one of three dispositions: **rendered** · **structure-only (sensitive)** · **omitted-by-law with a named future owner**.
2. **Given** any long form, **When** displayed, **Then** it is grouped into titled sections with inline help, and its save/reset actions remain reachable without hunting.
3. **Given** any form, **When** inspected, **Then** no field exists that the evidence does not support (no invented fields).

---

### User Story 8 — Sensitive integration credentials are never exposed (Priority: P1)

A security reviewer inspects every Settings surface and finds that the product can describe exactly what each provider needs, while containing not one credential — no key, no secret, no token, no password field, no webhook secret — and never claiming a connection it does not have.

**Why this priority**: The single highest-severity risk in this spec's blast radius. Legacy renders every gateway credential in plain-text inputs; the rebuild must not inherit that shape.

**Independent Test**: Grep every built page and every fixture/locale source for credential patterns and `type="password"` / `type="file"`; assert zero. Assert no provider status chip can read "connected".

**Acceptance Scenarios**:

1. **Given** any Settings surface, **When** inspected, **Then** `type="password"` = 0 and `type="file"` = 0 (sitewide law, unchanged).
2. **Given** any fixture or locale module, **When** inspected, **Then** it contains **no** API key, client secret, HMAC secret, SMTP password, OAuth token, webhook secret, or any placeholder that resembles a real credential.
3. **Given** any sensitive field, **When** represented, **Then** only its **label, requirement and purpose** appear — never an input that could accept or display a value.
4. **Given** any provider, **When** its status is shown, **Then** the status is authored and honest; a "connected" state is unreachable in the static frontend.

---

### User Story 9 — Every real save, connect, test, import and backup stays honestly gated (Priority: P1)

Nothing in Settings lies. Every action that would need a server says so, in plain language, before the admin invests effort — and no action ever reports success it did not achieve.

**Why this priority**: The standing frontend-honesty law, and the one thing that makes a static configuration surface trustworthy.

**Independent Test**: Enumerate every final action across the six tabs; assert each is either a safe local preview that claims nothing, or a `data-disabled-reason` gate; assert zero fake-success wording and zero external requests.

**Acceptance Scenarios**:

1. **Given** any Save / Connect / Test / Import / Upload / Download-template / Send-backup / Reset / Enable-2FA / Publish action, **When** activated, **Then** it produces an honest backendRequired explanation and performs no mutation.
2. **Given** theme and language, **When** changed, **Then** they really apply and really persist locally — and are labelled as a personal preference, not an academy-wide saved setting. This is the **only** sanctioned "real" write in Settings.
3. **Given** any page in the suite, **When** loaded and exercised, **Then** zero external network requests occur and zero console errors are produced.

---

### User Story 10 — The count, route, menu and planned-item contracts stay protected (Priority: P1)

The maintainer can prove that completing Settings changed only what it was allowed to change: the page count, the admin menu, every other page body, and every protected assertion remain exactly as they were — with the single, explicitly declared exception that Settings' planned items reach zero and the planned-item test probe is honestly superseded rather than deleted.

**Why this priority**: This is what keeps Spec 041's baseline freeze meaningful.

**Independent Test**: Build; assert 115 pages, 50 admin menu items, 7 settings items, 0 settings planned, 0 sitewide planned; diff `#page-body` for all 115 pages against the committed baseline and assert only `settings.html` / `settings.en.html` (plus the shared sidebar on the 64 admin pages) changed.

**Acceptance Scenarios**:

1. **Given** the build, **When** it completes, **Then** the public HTML count is **115** (unchanged) and there are **0 new page bases**.
2. **Given** the admin menu, **When** counted, **Then** it is **50** items, of which settings holds **7** — with **0 planned** items in any category.
3. **Given** the nav source, **When** audited, **Then** none of the six settings ids appears in `FUTURE_ROUTES`, and `classSalaryReport` remains an honest `disabled` lock with a reason and no route.
4. **Given** the protected test suite, **When** run, **Then** every role-law, no-fake, dead-link, menu-count and route-freeze assertion is unchanged **byte-verbatim**, except the two narrowly declared supersessions registered in `protected-test-supersession-register.md`.
5. **Given** the impact boundary, **When** verified, **Then** every non-settings `#page-body` is byte-identical to the committed baseline, proven non-destructively (no stash / reset / checkout-discard).

---

### User Story 11 — Setting ownership and downstream consumers are documented (Priority: P3)

A future implementer can answer, for any setting, "who edits it, what does it change, and which spec makes it real?" — without re-deriving it from screenshots.

**Why this priority**: Enables Specs 043/053/055 to pick the work up cleanly; documentation-only, so lowest build risk.

**Independent Test**: Every setting in the field matrix has a producer, at least one named consumer surface, a backend dependency note, and a named future owner.

**Acceptance Scenarios**:

1. **Given** any setting, **When** looked up in the cross-surface impact register, **Then** it names its editor, its consumer surfaces and roles, its backend dependency, and its future owner.
2. **Given** any capability deliberately not built here, **When** looked up in the future-owner register, **Then** it names the owning spec and the reason it was deferred.

---

### Edge Cases

- **A deep-link that would pass with JavaScript disabled.** `general` is the baked default tab, so `settings.html#view=general` proves nothing on its own. Every deep-link test MUST be discriminating: pre-seed the *opposite* tab in the existing `academy.schedView.settings` key, load the URL in a **fresh context**, and assert the hash still wins.
- **A category with no planned item left.** After Spec 040 no category anywhere has a planned item; the dashboard planned-item click probe has nowhere left to be repointed and would fail on a "selector not found". It must be superseded, not deleted — see `protected-test-supersession-register.md`.
- **Legacy defects that must not be reproduced**: the message-builder 504; Send-Backup firing a real backup with no confirmation; PayPal defaulting to **Live** mode while Payoneer defaults to Sandbox; credentials in plain-text inputs; a duplicated "Upload families" import card; 11 status colours collapsing to 7 hex values; the WhatsApp insights page leaking a live group-invite URL and unmasked phone numbers; `Key 1` / `Key 2` as credential labels.
- **The two pay traps inside Settings**: legacy's General → Teachers tab is a complete teacher-pay engine (hour rates, rate tiers, salary period, late-start discount), and `Teacher Absent Student Class Rate` ("what percentage of the class price is added to the teacher's salary") hides inside the Courses & Classes tab. Both are **excluded by the teacher pay-free law**; the automation group must be imported **without** that one rate field.
- **The import column contract is itself a law breach.** Legacy's required-column reference for the families import includes a **plaintext `password`** column, and both the teachers and families contracts include **`hour_rate`** and `currency`. Publishing those contracts verbatim would breach the no-secret law *and* the teacher pay-free law in one table. The rendered column reference MUST omit the credential and pay columns; they are backend-owned (privacy → Spec 043, pay → the payroll backend).
- **A "backup send" page that is not a backup page.** Legacy's `…/security/data/backup/send` is a **302 redirect to the Email/SMTP integration** — clicking Send Backup fired a real database backup and landed the user one tab away from the SMTP password field. The rebuild must not reproduce that flow: Send Backup is a confirm + gate, and no SMTP secret surface exists.
- **An empty state that misleads**: a provider catalog with a filter that yields nothing must show an honest empty state; `enhance.js` supports exactly **one** global `[data-no-results]` per page, so at most one filterable region may exist on the Settings page.
- **Long forms on a 390px viewport**: the notification matrix and provider configuration must remain usable, scroll-contained, and free of horizontal page overflow in both RTL and LTR.

---

## Requirements *(mandatory)*

### Functional Requirements — navigation & routing

- **FR-001**: All six planned Settings nav items MUST become real, implemented links; the Settings category MUST contain **zero** «قريبًا» items after this spec.
- **FR-002**: The six routes MUST be exactly `settings.html#view=general`, `#view=integrations`, `#view=customization`, `#view=notifications`, `#view=security`, `#view=users` (and the mirrored `settings.en.html#view=…` in English, resolved by the existing hash-aware language route helper).
- **FR-003**: Each deep-link MUST open **exactly one** visible tabpanel — the targeted one — on a fresh page load, in both languages, with no external request.
- **FR-004**: The public HTML count MUST remain **115** with **0 new page bases**; the admin menu MUST remain **50** items; the Settings category MUST remain **7** items.
- **FR-005**: `FUTURE_ROUTES` MUST remain free of all six settings ids (it is already empty; no entry may be added).
- **FR-006**: `classSalaryReport` MUST remain an honest `disabled` lock with its reason key and no route — it is a finance lock, categorically distinct from a planned item.
- **FR-007**: No Settings capability may be given a new nav item; payment methods MUST be reached inside the Integrations tab, keeping the admin menu at 50.

### Functional Requirements — form completeness

- **FR-008**: Every evidenced field in `settings-complete-field-matrix.md` MUST resolve to exactly one disposition: **rendered**, **structure-only (sensitive)**, or **omitted-by-law with a named owner**. Silent omission is a defect.
- **FR-009**: The General tab MUST render the academy-identity group, the location group, the expense-heads lookup, **and** the course/class automation group (the evidenced renewal, cancellation-window, auto-makeup, credit, unclosed-class and pre-class-entry rules), each grouped with inline help describing what it governs.
- **FR-010**: The Notifications tab MUST render the complete evidenced routing matrix — every section, both recipients, every channel select, every lead-time numeric and every per-event control — and MUST NOT be reduced to a handful of generic toggles.
- **FR-011**: The Customization tab MUST render the complete evidenced appearance set (brand colours, theme, container width, sidebar type, card style) **and** the full class/session status palette, not a reduced pair of colour pickers.
- **FR-012**: The Security tab MUST render every evidenced import type with its accepted format and required-column reference, the backup destination, and both policy documents.
- **FR-013**: The Integrations tab MUST render all 11 evidenced providers, grouped by category, each opening a configuration surface carrying that provider's **specific** evidenced field structure with meaningful labels — generic `Key 1` / `Key 2` labelling is forbidden.
- **FR-014**: Every form MUST declare purpose, section grouping, required/optional status, field type, options, defaults, conditional visibility, validation intent and inline help, per `forms-modals-interactions-register.md`.
- **FR-015**: No field may be invented; every rendered field MUST trace to a cited evidence source.

### Functional Requirements — honesty & safety

- **FR-016**: Every final write action (Save, Connect, Test connection, Import, Upload, Download template, Send backup, Reset, Enable 2FA, Publish policy, Activate payment method) MUST be an honest `data-disabled-reason` backendRequired gate, or a safe local preview that claims no persistence. There is no third option.
- **FR-017**: Theme and language MUST remain genuinely functional and persist via the **existing** storage keys; they MUST be labelled as personal preferences, not academy-wide saved settings. They are the only sanctioned real writes in Settings.
- **FR-018**: **Zero** `type="password"` and **zero** `type="file"` inputs may exist anywhere; sensitive fields MUST be represented as structure-only rows (label + requirement + purpose), never as inputs.
- **FR-019**: **No** authored credential value may exist in any fixture or locale module — no API key, client secret, HMAC, SMTP password, OAuth token or webhook secret, and no realistic-looking placeholder for one.
- **FR-020**: No provider may ever display a "connected" state; the honest status vocabulary is limited to {not connected · available to connect · unavailable}, each rendered as an **icon + text** chip.
- **FR-020a**: Any rendered import column reference MUST exclude the legacy `password` column and the `hour_rate` / `currency` pay columns. A required-column reference is permitted only for non-sensitive, non-pay columns; the excluded columns are recorded in the future-owner register.
- **FR-021**: No fake persistence, connection, test result, pairing, delivery, import, backup, policy save, theme save, activation, OAuth, network request or success toast may exist.
- **FR-022**: Destructive or expensive actions (send backup, import, reset to default, delete payment method) MUST require a confirmation **before** the gate; the confirmation itself MUST perform no mutation.
- **FR-023**: No new interaction hook, storage key, engine, CSS framework, page or dependency may be introduced; the closed `data-*` hook set and `package.json` are unchanged.

### Functional Requirements — role, permission & carried-forward law

- **FR-024**: Settings MUST remain admin-only. Teacher, family and student surfaces MUST gain no Settings route, no integration configuration, no payment-credential access, no notification-routing administration, no security import/backup control, and no customisation administration.
- **FR-025**: The **teacher pay-free law** MUST hold: no hour-rate, rate-tier, salary-period, fine/discount, class-rate or any pay figure may appear on any Settings surface. The evidenced legacy teacher-pay-rules tab and the `Teacher Absent Student Class Rate` field are **excluded**; the only permitted trace is the existing non-numeric "managed in Finance" pointer. The salary-event notification row is routing-only and carries no figure.
- **FR-026**: The **family zero-pay**, **student child-view** and **finance no-fake-money** laws MUST hold unchanged; the Spec 039 content/certificate honesty and the `classSalaryReport` lock MUST hold unchanged.
- **FR-027**: The spec MUST document, per domain, which admin permission views and which edits it, and MUST record that hiding links is not enforcement — real route/API denial is a backend obligation owned by Spec 043.
- **FR-028**: No new privacy weakness may be introduced. The legacy WhatsApp-insights surface (unmasked phone numbers and a live group-invite URL) MUST NOT be reproduced in Settings; it is recorded as a messaging-diagnostics capability owned by a later spec.

### Functional Requirements — presentation

- **FR-029**: Presentation MUST be chosen per interaction: the six domains are **inline tabs**; provider configuration is a **side drawer**; destructive actions are **confirmation modals**. A long configuration form MUST NOT be placed in an undersized modal.
- **FR-030**: Every drawer/modal MUST have accessible focus behaviour, Escape handling, a clear close control, scroll containment, a reachable save/cancel area, mobile-390 support, RTL/LTR and light/dark correctness, no clipped content and no nested modals.
- **FR-031**: All status and state signals MUST be conveyed by **icon + text**, never colour alone.
- **FR-032**: Arabic RTL is primary and English LTR is mirrored, with locale parity at zero divergence and zero raw locale keys.

### Key Entities

- **Settings domain**: one of the six — general, integrations, customization, notifications, security, users — each mapping 1:1 to an existing tab id, a nav id, and a deep-link route.
- **Setting**: a single configuration value; carries evidence source, type, group, required/optional, default, help, disposition (rendered / structure-only / omitted-by-law), consumers, backend dependency and future owner.
- **Provider**: an integration entry; carries name, category (payments-incoming / payouts-outgoing / communications), authored honest status, its specific field structure, which fields are sensitive, and whether it requires a webhook or a sandbox/live mode.
- **Payment method**: a configured instance of a payment-gateway provider; lives inside the Integrations tab, never as its own nav item.
- **Gate**: a `data-disabled-reason` backendRequired final action — the only way a write may end.

---

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: An admin can reach each of the six Settings domains **in one click from the sidebar**, in both languages; the number of Settings destinations that require hunting inside a hub drops from 6 to 0.
- **SC-002**: **Zero** «قريبًا» items remain anywhere in the product (sitewide planned count 6 → 0), while the admin menu stays at 50 items and the page count stays at 115.
- **SC-003**: Every evidenced Settings field is accounted for: **100%** of the fields in the field matrix carry one of the three dispositions, and **0** fields are silently dropped.
- **SC-004**: The configuration surface an admin can actually see and act on grows from **2 form fields** to the complete evidenced set across the six domains, with **0** invented fields.
- **SC-005**: **Zero** credentials exist anywhere: 0 password inputs, 0 file inputs, 0 authored keys/secrets/tokens/webhook secrets, and 0 provider states reading "connected".
- **SC-006**: **100%** of write actions are honestly gated or are labelled local previews; **0** fake-success messages and **0** external network requests occur across the suite.
- **SC-007**: Accessibility holds at **critical = 0, serious = 0** across all six tabs in both languages, both themes, at 390px and desktop, including every open drawer and confirmation.
- **SC-008**: **Zero** console errors across the screenshot suite, and every non-Settings page body remains byte-identical to the committed baseline.
- **SC-009**: Locale parity remains at **zero divergence** with **zero raw locale keys** rendered.
- **SC-010**: Every setting has a documented producer, consumer set, backend dependency and future owner — **100%** coverage in the cross-surface impact register.

---

## Assumptions

1. **The six nav ids are read from source, not inferred from the brief.** They are `settingsGeneral`, `settingsIntegrations`, `settingsCustomization`, `settingsNotifications`, `settingsSecurity`, `settingsUsers` (`nav.config.js:110–115`). The brief's expected sixth domain, *Payment Methods*, is not a nav item; it is the Payments (incoming) group inside Integrations. This correction is recorded rather than silently reconciled.
2. **Deep-link + in-place completion, not new pages.** Every one of the six already has a 1:1 tab, so new page bases would duplicate surfaces and break the 115/50 freeze for no navigational gain. Count impact is 0, matching Spec 033's contract.
3. **`settingsUsers` routes to `settings.html#view=users`, not `staff.html`.** Spec 033 left this open ("`settings.html#view=users` **or** `staff.html`"). Routing to the Users tab gives each of the six a distinct destination, keeps `staff.html` the single canonical staff directory (per Spec 031), and preserves the existing real link from the Users tab onward to it. The alternative is recorded in `page-vs-fold-decision-register.md`.
4. **Sensitive fields are structure-only rows, not inputs.** The brief permits showing "labels and required structure"; project law forbids `type="password"` and credential inputs. Rendering a sensitive field as a labelled, non-input structure row satisfies both, keeps the sitewide no-secret assertions unweakened, and still tells the academy exactly what each provider will require.
5. **Layout/colour customisation is display-only.** Making container width, sidebar type, card style and the colour palette genuinely live would require new interaction hooks and new storage keys, which standing law forbids. Theme and language stay real because they already own sanctioned hooks and keys.
6. **The teacher-pay content inside Settings is excluded, not deferred into Settings.** It is owned by the future payroll/billing backend spec, alongside the `classSalaryReport` lock.
7. **The message-builder has no usable legacy evidence** (its only capture is a 504 Gateway Timeout). It stays an honest, owned future item; it will not be invented.
8. **The 041–057 roadmap in the brief supersedes the corpus.** The committed spec corpus contains only Spec 041 (as a final re-freeze); Specs 042–057 appear nowhere in it. The brief's roadmap — with 041 redefined as a *route/sidebar baseline freeze* rather than the final product freeze — is recorded as a maintainer-directed, append-only roadmap amendment in `future-owner-register.md`.
9. **Baseline is the green Spec 039 working tree** at HEAD `4cbcb31`, with the commit gate declared as an authorised exception (see §Baseline Gate).

---

## Scope

**In scope**: the Spec 040 specification artifacts; exhaustive Settings grounding; the six route/page/fold decisions; complete Settings-domain field matrices; forms/modal/interaction requirements; no-fake and credential-safety requirements; the planned-item test supersession design; count/menu/route/impact contracts; future ownership; cross-surface impact documentation.

**Out of scope**: `plan.md`; `tasks.md`; implementation; application source changes; test changes; generated HTML changes; backend/API/database/auth; real OAuth; real provider connections; real WhatsApp/Zoom/Meet/payment integration; real email delivery; real imports/backups; real payment processing; the full privacy backend (Spec 043); the global modal/drawer overhaul (Spec 044); full integrations (Spec 053); the embedded classroom (Spec 054); full propagation (Spec 055); the system-wide forms audit (Spec 056); the final production freeze (Spec 057); any commit or push.

---

## Open Questions (recorded, with safe defaults — none blocking)

| # | Question | Options | Recommendation (safe default) | Impact | Owner if deferred |
|---|---|---|---|---|---|
| OQ-1 | Does `settingsUsers` route to the Settings Users tab or to `staff.html`? | **A** `settings.html#view=users` · **B** `staff.html` · **C** both (two items, one route — precedent exists: `addTeacher`/`teacherCategories`) | **A** — distinct destination per item; `staff.html` stays the canonical directory reachable by the existing real link. | Route only; count/menu unchanged either way. | Spec 041 re-freeze |
| OQ-2 | How is the planned-item click probe superseded once sitewide planned = 0? | **A** move the behavioural probe to an isolated specimen on the existing `gallery.html` component page + assert sidebar planned = 0 · **B** keep one dishonest planned item · **C** retire the probe with a source-level assert only | **A** — preserves the coming-soon component's behavioural coverage without a lying nav item. **B is rejected as dishonest.** **C is the fallback** if touching `gallery.html` is judged out of the impact boundary. | Adds `gallery.html` to the changed-body list under option A. | Decided in `/speckit.plan` |
| OQ-3 | Where does the redesigned message-builder land? | **A** Spec 053 (Integrations Command Center — channel templates) · **B** Spec 045 (Admin General Operations & Communications Review) · **C** permanently rejected | **A** — it is inseparable from real channel providers, and no legacy evidence exists to design it from. | None in 040 (stays a gate). | Spec 053 |

---

## Artifacts

| Artifact | Purpose |
|---|---|
| `targeted-visual-grounding.md` | Every source read and every screenshot opened, with what was seen |
| `current-app-settings-inventory.md` | Exact current nav/tab/field/action/gate/fixture/locale/test inventory, with classifications |
| `legacy-settings-coverage.md` | Legacy routes, records and capability coverage per domain |
| `settings-nav-completion-register.md` | The six items: id → status → route → surface → gaps → disposition |
| `general-settings-scope.md` · `integrations-scope.md` · `notification-settings-scope.md` · `security-settings-scope.md` · `customisation-settings-scope.md` · `payment-methods-scope.md` | Per-domain scope |
| `settings-complete-field-matrix.md` | Every evidenced field, its disposition and owner |
| `integration-provider-field-matrix.md` | Every provider, category, field structure, sensitivity, webhook/mode needs |
| `notification-routing-matrix.md` | The complete event × recipient × channel matrix |
| `forms-modals-interactions-register.md` | Per-form purpose, grouping, states, presentation and a11y requirements |
| `settings-cross-surface-impact-register.md` | Producer → consumers → roles → backend dependency → future owner |
| `page-vs-fold-decision-register.md` | Option A/B/C/D quantified per item |
| `count-and-route-contract.md` | Count, menu, route, FUTURE_ROUTES and impact contract |
| `role-permission-and-sensitive-data-carryover.md` | Admin-only permissions; carried role laws; sensitive-data rules |
| `no-fake-settings-integrations-register.md` | Allowed vs forbidden; every action's honest class |
| `protected-test-supersession-register.md` | The two declared supersessions, verbatim |
| `future-owner-register.md` | Everything deferred, with its owner, through Spec 057 |
| `checklists/requirements.md` | Specification quality checklist |
