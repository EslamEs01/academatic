/* Settings page — the six-tab admin hub (General · Notifications · Customization
 * · Security · Users · Integrations).
 *
 * Spec 031 folded the six settings sub-domains into ONE tabbed hub (0 page-count
 * delta). Spec 040 COMPLETES all six in place and unlocks them as real sidebar
 * deep-links (settings.html#view=<tab>) — still 0 new pages, 0 new hooks, 0 new
 * storage keys, 0 new components, 0 new dependencies.
 *
 * THE HONESTY CONTRACT ON THIS PAGE
 *  - theme + language are the ONLY real writes (existing data-set-theme /
 *    data-set-lang, existing academy.theme / academy.lang keys). They are labelled
 *    as a PERSONAL preference, never as an academy-wide saved setting.
 *  - Every other final — Save / Connect / Test / Pair / Upload / Download-template
 *    / Send-backup / Edit-policy / Enable-2FA / payment-method write — is an honest
 *    `data-disabled-reason` backendRequired GATE. Spec 040 adds ZERO data-confirm
 *    chains: a confirm in front of an inert gate stages a destructive ritual for an
 *    action that structurally cannot occur. The facts a real destructive action
 *    needs (scope · destination · permission · audit) live in standing visible copy
 *    beside the gate.
 *  - Every boolean is a LOCAL PREVIEW on the EXISTING data-toggle hook: it flips
 *    visually, persists nothing, and toasts the backendRequired wording — never
 *    `set.savedToast`. Each toggle-bearing section carries the preview-only note.
 *  - Sensitive provider fields are STRUCTURE-ONLY rows (label + required + purpose).
 *    Never an input, never a value. 0 type=password, 0 type=file, 0 <canvas>.
 *
 * COPY TRAP (binding): the preview note says «لا يُخزَّن أي تغيير» / "nothing is
 * stored" — NEVER «لا يتم الحفظ» / "not saved". «يتم الحفظ» contains «تم الحفظ» and
 * "not saved" contains `saved`, so the naive phrasing would trip the fake-success
 * census and red an honest build.
 */
import { SETTINGS, ROLES_PREVIEW } from '../fixtures/settings.js';
import { t, getLang } from '../i18n.js';
import { icon } from '../icons.js';
import { esc } from '../dom.js';
import { medallion, chip, button } from '../components/ui.js';
import { pageHeader } from '../components/page-header.js';
import { settingsSection } from '../components/settings-section.js';
import { tabs } from '../components/tabs.js';
import { formDrawer } from '../components/preview-drawer.js';
import { field } from '../components/form-field.js';
import { FORM_STATUS_OPTS } from '../fixtures/form-options.js';
import {
  IDENTITY_ROWS, IDENTITY_FIELDS, IDENTITY_OPTS, AUTOMATION_GROUPS,
  LOCATIONS, EXPENSE_HEADS, EXPENSE_HEAD_STATUS, POLICIES,
  BRAND_COLORS, STATUS_COLORS, APPEARANCE_OPTS,
  SECURITY_IMPORTS, BACKUP, TFA_ROW,
  INTEGRATIONS, INTEG_KIND, INTEG_STATUS, PROVIDER_FIELDS, PAYMENT_METHOD_EMPTY,
} from '../fixtures/settings-management.js';
import { NOTIF_SECTIONS, chanOpts } from '../fixtures/settings-notifications.js';

const SEC = Object.fromEntries(SETTINGS.map((s) => [s.id, s]));

/* the ONE backendRequired reason every preview toggle toasts. NEVER set.savedToast. */
const PREVIEW_TOAST = 'adm.common.backendReason';

const gate = (labelKey, ic, reasonKey) =>
  `<button type="button" class="btn btn-secondary btn-sm" data-disabled-reason data-reason-key="${esc(reasonKey)}" aria-disabled="true" title="${esc(t(reasonKey))}">${icon(ic, 'ico ico-sm')}<span>${t(labelKey)}</span></button>`;

