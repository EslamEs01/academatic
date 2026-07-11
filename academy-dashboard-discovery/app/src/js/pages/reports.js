/* Spec 008 — Academic Reports & Operations shell.
 *
 * A calm, fixture-only page that ORGANIZES + SUMMARIZES + LINKS the academy's existing
 * operations. Everything is a DISPLAY of roll-ups from existing fixture summaries — no
 * BI engine, no plotting/visuals, no computed grade/ordering/percentage, no money figure.
 * Every number traces to an existing export (REPORT_SUMMARY) and matches the dashboard
 * chips. The whole page is baked static HTML; enhance.js only filters the pre-rendered
 * category cards, opens the Schedule confirm, and shows demo/disabled toasts. */
import { t, num, getLang } from '../i18n.js';
import { icon } from '../icons.js';
import { esc, facetAttrs } from '../dom.js';
import { pageHeader, summaryCards } from '../components/page-header.js';
import { cardGrid } from '../components/card-grid.js';
import { filterBar } from '../components/filter-bar.js';
import { noResults } from '../components/states.js';
import { chip } from '../components/ui.js';
import { tabs } from '../components/tabs.js';
import { reportCard } from '../components/report-card.js';
import { reportActions } from '../components/report-actions.js';
import { feedbackSection, formsSection } from '../components/report-feedback.js';
import { reportSignalChip } from '../components/report-status.js';
import { outcomeChip } from '../components/outcome-status.js';
import { statusChip } from '../components/status-chip.js';
import { groupStatusChip } from '../components/group-status.js';
import { REPORTS, REPORT_SUMMARY, MONTHLY_REPORTS, MONTHLY_REPORT_MONTHS, MONTHLY_SUMMARY, DATA_INSIGHTS } from '../fixtures/reports.js';

/* language-aware href: 'attendance.html#x' → 'attendance.en.html#x' on the EN build */
const localizeHref = (href) => {
  if (getLang() !== 'en' || !href) return href;
  const [path, hash] = href.split('#');
  return path.replace(/\.html$/, '.en.html') + (hash ? `#${hash}` : '');
};

/* authored display flag (threshold over a fixture count) — NOT a computed grade */
const signalFor = (needsFollowUp) => (needsFollowUp > 0 ? 'needsFollowUp' : 'healthy');

/* a "count + labeled chip" inline stat pill */
const statChip = (value, chipHTML) =>
  `<span class="rep-stat"><span class="rep-num">${num(value)}</span> ${chipHTML}</span>`;
/* a "count + plain label" inline stat pill */
const statLabel = (value, labelKey) =>
  `<span class="rep-stat"><span class="rep-num">${num(value)}</span> <span>${esc(t(labelKey))}</span></span>`;
/* a real source deep-link */
const moreLink = (href, labelKey) =>
  `<a href="${esc(localizeHref(href))}" class="link-more">${esc(t(labelKey))} ${icon('arrow-left', 'ico ico-sm')}</a>`;

