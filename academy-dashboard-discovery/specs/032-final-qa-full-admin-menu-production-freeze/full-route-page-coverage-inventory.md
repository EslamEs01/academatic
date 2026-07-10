# Full Route / Page Coverage Inventory — Spec 032

`find public -maxdepth 1 -name '*.html' | wc -l` = **103** = 51 bases × 2 langs (`.html` + `.en.html`) + `index.html`. `scripts/build-html.mjs` `PAGES` (`:85-143`) = **51 entries**, each `{ base, activeId, titleKey, crumbKey/render }`. **Every base has both `.html` and `.en.html`; 0 missing mirror; 0 orphan; 0 accidental extra.**

## Page groups (51 bases)
| Group | Bases (count) | Owner / reachability |
|---|---|---|
| Admin nav-routed | dashboard · sessions · schedule · attendance · sessions-analysis · public-holiday · scheduled-actions · families · add-family · students · courses · groups · teachers · teacher-performance · reports · finance · staff · library · certificates · settings (20) | 1:1 with the 20 IMPL nav items |
| Profile/detail templates | family · student · course · group · teacher (5) | drill-down from list pages (`students.js:21-22`, `courses.js:20`, `groups.js:20-21`, `teachers.js:23`); `activeId` = parent list id |
| Dev gallery | gallery (1) | documented Spec-001 component gallery (README.md:46); intentionally not in nav |
| Portal hub + role homes | portals · student-portal · family-portal · teacher-portal (4) | documented separate surface (`nav.config.js:132-136` FUTURE_ROLE); portals.html = the demo entry |
| Family drill-down | family-child (1) | fold-point link from family-portal.js:64 + family-children.html |
| Student internal | student-schedule · student-homework · student-materials · student-progress · student-history · student-profile (6) | `ROLE_NAV.student` implemented (`fixtures/portal.js:141-147`) |
| Family internal | family-children · family-schedule · family-progress · family-billing · family-requests · family-materials · family-profile (7) | `ROLE_NAV.family` implemented (`fixtures/portal.js:150-157`) |
| Teacher internal | teacher-schedule · teacher-students · teacher-outcomes · teacher-tasks · teacher-reports · teacher-profile · teacher-library (7) | `ROLE_NAV.teacher` implemented (`fixtures/portal.js:160-167`) |

**Total**: 20 + 5 + 1 + 4 + 1 + 6 + 7 + 7 = **51 = PAGES.length**. Every page is nav-routed, a documented profile-template drill-down, the documented dev gallery, or a documented portal page reachable via its own `ROLE_NAV`/fold-point link. **0 orphans.**

## Verifications
- **Both-language build**: the generation loop (`build-html.mjs:183` `for (const lang of ['ar','en'])`) writes `page.html` (ar, `dir="rtl"`) + `page.en.html` (en, `dir="ltr"`) for every base → 51 × 2 = 102 + `index.html` = 103. ✓
- **No missing mirror**: every base appears exactly twice in `public/`. ✓
- **No accidental extra**: 103 = 51×2+1 exactly; no page outside the PAGES list. ✓
- **`docs/` mirror** (GitHub-Pages copy) has its own publish drift — OUT OF SCOPE for the freeze (reconciled by `npm run deploy:pages`).

## Freeze acceptance
Every route/page has a source owner + both language mirrors; 0 orphan, 0 missing mirror; count = 103. The forms-completion fix (modals/drawers) adds **no new page** by default → count holds at 103.
