# Role-Law & No-Fake Carryover (Spec 037)

All standing laws from Specs 016–036 remain BINDING. Protected smoke assertions stay **byte-verbatim**
except the ONE sanctioned additive area recorded below. Baseline note: Specs 035 and 036 are
IMPLEMENTED and green in the working tree but **uncommitted** (HEAD `1eb4d9a` = Spec 034); this document
describes the laws Spec 037 must uphold once implementation is approved and begun on that tree.

## Role laws (must stay green)

| Law | Why it holds under Spec 037 |
|---|---|
| **Teacher pay-free (GLOBAL)** | Spec 037 touches only `reports.html`/`.en` (new Monthly/Analysis tabs) and, if the flagged-035 correctives are adopted, `families.html`/`students.html`. No teacher surface (`teachers.html`/`teacher.html`/`teacher-performance.html`/the 16 teacher-portal files) is touched — 0 salary/rate/hour_rate/fine/payout/payroll/currency token anywhere in scope. |
| **Family zero-pay** | The family PORTAL stays untouched. The only admin-side family delta under consideration — a strengthened `families.html#view=categories` board (`flagged-035-items-audit.md` §1) — carries an authored member-count literal + status chip only; no money/fee/plan figure is introduced. |
| **Student child-view** | The admin `student.html`/`students.html` are directory/profile/board surfaces for admins, not the student PORTAL. The student child-view portal (the 7 reframed «عرض الابن» pages, Spec 021/022/024) is not touched by Spec 037; the recommended `students.html#view=results`/`#view=evaluation` cross-student boards (`flagged-035-items-audit.md` §2–3) are additive admin fold-anchors only, reusing the existing single-student drill-down as their target. |
| **Admin finance Spec-009 invariant** | `finance.html` body is not touched. The `reports.html#view=analysis` tab is explicitly scoped to non-finance insight areas (attendance/sessions/courses-groups/teachers/students-families); finance-flavoured "analysis" (`analysis-expenses`/`analysis-invoices`/`monthly-invoices`) is excluded and owned by Spec 038 — reports body stays finance-free FOREVER (`monthly-reports-scope.md`, `spec.md` Grounding verdict). |
| **No computed score/rank/percentage/GPA/rubric-total/chart/canvas** | Both new reports tabs (Monthly, Analysis) render authored count literals + categorical status/trend chips only — no computed metric, no `<canvas>`, no chart library (`monthly-reports-scope.md` "Forbidden behavior"). The recommended Student Results/Evaluation boards carry authored status chips only — explicitly **no computed score/GPA/rank/percentage/rubric-total** (`flagged-035-items-audit.md` §2–3, "Medium risk" call-outs). |

## No-fake laws (must stay green)

- No fake report generation / analytics calculation / export / PDF / send / publish; every such final stays a `backendRequired` gate («يُتاح بعد ربط الخادم» / "available once the server is connected") — same honesty class as the existing reports Print/CSV/Share gates and the Spec 029 R-G re-pin.
- No fake family-category create/save/reclassify-persist; no fake student-result/evaluation calculation or mutation — the recommended correctives are strictly display-only boards over existing authored fixtures plus the existing gated drawers.
- No backend/API/websocket/database/auth; no external dependency (`package.json` 0-diff).
- No new `data-*` hook / storage key / engine. Reuse the CLOSED set only: the `tabs()` widget + `#view=` hash deep-link (proven by Specs 035/036), `filterBar`/`facetAttrs`, `data-drawer`→`template[data-preview]`, `data-disabled-reason`, `data-confirm`, `noResults()`.
- No `href="#"`, dead button, raw locale key, `type=file`, `type=password`, credential/secret.

## Protected smoke assertions to keep BYTE-VERBATIM

- `payHit` / teacher-pay guards, `famPay`/`payFigure`, child-view guard, finance/settings invariants.
- Admin-menu-50 freeze (the sidebar item count never changes under Spec 037).
- Finance 9-planned / figure-free assertions (finance category untouched).
- Families 0-planned and Teachers 0-planned assertions (Specs 035/036 — unaffected by Spec 037, which only touches Reports and, optionally, the families/students bodies via new tabs, not their planned-count).
- The Spec-026 action-completion asserts, the Spec-032 form-completion asserts, and the full 026–036 per-page asserts.
- The `nav010` block (6 rail cats · finance sub-section · admin-category item counts · admin-menu 50 · banks placement · planned-truthfulness) — only the Reports-category planned-count line is expected to change (see below); everything else in that block stays byte-verbatim.

## Sanctioned amendments (anticipated, to confirm at implement time)

- **Reports-category planned-count**: currently reports has 2 planned items (`monthlyReports`, `dataAnalysis`; see `admin-missing-pages-audit.md` Tally). After Spec 037 flips both to fold-anchors on `reports.html`, the reports-category planned count goes **2 → 0**, matching the families/teachers precedent (`spec.md` line 33, 102). This is the ONE sanctioned change to the existing "reports 7-category-card / 2-planned" smoke line, which becomes "reports 7-category-card / 0-planned".
- **New reports tab asserts**: `reports.html#view=monthly` and `reports.html#view=analysis` (AR+EN) open the correct tab on fresh load; the existing content is preserved intact inside a new **overview** tab (Spec 036 `teacher-performance` precedent) — the pre-existing 7-card/detail/feedback/forms asserts continue to pass unchanged because they live inside overview.
- **If the flagged-035 correctives are adopted** (`families.html#view=categories`, `students.html#view=results`, `students.html#view=evaluation`): additive asserts for each board (labeled surface renders, per-item authored chip, no computed metric, gated finals) — additive only, and the existing single-student `student.html#view=results`/`#view=evaluation` deep-link asserts stay byte-verbatim as the drill-down target.
- Route count stays 115 (no route-freeze number change — every Spec 037 delta is a fold/tab, 0 new page bases).
- Admin menu stays 50 (no item added/removed; only status/route fields flip on existing rows).

## Impact-protection expectation

- `reports.html`/`.en` bodies change (Monthly + Analysis tabs added, existing content becomes the overview tab) — the primary sanctioned body change.
- If correctives are adopted: `families.html`/`.en` and `students.html`/`.en` bodies also change (new `#view=categories` / `#view=results` / `#view=evaluation` tabs); `family.html`/`student.html` single-entity drill-down bodies stay byte-identical (they remain the deep-link target, unchanged).
- Only the shared admin sidebar re-renders elsewhere (2 «قريبًا» → anchors in Reports; the flagged items' routes refine but their nav rows were already non-planned since Spec 035). All portal pages ×16 + index + every other admin `#page-body` byte-identical. `package.json`/`enhance.js` expected 0-diff (the `tabs()`/`#view=` mechanism already exists and needs no new code — Specs 035/036 precedent).
