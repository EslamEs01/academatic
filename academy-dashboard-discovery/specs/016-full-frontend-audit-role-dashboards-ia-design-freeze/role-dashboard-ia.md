# Role Dashboard Information Architecture (Spec 016 — binding direction)

## 1. The reclassification (the product decision)

`student-portal.html` · `family-portal.html` · `teacher-portal.html` are hereby reclassified as **Role Dashboard Home / Overview pages** — the home page of each role's dashboard **app**. They are kept byte-for-byte as the starting point (filenames unchanged — link stability, guard history, hub targets). They are NOT the finished role experience: each role gets a mini-app of internal pages around its home.

**Why this is right** (evidence): the legacy role surfaces were sidebar-driven mini-apps — guardian app: Home · Schedule · Classes Summary · Courses · Billing · Student Feedback · Library (screenshot-verified) · teacher app: 22 route templates. A single scrolling page cannot carry that breadth at production depth; but as a HOME it is *better* than legacy's home (today-first, honest, warm). Keep the home, add the app.

## 2. The role shell v2 (one decision, three apps)

**Portal Shell v2** = the existing Spec-012 portal shell + role navigation. It remains a SECOND shell family — never the admin shell, no `.app-shell`/`.nav-rail`/`.nav-panel`, no six-category rail.

- **Role sidebar** (desktop ≥1024px): a single flat, warm nav list (icon + label, 7–9 items per role — no categories, no nesting; roles don't need the admin's two-level rail). Collapsible to icons. Role-accented active state (`--pt-accent`).
- **Role topbar**: the existing portal header evolves — brand + portal name · persona greeting · theme/lang controls · the demo role-switch link (until real auth: backendRequired). No notification count (honest — no engine), no search (until a spec delivers it honestly).
- **Mobile navigation**: the sidebar becomes an off-canvas drawer (existing drawer pattern reused) opened from a topbar burger; the current single-column content flow is preserved.
- **Data-driven**: one `role-nav.config.js`-style registry per role (id/labelKey/icon/href/status), same honest status vocabulary as the admin nav (`implemented`/`planned` — planned rendered as labeled non-links, never dead anchors). Built statically per page; active item baked.
- **Home pages keep their sections**; each section that gains an internal page gets ONE sanctioned "open the page" link (extending the Spec-015 exact-anchor discipline from `bodyAnchors === 1` to a per-page **sanctioned anchor registry** asserted by smoke — the inventory of allowed hrefs per portal page, machine-pinned like the teacher-performance link is today).
- **Hub unchanged**: `portals.html` stays the only entry; role apps interlink internally only within their own role + the hub switch.

## 3. Role navigation maps (frozen)

**Student app (sky accent)**: الرئيسية (student-portal.html) · جلساتي وجدولي (student-schedule.html) · واجباتي (student-homework.html) · موادي (student-materials.html) · تقدّمي وإنجازاتي (student-progress.html) · جلساتي السابقة (student-history.html) · حسابي (student-profile.html) — 7 items.

**Family app (violet/primary accent)**: الرئيسية (family-portal.html) · أبنائي (family-children.html) · الجلسات والجدول (family-schedule.html) · التقدّم والسجل (family-progress.html) · الاشتراكات والفواتير (family-billing.html — STATUS ONLY) · الطلبات والتقييم (family-requests.html) · المواد (family-materials.html) · حسابي (family-profile.html) — 8 items.

**Teacher app (teal accent)**: الرئيسية (teacher-portal.html) · جدولي وتوفّري (teacher-schedule.html) · طلابي والمتابعة (teacher-students.html) · نتائج الجلسات (teacher-outcomes.html) · المهام والمواد (teacher-tasks.html) · التقارير والطلبات (teacher-reports.html) · حسابي (teacher-profile.html) — 7 items. **No pay item can ever exist in this nav (machine-asserted).**

Page-count rationale: consolidated pairs (sessions+schedule, progress+achievements, tasks+materials, subscriptions+billing-status, requests+feedback, outcomes+history) keep each app tight (6–8 internal pages) instead of cloning legacy's duplicate route families. Full section-level splits: `role-dashboard-page-inventory.md`.

## 4. Home ↔ internal page contract

Each home section becomes a *summary slice* of exactly one internal page (or stays home-only): e.g., student home's homework section = top-3 cards + the link to `student-homework.html`; teacher home's follow-up board stays the daily answer while `teacher-students.html` carries the full roster + per-student follow-up detail. No content is deleted from the homes; deepening only. The 013/014/015 smoke branches keep guarding the homes; new per-page branches arrive with 018–020.

## 5. Separation rules (standing, extended)

Admin console ⇄ role apps: zero shared chrome, zero cross-links (hub only), zero role-app items in admin nav (`future-role` stays never-rendered), zero admin-only data in role apps. Role ⇄ role: no cross-role links. All existing byte-identity discipline continues: each future spec names its owned page family; everything else stays hash-identical.
