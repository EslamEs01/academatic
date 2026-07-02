# Contract: Scope Guard (Spec 010)

**Status**: Binding · What Spec 010 must never become — and how it amends older guards without weakening them. References FR-018; SC-006; research D10/D12.

## G1. Forbidden — product scope

No backend/API/DB/auth/permissions/CRUD/persistence. No real engine of any kind: chat/messaging · requests/leads workflow · tasks · notifications · scheduled actions · holidays/calendar integration · time-zone conversion · reports/analytics/BI · exports/imports · uploads · Zoom/live-session · finance/accounting/payroll/gateway. No role portal or role dashboard. No new pages (zero — the matrix proved none needed). No fake working link for any planned/backendRequired capability. No new fixture entity. No dashboard-body change, no reports-body finance, no finance-body change.

## G2. Forbidden — technology & architecture

No new library/framework/TypeScript/CDN; no chart/table/form/calendar/chat/payment/accounting library. No whole-page `#app`; no runtime page-DOM construction; no new `data-*` hook; no `enhance.js` change; no absolute/external asset path; no new chip tone or color token; no seventh rail category; no new nav mechanics beyond the existing `sections` shape.

## G3. Forbidden — legacy reuse

No copied legacy visuals/classes/palette/logo/icons/private wording; no numeric status codes; no flattening our category rail to the legacy sidebar; no removal of our improvements to match legacy; no legacy typo-route homage.

## G4. Allowed — the complete change surface (path-aware)

- `src/js/nav.config.js` — finance sub-section · banks move · FUTURE_ROUTES cleanup · `badge: SESSIONS.total` (+1 fixture import).
- `src/locales/ar.js`, `en.js` — `cat.families` relabel + new `cat.finance` key (base nav labels only).
- `src/locales/ar.fam.js`, `en.fam.js` — +1 key pair `fam.bill.viewInvoices`.
- `src/js/pages/family.js` — THE one sanctioned edit: the finance link in `billingPanel()`.
- Page modules OTHER than the guarded sets — string/empty-state-level fix-now polish ONLY, each item listed in `page-coverage-audit.md` (structural additions forbidden; if the audit finds no fix-now item in a module, it is not touched).
- `src/styles/app.css` — `[data-row][hidden]{display:none !important}` + token-level polish styling.
- `scripts/build-html.mjs` — the chip-tone guard.
- `tests/smoke/run.cjs`, `tests/screenshots/capture.cjs` (`tests/a11y/run.cjs` only if a scenario is added) — assertions per the contracts.
- `README.md`, `app/screenshots/REVIEW.md`, root `CLAUDE.md`, Spec 010 artifacts (`legacy-capability-coverage.md`, `page-coverage-audit.md`).
- `specs/009-finance-billing-payments/contracts/scope-guard.md` — the attributed amendment (G6 below).
- `public/*` — full rebuild (sidebar ripple, sanctioned).

**Guarded-untouchable sets** (git diff MUST be empty): `pages/dashboard.js` + dashboard fixtures (`kpis.js`, `welcome.js`, `status-summary.js`) · `pages/reports.js`, `fixtures/reports.js`, `components/report-{card,status,actions}.js` · all six Spec 009 finance files · `enhance.js` · `package.json` · all other fixtures (`sessions.js` is READ by nav.config, not modified).

## G5. Comment discipline

No comment added anywhere may contain other specs' guarded tokens (score/rank/chart/leaderboard/invoice/receipt/…) in a way that trips their audits — reword around them (established Spec 009 practice). The coverage matrix and audit artifacts live in `specs/010-…/` and are excluded from app-source token audits by path.

## G6. Amending Spec 009's guard (additive + attributed ONLY)

