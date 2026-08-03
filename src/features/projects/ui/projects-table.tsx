import { Pencil, Trash2 } from 'lucide-react'

import { useIsAdmin } from '@/features/auth'
import { formatDate } from '@/shared/lib/format'
import { Badge } from '@/shared/ui/badge'
import { Button } from '@/shared/ui/button'
import { ConfirmDialog } from '@/shared/ui/confirm-dialog'
import { DataTable, type Column } from '@/shared/ui/data-table'
import { PROJECT_STATUS } from '../lib/status'
import type { Project } from '../model/types'

interface ProjectsTableProps {
  data: Project[]
  isLoading: boolean
  onEdit: (project: Project) => void
  onDelete: (id: number) => void
}

export function ProjectsTable({ data, isLoading, onEdit, onDelete }: ProjectsTableProps) {
  const isAdmin = useIsAdmin()

  const columns: Column<Project>[] = [
    {
      key: 'projectName',
      header: 'Loyiha nomi',
      cell: (row) => (
        <div className="min-w-0">
          <p className="font-medium">{row.projectName}</p>
          {row.description && (
            <p className="truncate text-xs text-muted-foreground">{row.description}</p>
          )}
        </div>
      ),
    },
    {
      key: 'customer',
      header: 'Mijoz',
      cell: (row) => (
        <span className="text-muted-foreground">{row.customer?.companyName ?? '—'}</span>
      ),
    },
    {
      key: 'status',
      header: 'Holat',
      cell: (row) => (
        <Badge variant={PROJECT_STATUS[row.status].variant}>
          {PROJECT_STATUS[row.status].label}
        </Badge>
      ),
    },
    {
      key: 'deadline',
      header: 'Deadline',
      cell: (row) => <span className="tabular-nums">{formatDate(row.deadline)}</span>,
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

          {isAdmin && (
            <ConfirmDialog
              title="Loyihani o'chirasizmi?"
              description={`${row.projectName} va unga tegishli barcha vazifalar o'chiriladi.`}
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
      emptyText="Loyihalar topilmadi"
    />
  )
}
