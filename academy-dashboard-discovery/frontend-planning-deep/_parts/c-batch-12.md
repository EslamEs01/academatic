# Batch 12 — Admin · Accounting Transactions, Invoice Analysis, Invoice List, Invoice Download, Invoice Creation

---

### `management-accounting-transaction-invoices` — Accounting Transaction: Invoices

- **Purpose:** Tabular ledger of invoice-based accounting transactions, filterable by family and date, within a three-tab view (Sessions / Invoices / Salary).
- **Key sections / flows:** Tabs: Sessions | Invoices | Salary (active). Filter panel (accordion): family_id select, date range text. Transaction table (11 columns): #, Serial, Invoice Date, Total Net Price, Total Additions, Discount Value, Fees Value, Other Effects, Final Total Price, Paid At, Family — 0 rows (empty). Currency Rates table (16 rows) accessible from EUR button.
- **Key SAFE actions:** Filter by family, filter by date, navigate between tabs, view currency rates modal.
- **Key MUTATING/dangerous actions:** Save currency rates (via "Save" in Currency Rates modal — posts to `management/shortcuts` or similar — needs confirmation).
- **Important modals/forms:** Currency Rates modal — base AED, 16 currencies, editable rate fields, Save button — mutating. "Loading…" generic loading modal.
- **Variant-of:** Unique template (base for transaction tab views).
- **Broken/empty:** Main transaction table shows 0 rows (empty data state, not an error).
- **UX improvement for the rebuild:** Replace the collapsible accordion filter with a persistent inline filter bar that shows active filter chips; the empty table state should display a meaningful illustration and "No transactions found for this period" message instead of a bare empty table row.

---

### `management-accounting-transaction-salary` — Accounting Transaction: Salary

- **Purpose:** Monthly salary totals ledger (teachers and staff) within the same three-tab transaction view, filterable by date.
- **Key sections / flows:** Tabs: Sessions | Invoices | Salary (active). Filter panel: date range text. Transaction table (4 columns): #, Month, Teachers Total Salary, Staff Total Salary — 0 rows. Currency Rates modal (same as session/invoices tab). EUR toggle button in header opens currency rates.
- **Key SAFE actions:** Filter by date, switch tabs, view/navigate.
- **Key MUTATING/dangerous actions:** Save currency rates (modal with Save).
- **Important modals/forms:** Currency Rates modal — same as base session template.
- **Variant-of:** `management-accounting-transaction-session` (different tab, different columns).
- **Broken/empty:** Table shows 0 rows.
- **UX improvement for the rebuild:** Add salary totals KPI cards above the table (total teachers salary, total staff salary for the period) so the "0 row but still meaningful summary" issue is resolved.

---

### `management-accounting-transaction-session` — Accounting Transaction: Sessions (Base)

- **Purpose:** Session-by-session financial ledger showing per-session student cost, teacher cost, and academy profit — the base/default tab of the transaction view.
- **Key sections / flows:** KPI header row: session count (0), attendance %, teacher EUR, student EUR, total profit EUR. Tabs: Sessions (active) | Invoices | Salary. Filter panel (accordion): date range, teacher_id, student_id, family_id, duration selects. Transaction table (10 columns): #, Student Name, Family, Teacher Name, Admin Date, Duration, Student [cost], Teacher [cost], Profit, Status — 0 rows (empty). Currency Rates table (sidebar modal).
- **Key SAFE actions:** Filter (GET), tab switch, view currency rates, navigate months with Current Month / Last Month shortcuts.
- **Key MUTATING/dangerous actions:** Save currency rates (modal).
- **Important modals/forms:** Currency Rates modal — 16 currency rate inputs, Save button, triggered by EUR button in header. "Loading…" modal.
- **Variant-of:** Unique template (base session transaction view).
- **Broken/empty:** Table shows "No data found" row — data exists but test account has no sessions.
- **UX improvement for the rebuild:** Surface status quick-filter chips (Attend / Student Absent / Teacher Absent) as tab pills directly on the table header instead of hidden in a query-param link, so the three status variants are discoverable without needing deep knowledge of the URL scheme.

