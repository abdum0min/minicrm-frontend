import { Loader2 } from 'lucide-react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'

import { useAuthStore, useSession } from '@/features/auth'
import { ROUTES } from '@/shared/config'
import { tokenStorage } from '@/shared/lib/token-storage'

function homePath(user: { role?: string } | null): string {
  return user?.role === 'ADMIN' ? ROUTES.dashboard : ROUTES.tasks
}

function FullPageLoader() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <Loader2 className="size-6 animate-spin text-muted-foreground" />
    </div>
  )
}

export function ProtectedRoute() {
  const location = useLocation()
  const user = useAuthStore((state) => state.user)
  const { isLoading, isError } = useSession()

  if (!tokenStorage.get() || isError) {
    return <Navigate to={ROUTES.login} state={{ from: location.pathname }} replace />
  }

  if (isLoading || !user) {
    return <FullPageLoader />
  }

  return <Outlet />
}

export function GuestRoute() {
  const user = useAuthStore((state) => state.user)

  return tokenStorage.get() ? <Navigate to={homePath(user)} replace /> : <Outlet />
}

export function AdminRoute() {
  const user = useAuthStore((state) => state.user)

  return user?.role === 'ADMIN' ? <Outlet /> : <Navigate to={homePath(user)} replace />
}
