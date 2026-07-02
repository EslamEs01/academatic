/* Fixture admin identity (display only — no auth, no real permissions). */
export const PROFILE = {
  nameKey: 'data.profile.name',
  roleKey: 'data.profile.role',
  avatarText: 'ن',          // overridden by initial-from-name at render where useful
  avatarAccent: 'violet',
  avatarImage: null,         // null → exercises the initials fallback
  // fixture permission flags — used ONLY to demonstrate disabled-with-reason
  permissions: ['view_dashboard', 'view_revenue', 'view_attendance', 'view_students'],
};
