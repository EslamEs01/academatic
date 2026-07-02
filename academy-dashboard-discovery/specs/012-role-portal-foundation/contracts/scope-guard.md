# Contract: Scope Guard (Spec 012)

**Status**: Binding · Foundation only — what Spec 012 must never become. References FR-012–FR-014; SC-002/SC-004/SC-005/SC-009; research D11/D12.

## G1. Forbidden — product scope

No deep student/family/teacher dashboard implementation (the binding compositions are the ceiling — no extra sub-pages, tabs, flows, wizards, chat panes, history browsers, timetable pages, upload forms). No real authentication/role permissions. No backend/API/DB. No real engine: chat · homework · attendance-write · session-join/Zoom · payment/billing · salary/earnings portals · uploads · exports/imports · notifications. **No teacher salary/pay/earnings figures or vocabulary anywhere in portal surfaces.** No admin sidebar/body additions. No legacy visual cloning. No new nav mechanics in the admin console.

## G2. Forbidden — technology & architecture

No new library/framework/TypeScript/CDN; no SPA/whole-page `#app`; no runtime page construction; no new `data-*` hook (portal header reuses `theme-menu`/`lang-menu`; violations require a plan amendment); no `enhance.js` change; no `package.json` change; no absolute/external asset paths.

## G3. Allowed — the complete change surface (path-aware)

- NEW portal files ONLY: `src/js/pages/{portals,student-portal,family-portal,teacher-portal}.js` · `src/js/components/portal-shell.js` (+ optional `portal-cards.js`) · `src/js/fixtures/portal.js` · `src/locales/ar.prt.js`,`en.prt.js` · the `.portal-shell` CSS namespace block in `app.css`.
- Registration touch-points: `scripts/build-html.mjs` (+4 entries + shell branch) · `src/js/i18n.js` (+2 imports/merges) · `src/js/nav.config.js` (**FUTURE_ROLE reason wording only**).
- Tests/docs: `tests/smoke/run.cjs` (+4 bases, PORTAL_PAGES branch, admin-scoped absence, portal block) · `tests/a11y/run.cjs` · `tests/screenshots/capture.cjs` · `README.md` · `app/screenshots/REVIEW.md` · root `CLAUDE.md` · Spec 012 artifacts (`legacy-role-capability-coverage.md`).
- `public/*` — +8 new files; the 40 admin files rebuild content-identical.

**Guarded-untouchable (git diff MUST be empty)**: every admin page module (`pages/*` except the four new), every existing fixture, every existing component (`portal-*` are new files), `enhance.js`, `package.json`, all existing locale files (except the two new + `i18n.js` registration).

## G4. Comment discipline

No comment in any new file may carry other specs' guarded tokens in tripping form (invoice/receipt/score/rank/chart/salary-figures wording) — the prior audits scan comments; portal copy uses availability language, never "coming soon" hype.

## G5. Concrete AUDIT (each MUST print `ok`)

```bash
cd academy-dashboard-discovery/app

# 1) ADMIN IDENTITY — all 40 admin built files content-identical vs HEAD
node -e '
const {execSync}=require("child_process");const fs=require("fs");
const bases=["dashboard","reports","gallery","sessions","schedule","students","teachers","courses","settings","families","add-family","family","student","attendance","groups","course","group","teacher","teacher-performance","finance"];
let bad=[];
for(const b of bases)for(const f of [b+".html",b+".en.html"]){
  const cur=fs.readFileSync("public/"+f,"utf8");
  const old=execSync("git show HEAD:academy-dashboard-discovery/app/public/"+f,{cwd:"../..",maxBuffer:1e8}).toString();
  if(cur!==old)bad.push(f);
}
console.log(bad.length?("FAIL "+bad.join(",")):"ok");'

# 2) NO PAY TOKENS in portal sources + built teacher portal (EN + AR; word-bounded so
#    innocent words like "learning" never false-positive)
grep -RniE '\b(salary|salaries|payouts?|earnings?|compensation)\b|راتب|رواتب|أجر|مستحقات' \
  src/js/pages/student-portal.js src/js/pages/family-portal.js src/js/pages/teacher-portal.js src/js/pages/portals.js \
  src/js/components/portal-*.js src/js/fixtures/portal.js src/locales/ar.prt.js src/locales/en.prt.js \
  public/teacher-portal.html public/teacher-portal.en.html && echo FAIL || echo ok

# 3) ADMIN ISOLATION — zero portal references in admin built files
grep -lE 'portals\.html|-portal\.(en\.)?html' $(ls public/*.html | grep -vE '(portals|-portal)\.') && echo FAIL || echo ok

# 4) Page count = 49
[ "$(ls public/*.html | wc -l)" = "49" ] && echo ok || echo FAIL

# 5) Zero href="#" sitewide (Spec 011 invariant, now 49 pages)
grep -c 'href="#"' public/*.html | grep -vE ':0$' | grep -q . && echo FAIL || echo ok

# 6) No admin shell markup inside portal pages
grep -lE 'nav-rail|nav-panel|class="app-shell' public/portals.html public/*-portal.html public/*-portal.en.html public/portals.en.html && echo FAIL || echo ok

# 7) Guarded sets untouched (empty diff = ok)
git diff --name-only HEAD -- src/js/enhance.js package.json src/js/pages/dashboard.js src/js/pages/reports.js src/js/pages/finance.js \
  src/js/fixtures src/js/components 2>/dev/null | grep -vE 'components/portal-|fixtures/portal\.js' | grep -q . && echo FAIL || echo ok

# 8) PRIOR GUARDS — re-run Spec 008 reports-body + Spec 009 G8a (amended) + Spec 010 G7 + Spec 011 G3 — all ok
```

## G6. One-line reviewer tests

- "Does any portal page contain a pay figure or pay vocabulary?" → MUST be **no**.
- "Did any admin built file change at all?" → MUST be **no** (byte-level).
- "Does any portal control fake a real backend action (join/chat/pay/upload)?" → MUST be **no**.
- "Did Spec 012 add a library, hook, engine, or admin nav item?" → MUST be **no**.
- "Is any of the 39 legacy portal pages unclassified?" → MUST be **no**.

## G7. Enforcement

Build guards silent (nav/coherence/chip-tone); smoke (49 loads: admin asserts unchanged + admin-scoped absence + portal block); axe critical=0 serious=0; the G5 audit; all Spec 008–011 guards re-run green; screenshot review per `screenshot-acceptance.md`. Binds to every other Spec 012 contract.

**Acceptance (binding):**
1. **Given** the G5 audit, **When** run post-implementation, **Then** every line prints `ok`.
2. **Given** `git diff`, **When** reviewed, **Then** every changed path is in G3 and nothing else changed.
3. **Given** Specs 008–011 guard audits, **When** re-run, **Then** all green with zero new amendments.
