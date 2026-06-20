# Batch 38 — teacher · Wallet / Finance

### `teacher-salary` — Teacher Salary

- Purpose: Displays a teacher's salary breakdown for each period, showing session attendance metrics, fines, gifts, hourly rate, and a computed total with a status indicator.
- Key sections / flows: Single H5 "Salary" heading; one KPI card summarising the salary block; a 13-column data table (columns: #, Fixed, Attended, Student Absent, Teacher Absent, Trials Attended, Trials Student Absent, Trials Teacher Absent, Fine, Gift, Hour Rate, Total, Status). On this capture the table returned 0 rows ("No salary found" empty state).
- Key SAFE actions: View salary table; navigate via sidebar (Home, Chat, Schedule, Students, Library, Tasks, monthly reports, Salary Class Report); view notifications; language switcher; profile/settings navigation.
- Key MUTATING/dangerous actions: None that are salary-specific. Only global-chrome mutations present: "Add shortcuts" (POST /teacher/shortcuts) and the logout form (POST /teacher/logout). Neither should be auto-fired.
- Important modals/forms: "Add shortcuts" modal — two fields (shortcut_title, shortcut_link) with a Save submit; this is global chrome, not salary-specific. No salary-specific modal or form detected.
- Variant-of: unique template (no query-param or scope variants identified in this batch).
- Broken/empty: Table has 0 rows — "No salary found" empty state rendered at capture time; logo image returns 404 (`/storage/uploads/logo.png`).
- UX improvement for the rebuild: The empty state ("No salary found") gives no context — add a period selector (month/year picker) above the table so the teacher can explicitly choose a salary period, and display a clear "No salary records for [Month Year]" message with a suggested action (e.g., contact admin) rather than a bare empty table.

---

## Module synthesis (this batch)

- **What this module does and its core entities:** The Wallet / Finance module for the teacher role surfaces a single Salary page. Its core entity is a salary record per period, decomposed into fixed pay, attendance counts (regular + trial), absence penalties/gifts, hourly rate, and a computed total with a status flag. There are no mutating salary actions available to the teacher — the page is read-only.
- **Distinct page templates vs variant count:** 1 unique template (`teacher-salary`); 0 variants. This batch is a single-page batch.
- **Cross-cutting interactions (modals/filters/tabs) and which are dangerous:** Only the global "Add shortcuts" modal exists on this page — it is the sole mutating surface (POST), but it is global chrome unrelated to salary data. No salary-specific filters, tabs, date range pickers, or modals were captured; the period/month selector is absent in the current implementation.
- **Improvements for the new platform:**
  - **Period selector:** Add a prominent month/year date-range filter at the top of the salary page so teachers can navigate across pay periods without relying on the backend to pre-select a period.
  - **Empty/error state:** Replace the bare "No salary found" with a contextual empty state (selected period, explanation, admin contact CTA).
  - **Status colors:** The "Status" column should use a consistent color-coded badge system (e.g., Paid → green, Pending → amber, Disputed → red) rather than plain text.
  - **Column clarity:** Column names like "Fixed", "Attended", "Trials Attended" are terse; rebuild should include tooltip explanations for each metric.
  - **RTL-first:** The page is LTR-only; the rebuild must support RTL layout (Arabic is the first alternate language in the switcher) — table column order, number alignment, and badge placement must all flip correctly.
  - **Mobile:** A 13-column table is unusable on mobile; rebuild should collapse to a card-per-row layout or a horizontally scrollable table with frozen first column on small screens.
  - **Export:** No export (CSV/PDF) is available; teachers may need a printable salary slip — consider adding a download/print action per row or per period.
  - **Broken logo:** The 404 on `/storage/uploads/logo.png` should be resolved or a fallback asset served.
- **Anything that needs owner/backend confirmation:**
  - Confirm whether salary periods are auto-selected by the backend (and why this capture returned 0 rows) or whether a period parameter should be passed by the frontend.
  - Clarify the meaning and allowed values of the "Status" field (paid, pending, disputed, etc.) so the rebuild can map them to correct badge colors and labels.
  - Confirm whether teachers can dispute or acknowledge a salary record, or if the page is strictly read-only for teachers (vs. admin).
