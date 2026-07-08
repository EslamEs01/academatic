# Contract — Spec 026/027/028/029 Protection

**Guarantee**: prior-spec surfaces stay green/byte-identical except the intended finance delta.
- Spec 026 admin-ops, Spec 027 management pages, Spec 028 teacher pages, Spec 029 reports feedback/forms fold — all byte-identical.
- feedback/forms remain folded into reports.html; teacher-performance display-only; all-teachers-timetable folded in schedule.html; admin menu coverage complete.
- Only `finance.html`/`.en` change (+ shared-asset hashes).
- All 026/027/028/029 smoke asserts byte-verbatim.
**Verify**: `git diff --stat` shows only finance HTML changed; prior-spec asserts unchanged/green.
**Fail if**: an unintended prior-spec page changes; a protected assert is weakened.
