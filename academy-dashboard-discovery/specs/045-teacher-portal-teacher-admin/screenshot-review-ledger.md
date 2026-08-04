# Screenshot Review Ledger

**Baseline:** committed Spec-044 matrix 402 captures, console errors=0.  
**Spec-045 requirement:** every one of 22 localized Teacher pages in light desktop/390px, plus dark coverage for all 11 distinct page modules and all material states/interactions.

Final records will use:

| Page | Locale/direction | Theme | Viewport | State | Source owner | Console | Overflow | Clipping | A11y observation | Visual verdict | Defect/correction | Accepted path |
|---|---|---|---|---|---|---|---|---|---|---|---|---|

No record is accepted until the reviewer opens the image at original detail. Existing images establish the pre-implementation comparison; final captures use distinct Spec-045 state labels. **Sol is unavailable this run; Claude Opus is the reviewer and the only acceptance authority**, so "until Sol opens the image" reads as "until Claude opens the image".

---

## Captures completed — resumed run 2026-08-03

**35 frames captured across two passes; console errors = 0; horizontal overflow = 0 on every frame.**

Geometry is measured, not eyeballed: each capture records `document.documentElement.scrollWidth`
against `clientWidth`, so the exact-390px containment claim is a numeric assertion
(`scrollW === clientW === 390` on every mobile frame; `1366/1366` on every desktop frame), not an
impression from looking at a picture.

### Pass 1 — focused verification of the changed surfaces (10 frames)

`sp045-teacher-{ar,en}-mobile` · `sp045-teacher-ar-desktop` · `sp045-teacher-ar-dark-mobile` ·
`sp045-perf-kpi-{ar,en}-mobile` · `sp045-perf-kpi-ar-dark` · `sp045-portal-ar-desktop` ·
`sp045-portal-en-mobile` · `sp045-portal-ar-dark-desktop`

### Pass 2 — matrix for the five accepted scopes (25 frames)

For each of `teacher-portal`, `teacher-schedule`, `teacher-library`, `teacher`, `teacher-performance`:
AR light desktop · AR light 390 · EN light desktop · EN light 390 · AR dark desktop.

Frames live in the gitignored `app/screenshots/` (the project's own capture target), so they add
**zero** untracked files to the working tree.

### Frames Claude personally opened at original detail

| Frame | What was verified |
|---|---|
| `teacher__ar__light__mobile` (pre-change baseline) | Recorded the defect: a ragged seven-row waterfall of 14 identical pills, disabled gates interleaved between live actions, delete alone on a row |
| `sp045-teacher-ar-mobile` | FR-036 fix confirmed: clean two-column grid; priority order daily-work → assignment → communication → navigation → lifecycle → destructive → the three unavailable gates last; all 14 actions visible and unclipped |
| `m-tchr-en-light-390` | Same fix holds in **LTR**; long labels ("Add follow-up note", "Send password reset", "Print · export summary") wrap inside their cells instead of clipping — the `white-space: normal` + `overflow-wrap: anywhere` rules working; `Teacher absent` (amber) vs `Student absent` (coral) distinct by tone **and** icon **and** text |
| `teacher-performance__ar__light__mobile__sp036-sessions-kpi-mobile` (pre-change baseline) | Recorded the defect: the categorical chip occupied its own full-width band, making every repeated record taller |
| `sp045-perf-kpi-ar-mobile` | FR-039 fix confirmed: chip moved into the identity block, one stacked band removed per record; all four count tiles, status chip and profile link preserved; no score/rank/percentage |
| `sp045-portal-ar-dark-desktop` | Dark + RTL: `td-focus` accent renders on the **right** edge (correct for RTL via `border-inline-start`) and stays legible in dark; 7 real quick-tile links, 0 "soon"; the corrected reports card shows no admin-console reference |
| `m-lib-ar-light-390` | `td-gates` confirmed: the two gates render as **one bordered group with a divider**, each keeping its own «يتطلب الخادم» chip, replacing two heavy full-width banners; working search with apply/reset; `td-focus` on the correct RTL edge |
| `management-teachers-1-full` (reference platform) | Grounding for EG-045-10: confirmed the reference's star rating, hour rate, phone, live WhatsApp URL, Compensations/Salary tabs and Left/Acquired tables are all correctly **rejected** by D045-01/02/03, and that its one transferable strength — a grouped action list rather than a pill waterfall — is what the fix adopts |

### Outstanding capture work

The six unfinished scopes (`teacher-students`, `teacher-outcomes`, `teacher-tasks`,
`teacher-reports`, `teacher-profile`, `teachers`) have **not** been captured for this run, and the
state matrix (drawer/modal open, filter applied, empty state, validation, mobile navigation) is not
yet complete for the accepted scopes. Those remain open work, not passes.
