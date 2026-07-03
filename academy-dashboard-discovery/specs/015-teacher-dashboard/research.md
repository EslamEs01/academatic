# Research & Decisions — Spec 015 Teacher Dashboard

All sixteen required decisions resolved. Format: Decision · Rationale · Alternatives considered. Grounding: spec.md; the Spec-012 coverage artifact §1 (T1–T27); fresh fixture reads (sara's row — no pay field, `rating`/`util` numerics to suppress; `teacher-links.js` graph; grp1 roster st1/st6/st11/st13; sara's real outcome rows out1/out4/out10/out11/out15); the capture-verified legacy sweep (the salary-hero + EGP exclusion set; the exact `classes-end` / rubric / certificate / availability field lists; the fake live room; the 13/23-column pay-table anti-patterns; the empty tickets shell).

---

**D1 — Final section order.**
**Decision**: 13 sections in cockpit-question order:
1. **Hero** (sara · today summary «حصتان اليوم…» · plain-text next-action hint — pay-free by construction, no date/notification count)
2. **Today's schedule** (sara's session cards + authored student counts — D2)
3. **My next class** (rich card + prepare hint + backendRequired live note — D2)
4. **Student follow-up board** (the "who needs follow-up" answer — D3: real outcome cards + reassurance)
5. **My students** (grp1 roster cards — D4)
6. **Session-outcome workflow** (the deepened 5-step display-only preview + save gate — D5)
7. **Homework & tasks** (graduated display-only cards + task-management planned gate — D6)
8. **Materials & library** (graduated display-only cards + upload/download backendRequired gate — D7)
9. **Timetable & availability** (day-grouped agenda + the truthful free-days empty state + availability-edit backendRequired gate — D8/D12)
10. **Monthly report rubric** (5 dimensions display-only + gated submit — D9)
11. **Requests & performance** (certificate-request preview + the ONE sanctioned teacher-performance admin link — D10/D11)
12. **My account** (contact/role/subject slice + backendRequired edit note — D10)
13. **Closing honest note** (delivered-state; live/writes backendRequired; communications = Spec 016)
**Rationale**: the six cockpit questions in urgency order — today (Q1/Q2) → people (Q3) → after-class recording (Q4) → prep (Q5) → schedule/reports (Q6) → identity last; mirrors the proven 013/014 "now → me" ramp with a teacher register.
**Alternatives**: outcome-workflow before follow-up (rejected: people before paperwork — the board answers a live question, the workflow is a preview); folding rubric+certificate+profile into one hub (rejected: the rubric is a first-class daily concern for teachers, deserves its own section; only certificate+performance-link share section 11).

