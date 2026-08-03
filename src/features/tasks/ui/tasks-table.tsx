import { Pencil, Trash2 } from 'lucide-react'

import { formatDate } from '@/shared/lib/format'
import { Badge } from '@/shared/ui/badge'
import { Button } from '@/shared/ui/button'
import { ConfirmDialog } from '@/shared/ui/confirm-dialog'
import { DataTable, type Column } from '@/shared/ui/data-table'
import { TASK_PRIORITY, TASK_STATUS } from '../lib/status'
import type { Task } from '../model/types'

interface TasksTableProps {
  data: Task[]
  isLoading: boolean
  onEdit: (task: Task) => void
  onDelete: (id: number) => void
}

export function TasksTable({ data, isLoading, onEdit, onDelete }: TasksTableProps) {
  const columns: Column<Task>[] = [
    {
      key: 'title',
      header: 'Vazifa nomi',
      cell: (row) => <span className="font-medium">{row.title}</span>,
    },
    {
      key: 'project',
      header: 'Loyiha',
      cell: (row) => (
        <span className="text-muted-foreground">{row.project?.projectName ?? '—'}</span>
      ),
    },
    {
      key: 'assignee',
      header: "Mas'ul",
      cell: (row) => (
        <span className="text-muted-foreground">{row.assignedUser?.fullname ?? '—'}</span>
      ),
    },
    {
      key: 'status',
      header: 'Holat',
      cell: (row) => (
        <Badge variant={TASK_STATUS[row.status].variant}>{TASK_STATUS[row.status].label}</Badge>
      ),
    },
    {
      key: 'priority',
      header: 'Muhimlik',
      cell: (row) => (
        <Badge variant={TASK_PRIORITY[row.priority].variant}>
          {TASK_PRIORITY[row.priority].label}
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

          <ConfirmDialog
            title="Vazifani o'chirasizmi?"
            description={`"${row.title}" o'chiriladi. Bu amalni ortga qaytarib bo'lmaydi.`}
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
      emptyText="Vazifalar topilmadi"
    />
  )
}
