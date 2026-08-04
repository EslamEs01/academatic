# Source and Generated Consumer Matrix

| Source owner | Generated AR | Generated EN | Supporting authored dependencies | Build/parity rule |
|---|---|---|---|---|
| `pages/teacher-portal.js` | `public/teacher-portal.html` | `public/teacher-portal.en.html` | portal fixture/shell/page, portal locales, app.css | both consumers regenerated together |
| `pages/teacher-schedule.js` | `teacher-schedule.html` | `teacher-schedule.en.html` | portal page/fixtures/locales/styles | same structure, localized direction/copy |
| `pages/teacher-students.js` | `teacher-students.html` | `teacher-students.en.html` | safe student fixtures/portal locales/styles | private fields absent from both |
| `pages/teacher-outcomes.js` | `teacher-outcomes.html` | `teacher-outcomes.en.html` | portal fixtures/locales/styles | absence keys distinct in both |
| `pages/teacher-tasks.js` | `teacher-tasks.html` | `teacher-tasks.en.html` | portal fixtures/locales/styles | authored states equal |
| `pages/teacher-reports.js` | `teacher-reports.html` | `teacher-reports.en.html` | portal fixtures/locales/styles | descriptive report parity |
| `pages/teacher-library.js` | `teacher-library.html` | `teacher-library.en.html` | portal fixtures/locales/styles | resource/filter parity |
| `pages/teacher-profile.js` | `teacher-profile.html` | `teacher-profile.en.html` | portal fixtures/locales/styles | self-only identity parity |
| `pages/teachers.js` | `teachers.html` | `teachers.en.html` | teacher actions/status/signals, fixtures, Teacher locales, styles | D1 direct surfaces and record sets equal |
| `pages/teacher.js` | `teacher.html` | `teacher.en.html` | shared teacher actions/interactions/fixtures/locales/styles | eight-tab and target parity |
| `pages/teacher-performance.js` | `teacher-performance.html` | `teacher-performance.en.html` | performance fixtures/Teacher locales/styles | categorical fixtures and tabs equal |

Generated HTML and copied runtime assets are build outputs. No executor receives generated HTML as an independent authored file.
