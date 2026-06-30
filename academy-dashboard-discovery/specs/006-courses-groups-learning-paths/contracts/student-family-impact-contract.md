# Contract: Student & Family Profile Course/Group Impact

**Status**: Binding · `public/student.html` and `public/family.html` (+ `.en`). The Spec 004 tabbed academic profiles (`app/src/js/pages/student.js`, `app/src/js/pages/family.js`) **lightly, fixture-only enriched** with two-way course/group navigation links and a calm children's courses & groups summary hint. Both additions are **DISPLAY-ONLY** (data-model *StudentCourseGroupSignal* #17 / *FamilyCourseGroupSignal* #18); they deep-link to the canonical Courses and Groups pages rather than embedding a course/group engine. **No new tab, no portal.** Admin profile pages only — **not** student/family portals.

References: FR-021 (student), FR-022 (family), data-model #17 (*StudentCourseGroupSignal*), data-model #18 (*FamilyCourseGroupSignal*), research R52.

---

## 1. Purpose & exactly-what-changes vs Spec 004 / Spec 005

This contract EXTENDS, it does not replace, the Spec 004 profiles and the Spec 005 outcome hints. Both pages stay exactly as shipped: the baked `profileBanner` over the Spec 003 `tabs` widget — Student: Overview / Courses / Timetable / Results / Evaluation / Family / Notes; Family: Overview / Students / Schedule / Plan & Billing / Notes — with all panels baked (`renderStudent()` / `renderFamily()`). **The only additions are navigation enrichments and one calm hint card**, placed inside EXISTING panels — everything else (banner, tabs, drawers, links) is unchanged.

The changes, and **only** these:

1. **Student** (`student.js`): in the EXISTING **Courses tab** (`coursesPanel`), each enrollment card's **title** becomes a real `<a href>` to `course.html`, and its **group chip** (where a `groupId` is present) becomes a real `<a href>` to `group.html`. No new tab, no new panel, no bespoke drawer (§2).
2. **Family** (`family.js`): in the EXISTING **Overview panel** (`overviewPanel`), ONE calm fixture "children's courses & groups" hint card (counts + deep-links to `courses.html` / `groups.html`) is added **beside the Spec 005 attendance hint**. No finance/enrollment claim, no portal (§3).

No Spec 004 tab, panel, banner field, drawer, or link is removed; **no new tab is added** to either tablist.

