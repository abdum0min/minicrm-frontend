import type { PaginationParams } from '@/shared/api'

export type ProjectStatus = 'PLANNING' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED'

export interface Project {
  id: number
  customerId: number
  projectName: string
  description: string | null
  status: ProjectStatus
  deadline: string
  createdAt: string
  updatedAt: string
  customer: { id: number; companyName: string; fullname: string } | null
}

export interface ProjectsQuery extends PaginationParams {
  status?: ProjectStatus
  customerId?: number
}
