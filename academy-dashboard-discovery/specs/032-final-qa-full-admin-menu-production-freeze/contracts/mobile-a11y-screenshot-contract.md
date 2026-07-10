# Contract: Mobile / A11y / Screenshot

**Purpose**: Production-ready responsive + accessible + captured, including the new forms.

**A11y MUST** (critical=0 serious=0): keep the 138 rows green + add **open-form interaction rows** (axe against the open drawer DOM) for staff-add · fam-edit · trn-add · crs-add · grp-add · cert-tpl · bank-add · fb-create · mat-add + **mobile-390 rows** for key surfaces + **dark-per-family** + **missing-EN** rows. Open forms: focus-trap + labelled controls + `aria-modal` clean.

**Screenshots MUST** (0 console errors): one open-form frame per rebuilt surface (desktop AR + select EN + dark + mobile 390) + a picker-drawer proof; update `screenshots/REVIEW.md`.

**Mobile MUST**: 390px — every open form reflows (`.wiz-grid` `sm:grid-cols-2`→1-col, `app.css:647`), no horizontal overflow.

**RTL/LTR**: every form renders correctly AR-RTL + EN-LTR (label/control alignment).

**Verify**: `npm run test:a11y` 0/0 (+open-form/mobile rows); `node tests/screenshots/capture.cjs` 0 errors; REVIEW.md updated.

**Status**: Binding.
