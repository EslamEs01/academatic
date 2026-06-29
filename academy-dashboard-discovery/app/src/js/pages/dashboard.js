/* Admin dashboard — composes the approved layout from fixtures. */
import { WELCOME } from '../fixtures/welcome.js';
import { KPIS } from '../fixtures/kpis.js';
import { SESSIONS } from '../fixtures/sessions.js';
import { STATUS_SUMMARY } from '../fixtures/status-summary.js';
import { REPORTS } from '../fixtures/reports.js';
import { PROFILE } from '../fixtures/profile.js';
import { welcomeZone } from '../components/welcome.js';
import { kpiRow } from '../components/kpi-card.js';
import { sessionsModule } from '../components/table.js';
import { statusTile } from '../components/status-tile.js';
import { reportCard } from '../components/report-card.js';
import { sectionHeader } from '../components/ui.js';
import { loadingSkeleton, errorState, emptyState } from '../components/states.js';

const can = (r) => !r.requiresPermission || PROFILE.permissions.includes(r.requiresPermission);

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

    <section class="mb-8">
      <div class="grid-status">${STATUS_SUMMARY.map((s) => statusTile(s)).join('')}</div>
    </section>

    <section class="mb-8">
      ${sectionHeader({ titleKey: 'section.reports', linkKey: 'section.reportsLink', linkHref: '/reports' })}
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
  `;
}
