# Implementation Plan: Living Dashboards Experience Rework (Spec 022)

**Branch**: `feature/012-role-portal-foundation` · **Date**: 2026-07-05 · **Spec**: [spec.md](spec.md)
**Input**: spec.md + visual-grounding.md (16 frames) + dashboard-diagnosis.md +
role-reclassification-scope.md + the binding Spec 021 decision record (DEC-001…009) +
research.md (D1–D24, all resolved).

## Summary

Transform the hub and the three role homes into living educational cockpits via five shared
primitives (idHero · dayRail · storyRow · flowStrip · guidePanel) + a pure-CSS joy/motion layer,
and land the corrected role model: hub → 2 primary role cards (family, teacher) + admin + a
DEMOTED child-view entry; the student surface reframed «بوابة الطالب» → «عرض الابن» at the locale
layer (six internal modules untouched — D6 proven); ONE honest fold-point link from family-child.
22 built files rebake intentionally (expected identity 55/77); every standing law holds.

## Technical Context

**Stack**: the frozen SSG (`build-html.mjs` — NO engine change this spec) · ES-module page renderers
· `portal-page.js` primitives (EXTEND-ONLY) · Tailwind-source `app.css` (additive living-layer
section) · fixtures/locales additive groups. **No** new deps/hooks/storage keys/engines.
**Constitution check**: static HTML-first ✓ · closed hook set ✓ (D14: zero new hooks) · honesty
classes ✓ · teacher pay-free GLOBAL ✓ (D15) · family zero-pay ✓ (D16) · no charts/rank/score ✓ ·
zero `href="#"` ✓ · screenshot acceptance ✓ · compact ceilings ✓ (D20). No violations; no
clarifications outstanding.

## Baseline (verified this session)

HEAD `8d3d561` · branch `feature/012-role-portal-foundation` · Specs 020 (delivery) + 021 (audit)
UNCOMMITTED in the working tree (watcher pending) — planned against as the baseline per the user's
instruction · 77 public files · full gate green at plan time (build 77 · smoke 76 loads PASS ·
axe critical=0 serious=0) · Spec 022 folder exists with the four spec-stage artifacts.

## Phase 0 — research.md

Complete: D1–D24 recorded with evidence; no NEEDS CLARIFICATION remain.

## Phase 1 — Design deliverables

- **data-model.md** — the `LIVING_HOME` additive fixture group + locale namespace `prt.lv.*` + the
  re-labeled student identity keys + the demoted hub entry copy.
- **contracts/** — 16 contracts (grounding · hub reclassification · primitives · family home ·
  teacher home · child-view reclassification · student preservation · fold point · honesty ·
  pay-free · zero-pay · mobile/a11y/motion · smoke rescope · visual regression · impact protection
  · scope guard).
- **quickstart.md** — the verification walkthrough.

## Implementation outline (for /speckit-tasks — NOT executed now)

1. **Baseline gate**: rebuild determinism vs the working tree · full test green · capture the six
   student-internal `#page-body` extraction hashes + the family-child extraction hash (the D6/D7
   proof inputs) · archive the BEFORE screenshot set (already on disk).
2. **Shared layer**: app.css living section (D12/D13) → portal-page.js five additive exports (D11)
   → `LIVING_HOME` fixtures + `prt.lv.*`/re-labeled locale keys (data-model), pay/zero-pay
   pre-checked (D15/D16).
3. **Surfaces** (each: module edit → build → self-check): hub (D3/D4) → family home (D9) → teacher
   home (D10) → student home (D5) → family-child fold point (D7). family-children: NO TOUCH (D8).
4. **The ONE smoke amendment** (D17) + a11y rows (D18) + capture matrix (D19) — reviewed as one diff.
5. **Audits**: pay-free 3-layer · zero-pay all bodies · student-internal body extraction-hash proof
   (6 pages × 2 langs byte-equal) · family-children zero-diff proof · identity count (expect 55/77)
   · portal-page.js append-only diff proof · ceilings measured (D20).
6. **Docs**: REVIEW.md before/after section · README · CLAUDE.md · the 016 sequence amendment (D22).
7. **Adversarial reviews** (clean-code guard + test guard, both on the full diff) → final full gate
   → the 25-point report. NO commit/push (watcher).

## Allowed files (implementation)

`app/src/js/pages/{portals,family-portal,teacher-portal,student-portal,family-child}.js` ·
`app/src/js/components/portal-page.js` (EXTEND-ONLY) · `app/src/js/fixtures/portal.js` (additive) ·
`app/src/locales/{ar,en}.prt.js` (additive + the sanctioned student-identity re-labels) ·
`app/src/styles/app.css` (additive section) · `app/tests/{smoke,a11y,screenshots}/*` (ONE sanctioned
amendment + rows) · `app/screenshots/REVIEW.md` · `app/README.md` · `CLAUDE.md` ·
`specs/016-…/future-spec-sequence.md` (append-only) · `specs/016-…/legacy-to-new-coverage-matrix.md`
(append-only, if needed) · `specs/022-…/*`. Built outputs: exactly the 22 rebaked files + assets.

**FORBIDDEN**: `family-children.js` (D8) · the six student internal modules (D6 — zero touches) ·
`portal-shell.js` · `enhance.js` · `nav.config.js` · `build-html.mjs` · `package.json` · admin
source/content · any new page/hook/engine/dependency · teacher pay vocabulary · family money copy.

## Stop conditions

Any D24 trigger: non-sanctioned body drift on the six student internals or family-child ·
family-children rebake · ceiling overflow after trim · portal-page.js non-append diff · pay/zero-pay
regression · smoke byte-verbatim block drift. On any stop: report, do not work around.