---

### `management-accounting-transaction-session-status-attend` — Session Transactions: Attend Status

- **Purpose:** Identical session transaction view filtered to `status=attend` only.
- **Key sections / flows:** Same KPI cards (all 0), same 10-column table, same filters, same modals as the base session page.
- **Key SAFE actions:** Same as base template.
- **Key MUTATING/dangerous actions:** Save currency rates.
- **Important modals/forms:** Same Currency Rates modal.
- **Variant-of:** `management-accounting-transaction-session` (`?status=attend` param variant).
- **Broken/empty:** No data found.
- **UX improvement for the rebuild:** Status filter should be a UI control, not a URL change — collapse into the base page via a tab/chip.

---

### `management-accounting-transaction-session-status-student-absent` — Session Transactions: Student Absent Status

- **Purpose:** Session transaction view filtered to `status=student-absent`.
- **Key sections / flows:** Identical structure to base session page and attend variant.
- **Key SAFE actions:** Same as base.
- **Key MUTATING/dangerous actions:** Save currency rates.
- **Important modals/forms:** Currency Rates modal.
- **Variant-of:** `management-accounting-transaction-session` (`?status=student-absent` param variant).
- **Broken/empty:** No data found.
- **UX improvement for the rebuild:** See attend variant — consolidate into status chip filter on the base template.

---

### `management-accounting-transaction-session-status-teacher-absent` — Session Transactions: Teacher Absent Status

- **Purpose:** Session transaction view filtered to `status=teacher-absent`.
- **Key sections / flows:** Identical structure to the other two status variants.
- **Key SAFE actions:** Same as base.
- **Key MUTATING/dangerous actions:** Save currency rates.
- **Important modals/forms:** Currency Rates modal.
- **Variant-of:** `management-accounting-transaction-session` (`?status=teacher-absent` param variant).
- **Broken/empty:** No data found.
- **UX improvement for the rebuild:** Same as other status variants.

---

### `management-analysis-invoices` — Invoice Analytics Dashboard

- **Purpose:** Financial analytics overview of invoices — aggregate KPIs plus monthly and cumulative charts, broken down by family.
- **Key sections / flows:** Sidebar tab: "Profit and Losses / Invoices". KPI cards (6): Total Before Discount, Total After Discount, Discount, Paid (with count), UnPaid (with count), Overdue (with count) — all 0 AED. Two chart areas: "Total Invoices by Month" (bar chart) and "Cumulative Total of Invoices by Date" (line chart). Status multi-checkbox filter: Paid / Due / Overdue (GET, shown as status=3 dropdown). Family breakdown table (5 cols): #, Family name, Paid, Due, Overdue — empty. Date range filter via flatpickr.
- **Key SAFE actions:** Filter by status checkboxes, filter by date range, view charts, navigate sidebar tabs.
- **Key MUTATING/dangerous actions:** None (all filters are GET).
- **Important modals/forms:** No meaningful modals (only global Loading/Recent Searches/Add shortcuts chrome).
- **Variant-of:** Unique template.
- **Broken/empty:** All KPIs are 0 AED; table shows "No Data found"; charts are empty (no data in test account).
- **UX improvement for the rebuild:** Replace the collapsible status filter with an always-visible segmented toggle (Paid / Due / Overdue) so the chart and table update inline; add skeleton placeholders for the charts during load rather than blank chart canvases.

---

### `management-downlaod` — Invoice Download/Export Page (Base)

