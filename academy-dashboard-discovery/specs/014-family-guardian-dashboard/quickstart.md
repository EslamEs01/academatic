# Quickstart — Verifying Spec 014 (Family / Guardian Dashboard)

All commands from `academy-dashboard-discovery/app/` unless noted.

## 1. Build & preview

```bash
npm run build                  # 48 pages + index; must end clean
npm run serve                  # http://localhost:4178
```

Open `/family-portal.html` (AR RTL) and `/family-portal.en.html` (EN LTR).

## 2. Visual walkthrough (both languages)

- **Hero**: greets the guardian by name with a family summary + reassurance + plain-text next-action hint — no date, no notification count.
- **My children**: ALL FIVE fam1 children as calm cards (name/level/status chip/progress bar/per-child hint) — NO switcher control anywhere.
- **Today's sessions**: session cards each showing WHICH CHILD, time/course/teacher, labeled status chip; no join, no cancel button.
- **Signals band**: the family trio (١٢/٣/١) + the two real needs-attention cards — st11 (real absence outcome chip, gentle follow-up framing) and st13 (real cancelled chip, trial framing) — + the reassurance line «بقية الأبناء على المسار الصحيح».
- **Teacher notes**: 3 child-associated notes (summary/homework shape).
- **Recent sessions**: 3 cards — real out1 (st1 attended + positive feedback), real out15 (st11 absent + support feedback), authored st6 — child-first, summary + homework lines; «السجل الكامل» planned mini-card.
- **Plans & subscriptions**: per-child rows with «الخطة المتقدمة» label + status chips — **ZERO amounts**.
- **Billing status**: ONE calm settled-status card + the «الفواتير والدفع» backendRequired mini-card — **ZERO figures, NO pay-now**.
- **Requests hub**: four preview cards — cancel/reschedule (with the honest «لا تُعوَّض الجلسة» caution + backendRequired chip) · feedback-about-teacher (display-only question lines + backendRequired chip) · meetings (**the truthful `.pt-empty`** «لا توجد لقاءات مجدولة» + planned chip) · request-trial (new-vs-existing child tiles + backendRequired chip). NO form controls anywhere.
- **Family materials**: 3 child-associated display-only cards + «تحميل الملفات» backendRequired mini-card.
- **My account**: guardian contact/joined/children rows + backendRequired editing note.
- **Closing note**: honest delivered-state; Spec-016 pointer.
- Toggle **dark**; resize to **390px** — single column, zero horizontal scroll.

## 3. Zero-pay + honesty greps (both built files)

```bash
grep -cE 'ريال|ر\.س|\bSAR\b|\bUSD\b|[$€£]' public/family-portal.html public/family-portal.en.html   # 0 and 0
grep -ciE 'pay now|ادفع|سداد|renew|جدّد الاشتراك' public/family-portal.html public/family-portal.en.html # 0 and 0
grep -c '<table' public/family-portal.html public/family-portal.en.html                              # 0 and 0
grep -cE 'href="#"' public/family-portal*.html                                                        # 0s
```

Confirm the page body contributes zero anchors (shell skip + hub-switch only) and zero `<form>`/`<input>` elements.

## 4. Isolation proof (47/49 byte-identical)

```bash
cd ../..   # repo root
for f in academy-dashboard-discovery/app/public/*.html; do
  git diff --quiet HEAD -- "$f" || echo "CHANGED: $f"
done
# Expect EXACTLY: family-portal.html and family-portal.en.html
```

Open `student-portal.html`, `teacher-portal.html`, `portals.html`, `dashboard.html` — visually unchanged.

## 5. Tests & guards

```bash
npm test                       # smoke (48 loads incl. the amended family asserts: 5 children, planned 2+2,
                               #   zero-pay regex, .pt-empty, 390px probe) + a11y critical=0 serious=0
npm run screenshots            # full matrix incl. the 6 family area frames — 0 console errors
```

Re-run the standing audits: Spec 008 reports-body · 009 G8a · 010 chip-tones · 011 zero-href# · 012 G5 (admin identity + teacher pay-grep) · 013 student-branch asserts — all `ok`/green.

## 6. Coverage delivery notes

`specs/012-role-portal-foundation/legacy-role-capability-coverage.md` gains **§8 Spec-014 delivery notes** (F1–F17 dispositions per the coverage contract); no row reclassified.

## 7. Screenshot review

`screenshots/REVIEW.md` gains the Spec 014 section: 14+ frame verdict table (4 experience + 6 area + 4 unchanged proofs) against `contracts/screenshot-acceptance.md` failure conditions (including «currency/pay figure visible»).
