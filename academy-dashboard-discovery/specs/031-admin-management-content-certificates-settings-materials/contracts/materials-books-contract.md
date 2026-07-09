# Contract: Materials / Books

**Purpose**: `library.html` = Content hub (Materials + Books tabs); display-only, no files.

**MUST**:
- **Materials tab**: subject rows (name/name_ar) + Add/Edit name-only backendRequired modal + Delete gate. No files.
- **Books tab**: media rows (name/type-chip/category/publishedAt/views/downloads/status) — `views`/`downloads` authored **count literals** (not computed) + `filter-bar` + category drawer (name-only modal) + Add-Material/Upload/Download/Publish/Delete gates.
- **No `type=file`** (Add-Material file+thumbnail → gate); no download link; no fake publish/delete.
- `materials` nav folds (planned); `books`→implemented→`library.html`.

**Verify**: smoke — library loads AR/EN; Materials + Books tabs render; ≥6 subjects, ≥6 books; category drawer present; no `type=file`; no download href; `figureFree`.

**Status**: Binding. `management-entity-scope.md` Material/Book; `certificate-and-file-scope.md`.
