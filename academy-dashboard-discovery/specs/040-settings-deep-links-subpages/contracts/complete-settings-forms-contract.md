# Contract — Complete Settings Forms (Spec 040, cross-form index)

**Role of this document.** Spec 040 already carries eight domain contracts that enumerate fields row-by-row:
`general-settings-completeness-contract.md` · `automation-rules-contract.md` · `notification-matrix-contract.md` ·
`customisation-settings-scope.md` · `safe-import-columns-contract.md` · `security-import-backup-policy-contract.md` ·
`sensitive-provider-fields-contract.md` · `integrations-catalog-contract.md`. **This contract does not re-derive
their field rows and must never contradict them** — where a number appears here it is the same number, cited by
source. What those eight contracts do **not** do is answer, **per form, in one place**: who may see/edit it, what
happens to unsaved edits, what its reset/confirm behaviour is, how it lays out at 390px, who owns the Save, who
consumes the value downstream, who owns the audit trail, and what class of gate its final is. **That is this
contract's job** — the single per-form completeness checklist the brief demands, covering **every** settings form
with **zero exceptions**. Baseline: HEAD **`58a53e2`** (ledger R9).

---

## 0. The Spec-056 non-excuse clause (binding, read first)

`future-owner-register.md` FO-24 states it exactly: *"040 enforces completeness for Settings now; 056 must not be
used as an excuse to leave Settings shallow."*

Binding consequences:

1. **Spec 056 — Complete Forms & Data Capture Audit — is a *product-wide re-audit*, not the origin of Settings
   completeness.** Settings is completed **now**, in Spec 040, against the full legacy field census (41 + 47 + 17 +
   39 + 24-provider-matrix controls). No form in this contract may be shipped partial, generic, or reduced to "a few
   representative toggles" on the theory that "056 will finish it later." There is no partial-then-finish plan for
   Settings; there is one completion, done here.
2. **Every evidenced legacy control has an explicit disposition** in this contract or in the domain contract it
   points to: **rendered** (`field()` or `data-toggle`), **gated** (`data-disabled-reason`, no input), or **omitted
   by a named law** (pay-free, no-secret, no-evidence). "Unaccounted for" is not a category — see §1's per-form
   accounting-closure column.
3. **056's actual job against Settings** (recorded so the boundary is unambiguous): re-verify, product-wide, that no
   *other* domain regressed to the pre-040 shallowness Settings itself is escaping today, and check Settings for
   drift introduced by specs 041–055 in between. 056 may **tighten** this contract's assertions; it may **not**
   **loosen** them, and it may not add a single Settings field that was skippable in 040 and is only now being
   added — every field in scope today is in scope today.
4. This clause is **itself** protected: a future spec citing "056 will cover it" as grounds to ship a shallow
   Settings form is a **direct violation** of this contract and must be rejected in review, not merely flagged.

---

## 1. The complete form inventory (34 forms, 0 unaccounted)

Every save-scope in the hub is one row. "Save scope" = the boundary inside which edits are co-submitted by one
gated final (§2 makes this the load-bearing concept for unsaved-change honesty). Field/toggle/structure counts are
sourced from Ledger §F.1–§F.7 and cross-checked against the domain contracts named above.

