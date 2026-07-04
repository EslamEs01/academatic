# Quickstart — verifying Spec 018 (compact homes + family-child)

From `academy-dashboard-discovery/app/`:

## 1. Build & surface
```bash
npm run build     # expect 50 pages + index = 51 files
git -C ../.. status --porcelain academy-dashboard-discovery/app/public/ | grep '\.html'   # exactly: 3 role pairs M + family-child pair ?? (8 files)
```

## 2. Compactness (the user's core complaint — verify by eye AND number)
- Open each role home at 1366×768: header → 4 KPIs → today+next → core band → preview → quick links → note. **1.5–2 screens, no endless scroll.**
- Smoke probe: sections 4–7, scrollHeight ≤ 2,200 (floor 900) per home, both languages.
- REVIEW.md: the before/after height table filled (≈5,400/≈6,600 → ≤2,200).

## 3. The child drill-down (mandatory)
- Family home: five child cards each with a real «فتح ملف الابن» link.
- Click through → `family-child.html#child=stX` opens with THAT child selected; the switcher swaps panels; deep-link a hash directly and the right panel shows; default (no hash) = st1.
- Panel shows: name/level/chip · course/group/teacher · today-next (or truthful none) · attendance mini-trio + progress · latest note · homework/materials summary lines · history + profile gates. Zero forms, zero money figures, zero pay buttons.

## 4. Suites & audits
```bash
npm test && npm run test:smoke && npm run test:a11y     # 50 loads green; axe 0/0
node tests/screenshots/capture.cjs portal               # incl. family-child + switched-child frame
```
- Pay: extended-set greps (teacher sources incl. comments + built pair) zero; payHit BYTE-VERBATIM green; family zero-pay regex BYTE-VERBATIM green on home AND family-child.
- Identity: **43/51** hash-identical (40 admin + index + hub pair); G2 diffs empty (`enhance.js`, `nav.config.js`, `package.json`); `build-html.mjs` diff = exactly the 2 registration lines.
- Displacement: the retained-keys grep (e.g., `prt.stu.ach1`, `prt.tch.flow5`, `prt.fam.req.trialT`) still present in both overlays.
- Links: zero `href="#"`/dead/raw keys; family home bodyAnchors===5 exact targets.

## 5. Done means
Three compact homes + a working child drill-down + all guards green + the 019–028 sequence amendment appended + docs updated — Specs 019–021 inherit ready homes and the drill-down pattern.
