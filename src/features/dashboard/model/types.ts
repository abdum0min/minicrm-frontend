export type ProjectStatus = 'PLANNING' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED'

export type TaskStatus = 'TODO' | 'IN_PROGRESS' | 'DONE'

export interface RecentTask {
  id: number
  title: string
  status: TaskStatus
  createdAt: string
  project: { id: number; projectName: string } | null
  assignedUser: { id: number; fullname: string } | null
}

export interface DashboardStats {
  totalCustomers: number
  totalProjects: number
  totalTasks: number
  completedTasks: number
  inProgressTasks: number
  projectsByStatus: { status: ProjectStatus; count: number }[]
}
