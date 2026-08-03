import { useQuery } from '@tanstack/react-query'

import { useIsAdmin } from '@/features/auth'
import { ENDPOINTS, http } from '@/shared/api'

interface ProjectOption {
  id: number
  projectName: string
}

interface UserOption {
  id: number
  fullname: string
}

export function useProjectOptions() {
  return useQuery({
    queryKey: ['options', 'projects'],
    queryFn: async () => {
      const { items } = await http.list<ProjectOption>(ENDPOINTS.projects.root, {
        limit: 100,
        sortBy: 'projectName',
        sortOrder: 'asc',
      })

      return items
    },
    staleTime: 5 * 60 * 1000,
  })
}

export function useUserOptions() {
  const isAdmin = useIsAdmin()

  return useQuery({
    queryKey: ['options', 'users'],
    enabled: isAdmin,
    queryFn: async () => {
      const { items } = await http.list<UserOption>(ENDPOINTS.users.root, {
        limit: 100,
        sortBy: 'fullname',
        sortOrder: 'asc',
      })

      return items
    },
    staleTime: 5 * 60 * 1000,
  })
}
