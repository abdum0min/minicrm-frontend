import { useQuery } from '@tanstack/react-query'

import { ENDPOINTS, http } from '@/shared/api'

interface CustomerOption {
  id: number
  companyName: string
}

export function useCustomerOptions() {
  return useQuery({
    queryKey: ['options', 'customers'],
    queryFn: async () => {
      const { items } = await http.list<CustomerOption>(ENDPOINTS.customers.root, {
        limit: 100,
        sortBy: 'companyName',
        sortOrder: 'asc',
      })

      return items
    },
    staleTime: 5 * 60 * 1000,
  })
}
