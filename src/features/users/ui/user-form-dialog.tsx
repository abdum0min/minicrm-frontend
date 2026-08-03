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
import { useSaveUser } from '../api/users-queries'
import {
  createUserSchema,
  updateUserSchema,
  type UpdateUserValues,
} from '../model/schemas'
import type { User } from '../model/types'

const EMPTY_VALUES: UpdateUserValues = {
  fullname: '',
  email: '',
  password: '',
  role: 'USER',
}

interface UserFormDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  user?: User | null
}

export function UserFormDialog({ open, onOpenChange, user }: UserFormDialogProps) {
  const save = useSaveUser()

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UpdateUserValues>({
    resolver: zodResolver(user ? updateUserSchema : createUserSchema),
    defaultValues: EMPTY_VALUES,
  })

  useEffect(() => {
    if (!open) return

    reset(
      user
        ? { fullname: user.fullname, email: user.email, password: '', role: user.role }
        : EMPTY_VALUES,
    )
  }, [open, user, reset])

  const onSubmit = (values: UpdateUserValues) => {
    save.mutate({ id: user?.id, values }, { onSuccess: () => onOpenChange(false) })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {user ? 'Foydalanuvchini tahrirlash' : 'Yangi foydalanuvchi'}
          </DialogTitle>
          <DialogDescription>
            {user
              ? "Parolni o'zgartirmoqchi bo'lmasangiz, parol maydonini bo'sh qoldiring."
              : "Foydalanuvchi ma'lumotlarini to'ldiring."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <FormField id="fullname" label="To'liq ism" error={errors.fullname?.message}>
            <Input id="fullname" placeholder="John Doe" {...register('fullname')} />
          </FormField>

          <FormField id="email" label="Email" error={errors.email?.message}>
            <Input id="email" type="email" placeholder="john@mail.com" {...register('email')} />
          </FormField>

          <div className="grid gap-4 sm:grid-cols-2">
            <FormField id="password" label="Parol" error={errors.password?.message}>
              <Input
                id="password"
                type="password"
                placeholder={user ? "O'zgartirmaslik uchun bo'sh" : 'Secret123'}
                autoComplete="new-password"
                {...register('password')}
              />
            </FormField>

            <FormField id="role" label="Rol" error={errors.role?.message}>
              <Controller
                control={control}
                name="role"
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger id="role" className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="USER">User</SelectItem>
                      <SelectItem value="ADMIN">Admin</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </FormField>
          </div>

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
