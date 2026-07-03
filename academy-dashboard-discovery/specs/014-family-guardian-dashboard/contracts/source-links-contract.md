# Contract: Source Links (Spec 014)

**Status**: Binding · References FR-017, SC-006; the standing zero-body-anchors policy (Spec-013 D7 logic).

## 1. The complete anchor inventory of the family page

| Anchor | Target | Class |
|---|---|---|
| Skip link (shell) | `#page` | real (in-document) |
| Hub switch link (shell) | `portals.html` / `portals.en.html` | real link, language-correct |

**That is the entire set.** The page body contributes ZERO anchors: child cards, session cards, signal cards, notes, history records, subscription rows, billing card, requests-hub cards, material cards, and the account slice are all display-only — the only existing deep surfaces are admin pages, and the guardian persona never lands in admin chrome.

## 2. Rules

Zero `href="#"` (standing sitewide invariant) · zero dead local links (crawl-verified) · every planned/backendRequired affordance is a non-anchor element with a labeled chip · no external URLs · language-correct shell links.

## Acceptance (binding)

1. **Given** both built files, **When** anchors are enumerated, **Then** the set matches the table exactly (smoke `bodyAnchors === 0`).
2. **Given** the smoke crawl, **Then** zero dead targets, zero `href="#"`, zero external requests.
