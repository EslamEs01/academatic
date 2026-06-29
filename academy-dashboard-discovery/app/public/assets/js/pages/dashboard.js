/* Admin dashboard — composes the approved layout from fixtures. Spec 003 adds a
 * MINIMAL, fixture-backed schedule impact: the hero "View schedule" + the up-next
 * strip deep-link to schedule.html#view=timetable, the Today's Sessions rows open
 * the SHARED appointment drawer, and a fixture attention count is surfaced. */
import { WELCOME } from '../fixtures/welcome.js';
import { KPIS } from '../fixtures/kpis.js';
import { SESSIONS } from '../fixtures/sessions.js';
import { SCHEDULE_WEEK } from '../fixtures/schedule.js';
import { STATUS_SUMMARY } from '../fixtures/status-summary.js';
import { REPORTS } from '../fixtures/reports.js';
import { PROFILE } from '../fixtures/profile.js';
import { t, num, getLang } from '../i18n.js';
import { icon } from '../icons.js';
import { welcomeZone } from '../components/welcome.js';
import { kpiRow } from '../components/kpi-card.js';
import { sessionsModule } from '../components/table.js';
import { statusTile } from '../components/status-tile.js';
import { statusChip } from '../components/status-chip.js';
import { statusOf } from '../components/status-map.js';
import { reportCard } from '../components/report-card.js';
import { sectionHeader } from '../components/ui.js';
import { appointmentTemplate } from '../components/appointment-details.js';
import { loadingSkeleton, errorState, emptyState } from '../components/states.js';

const can = (r) => !r.requiresPermission || PROFILE.permissions.includes(r.requiresPermission);
const schedHref = () => (getLang() === 'en' ? './schedule.en.html#view=timetable' : './schedule.html#view=timetable');

/* a small fixture-backed "up next this week" preview that deep-links to the timetable */
function upNext() {
  const href = schedHref();
  const blocks = SCHEDULE_WEEK.flatMap((d) => d.blocks)
    .filter((b) => b.statusId === 'live' || b.statusId === 'upcoming').slice(0, 4);
  const attn = SCHEDULE_WEEK.flatMap((d) => d.blocks)
    .filter((b) => b.attention && (b.attention.kind === 'conflict' || b.attention.kind === 'delayed')).length;
  const rowItem = (b) => `<a class="sched-block tone-${statusOf(b.statusId).tone}" href="${href}" style="text-decoration:none">
      <div class="sched-time"><div class="t1">${b.start}</div><div class="t2 tabular">${b.end}</div></div>
      <div class="flex-1 min-w-0">
        <div class="font-bold text-ink text-[13.5px] truncate">${t(b.titleKey)}</div>
        <div class="text-[12px] truncate" style="color:var(--c-ink-3)">${t(b.trainer.nameKey)} · ${t(b.roomKey)}</div>
      </div>
      ${statusChip(b.statusId)}
    </a>`;
  return `<section class="mb-8">
    <div class="flex items-center justify-between gap-3 mb-3.5">
      <h2 class="section-title">${t('dash.upNext')}</h2>
      <div class="flex items-center gap-2.5">
        ${attn > 0 ? `<a href="${href}" class="chip tone-amber" style="text-decoration:none">${icon('alert-triangle', 'ico')}<span>${t('dash.attention', { n: num(attn) })}</span></a>` : ''}
        <a href="${href}" class="link-more">${t('dash.viewTimetable')} ${icon('arrow-left', 'ico ico-sm')}</a>
      </div>
    </div>
    <div class="agenda">${blocks.map(rowItem).join('')}</div>
  </section>`;
}

export function renderDashboard() {
  return `
    ${welcomeZone(WELCOME)}

    <section class="mb-7">
      ${sectionHeader({ titleKey: 'section.overview', linkKey: 'section.overviewLink' })}
      ${kpiRow(KPIS)}
    </section>

    <section class="mb-6">
      ${sessionsModule(SESSIONS)}
    </section>

    ${upNext()}

    <section class="mb-8">
      <div class="grid-status">${STATUS_SUMMARY.map((s) => statusTile(s)).join('')}</div>
    </section>

    <section class="mb-8">
      ${sectionHeader({ titleKey: 'section.reports', linkKey: 'section.reportsLink', linkHref: 'reports.html' })}
      <div class="grid-reports">${REPORTS.map((r) => reportCard(r, { hasPermission: can(r) })).join('')}</div>
    </section>

    <section class="mb-2">
      ${sectionHeader({ titleKey: 'section.states' })}
      <div class="grid gap-4 grid-cols-1 md:grid-cols-3 items-start">
        ${loadingSkeleton()}
        ${errorState()}
        ${emptyState()}
      </div>
    </section>

    ${SESSIONS.rows.map((s) => appointmentTemplate({ ...s, students: s.present })).join('')}
  `;
}
