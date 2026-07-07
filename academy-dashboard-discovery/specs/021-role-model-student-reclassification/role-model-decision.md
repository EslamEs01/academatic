# Role-Model Decision Record — Spec 021

**Status**: DECIDED (audit-only; implementation belongs to the corrective specs named per decision).
**Evidence base**: `visual-grounding.md` (L1–L8 legacy · C1–C7 current). Nothing below rests on memory.

## Audit answers

### A. Role model

- **A1 — Legacy roles**: exactly three logins — Admin (`/management/*`), Teacher (`/teacher/*`),
  Family/Guardian (`/student/*`). Proven by L1 (folder structure), L8 (system map), L6/L7 (inventories).
- **A2 — Standalone Student role**: **NO.** No `output/roles/student`, no student section in any
  inventory, no student login crawled. The `/student/*` namespace is the family app.
- **A3 — Are `student-*` pages family surfaces?**: **YES.** All 27 legacy `student-*` frames live
  under `output/roles/family/` and show the family sidebar; the account model is guardian-operated
  and student-centric with multiple children (L2, L3, L6).
- **A4 — Does the rebuild expose an extra role?**: **YES.** The hub (C1) presents «بوابة الطالب» as a
  peer primary portal with persona Salman — who is fam1's child st1 in `family-child` (C5). Spec 012
  introduced the three-portal frame and Spec 016 froze it; the legacy evidence now shows the student
  third was a mis-classification of guardian surfaces.
- **A5 — Remove Student from the main switcher?**: **YES — demote, don't delete.** The hub should
  lead with the three legacy-true roles; the student surface remains reachable as an optional
  child-view entry (see DEC-004).
- **A6 — Fold Spec 019 pages into Family/child context?**: **YES, by reclassification and linkage,
  not by rebuild.** The pages already carry child-level content for st1; they become "the child's own
  view", reached from family contexts (family-child first). Mechanics in DEC-003/DEC-006.
- **A7 — Keep standalone Student as a future extension?**: **YES (Option B as the extension).** If
  the client later issues real student credentials, the built pages are the ready-made surface. Until
  then it is not a primary demo role.

### B. Current dashboard quality (why "static/dead" — confirmed on C2/C3/C4)

- **B1 — Root causes**: (1) one visual primitive everywhere — white rounded `.pt-card` grids on a flat
  cream page; (2) no page-wide role identity — the legacy leads with a gradient hero band carrying
  avatar + name + role chip + headline counters (L2/L4), the rebuild puts identity in a small sidebar
  block; (3) no operational spine — the legacy home is built around a live "Today's Classes" table
  with row actions, the rebuild lists sessions as inert cards; (4) numbers without stories — KPI
  tiles show counts with no trend/next-step phrase; (5) zero motion or state feedback — no hover
  lift, no transitions, no timeline flow.
- **B2 — Card-only sections with no product life**: the KPI rows (all three homes), quick-link tile
  bands, the week-glance strip (student), gates rendered as dashed cards, the materials/billing
  status cards.
