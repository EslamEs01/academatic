# Contract: Page Count

**Purpose**: Fix the exact public-HTML count and justify each new page.

**MUST**:
- Baseline **97** (verified). **Target 103** (+6 = `staff.html`, `library.html`, `certificates.html` × AR/EN).
- Settings-category items fold into `settings.html` → **0-delta** (finance precedent).
- `certificateRequests`, `materials`, and all six `settings*` items fold (stay `planned`).
- Exactly **3** `PAGES` entries added to `build-html.mjs`; exactly **3** nav flips (`staff`/`books`/`certificates` planned→implemented+route).
- Each new page passes the page-candidate test (grounded · in nav/owner-register · cannot fold cleanly · standalone matches the `admin` rail IA · +2 AR/EN · smoke/a11y/screenshot added).
- No accidental removals; no unrelated additions.

**Verify**: `find public -maxdepth 1 -name '*.html' | wc -l` = 103; build reports 102 static + index; nav build guard green.

**Status**: decided (103). Binding.
