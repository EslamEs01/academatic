# Contract: Directory Pages (Students & Teachers)

**Status**: Binding · `public/students.html` and `public/teachers.html` (+ `.en`). Admin directories — **not** the student/teacher dashboards or portals (those are out of scope). Active nav: `students` / `teachers`.

## Students

1. **Purpose**: Easy-to-scan admin directory of students with search/filter/sort and a quick profile preview.
2. **Layout** (RTL): page header (title "الطلاب" + breadcrumb + subtitle + optional "+ student" demo) → optional summary tiles (total / active / trial) → **filter bar** (search + status + subject + sort) → a responsive **directory table** (avatar+name, status chip, level/grade, **progress** indicator, enrolled count, kebab → preview). Stacks to cards on mobile.
3. **Reused**: `table`, `status-chip`, `ui` (avatar/medallion), `sparkline`/progress, `states`, `drawer`, `toast`.
4. **New**: `page-header`, `filter-bar`, `preview-drawer` (student profile), `data-table` (shared with Sessions).
5. **Fixture**: `students.js` — ≥10 students with facets + `details` (contact placeholder, enrolled course titles, joined date, guardian).
6. **States**: empty / no-results / loading / error.
7. **Demo interactions**: search/filter/sort over pre-rendered rows; row → **profile preview drawer**; add/export → demo toast.
8. **Disabled-with-reason**: edit/delete/real export disabled-with-reason or demo.
9. **Screenshots**: Students AR-RTL light desktop (+ candidate mobile/tablet).
10. **Django mapping**: `templates/admin/students.html`; `{% for student %}`; preview → partial.

## Teachers

1. **Purpose**: Admin directory of teachers showing availability/status and a performance-like fixture summary, with a profile preview.
2. **Layout** (RTL): page header (title "المعلمون" + breadcrumb + subtitle) → summary tiles (total / available now / avg utilization) → **filter bar** (search + availability + subject) → a **card grid** of **directory cards** (avatar, name, subject tags, availability/status chip, performance summary via hand-rolled ring/sparkline: utilization %, sessions, rating; "view profile"). Single-column on mobile.
3. **Reused**: `ui` (avatar/medallion/badge), `status-chip`, `status-tile`, `sparkline`/`ring`, `states`, `drawer`, `toast`.
4. **New**: `page-header`, `filter-bar`, `card-grid`, `directory-card`, `preview-drawer` (teacher profile).
5. **Fixture**: `teachers.js` — ≥8 teachers with availability, performance, subjects + `details` (bio, availability, contact placeholder) + facets.
6. **States**: empty / no-results / loading / error.
7. **Demo interactions**: search/filter over pre-rendered cards; card / "view profile" → **profile preview drawer**; message/assign → demo toast.
8. **Disabled-with-reason**: edit/assign/real actions disabled-with-reason or demo.
9. **Screenshots**: Teachers AR-RTL light desktop.
10. **Django mapping**: `templates/admin/teachers.html`; `{% for teacher %}`; card + preview → partials.

**Decision recorded** (research R4): Students = table, Teachers = card grid — match layout to data shape; both demonstrate the shared directory + preview-drawer patterns.
