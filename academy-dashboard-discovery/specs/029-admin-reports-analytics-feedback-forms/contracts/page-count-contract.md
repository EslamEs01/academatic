# Contract — Page Count

**Guarantee**: public HTML count stays **97**; ZERO new pages.
- Feedback + forms + analytics FOLD into `reports.html`; every menu candidate fails the page-candidate test (foldable/drawer-serviceable).
- Any new page requires: legacy-grounded + in admin menu + un-foldable + un-drawerable + AR/EN delta + added coverage. None qualifies in 029.
**Verify**: `find public -name '*.html' | wc -l` == 97 before AND after; smoke asserts count.
**Fail if**: count ≠ 97; any new standalone page added; any page removed.
