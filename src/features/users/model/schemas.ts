import { z } from 'zod'

const passwordRule = z
  .string()
  .min(8, 'Kamida 8 ta belgi')
  .regex(/^(?=.*[A-Za-z])(?=.*\d).+$/, 'Kamida bitta harf va bitta raqam bo`lsin')

export const createUserSchema = z.object({
  fullname: z.string().min(3, 'Kamida 3 ta belgi').max(100),
  email: z.email('Email formati noto`g`ri'),
  password: passwordRule,
  role: z.enum(['ADMIN', 'USER']),
})

export const updateUserSchema = createUserSchema.extend({
  password: z.union([passwordRule, z.literal('')]).optional(),
})

export type CreateUserValues = z.infer<typeof createUserSchema>
export type UpdateUserValues = z.infer<typeof updateUserSchema>
