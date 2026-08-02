# Sensitive Data Classification — Spec 043

The 15 data classes the role-visibility matrix (`role-visibility-matrix.md`) scores. Each class has a
definition, a sensitivity tier, and the evidence that makes it sensitive. Tiers: **T1** = anti-poaching /
minor-safety critical (a leak enables taking a family off-platform or exposing a minor); **T2** = privacy /
security sensitive; **T3** = operational, low direct-harm.

| # | Data class | Definition | Tier | Why sensitive (evidence) |
|---|---|---|---|---|
| 1 | **Student name & learning identity** | The child's name + the minimum needed to teach (subject, level, course) | T2 | The name alone is not contact, but combined with locality/contact it identifies a minor; the teacher needs only the minimum learning identity (A-02; `teacher-students.js:5-7`) |
| 2 | **Guardian name** | The parent/guardian's display name | T2 | Identifies the family; on its own low-harm, but a poaching lever when paired with contact/locality (`management-families-1.json`) |
| 3 | **Guardian phone** | The guardian's phone number | **T1** | The single most direct off-platform contact vector; legacy printed it unmasked (`01154859653`) and made it a grantable-to-all permission `Show Parent Phone` (P-01, RJ-11, RJ-37, C12-13) |
| 4 | **Guardian e-mail** | The guardian's e-mail | **T1** | Same off-platform vector; legacy `Show Parent Email` grantable-to-all (`abod11@gmail.com`, C12-13) |
| 5 | **Student phone / e-mail** | The child's own phone/e-mail | **T1** | Direct contact to a minor; refused everywhere (C03-18/-19) |
| 6 | **Address / country / locality** | Home address, country, city, locality | **T1** | A locality signal on a teacher-visible list is a poaching aid — the legacy teacher roster shows a `Country` column (`teacher-studentslist.json`, A-02, `VUT`) |
| 7 | **Teacher private contact** | A teacher's own phone/e-mail/WhatsApp | T2 | Cross-role harvesting; legacy printed teacher phone + a live invite URL on the admin card (P-02/P-03, `management-teachers-1`) |
| 8 | **Staff private contact** | A staff/operator's phone/e-mail | T2 | Cross-role staff leak (the teacher-role Tasks page leaked a Staff Members table, N-5/RJ-20) |
| 9 | **Lead / prospect contact** | A not-yet-customer's parent name + e-mail + phone | **T1** | Anti-poaching: a teacher who reads a lead's phone can take the family off-platform before enrollment; legacy rendered it raw with no role check (`management-new-requests-filter-*`, C03-13, RJ-22) |
| 10 | **Attendance / presence timestamps** | "Student Enter At" / "Teacher Enter At" per class | T2 | Presence-monitoring of a minor and of staff; audience never captured (`management-courseclasses-1.txt`, U-03/UK-26) |
| 11 | **Audit actor identity** | Who performed an action ("Added by / mohamed created") | T2 | A real actor name is PII; the current audit log renders entity/action/date with **no actor field** (`staff-management.js:54-59`); a real actor trail is a 055 concern (`mohamed created`, U-03) |
| 12 | **Meeting / room links** | Per-role `session-class-room/base64(id)/role` join URLs | **T1** | Guessable role-scoped room URLs; a copy-link leak lets an unauthorized party join a minor's class; authorization must be server-side (U-02/P-22, `management-courseclasses-5.html`) |
| 13 | **Certificate records** | A named child's certificate + delivery target | **T1** | Legacy `Send group` pushed a named minor's certificate into a shared WhatsApp group; the preview URL carried `student_name=` (P-06/P-07/N-2/N-3) |
| 14 | **Financial / pay data** | Salary, hour-rate, payout, invoice amount, fine | T2 | Governed by the standing pay-free / zero-pay / no-fake-money laws (teacher pay-free GLOBAL; family zero-pay); 043 keeps the `salary_*` notification row out of teacher view; figures owned by finance/payroll backend |
| 15 | **Integration credentials / secrets** | Provider keys, PANs, passwords, OTP destinations, tokens | **T1** | Legacy rendered Zoom creds + raw PAN (S-01), 15 plaintext provider inputs + 2 `type=password` + saved-key columns (S-04), a shared OTP (S-07); structure-only forever (RJ-26/RJ-30) |

## Notes

- **Financial data (14)** is fully owned by the standing pay/finance laws (Specs 016/025/028/038) and the
  payroll/billing backend; 043 does not re-decide it — it only ensures the pay-adjacent `salary_*` notification
  routing row is never surfaced on a teacher-visible surface, and no pay figure leaks via a privacy surface.
- **"Learning identity" (1)** is the ONE class a teacher legitimately needs: name + subject + level + course of
  an assigned student. Everything a teacher does NOT need to teach (contact, locality, lead data, attribution,
  audit identity, pay) is DENY on teacher surfaces.
- A T1 class rendered to the wrong role is a STOP condition (spec.md §Stop Conditions #2). Masking a T1 class
  for a role that should receive **no** value is insufficient — DENY (data absence) is required.
