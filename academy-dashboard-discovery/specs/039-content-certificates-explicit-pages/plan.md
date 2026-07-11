# Implementation Plan: Admin Content & Certificates Explicit Pages (Spec 039)

**Branch**: `feature/012-role-portal-foundation` | **Date**: 2026-07-11 | **Spec**: [spec.md](./spec.md)
**Input**: `academy-dashboard-discovery/specs/039-content-certificates-explicit-pages/spec.md`
**Baseline**: HEAD `4cbcb31` (Spec 038 committed), tree clean, public HTML **115**, admin menu **50**.

## Summary

Complete the two remaining admin content-nav locks by **unlocking deep-links to existing tabs** — the proven
Spec 037/038 pattern. `materials` («المواد التعليمية») and `certificateRequests` («طلبات الشهادات») still render
as «قريبًا» even though their honest, display-only surfaces already exist and are hash-reachable: the **Materials
tab** on `library.html` and the **Requests tab** on `certificates.html`. Flip both `planned → implemented`
deep-links; apply the recommended `books → library.html#view=books` refinement so the two library items open
distinct tabs. **Navigation-only**: the sole application-source edit is `src/js/nav.config.js`; every page body,
fixture, locale, component, build script, and dependency is **0-diff**. Count held **115**, admin menu **50**, 0
new pages. All content/certificate no-fake and role laws are preserved by construction (no body change).

**Grounding result (re-confirmed this session, zero drift):**
- Current source inspected: `nav.config.js` (100/101/102/103, FUTURE_ROUTES 141–147), `pages/library.js`
  (tabs group `library`, items `[materials, books]`), `pages/certificates.js` (tabs group `certificates`, items
  `[templates, requests]`), `components/sidebar.js:18` `langRoute` (hash-aware), `enhance.js` `initTabs()`
  (`#view=` wins on load), `components/tabs.js`, `scripts/build-html.mjs` (PAGES 129 library / 130 certificates,
  no materials/requests page), `tests/smoke/run.cjs` (227–230 probe, 1184/1189 a31 tabIds, 1300 navCount50, 1387
  famPlanned==0, 1612/1636 admItems), `tests/a11y/run.cjs`, `tests/screenshots/capture.cjs`.
- Screenshots re-opened: management-materials-full ("Courses" mislabel), management-certificate-requests-full
  (Student/Course/Teacher/Description/Date/Action, "No data found"), management-library-003 (Add-Material two
  `type=file`) — plus the full 12-shot set inspected in the specify gate this session (committed `output/`,
  unchanged).
- Materials tab: EXISTS (subject catalog, bilingual, gated). Books tab: EXISTS (media catalog, gated, no file).
  Templates tab: EXISTS (static `role="img"` designer preview, no canvas). Requests tab: EXISTS (5 authored rows,
  review + create drawers, gated dispositions).
- Nav states: `materials` planned (no route); `certificateRequests` planned (no route); `books` implemented
  (`library.html`); `certificates` implemented (`certificates.html`). FUTURE_ROUTES = `{ materials:'library.html' }`.
- Protected smoke: navCount32===50 (1300), admItems.length===5 && !banks (1636), a31 tabIds (1184/1189), the
  admin planned-item probe (227–230, WILL break), famPlanned/teachersPlanned/reportsPlanned===0 precedents.
- Count/menu baseline: 115 pages, 50 admin items.

## Technical Context

**Language/Version**: Static HTML-first — native ES modules built by `scripts/build-html.mjs`; no framework.
**Primary Dependencies**: None new. Existing: build script + closed `data-*` enhance.js hook set. `package.json` 0-diff.
**Storage**: N/A (fixtures only; no persistence).
**Testing**: Node smoke (`tests/smoke/run.cjs`), a11y (`tests/a11y/run.cjs`, axe), screenshots (`capture.cjs`).
**Target Platform**: Static site (GitHub-Pages-compatible), AR-RTL + EN-LTR, light/dark/system.
**Project Type**: Static admin dashboard (web).
**Performance Goals**: N/A change (nav-only).
**Constraints**: No backend/API/network; closed hook set (no new hook/storage key); no `type=file`/`type=password`/
`<canvas>`; mobile 390 no h-overflow; WCAG AA; a11y critical=0 serious=0; count 115; admin menu 50.
**Scale/Scope**: 2 nav flips + 1 route refinement in one file; 0 new pages; declared test amendments only.

## Constitution Check

`.specify/memory/constitution.md` is an unpopulated template → the binding governance is the **Spec 016 law set**
(carried in CLAUDE.md) + the Spec 031/033–038 contracts. Gate evaluation against those:

