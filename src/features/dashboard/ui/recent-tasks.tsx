import { formatDate } from '@/shared/lib/format'
import { Badge } from '@/shared/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/ui/card'
import { DataTable, type Column } from '@/shared/ui/data-table'
import type { RecentTask, TaskStatus } from '../model/types'

const STATUS_BADGE: Record<TaskStatus, { label: string; variant: 'info' | 'warning' | 'success' }> =
  {
    TODO: { label: 'Kutilmoqda', variant: 'info' },
    IN_PROGRESS: { label: 'Jarayonda', variant: 'warning' },
    DONE: { label: 'Tugallangan', variant: 'success' },
  }

const COLUMNS: Column<RecentTask>[] = [
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
      <Badge variant={STATUS_BADGE[row.status].variant}>{STATUS_BADGE[row.status].label}</Badge>
    ),
  },
  {
    key: 'createdAt',
    header: 'Sana',
    cell: (row) => <span className="tabular-nums">{formatDate(row.createdAt)}</span>,
  },
]

interface RecentTasksProps {
  data?: RecentTask[]
  isLoading: boolean
}

export function RecentTasks({ data, isLoading }: RecentTasksProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Oxirgi vazifalar</CardTitle>
        <CardDescription>Eng so'nggi qo'shilgan 5 ta vazifa</CardDescription>
      </CardHeader>

      <CardContent>
        <DataTable
          data={data ?? []}
          columns={COLUMNS}
          rowKey={(row) => row.id}
          isLoading={isLoading}
          emptyText="Vazifalar yo'q"
          skeletonRows={4}
        />
      </CardContent>
    </Card>
  )
}
