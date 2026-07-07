# Dead-UI Register — Spec 026

Every action currently dead / missing-modal / missing-page / misleading / fake-looking / unexplained-disabled / planned-without-reason / `href="#"` / empty-anchor — with a mandatory resolution. **No row may remain unresolved.**

**Headline**: there are **zero truly-dead** controls (0 `href="#"` sitewide; catch-all toast; planned nav = honest `data-coming-soon`). Every row below is **misleading** (implies persistence it does not perform) or **missing-and-planned**, not dead. Resolution class: reclassify to an honest `backendRequired` final step (reusing the CLOSED `data-*` hook set — no new hook/key), or route to an owner spec behind an honest gate.

## Tier 1 — Misleading Create/Add primaries (fake-looking persistence) → reclassify in 026

| ID | Page | Action | Problem | Evidence | Resolution | Fix now? | Owner | Acceptance check |
|---|---|---|---|---|---|---|---|---|
| DU-01 | sessions | New session | Header primary → «preview action» toast; persists nothing | `sessions.js:81` | Open create modal/drawer; final Save = `backendRequired` | yes | 026 | smoke: create opens modal; final = backendRequired gate |
| DU-02 | students | Add student | same | `students.js:85` | create modal → `backendRequired` final | yes | 026 | smoke |
| DU-03 | teachers | Add teacher | same | `teacher-actions.js:17-19` | create modal → `backendRequired` | yes | 026 | smoke |
| DU-04 | courses | Add course | same (custom toast copy) | `courses.js:56` | create modal → `backendRequired` | yes | 026 | smoke |
| DU-05 | groups | Add group | same | `groups.js:69` | create modal → `backendRequired` | yes | 026 | smoke |
| DU-06 | dashboard | New session / Add session | hero + empty-state → preview toast | `welcome.js:32`; sessions empty-state | create modal → `backendRequired` (shared w/ DU-01) | yes | 026 | smoke |
| DU-07 | add-family | Save (final wizard step) | reads as "create family"; creates nothing | `wizard.js:33` | review/confirm → `backendRequired` final | yes | 026 | smoke: wizard Save = backendRequired |
| DU-08 | add-family | Add another child | preview toast | `add-family.js:46` | inline add is static OR `backendRequired` | yes | 026 | smoke |

## Tier 2 — Misleading Edit/Message/Note/Attend/Print verbs (shared components) → reclassify in 026

| ID | Surface (reused across ~8 pages) | Actions | Problem | Evidence | Resolution | Fix now? | Owner | Acceptance check |
|---|---|---|---|---|---|---|---|---|
| DU-09 | appointment drawer | Edit, Notify | `data-demo-action` toast; no persist | `appointment-details.js:62-63` | prefilled/read-only modal → `backendRequired` final | yes | 026 | smoke: drawer Edit = backendRequired |
| DU-10 | outcome drawer | Attend, Feedback, Notify, Reverse | preview toast | `outcome-details.js:60-70` | modal/gate → `backendRequired` (no fake attendance/outcome write) | yes | 026 | smoke |
| DU-11 | row kebab | Edit, Cancel | preview toast (View is real) | `enhance.js:94-101` | Edit → modal→`backendRequired`; Cancel → confirm→`backendRequired` | yes | 026 | smoke |
| DU-12 | family kebab | Edit | preview toast | `enhance.js:107` | modal → `backendRequired` | yes | 026 | smoke |
| DU-13 | family / student pages | Edit, Add child, Add note, Message | preview toast | `family.js:101,142,164-165`; `student.js:152,177-178` | modal/gate → `backendRequired` | yes | 026 | smoke |
| DU-14 | course/group | Edit course/group, Add students | preview toast | `course-group-actions.js:20,30,34` | modal → `backendRequired` | yes | 026 | smoke |
| DU-15 | teacher | Edit, Message, Note | preview toast | `teacher-actions.js:24-27` | modal/gate → `backendRequired` | yes | 026 | smoke |
| DU-16 | settings | Save profile; alert toggles | preview toast / flip w/o persist | `settings-section.js:31`; `fixtures/settings.js:8,21-22` | Save → `backendRequired`; toggles → `backendRequired` or `display-only` | yes | 026 | smoke |
| DU-17 | reports | Print report | `data-demo-action` toast — inconsistent with Export CSV/PDF (honest gate) beside it | `report-actions.js:29-35` vs `:37-39` | Print → `backendRequired` (align) | yes | 026 | smoke: Print = backendRequired |
| DU-18 | finance | Print (page + drawer) | preview toast — inconsistent with Create-invoice/Export (honest gate) | `finance-actions.js:39-46` vs `:51-53` | Print → `backendRequired` (align); no pay math | yes | 026 | smoke: Print = backendRequired; finance figures Spec-009 invariant |

