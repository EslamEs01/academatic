# Contract — Non-Destructive Impact Protection (Spec 040)

Baseline **HEAD `58a53e2`** (Ledger R9 — NOT `4cbcb31`; CLAUDE.md's pointer is stale documentation drift). All
diff/md5 proofs in this contract are taken against `58a53e2`.

**The load-bearing difference from every prior nav-completion spec (034–039):** those specs were **nav-only** — a
`nav.config.js` flip pointed an existing anchor at existing, unchanged content, so **every** admin `#page-body`
stayed byte-identical except the shared sidebar. **Spec 040 is not nav-only.** It completes the settings **forms
in place** — `settings.html`/`settings.en.html` get a full `#page-body` rewrite (2 fields → 73). **This contract
does NOT claim every body is identical; it claims exactly two are not, and proves the other 113 are.**

---

## 1. Method (non-destructive — the only method this contract permits)

**Never used, at any point:** `git stash`, `git reset --hard`, `git checkout -- <path>`, `git clean`, a branch
switch. A detached temporary `git worktree add --detach` is an acceptable alternative to `git show` for large-file
diffing; if used, remove only that worktree afterward (`git worktree remove`) — never touch the primary tree.

### Step 1 — Preflight gate (before any source edit)
```bash
git rev-parse --short HEAD                 # must read 58a53e2 (or a committed successor)
git status --short                          # clean except .specify/feature.json + specs/040…/
find app/public -maxdepth 1 -name '*.html' | wc -l   # 115
npm run build && npm run test:smoke && npm run test:a11y   # green
```
If any of these fail against `58a53e2`, **STOP** — the diff/md5 math below is invalid against a dirty or wrong
baseline.

### Step 2 — Capture the pre-edit baseline, TWO independent ways
```bash
# (a) from the COMMITTED HEAD via git show — the authoritative capture
for f in $(git show 58a53e2 --stat --name-only | grep '^academy-dashboard-discovery/app/public/.*\.html$'); do
  git show "58a53e2:$f" \
    | sed -n '/<div[^>]*id="page-body"/,/<\/div><!-- \/page-body -->/p' \
    | md5sum | awk -v f="$f" '{print f"  "$1}'
done > scratchpad/spec040-baseline-md5-gitshow.txt

# (b) from the current (pre-edit) build output — a cross-check that the worktree already equals 58a53e2
for f in app/public/*.html; do
  sed -n '/<div[^>]*id="page-body"/,/<\/div><!-- \/page-body -->/p' "$f" | md5sum | awk -v f="$f" '{print f"  "$1}'
done > scratchpad/spec040-baseline-md5-worktree.txt
diff scratchpad/spec040-baseline-md5-gitshow.txt scratchpad/spec040-baseline-md5-worktree.txt
# EXPECT: empty diff (mod path prefix)
```
`#page-body` extraction boundary = the `id="page-body"` div emitted by `shell-markup.js`/`portal-shell.js`
(Ledger §H). Two independent captures exist so the proof is reviewable without depending on a live rebuild of the
pre-image being trusted blind.

### Step 3 — Apply the 7 source edits (per `fixtures-locales-contract.md` §1 + `scope-guard.md` §1.1); rebuild.

### Step 4 — Capture the post-edit build the same way, diff against the baseline
```bash
for f in app/public/*.html; do
  sed -n '/<div[^>]*id="page-body"/,/<\/div><!-- \/page-body -->/p' "$f" | md5sum | awk -v f="$f" '{print f"  "$1}'
done > scratchpad/spec040-postbuild-md5.txt
diff scratchpad/spec040-baseline-md5-gitshow.txt scratchpad/spec040-postbuild-md5.txt
```

---

## 2. Required result — the body-change ALLOWLIST vs the PROTECTED SET (binding, exhaustive)

| Set | Files | Count | Expected diff result |
|---|---|---|---|
| **Body-change ALLOWLIST** | `public/settings.html`, `public/settings.en.html` | **2** | `#page-body` **DIFFERS** — full rewrite (2 fields → 73 `field()` + 49 toggles + 60 structure rows + ~51 gates across 6 tabs) |
| **Sidebar-only PROTECTED set** | the other **62** admin files (64 admin − 2 settings), including `gallery.html`/`gallery.en.html` | **62** | `#page-body` **BYTE-IDENTICAL**; only the `<nav class="nav-panel">` block's 6 settings rows change shape (`<button …is-planned data-coming-soon>` → `<a href="settings(.en).html#view=…">`) |
| **Byte-identical PROTECTED set** | the **51** non-admin files (16 portal pages + portal internals + `index.html`) | **51** | `#page-body` **BYTE-IDENTICAL, 0 bytes changed anywhere in the file** — they do not render the admin sidebar at all |
| **Total** | | **2 + 62 + 51 = 115** ✔ | matches the frozen page count exactly |

**Expected `diff` output at Step 4: exactly 2 differing lines** — `public/settings.html` and
`public/settings.en.html`. **Any other admin `#page-body` line differing ⇒ STOP.** **Any of the 51 non-admin
lines differing at all ⇒ STOP** (Ledger §K STOP condition 9).

### 2.1 Sidebar-only spot-check (generalizable across the 62)

```bash
# extract ONLY the nav-panel block from one representative sidebar-only file, before and after
git show 58a53e2:academy-dashboard-discovery/app/public/dashboard.html \
  | sed -n '/<nav class="nav-panel"/,/<\/nav>/p' > scratchpad/spec040-navpanel-before.txt
sed -n '/<nav class="nav-panel"/,/<\/nav>/p' app/public/dashboard.html > scratchpad/spec040-navpanel-after.txt
diff scratchpad/spec040-navpanel-before.txt scratchpad/spec040-navpanel-after.txt
# EXPECT: only the 6 settings rows change (button.is-planned → a); everything else in nav-panel identical
```
The sibling `#page-body` md5 for the same file is already proven unchanged by the Step-4 loop — this spot-check
additionally confirms the *only* diff inside the whole file is the nav-panel block, generalized to all 62 by the
mechanism being identical (a single shared sidebar-render function, `nav.config.js` driven).

---

## 3. Source diff surface (must match exactly — see `scope-guard.md` for the full narrative)

```bash
git diff --stat -- app/src      # exactly: nav.config.js, pages/settings.js, fixtures/settings-management.js,
                                 #          fixtures/settings-notifications.js (new), locales/ar.adm.js,
                                 #          locales/en.adm.js, styles/app.css   — 7 paths, no more
git diff -- app/package.json                    # empty
git diff -- app/scripts/build-html.mjs          # empty
git diff -- app/src/js/enhance.js               # empty
git diff -- app/src/js/i18n.js                  # empty
git diff -- app/src/js/components/tabs.js       # empty
git diff -- app/src/js/components/sidebar.js    # empty
git diff -- app/src/js/components/form-field.js       # empty
git diff -- app/src/js/components/settings-section.js # empty
git diff -- app/src/js/components/preview-drawer.js    # empty
git diff -- app/src/js/fixtures/settings.js             # empty
git diff -- app/src/js/pages/staff.js                   # empty
git diff -- app/src/js/fixtures/staff-management.js     # empty
```

---

## 4. Why "body-change budget" replaces "byte-identical" as this spec's headline claim

Every ledger/plan document for Specs 034–039 could truthfully say "N pages changed, 0 bodies changed except the
target's own tab content, sidebar-only elsewhere." Spec 040 cannot say that, because the *content* of the target
page's own tabs is precisely what changes (2 fields → 73). The correct, non-misleading claim — and the one this
contract enforces — is:

> **Exactly 2 of 115 bodies change (by design, the intended surface). Exactly 62 change in the sidebar only
> (mechanical consequence of 6 nav flips). Exactly 51 do not change at all.**

Any plan, PR description, or `CLAUDE.md` entry for Spec 040 that says "all bodies byte-identical" or "nav-only" is
**factually wrong** and must be corrected before merge.

---

## 5. Acceptance

| # | Check | Expectation |
|---|---|---|
| I1 | Preflight (§1 Step 1) | green, HEAD = `58a53e2` |
| I2 | Baseline double-capture agreement (§1 Step 2) | empty diff |
| I3 | Post-edit diff (§1 Step 4) | **exactly 2** differing `#page-body` lines: `settings.html`, `settings.en.html` |
| I4 | Sidebar-only spot-check (§2.1), generalized | nav-panel block differs only in the 6 settings rows; body md5 unchanged |
| I5 | Source diff surface (§3) | matches exactly, no extra file |
| I6 | Page count | `find app/public -maxdepth 1 -name '*.html' \| wc -l` = **115** |
| I7 | No forbidden git operation used (§1 preamble) | manual review of the implementation transcript |
