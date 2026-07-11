# Quickstart — Spec 039 implementation & verification workflow (DESCRIPTION ONLY — do not execute here)

The later `/speckit.implement` step follows this workflow. `/speckit.plan` does NOT run it.

## 0. Preflight (baseline gate)
```bash
git branch --show-current                 # feature/012-role-portal-foundation
git rev-parse --short HEAD                 # 4cbcb31 (or committed successor)
git status --short                         # only .specify/feature.json + specs/039…/
find academy-dashboard-discovery/app/public -maxdepth 1 -name '*.html' | wc -l   # 115
cd academy-dashboard-discovery/app && npm run build && npm run test:smoke && npm run test:a11y
```
Capture the non-destructive impact baseline (before any source edit):
```bash
# for each public/*.html: extract #page-body, normalize, md5 → scratchpad/baseline-md5.txt
```

## 1. The one source edit — `src/js/nav.config.js`
- Line 100 `materials`: `status:'planned'` → `route:'library.html#view=materials'`.
- Line 103 `certificateRequests`: `status:'planned'` → `route:'certificates.html#view=requests'`.
- Line 101 `books`: `route:'library.html'` → `route:'library.html#view=books'`.
- `FUTURE_ROUTES` (line ~144): remove the `materials: 'library.html'` entry.
- The build-time nav guard (implemented⇒route) must still pass.

## 2. Tests (declared amendments + additive)
- `tests/smoke/run.cjs`:
  - Amendment 1: repoint the planned-item probe (~227–230) admin→`settings`; update the adjacent comment.
  - Amendment 2: fix the ~1636 message text; add `admPlanned === 0` (mirror famPlanned==0 at 1387).
  - Additive: per-item route asserts (materials→`library(.en).html#view=materials`; certificateRequests→
    `certificates(.en).html#view=requests`; books→`library(.en).html#view=books`) — real anchor, no aria-disabled,
    no lock; fresh-context AR/EN fresh-load opens the correct single visible tabpanel; FUTURE_ROUTES.materials
    absent; classSalaryReport/settings unchanged; admin items 5 / planned 0 / menu 50.
- `tests/a11y/run.cjs`: additive rows (library `#view=materials`/`#view=books`, certificates `#view=requests`;
  AR/EN light/dark; mobile 390; open Materials add/edit drawer, library category/item drawer, cert review/create
  drawer). critical=0 serious=0.
- `tests/screenshots/capture.cjs`: additive frames (Materials tab, Books tab via refined link, Requests tab; AR/EN;
  dark; mobile 390; request-review drawer; sidebar showing implemented anchors). 0 console errors.

## 3. Build + verify
```bash
cd academy-dashboard-discovery/app
npm run build            # → 115 pages, 0 raw keys, locale parity
npm run test:smoke       # PASS (declared amendments + additive)
npm run test:a11y        # critical=0 serious=0
node tests/screenshots/capture.cjs   # 0 console errors
```

## 4. Impact proof (non-destructive)
```bash
# rebuild, re-extract #page-body md5 per page, diff vs scratchpad/baseline-md5.txt
# EXPECT: only library.html/.en + certificates.html/.en + every admin page differ ONLY in the shared sidebar;
#         #page-body of library/certificates + all other admin bodies + 16 portals + index BYTE-IDENTICAL.
git diff --stat -- academy-dashboard-discovery/app/src   # expect only nav.config.js
git diff -- academy-dashboard-discovery/app/package.json # empty
```
Do NOT use git stash/reset/checkout-discard/branch-switch. Use a captured md5 snapshot (or a detached temporary
worktree at HEAD), removing only a temporary worktree if one was used.

## 5. Docs
Update `screenshots/REVIEW.md`, `README.md`, `CLAUDE.md` (active-feature pointer), and
`specs/039…/implementation-status.md`. No commit / no push (watcher commits).

## Expected final diff surface
- Source: `src/js/nav.config.js` only.
- Tests/docs: `tests/smoke/run.cjs`, `tests/a11y/run.cjs`, `tests/screenshots/capture.cjs`, `screenshots/REVIEW.md`,
  `README.md`, `CLAUDE.md`, spec 039 status.
- Generated: `public/*.html` shared-sidebar anchors only (bodies byte-identical); count stays 115.
