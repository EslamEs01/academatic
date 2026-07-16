# Spec 042 — Page-Review Ownership Map (Specs 045–050)

**Status**: Spec 042 ownership artifact (documentation-only — zero application bytes change).
**Baseline**: 115 public HTML files = **57 page bases** (AR/EN pairs) + `index.html` (single-file shell
counterpart). Verified directly against `app/public/` (57 × 2 = 114, + `index.html` = 115). Counts frozen per
`count-and-impact-contract.md`: 57 bases · 50 admin menu · 24 deep / 25 plain / 1 lock · 0 planned ·
`FUTURE_ROUTES {}` · orphan set exactly `{gallery.html, gallery.en.html}`.

## 1. What this artifact is

A **strict partition** of all 57 current page bases across the six bounded page-review + academic visual
redesign specs **045–050**. Every base appears **exactly once** — no duplicate, no orphan, no shared owner.
`index.html` (the 58th public base — the portals-hub shell counterpart, **outside the 57-base `PAGES`
contract**) is explicitly assigned to exactly one group as well.

**Priority law honored**: the teacher portal (teacher-portal + 7 `teacher-*` internals) and the family portal
(family-portal + 7 `family-*` internals) receive explicit HIGH-PRIORITY ownership in the **earliest** groups —
**045** and **046** respectively — never deferred late. They are the weakest experiences and the most-used role
surfaces (spec.md §7).

## 2. The arithmetic (partition proof)

| Group | Theme | Owned bases | Count |
|---|---|---|---|
| **045** | Teacher portal + teacher admin surfaces | teacher-portal · teacher-schedule · teacher-students · teacher-outcomes · teacher-tasks · teacher-reports · teacher-library · teacher-profile · teachers · teacher · teacher-performance | **11** |
| **046** | Family portal + family admin core | family-portal · family-schedule · family-progress · family-billing · family-requests · family-materials · family-profile · family-children · family-child · families · family · add-family | **12** |
| **047** | Student child-view + students & session-lifecycle ops | student-portal · student-schedule · student-homework · student-progress · student-history · student-materials · student-profile · students · student · dashboard · sessions · attendance | **12** |
| **048** | Admin back-office (settings / staff / finance) + scheduling operations | settings · staff · finance · schedule · schedule-search · sessions-analysis · public-holiday · scheduled-actions | **8** |
| **049** | Reports, courses & groups, content catalog | reports · courses · course · groups · group · library · certificates | **7** |
| **050** | Control center, utilities, hub & shell | messages · leads · tasks · announcements · time-converter · portals · gallery — **plus `index` (shell; outside the 57-base PAGES contract)** | **7** (+ index) |

**Sum: 11 + 12 + 12 + 8 + 7 + 7 = 57 bases** ✓ — plus `index` assigned to **050** → 58 public surfaces, all
owned exactly once. Group sizes 7–12 (aim was 8–12; 049 and 050 sit at 7 owned bases each — 050 additionally
carries `index`, and both groups are kept at 7 deliberately rather than borrow an incoherent base from a
neighboring journey).

**Deviation from the recommended shape, declared**: the recommended sketch placed *all* sessions ops in 047 and
kept 048 as settings/staff/finance only. That would have made 047 a 17-base group (over the bound). Resolution:
047 keeps the **session-lifecycle core** (`dashboard` day board + `sessions` + `attendance` — the surfaces
carrying the C01/C06 outcome-form gaps, reviewed together with the child-view pages that *consume* those
sessions), while the five **admin scheduling-operations utilities** (`schedule`, `schedule-search`,
`sessions-analysis`, `public-holiday`, `scheduled-actions`) join settings/staff/finance in 048 as a coherent
"admin back-office & operations" group — all eight are admin-only operator surfaces with no portal counterpart.

## 3. Review dimensions required of EVERY group (045–050)

Each group must run all of the following for every base it owns (spec.md §8, quality gates §9):

1. **Functional gap review** — work the group's allocated rows in
   `future-spec-allocation-register.md` (dispositions PARTIAL / MISSING / UNKNOWN_EVIDENCE assigned to that
   group) plus every `COMPLETE_BUT_VISUAL_REVIEW_REQUIRED` row touching an owned base.
2. **Form completeness** for owned pages — field-level, against the legacy raw records
   (`output/roles/<role>/pages/<slug>.json` beats any summary); coordinate with (never duplicate) Spec 056.
3. **Modal / drawer UX** — every drawer, sheet, confirm and gate on owned pages; coordinate with Spec 044
   (which owns the interaction *system*, incl. the 30 pre-existing `f-fbAdd` duplicate ids).
