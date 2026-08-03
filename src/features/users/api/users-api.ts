import { ENDPOINTS, http } from '@/shared/api'
import type { UpdateUserValues } from '../model/schemas'
import type { User, UsersQuery } from '../model/types'

export const usersApi = {
  list: (params: UsersQuery) => http.list<User>(ENDPOINTS.users.root, params),
  create: (values: UpdateUserValues) => http.post<User>(ENDPOINTS.users.root, values),
  update: (id: number, values: UpdateUserValues) => {
    const { password, ...rest } = values

    return http.patch<User>(ENDPOINTS.users.byId(id), {
      ...rest,
      ...(password ? { password } : {}),
    })
  },
  remove: (id: number) => http.delete<User>(ENDPOINTS.users.byId(id)),
}
