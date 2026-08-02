# Teacher Interaction Inventory

## Portal family

The eight portal pages have no page-local modal/drawer targets at baseline. They use:

- shared role portal shell;
- native mobile `details` navigation;
- real internal links where implemented;
- non-persistent filter/tab behavior where added;
- truthful backend-required notes/gates.

No portal page may fork Spec-044 modal-grade behavior.

## Administrator directory

Per locale baseline:

- three direct tabs: directory, Add Teacher, Categories;
- one Add form and 33 controls across the page/template inventory;
- eight Teacher detail drawer openers and nine total drawer targets including edit;
- eight row menus;
- five filters;
- six backend-required gates.

Direct Add/Categories surfaces remain route-resolvable with zero extra opening click. Remaining drawers/menus use shared controllers.

## Administrator detail

Per locale baseline:

- eight content tabs;
- 11 drawer openers and 16 targets;
- nine confirmations;
- five non-modal menus;
- two modal triggers;
- six backend-required gates;
- deep navigation to verified course/group/student/family/schedule/attendance destinations.

All opener/target/closer/focus/dirty/scroll/viewport mappings must be revalidated after composition changes.

## Administrator performance

Per locale baseline:

- three tabs;
- one filter form with five controls and four filters;
- one existing backend-required gate;
- profile navigation.

Filters remain client-side and the page remains display-only.

## Action classification

| Family | Real client behavior | Navigation | UI-only | Backend-required / unavailable |
|---|---|---|---|---|
| Portal | nav disclosure, library filters | eight internal pages/hub | authored view state | live, save, upload/download, requests |
| Directory | filters/sort/page/tabs/menus | detail/direct tabs | previews | add/edit/category/assign |
| Detail | tabs/menus | verified deep links | previews/policy display | edit/note/assign/availability/confirm actions |
| Performance | tabs/filters | profile | authored comparisons | no computation/export/mutation |

Required selectors and mappings are never optional and may not be wrapped in a silent catch.
