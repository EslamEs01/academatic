# Agent 00 — Main-session grounding sample & confirmed findings

Spec 023 — Full Legacy Coverage Audit 000–022 · Audit date: 2026-07-06
Author: main audit session (personal grounding pass required by the Targeted Visual Grounding Gate, in addition to the delegated agents).

## Scope & method

Before delegating the broad audit, the main session personally opened a targeted sample of legacy
and current screenshots (3 legacy role homes + 5 current core surfaces) and ran token-level greps
to verify one suspected role-model wording leak. All paths relative to
`/media/mekky/work/backend/dashboard-intelligence-crawler/academy-dashboard-discovery/`.

## Evidence opened (exact paths)

**Legacy screenshots (opened visually):**
1. `output/roles/admin/screenshots/management-home-full.png`
2. `output/roles/family/screenshots/student-home-full.png`
3. `output/roles/teacher/screenshots/teacher-home-full.png`

**Current screenshots (opened visually):**
4. `app/screenshots/portals__ar__light__desktop.png`
5. `app/screenshots/family-portal__ar__light__desktop.png`
6. `app/screenshots/teacher-portal__ar__light__desktop.png`
7. `app/screenshots/dashboard__ar__light__desktop.png`
8. `app/screenshots/student-portal__ar__light__desktop.png`

**Files greped/read:** `app/src/locales/ar.prt.js` (lines 160–300), `app/src/locales/en.prt.js`
(noteT keys), `app/public/student-{portal,schedule,homework,materials,progress,history,profile}.html`
(note markup), `app/public/assets/locales/ar.prt.js`.

## Observations from the grounding sample

1. **Legacy admin home** (`management-home-full.png`): KPI tile row (Total Classes, Sessions
   Pending, Attend, Waiting & Running, Cancel Sessions, Sessions Absent), Filter-Classes accordion,
   "Classes Of <date>" table with Excel export; the class row displays a **"(3.00 Fine)" pay
   fragment**. Sidebar (Dashboard group): Home, Teachers Schedule, Chat, New Requests, Sessions
   Analysis, Time Convertor, Public Holiday, Advertise & Notify, Tasks, Scheduled Actions. Brand
   "afaaqonline"; an icon rail on the far edge exposes more module groups.
2. **Legacy family home** (`student-home-full.png`, route `/student/home`): per-child hero (Total /
   Remaining / Taken hours + Time Spendings), Today's Classes with **Request Trial** and Show More,
   "Your Teachers" panel. Sidebar: Home, Schedule, Classes Summary, Courses, Billing, Student
   Feedback, Library, Logout. Persona is a child («الطالبة لمار حسن») inside the guardian login —
   consistent with Spec 021's finding that `/student/*` is the Family/Guardian role.
3. **Legacy teacher home** (`teacher-home-full.png`): hero with hours + attended %; **"Your Salary"
   band: 997.00 EGP, Estimated 1,537.00, Fines 1,003.00, Bonus 2,000.00** — primary evidence for
   the pay-free-by-law exclusion scope; Today's Classes with Enter Again / End class actions.
   Sidebar: Home, Chat, Schedule, Students, Library, Tasks (New), Log Out.
4. **Current hub** (`portals__ar__light__desktop.png`): exactly 2 primary role cards (ولي أمر
   «بوابة العائلة» persona أبو سلمان الغامدي; معلّم «بوابة المعلم» persona سارة القحطاني) + admin
   console row («لوحة تحكم الأكاديمية») + demoted preview row («عرض الابن — معاينة», wording
   «الوصول إلى الأبناء يُدار عبر حساب العائلة») + demo notice. Matches Spec 021 DEC-001/002/004.
5. **Current family cockpit** (`family-portal__ar__light__desktop.png`): violet idHero (٥ أبناء /
   ٣ جلسات قادمة / ١ تحتاج متابعة), living day rail (child tags, «جارية الآن» pulse), five child
   story cards with «فتح ملف الابن» links, **status-only billing** («لا فواتير متأخرة — الحالة
   فقط، دون أرقام»), honest «يتطلب الخادم» gates, zero pay figures. Zero-pay law visibly held.
6. **Current teacher cockpit** (`teacher-portal__ar__light__desktop.png`): teal idHero, day rail,
   follow-ups (غياب الطالب/غياب المعلم chips), prepare→attend→record→review flowStrip with the
   record step honestly gated «يتطلب الخادم», quick links all «قريبًا» — **no pay tokens anywhere
   on the surface**. Nav: الرئيسية + 6 planned items (جدولي، طلابي، نتائج الحصص، المهام، التقارير،
   ملفي) + العودة إلى المركز.
