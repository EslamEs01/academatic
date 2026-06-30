# Contract: Student / Family Impact (Spec 007)

**Status**: Binding · Defines the light, fixture-only cross-links between the teacher surfaces and the Spec 004 student/family profiles — link enrichments only, no new tab, no portal, no engine. References FR-016; data-model §8 / §9 / §14.

---

## 1. Purpose & exactly-what-changes vs Spec 004/005/006

Spec 007 does **not** restructure the student or family profiles. It only ensures the **teacher → student / family** direction resolves to the existing pages, and (optionally) adds **one** calm reciprocal hint. The student/family roster, enrollments, and attendance hints from Specs 004–006 are untouched.

## 2. Teacher → student links (from teacher surfaces)

- The teacher profile **Students** tab lists the union of the teacher's groups' rosters (data-model §8): calm student rows, each with avatar + name + level mini + a **"View student"** real `<a href="./student.html">` (language-aware). No bespoke student component — reuse the existing people-row/mini-row pattern.
- The teacher profile **Follow-up** tab + the board **follow-up queue** items that carry a student context link to `student.html`.

## 3. Teacher → family links (from teacher surfaces)

- Each student row / follow-up item with a resolvable family (`familyOf(student.familyId)`) carries a **family chip-link** → `family.html` (language-aware). Display-only; no portal.

## 4. Optional reciprocal hint (≤ 1, fixture-only)

OPTIONAL: the Spec 004 student profile (or family profile) MAY gain **one** calm "teacher" hint where it already shows the group/course — e.g. the student's group teacher name as a label linking to `teacher.html`. This is a **link enrichment**, not a new tab or card. If added, it is one labeled chip/line, fixture-backed, no engine. (Default: omit unless it reads naturally; the teacher→student/family direction in §2–§3 is the binding part.)

## 5. MUST NOT (hard boundaries)

- No new tab/section on the student or family profile.
- No student/family **portal** or dashboard.
- No teacher-assignment, enrollment, messaging, or notification engine reachable from these links.
- No finance/pay figure on any student/family/teacher surface.

## 6. Edge cases & states

- A teacher with **no students** (zero-roster) → the Students tab shows "no students yet" — never a blank region.
- A student with **no resolvable family** → no dead family chip (the chip is omitted).
- An item with no group/course context → no dead `group.html`/`course.html` link.

## 7. `data-*` hooks (no invention)

None new. All links are real `<a href>`. The student/family rows reuse the existing facet/row markup.

## 8. Responsive / RTL / theme / a11y

Rows stack to single-column on mobile; chips/links legible in RTL + LTR + dark; every link is icon/text labeled (never color-only); axe critical = 0.

## 9. Django mapping & enforcement

- **Django**: `{% for student in teacher.students %}` → `student/<id>`; the family chip → `{% url 'family' student.family_id %}`.
- **Smoke**: the teacher profile Students tab rows link to `student.html` and (where a family resolves) to `family.html`; no dead link; no new student/family tab; no portal markup.

## 10. Reused / cross-references

Binds to `teacher-profile-contract.md` (the Students/Follow-up tabs), `teacher-performance-contract.md` (the follow-up queue), and the Spec 004 `../../004-family-student-profiles/contracts/*` (the student/family profile targets). **MUST NOT** add a portal, a new profile tab, or any engine.

**Acceptance (binding):**
1. **Given** the teacher profile Students/Follow-up surfaces, **When** a student/family item is clicked, **Then** it navigates to the right `student.html`/`family.html` with no dead link.
2. **Given** a zero-roster teacher or an unresolved family, **When** rendered, **Then** a calm empty state / omitted chip appears — never a blank region or a dead link.