4. **Cheerful academic visual redesign** — away from corporate-ERP density toward a modern, friendly,
   academy-specific identity; the legacy is capability evidence, **never** a design target.
5. **RTL/LTR parity** — AR is first-class; the EN mirror must be reviewed as a real surface, not a rebake.
6. **Mobile** — 390px-class viewports for every owned base.
7. **Accessibility** — hold the machine-gated `critical=0 serious=0` line (Spec 041 R-2); keyboard paths for
   tabs, drawers and menus.
8. **Light/dark** — both themes on every owned base.
9. **Preservation of INTENTIONALLY_IMPROVED items** — `current-product-better-than-legacy-register.md` and the
   57 INTENTIONALLY_IMPROVED rows in the cluster audits are a **preservation list**; a review pass that
   regresses one of them fails. Standing laws bind every group: no fake success, no authored secret, no real
   corpus PII, teacher pay-free GLOBAL, family zero-pay, student = child-view, `classSalaryReport` sole honest
   lock, counts frozen.

Screenshots must be **opened as images** during review — a filename or extracted text is not visual
inspection.

---

## 4. Group 045 — Teacher portal + teacher admin surfaces (11 bases)

**HIGH PRIORITY — earliest group.** The teacher experience carries the single largest legacy surface
(C02 = 109 legacy pages) and the most visible current defect (the quick-tiles «قريبًا» lie).

**Owned bases (11)**: `teacher-portal`, `teacher-schedule`, `teacher-students`, `teacher-outcomes`,
`teacher-tasks`, `teacher-reports`, `teacher-library`, `teacher-profile` (the Spec 025 portal ×8), plus the
admin teacher surfaces `teachers` (3-tab hub `#view=directory|add|categories`, Spec 041 D-1), `teacher`
(detail + drawers), `teacher-performance` (3 tabs `#view=overview|sessions-kpi|monthly` — the sanctioned admin
exempt board, never linked from the portal).

**Legacy screenshot/record groups to reopen** (open screenshots as images; raw records beat summaries):
- `cluster-evidence-paths/C02-paths.md` — **primary** (Teachers · 109 legacy pages: directory, details,
  categories, availability, teacher-side home/classes/students/library/profile).
- `cluster-evidence-paths/C01-paths.md` — the `teacher-home` rows (both roles) + role-isolation redirect proofs.
- `cluster-evidence-paths/C06-paths.md` — teacher outcome/end-class/absent/cancel-request evidence.
- `cluster-evidence-paths/C10-paths.md` — teacher library rows (search + category propagation).
- `cluster-evidence-paths/C12-paths.md` — teacher own-profile edit / password rows.
- `cluster-evidence-paths/C13-paths.md` — teacher tasks / results-authoring rows.
- `cluster-evidence-paths/C14-paths.md` — the `Teacher Monthly Classes` 500-capture rows (C14-03).

**Group-specific obligations**: fix-forward the **C01-16 / C02-16 / C15-14** defect (7 implemented pages badged
«قريبًا» by `teacher-portal.js quickTiles()`); review teacher directory sort/scope/pagination (C02-01),
teacher-students depth (C02-34), teacher library browse (C02-14 / C10-21), and the Teacher Monthly Classes
evidence gap (C14-03). **Teacher pay-free GLOBAL is absolute** — no salary/rate/fine/payout/currency figure may
appear on any owned surface during redesign; `teacher-performance` stays display-only (no computed
score/rank/chart).

## 5. Group 046 — Family portal + family admin core (12 bases)

**HIGH PRIORITY — second-earliest group.**

**Owned bases (12)**: `family-portal`, `family-schedule`, `family-progress`, `family-billing`,
`family-requests`, `family-materials`, `family-profile`, `family-children` (the Spec 020 portal ×8), plus
`family-child` (the Spec 018 per-child drill-down, `#child=stX`), and the family admin core `families`
(`#view=directory|categories`), `family` (detail + drawers), `add-family` (wizard).

**Legacy screenshot/record groups to reopen**:
- `cluster-evidence-paths/C04-paths.md` — **primary** (Families / Guardians · 31 legacy pages: directory + 7
  status lenses, 31-field advanced filter, detail 7-tab hub, contract form, lifecycle modals, categories,
  parent-meeting pipeline).
- `cluster-evidence-paths/C03-paths.md` — the family-lens student rows (trial request wizard, per-child
  history).
- `cluster-evidence-paths/C07-paths.md` — family subscriptions / billing rows (C07-21; **status-first,
  figure-free** in our product — zero-pay law).
