# Contract — Notification Matrix (Spec 040)

Surface: `settings(.en).html#view=notifications` (the **existing** `notifications` tab of `pages/settings.js`; nav id
`settingsNotifications`, `nav.config.js:113` → `route:'settings.html#view=notifications'`).
Baseline **HEAD `58a53e2`**. Count impact **0** (no page, no nav item, no hook, no storage key, no dependency).

Legacy source: `/management/settings/notification` — **one form, 47 configuration fields** (48 with `_token`),
**28 distinct names**, **one** `Save changes`. No tabs, no `<table>`, no modals. The current app renders
`NOTIF_MATRIX` = **6 display rows and 0 fields**. Spec 040 renders **all 47** as inert controls.

**Rendered census (binding, from the ledger F.2 / F.7):** **13 `field()`** (10 channel selects + 3 numbers) +
**34 `data-toggle` previews** (5 masters + 23 event checkboxes + 6 reminder toggles) = **47**. Gates on this tab:
**7** (one gated Save per rendered section). Omitted: **0**. Invented: **0**.

---

## 1. Channels — the one enum, authored verbatim

All **10** selects share one option set (raw-HTML evidence, not the screenshot):

| Value | EN label | AR label | Depends on an integration | Delivery possible today |
|---|---|---|---|---|
| `0` | Off | «إيقاف» | — | n/a |
| `1` | As profile | «حسب تفضيل المستلِم» | — | ✗ backendRequired |
| `3` | WhatsApp | «واتساب» | **✔ WhatsApp (provider id 1)** | ✗ backendRequired **+** integration |
| `4` | E-mail | «بريد إلكتروني» | **✔ Email/SMTP (provider id 11)** | ✗ backendRequired **+** integration |
| `5` | Private | «خاص» | — | ✗ backendRequired |

- **Value `2` does not exist in the legacy enum. It must never be invented.** (STOP condition.)
- Legacy renders `3` as “whats App” (typo). The **label** is corrected; the **value** is preserved byte-exact.
- **No hidden channel.** Every enum value is visible in every one of the 10 selects; no SMS/push/in-app value is
  added anywhere; the enum is identical across all 10 (no per-select subsetting).
- **In-app** is not an enum value — it is the master `appnotifiy` (§2), which legacy renders **disabled**.

**Channel axis is per (group × recipient), never per event.** Legacy has **no per-event channel override**;
inventing one is forbidden. This is why the rebuild is a **row matrix**, not a 2-D grid (§6).

---

## 2. Masters — 5 section toggles

| # | Fixture id | Legacy name | EN / AR | Authored default | Render |
|---|---|---|---|---|---|
| M1 | `ntf-system` | `system_notifications` | System notifications / «إشعارات النظام» | **on** | `settingsSection` toggle row |
| M2 | `ntf-inApp` | `appnotifiy` *(sic)* | In-app notifications / «إشعارات داخل التطبيق» | **disabled** | `control.kind:'toggle'`, `mode:'disabled'` + `reasonKey` |
| M3 | `ntf-courseMaster` | `course_updates` | Course updates / «تحديثات الدورات» | **on** | toggle row |
| M4 | `ntf-classMaster` | `class_updates` | Class updates / «تحديثات الحصص» | **on** | toggle row |
| M5 | `ntf-reminderMaster` | `class_reminder` | Class reminders / «تذكيرات الحصص» | **on** | toggle row |

M2: legacy ships it disabled **with no stated reason** — the reason is **UNKNOWN**. We therefore attach the honest
generic reason («يُتاح بعد ربط الخادم» / “available once the server is connected”), **not** an invented cause
(contrast General's `send_plan_report`#2, whose legacy disable reason “No WhatsApp Connected” *is* evidenced and is
still not reproduced as WhatsApp framing). Typos `appnotifiy` / “whats App” are **not** reproduced in copy.

---

## 3. THE MATRIX — one row per (event × recipient)

