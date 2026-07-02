# Quickstart: Verifying Spec 012 — Role Portal Foundation

All commands from `academy-dashboard-discovery/app/`.

## 1. Build & preview

```bash
npm run build      # 49 pages (40 admin + 8 portal + index); all guards silent
npx serve public
```

## 2. Demo entry (the documented path)

Open **`portals.html`** directly — the demo role-switch hub: three friendly role cards (Student/Family/Teacher) + a labeled admin-console return link + honest demo framing (no fake login). Each card reaches its portal in one click; each portal's header has a «تبديل الدور» link back to the hub.

## 3. The three portal foundations

- **`student-portal.html`** — st1's portal: welcome hero, today's learning, next session (honest demo affordance — NOT a live join), my courses cards, progress gauge, achievements preview, planned homework/materials/leaderboard cards, Spec-013 note. No admin rail, no dense table.
- **`family-portal.html`** — fam1's guardian portal: welcome, children overview (5 fixture children, multi-child pattern), today's sessions, attendance/progress, teacher-notes preview, planned billing/meetings/subscriptions cards, Spec-014 note.
- **`teacher-portal.html`** — sara's portal: welcome, today's schedule, next-session demo, my students, outcome-workflow preview, planned materials/tasks cards, Spec-015 note. **Grep-proof zero pay figures**: `grep -iE 'salary|payout|earning|راتب|رواتب|أجر' public/teacher-portal.html public/teacher-portal.en.html` → nothing.

## 4. Mobile / AR-EN / themes

Resize to 390px on each portal: single column, no horizontal scroll, touch-friendly. `.en.html` variants are LTR with Western digits; AR pages RTL with Arabic-Indic digits. Toggle dark via the portal header (existing theme menu) — premium contrast holds.

## 5. Admin untouched

- Open `dashboard.html`: sidebar and body identical to pre-012 (no portal links anywhere).
- Hash-compare: every one of the 40 admin built files is content-identical vs HEAD (scope-guard audit #1).
- `git diff` on admin page modules/fixtures/`enhance.js`/`package.json`: empty.

## 6. Legacy role coverage

Open `../specs/012-role-portal-foundation/legacy-role-capability-coverage.md`: all 26 teacher + 13 family legacy pages classified (seven-way scheme) with destinations + rationales; pay surfaces → backendRequired; broken routes + fake live room → excluded; gamification → net-new; itemized Spec 013/014/015 boundaries; sign-off checklist complete.

## 7. Honesty & links

Every portal control: real link / demo toast / confirm-demo / labeled planned. Zero `href="#"` sitewide (Spec 011 invariant holds on all 49 pages); the smoke link crawl covers the new pages automatically.

## 8. Full tests + guards

```bash
npm test    # smoke (49-page loads: admin asserts unchanged + admin-scoped portal-absence + the new portal block) + a11y critical=0 serious=0
```

Then run `contracts/scope-guard.md` audits + re-run Spec 008/009/010/011 guards — all `ok`.

## 9. Screenshots

```bash
node tests/screenshots/capture.cjs
```

Review the 12 Spec 012 frames per `contracts/screenshot-acceptance.md` (each portal AR light + EN + AR mobile, student AR dark, hub, admin-unchanged proof); record verdicts in `screenshots/REVIEW.md`. Zero console errors.
