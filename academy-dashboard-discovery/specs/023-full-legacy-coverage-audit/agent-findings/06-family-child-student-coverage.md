# Agent 06 — Family / Guardian / Child / Student Coverage + Role-Model Audit

Spec 023 — Full Legacy Coverage Audit. Audit branch: `feature/012-role-portal-foundation`.
All paths below are exact; nothing in this report rests on memory.

Path shorthands used in tables only (every shorthand expands to an absolute path):
- `LEG` = `/media/mekky/work/backend/dashboard-intelligence-crawler/academy-dashboard-discovery/output/roles/family`
- `PUB` = `/media/mekky/work/backend/dashboard-intelligence-crawler/academy-dashboard-discovery/app/public`
- `SRC` = `/media/mekky/work/backend/dashboard-intelligence-crawler/academy-dashboard-discovery/app/src`
- `SHOT` = `/media/mekky/work/backend/dashboard-intelligence-crawler/academy-dashboard-discovery/app/screenshots`

## Scope & method

Mission: verify that every capability of the legacy Family/Guardian login (13 crawled pages, all at
`/student/*` + `/management/home`) is accounted for in the rebuilt family app (9 page pairs) and the
demoted child-view (7 student page pairs), AND that the corrected role model (Spec 021
DEC-001…DEC-009) is consistently implemented across hub, shells, nav registries, locales, and smoke
pins. Method: (1) read all 13 legacy page records (`LEG/pages/*.md`) + `LEG/role-map.md`; (2) opened
6 legacy full-page screenshots eyes-on; (3) opened the current built HTML of all 18 family/student
surfaces + the hub (grep + targeted reads of `#page-body`); (4) opened 3 current screenshots
eyes-on (hub, family home, child-view home); (5) re-verified prior art (021 decision record + map,
020 spec, 022 spec); (6) inspected `portal-shell.js`, `fixtures/portal.js`, `ar.prt.js`,
`en.prt.js`, and `tests/smoke/run.cjs` for the registry, reframing keys, and the zero-pay/role-model
pins. Read-only throughout; no build/test commands run.

## Evidence opened (exact paths)

Legacy (14 files + 6 screenshots = 20):
- `LEG/role-map.md`
- `LEG/pages/management-home.md`
- `LEG/pages/student-home.md`
- `LEG/pages/student-timetable.md`
- `LEG/pages/student-today-sessions.md`
- `LEG/pages/student-student-history-fillter-2.md`
- `LEG/pages/student-studentslist.md`
- `LEG/pages/student-billing.md`
- `LEG/pages/student-feedbacks.md`
- `LEG/pages/student-request-trial.md`
- `LEG/pages/student-library.md`
- `LEG/pages/student-profile.md`
- `LEG/pages/student-profile-edit.md`
- `LEG/pages/main-index-html.md`
- `LEG/screenshots/student-home-full.png` (viewed)
- `LEG/screenshots/student-billing-full.png` (viewed)
- `LEG/screenshots/student-today-sessions-full.png` (viewed)
- `LEG/screenshots/student-request-trial-full.png` (viewed)
- `LEG/screenshots/student-studentslist-full.png` (viewed)
- `LEG/screenshots/student-library-full.png` (viewed)

Current (23 files + 3 screenshots = 26):
- `PUB/portals.html` (full body read)
- `PUB/family-portal.html`
- `PUB/family-children.html`
- `PUB/family-child.html`
- `PUB/family-child.en.html`
- `PUB/family-schedule.html`
- `PUB/family-progress.html`
- `PUB/family-billing.html` (body read, lines 282–401)
- `PUB/family-requests.html`
- `PUB/family-materials.html`
- `PUB/family-profile.html`
- `PUB/student-portal.html`
- `PUB/student-schedule.html`
- `PUB/student-homework.html`
- `PUB/student-materials.html`
- `PUB/student-progress.html`
- `PUB/student-history.html`
- `PUB/student-profile.html`
- `SRC/js/components/portal-shell.js`
- `SRC/js/fixtures/portal.js` (ROLE_NAV block, line 139 ff.)
- `SRC/locales/ar.prt.js` (lines 92–94, 205–214)
- `SRC/locales/en.prt.js` (line 211)
- `/media/mekky/work/backend/dashboard-intelligence-crawler/academy-dashboard-discovery/app/tests/smoke/run.cjs` (lines 925–1124)
- `SHOT/portals__ar__light__desktop.png` (viewed)
- `SHOT/family-portal__ar__light__desktop.png` (viewed)
- `SHOT/student-portal__ar__light__desktop.png` (viewed)

