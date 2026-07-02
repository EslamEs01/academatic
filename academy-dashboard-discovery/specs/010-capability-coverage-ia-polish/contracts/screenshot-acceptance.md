# Contract: Screenshot Acceptance (Spec 010)

**Status**: Binding · Visual acceptance is the project's decision mechanism. References FR-022; SC-008; US10; research D11; data-model §11.

## 1. Frames (13 — captured via the existing `tests/screenshots/capture.cjs` MATRIX)

| # | Frame | Page / state | Lang / theme / viewport |
|---|---|---|---|
| 1–6 | Each rail category expanded (control, families, teachers, reports, admin, settings) | dashboard, nav panel per category | AR / light / desktop |
| 7 | Reports category panel (finance sub-section) | dashboard, reports category open | AR / dark / desktop |
| 8 | Reports category panel | dashboard, reports category open | EN / light / desktop |
| 9 | Mobile sidebar drawer | dashboard, drawer open | AR / light / mobile |
| 10 | Family Plan & Billing tab (new finance link visible) | family.html, plan tab | AR / light / desktop |
| 11 | Attendance with a status tile filter applied (**filter-narrowing proof**) | attendance.html | AR / light / desktop |
| 12 | Dashboard (body-unchanged proof) | dashboard.html | AR / light / desktop |
| 13 | Finance (body-unchanged, post-nav-polish) | finance.html | AR / light / desktop |

Families / course / group pages are re-verified via the existing Spec 004/006 frames in the same capture run (no redesign).

## 2. Pass conditions

Frame 4 (reports category): finance group visually distinct with its «المالية» section title, Finance link first, 7 locked items with lock icons — reads as one calm story, not a dump. Frame by frame: labels premium and correctly localized, RTL/LTR mirrored properly, dark mode clean, mobile drawer intact, family link honest and discoverable, attendance shows ONLY matching rows with tile count agreeing with visible rows, dashboard/finance bodies identical to their pre-010 frames.

## 3. Failure conditions (any → hard FAIL, fix and recapture)

Sidebar feels random/bloated · finance group unclear or banks duplicated/stranded · confusing or clipped labels · duplicate items · dead/fake link visible · raw `⟦key⟧` · broken RTL/LTR · poor dark contrast · implemented page unreachable · planned/backendRequired item looks working · filter visibly fails (non-matching row present) · dashboard body changed · reports body contaminated · finance body violating Spec 009 · any copied legacy visual.

## 4. Review protocol

Human review of every frame (not just capture success); verdicts recorded in `app/screenshots/REVIEW.md` under a Spec 010 section (verdict table + failure-conditions note + fixes applied), the Spec 008/009 precedent. Zero console errors during capture.

**Acceptance (binding):** all 13 frames captured, reviewed, and recorded pass; any fail documented with its fix and recaptured before the spec closes.
