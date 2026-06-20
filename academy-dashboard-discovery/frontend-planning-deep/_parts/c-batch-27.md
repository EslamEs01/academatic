# Batch 27 — admin · Wallet / Finance

---

### `management-accounting` — Accounting

- **Purpose:** Financial overview dashboard showing a snapshot of all money flows (invoices, salaries, expenses, net income) for a selected month, plus a currency-rate management panel.
- **Key sections / flows:** KPI summary cards (Total, Paid, UnPaid, Teachers Salaries, Staff Salaries, Expenses Income/Outcome, Total Income, Total Expenses, Net Income); ApexCharts line/bar charts for Net Income, Invoices (Paid/Unpaid), Teachers Salaries, Staff Salaries, Expenses; a currency-rates table (16 rows: AED, AUD, CAD, EGP, EUR, GBP, KWD, MAD, PKR, QAR, RUB, RWF, SAR, TRY, USD, YER); month/year filter via date input + GET form; "Current Month" / "Last Month" toggle buttons.
- **Key SAFE actions:** View charts; filter by date (GET form); switch month toggle; navigate to sub-pages via sidebar.
- **Key MUTATING/dangerous actions:** Save currency exchange rates (POST via "Currency Rates" modal — modifies base rates used across all financial calculations).
- **Important modals/forms:**
  - "Currency Rates" (triggered by AED button): displays all 16 currency fields pre-filled; Save button POSTs rate updates — must require confirmation since wrong rates affect all finance.
- **Variant-of:** Unique template.
- **Broken/empty:** All KPI values show 0.00 AED (test environment with no data); logo image returns 404.
- **UX improvement for the rebuild:** Replace the free-text date input for month selection with a proper month-picker control; add explicit "unsaved changes" warning in the currency-rates form since a mistake affects the entire financial module.

---

### `management-analysis-expenses` — Profits & Losses

- **Purpose:** Year-range P&L analytics page showing expected vs. actual revenue, net profit, salaries, and expenses with monthly breakdown table and two cumulative charts.
- **Key sections / flows:** Header KPI cards (Expected Net Profit, Actual Net Profit, Expected Revenue, Actual Revenue, Expected Teachers Salaries, Teachers Salaries till now, Staff Salaries, Expenses); "Financial Data Table (Monthly)" section with year-range "From/To" dropdowns (2021–2026) + Apply button; two chart sections (Cumulative Expected vs. Actual Profits/Revenues/Expenses); monthly table (12 rows × 9 columns: Month, Expected Revenue, Actual Revenue, Expected Net Profit, Actual Net Profit, Teachers Salaries, Staff Salaries, Expenses, Total Expenses); "Profit and Losses invoices" tab.
- **Key SAFE actions:** Filter by year range (GET); view charts and table; navigate tabs.
- **Key MUTATING/dangerous actions:** None beyond global chrome.
- **Important modals/forms:** None meaningful (only global chrome modals).
- **Variant-of:** Unique template.
- **Broken/empty:** All values EUR 0.00 except expected teacher salaries (EUR 540.00), actual teacher salaries (EUR 997.00), staff salaries (EUR 9,333.00) — some seeded data present but most fields empty; logo 404.
- **UX improvement for the rebuild:** Add a chart toggle to switch between "Expected vs. Actual" overlaid on one chart rather than two separate sections; make the year-range dropdowns a connected date-range component that prevents "To < From" selection.

---

### `management-expense` — Expenses

- **Purpose:** CRUD list of all income/outcome expense transactions categorised by "head", showing a filterable table and supporting add/edit per-entry.
- **Key sections / flows:** "Add Expenses" action button; "Heads" navigation link; table with columns: #, Name of Income or Outcome, Value, Currency, Description, Date, Reason, Name of Executor, Transaction Type, Actions; filters for head_id, user_id, is_income (income/outcome), currency, month.
- **Key SAFE actions:** Filter by head, user, income/outcome type, currency, month; navigate to Heads page.
- **Key MUTATING/dangerous actions:** Add Expenses (POST /management/expense — creates a new expense record); Edit Expense ("Expense Edit" modal — PUT); actions column likely contains delete (inferred from pattern in other pages, not explicitly listed for this page).
- **Important modals/forms:**
  - "Expense Details" (triggered by "Add Expenses"): fields — head_id (select), user_id (select), is_income (Income/Outcome toggle), description (textarea), reason (textarea), amount (number), currency (select), date (text); POST to /management/expense.
  - "Expense Edit": same field set but method override PUT to /management/expense/{id}.
- **Variant-of:** Unique template.
- **Broken/empty:** Table shows "No Expenses Added" — test environment empty; logo 404.
- **UX improvement for the rebuild:** Separate the "Transaction Type" filter into a prominent toggle (Income / Outcome / All) directly above the table rather than burying it in a select; add inline row-level edit instead of a full-screen modal for simple fields like amount and date.

