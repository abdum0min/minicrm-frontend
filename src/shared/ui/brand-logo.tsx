import { cn } from '@/shared/lib/utils'

export function BrandMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden className={cn('size-7', className)}>
      <rect width="32" height="32" rx="9" fill="var(--chart-1)" />
      <path
        d="M22 11.5a7 7 0 100 9"
        stroke="white"
        strokeWidth="2.6"
        strokeLinecap="round"
        fill="none"
      />
      <circle cx="22.5" cy="16" r="2.4" fill="white" />
    </svg>
  )
}

export function BrandLogo({ className }: { className?: string }) {
  return (
    <span className={cn('flex items-center gap-2', className)}>
      <BrandMark />
      <span className="text-base font-semibold tracking-tight">Mini CRM</span>
    </span>
  )
}
