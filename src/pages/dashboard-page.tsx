import {
  ProjectsStatusChart,
  RecentTasks,
  StatCards,
  TasksTrendChart,
  useDashboardStats,
  useRecentTasks,
  useTasksTrend,
} from '@/features/dashboard'

export function DashboardPage() {
  const stats = useDashboardStats()
  const trend = useTasksTrend()
  const recentTasks = useRecentTasks()

  return (
    <div className="space-y-4">
      <StatCards stats={stats.data} isLoading={stats.isLoading} />

      <div className="grid gap-4 lg:grid-cols-2">
        <ProjectsStatusChart stats={stats.data} isLoading={stats.isLoading} />
        <TasksTrendChart data={trend.data} isLoading={trend.isLoading} />
      </div>

      <RecentTasks data={recentTasks.data} isLoading={recentTasks.isLoading} />
    </div>
  )
}
