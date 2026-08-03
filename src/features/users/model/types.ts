import type { PaginationParams } from '@/shared/api'
import type { User, UserRole } from '@/features/auth'

export type { User, UserRole }

export interface UsersQuery extends PaginationParams {
  role?: UserRole
}
