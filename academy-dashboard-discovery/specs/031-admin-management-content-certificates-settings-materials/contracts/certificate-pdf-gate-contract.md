# Contract: Certificate PDF Gate (highest fake-gen risk)

**Purpose**: No real certificate/PDF generation, no canvas, no drag designer.

**MUST**:
- Certificate designer = **static baked preview** (CSS-positioned label divs over a background-image div). NO `<canvas>`, NO `ui-draggable`/`.draggable()`/jQuery-UI, NO `json_data`, NO FPDF, NO background upload.
- Approve/Reject/Generate-PDF/Preview/Download/Send/Create-certificate/Upload-certificate = backendRequired/disabled-with-reason gates.
- No `.pdf` href, no `window.open`, no `blob:` — no file opened or produced.
- No WhatsApp/email send; no request-status mutation after Approve/Reject.
- No fake "Success!"/«تم».

**Verify**: smoke `noCanvas = !/<canvas|chart\.js|apexcharts|amcharts|data-chart/i`; `noDrag = !/ui-draggable|\.draggable\(|jquery-ui|json_data|FPDF|SetFont/i`; `noPdf`; no-mutation snapshot on Approve.

**Status**: Binding. Register #10; `certificate-and-file-scope.md`.
