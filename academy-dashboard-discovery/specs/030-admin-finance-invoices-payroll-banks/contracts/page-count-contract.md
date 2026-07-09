# Contract — Page Count

**Guarantee**: public HTML count stays **97**; ZERO new pages; `nav.config.js` 0-diff.
- All finance sub-domains FOLD into the `finance.html` tabbed hub (Overview·Salaries·Banks + folded sub-sections).
- Standalone candidates (invoices/salaries/banks) fail the page-candidate test at Q3 (fold cleanly into tabs).
**Verify**: `find public -name '*.html' | wc -l` == 97 before AND after; nav.config 0-diff; smoke asserts count.
**Fail if**: count ≠ 97; any new page; any page removed; nav.config changes unexpectedly.
