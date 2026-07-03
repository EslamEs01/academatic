# Contract: Scope Guard (Spec 014)

**Status**: Binding · The change-surface law. References all impact contracts; research D11/D12.

## G1 — Allowed surface (exhaustive)

1. `src/js/pages/family-portal.js` — the composition upgrade (+ an optional family-only helper module ONLY if the page outgrows readability).
2. `src/js/fixtures/portal.js` — `FAMILY_PREVIEW` extensions + `PORTAL_PLANNED.family` re-registration ONLY.
3. `src/locales/ar.prt.js` / `en.prt.js` — new/updated `prt.fam.*` + new `data.prtFam*` keys ONLY (key-mirrored; family-owned copy updates like `kidsHint` sanctioned).
4. `src/styles/app.css` — additive selectors inside the `.portal-shell` namespace ONLY (requests-hub bits; 013 primitives reused, never modified).
5. `tests/smoke/run.cjs` (family-branch amendments per D11) · `tests/a11y/run.cjs` · `tests/screenshots/capture.cjs` (additive).
6. Docs: `README.md` (docs-only note if needed) · `screenshots/REVIEW.md` · `CLAUDE.md` · this spec folder.
7. `specs/012-role-portal-foundation/legacy-role-capability-coverage.md` — the appended §8 ONLY.
8. `public/family-portal.html` / `.en.html` (+ mirrored build assets) — the ONLY built pages that change.

## G2 — Forbidden (hard)

Admin page/nav/body/fixture edits · student dashboard implementation (`student-portal.js`, `prt.stu.*`, `data.prtStu*`, `STUDENT_PREVIEW`, `PORTAL_PLANNED.student`) · teacher dashboard implementation (`teacher-portal.js`, `prt.tch.*`, `PORTAL_PLANNED.teacher`) · hub content (`portals.js`, `prt.hub.*`) · `portal-shell.js` · `build-html.mjs` · `nav.config.js` · `enhance.js` · `package.json` · shared `prt.shell/portal/role/title` keys · real auth/permissions · backend/API/DB · payment/cancel/upload/voice/feedback/chat/live engines · **teacher salary/pay figures or vocabulary anywhere** (standing word-bounded EN+AR grep) · **any pay/currency figure or pay-control vocabulary on the family page** (`ريال|ر.س|SAR|USD|$|€|£|pay now|ادفع|سداد` — machine-asserted) · new libraries/frameworks/CDN/TypeScript · SPA/`#app`/runtime construction · legacy clone work · dense admin tables · new `data-*` hooks · `<form>`/`<input>` elements on the family page.

## G3 — Audit set (all must pass at completion)

1. **Change-surface**: `git status` shows ONLY G1 paths.
2. **Byte-identity**: 47/49 built files hash-identical to HEAD (40 admin + student/teacher/hub pairs + index); offenders listed by name.
3. **Teacher pay grep**: standing word-bounded EN+AR sweep over portal sources + built portal files → zero hits.
4. **Family zero-pay grep**: the currency/pay-control regex over both built family files → zero hits.
5. **Zero `href="#"`** sitewide; zero dead links (smoke crawl); family bodyAnchors === 0; zero form controls on the family page.
6. **Planned registers**: family = exactly {billingGate: backendRequired, matDownload: backendRequired, fullHistory: planned, meetingRequest: planned}; student/teacher registers byte-unchanged.
7. **Guarded diffs**: `git diff` on all G2 files is empty.
8. **Prior guards**: Spec 008 reports-body · 009 G8a · 010 chip-tones · 011 zero-href# · 012 G5 · 013 student-branch asserts — all re-run green; the D11 family re-scope is this spec's ONE sanctioned test amendment.

## Comment discipline

No forbidden tokens in source comments (pay vocabulary, currency, score/rank adjacency worded carefully) — the standing G8a lesson.
