export const ENDPOINTS = {
  auth: {
    login: '/auth/login',
    register: '/auth/register',
    logout: '/auth/logout',
    me: '/auth/me',
  },
  users: {
    root: '/users',
    byId: (id: number) => `/users/${id}`,
  },
  customers: {
    root: '/customers',
    byId: (id: number) => `/customers/${id}`,
  },
  projects: {
    root: '/projects',
    byId: (id: number) => `/projects/${id}`,
  },
  tasks: {
    root: '/tasks',
    byId: (id: number) => `/tasks/${id}`,
  },
  dashboard: {
    stats: '/dashboard/stats',
  },
} as const
