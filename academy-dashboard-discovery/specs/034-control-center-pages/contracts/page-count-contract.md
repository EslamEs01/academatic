# Contract: Page Count — Spec 034

**Binding.** Before **103** → After **113** (+10). 5 new bases × 2 langs.

- New bases: `messages`, `leads`, `tasks`, `announcements`, `time-converter`.
- New public files (10): `{base}.html` + `{base}.en.html` for each.
- No unrelated pages created; no accidental removals; the 103 existing pages remain.
- `build-html.mjs` PAGES gains exactly 5 entries.
- **Verify**: `find public -maxdepth 1 -name '*.html' | wc -l` = 113; each new base appears exactly twice; 0 orphan, 0 missing mirror; smoke route-freeze asserts 113.