**Legend.** Channel cells describe how *this event* reaches *this recipient*:
`●` = the authored default of the governing channel select routes here · `○` = selectable (enum value present, not the
default) · `↳` = **inherited from the recipient's group channel select — there is no per-event channel control** ·
`—` = not available (master disabled / no evidence).
`Default` = the authored state of the event's own on/off toggle. **Nothing in this table is computed.**

### 3.1 Course updates — group `crs` · master `ntf-courseMaster` · 5 event rows

Governing selects: teacher → `ntf-crsTeacherCh` (`teacher_course_updates`, default **3 WhatsApp**) ·
family → `ntf-crsFamilyCh` (`student_course_updates`, default **3 WhatsApp**).

| # | Event id | Event label (EN / AR) | Group | Recipient | App | E-mail | WhatsApp | Private / Group | Dependent integration | Default | Trigger source (backend) |
|---|---|---|---|---|---|---|---|---|---|---|---|
| E01 | `ntf.ev.crs.create` | Create / «إنشاء دورة» | Course | **Teacher** | — (M2) | `○↳` | `●↳` | `○` Private (5) · group N/A | WhatsApp | **off** | Course catalogue |
| E02 | `ntf.ev.crs.edit` | Edit / «تعديل دورة» | Course | **Teacher** | — | `○↳` | `●↳` | `○` | WhatsApp | **on** | Course catalogue |
| E03 | `ntf.ev.crs.create` | Create / «إنشاء دورة» | Course | **Family** | — | `○↳` | `●↳` | `○` | WhatsApp | **off** | Course catalogue |
| E04 | `ntf.ev.crs.edit` | Edit / «تعديل دورة» | Course | **Family** | — | `○↳` | `●↳` | `○` | WhatsApp | **on** | Course catalogue |
| E05 | `ntf.ev.crs.status` | Status change / «تغيير حالة الدورة» | Course | **Family** | — | `○↳` | `●↳` | `○` | WhatsApp | **off** | Course catalogue |

Legacy names: `teacher_course_updates_statuses[]` (2 boxes) · `student_course_updates_statuses[]` (3 boxes) — the
**asymmetry is real**: only the family set carries **Status**. Legacy's family help copy says the event goes “to the
student”; the rebuild says **family** (recipient honesty, §7-R4).

### 3.2 Class updates — group `cls` · master `ntf-classMaster` · 18 event rows

Governing selects: teacher → `ntf-clsTeacherCh` (`teacher_class_updates_type`, default **3**) ·
family → `ntf-clsFamilyCh` (`student_class_updates_type`, default **3**).
Legacy names: `teacher_class_update_statuses[]` (9, **all checked**) · `student_class_update_statuses[]` (9, **all
checked**).

