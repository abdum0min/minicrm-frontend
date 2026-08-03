import { useState } from 'react'
import { Plus } from 'lucide-react'

import {
  UserFormDialog,
  UsersTable,
  useDeleteUser,
  useUsers,
  type User,
  type UserRole,
} from '@/features/users'
import { useTableQuery } from '@/shared/hooks'
import { Button } from '@/shared/ui/button'
import { PageShell } from '@/shared/ui/page-shell'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/ui/select'
import { TablePagination } from '@/shared/ui/table-pagination'

const ALL = 'all'

export function UsersPage() {
  const { search, setSearch, setPage, params } = useTableQuery()
  const [role, setRole] = useState<UserRole | typeof ALL>(ALL)

  const { data, isLoading } = useUsers({ ...params, ...(role !== ALL && { role }) })
  const deleteUser = useDeleteUser()

  const [dialogOpen, setDialogOpen] = useState(false)
  const [editing, setEditing] = useState<User | null>(null)

  return (
    <PageShell
      title="Users"
      description="Tizim foydalanuvchilari"
      search={search}
      onSearchChange={setSearch}
      searchPlaceholder="Ism yoki email bo'yicha qidirish..."
      filters={
        <Select
          value={role}
          onValueChange={(value) => {
            setRole(value as UserRole | typeof ALL)
            setPage(1)
          }}
        >
          <SelectTrigger className="w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={ALL}>Barcha rollar</SelectItem>
            <SelectItem value="ADMIN">Admin</SelectItem>
            <SelectItem value="USER">User</SelectItem>
          </SelectContent>
        </Select>
      }
      action={
        <Button
          onClick={() => {
            setEditing(null)
            setDialogOpen(true)
          }}
        >
          <Plus />
          Foydalanuvchi qo'shish
        </Button>
      }
    >
      <UsersTable
        data={data?.items ?? []}
        isLoading={isLoading}
        onEdit={(user) => {
          setEditing(user)
          setDialogOpen(true)
        }}
        onDelete={(id) => deleteUser.mutate(id)}
      />

      {data && <TablePagination meta={data.meta} onPageChange={setPage} />}

      <UserFormDialog open={dialogOpen} onOpenChange={setDialogOpen} user={editing} />
    </PageShell>
  )
}
