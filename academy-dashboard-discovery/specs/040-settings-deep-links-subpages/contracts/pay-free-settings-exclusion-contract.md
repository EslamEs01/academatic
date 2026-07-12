# Contract — Pay-Free Settings Exclusion (Spec 040)

**Standing law (binding, non-negotiable):** *Teacher pay-free GLOBAL — no salary / rate / fine / payout /
compensation **FIGURE** anywhere.* Spec 040 completes the Settings hub over a legacy surface whose General tab is a
**complete teacher-pay engine**. This contract enumerates every excluded control **by exact legacy name**, so the
omission is deliberate, auditable, and can never be silently "restored".

**Scope:** the legacy General → **Teachers** tab (10 controls) **+ `rate_student_absent`** (a pay field hiding in the
Automation tab) = **11 excluded pay fields**. Plus the pay-adjacent columns/labels listed in §4.

---

## 1. The 11 excluded fields

`Ø` = **not rendered anywhere**: no input, no toggle, no display row, no chip, no label, no help string, no fixture
value, no locale key. Grep-asserted to zero.

| # | Exact legacy name | What it is (evidence) | Why it violates the law | Frontend disposition (Spec 040) | Future backend owner |
|---|---|---|---|---|---|
| 1 | `settings_data[1]` | Default teacher **hour rate** (the base session rate) | A pay **figure** — the single number the whole payroll engine multiplies | **Ø** — omitted; its section header "Hour Rates" is not rendered | **payroll/billing backend** (FO-14) |
| 2 | `hours-input` *(hour-rate tier template — "If greater than N hours")* | The **threshold** input of a repeatable hour-rate tier | Half of a pay **tier rule**; renders only to author a rate | **Ø** — omitted; the tier repeater is not rebuilt | **payroll/billing backend** (FO-14) |
| 3 | `rate-input` → dynamic **`settings_data[<hours>]`** | The **value** input of the same tier ("…the rate becomes X") | A pay **figure**, and a **computed** rate selection (rate = f(hours)) — computation is forbidden frontend-side | **Ø** | **payroll/billing backend** (FO-14) |
| 4 | `salary_period_type` | Pay period (`monthly` / `custom_day`) | A **salary** rule; exists only to close a payroll cycle | **Ø** — the section header "Salary" is not rendered | **payroll/billing backend** (FO-14) |
| 5 | `salary_period_day` | Pay-period day (28 options; legacy has the "1th…28th" ordinal bug) | Same — a payroll-cycle control (the bug is recorded, not reproduced) | **Ø** | **payroll/billing backend** (FO-14) |
| 6 | `applayFins` *(sic — legacy typo)* | Master switch: enable the **late-start fine** | A **fine/deduction** rule against teacher pay | **Ø** — no toggle, not even a disabled one | **payroll/billing backend** (FO-14) |
| 7 | `hours-input` *(persisted fine tier — minutes, value `10`)* | The **minutes-late threshold** of a persisted fine tier | Half of a **deduction** rule | **Ø** | **payroll/billing backend** (FO-14) |
| 8 | **`fin[10]`** *(persisted late-start discount %, value `5`)* | **Discount / fine percentage** applied when a teacher starts ≥10 min late | A pay **figure** (a %) that **reduces a salary** — a computed deduction | **Ø** | **payroll/billing backend** (FO-14) |
| 9 | `hours-input` *(empty fine-tier template)* | The blank repeater row for a new fine tier | Authoring UI for a deduction rule | **Ø** | **payroll/billing backend** (FO-14) |
| 10 | `rate-input` → dynamic **`fin[<minutes>]`** | The value input of the blank fine tier | Pay **figure** + computed deduction | **Ø** | **payroll/billing backend** (FO-14) |
| 11 | **`rate_student_absent`** *(Automation tab, number, default `50`)* | Legacy label: **"Teacher Absent Student Class Rate" — "what percentage of the class price is added to the teacher's salary"** | It is a **pay field hiding in the automation tab**: a % of price → **added to a salary**. Both a figure and a computation | **Ø** — it is the ONE omission inside the otherwise fully-rendered 17-control automation group (`automation-rules-contract.md`) | **payroll/billing backend** (FO-14) |

**Also not rendered:** the legacy **section headers** «Hour Rates» / «Salary» / «Salary Tiers» and **all** of their
help copy; the legacy tab's own `Save changes` button and its `PATCH` endpoint.

**Same owner as the standing lock.** FO-14 (these 11 fields) and **FO-15** (`classSalaryReport`, the ONE remaining
`disabled` nav lock, `reasonKey:'nav.reason.finance'`) share one owner: the **payroll/billing backend**. A real
class-salary report implies computed per-class pay — exactly what these 11 fields would feed. Spec 040 changes
`classSalaryReport` in no way (ledger A: disabled locks 1 → 1).

---

## 2. What the Settings form MUST show instead (the honest, non-numeric explanation)

The omission must be **visible and explained** — an unexplained hole is dishonest-by-omission. The General ›
Identity section carries a non-numeric pointer **today** (Spec 031). It stays, **byte-verbatim**, and is joined by
one non-numeric explanation of *why* payroll is absent.