- `cluster-evidence-paths/C06-paths.md` — family request-cancel/reschedule + upload rows.
- `cluster-evidence-paths/C10-paths.md` — family/child materials rows.
- `cluster-evidence-paths/C12-paths.md` — guardian own-profile edit rows.
- `cluster-evidence-paths/C13-paths.md` — trial/schedule request-response tracker rows.

**Group-specific obligations**: families directory board depth (C04-01), categories management surface
(C04-19), the family billing tab review (C04-06 — backend prerequisite; **never** fake an invoice write),
subscriptions list (C07-21). **Family zero-pay portal is absolute** — the family portal carries zero
currency/pay figures; billing stays STATUS-FIRST and amount-free. No real corpus PII (real guardian names,
phones, `chat.whatsapp.com` invites are never ported).

## 6. Group 047 — Student child-view + students & session-lifecycle ops (12 bases)

**Owned bases (12)**: `student-portal`, `student-schedule`, `student-homework`, `student-progress`,
`student-history`, `student-materials`, `student-profile` (the child-view ×7 — reframed «عرض الابن», Spec
021/022/024), plus `students` (`#view=directory|results|evaluation`), `student`
(`#view=results|evaluation` profile tabs), and the session-lifecycle core: `dashboard` (admin day board),
`sessions`, `attendance`.

**Legacy screenshot/record groups to reopen**:
- `cluster-evidence-paths/C03-paths.md` — **primary** (Students · 39 legacy pages: directory lifecycle tiles,
  detail hub, ~20 session-lifecycle modals, family child-view pages).
- `cluster-evidence-paths/C01-paths.md` — **primary for `dashboard`** (management-home + 8 status-lens
  variants, 12-input filter, 10-action row kebab, class-detail 004, total-queues).
- `cluster-evidence-paths/C06-paths.md` — sessions / attendance / outcome-drawer evidence.
- `cluster-evidence-paths/C13-paths.md` — results / evaluation / homework rows.
- `cluster-evidence-paths/C10-paths.md` — student/child materials rows (C10-22).

**Group-specific obligations**: KPI/status drill-downs (C01-01), the dashboard "UI states" showcase band
removal + a real empty/error state for the sessions table (C01-18), day-board export gate surface (C01-06),
student directory/detail depth (C03-01/02), student analytics evidence gap (C03-06), child-view pages
(C03-16). **Student is a CHILD-VIEW, not an adult role** — no «لوحة الطالب» framing may return; the portal
persona stays fam1's child st1. No computed score/rank/chart on results/evaluation surfaces.

## 7. Group 048 — Admin back-office + scheduling operations (8 bases)

**Owned bases (8)**: `settings` (6-tab hub `#view=general|notifications|customization|security|users|
integrations`), `staff` (directory + RBAC preview drawers), `finance` (6-tab hub
`#view=overview|invoices|payments|monthly-invoices|salaries|banks`), `schedule`, `schedule-search`,
`sessions-analysis`, `public-holiday`, `scheduled-actions`.

**Legacy screenshot/record groups to reopen**:
- `cluster-evidence-paths/C09-paths.md` — **primary for settings** (27 legacy pages: general/notifications/
  customization/security/integrations, import templates, backup).
- `cluster-evidence-paths/C12-paths.md` — **primary for staff** (admins directory, 170-checkbox permission
  matrix, account pages).
- `cluster-evidence-paths/C07-paths.md` — **primary for finance** (67 legacy pages: invoices + lenses,
  payments, salaries, banks, accounting, payout queue — the second-largest legacy surface).
- `cluster-evidence-paths/C06-paths.md` — schedule / sessions-analysis / public-holiday / scheduled-actions /
  schedule-search rows.
- `cluster-evidence-paths/C14-paths.md` — scheduled-action create-form (16 evidenced controls) + expense-heads
  rows.
- `cluster-evidence-paths/C01-paths.md` — banks rows carried under the Dashboard tag (management-banks*).

**Group-specific obligations**: invoice list lenses/facets (C07-01), the finance FUTURE_BACKEND family
(C07-04/06/07/08/14/25 — backend prerequisites; **no fake money, no computed aggregate, salaries/banks stay
figure-free**). The scheduling-ops field-level rows (C06-05/06/07, C14-11/12/14) are **owned by Spec 056** —
048 verifies them on-surface during page review without claiming ownership. **No-secret law**: settings integrations
render structure-only rows — 0 `type=password`, 0 credential value slot, ever. `classSalaryReport` remains the
sole honest lock (verification owner: 057). Theme + language stay the only real writes on settings.

## 8. Group 049 — Reports, courses & groups, content catalog (7 bases)

**Owned bases (7)**: `reports` (3 tabs `#view=overview|monthly|analysis` + feedback/forms boards), `courses`,
`course`, `groups`, `group`, `library` (`#view=materials|books`), `certificates`
(templates + `#view=requests`).