---

### `management-payout-providers` — Payout Providers

- **Purpose:** Listing page for external payout gateway integrations (Paymob, Payoneer), showing their configuration status and providing a link to each provider's settings page.
- **Key sections / flows:** Table (5 cols: Method, Mode, Active, Webhook URL, Actions); rows for Paymob (sandbox, Inactive, webhook URL) and Payoneer (sandbox, Inactive, webhook URL); "Configure" link per row navigates to the provider-specific edit page.
- **Key SAFE actions:** View provider list; click "Configure" to navigate to edit page.
- **Key MUTATING/dangerous actions:** None on this page itself; mutations happen on the edit sub-pages.
- **Important modals/forms:** None meaningful.
- **Variant-of:** Unique template.
- **Broken/empty:** Both providers shown as "sandbox / Inactive" — not yet configured; logo 404.
- **UX improvement for the rebuild:** Add a visual active/inactive toggle badge (colour-coded: green/grey) directly in the table with an inline confirmation rather than requiring navigation to the edit form to toggle activation status.

---

### `management-payout-providers-6-edit` — Payoneer Payout Provider Edit

- **Purpose:** Settings/configuration form for the Payoneer payout gateway — sets mode (sandbox/live), activation toggle, and API credentials.
- **Key sections / flows:** Webhook URL display with copy instruction; form fields: Mode (required, Sandbox/Live select), Active (checkbox), key1 (Username/Login), key2 (API password/Key), key3 (Program ID); Back navigation link; Save button (PUT /management/payout-providers/6).
- **Key SAFE actions:** Copy webhook URL; navigate Back.
- **Key MUTATING/dangerous actions:** Save (PUT) — updates gateway credentials and live/sandbox mode; switching to "Live" mode with wrong credentials could break teacher payouts.
- **Important modals/forms:** No modal; single inline form.
- **Variant-of:** Variant of `management-payout-providers-7-edit` (same template, different provider ID and slightly different credential fields).
- **Broken/empty:** None; form loaded correctly.
- **UX improvement for the rebuild:** Mask credential inputs by default (show/hide toggle); add a "Test connection" button that pings the provider API with saved credentials before allowing live-mode activation.

---

### `management-payout-providers-7-edit` — Paymob Payout Provider Edit

- **Purpose:** Settings/configuration form for the Paymob payout gateway — sets mode, activation, and OAuth2 credentials (Client ID, Client Secret, Username, Password).
- **Key sections / flows:** Webhook URL display; form fields: Mode (required), Active (checkbox), key1 (Client ID), key2 (Client Secret), key3 (Username), key4 (Password — password input type); note clarifying these are different from Paymob Accept (checkout) credentials; Save button (PUT /management/payout-providers/7).
- **Key SAFE actions:** Copy webhook URL; navigate Back.
- **Key MUTATING/dangerous actions:** Save (PUT) — updates OAuth2 credentials and mode; notably key4 is password type (correct), but keys 1–3 are plain text inputs for sensitive values.
- **Important modals/forms:** No modal; single inline form.
- **Variant-of:** Variant of `management-payout-providers-6-edit` (same template, provider 7 — Paymob — has one extra field: key4/password).
- **Broken/empty:** None.
- **UX improvement for the rebuild:** All four credential fields should use password-type inputs with a reveal toggle; add inline validation to prevent saving an empty required credential when mode is switched to "Live".

---

### `management-payouts` — Payouts (Current Month View)

