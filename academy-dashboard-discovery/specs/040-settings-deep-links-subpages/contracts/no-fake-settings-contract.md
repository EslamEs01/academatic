# Contract — No Fake Settings (Spec 040)

**Purpose:** the complete, cross-tab action ledger for the settings hub after Spec 040. Every clickable **final**
across all six tabs (general · notifications · customization · security · users · integrations) is classified into
exactly one of four honest classes, so no author can leave an unclassified control that silently drifts into a fake
success. Supersedes nothing in Spec 031's `no-fake-settings-contract.md` — it is the **superset**: Spec 031 fixed the
law (`Every Save/Save-changes = backendRequired gate; nothing persists`); Spec 040 is the first spec to exercise that
law at full scale (2 rendered fields → 73, 2 gates → ≈51) and this document is the resulting census.

---

## 1. The four classes

| Class | Definition | Hook | Reload behavior |
|---|---|---|---|
| **REAL** | Genuinely functional, immediate, client-only. The **only** members are the personal-preference pair. | existing `data-set-theme` / `data-set-lang` | persists (by design — it is a browser preference, not academy data) |
| **GATE** | A `<button data-disabled-reason>`. Click → the standing **backendRequired** toast («يُتاح بعد ربط الخادم» / "available once the server is connected"). **Zero** state change of any kind. **Every Spec-040 final is a DIRECT gate — no `data-confirm` chain is added anywhere (§3).** | `data-disabled-reason` | irrelevant — nothing to persist |
| **LABELLED-LOCAL-PREVIEW** | A `<button class="toggle" data-toggle data-toast=…>` (the existing `settings-section.js:26-31` path). Flips its **own** `is-on` visual state on click, for in-session preview only; its `data-toast` carries the backendRequired wording, never "saved". The section it lives in carries a visible **preview-only note** and exactly ONE gated Save. **Note copy law:** «معاينة فقط — لا يُخزَّن أي تغيير قبل ربط الخادم.» / "Preview only — nothing is stored until the server is connected" — it must **not** contain `saved` / «الحفظ» (the fake-success census greps `\bsaved\b` + «تم الحفظ» over body **and** template text, and «لا يتم الحفظ» contains «تم الحفظ»). | existing `data-toggle` | **does not persist** — a reload (or navigating away and back) restores the baked authored state |
| **DISABLED-PREVIEW** | A control that is honestly non-interactive because its *legacy* source was itself disabled (e.g. "No WhatsApp Connected"). Rendered `mode:'disabled'` + a visible reason; carries no `data-toggle` at all — there is nothing to flip. | none | n/a |

A fifth, non-action class exists for completeness but is **excluded from the finals census** because it has no
click target: **STRUCTURE-ONLY rows** (label + required-flag + purpose text; the 60 rows of §F.1/F.6 in the ledger —
34 Security import columns/2FA + 26 sensitive Integration fields). These are inert display rows, never inputs, never
buttons — they cannot fake a success because they cannot be clicked.

**Never show a preview as saved, ever.** No GATE, LABELLED-LOCAL-PREVIEW, or DISABLED-PREVIEW control may emit
«تم الحفظ» / «تم الربط» / «نجح» / "saved" / "Saved" / "Done" / a "Connected" **status** — enforced by the sitewide
`FAKE` attribute guard (`run.cjs:188-196`, which greps `data-toast` / `data-confirm-toast` / `data-confirm-msg`) plus
the Spec-040 body+template text census (§5, V9/V10).

---

## 2. Per-tab action ledger

### 2.1 General — 5 GATE, 7 LABELLED-LOCAL-PREVIEW (1 of which is DISABLED-PREVIEW)

