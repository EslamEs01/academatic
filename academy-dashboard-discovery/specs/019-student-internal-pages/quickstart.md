# Quickstart — verifying Spec 019 (student internal pages)

From `academy-dashboard-discovery/app/`:

## 1. Grounding & surface
```bash
ls ../specs/019-student-internal-pages/visual-grounding.md   # the gate evidence exists (7 areas)
npm run build                                                # expect 62 pages + index = 63 files
ls public/student-*.html | wc -l                             # 14 (home pair + 6 new pairs)
```

## 2. Navigation (the flip)
- Open any student page: the sidebar shows **7 real links** (zero «قريبًا» buttons); the current page is highlighted (aside + drawer); home is a plain link.
- Student home: the quick-links band now navigates — six REAL tiles (the honesty fix; a "soon" pill over a live page would be a lie).
- Family home / teacher home: their sidebars still show 1 link + planned buttons (7/6) — untouched.

## 3. The six pages (compact, by eye AND number)
- Each page ≈1–2 screens @1366×768 (smoke window [500, 2200]): header → summary → short bands → labeled gates → note.
- Schedule: today+next, day-grouped week, truthful rest days, ONE live gate, zero tables.
- Homework: KPI trio, pending/in-progress/reviewed groups, due+state chips, submit gate.
- Materials: per-course groups, type chips, download gate, NO hero.
- Progress: KPI band, course bars, attendance trio, re-homed achievements/celebration, zero charts.
- History: out1 first, F6 records (summary + homework note), display-only period chips.
- Profile: identity/academic/guardian rows + EXACTLY 3 backendRequired gates (photo/save/password), zero forms.

## 4. Suites & audits
```bash
npm test && npm run test:smoke && npm run test:a11y   # 63 loads green; axe 0/0
node tests/screenshots/capture.cjs student             # new frames + home refresh
```
- Identity: **49/63** hash-identical (40 admin + index + hub + family home + family-child + teacher home pairs); changed = 12 new + student home pair only; `build-html.mjs` diff = 6 imports + 6 entries + 1 amended line; frozen-file diffs (portal-shell/enhance/nav.config/package.json) = 0.
- Pay: teacher three layers + payHit BYTE-VERBATIM green · family zero-pay (home + family-child) BYTE-VERBATIM green · zero pay register on all student pages.
- Retention: the 013/018 displaced keys now RENDER again (achievements/celebration/materials/history/profile) — grep proves none were deleted or reworded.
- Links: zero `href="#"`/dead/raw keys; internal-page bodies contribute 0 anchors; home body exactly 6.

## 5. Done means
Six compact student pages + a truthful 7-link student sidebar + all guards green + 49/63 identity + coverage annotations appended — the Student Dashboard App is frontend-complete; Specs 020/021 repeat the pattern for family/teacher.
