# Contract — Impact Protection

**MUST**: only the touched management pages/components change. All portal pages, the Spec-026 admin ops pages (sessions-analysis/public-holiday/scheduled-actions), and index stay byte-identical. `package.json` unchanged; no backend/dependency/engine/new-hook/new-page.

**Acceptance**
- `git diff --stat HEAD -- package.json` = 0.
- Portal built output (student/family/teacher/hub + internals) byte-identical; admin ops pages byte-identical; index byte-identical.
- Count stays 97 (no new page).
- Touched management pages change ONLY at the reclassified/added action nodes (byte-diff review).
- No new `data-*` dispatch hook or storage key (the studentMenu reuses the row-menu hook).
- **STOP** on package.json change, new dependency/engine/page, or an unexpected byte-diff.