| # | Event id | Legacy code | Event label (EN / AR) | Recipient | App | E-mail | WhatsApp | Private | Dep. integration | Default | Trigger source |
|---|---|---|---|---|---|---|---|---|---|---|---|
| E06 | `ntf.ev.cls.waiting` | 1 | Waiting / «قيد الانتظار» | **Teacher** | — | `○↳` | `●↳` | `○` | WhatsApp | **on** | Session lifecycle |
| E07 | `ntf.ev.cls.running` | 2 | Running / «جارية» | **Teacher** | — | `○↳` | `●↳` | `○` | WhatsApp | **on** | Session lifecycle |
| E08 | `ntf.ev.cls.cancel` | 3 | Cancel / «إلغاء» | **Teacher** | — | `○↳` | `●↳` | `○` | WhatsApp | **on** | Session lifecycle |
| E09 | `ntf.ev.cls.absent` | 4 | Absent / «غياب» | **Teacher** | — | `○↳` | `●↳` | `○` | WhatsApp | **on** | Attendance |
| E10 | `ntf.ev.cls.teacherAbsent` | **6** | Teacher absent / «غياب المعلّم» | **Teacher** | — | `○↳` | `●↳` | `○` | WhatsApp | **on** | Attendance |
| E11 | `ntf.ev.cls.autoMakeup` | 7 | Auto makeup / «تعويض تلقائي» | **Teacher** | — | `○↳` | `●↳` | `○` | WhatsApp | **on** | Session lifecycle |
| E12 | `ntf.ev.cls.reject` | 8 | Reject / «رفض» | **Teacher** | — | `○↳` | `●↳` | `○` | WhatsApp | **on** | Session lifecycle |
| E13 | `ntf.ev.cls.cancelRequest` | 9 | Cancel request / «طلب إلغاء» | **Teacher** | — | `○↳` | `●↳` | `○` | WhatsApp | **on** | Session lifecycle |
| E14 | `ntf.ev.cls.approve` | 10 | Approve / «موافقة» | **Teacher** | — | `○↳` | `●↳` | `○` | WhatsApp | **on** | Session lifecycle |
| E15 | `ntf.ev.cls.waiting` | 1 | Waiting / «قيد الانتظار» | **Family** | — | `○↳` | `●↳` | `○` | WhatsApp | **on** | Session lifecycle |
| E16 | `ntf.ev.cls.running` | 2 | Running / «جارية» | **Family** | — | `○↳` | `●↳` | `○` | WhatsApp | **on** | Session lifecycle |
| E17 | `ntf.ev.cls.cancel` | 3 | Cancel / «إلغاء» | **Family** | — | `○↳` | `●↳` | `○` | WhatsApp | **on** | Session lifecycle |
| E18 | `ntf.ev.cls.absent` | 4 | Absent / «غياب» | **Family** | — | `○↳` | `●↳` | `○` | WhatsApp | **on** | Attendance |
| E19 | `ntf.ev.cls.endClass` | **5** | End class / «إنهاء الحصة» | **Family** | — | `○↳` | `●↳` | `○` | WhatsApp | **on** | Session lifecycle |
| E20 | `ntf.ev.cls.autoMakeup` | 7 | Auto makeup / «تعويض تلقائي» | **Family** | — | `○↳` | `●↳` | `○` | WhatsApp | **on** | Session lifecycle |
| E21 | `ntf.ev.cls.reject` | 8 | Reject / «رفض» | **Family** | — | `○↳` | `●↳` | `○` | WhatsApp | **on** | Session lifecycle |
| E22 | `ntf.ev.cls.cancelRequest` | 9 | Cancel request / «طلب إلغاء» | **Family** | — | `○↳` | `●↳` | `○` | WhatsApp | **on** | Session lifecycle |
| E23 | `ntf.ev.cls.approve` | 10 | Approve / «موافقة» | **Family** | — | `○↳` | `●↳` | `○` | WhatsApp | **on** | Session lifecycle |

**The asymmetry is law, not a bug to “fix”:** the teacher set carries **Teacher absent (6)** and the family set
carries **End class (5)**. **Neither set has both.** Codes are preserved as fixture metadata (comment/`code` field),
**never rendered as a raw code** to the user. Legacy label “Absent (4)” does not say *whose* absence — the label is
rendered **verbatim** and the semantics are recorded **UNKNOWN**; only code **6** is evidenced as the teacher's.

### 3.3 Class reminders — group `rem` · master `ntf-reminderMaster` · 6 event rows

Governing selects: teacher → `ntf-remTeacherCh` (`teacher_reminder_type`, default **3**) ·
family → `ntf-remFamilyCh` (`student_reminder_type`, default **3**).

