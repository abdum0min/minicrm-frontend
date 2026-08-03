import { useQuery } from '@tanstack/react-query'

import { ENDPOINTS, http } from '@/shared/api'
import { buildTasksTrend } from '../lib/build-trend'
import type { DashboardStats, RecentTask } from '../model/types'

export const dashboardKeys = {
  stats: ['dashboard', 'stats'] as const,
  trend: ['dashboard', 'trend'] as const,
  recentTasks: ['dashboard', 'recent-tasks'] as const,
}

export function useDashboardStats() {
  return useQuery({
    queryKey: dashboardKeys.stats,
    queryFn: () => http.get<DashboardStats>(ENDPOINTS.dashboard.stats),
  })
}

export function useTasksTrend() {
  return useQuery({
    queryKey: dashboardKeys.trend,
    queryFn: async () => {
      const { items } = await http.list<{ createdAt: string; status: string }>(
        ENDPOINTS.tasks.root,
        { limit: 100, sortBy: 'createdAt', sortOrder: 'asc' },
      )

      return buildTasksTrend(items)
    },
  })
}

export function useRecentTasks() {
  return useQuery({
    queryKey: dashboardKeys.recentTasks,
    queryFn: async () => {
      const { items } = await http.list<RecentTask>(ENDPOINTS.tasks.root, {
        limit: 5,
        sortBy: 'createdAt',
        sortOrder: 'desc',
      })

      return items
    },
  })
}
