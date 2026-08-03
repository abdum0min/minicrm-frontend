import { z } from 'zod'

export const taskSchema = z.object({
  projectId: z.number().int().min(1, 'Loyihani tanlang'),
  assignedUserId: z.number().int().min(1).optional(),
  title: z.string().min(2, 'Kamida 2 ta belgi').max(200),
  description: z.string().max(1000).optional().or(z.literal('')),
  status: z.enum(['TODO', 'IN_PROGRESS', 'DONE']),
  priority: z.enum(['LOW', 'MEDIUM', 'HIGH']),
})

export type TaskValues = z.infer<typeof taskSchema>
