# Contract — Dashboard Filter Widget (DU-20)

**MUST**: the dashboard "Today's Sessions" Apply/Clear widget stops imitating a working filter. Option A: wire to the real `data-filter` engine (closed hooks). Option B: reword/remove so it is not presented as a filter. Never a «preview action» toast pretending to filter.

**Acceptance**
- If Option A: Apply actually filters via `data-filter-form`/`-apply`, Clear resets via `-reset`; no new hook.
- If Option B: no Apply/Clear controls presenting as a filter; a static "showing today / عرض اليوم" label instead.
- Smoke asserts the widget is honest (either filters, or is not a filter control).
- **Fail** if `data-action="apply-filter"/"clear-filter"` remain unhandled and toast a preview.
