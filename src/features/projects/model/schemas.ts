import { z } from 'zod'

export const projectSchema = z.object({
  customerId: z.number().int().min(1, 'Mijozni tanlang'),
  projectName: z.string().min(2, 'Kamida 2 ta belgi').max(150),
  description: z.string().max(1000).optional().or(z.literal('')),
  status: z.enum(['PLANNING', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED']),
  deadline: z.string().min(1, 'Deadline sanasini tanlang'),
})

export type ProjectValues = z.infer<typeof projectSchema>
