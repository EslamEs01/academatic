# C07 — Finance / Payments / Invoices · Capability Audit (Spec 042)

**Method (honest counts)**: **34 screenshots opened AS IMAGES** with the Read tool (26 legacy — every distinct
surface's `-full.png` plus one interaction frame — + 8 current) and **30 raw legacy page records**
(`output/roles/*/pages/*.json` — forms, modals, tables, buttons, filters, headings, cards) read field-by-field.
The current implementation was read at source (`app/src/js/pages/finance.js`, `fixtures/finance.js`,
`components/finance-actions.js`, `components/finance-status.js`, `locales/ar.fin.js`, `pages/family-billing.js`,
`nav.config.js` finance block — 7 files). Where a planning summary and a raw record disagreed, **the record won**.
All paths below resolve relative to `academy-dashboard-discovery/`.

**Variant sampling (recorded honestly)**: the 67 cluster pages collapse into 24 surfaces (§0). For
filter/pagination variants I read the base record + at least one variant record per family
(`management-invoices-status-paid.json`, `management-downlaod-status-softdelete.json`,
`management-payouts-all-1.json`, `management-invoices-create-parent-invoice-2.json`,
`management-accounting-transaction-session-status-attend.json`) and confirmed identical table schema/forms —
the remaining variants were grouped by URL pattern without opening each record. Payment-settings create pages
1/3–7 were sampled via `…create-payment-method-2.json` (Stripe) + `…payments-1-edit.json` (Custom); the other five
providers' exact key labels are C09 territory (C09 read all 8) and are not re-proved here.

---

## 0. Exact page assignment — all 67 cluster pages → 24 surfaces (zero unassigned)

| # | Surface | Pages | Members |
|---|---|---|---|
| S1 | **Invoices list + lenses** | 18 | `management-invoices` + 17 `?status=All\|Paid\|Unpaid\|SoftDelete × date=… × date_type=(empty)\|date_payment\|due_date` variants (paths file rows 26–45) |
| S2 | **"Downlaod" export board** (typo route; same board + error banner) | 8 | `management-downlaod` + 7 `?status/?date/?date_type` variants |
| S3 | **Create parent invoice** | 2 | `management-invoices-create-parent-invoice-1`, `-2` |
| S4 | **Monthly invoices list** | 1 | `management-monthly-invoices` |
| S5 | **Accounting dashboard** | 1 | `management-accounting` |
| S6 | **Accounting transactions — invoices lens** | 1 | `management-accounting-transaction-invoices` |
| S7 | **Accounting transactions — salary lens** | 1 | `management-accounting-transaction-salary` |
| S8 | **Accounting transactions — session lens** | 4 | `management-accounting-transaction-session` + `?status=attend\|student-absent\|teacher-absent` |
| S9 | **Expense ledger** | 1 | `management-expense` |
| S10 | **Payouts queue** | 2 | `management-payouts`, `management-payouts-all-1` |
| S11 | **Payout providers list** | 1 | `management-payout-providers` |
| S12 | **Payout provider edit** | 2 | `management-payout-providers-6-edit`, `-7-edit` |
| S13 | **Teachers Salaries board** | 1 | `management-salaries` |
| S14 | **Staff Salaries board** | 1 | `management-staff-salaries` |
| S15 | **Salary Class Report (admin)** | 1 | `management-salary-class-report` |
| S16 | **Payment-method create** | 7 | `management-settings-payments-create-payment-method-1…7` |
| S17 | **Payment-method edit** | 1 | `management-settings-payments-1-edit` |
| S18 | **Courses-without-invoice lens** | 7 | `management-courses-type-no-invoices` + 6 `status[0]=0…5` variants |
| S19 | **Analysis — Invoices & Accounts** (overlap C08) | 1 | `management-analysis-invoices` |
| S20 | **Analysis — Profits & Losses** (overlap C08) | 1 | `management-analysis-expenses` |
| S21 | **Family billing** | 1 | family `student-billing` |
| S22 | **Family subscriptions list** | 1 | family `student-studentslist` |
| S23 | **Teacher salary** | 1 | teacher `teacher-salary` |
| S24 | **Teacher salary class report** (form + output) | 2 | teacher `teacher-salary-class-report`, `teacher-update-result-date-range-…-filter-student` |

18+8+2+1+1+1+1+4+1+2+1+2+1+1+1+7+1+7+1+1+1+1+1+2 = **67**. ✔

---

## 1. What the legacy finance module actually is (proved from images + raw forms)

The legacy **REPORT rail** hosts the whole finance module (pixel-visible in `management-invoices-full.png`):
monthly reports · Data Analysis ▾ (Students / **Invoices & Accounts** / **Profits & Losses** / Accounting /
Transaction / Expenses) · **List of Invoices** · **List of Monthly Invoices** · **Salaries** · **Staff Salaries** ·
**Payouts** · **Salary Class Report**.

**S1 Invoices list** (`management-invoices.json`, image opened): 4 status stat-cards (all/unpaid/paid/**Deleted**
Invoices — all `0` on the captured tenant) + a Filter accordion (`forms[1]` GET `/management/invoices`): hidden
`status` + `date` range text + `date_type` select {Due Date, Payment Date} + **`currency` select (All + 14–16
currencies)** + **`gateway` select {All, «احمد محمد», Unknown}** — a real person's name is a payment gateway.
Table `# · Ordered Number · Due Date · Parent · Payment Date · Payment Id · Total Price · Total: (AED) · Status ·
Actions` → **"No data found"** (pink banner). Header buttons **Filter · Download · Export**. Every S1 variant
re-renders this same board (verified `management-invoices-status-paid.json` — identical headers, title flips to
"Paid Invoices").

**The "New Transaction" modal** (record a payment; baked on S1 AND S2 — `management-invoices.json → modals[1]`,
`forms[2]` POST `/management/accountant/store-transaction`): `transaction_id` (text) · `date_payment` (date) ·
hidden `invoiceID` · `basic` · `additional` · `taxes` · **`total` (a computed money field)** · `currancy` (sic —
14–16 currency select) · `getway` (sic — {«احمد محمد»}) + Submit/Cancel. **8 visible controls.**

**S2 "Downlaod"** (`management-downlaod.json`, image): the SAME invoices board (same GET form → `/management/invoices`,
same New-Transaction modal, same table) rendered under the typo route with a dismissible **pink error banner
"Cannot download invoice"** and the Deleted-Invoices lens pre-selected. This is the invoice-PDF download
destination — and it **errored even on the live legacy tenant**.

**S3 Create parent invoice** (`management-invoices-create-parent-invoice-1.json`, image — the cluster's biggest
form): company header + `serial` "Invoice #" (`af85495`) + date + `due_date`; **Invoice To: `abdo ahmed / Malampa,
Vanuatu / 01154859653 / abod10001@gmail.com`** (real phone + e-mail rendered); Bill To with **`Total Due: EUR 30.90`**;
line-items table `Start Date · Serial · Item · Student · Price` with per-row Delete; `Add Course` select + **Add
Course** button; `price` "Cost" · `discount` · `fees` · `additional` (number inputs); **Discount Options**:
`adjustment_type` {Percentage (%), value} · `adjustment_value` · `adjustment_count` "Repetition" ("sets how many
invoices this adjustment applies to"); **Add Item**; `note` textarea; `paymentMethod` select {**As Profile**,
«احمد محمد»}; `sendMessage` "Send Notification" toggle; **Submit Invoice**; and a **live computed totals panel**:
Net Price 30.00 EUR · Discount (0.00%)(0.00%) · Fees (3.00%)(0.00%) · Additional · Adjustment · **Total: EUR 30.90**.
≈ **17 controls + 2 repeatable-row mechanisms + a computed money panel.**

**S4 Monthly invoices** (`management-monthly-invoices.json`, image): a month filter (`date` text) + Search + table
`# · Parent · Status` → "No data found". That is the whole page — 3 columns, no amounts.

**S5 Accounting dashboard** (`management-accounting.json`, image): **10 aggregate money cards** (Total / UnPaid /
Paid / Teachers Salaries / Staff Salaries / Expenses Income / Expenses Outcome / Total Income / Total Expenses /
**Net Income** — all `0.00 AED`) + **5 chart canvases** (Net Income · invoices Paid/UnPaid · Teachers Salaries ·
Staff Salaries · Expenses) + date-range search + Current Month / Last Month shortcuts + an **AED button opening the
"Currency Rates" modal** (`modals → currencyModal`): base-currency select + **16 editable rate number inputs** + Save,
plus a 16-row `Currency · Code · Rate` table.

**S6/S7/S8 Accounting transactions** (three lenses under a shared `Sessions | invoices | Salary` tab strip, images
opened for all three): **invoices** = `family_id` + `date` filter over `# · Serial · Invoice Date · Total Net Price ·
Total Additions · Discount Value · Fees Value · Other Effects · Final Total Price · Paid At · Family` (0 rows);
**salary** = `date` filter over `# · Month · Teachers Total Salary · Staff Total Salary`; **session** = 6 stat cards
(**Attend / Student Absent / Teacher Absent counts with %** + **Teacher 0.00 EUR / Student 0.00 EUR / Total Profit
0.00 EUR**) + 6 filters (`filter` hidden, `date`, `teacher_id`, `student_id`, `family_id`, `duration` 15 options)
over `# · Student Name · Family · Teacher Name · Admin Date · Duration · Student · Teacher · **Profit** · Status` —
a per-session **teacher-wage vs student-price profit split**. The three `?status=` pages are the same table
pre-filtered (verified `…-status-attend.json`).

**S9 Expense ledger** (`management-expense.json`, image): **Add Expenses** form (POST `/management/expense`):
`head_id` select (empty on tenant) · `user_id` "Name of Executor" {Owner, Eslam Essam, mohamed} · `is_income`
{Income, Outcome} · `description` · `reason` · `amount` number · **`currency` (16-currency select)** · `date` —
**8 controls**; an **Expense Edit** modal (same 8, `_method` spoof); a **Heads** button (expense-head lookup);
table `# · Name of Income or Outcome · Value · Currency · Description · Date · Reason · Name of Executor ·
Transaction Type · Actions` → pink **"No Expenses Added"**.

**S10 Payouts queue** (`management-payouts.json`, image): 6 status cards (Pending approval / Pending / Successful /
Failed / Rejected / Returned — each `0` + **`0.00 EUR`**) + Month/Year/Status filter (9 statuses incl. Approved,
Unknown) + **bulk "Approve selected (0)"** (`forms → POST /management/payouts/approve`) + checkbox table
`# · Teacher · Amount · Method · Status · Month · Requested at` → yellow "No data found".

**S11/S12 Payout providers** (`management-payout-providers.json` + `-6-edit.json`, images): a 2-row table
`Method · Mode · Active · Webhook URL` (Paymob, Payoneer — both `sandbox` + `Inactive`) + Configure; the edit form:
readonly webhook URL · `mode`* {Sandbox, Live} · `is_active` toggle · `key1/key2/key3` rendered as
**Username/Login\* · API password / Key\* · Program ID\*** — credentials as plain `type=text`, and a
field explicitly labeled *password*.

**S13 Teachers Salaries** (`management-salaries.json`, images incl. the open Filter interaction frame): 6 stat
cards (Attended / Student Absent / Teacher Absent each `0 + 00:00` · Fixed · **Fine/Gift `−0/+0`** · Total: (EUR)) +
**Request payouts (0)** + **Generate Salary** (modal `exampleModal` "Salary Month": `month` select (13) ·
`date_range` · `generateteacher` checkbox · **Select All Teachers** · per-teacher `teachers[]` checkboxes) + Filter
(Month/Year + **Filter · Download · Export · Delete**) + money table `# · Teacher Name · Cash Number · Fixed · plus ·
minus · Fine · Gift · Hour Rate · Total: · Total: (EUR) · Salary Type · Status · Actions` with a computed totals
footer + two breakdown modals: `teachers-salaries` "Teacher Salary" (Attended/Absent/Trials/Group splits) and
`table-salaries` "Salary" (**Name · Hours · Hour Rate · Phone number · Trials · Total Salary · Fixed · Absence ·
Fines · Fine Notes · Total Hours · Total Fines · Net Salary · Gift · Paid** + **Download**).

**S14 Staff Salaries** (`management-staff-salaries.json`, image): Generate-salaries modal (month · date_range ·
`generatestaff` · Select-All + per-staff `staff_members[]` {Owner, Eslam Essam, mohamed}) + table `# · Name · Cash
Number · Fine · Gift · Total: · Total: (EUR) · Status · Actions` with totals footer + Delete.

**S15 Salary Class Report (admin)** (`management-salary-class-report.json`, image): `date_range` + `filter` "Group
By" {**Student, Date, Parent**} + `teacher_id` select → Submit → **GET `/management/update-result`**.

**S16/S17 Payment-method settings** (records + images for Stripe-create and Custom-edit): per-provider credential
create forms (`name`* + `key1`*/`key2` — Stripe placeholders **"Publishable Key" / "Secret Key"** as plain text
inputs); the Custom edit form carries **`name` = «احمد محمد» and `key1` "Payment Details" = `01015264856`** — a real
person's name + phone number stored as a payment method. (Presentation/credentials side owned by **C09**; the
finance side — gateway instances feeding the invoice's `paymentMethod` select and the list `gateway` filter — is
owned here.)

