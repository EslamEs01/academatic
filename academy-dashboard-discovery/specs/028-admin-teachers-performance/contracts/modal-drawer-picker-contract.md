# Contract — Modal / Drawer / Picker (Spec 028)
**MUST**: reuse ONLY the closed Spec-026 `data-*` set (+ Spec-027 precedents) — `data-modal-trigger`(+title/note), `data-confirm[-danger]`, `data-drawer`(baked `<template data-preview>`), `data-disabled-reason`(+`data-reason-key`), `data-tab`, `data-filter`, `data-row-menu`(+`-kind`). No new dispatch hook, storage key, or engine.
**Acceptance**
- Edit/create/category modals = `data-modal-trigger` (title + backendRequired note).
- Pickers = `data-drawer` display-only candidate list + `data-disabled-reason` backendRequired final.
- The teachers card kebab reuses the EXISTING `data-row-menu` hook via a `teacherMenu` variant + one `'teacher'` dispatch branch (mirrors `familyMenu`/`studentMenu`) — NOT a new hook.
- **Fail/STOP** on any new `data-*` dispatch hook or storage key.
