import { useState } from 'react'
import { Plus } from 'lucide-react'

import {
  CustomerFormDialog,
  CustomersTable,
  useCustomers,
  useDeleteCustomer,
  type Customer,
} from '@/features/customers'
import { useTableQuery } from '@/shared/hooks'
import { Button } from '@/shared/ui/button'
import { PageShell } from '@/shared/ui/page-shell'
import { TablePagination } from '@/shared/ui/table-pagination'

export function CustomersPage() {
  const { search, setSearch, setPage, params } = useTableQuery()
  const { data, isLoading } = useCustomers(params)
  const deleteCustomer = useDeleteCustomer()

  const [dialogOpen, setDialogOpen] = useState(false)
  const [editing, setEditing] = useState<Customer | null>(null)

  const openCreate = () => {
    setEditing(null)
    setDialogOpen(true)
  }

  const openEdit = (customer: Customer) => {
    setEditing(customer)
    setDialogOpen(true)
  }

  return (
    <PageShell
      title="Customers"
      description="Mijozlar bazasi"
      search={search}
      onSearchChange={setSearch}
      searchPlaceholder="Kompaniya, ism yoki email bo'yicha qidirish..."
      action={
        <Button onClick={openCreate}>
          <Plus />
          Yangi mijoz
        </Button>
      }
    >
      <CustomersTable
        data={data?.items ?? []}
        isLoading={isLoading}
        onEdit={openEdit}
        onDelete={(id) => deleteCustomer.mutate(id)}
      />

      {data && <TablePagination meta={data.meta} onPageChange={setPage} />}

      <CustomerFormDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        customer={editing}
      />
    </PageShell>
  )
}
