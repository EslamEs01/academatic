# Live Interaction Inventory — Spec 044 Final

**Authority:** accepted baseline at commit `7d2397b110f8d3311402d02f93719395b7d46e68` plus the rebuilt working tree, both recursively traversed through nested template content. Final counts are enforced by `app/tests/interaction/inventory.cjs`.  
**Parity rule:** each AR route below has one structurally matching `.en.html` consumer. `index.html` is a redirect with no interaction.  
**Legend:** `F` = form target using direct controls; `D` = details/preview target. A nested form does not reclassify its containing detail target. `Cfm` = confirmation triggers; `Gen` = generic modal triggers; `Menus` = row/global dropdown openers; `Side` = mobile-sidebar openers; `Wiz` = dedicated-page wizard; `Backend` = disabled-reason uses of the global backend key (the wizard’s additional modal-key use is accounted separately).

## Route-by-route generated consumer inventory

| Route body | Drawer targets (F=form, D=details) | Cfm | Gen | Menus | Side | Wiz | Backend |
|---|---|---:|---:|---:|---:|---:|---:|
| add-family | — | 0 | 1 | 8 | 1 | 1 | 0 |
| announcements | — | 0 | 0 | 8 | 1 | 0 | 0 |
| attendance | out1:D, fb-add-out1:F, out2:D, fb-add-out2:F, out3:D, out4:D, out5:D, out6:D, fb-add-out6:F, out7:D, out8:D, out9:D, out10:D, out11:D, fb-add-out11:F, out12:D, out13:D, fb-add-out13:F, out14:D, out15:D | 18 | 0 | 23 | 1 | 0 | 5 |
| certificates | cert-tpl:F, cr-cr1:D, cr-cr2:D, cr-cr3:D, cr-cr4:D, cr-cr5:D, cert-create:F | 4 | 0 | 8 | 1 | 0 | 1 |
| course | b14:D, b4:D, b6:D, out1:D, fb-add-out1:F, out11:D, fb-add-out11:F, out4:D, crs-enroll:D, crs-assign-teacher:D, crs-edit:F, grp-add:F | 4 | 2 | 11 | 1 | 0 | 4 |
| courses | crs-add:F | 0 | 0 | 8 | 1 | 0 | 1 |
| dashboard | s1:D, s2:D, s3:D, s4:D, s5:D, sess-new:F | 5 | 0 | 13 | 1 | 0 | 1 |
| families | fam-edit:F, fam-cat:F | 0 | 0 | 16 | 1 | 0 | 1 |
| family-billing | — | 0 | 0 | 3 | 0 | 0 | 0 |
| family-child | — | 0 | 0 | 3 | 0 | 0 | 0 |
| family-children | — | 0 | 0 | 3 | 0 | 0 | 0 |
| family-materials | — | 0 | 0 | 3 | 0 | 0 | 0 |
| family-portal | — | 0 | 0 | 3 | 0 | 0 | 0 |
| family-profile | — | 0 | 0 | 3 | 0 | 0 | 0 |
| family-progress | — | 0 | 0 | 3 | 0 | 0 | 0 |
| family-requests | — | 0 | 0 | 3 | 0 | 0 | 0 |
| family-schedule | — | 0 | 0 | 3 | 0 | 0 | 0 |
| family | b14:D, b4:D, b6:D, b5:D, b3:D, b12:D, fam-cat:F, fam-edit:F, fam-child:F, fam-note:F | 8 | 2 | 8 | 1 | 0 | 3 |
| finance | inv-inv1:D, inv-inv2:D, inv-inv3:D, inv-inv4:D, inv-inv5:D, inv-inv6:D, inv-inv7:D, inv-inv8:D, inv-inv9:D, bank-add:F | 25 | 1 | 8 | 1 | 0 | 1 |
| gallery | — | 0 | 0 | 8 | 1 | 0 | 0 |
| group | b14:D, b4:D, out1:D, fb-add-out1:F, out11:D, fb-add-out11:F, grp-assign:D, grp-assign-teacher:D, grp-edit:F | 3 | 1 | 10 | 1 | 0 | 3 |
| groups | grp-add:F | 0 | 0 | 8 | 1 | 0 | 1 |
| leads | lead-l1:F, lead-l2:F, lead-l3:F, lead-l4:F, lead-l5:F, lead-l6:F, lead-l7:F, lead-l8:F, lead-new:F | 0 | 0 | 8 | 1 | 0 | 0 |
| library | mat-add:F, mat-edit:F, lib-cats:F, lib-item:F | 12 | 0 | 8 | 1 | 0 | 4 |
| messages | msg-c1:D, msg-c2:D, msg-c3:D, msg-c4:D, msg-c5:D, msg-group:F, msg-member:F | 0 | 0 | 8 | 1 | 0 | 0 |
| portals | — | 0 | 0 | 2 | 0 | 0 | 0 |
| public-holiday | — | 0 | 0 | 8 | 1 | 0 | 0 |
| reports | rep-fb-fb1:D, rep-fb-fb2:D, rep-fb-fb3:D, rep-fb-fb4:D, rep-fb-fb5:D, rep-fb-fb6:D, rep-fb-fb7:D, rep-fb-fb8:D, rep-fb-fb9:D, rep-fb-fb10:D, rep-fb-fb11:D, rep-fb-fb12:D, rep-fbcat:F, fb-create:F, rep-form-frm1:D, rep-form-frm2:D, rep-form-frm3:D, rep-form-frm4:D, rep-form-frm5:D, form-create:F | 25 | 2 | 8 | 1 | 0 | 2 |
| schedule-search | ss-ss1:D, ss-ss2:D, ss-ss3:D, ss-ss4:D, ss-ss5:D, ss-ss6:D, ss-ss7:D, ss-ss8:D, ss-ss9:D, ss-ss10:D, ss-ss11:D, ss-ss12:D | 0 | 0 | 8 | 1 | 0 | 0 |
| schedule | b14:D, b15:D, b16:D, b1:D, b2:D, b3:D, b4:D, b5:D, b6:D, b12:D, b13:D, b7:D, b8:D, b9:D, b10:D, b11:D | 16 | 0 | 8 | 1 | 0 | 0 |
| scheduled-actions | — | 0 | 0 | 8 | 1 | 0 | 0 |
| sessions-analysis | — | 0 | 0 | 8 | 1 | 0 | 0 |
| sessions | s1:D, fb-add-s1:F, s2:D, s3:D, s4:D, s5:D, s6:D, s7:D, fb-add-s7:F, s8:D, s9:D, s10:D, fb-add-s10:F, sess-new:F | 25 | 0 | 18 | 1 | 0 | 4 |
| settings | head-add:F, integ-stripe:F, integ-paypal:F, integ-mollie:F, integ-xpay:F, integ-payoneer:F, integ-paymob:F, integ-custom:F, integ-paymob-payout:F, integ-payoneer-payout:F, integ-whatsapp:F, integ-email:F | 1 | 0 | 8 | 1 | 0 | 1 |
| staff | st-view-st1:D, st-view-st2:D, st-view-st3:D, st-view-st4:D, st-view-st5:D, st-perm:D, st-cat:D, st-activity:D, staff-add:F, staff-edit:F, staff-dup:F | 0 | 1 | 13 | 1 | 0 | 3 |
| student-history | — | 0 | 0 | 3 | 0 | 0 | 0 |
| student-homework | — | 0 | 0 | 3 | 0 | 0 | 0 |
| student-materials | — | 0 | 0 | 3 | 0 | 0 | 0 |
| student-portal | — | 0 | 0 | 3 | 0 | 0 | 0 |
| student-profile | — | 0 | 0 | 3 | 0 | 0 | 0 |
| student-progress | — | 0 | 0 | 3 | 0 | 0 | 0 |
| student-schedule | — | 0 | 0 | 3 | 0 | 0 | 0 |
| student | b14:D, b4:D, b6:D, stu-enroll:D, stu-assign:D, stu-move:D, stu-edit:F, stu-note:F | 5 | 1 | 8 | 1 | 0 | 2 |
| students | st1:D, st2:D, st3:D, st4:D, st5:D, st6:D, st7:D, st8:D, st9:D, st10:D, st11:D, st12:D, st13:D, st14:D, stu-add:F, stu-edit:F | 0 | 0 | 22 | 1 | 0 | 2 |
| tasks | task-new:F, task-section:F | 0 | 0 | 8 | 1 | 0 | 0 |
| teacher-library | — | 0 | 0 | 3 | 0 | 0 | 0 |
| teacher-outcomes | — | 0 | 0 | 3 | 0 | 0 | 0 |
| teacher-performance | — | 0 | 0 | 8 | 1 | 0 | 0 |
| teacher-portal | — | 0 | 0 | 3 | 0 | 0 | 0 |
| teacher-profile | — | 0 | 0 | 3 | 0 | 0 | 0 |
| teacher-reports | — | 0 | 0 | 3 | 0 | 0 | 0 |
| teacher-schedule | — | 0 | 0 | 3 | 0 | 0 | 0 |
| teacher-students | — | 0 | 0 | 3 | 0 | 0 | 0 |
| teacher-tasks | — | 0 | 0 | 3 | 0 | 0 | 0 |
| teacher | b14:D, b4:D, b6:D, out1:D, fb-add-out1:F, out4:D, out10:D, out11:D, fb-add-out11:F, out15:D, trn-assign-course:D, trn-assign-group:D, trn-availability:D, trn-policy:D, trn-edit:F, trn-note:F | 9 | 2 | 13 | 1 | 0 | 4 |
| teachers | sara:D, mohammed:D, layan:D, abdullah:D, reem:D, nora:D, khalid:D, huda:D, trn-edit:F | 0 | 0 | 16 | 1 | 0 | 3 |
| time-converter | — | 0 | 0 | 8 | 1 | 0 | 0 |