| # | Event id | Legacy name | Event label (EN / AR) | Recipient | App | E-mail | WhatsApp | Private | Dep. integration | Default | Trigger source |
|---|---|---|---|---|---|---|---|---|---|---|---|
| E24 | `ntf.ev.rem.daily` | `teacher_daily_class_reminder` | Daily class reminder / «تذكير يومي بالحصص» | **Teacher** | — | `○↳` | `●↳` | `○` | WhatsApp | **on** | Scheduler |
| E25 | `ntf.ev.rem.late3` | `teacher_delay_reminder` | Late 3 minutes / «تأخّر ٣ دقائق» | **Teacher** | — | `○↳` | `●↳` | `○` | WhatsApp | **on** | Scheduler |
| E26 | `ntf.ev.rem.beforeSession` | `teacher_reminder` | Before the session / «قبل بدء الحصة» | **Teacher** | — | `○↳` | `●↳` | `○` | WhatsApp | **on** | Scheduler |
| E27 | `ntf.ev.rem.reschedule` | `student_send_reschedule_reminders` | Reschedule reminders / «تذكير بإعادة الجدولة» | **Family** | — | `○↳` | `●↳` | `○` | WhatsApp | **on** | Scheduler |
| E28 | `ntf.ev.rem.manual` | **`teacher_send_manual_reminder`** | Manual reminder / «تذكير يدوي» | **Family** | — | `○↳` | `●↳` | `○` | WhatsApp | **on** | Scheduler |
| E29 | `ntf.ev.rem.beforeSession` | `student_reminder` | Before the session / «قبل بدء الحصة» | **Family** | — | `○↳` | `●↳` | `○` | WhatsApp | **on** | Scheduler |

- **E25 semantics are UNKNOWN.** Legacy label “Late 3 Minutes” is rendered verbatim; **no help text is invented**
  (is it *fires after* 3 minutes? *tolerates* 3 minutes? unproven → silent).
- **E28 is the legacy naming bug**: a `teacher_`-named field placed inside the **family** block. Recipient =
  **family** (its block); our id is `ntf.ev.rem.manual` and the anomaly is recorded in a fixture comment. The legacy
  field name is **not** reproduced as a DOM name.

**Row census: 5 (course) + 18 (class) + 6 (reminders) = 29 event toggles.** Plus 5 masters = **34 `data-toggle`**. ✔

---

## 4. Non-event controls — 10 selects + 3 numerics (the 13 `field()`s)

**DOM naming law (Risk R1, `smoke:1174` `a31.credInputs`)** — no `name`/`id` on this tab may contain
`pass · secret · api · key · token · webhook · card · cvv`. Additionally, defensively, **no `name` contains
`salary`** (the FORM_DRAWERS_032 OMIT regex at `smoke:92` and any future sitewide widening of it):
`salaries` → **`ntf-salEventsCh`**.

| # | DOM `name` / `id` | Legacy name | Type | Options / value | Recipient | Default | Dependent integration at default |
|---|---|---|---|---|---|---|---|
| C01 | `ntf-crsTeacherCh` | `teacher_course_updates` | select | 0/1/3/4/5 | Teacher | **3** WhatsApp | WhatsApp |
| C02 | `ntf-crsFamilyCh` | `student_course_updates` | select | 0/1/3/4/5 | Family | **3** | WhatsApp |
| C03 | `ntf-clsTeacherCh` | `teacher_class_updates_type` | select | 0/1/3/4/5 | Teacher | **3** | WhatsApp |
| C04 | `ntf-clsFamilyCh` | `student_class_updates_type` | select | 0/1/3/4/5 | Family | **3** | WhatsApp |
| C05 | `ntf-remTeacherCh` | `teacher_reminder_type` | select | 0/1/3/4/5 | Teacher | **3** | WhatsApp |
| C06 | `ntf-remFamilyCh` | `student_reminder_type` | select | 0/1/3/4/5 | Family | **3** | WhatsApp |
| C07 | `ntf-invoiceCh` | `invoice` | select | 0/1/3/4/5 | Family *(implicit)* | **5** Private | — |
| C08 | `ntf-invoiceReminderCh` | `invoice_reminder` | select | 0/1/3/4/5 | Family *(implicit)* | **5** Private | — |
| C09 | **`ntf-salEventsCh`** | `salaries` | select | 0/1/3/4/5 | Teacher | **3** WhatsApp | WhatsApp |
| C10 | `ntf-familyStatusCh` | `family_status` | select | 0/1/3/4/5 | Family | **0** Off | — |
| N01 | `ntf-remTeacherHours` | `hours_to_reminder_teacher` | number | **2** (hours before the session) | Teacher | 2 | — |
| N02 | `ntf-remFamilyHours` | `hours_to_reminder_student` | number | **2** | Family | 2 | — |
| N03 | `ntf-invoiceReminderDays` | `invoice_reminder_days` | number | **3** (days between reminders) | Family | 3 | — |

