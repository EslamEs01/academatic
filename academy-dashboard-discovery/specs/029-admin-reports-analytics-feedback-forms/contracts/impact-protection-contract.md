# Contract — Impact Protection

**Guarantee**: only intended files change.
**Changed (intended)**: reports.html/.en, attendance.html/.en, sessions.html/.en, student.html/.en (+ shared-asset hashes from locale/CSS/JS build).
**Byte-identical**: 16 teacher-portal files, teacher-performance, teacher/teachers/course/group/family, all other 027/028 pages, all family/student portal pages, admin-ops (sessions-analysis/public-holiday/scheduled-actions), finance, index.
**0-diff**: `package.json`, `nav.config.js`, finance source/fixtures/components/locales, no new dependency/engine/hook/storage key.
**Verify**: `git diff --stat` matches the changed set exactly.
**Fail if**: any unexpected file changes; package.json/nav.config/finance change.
