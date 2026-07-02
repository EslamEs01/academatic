# Contract: Family History & Materials (Spec 014)

**Status**: Binding · References FR-007/FR-014, US7; research D7/D8; delivers the guardian F6 mirror + the F12 family slice.

## 1. Recent sessions (guardian F6 mirror)

- Exactly 3 records, **child-first** card shape (child name leads the title): 
  1. REAL `out1` — st1 · math · sara · **attended** chip · `data.att.fb.good` feedback text.
  2. REAL `out15` — st11 · math · sara · **studentAbsent** chip · `data.att.fb.support` feedback text (the honest "behind" record — ties to the signals band).
  3. Authored — st6 · science · khalid (summaryKey/homeworkKey authored, `data.prtFam*`).
- Each card: child + course + teacher + authored day label + **summary line + homework-note line** (the capture-verified F6 field pair) + the real outcome chip where fixture truth exists.
- Section closes with the `.pt-planned` mini-card **`fullHistory`** classed **planned** («السجل الكامل»).

## 2. Family materials (F12 slice)

- Exactly 3 authored child-associated cards: title + type icon (`file-text`/`play`/`materials`) + child ref. Display-only, no links (no student-appropriate local targets — the standing policy).
- Section closes with the `.pt-planned` mini-card **`matDownload`** classed **backendRequired** («تحميل الملفات»).

## 3. MUST NOT

No modal interactions; no more than 3 records/cards per section (calm reflection, not a log); no fake detail route; no fake download; no attachment links (display-only annotation allowed on ≤1 record, per the 013 precedent).

## Acceptance (binding)

1. **Given** the history section, **Then** 3 child-first records render — out1 and out15 resolving their REAL fixture fields (children, chips, feedback texts) — plus the planned full-history mini-card.
2. **Given** the materials section, **Then** 3 display-only cards + the backendRequired download mini-card render; zero anchors.
3. **Given** the coverage artifact, **Then** F6 (guardian mirror) and F12 (family slice) carry delivered-014 notes.