const primaryGate = (labelKey, ic, reasonKey) =>
  `<button type="button" class="btn btn-primary btn-sm" data-disabled-reason data-reason-key="${esc(reasonKey)}" aria-disabled="true" title="${esc(t(reasonKey))}">${icon(ic, 'ico ico-sm')}<span>${t(labelKey)}</span></button>`;

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

/* ---------- Spec 040 shared helpers (existing components only) ---------- */

/* the visible "this is a preview, nothing is stored" note. Copy law: never "saved". */
const previewNote = () => `<p class="text-[12px] mt-2" style="color:var(--c-ink-3)">${t('adm.set.previewNote')}</p>`;

/* a sensitive configuration requirement — DESCRIBED, never rendered as an input.
 * There is no value slot in this markup: a credential cannot be authored into it. */
const structRow = (r) => `<div class="set-struct">
  <div class="min-w-0">
    <div class="ss-label">${t(r.labelKey)}</div>
    <div class="ss-purpose">${t(r.purposeKey)}</div>
  </div>
  <div class="shrink-0"><span class="ss-req">${t(r.required ? 'adm.set.integ.required' : 'adm.set.integ.optional')}</span></div>
</div>`;

/* native <details> disclosure — zero JS, zero new hook (precedent: add-family.js). */
const accGroup = (titleKey, bodyHTML, open = false) => `<details class="set-acc"${open ? ' open' : ''}>
  <summary>${t(titleKey)}</summary>
  <div class="set-acc-body">${bodyHTML}</div>
</details>`;

/* one boolean = one LOCAL PREVIEW on the existing data-toggle hook. */
const toggleRow = (tg) => ({
  labelKey: tg.labelKey,
  helpKey: tg.helpKey,
  control: tg.disabled
    ? { kind: 'toggle', mode: 'disabled', reasonKey: tg.reasonKey }
    : { kind: 'toggle', on: !!tg.on, ariaKey: tg.labelKey, toastKey: PREVIEW_TOAST },
});
const toggleRowsHTML = (list) => list.map((tg) => {
  const r = toggleRow(tg);
  return `<div class="set-row">
    <div class="min-w-0"><div class="set-label">${t(r.labelKey)}</div>${r.helpKey ? `<div class="set-help">${t(r.helpKey)}</div>` : ''}</div>
    <div class="shrink-0">${toggleControl(r.control)}</div>
  </div>`;
}).join('');

/* mirrors settings-section.js's toggle output exactly (same hook, same CSS). */
function toggleControl(c) {
  if (c.mode === 'disabled') {
    return `<button type="button" class="toggle" disabled aria-disabled="true" title="${esc(t(c.reasonKey))}" aria-label="${esc(t(c.reasonKey))}"><span class="knob"></span></button>`;
  }
  return `<button type="button" class="toggle ${c.on ? 'is-on' : ''}" role="switch" aria-checked="${!!c.on}" aria-label="${esc(t(c.ariaKey || 'set.toggle'))}" data-toggle data-toast="${esc(t(c.toastKey))}"><span class="knob"></span></button>`;
}

/* field() with the fixture's option list resolved. */
const fieldOf = (f, opts) => field({
  labelKey: f.labelKey,
  name: f.name,
  type: f.type,
  options: f.options || (f.opts ? opts[f.opts] : []),
  value: f.value,
  valueKey: f.valueKey,
  full: f.type === 'textarea',
});
const helpUnder = (f) => (f.helpKey ? `<p class="set-help" style="margin-top:-6px;margin-bottom:6px">${t(f.helpKey)}</p>` : '');
const fieldsGrid = (list, opts = {}) => `<div class="wiz-grid">${list.map((f) => fieldOf(f, opts)).join('')}</div>`
  + list.filter((f) => f.helpKey).map(helpUnder).join('');

/* ---------------- General ---------------- */
function headStatusChip(id) { const s = EXPENSE_HEAD_STATUS[id] || {}; return chip({ labelKey: s.labelKey || 'adm.set.heads.inactive', tone: s.tone || 'neutral', icon: s.icon || 'x-circle' }); }

