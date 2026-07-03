# Contract: Scope Guard (Spec 013)

**Status**: Binding · The change-surface law for the implementation. References all impact contracts; research D9/D10.

## G1 — Allowed surface (exhaustive)

1. `src/js/pages/student-portal.js` — the composition upgrade (+ an optional `src/js/components/portal-student-cards.js` helper ONLY if the module outgrows readability; it must be student-only).
2. `src/js/fixtures/portal.js` — `STUDENT_PREVIEW` extensions + `PORTAL_PLANNED.student` re-registration ONLY.
3. `src/locales/ar.prt.js` / `en.prt.js` — new `prt.stu.*` / `data.prtStu*` keys ONLY (key-mirrored).
4. `src/styles/app.css` — additive selectors inside the `.portal-shell` namespace ONLY (`.pt-empty`, `.pt-day`, celebration/profile bits).
5. `tests/smoke/run.cjs` (student-branch amendments per D9) · `tests/a11y/run.cjs` · `tests/screenshots/capture.cjs` (additive).
6. Docs: `README.md` (docs-only note if needed) · `screenshots/REVIEW.md` · `CLAUDE.md` · this spec folder.
7. `specs/012-role-portal-foundation/legacy-role-capability-coverage.md` — delivery notes per the coverage contract ONLY.
8. `public/student-portal.html` / `.en.html` (+ mirrored build assets) — the ONLY built pages that change.

## G2 — Forbidden (hard)

Admin page/nav/body/fixture edits · family or teacher dashboard implementation (their modules, fixtures blocks, locale namespaces are read-only) · hub content changes · `portal-shell.js` · `build-html.mjs` · `nav.config.js` · `enhance.js` · `package.json` · shared `prt.*` keys · real auth/permissions · backend/API/DB · chat/homework-upload/live-session/payment/ranking engines · **teacher salary/pay figures or vocabulary anywhere** (standing word-bounded EN+AR grep) · new libraries/frameworks/CDN/TypeScript · SPA/`#app`/runtime construction · legacy clone work · dense admin tables · new `data-*` hooks.

## G3 — Audit set (all must pass at completion)

1. **Change-surface check**: `git status` shows ONLY G1 paths.
2. **Byte-identity**: 47/49 built files hash-identical to HEAD (40 admin + family/teacher/hub pairs + index); offenders listed by name.
3. **Pay tokens**: word-bounded `\b(salary|salaries|payouts?|earnings?|compensation)\b` + `راتب|رواتب|أجر|مستحقات` grep over all portal sources + built portal files → zero hits.
4. **Zero `href="#"`** sitewide; zero dead links (smoke crawl).
5. **No admin markup in the student page**; no portal reference in any admin file.
6. **Planned register**: student = exactly {hwSubmit: backendRequired, matDownload: backendRequired, fullHistory: planned}; family/teacher registers byte-unchanged.
7. **Guarded diffs**: `git diff` on G2 files is empty.
8. **Prior guards**: Spec 008 reports-body · 009 G8a · 010 chip-tones · 011 zero-href# · 012 G5 — all re-run `ok`, zero new amendments (the D9 smoke re-scope is this spec's ONE sanctioned test amendment).

## Comment discipline

No forbidden tokens in source comments either (the standing G8a lesson): pay vocabulary, "rank/score/chart" adjacency worded carefully in any disclaimer comments.
