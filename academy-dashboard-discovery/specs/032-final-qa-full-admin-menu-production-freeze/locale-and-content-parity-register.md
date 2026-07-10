# Locale & Content Parity Register — Spec 032

**Mechanism** (`src/js/i18n.js:1-84`): each spec owns one `ar.X.js`/`en.X.js` pair; `i18n.js` imports both + `deepMerge`s into `ar`/`en` dicts; `t(key)` falls back ar→ then returns `⟦key⟧` + `console.warn` on a total miss (the smoke "no raw key" signal — `⟦` never appears in any shipped page). AR is the default/fallback (`FALLBACK='ar'`, `getStoredLang()`→'ar').

## 11 locale pairs — all registered, all mirrored (0 divergence)
Verified by importing every pair as ES modules and diffing fully-flattened dotted key sets (`onlyAr=0`/`onlyEn=0` for all 11). Total **2,723 keys per language**.

| Pair | Spec | keys (ar=en) | Registered (i18n.js) | Mirrored |
|---|---|---|---|---|
| ar/en.js (base) | 001 | 204 | base dicts | ✓ |
| ar/en.extra.js | 002/003 | 299 | :41-42 | ✓ |
| ar/en.fam.js | 004 | 349 | :43-44 | ✓ |
| ar/en.att.js | 005 | 104 | :45-46 | ✓ |
| ar/en.crs.js | 006 | 139 | :48-49 | ✓ |
| ar/en.trn.js | 007 | 141 | :51-52 | ✓ |
| ar/en.rep.js | 008/029 | 190 | :54-55 | ✓ |
| ar/en.fin.js | 009/030 | 144 | :57-58 | ✓ |
| ar/en.prt.js | 012-025 | 662 | :59-60 | ✓ |
| ar/en.ops.js | 026 | 100 | :62-63 | ✓ |
| ar/en.adm.js | 031 | 391 | :65-66 | ✓ |

**Flags: none.** 22 files = 11 pairs = 11 `deepMerge` call-sites. No unmirrored pair, no unregistered module, no orphan file.

## Freeze obligation for Spec 032's new form copy
The 40 rebuilt forms add new field-label/placeholder/gate-reason keys. Every new key MUST be added to BOTH `ar.X.js` and `en.X.js` of its owning module (reuse the existing per-spec module, e.g. `ar/en.fam.js` for family/student forms, `ar/en.adm.js` for staff/library/certificates/settings, `ar/en.crs.js` for course/group, `ar/en.trn.js` for teacher, `ar/en.rep.js` for feedback/forms, `ar/en.fin.js` for bank). Post-fix: re-run the flattened-key diff → 0 divergence; smoke → 0 `⟦` raw keys.

## RTL / LTR / dark
- **AR RTL default + EN LTR**: `build-html.mjs:161-166` `htmlDoc({lang,dir})` sets `<html dir="${dir}">` from `LANGS[lang].dir` (`ar:rtl`/`en:ltr`); every page built per language. Bare `.html` = Arabic RTL (canonical), `.en.html` = English LTR.
- **Light/Dark/System**: inlined `THEME_SNIPPET` (`build-html.mjs:146,168`) sets `data-theme` for light/dark; `tokens.css` `:root`(light) / `[data-theme="dark"]` / `@media (prefers-color-scheme:dark)` (system fallback); `theme.js` runtime engine + topbar menu (sun/moon/monitor).
- **RTL coverage = AR coverage** (RTL is the ar-language state, not a separate flag) — the majority of both test matrices.

**Parity is production-ready today; the freeze must extend it to the new form keys (mirror + no raw key).**
