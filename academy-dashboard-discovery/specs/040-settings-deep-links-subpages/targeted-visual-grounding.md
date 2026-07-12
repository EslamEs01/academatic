# Targeted Visual Grounding — Settings (Spec 040)

**Gate**: every claim below traces to a file that was opened, or is marked **UNKNOWN**. Screenshots were opened as images, not listed as paths.

## 1. Current application source read (exact files)

| File | What was established |
|---|---|
| `app/src/js/nav.config.js` (full, 158 lines) | The 6 categories, all 50 items, the **six settings ids at L110–115**, `FUTURE_ROUTES` = **empty `{}`** (L141–148), `classSalaryReport` disabled lock (L90), the build-time dead-link guard (L151–157) |
| `app/src/js/pages/settings.js` (full) | The 6-tab hub (`tabs({group:'settings'})`), 12 `.set-section`s, **2 form fields total**, 36 actions, 23 gates |
| `app/src/js/fixtures/settings.js`, `fixtures/settings-management.js` | Authored fixtures; **no credential value**; dead `SETTINGS[0]` (`id:'profile'`) never rendered |
| `app/src/js/components/tabs.js` | `#view=` mechanism; first tab = baked default; roving tabindex |
| `app/src/js/components/sidebar.js` | planned → `button.nav-item.is-planned[data-coming-soon]`; disabled → `button[aria-disabled][data-disabled-reason]`; implemented → `<a href=langRoute()>`; `langRoute()` is hash-aware |
| `app/src/js/components/preview-drawer.js`, `form-field.js`, `confirm-modal.js`, `filter-bar.js`, `card-grid.js`, `states.js`, `status-chip.js`, `settings-section.js` | Reusable primitives; `field()` supports only `text · number · select · textarea` (so `type=password`/`type=file` are structurally unreachable) |
| `app/src/js/enhance.js` (full) | The CLOSED `data-*` hook set; storage keys = `academy.rail`, `academy.navCategory`, `academy.schedView.<group>`, `academy.theme`, `academy.lang`; `data-drawer` dispatches before `data-modal-trigger`; catch-all → honest «يُتاح بعد ربط الخادم» |
| `app/src/js/i18n.js` | 13 mirrored locale pairs registered |
| `app/src/locales/ar.adm.js`, `en.adm.js` | `adm.set.*` = 121 keys each (403 total per file, 0 divergence); unused keys prove intended-but-unbuilt scope (`gen.automation*`, `sec.tfa*`, `integ.configure*`) |
| `app/src/locales/ar.extra.js`, `en.extra.js` | `set.*` = 43 keys each |
| `app/scripts/build-html.mjs` | PAGES = 58 bases × 2 langs = 115 + index; settings entry at L101 |
| `app/src/styles/app.css` | `.set-section/.set-row/.set-label/.set-help/.perm-*`; no other `set-*` class |
| `app/public/settings.html` (built) | `type=password` 0 · `type=file` 0 · `<canvas>` 0 · credential-like strings 0 · `href="#"` 0 · gates 24 · `data-coming-soon` 6 |
| `app/tests/smoke/run.cjs` (full) | Every protected assertion; `settingsPlanned === 6` (L1446, L2340); the planned-item click probe (L223–230); the nav.config source audit (L2347–2363); a31 settings honesty (L1193–1197) |
| `app/tests/a11y/run.cjs`, `tests/screenshots/capture.cjs`, `screenshots/REVIEW.md`, `app/package.json` | a11y route list (6 settings rows), 347 capture frames, review structure, npm scripts |
| Specs 031 / 032 / 033 / 034–039 contracts | Standing law, the 033 roadmap row for 040, the 038/039 supersession precedent, the 039 non-destructive impact method |

## 2. Legacy screenshots opened visually — 64 of 64

Every scoped screenshot under `output/roles/admin/screenshots/` matching the required slugs was **opened as an image**. Breakdown:

| Group | Count | Opened by |
|---|---|---|
| `management-settings-general-*` (full + 4 tab interactions) | 5 | full → this session; interactions → grounding agent |
| `management-settings-notification-*` (full + interaction) | 2 | full → this session; interaction → agent |
| `management-settings-integrations-*` (catalog + 11 configure variants, full + interactions) | 24 | agent (all 24 opened) |
| `management-settings-customisation-*` (personalisation full + interaction, message-builder) | 3 | full → this session; rest → agent |
| `management-settings-security-*` (data, backup-send, policy; full + interactions) | 8 | data/policy full → this session; rest → agent |
| `management-settings-payments-*` (7 create variants × 2, edit × 2) | 16 | agent (all 16 opened) |
| `management-settings-integrations-whatsapp-*-insights-*` | 4 | agent |
| **Total** | **64** | — |

Also opened: current-app frames `settings__ar__light__desktop__sp031-settings.png` and `…sp031-integrations.png` (to see what Spec 031 actually shipped).

**Result of the interaction-frame audit**: every `*-001-page-interaction-001.png` in the payments and integrations sets captured only the **top-right avatar menu** being opened — the crawler never opened a dropdown. Therefore **no provider option-list is recoverable from images**; the option lists in this spec come from the raw HTML records instead. Recorded rather than guessed.

## 3. Legacy records read (not just listed)

