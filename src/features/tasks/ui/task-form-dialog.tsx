import { useEffect } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import { Controller, useForm } from 'react-hook-form'

import { Button } from '@/shared/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/shared/ui/dialog'
import { FormField } from '@/shared/ui/form-field'
import { Input } from '@/shared/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/ui/select'
import { Textarea } from '@/shared/ui/textarea'
import { useProjectOptions, useUserOptions } from '../api/options'
import { useSaveTask } from '../api/tasks-queries'
import { TASK_PRIORITY_OPTIONS, TASK_STATUS_OPTIONS } from '../lib/status'
import { taskSchema, type TaskValues } from '../model/schemas'
import type { Task } from '../model/types'

const UNASSIGNED = 'unassigned'

const EMPTY_VALUES: TaskValues = {
  projectId: 0,
  assignedUserId: undefined,
  title: '',
  description: '',
  status: 'TODO',
  priority: 'MEDIUM',
}

interface TaskFormDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  task?: Task | null
}

export function TaskFormDialog({ open, onOpenChange, task }: TaskFormDialogProps) {
  const save = useSaveTask()
  const { data: projects = [] } = useProjectOptions()
  const { data: users = [] } = useUserOptions()

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TaskValues>({
    resolver: zodResolver(taskSchema),
    defaultValues: EMPTY_VALUES,
  })

  useEffect(() => {
    if (!open) return

    reset(
      task
        ? {
            projectId: task.projectId,
            assignedUserId: task.assignedUserId ?? undefined,
            title: task.title,
            description: task.description ?? '',
            status: task.status,
            priority: task.priority,
          }
        : EMPTY_VALUES,
    )
  }, [open, task, reset])

  const onSubmit = (values: TaskValues) => {
    save.mutate({ id: task?.id, values }, { onSuccess: () => onOpenChange(false) })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{task ? 'Vazifani tahrirlash' : 'Yangi vazifa'}</DialogTitle>
          <DialogDescription>Vazifa ma'lumotlarini to'ldiring.</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <FormField id="title" label="Vazifa nomi" error={errors.title?.message}>
            <Input id="title" placeholder="Landing page yaratish" {...register('title')} />
          </FormField>

          <div className="grid gap-4 sm:grid-cols-2">
            <FormField id="projectId" label="Loyiha" error={errors.projectId?.message}>
              <Controller
                control={control}
                name="projectId"
                render={({ field }) => (
                  <Select
                    value={field.value ? String(field.value) : undefined}
                    onValueChange={(value) => field.onChange(Number(value))}
                  >
                    <SelectTrigger id="projectId" className="w-full">
                      <SelectValue placeholder="Loyihani tanlang" />
                    </SelectTrigger>
                    <SelectContent>
                      {projects.map((project) => (
                        <SelectItem key={project.id} value={String(project.id)}>
                          {project.projectName}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            </FormField>

            <FormField id="assignedUserId" label="Mas'ul" error={errors.assignedUserId?.message}>
              <Controller
                control={control}
                name="assignedUserId"
                render={({ field }) => (
                  <Select
                    value={field.value ? String(field.value) : UNASSIGNED}
                    onValueChange={(value) =>
                      field.onChange(value === UNASSIGNED ? undefined : Number(value))
                    }
                  >
                    <SelectTrigger id="assignedUserId" className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value={UNASSIGNED}>Tayinlanmagan</SelectItem>
                      {users.map((user) => (
                        <SelectItem key={user.id} value={String(user.id)}>
                          {user.fullname}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            </FormField>

            <FormField id="status" label="Holat" error={errors.status?.message}>
              <Controller
                control={control}
                name="status"
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger id="status" className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {TASK_STATUS_OPTIONS.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            </FormField>

            <FormField id="priority" label="Muhimlik" error={errors.priority?.message}>
              <Controller
                control={control}
                name="priority"
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger id="priority" className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {TASK_PRIORITY_OPTIONS.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            </FormField>
          </div>

          <FormField id="description" label="Tavsif" error={errors.description?.message}>
            <Textarea id="description" rows={3} placeholder="Qisqacha tavsif..." {...register('description')} />
          </FormField>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Bekor qilish
            </Button>
            <Button type="submit" disabled={save.isPending}>
              {save.isPending && <Loader2 className="animate-spin" />}
              Saqlash
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
