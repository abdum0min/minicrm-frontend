import type { TaskPriority, TaskStatus } from '../model/types'

export const TASK_STATUS: Record<
  TaskStatus,
  { label: string; variant: 'info' | 'warning' | 'success' }
> = {
  TODO: { label: 'Kutilmoqda', variant: 'info' },
  IN_PROGRESS: { label: 'Jarayonda', variant: 'warning' },
  DONE: { label: 'Tugallangan', variant: 'success' },
}

export const TASK_PRIORITY: Record<
  TaskPriority,
  { label: string; variant: 'secondary' | 'warning' | 'destructive' }
> = {
  LOW: { label: 'Past', variant: 'secondary' },
  MEDIUM: { label: "O'rta", variant: 'warning' },
  HIGH: { label: 'Yuqori', variant: 'destructive' },
}

export const TASK_STATUS_OPTIONS = Object.entries(TASK_STATUS).map(([value, { label }]) => ({
  value: value as TaskStatus,
  label,
}))

export const TASK_PRIORITY_OPTIONS = Object.entries(TASK_PRIORITY).map(
  ([value, { label }]) => ({ value: value as TaskPriority, label }),
)
