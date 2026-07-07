# Contract — Enrollment / Assignment

**MUST**: every enroll/assign/move op opens a display-only candidate picker (drawer or modal) whose final Enroll/Assign/Move is a `backendRequired` gate. The candidate list never persists a selection; the DOM roster never changes.

**Acceptance**
- Enroll-in-course, assign-to-group, add-students-to-course/group, move-between-groups → picker opens → backendRequired final.
- Picker candidate list is display-only (reuse `openSheet` baked `<template>`); no checkbox persists, no roster mutation.
- Cross-family transfer = honest gate only (no legacy route; no invented fields).
- **Fail** on any fake enroll/assign/remove/move or persisted selection.
