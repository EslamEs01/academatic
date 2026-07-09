# Contract: Student Child-View

**Purpose**: 031 must not weaken the student child-view law.

**MUST**:
- All student-portal HTML stay **byte-identical** (031 touches admin surfaces only).
- No student primary-role wording («لوحة الطالب»/«بوابة الطالب»/"student dashboard") introduced anywhere.
- No fake financial report in any student surface.
- Smoke child-view guard (`run.cjs:1288`) stays **byte-verbatim**.

**Verify**: git — student pages byte-identical; smoke diff shows the child-view assert unchanged.

**Status**: Binding.