- **Purpose:** Filterable invoice list specifically for downloading/exporting, including KPI counts (all, unpaid, paid, deleted) — this is actually the `/management/invoices?status=SoftDelete` page renamed in the slug as "downlaod" (typo in route).
- **Key sections / flows:** KPI cards (4): all invoices 0, unpaid invoices 0, paid invoices 0, Deleted Invoices 0. Filter accordion: Date (flatpickr range), Filter By (Due Date / Payment Date), Currency (16 options), Gateway (named gateways). Invoice table (10 cols): #, Ordered Number, Due Date, Parent, Payment Date, Payment Id, Total Price, Total: (AED), Status, Actions — 0 rows. Download link + Export button above table. "New Transaction" modal (via row action, see below).
- **Key SAFE actions:** Filter (GET), Download link (navigation), Export (navigation).
- **Key MUTATING/dangerous actions:** "Submit" in New Transaction modal — POSTs to `/management/accountant/store-transaction` with fields: transaction_id, date_payment, basic, additional, taxes, total, currency, gateway. "Cancel" (reset form). Must NOT be auto-fired.
- **Important modals/forms:** New Transaction modal — fields: Transaction ID, Payment Date, Basic amount, Additional, Taxes, Total (auto-calc), Currency select (multi-currency), Gateway select. Dangerous: stores a financial transaction.
- **Variant-of:** Unique template (base for the download/invoice list with export).
- **Broken/empty:** All KPI counts are 0, table empty ("No data found"). Note: actual URL resolves to `?status=SoftDelete` which is the deleted invoices filter, making the "Deleted Invoices" KPI the expected active filter — but all are 0.
- **UX improvement for the rebuild:** Rename the route from the typo "downlaod" to "download"; separate the "Deleted Invoices" filter clearly from the All/Paid/Unpaid summary so the user understands they may be viewing a soft-deleted subset; the New Transaction modal should require explicit confirmation before submission.

---

### `management-downlaod-date-2026-06-01-to-2026-06-30` — Invoice Download: Date Range Filter

- **Purpose:** Same download/invoice list page with `date=2026-06-01 to 2026-06-30` pre-applied (and `status=SoftDelete` from the crawler context).
- **Key sections / flows:** Identical to base download template; date range populated in filter; all counts still 0.
- **Key SAFE actions:** Same as base.
- **Key MUTATING/dangerous actions:** New Transaction modal (Submit).
- **Important modals/forms:** New Transaction modal — same fields.
- **Variant-of:** `management-downlaod` (date query-param variant).
- **Broken/empty:** All 0.
- **UX improvement for the rebuild:** See base template.

---

### `management-downlaod-date-2026-06-01-to-2026-06-30-date-type-date-payment-status` — Invoice Download: Date+DateType(payment)+Status(Paid)

- **Purpose:** Download/invoice list filtered by date range, date_type=date_payment, status=Paid (though rendered URL also has status=SoftDelete from crawler context — intersection).
- **Key sections / flows:** Identical to base download template.
- **Key SAFE actions:** Same as base.
- **Key MUTATING/dangerous actions:** New Transaction modal.
- **Important modals/forms:** Same New Transaction modal.
- **Variant-of:** `management-downlaod` (multi-param variant: date + date_type + status).
- **Broken/empty:** All 0.
- **UX improvement for the rebuild:** See base template.

---

### `management-downlaod-date-2026-06-01-to-2026-06-30-date-type-due-date-status-unpa` — Invoice Download: Date+DateType(due_date)+Status(Unpaid)

- **Purpose:** Download/invoice list filtered by date range, date_type=due_date, status=Unpaid.
- **Key sections / flows:** Identical to base download template.
- **Key SAFE actions:** Same as base.
- **Key MUTATING/dangerous actions:** New Transaction modal.
- **Important modals/forms:** Same New Transaction modal.
- **Variant-of:** `management-downlaod` (date + date_type=due_date + status=Unpaid variant).
- **Broken/empty:** All 0.
- **UX improvement for the rebuild:** See base template.

---

### `management-downlaod-status-all` — Invoice Download: Status=All

- **Purpose:** Download/invoice list filtered to status=All.
- **Key sections / flows:** Identical to base download template.
- **Key SAFE actions:** Same.
- **Key MUTATING/dangerous actions:** New Transaction modal.
- **Important modals/forms:** Same New Transaction modal.
- **Variant-of:** `management-downlaod` (`?status=All` variant).
- **Broken/empty:** All 0.
- **UX improvement for the rebuild:** See base.

