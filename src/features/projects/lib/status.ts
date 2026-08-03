import type { ProjectStatus } from '../model/types'

export const PROJECT_STATUS: Record<
  ProjectStatus,
  { label: string; variant: 'info' | 'warning' | 'success' | 'destructive' }
> = {
  PLANNING: { label: 'Rejalashtirilgan', variant: 'info' },
  IN_PROGRESS: { label: 'Jarayonda', variant: 'warning' },
  COMPLETED: { label: 'Tugallangan', variant: 'success' },
  CANCELLED: { label: 'Bekor qilingan', variant: 'destructive' },
}

export const PROJECT_STATUS_OPTIONS = Object.entries(PROJECT_STATUS).map(
  ([value, { label }]) => ({ value: value as ProjectStatus, label }),
)
