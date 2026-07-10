/* Spec 031 (US1) — Users & Staff. The ONE honest staff home (resolves B-16). A display-only
 * directory + a per-row kebab (View drawer · Edit/Duplicate form drawers · Permissions
 * display-only matrix drawer + Save gate · Category/Activity drawers · Deactivate/Activate/Delete
 * confirms that mutate nothing · Reset/Invite future-backend gates). The excluded legacy
 * fieldset stays out (see the must-omit contract); no real PII (authored demo data). Reuses the
 * closed data-* hook set; the kebab routes through the EXISTING data-row-menu dispatch.
 * Spec 032 (FC-30/31/32): Add/Edit/Duplicate are form-bearing drawers — INERT field() controls
 * + ONE backendRequired Save final each. */
import { t } from '../i18n.js';
import { icon } from '../icons.js';
import { esc, facetAttrs } from '../dom.js';
import { avatar, chip, button, medallion } from '../components/ui.js';
import { pageHeader } from '../components/page-header.js';
import { filterBar } from '../components/filter-bar.js';
import { directoryCard } from '../components/directory-card.js';
import { cardGrid } from '../components/card-grid.js';
import { previewTemplate, sheetRow, formDrawer } from '../components/preview-drawer.js';
import { field } from '../components/form-field.js';
import { FORM_STATUS_OPTS, ROLE_OPTS } from '../fixtures/form-options.js';
import { STAFF, STAFF_ROLES, STAFF_STATUS, STAFF_STATUS_ORDER, PERM_GROUPS, STAFF_CATEGORIES, STAFF_ACTIVITY } from '../fixtures/staff-management.js';

/* honest clickable disabled-with-reason gate (keyboard-reachable; never a dead button) */
const gate = (labelKey, ic, reasonKey) =>
  `<button type="button" class="btn btn-secondary btn-sm" data-disabled-reason data-reason-key="${esc(reasonKey)}" aria-disabled="true" title="${esc(t(reasonKey))}">${icon(ic, 'ico ico-sm')}<span>${t(labelKey)}</span></button>`;

const roleChip = (id) => chip({ labelKey: STAFF_ROLES[id] || 'adm.staff.role.support', tone: 'neutral', icon: 'user' });
const statusChip = (id) => chip({ labelKey: 'adm.staff.st.' + id, tone: (STAFF_STATUS[id] || {}).tone || 'neutral', icon: (STAFF_STATUS[id] || {}).icon || 'clock' });

/* per-staff View drawer — read-only profile rows (the excluded legacy fieldset stays out). */
function staffViewDrawer(s) {
  const body = `<div class="sheet-rows">
    ${sheetRow(t('adm.staff.colUsername'), esc(s.username))}
    ${sheetRow(t('adm.staff.colPhone'), esc(s.phone))}
    ${sheetRow(t('adm.staff.colEmail'), t(s.emailKey))}
    ${sheetRow(t('adm.staff.colRole'), t(STAFF_ROLES[s.roleId]))}
    ${sheetRow(t('adm.staff.colStatus'), t('adm.staff.st.' + s.statusId))}
  </div>`;
  return previewTemplate('st-view-' + s.id, { titleKey: 'adm.staff.viewTitle', headIcon: 'staff', tone: 'primary', bodyHTML: body });
}

/* shared RBAC matrix drawer — display-only grouped list + Save gate (no enforcement). */
function permDrawer() {
  const groups = PERM_GROUPS.map((g) => `
    <div class="perm-group">
      <div class="font-bold text-[12.5px] text-ink mb-1.5">${t(g.labelKey)}</div>
      ${g.items.map((it) => `<div class="perm-item">${icon(it.granted ? 'check-circle' : 'x-circle', 'ico ico-sm')}<span>${t('adm.staff.perm.i.' + it.k)} — ${t(it.granted ? 'adm.staff.perm.granted' : 'adm.staff.perm.notGranted')}</span></div>`).join('')}
    </div>`).join('');
  const body = `<p class="text-[12px] mb-3" style="color:var(--c-ink-3)">${t('adm.staff.perm.note')}</p>
    <div class="grid gap-2 sm:grid-cols-2">${groups}</div>
    <div class="mt-4">${gate('adm.staff.perm.save', 'lock', 'adm.staff.perm.saveReason')}</div>`;
  return previewTemplate('st-perm', { titleKey: 'adm.staff.perm.title', headIcon: 'lock', tone: 'violet', bodyHTML: body });
}

/* shared category-scope drawer — read-only + assign gate. */
function catDrawer() {
  const rows = STAFF_CATEGORIES.map((c) => sheetRow(t(c.labelKey), t(c.scopeKey))).join('');
  const body = `<div class="sheet-rows">${rows}</div><div class="mt-4">${gate('adm.staff.cat.assign', 'filter', 'adm.staff.cat.assignReason')}</div>`;
  return previewTemplate('st-cat', { titleKey: 'adm.staff.cat.title', headIcon: 'filter', tone: 'teal', bodyHTML: body });
}

