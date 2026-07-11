# Page-vs-Fold Decision Register — Spec 039

For each scoped surface: current surface · legacy capability · proposed route · page base · AR/EN output impact ·
navigation impact · fixture impact · reason · owner · count delta.

| Surface | Current surface | Legacy capability | Proposed route | Page base | AR/EN output | Nav impact | Fixture impact | Reason | Owner | Count Δ |
|---|---|---|---|---|---|---|---|---|---|---|
| **materials** (target) | `library.html` Materials tab (built, unreachable from sidebar) | Course-taxonomy CRUD (name/name_ar) | **`library.html#view=materials`** (deep-link) | none (existing `library`) | 0 new files | `materials` `planned→implemented`; drop `FUTURE_ROUTES.materials` | none | Materials tab already exists (Spec 031); the enhance.js `#view=` deep-link is already valid | 039 | **0** |
| **certificateRequests** (target) | `certificates.html` Requests tab (built, unreachable from sidebar) | Requests queue + Approve modal | **`certificates.html#view=requests`** (deep-link) | none (existing `certificates`) | 0 new files | `certificateRequests` `planned→implemented` | none | Requests tab already exists (Spec 031); `#view=requests` already used by a11y/screenshot suites | 039 | **0** |
| **books/content library** (dep) | `library.html` (implemented; opens Materials tab) | Media library (types/categories/views/downloads) | keep `library.html` **or** refine → `library.html#view=books` | none | 0 | optional route refinement (recommended) | none | Complete & reused; refinement disambiguates the two library items | 039 | **0** |
| **certificate templates + designer** (dep) | `certificates.html` Templates tab + static designer preview | Templates list + real drag/PDF designer | keep `certificates.html` (Templates default tab) | none | 0 | none | none | Complete-and-reused (frontend-honest static preview); real editor = future backend | 039 / future-backend | **0** |
| **teacher/family library** (context) | portal pages (separate app) | read-only browse/search | — (unchanged) | none | 0 | none | none | Out of admin scope; read-only; no portal redesign | out-of-scope | **0** |

## Options quantified (as required)
- **Option A — new standalone pages** (`materials.html` + `certificate-requests.html`, ×2 lang each): **+4 files
  → count 119**, duplicates the existing library/certificates tabs, splits the content/certificate IA, and forces
  either duplicated fixtures/tables or cross-page includes. **REJECTED** — duplication + violates "smallest honest
  architecture"; contradicts the Spec 033 roadmap (deep-link, count 0).
- **Option B — deep-link to existing tabs**: **0 new files → count 115**, no duplication, clear URLs
  (`#view=materials`, `#view=requests`), satisfies the Spec 033 ownership register, keeps the sidebar honest.
  **RECOMMENDED.**
- **Option C — honest lock/defer**: leave the two items «قريبًا». **REJECTED** — dishonest: the safe frontend
  surfaces already exist and are reachable by hash; leaving «قريبًا» violates the core "no قريبًا if a safe
  surface can be shown" law.

**Decision: Option B.** New standalone pages are NOT forced by the "Explicit Pages" roadmap title — the honest
"explicit destination" is a labelled, reachable deep-link into a built tab.
