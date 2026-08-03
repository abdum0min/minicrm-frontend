import { z } from 'zod'

export const customerSchema = z.object({
  companyName: z.string().min(2, 'Kamida 2 ta belgi').max(150),
  fullname: z.string().min(3, 'Kamida 3 ta belgi').max(100),
  phone: z.string().regex(/^\+?\d{9,15}$/, 'Masalan: +998901234567'),
  email: z.email('Email formati noto`g`ri'),
  address: z.string().min(2, 'Manzilni kiriting').max(255),
})

export type CustomerValues = z.infer<typeof customerSchema>
