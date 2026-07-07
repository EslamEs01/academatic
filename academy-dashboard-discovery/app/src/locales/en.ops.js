/* Spec 026 — admin ops pages locale keys (English). Mirrors ar.ops.js. */
export default {
  sa: {
  title: 'Sessions Analysis',
  sub: 'A display-only review of session outcomes across regular and trial classes — authored counts, no scoring or ranking.',
  helpers: {
    title: 'Quick helpers',
    sub: 'The current live picture of sessions.',
  },
  reg: {
    title: 'Regular classes',
    sub: 'Session-outcome breakdown with total time per state.',
  },
  trial: {
    title: 'Trial classes',
    sub: 'A shorter view of trial-session outcomes.',
  },
  help: {
    lastSession: 'Last session',
    currentHour: 'Current hour',
    waiting: 'Waiting',
    running: 'Running',
  },
  item: {
    total: 'Total classes',
    studentCancel: 'Student cancel',
    teacherCancel: 'Teacher cancel',
    adminCancel: 'Admin cancel',
    attended: 'Attended',
    studentAbsent: 'Student absent',
    teacherAbsent: 'Teacher absent',
    pending: 'Pending',
    rescheduled: 'Rescheduled',
    makeup: 'Make-up',
    trialTotal: 'Total trials',
  },
  duration: 'Total time',
  note: 'Every count here is authored for display only — no average, score, or chart is computed, and the range refreshes once a backend service is available.',
  act: {
    export: 'Export',
  },
  reason: {
    backend: 'Requires a backend service — not available in this preview.',
  },
},
  ph: {
    title: 'Public holidays',
    sub: 'Holiday windows across teachers and categories. Set a window or apply bulk absence once the server is connected.',
    act: {
      set: 'Set holiday',
      bulk: 'Bulk absence',
    },
    reason: {
      backend: 'Available once the server is connected.',
    },
    sum: {
      windows: 'Holiday windows',
      active: 'Active now',
      scheduled: 'Scheduled',
      ended: 'Ended',
    },
    status: {
      active: 'Active',
      scheduled: 'Scheduled',
      ended: 'Ended',
    },
    list: {
      title: 'Holiday windows',
      sub: 'Current and upcoming windows first; ended windows are kept for reference.',
      next: 'Next scheduled break: National Day — 23 Sep 2026.',
    },
    card: {
      period: 'Holiday period',
      scope: 'Scope',
    },
    win: {
      summer: { name: 'Summer teaching pause', from: '1 Jul 2026', to: '31 Jul 2026', scope: 'Selected teachers' },
      national: { name: 'National Day', from: '23 Sep 2026', to: '23 Sep 2026', scope: 'All teachers' },
      autumn: { name: 'Autumn mid-term break', from: '1 Nov 2026', to: '5 Nov 2026', scope: 'Science and Programming categories' },
      fitr: { name: 'Eid al-Fitr', from: '20 Mar 2026', to: '24 Mar 2026', scope: 'All teachers' },
      midyear: { name: 'Mid-year break', from: '25 Jan 2026', to: '29 Jan 2026', scope: 'All teachers' },
    },
  },
  sca: {
    title: 'Scheduled Actions',
    sub: 'Queued lifecycle actions with an auto-return date — display only',
    action: { create: 'Create scheduled action' },
    reason: { backend: 'Requires a backend — the automation engine is not available yet' },
    sum: {
      total: 'Scheduled actions',
      queued: 'In queue',
      upcoming: 'Upcoming',
      autoReturn: 'With auto-return',
    },
    listTitle: 'Action queue',
    listSub: 'Manually authored actions; nothing runs until a backend exists.',
    field: { scheduled: 'Scheduled date', return: 'Auto-return' },
    type: {
      stopFamily: 'Stop family',
      stopStudent: 'Stop student',
      cancelClasses: 'Cancel classes',
      activateFamily: 'Activate family',
      activateStudent: 'Activate student',
    },
    status: { queued: 'Queued', upcoming: 'Upcoming', cancelled: 'Cancelled' },
    target: {
      salman: 'Salman (student)',
      famRashid: 'Al-Rashid family',
      groupMath: 'Advanced Math cohort',
      famSalem: 'Al-Salem family',
      omar: 'Omar (student)',
      lina: 'Lina (student)',
    },
    date: {
      jul12: '12 Jul 2026',
      jul15: '15 Jul 2026',
      jul18: '18 Jul 2026',
      jul20: '20 Jul 2026',
      jul24: '24 Jul 2026',
      jul28: '28 Jul 2026',
    },
    ret: {
      jul26: '26 Jul 2026',
      aug09: '9 Aug 2026',
      none: 'Full stop — no auto-return',
      na: 'Not applicable',
    },
  },
};
