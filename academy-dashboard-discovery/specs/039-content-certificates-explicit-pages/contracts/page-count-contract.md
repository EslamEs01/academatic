# Contract — Page Count & Menu Freeze (Spec 039)

| Metric | Before | After | Δ |
|---|---|---|---|
| Public HTML files | 115 | 115 | 0 |
| New page bases | — | 0 | 0 |
| New public HTML files | — | 0 | 0 |
| Admin menu items (`.nav-panel .nav-item`) | 50 | 50 | 0 |
| Admin category items | 5 | 5 | 0 |
| Admin category planned «قريبًا» | 2 | 0 | −2 |
| Settings category planned | 6 | 6 | 0 |

## Rules
- `scripts/build-html.mjs` PAGES **0-diff** — no `materials`/`certificateRequests` page entry; no standalone
  `materials.html`/`certificate-requests.html`.
- No duplicate route, no duplicate page.
- Status flip changes item *status*, not DOM item *count* → `navCount32===50` (smoke line 1300) and
  `admItems.length===5` (line 1636) both stay true byte-verbatim.
- `find public -maxdepth 1 -name '*.html' | wc -l` = **115** before and after build.

## Acceptance
Build emits exactly 115 files; admin menu = 50; admin planned = 0; settings planned = 6.
