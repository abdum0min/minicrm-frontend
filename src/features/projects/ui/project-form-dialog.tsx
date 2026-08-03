import { useEffect } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import { Controller, useForm } from 'react-hook-form'

import { formatDateForInput } from '@/shared/lib/format'
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
import { useCustomerOptions } from '../api/customer-options'
import { useSaveProject } from '../api/projects-queries'
import { PROJECT_STATUS_OPTIONS } from '../lib/status'
import { projectSchema, type ProjectValues } from '../model/schemas'
import type { Project } from '../model/types'

const EMPTY_VALUES: ProjectValues = {
  customerId: 0,
  projectName: '',
  description: '',
  status: 'PLANNING',
  deadline: '',
}

interface ProjectFormDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  project?: Project | null
}

export function ProjectFormDialog({ open, onOpenChange, project }: ProjectFormDialogProps) {
  const save = useSaveProject()
  const { data: customers = [] } = useCustomerOptions()

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProjectValues>({
    resolver: zodResolver(projectSchema),
    defaultValues: EMPTY_VALUES,
  })

  useEffect(() => {
    if (!open) return

    reset(
      project
        ? {
            customerId: project.customerId,
            projectName: project.projectName,
            description: project.description ?? '',
            status: project.status,
            deadline: formatDateForInput(project.deadline),
          }
        : EMPTY_VALUES,
    )
  }, [open, project, reset])

  const onSubmit = (values: ProjectValues) => {
    save.mutate({ id: project?.id, values }, { onSuccess: () => onOpenChange(false) })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{project ? 'Loyihani tahrirlash' : 'Yangi loyiha'}</DialogTitle>
          <DialogDescription>Loyiha ma'lumotlarini to'ldiring.</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <FormField id="projectName" label="Loyiha nomi" error={errors.projectName?.message}>
            <Input id="projectName" placeholder="CRM tizim" {...register('projectName')} />
          </FormField>

          <FormField id="customerId" label="Mijoz" error={errors.customerId?.message}>
            <Controller
              control={control}
              name="customerId"
              render={({ field }) => (
                <Select
                  value={field.value ? String(field.value) : undefined}
                  onValueChange={(value) => field.onChange(Number(value))}
                >
                  <SelectTrigger id="customerId" className="w-full">
                    <SelectValue placeholder="Mijozni tanlang" />
                  </SelectTrigger>
                  <SelectContent>
                    {customers.map((customer) => (
                      <SelectItem key={customer.id} value={String(customer.id)}>
                        {customer.companyName}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
          </FormField>

          <div className="grid gap-4 sm:grid-cols-2">
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
                      {PROJECT_STATUS_OPTIONS.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            </FormField>

            <FormField id="deadline" label="Deadline" error={errors.deadline?.message}>
              <Input id="deadline" type="date" {...register('deadline')} />
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
