# Contract: Targeted Visual Grounding — Spec 034

**Binding.** Every page's fields/sections/actions must trace to inspected legacy evidence + current patterns, not memory.

- Legacy evidence deep-read (done): `output/roles/admin/pages/management-{chat,new-requests,new-requests-create,tickets,public-advertisement,settings-notification,time-convertor}.md` + `output/combined/{form,table,button-coverage,modal,interaction}-inventory.md` rows for each.
- Current patterns inspected (done): `pages/sessions-analysis.js` (display board), `components/{filter-bar,tabs,card-grid,page-header,preview-drawer,form-field,table,states}.js`, `enhance.js` (initTabs/initWizard IIFE precedent), `scripts/build-html.mjs` (PAGES), `i18n.js` (deepMerge).
- Prior specs: `specs/033-…/*`, `specs/034-…/*` (specify artifacts).
- **Verify**: each field in `data-model.md` maps to a legacy citation OR a recorded authored substitution (tasks board/create, chat composer = documented gaps). No invented capability.
- **Grounding verdict**: PROCEED (recorded in `plan.md` note).
