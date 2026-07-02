# Contract: Screenshot Acceptance (Spec 014)

**Status**: Binding · Visual acceptance is the decisive mechanism. References US12, SC-011; research D13.

## 1. Minimum frame matrix (14+)

| # | Frame | Kind |
|---|---|---|
| 1 | family · AR · light · desktop (full page) | experience |
| 2 | family · AR · dark · desktop | experience |
| 3 | family · EN · light · desktop | experience |
| 4 | family · AR · light · mobile 390px (full page) | experience |
| 5 | children-overview area (element-scoped) | area |
| 6 | today-sessions area | area |
| 7 | signals + teacher-notes area | area |
| 8 | billing + subscriptions area | area |
| 9 | requests-hub area | area |
| 10 | history + materials area | area |
| 11 | student portal · AR · light | unchanged proof |
| 12 | teacher portal · AR · light | unchanged proof |
| 13 | portal hub · AR · light | unchanged proof |
| 14 | admin dashboard · AR · light | unchanged proof |

Area frames use the existing Spec-013 element-scoped capture mechanism (`s.area`).

## 2. Failure conditions (any single one fails acceptance)

Looks admin-like · looks like a legacy clone · too many tables · confusing child switcher · fake payment looks real · fake cancel/reschedule looks real · fake upload/voice/feedback submit · raw i18n keys · `href="#"` · dead links · broken RTL/LTR · poor mobile · poor dark contrast · student page changed · teacher page changed · admin page changed · reports/finance regression · new backend/API/DB/auth · new library/CDN · **currency/pay figure visible**.

## 3. Review record

`screenshots/REVIEW.md` gains the Spec 014 section: baseline record, the 14-row verdict table, failure-condition sweep, automated-results summary, issues-found-and-fixed list. Zero console errors across all captures.

## Acceptance (binding)

1. **Given** the capture run, **Then** all 14+ frames exist with 0 console errors.
2. **Given** the review, **Then** every frame has an explicit PASS verdict against §2, recorded in REVIEW.md.
3. **Given** frames 11–14, **Then** they match their standing records (byte-identity makes this trivially true — the frames are the human-readable proof).