| Form ID | Tab | Save scope | `field()` | Toggle | Structure rows | Accounting closure |
|---|---|---|---|---|---|---|
| GEN-1 | General | Identity | 10 | 0 | 0 (1 logo gate) | 11 evidenced → 10 rendered + 1 gated = 11 ✔ (`general-settings-completeness-contract.md` §2) |
| GEN-2 | General | Automation | 10 | 7 | 0 | 18 evidenced → 17 rendered + 1 omitted-by-law (`rate_student_absent`) = 18 ✔ (`automation-rules-contract.md` §3) |
| GEN-3 | General | *(display card, unchanged)* | 0 | 0 | 0 | Spec-031 surface; **0-diff**; not a Spec-040 form |
| GEN-4 | General | Expense heads (`head-add` drawer) | 2 | 0 | 0 | Spec-032 FC-39 surface; **0-diff** |
| NOTIF-1 | Notifications | System toggles | 0 | 5 | 0 | 5 masters (`system_notifications`,`appnotifiy`,`course_updates`,`class_updates`,`class_reminder`) — see NOTIF-2..4 for the section-scoped masters counted once here, not twice |
| NOTIF-2 | Notifications | Course events | 2 | 5 | 0 | 2 selects + 5 checkboxes = 7 of 47 (`notification-matrix-contract.md` §2) |
| NOTIF-3 | Notifications | Class events | 2 | 18 | 0 | 2 selects + 18 checkboxes = 20 of 47 |
| NOTIF-4 | Notifications | Reminders | **4** | 6 | 0 | 2 selects + **2 numerics** (`ntf-remTeacherHours`, `ntf-remFamilyHours`) = 4 `field()` + 6 toggles = 10 of 47 |
| NOTIF-5 | Notifications | Invoice routing | 3 | 0 | 0 | `invoice`, `invoice_reminder`, `invoice_reminder_days` = 3 of 47 |
| NOTIF-6 | Notifications | Salary routing | 1 | 0 | 0 | `salaries` = 1 of 47, **routing-only, 0 figure** |
| NOTIF-7 | Notifications | Family-status routing | 1 | 0 | 0 | `family_status` = 1 of 47 |
| | | **Notifications total** | **13** (0+2+2+4+3+1+1) | **34** (5+5+18+6) | **0** | **47 evidenced → 47 rendered, 0 omitted** ✔ |
| CUST-1 | Customization | Global appearance (shared save w/ CUST-2) | 2 (hex text) + 3 (layout/sidebar/surface selects) | 0 | 0 | theme+language REAL (not counted as gated fields); 5 display+gate fields of 6 non-real controls |
| CUST-2 | Customization | Status palette (shared save w/ CUST-1) | 11 (hex text) | 0 | 0 | 11 of 11 statuses rendered (6 distinct hex — ledger R10) |
| CUST-3 | Customization | Message Builder | 0 | 0 | 0 | gate only; **0-diff**, unchanged since Spec 031 |
| | | **Customization total** | **16** field() + 1 real theme | **0** | **0** | 17 distinct names → 2 real + 15 rendered display+gate = 17 ✔ |
| SEC-1 | Security | Import — Teachers | 0 | 0 | 8 | 10 evidenced → 8 rendered, 2 rejected (`hour_rate`,`currency`) |
| SEC-2 | Security | Import — Families | 0 | 0 | 12 | 15 evidenced → 12 rendered, 3 rejected (`password`,`hour_rate`,`currency`) |
| SEC-3 | Security | Import — Children | 0 | 0 | 7 | 7 evidenced → 7 rendered, 0 rejected |
| SEC-4 | Security | Import — Invoices | 0 | 0 | 6 | 7 evidenced → 6 rendered, 1 rejected (`currency`) |
| SEC-5 | Security | Backup | 1 (destination) | 0 | 0 | 1 of 1 evidenced field |
| SEC-6 | Security | Policy — Family | 0 | 0 | 0 (display body) | independent of SEC-7 (§2) |
| SEC-7 | Security | Policy — Teacher | 0 | 0 | 0 (display body) | independent of SEC-6 (§2) |
| SEC-8 | Security | Two-factor | 0 | 0 | 1 | relocated from General Group D |
| | | **Security total** | **1** | **0** | **34** | 39 import cols + 6 backup/policy/2FA evidenced → 33 rendered cols + 1 field + 1 structure = accounted (`safe-import-columns-contract.md` §0, `security-import-backup-policy-contract.md` §0) |
| USERS-1 | Users | *(display + real link, unchanged)* | 0 | 0 | 0 | Spec-031 `usersPanel()`; **0-diff** |
| INTEG-1 | Integrations | Stripe | 1 | 0 | 2 | `sensitive-provider-fields-contract.md` |
| INTEG-2 | Integrations | PayPal | 2 | 0 | 2 | mode select never defaults live |
| INTEG-3 | Integrations | Mollie | 1 | 0 | 1 | |
| INTEG-4 | Integrations | XPay | **2** (name, url — the 4 channel toggles are counted in the Toggle column, not here) | 4 | 3 | preselects `staging`, never both unset |
| INTEG-5 | Integrations | Payoneer | 2 | 0 | 2 | |
| INTEG-6 | Integrations | Paymob | 2 (name + region select) | 0 | 5 | region ≠ environment (proven help text) |
| INTEG-7 | Integrations | Custom | 2 (name + payment-instructions textarea) | 0 | 0 | the one fully-renderable provider — 0 sensitive fields |
| INTEG-8 | Integrations | Paymob Payout | 1 (`integ-pmb-out-mode`) | 1 (active) | 4 + 1 webhook-info row | mode required, never live-default |
| INTEG-9 | Integrations | Payoneer Payout | **1** (`integ-pyn-out-mode`) | 1 (active) | 3 + 1 webhook-info row | **Program ID is a SENSITIVE STRUCTURE ROW, never a `field()`** (`sensitive-provider-fields-contract.md` #22) — it is one of the 3 sensitive rows, not a rendered control |
| INTEG-10 | Integrations | WhatsApp (Free) | 3 (phone, send_group, group_name) | 0 | 0 | pairing = gate, no QR/wizard invented |
| INTEG-11 | Integrations | Email (SMTP) | 4 (host, port, encryption, email) | 2 (active, default) | 2 | Test SMTP = gate |
| | | **Integrations total** | **21** (1+2+1+2+2+2+2+1+1+3+4) | **8** (4+1+1+2) | **26** | 11 providers → **21 field() + 8 toggle + 26 structure = 55 rendered rows**, 24 of the 26 structure rows are sensitive credentials, 2 are webhook-URL info rows (`integrations-catalog-contract.md` §1; names per `sensitive-provider-fields-contract.md` §4) |
| | | **HUB TOTAL** | **73** (2 real theme/lang not counted here) | **49** | **60** | **matches Ledger §F.7 exactly: 73 / 49 / 60** |

**Zero unaccounted forms.** Every evidenced legacy control this spec touches resolves to exactly one of: a row in
this table (rendered), a named-law omission cited in `pay-free-settings-exclusion-contract.md` /
`safe-import-columns-contract.md` / `security-import-backup-policy-contract.md` §D, or an explicit future-owner
entry in `future-owner-register.md`. No control is silently dropped.

---

## 2. Save-scope map — the binding answer to "unsaved-change behaviour"

`forms-modals-interactions-register.md` states the law generally: *"one save scope per form; a form must not
silently co-submit another"* — the direct refusal of legacy's General tab (4 independent saves, no cross-tab dirty
state) and the policy editor (one Submit silently writes **two** documents). This contract fixes the **exact**
scope boundary for every form, because "one save scope per form" is meaningless until "form" is bounded.