**S18 Courses-without-invoice lens** (`management-courses-type-no-invoices.json`, image): the courses page under
`?type=no_invoices` — 6 status %-cards, a "Course Actions" radio set of **7 lenses** (All / Renew / **Completed &
Not Paid** / **Courses no invoice** / Deleted / hours-exceeded / Free-Hours) + teacher/date/status filters + a
**`has_invoice` select {All, With Invoice, Without Invoice}** + Export; table `# · Student Name · Teacher Name ·
Date · Total Hours · Status · Invoice · Price · Actions` (1 real row, `30.00`, **computed `Total:` footer**) + the
**`assigninvoiceModal` "All Invoice For This Parent"** (`invoice` select "Loading…" → POST
`/management/management/members/invoice` with `course_id`) — the bridge that attaches a course to an invoice.
(The other modals on this record — schedule-cancel, add-lesson, change-status — belong to the courses cluster.)

**S19/S20 Data-analysis money BI** (records + images; **overlap C08 recorded there as C08-06/C08-10**):
`analysis-invoices` = 6 aggregate cards (Total Before/After Discount · Discount · Paid · UnPaid · Overdue, AED) +
status checkboxes + date range + **2 charts** (Total Invoices by Month · Cumulative Total by Date) + a families
`Paid · Due · Overdue` table; `analysis-expenses` = 8 money cards (**Expected Teachers Salaries EUR 540.00 ·
Teachers Salaries till now EUR 997.00 · Staff Salaries EUR 9,333.00** · Expected/Actual Net Profit/Revenue ·
Expenses) + 3 cumulative charts + From/To-year Apply + a 12-month financial table (9 money columns).