**C07/C08 recipient is `implicit` in legacy** (no recipient control exists) — rendered under the *Invoices* section
addressed to the **family**, with the implicitness recorded in the fixture comment. Not invented: no teacher/staff
invoice recipient is added.

### 4.1 C09 — the salary row (pay-free law)

**Salary events are a NOTIFICATION CATEGORY ONLY.** `ntf-salEventsCh` routes *the event*; it carries **zero
figure**: no amount, no rate, no fine, no payout, no currency symbol or code, no period value, no computed total.
Grep census for the notifications panel body: `ريال|SAR|جنيه|EGP|AED|EUR|$|€|£` = **0** (Risk R2, `a31.currency===0`)
and pay-figure tokens = **0** (`payHit`/`tchPay`/`payFigure` stay green, byte-verbatim).
Admin-side *wording* «إشعارات الرواتب» / “Salary events” is sanctioned by the Spec-030 **figure-free** finance
Salaries tab; a salary **number** may never appear on any surface. The legacy WhatsApp-card copy advertising
“salary reports” is **not** reproduced (ledger F.5).

---

## 5. Sections — 9 evidenced groups → 7 rendered `settingsSection`s

| Rendered section | Locale key | Evidenced legacy group(s) | Controls | Gated Save |
|---|---|---|---|---|
| S1 System | `adm.set.notif.sec.system` | System + In-app | M1, M2 | ✔ |
| S2 Course updates | `adm.set.notif.sec.course` | Course updates | M3, C01, C02, E01–E05 | ✔ |
| S3 Class updates | `adm.set.notif.sec.class` | Class updates | M4, C03, C04, E06–E23 | ✔ |
| S4 Class reminders | `adm.set.notif.sec.reminders` | Class reminders | M5, C05, C06, N01, N02, E24–E29 | ✔ |
| S5 Invoices | `adm.set.notif.sec.invoices` | Invoice + Invoice reminder | C07, C08, N03 | ✔ |
| S6 Salary events | `adm.set.notif.sec.salary` | Salaries | C09 | ✔ |
| S7 Family status | `adm.set.notif.sec.familyStatus` | Family status | C10 | ✔ |

**7 sections ⇒ 7 gates** (ledger F.7: Notifications gates = 7). Legacy has **one** global `Save changes`; we split it
per section so each preview block owns its own honest gate. **No section is collapsed away, no group is merged out of
existence** — S1 and S5 each fold two *adjacent, same-subject* legacy groups (System+In-app, Invoice+Invoice-reminder)
and every control inside them still renders.

---

## 6. UI CONTRACT

### 6.1 Shape — grouped row matrix (NOT a scrolling grid)

Legacy renders label rows + switches; **there is no `<table>` and no channel axis per event** (§1). The rebuild is a
**grouped row matrix**: 7 `settingsSection` cards → within each, one row per (event × recipient), the recipient's
channel `select` + numerics rendered **inline at the head of the recipient block**.

