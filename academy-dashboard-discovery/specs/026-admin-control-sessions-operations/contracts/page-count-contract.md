# Contract — Page Count

**MUST**: current = 91; target after build = **97** (91 + `sessions-analysis`/`public-holiday`/`scheduled-actions` ×2). Folds add 0; honest-gate items add 0. No removals, no unrelated additions.

**Acceptance**
- `find public -maxdepth 1 -name '*.html' | wc -l` = 97 after build.
- Smoke count assert updated 91→97.
- The 14 existing teacher pages, all family/student pages, index, and unrelated admin pages still present.
- **STOP** if build ≠ 97 or any page disappears.
