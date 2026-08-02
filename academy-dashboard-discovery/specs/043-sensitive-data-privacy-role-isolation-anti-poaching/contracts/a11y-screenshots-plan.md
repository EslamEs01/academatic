# Contract 11 — A11y & Screenshot Matrix (focused, changed surfaces only) — executable

Focused coverage for the 3 changed rendered surfaces — NOT an academy-wide redesign pass (043 preserves the
current visual language; broader design is 045–050). The new previews must be clean, readable, bilingual, and
consistent with their existing hosts.

## The changed surfaces to cover

1. **student-profile** — no password affordance (2 gate cards).
2. **staff** — the RBAC drawer (`data-drawer="st-perm"`) with the 5 parent-contact rows.
3. **teacher** — the capability/notification policy drawer (`data-drawer="trn-policy"`).

## a11y MATRIX rows to ADD (`tests/a11y/run.cjs`, the `MATRIX` array 8-344; R-2 gate `:393`)

Additive rows (format `{ page, lang, theme, hash?, viewport?, open?, keys? }`), covering:
- student-profile: AR/EN × light/dark (existing rows 168-169/314 stay; add the missing EN-dark / mobile-390 if
  layout shifts — the gate removal reduces content, minimal shift).
- staff: AR/EN × light/dark with `open:'st-perm'` (the RBAC drawer open state — currently the drawer open-state
  is under-covered, UK-44); mobile-390.
- teacher: AR/EN × light/dark with `open:'trn-policy'` (the new policy drawer open state); mobile-390.

Requirements: **critical=0, serious=0** (R-2 machine gate, never relaxed). Focus-trap/Esc/backdrop/scroll on the
opened drawers. Roving-tabindex not required (display-only rows). No missing-selector `.catch(()=>{})` — a
required selector (e.g. the open drawer) must FAIL loudly if absent.

## screenshot MATRIX rows to ADD (`tests/screenshots/capture.cjs`, the `MATRIX` array 18-445; R-3 gate `:555`)

Additive rows (format `{ page, lang, theme, vp, …variant }`):
- `student-profile` AR/EN light (+ dark) — the 2-gate state.
- `staff` AR/EN with the `st-perm` drawer open (the parent-contact rows) — light + dark.
- `teacher` AR/EN with the `trn-policy` drawer open — light + dark.
- mobile-390 where layout can change (staff/teacher drawers).

Requirement: **0 console errors** (R-3 machine gate, `capture.cjs:555`, never relaxed).

## REVIEW.md entry (`app/screenshots/REVIEW.md`)

Add a `## Spec 043 — Sensitive Data Privacy … (2026-…)` section identifying each changed surface + state
(student-profile 2-gate; staff RBAC parent-contact rows; teacher policy preview), the AR/EN/light/dark/mobile
frames, and the verdict. Follow the recent-spec prose format (Spec 034+ style). File path is
`app/screenshots/REVIEW.md` (NOT `tests/screenshots/`).

## Mandatory browser/screenshot loop

Every changed surface is rendered, captured, and the images OPENED and inspected (AR+EN, light+dark, mobile-390
where layout shifts, drawer open states). Source-reading is never visual acceptance.
