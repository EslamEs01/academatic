/* Settings shell (fixture). Each row control is one of: real / demo / disabled. */
export const SETTINGS = [
  {
    id: 'profile', titleKey: 'set.sec.profile', descKey: 'set.sec.profileDesc', icon: 'graduation-cap', accent: 'primary',
    rows: [
      { labelKey: 'set.row.academyName', control: { kind: 'text', valueKey: 'set.row.academyNameVal' } },
      { labelKey: 'set.row.email', control: { kind: 'text', valueKey: 'set.row.emailVal' } },
      { labelKey: 'set.row.saveProfile', control: { kind: 'button', labelKey: 'set.row.saveProfile', variant: 'primary', icon: 'check', mode: 'demo', toastKey: 'set.savedToast' } },
    ],
  },
  {
    id: 'appearance', titleKey: 'set.sec.appearance', descKey: 'set.sec.appearanceDesc', icon: 'sun', accent: 'amber',
    rows: [
      { labelKey: 'set.row.theme', control: { kind: 'theme' } },
      { labelKey: 'set.row.language', control: { kind: 'lang' } },
    ],
  },
  {
    id: 'notif', titleKey: 'set.sec.notif', descKey: 'set.sec.notifDesc', icon: 'bell', accent: 'sky',
    rows: [
      { labelKey: 'set.row.sessionAlerts', control: { kind: 'toggle', on: true, mode: 'demo', toastKey: 'set.savedToast' } },
      { labelKey: 'set.row.weeklyReport', control: { kind: 'toggle', on: false, mode: 'demo', toastKey: 'set.savedToast' } },
      { labelKey: 'set.row.billingAlerts', helpKey: 'set.reason.billing', control: { kind: 'toggle', mode: 'disabled', reasonKey: 'set.reason.billing' } },
    ],
  },
  {
    id: 'account', titleKey: 'set.sec.account', descKey: 'set.sec.accountDesc', icon: 'user', accent: 'teal',
    rows: [
      { labelKey: 'set.row.twoFactor', helpKey: 'set.reason.backend', control: { kind: 'button', labelKey: 'common.edit', mode: 'disabled', reasonKey: 'set.reason.backend' } },
      { labelKey: 'set.row.resetData', control: { kind: 'reset' } },
    ],
  },
];

/* Roles & permissions — read-only preview (no enforcement) */
export const ROLES_PREVIEW = {
  roleKey: 'set.perm.roleAdmin',
  groups: [
    { labelKey: 'set.perm.group.sessions', items: ['view', 'manage', 'create', 'export'] },
    { labelKey: 'set.perm.group.people', items: ['view', 'manage', 'create'] },
    { labelKey: 'set.perm.group.content', items: ['view', 'manage', 'create'] },
    { labelKey: 'set.perm.group.settings', items: ['view', 'manage'] },
  ],
};
