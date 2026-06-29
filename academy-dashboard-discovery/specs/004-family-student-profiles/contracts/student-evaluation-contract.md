# Contract: Student Evaluation Tab — Monthly Progress Report (fixture-only)

**Status**: Binding · The **Evaluation** tab inside `student.html` — a fixture-only **Monthly Progress Report** rubric: criteria rows (`learningProgress` / `focus` / `homework` / `punctuality`) each with a **calm rating pill** (icon + label, never color-only) + an **achievements** narrative + **next-month objectives** + an **Approve demo** action. Rendered by `evaluation-rubric.js` from data-model *StudentEvaluationSummary*. **No evaluation workflow, no scoring engine, no persistence** — display only. Hosted by `student-profile-contract.md` (§10).

## 1. Purpose & honest scope (no workflow/engine)

The reference academy's "evaluation" was **not** a gradebook — it was a structured **Monthly Progress Report** (rating scales + achievements narrative + next-month objectives + an Approve step, R27). This tab surfaces exactly that, calmly, as fixture display. It MUST read as a demo/fixture report, **never** as a live evaluation system: no real Approve writes state, no rating is editable/computed, no review queue. It improves on the legacy's cramped report form with one airy, labeled, AA-contrast rubric.

## 2. Data source (binding)

The tab MUST render **only** from `Student.evaluation` (data-model *StudentEvaluationSummary*) — no second source, no engine:

- `monthKey` — the report month (display).
- `criteria` — `{ key, ratingId }[]` where `key ∈ { learningProgress, focus, homework, punctuality }` and `ratingId` is a calm rating id (e.g. `excellent / good / sometimes / rarely`).
- `achievementsKey` — the achievements narrative.
- `objectivesKey` — next-month objectives.
- `approved` — a boolean **display flag**; Approve is a **demo** action (no write).

All strings are i18n keys resolved at build time.

## 3. Anatomy (RTL, top → bottom)

1. **Report header** — the `monthKey` label + the `approved` state shown as an icon+label chip (e.g. "Approved" / "Pending review"), never color-only.
2. **Criteria rubric** (§4–§5) — one row per `criteria[]` entry: the criterion label + its **rating pill**.
3. **Achievements narrative** (§6) — `achievementsKey` as calm read-only prose.
4. **Next-month objectives** (§6) — `objectivesKey` as a calm list/paragraph.
5. **Approve action** (§7) — the demo Approve affordance.

The whole tab is baked static HTML inside the Evaluation `role="tabpanel"`; runtime JS renders nothing here (only the Approve demo fires a toast).

## 4. Rating pill vocabulary (binding — never color-only)

- Ratings MUST resolve through a small **evaluation-rating map** (in `evaluation-rubric.js`): `ratingId → { tone, icon, labelKey }`, rendered via the generic `chip`/pill. This map is **distinct** from the `family-status` lifecycle map and the session status map — a third, calm, evaluation-only vocabulary.
- Every rating pill MUST carry **both** an icon **and** a text label (`labelKey`) — **never color-only and never a bare number/score** (fixing the legacy numeric/unlabeled anti-pattern). Tone is calm and AA-contrast (e.g. `excellent→success`, `good→teal/sky`, `sometimes→amber`, `rarely→muted/coral`) but tone alone is never the only signal.
- The rating is **display-only** — not a slider, not a star widget, not editable; no library.

## 5. Criteria rows (binding)

The rubric MUST render exactly the fixture's `criteria[]`, with these four criterion keys labeled (improving the legacy's unlabeled scales): **`learningProgress`** (learning progress) · **`focus`** · **`homework`** (homework completion) · **`punctuality`**. Each row is `criterion label → rating pill`. Rows MUST stay readable and aligned in AR-RTL and EN-LTR; long labels wrap/truncate gracefully; the layout mirrors via logical properties. No criterion is invented beyond the fixture; the structure follows the reference, the wording is original.

## 6. Achievements narrative & next-month objectives

- **Achievements** (`achievementsKey`) — a calm read-only narrative paragraph (the human "what went well"), distinct from the rating rows. Empty → a calm "no narrative yet" line.
- **Objectives** (`objectivesKey`) — next-month objectives as a calm list/paragraph. Empty → a calm placeholder. Both are fixture display — no editor, no save.

## 7. Approve action — demo only (binding)

- The **Approve** affordance MUST be a clearly-labeled **demo** (`data-demo-action` → toast) **or** **disabled-with-reason** (`data-disabled-reason`/`data-reason-key`) — **no real evaluation persistence, no review workflow**. If destructive/irreversible framing is ever used, it MUST route through the approved confirm modal (`data-confirm` + `-title|-msg|-cta|-toast|-danger`) → demo toast. The `approved` fixture flag only sets the header chip's initial state; Approve does not change stored state.
- No dead control (IP8/IP9); no raw i18n key.

## 8. States, responsive, a11y

- **Empty**: a student with no evaluation shows a single calm "no evaluation this month" state for the whole tab — never a blank region.
- **Responsive**: criteria rows stack to single column on mobile; the narrative/objectives reflow; no horizontal overflow.
- **A11y**: every rating pill and the approved chip are icon + label (never color-only); the Approve control is keyboard operable with visible focus; ≥44px targets; the rubric is a readable, labeled structure (a list/table semantics, not a bare grid); axe critical = 0. Light/Dark/System via tokens.

## 9. `data-*` hooks (exact, no invention)

The tab itself is the `data-tabpanel="evaluation"` panel (owned by `student-profile-contract.md` §5/§15). Inside it: `data-demo-action` + `data-toast` (Approve demo), `data-disabled-reason`/`data-reason-key` (if gated), optional `data-confirm` (+ `-title|-msg|-cta|-toast|-danger`). The criteria rows, rating pills, narrative, and objectives are static markup with **no behavioral hook**. **No invented hooks; no JS-generated ids/classes; no filter/table machinery** (this tab is not filterable).

## 10. Reused / cross-references

Reuses the generic `chip`/pill, `states`, `ui`, and the toast/confirm/disabled-with-reason behaviors. New shared piece: `evaluation-rubric.js` + its evaluation-rating map. Binds to: `student-profile-contract.md` (the hosting Evaluation tab), `../../002-admin-core-operations/contracts/interaction-patterns-contract.md` (IP6/IP8/IP9/IP10), and `static-html-django-ready-contract.md` (SSG/Django rules). Distinct from `student-result-contract.md` (the Results tab — progress + certificates, not a rubric).

## 11. Django mapping & enforcement

- **Django**: the Evaluation panel → a static section / `{% if view == "evaluation" %}` inside `student.html`; `{% for c in student.evaluation.criteria %}` for the rows, each rating `ratingId` → an evaluation-rating template tag emitting the tone+icon+label pill; `achievementsKey`/`objectivesKey` → context strings; the `approved` chip → a status tag; Approve → the same `data-demo-action`/`data-disabled-reason` attributes server-side. Fixtures → view context. No whole-page `#app` mount; relative paths; zero external requests.
- **Enforcement**: the smoke harness (R31) asserts (via the `student.html#view=evaluation` frame) that the Evaluation panel is baked static HTML with the four labeled criterion rows each carrying a rating **pill that has both an icon and a text label** (never color-only, never a bare number), an achievements narrative + objectives, and an Approve control that is demo or disabled-with-reason (no dead control, IP8; no persistence), plus a calm empty state, **no raw i18n keys**, and **zero external requests**. Screenshot acceptance captures the Evaluation tab AR-RTL light (`__evaluation` variant via `#view=evaluation`).
