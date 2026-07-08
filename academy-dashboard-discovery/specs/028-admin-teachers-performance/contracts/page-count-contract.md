# Contract — Page Count (Spec 028)
**MUST**: count stays **97 — zero new pages**. Every delta is a modal/drawer/picker/kebab/confirm/tab/gate on an existing page; `all-teachers-timetable` **folds into the existing `schedule.html` teacher-lens** (already present). `teacherCategories` nav stays planned (no page).
**Acceptance**
- `find public -maxdepth 1 -name '*.html' | wc -l` = 97 after build.
- Smoke count assert stays 97.
- No new `public/*.html`; `schedule.js` unchanged (or a plan-justified deep-link only).
- **STOP** if a new page appears, `schedule.html` gains a duplicate timetable page, or count ≠ 97.
