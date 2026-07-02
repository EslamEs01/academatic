# Contract: Scope Guard (Spec 011)

**Status**: Binding · What Spec 011 must never become. References FR-015; SC-007/SC-010; research D3/D4.

## G1. Allowed — the complete change surface

- `src/js/pages/dashboard.js` — the ONE Overview `linkHref` addition (sanctioned dashboard-body touch-point).
- `src/js/components/sidebar.js` — import `num` + wrap the badge value (`${num(it.badge)}`).
- `src/js/i18n.js` — **no change expected** (reuse `num()` as-is); listed only because it is the helper source.
- `tests/smoke/run.cjs` — the two assertion updates (locale-aware badge; `deadHash === 0` sitewide) per research D3.
- `tests/screenshots/capture.cjs` — only if a frame needs adding (the required frames already exist; likely no change).
- `README.md`, `app/screenshots/REVIEW.md`, root `CLAUDE.md`, and this spec's artifacts.
- Prior-doc reference updates to a fixed follow-up (research D4): Spec 010 `contracts/scope-guard.md` G7 #4 line (tighten to "zero href=# everywhere, closed by Spec 011"), and one-line "Resolved in Spec 011" annotations in Spec 010 `page-coverage-audit.md` + `REVIEW.md`.
- `public/*` — full rebuild (sidebar badge ripple + the dashboard Overview href; sanctioned).

## G2. Forbidden

No new page/file/hook/library/framework/TypeScript/CDN; no `#app`; no runtime page construction; no `enhance.js` change; no new `data-*` attribute. No dashboard redesign or new/removed dashboard content beyond the Overview href. No reports-body or finance-body edit. No change to the Spec 010 admin IA (finance sub-section, banks relocation, families relabel) or Spec 010 coverage-matrix classifications (except the D4 reference-to-fixed-follow-up annotations). No change to Spec 009 finance invariants. No `nav.config.js` change (the badge value stays `SESSIONS.total`; formatting is at the render site). No hard-coded per-language badge string. No new `href="#"` anywhere. No legacy-clone work. No new engine/backend/API/DB/CRUD.

## G3. Concrete grep AUDIT (each MUST print `ok`)

```bash
cd academy-dashboard-discovery/app

# 1) zero href="#" sitewide (the dashboard follow-up is closed)
grep -c 'href="#"' public/*.html | grep -vE ':0$' | grep -q . && echo FAIL || echo ok

# 2) Arabic sessions badge is Arabic-Indic; English is Western (built output)
node -e 'const fs=require("fs");
  const ar=(fs.readFileSync("public/dashboard.html","utf8").match(/nav-badge tabular">([^<]+)/)||[])[1];
  const en=(fs.readFileSync("public/dashboard.en.html","utf8").match(/nav-badge tabular">([^<]+)/)||[])[1];
  const okAr=/[٠-٩]/.test(ar), okEn=/^[0-9]+$/.test(en);
  console.log(okAr&&okEn ? "ok" : "FAIL (ar="+ar+" en="+en+")");'

# 3) no new hard-coded badge literal in config; badge still SESSIONS.total
grep -q 'badge: SESSIONS.total' src/js/nav.config.js && ! grep -qE "badge: *['\"0-9]" src/js/nav.config.js && echo ok || echo FAIL

# 4) guarded bodies untouched (empty diff = ok)
git diff --name-only HEAD -- src/js/pages/reports.js src/js/pages/finance.js \
  src/js/fixtures/reports.js src/js/fixtures/finance.js src/js/components/report-card.js \
  src/js/components/report-status.js src/js/components/report-actions.js \
  src/js/components/finance-status.js src/js/components/finance-actions.js \
  src/locales/ar.fin.js src/locales/en.fin.js src/js/enhance.js package.json | grep -q . && echo FAIL || echo ok

# 5) zero new source files
git status --porcelain src/ scripts/ | grep '^??' | grep -q . && echo FAIL || echo ok

# 6) page count unchanged (41)
[ "$(ls public/*.html | wc -l)" = "41" ] && echo ok || echo FAIL

# 7) PRIOR GUARDS — re-run Spec 008 reports-body + Spec 009 G8a (with Spec 010 amendments) + Spec 010 G7 — all `ok`
```

## G4. One-line reviewer tests

- "Is there any `href="#"` left in built output?" → MUST be **no**.
- "Does the Arabic sidebar badge show Western digits?" → MUST be **no**.
- "Did reports.js / finance.js / any guarded body change?" → MUST be **no**.
- "Did Spec 011 add a page, file, hook, library, or engine?" → MUST be **no**.
- "Is the dashboard body diff anything other than the Overview href?" → MUST be **no**.

## G5. Enforcement

Build: nav guard + finance coherence guard + chip-tone guard stay green. Smoke: all Spec 010 asserts (with the two D3 updates) + the sweep. Axe critical=0 serious=0. Screenshot review per `screenshot-acceptance.md`. All Spec 008/009/010 guards re-run green.

**Acceptance (binding):**
1. **Given** the G3 audit, **When** run, **Then** every line prints `ok`.
2. **Given** Spec 008/009/010 guards, **When** re-run, **Then** all green.
3. **Given** `git diff`, **When** reviewed, **Then** every changed path is in the G1 allowed list.
