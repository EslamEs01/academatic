# Contract: tasks.html — Spec 034

**Sections**: KPI strip (Total/Completed/Pending/In-progress/Overdue — authored) · display-only board (status columns of task cards) · per-staff summary table (Name/Total/Pending/Overdue/Completed/Average — authored; "Average" = literal) · filters · Create/Edit-task form drawer · Add-Section.
**Allowed (read/UI)**: filter, open Create/Edit-task drawer, view static cards/columns.
**Final gated actions**: Create/Edit Save · Assign · Move (status) · Add-Section → gates. **No working drag** (board is display-only).
**Forbidden**: fake task persistence, drag-to-move/status mutation, fake assignment, computed "Average", backend/API.
**Coverage**: smoke (tasks.html/.en load; board renders; create form shows controls; move/status/assign gated; no fake persistence; no drag mutation; no computed metric). a11y (open Create-task row). screenshots (board + per-staff table + create drawer AR/EN/dark/mobile).