**Reconciliation note (data-model #8b):** The existing local `courseStatusChip` / `COURSE_STATUS` constant inside `student.js` currently shadows the catalogue-level `CourseStatus` map. Spec 006 relocates it to a shared `enrollment-status.js` (`EnrollmentStatus`: `active / paused / completed`) so the two maps (enrollment lifecycle vs. subject-offering catalogue status) are distinct. The `coursesPanel` continues to use the enrollment status chip; it now imports it from the shared module instead of a local constant.

---

## 2. Student profile — Courses tab link enrichment (binding)

### 2a. Enrollment card title → course profile link

- Each enrollment card's **title** (`<h3>` carrying `e.courseTitleKey`) MUST become a **real `<a href>`** to the course profile page — `course.html` on the Arabic page, `course.en.html` on the English page — using the same `getLang()`-based helper pattern already present in `student.js` (e.g. `courseHref()`).
- The link MUST be a **styled heading link** (class `text-ink font-bold`, `text-decoration: none` or the project's `.link-heading` equivalent) so it reads as the card title, not a separate CTA. It MUST NOT open a new browser tab (`target="_blank"` is forbidden).
- **Fixture backing**: `StudentCourseGroupSignal.enrollments[].courseHref` (data-model #17) — the `courseId` on the student's enrollment resolves to a `Course` in `COURSES`; the profile page is the baked `course.html` template. No fabricated metric.
- **When `courseId` is absent or unresolved**: the title renders as plain text (no dead link, no `href="#"`).

### 2b. Group chip → group profile link

- Where `e.groupId` is present and resolves in `GROUP_BY_ID`, the existing **group chip** (`chip({ labelKey: GROUP_BY_ID[e.groupId].nameKey, tone: 'neutral', icon: 'students' })`) MUST become a **real `<a href>` chip** pointing to `group.html` (`group.en.html` on the English page) — still rendered as a chip (same icon + label, same tone), now as an anchor element.
- **Fixture backing**: `StudentCourseGroupSignal.enrollments[].groupHref` (data-model #17) — the `groupId` resolves to a `Group` in `GROUPS` (the new Spec 006 `groups.js` fixture); the profile page is the baked `group.html` template.
- **When `groupId` is absent**: no group chip and no dead link — the enrollment card renders exactly as Spec 004 left it (title link only, no chip).
- **When `groupId` is present but unresolved** (e.g. a 1:1 legacy enrollment with no real group): the chip is omitted (not rendered as a dead control). This mirrors the edge case "a student enrolled in a course but not in any group" from the spec.

### 2c. No other change to `coursesPanel`

- The enrollment status chip (now from `enrollment-status.js`), the progress bar, the certificate chip, the "Add" disabled-with-reason control, and the overall card grid layout are **unchanged**.
- No new tab, no new panel, no new drawer. The student's Courses tab tabpanel count stays the same.

---

## 3. Family profile — children's courses & groups hint (binding)

- The family Overview panel (`overviewPanel(fam)` in `family.js`) MUST include ONE calm fixture **"children's courses & groups" hint card** — e.g. **"N courses · M groups"** (from *FamilyCourseGroupSignal* #18: `{ familyId, coursesCount, groupsCount, attentionGroupsCount, coursesHref, groupsHref }`) — rendered as a small `info-card` inside the EXISTING Overview panel, sitting **after the Spec 005 attendance hint** (`attHint`). It MUST NOT introduce a new `role="tab"` / `tabpanel` (the tablist stays the Spec 004 five).
- The hint MUST offer two real `<a href>` affordances: a **"View courses"** link to `courses.html` (`courses.en.html` on English) and a **"View groups"** link to `groups.html` (`groups.en.html` on English), both language-aware via the existing `getLang()` helpers. It MAY carry a family-filtered facet hash the Courses/Groups pages read client-side; landing MUST NOT require JS.
- When `attentionGroupsCount > 0`, the hint MAY carry a small labeled attention chip (amber, icon + text — e.g. "K groups needing attention") reusing the existing `attentionFlag` / amber chip vocabulary. This chip links to `groups.html` (the attention-filtered view). It MUST be icon + label (never color-only) and MUST NOT imply a real alerting engine.
- The hint MUST read as **fixture/demo** data and MUST NOT claim a live enrollment metric, a finance/credit/billing balance, a real academic progress rate, or an at-risk detection engine. The `coursesCount` and `groupsCount` values are baked fixture numbers derived from the family's children's enrollments (`studentsOfFamily(fam.id)` → their `enrollments[].courseId` / `enrollments[].groupId`), not computed analytics.
- The hint MUST NOT bleed any claim into the Plan & Billing tab — that tab stays the Spec 004 disabled-with-reason placeholder, unchanged.

---

## 4. Both profiles deep-link to Courses/Groups — no bespoke engine (binding)

- Neither profile MAY define a bespoke course-group drawer, a courses list/card hybrid embedded in the profile, or an inline group roster. Per R52, the profiles **deep-link** to the canonical Courses (`courses.html`) and Groups (`groups.html`) pages.
- The student's Courses tab links enrich existing markup (heading and chip → anchors); they are baked into the rendered card HTML — runtime JS only switches tabs and follows real `<a href>` links; it constructs no new DOM and adds no new engine.
- The family's hint card is baked into `overviewPanel()` — runtime JS only switches tabs. The hint renders correctly with JS disabled (only tab-switching is inert; all panels are visible per Spec 004).
- **No portal**: neither hint surfaces a student-portal or family-portal view, a role dashboard, or a separate login affordance.

---

## 5. MUST NOT (hard boundaries)

- MUST NOT add a **real enrollment / course-assignment / group-roster engine** — the links and counts are fixture display values, not live computed data.
- MUST NOT add a **new profile tab** or a new tablist entry on either page (student tablist = seven; family tablist = five — both unchanged).
- MUST NOT make a **finance / credit / billing / payment claim** in the family hint.
- MUST NOT add a **bespoke profile course/group drawer** or an embedded course/group list inside the profile — profiles deep-link to the canonical pages.
- MUST NOT open links in a **new browser tab** (`target="_blank"` forbidden for internal admin navigation).
- MUST NOT add a **portal affordance**, a chart, a table/form/CDN library, or a JS-rendered region.
- MUST NOT use **color-only** to represent group/course status — all chips are icon + label.
- MUST NOT render a **dead link** (`href="#"` or an unresolvable anchor) for any course or group chip.

---

## 6. Edge cases & states (binding)

- **No enrollments**: a student with no enrollments shows the existing Spec 004 empty state (`sp.courses.none`) — the Spec 006 enrichment adds nothing when the list is empty.
- **Enrollment without a group** (1:1 legacy enrollment): the title links to `course.html`; no group chip is rendered — no dead control.
- **Enrollment with a `groupId` that is absent from the new `GROUPS` fixture**: the group chip is omitted (not a dead link) until the fixture is populated.
- **Family with children in zero courses or zero groups**: the hint card shows a calm "no courses or groups yet" line — never a blank region and never a raw key; the deep-links to `courses.html` / `groups.html` still render.
- **Family with `attentionGroupsCount = 0`**: the attention chip is omitted from the hint; the hint still shows the counts and deep-links.
- **Long AR/EN copy**: the hint card's label and counts wrap within the `info-card`; no horizontal overflow on mobile.
- **JS off**: the title links, group chip links, and family deep-links are baked HTML — they navigate with JS disabled; only tab-switching is inert (panels visible per Spec 004).

---

## 7. `data-*` hooks (exact, no invention)

Reuses, unchanged: the `tabs` hooks (`data-tabs="student"|"family"`, `data-tab`, `data-tabpanel`, `data-view`); the Timetable / Schedule agenda + shared appointment drawer hooks — all from `student.js` / `family.js`. The course title link and group chip link are plain baked `<a href>` elements inside the existing card markup (no new hook). The family hint's "View courses" / "View groups" affordances are plain `<a href>` anchors (no new hook). The optional attention chip is a plain `<a href>` chip with the existing amber chip class (no new `data-*`). **No invented hooks; no JS-generated ids/classes.**

---

## 8. Responsive / RTL-LTR / theme / a11y

- The title link and group chip link sit inside the existing `.course-card` layout; they inherit the card's responsive reflow (`sm:grid-cols-2`) and do not introduce new overflow.
- The family hint `info-card` stacks within the Overview panel; long AR/EN copy wraps/truncates gracefully; no horizontal overflow.
- Arabic RTL default (`student.html` / `family.html`); English (`student.en.html` / `family.en.html`) with language-aware hrefs; logical properties; numbers / dates never mirror.
- Light / Dark / System via tokens; the hint icon + label, the chip links, and all deep-links read correctly in all three — never color-only.
- Keyboard operable with visible focus; all new anchors are in the tab order; targets ≥ 44 px; axe critical = 0.

---

## 9. Django mapping & enforcement

- **Student profile (`student.html` → `templates/admin/student.html`)**: the `coursesPanel` receives each enrollment with `courseHref` and `groupHref` in view context (e.g. `{% url 'admin:course_detail' pk=enrollment.course_id %}` / `{% url 'admin:group_detail' pk=enrollment.group_id %}`); the template renders the title as `<a href="{{ enrollment.course_href }}">` and the group chip as `<a href="{{ enrollment.group_href }}" class="chip tone-neutral">`. No new endpoint; the existing enrollment context is extended with resolved hrefs. The `EnrollmentStatus` chip replaces the old local `courseStatusChip`; the chip partial is shared (`{% include "admin/_enrollment_status_chip.html" %}`).
- **Family profile (`family.html` → `templates/admin/family.html`)**: the Overview section receives `family.course_group_signal` (`{ courses_count, groups_count, attention_groups_count }`) in view context; rendered inside the existing Overview section after the Spec 005 outcome hint; links → `{% url 'admin:courses' %}` / `{% url 'admin:groups' %}` (+ optional query/hash facet). No new endpoint; no new panel.
- No whole-page `#app` mount; relative `./assets/` paths; zero external requests.
- **Enforcement**: the smoke harness asserts on `student.html` AND `student.en.html` that (a) each enrollment card's title is a real `<a href>` to `course.html` (no `href="#"`, no `target="_blank"`), (b) where a `groupId` is present the group chip is a real `<a href>` to `group.html`, (c) **no new tab** was added to the student tablist (count stays seven, exactly one panel visible), and (d) no `target="_blank"` appears on any internal link; and on `family.html` AND `family.en.html` that (a) a real `<a href>` to `courses.html` and a real `<a href>` to `groups.html` exist inside the Overview panel, (b) **no new tab** was added to the family tablist (count stays five), (c) no finance/credit claim is present, and (d) no portal affordance appears. Screenshots: Student Courses tab with course/group links + Family Overview with course/group hint, AR-RTL light desktop.

---

## 10. Reused / cross-references

Reuses Spec 003 / 004 `tabs`, `profileBanner`, `scheduleAgenda`, `appointmentTemplate`, `sheetRow` / `info-card`, `chip`, `avatar`, `ui`, `attentionFlag`, the existing `getLang()` / `langRoute()` helpers — all from `student.js` / `family.js` unchanged. New shared concepts consumed (not defined here): *StudentCourseGroupSignal* / *FamilyCourseGroupSignal* (data-model #17 / #18), `enrollment-status.js` (`EnrollmentStatus` chip — reconciliation of the local `courseStatusChip`), the new `COURSES` / `GROUPS` fixtures (`courseHref()` / `groupHref()` helpers). Also reuses the Spec 005 `attHint` pattern (the family hint sits beside it). Binds to: `courses-page-contract.md` (the "View courses" link target), `groups-page-contract.md` (the "View groups" / group chip targets), `course-profile-contract.md` and `group-profile-contract.md` (the enrollment title / chip link targets), `../../004-family-student-profiles/contracts/student-profile-contract.md` and `family-profile-contract.md` (unchanged Spec 004 banner / tabs), `../../005-attendance-session-outcomes/contracts/student-family-impact-contract.md` (the Spec 005 hints this contract sits beside), `navigation-impact-contract.md` (no dead links), `static-html-django-ready-contract.md` (SSG / Django rules), `scope-guard.md` (no engine / finance / new-tab / portal), `screenshot-acceptance.md`.
