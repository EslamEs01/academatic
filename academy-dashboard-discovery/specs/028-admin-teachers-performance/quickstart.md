# Quickstart — Spec 028 verification commands

```bash
cd academy-dashboard-discovery/app
npm run build          # expect: 96 static pages → public/ (+ index) = 97 (unchanged, zero new pages)
npm test               # smoke + a11y
npm run test:smoke     # count=97 · teacher kebab · assign pickers · edit/note modals · status/delete confirms · availability drawer · category modal/drawer · no score/chart · no admin-teacher pay figure
npm run test:a11y      # changed teacher pages + modals/drawers/confirm; critical=0 serious=0
node tests/screenshots/capture.cjs
```

## Targeted checks
```bash
# count unchanged (zero new pages; all-teachers-timetable folds into schedule.html)
find public -maxdepth 1 -name '*.html' | wc -l          # expect 97

# teachers card kebab present (was 0)
grep -c 'data-row-menu-kind="teacher"' public/teachers.html   # expect > 0

# assign-teacher pickers baked (course/group + teacher-detail) + availability + category
grep -oE 'data-preview="(crs-assign-teacher|grp-assign-teacher|trn-assign-course|trn-assign-group|trn-availability)"' public/{course,group,teacher}.html | sort | uniq -c

# every teacher management verb resolves to modal/drawer/confirm/gate — no bare demo-action on Edit
grep -oE 'data-modal-trigger|data-drawer|data-confirm' public/teacher.html | sort | uniq -c

# NO computed score/rank/chart on the performance board
grep -oE 'score|rank|percentile|leaderboard|<canvas|chart' public/teacher-performance.html | head   # expect none in the board body

# NO pay figure on the ADMIN teacher surfaces (teacher-performance.html is the sanctioned exempt board — NOT grepped here)
grep -REl 'راتب|رواتب|salary|payroll|payout|compensation|أتعاب|جنيه|ريال|\bEGP\b|\bAED\b|\bEUR\b' public/teachers.html public/teacher.html   # expect no match

# TEACHER PORTAL pay-free (16 files) byte-identical + zero pay tokens
grep -REl 'راتب|رواتب|salary|payroll|payout|أتعاب|[$€£]|جنيه|ريال' public/teacher-{portal,schedule,students,outcomes,tasks,reports,profile,library}*.html   # expect no match
git diff --stat HEAD -- public/teacher-portal.html public/teacher-schedule.html public/teacher-students.html public/teacher-outcomes.html public/teacher-tasks.html public/teacher-reports.html public/teacher-profile.html public/teacher-library.html   # expect 0 (byte-identical)

# the `rating` fixture field stays unsurfaced
grep -oE 'rating' public/teacher.html public/teachers.html public/teacher-performance.html | head   # expect none

# href="#" = 0 · package.json 0-diff · impact
grep -rl 'href="#"' public/*.html | wc -l               # expect 0
git diff --stat HEAD -- package.json                    # expect 0
git diff --name-only HEAD -- 'public/*.html' | sed 's#.*/##' | sort   # only teachers/teacher/teacher-performance/course/group (×2) — portal/admin-ops/027-pages/index byte-identical
```

## Success criteria
Build 97 · smoke PASS with the new teacher deep-management asserts · a11y critical=0 serious=0 · screenshots 0 console errors · teacher portal 16 files byte-identical · payHit/tchPay/famPay/payFigure/child-view/admin-finance byte-verbatim green · no computed score/chart · no admin-teacher pay figure · `package.json` 0-diff · no new hook/engine/page.
