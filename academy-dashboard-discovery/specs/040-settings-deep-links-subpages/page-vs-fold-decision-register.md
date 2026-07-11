# Page vs Fold — Decision Register (Spec 040)

Every one of the six items was quantified against all four options before a recommendation was made. No page-count result was preselected.

## The options, per item

Legend — **A** new standalone page · **B** deep-link to an existing settings tab/fold · **C** reuse an existing dedicated page · **D** honest defer/lock.

### 1. `settingsGeneral`

| Opt | Route | Page base | AR out | EN out | Δcount | Nav status | Fixture | Locale | Test | Reason | Owner |
|---|---|---|---|---|---|---|---|---|---|---|---|
| A | `settings-general.html` | new | +1 | +1 | **+2** | implemented | new | new ns | new page rows | Matches legacy's separate page — but **duplicates the existing `general` tab**, splits Settings across two IA models, and breaks the 115 freeze for zero navigational gain | 040 |
| **B ✅** | `settings.html#view=general` | none | 0 | 0 | **0** | implemented | extend existing | extend `adm.set.gen.*` (4 unused keys already exist) | deep-link + field rows | The tab exists, is the baked default, and is already deep-linkable | 040 |
| C | — | — | — | — | — | — | — | — | — | No other page owns academy identity | — |
| D | — | — | — | — | — | disabled | — | — | — | Dishonest — the surface exists | — |

### 2. `settingsIntegrations`

| Opt | Δcount | Verdict |
|---|---|---|
| A `settings-integrations.html` | **+2** | Tempting (it is the biggest surface: 11 providers + 7 payment-method forms) — but it duplicates the existing `integrations` tab and orphans the other five domains' IA. Rejected. |
| **B ✅** `settings.html#view=integrations` | **0** | The tab exists. The catalog, the provider drawers and the payment-method drawers all fit the existing drawer primitive. **Recommended.** |
| C | — | No other page owns providers | 
| D | — | Dishonest — cards already ship |

### 3. `settingsCustomization`

**B ✅** `settings.html#view=customization`, Δ0. Theme/language must stay adjacent to their live effect; a separate page would fracture that. A/C/D rejected.

### 4. `settingsNotifications`

**B ✅** `settings.html#view=notifications`, Δ0. 47 controls fit an inline tab (row-based, not a grid). A rejected (+2, duplicate tab); C/D rejected.

### 5. `settingsSecurity`

**B ✅** `settings.html#view=security`, Δ0. A rejected (+2); C/D rejected.

### 6. `settingsUsers` — **the only genuinely contested item**

| Opt | Route | Δcount | Argument |
|---|---|---|---|
| **B ✅** | `settings.html#view=users` | **0** | Gives each of the six a **distinct destination**. Settings answers "who may do what" (roles/permissions); `staff.html` answers "who is on the team". The Users tab already carries a **real anchor** onward to `staff.html`, so the canonical directory is one click away and is never duplicated. **Recommended.** |
| C | `staff.html` | **0** | Spec 031 made `staff.html` "the ONE staff home, resolves settingsUsers dup", and Spec 033 explicitly left this open: *"settingsUsers → settings.html#view=users **or** staff.html"*. Precedent exists for two nav items sharing one route (`addTeacher`/`teacherCategories` → `teachers.html`; `staffSalaries`/`salaries` → `finance.html#view=salaries`). But it makes two menu items land on the same page, and strands the roles/permissions surface with no nav route of its own. |
| A | new page | +2 | Duplicates both surfaces. Rejected. |
| D | lock | 0 | Dishonest — the surface exists. Rejected. |

**Decision: B.** Recorded as **OQ-1** in `spec.md` with C as the documented alternative — the choice is reversible in one line of `nav.config.js` and changes no count.

### 7. Payment methods (not a nav item)

| Opt | Δ admin menu | Verdict |
|---|---|---|
| New nav item `settingsPayments` + page | **+1 menu (50 → 51)**, +2 pages | **REJECTED** — breaks the menu freeze for a surface legacy never navigated to directly (there is **no `/settings/payments` index page** in legacy at all). |
| **Fold into the Integrations tab ✅** | **0 / 0** | Faithful to the legacy structure (Configure → method table → Add Payment) and to the finding that payment methods are the *configuration objects* of the incoming-payment integrations. **Recommended.** |
| Defer to Spec 053 | 0 / 0 | Would leave 7 of 11 providers with no configuration surface. Rejected — the *structure* is safely renderable now; only the *connection* is not. |

## Recommended architecture (the smallest honest one)

> **Six deep-links into the existing six-tab Settings hub, plus in-place completion of the six forms. Zero new page bases. Zero count delta. Zero admin-menu delta. Payment methods fold into Integrations.**

It satisfies every stated goal: no duplicate pages or forms; clear, stable URLs (`settings.html#view=<domain>`); complete Settings forms; a coherent IA (one hub, six domains); full backend honesty; and Spec 033's ownership and count contract (which predicted exactly "0 count impact").

The **one** way it departs from Spec 033's prediction: 033 assumed the work was navigation-only. Field inspection shows the six tabs render **2 form fields in total**, so Spec 040 must also complete them. That is a *scope* correction inside the same *architecture*, and it changes no count.

## Ledger

| Metric | Current | Target |
|---|---|---|
| Public HTML | 115 | **115** |
| New page bases | — | **0** |
| Admin menu items | 50 | **50** |
| Settings items | 7 | **7** |
| Settings planned | 6 | **0** |
| Sitewide planned | 6 | **0** |
| `FUTURE_ROUTES` entries | 0 | **0** |
| Build-registry (PAGES) change | — | **none** |
| Locked items remaining | 1 — `classSalaryReport` | **1 — `classSalaryReport` (unchanged)** |
| Nav-source edits | — | **`src/js/nav.config.js` only** (6 routes added, 6 `status:'planned'` removed) |
