# Quickstart — Spec 026 (implementation phase)

Reference for the implementation phase (NOT run now). All from `academy-dashboard-discovery/app`.

## Build & test
```bash
cd academy-dashboard-discovery/app
npm run build            # expect 97 public HTML (91 + 6 new AR/EN)
npm test                 # smoke + a11y
npm run test:smoke       # count=97 · no href="#" · no dead buttons · action-completion asserts · role laws
npm run test:a11y        # 3 new pages + modal + drawer · critical=0 serious=0
node tests/screenshots/capture.cjs   # new pages + modals/drawers + gate + mobile + dark
```

## Pay-free / zero-pay / child-view re-verify (must stay green, byte-verbatim)
```bash
# teacher pages: zero pay tokens
grep -REn 'salary|salaries|pay|payout|earnings|compensation|راتب|رواتب|أجر|مستحقات|[$€£]' public/teacher-*.html && echo "STOP: teacher pay token"
# family pages: zero pay figures
grep -REn 'مبلغ|سعر|رسوم|ادفع|سداد|amount|price|pay now|[$€£]' public/family-*.html && echo "STOP: family pay"
# student: no primary-role wording
grep -REn 'لوحة الطالب|بوابة الطالب|student dashboard' public/student-*.html && echo "STOP: student-primary"
# admin finance: Spec-009 invariant (no salary/payroll figures anywhere)
grep -REn 'راتب|رواتب|payroll|salary' public/finance*.html public/reports*.html && echo "STOP: payroll figure"
```

## Action-completion re-verify (no fake persistence)
```bash
# no «preview action» toast left on Create/Edit/Delete/Save/Print in admin built output
grep -REn 'data-demo-action' public/*.html | grep -viE '\.en\.html' | head    # should be gone from persistence-implying actions
# href="#" must stay 0 sitewide
grep -REn 'href="#"' public/*.html | wc -l                                     # expect 0
# 3 new pages present
for p in sessions-analysis public-holiday scheduled-actions; do ls public/$p.html public/$p.en.html; done
# nav flips: the 3 items now implemented (real anchors), not coming-soon
grep -c 'data-coming-soon' public/dashboard.html                               # decreased by 3
```

## Impact protection
```bash
# only touched admin pages/components + 3 new pages change; portal + unrelated admin byte-identical
git status --short public/ | sed 's#.*/##' | sort
git diff --stat HEAD -- src/js/ scripts/ package.json     # package.json = 0
```

## Stop conditions
Count ≠ 97 after build · any role-law grep hits · any `href="#"` · any «preview action» on a persistence action · any fake save/delete/upload/export · a11y critical/serious · `package.json` changed · new hook/engine/dependency introduced.
