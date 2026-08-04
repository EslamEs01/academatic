# Responsive, Locale, Theme, and Accessibility Contract

Every modified surface and applicable state must pass Arabic/RTL and English/LTR, light/dark, desktop/tablet, and exactly 390px.

At 390px:

- root and surface widths do not exceed the viewport;
- no required control, action, field, toast, error, tab, filter, or heading is clipped or off-screen;
- dense schedules/tables/cards/actions use an evidence-based transformation;
- horizontal scrolling is absent unless an existing documented semantic table exception is unavoidable;
- translated text wraps without fixed-width failure;
- interactive surfaces retain Spec-044 safe viewport behavior.

Accessibility:

- semantic headings/landmarks/tables/lists and accessible names remain correct;
- focus is visible and logical;
- filters/tabs/menus/actions are keyboard usable;
- status and validation meaning is not color-only;
- reduced motion and shared dialog semantics remain;
- zero critical/serious automated findings and zero manual trap/focus/background-leak defects.
