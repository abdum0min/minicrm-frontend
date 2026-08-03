import { useState } from 'react'
import {
  Briefcase,
  CheckCircle2,
  ChevronRight,
  Info,
  ListTodo,
  MoreHorizontal,
  Pencil,
  Plus,
  Search,
  Trash2,
  TriangleAlert,
  Users,
} from 'lucide-react'
import { toast } from 'sonner'
import { CartesianGrid, Label, Line, LineChart, Pie, PieChart, XAxis, YAxis } from 'recharts'

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/shared/ui/accordion'
import { Alert, AlertDescription, AlertTitle } from '@/shared/ui/alert'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/shared/ui/alert-dialog'
import { Avatar, AvatarFallback } from '@/shared/ui/avatar'
import { Badge } from '@/shared/ui/badge'
import { Button } from '@/shared/ui/button'
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/ui/card'
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/shared/ui/chart'
import { Checkbox } from '@/shared/ui/checkbox'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/shared/ui/dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/shared/ui/dropdown-menu'
import { Input } from '@/shared/ui/input'
import { Label as FieldLabel } from '@/shared/ui/label'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/shared/ui/pagination'
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/ui/popover'
import { Progress } from '@/shared/ui/progress'
import { RadioGroup, RadioGroupItem } from '@/shared/ui/radio-group'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/ui/select'
import { Separator } from '@/shared/ui/separator'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/shared/ui/sheet'
import { Skeleton } from '@/shared/ui/skeleton'
import { Switch } from '@/shared/ui/switch'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/shared/ui/table'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/ui/tabs'
import { Textarea } from '@/shared/ui/textarea'
import { ThemeToggle } from '@/shared/ui/theme-toggle'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/shared/ui/tooltip'
import { cn } from '@/shared/lib/utils'

const STATS = [
  { label: 'Jami mijozlar', value: 128, icon: Users, tone: 'chart-1' },
  { label: 'Jami loyihalar', value: 56, icon: Briefcase, tone: 'chart-3' },
  { label: 'Jami vazifalar', value: 234, icon: ListTodo, tone: 'chart-4' },
  { label: 'Tugallangan', value: 152, icon: CheckCircle2, tone: 'chart-5' },
]

const PROJECT_STATUS = [
  { key: 'done', label: 'Tugallangan', value: 24, fill: 'var(--color-done)' },
  { key: 'active', label: 'Jarayonda', value: 20, fill: 'var(--color-active)' },
  { key: 'pending', label: 'Kutilmoqda', value: 12, fill: 'var(--color-pending)' },
]

const PROJECT_STATUS_CONFIG = {
  done: { label: 'Tugallangan', color: 'var(--chart-1)' },
  active: { label: 'Jarayonda', color: 'var(--chart-2)' },
  pending: { label: 'Kutilmoqda', color: 'var(--chart-3)' },
} satisfies ChartConfig

const TASK_TREND = [
  { month: 'Yan', done: 18, created: 26 },
  { month: 'Fev', done: 24, created: 30 },
  { month: 'Mar', done: 31, created: 34 },
  { month: 'Apr', done: 28, created: 41 },
  { month: 'May', done: 44, created: 47 },
  { month: 'Iyun', done: 52, created: 49 },
  { month: 'Iyul', done: 61, created: 58 },
]

const TASK_TREND_CONFIG = {
  done: { label: 'Bajarilgan', color: 'var(--chart-1)' },
  created: { label: 'Yangi', color: 'var(--chart-2)' },
} satisfies ChartConfig

const PROJECTS = [
  { id: 1, name: 'CRM tizim', customer: 'IT Solutions', status: 'active', deadline: '30.06.2026' },
  { id: 2, name: "Online do'kon", customer: 'SoftUz', status: 'done', deadline: '15.05.2026' },
  { id: 3, name: 'Mobil ilova', customer: 'Web Studio', status: 'active', deadline: '20.06.2026' },
  { id: 4, name: 'Landing page', customer: 'Dev Team', status: 'pending', deadline: '05.06.2026' },
  { id: 5, name: 'Admin panel', customer: 'CodePro', status: 'done', deadline: '28.06.2026' },
]

const STATUS_BADGE = {
  done: { label: 'Tugallangan', variant: 'success' as const },
  active: { label: 'Jarayonda', variant: 'warning' as const },
  pending: { label: 'Kutilmoqda', variant: 'info' as const },
}