**D2 — Today's schedule + next class from sara's graph.**
**Decision**: today = `SESSIONS_FULL` rows with `trainer.id === 'sara'` (s2 09:00 math «أساسيات الرياضيات» live 18/20 · s3 09:30 math club live 8/12), each card: time · course · room · labeled `statusChip` · **authored student count** («١٨ طالبًا» from the existing `present` field — a fixture literal, not a computation). Next class = the later row (s3) as a rich card + an authored **prepare hint** (`prt.tch.nextPrep`) + the honest backendRequired live note (existing `nextNote` wording kept). Group association via the existing group label key.
**Rationale**: same established sara proxy as the foundation; `present`/`capacity` are existing authored fixture fields (already shown on admin sessions) — displaying the count answers "how many students" with zero derivation.
**Alternatives**: schedule-week blocks for today (rejected: SESSIONS_FULL carries today's status truth — live/upcoming chips); computing "next" by clock (impossible/dishonest in static output — positional "next" like 013).

**D3 — Follow-up board from real outcomes, no computed score.**
**Decision**: the board renders exactly the real follow-up rows from `outcomesOfTeacher('sara')`: **out15** → st11 card («غياب في جلسة الرياضيات — تواصل لطيف مع الأسرة» framing + the real `studentAbsent` chip + the existing `data.att.fb.support` note) and **out4** → st7 card («جلسة تحتاج تعويضًا — غياب المعلّم» framing + the real `teacherAbsent` chip + make-up framing) — plus a reassurance close («بقية طلابك على المسار الصحيح ✅»). NO risk number, NO computed ordering (fixture order).
**Rationale**: both rows are real fixture truth with `followUp` flags — the honest answer to "which students need follow-up"; two cards + reassurance is the calm register proven in 014's signals band. out10 (rescheduled) is deliberately left to the timetable context — three attention cards would start feeling like an alarm wall.
**Alternatives**: including out10 (rejected: reschedules aren't student follow-up); a per-student "risk" roll-up (rejected outright: computed score).

**D4 — My-students preview.**
**Decision**: `studentsOfTeacher('sara')` → the grp1 roster (st1/st6/st11/st13) as 4 display-only cards: avatar · name · group/course label («مجموعة الرياضيات · أساسيات الرياضيات») · the student's labeled lifecycle chip (`familyStatusChip` — active/trial vocabulary) · an authored one-line learning note (`data.prtTchStu*`). **No links** (student/course pages are admin surfaces; the only sanctioned page-body link is the performance link, D11).
**Rationale**: the resolver exists and is display-only by construction; four cards fit one row on desktop; authored notes carry the "learning signal" without any score.
**Alternatives**: per-student history links (rejected: admin-only targets); progress bars (rejected: that's the student/family register — the teacher card leads with the note, not a percentage).

**D5 — Session-outcome workflow preview: 5-step stepper cards.**
**Decision**: deepen the foundation's 4-step flow to the capture-verified **5 steps** — ١ الحضور (attendance) · ٢ التقييم (remark) · ٣ الملخص (summary) · ٤ ملاحظة الواجب (homework note) · ٥ الملفات (files note) — as the existing flowStep card pattern (accent-ink numbers), each with a one-line description; display-only, NO form/input/select; the section closes with the `.pt-planned` mini-card **`outcomeSave`** classed **backendRequired** («حفظ نتيجة الجلسة» — recording outcomes requires the real backend).
**Rationale**: mirrors the real `classes-end` field order exactly (capability coverage) in the established display-only stepper the foundation already proved; the save gate makes the write-boundary explicit and smoke-countable.
**Alternatives**: a mocked disabled form (rejected: disabled inputs read as broken and violate the no-form rule); a modal preview (rejected: legacy-clone interaction).

**D6 — Homework/tasks graduation.**
**Decision**: the foundation's `tasks` planned card graduates to a real section: 3 authored display-only task cards (`TEACHER_PREVIEW.tasks`: prepare the fractions worksheet · review st1's homework · prepare grp1's monthly report — each with course/child association and an authored due label) + the `.pt-planned` mini-card **`taskManage`** classed **planned** («إدارة المهام» — the full task surface arrives with the portal operations shell). No assign/upload control.
**Rationale**: the legacy tickets shell was empty — the authored preview is MORE honest value than legacy ever shipped; the planned gate keeps the deep surface honest (its real home is Spec 016's operations shell).
**Alternatives**: keeping tasks as a planned card only (rejected: the cockpit question "what do I need to prepare?" deserves content); backendRequired for the gate (rejected: task management is a portal-ops surface → planned-016, not a backend write).

**D7 — Materials graduation.**
**Decision**: the foundation's `materials` planned card graduates to 3 authored display-only material cards (`TEACHER_PREVIEW.materials`: worksheet PDF · equations video · practice examples — type icons + course refs) + the `.pt-planned` mini-card **`matUpload`** classed **backendRequired** («رفع وتنزيل الملفات» — file storage requires the real backend). No links, no fake download.
**Rationale**: same geometry as the student/family materials sections — consistent portal language; upload AND download share one gate (both need storage).
**Alternatives**: separate upload/download gates (rejected: one honest gate, less noise).

**D8 — Timetable/availability agenda.**
**Decision**: `scheduleOfTeacher('sara')` day-grouped agenda (the 013 `.pt-day` pattern): SAT (b14 09:00–10:00) · MON (b4 09:00–10:00) · TUE (b6 08:30–09:30) as compact start–end/course/room cards with status chips, followed by ONE merged truthful empty state «الأربعاء والخميس — بلا حصص 🌤» (D12), and the `.pt-planned` mini-card **`availabilityEdit`** classed **backendRequired** («تعديل التوفّر» — editing availability slots writes to the real schedule).
**Rationale**: the resolver exists; day groups beat the legacy hour×day grid at every size; the free-days state is genuinely true (`scheduleOfTeacher` yields no WED/THU blocks) and demonstrates the encouraging-empty mandate.
**Alternatives**: a week grid (rejected: grid clone, unreadable at 390px); per-day empties for both WED and THU (rejected: one merged card is calmer).

**D9 — Monthly report rubric preview.**
**Decision**: a preview card listing the capture-verified dimensions as display-only lines — الإنجازات · تقدّم التعلّم · التركيز · إتمام الواجبات · الالتزام بالمواعيد — with a one-line explainer («هكذا سيبدو تقرير الطالب الشهري») + an inline **backendRequired** availability chip (submitting reports requires the backend). NO radio scales, NO rating visual, NO score vocabulary.
**Rationale**: carries T9's capability shape exactly (the five rubric dimensions) as knowledge, not as a fake form; the inline-chip pattern proved itself in 014's requests hub.
**Alternatives**: showing the legacy answer scales (Excellent/Good/… radios — rejected: fake form + rating-scale adjacency); a planned mini-card only (rejected: loses the capability preview).

**D10 — Certificates/requests/profile honesty.**
**Decision**: **Requests & performance** section = the certificate-request preview card (what it does: a request routed to management with a description + date — display-only concept lines + inline **backendRequired** chip) + the **teacher-performance link card** (D11). **My account** = display-only rows (name · subject «الرياضيات» · labeled teacher-status chip · labeled availability chip from `TEACHER_AVAIL`) + the backendRequired editing note (the `/profile` 500 is not reproduced; the account view derives from the working edit surface's concept).
**Rationale**: mirrors the 014 account-slice pattern; the certificate preview keeps T10 covered honestly.
**Alternatives**: separate certificate section (rejected: one small preview card suffices — it shares the "requests" register with the performance link).

**D11 — The teacher-performance link stays (the ONE sanctioned page-body link).**
**Decision**: KEEP — the labeled admin link card («فتح لوحة الأداء» → `teacher-performance(.en).html`) remains the single sanctioned page-body anchor, presented as the established foundation exception (a real, existing, PAY-FREE KPI board that is teacher-appropriate). Smoke TIGHTENS around it: `bodyAnchors === 1` and the anchor's href must match `teacher-performance(.en).html` exactly.
**Rationale**: removing a working, sanctioned, useful link would be a regression; pinning the inventory to exactly-one-with-exact-target makes the exception machine-verified rather than loose.
**Alternatives**: demoting to a gated preview (rejected: the target exists and is safe — gating a real page is dishonest in the other direction).

**D12 — Truthful empty-state site: the free days.**
**Decision**: the timetable section's merged «الأربعاء والخميس — بلا حصص، وقت مثالي للتحضير 🌤» `.pt-empty` — genuinely true (sara has no WED/THU schedule blocks) and encouraging (prep-time framing).
**Rationale**: the only genuinely empty teacher surface (the follow-up board has real signals; today has real classes); mirrors 013's Friday rest-day precedent with a professional register.
**Alternatives**: an empty tasks state (rejected: tasks carry authored content); faking "no follow-up needed" (rejected: st11/st7 rows are real — it would be a lie).

**D13 — Teacher smoke re-scope (teacher branch only).**
**Decision**: inside the Spec-012 portal block, amend ONLY the teacher expectations: planned-card count **2 → 4** with chip-tone semantics (`.pt-planned .chip.tone-amber === 3` {outcomeSave, matUpload, availabilityEdit} + `.tone-neutral === 1` {taskManage}); NEW teacher asserts: `sectionCount ≥ 10` · `emptyCount ≥ 1` (the free-days state) · **`bodyAnchors === 1` + the anchor href matches `teacher-performance(.en).html`** (the tightened sanctioned-link inventory) · `formControls === 0` · roster floor (4 my-students cards via a stable hook — e.g., avatar count in the students section or a `.pt-card` floor); the **EXISTING pay-token assert stays byte-verbatim** (and now guards the deepened body); the tables + 390px probe generalize from `student-portal || family-portal` to all three deepened portals. **Student/family branches, admin-scoped, and hub assertions stay byte-verbatim.**
**Rationale**: the same sanctioned-reconciliation discipline as 012→013→014; the teacher branch gets stronger (exact link inventory, form-free, graduation semantics) while the pay assert — the crown jewel — is untouched.
**Alternatives**: dropping `bodyAnchors` for teacher since one link exists (rejected: pinning to exactly-1-with-exact-target is stronger than not asserting).

**D14 — Byte-identity protection.**
**Decision**: post-build hash-compare vs HEAD must show **47/49 identical** — 40 admin + `student-portal`/`family-portal`/`portals` pairs + `index.html`; only the teacher pair changes. Enforced by construction: page edits confined to `teacher-portal.js`; fixture edits confined to the NEW `TEACHER_PREVIEW` + `PORTAL_PLANNED.teacher`; locale edits confined to `prt.tch.*`/`data.prtTch*` (shared `prt.shell/portal/role/hub`, sibling `prt.stu.*`/`prt.fam.*`, `data.prtStu*`/`data.prtFam*`/`data.prtNote1/2` frozen); CSS additions are new selectors only; all G2 files untouched.
**Rationale**: the proven 012–014 standard, fourth application.
**Alternatives**: none serious.

**D15 — Screenshot matrix & mobile checks.**
**Decision**: additive MATRIX entries: a NEW teacher **ar/dark** base frame (mirroring the 014 addition; ar/light + en/light + ar/mobile exist from 012) + **element-scoped area frames** (the existing `s.area` mechanism; verify `section:nth-of-type` indices against the final DOM): today+next (2,3) · follow-up (4) · students (5) · outcome workflow (6) · tasks (7) · materials (8) · timetable/availability (9) · rubric (10) · requests/performance (11) · account (12). Unchanged proofs: student, family, hub, admin dashboard (ar/light). Mobile correctness double-checked by the D13 390px probe; dark contrast by the existing teacher a11y scenarios (ar/light, ar/dark, en/light from 012) re-run against the deepened page.
**Rationale**: the accepted 013/014 pattern; zero new capture machinery.
**Alternatives**: fewer area frames (rejected: the user's minimum list names six areas; granular frames proved cheap and useful).

**D16 — MVP & sequencing.**
**Decision**: Baseline gate (build+tests green, HEAD recorded, REVIEW stub) → fixtures + locales (the `TEACHER_PREVIEW` register + `prt.tch.*`/`data.prtTch*` keys, key-mirrored; planned set re-registered) + tiny CSS → **Band A: hero upgrade · today's schedule (student counts) · next-class (prepare hint) · follow-up board (D3)** → **teacher smoke re-scope (D13)** — green = **MVP** → **Band B: my-students (D4) · outcome workflow 5-step (D5) · tasks (D6) · materials (D7)** → **Band C: timetable/availability + free-days empty (D8/D12) · rubric (D9) · requests/performance (D10/D11) · account · closing note** → byte-identity audit + the dedicated pay-free audit (sources incl. comments + built) + full G-audit + prior guards → a11y + screenshots (incl. area frames + the new dark frame) + REVIEW verdicts → coverage §9 delivery notes → docs (README/CLAUDE).
**Rationale**: Band A alone answers the teacher's top three questions with tests green — a true MVP; single smoke amendment reviewed as one diff; the pay-free audit runs at every build touchpoint.
**Alternatives**: per-section test updates (rejected: one sanctioned amendment, one reviewable diff).

---

## Pre-implementation amendments (sanctioned corrections, applied before coding)

**A1 — Recent-sessions history slice (T20/T21 made explicit).**
**Decision**: insert ONE additional display-only section — **Recent sessions** — directly after the outcome workflow (the composition becomes **14** sections): exactly 2 cards, both REAL sara outcome refs — **out1** (st1 · math · attended · Sunday, with the real `data.att.fb.good` feedback line) and **out11** (st11 · math · attended · Monday) — each rendered child-first with the real `outcomeChip`, the day from the existing `dateKey` (`sch.day.*`), and an authored homework-note line (`data.prtTchHist*`). No modal, no full-history route, no table, no form, no anchor. The section shows what the workflow's steps produce — record → history, one honest arc.
**Rationale**: makes T20/T21 (session/course history) explicitly delivered on the page rather than implied by the workflow preview; mirrors the proven 013/014 history-card shape; st11 attended here after the absence handled in the follow-up board — an honest recovery arc, not fabricated data.
**Ripple**: area-frame `nth-of-type` indices shift (7=history, 8=tasks … 13=account); the D13 floors (≥10 sections) are unaffected.

**A2 — T4/T5 visible as honestly-gated notes.**
**Decision**: two calm backendRequired notes, each a non-anchor `.pt-note` carrying the labeled availability chip and one sentence, zero controls: (1) inside the workflow section — «تسجيل الغياب يحتاج تفعيل الخادم.» / “Marking absence requires backend activation.” (T4); (2) inside requests & performance — «طلب إلغاء أو تعويض الحصة يحتاج تفعيل الخادم.» / “Cancel or reschedule requests require backend activation.” (T5).
**Rationale**: T4/T5 were classified backendRequired but previously invisible; one honestly-gated sentence per capability makes “no silent gaps” literal on the page itself. Wording verified against both pay-token sets (AR «تعويض» is not in the forbidden list; the EN copy carries no pay token).
