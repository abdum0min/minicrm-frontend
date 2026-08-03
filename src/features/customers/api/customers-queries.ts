import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import type { ApiError } from '@/shared/api'
import type { CustomerValues } from '../model/schemas'
import type { CustomersQuery } from '../model/types'
import { customersApi } from './customers-api'

export const customersKeys = {
  all: ['customers'] as const,
  list: (query: CustomersQuery) => ['customers', 'list', query] as const,
}

export function useCustomers(query: CustomersQuery) {
  return useQuery({
    queryKey: customersKeys.list(query),
    queryFn: () => customersApi.list(query),
  })
}

function useInvalidateCustomers() {
  const queryClient = useQueryClient()

  return () => queryClient.invalidateQueries({ queryKey: customersKeys.all })
}

export function useSaveCustomer() {
  const invalidate = useInvalidateCustomers()

  return useMutation({
    mutationFn: ({ id, values }: { id?: number; values: CustomerValues }) =>
      id ? customersApi.update(id, values) : customersApi.create(values),
    onSuccess: (_, variables) => {
      invalidate()
      toast.success(variables.id ? 'Mijoz yangilandi' : "Mijoz qo'shildi")
    },
    onError: (error: ApiError) => toast.error(error.message),
  })
}

export function useDeleteCustomer() {
  const invalidate = useInvalidateCustomers()

  return useMutation({
    mutationFn: (id: number) => customersApi.remove(id),
    onSuccess: () => {
      invalidate()
      toast.success("Mijoz o'chirildi")
    },
    onError: (error: ApiError) => toast.error(error.message),
  })
}
