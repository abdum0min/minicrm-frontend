import { CartesianGrid, Line, LineChart, XAxis, YAxis } from 'recharts'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/ui/card'
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/shared/ui/chart'
import { Skeleton } from '@/shared/ui/skeleton'
import type { TrendPoint } from '../lib/build-trend'

const CHART_CONFIG = {
  created: { label: 'Yangi', color: 'var(--chart-1)' },
  completed: { label: 'Bajarilgan', color: 'var(--chart-3)' },
} satisfies ChartConfig

interface TasksTrendChartProps {
  data?: TrendPoint[]
  isLoading: boolean
}

export function TasksTrendChart({ data, isLoading }: TasksTrendChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Vazifalar statistikasi</CardTitle>
        <CardDescription>Oxirgi 6 oy kesimida</CardDescription>
      </CardHeader>

      <CardContent>
        {isLoading || !data ? (
          <Skeleton className="h-[236px] w-full" />
        ) : (
          <ChartContainer config={CHART_CONFIG} className="h-[236px] w-full">
            <LineChart data={data} margin={{ left: 4, right: 12, top: 8 }}>
              <CartesianGrid vertical={false} stroke="var(--border)" />
              <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
              <YAxis tickLine={false} axisLine={false} width={28} allowDecimals={false} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <ChartLegend content={<ChartLegendContent />} />
              <Line
                dataKey="created"
                type="monotone"
                stroke="var(--color-created)"
                strokeWidth={2}
                dot={{ r: 4, fill: 'var(--color-created)', stroke: 'var(--card)', strokeWidth: 2 }}
                activeDot={{ r: 6 }}
              />
              <Line
                dataKey="completed"
                type="monotone"
                stroke="var(--color-completed)"
                strokeWidth={2}
                dot={{
                  r: 4,
                  fill: 'var(--color-completed)',
                  stroke: 'var(--card)',
                  strokeWidth: 2,
                }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  )
}