| Save scope | Forms co-submitted | Independent of | Why |
|---|---|---|---|
| **GEN-1 Save** | Identity only | GEN-2 | legacy's 4-tab/4-save split is preserved at the identity/automation boundary — the two blast radii (branding vs. academic rules) are unrelated |
| **GEN-2 Save** | Automation only (all 5 `<details>` groups: Renewal · Cancellation · Attendance · Class closing · Reporting) | GEN-1 | the 5 accordion groups are ONE save because legacy's own single `Course & class` tab posts them together — subdividing further would invent a boundary with no evidence |
| **NOTIF-1..7** | **7 fully independent saves**, one per section | each other | mirrors legacy's own row-based sectioning; a family-status routing edit must never risk a class-event routing write. **Reducing 7 to 1 "Save all notifications" would violate the no-silent-co-submit law** exactly as the legacy policy page does |
| **CUST-1 + CUST-2 Save** | Global appearance AND the 11-status palette **share one** "academy-wide Save" | Message Builder gate (CUST-3, not a save) | Ledger F.2: *"everything else = display + ONE gated academy-wide Save"* — legacy itself submits `PUT` once for the whole personalisation form (35 fields, 1 write). **This is the one form in the hub with a wider-than-usual scope, and it is evidence-faithful, not a shortcut** |
| **CUST-2 Reset-to-Default** | palette only | CUST-1 Save | a distinct **direct-gate** action, never silently folded into Save. **No confirm** (`customisation-contract.md` §6) |
| **SEC-1..4 Upload** | one import type each | each other | 4 independent multipart posts in legacy; co-submitting would risk one bad file blocking three good ones. Each is a **direct gate** |
| **SEC-5 backup-destination Save** | destination field only | SEC-5 Send-backup | legacy: `Save changes` (destination) and `Send Backup` (`GET`) are two different legacy controls; kept distinct here — both are **direct gates** (`security-import-backup-policy-contract.md` §H1) |
| **SEC-6 Edit / SEC-7 Edit** | one policy each | each other | **explicit refusal of the legacy bug** where one Submit posts both `family_privacy` and `teacher_privacy` together (`security-import-backup-policy-contract.md` §C) |
| **SEC-8 Enable 2FA** | itself | everything else | a security-tier action, never bundled with a data edit |
| **INTEG-1..11 Save** | one provider's drawer each | each other | each `integ-*` drawer carries **exactly one** `.btn-primary[data-disabled-reason]` (`smoke:1221`); saving Stripe must never touch PayPal |
| **INTEG-10 WhatsApp actions** | Pair / Wake / Send-test / Logout are 4 **separate** gates, not one | — | legacy's Logout silently kills all automation with no confirm; keeping the actions separate (rather than folding into one "Save") prevents an accidental multi-effect click |

