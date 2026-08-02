# C09 — Settings · Capability Reconciliation Audit (Spec 042)

**Method**: 47 screenshots opened AS IMAGES (38 legacy · 9 current), 14 raw records read
(7 page `.json`, 3 raw `.html` greps, the cluster path list, 2 Spec-040 contracts, plus the current
source under `app/src/js/`). Raw HTML/JSON beat every planning summary; where a Spec-040 artifact
disagreed with the shipped code, the code won (see §Evidence conflicts).

Prior owners cited (NOT re-litigated):
- Spec 031 — folded the six settings sub-domains into ONE tabbed hub (0 page delta).
- Spec 040 — completed all six tabs in place, unlocked the six deep-links, and settled
  presentation (`specs/040-settings-deep-links-subpages/contracts/modal-long-form-presentation-contract.md`),
  sensitive fields, payment-methods fold and the future-owner map (FO-01…FO-26).
- Spec 041 — the route/sidebar freeze (settings deep-links are among the 24).

---

## 1. What the legacy actually is (proved from images + raw forms)

| Legacy surface | Raw evidence | Real control count |
|---|---|---|
| `settings/general` → **General** tab | `pages/management-settings-general.json` form `general/update` | 11 (7 text + `logo` type=file + 3 selects) |
| `settings/general` → **Teachers** tab | same file, form `general/teachers/update` | **10 pay controls** (default session rate, hour-rate tier rows, `salary_period_type`, `salary_period_day`, `applayFins`, `fin[10]`, late-start discount %) |
| `settings/general` → **Courses & Classes** tab | same file, form `general/courses-classes/update` | 18 (incl. `rate_student_absent` = % of class price added to the **teacher's salary**) |
| `settings/general` → **Accessibility** tab | same file, form `general/accessibility/update` | 2 (`tfa` checkbox, `otp` text — ONE shared OTP phone for ALL admins) |
| `settings/notification` | `management-settings-notification.json`, form `notification/update` | **47** (48 fields − `_token`) |
| `settings/customisation/personalisation` | `…-personalisation.json` | 35 raw inputs → **17 distinct controls** (2 brand colours, theme, container layout, sidebar type, card style, 11 class-status colours) + Apply-for-me + Reset |
| `settings/customisation/message-builder` | `…-message-builder.json` | **504 Gateway Timeout** — 0 forms, 0 buttons (image opened: "Gateway Timeout") |
| `settings/security/data` | `…-security-data.json` | 4 import forms (`type=file`, .xlsx) + 4 required-column tables (**39 columns**) + 3 template links + backup "To" + **`Send Backup` = a bare `<a href=…/backup/send>`** |
| `settings/security/data/backup/send` | screenshot | fires a **real DB backup with NO confirm**, banners "Database backup has been initiated successfully.", then **silently redirects to the Email/SMTP integration page** |
| `settings/security/policy` | `…-security-policy.json` | 2 Quill editors — **both EMPTY** (`ql-blank`, `ql-disabled`) on the captured tenant |
| `settings/integrations` | raw html | 11 provider cards, **all 11 ship `is_enabled=1 checked`** while every provider shows "No data found" |
| `settings/integrations/{1..11}/configure` | 11 screenshots | WhatsApp (Start Setup), 6 payment tables (Key 1/Key 2/Client Secret **printed as table columns**), 2 payout credential forms (Client ID/Secret/Username/**Password**, webhook URL), Custom (a REAL row: `أحمد محمد` / `01015264856`), Email (Accounts / Add Account / Mail Settings: SMTP host+port+encryption) |
| `settings/payments/create?payment_method=1..7` + `payments/1/edit` | 8 screenshots | provider credential create forms. **PayPal defaults to `Live`.** XPay methods = Card · Fawry · Meeza Digital \| mobile wallets · Kiosk Aman. Paymob = Secret/Integration ID/Public/HMAC/API + region radio |
| `settings/integrations/whatsapp/{families,teachers}/insights` | 2 screenshots | "Names of Null groups" — real names, **unmasked phones**, real e-mails, and a **live `https://chat.whatsapp.com/…` invite URL** |

Import column contract (counted from the raw HTML `<td>`s, not from a summary):
39 columns total; **`password` ×1 (families), `hour_rate` ×2 (teachers+families), `currency` ×3** ⇒ 6 rejected ⇒ **33 safe**.
Our `SECURITY_IMPORTS` renders exactly 8 + 12 + 7 + 6 = **33**. ✔
The 4th card is **mislabelled "Upload families"** in the legacy UI; the raw form is `type=4` / `invoices_file` — our fixture uses the functional name (invoices) and correctly ships **no** Download-Template control for it (legacy has none).

## 2. What we ship today (`settings.html#view=…`, 6 tabs)

`app/src/js/pages/settings.js` + `fixtures/settings-management.js` + `fixtures/settings-notifications.js`.
73 `field()` controls · 49 booleans · 60 structure-only rows · ~60 gates · **0 `type=password`, 0 `type=file`, 0 `<canvas>`, 0 authored secret, 0 real PII**. Theme + language are the ONLY real writes.

## 3. Findings that matter

**We are materially SAFER than legacy in five places — preserve, never "fix back":**
1. **Provider credentials** → 24 STRUCTURE-ONLY rows (label + required + purpose, *no value slot by construction*). Legacy renders 15 of them as plain `type=text`, prints saved keys in tables, and has 2 real `type=password`.
2. **PayPal / Payoneer environment** → we default **Sandbox**; legacy PayPal defaults **Live**.
3. **Integration enablement** → every card is `غير مُعدّ` (notConfigured) and **no card carries an enable control**; legacy ships all 11 `is_enabled` ON with nothing configured.
4. **Backup** → destination field + two honest gates + standing scope/destination/permission/audit copy; legacy fires a real DB backup from a bare link with **no confirm** and then silently redirects to SMTP.
5. **PII** → the corpus' real names/phones/e-mails and the live WhatsApp invite URL are nowhere in our build.

**Real remaining gaps (not law-driven):**
- **Colour pickers**: we render `swatch + hex text field()`. Legacy has 13 real `<input type=color>`. An admin cannot pick a colour, only type a hex. (PARTIAL — C09-10.)
- **Country/city lookup**: legacy ships 251 countries × cities + a "Show Country List" reference modal with a **Copy** button. We ship a 4-country / 3-city authored list and no code reference. (PARTIAL — C09-02.)
- **Email accounts**: legacy manages a LIST of accounts (Default flag, Status, per-row settings, Add Account). We ship a single configuration drawer with no account list. (PARTIAL — C09-25.)
- **Payment-method instances**: legacy creates **named instances per provider**, shows a `Number Of Family` assignment count, and edits/deletes them. We ship an honest empty state and no instance model. Spec 040 (`payment-methods-fold-contract.md`) folded the 7 create variants into the 7 Configure drawers — that decision stands — but the *instance list + family assignment* is still an unowned capability. (PARTIAL — C09-22, owner 053.)
- **Policy authoring**: read-only body + Edit gate; no rich-text authoring. The legacy prose is **UNKNOWN** (both editors were empty on the captured tenant), so nothing was lost — but the capability is not delivered. (PARTIAL — C09-17.)

**Modal / drawer (→ Spec 044, FO-23):**
- The provider Configure drawer is long (up to 2 safe fields + 5 sensitive rows + toggles + info + 2 gates) and `formDrawer()` puts the single Save **at the end of the scrolling body** — there is no sticky footer (`components/preview-drawer.js:32-38`; `.sheet-body` scrolls, `.sheet-head` does not). On a 440px / mobile sheet the primary final is below the fold with no affordance. 044 should give `formDrawer` a sticky action bar.
- `formDrawer(id, {fields})` wraps whatever it is given in a `.wiz-grid`; `settings.js:333` passes a full composite block (sections, notes, gate rows) into that slot. It renders, but a grid container holding non-field sections is a structural smell for 044 to formalise.

**Visual (→ 045–050 group; FO-25 assigns Settings re-review to 048):**
- Our 11 provider cards are identical monochrome grid-icon tiles — brand-blind and hard to scan. The legacy cards carried brand gradients/logos. We should not copy their branding assets, but we need *some* per-provider identity (mono glyph + a category accent) or the catalogue reads as an undifferentiated grey wall (see `app/screenshots/settings__ar__dark__desktop__sp040-integrations-dark.png`).
- The Notifications tab is a very long single-column stack of ~34 toggles; correct and honest, but visually it is a generic corporate ERP form. It carries no academy warmth at all.
- General/Security tabs are card-stacks with no illustration, no empty-state character, no colour beyond the status chips. The academy identity (cheerful, modern, academic) is essentially absent from the whole hub.

## 4. Evidence conflicts (resolved from raw evidence)

1. **`future-owner-register.md` FO-11** says the backup is *"confirm + gate"*. The shipped code
   (`pages/settings.js:248-257`) uses `primaryGate()` + `gate()` and **zero `data-confirm`** — matching
   `modal-long-form-presentation-contract.md` §2 ("Zero confirm dialogs are added"). **The code + the
   presentation contract are right; the FO-11 phrasing is stale.** Recorded, not "fixed" (042 is doc-only).
2. **The C09 path list is short by two records.** It lists 27 pages, but the corpus holds **29** settings
   records: `management-settings-notification.json` and `management-settings-customisation-message-builder.json`
   are absent from the list (they carry different module tags) even though both are squarely in the current
   scope (the Notifications tab; Customization → Message Builder). Both were inspected anyway.
3. **Legacy label vs raw form** on import card 4 ("Upload families" in the UI, `type=4`/invoices in the DOM) —
   the raw form wins; our fixture is correct.

## 5. Owners

| Item | Owner |
|---|---|
| Real provider connections / payments / payouts / WhatsApp pairing / SMTP accounts / Message Builder | **053** (FO-01…FO-07) |
| WhatsApp insights (PII leak + capability) | **043** (privacy) · **045** (messaging capability) — FO-18 |
| `password` import column · RBAC enforcement · 2FA/OTP | **043** (FO-12, FO-16, FO-17) |
| Teacher pay rules · `rate_student_absent` · `hour_rate`/`currency` columns · `classSalaryReport` | **payroll backend** (FO-13, FO-14, FO-15) |
| Sticky drawer footer / long-form system | **044** (FO-23) |
| Settings visual redesign | **048** (FO-25) |
| Palette/layout persistence + cross-surface propagation | **055** (FO-19…FO-22) |
| Real import (validation/dry-run/undo) + real backup execution | backend (FO-10, FO-11) |

## Disposition summary (normalized — Spec 042 ledger source)

| capId | capability | disposition | owner | evidence anchor |
|---|---|---|---|---|
| C09-01 | Settings 6-tab hub (six legacy sub-domains folded; 73 controls; theme+language only real writes) | COMPLETE_BUT_VISUAL_REVIEW_REQUIRED | 048 | §2 What we ship today / §3 Visual |
| C09-02 | Country/city lookup (251 countries + Show-Country-List reference modal w/ Copy) | PARTIAL | not stated | §3 Real remaining gaps |
| C09-03 | Security import column contract (39 legacy columns → 33 safe rendered exactly 8+12+7+6) | COMPLETE_AND_VERIFIED | — | §1 Import column contract |
| C09-04 | Customisation → Message Builder | UNKNOWN_EVIDENCE | 053 | §1 (504 Gateway Timeout) / §5 Owners |
| C09-05 | Provider credential rendering (24 structure-only rows, no value slot by construction) | INTENTIONALLY_IMPROVED | — | §3 Safer #1 |
| C09-06 | PayPal/Payoneer environment default (Sandbox vs legacy Live) | INTENTIONALLY_IMPROVED | — | §3 Safer #2 |
| C09-07 | Integration enablement honesty (notConfigured, no enable control vs 11× is_enabled ON) | INTENTIONALLY_IMPROVED | — | §3 Safer #3 |
| C09-08 | Backup action honesty (destination + gates + scope/permission/audit copy vs no-confirm bare link) | INTENTIONALLY_IMPROVED | — | §3 Safer #4 |
| C09-09 | Porting of real legacy PII (names/phones/e-mails/live WhatsApp invite URL) | REJECTED_PRIVACY | — | §3 Safer #5 |
| C09-10 | Colour pickers (swatch + hex text vs 13 legacy input type=color) | PARTIAL | not stated | §3 Real remaining gaps |
| C09-25 | Email account list management (Default flag / Status / per-row settings / Add Account) | PARTIAL | 053 | §3 Real remaining gaps / §5 Owners |
| C09-22 | Payment-method instance list + Number-Of-Family assignment count + edit/delete | PARTIAL | 053 | §3 Real remaining gaps |
| C09-17 | Policy rich-text authoring (legacy prose UNKNOWN — both Quill editors empty on captured tenant) | PARTIAL | not stated | §3 Real remaining gaps |
| C09-11 | formDrawer sticky action footer (Save below the fold on long Configure drawers) | PARTIAL | 044 | §3 Modal / drawer (FO-23) |
| C09-12 | formDrawer `.wiz-grid` wrapping composite non-field blocks (structural smell) | PARTIAL | 044 | §3 Modal / drawer (FO-23) |
| C09-13 | Provider card per-provider identity (11 brand-blind monochrome tiles) | COMPLETE_BUT_VISUAL_REVIEW_REQUIRED | 048 | §3 Visual (FO-25) |
| C09-14 | Notifications tab visual form (long single-column ~34-toggle stack, no academy warmth) | COMPLETE_BUT_VISUAL_REVIEW_REQUIRED | 048 | §3 Visual (FO-25) |
| C09-15 | Real provider connections / payments / payouts / WhatsApp pairing / SMTP send | FUTURE_BACKEND | 053 | §5 Owners (FO-01…FO-07) |
| C09-16 | WhatsApp families/teachers group insights (privacy-safe capability rebuild noted for 045) | REJECTED_PRIVACY | 043 | §1 insights row / §5 Owners (FO-18) |
| C09-18 | `password` import column | REJECTED_SECURITY | 043 | §1 Import column contract / §5 Owners (FO-12) |
| C09-19 | RBAC enforcement | FUTURE_BACKEND | 043 | §5 Owners (FO-16) |
| C09-20 | 2FA / shared admin OTP phone (`tfa` + one OTP text for ALL admins) | REJECTED_SECURITY | 043 | §1 Accessibility tab / §5 Owners (FO-17) |
| C09-21 | Teacher pay rules · `rate_student_absent` · `hour_rate`/`currency` import columns | REJECTED_PAY_FREE | backend | §1 Teachers tab / §5 Owners (FO-13…FO-15) |
| C09-23 | classSalaryReport | HONEST_LOCK | backend | §5 Owners (FO-15) |
| C09-24 | Palette/layout persistence + cross-surface propagation (Apply-for-me / Reset) | PARTIAL | 055 | §1 personalisation row / §5 Owners (FO-19…FO-22) |
| C09-26 | Real import execution (validation/dry-run/undo) + real backup execution | FUTURE_BACKEND | backend | §5 Owners (FO-10, FO-11) |

Honest counts: screenshotsOpened=47 · recordsInspected=14 · currentSourceFiles=not stated