/* shared activity-log drawer — read-only audit rows. */
function activityDrawer() {
  const rows = STAFF_ACTIVITY.map((a) => `<div class="perm-item">${icon('clock', 'ico ico-sm')}<span>${t(a.actionKey)} — ${t(a.entityKey)} · ${t(a.dateKey)}</span></div>`).join('');
  const body = `<div class="grid gap-1.5">${rows}</div>`;
  return previewTemplate('st-activity', { titleKey: 'adm.staff.activity.title', headIcon: 'reports', tone: 'sky', bodyHTML: body });
}

/* Spec 032 (FC-30/31/32) — the shared staff form fieldset. Prefix keeps control
 * ids unique per drawer; `s` prefills the Edit/Duplicate drawers with authored
 * demo values. The excluded legacy fieldset stays out (see the must-omit contract). */
function staffFormFields(prefix, s) {
  return [
    field({ labelKey: 'adm.form.name', name: `${prefix}-name`, valueKey: s ? s.nameKey : undefined }),
    field({ labelKey: 'adm.staff.colUsername', name: `${prefix}-username`, value: s ? s.username : undefined }),
    field({ labelKey: 'adm.staff.colEmail', name: `${prefix}-email`, valueKey: s ? s.emailKey : undefined }),
    field({ labelKey: 'adm.staff.colPhone', name: `${prefix}-phone`, value: s ? s.phone : undefined }),
    field({ labelKey: 'adm.staff.colRole', name: `${prefix}-role`, type: 'select', options: ROLE_OPTS }),
    field({ labelKey: 'adm.staff.colStatus', name: `${prefix}-status`, type: 'select', options: FORM_STATUS_OPTS }),
  ].join('');
}

/* the three staff form drawers — Add (blank), Edit + Duplicate (prefilled st1).
 * Each ends at the ONE formDrawer backendRequired final; the kebab (enhance.js)
 * opens staff-edit/staff-dup via data-drawer. */
function staffFormDrawers() {
  return formDrawer('staff-add', { titleKey: 'adm.staff.addTitle', headIcon: 'user-plus', fields: staffFormFields('staffAdd'), ctaKey: 'common.add' })
    + formDrawer('staff-edit', { titleKey: 'adm.staff.editTitle', headIcon: 'edit', fields: staffFormFields('staffEdit', STAFF[0]) })
    + formDrawer('staff-dup', { titleKey: 'adm.staff.duplicateTitle', headIcon: 'user-plus', tone: 'violet', fields: staffFormFields('staffDup', STAFF[0]) });
}

function staffCard(s) {
  return directoryCard({
    rootAttrs: facetAttrs({ search: t(s.nameKey) + ' ' + s.username, role: s.roleId, status: s.statusId }),
    avatarHTML: avatar({ nameKey: s.nameKey, accent: 'violet' }),
    name: esc(t(s.nameKey)),
    subtitle: esc(s.username),
    statusHTML: statusChip(s.statusId),
    tagsHTML: roleChip(s.roleId),
    drawerId: 'st-view-' + s.id,
    ctaKey: 'adm.staff.view', ctaIcon: 'user',
    menuId: s.id, menuKind: 'staff', menuLabelKey: 'adm.staff.menu',
  });
}

export function renderStaff() {
  const roleOpts = [{ value: '', labelKey: 'adm.staff.allRoles' }, ...Object.keys(STAFF_ROLES).map((r) => ({ value: r, labelKey: STAFF_ROLES[r] }))];
  const statusOpts = [{ value: '', labelKey: 'adm.staff.allStatuses' }, ...STAFF_STATUS_ORDER.map((s) => ({ value: s, labelKey: 'adm.staff.st.' + s }))];
  const primary = button({ labelKey: 'adm.staff.add', variant: 'primary', size: 'sm', icon: 'user-plus', attrs: 'data-drawer="staff-add" data-modal-trigger data-modal-title-key="adm.staff.addTitle"' });
  const filters = filterBar({
    targetId: 'staff-grid', searchKey: 'adm.staff.filterSearch',
    selects: [
      { name: 'role', labelKey: 'adm.staff.filterRole', options: roleOpts },
      { name: 'status', labelKey: 'adm.staff.filterStatus', options: statusOpts },
    ],
  });
  const grid = `<div id="staff-grid">${cardGrid(STAFF.map(staffCard), { cols: 'sm:grid-cols-2 lg:grid-cols-3' })}</div>`;
  const drawers = STAFF.map(staffViewDrawer).join('') + permDrawer() + catDrawer() + activityDrawer() + staffFormDrawers();
  return `
    ${pageHeader({ titleKey: 'adm.staff.title', subKey: 'adm.staff.sub', primary })}
    ${filters}
    ${grid}
    ${drawers}
  `;
}
