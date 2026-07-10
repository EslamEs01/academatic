# Contract: Modal / Drawer Strategy

**Purpose**: Fix the 40 gates with zero new hook/engine.

**MUST (Option B default)**:
- Field-less `data-modal-trigger` create/edit gates → `data-drawer="X"` triggers (`modalBtn`→`drawerBtn`).
- Bake a `<template data-preview="X">` per form via a new additive `formDrawer(id,{titleKey,headIcon,fields,ctaKey,reasonKey})` helper in `preview-drawer.js` that wraps `previewTemplate` (fields in `.wiz-grid`, final `data-disabled-reason` gate). **~8 additive lines reusing previewTemplate — no new hook/storage/engine.**
- Reuse the EXISTING `data-drawer`→`openSheet`→`template[data-preview]` clone path (`enhance.js:336-381`) verbatim; the `openPanel` focus-trap already covers `input`/`select`.
- Kebab menus (`enhance.js:107-157`): swap the menu item `data-modal-trigger`→`data-drawer="X"`; the form template is baked on every host page (list + detail).
- Bake each form template on **every page where its trigger appears** (a shared per-entity builder called from list + detail render).

**Option A (fallback, only if a centered modal is genuinely required)**: generalize `openModal` to clone a baked `<template data-modal-form="X">` — additive ~5 lines, routed by the EXISTING `data-modal-trigger` hook (no new dispatch hook/storage key). **None identified → not used by default.**

**MUST NOT**: add a new dispatch hook, a new storage key, a new engine, or change the openModal contract under Option B.

**Verify**: `git diff enhance.js` shows only kebab `data-drawer` swaps (no new hook); `preview-drawer.js` = +formDrawer only; no new component file required.

**Status**: Binding (Option B).