**S21 Family billing** (family role — `student-billing.json`, image): table `# · Serial No · Month-Year · Due Date ·
Course · **Amount** · Status` + "View all invoices" — **invoice amounts shown to the family**, silent empty state
(headers over nothing, no empty message).

**S22 Family subscriptions** (`student-studentslist.json`, image): student switcher + table `# · Student Name ·
Status · Teacher Name · Course Name · Subscription · History · Feedback About Course` (1 row: yellow chip
**"not have any courses"**); the feedback modal on this page is C10/feedback territory.

**S23 Teacher salary** (teacher role — `teacher-salary.json`, image): the teacher's own wage table `# · Fixed ·
Attended · Student Absent · Teacher Absent · Trials Attended · Trials Student Absent · Trials Teacher Absent ·
Fine · Gift · **Hour Rate** · Total: · Status` (13 columns, empty, no empty-state message).

**S24 Teacher salary class report** (`teacher-salary-class-report.json` + `teacher-update-result-…json`, images):
`date_range` + Group By {Student, Date, **session**} → GET `/teacher/update-result`; the output = a color-grouped
count matrix per student (`Pending · Attended(session/Trial Paid/Paid-if-continue/Free) · Absent(Student/Teacher) ·
Cancel(Student/Teacher) · Normal/Custom · Total: · Paid · Paid if continue · Free` — 23 columns with a totals row,
counts + durations, and price columns further right).

---

## 2. What we ship today (control-level, from source)

`finance.html` — a **6-tab hub** on the `tabs()`/`#view=` engine (`pages/finance.js:318-355`): overview · invoices ·
payments · monthly-invoices · salaries · banks. Nav: 7 implemented finance items + **`classSalaryReport` = the ONE
honest disabled lock** (`nav.config.js:87-94`, `status:'disabled'`, `reasonKey:'nav.reason.finance'`, no route —
pixel-verified grey+lock in `app/screenshots/finance__ar__light__desktop__sp038-classsalary-lock.png`).

