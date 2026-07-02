# Contract: Screenshot Acceptance (Spec 011)

**Status**: Binding · Visual proof of the two fixes. References FR-013; SC-009; US5; research D5; data-model §5.

## 1. Frames (captured via the existing `tests/screenshots/capture.cjs` MATRIX)

| # | Frame | Page / state | Lang / theme / viewport |
|---|---|---|---|
| 1 | Dashboard after Overview fix | dashboard.html | AR / light / desktop |
| 2 | Dashboard after Overview fix | dashboard.en.html | EN / light / desktop |
| 3 | Sidebar with localized sessions badge (٢٤) | any page, sidebar visible | AR / light / desktop |
| 4 | Sidebar with Western sessions badge (24) | any page, sidebar visible | EN / light / desktop |
| 5 | Mobile sidebar quick check | dashboard, drawer | AR / light / mobile |

Frames 1–4 are already in the standard MATRIX (dashboard AR/EN + the sidebar is in every frame); the Spec 011 review simply re-captures and reads them for the two fixes — no new drivers needed. (The existing `cat`/`drawer` frames also show the localized badge.)

## 2. Pass conditions

Dashboard Overview control renders intentionally with a working link (no dead `#`); Arabic sidebar sessions badge shows ٢٤; English shows 24; badge equals the fixture count; no visual regression vs the pre-Spec-011 dashboard frame; dark mode and RTL/LTR clean; mobile sidebar intact.

## 3. Failure conditions (any → hard FAIL)

`href="#"` still present · Overview control looks broken or points to a fake route · Arabic badge still Western digits · English badge became Arabic digits · badge ≠ fixture count · dashboard visually regresses · reports body changes · finance body changes · raw `⟦key⟧` · any dead link · fake planned link · broken RTL/LTR · poor dark mode.

## 4. Review protocol

Human review of the frames; verdicts recorded in `app/screenshots/REVIEW.md` under a Spec 011 section (verdict table + failure-conditions note). Zero console errors during capture.

**Acceptance (binding):** all frames captured, reviewed, recorded PASS; any fail fixed and recaptured before the spec closes.