const COLOR_TOKENS = [
  { name: 'background', className: 'bg-background' },
  { name: 'card', className: 'bg-card' },
  { name: 'muted', className: 'bg-muted' },
  { name: 'primary', className: 'bg-primary' },
  { name: 'secondary', className: 'bg-secondary' },
  { name: 'accent', className: 'bg-accent' },
  { name: 'border', className: 'bg-border' },
  { name: 'ring', className: 'bg-ring' },
]

const STATUS_TOKENS = [
  { name: 'success', className: 'bg-success' },
  { name: 'warning', className: 'bg-warning' },
  { name: 'info', className: 'bg-info' },
  { name: 'destructive', className: 'bg-destructive' },
]

const CHART_TOKENS = [
  { name: 'chart-1', className: 'bg-chart-1' },
  { name: 'chart-2', className: 'bg-chart-2' },
  { name: 'chart-3', className: 'bg-chart-3' },
  { name: 'chart-4', className: 'bg-chart-4' },
  { name: 'chart-5', className: 'bg-chart-5' },
]

function Section({
  id,
  title,
  description,
  children,
}: {
  id: string
  title: string
  description: string
  children: React.ReactNode
}) {
  return (
    <section id={id} className="scroll-mt-20 space-y-4">
      <div className="space-y-1">
        <h2 className="text-lg font-semibold tracking-tight">{title}</h2>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      {children}
    </section>
  )
}

function Swatch({ name, className }: { name: string; className: string }) {
  return (
    <div className="space-y-1.5">
      <div className={cn('h-14 w-full rounded-lg border border-border', className)} />
      <p className="font-mono text-xs text-muted-foreground">{name}</p>
    </div>
  )
}

