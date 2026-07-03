# Quickstart — verifying Spec 017 (Portal Shell v2)

From `academy-dashboard-discovery/app/`:

## 1. Build & baseline
```bash
npm run build          # 48 pages + index; only the four portal pairs may differ vs HEAD
git -C ../.. status --porcelain academy-dashboard-discovery/app/public/ | grep '\.html'   # expect exactly 8 portal files (+4 mirrored assets)
```

## 2. Visual pass (serve + open)
```bash
npm run preview   # http://localhost:4178
```
- `student-portal.html` — sky sidebar, 7 items, home active, 13 home sections unchanged below the topbar.
- `family-portal.html` — violet, 8 items (billing label = الفواتير, status register), 12 sections intact.
- `teacher-portal.html` — teal, 7 items, 14 sections intact, performance link still the only body anchor.
- `portals.html` — NO sidebar; refreshed card copy.
- Mobile (devtools 390px): the sidebar disappears; the «القائمة» disclosure opens/closes by tap AND Enter/Space; no horizontal scroll.
- Dark mode + EN pages: same structure, LTR mirrored, labels mirrored.

## 3. Home-content integrity (SC-003)
```bash
git diff -- src/js/pages/student-portal.js src/js/pages/family-portal.js src/js/pages/teacher-portal.js   # empty (or wrapper-arg-only, enumerated)
# extraction diff: compare #page-body inner HTML, HEAD vs new build, all six role files → byte-equal
```

## 4. Suites & audits
```bash
npm test                       # smoke (amended portal block) + a11y 0/0
node tests/screenshots/capture.cjs portal   # portal frames + the drawer-open mobile variant; 0 console errors
```
- Pay-free three layers (extended token set) over teacher sources incl. comments + both built teacher files → zero hits; payHit assert byte-verbatim green.
- 41/49 hash-identical vs HEAD (40 admin + index).
- Zero `href="#"` / dead links / raw keys (smoke crawl).
- G2-frozen file diffs empty: `enhance.js`, `build-html.mjs`, `nav.config.js`, `package.json`.

## 5. Done means
Smoke+a11y green · anchor registries pinned · integrity proof recorded · REVIEW.md verdicts PASS · CLAUDE.md points at Spec 017 · 018–020 need only flip registry statuses.
