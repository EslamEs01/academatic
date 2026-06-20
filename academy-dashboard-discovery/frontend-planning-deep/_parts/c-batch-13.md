# Batch 13 — admin · Payments / Invoices (List of Invoices + Monthly Invoices)

---

### `management-invoices-date-2026-06-01-to-2026-06-30` — Invoices (Date Range Filter, no status)

- **Purpose:** Invoice list filtered by a date range, status defaulting to "All Invoices".
- **Key sections / flows:** Four KPI summary cards (all invoices, unpaid, paid, deleted — all 0 here); collapsible Filter panel (date range, date-type selector, currency, gateway); paginated invoice table (10 cols: #, Ordered Number, Due Date, Parent, Payment Date, Payment Id, Total Price, Total in AED, Status, Actions); Download and Export links.
- **Key SAFE actions:** Filter (GET), Download, Export, pagination navigation.
- **Key MUTATING/dangerous actions:** "Submit" on the "New Transaction" modal (POST to `/management/accountant/store-transaction`); "Cancel" (reset); "Save" on Add Shortcuts.
- **Important modals/forms:** "New Transaction" modal — fields: Transaction ID, Payment Date, Basic, Additional, Taxes, Total, Currency (multi-currency select), Gateway. This directly writes an accounting transaction against an invoice and must never be auto-fired.
- **Variant-of:** This is the base template for all 17 `management-invoices-*` pages in this batch; the only differences across variants are `status` and `date_type` query params.
- **Broken/empty:** All KPI counts are 0 and the table shows "No data found" — no live invoice data was present during the crawl.
- **UX improvement for the rebuild:** Replace the collapsible accordion filter with a persistent inline filter bar with live URL-param binding, so the active filter state is always visible without a second click.

---

### `management-invoices-date-2026-06-01-to-2026-06-30-status-paid-date-type-date-pay` — Invoices (Date=Jun, Status=Paid, DateType=Payment Date)

- **Purpose:** Same invoice list template narrowed to Paid status and filtered by payment date within a specific month.
- **Key sections / flows:** Same as base — 4 KPI cards, collapsible filter (all controls retained), 10-col table. Page heading reads "Paid Invoices".
- **Key SAFE actions:** Filter, Download, Export.
- **Key MUTATING/dangerous actions:** New Transaction Submit, Cancel, Save (shortcuts).
- **Important modals/forms:** Same "New Transaction" modal present on page even though status=Paid (anomalous — should only appear for unpaid invoices; confirm with backend whether marking paid invoices is blocked server-side).
- **Variant-of:** `management-invoices-date-2026-06-01-to-2026-06-30` (base template, status+date_type params only differ).
- **Broken/empty:** Table shows "No data found".
- **UX improvement for the rebuild:** Add a visual "active status tab" indicator (pill or underline) so users can clearly see which status filter is applied without reading URL params.

---

### `management-invoices-date-2026-06-01-to-2026-06-30-status-unpaid-date-type-due-da` — Invoices (Date=Jun, Status=Unpaid, DateType=Due Date)

- **Purpose:** Invoice list filtered to Unpaid status with due-date range for June.
- **Key sections / flows:** Identical page structure. Heading reads "Unpaid Invoices".
- **Key SAFE actions:** Filter, Download, Export.
- **Key MUTATING/dangerous actions:** New Transaction Submit (highest risk — marks payment on an unpaid invoice), Cancel, Save shortcuts.
- **Important modals/forms:** "New Transaction" modal — same 8 fields. This is the primary action for processing a payment on an unpaid invoice and requires explicit confirmation.
- **Variant-of:** `management-invoices-date-2026-06-01-to-2026-06-30` base template.
- **Broken/empty:** Table empty, all KPIs 0.
- **UX improvement for the rebuild:** On the New Transaction modal, add a confirmation step (review-before-submit) before posting to `/store-transaction`, and auto-fill invoice total/currency from row context rather than requiring manual entry.

---

### `management-invoices-status-all` — Invoices (Status=All)

- **Purpose:** Full unfiltered invoice list with status=All; this is effectively the "default" view of the invoice module reachable via KPI card link.
- **Key sections / flows:** Same 4 KPI cards, 10-col table, collapsible filter. Heading "All Invoices". Discovered directly from the `/management/invoices` route via sidebar link.
- **Key SAFE actions:** Filter, Download, Export, pagination.
- **Key MUTATING/dangerous actions:** New Transaction Submit, Cancel, Save shortcuts.
- **Important modals/forms:** Same "New Transaction" modal.
- **Variant-of:** `management-invoices-date-2026-06-01-to-2026-06-30` base template (status param only).
- **Broken/empty:** All KPIs 0, table empty.
- **UX improvement for the rebuild:** Surface the KPI card counts as clickable tab filters (All / Unpaid / Paid / Deleted) directly on the page rather than separate URL navigations.

---

### `management-invoices-status-all-date-2026-06-01-to-2026-06-30-date-type` — Invoices (Status=All, Date=Jun, DateType=empty)

- **Purpose:** Status=All with a date range applied but date_type left blank (degenerate filter state — date range present without a date dimension).
- **Key sections / flows:** Identical template; heading "All Invoices".
- **Key SAFE actions:** Filter, Download, Export.
- **Key MUTATING/dangerous actions:** New Transaction Submit, Cancel, Save.
- **Important modals/forms:** Same.
- **Variant-of:** `management-invoices-date-2026-06-01-to-2026-06-30` base template.
- **Broken/empty:** Empty table/KPIs. Note: `date_type` is empty string — the backend accepts this but it's a degenerate case. Rebuild should validate that date_type is required when a date range is supplied.
- **UX improvement for the rebuild:** Require date_type selection before enabling the date range picker, preventing this empty-key filter state.

---

### `management-invoices-status-all-date-2026-06-01-to-2026-06-30-date-type-date-paym` — Invoices (Status=All, Date=Jun, DateType=Payment Date)

- **Purpose:** All-status invoice list filtered by payment date in June.
- **Key sections / flows:** Same base template. Heading "All Invoices".
- **Key SAFE actions:** Filter, Download, Export.
- **Key MUTATING/dangerous actions:** New Transaction Submit, Cancel, Save.
- **Important modals/forms:** Same New Transaction modal.
- **Variant-of:** `management-invoices-date-2026-06-01-to-2026-06-30` base template.
- **Broken/empty:** Empty table/KPIs. Notably 356 network requests captured (vs ~215 for simpler pages), suggesting extra background polling when filters are applied.
- **UX improvement for the rebuild:** Cache filter results locally with a stale-while-revalidate pattern; avoid polling on every param change.

---

### `management-invoices-status-all-date-2026-06-01-to-2026-06-30-date-type-due-date` — Invoices (Status=All, Date=Jun, DateType=Due Date)

- **Purpose:** All-status list filtered by due date in June.
- **Key sections / flows:** Identical base template. Heading "All Invoices".
- **Key SAFE actions:** Filter, Download, Export.
- **Key MUTATING/dangerous actions:** New Transaction Submit, Cancel, Save.
- **Important modals/forms:** Same.
- **Variant-of:** `management-invoices-date-2026-06-01-to-2026-06-30` base template.
- **Broken/empty:** Empty. 351 network requests.
- **UX improvement for the rebuild:** Show a clear "No results for this date range" empty state with a "Clear filters" action, rather than a generic "No data found" row inside the table.

---

### `management-invoices-status-paid` — Invoices (Status=Paid)

- **Purpose:** Invoice list filtered to Paid status, no date range — shows all paid invoices ever.
- **Key sections / flows:** Same template, heading "Paid Invoices"; 4 KPI cards; 10-col table.
- **Key SAFE actions:** Filter, Download, Export.
- **Key MUTATING/dangerous actions:** New Transaction Submit (anomalous on paid invoices — needs server-side guard), Cancel, Save shortcuts.
- **Important modals/forms:** Same New Transaction modal.
- **Variant-of:** `management-invoices-date-2026-06-01-to-2026-06-30` base template (status param only).
- **Broken/empty:** Empty.
- **UX improvement for the rebuild:** On status=Paid, either hide or visually disable the "New Transaction" row action to prevent confusion — or show a "Payment already recorded" tooltip.

---

### `management-invoices-status-paid-date-2026-06-01-to-2026-06-30-date-type` — Invoices (Status=Paid, Date=Jun, DateType=empty)

- **Purpose:** Paid invoices with date range but empty date_type — same degenerate filter state as the All variant.
- **Key sections / flows:** Identical base template, heading "Paid Invoices".
- **Key SAFE actions:** Filter, Download, Export.
- **Key MUTATING/dangerous actions:** New Transaction Submit, Cancel, Save.
- **Important modals/forms:** Same.
- **Variant-of:** `management-invoices-date-2026-06-01-to-2026-06-30` base template.
- **Broken/empty:** Empty.
- **UX improvement for the rebuild:** Enforce date_type requirement on the filter form (same as noted above).

---

### `management-invoices-status-paid-date-2026-06-01-to-2026-06-30-date-type-due-date` — Invoices (Status=Paid, Date=Jun, DateType=Due Date)

- **Purpose:** Paid invoices filtered by due date in June.
- **Key sections / flows:** Same base template, heading "Paid Invoices".
- **Key SAFE actions:** Filter, Download, Export.
- **Key MUTATING/dangerous actions:** New Transaction Submit, Cancel, Save.
- **Important modals/forms:** Same.
- **Variant-of:** `management-invoices-date-2026-06-01-to-2026-06-30` base template.
- **Broken/empty:** Empty. 352 requests captured.
- **UX improvement for the rebuild:** For the Paid+due-date filter combo, provide a visual summary chip showing "Paid | Due: Jun 2026" so the filter state is scannable at a glance.

---

### `management-invoices-status-softdelete` — Invoices (Status=SoftDelete)

- **Purpose:** Invoice trash bin — shows invoices that have been soft-deleted; distinct from the other status tabs because these records are not permanently removed.
- **Key sections / flows:** Same base template, heading "Deleted Invoices". All 4 KPI cards still present including "Deleted Invoices" counter. Table same 10 columns with Actions (presumably restore/hard-delete actions in the real data).
- **Key SAFE actions:** Filter, Download, Export.
- **Key MUTATING/dangerous actions:** New Transaction Submit (should not apply to deleted invoices — confirm server-side guard), Cancel, Save. Actions in the table on real data likely include Restore and Permanent Delete — both dangerous.
- **Important modals/forms:** Same New Transaction modal present (likely vestigial for this view).
- **Variant-of:** `management-invoices-date-2026-06-01-to-2026-06-30` base template.
- **Broken/empty:** Empty.
- **UX improvement for the rebuild:** Make the SoftDelete tab visually distinct (e.g., red/danger tinting, "Trash" icon) and surface Restore and Permanent Delete as explicit row actions with separate confirm dialogs.

---

### `management-invoices-status-softdelete-date-2026-06-01-to-2026-06-30-date-type` — Invoices (Status=SoftDelete, Date=Jun, DateType=empty)

- **Purpose:** Deleted invoices with a date range but empty date_type.
- **Key sections / flows:** Identical base template, heading "Deleted Invoices".
- **Key SAFE actions:** Filter, Download, Export.
- **Key MUTATING/dangerous actions:** New Transaction Submit, Cancel, Save.
- **Important modals/forms:** Same.
- **Variant-of:** `management-invoices-date-2026-06-01-to-2026-06-30` base template.
- **Broken/empty:** Empty. 348 requests.
- **UX improvement for the rebuild:** Require date_type before accepting date range (consistent fix across all variants).

---

### `management-invoices-status-softdelete-date-2026-06-01-to-2026-06-30-date-type-da` — Invoices (Status=SoftDelete, Date=Jun, DateType=Payment Date)

- **Purpose:** Deleted invoices filtered by payment date in June.
- **Key sections / flows:** Same base template, heading "Deleted Invoices".
- **Key SAFE actions:** Filter, Download, Export.
- **Key MUTATING/dangerous actions:** New Transaction Submit, Cancel, Save.
- **Important modals/forms:** Same.
- **Variant-of:** `management-invoices-date-2026-06-01-to-2026-06-30` base template.
- **Broken/empty:** Empty. 358 requests captured.
- **UX improvement for the rebuild:** For deleted records, lock the transaction modal; only show Restore action.

---

### `management-invoices-status-softdelete-date-2026-06-01-to-2026-06-30-date-type-du` — Invoices (Status=SoftDelete, Date=Jun, DateType=Due Date)

- **Purpose:** Deleted invoices filtered by due date in June.
- **Key sections / flows:** Same base template, heading "Deleted Invoices".
- **Key SAFE actions:** Filter, Download, Export.
- **Key MUTATING/dangerous actions:** New Transaction Submit, Cancel, Save.
- **Important modals/forms:** Same.
- **Variant-of:** `management-invoices-date-2026-06-01-to-2026-06-30` base template.
- **Broken/empty:** Empty.
- **UX improvement for the rebuild:** Same as above — lock mutating actions for soft-deleted records.

---

### `management-invoices-status-unpaid` — Invoices (Status=Unpaid)

- **Purpose:** Invoice list showing all unpaid invoices without a date constraint — the primary AR (accounts receivable) view for the admin.
- **Key sections / flows:** Same base template, heading "Unpaid Invoices"; 4 KPI cards; 10-col table. The New Transaction action is most contextually relevant here.
- **Key SAFE actions:** Filter, Download, Export.
- **Key MUTATING/dangerous actions:** New Transaction Submit (core payment-recording action — highest risk), Cancel, Save shortcuts.
- **Important modals/forms:** "New Transaction" modal — Transaction ID, Payment Date, Basic, Additional, Taxes, Total, Currency, Gateway. Fields have no visible required-field indicators in the current form.
- **Variant-of:** `management-invoices-date-2026-06-01-to-2026-06-30` base template.
- **Broken/empty:** Empty.
- **UX improvement for the rebuild:** All financial fields in New Transaction must be validated (numeric, positive, total = basic + additional + taxes); add field-level error messages and pre-fill currency/gateway from invoice row data.

---

### `management-invoices-status-unpaid-date-2026-06-01-to-2026-06-30-date-type` — Invoices (Status=Unpaid, Date=Jun, DateType=empty)

- **Purpose:** Unpaid invoices with a June date range and empty date_type.
- **Key sections / flows:** Identical base template, heading "Unpaid Invoices".
- **Key SAFE actions:** Filter, Download, Export.
- **Key MUTATING/dangerous actions:** New Transaction Submit, Cancel, Save.
- **Important modals/forms:** Same.
- **Variant-of:** `management-invoices-date-2026-06-01-to-2026-06-30` base template.
- **Broken/empty:** Empty.
- **UX improvement for the rebuild:** Require date_type before accepting date range.

---

### `management-invoices-status-unpaid-date-2026-06-01-to-2026-06-30-date-type-date-p` — Invoices (Status=Unpaid, Date=Jun, DateType=Payment Date)

- **Purpose:** Unpaid invoices filtered by payment date in June — likely an edge case (unpaid invoices with a payment date may indicate partially-processed or errored records).
- **Key sections / flows:** Same base template, heading "Unpaid Invoices".
- **Key SAFE actions:** Filter, Download, Export.
- **Key MUTATING/dangerous actions:** New Transaction Submit, Cancel, Save.
- **Important modals/forms:** Same New Transaction modal.
- **Variant-of:** `management-invoices-date-2026-06-01-to-2026-06-30` base template.
- **Broken/empty:** Empty. 357 requests.
- **UX improvement for the rebuild:** Investigate whether Unpaid+DateType=PaymentDate is a valid filter combination; if not, disable this combination in the UI or show an informational message.

---

### `management-monthly-invoices` — Monthly Invoice List

- **Purpose:** Separate invoice view organized by month rather than by status — likely a billing-cycle summary for subscription or recurring payments tied to a parent/family.
- **Key sections / flows:** Single section with heading "Monthly Invoices"; Filter card with a date picker (MM/DD/YYYY) and a month select; table with 3 columns: #, Parent, Status; breadcrumb "Dashboard > monthly invoice list"; no KPI summary cards (unlike the main invoice list).
- **Key SAFE actions:** Search/filter by date, pagination.
- **Key MUTATING/dangerous actions:** Save shortcuts (global chrome only — no invoice-specific mutations visible on this page).
- **Important modals/forms:** No invoice-action modal on this page. Only the global "Add shortcuts" and "Recent Searches" modals are present.
- **Variant-of:** Unique template — distinct from the main invoices list (fewer columns, different filter, no status tabs, no KPI cards, no Download/Export, no transaction modal).
- **Broken/empty:** Table empty ("No data found"). Only 91 network requests — much lighter than the main list pages.
- **UX improvement for the rebuild:** Add exportable monthly summary totals (sum by status) alongside the list, and allow drilling into a month to see the individual invoice rows, rather than a flat undifferentiated list.

---

## Module synthesis (this batch)

### What this module does and its core entities

The batch covers the **Payments / Invoices** module for the admin role. Core entities:
- **Invoice** — linked to a Parent (family/guardian), has Ordered Number, Due Date, Payment Date, Payment ID, Price (basic + additional + taxes), Total in AED (normalized currency), Status (Unpaid / Paid / SoftDelete / All).
- **Transaction** — an accounting record created per invoice to mark payment; fields: Transaction ID, Payment Date, Basic, Additional, Taxes, Total, Currency (15+ currencies), Gateway (payment processor).
- **Monthly Invoice** — a parallel billing-cycle view showing parent + status only, filtered by month.

### Distinct page templates vs variant count

- **Unique templates: 2**
  1. `management-invoices` — main invoice list with 4 KPI cards, 10-col table, collapsible filter, New Transaction modal.
  2. `management-monthly-invoices` — simplified monthly view with 3-col table, date-only filter, no transaction action.
- **Variant pages: 16** (pages 1–17 minus the base = 16 variants of the main invoices template, differing by combinations of `status` ∈ {no param, All, Paid, Unpaid, SoftDelete} × `date_type` ∈ {empty, none, due_date, date_payment} × date range).

### Cross-cutting interactions (modals/filters/tabs) and which are dangerous

- **New Transaction modal** — DANGEROUS: POST to `/management/accountant/store-transaction`. All 10 financial fields unvalidated in-browser; no required indicators; no confirmation step. Must have client-side validation + server-side idempotency guard in rebuild.
- **Filter panel** — SAFE: GET-only, no data mutation. However, the `date_type` field has no client-side enforcement — date ranges without a `date_type` are accepted silently by the backend (produces degenerate results).
- **Download / Export links** — SAFE navigation.
- **Status navigation** — currently implemented as separate URL loads (not in-page tab switching) — causes full page reloads and high network request counts (215–358 requests per page).
- **Add Shortcuts modal** — POST but low risk (UI personalization only).

### Improvements for the new platform

1. **Status tabs as in-page filters**: Replace URL-per-status navigation with a tab bar (`All | Unpaid | Paid | Deleted`) that updates query params without a full reload; preserve date/date_type/currency/gateway across tab switches.
2. **Date filter validation**: Require `date_type` to be selected before a date range is accepted; show inline validation error if date range is entered without a dimension.
3. **New Transaction modal hardening**: Add field-level validation (numeric, positive, total = basic + additional + taxes), pre-populate currency/gateway from invoice context, add a review step before submit, and show a success/error toast after posting.
4. **SoftDelete tab differentiation**: Apply visual danger styling (red tint, trash icon) to the Deleted Invoices tab; hide New Transaction action for soft-deleted records; expose Restore and Permanent Delete as separate confirmed actions.
5. **Empty-state design**: Replace generic "No data found" table row with a contextual empty state (illustration + message + clear-filters CTA).
6. **Paid invoice guard**: Disable or hide New Transaction on Paid invoices; show "Already paid" tooltip.
7. **Monthly Invoices expansion**: Add monthly totals row, drill-down to individual invoices per month, and add Export per month.
8. **Network efficiency**: The current crawl shows 215–358 requests per invoice page (likely due to polling or large initial asset loads). The rebuild should lazy-load non-critical assets and use a single API call with query params for filtering.
9. **RTL support**: All pages are LTR (`en`). The filter panel, table, and modals need full RTL mirroring for Arabic admin users.
10. **Accessibility**: The filter form labels are mismatched (e.g., Currency select has label "Taxes" — `currancy` field). Rebuild must audit and fix all label associations; modal focus traps and ARIA roles are absent in the original.

### Anything that needs owner/backend confirmation

- Does the backend block New Transaction for `status=Paid` or `status=SoftDelete` invoices, or is that guard missing? (Affects whether the UI hide/disable is sufficient or a server guard is also needed.)
- What actions are available in the "Actions" column on the SoftDelete view? (Restore and/or hard-delete — not visible in the crawler because all tables were empty.)
- The `Unpaid + DateType=PaymentDate` filter combination appears semantically contradictory (unpaid invoices shouldn't have a payment date). Confirm whether this is intentional or a degenerate state.
- Gateway options visible in the filter are `All`, `احمد محمد`, and `Unknown` — these look like real (possibly test) data names mixed into a system filter. Confirm intended gateway list.
- Monthly Invoices table only has 3 columns (# / Parent / Status) — confirm whether Amount/Total is intentionally absent or a data issue.
