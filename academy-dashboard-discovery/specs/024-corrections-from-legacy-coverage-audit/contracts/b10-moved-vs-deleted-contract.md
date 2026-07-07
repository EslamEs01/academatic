# Contract: B-10 — Rail moved-vs-deleted verification (Should fix)

**Problem**: Spec 022's living rework may have dropped the pre-022 teacher rail prep-hint + rich per-session student counts — possible no-deletion-law friction (X-49/D-01). Must verify moved vs deleted.

## Verification method

1. Open `app/screenshots/before-022/teacher-portal__ar__light__desktop.png` vs current `app/screenshots/teacher-portal__ar__light__desktop.png`.
2. Read `specs/022-…/contracts/{teacher-living-home-contract.md, impact-protection-contract.md, smoke-rescope-contract.md, visual-regression-screenshot-contract.md}`.
3. Determine: was the prep-hint/count content **moved** (still reachable via flowStrip / counters / quick-links) or **deleted**?
   - **Moved** → record where; close the row; no restore.
   - **Deleted** → restore as real content inside the rail card body (feeds B-11 D-01); NEVER a fake control.
4. Also verify no OTHER prior important entry point was silently dropped by the living rework.

## Companion record (B-17 protection)

- Record family-children's missing fold-point link as an **intentional** deviation (per-child child-view links REJECTED as dishonest — preview persona is st1). 024/032 must NOT "fix" it.

## Allowed edits

- Determination record in `correction-scope.md` + append-only 023 note.
- If deleted: additive rail content (via B-11's living CSS / rail card copy) with declared supersession if a pinned body is touched.

## Forbidden

- Restoring blindly (verify first).
- Adding a fake per-child child-view link to family-children.

## Acceptance

- A written moved-vs-deleted determination exists; no prior important entry point left deleted; family-children no-fold-link recorded intentional.

**Owner**: 024-correction (Should fix).
