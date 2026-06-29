# Contract: Sessions Page

**Status**: Binding · `public/sessions.html` (+ `.en`). The operational heart — the dashboard's sessions module expanded into a full page. Active nav: `sessions`.

1. **Purpose**: Let the admin scan, filter, and inspect today's/this period's sessions with a premium, readable, fixture-driven operations view.
2. **Layout** (RTL, top→bottom): page header (title "الجلسات" + breadcrumb + subtitle + primary "+ جلسة جديدة") → **quick status summary tiles** (cancelled/upcoming/live/completed counts, reusing `status-tile`) → **integrated filter/action bar** (search + subject + trainer + date + time + apply/reset, with active-filter chips) → **modern sessions table** (time+duration, session+level, trainer avatar+name, room, students, status chip, kebab row-actions) + pagination + "showing X of N" → empty/loading/error demo region.
3. **Reused (Spec 001)**: `table`, `status-chip`/`status-map`, `status-tile`, `ui` (button/avatar/medallion), `states`, `drawer`, `dropdown`, `toast`, page shell.
4. **New**: `page-header`, `filter-bar` (generalized toolbar), `preview-drawer` (session details), optional `data-table` generalization.
5. **Fixture**: extended `sessions.js` — ≥10 rows with facets (`data-status`,`data-subject`,`data-trainer`,`data-search`) + `details` (date, notes, attendees, materials) + `total`/`pageSize`/`lastUpdatedKey`.
6. **States**: empty ("no sessions match / no sessions yet" + CTA), loading skeleton, error + retry — warm microcopy.
7. **Demo interactions**: filters show/hide rows + chips + result count (client-side); row "view details" → **preview drawer**; "+ new session" and "edit" → demo toast (clearly labeled) ; pagination buttons → demo/active feedback.
8. **Disabled-with-reason**: real create/edit/cancel **persistence** is not implemented — those actions are demo-with-toast or disabled with a visible reason; **no real lifecycle**.
9. **Screenshots**: Sessions AR-RTL light, AR-RTL dark, EN-LTR light (desktop) + mobile (this is a candidate "most complex table page").
10. **Django mapping**: `templates/admin/sessions.html`; rows → `{% for s in sessions %}` with `data-*` facets; filter bar → server/template filter later; drawer content → an include or partial fed by context.