| # | Action | Class | Confirm-first? | Owner |
|---|---|---|---|---|
| G1 | Save (Identity section) | **GATE** | no | new (Spec 040) |
| G2 | Logo upload | **GATE** | no | new |
| G3 | Save (Automation section) | **GATE** | no | new |
| G4 | `head-add` drawer's single primary final (add expense head) | **GATE** | no | **existing, 0-diff** (Spec 031/032) |
| G5 | Locations add/edit gate | **GATE** | no | **existing, 0-diff** (Spec 031) — completes the ledger's own "≈5" General gate count |
| G6 | `send_plan_report` #1 ("Completed Course" report) | **LABELLED-LOCAL-PREVIEW** | no | new |
| G7 | `send_plan_report` #2 ("monthly plan" report) | **DISABLED-PREVIEW** — legacy-disabled behind "No WhatsApp Connected"; rendered `mode:'disabled'` + honest reason, **not** flippable | n/a | new |
| G8 | `teacher_cancel_enable` | **LABELLED-LOCAL-PREVIEW** | no | new |
| G9 | `student_cancel_enable` (legacy label "Family") | **LABELLED-LOCAL-PREVIEW** | no | new |
| G10 | `auto_add_makeup_to_credit` | **LABELLED-LOCAL-PREVIEW** | no | new |
| G11 | `auto_add_no_makeup_to_credit` | **LABELLED-LOCAL-PREVIEW** | no | new |
| G12 | `teacher_absent_student` | **LABELLED-LOCAL-PREVIEW** | no | new |
| G13 | `tfa` (2FA) | **GATE** — relocated to the **Security** tab (see §2.4 S12), not General | no | new |

`rate_student_absent` (Automation) is **Ø** — not rendered at all (pay-free law); it is not a "final" of any class
because it has no UI presence. See `pay-free-settings-exclusion-contract.md` row 11.

### 2.2 Notifications — 7 GATE, 34 LABELLED-LOCAL-PREVIEW (1 of which is DISABLED-PREVIEW)

| # | Action | Class | Confirm-first? | Owner |
|---|---|---|---|---|
| N1–N7 | Save × 7 sections (System · Course · Class · Reminders · Invoices · Salary events · Family status) | **GATE** ×7 | no | new |
| N8 | `system_notifications` (master toggle) | **LABELLED-LOCAL-PREVIEW** | no | new |
| N9 | `appnotifiy` (master toggle) | **DISABLED-PREVIEW** — legacy-disabled, `mode:'disabled'` + reason | n/a | new |
| N10 | `course_updates`, `class_updates`, `class_reminder` (3 master toggles) | **LABELLED-LOCAL-PREVIEW** ×3 | no | new |
| N11 | 23 event checkboxes (course: teacher 2 + family 3; class: teacher 9 + family 9) | **LABELLED-LOCAL-PREVIEW** ×23 | no | new |
| N12 | 6 reminder toggles (`teacher_daily_class_reminder`, `teacher_delay_reminder`, `teacher_reminder`, `student_send_reschedule_reminders`, `teacher_send_manual_reminder`, `student_reminder`) | **LABELLED-LOCAL-PREVIEW** ×6 | no | new |

10 channel `field(select)`s + 3 numeric `field()`s feed the section Saves (N1–N7) — they are inert `field()`s, not
finals in their own right (§1, STRUCTURE-ONLY-adjacent but counted in the ledger's `field()=13` census, not the
`data-toggle=34` census). Total toggles: 1(N8, non-master-disabled excluded)+3(N10)+23(N11)+6(N12)+1(N9,
disabled)=34, matching ledger F.2/F.7.

### 2.3 Customization — 3 GATE (0 confirm-first), 0 preview toggles, 2 REAL

Full detail in `customisation-contract.md`. Summary:

| # | Action | Class | Confirm-first? | Owner |
|---|---|---|---|---|
| C1 | Theme (light/dark/system) | **REAL** | n/a | existing |
| C2 | Language (AR/EN) | **REAL** | n/a | existing |
| C3 | Save (academy-wide appearance + colors) | **GATE** | no | new |
| C4 | Reset (11 status colors → defaults) | **GATE** — a **direct** `data-disabled-reason` gate | **no** (Ledger §G: Spec 040 adds zero confirms; a confirm before an inert gate is theatre — nothing can be reset, so there is nothing to guard) | new |
| C5 | Message Builder | **GATE** | no | **existing, 0-diff** (Spec 031) |

### 2.4 Security — 12 GATE, 0 preview toggles

| # | Action | Class | Confirm-first? | Owner |
|---|---|---|---|---|
| S1 | Upload — teachers import | **GATE** | no | new |
| S2 | Upload — families import | **GATE** | no | new |
| S3 | Upload — children import | **GATE** | no | new |
| S4 | Upload — invoices import | **GATE** | no | new |
| S5 | Download template — teachers | **GATE** (a `<button>`, never `<a download=…>` — ledger R3) | no | new |
| S6 | Download template — families | **GATE** | no | new |
| S7 | Download template — children | **GATE** | no | new |
| — | Download template — invoices | **N/A — not rendered.** Legacy has no download-template link for this card (it is functionally "Invoices", mislabelled "Upload families" in legacy; the raw HTML proves `type=4`+`invoices_file`) | — | — |
| S8 | Backup — Save destination | **GATE** | no | new |
| S9 | Backup — Send backup now | **GATE** | no | new |
| S10 | Policy Edit — family privacy | **GATE** | no | new |
| S11 | Policy Edit — teacher privacy | **GATE** | no | new |
| S12 | 2FA (`tfa`, relocated from General) | **GATE** | no | new |

