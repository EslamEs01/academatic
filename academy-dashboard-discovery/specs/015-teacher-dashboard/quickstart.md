# Quickstart — Verifying Spec 015 (Teacher Dashboard)

All commands from `academy-dashboard-discovery/app/` unless noted.

## 1. Build & preview

```bash
npm run build                  # 48 pages + index; must end clean
npm run serve                  # http://localhost:4178
```

Open `/teacher-portal.html` (AR RTL) and `/teacher-portal.en.html` (EN LTR).

## 2. Visual walkthrough (both languages)

- **Hero**: greets sara by name with a today summary + plain-text next-action hint — professional, calm, **zero pay wording**, no date/notification count.
- **Today's schedule**: sara's class cards (time/course/room + labeled status chips + authored student counts «١٨ طالبًا»).
- **My next class**: rich card + the "what to prepare" hint + the honest backendRequired live note — NOT a join-styled button.
- **Follow-up board**: TWO real cards — st11 (real «غياب الطالب» chip + gentle family-contact framing + the support note) and st7 (real «غياب المعلّم» chip + make-up framing) — + the reassurance line. No risk numbers.
- **My students**: the 4 grp1 roster cards (st1/st6/st11/st13) with group/course association + status chips + authored notes; no links.
- **Session-outcome workflow**: the 5 display-only steps (الحضور → التقييم → الملخص → ملاحظة الواجب → الملفات) + the «حفظ نتيجة الجلسة» backendRequired mini-card. No form controls anywhere.
- **Homework & tasks**: 3 authored task cards (prepare/review/report with due labels) + the «إدارة المهام» planned mini-card.
- **Materials**: 3 authored cards (type icons + course refs) + the «رفع وتنزيل الملفات» backendRequired mini-card.
- **Timetable & availability**: SAT/MON/TUE day-grouped agenda cards + the truthful «الأربعاء والخميس — بلا حصص 🌤» empty state + the «تعديل التوفّر» backendRequired mini-card. No grid.
- **Monthly report rubric**: the 5 dimension lines display-only + backendRequired chip — no answer scales, no rating visual.
- **Requests & performance**: the certificate-request preview (+ backendRequired chip) + the ONE labeled admin performance link («فتح لوحة الأداء» → `teacher-performance(.en).html`).
- **My account**: name/subject/status/availability rows + the backendRequired editing note. No rating/util numbers anywhere.
- **Closing note**: honest delivered-state; Spec-016 pointer.
- Toggle **dark**; resize to **390px** — single column, zero horizontal scroll.

## 3. The pay-free audit + honesty greps (sources incl. comments + both built files)

```bash
grep -RniE '\b(salary|salaries|pay|payout|payouts|earnings?|compensation|bonus|fine|fines)\b|راتب|رواتب|أجر|مستحقات|غرامة|مكافأة' \
  src/js/pages/teacher-portal.js src/js/fixtures/portal.js src/locales/ar.prt.js src/locales/en.prt.js \
  public/teacher-portal.html public/teacher-portal.en.html        # ZERO hits
grep -oiE 'EGP|SAR|USD|ريال|ر\.س|جنيه|[$€£]' public/teacher-portal*.html   # ZERO hits
grep -c '<table' public/teacher-portal*.html                                # 0 and 0
grep -cE 'href="#"' public/teacher-portal*.html                             # 0 and 0
```

Confirm the page body contributes EXACTLY ONE anchor and it targets `teacher-performance(.en).html`; zero `<form>`/`<input>` elements.

## 4. Isolation proof (47/49 byte-identical)

```bash
cd ../..   # repo root
for f in academy-dashboard-discovery/app/public/*.html; do
  git diff --quiet HEAD -- "$f" || echo "CHANGED: $f"
done
# Expect EXACTLY: teacher-portal.html and teacher-portal.en.html
```

Open `student-portal.html`, `family-portal.html`, `portals.html`, `dashboard.html` — visually unchanged.

## 5. Tests & guards

```bash
npm test                       # smoke (48 loads incl. the amended teacher asserts: planned 3+1 chip tones,
                               #   sections ≥10, free-days empty, bodyAnchors === 1 w/ exact target,
                               #   formControls 0, the KEPT pay-token assert, 390px probe) + a11y 0/0
npm run screenshots            # full matrix incl. the teacher area frames + new ar/dark — 0 console errors
```

Re-run the standing audits: Spec 008 reports-body · 009 G8a · 010 chip-tones · 011 zero-href# · 012 G5 (admin identity + the teacher pay-grep) · 013 student branch · 014 family branch (incl. its zero-pay regex) — all green.

## 6. Coverage delivery notes

`specs/012-role-portal-foundation/legacy-role-capability-coverage.md` gains **§9 Spec-015 delivery notes** (T1–T27 dispositions; **T2/T17/T18/T19 stay backendRequired — pay, never rendered**); §§1–8 byte-unchanged.

## 7. Screenshot review

`screenshots/REVIEW.md` gains the Spec 015 section: 14+ frame verdict table (4 experience + area close-ups + 4 unchanged proofs) against `contracts/screenshot-acceptance.md` failure conditions (including «pay-related vocabulary visible» and «computed score/rating visible»).