| Decision | Verdict | Reason |
|---|---|---|
| 2-D grid (events × channels) with a **sticky event column** + `overflow-x:auto` | **NOT TAKEN** | There is nothing to put on the horizontal axis: the channel is chosen **once per (group × recipient)**, never per event. A grid would have to **invent** 5 per-event channel cells × 29 rows = 145 controls that do not exist in legacy — a fabrication, and it would inflate 47 → 192 controls. It would also require a new sticky/scroller CSS class beyond the three additive classes the ledger sanctions (`.set-struct`, `.set-acc`, `.set-swatch`). |
| **Contingency (binding, if a future amendment ever renders a true grid)** | must obey | The grid **must** live inside its own `overflow-x: auto` container (the page body may never scroll horizontally), the event column **must** be sticky at the inline-start edge (`inset-inline-start:0` — RTL-correct, not `left`), and the amendment must declare the new CSS class + re-baseline the a11y scrollable-region row (precedent: the Spec-034 `tasks` scrollable-region fix). **Spec 040 does not do this.** |
| **Desktop containment** | ✔ satisfied structurally | Row shape ⇒ zero horizontal overflow at any width; nothing to contain. |
| **Mobile (390px) alternative** | ✔ native `<details>` | Each recipient block inside a section is a native `<details class="set-acc">` disclosure (`summary` = recipient + its channel chip). **Zero JS, zero new hook** (precedent: `add-family.js:51`; `.set-acc` is one of the three ledger-sanctioned additive classes). The row shape *is* the card shape — no separate mobile component, no duplicated markup, no `hidden`-swapped desktop/mobile trees. |
| RTL | ✔ | Rows + logical properties only; no absolute `left/right`. AR is the authored primary. |

### 6.2 Control types — the honest decision (ledger F, universal control-type law)

- `field()` supports **only** `text|number|select|textarea`. **No checkbox/toggle `field()` type is added** —
  `form-field.js` stays **0-diff**.
- Every boolean (all **34**) is rendered through the **already-existing**
  `settingsSection({rows:[{control:{kind:'toggle'}}]})` path (`components/settings-section.js:26-31`), which emits
  `<button class="toggle" role="switch" aria-checked data-toggle data-toast="…">`. **Existing `data-toggle` hook,
  existing `.toggle/.knob/.is-on` CSS. `settings-section.js` stays 0-diff.**
- Toggles are `<button>`s, not `<input>`s → they cannot trip `passwordInputs` / `fileInputs` / `credInputs`.
- **NO new `data-*` hook · NO new localStorage key · NO new component · NO new dependency.**

### 6.3 Honesty — no fake send, no fake save

| Rule | Implementation | Guard |
|---|---|---|
| **No fake save** | Every one of the 34 toggles carries the **backendRequired** `data-toast` («يُتاح بعد ربط الخادم» / “available once the server is connected”). **`set.savedToast` / «تم الحفظ» / “saved” / “done” must not appear on this tab** (Risk R5). | sitewide FAKE-success guard + the Spec-040 text census |
| **No fake persistence** | The toggle flips **visually only**. Each of the 7 sections carries the visible note **«معاينة فقط — لا يُخزَّن أي تغيير قبل ربط الخادم.» / “Preview only — nothing is stored until the server is connected.”** ⚠ **Never** «معاينة فقط — لا يتم الحفظ» / “preview only — not saved”: «يتم الحفظ» contains «تم الحفظ» and "not saved" contains `\bsaved\b`, so that phrasing would trip the fake-success census and **red an honest build**. | the `fakeSaved` census (body **and** template text) |
| **No fake send** | Nothing on this tab sends, tests, previews or queues a notification. There is **no** “Send test” control (legacy has none either — inventing one is forbidden). | — |
| **Final write** | 7 × `data-disabled-reason` gated Save (`backendRequired`). **0** `data-demo-action` on this tab. | `g32` MUST-GATE freeze |
| **No fake connectivity** | **No channel and no provider may read “Connected”.** | STOP condition 5 |
| **No secrets / files** | 0 `type=password`, 0 `type=file`, 0 `<canvas>`, 0 `download=`, 0 `window.open`. | STOP condition 4 |
| **No hidden channel** | The 5-value enum is complete and identical in all 10 selects; value `2` is never emitted. | §7 probe P4 |
| **Zero pay figure** | §4.1. | `a31.currency===0`, `payHit` |