- **B3 — Too flat/empty/repetitive**: the identical band rhythm repeated across all three roles
  (only the accent hue changes — the user's "accent alone is not enough"); near-empty cards holding a
  single chip (billing "settled" card, week chips row); the hero-less page top.
- **B4 — Missing educational context/action flow**: sessions don't present a day timeline or
  prepare→attend→outcome flow; homework has no progression states; child cards state numbers without
  "what to do next"; gates say "server required" without explaining what will happen when live.
- **B5 — Not joyful/engaging**: no educational visual language (icons are generic UI glyphs), no
  celebratory states, no progress movement, no micro-interactions; empties are plain sentences.
- **B6 — Where legacy wins visually**: the identity hero band with artwork (L2/L4), status-colored
  live table rows (L4/L5), KPI cards with per-card drill-down buttons (L5), the salary/hours counter
  strip's at-a-glance density (L4 — concept only; pay figures stay excluded).

### C. Legacy alignment

- **C1 — Current pages matching real legacy concepts**: all 40 admin pages (`management-*`); the
  family eight (home/children/schedule/progress/billing/requests/materials/profile ↔ home/
  studentslist/timetable+today-sessions/history/billing/feedbacks+request-trial/library/
  profile-edit); family-child (↔ per-student history/courses selector views); teacher home
  (↔ teacher-home); the hub has no legacy twin but serves the no-auth demo.
- **C2 — Net-new but useful**: the portals hub (demo device); the honesty-gate register; the
  aggregated family-child file; the compact 7-band recipe; the Spec 019 pages AS CONTENT.
- **C3 — Suspicious / not grounded**: Student as a PRIMARY role (C1 hub card + «بوابة الطالب»
  branding + the `role: student` shell). Only the classification is wrong; each page's content
  descends from grounded guardian surfaces.
- **C4 — Merge/hide/rename/reclassify**: reclassify the seven `student-*` pages as the child's own
  view under the family journey; demote the hub's student card to a secondary, honestly-labeled
  entry; keep filenames and modules (zero-deletion law).
- **C5 — Legacy concepts still missing**: the teacher internals (7 planned — scheduled as 025); chat
  (all roles) and notifications (backendRequired futures, recorded); the family trial-wizard step-2
  (recorded gap, stays gated); certificates as a family-visible surface (admin-side exists —
  resolve in the 023 audit); the full-history views behind "قيد التخطيط" placeholders.

### D. Next corrective specs

- **D1 — Spec 022 implements**: the Living Dashboards Experience Rework (brief in `spec.md`).
- **D2 — Spec 023 audits**: full legacy coverage 000–020 (all 1,113 frames accounted, every legacy
  capability mapped to a current surface, gap register with owners).
- **D3 — Spec 024 corrects**: everything 023 finds, including executing the student reclassification
  mechanics (hub rework, entry-point rewiring, labeling) if 022 has not already absorbed the hub work.
- **D4 — Teacher Internal Pages resume**: as **Spec 025**, after 022–024, so the teacher app is built
  once on the corrected role model and the living design language.

## Formal decisions

| ID | Decision |
|---|---|
| **DEC-001** | **Final role model: three primary roles — Admin/Management, Family/Guardian, Teacher.** Students are child entities INSIDE the family account (legacy-proven). |
| **DEC-002** | **Standalone Student does not remain a primary role.** Option A adopted with Option B as the future extension: the student surface is demoted to an optional, honestly-labeled child-view/preview entry; it may return as a real login only if the client ships student credentials (backendRequired). Option C is rejected — the legacy evidence disproves it. |
| **DEC-003** | **Spec 019 student pages are PRESERVED, reclassified, and re-linked — zero deletion.** All 14 built files and their modules/fixtures/keys stay (the standing zero-capability-deletion law). They become "the child's own view" surfaces owned by the family journey. No page bodies are rebuilt for reclassification; only entry points, labels, and shell framing may change, and only under a future implementing spec (022/024) with its own identity contract. |
| **DEC-004** | **Role switcher / hub**: rework to lead with the three primary roles + the admin console; the student card moves to a clearly secondary row labeled as the child's-view preview (e.g., «عرض الابن — معاينة», exact copy owned by the implementing spec). No hub deletion; the hub remains the no-auth demo device. |
| **DEC-005** | **Student nav**: the student app's internal 7-item registry stays intact and functional (the pages keep working as built); `ROLE_NAV.student` is NOT deleted. Whether the student shell's branding shifts from "role portal" to "child view" is an implementing-spec decision (022/024) under its own smoke-rescope contract. |
| **DEC-006** | **Family owns the child/student journey**: family-child is the child hub; the implementing spec adds an honest cross-link from family-child (and/or family-children) into the child's own view (the student pages), closing the loop guardian → child file → child's day. Persona coherence note: the student persona (Salman st1) is already fam1's child — the link is truthful today. |
| **DEC-007** | **YES — dashboard redesign (Spec 022) is required BEFORE any new feature pages.** The user's verdict is binding; the frame evidence (B-answers) confirms it. |
| **DEC-008** | **YES — the full legacy coverage audit (023) + corrections (024) run before the teacher internals.** The teacher app is the last uncommitted role surface; building it after the audit prevents a second drift. |
| **DEC-009** | **Revised sequence adopted** (supersedes the Spec 018 renumbering; recorded here as the authoritative amendment — the 016 sequence artifact receives its append-only note when the first implementing spec lands): 021 audit · 022 living rework · 023 coverage audit · 024 corrections · 025 teacher pages · 026–031 admin groups (control/sessions/ops → families/students/courses/groups → teachers/performance → reports/analytics/feedback/forms → finance/invoices/salaries/banks → management/content/certificates/settings) · 032 final QA + no-missing audit. |

## Standing laws unaffected

Teacher pay-free GLOBAL, family zero-pay, the honesty/backendRequired contract, static HTML-first,
the closed hook set, zero `href="#"`, screenshot-based acceptance, and the Spec 016 design freeze all
remain binding. Spec 021 changes none of them; the freeze's *role-IA* clause (three portals incl.
student) is the single 016 element this audit revises — by evidence, via DEC-001/002, with the
change-control trail this document provides.
