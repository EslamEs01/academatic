/* Spec 031 — Staff / Users / RBAC fixtures. Display-only authored demo data.
 * Deliberately NO password, NO salary/pay figure, NO real PII (all names/emails/phones
 * are invented). The RBAC matrix is an authored grouped list — informational only, never
 * a working permission engine. Role is a fixed enum (legacy has no role-definition CRUD). */

export const STAFF_ROLES = {
  manager: 'adm.staff.role.manager',
  accountant: 'adm.staff.role.accountant',
  supervisor: 'adm.staff.role.supervisor',
  support: 'adm.staff.role.support',
};

/* status → { tone (styled chip tone only), icon (sprite id) } */
export const STAFF_STATUS = {
  active: { tone: 'completed', icon: 'check-circle' },
  onhold: { tone: 'amber', icon: 'pause-circle' },
  inactive: { tone: 'neutral', icon: 'x-circle' },
};
export const STAFF_STATUS_ORDER = ['active', 'onhold', 'inactive'];

/* authored staff rows — name/username/phone/email/role/status ONLY. */
export const STAFF = [
  { id: 'st1', nameKey: 'adm.staff.name.st1', username: 'r.mansour', phone: '05xx-xx-1180', emailKey: 'adm.staff.email.st1', roleId: 'manager',    statusId: 'active' },
  { id: 'st2', nameKey: 'adm.staff.name.st2', username: 'h.saad',    phone: '05xx-xx-2274', emailKey: 'adm.staff.email.st2', roleId: 'supervisor', statusId: 'active' },
  { id: 'st3', nameKey: 'adm.staff.name.st3', username: 'n.qadi',    phone: '05xx-xx-3391', emailKey: 'adm.staff.email.st3', roleId: 'accountant', statusId: 'active' },
  { id: 'st4', nameKey: 'adm.staff.name.st4', username: 'w.otaibi',  phone: '05xx-xx-4402', emailKey: 'adm.staff.email.st4', roleId: 'support',    statusId: 'onhold' },
  { id: 'st5', nameKey: 'adm.staff.name.st5', username: 'l.harbi',   phone: '05xx-xx-5518', emailKey: 'adm.staff.email.st5', roleId: 'supervisor', statusId: 'inactive' },
];
export const STAFF_BY_ID = Object.fromEntries(STAFF.map((s) => [s.id, s]));

/* RBAC permission matrix — authored grouped list, DISPLAY-ONLY (no enforcement,
 * no persisted `checked`). ~10 groups standing in for the legacy ~17-group set;
 * `granted` is an authored boolean the drawer renders as an icon+label row. */
export const PERM_GROUPS = [
  { labelKey: 'adm.staff.perm.g.dashboard', items: [{ k: 'view', granted: true }, { k: 'export', granted: true }] },
  { labelKey: 'adm.staff.perm.g.requests',  items: [{ k: 'view', granted: true }, { k: 'manage', granted: true }] },
  { labelKey: 'adm.staff.perm.g.families',   items: [{ k: 'view', granted: true }, { k: 'manage', granted: true }, { k: 'create', granted: true }] },
  { labelKey: 'adm.staff.perm.g.students',   items: [{ k: 'view', granted: true }, { k: 'manage', granted: true }, { k: 'create', granted: false }] },
  { labelKey: 'adm.staff.perm.g.teachers',   items: [{ k: 'view', granted: true }, { k: 'manage', granted: false }] },
  { labelKey: 'adm.staff.perm.g.reports',    items: [{ k: 'view', granted: true }, { k: 'export', granted: true }] },
  { labelKey: 'adm.staff.perm.g.finance',    items: [{ k: 'view', granted: true }, { k: 'manage', granted: false }] },
  { labelKey: 'adm.staff.perm.g.content',    items: [{ k: 'view', granted: true }, { k: 'manage', granted: true }] },
  { labelKey: 'adm.staff.perm.g.certs',      items: [{ k: 'view', granted: true }, { k: 'create', granted: true }] },
  { labelKey: 'adm.staff.perm.g.settings',   items: [{ k: 'view', granted: true }, { k: 'manage', granted: false }] },
];

/* category-scope (student/teacher visibility) — read-only drawer content. */
export const STAFF_CATEGORIES = [
  { labelKey: 'adm.staff.cat.students', scopeKey: 'adm.staff.cat.studentsScope' },
  { labelKey: 'adm.staff.cat.teachers', scopeKey: 'adm.staff.cat.teachersScope' },
];

/* activity log — read-only audit rows (entity / action / relative date). */
export const STAFF_ACTIVITY = [
  { entityKey: 'adm.staff.activity.e.course',  actionKey: 'adm.staff.activity.a.created', dateKey: 'adm.staff.activity.d.today' },
  { entityKey: 'adm.staff.activity.e.student', actionKey: 'adm.staff.activity.a.updated', dateKey: 'adm.staff.activity.d.today' },
  { entityKey: 'adm.staff.activity.e.login',   actionKey: 'adm.staff.activity.a.login',   dateKey: 'adm.staff.activity.d.yesterday' },
  { entityKey: 'adm.staff.activity.e.class',   actionKey: 'adm.staff.activity.a.updated', dateKey: 'adm.staff.activity.d.yesterday' },
];