| Key | Status | AR | EN |
|---|---|---|---|
| `adm.set.gen.payNote` | **EXISTING — must remain byte-verbatim** (`ar.adm.js:108` / `en.adm.js:108`) | «قواعد أجور المعلمين تُدار ضمن قسم المالية.» | "Teacher pay rules are managed in the Finance section." |
| `adm.set.gen.payRulesTitle` | **NEW** (mirrored AR/EN) | «أجور المعلمين والرواتب» | "Teacher pay & payroll" |
| `adm.set.gen.payRulesNote` | **NEW** (mirrored AR/EN) | «فترات الرواتب وشرائح الأجر وخصومات التأخير تعتمد على محرّك محاسبي حقيقي. لا تُعرض هنا أي قيمة أو نسبة، ولا تُجري الواجهة أي حساب للأجور. تُدار هذه القواعد بالكامل بعد ربط الخادم المحاسبي.» | "Salary periods, pay tiers and late-start deductions depend on a real accounting backend. No value or percentage is shown here, and the frontend performs no pay calculation of any kind. These rules are managed once the accounting backend is connected." |

**Rendering rules for this note (all mandatory):**
- It is a **static text row** (`set-row` / `set-help`) — **not** a gate button, **not** a drawer, **not** a link to a
  pay surface, **not** a toggle. There is nothing to click, because there is nothing to configure.
- It contains **0 digits**, **0 currency tokens**, **0 percentages** and names **no** legacy field.
- It never says "coming soon" (Spec 040 drives `[data-coming-soon]` to **0** sitewide) and never implies the
  frontend will one day compute pay.
- The AR/EN pair must be exactly mirrored (`adm.*` key-set divergence must stay **0**).

> Precedent that the *wording* is safe on this surface: `adm.set.gen.payNote` already ships «أجور المعلمين» on
> `settings.html` today and passes every guard. The law bans **figures**, not the honest naming of an absent
> capability.

---

## 3. Where pay pressure re-enters Spec 040 — and how it is held out

| Surface (Spec 040) | The pay pressure | Disposition |
|---|---|---|
| **Notifications** — `salaries` channel select | A "salary event" routing row | **Routing only.** A 5-value channel select (`0/1/3/4/5`). **0 amount / rate / currency token** (grep-confirmed in legacy). Sanctioned by the Spec-030 **figure-free** finance Salaries tab precedent |
| **Security › Teachers import** | Columns **`hour_rate`**, **`currency`** | **REJECTED columns** — not rendered even as column-name structure rows (FO-13) |
| **Security › Families import** | Columns **`hour_rate`**, **`currency`**, **`password`** | **REJECTED** (FO-12 password → Spec 043; FO-13 pay/currency → payroll backend) |
| **Security › Invoices import** | Column `currency` | **REJECTED** (ledger R2: `a31.currency === 0` on the settings body) |
| **Integrations › Paymob Payout / Payoneer Payout** | These providers **disburse teacher salaries** | Rendered as **structure-only** provider cards + drawers: label + required + purpose. **0 credential input, 0 value, 0 figure.** Real payout execution = FO-03 → **Spec 053 + payroll backend** |
| **Integrations › WhatsApp card copy** | Legacy copy mentions **"salary reports"** | **Not reproduced.** The card carries no pay wording |
| **Automation** | `rate_student_absent` | **Ø** (row 11 above) |
| **Customization / Users / General identity** | — | No pay surface exists |

---

## 4. Enforcement (grep contract)

Run over the **built** `public/settings.html` + `public/settings.en.html` bodies **and** over the Spec-040 source
diff (`pages/settings.js`, `fixtures/settings-management.js`, `fixtures/settings-notifications.js`,
`locales/ar.adm.js`, `locales/en.adm.js`) — **source comments included** (the standing G8a scope-guard rule).

| # | Pattern | Expected |
|---|---|---|
| P1 | `settings_data\[|salary_period_type|salary_period_day|applayFins|fin\[|rate_student_absent|hours-input|rate-input` | **0** |
| P2 | `hour[-_ ]?rate|hourRate|سعر الساعة|شريحة أجر|tier rate` | **0** |
| P3 | `fine\b|deduction|خصم التأخير|غرامة` | **0** |
| P4 | `payout` **as a pay figure**; any payout **amount** | **0** (the words "Paymob Payout"/"Payoneer Payout" are provider **names** — permitted; no amount, no rate, no currency may accompany them) |
| P5 | `a31.currency` — `ريال\|SAR\|جنيه\|EGP\|AED\|EUR\|\$\|€\|£` on the settings body | **0** (ledger R2; "Saudi Arabia" in the Paymob region select is safe — `\bSAR\b` does not match) |
| P6 | any digit adjacent to a salary/rate/fine/payout token | **0** |
| P7 | `FORM_DRAWERS_032` OMIT-name audit (`/pass\|secret\|api[-_]?key\|token\|webhook\|otp\|salary\|hour[-_]?rate\|fine\|payout\|iban\|cvv/i`) over **all 12** registered settings drawers (`head-add` + the 11 `integ-*`) | **0 matching input names** |
| P8 | `adm.*` AR key-set vs EN key-set | **0 divergence** |

**STOP CONDITION (ledger §K.6):** any teacher pay **figure** (salary / rate / fine / payout / currency amount) on the
settings body, or `a31.currency > 0`, halts the spec. The 11 fields above are the exhaustive list of what may never
come back into the frontend — in Spec 040 or in any later spec short of the payroll backend itself.
