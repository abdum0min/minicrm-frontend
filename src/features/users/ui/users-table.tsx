import { Pencil, Trash2 } from 'lucide-react'

import { useCurrentUser } from '@/features/auth'
import { formatDate, getInitials } from '@/shared/lib/format'
import { Avatar, AvatarFallback } from '@/shared/ui/avatar'
import { Badge } from '@/shared/ui/badge'
import { Button } from '@/shared/ui/button'
import { ConfirmDialog } from '@/shared/ui/confirm-dialog'
import { DataTable, type Column } from '@/shared/ui/data-table'
import type { User } from '../model/types'

interface UsersTableProps {
  data: User[]
  isLoading: boolean
  onEdit: (user: User) => void
  onDelete: (id: number) => void
}

export function UsersTable({ data, isLoading, onEdit, onDelete }: UsersTableProps) {
  const currentUser = useCurrentUser()

  const columns: Column<User>[] = [
    {
      key: 'fullname',
      header: "To'liq ism",
      cell: (row) => (
        <div className="flex items-center gap-2">
          <Avatar className="size-7">
            <AvatarFallback>{getInitials(row.fullname)}</AvatarFallback>
          </Avatar>
          <span className="font-medium">{row.fullname}</span>
        </div>
      ),
    },
    {
      key: 'email',
      header: 'Email',
      cell: (row) => <span className="text-muted-foreground">{row.email}</span>,
    },
    {
      key: 'role',
      header: 'Rol',
      cell: (row) => (
        <Badge variant={row.role === 'ADMIN' ? 'default' : 'secondary'}>
          {row.role === 'ADMIN' ? 'Admin' : 'User'}
        </Badge>
      ),
    },
    {
      key: 'createdAt',
      header: 'Sana',
      cell: (row) => (
        <span className="text-muted-foreground tabular-nums">{formatDate(row.createdAt)}</span>
      ),
    },
    {
      key: 'actions',
      header: <span className="sr-only">Amallar</span>,
      className: 'text-right',
      cell: (row) => (
        <div className="flex justify-end gap-1">
          <Button
            variant="ghost"
            size="icon-sm"
            aria-label="Tahrirlash"
            className="text-primary hover:text-primary"
            onClick={() => onEdit(row)}
          >
            <Pencil />
          </Button>

          {/* Prevent an admin from deleting their own account. */}
          {row.id !== currentUser?.id && (
            <ConfirmDialog
              title="Foydalanuvchini o'chirasizmi?"
              description={`${row.fullname} o'chiriladi. Unga biriktirilgan vazifalar saqlanadi, faqat mas'ul bo'shab qoladi.`}
              onConfirm={() => onDelete(row.id)}
            >
              <Button
                variant="ghost"
                size="icon-sm"
                aria-label="O'chirish"
                className="text-destructive hover:text-destructive"
              >
                <Trash2 />
              </Button>
            </ConfirmDialog>
          )}
        </div>
      ),
    },
  ]

  return (
    <DataTable
      data={data}
      columns={columns}
      rowKey={(row) => row.id}
      isLoading={isLoading}
      emptyText="Foydalanuvchilar topilmadi"
    />
  )
}
