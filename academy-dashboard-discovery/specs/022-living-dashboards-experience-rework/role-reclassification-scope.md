# Role Reclassification Scope — Spec 022

Executes DEC-002…DEC-006 (Spec 021, binding). Audit-level decisions become an implementable scope
here; exact selectors/keys/registries are plan-stage work. **Zero deletion anywhere.**

## 1. Hub / role switcher (DEC-004)

- The hub leads with THREE primary role cards — **العائلة (violet) · المعلم (teal) · الإدارة** —
  each with persona line, a one-line "what you'll see", and the real open link. Arabic-first.
- **Student is demoted** to a clearly secondary entry BELOW the primary cards:
  a compact row/card labeled as the child's-own-view preview — copy must say it is part of the
  family journey (working copy, final at plan: «عرض الابن — معاينة لوحة الابن ضمن رحلة العائلة؛
  الدخول الفعلي للأبناء يُدار عبر حساب العائلة») linking `student-portal.html` (real link, not a
  role card).
- The admin console entry stays. The hub remains the no-auth demo device (existing demo note kept).
- FORBIDDEN: presenting Student as a fourth equal card; deleting the student link entirely; any
  fake login UI.

## 2. Student pages (DEC-003, DEC-005) — disposition decision

**Decision: Option B+ (rebrand/frame as child view, with shared-primitive uplift on the home).**

- All seven student pages (home + 6 internals) are PRESERVED — files, modules, fixtures, keys,
  registry, machinery. `ROLE_NAV.student` keeps its 7 implemented entries (internal navigation
  keeps working).
- **Reframe (all seven)**: the student shell's brand line and identity copy change from
  primary-role framing («بوابة الطالب») to child-view framing (working: «عرض الابن — أكاديمية
  مشكاة»; role chip «ابن العائلة» or equivalent; demo note updated accordingly). Copy-level change
  through locales + shell parameters; NO structural rebuild of the six internals.
- **Uplift (home only)**: `student-portal.html` additionally adopts the SHARED living primitives
  shipped by this spec (hero band, day rail, story rows) — the same components family/teacher get,
  applied to the existing authored student facts. No new student fixtures, no content invention.
- Option A-full (visual redesign of all internals) is deliberately deferred: if the 023 audit finds
  the internals jarring next to the uplifted homes, 024 extends the primitives there.
- Option C (byte-intact) is REJECTED: it would leave «بوابة الطالب» branding live, contradicting
  the corrected role model on every student page.

## 3. Family ownership / fold point (DEC-006)

- `family-child` gains one honest link per child panel (or one in the page header context): «افتح
  عرض الابن الكامل» → the student pages — closing guardian → child file → child's own view.
- `family-children` child cards MAY carry the same link as a secondary action beside «فتح ملف
  الابن» (plan decides placement; sanctioned-anchor registries re-pinned accordingly).
- The family home's five child cards keep drilling to `family-child` (unchanged journey entry).
- Persona coherence holds today: the student persona (Salman) IS fam1's child st1.

## 4. Nav & smoke consequences (recorded for plan)

- `ROLE_NAV.student` UNTOUCHED in structure; only shell-copy keys re-labeled.
- The hub's sanctioned-anchor registry is re-pinned (3 primary + admin + 1 demoted child-view
  link + any legal footer links).
- family-child / family-children body-anchor pins grow by the new child-view links (5 per page if
  per-child, 1 if single entry — plan decides; smoke re-pins exactly).
- The student smoke branch stays structurally BYTE-EQUIVALENT except the shell-copy assertions that
  referenced portal branding (re-pinned under the ONE sanctioned amendment).
- payHit · zero-pay regex lines · ALL admin asserts remain BYTE-VERBATIM.

## 5. What this file does NOT authorize

No page deletion · no student registry flip to planned · no removal of `student-*` from build ·
no fake student login · no auth simulation · no teacher/admin internal work · no implementation in
Spec 022's spec phase (this scope activates at implement time after plan/tasks).
