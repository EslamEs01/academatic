# Contract: Certificates

**Purpose**: `certificates.html` = Templates(+static designer) + Requests tabs; no PDF/canvas/mutation.

**MUST**:
- **Templates tab**: template rows (name/thumb/usageCount literal) + Create/Edit modal + Delete gate + a **static designer preview** (CSS-positioned labels; no `<canvas>`, no drag, no upload).
- **Requests tab**: queue rows (student/course/teacher/desc/date/status) + Approve/Reject/Generate/Preview/Download/Send gates + Create/Upload-certificate gates.
- No `.pdf`/`blob:`/`window.open`; no send; no status mutation after Approve/Reject.
- `certificates`→implemented→`certificates.html`; `certificateRequests` folds (planned, Requests tab).

**Verify**: smoke — certificates loads AR/EN; Templates + Requests tabs render; static designer has no `<canvas>`/drag; Approve = gate; no-mutation snapshot; `noPdf`.

**Status**: Binding. `certificate-and-file-scope.md`; Register #10.
