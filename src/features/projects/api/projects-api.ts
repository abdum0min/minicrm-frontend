import { ENDPOINTS, http } from '@/shared/api'
import type { ProjectValues } from '../model/schemas'
import type { Project, ProjectsQuery } from '../model/types'

function toPayload(values: ProjectValues) {
  return {
    ...values,
    description: values.description || undefined,
    deadline: new Date(values.deadline).toISOString(),
  }
}

export const projectsApi = {
  list: (params: ProjectsQuery) => http.list<Project>(ENDPOINTS.projects.root, params),
  create: (values: ProjectValues) =>
    http.post<Project>(ENDPOINTS.projects.root, toPayload(values)),
  update: (id: number, values: ProjectValues) =>
    http.patch<Project>(ENDPOINTS.projects.byId(id), toPayload(values)),
  remove: (id: number) => http.delete<Project>(ENDPOINTS.projects.byId(id)),
}
