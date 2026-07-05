# Future Spec Sequence 017–027 (Spec 016 — adopted; folds the admin finish plan + final acceptance rules)

**The user-proposed sequence is adopted unchanged** — research confirms it: the role shell (017) is the enabling dependency for all role pages (018–020); role apps precede admin breadth because they are the product's differentiating surface and their patterns (gates, sanctioned anchors) are already proven; admin groups (021–026) mirror the six sidebar categories so each spec has one crawl-evidenced page family; finance (025) sits late so the GATE/LOCK shell pattern (frozen in 016, first built in small doses earlier) is mature; 027 closes with the no-missing audit. No reordering is needed or recommended.

Standing rules for every spec below: static HTML-first · fixtures only · the design freeze is law · the honesty contract is law · byte-identity outside the owned page family · one sanctioned smoke amendment per spec (owned-branch only) · screenshot acceptance · teacher app pay-free · family pages figure-free · watcher-owned git.

| Spec | Name & scope | New/changed pages (pairs) | Depends on | Acceptance floor |
|---|---|---|---|---|
| **017** | **Role Dashboard Shell + Navigation**: portal shell v2 (role sidebar/topbar/mobile drawer), role-nav registries, homes re-hosted in the shell with sanctioned-anchor registry, hub copy update | 3 home pairs + hub pair re-rendered; NO new pages | 016 freeze | Shell renders on all 4 portal pages; role navs match the frozen maps; smoke: sanctioned-anchor registry per page, zero admin markup, payHit green; 40 admin files byte-identical |
| **018** | **Student Internal Pages**: the 6 pages per inventory | +6 student pairs (12 files) | 017 | Every S-capability mapped; gates graduate (fullHistory→history page); student smoke branch extended per-page; 390px probe all |
| **019** | **Family Internal Pages**: the 7 pages | +7 family pairs (14) | 017 | F-rows all delivered/gated; **zero-figure assert on every family page**; meetings/trial/cancel previews page-hosted |
| **020** | **Teacher Internal Pages**: the 6 pages | +6 teacher pairs (12) | 017 | T-rows delivered/gated; **three-layer pay-free audit over the whole teacher-* family**; payHit-class assert per page; T4/T5 gates page-hosted |
| **021** | **Admin Control/Sessions/Operations**: sessions-analysis, chat preview, leads funnel, tasks board, announcements, time converter, holidays, scheduled actions, schedule-requests inbox, attendance per-student lens, ops bands | +9–10 admin pairs + attendance/sessions deepening | 016 (independent of 017–020) | All 8 control planned items become REAL/GATE pages; nav flips planned→implemented; zero dead links |
| **022** | **Admin Families/Students/Courses/Groups**: family categories, schedule search, student results, student evaluation, Learning-Path deepening, forms/students fold-prep | +4 admin pairs + course/profile deepening | 021 patterns | 4 families planned items flipped; profiles interlinked |
| **023** | **Admin Teachers/Performance**: add-teacher wizard preview, teacher categories, sessions KPI, monthly performance, teachers-details band | +4 admin pairs | 022 | 4 teachers planned items flipped; zero pay fields rendered in add-teacher |
| **024** | **Admin Reports/Analytics/Feedback/Forms**: monthly reports, data analysis, class/teacher/family feedback family, forms-builder preview | +4–5 admin pairs | 023 | 2 reports planned items flipped; display-only STAT treatment; reports body stays finance-free |
| **025** | **Admin Finance**: invoices, monthly invoices, payments/methods, banks (REAL/LOCK) + salaries, staff salaries, class-salary-report, payouts, expenses, analytics (GATE, zero figures) | +9–11 admin pairs | 024 | All 7 disabled nav items become honest pages/shells; **no runtime money math; role apps untouched; teacher app grep still zero** |
| **026** | **Admin Management/Content/Certificates/Settings**: staff+RBAC, materials, library, certificates designer+requests, 6 settings sub-pages (+users merge decision) | +11–12 admin pairs | 025 | All admin+settings planned items flipped; integration/security/permission saves GATE |
| **027** | **Final Full Frontend QA + No-Missing Audit**: full-matrix re-verification, index.html EN decision, cross-app polish, coverage close-out | polish only | all | The final acceptance rules below, all machine-checkable, all green |

**Projected final surface**: ~49 current + ~12 role-internal pairs + ~35 admin pairs ≈ **145–150 built files** — matching the legacy's 178 templates minus excluded/merged/backendRequired-engine routes, with zero silent gaps.

## Final acceptance rules (Spec 027's pre-frozen, machine-checkable criteria)

1. Coverage: every row of `legacy-to-new-coverage-matrix.md` resolves to a shipped page, a labeled gate on a shipped page, or a documented exclusion — script-checked against the matrix file; zero `needs-decision`.
2. Navigation: zero `planned` items remaining in any nav registry (admin or role) — every item `implemented` or an honest LOCK/GATE page; zero `disabled` without a destination page.
3. Links: zero `href="#"`; zero dead local links (full crawl); every portal page's body anchors ⊆ its sanctioned registry.
4. Honesty: zero form controls in role apps; zero fake actions anywhere (action-class audit); every gate labeled with the availability vocabulary.
5. Pay rules: word-bounded EN + AR pay regex + currency regex = zero hits over the entire `teacher-*` family (source incl. comments + built) and zero currency/amount tokens on every `family-*` page; reports body finance-free; the Spec-012 payHit assert lineage green.
6. Quality: smoke green on all loads; axe critical=0 serious=0 across the matrix; 390px probe green on every page; zero raw keys; zero console errors in captures.
7. Identity discipline: each spec's diff confined to its owned family (hash audit per spec, re-verified cumulatively).
8. Visual: screenshot review recorded per page family in REVIEW.md with explicit PASS verdicts against the freeze's forbidden-pattern register.

