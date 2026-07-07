# Contract — Modal / Drawer / Picker (closed hook set)

**MUST**: reuse ONLY the Spec-026 `data-*` set — `data-modal-trigger`+`data-modal-title-key`+`data-modal-note-key`, `data-confirm[-danger]`, `data-drawer` (baked `<template>`), `data-disabled-reason`, `data-tab`, `data-filter`/`data-filter-set`. **No new dispatch hook, no new storage key, no new engine.**

**Acceptance**
- Edit/create modals = `data-modal-trigger` (title + backendRequired note).
- Pickers = `data-drawer` display-only candidate list + backendRequired final gate.
- The students row kebab reuses the EXISTING `data-row-menu` hook via a `studentMenu` variant + one `'student'` dispatch branch (mirrors `familyMenu`) — NOT a new hook.
- If a picker needs richer UI, it stays a display-only list inside `openModal`/`openSheet`; a new hook is a last resort justified in `research.md`.
- **Fail/STOP** on any new `data-*` dispatch hook or storage key introduced without justification.
