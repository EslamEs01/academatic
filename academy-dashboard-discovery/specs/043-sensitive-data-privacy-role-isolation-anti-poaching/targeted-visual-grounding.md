# Targeted Visual Grounding — Spec 043

**Purpose**: the honest grounding trace for Spec 043 — which screenshots were opened AS IMAGES, which raw
JSON/HTML records were read, which current-app source files were inspected, and what each proved. Per
`contracts/evidence-reuse-and-targeted-grounding-contract.md` (Spec 042) §1 steps 4–6: a filename is not
inspection; extracted text is not evidence of layout; the raw record beats every summary; honest reopen counts
are mandatory. Nothing under `app/**` was written. **No live auth-token/cookie value was read or quoted** — only
structural facts (cookie names, flags, expiry semantics) already documented in the Spec-042 audits.

Paths are relative to `academy-dashboard-discovery/`.

## 1. Honest reopen counts

| Channel | screenshots opened AS IMAGES | JSON records read | raw HTML/text read | current source files read | rendered pages inspected |
|---|---|---|---|---|---|
| Author (this session, direct) | **8** | (grep reads) | **3** (`courseclasses-1.txt`, `courseclasses-5.html`, `certificate-requests.html`) | (via prior reads) | — |
| Agent A — privacy/anti-poaching (Opus) | 8 | 7 | 2 | 3 | 2 |
| Agent B — RBAC/auth (Opus) | 8 | 8 | 4 | 12 | 0 |
| Agent C — evidence-path inventory (Sonnet) | 0 (path/existence only) | 0 | 0 | (registers) | 0 |
| Agent D — current-exposure inventory (Sonnet) | 0 | 0 | 0 | 24 | 6 |
| Agent E — protected-test/mutation (Sonnet) | 0 | 0 | 0 | 6 (3 tests + 3 src) | 0 |
| **Effort total** (with some screenshot overlap on the two 170-matrices + WhatsApp frames) | **24 opens** (≈18 distinct) | **15** | **9** | **≈48** | **8** |

**Corpus sanity (Agent C, not a recount of the frozen inventory)**: `find output -name '*.png' | wc -l` =
**1113** (matches record); `output/roles/admin/pages/*.json` = **300** (matches the 300/26/13 = 339 split).
**Evidence-path existence: 75/75 owned-row paths exist on disk, 0 missing.**

## 2. Screenshots opened AS IMAGES by the author (one-line pixel proof each)

1. `output/roles/admin/screenshots/management-admins-permission-6-full.png` — the 170-permission per-member
   grant board: 17 groups, group-lead + child checkboxes ALL checked, live counter "170/170 permissions
   selected", global Select All/Clear All + per-group Clear All; **`Show Parent Phone` + `Show Parent Email`
   visible in the Families group**, plus pay rows (Show Teacher/Student Rate, Show Salaries Page) and the
   untranslated `permessions.show_agenda` leak.
2. `output/roles/admin/screenshots/management-admins-permission-7-full.png` — member-7 variant, pixel-identical
   grant board, also 170/170.
3. `output/roles/admin/screenshots/management-settings-integrations-whatsapp-families-insights-full.png` —
   "Names of Null groups": row 1 real guardian `abdo ahmed / abod11@gmail.com / 01154859653`, row 2 named child
   + `441200480244`, both chipped "Active".
4. `output/roles/admin/screenshots/management-settings-integrations-whatsapp-teachers-insights-full.png` — one
   row: teacher `المعلم محمد صادق صادق / msadeqx9 / 201278910727` and a **live
   `https://chat.whatsapp.com/HNeGQ2J7HDzJAHmLKyIcIK?...` group-invite URL rendered in the Group Name cell**.
5. `output/roles/admin/screenshots/management-teachers-1-full.png` — teacher profile: **`List of Students` ·
   `Left Students` · `Acquired Students`** attribution tables; left card phone `201278910727`, the live invite
   URL, `Hour Rate: 120 EGP`; action list `Edit · Send Reset Password · On Vacation · Login as … · Deactivate ·
   Delete`; tabs incl. `Compensations · Salary · Settings · Activity`.
6. `output/roles/family/screenshots/student-profile-edit-full.png` — the family login's "profile" edits the
   **child** identity (First Name `الطالبة لمار` / Last Name `حسن`, e-mail `alaashapan1996`) + a
   Change-Password card (Old/New/Confirm, all masked) — proof the guardian owns the child; no student login.
7. `output/roles/teacher/screenshots/teacher-studentslist-full.png` — the TEACHER's own roster: columns
   `# · Student Name · Country · Course · History · Schedule · Report For Student · all plans · certificate`;
   row 1 `محمد احمد | VUT | arabic | …` — **a Country/locality column visible to the teacher** (A-02).
8. `output/roles/admin/screenshots/management-profile-edit-full.png` — admin own profile edit: real operator
   `Eslam Essam` / `eslammekky@gmail.com` / username `eslam` + a Password field on the identity form (raw HTML:
   `<input type="text" name="password">`, no old-password, no confirm — S-02/RJ-23).

## 3. Raw records read directly by the author (field/workflow facts)

