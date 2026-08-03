import { useState } from 'react'
import { Plus } from 'lucide-react'

import {
  TASK_PRIORITY_OPTIONS,
  TASK_STATUS_OPTIONS,
  TaskFormDialog,
  TasksTable,
  useDeleteTask,
  useTasks,
  type Task,
  type TaskPriority,
  type TaskStatus,
} from '@/features/tasks'
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

export function TasksPage() {
  const { search, setSearch, params, goNext, goBack, reset, canGoBack } = useTableQuery()
  const [status, setStatus] = useState<TaskStatus | typeof ALL>(ALL)
  const [priority, setPriority] = useState<TaskPriority | typeof ALL>(ALL)

  const { data, isLoading } = useTasks({
    ...params,
    ...(status !== ALL && { status }),
    ...(priority !== ALL && { priority }),
  })
  const deleteTask = useDeleteTask()

  const [dialogOpen, setDialogOpen] = useState(false)
  const [editing, setEditing] = useState<Task | null>(null)

  return (
    <PageShell
      title="Tasks"
      description="Loyiha vazifalari"
      search={search}
      onSearchChange={setSearch}
      searchPlaceholder="Vazifa nomi bo'yicha qidirish..."
      filters={
        <>
          <Select
            value={status}
            onValueChange={(value) => {
              setStatus(value as TaskStatus | typeof ALL)
              reset()
            }}
          >
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={ALL}>Barcha holatlar</SelectItem>
              {TASK_STATUS_OPTIONS.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={priority}
            onValueChange={(value) => {
              setPriority(value as TaskPriority | typeof ALL)
              reset()
            }}
          >
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={ALL}>Barcha muhimlik</SelectItem>
              {TASK_PRIORITY_OPTIONS.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </>
      }
      action={
        <Button
          onClick={() => {
            setEditing(null)
            setDialogOpen(true)
          }}
        >
          <Plus />
          Yangi vazifa
        </Button>
      }
    >
      <TasksTable
        data={data?.items ?? []}
        isLoading={isLoading}
        onEdit={(task) => {
          setEditing(task)
          setDialogOpen(true)
        }}
        onDelete={(id) => deleteTask.mutate(id)}
      />

      {data && (
        <TablePagination meta={data.meta} onNext={goNext} onPrev={goBack} canGoBack={canGoBack} />
      )}

      <TaskFormDialog open={dialogOpen} onOpenChange={setDialogOpen} task={editing} />
    </PageShell>
  )
}
