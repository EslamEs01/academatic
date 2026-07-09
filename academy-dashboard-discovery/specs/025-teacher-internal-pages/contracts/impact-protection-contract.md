# Contract: Impact Protection

**Purpose**: protect everything Spec 025 must not disturb.

## Byte-identical / unchanged (MUST hold)
- The 40 admin pages + `index.html` — byte-identical.
- All 18 family pages + all 14 student pages — byte-identical (no cross-role drift; teacher work touches only teacher surfaces + shared assets).
- `teacher-portal(.en).html` — changes ONLY from the nav flip (7 planned→implemented) + the performance anchor repoint.
- `teacher.html` / `teachers.html` / `teacher-performance.html` (ADMIN surfaces) — unchanged.
- `enhance.js` / `topbar.js` / `portal-shell.js` — unchanged (portal-shell already renders implemented nav items; no shell change needed).
- `package.json` — untouched; no external dependency; no new hook/storage key.

## Shared-asset rebake (expected)
- `public/assets/*` (locales/CSS/js bundle) rebake when locales/CSS change — content-equivalent to the new keys/rules only.

## Acceptance
- A sampled admin page + a family page + a student page byte-identical pre/post; teacher-portal diff limited to nav+anchor; no forbidden file changed.

**Stop**: any protected surface changes unexpectedly, or a cross-role page-body drifts → STOP.
