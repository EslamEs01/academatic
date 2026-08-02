# Page State Matrix

| Scope family | Initial/populated | Filter/tab | Empty | Interaction | Backend-required | Validation/error/loading |
|---|---|---|---|---|---|---|
| Portal home | required | navigation state | not invented | native mobile nav | existing gates | no fake loading/error |
| Schedule | required | day/week context | existing zero-state if fixture supports | none page-local | live/availability | no fake loading |
| Students | required | safe navigation/context | existing zero-state if supported | none page-local | certificate/report future gates | no invented form |
| Outcomes | required | workflow/recent | existing zero-state if supported | shared gate state | outcome save | validation only if a real editable form exists |
| Tasks | required | authored statuses | supported no-task state | none page-local | completion/assignment | no fake loading |
| Reports | required | descriptive groupings | supported no-report state | none page-local | export/download | no fake loading |
| Library | required | query/category/type | required no-results | filter controls | upload/download | no fake loading |
| Self-profile | required | section state | not invented | shared backend gate | photo/profile/password | values preserved if editable state exists |
| Directory | required | search/scope/sort/page + three tabs | required no-results | drawers/menus/direct pages | save/assign/edit | real form validation via Spec 044 |
| Admin detail | required | eight tabs | authored per-tab empty states | drawers/modals/menus/confirmations | edit/note/assign/policy/etc. | Spec-044 preservation |
| Performance | required | three tabs/filters | existing no-match state | filters/profile navigation | one existing gate if retained | no fake loading/error |

Loading is shown only if real asynchronous client work exists; current inventory proves none, so no Spec-045 loading state is invented.
