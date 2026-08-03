export const ROUTES = {
  home: '/',
  login: '/login',
  clients: '/clients',
  client: (id: string | number) => `/clients/${id}`,
  deals: '/deals',
} as const
