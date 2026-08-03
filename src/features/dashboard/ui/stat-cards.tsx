import { Briefcase, CheckCircle2, ListTodo, Timer, UsersRound } from 'lucide-react'

import { Skeleton } from '@/shared/ui/skeleton'
import type { DashboardStats } from '../model/types'

const CARDS = [
  { key: 'totalCustomers', label: 'Jami mijozlar', icon: UsersRound, color: 'var(--stat-blue)' },
  { key: 'totalProjects', label: 'Jami loyihalar', icon: Briefcase, color: 'var(--stat-emerald)' },
  { key: 'totalTasks', label: 'Jami vazifalar', icon: ListTodo, color: 'var(--stat-amber)' },
  { key: 'completedTasks', label: 'Tugallangan', icon: CheckCircle2, color: 'var(--stat-violet)' },
  { key: 'inProgressTasks', label: 'Jarayondagi', icon: Timer, color: 'var(--stat-red)' },
] as const

interface StatCardsProps {
  stats?: DashboardStats
  isLoading: boolean
}

export function StatCards({ stats, isLoading }: StatCardsProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
      {CARDS.map(({ key, label, icon: Icon, color }) => (
        <div
          key={key}
          style={{ backgroundColor: color }}
          className="flex items-center justify-between gap-3 rounded-xl px-4 py-3.5 text-white shadow-sm"
        >
          <div className="min-w-0 space-y-1.5">
            <p className="truncate text-xs font-semibold tracking-wide uppercase">{label}</p>
            {isLoading ? (
              <Skeleton className="h-7 w-12 bg-white/25" />
            ) : (
              <p className="text-2xl leading-none font-semibold">{stats?.[key] ?? 0}</p>
            )}
          </div>

          <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-white/20">
            <Icon className="size-5" />
          </span>
        </div>
      ))}
    </div>
  )
}
