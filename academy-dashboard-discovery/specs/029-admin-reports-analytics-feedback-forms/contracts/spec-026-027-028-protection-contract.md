# Contract — Spec 026/027/028 Protection

**Guarantee**: prior-spec surfaces stay green/byte-identical except intended 029 deltas.
- Spec 026 admin-ops (sessions-analysis/public-holiday/scheduled-actions) green; sessions-analysis unchanged (R-H keep).
- Spec 027 management pages (families/family/students/course/group/…) byte-identical except attendance/sessions/student intended deltas (R-E/R-F).
- Spec 028 teacher pages (teachers/teacher/teacher-performance) byte-identical.
- assign-teacher pickers honest; teacher-performance display-only; all-teachers-timetable stays folded in schedule.html.
- All 026/027/028 smoke asserts byte-verbatim except the sanctioned attendance/sessions/student re-pins for R-E/R-F.
**Verify**: `git diff --stat` shows only reports/attendance/sessions/student HTML changed.
**Fail if**: an unintended prior-spec page changes; a protected assert is weakened.
