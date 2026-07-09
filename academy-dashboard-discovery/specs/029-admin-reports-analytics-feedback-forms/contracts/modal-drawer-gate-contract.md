# Contract — Modal / Drawer / Gate

**Guarantee**: reuse ONLY the closed `data-*` set; no new hook/storage key.
- Read-only detail = `data-drawer` + `<template data-preview>` (`previewTemplate`/`sheetRow`).
- Create/Edit = `data-modal-trigger` + `data-modal-title-key`/`data-modal-note-key="common.backendRequiredNote"`.
- Approve/Delete = `data-confirm[-danger]`.
- Assign/export = `data-disabled-reason` + `data-reason-key`.
- Optional feedback row kebab = a `'feedback'` branch on the EXISTING `data-row-menu` dispatch (mirror familyMenu) — only if needed.
**Verify**: no new hook name in enhance.js; no new storage key; drawers/modals/confirms open correctly.
**Fail if**: a new hook/storage key is introduced.
