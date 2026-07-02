# Contract: Finance Source Links (Spec 009)

**Status**: Binding · Every outward link from the finance shell. References FR-016; SC-001, SC-004; data-model §9.

## 1. Allowed targets (closed list — implemented pages only)

`family.html` · `student.html` · `courses.html` / `course.html` · `groups.html` / `group.html` · `sessions.html` / `attendance.html` (session/outcome context) · `teacher-performance.html` (academic context beside the payroll planned cards ONLY — never presented as a payroll link). EN pages link the `.en.html` variants (the existing `localizeHref` technique). Profile links may carry the established `#id=` hash convention where the target page supports it.

## 2. Placement (binding)

- Invoice row: family link (always) + course/group context link (when authored).
- Invoice drawer: family + students + course/group links.
- Payment row: family link + invoice-serial drawer trigger.
- Payroll planned area: ONE academic context link → `teacher-performance.html`, rendered beside the section (not on a card), with zero pay framing.
- Section footers may add "view families / view attendance"-style more-links (house `moreLink` pattern).

## 3. MUST NOT

- No `href="#"`, no dead anchor, no link to a non-implemented page (no `salaries.html`, `banks.html`, `invoices.html` etc. — those pages do not exist).
- No link into planned cards (they are disabled-with-reason blocks, never `<a>`).
- No portal links (`/student/billing`-style family-facing surfaces stay future-role).
- No `teacher.html` link decorated with pay/compensation wording.

## 4. Reach guarantees

From any invoice/payment the admin reaches the linked family profile in **1 click**; from the shell every linked operational area is reachable in ≤ 1 click. 100% of rows carry at least the family link.

**Acceptance (binding):**
1. **Given** `public/finance*.html`, **When** grepped, **Then** `href="#"` count = 0 and every `href` target exists in `public/`.
2. **Given** each link in §2, **When** clicked on AR and EN pages, **Then** it lands on the correct implemented page in the correct language.
3. **Given** the payroll area, **When** inspected, **Then** its only real link is `teacher-performance.html` and no pay figure/wording surrounds it.