`4 upload + 3 template + 2 backup + 2 policy + 1 2FA = 12`, matching ledger F.4/F.7. The `backup_email` destination
field itself (§ledger F.4) is a plain `field(text)` feeding S8 — not a final.

### 2.5 Users — 0 actions

| # | Action | Class | Confirm-first? | Owner |
|---|---|---|---|---|
| U1 | `<a href="staff.html">` | **REAL** (genuine navigation, not a gate — it is a link, not a mutating action) | n/a | **existing, 0-diff** (Spec 031) |

The RBAC preview (`rolesSection()`, `ROLES_PREVIEW`) is read-only text — 0 buttons, 0 finals. `staff.html`'s own
action ledger (View/Edit/Duplicate/Deactivate/Delete, RBAC-save-gate) is **out of scope** — owned by
`staff-users-contract.md` (Spec 031), unchanged.

### 2.6 Integrations — ≈24 GATE (some unenumerated), 8 LABELLED-LOCAL-PREVIEW

| # | Action | Class | Confirm-first? | Owner |
|---|---|---|---|---|
| I1–I11 | Per-provider drawer primary final (Stripe · PayPal · Mollie · XPay · Payoneer · Paymob · Custom · Paymob Payout · Payoneer Payout · WhatsApp · Email/SMTP) — the **ONE** `.btn-primary[data-disabled-reason]` each `formDrawer('integ-<id>', …)` may carry (ledger R4) | **GATE** ×11 | no | new |
| I12 | WhatsApp — "Wake connection" (secondary, inside the WhatsApp drawer) | **GATE** | no | new |
| I13 | WhatsApp — "Test send" | **GATE** | no | new |
| I14 | WhatsApp — "Logout" | **GATE** | no | new |
| I15 | Email/SMTP — "Test SMTP" (secondary) | **GATE** | no | new |
| I16 | XPay — 4 payment-method toggles | **LABELLED-LOCAL-PREVIEW** ×4 | no | new |
| I17 | Paymob Payout — `is_active` | **LABELLED-LOCAL-PREVIEW** | no | new |
| I18 | Payoneer Payout — `is_active` | **LABELLED-LOCAL-PREVIEW** | no | new |
| I19 | Email/SMTP — `is_active` + `is_default` | **LABELLED-LOCAL-PREVIEW** ×2 | no | new |
| I20 | **Connect** — one per provider **card** (×11) | **GATE** ×11 | no | new |
| I21 | Email/SMTP — "Add account" (legacy "Add Account"; management model **UNKNOWN**, U-4) | **GATE** | no | new |

**The former "≈9 unknown gates" gap is CLOSED.** It was an artefact of this table omitting the **card-level Connect
gates**, which `integrations-catalog-contract.md` §4 has always registered. Traced Integrations gates =
**11 Connect (cards) + 11 Save (drawer primaries) + Test-SMTP + Add-account + Pair + Wake + Send-test + Logout = 28**.
The Ledger's "**≈24**" is an explicit **approximation** (its column header is literally `Gates (≈)`), so 28-traced is
inside the ≈ tolerance and **no number is invented to force a total**. The only *binding* gate assertion is the
page-level floor `a31.gates >= 20` (V17); the exact built count is confirmed at build time.

**24 sensitive fields are STRUCTURE-ONLY** (§1's fifth class) and are excluded from this table entirely — see
`no-secret-credential-contract.md`-equivalent enumeration in the ledger §F.5.

---

## 3. Confirm-first census (sitewide, exhaustive) — **ZERO**

**No action in the entire settings hub is confirm-first. Spec 040 adds `data-confirm` to nothing.**

| Confirms added by Spec 040 | **0** |
|---|---|
| Pre-existing confirms touched | **0** (the "reset data" confirm elsewhere in the product is unchanged) |

Every GATE in §2 is a **direct single-step** action: click → the backendRequired toast fires immediately, no
intermediate dialog. Every LABELLED-LOCAL-PREVIEW toggle is likewise a single click with no confirm (it is a
visual-only preview). This is Ledger §G's presentation table verbatim: *"Confirms: none added (existing 'reset data'
confirm unchanged)"*.

