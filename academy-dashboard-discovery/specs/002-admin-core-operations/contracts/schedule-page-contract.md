# Contract: Schedule Page

**Status**: Binding · `public/schedule.html` (+ `.en`). A calm weekly overview — **no calendar library**. Active nav: `schedule`.

1. **Purpose**: Give the admin a comfortable, scannable overview of upcoming activity for the week, grouped by day.
2. **Layout** (RTL): page header (title "الجدول الزمني" + breadcrumb + a compact week/day strip) → **filter bar** (subject/trainer/status/date) → a **day-grouped list**: per day a header (weekday + date + session count) followed by **session blocks** (time range, title+level, trainer avatar+name, room, status chip). Single calm column; reflows to one-day/stacked on mobile.
3. **Reused (Spec 001)**: `status-chip`/`status-map`, `ui` (avatar/medallion/button), `states`, `drawer`, `toast`, page shell.
4. **New**: `page-header`, `filter-bar`, `schedule-list` (day groups + blocks), `preview-drawer` (block details).
5. **Fixture**: `schedule.js` — a `ScheduleWeek` (ordered days, each with date + `blocks[]`), blocks carrying facets (`data-status`,`data-subject`,`data-trainer`).
6. **States**: empty ("no sessions scheduled / none match"), loading skeleton, error + retry.
7. **Demo interactions**: filters show/hide blocks (client-side) + chips; a block → **preview drawer**; week/day strip selection → demo highlight/feedback.
8. **Disabled-with-reason**: no real scheduling/drag-drop/create — any such control is disabled-with-reason or demo-with-toast.
9. **Screenshots**: Schedule AR-RTL light desktop + a **tablet** capture (candidate for the tablet shot).
10. **Django mapping**: `templates/admin/schedule.html`; `{% for day %}{% for block in day.blocks %}`; the day-grouped list is loop-friendly; no calendar widget to port.

**Decision recorded** (research R3): grouped-by-day list chosen over a 7-column week grid for RTL readability, responsiveness, calm density, and Django loop-friendliness.
