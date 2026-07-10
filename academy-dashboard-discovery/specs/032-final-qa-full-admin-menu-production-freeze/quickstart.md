# Quickstart — Spec 032 (build & verify recipe)

For the implementation phase. **No commit/push in specify/plan.**

## Build & test
```bash
cd academy-dashboard-discovery/app
npm run build            # expect: 102 static pages → public/ (+ index) = 103 (HELD)
npm test                 # smoke + a11y
npm run test:smoke       # PASS — 102 loads; +form-completion assertion
npm run test:a11y        # critical=0 serious=0 (+ open-form/mobile/dark rows)
node tests/screenshots/capture.cjs   # 0 console errors; +open-form frames
```

## Expected green state (after implementation)
- **Build**: 103 (HELD — 0 new pages); icons 0 missing; chip-tone guard green.
- **Smoke PASS** with an additive **form-completion** block:
  - For every create/edit trigger (the 40 FC surfaces), the opened drawer template body contains **≥1 `input`/`select`/`textarea`** and exactly one `data-disabled-reason` Save final → **0 field-less create/edit modal**.
  - MUST-OMIT: 0 `type="password"`, 0 salary/pay/hour-rate/fine/amount/computed-Total token, 0 credential-named input across all form bodies.
  - MUST-GATE: 0 real `type="file"`, 0 `<canvas>`, 0 `.pdf`/`blob:`/`createObjectURL`/`window.open`/`download=`; certificate/library/teacher/settings uploads + PDF are `data-disabled-reason` gates.
  - The 14 pickers still render a list + honest final; the 3 hybrid category drawers now have a Create form.
  - No fake-success wording; no row/chip mutation after any Save/confirm (no-mutation snapshot).
  - Menu coverage 50/0-unclassified; route coverage 103/0-orphan; `href="#"`=0, raw-keys=0, dead-buttons=0.
  - **Byte-verbatim**: `payHit`/`tchPay`/`famPay`/`payFigure`/child-view/finance-`forbidden`/no-mutation/`FAKE` + all 026–031 asserts.
- **A11y**: critical=0 serious=0 incl. open-form interaction rows + mobile 390 + dark-per-family + missing-EN rows.
- **Screenshots**: 0 console errors; +one open-form frame per rebuilt surface + mobile/dark; `REVIEW.md` updated.
- **Locale**: 11 pairs 0-divergence (new field keys mirrored); 0 raw keys.

## Impact expectations
- **Changed**: the create/edit form pages/components (families/students/courses/groups/teachers/reports/finance/staff/library/certificates/settings + sessions + the shared action components) + `enhance.js` kebab menu markup (data-modal-trigger→data-drawer, NO new hook, NO openModal change) + `preview-drawer.js` (+formDrawer helper) + fixtures/locales + tests/docs.
- **0-diff**: `package.json`; `build-html.mjs` PAGES (no new page); `nav.config.js` route rules (optional stale-map cleanup only); no new dependency/engine/hook/storage key.
- **Byte-identical bodies** (where not a create/edit host): teacher-portal ×16, all portal pages, index, and every `#page-body` region not carrying a rebuilt form.

## Stop conditions (any ⇒ STOP and report)
count ≠ 103 (unjustified) · any new engine/hook/dependency/storage-key · a MUST-OMIT field rendered · a MUST-GATE affordance made working · any `type=file`/`type=password` · any `.pdf`/`blob:`/`window.open`/`download`/`<canvas>` · any pay/salary/credential field or computed Total · any field-less create/edit modal remaining · any weakened role-law/no-fake/026-031 assert · any fake success/persistence/mutation · `package.json` change · backend/API/auth.

## Definition of done (implementation phase)
All 40 FC surfaces render real grounded fields before a backendRequired Save; MUST-OMIT/MUST-GATE clean; 14 pickers + 3 hybrid drawers complete; role-law + no-fake + 026-031 byte-verbatim; menu/route coverage green; a11y 0/0 (+open-form/mobile); screenshots 0 errors; locale 0-divergence; count 103; docs + `production-freeze-checklist.md` green; **no commit/push** (watcher commits).
