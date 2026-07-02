/* Single source of truth for session status → tone (token accent) + icon + label.
 * Every chip/tile/table cell resolves status here so colors never drift.
 * See contracts/tokens-contract.md T7. */
export const STATUS = {
  live:      { id: 'live',      tone: 'live',      icon: 'play',         labelKey: 'status.live' },
  upcoming:  { id: 'upcoming',  tone: 'upcoming',  icon: 'clock',        labelKey: 'status.upcoming' },
  completed: { id: 'completed', tone: 'completed', icon: 'check-circle', labelKey: 'status.completed' },
  cancelled: { id: 'cancelled', tone: 'cancelled', icon: 'x-circle',     labelKey: 'status.cancelled' },
};

export function statusOf(id) { return STATUS[id] || STATUS.upcoming; }
export const STATUS_ORDER = ['cancelled', 'upcoming', 'live', 'completed'];
