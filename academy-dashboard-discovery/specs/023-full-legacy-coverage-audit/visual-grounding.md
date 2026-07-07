# Visual Grounding — Spec 023 Full Legacy Coverage Audit 000–022

**Title**: Targeted Visual Grounding Gate record (the audit's own coverage proof)
**Date**: 2026-07-06
**Baseline**: branch `feature/012-role-portal-foundation`, HEAD `837b0c1`; Specs 020/021/022 committed; 77 public HTML files.

This file records exactly what the audit OPENED (screenshots, inventories, specs, source/public) so that QA can verify no legacy or current role area was judged from memory. The grounding was executed by 11 agent passes + 1 main-session sample; each `agent-findings/*.md` carries its own exhaustive "Evidence opened (exact paths)" section, aggregated here.

Archives at `academy-dashboard-discovery/`: `output.zip`, `frontend-planning.zip`, `frontend-planning-deep.zip`, plus `specs/022-…​.zip` and a user backup `specs/023-…​.zip`. **The extracted folders (`output/`, `frontend-planning/`, `frontend-planning-deep/`) were used throughout and are preferred; the archives are accounted-for via their extracted trees (identical content) and were not re-extracted.**

Note on the canonical name: `agent-findings/02-legacy-screenshots.md` is an **index** over three role-scoped screenshot files (`02-legacy-screenshots-admin.md`, `-family.md`, `-teacher.md`) — the screenshot area was split per role for depth.

---

## Exact evidence opened

### Legacy screenshots opened visually

- **Admin** — of 1,019 PNGs (300 `*-full.png` full-page captures), **68** full-page captures opened, spanning EVERY distinct module-group prefix (home, admins/permissions, analysis, accounting/invoices/salary transactions, banks, families/categories/feedback, certificate-requests, chat, class-feedback, courseclasses, courses, downloads, expenses, export/pdf (both 500 dead-ends), forms, groups, heads, library/materials, monthly-invoices, new-requests, payouts/providers, profile, public-advertisement/holiday, request/search-schedule, schedule-responses, salaries/staff-salaries/salary-class-report, scheduled-actions, session-class-room, sessions-analysis, settings general/integrations/notification/security, students, teacher-categories/feedback, teachers/compensations, tickets, time-convertor, total-queues). Sampling method: ≥1 full-page capture per module group; groups not opened cross-referenced to their `pages/*.md` text captures. Source: `02-legacy-screenshots-admin.md`, `05-admin-coverage.md` (17 additional), `00-main-session-grounding.md` (`management-home-full.png`), `09-drift-extra-pages.md` (2 admin boards).
- **Family/Guardian** — **ALL 27** screenshots opened (`02-legacy-screenshots-family.md`), plus 6 re-opened by `06-family-child-student-coverage.md` and `student-home-full.png` by `00`/`09`.
- **Teacher** — **ALL 67** screenshots audited across ~26 distinct pages (`02-legacy-screenshots-teacher.md`), with 6 re-opened by `07-teacher-coverage.md` (all four pay surfaces + tickets chart + timetable grid) and `teacher-home-full.png` by `00`, `teacher-teacher-history-1-full.png` by `09`.
- **Design references** — `design-references/academy-dashboard.png`, `sidebar-reference.png` (`08-design-ux-audit.md`).

### Current screenshots opened visually

- **Design/UX pass (`08-design-ux-audit.md`)**: ~47 current captures from `app/screenshots/` covering the hub; family-portal / teacher-portal / student-portal (ar+en, light+dark, desktop+mobile); the 7 family internals; child-view pages; key admin pages (dashboard, families, students, sessions, attendance, finance, reports); and `app/screenshots/before-022/` (family-portal, teacher-portal, student-portal, portals, family-child) for before/after 022 comparison.
- **Main-session sample (`00-main-session-grounding.md`)**: `portals`, `family-portal`, `teacher-portal`, `dashboard`, `student-portal` (ar/light/desktop).
- **Coverage agents**: `06` opened hub + family-portal + student-portal; `09` opened the family/teacher/admin contested groundings.

### Inventory / planning files opened

`output/combined/`: `page-inventory.md`, `route-graph.md`, `academy-system-map.md`, `role-permission-matrix.md`, `shared-unique-pages.md`, `missing-coverage.md`, `failed-pages.md`, `skipped-actions.md`, `llm-context.md`, `form-inventory.md` (~20,600 lines, grep-sampled), `modal-inventory.md`, `table-inventory.md`, `interaction-inventory.md`, `button-coverage.md`.
`frontend-planning-deep/`: `01-completeness-ledger.md`, `02-all-pages-expanded-inventory.md`, `03-visual-patterns.md`, `03-screenshot-review.md`, `05-distinct-interaction-catalog.md`, `06-complete-data-surface.md`, `08-role-page-inventory-v2.md`, `09-permission-navigation-matrix-v2.md`, `11-interactions-states-v2.md`, `14-design-system-direction-v2.md`, `20-no-missing-items-audit.md`.
`roles.config.json` (role model ground truth).

### Specs opened (001–022 + priors)

`016-…` (`admin-sidebar-page-inventory.md` 57 rows, `legacy-to-new-coverage-matrix.md`, `missing-pages-and-gaps-register.md`, `future-spec-sequence.md`, `contracts/teacher-pay-free-global-contract.md`), `015-teacher-dashboard/spec.md`, `020-family-guardian-internal-pages/spec.md`, `021-role-model-student-reclassification/{role-model-decision.md,current-vs-legacy-map.md}`, `022-living-dashboards-experience-rework/{spec.md,contracts/}`. Earlier specs 001–014 referenced via the 016 coverage matrix and CLAUDE.md history.

### Source / public files sampled

`app/public/` (all 77 enumerated; ~30 opened in full or grep-sampled). `app/src/js/pages/` (all 38 module headers read). `app/src/js/components/` (`portal-shell.js`, `portal-page.js`). `app/src/js/fixtures/` (`portal.js`, `finance.js`, `settings.js`). `app/src/js/nav.config.js` (full admin registry + FUTURE_ROUTES + guards). `app/src/locales/{ar,en}.prt.js` + built `app/public/assets/locales/`. `app/src/styles/app.css` (living layer + reduced-motion block). `app/scripts/build-html.mjs`. `app/tests/smoke/run.cjs` (1,304 lines; load count, payHit, famPay/payFigure, ceilings, anchor registries, role-model pins). `app/screenshots/REVIEW.md` where present.

### Evidence gaps (declared)

1. **Teacher live `session-class-room`** never truly captured (crawler redirected to `/teacher/home`) — unverified, routed to B-04 (order a fresh crawl before Spec 025). `07` R6.
2. **Legacy tables mostly captured EMPTY** (zero-course fixture accounts) — legacy populated-state rendering was never observed; no "pixel match" claim is possible and none is made. `02-legacy-screenshots-family.md` risks 2–3.
3. **Admin crawl budget-capped** at 300/365 discovered routes (65 unvisited, mostly sort/date-range variants of covered templates + 2 broken exports + 3 unsafe mutating routes). `01` risks; `05` Risk 3.
4. **Chat send-form + family today-sessions "Send"** never captured as forms — treated as UNCONFIRMED capabilities (→ M-02, M-06), never invented. `03` Risks.
5. **AR/EN locale toggle** has zero legacy behavioral reference — designed fresh, documented as such (not ported). `03` §5.

### Were all role areas inspected?

Yes. Legacy: admin (68 shots + 300 page captures), family (27/27 + 13/13 pages), teacher (67 shots + 26 pages). Current: all three role homes + hub + 7 family internals + 7 child-view pages + the sampled admin surfaces + before-022 set. No role area was judged from memory.

---

## Required grounding table (25 areas)

| Area | Legacy evidence opened | Current evidence opened | What was observed | Coverage status | Risk / correction needed |
|---|---|---|---|---|---|
| Admin dashboard/home | `management-home-full.png` (KPI wall + Classes-Of-today + Fine fragment) | `dashboard__ar__light__desktop.png` + variants; `dashboard.js` | KPI band + today sessions + week-ahead + follow-ups + UI-states; «(3.00 Fine)» excluded | improved/done | Do not re-import pay fragment (026) |
| Admin families/students | `management-families-full.png`-group; `management-student*` captures | `families/family/students/student.html` + modules | directories + tabbed hubs; family chip enrich; category/feedback/results planned | implemented + planned (027/029) | none (scheduled) |
| Admin teachers | `management-teachers-full.png`, `management-teacher-feedback-full.png`, `management-teachers-1-compensations-1-full.png` | `teachers/teacher/teacher-performance.html` + modules | roster + 8-tab hub + KPI board; pay tabs never rendered; add-teacher/categories planned | implemented + planned (028) | pay tabs excluded by law |
| Admin courses/groups | `management-courseclasses-1-full.png`; courses/group captures | `courses/course/groups/group.html` | catalogues + tabbed profiles; lifecycle split to sessions/drawers | implemented/done | none |
| Admin sessions/timetable | `management-all-teachers-timetable-full.png`; courseclasses lifecycle | `sessions/schedule.html` | list+agenda + hand-rolled grid + teacher lens; «unpaid» tint dropped | improved/done | total-queues + schedule-request inbox → 026 |
| Admin attendance/outcomes | `management-accounting-transaction-session-status-attend-full.png` | `attendance__ar__*.png` + module | net-new outcome board (legacy had none); Profit/EUR columns excluded | improved/net-new done | per-student roster lens → 026 |
| Admin finance | `management-accounting-full.png`, `management-invoices-full.png`, `management-salaries-full.png` | `finance__ar__light__desktop.png`; `finance.js`/`finance.html` | status-first tiles + invoice list + 9 figure-free GATE cards; charts + salary math excluded | improved + gated (030) | restate invoice-amount boundary in 030 (X-47/B-11) |
| Admin reports/analytics | `management-forms-full.png`, `management-analysis-student-full.png` | `reports__ar__dark__desktop.png`; `reports.js` | finance-free ops report hub; charts excluded; forms/data-analysis planned | implemented + planned (029) | STAT cards not charts |
| Admin content/settings | `management-settings-general/integrations-full.png`, `management-library/materials/pdf-full.png`, `management-admins-permission-6-full.png` | `settings__ar__*.png`; `settings.js` | thin settings hub + real theme/lang; RBAC/materials/certificates/6 settings pages planned | planned (031) | **Locations RBAC group has no owner (M-04/B-02)** |
| Family home | `student-home-full.png` | `family-portal__ar__{light,dark}__{desktop,mobile}.png` | living guardian cockpit; idHero/rail/story; multi-child restored | improved/done | none |
| Family children | `student-studentslist-full.png` | `family-children__ar__light__desktop.png` | 5 real child cards + drill-downs; no fold link (intentional) | improved/done | family-children fold link INTENTIONALLY absent — don't "fix" |
| Family child file | `student-studentslist-full.png` (account switcher) | `family-child__ar__light__desktop.png` | baked 5-panel `#child=stX` switcher; THE fold point (6 anchors) | reclassified/net-new done | MUST STAY |
| Family schedule | `student-timetable-full.png`, `student-today-sessions-full.png` | `family-schedule__ar__light__desktop.png` | merged day-grouped agenda across children; grid replaced | merged/done | visual-hierarchy D-07; week strip D-09 |
| Family progress/history | `student-student-history-fillter-2-full.png` | `family-progress__ar__light__desktop.png` | per-child feedback/history; `:target` switching; no charts | improved/done | none |
| Family billing | `student-billing-full.png` (…Amount…) | `family-billing__ar__{light,dark}__desktop.png` | status-first: quota ٤٠/١٢/٢٨ + amount-free rows; Amount excluded | improved/done | family zero-pay verified (0 token hits) |
| Family requests/feedback/trial | `student-request-trial-full.png`, `student-feedbacks-full.png` | `family-requests__ar__light__desktop.png` | 4 request-class capabilities in one honest page; gates | merged + gated | trial step-2 = future-backend gate |
| Family materials/library | `student-library-full.png` | `family-materials__ar__light__desktop.png` | per-child material groups + download gate; hero dropped | improved/done | static (D-11 delight) |
| Family profile | `student-profile.md` (500), `student-profile-edit.md` | `family-profile__ar__light__desktop.png` | 3 gates ↔ 3 legacy forms; guardian identity | gated/done | none |
| Student child-view pages | `student-home/timetable/library/history/profile` captures | `student-portal/schedule/materials/history/progress/profile__ar__light__desktop.png` | «عرض الابن» shell reframing; bodies byte-preserved | reclassified/done | **F-00-1 footer «لوحة الطالب» on 6/7 (B-01)** |
| Teacher home | `teacher-home-full.png` (salary band) | `teacher-portal__ar__{light,dark}__{desktop,mobile}.png` | living teaching cockpit; salary band excluded (law) | improved/done | pay-free verified 3 layers |
| Teacher planned internals | `teacher-timetable/studentslist/monthly-plans/tickets/library/chat-full.png` | `teacher-portal` nav (6 «قريبًا» buttons) | honest planned gates; library has NO gate; chat unowned teacher-side | planned (025) | M-03 library gate, M-02 chat decision |
| Hub/role switcher | `roles.config.json` (3 logins); no legacy hub | `portals__ar__light__desktop.png`; `run.cjs:1099–1106` | 2 role cards + admin + demoted «عرض الابن» preview | reclassified/net-new done | empty 3rd grid slot D-08 |
| Global navigation/shell | legacy per-role sidebars | `portal-shell.js`; ROLE_NAV 7/8/7 | topbar + sidenav + mobile drawer; planned = non-anchor buttons | implemented/done | none (Spec 017) |
| Design quality/living dashboard | `03-visual-patterns.md`; before-022 captures | 47 current + before-022 set | rebuild decisively ahead; ONE empty-card pattern (D-01/D-05/D-09) + dark hero D-06 | improved | 024 visual-density pass (D-01…D-13) |
| Mobile/dark/RTL/LTR | (legacy RTL never shipped; dark unverified) | `*__ar__dark__*`, `*__en__light__*`, `*__ar__light__mobile__*` | full RTL + real EN LTR + consistent dark; mobile topbar wrap | improved | D-06 dark hero, D-13 mobile topbar |

---

## Grounding verdict

The Targeted Visual Grounding Gate is **satisfied**: legacy screenshots were opened for every role (family 27/27; teacher 67/67; admin ≥1 full-page capture per module group over 300 captures), current screenshots were opened across all role surfaces and the before/after-022 set, and all 14 inventory files + specs 015/016/020/021/022 were read. Five evidence gaps are declared above (none blocking); the load-bearing role-model, zero-pay, and F-00-1 findings were each cross-witnessed by ≥2 independent passes and, for F-00-1, re-verified by direct grep.
