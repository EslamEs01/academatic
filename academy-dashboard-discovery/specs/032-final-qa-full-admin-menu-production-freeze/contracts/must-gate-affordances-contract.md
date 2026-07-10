# Contract: MUST-GATE Affordances

**Purpose**: Upload/PDF/canvas/pairing stay gates — no working control, no form field.

**MUST be a `data-disabled-reason` gate (not a control)**:
- `type="file"` uploads: teacher `cv_file`/`cv_certificates`, certificate `background`, library `file`/`thumbnail`, settings `logo` → inline disabled-reason gate, **no `<input type="file">`**.
- Certificate template canvas/WYSIWYG designer → static preview only (Spec-031 pattern), **no `<canvas>`, no drag, no `json_data`/FPDF**.
- Certificate PDF preview/download/generate/send → gate, **no `.pdf`/`blob:`/`window.open`/`download=`**.
- WhatsApp phone-pairing wizard → gate (no live pairing).
- Record Payment (computed Total + money movement) → stays a full gate (no form).
- Export/Print/CSV/Excel/import/backup/restore/integration connect-test-configure → gates.

**Verify**: smoke `noFile` (DOM `input[type=file]`=0), `noCanvas` (0 `<canvas>`), `noPdf` (0 `.pdf`/`blob:`/`window.open`/`download=`) on all form bodies; the upload/PDF surfaces carry a `data-disabled-reason` gate.

**Status**: Binding.
