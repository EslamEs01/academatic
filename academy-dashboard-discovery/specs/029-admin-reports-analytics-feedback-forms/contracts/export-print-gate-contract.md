# Contract — Export / Print Gate

**Guarantee**: every Export/Print/PDF/CSV/Excel/Share/Schedule/Generate = honest gate; no file; no silent no-op.
- reports Print → disabled-with-reason (R-G).
- Existing native disabled-with-reason gates (sessions-analysis, course/group/student/teacher print, result export) KEPT (already honest; `button({disabled,reasonKey})` renders disabled+aria-disabled+title).
- teacher-performance stays export-free/display-only (optional gate deferred, R-M).
**Verify (smoke)**: no export/print produces a file; each control shows a reason; no `data-demo-action` on an export/write.
**Fail if**: a fake file/download/print appears; an export control silently no-ops.
