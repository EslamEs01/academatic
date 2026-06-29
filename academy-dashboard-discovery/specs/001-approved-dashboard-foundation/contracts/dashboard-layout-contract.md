# Contract: Admin Dashboard Layout

**Status**: Binding · Reproduces `academy-dashboard.png` with fixture data, inside the shell.

Order is described in **RTL reading order** (start = right). All zones consume tokens and the single status map.

## D1. Welcome / top zone (compact)

- A **compact** gradient hero (T4 hero gradient, radius `--r-lg`) — NOT a giant empty hero — containing: time-aware greeting with a wave ("صباح الخير، نورة 👋"), the current date/time line, an at-a-glance summary ("لديك ٢٤ جلسة اليوم، و٣ جلسات جارية الآن…"), a **primary** action ("+ جلسة جديدة") and a **secondary** action ("عرض الجدول"), and a faint educational motif (graduation-cap, `aria-hidden`).
- Beside it (inline-start), a stacked cluster: two small stat cards ("قادمة اليوم ٦", "جارية الآن ٣" with a live dot) and a wider **attendance ring** card ("نسبة الحضور ٩٣% · أعلى من المعدل الأسبوعي") with a green progress ring.
- Reflows to a single column on tablet/mobile without crowding.

## D2. "نظرة عامة" — KPI row

- Section header "نظرة عامة" with a "عرض كل المؤشرات ←" link (navigable, not dead).
- **Four** KPI cards (`kpi-card`), each: soft-tinted surface, **icon medallion** (gradient), a small **trend pill** (e.g. "٨% ↑"), a large tabular numeral, a supporting label, and a mini visual:
  - الإيرادات الشهرية `٤٨٬٢٠٠ ريال` — amber medallion, line sparkline, +8%.
  - نسبة الحضور `٩٢%` — success medallion, progress bar, +3%.
  - الطلاب النشطون `١٬٢٨٤` — teal medallion, line sparkline, +4%.
  - جلسات اليوم `٢٤` — primary medallion, line sparkline, +12%.
- Mini visuals are inline SVG/CSS (no chart lib). Cards are **not basic** — medallion + depth + trend + spark are all required.
- 4-up on desktop → 2-up tablet → 1-up mobile.

## D3. Sessions module

- **Header**: title "جلسات اليوم", subtitle "٢٤ جلسة · آخر تحديث قبل دقيقتين", calendar icon.
- **Integrated action/filter bar** (one row, wraps on small screens): primary "+ جلسة جديدة" button; an **active-filter chip** ("فلتر نشط: اليوم ✕"); controls for time ("أي وقت"), date ("٢٨ يونيو"), subject ("المادة: الكل"), an in-table search ("ابحث في الجلسات…"), and an "تطبيق" apply button. Controls are real inputs (focusable), not dead buttons.
- **Sessions table** (modern, not a spreadsheet) — columns in RTL order: الوقت (time + duration) · الجلسة (title + level) · المعلم (avatar + name) · القاعة (room) · الطلاب (present/capacity) · الحالة (status chip) · actions ("…" menu).
  - ≥5 fixture rows spanning live / upcoming / completed / cancelled; status chips resolve via the status map (live=teal, upcoming=sky, completed=success, cancelled=coral) with icon+label.
  - Row actions are a **menu**, never a row of colored pill buttons.
  - **Pagination** + "عرض ٥ من ٢٤ جلسة" summary, readable in RTL.
  - Sticky header; rows have comfortable padding, hover state, clear hierarchy, soft depth.

## D4. Status summary

- **Four colored tiles** (`status-tile`): ملغاة ١ (coral) · قادمة ٦ (sky) · جارية الآن ٣ (teal) · مكتملة ١٤ (success). Each: large count + status icon + label on a tinted surface. **Never gray flat pills.**

## D5. Reports area

- Section header "التقارير" with "مركز التقارير ←" link.
- **Report entry cards** (`report-card`) with icon medallion, title, description, and a navigation chevron:
  - تقرير المعلمين — **disabled** (lock medallion) with reason badge "صلاحية مطلوبة" / "يتطلب صلاحية مدير الأكاديمية"; action not clickable.
  - تقرير الإيرادات (amber) · أداء الطلاب (success) · تقرير الحضور الشهري (violet).
- Cards must look like **real product areas**, not placeholders.

## D6. Interface states ("حالات الواجهة")

Three demonstrative cards with warm, human Arabic microcopy:
- **Loading**: shimmer skeleton ("جار التحميل…"), no bare "Loading" text.
- **Error**: coral warning medallion, "تعذّر تحميل البيانات / حدث خطأ مؤقت في الاتصال…", **retry** button.
- **Empty**: violet calendar-plus medallion, "لا توجد جلسات بعد / ابدأ بإضافة أول جلسة…", **CTA** ("+ إضافة جلسة").

## D7. Page-level rules

- Page background `--c-canvas`; section vertical rhythm comfortable; section headers consistent.
- Renders correctly in all 6 {ar/en}×{light/dark/system} combinations and at desktop/tablet/mobile with no overflow.
- All numerals tabular and locale-formatted (Arabic-Indic in `ar`); times/dates not mirrored.
- No dead buttons, no raw i18n keys anywhere on the page.
