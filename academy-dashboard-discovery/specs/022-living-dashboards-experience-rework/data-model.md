# Data Model — Spec 022

All additive; zero deletion; authored literals only; consistent with fam1 + st1/st6/st11/st12/st13 +
teacher سارة القحطاني. No pay/currency tokens anywhere in the new slices (D15/D16 pre-check gates).

## 1. `LIVING_HOME` fixture group (additive, `src/js/fixtures/portal.js`)

```js
export const LIVING_HOME = {
  family: {
    hero: { counters: [
      { icn: 'families',  vKey: null, v: 5, labelKey: 'prt.lv.fam.hero.kids',  storyKey: 'prt.lv.fam.hero.kidsS' },
      { icn: 'calendar',  v: 3,       labelKey: 'prt.lv.fam.hero.today', storyKey: 'prt.lv.fam.hero.todayS' },
      { icn: 'alert',     v: 1,       labelKey: 'prt.lv.fam.hero.watch', storyKey: 'prt.lv.fam.hero.watchS' },
    ] },
    rail: null, // stops derive from the EXISTING FAMILY_PREVIEW today slice (s2/s3/s5 + next) — no new session data
    stories: [
      { icn: 'wallet',  tone: 'ok',      tKey: 'prt.lv.fam.story.billT', dKey: 'prt.lv.fam.story.billD', href: 'family-billing' },
      { icn: 'message', tone: 'neutral', tKey: 'prt.lv.fam.story.reqT',  dKey: 'prt.lv.fam.story.reqD',  href: 'family-requests' },
    ],
  },
  teacher: {
    hero: { counters: [ /* حصص اليوم 2 · متابعات 2 · مهام مفتوحة 3 — refs to EXISTING teacher facts */ ] },
    flow: ['prep', 'attend', 'record', 'review'],   // labels prt.lv.tea.flow.*  (record carries the existing gate)
  },
  student: {
    hero: { counters: [ /* جلسات حضرتها 9 · التقدم 78% · واجبات مفتوحة 3 — the EXISTING student KPI facts re-homed */ ] },
  },
  hub: { childView: { href: 'student-portal', tKey: 'prt.lv.hub.cvT', dKey: 'prt.lv.hub.cvD', linkKey: 'prt.lv.hub.cvOpen' } },
};
```

Rules: counters/stories REFERENCE existing authored numbers (the KPI facts being re-expressed);
`rail` consumes the existing today-session slices — **no new session/child/teacher data invented**.
The 020 `FAMILY_PAGES`, 019 `STUDENT_PAGES`, and all older slices are untouched.

## 2. Locale keys (additive namespace `prt.lv.*`, AR-first + EN mirror)

- Hero: `prt.lv.{fam,tea,stu}.hero.*` (greet sub-lines, counter labels, one-line stories).
- Rail: `prt.lv.rail.{now,next,done,aria}`.
- Stories: `prt.lv.fam.story.*` (billing settled story — regex-pre-checked; requests story).
- Flow: `prt.lv.tea.flow.{prep,attend,record,review}` + step hints.
- Guide panels: `prt.lv.guide.{whenLive,whoActs}` frame lines.
- Hub demotion: `prt.lv.hub.{cvT,cvD,cvOpen}` («عرض الابن — معاينة» · the family-journey
  explanation naming سلمان · «افتح المعاينة»).
- Fold point: `prt.lv.child.{cvT,cvD,cvOpen}` (family-child preview panel copy, names سلمان).

## 3. Sanctioned re-labels (the ONLY non-additive locale edits — D4/D6)

| Key | AR old → new | EN mirrored |
|---|---|---|
| `prt.portal.student` | بوابة الطالب → **عرض الابن** | Student Portal → **Child View** |
| `prt.role.student` | طالب → **ابن العائلة** | Student → **Family Child** |
| `prt.title.student` | بوابة الطالب → **عرض الابن** | (mirror) |
| `prt.hub.student.t/d` | rewritten as the demoted-entry copy | (mirror) |

Every other existing key byte-verbatim (grep-audited). `prt.title.stu*` (the six internal titles)
UNCHANGED — they name content (جدولي/واجباتي…), not the role.

## 4. CSS tokens/classes (additive `app.css` section — D12/D13)

Tokens `--lv-dur/--lv-ease/--lv-grad-{family,teacher,student,hub}-{a,b}` (+ dark variants) ·
classes `.pt-idhero .pt-rail .pt-stop(.is-now/.is-next/.is-done) .pt-story .pt-flow .pt-flow-step
.pt-guide .pt-lift .pt-cele` · keyframes `lv-fill lv-fadeup lv-pulse` — ALL motion inside
`@media (prefers-reduced-motion: no-preference)`; static end-state default.

## 5. portal-page.js additive exports (D11)

`idHero({role, personaKey, subKey, counters})` · `dayRail(stops, {tagMode})` ·
`storyRow(stories)` · `flowStrip(steps, {gateStep})` · `guidePanel(gate)` — appended AFTER the six
existing exports (which stay byte-identical).
