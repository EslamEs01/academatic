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
import { reportCard } from '../components/report-card.js';
import { reportActions } from '../components/report-actions.js';
import { reportSignalChip } from '../components/report-status.js';
import { outcomeChip } from '../components/outcome-status.js';
import { statusChip } from '../components/status-chip.js';
import { groupStatusChip } from '../components/group-status.js';
import { REPORTS, REPORT_SUMMARY } from '../fixtures/reports.js';

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

export function renderReports() {
  return `
    ${pageHeader({ titleKey: 'reportsPage.title', subKey: 'reportsPage.subtitle' })}
    ${reportActions()}
    ${operationsOverview()}
    ${categorySection()}
    ${detailSections()}
  `;
}
