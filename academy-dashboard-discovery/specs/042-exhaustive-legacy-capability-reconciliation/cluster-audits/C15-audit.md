# C15 — Authentication / Public / Shared Shell · Capability Audit (Spec 042)

**Method (honest counts)**: **7 screenshots opened AS IMAGES** with the Read tool (all 7 current-app — this
cluster has ZERO legacy page records, see §1) and **10 raw records** read field-by-field
(`auth-state-admin.json` · `auth-state-teacher.json` · `auth-state-family.json` · `roles.config.json` ·
the C15 path list · 5 built `public/*.html` files read raw: `index.html`, `teacher-portal.html`,
`family-portal.html`, `student-portal.html`, `dashboard.html`). The current implementation was read at source
(**19 files** under `app/src/js/` + `app/scripts/` + `app/src/locales/` — full list in §2). Where a prior-spec
claim and a raw record disagreed, **the record won** (two such conflicts, §5).

**Page assignment (dimension 1)**: the cluster's legacy page count is **0** — every one of the 0 pages is
trivially assigned; nothing is unassigned. `management-public-advertisement` / `management-public-holiday`
carry "public" in their slugs but are authenticated admin management pages module-tagged to other clusters —
they are NOT public-site pages and are noted here only to prove they were checked and excluded.
The `gallery.html` / `gallery.en.html` orphan pair is **owned by C14** and referenced here only as the frozen
orphan set (Spec 041 D-2: exactly `{gallery.html, gallery.en.html}`, confirmed present in `app/public/`).

---

## 1. What the legacy actually is (proved from the auth corpus — no page pixels exist)

**The central finding of this cluster is an absence.** The crawler ran fully authenticated (login was performed
by `save-auth.js` outside the capture loop), so **no login, register, password-reset, logout or public marketing
page was ever captured** — 0 screenshots, 0 page JSON, 0 text extracts. The legacy login/register/public UI
(layout, fields, validation, error states, branding) is therefore **UNKNOWN_EVIDENCE by construction** and must
never be invented. What CAN be proved comes from three raw `auth-state-*.json` files at the
`academy-dashboard-discovery/` root plus `roles.config.json`:

