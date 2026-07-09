/* Settings page — Spec 031 folds the six settings sub-domains into ONE tabbed hub
 * (General · Notifications · Customization · Security · Users · Integrations) — the
 * finance.html/Spec-030 precedent, 0 page-count delta. The existing theme/language
 * controls stay REAL; everything else is display-only + backendRequired gate. NO
 * settings persistence, NO credential/`type=password`/`type=file`, NO pay-rate/salary
 * figure, NO backup/restore, NO fake save. Locations + expense-heads fold in as slices. */
import { SETTINGS, ROLES_PREVIEW } from '../fixtures/settings.js';
import { t, getLang } from '../i18n.js';
import { icon } from '../icons.js';
import { esc } from '../dom.js';
import { medallion, chip, button } from '../components/ui.js';
import { pageHeader } from '../components/page-header.js';
import { settingsSection } from '../components/settings-section.js';
import { tabs } from '../components/tabs.js';
import {
  IDENTITY_ROWS, LOCATIONS, EXPENSE_HEADS, EXPENSE_HEAD_STATUS, NOTIF_MATRIX, POLICIES,
  BRAND_ROWS, INTEGRATIONS, INTEG_KIND, INTEG_STATUS,
} from '../fixtures/settings-management.js';

const SEC = Object.fromEntries(SETTINGS.map((s) => [s.id, s]));

const gate = (labelKey, ic, reasonKey) =>
  `<button type="button" class="btn btn-secondary btn-sm" data-disabled-reason data-reason-key="${esc(reasonKey)}" aria-disabled="true" title="${esc(t(reasonKey))}">${icon(ic, 'ico ico-sm')}<span>${t(labelKey)}</span></button>`;

/* a plain settings card wrapper (matches settings-section.js output). */
function panel({ id, titleKey, descKey, icon: ic, accent = 'primary', bodyHTML }) {
  return `<section class="set-section" id="set-${esc(id)}">
    <div class="flex items-center gap-3 mb-2">
      ${medallion({ icon: ic, tone: accent, variant: 'soft', size: 'sm' })}
      <div><h2 class="text-[15px] font-bold text-ink">${t(titleKey)}</h2>
      ${descKey ? `<p class="text-[12px]" style="color:var(--c-ink-3)">${t(descKey)}</p>` : ''}</div>
    </div>${bodyHTML}</section>`;
}
const valRow = (labelKey, valueKey) => `<div class="set-row"><div class="min-w-0"><div class="set-label">${t(labelKey)}</div></div><div class="shrink-0"><span class="font-medium text-[13px] text-ink">${t(valueKey)}</span></div></div>`;

/* roles/permissions read-only preview (kept from Spec 001, reused in the Users tab). */
function rolesSection() {
  const groups = ROLES_PREVIEW.groups.map((g) => `
    <div class="perm-group">
      <div class="font-bold text-[12.5px] text-ink mb-1.5">${t(g.labelKey)}</div>
      ${g.items.map((it) => `<div class="perm-item">${icon('check-circle', 'ico ico-sm')}<span>${t('set.perm.' + it)}</span></div>`).join('')}
    </div>`).join('');
  return settingsSection({
    id: 'roles', titleKey: 'set.sec.roles', descKey: 'set.sec.rolesDesc', icon: 'settings', accent: 'sky',
    rows: [{ labelKey: 'set.perm.roleAdmin', control: { kind: 'text', valueKey: 'set.perm.roleAdmin' } }],
    extraHTML: `<div class="grid gap-2 sm:grid-cols-2 mt-2">${groups}</div>`,
  });
}

