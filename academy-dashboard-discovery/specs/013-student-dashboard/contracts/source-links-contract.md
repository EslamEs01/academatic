# Contract: Source Links (Spec 013)

**Status**: Binding · References FR-015, SC-005; research D7.

## 1. The complete anchor inventory of the student page

| Anchor | Target | Class |
|---|---|---|
| Skip link (shell) | `#page` | real (in-document) |
| Hub switch link (shell) | `portals.html` / `portals.en.html` | real link, language-correct |

**That is the entire set.** The page body contributes ZERO anchors: course cards, material cards, homework items, history records, celebration cards, and the profile card are all display-only (research D7 — the only existing course/material/history surfaces are admin pages, and the child persona never lands in admin chrome).

## 2. Rules

- Zero `href="#"` (standing sitewide invariant, smoke `deadHash === 0`).
- Zero dead local links (crawl-verified against built files).
- Every planned/backendRequired affordance is a non-anchor `<div>` mini-card (never a link that goes nowhere).
- No external URLs of any kind.
- Language correctness: AR page links `.html`, EN page links `.en.html` (shell already handles this).

## Acceptance (binding)

1. **Given** both built files, **When** anchors are enumerated, **Then** the set matches the table above exactly.
2. **Given** the smoke crawl, **Then** zero dead targets, zero `href="#"`, zero external requests.
