# Quickstart — Spec 025 Teacher Internal Pages (implementation runbook)

**Date**: 2026-07-07. Build/verify runbook + acceptance gates for the later `/speckit-implement`. Changes no code by itself.

## Prerequisites

- HEAD `32c78c8` (Spec 024 committed); branch `feature/012-role-portal-foundation`; 77 public HTML.
- `cd academy-dashboard-discovery/app`.
- Baseline: `npm run build` idempotent (77 HTML, git clean); baseline suite green at this HEAD.

## Implementation order

1. **Fixtures** — extend `TEACHER_PREVIEW` (portal.js) with static rows per page (no pay/computed/fake data).
2. **Locales** — add mirrored `prt.title.tch<Page>` + `prt.tch.<page>.*` keys (ar+en); pay-free.
3. **Pages** — write the 7 `teacher-*.js` modules from primitives; every unavailable action a backendRequired gate.
4. **Nav** — flip the 7 `ROLE_NAV.teacher` items planned→implemented.
5. **Anchor** — `teacher-portal.js:70` `perfHref` → `teacher-reports(.en).html`.
6. **Build registration** — 7 imports + 7 PAGES entries (family-internal shape) in `build-html.mjs`.
7. **CSS** — additive living-layer rules only if a new card shape is needed.
8. **Tests** — smoke (new pages + nav 1→8 + anchor re-pin + gate asserts + load count), a11y (7 pages), screenshots.
9. **Docs** — REVIEW.md, README, CLAUDE, update the Spec 024 B-07 exemption note (tension closed).

## Build + verify gates (all MUST pass)

```bash
cd academy-dashboard-discovery/app
npm run build

# --- Count: 91 (77 + 14) ---
find public -maxdepth 1 -name "*.html" | wc -l                       # == 91

# --- All 7 pages built, both langs ---
for p in schedule students outcomes tasks reports profile library; do
  ls public/teacher-$p.html public/teacher-$p.en.html >/dev/null || echo "MISSING teacher-$p"
done

# --- Teacher pay-free (3 layers) ---
grep -RniE 'salary|salaries|\bpay\b|payout|earnings?|compensation|bonus|\bfines?\b|money|currency|راتب|رواتب|أجر|أتعاب|مستحقات|مكافأة|غرامة|فلوس|جنيه|ريال|دولار|\bEGP\b|\bSAR\b|\bUSD\b|[$€£]' \
  src/js/pages/teacher-{schedule,students,outcomes,tasks,reports,profile,library}.js \
  public/teacher-{portal,schedule,students,outcomes,tasks,reports,profile,library}.html \
  public/teacher-{portal,schedule,students,outcomes,tasks,reports,profile,library}.en.html   # == 0 hits

# --- Anchor repoint ---
grep -o 'teacher-reports\.html' public/teacher-portal.html                                    # present
grep -c 'teacher-performance\.html' public/teacher-portal.html                                # == 0

# --- Nav conversion + honesty ---
grep -c 'href="#"' public/teacher-*.html                                                      # == 0
# smoke: navListAnchors===8, plannedNavAnchors===0, no chat/finance nav

# --- Reports academic-only: no chart/score ---
# smoke: teacher-reports #page-body carries no chart/computed-score/finance token

# --- Suites ---
npm test                       # smoke (incl. payHit false on all 8 teacher pages) + a11y
npm run test:a11y              # critical==0 serious==0
node tests/screenshots/capture.cjs

# --- Identity protection ---
git diff --stat -- public/ | grep -E "dashboard|families|family-|student-" || echo "admin/family/student HTML unchanged (except teacher-portal)"
```

## Smoke re-pin checklist (declared)

- [ ] Add the 7 pages to PORTAL_PAGES + per-page load/gate asserts.
- [ ] Teacher nav block: `navListAnchors===8` (was 1), `plannedNavAnchors===0`, `navAside===8 && navDrawer===8` (was 8 planned; now 8 implemented links).
- [ ] Teacher-portal anchor: `bodyAnchors===1`, target regex `teacher-performance` → `teacher-reports`.
- [ ] Load count bumped to the new total.
- [ ] `payHit`, `famPay`/`payFigure`, ALL admin asserts BYTE-VERBATIM.
- [ ] Reports: assert no chart/computed-score token + finance-free.

## Stop conditions (abort + report)

HTML ≠ 91 · any teacher pay token · reports finance wording · anchor still → teacher-performance · fake live-room/chat/upload/download/save · teacher chat/finance/pay nav · package.json change · admin/family/student module change · new backend/dep/chart engine · a11y critical/serious · mobile-390 overflow.

## Done criteria

91 HTML; 7 pages load AR+EN; nav 8 implemented (`plannedNavAnchors===0`); anchor → teacher-reports; pay-free 3 layers green; reports academic-only; all gates honest; a11y 0/0; screenshots captured; admin+index+family+student byte-identical. Then Spec 026 (admin control/sessions/ops) is next per DEC-009.
