# Role-Law & No-Fake Carryover (Spec 035)

All standing laws from Specs 016–034 remain BINDING. Spec 035 touches only the Families/Students nav completion; the following must stay green and their protected smoke assertions **byte-verbatim**.

## Role laws (must stay green)
| Law | Why it still holds under Spec 035 |
|---|---|
| **Teacher pay-free (GLOBAL)** | Spec 035 touches no teacher surface. schedule-search shows sessions/slots by teacher **name/subject only** — no rate/salary/pay token. `teacher-*` files stay byte-identical. |
| **Family zero-pay** | familyCategories folds to `families.html` (no currency); no pay figure introduced anywhere. The family PORTAL is untouched. |
| **Student child-view** | The student PORTAL (`student-portal.html`, «عرض الابن») is a separate surface and is untouched. studentResult/studentEvaluation deep-link into the **admin** `student.html` profile tabs (a page, not the portal) — no «لوحة الطالب/بوابة الطالب/student dashboard» token introduced. |
| **Admin finance Spec-009 invariant** | No finance body touched; schedule-search carries no invoice/amount/salary/payout figure. |
| **No computed score/rank/chart** | Enforced across results/evaluation (deep-links to existing FIXTURE-ONLY tabs) and schedule-search (labeled chips + lists only). |

## No-fake laws (must stay green)
- No fake send/save/publish/convert/book/assign; every final = honest gate («يُتاح بعد ربط الخادم» / "available once the server is connected").
- No backend/API/websocket/database/auth; no external dependency (`package.json` 0-diff).
- No new `data-*` hook, no new storage key, no engine. Reuse the CLOSED set: `filterBar`/`data-facet`, `data-disabled-reason`/`data-reason-key`, `#view=` tab hash, `data-drawer`→`template[data-preview]`, `data-confirm`.
- No `href="#"`, no dead button, no raw locale key.
- No `type=file` / `type=password` / credential / secret; no `<canvas>` / `.pdf` / `window.open` / `blob:`.

## Protected smoke assertions to keep BYTE-VERBATIM
- `payHit` (teacher pay-free), the two `payFigure` / `famPay` regex lines, `child-view` body guard, admin-finance invariant.
- The Spec-026 action-completion asserts, Spec-032 form-completion asserts, and the 026–034 per-page asserts.
- Any Spec-035 additions must be **additive** (a new Families/Students block), never a rewrite of a protected regex.

## Sanctioned amendment (anticipated, to be confirmed at implement time)
- **Route-freeze count 113 → 115** (+ the `schedule-search` base in the smoke PAGES list).
- **Families-category «قريبًا» probe**: after Spec 035 the families category has **0** planned items. Any smoke probe that currently relies on a planned item existing in the families panel must be repointed to a category that still has one (e.g. teachers `addTeacher`/`teacherCategories`, or admin `materials`) — an additive, honesty-preserving adjustment, not a weakening.

## Impact-protection expectation
- Only the **shared admin sidebar** re-renders (4 «قريبًا» buttons → anchors) across the admin pages — the standard nav-flip footprint.
- Every admin `#page-body`, all portal pages ×16, and `index` stay byte-identical **except** `families.html`/`.en` (nav flip only — its `#page-body` unchanged) and the 2 new `schedule-search` files.
- `families.html`/`family.html`/`students.html`/`student.html` **bodies** stay byte-identical (deep-links + fold reuse existing surfaces; no body edit). `package.json` 0-diff.
