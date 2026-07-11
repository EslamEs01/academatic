# Contract — Page Count

| | Value |
|---|---|
| Before | **115** |
| After | **115** |
| Delta | **0** |
| New page bases | **0** |
| New public HTML files | **0** |

## Rules
- `build-html.mjs` gains **0** PAGES entries (teacher-performance already registered; no new page).
- No standalone add-teacher / sessions-kpi / monthly page.
- `find public -name '*.html' | wc -l` MUST equal **115** post-build.
- Admin-menu item count stays **50** (statuses flip; none added/removed).

## Acceptance
- Smoke `route-freeze` constant stays **115** (no number change).
- All 115 existing files present after build; only `teacher-performance.html`/`.en` bodies change (tabs) + the shared sidebar on admin pages.
