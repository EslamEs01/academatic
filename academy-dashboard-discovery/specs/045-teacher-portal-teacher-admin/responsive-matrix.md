# Responsive and Visual Parity Matrix

Every row requires AR/RTL light desktop + 390px and EN/LTR light desktop + 390px. Dark coverage is required for every row because no two page modules are byte/structure-identical.

| Scope | Desktop priority | 390px transformation / risk | Required state coverage |
|---|---|---|---|
| teacher-portal | daily priority and cross-page navigation | truthful tiles, native nav, long home sequencing | initial, navigation, backend gate |
| teacher-schedule | agenda/week relationship | accepted day-card agenda, no grid squeeze | initial, long week, gate |
| teacher-students | roster plus safe actions | compact identity/action priority | populated, follow-up, safe links |
| teacher-outcomes | workflow plus examples | stacked steps/fields with readable states | initial, backend-required |
| teacher-tasks | task state and monthly plan | prioritized task metadata | populated, gate |
| teacher-reports | summaries and descriptive rows | no four-column compression | populated, gate |
| teacher-library | discovery plus resource cards | visible search/filter and compact metadata | initial, filtered, empty, gates |
| teacher-profile | self identity and preferences | distinct sections/actions, no clipping | initial, backend gate |
| teachers | directory plus direct Add/Categories | card controls, tabs, forms and pagination reachable | directory/filter/empty/add/categories/drawer |
| teacher | profile header/eight tabs/deep content | compact prioritized action grouping and usable tabs | all tabs, drawers, confirmations, policy |
| teacher-performance | three board views/repeated records | reduce tall-card repetition without lost semantics | all tabs, filters, long records |

All scopes also require theme-state preservation, visible focus, zero root overflow, no translated-text clipping, and zero console errors.