* **Overview** — `financeActions()` (Create invoice / Export CSV / Export PDF / Print = **4 `data-disabled-reason`
  gates**, `components/finance-actions.js:46-54`) + **9 figure-free planned cards** (`PLANNED_FINANCE`,
  `fixtures/finance.js:93-103` — monthlyInvoices(planned) · invoicesEngine · paymentsCollection · teacherSalaries ·
  staffSalaries · classSalaryReport · payoutsCompensations · accountingExpenses · banks) + the **9 baked `inv-*`
  drawers** (`invoiceDrawer()`, `finance.js:174-205`: serial/family/students/course/group/month/issued/due/amount +
  «عرض فقط — لا تُحتسب أي مبالغ فعلية» + status chip + note; actions = Mark-paid confirm→backendRequired toast,
  Send-reminder confirm→toast, Send-invoice gate, Print gate — `finance-actions.js:84-112`).
* **Invoices** (`#view=invoices`) — 4 count-only status tiles that double as filters (`tile()`, counts from
  `FINANCE_SUMMARY.invoices` — **row counts, never sums**, `fixtures/finance.js:66-88`) + filterBar (search + status
  {paid/unpaid/overdue/cancelled} + family) + **9 authored invoice rows** (serial · family link · month · due date ·
  status chip · course/group chips · **authored SAR literal** · View drawer + status-gated Record-payment
  confirm→toast; a cancelled invoice gets a disabled-with-reason Record-payment — `finance-actions.js:66-77`) +
  `noResults()` empty state.
