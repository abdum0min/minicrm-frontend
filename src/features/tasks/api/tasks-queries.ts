import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import type { ApiError } from '@/shared/api'
import type { TaskValues } from '../model/schemas'
import type { TasksQuery } from '../model/types'
import { tasksApi } from './tasks-api'

export const tasksKeys = {
  all: ['tasks'] as const,
  list: (query: TasksQuery) => ['tasks', 'list', query] as const,
}

export function useTasks(query: TasksQuery) {
  return useQuery({
    queryKey: tasksKeys.list(query),
    queryFn: () => tasksApi.list(query),
  })
}

function useInvalidateTasks() {
  const queryClient = useQueryClient()

  return () => {
    void queryClient.invalidateQueries({ queryKey: tasksKeys.all })
    void queryClient.invalidateQueries({ queryKey: ['dashboard'] })
  }
}

export function useSaveTask() {
  const invalidate = useInvalidateTasks()

  return useMutation({
    mutationFn: ({ id, values }: { id?: number; values: TaskValues }) =>
      id ? tasksApi.update(id, values) : tasksApi.create(values),
    onSuccess: (_, variables) => {
      invalidate()
      toast.success(variables.id ? 'Vazifa yangilandi' : "Vazifa qo'shildi")
    },
    onError: (error: ApiError) => toast.error(error.message),
  })
}

export function useDeleteTask() {
  const invalidate = useInvalidateTasks()

  return useMutation({
    mutationFn: (id: number) => tasksApi.remove(id),
    onSuccess: () => {
      invalidate()
      toast.success("Vazifa o'chirildi")
    },
    onError: (error: ApiError) => toast.error(error.message),
  })
}
