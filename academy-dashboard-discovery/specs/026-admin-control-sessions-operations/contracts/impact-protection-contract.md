# Contract — Impact Protection

**MUST**: only the touched admin pages/components + the 3 new pages change. All 49 portal files, index, and unrelated admin pages stay byte-identical. `package.json` unchanged; no backend/dependency/engine/new-hook.

**Acceptance**
- `git diff --stat HEAD -- package.json` = 0.
- Portal built output (student/family/teacher/hub/family-child) byte-identical (they don't bake admin components).
- Unrelated admin pages (e.g. gallery, teacher-performance) byte-identical.
- Touched admin pages change ONLY at the reclassified action nodes + fold bands (byte-diff review).
- No new `data-*` hook or storage key.
- **STOP** on package.json change, new dependency, new engine, unexpected byte-diff, or a new hook without justification.
