# Contract: Scope Guard (Spec 015)

**Status**: Binding · The change-surface law. References all impact contracts; research D13/D14.

## G1 — Allowed surface (exhaustive)

1. `src/js/pages/teacher-portal.js` — the cockpit upgrade (+ an optional teacher-only helper module ONLY if the page outgrows readability).
2. `src/js/fixtures/portal.js` — the NEW `TEACHER_PREVIEW` block + `PORTAL_PLANNED.teacher` re-registration ONLY.
3. `src/locales/ar.prt.js` / `en.prt.js` — `prt.tch.*` rewrite + new `data.prtTch*` keys ONLY (key-mirrored; teacher-owned copy updates like `noteT/noteD` sanctioned).
4. `src/styles/app.css` — additive selectors inside the `.portal-shell` namespace ONLY (013/014 primitives reused, never modified).
5. `tests/smoke/run.cjs` (teacher-branch amendments per D13 — the pay-token assert KEPT verbatim) · `tests/a11y/run.cjs` · `tests/screenshots/capture.cjs` (additive).
6. Docs: `README.md` (docs-only note if needed) · `screenshots/REVIEW.md` · `CLAUDE.md` · this spec folder.
7. `specs/012-role-portal-foundation/legacy-role-capability-coverage.md` — the appended §9 ONLY.
8. `public/teacher-portal.html` / `.en.html` (+ mirrored build assets) — the ONLY built pages that change.

## G2 — Forbidden (hard)

Admin page/nav/body/fixture edits · student dashboard implementation (`student-portal.js`, `prt.stu.*`, `data.prtStu*`, `STUDENT_PREVIEW`, `PORTAL_PLANNED.student`) · family dashboard implementation (`family-portal.js`, `prt.fam.*`, `data.prtFam*`, `FAMILY_PREVIEW`, `PORTAL_PLANNED.family`) · hub content (`portals.js`, `prt.hub.*`) · `portal-shell.js` · `build-html.mjs` · `nav.config.js` · `enhance.js` · `package.json` · shared `prt.shell/portal/role/title` keys · real auth/permissions · backend/API/DB · live-join/chat/attendance-write/end-class/homework/material/certificate engines · **payroll/compensation surfaces** · **pay-related vocabulary in copy OR comments** (the standing word-bounded EN+AR set: salary|salaries|pay|payouts?|earnings?|compensation|bonus|fines? + راتب|رواتب|أجر|مستحقات|غرامة|مكافأة) · **money/currency figures/tokens** (EGP/SAR/USD/ريال/ر.س/جنيه/$/€/£) · **computed score/rank/rating** (the fixture `rating`/`util` never render) · new libraries/frameworks/CDN/TypeScript · SPA/`#app`/runtime construction · legacy clone work · dense admin tables · new `data-*` hooks · `<form>`/`<input>` elements on the teacher page · any second page-body anchor.

## G3 — Audit set (all must pass at completion)

1. **Change-surface**: `git status` shows ONLY G1 paths.
2. **Byte-identity**: 47/49 built files hash-identical to HEAD (40 admin + student/family/hub pairs + index); offenders listed by name.
3. **THE PAY-FREE AUDIT**: the word-bounded pay regex + the currency regex over the teacher sources (incl. comments) AND both built teacher files → zero hits; the Spec-012 smoke payHit assert green.
4. **Zero `href="#"`** sitewide; zero dead links (smoke crawl); teacher bodyAnchors === 1 with the exact performance target; zero form controls.
5. **No admin markup in the teacher page**; no portal reference in any admin file.
6. **Planned registers**: teacher = exactly {outcomeSave/matUpload/availabilityEdit: backendRequired, taskManage: planned}; student/family registers byte-unchanged.
7. **Guarded diffs**: `git diff` on all G2 files is empty.
8. **Prior guards**: Spec 008 reports-body · 009 G8a · 010 chip-tones · 011 zero-href# · 012 G5 · 013 student branch · 014 family branch (incl. its zero-pay regex) — all re-run green; the D13 teacher re-scope is this spec's ONE sanctioned test amendment.

## Comment discipline

No forbidden tokens in source comments — pay vocabulary absolutely (the G2 list), and score/rank/rating adjacency worded carefully (the standing G8a lesson).