function generalPanel() {
  /* A — academy identity: 10 field()s + the logo GATE (no type=file) + gated Save. */
  const identity = panel({
    id: 'gen-identity', titleKey: 'adm.set.gen.identityTitle', icon: 'graduation-cap', accent: 'primary',
    bodyHTML: fieldsGrid(IDENTITY_FIELDS, IDENTITY_OPTS)
      + `<div class="set-row"><div class="min-w-0"><div class="set-label">${t('adm.set.gen.payNote')}</div></div></div>`
      + `<div class="flex flex-wrap gap-2 mt-2">${gate('adm.set.gen.logo', 'materials', 'adm.set.gen.logoReason')}${primaryGate('adm.set.gen.save', 'check', 'adm.set.gen.saveReason')}</div>`,
  });

  /* C — course & class automation: 17 controls in 5 native <details> groups.
   * `rate_student_absent` is OMITTED BY LAW and appears nowhere. */
  const autoBody = AUTOMATION_GROUPS.map((g) => accGroup(
    g.titleKey,
    (g.fields.length ? fieldsGrid(g.fields) : '') + (g.toggles.length ? toggleRowsHTML(g.toggles) : ''),
  )).join('');
  const automation = panel({
    id: 'gen-auto', titleKey: 'adm.set.gen.automationTitle', descKey: 'adm.set.gen.auto.sub', icon: 'settings', accent: 'sky',
    bodyHTML: autoBody + previewNote()
      + `<div class="mt-2">${primaryGate('adm.set.gen.auto.save', 'check', 'adm.set.gen.auto.saveReason')}</div>`,
  });

  const locations = panel({ id: 'gen-loc', titleKey: 'adm.set.loc.title', icon: 'map-pin', accent: 'teal', bodyHTML: LOCATIONS.map((r) => valRow(r.labelKey, r.valueKey)).join('') });
  const headsRows = EXPENSE_HEADS.map((h) => `<div class="set-row"><div class="min-w-0"><div class="set-label">${t(h.nameKey)}</div></div><div class="shrink-0">${headStatusChip(h.statusId)}</div></div>`).join('');
  const heads = panel({
    id: 'gen-heads', titleKey: 'adm.set.heads.title', descKey: 'adm.set.heads.sub', icon: 'wallet', accent: 'amber',
    bodyHTML: headsRows + `<div class="mt-2">${button({ labelKey: 'adm.set.heads.add', variant: 'secondary', size: 'sm', icon: 'plus', attrs: 'data-drawer="head-add"' })}</div>`,
  });
  return identity + automation + locations + heads + headAddDrawer();
}

/* Spec 032 (FC-39) — the Add-expense-head form drawer: name + status ONLY. */
function headAddDrawer() {
  const fields = field({ labelKey: 'adm.set.heads.name', name: 'headAdd-name', full: true })
    + field({ labelKey: 'adm.set.heads.status', name: 'headAdd-status', type: 'select', options: FORM_STATUS_OPTS, full: true });
  return formDrawer('head-add', { titleKey: 'adm.set.heads.addTitle', headIcon: 'plus', tone: 'amber', fields, ctaKey: 'common.add' });
}

/* ---------------- Notifications ---------------- */
/* All 47 legacy controls: 13 field() (10 channel selects + 3 numerics) + 34
 * data-toggle previews (5 masters + 29 events). 0 omitted, 0 invented.
 * The channel enum is 0/1/3/4/5 — value 2 does not exist in legacy. */
