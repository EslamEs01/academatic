# Contract: Courses Page

**Status**: Binding · `public/courses.html` (+ `.en`). A calm, structured overview of courses — no course builder, no CRUD. Active nav: `courses`.

1. **Purpose**: Show the academy's education content (courses with subject/level/status/counts) in a structured, uncluttered way.
2. **Layout** (RTL): page header (title "الدورات" + breadcrumb + subtitle + optional "+ course" demo) → optional summary tiles (total courses / active / levels) → **filter bar** (search + subject + level + status) → a **card grid** of course cards (icon medallion, title, subject+level, status chip, counts: enrolled / sessions) — or a clean table if it reads better; each card opens a **level preview** drawer/modal or navigates in-scope; nothing dead.
3. **Reused**: `ui` (medallion/badge/button), `status-chip`, `card-grid`, `states`, `drawer`/modal, `toast`.
4. **New**: `page-header`, `filter-bar`, `card-grid` (shared), course card variant, `preview-drawer` (levels).
5. **Fixture**: `courses.js` — ≥6 courses with subject/level/status/counts + optional `levels[]` for preview + facets.
6. **States**: empty / no-results / loading / error.
7. **Demo interactions**: search/filter over pre-rendered cards; card → **level preview** (drawer/modal); add → demo toast.
8. **Disabled-with-reason**: edit/build/real CRUD disabled-with-reason or demo. **No course builder.**
9. **Screenshots**: Courses AR-RTL light desktop.
10. **Django mapping**: `templates/admin/courses.html`; `{% for course %}`; levels preview → partial/loop.
