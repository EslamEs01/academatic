# Contract: B-11 — Visual-density pass (Should fix)

**Problem**: several living sections are empty-heavy/underfilled (D-01/D-04…D-13). The owner cares strongly about visual quality. Small pure-CSS polish only — NOT a redesign.

## Scope (design-register rows)

- **Pure-CSS living-layer, no pinned-body change** (do now): D-01 rail second content column / cap; D-06 role-tinted dark-hero tokens; D-07 schedule day-row hierarchy; D-08 hub 2-up primary row; D-10/D-11/D-12 delight touches (family-requests / family internals / teacher all-clear strip); D-13 mobile topbar no-wrap.
- **Pinned-body rows** (only with declared hash supersession + smoke re-pin; else DEFER to a later design spec): D-04 family-children storyRow + «اليوم:» tag; D-05 compact stat tiles; D-09 7-cell week strip.
- **D-02 = F-00-1 → handled by B-01, NOT here.**

## Allowed

- Additive edits in `app/src/styles/app.css` living layer only.
- Empty-state / small story-line copy in `ar.prt.js` / `en.prt.js` (mirrored; pay-free; no student-primary wording).
- Motion ONLY inside the existing single `prefers-reduced-motion: no-preference` block.

## Forbidden

- Large redesign; new pages; new workflows; new hooks; new storage keys.
- Chart engine; JS animation engine; decorative bloat.
- Motion outside the reduced-motion block.
- Any fake action; any pay/payment token (family/teacher delight copy is status-only).

## Acceptance

- Each scoped D-row shows a before/after screenshot improvement.
- Pinned-body rows (D-04/D-05/D-09) carry a declared supersession + smoke re-pin, or are deferred with a reason.
- Reduced-motion honored; dark/light + RTL/LTR + mobile-390 clean; a11y critical/serious == 0; smoke green; 77 HTML.

**Owner**: 024-correction (Should fix). D-14 (admin cards) stays 026–031; D-15 (data sheets) stays light.
