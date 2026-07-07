/* Spec 026 — Public Holiday windows (display-only authored fixtures).
 *
 * A DISPLAY-ONLY list of authored holiday windows grounded in the legacy
 * `management-public-holiday` surface (a holiday window + a category/teacher scope
 * + a Submit button). There is NO scheduler, NO bulk-cancel engine, NO computed
 * status, and display-only authored counts (no monetary values). Every window is an authored
 * row; `statusKey` is an authored label (active|scheduled|ended), never a computed
 * state. The two write paths (Set holiday, Bulk absence) are honest
 * `backendRequired` gates in the page — they never persist or mutate a session.
 *
 * HolidayWindow: { id, titleKey, fromLabel, toLabel, scopeLabel, statusKey } —
 * `*Label`/`titleKey` values are locale keys resolved via `t()` so AR and EN stay
 * mirrored. Ordered current + upcoming first, ended last. */

export const PUBLIC_HOLIDAYS = [
  {
    id: 'ph-summer',
    titleKey: 'ph.win.summer.name',
    fromLabel: 'ph.win.summer.from',
    toLabel: 'ph.win.summer.to',
    scopeLabel: 'ph.win.summer.scope',
    statusKey: 'active',
  },
  {
    id: 'ph-national',
    titleKey: 'ph.win.national.name',
    fromLabel: 'ph.win.national.from',
    toLabel: 'ph.win.national.to',
    scopeLabel: 'ph.win.national.scope',
    statusKey: 'scheduled',
  },
  {
    id: 'ph-autumn',
    titleKey: 'ph.win.autumn.name',
    fromLabel: 'ph.win.autumn.from',
    toLabel: 'ph.win.autumn.to',
    scopeLabel: 'ph.win.autumn.scope',
    statusKey: 'scheduled',
  },
  {
    id: 'ph-fitr',
    titleKey: 'ph.win.fitr.name',
    fromLabel: 'ph.win.fitr.from',
    toLabel: 'ph.win.fitr.to',
    scopeLabel: 'ph.win.fitr.scope',
    statusKey: 'ended',
  },
  {
    id: 'ph-midyear',
    titleKey: 'ph.win.midyear.name',
    fromLabel: 'ph.win.midyear.from',
    toLabel: 'ph.win.midyear.to',
    scopeLabel: 'ph.win.midyear.scope',
    statusKey: 'ended',
  },
];

/* authored status → chip presentation (tone + icon + label key). NOT computed. */
export const HOLIDAY_STATUS = {
  active: { tone: 'completed', icon: 'sun', labelKey: 'ph.status.active' },
  scheduled: { tone: 'upcoming', icon: 'calendar-clock', labelKey: 'ph.status.scheduled' },
  ended: { tone: 'neutral', icon: 'check', labelKey: 'ph.status.ended' },
};

/* Django-parity alias (the template iterates `holiday_windows`). */
export const HOLIDAY_WINDOWS = PUBLIC_HOLIDAYS;