* **Payments** (`#view=payments`) — 6 authored payment rows (date · family · invoice-drawer chip · authored amount ·
  method chip {bankTransfer/card/cash} · status chip {recorded/pending/returned}) + **Record-payment and
  Reconcile-payments gates** (`fin.pay2.*`).
* **Monthly invoices** (`#view=monthly-invoices`) — the 9 invoices **derived-grouped by authored `monthKey`** into 4
  month cards with per-month **count-only** labels («٥ فاتورة») and **no computed monthly total**
  (`monthlyInvoicesSection()`, `finance.js:280-316`) + Generate/Send/Export gates.
* **Salaries** (`#view=salaries`) — teacher board (4 rows) + staff board (2 rows), each **name + period + status chip
  ONLY** ({pending/approved/paid/onhold}; **zero pay figure**, `SALARIES`, `fixtures/finance.js:109-116`) +
  Generate/Approve/Mark-paid/Export-roster gates. `staffSalaries` nav deep-links to the same tab.
* **Banks** (`#view=banks`) — 4 banks, **name + active/inactive chip only** (no balance/account number/credential) +
  Add-bank `formDrawer` (**one field: bank name** — Spec 032 FC-29) + Import-statement/Reconcile gates.

Adjacent owned surfaces: **family portal billing** (`pages/family-billing.js` — hour-quota tiles 40/12/28,
per-child subscription status cards, **amount-free** invoice cards serial/month/due/course/status, a billingGate
planned card + admin-contact gate note — zero forms, zero pay figures); **settings expense-heads lookup**
(name/status, no amount — Spec 031, C09 corpus); **teacher portal: NO salary surface at all** (pay-free GLOBAL law;
`ROLE_NAV.teacher` carries no finance item).

Currently shipped totals: **7 finance nav routes + 1 lock · 6 tabs · 9 invoice drawers + 1 bank-add form drawer +
2 confirm dialogs per invoice · ~19 backendRequired gates · 2 status vocabularies (4 invoice + 3 payment states) ·
0 computed money value · 0 chart · 0 credential field · 0 real PII.**

---

## 3. The honest gaps (control-level, legacy → ours)

1. **Create-invoice authoring form is MISSING** — legacy S3 is a ~17-control builder (line items, Add Course/Add
   Item repeatable rows, cost/discount/fees/additional, adjustment type+value+**repetition**, note, payment method,
   send-notification) behind `Submit Invoice`. Ours is a single Create-invoice gate. Per the Spec-032 law
   ("real form first, gated Save"), the form surface is a **056** item; the computed Net/Fees/Adjustment/Total panel
   must NOT be reproduced client-side (no-fake-money) — totals arrive only with the billing backend.
2. **Record-payment capture fields** — legacy's New-Transaction modal carries transaction_id/date/basic/additional/
   taxes/currency/gateway (+computed Total). Ours = an honest confirm→backendRequired toast + gates, with **zero
   capture fields**. Form → **056**; computed Total stays banned.
3. **Date-range / currency / gateway invoice facets** — legacy filters by due-vs-payment date-type over a date
   range, 14–16 currencies and gateway; ours filters status + family + text search only. Frontend-feasible over
   authored rows → **045-050**.
4. **Expense ledger** — legacy has full Add/Edit (8 controls incl. amount+currency) + Heads. We ship only the
   figure-free heads lookup (Spec 031) and the `accountingExpenses` planned card. Entry form → **056**; the ledger
   totals/aggregation → backend.
5. **Courses-without-invoice lens + assign-course-to-invoice** — the billing bridge (`has_invoice` facet, unbilled
   lens, `assigninvoiceModal`) has no counterpart on our courses page. Facet → **045-050** (C07-17); the
   assign-to-invoice picker modal → **056** (C07-18).
6. **Monthly-invoices month filter** — legacy's one filter on S4; our grouped board has none (all four months
   render). Minor, folded into the 045-050 page review.
7. **Payout queue** — 6-status pipeline + bulk approve exists nowhere in ours except the `payoutsCompensations`
   planned card. Amounts are pay figures (banned); the pipeline itself needs providers + payroll → FUTURE_BACKEND.
8. **Accounting transactions (3 lenses) + accounting dashboard + money BI** — entirely absent by design; see §4.
9. **Row-level Actions menus** — every legacy money table (`invoices`, `salaries`, `staff-salaries`, `expense`,
   family `billing`) has an `Actions` column but **every one was empty at crawl time** ("No data found"), so the
   per-row menu contents are **UNKNOWN_EVIDENCE — never invent them** (one teacher-salaries totals row shows only
   Download inside the Salary modal).
