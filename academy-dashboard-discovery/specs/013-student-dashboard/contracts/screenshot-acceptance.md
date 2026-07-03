# Contract: Screenshot Acceptance (Spec 013)

**Status**: Binding · Visual acceptance is the project's decisive mechanism. References US10, SC-010; research D11.

## 1. Minimum frame matrix (12+)

| # | Frame | Kind |
|---|---|---|
| 1 | student · AR · light · desktop (full page) | experience |
| 2 | student · AR · dark · desktop | experience |
| 3 | student · EN · light · desktop | experience |
| 4 | student · AR · light · mobile 390px (full page) | experience |
| 5 | next-session area (element-scoped) | area |
| 6 | homework + materials area | area |
| 7 | progress + achievements + celebration area | area |
| 8 | history/feedback area | area |
| 9 | portal hub · AR · light | unchanged proof |
| 10 | family portal · AR · light | unchanged proof |
| 11 | teacher portal · AR · light | unchanged proof |
| 12 | admin dashboard · AR · light | unchanged proof |

Area frames = Playwright element-scoped captures on the section wrappers (additive capture.cjs capability; falls back to reviewed full-page regions only if element capture proves unstable).

## 2. Failure conditions (any single one fails acceptance)

Looks admin-like · looks like a legacy clone · tables present · childish or cheap design · fake live join looks real · fake upload/submit looks real · ranking engine implied · stressful leaderboard · raw i18n keys · `href="#"` · dead links · broken RTL/LTR · poor mobile · poor dark contrast · any admin page changed · family/teacher deep content changed · reports/finance regression · new backend/API/DB/auth · new library/CDN.

## 3. Review record

`screenshots/REVIEW.md` gains the Spec 013 section: baseline record, the 12-row verdict table, failure-condition sweep, automated-results summary, and the issues-found-and-fixed list. Zero console errors across all captures.

## Acceptance (binding)

1. **Given** the capture run, **Then** all 12+ frames exist with 0 console errors.
2. **Given** the review, **Then** every frame has an explicit PASS verdict against §2, recorded in REVIEW.md.
3. **Given** frames 9–12, **Then** they are visually equivalent to their Spec-012 records (byte-identity makes this trivially true — the frames are the human-readable proof).
