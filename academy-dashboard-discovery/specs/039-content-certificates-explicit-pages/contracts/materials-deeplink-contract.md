# Contract — Materials Deep-Link (Spec 039)

## Change
`materials`: `planned` → `implemented`, `route:'library.html#view=materials'`; drop `FUTURE_ROUTES.materials`.

## Target surface (existing, 0-diff — `pages/library.js` Materials tab)
Subject catalog: `SUBJECTS` (6) bilingual name/nameAr; `mat-add`/`mat-edit` form drawers; delete = `data-confirm`;
every final Save/Delete = `backendRequired`/confirm gate. No `type=file`, no `<canvas>`. "Course" label is NOT
reintroduced — the entity stays a Material/Subject.

## Behavior
- `library.html#view=materials` opens the Materials tab on fresh load (enhance.js `initTabs()`); `data-tabpanel="materials"` visible, `data-tabpanel="books"` hidden.
- EN: `library.en.html#view=materials` (langRoute hash-aware).

## MUST NOT
- No standalone `materials.html`; no body/fixture/locale change; no fake persistence; no `type=file`.

## Acceptance
Anchor href = `library.html#view=materials` (AR) / `library.en.html#view=materials` (EN), implemented, no «قريبًا»/
aria-disabled/lock; fresh-load shows exactly the Materials panel; Add/Edit reachable and gated.
