# Quickstart — verifying Spec 022 (after implementation)

```bash
cd academy-dashboard-discovery/app
npm run build && npm test          # 77 files · smoke 76 loads PASS · axe critical=0 serious=0
node tests/screenshots/capture.cjs # AFTER frames, 0 console errors
```

**Role model corrected (DEC-001/002/004)** — open `public/portals.html`: exactly TWO primary role
cards (العائلة، المعلم) + the admin console band + ONE demoted «عرض الابن — معاينة» entry whose
copy names the family journey and سلمان; no «بوابة الطالب» primary card anywhere.

**Student demoted but preserved (DEC-003/005)** — all 14 `student-*` files still build and load;
every student page's topbar/sidebar now reads «عرض الابن» / chip «ابن العائلة»; `ROLE_NAV.student`
still renders 7 working links. Proof the six internals were reframed WITHOUT body rebuild:
`#page-body` extraction hashes match the pre-022 baseline on all 6 pages × 2 languages.

**Family owns the journey (DEC-006)** — `family-child.html` shows the ONE preview panel «افتح عرض
الابن الكامل (سلمان)» linking `student-portal.html`; `family-children.html` is BYTE-IDENTICAL to
its pre-022 build (no dishonest per-child links).

**Living homes (the point of the spec)** — on family/teacher/student homes: `.pt-idhero` renders
the role gradient hero with counters+stories · `.pt-rail` shows today as stops (now pulsing, next
emphasized, done dimmed — pulse only when reduced-motion is off) · `.pt-story` rows replace KPI
tiles · teacher shows the 4-step `.pt-flow` تحضير→حضور→تسجيل→مراجعة · gates render as `.pt-guide`
panels (still non-interactive). Set `prefers-reduced-motion: reduce` → identical content, zero
motion, bars full.

**Laws** — teacher pay grep (extended set, source+built+payHit) empty · payFigure regex green on
all family bodies · zero `href="#"`/dead links/raw keys · ceilings within [900,2200]/[500,2200] ·
mobile 390 no overflow · dark clean · AR/EN mirrored.

**Identity** — expected 55/77 byte-identical (the 22-file rebake set of D2); 40 admin + index +
all untouched family internals byte-identical; `git diff` shows NO change to portal-shell.js /
enhance.js / nav.config.js / build-html.mjs / package.json / family-children.js / the six student
internal modules.

**Docs** — REVIEW.md has the Spec 022 before/after verdict table; the 016 `future-spec-sequence.md`
carries the DEC-009 append-only amendment.
