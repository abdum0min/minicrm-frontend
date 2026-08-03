import { Label, Pie, PieChart } from 'recharts'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/ui/card'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/shared/ui/chart'
import { Skeleton } from '@/shared/ui/skeleton'
import { PROJECT_STATUS_COLORS, PROJECT_STATUS_LABELS } from '../lib/status-labels'
import type { DashboardStats } from '../model/types'

const CHART_CONFIG: ChartConfig = {
  PLANNING: { label: PROJECT_STATUS_LABELS.PLANNING, color: PROJECT_STATUS_COLORS.PLANNING },
  IN_PROGRESS: {
    label: PROJECT_STATUS_LABELS.IN_PROGRESS,
    color: PROJECT_STATUS_COLORS.IN_PROGRESS,
  },
  COMPLETED: { label: PROJECT_STATUS_LABELS.COMPLETED, color: PROJECT_STATUS_COLORS.COMPLETED },
  CANCELLED: { label: PROJECT_STATUS_LABELS.CANCELLED, color: PROJECT_STATUS_COLORS.CANCELLED },
}

interface ProjectsStatusChartProps {
  stats?: DashboardStats
  isLoading: boolean
}

export function ProjectsStatusChart({ stats, isLoading }: ProjectsStatusChartProps) {
  const rows = (stats?.projectsByStatus ?? []).filter((row) => row.count > 0)
  const total = rows.reduce((sum, row) => sum + row.count, 0)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Loyihalar statistikasi</CardTitle>
        <CardDescription>Holat bo'yicha taqsimot</CardDescription>
      </CardHeader>

      <CardContent>
        {isLoading ? (
          <Skeleton className="h-[200px] w-full" />
        ) : total === 0 ? (
          <p className="py-16 text-center text-sm text-muted-foreground">
            Hozircha loyiha yo'q
          </p>
        ) : (
          <div className="flex flex-col items-center gap-6 sm:flex-row">
            <ChartContainer config={CHART_CONFIG} className="aspect-square h-[200px]">
              <PieChart>
                <ChartTooltip content={<ChartTooltipContent hideLabel nameKey="status" />} />
                <Pie
                  data={rows.map((row) => ({
                    ...row,
                    fill: PROJECT_STATUS_COLORS[row.status],
                  }))}
                  dataKey="count"
                  nameKey="status"
                  innerRadius={58}
                  outerRadius={88}
                  paddingAngle={2}
                  strokeWidth={0}
                >
                  <Label
                    content={({ viewBox }) =>
                      viewBox && 'cx' in viewBox ? (
                        <text
                          x={viewBox.cx}
                          y={viewBox.cy}
                          textAnchor="middle"
                          dominantBaseline="middle"
                        >
                          <tspan
                            x={viewBox.cx}
                            className="fill-foreground text-2xl font-semibold"
                          >
                            {total}
                          </tspan>
                          <tspan
                            x={viewBox.cx}
                            dy="1.4em"
                            className="fill-muted-foreground text-xs"
                          >
                            loyiha
                          </tspan>
                        </text>
                      ) : null
                    }
                  />
                </Pie>
              </PieChart>
            </ChartContainer>

            <ul className="w-full space-y-2">
              {rows.map((row) => (
                <li key={row.status} className="flex items-center gap-2 text-sm">
                  <span
                    className="size-2.5 shrink-0 rounded-full"
                    style={{ backgroundColor: PROJECT_STATUS_COLORS[row.status] }}
                  />
                  <span className="text-muted-foreground">
                    {PROJECT_STATUS_LABELS[row.status]}
                  </span>
                  <span className="ml-auto font-medium tabular-nums">
                    {row.count} · {Math.round((row.count / total) * 100)}%
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