/* ── academic-operations overview (US2) ─────────────────────────────────── */
function operationsOverview() {
  const s = REPORT_SUMMARY;
  const tiles = summaryCards([
    { icon: 'check-circle', tone: 'success', value: num(s.sessions.completed), labelKey: 'rep.ops.completed' },
    { icon: 'clipboard-check', tone: 'amber', value: num(s.outcomes.needsFollowUp), labelKey: 'rep.ops.needsFollowUp' },
    { icon: 'user-x', tone: 'amber', value: num(s.outcomes.teacherAbsent), labelKey: 'rep.ops.teacherAbsent' },
    { icon: 'user-x', tone: 'coral', value: num(s.outcomes.studentAbsent), labelKey: 'rep.ops.studentAbsent' },
    { icon: 'rotate-cw', tone: 'muted', value: num(s.outcomes.cancelledOrRescheduled), labelKey: 'rep.ops.cancelled' },
    { icon: 'students', tone: 'amber', value: num(s.groups.needsAttention), labelKey: 'rep.ops.groupsAttention' },
    { icon: 'trainers', tone: 'amber', value: num(s.teachers.needFollowUp), labelKey: 'rep.ops.teachersFollowUp' },
    { icon: 'families', tone: 'coral', value: num(s.students.needFollowUp), labelKey: 'rep.ops.studentsFollowUp' },
  ]);

  const areas = [
    ['rep.cat.attendance.title', signalFor(s.outcomes.needsFollowUp)],
    ['rep.cat.sessions.title', signalFor(s.sessions.cancelled)],
    ['rep.cat.coursesGroups.title', signalFor(s.groups.needsAttention)],
    ['rep.cat.teachers.title', signalFor(s.teachers.needFollowUp)],
    ['rep.cat.studentsFamilies.title', signalFor(s.students.needFollowUp + s.families.attention)],
  ];
  const strip = areas
    .map(([k, sig]) => `<span class="rep-area-status"><b>${esc(t(k))}</b> ${reportSignalChip(sig)}</span>`)
    .join('');

  return `<section class="mt-6" id="ops-overview">
    <div class="mb-3">
      <h2 class="section-title">${esc(t('rep.ops.title'))}</h2>
      <p class="text-[12.5px] mt-0.5" style="color:var(--c-ink-3)">${esc(t('rep.ops.sub'))}</p>
    </div>
    ${tiles}
    <div class="flex flex-wrap gap-x-5 gap-y-2 mt-4" aria-label="${esc(t('rep.ops.statusStrip'))}">${strip}</div>
  </section>`;
}

/* ── category cards (US1) — one filterable grid (available first, planned last) ─── */
function categorySummary(id) {
  const s = REPORT_SUMMARY;
  const c = (label, tone, ic) => chip({ label, tone, icon: ic });
  switch (id) {
    case 'attendance':
      return c(`${num(s.outcomes.needsFollowUp)} ${t('rep.sec.needsFollowUp')}`, 'amber', 'clipboard-check');
    case 'sessions':
      return c(`${num(s.sessions.total)} ${t('rep.sec.totalSessions')}`, 'neutral', 'sessions');
    case 'coursesGroups':
      return c(`${num(s.courses.active)} ${t('rep.sec.activeCourses')}`, 'neutral', 'curricula')
        + c(`${num(s.groups.needsAttention)} ${t('rep.sec.groupsAttention')}`, 'amber', 'students');
    case 'teachers':
      return c(`${num(s.teachers.needFollowUp)} ${t('rep.sec.teachersFollowUp')}`, 'amber', 'trainers');
    case 'studentsFamilies':
      return c(`${num(s.students.needFollowUp)} ${t('rep.sec.studentsFollowUp')}`, 'amber', 'families');
    default:
      return '';
  }
}

function categoryCards() {
  return REPORTS.map((cat) => {
    const rowAttrs = facetAttrs({ area: cat.area, availability: cat.availability, search: t(cat.titleKey) });
    const r = { ...cat, route: localizeHref(cat.route) };
    return reportCard(r, { summaryHTML: categorySummary(cat.id), rowAttrs });
  });
}

