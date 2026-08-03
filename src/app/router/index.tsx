import { Navigate, Route, Routes } from 'react-router-dom'

import { DesignSystemPage } from '@/pages/design-system-page'
import { NotFoundPage } from '@/pages/not-found-page'
import { ROUTES } from '@/shared/config'

export function AppRouter() {
  return (
    <Routes>
      <Route path={ROUTES.home} element={<Navigate to={ROUTES.designSystem} replace />} />
      <Route path={ROUTES.designSystem} element={<DesignSystemPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}
