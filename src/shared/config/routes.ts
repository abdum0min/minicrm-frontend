export const ROUTES = {
  home: '/',
  designSystem: '/design-system',
  login: '/login',
  clients: '/clients',
  client: (id: string | number) => `/clients/${id}`,
  deals: '/deals',
} as const