7. **Current admin console** (`dashboard__ar__light__desktop.png`): six-category rail, KPI band
   (جلسات اليوم ٢٤ / الطلاب النشطون / نسبة الحضور ٩٢٪ / الإيرادات الشهرية ٤٨٬٢٠٠ ريال — authored
   fixture on the ADMIN surface, sanctioned by the Spec 009-invariant finance scope), sessions
   table, week-ahead, families follow-up band, reports center with «يتطلب الخادم/قيد التخطيط»
   gates, interface-states strip.
8. **Current child-view home** (`student-portal__ar__light__desktop.png`): topbar/shell correctly
   reframed («عرض الابن», role chip «ابن العائلة», welcome «عرض الابن — يوم سلمان الدراسي…»),
   living hero/rail/story present, honest gates (تسليم الواجبات «يتطلب الخادم», السجل الكامل «قيد
   التخطيط») — but see confirmed finding F-00-1 below.

## Confirmed finding F-00-1 — leftover pre-021 Student-primary wording (noteT/noteD)

**Problem**: the bottom note on the child-view surfaces still reads
«**لوحة الطالب — النسخة الأولى** — لوحة مدمجة: نظرة سريعة هنا، والتفاصيل الكاملة في صفحات لوحتك تباعًا.»
and the student-section note copy addresses the reader as the dashboard owner («هذه لوحتك
الدراسية…»). This is pre-Spec-021 Student-primary framing inside the demoted child-view.

**Exact evidence**:
- Locale source: `app/src/locales/ar.prt.js:297` `noteT: 'لوحة الطالب — النسخة الأولى'` and
  `:298` `noteD: 'هذه لوحتك الدراسية. الجلسات المباشرة وتعديل الحساب يتطلبان الخادم؛ الرسائل
  والإشعارات تأتي في المواصفة ٠١٦.'`
- English source: `app/src/locales/en.prt.js:294` `noteT: 'Student dashboard — first version'`.
- Shipped copy of the same file: `app/public/assets/locales/ar.prt.js:297`.
- Rendered in built HTML on **6 of 7** child-view pages: `app/public/student-portal.html:393`,
  `student-homework.html:397`, `student-history.html:344`, `student-profile.html:361`,
  `student-progress.html:409`, `student-materials.html:341` (+ their `.en` pairs). Grep of
  `student-schedule.html` found no «النسخة الأولى» note (different/no note on that page).

**Why Spec 022 did not fix it**: 022's reframing was deliberately limited to the three sanctioned
locale keys (`prt.portal.student` / `prt.role.student` / `prt.title.student`) and the six student
internal modules' `#page-body` were byte-preserved BY LAW (12 extraction-hash proofs). The note sits
inside `#page-body` on the internals, so it was untouchable in 022. It is therefore a **knowing
leftover**, now the top child-view correction candidate.

**Correction shape for 024** (recommendation, not implemented here): reframe `noteT`/`noteD` (ar+en)
to child-view/family-owned wording (e.g. «عرض الابن — النسخة الأولى» + description addressed to the
guardian), rebake the affected pages, **declare supersession of the 019/022 `#page-body` extraction
hashes** for the five affected internals (the home body is not hash-pinned the same way), and re-pin
any smoke assertions that reference those hashes — ONE sanctioned amendment, mirroring how 022
declared supersession of the 020 family-child hash. Priority: **Must fix in 024**.

**Related but NOT a leak**: `ar.prt.js:172` `hub.student: { t: 'بوابة الطالب', … }` — grep proves
«بوابة الطالب» appears in **no built HTML** (hub now renders the childView preview keys instead).
This is a retained displaced key under the zero-deletion law: classification keep/retained,
optional relabel note in the drift register, NOT a 024 blocker.

## Baseline facts (preflight, main session)

- HEAD `837b0c1`, branch `feature/012-role-portal-foundation`, working tree clean at audit start →
  Specs 020/021/022 are **committed**; HEAD is the audit baseline.
- 77 public HTML files; 38 page modules; legacy corpus admin 1,019 shots (300 full) / family 27 /
  teacher 67; combined inventories + frontend-planning(-deep) present; archives
  (`output.zip`, `frontend-planning.zip`, `frontend-planning-deep.zip`) accounted for via their
  extracted folders.
- Branch hook satisfied via `--dry-run` (script targets a top-level `specs/` that does not exist
  in this repo); no new branch, per specs-013–022 convention.

## Risks, gaps, and proposed corrections

- F-00-1 must appear in `role-model-consistency-audit.md` (a contradiction row), in
  `extra-or-drift-register.md`/`coverage-matrix.md` quality columns where the child-view pages are
  classified, and as a **Must fix in 024** row in `correction-backlog-for-024.md` with acceptance
  criterion: no primary-role «لوحة الطالب» wording remains on child-view surfaces (grep-checkable),
  with hash-supersession declared.
- The demoted-preview model itself is verified live (hub) — no other main-session contradiction
  observed; the delegated role-model audit must still run its full sweep.
