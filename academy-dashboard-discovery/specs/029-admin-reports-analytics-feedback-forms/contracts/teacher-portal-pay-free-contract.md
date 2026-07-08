# Contract — Teacher Portal Pay-Free (GLOBAL)

**Guarantee**: the 16 `teacher-*` portal files stay byte-identical; teacher pay-free law holds.
- 029 touches no teacher-portal file.
- `teacher-performance.html` stays the sanctioned display-only admin board (no score/rank/chart/payroll); no pay figure added.
- Smoke `payHit`/`tchPay` regexes byte-verbatim; three-layer (source incl. comments · built · smoke #page-body) green.
**Verify**: `git diff --stat` teacher-portal files empty; payHit/tchPay unchanged and green.
**Fail if**: any teacher-portal file changes; any pay token appears in a teacher body.
