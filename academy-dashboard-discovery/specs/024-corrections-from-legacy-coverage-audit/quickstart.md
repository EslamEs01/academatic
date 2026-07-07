# Quickstart — Spec 024 Corrections From Legacy Coverage Audit (implementation runbook)

**Date**: 2026-07-07
**Audience**: the developer implementing Spec 024 after `/speckit-tasks`. This is the build/verify runbook + the exact acceptance gates. It changes no code by itself.

## Prerequisites

- Working tree at HEAD `837b0c1`, branch `feature/012-role-portal-foundation`; Spec 023 + 024 folders present.
- `cd academy-dashboard-discovery/app`.
- Record the current guards BEFORE any edit (baseline):
  ```bash
  find academy-dashboard-discovery/app/public -maxdepth 1 -name "*.html" | wc -l   # expect 77
  grep -c "لوحة الطالب"  academy-dashboard-discovery/app/src/locales/ar.prt.js       # student note present (pre-fix)
  grep -c "لوحة العائلة" academy-dashboard-discovery/app/src/locales/ar.prt.js       # family note (must stay)
  grep -c "لوحة المعلم"  academy-dashboard-discovery/app/src/locales/ar.prt.js       # teacher note (must stay)
  ```

## Implementation order (respecting dependencies)

1. **B-01** (Must) — edit `ar.prt.js:297-298` + `en.prt.js:294` child-view note → child-view/family-owned wording; then rebake.
2. **B-05 / B-03** (Should, optional UI) — if Option A chosen: add `library` planned item to `ROLE_NAV.teacher` (+ `prt.nav.tch.library` ar/en); add the `notifications` icon-button to `portal-shell.js` topbar (reuse `data-action="notifications"`); then rebake.
3. **B-11** (Should) — additive `app.css` living-layer density fixes (D-01/06/07/08/10/11/12/13; D-04/05/09 only with declared supersession); empty-state copy in ar/en; rebake.
4. **B-02 / B-04 / B-06 / B-07 / B-08 / B-09 / B-10** (records) — documentation edits (no rebake needed): 023 append-only notes, 016 pay-free contract exemption, README/CLAUDE provenance, moved-vs-deleted determination.
5. Re-pin smoke where a structural count changed (B-05 planned-count 6→7; any B-11 probe); add the optional B-01 role-model bodyText guard.

## Build

```bash
cd academy-dashboard-discovery/app
npm run build          # rebakes public/*.html from src (locales + css); MUST keep 77 files
```

## Verify — the acceptance gates (all MUST pass)

```bash
# --- Public HTML count unchanged ---
find public -maxdepth 1 -name "*.html" | wc -l                      # == 77

# --- B-01: forbidden student-primary wording gone; family/teacher notes intact ---
grep -RIl "لوحة الطالب"  public/student-*.html                       # == 0
grep -RIl "بوابة الطالب" public/student-*.html                       # == 0
grep -RIl "student dashboard" public/student-*.en.html               # == 0
grep -c "لوحة العائلة" src/locales/ar.prt.js                         # unchanged vs baseline
grep -c "لوحة المعلم"  src/locales/ar.prt.js                         # unchanged vs baseline

# --- Teacher pay-free GLOBAL (three layers) ---
grep -RniE 'salary|salaries|payout|earnings?|compensation|راتب|رواتب|أجر|مستحقات|أتعاب|فلوس|دولار|ريال|جنيه|[$€£]|EGP|SAR|USD' \
  public/teacher-portal.html public/teacher-portal.en.html src/js/pages/teacher-portal.js   # == 0 hits

# --- Family zero-pay ---
# (smoke famPay/payFigure regex over all 18 family bodies must be green)

# --- No fake links / closed hooks ---
grep -RIl 'href="#"' public/*.html                                  # == 0
# no new data-* hook name beyond the closed set (reuse notifications / is-planned)

# --- Suites ---
npm test                       # full smoke: load count, payHit, famPay, anchors, plannedNavAnchors===0, role-model pins
npm run test:smoke             # (alias) structural DOM probes green
npm run test:a11y              # axe critical==0, serious==0
node tests/screenshots/capture.cjs   # visual proofs
```

## Screenshot proofs to capture (per `research.md` D16)

- child-view page after B-01 (note reads «عرض الابن»-family wording)
- family note + teacher note (unchanged proof)
- role-portal topbar (if B-03 gate added — honest Soon gate)
- teacher home (if B-05 `library` item added — «قريبًا» non-anchor)
- hub / family-portal / teacher-portal / student-portal after the density pass
- dark-mode hero (if D-06 touched)
- mobile-390 proof

## Smoke re-pin checklist (declared, per `research.md` D15)

- [ ] B-01: structural probes unchanged (note is a `pt-note`); optional one-line guard: child-view `#page-body` bodyText does NOT match `/لوحة الطالب|بوابة الطالب|student dashboard/i`.
- [ ] B-05 Option A: ROLE_NAV.teacher planned-count expectation 6 → 7; `plannedNavAnchors===0` still holds.
- [ ] B-03 Option A: shell-anchor multiset still holds; the new notifications control is a non-anchor `is-soon` (does not affect anchor counts).
- [ ] B-11: any changed structural count re-pinned with a stated reason.
- [ ] `payHit`, `famPay`/`payFigure`, and ALL admin asserts remain BYTE-VERBATIM.
- [ ] The Spec 022 documented extraction-hash baseline for the 5 affected internals is declared superseded (append-only note in `specs/022-…/`).

## Stop conditions (abort + report — per `research.md` D22)

Public HTML ≠ 77 · new page/hook/storage key needed · teacher/family pay token appears · student-primary wording remains · family/teacher note changed · B-03 needs a new engine (→ Option A2/B) · live-room can't be recorded honestly · B-11 becomes a redesign · unexplained smoke hash change · role model regresses.

## Done criteria

All gates above green; B-01…B-04 (Must) implemented/recorded; B-05…B-11 (Should) implemented or explicitly deferred with a reason; the correction-status notes appended to Spec 023. Spec 025 (Teacher Internal Pages) is then GO per the Spec 023 gate.
