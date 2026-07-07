# Quickstart — verifying Spec 020 (family/guardian internal pages)

From `academy-dashboard-discovery/app/`:

## 1. Grounding & surface
```bash
ls ../specs/020-family-guardian-internal-pages/visual-grounding.md   # 27/27 family frames evidenced
npm run build                                                        # expect 76 pages + index = 77 files
ls public/family-*.html | wc -l                                      # 18 (home + child + 7 new pairs)
```

## 2. Navigation & drill-down
- Any family page: the sidebar shows **8 real links** (zero «قريبًا»); the current page highlighted (aside + drawer); home a plain link on internals.
- Family home: quick-links band navigates (7 real tiles) AND the five child cards still open `family-child.html#child=stX`.
- **family-child stays a drill-down** (not in the sidebar); its nav shows 8 links with HOME active; deep links still switch panels (default st1).
- Student sidebar: still 7 links; teacher sidebar: still 1 link + 6 planned — untouched.

## 3. The seven pages (compact, by eye AND number — window [500, 2200])
- Children: 5 rich child cards, each → its child file (body anchors === 5).
- Schedule: child-tagged today + next → day-grouped week + rest-day empties → ONE live gate; zero tables.
- Progress: family summary → 5 per-child cards w/ bars + real drill-downs (=== 5) → teacher notes; zero charts/rank.
- Billing: hour-quota tiles (40/12/28 hours) → settled chip → per-child subscription chips → invoice STATUS rows (**no amount column**) → finance gates + admin-finance note.
- Requests: type-grouped cards (trial/meeting/feedback/cancel) w/ status chips + per-type gates; zero forms.
- Materials: per-child groups (all five covered) + type chips + download gate; NO hero.
- Profile: guardian identity + account rows + children line + prefs + EXACTLY 3 gates; zero forms.

## 4. Suites & audits
```bash
npm test && npm run test:smoke && npm run test:a11y   # 76 loads green; axe 0/0
node tests/screenshots/capture.cjs family              # new frames + home/child proofs
```
- Zero-pay: the verbatim payFigure regex green on ALL 7 new pages + the original home/family-child lines BYTE-VERBATIM · teacher payHit BYTE-VERBATIM · teacher three-layer grep clean.
- Identity: **59/77** hash-identical (40 admin + index + hub + 14 student + teacher pair); changed = 14 new + family-portal pair + family-child pair (nav-only); `build-html.mjs` diff = 14 added lines; frozen-file diffs = 0.
- family-child body: `#page-body` extraction hash pre/post EQUAL (the preservation proof).
- Retention: the 014 displaced registers (req.*/bill*/notes/materials/acct) now RENDER again on their owning pages — grep proves none deleted/reworded.
- Links: zero `href="#"`/dead/raw keys; home body === 12 (5 child + 7 tiles).

## 5. Done means
Seven compact family pages + a truthful 8-link family sidebar + the preserved child drill-down + all guards green + 59/77 identity + coverage annotations appended — the Family Dashboard App is frontend-complete; Spec 021 repeats the pattern for the teacher (pay-free) app.