10. **Family subscription History** — the `History` column content is unproven (row was "not have any courses").

---

## 4. What we deliberately REFUSED (must never be "fixed back")

* **Every computed money aggregate**: the accounting dashboard's 10 cards + Net Income, the transaction lenses'
  `Final Total Price`/`Teachers Total Salary`/**per-session `Profit`**, the create-invoice live totals panel, the
  salaries tables' `Total:`/`Total: (EUR)` footers, `analysis-invoices`/`analysis-expenses` aggregates and all
  **10 chart canvases** across S5/S19/S20 → no-fake-money + no-chart law. Our counters are row COUNTS only
  (`FINANCE_SUMMARY`), amounts are authored per-row SAR literals.
* **Teacher/staff pay figures anywhere**: S13/S14 wage tables (Fixed/plus/minus/Fine/Gift/**Hour Rate**/Net Salary),
  the S8 session lens Teacher-vs-Student wage split, S20's `Expected Teachers Salaries EUR 540.00`, the
  **teacher-role Salary page (S23)** and teacher salary-class-report (S24) → teacher pay-free GLOBAL + zero pay
  figures. Replaced by the figure-free status boards; the teacher portal ships no pay surface at all.
* **`classSalaryReport`** stays the sole honest lock (S15/S24 — a real one computes per-class pay).
* **Fine / Gift salary adjustments** (a punitive wage mechanic surfaced as `−0/+0` cards) → not ported.
* **Real PII on finance surfaces**: `abdo ahmed / 01154859653 / abod10001@gmail.com` baked into the invoice
  header (S3), gateway/payment-method **«احمد محمد» with phone `01015264856` as "Payment Details"** (S1 filter,
  S3 select, S17 edit), real family/teacher/student names in every accounting filter (S6/S8), staff names
  (Eslam Essam, mohamed) in S9/S14 → REJECTED_PRIVACY, owner 043. None of it exists in our build.
* **Plain-text credentials**: payout-provider `key1/key2/key3` incl. an **"API password / Key"** text input (S12)
  and Stripe **"Secret Key"** as `type=text` (S16) → REJECTED_SECURITY (presentation owned by C09; recorded here
  because the fields live on finance routes).
* **The broken download flow**: `/management/downlaod` (typo route) rendering the whole invoices board behind a
  **"Cannot download invoice"** error banner → we ship honest Export CSV/PDF/Print/Download gates instead of a
  broken button (Spec 030 F-J).
* **Multi-currency editing**: the Currency-Rates modal (16 editable FX rates saved from a dashboard modal) →
  refused; we are single-currency (authored SAR) until the billing backend owns rates.
* **Silent-empty family billing** (headers over nothing) → our family billing reassures explicitly and gates
  contact; our admin lists ship `noResults()`.

## 5. Evidence conflicts, overlaps & notes

* **S2 is not a distinct capability** — `management-downlaod*` re-renders S1 with an error banner (same form action
  `/management/invoices`, same table, same modal). The 8 pages are assigned here so the census stays 67/67, but the
  capability ledger treats "download board" = invoice list + a broken PDF exporter.
* **Overlap C08 (recorded there as C08-06/C08-10)**: `analysis-invoices`/`analysis-expenses` are both in the C07
  paths file and the C08 audit. C08 owns the *reports/BI framing*; **C07 owns the finance capability side**
  (rows C07-25/26). `salary-class-report` is likewise C08-08 = our C07-23 (HONEST_LOCK — consistent verdicts).
* **Overlap C09**: `management-settings-payments-*` and payout-provider credential *presentation* are C09-05/-22
  (structure-only rows, sandbox default). C07 owns the **gateway-on-invoice wiring** (instances feeding the
  invoice `paymentMethod` select + list `gateway` filter) as C07-16.
* **Currency-base inconsistency in legacy**: the invoices table totals in **AED**, salaries/payouts/session lens in
  **EUR**, expenses selects default **Euro** — the same tenant. Evidence that multi-currency handling was
  incoherent; reinforces the single-currency refusal.
* **`management-invoices` stat cards all 0 while a course row shows `Active & unpaid`** (S18) — consistent: the
  tenant's one course simply has no invoice yet (that is exactly what the no-invoice lens is for), not a data bug.
* **Naming**: legacy "List of Monthly Invoices" is a 3-column parent×status list; our `monthly-invoices` tab is an
  amount-bearing grouped board — richer than the legacy promise (opposite direction of C08's monthlyReports
  mismatch; recorded, no action).