Prior art re-verified (4 files):
- `/media/mekky/work/backend/dashboard-intelligence-crawler/academy-dashboard-discovery/specs/021-role-model-student-reclassification/role-model-decision.md`
- `/media/mekky/work/backend/dashboard-intelligence-crawler/academy-dashboard-discovery/specs/021-role-model-student-reclassification/current-vs-legacy-map.md`
- `/media/mekky/work/backend/dashboard-intelligence-crawler/academy-dashboard-discovery/specs/020-family-guardian-internal-pages/spec.md`
- `/media/mekky/work/backend/dashboard-intelligence-crawler/academy-dashboard-discovery/specs/022-living-dashboards-experience-rework/spec.md`

## (a) Coverage table

### A1 — Legacy family capabilities → current surfaces (one row per legacy capability)

| Legacy role | Legacy route/page/capability | Legacy evidence path | Current rebuilt page/module | Current evidence path | Coverage classification | Quality classification | Correction needed? | Owner spec | Notes |
|---|---|---|---|---|---|---|---|---|---|
| Family/Guardian | `/management/home` (landing; 302 → `/student/home`) | `LEG/pages/management-home.md` (network table: 302→login→student/home) | `family-portal(.en).html` guardian home | `PUB/family-portal.html` + `SHOT/family-portal__ar__light__desktop.png` | merged | legacy-grounded-improved | No | done | Legacy landing is the same page as student-home after redirect; one home in rebuild. |
| Family/Guardian | `/student/home` — guardian home: hours trio (Total/Remaining/Taken), Time Spendings, Today's Classes, Your Teachers, Request Trial, View all invoices | `LEG/pages/student-home.md` + `LEG/screenshots/student-home-full.png` | `family-portal(.en).html`: pt-idhero (3 counters w/ stories), pt-rail day timeline (child-tagged), 5 child cards w/ drill-downs, billing/requests pt-story rows, quick links | `PUB/family-portal.html` lines 275–420 + `SHOT/family-portal__ar__light__desktop.png` | improved | legacy-grounded-improved | No | done | Hours trio relocated to `family-billing` quota tiles (٤٠/١٢/٢٨). Multi-child truth restored (legacy showed one child, لمار حسن). |
| Family/Guardian | `/student/today-sessions` — day table (10 cols) + date search + cancel/reschedule form + upload-files/voice form + Start | `LEG/pages/student-today-sessions.md` + `LEG/screenshots/student-today-sessions-full.png` | `family-schedule(.en).html` «جلسات اليوم» band + `family-portal` pt-rail; cancel/reschedule → `family-requests` «إلغاء أو تأجيل جلسة»; upload → child-view homework gate | `PUB/family-schedule.html` (sec titles جلسات اليوم/أسبوعي) + `PUB/family-requests.html` + `PUB/student-portal.html` (تسليم الواجبات gate, seen in `SHOT/student-portal__ar__light__desktop.png`) | merged | legacy-grounded-improved | No | done | Mutating actions (Send/Upload/Start) honestly gated backendRequired per the no-fake-actions law. |
| Family/Guardian | `/student/timetable` — weekly grid (# + 7 weekday columns) | `LEG/pages/student-timetable.md` | `family-schedule(.en).html` day-grouped week agenda («أسبوعي», child-tagged, truthful rest days); child view: `student-schedule(.en).html` | `PUB/family-schedule.html` + `PUB/student-schedule.html` | merged | legacy-grounded-improved | No | done | Hour×day grid deliberately replaced by day groups (020 FR-006 — no tables/grids); capability (see the week) preserved. |
| Family/Guardian | `/student/studentslist` — "All Account Subscriptions" (8-col table: student/status/teacher/course/subscription/history/feedback) + student filter + embedded teacher-feedback form | `LEG/pages/student-studentslist.md` + `LEG/screenshots/student-studentslist-full.png` | `family-children(.en).html` five child cards (course/teacher/chips/drill-down); feedback form → `family-requests` «تقييم المعلّم» gated | `PUB/family-children.html` (5 body anchors `family-child.html#child=stX`) + `PUB/family-requests.html` | improved | legacy-grounded-improved | No | done | Legacy table was empty ("not have any courses"); rebuild renders the real fam1 roster st1/st6/st11/st12/st13. |
| Family/Guardian | `/student/student-history-fillter?2` — per-student history (Class Date&Time/Teacher/Show) + student select filter | `LEG/pages/student-student-history-fillter-2.md` | `family-progress(.en).html` per-child cards + `family-child(.en).html#child=stX` panels; child view `student-history(.en).html` + `student-progress(.en).html` | `PUB/family-progress.html` (sec: ملخّص العائلة/تقدّم كل ابن/ملاحظات المعلّمين) + `PUB/family-child.html` + `PUB/student-history.html` | improved | legacy-grounded-improved | No | done | Legacy select-filter mechanic → pure-CSS `#child=stX` :target switching (static-safe). |
| Family/Guardian | `/student/billing` — invoice table (#/Serial/Month-Year/Due/Course/**Amount**/Status) + "View all invoices" header shortcut | `LEG/pages/student-billing.md` + `LEG/screenshots/student-billing-full.png` | `family-billing(.en).html` STATUS-FIRST: hour-quota tiles ٤٠/١٢/٢٨ + settled chip + per-child subscription chips + amount-free invoice rows + backendRequired finance gate | `PUB/family-billing.html` lines 282–401 | improved (Amount column = intentionally-excluded) | legacy-grounded-improved | No | done | The Amount column drop is a LAW (family zero-pay), not a gap. See §(c) for the token scan + smoke regex. |
| Family/Guardian | `/student/feedbacks` — follow-up meetings table (Meeting Date/Time/Manager/Family Members/Action) | `LEG/pages/student-feedbacks.md` | `family-requests(.en).html` «لقاءات المتابعة» (truthful empty + meeting request gate) | `PUB/family-requests.html` (sec titles incl. لقاءات المتابعة) | implemented | legacy-grounded | No | done | Legacy table itself was "No data found"; truthfully mirrored. |
| Family/Guardian | `/student/request-trial` — 2-step wizard (new/existing child → date/time/duration/course) POST | `LEG/pages/student-request-trial.md` + `LEG/screenshots/student-request-trial-full.png` | `family-requests(.en).html` «طلب تجربة أو إضافة ابن» two-path tiles + labeled backendRequired gate | `PUB/family-requests.html` | gated-backendRequired | legacy-grounded | No | future-backend | Step-2 trial-info fields are a recorded gap (021 map §1 row "trial step-2 stays gated"); submit is real-backend work. |
| Family/Guardian | `/student/library` — marketing hero + search + category filter | `LEG/pages/student-library.md` + `LEG/screenshots/student-library-full.png` | `family-materials(.en).html` per-child material groups + type chips + matDownload gate; child view `student-materials(.en).html` | `PUB/family-materials.html` (5 per-child sections) + `PUB/student-materials.html` | improved | legacy-grounded-improved | No | done | Hero dropped by design (020 FR-010, no-marketing rule); search/filter replaced by per-child grouping — capability (find materials) kept. |
| Family/Guardian | `/student/profile` — BROKEN in legacy (500 "Something went wrong") | `LEG/pages/student-profile.md` (H4: Something went wrong, try again later) | `family-profile(.en).html` guardian identity + `student-profile(.en).html` child profile card | `PUB/family-profile.html` (sec: وليّ الأمر/بيانات الحساب/الأبناء/التفضيلات) + `PUB/student-profile.html` | improved | legacy-grounded-improved | No | done | Rebuild exceeds legacy — the legacy page never rendered. |
| Family/Guardian | `/student/profile-edit` — photo upload + name/email save + password change (3 POST forms) | `LEG/pages/student-profile-edit.md` | `family-profile(.en).html` EXACTLY 3 backendRequired gates (photo/save/password), zero form controls | `PUB/family-profile.html` + smoke pin `tests/smoke/run.cjs` line 1096 (`'family-profile': 3` planned cards) | gated-backendRequired | legacy-grounded | No | future-backend | Write-surface parity is exact (3 gates ↔ 3 legacy forms). |
| Family/Guardian | `/main/index.html` — 404 "Opps!!!" error page | `LEG/pages/main-index-html.md` | No equivalent (dead legacy sidebar link "Dashboard 1") | — | intentionally-excluded | — | No | intentionally-excluded | A broken legacy artifact, not a capability; rebuilding it would violate zero `href="#"`/dead-link law. |
| Family/Guardian | `/login` + `/student/logout` (auth pair) | `LEG/role-map.md` lines 78–82 (skipped: auth/mutating) | `portals(.en).html` no-auth demo hub (persona-based entry) | `PUB/portals.html` + `SHOT/portals__ar__light__desktop.png` | reclassified | useful-net-new | No | future-backend | Real auth is out of fixture scope by standing law; hub is the sanctioned demo device. |
| Family/Guardian | Header: notifications bell («See All Notifications», "5 new" badge) — all 13 pages | `LEG/pages/student-home.md` (Buttons + Badges sections) | No current surface or gate in the family app | — | missing | — | Yes (record + gate) | 024-correction | Cross-cutting; 021 map §3 already flags "chat/notifications 🔒 backendRequired futures (023 records owners)". Recommend an honest pt-guide gate or a recorded future-backend register entry — no engine. |
| Family/Guardian | Header: 9-language switcher (ar/fr/de/es/ur/it/pt/ru/tr) | `LEG/role-map.md` lines 69–77 (skipped locale URLs) | AR (RTL, default) + EN (LTR) pairs sitewide | `PUB/family-portal.html` + `PUB/family-portal.en.html` (pairs exist for all 18 surfaces) | intentionally-excluded (beyond AR/EN) | legacy-grounded | No | intentionally-excluded | The project law is Arabic-first + English; other locales are Django-side concerns. |

### A2 — Current family/child pages → legacy grounding (one row per current surface)

| Legacy role | Legacy route/page/capability | Legacy evidence path | Current rebuilt page/module | Current evidence path | Coverage classification | Quality classification | Correction needed? | Owner spec | Notes |
|---|---|---|---|---|---|---|---|---|---|
| Family/Guardian | `/student/home` (+ `/management/home`) | `LEG/pages/student-home.md` | `family-portal(.en).html` | `PUB/family-portal.html` + `SHOT/family-portal__ar__light__desktop.png` | improved | legacy-grounded-improved | No | done | Living cockpit (idhero/rail/story) over legacy home facts; smoke pins 12 body anchors (run.cjs line 1056). |
| Family/Guardian | `/student/studentslist` | `LEG/pages/student-studentslist.md` | `family-children(.en).html` | `PUB/family-children.html` | improved | legacy-grounded-improved | No | done | 5 exact drill-down anchors verified (extraction in this audit). Deliberately NOT a fold point (see §(b) item 6). |
| Family/Guardian | per-student history/course selector views | `LEG/pages/student-student-history-fillter-2.md` | `family-child(.en).html` (5 baked panels, `#child=stX`) | `PUB/family-child.html` (6 body anchors) | improved | useful-net-new | No | done | Net-new aggregation page, grounded in the legacy per-student filter concept; THE fold point to the child view. |
| Family/Guardian | `/student/timetable` + `/student/today-sessions` | `LEG/pages/student-timetable.md`, `LEG/pages/student-today-sessions.md` | `family-schedule(.en).html` | `PUB/family-schedule.html` | merged | legacy-grounded-improved | No | done | — |
| Family/Guardian | `/student/student-history-fillter` | `LEG/pages/student-student-history-fillter-2.md` | `family-progress(.en).html` | `PUB/family-progress.html` | improved | legacy-grounded-improved | No | done | No charts/rank engines (law-compliant). |
| Family/Guardian | `/student/billing` | `LEG/pages/student-billing.md` | `family-billing(.en).html` | `PUB/family-billing.html` | improved | legacy-grounded-improved | No | done | Zero-pay verified §(c). |
| Family/Guardian | `/student/request-trial` + `/student/feedbacks` + today-sessions cancel form + studentslist feedback form | `LEG/pages/student-request-trial.md`, `LEG/pages/student-feedbacks.md` | `family-requests(.en).html` | `PUB/family-requests.html` | merged | legacy-grounded | No | done | Four legacy request-class capabilities in one honest page. |
| Family/Guardian | `/student/library` | `LEG/pages/student-library.md` | `family-materials(.en).html` | `PUB/family-materials.html` | improved | legacy-grounded-improved | No | done | — |
| Family/Guardian | `/student/profile-edit` (+ broken `/student/profile`) | `LEG/pages/student-profile-edit.md` | `family-profile(.en).html` | `PUB/family-profile.html` | gated-backendRequired | legacy-grounded | No | done | 3 gates ↔ 3 legacy forms. |
| Family/Guardian (child view) | `/student/home` single-child presentation | `LEG/pages/student-home.md` | `student-portal(.en).html` («عرض الابن») | `PUB/student-portal.html` + `SHOT/student-portal__ar__light__desktop.png` | reclassified | legacy-grounded-improved | Minor (see Risk 1) | 024-correction | Correctly demoted per DEC-002/003; idhero+rail adopted (smoke run.cjs 982–984). |
| Family/Guardian (child view) | `/student/timetable`, `/student/today-sessions` | `LEG/pages/student-timetable.md` | `student-schedule(.en).html` | `PUB/student-schedule.html` | reclassified | legacy-grounded | No | done | Body byte-equal preserved by 022 law (zero touches). |
| Family/Guardian (child view) | guardian homework/upload signals (today-sessions upload form) | `LEG/pages/student-today-sessions.md` (Form 4 upload-files) | `student-homework(.en).html` | `PUB/student-homework.html` | reclassified | legacy-grounded | No | done | Homework submit honestly gated. |
| Family/Guardian (child view) | `/student/library` | `LEG/pages/student-library.md` | `student-materials(.en).html` | `PUB/student-materials.html` | reclassified | legacy-grounded | No | done | — |
| Family/Guardian (child view) | `/student/student-history-fillter` | `LEG/pages/student-student-history-fillter-2.md` | `student-progress(.en).html` + `student-history(.en).html` | `PUB/student-progress.html`, `PUB/student-history.html` | reclassified | legacy-grounded | No | done | — |
| Family/Guardian (child view) | `/student/profile` (broken in legacy) | `LEG/pages/student-profile.md` | `student-profile(.en).html` | `PUB/student-profile.html` | reclassified | legacy-grounded-improved | No | done | — |
| — (no legacy twin) | demo role switching (no auth) | `LEG/role-map.md` (login skipped) | `portals(.en).html` hub | `PUB/portals.html` + `SHOT/portals__ar__light__desktop.png` | — | useful-net-new | No | done | Corrected role model landed (see §(b)). |

Legacy verdict roll-up: 13/13 crawled legacy pages accounted for — 0 unclear, 1 missing
**capability** (header notifications, cross-cutting — owner 024-correction as an honest gate/register
entry), 2 intentional exclusions (404 artifact page; >AR/EN locales), 2 auth surfaces reclassified to
the hub pending real backend. No current family/child page is wrong-role-classified, weak-design,
duplicate, or random.

## (b) Role-model consistency check (Spec 021 DEC-001…009)

| # | Claim | Verdict | Evidence |
|---|---|---|---|
| 1 | Admin/Family/Teacher are the primary roles; Student is NOT primary | PASS | `PUB/portals.html` lines 262–278: exactly two `.pt-hub-card` role cards (`data-role="family"` → family-portal, `data-role="teacher"` → teacher-portal); admin console section lines 280–289 (`dashboard.html` link); NO student role card. Visually confirmed in `SHOT/portals__ar__light__desktop.png`. |
| 2 | Hub copy: demoted child-view preview wording | PASS | `PUB/portals.html` line 295 «عرض الابن — معاينة» + line 296 explanation «معاينة لوحة الابن (سلمان) ضمن رحلة العائلة؛ الوصول إلى الأبناء يُدار عبر حساب العائلة — دون تسجيل دخول منفصل» → `student-portal.html`. Matches DEC-004 copy intent. |
| 3 | Hub demotion machine-pinned | PASS | `tests/smoke/run.cjs` lines 1099–1106: `hubRoleTargets === ['family-portal','teacher-portal']`, `hubAdminLink === 1`, `childViewLinks === 1` («student is demoted» comment verbatim in the assert). |
| 4 | Student pages preserved as child-view (demoted, NOT deleted) | PASS | All 14 `student-*.html` files exist in `PUB/`; `SRC/js/fixtures/portal.js` line 139 ff.: `ROLE_NAV.student` = 7 items, ALL `status: 'implemented'` (functional but secondary — reachable only via the hub preview + family-child fold link). |
| 5 | Locale-layer reframing (no module rebuild) | PASS | `SRC/locales/ar.prt.js` line 92 `title.student: 'عرض الابن'`, line 93 `portal.student: 'عرض الابن'`, line 94 `role.student: 'ابن العائلة'`; line 205 heroSub, line 209 cvT «عرض الابن — معاينة», line 214 foldT «افتح عرض الابن الكامل»; `SRC/locales/en.prt.js` line 211 `foldT: 'Open the full child view'`. Zero «بوابة الطالب» tokens across ALL `PUB/*.html` (grep, exit 1 = no match). Shell copy confirmed visually in `SHOT/student-portal__ar__light__desktop.png` (topbar «عرض الابن», chip «ابن العائلة»). |
| 6 | family-child is THE fold point — 6 body anchors incl. the ONE sanctioned link | PASS | `PUB/family-child.html`: `#page-body` anchors extracted = exactly 6 → `['student-portal.html','#child=st1','#child=st6','#child=st11','#child=st12','#child=st13']`; line 284 label «افتح عرض الابن الكامل». EN pair: `PUB/family-child.en.html` line 280 → `student-portal.en.html`. Smoke pin: `run.cjs` line 1085 (`bodyAnchors === 6`, switch/fold regex). `PUB/family-children.html` body anchors = exactly 5 (drill-downs only, NO child-view link) — the per-child fold links were REJECTED as dishonest (preview persona is st1 only); this is a declared intentional deviation from the 022 spec.md first draft («family-child + family-children fold-point links»), superseded at implementation. |
| 7 | Family owns the child journey | PASS | Journey clickable: `family-portal` 5×`family-child.html#child=stX` (lines 345–401) → `family-child` → `student-portal.html` (fold link) → `ROLE_NAV.student` internals. Hub preview copy names the family journey (item 2). `family-portal` nav = 8 real family anchors (`ROLE_NAV.family`, 8×implemented, `SRC/js/fixtures/portal.js`). |
| 8 | No page contradicts the model | PASS with one cosmetic residue | Grep over `PUB/*.html` for «بوابة الطالب|Student Portal» = zero hits. Residue: the pre-022 footnote «لوحة الطالب — النسخة الأولى» survives inside 6 student-page bodies (`PUB/student-portal.html` line 393, `student-homework.html` line 397, `student-profile.html` line 361, + materials/progress/history) — a *by-law* byte-equal preservation (022's zero-touch/extraction-hash contract on the six internals), but the wording says "student dashboard", not "child view". Flagged as Risk 1 for 024. |

## (c) Family zero-pay verification

1. **Token scan (this audit, against the built page)**: grep of
   `PUB/family-billing.html` for `ريال|جنيه|دولار|درهم|$|USD|SAR|EGP|مبلغ|سعر|رسوم|تكلفة|دفع|سداد|Amount|price|payment|currency|salary|راتب|أجر`
   returned **zero hits**.
2. **Hour-quota is the billing spine**: `PUB/family-billing.html` lines 287/291/295 — tiles
   ٤٠ «إجمالي الساعات» / ١٢ «ساعات مستخدمة» / ٢٨ «الساعات المتبقية» (the legacy Total/Remaining/Taken
   idea from `LEG/pages/student-home.md`, money-free).
3. **Amount-free invoice rows**: lines 364–394 — serial («ف-٢٠٢٦-٠٥-٠١»), month, due label, course,
   status chip («مسوّاة»/«قادمة») — the legacy `Amount` column (`LEG/pages/student-billing.md`,
   Table 1, 8 columns incl. Amount) is intentionally excluded by law; line 362 states it:
   «الحالة فقط لكل فاتورة». Detailed invoices honestly gated (lines 395–401, «يتطلب نظام الفوترة الفعلي»).
4. **Smoke regex (cited verbatim)** — `/media/mekky/work/backend/dashboard-intelligence-crawler/academy-dashboard-discovery/app/tests/smoke/run.cjs`:
   - line 1013 (family internal pages) and identical lines 1066 (family home) and 1090 (family-child):
     `const famPay = /ريال|ر\.س|\bSAR\b|\bUSD\b|جنيه|\bEGP\b|[$€£]|ادفع|سداد|pay now|payment|\bamount\b|\bprice\b|مبلغ|سعر|رسوم/i.test(prt.bodyText);`
     asserted false on every family body (lines 1014/1067/1091).
   - line 1110: the teacher `payHit` regex (salary/payout/earnings/compensation + AR tokens) —
     byte-verbatim per the 022 contract.
5. Family-portal billing story row carries status only: `PUB/family-portal.html` lines 413–414
   («الفواتير مسوّاة — لا فواتير متأخرة، الحالة فقط، دون أرقام»), visually confirmed in
   `SHOT/family-portal__ar__light__desktop.png`.

**Verdict: the family zero-pay hard line holds on every surface inspected.**

## Risks, gaps, and proposed corrections

1. **[Minor — 024-correction] Residual «لوحة الطالب — النسخة الأولى» footnotes** inside the
   child-view bodies (`PUB/student-portal.html:393`, `student-homework.html:397`,
   `student-profile.html:361`, + student-materials/progress/history). Reframing was locale-shell
   scoped by design; these baked notes still say "student dashboard". Proposal: 024 relabels the
   note key to the «عرض الابن» vocabulary with a declared supersession of the six extraction hashes
   (same mechanism 022 used for the family-child body hash). Cosmetic; does not break the role
   model (shell framing dominates, verified visually).
2. **[Gap — 024-correction owner record] Header notifications capability** (legacy bell + "See All
   Notifications" on all 13 family pages, `LEG/pages/student-home.md` Buttons/Badges) has no
   current family surface OR labeled gate. 021 already classified it 🔒 backendRequired; 023 should
   record the owner. Proposal: one honest `pt-guide` panel (or the futures register entry) — never a
   fake bell.
3. **[Deviation to keep documented] family-children carries no fold-point link** while the 022
   spec.md surface contract mentioned «family-child + family-children fold-point links». The
   implementation sanctioned family-child ONLY (per-child child-view links rejected as dishonest —
   the preview persona is st1/سلمان alone). Evidence: `PUB/family-children.html` body anchors = 5
   drill-downs, zero `student-portal` references. Action: 024/032 must treat family-children's
   missing link as INTENTIONAL (do not "fix" it); if real per-child credentials ever ship, revisit
   under future-backend.
4. **[Recorded gap — future-backend] Trial wizard step 2** (date/time/duration/course fields,
   `LEG/pages/student-request-trial.md` Form 2) is represented as a gate, not rendered fields —
   consistent with the honesty law and already recorded in the 021 map; keep in the futures register.
5. **[Carried question — 029/031] Certificates as a family-visible surface**: 021
   `role-model-decision.md` C5 flags it («resolve in the 023 audit»). No legacy FAMILY page shows
   certificates (13/13 inspected — none), so this is NOT a family-coverage gap; it belongs to the
   admin-side agents (026–031) to decide whether a family-facing read view is warranted. Owner
   suggestion: 031-admin-management-content-certificates-settings note + future-backend.
6. **[No action] Legacy `main/index.html` 404 page and the 9-language switcher** are intentional
   exclusions (broken artifact; AR/EN scope law). Login/logout stay reclassified to the hub until
   real auth (future-backend).
7. **[Consistency confirmation, no action]** The corrected role model is machine-guarded: any
   regression re-introducing a student primary card or a pay token now fails smoke
   (`tests/smoke/run.cjs` lines 1013–1014, 1066–1067, 1085, 1090–1091, 1099–1106, 1110–1112).
