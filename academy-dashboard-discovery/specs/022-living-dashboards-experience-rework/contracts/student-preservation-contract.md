# Contract — Student Preservation (DEC-003)
ZERO deletion: all 14 built student files remain in PAGES and on disk; all 7 modules remain;
STUDENT_PAGES fixtures and prt.stu.* keys byte-verbatim; ROLE_NAV.student 7 implemented entries
structurally untouched (smoke navList===7 KEPT). The six internal bodies byte-equal (extraction
proof). Any file deletion, registry flip, or body drift = STOP condition.

---

## Spec 024 — declared extraction-hash supersession (B-01, F-00-1 correction)

Spec 024 reframes the child-view note `noteT`/`noteD` (`prt.stu.noteT`/`noteD`) from the leftover
pre-021 «لوحة الطالب — النسخة الأولى» / "Student dashboard — first version" to child-view /
family-owned wording («عرض الابن — النسخة الأولى» / "Child view — part of the family account"),
closing role-model finding F-00-1. This note sits inside the child-view `#page-body`, so the change
**intentionally supersedes** the 022 documented extraction-hash baseline for the affected pages:
**student-portal (home) + the 5 internals that carried the note — homework, materials, progress,
history, profile — × 2 languages** (10 of the 12 recorded internal-body hashes; **student-schedule**
× 2 carries no such note and stays byte-equal). This is a DECLARED baseline change (the family-child
hash-supersession precedent), not body drift: no file deleted, no registry flip, `ROLE_NAV.student`
still 7 implemented (navList===7 KEPT), and the six internals remain display-only. The Spec 024 smoke
adds a positive guard: child-view `#page-body` must NOT match `/لوحة الطالب|بوابة الطالب|student dashboard/i`.

(Recorded by Spec 024 — `specs/024-corrections-from-legacy-coverage-audit/correction-status.md`.)
