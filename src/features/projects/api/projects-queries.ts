import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import type { ApiError } from '@/shared/api'
import type { ProjectValues } from '../model/schemas'
import type { ProjectsQuery } from '../model/types'
import { projectsApi } from './projects-api'

export const projectsKeys = {
  all: ['projects'] as const,
  list: (query: ProjectsQuery) => ['projects', 'list', query] as const,
}

export function useProjects(query: ProjectsQuery) {
  return useQuery({
    queryKey: projectsKeys.list(query),
    queryFn: () => projectsApi.list(query),
  })
}

function useInvalidateProjects() {
  const queryClient = useQueryClient()

  return () => queryClient.invalidateQueries({ queryKey: projectsKeys.all })
}

export function useSaveProject() {
  const invalidate = useInvalidateProjects()

  return useMutation({
    mutationFn: ({ id, values }: { id?: number; values: ProjectValues }) =>
      id ? projectsApi.update(id, values) : projectsApi.create(values),
    onSuccess: (_, variables) => {
      invalidate()
      toast.success(variables.id ? 'Loyiha yangilandi' : "Loyiha qo'shildi")
    },
    onError: (error: ApiError) => toast.error(error.message),
  })
}

export function useDeleteProject() {
  const invalidate = useInvalidateProjects()

  return useMutation({
    mutationFn: (id: number) => projectsApi.remove(id),
    onSuccess: () => {
      invalidate()
      toast.success("Loyiha o'chirildi")
    },
    onError: (error: ApiError) => toast.error(error.message),
  })
}
