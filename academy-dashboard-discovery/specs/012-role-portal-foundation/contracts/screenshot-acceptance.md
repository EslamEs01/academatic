# Contract: Screenshot Acceptance (Spec 012)

**Status**: Binding · Visual proof: distinct-from-admin, better-than-legacy, admin unchanged. References FR-017; US10; SC-008; research D10; data-model §8.

## 1. Frames (12 — via the existing capture MATRIX; plain page loads, no new drivers)

| # | Frame | Lang / theme / viewport |
|---|---|---|
| 1 | Student portal | AR / light / desktop |
| 2 | Student portal | AR / dark / desktop |
| 3 | Student portal | EN / light / desktop |
| 4 | Student portal | AR / light / mobile |
| 5 | Family portal | AR / light / desktop |
| 6 | Family portal | EN / light / desktop |
| 7 | Family portal | AR / light / mobile |
| 8 | Teacher portal | AR / light / desktop |
| 9 | Teacher portal | EN / light / desktop |
| 10 | Teacher portal | AR / light / mobile |
| 11 | Demo hub (`portals`) | AR / light / desktop |
| 12 | **Admin dashboard unchanged-proof** | AR / light / desktop |

## 2. Pass conditions

Portals: warm/friendly/card-based, role accents distinct, personas visible (st1/fam1 children/sara data), planned cards labeled, honest owning-spec notes, RTL/LTR correct, localized digits, dark premium (frame 2), mobile single-column no-overflow (frames 4/7/10), zero admin chrome. Hub: three clear role cards + labeled admin return. Frame 12: pixel-equivalent to the pre-012 dashboard frame.

## 3. Failure conditions (any → hard FAIL, fix and recapture)

Portal looks like an admin-console copy (rail/panel/topbar echoes) · looks like a legacy clone · student portal table-heavy or childish · family portal confusing/dense · **any salary/pay figure on the teacher portal** · fake join/chat/payment affordance that looks real · admin sidebar/body gained anything · dead links · `href="#"` · raw `⟦key⟧` · broken RTL/LTR · poor dark contrast · mobile horizontal scroll · reports/finance regression.

## 4. Review protocol

Human review of every frame; verdicts + notes recorded in `app/screenshots/REVIEW.md` under a Spec 012 section (verdict table + failure-conditions paragraph, the established pattern), including side-by-side judgments vs an admin frame and vs the legacy portal captures. Zero console errors during capture.

**Acceptance (binding):** all 12 frames captured, human-reviewed, recorded PASS; fails fixed and recaptured before the spec closes.
