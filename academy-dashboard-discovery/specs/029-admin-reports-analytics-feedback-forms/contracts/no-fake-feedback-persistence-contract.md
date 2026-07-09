# Contract — No Fake Feedback Persistence

**Guarantee**: no feedback/form is saved, submitted, approved, or deleted for real.
- Create/Edit feedback/category/form = backendRequired modal (nothing saved).
- Approve/Delete feedback = confirm → backendRequired (no status flip, no DOM removal).
- Add-feedback (outcome) = backendRequired modal (R-E).
- eval.approve = backendRequired confirm (R-F).
**Verify (smoke)**: no row is added/removed on interaction; every write ends backendRequired.
**Fail if**: any feedback/form write mutates the DOM or claims success.
