/* Reports overview — reuses the shell, shows report entry cards only (no detail). */
import { REPORTS } from '../fixtures/reports.js';
import { PROFILE } from '../fixtures/profile.js';
import { reportCard } from '../components/report-card.js';
import { pageHeader } from '../components/page-header.js';

const can = (r) => !r.requiresPermission || PROFILE.permissions.includes(r.requiresPermission);

export function renderReports() {
  return `
    ${pageHeader({ titleKey: 'reportsPage.title', subKey: 'reportsPage.subtitle' })}
    <div class="grid-reports">
      ${REPORTS.map((r) => reportCard(r, { hasPermission: can(r) })).join('')}
    </div>
  `;
}