**Why not "confirm → gate" on the destructive-looking finals** (Send-backup, the 4 imports, the palette Reset — all
of which legacy fires with *no* confirmation)? Because in Spec 040 **none of them can run**. A confirm in front of an
inert gate stages a destructive-action ritual for an action that structurally cannot occur — it is theatre, it
trains click-through against an action that will one day be real, and it fakes a safety mechanism we do not have.
The substance is preserved instead as **standing visible copy** (scope · destination · permission · audit —
`security-import-backup-policy-contract.md` §B.3), which is strictly more informative than a summoned dialog. The
real confirm is a **backend-era obligation** and ships **with** the real action (FO-10, FO-11 → backend / Spec 053).

---

## 4. Total census (cross-check against ledger F.7)

| Tab | `field()` | `data-toggle` previews | Structure-only rows | GATE (traced) | Confirm-first |
|---|---|---|---|---|---|
| General | 22 | 7 (1 disabled) | 0 | 5 | 0 |
| Notifications | 13 | 34 (1 disabled) | 0 | 7 | 0 |
| Customization | 16 | 0 | 0 | 3 | **0** |
| Security | 1 | 0 | 34 | 12 | 0 |
| Users | 0 | 0 | 0 | 0 | 0 |
| Integrations | 21 | 8 | 26 | **28** (11 Connect + 11 Save + 6 secondaries) | 0 |
| **Total** | **73** | **49** | **60** | **55 traced** (ledger's approximate **≈51**) | **0** |

The `field()` (**73**), toggle (**49**) and structure-only (**60**) columns match Ledger F.7 **exactly** — those are
the binding, exactly-asserted censuses. The **GATE column is approximate by the Ledger's own construction** (its
header is `Gates (≈)`): every one of the 55 is traced to a named action above, and the Ledger's ≈51 is an estimate,
not a contract. The only binding gate assertion is the floor `a31.gates >= 20` (V17). **No count is padded and none
is left UNKNOWN.**

---

## 5. Machine-checkable invariants (binding — every one asserted by smoke)

