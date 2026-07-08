/* Spec 026 — authored, static fixtures for the two folded ops bands:
 *   total-queues  → folded into the Sessions page (an ops queue/notes band)
 *   schedule-requests → folded into the Schedule page (a pending-requests inbox preview)
 * Display-only. No pay figures, no computed values, no persistence. Grounded in the
 * legacy management-total-queues / management-schedule-*-response captures (both empty at
 * crawl → content is authored, and every write is an honest backendRequired gate). */

/* an operational queue/note attached to a class (level · text · class · status) */
export const QUEUE_ITEMS = [
  { id: 'q1', levelId: 'urgent', textKey: 'ops.queue.i.q1', classKey: 'ops.queue.cls.math', statusId: 'open' },
  { id: 'q2', levelId: 'medium', textKey: 'ops.queue.i.q2', classKey: 'ops.queue.cls.english', statusId: 'inprogress' },
  { id: 'q3', levelId: 'normal', textKey: 'ops.queue.i.q3', classKey: 'ops.queue.cls.science', statusId: 'open' },
];

/* a pending schedule/trial request awaiting admin review (student · course · when · kind) */
export const SCHEDULE_REQUESTS = [
  { id: 'r1', studentKey: 'ops.req.s.salman', courseKey: 'ops.req.c.math', whenKey: 'ops.req.w.satEve', kindId: 'regular' },
  { id: 'r2', studentKey: 'ops.req.s.dana', courseKey: 'ops.req.c.english', whenKey: 'ops.req.w.monMorn', kindId: 'trial' },
];
