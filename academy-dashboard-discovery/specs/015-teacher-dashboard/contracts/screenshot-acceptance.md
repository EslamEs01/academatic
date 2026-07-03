# Contract: Screenshot Acceptance (Spec 015)

**Status**: Binding · Visual acceptance is the decisive mechanism. References US13, SC-011; research D15.

## 1. Minimum frame matrix (14+)

| # | Frame | Kind |
|---|---|---|
| 1 | teacher · AR · light · desktop (full page) | experience |
| 2 | teacher · AR · dark · desktop (NEW base entry) | experience |
| 3 | teacher · EN · light · desktop | experience |
| 4 | teacher · AR · light · mobile 390px (full page) | experience |
| 5 | today-schedule + next-class area (element-scoped) | area |
| 6 | follow-up board + my-students area | area |
| 7 | session-outcome workflow area | area |
| 8 | tasks + materials area | area |
| 9 | timetable/availability + rubric area | area |
| 10 | requests/performance + account area | area |
| 11 | student portal · AR · light | unchanged proof |
| 12 | family portal · AR · light | unchanged proof |
| 13 | portal hub · AR · light | unchanged proof |
| 14 | admin dashboard · AR · light | unchanged proof |

Area frames use the existing element-scoped capture mechanism (`s.area`; nth-of-type indices verified against the final DOM — granular per-section frames are acceptable and encouraged, as in Spec 014).

## 2. Failure conditions (any single one fails acceptance)

Looks admin-like · looks like a legacy clone · too many tables · **pay-related vocabulary visible** · **money/currency figure visible** · fake live join looks real · fake end-class submit looks real · fake attendance save looks real · fake upload/download/chat/certificate submit · raw i18n keys · `href="#"` · dead links · broken RTL/LTR · poor mobile · poor dark contrast · student page changed · family page changed · admin page changed · reports/finance regression · new backend/API/DB/auth · new library/CDN · **computed score/rating visible**.

## 3. Review record

`screenshots/REVIEW.md` gains the Spec 015 section: baseline record, the verdict table, failure-condition sweep, automated-results summary, issues-found-and-fixed list. Zero console errors across all captures.

## Acceptance (binding)

1. **Given** the capture run, **Then** all 14+ frames exist with 0 console errors.
2. **Given** the review, **Then** every frame has an explicit PASS verdict against §2, recorded in REVIEW.md.
3. **Given** frames 11–14, **Then** they match their standing records (byte-identity makes this trivially true — the frames are the human-readable proof).