function notifBlock(b) {
  const chans = [b.channel, ...(b.extraChannels || [])].filter(Boolean);
  const selects = chans.map((c) => field({ labelKey: c.labelKey, name: c.name, type: 'select', options: chanOpts(c.def) }));
  const numbers = (b.numbers || []).map((n) => field({ labelKey: n.labelKey, name: n.name, type: 'number', value: n.value }));
  const grid = `<div class="wiz-grid">${selects.join('')}${numbers.join('')}</div>`;
  /* honest, static: choosing WhatsApp/E-mail routes nothing until that provider is
   * configured on the server. This never claims a channel is live. */
  const dep = `<p class="set-help">${icon('lock', 'ico ico-sm')} ${t('adm.set.notif.depNote')}</p>`;
  const events = (b.events || []).length ? toggleRowsHTML(b.events) : '';
  return accGroup(b.recipientKey, grid + dep + events, true);
}
function notificationsPanel() {
  return NOTIF_SECTIONS.map((s) => panel({
    id: `notif-${s.id}`, titleKey: s.titleKey, icon: s.icon, accent: s.accent,
    bodyHTML: (s.masters.length ? toggleRowsHTML(s.masters) : '')
      + s.blocks.map(notifBlock).join('')
      + previewNote()
      + `<div class="mt-2">${primaryGate('adm.set.notif.save', 'check', 'adm.set.notif.saveReason')}</div>`,
  })).join('');
}

/* ---------------- Customization (theme/lang REAL) ---------------- */
function swatchRow(c) {
  return `<div class="set-row">
    <div class="min-w-0"><div class="set-label">${t(c.labelKey)}</div></div>
    <div class="shrink-0 flex items-center gap-2">
      <span class="set-swatch" style="background:${esc(c.hex)}"></span>
      ${field({ labelKey: c.labelKey, name: c.name, value: c.hex })}
    </div>
  </div>`;
}
function customizationPanel() {
  /* theme + language stay REAL — the only genuine writes on this page. */
  const appearance = settingsSection(SEC.appearance);
  const personal = `<p class="text-[12px] mb-3" style="color:var(--c-ink-3)">${t('adm.set.cust.personalNote')}</p>`;

  const layout = panel({
    id: 'cust-layout', titleKey: 'adm.set.cust.layoutTitle', descKey: 'adm.set.cust.layoutSub', icon: 'sparkles', accent: 'violet',
    bodyHTML: fieldsGrid(APPEARANCE_OPTS) + previewNote(),
  });
  const brand = panel({
    id: 'cust-brand', titleKey: 'adm.set.cust.brandTitle', descKey: 'adm.set.cust.brandSub', icon: 'sparkles', accent: 'violet',
    bodyHTML: BRAND_COLORS.map(swatchRow).join('')
      + accGroup('adm.set.cust.statusColorsTitle', STATUS_COLORS.map(swatchRow).join(''))
      + `<p class="set-help mt-2">${icon('info', 'ico ico-sm')} ${t('adm.set.cust.contrastNote')}</p>`
      + previewNote()
      + `<div class="flex flex-wrap gap-2 mt-2">${primaryGate('adm.set.cust.brandSave', 'check', 'adm.set.cust.brandSaveReason')}${gate('adm.set.cust.reset', 'retry', 'adm.set.cust.resetReason')}${gate('adm.set.cust.msgBuilder', 'messages', 'adm.set.cust.msgBuilderReason')}</div>`,
  });
  return personal + appearance + layout + brand;
}

/* ---------------- Security ---------------- */
/* 4 imports (33 SAFE column structure rows — password/hour_rate/currency REJECTED,
 * and the legacy example VALUES 25.50 / 30.00 / 150.00 / the currency enum are not
 * ported either) + backup + 2 policies + 2FA. Every action is a DIRECT gate:
 * Spec 040 adds zero data-confirm chains. */