## Tier 3 — Misleading confirm→"success" writes (warn but fake success) → reword final in 026 (secondary)

| ID | Surface | Actions | Problem | Evidence | Resolution | Fix now? | Owner |
|---|---|---|---|---|---|---|---|
| DU-19 | shared confirm modal | Cancel session · Suspend/Stop family · Remove student · Notify · Reset data · Schedule report · Record payment · Mark paid · Send reminder | `data-confirm` opens a real modal but the confirm CTA shows a **success** toast → implies the write happened | `enhance.js:331-358`; `outcome-details.js`, `finance-actions.js`, `family.js`, `course-group-actions.js`, `report-actions.js`, `teacher-actions.js`, `settings-section.js` | Keep the confirm modal; make the CTA/message state the change **needs the server** (`backendRequired`); never a "done/saved/cancelled" success toast; never DOM-fake the mutation | yes (reword) | 026 |

## Tier 4 — Genuinely misleading filter widget → wire or reword in 026

| ID | Page | Action | Problem | Evidence | Resolution | Fix now? | Owner |
|---|---|---|---|---|---|---|---|
| DU-20 | dashboard | "Today's Sessions" **Apply** (`data-action="apply-filter"`) + **Clear** dismiss chip (`data-action="clear-filter"`) | Unhandled `data-action` → emit a «preview action» toast instead of filtering/clearing; imitate a real filter but do nothing | census: `data-action="apply-filter"/"clear-filter"` unhandled in `enhance.js` switch (falls to default toast) | Wire to the real `data-filter` engine (`real-static-filter`) OR reword/remove the widget so it doesn't imitate a filter (`remove-or-reword`) | yes | 026 |

## Tier 5 — Missing pages (planned nav) → build grounded ops subset or route to owner (already honest gates today)

| ID | Planned target | Current | Legacy grounding | Resolution | Owner |
|---|---|---|---|---|---|
| DU-21 | sessions-analysis, public-holiday, scheduled-actions, total-queues (fold), schedule-requests inbox | `data-coming-soon` gate (honest) | `management-sessions-analysis.md`, `-public-holiday.md`, `-scheduled-actions.md`, `-total-queues.md`, `-schedule-*-response.md` | **Build** the grounded operational subset in 026 impl phase (display-only stat/list; writes gated); keep others honest planned | 026 |
| DU-22 | leads, tasks, messages, announcements, time-convertor | `data-coming-soon` gate (honest) | grounded but comms/CRM/utility, not core ops | Keep honest planned gate now; build only if planning bounds them into 026 ops; else route | 026 (bound in planning) / else 029/031/future-backend |

## Tier 6 — Excluded-by-law (never surfaced as a build target)

| ID | Item | Reason | Resolution |
|---|---|---|---|
| DU-23 | Session "Direct Links" / real live room; "(3.00 Fine)" / "Active & unpaid" tint | fake live room (G13); pay-signal leak (M-14) | `intentionally-excluded`; keep out; join = `backendRequired`/future-backend only |
| DU-24 | Tickets "Average" column; any computed score/rank | no-score law (M-13) | excluded; authored board carries no computed metric |
| DU-25 | Chat send/compose | never captured (M-02); no fake chat | `future-backend` gate only; no teacher chat page |

## Resolution summary
- **0** rows remain unresolved. **0** dead buttons / `href="#"` / empty anchors exist to fix.
- Tiers 1–4 (misleading persistence + the one filter widget) = the **Layer-B reclassification** work, done by editing ~9 primaries + ~8 shared components + rewording the confirm finals + wiring/rewording one widget — all with the **closed `data-*` hook set** (no new hook/storage key).
- Tier 5 = Layer-A build (grounded ops subset) / honest planned gates.
- Tier 6 = excluded-by-law, carried as guards into the 026 contracts.