function categorySection() {
  const filters = filterBar({
    targetId: 'reports-grid',
    searchKey: 'rep.filter.search',
    selects: [
      {
        name: 'area', labelKey: 'rep.filter.area',
        options: [
          { value: '', labelKey: 'rep.filter.allAreas' },
          { value: 'attendance', labelKey: 'rep.cat.attendance.title' },
          { value: 'sessions', labelKey: 'rep.cat.sessions.title' },
          { value: 'coursesgroups', labelKey: 'rep.cat.coursesGroups.title' },
          { value: 'teachers', labelKey: 'rep.cat.teachers.title' },
          { value: 'studentsfamilies', labelKey: 'rep.cat.studentsFamilies.title' },
          { value: 'advanced', labelKey: 'rep.filter.advanced' },
        ],
      },
      {
        name: 'availability', labelKey: 'rep.filter.availability',
        options: [
          { value: '', labelKey: 'rep.filter.allAvailability' },
          { value: 'available', labelKey: 'rep.avail.available' },
          { value: 'planned', labelKey: 'rep.avail.planned' },
          { value: 'backendrequired', labelKey: 'rep.avail.backendRequired' },
        ],
      },
    ],
  });

  return `<section class="mt-8">
    <div class="mb-3">
      <h2 class="section-title">${esc(t('rep.sec.catalogTitle'))}</h2>
      <p class="text-[12.5px] mt-0.5" style="color:var(--c-ink-3)">${esc(t('rep.sec.catalogSub'))}</p>
    </div>
    ${filters}
    ${cardGrid(categoryCards(), { cols: 'sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4', id: 'reports-grid' })}
    ${noResults()}
  </section>`;
}

/* ── per-area detail sections (US3–US7) ─────────────────────────────────── */
function sectionShell({ titleKey, signal, stats, links }) {
  return `<div class="card p-4 rep-section">
    <div class="flex items-center justify-between gap-2 mb-3">
      <h3 class="section-title">${esc(t(titleKey))}</h3>
      ${reportSignalChip(signal)}
    </div>
    <div class="rep-stats">${stats}</div>
    <div class="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2">${links}</div>
  </div>`;
}

/* US3 — Attendance & Outcomes (reuse Spec 005; teacherAbsent ≠ studentAbsent) */
function attendanceSection() {
  const o = REPORT_SUMMARY.outcomes;
  return sectionShell({
    titleKey: 'rep.cat.attendance.title',
    signal: signalFor(o.needsFollowUp),
    stats: [
      statChip(o.attended, outcomeChip('attended')),
      statChip(o.teacherAbsent, outcomeChip('teacherAbsent')),
      statChip(o.studentAbsent, outcomeChip('studentAbsent')),
      statLabel(o.cancelledOrRescheduled, 'rep.sec.cancelledResched'),
      statLabel(o.needsFollowUp, 'rep.sec.needsFollowUp'),
    ].join(''),
    links: moreLink('attendance.html', 'rep.sec.viewAttendance'),
  });
}

/* US4 — Sessions & Timetable (reuse Spec 001/003) */
function sessionsSection() {
  const s = REPORT_SUMMARY.sessions;
  const tiles = s.byStatus
    .map((row) => statChip(row.count, statusChip(row.statusId)))
    .join('');
  return sectionShell({
    titleKey: 'rep.cat.sessions.title',
    signal: signalFor(s.cancelled),
    stats: statLabel(s.total, 'rep.sec.totalSessions') + tiles,
    links: moreLink('sessions.html', 'rep.sec.viewSessions')
      + moreLink('schedule.html#view=timetable', 'rep.sec.viewTimetable'),
  });
}

/* US5 — Courses & Groups (reuse Spec 006) */
function coursesGroupsSection() {
  const s = REPORT_SUMMARY;
  return sectionShell({
    titleKey: 'rep.cat.coursesGroups.title',
    signal: signalFor(s.groups.needsAttention),
    stats: [
      statLabel(s.courses.active, 'rep.sec.activeCourses'),
      statLabel(s.groups.total, 'rep.sec.groups'),
      statChip(s.groups.active, groupStatusChip('active')),
      statLabel(s.groups.needsAttention, 'rep.sec.groupsAttention'),
    ].join(''),
    links: moreLink('courses.html', 'rep.sec.viewCourses')
      + moreLink('groups.html', 'rep.sec.viewGroups'),
  });
}

