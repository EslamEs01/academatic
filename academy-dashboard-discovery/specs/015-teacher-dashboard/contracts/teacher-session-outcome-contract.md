# Contract: Teacher Session-Outcome Workflow (Spec 015)

**Status**: Binding · References FR-006, US4; research D5; delivers T22 deepened (the T3 `classes-end` capability preview); the real flow stays planned-015→backend per coverage.

## 1. The 5-step display-only preview (capture-verified field order)

The workflow section renders the flowStep card pattern (accent-ink numbered), exactly:
1. **الحضور** (attendance result — present/absent)
2. **التقييم** (class remark — the quick impression)
3. **الملخص** (class summary — one line on what was covered)
4. **ملاحظة الواجب** (homework note — what the family should see)
5. **الملفات** (files/material note — attachments concept)

Each step: number + title + one-line description, display-only. This mirrors the legacy `classes-end` fields (remark/summary/homework/notes/files) as capability knowledge — never as a form.

## 2. The write boundary

The section closes with the `.pt-planned` mini-card **`outcomeSave`** classed **backendRequired** («حفظ نتيجة الجلسة» — recording session results requires the real backend). Mark-absent (T4) and cancel/reschedule (T5) stay within this gate's honest framing — no separate fake affordances.

## 3. MUST NOT

No `<form>`/`<input>`/`<select>`/`<textarea>`/radio/checkbox; no submit/save button; no attendance toggle; no rating-scale visual on the remark step; no file-picker; no modal.

## Acceptance (binding)

1. **Given** the section, **Then** exactly 5 ordered steps render display-only + the backendRequired save gate; zero form controls.
2. **Given** the coverage artifact, **Then** T22 carries the delivered-015 note (deepened to the 5-field shape) and T3/T4/T5 stay classified with their real-write deferral.
