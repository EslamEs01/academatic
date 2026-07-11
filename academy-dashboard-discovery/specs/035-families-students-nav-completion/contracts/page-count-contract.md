# Contract — Page Count

| | Value |
|---|---|
| Before | **113** |
| After | **115** |
| Delta | **+2** |
| New page bases | **1** (`schedule-search`) |
| New public HTML files | **2** (`schedule-search.html`, `schedule-search.en.html`) |

## Rules
- `build-html.mjs` gains exactly **one** PAGES entry (`schedule-search`). No other entry added or removed.
- No standalone page for familyCategories / studentResult / studentEvaluation.
- `find public -name '*.html' | wc -l` MUST equal **115** post-build.
- Admin-menu item count stays **50** (statuses flip; no item added/removed).
- Build log line count = 114 static pages (+ index) → 115 files incl. the two new.

## Acceptance
- Smoke `route-freeze` constant updated 113→115 (the ONE sanctioned count amendment).
- No accidental page removal: all 113 existing files still present after build.
