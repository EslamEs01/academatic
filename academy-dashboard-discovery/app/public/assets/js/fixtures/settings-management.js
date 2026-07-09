/* Spec 031 — Settings-hub fixtures (General identity + Locations + expense-heads +
 * Notifications matrix + Security policies + Customization brand + Integrations).
 * Display-only authored data. NO pay-rate/salary figure, NO amount on expense-heads,
 * figure-free notifications, NO credential/API-key/secret/webhook/password on any
 * integration (locked placeholders show provider name + status ONLY). No real PII. */

/* General — academy identity (authored literal value rows). */
export const IDENTITY_ROWS = [
  { labelKey: 'adm.set.gen.name',    valueKey: 'adm.set.gen.nameVal' },
  { labelKey: 'adm.set.gen.domain',  valueKey: 'adm.set.gen.domainVal' },
  { labelKey: 'adm.set.gen.email',   valueKey: 'adm.set.gen.emailVal' },
  { labelKey: 'adm.set.gen.phone',   valueKey: 'adm.set.gen.phoneVal' },
  { labelKey: 'adm.set.gen.whatsapp', valueKey: 'adm.set.gen.whatsappVal' },
];

/* Locations display slice (B-02 / M-04) — country/city/timezone/address; no page. */
export const LOCATIONS = [
  { labelKey: 'adm.set.loc.country',  valueKey: 'adm.set.loc.countryVal' },
  { labelKey: 'adm.set.loc.city',     valueKey: 'adm.set.loc.cityVal' },
  { labelKey: 'adm.set.loc.timezone', valueKey: 'adm.set.loc.timezoneVal' },
  { labelKey: 'adm.set.loc.address',  valueKey: 'adm.set.loc.addressVal' },
];

/* Expense heads lookup — name + status ONLY, NO amount (031-owned, figure-free). */
export const EXPENSE_HEAD_STATUS = {
  active:   { tone: 'completed', icon: 'check-circle', labelKey: 'adm.set.heads.active' },
  inactive: { tone: 'neutral',   icon: 'x-circle',     labelKey: 'adm.set.heads.inactive' },
};
export const EXPENSE_HEADS = [
  { id: 'hd1', nameKey: 'adm.set.heads.rent',      statusId: 'active' },
  { id: 'hd2', nameKey: 'adm.set.heads.utilities', statusId: 'active' },
  { id: 'hd3', nameKey: 'adm.set.heads.supplies',  statusId: 'active' },
  { id: 'hd4', nameKey: 'adm.set.heads.marketing', statusId: 'inactive' },
];

/* Notifications matrix — event × channel authored on/off toggles. Figure-free
 * (the `salaries` row is an on/off notify toggle with NO amount). */
export const NOTIF_MATRIX = [
  { eventKey: 'adm.set.notif.e.courseUpdates', channelKey: 'adm.set.notif.ch.app',   on: true },
  { eventKey: 'adm.set.notif.e.classUpdates',  channelKey: 'adm.set.notif.ch.app',   on: true },
  { eventKey: 'adm.set.notif.e.classReminder', channelKey: 'adm.set.notif.ch.wa',    on: true },
  { eventKey: 'adm.set.notif.e.invoice',       channelKey: 'adm.set.notif.ch.email', on: true },
  { eventKey: 'adm.set.notif.e.salaries',      channelKey: 'adm.set.notif.ch.app',   on: false },
  { eventKey: 'adm.set.notif.e.familyStatus',  channelKey: 'adm.set.notif.ch.email', on: false },
];

/* Security — policy documents (display-only text). */
export const POLICIES = [
  { id: 'family',  titleKey: 'adm.set.pol.familyTitle',  bodyKey: 'adm.set.pol.familyBody' },
  { id: 'teacher', titleKey: 'adm.set.pol.teacherTitle', bodyKey: 'adm.set.pol.teacherBody' },
];

/* Customization — brand + status color swatches (display-only; save = gate). */
export const BRAND_ROWS = [
  { labelKey: 'adm.set.brand.primary',   swatch: '#6d5efc' },
  { labelKey: 'adm.set.brand.secondary', swatch: '#12b5a5' },
  { labelKey: 'adm.set.brand.running',   swatch: '#3aa0ff' },
  { labelKey: 'adm.set.brand.attend',    swatch: '#2fbf71' },
];

/* Integrations — locked placeholder cards: provider name + status ONLY.
 * NEVER a credential/api-key/secret/webhook/password. status stays "not connected". */
export const INTEG_KIND = {
  payment:  'adm.set.integ.kind.payment',
  payout:   'adm.set.integ.kind.payout',
  whatsapp: 'adm.set.integ.kind.whatsapp',
  email:    'adm.set.integ.kind.email',
};
export const INTEG_STATUS = {
  notConnected: { tone: 'neutral', icon: 'x-circle', labelKey: 'adm.set.integ.st.notConnected' },
  available:    { tone: 'amber',   icon: 'clock',    labelKey: 'adm.set.integ.st.available' },
};
export const INTEGRATIONS = [
  { id: 'ig1', nameKey: 'adm.set.integ.p.stripe',   kindId: 'payment',  statusId: 'available' },
  { id: 'ig2', nameKey: 'adm.set.integ.p.paypal',   kindId: 'payment',  statusId: 'available' },
  { id: 'ig3', nameKey: 'adm.set.integ.p.paymob',   kindId: 'payment',  statusId: 'notConnected' },
  { id: 'ig4', nameKey: 'adm.set.integ.p.paymobPo', kindId: 'payout',   statusId: 'notConnected' },
  { id: 'ig5', nameKey: 'adm.set.integ.p.payoneer', kindId: 'payout',   statusId: 'notConnected' },
  { id: 'ig6', nameKey: 'adm.set.integ.p.whatsapp', kindId: 'whatsapp', statusId: 'available' },
  { id: 'ig7', nameKey: 'adm.set.integ.p.email',    kindId: 'email',    statusId: 'notConnected' },
];
