/* Data-driven navigation. Groups → items (stable id, icon id, label key, route,
 * optional badge). Future role apps supply their own config of the same shape. */
export const BRAND = {
  nameKey: 'brand.name',
  planKey: 'brand.plan',
  icon: 'graduation-cap',
};

export const NAV_GROUPS = [
  {
    id: 'general',
    labelKey: 'nav.group.general',
    items: [
      { id: 'home', labelKey: 'nav.home', icon: 'home', route: '/dashboard' },
      { id: 'sessions', labelKey: 'nav.sessions', icon: 'sessions', route: '#', badge: 24 },
      { id: 'schedule', labelKey: 'nav.schedule', icon: 'schedule', route: '#' },
    ],
  },
  {
    id: 'academic',
    labelKey: 'nav.group.academic',
    items: [
      { id: 'students', labelKey: 'nav.students', icon: 'students', route: '#' },
      { id: 'trainers', labelKey: 'nav.trainers', icon: 'trainers', route: '#' },
      { id: 'curricula', labelKey: 'nav.curricula', icon: 'curricula', route: '#' },
    ],
  },
  {
    id: 'administration',
    labelKey: 'nav.group.administration',
    items: [
      { id: 'reports', labelKey: 'nav.reports', icon: 'reports', route: '/reports' },
      { id: 'settings', labelKey: 'nav.settings', icon: 'settings', route: '#' },
    ],
  },
];

export const HELP_CARD = {
  titleKey: 'nav.help.title',
  subtitleKey: 'nav.help.subtitle',
  icon: 'help',
};
