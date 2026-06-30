# Contract: Navigation Impact (Spec 007)

**Status**: Binding · Records the exact sidebar/topbar delta for Spec 007 — one nav promotion + two SSG page registrations. Extends the Spec 002 `../../002-admin-core-operations/contracts/navigation-ia-contract.md`; only the teachers-category delta is recorded here. References FR-004 / FR-009; data-model §12 / §13.

---

## 1. Promotion (NT1) — exactly one item

Spec 007 promotes **exactly one** planned nav item:

- **`teacherKpi`** : `planned` → `implemented`, gaining `route:'teacher-performance.html'` (its `FUTURE_ROUTES` filename is already `teacher-performance.html`).

Everything else in the `teachers` category stays as-is: `teachers` (already implemented, `teachers.html`), `addTeacher` (planned), `teacherCategories` (planned), `sessionsKpi` (planned), `monthlyPerf` (planned).

## 2. Page registration (nav item vs profile templates)

| Page | `base` | Nav item? | `activeId` | Reached via |
|---|---|---|---|---|
| Teacher Performance | `teacher-performance` | **Yes** (`teacherKpi`, promoted) | `teacherKpi` | sidebar link + dashboard chip |
| Teacher profile | `teacher` | **No** (profile template) | `teachers` | "View profile" links from `teachers.html` + `teacher-performance.html` rows |

`teacher.html` is a **registered SSG page** that is **NOT** added to `NAV_CATEGORIES` — exactly like `course.html`/`group.html`/`student.html`/`family.html`. Its `activeId:'teachers'` keeps the **Teachers** nav item active (violet pill + `aria-current="page"`) and opens the teachers category panel.

### 2c. NT1 promotion checklist (the build-time guard MUST stay green)

The nav guard throws if an `implemented` item lacks `route`, a non-implemented item **has** a `route`, or a `disabled` item lacks `reasonKey`. So promotion is a single atomic edit to the `teacherKpi` item:

1. remove `status: 'planned'` (status defaults to `'implemented'`);
2. add `route: 'teacher-performance.html'`;
3. keep `id:'teacherKpi'`, `labelKey:'nav.teacherKpi'`, `icon:'trending-up'`;
4. leave `sessionsKpi` / `monthlyPerf` / `addTeacher` / `teacherCategories` planned (no route);
5. add the two `build-html.mjs` PAGES entries (§3);
6. confirm `npm run build` prints the new page count with no guard throw.

## 3. Build-html PAGES entries

Add two entries to the `PAGES` array (import each `render`):

```js
{ base: 'teacher',             activeId: 'teachers',   titleKey: 'topbar.title.teacher',     crumbKey: 'topbar.crumb.teacher',     render: renderTeacher },
{ base: 'teacher-performance', activeId: 'teacherKpi', titleKey: 'topbar.title.teacherPerf', crumbKey: 'topbar.crumb.teacherPerf', render: renderTeacherPerformance },
```

Both emit AR (`<base>.html`) + EN (`<base>.en.html`) automatically. New topbar i18n keys:

| Key | AR | EN |
|---|---|---|
| `topbar.title.teacher` | تفاصيل المعلّم | Teacher details |
| `topbar.crumb.teacher` | المعلّمون · التفاصيل | Teachers · Details |
| `topbar.title.teacherPerf` | أداء المعلّمين | Teacher Performance |
| `topbar.crumb.teacherPerf` | المعلّمون · الأداء | Teachers · Performance |
| `nav.teacherKpi` (exists) | أداء المعلّمين | Teacher Performance |

## 4. Topbar apps-grid (NT-apps)

If the topbar apps-grid lists implemented destinations, it MAY gain a "Teacher Performance" entry → `teacher-performance.html`. No other topbar change. `teacher.html` does NOT appear in the apps-grid (it is a per-record profile template).

## 5. Build-time guard MUST stay green

`npm run build` MUST complete with the nav guard passing (no implemented-without-route, no planned-with-route). `teacherKpi` now has a route; the four still-planned items have none.

## 6. FUTURE_ROUTES state after promotion

| Item | Before | After |
|---|---|---|
| `teacherKpi` | planned · FUTURE_ROUTES `teacher-performance.html` | **implemented · route `teacher-performance.html`** |
| `teacherCategories` | planned · FUTURE_ROUTES `teacher-categories.html` | unchanged (planned) |
| `sessionsKpi` | planned · (no FUTURE_ROUTES) | unchanged (planned) |
| `monthlyPerf` | planned · (no FUTURE_ROUTES) | unchanged (planned) |
| `addTeacher` | planned | unchanged (planned) |

The `teacherKpi` `FUTURE_ROUTES` entry MAY be left in place (harmless) or removed now that the item carries a real `route`; either is acceptable as long as the guard passes.

## 7. What stays planned/unchanged

`addTeacher`, `teacherCategories`, `sessionsKpi`, `monthlyPerf` render as «قريبًا/Soon» buttons (no route, no navigation). No other category changes. No new top-level category. No portal entries.

## 8. No-dead-link rule

After Spec 007 every sidebar/topbar link either navigates to a baked `public/*.html` or is a labeled planned/disabled control. `teacher-performance.html` is now baked; `teacher.html` is baked (reached via profile links, not the nav). Zero dead links.

## 9. Enforcement

- **Smoke**: `teacher-performance` is in `PAGES` with `activeId:'teacherKpi'` and the sidebar renders it as a real `<a href="teacher-performance.html">`; `teacher` is in `PAGES` with `activeId:'teachers'` and is **not** a nav item; exactly one `is-active[aria-current]` per page; the four still-planned teacher items remain «Soon» buttons (no `href` to a page); no dead nav link; no portal markup.
- **Build**: the nav guard passes; both pages + `.en` variants emit.

## 10. Django mapping

`teacher-performance.html` → `templates/admin/teacher-performance.html` at a named route (e.g. `teachers/performance`); `teacher.html` → `templates/admin/teacher.html` at `teacher/<id>`. The nav config maps to the server-rendered sidebar with the same implemented/planned states.

## 11. Cross-references

Binds to `static-html-django-ready-contract.md` (SSG registration), `teacher-performance-contract.md` (the promoted page), `teacher-profile-contract.md` (the profile template), `dashboard-impact-contract.md` (the chip deep-link), and the Spec 002 `../../002-admin-core-operations/contracts/navigation-ia-contract.md` (the base IA). **MUST NOT** add a portal entry, a finance/payroll nav item, or a second teacher nav category.

**Acceptance (binding):**
1. **Given** the sidebar, **When** rendered, **Then** **Teacher Performance** is a real `<a href="teacher-performance.html">` in the teachers category and the four other planned teacher items stay «Soon».
2. **Given** `teacher.html`, **When** loaded, **Then** the **Teachers** nav item is active (`aria-current="page"`) and `teacher` is not itself a nav item.
3. **Given** `npm run build`, **When** run, **Then** the nav guard passes and both pages + `.en` variants are emitted with zero dead links.