| Fact | Raw evidence |
|---|---|
| ONE shared login URL for all three roles: `https://academatic.online/login` | `roles.config.json → roles[*].loginUrl` (identical ×3) |
| **Exactly three real logins — admin, teacher, family — and NO student login** | the three auth-state files exist; `roles.config.json` lists exactly 3 roles (`student` only under `supportedFutureRoles`) |
| Laravel guard names: admin = `remember_web_59ba36…`, teacher = `remember_teacher_59ba36…`, **family = `remember_student_59ba36…`** | `auth-state-{admin,teacher,family}.json → cookies[].name` |
| The FAMILY/guardian account logs into a guard literally named **"student"** — the legacy `/student/*` area IS the family login (Spec 021's role-model proof, re-confirmed from raw cookies) | `auth-state-family.json → remember_student_*` |
| Legacy login is protected by **Google reCAPTCHA** | `_GRECAPTCHA` cookie (domain `www.google.com`, path `/recaptcha`) + `_grecaptcha` localStorage key in ALL three states |
| Legacy runs a **Pusher websocket transport** (real-time infra) | `pusherTransportTLS` localStorage key in the admin origin state |
| Long-lived remember-me cookies (~1 year, httpOnly, Secure) + a session cookie `academatic_session` that is **httpOnly but NOT Secure** (`secure: false`) | `auth-state-*.json → cookies[]` (expires/httpOnly/secure fields read per cookie) |
| Iconify icon-CDN cache keys (`iconify0…30`) — the legacy shell loads icons from a CDN at runtime | localStorage keys in all three origin states |

**Privacy/security note about the corpus itself (dimension 11)**: the three `auth-state-*.json` files contain
**live 486-char remember-me token values and session cookies for the production tenant**, with expiries reaching
into 2027. They are credentials, not documentation — they must be treated as secrets (rotated/expunged before any
repo sharing). Recorded as C15-19, owner 043. No token value is reproduced in this audit.

## 2. What we ship today (control-level, from source)

Source files read (19): `components/sidebar.js`, `components/topbar.js`, `components/portal-shell.js`,
`components/shell-markup.js`, `components/tabs.js`, `components/dropdown.js`, `components/toast.js`,
`theme.js`, `i18n.js`, `enhance.js` (all 662 lines), `nav.config.js`, `pages/portals.js`,
`pages/teacher-portal.js`, `pages/family-portal.js`, `pages/student-portal.js`, `fixtures/portal.js`,
`scripts/build-html.mjs`, `locales/ar.js`+`en.js` (menu block), `locales/ar.prt.js` (shell block).

* **Entry**: `public/index.html` is a **4-line meta-refresh redirect to `dashboard.html`** (the ADMIN console) —
  written verbatim by `build-html.mjs:214-217`. It is ar/RTL-only, carries a literal `<title>…</title>` (an
  ellipsis), no theme snippet, no `.en` handling. **The portals hub is `portals.html`**, not index (see §5
  conflict 1). Verified from the raw built file.
* **The hub** (`pages/portals.js`, pixel-verified `portals__ar__light__desktop.png`): identity hero + **2 primary
  role cards** (family → persona `fam1` أبو سلمان الغامدي · teacher → persona سارة القحطاني), an **admin console
  band** (btn → `dashboard.html`), the **demoted child-view preview card** (Spec 021 DEC-004 — "عرض الابن —
  معاينة", framed inside the family journey, never a fourth role), and the honest demo note «معاينة تجريبية
  بالبيانات الثابتة — بدون تسجيل دخول أو حفظ». No login form, no fake auth — honest framing by construction.
* **Admin shell** (`shell-markup.js` + `sidebar.js` + `topbar.js`): `#shell[data-rail]` = slim 6-category icon
  rail (roving tabindex, `role=tablist`, ArrowUp/Down/Home/End in `enhance.js:218-235`) + one expanded panel per
  category (only the active one visible). Nav items are **status-aware**: implemented = `<a href>` (+
  `aria-current="page"`), planned = `<button data-coming-soon>` (**0 remain sitewide in nav**), disabled =
  `<button data-disabled-reason aria-disabled>` (**exactly 1: `classSalaryReport`**, `nav.config.js`). Topbar =
  breadcrumb/title · ⌘K search popover · apps grid · quick actions · notifications · theme · language · profile
  chip — every trigger `aria-haspopup` + `aria-label`.
* **D-3 language-switch fragment preservation, verified at BOTH sources**: `sidebar.js:18-27 langRoute()` splits
  route at `#`, maps `file.html → file.en.html`, reattaches the hash; `enhance.js:246-250 langUrl()` appends
  `location.hash` (the Spec 041 W-1 one-expression fix). `finance.html#view=banks` → `finance.en.html#view=banks`
  from both the sidebar AND the topbar. `location.search` deliberately not preserved (documented in the comment).
* **Deep-link seeding** (`enhance.js:271-282 initTabs`): precedence is **URL hash → stored
  `academy.schedView.<group>` → baked default** — the hash beats localStorage (the exact property Spec 041 seeded
  all 24 deep-links ×2 languages to pin). `selectTab` persists + `history.replaceState('#view=…')`; the wizard
  `#step=` is transient (never persisted); `#child=` is pure-CSS `:target` (no JS at all).
* **The ONLY real writes**: theme (`theme.js` — light/dark/system, `academy.theme`, early inline
  `THEME_SNIPPET` in every page head prevents flash, live `matchMedia` listener keeps "system" current) and
  language (`i18n.js` — `academy.lang`, `<html lang/dir>`, Arabic-Indic vs Latin numerals via
  `Intl.NumberFormat`, digits never mirrored). Remaining storage keys are UI state only: `academy.rail`,
  `academy.navCategory`, `academy.schedView.<group>`. The closed `data-*` hook set is the single delegated click
  listener (`enhance.js:557-662`).
* **Portal shell** (`portal-shell.js`): role topbar (brand + portal name + greet + role chip + notifications gate
  [B-03, hub excluded] + theme/lang + «تبديل الدور» hub exit) · desktop `aside.pt-sidenav` (identity block +
  ROLE_NAV items + hub entry) · **native mobile `<details class="pt-nav-drawer">`** (zero-JS disclosure — pushes
  content, verified in `teacher-portal__ar__light__mobile__drawer-open.png`). All nav renders OUTSIDE
  `#page-body`. Planned registry entries render as labeled non-anchor buttons (none remain for teacher/family/
  student nav — all `implemented` in `fixtures/portal.js`).
* **No-dead-end guarantees**: `openSheet()` falls back to an honest `acknowledge()` toast when a template is
  missing; the catch-all toasts any unwired button; profile-menu **logout is honest** — a `data-confirm` whose
  post-confirm toast says «سيتوفّر تسجيل الخروج بعد ربط الخادم» / "Signing out will be available once the server
  is connected" (`locales/ar.js:52`/`en.js:52`) — **no fake session end**; Account/Help are `data-action="noop"`
  → the same honest backendRequired copy.
* **A11y (dimension on shell)**: skip link `<a href="#page" class="sr-only">` baked into every page
  (`build-html.mjs:188`, confirmed in raw `dashboard.html`); focus-trapped `role=dialog aria-modal` panels with
  Esc + focus return (`enhance.js:397-428`); the mobile admin drawer **clones the sidebar and strips
  ids/aria-controls/aria-labelledby** to avoid duplicate-id/aria-dangle (`enhance.js:434-437`); toasts are
  `aria-live=polite role=status` (`toast.js`); popovers are direction-aware RTL/LTR (`dropdown.js:29-38`).
  Spec 041 R-2/R-3 made a11y `critical+serious` and console-error capture **machine gates** (baseline 0/0, 0).
* **Empty/loading/error states (dimension 10)**: the shell itself never dead-ends (fallback toasts); the admin
  home ships a dedicated "حالات الواجهة / Interface states" band — skeleton · couldn't-load-with-retry ·
  no-sessions-yet empty state — pixel-verified in BOTH `dashboard__ar__light__desktop.png` and
  `dashboard__en__light__desktop.png`.
* **Cross-role propagation (dimension 13)**: none exists and none is faked — the shell is static; theme/language
  persist per-browser via the two localStorage keys and apply uniformly across admin + portals; role switching
  through the hub is an unauthenticated demo device and is labeled as exactly that.

## 3. The honest gaps

1. **There is no authentication at all — and role isolation is presentational only.** Any visitor can open any
   admin page or any portal directly by URL; the hub personas are fixtures. This is the DESIGNED demo state
   («بدون تسجيل دخول» is stated on the hub), but the standing law "hiding a link is NOT authorization" means the
   real login (3 roles, shared `/login`, remember-me, session lifecycle), session management, per-role route
   enforcement and anti-poaching isolation are all **unbuilt backend work** → FUTURE_BACKEND, owner **043**
   (C15-02, C15-18). Bot protection (legacy used reCAPTCHA — proven, §1) rides with it (C15-03).
2. **The legacy login/register/public-page UI is unknowable from this corpus** — a capture of `/login` (logged
   out), any register/forgot-password flow, and any public marketing page does not exist. 043 must either
   re-crawl unauthenticated or design fresh; nothing may be "restored" from imagination (C15-01).
3. **Teacher-home quick-tiles are stale — the cluster's biggest current-app defect.**
   `pages/teacher-portal.js:33-35 quickTiles()` **ignores `e.status`** and bakes ALL 7 non-home teacher nav
   entries as `<div class="pt-qtile is-planned">…«قريبًا»</div>`, while `fixtures/portal.js:159-168` marks all 7
   `implemented` and the SAME page's sidenav renders them as real links. Raw proof: `public/teacher-portal.html`
   carries **7 `pt-qtile is-planned` + 7 «قريبًا» chips**; `family-portal.js:42-44` / `student-portal.js:39-41`
   check `e.status === 'implemented'` and render real `<a>` tiles (raw family/student HTML: 0 planned tiles).
   Pixel-confirmed in `teacher-portal__ar__light__mobile__drawer-open.png` (quick-links band shows «قريبًا» on
   جدولي/طلابي/نتائج الحصص/المهام/التقارير/مكتبتي/ملفي). The Spec-040 "0 planned / 0 coming-soon" census is not
   contradicted in its own terms — it counted `.nav-item.is-planned` and `[data-coming-soon]`, and these tiles
   are neither — but the USER-VISIBLE claim "the last «قريبًا» claims in the product are gone" is false on this
   surface. → PARTIAL, owner **045-050** (bounded page review; the fix is the same quick-tiles honesty pass
   Specs 019/020 already applied to student/family homes). (C15-14)
4. **The admin mobile drawer clone renders clipped.** `dashboard__ar__light__mobile__drawer.png` shows the cloned
   sidebar cut at the drawer's right edge — the brand medallion and nav-item icons are truncated and the rail
   column is off-canvas («لوحة التحكم» renders as «التحكم»). Functionality (links, category panels) works; the
   presentation of the clone inside the 780px drawer needs the 044 drawer-system pass. → owner **044** (C15-15).
5. **Popover menus don't implement the ARIA menu keyboard pattern.** `dropdown.js` sets `role="menu"`, focuses
   the first item, closes on Esc/outside-click — but there is no ArrowUp/ArrowDown/Home/End movement between
   `menuitem`s (contrast: the rail tablist and content tabs DO have full roving-tabindex arrow support). Minor,
   consistent gap across every topbar/kebab menu. → PARTIAL, owner **044** (C15-16).
6. **`index.html` is a bare redirect** to the ADMIN dashboard: ar-only, `<title>…</title>` literal, no theme
   snippet (one guaranteed unstyled flash frame for dark-theme users on every cold entry), and it bypasses the
   portals hub — a first-time visitor lands in the admin console, not the role-switch device the product treats
   as its documented demo entry. Whether the landing target should be `portals.html` is a product decision for
   the final freeze. → owner **057** (C15-08).

## 4. What we deliberately REFUSED (must never be "fixed back")

* **A fake login form** — the corpus has no login UI to copy, and a non-functional credential form would violate
  no-fake (and tempt credential entry). The hub states "بدون تسجيل دخول" instead; logout is an honest
  backendRequired gate, never a fake "signed out" success. (C15-17)
* **Fake session/identity state** — no invented "logged in as" beyond clearly-labeled demo personas
  (st1/fam1/sara, Spec 012 law); the hub demo note renders on every portal page footer.
* **The legacy tenant's real identity** — `academatic.online` domain, `academatic_session` cookie name, real
  operator PII (the crawl operator's name/e-mail baked into every legacy profile menu — already rejected in
  C08-13) and live tokens are never ported; the product brand is the fictional «أكاديمية مشكاة» with fictional
  personas. (folds into C15-19's handling + prior C08-13)
* **The legacy session cookie's missing Secure flag** (`academatic_session` `secure:false` — §1): a real
  transport-security weakness that 043's session design must not replicate. → REJECTED_SECURITY (C15-05).
* **Runtime icon CDN** (legacy Iconify localStorage cache): our build bakes an inline SVG sprite per page —
  no CDN, no runtime fetch (standing no-CDN law).
* **A student login** — the legacy has none (three auth states, `remember_student_*` = the FAMILY guard); the
  product correctly models student as the demoted child-view inside the family journey, not an adult role.
  (C15-06, INTENTIONALLY_IMPROVED — the reframing fixes the legacy's misleading guard naming.)

## 5. Evidence conflicts (resolved from raw evidence)

1. **"index.html = the portals hub" (task framing / several planning summaries) vs the raw build**: raw
   `public/index.html` is a meta-refresh redirect to `dashboard.html`; the hub is `portals.html`
   (`build-html.mjs:134` + `:214-217`). **The raw file wins**; recorded, not "fixed" (042 is doc-only).
2. **Spec-040's "the last «قريبًا» claims in the product are gone" vs raw `teacher-portal.html`**: 7 baked
   «قريبًا» quick-tiles exist (§3 item 3). The census was scoped to nav planned items + `[data-coming-soon]`;
   the raw HTML wins on the user-visible claim. → C15-14.
3. **This cluster's path list says 0 legacy pages** — verified, not assumed: the roles output was searched for
   `login|register|auth|logout|password` page records (0 hits; the two `management-public-*` slugs are admin
   pages owned elsewhere).

## 6. Visual verdict

The shared shell is the strongest visual layer in the product. The **hub** reads warm and honest (cream canvas,
two clean persona cards with role chips, the admin band and child-view card correctly subordinated) — one nit:
the demo note renders **twice** on the hub (body `pt-note` + shell `pt-foot`, both `prt.shell.demoNote`).
The **admin shell** is coherent in AR-RTL and EN-LTR (true mirroring incl. rail side, chevrons, `text-start`
usage; Arabic-Indic digits never mirrored) and the **dark theme** is genuinely designed, not inverted
(`family-portal__ar__dark__desktop.png`: tinted violet identity hero, correct chip tones, readable lines).
The two real visual defects are §3 items 3–4 (stale teacher quick-tiles; clipped mobile drawer clone). The
`index.html` stub is the only unpolished entry surface (§3 item 6).

## Disposition summary (normalized — Spec 042 ledger source)

| capId | capability | disposition | owner | evidence anchor |
|---|---|---|---|---|
| C15-01 | Legacy login / register / password-reset / public marketing UI (never captured — crawler ran authenticated) | UNKNOWN_EVIDENCE | 043 | §1 / §3 item 2 |
| C15-02 | Real authentication + session lifecycle (3 role logins at shared `/login`, Laravel guards web/teacher/student, remember-me + session cookies) | FUTURE_BACKEND | 043 | §1 table / §3 item 1 |
| C15-03 | Login bot protection (legacy Google reCAPTCHA — proven from `_GRECAPTCHA`/`_grecaptcha`) | FUTURE_BACKEND | 043 | §1 table |
| C15-04 | Real-time transport (legacy Pusher websocket — `pusherTransportTLS`) | FUTURE_BACKEND | 053 | §1 table |
| C15-05 | Legacy session cookie shipped without the Secure flag (`academatic_session` `secure:false`) | REJECTED_SECURITY | 043 | §1 table / §4 |
| C15-06 | Family/guardian login behind a guard literally named "student" → corrected to family-owns-child-view role model | INTENTIONALLY_IMPROVED | — | §1 table / §4 |
| C15-07 | Portals hub demo role-switch device (2 role cards + admin band + demoted child-view + honest no-login framing) | INTENTIONALLY_IMPROVED | — | §2 hub / §6 |
| C15-08 | `index.html` landing (redirect stub to the ADMIN dashboard: ar-only, bare title, no theme snippet, bypasses the hub) | COMPLETE_BUT_VISUAL_REVIEW_REQUIRED | 057 | §3 item 6 / §5 conflict 1 |
| C15-09 | Admin shell navigation (6-category rail + panels, status-aware items, 0 planned, exactly 1 honest lock, topbar cluster) | COMPLETE_BUT_VISUAL_REVIEW_REQUIRED | 045-050 | §2 admin shell / §6 |
| C15-10 | Language-switch fragment preservation (sidebar `langRoute` + topbar `langUrl` + `location.hash`, D-3/W-1) | COMPLETE_AND_VERIFIED | — | §2 D-3 (source lines cited) |
| C15-11 | Deep-link seeding precedence (`#view=` hash → stored view → baked default; `#step=` transient; `#child=` :target) | COMPLETE_AND_VERIFIED | — | §2 deep-link seeding |
| C15-12 | Theme system (light/dark/system, anti-flash inline snippet, live system tracking; a REAL write) | COMPLETE_AND_VERIFIED | — | §2 real writes / §6 dark verdict |
| C15-13 | RTL/LTR mirroring (per-language baked pages, dir-aware popovers, Arabic-Indic numerals never mirrored) | COMPLETE_AND_VERIFIED | — | §2 real writes / §6 |
| C15-14 | Teacher-home quick-tiles: 7 stale baked «قريبًا» planned tiles for implemented pages (`teacher-portal.js:33-35` ignores `e.status`) | PARTIAL | 045-050 | §3 item 3 / §5 conflict 2 |
| C15-15 | Admin mobile drawer clone clipping (brand + icons truncated, rail off-canvas in the 780px drawer) | COMPLETE_BUT_VISUAL_REVIEW_REQUIRED | 044 | §3 item 4 |
| C15-16 | Popover `role=menu` keyboard pattern (no ArrowUp/Down/Home/End between menuitems) | PARTIAL | 044 | §3 item 5 |
| C15-17 | Honest logout / account / help gates (backendRequired copy; no fake sign-out success) | INTENTIONALLY_IMPROVED | — | §2 no-dead-end / §4 |
| C15-18 | Role isolation & route authorization (currently presentational only; "hiding a link is NOT authorization") | FUTURE_BACKEND | 043 | §3 item 1 |
| C15-19 | Live production auth tokens stored in repo `auth-state-*.json` (486-char remember-me values, expiries into 2027) | REJECTED_SECURITY | 043 | §1 privacy note |
| C15-20 | Portal shell (role topbar + desktop `pt-sidenav` + native `<details>` mobile drawer; nav outside `#page-body`; duplicate demo-note nit on the hub) | COMPLETE_BUT_VISUAL_REVIEW_REQUIRED | 045-050 | §2 portal shell / §6 |

Honest counts: screenshotsOpened=7 · recordsInspected=10 · currentSourceFiles=19

Normalization notes (Spec 042, no new analysis): C15-01 pairs UNKNOWN_EVIDENCE with 043 as the named future
owner per the binding future-owner register (auth/role isolation), with the backend login itself carried by
C15-02 (FUTURE_BACKEND, 043). C15-04's Pusher transport maps to 053 (integrations command center) as the
nearest owning spec for a third-party real-time provider. C15-14's fix is a page-body honesty pass →
045-050 (bounded page review), mirroring the Spec 019/020 quick-tiles fixes. C15-15/-16 are drawer/menu
interaction-system items → 044. COMPLETE_AND_VERIFIED is used only where a field-level source verification
was performed in this audit (exact lines cited); no legacy pixel baseline exists for this cluster.
