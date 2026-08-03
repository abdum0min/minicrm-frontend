const MONTHS = [
  'Yan',
  'Fev',
  'Mar',
  'Apr',
  'May',
  'Iyun',
  'Iyul',
  'Avg',
  'Sen',
  'Okt',
  'Noy',
  'Dek',
]

export interface TrendPoint {
  month: string
  created: number
  completed: number
}

interface TrendSource {
  createdAt: string
  status: string
}

export function buildTasksTrend(tasks: TrendSource[], monthsBack = 6): TrendPoint[] {
  const now = new Date()

  const buckets: TrendPoint[] = Array.from({ length: monthsBack }, (_, index) => {
    const date = new Date(now.getFullYear(), now.getMonth() - (monthsBack - 1 - index), 1)

    return { month: MONTHS[date.getMonth()], created: 0, completed: 0 }
  })

  const oldest = new Date(now.getFullYear(), now.getMonth() - (monthsBack - 1), 1)

  for (const task of tasks) {
    const date = new Date(task.createdAt)

    if (date < oldest) continue

    const offset =
      (date.getFullYear() - oldest.getFullYear()) * 12 + date.getMonth() - oldest.getMonth()

    const bucket = buckets[offset]

    if (!bucket) continue

    bucket.created += 1
    if (task.status === 'DONE') bucket.completed += 1
  }

  return buckets
}