**No form in this hub silently writes a second form.** Where two forms visually share a save button (CUST-1/CUST-2
only), that sharing is **evidence-faithful** (legacy's own single `PUT`), not a convenience shortcut, and is
recorded here so it is never mistaken for a violation of the one-scope law.

**Confirms: ZERO.** No save scope in this table is fronted by a `data-confirm`. Spec 040 adds **no confirm dialog**
(Ledger §G; `no-fake-settings-contract.md` §3): every final is a **direct** `data-disabled-reason` gate, because a
confirm in front of an action that structurally cannot occur is theatre. The facts a real destructive action needs
(scope · destination · permission · audit) are rendered as **standing visible copy** beside the gate.

**Dirty-state honesty.** Because every control in every scope is **inert** (no `field()` writes to storage, no
`data-toggle` persists — Ledger, standing law), there is **no real dirty state to track** and therefore **no
"navigate away with unsaved changes" browser prompt is wired** (wiring one would require a new hook to detect
in-memory edits across inert controls — forbidden). The honest substitute, present on **every** save scope: a
visible **preview-only note** — «معاينة فقط — لا يُخزَّن أي تغيير قبل ربط الخادم.» / "Preview only — nothing is
stored until the server is connected" (Ledger R5, `automation-rules-contract.md` §1) — co-located with the gated
final, so the absence of a warning is never mistaken for real persistence. ⚠ The note may **not** use the word
"saved" / «الحفظ»: the fake-success census greps `\bsaved\b` + «تم الحفظ» over body **and** template text and would
fail on the naive phrasing. **This is deliberate, not a gap**: a fake unsaved-changes prompt over an inert form
would itself be a fake-success-adjacent lie (implying edits exist to lose).

---

## 3. Per-form attribute checklist

The columns below are the ones **not already exhaustively tabulated** by the domain contracts: **Permission ·
Reset/Confirm · Mobile layout · Save owner · Downstream consumers (pointer) · Audit owner · Backend gate class.**
Full field name / type / options / default / conditional-visibility / help-text detail for each row is in the named
domain contract — this table does not repeat it.

### 3.1 General

| Form | Permission (view / edit) | Reset / Confirm | Mobile layout | Save owner | Downstream consumers | Audit owner | Backend gate class |
|---|---|---|---|---|---|---|---|
| GEN-1 Identity | System Settings · view / System Settings · edit | no reset; Save only | `.wiz-grid` collapses to **1 column** at the mobile breakpoint (`app.css:647`) | backend (no frontend persistence) | shell brand, topbar, index, invoices, certificates, outbound mail, **every schedule/session/attendance/reminder surface** (timezone) | backend, high for timezone (`settings-cross-surface-impact-register.md` row 3) | `data-disabled-reason` per-field-group, 1 Save |
| GEN-2 Automation | System Settings · view / System Settings · edit | no reset; Save only; dependencies are **inline help text**, never a live show/hide | 5 native `<details>` accordions stack full-width; selects/numbers 1-column at mobile | backend | courses, sessions, schedule, attendance, cancellation/make-up flow, family requests, teacher session actions, credit balances | backend, **high** — "these rules decide who is charged and who is credited" | `data-disabled-reason`, 1 Save |
| GEN-3 Locations | System Settings · view / System Settings · edit | unchanged (Spec 031) | unchanged | backend | academy profile, documents | backend | unchanged |
| GEN-4 Expense heads | System Settings · view / System Settings · edit | unchanged `head-add` drawer | drawer width `min(440px,92vw)` (`app.css:505`) | backend | finance expense categorisation | backend | unchanged (Spec 032 FC-39) |

### 3.2 Notifications (all 7 forms share one permission/audit/gate profile — listed once)

| Attribute | Value (applies to NOTIF-1..7) |
|---|---|
| Permission | System Settings · view / System Settings · edit |
| Reset / Confirm | no reset; each section's Save is independent (§2); no confirm needed — routing changes are non-destructive |
| Mobile layout | **row-based, not a grid or `<table>`** — legacy itself uses rows; row shape survives 390px and RTL where a matrix collapses (`notification-settings-scope.md` §"Shape"); every event control is icon+text, never colour-alone |
| Save owner | backend, per section (7 independent writes) |
| Downstream consumers | "this IS the notification impact" — every notification the product sends: course/class events, reminders, invoice + invoice-reminder, salary events (routing only), family-status (`settings-cross-surface-impact-register.md` row "Notification routing") |
| Audit owner | backend; ✔ (recorded, not "high" — routing changes are lower-blast-radius than automation rules) |
| Backend gate class | `data-disabled-reason` per section Save; **channel selects must state the dependency on the WhatsApp/E-mail integration and must not imply the channel is live** (`notification-settings-scope.md` rule 3) |

### 3.3 Customization

| Form | Permission | Reset / Confirm | Mobile layout | Save owner | Downstream consumers | Audit owner | Backend gate class |
|---|---|---|---|---|---|---|---|
| CUST-1 theme/language (REAL) | **every authenticated user, their own preference** | n/a — real, instant, no confirm | `data-set-theme`/`data-set-lang` controls, unchanged existing layout | **the client** (existing `academy.theme`/`academy.lang` keys — the only real writes on the hub) | that user's whole app, immediately | n/a (personal preference, not an academy setting) | n/a — not gated, already real |
| CUST-1 brand/layout (display) | System Settings · view / System Settings · edit | no reset; Save only | swatch + hex text stack 1-column | backend | "applies globally to all users" — all role apps | backend, ✔ | `data-disabled-reason`, shared Save (§2) |
| CUST-2 status palette | System Settings · view / System Settings · edit | **Reset-to-Default = a DIRECT gate** (nothing can be reset, so there is nothing to confirm; the real confirm ships with the real reset — FO-19) | 11-row list, 1-column at mobile; **icon+text law is load-bearing here** — the 11 statuses collapse to **6 distinct hexes**, so colour alone is provably ambiguous | backend | every status chip on every schedule/attendance/session surface, all roles; **contrast validation becomes a hard gate when real** (FO-20) | backend, ✔ + report-legend impact | `data-disabled-reason` shared Save + `data-disabled-reason` Reset (**0 `data-confirm`**) |
| CUST-3 Message Builder | System Settings · view / System Settings · edit | n/a — gate only, no fields | single card row | n/a | every templated message on every channel (once real) | backend | `data-disabled-reason` (`adm.set.cust.msgBuilderReason`, unchanged since Spec 031) |

### 3.4 Security

| Form | Permission | Reset / Confirm | Mobile layout | Save owner | Downstream consumers | Audit owner | Backend gate class |
|---|---|---|---|---|---|---|---|
| SEC-1..4 Imports | Security · view / **Security · manage** (distinct, higher permission) | **direct gate** on every Upload — the import **cannot run**, so there is nothing to confirm (`security-import-backup-policy-contract.md` §H1, which **overrules** the earlier confirm→gate draft); Download-template = gate | each card's "Required columns" is a native `<details>` — collapses to a scrollable disclosure at 390px, no page-level overflow | backend (no `type=file`, nothing parsed client-side) | "creates/updates the core directories" — account-creation events, data quality everywhere | backend, **very high** — bulk mutation | `data-disabled-reason` (the real confirm ships with the real import, FO-10) |
| SEC-5 Backup | Security · view / **Security · manage** | **Send-backup = direct gate**, with **scope/destination/permission/audit rendered as standing visible copy** beside it (`security-import-backup-policy-contract.md` §B.3) — not staged in a confirm for an action that cannot run; Save-destination = gate | single row, 1 field (`sec-backupTo`) | backend | the database itself; a backup-complete notice | backend, **very high** | `data-disabled-reason` ×2 (**0 `data-confirm`**; the real confirm ships with the real backup, FO-11) |
| SEC-6 / SEC-7 Policies | Security · view / Security · edit | Edit = gate, no confirm (display-only until an edit surface exists); **independently gated — see §2** | full-width display body, no side-by-side columns at 390px | backend | family portal, teacher portal, onboarding | backend, ✔ (versioning, when real) | `data-disabled-reason` × 2, independent |
| SEC-8 Two-factor | Security · view / **Security · manage** | n/a — gate only | single structure row | backend/auth backend | authentication for admins and support; privileged-settings access | backend, **very high** | `data-disabled-reason` (`adm.set.sec.tfaReason`, reused from Spec 031) |

### 3.5 Users

| Form | Permission | Reset / Confirm | Mobile layout | Save owner | Downstream consumers | Audit owner | Backend gate class |
|---|---|---|---|---|---|---|---|
| USERS-1 (0-diff) | Users · view / **Users · manage** | n/a — no fields, no gate on this tab itself (`staff.html` owns the writes) | unchanged | n/a here — `staff.html` | every admin surface's visibility and write access, once real | backend, **very high** | n/a here — see `staff.html`'s own contract |

### 3.6 Integrations (per-provider variance in permission is none — all 11 share one profile; variance is in consumers/audit)

| Attribute | Value (applies to INTEG-1..11) |
|---|---|
| Permission | Integrations · **view status** (read-only role sees the chip, not the drawer) / Integrations · view (open drawer) / **Integrations · manage** (edit + Save) — the tightest permission in the hub |
| Reset / Confirm | Connect = gate, no confirm (nothing happens); Save = gate, no confirm (nothing persists); WhatsApp Logout, which in legacy kills all automation with **no confirm**, is **not rendered as a live action at all** (gate only) — the safest possible disposition, stricter than "add a confirm" |
| Mobile layout | provider grid reflows to **1 card per row** at mobile; each `integ-*` drawer is `.drawer.sheet`, width `min(440px,92vw)` — **never wider than 92% of the viewport**, so no field is clipped at 390px; sensitive structure rows (`.set-struct`) stack full-width beneath their safe fields |
| Save owner | backend (per-provider, 11 independent writes — §2) |
| Downstream consumers | payments (incoming ×7): family invoices, admin Finance, checkout; payouts (×2): teacher/staff salary disbursement — **no figure ever rendered here**; communications (×2): announcements, outbound mail, WhatsApp-routed notifications |
| Audit owner | backend; payments/payouts = **very high** (money / salary); communications = ✔ |
| Backend gate class | Connect = `data-disabled-reason` on the card; Save = the ONE `.btn-primary[data-disabled-reason]` inside the drawer (`smoke:1221`); provider-specific secondary actions (Test SMTP, Pair, Wake, Send-test) = additional `data-disabled-reason` gates, never the primary |

---

## 4. Sensitive-field classification — the rule restated once, bound to every form that has one

Any field in §1 whose value is a credential, secret, key, token, HMAC, webhook secret, or a plaintext account
password (the legacy import `password` column) is rendered as a **structure-only row**: label + required indicator
+ purpose sentence. **It is never an `<input>`, never masked, never `readonly` with a value.** Full census: **24
sensitive fields** across the 11 providers (`sensitive-provider-fields-contract.md`, Ledger R10 — the earlier "17"
figure silently dropped Paymob-Payout key1-3, Payoneer-Payout key1-3 and `smtp_username`; **24 is authoritative**)
+ **1 rejected import column** (`password`, families) that is not rendered even as a structure row (a column *name*
naming a secret is itself a disclosure the no-secret law forbids). This classification is bound per-form in §1's
"Structure rows" column and is never re-decided ad hoc by an implementing author.

---

## 5. Excluded field set — the complete negative space, by owning law

| Law | What it excludes | Where (form) | Count | Owner |
|---|---|---|---|---|
| Teacher pay-free GLOBAL | 10 legacy Teachers-tab controls + `rate_student_absent` | GEN-2 (the 1 field), GEN-1's "Teachers" section (all 10) | 11 | payroll/billing backend (FO-14), `pay-free-settings-exclusion-contract.md` |
| No-secret | `otp` (General/Security), `password` import column (Families) | GEN (not rendered anywhere) / SEC-2 | 2 | Spec 043 (FO-12, FO-16) |
| Pay-free (import) | `hour_rate`, `currency` columns | SEC-1, SEC-2 (currency+hour_rate), SEC-4 (currency only) | 3 distinct names / 6 slots | payroll backend (FO-13) |
| No-evidence (UNKNOWN, not invented) | "Pick from logo" ×2, WhatsApp QR/4-step wizard, dry-run/mapping/undo on imports, SMTP "Add Account" management, the 2 unlabelled policy selects (U-6) | CUST-1, INTEG-10, SEC-1..4, INTEG-11, SEC-6/7 | 7 named UNKNOWNs | Spec 053 / Spec 054 / backend, per `future-owner-register.md` |
| No-canvas/no-engine | contrast-validated palette engine, cascading country→city select, rules/conditional-show engine, Quill rich-text | CUST-2, GEN-1, GEN-2, SEC-6/7 | 4 engines | Spec 055 (FO-19, FO-20, FO-22) / not owned (structural, no engine anywhere) |
| **Total distinct excluded controls/mechanisms** | | | **27** | |

Zero of these 27 may be silently reintroduced by a later spec without a declared amendment to this contract and to
`future-owner-register.md`.

---

## 6. MUST NOT (any one = STOP; restates Ledger §K binding conditions as they apply to forms)

1. No form ships with fewer fields than its §1 accounting-closure row states.
2. No form's Save silently co-submits another form's edits (§2).
3. No sensitive field (§4) is ever an `<input>`, of any type, anywhere.
4. No `input[type=password]`, `input[type=file]`, `<canvas>`, `download=` attribute, `window.open`.
5. No pay figure/rate/fine/payout/currency token on any form (§5 row 1; `a31.currency === 0`).
6. No fake success wording on any Save/Upload/Send/Enable/Reset (every toast is the backendRequired sentence).
7. No new `data-*` hook, localStorage key, dependency, or component to satisfy any attribute in §3 — every row above
   is delivered with the **existing** primitives (`field()`, `settingsSection()`'s toggle, `formDrawer()`,
   `previewTemplate()`, native `<details>`). **And no new `data-confirm` chain** — Spec 040's confirm count is **0**.
8. No form is deferred, stubbed, or left generic with a comment citing Spec 056 (§0).

---

## 7. Acceptance

| # | Check | Expectation |
|---|---|---|
| C1 | Every row in §1 | present in the built `settings.html`/`.en` bodies with the exact `field()`/toggle/structure counts stated |
| C2 | Save-scope isolation (§2) | each save scope's `data-disabled-reason` primary mutates/tests **only** the controls inside its own scope (source-level: one `formDrawer`/section per scope) |
| C3 | Sensitive census (§4) | 24 structure rows on Integrations + 1 rejected `password` column reference = 0 occurrences anywhere as an input |
| C4 | Excluded set (§5) | grep 0 for every named token/name across built HTML **and** source comments (G8a scope-guard rule) |
| C5 | `a31.gates` | `>= 20` (Ledger sanctioned strengthening from `>= 4`) |
| C6 | `FORM_DRAWERS_032.settings` | 12 entries (`head-add` + 11 `integ-*`), each satisfying Ledger R4 |
| C7 | Locale parity | `adm.*` AR key-set === EN key-set, 0 divergence |
| C8 | a11y | every form's tab × AR/EN × light/dark + mobile-390 → critical=0, serious=0 |
| C9 | §0 compliance | no comment, commit message, or artifact in this spec's tree cites Spec 056 as a reason to reduce a field set |

**Status**: Binding. Sources: Ledger §A/§F/§G/§H/§K; `general-settings-completeness-contract.md`;
`automation-rules-contract.md`; `notification-matrix-contract.md`; `customisation-settings-scope.md`;
`safe-import-columns-contract.md`; `security-import-backup-policy-contract.md`;
`sensitive-provider-fields-contract.md`; `integrations-catalog-contract.md`; `settings-users-destination-contract.md`;
`role-permission-and-sensitive-data-carryover.md`; `settings-cross-surface-impact-register.md`;
`future-owner-register.md`; `forms-modals-interactions-register.md`.