- `output/roles/admin/text/management-courseclasses-1.txt` — the class TimeTable presence log:
  **`Student Enter At 2026-06-20 19:55:34`**, **`Teacher Enter At 2026-06-20 04:03:01`**, `Remind Teacher At`,
  `Class Recording — No recording available`, `Direct Links`, `Timeline`, **`mohamed created`** (audit actor).
- `output/roles/admin/html/raw/management-courseclasses-5.html` — the "Direct Links" role→URL table:
  `session-class-room/NQ==/1` (Student), `/2` (Teacher), `/3` (Admin) — one class → three role-scoped rooms
  keyed by `base64(id)/role` (guessable; authorization must be server-side — U-02/P-22).
- `output/roles/admin/html/raw/management-certificate-requests.html` — `<option value="group">Send group`
  (P-06/N-2) · `student_name=` in the preview URL (P-07/N-3) · `window.open` (all refused).

## 4. Agent-grounded facts adopted (each traced to a cited path in the agent reports; full reports summarized
into the owned-row and register artifacts)

- **Parent-contact permission vocabulary (Agent B, `management-admins-permission-6.html`)**: the ONLY two named
  PII-gating permissions in the entire 170-set are `value="parent-phone"` (**Show Parent Phone**) and
  `value="parent-email"` (**Show Parent Email**), both in the `families` group. There is no per-teacher/
  per-student contact toggle. → the exact vocabulary for `parent-contact-default-deny-contract.md`.
- **Impersonation is ungovernable (Agent B)**: ZERO login-as/impersonate rows in the 170-permission matrix, but
  live `Login as …` + `Send Reset Password` buttons exist on `management-teachers-1.json` and
  `management-families-1.json` — an ungated capability with no matching permission. → `credentials-secrets-and-
  auth-refusal-register.md` (drop or honest-gate; never fake).
- **`academatic_session` ships `secure:false` (Agent B, structure-only)** — a transport defect the future
  session design must not replicate (RJ-33/C15-05); family login authenticates as `remember_student_*` (the
  cookie-layer proof the family IS the student login).
- **Current app is clean (Agent D, file:line)**: 0 real-PII tokens in `src/`+`public/`; 0 external hosts (only
  `www.w3.org` ×114); 0 `type=password`/`type=file`(real)/`<canvas>` in built pages; 24 structure-only provider
  rows (`settings-management.js`, `settings.js:78-86` `structRow`, no value slot); `PERM_GROUPS` 22 rows (18
  granted / 4 not-granted) with **no parent-contact row** (G-01, `staff-management.js:34-45`); fam1-only guardian identity on all 9
  family-portal pages; DST table is 4 columns with no Affected-Accounts (`time-converter.js:110-133`); join is a
  `backendRequired` gate (`appointment-details.js:47`); no wording claims real auth exists (0 hits for
  `مصرّح|authorized|logged in|مسجّل الدخول`).
- **G-03 test-supersession points (Agent E, exact lines)**: removing the child-view password gate requires a
  DECLARED SUPERSESSION at `tests/smoke/run.cjs:1971` (`plannedBackend === 3` → `2`, comment
  "photo/save/password" → "photo/save") and `:2082` (`'student-profile': 3` → `2` in the `expPlanned` map).
  **`family-profile` (assert 2007 / map 2083) and `teacher-profile` (assert 2020 / map 2084) MUST stay
  untouched** — the guardian and teacher are real account holders. R-2 (`a11y/run.cjs:393`) and R-3
  (`capture.cjs:556`) quoted verbatim, unmodified.

## 5. Conflicts recorded (never smoothed — `contracts/evidence-reuse-and-targeted-grounding-contract.md` §3)

1. **WhatsApp-insights JSON row-count understates the leak (Agent A).** Both insights records report
   `tables[0].rows = 0`, but the pixels show real rows (the DOM renders them as `<h6>`-titled cards, not
   `<td>`). The real PII exposure (unmasked phones + e-mail + live invite URL) is **worse** than any Spec-042
   count derived from `tables[].rows` — reinforcing RJ-11/N-4. Resolution: the raw pixels + raw HTML win; the
   refusal is unchanged (never port).
2. **`Country` is TEACHER-visible, not merely admin-visible (Agent A).** `teacher-studentslist.json` exposes a
   `Country` column to the teacher role (pixel-confirmed `VUT`). This strengthens the A-02 anti-poaching case;
   the current app correctly drops it. No policy change — the refusal widens, never narrows.
3. **C09-19 has no page-level evidence (Agent C).** "RBAC enforcement (FO-16)" is a cross-cutting concept row
   whose nearest real evidence is the C12 permission matrix, not any C09 page. Recorded honestly in
   `owned-row-reconciliation.md`; the row's disposition (`FUTURE_BACKEND`) is unaffected — enforcement is a
   backend prerequisite regardless of which cluster holds the matrix pixels.
4. **UK-18 partial-matrix rendering is inferred, not observed (Agent B).** Both captured members are 170/170;
   a partially-granted state was never captured. Kept `UNKNOWN_EVIDENCE` — the controls make partial states
   obviously supported, but 043 does not assert a rendering it never saw.

All four conflicts resolve in the direction of a stronger or unchanged refusal; none licenses an invention.
