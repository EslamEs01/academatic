# Targeted Visual Grounding — Spec 035

**Gate: COMPLETE.** Evidence inspected first-hand (current app source + legacy crawl + prior specs) — not memory.

## Grounding note (required format)

```
Targeted Visual Grounding — Spec 035 Complete

Scope:
- familyCategories
- scheduleSearch
- studentResult
- studentEvaluation

Evidence inspected:
- CURRENT APP: app/src/js/nav.config.js (lines 44,46,47,48 = 4 planned families items; 142-143 stale FUTURE_ROUTES);
  pages/student.js (results+evaluation tabs 233-243, #view= deep-links); pages/schedule.js (browse filter, not search);
  pages/students.js (admin directory, no results cols); pages/families.js (category filter :32; fam-cat baked :39);
  pages/family.js (fam-cat drawer 149-165, trigger :68); components/result-summary.js (fixture-only, no score);
  components/evaluation-rubric.js (fixture-only rubric, no score); components/tabs.js (#view= sync :4);
  enhance.js (hashView wins 261-269).
- LEGACY CRAWL: output/roles/admin/pages/management-categories-families(.-create/-assign).md;
  management-search-schedule.md; management-student-1.md; management-forms-students.md;
  management-families-feedback.md; management-schedule-trials-response.md; output/combined/*.md (0 academic-score hits).
- PRIOR SPECS: 016 admin-sidebar-page-inventory (rows 37-38); 027 legacy-coverage + missing-action-register (M-K/M-R/M-S);
  029 (result-summary/evaluation-rubric, R-D/R-F/R-L, no-computed-% contract); 032 FC-05 (fam-cat);
  033 matrix rows 30/32/33/34 + CS-06..09 + page-vs-deeplink + page-count-envelope + roadmap.

Legacy capabilities found:
- familyCategories: REAL CRUD page /management/categories/families — list (#,Name,Description,Status,Count,Settings)
  + create (name/status/description) + edit + delete + assign-families (member_id[]). No computed figure.
- scheduleSearch: REAL distinct availability finder /management/search-schedule → POST search-available-teacher
  (from/to time window, category_selected[] multi, availability + courses toggles, Search). Separate from timetable browse.
- studentResult: NO dedicated legacy page. Qualitative only — per-course "Total Report" (narrative, approve/view) +
  "Send Report" achievement textarea. ("Request Result" is a trial-response inbox, NOT academic results.) ZERO computed score.
- studentEvaluation: NO dedicated legacy page. Qualitative only — "Student Feedback" meeting log + narrative report
  (Curriculum/Expected Outcomes/Level/Achievements) + categorical "Class Remark" (Excellent→Needs Improvement). ZERO computed score.

Current frontend state:
- familyCategories: planned «قريبًا»; surface EXISTS (families.html category filter + fam-cat display-only reclassify drawer, gated Save).
- scheduleSearch: planned «قريبًا»; NO surface (schedule.html is browse-only, not a search tool).
- studentResult: planned «قريبًا»; display-only Results tab EXISTS on student.html (#view=results).
- studentEvaluation: planned «قريبًا»; display-only Evaluation rubric tab EXISTS on student.html (#view=evaluation).

Implementation decision:
- familyCategories: FOLD-ANCHOR → families.html. Count 0. Save stays backendRequired. (Category CRUD/assign = future-backend.)
- scheduleSearch: STANDALONE page schedule-search.html + .en. Count +2. Book/Assign final = backendRequired. Client-side facet over authored fixtures.
- studentResult: DEEP-LINK → student.html#view=results. Count 0. Display-only, NO computed score/rank/chart.
- studentEvaluation: DEEP-LINK → student.html#view=evaluation. Count 0. Display-only, NO computed score/rank/chart.
- Net count 113 → 115 (+2). Nav flips = exactly 4 (families category → 0 «قريبًا»).

Forbidden for this scope:
- no fake booking
- no fake category create/save
- no fake result calculation
- no computed score/rank/chart
- no backend/API
- no row/status mutation

Proceeding to specify:
- YES
```

## Screenshot / capture evidence (legacy)
| Item | Legacy screenshot(s) | What it shows |
|---|---|---|
| familyCategories | `management-categories-families-*.png` (list, create, assign) | CRUD list + Category-Details form + Choose-Families assign |
| scheduleSearch | `management-search-schedule-full.png` (+ interaction 001/002) | Availability search form (time window + category + toggles) — distinct from the timetable |
| studentResult | *(none — no dedicated page)* | Grounded via `management-student-1` profile "Total Report" (narrative, no score) |
| studentEvaluation | *(none — no dedicated page)* | Grounded via `management-families-feedback` (narrative report) + student-profile "Class Remark" dropdown |

## Current-app screenshot targets (to capture at implement time)
- `families.html` AR/EN — the category filter + a `fam-cat` reclassify drawer open (fold reachability).
- `schedule-search.html` AR/EN (light/dark/mobile-390) — search form + results + empty state.
- `student.html#view=results` and `student.html#view=evaluation` AR/EN — the deep-linked tab active.

## Grounding gaps
- None material. studentResult/studentEvaluation have no legacy page by design (audited absence, not a gap) → deep-link to the existing display-only tabs is the conservative, honest resolution.
