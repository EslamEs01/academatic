# Shared Interaction System Contract

## Families

| Family | Desktop contract | 390px contract | Initial focus | Dismissal |
|---|---|---|---|---|
| Confirmation | compact centered, one decision | safe full-viewport bounded presentation when necessary | safest action; destructive action is never the automatic safe default | safe Escape/overlay; guarded when dirty/operation-locked |
| Simple form modal | readable medium width, no long scrolling | full-screen dynamic viewport | first meaningful field or heading when field focus is harmful | all paths through dirty/operation guard |
| Detail/preview drawer | contextual full-height drawer | full-screen | heading or logical first control | safe unless state becomes guarded |
| Long/form drawer | stable header, scroll body, stable action footer | full-screen with safe areas/keyboard reachability | heading or meaningful field | all paths through dirty/operation guard |
| Mobile sidebar | existing navigation content inside modal-grade host | full-screen/safe viewport | visible close or current navigation context | Escape/close/overlay safe |
| Dedicated page wizard | existing route/sidebar context | responsive page | current step heading/control | step/departure through dirty guard |
| Dropdown/menu | non-modal anchored popover | viewport-bounded popover | logical menu item | Escape/outside; no modal trap/inert/lock |

## Lifecycle invariants

1. Resolve a required opener and unique target before opening; failure is explicit.
2. Only one modal-grade session, overlay, focus trap, Escape owner, and body lock may exist.
3. Opening, transitioning, and closing are idempotent and race-safe.
4. Background content is unavailable to pointer, keyboard, and assistive technology while modal-grade state is active.
5. Scroll lock compensates for scrollbar width and restores the exact prior position/state.
6. Safe dismissal closes; dirty or real-operation dismissal invokes the guard.
7. The discard guard uses the active surface, not a nested modal.
8. Teardown removes only state owned by the session and restores the exact opener when possible.
9. Reduced-motion preference bypasses unnecessary motion without changing state order.

## Required markup semantics

- Each modal-grade surface has a unique accessible name, modal dialog semantics, and description where needed.
- Header contains title and accessible close/back control.
- Long surfaces expose one independently scrolling content region.
- Action-bearing long surfaces expose one stable action region.
- Form surfaces expose one validation summary region and one operation-status live region without duplicate IDs.
- Presentation classification is explicit in authored source and generated markup; missing/unknown classification is an error.

## Forbidden behavior

- missing-target toast fallback;
- nested modal-grade surface, overlay, trap, or body lock;
- first-DOM-focusable policy without interaction-purpose reasoning;
- fake loading, random delay, fake error, fake save, or persisted claim;
- page-specific focus trap, scroll lock, overlay, or z-index workaround;
- persistent sensitive draft state;
- manual generated HTML edits;
- required selector catch/skip/optional assertion.