---

### `management-downlaod-status-paid` — Invoice Download: Status=Paid

- **Purpose:** Download/invoice list filtered to status=Paid.
- **Key sections / flows:** Identical to base download template.
- **Key SAFE actions:** Same.
- **Key MUTATING/dangerous actions:** New Transaction modal.
- **Important modals/forms:** Same New Transaction modal.
- **Variant-of:** `management-downlaod` (`?status=Paid` variant).
- **Broken/empty:** All 0.
- **UX improvement for the rebuild:** See base.

---

### `management-downlaod-status-softdelete` — Invoice Download: Status=SoftDelete

- **Purpose:** Download/invoice list filtered to soft-deleted invoices.
- **Key sections / flows:** Identical to base download template; the Deleted Invoices KPI is the semantically active one on this view.
- **Key SAFE actions:** Same.
- **Key MUTATING/dangerous actions:** New Transaction modal.
- **Important modals/forms:** Same New Transaction modal.
- **Variant-of:** `management-downlaod` (`?status=SoftDelete` variant).
- **Broken/empty:** All 0.
- **UX improvement for the rebuild:** See base.

---

### `management-downlaod-status-unpaid` — Invoice Download: Status=Unpaid

- **Purpose:** Download/invoice list filtered to status=Unpaid.
- **Key sections / flows:** Identical to base download template.
- **Key SAFE actions:** Same.
- **Key MUTATING/dangerous actions:** New Transaction modal.
- **Important modals/forms:** Same New Transaction modal.
- **Variant-of:** `management-downlaod` (`?status=Unpaid` variant).
- **Broken/empty:** All 0.
- **UX improvement for the rebuild:** See base.

---

### `management-invoices` — Invoice List (Main)

- **Purpose:** Primary admin invoice management list — the canonical page for browsing, filtering, downloading, exporting, and adding transactions to invoices.
- **Key sections / flows:** Title: "All Invoices". KPI cards (4): all invoices 0, unpaid 0, paid 0, Deleted Invoices 0. Filter accordion: Date range, Filter By (Due Date / Payment Date), Currency, Gateway selects. Invoice table (10 cols): #, Ordered Number, Due Date, Parent, Payment Date, Payment Id, Total Price, Total: (AED), Status, Actions — empty. Download link + Export button. New Transaction modal (row action). Note: a status=SoftDelete link appears in the discovered links, routing to the downlaod route.
- **Key SAFE actions:** Filter (GET), Download, Export (navigation links).
- **Key MUTATING/dangerous actions:** New Transaction modal Submit — POSTs to `/management/accountant/store-transaction` (Transaction ID, Payment Date, Basic, Additional, Taxes, Total, Currency, Gateway). Must require explicit user confirmation.
- **Important modals/forms:** New Transaction modal — financial transaction entry (see above). This is the most consequential mutating action on this page.
- **Variant-of:** Unique template (root invoice list; the downlaod variants are secondary entry points to the same list with different status filters).
- **Broken/empty:** Table shows "No data found"; all KPI counts are 0.
- **UX improvement for the rebuild:** Move the status filter tabs (All / Paid / Unpaid / Deleted) to persistent pill/tab controls above the table rather than hidden query-param links, and add an explicit confirmation dialog with invoice summary before the New Transaction modal's Submit fires.

---

### `management-invoices-create-parent-invoice-1` — Create Invoice for Family #1

