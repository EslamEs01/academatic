# Contract: Groups Directory Page

**Status**: Binding · `public/groups.html` (+ `.en`). The groups (cohort/class) directory — page header + optional summary tiles + a persistent filter bar + an airy **`.group-row` list/card hybrid** + states. Promotes the planned `groups` nav item to implemented. Active nav: `groups` (families category). Realizes FR-009/FR-010/FR-011, R45/R46/R48/R50/R58, US2/US11/US12.

## 1. Purpose & reuse

- Give the admin one calm directory of every class/cohort the academy runs — each group shown as a list-card hybrid with its course, teacher, level, schedule summary, roster count, labeled status, and attention hint; filterable by course, teacher, level, day, status, and attention; each row links to its profile (`group.html`). It MUST read as the same product as Specs 001–005 (warm canvas, violet `--g-violet`, `--r-card`, Tajawal) and MUST NOT read as a generic class spreadsheet or a group-management engine.
- It MUST compose **existing** components — `pageHeader` + `summaryCards` (optional tiles), `filterBar` (IP2), `chip`, `states` (`emptyBox`/`noResults`/`loadingSkeleton`/`errorState`), `attentionFlag`, `avatar`/`medallion`, `ui` (button) — plus the **NEW** `group-row.js` (the hero) and the **NEW** `group-status.js` labeled map (R46). NO new runtime engine; behavior is `enhance.js` over baked markup via `data-*` hooks only.
- The `data-filter-set` hook (added by Spec 005 / R38) is **reused here unchanged** for the optional summary tiles — no new hook is introduced by Spec 006.

## 2. Label & navigation (FR-009 — promotion)

- This page **promotes** the `groups` nav item `planned → implemented`:
  - set `status:'implemented'`, add `route:'groups.html'`, add that route to `FUTURE_ROUTES` at promotion (the same pattern as `attendance` in Spec 005), drop the «قريبًا/Soon» affordance.
  - Register the SSG `PAGES` entry `{ base:'groups', activeId:'groups', titleKey:'grp.title', crumbKey:'grp.crumb', render: renderGroups }` (ar + en).
- The `groups` nav item MUST be a real `<a href="groups.html">` carrying the active violet pill + `aria-current="page"` when on `groups.html`; its parent category panel opens on load via `categoryOf('groups')`. The shell invariant holds: exactly one visible `.cat-panel`, one `is-active[aria-current]`, six category tabs.
- `familyCategories` and the rest of the `families` category (and all other planned items in every category) MUST **stay `planned`** (Soon buttons, no route). The build-time guard (NI6) MUST pass; **no dead links**.
- Wording (one each, no RTL-reversed text):
  - Page **title** + header heading: «المجموعات» / "Groups".
  - **Nav label** + breadcrumb leaf: «المجموعات» / "Groups".

## 3. Layout (RTL, top → bottom)

1. **Page header** — heading «المجموعات» + breadcrumb (`الرئيسية · المجموعات`) + subtitle + an **"+ add group"** CTA (§9, demo).
2. **Summary tiles** (§4, optional — R58) — at most three calm tiles that double as filters via `data-filter-set`.
3. **Filter bar** (§5) — `filterBar` with facets course / teacher / level / day / status / attention + apply/reset + active-filter feedback + result count.
4. **Groups list/card hybrid** (§6) — the airy `.group-row` list (id `groups-list`) over the `GROUPS` fixture (≥6 rows), each baked at build time + carrying facet attrs.
5. **States region** (§8) — empty / no-results / loading / error.

Single calm column; the shell (rail + topbar) is unchanged. Reflows per §7.

## 4. Summary tiles (optional — R58 — reuse `data-filter-set`)

- An optional row of at most **three** calm tiles, each icon + label + a tabular count derived from `GROUP_SUMMARY` (display-only, NOT a stat wall, NOT finance):
  - **نشطة / Active** → `data-filter-set="status:active"`
  - **تجريبية / Trial** → `data-filter-set="status:trial"`
  - **تحتاج انتباه / Needs attention** → `data-filter-set="attention:1"`