- `output/roles/admin/pages/<slug>.{md,json}` — structured page records for all 7 settings routes + 11 integration variants + 8 payment forms
- `output/roles/admin/html/raw/<slug>.html` — **the only source where real form `action`s, input `name`s, `value`s, `checked`, `disabled` and `accept` survive** (the sanitized HTML rewrites every action to `#`). All authoritative field names in this spec come from here.
- `output/roles/admin/text/<slug>.txt`, `output/roles/admin/network/endpoints.json`, `output/roles/admin/role-map.{md,json}`
- `output/combined/`: page-inventory, route-graph, role-permission-matrix, shared-unique-pages, component-inventory, interaction-inventory, modal-inventory, form-inventory, table-inventory, button-coverage, missing-coverage, skipped-actions, llm-context, speckit-discovery
- `frontend-planning/`: 00, 01, 02, 03, 04, 05, 06, 07, 08, 09, 10, 12, 13
- `frontend-planning-deep/`: 00, 01, 02, 03-screenshot-review, 03-visual-patterns, 04, 05, 06, 07, 08, 09, 10, 11, 12, 13, 14, 15, 17, 18, 19, 20, `_parts/ALL-page-interpretations.md`, and the settings-bearing `_parts/c-batch-{08,09,11,14,15,18}.md` (verified byte-identical to the corresponding ALL- sections)
- Contact sheets `full__admin__Settings.png`, `full__admin__Messages-Notifications.png`, `contact-sheets/_index.json` — used for orientation only, never as sole evidence

## 4. What was SEEN (per domain)

**General** — 4 tabs (`General · Teachers · Courses & Classes · Accessibility`), no breadcrumbs. Identity form with company/Arabic-company/domain/email/phone/WhatsApp/logo, then a Location card (country/city/timezone/address) with the help line "Changing timezone will change all classes' admin time & date". One `Save changes`, no Reset, no required markers. **Tab 2 is a complete teacher-pay engine** (Default Rate of Session, `If greater than … Rate becomes …` hour-rate tiers, a Salary period selector, and a "Salary Tiers" section that is actually a **late-start discount/fine**). **Tab 3** holds the automation rules — and hides a second pay field, `Teacher Absent Student Class Rate` = 50 %, "What percentage of the class price should be added to the teacher's salary". **Tab 4** is ~90 % empty: one 2FA toggle (disabled, "No WhatsApp Connected") and a hidden OTP field, with its Save card hidden — the tab is inert.

**Notifications** — not a grid: a stack of sections, each with a master toggle, then per-recipient (Teacher / Family) channel selects and rows of event chips. 9 class events per recipient, asymmetric (teacher has *Teacher Absent*; family has *End class*). Reminders carry an hours-before numeric. Invoice / Invoice-reminder / Salaries / Family-status each get a channel select. Chips show a ✓ but have **no visible off-state** — colour-only encoding.

**Integrations** — a 2-column card grid under three headings: **Payments (incoming)** (Stripe, Paypal, Mollie, Xpay, Payoneer, Paymob, Custom), **Payouts (outgoing)** (Paymob Payout, Payoneer Payout), **Communications** (Whatsapp Free, Email) = **11**. Each card: gradient band, name, bare toggle, description, `Configure`. A chip row (Communication · Mail Service · Payments · Webhooks) that is **dead decoration**, not a filter. **No connection-status vocabulary anywhere.** On the two payout configure pages the Settings sub-nav goes **completely blank** — orientation is lost on precisely the two credential pages.

**Payment methods** — 7 full-page create forms (no modal, no drawer anywhere in the module), one `Submit` button each, no Cancel/Back/Delete/Test. **PayPal defaults to `Live`; Payoneer defaults to `Sandbox`** — same control, contradictory defaults. Every credential is a plain `type=text` input. Paymob's form ships a prefilled, real-looking Integration ID triple.

**Security** — Backup Settings = one destination email + `Save changes` + `Send Backup` (**no confirm**). Import Data = 4 upload cards (`.xlsx`), each with an info button revealing a static **Required Columns** table; the 4th card is **mis-titled "Upload families"** (it is invoices) and has no template link. Policy = two empty Quill editors (Family / Teacher) with **no visible Save** until a pencil is pressed; both policies post together.

**Customisation** — Global Appearance (2 brand colours with hex inputs + "Pick from logo", theme light/dark/**system**, container Full/Boxed, sidebar Expanded/Collapsed, card Bordered/Shadowed, and an **"Apply for me"** button that writes **localStorage only — no server write**), then Classes Statuses: **11 colour rows** badged "Applies globally to all users", plus Reset to Default. The 11 statuses collapse to **7 distinct hex values** — colour alone is literally ambiguous.

**Message Builder** — a bare **504 Gateway Timeout** page. Zero UI. **No capability evidence exists. UNKNOWN.**

**WhatsApp insights (×2)** — read-only tables (`# | Family name | Phone number | Group Name | Status`) rendered inside the Settings shell. The teachers page reuses the "Family name" header. It **leaks a live `chat.whatsapp.com/<invite-token>` group-invite URL in full**, plus unmasked phone numbers. Dead ends: they report who is unreachable and offer no action.

## 5. Recorded UNKNOWNs

| # | Unknown | Why | Disposition |
|---|---|---|---|
| U-1 | Message-builder fields, variables, preview | Only capture is a 504 | Never invented; honest gate; owner Spec 053 |
| U-2 | The provider chooser that seeds `?payment_method=N` | The upstream screen was never captured; no in-form selector exists | Rebuild derives the chooser from the provider catalog itself |
| U-3 | WhatsApp QR/pairing UI | Never rendered in any capture | Pairing stays a gate; no wizard invented |
| U-4 | Email "Add Account" tab | Recorded as the single missing-coverage gap | SMTP account management stays a gate |
| U-5 | The 4th import card's true type | Mis-titled "Upload families"; the raw HTML `type=4` + `invoices_file` proves it is **invoices** | Resolved from raw HTML, not from the label |
| U-6 | Whether the 2 unlabelled selects on the policy page mean language or version | No labels | Not reproduced; policy is display-only + gated edit |
| U-7 | RTL behaviour of the legacy payment/integration forms | Everything was captured in EN/LTR | Our RTL is authored, not ported |
