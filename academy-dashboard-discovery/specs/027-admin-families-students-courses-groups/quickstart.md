# Quickstart — Spec 027 (implementation phase)

Reference for the implementation phase (NOT run now). From `academy-dashboard-discovery/app`.

## Build & test
```bash
cd academy-dashboard-discovery/app
npm run build            # expect 97 public HTML (UNCHANGED — zero new pages)
npm test                 # smoke + a11y
npm run test:smoke       # count=97 · row-kebab · enroll/assign/move gates · edit modals · no fake finals
npm run test:a11y        # changed pages + wizard + create/edit modal + assignment drawer + confirm · critical=0 serious=0
node tests/screenshots/capture.cjs
```

## Deep-management honesty re-verify
```bash
# students table now has a row kebab (was 0, families had 16)
grep -c 'data-row-menu' public/students.html                     # expect > 0
# every management verb resolves to modal/drawer/confirm/gate — no bare demo-action toast on Edit
grep -oE 'data-modal-trigger|data-drawer|data-confirm' public/{family,student,course,group}.html | sort | uniq -c
# no fake success wording anywhere (Spec 026 protection)
grep -rEl '\(تجريبي\)|\(demo\)|preview action|بنجاح|successfully' public/*.html | wc -l   # expect 0
# href="#" stays 0
grep -rl 'href="#"' public/*.html | wc -l                        # expect 0
# results/evaluation carry NO computed score/chart
grep -oE 'chart|%|score|rank|percentile' public/student.html | head              # expect none in results/eval body
```

## Role-law re-verify (byte-verbatim green)
```bash
# family PORTAL stays figure-free (admin family.html plan literal is separate/sanctioned single-value)
grep -REl 'مبلغ|سعر|رسوم|ادفع|pay now|[$€£]' public/family-portal*.html public/family-billing*.html && echo "STOP: portal pay"
# no salary/payroll anywhere in admin management pages
grep -REl 'راتب|رواتب|payroll|salary' public/{family,student,course,group,families,students,courses,groups}.html && echo "STOP: payroll"
# no student-primary wording
grep -REl 'لوحة الطالب|بوابة الطالب|student dashboard' public/{student,students}.html && echo "STOP: student-primary"
```

## Impact protection
```bash
# only touched management pages change; portal + admin-ops + index byte-identical
git status --short public/ | sed 's#.*/##' | sort
git diff --stat HEAD -- package.json     # expect 0
# no new page (count stays 97)
find public -maxdepth 1 -name '*.html' | wc -l   # expect 97
```

## Stop conditions
Count ≠ 97 · a new page where a modal/drawer suffices · any M-row unresolved · any fake save/delete/enroll/assign/remove · cross-family transfer fields invented · computed result/eval score/chart · family pay figure · teacher pay token · student-primary wording · `href="#"` · a11y critical/serious · package.json changed · new hook/engine/dependency.