/* ---------------- General ---------------- */
function headStatusChip(id) { const s = EXPENSE_HEAD_STATUS[id] || {}; return chip({ labelKey: s.labelKey || 'adm.set.heads.inactive', tone: s.tone || 'neutral', icon: s.icon || 'x-circle' }); }
function generalPanel() {
  const identity = panel({
    id: 'gen-identity', titleKey: 'adm.set.gen.identityTitle', icon: 'graduation-cap', accent: 'primary',
    bodyHTML: IDENTITY_ROWS.map((r) => valRow(r.labelKey, r.valueKey)).join('')
      + `<div class="set-row"><div class="min-w-0"><div class="set-label">${t('adm.set.gen.payNote')}</div></div></div>`
      + `<div class="flex flex-wrap gap-2 mt-2">${gate('adm.set.gen.logo', 'materials', 'adm.set.gen.logoReason')}${gate('adm.set.gen.save', 'check', 'adm.set.gen.saveReason')}</div>`,
  });
  const locations = panel({ id: 'gen-loc', titleKey: 'adm.set.loc.title', icon: 'map-pin', accent: 'teal', bodyHTML: LOCATIONS.map((r) => valRow(r.labelKey, r.valueKey)).join('') });
  const headsRows = EXPENSE_HEADS.map((h) => `<div class="set-row"><div class="min-w-0"><div class="set-label">${t(h.nameKey)}</div></div><div class="shrink-0">${headStatusChip(h.statusId)}</div></div>`).join('');
  const heads = panel({
    id: 'gen-heads', titleKey: 'adm.set.heads.title', descKey: 'adm.set.heads.sub', icon: 'wallet', accent: 'amber',
    bodyHTML: headsRows + `<div class="mt-2">${button({ labelKey: 'adm.set.heads.add', variant: 'secondary', size: 'sm', icon: 'plus', attrs: 'data-modal-trigger data-modal-title-key="adm.set.heads.addTitle" data-modal-note-key="common.backendRequiredNote"' })}</div>`,
  });
  return identity + locations + heads;
}

/* ---------------- Notifications ---------------- */
function notificationsPanel() {
  const rows = NOTIF_MATRIX.map((n) => `<div class="set-row">
    <div class="min-w-0"><div class="set-label">${t(n.eventKey)}</div>
      <div class="set-help">${t(n.channelKey)}</div></div>
    <div class="shrink-0">${chip({ labelKey: n.on ? 'adm.set.notif.on' : 'adm.set.notif.off', tone: n.on ? 'completed' : 'neutral', icon: n.on ? 'check-circle' : 'x-circle' })}</div>
  </div>`).join('');
  const matrix = panel({
    id: 'notif-matrix', titleKey: 'adm.set.notif.title', icon: 'bell', accent: 'sky',
    bodyHTML: rows + `<div class="mt-2">${gate('adm.set.notif.save', 'check', 'adm.set.notif.saveReason')}</div>`,
  });
  return settingsSection(SEC.notif) + matrix;
}

/* ---------------- Customization (theme/lang REAL) ---------------- */
function customizationPanel() {
  const swatches = BRAND_ROWS.map((b) => `<div class="set-row"><div class="min-w-0"><div class="set-label">${t(b.labelKey)}</div></div><div class="shrink-0 flex items-center gap-2"><span style="display:inline-block;width:18px;height:18px;border-radius:5px;border:1px solid var(--c-line);background:${esc(b.swatch)}"></span><span class="text-[12px] tabular" style="color:var(--c-ink-3)">${esc(b.swatch)}</span></div></div>`).join('');
  const brand = panel({
    id: 'cust-brand', titleKey: 'adm.set.cust.brandTitle', icon: 'sparkles', accent: 'violet',
    bodyHTML: swatches + `<div class="flex flex-wrap gap-2 mt-2">${gate('adm.set.cust.brandSave', 'check', 'adm.set.cust.brandSaveReason')}${gate('adm.set.cust.msgBuilder', 'messages', 'adm.set.cust.msgBuilderReason')}</div>`,
  });
  return settingsSection(SEC.appearance) + brand;
}