## Amendment (user-directed, Spec 018 — append-only; the table above is preserved as history)

**A corrective UX spec was INSERTED after Spec 017**, so the internal-page and admin specs renumber by +1.
The original sequence table above is kept verbatim (history); the binding sequence from Spec 018 onward is:

| # | Spec | Was (016 table) |
|---|---|---|
| **018** | **Role Dashboards Admin-Like UX Rework** (CORRECTIVE — the three role HOMES compressed into compact admin-like dashboards inside the untouched Shell v2 + the NEW `family-child` drill-down page) | *(new — inserted)* |
| **019** | Student Internal Pages | was 018 |
| **020** | Family / Guardian Internal Pages | was 019 |
| **021** | Teacher Internal Pages | was 020 |
| **022** | Admin Control / Sessions / Operations Pages | was 021 |
| **023** | Admin Families / Students / Courses / Groups Pages | was 022 |
| **024** | Admin Teachers / Performance Pages | was 023 |
| **025** | Admin Reports / Analytics / Feedback / Forms Pages | was 024 |
| **026** | Admin Finance / Invoices / Salaries / Banks Pages | was 025 |
| **027** | Admin Management / Content / Certificates / Settings Pages | was 026 |
| **028** | Final Full Frontend QA + No-Missing Coverage Audit | was 027 |

Why inserted: the user's binding verdict — the role homes were too long/portal-like ("even the developer got
lost"); Spec 018 reworks them into compact admin-like dashboards (the 7-band recipe · hard scrollHeight ceiling
≤2,200px @1366×768 · a mandatory guardian→child-profile drill-down) BEFORE any internal pages are built, so
Specs 019–021 inherit compact, correct homes + the drill-down pattern. The eight final acceptance rules above are
unchanged and still owned by the final QA spec (now **028**). The no-reorder rule is amended ONLY by this
owner-directed insertion; all downstream dependencies shift by one number.

**Spec 018 (2026-07-04) — Role Dashboards Admin-Like UX Rework: DELIVERED.** The three role homes are compact
(student ≈3,600→1,428px · family ≈4,200→1,753px · teacher ≈4,390→1,486px @1366×768, all inside [900, 2,200]);
each is the 7-band recipe (compact header · 4-KPI row · now band · role-core · preview · quick-links · note),
smoke-pinned (sections 4–7 · KPI===4 · ceiling probe). The NEW `family-child(.en).html` ships five baked child
panels for the REAL fam1 roster (st1/st6/st11/st12/st13), pure-CSS `:target` deep-link switching (`#child=stX`;
the frozen enhance.js hash reads only `#view=`), default st1; the family home carries the five REAL drill-down
links (body anchors===5). Displacement is law — zero capability deleted; the displaced 013/014/015 fixtures/keys
are RETAINED (grep-audited) for Specs 019–021. Identity 43/51 (40 admin + index + hub pair byte-identical);
teacher pay-free three layers green; the Spec-012 payHit + family zero-pay asserts held BYTE-VERBATIM.

---

## Append-only amendment — Spec 021 (2026-07-05) supersedes the 018 renumbering (DEC-009)

Spec 021 (Role Model & Student Reclassification Audit) proved from the legacy crawl that the system
has **three** primary logins only — **Admin `/management/*` · Teacher `/teacher/*` · Family/Guardian
`/student/*`** (there is NO standalone Student role; every legacy `student-*` route is a guardian
surface; the rebuilt hub's standalone Student portal was a classification drift — its persona Salman
IS fam1's child st1). Binding decisions DEC-001…DEC-009 fold Student under Family as the child's own
view (preserved, never deleted) and require the dashboards be made *living* before any more feature
pages. The sequence is therefore revised (this supersedes the Spec-018 sequence note above):

**021** Role Model & Student Reclassification Audit · **022** Living Dashboards Experience Rework ·
**023** Full Legacy Coverage Audit 000–020 · **024** Corrections From Legacy Coverage Audit ·
**025** Teacher Internal Pages (resumes here, once on the corrected model) · **026** Admin Control/
Sessions/Operations · **027** Admin Families/Students/Courses/Groups · **028** Admin Teachers/
Performance · **029** Admin Reports/Analytics/Feedback/Forms · **030** Admin Finance/Invoices/
Salaries/Banks · **031** Admin Management/Content/Certificates/Settings · **032** Final Full Frontend
QA + No-Missing Coverage Audit.

## Spec 022 delivered (2026-07-06)

The hub + the three role homes became LIVING cockpits and the corrected role model landed: hub =
2 primary role cards (family + teacher) + admin console + ONE demoted child-view preview (→ the
preserved student pages); five shared living primitives shipped in `portal-page.js` (idHero · dayRail
· storyRow · flowStrip · guidePanel) over an additive `app.css` living layer (all motion quarantined
behind `prefers-reduced-motion: no-preference`); the student surface reframed «بوابة الطالب» → «عرض
الابن» at the locale layer with the six internal MODULES untouched (their `#page-body` byte-equal —
extraction-proven); family-child gained the ONE sanctioned fold-point link (body anchors 5→6).
Identity **55/77** (22 intentional rebakes: hub·family-portal·teacher-portal ×2 + student ×14 +
family-child ×2); 40 admin + index + all other family internals byte-identical; family-children
byte-identical; portal-shell/enhance/nav.config/build-html/package.json 0-diff; teacher pay-free
three layers + payHit + family zero-pay held green/byte-verbatim.
