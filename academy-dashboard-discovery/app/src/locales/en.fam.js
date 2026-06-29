/* Spec 004 — English keys (families & student academic profiles).
 * Mirrors ar.fam.js key-for-key; merged into en.js at runtime by i18n.js. */
export default {
  topbar: {
    title: { families: 'Families', addFamily: 'Add family', family: 'Family profile', student: 'Student profile' },
    crumb: { families: 'Families', addFamily: 'Add family', family: 'Families', student: 'Students' },
  },

  famStatus: {
    active: 'Active', trial: 'Trial', suspended: 'Suspended', stopped: 'Stopped', inactive: 'Inactive',
  },

  stu: {
    col: { family: 'Family' }, fFamily: 'Family', allFamilies: 'All families', viewProfile: 'View academic profile',
  },

  dash: {
    families: 'Families', viewFamilies: 'View families',
    studentsAttention: '{n} need follow-up', familiesHint: 'Track families and students that need attention.',
  },

  fam: {
    title: 'Families', sub: 'Family directory — each family and its children in one place.',
    add: 'Add family', searchPh: 'Search a family or guardian…',
    fStatus: 'Status', fCategory: 'Category', allCategories: 'All categories',
    sum: { total: 'Total families', active: 'Active families', attention: 'Need attention' },
    card: {
      students: 'Children', courses: 'active courses', viewProfile: 'View family profile',
      more: '+{n}', noChildren: 'No children yet', menu: 'Family actions',
    },
    cat: {
      premium: 'Premium', premiumDesc: 'Families on the advanced plan with regular attendance.',
      standard: 'Standard', standardDesc: 'Families on the standard plan.',
      trial: 'Trial', trialDesc: 'Families in the trial period.',
      scholarship: 'Scholarship', scholarshipDesc: 'Families in the scholarship program.',
    },
    plan: { perHour: 'SAR/hour' },
    attn: { trialEnds: 'Trial ending soon', payment: 'Payment overdue' },

    profileTitle: 'Family profile',
    metaChildren: '{n} children',
    tab: { overview: 'Overview', students: 'Children', schedule: 'Schedule', billing: 'Plan & Billing', notes: 'Notes' },
    kpi: { students: 'Children', courses: 'Active courses', sessions: 'Sessions this week', joined: 'Joined' },
    ov: {
      contact: 'Contact details', phone: 'Phone', email: 'Email', whatsapp: 'WhatsApp',
      location: 'Location', joined: 'Joined', category: 'Category',
      details: 'Family details', attentionTitle: 'Needs attention',
    },
    child: {
      title: 'Children', count: '{n} children', add: 'Add child',
      none: 'No children yet', noneMsg: 'Add the first child to this family and they will appear here.',
      viewProfile: 'View profile', addToast: 'Adding a child will be available once the backend is connected (demo).',
    },
    sch: { title: 'This week’s sessions', viewInSchedule: 'View in schedule', none: 'No upcoming sessions for this family.' },
    bill: {
      title: 'Plan & Billing', planLabel: 'Current plan', rate: 'Hourly rate', cycle: 'Billing cycle', cycleVal: 'Monthly',
      status: 'Billing status', statusVal: 'Up to date', reason: 'Requires the billing module (out of current scope).',
      manage: 'Manage billing', note: 'Display only — no real amounts are charged.',
    },
    notes: { title: 'Family notes', none: 'No notes yet.' },
    act: {
      edit: 'Edit', suspend: 'Suspend', stop: 'Stop subscription', addChild: 'Add child',
      editToast: 'Edit opened (demo).',
      suspendTitle: 'Suspend this family?', suspendMsg: 'A front-end demo only — it does not affect any real data.', suspendCta: 'Suspend', suspendToast: 'Suspended (demo).',
      stopTitle: 'Stop this family’s subscription?', stopMsg: 'A front-end demo only — it does not affect any real data.', stopCta: 'Stop', stopToast: 'Stopped (demo).',
    },

    wiz: {
      title: 'Add family', sub: 'Create the family account and add its children in a few simple steps.',
      stepLabel: 'Step {n} of {total}',
      step: { identity: 'Identity', contact: 'Contact & Location', children: 'Children', billing: 'Plan & Billing', review: 'Review' },
      stepDesc: {
        identity: 'The guardian’s core details.', contact: 'Contact methods and location.',
        children: 'Add the family’s children.', billing: 'Plan and hourly rate (display only).', review: 'Review before saving.',
      },
      next: 'Next', back: 'Back', save: 'Save family',
      savedToast: 'Family created (demo) — nothing is actually saved.',
      f: {
        guardianName: 'Guardian name', status: 'Status', category: 'Category',
        phone: 'Phone number', email: 'Email', whatsapp: 'WhatsApp',
        country: 'Country', city: 'City', timezone: 'Timezone',
        childName: 'Child name', childLevel: 'Level', childSubject: 'Subject',
        planType: 'Plan type', hourRate: 'Hourly rate (SAR)', cycle: 'Billing cycle', notes: 'Notes',
      },
      ph: {
        guardianName: 'e.g. Abu Salman Al-Ghamdi', phone: '05xxxxxxxx', email: 'name@example.edu',
        city: 'e.g. Riyadh', childName: 'Child name', hourRate: '60', notes: 'Add a note about the family…',
      },
      children: { add: 'Add another child', addToast: 'Children can be added for real once the backend is connected (demo).', row: 'Child {n}', hint: 'You can add more than one child to the same family.' },
      review: { title: 'Review before saving', note: 'This is a demo preview — nothing real is saved.', guardian: 'Guardian', contact: 'Contact', children: 'Children', plan: 'Plan', childrenVal: 'Two children (demo)' },
    },
  },

  sp: {
    profileTitle: 'Academic profile',
    tab: { overview: 'Overview', courses: 'Courses', timetable: 'Schedule', results: 'Results', evaluation: 'Evaluation', family: 'Family', notes: 'Notes' },
    kpi: { level: 'Level', progress: 'Progress', courses: 'Courses', status: 'Status' },
    ov: {
      title: 'At a glance', status: 'Status', level: 'Level', joined: 'Joined',
      subject: 'Primary subject', family: 'Family', viewFamily: 'View family', attentionTitle: 'Needs attention',
      latestEval: 'Latest evaluation', summary: 'Summary',
    },
    courses: { title: 'Enrolled courses', none: 'No enrolled courses.', teacher: 'Teacher', progress: 'Progress', group: 'Group', cert: 'Certificate' },
    courseStatus: { active: 'Active', completed: 'Completed', paused: 'Paused' },
    timetable: { title: 'Upcoming sessions', viewInSchedule: 'View in schedule', none: 'No upcoming sessions for this student.' },
    family: { title: 'Family', guardian: 'Guardian', viewFamily: 'View family profile', siblings: 'Siblings', noSiblings: 'No siblings enrolled.' },
    notes: { title: 'Student notes', none: 'No notes yet.' },
    act: { message: 'Message', edit: 'Edit', editToast: 'Edit opened (demo).', messageToast: 'Messaging will be available once the messages module is connected (demo).', viewFamily: 'View family' },
  },

  res: {
    title: 'Results & progress', overall: 'Overall progress', level: 'Level', term: 'Term',
    courses: 'Course progress', certificates: 'Certificates', noCerts: 'No certificates yet.',
    certStatus: { issued: 'Issued', pending: 'In progress' },
    export: 'Export PDF', exportReason: 'Export will be available once the backend is connected (out of current scope).',
    print: 'Print', printToast: 'Print opened (demo).',
    note: 'A demo view — not real results or a grading system.',
  },

  eval: {
    title: 'Monthly evaluation', subtitle: 'A descriptive monthly progress report — not a grading system.',
    criteria: { learningProgress: 'Learning progress', focus: 'Focus', homework: 'Homework completion', punctuality: 'Punctuality' },
    rating: { excellent: 'Excellent', good: 'Good', sometimes: 'Sometimes', rarely: 'Rarely' },
    achievements: 'Key achievements', objectives: 'Next-month objectives',
    approve: 'Approve report', approved: 'Approved', pending: 'Pending review', approveToast: 'Report approved (demo).',
    note: 'A demo view — there is no real approval workflow.',
  },

  data: {
    fam: {
      phone: '+966 50 000 0000', whatsapp: '+966 55 000 0000', country: 'Saudi Arabia', tz: 'Riyadh (GMT+3)',
      fam1: { name: 'Abu Salman Al-Ghamdi', email: 'ghamdi.family@example.edu', city: 'Riyadh', joined: 'Mar 2023', plan: 'Advanced plan', note: 'An engaged family with five children across different levels.' },
      fam2: { name: 'Umm Joury Al-Qahtani', email: 'qahtani.family@example.edu', city: 'Jeddah', joined: 'Sep 2023', plan: 'Standard plan', note: 'Three children, with good communication with the academy.' },
      fam3: { name: 'Abu Yasser Al-Dosari', email: 'dosari.family@example.edu', city: 'Dammam', joined: 'Jan 2026', plan: 'Trial plan', note: 'A family in the trial period, ending soon.' },
      fam4: { name: 'Umm Lama Al-Otaibi', email: 'otaibi.family@example.edu', city: 'Mecca', joined: 'Nov 2022', plan: 'Standard plan', note: 'A high-achieving daughter on the advanced track.' },
      fam5: { name: 'Abu Faisal Al-Shehri', email: 'shehri.family@example.edu', city: 'Medina', joined: 'Feb 2024', plan: 'Standard plan', note: 'A payment is overdue and needs follow-up.' },
      fam6: { name: 'Abu Abdulrahman Bawazir', email: 'bawazir.family@example.edu', city: 'Khobar', joined: 'Jul 2023', plan: 'Advanced plan', note: 'One child in an early stage of learning.' },
      fam7: { name: 'Umm Sara Al-Mutairi', email: 'mutairi.family@example.edu', city: 'Abha', joined: 'Apr 2022', plan: 'Standard plan', note: 'Subscription stopped at the family’s request.' },
      fam8: { name: 'Abu Khalid Al-Subaie', email: 'subaie.family@example.edu', city: 'Tabuk', joined: 'May 2021', plan: 'Scholarship', note: 'Currently inactive with no enrolled children.' },
    },
    grp: { math: 'Math Group A', prog: 'Programming Group B', eng: 'English Club' },
    cert: { math: 'Mathematics certificate', arabic: 'Arabic language certificate', prog: 'Programming certificate', physics: 'Physics certificate', english: 'English certificate', science: 'Science certificate', date: '12 May 2026' },
    res: { term: 'Term 2 · 2026' },
    eval: {
      month: 'June 2026 report',
      ach: {
        high: 'Completed every assignment on time and stayed actively engaged all month.',
        mid: 'Noticeable progress in core skills with good attendance.',
        low: 'Starting to build a clearer foundation; needs support to stay regular.',
      },
      obj: {
        high: 'Move on to higher-level challenges and join an enrichment project.',
        mid: 'Strengthen regular homework completion and raise the completion rate.',
        low: 'Build a weekly study habit and attend sessions consistently.',
      },
    },
    stud: {
      k: { name: 'Waleed Al-Ghamdi' }, l: { name: 'Rinad Al-Ghamdi' }, m: { name: 'Salma Al-Ghamdi' }, n: { name: 'Badr Al-Qahtani' },
      joined: 'Sep 2024',
      note: {
        high: 'A consistent, high-performing student showing steady progress.',
        mid: 'Good progress; could use closer homework follow-up.',
        low: 'Needs extra support and encouragement to stay regular.',
      },
    },
  },
};
