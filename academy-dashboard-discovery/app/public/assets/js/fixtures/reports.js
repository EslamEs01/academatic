/* Report entry cards. One is permission-locked to demonstrate disabled-with-reason
 * (gated by the fixture PROFILE.permissions — NOT a real permission system). */
export const REPORTS = [
  {
    id: 'trainers', titleKey: 'report.trainers.title', descKey: 'report.trainers.desc',
    icon: 'lock', tone: 'muted', route: '#', requiresPermission: 'manage_academy',
    disabledReasonKey: 'report.trainers.reason',
  },
  {
    id: 'revenue', titleKey: 'report.revenue.title', descKey: 'report.revenue.desc',
    icon: 'wallet', tone: 'amber', route: '#',
  },
  {
    id: 'studentPerf', titleKey: 'report.studentPerf.title', descKey: 'report.studentPerf.desc',
    icon: 'trending-up', tone: 'success', route: '#',
  },
  {
    id: 'attendanceMonthly', titleKey: 'report.attendanceMonthly.title', descKey: 'report.attendanceMonthly.desc',
    icon: 'reports', tone: 'primary', route: '#',
  },
];
