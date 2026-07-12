# Contract — Course & Class Automation Rules (Spec 040)

**Surface:** `settings.html#view=general` → the **Automation** block of `generalPanel()` (`app/src/js/pages/settings.js`).
**Data:** `AUTOMATION_GROUPS` in `app/src/js/fixtures/settings-management.js` (EXTENDED). **Copy:** `adm.set.gen.auto.*`
in `ar.adm.js` / `en.adm.js` (mirrored, 0 divergence). **Count impact 0.**

Legacy: General → **Course & class** tab — **18 controls / 17 distinct names**. **This entire group is absent from the
current app** (Spec 031 shipped four unused locale keys — `adm.set.gen.automationTitle|autoRenew|autoMakeup|autoClose`
— proving it was always intended).

**Rendered: 17 of 18.** The 18th, **`rate_student_absent`**, is **OMITTED BY LAW** (a pay field: "% of the class price
**added to the teacher's salary**") — see `pay-free-settings-exclusion-contract.md` row 11. Nothing else is dropped.

---

## 1. Control-type law (no new hook)

| Legacy type | Our rendering | Mechanism | Hook |
|---|---|---|---|
| select | `field({type:'select'})` | `.wiz-grid` inside the section | **none** (inert) |
| number | `field({type:'number'})` | `.wiz-grid` | **none** (inert) |
| checkbox / boolean | **`settingsSection({rows:[{control:{kind:'toggle'}}]})`** → `<button class="toggle" data-toggle data-toast=…>` | **existing** `data-toggle` hook + existing `.toggle/.knob/.is-on` CSS | **existing** |

`field()` supports only `text|number|select|textarea`; **no checkbox/toggle `field()` type is added** →
`form-field.js` and `settings-section.js` stay **0-diff**. **No new `data-*` hook, no new localStorage key, no new
dependency, no rules engine, no conditional-show JS.**

**Toggle honesty (ledger R5, mandatory):** each of the 7 toggles is a **labelled LOCAL PREVIEW** — it flips visually,
**persists nothing**, and its `data-toast` carries the **backendRequired** wording («يُتاح بعد ربط الخادم» /
"available once the server is connected"). It may **never** carry `set.savedToast` / «تم الحفظ» / "saved". The
Automation block carries the visible preview-only note **«معاينة فقط — لا يُخزَّن أي تغيير قبل ربط الخادم.» /
"Preview only — nothing is stored until the server is connected."** plus **ONE gated Save**
(`data-disabled-reason`).
⚠ **Copy trap (binding):** the note must **not** say "not saved" / «لا يتم الحفظ» — the fake-success census greps
`\bsaved\b` and «تم الحفظ» over body **and** template text, and «يتم الحفظ» literally contains «تم الحفظ». Both
naive phrasings would **red an honest build**. Use "stored" / «يُخزَّن».

---

## 2. The 17 rendered rules

Names obey the R1 naming law (no `pass|secret|api|key|token|webhook|card|cvv` substring in any `name`/`id`).
Selects/numbers are `field()` names (id = `f-<name>`); toggles are `<button>`s (no `name` attribute) identified by
their row id. **Persistence for every row below = `backendRequired` gated Save — nothing is stored, nothing is
computed.**

### Group 1 — `<details>` **Renewal** (`adm.set.gen.auto.renewalTitle`)

| Legacy name | Our id / name | Type | Description | Scope (who it affects) | Default (legacy) | Options | Dependency | Downstream surfaces |
|---|---|---|---|---|---|---|---|---|
| `new_course_status` | `gen-newCourseStatus` | select | The status a course lands in **after renewal** | admin · family · teacher | **`2` Active & unpaid** ✓ | `0` Inactive · `1` Active · `2` Active & unpaid · `6` Free | — | `courses.html`, `course.html`, family billing/requests, `finance.html` invoice creation |
| `renew` | `gen-renew` | select | Whether **unpaid** courses renew automatically | admin · family | **`1` On** ✓ | `0` Off · `1` On · `2` As family profile | — | `courses.html`, `finance.html` (invoice generation), family portal |
| `stop_after` | `gen-stopAfter` | number | Stop renewing after **N unpaid invoices** (a **count**, never an amount) | admin · family | `2` | integer ≥ 1 | **conditional on `renew` ≠ Off** — documented, **not implemented** (a live conditional would need a new hook) | `finance.html` (invoice rows), `courses.html` |

### Group 2 — `<details>` **Cancellation window** (`adm.set.gen.auto.cancelTitle`)

| Legacy name | Our id / name | Type | Description | Scope | Default | Options | Dependency | Downstream surfaces |
|---|---|---|---|---|---|---|---|---|
| `teacher_cancel_enable` | `gen-teacherCancel` | **toggle** | May a **teacher** cancel a class? | teacher | **off** | — | — | teacher portal session actions, `sessions.html`, `schedule.html` |
| `teacher_cancel_before_class` | `gen-teacherCancelWindow` | number (min) | Teacher cancellation window, in **minutes before** the class | teacher | `120` | integer ≥ 0 | conditional on `gen-teacherCancel` (documented) | teacher portal, `sessions.html`, cancellation/make-up flow |
| `student_cancel_enable` *(legacy **names** it `student_*` but **labels** it "Family")* | `gen-familyCancel` | **toggle** | May the **family** cancel a class? | family · student (child view) | **off** | — | — | family portal requests, `sessions.html` |
| `student_cancel_before_class` *(same naming bug)* | `gen-familyCancelWindow` | number (min) | Family cancellation window, in **minutes before** the class | family | `120` | integer ≥ 0 | conditional on `gen-familyCancel` (documented) | family portal requests, `sessions.html` |
| `auto_makeup` | `gen-autoMakeup` | select | What happens **automatically** on a cancelled class | admin · teacher · family | **`1` Auto make-up** ✓ | `0` No action · `1` Auto make-up · `2` No make-up · `3` Teacher absent | — | `sessions.html`, `schedule.html`, `attendance.html`, make-up flow. **Help (evidenced):** legacy runs this job at **04:00 daily** |
| `auto_add_makeup_to_credit` | `gen-makeupCredit` | **toggle** | Add a make-up class to the family's **hour credit** (hours — never money) | family | **on** | — | conditional on `gen-autoMakeup` (documented) | family billing **hour quota** (`family-billing`), `sessions.html` |
| `auto_add_no_makeup_to_credit` | `gen-noMakeupCredit` | **toggle** | Add a **no-make-up** class to the family's hour credit | family | **on** | — | conditional on `gen-autoMakeup` (documented) | family billing hour quota, `sessions.html` |

> **Zero-pay guard:** "credit" here is the **hour quota** already shipped by Spec 020 (40/12/28 hours, amount-free).
> No currency, no invoice figure, no arithmetic may appear on these rows.

### Group 3 — `<details>` **Attendance & class conduct** (`adm.set.gen.auto.attendTitle`)

| Legacy name | Our id / name | Type | Description | Scope | Default | Options | Dependency | Downstream surfaces |
|---|---|---|---|---|---|---|---|---|
| `teacher_absent_student` | `gen-teacherAbsentStudent` | **toggle** | The teacher-absent-student rule (the class is recorded when the **student** does not attend) | teacher · family · student | **off** | — | **The pay half of this rule (`rate_student_absent`) is OMITTED BY LAW** — the toggle is rendered, the % is not | `attendance.html`, `sessions.html`, outcome drawers |
| `show_enter_btn` | `gen-entryWindow` | number (min) | How many **minutes before** a class the entry button appears | teacher · family · student | `5` | integer ≥ 0 | — | `sessions.html`, `schedule.html`, teacher + family/student portals (the join surface itself is **FO-08 → Spec 054**) |
| `teacher_can_edit_class` | `gen-teacherEditClass` | select | May a teacher edit a class? | teacher | **`2` As teacher profile** ✓ | `0` Off · `1` On · `2` As teacher profile | — | teacher portal session actions, `sessions.html` |

### Group 4 — `<details>` **Class closing** (`adm.set.gen.auto.closeTitle`)

| Legacy name | Our id / name | Type | Description | Scope | Default | Options | Dependency | Downstream surfaces |
|---|---|---|---|---|---|---|---|---|
| `classes_not_closed` | `gen-classesNotClosed` | select | What to do with a class the teacher never **closed** | admin · teacher | **`0`** ✓ | `0` · `2` · `3` — **legacy value `1` is genuinely absent; do NOT invent it** | — | `sessions.html`, `attendance.html`, outcome drawers |
| `classes_not_closed_hours` | `gen-closeHours` | number (h) | …**after N hours** | admin · teacher | `12` | integer ≥ 1 | conditional on `gen-classesNotClosed` ≠ `0` (documented) | `sessions.html`, `attendance.html` |

### Group 5 — `<details>` **Reporting** (`adm.set.gen.auto.reportTitle`)

| Legacy name | Our id | Type | Description | Scope | Default | State | Downstream surfaces |
|---|---|---|---|---|---|---|---|
| `send_plan_report` **#1** | **`gen-courseCompleted`** | **toggle** | Send the **completed-course** report to management | admin | **UNKNOWN — legacy evidence is silent.** Authored **off**; the unknown is recorded in the fixture comment | live preview toggle | `reports.html`, outbound channel (Email/WhatsApp — **FO-07 → Spec 053**) |
| `send_plan_report` **#2** | **`gen-monthlyPlan`** | **toggle** | Send the **monthly plan** report | admin | — | **`mode:'disabled'` + honest reason** (legacy shipped it disabled). **The "No WhatsApp Connected" framing is NOT reproduced** — the reason reads «التقارير الدورية تحتاج قناة مُوصَّلة عبر الخادم.» / "Recurring reports need a channel connected on the server." | `reports.html`, outbound channel |

> **Legacy `name`+`id` collision, recorded not reproduced:** both report checkboxes ship as `send_plan_report` in
> legacy — a bug (the second can never post). Our two controls get **disambiguated** ids (`gen-courseCompleted`,
> `gen-monthlyPlan`); the collision is documented in the `AUTOMATION_GROUPS` fixture comment.
> **`teacher_delay_reminder`-style unknowns are never papered over:** where legacy evidence is silent (the #1 default),
> the fixture says **UNKNOWN** — no help text is invented.

---

## 3. Census (must hold)

| Class | Count |
|---|---|
| `field(type:'select')` | **5** — `gen-newCourseStatus`, `gen-renew`, `gen-autoMakeup`, `gen-classesNotClosed`, `gen-teacherEditClass` |
| `field(type:'number')` | **5** — `gen-stopAfter`, `gen-closeHours`, `gen-teacherCancelWindow`, `gen-familyCancelWindow`, `gen-entryWindow` |
| `data-toggle` previews | **7** — `gen-teacherCancel`, `gen-familyCancel`, `gen-makeupCredit`, `gen-noMakeupCredit`, `gen-teacherAbsentStudent`, `gen-courseCompleted`, `gen-monthlyPlan` (the last rendered `mode:'disabled'`) |
| **Rendered total** | **17** ✔ (of the ledger's 22 General `field()`s, automation contributes **10**) |
| Omitted by law | **1** — `rate_student_absent` |
| Gated Save | **1** for the whole Automation block |

---

## 4. Presentation

- The Automation block is **inline** (never a modal, never a drawer): one `panel()` containing **five native
  `<details>` accordions** (Renewal · Cancellation window · Attendance & class conduct · Class closing · Reporting).
  `<details>` is browser-native — **zero JS, zero new hook** (precedent: `add-family.js:51`). Styling via the additive
  `.set-acc` / `.set-acc > summary` classes (additive CSS is not a hook).
- Selects/numbers sit in a `.wiz-grid`; booleans sit as `settingsSection` toggle rows.
- **Dependencies are rendered as inline help text, not as behaviour.** "Only applies when renewal is on" is a
  sentence; there is no show/hide engine. Implementing one would require a new hook → forbidden.
- The **04:00 daily** auto-make-up job and the **timezone warning** (General identity) are the two pieces of
  evidenced help copy that must be surfaced verbatim in meaning.

---

## 5. MUST NOT (any one = STOP)

1. No `rate_student_absent` — no input, no label, no help, no fixture value, no locale key.
2. No pay figure, rate, fine, %-of-price or currency token anywhere in the Automation block (`a31.currency === 0`).
3. No computed value of any kind (no "N unpaid × price", no projected credit, no derived window).
4. No fake persistence: no toggle may toast «تم الحفظ» / "saved"; the block carries the visible preview-only note
   («لا يُخزَّن أي تغيير…» / "nothing is stored…", **never** "not saved" — §1) and **one** `data-disabled-reason`
   Save.
5. No invented option values — in particular **no `1` in `classes_not_closed`** and no channel/enum value that legacy
   does not evidence.
6. No reproduction of the legacy `send_plan_report` name collision, the "1th…28th" ordinal bug, or the
   "No WhatsApp Connected" framing.
7. No new `data-*` hook, new localStorage key, new dependency, new `field()` type, or conditional-show JS.
8. No `type=file`, no `type=password`, no `<canvas>`, no `download=`, no `window.open`.

---

## 6. Acceptance

| # | Check | Expectation |
|---|---|---|
| B1 | Automation census on `settings(.en).html` `#view=general` | 5 selects + 5 numbers with the exact names in §3, 7 `[data-toggle]` rows (1 with `disabled`/`aria-disabled`) |
| B2 | `rate_student_absent` grep (built HTML + source, **comments included**) | **0** |
| B3 | Every automation `[data-toggle]` `data-toast` | matches the **backendRequired** wording; **0** matches of `تم الحفظ\|\bsaved\b\|\bdone\b` anywhere in the block (the preview note included — hence «لا يُخزَّن», never «لا يتم الحفظ») |
| B4 | Automation Save | exactly **1** `[data-disabled-reason]` primary; **0** `data-demo-action` on any automation control |
| B5 | `a31.credInputs` / `a31.currency` on `settings(.en).html` | **0 / 0** |
| B6 | `classes_not_closed` option values | `0`, `2`, `3` only |
| B7 | Locale parity | `adm.set.gen.auto.*` AR key-set === EN key-set (0 divergence) |
| B8 | a11y | `#view=general` with all five `<details>` **open**, AR/EN × light/dark + mobile-390 → critical=0, serious=0; every toggle exposes `role="switch"` + `aria-checked` (existing `settingsSection` output) |
| B9 | Screenshots | `sp040-*` frames incl. the Automation accordions open (AR + EN) — 0 console errors |