| # | Invariant | Assertion | Scope |
|---|---|---|---|
| V1 | No password input | `input[type=password]` count | 0, `settings(.en).html` |
| V2 | No file input | `input[type=file]` count | 0, `settings(.en).html` |
| V3 | No canvas | `<canvas>` count | 0, `settings(.en).html` |
| V4 | No download attribute | `[^-\w]download=` count (`g32.pdfish`) | 0, `settings(.en).html` |
| V5 | No `window.open` / `blob:` / `createObjectURL` / `.pdf"` | `g32.pdfish` full regex | 0, `settings(.en).html` |
| V6 | Naming law | `a31.credInputs` — `/pass\|secret\|api\|key\|token\|webhook\|card\|cvv/i` on any `name`/`id` | 0, `settings(.en).html` |
| V7 | No currency token | `a31.currency` — `ريال\|SAR\|جنيه\|EGP\|AED\|EUR\|\$\|€\|£` | 0, `settings(.en).html` |
| V8 | No pay figure — a **FIGURE** ban, never a word ban | `(salary\|رواتب\|hour[-_ ]?rate\|أجر الساعة\|fine\|غرامة\|payout)[^<]{0,24}[0-9]` — **and** the 11 excluded legacy names (`settings_data[`, `salary_period`, `applayFins`, `fin[`, `rate_student_absent`, `hours-input`, `rate-input`). The **words** "Salary events" (the notifications routing section) and "Paymob Payout"/"Payoneer Payout" (provider **names**) are LAWFUL — Spec-030's figure-free finance Salaries tab is the precedent | 0, `settings(.en).html`. **Review/grep gate** (`quickstart.md` §5), not a new smoke assert |
| V9 | No fake success | The **real** sitewide guard, byte-verbatim (`run.cjs:188-196`): `/\(تجريبي\)\|\(demo\)\|إجراء تجريبي\|preview action\|بنجاح\|\bsuccessfully\b/i` over every `data-toast` / `data-confirm-toast` / `data-confirm-msg` **attribute** — **plus** the additive Spec-040 body+template **text** census `fakeSaved` = `/تم الحفظ\|\bsaved\b\|\bdone\b\|بنجاح\|\bsuccessfully\b\|تم الربط/i` (`smoke-coverage-contract.md` §4.3). ⚠ **`connected` is NOT and may NOT be in either regex** — the honest backendRequired sentence *"available once the server is connected"* contains it; fake-connected is caught by V10 instead | 0 |
| V10 | No fake status chip | **Chip-scoped, token-absolute**: `0` elements matching `/متصل\|connected/i` inside a `.chip` (body **and** template content). ⇒ the honest chips read «غير مُعدّ» / "not configured" and «يتطلّب ربط الخادم» / "requires the server" — **never** "not connected". Tone ∈ `{live,upcoming,completed,cancelled,amber,neutral}` (R6 — build throws on a 7th) | 0, Integrations cards |
| V11 | Toggle no-persistence | A `data-toggle` writes **no** storage key (`enhance.js` is 0-diff and its toggle branch persists nothing) — the structural proof is the **0-diff wall** (V18/V19) plus scope-guard §3.5's `grep 'localStorage'` = 0 new keys. **Review-level**, not a new smoke assert | all 49 toggles |
| V12 | No cross-control mutation | The existing Spec-031 **no-mutation snapshot** (`run.cjs` settings block) is unchanged and still runs on this page; it is **not** rewritten for Spec 040. A gate click may change nothing but the transient toast; a toggle click may change nothing but its own `is-on` class | all GATE + LABELLED-LOCAL-PREVIEW actions |
| V13 | Drawer register completeness | `FORM_DRAWERS_032.settings` (`smoke:92`) lists all **12**: `head-add` + the 11 `integ-*` | exact 12-entry array | source |
| V14 | Per-drawer primary cap | `.btn-primary[data-disabled-reason]` count per registered drawer | **≤ 1** | each of the 12 |
| V15 | Per-drawer OMIT-name audit | `/pass\|secret\|api[-_]?key\|token\|webhook\|otp\|salary\|hour[-_]?rate\|fine\|payout\|iban\|cvv/i` on any input name inside a registered drawer | 0 | each of the 12 |
| V16 | Per-drawer minimum shape | each registered drawer has ≥1 `input/select/textarea` and ≥1 `[data-disabled-reason]` | true | each of the 12 |
| V17 | Page-level gate floor | `a31.gates` | **≥ 20** (strengthened from ≥4) | `settings(.en).html` |
| V18 | Closed hook set | `git diff 58a53e2 -- app/src/js \| grep '^\+.*data-[a-z-]+='` | only **existing** hooks (`data-tab`, `data-drawer`, `data-modal-trigger`, `data-confirm`, `data-disabled-reason`, `data-toggle`, `data-toast`, `data-set-theme`, `data-set-lang`, `data-filter`) | source diff |
| V19 | No new storage key | `git diff 58a53e2 -- app/src/js \| grep 'localStorage'` | 0 new keys (only `academy.theme` / `academy.lang` / `academy.schedView.*` referenced) | source diff |
| V20 | No new dependency | `git diff 58a53e2 -- app/package.json` | empty | source diff |
| V21 | Locale parity | `adm.*` AR key-set vs EN key-set | 0 divergence | `ar.adm.js` / `en.adm.js` |
| V22 | Confirm-first census | count of **new** settings-hub `data-confirm` chains | **exactly 0** (§3 — Ledger §G "Confirms: none added") | `settings(.en).html` |
| V23 | Structure-row inertness | the 60 STRUCTURE-ONLY rows (§1) contain 0 `<input>`/`<button>`/`<select>`/`<textarea>` of their own | true | Security imports + Integrations sensitive rows |

**STOP CONDITIONS** (ledger §K / `scope-guard.md` §5, restated for this contract's scope): any V1–V23 failure halts
the spec — do not commit. V9 (fake-success) and V10 (fake-connected chip) are the two invariants that most directly
enforce "never show a preview as saved / a provider as connected"; a failure of either is a **direct** honesty-law
violation, not a coverage gap.

**The two token traps (read before writing a single string of copy):**
1. **`saved`** — the preview note must read «معاينة فقط — لا يُخزَّن أي تغيير قبل ربط الخادم.» / "Preview only —
   nothing is stored until the server is connected." Never "not saved" / «لا يتم الحفظ»: `\bsaved\b` matches the
   former and «تم الحفظ» is a literal substring of «يتم الحفظ». An honest build would go **red** on its own note.
2. **`connected`** — the backendRequired sentence legitimately contains it, so the fake-connected census is
   **chip-scoped** (V10), and consequently no chip may say "not connected" either. Use "not configured".
