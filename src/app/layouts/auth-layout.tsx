import { Outlet } from 'react-router-dom'

import { BrandLogo } from '@/shared/ui/brand-logo'
import { CrmIllustration } from '@/shared/ui/crm-illustration'
import { ThemeToggle } from '@/shared/ui/theme-toggle'

export function AuthLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-muted/30 lg:flex-row">
      <div className="flex flex-1 flex-col px-6 py-8 sm:px-10">
        <div className="flex items-center justify-between">
          <BrandLogo />
          <ThemeToggle />
        </div>

        <div className="flex flex-1 items-center justify-center py-10">
          <div className="w-full max-w-sm">
            <Outlet />
          </div>
        </div>

        <p className="text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} Mini CRM
        </p>
      </div>

      <div className="hidden flex-1 items-center justify-center bg-card p-12 lg:flex">
        <div className="max-w-md space-y-8 text-center">
          <CrmIllustration className="w-full" />
          <div className="space-y-2">
            <h2 className="text-xl font-semibold tracking-tight">
              Mijozlaringizni bir joydan boshqaring
            </h2>
            <p className="text-sm text-muted-foreground">
              Mijozlar, loyihalar va vazifalar — barchasi bitta tizimda, real vaqtda
              statistikasi bilan.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
