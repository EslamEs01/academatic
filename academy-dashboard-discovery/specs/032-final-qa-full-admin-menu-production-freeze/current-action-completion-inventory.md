# Current Action Completion Inventory — Spec 032

Every visible action class across the built app, classified. The ONLY unresolved class is the **too-early-backend-gate** (create/edit — see `create-edit-forms-completion-inventory.md`). Everything else is already honest.

| Action class | Mechanism | Count / examples | Verdict |
|---|---|---|---|
| **real-page-link** | `<a href="X.html">` | nav anchors + list→detail drill-downs (family/student/course/group/teacher) + settings→staff deep-link | honest — link-integrity green (`run.cjs:1145-1163`, deadHash/badTarget=0) |
| **real-static-tab** | `data-tab` + `[data-tabpanel]` | finance(3) · library(2) · certificates(2) · settings(6) · student/family/teacher internals · schedule | honest — tabs render+switch (smoke) |
| **real-static-filter** | `data-filter*` | sessions/students/teachers/courses/groups/reports/staff/library filter bars | honest |
| **complete-picker (drawer)** | `data-drawer`+`<template data-preview>` | 14 candidate-list drawers (enroll/assign/move/availability/category/RBAC) | honest — real list before gate |
| **complete-form-wizard** | `wizard()`+`field()` | add-family (5 steps) | honest — real fields before gate |
| **complete-confirm-gate** | `data-confirm` via `openConfirm()` | Delete/Deactivate/Suspend/Stop/Activate/Approve/Reject (~20) | honest — no form needed; no mutation (`run.cjs:990-1005`) |
| **honest-gate** | `data-disabled-reason` | Upload/Download/Generate/Export/Import/Reconcile/Print/Reset/Login-as/Connect/Test/Save-settings | honest — no form possible w/o backend |
| **planned nav gate** | `data-coming-soon` | messages/leads/tasks/announcements/timeConverter/scheduleSearch (FB) + studentResult/Evaluation/sessionsKpi/monthlyPerf/monthlyReports/dataAnalysis (PLAN-029) | honest — non-navigating button + owner |
| **disabled-with-reason nav** | `disabled`+`reasonKey` | 7 finance wallet items (`nav.reason.finance`) | honest — locked+lock-icon (`run.cjs:1147-1151`) |
| **⚠ too-early-backend-gate** | `data-modal-trigger`→field-less `openModal` | **40 create/edit/duplicate actions** | **UNRESOLVED — Spec 032 fix** (add fields, Save=gate) |

## Forbidden classes — none present
`href="#"`=0 · raw-keys(`⟦`)=0 · dead-buttons=0 · fake-success wording=0 (`FAKE` guard `run.cjs:148`) · no action adds a row / flips a status / writes entity storage (localStorage is UI-state only: rail/nav-category/schedule-view/lang/theme). The only gap is honesty *timing* (create/edit gate fires before showing a form), not a dead/fake control.

## Resolution
The 40 too-early gates → form-bearing surfaces (per `create-edit-forms-completion-inventory.md`); all other classes stay byte-identical. After the fix, every action is a real-link/tab/filter/picker/wizard/form/confirm/honest-gate — 0 unresolved.
