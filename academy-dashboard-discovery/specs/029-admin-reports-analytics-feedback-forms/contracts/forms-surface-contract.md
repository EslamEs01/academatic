# Contract — Forms Surface (R-C/R-D)

**Guarantee**: display-only forms/surveys list; no form engine; no fake submission.
- FORMS rows: title, authored question count, authored response count, status, default badge. Counts are literals (NO aggregation).
- Create/Edit form = `data-modal-trigger` backendRequired.
- Per-student progress form = the existing student.html Evaluation tab (not duplicated); its Approve reclassified (R-F).
**Verify (smoke)**: counts authored; create = honest modal; no fake submit; no response engine.
**Fail if**: a form saves; a response count is computed; a duplicate form engine appears.