### 6.4 Integration-unavailable indicator

Each recipient block whose channel enum can route to a dependent channel carries **one static, icon+text status
chip pair**, authored from the Integrations fixture's honest state:

| Chip | Copy (AR / EN) | Tone |
|---|---|---|
| WhatsApp | «واتساب — غير مُعدّ · يتطلّب تكاملًا وخادمًا» / “WhatsApp — not configured · requires the integration and the server” | `neutral` |
| E-mail / SMTP | «البريد — غير مُعدّ · يتطلّب تكاملًا وخادمًا» / “E-mail — not configured · requires the integration and the server” | `neutral` |

⚠ **Chip-token law (binding, and the reason the copy says "not configured" rather than "not connected"):** no chip
anywhere in the hub may contain «متصل» / `connected` **in any form** — the fake-connected census is **chip-scoped and
token-absolute** (`0` `.chip` matching `/متصل|connected/i`). It must be token-absolute because a body-wide
affirmative-only regex is unwritable: the honest backendRequired sentence *"available once the server is connected"*
legitimately contains the word elsewhere on the page. Vocabulary of record:
`integrations-catalog-contract.md` §2.

- Chips are **icon + text** (status/signal-chip law) and use only the six build-guarded tones
  (`live|upcoming|completed|cancelled|amber|neutral`, `build-html.mjs:168-175` — a 7th tone **throws at build**,
  Risk R6). **`live`/`completed` are forbidden here** — they would read as “connected”.
- The chips are **static** (authored from the default state), so they state a **channel-availability fact** that is
  true for *any* selection: choosing WhatsApp or E-mail cannot deliver anything until that integration **and** the
  backend exist. They deliberately do **not** track the select's live value — `enhance.js` is **0-diff** and a
  chip that silently went stale on change would be dishonest.
- **The indicator is TEXT-ONLY — never an anchor.** Verified: `grep -rn "hashchange" app/src/js/` = **0 hits** and
  `components/tabs.js` binds no hash listener, so an in-page `<a href="settings.html#view=integrations">` would
  change the hash **without switching the tab** — a dead-feeling link. Cross-tab navigation to Integrations is done
  from the **sidebar** (`settingsIntegrations` → `settings.html#view=integrations`), which is a fresh load and works.

### 6.5 State legibility (icon + text) — decision N-D3

The `settings-section.js` toggle conveys state via `role="switch"` + `aria-checked` + knob position + `.is-on`
(the Spec-001 sanctioned control, shipped on every settings surface since). **A separate text state chip per toggle
is NOT added**: it could not track the local preview flip without touching `enhance.js` (0-diff, STOP condition 1),
and a stale “on/off” chip beside a toggle the user just flipped would be **worse than no chip**. The icon+text law is
satisfied where it applies — on **status/signal chips** (§6.4 integration state), which are the only status claims on
this tab. Recorded so no reviewer reads this as an oversight.
Legacy's own event chips show a ✓ with **no visible off-state** (colour/glyph only) — **not reproduced**; our off
state is an unambiguous unchecked switch with an accessible name.

### 6.6 Copy / locale parity

- Keys live in `ar.adm.js` / `en.adm.js` **only** (already registered → **`i18n.js` 0-diff**).
- Namespaces: `adm.set.notif.sec.*` (7) · `adm.set.notif.master.*` (5) · `adm.set.notif.ev.*` (**28 distinct event
  labels reused across recipients** — E01/E03, E02/E04, the 8 shared class codes, `beforeSession` ×2 share one key
  each) · `adm.set.notif.ch.*` (5 channel labels) · `adm.set.notif.field.*` (13) · `adm.set.notif.note.*`,
  `adm.set.notif.chip.*`, `adm.set.notif.reason.*`.
