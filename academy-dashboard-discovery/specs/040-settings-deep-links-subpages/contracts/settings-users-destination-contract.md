# Contract — `settingsUsers` Destination (Spec 040, Decision 1)

## DECISION — **OPTION A**: `settingsUsers` → `settings.html#view=users` (the EXISTING Users tab, content unchanged)

| | |
|---|---|
| nav id | `settingsUsers` (`nav.config.js:115`) |
| status after | `implemented` |
| route (AR) | `settings.html#view=users` |
| resolves (EN) | `settings.en.html#view=users` (hash-aware `langRoute()`) |
| target | the existing `users` tab on the settings hub |
| content change | **none** — `settings.js` `usersPanel()` stays **0-diff** |
| new pages / nav items / fixtures | **0 / 0 / 0** |

---

## 1. Evidence

**E1 — There is no legacy `/management/settings/users` route.** The corpus holds 27 `management-settings-*`
captures; **zero** of them is a `users` page. The legacy RBAC grid lives at `/management/admins/permission/{6,7}` —
the **Admins/Staff** family, which is precisely what `staff.html` was built from (Spec 031).

**E2 — The legacy IA nevertheless nests users under Settings.** The legacy sidebar placed "Users & Staff" **last
inside the Settings group** (`legacy-management-content-coverage.md`, D9). Our nav mirrors this exactly:
`settingsUsers` is the 7th and last item of the `settings` category. **The IA placement is legacy-faithful; only the
destination was open.**

**E3 — Spec 031 already decided and shipped the split.** Research D16 +
`specs/031-…/contracts/staff-users-contract.md` (C-07, T028): *"`staff.html` is the ONE staff home; the settings
Users tab shows the compact RBAC preview + a real deep-link to `staff.html`; `settingsUsers` nav stays planned
(folded)."* The capability already exists and is already reachable. **Spec 040 merely un-folds the nav pointer** — it
originates nothing.

---

## 2. Why this is NOT duplication (the load-bearing argument)

The two surfaces are disjoint in code, data and function.

| | settings `users` tab (`pages/settings.js` `usersPanel()`, lines 116-123) | `staff.html` (`pages/staff.js`, 125 lines) |
|---|---|---|
| Directory rows | **0** | 5-row staff directory |
| Row kebab | **0** | `staffMenu` (View / Edit / Duplicate / Deactivate / Delete) |
| RBAC | **read-only 4-group preview** from `fixtures/settings.js:ROLES_PREVIEW` | the 10-group `permDrawer()` matrix (display-only; source comment: *"never a working permission engine"*) |
| Form drawers | **0** | 3 (`staff-add`, `staff-edit`, `staff-dup`) |
| Mutation controls | **0** | all gated (`backendRequired`) |
| Imports `fixtures/staff-management.js` | **no** | yes — sole consumer |
| Real link out | **yes** — `<a href="staff.html">` | — |

`usersPanel()` renders **only** a real `<a href="staff.html">` + `rolesSection()`. It has **0 forms, 0 drawers,
0 mutation controls, 0 fixtures of its own**, and does **not import** `fixtures/staff-management.js`. There is
**zero code overlap and zero data overlap**. The tab is a *pointer with a preview*; `staff.html` is the *home*.

**Permission ownership is unchanged.** No permission engine is created, extended or simulated by Spec 040. The Users
tab remains a display-only preview; `staff.html` remains the sole owner of the (non-functional) RBAC matrix.

---

## 3. Rejected alternatives

| Option | Verdict | Reason |
|---|---|---|
| **B** — point `settingsUsers` directly at `staff.html` | **REJECTED** | Orphans the purpose-built Users tab (it would then be reachable only via the hub's default-tab walk) and breaks the uniform **"resolve in place"** pattern established by Specs 037 (`reports.html#view=…`), 038 (`finance.html#view=…`) and 039 (`library.html#view=…`, `certificates.html#view=requests`). Every other nav flip in the roadmap lands on a tab of its own hub; `settingsUsers` must not be the one exception. |
| **C** — keep it as an honest `disabled` lock | **REJECTED** | Dishonest **by omission**. A lock claims a capability is missing. Here the target content **already exists and is already reachable**. Unlike `classSalaryReport` (which genuinely needs computed per-class pay from a backend), **no backend capability is missing** for the Users tab — it is a display-only preview plus a link, both shipped. |
| **D** — build a new `settings-users.html` page | **REJECTED** | Zero legacy evidence (E1) and it would recreate exactly the duplicate-staff-home defect (**B-16**) that Spec 031 closed. It would also break the count freeze (115 → 117, PAGES 57 → 58). |

---

## 4. Count & source impact

| Artifact | Impact |
|---|---|
| `src/js/nav.config.js:115` | gains `route:'settings.html#view=users'`, drops `status:'planned'` — the ONLY edit for this decision |
| `src/js/pages/settings.js` `usersPanel()` | **0-diff** |
| `src/js/fixtures/settings.js` (`ROLES_PREVIEW`) | **0-diff** |
| `src/js/pages/staff.js` | **0-diff** |
| `src/js/fixtures/staff-management.js` | **0-diff** |
| Locales `adm.set.users.*` | **0-diff** |
| Pages / bases / nav items / fixtures / hooks / keys | **0 / 0 / 0 / 0 / 0 / 0** |

---

## 5. Test impact

1. Anchor assert (AR + EN, every admin page):
   `settingsUsers` is an `<a>` whose `href` matches `/(^|\/)settings\.(en\.)?html#view=users$/`, with no
   `data-coming-soon`, no `aria-disabled`, no lock icon (reuses `anchorOk039`, defined at `smoke:1442`).
2. Fresh-context deep-link: seed `localStorage['academy.schedView.settings']` to a **different** tab, load
   `settings(.en).html#view=users` → exactly **one** visible `[role=tabpanel]` = `users`, **0** external requests.
3. Counted in the settings-planned **6 → 0** supersession (`smoke:1446`, `:2340`).
4. Source-level route assert in the post-`browser.close()` `nav.config` audit:
   `byId('settings','settingsUsers')` is `{status:'implemented', route:'settings.html#view=users'}`.
5. The Spec-031 users-tab honesty asserts (`smoke:1172-1176`) stay **byte-verbatim** — the tab body does not change.
