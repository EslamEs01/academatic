# Contract: Page Count

**Purpose**: Hold the count; forms are folded, not new pages.

**MUST**:
- Baseline **103**; **target 103** (0 new pages).
- All 40 create/edit forms are `formDrawer` surfaces baked into existing pages (`<template data-preview>`).
- `build-html.mjs` PAGES **0-diff**; `nav.config.js` route rules 0-diff (optional: delete the 2 stale `FUTURE_ROUTES` doc-entries — no page effect).
- A standalone create/edit page is allowed ONLY if a drawer is dishonest/cramped AND legacy IA required a page AND the AR/EN delta is build-verified + covered — **none identified; default = 0 new pages**.

**Verify**: `find public -maxdepth 1 -name '*.html' | wc -l` = 103; `git diff --stat build-html.mjs` = 0.

**Status**: decided (103). Binding.
