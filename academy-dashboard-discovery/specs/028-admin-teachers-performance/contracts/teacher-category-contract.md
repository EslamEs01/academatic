# Contract — Teacher Category (Spec 028)
**MUST**: teacher categories (grounded: CRUD + assign-members) surface as an in-flow Create/Edit `data-modal-trigger` modal + a display-only assign-members `data-drawer` picker (reuse the Spec-027 family-category mechanism); `teacherCategories` nav stays planned — NO standalone page.
**Acceptance**
- Create/Edit category opens a modal → backendRequired; assign-members opens a display-only candidate drawer → backendRequired.
- `nav.config.js teacherCategories` stays `status:'planned'` (non-anchor); count stays 97.
- No fake category create/edit/delete/assign; no persisted member selection.
- **Fail** on a new teacher-categories page or a fake category mutation.
