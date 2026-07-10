# Contract: leads.html — Spec 034

**Sections**: authored KPI cards (display-only, no arithmetic) · lead list (`#`/Date/Parent/Email/Phone/Status/Actions) · filters (9 status + source + search) · lead-detail drawer (notes log + Add-Notes + Change-Status) · Create-Request form drawer.
**Allowed (read/UI)**: filter by status/source, search, open lead-detail drawer, open Create-Request drawer, client-side paging.
**Final gated actions**: Create-Request Submit · Add-Notes Save · Change-Status Update · Convert · Assign → `data-disabled-reason` gates.
**Forbidden**: fake conversion/assignment/CRM persistence, row/status-chip mutation, computed KPI arithmetic, money/price figure, backend/API.
**Coverage**: smoke (leads.html/.en load; list renders; 9-status filter narrows; detail drawer forms show controls; Convert/Assign/Save are gates; no fake conversion; no status flip; no money figure). a11y (open Create-Request row). screenshots (list+filters+detail+Create AR/EN/dark/mobile).
