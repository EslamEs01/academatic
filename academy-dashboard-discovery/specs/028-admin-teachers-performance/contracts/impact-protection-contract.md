# Contract — Impact Protection (Spec 028)
**MUST**: only the touched teacher/course/group management surfaces + shared additive assets change. All portal pages (16 teacher-* byte-identical), the Spec-026 admin-ops pages (sessions-analysis/public-holiday/scheduled-actions), the 9 Spec-027 management pages, and index stay byte-identical. `package.json` unchanged; no backend/dependency/engine/new-hook/new-page.
**Acceptance**
- `git diff --stat HEAD -- package.json` = 0.
- Changed `public/*.html` = only teachers/teacher/teacher-performance/course/group (×2 lang); portal + admin-ops + 027-pages + index byte-identical.
- Count stays 97 (no new page); `schedule.html` unchanged (fold uses the existing teacher-lens).
- No new `data-*` dispatch hook or storage key (the teacherMenu reuses the row-menu hook).
- **STOP** on a package.json change, new dependency/engine/page, an unexpected byte-diff, or any teacher-portal file change.
