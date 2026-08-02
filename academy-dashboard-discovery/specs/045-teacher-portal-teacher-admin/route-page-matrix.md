# Route and Page Identity Matrix

| Scope | Frozen route pair | Shell / nav identity | Allowed outbound route families | Forbidden identity drift |
|---|---|---|---|---|
| teacher-portal | `teacher-portal(.en).html` | Teacher home | seven Teacher internal pages, portal hub | admin Teacher performance/admin controls |
| teacher-schedule | `teacher-schedule(.en).html` | Teacher schedule | Teacher portal/internal safe links | admin schedule mutation/live join |
| teacher-students | `teacher-students(.en).html` | Teacher students | verified safe student/course/history/schedule/report contexts | guardian/private contact/admin student management |
| teacher-outcomes | `teacher-outcomes(.en).html` | Teacher outcomes | Teacher internal contexts | fake save/propagation |
| teacher-tasks | `teacher-tasks(.en).html` | Teacher tasks | Teacher internal contexts | staff average/ranking/mutation |
| teacher-reports | `teacher-reports(.en).html` | Teacher reports | Teacher internal contexts | salary report/fake export |
| teacher-library | `teacher-library(.en).html` | Teacher library | Teacher internal contexts | fake upload/download |
| teacher-profile | `teacher-profile(.en).html` | Teacher self-profile | Teacher internal/portal hub | admin detail/actions |
| teachers | `teachers(.en).html` | Admin Teacher directory; `#view=directory|add|categories` | teacher detail and existing admin routes | new sidebar domain or private listing |
| teacher | `teacher(.en).html` | Admin Teacher detail; eight tabs | verified `course`, `group`, `student`, `family`, `schedule#view=timetable`, `attendance` destinations | self-profile identity/pay/private sections/fake impersonation |
| teacher-performance | `teacher-performance(.en).html` | Admin performance; three tabs | verified admin Teacher profile link | portal exposure/ranking route |

The current route count stays 57 AR/EN pairs plus redirect index. Any unresolved link is a STOP or a truthful unavailable state—not permission to invent a route.
