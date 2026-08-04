# Teacher Domain Visual and State Model

This feature introduces no persisted business entity. It organizes existing authored display records and UI state so their role, meaning, and transitions are explicit and testable.

## TeacherSurface

| Field | Values / rule |
|---|---|
| `scopeId` | Exactly one of the 11 Spec-045 identifiers |
| `role` | `teacher` for eight portal pages; `admin` for three administration pages |
| `routeBase` | Existing frozen page basename |
| `sourceOwner` | One authored page module |
| `localizedConsumers` | Exactly AR and EN generated pages |
| `shell` | Existing role portal shell or admin shell |
| `evidencePacket` | EG-045-01 through EG-045-11 |
| `stateFamilies` | Initial, populated, filter/tab, empty where supported, interaction/backend-required where applicable |

**Invariant:** `teacher-profile` is Teacher self-service; `teacher` is administrator detail; `teacher-performance` is administrator-only.

## TeacherRecord

| Attribute | Classification |
|---|---|
| Name/avatar/subject/status | Authored safe display identity |
| Workload | Authored categorical hint only: light/balanced/high |
| Courses/groups/active-student/session counts | Authored display counts |
| Follow-up/performance signal | Authored categorical label and icon/text |
| Own email | Allowed only on Teacher self-profile |
| Guardian/student private contact/locality | Denied in Teacher scope |
| Salary/pay/compensation/rank/score | Prohibited |

No runtime calculation may turn these fixtures into a score, rank, utilization percentage, or compensation measure.

## LearningRelationship

Connects the Teacher to a safe student, course, group, schedule, session history, outcome, plan/report context, or certificate gate. It carries minimum learning identity only. A relationship may navigate to an existing localized safe route or terminate in a truthful backend/future-owner gate.

## DirectoryViewState

`query`, `statusScope`, `subject`, `workload`, `sortKey`, `sortDirection`, and `page` are ephemeral client-side state over authored records.

Transitions:

1. Initial → all records, deterministic default order, first page.
2. Search/filter/scope change → recompute exact matching set and reset to first valid page.
3. Sort change → reorder the matching set without changing membership.
4. Page change → show the next bounded slice.
5. Zero matches → show one accessible empty state.
6. Clear → restore the exact authored set and default state.

No state mutates Teacher records or persists as backend data.

## LibraryViewState

`query` plus evidenced category/type filter. Transitions mirror DirectoryViewState without pagination unless inventory proves it necessary. Invalid or missing required targets are hard failures.

## PerformanceDisplay

Contains authored `period`, `teacher`, `completed`, `teacherAbsent`, `studentAbsent`, `groups`, `status`, `signal`, `trend`, and descriptive `note`.

**Invariant:** No formula, aggregate score, rank, percentile, rating, chart series, or pay relationship.

## TerminalAction

| Kind | Allowed result |
|---|---|
| Client-side behavior | Visible deterministic state such as filter/tab/menu |
| Navigation | Verified localized route or fragment |
| Safe UI-only state | Non-persistent preview or selection |
| Backend-required | Shared accessible state stating server connection is required and nothing is saved |
| Intentionally unavailable | Clear evidence-based explanation |

Every action has exactly one kind. A dead, misleading, or unclassified action is invalid.

## VisualState

Every surface is tested across locale (`ar`/`en`), direction (`rtl`/`ltr`), theme (`light`/`dark`), viewport (desktop/tablet/390px), and applicable page/interaction state. Locale/theme/responsive changes may not destroy logical filter/tab/input state.

## Validation rules

- AR and EN keys mirror structurally.
- Required route/target/ID records are unique.
- Teacher and student absence keys stay distinct.
- Product-visible pay/rank/fake-success tokens are absent.
- Hidden/private fixture attributes must not enter rendered Teacher payloads.
- All state updates are deterministic and repeatable.
- Generated consumers match their authored owner after canonical build.
