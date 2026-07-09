# Contract: Teacher-Portal Pay-Free

**Purpose**: 031 must not weaken the teacher pay-free law.

**MUST**:
- The 16 teacher-portal HTML + `teacher-performance.html`/`.en` stay **byte-identical** (031 touches admin surfaces only).
- No 031 surface links to a teacher salary/pay page; no teacher pay page created.
- Smoke `payHit` (`run.cjs:1410`) and `tchPay` (`:1330`) stay **byte-verbatim**.
- Any staff/salary concept lives only as the admin staff directory (which omits salary) — never in the teacher portal.

**Verify**: git — teacher-portal + teacher-performance byte-identical; smoke diff shows `payHit`/`tchPay` unchanged.

**Status**: Binding.
