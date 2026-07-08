# Contract — Teacher Availability (Spec 028)
**MUST**: teacher availability renders as a display-only weekly day/time-window list in a `data-drawer="trn-availability"` drawer; Add/Update/Delete are `backendRequired` gates; NO invented recurrence/exception rules (per-date exceptions live on the shipped `public-holiday.html`).
**Acceptance**
- The availability drawer shows day-pair + time-pair rows from the fixture (display-only).
- Add/Update/Delete/Not-Available/Available = `data-disabled-reason` backendRequired gates; no fake schedule mutation.
- No richer scheduling than the captured shape; no calendar library/engine.
- **Fail** on a fake availability write, invented recurrence, or a new scheduling engine.
