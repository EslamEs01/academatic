# Spec 042 — Visual Quality & Academic Design Audit (cross-cutting lens)

**Lens**: visual & product quality. Legacy screenshots vs OUR screenshots. Judged on: academic identity ·
cheerful/comfortable colour · hierarchy · density · friendly empty states · education-appropriate cards & tables
(NOT a generic company ERP) · RTL/LTR quality · mobile · and — with **explicit priority** — the **TEACHER** and
**FAMILY** dashboard experience.

**Standing rule of this audit**: we do **not** clone the legacy. The legacy is a generic purple Bootstrap ERP
(MatDash template) with a salary band, a fine chip and a real e-mail in the header. Where we are already better,
this document says **PRESERVE** and names it, so no future spec "fixes" it back.

**Status**: documentation only. Zero app files touched. Every row carries an evidence path and a future owner.

---

## 0. Method + honest counts

| Item | Count |
|---|---|
| Current screenshots opened **as images** in this pass | **12** (`dashboard` ar/light/desktop · `dashboard` ar/light/mobile/drawer · `teacher-portal` ar/light/desktop · `family-portal` ar/light/desktop · `teacher` ar/light/desktop · `teacher-library` ar/light/desktop · `finance` ar/light/desktop · `sessions-analysis` ar/light/desktop · `certificates` sp031 · `settings` sp040-integrations · `reports` sp037-analysis · `students` sp037-student-results) |
| Legacy screenshots opened **as images** in this pass | **2** (`output/roles/teacher/screenshots/teacher-home-full.png` · `output/roles/family/screenshots/student-home-full.png`) |
| Current source files read (verbatim) | 12 (`pages/dashboard.js` · `pages/teacher-portal.js` · `pages/family-portal.js` · `pages/teachers.js` · `pages/library.js` · `components/welcome.js` · `components/kpi-card.js` · `components/sparkline.js` · `components/portal-page.js` · `components/table.js` · `components/topbar.js` · `fixtures/kpis.js` · `fixtures/welcome.js` · `fixtures/finance.js` · `src/styles/app.css` · `locales/ar.fin.js` · `locales/en.fin.js`) |
| Pages carried from the 15 cluster audits **without re-opening the image** | the remainder — each such row is marked `[from C0x audit]` and cites the screenshot path the cluster auditor opened. I do **not** claim to have seen those pixels myself. |
| Pages covered in the page-by-page register (§6) | **58 / 58** (57 mirrored bases + `index.html`, which has no `.en` mirror → 115 files) |

---

## 1. Verdict

**The product's academic identity is real and it is a decisive win over the legacy.** Warm cream canvas, violet
(admin) / teal (teacher) / indigo-violet (family) role accents, soft rounded cards, medallion icons, icon+text
status chips, Arabic-Indic numerals, correct RTL mirroring, a credible dark theme. Nothing in the app reads like
the legacy's cold Bootstrap ERP. **No page needs an identity rescue.**

What the product needs is **not a repaint**. Ranked, the real visual-quality problems are:

1. **The teacher dashboard is the weakest surface in the product** — it *lies* (7 «قريبًا» chips on 7 pages that
   exist and are linked from the same screen's sidebar) and it is *inert* (today's classes have zero
   affordance). It is also the surface the legacy did best. **Priority 1.**
2. **Design-system artifacts are shipping on production operator screens** — a "UI states" gallery band sits on
   the admin home; a pager renders 1|2|3 and does nothing; one drawer serves six rows.
