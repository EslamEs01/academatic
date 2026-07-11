# Materials Scope — Spec 039

**Primary target.** Nav id `materials` (AR «المواد التعليمية»). Currently `status:'planned'` («قريبًا»),
`FUTURE_ROUTES.materials='library.html'`.

## Current surface (already built — Spec 031)
`library.html` → `tabs({ group:'library', … })` with a **Materials tab** (`adm.lib.tab.materials`,
`materialsPanel()`): a **subject catalog** — bilingual name (`adm.lib.matName`) + Arabic name
(`adm.lib.matNameAr`), authored `SUBJECTS` rows, row Edit/Delete, `mat-add`/`mat-edit` create/edit drawers with
the final Save as a `backendRequired` gate. The ambiguous legacy "Course" naming is already corrected.

Deep-link `library.html#view=materials` is already valid (enhance.js `initTabs()` honours `#view=`).

## Gap
Purely navigational: the `materials` sidebar item shows «قريبًا», so the built, reachable Materials surface is
invisible/unreachable from the sidebar — misleading (the surface exists). No functional gap.

## Decision — DEEP-LINK (Option B)
Flip `materials` `planned → implemented`, `route:'library.html#view=materials'`; remove «قريبًا»; drop the
`FUTURE_ROUTES.materials` entry (promoted, mirroring Specs 035/037). **0 new pages, count 115, admin-menu 50.**
Matches the Spec 033 roadmap (039 = deep-link, count impact 0).

## Product capabilities (confirm-as-present; no rebuild)
- Material = **Material/Subject** with bilingual name (Name + name_ar) — NOT a "Course".
- List of subjects; create + edit forms present; safe **Delete = confirm** (no mutation).
- Empty / populated / (no filter on the Materials tab — honors the single-global `[data-no-results]` rule; the
  Books tab owns the one filterBar).
- Course/enrollment dependency: a subject may map to courses — display-only context only; no computed counts.

## No-fake / role law
Final Save/Create/Edit/Delete = `backendRequired`/confirm gates; **no `type=file`**, no fake persistence/delete,
no computed metric. Admin-manage only; teacher/family library stays read-only and untouched.

## Test contract (see count-and-route-contract.md)
Assert: `materials` nav item is a real anchor to `library.html#view=materials` (not «قريبًا»/aria-disabled/lock),
AR + EN; fresh-load opens the Materials tab; `mat-add`/`mat-edit` reachable + gated; no `type=file`.
