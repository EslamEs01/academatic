# Future-Owner Register (Spec 035)

Capabilities that legacy showed but Spec 035 will NOT build (they need a real backend or fall outside the four scoped items). Recorded so nothing is silently dropped.

| Capability | Legacy evidence | Why deferred | Honest treatment in 035 | Owner |
|---|---|---|---|---|
| **Family-category CRUD** (create / rename / delete a category) | `management-categories-families-create.md` (name/status/description store); delete POST `.../{id}/delete` | Requires category persistence (write DB) | Not added; `families.html` shows browse-by-category + display-only reclassify preview | **future-backend** (a create-category form could later be a `formDrawer` with a gated Save, like Spec-032 create forms) |
| **Assign families to a category** (persisted) | `management-categories-families-2-assign.md` ("Choose Families", `member_id[]`) | Requires roster/assignment persistence | The `fam-cat` reclassify drawer already previews assignment with a **backendRequired** Save; no persistence | **future-backend** |
| **Live availability matching engine** (real `search-available-teacher` query) | `management-search-schedule.md:72-91` (POST to `search-available-teacher`) | Requires a scheduling/availability backend | `schedule-search.html` shows the search form + authored candidate results + client-side facet narrowing; Book/Assign = **backendRequired** | **future-backend** |
| **Book / assign a found slot** (persisted) | legacy "Search" → pick teacher → book | Requires schedule-write backend | `backendRequired` gate on the final | **future-backend** |
| **Aggregate student-results board** (all students) | *No legacy page* (016/027 audits) | No honest content without computed aggregates (forbidden) | Deep-link to the per-student `student.html#view=results` display tab | **N/A — deep-link resolves it; no board** |
| **Aggregate student-evaluation board** (all students) | *No legacy page* | Same | Deep-link to `student.html#view=evaluation` | **N/A — deep-link resolves it** |
| **Student narrative report / "Send Report" workflow** | `management-forms-students.md:209` ("Describe student's achievement…"); `management-student-1.md:794` "Total Report" | Report authoring = a create/persist workflow; already surfaced (display-only) via the Reports/Evaluation surfaces | Not expanded in 035 | **Spec 029 (reports/feedback) — already display-only** |
| **Parent-manager meeting-feedback log** | `management-families-feedback.md` (meeting log + report form) | A feedback workflow; owned by the reports/feedback surface | Not in scope | **Spec 029 (report-feedback) — already built display-only** |
| **"Request Result" trial-response inbox** | `management-schedule-trials-response.md` (trial-scheduling response, NOT academic results) | A separate scheduling inbox; unrelated to studentResult | Not in scope (do not conflate with نتائج الطلاب) | **future-backend / ops** |

## Note on naming collisions (must not conflate)
- Legacy **"Request Result"** = a trial-scheduling response inbox (`schedule-trials-response`), **not** academic results. `studentResult` / نتائج الطلاب maps to the qualitative results content in the student profile, resolved by the Results-tab deep-link.
- Legacy **"Teachers Schedule"** (timetable browse) ≠ **"Search Schedule"** (availability finder). `scheduleSearch` maps to the latter → the new standalone page.