3. **Density is bimodal**: half the pages are 40–60 % empty viewport (teacher-library, teacher.html overview,
   reports#analysis, certificates, time-converter), the other half are undifferentiated card walls
   (sessions-analysis 20 cards, settings#integrations 11 identical grey tiles, students#results 14 identical rows).
4. **Empty / error / loading states exist as components and are used almost nowhere in production** — while every
   legacy table in the content, certificates and library clusters was **empty at crawl time**, i.e. the empty
   state is the day-one screen of a real academy.
5. **Mobile has one hard defect** (admin drawer clips every label).

---

## 2. PRESERVE — what we already do better (do not "fix" these back)

| # | What | Evidence (legacy) | Evidence (ours) |
|---|---|---|---|
| P-1 | **No salary band on the teacher home.** Legacy leads the teacher's day with «Your Salary 997.00 EGP · Estimated 1,537.00 · Fines: 1,003.00 · Bonus 2,000.00» — a pay panel above the classes. | `output/roles/teacher/screenshots/teacher-home-full.png` (opened) | `app/screenshots/teacher-portal__ar__light__desktop.png` — zero pay token. **REJECTED_PAY_FREE, permanent.** |
| P-2 | **No computed vanity metric.** Legacy teacher hero: «Attended Percentage 0%». | same file | `pages/teacher-portal.js` idHero = authored counts (classes/follow-ups/tasks). |
| P-3 | **No real PII in the chrome.** Legacy header dropdown prints a real name + real gmail and builds the avatar via `ui-avatars.com`. | `output/roles/admin/html/raw/management-home.html` | `components/topbar.js` — fixture persona, initials avatar, 0 external requests. |
| P-4 | **A family home that is actually populated and warm.** The legacy family home is three zeroed hour tiles + two **pink error-coloured** empty states («No sessions today», «No Teachers») on a bare white page. | `output/roles/family/screenshots/student-home-full.png` (opened) | `app/screenshots/family-portal__ar__light__desktop.png` — hero, day rail across children, 5 child cards with drill-downs, status-first billing, quick links. **The single biggest UX gain in the product.** |
| P-5 | **Friendly, non-alarming empty states.** Legacy renders "nothing here" in an error-red panel; ours use a calm card + a real CTA (`components/states.js`). |  `student-home-full.png` | `components/states.js` |
| P-6 | **Icon + text status chips everywhere** (never colour-only), vs the legacy's colour-tinted timetable blocks whose legend encodes *payment* status. | `output/roles/admin/.../all-teachers-timetable` (per C06 audit) | `components/status-chip.js` |
| P-7 | **Real dark theme + system mode across all 115 pages, with a no-flash boot snippet.** Legacy flips a Bootstrap attribute on a light-first template. | `management-home.html` customizer | `theme.js`, `scripts/build-html.mjs:162` |
| P-8 | **Genuine RTL-first rendering.** All 339 legacy captures are `lang=en / dir=ltr` — the legacy **never actually rendered RTL** despite offering 8 locales. | `frontend-planning-deep/speckit-discovery.md:11` | every `*__ar__*` screenshot |
| P-9 | **`messages.html` and `tasks.html` are the reference-quality pages** — warm canvas, real bubbles, medallion identity, labelled chips; and tasks refuses the legacy's empty donut chart in favour of honest per-column tallies. `[from C11/C14 audits]` | `output/roles/admin/screenshots/management-chat-full.png`, `management-tickets-full.png` | `app/screenshots/messages__ar__light__desktop__sp034-messages.png`, `tasks__ar__light__desktop__sp034-tasks.png` |

---

## 3. PRIORITY 1 — THE TEACHER DASHBOARD (`teacher-portal.html` + the 7 teacher-* pages)

The legacy teacher home is ugly but **operationally complete**: a date search, a class row, and four live controls
(`View` · `Enter Again` · `End class` · gear → Send Reminder / Running)
(`output/roles/teacher/screenshots/teacher-home-full.png`, opened). Our teacher home is beautiful and
**operationally empty**. That inversion is the finding.

| ID | Finding | Evidence | Severity | Owner |
|---|---|---|---|---|
| **V-T1** | **The quick-links band is a lie.** All seven tiles («جدولي · طلابي · نتائج الحصص · المهام · التقارير · مكتبتي · ملفي») render `.pt-qtile.is-planned` with a «قريبًا» chip — for seven pages that **exist**, are **built**, and are **linked from the sidebar of the very same screen**. `quickTiles()` hard-codes `is-planned` and never reads `e.status`, while the family twin does. | **Ours**: `app/src/js/pages/teacher-portal.js:33-35` vs the correct `app/src/js/pages/family-portal.js:40-44`; visible bottom-of-page in `app/screenshots/teacher-portal__ar__light__desktop.png` (opened). Also contradicts the standing «planned = 0» census, which never covered `.pt-qtile-soon`. | **CRITICAL** — a visible dishonesty + 7 dead controls on the role home | **045** (teacher group) — a one-expression corrective: mirror `family-portal.js:40-44` |
| **V-T2** | **Today's classes have no affordance at all.** `stopCard()` emits a plain `<div>` — no link, no kebab, no "record outcome", no "open class". The teacher's most important object on their most important screen is a decoration. The legacy row carried 4 controls. | **Ours**: `app/src/js/components/portal-page.js:92-104` (`stopCard` = `<div class="pt-stop">`, zero `<a>`, zero `data-*` hook). **Legacy**: `teacher-home-full.png` row → View / Enter Again / End class / gear. | **HIGH** | **045** (visual + affordance) · the class-report FORM behind it → **044** (long-form host) + **056** (fields) · join → **054** |
| **V-T3** | **The whole page is one hue.** Teal on mint on cream, top to bottom: hero wash, 3 stat cards, rail chips, follow-up chips, flow strip, gate panel. There is no tonal hierarchy, so nothing announces itself as *the* next action. Contrast the admin home, which uses a violet gradient hero to anchor the eye. | `app/screenshots/teacher-portal__ar__light__desktop.png` (opened); `app/src/styles/app.css` `--pt-accent` teal for the teacher shell | **MEDIUM** (identity is fine; hierarchy is not) | **045** |
| **V-T4** | **The flow strip mixes a dashed gate card into a row of three solid cards** («سير التسجيل والأداء»: التحضير · الحضور · **تسجيل النتيجة** (dashed) · المراجعة). It reads as a broken card, not as a deliberate lock. | `teacher-portal__ar__light__desktop.png` (opened), 3rd tile; `app/src/js/components/portal-page.js` `flowStrip` | **MEDIUM** | **045** + **044** (the shared "gated affordance" visual language) |
| **V-T5** | **`teacher.html` (admin's view of a teacher) clips its own primary action.** 14 action buttons in one flex row; at 1440 the last («حذف») is cut off by the viewport edge — you can see the severed «حذ» and its icon. | `app/screenshots/teacher__ar__light__desktop.png` (opened, right/left edge); `app/src/js/components/teacher-actions.js` | **HIGH** (a destructive action is half-rendered) | **044** (overflow/kebab strategy) then **045** |
| **V-T6** | **`teacher-library.html` is the emptiest page in the product**: 3 cards, no search, no category filter, a broken 2-column flow (card 2 sits below card 1 leaving a hole), and ~45 % dead viewport. The legacy teacher library had search + category. | `app/screenshots/teacher-library__ar__light__desktop.png` (opened); legacy `/teacher/library` per C10 audit | **MEDIUM** | **045** (visual) + **056** (the 2 filters) |
| **V-T7** | **`teacher-outcomes.html` / `teacher-reports.html` / `teacher-profile.html` are *descriptions of forms*, not forms.** They are polished and they render field LABELS with zero inputs (legacy: 5 / 9 / 4 real inputs). Any "page review" that scores them on looks will mark them done; they are unfinished. `[from C02/C13 audits]` | `app/src/js/pages/teacher-outcomes.js` (0 `field(`), `teacher-reports.js` (5 labels), `teacher-profile.js` (3 gates); legacy `output/roles/teacher/pages/teacher-home.json` (endclass modal), `teacher-studentslist.json` | **HIGH** (product-completeness, surfaced visually) | **044** (host) → **056** (fields) |
| **V-T8** | **No logout anywhere on the teacher shell** (the legacy sidebar's last item is Log Out). `[from C15 audit]` | `app/src/js/fixtures/portal.js:159-168` (ROLE_NAV.teacher: 8 items, no logout); legacy `teacher-home-full.png` sidebar | **LOW** (visual completeness of the shell) | **045** + backend auth (**057** to freeze the decision) |
| **V-T9** | **`teacher-performance.html` is the only admin board a teacher's name is scored on** — it is display-only and correct today, but it is the natural home of any future recognition surface and must never regain the legacy's computed `Percentage`. `[from C02 audit]` | legacy `output/roles/admin/screenshots/management-teacher-feedback-full.png` (Percentage column) | note | **045** (depth) · **052** (privacy-safe recognition) |

### Teacher redesign opportunities (concrete, academy-specific — not a legacy clone)

- **T-R1 — Make the day rail the page.** Today's class becomes a *lesson card*: subject medallion, group/room,
  roster count, and one primary affordance per state — «ابدأ التحضير» (before) → «سجّل نتيجة الحصة» (after, opens
  the 5-field outcome form the legacy had) → «راجع الواجب» (next day). One card, one verb. Everything else on the
  page becomes secondary. (Owner **045**, form host **044**, fields **056**.)
- **T-R2 — Replace the four "sections" with a single teaching day timeline.** Prepare → teach → record → review is
  already the mental model (`flowStrip`); today it is a static strip *below* the rail. Fuse them: the strip should
  be the rail's state machine, not a second explanation of it.
- **T-R3 — Give the teacher one warm, non-numeric encouragement band** (e.g. «٣ حصص، ١٨ طالبًا اليوم») instead of
  the 3-KPI stat row. The academy is not an ERP; the teacher does not need a KPI dashboard about themselves — and
  the legacy's version of "a number about the teacher" was a salary and a percentage.
- **T-R4 — Colour by subject, not by role.** The teacher's screen shows one subject (الرياضيات) three times in the
  same teal. A per-subject accent (authored, from the subject fixture) would make the day scannable and would read
  as a *school*, not as a SaaS console.

---

## 4. PRIORITY 1 — THE FAMILY DASHBOARD (`family-portal.html` + the 8 family-* pages + `family-child`)

The family home is our **best** page and it beats the legacy by a wide margin (see P-4). The findings here are
refinements, not rescues — with **one product-dignity issue** that deserves an explicit decision.

| ID | Finding | Evidence | Severity | Owner |
|---|---|---|---|---|
| **V-F1** | **Five siblings are shown side-by-side with a progress percentage and a filled bar** — ٧٨٪ · ٤١٪ · ٣٣٪ · ٢٨٪ · ١٥٪. The numbers are authored (no computed score, no law broken), but the *layout* turns the guardian's home into a **sibling league table**. A child at ١٥٪ is publicly the last card on their parent's dashboard. This is a product-dignity decision, not a bug. | `app/screenshots/family-portal__ar__light__desktop.png` (opened, «أبنائي» band); `app/src/js/pages/family-portal.js:75-76` (`<div class="pt-bar is-live"><span style="width:${s.progress}%">` + `num(s.progress)`) | **HIGH** (product judgement) | **046** (family group) to redesign the child card around *this child's* movement («تقدّم ثابت», «يحتاج متابعة لطيفة» — the signal line we already author) rather than a comparable %; **052** owns the recognition/no-ranking principle; **043** if progress data is ever role-scoped |
| **V-F2** | **The day rail is inert here too** (same `stopCard` `<div>`) — a guardian cannot click today's session to reach the child, the teacher, or the schedule. Every other band on the page has a real link; the most time-sensitive one has none. | `app/src/js/components/portal-page.js:92-104`; `family-portal__ar__light__desktop.png` (opened) | **MEDIUM** | **046** |
| **V-F3** | **The «الفواتير والطلبات» band is two near-empty status rows + two gate cards** — it is the only cold band on a warm page, and the two gate cards («الفواتير والحساب» / «طلب لقاء») visually outweigh the two real status rows above them. | `family-portal__ar__light__desktop.png` (opened) | **MEDIUM** | **046**; the "request a meeting" *capability* has no admin producer at all → **055** (C04-29) |
| **V-F4** | **The guardian cannot request anything from the home.** The legacy's family home had a **Request Trial** button right on it. Ours is a gate on another page (`family-requests.html`, which renders 0 form fields against the legacy's 10-control wizard). Visually the family app is "read-only", which is exactly the criticism the legacy avoided. `[from C03 audit]` | legacy `output/roles/family/screenshots/student-home-full.png` (opened — the yellow «Request Trial» button); ours `app/src/js/pages/family-requests.js` (0 `field(`) | **HIGH** | **046** (entry point) + **056** (the wizard) + **055** (the request → admin lead loop) |
| **V-F5** | **`family-materials.html` grouped by child is a genuine improvement** (legacy: a marketing hero + a category dropdown) but has **no search and no filter** at all. `[from C10 audit]` | `app/src/js/pages/family-materials.js`; legacy `/student/library` | **LOW** | **046** + **056** |
| **V-F6** | **`family-billing.html` is status-first and amount-free** (the zero-pay law). It is honest and calm. **PRESERVE** — and note that its visual restraint is a *feature*, not an unfinished page: a future reviewer must not "complete" it with amounts. `[from C07 audit]` | `app/src/js/pages/family-billing.js`; Spec 020 zero-pay line | note | **046** (visual only, law unchanged; any amount requires an explicit law amendment via **043**) |

### Family redesign opportunities

- **F-R1 — Child card = one child's story, not a scoreboard row.** Avatar + subject + the authored signal line +
  the *next* thing that matters («واجب الرياضيات — الخميس»), and the drill-down. Drop the % bar from the home
  (keep it, if wanted, inside `family-progress` where a single child is in focus).
- **F-R2 — Make the day rail the guardian's answer to "where is my child right now".** Room + teacher + child chip
  are already rendered; they just need to be a link into `family-child.html#child=stX`.
- **F-R3 — One cheerful "this week at the academy" band** (authored) would give the family home a reason to be
  visited on a day with no sessions — today it degrades to a hero + two empty rows.

---

## 5. THE ADMIN HOME + THE SHELL (`dashboard.html`, topbar, sidebar, mobile)

| ID | Finding | Evidence | Severity | Owner |
|---|---|---|---|---|
| **V-A1** | **A design-system gallery band ships on the production admin home.** `dashboard.js:116-120` renders `sectionHeader('section.states')` + `loadingSkeleton()` + `errorState()` + `emptyState()` under the heading «حالات الواجهة». An operator's home screen ends with a fake error card and a fake skeleton. Meanwhile the **real** sessions table has no empty/error state — and the legacy proves it needs one («No session today» band). | `app/src/js/pages/dashboard.js:116-120` (read); visible at the bottom of `app/screenshots/dashboard__ar__light__desktop.png` (opened) | **CRITICAL** (a fake error message on the operator home) | **047** (admin core) — move it to `gallery.html`, which exists precisely for this (`C14-17`, orphan-by-design) |
| **V-A2** | **The pager is a dead control that looks alive.** `components/table.js:88-90` emits `1 | 2 | 3` buttons with no handler and no `data-*` hook, under a «عرض ٥ من ٢٤ جلسة» label. Nothing paginates. This is the last surviving *silent* dead control after Spec 011/026. | `app/src/js/components/table.js:80-92` (read); `dashboard__ar__light__desktop.png` (opened) | **HIGH** | **044** (wire it, or replace with an honest "showing N of N") — recorded as `C01-33` REJECTED_NO_FAKE |
| **V-A3** | **Two different attendance rates on one screen.** The welcome ring shows **٩٣٪** (`fixtures/welcome.js:9 attendanceRate: 93`) and the KPI card 12 cm below shows **٩٢٪** (`fixtures/kpis.js:16 value: 92`). Same metric, same viewport, two numbers. | both files read; both visible in `dashboard__ar__light__desktop.png` (opened) | **HIGH** (credibility) | **047** — one authored source of truth |
| **V-A4** | **The KPI row renders four SVG charts and four trend pills.** `components/sparkline.js:10-31` draws a line + area chart per KPI; `kpi-card.js:22` renders `trendPill({dir,pct})` → «↑ ١٢٪», «↑ ٨٪». The values are **authored** (`fixtures/kpis.js`) and there is no chart library and no `<canvas>` — but the *visual claim* is a month-over-month trend with **no time axis, no period label and no tooltip** anywhere on the page. It is also in tension with the law repeated by Specs 029/036/037/038 («no chart, no computed metric»). **Resolve from source, not from summaries: charts DO exist, on the admin home, since Spec 001's approved design.** | `app/src/js/components/sparkline.js:10-31, 42-53` · `components/kpi-card.js:11-26` · `fixtures/kpis.js` (all read); `dashboard__ar__light__desktop.png` (opened) | **HIGH** (an unresolved contradiction between the shipped design and the standing law) | **057** (final freeze) must make an explicit ruling: either (a) sanction the authored sparkline as part of the approved Spec-001 dashboard and **label the period**, or (b) drop it. **Do not let 045–050 silently repaint it either way.** |
| **V-A5** | **`٤٨,٢٠٠ ريال` monthly revenue sits on the admin home** — the only money aggregate outside `finance.html`, and the only KPI with a currency. Authored, so no law is broken, but it is the one card that makes the academy home read like a company ERP. | `app/src/js/fixtures/kpis.js:21`; `dashboard__ar__light__desktop.png` (opened) | **MEDIUM** | **047** (an academy home should lead with children and classes, not revenue) |
| **V-A6** | **The KPI tiles and status tiles are inert.** In the legacy, every home tile is a drill-down (`?status=1|8|2,10|...`). Ours are cheerful dead ends. | `app/src/js/components/status-tile.js` (no href/hook); legacy `output/roles/admin/pages/management-home.json` (status query variants) | **MEDIUM** — recorded as `C01-02` MISSING | **047** |
| **V-A7** | **The admin mobile drawer clips every label.** `enhance.js openDrawer()` clones the whole desktop `#shell > .sidebar` (rail + panel) into a narrower panel: the icon rail disappears, the nav labels are cut at the edge, and the `٢٤` badge floats detached from its row. | `app/screenshots/dashboard__ar__light__mobile__drawer.png` (**opened — confirmed**); `app/src/js/enhance.js` `openDrawer()` | **HIGH** (the only hard mobile defect in the product) | **044** (Modal/Drawer/Long-Form Interaction System) |
| **V-A8** | **A static unread dot on the notifications bell.** `components/topbar.js:39` emits `<span class="dot"></span>` unconditionally; the popover behind it has 2 placeholder rows and a gated "view all". A permanent red dot that never clears is a fake signal. | `app/src/js/components/topbar.js:36-42` (read) | **MEDIUM** | **055** (notification engine) — but the **dot should be removed now**, by whichever page-review spec owns the shell (**050**) |
| **V-A9** | **`⌘K` is decorative.** The search box renders a `kbd` hint; no key handler exists in `enhance.js`. `[from C15 audit]` | `app/src/js/enhance.js` (no keydown for K) | **LOW** | **050** |
| **V-A10** | **`index.html` is a bare 3-line meta-refresh** with an unstyled Arabic link flash, and there is **no `404.html`** anywhere in `public/` — while the legacy shipped a real branded 404 («Opps!!!» + Go Back to Home), captured for both teacher and family. `[from C14/C15 audits]` | `app/public/index.html`; legacy `output/roles/teacher/screenshots/main-index-html-full.png` | **MEDIUM** | **057** (freeze) — a real landing + a branded 404; design → **050** |

---

## 6. PAGE-BY-PAGE REGISTER — all 58 pages named

Verdict key: **PRESERVE** (no visual work) · **POLISH** (density/hierarchy only) · **REDESIGN** (the page's shape is
wrong) · **DEFECT** (something is broken/dishonest on screen).
`[img]` = I opened the screenshot as an image in this pass. `[C0x]` = carried from that cluster audit's
`visualReviewNeeded`, which cites the screenshot it opened.

### Role priority — teacher (owner **045**)

| Page | Verdict | Why (evidence) |
|---|---|---|
| `teacher-portal` | **DEFECT + REDESIGN** | V-T1 (7 false «قريبًا», `pages/teacher-portal.js:33-35`) · V-T2 (inert rail) · V-T3 (mono-hue) · V-T4 (dashed card in a solid row). `[img]` |
| `teacher-schedule` | POLISH | Honest "rest day" empty states (better than the legacy's blank grid); availability editing is a gate line only. `[C06]` |
| `teacher-students` | POLISH + DEFECT | Link-less roster (zero `href` in `pages/teacher-students.js`) — no drill-down to a student's history, which the legacy had. `[C05]` |
| `teacher-outcomes` | REDESIGN | Read-only cards where the legacy had the 5-field end-class modal (V-T7). `[C13]` |
| `teacher-tasks` | PRESERVE | Own tasks only — correctly refuses the legacy's cross-role staff-performance table. `[C02]` |
| `teacher-reports` | REDESIGN | 5 dimension labels, 0 inputs, against a 9-field legacy rubric (V-T7). `[C13]` |
| `teacher-library` | REDESIGN | 3 cards, 0 filters, ~45 % dead viewport, broken 2-col flow. `[img]` |
| `teacher-profile` | POLISH | Display-only + 3 gates; visually fine, functionally hollow. `[C12]` |
| `teachers` (admin) | POLISH | «متوسط الإشغال ٦٣٪» is computed at render (`pages/teachers.js:91` `Math.round(reduce/length)`) — the only runtime-computed % on a teacher surface. Needs an explicit ruling (authored literal vs computed) → **057**. |
| `teacher` (admin) | **DEFECT** | V-T5: 14-button action row clips «حذف» at 1440. Overview tab = 2 cards + ~40 % blank. `[img]` |
| `teacher-performance` | POLISH | Display-only counts + categorical chips; never reintroduce the legacy `Percentage`. `[C02]` |

### Role priority — family + child-view (owner **046**)

| Page | Verdict | Why |
|---|---|---|
| `family-portal` | POLISH (+1 product decision) | V-F1 sibling league table · V-F2 inert rail · V-F3 cold billing band · V-F4 no request entry point. `[img]` |
| `family-children` | POLISH | Same child-card question as V-F1. `[C04]` |
| `family-child` | PRESERVE | The `#child=stX` switcher is a genuine, legacy-free improvement. `[C03]` |
| `family-schedule` | PRESERVE | Day-grouped week + honest empties; beats the legacy 7-column table. `[C06]` |
| `family-progress` | POLISH | The consumer of a report **nobody in the product can author** (C08-06) — visually complete, structurally orphaned → **056** + **055**. |
| `family-billing` | PRESERVE | Status-first, amount-free (V-F6). Do not "complete" it with money. |
| `family-requests` | REDESIGN | Preview cards with **0 form fields** vs a 10-control legacy wizard (V-F4). `[C03]` |
| `family-materials` | POLISH | Grouped by child (good); 0 search, 0 filter (V-F5). `[C10]` |
| `family-profile` | POLISH | Display-only + 3 gates. `[C12]` |
| `families` (admin) | POLISH | 3 summary cards vs the legacy's 7 lifecycle tiles with counts — the directory's triage story reads thin. `[C04]` |
| `family` (admin) | POLISH | 5 tabs vs the legacy's 7 tabs + 4 settings panels; needs a tab-scale plan before Settings/Billing/Activity land → **044** + **046**. `[C04]` |
| `add-family` | PRESERVE | The 5-step wizard + native `<details>` "add another child" is far better than the legacy's 32-control wall. `[C04]` |
| `student-portal` (child view) | PRESERVE | Hero + rail + homework snapshot + وسام celebration — the strongest identity work in the product; the legacy has no student login at all. `[C03/C13]` |
| `student-schedule` · `student-history` · `student-homework` · `student-materials` · `student-progress` | PRESERVE / POLISH | All child-view; `student-homework` is a capability the legacy never had. `[C13]` |
| `student-profile` | **DEFECT (role model)** | Renders a "change your password" gate for a login that **does not exist** (`fixtures/portal.js:320-324`; Spec 021: legacy has no student role) → **043**. |

### Admin core operations (owner **047**)

| Page | Verdict | Why |
|---|---|---|
| `dashboard` | **DEFECT + POLISH** | V-A1 states gallery on production · V-A2 dead pager · V-A3 93 % vs 92 % · V-A4 sparklines/trend pills · V-A5 revenue card · V-A6 inert tiles. `[img]` |
| `sessions` | POLISH | Same dead pager; the row-kebab's destructive **Cancel has no confirm** (`enhance.js:94-101`) while every other kebab guards its destructive item. `[C06]` |
| `schedule` | POLISH | Labelled blocks + conflict flags — better than the legacy lattice; missing week counters. `[C06]` |
| `attendance` | POLISH | A board the legacy does not have. `[C06]` |
| `sessions-analysis` | **REDESIGN** | 20 near-identical white cards in a 4-col grid; the 4 "quick glance" cards render their value so small it is visually lost. The most generic-ERP wall in the product. `[img]` |
| `scheduled-actions` | REDESIGN | Card wall, no filter, no empty state, and a disabled "create" primary that reads as a broken button (against a 16-control legacy form). `[C14]` |
| `public-holiday` | REDESIGN | Card wall, no form, no empty state; two header gates carry the whole capability. `[C06]` |
| `schedule-search` | PRESERVE | KPIs + candidate cards + per-slot drawers + a real empty state — the legacy page renders **no results region at all**. `[C06]` |
| `time-converter` | POLISH | The conversion genuinely works (`enhance.js:336-379`) — preserve. ~60 % empty viewport; the "Changes" tab **has no screenshot at all** in `app/screenshots/` → capture before any freeze claim. `[C14]` |

### Directories & profiles (owner **048**)

| Page | Verdict | Why |
|---|---|---|
| `students` | POLISH | 3 static summary cards where the legacy had 7 clickable lifecycle tiles. `[C03]` |
| `students#view=results` | **REDESIGN** | 14 identical rows, 11 of them reading «٠ شهادات» — a wall of zeros with one repeated CTA, no filter bar. `[img]` |
| `students#view=evaluation` | REDESIGN | Same shape; the legacy monitor at least had 3 facets. `[C13]` |
| `student` (admin) | POLISH | Overview is sparse (2 info cards + 1 hint) for the product's centrepiece record; Evaluation renders 4 of 9 evidenced rubric dimensions. `[C03/C13]` |
| `courses` · `course` · `groups` · `group` | POLISH | Visually calm in light/dark/mobile — **partly because they carry no row actions at all** (no kebab anywhere). `group`/`groups` render an **invented capacity** («السعة ١٦») that the Spec-027 contract required to be grounded in `suggested_total_hours`. `[C05]` |
| `staff` | POLISH | 5 cards in a 3-col grid ≈ 40 % empty; the card shows name/username/role/status while e-mail + phone hide in a drawer. **The RBAC drawer has never been rendered in any artifact** — `staff__ar__light__desktop__sp031-staff-rbac.png` is byte-identical to the non-drawer frame (md5 `124561b3…`). `[C12]` |

### Finance, reports, content (owner **049**)

| Page | Verdict | Why |
|---|---|---|
| `finance` (overview tab) | **DEFECT + REDESIGN** | 9 of 10 elements are locked cards — the admin's first finance screen says "everything needs the server" while the honest product lives in the other five tabs. **And the `monthlyInvoices` card still says «قيد التخطيط — ليست جزءًا من المعاينة الحالية»** although the Monthly Invoices tab and nav route shipped in Spec 038 — `fixtures/finance.js:94 availability:'planned'` (read; the last surviving `planned` string in finance, missed by the nav-only census). Also **AR/EN copy drift**: `locales/ar.fin.js:66,71,76` still use the pre-Spec-026 «هذا عرض تجريبي فقط» while `locales/en.fin.js:65,70,75` say "available once the server is connected". `[img]` |
| `finance#view=salaries` | POLISH | A 3-col grid of near-empty figure-free name cards with a wrap hole. Figure-free is the **law** — preserve that; fix the grid. `[C07]` |
| `finance#view=monthly-invoices` / `invoices` / `payments` / `banks` | POLISH | Dense zebra rows, no month-level personality, **no error state anywhere in the hub** (the legacy proves a download-failure banner is a real state). `[C07]` |
| `reports` (overview) | POLISH | Very long: roll-up tiles + catalogue + 5 detail cards + feedback board + forms board. Density/IA candidate. `[C08]` |
| `reports#view=analysis` | **REDESIGN** | 5 cards on a wide canvas with ~55 % dead viewport and a layout hole in row 2. Reads unfinished rather than deliberate. `[img]` |
| `reports#view=monthly` | POLISH | Inert month sections; no per-row drill-down. Also a **label collision**: the legacy "monthly reports" means the *student progress report monitor*, ours is an operational roll-up → **057** must rule on the nav label. `[C08/C13]` |
| `library` | POLISH + **DEFECT** | Warm, chip-labelled, academic — keep. But **every subject row's Edit opens the same drawer prefilled with `SUBJECTS[0]`** (`pages/library.js:38,58` — read: `matFormDrawer('mat-edit', …, SUBJECTS[0])`): clicking Edit on «الرياضيات» shows «اللغة العربية». → **044**. |
| `certificates#view=templates` | **REDESIGN** | The "static designer preview" is a **large empty dashed rectangle with four floating grey label chips** — against the legacy's real certificate artwork it reads as broken. It must *look* like a certificate (rule border, seal, ribbon, calligraphic frame) with the merge-field labels sitting on it — still zero `<canvas>`, zero drag. Same per-row drawer identity bug as `library` (all 4 cards open `cert-tpl` prefilled with template 1). `[img]` |
| `certificates#view=requests` | PRESERVE | The per-row drawers (`cr-cr1…cr5`) **do** carry correct row identity — use them as the pattern for **044**. `[C10]` |

### Settings, control centre, shell (owner **050**)

| Page | Verdict | Why |
|---|---|---|
| `settings#view=integrations` | **REDESIGN** | **11 identical monochrome grid-icon tiles**, all «غير مُعدّ», identical buttons — a grey, brand-blind, unscannable wall (light **and** dark). We must not copy the legacy's brand assets, but we need per-provider identity (mono glyph + category accent: دفع / صرف / بريد / واتساب). The **sensitive-fields block inside the drawer is excellent** (reads as documentation, not a broken form) — preserve it. `[img]` |
| `settings#view=notifications` | POLISH | A ~34-toggle single-column stack: honest, complete, and visually a generic corporate ERP form with zero academy character. `[C09]` |
| `settings#view=general` / `#view=security` | POLISH | Card stacks; no illustration, no empty-state character, no colour beyond status chips. `[C09]` |
| `settings` drawers (all) | **DEFECT** | `formDrawer()` has **no sticky action footer** (`components/preview-drawer.js:32-38` — only `.sheet-head` is fixed), so Save sits below the fold on a 440 px sheet and on mobile. `[C09]` → **044**. |
| `announcements` | **REDESIGN** | The flattest page in the product: a bare 7-field grid, a bare checkbox column, **three stub selects that all read "All"**, and recipient chips that look interactive and are inert. Needs a real compose → audience → preview → send flow. `[C11]` |
| `messages` | PRESERVE (visual) / **044** (interaction) | Visually excellent. But the row opens a read-only drawer with **no compose box** while the inline thread pane is permanently pinned to `MESSAGES[0]` — the reply affordance disappears exactly when you open a conversation (`pages/messages.js:57,71`). `[C11]` |
| `leads` | PRESERVE (visual) / **044** | The detail drawer consolidates four stacked legacy modals — keep. The 19-field create drawer has no section headings and a below-the-fold CTA. `[C11]` |
| `tasks` | **PRESERVE — reference page** | Chips, cards, density: the strongest page in the product. Do **not** restore the legacy donut chart. `[C14]` |
| `portals` | PRESERVE | An honest, explicitly-labelled demo device with no legacy equivalent; correctly demotes the student to a child-view preview. `[C01]` |
| `index` | **REDESIGN** | A 3-line meta-refresh with an unstyled Arabic link flash (V-A10). → **057** + **050**. |
| `gallery` | PRESERVE | Maintainer-facing, orphan by design (Spec 041 D-2 — settled: do not link it, do not delete it). **It is where the `dashboard` states band (V-A1) belongs.** |

---

## 7. Cross-cutting visual defects (apply to many pages at once)

| ID | Defect | Evidence | Owner |
|---|---|---|---|
| **X-1** | **Empty / loading / error states are components, not product.** `states.js` exists and is *proved in `gallery`* — and is used in production only on `dashboard` **as a gallery** (V-A1). No authored empty state exists for subjects, books, templates, requests, the teacher shelf, `scheduled-actions`, `public-holiday`, or the finance hub — **yet every legacy table in the content/certificates/library clusters was empty at crawl time**, i.e. that is the day-one screen of a real academy. | `app/src/js/components/states.js`; legacy `/management/library` («No Material Added»), `/management/pdf` + `/management/certificate-requests` («No data found»); `C10` audit | **045–050** per page + **057** (freeze the empty-state contract) |
| **X-2** | **Gated primaries look enabled.** `Send` / `Publish` / `Create invoice` render as filled primary buttons carrying `aria-disabled="true"` + `data-disabled-reason`. Consistent and honest in behaviour — but in a static frame they read as live, and `scheduled-actions`' disabled create primary reads as a broken button. The product needs **one** visual language for "this arrives with the server". | `components/ui.js` gate variants; `app/screenshots/scheduled-actions__ar__light__desktop.png` `[C14]` | **044** (define the gated-affordance visual) then **045–050** |
| **X-3** | **Density is bimodal.** ≥40 % dead viewport: `teacher-library` `[img]`, `teacher.html` overview `[img]`, `reports#analysis` `[img]`, `certificates` `[img]`, `staff` `[C12]`, `time-converter` `[C14]`. Undifferentiated walls: `sessions-analysis` (20 cards) `[img]`, `settings#integrations` (11 tiles) `[img]`, `students#results` (14 rows) `[img]`, `settings#notifications` (34 toggles) `[C09]`. | as cited | **045–050** |
| **X-4** | **One drawer per page, not per row.** `library` `mat-edit` (1 drawer, 6 subjects) and `certificates` `cert-tpl` (1 drawer, 4 templates) lose row identity; `staff` `st-perm` is a single shared RBAC matrix for 5 members. The correct pattern already ships (`certificates` `cr-cr1…cr5`). | `pages/library.js:38,58` (read) · `pages/certificates.js:39,70` `[C10]` · `pages/staff.js` `[C12]` | **044** |
| **X-5** | **No sticky action footer in any drawer.** Long forms (19-field `lead-new`, provider drawers, 13-field teacher add) push Save below the fold, worst on mobile. | `components/preview-drawer.js:32-38` `[C09/C11]` | **044** |
| **X-6** | **RTL/LTR quality is genuinely good** — mirrored layouts, Arabic-Indic numerals, correct chip/icon order, no clipped mirrored text found in this pass **except** the admin mobile drawer (V-A7) and the `teacher.html` action row (V-T5), both of which are overflow bugs rather than direction bugs. **PRESERVE.** | 12 `__ar__` frames opened + `dashboard__en__light__desktop.png` (per C15) | — |
| **X-7** | **Dark theme is credible on every frame reviewed** (`*__ar__dark__desktop.png` for dashboard/portals). The only dark-specific complaint carried forward is `settings#integrations`, which is grey in **both** themes. | `[C09]` | **050** |
| **X-8** | **Mobile is sound except V-A7.** Portal shells use a native `<details>` drawer and hold up at 390; the settings drawer scrolls correctly (only the Save position is wrong, X-5). | `teacher-portal__ar__light__mobile__drawer-open.png`, `settings__ar__light__mobile__sp040-drawer-paymob-mobile.png` `[C09/C15]` | **044** |

---

## 8. Academy-specific redesign opportunities (product, not paint)

These are the moves that would make the product read as a **school** rather than a well-styled admin console. Each
is additive to the existing design system — no new dependency, no chart engine, no new hook.

| ID | Opportunity | Where | Owner |
|---|---|---|---|
| **D-1** | **Subject colour, not just role colour.** We author subjects (`fixtures/courses.js`); a per-subject accent would make every day rail, timetable block, child card and material shelf scannable — and would read as a curriculum. Today a teacher's three maths classes are three identical teal cards. | teacher-portal, family-portal, schedule, sessions, course, library | **045–048** |
| **D-2** | **A term/week rhythm.** The product has no sense of an academic calendar — no "week 6 of the term", no term banner, no holiday awareness on any role home (though `public-holiday.html` exists). This is the single most academy-specific thing we are missing, and it costs nothing but authored copy. | all three role homes + `schedule` | **045/046/047** |
| **D-3** | **Certificates that look like certificates.** The designer preview must *be* a certificate (ornamental rule, seal, ribbon, calligraphic frame — pure CSS) with merge-field chips positioned on it. Zero canvas, zero drag, zero PDF. | `certificates#view=templates` | **049** |
| **D-4** | **Celebration language beyond the child view.** `student-portal`'s وسام/achievement language is the warmest thing in the product and exists nowhere else. A teacher who has recorded every outcome, or a family whose child completed a level, deserves the same tone — **without** any score, rank or leaderboard. | teacher-portal, family-portal | **045/046**, principle owned by **052** |
| **D-5** | **Illustration/empty-state character.** Every empty state today is a card with an icon. One authored illustration family (SVG, inline, no asset CDN) would carry the academy identity into the day-one screens that a real academy will actually see first. | X-1 surfaces | **045–050** + **057** |
| **D-6** | **A calm operator home.** Replace the revenue KPI + 4 sparklines with: today's classes, who needs attention, and what is unrecorded. That is what an academy manager opens the app for; the legacy's own home was a class board, not a BI wall. | `dashboard` | **047** |

---

## 9. UNKNOWN_EVIDENCE (visual)

| ID | Unknown | Why it cannot be resolved | Owner |
|---|---|---|---|
| **U-1** | **The legacy never rendered RTL.** All 339 captures are `lang=en / dir=ltr`; the 8 non-English locales were never crawled. So there is **no legacy RTL baseline to compare against** — our RTL quality can be asserted, never compared. | `frontend-planning-deep/speckit-discovery.md:11` | record only; **057** |
| **U-2** | **Legacy accessibility posture is unknown** — no a11y data was captured. Our `critical=0 / serious=0` is machine-gated but not comparable. | corpus | record only |
| **U-3** | **`time-converter#view=changes` has no screenshot** in `app/screenshots/` (only the zone tab, AR light/dark/mobile + EN). Its visual state is unverified. | `app/screenshots/` listing | **047** — capture before any freeze claim |
| **U-4** | **The `staff` RBAC drawer has never been rendered.** `staff__ar__light__desktop__sp031-staff-rbac.png` is byte-identical (md5 `124561b3b9556ed830c11298839aa5d6`) to the non-drawer frame — the capture row clicks a selector that occurs 0× in the built HTML and `.catch()` swallows it. **We have no pixels of our own RBAC matrix.** | `[C12 audit]`; `tests/screenshots/capture.cjs:251,504` | **044** + the future RBAC spec; the capture row itself → **057** |
| **U-5** | **A populated legacy library / certificate-templates / certificate-requests table was never captured** (all three empty at crawl). So the *dense* state of our content pages cannot be visually compared to anything — only the empty state can, and it is exactly the state we do not author (X-1). | `[C10 audit]` | **049** |

---

## 10. Owner allocation — proposed strict partition of the 58 pages (045–050)

Teacher and family get their **own** groups and go **first**, per the brief.

| Spec | Group | Pages (count) |
|---|---|---|
| **045** | **Teacher role review + academic redesign (PRIORITY 1)** | `teacher-portal` · `teacher-schedule` · `teacher-students` · `teacher-outcomes` · `teacher-tasks` · `teacher-reports` · `teacher-library` · `teacher-profile` · `teachers` · `teacher` · `teacher-performance` — **11** |
| **046** | **Family + child-view review (PRIORITY 1)** | `family-portal` · `family-children` · `family-child` · `family-schedule` · `family-progress` · `family-billing` · `family-requests` · `family-materials` · `family-profile` · `families` · `family` · `add-family` · `student-portal` · `student-schedule` · `student-history` · `student-homework` · `student-materials` · `student-progress` · `student-profile` — **19** |
| **047** | **Admin core operations** | `dashboard` · `sessions` · `schedule` · `attendance` · `sessions-analysis` · `scheduled-actions` · `public-holiday` · `schedule-search` · `time-converter` — **9** |
| **048** | **Directories & records** | `students` · `student` · `courses` · `course` · `groups` · `group` · `staff` — **7** |
| **049** | **Finance · reports · content & certificates** | `finance` · `reports` · `library` · `certificates` — **4** |
| **050** | **Settings · control centre · shell** | `settings` · `messages` · `leads` · `tasks` · `announcements` · `portals` · `index` · `gallery` — **8** |
| | **Total** | **58** (strict partition — every page owned exactly once) |

**Cross-cutting owners referenced above**: **043** (student-profile password gate; family progress scoping; any
role-scoped visual) · **044** (drawer/modal system: V-A2 pager, V-A7 mobile drawer, V-T5 action-row overflow, X-2
gated visual, X-4 row identity, X-5 sticky footer) · **052** (recognition without ranking: V-F1, D-4) · **055**
(notification bell V-A8; family meeting request V-F3) · **056** (every missing form behind a beautiful gate) ·
**057** (the V-A4 sparkline ruling · the `monthlyReports` label collision · a 404 + a real index · the empty-state
contract · the `time-converter#changes` and RBAC-drawer capture gaps).

---

## 11. The five things to fix first

1. **`pages/teacher-portal.js:33-35`** — the 7 false «قريبًا» tiles. One expression. It is the most visible
   dishonesty in the product and it sits on a role home. (**045**)
2. **`pages/dashboard.js:116-120`** — get the UI-states gallery off the operator's home screen. (**047**)
3. **`components/table.js:88-90`** — the pager that looks alive and is not. (**044**)
4. **`enhance.js openDrawer()`** — the admin mobile drawer that clips every label. (**044**)
5. **`fixtures/finance.js:94`** + **`locales/ar.fin.js:66,71,76`** — a card that still says "قيد التخطيط" about a
   tab that shipped, and three AR strings that never got the Spec-026 rewording. (**049**)
