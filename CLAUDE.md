<!-- SPECKIT START -->
Active feature: **Spec 023 — Full Legacy Coverage Audit 000–022 is DELIVERED** (audit-only; awaiting
the watcher commit). Renamed from "000–020" to **000–022** because the audit baseline is the full
delivered set incl. Spec 021 (role-model correction) + Spec 022 (living rework). **Specs 020/021/022
are the committed baseline** (HEAD `837b0c1`); the audit made NO app changes. Twelve evidence-based
artifacts under `academy-dashboard-discovery/specs/023-full-legacy-coverage-audit/` (spec ·
visual-grounding (25-area) · legacy-inventory · current-app-inventory · **coverage-matrix** (admin 44
caps folding 300 captures + family 13 + teacher 17 + hub/shell) · current-vs-legacy-map ·
missing-capabilities-register (M-01…M-16: **0 P0**, 6 P1, 2 P2, 1 P3, 7 excluded-by-law) ·
extra-or-drift-register (X-01…X-49: **0 remove**, drift verdict NO) · design-quality-register
(D-01…D-15) · role-model-consistency-audit (**9/9 PASS** + F-00-1) · **correction-backlog-for-024**
(B-01…B-18) · agent-findings/00–10). VERDICT: the rebuild is traceable to legacy and NOT drifting;
family strongly covered (020/022), student-as-child-view correct (021), teacher home improved +
internals planned for 025, admin complete-and-sequenced (43 future items re-verify the 016 57-row
inventory EXACTLY). **Confirmed defect F-00-1** = leftover «لوحة الطالب — النسخة الأولى» noteT/noteD
on 6/7 child-view pages (`ar.prt.js:297-298`/`en.prt.js:294`) → **B-01 Must fix in 024** with declared
hash supersession. **Spec 024 — Corrections From Legacy Coverage Audit is IMPLEMENTED** (awaiting the
watcher commit; artifacts + `tasks.md` + `correction-status.md` at
`academy-dashboard-discovery/specs/024-corrections-from-legacy-coverage-audit/`). Closed B-01…B-11 of
the Spec 023 backlog (correction/alignment only — NO new pages/backend/fake behavior; **77 HTML held**;
no new hook/storage key). **B-01** reframed the child-view note «لوحة الطالب»→«عرض الابن» (ar
`prt.stu.noteT/D`, en) + rebake of 6 child-view pairs + a DECLARED 022 extraction-hash supersession
(10/12 internal-body hashes; student-schedule untouched) + a smoke guard (child-view body ≠
«لوحة الطالب|بوابة الطالب|student dashboard»); family/teacher role notes byte-unchanged. **B-03** added
an honest role-shell notifications bell reusing `data-action="notifications"` (no dot/count, no new
hook, admin gate untouched). **B-05** added one planned teacher `library` «مكتبتي/Library» nav item
(non-anchor; smoke teacher nav 7→8; `plannedNavAnchors===0` held). **B-11** pure-CSS density: D-06
dark role-tinted idHero (theme-aware), D-08 hub 2-up, D-13 mobile topbar de-wrap (D-04/D-05/D-09
deferred — pinned bodies). Records: **B-02** Locations→031, **B-04** live-room→future-backend, **B-06**
teacher chat→future (owner 025, no nav item), **B-07** pay-free exemption for the pre-existing Spec 007
admin teacher-performance board (grep NOT weakened; 025 repoints the anchor), **B-08/B-09** exclusion +
finance-boundary provenance in README/CLAUDE, **B-10** rail verified MOVED-not-deleted (prep-hint →
flowStrip «التحضير»), family-children no-fold-link recorded intentional. **Finance boundary (B-09,
binding)**: authored admin invoice-amount literals are Spec-009-sanctioned (zero aggregate/math,
admin-only); salary/payroll/compensation/payout FIGURES never allowed anywhere; family/teacher stay
figure-free. **Spec 025 — Teacher Internal Pages is IMPLEMENTED** (awaiting the watcher commit; artifacts
+ tasks + 18 contracts at `academy-dashboard-discovery/specs/025-teacher-internal-pages/`). Built the 7
teacher internal pages (schedule·students·outcomes·tasks·reports·profile·library, each AR+EN → **77→91
HTML**) from the existing living primitives + retained TEACHER_PREVIEW fixtures (7 new `teacher-*.js`
modules, authored via a parallel workflow; all new copy under `prt.tch.pg.<page>.*`, mirrored ar/en).
Flipped the 7 planned ROLE_NAV.teacher items→implemented (**navListAnchors 1→8**, plannedNavAnchors===0,
shell-anchor multiset 5→19 — teacher is now a full role app like family); build-html registers the 7
pages ONLY. **Repointed the teacher-home performance anchor `teacher-performance`→`teacher-reports`**
(`teacher-portal.js:70`), closing the Spec-024 B-07 admin-shell adjacency; smoke anchor assert re-pinned.
Pay-free GLOBAL verified 3-layer (source incl. comments + built + smoke `payHit` byte-verbatim; reports
is academic-only — authored counts + rubric dimension lines, NO chart/score); live-room + availability +
save/submit + export + upload/download + the 3 profile write gates are honest backendRequired gates;
**no teacher chat page/nav** (B-06→026). Smoke PASS (90 loads); admin+index+family+student byte-identical
(only teacher-portal pair changed); package.json/enhance.js/topbar.js/portal-shell.js/nav.config.js
0-diff. Smoke rescope added a TEACHER_INTERNAL set + the teacher nav/body asserts (one sanctioned
amendment; payHit/famPay/admin asserts byte-verbatim). **Spec 022 —
Living Dashboards Experience Rework is IMPLEMENTED** (awaiting the watcher commit): the hub + the
three role homes became LIVING cockpits and the corrected role model landed. Five shared living
primitives added to `portal-page.js` (**idHero · dayRail · storyRow · flowStrip · guidePanel** —
append-only; the six pre-existing exports byte-identical) over an additive `app.css` living layer
(`.pt-idhero/.pt-rail/.pt-story/.pt-flow/.pt-guide`; ALL motion — `lv-fill/lv-fadeup/lv-pulse` —
quarantined in ONE `prefers-reduced-motion: no-preference` block, smoke-audited; `.pt-hero` stays the
hub's). **Corrected role model** (Spec 021 DEC-001/002/004): hub = 2 primary role cards [family,
teacher] + admin console + **1 demoted child-view preview** (→ student-portal); the student shell
reframed «بوابة الطالب»→«عرض الابن» / «طالب»→«ابن العائلة» PURELY at the locale layer
(`prt.portal.student`/`prt.role.student`/`prt.title.student`), so the **six student internal MODULES
got ZERO touches and their `#page-body` stayed BYTE-EQUAL** (12 extraction-hash proofs). `family-child`
gained the ONE sanctioned fold-point link (body anchors 5→6; new baseline body md5 recorded — declared
supersession of the 020 hash). **family-children NOT touched** (per-child child-view links REJECTED as
dishonest — the preview persona is st1/سلمان only; byte-identical). Identity **55/77** (22 rebakes:
hub·family-portal·teacher-portal ×2 + student ×14 + family-child ×2); 40 admin + index + the other 6
family internals byte-identical; portal-shell/enhance/nav.config/build-html/package.json 0-diff.
ONE smoke amendment (kpiCards 4→0 + idHero/railStops/flowSteps/storyRows probes + hub 2-card re-pin +
childView probe + family-child +1-anchor re-pin + reduced-motion CSS audit); **payHit + both
payFigure/famPay regex lines + ALL admin asserts + FAMILY_INTERNAL/STUDENT_INTERNAL branches
BYTE-VERBATIM**; smoke 76 loads green · teacher pay-free three layers green · family zero-pay green on
all 18 bodies. Artifacts: `academy-dashboard-discovery/specs/022-living-dashboards-experience-rework/`
(spec · plan · research D1–D24 · data-model · quickstart · 16 contracts).

