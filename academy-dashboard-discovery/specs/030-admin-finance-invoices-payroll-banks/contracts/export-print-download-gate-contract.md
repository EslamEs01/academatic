# Contract — Export / Print / Download Gate (F-J/F-L)

**Guarantee**: every finance Export/Print/PDF/CSV/Excel/Download = honest gate; no file; no silent no-op.
- Print reclassified `data-demo-action` → `disabled-with-reason` gate.
- Export/Download/PDF/CSV = disabled-with-reason/backendRequired gates.
**Verify (smoke)**: no `a[download]`/`.csv`/`.pdf`/`blob:`; no demo-action on export/print; each shows a reason.
**Fail if**: a fake file/download/print appears; an export silently no-ops.