/* US6 — Teachers (reuse Spec 007; counts + follow-up only, no grade/ordering) */
function teachersSection() {
  const tch = REPORT_SUMMARY.teachers;
  return sectionShell({
    titleKey: 'rep.cat.teachers.title',
    signal: signalFor(tch.needFollowUp),
    stats: [
      statLabel(tch.needFollowUp, 'rep.sec.teachersFollowUp'),
      statChip(tch.teacherAbsent, outcomeChip('teacherAbsent')),
      statChip(tch.studentAbsentInTeacherSessions, outcomeChip('studentAbsent')),
    ].join(''),
    links: moreLink('teacher-performance.html', 'rep.sec.teacherPerformance')
      + moreLink('teacher.html', 'rep.sec.teacherProfile'),
  });
}

/* US7 — Students & Families (reuse Spec 004; no portal) */
function studentsFamiliesSection() {
  const s = REPORT_SUMMARY;
  return sectionShell({
    titleKey: 'rep.cat.studentsFamilies.title',
    signal: signalFor(s.students.needFollowUp + s.families.attention),
    stats: [
      statLabel(s.students.needFollowUp, 'rep.sec.studentsFollowUp'),
      statLabel(s.families.attention, 'rep.sec.familiesAttention'),
    ].join(''),
    links: moreLink('students.html', 'rep.sec.viewStudents')
      + moreLink('families.html', 'rep.sec.viewFamilies')
      + moreLink('student.html', 'rep.sec.studentProfile')
      + moreLink('family.html', 'rep.sec.familyProfile'),
  });
}

function detailSections() {
  return `<section class="mt-8">
    <div class="mb-3">
      <h2 class="section-title">${esc(t('rep.sec.detailTitle'))}</h2>
      <p class="text-[12.5px] mt-0.5" style="color:var(--c-ink-3)">${esc(t('rep.sec.detailSub'))}</p>
    </div>
    ${attendanceSection()}
    ${sessionsSection()}
    ${coursesGroupsSection()}
    ${teachersSection()}
    ${studentsFamiliesSection()}
  </section>`;
}

/* ── Spec 037 — a backendRequired gate button (display-only final) ──────────── */
function gate(labelKey, reasonKey, ic) {
  return `<button type="button" class="btn btn-secondary btn-sm" data-disabled-reason data-reason-key="${esc(reasonKey)}" aria-disabled="true" title="${esc(t(reasonKey))}">${icon(ic, 'ico ico-sm')}<span>${esc(t(labelKey))}</span></button>`;
}

/* ── Spec 037 — Monthly Reports display board (#view=monthly) ──────────────────
 * Authored monthly roll-ups grouped by month. Count literals + categorical signal
 * chips only. No filterBar (the page owns one in overview + a single global
 * [data-no-results]); scannable via month sections. No money/computed/chart. */
function monthlyRow(r) {
  return `<div class="mr-row">
    <span class="mr-area font-bold text-[13.5px] text-ink">${esc(t(r.areaKey))}</span>
    <span class="mr-count tabular text-[13px]" style="color:var(--c-ink-2)">${num(r.count)}</span>
    ${reportSignalChip(r.statusId)}
    <span class="mr-note text-[12.5px]" style="color:var(--c-ink-3)">${esc(t(r.noteKey))}</span>
  </div>`;
}
function monthlyPanel() {
  const tiles = summaryCards(MONTHLY_SUMMARY.map((s) => ({ icon: s.icon, tone: s.tone, value: num(s.value), labelKey: s.labelKey })));
  const sections = MONTHLY_REPORT_MONTHS.map((mid) => {
    const rows = MONTHLY_REPORTS.filter((r) => r.monthId === mid);
    if (!rows.length) return '';
    return `<div class="card p-4 mr-section" id="mr-${esc(mid)}">
      <div class="flex items-center justify-between gap-2 mb-3">
        <h3 class="section-title">${esc(t('rep.monthly.m.' + mid))}</h3>
        ${gate('rep.monthly.export', 'rep.monthly.exportReason', 'file-text')}
      </div>
      <div class="mr-rows">${rows.map(monthlyRow).join('')}</div>
    </div>`;
  }).join('');
  return `<section class="mt-4" id="mr-grid">
    <div class="flex flex-wrap items-center justify-between gap-3 mb-4">
      <div>
        <h2 class="section-title">${esc(t('rep.monthly.title'))}</h2>
        <p class="text-[12.5px] mt-0.5" style="color:var(--c-ink-3)">${esc(t('rep.monthly.sub'))}</p>
      </div>
      ${gate('rep.monthly.generate', 'rep.monthly.generateReason', 'plus')}
    </div>
    ${tiles}
    <div class="mt-4 grid gap-4">${sections}</div>
  </section>`;
}

