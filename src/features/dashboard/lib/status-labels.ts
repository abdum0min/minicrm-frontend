import type { ProjectStatus } from '../model/types'

export const PROJECT_STATUS_LABELS: Record<ProjectStatus, string> = {
  PLANNING: 'Rejalashtirilgan',
  IN_PROGRESS: 'Jarayonda',
  COMPLETED: 'Tugallangan',
  CANCELLED: 'Bekor qilingan',
}

export const PROJECT_STATUS_COLORS: Record<ProjectStatus, string> = {
  PLANNING: 'var(--chart-1)',
  IN_PROGRESS: 'var(--chart-2)',
  COMPLETED: 'var(--chart-3)',
  CANCELLED: 'var(--chart-5)',
}
