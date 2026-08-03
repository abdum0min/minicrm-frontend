import { Link } from 'react-router-dom'

import { ROUTES } from '@/shared/config'
import { Button } from '@/shared/ui/button'

export function NotFoundPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4">
      <h1 className="text-2xl font-semibold">404 — Page not found</h1>

      <Button asChild>
        <Link to={ROUTES.home}>Go home</Link>
      </Button>
    </div>
  )
}