History: **Spec 022 mission** — transform hub + role homes from static card galleries into living
educational cockpits AND land the corrected role model, under ALL standing laws. **The Living
Design System (6 shared primitives)**: `pt-hero` role identity band (gradient wash + avatar +
2–3 contextual counters; NEVER pay data) · `pt-rail` living day timeline (now pulses/next
emphasized/done dims; child/room tags) · `pt-story` status story rows (number + narrative + real
link — replaces KPI tiles) · `pt-flow` teacher prepare→attend→record→review strip · `pt-guide`
guided gate panels (still non-interactive) · joy/motion layer (C10's proven وسام/celebration
language scaled up; pure CSS; `prefers-reduced-motion` honored; NO JS animation engine). Surfaces:
portals hub (3 primary cards + admin + DEMOTED child-view entry) · family-portal (violet guardian
cockpit) · teacher-portal (teal teaching cockpit, PAY-FREE extended set) · student pages =
**Option B+** (all 7 reframed «بوابة الطالب»→«عرض الابن»; home also adopts hero/rail/story; six
internals copy-reframe ONLY; Option C rejected) · family-child + family-children fold-point links
(«افتح عرض الابن الكامل») — the ONLY family-internal body change. Protections: 40 admin + index
BYTE-IDENTICAL · payHit + zero-pay regex lines + admin asserts BYTE-VERBATIM · ONE sanctioned smoke
amendment · ceilings re-pinned ±10% tunable · closed hook set (NO new hooks/keys) · zero deletion
(ROLE_NAV.student structurally untouched). Artifacts:
`academy-dashboard-discovery/specs/022-living-dashboards-experience-rework/` (spec.md ·
visual-grounding.md (16 frames incl. L9/L10 legacy day surfaces + C8/C9/C10 mobile/dark/progress) ·
dashboard-diagnosis.md (10 answers) · role-reclassification-scope.md · checklists/).

