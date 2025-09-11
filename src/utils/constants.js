// Constants for the Civic Issue Reporting System
export const ISSUE_CATEGORIES = [
  'Road & Infrastructure',
  'Water Supply',
  'Electricity',
  'Waste Management',
  'Public Safety',
  'Healthcare',
  'Education',
  'Transportation',
  'Environmental',
  'Other'
];

export const ISSUE_STATUS = {
  SUBMITTED: 'submitted',
  ACKNOWLEDGED: 'acknowledged',
  IN_PROGRESS: 'in_progress',
  RESOLVED: 'resolved',
  REJECTED: 'rejected'
};

export const STATUS_COLORS = {
  [ISSUE_STATUS.SUBMITTED]: 'bg-blue-500',
  [ISSUE_STATUS.ACKNOWLEDGED]: 'bg-yellow-500',
  [ISSUE_STATUS.IN_PROGRESS]: 'bg-orange-500',
  [ISSUE_STATUS.RESOLVED]: 'bg-green-500',
  [ISSUE_STATUS.REJECTED]: 'bg-red-500'
};

export const USER_ROLES = {
  CITIZEN: 'citizen',
  ADMIN: 'admin'
};

export const API_ENDPOINTS = {
  LOGIN: '/api/auth/login',
  REGISTER: '/api/auth/register',
  ISSUES: '/api/issues',
  USERS: '/api/users',
  ANALYTICS: '/api/analytics'
};