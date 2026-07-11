# Contract — Books Route Refinement (Spec 039)

## Decision: ACCEPTED (recommended safe default)
`books`: `route:'library.html'` → `route:'library.html#view=books'`.

## Rationale
`library.html` defaults to the first tab (Materials). Once `materials` has its own deep-link, the Content-Library
(«الكتب») item should open the **Books** tab explicitly so the two library items are distinct. Mirrors Spec 038's
per-item `#view=` discipline. **Count impact 0; no body/fixture/locale impact** (nav route string only).

## Target surface (existing, 0-diff — `pages/library.js` Books tab)
Media catalog: `BOOKS` (6); types file/video/image/audio/link; categories; authored views/downloads literals;
`filterBar` (search + type + category); `lib-cats` + `lib-item` drawers; uploads = gates (**no `type=file`**).

## Behavior
- `library.html#view=books` opens the Books tab on fresh load; EN `library.en.html#view=books`.
- `build-html.mjs` PAGES `activeId:'books'` for the library page is unchanged (sidebar active-pill unaffected).

## Acceptance
`books` anchor href = `library.html#view=books` (AR) / `library.en.html#view=books` (EN); fresh-load shows the
Books panel. If evidence ever contradicted the refinement, fall back to `books`→`library.html` (still valid).
