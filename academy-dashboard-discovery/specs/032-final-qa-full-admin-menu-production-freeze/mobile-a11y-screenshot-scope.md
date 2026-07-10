# Mobile / A11y / Screenshot Scope — Spec 032 (final production-freeze pack)

## Current coverage (baseline)
- **a11y** (`tests/a11y/run.cjs`): **138 rows** `{page,lang,theme,hash?}`, **desktop viewport only** (0 mobile), light/dark, load-time only (**0 interaction-state rows** — no row opens a modal/drawer before scanning). Gate: fail on any `critical`. Current: **critical=0 serious=0**.
- **screenshots** (`tests/screenshots/capture.cjs`): **219 rows**, **3 viewports** (desktop 1440×900 / tablet 834×1112 / mobile 390×844), interaction-driven (opens modals/drawers/confirms/kebabs), tracks console errors. Current: 0 console errors.
- **RTL** = ar rows (default); **dark** = seeded `localStorage['academy.theme']`.

## Gaps to close in the freeze pack
1. **Mobile a11y**: a11y has **0 mobile rows** → add a 390×844 axe pass for the high-traffic + newest surfaces (dashboard, sessions, finance, reports, the 3 portal homes, sessions-analysis/public-holiday/scheduled-actions, staff/library/certificates/settings). Mobile-only reflow/contrast bugs never surface in a desktop-only scan.
2. **Dark per family**: several newer internals have no dark a11y row (e.g. `teacher-students/outcomes/tasks/profile/library`) → add ≥1 dark row per page family.
3. **Missing EN a11y rows**: some internal teacher/family/student pages have only an AR-light a11y row → add the EN counterpart for language-parity assurance (beyond locale-key parity).
4. **Interaction-state a11y (the NEW forms)**: a11y is load-time-only → add "open-form" axe rows for the highest-risk new create/edit surfaces (Add-staff form, Edit-family form, Create-certificate form, Add-bank form, a category-create form, a picker drawer) to catch focus-trap / `aria-modal` / labelled-control violations that a load-only scan misses.
5. **New form screenshots**: add frames for each new form surface (open state) across the modules — desktop AR + one EN + one dark + one mobile — so the freeze pack visually proves "real fields before the gate".

## Final production-freeze pack (target)
- **a11y**: existing 138 rows GREEN + mobile-390 rows (≥15 key surfaces) + dark-per-family + missing-EN rows + ≥6 open-form interaction rows → **critical=0 serious=0**.
- **screenshots**: existing 219 + one open-form frame per rebuilt create/edit surface (grouped by module) + mobile/dark proofs → **0 console errors**; update `screenshots/REVIEW.md`.
- **Mobile 390**: no horizontal overflow on any page or open form (the sheet/modal reflow to 1-col via `.wiz-grid` `sm:grid-cols-2`→1-col at `app.css:647`).
- **RTL/LTR**: every new form renders correctly in AR-RTL and EN-LTR (label/control alignment).

## Freeze acceptance
Final a11y critical=0 serious=0 (incl. mobile + open-form state); final screenshot pack 0 console errors with the new-form frames; REVIEW.md updated; mobile 390 overflow-free.