* **Admin vs teacher Group-By options differ** (Student/Date/**Parent** vs Student/Date/**session**) on the same
  salary-class-report capability — do not merge them if ever built.
* **Role/permission reality**: finance lives under `/management/*` (admin login) with sidebar-only gating —
  **hiding a link is NOT authorization**; RBAC enforcement is C09-19 → 043/backend. The teacher and family roles
  each got their own money surfaces (S21–S24), which our role laws deliberately removed/reshaped.
* **Empty-at-crawl caveat**: every legacy money table was empty (tenant had 1 course, 0 invoices) — column
  schemas and forms are proven; row-level behaviors (Actions menus, pagination beyond page 1) are not.

## 6. Visual verdict

Legacy (26 frames): a grey/white ERP — pink error banners as primary feedback, 10–23-column money tables that
overflow at 1440px (S13's table needs horizontal scroll to reach Status/Actions; S24's 23-column matrix likewise),
EN-only labels on an Arabic-tenant product, two stat-card rows of zeros above empty tables, and BI pages whose
charts render axes with no data. Ours (8 frames): the cream/violet academy language — labeled icon+text status
chips (مدفوعة/غير مدفوعة/متأخرة/ملغاة), calm RTL-first cards, an honest lock rendered as a lock, AR/EN parity,
working drawer with «عرض فقط» disclaimer. Two visual notes for the **045-050** bounded review: (1) the **Overview
tab is planned-card-dominant** — the first thing an admin sees is nine muted "يتطلب الخادم" cards, which reads
lock-first rather than work-first (consider leading with the tiles/actions); (2) the **Salaries and Banks tabs are
thin** (6 and 4 small cards on a wide canvas) — correct and honest, but visually unfinished.

## Disposition summary (normalized — Spec 042 ledger source)

| capId | capability | disposition | owner | evidence anchor |
|---|---|---|---|---|
| C07-01 | Invoice list + status lenses (all/unpaid/paid/deleted) with date-range/date-type/currency/gateway facets | PARTIAL | 045-050 | §1 S1 · §3 item 3 |
| C07-02 | Create-parent-invoice authoring form (~17 controls, line items, adjustments+repetition, notify) | MISSING | 056 | §1 S3 · §3 item 1 |
| C07-03 | Record-payment capture form ("New Transaction": txn id/date/basic/additional/taxes/currency/gateway) | PARTIAL | 056 | §1 S1 modal · §3 item 2 |
| C07-04 | Invoice PDF download / CSV export / print execution (legacy itself errored "Cannot download invoice") | FUTURE_BACKEND | FUTURE_BACKEND | §1 S2 · §4 broken download |
| C07-05 | Monthly invoices board (legacy 3-col parent×status list → our month-grouped amount board) | INTENTIONALLY_IMPROVED | — | §1 S4 · §2 monthly · §5 naming |
| C07-06 | Accounting dashboard (10 money aggregates + Net Income + 5 charts + month shortcuts) | FUTURE_BACKEND | FUTURE_BACKEND | §1 S5 · §4 aggregates |
| C07-07 | Multi-currency model (16 currencies + editable Currency-Rates modal) | FUTURE_BACKEND | FUTURE_BACKEND | §1 S5 · §5 currency-base note |
| C07-08 | Accounting transactions — invoices lens (11 money columns, family/date filter) | FUTURE_BACKEND | FUTURE_BACKEND | §1 S6 |
| C07-09 | Accounting transactions — session lens (per-session Teacher/Student wage split + Profit + absence lenses) | REJECTED_PAY_FREE | — | §1 S8 · §4 pay figures |
| C07-10 | Accounting transactions — salary lens (monthly Teachers/Staff salary totals) | REJECTED_PAY_FREE | — | §1 S7 · §4 pay figures |
| C07-11 | Expense ledger (Add/Edit 8-control forms + Heads + Actions table) | PARTIAL | 056 | §1 S9 · §3 item 4 |
| C07-12 | Teacher + staff salary status boards (figure-free, status-first + 4 payroll gates) | INTENTIONALLY_IMPROVED | — | §2 Salaries · §1 S13/S14 |
| C07-13 | Salary figures & payroll run (Fixed/plus/minus/Fine/Gift/Hour-Rate/Net, Generate-Salary + breakdown modals, Download/Export/Delete) | REJECTED_PAY_FREE | — | §1 S13/S14 · §4 |
| C07-14 | Teacher payout queue (6-status pipeline, bulk approve, amounts, month/year/status filter) | FUTURE_BACKEND | FUTURE_BACKEND | §1 S10 · §3 item 7 |
| C07-15 | Payout provider configuration (Paymob/Payoneer sandbox-live + webhook + plain-text credentials incl. "API password") | FUTURE_BACKEND | 053 | §1 S11/S12 · §4 credentials · §5 C09 overlap |
| C07-16 | Payment-gateway instances wired to invoicing (7 create variants + edit; invoice "Accept payments via"; list gateway filter) | FUTURE_BACKEND | 053 | §1 S16/S17 · §5 C09 overlap |
| C07-17 | Courses-without-invoice lens (7 course-action lenses + has_invoice facet + unbilled census) | PARTIAL | 045-050 | §1 S18 · §3 item 5 |
| C07-18 | Assign-course-to-invoice picker modal ("All Invoice For This Parent") | MISSING | 056 | §1 S18 · §3 item 5 |
| C07-19 | Family billing page — status-first zero-pay rebuild (quota tiles, subscription cards, amount-free invoices, gate note) | INTENTIONALLY_IMPROVED | — | §1 S21 · §2 family billing |
| C07-20 | Family-facing invoice Amount column + settlement affordances | REJECTED_PAY_FREE | — | §1 S21 · §4 |
| C07-21 | Family subscriptions list (per-child Subscription + History column) | PARTIAL | 045-050 | §1 S22 · §3 item 10 |
| C07-22 | Teacher-role salary page (13-column own-wage table) | REJECTED_PAY_FREE | — | §1 S23 · §4 |
| C07-23 | Salary Class Report — admin (range + Group-By Student/Date/Parent + teacher → update-result) | HONEST_LOCK | — | §1 S15 · §2 nav lock |
| C07-24 | Teacher salary-class-report + update-result matrix (23-column counts/price per student) | REJECTED_PAY_FREE | — | §1 S24 · §4 |
| C07-25 | Analysis — Invoices & Accounts money BI (6 aggregates + 2 charts + families dues table) — overlap C08-06 | FUTURE_BACKEND | FUTURE_BACKEND | §1 S19 · §5 overlap |
| C07-26 | Analysis — Profits & Losses BI incl. teacher-salary figures (EUR 540/997/9,333) — overlap C08-10 | REJECTED_PAY_FREE | — | §1 S20 · §4 |
| C07-27 | Real legacy PII on finance surfaces (invoice-header phone/e-mail, person-named gateway, phone as payment details, real names in filters) | REJECTED_PRIVACY | 043 | §4 PII |
| C07-28 | Row-level Actions menus on money tables (invoices/salaries/staff/expense/family billing — ALL empty at crawl) | UNKNOWN_EVIDENCE | 056 | §3 item 9 · §5 caveat |
| C07-29 | Explicit payments lens (recorded/pending/returned rows + method chips; legacy had only a modal + 2 columns) | INTENTIONALLY_IMPROVED | — | §2 Payments · §1 S1 |
| C07-30 | Banks tab (name+status board + name-only add drawer + import/reconcile gates; no legacy page in this cluster) | INTENTIONALLY_IMPROVED | — | §2 Banks |
| C07-31 | Invoice → family-portal propagation + Send-Notification delivery (admin invoice appearing in family billing) | FUTURE_BACKEND | 055 | §1 S3/S21 · §5 role note |
| C07-32 | Empty/loading/error-state honesty (pink banners, silent-empty family table, error-banner download vs noResults + gates) | INTENTIONALLY_IMPROVED | — | §4 · §6 |
| C07-33 | Finance hub visual quality (overview planned-card dominance; thin salaries/banks tabs) | COMPLETE_BUT_VISUAL_REVIEW_REQUIRED | 045-050 | §6 |

Honest counts: screenshotsOpened=34 · recordsInspected=30 · currentSourceFiles=7

Normalization notes (Spec 042, no new analysis): REJECTED_* rows carry owner "—" per the C08/C09 convention (the
refusal is final; payroll/billing backend needs are noted in-text, not as owners). C07-15/-16 carry primary **053**
(integrations command center) with the credential-presentation verdict already ledgered by C09 (C09-05/-18).
C07-25 carries FUTURE_BACKEND as primary with the C08-06 overlap recorded; C07-26 mirrors C08-10's
REJECTED_PAY_FREE exactly so the two clusters cannot diverge. Screenshot count = 26 legacy (24 surface `-full.png`
— S2 uses the base `management-downlaod-full.png`, S12 covered by `-6-edit`, S16 by `create-payment-method-2`,
S24 by both teacher frames — + `management-salaries-002` interaction) + 8 current frames. Record count = 25 base
records + 5 variant-proof records, all listed in the Method paragraph.
