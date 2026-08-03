import { ENDPOINTS, http } from '@/shared/api'
import type { CustomerValues } from '../model/schemas'
import type { Customer, CustomersQuery } from '../model/types'

export const customersApi = {
  list: (params: CustomersQuery) => http.list<Customer>(ENDPOINTS.customers.root, params),
  create: (values: CustomerValues) => http.post<Customer>(ENDPOINTS.customers.root, values),
  update: (id: number, values: CustomerValues) =>
    http.patch<Customer>(ENDPOINTS.customers.byId(id), values),
  remove: (id: number) => http.delete<Customer>(ENDPOINTS.customers.byId(id)),
}
