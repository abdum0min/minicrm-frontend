import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import type { ApiError } from '@/shared/api'
import type { UpdateUserValues } from '../model/schemas'
import type { UsersQuery } from '../model/types'
import { usersApi } from './users-api'

export const usersKeys = {
  all: ['users'] as const,
  list: (query: UsersQuery) => ['users', 'list', query] as const,
}

export function useUsers(query: UsersQuery) {
  return useQuery({
    queryKey: usersKeys.list(query),
    queryFn: () => usersApi.list(query),
  })
}

function useInvalidateUsers() {
  const queryClient = useQueryClient()

  return () => queryClient.invalidateQueries({ queryKey: usersKeys.all })
}

export function useSaveUser() {
  const invalidate = useInvalidateUsers()

  return useMutation({
    mutationFn: ({ id, values }: { id?: number; values: UpdateUserValues }) =>
      id ? usersApi.update(id, values) : usersApi.create(values),
    onSuccess: (_, variables) => {
      invalidate()
      toast.success(variables.id ? 'Foydalanuvchi yangilandi' : "Foydalanuvchi qo'shildi")
    },
    onError: (error: ApiError) => toast.error(error.message),
  })
}

export function useDeleteUser() {
  const invalidate = useInvalidateUsers()

  return useMutation({
    mutationFn: (id: number) => usersApi.remove(id),
    onSuccess: () => {
      invalidate()
      toast.success("Foydalanuvchi o'chirildi")
    },
    onError: (error: ApiError) => toast.error(error.message),
  })
}
