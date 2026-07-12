# Quickstart — Spec 040 implementation & verification workflow (DESCRIPTION ONLY — do not execute here)

The later `/speckit.implement` step follows this workflow. `/speckit.plan` does NOT run it. All commands are
relative to `academy-dashboard-discovery/app` unless stated. Baseline = HEAD **`58a53e2`** (§ Ledger, note R9 —
NOT `4cbcb31`; CLAUDE.md's pointer is stale documentation drift, not a code conflict).

## 0. Preflight (baseline gate)
```bash
git branch --show-current                 # feature/012-role-portal-foundation
git rev-parse --short HEAD                 # 58a53e2 (or committed successor)
git status --short                         # clean except .specify/feature.json + specs/040…/
find academy-dashboard-discovery/app/public -maxdepth 1 -name '*.html' | wc -l   # 115
diff <(git show 58a53e2:academy-dashboard-discovery/app/tests -- 2>/dev/null) /dev/null >/dev/null 2>&1 || true
cd academy-dashboard-discovery/app && npm run build && npm run test:smoke && npm run test:a11y
```
Confirm the green baseline BEFORE any source edit: 115 pages, smoke PASS, a11y critical=0 serious=0. If any of
these fail against `58a53e2`, STOP — the plan's diff/md5 math is invalid against a dirty or wrong baseline.

## 1. Non-destructive impact baseline (capture BEFORE any edit)
Per-page normalized `#page-body` md5, taken two ways so the proof is reviewable without depending on a live
rebuild of the pre-image:
```bash
# (a) from the COMMITTED HEAD via git show (no checkout/stash/reset of the working tree)
for f in $(git show 58a53e2 --stat --name-only | grep '^academy-dashboard-discovery/app/public/.*\.html$'); do
  git show "58a53e2:$f" \
    | sed -n '/<div[^>]*id="page-body"/,/<\/div><!-- \/page-body -->/p' \
    | md5sum | awk -v f="$f" '{print f"  "$1}'
done > /tmp/claude-scratch/spec040-baseline-md5-gitshow.txt

# (b) from the current (pre-edit) build output, as a cross-check the two agree
for f in academy-dashboard-discovery/app/public/*.html; do
  sed -n '/<div[^>]*id="page-body"/,/<\/div><!-- \/page-body -->/p' "$f" | md5sum | awk -v f="$f" '{print f"  "$1}'
done > /tmp/claude-scratch/spec040-baseline-md5-worktree.txt
diff /tmp/claude-scratch/spec040-baseline-md5-gitshow.txt /tmp/claude-scratch/spec040-baseline-md5-worktree.txt
# EXPECT: empty diff (mod path prefix) — proves the pre-edit worktree already equals 58a53e2 for public/*.html
```
`#page-body` extraction boundary = the `id="page-body"` div emitted by `shell-markup.js`/`portal-shell.js`
(§Ledger H). Both captures use `git show`/plain `sed` reads — **no `git stash`, `git reset --hard`, or
`git checkout -- <path>`** at any point in this workflow (binding, per the standing Git Safety Protocol and
Ledger §I/K STOP condition 9).

## 2. Source edits (7 app files — apply, then rebuild)
1. `src/js/nav.config.js` — the ONLY navigation-source edit: 6× add `route`, drop `status:'planned'` on
   `settingsGeneral`/`settingsIntegrations`/`settingsCustomization`/`settingsNotifications`/`settingsSecurity`/
   `settingsUsers` (lines 110-115). `FUTURE_ROUTES` stays `{}`.
2. `src/js/pages/settings.js` — the hub body: 6 tab panels, General accordion groups, Notifications 7 sections,
   Customization sections, Security import cards + backup + policies + 2FA row, Integrations 11-card grid +
   11 `formDrawer` Configure drawers.
3. `src/js/fixtures/settings-management.js` — extended (identity/automation, customization colours, security
   imports/backup, provider catalogue 7→11 + `PROVIDER_FIELDS`).
4. `src/js/fixtures/settings-notifications.js` — **NEW** (`NOTIF_GROUPS` 9 groups / 47 controls, `CHANNEL_OPTS`
   5 values: 0/1/3/4/5 — never invent value 2).
5. `src/locales/ar.adm.js` — extended (`adm.set.*`).
6. `src/locales/en.adm.js` — extended, mirrored, 0 divergence (§4 below).
7. `src/styles/app.css` — additive only: `.set-struct`, `.set-acc`/`.set-acc > summary`, `.set-swatch`.

After each file, re-run `git diff --stat -- academy-dashboard-discovery/app/src` and confirm ONLY these 7 paths
appear — anything else (package.json, build-html.mjs, enhance.js, i18n.js, tabs.js, sidebar.js, form-field.js,
settings-section.js, preview-drawer.js, fixtures/settings.js, pages/staff.js, fixtures/staff-management.js) is a
STOP condition (§Ledger K.1).

## 3. Tests (declared amendments + additive) — apply to `src`, then re-derive `tests`
- `tests/smoke/run.cjs`:
  - **Supersession 1** (`settingsPlanned === 6` → `=== 0`) at the two named sites, `:1446` and `:2340` — expected
    value only; the 4 supporting read lines (`:1436`, `:1439`, `:2326`, `:2331`) stay byte-verbatim.
  - **Supersession 2** — retire the `.nav-item.is-planned` CLICK probe at `:223-230`; replace with the sitewide
    `planned===0 && comingSoon===0` census (exact replacement text in Ledger §D.2). The adjacent `clickFeedback`
    helper, the 4 dashboard feedback selectors, the is-disabled reason-toast probe (`:231-240`), and the
    category-switch probe (`:241-251`) stay byte-verbatim.
  - **Additive** `nav040` block (six anchor asserts + sitewide zero-census) near the existing `nav039` block
    (`:1443-1446`), reusing `anchorOk039` unchanged.
  - **Additive** post-`browser.close()` `nav.config` source audit (`R040` route map, `all040` planned===0,
    disabled===1, `FUTURE_ROUTES` keys===0, admin menu===50) inside the existing `byId`-scoped block
    (`:2347-2363`).
  - **Additive** 6 fresh-context deep-link tests (`#view=general|notifications|customization|security|users|
    integrations`, AR+EN = 12 executions): seed `localStorage['academy.schedView.settings']` to a different tab,
    load fresh, assert exactly one visible `[role=tabpanel]` = target, 0 external requests.
  - **Strengthening 1**: `a31.gates >= 4` (`:1196`) → `a31.gates >= 20`.
  - **Strengthening 2**: `FORM_DRAWERS_032.settings` (`:92`) `['head-add']` → `['head-add','integ-stripe',
    'integ-paypal','integ-mollie','integ-xpay','integ-payoneer','integ-paymob','integ-custom',
    'integ-paymob-payout','integ-payoneer-payout','integ-whatsapp','integ-email']` — every one of the 12 settings
    drawers must be registered or it silently escapes the fieldless/noGate/multiPrimary/MUST-OMIT audit
    (Ledger R4).
  - Every other protected assert — `truth010.badPlanned` (now vacuously true, preserved not superseded),
    `deadNav`, link-integrity, `navCount32===50`, `adminMenu===50`, route-freeze 115, the settings tab-id contract
    (`:1194`), the Spec-031 settings honesty asserts (`:1172-1176`), the `g32` MUST-GATE freeze (`:1288-1297`),
    finance-lock asserts, `payHit`/`tchPay`/`famPay`/`payFigure`/child-view/FAKE/raw-key/external-request guards —
    BYTE-VERBATIM.
- `tests/a11y/run.cjs`: additive rows for `#view=general`/`#view=notifications`/`#view=customization` (zero
  coverage today) × AR/EN × light/dark + mobile-390 + ≥3 open-drawer rows (an `integ-*` Configure drawer, the
  `head-add` drawer, a Security import card disclosure) + the roving-tabindex keyboard row on the 6-tab hub.
  Target: critical=0 serious=0.
- `tests/screenshots/capture.cjs`: re-baseline `dashboard__ar__light__desktop__cat-settings.png` (six «قريبًا»
  buttons → six real links — expected change, not a regression); additive `sp040-*` frames (each of the 6 tabs ×
  AR/EN, ≥2 open Configure drawers, the accordion open state, dark + mobile-390). 0 console errors required.

## 4. Locale parity check (ad hoc, no dedicated script exists in-repo)
```bash
node -e "
const ar = Object.keys(require('./src/locales/ar.adm.js').default ?? require('./src/locales/ar.adm.js'));
const en = Object.keys(require('./src/locales/en.adm.js').default ?? require('./src/locales/en.adm.js'));
const onlyAr = ar.filter(k => !en.includes(k));
const onlyEn = en.filter(k => !ar.includes(k));
console.log('ar.adm keys:', ar.length, 'en.adm keys:', en.length);
console.log('divergence ar-only:', onlyAr.length, onlyAr);
console.log('divergence en-only:', onlyEn.length, onlyEn);
"
# EXPECT: ar.adm keys === en.adm keys (both counts equal), 0 divergence either direction.
# (module system may require a small .mjs shim if ar/en.adm.js use ESM export default — adapt loader, not the check.)
```
This is the same style of check the smoke raw-key guard depends on structurally: `i18n.js` wraps any UNRESOLVED
key as `⟦key⟧` in rendered text, and `tests/smoke/run.cjs:125,157` already asserts
`document.body.innerText.match(/⟦[^⟧]+⟧/g)` is empty on every page/lang — so a genuine `adm.set.*` key miss on
either language surfaces as a **smoke failure**, not only as a static count mismatch. Run both: the static
key-set diff (fast, catches renames) and the smoke raw-key regex (catches anything actually rendered).

## 5. No-secret / no-pay grep gates (run against the FULL built output, both languages)
```bash
cd academy-dashboard-discovery/app
# R1 — credential-shaped input names (must be 0 on settings pages; smoke a31.credInputs enforces this too)
grep -RoE '<input[^>]*\b(name|id)="[^"]*(pass|secret|api|key|token|webhook|card|cvv)[^"]*"' \
  public/settings.html public/settings.en.html
# EXPECT: 0 matches. `cust-surface` (NOT *card*), no key1..key4/settings[api_key]/smtp_username/smtp_password/
# webhook-url as inputs (structure rows only — grep should not find them as <input>/<select>/<textarea> at all).

# no type=password / type=file / canvas anywhere in the two settings bodies
grep -RoE 'type="password"|type="file"|<canvas' public/settings.html public/settings.en.html
# EXPECT: 0 matches.

# R3 — pdf/download/window.open forbidden pattern (Download-template controls must be <button> gates)
grep -RoE 'window\.open|blob:|createObjectURL|\.pdf"|[^-\w]download=' public/settings.html public/settings.en.html
# EXPECT: 0 matches.

# R2 — currency tokens (0 on settings; "Saudi Arabia" is safe, \bSAR\b is not)
grep -RoE '(ريال|SAR\b|جنيه|EGP\b|AED\b|EUR\b|[$€£])' public/settings.html public/settings.en.html
# EXPECT: 0 matches.

# teacher pay-free GLOBAL (extended token set, sitewide — must stay 0, not just on settings)
grep -RiE 'salary|payroll|hour[-_ ]?rate|\bfine\b|payout|compensation|أتعاب|راتب|فلوس' public/teacher*.html
# EXPECT: 0 matches (unchanged law; settings general omits the 11 pay controls — Ledger F.1).

# teacher pay-free on SETTINGS = a FIGURE ban, not a word ban. The words "Salary events" (the notifications
# routing section) and "Paymob Payout"/"Payoneer Payout" (provider NAMES) are lawful; a NUMBER next to them is not.
grep -RoiE '(salary|رواتب|hour[-_ ]?rate|أجر الساعة|\bfine\b|غرامة|payout)[^<]{0,24}[0-9]' \
  public/settings.html public/settings.en.html
# EXPECT: 0 matches. Also 0 for the 11 excluded legacy names:
grep -RoE 'settings_data\[|salary_period|applayFins|fin\[|rate_student_absent|hours-input|rate-input' \
  public/settings.html public/settings.en.html   # EXPECT: 0

# fake success (0 anywhere in settings, BODY + TEMPLATE content)
grep -RoiE 'تم الحفظ|\bsaved\b|بنجاح|\bsuccessfully\b|تم الربط' public/settings.html public/settings.en.html
# EXPECT: 0 matches. TRAP: the preview note must read «معاينة فقط — لا يُخزَّن أي تغيير قبل ربط الخادم.» /
# "Preview only — nothing is stored until the server is connected" — NOT "not saved" / «لا يتم الحفظ»
# («يتم الحفظ» contains «تم الحفظ», and "not saved" contains \bsaved\b: both would FAIL an honest build).

# fake connected status — CHIP-SCOPED and token-absolute (never body-wide: the honest backendRequired sentence
# "available once the server is connected" legitimately contains the word).
node -e "
const fs=require('fs');
for (const f of ['public/settings.html','public/settings.en.html']) {
  const h=fs.readFileSync(f,'utf8');
  const chips=h.match(/<span[^>]*class=\"[^\"]*chip[^\"]*\"[^>]*>[\s\S]*?<\/span>/g)||[];
  const bad=chips.filter((c)=>/متصل|connected/i.test(c));
  console.log(f,'chips:',chips.length,'BAD:',bad.length,bad.slice(0,2));
}"
# EXPECT: BAD = 0 on both. Honest chips read «غير مُعدّ»/"not configured", «يتطلّب ربط الخادم»/"requires the server".
```

## 6. Build + verify
```bash
cd academy-dashboard-discovery/app
npm run build            # → 115 pages, PAGES still 57 entries, 0 raw keys, locale parity (§4)
npm run test:smoke       # PASS — 2 supersessions + 2 strengthenings + additive block, all else byte-verbatim
npm run test:a11y        # critical=0 serious=0
node tests/screenshots/capture.cjs   # 0 console errors; sp040-* frames + re-baselined cat-settings frame
```

## 7. Impact proof (non-destructive, against `58a53e2`)
```bash
# re-run the §1(a)-style extraction on the POST-EDIT build, diff against the pre-edit capture
for f in academy-dashboard-discovery/app/public/*.html; do
  sed -n '/<div[^>]*id="page-body"/,/<\/div><!-- \/page-body -->/p' "$f" | md5sum | awk -v f="$f" '{print f"  "$1}'
done > /tmp/claude-scratch/spec040-postbuild-md5.txt
diff /tmp/claude-scratch/spec040-baseline-md5-gitshow.txt /tmp/claude-scratch/spec040-postbuild-md5.txt
# EXPECT: exactly 2 differing lines — public/settings.html, public/settings.en.html.
# All other 113 files (62 sidebar-only admin pages + 51 byte-identical non-admin pages) — 0 diff.

git diff --stat -- academy-dashboard-discovery/app/src      # exactly the 7 files in §2
git diff --stat -- academy-dashboard-discovery/app/tests    # exactly smoke/a11y/screenshots run files
git diff -- academy-dashboard-discovery/app/package.json    # empty
git diff -- academy-dashboard-discovery/app/scripts/build-html.mjs  # empty
git diff -- academy-dashboard-discovery/app/src/js/enhance.js       # empty
git diff -- academy-dashboard-discovery/app/src/js/i18n.js          # empty
```
Sidebar-only proof for the other 62 admin pages (spot-check, then generalize): extract the `<nav class="nav-panel">`
block only, confirm the 6 settings `<button …is-planned data-coming-soon…>` rows became
`<a class="nav-item" href="settings(.en).html#view=…">` rows and nothing else in that block changed; confirm the
sibling `#page-body` md5 for that same file is unchanged (already proven by the loop above).

**Never** use `git stash`, `git reset --hard`, `git checkout -- <path>`, or a branch switch to obtain the
pre-edit state for this comparison — the `git show 58a53e2:<path>` captures in §1 and the `git diff` calls above
are sufficient and non-destructive. A detached temporary worktree (`git worktree add --detach`) is an acceptable
alternative to `git show` for large-file diffing; if used, remove only that worktree afterward
(`git worktree remove`), never touch the primary working tree's state.

## 8. Docs
Update `screenshots/REVIEW.md` (record `sidebar.js:33` `is-planned`/`data-coming-soon` and the analogous
`enhance.js` branch as intentionally unexercised-but-retained, mirroring `portal-shell.js:30` since Spec 025),
`README.md`, `CLAUDE.md` (active-feature pointer — including the `58a53e2` baseline correction), and
`specs/040-settings-deep-links-subpages/implementation-status.md`. No commit / no push (watcher commits).

## 9. Acceptance checklist (reviewer runs exactly this, in order)
1. `git rev-parse --short HEAD` before implementation = `58a53e2`; `git status --short` clean beforehand.
2. Counts: public HTML = 115; `PAGES` in `build-html.mjs` = 57 entries (0-diff); `.nav-panel .nav-item` = 50;
   settings category items = 7, all 7 `implemented`, 0 `planned`.
3. Sitewide census (every page × AR/EN): `.nav-item.is-planned` = 0; `[data-coming-soon]` = 0; `status:'disabled'`
   locks = 1 (`classSalaryReport` only); `FUTURE_ROUTES` = `{}`.
4. The 6 routes resolve exactly as the §B table (`settings.html#view=<tab>` / `settings.en.html#view=<tab>`, tab
   ids `general|notifications|customization|security|users|integrations` unchanged from `smoke:1194`); fresh-load
   each deep-link and confirm exactly one visible `[role=tabpanel]`, 0 external requests, AR+EN (12 checks).
5. `settingsUsers` renders the existing real `<a href="staff.html">` + `rolesSection()` preview, unchanged;
   `staff.js`/`fixtures/staff-management.js` 0-diff (Decision 1, Option A).
6. Field/gate census on `settings(.en).html`: `field()` controls = 73 across the 6 tabs (22/13/16/1/0/21 per
   §F.7 table); `data-toggle` previews = 49, every one carries a backendRequired `data-toast` (never "saved");
   structure-only sensitive rows = 60 (34 Security columns/2FA + 26 Integrations rows = 24 credential + 2 webhook
   endpoint); gates ≈ 51, **every one a direct `data-disabled-reason` gate — 0 new `data-confirm` chains**.
7. Honesty greps (§5) all return 0: credential-shaped input names, `type=password`, `type=file`, `<canvas>`,
   pdf/download/window.open pattern, currency tokens, fake-saved strings, and **0 status chips carrying
   «متصل»/`connected`**; the pay grep is **figure-scoped** (the words "Salary events" / "Paymob Payout" are
   lawful, a number beside them is not); teacher pay-free grep over `public/teacher*.html` stays 0.
8. `FORM_DRAWERS_032.settings` in `run.cjs` lists all 12 drawers (`head-add` + 11 `integ-*`); each satisfies
   ≥1 real control, exactly 1 `.btn-primary[data-disabled-reason]`, 0 OMIT-named inputs, 0 `<canvas>`.
9. `npm run build && npm run test:smoke && npm run test:a11y && node tests/screenshots/capture.cjs` all green;
   a11y critical=0 serious=0; screenshots 0 console errors; re-baselined `cat-settings` frame reviewed by eye.
10. Locale parity: `ar.adm.js` key count === `en.adm.js` key count, 0 divergence either direction (§4); 0 raw
    `⟦…⟧` keys sitewide (smoke `:125,157`).
11. Non-destructive impact proof (§7): exactly 2 `#page-body` diffs (`settings.html`/`.en`) against the
    `58a53e2` `git show` capture; the other 113 files' bodies byte-identical; `src` diff = exactly the 7 named
    files; `tests` diff = exactly the 3 named test runners; `package.json`/`build-html.mjs`/`enhance.js`/
    `i18n.js`/`tabs.js`/`sidebar.js`/`form-field.js`/`settings-section.js`/`preview-drawer.js` all empty diffs.
12. Message Builder gate on the Customization tab is unchanged byte-for-byte (`adm.set.cust.msgBuilder` +
    `adm.set.cust.msgBuilderReason`) — Spec 040 adds no UI for it (owner: Spec 053, Decision 3).
13. No commit / no push performed by the implementer; watcher commits.