/* ---------------- Security ---------------- */
function securityPanel() {
  const policies = POLICIES.map((p) => `<div class="mb-3"><div class="font-bold text-[13px] text-ink mb-1">${t(p.titleKey)}</div><p class="text-[12.5px]" style="color:var(--c-ink-2);line-height:1.6">${t(p.bodyKey)}</p></div>`).join('');
  const pol = panel({
    id: 'sec-policies', titleKey: 'adm.set.sec.polTitle', icon: 'reports', accent: 'primary',
    bodyHTML: policies + `<div class="flex flex-wrap gap-2 mt-1">${gate('adm.set.sec.polEdit', 'edit', 'adm.set.sec.polEditReason')}${gate('adm.set.sec.backup', 'download', 'adm.set.sec.backupReason')}${gate('adm.set.sec.importData', 'file-text', 'adm.set.sec.importReason')}</div>`,
  });
  return settingsSection(SEC.account) + pol;
}

/* ---------------- Users (deep-link to the ONE staff home) ---------------- */
function usersPanel() {
  const link = panel({
    id: 'users-open', titleKey: 'adm.set.users.title', descKey: 'adm.set.users.sub', icon: 'staff', accent: 'teal',
    bodyHTML: `<a class="btn btn-secondary btn-sm" href="${getLang() === 'en' ? 'staff.en.html' : 'staff.html'}">${icon('staff', 'ico ico-sm')}<span>${t('adm.set.users.open')}</span></a>`,
  });
  return link + rolesSection();
}

/* ---------------- Integrations (locked-placeholder cards) ---------------- */
function integStatusChip(id) { const s = INTEG_STATUS[id] || {}; return chip({ labelKey: s.labelKey || 'adm.set.integ.st.notConnected', tone: s.tone || 'neutral', icon: s.icon || 'x-circle' }); }
function integCard(ig) {
  return `<div class="card p-4 flex flex-col gap-3" data-integration="${esc(ig.id)}">
    <div class="flex items-center gap-3">
      ${medallion({ icon: 'grid', tone: 'neutral', variant: 'soft', size: 'sm' })}
      <div class="min-w-0"><h3 class="font-bold text-ink text-[14px] truncate">${t(ig.nameKey)}</h3>
        <p class="text-[12px]" style="color:var(--c-ink-3)">${t(INTEG_KIND[ig.kindId])}</p></div>
      <div class="ms-auto">${integStatusChip(ig.statusId)}</div>
    </div>
    <div class="flex flex-wrap gap-1.5">
      ${gate('adm.set.integ.connect', 'lock', 'adm.set.integ.connectReason')}
      ${gate('adm.set.integ.test', 'retry', 'adm.set.integ.testReason')}
    </div>
  </div>`;
}
function integrationsPanel() {
  const cards = `<div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">${INTEGRATIONS.map(integCard).join('')}</div>`;
  return panel({ id: 'integ', titleKey: 'adm.set.integ.title', descKey: 'adm.set.integ.sub', icon: 'grid', accent: 'primary', bodyHTML: `<p class="text-[12.5px] mb-3" style="color:var(--c-ink-3)">${t('adm.set.integ.waStatus')}</p>${cards}` });
}

export function renderSettings() {
  const views = tabs({
    group: 'settings', ariaKey: 'adm.set.tab.aria',
    items: [
      { id: 'general', labelKey: 'adm.set.tab.general', icon: 'settings' },
      { id: 'notifications', labelKey: 'adm.set.tab.notifications', icon: 'bell' },
      { id: 'customization', labelKey: 'adm.set.tab.customization', icon: 'sparkles' },
      { id: 'security', labelKey: 'adm.set.tab.security', icon: 'lock' },
      { id: 'users', labelKey: 'adm.set.tab.users', icon: 'staff' },
      { id: 'integrations', labelKey: 'adm.set.tab.integrations', icon: 'grid' },
    ],
    panels: {
      general: generalPanel(),
      notifications: notificationsPanel(),
      customization: customizationPanel(),
      security: securityPanel(),
      users: usersPanel(),
      integrations: integrationsPanel(),
    },
  });
  return `
    ${pageHeader({ titleKey: 'set.title', subKey: 'set.sub' })}
    <div style="max-width:860px">${views}</div>
  `;
}
