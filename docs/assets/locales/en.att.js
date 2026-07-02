/* Spec 005 — English keys (attendance & session outcomes). Mirrors ar.att.js. */
export default {
  topbar: {
    title: { attendance: 'Attendance & Session Outcomes' },
    crumb: { attendance: 'Attendance' },
  },
  nav: { attendance: 'Attendance' },

  outcome: {
    attended: 'Attended', studentAbsent: 'Student absent', teacherAbsent: 'Teacher absent',
    cancelled: 'Cancelled', rescheduled: 'Rescheduled', upcoming: 'Upcoming', live: 'Live',
    makeUpSuggested: 'Make-up suggested', needsFollowUp: 'Needs follow-up',
  },

  dash: { outcomeFollowUp: '{n} need follow-up today' },

  att: {
    title: 'Attendance & Session Outcomes', sub: 'Review today’s session outcomes: attendance, absences, cancellations, reschedules, and follow-up.',
    searchPh: 'Search sessions…',
    fDay: 'Day', fTeacher: 'Teacher', fFamily: 'Family', fSubject: 'Subject', fOutcome: 'Outcome', fAttention: 'Follow-up',
    allDays: 'All days', allOutcomes: 'All outcomes', allTeachers: 'All teachers', allFamilies: 'All families',
    needsFollowUpOpt: 'Needs follow-up', fCancelledResched: 'Cancelled or rescheduled',

    tile: {
      total: 'Total sessions', attended: 'Attended', studentAbsent: 'Student absences',
      teacherAbsent: 'Teacher absences', cancelledRescheduled: 'Cancelled & rescheduled', needsFollowUp: 'Needs follow-up',
    },

    outcome: 'Outcome', student: 'Student', viewProfile: 'View profile', present: 'Present',
    attribution: {
      studentAbsent: 'The student was absent', teacherAbsent: 'The teacher was absent',
      cancelTeacher: 'Cancelled by the teacher', cancelStudent: 'Cancelled by the family', cancelAdmin: 'Cancelled by the admin',
    },
    makeup: { auto: 'Auto make-up (demo)', reschedule: 'Make-up by reschedule', credit: 'Added to credit (demo)' },
    followUp: { absence: 'Follow up an absence', cancel: 'Follow up a cancellation', reschedule: 'Confirm the reschedule', feedback: 'Awaiting teacher feedback' },
    feedback: 'Teacher note', viewInSchedule: 'View in schedule', viewAttendance: 'View attendance',
    newTime: 'New time',

    act: {
      attend: 'Mark attended', attendToast: 'Marked attended (demo) — nothing is saved.',
      notify: 'Notify family', notifyToast: 'Notification sent (demo).',
      feedback: 'Add note', feedbackToast: 'Add-note opened (demo).',
      reverse: 'Reverse', reverseToast: 'Outcome reversed (demo).',
      cancel: 'Cancel session', cancelTitle: 'Cancel this session?', cancelMsg: 'A front-end demo only — it does not affect any real data.', cancelCta: 'Cancel session', cancelToast: 'Cancelled (demo).',
      reschedule: 'Reschedule', rescheduleTitle: 'Reschedule this session?', rescheduleMsg: 'A front-end demo only — no real time is booked.', rescheduleCta: 'Reschedule', rescheduleToast: 'Reschedule opened (demo).',
      studentAbsent: 'Mark student absent', studentAbsentTitle: 'Mark the student absent?', studentAbsentMsg: 'A front-end demo only — nothing is saved.', studentAbsentCta: 'Mark absent', studentAbsentToast: 'Student marked absent (demo).',
      teacherAbsent: 'Mark teacher absent', teacherAbsentTitle: 'Mark the teacher absent?', teacherAbsentMsg: 'A front-end demo only — nothing is saved.', teacherAbsentCta: 'Mark absent', teacherAbsentToast: 'Teacher marked absent (demo).',
      addToCredit: 'Add to credit',
    },
    reason: {
      finance: 'Requires the billing/credit module (out of current scope).',
      persist: 'Saving outcomes needs the backend (out of current scope).',
      notify: 'Real messaging needs the notifications backend (out of current scope).',
    },

    empty: { title: 'No sessions for this day yet', msg: 'Session outcomes will appear here once sessions are held.' },

    studentSignalTitle: 'Recent attendance', studentSignal: 'Attended {a} of {m} sessions', studentFollowUp: '{k} to follow up',
    familySignalTitle: 'Children’s session follow-up', familySignal: '{k} of the family’s sessions need follow-up', familyNone: 'No sessions need follow-up.',
  },

  data: {
    att: {
      reschedHint: 'to Thu 10:00 AM',
      fb: {
        good: 'Engaged and performed excellently during the session.',
        support: 'Needs to keep up with homework before the next session.',
      },
      note: {
        attended: 'The session ran in full as planned.',
        studentAbsent: 'The student did not attend; the family was notified.',
        teacherAbsent: 'The teacher was unavailable; awaiting a make-up.',
        cancelled: 'The session was cancelled before its time.',
        rescheduled: 'The session was moved to a new time.',
        upcoming: 'An upcoming session in today’s schedule.',
        live: 'A session in progress right now.',
      },
    },
  },
};
