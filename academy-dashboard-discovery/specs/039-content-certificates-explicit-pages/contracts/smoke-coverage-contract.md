# Contract — Smoke Coverage (Spec 039)

## Additive new coverage (no existing assertion weakened)
Per flipped item, in a **fresh browser context**, AR **and** EN:
- `materials` is an implemented `<a>` (`data-nav-status="implemented"`), href resolves to
  `library.html#view=materials` (AR) / `library.en.html#view=materials` (EN); **no «قريبًا», no `aria-disabled`,
  no lock icon**; fresh-load shows exactly one visible tabpanel = Materials.
- `certificateRequests` → `certificates.html#view=requests` / `certificates.en.html#view=requests`; same anchor
  checks; fresh-load shows exactly one visible tabpanel = Requests.
- `books` → `library.html#view=books` / `library.en.html#view=books`; anchor + fresh-load Books panel.
- No external/network request during load.
- `admItems.length === 5`; `admPlanned === 0`; `settingsPlanned === 6`; admin menu = 50.
- `FUTURE_ROUTES.materials` absent (assert via built nav or config-derived check consistent with repo conventions).
- `classSalaryReport` unchanged (disabled + lock); settings items unchanged.

## Declared amendments (the only edits to existing assertions — see protected-test-supersession-contract.md)
1. Repoint the dashboard planned-item probe (~run.cjs 227–230) admin→settings.
2. Correct the ~1636 "5 planned items" message; add `admPlanned === 0`.

## Keep BYTE-VERBATIM
`a31` library/certificates honesty block (tabIds `['materials','books']` / `['templates','requests']`, rows,
gates, `fileInputs===0`, `passwordInputs===0`, `canvas===0`, `noDrag`, tab-switch); `navCount32 === 50` (1300);
`nav010.admItems.length===5 && !includes('banks')` count+banks logic (1636); `truth010.badPlanned` (1669–1679);
link-integrity crawl (1648–1667); finance nav010 (`lockedFin`/`finLinks`/`finMembers`); families/teachers/reports
nav asserts; payHit/tchPay/famPay/payFigure/child-view/no-mutation/FAKE and every unrelated Spec 031–038 assert.

## Do NOT
Broadly refactor tests; weaken any threshold; hide behavior with a hardcoded pass; assert a fake success/mutation.
