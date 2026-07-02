/* Families fixture (Spec 004) — the guardian/parent ACCOUNT is the Family; its
 * children are the students nested under it (Family.studentIds[] ↔ Student.familyId).
 * Display-only placeholder content (no legacy/private wording). The lifecycle
 * status resolves through components/family-status.js (FAMILY_STATUS).
 *
 * Django: FAMILIES.rows → {% for family in families %}; family.students resolves
 * studentIds via the Student model; plan/contact/location are display-only stubs. */

/* CRM-style segmentation tiers (R28) — power the Families category facet + chips.
 * The dedicated family-categories admin page stays PLANNED (nav item, no route). */
export const FAMILY_CATEGORIES = [
  { id: 'premium',     nameKey: 'fam.cat.premium',     descKey: 'fam.cat.premiumDesc',     statusId: 'active',   count: 2 },
  { id: 'standard',    nameKey: 'fam.cat.standard',    descKey: 'fam.cat.standardDesc',    statusId: 'active',   count: 4 },
  { id: 'trial',       nameKey: 'fam.cat.trial',       descKey: 'fam.cat.trialDesc',       statusId: 'active',   count: 1 },
  { id: 'scholarship', nameKey: 'fam.cat.scholarship', descKey: 'fam.cat.scholarshipDesc', statusId: 'inactive', count: 1 },
];

/* shared display-only placeholders (contact + location) — never real data */
const contact = (id) => ({ phoneKey: 'data.fam.phone', emailKey: `data.fam.${id}.email`, whatsappKey: 'data.fam.whatsapp' });
const location = (id) => ({ countryKey: 'data.fam.country', cityKey: `data.fam.${id}.city`, timezoneKey: 'data.fam.tz' });
/* display-only billing stub (R: no real finance) */
const plan = (id, hourRate) => ({ costTypeKey: 'fam.plan.perHour', hourRate, labelKey: `data.fam.${id}.plan` });

const fam = (o) => ({
  ...o,
  guardian: { nameKey: `data.fam.${o.id}.name`, accent: o.accent, contact: contact(o.id) },
  contact: contact(o.id),
  location: location(o.id),
  joinedDateKey: `data.fam.${o.id}.joined`,
  plan: plan(o.id, o.hourRate),
  notesKey: `data.fam.${o.id}.note`,
  attention: o.attention || null,
});

export const FAMILIES = {
  total: 8,
  rows: [
    fam({ id: 'fam1', accent: 'violet',  statusId: 'active',    categoryId: 'premium',     studentIds: ['st1', 'st6', 'st11', 'st12', 'st13'], activeCoursesCount: 9, hourRate: 80 }),
    fam({ id: 'fam2', accent: 'teal',    statusId: 'active',    categoryId: 'standard',    studentIds: ['st2', 'st7', 'st14'],                 activeCoursesCount: 5, hourRate: 65 }),
    fam({ id: 'fam3', accent: 'amber',   statusId: 'trial',     categoryId: 'trial',       studentIds: ['st3', 'st8'],                         activeCoursesCount: 3, hourRate: 0,
          attention: { kind: 'trial', labelKey: 'fam.attn.trialEnds' } }),
    fam({ id: 'fam4', accent: 'sky',     statusId: 'active',    categoryId: 'standard',    studentIds: ['st4'],                                activeCoursesCount: 4, hourRate: 70 }),
    fam({ id: 'fam5', accent: 'coral',   statusId: 'suspended', categoryId: 'standard',    studentIds: ['st5'],                                activeCoursesCount: 2, hourRate: 60,
          attention: { kind: 'billing', labelKey: 'fam.attn.payment' } }),
    fam({ id: 'fam6', accent: 'success', statusId: 'active',    categoryId: 'premium',     studentIds: ['st9'],                                activeCoursesCount: 3, hourRate: 85 }),
    fam({ id: 'fam7', accent: 'violet',  statusId: 'stopped',   categoryId: 'standard',    studentIds: ['st10'],                               activeCoursesCount: 0, hourRate: 55 }),
    fam({ id: 'fam8', accent: 'sky',     statusId: 'inactive',  categoryId: 'scholarship', studentIds: [],                                     activeCoursesCount: 0, hourRate: 0 }),
  ],
};

/* index helpers (build-time resolution of the bidirectional link) */
export const FAMILY_BY_ID = Object.fromEntries(FAMILIES.rows.map((f) => [f.id, f]));
export function familyOf(familyId) { return FAMILY_BY_ID[familyId] || null; }
