import type { PaginationParams } from '@/shared/api'

export interface Customer {
  id: number
  companyName: string
  fullname: string
  phone: string
  email: string
  address: string
  createdAt: string
  updatedAt: string
}

export type CustomersQuery = PaginationParams