- **Purpose:** Admin approval and monitoring dashboard for teacher payout requests, scoped to the current month by default, with status-breakdown KPIs and bulk-approval capability.
- **Key sections / flows:** Page title "Payouts June 2026"; KPI cards: Pending approval (count + EUR total), Pending, Successful, Failed, Rejected, Returned; Filter panel (accordion) with Month select, Year input, Status select, Filter/Reset buttons; payouts table (cols: checkbox, #, Teacher, Amount, Method, Status, Month, Requested at, Actions); bulk "Approve selected (N)" button that POSTs to /management/payouts/approve.
- **Key SAFE actions:** Filter by month/year/status (GET form); view payout statuses.
- **Key MUTATING/dangerous actions:** "Approve selected (N)" (bulk POST to /management/payouts/approve) — triggers actual payout execution to teachers; must require explicit confirmation with count and total amount displayed.
- **Important modals/forms:** Filter form (GET — safe); bulk-approve form (POST — dangerous, no confirmation modal observed).
- **Variant-of:** Unique template (base); `management-payouts-all-1` is a query-param variant.
- **Broken/empty:** Table shows "No data found"; all KPI counts 0 — empty test data.
- **UX improvement for the rebuild:** The bulk "Approve selected" action must open a confirmation dialog showing the selected teacher names, amounts, and total before submitting; add per-row status colour coding (e.g. green=Successful, orange=Pending, red=Failed/Rejected).

---

### `management-payouts-all-1` — Payouts (All-Time View)

- **Purpose:** Same payouts management page as `management-payouts` but with `?all=1` query parameter removing the month scope to show all historical payouts.
- **Key sections / flows:** Identical to `management-payouts` except the heading reads "Payouts" (no month qualifier) and all-time data is displayed; same KPI cards, filter panel, table, and bulk-approve form.
- **Key SAFE actions:** Same as base page; filter still works.
- **Key MUTATING/dangerous actions:** Same "Approve selected" bulk POST — equally dangerous without confirmation.
- **Important modals/forms:** Same as base.
- **Variant-of:** `management-payouts` (query-param variant: `?all=1` removes month scope filter).
- **Broken/empty:** All empty — no payout data in test environment.
- **UX improvement for the rebuild:** The `all=1` scope toggle should be an explicit "View All / View This Month" toggle button in the UI rather than a raw query param — makes it discoverable and avoids confusion.

---

### `management-salaries` — Teachers Salaries

- **Purpose:** Monthly teacher salary management — generates salary calculations from session attendance data, displays a per-teacher salary breakdown table, supports download/export, and allows bulk payout requests.
- **Key sections / flows:** KPI cards: Attended (hours), Student Absent, Teacher Absent, Fixed salary count, Fine/Gift (+/-), Total EUR; Filter accordion (month/year selectors + Download + Export + Delete buttons); salary table (15 cols: #, Teacher Name, Cash Number, Fixed, plus, minus, Fine, Gift, Hour Rate, Total, Total EUR, Salary Type, Status, Actions); "Generate Salary" button opens a modal; "Request payouts (N)" bulk-POST to /management/payouts; summary row showing Fixed/Fine/Bonus/Total hours/Total EUR; a secondary 7-row table showing a salary slip template (Name, Hours, Hour Rate, Phone, Trials, Total Salary, Fixed, Absence Fines, Fine, Notes, Total Hours, Total Fines, Net Salary, Gift, Paid).
- **Key SAFE actions:** Filter by month/year; Download (salary slip PDF); Export (likely CSV); view per-teacher detail modal.
- **Key MUTATING/dangerous actions:** "Generate Salary" (POST /management/salaries — creates salary records for selected teachers and month, with checkbox to select all teachers); "Request payouts (N)" (bulk POST to /management/payouts — submits payout requests for selected teachers); Delete (deletes salary records for the selected month — irreversible).
- **Important modals/forms:**
  - "Salary Month" (Generate Salary trigger): fields — month (select, Dec 2025–Dec 2026), date_range (text, MM-DD-YYYY), generateteacher (checkbox "teachers salary"), allteachers (checkbox "Select All Teachers"), teachers[] (individual teacher checkboxes, currently 1 teacher listed in Arabic).
  - "Teacher Salary" (row detail): read-only view of Attended/Absent/Trials breakdown per teacher; Close only.
  - "Salary" (individual slip): shows full salary calculation with Download PDF option.
- **Variant-of:** Unique template.
- **Broken/empty:** Table shows placeholder data (0s, no actual rows of real salary data); logo 404.
- **UX improvement for the rebuild:** The "Generate Salary" modal should show a preview/summary of what will be calculated before committing (e.g. "Will generate salaries for N teachers for Month X covering Y sessions"); separate the destructive "Delete" button visually from "Download" and "Export" with spacing and colour differentiation.

---

### `management-staff-salaries` — Staff Salaries

- **Purpose:** Monthly salary management for non-teaching staff — generates fixed salary records, displays a per-staff member table with fine/gift/total columns, and supports deletion of salary records.
- **Key sections / flows:** No KPI summary cards (unlike teacher salaries); Filter accordion (month/year selectors + Delete button); salary table (9 cols: #, Name, Cash Number, Fine, Gift, Total, Total EUR, Status, Actions); "Generate Salary" button opens modal.
- **Key SAFE actions:** Filter by month/year; view table.
- **Key MUTATING/dangerous actions:** "Generate Salary" (POST /management/staff-salaries — creates salary records for selected staff members and month); Delete (removes salary records — irreversible); row-level Actions (likely edit/delete per row).
- **Important modals/forms:**
  - "Generate salaries" (Generate Salary trigger): fields — date_range (MM-DD-YYYY), month (select), generatestaff (checkbox "Staff Salary"), allstaff (checkbox "Select All Staff"), staff_members[] (3 staff listed: Owner, Eslam Essam, mohamed).
- **Variant-of:** Unique template (parallel to `management-salaries` but for staff, not teachers; no attendance-based calculation — simpler fixed structure).
- **Broken/empty:** Table shows 0.00 values and "No data found"; logo 404.
- **UX improvement for the rebuild:** Add KPI summary cards (matching teacher salaries page) showing total staff salary cost, total fines, net payout for the selected month; the "Delete" button in the filter bar should only activate when a month is selected and should require a confirmation modal explicitly naming the month being deleted.

---

## Module synthesis (this batch)

### What this module does and its core entities
This batch covers the **Wallet / Finance** module's core operational pages: financial reporting/analytics (Accounting dashboard, Profits & Losses), operational expense tracking (Expenses), outbound payment infrastructure (Payout Providers configuration), teacher/staff payout workflow (Payouts), and payroll generation (Teacher Salaries, Staff Salaries). Core entities: expenses, payout providers, payout requests, teacher salary records, staff salary records, currency rates, monthly financial aggregates.

### Distinct page templates vs variant count
- **Unique templates (8):** management-accounting, management-analysis-expenses, management-expense, management-payout-providers, management-payout-providers-7-edit (base for provider edit), management-payouts (base payout list), management-salaries, management-staff-salaries.
- **Variants (2):** management-payout-providers-6-edit (variant of provider-7-edit template, same structure, provider 6 = Payoneer with 3 credential fields vs 4 for Paymob); management-payouts-all-1 (query-param `?all=1` variant of management-payouts, removes month scope).

### Cross-cutting interactions and dangerous ones
- **Filter accordion** (collapsible panel with month/year selects + submit) — appears on salaries, staff-salaries, payouts pages — safe but inconsistently implemented across pages.
- **Generate Salary modal** (identical pattern on both salaries and staff-salaries) — **dangerous**: creates salary records; needs preview step.
- **Bulk Approve** (payouts) — **most dangerous**: triggers actual financial disbursements via POST to /management/payouts/approve with no observed confirmation dialog.
- **Delete salary records** — **dangerous**: appears in filter bar on both salary pages without row-level scoping; must target a full month's data.
- **Currency Rates modal** (accounting) — **dangerous**: wrong rate changes affect all financial calculations globally.
- **Expense Add/Edit modals** — mutating but scoped to single record; relatively safe if form-validated.
- **Payout Provider Save** (provider edit forms) — **operationally dangerous**: switching to Live mode with wrong credentials could break all teacher payouts.

### Improvements for the new platform
1. **Confirmation dialogs on all financial mutations**: "Approve selected", "Generate Salary", "Delete salary month", and "Save currency rates" must each show a confirmation step with a human-readable summary (who, what month, total amount).
2. **Credential security on payout provider forms**: all API key/secret/password fields must default to masked input with reveal-toggle; add a "Test connection" action before live-mode activation is allowed.
3. **Accounting dashboard**: replace the free-text date picker with a proper month/year picker; add trend indicators (up/down arrow + delta %) on each KPI card comparing to prior period.
4. **P&L analytics (analysis-expenses)**: merge the two cumulative charts into one togglable chart; make the year-range selector a connected component that validates From ≤ To.
5. **Salaries pages**: add KPI summary row to staff-salaries (matching teacher-salaries); "Generate Salary" modal should show a preview of records to be created before committing; "Download" and "Export" must be visually separated from "Delete".
6. **Payouts list**: add per-row status colour badges (green/orange/red/grey); make the all-time vs. current-month scope toggle a visible UI control, not a raw query param.
7. **Payout providers list**: add inline Active/Inactive toggle with confirmation instead of navigating to the edit page just to flip a flag.
8. **RTL-first**: all currency values (AED/EUR) must be laid out correctly in RTL context; consider placing currency symbol to the right when language is Arabic.
9. **Empty states**: every table in this batch shows "No data found" or zeros — the rebuild must include meaningful empty states with contextual guidance (e.g. "No salary records for June 2026 — click Generate Salary to create them").
10. **Mobile**: salary tables (15 cols on teacher salaries) are not mobile-friendly; rebuild needs a card/row-expand pattern for narrow viewports.
11. **Accessibility**: filter accordions must use `aria-expanded`; bulk-approve and generate-salary forms need accessible label associations on all checkbox lists.

### Items needing owner/backend confirmation
- Whether "Approve selected" on payouts immediately triggers external API calls to Paymob/Payoneer, or just marks records as approved for a batch job — affects required confirmation UX.
- Whether deleting salary records also reverses any associated payout requests, or if those must be cancelled separately.
- The "Request payouts (N)" flow on teacher salaries — unclear if this creates payout records automatically or just flags them for admin review on the Payouts page.
- Currency rate scope: are rates per-academy or global? Saving rates in the modal on the Accounting page has wide financial impact that needs clarification.
- Paymob/Payoneer webhook URLs are hardcoded to the current domain — confirm these are environment-aware in the new frontend build.