**Legacy screenshot/record groups to reopen**:
- `cluster-evidence-paths/C08-paths.md` — **primary for reports** (17 legacy pages: form builder, monthly
  progress reports, follow-up tracker, data analysis).
- `cluster-evidence-paths/C05-paths.md` — **primary for courses/groups** (26 legacy pages; the
  course-as-enrollment vs course-as-catalog finding, dual-timezone schedule rows, enrollment ledger).
- `cluster-evidence-paths/C10-paths.md` — **primary for library/certificates** (9 legacy pages: materials,
  PDF library, certificate designer/requests).
- `cluster-evidence-paths/C13-paths.md` — evaluation/forms rows feeding the reports boards.
- `cluster-evidence-paths/C14-paths.md` — the `Export Course` 500-capture rows (C14-01) + family-feedback
  500 rows (C14-02).

**Group-specific obligations**: cross-student enrollment ledger (C05-08), data-analysis breakdowns (C08-06 —
counts only, never charts/computed %), content-cluster empty/loading/error states (C10-27), the three
empty-legacy-table Actions evidence gaps (C10-26), Export Course + Family Feedback re-evidence (C14-01/02).
**Reports body stays finance-free forever; no chart/canvas/computed score anywhere**; certificate designer
stays the static preview (no canvas/drag/PDF); every content write stays a gate (no fake upload/publish/
issuance).

## 9. Group 050 — Control center, utilities, hub & shell (7 bases + index)

**Owned bases (7 + index)**: `messages`, `leads`, `tasks`, `announcements`, `time-converter` (the one genuinely
working client tool), `portals` (the hub), `gallery` (**frozen orphan** — the orphan set stays exactly
`{gallery.html, gallery.en.html}`), **plus `index` (shell; outside the 57-base PAGES contract)** — the
portals-hub shell counterpart, single-file, explicitly owned here.

**Legacy screenshot/record groups to reopen**:
- `cluster-evidence-paths/C11-paths.md` — **primary** (Messages / Notifications / Leads · 5 legacy pages:
  chat, compose, groups, leads pipeline, announcements).
- `cluster-evidence-paths/C14-paths.md` — **primary for utilities** (19 legacy pages: time-converter multi-zone
  board, tasks, new-requests/trials statistics, branded 404, shell shortcuts).
- `cluster-evidence-paths/C15-paths.md` — hub / shared shell / auth-boundary rows (0 legacy captures — the
  auth surfaces were never crawled; UNKNOWN_EVIDENCE handled by 043).
- `cluster-evidence-paths/C13-paths.md` — task/section create rows (C13-02/03 context for `tasks`).
- `cluster-evidence-paths/C01-paths.md` — topbar/global-search + queues-widget rows (the shell capabilities
  surfaced on the admin home) and the portals-hub comparison base.
- `cluster-evidence-paths/C08-paths.md` — lead-funnel statistics rows (C08-07 context for `leads`).

**Group-specific obligations**: global-search results surface (C01-14), announcement compose fixes (C11-17 —
stub selects, `hours` mislabel, free-text expire), leads statistics board (C08-07/C11-27 — authored literals
only; computed funnel aggregates are a backend prerequisite), time-converter multi-zone gap (C14-08), tasks
board (C14-25 backend prerequisite for drag/persistence). The hub keeps its honest "no login, fixtures only"
note and the demoted child-view preview (INTENTIONALLY_IMPROVED — preserve). `gallery` stays an orphan: no nav
item, no route change; reviewing it never means linking it.

---

## 10. Cross-checks

- **Partition**: 57/57 bases each owned exactly once (see §2 arithmetic); `index` explicitly in 050. No base
  appears in two groups; none is unowned. (Quality gate §9.6 satisfied.)
- **Priority**: teacher portal ×8 → 045; family portal ×8 → 046. Earliest groups. ✓
- **Cluster coverage**: all 15 `cluster-evidence-paths/C*.md` files are referenced by at least one group
  (C01→045/047/048/050 · C02→045 · C03→046/047 · C04→046 · C05→049 · C06→045/046/047/048 · C07→046/048 ·
  C08→049/050 · C09→048 · C10→045/046/047/049 · C11→050 · C12→045/046/048 · C13→045/046/047/049/050 ·
  C14→045/048/049/050 · C15→050). Every screenshot/record group has an owner. (Quality gate §9.4.)
- **Gap ownership**: functional gaps are allocated one-primary-owner-each in
  `future-spec-allocation-register.md`; the page groups above own the *page review*, which includes verifying
  each gap's disposition on their surfaces without claiming co-ownership.
