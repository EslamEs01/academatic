/* Settings page — settings shell. Appearance is real; everything else demos
 * or is disabled-with-reason. No backend save. */
import { SETTINGS, ROLES_PREVIEW } from '../fixtures/settings.js';
import { t } from '../i18n.js';
import { icon } from '../icons.js';
import { pageHeader } from '../components/page-header.js';
import { settingsSection } from '../components/settings-section.js';

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

export function renderSettings() {
  return `
    ${pageHeader({ titleKey: 'set.title', subKey: 'set.sub' })}
    <div style="max-width:760px">
      ${SETTINGS.map(settingsSection).join('')}
      ${rolesSection()}
    </div>
  `;
}
