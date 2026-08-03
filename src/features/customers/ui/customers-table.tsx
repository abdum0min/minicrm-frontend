import { Pencil, Trash2 } from 'lucide-react'

import { useIsAdmin } from '@/features/auth'
import { formatDate, getInitials } from '@/shared/lib/format'
import { Avatar, AvatarFallback } from '@/shared/ui/avatar'
import { Button } from '@/shared/ui/button'
import { ConfirmDialog } from '@/shared/ui/confirm-dialog'
import { DataTable, type Column } from '@/shared/ui/data-table'
import type { Customer } from '../model/types'

interface CustomersTableProps {
  data: Customer[]
  isLoading: boolean
  onEdit: (customer: Customer) => void
  onDelete: (id: number) => void
}

export function CustomersTable({
  data,
  isLoading,
  onEdit,
  onDelete,
}: CustomersTableProps) {
  const isAdmin = useIsAdmin()

  const columns: Column<Customer>[] = [
    {
      key: 'company',
      header: 'Kompaniya',
      cell: (row) => (
        <div className="flex items-center gap-2">
          <Avatar className="size-7">
            <AvatarFallback>{getInitials(row.companyName)}</AvatarFallback>
          </Avatar>
          <span className="font-medium">{row.companyName}</span>
        </div>
      ),
    },
    { key: 'fullname', header: "To'liq ism", cell: (row) => row.fullname },
    {
      key: 'email',
      header: 'Email',
      cell: (row) => <span className="text-muted-foreground">{row.email}</span>,
    },
    {
      key: 'phone',
      header: 'Telefon',
      cell: (row) => <span className="tabular-nums">{row.phone}</span>,
    },
    {
      key: 'address',
      header: 'Manzil',
      cell: (row) => <span className="text-muted-foreground">{row.address}</span>,
    },
    {
      key: 'createdAt',
      header: 'Sana',
      cell: (row) => <span className="tabular-nums">{formatDate(row.createdAt)}</span>,
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

          {isAdmin && (
            <ConfirmDialog
              title="Mijozni o'chirasizmi?"
              description={`${row.companyName} va unga tegishli barcha loyihalar o'chiriladi. Bu amalni ortga qaytarib bo'lmaydi.`}
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
      emptyText="Mijozlar topilmadi"
    />
  )
}
