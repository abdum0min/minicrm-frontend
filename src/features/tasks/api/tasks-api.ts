import { ENDPOINTS, http } from '@/shared/api'
import type { TaskValues } from '../model/schemas'
import type { Task, TasksQuery } from '../model/types'

function toPayload(values: TaskValues) {
  return {
    ...values,
    description: values.description || undefined,
    assignedUserId: values.assignedUserId || undefined,
  }
}

export const tasksApi = {
  list: (params: TasksQuery) => http.list<Task>(ENDPOINTS.tasks.root, params),
  create: (values: TaskValues) => http.post<Task>(ENDPOINTS.tasks.root, toPayload(values)),
  update: (id: number, values: TaskValues) =>
    http.patch<Task>(ENDPOINTS.tasks.byId(id), toPayload(values)),
  remove: (id: number) => http.delete<Task>(ENDPOINTS.tasks.byId(id)),
}