- **Purpose:** Full invoice creation form for a specific family (family_id=1), pre-loaded with that family's course data and existing sessions as line items.
- **Key sections / flows:** Two-panel layout: Invoice summary card (left — Invoice To: family info, Bill To: company info, Total Due: EUR 30.90, invoice #, date fields) + form panel (right). Courses table (6 cols): Start Date, Serial, Item, Student, Price, (delete action) — 1 row pre-filled. "Add Course" dropdown + "Add Item" button for manual line items. Discount Options section: price, discount %, fees %, additional amount, adjustment type, adjustment value, adjustment count, note textarea. Payment method select. "Send Notification" checkbox. Submit Invoice button. Sessions table shows 1 live session: arabic course, student محمد احمد, 30 EUR.
- **Key SAFE actions:** View invoice preview, change payment method selection, change date fields (read preview update).
- **Key MUTATING/dangerous actions:** Delete course row (removes line item, dynamically), Add Course (appends line item), Add Item (appends custom line item), Submit Invoice (POST to `/management/invoices` — creates invoice record and optionally sends notification to family). "Send Notification" checkbox if checked triggers a message send on submit — doubly dangerous.
- **Important modals/forms:** Invoice form (inline, not modal): serial, date, due_date, family_id (hidden), course_id[] (hidden), price, discount, fees, additional, adjustment_type, adjustment_value, adjustment_count, note, paymentMethod, sendMessage. Key dangerous fields: sendMessage (will trigger push notification to family on submit).
- **Variant-of:** Unique template (create invoice form, family-scoped by URL parameter).
- **Broken/empty:** No errors; shows real data (one session pre-loaded for family 1).
- **UX improvement for the rebuild:** The "Send Notification" checkbox should default to unchecked and be visually separated with an explicit label ("Notify family by message when invoice is created"), and Submit Invoice should show a confirmation dialog summarizing total due, recipient, and notification status before POSTing.

---

### `management-invoices-create-parent-invoice-2` — Create Invoice for Family #2

- **Purpose:** Same invoice creation form for a different family (family_id=2, "الطالبة لمار حسن"), with no pre-loaded sessions.
- **Key sections / flows:** Same two-panel layout as family #1. Total Due: GBP 0.00. Courses table: empty ("No data found"). Same form fields, same Discount Options, same payment/notification controls. No existing sessions for this family.
- **Key SAFE actions:** Same as family #1 create.
- **Key MUTATING/dangerous actions:** Add Course, Add Item, Submit Invoice (POST), Send Notification. Same danger profile as family #1.
- **Important modals/forms:** Same invoice creation form.
- **Variant-of:** `management-invoices-create-parent-invoice-1` (same template, different family_id URL param; the empty sessions state is noted).
- **Broken/empty:** Courses table empty (no sessions for this family in the period) — not an error, valid empty state.
- **UX improvement for the rebuild:** When no sessions exist for the family, show a clear empty-state prompt ("No courses found for this family — add a course manually or check if sessions have been logged") rather than a bare empty table row.

---

## Module synthesis (this batch)

**What this module does and its core entities:**
This batch covers the core Accounting / Finance area of the admin dashboard, specifically: (1) the three-tab Transaction ledger (Sessions, Invoices, Salary); (2) the Invoice Analytics dashboard; (3) the Invoice List with download/export; (4) the Invoice Creation form. Core entities: Invoice (serial, date, due_date, family, status, line items, discounts, total), Transaction (id, payment_date, amounts, currency, gateway), Session (student, teacher, date, duration, cost components, profit, status — attend/student-absent/teacher-absent), Salary aggregates (month, teacher total, staff total).

**Distinct page templates vs variant count:**
- Unique templates: 6
  1. `management-accounting-transaction-session` — Session transaction ledger (base)
  2. `management-accounting-transaction-invoices` — Invoice transaction ledger
  3. `management-accounting-transaction-salary` — Salary transaction ledger
  4. `management-analysis-invoices` — Invoice analytics dashboard
  5. `management-invoices` — Invoice list with download/export/transaction
  6. `management-invoices-create-parent-invoice-{id}` — Create invoice form
- Variant pages: 12
  - Session status variants: 3 (`?status=attend`, `?status=student-absent`, `?status=teacher-absent`)
  - Invoice download/status variants: 7 (base download, status=All, Paid, Unpaid, SoftDelete, date-filtered, date+type+status filtered)
  - Create invoice family variants: 2 (family 1, family 2 — same template, different family_id)

**Cross-cutting interactions (modals/filters/tabs) and which are dangerous:**
- Currency Rates modal (present on all 3 transaction tabs + session status variants): editing and **saving exchange rates** is a mutating global action — affects all financial calculations across the platform. Must require confirmation or role-level protection.
- New Transaction modal (on invoice list + all download variants): **store-transaction POST** creates a financial ledger entry — no confirmation dialog present. Must add explicit confirm step.
- Submit Invoice form (create-invoice pages): **creates invoice + optionally sends notification** — needs a summary confirmation dialog and clear opt-in for the notification.
- Filter forms across all transaction pages: all GET — safe.
- Status filter on invoice list: currently implemented as separate URL routes (`?status=Paid`, `?status=SoftDelete`, etc.) — not UI tabs, making the interface non-obvious.

**Improvements for the new platform:**
1. **Navigation/URL structure:** Consolidate the session transaction status variants into a single route with an in-page filter chip/tab group. Do the same for the invoice download status variants — they should all be states of one invoice list page, not separate routes. Fix the "downlaod" typo in the route.
2. **Dashboard/KPIs:** On the analytics page, use non-zero-state skeleton loaders and an empty illustration instead of empty chart canvases. Add period-selector (this month / last month / custom) as a top-level UI control, not buried in an accordion filter.
3. **Tables:** All tables in this batch had empty data in the test account. Build explicit empty-state components per entity: "No transactions for this period", "No invoices found", etc. with actionable CTAs. All tables need sortable columns.
4. **Modals:** Currency Rates modal must have a confirmation step before Save — this is a global financial setting. New Transaction modal must show a summary of what is being recorded and require explicit confirm. Both should trap focus and support Escape-to-close.
5. **Invoice creation form:** Pre-fill date to today and due_date to +30 days as sensible defaults. Show running total in real time as courses/items are added/removed. "Send Notification" checkbox must be unchecked by default and explained in plain language. Submit should open a confirm dialog: "Create invoice of EUR X.XX for [Family Name]? Notification will be sent." 
6. **Status colors:** Invoice statuses (Paid, Unpaid, Overdue, SoftDelete/Deleted) need consistent color coding across the list, KPI cards, and the create form. Use green/amber/red/gray semantic tokens.
7. **RTL/mobile:** None of the pages in this batch are RTL, but the family names appearing in Arabic (محمد احمد, الطالبة لمار حسن) confirm the data is bilingual. The invoice creation form will need RTL support for Arabic family names in the "Invoice To" section.
8. **Exports:** Download and Export buttons are simple anchor links — in the rebuild, expose these as a proper Export dialog with format selection (CSV/PDF) and date-range confirmation.
9. **Currency:** The multi-currency architecture (16 currencies, base AED) is a core financial primitive. The rebuild should surface the active display currency clearly on every financial page, and the Currency Rates modal should be a dedicated settings screen, not an afterthought flyout.
10. **Accessibility:** The three-tab transaction view uses no ARIA roles on the tab strip. All filter accordions have no keyboard trap or ARIA expanded state. The invoice form fields are missing labels in several cases (date field uses same label text "Invoice #" as the serial field — placeholder-as-label anti-pattern).

**Needs owner/backend confirmation:**
- Does saving Currency Rates affect historical invoices or only new ones? Clarify the impact scope before showing the modal as a casual click target.
- What does the "Send Notification" on invoice creation actually send (email, SMS, in-app)? This affects UX copy in the confirmation dialog.
- Is `management/downlaod` (the typo route) the canonical download URL or an alias? Safe to rename in the rebuild?
- What does the "New Transaction" modal (store-transaction) do exactly — record a payment received against an invoice, or a generic ledger entry? The field names (basic, additional, taxes) suggest the latter but it needs confirmation.
- The Salary transaction tab shows 0 rows — confirm whether staff salary data flows in automatically from the salaries module or requires manual entry.