## Exact totals and mappings

- Per locale: 229 static `data-drawer` triggers, 75 row-menu triggers, 234 recursive targets, 72 direct form targets, 162 detail targets, 160 confirmations, 13 generic modal triggers, 405 menu openers, 32 sidebar openers, one wizard.
- Localized totals: 458 static drawer triggers, 150 row-menu triggers, 468 targets, 144 form targets, 324 details targets, 320 confirmations, 26 generic modals, 810 menu openers, 64 sidebar openers, two wizard page instances.
- Global backend key: seven direct authored consumer files; 40 generated page consumers (20 AR/20 EN); 94 localized consumer instances (47/47).
- Dynamic row-menu resolution is defined in the inventory contract and must be executed by the permanent guard; family/staff/student/teacher menu trigger IDs are entity identities, not missing target IDs.
- All targets carry explicit family/presentation metadata and close through the shared controller. Authored template close controls expose both the compatible `data-sheet-close` hook and `data-interaction-close`; confirmation/generic/sidebar controls are generated by the same controller.
- Locale structure is exact at baseline. Direction is AR/RTL and EN/LTR. Theme is global light/dark/system; current markup does not encode per-target theme variants.
- Form primary actions are in stable footers and reach shared dirty, validation, and in-surface backend-required states without persistence or fake success. Modal-grade loading and recoverable-operation-error applicability remains zero because the inventory contains no real asynchronous operation.

## Duplicate-ID defect

The baseline had three fixed feedback field IDs repeated on five logical pages per locale (30 localized duplicate-ID records) plus ten duplicate target records. Final outcome-scoped target/field identity reduces both duplicate counts to exactly zero; the recursive guard rejects any recurrence.

## Source mapping

- Shared target markup: `src/js/components/preview-drawer.js`.
- Confirmation data contract: `src/js/components/confirm-modal.js`.
- Dedicated wizard: `src/js/components/wizard.js` and the `add-family` page source.
- Nested feedback and identity defect: `src/js/components/outcome-details.js`.
- Dropdown behavior and dynamic menus: `src/js/components/dropdown.js` plus `src/js/enhance.js` menu factories.
- Mobile sidebar content/host: `src/js/components/drawer.js`, sidebar components, and `src/js/enhance.js`.
- Page/component producers own the target IDs shown above; `build-html.mjs` owns their bilingual generated mapping.

The permanent inventory script must reproduce every record and fail on any unclassified, missing, duplicated, unresolved, silently ignored, or source/generated-mismatched consumer.