function importCard(im) {
  const cols = im.columns.map((c) => `<div class="set-struct"><div class="min-w-0"><div class="ss-label">${esc(c)}</div></div></div>`).join('');
  const actions = [
    gate('adm.set.sec.imp.upload', 'lock', 'adm.set.sec.imp.uploadReason'),
    im.template ? gate('adm.set.sec.imp.template', 'download', 'adm.set.sec.imp.templateReason') : '',
  ].join('');
  return panel({
    id: im.id, titleKey: im.titleKey, descKey: im.descKey, icon: 'file-text', accent: 'primary',
    bodyHTML: accGroup('adm.set.sec.imp.columns', cols)
      + `<p class="set-help mt-2">${t('adm.set.sec.imp.scopeNote')}</p>`
      + `<div class="flex flex-wrap gap-2 mt-2">${actions}</div>`,
  });
}
function securityPanel() {
  const imports = SECURITY_IMPORTS.map(importCard).join('');

  const backup = panel({
    id: 'sec-backup', titleKey: 'adm.set.sec.backupTitle', descKey: 'adm.set.sec.backupSub', icon: 'download', accent: 'amber',
    bodyHTML: `<div class="wiz-grid">${field({ labelKey: BACKUP.labelKey, name: BACKUP.name })}</div>`
      + `<p class="set-help">${t(BACKUP.helpKey)}</p>`
      /* standing copy: scope · destination · permission · audit — the four facts a real
       * backup needs. Legacy fired a real DB backup from a bare <a> with NO confirm and
       * then redirected to SMTP. Not reproduced. */
      + `<p class="set-help mt-1">${icon('lock', 'ico ico-sm')} ${t('adm.set.sec.backupScope')}</p>`
      + `<div class="flex flex-wrap gap-2 mt-2">${primaryGate('adm.set.sec.backupSave', 'check', 'adm.set.sec.backupSaveReason')}${gate('adm.set.sec.backupSend', 'download', 'adm.set.sec.backupSendReason')}</div>`,
  });

  const policies = POLICIES.map((p) => panel({
    id: `sec-pol-${p.id}`, titleKey: p.titleKey, icon: 'reports', accent: 'primary',
    bodyHTML: `<p class="text-[12.5px]" style="color:var(--c-ink-2);line-height:1.7">${t(p.bodyKey)}</p>`
      + `<div class="mt-2">${gate('adm.set.sec.polEdit', 'edit', 'adm.set.sec.polEditReason')}</div>`,
  })).join('');

  /* 2FA relocated from General > Accessibility: structure row + gate. `otp` is NOT
   * rendered — legacy uses ONE shared OTP-destination phone for ALL admins. */
  const tfa = panel({
    id: 'sec-tfa', titleKey: 'adm.set.sec.tfaTitle', icon: 'lock', accent: 'teal',
    bodyHTML: structRow(TFA_ROW) + `<div class="mt-2">${gate('adm.set.sec.tfaEnable', 'lock', 'adm.set.sec.tfaReason')}</div>`,
  });

  return settingsSection(SEC.account) + imports + backup + policies + tfa;
}

/* ---------------- Users (deep-link to the ONE staff home) ---------------- */
/* 0-diff by design: a real link + a read-only RBAC preview. No forms, no drawers,
 * no mutation controls, no parallel user model. staff.html owns staff management. */
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
function usersPanel() {
  const link = panel({
    id: 'users-open', titleKey: 'adm.set.users.title', descKey: 'adm.set.users.sub', icon: 'staff', accent: 'teal',
    bodyHTML: `<a class="btn btn-secondary btn-sm" href="${getLang() === 'en' ? 'staff.en.html' : 'staff.html'}">${icon('staff', 'ico ico-sm')}<span>${t('adm.set.users.open')}</span></a>`,
  });
  return link + rolesSection();
}

/* ---------------- Integrations (+ the payment-methods fold) ---------------- */
/* 11 providers. Every one authored `notConfigured` — legacy shipped all 11 with
 * is_enabled ON while showing "No data found", and PayPal defaulting to LIVE.
 * Both refused. No CARD carries an enable control; the preview enable lives inside
 * the drawer behind a gated Save. No chip may read «متصل» / "connected". */
function integStatusChip(id) { const s = INTEG_STATUS[id] || {}; return chip({ labelKey: s.labelKey || 'adm.set.integ.st.notConfigured', tone: s.tone || 'neutral', icon: s.icon || 'x-circle' }); }

