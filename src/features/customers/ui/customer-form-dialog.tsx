import { useEffect } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import { useForm } from 'react-hook-form'

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
import { useSaveCustomer } from '../api/customers-queries'
import { customerSchema, type CustomerValues } from '../model/schemas'
import type { Customer } from '../model/types'

const EMPTY_VALUES: CustomerValues = {
  companyName: '',
  fullname: '',
  phone: '',
  email: '',
  address: '',
}

interface CustomerFormDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  customer?: Customer | null
}

export function CustomerFormDialog({
  open,
  onOpenChange,
  customer,
}: CustomerFormDialogProps) {
  const save = useSaveCustomer()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CustomerValues>({
    resolver: zodResolver(customerSchema),
    defaultValues: EMPTY_VALUES,
  })

  useEffect(() => {
    if (!open) return

    reset(
      customer
        ? {
            companyName: customer.companyName,
            fullname: customer.fullname,
            phone: customer.phone,
            email: customer.email,
            address: customer.address,
          }
        : EMPTY_VALUES,
    )
  }, [open, customer, reset])

  const onSubmit = (values: CustomerValues) => {
    save.mutate(
      { id: customer?.id, values },
      { onSuccess: () => onOpenChange(false) },
    )
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{customer ? 'Mijozni tahrirlash' : 'Yangi mijoz'}</DialogTitle>
          <DialogDescription>Mijoz ma'lumotlarini to'ldiring.</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <FormField id="companyName" label="Kompaniya" error={errors.companyName?.message}>
            <Input id="companyName" placeholder="IT Solutions" {...register('companyName')} />
          </FormField>

          <FormField id="fullname" label="To'liq ism" error={errors.fullname?.message}>
            <Input id="fullname" placeholder="Anvar Karimov" {...register('fullname')} />
          </FormField>

          <div className="grid gap-4 sm:grid-cols-2">
            <FormField id="phone" label="Telefon" error={errors.phone?.message}>
              <Input id="phone" placeholder="+998901234567" {...register('phone')} />
            </FormField>

            <FormField id="email" label="Email" error={errors.email?.message}>
              <Input id="email" type="email" placeholder="anvar@mail.com" {...register('email')} />
            </FormField>
          </div>

          <FormField id="address" label="Manzil" error={errors.address?.message}>
            <Input id="address" placeholder="Toshkent" {...register('address')} />
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
