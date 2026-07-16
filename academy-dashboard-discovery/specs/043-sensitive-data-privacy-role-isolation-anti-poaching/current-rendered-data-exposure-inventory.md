# Current Rendered-Data Exposure Inventory — Spec 043

What sensitive-class data the CURRENT app renders today, where, with file:line proof. Read-only inventory of
`app/` (grounding Agent D, cross-checked against the author's own reads). Verdict per row: **clean** (no privacy
risk) or **needs-043-rule** (a policy/completeness gap 043 must name). The app is fixtures-only with **no auth
guard** by standing constraint — so "who can see it" is always "anyone who opens the file"; enforcement is
`FUTURE_BACKEND`. This inventory proves the current posture that 043 freezes.

## Contact data by surface family

| Surface | What renders | file:line | Verdict |
|---|---|---|---|
| **Teacher pages** (`teacher-*.js`) | grep `phone\|email\|whatsapp` on guardian/student contact = **0 hits** | all 15 `teacher-*.js` | **clean** — anti-poaching AP-1…AP-4 satisfied |
| Teacher own profile | teacher's OWN synthetic e-mail | `teacher-profile.js:53` → `en.prt.js:449` (`sara@academy.example`) | clean — own data, matrix cell 7 note 9 |
| **Family portal** (`family-*.js`) | guardian's OWN contact only | `family-profile.js:49` → `ar.fam.js:196` (`ghamdi.family@example.edu`) | clean — matrix cell note 2; fam1 only |
| **Child-view** (`student-*.js`) | grep contact = **0**; guardian NAME + CITY only | `student-profile.js:61-62` | clean — matrix cells 3/4 CV=DENY |
| **Admin family/student** | synthetic guardian phone/e-mail/whatsapp | `families.js:19-20` → `ar/en.fam.js:192-201`; `family.js:59-61`, `student.js:146` | clean — admin cross-link, synthetic |
| **Admin staff** | synthetic masked phone (`05xx-xx-NNNN`) | `staff-management.js:23-27`; `staff.js:33-34` | clean |
| **Admin leads** | synthetic sequential contact + prospect child age | `control-center.js:55-69`; `leads.js:51-52,68,98-99` | clean — admin-only CRM, synthetic; **needs-043-rule**: enforcement that leads are admin-only (C03-13) is FUTURE_BACKEND |

## Real-PII grep (I-01 reproduction)

All 12 crawl tokens (`eslammekky`, `01154859653`, `441200480244`, `201278910727`, `chat.whatsapp.com`,
`ui-avatars`, `afaaqonline`, `201508604112`, `abod11`, `msadeqx9`, `aboda155502`, `alaashapan1996`) → **0 hits
in `src/`, 0 files in `public/`.** I-01 reproduces clean. → NFR-001 guard (broaden the settings-only census
sitewide, G7/G8).

## Secrets / credentials

| Check | Result | file:line |
|---|---|---|
| `<input type="password">` in `public/*.html` | **0** | (g32 `smoke:1404-1413`) |
| `<input type="file">` in `public/*.html` | **0** (4 `data-type="file"` are book-category facets, not inputs) | `library.html:574,639` |
| `<canvas>` in `public/*.html` | **0** | |
| `password` in fixtures | comments + gate-id only, never an input | `settings-management.js:14,456,507`; `portal.js:323,380` |
| 24 structure-only provider rows (no value slot) | confirmed | `settings-management.js` + `settings.js:78-86` `structRow` |
| shared OTP field | **not rendered** (deliberate) | `settings.js:265-270` (G-02) |

## Child-view boundary

- `portal.js:320-325` student profile gates: `photoUpload`, `profileSave`, **`passwordChange`** (line 323) —
  the one 043 directs removed (G-03).
- `portal.js:380` family profile carries the identical `passwordChange` gate — **stays** (real account holder).
- `student-profile.js` renders identity + academic + guardian name/city + 3 gate cards + 1 note — 0 forms, 0
  inputs, 0 body anchors.
- Admin-link leakage: `grep -l 'dashboard.html\|staff.html\|finance.html'` on portal pages → hits **only**
  `teacher-performance.html:268-376` (the sanctioned admin exempt board, not a portal page); all 40 true portal
  HTML → **0**; `portals.html:287` is the sanctioned hub→admin link. → DF-1/DF-2 satisfied.

## Cross-family isolation

- `أبو سلمان` (fam1) on all 9 family-portal pages + admin `families.html`.
- `أم جوري` (fam2) on `families.html` **only** — **0 hits** on any family-portal page. → DF-4 satisfied (MUT-8).
- `family-child.js` cycles only `CHILD_ORDER = ['st1','st6','st11','st12','st13']` (`portal.js:256`) — fam1's
  own 5 children; built page `#child=` anchors = exactly these 5.

## Room / presence / audit

- Join = `data-disabled-reason` gate, never a live link (`appointment-details.js:47`). → PR-4/PR-5.
- `grep 'Enter At|joined|presence' src/js` → 0 real hits (2 unrelated: a filter-value comment; an enrollment
  join-date). → PR-1/PR-3.
- `staff.js` activity drawer: 4 authored rows `{entityKey,actionKey,dateKey}` — **no actor-identity field**
  (`staff-management.js:54-59`). → PR-2. **needs-043-rule note**: no actor accountability today (a real
  actor-attributed trail is a 055 concern; 043 rules its visibility, never authors a real name).

## DST

- `time-converter.js:110-133` renders **4 columns** (zone/next/current-offset/upcoming-offset); comment states
  "no account counts". No "Affected Accounts" column. → PR-7 / C14-09.

## Permission UI

- `PERM_GROUPS` (`staff-management.js:34-45`): **10 groups / 22 rows**, 18 granted / 4 not-granted (students
  create=F, teachers manage=F, finance manage=F, settings manage=F — verified `node` eval of the fixture).
  **No parent-contact row** → G-01,
  **needs-043-rule** (add PC-1/PC-2 deny-by-default).
- `settings.js:278-289` `rolesSection()`: a separate 4-group / 12-item read-only preview. Both display-only, no
  enforcement.

## Wording honesty

- `backendRequired` honest-gate copy: **74 occurrences** across `src/locales/*.js`.
- `grep 'مصرّح\|authorized\|logged in\|مسجّل الدخول' src/locales/*.js` → **0 hits**. Every login-adjacent string
  is a category label, a purpose description, or an explicit anti-claim (`en.prt.js:96` "no login, nothing is
  saved"). → G14 / MUT-10.

## Link safety

- `grep -hoE 'https?://' public/*.html | sort | uniq -c` → **`114 http://www.w3.org/2000/svg`** and nothing
  else. → NFR-002 / SR-13.

## Summary

The mechanical inventory surfaced **no** real-PII leak, **no** working credential input, **no** live
room/presence tracker, **no** cross-family/cross-child identity leak, and **no** dishonest authorization
wording. Two "needs-043-rule" notes are policy/completeness items, not active violations: (1) `PERM_GROUPS` has
no parent-contact row (G-01 → PC-1/PC-2, `parent-contact-default-deny-contract.md`); (2) the audit log has no
actor field (visibility ruled in `presence-audit-and-room-link-visibility.md` PR-2; a real trail is 055). 043
**freezes** this clean posture and closes G-01/G-03 at the specification level; the current app is unchanged.
