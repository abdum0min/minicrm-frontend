import type { PaginationParams } from '@/shared/api'

export type TaskStatus = 'TODO' | 'IN_PROGRESS' | 'DONE'
export type TaskPriority = 'LOW' | 'MEDIUM' | 'HIGH'

export interface Task {
  id: number
  projectId: number
  assignedUserId: number | null
  title: string
  description: string | null
  status: TaskStatus
  priority: TaskPriority
  createdAt: string
  updatedAt: string
  project: { id: number; projectName: string } | null
  assignedUser: { id: number; fullname: string; email: string } | null
}

export interface TasksQuery extends PaginationParams {
  status?: TaskStatus
  priority?: TaskPriority
  projectId?: number
  assignedUserId?: number
}