/* ── Spec 037 — Data Analysis display board (#view=analysis) ───────────────────
 * Authored insight cards + AUTHORED categorical trend labels (NOT computed).
 * No analytics engine, no chart/<canvas>, no finance figure, no computed metric. */
const TREND = {
  improving: { tone: 'completed', icon: 'trending-up' },
  steady: { tone: 'neutral', icon: 'clock' },
  declining: { tone: 'amber', icon: 'alert-triangle' },
};
function trendChip(id) {
  const tr = TREND[id] || TREND.steady;
  return chip({ label: t('rep.analysis.trend.' + id), tone: tr.tone, icon: tr.icon });
}
function insightCard(d) {
  return `<div class="card p-4 da-card">
    <div class="flex items-center justify-between gap-2 mb-2">
      <span class="font-bold text-ink text-[14px]">${esc(t(d.areaKey))}</span>
      ${reportSignalChip(d.statusId)}
    </div>
    <div class="flex items-center gap-2 mb-2">
      <span class="font-bold tabular text-ink" style="font-size:20px;line-height:1">${num(d.count)}</span>
      ${trendChip(d.trendId)}
    </div>
    <p class="text-[12.5px]" style="color:var(--c-ink-3)">${esc(t(d.noteKey))}</p>
  </div>`;
}
function analysisPanel() {
  return `<section class="mt-4" id="da-grid">
    <div class="flex flex-wrap items-center justify-between gap-3 mb-4">
      <div>
        <h2 class="section-title">${esc(t('rep.analysis.title'))}</h2>
        <p class="text-[12.5px] mt-0.5" style="color:var(--c-ink-3)">${esc(t('rep.analysis.sub'))}</p>
      </div>
      <div class="flex flex-wrap gap-2">
        ${gate('rep.analysis.run', 'rep.analysis.runReason', 'rotate-cw')}
        ${gate('rep.analysis.export', 'rep.analysis.exportReason', 'file-text')}
      </div>
    </div>
    ${cardGrid(DATA_INSIGHTS.map(insightCard), { cols: 'sm:grid-cols-2 lg:grid-cols-3', id: 'da-cards' })}
  </section>`;
}

export function renderReports() {
  /* Spec 037 — the existing reports body becomes the Overview tab (byte-identical
   * content); Monthly + Analysis are new display-only tabs (#view=monthly / analysis). */
  const overview = `
    ${reportActions()}
    ${operationsOverview()}
    ${categorySection()}
    ${detailSections()}
    ${feedbackSection()}
    ${formsSection()}
  `;
  return `
    ${pageHeader({ titleKey: 'reportsPage.title', subKey: 'reportsPage.subtitle' })}
    ${tabs({
      group: 'reports',
      ariaKey: 'reportsPage.title',
      items: [
        { id: 'overview', labelKey: 'rep.tab.overview', icon: 'reports' },
        { id: 'monthly', labelKey: 'rep.tab.monthly', icon: 'calendar' },
        { id: 'analysis', labelKey: 'rep.tab.analysis', icon: 'trending-up' },
      ],
      panels: { overview, monthly: monthlyPanel(), analysis: analysisPanel() },
    })}
  `;
}