- Each tile MUST be a real `<button type="button" class="summary-tile" data-filter-set="<facet>:<value>" data-target="#groups-list">`. Clicking a tile MUST set the matching `<select data-filter>` in the filter form and re-run the existing `applyFilter` — a **clickable tile = a filter shortcut**, never a dead control, never a navigation, never a route-per-status wall.
- Tile tone/icon MUST resolve through the **same** `group-status.js` map (§10) for status tiles and the `attentionFlag` pattern for the attention tile so tones never drift; the label always accompanies the tone+icon (never color-only).
- Tiles are optional polish (R58) — the page MUST work without them; they MUST NOT replace the filter bar.

## 5. Filter bar (client-side over pre-rendered rows)

- Reuses `filterBar` / IP2: a **search** input + selects for **course**, **teacher**, **level**, **day**, **status**, and **attention** (the fixture-backed facets) + **apply** + **reset**, surfacing **active-filter feedback** + a **result count** (`data-filter-count`, the `filter.count` copy "X of N").
- Facet options are derived from the `GROUPS` fixture at build time: course options from `COURSES` (each group's `courseId`), teacher options from `TEACHERS` (each group's `teacherId`), level options from the level vocabulary (`foundation/l1/l2/l3/advanced`), day options from `SCHEDULE_WEEK` (the group's schedule-block days), status options from `GROUP_STATUS_ORDER`, attention as a binary (`all` / `grp.fAttentionYes`).
- On apply/input/change, `enhance.js` MUST show/hide the **pre-rendered** `.group-row`s by their `data-course`/`data-teacher`/`data-level`/`data-day`/`data-status`/`data-attention`/`data-search` facets, update the count, and surface the **no-results** state with a reset when nothing matches (§8).
- A multi-day group carries its days space-separated in `data-day` (e.g. `"sun tue"`); the day filter matches when the selected day value is found in the space-separated list.
- Filters MUST give visible feedback always — **never dead** (a dead filter is a screenshot failure condition); **no hidden/collapsed filters** (improving the legacy collapsed-filter weakness).
- The **summary tiles** (§4) set the `status`/`attention` facet via `data-filter-set` over this **same** form — one filter engine, no second mechanism, no URL-per-status.
- Degrades gracefully: with JS off, all rows render and the controls are inert (all visible).

## 6. Group row anatomy (`group-row.js`, the hero — exact)

Each row is one `.group-row` (a flex list row that reflows to a card on mobile) carrying `data-row` + its facet attrs, composed inline-start → inline-end:

- **Row container** — `data-row` + `data-course="<courseId>"` + `data-teacher="<teacherId>"` + `data-level="<levelKey>"` + `data-day="<space-separated day ids>"` + `data-status="<statusId>"` + `data-search="<name+course+teacher tokens>"` + (when `needsAttention`) `data-attention`. Ids/classes are build-baked, never JS-generated.
- **Group identity** — a `medallion` in the group `accent` + the group **name** (`nameKey`, the primary heading) + a **course chip-link** (a real `<a href="course.html">` link-chip bearing the course subject/title, icon + label) — the course link is always a real `<a href>`, never dead.
- **Teacher** — a `ui` avatar in the teacher `accent` + the teacher `nameKey` label (subdued; a teachers-directory link is optional, never dead if present).
- **Level** — a calm labeled level chip (reusing the level vocabulary: `foundation / l1 / l2 / l3 / advanced`, icon + label, never color-only).
- **Schedule summary** — the group's `scheduleSummary.daysKey · scheduleSummary.time` as calm secondary text (e.g. «الأحد، الثلاثاء · 4:00 م» / "Sun, Tue · 4:00 PM"); display-only, times rendered as tabular numerals, never mirrored in RTL.
- **Students count** — a calm `"enrolledCount / capacity"` pair (e.g. "8 / 10"), icon (`users`) + tabular numerals — display-only, never a progress bar.
- **Group-status chip** — the **labeled group-status chip** from the `group-status.js` map (§10): icon + label, **never numeric or color-only**. This is the row's primary status signal.
- **Attention flag** — when `needsAttention` is set, a calm `attentionFlag` (icon + label, `data-attention`, amber `alert-triangle`) — never color-only.
- **Row end / kebab** — a kebab `<button data-row-menu="<id>">` opening a popover: **view profile** (real `<a href="group.html">`) / **edit** (`data-demo-action` → toast) / **add students** (`data-demo-action` → toast, OR `data-disabled-reason` + `data-reason-key="grp.reason.full"` when `statusId==='full'`) / **archive** (`data-confirm` danger + `data-confirm-title|msg|cta|toast|danger` → demo toast). The **"view profile"** affordance MUST also be reachable as a direct `<a href="group.html">` on the row body — not only through the kebab.

Long Arabic/English group, course, and teacher names MUST truncate/wrap gracefully in AR-RTL and EN-LTR.

## 7. Responsive

- Desktop/tablet show the airy multi-field `.group-row` list; below the row breakpoint each row MUST reflow to a **single-column card** (CSS source-order, the Spec 003/005 reflow pattern) with **no horizontal overflow**.
- Summary tiles wrap; the group-status chip, course chip-link, students count, attention flag, and kebab stay reachable and legible on all viewport widths.
- No generic class spreadsheet at any viewport; no horizontal scroll; no off-canvas content. The level chip and schedule summary gracefully collapse when space is tight (they are secondary, not identity fields).

## 8. States

Using the Spec 001 `states` patterns, the page MUST distinguish:

- **empty** "no groups yet" — a warm empty state + the demo "+ add group" CTA (NOT a filter no-result).
- filter **no-results** "no match" — `data-no-results` + a reset action.
- **loading** — a skeleton of row placeholders (`loadingSkeleton`).
- **error** — a friendly `errorState` + retry.

The empty vs no-results distinction is mandatory (an edge case in the spec).

## 9. Actions & no-dead-button (IP8/IP9)

- **"+ add group"** (page header CTA) — `data-demo-action` → demo toast. No persistence.
- **"view profile"** (row body + kebab) — a real `<a href="group.html">` (language-aware `group.en.html`). This is the **only** real navigation off a row.
- **Kebab `data-row-menu`** — view profile (navigates) / edit (`data-demo-action` → toast) / add students (`data-demo-action` → toast, OR `data-disabled-reason`/`data-reason-key="grp.reason.full"` when group is `full`) / archive (`data-confirm` danger → demo toast on confirm). No item writes state; **no persistence**.
- Every control satisfies IP8: navigate in-scope / open overlay / apply-or-reset filter / set-filter / demo-with-toast / confirm→demo / disabled-with-reason. No raw i18n keys; status & attention never color-only; zero external requests.

## 10. Group status map (`group-status.js`, R46 — cross-reference)

The row status chip resolves through the **new** `GROUP_STATUS` map (`group-status.js`, data-model §8) — distinct from the session-status, family-lifecycle, enrollment-status, and outcome-status maps:

| `statusId` | tone (token) | icon | meaning |
|---|---|---|---|
| `active` | `completed` (green) | `check-circle` | active cohort |
| `trial` | `upcoming` (sky) | `sparkles` | trial / forming cohort |
| `full` | `neutral` | `users` | at capacity |
| `paused` | `amber` | `pause-circle` | temporarily paused |
| `completed` | `neutral` | `flag` | completed cohort |

Plus a separate **`needsAttention` flag** (the existing `attentionFlag` component, amber `alert-triangle`, never a status value). Each entry is `{ tone, icon, labelKey }`; AA contrast required; the label always accompanies the tone+icon. This map is the single source of truth for the group-status chip across the directory and group profile.

## 11. `data-*` hooks (exact — reuse + the already-added `data-filter-set`)

- Filtering: `data-filter-form`, `data-filter="course|teacher|level|day|status|attention|search"`, `data-target="#groups-list"`, `data-filter-apply|reset|count`, `data-no-results`.
- Tiles (§4): `data-filter-set="status:<id>"` / `data-filter-set="attention:1"` (the Spec 005 hook, reused unchanged; no new hook).
- Rows: `data-row` + `data-course|data-teacher|data-level|data-day|data-status|data-search` (+ `data-attention` when `needsAttention`).
- Kebab: `data-row-menu="<id>"` → popover with demo / confirm / disabled / nav items.
- Actions: `data-demo-action`, `data-confirm` (+ `data-confirm-title|msg|cta|toast|danger`), `data-disabled-reason`/`data-reason-key`, `data-toast`.
- "view profile" and course chip-links are real `<a href>` (NOT hooks). **No JS-generated ids/classes; no invented hooks.**

## 12. Static-HTML-first & Django mapping

- `groups.html` MUST be a **complete pre-rendered** static file in `public/` — full shell + header + optional tiles + filter bar + **every** `.group-row` (name, course chip, teacher, level, schedule summary, students count, status chip, attention flag, kebab) as real baked markup; **no whole-page `<div id="app">`**, no JS-built page DOM. Relative `./assets/` paths; per-language pages (`groups.html` ar/rtl default + `groups.en.html` en/ltr); `.nojekyll`; **zero external/CDN requests**; no chart/table/form/calendar library.
- Django mapping:
  - list → `{% for group in groups %}` (resolving `group.course`, `group.teacher`, `group.enrolled_count`, `group.capacity`);
  - optional tiles → context counts (`GROUP_SUMMARY`) keeping the `data-filter-set` attrs server-side;
  - the group-status chip → the `group_status_chip` template tag/filter;
  - course chip-link → `{% url 'course_detail' group.course.id %}`;
  - group profile link → `{% url 'group_detail' group.id %}`;
  - states → `{% if %}`.

## 13. Fixture binding (`GROUPS`)

- All displayed rows MUST come from the new `fixtures/groups.js` → `GROUPS` (≥6 rows spanning every `groupStatus` + at least one `needsAttention` example + at least one `full` group).
- Each row resolves at build time: `courseId` → `COURSES` (title/subject for the chip-link), `teacherId` → `TEACHERS` (name/accent), `studentIds` → `STUDENTS` (count for `enrolledCount`), `scheduleBlockIds` → `SCHEDULE_WEEK` (days/time for `scheduleSummary`).
- `GROUP_SUMMARY` (`{ total, active, trial, full, paused, completed, needsAttention }`) provides the optional tile counts — derived from `GROUPS`, no fabricated metric.
- `STUDENT_GROUPS` (Spec 004 seed: `grp1/grp2/grp3`) MUST be superseded or aliased by `GROUPS` so student-profile group chips resolve to real `group.html` entities (R50); the `grp1/grp2/grp3` ids MUST exist in the new `GROUPS` fixture.

## 14. Edge cases (binding)

- **Empty vs no-results** — "no groups yet" (warm empty + add-group demo CTA) is distinct from the filter "no match" (`data-no-results` + reset).
- **`full` group** — labeled "ممتلئة/Full" (icon+text, never color-only); the kebab "add students" item is `data-disabled-reason` + `data-reason-key="grp.reason.full"` — never a real capacity mutation.
- **`trial` group** — labeled "تجريبية/Trial" (sparkles icon + text), distinct from `active`, never distinguished by color alone.
- **Multi-day groups** — `data-day` carries days space-separated; the day filter select checks for the selected value within the space-separated string; a group with `"sun tue"` matches both "sun" and "tue" filters independently.
- **Filtering to empty** — `data-no-results` state + reset appears; the empty-data state does NOT.
- **Long AR/EN names** — group names, course titles, and teacher names truncate/wrap gracefully in both directions; no content clipped without a truncation indicator.
- **A group whose teacher has left the academy** — teacher name still resolves via fixture; any "change teacher" action is `data-disabled-reason`; no dead teacher link.

## 15. Enforcement & cross-references

- **Smoke** (`tests/smoke/run.cjs`): `groups` is in `PAGES`; every `.group-row` has a **labeled group-status chip** (icon + label text, never bare color); the promoted `groups` nav item is a real `<a>` with `route:'groups.html'` while `familyCategories` + the rest stay «قريبًا/Soon»; the filter form targets `#groups-list` with every declared facet; a filter selection narrows rows + updates the count; the no-results state is present; course chip-links are real `<a href="course.html">`; the row "view profile" affordance is a real `<a href="group.html">`; optional tiles (if rendered) are `[data-filter-set]` buttons (not dead); no `id="app"`; relative assets; no dead controls; no portals in DOM. The `no-external-request` check proves no table/chart/form/calendar lib loads.
- **axe**: critical violations = **0**; all interactive controls keyboard-operable with visible focus; group-status chip and attention flag always carry visible text labels.
- **Screenshots** (`tests/screenshots/capture.cjs`): Groups **AR-RTL light desktop**, **AR-RTL dark desktop**, **EN-LTR light desktop**, and **mobile** Groups AR-RTL light — verdicts appended to `app/screenshots/REVIEW.md`.
- Binds to `group-profile-contract.md` (the "view profile" target), `course-group-actions-contract.md` (full demo action set), the Spec 002 `navigation-ia-contract.md` (NI12 promotion pattern), `interaction-patterns-contract.md` (IP2/IP8/IP9), `static-html-django-ready-contract.md`, `screenshot-acceptance.md`, and `scope-guard.md`.
