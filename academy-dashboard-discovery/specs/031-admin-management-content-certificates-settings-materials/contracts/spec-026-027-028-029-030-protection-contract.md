# Contract: Spec 026/027/028/029/030 Protection

**Purpose**: 031 must not regress prior admin work.

**MUST** stay working and byte-identical (031 modifies only settings.js + adds 3 pages + shared nav/enhance/i18n/locale/css):
- **026**: admin-ops (sessions-analysis/public-holiday/scheduled-actions) + global action-completion asserts.
- **027**: the 9 management pages (families/family/students/student/courses/course/groups/group/add-family).
- **028**: teachers/teacher/teacher-performance + all-teachers-timetable folded in schedule.html.
- **029**: reports (feedback/forms folded) + admin-menu coverage gate.
- **030**: finance hub (finance.html) + no-fake-money asserts (invariant, byte-identical).
- Their smoke asserts stay **byte-verbatim**; the admin-menu coverage gate stays green.

**Verify**: git — those pages byte-identical; smoke diff additive only (031 block + nav flips); prior asserts unchanged.

**Status**: Binding.