function integCard(ig) {
  return `<div class="card p-4 flex flex-col gap-3" data-integration="${esc(ig.id)}">
    <div class="flex items-center gap-3">
      ${medallion({ icon: 'grid', tone: 'neutral', variant: 'soft', size: 'sm' })}
      <div class="min-w-0"><h3 class="font-bold text-ink text-[14px] truncate">${t(ig.nameKey)}</h3>
        <p class="text-[12px]" style="color:var(--c-ink-3)">${t(INTEG_KIND[ig.kindId])}</p></div>
      <div class="ms-auto">${integStatusChip(ig.statusId)}</div>
    </div>
    <div class="flex flex-wrap gap-1.5">
      ${button({ labelKey: 'adm.set.integ.configure', variant: 'secondary', size: 'sm', icon: 'settings', attrs: `data-drawer="${esc(ig.drawer)}"` })}
      ${gate('adm.set.integ.connect', 'lock', 'adm.set.integ.connectReason')}
    </div>
  </div>`;
}

/* one Configure drawer per provider. Safe fields as real field()s; sensitive
 * configuration as STRUCTURE-ONLY rows; exactly ONE primary gated final. */
function providerDrawer(ig) {
  const cfg = PROVIDER_FIELDS[ig.id] || {};
  const safe = (cfg.fields || []).length ? `<div class="wiz-grid">${(cfg.fields || []).map((f) => fieldOf(f, {})).join('')}</div>` : '';
  const helps = (cfg.fields || []).filter((f) => f.helpKey).map(helpUnder).join('');
  const tgls = (cfg.toggles || []).length ? toggleRowsHTML(cfg.toggles) : '';
  const info = (cfg.info || []).map((r) => `<div class="set-struct"><div class="min-w-0"><div class="ss-label">${t(r.labelKey)}</div><div class="ss-purpose">${t(r.purposeKey)}</div></div></div>`).join('');
  const sens = (cfg.sensitive || []).length
    ? `<div class="mt-3"><div class="font-bold text-[13px] text-ink mb-1">${t('adm.set.integ.sensitiveTitle')}</div>
       <p class="set-help mb-2">${t('adm.set.integ.sensitiveNote')}</p>
       ${(cfg.sensitive || []).map(structRow).join('')}</div>`
    : '';
  const extras = safe + helps + tgls + info + sens + previewNote()
    + `<div class="flex flex-wrap gap-2 mt-3">${gate('adm.set.integ.test', 'retry', 'adm.set.integ.testReason')}${ig.id === 'whatsapp' ? gate('adm.set.integ.pair', 'lock', 'adm.set.integ.pairReason') : ''}</div>`;
  /* formDrawer renders the ONE primary backendRequired final; `fields` is our body. */
  return formDrawer(ig.drawer, {
    titleKey: ig.nameKey, headIcon: 'grid', tone: 'primary',
    fields: extras, ctaKey: 'adm.set.integ.saveConfig', reasonKey: 'adm.set.integ.saveConfigReason',
  });
}

function integrationsPanel() {
  const cards = `<div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">${INTEGRATIONS.map(integCard).join('')}</div>`;
  const catalog = panel({
    id: 'integ', titleKey: 'adm.set.integ.title', descKey: 'adm.set.integ.sub', icon: 'grid', accent: 'primary',
    bodyHTML: `<p class="text-[12.5px] mb-3" style="color:var(--c-ink-3)">${t('adm.set.integ.waStatus')}</p>${cards}`,
  });
  /* Payment methods fold in here — no nav item, no page, no chooser (the catalogue
   * IS the chooser). 0 authored instances -> an honest empty state; no count is
   * fabricated and the legacy edit form's real PII is never ported. */
  const methods = panel({
    id: 'integ-pm', titleKey: 'adm.set.integ.pm.title', descKey: 'adm.set.integ.pm.sub', icon: 'wallet', accent: 'teal',
    bodyHTML: `<div class="empty-state"><div class="font-bold text-[13px] text-ink">${t(PAYMENT_METHOD_EMPTY.titleKey)}</div>
      <p class="text-[12.5px] mt-1" style="color:var(--c-ink-3)">${t(PAYMENT_METHOD_EMPTY.bodyKey)}</p></div>`,
  });
  return catalog + methods + INTEGRATIONS.map(providerDrawer).join('');
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
    <div style="max-width:980px">${views}</div>
  `;
}