- **AR/EN key sets must be EQUAL — 0 divergence** (STOP condition 10). AR is authored first; EN mirrors.
- Legacy typos (`appnotifiy`, “whats App”) and legacy's misleading family copy (“to the student”) are **not**
  reproduced. Legacy field names never surface as UI copy.

---

## 7. Acceptance probes (additive smoke coverage — no protected assert changed)

| # | Probe | Expectation |
|---|---|---|
| P1 | `settings(.en).html#view=notifications` on a **fresh context** with `localStorage['academy.schedView.settings']` seeded to another tab | exactly **one** visible `[role=tabpanel]` = `notifications`; **0** external requests |
| P2 | Control census inside `[data-tabpanel="notifications"]` | `select` = **10** · `input[type=number]` = **3** · `button[data-toggle]` = **34** → **47** |
| P3 | Gates | `[data-disabled-reason]` ≥ **7**; `[data-demo-action]` = **0** |
| P4 | Channel enum | every one of the 10 selects has **exactly 5** `<option>`s with values `0,1,3,4,5`; **no option value `2`**; option sets identical across all 10 |
| P5 | Class asymmetry | teacher block contains `teacherAbsent` and **not** `endClass`; family block contains `endClass` and **not** `teacherAbsent`; **9 event toggles each** |
| P6 | No-fake (two scopes — do **not** merge them) | **(a) fake-success, text-scoped:** panel text matches **no** `/تم الحفظ\|\bsaved\b\|\bdone\b\|بنجاح\|\bsuccessfully\b\|تم الإرسال/i` — which is why the preview note reads «معاينة فقط — لا يُخزَّن أي تغيير قبل ربط الخادم.» / "Preview only — nothing is stored…" and **never** "not saved" / «لا يتم الحفظ» (both contain the banned token). **(b) fake-connected, CHIP-scoped:** **0** `.chip` matching `/متصل\|connected/i` — never a body-wide `/connected/i` grep, because the backendRequired sentence *"available once the server is connected"* legitimately contains the word. Every `data-toggle` `data-toast` = the backendRequired string |
| P7 | Pay-free / money-free | panel matches **no** `/ريال|SAR|جنيه|EGP|AED|EUR|\$|€|£/` and no rate/fine/payout figure; `a31.currency === 0` holds page-wide |
| P8 | Secrets / naming (R1) | `input[type=password]` = 0 · `input[type=file]` = 0 · `<canvas>` = 0 · no `name`/`id` matching `/pass|secret|api|key|token|webhook|card|cvv/i` (⇒ `ntf-salEventsCh`, never `salaries`) |
| P9 | a11y | new rows for `#view=notifications` × AR/EN × light/dark + mobile-390 + the roving-tabindex keyboard row → **critical=0, serious=0**; every toggle has an accessible name; `<details>` disclosures are keyboard-operable |
| P10 | Nav | `settingsNotifications` is a real `<a href="settings(.en).html#view=notifications">`, `data-coming-soon` absent (Spec-040 nav040 block) |

---

## 8. Field accounting (must balance)

| Bucket | Count |
|---|---|
| Legacy evidenced controls | **47** (28 distinct names) |
| Rendered — `field()` selects | 10 |
| Rendered — `field()` numbers | 3 |
| Rendered — `data-toggle` previews (5 masters + 23 event checkboxes + 6 reminder toggles) | 34 |
| **Rendered total** | **47** |
| Omitted | **0** |
| Invented | **0** |
| Gates added | 7 |
| New pages / hooks / storage keys / dependencies / components | **0 / 0 / 0 / 0 / 0** |

`13 + 34 = 47 = 47 evidenced.` ✔ Reducing this matrix to “a few generic toggles” is an **explicit defect**
(`notification-settings-scope.md` rule 1).
