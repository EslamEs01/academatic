# Contract — Create / Edit Modal

**MUST**: Create/Add/New and Edit primaries open a modal/drawer (or real page) showing the relevant fields; the **final** Save/Create/Submit is a `backendRequired` gate. Reuse `data-modal-trigger`/`openModal()` (baked `<template>`) or `data-drawer`/`openSheet()`. No new hook.

**Acceptance**
- Clicking a Create/Edit primary opens a modal/drawer (not a toast).
- The modal's final action is `backendRequired` (labeled note + disabled-with-reason Save) — never persists, never "saved".
- Field scaffolds are display-only (no validation/persistence).
- Where a field modal is disproportionate, the primary aligns to the finance Create-invoice `data-disabled-reason` gate (still honest).
- **Fail** if a Create/Edit primary toasts «preview action» or fakes a create/save.