History: **Spec 021 — Role Model Audit** (audit-only, delivered): legacy = THREE logins (Admin ·
Teacher · Family/Guardian at `/student/*`; NO student role — folder/inventory/pixel-proven; persona
Salman IS fam1's child st1). DEC-001…009 binding: student demoted (no deletion) · 019 pages
preserved as child-view · family owns the child journey · sequence 022 living rework → 023 coverage
audit → 024 corrections → **025 Teacher Internal Pages** → 026–031 admin groups → 032 final QA.
Artifacts: `specs/021-role-model-student-reclassification/` (visual-grounding L1–L8/C1–C7 ·
role-model-decision · current-vs-legacy-map).

History: **Spec 020 — Family / Guardian Internal Pages is IMPLEMENTED** (awaiting the watcher commit):
seven new page pairs `family-{children,schedule,progress,billing,requests,materials,profile}(.en).html`
(63→**77** built; **59/77 hash-identical**) · seven `ROLE_NAV.family` flips · the home quick-tiles
honesty fix (home body anchors 5→**12**) · **family-child preserved as the drill-down** (`#page-body`
extraction hash BYTE-EQUAL both languages) · billing STATUS-FIRST under the zero-pay hard line
(hour-quota 40/12/28 · amount-free invoice rows · the verbatim payFigure regex green on ALL 18 family
bodies) · build touch = 7 imports + 7 entries (purely additive, zero drift on the 63 pre-existing
files — proven) · smoke **76 loads** green · student/teacher/hub/admin branches + payHit + the
original zero-pay lines held BYTE-VERBATIM. Plan and 17 contracts:
`academy-dashboard-discovery/specs/020-family-guardian-internal-pages/plan.md`
(see also `research.md` (D1–D20), `data-model.md`, `quickstart.md`, `visual-grounding.md` (27/27), and `contracts/`).

History: **Spec 019** (commit `8d3d561`) delivered the six student internal pages (51→63; 49/63 identity;
nav flip + quick-tiles honesty fix + `portal-page.js` + the build `activeId` pass-through; ceiling
[500,2200] on internals).

History: **Spec 018** (commit `fe47f68`) delivered the COMPACT admin-like role homes (5 bands each,
≈1,428/1,753/1,486px @1366×768, down from ≈3,600/4,200/4,390; ceiling smoke-pinned) + the NEW
`family-child(.en).html` drill-down (five baked fam1 panels st1/st6/st11/st12/st13, pure-CSS `#child=stX`
`:target` switching, family home bodyAnchors===5); identity 43/51; displaced 013/014/015 fixtures/keys
RETAINED for 019–021. Spec 017 = `0edafe1` (Shell v2) · Spec 016 = `2b8bb84` (law).

**Spec 018 (the user's binding verdict)**: the three role HOMES are too long/portal-like → rework into
COMPACT admin-like dashboards inside the untouched Shell v2 — the 7-band recipe (compact header · 4-KPI
row (`num()` fixture literals) · now band (today ≤3 + next) · role-core (student homework snapshot ·
family CHILDREN CARDS w/ real drill-down links · teacher follow-up board) · ONE preview band · quick-link
tiles · one-line note), HARD CEILINGS smoke-asserted (sections 4–7 · scrollHeight ≤2,200px @1366×768,
±10% tunable-recorded) — the endless page can never return. **NEW `family-child(.en).html`** (the ONE
sanctioned build-html.mjs touch = 2 lines: import + PAGES entry): five BAKED child panels for the REAL
fam1 roster **st1/st6/st11/st12/st13**, existing data-tab/hash machinery, default st1, deep links
`#child=stX`; family home bodyAnchors 0→**5** exact child targets; the child page: shell registry
{family-portal, portals}×5, body 0, zero-pay regex applies. **Displacement map is law** — zero capability
deletion; displaced fixtures/keys RETAINED (grep-audited) for Specs 019–021. ONE sanctioned smoke
amendment re-scopes the 013/014/015 long-home branches (KPI===4 + window + ceiling; family anchors===5;
teacher anchors===1 KEPT) + adds the family-child branch (50 loads) — **payHit + family zero-pay regex +
ALL Shell-v2/hub/admin asserts BYTE-VERBATIM**. Identity target **43/51** (40 admin + index + hub pair;
built = 51 files). Teacher pay-free EXTENDED set re-runs all three layers. Sequence renumbered
(user-directed, append-only amendment to the 016 sequence artifact): **019 Student pages · 020 Family
pages · 021 Teacher pages · 022–027 admin groups · 028 Final QA**.

**Spec 016 is BINDING LAW for all Specs 017–027** (committed docs at
`…/specs/016-full-frontend-audit-role-dashboards-ia-design-freeze/`): the role-dashboard IA
(the three portals are Role Dashboard HOMES — kept filenames; full apps = mini-apps with role
sidebars), the design freeze (+ forbidden-pattern register + change control), the honesty/
backendRequired contract (four action classes, four gate patterns, the no-fake register), the
**teacher pay-free GLOBAL contract** (the entire `teacher-*` family forever), the legacy coverage
matrix (178 templates, zero uncategorized), the admin sidebar inventory (57 rows → Specs 021–026),
and the sequence 017–027 with Spec-027's eight machine-checkable no-missing rules.

History: Spec 017 (`0edafe1`) delivered **Portal Shell v2** — role topbar + desktop `aside.pt-sidenav`
(identity block · ROLE_NAV items · hub exit) + native mobile `details.pt-nav-drawer` (freeze amendments
A1 native-disclosure + A2 no-collapse) on the three role pages; ROLE_NAV registries (7/8/7, home=real
self-link `aria-current`, futures=planned «قريبًا» BUTTONS, zero new hooks/pages); all nav OUTSIDE
`#page-body` (home content proven byte-equal); sanctioned-anchor registries smoke-pinned (shell
{self,hub} multiset 5); 41/49 identity held. Spec 015 (`20dc089`) delivered the TEACHER home — 14 sections (real out15/out4 follow-ups,
5-step workflow + A2 gate notes «تسجيل الغياب…»/«طلب إلغاء أو تعويض…», recent-sessions slice out1/out11,
SAT/MON/TUE day-groups + truthful free-days empty, rubric lines, ONE sanctioned body anchor →
`teacher-performance(.en).html`), planned register {outcomeSave/matUpload/availabilityEdit:
backendRequired, taskManage: planned}, three-layer pay-free enforcement; coverage §9 (27 T-rows).
Spec 014 (`0d144aa`): FAMILY home — 12 sections, zero-pay regex, PORTAL_PLANNED.family 2+2;
coverage §8. Spec 013 (`86729a9`): STUDENT home — 13 sections, gauges, PORTAL_PLANNED.student 2+1;
coverage §7. Spec 012 (`5bcf490`): portal layer + hub + `ar,en.prt.js` overlay + payHit assert +
the 39-page legacy coverage artifact. Spec 011 (`e7ee011`): zero `href="#"` STANDING. Spec 010
(`0ee1965`): coverage matrix/nav IA/chip-tone guard. Prior plans under `…/specs/0NN-*/plan.md`.

Hard constraints (Specs 001–016, all carried + binding): the ADMIN console continues the approved
design (six-category rail); **static HTML-first** — complete pre-rendered `public/*.html` per
language, NO whole-page `#app`, all content baked at build, enhancement only via the CLOSED
`data-*` hook set — NO new hook, NO new storage key; relative paths; GitHub-Pages compatible;
Django-template-ready; Arabic RTL first + English LTR; Light/Dark/System; ALL status/signal chips
labeled icon+text; native JS; no CDN/TypeScript/SPA/chart/table/form/calendar libs; fixtures only —
no real API/auth/permissions/CRUD/persistence; NO engine of any kind; NO computed
score/rank/leaderboard/percentile/chart; ALL salary/payroll/compensation/payout math OUT of scope —
zero pay figures anywhere; reports body finance-free FOREVER; finance body Spec 009-invariant; zero
`href="#"` sitewide; no copied legacy assets/classes/palette/wording/status codes; screenshot-based
visual acceptance. **Portal rules (Specs 012–017, standing)**: role apps are a SEPARATE surface —
never the admin shell, never in admin nav; personas = st1/fam1/sara until real auth
(backendRequired); every number authored; every action one of the four honest classes; planned nav
items are labeled non-links, never anchors; the sanctioned-anchor registry pins every portal page's
link inventory; the family app carries ZERO currency/pay figures; **the teacher app is PAY-FREE
GLOBALLY** (extended token set incl. أتعاب/فلوس/دولار/money/currency, copy AND comments, no route to
any pay surface — three-layer enforced). Future: 018 student pages · 019 family pages · 020 teacher
pages · 021–026 admin families per the 016 sidebar inventory · 027 final no-missing QA.
<!-- SPECKIT END -->
