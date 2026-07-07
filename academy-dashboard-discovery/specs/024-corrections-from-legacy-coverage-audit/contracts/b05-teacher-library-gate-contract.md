# Contract: B-05 — Teacher library gate (Should fix)

**Problem**: teacher library is retained in fixtures (`TEACHER_PREVIEW.materials` + `matUpload`) but absent from `ROLE_NAV.teacher` — the one teacher internal with no visible planned gate (M-03).

## Chosen: Option A (with fallback)

**Option A** — add ONE honest planned `library` item to `ROLE_NAV.teacher` in `app/src/js/fixtures/portal.js`:
- `{ id: 'library', labelKey: 'prt.nav.tch.library', icon: 'book'|'materials', page: 'teacher-library', status: 'planned' }`.
- Add mirrored `prt.nav.tch.library` keys in `ar.prt.js` / `en.prt.js`.
- Renders as a non-anchor `is-planned` «قريبًا» button (existing pattern). Owner = Spec 025 (builds the real page).

**Fallback Option B** — if a 7th teacher nav item crowds the rail: record a decision to fold materials into an owned Spec 025 page (no nav item). Either way the decision is recorded.

## Forbidden

- Building any teacher internal page in 024.
- A fake library page or a real anchor to a non-existent page.
- New hook / storage key.

## Acceptance

- Teacher library has an honest «قريبًا» presence OR a recorded 025 fold decision.
- If a nav item is added: it is a non-anchor button; smoke `plannedNavAnchors===0` holds; ROLE_NAV.teacher planned-count expectation bumped 6 → 7 (declared).
- ar/en labels mirrored; pay-free (library copy carries no pay token).

**Owner**: 024-correction (Should fix) → page owned by 025.
