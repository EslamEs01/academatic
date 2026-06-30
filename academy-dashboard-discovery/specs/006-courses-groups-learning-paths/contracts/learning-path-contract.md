# Contract: Learning Path — display-only level ladder (fixture-only)

**Status**: Binding · The **Learning Path** tab/section inside `course.html` — a fixture-only, **display-only** level ladder (`foundation → l1 → l2 → l3 → advanced`) rendered as a labeled, ordered `.level-step` strip with per-level fixture student counts + a certificates hint + an optional `isCurrent` marker. Rendered by `learning-path.js` from data-model *LearningPath* (#13) / *LearningPathLevel* (#14). **No curriculum / unit / module / milestone engine, no real certificate engine, no computed academic analytics** — display only. Hosted by `course-profile-contract.md` (the Learning Path tab). Realizes R47, FR-008, US5, SC-002/SC-009.

## 1. Purpose & honest scope (no curriculum/progression engine — R47)

The reference academy has **NO** curriculum / level / unit / module / milestone engine: "Level" was a per-session note + an age-group filter, "Curriculum" was free text inside a meeting report, and certificates were **manually** requested/approved. There is no hierarchy, no unit tree, no progression automation.

- The honest representation is therefore a **calm orientation strip** — the academy's level ladder grounded in the `levels[]` already present in the course fixture — that tells the admin *where this course sits academically*, and nothing more.
- This section MUST read as a **display-only / fixture** view, **never** as a curriculum builder, a progression engine, or a live certificate system. No level is editable, no unit exists, no count is computed, no milestone is automated.
- It improves on the legacy's free-text "curriculum" field with one airy, labeled, AA-contrast, ordered ladder — original wording, never copied legacy copy.
- It is a **section/tab inside the course profile**, NOT its own page and NOT a nav item (R45/R47).

## 2. Data source (binding)

The section MUST render **only** from the course's learning-path fixture (data-model #13/#14) — no second source, no engine:

- `levels` — `LearningPathLevel[]`, each `{ id, labelKey, order, studentsCount, isCurrent? }` where `id ∈ { foundation, l1, l2, l3, advanced }`, reusing the **existing** level vocabulary (`data.crs.lvl.*` keys already in `fixtures/courses.js`).
- `certificatesHint` — `{ count, labelKey }`, a calm fixture hint reusing the **Spec 004 certificate fixture shape** (`{ titleKey, dateKey, statusId }` per `../../004-family-student-profiles/contracts/student-result-contract.md` §6) only as the underlying shape — surfaced here as a count + label, not a managed list.

All strings are i18n keys (`crs.*` overlay) resolved at build time; counts format per locale and are **never mirrored**.

## 3. Anatomy (RTL, top → bottom)

1. **Section header** — a calm heading (`crs.lp.title`, e.g. «المسار التعليمي» / "Learning Path") with the `graduation-cap` icon + a one-line **display-only** framing caption (`crs.lp.caption`, e.g. "the academy's level ladder — reference, not a curriculum editor").
2. **Level ladder** (§4–§5) — the ordered `.level-ladder` of `.level-step` items (`foundation → l1 → l2 → l3 → advanced`), each with icon + label + per-level count, in `order`.
3. **Certificates hint** (§6) — one calm line/badge (count + label), or its empty state.
4. **(No actions row)** — any "manage curriculum" affordance is disabled-with-reason or absent (§9).

The whole section is baked static HTML inside the Learning-Path `role="tabpanel"`; runtime JS renders nothing here.

## 4. Level ladder vocabulary (binding — never numeric/color-only)

- The ladder MUST render exactly the fixture `levels[]`, **in `order`**, as labeled `.level-step` items reusing the existing level vocabulary `foundation / l1 / l2 / l3 / advanced` (`data.crs.lvl.*`) — **NOT a new status lifecycle** (FR-018: levels are a ladder, not a status map; they MUST NOT reuse or imply the course/group/enrollment status maps).
- Each `.level-step` MUST carry **both** an icon **and** a text label — **never color-only and never a bare number/ordinal**. The step icon is `milestone` (the ladder-position marker); the section header uses `graduation-cap`. Tone is a calm accent only; meaning is carried by **icon + label**.
- The order/progression is conveyed by **position + a connector** (the `.level-ladder` strip) **and** the level label — never by color or a bare number alone. Steps reflow without losing order in RTL and LTR (logical properties; the strip mirrors, the numerals stay LTR).
- The ladder is **display-only**: not a slider, not a stepper widget, not editable, not clickable-to-edit; no library.

## 5. Per-level fixture counts (binding)

- Each `.level-step` MUST show its `studentsCount` as a labeled count (e.g. «١٢ طالبًا» / "12 students"), formatted per locale — a **fixture display number**, never a computed metric, never a recomputed/aggregated analytic.
- A level with `studentsCount === 0` shows a calm "0 / no students yet" label, not a blank or a broken state.
- Counts MUST NOT be summed, averaged, graphed, or turned into a progress percentage — that would imply a progression engine (forbidden, §8).

## 6. Certificates hint (binding — reuse, no engine)

- The certificates hint MUST render the fixture `certificatesHint` as **one calm line/badge** — a count + label (e.g. «٣ شهادات صادرة» / "3 certificates issued") — reusing the Spec 004 certificate fixture **shape** as the data source, surfaced here as an orientation hint, NOT a managed certificates table.
- **Empty state**: when the count is 0 (or absent), a calm "no certificates yet" line (warm, not a bare "No data") — distinct from a filter no-result.
- Any "view / download / request certificate" affordance, IF present, MUST be **demo-with-toast** (`data-demo-action` → toast) or **disabled-with-reason** (`data-disabled-reason` / `data-reason-key`, e.g. `crs.reason.export`) — **never** a real file/PDF/certificate backend, never a dead link. The hint MUST NOT imply a real certificate-issuance engine.

## 7. The `isCurrent` marker (optional, binding when present)

- At most one level MAY carry `isCurrent: true`; the ladder MUST mark it with a **labeled** "current level" affordance (icon + a "current" label/pill, e.g. `crs.lp.current`) — **never color-only**.
- The marker is **orientation only**: it does NOT imply the course progresses, advances, or computes anything; it is a fixture flag.
- If no level is `isCurrent`, the ladder renders without a current marker (no empty/placeholder marker slot).

## 8. MUST NOT (binding boundary)

The Learning Path section MUST NOT:
- build or imply a **curriculum / unit / module / lesson / milestone** engine, tree, or editor;
- offer an **edit-units / add-level / reorder / manage-curriculum** control that mutates anything;
- run a **progression / advancement** engine, a computed "% through the path", or any aggregated academic **analytic**;
- run a **real certificate** issuance / award / PDF engine, or persist a certificate;
- introduce a **new status lifecycle** for levels, or reuse the course/group/enrollment status maps as a level state;
- introduce a **new runtime hook**, a chart/progress library, or any JS-generated id/class;
- read as anything other than a **display-only, fixture, reference-grounded** strip.

## 9. Actions — absent or disabled-with-reason (binding)

- Any "manage curriculum" / "edit levels" / "add unit" affordance MUST be **absent** or **disabled-with-reason** (`data-disabled-reason` + `data-reason-key`, e.g. `crs.reason.curriculum` = "managing the curriculum needs the backend — out of scope") — never a real control, never a dead button (IP8/IP9).
- The section is otherwise **action-free**: the level steps and counts are static markup with **no behavioral hook**.

## 10. States, responsive, a11y

- **Empty**: a course with no learning-path fixture shows a single calm "no learning path yet" state for the whole section — never a blank region; per-section empties (no certificates) per §6.
- **Responsive**: the ladder reflows (horizontal strip on desktop → stacked/wrapped steps on mobile) without horizontal overflow; the certificates hint reflows beneath.
- **A11y**: every `.level-step` is icon + label + count (never color-only, never a bare number); the ladder is a readable, **ordered** structure (list/`<ol>` semantics, not a bare grid); any present action is keyboard operable with visible focus; ≥44px targets; axe critical = 0. Light/Dark/System via tokens.

## 11. `data-*` hooks (exact, no invention)

The section itself is the `data-tabpanel="learningPath"` panel (owned by `course-profile-contract.md`). Inside it: optionally `data-demo-action` + `data-toast` / `data-disabled-reason` + `data-reason-key` on a gated certificate/curriculum affordance only. The level steps, counts, and certificates hint are static markup with **no behavioral hook**. **No invented hooks; no JS-generated ids/classes; no filter/table machinery** (this section is not filterable).

## 12. Reused / cross-references

Reuses the generic `chip`/badge, `states`, `ui`, the existing level vocabulary (`data.crs.lvl.*`), the Spec 004 certificate fixture shape, and the toast/disabled-with-reason behaviors. New shared piece: `learning-path.js` + the `.level-ladder`/`.level-step` CSS (Spec 006 `@layer`, reusing existing tones — no new tone CSS). Binds to: `course-profile-contract.md` (the hosting Learning Path tab), `course-group-status-contract.md` (FR-018 — levels are a display ladder, NOT a status lifecycle), `course-group-actions-contract.md` (the disabled-with-reason curriculum/certificate affordance), `../../004-family-student-profiles/contracts/student-result-contract.md` (the certificate fixture shape), `../../002-admin-core-operations/contracts/interaction-patterns-contract.md` (IP8/IP9), `static-html-django-ready-contract.md`, and `scope-guard.md` (no engines, no curriculum/certificate engine).

## 13. Django mapping & enforcement

- **Django**: the Learning-Path panel → a static section / `{% if view == "learningPath" %}` inside `course.html`; `{% for level in course.learning_path %}` for the ordered ladder (each step's icon + `{{ level.label }}` + `{{ level.students_count }}`, the order baked, **never JS-computed**); the `isCurrent` marker → `{% if level.is_current %}`; the certificates hint → a context count + label; any gated affordance → the same `data-disabled-reason` / `data-demo-action` attributes server-side. Fixtures → view context. No whole-page `#app` mount; relative paths; zero external requests.
- **Enforcement**: the smoke harness (R55) asserts (via the `course.html#view=learningPath` frame) that the Learning-Path panel is baked static HTML with the ordered level ladder where **every `.level-step` has both an icon and a text label** (never color-only, never a bare number) in `foundation → l1 → l2 → l3 → advanced` order, a per-level fixture count, a certificates hint with a calm empty state, that any curriculum/certificate affordance is disabled-with-reason or absent (no dead control, IP8; no persistence), an explicit display-only framing caption, **no raw i18n keys**, and **zero external requests** (also proving no chart/progress library loads). Screenshot acceptance captures the Learning-Path tab AR-RTL light (the `__learningPath` variant via `#view=learningPath`, R56).

**Acceptance (binding):**
1. **Given** the Learning Path section, **When** rendered, **Then** the levels appear as labeled `.level-step` items (icon + text, never numeric/color-only), in order `foundation → l1 → l2 → l3 → advanced`, each with a fixture count. *(FR-008, US5 AS-1)*
2. **Given** the Learning Path section, **When** the admin looks for actions, **Then** any "manage curriculum" affordance is disabled-with-reason or absent — no real curriculum/certificate mutation is implied. *(FR-008, US5 AS-2)*
3. **Given** an `isCurrent` level, **When** present, **Then** it carries a labeled "current" marker (not color-only); when absent, no placeholder marker renders.
4. **Given** the certificates hint with zero certificates, **When** rendered, **Then** a calm "no certificates yet" line shows — never a broken/raw state.