| Gate | Status |
|---|---|
| Static HTML-first; no SPA/engine; closed `data-*` hook set; no new hook/storage key | PASS (nav-only; no new hook) |
| No backend/API/auth/DB/network; no new dependency; `package.json` 0-diff | PASS |
| No-fake law (no fake persistence/upload/PDF/issuance/delivery; every write gated) | PASS (no body change) |
| No `type=file`/`type=password`/`<canvas>`/`.pdf`/`window.open`/drag-designer | PASS (no body change) |
| Role laws (teacher pay-free, family zero-pay, student child-view, finance invariant, classSalaryReport lock) | PASS (untouched) |
| Page-count freeze (115) + admin-menu freeze (50) | PASS (status flip, not count) |
| AR/EN parity + hash-aware EN routing | PASS (`langRoute` hash-aware; labels exist) |
| Protected-test byte-verbatim except declared narrow supersession | PASS (2 declared amendments + additive) |
| Impact protection: unrelated `#page-body` byte-identical | PASS (only shared sidebar changes) |

**No violations → Complexity Tracking empty.**

## Project Structure

### Documentation (this feature)
```text
specs/039-content-certificates-explicit-pages/
├── spec.md + 16 specify artifacts (already created)
├── plan.md            # this file
├── research.md        # Phase 0
├── data-model.md      # Phase 1 (reuse-only)
├── quickstart.md      # Phase 1 (impl+verify workflow, not executed)
└── contracts/         # Phase 1 (18 contracts)
```

### Source Code (repository root) — files touched by the LATER implementation
```text
academy-dashboard-discovery/app/
├── src/js/nav.config.js        # ONLY application-source edit: 2 flips + FUTURE_ROUTES trim + books refinement
├── tests/smoke/run.cjs         # declared amendments (repoint probe; fix msg + add admPlanned===0) + additive route asserts
├── tests/a11y/run.cjs          # additive rows only
├── tests/screenshots/capture.cjs   # additive frames only
├── screenshots/REVIEW.md       # doc
├── README.md                   # doc
└── (public/*.html)             # regenerated by build — shared sidebar anchors only; bodies byte-identical
CLAUDE.md                       # doc (active-feature pointer)
```
**Zero-diff (must not change):** `pages/library.js`, `pages/certificates.js`, `fixtures/content-library.js`,
`fixtures/certificates.js`, `locales/ar.adm.js`, `locales/en.adm.js`, `enhance.js`, `components/tabs.js`,
`components/sidebar.js`, `i18n.js`, `styles/app.css`, `scripts/build-html.mjs`, `package.json`.

**Structure Decision**: No new structure. Nav-only unlock into existing pages/tabs.

## Implementation approach (for /speckit.tasks — not executed here)

1. **Preflight**: verify baseline (branch/HEAD/count 115/menu 50/tree scope); capture `#page-body` md5 snapshot of
   all 115 built pages (non-destructive baseline for the impact proof).
2. **nav.config.js** (the one source edit):
   - `materials`: `status:'planned'` → `route:'library.html#view=materials'`.
   - `certificateRequests`: `status:'planned'` → `route:'certificates.html#view=requests'`.
   - `books`: `route:'library.html'` → `route:'library.html#view=books'`.
   - `FUTURE_ROUTES`: drop the `materials` entry.
   - Nav build-time guard already enforces implemented⇒route; verify it passes.
3. **Tests** (declared amendments + additive): repoint the admin planned-item probe (227–230) → settings; fix the
   1636 message + add `admPlanned===0`; add per-item route/fresh-load asserts (materials/certificateRequests/books,
   AR+EN); additive a11y + screenshot rows.
4. **Build + verify**: `npm run build` (→115), `npm run test:smoke` (PASS), `npm run test:a11y` (0/0),
   `node tests/screenshots/capture.cjs` (0 console errors).
5. **Impact proof**: rebuild + compare normalized `#page-body` md5s vs the baseline snapshot → only shared sidebar
   differs; `library`/`certificates` bodies + all other bodies + 16 portals + index byte-identical.
6. **Docs**: README/CLAUDE/REVIEW.md; implementation-status.md.

## Risks & stop conditions
Low risk (nav-only, surfaces built). No stop condition met (count holds 115; menu holds 50; no standalone page;
tabs exist; deep-links work on fresh load; EN hash routing supported; library/certificates/fixtures/locales/
build-html/enhance/package 0-diff; no fake/mutation; no portal change; no body change; only the two declared test
amendments; source matches spec; no unrelated overlap). Full list in `contracts/scope-guard.md`.

## Phase status
- Phase 0 (research): research.md — COMPLETE.
- Phase 1 (design/contracts): data-model.md + 18 contracts + quickstart.md — COMPLETE.
- Phase 2 (tasks): NOT created here (`/speckit.tasks`).