`specs/009-…/contracts/scope-guard.md`:
1. G8a block 1 (`grep -v` exclusion list) gains exactly: `fam\.bill\.viewInvoices` and the family-page finance href token — each annotated "(Spec 010 sanctioned touch-point: family→finance shortcut)".
2. G8b question 5 gains: "…except `pages/family.js`, changed once by Spec 010's documented shortcut (see Spec 010 source-links contract)."
No pattern widened, no file removed from any guarded set, no command deleted. The same discipline applies to any other prior guard IF an audit-tripping collision is discovered (each amendment exact-token + attributed; none is currently expected beyond Spec 009's).

## G7. Concrete grep AUDIT (each MUST print `ok`)

```bash
cd academy-dashboard-discovery/app

# 1) Guarded sets untouched (empty diff = ok)
git diff --name-only HEAD -- src/js/pages/dashboard.js src/js/pages/reports.js \
  src/js/fixtures/reports.js src/js/fixtures/kpis.js src/js/components/report-card.js \
  src/js/components/report-status.js src/js/components/report-actions.js \
  src/js/pages/finance.js src/js/fixtures/finance.js src/js/components/finance-status.js \
  src/js/components/finance-actions.js src/locales/ar.fin.js src/locales/en.fin.js \
  src/js/enhance.js package.json | grep -q . && echo FAIL || echo ok

# 2) Zero new source files (Spec 010 adds none)
git status --porcelain src/ scripts/ | grep '^??' | grep -q . && echo FAIL || echo ok

# 3) Zero new pages (file count in public/ unchanged: 41 html + .nojekyll)
[ "$(ls public/*.html | wc -l)" = "41" ] && echo ok || echo FAIL

# 4) No NEW dead links. `a[href="#"]` is this app's enhance.js-handled control hook; the ONLY
#    instance in built output is the pre-existing Spec 001 dashboard "overview → view all"
#    section-header link, in the contract-frozen dashboard body (accepted follow-up, not Spec 010's
#    to change). Assert: every page EXCEPT the two dashboard files has zero href="#".
grep -c 'href="#"' public/*.html | grep -vE ':0$' | grep -vE 'dashboard\.(en\.)?html:1$' | grep -q . && echo FAIL || echo ok

# 5) The one sanctioned family link — present exactly once per language build
[ "$(grep -o 'finance.html' public/family.html | wc -l)" -ge 1 ] && \
[ "$(grep -c 'finance.en.html' public/family.en.html)" -ge 1 ] && echo ok || echo FAIL

# 6) FUTURE_ROUTES cleanup + badge derivation landed
grep -nE "FUTURE_ROUTES" -A6 src/js/nav.config.js | grep -qE "attendance:|groups:|teacherKpi:|finance:" && echo FAIL || echo ok
grep -q "badge: 24" src/js/nav.config.js && echo FAIL || echo ok

# 7) The shared visibility rule exists exactly once
[ "$(grep -c 'data-row..hidden' src/styles/app.css)" = "1" ] && echo ok || echo FAIL

# 8) PRIOR GUARDS — re-run Spec 008's and Spec 009's G8a blocks verbatim
#    (009's with its two attributed Spec 010 amendment tokens) — every line must print ok
```

## G8. One-line reviewer tests

- "Did any guarded module change?" → MUST be **no** (audit 1).
- "Did Spec 010 add a page, a source file, a hook, a library, or an engine?" → MUST be **no**.
- "Does any planned/backendRequired surface now navigate or mutate?" → MUST be **no**.
- "Is any prior guard weakened (pattern widened / file unlisted / command removed)?" → MUST be **no** — only the two attributed exact-token amendments exist.
- "Do dashboard/reports/finance bodies differ from pre-010?" → MUST be **no** (sidebar-only diffs).

## G9. Enforcement

Build: nav guard + Spec 009 coherence guard + NEW chip-tone guard all throw on violation. Smoke: all carried assertions + the Spec 010 additions (regrouped-sidebar invariants, per-filterable-page computed visibility, family-link presence, link crawl, truthfulness sweep). Axe critical = 0. Screenshot review per `screenshot-acceptance.md`. This guard **binds to** every other Spec 010 contract and re-runs Specs 001–009's guards as its acceptance floor.

**Acceptance (binding):**
1. **Given** the G7 audit, **When** run after implementation, **Then** every line prints `ok`.
2. **Given** Spec 008's and Spec 009's guard audits, **When** re-run, **Then** all green (009 with only its two attributed amendments).
3. **Given** `git diff` review, **When** complete, **Then** every changed path is in the G4 allowed list and nothing else changed.