export function DesignSystemPage() {
  const totalProjects = PROJECT_STATUS.reduce((sum, item) => sum + item.value, 0)
  const [page, setPage] = useState(1)

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-30 border-b border-border bg-background/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-3">
          <div>
            <p className="text-sm font-semibold">Mini CRM · Design System</p>
            <p className="text-xs text-muted-foreground">Light va dark rejim uchun bitta token to'plami</p>
          </div>
          <ThemeToggle />
        </div>
      </header>

      <main className="mx-auto max-w-6xl space-y-12 px-6 py-10">
        <Section id="colors" title="Ranglar" description="Barcha ranglar CSS o'zgaruvchilari orqali — rejim almashganda avtomatik moslashadi.">
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-8">
              {COLOR_TOKENS.map((token) => (
                <Swatch key={token.name} {...token} />
              ))}
            </div>

            <div className="space-y-2">
              <p className="text-sm font-medium">Holat ranglari</p>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                {STATUS_TOKENS.map((token) => (
                  <Swatch key={token.name} {...token} />
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-sm font-medium">Chart palitrasi</p>
              <p className="text-xs text-muted-foreground">
                Rang ko'rlik (protanopia/deuteranopia) uchun tekshirilgan, ketma-ketligi qat'iy.
              </p>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-5">
                {CHART_TOKENS.map((token) => (
                  <Swatch key={token.name} {...token} />
                ))}
              </div>
            </div>
          </div>
        </Section>

        <Section id="typography" title="Tipografika" description="Geist Variable — sarlavhadan izohgacha bitta oila.">
          <Card>
            <CardContent className="space-y-3">
              <p className="text-3xl font-semibold tracking-tight">Display · 30px semibold</p>
              <p className="text-2xl font-semibold tracking-tight">Sarlavha · 24px semibold</p>
              <p className="text-lg font-semibold">Bo'lim · 18px semibold</p>
              <p className="text-sm">Asosiy matn · 14px regular</p>
              <p className="text-sm text-muted-foreground">Ikkilamchi matn · 14px muted</p>
              <p className="font-mono text-xs text-muted-foreground">Mono · 12px — kod va tokenlar uchun</p>
              <p className="text-sm tabular-nums">Jadval raqamlari · 1,284 · 12.9K · $4.2M</p>
            </CardContent>
          </Card>
        </Section>

        <Section id="stats" title="Statistika kartalari" description="Dashboard yuqorisidagi asosiy ko'rsatkichlar.">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {STATS.map(({ label, value, icon: Icon, tone }) => (
              <Card key={label}>
                <CardContent className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">{label}</p>
                    <p className="text-2xl font-semibold">{value}</p>
                  </div>
                  <span
                    className="flex size-10 items-center justify-center rounded-lg"
                    style={{ backgroundColor: `color-mix(in oklch, var(--${tone}), transparent 88%)` }}
                  >
                    <Icon className="size-5" style={{ color: `var(--${tone})` }} />
                  </span>
                </CardContent>
              </Card>
            ))}
          </div>
        </Section>

        <Section id="charts" title="Chartlar" description="Har bir chart uchun jadval ko'rinishi ham bor — rang yagona kanal emas.">
          <div className="grid gap-4 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Loyihalar statistikasi</CardTitle>
                <CardDescription>Holat bo'yicha taqsimot</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="chart">
                  <TabsList className="mb-4">
                    <TabsTrigger value="chart">Chart</TabsTrigger>
                    <TabsTrigger value="table">Jadval</TabsTrigger>
                  </TabsList>

                  <TabsContent value="chart" className="flex flex-col items-center gap-4 sm:flex-row">
                    <ChartContainer config={PROJECT_STATUS_CONFIG} className="aspect-square h-[200px]">
                      <PieChart>
                        <ChartTooltip content={<ChartTooltipContent hideLabel nameKey="key" />} />
                        <Pie
                          data={PROJECT_STATUS}
                          dataKey="value"
                          nameKey="key"
                          innerRadius={58}
                          outerRadius={88}
                          paddingAngle={2}
                          strokeWidth={0}
                        >
                          <Label
                            content={({ viewBox }) =>
                              viewBox && 'cx' in viewBox ? (
                                <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle" dominantBaseline="middle">
                                  <tspan x={viewBox.cx} className="fill-foreground text-2xl font-semibold">
                                    {totalProjects}
                                  </tspan>
                                  <tspan x={viewBox.cx} dy="1.4em" className="fill-muted-foreground text-xs">
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
                      {PROJECT_STATUS.map((item) => (
                        <li key={item.key} className="flex items-center gap-2 text-sm">
                          <span
                            className="size-2.5 shrink-0 rounded-full"
                            style={{ backgroundColor: PROJECT_STATUS_CONFIG[item.key as keyof typeof PROJECT_STATUS_CONFIG].color }}
                          />
                          <span className="text-muted-foreground">{item.label}</span>
                          <span className="ml-auto font-medium tabular-nums">
                            {item.value} · {Math.round((item.value / totalProjects) * 100)}%
                          </span>
                        </li>
                      ))}
                    </ul>
                  </TabsContent>

                  <TabsContent value="table">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Holat</TableHead>
                          <TableHead className="text-right">Soni</TableHead>
                          <TableHead className="text-right">Ulush</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {PROJECT_STATUS.map((item) => (
                          <TableRow key={item.key}>
                            <TableCell>{item.label}</TableCell>
                            <TableCell className="text-right tabular-nums">{item.value}</TableCell>
                            <TableCell className="text-right tabular-nums">
                              {Math.round((item.value / totalProjects) * 100)}%
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Vazifalar statistikasi</CardTitle>
                <CardDescription>Oylar kesimida yangi va bajarilgan vazifalar</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="chart">
                  <TabsList className="mb-4">
                    <TabsTrigger value="chart">Chart</TabsTrigger>
                    <TabsTrigger value="table">Jadval</TabsTrigger>
                  </TabsList>

                  <TabsContent value="chart">
                    <ChartContainer config={TASK_TREND_CONFIG} className="h-[236px] w-full">
                      <LineChart data={TASK_TREND} margin={{ left: 4, right: 12, top: 8 }}>
                        <CartesianGrid vertical={false} stroke="var(--border)" />
                        <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
                        <YAxis tickLine={false} axisLine={false} width={28} tickMargin={4} />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <ChartLegend content={<ChartLegendContent />} />
                        <Line
                          dataKey="done"
                          type="monotone"
                          stroke="var(--color-done)"
                          strokeWidth={2}
                          dot={{ r: 4, fill: 'var(--color-done)', stroke: 'var(--card)', strokeWidth: 2 }}
                          activeDot={{ r: 6 }}
                        />
                        <Line
                          dataKey="created"
                          type="monotone"
                          stroke="var(--color-created)"
                          strokeWidth={2}
                          dot={{ r: 4, fill: 'var(--color-created)', stroke: 'var(--card)', strokeWidth: 2 }}
                          activeDot={{ r: 6 }}
                        />
                      </LineChart>
                    </ChartContainer>
                  </TabsContent>

                  <TabsContent value="table">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Oy</TableHead>
                          <TableHead className="text-right">Bajarilgan</TableHead>
                          <TableHead className="text-right">Yangi</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {TASK_TREND.map((row) => (
                          <TableRow key={row.month}>
                            <TableCell>{row.month}</TableCell>
                            <TableCell className="text-right tabular-nums">{row.done}</TableCell>
                            <TableCell className="text-right tabular-nums">{row.created}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </Section>

        <Section id="buttons" title="Tugmalar" description="Variantlar va o'lchamlar.">
          <Card>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <Button>Default</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="destructive">Destructive</Button>
                <Button variant="link">Link</Button>
              </div>

              <Separator />

              <div className="flex flex-wrap items-center gap-2">
                <Button size="xs">Extra small</Button>
                <Button size="sm">Small</Button>
                <Button>Default</Button>
                <Button size="lg">Large</Button>
                <Button size="icon" variant="outline" aria-label="Qo'shish">
                  <Plus />
                </Button>
                <Button disabled>Disabled</Button>
                <Button>
                  <Plus />
                  Yangi loyiha
                </Button>
              </div>
            </CardContent>
          </Card>
        </Section>

        <Section id="badges" title="Badge va holatlar" description="Holat ranglari doimo matn bilan birga — faqat rangga tayanmaydi.">
          <Card>
            <CardContent className="flex flex-wrap items-center gap-2">
              <Badge>Default</Badge>
              <Badge variant="secondary">Secondary</Badge>
              <Badge variant="outline">Outline</Badge>
              <Badge variant="success">
                <CheckCircle2 />
                Tugallangan
              </Badge>
              <Badge variant="warning">
                <TriangleAlert />
                Jarayonda
              </Badge>
              <Badge variant="info">
                <Info />
                Kutilmoqda
              </Badge>
              <Badge variant="destructive">
                <TriangleAlert />
                Bekor qilingan
              </Badge>
            </CardContent>
          </Card>
        </Section>

        <Section id="forms" title="Forma elementlari" description="Kirish, tanlash va o'zgartirish uchun boshqaruvlar.">
          <div className="grid gap-4 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Mijoz qo'shish</CardTitle>
                <CardDescription>Barcha maydonlar bir xil balandlik va radiusda</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <FieldLabel htmlFor="ds-name">To'liq ism</FieldLabel>
                  <Input id="ds-name" placeholder="Anvar Karimov" />
                </div>

                <div className="space-y-2">
                  <FieldLabel htmlFor="ds-email">Email</FieldLabel>
                  <Input id="ds-email" type="email" placeholder="email@example.com" />
                </div>

                <div className="space-y-2">
                  <FieldLabel htmlFor="ds-invalid">Telefon</FieldLabel>
                  <Input id="ds-invalid" aria-invalid defaultValue="+99890" />
                  <p className="text-xs text-destructive">Raqam to'liq kiritilmagan</p>
                </div>

                <div className="space-y-2">
                  <FieldLabel htmlFor="ds-region">Manzil</FieldLabel>
                  <Select>
                    <SelectTrigger id="ds-region" className="w-full">
                      <SelectValue placeholder="Viloyatni tanlang" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="tashkent">Toshkent</SelectItem>
                      <SelectItem value="samarkand">Samarqand</SelectItem>
                      <SelectItem value="bukhara">Buxoro</SelectItem>
                      <SelectItem value="andijan">Andijon</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <FieldLabel htmlFor="ds-note">Izoh</FieldLabel>
                  <Textarea id="ds-note" placeholder="Qisqacha ma'lumot..." rows={3} />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Tanlov boshqaruvlari</CardTitle>
                <CardDescription>Checkbox, radio, switch va qidiruv</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="relative">
                  <Search className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
                  <Input placeholder="Qidirish..." className="pl-8" />
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Checkbox id="ds-remember" defaultChecked />
                    <FieldLabel htmlFor="ds-remember">Eslab qolish</FieldLabel>
                  </div>
                  <div className="flex items-center gap-2">
                    <Checkbox id="ds-notify" />
                    <FieldLabel htmlFor="ds-notify">Email xabarnoma</FieldLabel>
                  </div>
                </div>

                <Separator />

                <RadioGroup defaultValue="admin" className="space-y-2">
                  <p className="text-sm font-medium">Rol</p>
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="admin" id="ds-admin" />
                    <FieldLabel htmlFor="ds-admin">Admin</FieldLabel>
                  </div>
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="manager" id="ds-manager" />
                    <FieldLabel htmlFor="ds-manager">Manager</FieldLabel>
                  </div>
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="user" id="ds-user" />
                    <FieldLabel htmlFor="ds-user">User</FieldLabel>
                  </div>
                </RadioGroup>

                <Separator />

                <div className="flex items-center justify-between">
                  <FieldLabel htmlFor="ds-active">Faol foydalanuvchi</FieldLabel>
                  <Switch id="ds-active" defaultChecked />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Loyiha bajarilishi</span>
                    <span className="font-medium tabular-nums">68%</span>
                  </div>
                  <Progress value={68} />
                </div>
              </CardContent>
            </Card>
          </div>
        </Section>

        <Section id="overlays" title="Modal va overlaylar" description="Dialog, sheet, popover, dropdown, tooltip va toast.">
          <Card>
            <CardContent className="flex flex-wrap items-center gap-2">
              <Dialog>
                <DialogTrigger asChild>
                  <Button>
                    <Plus />
                    Modal ochish
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Yangi loyiha</DialogTitle>
                    <DialogDescription>Loyiha ma'lumotlarini to'ldiring.</DialogDescription>
                  </DialogHeader>

                  <div className="space-y-4 py-2">
                    <div className="space-y-2">
                      <FieldLabel htmlFor="ds-project">Loyiha nomi</FieldLabel>
                      <Input id="ds-project" placeholder="CRM tizim" />
                    </div>
                    <div className="space-y-2">
                      <FieldLabel htmlFor="ds-customer">Mijoz</FieldLabel>
                      <Select>
                        <SelectTrigger id="ds-customer" className="w-full">
                          <SelectValue placeholder="Mijozni tanlang" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="it-solutions">IT Solutions</SelectItem>
                          <SelectItem value="softuz">SoftUz</SelectItem>
                          <SelectItem value="web-studio">Web Studio</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <DialogFooter>
                    <DialogClose asChild>
                      <Button variant="outline">Bekor qilish</Button>
                    </DialogClose>
                    <Button onClick={() => toast.success('Loyiha yaratildi')}>Saqlash</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive">
                    <Trash2 />
                    O'chirish
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Loyihani o'chirasizmi?</AlertDialogTitle>
                    <AlertDialogDescription>
                      Bu amalni ortga qaytarib bo'lmaydi. Loyiha va unga bog'liq vazifalar o'chiriladi.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Bekor qilish</AlertDialogCancel>
                    <AlertDialogAction onClick={() => toast.error("Loyiha o'chirildi")}>O'chirish</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>

              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline">Sheet</Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Filtrlar</SheetTitle>
                    <SheetDescription>Ro'yxatni holat va sana bo'yicha filtrlang.</SheetDescription>
                  </SheetHeader>
                  <div className="space-y-4 px-4">
                    <Select>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Holat" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="done">Tugallangan</SelectItem>
                        <SelectItem value="active">Jarayonda</SelectItem>
                        <SelectItem value="pending">Kutilmoqda</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button className="w-full">Qo'llash</Button>
                  </div>
                </SheetContent>
              </Sheet>

              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline">Popover</Button>
                </PopoverTrigger>
                <PopoverContent className="w-64">
                  <p className="text-sm font-medium">Tez amallar</p>
                  <p className="mt-1 text-sm text-muted-foreground">Bu yerga qisqa forma yoki ro'yxat joylashadi.</p>
                </PopoverContent>
              </Popover>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">
                    Amallar
                    <ChevronRight />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                  <DropdownMenuLabel>Loyiha</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Pencil />
                    Tahrirlash
                  </DropdownMenuItem>
                  <DropdownMenuItem variant="destructive">
                    <Trash2 />
                    O'chirish
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="icon" aria-label="Ma'lumot">
                    <Info />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Qo'shimcha ma'lumot</TooltipContent>
              </Tooltip>

              <Button variant="secondary" onClick={() => toast.success('Ma\'lumot saqlandi')}>
                Toast
              </Button>
            </CardContent>
          </Card>
        </Section>

        <Section id="feedback" title="Xabarlar va yuklanish" description="Alert, skeleton va bo'sh holatlar.">
          <div className="grid gap-4 lg:grid-cols-2">
            <div className="space-y-3">
              <Alert>
                <Info />
                <AlertTitle>Ma'lumot</AlertTitle>
                <AlertDescription>Oxirgi sinxronizatsiya 5 daqiqa oldin bo'lgan.</AlertDescription>
              </Alert>

              <Alert variant="destructive">
                <TriangleAlert />
                <AlertTitle>Xatolik</AlertTitle>
                <AlertDescription>Serverga ulanib bo'lmadi. Keyinroq urinib ko'ring.</AlertDescription>
              </Alert>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Yuklanmoqda</CardTitle>
                <CardDescription>Skeleton holati</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {[0, 1, 2].map((row) => (
                  <div key={row} className="flex items-center gap-3">
                    <Skeleton className="size-9 rounded-full" />
                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-3 w-1/3" />
                      <Skeleton className="h-3 w-2/3" />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </Section>

        <Section id="table" title="Jadval" description="CRM ro'yxatlari uchun asosiy naqsh — sarlavha, holat, amallar va paginatsiya.">
          <Card>
            <CardHeader>
              <CardTitle>Loyihalar</CardTitle>
              <CardDescription>Jami 56 ta loyiha</CardDescription>
              <CardAction>
                <Button size="sm">
                  <Plus />
                  Yangi loyiha
                </Button>
              </CardAction>
            </CardHeader>
            <CardContent className="space-y-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-10">#</TableHead>
                    <TableHead>Loyiha nomi</TableHead>
                    <TableHead>Mijoz</TableHead>
                    <TableHead>Holat</TableHead>
                    <TableHead>Deadline</TableHead>
                    <TableHead className="text-right">Amallar</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {PROJECTS.map((project) => (
                    <TableRow key={project.id}>
                      <TableCell className="text-muted-foreground tabular-nums">{project.id}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Avatar className="size-7">
                            <AvatarFallback>{project.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                          </Avatar>
                          <span className="font-medium">{project.name}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-muted-foreground">{project.customer}</TableCell>
                      <TableCell>
                        <Badge variant={STATUS_BADGE[project.status as keyof typeof STATUS_BADGE].variant}>
                          {STATUS_BADGE[project.status as keyof typeof STATUS_BADGE].label}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground tabular-nums">{project.deadline}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon-sm" aria-label="Amallar">
                              <MoreHorizontal />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Pencil />
                              Tahrirlash
                            </DropdownMenuItem>
                            <DropdownMenuItem variant="destructive">
                              <Trash2 />
                              O'chirish
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">1 - 5 of 56</p>
                <Pagination className="mx-0 w-auto">
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious href="#" onClick={() => setPage((p) => Math.max(1, p - 1))} />
                    </PaginationItem>
                    {[1, 2, 3].map((item) => (
                      <PaginationItem key={item}>
                        <PaginationLink href="#" isActive={page === item} onClick={() => setPage(item)}>
                          {item}
                        </PaginationLink>
                      </PaginationItem>
                    ))}
                    <PaginationItem>
                      <PaginationNext href="#" onClick={() => setPage((p) => Math.min(3, p + 1))} />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            </CardContent>
          </Card>
        </Section>

        <Section id="misc" title="Qolgan komponentlar" description="Tabs, accordion va avatar.">
          <div className="grid gap-4 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Tabs</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="all">
                  <TabsList>
                    <TabsTrigger value="all">Barchasi</TabsTrigger>
                    <TabsTrigger value="active">Jarayonda</TabsTrigger>
                    <TabsTrigger value="done">Tugallangan</TabsTrigger>
                  </TabsList>
                  <TabsContent value="all" className="pt-4 text-sm text-muted-foreground">
                    Barcha loyihalar ro'yxati.
                  </TabsContent>
                  <TabsContent value="active" className="pt-4 text-sm text-muted-foreground">
                    Faqat jarayondagi loyihalar.
                  </TabsContent>
                  <TabsContent value="done" className="pt-4 text-sm text-muted-foreground">
                    Yakunlangan loyihalar.
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Accordion</CardTitle>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible>
                  <AccordionItem value="a">
                    <AccordionTrigger>Loyiha qanday yaratiladi?</AccordionTrigger>
                    <AccordionContent>Loyihalar bo'limidan "Yangi loyiha" tugmasini bosing.</AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="b">
                    <AccordionTrigger>Rollar qanday ishlaydi?</AccordionTrigger>
                    <AccordionContent>Admin barcha bo'limlarga, User faqat o'z vazifalariga kira oladi.</AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          </div>
        </Section>
      </main>
    </div>
  )
}
