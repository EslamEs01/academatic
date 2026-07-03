# Quickstart — Verifying Spec 013 (Student Dashboard)

All commands from `academy-dashboard-discovery/app/` unless noted. Repo root = `../../` from there.

## 1. Build & preview

```bash
npm run build                  # 48 pages + index; must end clean
npm run serve                  # http://localhost:4178
```

Open `http://localhost:4178/student-portal.html` (AR RTL) and `/student-portal.en.html` (EN LTR).

## 2. Visual walkthrough (both languages)

- **Hero**: greets st1 by name, today-focused, plain-text next-action hint — no notification count, no calendar date.
- **Today's learning**: session cards (time/course/teacher/room) with labeled icon+text status chips.
- **Next session**: rich card; the join affordance is an honest backendRequired note — NOT a button that looks live.
- **My week**: SAT-first stacked day groups, «اليوم» marker on today, compact session cards — and **Friday shows the rest-day friendly empty state** (the `.pt-empty` pattern demo).
- **My courses**: display-only cards with level + progress hint + authored next-step line; **no links**.
- **Homework**: 3 display-only items with due labels + the «تسليم الواجبات» backendRequired mini-card. No upload/submit control anywhere.
- **Materials**: 3 display-only items + the «تحميل الملفات» backendRequired mini-card. No download control.
- **My progress**: overall gauge (٧٨٪ AR / 78% EN) + per-course bars + the attended/upcoming/streak trio — all Arabic-Indic on AR.
- **Achievements**: authored badges with the honest net-new framing.
- **Stars of my group**: unordered celebration cards, authored/demo-labeled — no ranks, no points, not stressful.
- **Recent sessions**: 3 feedback cards (first one = the real out1 attended row with sara's feedback) showing summary + homework-note lines; «السجل الكامل» planned mini-card.
- **Profile**: small identity card (level/course/family relation) + backendRequired editing note.
- **Closing note**: honest — dashboard delivered; live/account features backendRequired; Spec 016 next.
- Toggle **dark** via the shell theme menu — check contrast on every new section.
- Resize to **390px** — single column, zero horizontal scroll.

## 3. Honesty greps (both built files)

```bash
grep -c '<table' public/student-portal.html public/student-portal.en.html          # 0 and 0
grep -cE 'href="#"' public/student-portal.html public/student-portal.en.html       # 0 and 0
grep -oE 'زوم|Zoom|join now|انضم الآن' public/student-portal*.html                  # nothing
```

Confirm the only anchors on the page are the shell's hub switch link (+ skip link).

## 4. Isolation proof (46/49 byte-identical)

```bash
cd ../..   # repo root
for f in academy-dashboard-discovery/app/public/*.html; do
  git diff --quiet HEAD -- "$f" || echo "CHANGED: $f"
done
# Expect EXACTLY: student-portal.html and student-portal.en.html
```

Also open `portals.html`, `family-portal.html`, `teacher-portal.html`, `dashboard.html` — visually unchanged.

## 5. Tests & guards

```bash
npm test                       # smoke (48 loads, incl. the amended student asserts + 390px probe) + a11y 0/0
npm run screenshots            # full matrix incl. the 4 element-scoped area frames — 0 console errors
```

Re-run the standing audits (Spec 008 reports-body · 009 G8a · 010 chip-tones · 011 zero-href# · 012 G5 incl. teacher pay-grep + admin identity) — all `ok`.

## 6. Coverage delivery notes

`specs/012-role-portal-foundation/legacy-role-capability-coverage.md`: rows F5/F6/F12 carry "delivered by Spec 013 …" notes; the §4 leaderboard item records the celebration-form resolution; **no other row changed**.

## 7. Screenshot review

`screenshots/REVIEW.md` gains the Spec 013 section: 12+ frame verdict table (4 student frames + 4 area frames + 4 unchanged proofs) against the failure conditions in `contracts/screenshot-acceptance.md`.
