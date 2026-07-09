# Contract — Feedback Review (R-A/R-B)

**Guarantee**: honest display-only feedback review folded into reports.html.
- Rows: authored FEEDBACK (teacher/class/family/student) — subject, category chip, categorical remark pill, status chip, date. NO numeric score, NO percentage.
- Detail = read-only drawer (`previewTemplate`/`sheetRow`).
- Filter (type/status) = `data-filter`.
- Create/Edit feedback = `data-modal-trigger` backendRequired; Approve = `data-confirm`; Delete = `data-confirm-danger`; Assign-members = `data-disabled-reason`. Nothing persists; no DOM removal.
- Categories: Create/Edit modal + manage-categories drawer; nav item stays folded/planned.
**Verify (smoke)**: rows authored; drawer read-only; every write = honest final; NO computed %.
**Fail if**: a feedback write persists/removes a row; a computed % appears.
