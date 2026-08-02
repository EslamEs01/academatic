# Teacher Domain Inventory

| ID | Scope | Role | Route base | Source owner | AR consumer | EN consumer | Primary sections / state | Evidence |
|---|---|---|---|---|---|---|---|---|
| TD-01 | teacher portal | Teacher | `teacher-portal` | `app/src/js/pages/teacher-portal.js` | `teacher-portal.html` | `teacher-portal.en.html` | home identity, today, next class, follow-up, roster, outcome flow, history, tasks, materials, timetable, rubric, requests, account | EG-045-01 |
| TD-02 | teacher schedule | Teacher | `teacher-schedule` | `teacher-schedule.js` | `teacher-schedule.html` | `teacher-schedule.en.html` | today, next class, preparation, week, live/availability gates | EG-045-02 |
| TD-03 | teacher students | Teacher | `teacher-students` | `teacher-students.js` | `teacher-students.html` | `teacher-students.en.html` | safe roster, learning signals, follow-up, safe relationship navigation | EG-045-03 |
| TD-04 | teacher outcomes | Teacher | `teacher-outcomes` | `teacher-outcomes.js` | `teacher-outcomes.html` | `teacher-outcomes.en.html` | workflow, five capture concepts, recent examples, truthful save gate | EG-045-04 |
| TD-05 | teacher tasks | Teacher | `teacher-tasks` | `teacher-tasks.js` | `teacher-tasks.html` | `teacher-tasks.en.html` | authored task board, states/due windows, monthly plan, complete gate | EG-045-05 |
| TD-06 | teacher reports | Teacher | `teacher-reports` | `teacher-reports.js` | `teacher-reports.html` | `teacher-reports.en.html` | teaching counts, descriptive progress, rubric dimensions, export gate | EG-045-06 |
| TD-07 | teacher library | Teacher | `teacher-library` | `teacher-library.js` | `teacher-library.html` | `teacher-library.en.html` | authored resources, type/status/course, search/filter, upload/download gates | EG-045-07 |
| TD-08 | teacher profile | Teacher self | `teacher-profile` | `teacher-profile.js` | `teacher-profile.html` | `teacher-profile.en.html` | self identity/own email, subjects, availability, preferences, account gates | EG-045-08 |
| TD-09 | teachers admin listing | Admin | `teachers` | `teachers.js` | `teachers.html` | `teachers.en.html` | directory, direct Add, direct Categories, filters/sort/page, previews/edit/gates | EG-045-09 |
| TD-10 | teacher admin detail | Admin | `teacher` | `teacher.js` | `teacher.html` | `teacher.en.html` | profile header, eight tabs, deep links, actions, policy/assign/availability/confirmations | EG-045-10 |
| TD-11 | teacher performance | Admin only | `teacher-performance` | `teacher-performance.js` | `teacher-performance.html` | `teacher-performance.en.html` | overview, session KPI, monthly, filters, categorical fixtures | EG-045-11 |

## Shared consumers and owners

- Portal shell/navigation: `components/portal-shell.js`, `components/portal-page.js`, `fixtures/portal.js`, AR/EN portal locales.
- Admin teacher composition: `components/teacher-actions.js`, `teacher-signals.js`, `teacher-status.js`, `ui.js`, teacher fixtures, AR/EN Teacher locales.
- Shared interactions: `components/interaction-system.js`, `preview-drawer.js`, `confirm-modal.js`, `dropdown.js`, and `enhance.js`; inherited from 044.
- Visual system: `src/styles/app.css`.
- Generator: `scripts/build-html.mjs`.

## Deterministic inventory requirements

The final inventory rejects missing scopes/owners/consumers, duplicates, unresolved routes/links/targets, generated/source mismatch, missing locale pair, missing page body, and parser/fallback errors. A discovered control is never silently omitted.
